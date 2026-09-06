import LazySection from "./components/LazySection";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SectionLoader from "./components/SectionLoader";

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal-900 overflow-x-hidden flex flex-col">
      <div className="noise-layer" />

      {/* Sticky Header Navigation */}
      <Nav />

      <main className="flex-1">
        {/* 1. Landing Hero Section (Above the fold - loaded immediately) */}
        <Hero />

        {/* 2. Showcase Section (Lazy-loaded ONLY on scroll into view) */}
        <LazySection
          id="showcase"
          importFunc={() => import("./components/Showcase")}
          fallback={<SectionLoader label="Loading showcase..." />}
          rootMargin="250px 0px"
        />

        {/* 3. Application Form Section (Lazy-loaded ONLY on scroll into view) */}
        <LazySection
          id="apply"
          importFunc={() => import("./components/ApplicationForm")}
          fallback={<SectionLoader label="Loading application form..." />}
          rootMargin="250px 0px"
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
