import { Link } from "react-router-dom";
import { FileText, Linkedin, Mail, Phone } from "lucide-react";
import { contact, navigation, profile } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="text-[17px] font-semibold text-foreground">{profile.name}</p>
            <p className="mt-1 text-[15px] text-muted-foreground">
              {profile.role} · {profile.location}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {profile.headline} Every project on this site is finished software,
              shown running.
            </p>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Pages
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-6 sm:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-[15px] text-foreground/80 no-underline transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Reach me
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2.5 text-[15px] text-foreground/80 no-underline transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-[15px] text-foreground/80 no-underline transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-[15px] text-foreground/80 no-underline transition-colors hover:text-primary"
                >
                  <Linkedin className="h-4 w-4 shrink-0" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 text-[15px] text-foreground/80 no-underline transition-colors hover:text-primary"
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[13.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>{profile.status} · {profile.openTo.join(", ")}</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
