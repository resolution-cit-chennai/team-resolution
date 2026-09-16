// ─── SITE CONFIGURATION (LOADS FROM .env WITH FALLBACKS) ───────────────────

// Phone numbers shown in the footer "Questions?" block.
export const CONTACT_NUMBERS = [
  {
    label: "Staff Coordinator - Senthil Sir",
    number: import.meta.env.VITE_QUERY_PHONE_4 || "+91 00000 00000"
  },
  {
    label: "Dharshan",
    number: import.meta.env.VITE_QUERY_PHONE_1 || "+91 00000 00000",
  },
  {
    label: "Elangkaviyan",
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
  import.meta.env.VITE_APPLICATION_ENDPOINT;

// Social / external links shown in the footer.
export const SOCIAL_LINKS = [
  {
    label: "Follow us on Instagram",
    href:
      import.meta.env.VITE_INSTAGRAM_URL ||
      "https://www.instagram.com/team_resolution.cit/",
  },
];

// Maintenance mode is now controlled via /public/site-config.json → isInMaintenance (bool).
// The app reads it at runtime so no rebuild is needed to toggle maintenance.
// Override in dev: ?bypass=true (skip) | ?maintenance=true or #maintenance (force on)
