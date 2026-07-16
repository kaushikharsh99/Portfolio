const links = [
  { href: "#research-statement", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#open-source", label: "Open Source" },
  { href: "#timeline", label: "Timeline" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline backdrop-blur-md"
      style={{ background: "color-mix(in oklab, var(--background) 70%, transparent)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="text-mono">harsh.kaushik</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-mono rounded-md border border-border-strong px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-elevated"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
