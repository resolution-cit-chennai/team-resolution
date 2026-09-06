/**
 * Team Resolution — application intake backend.
 *
 * Setup (see README.md for the full walkthrough):
 * 1. Create a Google Sheet, then Extensions → Apps Script, and paste this file in.
 * 2. Run `setup` once from the editor to create the header row and (optionally) a Drive folder.
 * 3. Deploy → New deployment → Web app.
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the /exec URL into src/config.js as APPLICATION_ENDPOINT.
 */

const SHEET_NAME = "Applications";
// Leave blank to save attachments as base64 skipped and just log a note instead.
// Run `setup()` once to auto-create a folder and fill this in for you.
const DRIVE_FOLDER_ID = "1Avy_eBTEclxbZhdF3PzuRynos0wbqqrN";

const HEADERS = [
  "Timestamp",
  "Name",
  "Department",
  "Email",
  "Register Number",
  "Mobile Number",
  "Why interested",
  "Work link",
  "Attachment",
  "Software known",
  "Equipment owned",
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Run this once manually from the Apps Script editor. */
function setup() {
  getSheet_();
  if (!DRIVE_FOLDER_ID) {
    const folder = DriveApp.createFolder("Team Resolution — Attachments");
    Logger.log(
      "Created Drive folder '%s'. Paste this ID into DRIVE_FOLDER_ID: %s",
      folder.getName(),
      folder.getId()
    );
  }
}

function saveAttachment_(attachment) {
  if (!attachment || !attachment.data) return "";
  if (!DRIVE_FOLDER_ID) return "(no Drive folder configured — file not saved)";
  try {
    const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    const bytes = Utilities.base64Decode(attachment.data);
    const blob = Utilities.newBlob(bytes, attachment.mimeType, attachment.name);
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (err) {
    return "(upload failed: " + err.message + ")";
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    const attachmentUrl = saveAttachment_(body.attachment);

    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.name || "",
      body.department || "",
      body.email || "",
      body.registerNumber || "",
      body.mobile || "",
      body.reason || "",
      body.workLink || "",
      attachmentUrl,
      (body.software || []).join(", "),
      (body.equipment || []).join(", "),
    ]);

    return jsonResponse_({ ok: true, statusCode: 200, message: "Application submitted successfully." });
  } catch (err) {
    return jsonResponse_({ ok: false, statusCode: 400, error: err.message });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, statusCode: 200, message: "Team Resolution intake endpoint is live." });
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}