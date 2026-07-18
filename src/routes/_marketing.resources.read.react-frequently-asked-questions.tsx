import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-frequently-asked-questions",
  title: "React.js — Frequently Asked Questions",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 16,
  lastUpdated: "May 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "FAQs from beginner to advanced: JSX, components, props, state, hooks, Context, routing, forms, APIs, performance, testing, deployment, React 19, careers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "basics", label: "Basics" },
  { id: "components", label: "Components & Props" },
  { id: "state", label: "State & Hooks" },
  { id: "context", label: "Context & Routing" },
  { id: "forms", label: "Forms & APIs" },
  { id: "perf", label: "Performance" },
  { id: "testing", label: "Testing & Deployment" },
  { id: "react19", label: "React 19 Features" },
  { id: "career", label: "Career Guidance" },
  { id: "code", label: "Common Snippet" },
  { id: "table", label: "Concept Comparison" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-frequently-asked-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-frequently-asked-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Answer the 100 most-asked React questions in one place.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Curated from Stack Overflow, Reddit, and thousands of interviews.</p>
      </Section>

      <Section id="basics" title="Basics">
        <p>What is React? Why JSX? Virtual DOM? Difference from Angular/Vue? Do I need Redux?</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for basics." />
      </Section>

      <Section id="components" title="Components & Props">
        <p>Functional vs class? When to lift state? How to pass data up? What are children?</p>
      </Section>

      <Section id="state" title="State & Hooks">
        <p>useState vs useReducer? useEffect vs useLayoutEffect? Custom hooks — when? Why do hooks have rules?</p>
      </Section>

      <Section id="context" title="Context & Routing">
        <p>Context vs Redux? When does Context re-render? React Router vs TanStack?</p>
      </Section>

      <Section id="forms" title="Forms & APIs">
        <p>Controlled vs uncontrolled? React Hook Form? How to handle file uploads? SWR vs React Query?</p>
      </Section>

      <Section id="perf" title="Performance">
        <p>When to memo? Bundle size targets? SSR vs CSR vs SSG? React Compiler — what changes?</p>
      </Section>

      <Section id="testing" title="Testing & Deployment">
        <p>Which library? How to test hooks? Deploy where? CI setup?</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for testing & deployment." />
      </Section>

      <Section id="react19" title="React 19 Features">
        <p>Actions, useOptimistic, useFormStatus, useActionState, ref as prop, document metadata, Compiler.</p>
      </Section>

      <Section id="career" title="Career Guidance">
        <p>Portfolio > certifications. Contribute to OSS. Read source code. Interview prep timeline.</p>
      </Section>

      <Section id="code" title="Common Snippet">
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

      <Section id="table" title="Concept Comparison">
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
        <p>Read react.dev cover to cover before Googling.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Trusting outdated blog posts. React changes fast — check the date.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Follow @dan_abramov2 and @acdlite on X for authoritative takes.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Answers age. Fundamentals don't.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Reflects React 19 as of May 2026.</p>
      </Section>
    </ReaderShell>
  );
}
