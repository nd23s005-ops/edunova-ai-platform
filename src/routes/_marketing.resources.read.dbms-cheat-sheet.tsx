import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-cheat-sheet",
  title: "DBMS — Cheat Sheet",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "3 min",
  pages: 2,
  lastUpdated: "August 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1800&q=80",
  heroSubtitle:
    "A 2-page printable DBMS + SQL quick reference — syntax, joins, keys, constraints, normal forms, ACID, indexing, and interview facts.",
};

const TOC: TocItem[] = [
  { id: "syntax", label: "1. SQL Syntax" },
  { id: "commands", label: "2. SQL Commands" },
  { id: "keys", label: "3. Keys" },
  { id: "constraints", label: "4. Constraints" },
  { id: "joins", label: "5. Joins" },
  { id: "norm", label: "6. Normalization" },
  { id: "acid", label: "7. ACID Properties" },
  { id: "idx", label: "8. Indexing" },
  { id: "tips", label: "9. Database Design Tips" },
  { id: "quick", label: "10. Quick Reference" },
  { id: "review", label: "Cheat Sheet Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Quick Revision Notes", tag: "CS Core", time: "10 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
  { title: "DBMS — Interview Questions", tag: "CS Core", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-cheat-sheet" }],
  }),
  component: Page,
});

