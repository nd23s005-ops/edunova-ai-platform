import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "tailwind-css-reference-guide",
  title: "Tailwind CSS — Reference Guide",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "42 min",
  pages: 58,
  lastUpdated: "March 2026",
  tags: ["Tailwind", "Design"],
  heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1800&q=80",
  heroSubtitle: 'A complete reference for Tailwind CSS utilities, variants, configuration, and directives.',
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
  { title: "Tailwind CSS — Beginner Guide", tag: "Tailwind", time: "18 min" },
  { title: "Tailwind CSS — Cheat Sheet", tag: "Tailwind", time: "4 min" },
  { title: "Tailwind CSS — Interview Questions", tag: "Tailwind", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/tailwind-css-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/tailwind-css-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Reference Guide</b> — practical, production-ready Tailwind CSS.</li>
          <li>Compose responsive, accessible UIs using utility-first classes and state variants.</li>
          <li>Design theming and dark mode with CSS variables and Tailwind's theme system.</li>
          <li>Structure component libraries, tokens, and design systems around Tailwind.</li>
          <li>Optimize Tailwind for production — content scanning, tree shaking, and bundle size.</li>
          <li>Integrate Tailwind with React, Next.js, Vue, Svelte, and Astro at scale.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Working knowledge of HTML5 and modern CSS (selectors, box model, Flexbox, Grid).</li>
          <li>Node.js 20+ and a package manager (npm, pnpm, or Bun) installed locally.</li>
          <li>An editor with Tailwind IntelliSense (VS Code + Tailwind CSS IntelliSense extension).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Tailwind CSS & Utility-First Design</li>
          <li>Installation — CDN, CLI, PostCSS, Vite, and framework integrations</li>
          <li>Core Utilities — colors, typography, spacing, sizing, borders, shadows, opacity</li>
          <li>Backgrounds & Gradients</li>
          <li>Layout — container, display, position, overflow, z-index, object-fit, visibility</li>
          <li>Flexbox — container, items, justify, align, gap, wrap, order</li>
          <li>Grid — columns, rows, areas, auto-flow, responsive grids</li>
          <li>Responsive Design — mobile-first, breakpoints, responsive typography</li>
          <li>Interactivity — hover, focus, active, group, peer, cursor, pointer-events</li>
          <li>Dark Mode — media strategy, class strategy, theme switching</li>
          <li>Animations — transitions, transform, scale, rotate, translate, keyframes</li>
          <li>Customization — theme, plugins, presets, CSS-first configuration</li>
          <li>Component Design — buttons, cards, forms, navbars, modals, tables, dashboards</li>
          <li>Design Systems — tokens, scales, component libraries, reusable UI</li>
          <li>Accessibility — focus visibility, contrast, keyboard navigation, screen readers</li>
          <li>Optimization — content scanning, tree shaking, production builds</li>
          <li>Framework Integration — React, Next.js, Vue, Angular, Svelte, Astro</li>
          <li>Enterprise Development — scalable UI, maintainability, team collaboration</li>
          <li>Career Paths — frontend, UI engineer, portfolio, interview prep</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Tailwind CSS is a utility-first CSS framework that ships thousands of small, composable class names — you build UI by composing utilities directly in your markup, without writing custom stylesheets for every component. This resource — <b>Tailwind CSS — Reference Guide</b> — is self-contained: A complete reference for Tailwind CSS utilities, variants, configuration, and directives.</p>
        <Callout tone="info" title="Tailwind in one line">Tailwind CSS = utility-first classes + design tokens + JIT compilation → fast, consistent, production-ready UI.</Callout>
        <Figure src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=1400&q=80" caption="Figure 1 — Tailwind utility system — small, single-purpose classes compose into complex UI without leaving markup." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — Tailwind overview, utility-first philosophy, evolution, installation, CDN, CLI, PostCSS, Vite, React, Next.js.</li>
          <li><b>Core utilities</b> — colors, typography, spacing, sizing, borders, shadows, opacity, backgrounds, gradients.</li>
          <li><b>Layout</b> — <code>container</code>, <code>display</code>, <code>position</code>, <code>overflow</code>, <code>z-index</code>, <code>object-fit</code>, <code>visibility</code>.</li>
          <li><b>Flexbox</b> — flex container / items, <code>justify-*</code>, <code>items-*</code>, <code>gap-*</code>, <code>flex-wrap</code>, <code>order-*</code>.</li>
          <li><b>Grid</b> — <code>grid-cols-*</code>, <code>grid-rows-*</code>, template areas, <code>auto-flow</code>, and responsive grids.</li>
          <li><b>Responsive design</b> — mobile-first, <code>sm</code>/<code>md</code>/<code>lg</code>/<code>xl</code>/<code>2xl</code> breakpoints, responsive utilities.</li>
          <li><b>Interactivity</b> — <code>hover:</code>, <code>focus:</code>, <code>active:</code>, <code>group</code>, <code>peer</code>, cursor, pointer-events.</li>
          <li><b>Dark mode</b> — media strategy, class strategy, and theme switching with <code>dark:</code>.</li>
          <li><b>Animations</b> — transitions, transforms (scale / rotate / translate), keyframes, and <code>animate-*</code>.</li>
          <li><b>Customization</b> — <code>tailwind.config.js</code> or CSS-first <code>@theme</code>, theme extension, plugins, presets.</li>
          <li><b>Component design</b> — buttons, cards, forms, navbars, modals, tables, dashboards, alerts.</li>
          <li><b>Design systems</b> — design tokens, color / typography / spacing scales, reusable UI.</li>
          <li><b>Accessibility</b> — <code>focus-visible</code>, contrast, keyboard navigation, screen-reader-friendly components.</li>
          <li><b>Optimization</b> — content scanning, tree shaking, production builds, bundle optimization.</li>
          <li><b>Framework integration</b> — React, Next.js, Vue, Angular, Svelte, Astro.</li>
          <li><b>Enterprise</b> — scalable UI architecture, maintainability, team collaboration.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-full-none rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Source (.tsx / .vue / .astro)
   │  utility classes in markup
   ▼
[Tailwind Engine] ── scans content ──▶ generates only used utilities
                          │
                          ▼
                @theme tokens + plugins
                          │
                          ▼
                Bundler (Vite / Webpack / Turbopack)
                          │
                          ▼
                 Browser — small, purged CSS`}
        </pre>
        <Code>{`{/* Utility-first component — no custom CSS required */}
export function PriceCard() {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition
                 hover:-translate-y-0.5 hover:shadow-lg
                 dark:border-slate-800 dark:bg-slate-900"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Pro</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">For growing teams.</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-slate-900 dark:text-slate-50">$24</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">/ month</span>
      </div>
      <button
        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium
                   text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-blue-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
      >
        Get started
      </button>
    </article>
  );
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1400&q=80" caption="Figure 2 — Design system architecture — Tailwind tokens power components, which compose into pages across every framework." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Design systems</b> — Shopify Polaris, GitHub Primer, and Vercel Geist all ship Tailwind-flavored tokens.</li>
          <li><b>Marketing sites</b> — Tailwind + Next.js is the default stack for Vercel, Linear, and thousands of SaaS landings.</li>
          <li><b>Dashboards</b> — Retool, Cal.com, and Supabase build data-heavy UIs on Tailwind + React.</li>
          <li><b>Component libraries</b> — shadcn/ui, Radix + Tailwind, and Headless UI ship accessible primitives.</li>
          <li><b>Email templates</b> — Tailwind Play + Maizzle produce pixel-perfect, responsive HTML emails.</li>
          <li><b>Mobile & native</b> — Tailwind-inspired NativeWind brings the same utilities to React Native.</li>
        </ul>
        <Code>{`{/* Responsive dashboard shell — Grid + Flex + dark mode */}
<div className="min-h-screen bg-slate-50 dark:bg-slate-950">
  <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[16rem_1fr]">
    <aside className="hidden border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:block">
      <nav className="flex flex-col gap-1">
        <a className="rounded-md bg-slate-900/5 px-3 py-2 text-sm font-medium">Overview</a>
        <a className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-900/5">Analytics</a>
        <a className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-900/5">Billing</a>
      </nav>
    </aside>
    <main className="p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold sm:text-2xl">Dashboard</h1>
        <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500">New</button>
      </header>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1,2,3,4].map((i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs text-slate-500">Metric {i}</p>
            <p className="mt-1 text-2xl font-semibold">1,240</p>
          </div>
        ))}
      </section>
    </main>
  </div>
</div>`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Adopt <b>utility-first</b> in markup; extract components only when a pattern repeats 3+ times.</li>
          <li>Centralize design decisions in <code>@theme</code> tokens — colors, spacing, radii, and typography.</li>
          <li>Use <b>state variants</b> (<code>hover:</code>, <code>focus-visible:</code>, <code>disabled:</code>) for interaction states.</li>
          <li>Design <b>mobile-first</b> — start with base utilities and add <code>sm:</code>, <code>md:</code>, <code>lg:</code> as needed.</li>
          <li>Adopt <b>class-based dark mode</b> for user-controlled theming with SSR-safe hydration.</li>
          <li>Pair Tailwind with <b>Headless UI</b> or <b>Radix</b> for accessible interactive primitives.</li>
          <li>Enforce order and consistency with the <b>prettier-plugin-tailwindcss</b> class sorter.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Concatenating class names with template strings — Tailwind's scanner cannot see dynamic fragments.</li>
          <li>Reaching for arbitrary values (<code>[13px]</code>, <code>[#abc]</code>) instead of tokens — breaks the design system.</li>
          <li>Extracting components too early — utilities are cheap; premature abstraction is not.</li>
          <li>Skipping <code>focus-visible</code> — invisible focus states break keyboard users.</li>
          <li>Fighting specificity with <code>!important</code> instead of restructuring or using variants.</li>
          <li>Forgetting to configure content paths — leaving unused classes purged out of production.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>group</code> / <code>peer</code> to style children based on parent / sibling state.</li>
          <li><code>grid-cols-[1fr_minmax(0,20rem)]</code> and other arbitrary values unlock precise layouts.</li>
          <li><code>data-[state=open]:</code> variants pair perfectly with Radix and Headless UI.</li>
          <li>Compose class names with <b>clsx</b> or <b>tailwind-merge</b> to avoid duplicate utility conflicts.</li>
          <li>Preview responsive states with the browser's device toolbar and <code>sm:</code>/<code>md:</code> prefixes.</li>
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
              <tr><td className="py-2 pr-4">Tailwind CSS</td><td>Utility framework</td><td>Rapid, token-driven UI in any framework.</td></tr>
              <tr><td className="py-2 pr-4">shadcn/ui</td><td>Copyable components</td><td>Accessible, themable primitives with Tailwind.</td></tr>
              <tr><td className="py-2 pr-4">Headless UI</td><td>Unstyled primitives</td><td>Fully accessible menus, dialogs, and comboboxes.</td></tr>
              <tr><td className="py-2 pr-4">Radix UI</td><td>Primitives</td><td>Accessible interactive components composed with Tailwind.</td></tr>
              <tr><td className="py-2 pr-4">Heroicons</td><td>Icon set</td><td>Consistent SVG icons that match Tailwind's aesthetic.</td></tr>
              <tr><td className="py-2 pr-4">clsx / cva</td><td>Class utilities</td><td>Compose conditional classes and component variants.</td></tr>
              <tr><td className="py-2 pr-4">Bootstrap</td><td>Component framework</td><td>Batteries-included components, less design freedom.</td></tr>
              <tr><td className="py-2 pr-4">CSS Modules</td><td>Scoped CSS</td><td>Component-scoped styles when utilities aren&apos;t enough.</td></tr>
              <tr><td className="py-2 pr-4">Styled Components</td><td>CSS-in-JS</td><td>Runtime themes with a JS-first mental model.</td></tr>
              <tr><td className="py-2 pr-4">PostCSS</td><td>Toolchain</td><td>Autoprefixer, nesting, and modern CSS lowering.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Accessibility, Performance & Browser Support">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Accessibility</b> — use <code>focus-visible:</code>, semantic HTML, and pair with Radix / Headless UI for a11y-heavy widgets.</li>
          <li><b>Performance</b> — configure <code>content</code> paths so JIT emits only used utilities; production CSS is often under 20KB gzipped.</li>
          <li><b>Rendering</b> — animate <code>transform</code> and <code>opacity</code>; avoid animating layout properties.</li>
          <li><b>Compatibility</b> — Tailwind emits standard CSS; check <b>Can I Use</b> for any utility that maps to a bleeding-edge property.</li>
          <li><b>Testing</b> — visual regression with Playwright / Chromatic on primary breakpoints.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tailwind CSS ships a design-token-backed utility set that scales from prototypes to enterprise UIs.</li>
          <li>Utility-first keeps decisions in markup — remove context switches and dead CSS.</li>
          <li><code>@theme</code> tokens, <code>dark:</code>, and state variants power theming and interaction states.</li>
          <li>Compose with clsx / tailwind-merge and extract components when patterns truly repeat.</li>
          <li>For scale, pair Tailwind with Radix / Headless UI and a design token pipeline.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Isn't utility-first just inline styles?">No — utilities are constrained to a design system (tokens, scales, states) and stay optimizable, purgable, and consistent.</FAQItem>
        <FAQItem q="Do I need to memorize every class?">No — Tailwind IntelliSense autocompletes classes and shows the underlying CSS on hover.</FAQItem>
        <FAQItem q="When should I extract a component?">When a class pattern truly repeats 3+ times with identical intent, or when semantics matter for accessibility.</FAQItem>
        <FAQItem q="How do I theme with Tailwind?">Define tokens in <code>@theme</code> (CSS-first) or <code>theme.extend</code> (config-first), then reference them in utilities and <code>dark:</code>.</FAQItem>
        <FAQItem q="Is my CSS bundle small in production?">Yes — Tailwind emits only utilities actually found by the content scanner, keeping production CSS tiny.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">Tailwind CSS Docs</a> · <a className="text-primary hover:underline" href="https://tailwindcss.com/docs/upgrade-guide" target="_blank" rel="noreferrer">Upgrade Guide</a> · <a className="text-primary hover:underline" href="https://tailwindcss.com/docs/theme" target="_blank" rel="noreferrer">Theme</a></li>
          <li><a className="text-primary hover:underline" href="https://tailwindcss.com/docs/plugins" target="_blank" rel="noreferrer">Plugins</a> · <a className="text-primary hover:underline" href="https://tailwindui.com/" target="_blank" rel="noreferrer">Tailwind UI</a> · <a className="text-primary hover:underline" href="https://heroicons.com/" target="_blank" rel="noreferrer">Heroicons</a></li>
          <li><a className="text-primary hover:underline" href="https://headlessui.com/" target="_blank" rel="noreferrer">Headless UI</a> · <a className="text-primary hover:underline" href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">shadcn/ui</a> · <a className="text-primary hover:underline" href="https://www.radix-ui.com/" target="_blank" rel="noreferrer">Radix UI</a></li>
          <li><a className="text-primary hover:underline" href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">MDN CSS</a> · <a className="text-primary hover:underline" href="https://web.dev/learn/css/" target="_blank" rel="noreferrer">web.dev — Learn CSS</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Tailwind CSS and third-party libraries evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
