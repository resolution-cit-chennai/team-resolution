import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// Symmetrical 3D Coverflow alignment
const SLOT_CONFIG = {
  "-3": { x: "-148%", scale: 0.56, rotateY: 36, zIndex: 0,  opacity: 0 },
  "-2": { x: "-97%",  scale: 0.72, rotateY: 24, zIndex: 10, opacity: 1 },
  "-1": { x: "-50%",  scale: 0.86, rotateY: 14, zIndex: 20, opacity: 1 },
   "0": { x: "0%",    scale: 1.06, rotateY: 0,  zIndex: 30, opacity: 1 },
   "1": { x: "50%",   scale: 0.86, rotateY: -14, zIndex: 20, opacity: 1 },
   "2": { x: "97%",   scale: 0.72, rotateY: -24, zIndex: 10, opacity: 1 },
   "3": { x: "148%",  scale: 0.56, rotateY: -36, zIndex: 0,  opacity: 0 },
};

const TRANSITION = {
  duration: 0.55,
  ease: [0.16, 1, 0.3, 1],
};

export default function CoverflowCarousel({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const containerRef = useRef(null);

  const count = items.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => prev - 1);
  }, []);

  const normalizedActive = count > 0 ? ((activeIndex % count) + count) % count : 0;

  const goToSlide = (targetIndex) => {
    if (count === 0) return;
    let diff = targetIndex - normalizedActive;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    setActiveIndex((prev) => prev + diff);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const lastWheelTime = useRef(0);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || count === 0) return;

    const handleWheel = (e) => {
      const now = Date.now();
      const isVertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      const delta = isVertical ? e.deltaY : e.deltaX;

      if (Math.abs(delta) < 10) return;

      const currentNormalized = ((activeIndexRef.current % count) + count) % count;
      const isAtEnd = currentNormalized === count - 1;
      const isAtStart = currentNormalized === 0;

      if (isVertical && delta > 0 && isAtEnd) {
        if (now - lastWheelTime.current >= 380) {
          nextSlide();
          lastWheelTime.current = now;
          const nextSection = document.getElementById("apply");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }
        return;
      }

      if (isVertical && delta < 0 && isAtStart) {
        if (now - lastWheelTime.current >= 380) {
          prevSlide();
          lastWheelTime.current = now;
          const prevSection = document.getElementById("top");
          if (prevSection) {
            prevSection.scrollIntoView({ behavior: "smooth" });
          }
        }
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (now - lastWheelTime.current < 260) return;

      if (delta > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      lastWheelTime.current = now;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [count, nextSlide, prevSlide]);

  if (!items || items.length === 0) return null;

  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  const cards = offsets.map((offset) => {
    const virtualIndex = activeIndex + offset;
    const itemIndex = ((virtualIndex % count) + count) % count;
    return {
      offset,
      virtualIndex,
      item: items[itemIndex],
      itemIndex,
    };
  });

  return (
    <div
      ref={containerRef}
      style={{ overscrollBehavior: "contain" }}
      className="relative w-full overflow-hidden py-6 px-2 sm:px-4 select-none overscroll-contain"
    >
      {/* 3D Coverflow Stage */}
      <div
        className="relative h-[390px] xs:h-[430px] sm:h-[490px] md:h-[530px] w-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {cards.map(({ offset, virtualIndex, item }) => {
          const cfg = SLOT_CONFIG[String(offset)];
          const isCenter = offset === 0;

          return (
            <motion.div
              key={virtualIndex}
              className="absolute w-[240px] xs:w-[280px] sm:w-[340px] md:w-[380px] h-[340px] xs:h-[380px] sm:h-[440px] md:h-[480px] transform-gpu"
              style={{
                willChange: "transform, opacity",
                cursor: "pointer",
                transformPerspective: 1200,
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
                contain: "layout style",
              }}
              initial={false}
              animate={{
                x: cfg.x,
                scale: cfg.scale,
                rotateY: cfg.rotateY,
                zIndex: cfg.zIndex,
                opacity: cfg.opacity,
              }}
              transition={{
                x: TRANSITION,
                scale: TRANSITION,
                rotateY: TRANSITION,
                opacity: { duration: 0.4, ease: "easeInOut" },
                zIndex: { duration: 0 },
              }}
              onClick={() => {
                if (offset === 0) {
                  setSelectedMedia(item);
                } else {
                  setActiveIndex((prev) => prev + offset);
                }
              }}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, { offset: d }) => {
                if (d.x < -40) nextSlide();
                if (d.x > 40) prevSlide();
              }}
            >
              {/* Card Container with Retro OS 3D Outset Frame */}
              <div
                className={`relative w-full h-full overflow-hidden bg-charcoal-950 transition-all duration-300 ${
                  isCenter
                    ? "border-2 border-signal-400 shadow-[0_0_25px_rgba(255,207,37,0.3),0_12px_28px_rgba(0,0,0,0.9)]"
                    : "border border-charcoal-700 shadow-[0_8px_20px_rgba(0,0,0,0.8)] opacity-85"
                }`}
              >
                {/* Tag Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1 font-tech text-[10px] font-bold bg-[#0c0b0a]/90 border border-signal-400/50 text-signal-400 px-2 py-0.5">
                    {item.video && <Play size={9} className="fill-signal-400" />}
                    <span>[{item.tag?.toUpperCase() || "MEDIA"}]</span>
                  </span>
                </div>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  loading={offset === 0 ? "eager" : "lazy"}
                  fetchPriority={offset === 0 ? "high" : "low"}
                  decoding="async"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 pointer-events-none">
                  <div className="font-tech text-[10px] text-signal-400 uppercase font-bold mb-0.5">
                    // ENTRY_ID: {item.id}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-bone-100 tracking-tight leading-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-tech text-bone-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Retro OS Navigation Buttons + Segmented Meter */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2 max-w-xl mx-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="os-btn !py-1 !px-3 text-xs flex items-center gap-1"
          >
            <ChevronLeft size={14} />
            <span>PREV</span>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="os-btn !py-1 !px-3 text-xs flex items-center gap-1"
          >
            <span>NEXT</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Segmented Block Counter (like the reference screenshot!) */}
        <div className="flex items-center gap-2 font-mono text-xs text-signal-400 font-bold bg-[#0b0a09] px-3 py-1 border border-charcoal-700">
          <span className="text-bone-500 text-[10px]">SLIDE:</span>
          <span>[{normalizedActive + 1} / {count}]</span>
          <span className="text-signal-400">
            {items.map((_, i) => (i === normalizedActive ? "■" : "□")).join("")}
          </span>
        </div>
      </div>

      {/* Retro OS Window Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative max-w-4xl w-full os-window"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Window Header */}
              <div className="os-titlebar">
                <span className="font-tech font-bold text-xs">
                  MEDIA_VIEWER.EXE — [{selectedMedia.title}]
                </span>
                <div className="flex items-center gap-1">
                  <button type="button" className="os-btn-control" aria-label="Minimize">_</button>
                  <button type="button" className="os-btn-control" aria-label="Maximize">□</button>
                  <button
                    type="button"
                    onClick={() => setSelectedMedia(null)}
                    className="os-btn-control os-btn-control-close"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-4 sm:p-6 bg-[#141311]">
                <div className="os-panel-inset p-2 mb-4">
                  <img
                    src={selectedMedia.image}
                    alt={selectedMedia.title}
                    className="w-full max-h-[60vh] object-contain mx-auto"
                  />
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="os-badge-active text-[10px] mb-1 inline-block">
                      [{selectedMedia.tag?.toUpperCase()}]
                    </span>
                    <h4 className="font-display text-2xl text-bone-100 uppercase">
                      {selectedMedia.title}
                    </h4>
                    <p className="text-xs font-tech text-bone-300 mt-1 max-w-xl">
                      {selectedMedia.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="os-btn !py-1.5 !px-4 text-xs shrink-0"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
