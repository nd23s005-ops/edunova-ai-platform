import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-frequently-asked-questions",
  title: "Go — Frequently Asked Questions",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "14 min",
  pages: 12,
  lastUpdated: "July 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "200+ FAQs across Go syntax, concurrency, packages, modules, backend, APIs, performance, interviews, debugging, and career guidance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Beginner" },
  { id: "s2", label: "2. Syntax & Types" },
  { id: "s3", label: "3. Concurrency" },
  { id: "s4", label: "4. Packages & Modules" },
  { id: "s5", label: "5. Backend & APIs" },
  { id: "s6", label: "6. Performance" },
  { id: "s7", label: "7. Debugging" },
  { id: "s8", label: "8. Interview FAQs" },
  { id: "s9", label: "9. Career" },
  { id: "summary", label: "Summary" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Learning Roadmap", tag: "Programming", time: "7 min" },
  { title: "Go — Interview Questions", tag: "Programming", time: "26 min" },
  { title: "Go — Common Mistakes", tag: "Programming", time: "13 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-frequently-asked-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-frequently-asked-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Answer the questions Go beginners actually ask.</li>
          <li>Clear up common misconceptions.</li>
          <li>Point to next steps for each topic.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Beginner FAQs">
        <FAQItem q="What is Go?">A compiled, statically typed language from Google — designed for simplicity, concurrency, and fast builds.</FAQItem>
        <FAQItem q="Is Go hard to learn?">Easier than most — the spec fits in a weekend. Concurrency needs practice.</FAQItem>
        <FAQItem q="What's Go used for?">Backends, CLIs, cloud infrastructure (Docker, Kubernetes), networking tools.</FAQItem>
        <FAQItem q="Do I need OOP experience?">No. Go has no classes — structs + interfaces are enough.</FAQItem>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go project structure at a glance: cmd/, internal/, pkg/." />
      </Section>

      <Section id="s2" title="2. Syntax & Types">
        <FAQItem q="Why no ternary operator?">Go favours explicit if/else for readability.</FAQItem>
        <FAQItem q="Difference between array and slice?">Arrays are fixed-length values; slices are references over an array.</FAQItem>
        <FAQItem q="Zero values?">Every type has one — 0, "", nil, false. No uninitialized variables.</FAQItem>
        <FAQItem q="What's :=?">Short variable declaration. Only inside functions.</FAQItem>
      </Section>

      <Section id="s3" title="3. Concurrency">
        <FAQItem q="Goroutine vs thread?">Goroutines are user-space, 2-8 KB stacks, multiplexed onto OS threads by the runtime.</FAQItem>
        <FAQItem q="When to use channels vs mutexes?">Channels for ownership transfer; mutexes for shared state.</FAQItem>
        <FAQItem q="What's context.Context?">Deadline, cancellation, and request-scoped values propagated through call chains.</FAQItem>
        <Code lang="go">{`ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
defer cancel()`}</Code>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Channel communication between goroutines: senders, buffered queue, receivers." />
      </Section>

      <Section id="s4" title="4. Packages & Modules">
        <FAQItem q="What's go.mod?">Module manifest — name, Go version, dependencies.</FAQItem>
        <FAQItem q="Vendoring?">Copy deps into <code>vendor/</code> for reproducible builds without network.</FAQItem>
        <FAQItem q="Public vs private?">Uppercase = exported, lowercase = package-private.</FAQItem>
      </Section>

      <Section id="s5" title="5. Backend & APIs">
        <FAQItem q="Which router?">Standard <code>net/http</code> (Go 1.22+) or chi are excellent.</FAQItem>
        <FAQItem q="ORM or raw SQL?">Prefer <code>sqlc</code> or <code>pgx</code>. ORMs pay off less in Go than in dynamic languages.</FAQItem>
        <FAQItem q="gRPC or REST?">REST for public APIs, gRPC for internal service-to-service.</FAQItem>
      </Section>

      <Section id="s6" title="6. Performance">
        <FAQItem q="How to profile?">Use <code>net/http/pprof</code> and <code>go tool pprof</code>.</FAQItem>
        <FAQItem q="GC tuning?">Adjust <code>GOGC</code> and <code>GOMEMLIMIT</code>. Measure first.</FAQItem>
        <FAQItem q="Is Go faster than Python?">Yes — often 10-50×, depending on workload.</FAQItem>
      </Section>

      <Section id="s7" title="7. Debugging">
        <FAQItem q="Which debugger?">Delve (<code>dlv</code>).</FAQItem>
        <FAQItem q="Race detector?">Run tests with <code>-race</code>.</FAQItem>
        <FAQItem q="Panic recovery?">Use <code>recover()</code> in deferred functions — only at goroutine boundaries.</FAQItem>
      </Section>

      <Section id="s8" title="8. Interview FAQs">
        <FAQItem q="Explain goroutine scheduling.">M:N model — G goroutines, M OS threads, P logical processors. See the GMP scheduler.</FAQItem>
        <FAQItem q="What is escape analysis?">Compiler decides stack vs heap allocation at compile time.</FAQItem>
        <FAQItem q="Difference between buffered and unbuffered channel?">Unbuffered blocks until paired send/receive; buffered blocks only when full/empty.</FAQItem>
      </Section>

      <Section id="s9" title="9. Career">
        <FAQItem q="Which industries hire Go?">Cloud, fintech, infrastructure, blockchain, SRE tooling.</FAQItem>
        <FAQItem q="Certifications?">Not essential. Public projects and OSS contributions matter more.</FAQItem>
        <FAQItem q="Salary range?">Above average for backend roles in most markets.</FAQItem>
        <Callout tone="info" title="Portfolio tip">One well-documented Go project (API + tests + CI + observability) outweighs three half-finished ones.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Go rewards clarity over cleverness. Master the basics, embrace the tooling, and the ecosystem repays the investment.</p>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Goroutine</strong> — lightweight concurrent function.</li>
          <li><strong>Channel</strong> — typed conduit for goroutine communication.</li>
          <li><strong>Module</strong> — versioned collection of packages (<code>go.mod</code>).</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Verify with the official Go documentation.</p>
      </Section>
    </ReaderShell>
  );
}
