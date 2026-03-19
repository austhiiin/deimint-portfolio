export default function About() {
  const skills = ["Digital Illustration", "Character Design", "Oil Painting", "Watercolour", "Concept Art", "Portrait Work", "Gouache", "Storyboarding"];

  return (
    <section id="about" className="px-6 md:px-20 xl:px-32 py-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Image side */}
        <div className="relative">
          {/* Decorative blobs */}
          <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(179,233,199,0.5) 0%, transparent 70%)", filter: "blur(20px)" }} />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(131,103,199,0.3) 0%, transparent 70%)", filter: "blur(20px)" }} />

          {/* Photo card */}
          <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(86,3,173,0.15)" }}>
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=80"
              alt="deimint in the studio"
              className="w-full aspect-[4/5] object-cover"
            />
            {/* Glass badge overlay */}
            <div
              className="absolute bottom-5 left-5 right-5 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.9)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "linear-gradient(135deg,#5603ad,#8367c7)" }}>d</div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "1rem" }}>deimint</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)", letterSpacing: "0.1em" }}>DIGITAL · TRADITIONAL ARTIST</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)" }}>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="section-eyebrow mb-4">About the Artist</p>
          <h2 className="section-title mb-6">
            Stories told through <span className="italic gradient-text">pixels &amp; paint</span>
          </h2>

          <div className="space-y-4 mb-8" style={{ color: "var(--fg-muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <p>
              I'm deimint — an artist who believes every piece should carry a story worth telling. My practice bridges digital and traditional mediums, letting the medium serve the narrative rather than define it.
            </p>
            <p>
              From vibrant character illustrations to quiet, contemplative oil studies, I bring the same intention to every commission: to understand what you want to say, and find the visual language that says it best.
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {skills.map(s => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(131,103,199,0.2)", color: "var(--fg-muted)", fontFamily: "var(--font-sans)" }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Stats glass cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "240+", label: "Works Sold" },
              { val: "34",   label: "Countries" },
              { val: "8+",   label: "Years Active" },
            ].map(s => (
              <div
                key={s.label}
                className="text-center py-5 px-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 4px 16px rgba(86,3,173,0.06)" }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--purple)" }}>{s.val}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-subtle)", marginTop: "2px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}