import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-complete-tutorial",
  title: "DBMS — Complete Tutorial",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "49 min",
  pages: 106,
  lastUpdated: "May 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle:
    "A 24-chapter end-to-end DBMS tutorial — architecture, ER modelling, SQL, normalization, transactions, indexing, tuning, security, distributed & NoSQL, plus a capstone project.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Introduction to DBMS" },
  { id: "c2", label: "2. Database Architecture" },
  { id: "c3", label: "3. Data Models" },
  { id: "c4", label: "4. ER Modeling" },
  { id: "c5", label: "5. Relational Model" },
  { id: "c6", label: "6. SQL Fundamentals" },
  { id: "c7", label: "7. DDL" },
  { id: "c8", label: "8. DML" },
  { id: "c9", label: "9. DCL & TCL" },
  { id: "c10", label: "10. Joins" },
  { id: "c11", label: "11. Views" },
  { id: "c12", label: "12. Constraints" },
  { id: "c13", label: "13. Keys" },
  { id: "c14", label: "14. Normalization" },
  { id: "c15", label: "15. Transactions" },
  { id: "c16", label: "16. Concurrency Control" },
  { id: "c17", label: "17. Indexing" },
  { id: "c18", label: "18. Query Optimization" },
  { id: "c19", label: "19. Security" },
  { id: "c20", label: "20. Backup & Recovery" },
  { id: "c21", label: "21. Distributed Databases" },
  { id: "c22", label: "22. NoSQL Basics" },
  { id: "c23", label: "23. Cloud Databases" },
  { id: "c24", label: "24. Capstone Project" },
  { id: "review", label: "Tutorial Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Beginner Guide", tag: "CS Core", time: "13 min" },
  { title: "DBMS — Step-by-Step Learning Guide", tag: "CS Core", time: "28 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-complete-tutorial")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-complete-tutorial" }],
  }),
  component: Page,
});

