import logo from "../assets/logo.png";
import { CONTACT_NUMBERS, SOCIAL_LINKS } from "../config";
import { Phone, Heart, Terminal, Sparkles } from "lucide-react";

function InstagramIcon({ size = 15, className = "" }) {
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
    <footer id="footer" className="mt-12 py-8 relative">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        
        {/* Main Footer iOS Glass Card */}
        <div className="ios-glass-card rounded-[2.5rem] p-6 sm:p-10 mb-6 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-between">
            
            {/* Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="Team Resolution" className="h-9 w-9 object-contain" />
                <span className="font-display text-xl tracking-wider text-bone-100 uppercase">
                  TEAM RESOLUTION
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-bone-300 leading-relaxed max-w-xs">
                The official creative & technical media crew of Chennai Institute of Technology. Pre-production, production, and post-production.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 font-tech text-xs text-signal-400 border border-signal-400/30 bg-signal-400/10 px-3 py-1 rounded-full backdrop-blur-md">
                  <Terminal size={13} />
                  <span>RESOLUTION GLASS OS v2.0</span>
                </span>
              </div>
            </div>

            {/* Contact Numbers in Glass Pills */}
            <div>
              <p className="text-xs font-tech font-bold uppercase tracking-wider text-signal-400 mb-3 flex items-center gap-1.5">
                <Phone size={13} className="text-signal-400" />
                <span>DIRECT LINE / CONTACT</span>
              </p>
              <div className="flex flex-col gap-2.5">
                {CONTACT_NUMBERS.map((c) => (
                  <a
                    key={`${c.label}-${c.number}`}
                    href={`tel:${c.number.replace(/\s+/g, "")}`}
                    className="ios-glass-pill p-3 rounded-2xl flex items-center gap-3 text-xs font-sans hover:border-signal-400/60 transition-all group active:scale-[0.98]"
                  >
                    <div className="h-7 w-7 rounded-full flex items-center justify-center bg-signal-400/15 border border-signal-400/30 text-signal-400 shrink-0">
                      <Phone size={13} />
                    </div>
                    <div>
                      <span className="block text-[10px] text-bone-400 uppercase font-medium">{c.label}</span>
                      <span className="font-bold text-bone-100 group-hover:text-signal-400 transition-colors">{c.number}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            {SOCIAL_LINKS.length > 0 && (
              <div>
                <p className="text-xs font-tech font-bold uppercase tracking-wider text-signal-400 mb-3 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-signal-400" />
                  <span>CONNECT WITH US</span>
                </p>
                <div className="flex flex-col gap-2.5">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ios-glass-pill py-3 px-4 rounded-2xl flex items-center gap-3 text-xs font-sans font-semibold text-bone-200 hover:text-signal-400 transition-all active:scale-[0.98]"
                    >
                      <div className="h-7 w-7 rounded-full flex items-center justify-center bg-white/10 text-signal-400 shrink-0">
                        <InstagramIcon size={15} />
                      </div>
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Bottom iOS Glass Status Pill */}
        <div className="ios-segmented-bar rounded-full py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans text-bone-400 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>© {new Date().getFullYear()} Team Resolution CIT. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <p className="flex items-center gap-1.5 text-bone-200">
              <span>Crafted with</span>
              <Heart size={12} className="text-red-400 fill-red-400" />
              <span>by Team Resolution</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
