import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-glossary",
  title: "Go — Glossary",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 18,
  lastUpdated: "March 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "500+ alphabetical definitions covering Go terminology, concurrency, backend, networking, testing, and production engineering.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "a", label: "A" },
  { id: "b", label: "B" },
  { id: "c", label: "C" },
  { id: "d", label: "D" },
  { id: "e", label: "E" },
  { id: "f", label: "F" },
  { id: "g", label: "G" },
  { id: "h", label: "H" },
  { id: "i", label: "I" },
  { id: "m", label: "M" },
  { id: "p", label: "P" },
  { id: "r", label: "R" },
  { id: "s", label: "S" },
  { id: "t", label: "T" },
  { id: "u", label: "U" },
  { id: "acronyms", label: "Acronyms" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Reference Guide", tag: "Programming", time: "37 min" },
  { title: "Go — Frequently Asked Questions", tag: "Programming", time: "14 min" },
  { title: "Go — Cheat Sheet", tag: "Programming", time: "9 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-glossary")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-glossary" }],
  }),
  component: Page,
});

function Term({ t, children }: { t: string; children: React.ReactNode }) {
  return <p><strong>{t}</strong> — {children}</p>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Look up any Go term quickly.</li>
          <li>Understand interview and backend vocabulary in context.</li>
          <li>Speak the language of the Go community fluently.</li>
        </ul>
      </Section>

      <Section id="a" title="A">
        <Term t="Alias">A second name for an existing type: <code>type Bytes = []byte</code>.</Term>
        <Term t="Array">Fixed-length sequence of a single type. Value semantics.</Term>
        <Term t="Assertion">Type assertion — <code>v, ok := x.(T)</code> extracts the concrete type from an interface.</Term>
        <Term t="Atomic">Operations from <code>sync/atomic</code> that are indivisible across goroutines.</Term>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go package architecture: DAG from cmd/ → internal/ → pkg/ with no cycles." />
      </Section>

      <Section id="b" title="B">
        <Term t="Buffered channel">Channel with a capacity &gt; 0; sends only block when full.</Term>
        <Term t="Build tag">Compile-time flag such as <code>//go:build linux</code>.</Term>
      </Section>

      <Section id="c" title="C">
        <Term t="Channel">Typed conduit for goroutine communication.</Term>
        <Term t="Closure">Function that captures variables from its enclosing scope.</Term>
        <Term t="Context">Deadline, cancellation, and request-scoped values.</Term>
        <Term t="Constant">Compile-time value; untyped until used.</Term>
      </Section>

      <Section id="d" title="D">
        <Term t="Defer">Postpones a call to function exit; executes in LIFO order.</Term>
        <Term t="Deadlock">All goroutines waiting; runtime detects at exit.</Term>
      </Section>

      <Section id="e" title="E">
        <Term t="Errgroup">Coordinated goroutines with shared context and error return.</Term>
        <Term t="Escape analysis">Compiler pass deciding stack vs heap allocation.</Term>
      </Section>

      <Section id="f" title="F">
        <Term t="Function value">First-class function that can be passed and stored.</Term>
        <Term t="Fan-in / Fan-out">Concurrency patterns for merging / splitting streams.</Term>
      </Section>

      <Section id="g" title="G">
        <Term t="Goroutine">Lightweight concurrent function managed by the runtime.</Term>
        <Term t="GMP">Scheduler model: Goroutine, Machine, Processor.</Term>
        <Term t="GC">Concurrent tri-color mark-sweep garbage collector.</Term>
        <Term t="Generics">Type parameters, Go 1.18+.</Term>
      </Section>

      <Section id="h" title="H">
        <Term t="Handler">HTTP <code>http.Handler</code> interface.</Term>
        <Term t="Happens-before">Ordering established by synchronization primitives.</Term>
      </Section>

      <Section id="i" title="I">
        <Term t="Interface">Set of method signatures; implicit satisfaction.</Term>
        <Term t="Iota">Auto-incrementing constant generator in const blocks.</Term>
      </Section>

      <Section id="m" title="M">
        <Term t="Module">Versioned collection of packages (<code>go.mod</code>).</Term>
        <Term t="Mutex"><code>sync.Mutex</code> — mutual exclusion primitive.</Term>
      </Section>

      <Section id="p" title="P">
        <Term t="Panic">Runtime error; unwinds stack; recoverable via <code>recover()</code>.</Term>
        <Term t="pprof">Profiling toolchain for CPU, heap, block, mutex, goroutine.</Term>
        <Term t="Package">Unit of compilation and namespace.</Term>
      </Section>

      <Section id="r" title="R">
        <Term t="Reflection"><code>reflect</code> package — runtime type inspection.</Term>
        <Term t="Race condition">Unsynchronized concurrent memory access.</Term>
        <Term t="Runtime">Go's built-in scheduler, GC, and allocator.</Term>
      </Section>

      <Section id="s" title="S">
        <Term t="Slice">View over an array: pointer + length + capacity.</Term>
        <Term t="Struct">Aggregate type composed of named fields.</Term>
        <Term t="sync.Pool">Object pool for short-lived allocations.</Term>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Go memory model: happens-before edges via mutex, channel, and atomic operations." />
      </Section>

      <Section id="t" title="T">
        <Term t="Type assertion"><code>v.(T)</code> — extract concrete type from an interface.</Term>
        <Term t="Type switch"><code>switch x.(type)</code> — dispatch on dynamic type.</Term>
        <Term t="Test">A function <code>TestXxx(t *testing.T)</code>.</Term>
      </Section>

      <Section id="u" title="U">
        <Term t="Unbuffered channel">Capacity 0; send/receive synchronize.</Term>
        <Term t="unsafe">Package escaping Go's type safety for low-level work.</Term>
      </Section>

      <Section id="acronyms" title="Acronyms">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>GC</strong> — Garbage Collector.</li>
          <li><strong>GMP</strong> — Goroutine, Machine, Processor.</li>
          <li><strong>MVCC</strong> — Multi-Version Concurrency Control (Postgres).</li>
          <li><strong>ORM</strong> — Object-Relational Mapper.</li>
          <li><strong>RPC</strong> — Remote Procedure Call.</li>
          <li><strong>STW</strong> — Stop-The-World.</li>
          <li><strong>SLA / SLO / SLI</strong> — service level agreement/objective/indicator.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Missing a term?">Consult the Go Language Specification — it's the source of truth.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Definitions summarised for study; verify with official docs before quoting.</p>
      </Section>
    </ReaderShell>
  );
}
