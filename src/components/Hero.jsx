import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Flame, Disc, Radio, CheckCircle2, Layers, Film, ArrowRight } from "lucide-react";
import { SOFTWARE_OPTIONS } from "../data/options";

const lines = ["JOIN TEAM", "RESOLUTION"];

export default function Hero() {
  const ticker = [...SOFTWARE_OPTIONS, ...SOFTWARE_OPTIONS];

  return (
    <section id="top" className="relative pt-36 pb-12 sm:pt-44 sm:pb-20">
      <div className="relative mx-auto max-w-7xl px-3 sm:px-6">
        
        {/* iOS 2x2 Widget Grid on Mobile / 4-Column on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          
          {/* Widget 1: Status */}
          <div className="ios-glass-card p-3.5 sm:p-4 rounded-3xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-semibold text-bone-500 uppercase tracking-wide">
              <span className="flex items-center gap-1.5 text-signal-400">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-400 animate-ping" />
                <span>Status</span>
              </span>
              <span className="font-mono text-signal-400 font-bold text-xs">2026</span>
            </div>
            <div className="mt-2.5">
              <span className="font-display text-xl sm:text-2xl text-bone-100 block leading-tight tracking-tight uppercase">
                RECRUITING
              </span>
              <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                ● ACTIVE
              </span>
            </div>
          </div>

          {/* Widget 2: Roles */}
          <div className="ios-glass-card p-3.5 sm:p-4 rounded-3xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-semibold text-bone-500 uppercase tracking-wide">
              <span className="flex items-center gap-1.5 text-bone-300">
                <Layers size={12} className="text-signal-400" />
                <span>Crew</span>
              </span>
              <span className="font-mono text-signal-400 font-bold text-xs">4/4</span>
            </div>
            <div className="mt-2.5">
              <span className="font-display text-xl sm:text-2xl text-bone-100 block leading-tight tracking-tight uppercase">
                CREATIVE
              </span>
              <span className="inline-block mt-1 text-[10px] font-bold text-signal-400 bg-signal-400/10 border border-signal-400/30 px-2 py-0.5 rounded-full">
                PHOTO • VIDEO
              </span>
            </div>
          </div>

          {/* Widget 3: Organization */}
          <div className="ios-glass-card p-3.5 sm:p-4 rounded-3xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-semibold text-bone-500 uppercase tracking-wide">
              <span className="flex items-center gap-1.5 text-signal-400">
                <Sparkles size={12} className="text-signal-400" />
                <span>CIT</span>
              </span>
              <span className="font-mono text-emerald-400 font-bold text-xs">100%</span>
            </div>
            <div className="mt-2.5">
              <span className="font-display text-xl sm:text-2xl text-bone-100 block leading-tight tracking-tight uppercase">
                MEDIA HUB
              </span>
              <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                OFFICIAL
              </span>
            </div>
          </div>

          {/* Widget 4: Portfolio Requirement */}
          <div className="ios-glass-card p-3.5 sm:p-4 rounded-3xl relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-semibold text-bone-500 uppercase tracking-wide">
              <span className="flex items-center gap-1.5 text-red-400">
                <Zap size={12} className="text-red-400 fill-red-400" />
                <span>Pass</span>
              </span>
              <span className="font-mono text-red-400 font-bold text-xs">DIRECT</span>
            </div>
            <div className="mt-2.5">
              <span className="font-display text-xl sm:text-2xl text-bone-100 block leading-tight tracking-tight uppercase">
                PORTFOLIO
              </span>
              <span className="inline-block mt-1 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
                REQUIRED
              </span>
            </div>
          </div>

        </div>

        {/* Main Hero iOS Glass Card */}
        <div className="ios-glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full ios-glass-pill px-4 py-1.5 text-xs font-semibold text-signal-400 mb-6 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-400" />
            </span>
            <span className="tracking-wide">RECRUITING 2026</span>
            <span className="text-bone-500">•</span>
            <span className="text-bone-100 font-medium">Photographers · Cinematographers · Editors · Designers</span>
          </div>

          {/* Big Display Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-bone-100 leading-[0.98] uppercase">
            JOIN TEAM <span className="text-signal-400">RESOLUTION</span>
          </h1>

          <p className="mt-5 max-w-xl text-bone-300 text-base sm:text-lg leading-relaxed font-normal">
            Join the crew of creative minds and let's bring imagination to life through visual storytelling, cinematography, design, and live performance.
          </p>

          {/* iOS Interactive Glass Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#apply"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("apply");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary"
            >
              <span>Start Application</span>
              <ArrowRight size={16} />
            </a>

            <a
              href="#showcase"
              className="btn-secondary"
            >
              <Film size={15} className="text-signal-400" />
              <span>See the work first</span>
              <span className="text-signal-400">→</span>
            </a>
          </div>

          {/* Inset Software Marquee Strip */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-signal-400 uppercase tracking-widest shrink-0">
              TOOLS
            </span>
            <div className="overflow-hidden flex-1 marquee-mask">
              <div className="marquee-track">
                {ticker.map((item, i) => (
                  <span
                    key={`${item.id}-${i}`}
                    className="flex items-center gap-2 px-4 text-xs font-medium text-bone-300 whitespace-nowrap hover:text-signal-400 transition-colors"
                  >
                    <item.icon size={13} className="text-signal-400" />
                    <span className="tracking-wide uppercase">{item.label}</span>
                    <span className="ml-3 text-bone-500">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
