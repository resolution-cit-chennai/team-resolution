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
    <div className="min-h-screen bg-[#080706] text-bone-100 flex flex-col justify-between font-sans p-4 sm:p-6 relative overflow-hidden">
      
      {/* Floating Ambient Mesh Spheres */}
      <div className="pointer-events-none fixed top-[-10vw] left-[20vw] w-[80vw] max-w-[700px] h-[700px] ios-mesh-glow-1 blur-[120px] opacity-40 z-0" />
      <div className="pointer-events-none fixed top-[40vh] right-[-10vw] w-[70vw] max-w-[600px] h-[600px] ios-mesh-glow-2 blur-[120px] opacity-30 z-0" />

      {/* Noise Texture Layer */}
      <div className="noise-layer" />

      <div className="flex-1 flex items-center justify-center relative z-10 py-12">
        {/* iOS Glass Maintenance Card */}
        <div className="mx-auto max-w-2xl w-full ios-glass-card rounded-[2.5rem] p-6 sm:p-12 text-center relative overflow-hidden shadow-2xl">

          {/* Top Status Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-signal-400/15 border border-signal-400/30 flex items-center justify-center text-signal-400">
                <Zap size={16} />
              </div>
              <div className="text-left">
                <span className="font-tech text-xs font-bold text-signal-400 tracking-wider uppercase block">
                  System Upgrade
                </span>
                <span className="text-[10px] text-bone-400 font-medium">
                  Maintenance Mode Active
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[11px] font-sans text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-bold">UPGRADE IN PROGRESS</span>
            </div>
          </div>

          {/* Brand Logo & Name */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={logo} alt="Team Resolution" className="h-10 w-10 object-contain" />
            <div className="text-left">
              <span className="font-sans font-extrabold text-xl text-bone-100 tracking-wider uppercase block leading-none">
                TEAM RESOLUTION
              </span>
              <span className="font-tech text-[10px] uppercase text-signal-400 font-bold tracking-widest mt-1 block">
                Chennai Institute of Technology
              </span>
            </div>
          </div>

          {/* Diagnostic Inset Card */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 max-w-lg mx-auto mb-8 text-left backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-sans text-bone-400 mb-2 border-b border-white/10 pb-2">
              <span className="text-signal-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-signal-400 animate-ping" />
                <span>PLATFORM DEPLOYMENT</span>
              </span>
              <span className="font-mono text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                78% COMPLETE
              </span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-bone-300 leading-relaxed">
              We’re giving the <strong className="text-signal-400">Team Resolution</strong> platform a major cinematic upgrade. Recruitment portals and media archives will be back online shortly.
            </p>

            {/* iOS Smooth Segmented Progress Bar */}
            <div className="mt-4 h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-signal-400 rounded-full shadow-[0_0_10px_rgba(255,207,37,0.9)]"
                style={{ width: "78%" }}
              />
            </div>
          </div>

          {/* Big Headline */}
          <h1 className="font-display text-4xl sm:text-6xl text-bone-100 uppercase tracking-tight leading-none mb-6">
            REVEALING <span className="text-signal-400">SOON</span>
          </h1>

          <div className="flex justify-center">
            {SOCIAL_LINKS[0] && (
              <a
                href={SOCIAL_LINKS[0].href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary py-3.5 px-8 rounded-full flex items-center gap-2 text-xs font-bold active:scale-95 transition-all shadow-xl"
              >
                <InstagramIcon size={16} />
                <span className="tracking-wider">FOLLOW UPDATES ON INSTAGRAM</span>
                <ArrowRight size={15} />
              </a>
            )}
          </div>

        </div>
      </div>

      <footer className="text-center text-xs font-sans text-bone-400 relative z-10 pb-2">
        <p>© {new Date().getFullYear()} Team Resolution • Chennai Institute of Technology</p>
      </footer>

    </div>
  );
}
