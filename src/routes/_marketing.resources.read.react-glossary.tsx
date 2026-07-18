import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-glossary",
  title: "React.js — Glossary",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 17,
  lastUpdated: "May 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "Alphabetical React glossary: hooks, JSX, components, state, routing, testing, performance, APIs, frontend engineering, interview terminology.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "a", label: "A — C" },
  { id: "d", label: "D — G" },
  { id: "h", label: "H — L" },
  { id: "m", label: "M — R" },
  { id: "s", label: "S — Z" },
  { id: "code", label: "Example Usage" },
  { id: "table", label: "Term Comparison" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-glossary")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-glossary" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Look up any React term in under 10 seconds.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Vocabulary is 30% of interview success. This glossary is your reference.</p>
      </Section>

      <Section id="a" title="A — C">
        <p>Action, Batching, Children, Component, Concurrent Mode, Context, Controlled Component, CSR.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for a — c." />
      </Section>

      <Section id="d" title="D — G">
        <p>Diffing, DOM, Effect, Element, Error Boundary, Fiber, Forward Ref, Fragment, Function Component.</p>
      </Section>

      <Section id="h" title="H — L">
        <p>Higher-Order Component, Hook, Hydration, Idempotent, JSX, Key, Lazy, Lift State.</p>
      </Section>

      <Section id="m" title="M — R">
        <p>Memo, Mount, Portal, Props, Pure Component, React Compiler, Reconciliation, Ref, Render Prop, RSC.</p>
      </Section>

      <Section id="s" title="S — Z">
        <p>Server Component, State, Strict Mode, Suspense, Synthetic Event, Transition, Unmount, Virtual DOM.</p>
      </Section>

      <Section id="code" title="Example Usage">
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

      <Section id="table" title="Term Comparison">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Concept</th><th className="border p-2 text-left">When to use</th><th className="border p-2 text-left">Trade-off</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">useState</td><td className="border p-2">Local UI state</td><td className="border p-2">Not for shared state</td></tr>
            <tr><td className="border p-2">useReducer</td><td className="border p-2">Complex transitions</td><td className="border p-2">More boilerplate</td></tr>
            <tr><td className="border p-2">Context</td><td className="border p-2">Cross-cutting concerns</td><td className="border p-2">Re-renders consumers</td></tr>
            <tr><td className="border p-2">React Query</td><td className="border p-2">Server state</td><td className="border p-2">Extra dep</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for term comparison." />
      </Section>

      <Section id="best" title="Best Practices">
        <p>When you learn a new term, teach it to someone the same day.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Using terms loosely — 'component' vs 'element' vs 'instance' matters in interviews.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Flashcard the top 50 terms. Spaced repetition beats cramming.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Precise vocabulary signals seniority.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Definitions summarize; consult react.dev for authoritative wording.</p>
      </Section>
    </ReaderShell>
  );
}
