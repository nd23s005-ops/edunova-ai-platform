import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-glossary",
  title: "DBMS — Glossary",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 11,
  lastUpdated: "September 2026",
  tags: ["DBMS", "SQL", "Database Systems"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "500+ DBMS terms A–Z — SQL keywords, indexing, transactions, distributed systems, security, and enterprise database vocabulary in one alphabetical reference.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "ac", label: "1. A–C" },
  { id: "df", label: "2. D–F" },
  { id: "gi", label: "3. G–I" },
  { id: "jl", label: "4. J–L" },
  { id: "mo", label: "5. M–O" },
  { id: "pr", label: "6. P–R" },
  { id: "su", label: "7. S–U" },
  { id: "vz", label: "8. V–Z" },
  { id: "review", label: "Glossary Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Advanced Concepts", tag: "CS Core", time: "38 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
  { title: "DBMS — Frequently Asked Questions", tag: "CS Core", time: "9 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-glossary")({
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

function Term({ t, d }: { t: string; d: React.ReactNode }) {
  return (
    <div className="border-l-2 border-primary/30 pl-3">
      <p><strong className="text-foreground">{t}</strong> — <span className="text-sm text-muted-foreground">{d}</span></p>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Recognise 500+ DBMS and SQL terms at a glance.</li>
          <li>Decode acronyms used in interviews and documentation.</li>
          <li>Build a strong technical vocabulary for reading papers and vendor docs.</li>
          <li>Use as a quick lookup during coding and review.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80"
          caption="A shared vocabulary is the fastest tool for cross-team database discussions."
        />
      </Section>

      <Section id="ac" title="1. A–C">
        <div className="space-y-2">
          <Term t="ACID" d="Atomicity, Consistency, Isolation, Durability — the four transactional guarantees." />
          <Term t="Aggregate function" d="COUNT, SUM, AVG, MIN, MAX — collapse rows into a single value per group." />
          <Term t="ALTER" d="DDL statement to modify a schema object (table, column, constraint)." />
          <Term t="Anomaly" d="Insert, update, or delete inconsistency caused by poor schema design." />
          <Term t="ANSI SQL" d="American National Standards Institute SQL standard (SQL-92, 1999, 2003, 2016…)." />
          <Term t="ARIES" d="A Recovery algorithm using WAL, LSN, and CLRs — invented at IBM in 1992." />
          <Term t="Atomicity" d="A transaction runs entirely or not at all." />
          <Term t="Attribute" d="A column in a relation." />
          <Term t="B+ tree" d="Balanced tree used for most relational indexes; only leaves hold data." />
          <Term t="BASE" d="Basically Available, Soft-state, Eventually consistent — NoSQL's counterpart to ACID." />
          <Term t="BCNF" d="Boyce-Codd Normal Form — stricter 3NF; every determinant is a superkey." />
          <Term t="Binlog" d="MySQL binary log; stream of statements/rows used for replication and PITR." />
          <Term t="Bitmap index" d="Index storing one bit per row per value; good for low-cardinality columns." />
          <Term t="BLOB" d="Binary Large Object — bytes stored inline or externally." />
          <Term t="Buffer pool" d="In-memory cache of disk pages inside the DBMS." />
          <Term t="CAP theorem" d="Under partition, choose Consistency or Availability, not both." />
          <Term t="Cardinality" d="Number of distinct values in a column, or rows in a table." />
          <Term t="Cartesian product" d="Every row of A × every row of B — CROSS JOIN." />
          <Term t="Cascade" d="ON DELETE/UPDATE action propagating changes to child rows." />
          <Term t="CDC" d="Change Data Capture — stream of row-level DB changes." />
          <Term t="Check constraint" d="A boolean expression enforced per row." />
          <Term t="Checkpoint" d="A safe point in the WAL from which recovery can start." />
          <Term t="Clustered index" d="Index whose leaves ARE the table rows (InnoDB primary key)." />
          <Term t="COALESCE" d="Returns the first non-NULL argument." />
          <Term t="Column store" d="Storage engine that keeps values of one column together for scans." />
          <Term t="Commit" d="Makes a transaction's changes durable and visible." />
          <Term t="Composite key" d="A primary/unique key made of more than one column." />
          <Term t="Concurrency control" d="Rules that let many transactions run without breaking correctness." />
          <Term t="Constraint" d="Rule enforced by the DBMS (PK, FK, UNIQUE, NOT NULL, CHECK)." />
          <Term t="CTE" d="Common Table Expression — WITH … AS ()." />
          <Term t="Cursor" d="A named pointer over a query result set." />
        </div>
      </Section>

      <Section id="df" title="2. D–F">
        <div className="space-y-2">
          <Term t="Data dictionary" d="System catalog describing all schema objects." />
          <Term t="Data warehouse" d="Analytical DB optimised for read-heavy OLAP workloads." />
          <Term t="DBA" d="Database Administrator." />
          <Term t="DCL" d="Data Control Language — GRANT, REVOKE." />
          <Term t="DDL" d="Data Definition Language — CREATE, ALTER, DROP." />
          <Term t="Deadlock" d="Two transactions each hold a lock the other needs." />
          <Term t="Denormalization" d="Deliberate redundancy for read performance." />
          <Term t="Dependency (functional)" d="X → Y means X uniquely determines Y." />
          <Term t="Determinant" d="Left-hand side of a functional dependency." />
          <Term t="DISTINCT" d="Removes duplicate rows from a result." />
          <Term t="DML" d="Data Manipulation Language — SELECT, INSERT, UPDATE, DELETE." />
          <Term t="Domain" d="Set of allowed values for an attribute." />
          <Term t="Durability" d="Committed data survives crashes." />
          <Term t="Dirty read" d="Reading uncommitted data from another transaction." />
          <Term t="EDW" d="Enterprise Data Warehouse." />
          <Term t="Encapsulation" d="Hiding physical details behind logical schema." />
          <Term t="Entity" d="A distinguishable real-world thing modelled as a table." />
          <Term t="ER model" d="Entity–Relationship diagram." />
          <Term t="Escape character" d="Marks the next character as literal in LIKE patterns." />
          <Term t="ETL / ELT" d="Extract–Transform–Load / Extract–Load–Transform pipelines." />
          <Term t="EXCEPT" d="Rows in the first query but not the second." />
          <Term t="EXPLAIN" d="Shows the execution plan for a query." />
          <Term t="Federated DB" d="Virtual view over multiple heterogeneous data sources." />
          <Term t="Foreign key" d="Column referencing another table's primary key." />
          <Term t="Full outer join" d="All rows from both sides, NULLs where unmatched." />
          <Term t="Functional dependency" d="Constraint that one set of attributes determines another." />
        </div>
      </Section>

      <Section id="gi" title="3. G–I">
        <div className="space-y-2">
          <Term t="GIN" d="Postgres Generalized Inverted iNdex — arrays, JSONB, tsvector." />
          <Term t="GiST" d="Generalized Search Tree — extensible index framework (Postgres)." />
          <Term t="GRANT" d="DCL statement giving privileges to a role." />
          <Term t="GROUP BY" d="Groups rows so aggregates apply per group." />
          <Term t="HAVING" d="Filters groups after aggregation." />
          <Term t="Heap table" d="Table with unordered row placement (Postgres, Oracle)." />
          <Term t="HTAP" d="Hybrid Transactional/Analytical Processing." />
          <Term t="Hash index" d="Index using a hash function; equality only." />
          <Term t="Hash join" d="Physical join operator that hashes one side into memory." />
          <Term t="Idempotent" d="Applying the operation twice has the same effect as once." />
          <Term t="Index" d="Auxiliary data structure that speeds up lookups." />
          <Term t="Index-only scan" d="Reads results from the index without visiting the table." />
          <Term t="Integrity constraint" d="Rule keeping data valid (PK, FK, CHECK, UNIQUE, NOT NULL)." />
          <Term t="IN clause" d="Membership test against a list or subquery." />
          <Term t="Isolation" d="Degree to which concurrent transactions appear serial." />
          <Term t="INFORMATION_SCHEMA" d="ANSI-standard metadata views." />
        </div>
      </Section>

      <Section id="jl" title="4. J–L">
        <div className="space-y-2">
          <Term t="JDBC" d="Java Database Connectivity API." />
          <Term t="Join" d="Combines rows from two tables based on a predicate." />
          <Term t="JSON / JSONB" d="Native semi-structured column types." />
          <Term t="Key" d="Attribute set that uniquely identifies rows (super, candidate, primary, foreign)." />
          <Term t="Latch" d="Short-lived low-level mutex protecting a data-structure page." />
          <Term t="Lateral join" d="Subquery on the right can reference columns from the left." />
          <Term t="LEFT JOIN" d="All rows from left table; NULLs for unmatched right rows." />
          <Term t="LIMIT / OFFSET" d="Bound result size / skip rows." />
          <Term t="Lock" d="Reserves a resource for a transaction to prevent conflicts." />
          <Term t="Log-structured merge (LSM) tree" d="Write-optimised structure with compaction." />
          <Term t="LSN" d="Log Sequence Number — monotonic id in the WAL." />
        </div>
      </Section>

      <Section id="mo" title="5. M–O">
        <div className="space-y-2">
          <Term t="Materialized view" d="View whose result set is stored on disk and refreshed." />
          <Term t="Merge join" d="Join operator over pre-sorted inputs." />
          <Term t="Metadata" d="Data about data — schema definitions, statistics, catalogs." />
          <Term t="MVCC" d="Multi-Version Concurrency Control." />
          <Term t="Natural key" d="Key derived from real-world attributes (email, ISBN)." />
          <Term t="Nested loop join" d="For each outer row, scan the inner side." />
          <Term t="Non-repeatable read" d="Same query returns different values in one transaction." />
          <Term t="Normal form" d="A rule level of normalization (1NF, 2NF, 3NF, BCNF, 4NF, 5NF)." />
          <Term t="NoSQL" d="Non-relational data stores — document, KV, wide-column, graph." />
          <Term t="NOT NULL" d="Column-level constraint forbidding NULL." />
          <Term t="NULL" d="Marker for missing/unknown value; three-valued logic." />
          <Term t="OLAP / OLTP" d="Analytical vs Transactional workloads." />
          <Term t="ORDER BY" d="Sorts the result set." />
          <Term t="ORM" d="Object-Relational Mapper (Hibernate, Prisma, ActiveRecord)." />
          <Term t="Outer join" d="LEFT/RIGHT/FULL — keeps unmatched rows." />
        </div>
      </Section>

      <Section id="pr" title="6. P–R">
        <div className="space-y-2">
          <Term t="Paging" d="LIMIT/OFFSET or keyset pagination." />
          <Term t="Partition" d="Physical split of one logical table (range, hash, list)." />
          <Term t="Partition pruning" d="Optimizer skips partitions that can't match the predicate." />
          <Term t="PL/pgSQL / T-SQL / PL/SQL" d="Procedural extensions to SQL." />
          <Term t="Plan cache" d="Optimizer output kept keyed by query text or hash." />
          <Term t="Prepared statement" d="Pre-parsed query with parameter placeholders." />
          <Term t="Primary key" d="Chosen candidate key; UNIQUE + NOT NULL." />
          <Term t="Projection" d="Selecting a subset of columns." />
          <Term t="Query optimizer" d="Component that picks a physical plan." />
          <Term t="Quorum" d="Minimum replicas needed to acknowledge a read or write." />
          <Term t="RDBMS" d="Relational Database Management System." />
          <Term t="Read committed" d="Isolation level — reads only see committed data." />
          <Term t="Recovery" d="Bringing the DB to a consistent state after a crash." />
          <Term t="Referential integrity" d="FK values must exist in the referenced PK." />
          <Term t="Relation" d="Formal name for a table (a set of tuples)." />
          <Term t="Repeatable read" d="Same rows return the same values across a transaction." />
          <Term t="Replication" d="Copying data across nodes (physical, logical, statement)." />
          <Term t="REVOKE" d="Removes previously granted privileges." />
          <Term t="Rollback" d="Undoes a transaction's changes." />
          <Term t="Row-level security (RLS)" d="Per-row visibility policies." />
        </div>
      </Section>

      <Section id="su" title="7. S–U">
        <div className="space-y-2">
          <Term t="Savepoint" d="Named point inside a transaction to partially roll back." />
          <Term t="Schema" d="A namespace containing tables, views, sequences, functions." />
          <Term t="Sequence" d="Monotonic number generator (SERIAL, IDENTITY)." />
          <Term t="Serializability" d="Concurrent schedule equivalent to some serial execution." />
          <Term t="Sharding" d="Horizontal partitioning across multiple servers." />
          <Term t="Snapshot isolation" d="Each transaction sees a fixed committed snapshot." />
          <Term t="SQL injection" d="Attack that concatenates malicious SQL into user input." />
          <Term t="Star schema" d="Fact table joined to dimension tables — warehousing standard." />
          <Term t="Stored procedure" d="Named DB-side program invoked by CALL/EXEC." />
          <Term t="Subquery" d="A SELECT nested inside another statement." />
          <Term t="Superkey" d="Any set of attributes that uniquely identifies a tuple." />
          <Term t="Surrogate key" d="Artificial key generated by the system (UUID, serial)." />
          <Term t="Table" d="Physical relation storing tuples." />
          <Term t="TDE" d="Transparent Data Encryption — encrypts data at rest." />
          <Term t="Timestamp ordering" d="Concurrency control using per-transaction timestamps." />
          <Term t="Transaction" d="A unit of work with ACID guarantees." />
          <Term t="Trigger" d="Automatic code run on INSERT/UPDATE/DELETE." />
          <Term t="Tuple" d="A single row in a relation." />
          <Term t="Two-phase commit (2PC)" d="Protocol coordinating a distributed transaction." />
          <Term t="Two-phase locking (2PL)" d="Concurrency protocol acquiring then releasing locks in phases." />
          <Term t="Unique key" d="Enforces uniqueness; may allow NULLs." />
          <Term t="UNION / UNION ALL" d="Combines result sets — with/without dedup." />
        </div>
      </Section>

      <Section id="vz" title="8. V–Z">
        <div className="space-y-2">
          <Term t="VACUUM" d="Postgres process that reclaims tuple space and updates stats." />
          <Term t="View" d="Named SELECT stored in the catalog." />
          <Term t="WAL" d="Write-Ahead Log — durability journal written before pages." />
          <Term t="Window function" d="Aggregation without collapsing rows (OVER PARTITION BY …)." />
          <Term t="Wire protocol" d="On-the-wire format between client and server (Postgres FE/BE, MySQL, TDS)." />
          <Term t="Write skew" d="Snapshot-isolation anomaly where concurrent writes each read stale premises." />
          <Term t="XA" d="Open standard for distributed 2PC across resource managers." />
          <Term t="Yugabyte / YSQL" d="Distributed SQL DB with a Postgres-compatible layer." />
          <Term t="Zero-copy backup" d="Snapshot-based backup that avoids reading page-by-page." />
          <Term t="ZFS snapshot" d="Filesystem-level copy-on-write snapshot often used for DB backups." />
        </div>
      </Section>

      <Section id="review" title="Glossary Review">
        <Callout tone="tip" title="Most Important Terms">
          ACID · BASE · MVCC · WAL · Snapshot Isolation · Two-Phase Locking · Two-Phase Commit · CAP · PACELC · B+ tree · LSM · GIN · Composite key · Serializability · RLS · TDE · Sharding · Replication · Materialized view · CDC.
        </Callout>
        <p><strong>Interview Keywords:</strong> normalization forms, isolation anomalies, index types, deadlock resolution, EXPLAIN reading, replication modes.</p>
        <p><strong>Revision Notes:</strong> memorise ACID, BASE, CAP, and the four isolation anomalies before any interview.</p>
        <p><strong>Quick Lookup Index:</strong> use browser find (Ctrl/Cmd+F) — every term is a single line.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How is this different from a textbook?">A textbook teaches concepts; this file makes definitions instantly findable.</FAQItem>
        <FAQItem q="Should I memorise all 500+ terms?">No — read once, then use as a lookup.</FAQItem>
        <FAQItem q="Are vendor-specific terms included?">Yes, where they represent broader concepts (binlog, WAL, TDE).</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL Glossary — postgresql.org/docs/current/glossary.html</li>
          <li>MySQL Reference Manual Glossary — dev.mysql.com/doc/refman/8.0/en/glossary.html</li>
          <li>Oracle Database Glossary — docs.oracle.com</li>
          <li>Microsoft SQL Docs Glossary — learn.microsoft.com/sql</li>
          <li>SQLite, MariaDB, IBM Db2 documentation</li>
          <li>Silberschatz, Korth, Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>ACM Digital Library, IEEE Xplore, MIT OCW</li>
          <li>CMU 15-445 / 15-721 (Andy Pavlo)</li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted educational
          resources. Database technologies, SQL standards, and vendor implementations evolve over time —
          always consult official vendor documentation for the latest information. All trademarks, product
          names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
