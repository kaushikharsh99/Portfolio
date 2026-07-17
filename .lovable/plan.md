# Portfolio Redesign — Multi-Page AI Systems Researcher Site

Goal: rebuild the site as a true multi-page experience with distinct information architecture, cinematic Home, per-project immersive case studies, and dedicated Research / Open Source / Reading / About / Resume / Contact pages. Visual language: OpenAI Research × Anthropic × Linear × Vercel. Restrained motion, deep technical storytelling, no generic portfolio tropes.

---

## 1. Information Architecture

New routes (each with its own head() metadata + own visual rhythm):

```text
/                → Home (cinematic, curated)
/projects        → Projects index (5 case studies)
/projects/$slug  → Immersive case study per project
/research        → Research notebook (interests, roadmap, notes)
/open-source     → Models · Datasets · Repositories (3 tabs)
/reading         → Papers library (Goodreads × research journal)
/about           → Technical story / research statement
/resume          → Premium embedded PDF viewer
/contact         → Contact + availability
```

Sticky global nav (already exists) is extended with `Reading`. Nav gets subtle scroll-shrink and route-aware active underline.

---

## 2. Home page — cinematic, minimal

Sections (in order, generous whitespace between):

1. **Hero** — kept minimal: name, one-line identity ("I build, train, and optimize language models."), animated attention-graph backdrop (already built) — but trimmed of stat rows.
2. **Featured project — TurboLLM** — full-bleed card with live-streaming terminal benchmark preview → deep link to `/projects/turbollm`.
3. **Featured model — TinyStories-17M** — architecture-diagram card, params/tokens/loss chips → deep link.
4. **Currently researching** — 3 short cards (MoE offloading, QAT+fused kernels, dataset-quality scaling) → link to `/research`.
5. **Recent open source** — 3 latest artifacts (mix of model/dataset/repo) → link to `/open-source`.
6. **CTA strip** — "Open to research collaborations and internships" + contact + resume.

Remove: contribution graph, giant toolkit chip cloud, papers-studied index, timeline. These move to their proper pages.

---

## 3. Projects (5 immersive case studies)

`/projects` becomes a curated index (large editorial cards, one per project, unique accent). Each project gets its own route with a bespoke visual identity.

Common structure per case study:
Hero · Motivation · Problem · Architecture · Implementation · Benchmarks · Challenges · Lessons · Future Work · Repo/Links · Related Work.

Bespoke visuals per project:

- **TurboLLM** — systems aesthetic. SSD→RAM→VRAM streaming animation (SVG lanes with animated packets), MoE expert-routing diagram (tokens fan-out to experts), GPU memory hierarchy bar, live benchmark terminal, tok/s dashboard.
- **TinyStories-17M** — research-paper aesthetic. Transformer block diagram (attention → MLP → residual), BPE tokenizer flow, training-loss chart with animated draw-on, sample generations in a scrollable strip, eval table.
- **Indian Legal LLM** — post-training report. Dataset evolution timeline (v1→v4 cards), before/after answer slider, failure-mode taxonomy, "dataset > params" pull-quote panel.
- **MathInstruct v1** — benchmark improvement report. Baseline vs finetuned bar chart (animated), SFT pipeline diagram, per-benchmark deltas (GSM8K, MATH, etc.).
- **Spam Detection** — classical→DL→distillation. Three-column evolution (Naive Bayes → BiLSTM → distilled), teacher/student diagram with knowledge-flow arrows, size vs accuracy scatter.

Existing `ProjectExpanded` modal is retired in favor of real routes for SEO, share links, and back/forward navigation.

---

## 4. Research page

Feels like an evolving notebook:

- Research statement (short, first-person)
- Current focus (3 cards) + Future directions (3 cards)
- Interest-evolution timeline (Classical ML → NLP → LLMs → Post-training → Efficient inference) — animated vertical rail
- Engineering notes (short essays, teaser cards → link to reading/notes)
- Reproduced papers (small grid → deep link to `/reading`)

