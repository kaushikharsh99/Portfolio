import { Reveal } from "./Reveal";
import { useResumeModal } from "./ResumeModalContext";

const links = [
  { label: "Email", value: "harsh@example.com", href: "mailto:harsh@example.com" },
  { label: "GitHub", value: "github.com/harshkaushik", href: "https://github.com/" },
  { label: "Hugging Face", value: "huggingface.co/harshkaushik", href: "https://huggingface.co/" },
  { label: "LinkedIn", value: "linkedin.com/in/harshkaushik", href: "https://linkedin.com/" },
  { label: "Resume", value: "Harsh_Kaushik_Resume.pdf", href: "#" },
];

export function Contact() {
  const { open: openResume } = useResumeModal();

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 07 — Contact
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight sm:text-5xl">
            <span className="text-serif italic text-muted-foreground">Open to</span> research,
            residencies, and roles in LLM systems and foundation models.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-14 divide-y divide-hairline border-y border-hairline">
            {links.map((l) => {
              const isResume = l.label === "Resume";
              return (
                <a
                  key={l.label}
                  href={isResume ? "#" : l.href}
                  onClick={(e) => {
                    if (isResume) {
                      e.preventDefault();
                      openResume();
                    }
                  }}
                  className="group grid grid-cols-[7rem_1fr_2rem] items-center gap-6 py-5 transition-colors hover:bg-surface sm:grid-cols-[10rem_1fr_2rem] cursor-pointer"
                >
                  <div className="text-mono text-xs uppercase tracking-[0.18em] text-subtle">
                    {l.label}
                  </div>
                  <div className="truncate text-base text-foreground">{l.value}</div>
                  <div className="justify-self-end text-mono text-sm text-muted-foreground transition-transform group-hover:translate-x-0.5">
                    ↗
                  </div>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>

      <footer className="mx-auto mt-24 max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-mono text-xs text-subtle sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Harsh Kaushik. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            <span>Currently: TurboLLM · inference research</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
