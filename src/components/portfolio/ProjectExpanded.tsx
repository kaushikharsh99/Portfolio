import * as React from "react";
import { ProjectDetail } from "./projectData";
import { X, ArrowLeft, ArrowRight, Github, ExternalLink, Cpu, Sparkles, CheckCircle2, ChevronRight, Play, Terminal, Database, Check, Layers, AlertTriangle } from "lucide-react";
import { TechChip } from "./Projects";

interface ProjectExpandedProps {
  project: ProjectDetail;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

// 1. SELF-TYPING TERMINAL SIMULATOR
function InteractiveTerminal({ command, logText }: { command: string; logText: string }) {
  const [lines, setLines] = React.useState<string[]>([]);
  const [typedCommand, setTypedCommand] = React.useState("");
  const logLines = React.useMemo(() => logText.split("\n"), [logText]);

  React.useEffect(() => {
    setLines([]);
    setTypedCommand("");
    
    // Animate command typing
    let cmdIdx = 0;
    const cmdInterval = setInterval(() => {
      if (cmdIdx < command.length) {
        setTypedCommand((prev) => prev + command[cmdIdx]);
        cmdIdx++;
      } else {
        clearInterval(cmdInterval);
        // Start streaming logs after command is typed
        let logIdx = 0;
        const logInterval = setInterval(() => {
          if (logIdx < logLines.length) {
            setLines((prev) => [...prev, logLines[logIdx]]);
            logIdx++;
          } else {
            clearInterval(logInterval);
          }
        }, 150);
      }
    }, 20);

    return () => {
      clearInterval(cmdInterval);
    };
  }, [command, logLines]);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-elevated select-none">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-border-strong/60" />
        <span className="text-mono ml-3 text-[10px] text-muted-foreground flex items-center gap-1">
          <Terminal className="h-3 w-3 text-accent" />
          interactive_session.sh
        </span>
      </div>
      <div className="p-4 font-mono text-[11px] leading-5 text-muted-foreground bg-background/25">
        <div className="flex items-center gap-1">
          <span className="text-accent">$</span>
          <span className="text-foreground">{typedCommand}</span>
          <span className="inline-block h-4 w-1.5 bg-accent animate-pulse" />
        </div>
        <div className="mt-3 space-y-1">
          {lines.map((line, idx) => (
            <div key={idx} className="animate-fade-in text-[10px] leading-relaxed truncate">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. TURBO-LLM HIERARCHICAL MEMORY & ROUTING SIMULATOR
function TurboLLMSimulator() {
  const [activeStep, setActiveStep] = React.useState<"idle" | "disk" | "host" | "gpu">("idle");
  const [activeExpert, setActiveExpert] = React.useState<number | null>(null);
  const [logs, setLogs] = React.useState<string[]>([]);
  const [vramUsage, setVramUsage] = React.useState(0);

  const triggerStep = () => {
    if (activeStep === "idle") {
      setActiveStep("disk");
      setActiveExpert(Math.floor(Math.random() * 4) + 1);
      setLogs(["[init] Inference query received.", "[SSD] Streaming active Layer weights..."]);
      setVramUsage(0.8);
    } else if (activeStep === "disk") {
      setActiveStep("host");
      setLogs((prev) => [...prev, "[RAM] Experts loaded in Host memory cache."]);
      setVramUsage(2.4);
    } else if (activeStep === "host") {
      setActiveStep("gpu");
      setLogs((prev) => [...prev, `[VRAM] Expert E${activeExpert} loaded into VRAM GPU Cache slots.`]);
      setVramUsage(5.4);
    } else {
      setActiveStep("idle");
      setActiveExpert(null);
      setLogs([]);
      setVramUsage(0);
    }
  };

  return (
    <div className="card-panel p-5 bg-surface-2/10 border border-border space-y-5">
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <h5 className="font-mono text-xs text-foreground uppercase tracking-wider">MoE Offloading Simulator</h5>
        <button 
          onClick={triggerStep}
          className="flex h-7 items-center justify-center gap-1.5 px-3 rounded bg-accent text-background text-[10px] font-mono hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Play className="h-3 w-3" />
          <span>{activeStep === "idle" ? "Initialize Run" : activeStep === "gpu" ? "evict / reset" : "stream step"}</span>
        </button>
      </div>

      {/* Memory Nodes */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {/* SSD Storage */}
        <div className={`p-3 rounded border text-xs flex flex-col justify-between min-h-[90px] transition-colors ${
          activeStep === "disk" ? "border-accent bg-accent/5" : "border-border bg-background/20"
        }`}>
          <span className="font-mono text-[9px] text-subtle uppercase">SSD (Disk)</span>
          <span className="text-[10px] text-muted-foreground mt-2">Inactive Weights</span>
          <div className="flex justify-center gap-1 mt-2">
            {[1, 2, 3, 4].map(idx => (
              <span key={idx} className={`h-4 w-5 text-[8px] font-mono rounded flex items-center justify-center border ${
                activeExpert === idx && activeStep === "disk" ? "bg-accent text-background border-accent" : "border-hairline"
              }`}>E{idx}</span>
            ))}
          </div>
        </div>

        {/* Host CPU RAM */}
        <div className={`p-3 rounded border text-xs flex flex-col justify-between min-h-[90px] transition-colors ${
          activeStep === "host" ? "border-accent bg-accent/5" : "border-border bg-background/20"
        }`}>
          <span className="font-mono text-[9px] text-subtle uppercase">Host (RAM)</span>
          <span className="text-[10px] text-muted-foreground mt-2">Buffered Cache</span>
          <div className="flex justify-center gap-1 mt-2">
            {[1, 2, 3, 4].map(idx => (
              <span key={idx} className={`h-4 w-5 text-[8px] font-mono rounded flex items-center justify-center border ${
                activeExpert === idx && activeStep === "host" ? "bg-accent text-background border-accent" : "border-hairline"
              }`}>E{idx}</span>
            ))}
          </div>
        </div>

        {/* GPU VRAM */}
        <div className={`p-3 rounded border text-xs flex flex-col justify-between min-h-[90px] transition-colors ${
          activeStep === "gpu" ? "border-accent bg-accent/5" : "border-border bg-background/20"
        }`}>
          <span className="font-mono text-[9px] text-subtle uppercase">GPU (VRAM)</span>
          <span className="text-[10px] text-muted-foreground mt-2">Active slots</span>
          <div className="flex justify-center gap-1 mt-2">
            {activeExpert && activeStep === "gpu" ? (
              <span className="h-4 w-8 text-[9px] font-mono bg-accent text-background border border-accent rounded flex items-center justify-center">E{activeExpert}</span>
            ) : (
              <span className="h-4 w-10 text-[8px] font-mono text-subtle border border-hairline border-dashed rounded flex items-center justify-center">Empty</span>
            )}
          </div>
        </div>
      </div>

      {/* Simulator Metrics */}
      <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-hairline pt-3">
        <div>
          <span className="text-subtle">VRAM Allocation:</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
              <div className="bg-accent h-full transition-all duration-300" style={{ width: `${(vramUsage/6.0)*100}%` }} />
            </div>
            <span>{vramUsage.toFixed(1)} GB / 6.0 GB</span>
          </div>
        </div>
        <div className="pl-4 border-l border-hairline">
          <span className="text-subtle">Inference Event Log:</span>
          <div className="text-[10px] text-muted-foreground mt-1 space-y-1 min-h-[40px] max-h-[60px] overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. TINYSTORIES PRETRAINING PIPELINE WIZARD
function TinyStoriesWizard() {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const steps = [
    { label: "1. Tokenizer", title: "SentencePiece Vocab Builder", desc: "Builds a custom 8,000 token BPE dictionary using a child-level English stories subset to maximize character density per block." },
    { label: "2. Dataset", title: "Sequence Packing & Curation", desc: "Indices 2.1M synthetic story Parquet files, organizing sequences to match context limits (512 tokens) with zero padding overheads." },
    { label: "3. Training", title: "AdamW SFT Configuration", desc: "Loads model parameters using BF16 mixed precision. Employs 2,000 warm-up steps with learning rate cosine decay to prevent gradient spikes." },
    { label: "4. Transformer", title: "RMSNorm & SwiGLU MLP Block", desc: "Processes inputs causal-attention mappings, applying Rotary Position Embeddings (RoPE) and RMSNorm pre-layer bounds for numerical stability." },
    { label: "5. Evaluation", title: "Qualitative Validation Checks", desc: "Calculates held-out cross-entropy validation loss targets (converged to 1.18) and evaluates story formatting structures." },
    { label: "6. HF Export", title: "Publishing Model weights", desc: "Compiles config structures and publishes GGUF model files directly to Hugging Face registries for local execution." }
  ];

  return (
    <div className="card-panel p-5 bg-surface-2/10 border border-border space-y-5">
      <h5 className="font-mono text-xs text-foreground uppercase tracking-wider border-b border-hairline pb-2">Pretraining Wizard</h5>
      
      {/* Wizard Steps Navigation */}
      <div className="flex flex-wrap gap-2 select-none">
        {steps.map((step, idx) => (
          <button
            key={step.label}
            onClick={() => setActiveTab(idx)}
            className={`text-mono text-[9px] uppercase px-2 py-1 rounded border transition-all cursor-pointer ${
              activeTab === idx
                ? "bg-accent border-accent text-background font-semibold"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Step Detail Content */}
      <div className="p-4 rounded bg-background/30 border border-hairline min-h-[110px] animate-fade-in flex flex-col justify-between">
        <div>
          <h6 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {steps[activeTab].title}
          </h6>
          <p className="text-[11px] text-muted-foreground leading-relaxed mt-2">
            {steps[activeTab].desc}
          </p>
        </div>
        <div className="text-[9px] text-mono text-accent text-right mt-3">
          Step {activeTab + 1} of 6 in the pipeline
        </div>
      </div>
    </div>
  );
}

// 4. INDIAN LEGAL LLM DATASET REFINEMENT COMPARISON
function LegalLLMRefinement() {
  const [activeDataset, setActiveDataset] = React.useState<"v2" | "v3">("v3");

  return (
    <div className="card-panel p-5 bg-surface-2/10 border border-border space-y-4">
      <div className="flex items-center justify-between border-b border-hairline pb-2">
        <h5 className="font-mono text-xs text-foreground uppercase tracking-wider">Dataset Curation Inspector</h5>
        <div className="flex gap-2 select-none">
          <button
            onClick={() => setActiveDataset("v2")}
            className={`text-mono text-[9px] uppercase px-2 py-0.5 rounded border transition-all cursor-pointer ${
              activeDataset === "v2" ? "bg-destructive/10 border-destructive/20 text-destructive font-semibold" : "border-border text-muted-foreground"
            }`}
          >
            V2 (Verbose)
          </button>
          <button
            onClick={() => setActiveDataset("v3")}
            className={`text-mono text-[9px] uppercase px-2 py-0.5 rounded border transition-all cursor-pointer ${
              activeDataset === "v3" ? "bg-green-500/10 border-green-500/20 text-green-500 font-semibold" : "border-border text-muted-foreground"
            }`}
          >
            V3 (Grounded)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Dataset target structure sample */}
        <div className="p-3.5 rounded border border-hairline bg-background/25">
          <span className="text-[9px] text-accent uppercase block mb-1">Target Template Pattern</span>
          {activeDataset === "v2" ? (
            <p className="text-muted-foreground leading-relaxed italic">
              "The statutory code was established to govern the administration... (long description of historical context followed by hypothetical operational goals and policy significance details)."
            </p>
          ) : (
            <div className="space-y-1 text-foreground leading-snug">
              <div className="text-[10px] text-accent-violet">Section Summary ➔</div>
              <div className="text-[10px] text-accent-violet">Key Provision ➔</div>
              <div className="text-[10px] text-accent-violet">Brief Explanation ➔</div>
              <div className="text-[10px] text-accent-violet">Short Conclusion</div>
            </div>
          )}
        </div>

        {/* Model Output Impact */}
        <div className="p-3.5 rounded border border-hairline bg-background/25">
          <span className="text-[9px] text-accent uppercase block mb-1">Evaluation Evaluation</span>
          {activeDataset === "v2" ? (
            <div className="space-y-1">
              <span className="text-destructive font-semibold flex items-center gap-1 text-[10px]">
                <AlertTriangle className="h-3.5 w-3.5" /> High Hallucination Rate
              </span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Model learns answer *style* instead of facts. Emits broad significance statements and incorrect details to fill templates.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-green-500 font-semibold flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="h-3.5 w-3.5" /> High Factual Grounding
              </span>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Model is bound to facts. Outputs stay close to the statutory codes and do not speculate beyond context limits.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 5. MATH-INSTRUCT SOLVER SIMULATOR
function MathInstructSimulator() {
  const [selectedTask, setSelectedTask] = React.useState<number>(0);
  const [running, setRunning] = React.useState(false);
  const [outputLines, setOutputLines] = React.useState<string[]>([]);

  const tasks = [
    { problem: "Solve: 12x + 5 = 29", base: "12x plus 5 is 29. The number is 2 because 12*2=24, and 24+5=29.", sft: ["Subtract 5 from both sides: 12x = 24.", "Divide by 12: x = 2.", "Conclusion: The value of x is 2."] },
    { problem: "Solve: x^2 - 9 = 0", base: "x squared is nine. The answer can be three because three times three is nine.", sft: ["Add 9 to both sides: x^2 = 9.", "Take square root: x = ±√9.", "Conclusion: x = 3 or x = -3."] }
  ];

  const runSimulation = () => {
    setRunning(true);
    setOutputLines([]);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < tasks[selectedTask].sft.length) {
        setOutputLines((prev) => [...prev, tasks[selectedTask].sft[idx]]);
        idx++;
      } else {
        clearInterval(interval);
        setRunning(false);
      }
    }, 400);
  };

  return (
    <div className="card-panel p-5 bg-surface-2/10 border border-border space-y-4">
      <div className="flex items-center justify-between border-b border-hairline pb-2">
        <h5 className="font-mono text-xs text-foreground uppercase tracking-wider">SFT Reasoning Solver</h5>
        <div className="flex gap-2 select-none">
          {tasks.map((t, idx) => (
            <button
              key={idx}
              onClick={() => { setSelectedTask(idx); setOutputLines([]); }}
              className={`text-mono text-[9px] uppercase px-2 py-0.5 rounded border cursor-pointer ${
                selectedTask === idx ? "bg-accent border-accent text-background font-semibold" : "border-border text-muted-foreground"
              }`}
            >
              Task {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-background/25 rounded border border-hairline text-xs font-mono">
        <span className="text-[9px] text-accent-violet block">Problem Input</span>
        <div className="text-foreground font-semibold mt-1">{tasks[selectedTask].problem}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Baseline Output */}
        <div className="p-3.5 rounded border border-destructive/20 bg-destructive/5">
          <span className="text-[9px] text-destructive uppercase block mb-1.5 font-bold">Qwen3-0.6B Base Output</span>
          <p className="text-muted-foreground leading-relaxed italic">
            "{tasks[selectedTask].base}"
          </p>
        </div>

        {/* Aligned Output */}
        <div className="p-3.5 rounded border border-green-500/20 bg-green-500/5 flex flex-col justify-between min-h-[90px]">
          <div>
            <span className="text-[9px] text-green-500 uppercase block mb-1.5 font-bold">MathInstruct v1 Output</span>
            <div className="space-y-1 text-foreground leading-relaxed">
              {outputLines.map((line, idx) => (
                <div key={idx} className="animate-fade-in">➔ {line}</div>
              ))}
            </div>
          </div>
          {outputLines.length === 0 && (
            <button
              onClick={runSimulation}
              disabled={running}
              className="mt-3 flex h-7 items-center justify-center gap-1.5 px-3 rounded bg-accent text-background text-[10px] font-mono hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              <span>Solve Problem</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 6. SPAM-DETECTION COMPRESSION & DISTILLATION BAR CHART
function SpamDistillationComparison() {
  const models = [
    { name: "Logistic Regression", accuracy: 95.30, params: 0.02, latency: 1.2 },
    { name: "Support Vector Machine", accuracy: 95.40, params: 0.02, latency: 1.4 },
    { name: "Deep Neural Teacher", accuracy: 98.38, params: 80.0, latency: 24.5 },
    { name: "Distilled Student", accuracy: 98.12, params: 2.0, latency: 1.8 }
  ];

  return (
    <div className="card-panel p-5 bg-surface-2/10 border border-border space-y-4">
      <h5 className="font-mono text-xs text-foreground uppercase tracking-wider border-b border-hairline pb-2">Distillation Tradeoff Matrix</h5>
      
      <div className="space-y-4">
        {models.map((m) => {
          const sizePercent = m.params === 80.0 ? 100 : m.params === 2.0 ? 25 : 5;
          const isStudent = m.name.includes("Distilled");
          return (
            <div key={m.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={`font-semibold ${isStudent ? "text-accent" : "text-foreground"}`}>{m.name}</span>
                <span className="text-subtle text-[11px]">Accuracy: <strong className="text-foreground">{m.accuracy}%</strong></span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-muted-foreground">
                {/* Parameter footprint bar */}
                <div className="flex items-center gap-2">
                  <span className="w-16 shrink-0 text-subtle">Parameters:</span>
                  <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${isStudent ? "bg-accent" : "bg-muted-foreground"}`} style={{ width: `${sizePercent}%` }} />
                  </div>
                  <span className="w-12 text-right">{m.params}M</span>
                </div>
                {/* Latency bar */}
                <div className="flex items-center gap-2">
                  <span className="w-12 shrink-0 text-subtle font-mono">Latency:</span>
                  <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${isStudent ? "bg-accent-violet" : "bg-muted-foreground"}`} style={{ width: `${(m.latency/24.5)*100}%` }} />
                  </div>
                  <span className="w-12 text-right">{m.latency}ms</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectExpanded({ project, onClose, onNext, onPrev }: ProjectExpandedProps) {
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

  const isResearchStyle = project.id === "tinystories-17m" || project.id === "indian-legal-llm" || project.id === "mathinstruct-v1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-3 bg-black/70 backdrop-blur-md animate-in fade-in-0 duration-300">
      
      {/* Fullscreen Overlay Window */}
      <article 
        className="relative flex h-full w-full max-w-[96vw] flex-col bg-background md:h-[96vh] md:rounded-xl border border-border-strong shadow-elevated overflow-hidden animate-in zoom-in-98 duration-300 outline-none"
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
          <section className="relative overflow-hidden rounded-xl border border-border-strong bg-surface p-6 sm:p-10 md:p-12 animate-slide-up">
            {/* Mesh gradient effect */}
            <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {isResearchStyle ? "Research Publication" : "System Overview"}
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
          <section className="space-y-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {isResearchStyle ? "Core Model Specifications" : "Performance Indicators & Metrics"}
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

          {/* DUAL COLUMN CASE STUDY DATA */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 min-w-0">
            
            {/* Left Column - Main Details */}
            <div className="space-y-12 min-w-0 overflow-hidden">
              
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

              {/* MODEL ARCHITECTURE SECTION (Interactive Diagram Wrappers) */}
              <section className="space-y-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Architecture & Pipeline Simulation
                </h4>
                
                {/* Render corresponding interactive visualizer based on project ID */}
                {project.id === "turbollm" && <TurboLLMSimulator />}
                {project.id === "tinystories-17m" && <TinyStoriesWizard />}
                {project.id === "indian-legal-llm" && <LegalLLMRefinement />}
                {project.id === "mathinstruct-v1" && <MathInstructSimulator />}
                {project.id === "spam-detection" && <SpamDistillationComparison />}
              </section>

              {/* INTERACTIVE TIMELINE (For Indian Legal LLM SFT) */}
              {project.timeline && (
                <section className="space-y-4 pt-2">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Project Research Timeline & Journey
                  </h4>
                  <div className="relative border-l border-border-strong pl-6 ml-3 space-y-6 py-2">
                    {project.timeline.map((node) => (
                      <div key={node.title} className="relative group animate-fade-in">
                        {/* Timeline Dot */}
                        <span className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background transition-transform ${
                          node.status === "completed" 
                            ? "bg-green-500" 
                            : node.status === "current" 
                              ? "bg-accent animate-pulse" 
                              : "bg-surface border-border-strong"
                        }`} />
                        <div>
                          <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
                            {node.title}
                            {node.status === "current" && (
                              <span className="text-[9px] font-mono bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded text-accent font-semibold uppercase select-none">
                                Current Active
                              </span>
                            )}
                          </h5>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{node.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* MODEL SPEC CARDS GRID */}
              {isResearchStyle && (
                project.id === "tinystories-17m" ? (
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
                  project.modelVersions && (
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Model Iterations & Version Matrix
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.modelVersions.map((ver) => (
                          <div key={ver.version} className="card-panel p-5 bg-surface-2/20 border border-border">
                            <div className="flex items-center justify-between border-b border-hairline pb-2 mb-3">
                              <span className="font-semibold text-foreground text-sm">{ver.version}</span>
                              <span className="chip text-[10px]">{ver.format}</span>
                            </div>
                            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
                              <li><span className="text-subtle">Base Model:</span> {ver.baseModel} ({ver.size})</li>
                              <li><span className="text-subtle">Dataset:</span> {ver.dataset}</li>
                            </ul>
                            <p className="text-xs text-muted-foreground mt-3 leading-relaxed border-t border-hairline pt-3">
                              <span className="text-subtle font-mono block text-[10px] uppercase mb-1">Iteration Purpose:</span>
                              {ver.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )
                )
              )}

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

              {/* Training Configurations (For TinyStories-17M and Indian Legal LLM) */}
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

              {/* Benchmark Image & Throughput Evolution (For TurboLLM system / MathInstruct) */}
              {project.benchmarkImage && (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 animate-fade-in">
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
                              <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent group-hover:scale-125 transition-transform" />
                              
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

              {/* Research Evaluation & Iterations (For Indian Legal LLM SFT) */}
              {project.id === "indian-legal-llm" && (
                <div className="space-y-12">
                  
                  {/* Before vs After SFT */}
                  {project.beforeAfter && (
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Alignment Quality: Before vs After SFT
                      </h4>
                      <div className="space-y-4">
                        {project.beforeAfter.map((comp, idx) => (
                          <div key={idx} className="rounded-lg border border-border bg-surface overflow-hidden">
                            <div className="border-b border-border bg-surface-2 px-4 py-2 flex items-center justify-between select-none">
                              <span className="font-mono text-[10px] text-accent font-semibold">Legal Query {idx + 1}</span>
                            </div>
                            <div className="p-4 space-y-4">
                              <div className="bg-background/40 p-3 rounded border border-hairline font-mono text-xs text-muted-foreground">
                                <span className="text-accent-violet select-none">Prompt: </span>
                                {comp.query}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3.5 rounded bg-destructive/5 border border-destructive/20 text-xs">
                                  <span className="font-mono text-[10px] uppercase tracking-wider text-destructive font-semibold block mb-1">Base Model Output:</span>
                                  <p className="text-muted-foreground leading-relaxed italic">"{comp.before}"</p>
                                </div>
                                <div className="p-3.5 rounded bg-green-500/5 border border-green-500/20 text-xs">
                                  <span className="font-mono text-[10px] uppercase tracking-wider text-green-500 font-semibold block mb-1">Fine-tuned Model (SFT):</span>
                                  <p className="text-foreground leading-relaxed font-normal">"{comp.after}"</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Observed Improvements */}
                  {project.observedImprovements && (
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Observed Style Improvements
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.observedImprovements.map((imp) => (
                          <div key={imp} className="flex gap-2.5 p-3 rounded-lg border border-border bg-green-500/5 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{imp}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* What Went Wrong / Failures */}
                  {project.whatWentWrong && (
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Failure Analysis: Factual Limitations
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {project.whatWentWrong.map((fail) => (
                          <div key={fail.issue} className="p-5 rounded-lg border border-border bg-destructive/5 flex flex-col justify-between">
                            <div>
                              <h5 className="text-xs font-semibold text-foreground uppercase tracking-wider font-mono text-destructive">{fail.issue}</h5>
                              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{fail.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Key Takeaway Quote */}
                  {project.keyInsight && (
                    <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface-2/30 text-center space-y-3 relative overflow-hidden select-none">
                      <div className="absolute top-2 left-4 text-6xl text-accent font-serif opacity-15">“</div>
                      <blockquote className="text-lg sm:text-xl font-light text-foreground tracking-tight max-w-xl mx-auto italic">
                        "{project.keyInsight}"
                      </blockquote>
                      <cite className="font-mono text-[9px] uppercase tracking-wider text-subtle block">
                        Central Takeaway & Lesson
                      </cite>
                    </section>
                  )}

                  {/* Current Direction */}
                  {project.currentDirection && (
                    <section className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Current Research Direction (Dataset Refinements)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.currentDirection.map((dir, idx) => (
                          <div key={idx} className="flex gap-2.5 p-3 rounded-lg border border-border bg-surface-2/10 text-xs text-muted-foreground">
                            <span className="text-accent font-mono font-bold select-none">➔</span>
                            <span>{dir}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                </div>
              )}

              {/* Visualized logs / Terminal shell animation */}
              {project.terminalLog && (
                <section className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Runtime Session Output
                  </h4>
                  <InteractiveTerminal 
                    command={project.id === "turbollm" ? "turbo-llm --model Qwen/Qwen3.6-35B-A3B-FP8 --prompt \"Who is Donald Trump?\"" : "python train.py --distill"} 
                    logText={project.terminalLog} 
                  />
                </section>
              )}

              {/* Features & Challenges (For systems engineering projects) */}
              {!isResearchStyle && (
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
                    <TechChip key={tech} tech={tech} className="text-[11px]" />
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

                  {project.huggingfaceUrl && project.id !== "indian-legal-llm" && (
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

                  {project.id === "indian-legal-llm" && (
                    <>
                      <a
                        href="https://huggingface.co/kaushik-harsh-99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-foreground text-sm font-medium hover:bg-elevated transition-colors"
                      >
                        <Sparkles className="h-4 w-4 text-accent" />
                        <span>View Model V1 (0.5B)</span>
                      </a>
                      <a
                        href="https://huggingface.co/kaushik-harsh-99"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-foreground text-sm font-medium hover:bg-elevated transition-colors"
                      >
                        <Sparkles className="h-4 w-4 text-accent-violet" />
                        <span>View Model V2 (1.7B)</span>
                      </a>
                      <a
                        href="https://huggingface.co/datasets/kaushik-harsh-99/Indian-legal-data-v3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-foreground text-sm font-medium hover:bg-elevated transition-colors"
                      >
                        <ChevronRight className="h-4 w-4 text-accent" />
                        <span>Legal Dataset V3</span>
                      </a>
                    </>
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
