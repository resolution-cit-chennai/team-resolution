# Automated "Thanks for Applying" Email System

The goal is to automatically send a confirmation email to applicants upon submission. Since you anticipate around **1000 emails per day**, and your organization uses Google Workspace (`@citchennai.net`), you have a limit of **1,500 emails per day**, which perfectly handles your volume for free.

## Approach: Google Apps Script with Email Aliasing

Your Apps Script (`Code.gs`) is currently running under `elangkaviyan.aids2024@citchennai.net`, but you want the emails to appear as if they were sent from `resolution@citchennai.net`.

Google Apps Script supports this via the `from` parameter in `GmailApp.sendEmail()`. 

> [!IMPORTANT]
> **Prerequisite for Aliasing**
> In order for `elangkaviyan.aids2024@citchennai.net` to send emails on behalf of `resolution@citchennai.net`, you **must** configure `resolution@citchennai.net` as a "Send mail as" alias in the Gmail settings for `elangkaviyan.aids2024@citchennai.net`.
> 
> **How to set this up:**
> 1. Log into Gmail as `elangkaviyan.aids2024@citchennai.net`.
> 2. Go to **Settings (Gear icon)** -> **See all settings** -> **Accounts**.
> 3. Under "Send mail as", click **Add another email address**.
> 4. Add `resolution@citchennai.net` and verify it.

---

## Open Questions

> [!TIP]
> **Email Template Design**
> We can send plain text or rich HTML emails. Do you have a specific design or text in mind for the "Thanks for Applying" email? (e.g., including their name, department applied for, and next steps?)

---

## Proposed Changes

### `google-apps-script/Code.gs`
We will update the `doPost` function to trigger an email after successfully appending the row, explicitly using the `from` parameter.

#### [MODIFY] `Code.gs`
```javascript
// Example modification
function doPost(e) {
  // ... existing code ...
  
  // Send Email
  const applicantEmail = e.parameter.email;
  const applicantName = e.parameter.name;
  
  const subject = "Thanks for Applying to Team Resolution!";
  const body = `Hi ${applicantName},\n\nThank you for your application...`;
  
  // Check if alias is available
  const aliases = GmailApp.getAliases();
  const fromAddress = aliases.includes("resolution@citchennai.net") 
                        ? "resolution@citchennai.net" 
                        : aliases[0]; // fallback to default if alias isn't setup
  
  GmailApp.sendEmail(applicantEmail, subject, body, {
    from: fromAddress,
    name: "Team Resolution"
  });
  
  // ... return success ...
}
```

Please let me know how you'd like to proceed!
