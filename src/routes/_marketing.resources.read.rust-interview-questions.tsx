import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-interview-questions",
  title: "Rust — Interview Questions",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "35 min",
  pages: 35,
  lastUpdated: "May 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "300+ interview questions across beginner, intermediate, senior, and systems programming — with model answers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Beginner (Q1-30)" },
  { id: "s2", label: "2. Ownership & Borrowing" },
  { id: "s3", label: "3. Lifetimes" },
  { id: "s4", label: "4. Traits & Generics" },
  { id: "s5", label: "5. Smart Pointers" },
  { id: "s6", label: "6. Concurrency" },
  { id: "s7", label: "7. Async" },
  { id: "s8", label: "8. Memory Safety" },
  { id: "s9", label: "9. Systems Programming" },
  { id: "s10", label: "10. Coding Problems" },
  { id: "s11", label: "11. Senior/Staff" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Practice Questions", tag: "Programming", time: "21 min" },
  { title: "Rust — Answer Key", tag: "Programming", time: "26 min" },
  { title: "Rust — Complete Tutorial", tag: "Programming", time: "41 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-interview-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-interview-questions" }],
  }),
  component: Page,
});

function QA({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <p className="font-semibold">Q. {q}</p>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cover the full Rust interview landscape end to end.</li>
          <li>Rehearse model answers you'd actually give in a room.</li>
        </ul>
        <Callout tone="info" title="How to use">Read the question, answer aloud, only then read the model answer.</Callout>
      </Section>

      <Section id="s1" title="1. Beginner">
        <QA q="What is Rust?">A systems language with memory safety enforced at compile time — no null, no data races, no GC.</QA>
        <QA q="Difference between let and const?"><code>let</code> is a runtime binding (default immutable); <code>const</code> is a compile-time constant with an explicit type.</QA>
        <QA q="What is a crate?">Rust's compilation and distribution unit — a binary or library.</QA>
        <QA q="What does Cargo do?">Manages projects, dependencies, builds, tests, docs, benchmarks.</QA>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Rust interview topic map: syntax → ownership → concurrency → systems." />
      </Section>

      <Section id="s2" title="2. Ownership & Borrowing">
        <QA q="Explain ownership.">Each value has exactly one owner; on move, the source becomes invalid; on scope exit, drop runs.</QA>
        <QA q="Move vs Copy?">Copy types (integers, bools, small tuples) are duplicated by value; non-Copy types move.</QA>
        <QA q="Explain the borrow-checker in one sentence.">Aliasing XOR mutation — any number of shared borrows or exactly one mutable borrow.</QA>
      </Section>

      <Section id="s3" title="3. Lifetimes">
        <QA q="What is a lifetime?">A compile-time label for the region during which a reference is valid.</QA>
        <QA q="What does 'static mean?">Reference valid for the whole program.</QA>
        <QA q="When to annotate?">When the compiler can't infer relationships between multiple input/output references.</QA>
      </Section>

      <Section id="s4" title="4. Traits & Generics">
        <QA q="Traits vs interfaces?">Traits support default methods, associated types, and are used for generic bounds — closer to Haskell type classes.</QA>
        <QA q="Static vs dynamic dispatch?">Static (monomorphized) is faster but generates more code; dynamic (<code>dyn Trait</code>) is smaller but adds one vtable indirection.</QA>
        <QA q="Object safety?">A trait is object-safe when it can be turned into a trait object (no <code>Self</code> in return position, no generics in methods).</QA>
      </Section>

      <Section id="s5" title="5. Smart Pointers">
        <QA q="Box vs Rc vs Arc?">Box: single owner; Rc: multi-owner single-threaded; Arc: multi-owner thread-safe.</QA>
        <QA q="Interior mutability?"><code>Cell</code>/<code>RefCell</code> (single-threaded) or <code>Mutex</code>/<code>RwLock</code> (multi-threaded).</QA>
      </Section>

      <Section id="s6" title="6. Concurrency">
        <QA q="Send vs Sync?">Send: safe to move across threads. Sync: safe to share (<code>&amp;T</code>) across threads.</QA>
        <QA q="Why is Rc not Send?">Non-atomic reference counting would race.</QA>
        <QA q="Prevent deadlocks?">Consistent lock order; use <code>parking_lot</code> or channels; avoid holding a lock across <code>.await</code>.</QA>
      </Section>

      <Section id="s7" title="7. Async">
        <QA q="Why is a Future lazy?">Nothing happens until it's polled — enables composition without allocation.</QA>
        <QA q="tokio::spawn vs .await?"><code>spawn</code> runs concurrently; <code>.await</code> waits sequentially.</QA>
        <QA q="Pinning?">Prevents self-referential structs from moving in memory — required for async state machines.</QA>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Async state machine: Poll → Pending/Ready → Wake." />
      </Section>

      <Section id="s8" title="8. Memory Safety">
        <QA q="How does Rust prevent data races?">Send/Sync markers + the borrow checker: shared XOR mutable.</QA>
        <QA q="What is unsafe for?">FFI, raw pointers, hardware, and building safe abstractions on top.</QA>
      </Section>

      <Section id="s9" title="9. Systems Programming">
        <QA q="Zero-cost abstractions?">High-level constructs compile down to the same code you'd write by hand.</QA>
        <QA q="FFI with C?"><code>extern "C"</code> + <code>#[repr(C)]</code>. Cross carefully; unsafe surface.</QA>
      </Section>

      <Section id="s10" title="10. Coding Problems">
        <Code lang="rust">{`// Reverse a string (bytes-safe for ASCII).
fn reverse(s: &str) -> String { s.chars().rev().collect() }`}</Code>
        <Code lang="rust">{`// Parallel sum with rayon.
use rayon::prelude::*;
let n: i64 = (1..=1_000_000).into_par_iter().sum();`}</Code>
      </Section>

      <Section id="s11" title="11. Senior / Staff">
        <QA q="Design a lock-free queue?">Discuss <code>crossbeam</code>'s Michael-Scott queue, ABA problem, memory ordering.</QA>
        <QA q="Reduce compile times?">Split crates, use <code>cargo build --timings</code>, generics discipline, <code>sccache</code>.</QA>
        <QA q="When would you not use Rust?">Prototypes, scripts, teams new to systems programming, tight-deadline UIs.</QA>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Interviews test taste as much as syntax. Have opinions, back them with trade-offs.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Live coding?">Yes — practice on a shared editor with types.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Object safety</strong> — trait property allowing trait objects.</li>
          <li><strong>NLL</strong> — Non-Lexical Lifetimes.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Interview guidance for educational use.</p>
      </Section>
    </ReaderShell>
  );
}
