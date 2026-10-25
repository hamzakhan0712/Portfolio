import { PageHeader, Section, SettingsCard } from "@/components/primitives";
import { navigation } from "@/data/site";
import { usePageTitle } from "@/lib/page-title";

export default function NotFound() {
  usePageTitle("Page not found");

  return (
    <>
      <PageHeader
        title="This page doesn't exist"
        lead="The link may be out of date, or the address mistyped. Every page on the site is listed below."
      />
      <Section className="pt-8 sm:pt-10">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {navigation.map((item) => (
            <li key={item.href}>
              <SettingsCard title={item.label} to={item.href} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
