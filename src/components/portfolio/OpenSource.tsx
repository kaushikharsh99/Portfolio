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

const artifacts = [
  { kind: "Model", name: "tinystories-17m", meta: "17.2M · decoder · fp16", href: "#" },
  { kind: "Model", name: "turbo-instruct-1b", meta: "1B · SFT · Q4_K_M", href: "#" },
  { kind: "Dataset", name: "instruct-mix-2m", meta: "2.1M examples · parquet", href: "#" },
  { kind: "Dataset", name: "dedup-web-40m", meta: "40M docs · MinHash-LSH", href: "#" },
  { kind: "Repo", name: "turbollm", meta: "C++ / CUDA · inference", href: "#" },
  { kind: "Repo", name: "nano-decoder", meta: "PyTorch · pretraining", href: "#" },
];

export function OpenSource() {
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

          <Reveal delay={80}>
            <div className="card-panel h-full divide-y divide-hairline">
              {artifacts.map((a) => (
                <a
                  key={a.name}
                  href={a.href}
                  className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-surface"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="chip">{a.kind}</span>
                      <span className="truncate text-mono text-sm text-foreground">
                        {a.name}
                      </span>
                    </div>
                    <div className="text-mono mt-1 truncate text-xs text-subtle">
                      {a.meta}
                    </div>
                  </div>
                  <span className="text-mono text-sm text-muted-foreground transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
