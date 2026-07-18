import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-project-case-study",
  title: "React.js — Project Case Study",
  category: "Web Development",
  difficulty: "Intermediate",
  readingTime: "24 min",
  pages: 47,
  lastUpdated: "May 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "How a React engineering team designed, built, optimized, tested, deployed, and maintained a scalable frontend application.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "bg", label: "Company Background" },
  { id: "biz", label: "Business Requirements" },
  { id: "ui", label: "UI Architecture" },
  { id: "comp", label: "Component Design" },
  { id: "routing", label: "Routing" },
  { id: "api", label: "API Integration" },
  { id: "state", label: "State Management" },
  { id: "perf", label: "Performance Optimization" },
  { id: "deploy", label: "Deployment" },
  { id: "code", label: "Rollout Config" },
  { id: "table", label: "Metrics Before/After" },
  { id: "lessons", label: "Lessons Learned" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-project-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Understand real production trade-offs. See architecture decisions justified. Learn what breaks at scale and how to fix it.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>This case study follows an 8-engineer team building a customer-facing SaaS dashboard in React over 14 months — from prototype to 500K MAU.</p>
      </Section>

      <Section id="bg" title="Company Background">
        <p>Series-B SaaS in the analytics space. Existing Angular app on maintenance mode. React rewrite chosen for hiring pool, ecosystem, and DX.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for company background." />
      </Section>

      <Section id="biz" title="Business Requirements">
        <p>Sub-2s Time to Interactive. 99.9% uptime. WCAG AA. SOC 2 compliance. Support 40+ enterprise tenants with custom theming.</p>
      </Section>

      <Section id="ui" title="UI Architecture">
        <p>Vite + React 18 + TypeScript. Tailwind + Radix primitives. Design tokens per tenant. Storybook as the source of truth.</p>
      </Section>

      <Section id="comp" title="Component Design">
        <p>Atomic design taxonomy. Headless + skinned. Every component exports a Zod schema for its props. 240 components in Storybook.</p>
      </Section>

      <Section id="routing" title="Routing">
        <p>React Router v6 nested routes. Code-split per route. Preload on hover. Route-level error boundaries and suspense fallbacks.</p>
      </Section>

      <Section id="api" title="API Integration">
        <p>REST + React Query. Optimistic updates on mutations. WebSocket for live metrics. Retry with exponential backoff.</p>
      </Section>

      <Section id="state" title="State Management">
        <p>Server state → React Query. Client state → Zustand. URL state → React Router search params. Zero Redux.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for state management." />
      </Section>

      <Section id="perf" title="Performance Optimization">
        <p>Bundle from 640KB → 180KB via code-splitting + tree-shaking. LCP 3.8s → 1.4s. INP 340ms → 80ms via useDeferredValue and virtualization.</p>
      </Section>

      <Section id="deploy" title="Deployment">
        <p>Cloudflare Pages + Workers. Preview per PR. Canary rollouts to 5% → 25% → 100%. Sentry + Datadog RUM.</p>
      </Section>

      <Section id="code" title="Rollout Config">
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

      <Section id="table" title="Metrics Before/After">
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

      <Section id="lessons" title="Lessons Learned">
        <p>Invest in Storybook early. Design tokens save months at year 2. Type the API boundary. Ship dark mode from day one.</p>
      </Section>

      <Section id="best" title="Best Practices">
        <p>Weekly perf budgets. Feature flags for every new route. Rotate authors of the RFC process.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Delayed a11y audits. Under-invested in tests early. Chose Redux, migrated to Zustand at month 9.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Ship a design system before a second feature team joins. Automate visual regression.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Scale isn't a code problem, it's a coordination problem. Tools that reduce coordination win.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Anonymized composite of real projects; numbers approximated.</p>
      </Section>
    </ReaderShell>
  );
}
