import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-reference-guide",
  title: "DBMS — Reference Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "33 min",
  pages: 48,
  lastUpdated: "October 2026",
  tags: ["DBMS", "SQL", "Database Systems"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "A daily-use developer reference — SQL syntax, DDL/DML/DCL/TCL, functions, constraints, joins, views, triggers, transactions, indexes, normalization, common errors, and best practices.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "syntax", label: "1. SQL Syntax" },
  { id: "ddl", label: "2. DDL Commands" },
  { id: "dml", label: "3. DML Commands" },
  { id: "dcl", label: "4. DCL Commands" },
  { id: "tcl", label: "5. TCL Commands" },
  { id: "fn", label: "6. SQL Functions" },
  { id: "constr", label: "7. Constraints" },
  { id: "keys", label: "8. Keys" },
  { id: "joins", label: "9. Joins" },
  { id: "views", label: "10. Views" },
  { id: "sp", label: "11. Stored Procedures" },
  { id: "trig", label: "12. Triggers" },
  { id: "txn", label: "13. Transactions" },
  { id: "idx", label: "14. Indexes" },
  { id: "norm", label: "15. Normalization" },
  { id: "opt", label: "16. Optimization Tips" },
  { id: "err", label: "17. Error Reference" },
  { id: "bp", label: "18. Best Practices" },
  { id: "review", label: "Reference Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Advanced Concepts", tag: "CS Core", time: "38 min" },
  { title: "DBMS — Glossary", tag: "CS Core", time: "10 min" },
  { title: "DBMS — Tips & Tricks", tag: "CS Core", time: "12 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-reference-guide")({
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

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function Row({ cells }: { cells: (string | React.ReactNode)[] }) {
  return (
    <tr className="border-b border-border/50">
      {cells.map((c, i) => (
        <td key={i} className="px-3 py-2 align-top text-sm">{c}</td>
      ))}
    </tr>
  );
}

function Table({ head, rows }: { head: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/60">
      <table className="w-full">
        <thead className="bg-muted/40">
          <tr>{head.map((h, i) => <th key={i} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">{h}</th>)}</tr>
        </thead>
        <tbody>{rows.map((r, i) => <Row key={i} cells={r} />)}</tbody>
      </table>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Locate SQL syntax fast — no more Googling basic commands.</li>
          <li>Copy production-ready snippets for every category (DDL/DML/DCL/TCL).</li>
          <li>Compare join types, index types, and constraint types side-by-side.</li>
          <li>Diagnose common errors with a quick lookup.</li>
          <li>Adopt best-practice syntax and configuration defaults.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
          caption="Reference-first workflow — write, look up, verify, ship."
        />
      </Section>

      <Section id="syntax" title="1. SQL Syntax">
        <p>Canonical clause order:</p>
        <Code>{`SELECT   [DISTINCT] cols
FROM     table
JOIN     other ON …
WHERE    predicate
GROUP BY cols
HAVING   agg_predicate
ORDER BY cols [ASC|DESC]
LIMIT    n [OFFSET m];`}</Code>
        <p>Execution order (logical): FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.</p>
      </Section>

      <Section id="ddl" title="2. DDL Commands">
        <Code>{`CREATE TABLE users (
  id         BIGSERIAL PRIMARY KEY,
  email      TEXT      NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ADD COLUMN name TEXT;
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users RENAME TO app_users;

DROP TABLE app_users;
TRUNCATE TABLE app_users RESTART IDENTITY;

CREATE SCHEMA reports;
CREATE INDEX idx_users_email ON users (email);
CREATE UNIQUE INDEX ux_orders_ref ON orders (reference);`}</Code>
      </Section>

      <Section id="dml" title="3. DML Commands">
        <Code>{`-- Select
SELECT id, email FROM users WHERE active = TRUE ORDER BY id DESC LIMIT 20;

-- Insert
INSERT INTO users (email, name) VALUES ('a@x.com', 'A');
INSERT INTO users (email, name) VALUES ('b@x.com','B')
  RETURNING id;

-- Upsert (Postgres)
INSERT INTO users (email, name) VALUES ('a@x.com','A')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;

-- Update
UPDATE users SET name = 'Ada' WHERE id = 1;

-- Delete
DELETE FROM users WHERE created_at < now() - INTERVAL '1 year';`}</Code>
      </Section>

      <Section id="dcl" title="4. DCL Commands">
        <Code>{`GRANT SELECT, INSERT ON TABLE public.users TO app_role;
REVOKE INSERT ON TABLE public.users FROM app_role;

-- Roles
CREATE ROLE app_role LOGIN PASSWORD 'x';
GRANT app_role TO alice;`}</Code>
      </Section>

      <Section id="tcl" title="5. TCL Commands">
        <Code>{`BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  SAVEPOINT before_credit;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
  -- oops
  ROLLBACK TO SAVEPOINT before_credit;
COMMIT;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;`}</Code>
      </Section>

      <Section id="fn" title="6. SQL Functions">
        <Table
          head={["Category", "Functions"]}
          rows={[
            ["String", "LENGTH, UPPER, LOWER, TRIM, SUBSTRING, POSITION, REPLACE, CONCAT, LEFT/RIGHT"],
            ["Numeric", "ABS, CEIL, FLOOR, ROUND, MOD, POWER, SQRT, GREATEST, LEAST"],
            ["Date/Time", "NOW, CURRENT_DATE, AGE, DATE_TRUNC, EXTRACT, TO_CHAR, TO_DATE, INTERVAL"],
            ["Aggregate", "COUNT, SUM, AVG, MIN, MAX, ARRAY_AGG, STRING_AGG, PERCENTILE_CONT"],
            ["Conditional", "COALESCE, NULLIF, CASE WHEN, GREATEST, LEAST"],
            ["Window", "ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), NTILE(), FIRST_VALUE()"],
            ["JSON", "->, ->>, jsonb_path_query, jsonb_set, jsonb_build_object"],
          ]}
        />
      </Section>

      <Section id="constr" title="7. Constraints">
        <Table
          head={["Constraint", "Purpose", "Example"]}
          rows={[
            ["NOT NULL", "Forbid NULL", "email TEXT NOT NULL"],
            ["UNIQUE", "Enforce uniqueness", "UNIQUE (email)"],
            ["PRIMARY KEY", "Row identity", "PRIMARY KEY (id)"],
            ["FOREIGN KEY", "Referential integrity", "FOREIGN KEY (user_id) REFERENCES users(id)"],
            ["CHECK", "Boolean expression", "CHECK (price >= 0)"],
            ["DEFAULT", "Fallback value", "DEFAULT now()"],
            ["EXCLUDE", "Prevent overlap (ranges)", "EXCLUDE USING gist (room WITH =, period WITH &&)"],
          ]}
        />
      </Section>

      <Section id="keys" title="8. Keys">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Super key</strong> — any set of columns that uniquely identifies rows.</li>
          <li><strong>Candidate key</strong> — minimal super key.</li>
          <li><strong>Primary key</strong> — chosen candidate key (UNIQUE + NOT NULL).</li>
          <li><strong>Alternate key</strong> — remaining candidate keys.</li>
          <li><strong>Composite key</strong> — key spanning ≥ 2 columns.</li>
          <li><strong>Foreign key</strong> — references another table’s PK/UK.</li>
          <li><strong>Surrogate key</strong> — system-generated (SERIAL, UUID).</li>
        </ul>
      </Section>

      <Section id="joins" title="9. Joins">
        <Table
          head={["Join", "Result"]}
          rows={[
            ["INNER JOIN", "Rows matching in both tables"],
            ["LEFT JOIN", "All left rows + matched right (NULLs otherwise)"],
            ["RIGHT JOIN", "All right rows + matched left (NULLs otherwise)"],
            ["FULL OUTER JOIN", "All rows from both sides; unmatched → NULL"],
            ["CROSS JOIN", "Cartesian product"],
            ["SELF JOIN", "A table joined to itself using an alias"],
            ["LATERAL JOIN", "Right side may reference left-side columns"],
            ["SEMI JOIN (EXISTS)", "Rows in left that have at least one match on right"],
            ["ANTI JOIN (NOT EXISTS)", "Rows in left with no match on right"],
          ]}
        />
        <Code>{`SELECT u.id, o.total
FROM users u
LEFT JOIN LATERAL (
  SELECT SUM(amount) AS total FROM orders o WHERE o.user_id = u.id
) o ON TRUE;`}</Code>
      </Section>

      <Section id="views" title="10. Views">
        <Code>{`CREATE VIEW active_users AS
SELECT id, email FROM users WHERE active = TRUE;

CREATE MATERIALIZED VIEW mv_daily_orders AS
SELECT date_trunc('day', created_at) d, COUNT(*) c
FROM orders GROUP BY 1;

REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_orders;`}</Code>
      </Section>

      <Section id="sp" title="11. Stored Procedures">
        <Code>{`CREATE OR REPLACE FUNCTION transfer(a BIGINT, b BIGINT, amt NUMERIC)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE accounts SET balance = balance - amt WHERE id = a;
  UPDATE accounts SET balance = balance + amt WHERE id = b;
END $$;

CALL transfer(1, 2, 50);   -- PROCEDURE
SELECT transfer(1, 2, 50); -- FUNCTION`}</Code>
      </Section>

      <Section id="trig" title="12. Triggers">
        <Code>{`CREATE FUNCTION touch_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION touch_updated_at();`}</Code>
      </Section>

      <Section id="txn" title="13. Transactions">
        <Table
          head={["Isolation Level", "Dirty", "Non-repeatable", "Phantom", "Serial anomalies"]}
          rows={[
            ["READ UNCOMMITTED", "Yes", "Yes", "Yes", "Yes"],
            ["READ COMMITTED", "No", "Yes", "Yes", "Yes"],
            ["REPEATABLE READ", "No", "No", "Yes*", "Write skew"],
            ["SERIALIZABLE", "No", "No", "No", "No"],
          ]}
        />
        <Callout tone="note" title="Note">Postgres REPEATABLE READ is snapshot isolation — no phantoms, but write skew is possible without SERIALIZABLE.</Callout>
      </Section>

      <Section id="idx" title="14. Indexes">
        <Table
          head={["Index Type", "Best For", "Example"]}
          rows={[
            ["B-tree", "Equality, range, ORDER BY", "CREATE INDEX ON users(email)"],
            ["Hash", "Equality only (Postgres)", "CREATE INDEX … USING HASH (email)"],
            ["GIN", "Arrays, JSONB, full-text", "CREATE INDEX ON docs USING gin(tags)"],
            ["GiST/SP-GiST", "Geometry, ranges", "USING gist (period)"],
            ["BRIN", "Huge naturally-ordered tables", "USING brin (created_at)"],
            ["Partial", "Filtered subset", "WHERE deleted_at IS NULL"],
            ["Expression", "Function of a column", "ON users (LOWER(email))"],
            ["Covering", "Index-only scan", "INCLUDE (name)"],
          ]}
        />
      </Section>

      <Section id="norm" title="15. Normalization">
        <Table
          head={["Form", "Rule"]}
          rows={[
            ["1NF", "Atomic column values, unique rows"],
            ["2NF", "1NF + no partial dependency on composite PK"],
            ["3NF", "2NF + no transitive dependency"],
            ["BCNF", "Every determinant is a superkey"],
            ["4NF", "No multi-valued dependencies"],
            ["5NF", "No join dependencies not implied by candidate keys"],
          ]}
        />
      </Section>

      <Section id="opt" title="16. Optimization Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefix EXPLAIN with ANALYZE + BUFFERS to see real cost.</li>
          <li>Avoid functions on indexed columns in WHERE — use expression indexes.</li>
          <li>Prefer <code>EXISTS</code> over <code>IN</code> on large subqueries.</li>
          <li>Use covering indexes to enable index-only scans.</li>
          <li>Batch large updates/deletes (10k rows) to keep locks short.</li>
          <li>Cache expensive aggregates in materialized views.</li>
          <li>Set statement_timeout and idle_in_transaction_session_timeout in production.</li>
        </ul>
      </Section>

      <Section id="err" title="17. Error Reference">
        <Table
          head={["Code / Message", "Cause", "Fix"]}
          rows={[
            ["23505 unique_violation", "Duplicate value on UNIQUE column", "ON CONFLICT or check existence"],
            ["23503 foreign_key_violation", "Referenced parent row missing", "Insert parent first / verify FK"],
            ["23502 not_null_violation", "Missing required column", "Provide value or set DEFAULT"],
            ["40001 serialization_failure", "Conflicting concurrent update", "Retry the transaction"],
            ["40P01 deadlock_detected", "Circular wait between transactions", "Retry; order updates deterministically"],
            ["42P01 undefined_table", "Bad schema/name", "Check search_path / qualified name"],
            ["42703 undefined_column", "Column typo/missing", "Verify schema"],
            ["57014 query_canceled", "statement_timeout hit", "Optimise query or raise timeout"],
          ]}
        />
      </Section>

      <Section id="bp" title="18. Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Always version schema through migrations — never edit prod by hand.</li>
          <li>Never store money as float — use NUMERIC(19,4).</li>
          <li>Store timestamps in UTC (<code>timestamptz</code>).</li>
          <li>Use surrogate PKs; keep natural identifiers as unique constraints.</li>
          <li>Parameterise every query — no string concatenation.</li>
          <li>Log slow queries (threshold ≈ 200ms) and review weekly.</li>
          <li>Test restores quarterly.</li>
        </ul>
      </Section>

      <Section id="review" title="Reference Review">
        <Callout tone="tip" title="SQL Quick Reference">
          SELECT · JOIN · WHERE · GROUP BY · HAVING · WINDOW · CTE · UPSERT · RETURNING · MATERIALIZED VIEW · EXPLAIN ANALYZE.
        </Callout>
        <p><strong>Developer Cheat Sheet:</strong> keep this page bookmarked next to your DB client.</p>
        <p><strong>Most Used Commands:</strong> SELECT, INSERT … RETURNING, UPDATE, DELETE, CREATE INDEX, EXPLAIN.</p>
        <p><strong>Daily Lookup Guide:</strong> use Ctrl/Cmd+F to jump to any section.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which SQL dialect is this?">Postgres-first, with notes for MySQL, SQL Server, and Oracle where behaviour differs.</FAQItem>
        <FAQItem q="Can I use this in production?">Snippets are illustrative — always review against your engine's documentation.</FAQItem>
        <FAQItem q="Does it cover NoSQL?">No — see the Advanced Concepts resource for SQL vs NoSQL internals.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL Documentation — postgresql.org/docs</li>
          <li>MySQL Reference Manual — dev.mysql.com/doc</li>
          <li>Oracle SQL Language Reference — docs.oracle.com</li>
          <li>Microsoft SQL Server T-SQL Reference — learn.microsoft.com/sql</li>
          <li>SQLite Documentation — sqlite.org/docs.html</li>
          <li>MariaDB Knowledge Base, IBM Db2 Documentation</li>
          <li>ISO/IEC 9075 SQL Standard</li>
          <li>Silberschatz — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
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
