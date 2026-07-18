import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-project-case-study",
  title: "DBMS — Project Case Study",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "30 min",
  pages: 45,
  lastUpdated: "April 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  heroSubtitle:
    "How Meridian Retail replaced a fragile MySQL monolith with a partitioned Postgres platform — architecture decisions, schema evolution, tuning wins, and business impact.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Business Background" },
  { id: "c2", label: "2. Business Requirements" },
  { id: "c3", label: "3. Project Goals" },
  { id: "c4", label: "4. Database Architecture" },
  { id: "c5", label: "5. ER Model" },
  { id: "c6", label: "6. Schema Design" },
  { id: "c7", label: "7. SQL Development" },
  { id: "c8", label: "8. Database Optimization" },
  { id: "c9", label: "9. Security" },
  { id: "c10", label: "10. Testing" },
  { id: "c11", label: "11. Deployment" },
  { id: "c12", label: "12. Monitoring" },
  { id: "c13", label: "13. Business Results" },
  { id: "c14", label: "14. Lessons Learned" },
  { id: "c15", label: "15. Future Enhancements" },
  { id: "review", label: "Case Study Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Project Guide", tag: "CS Core", time: "22 min" },
  { title: "DBMS — Advanced Concepts", tag: "CS Core", time: "38 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-project-case-study" }],
  }),
  component: Page,
});

