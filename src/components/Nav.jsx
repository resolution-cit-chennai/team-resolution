import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal-950/85 backdrop-blur-xl border-b border-bone-100/10 shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
        <a
          href="#top"
          onClick={scrollToSection("top")}
          className="group flex items-center gap-3 shrink-0"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 rounded-full bg-signal-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={logo}
              alt="Team Resolution"
              className="relative h-9 w-9 object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="font-display text-lg tracking-wider text-bone-100 leading-none pt-0.5 group-hover:text-signal-400 transition-colors hidden xs:block sm:block">
            TEAM RESOLUTION
          </span>
        </a>

        <nav className="flex items-center gap-4 sm:gap-6">
          <a
            href="#showcase"
            onClick={scrollToSection("showcase")}
            className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-medium text-bone-300 hover:text-signal-400 transition-colors relative group py-1"
          >
            <Sparkles size={14} className="text-signal-400/70 group-hover:text-signal-400 transition-colors" />
            <span>Why Join Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-signal-400 group-hover:w-full transition-all duration-300" />
          </a>

          <a
            href="#apply"
            onClick={scrollToSection("apply")}
            className="group relative inline-flex items-center gap-2 rounded-full bg-signal-400 px-5 py-2.5 text-xs sm:text-sm font-semibold text-charcoal-950 shadow-md shadow-signal-400/20 hover:bg-signal-500 hover:shadow-lg hover:shadow-signal-400/35 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Apply Now</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
        </nav>
      </div>
    </header>
  );
}