function Code({ children }: { children: string }) {
  return <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs leading-relaxed"><code>{children}</code></pre>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master every core DBMS topic from fundamentals to distributed systems.</li>
          <li>Write correct, performant SQL — DDL, DML, DCL, TCL, joins, windows, CTEs.</li>
          <li>Design normalized, index-friendly schemas for real applications.</li>
          <li>Reason about transactions, isolation levels, and concurrency.</li>
          <li>Deploy, secure, back up, and monitor a database in production.</li>
          <li>Ship a capstone project you can show in interviews.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80"
          caption="Reference DBMS stack — client → parser → planner → executor → buffer → storage → WAL."
        />
      </Section>

      <Section id="c1" title="1. Introduction to DBMS">
        <p>A DBMS is the operating system for data. It exposes a logical model (usually SQL tables), enforces integrity, and abstracts storage, concurrency, recovery, and security. Popular families: relational (Postgres, MySQL, Oracle, SQL Server), document (MongoDB), key-value (Redis), columnar (ClickHouse), graph (Neo4j), vector (pgvector).</p>
      </Section>

      <Section id="c2" title="2. Database Architecture">
        <p>Three-schema architecture separates external (views), conceptual (logical schema), and internal (storage). Under the hood a typical RDBMS has: connection layer, parser, planner/optimizer, executor, buffer manager, storage engine, WAL, transaction manager, and background workers (VACUUM, checkpointer, replication).</p>
      </Section>

      <Section id="c3" title="3. Data Models">
        <p>Relational, document, key-value, wide-column, graph, and vector. Choose based on access pattern, consistency needs, and cardinality of relationships.</p>
      </Section>

      <Section id="c4" title="4. ER Modeling">
        <p>Entities become tables. Attributes become columns. Relationships become foreign keys or join tables. Cardinalities (1:1, 1:N, M:N) and participation (total/partial) shape the schema. Weak entities become dependent tables with composite keys.</p>
      </Section>

      <Section id="c5" title="5. Relational Model">
        <p>Everything is a relation of tuples. Operations from relational algebra — selection, projection, join, union, difference, aggregation — power every SQL query underneath.</p>
      </Section>

      <Section id="c6" title="6. SQL Fundamentals">
        <Code>{`SELECT col1, col2 FROM table
WHERE cond
GROUP BY col1
HAVING agg
ORDER BY col1
LIMIT n OFFSET m;`}</Code>
        <p>Logical order of evaluation: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.</p>
      </Section>

      <Section id="c7" title="7. DDL Commands">
        <Code>{`CREATE TABLE users(
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE users ADD COLUMN name TEXT;
DROP TABLE IF EXISTS staging_users;
TRUNCATE TABLE logs;`}</Code>
      </Section>

      <Section id="c8" title="8. DML Commands">
        <Code>{`INSERT INTO users(email) VALUES ('a@x.com');
UPDATE users SET name = 'Ada' WHERE id = 1;
DELETE FROM users WHERE created_at < now() - interval '2 years';
MERGE INTO target t USING source s ON t.id = s.id
WHEN MATCHED THEN UPDATE SET name = s.name
WHEN NOT MATCHED THEN INSERT (id, name) VALUES (s.id, s.name);`}</Code>
      </Section>

      <Section id="c9" title="9. DCL & TCL">
        <Code>{`GRANT SELECT, INSERT ON orders TO app_user;
REVOKE DELETE ON orders FROM app_user;

BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  SAVEPOINT sp1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`}</Code>
      </Section>

      <Section id="c10" title="10. Joins">
        <p>INNER, LEFT, RIGHT, FULL, CROSS, and LATERAL joins. Rule of thumb: use INNER for matches, LEFT when you must keep the base set, LATERAL for per-row correlated subqueries.</p>
      </Section>

      <Section id="c11" title="11. Views">
        <p>Regular views are stored SELECTs — safe interfaces, no storage. Materialised views cache results and need REFRESH. Use views for encapsulation, security, and denormalised read paths.</p>
      </Section>

      <Section id="c12" title="12. Constraints">
        <ul className="list-disc space-y-1 pl-5">
          <li>NOT NULL, UNIQUE, CHECK, DEFAULT, FOREIGN KEY.</li>
          <li>Named constraints make errors greppable.</li>
          <li>Prefer database-level constraints over app-level assertions.</li>
        </ul>
      </Section>

      <Section id="c13" title="13. Keys">
        <p>Super, candidate, primary, alternate, foreign, and surrogate keys. Prefer surrogate BIGINT/UUID primary keys with a UNIQUE constraint on any natural key.</p>
      </Section>

      <Section id="c14" title="14. Normalization">
        <p>1NF → 2NF → 3NF → BCNF → 4NF. Progressively remove partial, transitive, and multi-valued dependencies. Denormalise deliberately only after profiling.</p>
      </Section>

      <Section id="c15" title="15. Transactions">
        <p>ACID guarantees. Transactions are the unit of consistency. Use BEGIN/COMMIT explicitly; keep them short to reduce contention.</p>
      </Section>

      <Section id="c16" title="16. Concurrency Control">
        <p>2PL, OCC, and MVCC. Isolation levels — READ COMMITTED, REPEATABLE READ, SERIALIZABLE. Postgres uses MVCC + Serializable Snapshot Isolation.</p>
        <Callout tone="warning" title="Contention pattern">Long transactions block VACUUM and inflate row-version chains. Cap them at seconds, not minutes.</Callout>
      </Section>

      <Section id="c17" title="17. Indexing">
        <p>B-tree (default), hash, GIN (JSON, arrays, full-text), GiST (geo), BRIN (huge, ordered), and covering indexes. Composite index order matches your WHERE / ORDER BY prefix.</p>
      </Section>

      <Section id="c18" title="18. Query Optimization">
        <p>Read EXPLAIN plans bottom-up. Watch for sequential scans on large tables, row-estimate errors, and hash spills. Fix with statistics (ANALYZE), better indexes, or query rewrites (keyset pagination, IN vs EXISTS).</p>
      </Section>

      <Section id="c19" title="19. Security">
        <p>Least-privilege roles, row-level security for multi-tenancy, TLS on the wire, encryption at rest, secret management, and audit logs. Never expose service-role credentials to clients.</p>
      </Section>

      <Section id="c20" title="20. Backup & Recovery">
        <p>Logical dumps (pg_dump / mysqldump) for portability; physical base backup + WAL archiving for point-in-time recovery. Test the restore quarterly — untested backups are hopes, not backups.</p>
      </Section>

      <Section id="c21" title="21. Distributed Databases">
        <p>Sharding, replication (sync/async), consensus (Raft/Paxos), CAP + PACELC. Distributed SQL: CockroachDB, Spanner, TiDB, YugabyteDB. Understand the trade-offs before choosing one.</p>
      </Section>

      <Section id="c22" title="22. NoSQL Basics">
        <p>Document (Mongo), key-value (Redis, DynamoDB), wide-column (Cassandra), graph (Neo4j). NoSQL trades some SQL guarantees for scale or flexibility — model access-first.</p>
      </Section>

      <Section id="c23" title="23. Cloud Databases">
        <p>Managed offerings — AWS RDS/Aurora, Azure SQL, GCP Cloud SQL/Spanner, Supabase, Neon, PlanetScale. Serverless variants (Aurora Serverless v2, Neon) auto-scale; know their cold-start caveats.</p>
      </Section>

      <Section id="c24" title="24. Capstone Project">
        <p>Ship an <strong>Online Bookstore</strong> backend:</p>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Design ER model: users, books, authors, orders, order_items, reviews.</li>
          <li>Normalize to 3NF and generate migrations.</li>
          <li>Seed 10k books; add composite index on (author_id, published_at DESC).</li>
          <li>Write 15 SQL queries — top-sellers by month, cohort retention, unread reviews.</li>
          <li>Add row-level security so users can only read their orders.</li>
          <li>Enable point-in-time recovery; run a drill.</li>
          <li>Document EXPLAIN plans for the 3 hottest queries.</li>
        </ol>
      </Section>

      <Section id="review" title="Tutorial Review">
        <Callout tone="tip" title="Final quiz">
          Answer 30 mixed questions on schema design, SQL, transactions, and indexing. Aim for &gt;80%.
        </Callout>
        <p><strong>Project checklist:</strong> normalized schema · seed script · 15 queries with plans · RLS enabled · backups verified.</p>
        <p><strong>Interview prep:</strong> pair this tutorial with “DBMS — Interview Questions”.</p>
        <p><strong>Certification prep:</strong> maps to Oracle OCA, Microsoft DP-300, MongoDB Associate, and Postgres Certified Professional.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I need to finish everything sequentially?">No — use the 8-week roadmap in the companion guide if you prefer a schedule.</FAQItem>
        <FAQItem q="Which DB should I install for practice?">PostgreSQL locally + a free cloud instance for parity with production.</FAQItem>
        <FAQItem q="What if I only have 3 hours a week?">Prioritise SQL, transactions, and indexing; skim distributed/NoSQL.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite, MariaDB, IBM Db2 documentation</li>
          <li>Oracle Learning, Microsoft Learn, PostgreSQL Wiki</li>
          <li>Silberschatz, Korth & Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>CMU 15-445 (Andy Pavlo), MIT OCW 6.830, Stanford CS245</li>
          <li>ACM Digital Library, IEEE Xplore</li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted educational
          resources. Database technologies, SQL standards, and vendor implementations evolve continuously —
          consult official vendor documentation for the latest information. All trademarks, product names,
          logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
