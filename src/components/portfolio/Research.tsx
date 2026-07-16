import { Reveal } from "./Reveal";

const papers = [
  { title: "Attention Is All You Need", topic: "Architecture", year: 2017, authors: "Vaswani et al." },
  { title: "TinyStories", topic: "Small LMs", year: 2023, authors: "Eldan & Li" },
  { title: "SmolLM2", topic: "Small LMs", year: 2024, authors: "Hugging Face" },
  { title: "Phi-1", topic: "Data curation", year: 2023, authors: "Gunasekar et al." },
  { title: "Phi-1.5", topic: "Small LMs", year: 2023, authors: "Li et al." },
  { title: "Scaling Laws for Neural LMs", topic: "Scaling", year: 2020, authors: "Kaplan et al." },
  { title: "Training Compute-Optimal LLMs", topic: "Chinchilla", year: 2022, authors: "Hoffmann et al." },
  { title: "DeepSeek-V3", topic: "MoE / Systems", year: 2024, authors: "DeepSeek-AI" },
  { title: "LoRA", topic: "Adaptation", year: 2021, authors: "Hu et al." },
  { title: "InstructGPT", topic: "Alignment", year: 2022, authors: "Ouyang et al." },
];

export function Research() {
  return (
    <section id="research" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6">
            <div>
              <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
                § 04 — Papers studied
              </div>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                <span className="text-serif italic text-muted-foreground">A</span> reading list, reproduced
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                A living reference of the work that shapes how I think about
                language models — from architecture to scaling to alignment.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 overflow-hidden rounded-lg border border-hairline">
          <div className="grid grid-cols-[3rem_1fr_auto_6rem] gap-4 border-b border-hairline px-5 py-3 text-mono text-[11px] uppercase tracking-[0.16em] text-subtle sm:grid-cols-[4rem_1fr_10rem_6rem]">
            <div>#</div>
            <div>Title</div>
            <div className="hidden sm:block">Topic</div>
            <div className="text-right">Year</div>
          </div>
          {papers.map((p, i) => (
            <Reveal key={p.title} delay={i * 30}>
              <a
                href="#"
                className="group grid grid-cols-[3rem_1fr_auto_6rem] gap-4 border-b border-hairline px-5 py-5 transition-colors last:border-b-0 hover:bg-surface sm:grid-cols-[4rem_1fr_10rem_6rem]"
              >
                <div className="text-mono text-xs text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="text-base font-medium tracking-tight transition-colors group-hover:text-foreground">
                    {p.title}
                  </div>
                  <div className="text-mono mt-1 text-xs text-subtle">
                    {p.authors}
                  </div>
                </div>
                <div className="hidden self-center sm:block">
                  <span className="chip">{p.topic}</span>
                </div>
                <div className="text-mono self-center text-right text-sm text-muted-foreground">
                  {p.year}{" "}
                  <span className="ml-2 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
