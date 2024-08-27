function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.name, 
      data.menParticipants, 
      data.womenParticipants
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({"result":"success", "row": sheet.getLastRow()}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService
      .createTextOutput(JSON.stringify({"result":"error", "error": e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("The web app is working correctly.");
}
