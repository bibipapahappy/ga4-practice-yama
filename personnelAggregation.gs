// Google Apps Script to aggregate personnel by department
// Usage: Run aggregatePersonnel('SPREADSHEET_ID');

function aggregatePersonnel(spreadsheetId) {
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheets()[0];
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    Logger.log('No data found.');
    return;
  }

  var headers = data.shift();
  var departmentIndex = headers.indexOf('Department');
  if (departmentIndex === -1) {
    Logger.log('Department column not found.');
    return;
  }

  var counts = {};
  data.forEach(function(row) {
    var dept = row[departmentIndex];
    if (dept) {
      counts[dept] = (counts[dept] || 0) + 1;
    }
  });

  Logger.log('Personnel count by department:');
  for (var dept in counts) {
    Logger.log(dept + ': ' + counts[dept]);
  }
}
