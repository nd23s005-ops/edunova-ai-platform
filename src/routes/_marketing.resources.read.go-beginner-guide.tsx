import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-beginner-guide",
  title: "Go — Beginner Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "17 min",
  pages: 20,
  lastUpdated: "May 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A friendly, zero-to-first-program walkthrough of Go — syntax, packages, and a first taste of goroutines, explained without jargon.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Introduction to Go" },
  { id: "s2", label: "2. Installing Go" },
  { id: "s3", label: "3. Go Workspace" },
  { id: "s4", label: "4. Variables" },
  { id: "s5", label: "5. Data Types" },
  { id: "s6", label: "6. Operators" },
  { id: "s7", label: "7. Control Statements" },
  { id: "s8", label: "8. Functions" },
  { id: "s9", label: "9. Arrays" },
  { id: "s10", label: "10. Slices" },
  { id: "s11", label: "11. Maps" },
  { id: "s12", label: "12. Structs" },
  { id: "s13", label: "13. Interfaces" },
  { id: "s14", label: "14. Basic Concurrency" },
  { id: "s15", label: "15. Summary" },
  { id: "review", label: "Beginner Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
  { title: "Go — Step-by-Step Learning Guide", tag: "Programming", time: "27 min" },
  { title: "Go — Cheat Sheet", tag: "Programming", time: "5 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-beginner-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand what Go is, why it exists, and where it fits in the industry.</li>
          <li>Read and write basic Go syntax with confidence.</li>
          <li>Use variables, types, functions, and control flow correctly.</li>
          <li>Organize code with packages and modules.</li>
          <li>Take your first look at goroutines and channels.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Introduction to Go">
        <p>Go (or Golang) is an open-source programming language designed at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. It compiles to a single static binary, starts almost instantly, and treats concurrency as a first-class feature.</p>
        <p>Its philosophy: simple syntax, one obvious way to do things, and pragmatic tooling (formatter, linter, tests, race detector — all built-in).</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go compiles to a single static binary, which makes deployments simple across servers and containers." />
      </Section>

      <Section id="s2" title="2. Installing Go">
        <p>Download the installer from <em>go.dev/dl</em>, run it, then verify:</p>
        <Code lang="bash">{`$ go version
go version go1.22.0 darwin/arm64`}</Code>
        <Callout tone="tip" title="Editor tip">Install the official Go extension for VS Code — it wires up formatting, testing, and the language server automatically.</Callout>
      </Section>

      <Section id="s3" title="3. Go Workspace">
        <p>Every project is a <strong>module</strong>. Create one with <code>go mod init example.com/hello</code>. Your <code>go.mod</code> file lists dependencies; <code>go.sum</code> pins their hashes.</p>
        <Code lang="go">{`// main.go
package main

import "fmt"

func main() {
  fmt.Println("Hello, Go!")
}`}</Code>
        <p>Run with <code>go run .</code> or build a binary with <code>go build</code>.</p>
      </Section>

      <Section id="s4" title="4. Variables">
        <Code lang="go">{`var name string = "Ada"
age := 30 // short declaration, type inferred
const Pi = 3.14`}</Code>
        <p>Unused variables are a compile error — Go keeps your code tidy by force.</p>
      </Section>

      <Section id="s5" title="5. Data Types">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Category</th><th className="p-2 text-left">Types</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Numeric</td><td className="p-2">int, int64, float64, complex128</td></tr>
            <tr className="border-b"><td className="p-2">Text</td><td className="p-2">string, rune, byte</td></tr>
            <tr className="border-b"><td className="p-2">Boolean</td><td className="p-2">bool</td></tr>
            <tr><td className="p-2">Composite</td><td className="p-2">array, slice, map, struct</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s6" title="6. Operators">
        <p>Arithmetic (<code>+ - * / %</code>), comparison (<code>== != &lt; &gt;</code>), logical (<code>&amp;&amp; || !</code>). No ternary — use a plain <code>if</code>.</p>
      </Section>

      <Section id="s7" title="7. Control Statements">
        <Code lang="go">{`if x > 0 {
  fmt.Println("positive")
} else {
  fmt.Println("non-positive")
}

for i := 0; i < 3; i++ { fmt.Println(i) }

switch day {
case "Mon", "Tue": fmt.Println("early week")
default: fmt.Println("other")
}`}</Code>
      </Section>

      <Section id="s8" title="8. Functions">
        <Code lang="go">{`func add(a, b int) int { return a + b }

// Multiple return values are idiomatic
func divide(a, b float64) (float64, error) {
  if b == 0 { return 0, fmt.Errorf("divide by zero") }
  return a / b, nil
}`}</Code>
        <Callout tone="info" title="Two return values">Errors are values in Go — you check them explicitly instead of catching exceptions.</Callout>
      </Section>

      <Section id="s9" title="9. Arrays">
        <p>Fixed-size, rarely used directly: <code>var nums [3]int = [3]int{'{'}1,2,3{'}'}</code>. Prefer slices.</p>
      </Section>

      <Section id="s10" title="10. Slices">
        <Code lang="go">{`nums := []int{1, 2, 3}
nums = append(nums, 4)
fmt.Println(len(nums), cap(nums))`}</Code>
      </Section>

      <Section id="s11" title="11. Maps">
        <Code lang="go">{`ages := map[string]int{"Ada": 30, "Alan": 41}
ages["Grace"] = 85
if v, ok := ages["Ada"]; ok { fmt.Println(v) }`}</Code>
      </Section>

      <Section id="s12" title="12. Structs">
        <Code lang="go">{`type User struct { Name string; Age int }
u := User{Name: "Ada", Age: 30}
fmt.Println(u.Name)`}</Code>
      </Section>

      <Section id="s13" title="13. Interfaces">
        <Code lang="go">{`type Greeter interface { Greet() string }
type EN struct{}
func (EN) Greet() string { return "Hello" }`}</Code>
        <p>Interfaces in Go are satisfied <em>implicitly</em> — no <code>implements</code> keyword.</p>
      </Section>

      <Section id="s14" title="14. Basic Concurrency">
        <Code lang="go">{`go sayHi()             // launches a goroutine
ch := make(chan int)   // channel for communication
go func() { ch <- 42 }()
fmt.Println(<-ch)      // receives 42`}</Code>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 2 — Goroutines are cheap, user-space threads coordinated with channels — Go's signature feature." />
      </Section>

      <Section id="s15" title="15. Summary">
        <p>You've now seen every fundamental building block of Go. The rest is practice: read the standard library, ship small tools, and lean on <code>go doc</code> and <code>gofmt</code>.</p>
      </Section>

      <Section id="review" title="Beginner Review">
        <h3 className="font-semibold">Chapter Summary</h3>
        <p>Go emphasises simplicity, static typing, fast compilation, and built-in concurrency.</p>
        <h3 className="mt-3 font-semibold">Key Takeaways</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every project is a module; every file lives in a package.</li>
          <li>Errors are values — check them.</li>
          <li>Slices, maps, and structs cover 90% of your data.</li>
          <li>Goroutines + channels are how you scale.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Self Assessment</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>What's the difference between an array and a slice?</li>
          <li>Why does Go reject unused imports?</li>
          <li>How do you declare and satisfy an interface?</li>
        </ol>
        <h3 className="mt-3 font-semibold">Practice Questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Write a program that counts word frequencies from stdin.</li>
          <li>Create a struct <code>Book</code> and a slice of books; sort by year.</li>
          <li>Launch three goroutines that print 1..5 concurrently.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is Go hard for beginners?">No — the syntax is intentionally small. Most people are productive within a week.</FAQItem>
        <FAQItem q="Do I need to know C first?">No, but knowing any typed language helps.</FAQItem>
        <FAQItem q="What editor should I use?">VS Code or GoLand — both are excellent.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Goroutine</strong> — a lightweight thread managed by the Go runtime.</li>
          <li><strong>Channel</strong> — a typed pipe for communicating between goroutines.</li>
          <li><strong>Module</strong> — a versioned collection of packages defined by <code>go.mod</code>.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Educational content compiled from official Go documentation and community resources.
          Language features and tooling evolve — always consult go.dev for the latest information.
          Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
