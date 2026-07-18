import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-pdf-notes",
  title: "DBMS — PDF Notes",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "56 min",
  pages: 103,
  lastUpdated: "April 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A 23-chapter offline-ready DBMS study handbook — architecture, ER, SQL, normalization, transactions, indexing, security, distributed & cloud databases with exam and interview notes.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Introduction to DBMS" },
  { id: "c2", label: "2. Database Architecture" },
  { id: "c3", label: "3. Data Models" },
  { id: "c4", label: "4. ER Model" },
  { id: "c5", label: "5. Relational Model" },
  { id: "c6", label: "6. SQL Fundamentals" },
  { id: "c7", label: "7. SQL Commands" },
  { id: "c8", label: "8. Constraints" },
  { id: "c9", label: "9. Keys" },
  { id: "c10", label: "10. Joins" },
  { id: "c11", label: "11. Normalization" },
  { id: "c12", label: "12. Transactions" },
  { id: "c13", label: "13. Concurrency Control" },
  { id: "c14", label: "14. Indexing" },
  { id: "c15", label: "15. Query Processing" },
  { id: "c16", label: "16. Query Optimization" },
  { id: "c17", label: "17. Database Security" },
  { id: "c18", label: "18. Backup & Recovery" },
  { id: "c19", label: "19. Distributed Databases" },
  { id: "c20", label: "20. NoSQL Overview" },
  { id: "c21", label: "21. Cloud Databases" },
  { id: "c22", label: "22. Industry Applications" },
  { id: "c23", label: "23. Chapter Summary" },
  { id: "review", label: "PDF Notes Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Quick Revision Notes", tag: "CS Core", time: "10 min" },
  { title: "DBMS — Cheat Sheet", tag: "CS Core", time: "3 min" },
  { title: "DBMS — Complete Tutorial", tag: "CS Core", time: "49 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-pdf-notes" }],
  }),
  component: Page,
});

function Code({ children }: { children: string }) {
  return <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs leading-relaxed"><code>{children}</code></pre>;
}

