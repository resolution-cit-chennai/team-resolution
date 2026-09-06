import Hero from "../components/Hero";
import Showcase from "../components/Showcase";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage({ onNavigateApply }) {
  return (
    <>
      <Hero onNavigateApply={onNavigateApply} />
      <Showcase />

      {/* Bottom CTA Banner to jump to Application Page */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-8 py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 sm:p-14 border border-signal-400/30 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 ambient-glow-1 blur-3xl opacity-40" />

          <div className="inline-flex items-center gap-2 rounded-full border border-signal-400/30 bg-signal-400/10 px-3.5 py-1 text-xs font-semibold text-signal-400 mb-4">
            <Sparkles size={14} />
            <span>JOIN THE CREW</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-bone-100 max-w-2xl mx-auto leading-tight">
            Ready to Create Something Extraordinary?
          </h2>

          <p className="mt-4 text-bone-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Whether you’re behind the lens, managing sound, editing videos, or designing graphics — there’s a place for your craft at Team Resolution.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#/apply"
              onClick={(e) => {
                e.preventDefault();
                onNavigateApply();
              }}
              className="btn-primary"
            >
              <span>Go to Application Form</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
