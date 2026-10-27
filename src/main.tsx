import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

/* Microsoft Clarity (free heatmaps and session recordings), only when a
   project id is set in VITE_CLARITY_ID. Loaded after the page is up, so it
   never slows the first paint. */
const clarity = import.meta.env.VITE_CLARITY_ID?.trim();
if (clarity && /^[a-z0-9]+$/i.test(clarity)) {
  window.addEventListener("load", () => {
    const w = window as unknown as { clarity?: { q?: unknown[] } & ((...args: unknown[]) => void) };
    w.clarity =
      w.clarity ||
      Object.assign((...args: unknown[]) => (w.clarity!.q = w.clarity!.q || []).push(args), { q: [] });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarity}`;
    document.head.appendChild(script);
  });
}
