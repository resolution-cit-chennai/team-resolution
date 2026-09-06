// ─── SITE CONFIGURATION (LOADS FROM .env WITH FALLBACKS) ───────────────────

// Phone numbers shown in the footer "Questions?" block.
export const CONTACT_NUMBERS = [
  {
    label: "Dharshu - The Cam Soori",
    number: import.meta.env.VITE_QUERY_PHONE_1 || "+91 00000 00000",
  },
  {
    label: "EK - The Pro Editor",
    number: import.meta.env.VITE_QUERY_PHONE_2 || "+91 00000 00000",
  },
  {
    label: "Madhumita",
    number: import.meta.env.VITE_QUERY_PHONE_3 || "+91 00000 00000",
  },
];

// Where completed applications are sent.
// This is read from VITE_APPLICATION_ENDPOINT in .env
export const APPLICATION_ENDPOINT =
  import.meta.env.VITE_APPLICATION_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbwpsFAC3v1r8eQHDkTgere4piQWtmdP3MKWrU9h_XjnL_RaKSe2pZbJJTH-4H64GLB8eg/exec";

// Social / external links shown in the footer.
export const SOCIAL_LINKS = [
  {
    label: "Follow us on Instagram",
    href:
      import.meta.env.VITE_INSTAGRAM_URL ||
      "https://www.instagram.com/team_resolution.cit/",
  },
];

// Maintenance / Revealing Soon mode
// Set to true by default so visitors see the "Revealing Soon" page on home.
// Can be toggled in .env (VITE_MAINTENANCE_MODE="false" to disable) or bypassed via ?bypass=true
export const MAINTENANCE_MODE =
  import.meta.env.VITE_MAINTENANCE_MODE !== "false";

