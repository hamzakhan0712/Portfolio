import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Trophy, X, type Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Notifications in the manner of Windows: a card that slides in at the
 * bottom-right, headed by the app it came from, and leaves on its own after
 * a few seconds. Call `notify()` from anywhere; <Notifications /> renders them.
 */

type Kind = "success" | "error" | "achievement";

type Note = { id: number; kind: Kind; title: string; body?: string };

const KINDS: Record<Kind, { icon: Icon; tone: string }> = {
  success: { icon: CheckCircle2, tone: "text-ok" },
  error: { icon: AlertTriangle, tone: "text-warn" },
  achievement: { icon: Trophy, tone: "text-primary" },
};

let listeners: ((note: Note) => void)[] = [];
let nextId = 1;

export function notify(title: string, options: { body?: string; kind?: Kind } = {}) {
  const note = { id: nextId++, kind: options.kind ?? "success", title, body: options.body };
  listeners.forEach((listener) => listener(note));
}

export function Notifications() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const listener = (note: Note) => {
      setNotes((current) => [...current.slice(-2), note]);
      window.setTimeout(() => setNotes((current) => current.filter((n) => n.id !== note.id)), 6000);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-3 right-3 z-[70] flex w-[min(22rem,calc(100vw-1.5rem))] flex-col gap-2"
    >
      <AnimatePresence initial={false}>
        {notes.map((note) => {
          const { icon: KindIcon, tone } = KINDS[note.kind];
          return (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 48, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: [0.1, 0.9, 0.2, 1] }}
              role="status"
              className="glass pointer-events-auto rounded-3xl p-3"
            >
              <div className="flex items-center gap-2 px-1 text-[12px] text-muted-foreground">
                <img src="/photos/avatar.webp" alt="" className="h-4 w-4 rounded-full object-cover" />
                <span className="flex-1">Hamza Khan</span>
                <button
                  type="button"
                  onClick={() => setNotes((current) => current.filter((n) => n.id !== note.id))}
                  aria-label="Dismiss"
                  className="flex h-6 w-6 items-center justify-center rounded hover:bg-secondary"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 flex gap-3 px-1 pb-1">
                <KindIcon className={cn("mt-0.5 h-5 w-5 shrink-0", tone)} />
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-foreground">{note.title}</p>
                  {note.body && (
                    <p className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{note.body}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
