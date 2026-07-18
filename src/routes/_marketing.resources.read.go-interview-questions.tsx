import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-interview-questions",
  title: "Go — Interview Questions",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "26 min",
  pages: 54,
  lastUpdated: "February 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A 300+ question Go interview handbook — fundamentals, concurrency, backend design, HR rounds, and real interview scenarios with model answers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Go Fundamentals" },
  { id: "s2", label: "2. Variables & Types" },
  { id: "s3", label: "3. Functions" },
  { id: "s4", label: "4. Structs" },
  { id: "s5", label: "5. Interfaces" },
  { id: "s6", label: "6. Error Handling" },
  { id: "s7", label: "7. Packages" },
  { id: "s8", label: "8. Goroutines" },
  { id: "s9", label: "9. Channels" },
  { id: "s10", label: "10. Mutex" },
  { id: "s11", label: "11. Context" },
  { id: "s12", label: "12. HTTP" },
  { id: "s13", label: "13. REST APIs" },
  { id: "s14", label: "14. Testing" },
  { id: "s15", label: "15. Mock Interviews" },
  { id: "review", label: "Interview Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Practice Questions", tag: "Programming", time: "31 min" },
  { title: "Go — Answer Key", tag: "Programming", time: "25 min" },
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-interview-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-interview-questions" }],
  }),
  component: Page,
});

