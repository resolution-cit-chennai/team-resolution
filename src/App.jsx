import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import ApplicationForm from "./components/ApplicationForm";
import Footer from "./components/Footer";
import MaintenancePage from "./pages/MaintenancePage";
import { MAINTENANCE_MODE } from "./config";

export default function App() {
  const [isMaintenance, setIsMaintenance] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("bypass") === "true") return false;
      if (params.get("maintenance") === "true" || window.location.hash === "#maintenance") {
        return true;
      }
    }
    return MAINTENANCE_MODE;
  });

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

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen bg-charcoal-900 overflow-x-hidden flex flex-col">
      <div className="noise-layer" />

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

