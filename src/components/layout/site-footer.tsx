import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, type Icon } from "@/components/icons";
import { aboutTabs, contact, navigation, profile } from "@/data/site";

/* Every page, as a small sitemap: the main items, with About's views under it. */
const pages = navigation.flatMap((item) =>
  item.href === "/about" ? aboutTabs.map((tab) => ({ href: tab.to, label: tab.label })) : [item],
);

function FooterLink({
  href,
  icon: Icon,
  children,
  external = false,
}: {
  href: string;
  icon: Icon;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2.5 rounded text-[14px] text-muted-foreground no-underline transition-colors hover:text-foreground"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
      {children}
    </a>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-3 pb-3 sm:px-4">
      <div className="mx-auto max-w-6xl rounded-4xl bg-card px-6 py-12 shadow-rest sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="text-[15px] font-semibold text-foreground">{profile.name}</p>
            <p className="mt-0.5 text-[14px] text-muted-foreground">
              {profile.role}, {profile.location}
            </p>
            <p className="mt-4 text-[14px] leading-6 text-muted-foreground">
              Designed in the spirit of Fluent 2 and Windows 11, and built by hand.
            </p>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold text-foreground">Pages</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-1">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="rounded text-[14px] text-muted-foreground no-underline transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold text-foreground">Reach me</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <FooterLink href={`mailto:${contact.email}`} icon={Mail}>
                  {contact.email}
                </FooterLink>
              </li>
              <li>
                <FooterLink href={contact.linkedin} icon={Linkedin} external>
                  LinkedIn
                </FooterLink>
              </li>
              <li>
                <FooterLink href={contact.github} icon={Github} external>
                  GitHub
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-divider pt-5 text-[13px] text-tertiary-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p>
            {profile.status}: {profile.openTo.join(", ")}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
