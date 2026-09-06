import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { SOFTWARE_OPTIONS } from "../data/options";

const lines = ["JOIN TEAM", "RESOLUTION"];

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero({ onNavigateApply }) {
  const ticker = [...SOFTWARE_OPTIONS, ...SOFTWARE_OPTIONS, ...SOFTWARE_OPTIONS];

  return (
    <section id="top" className="relative pt-32 pb-16 sm:pt-44 sm:pb-24 overflow-hidden">
      {/* Background ambient lighting - optimized for mobile & desktop */}
      <div className="pointer-events-none absolute -top-8 sm:top-10 left-1/2 -translate-x-1/2 w-[110vw] sm:w-[150vw] max-w-[700px] h-[320px] sm:h-[400px] ambient-glow-1 blur-2xl sm:blur-3xl opacity-70 sm:opacity-60" />
      <div className="pointer-events-none absolute top-1/4 -right-16 sm:-top-40 sm:right-[-10%] w-[90vw] sm:w-[120vw] max-w-[500px] h-[320px] sm:h-[500px] ambient-glow-2 blur-2xl sm:blur-3xl opacity-45 sm:opacity-40" />

      {/* Grid Pattern Background - responsive size & edge-to-edge mobile mask */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09] sm:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-bone-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone-100) 1px, transparent 1px)",
          backgroundSize: "clamp(32px, 5vw, 52px) clamp(32px, 5vw, 52px)",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 35%, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 35%, black 40%, transparent 95%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        {/* Recruiting Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-signal-400/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-signal-400 mb-6 backdrop-blur-md shadow-sm shadow-signal-400/10 max-w-full"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-400" />
          </span>
          <span className="tracking-wide shrink-0">RECRUITING 2026</span>
          <span className="text-bone-500 hidden xs:inline">•</span>
          <span className="text-bone-300 hidden xs:inline truncate max-w-[240px] sm:max-w-none">
            Photographers · Cinematographers · Editors · Designers
          </span>
        </motion.div>

        {/* Main Hero Display Title */}
        <h1 className="font-display text-[12vw] leading-[0.88] sm:text-[9.5vw] lg:text-[6.8rem] xl:text-[8rem] text-bone-100 tracking-tight">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                custom={i}
                initial="hidden"
                animate="show"
                variants={lineVariants}
              >
                {i === 1 ? (
                  <span className="relative inline-block text-signal-400 drop-shadow-[0_0_35px_rgba(255,207,37,0.3)]">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-7 max-w-xl text-bone-300 text-base sm:text-lg leading-relaxed font-normal"
        >
          Join the crew of creative minds and let's bring imagination to life through visual storytelling, cinematography, design, and live performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <a
            href="#/apply"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateApply) onNavigateApply();
              else window.location.hash = "#/apply";
            }}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-signal-400 px-7 py-3.5 text-sm font-semibold text-charcoal-950 glow-accent glow-accent-hover hover:bg-signal-500 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <span>Start Application</span>
            <ArrowDown size={17} className="group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>

          <a
            href="#showcase"
            className="group inline-flex items-center gap-2 rounded-full border border-charcoal-700 bg-charcoal-900/60 px-6 py-3.5 text-sm font-medium text-bone-300 hover:border-signal-400/50 hover:text-signal-400 hover:bg-charcoal-800/80 transition-all duration-200"
          >
            <Sparkles size={15} className="text-signal-400/80 group-hover:rotate-12 transition-transform" />
            <span>See the work first</span>
            <span className="text-signal-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>

      {/* Software Marquee Bar */}
      <div className="relative mt-20 sm:mt-24 border-y border-charcoal-700/80 bg-charcoal-900/40 backdrop-blur-md py-4 marquee-mask">
        <div className="marquee-track">
          {ticker.map((item, i) => (
            <span
              key={`${item.id}-${i}`}
              className="flex items-center gap-2.5 px-6 text-xs sm:text-sm font-medium tracking-wider text-bone-300/80 whitespace-nowrap hover:text-signal-400 transition-colors"
            >
              <item.icon size={15} className="text-signal-400 opacity-90" />
              <span>{item.label.toUpperCase()}</span>
              <span className="ml-5 text-charcoal-700 font-light">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
