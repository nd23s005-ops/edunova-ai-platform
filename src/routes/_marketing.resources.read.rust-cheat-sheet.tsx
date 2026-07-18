import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-cheat-sheet",
  title: "Rust — Cheat Sheet",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "5 min",
  pages: 2,
  lastUpdated: "June 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "Printable two-page Rust cheat sheet — syntax, ownership, borrowing, lifetimes, traits, Cargo, collections, error handling, async, macros.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Syntax" },
  { id: "s2", label: "2. Ownership Rules" },
  { id: "s3", label: "3. Borrowing" },
  { id: "s4", label: "4. Lifetimes" },
  { id: "s5", label: "5. Traits & Generics" },
  { id: "s6", label: "6. Cargo Commands" },
  { id: "s7", label: "7. Collections" },
  { id: "s8", label: "8. Error Handling" },
  { id: "s9", label: "9. Async Basics" },
  { id: "s10", label: "10. Macros" },
  { id: "s11", label: "11. Interview Reminders" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Quick Revision Notes", tag: "Programming", time: "9 min" },
  { title: "Rust — PDF Notes", tag: "Programming", time: "69 min" },
  { title: "Rust — Complete Tutorial", tag: "Programming", time: "41 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-cheat-sheet" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Keep every important Rust construct on one desk-side sheet.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Syntax">
        <Code lang="rust">{`let x = 5;              let mut y = 10;
const PI: f64 = 3.14;   static NAME: &str = "N";
if c {} else {}         while c {}   loop {}
for i in 0..10 {}       match x { 1 => .., _ => .. }
fn add(a:i32,b:i32)->i32 { a+b }`}</Code>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Rust syntax landscape on a single page." />
      </Section>

      <Section id="s2" title="2. Ownership Rules">
        <ul className="list-disc space-y-1 pl-5">
          <li>Each value has one owner.</li>
          <li>Ownership moves on assignment (unless Copy).</li>
          <li>Value dropped when owner leaves scope.</li>
        </ul>
      </Section>

      <Section id="s3" title="3. Borrowing">
        <p>Many <code>&amp;T</code> XOR one <code>&amp;mut T</code>. No dangling.</p>
      </Section>

      <Section id="s4" title="4. Lifetimes">
        <Code lang="rust">{`fn f<'a>(x: &'a str, y: &'a str) -> &'a str { .. }`}</Code>
      </Section>

      <Section id="s5" title="5. Traits & Generics">
        <Code lang="rust">{`trait Area { fn area(&self) -> f64; }
fn show<T: Area>(t: &T) { println!("{}", t.area()); }`}</Code>
      </Section>

      <Section id="s6" title="6. Cargo Commands">
        <Code lang="bash">{`cargo new / build / run / test / bench
cargo add serde && cargo update
cargo clippy && cargo fmt`}</Code>
      </Section>

      <Section id="s7" title="7. Collections">
        <p><code>Vec&lt;T&gt;</code>, <code>String</code>, <code>HashMap&lt;K,V&gt;</code>, <code>HashSet&lt;T&gt;</code>, <code>BTreeMap</code>, <code>VecDeque</code>.</p>
      </Section>

      <Section id="s8" title="8. Error Handling">
        <Code lang="rust">{`fn read() -> Result<String, io::Error> {
    let s = fs::read_to_string("f")?;
    Ok(s)
}`}</Code>
      </Section>

      <Section id="s9" title="9. Async Basics">
        <Code lang="rust">{`#[tokio::main]
async fn main() { let r = fetch().await; }`}</Code>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Async task lifecycle: pending → polled → ready." />
      </Section>

      <Section id="s10" title="10. Macros">
        <p><code>println!</code>, <code>vec!</code>, <code>format!</code>, <code>dbg!</code>, <code>assert!</code>, custom via <code>macro_rules!</code>.</p>
      </Section>

      <Section id="s11" title="11. Interview Reminders">
        <ul className="list-disc space-y-1 pl-5">
          <li>Rc vs Arc: single- vs multi-thread reference counting.</li>
          <li>Mutex vs RwLock: exclusive vs shared-read locks.</li>
          <li><code>?</code> desugars to match + return.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Two pages. Print, laminate, keep on your desk.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Missing something?">The Quick Revision Notes go one level deeper.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>?</strong> — early-return on <code>Err</code>.</li>
          <li><strong>Copy</strong> — trait for bitwise-duplicable types.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Reference only — pair with practice.</p>
      </Section>
    </ReaderShell>
  );
}
