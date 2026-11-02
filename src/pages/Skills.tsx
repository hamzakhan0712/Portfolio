import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "@/components/icons";
import { ContactBand, PageHeader, Section, SectionHeading } from "@/components/primitives";
import { RevealItem, RevealList } from "@/components/reveal";
import {
  coreStack,
  projectsUsing,
  projectTools,
  supportingTools,
  type RankedTool,
  type Tool,
} from "@/data/skills";
import { usePageTitle } from "@/lib/page-title";
import { cn } from "@/lib/utils";

/**
 * The stack I work in, not everything I have touched: the core tools, what
 * supports them, and a short list used only where a project called for it.
 * Select a tool to see the projects behind it.
 */

/** Which tool is open, and where it was opened, so its panel appears there. */
type Selection = { name: string; from: string } | null;

const projectCount = (count: number) => `${count} ${count === 1 ? "project" : "projects"}`;

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
  const panelId = useId();

  const toggle = (name: string, from: string) =>
    setSelection((current) =>
      current?.name === name && current.from === from ? null : { name, from },
    );

  const openTool = (from: string, tools: RankedTool[]) =>
    selection?.from === from ? tools.find((tool) => tool.name === selection.name) : undefined;

  const detail = (from: string, tools: RankedTool[]) => {
    const open = openTool(from, tools);
    return (
      <AnimatePresence initial={false}>
        {open && (
          <ToolDetail
            key={open.name}
            tool={open}
            id={`${panelId}-${from}`}
            onClose={() => setSelection(null)}
          />
        )}
      </AnimatePresence>
    );
  };

  /** A compact row of tools, for everything outside the core stack. */
  const toolGrid = (from: string, tools: RankedTool[]) => (
    <>
      <RevealList className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const open = openTool(from, tools)?.name === tool.name;
          return (
            <RevealItem key={tool.name}>
              <button
                type="button"
                onClick={() => toggle(tool.name, from)}
                aria-expanded={open}
                aria-controls={open ? `${panelId}-${from}` : undefined}
                className={cn(
                  "card card-interactive flex h-full w-full items-center gap-3 p-3 text-left",
                  open && "ring-2 ring-primary",
                )}
              >
                <ToolIcon tool={tool} />
                <span className="min-w-0 flex-1 truncate text-[14.5px] font-medium text-foreground">
                  {tool.name}
                </span>
                <span className="t-caption tabular">{projectCount(tool.projects.length)}</span>
              </button>
            </RevealItem>
          );
        })}
      </RevealList>
      {detail(from, tools)}
    </>
  );

  return (
    <>
      <PageHeader
        title="Skills"
        lead="The stack I work in, with the projects behind each tool. Select any of them to see where it was used."
      />

      {/* ── Core stack: what I work in day to day ─────────────────────── */}
      <Section reveal={false} className="pt-8 sm:pt-10">
        <SectionHeading
          title="Core stack"
          lead="What I build with first, and the tools to ask me about in depth."
        />
        <RevealList className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {coreStack.map((tool) => {
            const open = openTool("core", coreStack)?.name === tool.name;
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
                  <span className="t-caption mt-0.5">{projectCount(tool.projects.length)}</span>
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
        {detail("core", coreStack)}
      </Section>

      {/* ── What supports the core stack ──────────────────────────────── */}
      <Section reveal={false} className="pt-0 sm:pt-0">
        <SectionHeading
          title="Also part of my work"
          lead="Languages, storage, testing and CI that go with the core stack."
        />
        {toolGrid("supporting", supportingTools)}
      </Section>

      {/* ── Used where a project needed it ────────────────────────────── */}
      <Section reveal={false} className="pt-0 sm:pt-0">
        <SectionHeading
          title="Used for specific projects"
          lead="Picked up because a project needed them. I have shipped with these, but they aren't my main stack."
        />
        {toolGrid("project", projectTools)}
      </Section>

      <ContactBand />
    </>
  );
}
