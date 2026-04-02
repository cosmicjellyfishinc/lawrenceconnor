/**
 * Google Apps Script — paste this into your Google Sheet's script editor.
 *
 * Setup:
 *  1. Create a new Google Sheet
 *  2. Go to Extensions → Apps Script
 *  3. Replace the default code with this entire file
 *  4. Click Deploy → New deployment
 *  5. Select type: "Web app"
 *  6. Set "Execute as" to your account
 *  7. Set "Who has access" to "Anyone"
 *  8. Click Deploy and copy the URL
 *  9. Paste the URL into GOOGLE_SCRIPT_URL in index.html
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Email']);
  }

  sheet.appendRow([data.timestamp || new Date().toISOString(), data.email]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
