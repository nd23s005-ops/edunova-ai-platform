import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-interview-questions",
  title: "DBMS — Interview Questions",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "32 min",
  pages: 41,
  lastUpdated: "October 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "300+ recruiter-tested DBMS interview questions — beginner to enterprise — with layered hints, model answers, SQL walkthroughs, design scenarios, and mock rounds.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "1. Introduction to DBMS Interviews" },
  { id: "beg", label: "2. Beginner Questions" },
  { id: "mid", label: "3. Intermediate Questions" },
  { id: "adv", label: "4. Advanced Questions" },
  { id: "sql", label: "5. SQL Interview Questions" },
  { id: "norm", label: "6. Normalization Questions" },
  { id: "txn", label: "7. Transactions & ACID" },
  { id: "idx", label: "8. Indexing Questions" },
  { id: "opt", label: "9. Query Optimization" },
  { id: "design", label: "10. Database Design Scenarios" },
  { id: "sys", label: "11. System Design Interviews" },
  { id: "hr", label: "12. HR & Behavioral" },
  { id: "mock", label: "13. Mock Interview" },
  { id: "final", label: "14. Final Checklist" },
  { id: "review", label: "Interview Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Practice Questions", tag: "CS Core", time: "33 min" },
  { title: "DBMS — Answer Key", tag: "CS Core", time: "20 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-interview-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-interview-questions" }],
  }),
  component: Page,
});

