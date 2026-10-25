import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * The contact form's EmailJS ids are baked in at build time. A production
 * build without them still succeeds — and ships a form that cannot send — so
 * say so loudly in the build log (Vercel shows it on the deployment).
 */
function warnOnMissingMailConfig(mode: string): Plugin {
  const keys = ["VITE_EMAILJS_SERVICE_ID", "VITE_EMAILJS_TEMPLATE_ID", "VITE_EMAILJS_PUBLIC_KEY"];
  return {
    name: "warn-on-missing-mail-config",
    apply: "build",
    buildStart() {
      const env = loadEnv(mode, process.cwd(), "VITE_");
      const missing = keys.filter((key) => !env[key]?.trim());
      if (missing.length > 0) {
        this.warn(
          `Contact form will not send: ${missing.join(", ")} not set. ` +
            "Add them in Vercel → Settings → Environment Variables and redeploy.",
        );
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Dev-only plugin. Imported lazily so a production build never requires
  // this devDependency (Vercel builds with NODE_ENV=production).
  const devPlugins =
    mode === "development" ? [(await import("lovable-tagger")).componentTagger()] : [];

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), warnOnMissingMailConfig(mode), ...devPlugins],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Increase the warning limit to 800kB to reduce noise in the build output
      chunkSizeWarningLimit: 800,

      rollupOptions: {
        output: {
          // Configure manual chunks to better split the code
          manualChunks: {
            // Group React and related packages
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            // Group UI-related libraries
            "vendor-ui": [
              "@radix-ui/react-tooltip",
              "clsx",
              "tailwind-merge",
              "tailwindcss-animate",
            ],
            // Group animation libraries
            "vendor-animation": ["framer-motion", "lucide-react"],
          },
        },
      },
    },
  };
});
