import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/research", label: "Research" },
  { to: "/open-source", label: "Open Source" },
  { to: "/reading", label: "Reading" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
];

export function Nav() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b border-hairline backdrop-blur-md select-none"
      style={{ background: "color-mix(in oklab, var(--background) 72%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="text-mono">harsh.kaushik</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-accent font-medium" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
              className="text-mono text-xs transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/contact"
          className="text-mono rounded-md border border-border-strong px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-elevated"
        >
          Get in touch
        </Link>
      </div>
    </header>
  );
}
