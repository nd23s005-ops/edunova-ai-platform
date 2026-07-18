import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "react-step-by-step-learning-guide",
  title: "React.js — Step-by-Step Learning Guide",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "23 min",
  pages: 39,
  lastUpdated: "July 2026",
  tags: ["Web Development", "React", "Hooks"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: "A week-by-week React.js learning roadmap — daily study plans, milestones, projects, exercises, portfolio building, and interview prep from beginner to professional.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "week1", label: "Week 1 — JS Refresher & JSX" },
  { id: "week2", label: "Week 2 — Components & Props" },
  { id: "week3", label: "Week 3 — State & Hooks" },
  { id: "week4", label: "Week 4 — Routing & Forms" },
  { id: "week5", label: "Week 5 — API & Data Fetching" },
  { id: "week6", label: "Week 6 — Performance & Testing" },
  { id: "week7", label: "Week 7 — Portfolio Project" },
  { id: "week8", label: "Week 8 — Interview Prep" },
  { id: "milestones", label: "Milestones & Checkpoints" },
  { id: "portfolio", label: "Portfolio Building" },
  { id: "career", label: "Career Progression" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "React.js — Beginner Guide", tag: "Web Development", time: "12 min" },
  { title: "React.js — Complete Tutorial", tag: "Web Development", time: "44 min" },
  { title: "React.js — Practice Questions", tag: "Web Development", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/react-step-by-step-learning-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/react-step-by-step-learning-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow a structured 8-week plan from JS fundamentals to job-ready React.</li>
          <li>Complete daily coding exercises and weekly milestones.</li>
          <li>Ship 3 portfolio projects and prepare for React interviews.</li>
        </ul>
        <Callout tone="tip" title="Cadence">Plan for ~1.5 hours/day, 6 days/week. Adjust to fit your schedule.</Callout>
      </Section>

      <Section id="week1" title="Week 1 — JS Refresher & JSX">
        <p><strong>Days 1–3:</strong> ES6+ syntax, destructuring, spread, arrow functions, promises, async/await. <strong>Days 4–6:</strong> Vite setup, JSX rules, first components.</p>
        <p><strong>Milestone:</strong> Personal profile card component.</p>
        <Figure src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&q=80" caption="Figure 1 — 8-week roadmap: foundations → data → performance → portfolio → interview." />
      </Section>

      <Section id="week2" title="Week 2 — Components & Props">
        <p>Function components, props typing, composition, children prop, conditional rendering, lists with keys.</p>
        <p><strong>Milestone:</strong> Recipe list app with 10+ items.</p>
      </Section>

      <Section id="week3" title="Week 3 — State & Hooks">
        <Code lang="jsx">{`const [todos, setTodos] = useState([]);
useEffect(() => { fetchTodos().then(setTodos); }, []);`}</Code>
        <p><strong>Milestone:</strong> Todo app with local storage persistence.</p>
      </Section>

      <Section id="week4" title="Week 4 — Routing & Forms">
        <p>React Router, dynamic routes, nested layouts, React Hook Form + Zod validation.</p>
        <p><strong>Milestone:</strong> Multi-page blog with login form.</p>
      </Section>

      <Section id="week5" title="Week 5 — API & Data Fetching">
        <p>Fetch API, TanStack Query, loading/error states, optimistic updates.</p>
        <p><strong>Milestone:</strong> GitHub user search with caching.</p>
      </Section>

      <Section id="week6" title="Week 6 — Performance & Testing">
        <p><code>React.memo</code>, <code>useMemo</code>, code-splitting, lazy loading. Vitest + Testing Library.</p>
        <p><strong>Milestone:</strong> Test coverage &gt; 70% on Todo app.</p>
      </Section>

      <Section id="week7" title="Week 7 — Portfolio Project">
        <p>Build a full-stack e-commerce cart or task manager: auth, routing, API, tests, responsive design, deployment.</p>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Portfolio architecture: React frontend, REST/GraphQL API, hosted deployment." />
      </Section>

      <Section id="week8" title="Week 8 — Interview Prep">
        <p>Review hooks, reconciliation, keys, lifecycle, memoization, Context vs Redux, error boundaries. Do 20 coding challenges and 2 mock interviews.</p>
      </Section>

      <Section id="milestones" title="Milestones & Revision Checkpoints">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Week</th><th className="border p-2 text-left">Checkpoint</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">2</td><td className="border p-2">Build 5 static components without help</td></tr>
            <tr><td className="border p-2">4</td><td className="border p-2">Ship a routed multi-page app</td></tr>
            <tr><td className="border p-2">6</td><td className="border p-2">Debug a slow render with DevTools</td></tr>
            <tr><td className="border p-2">8</td><td className="border p-2">Answer 30 interview Qs confidently</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="portfolio" title="Portfolio Building">
        <p>Deploy 3 projects to Vercel. Write a README with screenshots, live link, tech stack, and challenges solved.</p>
      </Section>

      <Section id="career" title="Career Progression">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Junior (0–1 yr):</strong> Ship features under review.</li>
          <li><strong>Mid (1–3 yr):</strong> Own modules; mentor juniors.</li>
          <li><strong>Senior (3+ yr):</strong> Architecture, performance, hiring.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Consistency beats intensity. Ship small every day. By week 8 you'll have projects, tests, and interview readiness.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Can I finish in 4 weeks?">Yes if you commit 4+ hrs/day, but retention is lower without spaced practice.</FAQItem>
        <FAQItem q="Should I learn Next.js in parallel?">Focus on React first; Next.js in week 9+.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Study plan is a guide, not a guarantee. Adjust pace to your background.</p>
      </Section>
    </ReaderShell>
  );
}
