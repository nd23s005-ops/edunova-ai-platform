import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-reference-guide",
  title: "React.js — Reference Guide",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "57 min",
  pages: 88,
  lastUpdated: "May 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "Complete React developer reference: JSX syntax, hooks API, component APIs, Router, Context, forms, state, performance, testing, deployment, DevTools, quick lookup tables.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "apis", label: "React APIs" },
  { id: "hooks", label: "Hook Reference" },
  { id: "jsx", label: "JSX Syntax" },
  { id: "router", label: "Routing Reference" },
  { id: "context", label: "Context API" },
  { id: "forms", label: "Forms" },
  { id: "state", label: "State Management" },
  { id: "perf", label: "Performance Optimization" },
  { id: "testing", label: "Testing" },
  { id: "deploy", label: "Deployment" },
  { id: "devtools", label: "React DevTools" },
  { id: "config", label: "Configuration" },
  { id: "code", label: "Hook Reference Snippet" },
  { id: "table", label: "Quick Lookup Tables" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>One handbook for every React lookup you'll need daily.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Structured like a language reference — scan by topic, drill into APIs, copy the snippet.</p>
      </Section>

      <Section id="apis" title="React APIs">
        <p>createElement, cloneElement, isValidElement, Children utils, Fragment, StrictMode, Suspense, memo, lazy, startTransition, act.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for react apis." />
      </Section>

      <Section id="hooks" title="Hook Reference">
        <p>useState, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useReducer, useContext, useTransition, useDeferredValue, useId, useSyncExternalStore, useImperativeHandle, useOptimistic, useActionState, useFormStatus.</p>
      </Section>

      <Section id="jsx" title="JSX Syntax">
        <p>Expressions, attributes, conditional rendering, list rendering, fragments, spread props, keys, refs as props (React 19).</p>
      </Section>

      <Section id="router" title="Routing Reference">
        <p>&lt;Routes&gt;, &lt;Route&gt;, &lt;Link&gt;, useNavigate, useParams, useSearchParams, loaders, actions, nested routes, code-splitting.</p>
      </Section>

      <Section id="context" title="Context API">
        <p>createContext, Provider, useContext, ContextProvider (React 19), splitting contexts, avoiding re-renders.</p>
      </Section>

      <Section id="forms" title="Forms">
        <p>Controlled inputs, uncontrolled with refs, React Hook Form, Zod validation, Actions + useFormStatus (React 19).</p>
      </Section>

      <Section id="state" title="State Management">
        <p>Local, lifted, Context, Zustand, Redux Toolkit, XState, React Query — decision matrix.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for state management." />
      </Section>

      <Section id="perf" title="Performance Optimization">
        <p>Profiler, memoization, code splitting, virtualization, image optimization, Compiler.</p>
      </Section>

      <Section id="testing" title="Testing">
        <p>Vitest, Testing Library, Playwright, mocking, coverage.</p>
      </Section>

      <Section id="deploy" title="Deployment">
        <p>Vercel, Netlify, Cloudflare, Docker, env vars, cache headers.</p>
      </Section>

      <Section id="devtools" title="React DevTools">
        <p>Components tab, Profiler, Highlight updates, hooks inspection.</p>
      </Section>

      <Section id="config" title="Configuration">
        <p>tsconfig strict, ESLint react/react-hooks, Vite plugins, Tailwind setup.</p>
      </Section>

      <Section id="code" title="Hook Reference Snippet">
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

      <Section id="table" title="Quick Lookup Tables">
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
        <p>Keep this bookmarked. Update your fork when React ships new features.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Referencing outdated versions. Always check the docs date.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Cmd+F this page is faster than Google.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Reference beats memory. Look it up, ship it, remember it next time.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Reflects React 19 GA as of May 2026.</p>
      </Section>
    </ReaderShell>
  );
}
