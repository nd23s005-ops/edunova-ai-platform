import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-answer-key",
  title: "Rust — Answer Key",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "26 min",
  pages: 32,
  lastUpdated: "April 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "Fully-explained solutions to the Rust Practice Questions workbook — reasoning, alternatives, optimization tips, and rubrics.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. MCQ Answers" },
  { id: "s2", label: "2. Output Prediction" },
  { id: "s3", label: "3. Ownership Puzzles" },
  { id: "s4", label: "4. Borrowing Drills" },
  { id: "s5", label: "5. Lifetime Challenges" },
  { id: "s6", label: "6. Debugging Walkthroughs" },
  { id: "s7", label: "7. Traits & Generics" },
  { id: "s8", label: "8. Concurrency Solutions" },
  { id: "s9", label: "9. Async Solutions" },
  { id: "s10", label: "10. Mini Project Rubrics" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Practice Questions", tag: "Programming", time: "21 min" },
  { title: "Rust — Interview Questions", tag: "Programming", time: "35 min" },
  { title: "Rust — Complete Tutorial", tag: "Programming", time: "41 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-answer-key")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-answer-key" }],
  }),
  component: Page,
});

function A({ n, children }: { n: number | string; children: React.ReactNode }) {
  return <div className="mb-3"><p className="font-semibold">A{n}.</p><div className="text-sm">{children}</div></div>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Verify practice attempts with detailed reasoning.</li>
          <li>Learn optimization and stylistic alternatives.</li>
          <li>Self-grade with clear rubrics.</li>
        </ul>
        <Callout tone="warning" title="Discipline">Attempt every question in the workbook before opening this key.</Callout>
      </Section>

      <Section id="s1" title="1. MCQ Answers">
        <A n={1}>(b) <code>let</code> — the default binding.</A>
        <A n={2}>(b) reference count — the pointer is bumped, no new allocation.</A>
        <A n={3}>(a) Send — <code>Sync</code> is for shared references.</A>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Answer-key methodology: reason first, code second, alternatives third." />
      </Section>

      <Section id="s2" title="2. Output Prediction">
        <A n={10}>Prints "hi". <code>s</code> moved into <code>t</code>; using <code>s</code> after would fail.</A>
        <A n={11}>Prints 4 — <code>push</code> mutates in place; length grows by 1.</A>
      </Section>

      <Section id="s3" title="3. Ownership Puzzles">
        <A n={30}>
          <Code lang="rust">{`let s = String::from("hi");
let t = s.clone(); // now both usable
println!("{}, {}", s, t);`}</Code>
          Prefer references over clones when perf matters.
        </A>
        <A n={31}>Return a tuple or a small struct — zero-cost.<Code lang="rust">{`fn split(s: &str) -> (&str, &str) { s.split_at(1) }`}</Code></A>
      </Section>

      <Section id="s4" title="4. Borrowing Drills">
        <A n={60}>Take <code>&amp;str</code> instead of <code>String</code>:<Code lang="rust">{`fn hello(name: &str) { println!("Hi, {name}"); }`}</Code></A>
        <A n={61}>Rust's aliasing-XOR-mutation rule prevents readers from seeing torn writes without needing locks.</A>
      </Section>

      <Section id="s5" title="5. Lifetime Challenges">
        <A n={90}>
          <Code lang="rust">{`fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() { a } else { b }
}`}</Code>
          The output must not outlive either input.
        </A>
        <A n={91}><code>'static</code> for string literals, program-lifetime globals, or values you leak intentionally.</A>
      </Section>

      <Section id="s6" title="6. Debugging Walkthroughs">
        <A n={120}>The <code>&amp;v</code> keeps a shared borrow alive while <code>v.push</code> demands a mutable borrow. Fix by ending the shared borrow first:<Code lang="rust">{`let v = vec![1,2,3];
{
    let r = &v;
    println!("{:?}", r);
}
let mut v = v; v.push(4);`}</Code></A>
      </Section>

      <Section id="s7" title="7. Traits & Generics">
        <A n={160}>
          <Code lang="rust">{`use std::fmt;
struct Point { x: f64, y: f64 }
impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}`}</Code>
        </A>
        <A n={161}>
          <Code lang="rust">{`fn max<T: PartialOrd>(a: T, b: T) -> T { if a > b { a } else { b } }`}</Code>
        </A>
      </Section>

      <Section id="s8" title="8. Concurrency Solutions">
        <A n={200}>
          <Code lang="rust">{`use std::sync::{Arc, Mutex};
use std::thread;
let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];
for _ in 0..4 {
    let c = Arc::clone(&counter);
    handles.push(thread::spawn(move || { *c.lock().unwrap() += 1; }));
}
for h in handles { h.join().unwrap(); }`}</Code>
        </A>
        <A n={201}>Use <code>mpsc::channel</code>; each worker sends 1; main sums receipts.</A>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Choosing between Arc+Mutex and channels: shared state vs message passing." />
      </Section>

      <Section id="s9" title="9. Async Solutions">
        <A n={260}>
          <Code lang="rust">{`let urls = vec!["a", "b", "c"];
let results = futures::future::join_all(
    urls.iter().map(|u| reqwest::get(*u))
).await;`}</Code>
        </A>
        <A n={261}><code>tokio::time::timeout(dur, fut).await</code> — returns <code>Err(Elapsed)</code> on expiry.</A>
      </Section>

      <Section id="s10" title="10. Mini Project Rubrics">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Criterion</th><th className="p-2 text-left">Weight</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Correctness</td><td className="p-2">40%</td></tr>
            <tr className="border-b"><td className="p-2">Idiomatic Rust</td><td className="p-2">20%</td></tr>
            <tr className="border-b"><td className="p-2">Error handling</td><td className="p-2">15%</td></tr>
            <tr className="border-b"><td className="p-2">Tests</td><td className="p-2">15%</td></tr>
            <tr><td className="p-2">Documentation</td><td className="p-2">10%</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>The best answer isn't always the shortest — clarity + safety + performance is the winning trio.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Multiple correct answers?">Often — the rubric rewards clarity and correctness over style.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Rubric</strong> — grading criteria with weights.</li>
          <li><strong>Idiomatic</strong> — matches community convention.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Solutions provided for study — multiple correct approaches exist.</p>
      </Section>
    </ReaderShell>
  );
}
