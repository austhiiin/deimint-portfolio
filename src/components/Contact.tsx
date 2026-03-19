import { useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  medium: string;
  budget: string;
  message: string;
}

const MEDIUMS = ["Digital Art", "Traditional / Oil", "Watercolour", "Gouache", "Mixed Media", "Not Sure"];
const BUDGETS = ["Under $50", "$50–$150", "$150–$300", "$300–$500", "$500+"];

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name:"", email:"", subject:"", medium:"", budget:"", message:"" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) setErrors(er => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    try {
      // ── Formspree integration ──────────────────────────────
      // Replace YOUR_FORMSPREE_ID with your actual Formspree form ID
      // Get one free at https://formspree.io
      const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          subject: form.subject || "Commission Enquiry",
          medium:  form.medium,
          budget:  form.budget,
          message: form.message,
          _subject: `New commission from ${form.name}`,
          _replyto: form.email,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name:"", email:"", subject:"", medium:"", budget:"", message:"" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 md:px-20 xl:px-32 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Get In Touch</p>
          <h2 className="section-title mb-4">
            Let's make something <span className="italic gradient-text">extraordinary</span>
          </h2>
          <p style={{ color: "var(--fg-muted)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Whether it's a commission, a collaboration, or just a hello — I'd love to hear from you. Fill in the form and I'll get back within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info panel */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              { icon:"✉️", label:"Email", value:"contact@deimint.com", href:"mailto:contact@deimint.com" },
              { icon:"📸", label:"Instagram", value:"@deimint", href:"https://instagram.com/deimint" },
              { icon:"🎨", label:"DeviantArt", value:"deimint", href:"https://deviantart.com/deimint" },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 4px 16px rgba(86,3,173,0.06)", textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(86,3,173,0.15)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(86,3,173,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--purple)", fontSize: "0.9rem" }}>{item.value}</p>
                </div>
              </a>
            ))}

            {/* Commission info glass card */}
            <div
              className="p-5 rounded-2xl mt-2"
              style={{ background: "linear-gradient(135deg, rgba(179,233,199,0.3), rgba(131,103,199,0.1))", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.7)" }}
            >
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--fg)", marginBottom: "8px" }}>
                Commission Info
              </p>
              {[
                "Queue: 2–3 week wait",
                "Revisions: 3 included",
                "Formats: PNG, PSD, TIFF",
                "Commercial use available",
              ].map(t => (
                <div key={t} className="flex items-center gap-2 mb-1.5">
                  <span style={{ color: "var(--purple-mid)", fontSize: "0.75rem" }}>✓</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--fg-muted)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="lg:col-span-3 p-8 rounded-3xl"
            style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 8px 40px rgba(86,3,173,0.09)" }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: "rgba(179,233,199,0.4)" }}>✓</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--fg)" }}>Message Sent!</h3>
                <p style={{ color: "var(--fg-muted)", fontSize: "0.9rem" }}>Thanks for reaching out. I'll be in touch within 48 hours.</p>
                <button onClick={() => setStatus("idle")} className="btn-ghost mt-2">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", display: "block", marginBottom: "6px" }}>
                      Name *
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="input-glass" style={{ borderColor: errors.name ? "#e53e3e" : undefined }} />
                    {errors.name && <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px" }}>{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", display: "block", marginBottom: "6px" }}>
                      Email *
                    </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-glass" style={{ borderColor: errors.email ? "#e53e3e" : undefined }} />
                    {errors.email && <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px" }}>{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Medium */}
                  <div>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", display: "block", marginBottom: "6px" }}>
                      Medium
                    </label>
                    <select name="medium" value={form.medium} onChange={handleChange} className="input-glass">
                      <option value="">Select medium...</option>
                      {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  {/* Budget */}
                  <div>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", display: "block", marginBottom: "6px" }}>
                      Budget
                    </label>
                    <select name="budget" value={form.budget} onChange={handleChange} className="input-glass">
                      <option value="">Select budget...</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", display: "block", marginBottom: "6px" }}>
                    Subject
                  </label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Character Commission" className="input-glass" />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", display: "block", marginBottom: "6px" }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your commission idea — style, subject, references, any details you'd like to share..."
                    rows={5}
                    className="input-glass resize-none"
                    style={{ borderColor: errors.message ? "#e53e3e" : undefined }}
                  />
                  {errors.message && <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px" }}>{errors.message}</p>}
                </div>

                {status === "error" && (
                  <p className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(229,62,62,0.08)", color: "#c53030", border: "1px solid rgba(229,62,62,0.2)" }}>
                    Something went wrong. Please try emailing directly at contact@deimint.com
                  </p>
                )}

                <button type="submit" disabled={status === "sending"} className="btn-primary w-full justify-center" style={{ opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending" ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
                        <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Sending...
                    </>
                  ) : "Send Message →"}
                </button>

                <p className="text-center mt-3" style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)" }}>
                  Powered by Formspree · Replies within 48 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}