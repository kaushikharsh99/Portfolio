import { Reveal } from "./Reveal";
import { useResumeModal } from "./ResumeModalContext";
import { Mail, Github, Linkedin, FileText } from "lucide-react";

export function HuggingFaceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.5 6a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 15.5 8zm-7 0a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 8.5 8zm7 8.5a4.5 4.5 0 0 1-7 0 1 1 0 0 1 1.4-1.4 2.5 2.5 0 0 0 4.2 0 1 1 0 0 1 1.4 1.4z" />
    </svg>
  );
}

const links = [
  { label: "Email", value: "harshkaushik11000@gmail.com", href: "mailto:harshkaushik11000@gmail.com", icon: Mail },
  { label: "GitHub", value: "github.com/kaushikharsh99", href: "https://github.com/kaushikharsh99", icon: Github },
  { label: "Hugging Face", value: "huggingface.co/kaushik-harsh-99", href: "https://huggingface.co/kaushik-harsh-99", icon: HuggingFaceIcon },
  { label: "LinkedIn", value: "linkedin.com/in/harsh-kaushik-95920b379", href: "https://www.linkedin.com/in/harsh-kaushik-95920b379/", icon: Linkedin },
  { label: "Resume", value: "Harsh_Kaushik_Resume.pdf", href: "#", icon: FileText },
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

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Research profile parameters */}
          <Reveal delay={40}>
            <div className="space-y-6">
              <div className="border-b border-hairline pb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">Research Interests</span>
                <p className="text-sm text-foreground font-light leading-relaxed">
                  Inference runtime optimization, Mixture-of-Experts (MoE) caching, hardware-software co-design, model compression, and post-training data alignment.
                </p>
              </div>
              
              <div className="border-b border-hairline pb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">Currently Interested In</span>
                <p className="text-sm text-foreground font-light leading-relaxed">
                  Low-latency MoE offloading hierarchies, kernel optimization for attention scaling, and fact-grounded SFT data synthesis.
                </p>
              </div>

              <div className="border-b border-hairline pb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">Open To</span>
                <p className="text-sm text-foreground font-light leading-relaxed">
                  AI research engineer roles, systems residency programs, and open research collaborations on efficient models training.
                </p>
              </div>

              <div className="pb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">Availability</span>
                <p className="text-sm text-foreground font-light leading-relaxed">
                  Immediate (Remote / Hybrid / On-site).
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Dynamic Contact Links list */}
          <Reveal delay={80}>
            <div className="divide-y divide-hairline border-y border-hairline h-fit">
              {links.map((l) => {
                const isResume = l.label === "Resume";
                const isEmail = l.label === "Email";
                const IconComponent = l.icon;
                return (
                  <a
                    key={l.label}
                    href={isResume ? "#" : l.href}
                    target={isResume || isEmail ? undefined : "_blank"}
                    rel={isResume || isEmail ? undefined : "noopener noreferrer"}
                    onClick={(e) => {
                      if (isResume) {
                        e.preventDefault();
                        openResume();
                      }
                    }}
                    className="group grid grid-cols-[8rem_1fr_2rem] items-center gap-6 py-5 transition-colors hover:bg-surface sm:grid-cols-[10rem_1fr_2rem] cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 text-mono text-xs uppercase tracking-[0.18em] text-subtle">
                      <IconComponent className="h-4 w-4 shrink-0 text-accent" />
                      <span>{l.label}</span>
                    </div>
                    <div className="truncate text-sm text-foreground">{l.value}</div>
                    <div className="justify-self-end text-mono text-sm text-muted-foreground transition-transform group-hover:translate-x-0.5">
                      ↗
                    </div>
                  </a>
                );
              })}
            </div>
          </Reveal>

        </div>
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
