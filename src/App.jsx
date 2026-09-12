import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import ApplicationForm from "./components/ApplicationForm";
import Footer from "./components/Footer";
import MaintenancePage from "./pages/MaintenancePage";

export default function App() {
  const [isMaintenance, setIsMaintenance] = useState(false);

  // Listen for hashchange in case user navigates to #maintenance or clears it
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#maintenance") {
        setIsMaintenance(true);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Resolve maintenance state: /api/config (Edge Config) → /site-config.json → false
  useEffect(() => {
    let isMounted = true;
    const fetchConfig = async () => {
      const params = new URLSearchParams(window.location.search);

      // ?bypass=true always skips maintenance
      if (params.get("bypass") === "true") {
        if (isMounted) setIsMaintenance(false);
        return;
      }

      // ?maintenance=true or #maintenance forces it on
      if (
        params.get("maintenance") === "true" ||
        window.location.hash === "#maintenance"
      ) {
        if (isMounted) setIsMaintenance(true);
        return;
      }

      // 1st try: /api/config (Vercel Edge Config in production)
      try {
        const res = await fetch("/api/config", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isInMaintenance === "boolean") {
            if (isMounted) setIsMaintenance(data.isInMaintenance);
            return;
          }
        }
      } catch (_) { }

      // 2nd try: /site-config.json (local dev & static fallback)
      try {
        const res = await fetch("/site-config.json", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isInMaintenance === "boolean") {
            if (isMounted) setIsMaintenance(data.isInMaintenance);
            return;
          }
        }
      } catch (_) { }

      // Final fallback: stay false (site is live)
      if (isMounted) setIsMaintenance(false);
    };

    fetchConfig();
    return () => { isMounted = false; };
  }, []);

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen os-desktop-bg overflow-x-hidden flex flex-col font-body selection:bg-signal-400 selection:text-charcoal-950">

      {/* Sticky Header Navigation */}
      <Nav />

      <main className="flex-1">
        {/* 1. Landing Hero Section (Above the fold) */}
        <Hero />

        {/* 2. Showcase Section (Directly mounted for zero-stutter smooth scrolling) */}
        <div id="showcase">
          <Showcase />
        </div>

        {/* 3. Application Form Section */}
        <div id="apply">
          <ApplicationForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

