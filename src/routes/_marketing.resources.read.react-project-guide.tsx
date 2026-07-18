import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-project-guide",
  title: "React.js — Project Guide",
  category: "Web Development",
  difficulty: "Intermediate",
  readingTime: "21 min",
  pages: 17,
  lastUpdated: "June 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "Ship production-ready React apps: Vite, Router, Context, auth, REST APIs, reusable architecture, testing, deployment, CI/CD, monitoring, docs, and maintenance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "requirements", label: "Requirements Gathering" },
  { id: "folder", label: "Folder Structure" },
  { id: "arch", label: "Component Architecture" },
  { id: "routing", label: "Routing Strategy" },
  { id: "api", label: "API Layer" },
  { id: "auth", label: "Authentication" },
  { id: "state", label: "State Management" },
  { id: "testing", label: "Testing" },
  { id: "deploy", label: "Deployment" },
  { id: "code", label: "Vite Config" },
  { id: "table", label: "Tooling Comparison" },
  { id: "checklist", label: "Project Checklist" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-project-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-project-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Scaffold a Vite + React project. Design a scalable folder structure. Build reusable component libraries. Ship with CI/CD and monitoring.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>This guide walks you from an empty directory to a maintained production React application. Every step includes the decision, the trade-off, and the concrete commands.</p>
      </Section>

      <Section id="requirements" title="Requirements Gathering">
        <p>Define personas, primary user flows, non-functional requirements (perf, a11y, i18n), and success metrics before writing a line of code.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for requirements gathering." />
      </Section>

      <Section id="folder" title="Folder Structure">
        <p>src/components (dumb), src/features (smart), src/hooks, src/lib, src/routes, src/api, src/styles, src/types. Feature-first &gt; type-first at scale.</p>
      </Section>

      <Section id="arch" title="Component Architecture">
        <p>Presentational vs container. Compound components for flexibility. Headless components + styling adapters. Prop-drilling limit: 2 levels max.</p>
      </Section>

      <Section id="routing" title="Routing Strategy">
        <p>Nested routes, layout routes, protected routes, code-split per route with React.lazy. Preserve scroll and focus on navigation.</p>
      </Section>

      <Section id="api" title="API Layer">
        <p>Centralize fetch in src/api. Use React Query for cache, retries, and mutations. Type responses with Zod at the boundary.</p>
      </Section>

      <Section id="auth" title="Authentication">
        <p>JWT vs session cookies. Refresh flow. Protected route wrapper. Role-based access. Never store tokens in localStorage for XSS-sensitive apps.</p>
      </Section>

      <Section id="state" title="State Management">
        <p>Local state first. Context for cross-cutting concerns. Zustand/Redux only when justified. Server state belongs in React Query, not Redux.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for state management." />
      </Section>

      <Section id="testing" title="Testing">
        <p>Vitest + Testing Library. Test behavior, not implementation. E2E with Playwright for critical flows. 70% unit / 20% integration / 10% E2E.</p>
      </Section>

      <Section id="deploy" title="Deployment">
        <p>Vercel/Netlify/Cloudflare Pages. Preview deploys per PR. Env vars via platform. Cache immutable assets, revalidate HTML.</p>
      </Section>

      <Section id="code" title="Vite Config">
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

      <Section id="table" title="Tooling Comparison">
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

      <Section id="checklist" title="Project Checklist">
        <p>Lighthouse ≥90. WCAG AA. Bundle &lt; 200KB. Tests green. CI green. Sentry live. README complete.</p>
      </Section>

      <Section id="best" title="Best Practices">
        <p>Ship weekly. Feature flag risky changes. Document decisions in ADRs. Rotate on-call.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Over-engineering state. Skipping tests. No error boundaries. Ignoring bundle size. No monitoring.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Bun for dev, npm for CI. Use CODEOWNERS. Automate dependency updates. Storybook for design review.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>A production React app is 20% code, 80% process. Nail the process; the code follows.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Reflects React 19 + Vite 6 as of June 2026.</p>
      </Section>
    </ReaderShell>
  );
}
