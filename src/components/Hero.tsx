interface HeroProps { onOpenTracker: () => void; }

export default function Hero({ onOpenTracker }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 xl:px-32 pt-16 overflow-hidden"
    >
      {/* Floating glass orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full animate-float"
          style={{
            background: "radial-gradient(circle, rgba(131,103,199,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-20 -left-20 w-80 h-80 rounded-full animate-float"
          style={{
            background: "radial-gradient(circle, rgba(179,233,199,0.35) 0%, transparent 70%)",
            filter: "blur(30px)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(194,248,203,0.2) 0%, transparent 70%)",
            filter: "blur(50px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Eyebrow badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-up"
          style={{
            background: "rgba(179,233,199,0.4)",
            border: "1px solid rgba(131,103,199,0.2)",
            animationDelay: "0ms",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="section-eyebrow" style={{ letterSpacing: "0.2em" }}>
            Commissions Open · Digital &amp; Traditional Art
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            color: "var(--fg)",
            animationDelay: "120ms",
          }}
        >
          Art that{" "}
          <span className="italic gradient-text">tells</span>
          <br />
          <span style={{ color: "var(--purple)" }}>stories.</span>
        </h1>

        {/* Sub */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-xl mb-10 animate-fade-up"
          style={{ color: "var(--fg-muted)", animationDelay: "240ms" }}
        >
          Creating art through digital and traditional mediums — from concept
          illustrations to hand-painted portraits. Every piece is a conversation
          between the artist and the story it needs to tell.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "360ms" }}>
          <a href="#gallery" className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            View Gallery
          </a>
          <a href="#contact" className="btn-mint">
            Commission Me
          </a>
          <button onClick={onOpenTracker} className="btn-ghost">
            Track My Order
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap gap-8 mt-16 pt-8 animate-fade-up"
          style={{ borderTop: "1px solid rgba(131,103,199,0.15)", animationDelay: "480ms" }}
        >
          {[
            { val: "240+", label: "Works Completed" },
            { val: "34",   label: "Countries Reached" },
            { val: "8+",   label: "Years Creating" },
            { val: "★ 4.9", label: "Client Rating" },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--purple)" }}>
                {s.val}
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>
          Scroll
        </span>
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, var(--purple-mid), transparent)" }} />
      </div>
    </section>
  );
}