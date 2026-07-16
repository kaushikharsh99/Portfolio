import * as React from "react";
import { Loader2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface PDFRendererProps {
  url: string;
}

export function PDFRenderer({ url }: PDFRendererProps) {
  const [pdf, setPdf] = React.useState<any>(null);
  const [numPages, setNumPages] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [scale, setScale] = React.useState(1.15);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scaleRef = React.useRef(scale);

  // Keep ref updated to avoid stale closures in event listeners
  React.useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  // Load PDF.js from CDN dynamically
  React.useEffect(() => {
    let active = true;

    const initPdf = async () => {
      try {
        if (!(window as any).pdfjsLib) {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
          script.async = true;
          document.head.appendChild(script);

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load PDF.js script"));
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";

        if (!active) return;

        const loadingTask = pdfjsLib.getDocument(url);
        const loadedPdf = await loadingTask.promise;
        
        if (active) {
          setPdf(loadedPdf);
          setNumPages(loadedPdf.numPages);
          setLoading(false);
        }
      } catch (error) {
        console.error("PDF loading error:", error);
        if (active) {
          setLoading(false);
        }
      }
    };

    initPdf();

    return () => {
      active = false;
    };
  }, [url]);

  // Trackpad Pinch-to-zoom & Mobile Touch Pinch-to-zoom gestures
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Desktop Trackpad/Mousewheel Pinch-to-zoom (ctrlKey + wheel)
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const zoomFactor = 0.04;
        const direction = e.deltaY < 0 ? 1 : -1;
        setScale((prev) => {
          const next = prev + direction * zoomFactor;
          return Math.min(2.5, Math.max(0.5, next));
        });
      }
    };

    // 2. Mobile/Touchscreen Pinch-to-zoom
    let touchStartDist = 0;
    let initialScale = 1.15;

    const getDistance = (t1: Touch, t2: Touch) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        touchStartDist = getDistance(e.touches[0], e.touches[1]);
        initialScale = scaleRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && touchStartDist > 0) {
        e.preventDefault();
        const dist = getDistance(e.touches[0], e.touches[1]);
        const factor = dist / touchStartDist;
        setScale(Math.min(2.5, Math.max(0.5, initialScale * factor)));
      }
    };

    const handleTouchEnd = () => {
      touchStartDist = 0;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-background overflow-hidden relative">
      
      {/* Local style block for scrollbars */}
      <style>{`
        .pdf-scroll-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .pdf-scroll-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .pdf-scroll-container::-webkit-scrollbar-thumb {
          background: var(--border-strong, rgba(255, 255, 255, 0.1));
          border-radius: 999px;
        }
        .pdf-scroll-container::-webkit-scrollbar-thumb:hover {
          background: var(--subtle, rgba(255, 255, 255, 0.25));
        }
      `}</style>

      {/* Dynamic Controls Toolbar */}
      {!loading && pdf && (
        <div className="flex items-center justify-center gap-4 bg-surface-2 border-b border-border-strong px-4 py-2.5 text-mono text-xs select-none shrink-0">
          <button
            onClick={() => setScale((prev) => Math.max(0.5, prev - 0.15))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale((prev) => Math.min(2.5, prev + 0.15))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          
          <div className="h-4 w-px bg-border-strong" />
          
          <button
            onClick={() => setScale(1.15)}
            className="flex h-8 px-2.5 items-center gap-1.5 rounded-md border border-border bg-surface text-[11px] text-muted-foreground hover:border-border-strong hover:text-foreground transition-colors cursor-pointer font-mono"
            title="Reset Zoom"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      )}

      {/* Pages Canvas List */}
      <div
        ref={containerRef}
        className="pdf-scroll-container flex-1 overflow-auto p-6 flex flex-col items-center gap-6 bg-background/50 scroll-smooth"
      >
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin text-accent" />
            <span className="font-mono text-xs tracking-wider">Parsing Document Layers...</span>
          </div>
        )}

        {!loading && pdf && Array.from({ length: numPages }).map((_, index) => (
          <PDFPage
            key={index}
            pdf={pdf}
            pageNumber={index + 1}
            scale={scale}
          />
        ))}

        {!loading && !pdf && (
          <div className="text-destructive font-mono text-xs text-center py-12">
            Failed to parse PDF document. Please use the Download option.
          </div>
        )}
      </div>
    </div>
  );
}

// Renders a single PDF page to a canvas
function PDFPage({ pdf, pageNumber, scale }: { pdf: any; pageNumber: number; scale: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    let renderTask: any = null;

    const renderPage = async () => {
      try {
        setRendering(true);
        const page = await pdf.getPage(pageNumber);
        if (!active) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Pixel-perfect crisp scaling for Retina / high-DPI screens
        const dpr = window.devicePixelRatio || 1;
        canvas.width = viewport.width * dpr;
        canvas.height = viewport.height * dpr;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.scale(dpr, dpr);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;

        if (active) {
          setRendering(false);
        }
      } catch (error) {
        console.error(`Error rendering page ${pageNumber}:`, error);
        if (active) {
          setRendering(false);
        }
      }
    };

    renderPage();

    return () => {
      active = false;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdf, pageNumber, scale]);

  return (
    <div className="relative shadow-2xl border border-border-strong rounded-sm bg-white overflow-hidden max-w-full">
      {rendering && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <Loader2 className="h-5 w-5 animate-spin text-accent" />
        </div>
      )}
      <canvas ref={canvasRef} className="block max-w-full" />
    </div>
  );
}
