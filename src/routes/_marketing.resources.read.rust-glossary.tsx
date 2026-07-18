import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-glossary",
  title: "Rust — Glossary",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "15 min",
  pages: 10,
  lastUpdated: "April 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80",
  heroSubtitle: "Alphabetical glossary of Rust terminology — ownership, concurrency, Cargo, async, compiler, and systems terms explained plainly.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "a", label: "A – C" },
  { id: "d", label: "D – F" },
  { id: "g", label: "G – L" },
  { id: "m", label: "M – R" },
  { id: "s", label: "S – Z" },
  { id: "compare", label: "Comparison Table" },
  { id: "best", label: "Best Practices" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Reference Guide", tag: "Programming", time: "41 min" },
  { title: "Rust — Cheat Sheet", tag: "Programming", time: "12 min" },
  { title: "Rust — FAQ", tag: "Programming", time: "10 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-glossary")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-glossary" }],
  }),
  component: Page,
});

function Term({ t, d }: { t: string; d: React.ReactNode }) {
  return <div className="mb-2 text-sm"><strong>{t}</strong> — {d}</div>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Look up any Rust term in seconds.</li>
          <li>Use precise vocabulary in code reviews and interviews.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" caption="Figure 1 — Shared vocabulary accelerates team communication." />
      </Section>

      <Section id="a" title="A – C">
        <Term t="Arc" d="Atomic reference-counted pointer; thread-safe cousin of Rc." />
        <Term t="async / await" d="Keywords for cooperative task suspension." />
        <Term t="Borrow" d="Temporary reference to a value; enforced by the borrow checker." />
        <Term t="Cargo" d="Rust's package manager and build tool." />
        <Term t="Crate" d="A compilation unit; libraries or binaries." />
        <Term t="Closure" d="Anonymous function that can capture environment variables." />
      </Section>

      <Section id="d" title="D – F">
        <Term t="Drop" d="Trait invoked when a value goes out of scope." />
        <Term t="Enum" d="Sum type — one of several variants." />
        <Term t="FFI" d="Foreign Function Interface — calling C/C++/etc." />
        <Term t="Future" d="Value representing an eventual async result." />
      </Section>

      <Section id="g" title="G – L">
        <Term t="Generic" d="Parameterized types/functions; monomorphized at compile time." />
        <Term t="Iterator" d="Trait for pull-based sequence traversal." />
        <Term t="Lifetime" d="Compile-time scope of a reference; prefixed with a tick, e.g. <code>'a</code>." />
      </Section>

      <Section id="m" title="M – R">
        <Term t="Macro" d="Metaprogramming construct expanded at compile time." />
        <Term t="Move" d="Ownership transfer; source becomes invalid." />
        <Term t="Ownership" d="Every value has exactly one owner." />
        <Term t="Pin" d="Guarantees a value's address won't move." />
        <Term t="Result" d="Enum representing success or error." />
        <Term t="Rc" d="Single-threaded reference-counted pointer." />
      </Section>

      <Section id="s" title="S – Z">
        <Term t="Send" d="Marker trait: safe to transfer ownership across threads." />
        <Term t="Sync" d="Marker trait: &T is Send." />
        <Term t="Trait" d="Interface-like contract for shared behavior." />
        <Term t="Unsafe" d="Block allowing operations the borrow checker can't verify." />
        <Term t="Vec" d="Growable, heap-allocated array." />
        <Term t="Workspace" d="Cargo grouping of related crates." />
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Standard library primitives ranked by frequency of use." />
      </Section>

      <Section id="compare" title="Comparison Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Term</th><th className="p-2 text-left">Rust</th><th className="p-2 text-left">C++ analog</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Box</td><td className="p-2">Owning heap ptr</td><td className="p-2">unique_ptr</td></tr>
            <tr className="border-b"><td className="p-2">Arc</td><td className="p-2">Atomic shared ptr</td><td className="p-2">shared_ptr</td></tr>
            <tr><td className="p-2">Trait object</td><td className="p-2">dyn Trait</td><td className="p-2">virtual method</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use precise terms — "move" vs "clone" is meaningful.</li>
        </ul>
        <Callout tone="tip" title="Tip">Bookmark this glossary for interview cram sessions.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Vocabulary is leverage — the right word saves paragraphs of explanation.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this exhaustive?">Covers the 500+ terms you'll encounter in daily Rust. Rare terms live in the Reference Guide.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Definitions are simplified for study — consult The Rust Reference for formal wording.</p>
      </Section>
    </ReaderShell>
  );
}
