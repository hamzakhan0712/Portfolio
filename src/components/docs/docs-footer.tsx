import { Link } from "react-router-dom";
import { Mail, Linkedin, FileText } from "lucide-react";

/**
 * The foot of every page. Deliberately small: in a reference the sidebar is
 * the navigation, so a second full link farm down here would only repeat it.
 */
export function DocsFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-muted-foreground">
          © {year} Hamza Khan · Backend developer, Mumbai
        </p>

        <div className="flex items-center gap-1">
          <a
            href="mailto:hamza81khan81@gmail.com"
            aria-label="Email"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/hamza-khan-3a2b0024a/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="/documents/Hamza_Khan_CV.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Curriculum vitae"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
          </a>
        </div>
      </div>

      <p className="mt-4 font-mono text-[10.5px] leading-relaxed text-muted-foreground/70">
        Laid out as an API reference because that is the artefact the work
        produces. The payloads are real; the transport is not — see{" "}
        <Link to="/authentication" className="underline underline-offset-2">
          Authentication
        </Link>
        .
      </p>
    </footer>
  );
}

export default DocsFooter;
