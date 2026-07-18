import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-beginner-guide",
  title: "Rust — Beginner Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "17 min",
  pages: 22,
  lastUpdated: "March 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "A gentle introduction to Rust — ownership, borrowing, types, control flow, structs, enums, modules, and error handling explained with analogies.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Why Rust?" },
  { id: "s2", label: "2. Installation & Hello World" },
  { id: "s3", label: "3. Variables & Data Types" },
  { id: "s4", label: "4. Control Flow" },
  { id: "s5", label: "5. Functions" },
  { id: "s6", label: "6. Ownership" },
  { id: "s7", label: "7. Borrowing & References" },
  { id: "s8", label: "8. Structs" },
  { id: "s9", label: "9. Enums & Pattern Matching" },
  { id: "s10", label: "10. Modules & Crates" },
  { id: "s11", label: "11. Error Handling" },
  { id: "s12", label: "12. Rust Philosophy" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Complete Tutorial", tag: "Programming", time: "41 min" },
  { title: "Rust — Step-by-Step Learning Guide", tag: "Programming", time: "24 min" },
  { title: "Rust — Cheat Sheet", tag: "Programming", time: "5 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-beginner-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand what makes Rust unique — safety without a GC.</li>
          <li>Write, compile, and run simple Rust programs.</li>
          <li>Grasp ownership and borrowing with everyday analogies.</li>
          <li>Read idiomatic Rust code with confidence.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Why Rust?">
        <p>Rust delivers C-level performance with memory safety guaranteed at compile time. No null pointers, no data races, no garbage collector. It powers Firefox, Cloudflare, Discord, and parts of the Linux kernel.</p>
        <Callout tone="info" title="Analogy">Think of Rust as a strict but helpful editor who catches bugs before they ship — the borrow checker is your co-author.</Callout>
      </Section>

      <Section id="s2" title="2. Installation & Hello World">
        <Code lang="bash">{`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo new hello && cd hello && cargo run`}</Code>
        <Code lang="rust">{`fn main() {
    println!("Hello, world!");
}`}</Code>
        <Figure src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80" caption="Figure 1 — The Rust toolchain: rustup manages toolchains, cargo manages projects, rustc compiles." />
      </Section>

      <Section id="s3" title="3. Variables & Data Types">
        <p>Variables are immutable by default. Use <code>mut</code> to opt in to mutability.</p>
        <Code lang="rust">{`let x = 5;          // immutable
let mut y = 10;     // mutable
let name: &str = "Ada";
let age: u32 = 30;
let pi: f64 = 3.14;
let is_ok: bool = true;`}</Code>
      </Section>

      <Section id="s4" title="4. Control Flow">
        <Code lang="rust">{`if x > 0 { println!("positive"); } else { println!("non-positive"); }
for i in 0..5 { println!("{}", i); }
let mut n = 3;
while n > 0 { n -= 1; }`}</Code>
      </Section>

      <Section id="s5" title="5. Functions">
        <Code lang="rust">{`fn add(a: i32, b: i32) -> i32 {
    a + b // last expression is the return value
}`}</Code>
      </Section>

      <Section id="s6" title="6. Ownership">
        <p>Every value has a single owner. When the owner goes out of scope, the value is dropped. This eliminates a whole class of memory bugs.</p>
        <Code lang="rust">{`let s = String::from("hi");
let t = s;          // s is moved into t
// println!("{}", s); // ERROR: s no longer valid`}</Code>
      </Section>

      <Section id="s7" title="7. Borrowing & References">
        <p>Instead of moving, you can borrow — either shared (<code>&amp;T</code>) or mutable (<code>&amp;mut T</code>). Rules: many shared XOR one mutable.</p>
        <Code lang="rust">{`fn len(s: &String) -> usize { s.len() }
let s = String::from("hi");
println!("{}", len(&s)); // s still owned here`}</Code>
      </Section>

      <Section id="s8" title="8. Structs">
        <Code lang="rust">{`struct User { name: String, age: u32 }
let u = User { name: "Ada".into(), age: 30 };`}</Code>
      </Section>

      <Section id="s9" title="9. Enums & Pattern Matching">
        <Code lang="rust">{`enum Shape { Circle(f64), Square(f64) }
match s {
    Shape::Circle(r) => 3.14 * r * r,
    Shape::Square(a) => a * a,
}`}</Code>
      </Section>

      <Section id="s10" title="10. Modules & Crates">
        <p>A crate is a compilation unit; a module organises code within a crate. <code>Cargo.toml</code> lists dependencies (external crates).</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 2 — Rust crate/module hierarchy: workspace → crate → module → item." />
      </Section>

      <Section id="s11" title="11. Error Handling">
        <p>Two flavours: <code>Result&lt;T, E&gt;</code> for recoverable errors, <code>panic!</code> for unrecoverable ones. Use <code>?</code> to propagate errors concisely.</p>
        <Code lang="rust">{`fn read() -> Result<String, std::io::Error> {
    let s = std::fs::read_to_string("f.txt")?;
    Ok(s)
}`}</Code>
      </Section>

      <Section id="s12" title="12. The Rust Philosophy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Make invalid states unrepresentable.</li>
          <li>Fearless concurrency: the compiler proves data-race freedom.</li>
          <li>Zero-cost abstractions: high level, no runtime overhead.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Rust's power comes from ownership + borrowing. Once those click, everything else — traits, lifetimes, async — builds on top.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is Rust hard?">Steeper than most, gentler than C++. Expect a two-week ramp.</FAQItem>
        <FAQItem q="Do I need to know C?">No, but familiarity with pointers helps.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Ownership</strong> — each value has exactly one owner at a time.</li>
          <li><strong>Borrow</strong> — a reference that doesn't take ownership.</li>
          <li><strong>Crate</strong> — Rust's compilation and distribution unit.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Verify against the current Rust edition.</p>
      </Section>
    </ReaderShell>
  );
}
