import { useState, useEffect } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const SITE_NAME = "Alphaomegatides";
const TAGLINE = "Where the tide turns for all.";
const RETURN_DATE = new Date("2026-06-20T00:00:00"); // adjust as needed
const NOTIFY_EMAIL = "alphaomegatides@yahoo.com"; // where notifications land
const RESEND_API_ENDPOINT = "/api/send-email"; // your existing serverless fn
// ─────────────────────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = RETURN_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; opacity: number; speed: number }[]
  >([]);

  // countdown tick
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // ambient particle init
  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        opacity: 0.08 + Math.random() * 0.18,
        speed: 18 + Math.random() * 24,
      }))
    );
  }, []);

  async function handleNotify() {
    if (!email.includes("@")) return;
    setStatus("sending");
    try {
      const res = await fetch(RESEND_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "waitlist_signup",
          to: email,
          notifyAdmin: NOTIFY_EMAIL,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const done = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div style={styles.root}>
      {/* ── particles ── */}
      <div style={styles.particleLayer} aria-hidden>
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              ...styles.particle,
              left: p.x + "%",
              top: p.y + "%",
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: p.speed + "s",
              animationDelay: -(p.id * 1.3) + "s",
            }}
          />
        ))}
      </div>

      {/* ── grid overlay ── */}
      <div style={styles.grid} aria-hidden />

      {/* ── main card ── */}
      <main style={styles.card}>
        {/* logo mark */}
        <div style={styles.logoRow} aria-label={SITE_NAME}>
          <span style={styles.alpha}>α</span>
          <div style={styles.helix} aria-hidden>
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.helixDot,
                  background:
                    i < 3
                      ? "#ff6b6b"
                      : i === 3
                      ? "#a855f7"
                      : "#3be8b0",
                  transform: "translateX(" + (Math.sin((i / 6) * Math.PI) * 8) + "px)",
                }}
              />
            ))}
          </div>
          <span style={styles.omega}>Ω</span>
        </div>

        <h1 style={styles.siteName}>{SITE_NAME}</h1>
        <p style={styles.tagline}>{TAGLINE}</p>

        {/* divider */}
        <div style={styles.divider} />

        {/* headline */}
        <h2 style={styles.headline}>
          {done ? "We're almost back." : "Under Maintenance"}
        </h2>
        <p style={styles.body}>
          {done
            ? "The site is being finalized. Check back in a few minutes."
            : "We're making improvements behind the scenes. The site will be back shortly."}
        </p>

        {/* countdown */}
        {!done && (
          <div style={styles.countdown}>
            {(
              [
                ["days", timeLeft.days],
                ["hrs", timeLeft.hours],
                ["min", timeLeft.minutes],
                ["sec", timeLeft.seconds],
              ] as [string, number][]
            ).map(([label, val], i) => (
              <div key={label} style={styles.countUnit}>
                <span style={styles.countNum}>{pad(val)}</span>
                <span style={styles.countLabel}>{label}</span>
                {i < 3 && <span style={styles.countSep}>:</span>}
              </div>
            ))}
          </div>
        )}

        {/* divider */}
        <div style={styles.divider} />

        {/* notify form */}
        <p style={styles.notifyLabel}>Get notified when we're back</p>
        {status === "done" ? (
          <p style={styles.successMsg}>✓ You're on the list. We'll email you when we launch.</p>
        ) : (
          <div style={styles.inputRow}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNotify()}
              style={styles.input}
              aria-label="Email address"
              disabled={status === "sending"}
            />
            <button
              onClick={handleNotify}
              disabled={status === "sending" || !email.includes("@")}
              style={{
                ...styles.btn,
                opacity: status === "sending" || !email.includes("@") ? 0.5 : 1,
              }}
            >
              {status === "sending" ? "…" : "Notify me"}
            </button>
          </div>
        )}
        {status === "error" && (
          <p style={styles.errorMsg}>Something went wrong. Try again.</p>
        )}

        {/* footer */}
        <p style={styles.footer}>
          Questions?{" "}
          <a href={"mailto:" + NOTIFY_EMAIL} style={styles.link}>
            {NOTIFY_EMAIL}
          </a>
        </p>
      </main>

      {/* keyframes injected via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap');

        @keyframes floatUp {
          0%   { transform: translateY(0px); opacity: var(--op, 0.12); }
          50%  { transform: translateY(-30px); opacity: calc(var(--op, 0.12) * 1.5); }
          100% { transform: translateY(0px); opacity: var(--op, 0.12); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,232,176,0.18); }
          50%       { box-shadow: 0 0 0 8px rgba(59,232,176,0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0e0e0e; }
      `}</style>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#0e0e0e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "24px 16px",
  },
  particleLayer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
  },
  particle: {
    position: "absolute",
    borderRadius: "50%",
    background: "#3be8b0",
    animationName: "floatUp",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  grid: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(59,232,176,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,232,176,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 1,
    background: "rgba(18,18,18,0.92)",
    border: "1px solid rgba(59,232,176,0.12)",
    borderRadius: "20px",
    padding: "48px 40px",
    maxWidth: "520px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 0 60px rgba(59,232,176,0.06), 0 24px 48px rgba(0,0,0,0.6)",
    backdropFilter: "blur(12px)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "10px",
  },
  alpha: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "42px",
    fontWeight: 800,
    color: "#ff6b6b",
    lineHeight: 1,
  },
  omega: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "42px",
    fontWeight: 800,
    color: "#3be8b0",
    lineHeight: 1,
  },
  helix: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3px",
    padding: "0 4px",
  },
  helixDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  },
  siteName: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#f0f0f0",
    letterSpacing: "0.04em",
    marginBottom: "4px",
  },
  tagline: {
    fontSize: "13px",
    color: "#555",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "0",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(59,232,176,0.15), transparent)",
    margin: "28px 0",
  },
  headline: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "28px",
    fontWeight: 800,
    color: "#f0f0f0",
    marginBottom: "10px",
    letterSpacing: "-0.01em",
  },
  body: {
    fontSize: "15px",
    color: "#888",
    lineHeight: 1.7,
    maxWidth: "360px",
    margin: "0 auto 24px",
  },
  countdown: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0",
    marginBottom: "8px",
  },
  countUnit: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    position: "relative",
  },
  countNum: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "40px",
    fontWeight: 800,
    color: "#3be8b0",
    letterSpacing: "-0.02em",
    lineHeight: 1,
    padding: "0 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as React.CSSProperties,
  countLabel: {
    fontSize: "10px",
    color: "#555",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    position: "absolute",
    bottom: "-16px",
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
  },
  countSep: {
    fontSize: "36px",
    color: "#333",
    fontWeight: 800,
    lineHeight: 1,
    paddingBottom: "4px",
  },
  notifyLabel: {
    fontSize: "13px",
    color: "#777",
    marginBottom: "14px",
    letterSpacing: "0.02em",
  },
  inputRow: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    maxWidth: "260px",
    padding: "12px 16px",
    background: "#1a1a1a",
    border: "1px solid rgba(59,232,176,0.15)",
    borderRadius: "10px",
    color: "#f0f0f0",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
  },
  btn: {
    padding: "12px 20px",
    background: "linear-gradient(135deg, #3be8b0, #2bc99a)",
    border: "none",
    borderRadius: "10px",
    color: "#0e0e0e",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Syne', sans-serif",
    letterSpacing: "0.02em",
    transition: "opacity 0.2s, transform 0.1s",
    animationName: "pulse",
    animationDuration: "2.5s",
    animationIterationCount: "infinite",
  },
  successMsg: {
    color: "#3be8b0",
    fontSize: "14px",
    marginTop: "4px",
  },
  errorMsg: {
    color: "#ff6b6b",
    fontSize: "13px",
    marginTop: "8px",
  },
  footer: {
    marginTop: "28px",
    fontSize: "13px",
    color: "#555",
  },
  link: {
    color: "#3be8b0",
    textDecoration: "none",
  },
};
