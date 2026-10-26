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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      // "Reply" in the inbox goes straight back to the visitor.
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html:
        `<p style="white-space:pre-wrap;font:15px/1.6 system-ui,sans-serif">${escapeHtml(message)}</p>` +
        `<p style="font:14px system-ui,sans-serif;color:#555">— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    }),
  });

  if (!res.ok) {
    console.error(`contact: Resend answered ${res.status}: ${await res.text()}`);
    return reply(502, "rejected");
  }
  return reply(200);
}
