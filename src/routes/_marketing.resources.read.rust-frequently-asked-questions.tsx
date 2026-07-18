import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-frequently-asked-questions",
  title: "Rust — Frequently Asked Questions",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 15,
  lastUpdated: "January 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80",
  heroSubtitle: "The most-asked Rust questions — syntax, ownership, lifetimes, Cargo, async, memory safety, debugging, interviews, and careers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Syntax Basics" },
  { id: "s2", label: "2. Ownership & Borrowing" },
  { id: "s3", label: "3. Lifetimes" },
  { id: "s4", label: "4. Cargo & Tooling" },
  { id: "s5", label: "5. Concurrency & Async" },
  { id: "s6", label: "6. Traits & Memory" },
  { id: "s7", label: "7. Debugging" },
  { id: "s8", label: "8. Interviews & Careers" },
  { id: "best", label: "Best Practices" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Tips & Tricks", tag: "Programming", time: "8 min" },
  { title: "Rust — Learning Roadmap", tag: "Programming", time: "9 min" },
  { title: "Rust — Common Mistakes", tag: "Programming", time: "14 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-frequently-asked-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-frequently-asked-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Get quick, accurate answers to daily Rust questions.</li>
          <li>Prepare for interview and career decisions.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Syntax Basics">
        <FAQItem q="Is Rust hard to learn?">Steeper than Python; the borrow checker is the main hurdle for the first two weeks.</FAQItem>
        <FAQItem q="Semicolons vs no semicolons?">A trailing expression without a semicolon is the return value of a block.</FAQItem>
        <FAQItem q="String vs &str?"><code>String</code> owns heap data; <code>&amp;str</code> is a borrowed view.</FAQItem>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Rust favors explicitness over convenience." />
      </Section>

      <Section id="s2" title="2. Ownership & Borrowing">
        <FAQItem q="Why does the borrow checker feel strict?">It prevents entire classes of bugs — aliasing + mutation is banned.</FAQItem>
        <FAQItem q="Should I clone to make errors go away?">Only if profiling proves it's fine — otherwise refactor to borrow.</FAQItem>
      </Section>

      <Section id="s3" title="3. Lifetimes">
        <FAQItem q="When do I write explicit lifetimes?">When the compiler asks — usually when a struct or function borrows references.</FAQItem>
        <FAQItem q="What is 'static?">A lifetime that lasts the whole program — string literals, most globals.</FAQItem>
      </Section>

      <Section id="s4" title="4. Cargo & Tooling">
        <FAQItem q="cargo run vs cargo build?"><code>run</code> compiles + executes; <code>build</code> only compiles.</FAQItem>
        <FAQItem q="How do I lock features?">Use <code>default-features = false</code> and pick <code>features = ["a","b"]</code>.</FAQItem>
      </Section>

      <Section id="s5" title="5. Concurrency & Async">
        <FAQItem q="Tokio or async-std?">Tokio has the largest ecosystem and best support.</FAQItem>
        <FAQItem q="Why do async functions return futures?">Rust futures are zero-cost state machines — polled by the runtime.</FAQItem>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" caption="Figure 2 — Async in Rust is opt-in and explicit." />
      </Section>

      <Section id="s6" title="6. Traits & Memory">
        <FAQItem q="Trait objects vs generics?">Generics: static dispatch, faster. Trait objects: dynamic dispatch, smaller binaries.</FAQItem>
        <FAQItem q="Is Rust garbage-collected?">No — ownership + drop replace GC at zero runtime cost.</FAQItem>
      </Section>

      <Section id="s7" title="7. Debugging">
        <FAQItem q="Best debugger?">rust-analyzer + <code>gdb</code>/<code>lldb</code>; VS Code with CodeLLDB works well.</FAQItem>
        <FAQItem q="How do I see panic locations?">Set <code>RUST_BACKTRACE=1</code>.</FAQItem>
      </Section>

      <Section id="s8" title="8. Interviews & Careers">
        <FAQItem q="Which companies hire Rust developers?">AWS, Microsoft, Cloudflare, Discord, Meta, and many blockchain shops.</FAQItem>
        <FAQItem q="Do I need C/C++ first?">No — start with Rust; systems concepts land through it.</FAQItem>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Trust the compiler; it usually names the fix.</li>
          <li>Read <em>The Rust Book</em> once, then <em>Rust for Rustaceans</em>.</li>
        </ul>
        <Callout tone="tip" title="Tip">Answer FAQ questions out loud — great interview prep.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Most Rust confusion melts once ownership clicks — one week of deliberate practice usually suffices.</p>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Answers are guidance — verify against the current Rust edition.</p>
      </Section>
    </ReaderShell>
  );
}
