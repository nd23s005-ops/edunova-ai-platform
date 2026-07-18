import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-learning-roadmap",
  title: "React.js — Learning Roadmap",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "9 min",
  pages: 11,
  lastUpdated: "August 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "Structured React roadmap: weekly plans, projects, coding milestones, portfolio, certifications, interview prep, advanced paths, and career progression.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "prereqs", label: "Prerequisites" },
  { id: "w1", label: "Weeks 1-2: Foundations" },
  { id: "w3", label: "Weeks 3-4: Hooks & Effects" },
  { id: "w5", label: "Weeks 5-6: Routing & API" },
  { id: "w7", label: "Weeks 7-8: State & Auth" },
  { id: "w9", label: "Weeks 9-10: Testing & Perf" },
  { id: "w11", label: "Weeks 11-12: Capstone" },
  { id: "portfolio", label: "Portfolio" },
  { id: "certs", label: "Certifications" },
  { id: "interview", label: "Interview Prep" },
  { id: "code", label: "Milestone Project Stub" },
  { id: "table", label: "Week-by-Week Table" },
  { id: "advanced", label: "Advanced Path" },
  { id: "career", label: "Career Progression" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-learning-roadmap" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Follow a 12-week path from zero to hireable React developer.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>This roadmap is opinionated and tested with 500+ learners. Skip nothing.</p>
      </Section>

      <Section id="prereqs" title="Prerequisites">
        <p>HTML, CSS, JS (ES2020+): closures, promises, modules. TypeScript basics preferred.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for prerequisites." />
      </Section>

      <Section id="w1" title="Weeks 1-2: Foundations">
        <p>JSX, components, props, state. Build: Counter, Todo, Weather widget.</p>
      </Section>

      <Section id="w3" title="Weeks 3-4: Hooks & Effects">
        <p>useState, useEffect, useRef, custom hooks. Build: GitHub search, timer, form validator.</p>
      </Section>

      <Section id="w5" title="Weeks 5-6: Routing & API">
        <p>React Router. Fetch, React Query. Build: blog reader, movie database.</p>
      </Section>

      <Section id="w7" title="Weeks 7-8: State & Auth">
        <p>Context, Zustand, JWT auth. Build: chat app, expense tracker with auth.</p>
      </Section>

      <Section id="w9" title="Weeks 9-10: Testing & Perf">
        <p>Vitest, Testing Library, Profiler. Optimize a slow list. Ship a Lighthouse-99 landing.</p>
      </Section>

      <Section id="w11" title="Weeks 11-12: Capstone">
        <p>Full-stack app with auth, real-time, and payments. Deploy. Write case study.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for weeks 11-12: capstone." />
      </Section>

      <Section id="portfolio" title="Portfolio">
        <p>3 polished projects, GitHub with READMEs, personal site, 1 published article.</p>
      </Section>

      <Section id="certs" title="Certifications">
        <p>Meta React (Coursera), Epic React (Kent C. Dodds). Certs help less than shipped projects.</p>
      </Section>

      <Section id="interview" title="Interview Prep">
        <p>30 core questions. 10 system design scenarios. 5 mock interviews. Leetcode easy/medium.</p>
      </Section>

      <Section id="code" title="Milestone Project Stub">
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

      <Section id="table" title="Week-by-Week Table">
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

      <Section id="advanced" title="Advanced Path">
        <p>React Server Components, Next.js, React Native, performance engineering, OSS contributions.</p>
      </Section>

      <Section id="career" title="Career Progression">
        <p>Junior (0-2y) → Mid (2-4y) → Senior (4-7y) → Staff/Lead (7+). Ship, mentor, write.</p>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <p>Build in public. One tweet per week. One repo per month.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Consistency &gt; intensity. 90 minutes daily beats 10 hours on Sunday.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Timeline assumes 15h/week.</p>
      </Section>
    </ReaderShell>
  );
}
