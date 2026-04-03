import { colors, emailShell } from './styles.js';
import { ALBUM_TITLE, ALBUM_ART_URL } from '../lib/tracks.js';

export function welcomeEmail() {
  const content = `
    <!-- Album art -->
    <tr>
      <td align="center" style="padding-bottom:28px;">
        <img src="${ALBUM_ART_URL}" alt="${ALBUM_TITLE}" width="180" height="180" style="display:block;border-radius:50%;border:2px solid ${colors.cardBorder};">
      </td>
    </tr>

    <!-- Card -->
    <tr>
      <td style="background:${colors.card};border:1px solid ${colors.cardBorder};border-radius:16px;padding:36px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <span style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:${colors.textDim};">Lawrence Connor</span>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="margin:0;font-size:26px;font-weight:normal;font-style:italic;color:${colors.text};line-height:1.4;">You're in.</h1>
            </td>
          </tr>
          <tr>
            <td style="font-size:15px;line-height:1.75;color:${colors.text};font-style:italic;">
              <p style="margin:0 0 16px;">Thanks for signing up. Each week for the next 13 weeks, I'll send you one song from <em>${ALBUM_TITLE}</em> &mdash; the lyrics, the story behind it, and links to listen.</p>
              <p style="margin:0 0 16px;">Think of it as the album, one chapter at a time.</p>
              <p style="margin:0;color:${colors.textDim};">Your first song arrives in a week. Talk soon.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:28px;">
              <span style="font-size:15px;font-style:italic;color:${colors.accent};">&mdash; Lawrence</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return emailShell(content);
}
