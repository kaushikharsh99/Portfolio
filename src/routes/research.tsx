import { createFileRoute } from "@tanstack/react-router";
import { Research } from "@/components/portfolio/Research";
import { Reveal } from "@/components/portfolio/Reveal";
import { Brain, Cpu, BookOpen, Layers } from "lucide-react";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      {/* 1. Research Overview Header */}
      <section className="pt-24 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 01 — Research Agenda
          </div>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl text-foreground">
            Current Focus & Future Directions
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
            Exploring the limits of language models as hardware-efficient software systems. Investigating pretraining algorithms, low-rank adaptations, and Mixture-of-Experts inference runtime architectures.
          </p>
        </Reveal>

        {/* Current focus vs Future directions grids */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={60}>
            <div className="p-6 rounded-lg border border-border bg-surface-2/15 space-y-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Brain className="h-4 w-4 text-accent" />
                Current Focus
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Developing optimized scheduling runtimes for large open-weight models on consumer grade GPUs. Specifically testing expert offloading latency masks and double-buffered GPU weight pinning in sequential Mixture-of-Experts (MoE) runtimes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="p-6 rounded-lg border border-border bg-surface-2/15 space-y-4">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Cpu className="h-4 w-4 text-accent-violet" />
                Future Directions
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Exploring hardware-software co-design limits. Quantization-aware training (QAT) schemes directly integrated with customized kernel fusions (attention + MLP blocks) to bypass memory-transfer bottlenecks entirely.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider-x mt-16" />

      {/* 2. Literature reading list and paper reproductions */}
      <Research />
    </main>
  );
}
