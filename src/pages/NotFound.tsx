import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section } from "@/components/primitives";
import { navigation } from "@/data/site";
import { usePageTitle } from "@/lib/page-title";

export default function NotFound() {
  usePageTitle("Page not found");

  return (
    <>
      <PageHeader
        eyebrow="404"
        title="That page does not exist"
        lead="The link may be out of date, or the address may have been mistyped. Here is everything the site has."
      />
      <Section>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="card card-hover group flex items-center justify-between p-5 text-[16px] font-medium text-foreground no-underline"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
