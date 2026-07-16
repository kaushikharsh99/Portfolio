import { createFileRoute } from "@tanstack/react-router";
import { ResearchStatement } from "@/components/portfolio/ResearchStatement";
import { Skills } from "@/components/portfolio/Skills";
import { Timeline } from "@/components/portfolio/Timeline";
import { Reveal } from "@/components/portfolio/Reveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      {/* 1. Bio & Technical Journey */}
      <section className="pt-24 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 01 — Biography
          </div>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl text-foreground">
            Harsh Kaushik
          </h1>
          <p className="text-mono text-xs text-accent mt-2">
            AI Systems · LLM Training · Inference Acceleration
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Main Story & Philosophy */}
          <Reveal delay={60}>
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                My work centers on the intersection of deep learning algorithms and computer systems. I believe that building models from scratch and reproducing landmark research papers from first principles is the most reliable way to develop deep intuition for architecture scaling limits and performance bottlenecks.
              </p>
              <p>
                Rather than treating model structures as black boxes, my research focuses on the entire lifecycle—from BPE tokenization choices and data mixture hygiene during pretraining, up to low-rank SFT alignments and double-buffered memory schedules at the hardware boundary during inference serving.
              </p>
              
              <h3 className="text-base font-semibold text-foreground pt-4">Research Philosophy</h3>
              <p>
                I hold a data-centric and systems-first outlook: most model quality limits are bound to data curation, while model serving constraints are bound to memory bottlenecks. Hence, grounding SFT targets in concise provision summary structures prevents speculation, while optimizing PCIe expert weight schedules enables large Mixture-of-Experts (MoE) runtimes to operate efficiently on limited hardware.
              </p>

              <h3 className="text-base font-semibold text-foreground pt-4">Long-term Goals</h3>
              <p>
                I aim to optimize the layers between transformers and silicon. My long-term goal is to design lightweight, high-utility foundation models and serving systems that make local, private, and latency-optimal inference runtimes accessible on everyday consumer devices.
              </p>
            </div>
          </Reveal>

          {/* Quick Stats / Info sidebar */}
          <Reveal delay={120}>
            <div className="card-panel p-6 space-y-6 border border-border bg-surface-2/10 h-fit">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent block mb-1">Focus</span>
                <span className="text-foreground text-xs font-semibold">Local foundation models & serving runtimes</span>
              </div>
              <div className="border-t border-hairline pt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent block mb-1">Methodology</span>
                <span className="text-foreground text-xs font-semibold">First-principles implementation & data-centric alignment</span>
              </div>
              <div className="border-t border-hairline pt-4">
                <span className="font-mono text-[9px] uppercase tracking-wider text-accent block mb-1">Location</span>
                <span className="text-foreground text-xs font-semibold">India · Open to hybrid/remote setups</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider-x mt-16" />

      {/* 2. Research Statement topics */}
      <ResearchStatement />

      <div className="divider-x" />

      {/* 3. Timeline / Technical progression */}
      <Timeline />

      <div className="divider-x" />

      {/* 4. Skills Toolkit Grid */}
      <Skills />
    </main>
  );
}