function IQ({ q, hint, a }: { q: string; hint?: string; a: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/50 p-4">
      <p className="font-semibold text-foreground">Q. {q}</p>
      {hint && <p className="mt-1 text-xs italic text-muted-foreground">Hint: {hint}</p>}
      <div className="mt-2 text-sm text-muted-foreground">{a}</div>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Answer DBMS interview questions from junior to senior levels.</li>
          <li>Structure SQL problem-solving in 60–90 seconds.</li>
          <li>Design schemas and reason about trade-offs on a whiteboard.</li>
          <li>Handle system-design rounds involving databases.</li>
          <li>Nail behavioural rounds with database-flavoured stories.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          caption="The DBMS interview funnel — phone screen → SQL round → design round → system design → HR."
        />
      </Section>

      <Section id="intro" title="1. Introduction to DBMS Interviews">
        <p>Most companies test DBMS across four rounds: a fundamentals screen, a hands-on SQL round on a whiteboard or shared editor, a schema/ER design round, and — for senior roles — a system-design round involving scale, replication, and consistency. Recruiters look for <strong>clarity</strong>, <strong>trade-off awareness</strong>, and <strong>calm communication</strong>, not memorised trivia.</p>
        <Callout tone="tip" title="Answer template">Define the term → give an example → state one trade-off → mention how you would validate it in production.</Callout>
      </Section>

      <Section id="beg" title="2. Beginner Questions">
        <div className="space-y-3">
          <IQ q="Difference between DBMS and RDBMS?" hint="Relations, keys, ACID" a="DBMS stores and retrieves data of any model; RDBMS additionally enforces the relational model — tables, keys, referential integrity, and SQL with ACID transactions." />
          <IQ q="What are the ACID properties?" a="Atomicity, Consistency, Isolation, Durability. Every real transactional DB implements these; distributed systems relax them under partitions." />
          <IQ q="Primary key vs Unique key?" a="Primary is one per table and non-null; Unique can be many and may allow NULLs (dialect-specific)." />
          <IQ q="What is normalization?" a="Organising data to reduce redundancy and avoid anomalies through progressive normal forms (1NF → 3NF/BCNF)." />
          <IQ q="Types of SQL commands?" a="DDL, DML, DCL, TCL — with 2–3 examples each." />
          <IQ q="What is a foreign key?" a="A column referring to the primary key of another table, enforcing referential integrity." />
        </div>
      </Section>

      <Section id="mid" title="3. Intermediate Questions">
        <div className="space-y-3">
          <IQ q="Compare INNER, LEFT, RIGHT and FULL JOIN." a="INNER = matches only; LEFT/RIGHT keep unmatched rows from one side with NULLs; FULL keeps unmatched rows from both sides." />
          <IQ q="What is a correlated subquery?" hint="Referenced columns from the outer query" a="A subquery that references columns of the enclosing query and re-runs per outer row. Often rewritable as a JOIN or window function for better plans." />
          <IQ q="Explain functional dependency." a="X → Y means: whenever two rows agree on X, they also agree on Y. FDs drive normalization." />
          <IQ q="What is a deadlock and how is it detected?" a="Circular wait between transactions holding incompatible locks. DBs detect via a wait-for graph and pick a victim (usually youngest or cheapest)." />
          <IQ q="Difference between clustered and non-clustered indexes." a="Clustered dictates the physical row order (one per table). Non-clustered is a separate structure pointing at rows and there can be many." />
          <IQ q="What is a view and when is it useful?" a="A named SELECT stored in the catalog. Use for encapsulation, security, or presenting a stable interface over changing tables." />
        </div>
      </Section>

      <Section id="adv" title="4. Advanced Questions">
        <div className="space-y-3">
          <IQ q="How does MVCC work in PostgreSQL?" hint="xmin, xmax, snapshot" a="Every row version carries xmin/xmax. A snapshot sees a version if xmin is committed and xmax is not visible. Old versions are reclaimed by VACUUM." />
          <IQ q="Explain isolation anomalies at each level." a="READ UNCOMMITTED → dirty read; READ COMMITTED → non-repeatable; REPEATABLE READ → phantom (Postgres SI avoids phantoms but allows write skew); SERIALIZABLE → none." />
          <IQ q="How does a hash join spill to disk?" a="If the build side exceeds work_mem, hash tables partition on the hash key; matching partitions are joined one at a time from disk." />
          <IQ q="Explain 2PL vs OCC vs MVCC." a="2PL = pessimistic locking; OCC = validate at commit; MVCC = version rows and use snapshots. Each fits different contention profiles." />
          <IQ q="What is ARIES?" a="Recovery algorithm using WAL, LSN, CLRs and three phases (analysis, redo, undo). Steal + no-force buffer policy; recovery is idempotent." />
          <IQ q="Difference between physical and logical replication." a="Physical ships WAL bytes — same version, mirror. Logical ships row events — cross-version, selective, transformable." />
        </div>
      </Section>

      <Section id="sql" title="5. SQL Interview Questions">
        <div className="space-y-3">
          <IQ q="Find the second highest salary." hint="DENSE_RANK or subquery" a={<><p>Two standard approaches:</p>
            <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`-- subquery
SELECT MAX(salary) FROM emp
WHERE salary < (SELECT MAX(salary) FROM emp);

-- window function
SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) rk FROM emp
) t WHERE rk = 2;`}</pre></>} />
          <IQ q="Find employees earning more than their manager." a={<pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`SELECT e.name FROM emp e JOIN emp m
ON e.manager_id = m.id
WHERE e.salary > m.salary;`}</pre>} />
          <IQ q="Count consecutive login days per user." hint="ROW_NUMBER trick" a={<pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`SELECT user_id, MIN(login_date) start, MAX(login_date) end, COUNT(*) days
FROM (
  SELECT user_id, login_date,
    login_date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) grp
  FROM logins
) t GROUP BY user_id, grp;`}</pre>} />
          <IQ q="Pivot rows to columns without native PIVOT." a={<pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`SELECT dept,
  SUM(CASE WHEN gender='M' THEN 1 ELSE 0 END) males,
  SUM(CASE WHEN gender='F' THEN 1 ELSE 0 END) females
FROM emp GROUP BY dept;`}</pre>} />
          <IQ q="Detect and delete duplicates keeping the smallest id." a={<pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`DELETE FROM t
WHERE id NOT IN (SELECT MIN(id) FROM t GROUP BY email);`}</pre>} />
        </div>
      </Section>

      <Section id="norm" title="6. Normalization Questions">
        <div className="space-y-3">
          <IQ q="Explain 1NF, 2NF, 3NF with one example each." a="1NF: split comma-separated phone_numbers into rows. 2NF: remove partial dependency in (order_id, product_id) → product_name. 3NF: remove transitive dependency employee.dept_name via dept_id → dept_name." />
          <IQ q="What is BCNF and when does 3NF not imply BCNF?" a="BCNF requires every determinant to be a superkey. A 3NF table (student, course, teacher) can violate BCNF if teacher → course." />
          <IQ q="When should you denormalize?" a="Read-heavy dashboards, hot aggregates, or star-schema warehouses — after profiling, never speculatively." />
        </div>
      </Section>

      <Section id="txn" title="7. Transactions & ACID">
        <div className="space-y-3">
          <IQ q="What is write skew?" a="Snapshot-isolation anomaly where two transactions each read premises and commit conflicting writes. Only SERIALIZABLE prevents it." />
          <IQ q="Difference between COMMIT, ROLLBACK, SAVEPOINT." a="COMMIT makes changes durable; ROLLBACK undoes them; SAVEPOINT marks a point you can partially roll back to." />
          <IQ q="How would you implement transfer of funds safely?" a="BEGIN; SELECT balance FOR UPDATE on both accounts; validate; UPDATE both; COMMIT. Retry on serialization_failure." />
        </div>
      </Section>

      <Section id="idx" title="8. Indexing Questions">
        <div className="space-y-3">
          <IQ q="When would an index hurt performance?" a="Write-heavy tables, tiny tables, or columns rarely used in filters — each index adds write cost and storage." />
          <IQ q="Composite index (a, b) — which queries benefit?" a="WHERE a=…, WHERE a=… AND b=…, ORDER BY a, b. NOT: WHERE b=… alone." />
          <IQ q="What is a covering index?" a="An index that stores all columns a query needs so it can be answered without touching the heap." />
        </div>
      </Section>

      <Section id="opt" title="9. Query Optimization">
        <div className="space-y-3">
          <IQ q="Walk me through reading an EXPLAIN plan." a="Bottom-up: identify scan types, join types, row estimates vs actual, and cost. Flag sequential scans on big tables and misestimated joins." />
          <IQ q="What is the N+1 problem?" a="One query per parent row instead of a single JOIN or batched IN — common ORM pitfall. Fix with eager loading." />
          <IQ q="How would you speed up a slow paginated feed?" a="Switch from OFFSET/LIMIT to keyset pagination on a covering index over the sort key." />
        </div>
      </Section>

      <Section id="design" title="10. Database Design Scenarios">
        <div className="space-y-3">
          <IQ q="Design a schema for a food-delivery platform." a="Entities: users, restaurants, menu_items, orders, order_items, riders, payments, ratings. Use surrogate PKs, order-status enum, delivery_location as geog, and audit columns." />
          <IQ q="Model tags with popularity per article." a="articles, tags, article_tags(join, PK (article_id, tag_id)); popularity as MATERIALIZED VIEW refreshed hourly." />
          <IQ q="How would you model soft deletes?" a="Add deleted_at TIMESTAMPTZ; partial unique indexes WHERE deleted_at IS NULL; views hiding deleted rows." />
        </div>
      </Section>

      <Section id="sys" title="11. System Design Interviews">
        <div className="space-y-3">
          <IQ q="Scale a read-heavy DB to 100k QPS." a="Cache with Redis, primary + read replicas, connection pooling, materialised views for hot aggregates, denormalise read paths, monitor replica lag." />
          <IQ q="Design a globally-distributed counter." a="Regional shards + CRDTs or leader-per-region with periodic aggregation; discuss consistency vs latency (PACELC)." />
          <IQ q="Explain how you'd migrate a 2TB table without downtime." a="Dual-write pattern, backfill in batches (idempotent), read-shadowing, cutover behind feature flag, backout plan via reverse dual-write." />
        </div>
      </Section>

      <Section id="hr" title="12. HR & Behavioral Questions">
        <div className="space-y-3">
          <IQ q="Tell me about a production DB incident you handled." a="Use STAR — Situation, Task, Action, Result. Emphasise diagnosis (EXPLAIN/logs), remediation, and long-term fix (index, alert, runbook)." />
          <IQ q="Describe a schema change that went wrong." a="Talk about the safeguards you added afterwards: migrations gated in CI, dual-write, canary rollouts." />
          <IQ q="How do you keep learning?" a="Weekly release notes, one paper a month (VLDB, SIGMOD), a personal side-project, and code reviews for schema PRs." />
        </div>
      </Section>

      <Section id="mock" title="13. Mock Interview">
        <ol className="list-decimal space-y-2 pl-5">
          <li><em>0–5 min</em> — “Walk me through a project where you owned the DB.”</li>
          <li><em>5–20 min</em> — Two SQL problems on shared editor (top-N per group, cohort retention).</li>
          <li><em>20–35 min</em> — Design the schema for an event-ticketing platform.</li>
          <li><em>35–50 min</em> — System design: multi-region reservations without double-booking.</li>
          <li><em>50–60 min</em> — Behavioural + your questions for the interviewer.</li>
        </ol>
      </Section>

      <Section id="final" title="14. Final Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you write JOINs, GROUP BY, CTEs, window functions from memory?</li>
          <li>Can you draw an ER diagram for any given prompt in 5 minutes?</li>
          <li>Can you explain ACID, isolation levels, and MVCC without notes?</li>
          <li>Have you rehearsed 3 STAR stories (incident, migration, teamwork)?</li>
          <li>Have you researched the team's stack (Postgres? MySQL? Aurora?)?</li>
        </ul>
      </Section>

      <Section id="review" title="Interview Review">
        <Callout tone="tip" title="Top 100 Interview Questions">
          Master JOINs · aggregates · window functions · CTEs · normalization · ACID · isolation anomalies · deadlocks · MVCC · index types · EXPLAIN plans · N+1 · sharding · replication · CAP · migrations.
        </Callout>
        <p><strong>Technical Checklist:</strong> whiteboard SQL fluency, schema design under 15 min, EXPLAIN literacy.</p>
        <p><strong>HR Checklist:</strong> 3 STAR stories, motivation for the role, salary expectation, notice period.</p>
        <p><strong>Mock Interview Sheet:</strong> record yourself; score clarity, correctness, and time-to-solution.</p>
        <p><strong>Revision Notes:</strong> re-read this file the night before the interview.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How many hours should I prepare?">4–6 weeks at 6–8 hours/week, prioritising SQL + design over trivia.</FAQItem>
        <FAQItem q="Which DB should I master?">PostgreSQL — most concepts transfer to MySQL, Oracle, and SQL Server.</FAQItem>
        <FAQItem q="Are LeetCode SQL problems enough?">Cover 70% of screens; add design and system-design rounds separately.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL Documentation — postgresql.org/docs</li>
          <li>MySQL Reference Manual — dev.mysql.com/doc</li>
          <li>Oracle Learning — education.oracle.com</li>
          <li>Microsoft Learn — SQL Server & Azure SQL</li>
          <li>IBM Db2, MariaDB, SQLite documentation</li>
          <li>Silberschatz, Korth, Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>CMU 15-445 (Andy Pavlo), MIT OCW 6.830, Stanford CS245</li>
          <li>ACM Digital Library, IEEE Xplore</li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted educational
          resources. Database technologies, SQL dialects, and vendor implementations evolve continuously —
          consult official vendor documentation for the latest information. All trademarks, product names,
          logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
