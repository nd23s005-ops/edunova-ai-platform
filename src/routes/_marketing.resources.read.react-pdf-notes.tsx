import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-pdf-notes",
  title: "React.js — PDF Notes",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "63 min",
  pages: 128,
  lastUpdated: "August 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "Chapter-wise React.js notes covering beginner to advanced concepts — components, JSX, state, props, hooks, Context, routing, forms, API, auth, performance, testing, deployment, and React 19.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "ch1", label: "Ch 1. Introduction" },
  { id: "ch2", label: "Ch 2. JSX & Rendering" },
  { id: "ch3", label: "Ch 3. Components & Props" },
  { id: "ch4", label: "Ch 4. State & Events" },
  { id: "ch5", label: "Ch 5. Hooks" },
  { id: "ch6", label: "Ch 6. Context API" },
  { id: "ch7", label: "Ch 7. Routing" },
  { id: "ch8", label: "Ch 8. Forms" },
  { id: "ch9", label: "Ch 9. API Integration" },
  { id: "ch10", label: "Ch 10. Authentication" },
  { id: "ch11", label: "Ch 11. Performance" },
  { id: "ch12", label: "Ch 12. Testing" },
  { id: "ch13", label: "Ch 13. Deployment" },
  { id: "ch14", label: "Ch 14. React 19" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Quick Revision Notes", tag: "Web Development", time: "10 min" },
  { title: "React.js — Cheat Sheet", tag: "Web Development", time: "5 min" },
  { title: "React.js — Complete Tutorial", tag: "Web Development", time: "44 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-pdf-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Full chapter-wise reference for React from setup to production.</li>
          <li>Formatted for offline revision and exam prep.</li>
          <li>Includes code snippets, comparison tables, and best practices per chapter.</li>
        </ul>
      </Section>

      <Section id="ch1" title="Chapter 1 — Introduction">
        <p>React is a component-based UI library maintained by Meta. It uses a virtual DOM to update the UI efficiently and encourages declarative code.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — React ecosystem: core library, router, state manager, tooling." />
      </Section>

      <Section id="ch2" title="Chapter 2 — JSX & Rendering">
        <Code lang="jsx">{`const el = <h1 className="title">Hello</h1>;
// compiles to
React.createElement("h1", { className: "title" }, "Hello");`}</Code>
      </Section>

      <Section id="ch3" title="Chapter 3 — Components & Props">
        <p>Function components accept props and return JSX. Props are read-only.</p>
        <Code lang="jsx">{`function Avatar({ src, alt }) { return <img src={src} alt={alt} />; }`}</Code>
      </Section>

      <Section id="ch4" title="Chapter 4 — State & Events">
        <Code lang="jsx">{`const [count, setCount] = useState(0);
<button onClick={() => setCount(c => c + 1)}>+</button>`}</Code>
      </Section>

      <Section id="ch5" title="Chapter 5 — Hooks">
        <p>Rules: call at top level only; call from React functions only. Core hooks: useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, useLayoutEffect, useTransition, useDeferredValue, useId.</p>
      </Section>

      <Section id="ch6" title="Chapter 6 — Context API">
        <Code lang="jsx">{`const AuthCtx = createContext(null);
const useAuth = () => useContext(AuthCtx);`}</Code>
      </Section>

      <Section id="ch7" title="Chapter 7 — Routing">
        <p>React Router v6+: declarative routes, nested layouts, outlet, loaders, actions.</p>
      </Section>

      <Section id="ch8" title="Chapter 8 — Forms">
        <p>Controlled inputs bind value to state. Uncontrolled use refs. Prefer React Hook Form for large forms.</p>
      </Section>

      <Section id="ch9" title="Chapter 9 — API Integration">
        <p>Use TanStack Query for server state. Never store server data in useState long-term.</p>
      </Section>

      <Section id="ch10" title="Chapter 10 — Authentication">
        <p>Session via httpOnly cookie or short-lived JWT + refresh token. Route guards redirect unauthenticated users.</p>
      </Section>

      <Section id="ch11" title="Chapter 11 — Performance">
        <ul className="list-disc space-y-1 pl-5">
          <li>Memoize expensive components with <code>React.memo</code>.</li>
          <li>Split bundles with <code>React.lazy</code>.</li>
          <li>Virtualize long lists.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Performance funnel: measure, memoize, split, virtualize." />
      </Section>

      <Section id="ch12" title="Chapter 12 — Testing">
        <p>Unit tests with Vitest + Testing Library. E2E with Playwright.</p>
      </Section>

      <Section id="ch13" title="Chapter 13 — Deployment">
        <p>Build static assets, configure SPA fallback, add caching headers, deploy to CDN.</p>
      </Section>

      <Section id="ch14" title="Chapter 14 — React 19">
        <p>Actions, useOptimistic, useFormStatus, the <code>use()</code> hook, and Server Components for hybrid rendering.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>These notes cover the full React surface area needed to ship production apps. Revisit chapters as topics arise on the job.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Are class components still supported?">Yes, but new code should use function components + hooks.</FAQItem>
        <FAQItem q="Is Redux dead?">No — Redux Toolkit is the modern approach and still widely used.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational notes. Verify APIs against the official React documentation.</p>
      </Section>
    </ReaderShell>
  );
}
