import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-reference-guide",
  title: "System Design — Reference Guide",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "18 min",
  pages: 34,
  lastUpdated: "September 2026",
  tags: ["System Design", "Architecture Reference"],
  heroImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1800&q=80",
  heroSubtitle:
    "A daily System Design reference — decision matrices, comparison tables, technology selection guides, and production checklists for working engineers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Architecture Decision Matrix" },
  { id: "c2", label: "2. Scalability Reference" },
  { id: "c3", label: "3. Database Selection Guide" },
  { id: "c4", label: "4. SQL vs NoSQL" },
  { id: "c5", label: "5. Cache Selection" },
  { id: "c6", label: "6. Load Balancer Comparison" },
  { id: "c7", label: "7. API Design Standards" },
  { id: "c8", label: "8. Distributed Systems" },
  { id: "c9", label: "9. Cloud Services" },
  { id: "c10", label: "10. Security Reference" },
  { id: "c11", label: "11. Monitoring Stack" },
  { id: "c12", label: "12. Performance Optimization" },
  { id: "c13", label: "13. Reliability Patterns" },
  { id: "c14", label: "14. Production Checklist" },
  { id: "c15", label: "15. Technology Comparison Tables" },
  { id: "c16", label: "16. Decision Frameworks" },
  { id: "review", label: "Reference Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Advanced Concepts", tag: "CS Core", time: "32 min" },
  { title: "System Design — Glossary", tag: "CS Core", time: "11 min" },
  { title: "System Design — Cheat Sheet", tag: "CS Core", time: "4 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/resources/read/sd-reference-guide" },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-reference-guide" }],
  }),
  component: Page,
});

