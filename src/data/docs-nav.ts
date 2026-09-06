import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";

/**
 * The reference's table of contents.
 *
 * One declaration drives three things that must never disagree: the sidebar,
 * the previous/next pager at the foot of each page, and the ⌘K index. Adding a
 * page here is the only step needed to make it navigable.
 */

export type NavItem = {
  title: string;
  href: string;
  /** Shown as a coloured verb chip, the way a real reference marks a route. */
  method?: "GET" | "POST";
  /** Short right-aligned note, e.g. a project's category. */
  meta?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navigation: NavGroup[] = [
  {
    label: "Start here",
    items: [
      { title: "Overview", href: "/" },
      // The paths keep the API naming; the labels are what a visitor reads,
      // and "Authentication" tells a recruiter nothing about the page.
      { title: "How this works", href: "/authentication" },
      { title: "What I don't do", href: "/errors" },
    ],
  },
  {
    // First group after the overview, because a visitor who runs a business
    // wants to know what can be built for them before they want a CV.
    //
    // The four domains are not listed individually here: they are anchors on
    // one page, and a sidebar entry that cannot be the active page — or the
    // pager's next page — is a link pretending to be a destination.
    label: "What I build",
    items: [
      {
        title: "Solutions",
        href: "/solutions",
        method: "GET" as const,
        meta: String(solutions.length),
      },
    ],
  },
  {
    label: "My work",
    items: [
      { title: "All projects", href: "/projects", method: "GET" },
      ...projects.map((project) => ({
        // The card title carries a descriptive tail after an em dash; the
        // sidebar only has room for the name.
        title: project.title.split(" — ")[0],
        href: `/projects/${project.slug}`,
        meta: project.category === "product" ? "product" : "client",
      })),
    ],
  },
  {
    label: "About me",
    items: [
      { title: "Profile", href: "/profile", method: "GET" },
      { title: "Experience", href: "/experience", method: "GET" },
      { title: "Skills & tools", href: "/skills", method: "GET" },
    ],
  },
  {
    label: "Recognition",
    items: [
      { title: "Awards & certificates", href: "/recognition", method: "GET" },
    ],
  },
  {
    label: "Get in touch",
    items: [{ title: "Contact", href: "/contact", method: "POST" }],
  },
];

/** Reading order, used by the pager. */
export const flatNavigation: NavItem[] = navigation.flatMap(
  (group) => group.items,
);

/** The page before and after `href` in reading order. */
export function neighbours(href: string): {
  previous: NavItem | null;
  next: NavItem | null;
} {
  const index = flatNavigation.findIndex((item) => item.href === href);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? flatNavigation[index - 1] : null,
    next:
      index < flatNavigation.length - 1 ? flatNavigation[index + 1] : null,
  };
}

/**
 * The base every request example is written against.
 *
 * There is no server behind it — see the note on the Overview page. The
 * examples are shaped like real calls because the payloads are real; the
 * transport is the part that is imaginary, and the site says so rather than
 * letting a visitor find out by running one.
 */
export const API_BASE = "https://hamzakhan.dev/v1";
