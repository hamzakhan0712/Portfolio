import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  Check,
  Contact as ContactCard,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { DocsPage } from "@/components/docs/docs-layout";
import { CodePanel } from "@/components/docs/code-panel";
import {
  Callout,
  H2,
  P,
  PageHeader,
  Prop,
  PropList,
} from "@/components/docs/prose";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactPayload } from "@/data/payloads";
import { cn } from "@/lib/utils";

/**
 * The one endpoint with a real effect.
 *
 * The request body in the rail is bound to the form, so filling a field
 * rewrites the JSON beside it — the clearest possible statement of what
 * pressing send actually transmits. Delivery goes through EmailJS from the
 * browser; there is still no server of mine in the path, and the page says so.
 */

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const FIELDS = [
  {
    name: "name" as const,
    label: "name",
    type: "string",
    placeholder: "Your name",
  },
  {
    name: "email" as const,
    label: "email",
    type: "string · email",
    placeholder: "you@company.com",
  },
  {
    name: "subject" as const,
    label: "subject",
    type: "string",
    placeholder: "Backend role at …",
  },
];

function CopyRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
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
    <div className="flex items-center gap-3 border-t border-border py-3 first:border-t-0 first:pt-0">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="mono-label">{label}</p>
        {href ? (
          <a
            href={href}
            className="block truncate text-[13.5px] text-foreground no-underline hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-[13.5px] text-foreground">{value}</p>
        )}
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 rounded p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-ok" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onTouched",
  });

  // Watched rather than read on submit: the payload in the rail has to track
  // what is in the fields right now for the demonstration to mean anything.
  const values = form.watch();

  // Once the visitor starts a new message, the previous "accepted" response is
  // no longer describing anything — the body beside it has been cleared.
  const hasInput = Boolean(
    values.name || values.email || values.subject || values.message,
  );
  useEffect(() => {
    if (sent && hasInput) setSent(false);
  }, [sent, hasInput]);

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
          to_name: "Hamza Khan",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      if (result.status === 200) {
        setSent(true);
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
        description: `Email ${contactPayload.email} directly and it will reach me.`,
      });
    } finally {
      setSending(false);
    }
  };

  const { errors } = form.formState;

  return (
    <DocsPage
      title="Contact"
      aside={
        <CodePanel
          method="POST"
          path="/contact"
          body={{
            name: values.name || "",
            email: values.email || "",
            subject: values.subject || "",
            message: values.message || "",
          }}
          status={sent ? "202 Accepted" : "200 OK"}
          response={
            sent
              ? { accepted: true, delivery: "email", eta: contactPayload.response_time }
              : {
                  ok: true,
                  delivered_to: contactPayload.email,
                  response_time: contactPayload.response_time,
                }
          }
          >
            {/* Who reads it. The cutout has a transparent background, so it
                sits on the tint in either theme without a seam. */}
            <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-b from-primary/10 to-transparent">
              <div className="flex items-end gap-3 px-4 pt-4">
                <img
                  src="/photos/cutout.webp"
                  alt="Hamza Khan"
                  width={160}
                  height={166}
                  loading="lazy"
                  className="-mb-px h-24 w-auto shrink-0 object-contain object-bottom"
                />
                <div className="min-w-0 pb-4">
                  <p className="text-[13.5px] font-semibold text-foreground">
                    Hamza Khan
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    reads every message himself
                  </p>
                  <p className="mt-2 font-mono text-[10.5px] text-muted-foreground/80">
                    {contactPayload.response_time}
                  </p>
                </div>
              </div>
            </div>
          </CodePanel>
      }
    >
      <PageHeader
        method="POST"
        path="/contact"
        title="Contact"
        lead="The only route on this site that does something. Fill the form and the request body beside it updates as you type."
      />

      <Callout tone="ok" title="Where this actually goes">
        Submissions are delivered by EmailJS straight from your browser to my
        inbox — there is no server of mine in the path, which is why this is the
        only endpoint that works at all. If you would rather not use a form,{" "}
        <a href={`mailto:${contactPayload.email}`}>{contactPayload.email}</a>{" "}
        reaches the same place.
      </Callout>

      <H2>Send a message</H2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="flex flex-wrap items-baseline gap-2"
            >
              <span className="prop-name">{field.label}</span>
              <span className="prop-type">{field.type}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-warn">
                required
              </span>
            </label>
            <Input
              id={field.name}
              placeholder={field.placeholder}
              autoComplete={field.name === "email" ? "email" : "off"}
              aria-invalid={Boolean(errors[field.name])}
              className={cn(
                "mt-2 font-mono text-[13px]",
                errors[field.name] && "border-err focus-visible:ring-err",
              )}
              {...form.register(field.name)}
            />
            {errors[field.name] && (
              <p className="mt-1.5 font-mono text-[11px] text-err">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="message" className="flex flex-wrap items-baseline gap-2">
            <span className="prop-name">message</span>
            <span className="prop-type">string · min 20</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-warn">
              required
            </span>
          </label>
          <Textarea
            id="message"
            rows={6}
            placeholder="What are you building, and where would I fit?"
            aria-invalid={Boolean(errors.message)}
            className={cn(
              "mt-2 resize-y font-mono text-[13px]",
              errors.message && "border-err focus-visible:ring-err",
            )}
            {...form.register("message")}
          />
          {errors.message && (
            <p className="mt-1.5 font-mono text-[11px] text-err">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={sending} className="w-full sm:w-auto">
          {sending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send request
            </>
          )}
        </Button>
      </form>

      <H2>Or reach me directly</H2>
      <div className="mt-6 rounded-xl border border-border px-4 py-2">
        <CopyRow
          icon={Mail}
          label="email"
          value={contactPayload.email}
          href={`mailto:${contactPayload.email}`}
        />
        <CopyRow
          icon={Phone}
          label="phone"
          value={contactPayload.phone}
          href={`tel:${contactPayload.phone.replace(/\s/g, "")}`}
        />
        <CopyRow
          icon={MapPin}
          label="based_in"
          value={contactPayload.based_in}
        />
      </div>

      <a
        href="/documents/hamza-khan.vcf"
        download
        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-[13px] text-foreground no-underline transition-colors hover:border-primary/40 hover:bg-secondary"
      >
        <ContactCard className="h-3.5 w-3.5" />
        Save my contact card
      </a>

      <H2>What to expect</H2>
      <PropList>
        <Prop name="response_time" type="string">
          {contactPayload.response_time}.
        </Prop>
        <Prop name="open_to" type="string[]">
          {contactPayload.open_to.join(", ")}.
        </Prop>
        <Prop name="looking_for" type="string">
          Backend developer roles — Python and Django first, with a view to
          moving into data engineering.
        </Prop>
      </PropList>

      <P>
        A message that mentions which project caught your attention will always
        get a better answer than one that does not.
      </P>
    </DocsPage>
  );
}
