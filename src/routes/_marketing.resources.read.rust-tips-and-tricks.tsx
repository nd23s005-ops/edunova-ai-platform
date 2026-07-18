import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-tips-and-tricks",
  title: "Rust — Tips & Tricks",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 12,
  lastUpdated: "February 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "Productivity hacks, idioms, Cargo shortcuts, debugging workflows, concurrency tricks, and interview boosters — the small things Rustaceans know.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Idiomatic Patterns" },
  { id: "s2", label: "2. Cargo Shortcuts" },
  { id: "s3", label: "3. Debugging Workflows" },
  { id: "s4", label: "4. Optimization Tricks" },
  { id: "s5", label: "5. Concurrency Tips" },
  { id: "s6", label: "6. Editor & Tooling" },
  { id: "s7", label: "7. Interview Boosters" },
  { id: "compare", label: "Comparison Table" },
  { id: "best", label: "Best Practices" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Learning Roadmap", tag: "Programming", time: "9 min" },
  { title: "Rust — Best Practices", tag: "Programming", time: "16 min" },
  { title: "Rust — Cheat Sheet", tag: "Programming", time: "12 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-tips-and-tricks")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-tips-and-tricks" }],
  }),
  component: Page,
});

function Tip({ n, children }: { n: number; children: React.ReactNode }) {
  return <div className="mb-2 text-sm"><span className="font-semibold">Tip {n}.</span> {children}</div>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Adopt the small habits that mark experienced Rust engineers.</li>
          <li>Move faster with better tooling and idioms.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&q=80" caption="Figure 1 — Small optimizations, compounded daily." />
      </Section>

      <Section id="s1" title="1. Idiomatic Patterns">
        <Tip n={1}>Prefer <code>if let</code> over <code>match</code> when you only care about one variant.</Tip>
        <Tip n={2}>Use <code>?</code> for error bubbling — <code>unwrap()</code> only in tests.</Tip>
        <Tip n={3}>Iterators over indexed loops: fewer bounds checks, more optimizations.</Tip>
        <Tip n={4}>Newtypes tame primitive obsession: <code>struct UserId(u64);</code>.</Tip>
      </Section>

      <Section id="s2" title="2. Cargo Shortcuts">
        <Tip n={5}><code>cargo watch -x test</code> for a TDD loop.</Tip>
        <Tip n={6}><code>cargo add serde --features derive</code> — no more manual TOML edits.</Tip>
        <Tip n={7}><code>cargo tree -e features</code> to explain feature resolution.</Tip>
      </Section>

      <Section id="s3" title="3. Debugging Workflows">
        <Tip n={8}><code>dbg!(expr)</code> prints file/line + value.</Tip>
        <Tip n={9}><code>RUST_BACKTRACE=1</code> before running to capture panic origins.</Tip>
        <Tip n={10}><code>cargo expand</code> when a macro misbehaves.</Tip>
      </Section>

      <Section id="s4" title="4. Optimization Tricks">
        <Tip n={11}><code>Vec::with_capacity(n)</code> when the size is known.</Tip>
        <Tip n={12}>Set <code>codegen-units = 1</code> + <code>lto = "fat"</code> for release builds.</Tip>
        <Tip n={13}>Prefer <code>SmallVec</code>/<code>ArrayVec</code> for hot paths with tiny sizes.</Tip>
      </Section>

      <Section id="s5" title="5. Concurrency Tips">
        <Tip n={14}>Channels &gt; mutexes when data flows one direction.</Tip>
        <Tip n={15}>Never sleep inside async — use <code>tokio::time::sleep</code>.</Tip>
        <Tip n={16}><code>rayon::par_iter</code> for embarrassingly parallel loops.</Tip>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" caption="Figure 2 — Choose the smallest coordination primitive that works." />
      </Section>

      <Section id="s6" title="6. Editor & Tooling">
        <Tip n={17}>Install rust-analyzer + inlay hints — huge productivity win.</Tip>
        <Tip n={18}>Use <code>mold</code> or <code>lld</code> linkers to cut link time by 5–10x.</Tip>
      </Section>

      <Section id="s7" title="7. Interview Boosters">
        <Tip n={19}>Explain move semantics on a whiteboard from memory.</Tip>
        <Tip n={20}>Rebuild a mini <code>Vec&lt;T&gt;</code> from scratch — memorable answer.</Tip>
      </Section>

      <Section id="compare" title="Comparison Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Task</th><th className="p-2 text-left">Beginner</th><th className="p-2 text-left">Idiomatic</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Iterate + collect</td><td className="p-2">for-loop + push</td><td className="p-2">iter().map().collect()</td></tr>
            <tr className="border-b"><td className="p-2">Error propagation</td><td className="p-2">match Result</td><td className="p-2"><code>?</code></td></tr>
            <tr><td className="p-2">Function param</td><td className="p-2"><code>String</code></td><td className="p-2"><code>&amp;str</code></td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="best" title="Best Practices">
        <Code lang="rust">{`#![deny(clippy::pedantic)]
#![forbid(unsafe_code)]`}</Code>
        <Callout tone="tip" title="Tip">Turn on strict lints early — cheap to comply, expensive to retrofit.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Rust productivity is 20% syntax, 80% workflow. Steal these habits and you'll write like a senior in weeks.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Best cargo plugin?"><code>cargo watch</code>, hands down.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Tips reflect community consensus — verify against your codebase's conventions.</p>
      </Section>
    </ReaderShell>
  );
}
