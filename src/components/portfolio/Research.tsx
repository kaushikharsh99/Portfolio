import * as React from "react";
import { Reveal } from "./Reveal";
import { CheckCircle2, BookOpen, Layers, Compass, Bookmark } from "lucide-react";

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    topic: "Architecture",
    year: 2017,
    reproduced: true,
    summary: "The seminal paper introducing the Transformer network, fully discarding recurrence and convolutions in favor of self-attention mechanics.",
    contribution: "Replaced sequential recurrence with multi-head self-attention, allowing inputs to be processed in parallel and modeling long-range dependencies.",
    takeaway: "Causal masking of attention weight matrices allows standard matrix operations to compute sequence probabilities simultaneously.",
    influenced: "TinyStories-17M, Indian Legal LLM, MathInstruct v1",
    status: "Completed study"
  },
  {
    title: "TinyStories: How Small Can Language Models Be?",
    authors: "Eldan & Li",
    topic: "Small LMs",
    year: 2023,
    reproduced: true,
    summary: "Investigates whether small language models can generate fluent narratives when trained on synthetically constrained child-like data corpora.",
    contribution: "Demonstrates that restricting vocabulary and grammatical complexity allows models under 20M parameters to acquire fluent English grammar.",
    takeaway: "Data quality and corpus distribution density determine syntactic fluency far more than raw model parameter size.",
    influenced: "TinyStories-17M pretraining",
    status: "Completed study"
  },
  {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu et al.",
    topic: "Adaptation",
    year: 2021,
    reproduced: true,
    summary: "Introduces parameter-efficient fine-tuning (PEFT) by freezing base weights and training decomposed low-rank matrices for domain adaptation.",
    contribution: "Decomposes delta weight updates into low-rank multiplier matrices, shrinking SFT memory storage demands by 10,000x.",
    takeaway: "Domain adaptation shifts occur in a low intrinsic parameter dimension, meaning we do not need to update or store full model matrices.",
    influenced: "Indian Legal LLM, MathInstruct v1",
    status: "Completed study"
  },
  {
    title: "DeepSeek-V3 Technical Report",
    authors: "DeepSeek-AI",
    topic: "MoE / Systems",
    year: 2024,
    reproduced: false,
    summary: "A comprehensive analysis of DeepSeek-V3's 671B Mixture-of-Experts architecture, MLA KV cache compression, and multi-node training stability.",
    contribution: "Introduces Multi-head Latent Attention (MLA) and auxiliary-loss-free load balancing schemes for routing consistency.",
    takeaway: "Decoupled latent projection vectors scale up attention representation while preserving low KV cache memory footprints during batch serving.",
    influenced: "Turbo-LLM cache scheduler designs",
    status: "Completed study"
  },
  {
    title: "SmolLM2: Data Mixture and Scaling for Small LMs",
    authors: "Hugging Face",
    topic: "Small LMs",
    year: 2024,
    reproduced: false,
    summary: "Outlines training recipes and dataset curation mixtures used to build SmolLM2 models under 2B parameters.",
    contribution: "Establishes dataset mixture parameters across code, web extracts, and textbooks to maximize downstream utility per parameter count.",
    takeaway: "Refined synthetic textbook data acts as a reasoning multiplier, enabling sub-2B models to clear logical benchmarks.",
    influenced: "TinyStories-17M dataset processing",
    status: "Completed study"
  },
  {
    title: "Phi-1: Textbooks Are All You Need",
    authors: "Gunasekar et al.",
    topic: "Data Curation",
    year: 2023,
    reproduced: false,
    summary: "Explores SFT data engineering, using GPT-3.5 to compile synthetic textbook-quality code files to train small programming models.",
    contribution: "Proves that textbook-grade target outputs boost coding logic faster than training on noisy internet code scrap collections.",
    takeaway: "High semantic information density in training data reduces the parameter count required for logical reasoning tasks.",
    influenced: "MathInstruct v1 data mixture reviews",
    status: "Completed study"
  },
  {
    title: "Phi-1.5: Logical Reasoning on Small Models",
    authors: "Li et al.",
    topic: "Small LMs",
    year: 2023,
    reproduced: false,
    summary: "Expands textbook-style pretraining to non-code logical reasoning, training models under 2B parameters on synthetic textbooks.",
    contribution: "Proves that small models can solve multi-step reasoning, QA, and logic tests when SFT datasets are clean.",
    takeaway: "Multi-step reasoning capabilities emerge at small scales when trained on structured cause-and-effect instructional target pairs.",
    influenced: "MathInstruct v1 training baseline configurations",
    status: "Completed study"
  },
  {
    title: "Scaling Laws for Neural Language Models",
    authors: "Kaplan et al.",
    topic: "Scaling Laws",
    year: 2020,
    reproduced: false,
    summary: "Empirically formulates scaling behaviors, proving that validation cross-entropy follows power laws over parameters, compute, and tokens.",
    contribution: "Establishes that model performance depends primarily on parameter scale and data tokens, rather than architecture depth or width ratios.",
    takeaway: "Validation performance improves predictably. We must balance compute budgets between parameter scales and token limits.",
    influenced: "TinyStories-17M hyperparameter settings",
    status: "Completed study"
  },
  {
    title: "Training Compute-Optimal Large Language Models",
    authors: "Hoffmann et al.",
    topic: "Scaling Laws",
    year: 2022,
    reproduced: false,
    summary: "Re-evaluates the Kaplan scaling laws, showing that parameter count and token dataset count should be scaled in equal proportions.",
    contribution: "Formulates the Chinchilla scaling limits, proving that models are heavily undertrained relative to their compute allocation.",
    takeaway: "Compute-optimal models require scaling dataset token size concurrently with model size (20 tokens per parameter).",
    influenced: "TinyStories-17M tokens target sizing",
    status: "Completed study"
  },
  {
    title: "InstructGPT: Following Instructions with Human Feedback",
    authors: "Ouyang et al.",
    topic: "Alignment",
    year: 2022,
    reproduced: true,
    summary: "Details InstructGPT's post-training workflow, aligning foundation GPT models with user intent using SFT and RLHF.",
    contribution: "Establishes alignment procedures using pairwise human comparisons to train reward models for PPO optimization loops.",
    takeaway: "Pretraining learns token predictions; SFT and alignment procedures redirect model focus to act as helpful conversational agents.",
    influenced: "Indian Legal LLM v2/v3 instruction datasets",
    status: "Completed study"
  }
];

