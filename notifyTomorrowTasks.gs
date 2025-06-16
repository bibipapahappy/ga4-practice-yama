function notifyTomorrowTasks() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Tasks');
  if (!sheet) {
    Logger.log('Sheet "Tasks" not found.');
    return;
  }
  var values = sheet.getDataRange().getValues();
  var today = new Date();
  var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  var tz = Session.getScriptTimeZone();
  var tomorrowStr = Utilities.formatDate(tomorrow, tz, 'yyyy-MM-dd');
  var tasks = [];
  for (var i = 1; i < values.length; i++) { // Assuming row 1 is header
    var taskName = values[i][0];
    var dueDateStr = values[i][1];
    var status = values[i][2];
    if (dueDateStr === tomorrowStr && status === '未完了') {
      tasks.push(taskName + '（期限: ' + dueDateStr + '）');
    }
  }
  if (tasks.length > 0) {
    var body = '以下のタスクが明日締切です:\n\n' + tasks.join('\n');
    var email = Session.getActiveUser().getEmail();
    MailApp.sendEmail(email, '明日締切のタスク通知', body);
  }
  Logger.log('通知対象タスク数: ' + tasks.length);
}
