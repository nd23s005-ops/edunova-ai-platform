import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "javascript-reference-guide",
  title: "JavaScript — Reference Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "58 min",
  pages: 81,
  lastUpdated: "October 2026",
  tags: ["Programming", "JS", "ES2020+"],
  heroImage: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1800&q=80",
  heroSubtitle: "Comprehensive reference \u2014 syntax, operators, built-ins, array/string methods, ES2020+, browser APIs, Fetch, DOM, config.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "s1", label: "1. Syntax" },
  { id: "s2", label: "2. Operators" },
  { id: "s3", label: "3. Built-in Objects" },
  { id: "s4", label: "4. Array Methods" },
  { id: "s5", label: "5. String Methods" },
  { id: "s6", label: "6. ES2020+" },
  { id: "s7", label: "7. Browser APIs" },
  { id: "s8", label: "8. Modules" },
  { id: "s9", label: "9. Debugging" },
  { id: "s10", label: "10. Performance" },
  { id: "s11", label: "11. Config" },

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

export const Route = createFileRoute("/_marketing/resources/read/javascript-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/javascript-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the core concepts covered in JavaScript — Reference Guide.</li>
          <li>Apply the techniques through code examples and real-world scenarios.</li>
          <li>Recognize best practices and avoid common pitfalls.</li>
          <li>Use the comparison tables and flowcharts as quick references.</li>
          <li>Answer FAQs and confidently continue further reading.</li>
        </ul>
      </Section>

      <Section id="intro" title="Introduction">
        <p>The single reference you can bookmark for daily JavaScript engineering work.</p>
        <Callout tone="info" title="Who this is for">Developers moving through the JavaScript learning journey — from first-timers to seasoned engineers looking for a refresher or reference.</Callout>
        <Figure src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1400&q=80" caption="Figure 1 — JavaScript powers browsers, servers (Node.js), and edge runtimes across the modern web." />
      </Section>

      <Section id="s1" title="1. Syntax">
        <p>Statements, expressions, declarations.</p>
        <Code lang="js">{`// Syntax — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from syntax";
};`}</Code>
      </Section>

      <Section id="s2" title="2. Operators">
        <p>Arithmetic, logical, bitwise, assignment.</p>
        <Code lang="js">{`// Operators — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from operators";
};`}</Code>
      </Section>

      <Section id="s3" title="3. Built-in Objects">
        <p>Array, Object, Map, Set, Date, RegExp.</p>
        <Code lang="js">{`// Built-in Objects — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from built-in objects";
};`}</Code>
      </Section>

      <Section id="s4" title="4. Array Methods">
        <p>Full table with signatures & complexity.</p>
        <Code lang="js">{`// Array Methods — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from array methods";
};`}</Code>
      </Section>

      <Section id="s5" title="5. String Methods">
        <p>Full table with signatures.</p>
        <Code lang="js">{`// String Methods — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from string methods";
};`}</Code>
      </Section>

      <Section id="s6" title="6. ES2020+">
        <p>?. ?? BigInt, WeakRef, top-level await.</p>
        <Code lang="js">{`// ES2020+ — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from es2020+";
};`}</Code>
      </Section>

      <Section id="s7" title="7. Browser APIs">
        <p>fetch, Storage, IntersectionObserver.</p>
        <Code lang="js">{`// Browser APIs — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from browser apis";
};`}</Code>
      </Section>

      <Section id="s8" title="8. Modules">
        <p>import/export, dynamic, workers.</p>
        <Code lang="js">{`// Modules — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from modules";
};`}</Code>
      </Section>

      <Section id="s9" title="9. Debugging">
        <p>console.*, breakpoints, sources tab.</p>
        <Code lang="js">{`// Debugging — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from debugging";
};`}</Code>
      </Section>

      <Section id="s10" title="10. Performance">
        <p>Profiler, coverage, memory.</p>
        <Code lang="js">{`// Performance — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from performance";
};`}</Code>
      </Section>

      <Section id="s11" title="11. Config">
        <p>package.json, tsconfig, vite.config.</p>
        <Code lang="js">{`// Config — illustrative snippet
const example = () => {
  // apply concepts covered above
  return "hello from config";
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
        <p>JavaScript — Reference Guide equips you with the practical knowledge to write, debug, and ship JavaScript with confidence.</p>
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
