import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { contact, profile } from "@/data/site";

/**
 * Sending the contact form.
 *
 * Delivery goes through EmailJS from the browser, so there is no server in
 * the path. The three ids are read at build time from VITE_EMAILJS_* (set
 * them in Vercel → Settings → Environment Variables, then redeploy). They are
 * public by design — they ship in the bundle — so the EmailJS dashboard's
 * domain allowlist is what stops them being used elsewhere.
 *
 * Every outcome is reported, never thrown, so the page can always offer the
 * visitor another way to reach me with the message they already typed.
 */

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

/**
 * The outcome of a send. `reason` is set only when `ok` is false:
 * not-configured — the build has no ids; rejected — EmailJS refused it (a bad
 * id, a disconnected mail account, a rate limit); network — it never got there.
 * (A flat shape rather than a union: this project's tsconfig is not strict,
 * and unions do not narrow without strictNullChecks.)
 */
export type SendResult = {
  ok: boolean;
  reason?: "not-configured" | "rejected" | "network";
  detail?: string;
};

const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
};

export const isMailConfigured = Boolean(config.serviceId && config.templateId && config.publicKey);

export async function sendContactMessage(data: ContactMessage): Promise<SendResult> {
  if (!isMailConfigured) {
    console.error(
      "Contact form: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY must all be set at build time.",
    );
    return { ok: false, reason: "not-configured" };
  }

  try {
    await emailjs.send(
      config.serviceId!,
      config.templateId!,
      {
        from_name: data.name,
        from_email: data.email,
        // Lets "Reply" in the inbox go straight back to the sender.
        reply_to: data.email,
        subject: data.subject,
        message: data.message,
        to_name: profile.name,
      },
      {
        publicKey: config.publicKey!,
        // One visitor, one message a minute: stops accidental double sends.
        limitRate: { id: "contact-form", throttle: 60_000 },
      },
    );
    return { ok: true };
  } catch (error) {
    if (error instanceof EmailJSResponseStatus) {
      console.error(`Contact form: EmailJS answered ${error.status}: ${error.text}`);
      // Status 0 means the request never completed — offline, or blocked.
      return error.status === 0
        ? { ok: false, reason: "network" }
        : { ok: false, reason: "rejected", detail: error.text };
    }
    console.error("Contact form:", error);
    return { ok: false, reason: "network" };
  }
}

/** The same message as a mailto link, for the visitor's own email app. */
export function mailtoFor(data: ContactMessage) {
  const body = `${data.message}\n\n— ${data.name} (${data.email})`;
  return `mailto:${contact.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
}
