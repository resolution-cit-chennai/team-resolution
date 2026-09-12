import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Sparkles, ArrowRight, Zap, Radio, LayoutDashboard, Film, Phone, ChevronRight } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 200;
      const applyEl = document.getElementById("apply");
      const showcaseEl = document.getElementById("showcase");

      if (applyEl && scrollPos >= applyEl.offsetTop) {
        setActiveTab("apply");
      } else if (showcaseEl && scrollPos >= showcaseEl.offsetTop) {
        setActiveTab("showcase");
      } else {
        setActiveTab("overview");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id, tabName) => (e) => {
    e.preventDefault();
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 transition-all duration-300">
      <div className="mx-auto max-w-7xl">
        {/* iOS Dynamic Glass Floating Island Container */}
        <div className={`ios-segmented-bar rounded-2xl p-2.5 sm:px-4 sm:py-2 transition-all duration-300 ${
          scrolled ? "bg-charcoal-900/85 backdrop-blur-2xl shadow-2xl shadow-black/80 border-white/15" : ""
        }`}>
          <div className="flex items-center justify-between gap-2 px-1">
            
            {/* Logo & Brand Title */}
            <a
              href="#top"
              onClick={scrollToSection("top", "overview")}
              className="group flex items-center gap-2.5 shrink-0"
            >
              <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-signal-400/10 border border-signal-400/30 shadow-md">
                <img
                  src={logo}
                  alt="Team Resolution"
                  className="h-6 w-6 sm:h-7 sm:w-7 object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-xs sm:text-sm tracking-wider text-bone-100 leading-none group-hover:text-signal-400 transition-colors uppercase">
                  TEAM RESOLUTION
                </span>
                <span className="text-[9px] font-tech tracking-widest text-signal-400 font-bold mt-1">
                  CIT MEDIA CREW 2026
                </span>
              </div>
            </a>

            {/* iOS Status Pill + Quick Apply */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:inline-flex items-center gap-2 rounded-full ios-glass-pill px-3 py-1 text-xs font-semibold text-bone-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-bold text-[11px] tracking-wider">RECRUITING LIVE</span>
              </div>

              <a
                href="#apply"
                onClick={scrollToSection("apply", "apply")}
                className="btn-primary !py-1.5 !px-4 text-xs font-extrabold tracking-wider shrink-0"
              >
                <span className="tracking-wider">Apply</span>
                <ArrowRight size={13} />
              </a>
            </div>

          </div>

          {/* iOS Segmented Pill Tabs Bar (Mobile & Desktop Optimized) */}
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar select-none">
            <button
              type="button"
              onClick={scrollToSection("top", "overview")}
              className={`ios-tab-pill ${activeTab === "overview" ? "ios-tab-pill-active" : ""}`}
            >
              <LayoutDashboard size={13} />
              <span className="tracking-wider">Overview</span>
            </button>

            <button
              type="button"
              onClick={scrollToSection("showcase", "showcase")}
              className={`ios-tab-pill ${activeTab === "showcase" ? "ios-tab-pill-active" : ""}`}
            >
              <Film size={13} />
              <span className="tracking-wider">Showcase</span>
            </button>

            <button
              type="button"
              onClick={scrollToSection("apply", "apply")}
              className={`ios-tab-pill ${activeTab === "apply" ? "ios-tab-pill-active" : ""}`}
            >
              <Zap size={13} />
              <span className="tracking-wider">Apply Form</span>
            </button>

            <button
              type="button"
              onClick={scrollToSection("footer", "contact")}
              className={`ios-tab-pill ${activeTab === "contact" ? "ios-tab-pill-active" : ""}`}
            >
              <Phone size={13} />
              <span className="tracking-wider">Contact</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
