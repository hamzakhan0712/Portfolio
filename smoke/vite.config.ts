import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Config for the render smoke test only.
 *
 * The app config's `manualChunks` cannot apply to an SSR build — React is
 * external there, and Rollup refuses to chunk an external module. Everything
 * else (the `@` alias, the SWC transform) has to match, so it is repeated
 * rather than imported.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "../src") },
  },
  logLevel: "warn",
});
