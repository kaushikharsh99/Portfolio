import * as React from "react";
import { Reveal } from "./Reveal";
import { projectsData, ProjectDetail } from "./projectData";
import { ProjectExpanded } from "./ProjectExpanded";
import { Cpu, Terminal, Settings } from "lucide-react";
import { HuggingFaceIcon } from "./Contact";

export function PythonIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M14.25.18a8.8 8.8 0 0 0-4.3 1.12C7.3 2.92 7.42 4.45 7.42 4.45h2.95v.42H6.04a2.92 2.92 0 0 0-2.92 2.92v2.5a2.92 2.92 0 0 0 2.92 2.92h1.25V11.5a3.33 3.33 0 0 1 3.33-3.33h4.58a3.33 3.33 0 0 0 3.33-3.33V1.26a1.1 1.1 0 0 0-1.1-1.08zM11.5 1.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM9.75 23.82a8.8 8.8 0 0 0 4.3-1.12c2.65-1.62 2.53-3.15 2.53-3.15h-2.95v-.42h4.33a2.92 2.92 0 0 0 2.92-2.92v-2.5a2.92 2.92 0 0 0-2.92-2.92h-1.25v1.67a3.33 3.33 0 0 1-3.33 3.33H8.75a3.33 3.33 0 0 0-3.33 3.33v3.58a1.1 1.1 0 0 0 1.1 1.08zm1.25-1.52a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2z"/>
    </svg>
  );
}

export function PyTorchIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L1.6 6.02v11.96L12 24l10.4-6.02V6.02L12 0zm0 18.25c-3.45 0-6.25-2.8-6.25-6.25S8.55 5.75 12 5.75s6.25 2.8 6.25 6.25-2.8 6.25-6.25 6.25z"/>
    </svg>
  );
}

export function TechChip({ tech, className = "" }: { tech: string; className?: string }) {
  const t = tech.toLowerCase();
  
  if (t === "python") {
    return (
      <span className={`chip flex items-center gap-1.5 ${className}`}>
        <PythonIcon className="h-3 w-3 shrink-0 text-accent" />
        <span>{tech}</span>
      </span>
    );
  }
  if (t === "pytorch") {
    return (
      <span className={`chip flex items-center gap-1.5 ${className}`}>
        <PyTorchIcon className="h-3 w-3 shrink-0 text-destructive/80" />
        <span>{tech}</span>
      </span>
    );
  }
  if (t === "hugging face") {
    return (
      <span className={`chip flex items-center gap-1.5 ${className}`}>
        <HuggingFaceIcon className="h-3 w-3 shrink-0 text-accent" />
        <span>{tech}</span>
      </span>
    );
  }
  if (t === "cuda" || t === "c++") {
    return (
      <span className={`chip flex items-center gap-1.5 ${className}`}>
        <Cpu className="h-3 w-3 shrink-0 text-accent-violet" />
        <span>{tech}</span>
      </span>
    );
  }
  if (t === "transformers" || t === "scikit-learn") {
    return (
      <span className={`chip flex items-center gap-1.5 ${className}`}>
        <Cpu className="h-3 w-3 shrink-0 text-muted-foreground" />
        <span>{tech}</span>
      </span>
    );
  }
  if (t === "gguf") {
    return (
      <span className={`chip flex items-center gap-1.5 ${className}`}>
        <Terminal className="h-3 w-3 shrink-0 text-accent" />
        <span>{tech}</span>
      </span>
    );
  }
  return (
    <span className={`chip ${className}`}>
      {tech}
    </span>
  );
}

function StatusBadge({ status }: { status: ProjectDetail["status"] }) {
  const dot =
    status === "Ongoing"
      ? "var(--accent)"
      : status === "Research"
        ? "var(--accent-violet)"
        : "oklch(0.75 0.15 150)";
  return (
    <span className="chip">
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {status}
    </span>
  );
}

