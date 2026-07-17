import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { Reveal } from "@/components/portfolio/Reveal";
import { projectsData } from "@/components/portfolio/projectData";
import { TechChip, StatusBadge } from "@/components/portfolio/Projects";
import { Cpu, Zap, Brain, ArrowRight } from "lucide-react";
import { Expertise } from "@/components/portfolio/Expertise";
import { ProjectExpanded } from "@/components/portfolio/ProjectExpanded";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harsh Kaushik — AI Systems & LLM Research" },
      {
        name: "description",
        content:
          "Personal website of Harsh Kaushik — AI systems engineer studying transformers, training language models from scratch, and optimizing inference runtimes.",
      },
    ],
  }),
  component: Index,
});

const accentFor: Record<string, string> = {
  turbollm: "var(--accent)",
  "tinystories-17m": "var(--accent-violet)",
  "indian-legal-llm": "oklch(0.7 0.14 65)",
  "mathinstruct-v1": "oklch(0.72 0.14 165)",
  "spam-detection": "oklch(0.68 0.16 25)",
};

function Index() {
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
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <Hero />
      <div className="divider-x" />

      {/* 1. FEATURED PROJECTS GRID */}
      <section className="py-24 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 01 — Featured Projects
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
            Selected Systems & Models
          </h2>
        </Reveal>

        {/* 2-Column Grid for 4 projects */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.slice(0, 4).map((p, i) => {
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
                    <div className="mt-6 grid grid-cols-2 gap-2">
                      {p.metrics.slice(0, 2).map((m) => (
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

        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            All five projects
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <div className="divider-x" />

      {/* 2. TECHNICAL EXPERTISE */}
      <Expertise />

      <div className="divider-x" />

      {/* 3. CURRENTLY RESEARCHING */}
      <section className="py-28 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          <Reveal>
            <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
              § 04 — Currently researching
            </div>
            <h3 className="mt-4 text-2xl font-medium tracking-tight">Open questions</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Problems I return to weekly — an evolving intersection of systems and post-training.
            </p>
            <Link
              to="/research"
              className="mt-6 inline-flex items-center gap-2 text-mono text-xs text-accent"
            >
              Full research page <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Efficient MoE inference",
                  icon: Zap,
                  body: "SSD → RAM → VRAM expert offloading with double-buffered scheduling and warm-cache routing bias.",
                },
                {
                  title: "Training small LMs",
                  icon: Brain,
                  body: "Data-density scaling for models under 100M parameters — how far can curated synthetic data go.",
                },
                {
                  title: "Grounded SFT",
                  icon: Cpu,
                  body: "Provision-summary formats that stop compact SFT models from hallucinating source-adjacent facts.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 border border-border bg-surface-2/15 rounded-lg space-y-3"
                >
                  <item.icon className="h-5 w-5 text-accent" />
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider-x" />

      {/* 4. RECENT OPEN SOURCE */}
      <section className="py-28 mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-10">
          <Reveal>
            <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
              § 05 — Recent open source
            </div>
            <h3 className="mt-4 text-2xl font-medium tracking-tight">Published artifacts</h3>
          </Reveal>
          <Link
            to="/open-source"
            className="text-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            All artifacts ↗
          </Link>
        </div>
        <Reveal delay={80}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                kind: "Model",
                name: "TinyStories-17M",
                meta: "17.2M · BF16 · custom decoder",
                href: "https://huggingface.co/kaushik-harsh-99",
              },
              {
                kind: "Dataset",
                name: "Indian-legal-data-v3",
                meta: "194K instructions · IPC · Parquet",
                href: "https://huggingface.co/datasets/kaushik-harsh-99/Indian-legal-data-v3",
              },
              {
                kind: "Repo",
                name: "Turbo-LLM",
                meta: "Python · SSD→RAM→VRAM offloading",
                href: "https://github.com/kaushikharsh99/Turbo-LLM",
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-panel card-panel-hover p-5 hover:border-accent/30 block"
              >
                <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  {item.kind}
                </div>
                <div className="mt-3 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {item.name}
                </div>
                <div className="text-mono mt-1 text-[11px] text-subtle">{item.meta}</div>
                <div className="mt-6 text-mono text-[11px] text-muted-foreground">Open ↗</div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="divider-x" />

      {/* 5. CONTACT */}
      <section className="py-28 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
              § 06 — Contact
            </div>
            <h3 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">
              Open to research collaborations, residencies, and internships in LLM systems and
              foundation models.
            </h3>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-95 transition-opacity"
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-2.5 text-sm text-foreground hover:bg-elevated transition-colors"
              >
                Read resume
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {activeProject && (
        <ProjectExpanded
          project={activeProject}
          onClose={() => setActiveProjectId(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </main>
  );
}
