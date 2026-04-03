import { colors, emailShell, streamingButtons } from './styles.js';
import { ALBUM_TITLE, ALBUM_ART_URL } from '../lib/tracks.js';

export function songEmail(track) {
  const lyricsBlock = track.lyrics
    ? `<tr>
        <td style="padding:24px 28px;background:${colors.bg};border-radius:10px;border:1px solid ${colors.cardBorder};">
          <p style="margin:0;font-size:14px;line-height:2;color:${colors.text};font-style:italic;white-space:pre-line;">${track.lyrics}</p>
        </td>
      </tr>`
    : '';

  const weekLabel = `Week ${track.num} of 13`;
  const isLast = track.num === 13;

  const outroText = isLast
    ? `<p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:${colors.textDim};font-style:italic;">That&rsquo;s the whole album. Thanks for listening all the way through &mdash; it means more than you know.</p>`
    : '';

  const content = `
    <!-- Week badge -->
    <tr>
      <td align="center" style="padding-bottom:24px;">
        <span style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:${colors.textDim};">${weekLabel} &middot; ${ALBUM_TITLE}</span>
      </td>
    </tr>

    <!-- Card -->
    <tr>
      <td style="background:${colors.card};border:1px solid ${colors.cardBorder};border-radius:16px;padding:36px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <!-- Album art + song number -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <img src="${ALBUM_ART_URL}" alt="${ALBUM_TITLE}" width="80" height="80" style="display:block;border-radius:50%;border:2px solid ${colors.cardBorder};">
            </td>
          </tr>

          <!-- Song title -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <h1 style="margin:0;font-size:28px;font-weight:normal;font-style:italic;color:${colors.text};line-height:1.3;">${track.title}</h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <span style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${colors.textDim};">Track ${track.num}</span>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <div style="width:36px;height:1px;background:${colors.cardBorder};"></div>
            </td>
          </tr>

          <!-- Lyrics (notepaper block) -->
          ${lyricsBlock}

          <!-- Streaming buttons -->
          ${streamingButtons(track.spotifyUrl, track.appleUrl)}

          <!-- Outro (final email only) -->
          <tr>
            <td style="padding-top:24px;">
              ${outroText}
              <p style="margin:${isLast ? '16px' : '0'} 0 0;font-size:14px;font-style:italic;color:${colors.accent};">&mdash; Lawrence</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  return emailShell(content);
}
