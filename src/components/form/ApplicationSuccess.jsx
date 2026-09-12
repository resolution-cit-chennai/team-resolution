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
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="os-window text-left"
      >
        {/* Window Titlebar */}
        <div className="os-titlebar">
          <div className="flex items-center gap-2">
            <Zap size={13} className="text-signal-400" />
            <span className="font-tech font-bold text-xs">
              TRANSMISSION_SUCCESS.EXE — Status 200 OK
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button type="button" className="os-btn-control" aria-label="Minimize">_</button>
            <button type="button" className="os-btn-control" aria-label="Maximize">□</button>
            <button type="button" className="os-btn-control os-btn-control-close" aria-label="Close">✕</button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 bg-[#141311] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center bg-signal-400/10 border-2 border-signal-400 text-signal-400 mb-5">
            <CheckCircle2 size={36} />
          </div>

          <h2 className="font-display text-3xl text-bone-100 uppercase tracking-tight">
            Application <span className="text-signal-400">Received!</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm font-tech text-bone-300 max-w-md mx-auto leading-relaxed">
            Thank you for applying to <strong className="text-signal-400">TEAM RESOLUTION</strong>. Our leads will review your portfolio and contact you shortly.
          </p>

          {/* 10-Second Auto-Redirect Box */}
          <div className="mt-6 os-panel-inset p-4 max-w-sm mx-auto text-left">
            <div className="flex items-center justify-between text-xs font-tech font-bold mb-2 text-bone-300">
              <span className="flex items-center gap-1.5">
                <RotateCcw size={12} className="animate-spin text-signal-400" />
                <span>Redirecting to Instagram</span>
              </span>
              <span className="text-signal-400 font-mono font-bold">
                {timeLeft}s
              </span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="h-3 w-full bg-[#050504] border border-charcoal-700 overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-signal-400"
                initial={{ width: "100%" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>

            <p className="mt-2 text-[10px] font-tech text-bone-500 text-center">
              [ AUTO-REDIRECT IN PROGRESS ]
            </p>
          </div>

          <div className="mt-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-xs"
            >
              <InstagramIcon size={15} />
              <span>VISIT TEAM INSTAGRAM</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
