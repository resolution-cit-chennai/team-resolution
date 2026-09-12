import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Terminal } from "lucide-react";
import logo from "../assets/logo.png";
import { SOCIAL_LINKS } from "../config";

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

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0c0b0a] text-bone-100 flex flex-col justify-between font-body p-3 sm:p-6">

      {/* Master Maintenance OS Window */}
      <div className="mx-auto max-w-4xl w-full os-window mt-8">

        {/* Window Titlebar */}
        <div className="os-titlebar">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-4 w-4 bg-[#ffcf25] text-[#0c0b0a] font-black text-[10px] rounded-sm">
              <Zap size={10} className="fill-charcoal-950 text-charcoal-950" />
            </div>
            <span className="font-tech font-bold text-xs text-bone-100">
              MAINTENANCE_REBOOT.EXE [v2.00] — System Upgrade in Progress
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="os-badge-critical text-[10px] hidden sm:inline">
              ● MAINTENANCE MODE
            </span>
            <div className="flex items-center gap-1">
              <button type="button" className="os-btn-control" aria-label="Minimize">_</button>
              <button type="button" className="os-btn-control" aria-label="Maximize">□</button>
              <button type="button" className="os-btn-control os-btn-control-close" aria-label="Close">✕</button>
            </div>
          </div>
        </div>

        {/* Window Menu Bar */}
        <div className="bg-[#1a1815] px-3 py-1 border-b border-black text-[11px] font-tech text-bone-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>System</span>
            <span>Diagnostics</span>
            <span>Logs</span>
            <span className="text-charcoal-600">|</span>
            <span className="text-bone-500">Status: Code 503 Service Upgrade</span>
          </div>
          <span className="text-signal-400 font-bold">CIT CREW CORE</span>
        </div>

        {/* Window Body */}
        <div className="p-6 sm:p-12 bg-[#141311] text-center">

          {/* Brand Row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={logo} alt="Team Resolution" className="h-10 w-10 object-contain" />
            <div className="text-left">
              <span className="font-display text-xl text-bone-100 leading-none block">
                TEAM RESOLUTION
              </span>
              <span className="font-tech text-[10px] uppercase text-signal-400 font-bold tracking-wider">
                Chennai Institute of Technology
              </span>
            </div>
          </div>

          {/* Diagnostic Inset Box */}
          <div className="os-panel-inset p-4 max-w-lg mx-auto mb-8 text-left">
            <div className="flex items-center justify-between text-[11px] font-tech text-bone-500 mb-2 border-b border-charcoal-800 pb-1">
              <span className="text-signal-400 font-bold">● SYSTEM DEPLOYMENT</span>
              <span className="os-badge-active text-[9px]">BUILDING</span>
            </div>
            <p className="text-xs font-tech text-bone-300 leading-relaxed">
              We’re giving the <strong className="text-signal-400">Team Resolution</strong> platform a major cinematic upgrade. Recruitment portals and media archives will be back online shortly.
            </p>
            {/* Segmented Meter */}
            <div className="mt-3 flex items-center gap-1 font-mono text-xs text-signal-400">
              <span className="bg-signal-400 text-charcoal-950 px-1 py-0.2 font-bold">■■■■■■■■■■■■■■</span>
              <span className="text-charcoal-600">□□□□</span>
              <span className="text-[10px] ml-2 text-bone-500">78%</span>
            </div>
          </div>

          {/* Big Headline */}
          <h1 className="font-display text-4xl sm:text-6xl text-bone-100 uppercase tracking-tight leading-none mb-4">
            REVEALING <span className="text-signal-400">SOON</span>
          </h1>

          <div className="mt-6 flex justify-center">
            {SOCIAL_LINKS[0] && (
              <a
                href={SOCIAL_LINKS[0].href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary flex items-center gap-2 text-xs font-tech"
              >
                <InstagramIcon size={14} />
                <span>FOLLOW UPDATES ON INSTAGRAM</span>
                <ArrowRight size={13} />
              </a>
            )}
          </div>

        </div>

        {/* Window Status Footer */}
        <div className="bg-[#1a1815] px-3 py-1.5 border-t border-black text-[10px] font-tech text-bone-500 flex items-center justify-between">
          <span>Process: DEPLOY_MEDIA_PORTAL_2026</span>
          <span>CIT Chennai • All Rights Reserved</span>
        </div>

      </div>

      <footer className="text-center text-xs font-tech text-bone-500 mt-6 pb-2">
        <p>© {new Date().getFullYear()} Team Resolution • Chennai Institute of Technology</p>
      </footer>

    </div>
  );
}
