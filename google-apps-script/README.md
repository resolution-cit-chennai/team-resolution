# Wiring the form to Google Sheets

Google Sheets has no public write API that's safe to call straight from a
browser (it needs a private key, which can't live in client-side code). The
standard, no-server way around this is a **Google Apps Script Web App**: a
tiny script attached to your Sheet that exposes a URL your React form can
POST to. That's what `Code.gs` in this folder does.

## Setup (5 minutes)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet. Name it something like "Team Resolution — Applications".
2. In the sheet, open **Extensions → Apps Script**.
3. Delete the placeholder code in the editor and paste in the full contents
   of `Code.gs`.
4. Click **Save** (the disk icon), then pick `setup` from the function
   dropdown at the top and click **Run**.
   - The first run will ask you to authorize the script — click through
     the consent screens (it'll warn you it's unverified; that's expected
     for a script you wrote yourself, click **Advanced → Go to project**).
   - This creates the "Applications" tab with headers, and a Drive folder
     called **"Team Resolution — Attachments"**.
5. Open **View → Logs** (or **Executions**) and copy the folder ID it
   printed. Paste it into `Code.gs` as:
   ```js
   const DRIVE_FOLDER_ID = "paste-the-id-here";
   ```
   Save again.
6. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorize again if asked.
7. Copy the **Web app URL** (ends in `/exec`).
8. Open `src/config.js` in the React project and paste it in:
   ```js
   export const APPLICATION_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
   ```

That's it — every submission appends a row to the "Applications" tab, with
any uploaded file dropped into the Drive folder and linked in the sheet.

## Updating the script later

If you edit `Code.gs` after it's deployed, the live URL won't pick up the
change automatically. Use **Deploy → Manage deployments → Edit (pencil
icon) → New version → Deploy** to push the update to the same URL.

## Notes

- Files over 8MB are rejected client-side (see `MAX_FILE_BYTES` in
  `src/lib/submitApplication.js`) — Apps Script and browsers both get slow
  with large base64 payloads. Applicants can paste a Drive/YouTube link
  instead.
- "Execute as: Me" means submissions are written using your Google
  account's permissions, not the applicant's — so applicants don't need a
  Google account to submit.
- If you'd rather not touch Apps Script at all, a Google Form feeding a
  Sheet is the zero-code alternative — but you'd lose the custom
  multi-select UI this site builds.
