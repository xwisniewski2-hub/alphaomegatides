import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = "Alphaomegatides <noreply@alphaomegatides.com>";
const ADMIN_EMAIL = "alphaomegatides@yahoo.com";

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error ${res.status}: ${err}`);
  }
  return res.json();
}

// ── Email Templates ──────────────────────────────────────────────────────────

function otpVerifyHtml(name: string, code: string) {
  return `
<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#0e0e0e;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0e0e;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;max-width:520px;width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a1a1a,#222);padding:32px 40px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:2rem;margin-bottom:8px;">🔬</div>
          <div style="font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:-0.02em;">Alpha<span style="color:#ff6b6b;">ω</span><span style="color:#3be8b0;">mega</span>tides</div>
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.35);letter-spacing:0.1em;margin-top:4px;">WHERE THE TIDE TURNS FOR ALL</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:36px 40px;text-align:center;">
          <div style="font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:8px;">Verify your email address</div>
          <div style="font-size:0.9rem;color:rgba(255,255,255,0.5);margin-bottom:32px;line-height:1.6;">Hi ${name}, enter this code to complete your account creation.</div>
          <!-- OTP Code Box -->
          <div style="background:rgba(59,232,176,0.08);border:2px solid rgba(59,232,176,0.3);border-radius:14px;padding:28px;margin:0 auto 32px;display:inline-block;min-width:200px;">
            <div style="font-size:2.8rem;font-weight:800;letter-spacing:0.35em;color:#3be8b0;font-family:'Courier New',monospace;">${code}</div>
            <div style="font-size:0.72rem;color:rgba(255,255,255,0.35);margin-top:8px;">Expires in 10 minutes</div>
          </div>
          <div style="font-size:0.8rem;color:rgba(255,255,255,0.35);line-height:1.6;">
            If you didn't request this code, you can safely ignore this email.<br/>
            <strong style="color:rgba(255,255,255,0.5);">Do not share this code with anyone.</strong>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.05);padding:20px 40px;text-align:center;">
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.2);line-height:1.6;">
            Alphaomegatides · Research Use Only · US Fulfillment<br/>
            <a href="https://alphaomegatides.com" style="color:rgba(59,232,176,0.5);text-decoration:none;">alphaomegatides.com</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function accountSignupHtml(d: any) {
  return `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0e0e0e;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0e0e;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid rgba(255,255,255,0.08);max-width:520px;width:100%;">
        <tr><td style="padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:center;">
          <div style="font-size:1.4rem;font-weight:800;color:#fff;">Alpha<span style="color:#ff6b6b;">ω</span><span style="color:#3be8b0;">mega</span>tides</div>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <div style="font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:6px;">✅ New Account Created</div>
          <div style="font-size:0.85rem;color:rgba(255,255,255,0.45);margin-bottom:24px;">A new researcher just signed up.</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
              ["Name", `${d.fname} ${d.lname}`],
              ["Email", d.email],
              ["Phone", d.phone || "—"],
              ["Address", `${d.street}${d.apt ? ` ${d.apt}` : ""}, ${d.city}, ${d.state} ${d.zip}`],
              ["Signed up", new Date().toLocaleString("en-US", { timeZone: "America/New_York" })],
            ].map(([k, v]) => `
            <tr>
              <td style="padding:8px 0;font-size:0.8rem;color:rgba(255,255,255,0.35);width:100px;vertical-align:top;">${k}</td>
              <td style="padding:8px 0;font-size:0.85rem;color:#fff;font-weight:500;">${v}</td>
            </tr>`).join("")}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function waitlistNotifyHtml(d: any) {
  const interests = d.interests?.length ? d.interests.join(", ") : "Not specified";
  return `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0e0e0e;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0e0e;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid rgba(255,255,255,0.08);max-width:520px;width:100%;">
        <tr><td style="padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:center;">
          <div style="font-size:1.4rem;font-weight:800;color:#fff;">Alpha<span style="color:#ff6b6b;">ω</span><span style="color:#3be8b0;">mega</span>tides</div>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <div style="font-size:1.05rem;font-weight:700;color:#fff;margin-bottom:6px;">📋 New Waitlist Signup</div>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
              ["Name", d.name || "—"],
              ["Email", d.email],
              ["Interests", interests],
              ["Source", d.source || "—"],
              ["Time", new Date().toLocaleString("en-US", { timeZone: "America/New_York" })],
            ].map(([k, v]) => `
            <tr>
              <td style="padding:8px 0;font-size:0.8rem;color:rgba(255,255,255,0.35);width:100px;vertical-align:top;">${k}</td>
              <td style="padding:8px 0;font-size:0.85rem;color:#fff;font-weight:500;">${v}</td>
            </tr>`).join("")}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function blastHtml(name: string, message: string) {
  return `
<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0e0e0e;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0e0e0e;padding:40px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;border:1px solid rgba(255,255,255,0.08);max-width:520px;width:100%;">
        <tr><td style="padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:center;">
          <div style="font-size:1.4rem;font-weight:800;color:#fff;">Alpha<span style="color:#ff6b6b;">ω</span><span style="color:#3be8b0;">mega</span>tides</div>
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.3);letter-spacing:0.1em;margin-top:4px;">WHERE THE TIDE TURNS FOR ALL</div>
        </td></tr>
        <tr><td style="padding:36px 40px;">
          <div style="font-size:0.95rem;color:rgba(255,255,255,0.6);margin-bottom:8px;">Hi ${name},</div>
          <div style="font-size:0.95rem;color:#fff;line-height:1.75;white-space:pre-line;">${message}</div>
        </td></tr>
        <tr><td style="background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.05);padding:20px 40px;text-align:center;">
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.2);">
            Alphaomegatides · Research Use Only<br/>
            <a href="https://alphaomegatides.com" style="color:rgba(59,232,176,0.5);text-decoration:none;">alphaomegatides.com</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ── Main Handler ─────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "https://alphaomegatides.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not set");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const { type, data } = req.body || {};

  try {
    switch (type) {
      case "otp_verify": {
        // Send verification code to the user signing up
        await sendEmail(
          data.to_email,
          `${data.code} — Your Alphaomegatides verification code`,
          otpVerifyHtml(data.to_name, data.code)
        );
        return res.status(200).json({ ok: true });
      }

      case "account_signup": {
        // Notify admin of new signup (fire-and-forget, no user email)
        await sendEmail(
          ADMIN_EMAIL,
          `New researcher signup — ${data.fname} ${data.lname}`,
          accountSignupHtml(data)
        );
        return res.status(200).json({ ok: true });
      }

      case "notify": {
        // Waitlist signup — notify admin
        await sendEmail(
          ADMIN_EMAIL,
          `New waitlist signup — ${data.name || data.email}`,
          waitlistNotifyHtml(data)
        );
        return res.status(200).json({ ok: true });
      }

      case "blast": {
        // Waitlist blast email — send to individual subscriber
        await sendEmail(
          data.to_email,
          "Update from Alphaomegatides",
          blastHtml(data.to_name || "Researcher", data.message)
        );
        return res.status(200).json({ ok: true });
      }

      default:
        return res.status(400).json({ error: `Unknown email type: ${type}` });
    }
  } catch (err: any) {
    console.error("send-email error:", err?.message || err);
    return res.status(500).json({ error: err?.message || "Email send failed" });
  }
}
