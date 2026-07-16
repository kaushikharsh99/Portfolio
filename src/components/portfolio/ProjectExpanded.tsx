import * as React from "react";
import { ProjectDetail } from "./projectData";
import { X, ArrowLeft, ArrowRight, Github, ExternalLink, Cpu, Sparkles, CheckCircle2, ChevronRight, Copy, Check } from "lucide-react";

interface ProjectExpandedProps {
  project: ProjectDetail;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

// Custom simple syntax highlighter for code snippets
function HighlightedCode({ code, language }: { code: string; language: string }) {
  const keywords = language === "python"
    ? /\b(def|class|import|from|return|if|else|for|while|try|except|as|in|is|not|and|or|None|True|False|self|with|@torch\.compile)\b/g
    : /\b(void|int|double|float|char|bool|class|struct|template|typename|std|vector|return|if|else|for|while|throw|try|catch|const|auto|virtual|override|public|private|protected)\b/g;

  const strings = /(["'`])(.*?)\1/g;
  const comments = /(\/\/.*|#.*)/g;
  const functions = /\b([a-zA-Z_]\w*)(?=\()/g;

  const lines = code.split("\n");

  return (
    <pre className="font-mono text-[11px] leading-5 text-muted-foreground select-text overflow-x-auto p-4 bg-background/30 sm:text-xs">
      {lines.map((line, i) => {
        let html = line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // Syntax highlighting transformations
        html = html.replace(comments, '<span class="text-subtle font-normal italic">$1</span>');
        html = html.replace(keywords, '<span class="text-accent-violet font-medium">$1</span>');
        html = html.replace(functions, '<span class="text-accent">$1</span>');
        html = html.replace(strings, '<span class="text-green-500/80">$1$2$1</span>');

        return (
          <div key={i} className="table-row">
            <span className="table-cell text-right pr-4 select-none opacity-30 text-[10px] w-6">{i + 1}</span>
            <span className="table-cell" dangerouslySetInnerHTML={{ __html: html || " " }} />
          </div>
        );
      })}
    </pre>
  );
}

export function ProjectExpanded({ project, onClose, onNext, onPrev }: ProjectExpandedProps) {
  const [copied, setCopied] = React.useState(false);
  const [expandedAsset, setExpandedAsset] = React.useState<"diagram" | "image" | null>(null);

  // Setup Back Button interception
  React.useEffect(() => {
    window.history.pushState({ projectOpen: project.id }, "");

    const handlePopState = (e: PopStateEvent) => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    
    // Prevent body scrolling
    document.body.style.overflow = "hidden";

    // Setup ESC Key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expandedAsset) {
          setExpandedAsset(null);
        } else {
          handleClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project.id, expandedAsset]);

  const handleClose = () => {
    if (window.history.state?.projectOpen === project.id) {
      window.history.back();
    } else {
      onClose();
    }
  };

  const copyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/70 backdrop-blur-md animate-in fade-in-0 duration-300">
      
      {/* Fullscreen Overlay Window */}
      <article 
        className="relative flex h-full w-full max-w-6xl flex-col bg-background md:h-[90vh] md:rounded-2xl border border-border-strong shadow-elevated overflow-hidden animate-in zoom-in-98 duration-300 outline-none"
        role="dialog"
        aria-modal="true"
      >
        
        {/* STICKY HEADER */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface-2/90 backdrop-blur-md px-4 sm:px-6 select-none">
          {/* Left Side: Name + Status */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground hidden sm:inline">
              Case Study
            </span>
            <div className="hidden h-4 w-px bg-border-strong sm:block" />
            <h1 className="text-base font-semibold tracking-tight text-foreground truncate max-w-[150px] sm:max-w-xs">
              {project.name}
            </h1>
            <span className="chip text-[10px] scale-90 origin-left">
              <span 
                className="inline-block h-1.5 w-1.5 rounded-full" 
                style={{ 
                  background: project.status === "Ongoing" 
                    ? "var(--accent)" 
                    : project.status === "Research" 
                      ? "var(--accent-violet)" 
                      : "oklch(0.75 0.15 150)" 
                }} 
              />
              {project.status}
            </span>
          </div>

          {/* Center Side: Direct Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-elevated hover:text-foreground transition-colors cursor-pointer"
              title="Previous project"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-[10px] text-subtle px-1">
              Navigate
            </span>
            <button
              onClick={onNext}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-elevated hover:text-foreground transition-colors cursor-pointer"
              title="Next project"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right Side: GitHub + Close */}
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            
            <button
              onClick={handleClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-elevated hover:text-foreground transition-colors cursor-pointer"
              title="Close case study (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-8 sm:px-8 md:px-12 space-y-12 animate-fade-in">
          
          {/* HERO BANNER SECTION */}
          <section className="relative overflow-hidden rounded-xl border border-border-strong bg-surface p-6 sm:p-10 md:p-12">
            {/* Mesh gradient effect */}
            <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {project.id === "tinystories-17m" ? "Research Publication" : "System Overview"}
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl text-foreground leading-[1.1]">
                {project.name}
              </h2>
              <p className="mt-3 text-lg font-light text-muted-foreground">
                {project.tagline}
              </p>
              <p className="mt-6 text-base text-foreground/80 leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
          </section>

          {/* KEY METRICS GRID */}
          <section className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {project.id === "tinystories-17m" ? "Core Model Specifications" : "Performance Indicators & Metrics"}
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="card-panel p-5 flex flex-col justify-between min-h-[100px]">
                  <div className="text-3xl font-semibold tracking-tight text-accent">
                    {metric.value}
                  </div>
                  <div className="text-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-2">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PLATFORMS GRID (For TurboLLM systems) */}
          {project.platforms && (
            <section className="space-y-4 pt-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Supported Platforms & Hardware Benchmarks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.platforms.map((platform) => (
                  <div key={platform.name} className="card-panel p-5 flex flex-col justify-between min-h-[140px] bg-surface-2/20">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{platform.name}</h4>
                      <p className="text-[10px] text-mono text-subtle mt-1 truncate" title={platform.model}>
                        {platform.model}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {platform.specs.map(spec => (
                          <span key={spec} className="text-[9px] font-mono px-2 py-0.5 border border-border bg-background rounded text-muted-foreground">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 border-t border-hairline pt-3 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Throughput:</span>
                      <span className="font-mono font-bold text-accent">{platform.throughput}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DUAL COLUMN CASE STUDY DATA */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
            
            {/* Left Column - Main Details */}
            <div className="space-y-12">
              
              {/* RESEARCH BACKGROUND: For TinyStories-17M publication */}
              {project.id === "tinystories-17m" && (
                <section className="space-y-4 border-b border-hairline pb-8">
                  <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    Research Context: The TinyStories Premise
                  </h4>
                  <div className="text-sm leading-relaxed text-muted-foreground space-y-4">
                    <p>
                      The <strong>TinyStories</strong> paper (Eldan & Li, 2023) challenged the assumption that language models require billions of parameters to generate coherent English. By training models on synthetic stories generated by GPT-3.5/4 with a vocabulary restricted to that of a typical 3-to-4-year-old child, they demonstrated that models with as few as 10M parameters can produce grammatically perfect, structured, and logical narratives.
                    </p>
                    <p>
                      This project reproduces and explores that research by training a 17.2M parameter decoder-only transformer from scratch on 2.1 million stories. It serves as a first-principles exercise in building tokenizers, designing transformer blocks, understanding learning rate annealing, and observing emergent language capability under constrained parameters.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a 
                        href="https://arxiv.org/abs/2305.07759" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-mono"
                      >
                        TinyStories Paper <ExternalLink className="h-3 w-3" />
                      </a>
                      <span className="text-subtle">·</span>
                      <a 
                        href="https://huggingface.co/datasets/roneneldan/TinyStories" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-mono"
                      >
                        Dataset <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </section>
              )}

              {/* Motivation & Problem Statement */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    Project Motivation
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.motivation}
                  </p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-destructive/80">
                    <Cpu className="h-3.5 w-3.5" />
                    Problem Statement
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.problemStatement}
                  </p>
                </div>
              </section>

              {/* MODEL ARCHITECTURE SECTION */}
              {project.id === "tinystories-17m" ? (
                <section className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Model Dimensions & Architecture Spec
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { title: "Model Class", value: "Decoder-only Transformer", desc: "GPT-style causal architecture" },
                      { title: "Total Parameters", value: "17,234,304", desc: "Fully trained from scratch" },
                      { title: "Transformer Layers", value: "8 Layers", desc: "Depth dimension blocks" },
                      { title: "Hidden Size (d_model)", value: "384", desc: "Attention feature channels" },
                      { title: "Attention Heads", value: "6 Heads", desc: "64-dimension per attention head" },
                      { title: "MLP Expansion (d_ff)", value: "1024", desc: "SwiGLU gated projection size" },
                      { title: "Position Encodings", value: "RoPE", desc: "Rotary Position Embeddings" },
                      { title: "Normalization", value: "RMSNorm", desc: "Pre-Layer normalization paths" },
                      { title: "Attention Type", value: "Flash SDPA", desc: "Scale Dot-Product compatible" },
                    ].map((card) => (
                      <div key={card.title} className="p-4 rounded-lg border border-border bg-surface-2/10 flex flex-col justify-between min-h-[90px]">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-subtle">{card.title}</span>
                        <span className="text-sm font-semibold text-foreground mt-1.5">{card.value}</span>
                        <span className="text-[10px] text-muted-foreground mt-1">{card.desc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <section className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Architecture & Flow
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.architectureDesc}
                  </p>
                  
                  {project.architectureDiagram && (
                    <div className="relative">
                      <div 
                        onClick={() => setExpandedAsset("diagram")}
                        className="group relative cursor-zoom-in overflow-hidden rounded-lg border border-border bg-surface p-4 sm:p-6 font-mono text-[10px] sm:text-xs leading-5 text-muted-foreground select-none"
                      >
                        <pre className="overflow-x-auto whitespace-pre">
                          {project.architectureDiagram}
                        </pre>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                          <span className="rounded-md bg-background/90 px-3 py-1.5 text-xs text-foreground font-sans border border-border shadow opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to Expand Diagram
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Training Flow (For TinyStories-17M) */}
              {project.id === "tinystories-17m" && (
                <section className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    End-to-End Training Pipeline Flow
                  </h4>
                  <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 p-4 rounded-lg border border-border bg-surface-2/15 overflow-x-auto">
                    {[
                      { step: "1. Dataset", desc: "2.1M synthetic stories load (Parquet format)" },
                      { step: "2. Tokenizer", desc: "SentencePiece BPE vocab trained (vocab=8000)" },
                      { step: "3. Preprocess", desc: "Tokenization & sequence caching to binary files" },
                      { step: "4. Training", desc: "BF16 Mixed Precision on single GPU with AdamW" },
                      { step: "5. Checkpoints", desc: "Periodic metrics logging & weights export" },
                      { step: "6. Evaluation", desc: "Validation loss + GPT-assisted qualitative checks" },
                      { step: "7. Export", desc: "Save tokenizer config & model weights to HF Hub" },
                    ].map((item, idx) => (
                      <div key={item.step} className="flex-1 min-w-[120px] flex flex-col justify-between p-3 rounded border border-border bg-background relative text-center">
                        {idx < 6 && (
                          <span className="hidden md:block absolute -right-3.5 top-[40%] translate-y-[-50%] text-subtle text-xs z-10 font-bold">
                            ➔
                          </span>
                        )}
                        {idx < 6 && (
                          <span className="block md:hidden absolute left-[50%] -bottom-4 translate-x-[-50%] text-subtle text-[10px] z-10 font-bold">
                            ▼
                          </span>
                        )}
                        <span className="text-xs font-semibold text-accent">{item.step}</span>
                        <p className="text-[9px] text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Technical Implementation */}
              <section className="space-y-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Technical Implementation
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.technicalImplementation}
                </p>

                {/* Code Snippet Box */}
                {project.codeSnippet && (
                  <div className="overflow-hidden rounded-lg border border-border-strong bg-surface">
                    {/* IDE Top Bar */}
                    <div className="flex items-center justify-between border-b border-border-strong bg-surface-2 px-4 py-2 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="text-mono ml-2 text-[10px] text-muted-foreground">
                          {project.codeSnippet.filename} ({project.codeSnippet.language})
                        </span>
                      </div>
                      <button
                        onClick={copyCode}
                        className="inline-flex h-6 items-center gap-1 rounded border border-border px-2 text-[10px] font-mono text-muted-foreground hover:bg-elevated hover:text-foreground transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                    {/* IDE Code Panel */}
                    <HighlightedCode code={project.codeSnippet.code} language={project.codeSnippet.language} />
                  </div>
                )}
              </section>

              {/* Model Comparison Table */}
              {project.modelComparison && (
                <section className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Model Architecture & Parameter Comparison
                  </h4>
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-left text-xs text-muted-foreground border-collapse">
                      <thead className="bg-surface-2/85 font-mono text-[10px] uppercase tracking-wider text-subtle border-b border-border select-none">
                        <tr>
                          <th className="px-4 py-3 font-semibold text-foreground">Model Variant</th>
                          <th className="px-4 py-3 font-semibold text-foreground">Test Accuracy</th>
                          <th className="px-4 py-3 font-semibold text-foreground">Parameter Size</th>
                          <th className="px-4 py-3 font-semibold text-foreground">Primary Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline bg-background/20">
                        {project.modelComparison.map((row) => (
                          <tr key={row.name} className="hover:bg-surface/30 transition-colors">
                            <td className="px-4 py-3 font-semibold text-foreground">{row.name}</td>
                            <td className="px-4 py-3 font-mono text-accent">{row.accuracy}</td>
                            <td className="px-4 py-3 font-mono">{row.parameters}</td>
                            <td className="px-4 py-3">{row.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Training Configurations (For TinyStories-17M) */}
              {project.trainingConfig && (
                <section className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Training Hyperparameters & Run Config
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {project.trainingConfig.map((config) => (
                      <div key={config.label} className="p-4 rounded-lg border border-border bg-surface flex flex-col justify-between min-h-[85px]">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-subtle">{config.label}</span>
                        <span className="text-xs font-semibold text-foreground mt-2 truncate" title={config.value}>{config.value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Story Generation Examples (For TinyStories-17M) */}
              {project.generationExamples && (
                <section className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Interactive Generation Samples
                  </h4>
                  <div className="space-y-4">
                    {project.generationExamples.map((ex, idx) => (
                      <div key={idx} className="rounded-lg border border-border bg-surface overflow-hidden">
                        <div className="border-b border-border bg-surface-2 px-4 py-2 flex items-center justify-between select-none">
                          <span className="font-mono text-[10px] text-accent font-semibold">Story Prompt {idx + 1}</span>
                          <span className="text-[9px] font-mono text-subtle">Completed by Model</span>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="bg-background/40 p-3 rounded border border-hairline font-mono text-xs text-muted-foreground">
                            <span className="text-accent-violet select-none">Prompt: </span>
                            {ex.prompt}
                          </div>
                          <div className="text-sm leading-relaxed text-foreground pl-1.5 border-l-2 border-accent">
                            {ex.output}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Benchmark Image & Throughput Evolution (For TurboLLM system) */}
              {project.benchmarkImage && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  {/* Left block: Graph */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Inference Benchmarks Chart
                    </h4>
                    <div 
                      onClick={() => setExpandedAsset("image")}
                      className="group relative cursor-zoom-in overflow-hidden rounded-lg border border-border bg-surface p-2"
                    >
                      <img 
                        src={project.benchmarkImage} 
                        alt="Performance Graph" 
                        className="w-full h-auto object-contain rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/45 transition-colors">
                        <span className="rounded-md bg-background/95 px-3 py-1.5 text-xs text-foreground font-sans border border-border shadow opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to Expand Chart
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Timeline */}
                  {project.evolution && (
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Optimization Throughput Evolution
                      </h4>
                      <div className="relative border-l border-border-strong pl-6 ml-3 space-y-5 py-1">
                        {project.evolution.map((step) => {
                          const percent = (step.throughput / 2.30) * 100;
                          return (
                            <div key={step.version} className="relative group">
                              {/* Timeline Dot */}
                              <span className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent group-hover:scale-125 transition-transform" />
                              
                              <div className="flex items-center justify-between gap-3 text-xs">
                                <div>
                                  <h5 className="font-semibold text-foreground">{step.version}</h5>
                                  {step.description && (
                                    <p className="text-[10px] text-muted-foreground">{step.description}</p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <div className="w-16 h-1 bg-surface-2 rounded-full overflow-hidden hidden sm:block">
                                    <div className="bg-accent h-full rounded-full" style={{ width: `${percent}%` }} />
                                  </div>
                                  <span className="font-mono font-semibold text-accent w-16 text-right">
                                    {step.throughput.toFixed(2)} t/s
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Research Evaluation methodology & Known Limitations (For TinyStories-17M) */}
              {project.id === "tinystories-17m" && (
                <div className="space-y-12">
                  
                  {/* Evaluation */}
                  <section className="space-y-4">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Evaluation Methodology & Metrics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-muted-foreground">
                      <div className="space-y-3">
                        <h5 className="font-mono text-xs uppercase text-accent font-semibold">Quantitative Validation</h5>
                        <p>
                          The model completed training with a final validation cross-entropy loss of <strong>1.18</strong>, indicating strong predictive modeling of the target token distributions. Evaluation was run continuously on a held-out dataset of 5% of the synthetic stories.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h5 className="font-mono text-xs uppercase text-accent-violet font-semibold">Qualitative Evaluation</h5>
                        <p>
                          Beyond raw validation loss, we conducted manual inspection and qualitative reviews. GPT-4 was prompted to grade sample story completions on three metrics: <em>Grammar</em>, <em>Plot Coherence</em>, and <em>Instruction Adherence</em>. The model scored ~92% on grammar correctness and ~84% on basic logical story consistency (under 200 tokens). Note that these are qualitative evaluations rather than standardized benchmarks.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Limitations */}
                  {project.limitations && (
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Known Limitations
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.limitations.map((limit, idx) => (
                          <div key={idx} className="flex gap-2.5 p-3 rounded-lg border border-border bg-surface-2/10 text-xs text-muted-foreground">
                            <span className="text-destructive font-mono font-bold select-none">[!]</span>
                            <span>{limit}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Lessons Learned */}
                  {project.lessons && (
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Lessons Learned & Reflections
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.lessons.map((lesson) => (
                          <div key={lesson.title} className="p-5 rounded-lg border border-border bg-surface flex flex-col justify-between">
                            <div>
                              <h5 className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono">{lesson.title}</h5>
                              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{lesson.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                </div>
              )}

              {/* Features & Challenges (For systems engineering projects) */}
              {project.id !== "tinystories-17m" && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Key Highlights
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {project.keyFeatures.map((feat) => (
                        <li key={feat} className="flex gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-mono text-[11px] uppercase tracking-wider text-destructive/80">
                        Challenge Encountered
                      </h5>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.challenges}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-hairline">
                      <h5 className="font-mono text-[11px] uppercase tracking-wider text-green-500/80">
                        Solution & Optimization
                      </h5>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {project.solutions}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Future Roadmap */}
              <section className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Future Roadmap
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.futureWork}
                </p>
              </section>

            </div>

            {/* Right Column - Meta Panel */}
            <aside className="space-y-8 border-t border-border lg:border-t-0 lg:border-l lg:pl-8 pt-8 lg:pt-0">
              
              {/* Stack */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="chip text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supported Models List (For TurboLLM system) */}
              {project.id === "turbollm" && (
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                    Supported Models
                  </h4>
                  <ul className="space-y-2 text-[10px] font-mono text-muted-foreground">
                    <li className="p-2 border border-border bg-surface rounded truncate" title="Qwen/Qwen3-30B-A3B-Instruct-2507-FP8">
                      Qwen3-30B-A3B-Instruct
                    </li>
                    <li className="p-2 border border-border bg-surface rounded truncate" title="Qwen/Qwen3.6-35B-A3B-FP8">
                      Qwen3.6-35B-A3B-FP8
                    </li>
                  </ul>
                </div>
              )}

              {/* Inspirations / Papers */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Inspirations & Research
                </h4>
                <ul className="space-y-2">
                  {project.inspirations.map((insp) => (
                    <li key={insp.title}>
                      {insp.link ? (
                        <a
                          href={insp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronRight className="h-3 w-3 text-accent group-hover:translate-x-0.5 transition-transform" />
                          <span className="truncate max-w-[200px]" title={insp.title}>{insp.title}</span>
                          <ExternalLink className="h-2.5 w-2.5 opacity-60 shrink-0" />
                        </a>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <ChevronRight className="h-3 w-3 text-accent" />
                          <span className="truncate max-w-[200px]" title={insp.title}>{insp.title}</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3 pt-6 border-t border-hairline">
                <h4 className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Links & Actions
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 items-center justify-center gap-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>

                  {project.huggingfaceUrl && (
                    <a
                      href={project.huggingfaceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-foreground text-sm font-medium hover:bg-elevated transition-colors"
                    >
                      <Sparkles className="h-4 w-4 text-accent" />
                      <span>View Model (HF)</span>
                    </a>
                  )}

                  {project.id === "tinystories-17m" && (
                    <>
                      <a
                        href="https://arxiv.org/abs/2305.07759"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-foreground text-sm font-medium hover:bg-elevated transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 text-accent" />
                        <span>TinyStories Paper</span>
                      </a>
                      <a
                        href="https://huggingface.co/datasets/roneneldan/TinyStories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-foreground text-sm font-medium hover:bg-elevated transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 text-accent-violet" />
                        <span>Dataset</span>
                      </a>
                    </>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-foreground text-sm font-medium hover:bg-elevated transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 text-accent-violet" />
                      <span>Live Sandbox</span>
                    </a>
                  )}
                </div>
              </div>

            </aside>
          </div>

          {/* PROJECT NAV FOOTER */}
          <footer className="border-t border-border pt-8 pb-4 flex items-center justify-between">
            <button
              onClick={onPrev}
              className="group flex flex-col items-start gap-1 text-left cursor-pointer"
            >
              <span className="font-mono text-[10px] text-subtle uppercase tracking-wider flex items-center gap-1">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                Previous Project
              </span>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Back in index
              </span>
            </button>
            
            <button
              onClick={onNext}
              className="group flex flex-col items-end gap-1 text-right cursor-pointer"
            >
              <span className="font-mono text-[10px] text-subtle uppercase tracking-wider flex items-center gap-1">
                Next Project
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Read next study
              </span>
            </button>
          </footer>

        </div>
      </article>

      {/* EXPANDED DIAGRAM OR IMAGE MAXIMIZER */}
      {expandedAsset && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => setExpandedAsset(null)}
        >
          <button 
            className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-surface border border-border text-foreground hover:bg-elevated cursor-pointer"
            onClick={() => setExpandedAsset(null)}
          >
            <X className="h-5 w-5" />
          </button>
          
          {expandedAsset === "diagram" && project.architectureDiagram && (
            <div 
              className="max-w-4xl w-full rounded-lg border border-border-strong bg-surface p-6 sm:p-10 font-mono text-xs sm:text-sm leading-6 text-foreground overflow-x-auto shadow-2xl select-text"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-mono text-[10px] text-subtle mb-4 pb-2 border-b border-hairline uppercase tracking-widest">
                Architecture Layout — Zoomed
              </div>
              <pre className="whitespace-pre">
                {project.architectureDiagram}
              </pre>
            </div>
          )}

          {expandedAsset === "image" && project.benchmarkImage && (
            <div 
              className="max-w-4xl w-full rounded-lg border border-border-strong bg-surface p-4 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-mono text-[10px] text-subtle mb-3 pb-2 border-b border-hairline uppercase tracking-widest">
                Benchmark Comparison — Zoomed
              </div>
              <img 
                src={project.benchmarkImage} 
                alt="Maximised Graph" 
                className="w-full h-auto max-h-[80vh] object-contain rounded"
              />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
