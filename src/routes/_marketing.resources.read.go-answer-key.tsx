import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-answer-key",
  title: "Go — Answer Key",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "25 min",
  pages: 44,
  lastUpdated: "April 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "The full Answer Key for the Go Practice Questions workbook — worked solutions, alternate approaches, optimisations, and evaluation rubrics.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. MCQ Answers" },
  { id: "s2", label: "2. Fill-in Answers" },
  { id: "s3", label: "3. Debugging Solutions" },
  { id: "s4", label: "4. Output Explanations" },
  { id: "s5", label: "5. Coding Walkthroughs" },
  { id: "s6", label: "6. Concurrency Solutions" },
  { id: "s7", label: "7. Mini-Project Reviews" },
  { id: "s8", label: "8. Scenario Answers" },
  { id: "s9", label: "9. Evaluation Rubric" },
  { id: "review", label: "Answer Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Practice Questions", tag: "Programming", time: "31 min" },
  { title: "Go — Interview Questions", tag: "Programming", time: "26 min" },
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-answer-key")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-answer-key" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Confirm answers to the Practice Questions workbook.</li>
          <li>Learn multiple approaches per problem — not just one solution.</li>
          <li>Understand time and space trade-offs.</li>
          <li>Use the evaluation rubric to self-assess objectively.</li>
        </ul>
        <Callout tone="tip" title="Don't peek">Only open this after a genuine attempt — otherwise the practice value collapses.</Callout>
      </Section>

      <Section id="s1" title="1. MCQ Answers">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">#</th><th className="p-2 text-left">Answer</th><th className="p-2 text-left">Why</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">1</td><td className="p-2">(b) go</td><td className="p-2">The keyword launches a goroutine.</td></tr>
            <tr className="border-b"><td className="p-2">2</td><td className="p-2">(c) false</td><td className="p-2">Zero value of bool.</td></tr>
            <tr className="border-b"><td className="p-2">3</td><td className="p-2">(a) encoding/json</td><td className="p-2">Standard-library package.</td></tr>
            <tr className="border-b"><td className="p-2">4</td><td className="p-2">(a) ptr, len, cap</td><td className="p-2">Slice header struct.</td></tr>
            <tr><td className="p-2">5</td><td className="p-2">(b) channel</td><td className="p-2">Channels transfer both data and synchronisation.</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s2" title="2. Fill-in Answers">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li><code>package main</code></li>
          <li><code>:=</code></li>
          <li><code>sync.WaitGroup</code></li>
          <li><code>context.Context</code></li>
          <li><code>range</code></li>
        </ol>
      </Section>

      <Section id="s3" title="3. Debugging Solutions">
        <p><strong>#1</strong> — unbuffered channel: send blocks. Fix by buffering or launching a receiver first.</p>
        <Code lang="go">{`ch := make(chan int, 1)
ch <- 1
fmt.Println(<-ch)`}</Code>
        <p><strong>#2</strong> — data race on <code>count</code>. Fix with <code>sync.Mutex</code> or <code>atomic.AddInt64</code>.</p>
        <Code lang="go">{`var count int64
for i := 0; i < 100; i++ {
  go func(){ atomic.AddInt64(&count, 1) }()
}`}</Code>
        <p><strong>#3</strong> — writing to a nil map panics. Initialise it first with <code>make</code>.</p>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Every fix ships with a regression test — otherwise the bug is coming back." />
      </Section>

      <Section id="s4" title="4. Output Explanations">
        <p><strong>Slice aliasing:</strong> assigning a slice shares the backing array — mutating <code>t</code> mutates <code>s</code>.</p>
        <p><strong>Loop closure:</strong> pre-Go 1.22, <code>i</code> and <code>v</code> were shared across iterations; Go 1.22+ gives each iteration a fresh variable.</p>
      </Section>

      <Section id="s5" title="5. Coding Walkthroughs">
        <p><strong>LRU cache</strong> — O(1) get/put using a hash map + doubly linked list. Head = most recent, tail = eviction victim.</p>
        <Code lang="go">{`type entry struct{ k, v int; prev, next *entry }
type LRU struct {
  cap int
  m   map[int]*entry
  h,t *entry
}
// … Get/Put move touched entry to head; Put evicts tail when full.`}</Code>
      </Section>

      <Section id="s6" title="6. Concurrency Solutions">
        <p><strong>Bounded worker pool</strong> — N goroutines each range over a shared jobs channel, results written to another channel.</p>
        <Code lang="go">{`for i := 0; i < N; i++ {
  go func(){
    for j := range jobs { results <- work(j) }
  }()
}`}</Code>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Fan-out / fan-in with buffered channels keeps memory bounded and workers busy." />
      </Section>

      <Section id="s7" title="7. Mini-Project Reviews">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>URL shortener</strong>: base62 encoding, collision handling, 302 redirects, Prometheus metrics.</li>
          <li><strong>Log tailer</strong>: <code>fsnotify</code> for file changes, regex compiled once, backpressure on slow consumers.</li>
          <li><strong>Chat server</strong>: hub goroutine owns clients map; per-connection read + write goroutines.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Scenario Answers">
        <p><strong>Memory leak:</strong> capture heap profiles, diff over time, look for growing goroutine counts, confirm exit paths.</p>
        <p><strong>Slow dependency:</strong> retry with jittered exponential backoff, wrap in a circuit breaker, and add a shorter timeout than the caller expects.</p>
        <p><strong>10× traffic:</strong> check p99 latency by handler, DB connections, GC pauses, and outbound network egress before assuming code is the culprit.</p>
      </Section>

      <Section id="s9" title="9. Evaluation Rubric">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Criterion</th><th className="p-2 text-left">Weight</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Correctness</td><td className="p-2">40%</td></tr>
            <tr className="border-b"><td className="p-2">Idiomatic Go</td><td className="p-2">25%</td></tr>
            <tr className="border-b"><td className="p-2">Complexity</td><td className="p-2">15%</td></tr>
            <tr className="border-b"><td className="p-2">Tests</td><td className="p-2">15%</td></tr>
            <tr><td className="p-2">Docs</td><td className="p-2">5%</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="review" title="Answer Review">
        <h3 className="font-semibold">Final Revision</h3>
        <p>Re-solve any question you scored below 70% on. Aim for 3 rounds before moving on.</p>
        <h3 className="mt-3 font-semibold">Performance Report</h3>
        <p>Weakest chapters usually appear in concurrency and error wrapping — focus practice there.</p>
        <h3 className="mt-3 font-semibold">Improvement Suggestions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Read one open-source Go package per week.</li>
          <li>Rewrite the LRU cache in 3 different ways.</li>
          <li>Pair-review your own code after 48 hours.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Are alternate solutions accepted?">Yes — favour readable over clever if performance is comparable.</FAQItem>
        <FAQItem q="What if my answer differs from the key?">Explain your reasoning — if it holds, it's a valid alternative.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Rubric</strong> — scoring framework with weighted criteria.</li>
          <li><strong>Jitter</strong> — random variance in backoff to avoid retry storms.</li>
          <li><strong>Circuit breaker</strong> — trip open when a dependency fails repeatedly.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Answer Key for educational purposes. Multiple valid solutions may exist; consult official
          docs for canonical patterns. Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
