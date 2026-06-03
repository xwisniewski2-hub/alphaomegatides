// api/send-email.js — Vercel Serverless Function
// Handles ALL outbound emails for Alphaomegatides via Resend
// Called from App.tsx — never calls Resend directly from the browser

const RESEND_API_KEY = process.env.RESEND_KEY || "re_gNzYdNZU_4Yx2Y916iJb6dSiBniGRchZF";
const NOTIFY_EMAIL   = "alphaomegatides@yahoo.com";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")   return res.status(405).json({ error: "Method not allowed" });

  const { type, data } = req.body || {};

  if (!type || !data) {
    return res.status(400).json({ error: "Missing type or data" });
  }

  let payload;

  // ── WAITLIST / SIGNUP / CONTACT / RESTOCK NOTIFY ──────────────────
  if (type === "notify") {
    const { name, email, interests, source } = data;
    const interestList = interests?.length ? interests.join(", ") : "Not specified";
    payload = {
      from: "Alphaomegatides <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      reply_to: email,
      subject: `🧬 ${source || "New Signup"} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;border-radius:12px;">
          <div style="text-align:center;margin-bottom:24px;">
            <span style="font-size:2rem;color:#ff6b6b;font-weight:900;">α</span>
            <span style="font-size:2rem;color:#3be8b0;font-weight:900;">Ω</span>
            <div style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-top:4px;letter-spacing:0.1em;">ALPHAOMEGATIDES</div>
          </div>
          <div style="background:#1a1a1a;border-radius:10px;padding:24px;border:1px solid rgba(59,232,176,0.2);">
            <div style="color:#3be8b0;font-size:0.75rem;font-weight:700;letter-spacing:0.15em;margin-bottom:12px;">${(source || "NEW SIGNUP").toUpperCase()}</div>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;width:120px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#4f8ef7;font-weight:600;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;">Source</td><td style="padding:8px 0;color:#fff;">${source || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:0.85rem;vertical-align:top;">Interests</td><td style="padding:8px 0;color:#ffd166;font-weight:600;">${interestList}</td></tr>
            </table>
          </div>
          <div style="margin-top:16px;padding:12px;background:rgba(255,107,107,0.08);border-radius:8px;font-size:0.75rem;color:rgba(255,255,255,0.35);text-align:center;">
            Alphaomegatides · alphaomegatides.com · Research use only
          </div>
        </div>
      `,
    };
  }

  // ── ACCOUNT SIGNUP NOTIFICATION ───────────────────────────────────
  else if (type === "account_signup") {
    const { fname, lname, email, phone, street, apt, city, state, zip } = data;
    payload = {
      from: "Alphaomegatides <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      reply_to: email,
      subject: `🧬 New Account Signup — ${fname} ${lname}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;border-radius:12px;">
          <div style="text-align:center;margin-bottom:24px;">
            <span style="font-size:2rem;color:#ff6b6b;font-weight:900;">α</span>
            <span style="font-size:2rem;color:#3be8b0;font-weight:900;">Ω</span>
          </div>
          <h2 style="color:#3be8b0;margin-bottom:4px;">New Member Signup</h2>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-bottom:24px;">alphaomegatides.com</p>
          <div style="background:#1a1a1a;border-radius:10px;padding:24px;border:1px solid rgba(59,232,176,0.2);">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;width:120px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${fname} ${lname}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#4f8ef7;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Phone</td><td style="padding:8px 0;color:#fff;">${phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Address</td><td style="padding:8px 0;color:#fff;">${street}${apt ? ", " + apt : ""}, ${city}, ${state} ${zip}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Signed Up</td><td style="padding:8px 0;color:#fff;">${new Date().toLocaleString()}</td></tr>
            </table>
          </div>
        </div>
      `,
    };
  }

  // ── BLAST EMAIL (admin → all subscribers) ─────────────────────────
  else if (type === "blast") {
    const { to_email, to_name, message } = data;
    payload = {
      from: "Alphaomegatides <onboarding@resend.dev>",
      to: [to_email],
      subject: "🚀 Alphaomegatides — Important Update",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#fff;padding:32px;border-radius:12px;">
          <div style="text-align:center;margin-bottom:20px;">
            <span style="color:#ff6b6b;font-size:2rem;font-weight:900;">α</span>
            <span style="color:#3be8b0;font-size:2rem;font-weight:900;">Ω</span>
          </div>
          <div style="font-size:0.8rem;color:rgba(255,255,255,0.4);margin-bottom:6px;">Hi ${to_name || "Researcher"},</div>
          <div style="white-space:pre-line;color:rgba(255,255,255,0.85);line-height:1.7;font-size:0.9rem;">${message}</div>
          <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:0.7rem;color:rgba(255,255,255,0.25);">
            Alphaomegatides · alphaomegatides.com · Research use only
          </div>
        </div>
      `,
    };
  }

  else {
    return res.status(400).json({ error: "Unknown email type" });
  }

  // ── Send via Resend ───────────────────────────────────────────────
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend error:", result);
      return res.status(response.status).json({ error: result });
    }

    return res.status(200).json({ success: true, id: result.id });
  } catch (err) {
    console.error("Send email failed:", err);
    return res.status(500).json({ error: "Email send failed" });
  }
}
