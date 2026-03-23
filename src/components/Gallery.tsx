import { useState } from "react";
import { useGallery } from "@/hooks/useGallery";
import type { GalleryItem } from "@/types";

const FILTERS = ["All", "Digital Art", "Traditional", "Watercolour", "Gouache", "Mixed Media"];

// ── Skeleton card ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="w-full aspect-[4/5] rounded-2xl animate-pulse"
      style={{ background: "linear-gradient(135deg, rgba(194,248,203,0.4), rgba(131,103,199,0.1))" }}
    />
  );
}

// ── Gallery card ──────────────────────────────────────────────
function GalleryCard({ item }: { item: GalleryItem }) {
  const [loaded,  setLoaded]  = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        boxShadow:  hovered ? "0 20px 60px rgba(86,3,173,0.2)" : "0 4px 20px rgba(86,3,173,0.08)",
        transition: "box-shadow 0.4s ease, transform 0.4s ease",
        transform:  hovered ? "translateY(-6px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Skeleton while loading */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(135deg, rgba(194,248,203,0.4), rgba(131,103,199,0.1))" }}
        />
      )}

      <img
        src={item.image_url}
        alt={item.alt_text || item.title}
        onLoad={() => setLoaded(true)}
        className="w-full aspect-[4/5] object-cover"
        style={{
          opacity:    loaded ? 1 : 0,
          transition: "opacity 0.5s ease, transform 0.6s ease",
          transform:  hovered ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Featured badge */}
      {item.featured && (
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white"
          style={{
            background:  "linear-gradient(135deg,#5603ad,#8367c7)",
            fontFamily:  "var(--font-mono)",
            fontSize:    "0.55rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Featured
        </span>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 rounded-2xl"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(86,3,173,0.75) 0%, rgba(131,103,199,0.2) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(26,15,46,0.45) 0%, transparent 60%)",
          transition: "background 0.4s ease",
        }}
      >
        <div
          style={{
            transform:  hovered ? "translateY(0)" : "translateY(8px)",
            transition: "transform 0.4s ease",
            opacity:    hovered ? 1 : 0.85,
          }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            {item.title}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                background:    "rgba(179,233,199,0.3)",
                color:         "#c2f8cb",
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.6rem",
                letterSpacing: "0.1em",
              }}
            >
              {item.medium}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(255,255,255,0.65)" }}>
              {item.year}
            </span>
          </div>
          {item.description && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize:   "0.75rem",
                color:      "rgba(255,255,255,0.75)",
                marginTop:  "6px",
                overflow:   "hidden",
                display:    "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              } as React.CSSProperties}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Gallery section ───────────────────────────────────────────
export default function Gallery() {
  const { items, loading, error } = useGallery();
  const [active, setActive] = useState("All");

  // Derive unique mediums from DB data + preset filters
  const availableFilters = ["All", ...Array.from(new Set(items.map(i => i.medium)))];
  const filters = FILTERS.filter(f => f === "All" || availableFilters.includes(f));

  const filtered = active === "All" ? items : items.filter(i => i.medium === active);

  return (
    <section id="gallery" className="px-6 md:px-20 xl:px-32 py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h2 className="section-title">
            Selected <span className="italic gradient-text">Works</span>
          </h2>
        </div>

        {/* Filter pills — only show when data is loaded */}
        {!loading && items.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  fontFamily:  "var(--font-sans)",
                  background:  active === f ? "linear-gradient(135deg,#5603ad,#8367c7)" : "rgba(255,255,255,0.6)",
                  color:       active === f ? "white" : "var(--fg-muted)",
                  border:      active === f ? "none" : "1px solid rgba(131,103,199,0.2)",
                  backdropFilter: "blur(8px)",
                  boxShadow:   active === f ? "0 4px 12px rgba(86,3,173,0.25)" : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div
          className="text-center py-16 px-8 rounded-3xl mb-8"
          style={{ background: "rgba(229,62,62,0.05)", border: "1px solid rgba(229,62,62,0.15)" }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--fg)" }}>
            Couldn't load gallery
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--fg-muted)", marginTop: "8px" }}>
            {error}
          </p>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--fg-muted)" }}>
            No works yet
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--fg-subtle)", marginTop: "8px" }}>
            {active !== "All" ? `No ${active} works found.` : "Check back soon."}
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* CTA */}
      {!loading && (
        <div className="text-center mt-14">
          <div
            className="inline-flex flex-col items-center gap-4 px-10 py-8 rounded-3xl"
            style={{
              background:  "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border:      "1px solid rgba(255,255,255,0.8)",
              boxShadow:   "0 8px 32px rgba(86,3,173,0.08)",
            }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--fg)" }}>
              Love what you see? Let's create something together.
            </p>
            <a href="#contact" className="btn-primary">
              Start a Commission
            </a>
          </div>
        </div>
      )}
    </section>
  );
}