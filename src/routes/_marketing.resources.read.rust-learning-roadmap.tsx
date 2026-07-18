import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-learning-roadmap",
  title: "Rust — Learning Roadmap",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "9 min",
  pages: 12,
  lastUpdated: "September 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  heroSubtitle: "A structured 8-week path from Rust newcomer to production-ready engineer — with milestones, projects, books, and interview prep.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "w1", label: "Week 1 — Basics" },
  { id: "w2", label: "Week 2 — Ownership" },
  { id: "w3", label: "Week 3 — Structs, Enums, Traits" },
  { id: "w4", label: "Week 4 — Collections & Errors" },
  { id: "w5", label: "Week 5 — Concurrency" },
  { id: "w6", label: "Week 6 — Async + Networking" },
  { id: "w7", label: "Week 7 — Real Project" },
  { id: "w8", label: "Week 8 — Ship & Interview" },
  { id: "books", label: "Books & Courses" },
  { id: "portfolio", label: "Portfolio Projects" },
  { id: "best", label: "Best Practices" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Tips & Tricks", tag: "Programming", time: "8 min" },
  { title: "Rust — FAQ", tag: "Programming", time: "10 min" },
  { title: "Rust — Beginner Guide", tag: "Programming", time: "24 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-learning-roadmap" }],
  }),
  component: Page,
});

function Week({ n, title, items }: { n: number; title: string; items: string[] }) {
  return (
    <div className="mb-4">
      <p className="font-semibold">Week {n} — {title}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Move from install to production Rust in 8 focused weeks.</li>
          <li>Build a portfolio + interview-ready resume.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1400&q=80" caption="Figure 1 — Small daily wins compound into fluency." />
      </Section>

      <Section id="w1" title="Week 1 — Basics">
        <Week n={1} title="Setup + Hello Rust" items={["Install rustup + rust-analyzer", "Run cargo new / build / test", "Variables, functions, control flow"]} />
      </Section>

      <Section id="w2" title="Week 2 — Ownership">
        <Week n={2} title="Ownership & Borrowing" items={["Move vs copy semantics", "&T, &mut T rules", "Slices and strings"]} />
      </Section>

      <Section id="w3" title="Week 3 — Structs, Enums, Traits">
        <Week n={3} title="Type system" items={["Enums + pattern matching", "Traits + impl blocks", "Generics basics"]} />
      </Section>

      <Section id="w4" title="Week 4 — Collections & Errors">
        <Week n={4} title="Std library workhorses" items={["Vec, HashMap, iterators", "Result / Option / ?", "anyhow + thiserror"]} />
      </Section>

      <Section id="w5" title="Week 5 — Concurrency">
        <Week n={5} title="Threads & sync" items={["Arc, Mutex, channels", "rayon parallel iterators", "Data-race-free design"]} />
      </Section>

      <Section id="w6" title="Week 6 — Async + Networking">
        <Week n={6} title="Tokio + reqwest + axum" items={["async/await mental model", "HTTP client + server", "Serde JSON"]} />
      </Section>

      <Section id="w7" title="Week 7 — Real Project">
        <p>Ship a small CLI, HTTP service, or WASM module. Add tests, docs, and a README.</p>
        <Code lang="text">{`Suggestions:
- URL-shortener (axum + sqlite)
- Markdown-to-HTML CLI
- Live metrics scraper`}</Code>
      </Section>

      <Section id="w8" title="Week 8 — Ship & Interview">
        <ul className="list-disc space-y-1 pl-5">
          <li>Publish crate on crates.io.</li>
          <li>Write a blog post about lessons learned.</li>
          <li>Practice 20 interview questions.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 2 — Ship publicly — the deadline sharpens focus." />
      </Section>

      <Section id="books" title="Books & Courses">
        <ul className="list-disc space-y-1 pl-5">
          <li><em>The Rust Programming Language</em> (Klabnik & Nichols).</li>
          <li><em>Rust for Rustaceans</em> (Gjengset).</li>
          <li><em>Zero to Production in Rust</em> (Pascutto).</li>
        </ul>
      </Section>

      <Section id="portfolio" title="Portfolio Projects">
        <ul className="list-disc space-y-1 pl-5">
          <li>URL shortener (backend + tests + CI).</li>
          <li>gRPC microservice with observability.</li>
          <li>WebAssembly demo (Rust → WASM).</li>
        </ul>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ship weekly, however small.</li>
          <li>Write publicly — teaching cements learning.</li>
        </ul>
        <Callout tone="tip" title="Tip">Skip tutorials after Week 3 — build instead.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Two months of deliberate practice moves most engineers from "curious" to "hire-ready."</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Full-time?">1 hour/day is enough — consistency beats binges.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Adjust pacing to your background; this is a template not a mandate.</p>
      </Section>
    </ReaderShell>
  );
}
