import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-quick-revision-notes",
  title: "DBMS — Quick Revision Notes",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 10,
  lastUpdated: "October 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&q=80",
  heroSubtitle:
    "Last-minute DBMS revision — one-line concepts, mnemonics, memory tricks, and a rapid-recall sheet for exams and interviews.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. DBMS Fundamentals" },
  { id: "s2", label: "2. SQL Quick Review" },
  { id: "s3", label: "3. Keys & Constraints" },
  { id: "s4", label: "4. ER Model" },
  { id: "s5", label: "5. Normalization" },
  { id: "s6", label: "6. Transactions" },
  { id: "s7", label: "7. Indexing" },
  { id: "s8", label: "8. Query Optimization" },
  { id: "s9", label: "9. Database Security" },
  { id: "s10", label: "10. Final Revision Sheet" },
  { id: "review", label: "Revision Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Cheat Sheet", tag: "CS Core", time: "3 min" },
  { title: "DBMS — PDF Notes", tag: "CS Core", time: "56 min" },
  { title: "DBMS — Interview Questions", tag: "CS Core", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-quick-revision-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-quick-revision-notes" }],
  }),
  component: Page,
});

function Bullets({ items }: { items: (string | React.ReactNode)[] }) {
  return <ul className="list-disc space-y-1 pl-5 text-sm">{items.map((i, k) => <li key={k}>{i}</li>)}</ul>;
}

