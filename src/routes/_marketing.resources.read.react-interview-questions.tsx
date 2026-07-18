import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-interview-questions",
  title: "React.js — Interview Questions",
  category: "Web Development",
  difficulty: "Intermediate",
  readingTime: "34 min",
  pages: 39,
  lastUpdated: "July 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "A comprehensive React.js interview handbook — 300+ conceptual questions, coding challenges, hooks, Context, routing, performance, React 19, frontend system design, HR rounds, and mock interviews.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "beginner", label: "Beginner Questions" },
  { id: "intermediate", label: "Intermediate Questions" },
  { id: "senior", label: "Senior Questions" },
  { id: "coding", label: "Coding Challenges" },
  { id: "hooks", label: "Hooks Deep Dive" },
  { id: "perf", label: "Performance" },
  { id: "react19", label: "React 19 Features" },
  { id: "arch", label: "Architecture Questions" },
  { id: "sysdesign", label: "Frontend System Design" },
  { id: "hr", label: "HR Questions" },
  { id: "mock", label: "Mock Interviews" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Practice Questions", tag: "Web Development", time: "32 min" },
  { title: "React.js — Answer Key", tag: "Web Development", time: "25 min" },
  { title: "React.js — Complete Tutorial", tag: "Web Development", time: "44 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-interview-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-interview-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Answer 300+ React questions covering beginner to senior levels.</li>
          <li>Solve live coding challenges with layered hints.</li>
          <li>Design frontend systems and pass HR screens.</li>
        </ul>
        <Callout tone="tip" title="Strategy">Read the question, restate it, ask clarifying questions, then answer with an example.</Callout>
      </Section>

      <Section id="beginner" title="Beginner Questions (Sample of 100+)">
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong>What is React?</strong> A declarative, component-based JavaScript library for building UIs using a virtual DOM.</li>
          <li><strong>What is JSX?</strong> Syntax extension that compiles to React.createElement calls.</li>
          <li><strong>Difference between props and state?</strong> Props are read-only inputs from parent; state is local mutable data.</li>
          <li><strong>Why keys in lists?</strong> To let React identify which items changed, added, or removed.</li>
          <li><strong>Controlled vs uncontrolled input?</strong> Controlled binds value to state; uncontrolled uses refs.</li>
        </ol>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Interview funnel: HR → tech screen → coding → system design → onsite." />
      </Section>

      <Section id="intermediate" title="Intermediate Questions (Sample of 100+)">
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong>Rules of hooks?</strong> Call at top level; only from React functions.</li>
          <li><strong>useMemo vs useCallback?</strong> useMemo caches a value; useCallback caches a function reference.</li>
          <li><strong>Context vs Redux?</strong> Context for low-frequency state; Redux for large, high-frequency stores.</li>
          <li><strong>How does reconciliation work?</strong> React diffs virtual DOM trees using keys and element types.</li>
          <li><strong>What is Suspense?</strong> A boundary that shows a fallback while children wait on async work.</li>
        </ol>
      </Section>

      <Section id="senior" title="Senior Questions (Sample of 100+)">
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong>Explain Fiber.</strong> React's reconciler that splits work into interruptible units for concurrent rendering.</li>
          <li><strong>Concurrent rendering?</strong> React can pause and resume renders; useTransition marks non-urgent updates.</li>
          <li><strong>Server Components?</strong> Components rendered on the server with zero client JS.</li>
          <li><strong>Hydration mismatch — cause and fix?</strong> Server and client output differ; guard browser-only code with useEffect.</li>
        </ol>
      </Section>

      <Section id="coding" title="Coding Challenges">
        <p><strong>Q:</strong> Build a debounced search input.</p>
        <Code lang="jsx">{`function Search() {
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDq(q), 300);
    return () => clearTimeout(t);
  }, [q]);
  return <input value={q} onChange={e => setQ(e.target.value)} />;
}`}</Code>
        <p><strong>Q:</strong> Implement a useFetch hook. <strong>Hint 1:</strong> useState for data/loading/error. <strong>Hint 2:</strong> AbortController for cleanup.</p>
      </Section>

      <Section id="hooks" title="Hooks Deep Dive">
        <p>Explain why hooks must be called in the same order — React uses call index, not name, to associate state.</p>
      </Section>

      <Section id="perf" title="Performance Questions">
        <ul className="list-disc space-y-1 pl-5">
          <li>When to memoize?</li>
          <li>How to profile with DevTools?</li>
          <li>What causes cascading re-renders?</li>
        </ul>
      </Section>

      <Section id="react19" title="React 19 Features">
        <ul className="list-disc space-y-1 pl-5">
          <li>Actions — async mutations with built-in status.</li>
          <li><code>useOptimistic</code> for instant UI feedback.</li>
          <li><code>use()</code> hook for promises and Context.</li>
          <li>Compiler auto-memoization (React Compiler).</li>
        </ul>
      </Section>

      <Section id="arch" title="Architecture Questions">
        <p>How would you organize a 100-screen React app? Feature folders, shared UI, domain models, route-level code-split.</p>
      </Section>

      <Section id="sysdesign" title="Frontend System Design">
        <p>Design a live-updating dashboard: WebSocket for real-time, TanStack Query for cache, optimistic UI, offline queue.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Frontend system architecture: routing, state, network, cache, telemetry." />
      </Section>

      <Section id="hr" title="HR Questions">
        <ul className="list-disc space-y-1 pl-5">
          <li>Why React?</li>
          <li>Tell me about a hard bug you fixed.</li>
          <li>How do you handle disagreement in code review?</li>
        </ul>
      </Section>

      <Section id="mock" title="Mock Interview Sets">
        <p><strong>Set A (45 min):</strong> 5 concept Qs + 1 coding + 1 system design.</p>
        <p><strong>Set B (60 min):</strong> 3 senior Qs + 2 debugging + 1 architecture review.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Interviews reward clear thinking, not memorization. Practice explaining out loud.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How long to prepare?">4–6 weeks with 1 hr/day of active practice.</FAQItem>
        <FAQItem q="Coding on whiteboard or laptop?">Both — expect either.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Sample questions — real interviews vary by company and role.</p>
      </Section>
    </ReaderShell>
  );
}
