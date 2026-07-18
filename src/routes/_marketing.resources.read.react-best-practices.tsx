import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-best-practices",
  title: "React.js — Best Practices",
  category: "Web Development",
  difficulty: "Intermediate",
  readingTime: "14 min",
  pages: 23,
  lastUpdated: "February 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "React coding standards, component architecture, hooks best practices, Context, performance, testing, a11y, security, folder org, deployment, docs.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "design", label: "Component Design Principles" },
  { id: "hooks", label: "Custom Hooks" },
  { id: "perf", label: "Performance Optimization" },
  { id: "a11y", label: "Accessibility" },
  { id: "security", label: "Security" },
  { id: "folder", label: "Folder Structure" },
  { id: "testing", label: "Testing" },
  { id: "deploy", label: "Deployment" },
  { id: "code", label: "Custom Hook Pattern" },
  { id: "table", label: "Do / Don't Table" },
  { id: "checklist", label: "Production Checklist" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-best-practices" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Adopt the practices that separate hobby code from production code.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Best practices are patterns that survived contact with real users, real teams, and real incidents.</p>
      </Section>

      <Section id="design" title="Component Design Principles">
        <p>Small. Single-purpose. Composable. Data-in, JSX-out. Prefer composition over configuration. Props &lt; 5, else split.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for component design principles." />
      </Section>

      <Section id="hooks" title="Custom Hooks">
        <p>Extract when logic repeats twice. Name with 'use' prefix. Return stable references. Test them in isolation.</p>
      </Section>

      <Section id="perf" title="Performance Optimization">
        <p>Measure before optimizing. Memoize expensive computations, not everything. Virtualize long lists. Split code by route.</p>
      </Section>

      <Section id="a11y" title="Accessibility">
        <p>Semantic HTML first. Test with keyboard only. Announce dynamic changes with aria-live. Trap focus in modals.</p>
      </Section>

      <Section id="security" title="Security">
        <p>Never dangerouslySetInnerHTML unstrusted content. Sanitize with DOMPurify. CSP headers. httpOnly cookies for tokens.</p>
      </Section>

      <Section id="folder" title="Folder Structure">
        <p>Feature-first. Colocate tests + stories + styles. Barrel files at feature root only.</p>
      </Section>

      <Section id="testing" title="Testing">
        <p>Testing Library queries by role. Integration &gt; unit for UI. Playwright for critical E2E. 80% branch coverage.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for testing." />
      </Section>

      <Section id="deploy" title="Deployment">
        <p>Immutable builds. Preview per PR. Feature flags. Progressive rollout. Instant rollback.</p>
      </Section>

      <Section id="code" title="Custom Hook Pattern">
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

      <Section id="table" title="Do / Don't Table">
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

      <Section id="checklist" title="Production Checklist">
        <p>Lint green. Types green. Tests green. Lighthouse ≥90. A11y audit clean. Bundle under budget. Monitoring live.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Premature abstraction. God components. useEffect for derived state. Missing error boundaries.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Prettier + ESLint + strict TS. Pre-commit hooks. CODEOWNERS. RFC template for changes over 200 LOC.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Boring code, exciting product. Best practices exist to keep the boring parts boring.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Guidance, not gospel. Adapt to your team.</p>
      </Section>
    </ReaderShell>
  );
}
