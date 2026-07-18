import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-quick-revision-notes",
  title: "Go — Quick Revision Notes",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "6 min",
  pages: 6,
  lastUpdated: "January 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "Condensed Go revision notes — one-liners, mnemonics, tables, and interview keywords for the night before your exam or interview.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. One-liners" },
  { id: "s2", label: "2. Mnemonics" },
  { id: "s3", label: "3. Interview Keywords" },
  { id: "s4", label: "4. Common Syntax" },
  { id: "s5", label: "5. Quick Tables" },
  { id: "s6", label: "6. Cheat Summaries" },
  { id: "review", label: "Revision Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Cheat Sheet", tag: "Programming", time: "5 min" },
  { title: "Go — PDF Notes", tag: "Programming", time: "52 min" },
  { title: "Go — Beginner Guide", tag: "Programming", time: "17 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-quick-revision-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-quick-revision-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Refresh core Go concepts in under 10 minutes.</li>
          <li>Memorise interview-critical facts and mnemonics.</li>
          <li>Have a compact glance-friendly reference the day before an assessment.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. One-liners">
        <ul className="list-disc space-y-1 pl-5">
          <li>Go is statically typed, compiled, and garbage-collected.</li>
          <li>Every file starts with <code>package X</code>; <code>main</code> is entry.</li>
          <li><code>:=</code> is the short variable declaration (function-scope only).</li>
          <li>Zero values everywhere — no <code>undefined</code>.</li>
          <li>Interfaces are satisfied implicitly.</li>
          <li>Errors are values. Wrap with <code>%w</code>.</li>
          <li><code>go</code> starts a goroutine; <code>chan</code> is the communication primitive.</li>
        </ul>
      </Section>

      <Section id="s2" title="2. Mnemonics">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>SCIM</strong> — <em>Slice, Channel, Interface, Map</em>: the four reference-y types.</li>
          <li><strong>CATS</strong> — always pass <em>Context, Args, Timeouts, State</em> to long ops.</li>
          <li><strong>SEE</strong> — every goroutine needs a <em>Start, Exit path, Error path</em>.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Rapid-recall card: SCIM, CATS, and SEE cover 80% of interview mistakes." />
      </Section>

      <Section id="s3" title="3. Interview Keywords">
        <p>Goroutine · Channel · Mutex · Context · Deadline · Panic vs error · Interface satisfaction · Embedding · Slice header · Escape analysis · GC pause · <code>go test -race</code>.</p>
      </Section>

      <Section id="s4" title="4. Common Syntax">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Task</th><th className="p-2 text-left">Snippet</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Variable</td><td className="p-2"><code>x := 10</code></td></tr>
            <tr className="border-b"><td className="p-2">Slice</td><td className="p-2"><code>s := []int{`{1,2}`}</code></td></tr>
            <tr className="border-b"><td className="p-2">Map</td><td className="p-2"><code>m := map[string]int{`{}`}</code></td></tr>
            <tr className="border-b"><td className="p-2">Goroutine</td><td className="p-2"><code>go f()</code></td></tr>
            <tr><td className="p-2">Channel</td><td className="p-2"><code>c := make(chan int)</code></td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s5" title="5. Quick Tables">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Slice vs Array</th><th className="p-2 text-left">Choose</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Dynamic size</td><td className="p-2">Slice</td></tr>
            <tr><td className="p-2">Fixed known size</td><td className="p-2">Array</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Channel workflow at a glance: producer → buffered channel → consumers." />
      </Section>

      <Section id="s6" title="6. Cheat Summaries">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Concurrency:</strong> share by communicating, not by sharing memory.</li>
          <li><strong>Errors:</strong> return them, wrap them, log them once at the boundary.</li>
          <li><strong>APIs:</strong> accept interfaces, return structs.</li>
        </ul>
      </Section>

      <Section id="review" title="Revision Review">
        <h3 className="font-semibold">Top Concepts</h3>
        <p>Goroutines, channels, interfaces, error wrapping, context propagation.</p>
        <h3 className="mt-3 font-semibold">Rapid Recall</h3>
        <p>Slice header (ptr, len, cap) · Map is unordered · Nil channel blocks forever.</p>
        <h3 className="mt-3 font-semibold">Interview Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you explain the memory model?</li>
          <li>Can you spot a race condition in a code snippet?</li>
          <li>Can you design a bounded worker pool?</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this enough for an interview?">Combine with the PDF Notes — this is refresh, not learn-from-scratch.</FAQItem>
        <FAQItem q="Do I need to memorise everything?">Only the tables and mnemonics.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Escape analysis</strong> — the compiler deciding heap vs stack allocation.</li>
          <li><strong>Deadlock</strong> — two goroutines waiting on each other forever.</li>
          <li><strong>Panic</strong> — an unrecoverable error; use only for truly exceptional cases.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Condensed for revision — do not rely on this alone for exam preparation. Refer to official
          documentation and the full PDF Notes for depth. Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
