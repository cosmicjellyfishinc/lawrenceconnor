import { resend, FROM_EMAIL } from './lib/resend.js';
import { supabase } from './lib/supabase.js';
import { welcomeEmail } from './emails/welcome.js';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://www.lawrenceconnor.com';

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsOrigin = origin.includes('lawrenceconnor.com') || origin.includes('localhost')
    ? origin
    : ALLOWED_ORIGIN;

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const normalized = email.toLowerCase().trim();

  try {
    const { data: existing, error: selectError } = await supabase
      .from('subscribers')
      .select('id, unsubscribed')
      .eq('email', normalized)
      .maybeSingle();

    if (selectError) throw selectError;

    if (existing && !existing.unsubscribed) {
      return res.status(200).json({ result: 'already_subscribed' });
    }

    if (existing && existing.unsubscribed) {
      const { error: updateError } = await supabase
        .from('subscribers')
        .update({
          unsubscribed: false,
          last_sent_index: 0,
          completed: false,
          subscribed_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert({ email: normalized });

      if (insertError) throw insertError;
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: normalized,
      subject: "You're in — Lawrence Connor",
      html: welcomeEmail(normalized),
    });

    return res.status(200).json({ result: 'success' });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
