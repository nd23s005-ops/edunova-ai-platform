import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-common-mistakes",
  title: "Rust — Common Mistakes",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "14 min",
  pages: 20,
  lastUpdated: "October 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1800&q=80",
  heroSubtitle: "The Rust mistakes we all make — compiler errors decoded, ownership traps, lifetime confusion, concurrency bugs, async pitfalls, and how to fix each one.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Compiler Errors Decoded" },
  { id: "s2", label: "2. Ownership Mistakes" },
  { id: "s3", label: "3. Borrowing Traps" },
  { id: "s4", label: "4. Lifetime Errors" },
  { id: "s5", label: "5. Concurrency Bugs" },
  { id: "s6", label: "6. Async Pitfalls" },
  { id: "s7", label: "7. Cargo Mistakes" },
  { id: "s8", label: "8. Debugging Techniques" },
  { id: "flow", label: "Flowchart" },
  { id: "best", label: "Best Practices" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Best Practices", tag: "Programming", time: "16 min" },
  { title: "Rust — FAQ", tag: "Programming", time: "10 min" },
  { title: "Rust — Tips & Tricks", tag: "Programming", time: "8 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-common-mistakes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-common-mistakes" }],
  }),
  component: Page,
});

function WrongRight({ wrong, right, note }: { wrong: string; right: string; note?: string }) {
  return (
    <div className="my-4 grid gap-3 md:grid-cols-2">
      <div>
        <div className="text-xs font-semibold text-red-500">❌ Wrong</div>
        <Code lang="rust">{wrong}</Code>
      </div>
      <div>
        <div className="text-xs font-semibold text-emerald-500">✅ Correct</div>
        <Code lang="rust">{right}</Code>
      </div>
      {note ? <p className="col-span-full text-sm text-muted-foreground">{note}</p> : null}
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Recognize the top Rust errors on sight.</li>
          <li>Fix them with idiomatic patterns.</li>
          <li>Build a debugging habit that scales.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Compiler Errors Decoded">
        <p>Rust's compiler is your best pair programmer. Read the "help:" section first.</p>
        <Figure src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80" caption="Figure 1 — Read compiler diagnostics top-to-bottom before Googling." />
      </Section>

      <Section id="s2" title="2. Ownership Mistakes">
        <WrongRight
          wrong={`let s = String::from("hi");
let t = s;
println!("{s}"); // moved`}
          right={`let s = String::from("hi");
let t = s.clone();
println!("{s}, {t}");`}
          note="Clone when both bindings must remain valid; otherwise borrow."
        />
      </Section>

      <Section id="s3" title="3. Borrowing Traps">
        <WrongRight
          wrong={`let mut v = vec![1,2,3];
let r = &v[0];
v.push(4);
println!("{r}");`}
          right={`let mut v = vec![1,2,3];
{ let r = &v[0]; println!("{r}"); }
v.push(4);`}
        />
      </Section>

      <Section id="s4" title="4. Lifetime Errors">
        <WrongRight
          wrong={`fn first(s: &String) -> &str { &s[..1] }
let out;
{ let s = String::from("hi"); out = first(&s); }
println!("{out}");`}
          right={`let s = String::from("hi");
let out = &s[..1];
println!("{out}");`}
        />
      </Section>

      <Section id="s5" title="5. Concurrency Bugs">
        <p>Deadlocks come from lock ordering; race conditions come from unbounded channels.</p>
        <WrongRight
          wrong={`let a = Mutex::new(0); let b = Mutex::new(0);
// Thread 1: lock a then b
// Thread 2: lock b then a  ← deadlock`}
          right={`// Establish a canonical lock order across the codebase.`}
        />
      </Section>

      <Section id="s6" title="6. Async Pitfalls">
        <WrongRight
          wrong={`#[tokio::main]
async fn main() {
    std::thread::sleep(std::time::Duration::from_secs(2));
}`}
          right={`tokio::time::sleep(Duration::from_secs(2)).await;`}
          note="Blocking calls stall the async runtime — use async equivalents or spawn_blocking."
        />
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Never block the executor." />
      </Section>

      <Section id="s7" title="7. Cargo Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vendoring giant crates instead of tuning features.</li>
          <li>Skipping <code>Cargo.lock</code> commits for binaries.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Debugging Techniques">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>dbg!()</code> is your friend — better than <code>println!</code>.</li>
          <li>Use <code>RUST_BACKTRACE=1</code> for panic traces.</li>
          <li>Try <code>cargo expand</code> to see macro output.</li>
        </ul>
      </Section>

      <Section id="flow" title="Flowchart">
        <Code lang="text">{`error → read diagnostic → hypothesize → minimize repro → fix → add test`}</Code>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Trust the compiler; it usually names the fix.</li>
          <li>Reproduce in a minimal <code>cargo new</code>.</li>
        </ul>
        <Callout tone="tip" title="Tip">Add <code>#[deny(clippy::pedantic)]</code> in scratch crates to level up faster.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Every Rust mistake has a well-worn fix. Read errors carefully, and reach for idioms before workarounds.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Why so many lifetime errors early on?">You're still learning the aliasing rule — it clicks after a week.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Snippets are illustrative; production code needs error handling.</p>
      </Section>
    </ReaderShell>
  );
}
