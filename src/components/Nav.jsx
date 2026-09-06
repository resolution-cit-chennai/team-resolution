import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-charcoal-900/90 backdrop-blur-md border-b border-charcoal-700" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="Team Resolution" className="h-9 w-9 object-contain" />
          <span className="font-display text-lg tracking-wide text-bone-100 leading-none pt-0.5">
            TEAM RESOLUTION
          </span>
        </a>

        <nav className="flex items-center gap-3 sm:gap-5">
          <a
            href="#showcase"
            className="hidden xs:inline text-sm text-bone-300 hover:text-signal-400 transition-colors"
          >
            Why Join Team Resolution
          </a>
          <a
            href="#apply"
            className="inline-flex items-center rounded-sm bg-signal-400 px-4 py-2 text-sm font-semibold text-charcoal-950 hover:bg-signal-500 transition-colors"
          >
            Apply Now
          </a>
        </nav>
      </div>
    </header>
  );
}
