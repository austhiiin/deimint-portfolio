import { useEffect, useRef, useState } from "react";
import { useCommission } from "@/hooks/useCommission";
import { STATUS_STEPS, STATUS_LABELS, STATUS_DESCRIPTIONS, commissionIdSchema, type CommissionStatus } from "@/types";

const IconClose = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
    <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
    <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconSpinner = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25"/>
    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function StatusStepper({ currentStatus }: { currentStatus: CommissionStatus }) {
  const currentIdx = STATUS_STEPS.indexOf(currentStatus);
  return (
    <div className="relative flex items-start justify-between pt-2">
      <div className="absolute top-[18px] left-0 right-0 h-0.5 rounded-full" style={{ background: "rgba(131,103,199,0.15)" }} />
      <div
        className="absolute top-[18px] left-0 h-0.5 rounded-full transition-all duration-700 ease-out"
        style={{ width: currentIdx === 0 ? "0%" : `${(currentIdx / (STATUS_STEPS.length - 1)) * 100}%`, background: "linear-gradient(to right, #5603ad, #8367c7)" }}
      />
      {STATUS_STEPS.map((step, idx) => {
        const done = idx < currentIdx;
        const active = idx === currentIdx;
        const future = idx > currentIdx;
        return (
          <div key={step} className="relative flex flex-col items-center gap-3 flex-1">
            <div
              className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500"
              style={{
                background: done || active ? "linear-gradient(135deg,#5603ad,#8367c7)" : "rgba(255,255,255,0.8)",
                color: done || active ? "white" : "#8a7fab",
                border: future ? "2px solid rgba(131,103,199,0.2)" : "none",
                boxShadow: active ? "0 0 0 6px rgba(86,3,173,0.1), 0 4px 12px rgba(86,3,173,0.3)" : "none",
                transform: active ? "scale(1.1)" : "scale(1)",
              }}
            >
              {done ? (
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : <span>{idx + 1}</span>}
              {active && <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(86,3,173,0.15)" }} />}
            </div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center",
              color: active ? "#5603ad" : done ? "#8367c7" : "#8a7fab",
            }}>
              {STATUS_LABELS[step]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="mt-6 space-y-4 animate-pulse">
      <div className="h-4 w-1/3 rounded-full" style={{ background: "rgba(131,103,199,0.1)" }}/>
      <div className="h-3 w-2/3 rounded-full" style={{ background: "rgba(131,103,199,0.07)" }}/>
      <div className="h-28 w-full rounded-2xl mt-4" style={{ background: "rgba(131,103,199,0.07)" }}/>
    </div>
  );
}

interface TrackerModalProps { isOpen: boolean; onClose: () => void; }

export default function TrackerModal({ isOpen, onClose }: TrackerModalProps) {
  const { state, lookup, reset } = useCommission();
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
    else { reset(); setInputValue(""); setValidationError(null); }
  }, [isOpen, reset]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && isOpen) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleLookup = async () => {
    setValidationError(null);
    const result = commissionIdSchema.safeParse(inputValue);
    if (!result.success) { setValidationError(result.error.errors[0].message); return; }
    await lookup(result.data);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 transition-opacity duration-300" style={{ background: "rgba(26,15,46,0.5)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div
          className="relative w-full max-w-lg animate-modal-enter max-h-[90vh] overflow-y-auto rounded-3xl"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(32px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 24px 80px rgba(86,3,173,0.18)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-5" style={{ borderBottom: "1px solid rgba(131,103,199,0.1)" }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="section-eyebrow mb-1">Client Portal</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", color: "var(--fg)", fontWeight: 700 }}>Track Your Order</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-full transition-colors" style={{ color: "var(--fg-subtle)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(131,103,199,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <IconClose/>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            <div className="mb-2">
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--fg-subtle)", display: "block", marginBottom: "8px" }}>
                Commission ID
              </label>
              <div className="flex gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => { setInputValue(e.target.value); setValidationError(null); }}
                  onKeyDown={e => e.key === "Enter" && handleLookup()}
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  spellCheck={false}
                  className="input-glass flex-1"
                  style={{ borderColor: validationError ? "#e53e3e" : undefined }}
                />
                <button onClick={handleLookup} disabled={state.phase === "loading"} className="btn-primary gap-2 px-4"
                  style={{ opacity: state.phase === "loading" ? 0.6 : 1 }}>
                  {state.phase === "loading" ? <IconSpinner/> : <IconSearch/>}
                  <span>Look up</span>
                </button>
              </div>
              {validationError && <p style={{ color: "#e53e3e", fontSize: "0.75rem", marginTop: "4px" }}>{validationError}</p>}
            </div>

            {state.phase === "idle" && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--fg-subtle)", marginTop: "8px" }}>
                Your Commission ID was emailed when you placed your order.
              </p>
            )}

            {state.phase === "loading" && <ResultSkeleton/>}

            {state.phase === "not_found" && (
              <div className="mt-6 p-5 rounded-2xl" style={{ background: "rgba(229,62,62,0.05)", border: "1px solid rgba(229,62,62,0.15)" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--fg)", marginBottom: "4px" }}>ID Not Found</p>
                <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)" }}>Double-check the UUID from your confirmation email.</p>
                <button onClick={() => { reset(); setInputValue(""); inputRef.current?.focus(); }} className="btn-ghost text-xs mt-3">Try Again</button>
              </div>
            )}

            {state.phase === "error" && (
              <div className="mt-6 p-5 rounded-2xl" style={{ background: "rgba(229,62,62,0.05)", border: "1px solid rgba(229,62,62,0.15)" }}>
                <p style={{ fontSize: "0.85rem", color: "#c53030" }}>{state.message}</p>
              </div>
            )}

            {state.phase === "found" && (
              <div className="mt-6 space-y-5 animate-fade-up">
                <div className="flex items-center justify-between">
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>Client</p>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--fg)", fontWeight: 700 }}>{state.data.client_name}</p>
                  </div>
                  {state.data.queue_pos > 0 && (
                    <div className="text-right px-4 py-3 rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(179,233,199,0.3),rgba(131,103,199,0.1))", border: "1px solid rgba(255,255,255,0.8)" }}>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-subtle)" }}>Queue Position</p>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--purple)", fontWeight: 700, lineHeight: 1 }}>#{state.data.queue_pos}</p>
                    </div>
                  )}
                </div>

                <div className="py-5 px-1" style={{ borderTop: "1px solid rgba(131,103,199,0.1)", borderBottom: "1px solid rgba(131,103,199,0.1)" }}>
                  <StatusStepper currentStatus={state.data.status}/>
                </div>

                <div className="p-4 rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(86,3,173,0.05),rgba(131,103,199,0.05))", borderLeft: "3px solid #8367c7" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8367c7", marginBottom: "4px" }}>Current Stage</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>{STATUS_DESCRIPTIONS[state.data.status]}</p>
                </div>

                {state.data.preview_url && (
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--fg-subtle)", marginBottom: "8px" }}>Preview</p>
                    <img src={state.data.preview_url} alt="Commission preview" className="w-full max-h-64 object-cover rounded-2xl"/>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)", marginTop: "6px" }}>Preview only · final work may vary.</p>
                  </div>
                )}

                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--fg-subtle)" }}>
                  Updated {new Date(state.data.updated_at).toLocaleString("en-US",{ dateStyle:"medium", timeStyle:"short" })} · Live updates on
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}