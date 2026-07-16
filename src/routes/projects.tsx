import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/portfolio/Projects";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <Projects />
    </main>
  );
}
