/**
 * Google Apps Script Web App integration with Dify.
 *
 * Receives JSON data via HTTP POST from Dify, writes it to a spreadsheet,
 * and returns a JSON response with a status key indicating success or error.
 */

/**
 * ID of the spreadsheet to write to.
 * Replace with your actual Spreadsheet ID.
 */
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

/**
 * Name of the sheet within the spreadsheet.
 */
var SHEET_NAME = 'Sheet1';

/**
 * Entry point for HTTP POST requests.
 *
 * Expected request body (JSON):
 *   {
 *     "timestamp": "2023-01-01T00:00:00Z",
 *     "user": "john@example.com",
 *     "message": "Example text"
 *   }
 *
 * The fields can be adjusted depending on the data provided by Dify.
 */
function doPost(e) {
  try {
    // Parse JSON from the request body.
    var data = JSON.parse(e.postData.contents);

    // Open the spreadsheet and select the target sheet.
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error('Sheet not found: ' + SHEET_NAME);
    }

    // Append a new row with data from the request.
    // Adjust the columns according to your sheet layout.
    sheet.appendRow([
      new Date(data.timestamp),
      data.user,
      data.message
    ]);

    // Respond with success.
    return jsonResponse({ status: 'success' });
  } catch (err) {
    // Log the error for debugging.
    console.error(err);
    // Respond with error status.
    return jsonResponse({ status: 'error' });
  }
}

/**
 * Helper to create a JSON response.
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