function QA({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="my-3">
      <p className="font-semibold">Q. {q}</p>
      <div className="mt-1 text-sm text-muted-foreground">{a}</div>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Answer 300+ Go interview questions across every experience level.</li>
          <li>Reason clearly about concurrency, memory, and error semantics.</li>
          <li>Handle backend system-design follow-ups with confidence.</li>
          <li>Practice HR and behavioural questions specific to Go teams.</li>
        </ul>
        <Callout tone="tip" title="How to use">Cover the answer, attempt the question aloud in 60 seconds, then compare. Repeat weekly.</Callout>
      </Section>

      <Section id="s1" title="1. Go Fundamentals">
        <QA q="Why was Go created?" a="To simplify large-scale systems programming at Google: fast compilation, easy concurrency, safe memory management, and a small feature set that scales across large teams." />
        <QA q="Is Go interpreted or compiled?" a="Compiled — to a single static binary, no VM." />
        <QA q="What are Go's main design principles?" a="Simplicity, orthogonality, composition over inheritance, explicit over implicit, and 'don't communicate by sharing memory; share memory by communicating.'" />
        <QA q="Which companies use Go in production?" a="Google, Uber, Dropbox, Cloudflare, Twitch, and the entire cloud-native stack (Docker, Kubernetes, Terraform, etcd, Prometheus)." />
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go's place in the modern backend interview: language, concurrency, and cloud infra fluency." />
      </Section>

      <Section id="s2" title="2. Variables & Types">
        <QA q="What's the difference between var and :=?" a="var declares a variable in any scope with optional type and zero value. := is short-form, function-scope only, with inferred type." />
        <QA q="What is a zero value?" a={'The default value assigned when a variable is declared without an initialiser — 0, false, "", nil.'} />
        <QA q="Explain iota." a="A compiler-managed counter reset per const block; used to build enums." />
      </Section>

      <Section id="s3" title="3. Functions">
        <QA q="Can Go functions return multiple values?" a="Yes — idiomatically (value, error)." />
        <QA q="What are variadic functions?" a="Functions accepting variable-length arguments via ...T, exposed inside as a slice." />
        <QA q="What is a closure?" a="A function value that captures variables from its enclosing scope." />
      </Section>

      <Section id="s4" title="4. Structs">
        <QA q="Does Go have inheritance?" a="No — it has composition via embedding." />
        <QA q="Pointer receiver vs value receiver — when do you pick?" a="Pointer for mutation, large structs, or consistency across a type; value for small, immutable types." />
      </Section>

      <Section id="s5" title="5. Interfaces">
        <QA q="How are interfaces implemented in Go?" a="Implicitly — any type with the required method set satisfies the interface." />
        <QA q="What's the empty interface?" a="interface{} / any — satisfied by any type; used for generic containers before generics." />
        <QA q="Explain type assertion vs type switch." a="Assertion checks a single type; a switch checks many with case clauses." />
      </Section>

      <Section id="s6" title="6. Error Handling">
        <QA q="Why does Go not use exceptions?" a="Explicit errors keep control flow visible and force callers to handle failure at the boundary." />
        <QA q="Difference between error wrapping and errors.Is / As?" a={'Wrap with fmt.Errorf("…: %w", err); inspect with errors.Is (identity) or errors.As (typed).'} />
      </Section>

      <Section id="s7" title="7. Packages">
        <QA q="Difference between package name and import path?" a="Import path is where Go finds the code; package name is what you use in code — they usually match but need not." />
      </Section>

      <Section id="s8" title="8. Goroutines">
        <QA q="What's a goroutine?" a="A lightweight user-space thread scheduled by the Go runtime, starting at ~2KB stack." />
        <QA q="How does the scheduler work?" a="M:N — M goroutines multiplexed onto N OS threads with a work-stealing scheduler (GMP model)." />
        <QA q="How do you detect goroutine leaks?" a="Compare goroutine counts before/after tests; use pprof; guarantee every launched goroutine has an exit path." />
      </Section>

      <Section id="s9" title="9. Channels">
        <QA q="Buffered vs unbuffered channel?" a="Unbuffered sends block until a receiver is ready; buffered sends block only when the buffer is full." />
        <QA q="What happens when you close a channel twice?" a="Runtime panic." />
        <QA q="Receive from nil channel?" a="Blocks forever — useful for disabling cases in select." />
        <Code lang="go">{`select {
case v := <-ch: fmt.Println(v)
case <-ctx.Done(): return ctx.Err()
}`}</Code>
      </Section>

      <Section id="s10" title="10. Mutex">
        <QA q="RWMutex vs Mutex?" a="RWMutex allows many readers or one writer; use when reads dominate writes." />
        <QA q="Channels vs mutexes — how to choose?" a="Channels for ownership handoff; mutexes for guarding shared state that stays in place." />
      </Section>

      <Section id="s11" title="11. Context">
        <QA q="Why pass context.Context as first arg?" a="Uniform cancellation, deadlines, and request-scoped values across API boundaries." />
        <QA q="What NOT to store in context?" a="Business data, authentication credentials, or anything that would be better as an explicit parameter." />
      </Section>

      <Section id="s12" title="12. HTTP">
        <QA q="Is net/http production-ready?" a="Yes — it's used by many large systems. Configure timeouts explicitly." />
        <QA q="How do you write middleware?" a="A function that takes http.Handler and returns http.Handler; wrap with next.ServeHTTP." />
      </Section>

      <Section id="s13" title="13. REST APIs">
        <QA q="How do you version an API?" a="Path prefix (/v1), custom header, or content negotiation. Path is simplest and most cache-friendly." />
        <QA q="Idempotency for POST?" a="Add an idempotency key per request, store it server-side, and return the original response on retries." />
      </Section>

      <Section id="s14" title="14. Testing">
        <QA q="What are table-driven tests?" a="A slice of test cases iterated with subtests via t.Run — the community standard for clarity and coverage." />
        <QA q="How do you test concurrent code?" a="Design deterministic tests, use synctest patterns, run with -race, and add stress tests with go test -count=100." />
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Backend interview architecture: HTTP layer, service layer, repository, database — with observability at every hop." />
      </Section>

      <Section id="s15" title="15. Mock Interviews">
        <p><strong>Scenario 1.</strong> Design a rate limiter for a public API in Go. Discuss algorithm (token bucket vs sliding window), storage (in-memory vs Redis), and horizontal scaling.</p>
        <p><strong>Scenario 2.</strong> A goroutine leak is suspected in production. Walk through your triage: metrics, pprof, code review, and remediation.</p>
        <p><strong>Scenario 3.</strong> Design a URL shortener microservice — REST API, storage, cache, and analytics pipeline.</p>
      </Section>

      <Section id="review" title="Interview Review">
        <h3 className="font-semibold">Top 100 Questions</h3>
        <p>Master 20 per category (fundamentals, concurrency, HTTP, testing, system design). If you can answer these aloud in under 60 seconds each, you're interview-ready.</p>
        <h3 className="mt-3 font-semibold">Mock Interview</h3>
        <p>Pair up: 45 min technical + 15 min behavioural. Rotate weekly.</p>
        <h3 className="mt-3 font-semibold">Coding Assessment</h3>
        <p>Solve one small problem live per week — no IDE completions. Explain trade-offs as you code.</p>
        <h3 className="mt-3 font-semibold">Interview Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>✅ Fluent with slices, maps, channels.</li>
          <li>✅ Can spot a race condition in code.</li>
          <li>✅ Can design a small backend end-to-end.</li>
          <li>✅ HR answers rehearsed in your own words.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long should I prepare?">6–8 weeks alongside daily coding — longer if you're new to Go.</FAQItem>
        <FAQItem q="Are LeetCode-style questions asked?">Yes, but usually simpler; interviewers care more about idiomatic Go.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>GMP</strong> — Goroutines, Machines, Processors: Go's scheduler model.</li>
          <li><strong>Escape analysis</strong> — compile-time decision of heap vs stack allocation.</li>
          <li><strong>Backpressure</strong> — a producer slowing down when the consumer can't keep up.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Interview preparation content is compiled from public sources and community best practices.
          Real interviews vary widely — treat answers here as a starting point. Trademarks belong to
          their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
