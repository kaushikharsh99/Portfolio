import { Reveal } from "./Reveal";
import { Code, Cpu, Brain, Zap, Database, Terminal } from "lucide-react";

const groups = [
  {
    label: "Languages",
    icon: Code,
    items: ["Python", "C++", "CUDA", "Bash"],
  },
  {
    label: "Frameworks",
    icon: Cpu,
    items: ["PyTorch", "Transformers", "vLLM", "PEFT", "TRL"],
  },
  {
    label: "Training",
    icon: Brain,
    items: [
      "Pretraining",
      "SFT",
      "LoRA",
      "QLoRA",
      "Tokenizer Training",
      "MoE",
    ],
  },
  {
    label: "Inference",
    icon: Zap,
    items: [
      "KV Cache",
      "Paged Attention",
      "Quantization",
      "Speculative Decoding",
      "Batching",
    ],
  },
  {
    label: "Data",
    icon: Database,
    items: ["Parquet", "MinHash", "Multiprocessing", "SentencePiece"],
  },
  {
    label: "Platform",
    icon: Terminal,
    items: ["Linux", "Hugging Face", "Docker", "Weights & Biases"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 03 — Toolkit
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Systems, frameworks, and craft
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => {
            const IconComponent = g.icon;
            return (
              <Reveal key={g.label} delay={i * 50}>
                <div className="card-panel card-panel-hover h-full p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-mono text-xs uppercase tracking-[0.18em] text-subtle">
                      <IconComponent className="h-4 w-4 shrink-0 text-accent" />
                      <span>{g.label}</span>
                    </div>
                    <div className="text-mono text-[11px] text-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="chip">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
