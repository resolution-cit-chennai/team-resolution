import { motion } from "framer-motion";
import CircularGallery from "./CircularGallery";
import { SHOWCASE_ITEMS } from "../data/showcase";

const GALLERY_FONT_URL = "https://fonts.googleapis.com/css2?family=Anton&display=swap";

export default function Showcase() {
  const galleryItems = SHOWCASE_ITEMS.map((item) => ({
    image: item.image,
    text: item.title,
    description: item.description,
  }));

  return (
    <section id="showcase" className="relative border-t border-charcoal-700 bg-charcoal-950 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-bone-100) 1px, transparent 1px), linear-gradient(90deg, var(--color-bone-100) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-24 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-signal-400 mb-3">Why join Team Resolution?</p>
          <h2 className="font-display text-3xl sm:text-5xl text-bone-100 max-w-2xl mx-auto">
            The work speaks before we do!
          </h2>
          <p className="mt-5 text-bone-300 max-w-lg mx-auto">
            Take a look around — here’s a glimpse of what our crew has been creating.

          </p>
        </motion.div>

        <div
          className="mt-0 -mx-5 sm:mx-0"
          style={{ height: "clamp(420px, 50vw, 580px)" }}
        >
          <CircularGallery
            items={galleryItems}
            bend={0}
            textColor="#f4f1e9"
            descriptionColor="rgba(207,201,188,0.75)"
            borderRadius={0.06}
            font="bold 24px Anton"
            fontUrl={GALLERY_FONT_URL}
            scrollSpeed={1.6}
            scrollEase={0.04}
          />
        </div>
      </div>
    </section>
  );
}
