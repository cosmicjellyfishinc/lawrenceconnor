import { resend, FROM_EMAIL } from '../lib/resend.js';
import { supabase } from '../lib/supabase.js';
import { tracks } from '../lib/tracks.js';
import { songEmail } from '../emails/song.js';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default async function handler(req, res) {
  const cronSecret = req.headers['authorization']?.replace('Bearer ', '');
  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { data: subscribers, error: queryError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('completed', false)
      .eq('unsubscribed', false);

    if (queryError) throw queryError;
    if (!subscribers?.length) {
      return res.status(200).json({ processed: 0, sent: 0, errors: 0 });
    }

    const now = new Date();
    let sent = 0;
    let errors = 0;

    for (const sub of subscribers) {
      const daysSinceSignup = (now - new Date(sub.subscribed_at)) / MS_PER_DAY;
      const nextIndex = sub.last_sent_index + 1;

      if (daysSinceSignup < nextIndex * 7) continue;
      if (nextIndex > tracks.length) continue;

      const track = tracks[nextIndex - 1];

      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: sub.email,
          subject: `${track.title} — Week ${track.num}`,
          html: songEmail(track, sub.email),
        });

        const { error: updateError } = await supabase
          .from('subscribers')
          .update({
            last_sent_index: nextIndex,
            completed: nextIndex >= tracks.length,
          })
          .eq('id', sub.id);

        if (updateError) {
          console.error(`DB update failed for ${sub.email}:`, updateError);
        }

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
