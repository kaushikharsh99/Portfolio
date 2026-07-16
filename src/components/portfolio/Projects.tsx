import { Reveal } from "./Reveal";

type Project = {
  name: string;
  status: "Ongoing" | "Completed" | "Research";
  tagline: string;
  description: string;
  stack: string[];
  achievements: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "TurboLLM",
    status: "Ongoing",
    tagline: "Efficient LLM inference on consumer GPUs",
    description:
      "A research playground for pushing decoder throughput on a single consumer GPU. Explores paged KV cache, fused kernels, speculative decoding, and mixed-precision serving paths.",
    stack: ["C++", "CUDA", "PyTorch", "vLLM", "Triton"],
    achievements: [
      "3.8× throughput vs. baseline HF pipeline at 4k context",
      "Custom paged-KV allocator with < 3% memory overhead",
      "End-to-end benchmark suite across 6 model families",
    ],
    links: [
      { label: "Repository", href: "#" },
      { label: "Benchmarks", href: "#" },
    ],
    featured: true,
  },
  {
    name: "TinyStories-17M",
    status: "Completed",
    tagline: "A 17.2M-parameter language model, from scratch",
    description:
      "Full pretraining stack: custom BPE tokenizer, dataset curation, dataloader, transformer decoder, training loop, and evaluation. Published weights and eval on Hugging Face.",
    stack: ["PyTorch", "SentencePiece", "Parquet", "Hugging Face"],
    achievements: [
      "17.2M-param decoder trained on a 2M-example corpus",
      "Custom tokenizer + preprocessing pipeline",
      "Reproducible training config and eval harness",
    ],
    links: [
      { label: "Model card", href: "#" },
      { label: "Writeup", href: "#" },
    ],
  },
  {
    name: "LLM Post-training",
    status: "Research",
    tagline: "SFT / LoRA / QLoRA across specialized domains",
    description:
      "Adapter-based fine-tuning experiments across math, code, and legal corpora. Focus on data mixture, LoRA rank/target module ablations, and eval alignment.",
    stack: ["PyTorch", "PEFT", "TRL", "bitsandbytes"],
    achievements: [
      "LoRA/QLoRA sweeps across ranks 4–128",
      "Domain-specialized checkpoints: math, code, legal",
      "Eval harness spanning 8 downstream tasks",
    ],
    links: [{ label: "Notes", href: "#" }],
  },
  {
    name: "Dataset Engineering",
    status: "Ongoing",
    tagline: "Instruction data pipelines at scale",
    description:
      "Tooling for large-scale text preprocessing: cleaning, near-duplicate detection, quality filtering, and Parquet-native pipelines that stream from disk.",
    stack: ["Python", "Parquet", "Multiprocessing", "MinHash"],
    achievements: [
      "MinHash-LSH deduplication over 40M docs",
      "Streaming Parquet reader with backpressure",
      "Instruction dataset builder with schema validation",
    ],
    links: [{ label: "Repository", href: "#" }],
  },
];

function StatusBadge({ status }: { status: Project["status"] }) {
  const dot =
    status === "Ongoing"
      ? "var(--accent)"
      : status === "Research"
        ? "var(--accent-violet)"
        : "oklch(0.75 0.15 150)";
  return (
    <span className="chip">
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {status}
    </span>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;
  return (
    <section id="projects" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
                § 02 — Featured work
              </div>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                Selected projects
              </h2>
            </div>
            <div className="hidden text-mono text-xs text-subtle sm:block">
              {projects.length} entries
            </div>
          </div>
        </Reveal>

        {/* Featured card */}
        <Reveal delay={80}>
          <article className="card-panel card-panel-hover mt-12 grid grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[1.15fr_1fr]">
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <StatusBadge status={featured.status} />
                <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                  Featured
                </span>
              </div>
              <h3 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">
                {featured.name}
              </h3>
              <p className="text-mono mt-2 text-sm text-muted-foreground">
                {featured.tagline}
              </p>
              <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                {featured.description}
              </p>

              <ul className="mt-8 space-y-2 text-sm">
                {featured.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-foreground/90">
                    <span className="text-mono mt-[2px] text-xs text-subtle">›</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                {featured.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {featured.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="group inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2 text-sm text-foreground transition-colors hover:bg-elevated"
                  >
                    {l.label}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Terminal / benchmark preview */}
            <div
              className="relative min-h-[320px] border-t border-hairline lg:border-l lg:border-t-0"
              style={{
                background:
                  "radial-gradient(600px 300px at 80% 10%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%), color-mix(in oklab, var(--surface-2) 90%, transparent)",
              }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-elevated" />
                  <span className="h-2.5 w-2.5 rounded-full bg-elevated" />
                  <span className="h-2.5 w-2.5 rounded-full bg-elevated" />
                  <span className="text-mono ml-3 text-[11px] text-subtle">
                    turbollm · bench.log
                  </span>
                </div>
                <pre className="text-mono mt-5 overflow-hidden text-[12px] leading-6 text-muted-foreground">
{`$ turbollm bench --model llama-3.1-8b --ctx 4096
[init]  paged-kv: 96 blocks · 3.4 GB
[load]  fp16 weights ..... 4.2 s
[warm]  step 8/8 ......... 512 tok/s

baseline (hf transformers)  ...  138 tok/s
turbollm (paged + fused)    ...  527 tok/s
speedup                      ...  3.82×

memory / seq    ↓ 41%
p50 latency     ↓ 63%
p99 latency     ↓ 58%`}
                </pre>
                <div className="mt-6 flex items-center gap-2 text-mono text-[11px] text-subtle">
                  <span className="inline-block h-1.5 w-1.5 animate-cursor rounded-full" style={{ background: "var(--accent)" }} />
                  live · updated nightly
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Secondary grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <article className="card-panel card-panel-hover h-full p-7">
                <div className="flex items-center justify-between gap-3">
                  <StatusBadge status={p.status} />
                  <span className="text-mono text-[11px] text-subtle">
                    0{i + 2}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-medium tracking-tight">
                  {p.name}
                </h3>
                <p className="text-mono mt-1 text-xs text-muted-foreground">
                  {p.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <ul className="mt-5 space-y-1.5 text-sm">
                  {p.achievements.map((a) => (
                    <li key={a} className="flex gap-2 text-foreground/85">
                      <span className="text-mono mt-[2px] text-[11px] text-subtle">›</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-mono text-xs">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
