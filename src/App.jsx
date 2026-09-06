import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.hash === "#/apply" ? "apply" : "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#/apply") {
        setCurrentPage("apply");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToHome = () => {
    window.location.hash = "#/";
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToApply = () => {
    window.location.hash = "#/apply";
    setCurrentPage("apply");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-charcoal-900 overflow-x-hidden flex flex-col">
      <div className="noise-layer" />
      <Nav
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateApply={navigateToApply}
      />
      <main className="flex-1">
        {currentPage === "apply" ? (
          <ApplyPage onNavigateHome={navigateToHome} />
        ) : (
          <HomePage onNavigateApply={navigateToApply} />
        )}
      </main>
      <Footer />
    </div>
  );
}
