import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-advanced-concepts",
  title: "React.js — Advanced Concepts",
  category: "Web Development",
  difficulty: "Advanced",
  readingTime: "26 min",
  pages: 58,
  lastUpdated: "May 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "React Fiber, Concurrent rendering, React Compiler, Suspense, Server Components, streaming, hydration, memoization, Virtual DOM internals, custom hooks architecture, profiling, advanced state, micro-frontends.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "fiber", label: "React Fiber" },
  { id: "concurrent", label: "Concurrent Rendering" },
  { id: "compiler", label: "React Compiler" },
  { id: "suspense", label: "Suspense" },
  { id: "rsc", label: "Server Components" },
  { id: "streaming", label: "Streaming Rendering" },
  { id: "hydration", label: "Hydration" },
  { id: "memo", label: "Memoization" },
  { id: "vdom", label: "Virtual DOM Internals" },
  { id: "hooksarch", label: "Custom Hooks Architecture" },
  { id: "profile", label: "Performance Profiling" },
  { id: "state", label: "Advanced State Management" },
  { id: "mfe", label: "Micro Frontends" },
  { id: "code", label: "Concurrent Snippet" },
  { id: "table", label: "Rendering Modes Table" },
  { id: "prod", label: "Production Engineering" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-advanced-concepts")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-advanced-concepts" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Understand React's internals well enough to reason about any bug or performance problem.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Advanced React is 20% APIs and 80% mental models — Fiber, scheduling, reconciliation, hydration, and the Compiler.</p>
      </Section>

      <Section id="fiber" title="React Fiber">
        <p>A reimplementation of the reconciler using linked lists of work units. Enables interruption, prioritization, and time-slicing.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for react fiber." />
      </Section>

      <Section id="concurrent" title="Concurrent Rendering">
        <p>startTransition, useTransition, useDeferredValue. Non-blocking updates. Priority lanes. What 'tearing' means and how React prevents it.</p>
      </Section>

      <Section id="compiler" title="React Compiler">
        <p>Auto-memoizes components and hooks at build time. Eliminates most manual useMemo/useCallback. Understand its escape hatches.</p>
      </Section>

      <Section id="suspense" title="Suspense">
        <p>Declarative async boundaries. Waterfalls vs parallel. SuspenseList (RSC). Streaming SSR + selective hydration.</p>
      </Section>

      <Section id="rsc" title="Server Components">
        <p>Zero-bundle components. Data fetching co-located. Client boundaries via 'use client'. Serializable props only.</p>
      </Section>

      <Section id="streaming" title="Streaming Rendering">
        <p>renderToPipeableStream. Shell-first HTML. Progressive hydration. TTFB and LCP win-wins.</p>
      </Section>

      <Section id="hydration" title="Hydration">
        <p>Attaching listeners to server HTML. Mismatch causes. Selective and progressive hydration strategies.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for hydration." />
      </Section>

      <Section id="memo" title="Memoization">
        <p>React.memo, useMemo, useCallback — when they actually help. Referential equality traps. The Compiler makes most of these obsolete.</p>
      </Section>

      <Section id="vdom" title="Virtual DOM Internals">
        <p>Element trees, reconciliation, diffing heuristics, keys, and why 'Virtual DOM' is a leaky abstraction.</p>
      </Section>

      <Section id="hooksarch" title="Custom Hooks Architecture">
        <p>Composition over inheritance. State machines with XState. Effect coordination. Testing hooks in isolation.</p>
      </Section>

      <Section id="profile" title="Performance Profiling">
        <p>Profiler API, User Timing API, Chrome DevTools flame graphs, INP debugging, react-scan.</p>
      </Section>

      <Section id="state" title="Advanced State Management">
        <p>Zustand slices, Jotai atoms, XState machines, Redux Toolkit RTK Query — when each wins.</p>
      </Section>

      <Section id="mfe" title="Micro Frontends">
        <p>Module Federation, single-spa, iframe federation. Trade-offs vs monorepo. Shared React instance pitfalls.</p>
      </Section>

      <Section id="code" title="Concurrent Snippet">
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

      <Section id="table" title="Rendering Modes Table">
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

      <Section id="prod" title="Production Engineering">
        <p>Feature flags, canaries, error budgets, RUM. Rollback in under 5 minutes.</p>
      </Section>

      <Section id="best" title="Best Practices">
        <p>Learn the mental model before the API. APIs change; models don't.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Reaching for RSC when SSR suffices. Federating too early. Over-memoizing.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Read the React source. It's approachable and instructive.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Advanced React rewards curiosity. Every internal you learn pays off for a decade.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Reflects React 19 + Compiler GA as of May 2026.</p>
      </Section>
    </ReaderShell>
  );
}
