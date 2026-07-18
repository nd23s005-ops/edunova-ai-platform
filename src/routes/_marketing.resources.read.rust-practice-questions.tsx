import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-practice-questions",
  title: "Rust — Practice Questions",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "21 min",
  pages: 39,
  lastUpdated: "September 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "350+ Rust exercises — MCQs, debugging drills, ownership puzzles, lifetime challenges, output prediction, and mini projects.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. MCQs" },
  { id: "s2", label: "2. Output Prediction" },
  { id: "s3", label: "3. Ownership Puzzles" },
  { id: "s4", label: "4. Borrowing Drills" },
  { id: "s5", label: "5. Lifetime Challenges" },
  { id: "s6", label: "6. Debugging" },
  { id: "s7", label: "7. Traits & Generics" },
  { id: "s8", label: "8. Concurrency" },
  { id: "s9", label: "9. Async Exercises" },
  { id: "s10", label: "10. Mini Projects" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Answer Key", tag: "Programming", time: "26 min" },
  { title: "Rust — Interview Questions", tag: "Programming", time: "35 min" },
  { title: "Rust — Complete Tutorial", tag: "Programming", time: "41 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-practice-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-practice-questions" }],
  }),
  component: Page,
});

function Q({ n, children }: { n: number; children: React.ReactNode }) {
  return <div className="mb-3"><p className="font-semibold">Q{n}.</p><div className="text-sm">{children}</div></div>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Practise Rust concept-by-concept with progressive difficulty.</li>
          <li>Build intuition for the borrow checker through repetition.</li>
        </ul>
        <Callout tone="info" title="Format">Solutions in the companion "Rust — Answer Key" resource.</Callout>
      </Section>

      <Section id="s1" title="1. MCQs">
        <Q n={1}>Which is the default variable binding in Rust? (a) mut (b) let (c) const (d) static</Q>
        <Q n={2}>Rc::clone increments what? (a) new owner (b) reference count (c) memory (d) nothing</Q>
        <Q n={3}>Which trait allows types to move across threads? (a) Send (b) Sync (c) Copy (d) Drop</Q>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Progressive-difficulty ladder used across this workbook." />
      </Section>

      <Section id="s2" title="2. Output Prediction">
        <Q n={10}>What prints?<Code lang="rust">{`let s = String::from("hi"); let t = s; println!("{}", t);`}</Code></Q>
        <Q n={11}>What prints?<Code lang="rust">{`let mut v = vec![1,2,3]; v.push(4); println!("{}", v.len());`}</Code></Q>
      </Section>

      <Section id="s3" title="3. Ownership Puzzles">
        <Q n={30}>Fix the move-after-use error in this snippet using clone.</Q>
        <Q n={31}>Return two values from a function without unnecessary allocation.</Q>
      </Section>

      <Section id="s4" title="4. Borrowing Drills">
        <Q n={60}>Rewrite a function that takes ownership so it borrows instead.</Q>
        <Q n={61}>Explain why you can't have <code>&amp;T</code> and <code>&amp;mut T</code> live simultaneously.</Q>
      </Section>

      <Section id="s5" title="5. Lifetime Challenges">
        <Q n={90}>Annotate <code>fn longest(a, b)</code> so it compiles.</Q>
        <Q n={91}>Explain when you'd use <code>'static</code>.</Q>
      </Section>

      <Section id="s6" title="6. Debugging">
        <Q n={120}>Find and fix the compile error in this snippet.<Code lang="rust">{`let v = vec![1,2,3];
let r = &v;
v.push(4);
println!("{:?}", r);`}</Code></Q>
      </Section>

      <Section id="s7" title="7. Traits & Generics">
        <Q n={160}>Implement <code>Display</code> for a <code>Point</code> struct.</Q>
        <Q n={161}>Write a generic <code>max</code> function bounded by <code>PartialOrd</code>.</Q>
      </Section>

      <Section id="s8" title="8. Concurrency">
        <Q n={200}>Share a counter across 4 threads using <code>Arc&lt;Mutex&lt;i32&gt;&gt;</code>.</Q>
        <Q n={201}>Rewrite the same using channels.</Q>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Concurrency puzzle map: shared state, message passing, and rayon-style data parallelism." />
      </Section>

      <Section id="s9" title="9. Async Exercises">
        <Q n={260}>Fetch 10 URLs concurrently with <code>join_all</code>.</Q>
        <Q n={261}>Add a per-request timeout using <code>tokio::time::timeout</code>.</Q>
      </Section>

      <Section id="s10" title="10. Mini Projects">
        <ol className="list-decimal space-y-1 pl-5">
          <li>CLI markdown-to-HTML converter.</li>
          <li>Threaded log tailer.</li>
          <li>Axum + sqlx Todo API.</li>
          <li>WebSocket chat server.</li>
        </ol>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Practice concept-by-concept; don't jump ahead. Review the Answer Key only after your own attempt.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Where are the solutions?">In the "Rust — Answer Key" resource.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>MCQ</strong> — multiple-choice question.</li>
          <li><strong>Drill</strong> — repeated small exercise for muscle memory.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational workbook. Attempt independently first.</p>
      </Section>
    </ReaderShell>
  );
}
