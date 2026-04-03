# lawrenceconnor.com

Single-page website for Lawrence Connor — songwriter from Baltimore.

Features an interactive vinyl turntable with custom audio playback,
dynamic Spotify embed syncing, and a 13-week drip email campaign
powered by Resend and Supabase.

## Structure

```
index.html              Single-file site (HTML + CSS + JS)
album-art.png           Album artwork for "Do You Ever Dream of Then?"
audio/                  AAC (.m4a) tracks for the custom player
vercel.json             Vercel Cron schedule for drip emails
api/
  subscribe.js          POST endpoint — captures email, sends welcome
  unsubscribe.js        GET endpoint — marks subscriber as unsubscribed
  cron/drip.js          Daily cron — sends next song to due subscribers
  emails/               HTML email templates (welcome + song postcard)
  lib/                  Shared clients (Resend, Supabase) and track data
```

## Local Preview

Serve the directory over HTTP (required for audio playback):

```bash
python3 -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Email Campaign

Subscribers receive a welcome email, then one song per week for 13 weeks.
Each email features the song title, lyrics, and links to Spotify / Apple Music
in a postcard-style design.

### Services

- **[Resend](https://resend.com)** — transactional email delivery
- **[Supabase](https://supabase.com)** — Postgres database for subscriber tracking
- **Vercel Cron** — triggers the drip job daily at 2pm UTC

### Environment Variables (Vercel)

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |
| `CRON_SECRET` | Secures the cron endpoint |

### Database Table

Create in the Supabase SQL Editor:

```sql
CREATE TABLE subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  last_sent_index int DEFAULT 0,
  completed bool DEFAULT false,
  unsubscribed bool DEFAULT false
);
```

### Adding Lyrics

Edit `api/lib/tracks.js` and fill in the `lyrics` field for each track.
The drip emails will automatically include them in the postcard design.

## Deployment

Static site + serverless API — deployed on Vercel:

1. Connect the GitHub repo in the Vercel dashboard
2. Add the environment variables above
3. Deploy — Vercel auto-detects the API routes and cron schedule

Point `lawrenceconnor.com` at Vercel via your domain registrar.
