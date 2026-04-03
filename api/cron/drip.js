import { resend, FROM_EMAIL } from '../lib/resend.js';
import { supabase } from '../lib/supabase.js';
import { tracks } from '../lib/tracks.js';
import { songEmail } from '../emails/song.js';

export default async function handler(req, res) {
  const cronSecret = req.headers['authorization']?.replace('Bearer ', '');
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('completed', false)
      .eq('unsubscribed', false);

    if (error) throw error;

    const now = new Date();
    let sent = 0;
    let errors = 0;

    for (const sub of subscribers) {
      const subscribedAt = new Date(sub.subscribed_at);
      const daysSinceSignup = (now - subscribedAt) / (1000 * 60 * 60 * 24);
      const nextIndex = sub.last_sent_index + 1;
      const daysRequired = nextIndex * 7;

      if (daysSinceSignup < daysRequired) continue;
      if (nextIndex > tracks.length) continue;

      const track = tracks[nextIndex - 1];

      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: `${track.title} — Week ${track.num}`,
          html: songEmail(track),
        });

        const isCompleted = nextIndex >= tracks.length;

        await supabase
          .from('subscribers')
          .update({
            last_sent_index: nextIndex,
            completed: isCompleted,
          })
          .eq('id', sub.id);

        sent++;
      } catch (err) {
        console.error(`Failed to send to ${sub.email}:`, err);
        errors++;
      }
    }

    return res.status(200).json({
      processed: subscribers.length,
      sent,
      errors,
    });
  } catch (err) {
    console.error('Drip cron error:', err);
    return res.status(500).json({ error: 'Cron failed' });
  }
}
