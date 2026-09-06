/**
 * Team Resolution — application intake backend with automated confirmation emails.
 *
 * Setup (see README.md for the full walkthrough):
 * 1. Create a Google Sheet, then Extensions → Apps Script, and paste this file in.
 * 2. Run `setup` once from the editor to create the header row and Drive folder.
 * 3. Configure `resolution@citchennai.net` as a "Send mail as" alias in Gmail settings:
 *    (Settings -> Accounts -> Send mail as -> Add another email address).
 * 4. IMPORTANT: Run `testSendEmail` once in the editor!
 *    - Click "Review permissions" -> "Advanced" -> "Go to project" -> "Allow".
 *    - This grants the necessary Gmail & Mail permissions so automated emails can send.
 * 5. Deploy → Manage deployments → Edit (pencil) → New version → Deploy.
 *
 * Active Deployment ID: AKfycbwpsFAC3v1r8eQHDkTgere4piQWtmdP3MKWrU9h_XjnL_RaKSe2pZbJJTH-4H64GLB8eg
 * Live Web App URL: https://script.google.com/macros/s/AKfycbwpsFAC3v1r8eQHDkTgere4piQWtmdP3MKWrU9h_XjnL_RaKSe2pZbJJTH-4H64GLB8eg/exec
 */

const SHEET_NAME = "Applications";
// Leave blank to save attachments as base64 skipped and just log a note instead.
// Run `setup()` once to auto-create a folder and fill this in for you.
const DRIVE_FOLDER_ID = "1Avy_eBTEclxbZhdF3PzuRynos0wbqqrN";

// Email Configuration
const SENDER_EMAIL = "resolution@citchennai.net";
const SENDER_NAME = "Team Resolution";