---

## 5. Open Source page

Three separate sections with tab switcher (Models / Datasets / Repositories). Each card: title, one-liner, tags, publication date, downloads (when known), HF or GitHub icon + link. Elegant filter chips (task, modality, year).

---

## 6. Reading page

Papers library. Filter chips (Year, Topic, Status: Read/Reading/Queued, Reproduced: yes/no). Each card: title, authors, year, venue, personal takeaway (2 lines), which projects it influenced, external link. Sort by year / recency / influence.

---

## 7. About page

Long-form research statement (not a bio). Sections: Origin, Why efficient inference, Why train from scratch, How I learn, Problems I want to solve, Long-term vision. Sparse imagery — mostly typography and rhythm.

---

## 8. Resume page

Premium embedded PDF viewer:
- `react-pdf` (pdfjs-dist) rendering pages onto canvases, dark UI shell
- Toolbar: page nav, zoom, fit-width/page toggle, fullscreen, download
- Keyboard: ←/→ pages, +/− zoom, F fullscreen, D download
- Fallback: object/embed for unsupported browsers

---

## 9. Contact page

Clean two-column: left = short note + availability badge + collaboration preferences (Research collab · Internship · OSS · Speaking); right = channel list (Email, GitHub, LinkedIn, Hugging Face, X) with copy-to-clipboard on email. Small footer with location + timezone.

---

## 10. Design system additions

- Add per-project accent tokens (`--accent-turbollm`, `--accent-tinystories`, etc.) — subtle, used only for headings and 1px rules.
- Add `Section`, `SectionHeader`, `Pullquote`, `Figure`, `Caption`, `StatRow`, `Diagram` primitives so every case study reads consistently.
- Motion: page transitions via a route-level fade+lift (respect `prefers-reduced-motion`); chart draw-on with `framer-motion`'s `useInView`; terminal streaming with a token-per-frame RAF loop.
- Keep the near-black research-lab palette; no new gradients. Sparingly use accent-violet and accent for emphasis only.

---

## 11. Technical implementation notes

- Route files: `projects.index.tsx`, `projects.$slug.tsx`, `reading.tsx`, plus updates to existing routes.
- Case studies: MDX-like via typed data modules in `src/content/projects/*.tsx` exporting JSX blocks so bespoke diagrams live per project.
- Diagrams: hand-authored SVG (no heavy 3D lib). MoE routing / SSD→VRAM streaming use inline SVG with `<animate>` and framer-motion for entrance.
- Reading + Open Source data: typed arrays in `src/content/reading.ts`, `src/content/oss.ts`.
- PDF viewer: `bun add react-pdf pdfjs-dist`; worker configured via Vite `?url` import.
- SEO: unique `head()` per route with og:title/og:description; per-project og:image is a rendered hero (existing hero image or generated).
- Accessibility: focus rings preserved, all diagrams have `<title>`/`<desc>`, reduced-motion disables draw-on and streaming animations.
- Performance: dynamic `import()` for `react-pdf` and heavy diagram components; images `loading="lazy"` + `decoding="async"`.

---

## 12. What gets removed / retired

- Single-page section stacking on `/` (contribution graph, timeline, big skills grid, papers-index on home) — moved to their proper pages.
- `ProjectExpanded` modal — replaced by real project routes.
- Any decorative motion that doesn't teach something.

---

## 13. Rollout order (single build)

1. Design tokens + Section/Figure/Diagram primitives + route scaffolding.
2. Trim Home to cinematic version.
3. Build `/projects` index + all 5 case study routes with bespoke visuals.
4. Build `/research`, `/open-source` (tabs), `/reading`.
5. Rewrite `/about` as research statement.
6. Build `/resume` PDF viewer.
7. Polish `/contact`.
8. Route transitions, reduced-motion audit, mobile pass, Lighthouse check.

Given the scope this is a large single implementation pass; I'll keep components small and reuse the new primitives so each case study reads distinct but the codebase stays coherent.
