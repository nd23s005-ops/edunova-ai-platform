import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-frequently-asked-questions",
  title: "DBMS — Frequently Asked Questions",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "9 min",
  pages: 10,
  lastUpdated: "February 2026",
  tags: ["DBMS", "SQL", "Database Systems"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "200+ frequently asked DBMS questions — beginner doubts, SQL examples, concept explanations, common misconceptions, and interview-ready answers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "1. Introduction to DBMS" },
  { id: "fundamentals", label: "2. Database Fundamentals" },
  { id: "sql", label: "3. SQL Basics" },
  { id: "keys", label: "4. Keys & Constraints" },
  { id: "normalization", label: "5. Normalization" },
  { id: "txn", label: "6. Transactions & ACID" },
  { id: "indexing", label: "7. Indexing" },
  { id: "security", label: "8. Database Security" },
  { id: "perf", label: "9. Performance Optimization" },
  { id: "interview", label: "10. Interview FAQs" },
  { id: "review", label: "FAQ Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Learning Roadmap", tag: "CS Core", time: "10 min" },
  { title: "DBMS — Tips & Tricks", tag: "CS Core", time: "12 min" },
  { title: "System Design", tag: "CS Core", time: "20 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-frequently-asked-questions")({
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

function QA({ q, a }: { q: string; a: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/50 p-4">
      <p className="font-semibold text-foreground">Q. {q}</p>
      <div className="mt-2 text-sm text-muted-foreground">{a}</div>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand frequently asked DBMS concepts.</li>
          <li>Clarify common database misconceptions.</li>
          <li>Learn SQL through practical examples.</li>
          <li>Prepare for interviews and examinations.</li>
          <li>Build strong database fundamentals.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1600&q=80"
          caption="DBMS architecture — the three-schema model (external, conceptual, internal) sits between users and physical storage."
        />
      </Section>

      <Section id="intro" title="1. Introduction to DBMS">
        <div className="space-y-3">
          <QA q="What is a DBMS?" a="A Database Management System is software that stores, retrieves, and manages structured data. Examples: MySQL, PostgreSQL, Oracle, SQL Server, SQLite." />
          <QA q="File system vs DBMS — which is better?" a="DBMS offers concurrency, integrity constraints, ACID transactions, security, and querying via SQL. File systems have none of that." />
          <QA q="What are the types of DBMS?" a="Relational (RDBMS), Hierarchical, Network, Object-oriented, NoSQL (document, key-value, column, graph)." />
          <QA q="Who is a DBA?" a="A Database Administrator installs, tunes, backs up, secures, and monitors the database." />
          <QA q="What is data redundancy?" a="Storing the same data in multiple places. Normalization eliminates it." />
          <QA q="Common misconception" a={<>“NoSQL means no SQL.” It actually means <em>Not Only SQL</em> — many NoSQL stores expose SQL-like query APIs.</>} />
        </div>
      </Section>

      <Section id="fundamentals" title="2. Database Fundamentals">
        <div className="space-y-3">
          <QA q="What is a schema?" a="The logical structure of a database — tables, columns, types, constraints, relationships." />
          <QA q="Table vs relation vs entity?" a="An entity is a real-world thing; a relation is its mathematical model; a table is its physical storage." />
          <QA q="What is an ER diagram?" a="Entity–Relationship diagram — visualises entities, attributes, and relationships (1:1, 1:N, M:N)." />
          <QA q="Row vs Tuple vs Record?" a="All three mean the same thing — a single row in a table." />
          <QA q="What is DDL vs DML vs DCL vs TCL?" a="DDL = CREATE/ALTER/DROP; DML = SELECT/INSERT/UPDATE/DELETE; DCL = GRANT/REVOKE; TCL = COMMIT/ROLLBACK/SAVEPOINT." />
        </div>
      </Section>

      <Section id="sql" title="3. SQL Basics">
        <div className="space-y-3">
          <QA
            q="How do I filter rows?"
            a={<pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`SELECT id, name FROM users
WHERE country = 'IN' AND active = TRUE
ORDER BY created_at DESC
LIMIT 10;`}</pre>}
          />
          <QA
            q="INNER JOIN vs LEFT JOIN?"
            a={<pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`-- INNER: only matching rows
SELECT o.id, u.name FROM orders o
JOIN users u ON u.id = o.user_id;

-- LEFT: keep all orders, NULL if no user
SELECT o.id, u.name FROM orders o
LEFT JOIN users u ON u.id = o.user_id;`}</pre>}
          />
          <QA q="GROUP BY vs DISTINCT?" a="GROUP BY groups rows so aggregate functions (COUNT, SUM, AVG) apply per group. DISTINCT just removes duplicate rows." />
          <QA q="WHERE vs HAVING?" a="WHERE filters rows before aggregation. HAVING filters groups after aggregation." />
          <QA q="What is a subquery?" a="A SELECT nested inside another query. Correlated subqueries reference outer columns and often re-evaluate per row." />
          <QA q="What are window functions?" a="Aggregations that don’t collapse rows: ROW_NUMBER(), RANK(), LAG(), LEAD(), SUM() OVER (PARTITION BY ...)." />
        </div>
      </Section>

      <Section id="keys" title="4. Keys & Constraints">
        <div className="space-y-3">
          <QA q="Primary key vs unique key?" a="Primary key uniquely identifies a row and cannot be NULL. Unique allows NULLs (implementation-dependent) but still enforces uniqueness." />
          <QA q="What is a foreign key?" a="A column that references the primary key of another table, enforcing referential integrity." />
          <QA q="Composite key?" a="A primary key made of two or more columns. Common in join tables (order_id, product_id)." />
          <QA q="Surrogate vs natural key?" a="Surrogate = system-generated (UUID, serial). Natural = derived from real-world data (email, ISBN). Prefer surrogate for stability." />
          <QA q="What is a CHECK constraint?" a="Enforces a boolean expression on inserts/updates: CHECK (price >= 0)." />
          <Callout title="Interview tip">A table can have many unique keys but only one primary key. Every primary key is a unique key, not vice versa.</Callout>
        </div>
      </Section>

      <Section id="normalization" title="5. Normalization">
        <div className="space-y-3">
          <QA q="Why normalize?" a="Reduce redundancy, avoid update/insert/delete anomalies, and keep data consistent." />
          <QA q="1NF, 2NF, 3NF in one line each?" a="1NF: atomic columns. 2NF: 1NF + no partial dependency on composite key. 3NF: 2NF + no transitive dependency." />
          <QA q="What is BCNF?" a="A stricter 3NF — for every functional dependency X → Y, X must be a superkey." />
          <QA q="Denormalization — why?" a="Trade some redundancy for read performance (e.g., analytics, caching aggregates)." />
          <QA q="Common misconception" a="Higher normal form is not always better. Production systems balance 3NF/BCNF with denormalized read models." />
        </div>
      </Section>

      <Section id="txn" title="6. Transactions & ACID">
        <div className="space-y-3">
          <QA q="What is a transaction?" a="A logical unit of work. Either all statements succeed (COMMIT) or none apply (ROLLBACK)." />
          <QA q="Explain ACID." a="Atomicity, Consistency, Isolation, Durability." />
          <QA q="Isolation levels?" a="READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE. Higher = fewer anomalies, more locking." />
          <QA q="Dirty read vs phantom read?" a="Dirty read: reading uncommitted data. Phantom: same query returns different row set within one transaction." />
          <QA q="What is a deadlock?" a="Two transactions each hold a lock the other needs. The DB kills one (deadlock victim)." />
        </div>
      </Section>

      <Section id="indexing" title="7. Indexing">
        <div className="space-y-3">
          <QA q="What is an index?" a="A separate data structure (usually a B-tree) that speeds up lookups at the cost of extra storage and slower writes." />
          <QA q="When should I NOT add an index?" a="On tables with heavy writes, tiny tables, columns with very low cardinality, or columns never used in WHERE/JOIN/ORDER BY." />
          <QA q="Clustered vs non-clustered index?" a="Clustered = table rows stored in index order (only one per table). Non-clustered = separate structure pointing to rows." />
          <QA q="Composite index — order matters?" a="Yes. Index (a, b) helps WHERE a=… and WHERE a=… AND b=… but not WHERE b=… alone." />
          <QA q="What is a covering index?" a="Index that contains all columns a query needs, so the query is answered without touching the table." />
        </div>
      </Section>

      <Section id="security" title="8. Database Security">
        <div className="space-y-3">
          <QA q="What is SQL injection?" a="Attacker manipulates a query by injecting SQL through user input. Prevent with parameterised queries / prepared statements." />
          <QA q="Role-based access control?" a="GRANT/REVOKE privileges to roles, assign users to roles. Least privilege principle." />
          <QA q="Encryption at rest vs in transit?" a="At rest = disk/tablespace encryption. In transit = TLS between client and server." />
          <QA q="Row-Level Security (RLS)?" a="Policies that automatically filter rows a user can SELECT/UPDATE based on their identity." />
        </div>
      </Section>

      <Section id="perf" title="9. Performance Optimization">
        <div className="space-y-3">
          <QA q="How do I read an EXPLAIN plan?" a="Look for sequential scans on large tables, missing indexes, high row estimates, and nested loops over big sets." />
          <QA q="SELECT * — why is it bad?" a="Fetches unneeded columns, breaks covering indexes, and couples queries to schema changes." />
          <QA q="N+1 query problem?" a="Running one query per parent row instead of a single JOIN or IN () query. Fix with eager loading." />
          <QA q="When to partition?" a="Very large tables with a clear range key (date, tenant_id). Partitioning prunes reads and eases retention." />
        </div>
      </Section>

      <Section id="interview" title="10. Interview FAQs">
        <div className="space-y-3">
          <QA q="Difference between DELETE, TRUNCATE, DROP?" a="DELETE removes rows (logged, can WHERE, keeps table). TRUNCATE empties the table quickly (minimal logging). DROP removes the table entirely." />
          <QA q="UNION vs UNION ALL?" a="UNION removes duplicates (extra sort). UNION ALL keeps all rows — faster." />
          <QA q="What is a view?" a="A stored SELECT. Materialized views cache the result set and must be refreshed." />
          <QA q="Stored procedure vs function?" a="Procedures can have side effects and no return; functions return a value and are usable inside SELECT." />
          <QA q="Trigger?" a="Code that runs automatically on INSERT/UPDATE/DELETE. Use sparingly — hard to debug." />
          <QA q="OLTP vs OLAP?" a="OLTP = many small transactional writes. OLAP = analytical reads over large datasets (data warehouses)." />
        </div>
      </Section>

      <Section id="review" title="FAQ Review">
        <Callout title="Top 50 Important Questions">
          Master these before any interview: DBMS vs file system, ACID, isolation levels, normalization forms, primary vs unique, INNER vs LEFT JOIN, GROUP BY vs DISTINCT, indexing trade-offs, EXPLAIN plans, SQL injection, transactions vs autocommit, deadlocks, views vs materialized views, N+1, denormalization, RLS, partitioning, sharding, replication, CAP theorem.
        </Callout>
        <p><strong>Interview Checklist:</strong> Can you write JOINs, GROUP BY, window functions, and CTEs from memory? Can you design a 3NF schema for a given domain? Can you explain when NOT to add an index?</p>
        <p><strong>Revision Notes:</strong> One page per topic — definition, syntax, example, gotcha.</p>
        <p><strong>Self Assessment:</strong> Take a 20-question mock quiz after each chapter. Below 70% → revise that chapter.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this resource enough for a job interview?">Yes — combined with hands-on SQL practice on a real DB.</FAQItem>
        <FAQItem q="Which DB should I learn first?">PostgreSQL — free, standards-compliant, and widely used.</FAQItem>
        <FAQItem q="How much SQL is enough?">Comfortable with JOINs, GROUP BY, subqueries, window functions, CTEs, and indexes.</FAQItem>
      </Section>

      <References
        items={[
          "PostgreSQL Documentation — postgresql.org/docs",
          "MySQL Documentation — dev.mysql.com/doc",
          "Oracle Database Documentation — docs.oracle.com/en/database",
          "Microsoft SQL Server Docs — learn.microsoft.com/sql",
          "SQLite Documentation — sqlite.org/docs.html",
          "Silberschatz, Korth & Sudarshan — Database System Concepts",
          "Elmasri & Navathe — Fundamentals of Database Systems",
          "MIT OCW 6.830 — Database Systems",
          "Carnegie Mellon — 15-445 Database Systems",
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