function Code({ children }: { children: string }) {
  return <pre className="mt-1 overflow-x-auto rounded bg-muted p-3 text-xs leading-relaxed"><code>{children}</code></pre>;
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <tr className="border-b border-border/50">
      <td className="px-3 py-1.5 font-mono text-xs">{k}</td>
      <td className="px-3 py-1.5 text-xs">{v}</td>
    </tr>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="syntax" title="1. SQL Syntax">
        <Figure
          src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1600&q=80"
          caption="Keep this cheat sheet pinned near your editor."
        />
        <Code>{`SELECT col1, col2 FROM table
[WHERE  cond]
[GROUP  BY col]
[HAVING agg-cond]
[ORDER  BY col [ASC|DESC]]
[LIMIT  n OFFSET m];`}</Code>
        <Callout tone="tip" title="Logical order">FROM → WHERE → GROUP → HAVING → SELECT → ORDER → LIMIT.</Callout>
      </Section>

      <Section id="commands" title="2. SQL Commands">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-xs">
            <tbody>
              <Row k="DDL" v="CREATE · ALTER · DROP · TRUNCATE · RENAME" />
              <Row k="DML" v="SELECT · INSERT · UPDATE · DELETE · MERGE" />
              <Row k="DCL" v="GRANT · REVOKE" />
              <Row k="TCL" v="BEGIN · COMMIT · ROLLBACK · SAVEPOINT" />
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="keys" title="3. Keys">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Super ⊇ Candidate ⊇ Primary · Alternate = unused candidate.</li>
          <li>Foreign key → parent PK.</li>
          <li>Surrogate = synthetic BIGINT / UUID.</li>
        </ul>
      </Section>

      <Section id="constraints" title="4. Constraints">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-xs">
            <tbody>
              <Row k="NOT NULL" v="column can't be NULL" />
              <Row k="UNIQUE" v="column values distinct" />
              <Row k="PRIMARY KEY" v="NOT NULL + UNIQUE + 1 per table" />
              <Row k="FOREIGN KEY" v="references parent PK · CASCADE / RESTRICT / SET NULL" />
              <Row k="CHECK" v="boolean predicate per row" />
              <Row k="DEFAULT" v="fallback value" />
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="joins" title="5. Joins">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-xs">
            <tbody>
              <Row k="INNER" v="only matched rows" />
              <Row k="LEFT" v="all left + matched right (NULL if none)" />
              <Row k="RIGHT" v="mirror of LEFT" />
              <Row k="FULL" v="union of LEFT + RIGHT" />
              <Row k="CROSS" v="Cartesian product" />
              <Row k="LATERAL" v="per-row correlated subquery" />
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="norm" title="6. Normalization">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>1NF — atomic values.</li>
          <li>2NF — no partial dependency.</li>
          <li>3NF — no transitive dependency.</li>
          <li>BCNF — every determinant is a superkey.</li>
          <li>4NF — no multi-valued dependency.</li>
          <li>5NF — no join dependency.</li>
        </ul>
      </Section>

      <Section id="acid" title="7. ACID Properties">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>A</strong>tomicity — all or nothing.</li>
          <li><strong>C</strong>onsistency — rules preserved.</li>
          <li><strong>I</strong>solation — concurrent txns look serial.</li>
          <li><strong>D</strong>urability — committed writes survive crashes.</li>
        </ul>
      </Section>

      <Section id="idx" title="8. Indexing">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>B-tree default · GIN for JSON / arrays / FTS · GiST for geo · BRIN for huge ordered tables.</li>
          <li>Composite (a,b) → WHERE a=…, a=… AND b=…, ORDER BY a,b.</li>
          <li>Covering index answers query without heap fetch.</li>
          <li>Every extra index slows writes.</li>
        </ul>
      </Section>

      <Section id="tips" title="9. Database Design Tips">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Prefer surrogate primary keys.</li>
          <li>Every FK gets an index.</li>
          <li>Store dates as TIMESTAMPTZ, money as NUMERIC.</li>
          <li>Use ENUM / lookup tables for constrained sets.</li>
          <li>Migrate with reversible up/down scripts, no manual SQL in prod.</li>
        </ul>
      </Section>

      <Section id="quick" title="10. Quick Reference">
        <Code>{`-- pagination (keyset)
SELECT * FROM posts
WHERE (created_at, id) < (:last_ts, :last_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- top N per group
SELECT * FROM (
  SELECT *, DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) rk
  FROM emp
) t WHERE rk <= 3;

-- upsert (Postgres)
INSERT INTO t(id, v) VALUES (1, 'a')
ON CONFLICT (id) DO UPDATE SET v = EXCLUDED.v;

-- read-committed to serializable
BEGIN ISOLATION LEVEL SERIALIZABLE;`}</Code>
      </Section>

      <Section id="review" title="Cheat Sheet Review">
        <p><strong>Printable summary:</strong> Ctrl / ⌘ + P → print — the two pages are laid out for A4.</p>
        <p><strong>SQL quick reference:</strong> keep the syntax block in section 1 visible while writing queries.</p>
        <p><strong>Top 100 keywords:</strong> ACID · ANALYZE · BCNF · B-tree · BRIN · buffer · CAP · CASCADE · CTE · candidate · check · clustered · concurrency · covering · CROSS · DDL · DML · DCL · DEFAULT · deadlock · DENSE_RANK · deferrable · deletion · DISTINCT · durable · ENUM · EXPLAIN · foreign · FULL JOIN · GiST · GIN · GROUP BY · hash · HAVING · heap · INDEX · INNER · INSERT · IN vs EXISTS · isolation · JSONB · keyset · LATERAL · LEFT JOIN · LIKE · LIMIT · MERGE · materialized view · MVCC · NoSQL · NOT NULL · normal form · NULL · OFFSET · optimistic · ORDER BY · outer · pagination · PARTITION · PostgreSQL · primary · prepared · projection · quorum · Raft · replication · RIGHT JOIN · RLS · ROLLBACK · row · schema · SELECT · SERIAL · serializable · sharding · savepoint · SQL injection · statistics · surrogate · TOAST · transaction · TRUNCATE · UNIQUE · UPDATE · UPSERT · VACUUM · view · WAL · WHERE · window · write-skew · XA · YAGNI · zero-downtime · pg_stat_statements · pgvector · pg_dump · pg_restore.</p>
        <p><strong>Daily developer reference:</strong> print, laminate, keep on your desk.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this printable?">Yes — a two-page A4 layout.</FAQItem>
        <FAQItem q="Where do I learn each item?">Follow the linked resources — “DBMS — Reference Guide” explains each section in depth.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server documentation</li>
          <li>Silberschatz, Korth & Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>CMU 15-445, MIT OCW 6.830</li>
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
