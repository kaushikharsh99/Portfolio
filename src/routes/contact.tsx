import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24">
      <div className="pt-8">
        <Contact />
      </div>
    </main>
  );
}
