import { createFileRoute } from "@tanstack/react-router";
import { OpenSource } from "@/components/portfolio/OpenSource";

export const Route = createFileRoute("/open-source")({
  component: OpenSourcePage,
});

function OpenSourcePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <div className="pt-8">
        <OpenSource />
      </div>
    </main>
  );
}
