import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/portfolio/Reveal";
import { projectsData, type ProjectDetail } from "@/components/portfolio/projectData";
import { TechChip } from "@/components/portfolio/Projects";
import { HuggingFaceIcon } from "@/components/portfolio/Contact";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  BookOpen,
  Cpu,
  Layers,
  AlertTriangle,
  Lightbulb,
  Compass,
  Sparkles,
} from "lucide-react";
import { ProjectVisuals } from "@/components/portfolio/ProjectVisuals";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projectsData.find((p) => p.id === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Harsh Kaushik" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.name} — Harsh Kaushik` },
        { name: "description", content: project.tagline },
        { property: "og:title", content: `${project.name} — Case study` },
        { property: "og:description", content: project.tagline },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: CaseStudy,
});

function ProjectNotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block text-accent text-mono text-sm">
          ← Back to projects
        </Link>
      </div>
    </main>
  );
}

const accentFor: Record<string, string> = {
  turbollm: "var(--accent)",
  "tinystories-17m": "var(--accent-violet)",
  "indian-legal-llm": "oklch(0.72 0.14 65)",
  "mathinstruct-v1": "oklch(0.72 0.14 165)",
  "spam-detection": "oklch(0.68 0.16 25)",
};

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const accent = accentFor[project.id] ?? "var(--accent)";
  const idx = projectsData.findIndex((p) => p.id === project.id);
  const prev = projectsData[(idx - 1 + projectsData.length) % projectsData.length];
  const next = projectsData[(idx + 1) % projectsData.length];

  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      {/* Back link */}
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: accent }}
            />
            <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              {project.status}
            </span>
            <span className="h-px w-8 bg-hairline" />
            <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
              Case study 0{idx + 1}
            </span>
          </div>
          <h1
            className="mt-6 text-4xl sm:text-6xl font-medium leading-[1.02] tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            {project.name}
          </h1>
          <p className="text-mono mt-4 text-base text-muted-foreground max-w-3xl">
            {project.tagline}
          </p>
          <p className="mt-8 max-w-3xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <TechChip key={s} tech={s} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 text-sm text-foreground hover:bg-elevated transition-colors"
              >
                <Github className="h-4 w-4" /> Repository
              </a>
            )}
            {project.huggingfaceUrl && (
              <a
                href={project.huggingfaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 text-sm text-foreground hover:bg-elevated transition-colors"
              >
                <HuggingFaceIcon className="h-4 w-4 text-accent" /> Hugging Face
              </a>
            )}
          </div>
        </Reveal>

        {/* Metrics strip */}
        <Reveal delay={80}>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-0 border border-hairline rounded-lg overflow-hidden">
            {project.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`p-5 sm:p-6 ${i > 0 ? "border-l border-hairline" : ""}`}
                style={{
                  background: `radial-gradient(300px 120px at 50% -20%, color-mix(in oklab, ${accent} 8%, transparent), transparent 60%)`,
                }}
              >
                <div className="text-mono text-xl sm:text-2xl text-foreground">{m.value}</div>
                <div className="text-mono mt-1 text-[10px] uppercase tracking-wider text-subtle">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="divider-x my-24" />

      {/* Motivation + Problem */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal>
            <SectionLabel accent={accent}>Motivation</SectionLabel>
            <p className="mt-6 text-muted-foreground leading-relaxed">{project.motivation}</p>
          </Reveal>
          <Reveal delay={80}>
            <SectionLabel accent={accent}>Problem statement</SectionLabel>
            <p className="mt-6 text-muted-foreground leading-relaxed">{project.problemStatement}</p>
          </Reveal>
        </div>
      </section>

      <div className="divider-x my-24" />

      {/* Architecture + bespoke visual */}
      <section className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel accent={accent}>Architecture</SectionLabel>
          <h2 className="mt-4 text-2xl sm:text-3xl font-medium tracking-tight max-w-3xl">
            How the system is put together
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
            {project.architectureDesc}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12">
            <ProjectVisuals project={project} accent={accent} />
          </div>
        </Reveal>
      </section>

      <div className="divider-x my-24" />

      {/* Implementation / key features */}
      <section className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel accent={accent}>Implementation</SectionLabel>
          <h2 className="mt-4 text-2xl sm:text-3xl font-medium tracking-tight">
            Engineering decisions
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.keyFeatures.map((f, i) => (
            <Reveal key={f} delay={i * 40}>
              <div className="p-5 rounded-lg border border-hairline bg-surface-2/20 flex gap-3">
                <span
                  className="text-mono text-xs mt-0.5"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{f}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {project.trainingConfig && (
          <Reveal delay={80}>
            <div className="mt-10 rounded-lg border border-hairline overflow-hidden">
              <div className="px-5 py-3 border-b border-hairline bg-surface-2/40">
                <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  Training configuration
                </span>
              </div>
              <div className="divide-y divide-hairline">
                {project.trainingConfig.map((c) => (
                  <div key={c.label} className="grid grid-cols-1 sm:grid-cols-[220px_1fr] px-5 py-3">
                    <span className="text-mono text-[11px] uppercase tracking-wider text-subtle">
                      {c.label}
                    </span>
                    <span className="text-sm text-foreground text-mono">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </section>

      <div className="divider-x my-24" />

      {/* Challenges / solutions */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="p-8 rounded-lg border border-hairline bg-surface-2/20 h-full">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive/80" />
                <SectionLabel accent="var(--destructive)">Challenge</SectionLabel>
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">{project.challenges}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div
              className="p-8 rounded-lg border h-full"
              style={{ borderColor: accent, background: `color-mix(in oklab, ${accent} 6%, transparent)` }}
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" style={{ color: accent }} />
                <SectionLabel accent={accent}>Solution</SectionLabel>
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">{project.solutions}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lessons if present */}
      {project.lessons && (
        <>
          <div className="divider-x my-24" />
          <section className="mx-auto max-w-6xl px-6">
            <Reveal>
              <SectionLabel accent={accent}>Lessons learned</SectionLabel>
              <h2 className="mt-4 text-2xl sm:text-3xl font-medium tracking-tight">
                What the process taught me
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.lessons.map((l, i) => (
                <Reveal key={l.title} delay={i * 60}>
                  <div className="p-6 rounded-lg border border-hairline bg-surface-2/15 h-full">
                    <div className="flex items-center gap-2 text-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
                      <Sparkles className="h-3 w-3" /> Lesson {i + 1}
                    </div>
                    <h4 className="mt-4 text-base font-medium text-foreground">{l.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.content}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Limitations */}
      {project.limitations && (
        <>
          <div className="divider-x my-24" />
          <section className="mx-auto max-w-6xl px-6">
            <Reveal>
              <SectionLabel accent={accent}>Limitations</SectionLabel>
              <h2 className="mt-4 text-2xl sm:text-3xl font-medium tracking-tight">
                What this project does not do
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-3 max-w-3xl">
              {project.limitations.map((l, i) => (
                <Reveal key={l} delay={i * 30}>
                  <li className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-mono text-xs mt-1 shrink-0" style={{ color: accent }}>
                      —
                    </span>
                    <span>{l}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        </>
      )}

      <div className="divider-x my-24" />

      {/* Future work + Inspirations */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
          <Reveal>
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-accent" />
              <SectionLabel accent={accent}>Future work</SectionLabel>
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">{project.futureWork}</p>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              <SectionLabel accent={accent}>Related work</SectionLabel>
            </div>
            <ul className="mt-6 space-y-3">
              {project.inspirations.map((s) => (
                <li key={s.title}>
                  {s.link ? (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-mono mt-0.5" style={{ color: accent }}>↗</span>
                      <span className="underline decoration-hairline decoration-1 underline-offset-4 group-hover:decoration-accent">
                        {s.title}
                      </span>
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{s.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="divider-x my-24" />

      {/* Prev / next */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/projects/$slug"
            params={{ slug: prev.id }}
            className="group card-panel card-panel-hover p-6 hover:border-accent/30"
          >
            <div className="text-mono text-[10px] uppercase tracking-wider text-subtle">
              ← Previous case study
            </div>
            <div className="mt-3 text-lg font-medium text-foreground group-hover:text-accent transition-colors">
              {prev.name}
            </div>
            <div className="text-mono mt-1 text-xs text-muted-foreground">{prev.tagline}</div>
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: next.id }}
            className="group card-panel card-panel-hover p-6 hover:border-accent/30 text-right"
          >
            <div className="text-mono text-[10px] uppercase tracking-wider text-subtle">
              Next case study →
            </div>
            <div className="mt-3 text-lg font-medium text-foreground group-hover:text-accent transition-colors">
              {next.name}
            </div>
            <div className="text-mono mt-1 text-xs text-muted-foreground">{next.tagline}</div>
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionLabel({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <span
      className="text-mono text-[11px] uppercase tracking-[0.22em]"
      style={{ color: accent }}
    >
      {children}
    </span>
  );
}
