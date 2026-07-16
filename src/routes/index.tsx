import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { Reveal } from "@/components/portfolio/Reveal";
import { projectsData } from "@/components/portfolio/projectData";
import { ProjectExpanded } from "@/components/portfolio/ProjectExpanded";
import { TechChip } from "@/components/portfolio/Projects";
import { Cpu, Zap, Brain, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
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
      {/* 1. HERO SECTION */}
      <Hero />
      <div className="divider-x" />

      {/* 2. FEATURED RESEARCH & SYSTEM SHOWCASE */}
      <section className="py-24 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 01 — Featured Work
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
            Selected System & Model
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Featured Project: TurboLLM */}
          <Reveal delay={60}>
            <div 
              onClick={() => setActiveProjectId(turboLLM.id)}
              className="group card-panel card-panel-hover p-8 cursor-pointer flex flex-col justify-between h-full hover:border-accent/30"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="chip text-[10px]">Featured System</span>
                  <span className="text-mono text-[9px] uppercase tracking-wider text-subtle">Ongoing</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors mt-6">
                  {turboLLM.name}
                </h3>
                <p className="text-mono text-xs text-muted-foreground mt-1">
                  {turboLLM.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  {turboLLM.description}
                </p>
              </div>

              <div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {turboLLM.stack.slice(0, 3).map((s) => (
                    <TechChip key={s} tech={s} className="text-[10px]" />
                  ))}
                </div>
                <button className="group mt-8 inline-flex items-center gap-2 text-xs font-mono text-accent">
                  Read Technical Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Featured Model: TinyStories-17M */}
          <Reveal delay={120}>
            <div 
              onClick={() => setActiveProjectId(tinyStories.id)}
              className="group card-panel card-panel-hover p-8 cursor-pointer flex flex-col justify-between h-full hover:border-accent/30"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="chip text-[10px]">Featured Model</span>
                  <span className="text-mono text-[9px] uppercase tracking-wider text-subtle">Pretraining</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors mt-6">
                  {tinyStories.name}
                </h3>
                <p className="text-mono text-xs text-muted-foreground mt-1">
                  {tinyStories.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  {tinyStories.description}
                </p>
              </div>

              <div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {tinyStories.stack.slice(0, 3).map((s) => (
                    <TechChip key={s} tech={s} className="text-[10px]" />
                  ))}
                </div>
                <button className="group mt-8 inline-flex items-center gap-2 text-xs font-mono text-accent">
                  Read Technical Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </Reveal>

        </div>

        <div className="mt-10 text-center">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore all 5 research projects ➔
          </Link>
        </div>
      </section>
      
      <div className="divider-x" />

      {/* 3. CURRENT RESEARCH INTERESTS */}
      <section className="py-24 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <Reveal>
            <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
              § 02 — Research Focus
            </div>
            <h3 className="mt-4 text-2xl font-medium tracking-tight text-foreground">
              Current Interests
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Investigating the boundaries of performance and data compression across three primary areas of study.
            </p>
          </Reveal>

          <Reveal delay={60}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: "Efficient Inference", icon: Zap, body: "KV-cache optimization, double-buffering weight schedules, and SSD expert pinning to execute Mixture-of-Experts structures on single GPUs." },
                { title: "Small LMs Pretraining", icon: Brain, body: "Synthesizing child-like vocabulary stories datasets to pretrain causally masked decoders under 20M parameters." },
                { title: "Supervised Alignment", icon: Cpu, body: "Designing structured provision summaries instruction sets for factual grounding of models, preventing SFT speculation." }
              ].map((item) => (
                <div key={item.title} className="p-5 border border-border bg-surface-2/15 rounded-lg space-y-3">
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

      {/* 4. OPEN SOURCE HIGHLIGHTS & LATEST ACTIVITY */}
      <section className="py-24 mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Open Source Highlight */}
        <Reveal>
          <div className="space-y-4">
            <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
              § 03 — Open Source
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-foreground">
              Top Assets
            </h3>
            <div className="space-y-3 pt-4">
              {[
                { name: "Turbo-LLM", type: "Repository", meta: "Python/PyTorch · SSD expert offloading", link: "/open-source" },
                { name: "TinyStories-17M", type: "Model weights", meta: "17.2M parameters · BF16 causal checkpoints", link: "/open-source" }
              ].map((item) => (
                <Link
                  key={item.name}
                  to="/open-source"
                  className="flex items-center justify-between p-3.5 rounded border border-border bg-surface hover:border-accent/15 transition-all select-none cursor-pointer"
                >
                  <div>
                    <span className="chip text-[9px] uppercase tracking-wider">{item.type}</span>
                    <h4 className="text-xs font-semibold text-foreground mt-1.5">{item.name}</h4>
                    <p className="text-[10px] font-mono text-subtle mt-0.5">{item.meta}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Latest Activity feed */}
        <Reveal delay={80}>
          <div className="space-y-4">
            <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
              § 04 — Feed
            </div>
            <h3 className="text-2xl font-medium tracking-tight text-foreground">
              Latest Activity
            </h3>
            <div className="space-y-4 pt-4 border-l border-border-strong pl-6 ml-1">
              {[
                { date: "Current", title: "TurboLLM — MoE sequential offloading", desc: "Implementing PCIe bandwidth optimizations and expert weight pre-buffering schedules." },
                { date: "Completed", title: "TinyStories-17M pretraining", desc: "Successfully pre-trained and validated custom decoder-only networks from first principles." }
              ].map((act) => (
                <div key={act.title} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2 w-2 rounded-full bg-accent" />
                  <span className="text-[9px] font-mono text-subtle uppercase block">{act.date}</span>
                  <h4 className="text-xs font-semibold text-foreground mt-0.5">{act.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{act.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <div className="divider-x" />

      {/* 5. CONTACT CALL-TO-ACTION */}
      <section className="py-24 text-center mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 05 — Contact
          </div>
          <h3 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            Interested in collaboration?
          </h3>
          <p className="mt-4 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
            I am currently open to research internships, engineering residencies, and systems collaboration roles.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-mono text-background hover:opacity-95 transition-opacity"
            >
              Get in touch ➔
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Expanded project case study overlay */}
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
