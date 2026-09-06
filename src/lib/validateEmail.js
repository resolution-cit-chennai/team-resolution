/**
 * Email validation utility to block fake, test, disposable, and placeholder emails.
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return { valid: true }; // Email is optional
  }

  const clean = email.trim().toLowerCase();

  // 1. Standard format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) {
    return {
      valid: false,
      error: "Please enter a valid email address (e.g. yourname@citchennai.net).",
    };
  }

  const [localPart, domain] = clean.split("@");

  // 2. Reject 3 or more repeated characters (e.g. xxx, aaaa, 000, 111)
  if (/([a-zA-Z0-9])\1{2,}/i.test(localPart)) {
    return {
      valid: false,
      error: "Placeholder and repetitive emails (containing 'xxx', 'aaa', etc.) are not accepted. Please use your real email.",
    };
  }

  // 3. Reject junk keywords in the name portion (test, fake, dummy, sample, temp, spam, etc.)
  const blockedKeywords = /(^|[._-])(test|fake|dummy|sample|temp|spam|demo|asdf|qwerty|none|null|noemail|nomail)([._-]|[0-9]|$)/i;
  if (blockedKeywords.test(localPart)) {
    return {
      valid: false,
      error: "Test and placeholder emails (containing 'test', 'fake', 'dummy', etc.) are not accepted. Please use your real email.",
    };
  }

  // 4. Reject numeric-only or short junk local parts
  if (/^(123|1234|12345|000|0000|abc|xyz)$/i.test(localPart)) {
    return {
      valid: false,
      error: "Please provide a valid, real email address.",
    };
  }

  // 5. Reject disposable or fake domains
  const blockedDomains = [
    "test.com",
    "example.com",
    "sample.com",
    "fake.com",
    "tempmail.com",
    "mailinator.com",
    "yopmail.com",
    "guerrillamail.com",
    "10minutemail.com",
    "trashmail.com",
    "dispostable.com",
    "sharklasers.com",
    "getairmail.com",
    "throwawaymail.com",
  ];

  if (blockedDomains.includes(domain)) {
    return {
      valid: false,
      error: `Test and disposable domains (@${domain}) are not accepted. Please use your personal or college email.`,
    };
  }

  return { valid: true };
}
