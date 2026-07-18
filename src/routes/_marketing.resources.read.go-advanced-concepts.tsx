import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-advanced-concepts",
  title: "Go — Advanced Concepts",
  category: "Programming",
  difficulty: "Advanced",
  readingTime: "25 min",
  pages: 60,
  lastUpdated: "May 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "Go runtime, scheduler, memory model, GC, generics, reflection, advanced concurrency, distributed systems, and production performance engineering.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Go Runtime" },
  { id: "s2", label: "2. GMP Scheduler" },
  { id: "s3", label: "3. Memory Model" },
  { id: "s4", label: "4. Garbage Collection" },
  { id: "s5", label: "5. Escape Analysis" },
  { id: "s6", label: "6. Generics" },
  { id: "s7", label: "7. Reflection" },
  { id: "s8", label: "8. unsafe Package" },
  { id: "s9", label: "9. Advanced Concurrency" },
  { id: "s10", label: "10. Distributed Systems" },
  { id: "s11", label: "11. Performance Tuning" },
  { id: "s12", label: "12. Profiling" },
  { id: "s13", label: "13. Enterprise Patterns" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Best Practices", tag: "Programming", time: "17 min" },
  { title: "Go — Reference Guide", tag: "Programming", time: "37 min" },
  { title: "Go — Real-world Case Study", tag: "Programming", time: "23 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-advanced-concepts")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-advanced-concepts" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand what happens beneath the source code.</li>
          <li>Reason about performance from first principles.</li>
          <li>Apply advanced patterns confidently in production.</li>
        </ul>
        <Callout tone="warning" title="Prerequisite">Comfortable with everyday Go and concurrency basics before diving in.</Callout>
      </Section>

      <Section id="s1" title="1. Go Runtime">
        <p>The runtime handles goroutine scheduling, GC, memory allocation, and syscall interception. Written mostly in Go, with a small assembly core.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go runtime architecture: scheduler, memory allocator, GC, netpoller, and syscall layer." />
      </Section>

      <Section id="s2" title="2. GMP Scheduler">
        <p><strong>G</strong> = goroutine, <strong>M</strong> = OS thread, <strong>P</strong> = processor (logical). Runnable Gs live in per-P local queues + a global queue. Work-stealing balances load. Preemption is asynchronous (Go 1.14+).</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Symbol</th><th className="p-2 text-left">Role</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">G</td><td className="p-2">Goroutine state</td></tr>
            <tr className="border-b"><td className="p-2">M</td><td className="p-2">OS thread</td></tr>
            <tr><td className="p-2">P</td><td className="p-2">Scheduler context, capped by <code>GOMAXPROCS</code></td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s3" title="3. Memory Model">
        <p>Defines happens-before ordering. Synchronization primitives (mutex, channel, sync/atomic) establish edges. Without them, reads may see stale values indefinitely.</p>
      </Section>

      <Section id="s4" title="4. Garbage Collection">
        <p>Concurrent, tri-color mark-sweep with write barriers. Sub-millisecond STW pauses. Tune with <code>GOGC</code> (default 100 = double heap before next cycle) and <code>GOMEMLIMIT</code>.</p>
      </Section>

      <Section id="s5" title="5. Escape Analysis">
        <p>Compiler decides at compile time whether a value stays on the stack or escapes to the heap. Inspect with <code>go build -gcflags="-m"</code>.</p>
        <Code lang="go">{`func newUser() *User {
    u := User{ID: 1} // escapes: address returned
    return &u
}`}</Code>
      </Section>

      <Section id="s6" title="6. Generics">
        <p>Type parameters (Go 1.18+) via GC-shape stenciling — one implementation per underlying representation. Great for containers, iterators, functional helpers.</p>
        <Code lang="go">{`func Map[T, U any](xs []T, f func(T) U) []U {
    ys := make([]U, len(xs))
    for i, x := range xs { ys[i] = f(x) }
    return ys
}`}</Code>
      </Section>

      <Section id="s7" title="7. Reflection">
        <p><code>reflect</code> enables runtime type inspection. Powerful but slow — avoid on hot paths. Used by <code>encoding/json</code>, DI containers, ORMs.</p>
      </Section>

      <Section id="s8" title="8. unsafe Package">
        <p>Escapes the type system for zero-copy conversions and struct-field pointer arithmetic. Rarely needed; when needed, isolate behind a well-tested facade.</p>
      </Section>

      <Section id="s9" title="9. Advanced Concurrency Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li>Fan-out / fan-in with <code>errgroup</code>.</li>
          <li>Pipelines with cancellable stages.</li>
          <li>Rate limiting via <code>golang.org/x/time/rate</code>.</li>
          <li>Semaphore via buffered channel.</li>
          <li>Actor model with a single goroutine + mailbox.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Goroutine lifecycle: created → runnable → running → waiting → dead." />
      </Section>

      <Section id="s10" title="10. Distributed Systems">
        <p>gRPC for internal RPC, protobuf schemas, service mesh (Istio/Linkerd) for mTLS + traffic shaping. Consensus via Raft (<code>hashicorp/raft</code>).</p>
      </Section>

      <Section id="s11" title="11. Performance Tuning">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Profile first (<code>pprof</code>, <code>trace</code>).</li>
          <li>Reduce allocations on hot paths.</li>
          <li>Batch I/O.</li>
          <li>Tune <code>GOGC</code>, <code>GOMEMLIMIT</code>, <code>GOMAXPROCS</code>.</li>
          <li>Consider <code>runtime.LockOSThread</code> for latency-sensitive work.</li>
        </ol>
      </Section>

      <Section id="s12" title="12. Profiling">
        <p>CPU, heap, block, mutex, goroutine, trace. <code>go tool pprof -http=:8080 profile.pb.gz</code> for flame graphs.</p>
      </Section>

      <Section id="s13" title="13. Enterprise Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li>Hexagonal / clean architecture.</li>
          <li>CQRS + event sourcing for audit-heavy domains.</li>
          <li>Saga pattern for distributed transactions.</li>
          <li>Bulkhead / circuit breaker for isolation.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Depth in Go means understanding the runtime. The best Go engineers reason about goroutines, memory, and GC the same way great C engineers reason about cache lines.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is unsafe portable?">Yes, but you own alignment/size assumptions across architectures.</FAQItem>
        <FAQItem q="Does GC ever stop the world?">Yes — briefly, at the start and end of a cycle. Typically sub-millisecond.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>STW</strong> — Stop-The-World pause.</li>
          <li><strong>Write barrier</strong> — GC hook on pointer writes during marking.</li>
          <li><strong>Work stealing</strong> — idle P pulls Gs from a busy P's queue.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Runtime internals evolve — verify against your Go version.</p>
      </Section>
    </ReaderShell>
  );
}
