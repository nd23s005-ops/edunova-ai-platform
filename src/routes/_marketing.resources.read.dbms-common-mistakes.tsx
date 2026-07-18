import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-common-mistakes",
  title: "DBMS — Common Mistakes",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 18,
  lastUpdated: "July 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1800&q=80",
  heroSubtitle:
    "A beginner-friendly troubleshooting guide to the 120+ mistakes learners make with SQL and relational databases — why each happens, its consequences, how to debug it, and the correct fix.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Poor Database Design" },
  { id: "c2", label: "2. Missing Primary Keys" },
  { id: "c3", label: "3. Wrong Data Types" },
  { id: "c4", label: "4. Incorrect Normalization" },
  { id: "c5", label: "5. Foreign Key Mistakes" },
  { id: "c6", label: "6. SQL Syntax Errors" },
  { id: "c7", label: "7. JOIN Mistakes" },
  { id: "c8", label: "8. Missing Indexes" },
  { id: "c9", label: "9. Transaction Errors" },
  { id: "c10", label: "10. Security Mistakes" },
  { id: "c11", label: "11. Backup Failures" },
  { id: "c12", label: "12. Performance Problems" },
  { id: "c13", label: "13. Deployment Mistakes" },
  { id: "c14", label: "14. Debugging Workflow" },
  { id: "c15", label: "15. Prevention Checklist" },
  { id: "review", label: "Common Mistakes Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Best Practices", tag: "CS Core", time: "19 min" },
  { title: "DBMS — Interview Questions", tag: "CS Core", time: "24 min" },
  { title: "DBMS — Beginner Guide", tag: "CS Core", time: "18 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-common-mistakes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-common-mistakes" }],
  }),
  component: Page,
});

