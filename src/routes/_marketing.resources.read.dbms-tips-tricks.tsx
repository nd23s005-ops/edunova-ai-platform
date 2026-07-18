import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-tips-tricks",
  title: "DBMS — Tips & Tricks",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 15,
  lastUpdated: "August 2026",
  tags: ["DBMS", "SQL", "Database Systems"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "120+ practical DBMS tips — SQL shortcuts, indexing tricks, query-plan reading, debugging tactics, backup habits, and daily workflows used by professional database engineers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "sql", label: "1. SQL Productivity Tips" },
  { id: "opt", label: "2. Query Optimization" },
  { id: "idx", label: "3. Indexing Tricks" },
  { id: "design", label: "4. Database Design Tips" },
  { id: "perf", label: "5. Performance Tuning" },
  { id: "debug", label: "6. Debugging Techniques" },
  { id: "backup", label: "7. Backup & Recovery Tips" },
  { id: "sec", label: "8. Security Best Practices" },
  { id: "flow", label: "9. Daily Workflow Improvements" },
  { id: "pro", label: "10. Professional Recommendations" },
  { id: "review", label: "Tips Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Frequently Asked Questions", tag: "CS Core", time: "9 min" },
  { title: "DBMS — Learning Roadmap", tag: "CS Core", time: "10 min" },
  { title: "System Design", tag: "CS Core", time: "20 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-tips-tricks")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Tips({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ol className="list-decimal space-y-1 pl-5">
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ol>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Improve database productivity and shorten iteration cycles.</li>
          <li>Write faster, safer SQL by default.</li>
          <li>Diagnose slow queries with EXPLAIN and stats.</li>
          <li>Reduce debugging time with a repeatable checklist.</li>
          <li>Build professional, senior-level DBMS habits.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80"
          caption="From query to plan to index — the loop every high-performing SQL engineer runs daily."
        />
      </Section>

      <Section id="sql" title="1. SQL Productivity Tips">
        <Tips items={[
          "Format queries top-down: SELECT ▸ FROM ▸ JOIN ▸ WHERE ▸ GROUP ▸ HAVING ▸ ORDER ▸ LIMIT — one clause per line.",
          "Alias every table (u, o, p) — makes JOINs and subqueries readable.",
          "Never use SELECT * in application code. List columns explicitly.",
          "Use CTEs (WITH) to build queries in named steps instead of nesting subqueries.",
          "Prefer EXISTS over IN for large subquery sets.",
          "Use RETURNING (Postgres) or OUTPUT (SQL Server) to fetch inserted/updated rows in one round trip.",
          "Learn ILIKE (Postgres) for case-insensitive search without LOWER().",
          "Keep a snippets file: pagination, upsert, audit trigger, soft delete.",
          <>Prefer <code>INSERT ... ON CONFLICT DO UPDATE</code> (upsert) over SELECT-then-INSERT.</>,
          "Use window functions instead of self-joins for running totals, ranks, and gaps.",
        ]} />
      </Section>

      <Section id="opt" title="2. Query Optimization">
        <Tips items={[
          "Always start with EXPLAIN (ANALYZE, BUFFERS) — real times beat guessing.",
          "Kill sequential scans on big tables with the right index.",
          "Filter early: push predicates into subqueries and CTEs.",
          "Avoid functions on indexed columns in WHERE (WHERE lower(email)=…) — either add an expression index or normalise input.",
          "Replace OR chains with UNION ALL when each branch can use a different index.",
          "Batch large UPDATE/DELETE (10k rows per chunk) to avoid long locks and bloated WAL.",
          "Cache expensive aggregates in materialized views; refresh on schedule.",
          "Denormalize a hot column only after profiling — never speculatively.",
        ]} />
      </Section>

      <Section id="idx" title="3. Indexing Tricks">
        <Tips items={[
          "Index the columns you filter, join, or sort by — not every column.",
          "Composite index order = most selective column first, then next filter.",
          "Add a covering index (INCLUDE …) so hot queries never touch the table.",
          "Partial indexes on active rows: CREATE INDEX ... WHERE deleted_at IS NULL.",
          "For LIKE 'abc%' use a B-tree; for '%abc%' use trigram (pg_trgm) or full-text.",
          "Drop unused indexes — check pg_stat_user_indexes / sys.dm_db_index_usage_stats monthly.",
          "Rebuild bloated indexes (REINDEX CONCURRENTLY) on write-heavy tables.",
        ]} />
      </Section>

      <Section id="design" title="4. Database Design Tips">
        <Tips items={[
          "Prefer UUID or bigint surrogate keys; keep natural keys as unique constraints.",
          "Always add created_at, updated_at, and a soft delete column (deleted_at) if audit is needed.",
          "Store money as numeric(19,4), never float.",
          "Store timestamps in UTC (timestamptz) — convert in the app.",
          "Model many-to-many with a join table, not comma-separated strings.",
          "Version your schema with migrations (Flyway, Liquibase, Prisma, sqlx). Never edit prod by hand.",
          "Keep enums in a lookup table if values change; use native enums only for truly fixed sets.",
        ]} />
      </Section>

      <Section id="perf" title="5. Performance Tuning">
        <Tips items={[
          "Right-size connection pools (PgBouncer transaction pooling for web apps).",
          "Turn on slow query log with a threshold (e.g., 200 ms) and review weekly.",
          "Run VACUUM ANALYZE (or auto-vacuum) — stale stats = bad plans.",
          "Split OLTP from analytics with a read replica or a warehouse.",
          "Partition huge tables by date/tenant; drop old partitions instead of DELETE.",
          "Cap query timeouts (statement_timeout) so runaway queries can’t take down prod.",
          "Prefer prepared statements for high-QPS endpoints — plan cache hits are free wins.",
        ]} />
      </Section>

      <Section id="debug" title="6. Debugging Techniques">
        <Tips items={[
          "Reproduce first — always run the exact query with the exact params.",
          "Add EXPLAIN (ANALYZE, VERBOSE, BUFFERS) to see actual vs estimated rows.",
          "Check pg_stat_activity / sys.dm_exec_requests for blocking sessions.",
          "Look for lock waits — pg_locks joined with pg_stat_activity reveals the head-of-line query.",
          "For flaky writes, wrap in a transaction with SAVEPOINTs and inspect intermediate state.",
          "When results are wrong: 1) run each JOIN alone, 2) count rows at each step, 3) check for missing WHERE.",
        ]} />
        <Callout title="Debug checklist">Query → Plan → Stats → Locks → Data. Never skip a layer.</Callout>
      </Section>

      <Section id="backup" title="7. Backup & Recovery Tips">
        <Tips items={[
          "Automate daily logical backups (pg_dump) AND continuous WAL archiving.",
          "Test restore quarterly — an untested backup does not exist.",
          "Keep backups off-host, encrypted, with retention (7/30/365).",
          "Snapshot before schema migrations; roll back at the storage layer if migration corrupts data.",
          "Document RPO and RTO — the team must agree before an incident.",
        ]} />
      </Section>

      <Section id="sec" title="8. Security Best Practices">
        <Tips items={[
          "Parameterise every query — no string concatenation, ever.",
          "Least-privilege roles: the app user should not be superuser.",
          "Enable TLS between app and DB; rotate passwords with a secrets manager.",
          "Turn on Row-Level Security for multi-tenant tables — enforce tenant_id = current_setting('app.tenant').",
          "Mask PII in non-prod (pg_anonymizer, dbt seeds).",
          "Audit sensitive tables with triggers or the DB’s native audit extension.",
        ]} />
      </Section>

      <Section id="flow" title="9. Daily Workflow Improvements">
        <Tips items={[
          "Keep a personal SQL scratchpad (.sql file per project) — never type queries into a chat window.",
          "Version-control every DDL change through migrations.",
          "Auto-format SQL on save (sqlfluff, pg_format).",
          "Use DBeaver bookmarks / VS Code SQLTools for one-click connections.",
          "Standup habit: name the 1 slow query you fixed yesterday.",
          "Weekly: prune unused indexes, review slow-log top 10, VACUUM stats.",
        ]} />
      </Section>

      <Section id="pro" title="10. Professional Recommendations">
        <Tips items={[
          "Read the release notes of your DB engine — every version ships free performance wins.",
          "Own the query, not the ORM. Understand what Prisma/Hibernate emits.",
          "Write regression tests for critical queries (row counts, execution time budgets).",
          "Pair with a senior for the first time you touch replication, sharding, or partitioning.",
          "Never run destructive SQL in prod without a transaction and a rollback plan.",
          "Prefer boring, well-documented features over clever ones — future you must debug it.",
        ]} />
      </Section>

      <Section id="review" title="Tips Review">
        <Callout title="Top 50 Productivity Tips">
          Column-list SELECTs · CTEs over nested subqueries · EXPLAIN ANALYZE first · Composite index ordering · Partial indexes · UPSERT · RETURNING · Batch large writes · Materialised views · Connection pooling · UTC timestamps · Numeric money · Migrations only · Slow log · VACUUM · Statement timeouts · Parameterised queries · RLS · TLS · Tested backups.
        </Callout>
        <p><strong>Daily Database Checklist:</strong> Slow log clean? Auto-vacuum healthy? Replica lag &lt; 1s? Free space &gt; 30%? Backup succeeded last night? No blocking sessions &gt; 60s?</p>
        <p><strong>Performance Checklist:</strong> Every hot query has a plan you’ve read; every big table has a partition or retention plan; every join column is indexed.</p>
        <p><strong>Best Practices Summary:</strong> Design boring, index deliberately, migrate safely, back up honestly, secure by default.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which tip has the biggest ROI?">Reading EXPLAIN ANALYZE. Once you can read a plan, every other optimisation is obvious.</FAQItem>
        <FAQItem q="Do these tips apply to MySQL/SQL Server too?">Most do. Syntax differs (EXPLAIN, hints, index types) but the principles are universal.</FAQItem>
        <FAQItem q="How do I practice safely?">Run production-scale queries against a restored snapshot in a staging DB.</FAQItem>
      </Section>

      <References
        items={[
          "PostgreSQL Performance Tips — postgresql.org/docs/current/performance-tips.html",
          "Use The Index, Luke — use-the-index-luke.com",
          "MySQL Query Optimization — dev.mysql.com/doc/refman/8.0/en/optimization.html",
          "Microsoft SQL Server Query Tuning — learn.microsoft.com",
          "Oracle Database Performance Tuning Guide",
          "MariaDB Knowledge Base",
          "IBM Db2 Documentation",
          "CMU Database Group — Andy Pavlo lectures",
          "Silberschatz — Database System Concepts",
        ]}
      />

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted educational
          resources. Database technologies, SQL dialects, and best practices evolve over time — always consult
          official vendor documentation for the latest information. All trademarks, product names, logos, and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
