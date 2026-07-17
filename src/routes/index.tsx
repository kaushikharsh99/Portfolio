import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { Reveal } from "@/components/portfolio/Reveal";
import { projectsData } from "@/components/portfolio/projectData";
import { TechChip } from "@/components/portfolio/Projects";
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

  const turboLLM = projectsData.find((p) => p.id === "turbollm")!;
  const tinyStories = projectsData.find((p) => p.id === "tinystories-17m")!;

  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <Hero />
      <div className="divider-x" />

      {/* Featured system — TurboLLM */}
      <section className="py-28 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 01 — Featured system
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Running 35B MoE models on a 6&nbsp;GB laptop GPU
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            onClick={() => setActiveProjectId(turboLLM.id)}
            className="group mt-12 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-0 overflow-hidden card-panel card-panel-hover hover:border-accent/30 hover:shadow-elevated cursor-pointer"
          >
            <div className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="chip">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    Ongoing
                  </span>
                  <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                    Featured
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl group-hover:text-accent transition-colors">
                  {turboLLM.name}
                </h3>
                <p className="text-mono mt-2 text-sm text-muted-foreground">{turboLLM.tagline}</p>
                <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
                  Turbo-LLM streams expert weights across SSD → RAM → VRAM with double-buffered
                  pipelines to execute Mixture-of-Experts models 21× faster than the naive baseline.
                </p>
              </div>
              <div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {turboLLM.stack.slice(0, 5).map((s) => (
                    <TechChip key={s} tech={s} />
                  ))}
                </div>
                <div className="mt-10 inline-flex items-center gap-2 text-mono text-sm text-accent">
                  Read case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>

            {/* Terminal preview */}
            <div
              className="relative min-h-[340px] border-t border-hairline lg:border-l lg:border-t-0"
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
                    turbollm · bench.log
                  </span>
                </div>
                <pre className="text-mono mt-5 overflow-hidden text-[11px] sm:text-[12px] leading-6 text-muted-foreground whitespace-pre-wrap">
                  {turboLLM.terminalLog}
                </pre>
                <div className="mt-6 flex items-center gap-2 text-mono text-[11px] text-subtle">
                  <span
                    className="inline-block h-1.5 w-1.5 animate-cursor rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  live · nightly benchmarks
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {turboLLM.metrics.slice(0, 4).map((m) => (
                    <div key={m.label} className="rounded-md border border-hairline p-3">
                      <div className="text-mono text-base text-foreground">{m.value}</div>
                      <div className="text-mono mt-1 text-[10px] uppercase tracking-wider text-subtle">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="divider-x" />

      {/* Featured model — TinyStories-17M */}
      <section className="py-28 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 02 — Featured model
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            A 17.2M parameter decoder trained end-to-end from scratch
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            onClick={() => setActiveProjectId(tinyStories.id)}
            className="group mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-0 overflow-hidden card-panel card-panel-hover hover:border-accent/30 hover:shadow-elevated cursor-pointer"
          >
            {/* Architecture stack diagram */}
            <div
              className="relative min-h-[340px] border-b border-hairline lg:border-r lg:border-b-0 p-8 sm:p-10 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(500px 240px at 30% 30%, color-mix(in oklab, var(--accent-violet) 10%, transparent), transparent 60%)",
              }}
            >
              <ArchStackDiagram />
            </div>

            <div className="p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="chip">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "oklch(0.75 0.15 150)" }}
                    />
                    Completed
                  </span>
                  <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                    Pretraining
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl group-hover:text-accent transition-colors">
                  {tinyStories.name}
                </h3>
                <p className="text-mono mt-2 text-sm text-muted-foreground">
                  {tinyStories.tagline}
                </p>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Custom decoder with RoPE, RMSNorm and SwiGLU, trained on 2.1M synthetic stories
                  with a hand-written SentencePiece BPE tokenizer and BF16 mixed precision.
                </p>
              </div>
              <div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {tinyStories.stack.slice(0, 5).map((s) => (
                    <TechChip key={s} tech={s} />
                  ))}
                </div>
                <div className="mt-10 inline-flex items-center gap-2 text-mono text-sm text-accent">
                  Read case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
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

      {/* Technical Expertise */}
      <Expertise />

      <div className="divider-x" />

      {/* Currently researching */}
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

      {/* Recent open source */}
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

      {/* CTA */}
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

function ArchStackDiagram() {
  const layers = [
    { label: "LM head", accent: false },
    { label: "RMSNorm", accent: false },
    { label: "SwiGLU MLP", accent: true },
    { label: "Causal attention · RoPE", accent: true },
    { label: "RMSNorm", accent: false },
    { label: "Token embedding (tied)", accent: false },
  ];
  return (
    <div className="w-full max-w-[280px]">
      <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle text-center mb-4">
        Decoder block · ×8
      </div>
      <div className="flex flex-col gap-1.5">
        {layers.map((l, i) => (
          <div
            key={i}
            className={`rounded-md border px-3 py-2.5 text-mono text-[11px] text-center transition-colors ${
              l.accent
                ? "border-accent/30 bg-accent/5 text-foreground"
                : "border-hairline bg-surface-2/40 text-muted-foreground"
            }`}
          >
            {l.label}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-mono text-[10px] text-subtle">
        <span>d_model 384</span>
        <span>heads 6</span>
        <span>ctx 512</span>
      </div>
    </div>
  );
}
