import * as React from "react";
import { Reveal } from "./Reveal";
import { projectsData, ProjectDetail } from "./projectData";
import { ProjectExpanded } from "./ProjectExpanded";
import { Cpu, Terminal, Settings, ArrowRight } from "lucide-react";
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

export function StatusBadge({ status }: { status: ProjectDetail["status"] }) {
  const dot =
    status === "Ongoing"
      ? "var(--accent)"
      : status === "Research"
        ? "var(--accent-violet)"
        : "oklch(0.75 0.15 150)";
  return (
    <span className="chip font-mono text-[9px] uppercase tracking-wider">
      <span className="inline-block h-1.5 w-1.5 rounded-full mr-1.5" style={{ background: dot }} />
      {status}
    </span>
  );
}

const accentFor: Record<string, string> = {
  turbollm: "var(--accent)",
  "tinystories-17m": "var(--accent-violet)",
  "indian-legal-llm": "oklch(0.7 0.14 65)",
  "mathinstruct-v1": "oklch(0.72 0.14 165)",
  "spam-detection": "oklch(0.68 0.16 25)",
};

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

  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
                § 02 — Case Studies
              </div>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
                Selected Projects
              </h2>
            </div>
            <div className="hidden text-mono text-xs text-subtle sm:block">
              {projectsData.length} entries
            </div>
          </div>
        </Reveal>

        {/* 2-Column Grid for all 5 projects */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((p, i) => {
            const accent = accentFor[p.id] || "var(--accent)";
            return (
              <Reveal key={p.id} delay={i * 60}>
                <article
                  onClick={() => setActiveProjectId(p.id)}
                  className="group card-panel card-panel-hover h-full p-8 cursor-pointer hover:border-accent/30 hover:shadow-elevated flex flex-col justify-between"
                  style={{
                    background: `radial-gradient(350px 180px at 90% 10%, color-mix(in oklab, ${accent} 7%, transparent), transparent 60%), color-mix(in oklab, var(--surface-2) 90%, transparent)`
                  }}
                >
                  <div>
                    {/* Header: Number in Accent color + Status Badge */}
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-mono text-xs font-bold tracking-wider"
                        style={{ color: accent }}
                      >
                        0{i + 1}
                      </span>
                      <StatusBadge status={p.status} />
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-mono mt-1 text-xs text-muted-foreground">
                      {p.tagline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>

                    {/* Key Metrics inside card */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {p.metrics.slice(0, 4).map((m) => (
                        <div key={m.label} className="p-3.5 rounded border border-hairline/80 bg-background/30">
                          <div className="text-mono text-sm font-semibold text-foreground">{m.value}</div>
                          <div className="text-mono text-[9px] text-subtle uppercase tracking-wider mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((s) => (
                        <TechChip key={s} tech={s} className="text-[10px]" />
                      ))}
                    </div>

                    {/* Action trigger */}
                    <div className="mt-6 flex items-center gap-2 text-mono text-xs text-accent">
                      Read Case Study
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
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
