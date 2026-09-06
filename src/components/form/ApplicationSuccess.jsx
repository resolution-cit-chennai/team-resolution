import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Home, RotateCcw } from "lucide-react";

export default function ApplicationSuccess({ onRedirectHome }) {
  const TOTAL_SECONDS = 10;
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const redirectRef = useRef(onRedirectHome);

  useEffect(() => {
    redirectRef.current = onRedirectHome;
  }, [onRedirectHome]);

  useEffect(() => {
    if (timeLeft <= 0) {
      redirectRef.current?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progressPercent = (timeLeft / TOTAL_SECONDS) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-3xl p-8 sm:p-12 border border-signal-400/30 shadow-2xl relative overflow-hidden"
      >
        {/* Glowing Background Accent */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 ambient-glow-1 blur-3xl opacity-50" />

        {/* Checkmark Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-signal-400/15 border border-signal-400/40 text-signal-400 mb-6 glow-accent">
          <CheckCircle2 size={44} />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-bone-100 tracking-tight">
          Application Received!
        </h2>
        
        <p className="mt-3 text-bone-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Thank you for applying to <span className="text-signal-400 font-medium">Team Resolution</span>. Our leads will review your work and contact you shortly.
        </p>

        {/* 10-Second Auto-Redirect Loader Box */}
        <div className="mt-8 rounded-2xl border border-charcoal-700 bg-charcoal-900/90 p-5 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium mb-3">
            <span className="flex items-center gap-2 text-bone-300">
              <RotateCcw size={14} className="animate-spin text-signal-400" />
              <span>Redirecting to Home</span>
            </span>
            <span className="font-mono text-signal-400 font-semibold text-sm">
              {timeLeft}s
            </span>
          </div>

          {/* Smooth Progress Bar */}
          <div className="h-2 w-full rounded-full bg-charcoal-800 overflow-hidden border border-charcoal-700">
            <motion.div
              className="h-full bg-signal-400 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
          <p className="mt-2.5 text-[11px] text-bone-500">
            If you stay on this page, it will automatically return to Home in {timeLeft} seconds.
          </p>
        </div>

        {/* Action Button: Redirect to Home */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRedirectHome}
            className="btn-primary w-full sm:w-auto"
          >
            <Home size={18} />
            <span>Redirect to Home</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
