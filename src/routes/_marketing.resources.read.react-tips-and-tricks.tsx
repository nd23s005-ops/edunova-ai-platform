import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-tips-and-tricks",
  title: "React.js — Tips & Tricks",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 10,
  lastUpdated: "March 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "150+ React productivity tips, hook patterns, debugging workflows, VS Code shortcuts, performance tricks, and professional frontend techniques.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "productivity", label: "Productivity Hacks" },
  { id: "devtools", label: "React DevTools Tips" },
  { id: "perf", label: "Performance Tricks" },
  { id: "design", label: "Component Design Tips" },
  { id: "hooks", label: "Hook Tricks" },
  { id: "vscode", label: "VS Code Shortcuts" },
  { id: "debug", label: "Debugging Workflows" },
  { id: "code", label: "Handy Custom Hook" },
  { id: "table", label: "Shortcut Cheat Table" },
  { id: "interview", label: "Interview Advice" },
  { id: "best", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
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

export const Route = createFileRoute("/_marketing/resources/read/react-tips-and-tricks")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-tips-and-tricks" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <p>Ship faster with 150+ battle-tested React tips.</p>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Tips are shortcuts wrapped in scars. Every one here saved a real engineer real time.</p>
      </Section>

      <Section id="productivity" title="Productivity Hacks">
        <p>Snippets for common patterns. VS Code multi-cursor. GitHub Copilot for boilerplate. Zed/Cursor for AI pair-programming.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — Overview diagram for productivity hacks." />
      </Section>

      <Section id="devtools" title="React DevTools Tips">
        <p>Profiler → Ranked view. 'Highlight updates when components render'. Log component owner via $r in console.</p>
      </Section>

      <Section id="perf" title="Performance Tricks">
        <p>Move state down, not up. Split contexts by concern. Use useDeferredValue for input-driven filters. Preload routes on hover.</p>
      </Section>

      <Section id="design" title="Component Design Tips">
        <p>Slot pattern over configuration props. Render props for extreme flexibility. asChild pattern like Radix.</p>
      </Section>

      <Section id="hooks" title="Hook Tricks">
        <p>useEvent for stable callbacks. useLatest ref pattern. useIsMounted safeguard. useIntersectionObserver for lazy loading.</p>
      </Section>

      <Section id="vscode" title="VS Code Shortcuts">
        <p>Cmd+P file open. Cmd+Shift+O symbol. F2 rename. Cmd+D multi-select. Cmd+K Z zen mode.</p>
      </Section>

      <Section id="debug" title="Debugging Workflows">
        <p>debugger; &gt; console.log. Conditional breakpoints. Blackbox node_modules. React DevTools + Chrome Perf tab together.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Reference visual for debugging workflows." />
      </Section>

      <Section id="code" title="Handy Custom Hook">
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

      <Section id="table" title="Shortcut Cheat Table">
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

      <Section id="interview" title="Interview Advice">
        <p>Explain your thought process aloud. Draw components before typing. Discuss trade-offs, not just solutions.</p>
      </Section>

      <Section id="best" title="Best Practices">
        <p>Automate everything you do twice. Refactor when the pain is fresh.</p>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <p>Copy-pasting tips without understanding them. A tip you can't explain is a bug in waiting.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Small edges compound. Adopt one tip per day for a month.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How do I get started?">Read the sections in order, then apply immediately to a project.</FAQItem>
        <FAQItem q="Is this current for React 19?">Yes — content reflects React 19 and the Compiler.</FAQItem>
        <FAQItem q="Where can I ask questions?">Open an issue in the EduNova AI community or ask the in-app AI tutor.</FAQItem>
      </Section>

      <Section id="refs" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p>Shortcuts differ across OS/keymap.</p>
      </Section>
    </ReaderShell>
  );
}
