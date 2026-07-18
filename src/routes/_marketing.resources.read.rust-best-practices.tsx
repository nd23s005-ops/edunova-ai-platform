import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-best-practices",
  title: "Rust — Best Practices",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "16 min",
  pages: 18,
  lastUpdated: "June 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1800&q=80",
  heroSubtitle: "Professional Rust conventions: project layout, ownership guidelines, error handling, concurrency, testing, docs, logging, performance, and production hygiene.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Coding Conventions" },
  { id: "s2", label: "2. Project Organization" },
  { id: "s3", label: "3. Ownership Guidelines" },
  { id: "s4", label: "4. Error Handling" },
  { id: "s5", label: "5. Concurrency" },
  { id: "s6", label: "6. Testing" },
  { id: "s7", label: "7. Documentation" },
  { id: "s8", label: "8. Logging & Tracing" },
  { id: "s9", label: "9. Performance" },
  { id: "s10", label: "10. Production Readiness" },
  { id: "flow", label: "Flowchart" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Common Mistakes", tag: "Programming", time: "14 min" },
  { title: "Rust — Project Guide", tag: "Programming", time: "17 min" },
  { title: "Rust — Advanced Concepts", tag: "Programming", time: "31 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-best-practices" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Write idiomatic Rust that reviewers love.</li>
          <li>Adopt production-grade patterns from day one.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Coding Conventions">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>cargo fmt</code> + <code>clippy -D warnings</code> in CI.</li>
          <li>Snake_case for functions, CamelCase for types.</li>
          <li>Prefer <code>&amp;str</code> parameters over <code>String</code>.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Formatting + linting is non-negotiable." />
      </Section>

      <Section id="s2" title="2. Project Organization">
        <p>Workspaces for large repos, one binary per deployable, keep <code>lib.rs</code> focused on public API.</p>
      </Section>

      <Section id="s3" title="3. Ownership Guidelines">
        <ul className="list-disc space-y-1 pl-5">
          <li>Borrow by default, own only when necessary.</li>
          <li>Avoid <code>.clone()</code> unless profiling justifies it.</li>
          <li>Return owned types; accept references.</li>
        </ul>
      </Section>

      <Section id="s4" title="4. Error Handling">
        <p>Library crates: <code>thiserror</code> with typed variants. Binary crates: <code>anyhow</code> with contextual <code>.with_context()</code>.</p>
        <Code lang="rust">{`use anyhow::Context;
fs::read(path).with_context(|| format!("reading {path:?}"))?;`}</Code>
      </Section>

      <Section id="s5" title="5. Concurrency">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer channels over shared mutable state.</li>
          <li>Bound your queues.</li>
          <li>Never block Tokio's runtime — use <code>spawn_blocking</code>.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. Testing">
        <p>Unit → integration → property tests. Use <code>#[should_panic]</code> sparingly; prefer <code>Result</code>-returning tests.</p>
      </Section>

      <Section id="s7" title="7. Documentation">
        <p>Every public item gets a rustdoc comment. Include <code>```</code> doctests for examples.</p>
      </Section>

      <Section id="s8" title="8. Logging & Tracing">
        <p>Use <code>tracing</code>. Assign spans per request; emit structured fields, not concatenated strings.</p>
      </Section>

      <Section id="s9" title="9. Performance">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Do</th><th className="p-2 text-left">Avoid</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Iterator chains</td><td className="p-2">Index-loops with bounds checks</td></tr>
            <tr className="border-b"><td className="p-2"><code>Vec::with_capacity</code></td><td className="p-2">Repeated growth</td></tr>
            <tr><td className="p-2">LTO + <code>codegen-units = 1</code> for release</td><td className="p-2">Debug builds in prod</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" caption="Figure 2 — Measure, then optimize. Micro-tuning without profiling is noise." />
      </Section>

      <Section id="s10" title="10. Production Readiness">
        <ul className="list-disc space-y-1 pl-5">
          <li>Health + readiness endpoints.</li>
          <li>Structured JSON logs.</li>
          <li>Graceful shutdown on SIGTERM.</li>
        </ul>
      </Section>

      <Section id="flow" title="Flowchart">
        <Code lang="text">{`edit → fmt → clippy → test → doc → PR → CI green → merge`}</Code>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Using <code>unwrap()</code> in library code.</li>
          <li>Ignoring compiler warnings.</li>
          <li>Mixing runtimes (async-std + Tokio).</li>
        </ul>
        <Callout tone="tip" title="Tip">Convert warnings into errors in CI.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Great Rust code is boring: formatted, linted, well-typed errors, small APIs, and continuous measurement.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Should I use nightly?">Only for isolated experiments; ship on stable.</FAQItem>
        <FAQItem q="anyhow or thiserror?">Libraries: thiserror. Binaries: anyhow.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Reflects community norms current as of 2026.</p>
      </Section>
    </ReaderShell>
  );
}