const HEADERS = [
  "Timestamp (UTC+05:30)",
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
  "Mail Sent (Yes / No / Skipped)",
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
  } else {
    // Automatically populate or update any missing headers on row 1
    for (let i = 0; i < HEADERS.length; i++) {
      const cell = sheet.getRange(1, i + 1);
      if (!cell.getValue()) {
        cell.setValue(HEADERS[i]).setFontWeight("bold");
      }
    }
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

/** Formats a timestamp into UTC+05:30 (Indian Standard Time) */
function getISTTimestamp_(isoString) {
  try {
    const d = isoString ? new Date(isoString) : new Date();
    const validDate = isNaN(d.getTime()) ? new Date() : d;
    return Utilities.formatDate(validDate, "GMT+05:30", "yyyy-MM-dd hh:mm:ss a") + " IST (UTC+05:30)";
  } catch (err) {
    return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
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

/**
 * Sends a confirmation email to the applicant.
 * Uses GmailApp with resolution@citchennai.net alias if configured,
 * with automatic fallback to MailApp if alias/Gmail is restricted.
 */
function sendConfirmationEmail_(data) {
  const recipient = (data.email || "").trim().toLowerCase();
  if (!recipient) {
    return { sent: false, detail: "Skipped (no email provided)" };
  }

  if (recipient.indexOf("@") === -1 || recipient.indexOf(".") === -1) {
    return { sent: false, detail: "Failed: Invalid email address (" + recipient + ")" };
  }

  // Reject test, xxx, dummy, and disposable emails
  const parts = recipient.split("@");
  const localPart = parts[0] || "";
  const domain = parts[1] || "";
  const blockedKeywords = /(^|[._-])(test|fake|dummy|sample|temp|spam|demo|asdf|qwerty|none|null|noemail|nomail)([._-]|[0-9]|$)/i;
  const isRepetitive = /([a-z0-9])\1{2,}/i.test(localPart);
  const blockedDomains = ["test.com", "example.com", "fake.com", "tempmail.com", "mailinator.com", "yopmail.com", "trashmail.com"];

  if (blockedKeywords.test(localPart) || isRepetitive || blockedDomains.indexOf(domain) !== -1) {
    return { sent: false, detail: "Skipped (test/placeholder email detected)" };
  }

  const applicantName = (data.name || "Applicant").trim();
  const subject = "Thank you for applying to Team Resolution | Recruitment 2026";

  // Plain text fallback
  const textBody =
    "Hi " + applicantName + ",\n\n" +
    "Thank you for applying to join Team Resolution! We have received your application.\n\n" +
    "Our team is currently reviewing applications and portfolio submissions. Shortlisted candidates will be contacted regarding your joining process.\n\n" +
    "If you have any questions or need to reach out, feel free to reply directly to this email.\n\n" +
    "Warm regards,\n" +
    "Team Resolution\n" +
    "Chennai Institute of Technology\n" +
    "resolution@citchennai.net";

  // Modern branded HTML template
  const htmlBody =
    '<div style="background-color: #0f0e0d; color: #f7f4ed; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border-radius: 12px; border: 1px solid #33302b;">' +
      '<div style="border-bottom: 2px solid #ffcf25; padding-bottom: 16px; margin-bottom: 24px;">' +
        '<h1 style="color: #ffcf25; margin: 0 0 4px 0; font-size: 24px; letter-spacing: 1px; font-weight: 800;">TEAM RESOLUTION</h1>' +
        '<p style="margin: 0; color: #948f85; font-size: 13px; font-weight: 500;">Chennai Institute of Technology • Media & Creative Arts Club</p>' +
      '</div>' +
      '<p style="font-size: 16px; line-height: 1.6; color: #f7f4ed; margin-top: 0; margin-bottom: 16px;">' +
        'Hi <strong>' + escapeHtml_(applicantName) + '</strong>,' +
      '</p>' +
      '<p style="font-size: 15px; line-height: 1.6; color: #d6d0c4; margin-bottom: 24px;">' +
        'Thank you for applying to join <strong>Team Resolution</strong>! We have received your application.' +
      '</p>' +
      '<div style="background-color: #171614; border: 1px solid #22201d; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">' +
        '<h3 style="margin-top: 0; margin-bottom: 12px; color: #ffcf25; font-size: 13px; text-transform: uppercase; letter-spacing: 0.8px;">What happens next?</h3>' +
        '<ul style="margin: 0; padding-left: 20px; color: #d6d0c4; font-size: 14px; line-height: 1.7;">' +
          '<li>Our club leads and mentors will review your submission and profile.</li>' +
          '<li>Shortlisted candidates will be notified via email or phone for your joining process.</li>' +
          '<li>Please monitor your inbox and messages for future updates.</li>' +
        '</ul>' +
      '</div>' +
      '<p style="font-size: 14px; line-height: 1.6; color: #948f85; margin-bottom: 28px;">' +
        'If you have any questions or need to update your details, simply reply directly to this email or reach us at <a href="mailto:resolution@citchennai.net" style="color: #ffcf25; text-decoration: none; font-weight: 600;">resolution@citchennai.net</a>.' +
      '</p>' +
      '<div style="border-top: 1px solid #22201d; padding-top: 18px; font-size: 13px; color: #948f85; line-height: 1.5;">' +
      '<p style="margin: 0;">Warm regards,<br>' +
      '<strong style="color: #f7f4ed;">Team Resolution</strong><br>' +
      'Chennai Institute of Technology</p>' +
      '</div>' +
    '</div>';

  // Strategy 1: Attempt sending via GmailApp (supports 'from' alias)
  try {
    const options = {
      name: SENDER_NAME,
      htmlBody: htmlBody,
      replyTo: SENDER_EMAIL,
    };

    let usedAlias = false;
    try {
      const aliases = GmailApp.getAliases();
      if (aliases && aliases.indexOf(SENDER_EMAIL) !== -1) {
        options.from = SENDER_EMAIL;
        usedAlias = true;
      }
    } catch (aliasErr) {
      Logger.log("Could not query aliases: %s", aliasErr.message);
    }

    GmailApp.sendEmail(recipient, subject, textBody, options);
    return {
      sent: true,
      detail: usedAlias ? "Yes (via " + SENDER_EMAIL + ")" : "Yes (via account email)",
    };
  } catch (gmailErr) {
    Logger.log("GmailApp.sendEmail error: %s. Trying MailApp fallback...", gmailErr.message);

    // Strategy 2: Fallback to MailApp (standard Apps Script mailer)
    try {
      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        body: textBody,
        htmlBody: htmlBody,
        name: SENDER_NAME,
        replyTo: SENDER_EMAIL,
      });
      return { sent: true, detail: "Yes (via MailApp fallback)" };
    } catch (mailErr) {
      Logger.log("MailApp also failed: %s", mailErr.message);
      return { sent: false, detail: "Failed: " + mailErr.message };
    }
  }
}

function escapeHtml_(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Test function you can run in Apps Script to:
 * 1. Authorize email permissions for the script
 * 2. Verify that confirmation emails deliver to your inbox
 */
function testSendEmail() {
  const myEmail = Session.getActiveUser().getEmail();
  Logger.log("Testing email dispatch to: %s", myEmail);

  const testData = {
    name: "Test Applicant",
    department: "AI and Data Science",
    registerNumber: "210421104000",
    email: myEmail,
  };
  const result = sendConfirmationEmail_(testData);
  Logger.log("Result: %s", JSON.stringify(result));
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    const attachmentUrl = saveAttachment_(body.attachment);

    // Send confirmation email to applicant with fallback & status capture
    const emailResult = sendConfirmationEmail_(body);

    // Format timestamp in Indian Standard Time (UTC+05:30)
    const timestampIST = getISTTimestamp_(body.submittedAt);

    // Format mail status to match 'Mail Sent (Yes / No / Skipped)'
    const mailSentStatus = emailResult.sent
      ? "Yes"
      : (!body.email ? "Skipped (no email)" : "No (" + emailResult.detail + ")");

    sheet.appendRow([
      timestampIST,
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
      mailSentStatus,
    ]);

    return jsonResponse_({
      ok: true,
      statusCode: 200,
      message: "Application submitted successfully.",
      emailSent: emailResult.sent,
      emailStatus: emailResult.detail,
      timestamp: timestampIST,
    });
  } catch (err) {
    return jsonResponse_({ ok: false, statusCode: 400, error: err.message });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    statusCode: 200,
    message: "Team Resolution intake endpoint is live.",
    currentTimeIST: getISTTimestamp_(),
  });
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}