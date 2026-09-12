import { Film } from "lucide-react";
import CoverflowCarousel from "./CoverflowCarousel";
import { SHOWCASE_ITEMS } from "../data/showcase";

export default function Showcase() {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-3 sm:px-6">
        
        {/* iOS Glass Media Showcase Container */}
        <div className="ios-glass-card rounded-[2rem] p-4 sm:p-8 relative overflow-hidden">
          {/* Top Bar Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-signal-400/15 border border-signal-400/30 flex items-center justify-center text-signal-400">
                <Film size={16} />
              </div>
              <div>
                <span className="font-tech text-xs font-bold text-signal-400 tracking-wider uppercase block">
                  Production Showcase
                </span>
                <span className="text-[10px] text-bone-400 font-sans font-medium">
                  Official CIT Media Crew Vault
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-sans text-bone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>HD Media Active</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="font-display text-3xl sm:text-5xl text-bone-100 tracking-tight uppercase">
              The Work Speaks <span className="text-signal-400">Before We Do!</span>
            </h2>
            <p className="mt-3 text-bone-300 text-xs sm:text-sm font-sans leading-relaxed">
              Explore our cinematography, photography, motion design, and event coverage productions. Swipe or scroll to browse.
            </p>
          </div>

          {/* Carousel Area */}
          <CoverflowCarousel items={SHOWCASE_ITEMS} />
        </div>

      </div>
    </section>
  );
}

