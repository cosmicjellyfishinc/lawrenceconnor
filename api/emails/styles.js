export const colors = {
  bg: '#070706',
  card: '#111110',
  cardBorder: '#1e1c19',
  text: '#e8e0d4',
  textDim: '#7a756d',
  accent: '#c9b99a',
  buttonBg: '#1a1918',
};

export function emailShell(content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lawrence Connor</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${colors.bg};font-family:Georgia,'Times New Roman',Times,serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.bg};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
          ${content}
        </table>

        <!-- Footer -->
        <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;margin-top:32px;">
          <tr>
            <td align="center" style="padding:16px 0;border-top:1px solid ${colors.cardBorder};">
              <a href="https://www.lawrenceconnor.com" style="color:${colors.textDim};font-size:11px;text-decoration:none;letter-spacing:0.15em;text-transform:uppercase;font-family:Helvetica,Arial,sans-serif;">lawrenceconnor.com</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <a href="%UNSUBSCRIBE_URL%" style="color:${colors.textDim};font-size:10px;text-decoration:underline;font-family:Helvetica,Arial,sans-serif;opacity:0.6;">Unsubscribe</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function streamingButtons(spotifyUrl, appleUrl) {
  return `
    <tr>
      <td align="center" style="padding:28px 0 0;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:10px;">
              <a href="${spotifyUrl}" style="display:inline-block;background:${colors.buttonBg};border:1px solid ${colors.cardBorder};border-radius:8px;padding:10px 20px;color:${colors.text};font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;">Spotify</a>
            </td>
            <td>
              <a href="${appleUrl}" style="display:inline-block;background:${colors.buttonBg};border:1px solid ${colors.cardBorder};border-radius:8px;padding:10px 20px;color:${colors.text};font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;">Apple Music</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}
