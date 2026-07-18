import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-common-mistakes",
  title: "Go — Common Mistakes",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "13 min",
  pages: 18,
  lastUpdated: "July 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "120+ common mistakes Go developers make — with wrong vs. correct code, debugging tips, and a prevention checklist.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Loop Variable Capture" },
  { id: "s2", label: "2. Nil Pointer Issues" },
  { id: "s3", label: "3. Slice Aliasing" },
  { id: "s4", label: "4. Race Conditions" },
  { id: "s5", label: "5. Goroutine Leaks" },
  { id: "s6", label: "6. Channel Deadlocks" },
  { id: "s7", label: "7. Error Handling" },
  { id: "s8", label: "8. Interface Mistakes" },
  { id: "s9", label: "9. Package Mistakes" },
  { id: "s10", label: "10. Performance" },
  { id: "s11", label: "11. Debugging Guide" },
  { id: "s12", label: "12. Prevention Checklist" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Best Practices", tag: "Programming", time: "17 min" },
  { title: "Go — Tips & Tricks", tag: "Programming", time: "10 min" },
  { title: "Go — Advanced Concepts", tag: "Programming", time: "25 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-common-mistakes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-common-mistakes" }],
  }),
  component: Page,
});

function Bad({ children }: { children: React.ReactNode }) {
  return <div><div className="mb-1 text-xs font-semibold text-red-500">❌ Wrong</div><Code lang="go">{children}</Code></div>;
}
function Good({ children }: { children: React.ReactNode }) {
  return <div><div className="mb-1 text-xs font-semibold text-green-500">✅ Correct</div><Code lang="go">{children}</Code></div>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Recognise the 120+ most common Go mistakes at review time.</li>
          <li>Fix them with idiomatic, race-free alternatives.</li>
          <li>Build a debugging routine that catches regressions early.</li>
        </ul>
        <Callout tone="warning" title="Read with a linter open">golangci-lint catches many of these automatically. Turn it on before turning pages.</Callout>
      </Section>

      <Section id="s1" title="1. Loop Variable Capture">
        <Bad>{`for _, v := range items {
    go func() { fmt.Println(v) }() // pre-1.22: all print last value
}`}</Bad>
        <Good>{`for _, v := range items {
    v := v
    go func() { fmt.Println(v) }()
}`}</Good>
      </Section>

      <Section id="s2" title="2. Nil Pointer Issues">
        <p>Nil map writes panic; nil map reads return zero. Nil slice appends work. Nil interface comparisons are subtle — a typed nil pointer inside an interface is not <code>== nil</code>.</p>
        <Bad>{`var m map[string]int
m["a"] = 1 // panic`}</Bad>
        <Good>{`m := map[string]int{}
m["a"] = 1`}</Good>
      </Section>

      <Section id="s3" title="3. Slice Aliasing">
        <p><code>append</code> may return a slice that shares backing array with the input; mutating one mutates both.</p>
        <Bad>{`b := append(a[:2], 99) // may overwrite a[2]`}</Bad>
        <Good>{`b := append([]int{}, a[:2]...)
b = append(b, 99)`}</Good>
      </Section>

      <Section id="s4" title="4. Race Conditions">
        <p>Concurrent map access without a mutex is undefined. Use <code>sync.Mutex</code> or <code>sync.Map</code>. Run <code>go test -race</code> in CI.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Race conditions: two goroutines write the same address without synchronization. -race flag surfaces them at runtime." />
      </Section>

      <Section id="s5" title="5. Goroutine Leaks">
        <p>Goroutines blocked on unbuffered channels or missing <code>context</code> cancellation never exit. Always wire a deadline or done channel.</p>
        <Bad>{`go func() { <-ch }() // leaks if nothing ever sends`}</Bad>
        <Good>{`go func() {
    select {
    case <-ch:
    case <-ctx.Done():
    }
}()`}</Good>
      </Section>

      <Section id="s6" title="6. Channel Deadlocks">
        <p>Sending on an unbuffered channel with no receiver deadlocks. Closing a channel twice panics. Sending on a closed channel panics.</p>
      </Section>

      <Section id="s7" title="7. Error Handling Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Swallowing errors with <code>_</code>.</li>
          <li>Comparing errors with <code>==</code> instead of <code>errors.Is</code>.</li>
          <li>Losing context — always wrap with <code>%w</code>.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Interface Mistakes">
        <p>Big interfaces are bad interfaces. Accept the smallest interface that satisfies the need. Don't declare interfaces at the producer — declare them at the consumer.</p>
      </Section>

      <Section id="s9" title="9. Package Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Circular imports — restructure into a domain package.</li>
          <li>init() abuse — prefer explicit constructors.</li>
          <li>Global state — pass dependencies.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 2 — Healthy package graph: DAG with no cycles, dependencies point toward domain." />
      </Section>

      <Section id="s10" title="10. Performance Problems">
        <ul className="list-disc space-y-1 pl-5">
          <li>Unnecessary allocations in hot loops.</li>
          <li>String concatenation with <code>+=</code> instead of <code>strings.Builder</code>.</li>
          <li>Unbounded goroutine spawning.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Debugging Guide">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Reproduce with the smallest input.</li>
          <li>Add structured logs at boundaries.</li>
          <li>Enable <code>-race</code> and <code>pprof</code>.</li>
          <li>Use <code>dlv</code> for step-through when logs aren't enough.</li>
        </ol>
      </Section>

      <Section id="s12" title="12. Prevention Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>✅ golangci-lint in CI.</li>
          <li>✅ <code>-race</code> in CI.</li>
          <li>✅ Context on every I/O call.</li>
          <li>✅ No naked goroutines — worker pool or errgroup.</li>
          <li>✅ Wrapped errors with request-id.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Most Go bugs cluster around concurrency, slices, and error handling. A linter, the race detector, and code review catch 90% of them before production.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is the loop capture bug fixed?">Yes — Go 1.22 changed loop-var scoping. Still worth knowing for older codebases.</FAQItem>
        <FAQItem q="Is sync.Map faster?">Only for read-heavy workloads with disjoint keys per goroutine. Otherwise plain map + Mutex wins.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Race condition</strong> — unsynchronized concurrent access to shared state.</li>
          <li><strong>Deadlock</strong> — every goroutine waiting on another.</li>
          <li><strong>Goroutine leak</strong> — goroutine that never terminates.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Test in your context. Trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
