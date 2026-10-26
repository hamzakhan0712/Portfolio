/**
 * POST /api/contact — sends a contact-form message to my inbox through Resend.
 *
 * Runs as a Vercel Function, so the Resend key never reaches the browser.
 * Settings (Vercel → Settings → Environment Variables):
 *
 *   RESEND_API_KEY      required — from resend.com → API Keys
 *   CONTACT_TO_EMAIL    required — where messages land
 *   CONTACT_FROM_EMAIL  optional — a sender on a domain verified in Resend,
 *                       e.g. "Portfolio <contact@hamza.social>". Without it,
 *                       Resend's test sender is used, which can only deliver
 *                       to the address the Resend account was created with.
 *
 * Answers: 200 sent · 400 invalid · 403 wrong origin · 429 too many ·
 * 502 Resend refused · 503 not configured. The page maps each to a message.
 */

type Body = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot: a field people never see. Bots fill it in. */
  website?: unknown;
};

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Best effort: counts live in one function instance, so this stops a burst
   from one visitor, not a determined attacker. */
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 3;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (times.length >= MAX_PER_WINDOW) {
    recent.set(ip, times);
    return true;
  }
  times.push(now);
  recent.set(ip, times);
  return false;
}

const reply = (status: number, error?: string) =>
  Response.json(error ? { ok: false, error } : { ok: true }, { status });

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!,
  );

type Message = { name: string; email: string; subject: string; message: string };

/**
 * The notification email, styled like a Microsoft account email: Segoe UI,
 * a white card on a light grey page, the Windows accent blue, one primary
 * action. Mail clients ignore <style> blocks and modern CSS, so this is
 * tables and inline styles throughout.
 */
function emailHtml({ name, email, subject, message }: Message, receivedAt: string) {
  const font = "'Segoe UI Variable Text','Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,'Helvetica Neue',Arial,sans-serif";
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;
  const e = escapeHtml;
  const row = (label: string, value: string) => `
              <tr>
                <td style="padding:6px 0;width:96px;vertical-align:top;font-size:13px;color:#616161;">${label}</td>
                <td style="padding:6px 0;vertical-align:top;font-size:14px;color:#1a1a1a;">${value}</td>
              </tr>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${e(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f3f3;font-family:${font};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${e(name)}: ${e(message.slice(0, 120))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f3f3;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <tr>
            <td style="padding:0 4px 16px;font-size:14px;font-weight:600;color:#1a1a1a;">
              <span style="display:inline-block;width:10px;height:10px;background:#0067c0;border-radius:2px;margin-right:8px;vertical-align:middle;"></span>
              <span style="vertical-align:middle;">Hamza Khan &middot; Portfolio</span>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;padding:32px;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0067c0;">New message from your contact form</p>
              <h1 style="margin:0 0 24px;font-size:24px;line-height:32px;font-weight:600;color:#1a1a1a;">${e(subject)}</h1>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ebebeb;border-bottom:1px solid #ebebeb;padding:10px 0;margin-bottom:24px;">
                ${row("From", e(name))}
                ${row("Email", `<a href="mailto:${e(email)}" style="color:#0067c0;text-decoration:none;">${e(email)}</a>`)}
                ${row("Received", e(receivedAt))}
              </table>

              <div style="background:#f9f9f9;border:1px solid #ebebeb;border-radius:4px;padding:16px 20px;font-size:15px;line-height:24px;color:#1a1a1a;white-space:pre-wrap;word-wrap:break-word;">${e(message)}</div>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td style="background:#0067c0;border-radius:4px;">
                    <a href="${replyHref}" style="display:inline-block;padding:10px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;font-family:${font};">Reply to ${e(name.split(" ")[0])}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 4px 0;font-size:12px;line-height:18px;color:#616161;">
              Sent from the contact form on <a href="https://www.hamza.social" style="color:#0067c0;text-decoration:none;">hamza.social</a>. Replying to this email goes straight to ${e(email)}.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function emailText({ name, email, subject, message }: Message, receivedAt: string) {
  return [
    "New message from your contact form",
    "",
    subject,
    "",
    `From:     ${name}`,
    `Email:    ${email}`,
    `Received: ${receivedAt}`,
    "",
    message,
    "",
    "—",
    `Sent from hamza.social. Replying goes straight to ${email}.`,
  ].join("\n");
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio contact <onboarding@resend.dev>";
  if (!key || !to) {
    console.error("contact: RESEND_API_KEY and CONTACT_TO_EMAIL must be set");
    return reply(503, "not-configured");
  }

  // Only this site's own pages may send: the browser sets Origin and pages
  // elsewhere cannot fake it.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) {
    return reply(403, "forbidden");
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return reply(400, "invalid");
  }

  // A filled honeypot gets a normal-looking success, so the bot moves on.
  if (text(body.website)) return reply(200);

  const name = text(body.name);
  const email = text(body.email);
  const subject = text(body.subject);
  const message = text(body.message);
  if (
    name.length < 2 ||
    name.length > LIMITS.name ||
    !EMAIL.test(email) ||
    email.length > LIMITS.email ||
    subject.length < 5 ||
    subject.length > LIMITS.subject ||
    message.length < 20 ||
    message.length > LIMITS.message
  ) {
    return reply(400, "invalid");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return reply(429, "rate-limited");

  const fields = { name, email, subject, message };
  const receivedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      // "Reply" in the inbox goes straight back to the visitor.
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      text: emailText(fields, `${receivedAt} IST`),
      html: emailHtml(fields, `${receivedAt} IST`),
    }),
  });

  if (!res.ok) {
    console.error(`contact: Resend answered ${res.status}: ${await res.text()}`);
    return reply(502, "rejected");
  }
  return reply(200);
}
