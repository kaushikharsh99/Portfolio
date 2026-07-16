import { Reveal } from "./Reveal";

const events = [
  {
    when: "2026 — Now",
    title: "TurboLLM — inference systems research",
    body: "Building an efficient inference runtime for decoder-only models on consumer GPUs. Kernel fusion, paged KV cache, speculative decoding.",
  },
  {
    when: "2025",
    title: "TinyStories-17M released",
    body: "Trained a 17.2M-parameter decoder from scratch with a custom tokenizer and 2M-example dataset. Model and eval published on Hugging Face.",
  },
  {
    when: "2024",
    title: "Post-training experiments",
    body: "LoRA and QLoRA fine-tuning across math, code, and legal domains. Studying adapter rank, target modules, and data mixture effects.",
  },
  {
    when: "2023",
    title: "Reading modern LLM literature",
    body: "Attention, scaling laws, Chinchilla, Phi, SmolLM2, DeepSeek — reproducing key results as a way to internalize the design decisions.",
  },
  {
    when: "2022",
    title: "Systems fundamentals",
    body: "C++, CUDA, Linux internals. Building intuition for the substrate underneath every deep learning framework.",
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 06 — Timeline
          </div>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            A short trajectory
          </h2>
        </Reveal>

        <ol className="relative mt-14 border-l border-hairline pl-8">
          {events.map((e, i) => (
            <Reveal key={e.title} delay={i * 60}>
              <li className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-[37px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full"
                  style={{
                    background: "var(--background)",
                    boxShadow: "0 0 0 1px var(--border-strong)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: i === 0 ? "var(--accent)" : "var(--muted-foreground)" }}
                  />
                </span>
                <div className="text-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                  {e.when}
                </div>
                <h3 className="mt-2 text-lg font-medium tracking-tight">{e.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  {e.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
