# Wiring the form to Google Sheets & Automated Emails

Google Sheets has no public write API that's safe to call straight from a
browser (it needs a private key, which can't live in client-side code). The
standard, no-server way around this is a **Google Apps Script Web App**: a
tiny script attached to your Sheet that exposes a URL your React form can
POST to. That's what `Code.gs` in this folder does.

It also automatically sends a branded **"Thanks for Applying"** confirmation email to every applicant.

## Setup (5 minutes)

1. Go to [sheets.google.com](https://sheets.google.com) and open or create your spreadsheet.
2. Open **Extensions → Apps Script**.
3. Replace the contents of the script editor with the updated `Code.gs`.
4. Click **Save** (disk icon).

### Setting up the Email Alias (`resolution@citchennai.net`)
If your Apps Script is running under your student account (e.g. `elangkaviyan.aids2024@citchennai.net`), but you want the emails to be sent from `resolution@citchennai.net`:
1. Log into Gmail with the Google account hosting the Apps Script.
2. Go to **Settings (Gear icon)** → **See all settings** → **Accounts**.
3. Under **"Send mail as"**, click **Add another email address**.
4. Enter Name: `Team Resolution` and Email address: `resolution@citchennai.net`.
5. Complete the verification.
6. In Apps Script, select the `testSendEmail` function from the dropdown and click **Run** to test that the email sends to your inbox with the alias.

### Deploying the Web App
1. Run `setup` once from the Apps Script editor toolbar:
   - Grant permissions when prompted (**Advanced → Go to project**).
   - This creates/configures the "Applications" sheet and your Drive folder.
2. Click **Deploy → Manage deployments** (or **New deployment** if first time).
   - Click the **pencil (edit)** icon.
   - Under Version, select **New version**.
   - Ensure:
     - **Execute as**: `Me`
     - **Who has access**: `Anyone`
   - Click **Deploy**.
3. **Current Live Deployment**:
   - **Deployment ID**: `AKfycbwpsFAC3v1r8eQHDkTgere4piQWtmdP3MKWrU9h_XjnL_RaKSe2pZbJJTH-4H64GLB8eg`
   - **Web App URL**: `https://script.google.com/macros/s/AKfycbwpsFAC3v1r8eQHDkTgere4piQWtmdP3MKWrU9h_XjnL_RaKSe2pZbJJTH-4H64GLB8eg/exec`
   - This is configured in `.env` and `src/config.js` as `APPLICATION_ENDPOINT`.

## Email Quota & Capacity
- Google Workspace accounts (`@citchennai.net`) have a free daily quota of **1,500 emails per day**.
- This effortlessly handles a high volume of ~1,000 applications per day without needing external paid SMTP or third-party email services.
