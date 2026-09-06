import logo from "../assets/logo.png";
import { CONTACT_NUMBERS, SOCIAL_LINKS } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-700 bg-charcoal-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Team Resolution" className="h-8 w-8 object-contain" />
            <span className="font-display text-base tracking-wide text-bone-100">TEAM RESOLUTION</span>
          </div>

          <div>
            <p className="text-sm text-bone-500 mb-3">Questions? Reach out</p>
            <div className="flex flex-col gap-2">
              {CONTACT_NUMBERS.map((c) => (
                <a
                  key={`${c.label}-${c.number}`}
                  href={`tel:${c.number.replace(/\s+/g, "")}`}
                  className="text-bone-100 hover:text-signal-400 transition-colors"
                >
                  <span className="text-bone-500 mr-2">{c.label}:</span>
                  {c.number}
                </a>
              ))}
            </div>
          </div>

          {SOCIAL_LINKS.length > 0 && (
            <div>
              <p className="text-sm text-bone-500 mb-3">Connect</p>
              <div className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-sm border border-charcoal-700 bg-charcoal-800/80 px-4 py-2 text-sm font-medium text-bone-100 hover:border-signal-400 hover:text-signal-400 transition-all duration-200"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-signal-400 group-hover:scale-110 transition-transform"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-12 text-xs text-bone-500">
          © {new Date().getFullYear()} Team Resolution. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
