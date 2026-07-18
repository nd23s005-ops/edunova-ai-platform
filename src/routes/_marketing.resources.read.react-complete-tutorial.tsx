import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-complete-tutorial",
  title: "React.js — Complete Tutorial",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "44 min",
  pages: 67,
  lastUpdated: "September 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "A complete end-to-end React.js tutorial — fundamentals, hooks, Context API, routing, forms, API integration, performance, custom hooks, auth, testing, deployment, and React 19 patterns.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Fundamentals" },
  { id: "s2", label: "2. Components & JSX" },
  { id: "s3", label: "3. State Management" },
  { id: "s4", label: "4. Hooks in Depth" },
  { id: "s5", label: "5. Context API" },
  { id: "s6", label: "6. React Router" },
  { id: "s7", label: "7. Forms & Validation" },
  { id: "s8", label: "8. API Integration" },
  { id: "s9", label: "9. Performance Optimization" },
  { id: "s10", label: "10. Custom Hooks" },
  { id: "s11", label: "11. Authentication" },
  { id: "s12", label: "12. Testing" },
  { id: "s13", label: "13. Deployment" },
  { id: "s14", label: "14. React 19 Best Practices" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Beginner Guide", tag: "Web Development", time: "12 min" },
  { title: "React.js — Cheat Sheet", tag: "Web Development", time: "5 min" },
  { title: "React.js — Interview Questions", tag: "Web Development", time: "34 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-complete-tutorial")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-complete-tutorial" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Build production React applications from scratch to deployment.</li>
          <li>Master hooks, Context, routing, forms, and API integration.</li>
          <li>Optimize performance, write custom hooks, and add authentication.</li>
          <li>Write tests and ship using modern deployment platforms.</li>
          <li>Apply React 19 patterns like Actions, useOptimistic, and Server Components.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Fundamentals">
        <p>React is a declarative library. You describe UI as a function of state, and React reconciles the virtual DOM into real DOM updates.</p>
        <Callout tone="info" title="Mental model">UI = f(state). Change state, React re-renders.</Callout>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — React reconciliation: virtual DOM diff produces minimal real DOM patches." />
      </Section>

      <Section id="s2" title="2. Components & JSX">
        <Code lang="jsx">{`function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}`}</Code>
        <p>Function components are the default. JSX compiles to <code>React.createElement</code> calls at build time.</p>
      </Section>

      <Section id="s3" title="3. State Management">
        <p>Start with <code>useState</code>. Scale up with <code>useReducer</code> for complex transitions, and Context or Zustand/Redux for cross-tree state.</p>
        <Code lang="jsx">{`const [state, dispatch] = useReducer(reducer, initialState);`}</Code>
      </Section>

      <Section id="s4" title="4. Hooks in Depth">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>useState</code> — local state</li>
          <li><code>useEffect</code> — side effects after render</li>
          <li><code>useRef</code> — mutable value, DOM handle</li>
          <li><code>useMemo</code> / <code>useCallback</code> — memoization</li>
          <li><code>useLayoutEffect</code> — synchronous DOM measurement</li>
          <li><code>useTransition</code> / <code>useDeferredValue</code> — concurrent UI</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Context API">
        <Code lang="jsx">{`const ThemeContext = createContext("light");
function App() {
  return <ThemeContext.Provider value="dark"><Toolbar /></ThemeContext.Provider>;
}`}</Code>
      </Section>

      <Section id="s6" title="6. React Router">
        <Code lang="jsx">{`import { BrowserRouter, Routes, Route } from "react-router-dom";
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/posts/:id" element={<Post />} />
  </Routes>
</BrowserRouter>`}</Code>
      </Section>

      <Section id="s7" title="7. Forms & Validation">
        <p>React Hook Form + Zod is the modern combo — minimal re-renders, type-safe schemas.</p>
        <Code lang="jsx">{`const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });`}</Code>
      </Section>

      <Section id="s8" title="8. API Integration">
        <Code lang="jsx">{`const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((r) => r.json()),
});`}</Code>
      </Section>

      <Section id="s9" title="9. Performance Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>React.memo</code> for expensive pure components.</li>
          <li>Code-split with <code>React.lazy</code> + Suspense.</li>
          <li>Virtualize long lists with react-window.</li>
          <li>Profile with React DevTools.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Profiling flow: measure, isolate hotspots, memoize, verify." />
      </Section>

      <Section id="s10" title="10. Custom Hooks">
        <Code lang="jsx">{`function useLocalStorage(key, initial) {
  const [v, setV] = useState(() => JSON.parse(localStorage.getItem(key) ?? "null") ?? initial);
  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v]);
  return [v, setV];
}`}</Code>
      </Section>

      <Section id="s11" title="11. Authentication">
        <p>Store JWTs in httpOnly cookies. Wrap protected routes in an auth guard component. Refresh tokens silently on 401.</p>
      </Section>

      <Section id="s12" title="12. Testing">
        <Code lang="jsx">{`import { render, screen } from "@testing-library/react";
test("renders", () => {
  render(<Greeting name="Ada" />);
  expect(screen.getByText(/Ada/)).toBeInTheDocument();
});`}</Code>
      </Section>

      <Section id="s13" title="13. Deployment">
        <p>Build with <code>vite build</code> and deploy to Vercel, Netlify, Cloudflare Pages, or any static host. Add proper SPA fallback routing.</p>
      </Section>

      <Section id="s14" title="14. React 19 Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use Actions for async mutations with built-in pending/error state.</li>
          <li><code>useOptimistic</code> for instant UI feedback.</li>
          <li>Server Components for zero-JS static content.</li>
          <li>The new <code>use()</code> hook to unwrap promises and context.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>React scales from a single component to enterprise apps. Master hooks, data-fetching, and performance to ship confidently.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Redux or Context?">Context for low-frequency global state; Zustand or Redux Toolkit for high-frequency updates.</FAQItem>
        <FAQItem q="CSS-in-JS or Tailwind?">Tailwind for speed; CSS Modules or vanilla-extract for type-safe design systems.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Verify APIs against the latest React documentation.</p>
      </Section>
    </ReaderShell>
  );
}
