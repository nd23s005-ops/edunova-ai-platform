import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-real-world-case-study",
  title: "DBMS — Real-world Case Study",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "20 min",
  pages: 32,
  lastUpdated: "May 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1800&q=80",
  heroSubtitle:
    "How a fintech engineering team replaced a brittle single-node MySQL setup with a partitioned PostgreSQL platform — from requirements gathering to production monitoring and measurable business impact.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Executive Summary" },
  { id: "c2", label: "2. Company Background" },
  { id: "c3", label: "3. Business Problem" },
  { id: "c4", label: "4. Existing System Analysis" },
  { id: "c5", label: "5. Requirement Gathering" },
  { id: "c6", label: "6. Database Selection" },
  { id: "c7", label: "7. ER Diagram Design" },
  { id: "c8", label: "8. Schema Design" },
  { id: "c9", label: "9. SQL Development" },
  { id: "c10", label: "10. Performance Optimization" },
  { id: "c11", label: "11. Security Implementation" },
  { id: "c12", label: "12. Testing Strategy" },
  { id: "c13", label: "13. Production Deployment" },
  { id: "c14", label: "14. Monitoring" },
  { id: "c15", label: "15. Business Metrics" },
  { id: "c16", label: "16. Lessons Learned" },
  { id: "c17", label: "17. Future Improvements" },
  { id: "review", label: "Case Study Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Best Practices", tag: "CS Core", time: "19 min" },
  { title: "DBMS — Project Case Study", tag: "CS Core", time: "30 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand enterprise database implementation end-to-end.</li>
          <li>Analyze business requirements and translate them into schema design.</li>
          <li>Learn production database architecture at a mid-scale fintech.</li>
          <li>Study optimization decisions and their measurable trade-offs.</li>
          <li>Evaluate engineering trade-offs between availability, cost, and complexity.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Executive Summary">
        <p>
          NovaPay, a payments infrastructure company operating in 9 markets, migrated its ledger
          and reconciliation workloads from a single-node MySQL 5.7 instance to a partitioned
          PostgreSQL 15 cluster. The project ran for 7 months, was executed by a 5-person
          engineering team, and produced a <strong>73% reduction in p99 query latency</strong>,
          a <strong>3.4× throughput improvement</strong>, and eliminated a recurring class of
          weekend outages that had cost the business ~$180k/quarter in reconciliation delays.
        </p>
      </Section>

      <Section id="c2" title="2. Company Background">
        <p>
          Founded in 2018, NovaPay processes card payments, bank transfers, and payouts for SMB
          merchants. By 2025 the platform handled <strong>34M transactions/month</strong> with
          peak bursts of 900 TPS during payroll windows. The core ledger, merchant onboarding,
          and settlement pipelines all shared one MySQL database — a decision made in 2018 that
          had never been revisited.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Industry:</strong> Financial services / payments infrastructure.</li>
          <li><strong>Regulatory context:</strong> PCI-DSS Level 1, SOC 2 Type II.</li>
          <li><strong>Team involved:</strong> 2 DB engineers, 2 backend engineers, 1 SRE, product sponsor.</li>
        </ul>
      </Section>

      <Section id="c3" title="3. Business Problem">
        <Callout tone="warning" title="Pain point">
          The monthly reconciliation job — a 40-minute aggregate query across the ledger — had
          grown to 6+ hours by Q1 2025, blocking merchant statement delivery and triggering
          finance-team escalations. During the job, transactional writes queued behind row locks,
          and merchant dashboards timed out.
        </Callout>
        <ul className="list-disc space-y-1 pl-5">
          <li>Reconciliation SLA breached in 11 of the last 14 months.</li>
          <li>Two customer-visible outages traced to lock contention.</li>
          <li>Storage on the primary volume 87% full with 4 months of runway.</li>
        </ul>
      </Section>

      <Section id="c4" title="4. Existing System Analysis">
        <p>The audit surfaced three structural issues in the incumbent MySQL setup:</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>Unpartitioned tables:</strong> <code>ledger_entries</code> had 4.1B rows in a single InnoDB table.</li>
          <li><strong>Over-indexed writes:</strong> 14 indexes on the transactions table inflated write amplification.</li>
          <li><strong>No read replicas:</strong> Analytics and reporting queries hit the primary directly.</li>
        </ol>
        <Code>{`-- The offending reconciliation query, simplified
SELECT merchant_id, DATE(created_at) AS d,
       SUM(amount_cents) AS gross,
       COUNT(*) AS txns
FROM ledger_entries
WHERE created_at >= '2025-04-01'
GROUP BY merchant_id, DATE(created_at);
-- Full table scan: 4.1B rows -> 6h 12m on peak days.`}</Code>
      </Section>

      <Section id="c5" title="5. Requirement Gathering">
        <p>
          Six stakeholder workshops converged on 4 firm requirements and 3 stretch goals.
          Requirements were captured as testable acceptance criteria, not aspirational bullets.
        </p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Requirement</th><th className="p-2 text-left">Owner</th><th className="p-2 text-left">Acceptance criterion</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Reconciliation under 45 min</td><td className="p-2">Finance</td><td className="p-2">Monthly job p95 ≤ 45 min for 6 consecutive months</td></tr>
            <tr className="border-b"><td className="p-2">Zero downtime cutover</td><td className="p-2">SRE</td><td className="p-2">Merchant API p99 stays under 300ms during migration</td></tr>
            <tr className="border-b"><td className="p-2">PCI compliance maintained</td><td className="p-2">Security</td><td className="p-2">External audit pass on the new platform</td></tr>
            <tr><td className="p-2">Cost neutral in year 1</td><td className="p-2">Finance</td><td className="p-2">TCO delta ≤ +10% vs prior year</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c6" title="6. Database Selection">
        <p>
          The team evaluated MySQL 8 with partitioning, PostgreSQL 15 with declarative
          partitioning, CockroachDB, and Aurora MySQL. PostgreSQL 15 won on partitioning
          maturity, richer JSONB support for the risk-scoring payloads, and the team's
          existing operational familiarity.
        </p>
        <Callout tone="info" title="Decision record">
          "We picked Postgres for range partitioning + BRIN indexes on <code>created_at</code>,
          logical replication for zero-downtime cutover, and predictable licensing." — ADR-014.
        </Callout>
      </Section>

      <Section id="c7" title="7. ER Diagram Design">
        <Figure src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&q=80" caption="Figure 1 — Simplified ER diagram: Merchants ⟶ Accounts ⟶ Ledger Entries, with Transactions and Settlements branching off. Ledger entries are range-partitioned by created_at." />
        <p>Six core entities: Merchant, Account, Transaction, LedgerEntry, Settlement, and RiskEvent. LedgerEntry is the hot table and became the partitioning anchor.</p>
      </Section>

      <Section id="c8" title="8. Schema Design">
        <Code>{`CREATE TABLE ledger_entries (
  id            bigserial,
  account_id    bigint      NOT NULL REFERENCES accounts(id),
  merchant_id   bigint      NOT NULL,
  amount_cents  bigint      NOT NULL,
  currency      char(3)     NOT NULL,
  entry_type    smallint    NOT NULL,
  metadata      jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL,
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE INDEX ledger_created_brin
  ON ledger_entries USING BRIN (created_at) WITH (pages_per_range = 32);

CREATE INDEX ledger_merchant_created
  ON ledger_entries (merchant_id, created_at DESC);`}</Code>
      </Section>

      <Section id="c9" title="9. SQL Development">
        <p>Reconciliation was rewritten to prune partitions and leverage the BRIN index.</p>
        <Code>{`SELECT merchant_id,
       date_trunc('day', created_at) AS d,
       SUM(amount_cents)              AS gross,
       COUNT(*)                       AS txns
FROM   ledger_entries
WHERE  created_at >= date_trunc('month', now() - interval '1 month')
  AND  created_at <  date_trunc('month', now())
GROUP  BY merchant_id, date_trunc('day', created_at);`}</Code>
      </Section>

      <Section id="c10" title="10. Performance Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Range partitioning by month + BRIN index → 6h 12m ⟶ 38 min.</li>
          <li>Parallel aggregate (<code>max_parallel_workers_per_gather = 8</code>) → 38 min ⟶ 21 min.</li>
          <li>Materialized daily rollup refreshed hourly → statement API p95 78ms.</li>
        </ul>
      </Section>

      <Section id="c11" title="11. Security Implementation">
        <ul className="list-disc space-y-1 pl-5">
          <li>TLS 1.3 enforced for all client connections; <code>scram-sha-256</code> auth.</li>
          <li>Row-level security on merchant-scoped tables using <code>current_setting('app.merchant_id')</code>.</li>
          <li>Column-level encryption (pgcrypto) for PII fields; keys rotated via KMS.</li>
          <li>Audit logging via <code>pgaudit</code> shipped to the SIEM.</li>
        </ul>
      </Section>

      <Section id="c12" title="12. Testing Strategy">
        <p>Three-tier testing gate before cutover:</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>Unit:</strong> pgTAP suite covering constraints, triggers, and RLS policies (612 assertions).</li>
          <li><strong>Integration:</strong> shadow-writes replayed 30 days of production traffic against the new cluster.</li>
          <li><strong>Load:</strong> pgbench + custom TPC-C-derived workload at 1.5× peak.</li>
        </ol>
      </Section>

      <Section id="c13" title="13. Production Deployment">
        <p>
          Cutover used logical replication with a 6-minute freeze window at 03:17 UTC on a
          Sunday. A pre-agreed rollback playbook allowed reversal in under 4 minutes if
          post-cutover checks failed. All 27 checks passed on the first attempt.
        </p>
        <Figure src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80" caption="Figure 2 — Production topology: application ⟶ PgBouncer ⟶ primary + 2 async replicas, with pgBackRest streaming WAL to object storage." />
      </Section>

      <Section id="c14" title="14. Monitoring">
        <p>The observability plane bundled Prometheus, Grafana, and pganalyze:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Golden signals: TPS, latency percentiles, replication lag, buffer cache hit ratio.</li>
          <li>Slow query digest via <code>pg_stat_statements</code> alerts on regression &gt; 20%.</li>
          <li>Auto-vacuum health and bloat tracking on the 12 largest tables.</li>
        </ul>
      </Section>

      <Section id="c15" title="15. Business Metrics">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Metric</th><th className="p-2 text-left">Before</th><th className="p-2 text-left">After</th><th className="p-2 text-left">Δ</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Reconciliation runtime</td><td className="p-2">6h 12m</td><td className="p-2">21 min</td><td className="p-2">-94%</td></tr>
            <tr className="border-b"><td className="p-2">API p99 latency</td><td className="p-2">410ms</td><td className="p-2">112ms</td><td className="p-2">-73%</td></tr>
            <tr className="border-b"><td className="p-2">Peak TPS</td><td className="p-2">900</td><td className="p-2">3,050</td><td className="p-2">+3.4×</td></tr>
            <tr><td className="p-2">Weekend outages / qtr</td><td className="p-2">2.3</td><td className="p-2">0</td><td className="p-2">-100%</td></tr>
          </tbody>
        </table>
        <Callout tone="success" icon={<Sparkles className="h-5 w-5" />} title="Business impact">
          Statement delivery SLA restored; recovered ~$180k/quarter in delayed
          reconciliation-linked revenue and unblocked a delayed enterprise onboarding pipeline.
        </Callout>
      </Section>

      <Section id="c16" title="16. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Shadow traffic caught two silent bugs that pgTAP could not — invest early.</li>
          <li>BRIN + range partitioning is dramatically underrated for append-only ledgers.</li>
          <li>Rollback playbooks are only credible if they are rehearsed in staging.</li>
        </ul>
      </Section>

      <Section id="c17" title="17. Future Improvements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Adopt Citus for horizontal sharding once ledger crosses 10B rows.</li>
          <li>Move risk-scoring JSONB payloads to a dedicated columnar store.</li>
          <li>Automate partition creation and retention via <code>pg_partman</code>.</li>
        </ul>
      </Section>

      <Section id="review" title="Case Study Review">
        <h3 className="font-semibold">Engineering insights</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Business problem framing preceded any technology choice.</li>
          <li>Partitioning strategy was informed by real query shapes, not folklore.</li>
          <li>Observability was in place <em>before</em> cutover — not bolted on afterwards.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Architecture review</h3>
        <p>The primary + async replicas + PgBouncer topology is deliberately conservative. It sacrifices theoretical elasticity for operational predictability — the right trade-off for a regulated fintech at this scale.</p>
        <h3 className="mt-3 font-semibold">Reflection questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Which requirement would you have re-negotiated, and why?</li>
          <li>How would the design change if writes doubled but reads stayed flat?</li>
          <li>What is the earliest signal that the ledger has outgrown a single primary?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Discussion topics</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>When is horizontal sharding worth the operational tax?</li>
          <li>How do you argue for a 7-month migration to a cost-sensitive CFO?</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Match the storage engine to the actual query shape.</li>
          <li>Partitioning + BRIN is often enough — you rarely need to shard.</li>
          <li>Zero-downtime cutovers depend on logical replication and rehearsed rollbacks.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Why not Aurora or a managed vendor?">TCO parity was required and vendor lock-in was rejected by the platform review. Self-managed Postgres won on cost and portability.</FAQItem>
        <FAQItem q="Was downtime truly zero?">The 6-minute freeze on writes was scheduled and communicated; merchant reads stayed online throughout via replicas.</FAQItem>
        <FAQItem q="Would you choose CockroachDB now?">Only if a hard multi-region write requirement emerged. Today's workload is well served by a single primary + replicas.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>BRIN</strong> — Block Range Index; compact index for naturally ordered data.</li>
          <li><strong>Logical replication</strong> — row-level replication used for zero-downtime cutovers.</li>
          <li><strong>PgBouncer</strong> — connection pooler in front of Postgres.</li>
          <li><strong>WAL</strong> — Write-Ahead Log; the durability substrate of Postgres.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, industry standards, and trusted
          educational resources. The company, metrics, and figures in this case study are
          illustrative composites. Database technologies, SQL standards, and vendor
          implementations evolve continuously — readers should always consult official vendor
          documentation for the latest updates. All trademarks, product names, logos, and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
