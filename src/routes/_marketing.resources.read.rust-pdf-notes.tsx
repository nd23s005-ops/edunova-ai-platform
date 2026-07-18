import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-pdf-notes",
  title: "Rust — PDF Notes",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "69 min",
  pages: 92,
  lastUpdated: "January 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "Chapter-wise handbook covering ownership, lifetimes, Cargo, modules, collections, traits, generics, smart pointers, concurrency, async, and deployment.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "Ch 1 — Ecosystem & Setup" },
  { id: "c2", label: "Ch 2 — Syntax Essentials" },
  { id: "c3", label: "Ch 3 — Ownership" },
  { id: "c4", label: "Ch 4 — Borrowing" },
  { id: "c5", label: "Ch 5 — Lifetimes" },
  { id: "c6", label: "Ch 6 — Structs & Enums" },
  { id: "c7", label: "Ch 7 — Cargo & Modules" },
  { id: "c8", label: "Ch 8 — Collections" },
  { id: "c9", label: "Ch 9 — Traits" },
  { id: "c10", label: "Ch 10 — Generics" },
  { id: "c11", label: "Ch 11 — Smart Pointers" },
  { id: "c12", label: "Ch 12 — Error Handling" },
  { id: "c13", label: "Ch 13 — Testing" },
  { id: "c14", label: "Ch 14 — Concurrency" },
  { id: "c15", label: "Ch 15 — Async Programming" },
  { id: "c16", label: "Ch 16 — Networking" },
  { id: "c17", label: "Ch 17 — Deployment" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Quick Revision Notes", tag: "Programming", time: "9 min" },
  { title: "Rust — Cheat Sheet", tag: "Programming", time: "5 min" },
  { title: "Rust — Complete Tutorial", tag: "Programming", time: "41 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-pdf-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Have a printable, chapter-wise Rust handbook for offline study.</li>
          <li>Move from beginner to advanced with continuous references.</li>
        </ul>
        <Callout tone="info" title="Format">Optimised for print and offline reading — headings, key points, and one code sample per section.</Callout>
      </Section>

      <Section id="c1" title="Ch 1 — Ecosystem & Setup">
        <p><code>rustup</code> manages toolchains; <code>cargo</code> handles projects; <code>rustc</code> compiles; <code>clippy</code> lints; <code>rustfmt</code> formats.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Rust toolchain: rustup → rustc/cargo/clippy/rustfmt." />
      </Section>

      <Section id="c2" title="Ch 2 — Syntax Essentials">
        <Code lang="rust">{`let x = 10;
let mut y: f64 = 3.14;
if x > 0 { println!("+"); }
for i in 0..3 { println!("{i}"); }`}</Code>
      </Section>

      <Section id="c3" title="Ch 3 — Ownership">
        <p>Single owner, move on assignment, drop at scope end. Copy types are exceptions.</p>
      </Section>

      <Section id="c4" title="Ch 4 — Borrowing">
        <p>Shared (<code>&amp;</code>) or exclusive (<code>&amp;mut</code>). Aliasing XOR mutation.</p>
      </Section>

      <Section id="c5" title="Ch 5 — Lifetimes">
        <p>Named regions of code where a reference is valid. Elision covers most cases; annotate when required.</p>
      </Section>

      <Section id="c6" title="Ch 6 — Structs & Enums">
        <Code lang="rust">{`struct Point { x: f64, y: f64 }
enum Op { Add, Sub, Mul, Div }`}</Code>
      </Section>

      <Section id="c7" title="Ch 7 — Cargo & Modules">
        <p><code>Cargo.toml</code> declares deps; <code>mod</code> declares modules; <code>pub</code> exports items.</p>
      </Section>

      <Section id="c8" title="Ch 8 — Collections">
        <p><code>Vec</code>, <code>String</code>, <code>HashMap</code>, <code>HashSet</code>, <code>BTreeMap</code>.</p>
      </Section>

      <Section id="c9" title="Ch 9 — Traits">
        <p>Contract of behaviour. Auto-derives: <code>Debug</code>, <code>Clone</code>, <code>PartialEq</code>, <code>Default</code>, <code>Hash</code>.</p>
      </Section>

      <Section id="c10" title="Ch 10 — Generics">
        <p>Compile-time monomorphized. Use where-clauses to keep signatures readable.</p>
      </Section>

      <Section id="c11" title="Ch 11 — Smart Pointers">
        <p><code>Box</code>, <code>Rc</code>, <code>Arc</code>, <code>RefCell</code>, <code>Cell</code>, <code>Mutex</code>, <code>RwLock</code>.</p>
      </Section>

      <Section id="c12" title="Ch 12 — Error Handling">
        <p><code>Result</code>, <code>?</code>, <code>thiserror</code> (libraries), <code>anyhow</code> (applications).</p>
      </Section>

      <Section id="c13" title="Ch 13 — Testing">
        <p>Unit (<code>#[cfg(test)]</code>), integration (<code>tests/</code>), doctests, property-based (<code>proptest</code>).</p>
      </Section>

      <Section id="c14" title="Ch 14 — Concurrency">
        <p>Threads, <code>Arc&lt;Mutex&lt;T&gt;&gt;</code>, channels, rayon for data parallelism.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Concurrency primitives: threads, channels, and shared-state via Arc+Mutex." />
      </Section>

      <Section id="c15" title="Ch 15 — Async Programming">
        <p>Zero-cost futures, tokio runtime, <code>async fn</code> + <code>.await</code>.</p>
      </Section>

      <Section id="c16" title="Ch 16 — Networking">
        <p>tokio TCP/UDP, <code>reqwest</code> for HTTP, Axum/Actix for servers.</p>
      </Section>

      <Section id="c17" title="Ch 17 — Deployment">
        <p>Static binaries (<code>musl</code>), distroless containers, cross-compilation with <code>cross</code>.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Read a chapter, code a small example, then move on. Return every few weeks to reinforce.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Best for offline study?">Print in landscape, two columns.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Elision</strong> — compiler inferring lifetimes.</li>
          <li><strong>Monomorphization</strong> — generating specialized code per generic instantiation.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational notes — pair with hands-on practice.</p>
      </Section>
    </ReaderShell>
  );
}
