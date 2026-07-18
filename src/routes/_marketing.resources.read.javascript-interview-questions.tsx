import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "javascript-interview-questions",
  title: "JavaScript — Interview Questions",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "37 min",
  pages: 37,
  lastUpdated: "October 2026",
  tags: ["Programming", "JS", "ES2020+"],
  heroImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1800&q=80",
  heroSubtitle: "350+ JavaScript interview questions \u2014 closures, hoisting, prototypes, event loop, promises, async/await, modules, browser APIs.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "s1", label: "1. Closures & Scope" },
  { id: "s2", label: "2. Hoisting & TDZ" },
  { id: "s3", label: "3. Prototypes & Classes" },
  { id: "s4", label: "4. Event Loop" },
  { id: "s5", label: "5. Promises" },
  { id: "s6", label: "6. Async/Await" },
  { id: "s7", label: "7. Modules & Bundlers" },
  { id: "s8", label: "8. Browser APIs" },
  { id: "s9", label: "9. Coding Rounds" },
  { id: "s10", label: "10. HR & Behavioral" },

  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "flow", label: "Flowchart & Architecture" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "JavaScript — Complete Tutorial", tag: "Programming", time: "47 min" },
  { title: "JavaScript — Cheat Sheet", tag: "Programming", time: "3 min" },
  { title: "JavaScript — Interview Questions", tag: "Programming", time: "37 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/javascript-interview-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/javascript-interview-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the core concepts covered in JavaScript — Interview Questions.</li>
          <li>Apply the techniques through code examples and real-world scenarios.</li>
          <li>Recognize best practices and avoid common pitfalls.</li>
          <li>Use the comparison tables and flowcharts as quick references.</li>
          <li>Answer FAQs and confidently continue further reading.</li>
        </ul>
      </Section>

      <Section id="intro" title="Introduction">
        <p>A layered, hint-driven interview handbook covering junior to senior engineering rounds.</p>
        <Callout tone="info" title="Who this is for">Developers moving through the JavaScript learning journey — from first-timers to seasoned engineers looking for a refresher or reference.</Callout>
        <Figure src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1400&q=80" caption="Figure 1 — JavaScript powers browsers, servers (Node.js), and edge runtimes across the modern web." />
      </Section>

      <Section id="s1" title="1. Closures & Scope">
        <p>20+ Qs — including practical closure traps.</p>
        <Code lang="js">{`// Closures & Scope — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from closures & scope";
};`}</Code>
      </Section>

      <Section id="s2" title="2. Hoisting & TDZ">
        <p>10+ Qs — var vs let/const.</p>
        <Code lang="js">{`// Hoisting & TDZ — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from hoisting & tdz";
};`}</Code>
      </Section>

      <Section id="s3" title="3. Prototypes & Classes">
        <p>30+ Qs — chain, inheritance.</p>
        <Code lang="js">{`// Prototypes & Classes — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from prototypes & classes";
};`}</Code>
      </Section>

      <Section id="s4" title="4. Event Loop">
        <p>25+ Qs — micro vs macrotasks.</p>
        <Code lang="js">{`// Event Loop — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from event loop";
};`}</Code>
      </Section>

      <Section id="s5" title="5. Promises">
        <p>40+ Qs — chaining, error propagation.</p>
        <Code lang="js">{`// Promises — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from promises";
};`}</Code>
      </Section>

      <Section id="s6" title="6. Async/Await">
        <p>30+ Qs — parallelism, sequencing.</p>
        <Code lang="js">{`// Async/Await — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from async/await";
};`}</Code>
      </Section>

      <Section id="s7" title="7. Modules & Bundlers">
        <p>20+ Qs — ESM vs CJS.</p>
        <Code lang="js">{`// Modules & Bundlers — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from modules & bundlers";
};`}</Code>
      </Section>

      <Section id="s8" title="8. Browser APIs">
        <p>30+ Qs — DOM, Storage, Workers.</p>
        <Code lang="js">{`// Browser APIs — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from browser apis";
};`}</Code>
      </Section>

      <Section id="s9" title="9. Coding Rounds">
        <p>50+ challenges — flatten, debounce, curry.</p>
        <Code lang="js">{`// Coding Rounds — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from coding rounds";
};`}</Code>
      </Section>

      <Section id="s10" title="10. HR & Behavioral">
        <p>Common questions & STAR framework.</p>
        <Code lang="js">{`// HR & Behavioral — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from hr & behavioral";
};`}</Code>
      </Section>



      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <code>const</code>; use <code>let</code> only when reassignment is needed. Avoid <code>var</code>.</li>
          <li>Use strict equality (<code>===</code>) unless you deliberately want coercion.</li>
          <li>Handle promise rejections; never leave an <code>async</code> function's error path silent.</li>
          <li>Keep functions small and pure where possible; isolate side effects.</li>
          <li>Lint with ESLint + typecheck with TypeScript (or JSDoc types) in CI.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Forgetting <code>await</code> inside an <code>async</code> function.</li>
          <li>Mutating shared objects instead of returning new ones.</li>
          <li>Using <code>==</code> and being surprised by coercion.</li>
          <li>Attaching event listeners without cleanup, causing memory leaks.</li>
          <li>Relying on <code>this</code> in arrow functions where lexical binding differs.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>console.table()</code> renders arrays of objects as neat tables.</li>
          <li><code>structuredClone(value)</code> is the modern deep clone.</li>
          <li>Use <code>AbortController</code> to cancel <code>fetch</code> requests.</li>
          <li><code>Promise.allSettled</code> when you need every result, success or failure.</li>
          <li>Optional chaining (<code>?.</code>) + nullish coalescing (<code>??</code>) eliminate defensive checks.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Concept</th><th className="border p-2 text-left">Use When</th><th className="border p-2 text-left">Avoid When</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">Callbacks</td><td className="border p-2">Simple event handlers</td><td className="border p-2">Deep async chains</td></tr>
            <tr><td className="border p-2">Promises</td><td className="border p-2">Composable async</td><td className="border p-2">Fire-and-forget with cleanup needs</td></tr>
            <tr><td className="border p-2">Async/Await</td><td className="border p-2">Readable sequential async</td><td className="border p-2">Parallel independent tasks (use Promise.all)</td></tr>
            <tr><td className="border p-2">ESM Modules</td><td className="border p-2">Modern apps, tree-shaking</td><td className="border p-2">Legacy Node scripts without config</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="flow" title="Flowchart & Architecture">
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Event loop: call stack processes synchronous code, then drains microtasks (Promises) before the next macrotask." />
        <Code lang="text">{`Sync Code → Call Stack
    ↓
Microtasks (Promises) drain fully
    ↓
Render (if needed)
    ↓
Next Macrotask (setTimeout, I/O, UI events)`}</Code>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>JavaScript — Interview Questions equips you with the practical knowledge to write, debug, and ship JavaScript with confidence.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the fundamentals before reaching for frameworks.</li>
          <li>Understand async deeply — it unblocks everything else.</li>
          <li>Lean on modern syntax (<code>?.</code>, <code>??</code>, destructuring) for clarity.</li>
          <li>Test and lint from day one; both compound over time.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need TypeScript to write good JavaScript?">No — but adding JSDoc types or migrating to TypeScript catches whole classes of bugs earlier.</FAQItem>
        <FAQItem q="How much JavaScript is enough before learning React?">Comfort with functions, closures, arrays/objects, and async/await. You don't need every ES feature memorized.</FAQItem>
        <FAQItem q="Is Node.js different from browser JavaScript?">The language is identical; the built-in APIs differ. Node ships <code>fs</code>, <code>path</code>; browsers ship <code>document</code>, <code>fetch</code> (also in Node 18+).</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content — verify APIs against the latest ECMAScript spec and MDN documentation. Examples target modern evergreen browsers and Node.js 18+.</p>
      </Section>
    </ReaderShell>
  );
}
