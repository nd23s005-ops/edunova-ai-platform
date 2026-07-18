import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-practice-questions",
  title: "React.js — Practice Questions",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "32 min",
  pages: 25,
  lastUpdated: "February 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "A structured React.js practice workbook — 350+ exercises spanning MCQs, debugging, JSX, hooks, API integration, routing, component design, output prediction, and mini projects.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "mcq", label: "MCQs (100+)" },
  { id: "debug", label: "Debugging Exercises" },
  { id: "coding", label: "Coding Challenges" },
  { id: "design", label: "Component Design" },
  { id: "state", label: "State Management Problems" },
  { id: "hooks", label: "Custom Hook Exercises" },
  { id: "output", label: "Output Prediction" },
  { id: "projects", label: "Mini Projects" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Answer Key", tag: "Web Development", time: "25 min" },
  { title: "React.js — Interview Questions", tag: "Web Development", time: "34 min" },
  { title: "React.js — Complete Tutorial", tag: "Web Development", time: "44 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-practice-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-practice-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Practice 350+ questions grouped by concept and difficulty.</li>
          <li>Build reflexes for common React patterns.</li>
          <li>Ship 5 mini projects from scratch.</li>
        </ul>
      </Section>

      <Section id="mcq" title="MCQs (Sample of 100+)">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Which of these is NOT a hook? <em>(a) useState (b) useFetch (c) useEffect (d) useRef</em></li>
          <li>JSX must return: <em>(a) string (b) one root element (c) HTML (d) array</em></li>
          <li>Keys should be: <em>(a) index (b) random (c) stable unique id (d) any string</em></li>
          <li>useEffect with empty deps runs: <em>(a) every render (b) once on mount (c) never (d) on unmount</em></li>
        </ol>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Question distribution: 30% MCQ, 20% debug, 30% code, 20% projects." />
      </Section>

      <Section id="debug" title="Debugging Exercises">
        <p><strong>Q:</strong> This counter never updates. Why?</p>
        <Code lang="jsx">{`function C() {
  let n = 0;
  return <button onClick={() => n++}>{n}</button>;
}`}</Code>
        <p><em>Hint:</em> React only re-renders when state changes via a setter.</p>
      </Section>

      <Section id="coding" title="Coding Challenges">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Build a stopwatch with start/pause/reset.</li>
          <li>Implement infinite scroll with IntersectionObserver.</li>
          <li>Build a modal that traps focus and closes on Escape.</li>
          <li>Implement a controlled multi-step wizard.</li>
        </ol>
      </Section>

      <Section id="design" title="Component Design">
        <p>Design an accessible Combobox with keyboard navigation, ARIA roles, and async options.</p>
      </Section>

      <Section id="state" title="State Management Problems">
        <p>Refactor a prop-drilled 5-level tree to use Context. Then extract to Zustand and measure re-renders.</p>
      </Section>

      <Section id="hooks" title="Custom Hook Exercises">
        <ol className="list-decimal space-y-2 pl-5">
          <li><code>useLocalStorage</code></li>
          <li><code>useDebounce</code></li>
          <li><code>useOnlineStatus</code></li>
          <li><code>usePrevious</code></li>
          <li><code>useMediaQuery</code></li>
        </ol>
      </Section>

      <Section id="output" title="Output Prediction">
        <Code lang="jsx">{`function A() {
  const [n, setN] = useState(0);
  useEffect(() => { setN(n + 1); });
  return <div>{n}</div>;
}
// What happens?`}</Code>
        <p><em>Answer:</em> Infinite render loop — effect updates state which triggers another render which re-runs the effect.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Debug flow: read code aloud, trace state, identify trigger, fix root cause." />
      </Section>

      <Section id="projects" title="Mini Projects">
        <ul className="list-disc space-y-1 pl-5">
          <li>Weather app with API.</li>
          <li>Kanban board with drag & drop.</li>
          <li>Markdown editor with live preview.</li>
          <li>Recipe search with pagination.</li>
          <li>Chat UI with optimistic sends.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Practice deliberately. After each exercise, refactor once for clarity and once for performance.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do the answers live elsewhere?">Yes — see the React.js Answer Key resource.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Practice workbook — solutions may vary; multiple correct approaches exist.</p>
      </Section>
    </ReaderShell>
  );
}
