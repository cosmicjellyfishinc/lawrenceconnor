import { supabase } from './lib/supabase.js';

export default async function handler(req, res) {
  const email = (req.query.email || '').toLowerCase().trim();

  if (!email) {
    return res.status(400).send('Missing email');
  }

  const { error } = await supabase
    .from('subscribers')
    .update({ unsubscribed: true })
    .eq('email', email);

  if (error) {
    console.error('Unsubscribe error:', error);
    return res.status(500).send('Something went wrong');
  }

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribed</title></head>
<body style="margin:0;padding:60px 20px;background:#070706;color:#e8e0d4;font-family:Georgia,serif;text-align:center;">
  <h1 style="font-size:22px;font-weight:normal;font-style:italic;margin-bottom:16px;">You've been unsubscribed.</h1>
  <p style="color:#7a756d;font-size:14px;">No hard feelings. You can always come back.</p>
  <a href="https://www.lawrenceconnor.com" style="display:inline-block;margin-top:24px;color:#c9b99a;font-size:13px;">Back to lawrenceconnor.com</a>
</body>
</html>`);
}
