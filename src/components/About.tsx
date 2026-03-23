import { useSiteSettings } from "@/hooks/useSiteSettings";

const SKILLS = [
  "Digital Illustration", "Character Design", "Oil Painting",
  "Watercolour", "Concept Art", "Portrait Work", "Gouache", "Storyboarding",
];

export default function About() {
  const { settings, loading } = useSiteSettings();

  const artistName  = settings["artist_name"]  ?? "deimint";
  const artistBio   = settings["artist_bio"]   ?? "Creating art that tells stories through digital and traditional mediums.";
  const commissionsOpen = settings["commissions_open"] !== "false";
  const queueWeeks  = settings["queue_wait_weeks"] ?? "2";

  return (
    <section id="about" className="px-6 md:px-20 xl:px-32 py-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Image side */}
        <div className="relative">
          <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(179,233,199,0.5) 0%, transparent 70%)", filter: "blur(20px)" }} />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(131,103,199,0.3) 0%, transparent 70%)", filter: "blur(20px)" }} />

          <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(86,3,173,0.15)" }}>
            <img
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=80"
              alt={`${artistName} in the studio`}
              className="w-full aspect-[4/5] object-cover"
            />
            {/* Glass badge */}
            <div
              className="absolute bottom-5 left-5 right-5 px-5 py-4 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.9)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: "linear-gradient(135deg,#5603ad,#8367c7)" }}>
                  {artistName.charAt(0)}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--fg)", fontSize: "1rem" }}>
                    {loading ? "..." : artistName}
                  </p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)", letterSpacing: "0.1em" }}>
                    DIGITAL · TRADITIONAL ARTIST
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: commissionsOpen ? "#4ade80" : "#f87171", animation: commissionsOpen ? "pulse 2s infinite" : "none" }}
                  />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)" }}>
                    {commissionsOpen ? "Available" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="section-eyebrow mb-4">About the Artist</p>
          <h2 className="section-title mb-6">
            Stories told through{" "}
            <span className="italic gradient-text">pixels &amp; paint</span>
          </h2>

          {/* Bio — from site_settings or fallback */}
          <div className="space-y-4 mb-8" style={{ color: "var(--fg-muted)", lineHeight: 1.8, fontSize: "0.95rem" }}>
            {loading ? (
              <>
                <div className="h-4 rounded-full animate-pulse" style={{ background: "rgba(131,103,199,0.1)", width: "90%" }} />
                <div className="h-4 rounded-full animate-pulse" style={{ background: "rgba(131,103,199,0.08)", width: "75%" }} />
              </>
            ) : (
              <p>{artistBio}</p>
            )}
            <p>
              From vibrant character illustrations to quiet, contemplative oil studies,
              every commission begins with a conversation — to understand what you want
              to say, and find the visual language that says it best.
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {SKILLS.map(s => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background:     "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                  border:         "1px solid rgba(131,103,199,0.2)",
                  color:          "var(--fg-muted)",
                  fontFamily:     "var(--font-sans)",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Stats + commission status */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { val: "240+", label: "Works Sold" },
              { val: "34",   label: "Countries" },
              { val: "8+",   label: "Years Active" },
            ].map(s => (
              <div
                key={s.label}
                className="text-center py-5 px-3 rounded-2xl"
                style={{
                  background:     "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(16px)",
                  border:         "1px solid rgba(255,255,255,0.85)",
                  boxShadow:      "0 4px 16px rgba(86,3,173,0.06)",
                }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--purple)" }}>
                  {s.val}
                </p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-subtle)", marginTop: "2px" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Commission status banner */}
          {!loading && (
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: commissionsOpen
                  ? "linear-gradient(135deg, rgba(179,233,199,0.35), rgba(131,103,199,0.1))"
                  : "rgba(248,113,113,0.08)",
                border: commissionsOpen
                  ? "1px solid rgba(179,233,199,0.5)"
                  : "1px solid rgba(248,113,113,0.2)",
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: commissionsOpen ? "#4ade80" : "#f87171" }}
              />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "var(--fg-muted)" }}>
                {commissionsOpen
                  ? `Commissions are open · ~${queueWeeks} week wait`
                  : "Commissions are currently closed — check back soon."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}