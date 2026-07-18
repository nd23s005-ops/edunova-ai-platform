import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-sample-exercises",
  title: "Rust — Sample Exercises",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "25 min",
  pages: 19,
  lastUpdated: "September 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "A 200+ exercise workbook covering ownership, borrowing, lifetimes, traits, generics, collections, smart pointers, Cargo, testing, concurrency, async, files, and networking.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Syntax & Basics" },
  { id: "s2", label: "2. Ownership & Borrowing" },
  { id: "s3", label: "3. Lifetimes" },
  { id: "s4", label: "4. Structs & Enums" },
  { id: "s5", label: "5. Traits & Generics" },
  { id: "s6", label: "6. Collections & Smart Pointers" },
  { id: "s7", label: "7. Cargo & Testing" },
  { id: "s8", label: "8. Concurrency & Async" },
  { id: "s9", label: "9. Files & Networking" },
  { id: "s10", label: "10. Debugging Drills" },
  { id: "diagrams", label: "Architecture Diagrams" },
  { id: "best", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Practice Questions", tag: "Programming", time: "21 min" },
  { title: "Rust — Answer Key", tag: "Programming", time: "26 min" },
  { title: "Rust — Project Guide", tag: "Programming", time: "17 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-sample-exercises")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-sample-exercises" }],
  }),
  component: Page,
});

function Ex({ n, children }: { n: number | string; children: React.ReactNode }) {
  return <div className="mb-3"><p className="font-semibold">Exercise {n}</p><div className="text-sm">{children}</div></div>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Practice 200+ progressively harder Rust exercises.</li>
          <li>Internalize ownership, borrowing, and lifetimes through repetition.</li>
          <li>Build muscle memory for Cargo, tests, concurrency, and async.</li>
        </ul>
        <Callout tone="info" title="How to use">Attempt each drill on paper, then verify with <code>cargo run</code>. Track completion in a checklist.</Callout>
      </Section>

      <Section id="s1" title="1. Syntax & Basics (20 exercises)">
        <Ex n={1}>Write a program that prints "Hello, EduNova!" using <code>println!</code>.</Ex>
        <Ex n={2}>Declare an immutable integer and try to reassign it — observe the error.</Ex>
        <Ex n={3}>Use shadowing to convert a <code>String</code> length into its numeric value:
          <Code lang="rust">{`let s = "hello";
let s = s.len(); // shadow with a new type`}</Code>
        </Ex>
        <Ex n={4}>Loop from 1..=100 printing FizzBuzz.</Ex>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Practice loop: read → predict → run → reflect." />
      </Section>

      <Section id="s2" title="2. Ownership & Borrowing (25 exercises)">
        <Ex n={30}>Take a <code>String</code> by value and return its length — then rewrite to accept <code>&amp;str</code>.</Ex>
        <Ex n={31}>Given <code>let s = String::from("a"); let t = s;</code> — explain why <code>s</code> is unusable.</Ex>
        <Ex n={32}>Write a function that mutates a <code>Vec&lt;i32&gt;</code> via a mutable reference.</Ex>
      </Section>

      <Section id="s3" title="3. Lifetimes (15 exercises)">
        <Ex n={55}>Annotate a <code>longest</code> function returning the longer of two <code>&amp;str</code>.</Ex>
        <Ex n={56}>Design a struct holding a borrowed slice and explain the required lifetime parameter.</Ex>
      </Section>

      <Section id="s4" title="4. Structs & Enums (20 exercises)">
        <Ex n={70}>Model <code>enum Shape</code> with Circle, Square, Rect and compute area via <code>match</code>.</Ex>
        <Ex n={71}>Derive <code>Debug, Clone, PartialEq</code> on a struct and write a unit test.</Ex>
      </Section>

      <Section id="s5" title="5. Traits & Generics (25 exercises)">
        <Ex n={95}>Implement <code>Display</code> for a <code>Point&#123;x,y&#125;</code> struct.</Ex>
        <Ex n={96}>Write <code>fn largest&lt;T: PartialOrd + Copy&gt;(v: &amp;[T]) -&gt; T</code>.</Ex>
      </Section>

      <Section id="s6" title="6. Collections & Smart Pointers (20 exercises)">
        <Ex n={120}>Build a <code>HashMap&lt;String, u32&gt;</code> word counter.</Ex>
        <Ex n={121}>Use <code>Rc&lt;RefCell&lt;T&gt;&gt;</code> to model a shared mutable graph node.</Ex>
      </Section>

      <Section id="s7" title="7. Cargo & Testing (25 exercises)">
        <Ex n={145}>Create a workspace with two crates; expose an API and unit-test it.</Ex>
        <Ex n={146}>Add a feature flag and use <code>#[cfg(feature = "premium")]</code>.</Ex>
      </Section>

      <Section id="s8" title="8. Concurrency & Async (25 exercises)">
        <Ex n={170}>Spawn 8 threads that increment a shared <code>Arc&lt;Mutex&lt;u32&gt;&gt;</code>.</Ex>
        <Ex n={171}>With Tokio, fetch 5 URLs concurrently via <code>join_all</code>.</Ex>
      </Section>

      <Section id="s9" title="9. Files & Networking (15 exercises)">
        <Ex n={195}>Read a text file line-by-line and count occurrences of a word.</Ex>
        <Ex n={196}>Build a TCP echo server using <code>std::net::TcpListener</code>.</Ex>
      </Section>

      <Section id="s10" title="10. Debugging Drills (10 exercises)">
        <Ex n={210}>Fix "cannot borrow as mutable more than once" using scoping.</Ex>
      </Section>

      <Section id="diagrams" title="Architecture Diagrams">
        <Code lang="text">{`Exercise Flow
────────────
Read → Draft → Compile → Fix → Refactor → Test → Commit`}</Code>
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Deliberate-practice loop for Rust drills." />
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Solve on paper before typing.</li>
          <li>Time-box each exercise to 15 minutes.</li>
          <li>Refactor after passing tests.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Skipping compiler messages instead of reading them.</li>
          <li>Cloning to escape the borrow checker.</li>
          <li>Ignoring warnings until they pile up.</li>
        </ul>
        <Callout tone="tip" title="Tip">Enable <code>#![deny(warnings)]</code> in scratch crates.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Repetition + reading the compiler = Rust fluency. Chase clarity, not cleverness.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long to finish?">2–3 weeks at one hour a day.</FAQItem>
        <FAQItem q="Do I need nightly?">No — stable Rust covers every exercise.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Exercises are for study; multiple valid solutions exist.</p>
      </Section>
    </ReaderShell>
  );
}
