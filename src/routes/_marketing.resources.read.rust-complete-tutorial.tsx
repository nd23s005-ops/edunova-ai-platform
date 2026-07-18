import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-complete-tutorial",
  title: "Rust — Complete Tutorial",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "41 min",
  pages: 63,
  lastUpdated: "May 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "Beginner to advanced Rust — ownership, lifetimes, traits, generics, smart pointers, concurrency, async, Cargo, testing, HTTP, database, deployment.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Setup & Cargo" },
  { id: "s2", label: "2. Ownership" },
  { id: "s3", label: "3. Borrowing" },
  { id: "s4", label: "4. Lifetimes" },
  { id: "s5", label: "5. Traits" },
  { id: "s6", label: "6. Generics" },
  { id: "s7", label: "7. Smart Pointers" },
  { id: "s8", label: "8. Collections" },
  { id: "s9", label: "9. Iterators & Closures" },
  { id: "s10", label: "10. Error Handling" },
  { id: "s11", label: "11. Testing" },
  { id: "s12", label: "12. Concurrency" },
  { id: "s13", label: "13. Async/Await" },
  { id: "s14", label: "14. File I/O" },
  { id: "s15", label: "15. Networking" },
  { id: "s16", label: "16. REST APIs (Axum)" },
  { id: "s17", label: "17. Database (sqlx)" },
  { id: "s18", label: "18. Macros" },
  { id: "s19", label: "19. Unsafe Rust" },
  { id: "s20", label: "20. Deployment" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Beginner Guide", tag: "Programming", time: "17 min" },
  { title: "Rust — Interview Questions", tag: "Programming", time: "35 min" },
  { title: "Rust — Practice Questions", tag: "Programming", time: "21 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-complete-tutorial")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-complete-tutorial" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Learn Rust from scratch to production-ready.</li>
          <li>Build a REST API with database, tests, and CI.</li>
          <li>Reason about ownership, lifetimes, and traits fluently.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Setup & Cargo">
        <Code lang="bash">{`rustup update stable
cargo new myapp && cd myapp
cargo build && cargo run && cargo test`}</Code>
        <p><code>Cargo.toml</code> declares dependencies; <code>Cargo.lock</code> pins versions.</p>
      </Section>

      <Section id="s2" title="2. Ownership">
        <p>Move semantics by default. Copy types (integers, bools, small tuples of Copy) implement <code>Copy</code> and are duplicated instead of moved.</p>
      </Section>

      <Section id="s3" title="3. Borrowing">
        <p>Rule: any number of shared borrows OR exactly one mutable borrow — never both at once.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Ownership/borrow checker flow: move, shared borrow, mutable borrow, drop." />
      </Section>

      <Section id="s4" title="4. Lifetimes">
        <p>Lifetimes label how long references are valid. Most are elided; annotate when the compiler can't infer.</p>
        <Code lang="rust">{`fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() { a } else { b }
}`}</Code>
      </Section>

      <Section id="s5" title="5. Traits">
        <p>Shared behaviour — Rust's answer to interfaces. Static dispatch by default (monomorphized), dynamic dispatch via <code>dyn Trait</code>.</p>
      </Section>

      <Section id="s6" title="6. Generics">
        <Code lang="rust">{`fn largest<T: PartialOrd + Copy>(xs: &[T]) -> T {
    let mut best = xs[0];
    for &x in xs { if x > best { best = x; } }
    best
}`}</Code>
      </Section>

      <Section id="s7" title="7. Smart Pointers">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Type</th><th className="p-2 text-left">Purpose</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2"><code>Box&lt;T&gt;</code></td><td className="p-2">Heap allocation, single owner</td></tr>
            <tr className="border-b"><td className="p-2"><code>Rc&lt;T&gt;</code></td><td className="p-2">Shared ownership, single-threaded</td></tr>
            <tr className="border-b"><td className="p-2"><code>Arc&lt;T&gt;</code></td><td className="p-2">Shared ownership, thread-safe</td></tr>
            <tr><td className="p-2"><code>RefCell&lt;T&gt;</code></td><td className="p-2">Interior mutability, runtime-checked</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s8" title="8. Collections"><p><code>Vec</code>, <code>String</code>, <code>HashMap</code>, <code>HashSet</code>, <code>BTreeMap</code>, <code>VecDeque</code>.</p></Section>

      <Section id="s9" title="9. Iterators & Closures">
        <Code lang="rust">{`let sum: i32 = (1..=10).filter(|n| n % 2 == 0).sum();`}</Code>
      </Section>

      <Section id="s10" title="10. Error Handling">
        <p><code>Result&lt;T, E&gt;</code>, <code>?</code> operator, <code>thiserror</code> for library errors, <code>anyhow</code> for applications.</p>
      </Section>

      <Section id="s11" title="11. Testing">
        <Code lang="rust">{`#[cfg(test)]
mod tests {
    #[test] fn adds() { assert_eq!(2 + 2, 4); }
}`}</Code>
      </Section>

      <Section id="s12" title="12. Concurrency">
        <p><code>std::thread</code>, <code>Arc&lt;Mutex&lt;T&gt;&gt;</code>, channels via <code>std::sync::mpsc</code> or <code>crossbeam</code>.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Concurrency model: threads share state via Arc+Mutex or communicate via channels." />
      </Section>

      <Section id="s13" title="13. Async/Await">
        <Code lang="rust">{`#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let body = reqwest::get("https://example.com").await?.text().await?;
    println!("{body}"); Ok(())
}`}</Code>
      </Section>

      <Section id="s14" title="14. File I/O">
        <Code lang="rust">{`let contents = std::fs::read_to_string("input.txt")?;`}</Code>
      </Section>

      <Section id="s15" title="15. Networking"><p>Async TCP with <code>tokio::net</code>, HTTP with <code>reqwest</code>/<code>hyper</code>.</p></Section>

      <Section id="s16" title="16. REST APIs with Axum">
        <Code lang="rust">{`use axum::{routing::get, Router};
#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(|| async { "hello" }));
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service()).await.unwrap();
}`}</Code>
      </Section>

      <Section id="s17" title="17. Database with sqlx"><p>Compile-time checked SQL, async, works with Postgres/MySQL/SQLite.</p></Section>

      <Section id="s18" title="18. Macros">
        <p>Declarative (<code>macro_rules!</code>) and procedural (custom derive, attribute, function-like).</p>
      </Section>

      <Section id="s19" title="19. Unsafe Rust">
        <Callout tone="warning" title="Rule of thumb">Isolate unsafe behind a safe API. Document invariants.</Callout>
      </Section>

      <Section id="s20" title="20. Deployment">
        <Code lang="dockerfile">{`FROM rust:1.78 as build
WORKDIR /src
COPY . .
RUN cargo build --release
FROM debian:bookworm-slim
COPY --from=build /src/target/release/myapp /myapp
ENTRYPOINT ["/myapp"]`}</Code>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Rust's steep entry pays back in reliable, fast code. Master ownership; the rest of the language flows from it.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which async runtime?">Tokio is the default for most work; smol/async-std for niches.</FAQItem>
        <FAQItem q="ORM or sqlx?">sqlx first. SeaORM/Diesel when you want abstractions.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Trait object</strong> — <code>dyn Trait</code>, dynamic dispatch.</li>
          <li><strong>Lifetime</strong> — compile-time label of reference validity.</li>
          <li><strong>Cargo</strong> — Rust's build tool and package manager.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Snapshot for study. Verify against current stable Rust.</p>
      </Section>
    </ReaderShell>
  );
}
