import { Reveal } from "./Reveal";
import { CheckCircle2, BookOpen } from "lucide-react";

const papers = [
  {
    title: "Attention Is All You Need",
    authors: "Vaswani et al.",
    topic: "Architecture",
    year: 2017,
    reproduced: true,
    takeaway: "Introduced the multi-head self-attention mechanism, proving that parallelized tensor operations can fully replace recurrent models in language processing."
  },
  {
    title: "TinyStories: How Small Can Language Models Be?",
    authors: "Eldan & Li",
    topic: "Small LMs",
    year: 2023,
    reproduced: true,
    takeaway: "Demonstrated that restricting dataset vocabulary and context (synthetically) allows models under 20M parameters to acquire fluent, grammatically perfect English."
  },
  {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu et al.",
    topic: "Adaptation",
    year: 2021,
    reproduced: true,
    takeaway: "Proved that domain adaptation updates can be decomposed into low-rank matrices, reducing trainable parameter footprints by 10,000x without accuracy collapse."
  },
  {
    title: "DeepSeek-V3 Technical Report",
    authors: "DeepSeek-AI",
    topic: "MoE / Systems",
    year: 2024,
    reproduced: false,
    takeaway: "Introduced Multi-Head Latent Attention (MLA) for key-value caching space savings, combined with auxiliary-loss-free load balancing in Mixture-of-Experts routing."
  },
  {
    title: "SmolLM2: Study of Data Mixture and Scaling for Small LMs",
    authors: "Hugging Face",
    topic: "Small LMs",
    year: 2024,
    reproduced: false,
    takeaway: "Analyzed optimal pretraining data mixture ratios across code, web scraps, and textbooks, establishing boundary capabilities for 1.7B parameter models."
  },
  {
    title: "Phi-1: Textbooks Are All You Need",
    authors: "Gunasekar et al.",
    topic: "Data Curation",
    year: 2023,
    reproduced: false,
    takeaway: "Established that high-quality synthetic coding datasets ('textbook grade') yield massive logic gains in small language models, bypassing raw web scrap noise."
  },
  {
    title: "Phi-1.5: Q&A and Logical Reasoning on Small Models",
    authors: "Li et al.",
    topic: "Small LMs",
    year: 2023,
    reproduced: false,
    takeaway: "Showed that models under 2B parameters can solve multi-step logical tasks when instructed with structured, reasoning-focused synthetic targets."
  },
  {
    title: "Scaling Laws for Neural Language Models",
    authors: "Kaplan et al.",
    topic: "Scaling Laws",
    year: 2020,
    reproduced: false,
    takeaway: "Formulated the power-law relation between language model cross-entropy loss and three key variables: model parameter size, dataset scale, and compute compute bounds."
  },
  {
    title: "Training Compute-Optimal Large Language Models",
    authors: "Hoffmann et al.",
    topic: "Scaling Laws",
    year: 2022,
    reproduced: false,
    takeaway: "Formulated the Chinchilla scaling laws, showing that parameter count and token dataset count should scale at equal ratios to maximize validation gains."
  },
  {
    title: "InstructGPT: Training LMs to Follow Instructions with Human Feedback",
    authors: "Ouyang et al.",
    topic: "Alignment",
    year: 2022,
    reproduced: true,
    takeaway: "Standardized supervised fine-tuning (SFT) combined with reinforcement learning (RLHF) to align raw text predictors to act as helpful, safe conversational assistants."
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
              A record of the foundational literature I have studied. Selected papers have been completely reproduced as a way to internalize their core structural and training trade-offs.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {papers.map((p, i) => (
            <Reveal key={p.title} delay={i * 40}>
              <div className="card-panel card-panel-hover p-6 flex flex-col justify-between h-full bg-surface-2/10 border border-border hover:border-accent/20 transition-all duration-300">
                <div className="space-y-4">
                  {/* Card Header metadata */}
                  <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-subtle select-none">
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

                  {/* Title & Author */}
                  <div>
                    <h3 className="text-base font-semibold leading-snug text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-subtle mt-1 font-mono">{p.authors}</p>
                  </div>
                </div>

                {/* Takeaway Block */}
                <div className="mt-6 border-t border-hairline pt-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-accent">
                    <BookOpen className="h-3 w-3" />
                    Key Takeaway
                  </div>
                  <blockquote className="text-xs leading-relaxed text-muted-foreground italic font-light">
                    "{p.takeaway}"
                  </blockquote>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
