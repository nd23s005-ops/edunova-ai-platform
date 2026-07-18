import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-quick-revision-notes",
  title: "System Design — Quick Revision Notes",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "7 min",
  pages: 9,
  lastUpdated: "March 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "Condensed System Design revision notes for last-minute interview prep and rapid concept recall — bullet summaries, mnemonics, and comparison tables.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Core Concepts" },
  { id: "s2", label: "2. Scalability" },
  { id: "s3", label: "3. Availability" },
  { id: "s4", label: "4. Databases" },
  { id: "s5", label: "5. Caching" },
  { id: "s6", label: "6. Load Balancing" },
  { id: "s7", label: "7. Microservices" },
  { id: "s8", label: "8. Cloud Architecture" },
  { id: "s9", label: "9. Final Revision Sheet" },
  { id: "review", label: "Revision Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — PDF Notes", tag: "CS Core", time: "61 min" },
  { title: "System Design — Cheat Sheet", tag: "CS Core", time: "4 min" },
  { title: "System Design — Beginner Guide", tag: "CS Core", time: "22 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-quick-revision-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-quick-revision-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Quickly revise System Design before an interview or exam.</li>
          <li>Refresh distributed systems vocabulary in minutes.</li>
          <li>Prepare with high-signal, low-word summaries.</li>
          <li>Improve concept retention through memory tricks.</li>
          <li>Build rapid architecture recall on demand.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Core Concepts">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Scalability</strong> — handle more load without redesign.</li>
          <li><strong>Availability</strong> — uptime, measured in 9s.</li>
          <li><strong>Reliability</strong> — correct behaviour under stress.</li>
          <li><strong>Consistency</strong> — everyone sees the same data.</li>
          <li><strong>Latency vs Throughput</strong> — speed vs volume.</li>
        </ul>
        <p className="mt-2"><strong>Mnemonic — SARCL:</strong> Scalability, Availability, Reliability, Consistency, Latency.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Revision map: five pillars of distributed system quality." />
      </Section>

      <Section id="s2" title="2. Scalability">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vertical = bigger box. Horizontal = more boxes.</li>
          <li>Stateless services scale horizontally with ease.</li>
          <li>Autoscale on queue depth, not CPU alone.</li>
          <li>Shard when a single node cannot hold the data.</li>
        </ul>
      </Section>

      <Section id="s3" title="3. Availability">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Nines</th><th className="p-2 text-left">Downtime / year</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">99%</td><td className="p-2">3.65 days</td></tr>
            <tr className="border-b"><td className="p-2">99.9%</td><td className="p-2">8.76 hours</td></tr>
            <tr className="border-b"><td className="p-2">99.95%</td><td className="p-2">4.38 hours</td></tr>
            <tr><td className="p-2">99.99%</td><td className="p-2">52.6 minutes</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s4" title="4. Databases">
        <ul className="list-disc space-y-1 pl-5">
          <li>SQL — ACID, joins, relational.</li>
          <li>NoSQL — flexible schema, horizontal scale.</li>
          <li>KV — Redis, DynamoDB.</li>
          <li>Document — MongoDB.</li>
          <li>Wide-column — Cassandra.</li>
          <li>Graph — Neo4j.</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Caching">
        <ul className="list-disc space-y-1 pl-5">
          <li>Patterns — cache-aside, write-through, write-behind.</li>
          <li>Eviction — LRU, LFU, TTL.</li>
          <li>Watch out for stampede + stale reads.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. Load Balancing">
        <ul className="list-disc space-y-1 pl-5">
          <li>L4 fast, L7 smart.</li>
          <li>Algorithms — round robin, least conn, consistent hashing.</li>
          <li>Health checks + sticky sessions where needed.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. Microservices">
        <ul className="list-disc space-y-1 pl-5">
          <li>One service, one bounded context.</li>
          <li>Async where possible, sync where needed.</li>
          <li>API gateway centralises cross-cutting concerns.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Cloud Architecture">
        <ul className="list-disc space-y-1 pl-5">
          <li>Multi-AZ = zone failure survival.</li>
          <li>Multi-region = regional failure survival.</li>
          <li>Managed services beat DIY for undifferentiated work.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Revision snapshot: multi-AZ cloud reference architecture." />
      </Section>

      <Section id="s9" title="9. Final Revision Sheet">
        <ul className="list-disc space-y-1 pl-5">
          <li>Always list functional + non-functional requirements first.</li>
          <li>Sketch the happy path, then the failure modes.</li>
          <li>Estimate QPS, storage, bandwidth before choosing tech.</li>
          <li>Name concrete technologies — vague answers lose points.</li>
        </ul>
      </Section>

      <Section id="review" title="Revision Review">
        <h3 className="font-semibold">Last-minute checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Latency numbers memorised (RAM, SSD, network hops).</li>
          <li>Can draw canonical architecture in 60 seconds.</li>
          <li>Know one canonical case study cold (URL shortener or feed).</li>
        </ul>
        <h3 className="mt-3 font-semibold">Top 50 concepts</h3>
        <p>Scalability, availability, reliability, consistency, latency, throughput, CAP, PACELC, CDN, cache-aside, write-through, LRU, LFU, TTL, load balancer, L4, L7, consistent hashing, sharding, replication, leader-follower, quorum, Raft, Paxos, message queue, Kafka, RabbitMQ, event-driven, CQRS, saga, outbox, microservices, API gateway, service mesh, JWT, OIDC, RBAC, ABAC, block/object/file storage, monitoring, logging, tracing, SLO, SLA, RPO, RTO, blue-green, canary, feature flag, chaos engineering.</p>
        <h3 className="mt-3 font-semibold">Interview revision</h3>
        <p>Speak in trade-offs, never in absolutes. Every choice has a cost — name it.</p>
        <h3 className="mt-3 font-semibold">Rapid recall sheet</h3>
        <p><strong>SARCL</strong> = quality pillars. <strong>Read-heavy</strong> = cache aggressively. <strong>Write-heavy</strong> = queue + shard. <strong>Global</strong> = CDN + multi-region.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How is this different from the PDF Notes?">The PDF Notes teach; these revise. Read them the night before an interview.</FAQItem>
        <FAQItem q="Should I memorise the top-50 list?">Yes — you should be able to define each in one sentence.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>QPS</strong> — queries per second.</li>
          <li><strong>Quorum</strong> — minimum agreeing nodes for a decision.</li>
          <li><strong>Saga</strong> — long-running distributed transaction via compensations.</li>
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
