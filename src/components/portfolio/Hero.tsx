import { AttentionBackdrop } from "./AttentionBackdrop";
import { useResumeModal } from "./ResumeModalContext";

export function Hero() {
  const { open: openResume } = useResumeModal();
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-24"
    >
      <AttentionBackdrop />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center gap-3 text-mono text-xs text-muted-foreground animate-reveal">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          <span>research · systems · language models</span>
        </div>

        <h1
          className="mt-8 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl animate-reveal"
          style={{ animationDelay: "80ms" }}
        >
          Harsh Kaushik
          <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 animate-cursor" style={{ background: "var(--accent)" }} />
        </h1>

        <p
          className="text-mono mt-6 text-sm uppercase tracking-[0.18em] text-muted-foreground animate-reveal sm:text-[13px]"
          style={{ animationDelay: "160ms" }}
        >
          AI Systems <span className="opacity-40">·</span> LLM Training{" "}
          <span className="opacity-40">·</span> Efficient Inference
        </p>

        <p
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground animate-reveal"
          style={{ animationDelay: "240ms" }}
        >
          I build language models from scratch, reproduce modern LLM research,
          optimize inference systems, and explore efficient AI architectures.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-3 animate-reveal"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-[1px]"
          >
            View Projects
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="https://github.com/kaushikharsh99"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-elevated"
          >
            GitHub
          </a>
          <a
            href="https://huggingface.co/kaushik-harsh-99"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border-strong px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-elevated"
          >
            Hugging Face
          </a>
          <button
            onClick={openResume}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground cursor-pointer"
          >
            Resume
          </button>
        </div>

        {/* Signal strip */}
        <div
          className="mt-20 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-hairline pt-8 text-mono text-xs sm:grid-cols-4 animate-reveal"
          style={{ animationDelay: "440ms" }}
        >
          {[
            ["17.2M", "params trained"],
            ["2M+", "dataset examples"],
            ["4×", "inference speedup"],
            ["10+", "papers reproduced"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="text-2xl font-medium text-foreground">{k}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-subtle">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
