import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/portfolio/Reveal";
import { projectsData, type ProjectDetail } from "@/components/portfolio/projectData";
import { TechChip } from "@/components/portfolio/Projects";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Harsh Kaushik" },
      {
        name: "description",
        content:
          "Five research and systems projects on LLM inference, small-model pretraining, SFT alignment, mathematical reasoning, and knowledge distillation.",
      },
    ],
  }),
  component: ProjectsIndex,
});

const accentFor: Record<string, string> = {
  turbollm: "var(--accent)",
  "tinystories-17m": "var(--accent-violet)",
  "indian-legal-llm": "oklch(0.7 0.14 65)",
  "mathinstruct-v1": "oklch(0.72 0.14 165)",
  "spam-detection": "oklch(0.68 0.16 25)",
};

function ProjectsIndex() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <section className="pt-24 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § — Case studies
          </div>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
            Systems, models, and post-training experiments
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            Five projects that span the full stack of modern language models — from hierarchical
            memory schedulers for MoE inference to pretraining a decoder from scratch, aligning
            compact models on legal reasoning, mathematical SFT, and teacher–student distillation.
          </p>
        </Reveal>

        <div className="mt-14 space-y-6">
          {projectsData.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProjectRow project={p} index={i} accent={accentFor[p.id]} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProjectRow({
  project,
  index,
  accent,
}: {
  project: ProjectDetail;
  index: number;
  accent: string;
}) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.id }}
      className="group card-panel card-panel-hover block overflow-hidden hover:border-accent/30 hover:shadow-elevated"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <span
              className="text-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              0{index + 1}
            </span>
            <span className="h-px w-8 bg-hairline" />
            <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              {project.status}
            </span>
          </div>
          <h2 className="mt-5 text-2xl sm:text-3xl font-medium tracking-tight group-hover:text-accent transition-colors">
            {project.name}
          </h2>
          <p className="text-mono mt-1 text-sm text-muted-foreground">{project.tagline}</p>
          <p className="mt-5 max-w-2xl text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <TechChip key={s} tech={s} />
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-mono text-sm text-accent">
            Read case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Metric strip */}
        <div
          className="grid grid-cols-2 lg:grid-cols-1 border-t border-hairline lg:border-t-0 lg:border-l"
          style={{
            background: `radial-gradient(400px 200px at 90% 0%, color-mix(in oklab, ${accent} 10%, transparent), transparent 60%)`,
          }}
        >
          {project.metrics.slice(0, 4).map((m, i) => (
            <div
              key={m.label}
              className={`p-4 sm:p-5 ${i > 0 ? "border-l lg:border-l-0 lg:border-t border-hairline" : ""}`}
            >
              <div className="text-mono text-lg text-foreground">{m.value}</div>
              <div className="text-mono mt-1 text-[10px] uppercase tracking-wider text-subtle">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
