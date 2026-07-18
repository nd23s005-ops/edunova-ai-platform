import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "html5-reference-guide",
  title: "HTML5 — Reference Guide",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "59 min",
  pages: 63,
  lastUpdated: "May 2026",
  tags: ["Web Development", "HTML", "A11y"],
  heroImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1800&q=80",
  heroSubtitle: "HTML5 reference \u2014 syntax, semantic elements, attributes, forms, media, SVG, Canvas, ARIA, metadata, SEO, entities.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "s1", label: "1. Elements" },
  { id: "s2", label: "2. Attributes" },
  { id: "s3", label: "3. Forms" },
  { id: "s4", label: "4. Multimedia" },
  { id: "s5", label: "5. SVG" },
  { id: "s6", label: "6. Canvas" },
  { id: "s7", label: "7. ARIA" },
  { id: "s8", label: "8. Metadata" },
  { id: "s9", label: "9. Entities" },
  { id: "s10", label: "10. Validation" },
  { id: "s11", label: "11. Compatibility" },

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

export const Route = createFileRoute("/_marketing/resources/read/html5-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/html5-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the core concepts covered in HTML5 — Reference Guide.</li>
          <li>Write semantic, accessible, SEO-friendly HTML5 markup.</li>
          <li>Recognize best practices and avoid the most common mistakes.</li>
          <li>Use the comparison tables and structure diagrams as quick references.</li>
          <li>Answer FAQs confidently and continue further reading.</li>
        </ul>
      </Section>

      <Section id="intro" title="Introduction">
        <p>The single reference to keep bookmarked for daily HTML work.</p>
        <Callout tone="info" title="Who this is for">Developers, designers, and content authors building modern accessible web experiences.</Callout>
        <Figure src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1400&q=80" caption="Figure 1 — Semantic HTML5 landmarks give structure that both browsers and screen readers rely on." />
      </Section>

      <Section id="s1" title="1. Elements">
        <p>Full alphabetical list.</p>
        <Code lang="html">{`<!-- Elements — illustrative snippet -->
<section aria-label="elements">
  <h2>Elements</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s2" title="2. Attributes">
        <p>Global + element-specific.</p>
        <Code lang="html">{`<!-- Attributes — illustrative snippet -->
<section aria-label="attributes">
  <h2>Attributes</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s3" title="3. Forms">
        <p>Every input type & attribute.</p>
        <Code lang="html">{`<!-- Forms — illustrative snippet -->
<section aria-label="forms">
  <h2>Forms</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s4" title="4. Multimedia">
        <p>&lt;video&gt;, &lt;audio&gt;, &lt;picture&gt;.</p>
        <Code lang="html">{`<!-- Multimedia — illustrative snippet -->
<section aria-label="multimedia">
  <h2>Multimedia</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s5" title="5. SVG">
        <p>Inline SVG cheatsheet.</p>
        <Code lang="html">{`<!-- SVG — illustrative snippet -->
<section aria-label="svg">
  <h2>SVG</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s6" title="6. Canvas">
        <p>2D API reference.</p>
        <Code lang="html">{`<!-- Canvas — illustrative snippet -->
<section aria-label="canvas">
  <h2>Canvas</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s7" title="7. ARIA">
        <p>Roles, states, properties.</p>
        <Code lang="html">{`<!-- ARIA — illustrative snippet -->
<section aria-label="aria">
  <h2>ARIA</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s8" title="8. Metadata">
        <p>&lt;meta&gt;, &lt;link&gt;, OG.</p>
        <Code lang="html">{`<!-- Metadata — illustrative snippet -->
<section aria-label="metadata">
  <h2>Metadata</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s9" title="9. Entities">
        <p>Named & numeric.</p>
        <Code lang="html">{`<!-- Entities — illustrative snippet -->
<section aria-label="entities">
  <h2>Entities</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s10" title="10. Validation">
        <p>W3C rules summary.</p>
        <Code lang="html">{`<!-- Validation — illustrative snippet -->
<section aria-label="validation">
  <h2>Validation</h2>
  <p>Apply the concepts covered above.</p>
</section>`}</Code>
      </Section>

      <Section id="s11" title="11. Compatibility">
        <p>Feature detection tips.</p>
        <Code lang="html">{`<!-- Compatibility — illustrative snippet -->
<section aria-label="compatibility">
  <h2>Compatibility</h2>
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
        <p>HTML5 — Reference Guide equips you with the practical knowledge to write semantic, accessible, and SEO-friendly HTML5.</p>
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