function Row({ cells }: { cells: string[] }) {
  return (
    <tr className="border-b">
      {cells.map((c, i) => (<td key={i} className="p-2 align-top">{c}</td>))}
    </tr>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Build a professional reference library for design reviews.</li>
          <li>Compare architecture patterns side-by-side.</li>
          <li>Select appropriate technologies using clear matrices.</li>
          <li>Improve engineering decisions with structured checklists.</li>
          <li>Increase productivity by looking up instead of memorising.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Architecture Decision Matrix">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Style</th><th className="p-2 text-left">Choose when</th><th className="p-2 text-left">Avoid when</th></tr></thead>
          <tbody>
            <Row cells={["Modular Monolith", "Small team, fast iteration", "Independent scaling needed"]} />
            <Row cells={["Microservices", "Many teams, independent lifecycles", "Team size < 20"]} />
            <Row cells={["Serverless", "Bursty, unpredictable load", "Steady, latency-critical workloads"]} />
            <Row cells={["Event-Driven", "Loose coupling, async workflows", "Simple synchronous CRUD"]} />
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Architecture decision matrix mapped onto a reference enterprise system." />
      </Section>

      <Section id="c2" title="2. Scalability Reference">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Symptom</th><th className="p-2 text-left">First lever</th></tr></thead>
          <tbody>
            <Row cells={["High p99 latency", "Add cache / fix pool sizing"]} />
            <Row cells={["DB CPU saturated", "Add read replicas, fix N+1"]} />
            <Row cells={["Queue backlog", "Scale consumers, add backpressure"]} />
            <Row cells={["Global slowness", "CDN static assets, edge routing"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c3" title="3. Database Selection Guide">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Workload</th><th className="p-2 text-left">Recommended</th></tr></thead>
          <tbody>
            <Row cells={["OLTP with relations", "PostgreSQL, MySQL"]} />
            <Row cells={["Session / KV lookup", "Redis, DynamoDB"]} />
            <Row cells={["Wide-column, high write", "Cassandra, ScyllaDB"]} />
            <Row cells={["Full-text search", "OpenSearch / Elasticsearch"]} />
            <Row cells={["Time series", "TimescaleDB, InfluxDB"]} />
            <Row cells={["Graph relationships", "Neo4j, Neptune"]} />
            <Row cells={["Analytics / OLAP", "ClickHouse, BigQuery, Snowflake"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c4" title="4. SQL vs NoSQL">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Aspect</th><th className="p-2 text-left">SQL</th><th className="p-2 text-left">NoSQL</th></tr></thead>
          <tbody>
            <Row cells={["Schema", "Strict", "Flexible"]} />
            <Row cells={["Joins", "Native", "App-side"]} />
            <Row cells={["Transactions", "Strong", "Varies"]} />
            <Row cells={["Scale-out", "Harder", "Native"]} />
            <Row cells={["Best for", "Business data", "High-volume denormalised"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c5" title="5. Cache Selection">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Need</th><th className="p-2 text-left">Choose</th></tr></thead>
          <tbody>
            <Row cells={["Rich data types, pub/sub", "Redis"]} />
            <Row cells={["Simple, sharded KV", "Memcached"]} />
            <Row cells={["Global edge cache", "Cloudflare / Fastly / CloudFront"]} />
            <Row cells={["Local in-process", "Caffeine (JVM), lru-cache (Node)"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c6" title="6. Load Balancer Comparison">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Type</th><th className="p-2 text-left">Best for</th></tr></thead>
          <tbody>
            <Row cells={["NLB (L4)", "TCP/UDP, ultra-low latency"]} />
            <Row cells={["ALB (L7)", "HTTP, path/header routing, TLS termination"]} />
            <Row cells={["HAProxy / Nginx / Envoy", "Self-hosted L4+L7"]} />
            <Row cells={["Global anycast LB", "Multi-region traffic steering"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c7" title="7. API Design Standards">
        <ul className="list-disc space-y-1 pl-5">
          <li>Version APIs from day one (<code>/v1/...</code>).</li>
          <li>Use plural nouns, HTTP verbs, appropriate status codes.</li>
          <li>Idempotency keys on all money-moving POSTs.</li>
          <li>Consistent error envelopes: <code>{`{ code, message, details }`}</code>.</li>
          <li>Paginate everything that can grow.</li>
        </ul>
      </Section>

      <Section id="c8" title="8. Distributed Systems">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Concern</th><th className="p-2 text-left">Reference technique</th></tr></thead>
          <tbody>
            <Row cells={["Leader election", "Raft / etcd"]} />
            <Row cells={["Ordering", "Kafka partitions"]} />
            <Row cells={["Distributed lock", "Redlock (with caveats), etcd lease"]} />
            <Row cells={["Long-running transaction", "Saga (orchestrated / choreographed)"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c9" title="9. Cloud Services">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Capability</th><th className="p-2 text-left">AWS</th><th className="p-2 text-left">GCP</th><th className="p-2 text-left">Azure</th></tr></thead>
          <tbody>
            <Row cells={["Managed K8s", "EKS", "GKE", "AKS"]} />
            <Row cells={["Serverless func", "Lambda", "Cloud Functions", "Functions"]} />
            <Row cells={["Object storage", "S3", "GCS", "Blob Storage"]} />
            <Row cells={["Managed SQL", "RDS / Aurora", "Cloud SQL / Spanner", "Azure SQL"]} />
            <Row cells={["Managed queue", "SQS / SNS", "Pub/Sub", "Service Bus"]} />
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Cross-cloud service map: pick capability first, vendor second." />
      </Section>

      <Section id="c10" title="10. Security Reference">
        <ul className="list-disc space-y-1 pl-5">
          <li>TLS 1.2+ everywhere, mTLS internally.</li>
          <li>Secrets in a vault (KMS, Secrets Manager) — never in Git.</li>
          <li>Least-privilege IAM audited quarterly.</li>
          <li>OWASP Top 10 covered by SAST/DAST in CI.</li>
        </ul>
      </Section>

      <Section id="c11" title="11. Monitoring Stack">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Signal</th><th className="p-2 text-left">Stack</th></tr></thead>
          <tbody>
            <Row cells={["Metrics", "Prometheus + Grafana / Datadog"]} />
            <Row cells={["Logs", "Loki / ELK / Splunk"]} />
            <Row cells={["Traces", "OpenTelemetry + Jaeger / Tempo"]} />
            <Row cells={["RUM", "Datadog RUM / New Relic Browser"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c12" title="12. Performance Optimization">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Measure first — never guess the bottleneck.</li>
          <li>Fix the biggest single cost before micro-optimising.</li>
          <li>Cache reads, batch writes, denormalise where it hurts.</li>
          <li>Push work to the edge / async pipelines.</li>
          <li>Right-size machines; over-provisioning hides real bugs.</li>
        </ol>
      </Section>

      <Section id="c13" title="13. Reliability Patterns">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Pattern</th><th className="p-2 text-left">Purpose</th></tr></thead>
          <tbody>
            <Row cells={["Circuit Breaker", "Stop calling a failing dependency"]} />
            <Row cells={["Bulkhead", "Isolate resource pools"]} />
            <Row cells={["Retry + Backoff + Jitter", "Recover from transient errors"]} />
            <Row cells={["Timeout everywhere", "Prevent stuck resources"]} />
            <Row cells={["Idempotency Key", "Safe retries of writes"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c14" title="14. Production Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>Runbooks for every alert.</li>
          <li>SLOs and error budgets defined and published.</li>
          <li>DR drill executed within the last quarter.</li>
          <li>Secrets rotated within policy window.</li>
          <li>Autoscaling tested under load.</li>
          <li>Rollback proven in staging.</li>
        </ul>
      </Section>

      <Section id="c15" title="15. Technology Comparison Tables">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Category</th><th className="p-2 text-left">Options</th></tr></thead>
          <tbody>
            <Row cells={["Message brokers", "Kafka · RabbitMQ · NATS · SQS · Pub/Sub"]} />
            <Row cells={["API gateways", "Kong · Envoy · APIGee · AWS API Gateway"]} />
            <Row cells={["Service meshes", "Istio · Linkerd · Consul Connect"]} />
            <Row cells={["Search engines", "OpenSearch · Elasticsearch · Meilisearch · Typesense"]} />
          </tbody>
        </table>
      </Section>

      <Section id="c16" title="16. Decision Frameworks">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Trade-off triangle:</strong> latency, consistency, availability — pick two to optimise for.</li>
          <li><strong>Build vs buy:</strong> if it's not a differentiator, buy managed.</li>
          <li><strong>Reversibility test:</strong> reversible decisions can be made fast; irreversible ones deserve a design doc.</li>
          <li><strong>Boring tech budget:</strong> spend novelty carefully — one exotic dependency at a time.</li>
        </ul>
      </Section>

      <Section id="review" title="Reference Review">
        <h3 className="font-semibold">Daily engineering reference</h3>
        <p>Bookmark chapters 1, 2, and 14. They cover 80% of the day-to-day design and review workload.</p>
        <h3 className="mt-3 font-semibold">Architecture decision checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Have you named the invariant this design protects?</li>
          <li>Have you enumerated three failure modes and their mitigations?</li>
          <li>Have you sized the load with concrete numbers?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Production readiness checklist</h3>
        <p>Use section 14 verbatim before every launch review.</p>
        <h3 className="mt-3 font-semibold">Quick lookup tables</h3>
        <p>Sections 3–9 are optimised for grab-and-go decisions during design meetings.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Should I memorise these tables?">No — memorise the categories, look up the details.</FAQItem>
        <FAQItem q="How often is this updated?">Cloud vendor names drift; core patterns are stable across decades.</FAQItem>
        <FAQItem q="Can I use this during interviews?">Only mentally. Practice referencing tables aloud so they surface naturally.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>OLTP</strong> — Online Transactional Processing.</li>
          <li><strong>OLAP</strong> — Online Analytical Processing.</li>
          <li><strong>RUM</strong> — Real User Monitoring.</li>
          <li><strong>SAST / DAST</strong> — Static / Dynamic Application Security Testing.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards,
          and trusted educational resources. System Design principles, cloud platforms,
          distributed systems, Kubernetes ecosystems, and engineering best practices evolve
          continuously — readers should consult official documentation for the latest guidance
          and implementation recommendations. All trademarks, product names, logos, and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
