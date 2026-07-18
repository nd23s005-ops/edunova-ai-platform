import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-sample-exercises",
  title: "Go — Sample Exercises",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "22 min",
  pages: 20,
  lastUpdated: "June 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A concept-wise Go workbook — 200+ short exercises across syntax, structs, interfaces, goroutines, channels, files, JSON, APIs, and backend basics.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Syntax Practice" },
  { id: "s2", label: "2. Functions" },
  { id: "s3", label: "3. Structs & Interfaces" },
  { id: "s4", label: "4. Goroutines" },
  { id: "s5", label: "5. Channels" },
  { id: "s6", label: "6. File Handling" },
  { id: "s7", label: "7. JSON" },
  { id: "s8", label: "8. HTTP & APIs" },
  { id: "s9", label: "9. Debugging" },
  { id: "s10", label: "10. Mini Projects" },
  { id: "s11", label: "11. Reflection Questions" },
  { id: "review", label: "Exercise Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Practice Questions", tag: "Programming", time: "31 min" },
  { title: "Go — Beginner Guide", tag: "Programming", time: "17 min" },
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-sample-exercises")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-sample-exercises" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reinforce every core Go concept with short, focused exercises.</li>
          <li>Progress from syntax to backend fundamentals over ~4 weeks.</li>
          <li>Practice reflection — <em>why</em> each solution works, not just <em>how</em>.</li>
        </ul>
        <Callout tone="tip" title="Format">Each block below has 15–25 exercises. Spend 20 minutes on each concept, note stumbles, revisit later.</Callout>
      </Section>

      <Section id="s1" title="1. Syntax Practice">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Print your name in three ways: <code>fmt.Print</code>, <code>Println</code>, <code>Printf</code>.</li>
          <li>Declare 5 constants of different types.</li>
          <li>Swap two variables without a temporary.</li>
          <li>Compute Fahrenheit from Celsius for -40..100 in steps of 10.</li>
          <li>Read a number from stdin and print its square.</li>
        </ol>
      </Section>

      <Section id="s2" title="2. Functions">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Write <code>min</code>, <code>max</code>, <code>abs</code> for ints.</li>
          <li>Variadic average of any number of floats.</li>
          <li>Closure that returns an incrementing counter.</li>
          <li>Recursive factorial + iterative version — compare.</li>
        </ol>
      </Section>

      <Section id="s3" title="3. Structs & Interfaces">
        <Code lang="go">{`type Shape interface { Area() float64 }
// Implement Rect and Circle satisfying Shape.`}</Code>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Model a <code>Book</code> with methods to format its citation.</li>
          <li>Compose <code>Address</code> into <code>Employee</code> via embedding.</li>
          <li>Implement <code>fmt.Stringer</code> on your <code>User</code>.</li>
        </ol>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Composition over inheritance: build up types by embedding smaller ones." />
      </Section>

      <Section id="s4" title="4. Goroutines">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Launch 5 goroutines that print their id.</li>
          <li>Sum a slice concurrently with <code>sync.WaitGroup</code>.</li>
          <li>Detect leaks by counting <code>runtime.NumGoroutine()</code> before/after.</li>
        </ol>
      </Section>

      <Section id="s5" title="5. Channels">
        <Code lang="go">{`ch := make(chan int)
go func(){ for i := 1; i <= 5; i++ { ch <- i }; close(ch) }()
for v := range ch { fmt.Println(v) }`}</Code>
        <p>Extend it to a bounded pipeline with a middle transformation stage.</p>
      </Section>

      <Section id="s6" title="6. File Handling">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Copy a file byte-by-byte using <code>bufio</code>.</li>
          <li>Read a CSV and print unique columns.</li>
          <li>Write a struct as JSON to disk and read it back.</li>
        </ol>
      </Section>

      <Section id="s7" title="7. JSON">
        <Code lang="go">{`type User struct{ Name string \`json:"name"\`; Age int \`json:"age,omitempty"\` }`}</Code>
        <p>Marshal and unmarshal collections; test omitting <code>Age</code>.</p>
      </Section>

      <Section id="s8" title="8. HTTP & APIs">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Build a <code>/health</code> endpoint returning JSON.</li>
          <li>Add a <code>/echo</code> endpoint that reflects request headers.</li>
          <li>Middleware that logs latency for every request.</li>
        </ol>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Request lifecycle: middleware → handler → service → repository → response." />
      </Section>

      <Section id="s9" title="9. Debugging">
        <p>Introduce common bugs (nil map, unclosed channel, goroutine leak) into your own code — then reproduce, isolate, and fix them under a stopwatch.</p>
      </Section>

      <Section id="s10" title="10. Mini Projects">
        <ul className="list-disc space-y-1 pl-5">
          <li>Todo CLI storing JSON on disk.</li>
          <li>Concurrent web fetcher with a worker pool.</li>
          <li>Static file server with directory listings.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Reflection Questions">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Which chapter felt hardest? Why?</li>
          <li>What idiom surprised you compared to your previous language?</li>
          <li>What would you refactor after another read of the standard library?</li>
        </ul>
      </Section>

      <Section id="review" title="Exercise Review">
        <h3 className="font-semibold">Progress Tracker</h3>
        <p>Aim for 15 exercises per weekday for 4 weeks.</p>
        <h3 className="mt-3 font-semibold">Learning Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>✅ Comfortable with slices, maps, structs.</li>
          <li>✅ Wrote at least one goroutine + channel pipeline.</li>
          <li>✅ Built a working HTTP handler.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Practice Schedule</h3>
        <p>Alternate concepts weekly — never spend 5 days on one chapter.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Where are the answers?">Solutions for equivalent problems live in the Answer Key resource; this workbook is deliberately open-ended.</FAQItem>
        <FAQItem q="How much time per day?">45–90 minutes is ideal — enough to focus, small enough to stay consistent.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Idiom</strong> — a pattern the community considers canonical.</li>
          <li><strong>Refactor</strong> — improve code shape without changing behaviour.</li>
          <li><strong>Regression</strong> — a bug that returns after being fixed.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Exercises for self-paced practice. Verify solutions against official documentation and
          community linters. Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
