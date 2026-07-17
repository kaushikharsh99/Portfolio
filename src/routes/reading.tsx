import { createFileRoute } from "@tanstack/react-router";
import { Research } from "@/components/portfolio/Research";
import { Reveal } from "@/components/portfolio/Reveal";

export const Route = createFileRoute("/reading")({
  head: () => ({
    meta: [
      { title: "Reading — Harsh Kaushik" },
      {
        name: "description",
        content:
          "A personal library of foundational and modern AI research papers I have studied and, in many cases, reproduced.",
      },
    ],
  }),
  component: ReadingPage,
});

function ReadingPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <section className="pt-24 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § — Reading list
          </div>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">
            Papers, notes, and reproductions
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            An evolving library of the AI research that shapes how I build systems and train
            models. Papers marked <em className="text-serif">reproduced</em> have been implemented
            from scratch to internalize their architectural and training trade-offs.
          </p>
        </Reveal>
      </section>
      <Research />
    </main>
  );
}
