import * as React from "react";
import { Reveal } from "./Reveal";

// Deterministic pseudo-contribution graph — no data fetching.
const WEEKS = 26;
const DAYS = 7;
function seed(n: number) {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
const cells: number[] = Array.from({ length: WEEKS * DAYS }, (_, i) => {
  const v = seed(i);
  if (v < 0.55) return 0;
  if (v < 0.8) return 1;
  if (v < 0.93) return 2;
  return 3;
});

const shades = [
  "oklch(0.22 0.008 260)",
  "color-mix(in oklab, var(--accent) 22%, oklch(0.22 0.008 260))",
  "color-mix(in oklab, var(--accent) 55%, oklch(0.22 0.008 260))",
  "color-mix(in oklab, var(--accent) 90%, oklch(0.22 0.008 260))",
];

const models = [
  { name: "TinyStories-17M", meta: "17.2M params · BF16 · custom decoder weights", href: "https://huggingface.co/kaushik-harsh-99" },
  { name: "Qwen3-1.7B-Legal", meta: "1.7B params · GGUF · Indian law SFT (v2/v3)", href: "https://huggingface.co/kaushik-harsh-99" },
  { name: "MathInstruct-v1", meta: "600M params · GGUF · Qwen3-0.6B mathematical SFT", href: "https://huggingface.co/kaushik-harsh-99" },
];

const datasets = [
  { name: "Indian-legal-data-v3", meta: "194K instruction pairs · Drafting, IPC, QA · Parquet", href: "https://huggingface.co/datasets/kaushik-harsh-99/Indian-legal-data-v3" },
  { name: "Indian-legal-data-v2", meta: "171K instruction pairs · IPC statutory Q&A · JSONL", href: "https://huggingface.co/datasets/kaushik-harsh-99/Indian-legal-data-v2" },
];

const repos = [
  { name: "Turbo-LLM", meta: "Python/PyTorch · SSD-RAM-VRAM offloading pipeline", href: "https://github.com/kaushikharsh99/Turbo-LLM" },
  { name: "TinyStories-17M", meta: "Python/PyTorch · pretraining decoder from scratch", href: "https://github.com/kaushikharsh99/TinyStories-17M" },
  { name: "Spam-Detection-Model", meta: "Python/PyTorch · baseline SFT & teacher-student distillation", href: "https://github.com/kaushikharsh99/Spam-Detection-Model" },
];

export function OpenSource() {
  const [activeTab, setActiveTab] = React.useState<"models" | "datasets" | "repos">("models");

  const activeItems = React.useMemo(() => {
    if (activeTab === "models") return models;
    if (activeTab === "datasets") return datasets;
    return repos;
  }, [activeTab]);

  return (
    <section id="open-source" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 05 — Open source
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Models, datasets, and repositories
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Left panel: contribution chart */}
          <Reveal>
            <div className="card-panel h-full p-7">
              <div className="flex items-center justify-between">
                <div className="text-mono text-xs uppercase tracking-[0.18em] text-subtle">
                  Contribution activity
                </div>
                <div className="text-mono text-[11px] text-subtle">last 26 weeks</div>
              </div>

              <div
                className="mt-6 grid gap-[3px]"
                style={{
                  gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
                  gridAutoFlow: "column",
                  gridTemplateRows: `repeat(${DAYS}, 1fr)`,
                }}
              >
                {cells.map((v, i) => (
                  <span
                    key={i}
                    className="aspect-square rounded-[2px]"
                    style={{ background: shades[v] }}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-mono text-[11px] text-subtle">
                <span>less</span>
                <div className="flex items-center gap-1">
                  {shades.map((s, i) => (
                    <span
                      key={i}
                      className="h-3 w-3 rounded-[2px]"
                      style={{ background: s }}
                    />
                  ))}
                </div>
                <span>more</span>
              </div>
            </div>
          </Reveal>

          {/* Right panel: Tabbed artifacts list */}
          <Reveal delay={80}>
            <div className="card-panel h-full p-6 flex flex-col justify-between overflow-hidden">
              <div>
                {/* Tab Selectors */}
                <div className="flex border-b border-hairline pb-2 mb-4 gap-4 select-none">
                  {(["models", "datasets", "repos"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-mono text-[10px] uppercase tracking-wider pb-1 font-semibold border-b transition-all cursor-pointer ${
                        activeTab === tab
                          ? "border-accent text-accent"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Items with Hover Reveals */}
                <div className="space-y-2 min-h-[220px]">
                  {activeItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded border border-border bg-background/20 hover:bg-surface hover:border-accent/15 transition-all duration-200 cursor-pointer animate-fade-in"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] font-mono text-subtle truncate mt-0.5 group-hover:text-muted-foreground transition-colors">
                          {item.meta}
                        </div>
                      </div>
                      <span className="text-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-0.5 shrink-0">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-hairline pt-3 text-[10px] font-mono text-subtle text-right select-none">
                {activeItems.length} active assets mapped
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
