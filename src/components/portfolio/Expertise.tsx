import * as React from "react";
import { Reveal } from "./Reveal";
import { Cpu, Brain, Zap, Database, Code, Terminal, Layers } from "lucide-react";

interface Category {
  id: string;
  title: string;
  icon: any;
  skills: string[];
  highlight: boolean;
}

const categories: Category[] = [
  {
    id: "ai-systems",
    title: "AI Systems",
    icon: Zap,
    highlight: true,
    skills: [
      "Efficient LLM Inference",
      "Transformer Architectures",
      "Small Language Models (SLMs)",
      "Model Compression",
      "Mixture of Experts (MoE)"
    ]
  },
  {
    id: "model-training",
    title: "Model Training",
    icon: Brain,
    highlight: true,
    skills: [
      "Pre-training",
      "Continued Pre-training (CPT)",
      "Supervised Fine-tuning (SFT)",
      "LoRA",
      "QLoRA",
      "PEFT",
      "Tokenizer Training",
      "Mixed Precision"
    ]
  },
  {
    id: "ml-dl",
    title: "Deep Learning & Machine Learning",
    icon: Cpu,
    highlight: false,
    skills: [
      "PyTorch",
      "Transformers",
      "NumPy",
      "Pandas",
      "Scikit-learn"
    ]
  },
  {
    id: "llm-ecosystem",
    title: "LLM Ecosystem",
    icon: Layers,
    highlight: false,
    skills: [
      "Hugging Face",
      "vLLM",
      "llama.cpp",
      "Ollama",
      "LM Studio",
      "SentencePiece",
      "Tokenizers"
    ]
  },
  {
    id: "data-eng",
    title: "Data Engineering",
    icon: Database,
    highlight: false,
    skills: [
      "Parquet",
      "Dataset Preprocessing",
      "Data Cleaning",
      "Multiprocessing"
    ]
  },
  {
    id: "programming",
    title: "Programming",
    icon: Code,
    highlight: false,
    skills: [
      "Python",
      "C++",
      "C"
    ]
  },
  {
    id: "development",
    title: "Development",
    icon: Terminal,
    highlight: false,
    skills: [
      "Linux",
      "Git",
      "VS Code",
      "Jupyter",
      "Kaggle",
      "Google Colab"
    ]
  }
];

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 mx-auto max-w-6xl px-6">
      <Reveal>
        <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
          § 03 — Technical Expertise
        </div>
        <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl text-foreground">
          Capabilities & Toolkit
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          Structured directory of core technical capabilities. Highlighted areas indicate primary engineering focus in training pipelines and low-latency inference systems.
        </p>
      </Reveal>

      {/* Uniform grid of category cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Reveal key={cat.id} delay={idx * 40}>
              <div
                className={`group card-panel card-panel-hover p-6 flex flex-col justify-between h-full transition-all duration-300 select-none border ${
                  cat.highlight 
                    ? "border-accent/30 hover:border-accent/50 bg-surface-2/10 shadow-sm" 
                    : "border-border hover:border-border-strong bg-background/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-hairline/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4.5 w-4.5 ${cat.highlight ? "text-accent" : "text-muted-foreground"}`} />
                      <h3 className={`text-sm font-semibold tracking-tight ${cat.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                        {cat.title}
                      </h3>
                    </div>
                    {cat.highlight && (
                      <span className="text-[8px] font-mono text-accent uppercase tracking-wider bg-accent/10 px-1.5 py-0.5 rounded font-semibold border border-accent/20">
                        Primary
                      </span>
                    )}
                  </div>
                  
                  {/* Skills lists: Always visible, uniform chip formats */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className={`chip text-[10px] select-none ${
                          cat.highlight ? "border-accent/15 bg-accent/5 text-foreground/90 font-medium" : "bg-surface-2"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-hairline/40 text-[9px] font-mono text-subtle text-right">
                  {cat.skills.length} domains mapped
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
