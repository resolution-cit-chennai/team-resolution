import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Ultra-smooth frictionless transition with synchronous spatial properties
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
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    if (Math.abs(e.deltaX) > 15 || Math.abs(e.deltaY) > 15) {
      if (e.deltaX > 15 || e.deltaY > 15) {
        nextSlide();
      } else {
        prevSlide();
      }
      lastWheelTime.current = now;
    }
  };

  if (!items || items.length === 0) return null;

  // 7 slots: [-3, -2, -1, 0, 1, 2, 3]
  // Virtual index tracks each card uniquely across the circular linked list so elements
  // smoothly slide directly between adjacent positions with zero back-flying.
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
      onWheel={handleWheel}
      className="relative w-full overflow-hidden py-10 px-2 sm:px-6 select-none"
    >
      {/* 3D Coverflow Stage */}
      <div
        className="relative h-[380px] xs:h-[420px] sm:h-[480px] md:h-[520px] w-full flex items-center justify-center"
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
                cursor: isCenter ? "pointer" : "pointer",
                transformPerspective: 1200,
                backfaceVisibility: "hidden",
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
              {/* Separate clipping div preserving 3D transform space */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-charcoal-950 shadow-2xl border border-bone-100/20">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 pointer-events-none">
                  <h3 className="font-display text-2xl sm:text-3xl text-bone-100 tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-bone-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Nav Buttons + Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-700 bg-charcoal-900/80 text-bone-100 hover:border-signal-400/60 hover:text-signal-400 hover:bg-charcoal-800 transition-all duration-200 shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-700 bg-charcoal-900/80 text-bone-100 hover:border-signal-400/60 hover:text-signal-400 hover:bg-charcoal-800 transition-all duration-200 shadow-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === normalizedActive
                  ? "w-8 bg-signal-400 shadow-sm shadow-signal-400/50"
                  : "w-2.5 bg-charcoal-700 hover:bg-bone-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-bone-100/20 glass-card p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedMedia.image}
                alt={selectedMedia.title}
                className="w-full max-h-[70vh] object-contain rounded-2xl"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-display text-2xl text-bone-100">{selectedMedia.title}</h4>
                  <p className="text-sm text-bone-300 mt-1">{selectedMedia.description}</p>
                </div>
                <button onClick={() => setSelectedMedia(null)} className="btn-secondary text-xs py-2 px-4">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
