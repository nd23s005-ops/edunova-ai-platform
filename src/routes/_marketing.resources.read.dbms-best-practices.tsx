import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-best-practices",
  title: "DBMS — Best Practices",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "19 min",
  pages: 15,
  lastUpdated: "September 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1800&q=80",
  heroSubtitle:
    "A practical engineering handbook for designing, developing, deploying, securing, and scaling relational databases the way seasoned teams actually do it in production.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Database Design Standards" },
  { id: "c2", label: "2. Naming Conventions" },
  { id: "c3", label: "3. Schema Organization" },
  { id: "c4", label: "4. SQL Coding Guidelines" },
  { id: "c5", label: "5. Constraint Design" },
  { id: "c6", label: "6. Indexing Strategies" },
  { id: "c7", label: "7. Query Optimization" },
  { id: "c8", label: "8. Transaction Management" },
  { id: "c9", label: "9. Security Best Practices" },
  { id: "c10", label: "10. Backup Strategy" },
  { id: "c11", label: "11. Logging & Monitoring" },
  { id: "c12", label: "12. Documentation" },
  { id: "c13", label: "13. Scalability Planning" },
  { id: "c14", label: "14. Production Checklist" },
  { id: "c15", label: "15. Maintenance Strategy" },
  { id: "review", label: "Best Practices Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Common Mistakes", tag: "CS Core", time: "12 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
  { title: "DBMS — Advanced Concepts", tag: "CS Core", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-best-practices" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Design maintainable, evolvable database schemas.</li>
          <li>Improve SQL quality through conventions and review discipline.</li>
          <li>Optimize database performance with data-driven indexing and query design.</li>
          <li>Build secure database systems aligned with industry standards.</li>
          <li>Follow enterprise engineering standards that scale with team size.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Database Design Standards">
        <p>
          Every schema is a contract. Once queries are written against it, changes are expensive.
          Design for the next three years of business questions, not just the current sprint.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Model the domain first</strong>, not the UI. Screens change; entities usually don't.</li>
          <li><strong>Prefer 3NF as the default</strong>; denormalize only for measured hotspots.</li>
          <li><strong>Every table has an owner</strong> (team + primary contact) recorded in metadata.</li>
        </ul>
        <Callout tone="info" title="Why it matters">
          Schemas designed around screens produce awkward joins the moment the second UI arrives.
          Domain-first modeling absorbs UI churn without schema churn.
        </Callout>
      </Section>

      <Section id="c2" title="2. Naming Conventions">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>snake_case</code> for tables, columns, and constraints — consistent across every RDBMS.</li>
          <li>Plural table names (<code>customers</code>) or singular — pick one and never mix.</li>
          <li>Boolean columns start with <code>is_</code>, <code>has_</code>, or <code>can_</code>.</li>
          <li>Timestamp columns end in <code>_at</code>; date-only columns end in <code>_on</code>.</li>
          <li>Foreign keys named <code>&lt;table&gt;_id</code>; indexes named <code>ix_&lt;table&gt;_&lt;cols&gt;</code>.</li>
        </ul>
      </Section>

      <Section id="c3" title="3. Schema Organization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Group related tables by schema (e.g. <code>billing</code>, <code>catalog</code>) — not everything in <code>public</code>.</li>
          <li>Isolate reference/lookup data in a dedicated schema (<code>ref</code>).</li>
          <li>Keep audit / history tables next to their source, suffixed with <code>_history</code>.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1400&q=80" caption="Figure 1 — Recommended schema organization: bounded contexts get their own schema; reference data lives in ref; audit tables mirror their source." />
      </Section>

      <Section id="c4" title="4. SQL Coding Guidelines">
        <ul className="list-disc space-y-1 pl-5">
          <li>Uppercase keywords, lowercase identifiers — consistent formatting via sqlfluff or a linter in CI.</li>
          <li>One clause per line; explicit column lists — never <code>SELECT *</code> in application code.</li>
          <li>Always qualify columns with a table alias in multi-table queries.</li>
          <li>Prefer CTEs for readability once a query exceeds ~15 lines.</li>
        </ul>
        <Code>{`-- Good: explicit, readable, reviewable
WITH recent_orders AS (
  SELECT o.id, o.customer_id, o.total_cents
  FROM   orders o
  WHERE  o.created_at >= now() - interval '30 days'
)
SELECT c.id, c.name, SUM(r.total_cents) AS gmv
FROM   customers  c
JOIN   recent_orders r ON r.customer_id = c.id
GROUP  BY c.id, c.name;`}</Code>
      </Section>

      <Section id="c5" title="5. Constraint Design">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every table has a primary key. No exceptions.</li>
          <li>Foreign keys are declared, not enforced only at the application layer.</li>
          <li>Use <code>CHECK</code> constraints to encode invariants (e.g. <code>amount_cents &gt;= 0</code>).</li>
          <li>Prefer <code>NOT NULL</code> by default; nullable columns require a written justification.</li>
        </ul>
      </Section>

      <Section id="c6" title="6. Indexing Strategies">
        <p>Indexes trade write cost for read speed. Add them from measurement, not intuition.</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Access pattern</th><th className="p-2 text-left">Recommended index</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Equality lookups</td><td className="p-2">B-tree on the filtered column</td></tr>
            <tr className="border-b"><td className="p-2">Range on ordered column</td><td className="p-2">BRIN (Postgres) for append-only data</td></tr>
            <tr className="border-b"><td className="p-2">Full-text search</td><td className="p-2">GIN + <code>tsvector</code></td></tr>
            <tr><td className="p-2">Sparse conditions</td><td className="p-2">Partial index with a WHERE clause</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c7" title="7. Query Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Read <code>EXPLAIN (ANALYZE, BUFFERS)</code> before tuning. Guessing is not optimization.</li>
          <li>Prefer set-based SQL to procedural loops.</li>
          <li>Rewrite correlated subqueries as joins when the planner mis-costs them.</li>
          <li>Cache expensive aggregates in materialized views; refresh on a schedule that matches business tolerance.</li>
        </ul>
      </Section>

      <Section id="c8" title="8. Transaction Management">
        <ul className="list-disc space-y-1 pl-5">
          <li>Keep transactions short — long transactions block vacuum and inflate bloat.</li>
          <li>Use the weakest isolation level that satisfies the invariant.</li>
          <li>Handle serialization failures with bounded retries; never sleep-and-hope.</li>
        </ul>
      </Section>

      <Section id="c9" title="9. Security Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Least privilege by default — application users never own DDL rights.</li>
          <li>TLS in transit, encryption at rest, KMS-managed keys.</li>
          <li>Row-level security for multi-tenant schemas; audit every policy in code review.</li>
          <li>Parameterize every query — string concatenation into SQL is a bug.</li>
        </ul>
      </Section>

      <Section id="c10" title="10. Backup Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow the 3-2-1 rule: 3 copies, 2 media, 1 off-site.</li>
          <li>Test restore quarterly — an untested backup is a rumor.</li>
          <li>Point-in-time recovery via continuous WAL archiving for production databases.</li>
        </ul>
      </Section>

      <Section id="c11" title="11. Logging & Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li>Track golden signals: TPS, latency percentiles, error rate, saturation.</li>
          <li>Enable slow query logging with a threshold that catches the worst 1% of queries.</li>
          <li>Alert on replication lag, disk saturation, and connection pool exhaustion.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 2 — Production monitoring stack: exporter ⟶ Prometheus ⟶ Grafana dashboards + Alertmanager, with slow-query digests fed to pganalyze or equivalent." />
      </Section>

      <Section id="c12" title="12. Documentation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every table has a one-paragraph purpose statement stored as a <code>COMMENT ON TABLE</code>.</li>
          <li>ADRs (Architecture Decision Records) capture non-obvious design choices.</li>
          <li>Data dictionaries are generated from the catalog, not maintained by hand.</li>
        </ul>
      </Section>

      <Section id="c13" title="13. Scalability Planning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vertical scaling first — cheap, boring, and often enough.</li>
          <li>Read replicas for reporting and analytics workloads.</li>
          <li>Partition before you shard; shard only when a single primary is exhausted.</li>
        </ul>
      </Section>

      <Section id="c14" title="14. Production Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>Backups configured, tested, and monitored.</li>
          <li>Metrics + alerts wired to on-call rotation.</li>
          <li>Runbooks for the top 5 failure modes.</li>
          <li>Least-privilege application roles created.</li>
          <li>Migration path documented and rehearsed.</li>
        </ul>
      </Section>

      <Section id="c15" title="15. Maintenance Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Schedule vacuum, analyze, and index maintenance in low-traffic windows.</li>
          <li>Track table bloat weekly; act at 30% threshold.</li>
          <li>Rotate secrets and audit role grants on a fixed cadence.</li>
        </ul>
      </Section>

      <Section id="review" title="Best Practices Review">
        <h3 className="font-semibold">Database health checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Buffer cache hit ratio &gt; 99% on OLTP primaries.</li>
          <li>Replication lag &lt; 1s p95.</li>
          <li>No table above 30% bloat.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Security checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>TLS enforced; scram-sha-256 auth only.</li>
          <li>All secrets rotated in the last 90 days.</li>
          <li>Audit logging shipped off-host.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Performance checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>No <code>SELECT *</code> in application code.</li>
          <li>Slow-query digest reviewed weekly.</li>
          <li>Indexes reviewed for coverage vs write cost quarterly.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Production readiness guide</h3>
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="Ready to go live when…">
          Backups restore-tested, alerts firing to the correct team, runbooks approved by SRE,
          and load test at 1.5× peak passes with headroom.
        </Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Conventions compound — small consistency wins add up across a large codebase.</li>
          <li>Every optimization decision needs a measurement behind it.</li>
          <li>Security and observability are pre-conditions for production, not upgrades.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How strict should conventions be?">Strict enough that a new engineer can predict the shape of any table without asking. Enforce via lint in CI.</FAQItem>
        <FAQItem q="Are stored procedures a best practice?">Only for logic tightly coupled to data (e.g. bulk cleanups). Business rules belong in application code where they can be tested and reviewed easily.</FAQItem>
        <FAQItem q="ORM or hand-written SQL?">ORMs for CRUD; hand-written SQL for reports, migrations, and hot paths. Never fight the ORM — drop to SQL and move on.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>ADR</strong> — Architecture Decision Record.</li>
          <li><strong>Bloat</strong> — wasted space caused by dead tuples in MVCC databases.</li>
          <li><strong>3NF</strong> — Third Normal Form; default normalization target.</li>
          <li><strong>WAL</strong> — Write-Ahead Log; foundation of durability and replication.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, industry standards, and trusted
          educational resources. Database technologies, SQL standards, and vendor implementations
          evolve continuously — readers should always consult official vendor documentation for
          the latest updates. All trademarks, product names, logos, and intellectual property
          belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
