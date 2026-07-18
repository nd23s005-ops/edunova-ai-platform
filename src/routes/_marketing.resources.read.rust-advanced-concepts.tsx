import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-advanced-concepts",
  title: "Rust — Advanced Concepts",
  category: "Programming",
  difficulty: "Advanced",
  readingTime: "31 min",
  pages: 33,
  lastUpdated: "June 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle: "Deep dive into Rust internals — ownership under the hood, unsafe, smart pointers, macros, async runtime, Pin, Send/Sync, memory layout, FFI, embedded, and production engineering.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Ownership Internals" },
  { id: "s2", label: "2. Borrow Checker & MIR" },
  { id: "s3", label: "3. Unsafe Rust" },
  { id: "s4", label: "4. Smart Pointers Deep Dive" },
  { id: "s5", label: "5. Macros & Proc Macros" },
  { id: "s6", label: "6. Async Runtime Internals" },
  { id: "s7", label: "7. Pin, Send, Sync" },
  { id: "s8", label: "8. Memory Layout & Repr" },
  { id: "s9", label: "9. Compiler Optimizations" },
  { id: "s10", label: "10. FFI & Embedded" },
  { id: "s11", label: "11. Distributed Systems in Rust" },
  { id: "s12", label: "12. Profiling & Production" },
  { id: "diagrams", label: "Architecture Diagrams" },
  { id: "best", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Reference Guide", tag: "Programming", time: "41 min" },
  { title: "Rust — Best Practices", tag: "Programming", time: "16 min" },
  { title: "Rust — Real-world Case Study", tag: "Programming", time: "19 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-advanced-concepts")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-advanced-concepts" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand what happens under the compiler.</li>
          <li>Use unsafe correctly and rarely.</li>
          <li>Write high-performance, production-grade Rust.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Ownership Internals">
        <p>Ownership is enforced statically — every value has exactly one owner; when it goes out of scope, <code>Drop</code> runs deterministically. There is no runtime GC and no reference counting unless you opt in.</p>
        <Figure src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80" caption="Figure 1 — Ownership tree: each value tracked to its unique owner." />
      </Section>

      <Section id="s2" title="2. Borrow Checker & MIR">
        <p>The borrow checker operates on Mid-level IR (MIR) and Non-Lexical Lifetimes (NLL). Borrows end at last use, not scope end.</p>
      </Section>

      <Section id="s3" title="3. Unsafe Rust">
        <p><code>unsafe</code> unlocks raw pointers, FFI, and unions — you still get borrow checking on safe code paths. Encapsulate unsafe in tiny, audited functions.</p>
        <Code lang="rust">{`unsafe fn get_first(ptr: *const i32) -> i32 { *ptr }`}</Code>
      </Section>

      <Section id="s4" title="4. Smart Pointers Deep Dive">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Type</th><th className="p-2 text-left">Ownership</th><th className="p-2 text-left">Thread-safe</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Box&lt;T&gt;</td><td className="p-2">Unique</td><td className="p-2">If T: Send</td></tr>
            <tr className="border-b"><td className="p-2">Rc&lt;T&gt;</td><td className="p-2">Shared</td><td className="p-2">No</td></tr>
            <tr><td className="p-2">Arc&lt;T&gt;</td><td className="p-2">Shared</td><td className="p-2">Yes</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s5" title="5. Macros & Proc Macros">
        <p>Declarative <code>macro_rules!</code> for pattern-based expansion; procedural macros (<code>#[derive]</code>, attribute, function-like) manipulate token streams via <code>syn</code> + <code>quote</code>.</p>
      </Section>

      <Section id="s6" title="6. Async Runtime Internals">
        <p>Rust futures are state machines polled by an executor. Tokio schedules them onto worker threads, using cooperative task-yielding via <code>.await</code>.</p>
      </Section>

      <Section id="s7" title="7. Pin, Send, Sync">
        <p><code>Pin&lt;P&gt;</code> guarantees a value won't move, needed for self-referential futures. <code>Send</code> means "safe to transfer across threads"; <code>Sync</code> means "&amp;T is Send".</p>
      </Section>

      <Section id="s8" title="8. Memory Layout & Repr">
        <p>Default layout is unspecified — use <code>#[repr(C)]</code> for FFI, <code>#[repr(transparent)]</code> for zero-cost wrappers.</p>
      </Section>

      <Section id="s9" title="9. Compiler Optimizations">
        <p>LLVM backend with LTO, inlining, and monomorphization drive Rust's performance. <code>#[inline]</code> is a hint; <code>#[cold]</code> marks error paths.</p>
      </Section>

      <Section id="s10" title="10. FFI & Embedded">
        <p><code>extern "C"</code> for cross-language calls; <code>no_std</code> for microcontrollers. <code>bindgen</code> generates bindings from C headers.</p>
      </Section>

      <Section id="s11" title="11. Distributed Systems in Rust">
        <p>Tonic (gRPC), Axum, and Kafka clients power services at Meta, AWS, and Cloudflare. Prefer message-driven designs and idempotent handlers.</p>
      </Section>

      <Section id="s12" title="12. Profiling & Production">
        <p><code>perf</code> + <code>flamegraph</code> for CPU; <code>heaptrack</code> + <code>dhat</code> for memory; <code>tokio-console</code> for async task health.</p>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Layered profiling: OS → runtime → application." />
      </Section>

      <Section id="diagrams" title="Architecture Diagrams">
        <Code lang="text">{`Source → Parser → HIR → MIR → Borrow Check → LLVM IR → Object → Binary`}</Code>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Minimize unsafe surface; audit every block.</li>
          <li>Prefer typed APIs over stringly-typed configs.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Assuming <code>#[inline]</code> forces inlining.</li>
          <li>Confusing <code>Pin</code> with immutability.</li>
        </ul>
        <Callout tone="warning" title="Reminder">Undefined behavior in unsafe compromises the whole program.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Advanced Rust rewards curiosity — the compiler is a lifelong teacher.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Should I write my own executor?">Rarely — start with Tokio; roll your own only for exotic constraints.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Advanced APIs evolve; verify against current Rust edition.</p>
      </Section>
    </ReaderShell>
  );
}
