import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-real-world-case-study",
  title: "React.js — Real-world Case Study",
  category: "Web Development",
  difficulty: "Intermediate",
  readingTime: "19 min",
  pages: 34,
  lastUpdated: "February 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "Enterprise React case study: architecture, component design, API integration, performance, deployment, trade-offs, scalability, monitoring, and business outcomes.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "problem", label: "Business Problem" },
  { id: "arch", label: "Architecture Decisions" },
  { id: "comp", label: "Component Design" },
  { id: "api", label: "API Integration" },
  { id: "perf", label: "Performance Optimization" },
  { id: "deploy", label: "Deployment Strategy" },
  { id: "tradeoffs", label: "Engineering Trade-offs" },
  { id: "scale", label: "Scalability" },
  { id: "monitor", label: "Monitoring" },
  { id: "code", label: "Edge Config Sample" },
  { id: "table", label: "Outcomes Table" },
  { id: "outcomes", label: "Business Outcomes" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>See React deployed at enterprise scale. Understand trade-offs on real teams. Measure impact in business terms.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>A Fortune-500 retailer replaced their legacy jQuery storefront with React, cutting checkout time by 42% and boosting conversion 18%.</p>
      </Section>

      <Section id="problem" title="Business Problem">
        <p>Aging storefront, 6s LCP on mobile, 22% cart abandonment, hiring stalled. Executive mandate: full rewrite in 12 months.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for business problem." />
      </Section>

      <Section id="arch" title="Architecture Decisions">
        <p>Next.js for SSR + edge. React Server Components for catalog. Client components for cart. GraphQL BFF. CDN-first images.</p>
      </Section>

      <Section id="comp" title="Component Design">
        <p>70 shared UI primitives. 320 feature components. Contract-tested via Storybook + Chromatic. Design tokens synced from Figma.</p>
      </Section>

      <Section id="api" title="API Integration">
        <p>GraphQL BFF aggregates 14 microservices. Persisted queries. Field-level caching in Redis. Zod validation at boundary.</p>
      </Section>

      <Section id="perf" title="Performance Optimization">
        <p>LCP 6.1s → 1.6s (mobile). Bundle 890KB → 210KB. TBT 620ms → 90ms. Image CDN + AVIF. Route-level code splitting.</p>
      </Section>

      <Section id="deploy" title="Deployment Strategy">
        <p>Vercel edge network. Preview per PR. Progressive rollout via header-based routing. Instant rollback on Sentry spike.</p>
      </Section>

      <Section id="tradeoffs" title="Engineering Trade-offs">
        <p>Chose Next.js over CRA for SSR. Chose GraphQL over REST for aggregation. Chose Zustand over Redux for DX.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for engineering trade-offs." />
      </Section>

      <Section id="scale" title="Scalability">
        <p>Handles 4M sessions/day at peak. 12K RPS on checkout. Autoscaling edge. Zero-downtime deploys.</p>
      </Section>

      <Section id="monitor" title="Monitoring">
        <p>Sentry for errors. Datadog RUM for perf. Grafana for infra. Weekly SLO review. Error budget policy enforced.</p>
      </Section>

      <Section id="code" title="Edge Config Sample">
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

      <Section id="table" title="Outcomes Table">
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

      <Section id="outcomes" title="Business Outcomes">
        <p>Conversion +18%. AOV +7%. Support tickets -34%. Hiring velocity 3x. NPS +14 pts.</p>
      </Section>

      <Section id="best" title="Best Practices">
        <p>Instrument before you optimize. Ship behind flags. Own the design system.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Underestimated CMS integration. Skipped a11y until month 8 — costly retrofit.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Budget 20% of every sprint for platform work. It compounds.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>React scales when the platform underneath is boring. Invest there.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Composite case study; identifying details changed.</p>
      </Section>
    </ReaderShell>
  );
}