function Exam({ items }: { items: string[] }) {
  return (
    <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
      <p className="text-xs font-semibold uppercase text-primary">Exam / Interview notes</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
        {items.map((i, k) => <li key={k}>{i}</li>)}
      </ul>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cover every core DBMS chapter for university semester exams.</li>
          <li>Answer competitive-exam MCQs on SQL, normalization, and indexing.</li>
          <li>Build a permanent, offline-ready reference you can revisit before any interview.</li>
          <li>Consolidate short-answer bullets, comparison tables, and worked SQL.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80"
          caption="Reference DBMS architecture — parser, planner, executor, buffer, storage, WAL."
        />
        <Callout tone="tip" title="How to use">Read one chapter per sitting. Close the notes and try to reproduce the chapter summary from memory.</Callout>
      </Section>

      <Section id="c1" title="1. Introduction to DBMS">
        <p>A <strong>DBMS</strong> is software that stores, retrieves, and administers structured data with concurrency, integrity, and durability guarantees. Compare with file systems — no schema, no transactions, no isolation, and no query language.</p>
        <p><strong>Advantages:</strong> data independence, controlled redundancy, security, ACID, ad-hoc querying via SQL. <strong>Disadvantages:</strong> complexity, cost, tuning overhead.</p>
        <Exam items={[
          "Define DBMS in one line and list four advantages over file systems.",
          "Data abstraction has three levels: physical, logical, and view.",
          "Common users: DBA, application programmer, sophisticated user, naïve user.",
        ]} />
      </Section>

      <Section id="c2" title="2. Database Architecture">
        <p>Three-schema architecture — external, conceptual, internal — separates user views from logical design and physical storage. Two- and three-tier deployments split client, application, and database servers.</p>
        <p>Internal components: connection pool, parser, rewriter, planner/optimizer, executor, buffer manager, storage engine, WAL, transaction manager, background workers (VACUUM, replication, checkpointer).</p>
        <Exam items={[
          "Draw the three-schema architecture and label each level.",
          "Explain the difference between logical and physical data independence.",
        ]} />
      </Section>

      <Section id="c3" title="3. Data Models">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-3 py-2">Model</th><th className="px-3 py-2">Structure</th><th className="px-3 py-2">Example</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Hierarchical</td><td className="px-3 py-2">Tree</td><td className="px-3 py-2">IMS</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Network</td><td className="px-3 py-2">Graph</td><td className="px-3 py-2">IDMS</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Relational</td><td className="px-3 py-2">Tables</td><td className="px-3 py-2">Postgres, MySQL</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Document</td><td className="px-3 py-2">JSON</td><td className="px-3 py-2">MongoDB</td></tr>
              <tr><td className="px-3 py-2">Graph</td><td className="px-3 py-2">Nodes + edges</td><td className="px-3 py-2">Neo4j</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="c4" title="4. ER Model">
        <p>Entities (strong / weak), attributes (simple / composite / multivalued / derived), relationships (1:1, 1:N, M:N), participation (total / partial), specialization, generalization, aggregation. Convert to relational schema using foreign keys and join tables.</p>
        <Exam items={[
          "Weak entities are identified by their partial key + owner's key.",
          "Specialization = top-down; Generalization = bottom-up.",
        ]} />
      </Section>

      <Section id="c5" title="5. Relational Model">
        <p>Everything is a relation of tuples. Relational algebra: σ (select), π (project), × (Cartesian product), ⋈ (join), ∪, ∩, −, ρ (rename). Relational calculus expresses queries declaratively (tuple / domain).</p>
      </Section>

      <Section id="c6" title="6. SQL Fundamentals">
        <p>Standard categories — DDL, DML, DCL, TCL. Logical processing order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.</p>
        <Code>{`SELECT dept_id, COUNT(*) AS n
FROM employees
WHERE active = TRUE
GROUP BY dept_id
HAVING COUNT(*) > 10
ORDER BY n DESC;`}</Code>
      </Section>

      <Section id="c7" title="7. SQL Commands">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>DDL</strong>: CREATE, ALTER, DROP, TRUNCATE, RENAME.</li>
          <li><strong>DML</strong>: SELECT, INSERT, UPDATE, DELETE, MERGE.</li>
          <li><strong>DCL</strong>: GRANT, REVOKE.</li>
          <li><strong>TCL</strong>: BEGIN, COMMIT, ROLLBACK, SAVEPOINT.</li>
        </ul>
      </Section>

      <Section id="c8" title="8. Constraints">
        <p>NOT NULL, UNIQUE, CHECK, DEFAULT, PRIMARY KEY, FOREIGN KEY (ON DELETE CASCADE / RESTRICT / SET NULL). Deferrable constraints delay validation to COMMIT.</p>
      </Section>

      <Section id="c9" title="9. Keys">
        <p>Super key ⊇ candidate key ⊇ primary key. Alternate keys are unused candidate keys. Foreign keys reference the parent's PK. Surrogate keys are synthetic identifiers (BIGINT / UUID).</p>
      </Section>

      <Section id="c10" title="10. Joins">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground text-left">
              <tr><th className="px-3 py-2">Join</th><th className="px-3 py-2">Semantics</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50"><td className="px-3 py-2">INNER</td><td className="px-3 py-2">Only matched rows</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">LEFT</td><td className="px-3 py-2">All from left + matched right (NULL if none)</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">RIGHT</td><td className="px-3 py-2">Mirror of LEFT</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">FULL</td><td className="px-3 py-2">Union of LEFT + RIGHT</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">CROSS</td><td className="px-3 py-2">Cartesian product</td></tr>
              <tr><td className="px-3 py-2">LATERAL</td><td className="px-3 py-2">Correlated per-row subquery</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="c11" title="11. Normalization">
        <p>1NF (atomic values) → 2NF (no partial dependency) → 3NF (no transitive dependency) → BCNF (every determinant is a superkey) → 4NF (no non-trivial MVDs) → 5NF (join dependencies).</p>
        <Figure
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          caption="Normalization flowchart — progressive elimination of dependencies."
        />
        <Exam items={[
          "3NF vs BCNF — every BCNF relation is 3NF; the converse fails when a non-key determinant exists.",
          "Denormalization is acceptable only after profiling read-heavy paths.",
        ]} />
      </Section>

      <Section id="c12" title="12. Transactions">
        <p>ACID properties enforce reliable state transitions. Transaction states: active → partially committed → committed / failed → aborted.</p>
        <Code>{`BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`}</Code>
      </Section>

      <Section id="c13" title="13. Concurrency Control">
        <p>Techniques: 2PL, OCC, MVCC, timestamp ordering. Isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE. Anomalies: dirty read, non-repeatable read, phantom, write skew.</p>
      </Section>

      <Section id="c14" title="14. Indexing">
        <p>Types: B-tree, hash, bitmap, GIN, GiST, BRIN. Clustered vs non-clustered. Covering index carries every column a query needs.</p>
      </Section>

      <Section id="c15" title="15. Query Processing">
        <p>Stages: parse → rewrite → optimize → execute. Optimizer uses statistics, cost model, and join enumeration.</p>
      </Section>

      <Section id="c16" title="16. Query Optimization">
        <p>Heuristics: push selection before joins, prefer index scans on selective predicates, avoid SELECT *. Watch for row-estimate errors, hash spills, and sort spills in EXPLAIN plans.</p>
      </Section>

      <Section id="c17" title="17. Database Security">
        <p>Least-privilege roles, TLS at rest and in flight, encryption at rest, row-level security for multi-tenant apps, secret management, audit logging, prevention of SQL injection.</p>
      </Section>

      <Section id="c18" title="18. Backup & Recovery">
        <p>Logical dumps (pg_dump, mysqldump), physical base backup + WAL / redo logs, point-in-time recovery. Test restore drills quarterly.</p>
      </Section>

      <Section id="c19" title="19. Distributed Databases">
        <p>Sharding, replication (sync / async / semi-sync), consensus (Raft, Paxos), CAP theorem, PACELC. Examples: CockroachDB, Spanner, YugabyteDB, TiDB.</p>
      </Section>

      <Section id="c20" title="20. NoSQL Overview">
        <p>Document (Mongo), key-value (Redis, DynamoDB), wide-column (Cassandra), graph (Neo4j), vector (pgvector, Pinecone). Trade SQL guarantees for scale or flexibility.</p>
      </Section>

      <Section id="c21" title="21. Cloud Databases">
        <p>AWS RDS / Aurora, Azure SQL, GCP Cloud SQL / Spanner, Supabase, Neon, PlanetScale. Managed features: auto-scaling, failover, PITR, connection pooling, read replicas.</p>
      </Section>

      <Section id="c22" title="22. Industry Applications">
        <p>Banking, e-commerce, healthcare, telecom, aviation reservations, education, social platforms. Each demands specific consistency, availability, and audit trade-offs.</p>
      </Section>

      <Section id="c23" title="23. Chapter Summary">
        <p><strong>Foundation:</strong> DBMS &gt; files; relational model rules web apps. <strong>Language:</strong> SQL categories, logical order, joins. <strong>Design:</strong> ER → tables → normal forms. <strong>Runtime:</strong> transactions, isolation, indexing, tuning. <strong>Operations:</strong> security, backups, distribution, cloud.</p>
      </Section>

      <Section id="review" title="PDF Notes Review">
        <p><strong>Chapter-wise summary:</strong> reduce each chapter to one page of bullet points before your exam.</p>
        <p><strong>Important topics:</strong> ACID, isolation anomalies, normalization, joins, EXPLAIN, indexing, security.</p>
        <p><strong>Revision notes:</strong> pair these with “DBMS — Quick Revision Notes”.</p>
        <p><strong>Self assessment:</strong> can you answer a 10-mark question on any chapter without the notes?</p>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>ACID</strong> — Atomicity, Consistency, Isolation, Durability.</li>
          <li><strong>MVCC</strong> — Multi-Version Concurrency Control.</li>
          <li><strong>WAL</strong> — Write-Ahead Log.</li>
          <li><strong>BCNF</strong> — Boyce-Codd Normal Form.</li>
          <li><strong>CAP</strong> — Consistency, Availability, Partition tolerance.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Are these notes exam-oriented?">Yes — each chapter includes short-answer bullets, comparison tables, and revision cues.</FAQItem>
        <FAQItem q="Can I print them?">Yes. The layout is optimised for printing.</FAQItem>
        <FAQItem q="What if I only have one weekend?">Read chapters 1, 6, 8–11, 12–14, and 16 only.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite, MariaDB, IBM Db2 documentation</li>
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
          resources. Database technologies, SQL standards, vendor implementations, and best practices evolve
          continuously — consult official vendor documentation for the latest information. All trademarks,
          product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
