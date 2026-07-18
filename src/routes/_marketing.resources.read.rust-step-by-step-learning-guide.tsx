import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-step-by-step-learning-guide",
  title: "Rust — Step-by-Step Learning Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "24 min",
  pages: 25,
  lastUpdated: "January 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "An 8-week Rust roadmap — daily study plans, coding milestones, projects, portfolio, interview prep, and career progression.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "w1", label: "Week 1 — Foundations" },
  { id: "w2", label: "Week 2 — Ownership" },
  { id: "w3", label: "Week 3 — Structs & Enums" },
  { id: "w4", label: "Week 4 — Traits & Generics" },
  { id: "w5", label: "Week 5 — Error Handling & Testing" },
  { id: "w6", label: "Week 6 — Concurrency" },
  { id: "w7", label: "Week 7 — Async & Web" },
  { id: "w8", label: "Week 8 — Capstone" },
  { id: "portfolio", label: "Portfolio" },
  { id: "interview", label: "Interview Prep" },
  { id: "career", label: "Career Roadmap" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Beginner Guide", tag: "Programming", time: "17 min" },
  { title: "Rust — Complete Tutorial", tag: "Programming", time: "41 min" },
  { title: "Rust — Practice Questions", tag: "Programming", time: "21 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-step-by-step-learning-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-step-by-step-learning-guide" }],
  }),
  component: Page,
});

function Week({ id, title, focus, exercises, milestone }: { id: string; title: string; focus: string; exercises: string[]; milestone: string }) {
  return (
    <Section id={id} title={title}>
      <p><strong>Focus:</strong> {focus}</p>
      <h4 className="mt-2 font-semibold">Daily exercises</h4>
      <ul className="list-disc space-y-1 pl-5">{exercises.map((e, i) => <li key={i}>{e}</li>)}</ul>
      <Callout tone="info" title="Milestone">{milestone}</Callout>
    </Section>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow a paced, 8-week plan from zero to production-ready.</li>
          <li>Build 3+ portfolio projects along the way.</li>
          <li>Prepare for Rust developer interviews with structured revision.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — 8-week Rust roadmap: foundations → ownership → traits → concurrency → async → capstone." />
      </Section>

      <Week id="w1" title="Week 1 — Foundations" focus="Setup, syntax, variables, control flow, functions."
        exercises={["Print prime numbers 1-100", "Fibonacci (iterative & recursive)", "FizzBuzz", "Guess-the-number CLI"]}
        milestone="Build a CLI calculator with Cargo." />

      <Week id="w2" title="Week 2 — Ownership & Borrowing" focus="Move semantics, references, borrow rules."
        exercises={["Rewrite string helpers using &str", "Implement a fixed-size stack", "String reverse without allocation"]}
        milestone="Write a note-taking CLI that reads/writes files without unnecessary clones." />

      <Week id="w3" title="Week 3 — Structs, Enums, Modules" focus="Modelling data, pattern matching, module organisation."
        exercises={["Model a bank account", "Parse an enum from CLI args", "Split code into modules"]}
        milestone="Todo list CLI with subcommands and file persistence." />

      <Week id="w4" title="Week 4 — Traits & Generics" focus="Traits, trait objects, generics, bounds."
        exercises={["Generic min/max", "Implement Display/Debug", "Trait object plugin registry"]}
        milestone="Build a plugin-style shape calculator (Circle, Square, Triangle)." />

      <Week id="w5" title="Week 5 — Error Handling & Testing" focus="Result, `?`, thiserror/anyhow, unit + integration tests."
        exercises={["Custom error enum with thiserror", "Table-driven tests", "Doctests"]}
        milestone="Refactor the Todo CLI to have zero panics and 90% test coverage." />

      <Week id="w6" title="Week 6 — Concurrency" focus="Threads, Arc/Mutex, channels, Send/Sync."
        exercises={["Parallel word counter", "Producer/consumer with channels", "Concurrent web scraper"]}
        milestone="Build a multi-threaded log aggregator." />

      <Week id="w7" title="Week 7 — Async & Web" focus="Tokio, async/await, Axum, sqlx."
        exercises={["Async fetch 100 URLs concurrently", "Hello-world Axum server", "Postgres CRUD with sqlx"]}
        milestone="Deploy an Axum + Postgres REST API to a cloud VM." />

      <Week id="w8" title="Week 8 — Capstone" focus="Ship one production-quality project."
        exercises={["Wire CI (GitHub Actions)", "Add tracing/metrics", "Write README + demo video"]}
        milestone="Publish the capstone repo with tests, CI badge, and live demo." />

      <Section id="portfolio" title="Portfolio">
        <p>Aim for 3 polished repos: CLI, web API, and a systems tool. Every repo: README, tests, CI, deployed demo (where applicable).</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Career progression path: junior → mid → senior → staff Rust engineer." />
      </Section>

      <Section id="interview" title="Interview Preparation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain ownership + borrow rules in 60 seconds.</li>
          <li>Compare <code>Box</code>, <code>Rc</code>, <code>Arc</code>, <code>RefCell</code>.</li>
          <li>Debug a lifetime error live.</li>
          <li>Write a concurrent counter with <code>Arc&lt;Mutex&lt;T&gt;&gt;</code>.</li>
        </ul>
      </Section>

      <Section id="career" title="Career Roadmap">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Level</th><th className="p-2 text-left">Scope</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Junior (0-2y)</td><td className="p-2">Ship features, learn idioms</td></tr>
            <tr className="border-b"><td className="p-2">Mid (2-5y)</td><td className="p-2">Own crates, mentor peers</td></tr>
            <tr><td className="p-2">Senior+</td><td className="p-2">Architecture, unsafe review, perf</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Consistency &gt; intensity. 60 minutes/day for 8 weeks = a hireable Rust engineer.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Skip async?">No — most modern Rust jobs need it.</FAQItem>
        <FAQItem q="C++ background helps?">Yes, especially for lifetimes and RAII.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Capstone</strong> — final portfolio-worthy project.</li>
          <li><strong>RAII</strong> — Resource Acquisition Is Initialization.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Adapt to your pace. Consistency is the whole game.</p>
      </Section>
    </ReaderShell>
  );
}