export function Projects() {
  const [activeProjectId, setActiveProjectId] = React.useState<string | null>(null);

  const activeProject = React.useMemo(() => {
    return projectsData.find((p) => p.id === activeProjectId) || null;
  }, [activeProjectId]);

  const handleNext = React.useCallback(() => {
    if (!activeProjectId) return;
    const index = projectsData.findIndex((p) => p.id === activeProjectId);
    const nextIndex = (index + 1) % projectsData.length;
    setActiveProjectId(projectsData[nextIndex].id);
  }, [activeProjectId]);

  const handlePrev = React.useCallback(() => {
    if (!activeProjectId) return;
    const index = projectsData.findIndex((p) => p.id === activeProjectId);
    const prevIndex = (index - 1 + projectsData.length) % projectsData.length;
    setActiveProjectId(projectsData[prevIndex].id);
  }, [activeProjectId]);

  const [featured, ...rest] = projectsData;

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
                § 02 — Featured work
              </div>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
                Selected projects
              </h2>
            </div>
            <div className="hidden text-mono text-xs text-subtle sm:block">
              {projectsData.length} entries
            </div>
          </div>
        </Reveal>

        {/* Featured card */}
        <Reveal delay={80}>
          <article 
            onClick={() => setActiveProjectId(featured.id)}
            className="group card-panel card-panel-hover mt-12 grid grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[1.15fr_1fr] cursor-pointer hover:border-accent/30 hover:shadow-elevated"
          >
            <div className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={featured.status} />
                  <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                    Featured
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl text-foreground group-hover:text-accent transition-colors">
                  {featured.name}
                </h3>
                <p className="text-mono mt-2 text-sm text-muted-foreground">
                  {featured.tagline}
                </p>
                <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>

                <ul className="mt-8 space-y-2 text-sm">
                  {featured.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-foreground/90">
                      <span className="text-mono mt-[2px] text-xs text-subtle">›</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {featured.stack.map((s) => (
                    <TechChip key={s} tech={s} />
                  ))}
                </div>

                <div className="mt-10">
                  <span className="group inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 text-sm text-foreground transition-colors hover:bg-elevated">
                    Read Case Study
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Terminal / benchmark preview */}
            <div
              className="relative min-h-[320px] border-t border-hairline lg:border-l lg:border-t-0"
              style={{
                background:
                  "radial-gradient(600px 300px at 80% 10%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%), color-mix(in oklab, var(--surface-2) 90%, transparent)",
              }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-elevated" />
                  <span className="h-2.5 w-2.5 rounded-full bg-elevated" />
                  <span className="h-2.5 w-2.5 rounded-full bg-elevated" />
                  <span className="text-mono ml-3 text-[11px] text-subtle">
                    {featured.id} · bench.log
                  </span>
                </div>
                {featured.terminalLog && (
                  <pre className="text-mono mt-5 overflow-hidden text-[11px] sm:text-[12px] leading-6 text-muted-foreground">
                    {featured.terminalLog}
                  </pre>
                )}
                <div className="mt-6 flex items-center gap-2 text-mono text-[11px] text-subtle">
                  <span className="inline-block h-1.5 w-1.5 animate-cursor rounded-full" style={{ background: "var(--accent)" }} />
                  live · updated nightly
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Secondary grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <article 
                onClick={() => setActiveProjectId(p.id)}
                className="group card-panel card-panel-hover h-full p-7 cursor-pointer hover:border-accent/30 hover:shadow-elevated flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <StatusBadge status={p.status} />
                    <span className="text-mono text-[11px] text-subtle">
                      0{i + 2}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-mono mt-1 text-xs text-muted-foreground">
                    {p.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <ul className="mt-5 space-y-1.5 text-sm">
                    {p.achievements.map((a) => (
                      <li key={a} className="flex gap-2 text-foreground/85">
                        <span className="text-mono mt-[2px] text-[11px] text-subtle">›</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <TechChip key={s} tech={s} />
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 text-mono text-xs">
                    <span className="text-muted-foreground group-hover:text-accent transition-colors flex items-center gap-1">
                      Read Case Study ↗
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Case Study Fullscreen Modal overlay */}
      {activeProject && (
        <ProjectExpanded
          project={activeProject}
          onClose={() => setActiveProjectId(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
}
