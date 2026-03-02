const SHEET_NAME = "ContactMessages";

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      body.name || "",
      body.email || "",
      body.phone || "",
      body.subject || "",
      body.message || "",
      body.source || "unknown",
      body.submittedAt || "",
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: error && error.message ? error.message : "Unknown error",
    });
  }
}

function doOptions() {
  return jsonResponse_({ ok: true });
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Created At",
      "Name",
      "Email",
      "Phone",
      "Subject",
      "Message",
      "Source",
      "Submitted At (Client)",
    ]);
  }

  return sheet;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
