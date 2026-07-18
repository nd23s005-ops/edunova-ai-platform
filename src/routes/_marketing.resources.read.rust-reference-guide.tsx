import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-reference-guide",
  title: "Rust — Reference Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "41 min",
  pages: 51,
  lastUpdated: "July 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1800&q=80",
  heroSubtitle: "Daily-use Rust reference — syntax, std library, Cargo commands, collections, smart pointers, traits, generics, async, macros, testing, networking, and deployment lookup tables.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Syntax Reference" },
  { id: "s2", label: "2. Standard Library" },
  { id: "s3", label: "3. Cargo Commands" },
  { id: "s4", label: "4. Modules & Visibility" },
  { id: "s5", label: "5. Collections" },
  { id: "s6", label: "6. Smart Pointers" },
  { id: "s7", label: "7. Traits & Generics" },
  { id: "s8", label: "8. Async Programming" },
  { id: "s9", label: "9. Macros" },
  { id: "s10", label: "10. Testing" },
  { id: "s11", label: "11. Networking" },
  { id: "s12", label: "12. Deployment" },
  { id: "diagrams", label: "Architecture Diagrams" },
  { id: "best", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Cheat Sheet", tag: "Programming", time: "12 min" },
  { title: "Rust — Glossary", tag: "Programming", time: "15 min" },
  { title: "Rust — Advanced Concepts", tag: "Programming", time: "31 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-reference-guide" }],
  }),
  component: Page,
});

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <tr className="border-b"><td className="p-2 font-mono text-xs">{k}</td><td className="p-2 text-sm">{v}</td></tr>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>One page to keep open all day.</li>
          <li>Fast recall of syntax, commands, and idioms.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Syntax Reference">
        <table className="w-full border-collapse"><tbody>
          <Row k="let x = 5;" v="Immutable binding" />
          <Row k="let mut x = 5;" v="Mutable binding" />
          <Row k="const N: u32 = 10;" v="Compile-time constant" />
          <Row k="fn add(a:i32, b:i32) -> i32" v="Function signature" />
          <Row k="match e { A => 1, _ => 0 }" v="Exhaustive pattern match" />
        </tbody></table>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — The essentials fit on a single screen." />
      </Section>

      <Section id="s2" title="2. Standard Library">
        <table className="w-full border-collapse"><tbody>
          <Row k="Option<T>" v="Some/None wrapper" />
          <Row k="Result<T,E>" v="Ok/Err wrapper" />
          <Row k="Vec<T>" v="Growable array" />
          <Row k="HashMap<K,V>" v="Hashed key/value map" />
          <Row k="String" v="Owned UTF-8 string" />
        </tbody></table>
      </Section>

      <Section id="s3" title="3. Cargo Commands">
        <Code lang="bash">{`cargo new my-app
cargo build [--release]
cargo run
cargo test
cargo fmt
cargo clippy -- -D warnings
cargo add serde --features derive
cargo publish`}</Code>
      </Section>

      <Section id="s4" title="4. Modules & Visibility">
        <Code lang="rust">{`mod utils {
    pub fn hi() {}
    pub(crate) fn only_here() {}
}
use utils::hi;`}</Code>
      </Section>

      <Section id="s5" title="5. Collections">
        <table className="w-full border-collapse"><tbody>
          <Row k="Vec::new()" v="Empty vector" />
          <Row k="Vec::with_capacity(n)" v="Preallocated" />
          <Row k="HashMap::new()" v="Empty map" />
          <Row k="BTreeMap::new()" v="Sorted map" />
        </tbody></table>
      </Section>

      <Section id="s6" title="6. Smart Pointers">
        <table className="w-full border-collapse"><tbody>
          <Row k="Box<T>" v="Heap allocation" />
          <Row k="Rc<T>" v="Single-threaded refcount" />
          <Row k="Arc<T>" v="Atomic refcount" />
          <Row k="RefCell<T>" v="Interior mutability (runtime-checked)" />
        </tbody></table>
      </Section>

      <Section id="s7" title="7. Traits & Generics">
        <Code lang="rust">{`fn max<T: PartialOrd>(a:T, b:T) -> T { if a>b {a} else {b} }
trait Greet { fn hi(&self); }
impl Greet for &str { fn hi(&self){ println!("hi {self}"); } }`}</Code>
      </Section>

      <Section id="s8" title="8. Async Programming">
        <Code lang="rust">{`#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let body = reqwest::get("https://example.com").await?.text().await?;
    println!("{}", body.len());
    Ok(())
}`}</Code>
      </Section>

      <Section id="s9" title="9. Macros">
        <Code lang="rust">{`macro_rules! square { ($x:expr) => { $x * $x }; }
let s = square!(4); // 16`}</Code>
      </Section>

      <Section id="s10" title="10. Testing">
        <Code lang="rust">{`#[cfg(test)]
mod tests {
    #[test]
    fn works() { assert_eq!(2+2, 4); }
}`}</Code>
      </Section>

      <Section id="s11" title="11. Networking">
        <p>HTTP: <code>reqwest</code>, <code>hyper</code>, <code>axum</code>. TCP: <code>tokio::net::TcpListener</code>. gRPC: <code>tonic</code>.</p>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Ecosystem cheat-map for network stacks." />
      </Section>

      <Section id="s12" title="12. Deployment">
        <Code lang="dockerfile">{`FROM rust:1.80 AS builder
WORKDIR /app
COPY . .
RUN cargo build --release
FROM gcr.io/distroless/cc
COPY --from=builder /app/target/release/app /
CMD ["/app"]`}</Code>
      </Section>

      <Section id="diagrams" title="Architecture Diagrams">
        <Code lang="text">{`source → cargo → rustc → linker → binary
                            ↓
                         (LTO/PGO)`}</Code>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Keep clippy strict in CI.</li>
          <li>Prefer async when I/O-bound, threads when CPU-bound.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Blocking calls inside async runtimes.</li>
          <li>Forgetting <code>--release</code> for benchmarks.</li>
        </ul>
        <Callout tone="tip" title="Tip">Bookmark this page — it's the fastest way to remember syntax.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Rust rewards recall. Skim daily, drill weekly, ship monthly.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which Rust edition should I use?">Latest stable (2024 or newer).</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Reference is snapshot-in-time; verify against current toolchain.</p>
      </Section>
    </ReaderShell>
  );
}
