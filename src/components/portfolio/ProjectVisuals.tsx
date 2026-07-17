import type { ProjectDetail } from "./projectData";
import { CheckCircle2 } from "lucide-react";

/**
 * Bespoke per-project diagrams. Each project gets a distinct visual identity.
 */
export function ProjectVisuals({
  project,
  accent,
}: {
  project: ProjectDetail;
  accent: string;
}) {
  switch (project.id) {
    case "turbollm":
      return <TurboLLMVisuals project={project} accent={accent} />;
    case "tinystories-17m":
      return <TinyStoriesVisuals project={project} accent={accent} />;
    case "indian-legal-llm":
      return <IndianLegalVisuals project={project} accent={accent} />;
    case "mathinstruct-v1":
      return <MathInstructVisuals project={project} accent={accent} />;
    case "spam-detection":
      return <SpamDetectionVisuals project={project} accent={accent} />;
    default:
      return <FallbackDiagram project={project} />;
  }
}

/* ---------- TurboLLM ---------- */
function TurboLLMVisuals({ project, accent }: { project: ProjectDetail; accent: string }) {
  return (
    <div className="space-y-10">
      {/* Memory hierarchy */}
      <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
        <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
          Memory hierarchy · SSD → RAM → VRAM streaming
        </div>
        <MemoryHierarchy accent={accent} />
      </div>

      {/* MoE expert routing */}
      <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
        <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
          Mixture-of-Experts · Top-K routing
        </div>
        <MoERouting accent={accent} />
      </div>

      {/* Throughput evolution */}
      {project.evolution && (
        <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              Throughput evolution · tokens / second
            </span>
            <span className="text-mono text-[11px]" style={{ color: accent }}>
              21× vs baseline
            </span>
          </div>
          <ThroughputBars evolution={project.evolution} accent={accent} />
        </div>
      )}

      {/* Platform benchmarks */}
      {project.platforms && (
        <div className="rounded-lg border border-hairline overflow-hidden">
          <div className="px-5 py-3 border-b border-hairline bg-surface-2/40">
            <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              Platform benchmarks
            </span>
          </div>
          <div className="divide-y divide-hairline">
            {project.platforms.map((p) => (
              <div key={p.name} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 px-5 py-4 items-center">
                <div>
                  <div className="text-sm font-medium text-foreground">{p.name}</div>
                  <div className="text-mono text-[10px] text-subtle mt-0.5">
                    {p.specs.join(" · ")}
                  </div>
                </div>
                <div className="text-mono text-xs text-muted-foreground">{p.model}</div>
                <div className="text-mono text-base text-foreground text-right">{p.throughput}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MemoryHierarchy({ accent }: { accent: string }) {
  const tiers = [
    { name: "SSD", sub: "cold expert pool", capacity: "∞", latency: "~ms" },
    { name: "RAM", sub: "warm buffer", capacity: "16 GB", latency: "~μs" },
    { name: "VRAM", sub: "active experts", capacity: "6 GB", latency: "~ns" },
  ];
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {tiers.map((t, i) => (
          <div key={t.name} className="relative">
            <div
              className="rounded-md border p-4 sm:p-5 h-full"
              style={{
                borderColor: i === 2 ? accent : "var(--border)",
                background:
                  i === 2 ? `color-mix(in oklab, ${accent} 8%, transparent)` : "var(--surface-2)",
              }}
            >
              <div className="text-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
                Tier {i + 1}
              </div>
              <div className="mt-2 text-xl font-medium text-foreground">{t.name}</div>
              <div className="text-mono text-[11px] text-subtle mt-1">{t.sub}</div>
              <div className="mt-4 flex justify-between text-mono text-[11px]">
                <span className="text-muted-foreground">{t.capacity}</span>
                <span className="text-subtle">{t.latency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Streaming lanes */}
      <div className="mt-8 space-y-2">
        {["expert_7.w", "expert_2.w", "expert_11.w"].map((name, i) => (
          <div
            key={name}
            className="relative h-6 rounded overflow-hidden border border-hairline bg-background/60"
          >
            <div
              className="absolute inset-y-0 left-0 h-full"
              style={{
                width: "18%",
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                animation: `token-drift ${4 + i * 0.6}s linear ${i * 0.4}s infinite`,
              }}
            />
            <div className="absolute inset-0 flex items-center px-3 text-mono text-[10px] text-subtle">
              <span className="opacity-70">stream</span>
              <span className="mx-2">·</span>
              <span className="text-muted-foreground">{name}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-mono text-[10px] text-subtle">
        <span>double-buffered prefetch</span>
        <span>pinned host memory</span>
        <span>PCIe async copy</span>
      </div>
    </div>
  );
}

function MoERouting({ accent }: { accent: string }) {
  const tokens = ["tok_0", "tok_1", "tok_2", "tok_3"];
  const experts = Array.from({ length: 8 }, (_, i) => `E${i}`);
  return (
    <svg viewBox="0 0 800 260" className="w-full h-auto" role="img" aria-label="MoE routing">
      <title>Top-2 expert routing per token</title>
      {/* tokens */}
      {tokens.map((t, i) => (
        <g key={t}>
          <rect
            x={20}
            y={30 + i * 55}
            width={90}
            height={36}
            rx={6}
            fill="var(--surface-2)"
            stroke="var(--border)"
          />
          <text
            x={65}
            y={53 + i * 55}
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="12"
            fontFamily="JetBrains Mono"
          >
            {t}
          </text>
        </g>
      ))}
      {/* router */}
      <rect x={200} y={90} width={140} height={80} rx={8} fill="var(--surface)" stroke={accent} strokeOpacity={0.5} />
      <text x={270} y={125} textAnchor="middle" fill={accent} fontSize="11" fontFamily="JetBrains Mono">
        gating
      </text>
      <text x={270} y={145} textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" fontFamily="JetBrains Mono">
        softmax · top-2
      </text>
      {/* lines tokens -> router */}
      {tokens.map((_, i) => (
        <line
          key={i}
          x1={110}
          y1={48 + i * 55}
          x2={200}
          y2={130}
          stroke="var(--border-strong)"
          strokeWidth={1}
        />
      ))}
      {/* experts */}
      {experts.map((e, i) => (
        <g key={e}>
          <rect
            x={620}
            y={10 + i * 30}
            width={60}
            height={24}
            rx={4}
            fill={i === 1 || i === 5 ? `color-mix(in oklab, ${accent} 12%, var(--surface-2))` : "var(--surface-2)"}
            stroke={i === 1 || i === 5 ? accent : "var(--border)"}
            strokeOpacity={i === 1 || i === 5 ? 0.8 : 1}
          />
          <text
            x={650}
            y={26 + i * 30}
            textAnchor="middle"
            fill={i === 1 || i === 5 ? accent : "var(--muted-foreground)"}
            fontSize="11"
            fontFamily="JetBrains Mono"
          >
            {e}
          </text>
        </g>
      ))}
      {/* router -> selected experts (E1, E5) */}
      {[1, 5].map((i) => (
        <line
          key={i}
          x1={340}
          y1={130}
          x2={620}
          y2={22 + i * 30}
          stroke={accent}
          strokeOpacity={0.7}
          strokeWidth={1.5}
        />
      ))}
      {/* dashed lines to unused experts */}
      {[0, 2, 3, 4, 6, 7].map((i) => (
        <line
          key={i}
          x1={340}
          y1={130}
          x2={620}
          y2={22 + i * 30}
          stroke="var(--border)"
          strokeDasharray="2 4"
        />
      ))}
      {/* labels */}
      <text x={20} y={20} fill="var(--subtle)" fontSize="10" fontFamily="JetBrains Mono">
        input tokens
      </text>
      <text x={620} y={4} fill="var(--subtle)" fontSize="10" fontFamily="JetBrains Mono">
        experts (top-2 active)
      </text>
    </svg>
  );
}

function ThroughputBars({
  evolution,
  accent,
}: {
  evolution: NonNullable<ProjectDetail["evolution"]>;
  accent: string;
}) {
  const max = Math.max(...evolution.map((e) => e.throughput));
  return (
    <div className="space-y-3">
      {evolution.map((e) => {
        const pct = (e.throughput / max) * 100;
        const isCurrent = e.version === "Current";
        return (
          <div key={e.version} className="grid grid-cols-[120px_1fr_60px] items-center gap-3">
            <span className="text-mono text-[11px] text-muted-foreground truncate">
              {e.version}
            </span>
            <div className="relative h-6 rounded overflow-hidden bg-background/40 border border-hairline">
              <div
                className="absolute inset-y-0 left-0 rounded"
                style={{
                  width: `${pct}%`,
                  background: isCurrent
                    ? `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 60%, transparent))`
                    : `color-mix(in oklab, ${accent} 35%, var(--surface-2))`,
                  transition: "width 900ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
            <span
              className="text-mono text-xs text-right"
              style={{ color: isCurrent ? accent : "var(--muted-foreground)" }}
            >
              {e.throughput.toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- TinyStories ---------- */
function TinyStoriesVisuals({
  project,
  accent,
}: {
  project: ProjectDetail;
  accent: string;
}) {
  return (
    <div className="space-y-10">
      {/* Transformer block diagram */}
      <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
        <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
          Decoder block · ×8 layers · d_model 384
        </div>
        <TransformerBlock accent={accent} />
      </div>

      {/* Tokenizer flow */}
      <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
        <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
          SentencePiece BPE · 8,000 tokens
        </div>
        <TokenizerFlow accent={accent} />
      </div>

      {/* Generation examples */}
      {project.generationExamples && (
        <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
          <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
            Sample generations
          </div>
          <div className="space-y-6">
            {project.generationExamples.map((g, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="text-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
                    Prompt
                  </div>
                  <p className="mt-2 text-sm text-foreground leading-relaxed">{g.prompt}</p>
                </div>
                <div>
                  <div className="text-mono text-[10px] uppercase tracking-wider text-subtle">
                    Continuation
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{g.output}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TransformerBlock({ accent }: { accent: string }) {
  const blocks = [
    { title: "RMSNorm", note: "pre-norm" },
    { title: "Multi-head Attention", note: "8 heads · RoPE · causal mask", highlight: true },
    { title: "Residual +", note: "" },
    { title: "RMSNorm", note: "pre-norm" },
    { title: "SwiGLU MLP", note: "gated · 4× expansion", highlight: true },
    { title: "Residual +", note: "" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-6">
      <div className="flex flex-col gap-2">
        {blocks.map((b) => (
          <div
            key={b.title}
            className="rounded-md border px-4 py-2.5 flex items-center justify-between"
            style={{
              borderColor: b.highlight ? accent : "var(--border)",
              background: b.highlight
                ? `color-mix(in oklab, ${accent} 6%, var(--surface-2))`
                : "var(--surface-2)",
            }}
          >
            <span className="text-sm text-foreground">{b.title}</span>
            <span className="text-mono text-[10px] text-subtle">{b.note}</span>
          </div>
        ))}
      </div>
      <div className="hidden sm:flex flex-col items-center justify-center h-full">
        <div className="h-full w-px bg-hairline" />
        <span
          className="text-mono text-[10px] uppercase tracking-wider py-2"
          style={{ color: accent }}
        >
          × 8
        </span>
        <div className="h-full w-px bg-hairline" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          ["params", "17.2M"],
          ["ctx", "512"],
          ["vocab", "8,000"],
          ["d_ff", "1536"],
          ["batch", "70"],
          ["precision", "BF16"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md border border-hairline p-3">
            <div className="text-mono text-[10px] uppercase tracking-wider text-subtle">{k}</div>
            <div className="text-mono text-sm text-foreground mt-1">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenizerFlow({ accent }: { accent: string }) {
  const steps = [
    { label: "raw", value: "Once upon a time, Lily saw a butterfly." },
    { label: "pre-tok", value: "['Once', ' upon', ' a', ' time', ',', ' Lily', ' saw', ' a', ' butterfly', '.']" },
    { label: "bpe merges", value: "['Once', ' upon', ' a', ' time', ',', ' L', 'ily', ' saw', ' a', ' butter', 'fly', '.']" },
    { label: "ids", value: "[412, 88, 5, 199, 14, 91, 233, 76, 5, 908, 271, 15]" },
  ];
  return (
    <div className="space-y-3">
      {steps.map((s, i) => (
        <div key={s.label} className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-3 items-start">
          <div
            className="text-mono text-[10px] uppercase tracking-wider pt-2"
            style={{ color: i === steps.length - 1 ? accent : "var(--subtle)" }}
          >
            {s.label}
          </div>
          <div
            className="rounded-md border border-hairline bg-background/50 px-3 py-2 text-mono text-[11px] text-muted-foreground overflow-x-auto whitespace-nowrap"
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Indian Legal LLM ---------- */
function IndianLegalVisuals({
  project,
  accent,
}: {
  project: ProjectDetail;
  accent: string;
}) {
  return (
    <div className="space-y-10">
      {/* Timeline */}
      {project.timeline && (
        <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
          <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
            Research timeline
          </div>
          <div className="relative border-l border-hairline pl-6 space-y-6">
            {project.timeline.map((t) => (
              <div key={t.title} className="relative">
                <span
                  className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full"
                  style={{ background: t.status === "current" ? accent : "var(--border-strong)" }}
                />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{t.title}</span>
                  <span
                    className="text-mono text-[10px] uppercase tracking-wider"
                    style={{ color: t.status === "current" ? accent : "var(--subtle)" }}
                  >
                    {t.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Model versions */}
      {project.modelVersions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.modelVersions.map((v, i) => (
            <div
              key={v.version}
              className="rounded-lg border p-6"
              style={{
                borderColor: i === 1 ? accent : "var(--border)",
                background: i === 1 ? `color-mix(in oklab, ${accent} 5%, transparent)` : "var(--surface-2)",
              }}
            >
              <div className="text-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
                {v.version}
              </div>
              <div className="mt-3 text-lg font-medium text-foreground">{v.baseModel}</div>
              <div className="text-mono text-xs text-muted-foreground mt-1">{v.size} · {v.format}</div>
              <div className="text-mono text-[11px] text-subtle mt-2">{v.dataset}</div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{v.reason}</p>
            </div>
          ))}
        </div>
      )}

      {/* Before / After */}
      {project.beforeAfter && (
        <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
          <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
            Before / after · v1 vs v2 outputs
          </div>
          <div className="space-y-6">
            {project.beforeAfter.map((ex, i) => (
              <div key={i} className="space-y-3">
                <div className="text-mono text-[11px] text-muted-foreground">
                  Q: {ex.query}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-md border border-hairline p-4 bg-background/40">
                    <div className="text-mono text-[10px] uppercase tracking-wider text-destructive/80">
                      v1 — hallucinated
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{ex.before}</p>
                  </div>
                  <div className="rounded-md border p-4" style={{ borderColor: accent, background: `color-mix(in oklab, ${accent} 4%, transparent)` }}>
                    <div className="text-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
                      v2 — grounded
                    </div>
                    <p className="mt-2 text-sm text-foreground leading-relaxed">{ex.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key insight pull-quote */}
      {project.keyInsight && (
        <blockquote
          className="rounded-lg border p-8 sm:p-10 relative"
          style={{ borderColor: accent, background: `color-mix(in oklab, ${accent} 5%, transparent)` }}
        >
          <div className="text-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>
            Key insight
          </div>
          <p className="mt-4 text-serif italic text-2xl sm:text-3xl text-foreground leading-snug">
            "{project.keyInsight}"
          </p>
        </blockquote>
      )}
    </div>
  );
}

/* ---------- MathInstruct ---------- */
function MathInstructVisuals({
  project,
  accent,
}: {
  project: ProjectDetail;
  accent: string;
}) {
  return (
    <div className="space-y-10">
      {/* SFT pipeline */}
      <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
        <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
          Supervised fine-tuning pipeline
        </div>
        <SFTPipeline accent={accent} />
      </div>

      {/* Benchmark image */}
      {project.benchmarkImage && (
        <div className="rounded-lg border border-hairline overflow-hidden">
          <div className="px-5 py-3 border-b border-hairline bg-surface-2/40">
            <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              Math benchmark deltas · MathInstruct v1 vs base Qwen3-0.6B
            </span>
          </div>
          <img
            src={project.benchmarkImage}
            alt="Math benchmark deltas"
            loading="lazy"
            decoding="async"
            className="w-full h-auto bg-background"
          />
        </div>
      )}

      {/* Comparison */}
      {project.modelComparison && (
        <div className="rounded-lg border border-hairline overflow-hidden">
          <div className="px-5 py-3 border-b border-hairline bg-surface-2/40">
            <span className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              Model comparison
            </span>
          </div>
          <div className="divide-y divide-hairline">
            {project.modelComparison.map((m, i) => (
              <div key={m.name} className="grid grid-cols-1 md:grid-cols-[1.2fr_auto_1fr] gap-3 px-5 py-4">
                <div>
                  <div className="text-sm font-medium text-foreground">{m.name}</div>
                  <div className="text-mono text-[11px] text-subtle mt-0.5">{m.purpose}</div>
                </div>
                <div className="text-mono text-xs text-muted-foreground">{m.parameters}</div>
                <div className="text-mono text-sm text-right" style={{ color: i === 1 ? accent : "var(--foreground)" }}>
                  {m.accuracy}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SFTPipeline({ accent }: { accent: string }) {
  const nodes = [
    { title: "Qwen3-0.6B", sub: "pretrained base" },
    { title: "OpenMathInstruct-2", sub: "NVIDIA · instruction pairs" },
    { title: "SFT · 0.1 epoch", sub: "preserved distribution", highlight: true },
    { title: "MathInstruct v1", sub: "aligned checkpoint" },
  ];
  return (
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      {nodes.map((n, i) => (
        <div key={n.title} className="flex-1 flex items-center gap-3">
          <div
            className="flex-1 rounded-md border p-4 h-full"
            style={{
              borderColor: n.highlight ? accent : "var(--border)",
              background: n.highlight
                ? `color-mix(in oklab, ${accent} 6%, transparent)`
                : "var(--surface-2)",
            }}
          >
            <div className="text-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
              step {i + 1}
            </div>
            <div className="mt-2 text-sm font-medium text-foreground">{n.title}</div>
            <div className="text-mono text-[11px] text-subtle mt-1">{n.sub}</div>
          </div>
          {i < nodes.length - 1 && (
            <span className="text-mono text-lg text-subtle hidden md:inline">→</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- Spam Detection ---------- */
function SpamDetectionVisuals({
  project,
  accent,
}: {
  project: ProjectDetail;
  accent: string;
}) {
  return (
    <div className="space-y-10">
      {/* Evolution 3-column */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Classical", body: "TF-IDF · Logistic Regression · SVM", acc: "95.4%", note: "baselines" },
          { title: "Deep neural", body: "80M params · residual blocks · dropout", acc: "98.38%", note: "teacher", highlight: true },
          { title: "Distilled", body: "2M params · self-attention · 128d embed", acc: "98.12%", note: "student · 40× smaller" },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-lg border p-6"
            style={{
              borderColor: c.highlight ? accent : "var(--border)",
              background: c.highlight ? `color-mix(in oklab, ${accent} 5%, transparent)` : "var(--surface-2)",
            }}
          >
            <div className="text-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
              {c.note}
            </div>
            <div className="mt-3 text-lg font-medium text-foreground">{c.title}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            <div className="mt-6 text-mono text-2xl text-foreground">{c.acc}</div>
            <div className="text-mono text-[10px] uppercase tracking-wider text-subtle mt-1">
              validation accuracy
            </div>
          </div>
        ))}
      </div>

      {/* Distillation diagram */}
      <div className="rounded-lg border border-hairline bg-surface-2/20 p-6 sm:p-8">
        <div className="text-mono text-[10px] uppercase tracking-[0.18em] text-subtle mb-6">
          Knowledge distillation · teacher → student
        </div>
        <DistillationDiagram accent={accent} />
      </div>

      {/* Model comparison table */}
      {project.modelComparison && (
        <div className="rounded-lg border border-hairline overflow-hidden">
          <div className="px-5 py-3 border-b border-hairline bg-surface-2/40 grid grid-cols-[1.4fr_1fr_1fr_auto] gap-3">
            {["model", "purpose", "parameters", "accuracy"].map((h) => (
              <span key={h} className="text-mono text-[10px] uppercase tracking-wider text-subtle">
                {h}
              </span>
            ))}
          </div>
          <div className="divide-y divide-hairline">
            {project.modelComparison.map((m) => (
              <div
                key={m.name}
                className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-3 px-5 py-3 items-center"
              >
                <span className="text-sm text-foreground">{m.name}</span>
                <span className="text-mono text-xs text-muted-foreground">{m.purpose}</span>
                <span className="text-mono text-xs text-muted-foreground">{m.parameters}</span>
                <span
                  className="text-mono text-sm text-right"
                  style={{ color: accent }}
                >
                  {m.accuracy}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DistillationDiagram({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 800 260" className="w-full h-auto" role="img" aria-label="Knowledge distillation flow">
      <title>Teacher–student distillation</title>
      {/* Teacher */}
      <rect x={40} y={30} width={220} height={90} rx={8} fill="var(--surface-2)" stroke="var(--border-strong)" />
      <text x={150} y={62} textAnchor="middle" fill="var(--foreground)" fontSize="14" fontFamily="Inter">
        Teacher · 80M
      </text>
      <text x={150} y={85} textAnchor="middle" fill="var(--muted-foreground)" fontSize="11" fontFamily="JetBrains Mono">
        residual · dropout · 512d
      </text>
      <text x={150} y={102} textAnchor="middle" fill={accent} fontSize="10" fontFamily="JetBrains Mono">
        acc 98.38%
      </text>

      {/* Student */}
      <rect x={40} y={150} width={220} height={90} rx={8} fill={`color-mix(in oklab, ${accent} 6%, var(--surface-2))`} stroke={accent} strokeOpacity={0.7} />
      <text x={150} y={182} textAnchor="middle" fill="var(--foreground)" fontSize="14" fontFamily="Inter">
        Student · 2M
      </text>
      <text x={150} y={205} textAnchor="middle" fill="var(--muted-foreground)" fontSize="11" fontFamily="JetBrains Mono">
        self-attention · 128d
      </text>
      <text x={150} y={222} textAnchor="middle" fill={accent} fontSize="10" fontFamily="JetBrains Mono">
        acc 98.12%
      </text>

      {/* Loss node */}
      <rect x={400} y={80} width={240} height={100} rx={8} fill="var(--surface)" stroke={accent} strokeOpacity={0.5} />
      <text x={520} y={110} textAnchor="middle" fill={accent} fontSize="12" fontFamily="JetBrains Mono">
        L = α · CE + (1−α) · KL(T=3)
      </text>
      <text x={520} y={132} textAnchor="middle" fill="var(--muted-foreground)" fontSize="11" fontFamily="JetBrains Mono">
        α = 0.5 · temperature = 3.0
      </text>
      <text x={520} y={152} textAnchor="middle" fill="var(--subtle)" fontSize="10" fontFamily="JetBrains Mono">
        hard labels + soft logits
      </text>

      {/* arrows */}
      <line x1={260} y1={75} x2={400} y2={110} stroke="var(--border-strong)" strokeWidth={1.5} markerEnd="url(#arrow1)" />
      <line x1={260} y1={195} x2={400} y2={150} stroke={accent} strokeWidth={1.5} markerEnd="url(#arrow2)" />
      <line x1={520} y1={180} x2={520} y2={220} stroke={accent} strokeWidth={1.5} markerEnd="url(#arrow2)" />
      <text x={540} y={210} fill={accent} fontSize="10" fontFamily="JetBrains Mono">
        gradient
      </text>

      <text x={280} y={65} fill="var(--subtle)" fontSize="10" fontFamily="JetBrains Mono">
        soft logits
      </text>
      <text x={280} y={175} fill="var(--subtle)" fontSize="10" fontFamily="JetBrains Mono">
        student logits
      </text>

      <defs>
        <marker id="arrow1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--border-strong)" />
        </marker>
        <marker id="arrow2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={accent} />
        </marker>
      </defs>
    </svg>
  );
}

/* ---------- Fallback ---------- */
function FallbackDiagram({ project }: { project: ProjectDetail }) {
  if (!project.architectureDiagram) return null;
  return (
    <pre className="rounded-lg border border-hairline bg-surface-2/30 p-6 text-mono text-[11px] text-muted-foreground overflow-x-auto">
      {project.architectureDiagram}
    </pre>
  );
}

// small helper icon suppression
export const _icon = CheckCircle2;
