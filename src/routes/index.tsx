import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { ResearchStatement } from "@/components/portfolio/ResearchStatement";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Research } from "@/components/portfolio/Research";
import { OpenSource } from "@/components/portfolio/OpenSource";
import { Timeline } from "@/components/portfolio/Timeline";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <div className="divider-x" />
      <ResearchStatement />
      <div className="divider-x" />
      <Projects />
      <div className="divider-x" />
      <Skills />
      <div className="divider-x" />
      <Research />
      <div className="divider-x" />
      <OpenSource />
      <div className="divider-x" />
      <Timeline />
      <div className="divider-x" />
      <Contact />
    </main>
  );
}