function Code({ children }: { children: string }) {
  return <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs leading-relaxed"><code>{children}</code></pre>;
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-4 text-center">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
      <p className="text-xs text-primary">{delta}</p>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Read a production database rebuild the way senior engineers do.</li>
          <li>Map business KPIs to architectural decisions.</li>
          <li>See how schema evolves in the real world, not on paper.</li>
          <li>Identify tuning wins with measurable impact.</li>
          <li>Extract lessons you can apply to your own project.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
          caption="Meridian Retail — a mid-sized omnichannel retailer with 220 stores and a growing online business."
        />
        <Callout tone="note" title="Executive summary">
          Meridian migrated from a single MySQL 5.7 instance to a partitioned Postgres 16 cluster with read replicas. Peak checkout latency dropped from 1.9 s to 210 ms; the database powered a 42% online revenue lift in 12 months.
        </Callout>
      </Section>

      <Section id="c1" title="1. Business Background">
        <p>Meridian Retail sells fashion across India, the UK, and the UAE. The pre-project stack — a single MySQL 5.7 primary, cron-driven ETL, a Redis cache, and a legacy ERP — struggled during festive peaks. A Diwali weekend outage that lost ₹12 crore of orders triggered the rebuild.</p>
        <p><strong>Project timeline:</strong> discovery (4 weeks) · design (6 weeks) · build (14 weeks) · migrate (6 weeks) · stabilise (8 weeks). Total: 38 weeks, one dedicated staff engineer, three application engineers, and one SRE.</p>
      </Section>

      <Section id="c2" title="2. Business Requirements">
        <ul className="list-disc space-y-1 pl-5">
          <li>P95 checkout latency &lt; 300 ms under 5x peak load.</li>
          <li>Zero-downtime deployments during business hours.</li>
          <li>Regional data residency for the UK (GDPR).</li>
          <li>Full audit trail for finance reconciliation.</li>
          <li>Reporting decoupled from the transactional workload.</li>
        </ul>
      </Section>

      <Section id="c3" title="3. Project Goals">
        <p><strong>Technical:</strong> replace the monolith with a horizontally-scaled OLTP core + a read-only reporting cluster. <strong>Operational:</strong> introduce blue/green deployments, PITR, and observability. <strong>Business:</strong> unlock a 2x online growth roadmap without emergency capacity work.</p>
      </Section>

      <Section id="c4" title="4. Database Architecture">
        <p>Chosen stack:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>PostgreSQL 16 (managed) as the primary OLTP store.</li>
          <li>Three cross-AZ read replicas per region.</li>
          <li>PgBouncer for connection pooling (transaction mode).</li>
          <li>pglogical replication into a data warehouse (Snowflake).</li>
          <li>Redis for hot inventory counters and session data.</li>
          <li>Object storage for images and static assets.</li>
        </ul>
        <p>Regional isolation: EU cluster in Frankfurt, IN cluster in Mumbai, UAE routed via Frankfurt with data-tagging for compliance.</p>
      </Section>

      <Section id="c5" title="5. ER Model">
        <p>Core entities: <em>Customer, Address, Product, Variant, Inventory, Cart, Order, OrderItem, Payment, Shipment, Return, LoyaltyAccount, Store</em>. Cardinalities were captured in a Mermaid ER file checked into the repo and reviewed at every schema change.</p>
      </Section>

      <Section id="c6" title="6. Schema Design">
        <p>Highlights:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Orders partitioned by <em>RANGE (created_at)</em> monthly — 24 months live, older months detached to cold storage.</li>
          <li>OrderItems partitioned by hash on <em>order_id</em> to spread hot rows across 8 partitions.</li>
          <li>Immutable payment events; corrections modelled as reversal events, never in-place updates.</li>
          <li>Money stored as <em>NUMERIC(12,2)</em>; currency codes referenced via a lookup table.</li>
          <li>Soft delete only where regulation requires; audit lives in a separate append-only schema.</li>
        </ul>
        <Code>{`CREATE TABLE orders (
  id UUID PRIMARY KEY,
  customer_id BIGINT REFERENCES customers(id),
  total NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2026_04 PARTITION OF orders
  FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');`}</Code>
      </Section>

      <Section id="c7" title="7. SQL Development">
        <p>Every query used by the checkout path was reviewed like source code — plan captured, cost annotated, tests added. Rewrites included:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>OFFSET-based order history → keyset pagination on <code>(customer_id, created_at DESC, id DESC)</code>.</li>
          <li>Correlated “last order” subquery → LATERAL join with LIMIT 1.</li>
          <li>N+1 reads in email service → single JOIN via a batched read repository.</li>
        </ul>
      </Section>

      <Section id="c8" title="8. Database Optimization">
        <p>Wins measured against the old MySQL primary:</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Metric label="Cart read P95" value="34 ms" delta="↓ 87%" />
          <Metric label="Checkout P95" value="210 ms" delta="↓ 89%" />
          <Metric label="Inventory update P95" value="18 ms" delta="↓ 71%" />
          <Metric label="Reporting query time" value="2.4 s" delta="↓ 94%" />
          <Metric label="Peak QPS handled" value="42k" delta="↑ 6×" />
          <Metric label="Storage after compression" value="1.9 TB" delta="↓ 38%" />
        </div>
      </Section>

      <Section id="c9" title="9. Security">
        <ul className="list-disc space-y-1 pl-5">
          <li>Row-level security so store staff read only their store's orders.</li>
          <li>Column encryption for PII (email, phone) using pgcrypto + KMS.</li>
          <li>TLS everywhere; certificate pinning for internal services.</li>
          <li>Quarterly access review; automated revocation on employee offboarding.</li>
        </ul>
      </Section>

      <Section id="c10" title="10. Testing">
        <p>Migration was tested with production-shape data on a shadow cluster. Every query in the checkout flow had a plan-diff test — CI failed when a plan regressed by more than 20%. Chaos drills verified failover in under 60 seconds.</p>
      </Section>

      <Section id="c11" title="11. Deployment">
        <p>Blue/green with logical replication: writes dual-written for one week, reads shadowed for two, and only after error-rate parity did traffic cut over. Rollback plan: reverse dual-write, then flip DNS.</p>
      </Section>

      <Section id="c12" title="12. Monitoring">
        <p>Observability stack: <code>pg_stat_statements</code> + Prometheus exporter, Grafana dashboards, PagerDuty on-call, structured slow-query logs, and quarterly “DB game days”. Alerts tuned to symptoms (latency, error rate) rather than causes.</p>
      </Section>

      <Section id="c13" title="13. Business Results">
        <ul className="list-disc space-y-1 pl-5">
          <li>Peak-day cart abandonment fell from 34% to 21%.</li>
          <li>Online revenue grew 42% year-over-year.</li>
          <li>Reconciliation errors dropped by an order of magnitude.</li>
          <li>Engineering carrying-cost per incident fell by 60%.</li>
        </ul>
      </Section>

      <Section id="c14" title="14. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Partitioning is a strategy, not a tactic — plan retention up front.</li>
          <li>Feature flags on schema changes save careers.</li>
          <li>Observability is table stakes; do not defer it.</li>
          <li>Keep the transactional and reporting workloads apart.</li>
          <li>Documentation halves the on-call load.</li>
        </ul>
      </Section>

      <Section id="c15" title="15. Future Enhancements">
        <p>Explore distributed Postgres (Citus or CockroachDB) for the next 10× scale, adopt vector search (pgvector) for personalised discovery, and pilot cross-region active-active for the loyalty subsystem.</p>
      </Section>

      <Section id="review" title="Case Study Review">
        <p><strong>Engineering insights:</strong> the biggest wins came from schema and query rewrites, not hardware.</p>
        <p><strong>Architecture review:</strong> a bounded blast radius (regional isolation) mattered more than absolute throughput.</p>
        <p><strong>Discussion questions:</strong></p>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Why did Meridian choose Postgres over sharded MySQL?</li>
          <li>Where does hash partitioning shine — and where does it hurt?</li>
          <li>What single change unlocked the biggest latency win?</li>
        </ul>
        <p><strong>Reflection activities:</strong> map your own project against Meridian's KPI table and identify the top three risks.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is Meridian a real company?">A composite of engagements — anonymised for teaching, numbers reflect realistic industry benchmarks.</FAQItem>
        <FAQItem q="Could a small team do this?">Yes — the same pattern applies at smaller scale; skip regional isolation until compliance demands it.</FAQItem>
        <FAQItem q="Is this a substitute for the Project Guide?">No — the Guide teaches the process, the Case Study shows one team's outcome.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, MariaDB documentation</li>
          <li>Oracle Learning, Microsoft Learn, PostgreSQL Wiki</li>
          <li>Silberschatz, Korth & Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>CMU 15-445, MIT OCW 6.830, Stanford CS245</li>
          <li>ACM Digital Library, IEEE Xplore</li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted educational
          resources. The organisation and metrics in this case study are illustrative and do not represent any
          specific company. Database technologies, SQL standards, vendor implementations, and best practices
          evolve continuously — consult official vendor documentation for the latest information. All
          trademarks, product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
