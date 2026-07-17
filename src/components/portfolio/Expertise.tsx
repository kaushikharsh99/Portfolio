import * as React from "react";
import { Reveal } from "./Reveal";
import { Cpu, Brain, Zap, Database, Code, Terminal, Settings, BarChart3, ChevronDown, ChevronUp } from "lucide-react";

interface Category {
  id: string;
  title: string;
  icon: any;
  summary: string;
  skills: string[];
  highlight: boolean;
}

const categories: Category[] = [
  {
    id: "ai-systems",
    title: "AI Systems & LLM Engineering",
    icon: Zap,
    summary: "Hardware-efficient inference stacks, caching hierarchies, and distributed serving architectures.",
    highlight: true,
    skills: [
      "Large Language Models (LLMs)",
      "Small Language Models (SLMs)",
      "Transformer Architecture",
      "Decoder-only Transformers",
      "Mixture of Experts (MoE)",
      "Efficient Inference",
      "Model Compression",
      "Quantization",
      "KV Cache",
      "Dynamic Expert Routing",
      "Memory Optimization",
      "Layer Streaming",
      "AI Systems Design"
    ]
  },
  {
    id: "training",
    title: "LLM Training & Post-Training",
    icon: Brain,
    summary: "Pretraining pipelines, fine-tuning protocols, and parameter-efficient domain adaptation.",
    highlight: true,
    skills: [
      "Training Models From Scratch",
      "Continued Pretraining",
      "Supervised Fine-Tuning (SFT)",
      "LoRA",
      "QLoRA",
      "Knowledge Distillation",
      "Dataset Curation",
      "Instruction Tuning",
      "Tokenizer Training",
      "Model Evaluation",
      "Prompt Engineering"
    ]
  },
  {
    id: "ml-dl",
    title: "Machine Learning & Deep Learning",
    icon: Cpu,
    summary: "Deep learning fundamentals, optimizer dynamics, and attention mechanics.",
    highlight: true,
    skills: [
      "PyTorch",
      "Transformers",
      "Neural Networks",
      "Attention Mechanisms",
      "Embeddings",
      "Optimization",
      "Mixed Precision Training",
      "Automatic Mixed Precision (AMP)",
      "AdamW",
      "Learning Rate Scheduling",
      "Classification",
      "NLP"
    ]
  },
  {
    id: "data-eng",
    title: "Data Engineering",
    icon: Database,
    summary: "Large-scale preprocessing, deduplication algorithms, and tokenizer workflows.",
    highlight: false,
    skills: [
      "Large-scale Dataset Creation",
      "Data Cleaning",
      "Deduplication",
      "SimHash",
      "Parquet",
      "Data Preprocessing",
      "Dataset Versioning",
      "Tokenization Pipelines"
    ]
  },
  {
    id: "languages",
    title: "Programming Languages",
    icon: Code,
    summary: "Low-level system languages and high-performance numerical computing.",
    highlight: false,
    skills: [
      "Python",
      "C++",
      "C",
      "SQL",
      "Bash"
    ]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: Settings,
    summary: "Industry-standard frameworks for tensor modeling, data science, and inference serving.",
    highlight: false,
    skills: [
      "PyTorch",
      "Hugging Face Transformers",
      "Hugging Face Datasets",
      "Unsloth",
      "vLLM",
      "SentencePiece",
      "NumPy",
      "Pandas",
      "Scikit-learn"
    ]
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: Terminal,
    summary: "Linux runtime platforms, container runtimes, and GPU acceleration substrates.",
    highlight: false,
    skills: [
      "Git",
      "GitHub",
      "Hugging Face Hub",
      "VS Code",
      "Linux",
      "Fedora",
      "Docker",
      "CUDA",
      "Kaggle",
      "Google Colab"
    ]
  },
  {
    id: "research",
    title: "Research & Engineering",
    icon: BarChart3,
    summary: "Rigorous paper reproduction, profiling bottlenecks, and tracking experiment scaling.",
    highlight: false,
    skills: [
      "Research Paper Reproduction",
      "Benchmarking",
      "Performance Profiling",
      "Experiment Tracking",
      "Ablation Studies",
      "Technical Documentation",
      "Model Analysis",
      "Systems Optimization"
    ]
  }
];

export function Expertise() {
  const [expandedId, setExpandedId] = React.useState<string | null>("ai-systems");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
          Categorized review of engineering and research domains. Highlighted categories represent areas of active system design, pretraining experiments, and inference runtime development. Click a card to expand the skills inventory.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          const isExpanded = expandedId === cat.id;
          return (
            <Reveal key={cat.id} delay={idx * 40}>
              <div
                onClick={() => toggleExpand(cat.id)}
                className={`group card-panel card-panel-hover p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 select-none ${
                  cat.highlight 
                    ? "border-accent/25 hover:border-accent/40 bg-surface-2/10 shadow-sm" 
                    : "border-border hover:border-border-strong bg-background/20"
                } ${isExpanded ? "ring-1 ring-border-strong/50 bg-surface-2/20" : ""}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-[18px] w-[18px] ${cat.highlight ? "text-accent" : "text-muted-foreground"}`} />
                      <h3 className={`text-sm font-semibold tracking-tight ${cat.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                        {cat.title}
                      </h3>
                    </div>
                    {cat.highlight && (
                      <span className="text-[8px] font-mono text-accent uppercase tracking-wider bg-accent/10 px-1.5 py-0.5 rounded font-semibold border border-accent/20">
                        Highlight
                      </span>
                    )}
                  </div>
                  
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {cat.summary}
                  </p>

                  {/* Expandable Skills List */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-hairline flex flex-wrap gap-1.5 animate-slide-up">
                      {cat.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className={`chip text-[10px] select-none ${
                            cat.highlight ? "border-accent/15 bg-accent/5 text-foreground/90" : "bg-surface-2"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-hairline/65 pt-3">
                  <span className="font-mono text-[9px] text-subtle uppercase">
                    {cat.skills.length} skills listed
                  </span>
                  <span className="text-[10px] font-mono text-subtle flex items-center gap-1">
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    {isExpanded ? "Collapse" : "Expand"}
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
