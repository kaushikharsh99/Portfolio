import * as React from "react";
import { Reveal } from "./Reveal";
import { Cpu, Brain, Zap, Database, Code, ChevronDown, ChevronUp } from "lucide-react";

const progression = [
  {
    stage: "Inference Systems",
    icon: Zap,
    title: "Turbo-LLM — mixture-of-experts acceleration",
    body: "Focusing on hardware-software boundaries to run huge models on consumer units. Built SSD ➔ RAM ➔ VRAM sequential expert offloading, double-buffering, and active parameter pinning in GPU cache memory to bypass PCIe bandwidth limits.",
    project: "Turbo-LLM",
    topic: "Memory-efficient inference scheduling & PCIe transfer pipelining",
    lesson: "Double-buffering memory transfers hides weight loading latency behind calculations, boosting throughput of single-GPU offloaded MoE setups by 21x.",
    papers: "Mixtral of Experts (MoE) Paper, AirLLM, vLLM"
  },
  {
    stage: "Training from Scratch",
    icon: Brain,
    title: "TinyStories-17M — pretraining pipeline",
    body: "Trained a 17.2M parameter decoder-only transformer from first principles. Built custom dataset streams, SentencePiece BPE tokenizer, RMSNorm pre-layer normalization, SwiGLU activation blocks, and Rotary Position Embeddings (RoPE).",
    project: "TinyStories-17M",
    topic: "Causal decoder pretraining & synthetic dataset tokenization",
    lesson: "Low-rank data distributions enable complex syntax and sentence structure configurations to emerge even inside ultra-compact (17.2M parameter) networks.",
    papers: "TinyStories Paper, LLaMA, Attention Is All You Need"
  },
  {
    stage: "LLM Fine-tuning",
    icon: Cpu,
    title: "Indian Legal LLM & MathInstruct — supervised fine-tuning",
    body: "Studied SFT post-training workflows. Fine-tuned Qwen 2.5 (0.5B) and Qwen 3 (1.7B) on custom legal and mathematical instruction corpora. Discovered and documented the limits of verbose datasets on hallucination thresholds.",
    project: "Indian Legal LLM & MathInstruct v1",
    topic: "Supervised Fine-Tuning (SFT) & domain-adaptation optimization",
    lesson: "Verbose target formats incentivize small networks to over-interpret statutory terms. Transitioning to concise summaries reduces hallucinations by preserving model focus.",
    papers: "OpenMathInstruct-2, Qwen Technical Report"
  },
  {
    stage: "Knowledge Distillation",
    icon: Database,
    title: "Spam Detection Model — model compression",
    body: "Developed model compression pipelines. Trained an 80M parameter residual teacher network and successfully distilled its soft logits representation into a lightweight 2M parameter self-attention student model.",
    project: "Spam Detection Model",
    topic: "Logit alignment & model compression",
    lesson: "Teaching a lightweight student model to predict the soft probability logits of a teacher network transfers dense classification boundaries far better than SFT hard-labels.",
    papers: "Distilling the Knowledge in a Neural Network"
  },
  {
    stage: "Machine Learning",
    icon: Code,
    title: "Foundations — classical modeling",
    body: "Established engineering baselines. Built text classifiers using TF-IDF feature extraction, Logistic Regression, and support vector machines (SVM) with class-weighted loss balancing.",
    project: "Baseline Classifiers",
    topic: "TF-IDF indexing & margin-based classifications",
    lesson: "Classical baseline pipelines (SVM/Logistic Regression) establish high accuracy baselines quickly and serve as computational check-boundaries before building neural setups.",
    papers: "Scikit-Learn Documentation"
  },
];

export function Timeline() {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(0);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="timeline" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 06 — Technical Growth Timeline
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Progression trajectory
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed">
            An interactive path showing progression from classical machine learning foundations up to custom pretraining pipelines and inference system runtimes. Click any milestone to expand and inspect detailed research parameters.
          </p>
        </Reveal>

        <ol className="relative mt-14 border-l border-hairline pl-8 space-y-8">
          {progression.map((item, i) => {
            const Icon = item.icon;
            const isExpanded = expandedIndex === i;
            return (
              <Reveal key={item.stage} delay={i * 60}>
                <li className="relative group">
                  {/* Timeline Icon Node */}
                  <button
                    onClick={() => toggleExpand(i)}
                    className="absolute -left-[45px] top-1.5 grid h-8 w-8 place-items-center rounded-full bg-background border border-border-strong shadow-sm hover:border-accent/40 hover:scale-105 transition-all cursor-pointer z-10"
                  >
                    <Icon className={`h-4 w-4 ${isExpanded ? "text-accent" : "text-muted-foreground"}`} />
                  </button>

                  {/* Main Milestone Header */}
                  <div 
                    onClick={() => toggleExpand(i)}
                    className="cursor-pointer select-none pl-2 pr-4 py-1.5 rounded-lg hover:bg-surface-2/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">
                        {item.stage}
                      </span>
                      <span className="text-subtle text-xs pr-2 flex items-center gap-1 font-mono">
                        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        {isExpanded ? "Collapse" : "Expand"}
                      </span>
                    </div>
                    <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-3xl text-xs leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>

                  {/* Expandable research parameters card */}
                  {isExpanded && (
                    <div className="mt-3 ml-2 p-5 rounded-lg border border-border bg-surface-2/20 space-y-4 animate-slide-up max-w-3xl">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-accent block mb-0.5">Project</span>
                          <span className="text-foreground font-medium">{item.project}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-accent block mb-0.5">Research Topic</span>
                          <span className="text-foreground font-medium">{item.topic}</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-hairline pt-3 text-xs">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-accent block mb-1">Key Lesson Learned</span>
                        <p className="text-muted-foreground leading-relaxed italic">
                          "{item.lesson}"
                        </p>
                      </div>

                      <div className="border-t border-hairline pt-3 text-xs">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-accent block mb-0.5">Influential Literature</span>
                        <span className="text-foreground font-mono text-[11px]">{item.papers}</span>
                      </div>
                    </div>
                  )}
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
