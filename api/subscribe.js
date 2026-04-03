import { resend, FROM_EMAIL } from './lib/resend.js';
import { supabase } from './lib/supabase.js';
import { welcomeEmail } from './emails/welcome.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id, unsubscribed')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

    if (existing && !existing.unsubscribed) {
      return res.status(200).json({ result: 'already_subscribed' });
    }

    if (existing && existing.unsubscribed) {
      await supabase
        .from('subscribers')
        .update({ unsubscribed: false, last_sent_index: 0, completed: false, subscribed_at: new Date().toISOString() })
        .eq('id', existing.id);
    } else {
      await supabase
        .from('subscribers')
        .insert({ email: email.toLowerCase().trim() });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email.toLowerCase().trim(),
      subject: "You're in — Lawrence Connor",
      html: welcomeEmail(),
    });

    return res.status(200).json({ result: 'success' });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
