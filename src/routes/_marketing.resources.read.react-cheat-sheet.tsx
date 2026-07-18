import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-cheat-sheet",
  title: "React.js — Cheat Sheet",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "5 min",
  pages: 4,
  lastUpdated: "October 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "A printable React.js cheat sheet — JSX, components, props, state, hooks, routing, forms, Context, lifecycle equivalents, API calls, performance tips, and interview reminders.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "jsx", label: "JSX Syntax" },
  { id: "components", label: "Components & Props" },
  { id: "hooks", label: "Hooks Reference" },
  { id: "router", label: "Router Commands" },
  { id: "forms", label: "Forms & API" },
  { id: "lifecycle", label: "Lifecycle Equivalents" },
  { id: "perf", label: "Performance Tips" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Quick Revision Notes", tag: "Web Development", time: "10 min" },
  { title: "React.js — PDF Notes", tag: "Web Development", time: "63 min" },
  { title: "React.js — Interview Questions", tag: "Web Development", time: "34 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-cheat-sheet" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Instant lookup for React syntax and patterns.</li>
          <li>Print or bookmark for interviews and daily coding.</li>
        </ul>
      </Section>

      <Section id="jsx" title="JSX Syntax">
        <Code lang="jsx">{`<div className="x" onClick={handle}>{count > 0 && <span>{count}</span>}</div>
{items.map(i => <li key={i.id}>{i.name}</li>)}`}</Code>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — JSX at a glance: attributes, expressions, conditional and list rendering." />
      </Section>

      <Section id="components" title="Components & Props">
        <Code lang="jsx">{`function Btn({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}`}</Code>
      </Section>

      <Section id="hooks" title="Hooks Reference">
        <Code lang="jsx">{`const [v, setV] = useState(init);
useEffect(() => {/*fx*/ return () => {/*cleanup*/}}, [dep]);
const memo = useMemo(() => compute(x), [x]);
const cb = useCallback(() => doIt(), []);
const ref = useRef(null);
const val = useContext(Ctx);
const [state, dispatch] = useReducer(reducer, initial);`}</Code>
      </Section>

      <Section id="router" title="Router Commands">
        <Code lang="jsx">{`<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/u/:id" element={<User/>}/>
</Routes>
const { id } = useParams();
const navigate = useNavigate();`}</Code>
      </Section>

      <Section id="forms" title="Forms & API">
        <Code lang="jsx">{`<input value={v} onChange={e => setV(e.target.value)} />
fetch("/api").then(r => r.json()).then(setData);`}</Code>
      </Section>

      <Section id="lifecycle" title="Class Lifecycle → Hook Equivalents">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Class</th><th className="border p-2 text-left">Hook</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">componentDidMount</td><td className="border p-2"><code>useEffect(fn, [])</code></td></tr>
            <tr><td className="border p-2">componentDidUpdate</td><td className="border p-2"><code>useEffect(fn, [dep])</code></td></tr>
            <tr><td className="border p-2">componentWillUnmount</td><td className="border p-2">cleanup in useEffect</td></tr>
            <tr><td className="border p-2">shouldComponentUpdate</td><td className="border p-2"><code>React.memo</code></td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Lifecycle mapping from class API to hooks." />
      </Section>

      <Section id="perf" title="Performance Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Memoize with React.memo + stable props.</li>
          <li>Lazy-load routes with React.lazy + Suspense.</li>
          <li>Debounce inputs, virtualize lists.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Index as key on reorderable lists.</li>
          <li>Stale closures in effects — add deps.</li>
          <li>Setting state in loops → batch or use reducer.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Bookmark this page. Every symbol here maps to a real API you'll use daily.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Which router?">React Router or TanStack Router — both are excellent.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Cheat sheet — verify against react.dev.</p>
      </Section>
    </ReaderShell>
  );
}
