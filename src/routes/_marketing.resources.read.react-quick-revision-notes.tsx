import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-quick-revision-notes",
  title: "React.js — Quick Revision Notes",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 6,
  lastUpdated: "February 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "Concise React.js revision notes optimized for interview prep and last-minute review — summaries, syntax references, comparison tables, and memory tricks.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "core", label: "Core Concepts" },
  { id: "hooks", label: "Hooks Cheat Table" },
  { id: "compare", label: "Comparison Tables" },
  { id: "tricks", label: "Memory Tricks" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Cheat Sheet", tag: "Web Development", time: "5 min" },
  { title: "React.js — PDF Notes", tag: "Web Development", time: "63 min" },
  { title: "React.js — Interview Questions", tag: "Web Development", time: "34 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-quick-revision-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-quick-revision-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Refresh every React essential in under 15 minutes.</li>
          <li>Recall syntax and hook rules under interview pressure.</li>
        </ul>
      </Section>

      <Section id="core" title="Core Concepts (One-liners)">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>JSX:</strong> JS + HTML-like syntax, compiles to createElement.</li>
          <li><strong>Component:</strong> function returning JSX.</li>
          <li><strong>Props:</strong> read-only inputs.</li>
          <li><strong>State:</strong> local mutable data; triggers re-render.</li>
          <li><strong>Key:</strong> stable id for list items.</li>
          <li><strong>Virtual DOM:</strong> in-memory tree, diffed to real DOM.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Render cycle: state change → virtual DOM diff → minimal DOM patch." />
      </Section>

      <Section id="hooks" title="Hooks Cheat Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Hook</th><th className="border p-2 text-left">Use</th></tr></thead>
          <tbody>
            <tr><td className="border p-2"><code>useState</code></td><td className="border p-2">Local state</td></tr>
            <tr><td className="border p-2"><code>useEffect</code></td><td className="border p-2">Side effects after render</td></tr>
            <tr><td className="border p-2"><code>useRef</code></td><td className="border p-2">Mutable value / DOM ref</td></tr>
            <tr><td className="border p-2"><code>useMemo</code></td><td className="border p-2">Memoize value</td></tr>
            <tr><td className="border p-2"><code>useCallback</code></td><td className="border p-2">Memoize function</td></tr>
            <tr><td className="border p-2"><code>useContext</code></td><td className="border p-2">Read Context</td></tr>
            <tr><td className="border p-2"><code>useReducer</code></td><td className="border p-2">Complex state</td></tr>
          </tbody>
        </table>
        <Code lang="jsx">{`const [n, setN] = useState(0);
useEffect(() => { /* effect */ return () => { /* cleanup */ }; }, [dep]);`}</Code>
      </Section>

      <Section id="compare" title="Comparison Tables">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">A</th><th className="border p-2 text-left">B</th><th className="border p-2 text-left">Pick</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">Context</td><td className="border p-2">Redux</td><td className="border p-2">Context for low-freq state</td></tr>
            <tr><td className="border p-2">useMemo</td><td className="border p-2">useCallback</td><td className="border p-2">value vs function</td></tr>
            <tr><td className="border p-2">Controlled</td><td className="border p-2">Uncontrolled</td><td className="border p-2">Controlled by default</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — State management decision tree from local to global." />
      </Section>

      <Section id="tricks" title="Memory Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>SPUR:</strong> State, Props, Updater, Render — the render cycle.</li>
          <li><strong>Keys never index:</strong> unless list is static.</li>
          <li><strong>Effect = Sync:</strong> synchronize with external systems.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Missing dependency arrays in useEffect.</li>
          <li>Mutating state directly.</li>
          <li>Setting state during render.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Rules of hooks, immutability, and stable keys — the three pillars that catch most bugs.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Why do effects fire twice in dev?">Strict Mode double-invokes to catch impure effects. It stops in production.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Revision notes — pair with hands-on practice.</p>
      </Section>
    </ReaderShell>
  );
}
