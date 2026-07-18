import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-common-mistakes",
  title: "React.js — Common Mistakes",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "16 min",
  pages: 20,
  lastUpdated: "January 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "150+ common React mistakes and how to avoid them: JSX errors, hook mistakes, state issues, routing, APIs, performance, re-renders, debugging.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "jsx", label: "JSX Errors" },
  { id: "hooks", label: "Hook Mistakes" },
  { id: "state", label: "State Update Problems" },
  { id: "routing", label: "Routing Issues" },
  { id: "api", label: "API Mistakes" },
  { id: "perf", label: "Performance Problems" },
  { id: "rerender", label: "Component Re-render Issues" },
  { id: "code", label: "Buggy Snippet & Fix" },
  { id: "table", label: "Mistake → Fix Table" },
  { id: "debug", label: "Debugging Guide" },
  { id: "prevention", label: "Prevention Checklist" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-common-mistakes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-common-mistakes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Recognize the 150+ mistakes React devs make and know the fix for each.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Every mistake here has been made by senior engineers. Pattern-match them once, avoid them forever.</p>
      </Section>

      <Section id="jsx" title="JSX Errors">
        <p>Returning multiple elements without a fragment. Using class instead of className. Forgetting curly braces around expressions. Missing key on list items.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for jsx errors." />
      </Section>

      <Section id="hooks" title="Hook Mistakes">
        <p>Calling hooks in loops or conditions. Missing deps in useEffect. Stale closures. Setting state after unmount. Using useState where useRef fits.</p>
      </Section>

      <Section id="state" title="State Update Problems">
        <p>Mutating state directly. Batching misunderstandings. Async updates read from stale state. Overusing useState for derived values.</p>
      </Section>

      <Section id="routing" title="Routing Issues">
        <p>Nested Router elements. Missing exact matches. Forgetting to preserve query params. Broken Link relative paths.</p>
      </Section>

      <Section id="api" title="API Mistakes">
        <p>Fetching in render. No cleanup on unmount. Ignoring race conditions. No retry/backoff. Storing responses in state instead of React Query.</p>
      </Section>

      <Section id="perf" title="Performance Problems">
        <p>Anonymous functions in props. Object literals as deps. Rendering hidden components. No memoization on expensive children.</p>
      </Section>

      <Section id="rerender" title="Component Re-render Issues">
        <p>Context value new object each render. useState in parent forces child re-render. Missing React.memo on pure children.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for component re-render issues." />
      </Section>

      <Section id="code" title="Buggy Snippet & Fix">
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

      <Section id="table" title="Mistake → Fix Table">
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

      <Section id="debug" title="Debugging Guide">
        <p>React DevTools Profiler. Why-did-you-render. Console breakpoints. Chrome Performance panel. Sentry for prod.</p>
      </Section>

      <Section id="prevention" title="Prevention Checklist">
        <p>Strict Mode on. TS strict. ESLint react-hooks plugin. Peer review. CI checks. Storybook for edge cases.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Enable react-hooks/exhaustive-deps as error. Never disable rules to silence them — fix the root cause.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Mistakes are tuition. Read this list once a quarter.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Mistakes reflect React 18/19.</p>
      </Section>
    </ReaderShell>
  );
}
