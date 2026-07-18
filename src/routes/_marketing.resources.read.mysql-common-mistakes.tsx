import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "mysql-common-mistakes",
  title: "MySQL — Common Mistakes",
  category: "Databases",
  difficulty: "Beginner",
  readingTime: "15 min",
  pages: 20,
  lastUpdated: "September 2026",
  tags: ["MySQL", "Tuning"],
  heroImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1800&q=80",
  heroSubtitle: "N+1 queries, missing indexes, cartesian joins, and other classic MySQL pitfalls.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture, ER Diagrams & Execution Flow" },
  { id: "examples", label: "Practical Examples & Industry Applications" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Performance, Security & Tuning" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "MySQL — Beginner Guide", tag: "SQL", time: "11 min" },
  { title: "MySQL — Cheat Sheet", tag: "SQL", time: "6 min" },
  { title: "MySQL — Interview Questions", tag: "SQL", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/mysql-common-mistakes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/mysql-common-mistakes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the topic scope of the <b>Common Mistakes</b> — practical, production-ready SQL.</li>
          <li>Read and write clean SQL across PostgreSQL, MySQL, SQL Server, and SQLite.</li>
          <li>Design normalized relational schemas with correct keys and constraints.</li>
          <li>Use joins, aggregation, subqueries, CTEs, and window functions confidently.</li>
          <li>Understand indexes, execution plans, and query optimization.</li>
          <li>Handle transactions, isolation levels, and concurrency safely.</li>
          <li>Prevent SQL injection and follow least-privilege security patterns.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic computer literacy — install software and use a terminal or GUI.</li>
          <li>No prior programming experience required.</li>
          <li>A local database — PostgreSQL, MySQL, or SQLite — plus a client (psql, MySQL Workbench, DBeaver).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Database Fundamentals — DBMS, RDBMS, SQL standards, ACID, CAP, OLTP vs OLAP</li>
          <li>Database Design — ER diagrams, entities, keys, constraints, normalization</li>
          <li>SQL Basics — SELECT, FROM, WHERE, ORDER BY, GROUP BY, HAVING, DISTINCT, LIMIT</li>
          <li>Filtering &amp; Expressions — operators, LIKE, BETWEEN, IN, EXISTS, CASE, NULLs</li>
          <li>Joins — INNER, LEFT, RIGHT, FULL, CROSS, SELF, multi-table</li>
          <li>Aggregation — COUNT, SUM, AVG, MIN, MAX, GROUPING, ROLLUP, CUBE</li>
          <li>Subqueries &amp; CTEs — scalar, correlated, nested, recursive CTEs</li>
          <li>Window Functions — ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, NTILE, PARTITION BY</li>
          <li>Data Modification — INSERT, UPDATE, DELETE, MERGE, UPSERT, TRUNCATE</li>
          <li>Database Objects — views, materialized views, indexes, sequences, synonyms</li>
          <li>Programmability — stored procedures, functions, triggers, cursors</li>
          <li>Transactions — COMMIT, ROLLBACK, SAVEPOINT, isolation levels, locking, deadlocks</li>
          <li>Performance — plans, indexing strategies, composite indexes, partitioning, sharding</li>
          <li>Security — auth, roles, privileges, encryption, injection prevention, auditing</li>
          <li>Platforms — MySQL, PostgreSQL, SQL Server, Oracle, SQLite, MariaDB</li>
          <li>Data Warehousing — star / snowflake schemas, ETL, data lakes, BI</li>
          <li>Best Practices, Career &amp; References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>SQL (Structured Query Language) is the standard language for talking to relational databases. It powers analytics dashboards, banking systems, e-commerce checkouts, and every serious backend. This resource — <b>MySQL — Common Mistakes</b> — is designed to be self-contained: N+1 queries, missing indexes, cartesian joins, and other classic MySQL pitfalls.</p>
        <Callout tone="info" title="SQL in one line">SQL = declarative queries + relational algebra + a planner that figures out the "how".</Callout>
        <Figure src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=1400&q=80" caption="Figure 1 — Relational database architecture: client, connection pool, planner, executor, storage engine, and disk." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Database fundamentals</b> — DBMS vs RDBMS, ISO SQL standards, ACID properties, CAP theorem, OLTP vs OLAP workloads.</li>
          <li><b>Design</b> — ER diagrams, entities and relationships, cardinality, primary / foreign / composite keys, constraints, 1NF–3NF, BCNF, denormalization trade-offs.</li>
          <li><b>Querying</b> — <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>ORDER BY</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>DISTINCT</code>, <code>LIMIT</code>/<code>OFFSET</code>.</li>
          <li><b>Filtering &amp; expressions</b> — comparison and logical operators, <code>LIKE</code>, <code>BETWEEN</code>, <code>IN</code>, <code>EXISTS</code>, <code>CASE</code>, <code>NULL</code> semantics.</li>
          <li><b>Joins</b> — INNER, LEFT, RIGHT, FULL OUTER, CROSS, SELF; multi-table joins and readable aliases.</li>
          <li><b>Aggregation</b> — <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>, <code>GROUPING SETS</code>, <code>ROLLUP</code>, <code>CUBE</code>.</li>
          <li><b>Subqueries &amp; CTEs</b> — scalar, correlated, nested subqueries, non-recursive and recursive CTEs.</li>
          <li><b>Window functions</b> — <code>ROW_NUMBER</code>, <code>RANK</code>, <code>DENSE_RANK</code>, <code>LEAD</code>, <code>LAG</code>, <code>NTILE</code>, <code>PARTITION BY</code>, frame clauses.</li>
          <li><b>Data modification</b> — <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>, <code>MERGE</code>/UPSERT, <code>TRUNCATE</code>.</li>
          <li><b>Database objects</b> — views, materialized views, indexes, sequences, synonyms.</li>
          <li><b>Programmability</b> — stored procedures, functions, triggers, cursors.</li>
          <li><b>Transactions</b> — <code>COMMIT</code>, <code>ROLLBACK</code>, <code>SAVEPOINT</code>, isolation levels (Read Committed, Repeatable Read, Serializable), locks, deadlocks.</li>
          <li><b>Performance</b> — query planners, execution plans, B-tree and hash indexes, composite / covering indexes, partitioning, sharding.</li>
          <li><b>Security</b> — authentication, RBAC, privileges, encryption at rest / in transit, parameterized queries, auditing.</li>
          <li><b>Warehousing</b> — star / snowflake schemas, ETL/ELT, data lakes, BI tools.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture, ER Diagrams & Execution Flow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`ER diagram — Orders schema

┌──────────┐        ┌───────────┐        ┌──────────┐
│ Customer │ 1----N │  Order    │ N----1 │ Product  │
├──────────┤        ├───────────┤        ├──────────┤
│ id (PK)  │        │ id (PK)   │        │ id (PK)  │
│ name     │        │ cust_id FK│        │ name     │
│ email    │        │ prod_id FK│        │ price    │
└──────────┘        │ qty, ts   │        └──────────┘
                    └───────────┘

Query execution:
  SQL text → Parser → Planner → Executor → Storage engine → Disk`}
        </pre>
        <Code>{`-- Schema, indexes, and a real analytical query
CREATE TABLE customer (
  id      BIGSERIAL PRIMARY KEY,
  name    TEXT NOT NULL,
  email   TEXT UNIQUE NOT NULL
);

CREATE TABLE product (
  id      BIGSERIAL PRIMARY KEY,
  name    TEXT NOT NULL,
  price   NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE orders (
  id          BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customer(id),
  product_id  BIGINT NOT NULL REFERENCES product(id),
  qty         INT    NOT NULL CHECK (qty > 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX orders_customer_created_idx
  ON orders (customer_id, created_at DESC);

-- Top 3 customers by revenue, last 30 days
SELECT c.name,
       SUM(o.qty * p.price) AS revenue,
       RANK() OVER (ORDER BY SUM(o.qty * p.price) DESC) AS rk
FROM   orders   o
JOIN   customer c ON c.id = o.customer_id
JOIN   product  p ON p.id = o.product_id
WHERE  o.created_at >= now() - INTERVAL '30 days'
GROUP  BY c.name
ORDER  BY revenue DESC
LIMIT  3;`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Industry Applications">
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — SQL in the real world — banking, e-commerce, SaaS analytics, warehouses, and reporting." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Banking &amp; fintech</b> — transactional ledgers backed by ACID SQL databases.</li>
          <li><b>E-commerce</b> — product catalogs, carts, orders, inventory on Postgres or MySQL.</li>
          <li><b>SaaS analytics</b> — multi-tenant reporting with materialized views and CTEs.</li>
          <li><b>Data warehousing</b> — star / snowflake schemas in Snowflake, BigQuery, Redshift.</li>
          <li><b>Government &amp; healthcare</b> — auditable relational systems with strict RBAC.</li>
          <li><b>Backend APIs</b> — most REST / GraphQL services persist to a SQL database.</li>
        </ul>
        <Code>{`-- Window function: month-over-month revenue with LAG
SELECT date_trunc('month', created_at) AS month,
       SUM(qty * price) AS revenue,
       LAG(SUM(qty * price)) OVER (ORDER BY date_trunc('month', created_at)) AS prev,
       ROUND(100.0 * (SUM(qty * price) -
             LAG(SUM(qty * price)) OVER (ORDER BY date_trunc('month', created_at)))
             / NULLIF(LAG(SUM(qty * price)) OVER (ORDER BY date_trunc('month', created_at)), 0), 2) AS growth_pct
FROM   orders o JOIN product p ON p.id = o.product_id
GROUP  BY 1
ORDER  BY 1;`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use snake_case for tables and columns; keep names singular or plural consistently.</li>
          <li>Always define primary keys and appropriate foreign keys with <code>NOT NULL</code> where required.</li>
          <li>Prefer explicit column lists — avoid <code>SELECT *</code> in application queries.</li>
          <li>Use parameterized queries (never string-concatenate user input).</li>
          <li>Wrap multi-statement writes in transactions with the right isolation level.</li>
          <li>Read <code>EXPLAIN (ANALYZE, BUFFERS)</code> before adding an index.</li>
          <li>Back up regularly and test restores — a backup you can't restore is not a backup.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Cartesian joins</b> — forgetting the ON clause and multiplying rows.</li>
          <li><b>Missing indexes</b> on foreign keys or WHERE-clause columns.</li>
          <li><b>N+1 queries</b> — issuing one query per row instead of a single join.</li>
          <li><b>Silent NULL bugs</b> — <code>= NULL</code> vs <code>IS NULL</code>, and NULL-vs-empty confusion.</li>
          <li><b>Wrong isolation level</b> — anomalies under Read Committed you thought were Serializable.</li>
          <li><b>Deleting without a WHERE</b> or without a transaction to roll back.</li>
          <li><b>SQL injection</b> from string-concatenated queries.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use CTEs to break big queries into readable steps.</li>
          <li>Reach for window functions before self-joins for ranking and running totals.</li>
          <li><code>EXPLAIN ANALYZE</code> is the fastest way to learn how the planner thinks.</li>
          <li>Composite indexes on <code>(a, b)</code> also help queries filtering only on <code>a</code>.</li>
          <li>Use <code>INSERT ... ON CONFLICT</code> (Postgres) or <code>MERGE</code> for clean upserts.</li>
          <li>Keep transactions short — long transactions block VACUUM and bloat tables.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Concept</th>
                <th className="py-2 pr-4">Use when</th>
                <th className="py-2">Cost</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">INNER JOIN</td><td>Only matching rows are meaningful.</td><td>Cheapest join if indexed.</td></tr>
              <tr><td className="py-2 pr-4">LEFT JOIN</td><td>Keep every left row, match if possible.</td><td>Same cost class as INNER.</td></tr>
              <tr><td className="py-2 pr-4">Subquery</td><td>Small, self-contained lookup.</td><td>Often rewritten to a join.</td></tr>
              <tr><td className="py-2 pr-4">CTE</td><td>Readability &amp; recursion.</td><td>Can be inlined by planner.</td></tr>
              <tr><td className="py-2 pr-4">Window function</td><td>Ranking, running totals.</td><td>Avoids extra self-joins.</td></tr>
              <tr><td className="py-2 pr-4">B-tree index</td><td>Range and equality queries.</td><td>Extra writes + storage.</td></tr>
              <tr><td className="py-2 pr-4">Materialized view</td><td>Expensive query, low freshness.</td><td>Storage + refresh cost.</td></tr>
              <tr><td className="py-2 pr-4">Serializable txn</td><td>Strict correctness.</td><td>More retries under load.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Tuning">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Plans</b> — always read <code>EXPLAIN</code>/<code>EXPLAIN ANALYZE</code> before optimizing.</li>
          <li><b>Indexes</b> — add for WHERE, JOIN, and ORDER BY columns; drop unused indexes.</li>
          <li><b>Partitioning</b> — range or list partition huge tables (orders by month, logs by day).</li>
          <li><b>Concurrency</b> — pick the weakest isolation that's still correct; keep transactions short.</li>
          <li><b>Security</b> — least-privilege roles, parameterized queries, TLS in transit, encryption at rest, audit logs.</li>
          <li><b>Backups &amp; DR</b> — nightly logical + streaming physical backups; test restores quarterly.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>SQL is declarative — you describe the result, the planner picks the path.</li>
          <li>Good schema design (keys, constraints, normalization) prevents most bugs.</li>
          <li>Indexes and execution plans are the two levers behind query performance.</li>
          <li>Transactions and isolation levels protect correctness under concurrency.</li>
          <li>SQL is a portable, timeless skill for analytics, backend, and data engineering.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is SQL still worth learning?">Yes — every serious backend, analytics stack, and warehouse still speaks SQL.</FAQItem>
        <FAQItem q="Which database should I start with?">PostgreSQL is the strongest all-rounder; SQLite is the easiest to set up locally.</FAQItem>
        <FAQItem q="SQL vs NoSQL?">Use SQL for structured, relational data; NoSQL for document / key-value / time-series workloads.</FAQItem>
        <FAQItem q="How do I get faster queries?">Read the plan, add the right index, avoid <code>SELECT *</code>, and keep transactions short.</FAQItem>
        <FAQItem q="How do I prevent SQL injection?">Always use parameterized queries or an ORM — never concatenate user input into SQL.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://dev.mysql.com/doc/refman/8.0/en/" target="_blank" rel="noreferrer">MySQL Reference Manual</a> · <a className="text-primary hover:underline" href="https://dev.mysql.com/doc/refman/8.0/en/innodb-storage-engine.html" target="_blank" rel="noreferrer">InnoDB Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://dev.mysql.com/doc/workbench/en/" target="_blank" rel="noreferrer">MySQL Workbench</a> · <a className="text-primary hover:underline" href="https://dev.mysql.com/doc/mysql-shell/8.0/en/" target="_blank" rel="noreferrer">MySQL Shell</a></li>
          <li><a className="text-primary hover:underline" href="https://dev.mysql.com/doc/refman/8.0/en/replication.html" target="_blank" rel="noreferrer">MySQL Replication</a> · <a className="text-primary hover:underline" href="https://dev.mysql.com/doc/connector-j/en/" target="_blank" rel="noreferrer">Connector/J</a> · <a className="text-primary hover:underline" href="https://dev.mysql.com/doc/connector-python/en/" target="_blank" rel="noreferrer">Connector/Python</a></li>
          <li><a className="text-primary hover:underline" href="https://use-the-index-luke.com/" target="_blank" rel="noreferrer">Use The Index, Luke!</a> — indexing &amp; performance</li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. SQL standards, engines, and platforms evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
