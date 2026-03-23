import { useSiteSettings } from "@/hooks/useSiteSettings";

interface FooterProps { onOpenTracker: () => void; }

const socialLinks = [
  { label:"Facebook",   href:"https://facebook.com/deimint",   icon:<svg style={{width:16,height:16}} fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
  { label:"Instagram",  href:"https://instagram.com/deimint",  icon:<svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { label:"X",          href:"https://x.com/deimint",          icon:<svg style={{width:16,height:16}} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label:"DeviantArt", href:"https://deviantart.com/deimint", icon:<svg style={{width:16,height:16}} fill="currentColor" viewBox="0 0 24 24"><path d="M18.19 5.636l-.34.34-1.57-2.976H12l-3.09 5.43-.34.34H5v4.58h2.09l.34.34L5 18.64V22h4.34l.34-.34 1.57-2.976H15l3.09-5.43.34-.34H21V9.32h-2.09l-.34-.34.62-3.344z"/></svg> },
  { label:"ArtStation", href:"https://artstation.com/deimint", icon:<svg style={{width:16,height:16}} fill="currentColor" viewBox="0 0 24 24"><path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 002.164 1.333h13.457l-2.792-4.838H0zm24 .025c0-.484-.143-.935-.388-1.314L15.728 2.728a2.424 2.424 0 00-2.164-1.333H9.419L21.598 22l1.92-3.32c.301-.52.482-1.117.482-1.932zm-11.129-3.462L7.428 4.858l-5.444 9.428h10.887z"/></svg> },
];

const quickLinks = [
  { label:"Home",        href:"#hero" },
  { label:"Gallery",     href:"#gallery" },
  { label:"About",       href:"#about" },
  { label:"Commissions", href:"#contact" },
  { label:"Track Order", href:"#", isTracker: true },
  { label:"Contact",     href:"#contact" },
];

export default function Footer({ onOpenTracker }: FooterProps) {
  const { settings } = useSiteSettings();
  const artistName  = settings["artist_name"]  ?? "deimint";
  const artistBio   = settings["artist_bio"]   ?? "Creating art that tells stories through digital and traditional mediums.";
  const artistEmail = settings["artist_email"] ?? "contact@deimint.com";

  return (
    <footer style={{ background:"linear-gradient(135deg, #5603ad 0%, #3d0080 60%, #1a0f2e 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-20 xl:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background:"rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.3)" }}>
                {artistName.charAt(0)}
              </div>
              <span style={{ fontFamily:"var(--font-display)", fontSize:"1.25rem", fontWeight:700, color:"white" }}>
                {artistName}
              </span>
            </div>
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.875rem", lineHeight:1.7, maxWidth:"280px", fontFamily:"var(--font-sans)" }}>
              {artistBio}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontFamily:"var(--font-sans)", fontWeight:600, color:"white", marginBottom:"1.25rem", fontSize:"1rem" }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={l.isTracker ? (e) => { e.preventDefault(); onOpenTracker(); } : undefined}
                    style={{ color:"rgba(255,255,255,0.65)", fontSize:"0.875rem", fontFamily:"var(--font-sans)", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#c2f8cb")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 style={{ fontFamily:"var(--font-sans)", fontWeight:600, color:"white", marginBottom:"1.25rem", fontSize:"1rem" }}>
              Connect With Me
            </h3>
            <a href={`mailto:${artistEmail}`}
              className="flex items-center gap-2 mb-5"
              style={{ color:"rgba(255,255,255,0.75)", fontSize:"0.875rem", textDecoration:"none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#c2f8cb")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            >
              <svg style={{width:16,height:16}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {artistEmail}
            </a>
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.75)", border:"1px solid rgba(255,255,255,0.15)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(194,248,203,0.2)"; (e.currentTarget as HTMLElement).style.color="#c2f8cb"; (e.currentTarget as HTMLElement).style.transform="translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.transform="translateY(0)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-20 xl:px-32 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.8rem", fontFamily:"var(--font-sans)" }}>
            © {new Date().getFullYear()} {artistName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy","Terms of Service"].map(l => (
              <a key={l} href="#"
                style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.8rem", fontFamily:"var(--font-sans)", textDecoration:"none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}