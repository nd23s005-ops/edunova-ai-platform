import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-cheat-sheet",
  title: "System Design — Cheat Sheet",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "4 min",
  pages: 4,
  lastUpdated: "October 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A printable one-page System Design cheat sheet — patterns, formulas, checklists, and interview reminders for daily engineering reference.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Design Principles" },
  { id: "s2", label: "2. Scalability Patterns" },
  { id: "s3", label: "3. Databases" },
  { id: "s4", label: "4. Caching" },
  { id: "s5", label: "5. Load Balancing" },
  { id: "s6", label: "6. Networking" },
  { id: "s7", label: "7. Cloud Components" },
  { id: "s8", label: "8. Availability" },
  { id: "s9", label: "9. Security" },
  { id: "s10", label: "10. Quick Reference" },
  { id: "review", label: "Cheat Sheet Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — PDF Notes", tag: "CS Core", time: "61 min" },
  { title: "System Design — Quick Revision Notes", tag: "CS Core", time: "7 min" },
  { title: "System Design — Complete Tutorial", tag: "CS Core", time: "51 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-cheat-sheet" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reach for a single page instead of a textbook.</li>
          <li>Remember architecture patterns at a glance.</li>
          <li>Improve engineering productivity during design reviews.</li>
          <li>Reduce common design mistakes.</li>
          <li>Keep a daily technical reference on your desk.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Design Principles">
        <ul className="list-disc space-y-1 pl-5">
          <li>Single responsibility · Loose coupling · High cohesion.</li>
          <li>Design for failure · Automate everything · Keep it boring.</li>
        </ul>
      </Section>

      <Section id="s2" title="2. Scalability Patterns">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Pattern</th><th className="p-2 text-left">Use when</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Horizontal scale</td><td className="p-2">Stateless services, unbounded growth</td></tr>
            <tr className="border-b"><td className="p-2">Sharding</td><td className="p-2">Dataset exceeds a single node</td></tr>
            <tr className="border-b"><td className="p-2">Read replicas</td><td className="p-2">Read-heavy workloads</td></tr>
            <tr><td className="p-2">CQRS</td><td className="p-2">Divergent read/write shapes</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Cheat-sheet snapshot: scalability patterns at a glance." />
      </Section>

      <Section id="s3" title="3. Databases">
        <ul className="list-disc space-y-1 pl-5">
          <li>SQL — transactions, joins, reporting.</li>
          <li>KV — sessions, config, hot lookups.</li>
          <li>Document — semi-structured content.</li>
          <li>Wide-column — huge writes, time series.</li>
          <li>Graph — relationships-first queries.</li>
        </ul>
        <p className="mt-2"><strong>CAP quick pick:</strong> money → CP · feeds → AP.</p>
      </Section>

      <Section id="s4" title="4. Caching">
        <ul className="list-disc space-y-1 pl-5">
          <li>cache-aside · write-through · write-behind.</li>
          <li>LRU / LFU / TTL — pick one, document it.</li>
          <li>Guard against stampede with request coalescing.</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Load Balancing">
        <ul className="list-disc space-y-1 pl-5">
          <li>Round robin — default.</li>
          <li>Least connections — long-lived requests.</li>
          <li>Consistent hashing — sticky sharding.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. Networking">
        <ul className="list-disc space-y-1 pl-5">
          <li>DNS TTL — plan for propagation delays.</li>
          <li>TLS 1.3 everywhere.</li>
          <li>HTTP/2 or HTTP/3 for modern clients.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. Cloud Components">
        <ul className="list-disc space-y-1 pl-5">
          <li>Compute — VM, container, function.</li>
          <li>Storage — block, object, file.</li>
          <li>Networking — VPC, subnets, gateways.</li>
          <li>Managed data — RDS, DynamoDB, Redis, Kafka.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Cloud components map: the LEGO bricks of every modern system." />
      </Section>

      <Section id="s8" title="8. Availability">
        <p>99.9 = 8.76 h/yr · 99.95 = 4.38 h/yr · 99.99 = 52.6 min/yr.</p>
      </Section>

      <Section id="s9" title="9. Security">
        <ul className="list-disc space-y-1 pl-5">
          <li>TLS everywhere · MFA for privileged users.</li>
          <li>Secrets in a vault, never in Git.</li>
          <li>Least privilege IAM, audited quarterly.</li>
        </ul>
      </Section>

      <Section id="s10" title="10. Quick Reference">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Symptom</th><th className="p-2 text-left">First lever</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">High p99 latency</td><td className="p-2">Add a cache, check GC / connection pool</td></tr>
            <tr className="border-b"><td className="p-2">DB CPU pegged</td><td className="p-2">Add read replicas, fix N+1 queries</td></tr>
            <tr className="border-b"><td className="p-2">Runaway queue</td><td className="p-2">Scale consumers, add backpressure</td></tr>
            <tr><td className="p-2">Global slowness</td><td className="p-2">Move static content to CDN</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="review" title="Cheat Sheet Review">
        <h3 className="font-semibold">Printable summary</h3>
        <p>Print this page double-sided; it fits on two A4 sheets.</p>
        <h3 className="mt-3 font-semibold">Top architecture patterns</h3>
        <p>Cache-aside · sharding · leader-follower · CQRS · saga · outbox · circuit breaker.</p>
        <h3 className="mt-3 font-semibold">Quick lookup guide</h3>
        <p>Symptom-to-lever table above is deliberately opinionated — treat it as a starting point in incident reviews.</p>
        <h3 className="mt-3 font-semibold">Daily developer reference</h3>
        <p>Pin this cheat sheet near your desk; skim before every design review.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this a substitute for real study?">No — it's a reference. Read the PDF Notes to actually learn the material.</FAQItem>
        <FAQItem q="Can I use it in an interview?">Only in your head. Practice enough that the sheet lives in memory.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>CQRS</strong> — Command Query Responsibility Segregation.</li>
          <li><strong>Outbox</strong> — pattern for reliable event publication from a transactional DB.</li>
          <li><strong>Circuit breaker</strong> — stop calling a failing dependency to avoid cascading failure.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards,
          and trusted educational resources. System Design principles, distributed systems,
          cloud platforms, and scalability practices evolve continuously — readers should
          consult official documentation for the latest recommendations. All trademarks,
          product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
