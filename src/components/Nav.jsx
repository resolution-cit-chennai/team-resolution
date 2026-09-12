import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import { Sparkles, ArrowRight, Zap, Radio, FileText, Film, Phone, Sun, LayoutDashboard } from "lucide-react";

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
    <header className="fixed top-0 inset-x-0 z-50 bg-[#12110f] border-b border-black shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      {/* 1. Master System Window Titlebar */}
      <div className="os-titlebar border-b border-black px-2 sm:px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <div className="flex items-center justify-center h-4 w-4 bg-[#ffcf25] text-[#0c0b0a] font-black text-[10px] rounded-xs shrink-0">
            <Zap size={10} className="fill-charcoal-950 text-charcoal-950" />
          </div>
          <span className="font-tech font-bold text-xs text-bone-100 tracking-wide truncate">
            <span className="sm:hidden">Team Resolution OS [v2.00]</span>
            <span className="hidden sm:inline">Team Resolution OS [v2.00] — Creative & Technical Recruitment Portal</span>
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 font-tech text-[11px] text-bone-300 mr-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 font-bold">ONLINE</span>
            <span className="text-charcoal-600">•</span>
            <span>2026_CREW_ACTIVE</span>
          </div>

          <div className="flex items-center gap-1">
            <button type="button" className="os-btn-control" aria-label="Minimize">_</button>
            <button type="button" className="os-btn-control" aria-label="Maximize">□</button>
            <button type="button" className="os-btn-control os-btn-control-close" aria-label="Close">✕</button>
          </div>
        </div>
      </div>

      {/* 2. System Tab Strip - Touch optimized for mobile */}
      <div className="bg-[#151412] px-2 sm:px-3 pt-1 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar border-b border-black select-none">
        <a
          href="#top"
          onClick={scrollToSection("top", "overview")}
          className={`os-tab shrink-0 ${activeTab === "overview" ? "os-tab-active" : ""}`}
        >
          <LayoutDashboard size={12} className="text-signal-400 shrink-0" />
          <span>Dashboard</span>
        </a>

        <a
          href="#showcase"
          onClick={scrollToSection("showcase", "showcase")}
          className={`os-tab shrink-0 ${activeTab === "showcase" ? "os-tab-active" : ""}`}
        >
          <Film size={12} className="text-signal-400 shrink-0" />
          <span className="sm:hidden">Showcase</span>
          <span className="hidden sm:inline">Showcase Matrix</span>
        </a>

        <a
          href="#apply"
          onClick={scrollToSection("apply", "apply")}
          className={`os-tab shrink-0 ${activeTab === "apply" ? "os-tab-active" : ""}`}
        >
          <Zap size={12} className="text-signal-400 shrink-0" />
          <span className="sm:hidden">Apply</span>
          <span className="hidden sm:inline">Application Window</span>
        </a>

        <a
          href="#footer"
          onClick={scrollToSection("footer", "contact")}
          className={`os-tab shrink-0 ${activeTab === "contact" ? "os-tab-active" : ""}`}
        >
          <Phone size={12} className="text-signal-400 shrink-0" />
          <span className="sm:hidden">Contact</span>
          <span className="hidden sm:inline">Contact & Help</span>
        </a>
      </div>
    </header>
  );
}
