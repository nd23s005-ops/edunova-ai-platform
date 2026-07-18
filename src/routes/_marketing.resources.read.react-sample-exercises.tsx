import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-sample-exercises",
  title: "React.js — Sample Exercises",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "18 min",
  pages: 33,
  lastUpdated: "April 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "250+ hands-on React.js exercises: JSX, components, props, state, hooks, events, forms, Context, routing, API integration, auth, performance, testing, and reusable component challenges.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "coding", label: "Coding Exercises (80+)" },
  { id: "debug", label: "Debugging Tasks (40+)" },
  { id: "output", label: "Output Prediction (30+)" },
  { id: "projects", label: "Mini Projects (15+)" },
  { id: "components", label: "Component Building Challenges" },
  { id: "hooks", label: "Hook Exercises" },
  { id: "state", label: "State Management Problems" },
  { id: "ui", label: "Practical UI Exercises" },
  { id: "code", label: "Code Example" },
  { id: "table", label: "Difficulty Table" },
  { id: "best", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "refs", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Complete Tutorial", tag: "Web Development", time: "45 min" },
  { title: "React.js — Cheat Sheet", tag: "Web Development", time: "5 min" },
  { title: "React.js — Interview Questions", tag: "Web Development", time: "34 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-sample-exercises")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-sample-exercises" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Master core React concepts through hands-on drills. Build fluency with JSX, hooks, forms, and state. Debug real component bugs. Ship 15+ mini projects.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>This workbook contains 250+ graded exercises spanning JSX, components, props, state, hooks, event handling, forms, Context API, routing, API integration, authentication, performance optimization, testing, and reusable component development. Work through them in order for the best learning curve.</p>
      </Section>

      <Section id="coding" title="Coding Exercises (80+)">
        <p>Write a Counter with useState. Toggle theme. Build a Todo list. Filter a list with useMemo. Fetch users with useEffect. Create a controlled form. Compose a Card with children props. Lift state up. Build a tabbed panel. Implement a modal with portals.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for coding exercises (80+)." />
      </Section>

      <Section id="debug" title="Debugging Tasks (40+)">
        <p>Fix stale closures. Resolve infinite re-renders. Repair missing key warnings. Correct dependency arrays. Fix event handler bindings. Debug prop drilling. Repair broken Context. Fix async state updates after unmount.</p>
      </Section>

      <Section id="output" title="Output Prediction (30+)">
        <p>Given a component, predict the render output, effect firing order, and state after each dispatch. Trains you to reason like React does — top-down, deterministic, batched.</p>
      </Section>

      <Section id="projects" title="Mini Projects (15+)">
        <p>Todo app with persistence. Weather dashboard. GitHub user search. Markdown editor. Quiz app. Kanban board. Recipe finder. Expense tracker. Chat UI. Auth flow. Multi-step form. Data table with sort/filter.</p>
      </Section>

      <Section id="components" title="Component Building Challenges">
        <p>Build a Button variant system. Compound Tabs. Headless Popover. Reusable Modal. Autocomplete. Virtualized list. Drag-and-drop list. Toast notification system.</p>
      </Section>

      <Section id="hooks" title="Hook Exercises">
        <p>useDebounce, usePrevious, useLocalStorage, useOnClickOutside, useMediaQuery, useFetch, useToggle, useForm — write and test each from scratch.</p>
      </Section>

      <Section id="state" title="State Management Problems">
        <p>Refactor prop drilling to Context. Introduce useReducer for complex state. Compare Zustand vs Context. Persist state to localStorage. Sync across tabs.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for state management problems." />
      </Section>

      <Section id="ui" title="Practical UI Exercises">
        <p>Responsive navbar. Sticky header. Sidebar drawer. Skeleton loaders. Empty states. Error boundaries. Optimistic UI. Infinite scroll.</p>
      </Section>

      <Section id="code" title="Code Example">
        <Code lang="tsx">{`import { useState, useEffect } from "react";

export function useDebounced<T>(value: T, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}`}</Code>
      </Section>

      <Section id="table" title="Difficulty Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Concept</th><th className="border p-2 text-left">When to use</th><th className="border p-2 text-left">Trade-off</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">useState</td><td className="border p-2">Local UI state</td><td className="border p-2">Not for shared state</td></tr>
            <tr><td className="border p-2">useReducer</td><td className="border p-2">Complex transitions</td><td className="border p-2">More boilerplate</td></tr>
            <tr><td className="border p-2">Context</td><td className="border p-2">Cross-cutting concerns</td><td className="border p-2">Re-renders consumers</td></tr>
            <tr><td className="border p-2">React Query</td><td className="border p-2">Server state</td><td className="border p-2">Extra dep</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="best" title="Best Practices">
        <p>Read the exercise, plan on paper first, code second. Commit after every green test. Refactor after it works. Compare your solution to two peers'.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Skipping the debugging exercises. Copy-pasting solutions. Ignoring TypeScript errors. Not writing tests. Building UI before thinking about state shape.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Use React DevTools Profiler on every project. Learn keyboard shortcuts. Bookmark react.dev. Time-box each exercise to 25 minutes.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Do the reps. Fluency comes from volume + reflection. After 250 exercises you'll pattern-match React problems in seconds.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Exercises reflect React 18/19 as of April 2026. Verify against react.dev.</p>
      </Section>
    </ReaderShell>
  );
}
