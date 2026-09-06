import { NavLink } from "react-router-dom";
import { navigation } from "@/data/docs-nav";
import { cn } from "@/lib/utils";

/**
 * The reference's contents.
 *
 * `NavLink` sets `aria-current="page"` on the match, which is both the
 * accessible signal and the styling hook — the active rail in `index.css`
 * hangs off that attribute rather than a duplicated class.
 */
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Reference" className="px-4 pb-16 pt-2">
      {navigation.map((group) => (
        <div key={group.label}>
          <p className="nav-group-label">{group.label}</p>
          <ul className="space-y-px">
            {group.items.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  onClick={onNavigate}
                  className="nav-link"
                >
                  {item.method && (
                    <span
                      className={cn(
                        "method",
                        item.method === "GET" ? "method-get" : "method-post",
                      )}
                    >
                      {item.method}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  {item.meta && (
                    <span className="shrink-0 font-mono text-[10px] text-muted-foreground/60">
                      {item.meta}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;
