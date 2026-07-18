import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-tips-and-tricks",
  title: "Go — Tips & Tricks",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 9,
  lastUpdated: "September 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "150+ productivity tips, debugging tricks, performance hacks, and interview strategies for Go developers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Productivity Hacks" },
  { id: "s2", label: "2. Debugging Tricks" },
  { id: "s3", label: "3. Editor Shortcuts" },
  { id: "s4", label: "4. Performance Tricks" },
  { id: "s5", label: "5. Concurrency Tips" },
  { id: "s6", label: "6. Testing Tips" },
  { id: "s7", label: "7. Interview Advice" },
  { id: "s8", label: "8. Engineering Habits" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Common Mistakes", tag: "Programming", time: "13 min" },
  { title: "Go — Best Practices", tag: "Programming", time: "17 min" },
  { title: "Go — Cheat Sheet", tag: "Programming", time: "9 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-tips-and-tricks")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-tips-and-tricks" }],
  }),
  component: Page,
});

function Tip({ children }: { children: React.ReactNode }) {
  return <li className="pl-1">{children}</li>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Move faster with editor, CLI, and workflow shortcuts.</li>
          <li>Ship cleaner code with battle-tested tricks.</li>
          <li>Ace interviews with concrete talking points.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Productivity Hacks">
        <ul className="list-disc space-y-1 pl-5">
          <Tip><code>go run .</code> beats compiling for scratch scripts.</Tip>
          <Tip><code>go doc pkg.Func</code> in the terminal — no browser needed.</Tip>
          <Tip>Alias <code>gt="go test ./... -race"</code>.</Tip>
          <Tip>Use <code>air</code> for hot reload during API dev.</Tip>
          <Tip>Learn <code>errgroup</code>; it replaces a lot of boilerplate.</Tip>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Editor + CLI workflow: fast feedback loop is the whole game." />
      </Section>

      <Section id="s2" title="2. Debugging Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <Tip><code>go test -run TestFoo -v</code> to isolate one test.</Tip>
          <Tip><code>GOFLAGS="-race" go test ./...</code>.</Tip>
          <Tip>Import <code>net/http/pprof</code> for live profiling.</Tip>
          <Tip><code>dlv debug</code> for step-through debugging.</Tip>
          <Tip><code>runtime.Stack</code> to dump goroutines on demand.</Tip>
        </ul>
      </Section>

      <Section id="s3" title="3. Editor Shortcuts (VS Code)">
        <ul className="list-disc space-y-1 pl-5">
          <Tip><code>F12</code> — go to definition.</Tip>
          <Tip><code>Shift+F12</code> — find references.</Tip>
          <Tip><code>Ctrl+Shift+O</code> — jump to symbol.</Tip>
          <Tip><code>gopls</code> code actions: extract func, inline var.</Tip>
        </ul>
      </Section>

      <Section id="s4" title="4. Performance Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <Tip>Preallocate slices: <code>make([]T, 0, n)</code>.</Tip>
          <Tip><code>strings.Builder</code> for concatenation in loops.</Tip>
          <Tip><code>sync.Pool</code> for hot-path buffers.</Tip>
          <Tip>Avoid interfaces on inner loops when concrete types work.</Tip>
          <Tip>Benchmark before optimizing: <code>go test -bench=.</code>.</Tip>
        </ul>
        <Code lang="go">{`var bufPool = sync.Pool{New: func() any { return new(bytes.Buffer) }}
b := bufPool.Get().(*bytes.Buffer)
b.Reset()
defer bufPool.Put(b)`}</Code>
      </Section>

      <Section id="s5" title="5. Concurrency Tips">
        <ul className="list-disc space-y-1 pl-5">
          <Tip>Pass <code>context.Context</code> as the first parameter — always.</Tip>
          <Tip>Cap fan-out with <code>errgroup.SetLimit(n)</code>.</Tip>
          <Tip>Close channels from the sender, never the receiver.</Tip>
          <Tip>Use <code>select</code> with <code>ctx.Done()</code> for cancellable waits.</Tip>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Concurrency pattern: bounded fan-out, single sender closes the channel, receivers drain." />
      </Section>

      <Section id="s6" title="6. Testing Tips">
        <ul className="list-disc space-y-1 pl-5">
          <Tip>Table-driven tests scale better than inline cases.</Tip>
          <Tip><code>t.Parallel()</code> — but only with subtests.</Tip>
          <Tip>Golden files for snapshot tests.</Tip>
          <Tip><code>testcontainers-go</code> for real Postgres/Redis in tests.</Tip>
        </ul>
      </Section>

      <Section id="s7" title="7. Interview Advice">
        <ul className="list-disc space-y-1 pl-5">
          <Tip>Explain the GMP scheduler with a whiteboard sketch.</Tip>
          <Tip>Know when a slice header is copied vs. the backing array.</Tip>
          <Tip>Have a war story: one race condition you fixed.</Tip>
          <Tip>Ask about their observability stack — shows seniority.</Tip>
        </ul>
        <Callout tone="info" title="Interviewer favourite">"Walk me through what happens when I call <code>go f()</code>."</Callout>
      </Section>

      <Section id="s8" title="8. Engineering Habits">
        <ul className="list-disc space-y-1 pl-5">
          <Tip>Small PRs (&lt; 300 LOC) get merged 3× faster.</Tip>
          <Tip>Write the test first when fixing a bug.</Tip>
          <Tip>ADRs for anything you'll forget in 6 months.</Tip>
          <Tip>Read one Go proposal per week — trains architectural taste.</Tip>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Tips compound. Adopt three per week; in a year you'll be measurably faster than the version of you reading this now.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Any AI tools worth it?">Copilot / Cursor for boilerplate; verify with <code>go vet</code> and tests.</FAQItem>
        <FAQItem q="How do I stay current?">The Go Blog, Changelog, and one podcast (Go Time).</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>gopls</strong> — Go language server for editors.</li>
          <li><strong>ADR</strong> — Architecture Decision Record.</li>
          <li><strong>errgroup</strong> — coordinated goroutines with error propagation.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Tips are heuristics — measure impact in your context.</p>
      </Section>
    </ReaderShell>
  );
}
