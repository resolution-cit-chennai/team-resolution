import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SOFTWARE_OPTIONS } from "../data/options";

const lines = ["JOIN TEAM", "RESOLUTION"];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const ticker = [...SOFTWARE_OPTIONS, ...SOFTWARE_OPTIONS];

  return (
    <section id="top" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-bone-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone-100) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-signal-400)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-4 text-sm text-bone-500">Recruiting Photographers · Cinematographers · Editors · Designers</p>

        <h1 className="font-display text-[11.5vw] leading-[0.9] sm:text-[9vw] lg:text-[6.4rem] text-bone-100">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                custom={i}
                initial="hidden"
                animate="show"
                variants={lineVariants}
              >
                {i === 1 ? <span className="text-signal-400">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 max-w-lg text-bone-300 text-base sm:text-lg"
        >
          Join the crew of creative minds and let's bring creativity to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-9 flex items-center gap-5"
        >
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-sm bg-signal-400 px-5 py-3 text-sm font-semibold text-charcoal-950 hover:bg-signal-500 transition-colors"
          >
            Start Application
            <ArrowDown size={16} />
          </a>
          <a href="#showcase" className="text-sm text-bone-300 hover:text-signal-400 transition-colors">
            See the work first →
          </a>
        </motion.div>
      </div>

      <div className="relative mt-16 sm:mt-20 border-y border-charcoal-700 bg-charcoal-800/60 py-3">
        <div className="marquee-track">
          {ticker.map((item, i) => (
            <span
              key={`${item.id}-${i}`}
              className="flex items-center gap-2 px-6 text-sm tracking-wide text-bone-500 whitespace-nowrap"
            >
              <item.icon size={14} className="text-signal-400" />
              {item.label.toUpperCase()}
              <span className="ml-6 text-charcoal-600">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
