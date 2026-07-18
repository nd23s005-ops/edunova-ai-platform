import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-pdf-notes",
  title: "Go — PDF Notes",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "52 min",
  pages: 106,
  lastUpdated: "October 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "Chapter-wise Go notes formatted for offline study — syntax, diagrams, interview call-outs, and revision summaries across the whole language.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Introduction" },
  { id: "c2", label: "2. Variables" },
  { id: "c3", label: "3. Functions" },
  { id: "c4", label: "4. Structs" },
  { id: "c5", label: "5. Interfaces" },
  { id: "c6", label: "6. Packages" },
  { id: "c7", label: "7. Goroutines" },
  { id: "c8", label: "8. Channels" },
  { id: "c9", label: "9. HTTP" },
  { id: "c10", label: "10. Databases" },
  { id: "c11", label: "11. Testing" },
  { id: "c12", label: "12. Deployment" },
  { id: "review", label: "PDF Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Quick Revision Notes", tag: "Programming", time: "6 min" },
  { title: "Go — Cheat Sheet", tag: "Programming", time: "5 min" },
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-pdf-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Own a comprehensive Go reference formatted for print.</li>
          <li>Study each topic with syntax, examples, and interview call-outs.</li>
          <li>Use comparison tables to solidify decisions (slice vs array, channel vs mutex).</li>
          <li>Follow chapter summaries for rapid revision.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Introduction">
        <p><strong>What is Go?</strong> A statically typed, compiled language designed by Google for large-scale backend software. Its trademarks are simplicity, fast compilation, and built-in concurrency.</p>
        <p><strong>Why it matters:</strong> powers Docker, Kubernetes, Terraform, and huge parts of modern cloud infrastructure.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go's role in modern cloud infrastructure: containers, orchestration, and networked services." />
        <p className="mt-2"><strong>Chapter summary:</strong> Go trades feature count for readability; the standard library is the framework.</p>
      </Section>

      <Section id="c2" title="2. Variables">
        <Code lang="go">{`var name string = "Ada"
age := 30
const Pi = 3.14`}</Code>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Form</th><th className="p-2 text-left">Use</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2"><code>var</code></td><td className="p-2">Explicit type or zero value</td></tr>
            <tr className="border-b"><td className="p-2"><code>:=</code></td><td className="p-2">Inside functions; type inferred</td></tr>
            <tr><td className="p-2"><code>const</code></td><td className="p-2">Compile-time constants</td></tr>
          </tbody>
        </table>
        <p><strong>Interview note:</strong> unused variables are compile errors — a core language design decision.</p>
      </Section>

      <Section id="c3" title="3. Functions">
        <Code lang="go">{`func swap(a, b int) (int, int) { return b, a }
func divide(a, b float64) (float64, error) { /* ... */ }`}</Code>
        <p>Named returns, variadic parameters, first-class functions, and closures are all supported.</p>
      </Section>

      <Section id="c4" title="4. Structs">
        <Code lang="go">{`type User struct {
  ID   int
  Name string
}`}</Code>
        <p><strong>Best practice:</strong> keep struct fields sorted by size to minimise padding.</p>
      </Section>

      <Section id="c5" title="5. Interfaces">
        <p>Small interfaces beat large ones. The standard library uses <code>io.Reader</code>, <code>io.Writer</code>, <code>fmt.Stringer</code> — one or two methods each.</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Language</th><th className="p-2 text-left">Interface style</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Java</td><td className="p-2">Explicit <code>implements</code></td></tr>
            <tr><td className="p-2">Go</td><td className="p-2">Implicit satisfaction</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c6" title="6. Packages">
        <p>Package layout: <code>cmd/</code> for main packages, <code>internal/</code> for private code, <code>pkg/</code> for reusable libraries.</p>
      </Section>

      <Section id="c7" title="7. Goroutines">
        <p>Cheap to create (a few KB stack, growing dynamically). Multiplexed onto OS threads by the runtime scheduler.</p>
        <Callout tone="warning" title="Leaking goroutines">Every launched goroutine must have a defined exit path — otherwise you leak memory.</Callout>
      </Section>

      <Section id="c8" title="8. Channels">
        <Code lang="go">{`ch := make(chan int, 4)
ch <- 1
v, ok := <-ch // ok is false when closed and empty
close(ch)`}</Code>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Kind</th><th className="p-2 text-left">Behaviour</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Unbuffered</td><td className="p-2">Send blocks until receive</td></tr>
            <tr><td className="p-2">Buffered</td><td className="p-2">Send blocks only when full</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c9" title="9. HTTP">
        <p><code>net/http</code> is production-grade. Prefer explicit servers over the default mux in real services.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Typical Go service architecture: handler → service → repository → database, wrapped in middleware." />
      </Section>

      <Section id="c10" title="10. Databases">
        <p>Use <code>database/sql</code> with a driver (<code>pgx</code>, <code>mysql</code>). Always pass <code>context.Context</code>.</p>
      </Section>

      <Section id="c11" title="11. Testing">
        <p>Table-driven tests are the community standard. Run with <code>-race</code> and <code>-cover</code>.</p>
      </Section>

      <Section id="c12" title="12. Deployment">
        <p>Build a static binary, ship it in a <em>distroless</em> or <em>scratch</em> container, expose health endpoints, and emit structured logs.</p>
      </Section>

      <Section id="review" title="PDF Review">
        <h3 className="font-semibold">Revision Notes</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Goroutines + channels &gt; threads + locks for most Go workloads.</li>
          <li>Errors are values — wrap with <code>%w</code>.</li>
          <li>Interfaces are satisfied implicitly.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Self Assessment</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Write a table test for a pure function.</li>
          <li>Explain the memory model in 3 sentences.</li>
          <li>Sketch a producer/consumer pipeline with channels.</li>
        </ol>
        <h3 className="mt-3 font-semibold">Important Topics</h3>
        <p>Concurrency, error handling, interfaces, and context propagation — the most common interview and code-review themes.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I use this offline?">Yes — use the Download PDF / Print button in the toolbar.</FAQItem>
        <FAQItem q="Is Go a functional language?">No, but it supports first-class functions and closures.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Zero value</strong> — the default for every type (<code>0</code>, <code>""</code>, <code>nil</code>).</li>
          <li><strong>Composition</strong> — building types by embedding rather than inheriting.</li>
          <li><strong>Vendoring</strong> — copying dependencies into your repo for reproducible builds.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Study notes for educational use. Always consult go.dev and official library docs for
          authoritative information. Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
