import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Zap } from "lucide-react";
import { SOCIAL_LINKS } from "../../config";

const INSTAGRAM_URL =
  SOCIAL_LINKS.find((l) => l.href?.includes("instagram"))?.href ||
  "https://www.instagram.com/team_resolution.cit/";

function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ApplicationSuccess() {
  const TOTAL_SECONDS = 10;
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const redirected = useRef(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (!redirected.current) {
        redirected.current = true;
        window.location.href = INSTAGRAM_URL;
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const progressPercent = (timeLeft / TOTAL_SECONDS) * 100;

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="ios-glass-card rounded-[2.5rem] p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-signal-400/20 border border-signal-400/40 text-signal-400 mb-6 shadow-[0_0_30px_rgba(255,207,37,0.3)]">
          <CheckCircle2 size={44} />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl text-bone-100 uppercase tracking-tight">
          Application <span className="text-signal-400">Received!</span>
        </h2>

        <p className="mt-3 text-xs sm:text-sm font-sans text-bone-300 max-w-md mx-auto leading-relaxed">
          Thank you for applying to <strong className="text-signal-400">TEAM RESOLUTION</strong>. Our leads will review your portfolio and contact you shortly.
        </p>

        {/* 10-Second Auto-Redirect Box */}
        <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-4 max-w-sm mx-auto text-left backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-sans font-bold mb-2 text-bone-200">
            <span className="flex items-center gap-1.5">
              <RotateCcw size={14} className="animate-spin text-signal-400" />
              <span>Redirecting to Instagram</span>
            </span>
            <span className="text-signal-400 font-mono font-bold text-sm">
              {timeLeft}s
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="h-full bg-signal-400 rounded-full shadow-[0_0_10px_rgba(255,207,37,0.8)]"
              initial={{ width: "100%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>

          <p className="mt-2 text-[10px] font-sans text-bone-400 text-center font-medium">
            Redirecting automatically...
          </p>
        </div>

        <div className="mt-8">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full text-xs font-bold active:scale-95 transition-all shadow-xl"
          >
            <InstagramIcon size={16} />
            <span>VISIT TEAM INSTAGRAM</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
