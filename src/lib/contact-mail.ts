import { contact } from "@/data/site";

/**
 * Sending the contact form.
 *
 * The page posts to /api/contact (api/contact.ts), a Vercel Function that
 * sends through Resend. The key lives only on the server, so nothing in this
 * bundle can be lifted and reused elsewhere.
 *
 * Every outcome is reported, never thrown, so the page can always offer the
 * visitor another way to reach me with the message they already typed.
 */

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot, hidden from people; anything in it marks a bot. */
  website?: string;
};

/**
 * The outcome of a send. `reason` is set only when `ok` is false:
 * not-configured — the server has no Resend settings; rate-limited — too many
 * messages from this visitor; rejected — the server or Resend refused it;
 * network — it never got there.
 * (A flat shape rather than a union: this project's tsconfig is not strict,
 * and unions do not narrow without strictNullChecks.)
 */
export type SendResult = {
  ok: boolean;
  reason?: "not-configured" | "rate-limited" | "rejected" | "network";
};

const REASONS: Record<number, SendResult["reason"]> = {
  429: "rate-limited",
  503: "not-configured",
};

export async function sendContactMessage(data: ContactMessage): Promise<SendResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return { ok: true };
    console.error(`Contact form: /api/contact answered ${res.status}`);
    return { ok: false, reason: REASONS[res.status] ?? "rejected" };
  } catch (error) {
    console.error("Contact form:", error);
    return { ok: false, reason: "network" };
  }
}

/** The same message as a mailto link, for the visitor's own email app. */
export function mailtoFor(data: ContactMessage) {
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
}
