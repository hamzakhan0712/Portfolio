import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  Check,
  Contact as ContactCard,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Fact, PageHeader, Section } from "@/components/primitives";
import { contact, profile } from "@/data/site";
import { usePageTitle } from "@/lib/page-title";

/**
 * The contact page. Delivery goes through EmailJS from the browser, so there
 * is no server in the path; a failed send falls back to a plain mailto.
 */

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Please give the message a subject"),
  message: z.string().min(20, "Please write at least a couple of sentences"),
});

type FormValues = z.infer<typeof formSchema>;

function CopyRow({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Could not copy — select the text instead");
    }
  };

  return (
    <div className="flex items-center gap-4 px-4 py-2.5">
      <Icon aria-hidden className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
      <div className="min-w-0 flex-1">
        <p className="t-caption">{label}</p>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="block truncate text-[14.5px] text-foreground no-underline hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-[14.5px] text-foreground">{value}</p>
        )}
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        title={copied ? "Copied" : "Copy"}
        className="btn-icon text-muted-foreground hover:text-foreground"
      >
        {copied ? (
          <Check className="h-4 w-4 text-ok" />
        ) : (
          <Copy className="h-4 w-4" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}

export default function Contact() {
  usePageTitle("Contact");

  const [sending, setSending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    setSending(true);
    try {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_name: profile.name,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      if (result.status === 200) {
        form.reset();
        toast.success("Message sent", {
          description: "I usually reply within a day.",
        });
      } else {
        throw new Error(`Unexpected status ${result.status}`);
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Message not sent", {
        description: `Email ${contact.email} directly and it will reach me.`,
      });
    } finally {
      setSending(false);
    }
  };

  const { errors } = form.formState;

  /** The accessibility wiring every TextBox needs for its validation message. */
  const describe = (id: keyof FormValues) => ({
    "aria-invalid": Boolean(errors[id]),
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
  });

  const errorFor = (id: keyof FormValues) =>
    errors[id] && (
      <p id={`${id}-error`} className="mt-1.5 text-[13px] text-err">
        {errors[id]?.message}
      </p>
    );

  return (
    <>
      <PageHeader
        title="Contact"
        lead="Have a role in mind, or want to talk about a project? Send a message and I will get back to you, usually within a day."
      />

      <Section className="pt-8 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-8">
          <div className="card p-5 sm:p-8">
            <h2 className="t-subtitle">Send a message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Your name
                  </label>
                  <input
                    id="name"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    className="field-input"
                    {...describe("name")}
                    {...form.register("name")}
                  />
                  {errorFor("name")}
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="field-input"
                    {...describe("email")}
                    {...form.register("email")}
                  />
                  {errorFor("email")}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="field-label">
                  Subject
                </label>
                <input
                  id="subject"
                  placeholder="A full-stack role at …"
                  className="field-input"
                  {...describe("subject")}
                  {...form.register("subject")}
                />
                {errorFor("subject")}
              </div>

              <div>
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={7}
                  placeholder="Tell me a little about the role or what you would like to discuss."
                  className="field-input resize-y"
                  {...describe("message")}
                  {...form.register("message")}
                />
                {errorFor("message")}
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
                <button type="submit" disabled={sending} className="btn-accent btn-lg">
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" strokeWidth={1.75} />
                      Send message
                    </>
                  )}
                </button>
                <p className="text-[13px] leading-5 text-muted-foreground">
                  Goes straight to my inbox. Prefer email?{" "}
                  <a href={`mailto:${contact.email}`} className="text-primary">
                    {contact.email}
                  </a>
                </p>
              </div>
            </form>
          </div>

          <aside className="space-y-3">
            <div className="card overflow-hidden">
              <div className="flex items-center gap-4 p-5">
                <img
                  src="/photos/avatar.webp"
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="t-body-strong">{profile.name}</p>
                  <p className="text-[13.5px] text-muted-foreground">{profile.role}</p>
                  <p className="text-[13.5px] text-muted-foreground">
                    Replies {contact.responseTime}
                  </p>
                </div>
              </div>
              <div className="divide-y divide-divider border-t border-divider">
                <CopyRow
                  icon={Mail}
                  label="Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
                <CopyRow
                  icon={Phone}
                  label="Phone"
                  value={contact.phone}
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                />
                <CopyRow
                  icon={Linkedin}
                  label="LinkedIn"
                  value={contact.linkedinHandle}
                  href={contact.linkedin}
                  external
                />
                <CopyRow
                  icon={Github}
                  label="GitHub"
                  value={contact.githubHandle}
                  href={contact.github}
                  external
                />
                <CopyRow icon={MapPin} label="Based in" value={contact.basedIn} />
              </div>
              <div className="border-t border-divider p-4">
                <a href={profile.vcard} download className="btn-standard w-full">
                  <ContactCard className="h-4 w-4" strokeWidth={1.5} />
                  Save my contact card
                </a>
              </div>
            </div>

            <div className="card p-5">
              <dl className="divide-y divide-divider">
                <Fact label="Looking for">
                  Full-time full-stack software engineering roles: backend, frontend or both.
                </Fact>
                <Fact label="Open to">{profile.openTo.join(", ")}</Fact>
                <Fact label="Response time">Usually within a day</Fact>
              </dl>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
