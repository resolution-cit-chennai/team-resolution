import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Flame, Disc, Radio, CheckCircle, AlertTriangle, FileText, Film, Layers } from "lucide-react";
import { SOFTWARE_OPTIONS } from "../data/options";

const lines = ["JOIN TEAM", "RESOLUTION"];

export default function Hero() {
  const ticker = [...SOFTWARE_OPTIONS, ...SOFTWARE_OPTIONS];

  return (
    <section id="top" className="relative pt-32 pb-14 sm:pt-36 sm:pb-20">
      <div className="relative mx-auto max-w-7xl px-3 sm:px-6">

        {/* Master OS Dashboard Container */}
        <div className="os-window p-3 sm:p-5">

          {/* Top 4-Column Retro Telemetry Metrics (Matching reference screenshot style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">

            {/* Box 1: Overall Readiness */}
            <div className="os-panel-inset p-3">
              <div className="flex items-center justify-between text-[11px] font-tech text-bone-500 uppercase">
                <span className="flex items-center gap-1.5 text-signal-400 font-bold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal-400" />
                  <span>OVERALL STATUS</span>
                </span>
                <span className="font-mono text-signal-400 font-bold text-xs">2026</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-2xl sm:text-3xl text-bone-100 tracking-tight">
                  RECRUITING
                </span>
                <span className="os-badge-ready text-[10px]">ACTIVE</span>
              </div>
              <p className="hidden sm:block mt-2 text-[10px] font-tech text-bone-500 truncate">
                Target: Creative & Technical Crew
              </p>
            </div>

            {/* Box 2: Roles */}
            <div className="os-panel-inset p-3">
              <div className="flex items-center justify-between text-[11px] font-tech text-bone-500 uppercase">
                <span className="flex items-center gap-1.5 text-bone-300 font-bold">
                  <Layers size={11} className="text-signal-400" />
                  <span>CREW DISCIPLINES</span>
                </span>
                <span className="font-mono text-signal-400 font-bold text-xs">4/4</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-2xl sm:text-3xl text-bone-100 tracking-tight">
                  CREATIVE
                </span>
                <span className="os-badge-ready text-[10px]">ACTIVE</span>
              </div>
              <p className="hidden sm:block mt-2 text-[10px] font-tech text-bone-500 truncate">
                Photo • Video • Design • Edit
              </p>
            </div>

            {/* Box 3: Organization */}
            <div className="os-panel-inset p-3">
              <div className="flex items-center justify-between text-[11px] font-tech text-bone-500 uppercase">
                <span className="flex items-center gap-1.5 text-signal-400 font-bold">
                  <Sparkles size={11} className="text-signal-400" />
                  <span>CIT CHENNAI</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold text-xs">100%</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-2xl sm:text-3xl text-bone-100 tracking-tight">
                  MEDIA HUB
                </span>
                <span className="os-badge-active text-[10px]">OFFICIAL</span>
              </div>
              <p className="hidden sm:block mt-2 text-[10px] font-tech text-bone-500 truncate">
                Chennai Institute of Technology
              </p>
            </div>

            {/* Box 4: Action */}
            <div className="os-panel-inset p-3">
              <div className="flex items-center justify-between text-[11px] font-tech text-bone-500 uppercase">
                <span className="flex items-center gap-1.5 text-red-400 font-bold">
                  <AlertTriangle size={11} className="text-red-400" />
                  <span>APPLICATION PASS</span>
                </span>
                <span className="font-mono text-red-400 font-bold text-xs">LIMITED</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-display text-2xl sm:text-3xl text-bone-100 tracking-tight">
                  STUDENT PORTFOLIO
                </span>
                <span className="os-badge-critical text-[10px]">REQUIRED</span>
              </div>
              <p className="hidden sm:block mt-2 text-[10px] font-tech text-bone-500 truncate">
                Review: Direct Lead Screening
              </p>
            </div>

          </div>

          {/* Main Hero Header Area */}
          <div className="os-panel-outset p-5 sm:p-8 relative overflow-hidden bg-[#141311]">

            {/* Memorandum Box (Directly inspired by the reference screenshot) */}
            <div className="mb-6 p-3 bg-[#1c1a16] border border-signal-400/40 border-l-4 border-l-signal-400">
              <div className="flex items-center justify-between text-[11px] font-tech text-signal-400 font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  <FileText size={12} className="text-signal-400" />
                  <span>MEMORANDUM: HIGHEST-LEVERAGE ACTION TODAY</span>
                </span>
                <span className="text-bone-500">[PRIORITY 1]</span>
              </div>
              <p className="text-xs sm:text-sm font-tech text-bone-100 leading-relaxed">
                Submit Your Application & Showcase Your Work — Join CIT's Leading Creative Crew in Video, Photography, Design, and Live Production.
              </p>
            </div>

            {/* Big 90s-2000s Display Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-bone-100 leading-[0.95] uppercase">
              JOIN TEAM <span className="text-signal-400">RESOLUTION</span>
            </h1>

            <p className="mt-4 max-w-2xl text-bone-300 text-sm sm:text-base font-tech leading-relaxed">
              We bring events, cinematography, visual effects, and digital media to life. Step up and show us your talent.
            </p>

            {/* Action Button Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#apply"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("apply");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Zap size={13} />
                <span>START APPLICATION WIZARD</span>
                <ArrowDown size={14} />
              </a>

              <a
                href="#showcase"
                className="btn-secondary flex items-center gap-2"
              >
                <Film size={13} className="text-signal-400" />
                <span>VIEW SHOWCASE MATRIX</span>
                <span>→</span>
              </a>
            </div>

          </div>

          {/* Software Ticker Inset Bar */}
          <div className="mt-4 os-panel-inset py-2 px-3 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-tech text-signal-400 font-bold shrink-0 mr-4 border-r border-charcoal-700 pr-3">
              <span>[TOOLS]</span>
            </div>
            <div className="overflow-hidden flex-1 marquee-mask">
              <div className="marquee-track">
                {ticker.map((item, i) => (
                  <span
                    key={`${item.id}-${i}`}
                    className="flex items-center gap-2 px-4 text-xs font-tech text-bone-300 whitespace-nowrap hover:text-signal-400 transition-colors"
                  >
                    <item.icon size={13} className="text-signal-400" />
                    <span>{item.label.toUpperCase()}</span>
                    <span className="ml-3 text-charcoal-600 font-mono">/</span>
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
