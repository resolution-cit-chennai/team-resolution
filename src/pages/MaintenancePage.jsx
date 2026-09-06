import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";
import { SOCIAL_LINKS } from "../config";

function InstagramIcon({ size = 18, className = "" }) {
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
    <div className="relative min-h-screen bg-charcoal-950 text-bone-100 flex flex-col justify-between overflow-hidden selection:bg-signal-400 selection:text-charcoal-950">
      {/* Noise Texture Layer */}
      <div className="noise-layer" />

      {/* Dynamic Ambient Glow Backdrops */}
      <div className="pointer-events-none absolute top-[-15%] left-1/2 -translate-x-1/2 w-[160vw] max-w-[900px] h-[600px] ambient-glow-1 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] w-[120vw] max-w-[650px] h-[500px] ambient-glow-2 blur-3xl opacity-30" />

      {/* Subtle Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-bone-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone-100) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top Brand Header */}
      <header className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Team Resolution" className="h-10 w-10 object-contain drop-shadow-md" />
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-wider text-bone-100 leading-none">
              TEAM RESOLUTION
            </span>
            <span className="text-[10px] uppercase tracking-widest text-bone-500 font-semibold mt-0.5">
              Chennai Institute of Technology
            </span>
          </div>
        </div>

        {/* Live System Status Pulse */}
        <div className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-charcoal-900/80 px-3.5 py-1.5 text-xs font-medium text-bone-300 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-400" />
          </span>
          <span className="font-mono text-[11px] tracking-wide text-signal-400">MAINTENANCE MODE</span>
        </div>
      </header>

      {/* Main Hero Reveal Content */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 py-12 sm:py-16 text-center flex flex-col items-center justify-center flex-1">
        {/* Animated Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-signal-400/40 bg-signal-400/10 px-4 py-1.5 text-xs font-bold text-signal-400 mb-6 shadow-lg shadow-signal-400/10"
        >
          <Sparkles size={14} className="text-signal-400 animate-pulse" />
          <span className="tracking-wider">SOMETHING EXTRAORDINARY IS COMING</span>
        </motion.div>

        {/* Big Display Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl text-bone-100 tracking-tight leading-[0.95] sm:leading-[0.95]"
        >
          REVEALING <span className="text-signal-400 underline decoration-signal-400/30 underline-offset-8">SOON</span>
        </motion.h1>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-bone-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal"
        >
          We’re giving the <strong className="text-bone-100 font-semibold">Team Resolution</strong> platform a major cinematic upgrade.
        </motion.p>

        {/* Direct Action Button: Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {SOCIAL_LINKS[0] && (
            <a
              href={SOCIAL_LINKS[0].href}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <InstagramIcon size={18} />
              <span>Follow Updates on Instagram</span>
              <ArrowRight size={16} />
            </a>
          )}
        </motion.div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 mx-auto max-w-7xl w-full px-5 sm:px-8 py-6 border-t border-charcoal-800 text-center text-xs text-bone-500">
        <p>© {new Date().getFullYear()} Team Resolution • Media & Creative Arts Club • CIT Chennai. All rights reserved.</p>
      </footer>
    </div>
  );
}
