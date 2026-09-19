import { useEffect } from "react";

/** Sets the browser tab title for the page it is called from. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    document.title = `${title} · Hamza Khan`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
