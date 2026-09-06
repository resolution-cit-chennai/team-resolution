import logo from "../assets/logo.png";
import { CONTACT_NUMBERS, SOCIAL_LINKS } from "../config";
import { Phone, Heart } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-700/60 bg-charcoal-950 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start justify-between">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Team Resolution" className="h-9 w-9 object-contain" />
              <span className="font-display text-lg tracking-wider text-bone-100">TEAM RESOLUTION</span>
            </div>
            <p className="text-xs sm:text-sm text-bone-500 max-w-xs leading-relaxed">
              The official creative & technical crew of Chennai Institute of Technology. Bringing events, media, and digital experiences to life.
            </p>
          </div>

          {/* Contact Numbers */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-signal-400 mb-4">Questions? Reach Out</p>
            <div className="flex flex-col gap-3">
              {CONTACT_NUMBERS.map((c) => (
                <a
                  key={`${c.label}-${c.number}`}
                  href={`tel:${c.number.replace(/\s+/g, "")}`}
                  className="group inline-flex items-center gap-2.5 text-sm text-bone-300 hover:text-signal-400 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-charcoal-900 border border-charcoal-700 text-signal-400 group-hover:border-signal-400/50 transition-colors">
                    <Phone size={14} />
                  </div>
                  <div>
                    <span className="block text-xs text-bone-500">{c.label}</span>
                    <span className="font-medium text-bone-100 group-hover:text-signal-400 transition-colors">{c.number}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          {SOCIAL_LINKS.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-signal-400 mb-4">Connect With Us</p>
              <div className="flex flex-col gap-2.5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl border border-charcoal-700/80 bg-charcoal-900/60 px-4 py-3 text-sm font-medium text-bone-100 hover:border-signal-400/60 hover:text-signal-400 hover:bg-charcoal-800/80 shadow-sm transition-all duration-200"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-signal-400/10 text-signal-400 group-hover:scale-110 transition-transform">
                      <InstagramIcon size={16} />
                    </div>
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bone-500">
          <p>© {new Date().getFullYear()} Team Resolution CIT. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart size={13} className="text-red-500 fill-red-500/20" />
            <span>by Team Resolution</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
