import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-practice-questions",
  title: "Go — Practice Questions",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "31 min",
  pages: 21,
  lastUpdated: "September 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A structured Go practice workbook with 350+ questions — MCQs, fill-in-the-blanks, debugging, output prediction, concurrency, and mini-project prompts.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. MCQs — Fundamentals" },
  { id: "s2", label: "2. Fill in the Blanks" },
  { id: "s3", label: "3. Debugging Exercises" },
  { id: "s4", label: "4. Output Prediction" },
  { id: "s5", label: "5. Coding Challenges" },
  { id: "s6", label: "6. Concurrency Problems" },
  { id: "s7", label: "7. Mini Projects" },
  { id: "s8", label: "8. Scenario Questions" },
  { id: "s9", label: "9. Self Assessment" },
  { id: "review", label: "Practice Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Answer Key", tag: "Programming", time: "25 min" },
  { title: "Go — Interview Questions", tag: "Programming", time: "26 min" },
  { title: "Go — Sample Exercises", tag: "Programming", time: "22 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-practice-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-practice-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Practice 350+ Go questions across every core topic.</li>
          <li>Build muscle memory for idiomatic patterns.</li>
          <li>Sharpen debugging skills with intentionally broken snippets.</li>
          <li>Ship 3 mini-projects to consolidate learning.</li>
        </ul>
        <Callout tone="tip" title="Use with the Answer Key">Solve first, then check the companion Answer Key — never the other way around.</Callout>
      </Section>

      <Section id="s1" title="1. MCQs — Fundamentals">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>Which keyword launches a goroutine? <strong>(a)</strong> async <strong>(b)</strong> go <strong>(c)</strong> spawn <strong>(d)</strong> thread</li>
          <li>Zero value of a bool is: <strong>(a)</strong> nil <strong>(b)</strong> 0 <strong>(c)</strong> false <strong>(d)</strong> undefined</li>
          <li>Which package handles JSON? <strong>(a)</strong> encoding/json <strong>(b)</strong> json/std <strong>(c)</strong> data/json <strong>(d)</strong> fmt/json</li>
          <li>Slice header contains: <strong>(a)</strong> ptr, len, cap <strong>(b)</strong> ptr, size <strong>(c)</strong> only len <strong>(d)</strong> only cap</li>
          <li>Which primitive coordinates goroutines with data? <strong>(a)</strong> mutex <strong>(b)</strong> channel <strong>(c)</strong> semaphore <strong>(d)</strong> event</li>
        </ol>
        <p className="mt-2 text-xs text-muted-foreground">…50 more MCQs continue in the printable version, grouped by chapter.</p>
      </Section>

      <Section id="s2" title="2. Fill in the Blanks">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>To declare a package, start the file with <code>______ main</code>.</li>
          <li>The short variable declaration operator is <code>______</code>.</li>
          <li>To wait for goroutines, use <code>sync.______</code>.</li>
          <li>To cancel a request, pass a <code>context.______</code>.</li>
          <li>To iterate over a map use the <code>______</code> keyword.</li>
        </ol>
      </Section>

      <Section id="s3" title="3. Debugging Exercises">
        <p>Find and fix the bug in each snippet.</p>
        <Code lang="go">{`// #1 — deadlock?
ch := make(chan int)
ch <- 1
fmt.Println(<-ch)`}</Code>
        <Code lang="go">{`// #2 — race?
var count int
for i := 0; i < 100; i++ { go func(){ count++ }() }`}</Code>
        <Code lang="go">{`// #3 — nil dereference?
var m map[string]int
m["a"] = 1`}</Code>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Debugging workflow: reproduce → isolate → hypothesise → fix → cover with a test." />
      </Section>

      <Section id="s4" title="4. Output Prediction">
        <Code lang="go">{`s := []int{1, 2, 3}
t := s
t[0] = 99
fmt.Println(s[0]) // ?`}</Code>
        <Code lang="go">{`for i, v := range []string{"a","b","c"} { go func(){ fmt.Println(i, v) }() }`}</Code>
        <p className="text-sm">Predict the output before running. Explain <em>why</em>, not just <em>what</em>.</p>
      </Section>

      <Section id="s5" title="5. Coding Challenges">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Reverse a string preserving Unicode.</li>
          <li>Count word frequencies from a large file efficiently.</li>
          <li>Detect a cycle in a linked list.</li>
          <li>Merge two sorted slices in O(n+m).</li>
          <li>Implement an LRU cache with a map + doubly linked list.</li>
        </ol>
      </Section>

      <Section id="s6" title="6. Concurrency Problems">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Bounded worker pool consuming from a channel.</li>
          <li>Fan-out / fan-in for HTTP fetches.</li>
          <li>Rate limiter using time.Tick.</li>
          <li>Graceful shutdown of a server with context.</li>
          <li>Race-free counter using sync/atomic.</li>
        </ol>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Concurrent pipeline: source → workers → sink, coordinated with channels and context." />
      </Section>

      <Section id="s7" title="7. Mini Projects">
        <ul className="list-disc space-y-1 pl-5">
          <li>URL shortener CLI + REST API.</li>
          <li>Log tailer with concurrent regex filters.</li>
          <li>Chat server with rooms over WebSockets.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Scenario Questions">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Your service leaks memory in production — how do you triage?</li>
          <li>A downstream dependency is slow — implement retries with backoff.</li>
          <li>Traffic spikes 10× — where do you look for bottlenecks?</li>
        </ol>
      </Section>

      <Section id="s9" title="9. Self Assessment">
        <p>Score yourself weekly out of 100. Below 60 → revisit the chapter. 60–80 → practice more. 80+ → move on.</p>
      </Section>

      <Section id="review" title="Practice Review">
        <h3 className="font-semibold">Chapter Score</h3>
        <p>Track score per chapter to identify weakest concepts.</p>
        <h3 className="mt-3 font-semibold">Progress Tracker</h3>
        <p>Complete 20 questions per day for 3 weeks to finish the workbook.</p>
        <h3 className="mt-3 font-semibold">Coding Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>✅ All mini-projects shipped.</li>
          <li>✅ Every debugging exercise reproduced and fixed.</li>
          <li>✅ Race detector clean on concurrency solutions.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Are answers included?">No — the companion Answer Key resource has them.</FAQItem>
        <FAQItem q="Can I skip debugging exercises?">Debugging is the most transferable skill — do them.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>MCQ</strong> — multiple-choice question.</li>
          <li><strong>Deadlock</strong> — two goroutines waiting on each other forever.</li>
          <li><strong>Backoff</strong> — increasing delay between retries.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Practice materials for self-study. Verify solutions with the Answer Key and official
          documentation. Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
