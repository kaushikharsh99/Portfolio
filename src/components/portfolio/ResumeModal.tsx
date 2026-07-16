import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Download, X, ExternalLink } from "lucide-react";
import { PDFRenderer } from "./PDFRenderer";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const pdfUrl = "/Harsh_Kaushik_Resume.pdf";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        hideCloseButton
        className="fixed left-[50%] top-[50%] z-50 flex h-[85vh] w-[92vw] max-w-5xl translate-x-[-50%] translate-y-[-50%] flex-col gap-0 overflow-hidden border border-border-strong bg-surface p-0 shadow-elevated rounded-xl outline-none"
      >
        {/* Desktop App Window Header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-border-strong bg-surface-2 px-4 select-none">
          {/* Left: Window Controls decoration & Title */}
          <div className="flex items-center gap-3">
            {/* Mac-style Window Dots (Decoration) */}
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="h-3 w-3 rounded-full bg-destructive/60 hover:bg-destructive transition-colors cursor-pointer" onClick={onClose} />
              <span className="h-3 w-3 rounded-full bg-yellow-500/40" />
              <span className="h-3 w-3 rounded-full bg-green-500/40" />
            </div>

            {/* Separator on desktop */}
            <div className="hidden h-4 w-px bg-border-strong sm:block" />

            {/* Title & Icon */}
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              <span className="font-mono text-xs font-medium tracking-wide text-foreground">
                harsh_kaushik_resume.pdf
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5">
            {/* Download Button */}
            <a
              href={pdfUrl}
              download="Harsh_Kaushik_Resume.pdf"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              title="Download PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* External Link (Open in new tab fallback) */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              title="Open in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground cursor-pointer"
              title="Close window"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main PDF Content Area */}
        <div className="relative flex-1 bg-background overflow-hidden">
          <PDFRenderer url={pdfUrl} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
