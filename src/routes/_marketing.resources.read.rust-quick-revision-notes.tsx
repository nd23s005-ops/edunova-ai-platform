import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-quick-revision-notes",
  title: "Rust — Quick Revision Notes",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "9 min",
  pages: 6,
  lastUpdated: "May 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "Condensed Rust revision — key concepts, mnemonics, comparison tables, and last-minute interview reminders.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Ownership at a Glance" },
  { id: "s2", label: "2. Borrow Rules Mnemonic" },
  { id: "s3", label: "3. Smart Pointers Table" },
  { id: "s4", label: "4. Error Handling" },
  { id: "s5", label: "5. Traits Quick Recall" },
  { id: "s6", label: "6. Concurrency Cheats" },
  { id: "s7", label: "7. Async Essentials" },
  { id: "s8", label: "8. Cargo Commands" },
  { id: "s9", label: "9. Interview Reminders" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Cheat Sheet", tag: "Programming", time: "5 min" },
  { title: "Rust — Interview Questions", tag: "Programming", time: "35 min" },
  { title: "Rust — PDF Notes", tag: "Programming", time: "69 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-quick-revision-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-quick-revision-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reload core Rust in under 10 minutes.</li>
          <li>Nail interview trivia with memorable mnemonics.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Ownership at a Glance">
        <p><strong>MSD:</strong> Move · Scope · Drop. One owner, moves on assignment, drops at scope end.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Ownership timeline: bind → move/borrow → drop." />
      </Section>

      <Section id="s2" title="2. Borrow Rules — 'AXM'">
        <p><strong>A</strong>liasing <strong>X</strong>OR <strong>M</strong>utation. Many <code>&amp;T</code> or one <code>&amp;mut T</code>, never both.</p>
      </Section>

      <Section id="s3" title="3. Smart Pointers Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Type</th><th className="p-2 text-left">Owner</th><th className="p-2 text-left">Thread</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Box</td><td className="p-2">Single</td><td className="p-2">–</td></tr>
            <tr className="border-b"><td className="p-2">Rc</td><td className="p-2">Multi</td><td className="p-2">Single-thread</td></tr>
            <tr className="border-b"><td className="p-2">Arc</td><td className="p-2">Multi</td><td className="p-2">Multi-thread</td></tr>
            <tr><td className="p-2">RefCell</td><td className="p-2">Interior mut</td><td className="p-2">Single-thread</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s4" title="4. Error Handling">
        <p><code>Result&lt;T,E&gt;</code> + <code>?</code>. Libs → <code>thiserror</code>. Apps → <code>anyhow</code>.</p>
      </Section>

      <Section id="s5" title="5. Traits Quick Recall">
        <p>Static dispatch = fast, bloated. Dynamic (<code>dyn</code>) = flexible, one vtable indirection.</p>
      </Section>

      <Section id="s6" title="6. Concurrency Cheats">
        <p><strong>SAM</strong>: Send-safe, Arc-shared, Mutex-guarded. Prefer channels for ownership transfer.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Concurrency triangle: threads ↔ channels ↔ shared state." />
      </Section>

      <Section id="s7" title="7. Async Essentials">
        <p>Futures are lazy — <code>.await</code> or spawn. Tokio for the runtime.</p>
      </Section>

      <Section id="s8" title="8. Cargo Commands">
        <Code lang="bash">{`cargo new / build / run / test / bench / doc / clippy / fmt / add / update`}</Code>
      </Section>

      <Section id="s9" title="9. Interview Reminders">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain the borrow checker in 60 s.</li>
          <li>Compare Rc vs Arc, Mutex vs RwLock.</li>
          <li>Show a lifetime annotation with reason.</li>
          <li>Panic vs Result: recoverable vs invariant violation.</li>
        </ul>
        <Callout tone="info" title="Interviewer favourite">"When would you reach for unsafe?"</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Six pages, one framework: ownership, borrowing, traits, error, concurrency, async.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Enough for interviews?">Combine with the Interview Questions handbook and Practice workbook.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Send/Sync</strong> — marker traits for cross-thread safety.</li>
          <li><strong>Vtable</strong> — dispatch table for dynamic trait calls.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Revision aid — not a substitute for hands-on practice.</p>
      </Section>
    </ReaderShell>
  );
}
