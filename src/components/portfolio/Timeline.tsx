import { Reveal } from "./Reveal";
import { Cpu, Brain, Zap, Database, Code } from "lucide-react";

const progression = [
  {
    stage: "Inference Systems",
    icon: Zap,
    title: "Turbo-LLM — mixture-of-experts acceleration",
    body: "Focusing on hardware-software boundaries to run huge models on consumer units. Built SSD ➔ RAM ➔ VRAM sequential expert offloading, double-buffering, and active parameter pinning in GPU cache memory to bypass PCIe bandwidth limits.",
  },
  {
    stage: "Training from Scratch",
    icon: Brain,
    title: "TinyStories-17M — pretraining pipeline",
    body: "Trained a 17.2M parameter decoder-only transformer from first principles. Built custom dataset streams, SentencePiece BPE tokenizer, RMSNorm pre-layer normalization, SwiGLU activation blocks, and Rotary Position Embeddings (RoPE).",
  },
  {
    stage: "LLM Fine-tuning",
    icon: Cpu,
    title: "Indian Legal LLM & MathInstruct — supervised fine-tuning",
    body: "Studied SFT post-training workflows. Fine-tuned Qwen 2.5 (0.5B) and Qwen 3 (1.7B) on custom legal and mathematical instruction corpora. Discovered and documented the limits of verbose datasets on hallucination thresholds.",
  },
  {
    stage: "Knowledge Distillation",
    icon: Database,
    title: "Spam Detection Model — model compression",
    body: "Developed model compression pipelines. Trained an 80M parameter residual teacher network and successfully distilled its soft logits representation into a lightweight 2M parameter self-attention student model.",
  },
  {
    stage: "Machine Learning",
    icon: Code,
    title: "Foundations — classical modeling",
    body: "Established engineering baselines. Built text classifiers using TF-IDF feature extraction, Logistic Regression, and support vector machines (SVM) with class-weighted loss balancing.",
  },
];

export function Timeline() {
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
            An iterative path showing progression from classical machine learning foundations up to custom pretraining pipelines and inference system runtimes.
          </p>
        </Reveal>

        <ol className="relative mt-14 border-l border-hairline pl-8 space-y-12">
          {progression.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.stage} delay={i * 60}>
                <li className="relative">
                  {/* Timeline Dot */}
                  <span
                    className="absolute -left-[45px] top-1 grid h-8 w-8 place-items-center rounded-full bg-background border border-border-strong shadow-sm"
                  >
                    <Icon className={`h-4 w-4 ${i === 0 ? "text-accent" : "text-muted-foreground"}`} />
                  </span>
                  <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">
                    {item.stage}
                  </div>
                  <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