function Mnemonic({ word, meaning }: { word: string; meaning: string }) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
      <p className="font-semibold text-primary">🧠 {word}</p>
      <p className="text-muted-foreground">{meaning}</p>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Bullets items={[
          "Revise DBMS in under an hour before an exam or interview.",
          "Recall syntax, laws, and definitions on demand.",
          "Refresh memory with mnemonics and rapid-fire lists.",
        ]} />
        <Figure
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
          caption="Revision loop — read → close eyes → recall → verify."
        />
        <Callout tone="tip" title="Use this file if…">You have &lt; 2 hours. If more, start with “DBMS — PDF Notes”.</Callout>
      </Section>

      <Section id="s1" title="1. DBMS Fundamentals">
        <Bullets items={[
          "DBMS = software to store + retrieve + protect structured data.",
          "Advantages: data independence, security, ACID, ad-hoc SQL.",
          "Three-schema architecture: external → conceptual → internal.",
          "Data independence: logical (change schema, not app) vs physical (change storage, not schema).",
        ]} />
        <Mnemonic word="ACID" meaning="Atomicity, Consistency, Isolation, Durability." />
      </Section>

      <Section id="s2" title="2. SQL Quick Review">
        <Bullets items={[
          "Logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.",
          "WHERE filters rows before aggregation; HAVING filters groups after.",
          "COUNT(*) counts NULLs; COUNT(col) ignores them.",
          "IN vs EXISTS — same result, EXISTS often faster with an index.",
          "NULL comparisons need IS NULL / IS NOT NULL — never = NULL.",
        ]} />
      </Section>

      <Section id="s3" title="3. Keys & Constraints">
        <Bullets items={[
          "Super ⊇ Candidate ⊇ Primary. One PK per table; Unique may allow NULL.",
          "Foreign key = referential integrity. Cascade / restrict / set null.",
          "CHECK enforces column-level rules; deferrable constraints validate at COMMIT.",
        ]} />
        <Mnemonic word="PICUD" meaning="Primary · Unique · Check · Foreign · Default (constraint families)." />
      </Section>

      <Section id="s4" title="4. ER Model">
        <Bullets items={[
          "Entities → tables · attributes → columns · relationships → FKs / join tables.",
          "Cardinality: 1:1, 1:N, M:N; participation: total vs partial.",
          "Weak entity → identified by owner's key + partial key.",
        ]} />
      </Section>

      <Section id="s5" title="5. Normalization">
        <Bullets items={[
          "1NF: atomic values.",
          "2NF: no partial dependency on composite key.",
          "3NF: no transitive dependency.",
          "BCNF: every determinant is a superkey.",
          "4NF: no multi-valued dependency; 5NF: no join dependency.",
        ]} />
        <Mnemonic word="1-2-3-BCNF" meaning='"1 whole value, 2 no partials, 3 no transits, BCNF no non-key determinants."' />
      </Section>

      <Section id="s6" title="6. Transactions">
        <Bullets items={[
          <><strong>Anomalies</strong>: dirty read, non-repeatable read, phantom, write skew.</>,
          <><strong>Levels</strong>: RU → RC → RR → SERIALIZABLE. Each blocks the next anomaly.</>,
          <><strong>Locks</strong>: shared vs exclusive; 2PL guarantees serializability.</>,
          <><strong>MVCC</strong>: readers never block writers; used by Postgres, Oracle.</>,
        ]} />
      </Section>

      <Section id="s7" title="7. Indexing">
        <Bullets items={[
          "B-tree = default. GIN = JSON/arrays/full-text. GiST = geo. BRIN = huge ordered.",
          "Composite index (a,b) benefits WHERE a=…, (a,b)=…, ORDER BY a,b.",
          "Covering index = query answered from the index alone.",
          "Trade-off: every extra index slows writes.",
        ]} />
      </Section>

      <Section id="s8" title="8. Query Optimization">
        <Bullets items={[
          "Read EXPLAIN bottom-up; watch row estimates vs actual.",
          "Convert OFFSET pagination → keyset pagination on ordered index.",
          "Avoid SELECT *; project only the columns you need.",
          "Rewrite correlated subqueries as JOINs or window functions.",
          "Run ANALYZE after big data loads to refresh statistics.",
        ]} />
      </Section>

      <Section id="s9" title="9. Database Security">
        <Bullets items={[
          "Least privilege · row-level security · parameterised queries.",
          "Encrypt at rest and in transit (TLS).",
          "Rotate credentials · avoid superuser in app connections.",
          "Never concatenate user input into SQL.",
        ]} />
      </Section>

      <Section id="s10" title="10. Final Revision Sheet">
        <div className="grid gap-3 md:grid-cols-2">
          <Mnemonic word="ACID" meaning="Atomicity · Consistency · Isolation · Durability" />
          <Mnemonic word="CAP" meaning="Consistency · Availability · Partition tolerance" />
          <Mnemonic word="DDL DML DCL TCL" meaning="Define · Manipulate · Control · Transaction" />
          <Mnemonic word="JOIN" meaning="Inner · Left · Right · Full · Cross · Lateral" />
          <Mnemonic word="NF ladder" meaning="1NF → 2NF → 3NF → BCNF → 4NF → 5NF" />
          <Mnemonic word="Isolation" meaning="RU · RC · RR · SERIALIZABLE" />
        </div>
      </Section>

      <Section id="review" title="Revision Review">
        <p><strong>Last-minute checklist:</strong></p>
        <Bullets items={[
          "Recite ACID + isolation levels.",
          "Draw the JOIN table.",
          "Explain 3NF vs BCNF in 30 seconds.",
          "Walk through EXPLAIN of a slow query.",
          "Write a bank-transfer transaction.",
        ]} />
        <p className="mt-3"><strong>Interview checklist:</strong> SQL fluency · schema design under 15 min · one transaction anecdote · one indexing anecdote.</p>
        <p><strong>Top 50 concepts:</strong> ACID, CAP, PACELC, MVCC, 2PL, OCC, WAL, ARIES, BCNF, MVD, PK/FK, RLS, EXPLAIN, N+1, keyset pagination, covering index, partial index, materialised view, sharding, replication, quorum, Raft, log shipping, PITR, dead tuple, VACUUM, HOT update, bloat, hash join, merge join, nested loop, sort spill, statistics, ANALYZE, JSONB, GIN, BRIN, GiST, TOAST, prepared statement, connection pool, PgBouncer, transaction retry, deadlock, savepoint, isolation upgrade, snapshot isolation, phantom, write skew, serialization failure.</p>
        <p><strong>Rapid recall sheet:</strong> re-read this section the morning of your exam.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long to read this fully?">45–60 min. Skim first, memorise mnemonics second.</FAQItem>
        <FAQItem q="Is this enough for an interview?">Combine with practice — the interviewer will ask for reasoning, not just facts.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite documentation</li>
          <li>Silberschatz, Korth & Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>CMU 15-445, MIT OCW 6.830, Stanford CS245</li>
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
