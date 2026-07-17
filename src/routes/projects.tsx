import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/portfolio/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Harsh Kaushik" },
      {
        name: "description",
        content:
          "Five research and systems projects on LLM inference, small-model pretraining, SFT alignment, mathematical reasoning, and knowledge distillation.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <Projects />
    </main>
  );
}
