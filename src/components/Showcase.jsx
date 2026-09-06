import { motion } from "framer-motion";
import CoverflowCarousel from "./CoverflowCarousel";
import { SHOWCASE_ITEMS } from "../data/showcase";

export default function Showcase() {
  return (
    <section className="relative border-t border-charcoal-700/60 bg-charcoal-950 overflow-hidden">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] max-w-[700px] h-[400px] ambient-glow-2 blur-3xl opacity-35" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-bone-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone-100) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-signal-400/10 px-3.5 py-1 text-xs font-semibold text-signal-400 mb-4">
            OUR CREATIVE PORTFOLIO
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-bone-100 max-w-2xl mx-auto tracking-tight">
            The Work Speaks <span className="text-signal-400">Before We Do!</span>
          </h2>
          <p className="mt-4 text-bone-300 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Take a look around — drag, scroll, or click to explore our crew’s event media, cinematography, and digital productions.
          </p>
        </motion.div>

        <div className="mt-8">
          <CoverflowCarousel items={SHOWCASE_ITEMS} />
        </div>
      </div>
    </section>
  );
}
