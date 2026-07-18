import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-beginner-guide",
  title: "React.js — Beginner Guide",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 21,
  lastUpdated: "February 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "A friendly first walk through React.js — JSX, components, props, state, events, conditional rendering, lists, hooks, routing, forms, and API integration with clear analogies and examples.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Why React?" },
  { id: "s2", label: "2. Setup & JSX" },
  { id: "s3", label: "3. Components & Props" },
  { id: "s4", label: "4. State & Events" },
  { id: "s5", label: "5. Conditional Rendering & Lists" },
  { id: "s6", label: "6. Hooks Introduction" },
  { id: "s7", label: "7. Routing" },
  { id: "s8", label: "8. Forms" },
  { id: "s9", label: "9. API Integration" },
  { id: "s10", label: "10. Best Practices" },
  { id: "s11", label: "11. Common Mistakes" },
  { id: "s12", label: "12. Tips & Tricks" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Complete Tutorial", tag: "Web Development", time: "44 min" },
  { title: "React.js — Step-by-Step Learning Guide", tag: "Web Development", time: "23 min" },
  { title: "React.js — Cheat Sheet", tag: "Web Development", time: "5 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-beginner-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand what React is and why it dominates modern UI development.</li>
          <li>Read and write JSX, components, and props confidently.</li>
          <li>Manage state, handle events, and render lists correctly.</li>
          <li>Use core hooks — <code>useState</code>, <code>useEffect</code> — and route between pages.</li>
          <li>Integrate REST APIs and handle forms with validation.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Why React?">
        <p>React is a declarative JavaScript library for building user interfaces from reusable components. You describe <em>what</em> the UI should look like for any state, and React figures out <em>how</em> to update the DOM efficiently.</p>
        <Callout tone="info" title="Analogy">Think of React components like LEGO bricks — small, self-contained pieces you snap together into anything from a button to a full dashboard.</Callout>
      </Section>

      <Section id="s2" title="2. Setup & JSX">
        <Code lang="bash">{`npm create vite@latest my-app -- --template react
cd my-app && npm install && npm run dev`}</Code>
        <p>JSX lets you write HTML-like syntax inside JavaScript. Under the hood it compiles to <code>React.createElement</code> calls.</p>
        <Code lang="jsx">{`function Greeting() {
  const name = "Ada";
  return <h1>Hello, {name}!</h1>;
}`}</Code>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — React renders a component tree into the DOM via a virtual DOM diff." />
      </Section>

      <Section id="s3" title="3. Components & Props">
        <p>Components are functions that return JSX. Props are inputs, like function arguments.</p>
        <Code lang="jsx">{`function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
<Card title="Welcome"><p>Body text</p></Card>`}</Code>
      </Section>

      <Section id="s4" title="4. State & Events">
        <Code lang="jsx">{`import { useState } from "react";
function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Clicked {n}</button>;
}`}</Code>
        <Callout tone="warn" title="Never mutate state">Always create new objects/arrays — <code>setUser({ ...user, age: 30 })</code>, not <code>user.age = 30</code>.</Callout>
      </Section>

      <Section id="s5" title="5. Conditional Rendering & Lists">
        <Code lang="jsx">{`{isLoggedIn ? <Dashboard /> : <Login />}
{items.map((i) => <li key={i.id}>{i.name}</li>)}`}</Code>
        <p>Always provide a stable <code>key</code> when rendering lists — never the array index if items can reorder.</p>
      </Section>

      <Section id="s6" title="6. Hooks Introduction">
        <p><code>useState</code> stores state, <code>useEffect</code> runs side effects after render, <code>useRef</code> holds mutable values that survive renders.</p>
        <Code lang="jsx">{`useEffect(() => {
  document.title = \`Count: \${n}\`;
}, [n]);`}</Code>
      </Section>

      <Section id="s7" title="7. Routing">
        <p>TanStack Router or React Router lets you map URLs to components without a page reload.</p>
        <Code lang="jsx">{`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>`}</Code>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Client-side routing swaps components under a persistent shell." />
      </Section>

      <Section id="s8" title="8. Forms">
        <Code lang="jsx">{`function LoginForm() {
  const [email, setEmail] = useState("");
  return <input value={email} onChange={(e) => setEmail(e.target.value)} />;
}`}</Code>
      </Section>

      <Section id="s9" title="9. API Integration">
        <Code lang="jsx">{`useEffect(() => {
  fetch("/api/users").then((r) => r.json()).then(setUsers);
}, []);`}</Code>
        <p>Prefer TanStack Query for production — it handles caching, retries, and background refresh.</p>
      </Section>

      <Section id="s10" title="10. Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Keep components small and focused.</li>
          <li>Lift state up only when siblings need to share it.</li>
          <li>Use TypeScript for prop safety.</li>
          <li>Prefer composition over inheritance.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Common Mistakes">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Mistake</th><th className="border p-2 text-left">Fix</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">Mutating state directly</td><td className="border p-2">Return a new object with the setter</td></tr>
            <tr><td className="border p-2">Using array index as key</td><td className="border p-2">Use a stable unique id</td></tr>
            <tr><td className="border p-2">Missing useEffect deps</td><td className="border p-2">Add every referenced value or move it inside</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s12" title="12. Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Install React DevTools browser extension.</li>
          <li>Use <code>strict mode</code> during development to catch side effects.</li>
          <li>Name event handlers with a <code>handle</code> prefix.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>React makes UI a function of state. Master components, props, state, and hooks, and everything else builds on top.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need to know JavaScript first?">Yes — modern JS (ES6+, arrow functions, destructuring, async/await) is a prerequisite.</FAQItem>
        <FAQItem q="Class or function components?">Function components with hooks. Classes are legacy.</FAQItem>
        <FAQItem q="React or Next.js?">Learn React first, then add Next.js when you need SSR or file-based routing.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Verify APIs against the latest React documentation (react.dev).</p>
      </Section>
    </ReaderShell>
  );
}
