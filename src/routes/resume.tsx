import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, ExternalLink, Loader2 } from "lucide-react";
import { Reveal } from "@/components/portfolio/Reveal";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
});

function ResumePage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const pdfUrl = "/Harsh_Kaushik_Resume.pdf";

  return (
    <main className="relative min-h-screen bg-background text-foreground pb-24 pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-mono text-xs uppercase tracking-[0.2em] text-subtle">
            § 01 — Credentials
          </div>
          <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl text-foreground">
            Curriculum Vitae
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground text-sm leading-relaxed mb-8">
            View or download the technical resume detailing systems implementations, pretraining benchmarks, and fine-tuning projects.
          </p>
        </Reveal>

        {/* Desktop App Window Container for PDF */}
        <Reveal delay={60}>
          <div className="flex h-[75vh] w-full flex-col overflow-hidden border border-border-strong bg-surface shadow-elevated rounded-xl outline-none">
            {/* Desktop Window Header */}
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-border-strong bg-surface-2 px-4 select-none">
              <div className="flex items-center gap-3">
                {/* Window Dots (Decoration) */}
                <div className="hidden items-center gap-1.5 sm:flex">
                  <span className="h-3 w-3 rounded-full bg-border-strong/60" />
                  <span className="h-3 w-3 rounded-full bg-border-strong/60" />
                  <span className="h-3 w-3 rounded-full bg-border-strong/60" />
                </div>

                <div className="hidden h-4 w-px bg-border-strong sm:block" />

                {/* Title & Icon */}
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <span className="font-mono text-xs font-medium tracking-wide text-foreground">
                    harsh_kaushik_resume.pdf
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {/* Download Button */}
                <a
                  href={pdfUrl}
                  download="Harsh_Kaushik_Resume.pdf"
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground cursor-pointer"
                  title="Download PDF"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* External Link */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground cursor-pointer"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Main PDF Content Area */}
            <div className="relative flex-1 bg-background overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/90 text-muted-foreground z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  <p className="font-mono text-xs tracking-wider">Loading PDF Viewer...</p>
                </div>
              )}
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                className="h-full w-full border-none bg-background"
                onLoad={() => setIsLoading(false)}
                title="Harsh Kaushik Resume PDF"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