function WrongRight({ wrong, right, note }: { wrong: string; right: string; note?: string }) {
  return (
    <div className="my-3 grid gap-3 md:grid-cols-2">
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-destructive">Wrong</p>
        <pre className="overflow-x-auto text-xs leading-relaxed"><code>{wrong}</code></pre>
      </div>
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-600">Correct</p>
        <pre className="overflow-x-auto text-xs leading-relaxed"><code>{right}</code></pre>
        {note ? <p className="mt-2 text-xs text-muted-foreground">{note}</p> : null}
      </div>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Identify the most common DBMS mistakes made by learners.</li>
          <li>Debug SQL efficiently using systematic techniques.</li>
          <li>Avoid poor database design decisions that cost you later.</li>
          <li>Improve application reliability by catching mistakes early.</li>
          <li>Build professional development habits that scale with your career.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Poor Database Design">
        <p><strong>Why it happens:</strong> Beginners model the current UI rather than the underlying domain, producing tables that are convenient today and painful tomorrow.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Stuffing unrelated fields into a single "misc" table.</li>
          <li>Storing comma-separated values in a single column.</li>
          <li>Creating a new table per tenant instead of a tenant column.</li>
        </ul>
        <WrongRight
          wrong={`-- Storing lists in a single column
CREATE TABLE orders (
  id     serial PRIMARY KEY,
  items  text  -- "sku-1,sku-3,sku-7"
);`}
          right={`CREATE TABLE orders (
  id serial PRIMARY KEY
);
CREATE TABLE order_items (
  order_id int REFERENCES orders(id),
  sku      text NOT NULL,
  qty      int  NOT NULL
);`}
          note="Comma-separated columns kill indexing, joins, and integrity."
        />
      </Section>

      <Section id="c2" title="2. Missing Primary Keys">
        <p><strong>Consequences:</strong> replication breaks, ORMs misbehave, and duplicates creep in silently.</p>
        <WrongRight
          wrong={`CREATE TABLE users (
  email text,
  name  text
);`}
          right={`CREATE TABLE users (
  id    bigserial PRIMARY KEY,
  email citext UNIQUE NOT NULL,
  name  text NOT NULL
);`}
        />
        <Callout tone="warning" title="Rule of thumb">
          Every table gets a primary key. If you can't decide, use a surrogate <code>bigserial</code>/<code>uuid</code>.
        </Callout>
      </Section>

      <Section id="c3" title="3. Wrong Data Types">
        <ul className="list-disc space-y-1 pl-5">
          <li>Storing money as <code>float</code> — rounding errors compound with every arithmetic op.</li>
          <li>Storing dates as <code>varchar</code> — sorting and range queries silently return wrong rows.</li>
          <li>Using <code>text</code> for phone numbers without validation.</li>
        </ul>
        <WrongRight
          wrong={`amount FLOAT,
created VARCHAR(50)`}
          right={`amount_cents BIGINT NOT NULL,
created_at   TIMESTAMPTZ NOT NULL DEFAULT now()`}
        />
      </Section>

      <Section id="c4" title="4. Incorrect Normalization">
        <p>Two failure modes: under-normalizing (data duplication, update anomalies) and over-normalizing (dozens of joins for a single screen). Target 3NF and denormalize only when metrics prove it necessary.</p>
        <Figure src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80" caption="Figure 1 — Normalization flow: 1NF (atomic values) ⟶ 2NF (no partial dependencies) ⟶ 3NF (no transitive dependencies)." />
      </Section>

      <Section id="c5" title="5. Foreign Key Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Skipping FK constraints "for performance" — you inherit orphan rows forever.</li>
          <li>Wrong <code>ON DELETE</code> action, silently deleting related data.</li>
          <li>Mismatched types between the FK and the referenced PK.</li>
        </ul>
        <WrongRight
          wrong={`ALTER TABLE orders ADD COLUMN customer_id text; -- PK is bigint!`}
          right={`ALTER TABLE orders
  ADD COLUMN customer_id bigint REFERENCES customers(id) ON DELETE RESTRICT;`}
        />
      </Section>

      <Section id="c6" title="6. SQL Syntax Errors">
        <ul className="list-disc space-y-1 pl-5">
          <li>Missing <code>GROUP BY</code> when using aggregates alongside non-aggregated columns.</li>
          <li>Reserved-word column names (<code>order</code>, <code>user</code>) used without quoting.</li>
          <li>Trailing commas in column lists.</li>
        </ul>
      </Section>

      <Section id="c7" title="7. JOIN Mistakes">
        <p>The most common: forgetting the <code>ON</code> clause and accidentally producing a Cartesian product.</p>
        <WrongRight
          wrong={`SELECT *
FROM   customers c, orders o;  -- millions of rows`}
          right={`SELECT c.id, o.id
FROM   customers c
JOIN   orders    o ON o.customer_id = c.id;`}
        />
        <ul className="list-disc space-y-1 pl-5">
          <li>Confusing <code>LEFT JOIN</code> with <code>INNER JOIN</code>.</li>
          <li>Filtering the outer side of a LEFT JOIN in <code>WHERE</code> instead of <code>ON</code> — silently turning it into an INNER JOIN.</li>
        </ul>
      </Section>

      <Section id="c8" title="8. Missing Indexes">
        <p>Symptoms: sequential scans on hot tables, latency growing linearly with row count. Fix: index the columns you filter and join on, but measure with <code>EXPLAIN</code> first.</p>
        <Code>{`-- Diagnose
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE customer_id = 42;

-- Fix
CREATE INDEX ix_orders_customer_id ON orders(customer_id);`}</Code>
      </Section>

      <Section id="c9" title="9. Transaction Errors">
        <ul className="list-disc space-y-1 pl-5">
          <li>Wrapping the entire request in one huge transaction, blocking vacuum.</li>
          <li>Assuming READ COMMITTED protects against lost updates. It does not.</li>
          <li>Swallowing serialization failures instead of retrying.</li>
        </ul>
      </Section>

      <Section id="c10" title="10. Security Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>String-concatenated SQL — the SQL injection classic.</li>
          <li>Application user with <code>SUPERUSER</code> / <code>DBA</code> rights "for convenience".</li>
          <li>Backups stored in the same account/region as the primary.</li>
        </ul>
        <WrongRight
          wrong={`query = "SELECT * FROM users WHERE email = '" + email + "'";`}
          right={`db.query('SELECT * FROM users WHERE email = $1', [email]);`}
          note="Always parameterize. Every language, every driver."
        />
      </Section>

      <Section id="c11" title="11. Backup Failures">
        <ul className="list-disc space-y-1 pl-5">
          <li>Backups configured but never restore-tested.</li>
          <li>Retention shorter than the mean time to detect a corruption incident.</li>
          <li>Ignored alerts about failing nightly jobs.</li>
        </ul>
      </Section>

      <Section id="c12" title="12. Performance Problems">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>SELECT *</code> in application code — bloats network and defeats index-only scans.</li>
          <li>N+1 query patterns from ORMs.</li>
          <li>Ignoring the query plan and adding indexes at random.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 2 — Debugging workflow: reproduce ⟶ EXPLAIN ANALYZE ⟶ isolate expensive node ⟶ change one thing ⟶ measure again." />
      </Section>

      <Section id="c13" title="13. Deployment Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Running migrations manually in production shells.</li>
          <li>Adding a <code>NOT NULL</code> column with no default to a huge table during business hours.</li>
          <li>Skipping the rollback path in the migration PR.</li>
        </ul>
      </Section>

      <Section id="c14" title="14. Debugging Workflow">
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>Reproduce</strong> the bad query in a REPL with realistic data volumes.</li>
          <li><strong>Read the plan</strong> — <code>EXPLAIN (ANALYZE, BUFFERS)</code>. Identify the slowest node.</li>
          <li><strong>Change one thing</strong> — add an index, rewrite the query, or adjust statistics.</li>
          <li><strong>Measure again.</strong> If no improvement, revert and try a different hypothesis.</li>
          <li><strong>Document</strong> the finding in an ADR so the next engineer doesn't repeat it.</li>
        </ol>
      </Section>

      <Section id="c15" title="15. Prevention Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every table has a PK and a purpose comment.</li>
          <li>Every FK is declared and typed correctly.</li>
          <li>Every migration has been dry-run in staging.</li>
          <li>Every query goes through code review with someone comfortable reading plans.</li>
          <li>Every backup has been restored at least once this quarter.</li>
        </ul>
      </Section>

      <Section id="review" title="Common Mistakes Review">
        <h3 className="font-semibold">Top 50 beginner mistakes (highlights)</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>No primary key.</li>
          <li>Floats for money.</li>
          <li>Strings for dates.</li>
          <li>Comma-separated lists in a single column.</li>
          <li>Missing FK constraints.</li>
          <li>Wrong <code>ON DELETE</code> behavior.</li>
          <li><code>SELECT *</code> everywhere.</li>
          <li>N+1 queries from the ORM.</li>
          <li>Cartesian products from missing <code>ON</code>.</li>
          <li>Filtering LEFT JOIN in WHERE instead of ON.</li>
          <li>Missing indexes on FK columns.</li>
          <li>Adding indexes without measuring first.</li>
          <li>Long transactions that block vacuum.</li>
          <li>Ignoring serialization failures.</li>
          <li>SQL injection via string concatenation.</li>
          <li>Application account with superuser rights.</li>
          <li>Backups never restore-tested.</li>
          <li>Migrations run manually in production.</li>
          <li>NOT NULL + no default on a huge table at peak time.</li>
          <li>Reference/lookup tables mixed into public schema.</li>
          <li>Nullable columns without documented justification.</li>
          <li>Boolean encoded as varchar 'Y'/'N'.</li>
          <li>Timezones stored as local time.</li>
          <li>Wide varchar limits used to "be safe" — bloats stats.</li>
          <li>Enum values managed by application code, not the schema.</li>
          <li>UUID v4 as clustered primary key on hot tables.</li>
          <li>Missing <code>GROUP BY</code> columns.</li>
          <li>Aggregating over nullable columns without checks.</li>
          <li>Cascading deletes surprising a downstream team.</li>
          <li>Trigger side effects hidden from application logs.</li>
          <li>Views built on views built on views.</li>
          <li>Stored procedures replacing application logic.</li>
          <li>Denormalization done before measurement.</li>
          <li>Auto-increment IDs leaking business volume.</li>
          <li>Sensitive data unencrypted at rest.</li>
          <li>PII in logs and error messages.</li>
          <li>Connection pool sized larger than the DB can handle.</li>
          <li>Idle-in-transaction sessions holding locks.</li>
          <li>Ignoring the slow-query log.</li>
          <li>No alerting on replication lag.</li>
          <li>Schema migrations without a rollback path.</li>
          <li>Skipping <code>ANALYZE</code> after a bulk load.</li>
          <li>Vacuum tuning left at defaults on huge tables.</li>
          <li>Ignoring bloat until autovacuum falls behind.</li>
          <li>Backups and primary in the same region.</li>
          <li>No monitoring on disk saturation.</li>
          <li>Secret rotation "on the roadmap" for 2+ years.</li>
          <li>Access grants never audited.</li>
          <li>Documentation lives in someone's head.</li>
          <li>Post-mortems written but never re-read.</li>
        </ol>
        <h3 className="mt-3 font-semibold">Quick fix reference</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Slow query → <code>EXPLAIN (ANALYZE, BUFFERS)</code> before touching indexes.</li>
          <li>Locking → find the blocker via <code>pg_stat_activity</code>, kill only after confirming.</li>
          <li>Growing table → partition on the natural ordering column.</li>
          <li>Deadlock → order lock acquisition consistently across code paths.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Prevention checklist</h3>
        <Callout tone="warning" icon={<AlertTriangle className="h-5 w-5" />} title="Before every PR merges">
          Schema changes reviewed by two engineers. Migration rehearsed on staging.
          Rollback path documented. Alerts tuned for the new query patterns.
        </Callout>
        <h3 className="mt-3 font-semibold">Interview pitfalls</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Forgetting that <code>NULL != NULL</code>.</li>
          <li>Explaining ACID without differentiating isolation levels.</li>
          <li>Mixing up clustered vs non-clustered index behavior across vendors.</li>
          <li>Claiming denormalization "for performance" without a benchmark.</li>
          <li>Suggesting sharding before partitioning.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Most production bugs are old, well-known mistakes in fresh clothing.</li>
          <li>Read the query plan before you touch the schema.</li>
          <li>Prevention is cheaper than debugging — invest in review discipline.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How do I know if my design is 'wrong enough' to redesign?">Track how often small feature changes require schema changes. If it's every sprint, the model is misaligned with the domain.</FAQItem>
        <FAQItem q="Are indexes always good?">No — every index taxes writes. Add them for measured read patterns, remove them when a query goes away.</FAQItem>
        <FAQItem q="Is denormalization ever the right answer?">Yes, after measurement, and only for hotspots. Never as a default posture.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Cartesian product</strong> — every row of A joined with every row of B; usually a bug.</li>
          <li><strong>N+1</strong> — one query plus one per parent row; classic ORM anti-pattern.</li>
          <li><strong>Bloat</strong> — dead-tuple overhead in MVCC databases.</li>
          <li><strong>Serialization failure</strong> — transaction aborted because it couldn't be scheduled serially; retry-safe.</li>
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
