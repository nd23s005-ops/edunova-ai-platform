import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-cheat-sheet",
  title: "Go — Cheat Sheet",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "5 min",
  pages: 2,
  lastUpdated: "October 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A printable two-page Go cheat sheet — syntax, keywords, common functions, concurrency primitives, and interview reminders on one reference.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Syntax" },
  { id: "s2", label: "2. Keywords" },
  { id: "s3", label: "3. Operators" },
  { id: "s4", label: "4. Data Types" },
  { id: "s5", label: "5. Structs" },
  { id: "s6", label: "6. Interfaces" },
  { id: "s7", label: "7. Goroutines" },
  { id: "s8", label: "8. Channels" },
  { id: "s9", label: "9. Common Functions" },
  { id: "s10", label: "10. Error Handling" },
  { id: "s11", label: "11. Quick Reference" },
  { id: "review", label: "Cheat Sheet Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Quick Revision Notes", tag: "Programming", time: "6 min" },
  { title: "Go — PDF Notes", tag: "Programming", time: "52 min" },
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-cheat-sheet" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Keep a single-page Go reference at your desk.</li>
          <li>Recognise every keyword, operator, and primitive.</li>
          <li>Recall concurrency patterns instantly.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Syntax">
        <Code lang="go">{`package main
import "fmt"

func main() { fmt.Println("hi") }`}</Code>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Go syntax overview: every program is a package with a main function." />
      </Section>

      <Section id="s2" title="2. Keywords">
        <p><code>break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var</code></p>
      </Section>

      <Section id="s3" title="3. Operators">
        <p>Arithmetic <code>+ - * / %</code> · Comparison <code>== != &lt; &gt; &lt;= &gt;=</code> · Logical <code>&amp;&amp; || !</code> · Bitwise <code>&amp; | ^ &lt;&lt; &gt;&gt;</code>.</p>
      </Section>

      <Section id="s4" title="4. Data Types">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Type</th><th className="p-2 text-left">Example</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">int / int64</td><td className="p-2"><code>42</code></td></tr>
            <tr className="border-b"><td className="p-2">float64</td><td className="p-2"><code>3.14</code></td></tr>
            <tr className="border-b"><td className="p-2">string</td><td className="p-2"><code>"go"</code></td></tr>
            <tr><td className="p-2">bool</td><td className="p-2"><code>true</code></td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s5" title="5. Structs">
        <Code lang="go">{`type Point struct{ X, Y int }
p := Point{1, 2}`}</Code>
      </Section>

      <Section id="s6" title="6. Interfaces">
        <Code lang="go">{`type Stringer interface { String() string }`}</Code>
      </Section>

      <Section id="s7" title="7. Goroutines">
        <Code lang="go">{`go func() { fmt.Println("hi") }()`}</Code>
      </Section>

      <Section id="s8" title="8. Channels">
        <Code lang="go">{`c := make(chan int, 4)
c <- 1
v := <-c
close(c)`}</Code>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Channel workflow: producers send, consumers receive, close signals done." />
      </Section>

      <Section id="s9" title="9. Common Functions">
        <p><code>len(s)</code> · <code>cap(s)</code> · <code>append(s, x)</code> · <code>copy(dst, src)</code> · <code>make(T, n)</code> · <code>new(T)</code> · <code>delete(m, k)</code> · <code>panic(v)</code> · <code>recover()</code>.</p>
      </Section>

      <Section id="s10" title="10. Error Handling">
        <Code lang="go">{`if err != nil {
  return fmt.Errorf("op: %w", err)
}
defer f.Close()`}</Code>
      </Section>

      <Section id="s11" title="11. Quick Reference">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Need</th><th className="p-2 text-left">Reach for</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Web server</td><td className="p-2"><code>net/http</code></td></tr>
            <tr className="border-b"><td className="p-2">JSON</td><td className="p-2"><code>encoding/json</code></td></tr>
            <tr className="border-b"><td className="p-2">SQL</td><td className="p-2"><code>database/sql</code> + driver</td></tr>
            <tr className="border-b"><td className="p-2">Testing</td><td className="p-2"><code>testing</code></td></tr>
            <tr><td className="p-2">Cancellation</td><td className="p-2"><code>context.Context</code></td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="review" title="Cheat Sheet Review">
        <h3 className="font-semibold">Printable Summary</h3>
        <p>Two-page format: syntax + keywords on page 1, concurrency + reference table on page 2.</p>
        <h3 className="mt-3 font-semibold">Daily Reference</h3>
        <p>Pin near your monitor; glance during code reviews.</p>
        <h3 className="mt-3 font-semibold">Interview Facts</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Slice header = ptr, len, cap.</li>
          <li>Nil map read is fine; nil map write panics.</li>
          <li>Closing an already-closed channel panics.</li>
          <li>Receiving from a nil channel blocks forever.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this enough to learn Go?">No — it's a reference. Combine with the Beginner Guide or Complete Tutorial.</FAQItem>
        <FAQItem q="Can I print it?">Use the Print button in the toolbar; the layout is print-optimised.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Defer</strong> — schedule a call to run when the function returns.</li>
          <li><strong>Select</strong> — wait on multiple channel operations at once.</li>
          <li><strong>Panic / recover</strong> — Go's last-resort error escape hatch.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Cheat sheet for quick reference — verify details against go.dev before shipping production
          code. Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
