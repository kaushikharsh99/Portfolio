import { createFileRoute } from "@tanstack/react-router";
import { Research } from "@/components/portfolio/Research";
import { Reveal } from "@/components/portfolio/Reveal";
import { Brain, Cpu, BookOpen, Layers, Zap, BookmarkCheck } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Notebook — Harsh Kaushik" },
      {
        name: "description",
        content:
          "An active research notebook documenting studies, paper reproductions, key learnings, and future directions in LLM systems and alignment.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      {/* 1. Header Section */}
      <section className="pt-24 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 01 — Research Journey
          </div>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl text-foreground">
            Research Notebook
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
            An evolving record of the papers I study, models I reproduce, key learnings I internalize, and technical questions I return to weekly at the intersection of AI systems and deep learning.
          </p>
        </Reveal>
      </section>

      <div className="divider-x mt-12" />

      {/* 2. Structured Interests, Learnings, and Directions */}
      <section className="py-16 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Research Interests & Future Directions */}
          <div className="space-y-12">
            {/* Research Interests */}
            <Reveal>
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 font-mono uppercase tracking-wider text-[11px]">
                  <Zap className="h-4 w-4 text-accent" />
                  Research Interests
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-foreground">Efficient Serving Systems</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Optimizing KV cache memory limits, scheduling sequential offloads for Mixture-of-Experts (MoE) runtimes, and bypassing PCIe transfer boundaries.
                    </p>
                  </div>
                  <div className="border-t border-hairline pt-3">
                    <h4 className="text-xs font-semibold text-foreground">Compact Foundation Architectures</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Training high-fluency Small Language Models (SLMs) from scratch under 100M parameters using synthetic data and pre-layer normalization.
                    </p>
                  </div>
                  <div className="border-t border-hairline pt-3">
                    <h4 className="text-xs font-semibold text-foreground">Alignment & Model Compression</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      Supervised Fine-Tuning (SFT), parameter-efficient adapters (LoRA/QLoRA), and logit-matching teacher-student knowledge distillation.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Future Research Directions */}
            <Reveal delay={60}>
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 font-mono uppercase tracking-wider text-[11px]">
                  <Cpu className="h-4 w-4 text-accent-violet" />
                  Future Research Directions
                </h3>
                <div className="p-5 border border-border bg-surface-2/10 rounded-lg space-y-3 text-xs leading-relaxed text-muted-foreground">
                  <p>
                    <strong>Quantization-Aware Training (QAT):</strong> Transitioning parameters to low-bit representations during pretraining to prevent accuracy collapse.
                  </p>
                  <p className="border-t border-hairline pt-3">
                    <strong>Custom Kernel Fusions:</strong> Writing fused GPU attention operations to compress execution loops and bypass device RAM overheads.
                  </p>
                  <p className="border-t border-hairline pt-3">
                    <strong>Speculative Decoding Pipelines:</strong> Integrating lightweight student draft models directly inside the expert offload schedule to multiply throughput.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Key Learnings & Reproductions Summary */}
          <div className="space-y-12">
            {/* Key Learnings */}
            <Reveal delay={120}>
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 font-mono uppercase tracking-wider text-[11px]">
                  <Brain className="h-4 w-4 text-accent" />
                  Key Learnings
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-xs text-muted-foreground leading-relaxed">
                    <span className="text-accent font-bold font-mono">01</span>
                    <div>
                      <strong className="text-foreground block">Double-Buffering Weight Transfers</strong>
                      Streaming expert weights from host RAM to GPU VRAM ahead of actual computation masks PCIe transport latency, lifting throughput.
                    </div>
                  </li>
                  <li className="flex gap-3 text-xs text-muted-foreground leading-relaxed border-t border-hairline pt-3">
                    <span className="text-accent font-bold font-mono">02</span>
                    <div>
                      <strong className="text-foreground block">Dataset Curation vs. General Hallucinations</strong>
                      Restructuring instruction sets into concise provision summary layouts blocks models from over-speculating, grounding target outputs.
                    </div>
                  </li>
                  <li className="flex gap-3 text-xs text-muted-foreground leading-relaxed border-t border-hairline pt-3">
                    <span className="text-accent font-bold font-mono">03</span>
                    <div>
                      <strong className="text-foreground block">Soft Logits Distribution Alignment</strong>
                      Matching the continuous probability boundaries of an 80M parameter teacher net guides student convergence better than SFT label boundaries.
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Paper Reproductions Summary */}
            <Reveal delay={180}>
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 font-mono uppercase tracking-wider text-[11px]">
                  <BookmarkCheck className="h-4 w-4 text-green-500" />
                  Paper Reproductions
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I fully implement the architectures, datasets, and loss models from landmark research to verify claims, explore hyperparameters, and study structural limitations:
                </p>
                <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-3 border border-border bg-surface-2/15 rounded flex items-center gap-2 text-foreground">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                    Attention Is All You Need
                  </div>
                  <div className="p-3 border border-border bg-surface-2/15 rounded flex items-center gap-2 text-foreground">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                    TinyStories Pretraining
                  </div>
                  <div className="p-3 border border-border bg-surface-2/15 rounded flex items-center gap-2 text-foreground">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                    LoRA / PEFT Adaptation
                  </div>
                  <div className="p-3 border border-border bg-surface-2/15 rounded flex items-center gap-2 text-foreground">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                    Knowledge Distillation
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <div className="divider-x" />

      {/* 3. Literature Reading list logs */}
      <Research />
    </main>
  );
}
