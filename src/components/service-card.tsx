import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { serviceIcons } from "@/lib/service-icons";
import type { Solution } from "@/data/solutions";

/**
 * A service, at a glance — for the home page. The industry, the name, one
 * line, and a screenshot of the real system behind it.
 */
export function ServiceCard({ solution }: { solution: Solution }) {
  const Icon = serviceIcons[solution.slug];

  return (
    <Link
      to={`/services#${solution.slug}`}
      className="card card-hover group flex h-full flex-col overflow-hidden no-underline"
    >
      <div className="overflow-hidden border-b border-border bg-secondary">
        <img
          src={solution.image}
          alt={`${solution.title} screenshot`}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
          <Icon className="h-4 w-4" />
          {solution.domain}
        </p>
        <h3 className="mt-3 text-[21px] font-semibold leading-snug text-foreground">
          {solution.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted-foreground">
          {solution.tagline}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-primary">
          See what it includes
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export default ServiceCard;
