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
  const [isDiagramExpanded, setIsDiagramExpanded] = React.useState(false);

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
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project.id]);

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
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-8 sm:px-8 md:px-12 space-y-12">
          
          {/* HERO BANNER SECTION */}
          <section className="relative overflow-hidden rounded-xl border border-border-strong bg-surface p-6 sm:p-10 md:p-12">
            {/* Mesh gradient effect */}
            <div className="absolute inset-0 bg-hero-glow opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                System Overview
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
              Performance Indicators & Metrics
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
            
            {/* Left Column - Main Details */}
            <div className="space-y-12">
              
              {/* Motivation & Problem Statement */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    Motivation
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

              {/* Architecture Section */}
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
                      onClick={() => setIsDiagramExpanded(true)}
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

              {/* Features & Challenges */}
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
                      <span>Hugging Face Hub</span>
                    </a>
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

      {/* EXPANDED DIAGRAM MODAL */}
      {isDiagramExpanded && project.architectureDiagram && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => setIsDiagramExpanded(false)}
        >
          <button 
            className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full bg-surface border border-border text-foreground hover:bg-elevated"
            onClick={() => setIsDiagramExpanded(false)}
          >
            <X className="h-5 w-5" />
          </button>
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
        </div>
      )}

    </div>
  );
}
