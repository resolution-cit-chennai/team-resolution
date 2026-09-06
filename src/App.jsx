import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ApplicationForm from "./components/ApplicationForm";
import Showcase from "./components/Showcase";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal-900">
      <div className="noise-layer" />
      <Nav />
      <main>
        <Hero />
        <ApplicationForm />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
}
