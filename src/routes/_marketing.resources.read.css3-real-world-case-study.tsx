import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "css3-real-world-case-study",
  title: "CSS3 — Real-world Case Study",
  category: "Web Development",
  difficulty: "Intermediate",
  readingTime: "23 min",
  pages: 19,
  lastUpdated: "January 2026",
  tags: ["CSS", "Flexbox"],
  heroImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1800&q=80",
  heroSubtitle: 'How real teams adopt CSS3 at scale — design systems, tokens, and lessons learned.',
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Accessibility, Performance & Browser Support" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "CSS3 — Beginner Guide", tag: "CSS", time: "18 min" },
  { title: "CSS3 — Cheat Sheet", tag: "CSS", time: "6 min" },
  { title: "CSS3 — Interview Questions", tag: "CSS", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/css3-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/css3-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Real-world Case Study</b> — practical, production-ready CSS3.</li>
          <li>Read and write modern CSS with confident use of selectors, cascade, and specificity.</li>
          <li>Design responsive, accessible layouts with Flexbox, Grid, and container queries.</li>
          <li>Model design systems with custom properties, tokens, and cascade layers.</li>
          <li>Optimize CSS delivery — critical CSS, minification, and rendering performance.</li>
          <li>Ship maintainable enterprise CSS — BEM, ITCSS, and utility-first architectures.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic HTML5 — elements, attributes, semantic tags, and the DOM.</li>
          <li>A modern browser (Chrome, Firefox, Safari, Edge) and DevTools open.</li>
          <li>An editor with CSS support (VS Code recommended) and a local live server.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to CSS3 & the Rendering Pipeline</li>
          <li>Syntax, Selectors, Cascade, Inheritance & Specificity</li>
          <li>The Box Model — content, padding, border, margin, box-sizing</li>
          <li>Units — px, em, rem, %, vw, vh, ch, clamp() and modern math functions</li>
          <li>Layout — display, position, float, z-index, overflow, visibility</li>
          <li>Flexbox — container, items, direction, wrap, justify, align, gap</li>
          <li>CSS Grid — templates, areas, auto-flow, auto-fit / auto-fill, subgrid</li>
          <li>Responsive Design — media queries, breakpoints, container queries</li>
          <li>Typography — web fonts, font loading, line-height, letter-spacing</li>
          <li>Colors — RGB / HSL / OKLCH / color-mix, gradients, opacity</li>
          <li>Backgrounds, Borders, Shadows & Filters</li>
          <li>Transitions, Keyframes, Transforms (2D / 3D), and animation timing</li>
          <li>Modern CSS — variables, nesting, cascade layers, :has(), :is(), :where()</li>
          <li>Accessibility — focus rings, reduced motion, contrast, screen-reader styling</li>
          <li>Performance — critical CSS, minification, GPU acceleration</li>
          <li>Architecture — BEM, SMACSS, OOCSS, ITCSS, Atomic / utility-first</li>
          <li>Frameworks — Tailwind CSS, Bootstrap, Bulma, Foundation</li>
          <li>Design Systems — tokens, components, spacing / color / type scales</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>CSS3 is the modern styling language of the web — a living standard that powers layout, typography, color, motion, and design systems across every browser. This resource — <b>CSS3 — Real-world Case Study</b> — is self-contained: How real teams adopt CSS3 at scale — design systems, tokens, and lessons learned.</p>
        <Callout tone="info" title="CSS3 in one line">CSS3 = declarative styling + cascade + modern layout (Flexbox, Grid) + design-system primitives (custom properties, layers, container queries).</Callout>
        <Figure src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80" caption="Figure 1 — Browser rendering pipeline — HTML + CSS build the DOM and CSSOM, which combine into the render tree, layout, and paint stages." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history of CSS, CSS3 evolution, browser rendering, syntax, cascade, inheritance, specificity.</li>
          <li><b>Selectors</b> — universal, type, class, id, attribute, pseudo-classes, pseudo-elements, combinators (descendant, child, adjacent, general sibling).</li>
          <li><b>Box model</b> — content, padding, border, margin, <code>box-sizing</code>, and <code>overflow</code>.</li>
          <li><b>Units</b> — <code>px</code>, <code>em</code>, <code>rem</code>, <code>%</code>, <code>vw</code>, <code>vh</code>, <code>vmin</code>, <code>vmax</code>, <code>ch</code>, and modern math (<code>clamp()</code>, <code>min()</code>, <code>max()</code>, <code>calc()</code>).</li>
          <li><b>Layout</b> — <code>display</code>, <code>position</code>, <code>float</code>, <code>clear</code>, <code>z-index</code>, <code>overflow</code>, and stacking contexts.</li>
          <li><b>Flexbox</b> — flex container / items, direction, wrap, <code>justify-content</code>, <code>align-items</code>, <code>gap</code>, and ordering.</li>
          <li><b>Grid</b> — grid container / items, template areas, auto-flow, <code>auto-fit</code> / <code>auto-fill</code>, grid lines, and subgrid.</li>
          <li><b>Responsive design</b> — media queries, mobile-first vs desktop-first, responsive images, and container queries.</li>
          <li><b>Typography</b> — web fonts, font loading (<code>font-display</code>), line-height, letter-spacing, and text overflow.</li>
          <li><b>Colors</b> — RGB, RGBA, HEX, HSL, modern color functions, opacity, and gradients.</li>
          <li><b>Backgrounds & borders</b> — background images, gradients, borders, border-radius, and shadows.</li>
          <li><b>Animations</b> — transitions, keyframes, 2D/3D transforms, and animation timing functions.</li>
          <li><b>Modern CSS</b> — custom properties (variables), nesting, cascade layers, <code>:has()</code>, <code>:is()</code>, <code>:where()</code>.</li>
          <li><b>Accessibility</b> — focus states, reduced motion, contrast, and screen-reader-friendly styling.</li>
          <li><b>Performance</b> — critical CSS, minification, rendering performance, and GPU acceleration.</li>
          <li><b>Architecture</b> — BEM, SMACSS, OOCSS, ITCSS, and Atomic / utility-first CSS.</li>
          <li><b>Frameworks</b> — Tailwind CSS, Bootstrap, Bulma, Foundation.</li>
          <li><b>Design systems</b> — tokens, components, spacing / color / typography scales.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`HTML ──▶ DOM ─┐
                ├──▶ Render Tree ──▶ Layout ──▶ Paint ──▶ Composite
CSS  ──▶ CSSOM ┘                     │
                                     ▼
                        Flexbox / Grid / Container Queries
                                     │
                                     ▼
                       Design Tokens · Cascade Layers · Themes`}
        </pre>
        <Code>{`/* Modern CSS3 — design tokens, layers, and responsive grid */
@layer reset, tokens, components, utilities;

@layer tokens {
  :root {
    --space-1: 0.25rem;
    --space-4: 1rem;
    --radius: 0.75rem;
    --color-bg: oklch(98% 0.01 250);
    --color-fg: oklch(20% 0.03 250);
    --color-accent: oklch(65% 0.18 260);
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: oklch(15% 0.02 250);
      --color-fg: oklch(96% 0.01 250);
    }
  }
}

@layer components {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
    gap: clamp(1rem, 2vw, 2rem);
  }
  .card {
    background: var(--color-bg);
    color: var(--color-fg);
    border-radius: var(--radius);
    padding: var(--space-4);
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.06), 0 8px 24px rgb(0 0 0 / 0.06);
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .card:hover { transform: translateY(-2px); }
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1400&q=80" caption="Figure 2 — Modern CSS layout — Flexbox handles one-dimensional flows while Grid owns two-dimensional page structure." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Design systems</b> — Material, Polaris, Carbon, and Primer expose CSS custom properties as design tokens.</li>
          <li><b>Responsive dashboards</b> — Grid + container queries build fluid analytics UIs that adapt per component.</li>
          <li><b>Marketing sites</b> — Tailwind and utility-first CSS ship pixel-perfect landing pages at scale.</li>
          <li><b>Rich animations</b> — CSS keyframes and view transitions power on-brand micro-interactions.</li>
          <li><b>Theming</b> — cascade layers + <code>color-scheme</code> deliver light / dark / high-contrast themes.</li>
          <li><b>Accessibility</b> — <code>:focus-visible</code>, <code>prefers-reduced-motion</code>, and semantic color roles.</li>
        </ul>
        <Code>{`/* Flexbox navbar with responsive gap and mobile menu */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  padding: 1rem 1.25rem;
}
.nav__links {
  display: flex;
  gap: 1rem;
}
@media (max-width: 640px) {
  .nav__links { display: none; }
  .nav__toggle { display: inline-flex; }
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <b>modern layout</b> (Flexbox and Grid) over floats and positioning hacks.</li>
          <li>Adopt <b>design tokens</b> via CSS custom properties for color, spacing, and typography.</li>
          <li>Use <b>cascade layers</b> (<code>@layer</code>) to control specificity in large codebases.</li>
          <li>Design <b>mobile-first</b> — start small and add complexity at larger breakpoints.</li>
          <li>Respect <code>prefers-reduced-motion</code>, <code>prefers-color-scheme</code>, and forced-colors modes.</li>
          <li>Keep specificity low — favor classes; avoid IDs and <code>!important</code> in application code.</li>
          <li>Ship <b>critical CSS</b> inline and lazy-load the rest for fast first paint.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Fighting specificity with <code>!important</code> instead of restructuring selectors or using layers.</li>
          <li>Using <code>px</code> everywhere — favor <code>rem</code> / <code>em</code> / <code>ch</code> for accessible scaling.</li>
          <li>Over-nesting selectors and coupling styles tightly to HTML structure.</li>
          <li>Forgetting <code>box-sizing: border-box</code> on the base reset.</li>
          <li>Animating layout properties (<code>width</code>, <code>height</code>) instead of <code>transform</code> and <code>opacity</code>.</li>
          <li>Ignoring accessibility — removing focus rings, low contrast, or motion without a reduced-motion escape.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>clamp()</code> for fluid typography and spacing without media queries.</li>
          <li><code>grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr))</code> — instant responsive card grid.</li>
          <li><code>:has()</code> lets a parent style itself based on its children — powerful for forms and cards.</li>
          <li>Use <code>gap</code> for spacing in Flex and Grid — kill margin hacks between children.</li>
          <li>Debug layout with <code>outline: 1px solid</code> — it does not shift boxes like <code>border</code> does.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Feature / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Flexbox</td><td>1D layout</td><td>Navbars, toolbars, and single-axis alignment.</td></tr>
              <tr><td className="py-2 pr-4">Grid</td><td>2D layout</td><td>Page structure, dashboards, complex responsive grids.</td></tr>
              <tr><td className="py-2 pr-4">Container Queries</td><td>Component responsiveness</td><td>Reusable components that adapt to their container size.</td></tr>
              <tr><td className="py-2 pr-4">Custom Properties</td><td>Design tokens</td><td>Theming, dark mode, and design systems.</td></tr>
              <tr><td className="py-2 pr-4">Cascade Layers</td><td>Specificity control</td><td>Reset / tokens / components / utilities layering.</td></tr>
              <tr><td className="py-2 pr-4">Tailwind CSS</td><td>Utility framework</td><td>Rapid delivery with a design-token-driven utility set.</td></tr>
              <tr><td className="py-2 pr-4">Bootstrap</td><td>Component framework</td><td>Prebuilt components and grid for fast prototyping.</td></tr>
              <tr><td className="py-2 pr-4">BEM</td><td>Naming methodology</td><td>Predictable class names in large teams.</td></tr>
              <tr><td className="py-2 pr-4">ITCSS</td><td>Architecture</td><td>Structured layering from generic to explicit.</td></tr>
              <tr><td className="py-2 pr-4">PostCSS</td><td>Toolchain</td><td>Autoprefixer, nesting, and modern syntax lowering.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Accessibility, Performance & Browser Support">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Accessibility</b> — maintain visible <code>:focus-visible</code> rings, target contrast ratio ≥ 4.5:1, respect reduced motion.</li>
          <li><b>Performance</b> — inline critical CSS, defer non-critical, and minify with a CSS pipeline.</li>
          <li><b>Rendering</b> — animate <code>transform</code> and <code>opacity</code>; use <code>will-change</code> sparingly.</li>
          <li><b>Compatibility</b> — check <b>Can I Use</b>, and provide graceful fallbacks with <code>@supports</code>.</li>
          <li><b>Testing</b> — visual regression with Playwright, Chromatic, or Percy on key breakpoints.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>CSS3 turns HTML into a designed, responsive, accessible interface — cascade first, then specificity.</li>
          <li>Flexbox handles one-dimensional flows; Grid owns two-dimensional page structure.</li>
          <li>Custom properties + cascade layers + container queries unlock modern design systems.</li>
          <li>Respect users — motion, color scheme, contrast, and forced-colors are first-class concerns.</li>
          <li>For scale, invest in architecture (BEM / ITCSS / utility-first) and design tokens.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need to learn Flexbox or Grid first?">Learn <b>Flexbox</b> first for one-dimensional flows, then Grid for two-dimensional page structure. They complement each other.</FAQItem>
        <FAQItem q="Should I use px, em, or rem?">Use <code>rem</code> for typography and spacing to respect user font-size preferences. Use <code>px</code> only for hairlines and fixed borders.</FAQItem>
        <FAQItem q="Is Tailwind CSS still just CSS?">Yes — Tailwind ships utility classes that compile to real CSS. All CSS3 knowledge still applies.</FAQItem>
        <FAQItem q="What about older browsers?">Use <code>@supports</code> to feature-detect and layer progressive enhancements. Modern evergreen browsers cover 95%+ of features shown here.</FAQItem>
        <FAQItem q="How do I stop specificity wars?">Use classes only, keep selectors flat, and adopt <code>@layer</code> to order reset / tokens / components / utilities.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">MDN CSS</a> · <a className="text-primary hover:underline" href="https://www.w3.org/Style/CSS/" target="_blank" rel="noreferrer">W3C CSS</a> · <a className="text-primary hover:underline" href="https://drafts.csswg.org/" target="_blank" rel="noreferrer">CSSWG Drafts</a></li>
          <li><a className="text-primary hover:underline" href="https://web.dev/learn/css/" target="_blank" rel="noreferrer">web.dev — Learn CSS</a> · <a className="text-primary hover:underline" href="https://caniuse.com/" target="_blank" rel="noreferrer">Can I Use</a> · <a className="text-primary hover:underline" href="https://css-tricks.com/" target="_blank" rel="noreferrer">CSS-Tricks</a></li>
          <li><a className="text-primary hover:underline" href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">Tailwind CSS</a> · <a className="text-primary hover:underline" href="https://getbootstrap.com/docs/" target="_blank" rel="noreferrer">Bootstrap</a> · <a className="text-primary hover:underline" href="https://bulma.io/documentation/" target="_blank" rel="noreferrer">Bulma</a></li>
          <li><a className="text-primary hover:underline" href="https://get.foundation/sites/docs/" target="_blank" rel="noreferrer">Foundation</a> · <a className="text-primary hover:underline" href="https://developers.google.com/web/fundamentals" target="_blank" rel="noreferrer">Google Web Fundamentals</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. CSS3, browser engines, and third-party frameworks evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
