import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "html5-pdf-notes",
  title: "HTML5 — PDF Notes",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "51 min",
  pages: 97,
  lastUpdated: "October 2026",
  tags: ["Web Development", "HTML", "A11y"],
  heroImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1800&q=80",
  heroSubtitle: "Chapter-wise printable HTML5 notes \u2014 semantic, forms, multimedia, SVG, Canvas, ARIA, metadata, SEO, responsive, validation, performance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "s1", label: "1. Ch 1 — Basics" },
  { id: "s2", label: "2. Ch 2 — Semantic HTML" },
  { id: "s3", label: "3. Ch 3 — Forms" },
  { id: "s4", label: "4. Ch 4 — Multimedia" },
  { id: "s5", label: "5. Ch 5 — SVG & Canvas" },
  { id: "s6", label: "6. Ch 6 — Accessibility" },
  { id: "s7", label: "7. Ch 7 — SEO & Metadata" },
  { id: "s8", label: "8. Ch 8 — Responsive" },
  { id: "s9", label: "9. Ch 9 — Validation" },
  { id: "s10", label: "10. Ch 10 — Performance" },

  { id: "practices", label: "Accessibility & Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "flow", label: "HTML Structure & Flow" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "HTML5 — Complete Tutorial", tag: "Web Development", time: "60 min" },
  { title: "HTML5 — Cheat Sheet", tag: "Web Development", time: "6 min" },
  { title: "HTML5 — Interview Questions", tag: "Web Development", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/html5-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/html5-pdf-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the core concepts covered in HTML5 — PDF Notes.</li>
          <li>Write semantic, accessible, SEO-friendly HTML5 markup.</li>
          <li>Recognize best practices and avoid the most common mistakes.</li>
          <li>Use the comparison tables and structure diagrams as quick references.</li>
          <li>Answer FAQs confidently and continue further reading.</li>
        </ul>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Structured, downloadable-quality HTML5 notes for offline study and revision.</p>
        <Callout tone="info" title="Who this is for">Developers, designers, and content authors building modern accessible web experiences.</Callout>
        <Figure src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1400&q=80" caption="Figure 1 — Semantic HTML5 landmarks give structure that both browsers and screen readers rely on." />
      </Section>

      <Section id="s1" title="1. Ch 1 — Basics">
        <p>Doctype, structure, tags.</p>
        <Code lang="html">{`<!-- Ch 1 — Basics — illustrative snippet -->
<section aria-label="ch 1 — basics">
  <h2>Ch 1 — Basics</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s2" title="2. Ch 2 — Semantic HTML">
        <p>Landmarks, outline.</p>
        <Code lang="html">{`<!-- Ch 2 — Semantic HTML — illustrative snippet -->
<section aria-label="ch 2 — semantic html">
  <h2>Ch 2 — Semantic HTML</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s3" title="3. Ch 3 — Forms">
        <p>Inputs, labels, validation.</p>
        <Code lang="html">{`<!-- Ch 3 — Forms — illustrative snippet -->
<section aria-label="ch 3 — forms">
  <h2>Ch 3 — Forms</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s4" title="4. Ch 4 — Multimedia">
        <p>Video, audio, picture.</p>
        <Code lang="html">{`<!-- Ch 4 — Multimedia — illustrative snippet -->
<section aria-label="ch 4 — multimedia">
  <h2>Ch 4 — Multimedia</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s5" title="5. Ch 5 — SVG & Canvas">
        <p>Vector & raster graphics.</p>
        <Code lang="html">{`<!-- Ch 5 — SVG & Canvas — illustrative snippet -->
<section aria-label="ch 5 — svg & canvas">
  <h2>Ch 5 — SVG & Canvas</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s6" title="6. Ch 6 — Accessibility">
        <p>ARIA, WCAG.</p>
        <Code lang="html">{`<!-- Ch 6 — Accessibility — illustrative snippet -->
<section aria-label="ch 6 — accessibility">
  <h2>Ch 6 — Accessibility</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s7" title="7. Ch 7 — SEO & Metadata">
        <p>OG, JSON-LD.</p>
        <Code lang="html">{`<!-- Ch 7 — SEO & Metadata — illustrative snippet -->
<section aria-label="ch 7 — seo & metadata">
  <h2>Ch 7 — SEO & Metadata</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s8" title="8. Ch 8 — Responsive">
        <p>Viewport, srcset.</p>
        <Code lang="html">{`<!-- Ch 8 — Responsive — illustrative snippet -->
<section aria-label="ch 8 — responsive">
  <h2>Ch 8 — Responsive</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s9" title="9. Ch 9 — Validation">
        <p>W3C, HTML lint.</p>
        <Code lang="html">{`<!-- Ch 9 — Validation — illustrative snippet -->
<section aria-label="ch 9 — validation">
  <h2>Ch 9 — Validation</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s10" title="10. Ch 10 — Performance">
        <p>preload, lazy.</p>
        <Code lang="html">{`<!-- Ch 10 — Performance — illustrative snippet -->
<section aria-label="ch 10 — performance">
  <h2>Ch 10 — Performance</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>



      <Section id="practices" title="Accessibility & Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use semantic elements before reaching for <code>&lt;div&gt;</code> and <code>&lt;span&gt;</code>.</li>
          <li>Every image needs a meaningful <code>alt</code> attribute (or <code>alt=""</code> if decorative).</li>
          <li>Associate every form control with a <code>&lt;label&gt;</code>.</li>
          <li>Preserve a logical heading hierarchy — never skip levels for visual size.</li>
          <li>Use ARIA only when native HTML cannot express the semantics.</li>
          <li>Include <code>&lt;meta name="viewport"&gt;</code>, <code>charset</code>, description, and OG tags.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Wrapping everything in <code>&lt;div&gt;</code> — losing semantic meaning.</li>
          <li>Missing or purely decorative <code>alt</code> text.</li>
          <li>Redundant ARIA roles on tags that already have them (<code>&lt;nav role="navigation"&gt;</code>).</li>
          <li>Skipping heading levels (h1 → h4) to match a design.</li>
          <li>Placing block elements inside inline elements or misnesting tags.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> for zero-JS disclosure widgets.</li>
          <li>Use the native <code>&lt;dialog&gt;</code> element for modals with focus trapping.</li>
          <li>Emmet expansions in VS Code speed up scaffolding tenfold.</li>
          <li>Run axe DevTools + Lighthouse before every commit.</li>
          <li><code>loading="lazy"</code> on offscreen images improves LCP for free.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Choice</th><th className="border p-2 text-left">Prefer When</th><th className="border p-2 text-left">Avoid When</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">&lt;article&gt;</td><td className="border p-2">Self-contained content</td><td className="border p-2">Simple grouping</td></tr>
            <tr><td className="border p-2">&lt;section&gt;</td><td className="border p-2">Thematic grouping with heading</td><td className="border p-2">Purely visual grouping</td></tr>
            <tr><td className="border p-2">&lt;div&gt;</td><td className="border p-2">Non-semantic wrapper</td><td className="border p-2">A semantic tag exists</td></tr>
            <tr><td className="border p-2">ARIA</td><td className="border p-2">Native HTML cannot express it</td><td className="border p-2">Semantic tag exists</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="flow" title="HTML Structure & Flow">
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Document flow: browser parses HTML → constructs DOM → merges with CSSOM → renders." />
        <Code lang="html">{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Page Title</title>
  </head>
  <body>
    <header><nav>...</nav></header>
    <main>
      <article>
        <h1>Heading</h1>
        <p>Content...</p>
      </article>
    </main>
    <footer>...</footer>
  </body>
</html>`}</Code>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>HTML5 — PDF Notes equips you with the practical knowledge to write semantic, accessible, and SEO-friendly HTML5.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Semantic HTML5 is accessibility and SEO for free.</li>
          <li>Landmarks give assistive tech the navigation it needs.</li>
          <li>Metadata is not optional — it defines discoverability.</li>
          <li>Test with real assistive tech, not only automated tools.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need to learn XHTML?">No — HTML5's living standard replaced XHTML. Follow HTML5 conventions.</FAQItem>
        <FAQItem q="When should I use ARIA?">Only when native HTML cannot express the semantics — the "no ARIA is better than bad ARIA" rule.</FAQItem>
        <FAQItem q="Is HTML alone enough for a job?">Almost never on its own. Pair it with CSS, JavaScript, and accessibility fundamentals for frontend roles.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content — verify APIs and attribute support against the latest HTML Living Standard, MDN, and WCAG guidelines.</p>
      </Section>
    </ReaderShell>
  );
}