export function Research() {
  return (
    <section id="research" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div>
            <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
              § 04 — Literature Review
            </div>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              Research Diary
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
              A record of the foundational literature I have studied. Selected papers have been completely reproduced to internalize their core structural and training trade-offs. Hover over any card to reveal review details.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {papers.map((p, i) => (
            <Reveal key={p.title} delay={i * 40}>
              {/* Interactive Paper Card */}
              <div className="group relative min-h-[290px] rounded-lg border border-border bg-surface-2/10 p-6 flex flex-col justify-between overflow-hidden hover:border-accent/35 hover:shadow-elevated transition-all duration-300 select-none">
                
                {/* Default Front View */}
                <div className="space-y-4 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-subtle">
                    <span className="chip uppercase tracking-wider text-[9px]">{p.topic}</span>
                    <div className="flex items-center gap-2">
                      <span>{p.year}</span>
                      {p.reproduced && (
                        <span className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-500 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide uppercase">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Reproduced
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold leading-snug text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-subtle mt-1 font-mono">{p.authors}</p>
                  </div>

                  <div className="pt-4 border-t border-hairline flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-accent">
                    <BookOpen className="h-3 w-3" />
                    Hover to read takeaways
                  </div>
                </div>

                {/* Hover Details Panel Overlay */}
                <div className="absolute inset-0 p-6 bg-surface border-t-2 border-accent flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[9px] font-mono text-subtle border-b border-hairline pb-1.5">
                      <span className="flex items-center gap-1">
                        <Bookmark className="h-3 w-3 text-accent" />
                        Status: <strong className="text-foreground">{p.status}</strong>
                      </span>
                      <span>{p.year}</span>
                    </div>

                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      <strong className="text-foreground font-mono block text-[9px] uppercase tracking-wider mb-0.5">Summary</strong>
                      {p.summary}
                    </p>

                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      <strong className="text-foreground font-mono block text-[9px] uppercase tracking-wider mb-0.5">Key Contribution</strong>
                      {p.contribution}
                    </p>

                    <div className="bg-background/40 p-2.5 rounded border border-hairline space-y-1">
                      <span className="flex items-center gap-1 text-[8px] font-mono uppercase tracking-wider text-accent">
                        <BookOpen className="h-2.5 w-2.5" />
                        My Takeaway
                      </span>
                      <p className="text-[11px] italic font-light leading-relaxed text-foreground">
                        "{p.takeaway}"
                      </p>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-subtle border-t border-hairline pt-2 flex items-center gap-1.5">
                    <Layers className="h-3 w-3 text-accent-violet" />
                    <span>Influenced: <strong>{p.influenced}</strong></span>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
