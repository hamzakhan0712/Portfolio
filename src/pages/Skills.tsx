import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  Beaker,
  ChevronDown,
  ChevronRight,
  Cloud,
  Code,
  Database,
  Monitor,
  PanelsTopLeft,
  Plug,
  Search,
  Server,
  Wrench,
  X,
  type Icon,
} from "@/components/icons";
import {
  ContactBand,
  PageHeader,
  Pivot,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { RevealItem, RevealList } from "@/components/reveal";
import { projects } from "@/data/projects";
import {
  alsoWorkedWith,
  coreStack,
  projectsUsing,
  rankedTools,
  skillGroups,
  type Tool,
} from "@/data/skills";
import { usePageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

/**
 * Skills, each one tied to the projects it was used in. Select a tool to see
 * them; search and the area filter narrow the list.
 */

const AREA_ICONS: Record<string, Icon> = {
  languages: Code,
  frontend: PanelsTopLeft,
  backend: Server,
  data: Database,
  ml: BrainCircuit,
  desktop: Monitor,
  cloud: Cloud,
  testing: Beaker,
  integrations: Plug,
};

/** Which tool is open, and where it was opened, so its panel appears there. */
type Selection = { name: string; from: string } | null;

/** A logo on a white tile — or, where the tool has none, its glyph in the
 *  tool's colour — with a monogram only as a last resort. */
function ToolIcon({ tool, size = "md" }: { tool: Tool; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-12 w-12 rounded-lg" : "h-8 w-8 rounded";
  if (tool.glyph) {
    const Glyph = tool.glyph;
    return (
      <span
        aria-hidden
        className={cn("flex shrink-0 items-center justify-center bg-white shadow-rest", box)}
      >
        <Glyph
          strokeWidth={1.75}
          style={{ color: tool.tint }}
          className={size === "lg" ? "h-7 w-7" : "h-5 w-5"}
        />
      </span>
    );
  }
  if (tool.icon) {
    return (
      <span className={cn("flex shrink-0 items-center justify-center bg-white shadow-rest", box)}>
        <img
          src={tool.icon}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          className={size === "lg" ? "h-7 w-7 object-contain" : "h-5 w-5 object-contain"}
        />
      </span>
    );
  }
  const letters = tool.name
    .split(/[\s/.&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  return (
    <span
      aria-hidden
      className={cn(
        "icon-tile shrink-0 font-display font-semibold",
        box,
        size === "lg" ? "text-[15px]" : "text-[12.5px]",
      )}
    >
      {letters.length > 1 ? letters : tool.name.slice(0, 2)}
    </span>
  );
}

/** The projects behind one tool, opened in place under where it was chosen. */
function ToolDetail({ tool, id, onClose }: { tool: Tool; id: string; onClose: () => void }) {
  const used = projectsUsing(tool);
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.1, 0.9, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-4 rounded-3xl bg-surface p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1">
          <p className="text-[14.5px] text-foreground">
            <strong className="font-semibold">{tool.name}</strong>{" "}
            <span className="text-muted-foreground">
              is used in {used.length} {used.length === 1 ? "project" : "projects"}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${tool.name}`}
            className="btn-icon h-8 w-8"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {used.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="group flex items-center gap-3 rounded-2xl bg-card p-2 pr-3 no-underline shadow-rest transition-shadow hover:shadow-raised"
              >
                {project.poster && (
                  <img
                    src={project.poster}
                    alt=""
                    loading="lazy"
                    className="h-11 w-[4.5rem] shrink-0 rounded-xl object-cover object-top"
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold text-foreground">
                    {project.name}
                  </span>
                  <span className="block truncate text-[12.5px] text-muted-foreground">
                    {project.kind}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  usePageTitle("Skills");

  const [selection, setSelection] = useState<Selection>(null);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const panelId = useId();
  const [openGroups, setOpenGroups] = useState<string[]>(["languages"]);
  const toggleGroup = (id: string) =>
    setOpenGroups((current) => (current.includes(id) ? current.filter((g) => g !== id) : [...current, id]));

  const toggle = (name: string, from: string) =>
    setSelection((current) =>
      current?.name === name && current.from === from ? null : { name, from },
    );

  const maxUse = coreStack[0]?.projects.length ?? 1;
  const needle = query.trim().toLowerCase();

  const groups = useMemo(
    () =>
      skillGroups
        .filter((item) => group === "all" || item.id === group)
        .map((item) => ({
          ...item,
          tools: item.tools.filter((tool) => !needle || tool.name.toLowerCase().includes(needle)),
        }))
        .filter((item) => item.tools.length > 0),
    [group, needle],
  );

  const openTool = (from: string, tools: Tool[]) =>
    selection?.from === from ? tools.find((tool) => tool.name === selection.name) : undefined;

  const coreOpen = openTool("core", coreStack);

  return (
    <>
      <PageHeader
        title="Skills"
        lead={`${rankedTools.length} technologies, each one used in the ${projects.length} projects on this site. Select any of them to see where.`}
      />

      {/* ── Core stack: the most-used tools, ranked ───────────────────── */}
      <Section reveal={false} className="pt-8 sm:pt-10">
        <SectionHeading
          title="Core stack"
          lead="What I reach for first, ranked by how many projects use it."
        />
        <RevealList className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {coreStack.map((tool) => {
            const open = coreOpen?.name === tool.name;
            return (
              <RevealItem key={tool.name}>
                <button
                  type="button"
                  onClick={() => toggle(tool.name, "core")}
                  aria-expanded={open}
                  aria-controls={open ? `${panelId}-core` : undefined}
                  className={cn(
                    "card card-interactive flex h-full w-full flex-col items-start p-4 text-left sm:p-5",
                    open && "ring-2 ring-primary",
                  )}
                >
                  <ToolIcon tool={tool} size="lg" />
                  <span className="mt-4 text-[16px] font-semibold text-foreground">
                    {tool.name}
                  </span>
                  <span className="t-caption mt-0.5">
                    {tool.projects.length} of {projects.length} projects
                  </span>
                  <span className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${(tool.projects.length / maxUse) * 100}%` }}
                    />
                  </span>
                  <span className="mt-3 flex -space-x-2" aria-hidden>
                    {tool.projects.slice(0, 4).map((project) => (
                      <img
                        key={project.slug}
                        src={project.poster}
                        alt=""
                        loading="lazy"
                        className="h-7 w-7 rounded-full object-cover object-left-top ring-2 ring-card"
                      />
                    ))}
                  </span>
                </button>
              </RevealItem>
            );
          })}
        </RevealList>
        <AnimatePresence initial={false}>
          {coreOpen && (
            <ToolDetail
              key={coreOpen.name}
              tool={coreOpen}
              id={`${panelId}-core`}
              onClose={() => setSelection(null)}
            />
          )}
        </AnimatePresence>
      </Section>

      {/* ── Everything, by area ──────────────────────────────────────── */}
      <Section className="pt-0 sm:pt-0">
        <SectionHeading title="By area" />

        <div className="mt-6 flex flex-col items-start gap-3">
          <label className="relative block w-full sm:w-80">
            <span className="sr-only">Find a technology</span>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a technology"
              className="field-input pl-10"
            />
          </label>
          <Pivot
            label="Filter skills by area"
            value={group}
            onChange={setGroup}
            items={[
              { value: "all", label: "All" },
              ...skillGroups.map((item) => ({ value: item.id, label: item.name })),
            ]}
          />
        </div>

        {groups.length === 0 ? (
          <div className="card mt-6 flex flex-col items-start gap-3 p-6 sm:p-8">
            <p className="text-[15px] text-foreground">
              No technology matches “{query.trim()}”{group !== "all" && " in this area"}.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setGroup("all");
              }}
              className="btn-standard btn-sm"
            >
              Show everything
            </button>
          </div>
        ) : (
          /* Windows Settings expanders: one row per area, opening onto its
             tools; each tool row opens onto the projects that use it. */
          <ul className="mt-6 space-y-1">
            {groups.map((item) => {
              const open = openTool(item.id, item.tools);
              const expanded = Boolean(needle) || group !== "all" || openGroups.includes(item.id);
              const AreaIcon = AREA_ICONS[item.id] ?? Wrench;
              return (
                <li key={item.id} className="card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleGroup(item.id)}
                    aria-expanded={expanded}
                    className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-card-hover sm:px-5"
                  >
                    <AreaIcon className="h-5 w-5 shrink-0 text-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14.5px] font-medium text-foreground">{item.name}</span>
                      <span className="block text-[13px] text-muted-foreground">{item.role}</span>
                    </span>
                    <span className="hidden text-[13px] text-muted-foreground sm:block">
                      {item.tools.length} {item.tools.length === 1 ? "tool" : "tools"}
                    </span>
                    <ChevronDown
                      className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200", expanded && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: [0.1, 0.9, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="divide-y divide-divider border-t border-divider bg-surface/60">
                          {item.tools.map((tool) => {
                            const count = projectsUsing(tool).length;
                            const selected = open?.name === tool.name;
                            return (
                              <li key={tool.name}>
                                <button
                                  type="button"
                                  onClick={() => toggle(tool.name, item.id)}
                                  aria-expanded={selected}
                                  aria-controls={selected ? `${panelId}-${item.id}` : undefined}
                                  className={cn(
                                    "flex w-full items-center gap-4 py-2.5 pl-12 pr-4 text-left transition-colors hover:bg-secondary sm:pl-14 sm:pr-5",
                                    selected && "bg-secondary",
                                  )}
                                >
                                  <ToolIcon tool={tool} />
                                  <span className="min-w-0 flex-1 truncate text-[14px] text-foreground">{tool.name}</span>
                                  <span className="text-[13px] text-muted-foreground tabular">
                                    {count} {count === 1 ? "project" : "projects"}
                                  </span>
                                  <ChevronRight
                                    className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", selected && "rotate-90")}
                                  />
                                </button>
                                <AnimatePresence initial={false}>
                                  {selected && open && (
                                    <div className="px-4 pb-3 sm:px-5">
                                      <ToolDetail
                                        key={open.name}
                                        tool={open}
                                        id={`${panelId}-${item.id}`}
                                        onClose={() => setSelection(null)}
                                      />
                                    </div>
                                  )}
                                </AnimatePresence>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      {/* ── Without a project on this site ───────────────────────────── */}
      <Section className="pt-0 sm:pt-0">
        <div className="card p-6 sm:p-8">
          <h2 className="t-subtitle">Also worked with</h2>
          <p className="mt-1.5 max-w-2xl text-[14.5px] leading-6 text-muted-foreground">
            Tools I have used outside the projects shown here, so they carry no count.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {alsoWorkedWith.map((item) => (
              <li
                key={item.name}
                className="inline-flex items-center gap-2 rounded bg-secondary py-1 pl-1 pr-2.5 text-[13.5px] font-medium text-foreground"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-white">
                  <img
                    src={item.icon}
                    alt=""
                    width={16}
                    height={16}
                    loading="lazy"
                    className="h-4 w-4 object-contain"
                  />
                </span>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ContactBand />
    </>
  );
}
