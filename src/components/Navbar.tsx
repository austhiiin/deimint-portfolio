import { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface NavbarProps { onOpenTracker: () => void; }

export default function Navbar({ onOpenTracker }: NavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { settings } = useSiteSettings();

  const artistName      = settings["artist_name"]      ?? "deimint";
  const commissionsOpen = settings["commissions_open"] !== "false";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label:"Gallery",     href:"#gallery" },
    { label:"About",       href:"#about" },
    { label:"Commissions", href:"#contact" },
    { label:"Contact",     href:"#contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:        scrolled ? "rgba(255,255,255,0.7)" : "transparent",
        backdropFilter:    scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom:      scrolled ? "1px solid rgba(131,103,199,0.15)" : "none",
        boxShadow:         scrolled ? "0 4px 24px rgba(86,3,173,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background:"linear-gradient(135deg,#5603ad,#8367c7)" }}>
            {artistName.charAt(0)}
          </div>
          <span style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:700, color:"var(--fg)" }}>
            {artistName}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color:"var(--fg-muted)", fontFamily:"var(--font-sans)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#5603ad")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={onOpenTracker} className="btn-ghost text-xs px-4 py-2">
            Track Order
          </button>
          {commissionsOpen && (
            <a href="#contact" className="btn-primary text-xs px-4 py-2">
              Commission Me
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {[0,1,2].map(i => (
            <span key={i} className="block w-5 h-0.5 rounded-full" style={{ backgroundColor:"var(--purple)" }}/>
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 pt-2"
          style={{ background:"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)" }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium border-b"
              style={{ color:"var(--fg-muted)", borderColor:"var(--border-solid)" }}>
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4">
            <button onClick={() => { onOpenTracker(); setMobileOpen(false); }} className="btn-ghost text-xs flex-1 justify-center">
              Track Order
            </button>
            {commissionsOpen && (
              <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary text-xs flex-1 justify-center">
                Commission Me
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}