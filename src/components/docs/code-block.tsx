import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlight, type Language } from "@/lib/highlight";
import { cn } from "@/lib/utils";

export type Sample = {
  /** Tab label, e.g. "cURL". */
  label: string;
  language: Language;
  code: string;
};

type CodeBlockProps = {
  samples: Sample[];
  /** Left-hand text in the title bar, e.g. a request line or "Response". */
  title?: React.ReactNode;
  /** Small print under the block — used to say there is no server. */
  footer?: React.ReactNode;
  /** Reveal line by line on first paint. Off by default; reading beats motion. */
  stream?: boolean;
  className?: string;
};

/** Total time the streaming reveal may take, however many lines there are. */
const STREAM_BUDGET_MS = 520;

export function CodeBlock({
  samples,
  title,
  footer,
  stream = false,
  className,
}: CodeBlockProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState<number | undefined>(undefined);
  const frameRef = useRef(0);
  const copyTimer = useRef(0);

  const sample = samples[Math.min(active, samples.length - 1)];
  const lineCount = sample.code.split("\n").length;

  /* Streaming reveal — a fixed budget, so a long payload does not take
     proportionally longer to arrive than a short one. */
  useEffect(() => {
    if (!stream) {
      setRevealed(undefined);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setRevealed(lineCount);
      return;
    }

    setRevealed(0);
    const started = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - started) / STREAM_BUDGET_MS);
      setRevealed(Math.ceil(progress * lineCount));
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameRef.current);
  }, [stream, lineCount, sample.code]);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sample.code);
      setCopied(true);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied; failing silently is better than an
      // error toast for something the visitor can still select by hand.
    }
  }, [sample.code]);

  const streaming = revealed !== undefined && revealed < lineCount;

  return (
    <figure className={cn("code-surface", className)}>
      <div className="code-bar justify-between">
        <div className="flex min-w-0 items-center gap-1">
          {samples.length > 1 ? (
            <div
              role="tablist"
              aria-label="Example language"
              className="flex items-center gap-0.5 rounded-md bg-background/60 p-0.5"
            >
              {samples.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  data-active={index === active}
                  onClick={() => setActive(index)}
                  className="code-tab"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <span className="truncate">{title}</span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {samples.length > 1 && title && (
            <span className="hidden truncate md:inline">{title}</span>
          )}
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-ok" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      <pre className="code-body">
        <code>
          {highlight(sample.code, sample.language, revealed)}
          {streaming && (
            <span
              aria-hidden
              className="caret ml-0.5 inline-block h-3 w-[7px] translate-y-[1px] bg-primary"
            />
          )}
        </code>
      </pre>

      {footer && (
        <figcaption className="border-t border-border/80 px-3 py-1.5 font-mono text-[10px] text-muted-foreground/80">
          {footer}
        </figcaption>
      )}
    </figure>
  );
}

export default CodeBlock;
