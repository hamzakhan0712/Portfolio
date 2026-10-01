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
import { cn } from "@/lib/utils";
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
    <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="block truncate text-[16px] text-foreground no-underline hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-[16px] text-foreground">{value}</p>
        )}
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {copied ? <Check className="h-4 w-4 text-ok" /> : <Copy className="h-4 w-4" />}
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
      toast.error("Could not send", {
        description: `Email ${contact.email} directly and it will reach me.`,
      });
    } finally {
      setSending(false);
    }
  };

  const { errors } = form.formState;

  const fieldClass = (hasError: boolean) =>
    cn("field-input", hasError && "border-err focus:border-err focus-visible:ring-err/30");

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        lead="Have a role in mind or just want to connect? Send me a message and I will get back to you, usually within a day."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="card p-6 sm:p-10">
            <h2 className="heading-sub">Send a message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6" noValidate>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Your name
                  </label>
                  <input
                    id="name"
                    placeholder="Jane Smith"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClass(Boolean(errors.name))}
                    {...form.register("name")}
                  />
                  {errors.name && (
                    <p className="mt-2 text-[13.5px] text-err">{errors.name.message}</p>
                  )}
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
                    aria-invalid={Boolean(errors.email)}
                    className={fieldClass(Boolean(errors.email))}
                    {...form.register("email")}
                  />
                  {errors.email && (
                    <p className="mt-2 text-[13.5px] text-err">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="field-label">
                  Subject
                </label>
                <input
                  id="subject"
                  placeholder="A role at …"
                  aria-invalid={Boolean(errors.subject)}
                  className={fieldClass(Boolean(errors.subject))}
                  {...form.register("subject")}
                />
                {errors.subject && (
                  <p className="mt-2 text-[13.5px] text-err">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="field-label">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={7}
                  placeholder="Tell me a little about the role or what you would like to discuss."
                  aria-invalid={Boolean(errors.message)}
                  className={cn(fieldClass(Boolean(errors.message)), "resize-y")}
                  {...form.register("message")}
                />
                {errors.message && (
                  <p className="mt-2 text-[13.5px] text-err">{errors.message.message}</p>
                )}
              </div>

              <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>
              <p className="text-[13.5px] text-muted-foreground">
                Sent straight to my inbox. If you would rather not use a form,{" "}
                <a href={`mailto:${contact.email}`} className="font-medium text-primary">
                  {contact.email}
                </a>{" "}
                reaches the same place.
              </p>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="card p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  src="/photos/avatar.webp"
                  alt={profile.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="h-14 w-14 rounded-full object-cover ring-1 ring-border"
                />
                <div>
                  <p className="text-[17px] font-semibold text-foreground">{profile.name}</p>
                  <p className="text-[14.5px] text-muted-foreground">
                    Reads every message himself · replies {contact.responseTime}
                  </p>
                </div>
              </div>
              <div className="mt-6 divide-y divide-border border-t border-border pt-2">
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
              <a href={profile.vcard} download className="btn-secondary mt-6 w-full">
                <ContactCard className="h-4 w-4" />
                Save my contact card
              </a>
            </div>

            <div className="card p-6 sm:p-8">
              <dl className="divide-y divide-border">
                <Fact label="Looking for">
                  Entry-level, full-time software engineering roles — backend,
                  full-stack or frontend.
                </Fact>
                <Fact label="Open to">{profile.openTo.join(", ")}</Fact>
                <Fact label="Response time">Usually within a day.</Fact>
              </dl>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
