import { Reveal } from "./Reveal";

const topics = [
  {
    title: "Small Language Models",
    body: "Training compact models that reach outsized quality per parameter through careful data curation and architecture choices.",
  },
  {
    title: "Efficient Inference",
    body: "KV-cache layout, paged attention, quantization, and batching strategies that make LLMs practical on consumer hardware.",
  },
  {
    title: "Transformer Architecture",
    body: "Rotary embeddings, grouped-query attention, MoE routing — studying what makes modern decoders scale.",
  },
  {
    title: "Training Language Models",
    body: "Pretraining pipelines from tokenizer to optimizer state: reproducible, checkpointable, and observability-first.",
  },
  {
    title: "Dataset Engineering",
    body: "Cleaning, deduplication, and mixture design. Data is the model — most of the quality lives here.",
  },
  {
    title: "Model Compression",
    body: "LoRA, QLoRA, quantization-aware fine-tuning, and pruning as a systems problem, not just a numerics one.",
  },
  {
    title: "LLM Systems",
    body: "Serving stacks, throughput/latency trade-offs, memory hierarchies, and the plumbing behind production inference.",
  },
  {
    title: "Research Reproduction",
    body: "Re-implementing landmark papers from scratch to internalize the design decisions behind them.",
  },
];

export function ResearchStatement() {
  return (
    <section id="research-statement" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <div>
              <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
                § 01 — Research statement
              </div>
              <h2 className="mt-4 max-w-3xl text-3xl font-medium leading-tight sm:text-4xl">
                <span className="text-serif italic text-muted-foreground">On the study of</span>{" "}
                language models as systems — from tokenizer to server.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={i * 40}>
              <article
                className="group h-full bg-background p-6 transition-colors hover:bg-surface"
              >
                <div className="text-mono text-[11px] text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-base font-medium tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
