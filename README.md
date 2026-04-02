# lawrenceconnor.com

Single-page website for Lawrence Connor — songwriter from Baltimore.

Features an interactive vinyl turntable with custom audio playback,
dynamic Spotify embed syncing, and an email capture form.

## Structure

```
index.html              Single-file site (HTML + CSS + JS)
album-art.png           Album artwork for "Do You Ever Dream of Then?"
audio/                  AAC (.m4a) tracks for the custom player
google-apps-script.js   Google Apps Script for email → Google Sheets
```

## Local Preview

Serve the directory over HTTP (required for audio playback):

```bash
python3 -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Email → Google Sheets

1. Create a new [Google Sheet](https://sheets.new)
2. Go to **Extensions → Apps Script**
3. Replace the default code with the contents of `google-apps-script.js`
4. Click **Deploy → New deployment**
5. Choose type **Web app**, set access to **Anyone**
6. Deploy, authorize, and copy the web app URL
7. In `index.html`, set `GOOGLE_SCRIPT_URL` to that URL

## Deployment

Static site — deploy anywhere:

- **Netlify** — drag the folder into [app.netlify.com/drop](https://app.netlify.com/drop)
- **Vercel** — `npx vercel --prod`
- **Cloudflare Pages** — connect the repo or drag-and-drop
- **GitHub Pages** — enable Pages in repo settings

Point `lawrenceconnor.com` at whichever host you choose.
