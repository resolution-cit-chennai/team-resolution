import { motion } from "framer-motion";
import CoverflowCarousel from "./CoverflowCarousel";
import { SHOWCASE_ITEMS } from "../data/showcase";
import { Film } from "lucide-react";

export default function Showcase() {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-3 sm:px-6">
        
        {/* Master Media Showcase OS Window */}
        <div className="os-window">
          {/* Window Titlebar */}
          <div className="os-titlebar">
            <div className="flex items-center gap-2">
              <Film size={13} className="text-signal-400" />
              <span className="font-tech font-bold text-xs">
                MEDIA_SHOWCASE_ARCHIVE.EXE [v2.00] — Official Production Vault
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" className="os-btn-control" aria-label="Minimize">_</button>
              <button type="button" className="os-btn-control" aria-label="Maximize">□</button>
              <button type="button" className="os-btn-control os-btn-control-close" aria-label="Close">✕</button>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-4 sm:p-8 bg-[#141311]">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 os-badge-active text-[11px] mb-3">
                <span>●</span>
                <span>PRODUCTION SHOWCASE // CIT MEDIA CREW</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl text-bone-100 tracking-tight uppercase">
                The Work Speaks <span className="text-signal-400">Before We Do!</span>
              </h2>
              <p className="mt-3 text-bone-300 text-xs sm:text-sm font-tech leading-relaxed">
                Explore our cinematography, photography, motion design, and event coverage productions. Drag or scroll to browse.
              </p>
            </div>

            {/* Carousel Area */}
            <CoverflowCarousel items={SHOWCASE_ITEMS} />
          </div>
        </div>

      </div>
    </section>
  );
}
