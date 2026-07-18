import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-advanced-concepts",
  title: "DBMS — Advanced Concepts",
  category: "CS Core",
  difficulty: "Advanced",
  readingTime: "38 min",
  pages: 60,
  lastUpdated: "October 2026",
  tags: ["DBMS", "SQL", "Database Systems"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "Internal architecture, storage engines, optimizer algorithms, MVCC, ARIES recovery, replication, sharding, and CAP — a deep dive for engineers who build and operate real databases.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "arch", label: "1. DBMS Internal Architecture" },
  { id: "storage", label: "2. Storage Engines" },
  { id: "buffer", label: "3. Buffer Manager" },
  { id: "qp", label: "4. Query Processing" },
  { id: "qo", label: "5. Query Optimization" },
  { id: "idx", label: "6. Index Structures" },
  { id: "bplus", label: "7. B+ Trees & Hash Indexes" },
  { id: "txn", label: "8. Transaction Management" },
  { id: "cc", label: "9. Concurrency Control" },
  { id: "lock", label: "10. Locking Protocols" },
  { id: "mvcc", label: "11. MVCC" },
  { id: "rec", label: "12. Recovery Algorithms" },
  { id: "log", label: "13. Logging & Checkpointing" },
  { id: "dist", label: "14. Distributed Databases" },
  { id: "rep", label: "15. Database Replication" },
  { id: "shard", label: "16. Partitioning & Sharding" },
  { id: "cap", label: "17. CAP Theorem" },
  { id: "nosql", label: "18. NoSQL vs SQL Internals" },
  { id: "sec", label: "19. Database Security" },
  { id: "ent", label: "20. Enterprise Database Design" },
  { id: "review", label: "Advanced Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Glossary", tag: "CS Core", time: "10 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
  { title: "System Design", tag: "CS Core", time: "20 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-advanced-concepts")({
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

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the internal layers of a modern DBMS — from parser to WAL.</li>
          <li>Reason about storage engines, buffer pools, and access methods.</li>
          <li>Design correct transactional systems under real concurrency.</li>
          <li>Compare distributed strategies: replication, sharding, consensus.</li>
          <li>Apply advanced patterns to enterprise-scale workloads.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1600&q=80"
          caption="High-level DBMS architecture — parser → planner → optimizer → executor → access methods → buffer pool → storage."
        />
      </Section>

      <Section id="arch" title="1. DBMS Internal Architecture">
        <p>A relational database is a layered pipeline. A SQL statement travels through the <strong>parser</strong>, <strong>binder</strong>, <strong>rewriter</strong>, <strong>optimizer</strong>, <strong>executor</strong>, and <strong>access methods</strong>, which finally talk to the <strong>buffer manager</strong> and <strong>disk</strong>. Each layer has a well-defined contract, which is what makes engines like PostgreSQL, InnoDB, and SQL Server hackable and pluggable.</p>
        <p>Modern engines split into two families: <strong>process-per-connection</strong> (PostgreSQL) and <strong>thread-per-connection</strong> (MySQL/InnoDB, SQL Server). Process models simplify isolation; thread models minimise context-switch cost. Cloud databases (Aurora, Spanner) further separate <em>compute</em> from <em>storage</em>, letting the log ship to a distributed page store.</p>
        <Callout tone="info" title="Golden rule">Every advanced feature — MVCC, replication, columnar scans — is a variation on one of four primitives: <em>pages</em>, <em>logs</em>, <em>locks</em>, and <em>plans</em>.</Callout>
      </Section>

      <Section id="storage" title="2. Storage Engines">
        <p>Rows are stored inside fixed-size <strong>pages</strong> (typically 8 KB in Postgres, 16 KB in InnoDB). A page holds a header, an item pointer array, and the tuple data growing from the opposite end (<em>slotted page layout</em>). Choice of storage engine determines durability, compression, and I/O patterns:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Heap</strong> (Postgres, Oracle) — inserts anywhere; index points to <em>ctid</em>/RID.</li>
          <li><strong>Index-organized</strong> (InnoDB clustered PK, SQL Server clustered index) — rows live inside the primary B+ tree.</li>
          <li><strong>LSM-tree</strong> (RocksDB, Cassandra) — writes append to a memtable, flush to sorted files, compacted in the background. Great for writes, needs compaction tuning.</li>
          <li><strong>Columnar</strong> (Parquet, ClickHouse, Redshift) — one file per column; huge compression + vectorised scans; poor for point updates.</li>
        </ul>
      </Section>

      <Section id="buffer" title="3. Buffer Manager">
        <p>The buffer pool caches disk pages in RAM. It implements a page replacement policy — <strong>LRU-K</strong>, <strong>Clock-Sweep</strong> (Postgres), or <strong>2Q</strong> — plus <em>pin counts</em> so the executor can safely hold a page during a scan. Dirty pages are flushed by the <strong>background writer</strong> and enforced at <strong>checkpoints</strong>.</p>
        <p>Tuning knobs: <code>shared_buffers</code> (Postgres), <code>innodb_buffer_pool_size</code> (MySQL), <code>max server memory</code> (SQL Server). Rule of thumb — 25%–40% of RAM on a dedicated DB host, leaving the rest for the OS page cache and work_mem.</p>
      </Section>

      <Section id="qp" title="4. Query Processing">
        <p>The query executor implements physical operators — <em>SeqScan, IndexScan, BitmapHeapScan, NestedLoop, HashJoin, MergeJoin, Sort, Aggregate, Materialize</em> — connected as a tree. Two execution strategies dominate:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Volcano/iterator model</strong>: each operator implements <code>next()</code>. Simple, but function-call overhead is high.</li>
          <li><strong>Vectorised execution</strong> (DuckDB, ClickHouse, SQL Server batch mode): operators process <em>batches</em> of tuples, tight loops, SIMD-friendly.</li>
        </ul>
        <Callout tone="tip" title="Read plans backwards">The deepest, right-most node in EXPLAIN is executed first. Row estimates propagate upwards — a bad estimate at the leaf usually causes the bad plan at the root.</Callout>
      </Section>

      <Section id="qo" title="5. Query Optimization">
        <p>The optimizer transforms a logical plan into a cost-minimising physical plan. Two classes:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Rule-based</strong> — deterministic transformations (predicate pushdown, join reordering, subquery unnesting).</li>
          <li><strong>Cost-based</strong> — enumerates candidate plans (dynamic programming for joins ≤ 12 tables; genetic search beyond) and picks the cheapest using cardinality × operator cost.</li>
        </ul>
        <p>Cost models rely on <strong>statistics</strong>: histograms, MCV lists, correlation. Stale stats = wrong plans. Common transformations include <em>join reordering</em>, <em>join elimination</em> (via FK constraints), <em>view merging</em>, <em>subquery flattening</em>, and <em>partition pruning</em>.</p>
      </Section>

      <Section id="idx" title="6. Index Structures">
        <p>Beyond B+ trees, real engines ship a zoo of indexes for different workloads:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Hash</strong> — equality only, O(1) average.</li>
          <li><strong>GiST/SP-GiST</strong> — extensible for geometry, ranges, full-text.</li>
          <li><strong>GIN</strong> — inverted index for arrays, JSONB, tsvector.</li>
          <li><strong>BRIN</strong> — block range summaries for huge, naturally-ordered tables (log data).</li>
          <li><strong>Bitmap</strong> — one bit per row per value, ideal for low-cardinality DW columns.</li>
          <li><strong>Bloom</strong> — probabilistic prefilter for wide multi-column equality.</li>
        </ul>
      </Section>

      <Section id="bplus" title="7. B+ Trees & Hash Indexes">
        <p>A <strong>B+ tree</strong> is a balanced multi-way tree where <em>all</em> data lives in the leaf level; internal nodes hold only routing keys. Leaves form a doubly-linked list for range scans. Height <em>h</em> = <em>log<sub>fan-out</sub>(N)</em>; with a fan-out of 100, a billion-row index is ~5 levels deep — typically two random I/Os after caching the root and internal levels.</p>
        <p><strong>Concurrent B+ trees</strong> use <em>latch coupling</em> (Blink-trees) so multiple threads can descend without blocking. Splits propagate upwards; underflows redistribute or merge. Hash indexes are faster for equality but do not support ordering or range predicates and rehash expensively.</p>
      </Section>

      <Section id="txn" title="8. Transaction Management">
        <p>A transaction is a partial order over reads and writes with an ACID contract. The scheduler serialises them via <strong>serializability</strong>. Two equivalent tests:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Conflict serializable</strong> — precedence graph has no cycles.</li>
          <li><strong>View serializable</strong> — stricter, NP-hard, rarely used in practice.</li>
        </ul>
        <p>Isolation levels weaken serializability for performance: READ UNCOMMITTED → READ COMMITTED → REPEATABLE READ → SERIALIZABLE. Each level admits specific anomalies (dirty read, non-repeatable read, phantom, write skew).</p>
      </Section>

      <Section id="cc" title="9. Concurrency Control">
        <p>Three families of algorithms:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Pessimistic (2PL)</strong> — Strict Two-Phase Locking guarantees serializability; used by SQL Server, DB2, InnoDB (with next-key locks).</li>
          <li><strong>Optimistic (OCC)</strong> — validate at commit; ideal for low-contention workloads.</li>
          <li><strong>Timestamp/MVCC</strong> — every transaction has a timestamp; multiple versions of each row coexist.</li>
        </ul>
      </Section>

      <Section id="lock" title="10. Locking Protocols">
        <p>Granularity ranges from row → page → table → database. Modes: <strong>S</strong> (shared), <strong>X</strong> (exclusive), <strong>IS/IX/SIX</strong> (intent). Intent locks let a transaction announce a lower-level lock without walking every child. <strong>Next-key locks</strong> in InnoDB protect ranges to prevent phantoms.</p>
        <p><strong>Deadlock detection</strong>: build a wait-for graph; if cyclic, pick a victim (usually the youngest or cheapest to roll back). Alternative: timeout-based (Oracle) or wait-die/wound-wait (Spanner).</p>
      </Section>

      <Section id="mvcc" title="11. MVCC">
        <p>Multi-Version Concurrency Control gives every reader a snapshot without blocking writers. Each row version stores an <em>xmin</em> (creator) and <em>xmax</em> (deleter). A transaction sees a version if <em>xmin</em> is committed before its snapshot and <em>xmax</em> is not.</p>
        <p>Implementations differ: Postgres keeps old versions inline and cleans them with <strong>VACUUM</strong>; Oracle and MySQL push old versions to an <strong>undo log</strong>/<strong>rollback segment</strong>. Trade-off: Postgres avoids UNDO complexity but suffers table bloat if VACUUM lags.</p>
      </Section>

      <Section id="rec" title="12. Recovery Algorithms">
        <p><strong>ARIES</strong> (IBM, 1992) is the canonical algorithm. Three phases after a crash:</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>Analysis</strong> — replay the log from the last checkpoint to rebuild the transaction and dirty-page tables.</li>
          <li><strong>Redo</strong> — repeat history for every log record after the earliest recLSN.</li>
          <li><strong>Undo</strong> — roll back losers, writing Compensation Log Records (CLRs) so undo itself is idempotent.</li>
        </ol>
        <p>Key ideas: <em>WAL</em> (write log before page), <em>steal/no-force</em> (flexible buffer flushing), <em>fuzzy checkpoints</em>, and CLRs to avoid re-undoing during a second crash.</p>
      </Section>

      <Section id="log" title="13. Logging & Checkpointing">
        <p>Every state change is appended to the <strong>WAL</strong> as an LSN-tagged record. A checkpoint writes a marker and flushes dirty pages up to a horizon so recovery can start there. Group commit batches fsyncs to amortise the cost. Streaming WAL is the basis for both crash recovery and physical replication.</p>
      </Section>

      <Section id="dist" title="14. Distributed Databases">
        <p>Distribution multiplies capacity but adds failure modes. Consensus protocols keep replicas in sync:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Paxos / Multi-Paxos</strong> — Google Chubby, Spanner.</li>
          <li><strong>Raft</strong> — CockroachDB, TiDB, YugabyteDB, etcd.</li>
          <li><strong>Zab</strong> — Apache ZooKeeper.</li>
        </ul>
        <p><strong>Two-phase commit (2PC)</strong> coordinates cross-shard transactions. Its cousin <strong>Paxos-Commit</strong> avoids blocking under coordinator failure. Google Spanner combines Paxos + 2PC + TrueTime to deliver externally-consistent distributed transactions.</p>
      </Section>

      <Section id="rep" title="15. Database Replication">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Physical (streaming)</strong> — ships WAL byte-for-byte. Fastest, replica is a mirror. Postgres streaming, Oracle Data Guard.</li>
          <li><strong>Logical</strong> — ships row change events. Cross-version, selective tables, target different schemas. Postgres logical, Debezium, MySQL row-based.</li>
          <li><strong>Statement-based</strong> — ships SQL. Compact but unsafe for non-deterministic functions.</li>
        </ul>
        <p>Topologies: primary–replica (async), synchronous replicas (RPO=0), multi-primary (conflict resolution required), and quorum systems (Raft).</p>
      </Section>

      <Section id="shard" title="16. Partitioning & Sharding">
        <p><strong>Partitioning</strong> splits one logical table into physical pieces on one node (range, list, hash). <strong>Sharding</strong> spreads pieces across nodes. Choose a shard key with even distribution and query alignment — a bad key produces hot shards and cross-shard joins.</p>
        <p><strong>Consistent hashing</strong> minimises data movement on rebalance. <strong>Virtual nodes</strong> smooth skew. <strong>Global secondary indexes</strong> are expensive on sharded systems — prefer local secondary indexes + scatter-gather.</p>
      </Section>

      <Section id="cap" title="17. CAP Theorem">
        <p>During a network partition, a distributed system can offer either <strong>Consistency</strong> or <strong>Availability</strong> — not both. In practice the more useful lens is <strong>PACELC</strong>: <em>if partitioned</em>, choose A or C; <em>else</em>, trade Latency vs Consistency. Spanner is CP + low L via TrueTime; Cassandra is AP with tunable consistency; DynamoDB is AP with strong-read option.</p>
      </Section>

      <Section id="nosql" title="18. NoSQL vs SQL Internals">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Document</strong> (MongoDB) — BSON, per-doc schema, secondary indexes, replica sets, sharded clusters.</li>
          <li><strong>Wide-column</strong> (Cassandra, HBase) — LSM, tunable consistency, partition + clustering key model.</li>
          <li><strong>Key–value</strong> (Redis, DynamoDB) — hash/B-tree indexes over a single access pattern.</li>
          <li><strong>Graph</strong> (Neo4j, JanusGraph) — index-free adjacency, Cypher/Gremlin traversal engine.</li>
          <li><strong>NewSQL</strong> (CockroachDB, TiDB, Spanner) — SQL surface, distributed KV core, Raft replication.</li>
        </ul>
      </Section>

      <Section id="sec" title="19. Database Security">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Authentication</strong>: SCRAM, LDAP, Kerberos, IAM tokens.</li>
          <li><strong>Authorization</strong>: RBAC + row-level policies + column masking.</li>
          <li><strong>Encryption</strong>: TDE (transparent data encryption), TLS in transit, client-side field-level encryption for PCI/HIPAA.</li>
          <li><strong>Auditing</strong>: pgaudit, SQL Server Audit, Oracle Fine-Grained Auditing.</li>
          <li><strong>Backup security</strong>: WORM storage, encrypted archives, tested restore drills.</li>
        </ul>
      </Section>

      <Section id="ent" title="20. Enterprise Database Design">
        <p>Enterprise systems separate OLTP (row-store, 3NF) from OLAP (columnar, denormalised star/snowflake). ETL/ELT with tools like dbt, Fivetran, or Debezium moves data between them. Data mesh and lakehouse patterns (Delta, Iceberg, Hudi) blur the line, combining ACID on object storage with SQL engines like Trino, Spark, and DuckDB.</p>
        <Callout tone="tip" title="Design principle">Match the physical model to the query, not the entity. Store what you read the way you read it.</Callout>
      </Section>

      <Section id="review" title="Advanced Review">
        <p><strong>Expert Notes:</strong> WAL + shared_buffers + checkpointer form the durability triangle. VACUUM is not garbage collection — it is transaction-visibility bookkeeping. TrueTime turns bounded clock uncertainty into external consistency.</p>
        <p><strong>Advanced Interview Questions:</strong> Explain the ARIES redo/undo split. How does MVCC in Postgres differ from Oracle? Design a globally-consistent counter across 3 regions. When would you pick BRIN over B-tree? Walk through a hash join with a spill to disk.</p>
        <p><strong>Performance Checklist:</strong> plan stability, index bloat, replica lag, checkpoint spread, WAL rate, connection pool saturation.</p>
        <p><strong>Architecture Review:</strong> know your consistency model, failure domain, RPO/RTO, and shard blast radius before shipping.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is MVCC always better than locking?">No — for update-heavy hot rows, locking with row versioning off can outperform MVCC due to bloat.</FAQItem>
        <FAQItem q="When should I use logical replication?">Cross-version upgrades, selective tables, schema-transforming replicas, and CDC to a warehouse.</FAQItem>
        <FAQItem q="Is 2PC still relevant?">Yes, but usually wrapped inside Paxos/Raft-backed transactional systems that avoid coordinator-blocking failures.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL Documentation — postgresql.org/docs</li>
          <li>MySQL / InnoDB Internals — dev.mysql.com/doc</li>
          <li>Oracle Database Concepts — docs.oracle.com</li>
          <li>Microsoft SQL Server Engine Internals — learn.microsoft.com</li>
          <li>IBM Db2 Documentation, MariaDB KB, SQLite Docs</li>
          <li>Mohan et al. — ARIES: A Transaction Recovery Method (ACM TODS, 1992)</li>
          <li>Corbett et al. — Spanner: Google’s Globally-Distributed Database (OSDI 2012)</li>
          <li>Bernstein & Newcomer — Principles of Transaction Processing</li>
          <li>Silberschatz, Korth, Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>CMU 15-721 Advanced Database Systems (Andy Pavlo)</li>
          <li>MIT OCW 6.830, Stanford CS245 lectures</li>
          <li>ACM Digital Library, IEEE Xplore</li>
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
