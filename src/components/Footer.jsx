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
    <footer id="footer" className="mt-12 bg-[#12110f] border-t-2 border-black">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-10">
        
        {/* Main Footer Windows Panel */}
        <div className="os-panel-outset p-5 sm:p-8 bg-[#171614] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-between">
            
            {/* Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="Team Resolution" className="h-8 w-8 object-contain" />
                <span className="font-display text-lg tracking-wider text-bone-100 uppercase">
                  TEAM RESOLUTION
                </span>
              </div>
              <p className="text-xs font-tech text-bone-300 leading-relaxed max-w-xs">
                The official creative & technical media crew of Chennai Institute of Technology. Pre-production, production, and post-production.
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 font-tech text-[10px] text-signal-400 border border-signal-400/40 bg-[#0c0b0a] px-2 py-0.5">
                  <Terminal size={11} />
                  <span>RESOLUTION_OS [v2.00]</span>
                </span>
              </div>
            </div>

            {/* Contact Numbers in 3D panels */}
            <div>
              <p className="text-xs font-tech font-bold uppercase tracking-wider text-signal-400 mb-3 flex items-center gap-1.5">
                <Phone size={12} className="text-signal-400" />
                <span>DIRECT LINE / CONTACT</span>
              </p>
              <div className="flex flex-col gap-2">
                {CONTACT_NUMBERS.map((c) => (
                  <a
                    key={`${c.label}-${c.number}`}
                    href={`tel:${c.number.replace(/\s+/g, "")}`}
                    className="os-panel-inset p-2 flex items-center gap-2.5 text-xs font-tech hover:border-signal-400 transition-colors group"
                  >
                    <div className="h-6 w-6 flex items-center justify-center bg-[#22201d] border border-charcoal-700 text-signal-400 shrink-0">
                      <Phone size={12} />
                    </div>
                    <div>
                      <span className="block text-[10px] text-bone-500 uppercase">{c.label}</span>
                      <span className="font-bold text-bone-100 group-hover:text-signal-400">{c.number}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            {SOCIAL_LINKS.length > 0 && (
              <div>
                <p className="text-xs font-tech font-bold uppercase tracking-wider text-signal-400 mb-3 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-signal-400" />
                  <span>SOCIAL CHANNELS</span>
                </p>
                <div className="flex flex-col gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="os-btn !justify-start text-xs font-tech"
                    >
                      <InstagramIcon size={14} className="text-signal-400" />
                      <span>{s.label.toUpperCase()}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Retro OS Bottom Status Taskbar */}
        <div className="bg-[#1a1815] border-t border-b border-black py-2 px-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-tech text-bone-500">
          <div className="flex items-center gap-2">
            <span className="os-badge-ready text-[9px]">● SYSTEM READY</span>
            <span>© {new Date().getFullYear()} Team Resolution CIT. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-charcoal-500 hidden md:inline">
              [ 1024x768 OPTIMIZED ]
            </span>
            <p className="flex items-center gap-1 text-bone-300">
              <span>Crafted with</span>
              <Heart size={11} className="text-red-400 fill-red-400" />
              <span>by Team Resolution</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
