import { useState } from "react";
import type { GalleryItem } from "@/types";

const WORKS: GalleryItem[] = [
  { id:"g1", src:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", alt:"Abstract warm tones", title:"Amber Reverie", medium:"Digital Art", year:2024 },
  { id:"g2", src:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80", alt:"Misty watercolour hills", title:"Somewhere North", medium:"Watercolour", year:2024 },
  { id:"g3", src:"https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80", alt:"Figure study", title:"Still, She Waits", medium:"Traditional", year:2023 },
  { id:"g4", src:"https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80", alt:"Blue abstract", title:"Tide Memory", medium:"Digital Art", year:2023 },
  { id:"g5", src:"https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80", alt:"Warm portrait", title:"Late October", medium:"Traditional", year:2022 },
  { id:"g6", src:"https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80", alt:"Botanical greens", title:"Undergrowth III", medium:"Gouache", year:2022 },
];

const FILTERS = ["All", "Digital Art", "Traditional", "Watercolour", "Gouache"];

function GalleryCard({ item }: { item: GalleryItem }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{ boxShadow: hovered ? "0 20px 60px rgba(86,3,173,0.2)" : "0 4px 20px rgba(86,3,173,0.08)", transition: "box-shadow 0.4s ease, transform 0.4s ease", transform: hovered ? "translateY(-6px)" : "translateY(0)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!loaded && (
        <div className="w-full aspect-[4/5] rounded-2xl animate-pulse" style={{ background: "linear-gradient(135deg, rgba(194,248,203,0.4), rgba(131,103,199,0.1))" }} />
      )}
      <img
        src={item.src}
        alt={item.alt}
        onLoad={() => setLoaded(true)}
        className="w-full aspect-[4/5] object-cover"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease, transform 0.6s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
      />

      {/* Glass overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 rounded-2xl"
        style={{
          background: hovered ? "linear-gradient(to top, rgba(86,3,173,0.7) 0%, rgba(131,103,199,0.2) 50%, transparent 100%)" : "linear-gradient(to top, rgba(26,15,46,0.4) 0%, transparent 60%)",
          transition: "background 0.4s ease",
        }}
      >
        <div style={{ transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "transform 0.4s ease", opacity: hovered ? 1 : 0.8 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "2px" }}>
            {item.title}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ background: "rgba(179,233,199,0.3)", color: "#c2f8cb", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em" }}
            >
              {item.medium}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.6)" }}>
              {item.year}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Gallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? WORKS : WORKS.filter(w => w.medium === active);

  return (
    <section id="gallery" className="px-6 md:px-20 xl:px-32 py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h2 className="section-title">Selected <span className="italic gradient-text">Works</span></h2>
        </div>
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: "var(--font-sans)",
                background: active === f ? "linear-gradient(135deg,#5603ad,#8367c7)" : "rgba(255,255,255,0.6)",
                color: active === f ? "white" : "var(--fg-muted)",
                border: active === f ? "none" : "1px solid rgba(131,103,199,0.2)",
                backdropFilter: "blur(8px)",
                boxShadow: active === f ? "0 4px 12px rgba(86,3,173,0.25)" : "none",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-14">
        <div
          className="inline-flex flex-col items-center gap-4 px-10 py-8 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 8px 32px rgba(86,3,173,0.08)" }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--fg)" }}>
            Love what you see? Let's create something together.
          </p>
          <a href="#contact" className="btn-primary">
            Start a Commission
          </a>
        </div>
      </div>
    </section>
  );
}