// Google Apps Script for portfolio feedback form
// 1) Open Apps Script: https://script.google.com/
// 2) Paste this code into a new project.
// 3) Create a spreadsheet and replace SPREADSHEET_ID below with your spreadsheet ID.
// 4) Deploy as a Web App: Execute as Me, Anyone.
// 5) Copy the Web App URL to VITE_FEEDBACK_ENDPOINT in your .env file.

// Use only the spreadsheet ID, not the full share/edit URL.
const SPREADSHEET_ID = "1aW-dqeVBHDPYWCkTVsOow83_NvHagxP4oTBi9TkRtkQ";
const NOTIFY_EMAIL = "rishigurjar248@gmail.com";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");

    const name = (payload.name || "").toString().trim();
    const email = (payload.email || "").toString().trim();
    const role = (payload.role || "").toString().trim();
    const message = (payload.message || "").toString().trim();
    const source = (payload.source || "portfolio").toString().trim();
    const submittedAt = (
      payload.submittedAt || new Date().toISOString()
    ).toString();

    if (!name || !email || !message) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Missing required fields" }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet =
      spreadsheet.getSheetByName("Portfolio Feedback") ||
      spreadsheet.insertSheet("Portfolio Feedback");

    const headers = ["Timestamp", "Name", "Email", "Role", "Message", "Source"];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    sheet.appendRow([submittedAt, name, email, role, message, source]);

    GmailApp.sendEmail(
      NOTIFY_EMAIL,
      "New feedback on your portfolio",
      [
        "A new feedback form submission was received.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Role: ${role || "Not provided"}`,
        `Source: ${source}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    );

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: "Saved and notified" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: error.message }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, status: "Portfolio feedback endpoint ready" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
