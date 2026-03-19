import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TrackerModal from "@/components/TrackerModal";

export default function App() {
  const [trackerOpen, setTrackerOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar onOpenTracker={() => setTrackerOpen(true)} />
      <main>
        <Hero onOpenTracker={() => setTrackerOpen(true)} />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer onOpenTracker={() => setTrackerOpen(true)} />
      <TrackerModal isOpen={trackerOpen} onClose={() => setTrackerOpen(false)} />
    </div>
  );
}