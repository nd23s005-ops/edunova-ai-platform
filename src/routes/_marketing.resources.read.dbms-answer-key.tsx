import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-answer-key",
  title: "DBMS — Answer Key",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "20 min",
  pages: 31,
  lastUpdated: "January 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "Worked solutions to every DBMS Practice Question — model SQL, step-by-step reasoning, ER diagrams, normalization walkthroughs, alternative answers, rubrics, and common mistakes.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "mcq", label: "1. MCQ Solutions" },
  { id: "short", label: "2. Short Answer Solutions" },
  { id: "long", label: "3. Long Answer Solutions" },
  { id: "sql", label: "4. SQL Query Solutions" },
  { id: "er", label: "5. ER Diagram Solutions" },
  { id: "norm", label: "6. Normalization Solutions" },
  { id: "txn", label: "7. Transactions" },
  { id: "design", label: "8. Database Design" },
  { id: "rubric", label: "9. Evaluation Rubric" },
  { id: "final", label: "10. Final Review" },
  { id: "review", label: "Answer Key Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Practice Questions", tag: "CS Core", time: "33 min" },
  { title: "DBMS — Interview Questions", tag: "CS Core", time: "32 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-answer-key")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-answer-key" }],
  }),
  component: Page,
});

function A({ q, a, note }: { q: string; a: React.ReactNode; note?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="text-sm font-medium text-foreground">Q. {q}</p>
      <div className="mt-2 text-sm text-muted-foreground">{a}</div>
      {note && <p className="mt-2 text-xs italic text-primary/80">Common mistake: {note}</p>}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs leading-relaxed"><code>{children}</code></pre>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Compare your solution to a canonical model answer.</li>
          <li>Understand not just the answer but the reasoning path.</li>
          <li>Recognise common mistakes and how to avoid them.</li>
          <li>Grade yourself against a repeatable rubric.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80"
          caption="Grading loop — attempt → compare → identify concept gap → revise."
        />
        <Callout tone="note" title="Companion resource">Every solution here references a question in “DBMS — Practice Questions”. Attempt the exercise first, then verify here.</Callout>
      </Section>

      <Section id="mcq" title="1. MCQ Solutions">
        <div className="space-y-3">
          <A q="Which is NOT an ACID property?" a={<><strong>(a) Availability.</strong> ACID = Atomicity, Consistency, Isolation, Durability. Availability belongs to CAP.</>} note="Confusing CAP with ACID." />
          <A q="Three-schema architecture separates:" a={<><strong>(b) external, conceptual, internal.</strong> Views, logical schema, physical storage.</>} />
          <A q="Which model uses tables?" a={<><strong>(c) Relational.</strong></>} />
          <A q="A DBA is responsible for:" a={<><strong>(c) backups & tuning.</strong></>} />
          <A q="Metadata is stored in:" a={<><strong>(b) the data dictionary / system catalog.</strong></>} />
          <A q="DISTINCT" a={<><strong>(b) DISTINCT.</strong> UNIQUE is a constraint, not a clause.</>} />
          <A q="WHERE vs HAVING" a={<>WHERE filters <strong>rows before</strong> aggregation; HAVING filters <strong>groups after</strong> aggregation.</>} />
          <A q="COUNT(*) vs COUNT(col)" a={<><code>COUNT(*)</code> counts all rows including NULLs; <code>COUNT(col)</code> ignores NULLs.</>} note="Assuming they always match." />
        </div>
      </Section>

      <Section id="short" title="2. Short Answer Solutions">
        <div className="space-y-3">
          <A q="Four disadvantages of file systems vs DBMS." a={<ul className="list-disc space-y-1 pl-5">
            <li>Data redundancy and inconsistency across files.</li>
            <li>No concurrency control — lost updates are common.</li>
            <li>No integrity enforcement (types, FKs, checks).</li>
            <li>Difficult ad-hoc querying; no transactional guarantees.</li>
          </ul>} />
          <A q="Logical vs physical data independence." a={<>Logical: change the logical schema without breaking apps (add column). Physical: change storage/indexes without breaking the logical schema (add index, partition).</>} />
          <A q="Primary vs candidate vs super key." a={<>Super key = any unique-identifying set. Candidate = minimal super key. Primary = chosen candidate key (NOT NULL, one per table).</>} />
        </div>
      </Section>

      <Section id="long" title="3. Long Answer Solutions">
        <div className="space-y-3">
          <A q="Explain isolation anomalies at each level." a={
            <div>
              <p>READ UNCOMMITTED admits <em>dirty reads</em>. READ COMMITTED prevents dirty reads but still allows <em>non-repeatable reads</em>. REPEATABLE READ prevents non-repeatable reads; ANSI still allows <em>phantoms</em>, though Postgres's snapshot isolation avoids phantoms yet permits <em>write skew</em>. SERIALIZABLE prevents all anomalies by ensuring some serial equivalent exists.</p>
              <p className="mt-2">Rubric: define each level (2 pts) · list its allowed anomaly (3 pts) · one example per level (3 pts) · mention Postgres's SI quirk (2 pts).</p>
            </div>
          } />
        </div>
      </Section>

      <Section id="sql" title="4. SQL Query Solutions">
        <div className="space-y-3">
          <A q="Top 5 highest-paid employees per department." a={<>
            <Code>{`SELECT * FROM (
  SELECT e.*, DENSE_RANK() OVER (
    PARTITION BY dept_id ORDER BY salary DESC
  ) rk FROM employees e
) t WHERE rk <= 5;`}</Code>
            <p className="mt-2">Alternative — lateral join for large tables:</p>
            <Code>{`SELECT d.id, top.*
FROM depts d
JOIN LATERAL (
  SELECT * FROM employees WHERE dept_id = d.id
  ORDER BY salary DESC LIMIT 5
) top ON TRUE;`}</Code>
          </>} note="Using ROW_NUMBER when ties should be included." />
          <A q="Users with no orders." a={<Code>{`SELECT u.* FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;

-- or
SELECT u.* FROM users u
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);`}</Code>} />
          <A q="Month-over-month revenue growth %." a={<Code>{`WITH m AS (
  SELECT date_trunc('month', paid_at) mth, SUM(amount) rev
  FROM payments GROUP BY 1
)
SELECT mth, rev,
       (rev - LAG(rev) OVER (ORDER BY mth)) * 100.0
       / NULLIF(LAG(rev) OVER (ORDER BY mth), 0) AS growth_pct
FROM m;`}</Code>} note="Dividing by zero without NULLIF." />
          <A q="Rewrite IN () as EXISTS." a={<Code>{`SELECT * FROM t
WHERE EXISTS (SELECT 1 FROM u WHERE u.id = t.id);`}</Code>} />
        </div>
      </Section>

      <Section id="er" title="5. ER Diagram Solutions">
        <div className="space-y-3">
          <A q="Library ER model." a={<>
            <p>Entities: <em>Book, Author, Member, Loan, Reservation</em>.</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Book *—* Author via <code>book_authors(book_id, author_id)</code>.</li>
              <li>Loan connects Member and Book with <em>loan_date, due_date, return_date</em>.</li>
              <li>Reservation is a weak entity dependent on Book and Member.</li>
            </ul>
            <p className="mt-2">Convert to schema — one table per entity plus join tables for many-to-many. Add FKs with ON DELETE RESTRICT on Book to preserve loan history.</p>
          </>} />
          <A q="Student *—* Course with (grade, semester)." a={<>The M:N relationship becomes a join table <code>enrollment(student_id, course_id, grade, semester, PRIMARY KEY (student_id, course_id, semester))</code>.</>} />
        </div>
      </Section>

      <Section id="norm" title="6. Normalization Solutions">
        <div className="space-y-3">
          <A q="R(A,B,C,D) with FDs {A→B, B→C, C→D} — 3NF decomposition." a={<>
            <p>Compute closures: A⁺ = ABCD → A is a candidate key. FDs violate 3NF (transitive dependencies via B, C).</p>
            <p>Decompose:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>R1(A, B) — from A→B</li>
              <li>R2(B, C) — from B→C</li>
              <li>R3(C, D) — from C→D</li>
            </ul>
            <p>Lossless join (via A→B→C→D) and dependency preserving.</p>
          </>} />
          <A q="R(student, course, teacher) with teacher→course — BCNF." a={<>
            <p>Candidate keys: (student, course), (student, teacher). teacher→course determines a non-superkey column ⇒ violates BCNF.</p>
            <p>Decompose to R1(teacher, course) and R2(student, teacher). Lossless join but drops dependency (student, course) → teacher (acceptable — BCNF cannot always preserve all FDs).</p>
          </>} note="Forgetting to check dependency preservation vs BCNF trade-off." />
        </div>
      </Section>

      <Section id="txn" title="7. Transactions">
        <div className="space-y-3">
          <A q="Safe bank transfer under concurrency." a={<Code>{`BEGIN;
  SELECT balance FROM accounts WHERE id = :from FOR UPDATE;
  SELECT balance FROM accounts WHERE id = :to   FOR UPDATE;
  UPDATE accounts SET balance = balance - :amt WHERE id = :from;
  UPDATE accounts SET balance = balance + :amt WHERE id = :to;
COMMIT;`}</Code>} note="Missing FOR UPDATE or updating without a balance check → negative balances under contention." />
          <A q="Dirty read vs non-repeatable read." a={<>
            <p>Dirty read: T1 reads a value that T2 later rolls back — impossible ≥ READ COMMITTED.</p>
            <p>Non-repeatable: T1 reads the same row twice and gets different values because T2 committed a change in between — needs REPEATABLE READ or SI to prevent.</p>
          </>} />
        </div>
      </Section>

      <Section id="design" title="8. Database Design">
        <div className="space-y-3">
          <A q="Online quiz platform." a={<>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>quizzes</strong>(id, title, subject, created_by, created_at)</li>
              <li><strong>questions</strong>(id, quiz_id FK, text, type, points)</li>
              <li><strong>options</strong>(id, question_id FK, text, is_correct)</li>
              <li><strong>attempts</strong>(id, quiz_id FK, user_id FK, started_at, submitted_at, score)</li>
              <li><strong>answers</strong>(attempt_id FK, question_id FK, option_id FK, PK compound)</li>
            </ul>
            <p>Add partial unique index on active attempts, materialized view for leaderboards.</p>
          </>} />
        </div>
      </Section>

      <Section id="rubric" title="9. Evaluation Rubric">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-3 py-2">Question Type</th><th className="px-3 py-2">Weight</th><th className="px-3 py-2">Grading criteria</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50"><td className="px-3 py-2">MCQ / True-False</td><td className="px-3 py-2">1 pt</td><td className="px-3 py-2">Exact match</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Short answer</td><td className="px-3 py-2">2–3 pts</td><td className="px-3 py-2">Correct concept · clear wording</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Long answer</td><td className="px-3 py-2">5–10 pts</td><td className="px-3 py-2">Definition · example · trade-off · diagram</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">SQL query</td><td className="px-3 py-2">4–8 pts</td><td className="px-3 py-2">Correct output · uses indexes · readable style</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">ER diagram</td><td className="px-3 py-2">5 pts</td><td className="px-3 py-2">Entities · relationships · cardinality · keys</td></tr>
              <tr><td className="px-3 py-2">Case study</td><td className="px-3 py-2">10 pts</td><td className="px-3 py-2">Problem framing · options · recommendation with trade-offs</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="final" title="10. Final Review">
        <p><strong>Instructor Notes:</strong> allocate 40% to SQL, 25% to design, 20% to concepts, 15% to transactions/indexing.</p>
        <p><strong>Alternative Answers:</strong> for SQL problems, an equivalent plan (correlated subquery ↔ JOIN ↔ window) is fully acceptable — grade on correctness and cost, not style.</p>
        <p><strong>Common Mistake Themes:</strong> confusing WHERE/HAVING, forgetting NULLs, dropping COUNT(*) semantics, missing FOR UPDATE, and mixing BCNF with 3NF.</p>
      </Section>

      <Section id="review" title="Answer Key Review">
        <Callout tone="tip" title="Final Revision">
          Re-solve every question you marked wrong on first attempt. If you fail the same one twice, add it to your interview cheat sheet.
        </Callout>
        <p><strong>Scoring Guide:</strong> 90%+ excellent · 75–89% strong · 60–74% needs targeted revision · &lt;60% redo the chapter.</p>
        <p><strong>Performance Analysis:</strong> track chapter scores. Two consecutive dips → schedule a deep-dive session.</p>
        <p><strong>Improvement Recommendations:</strong> pair every wrong answer with one written note explaining the correct reasoning.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Should I read this before attempting?">No — attempt each question cold first, then verify here.</FAQItem>
        <FAQItem q="Are there multiple correct answers?">Frequently for SQL and design questions. Grade on correctness and trade-offs.</FAQItem>
        <FAQItem q="Where can I ask doubts?">Use the EduNova AI tutor — paste the question and your attempt.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite, MariaDB, IBM Db2 documentation</li>
          <li>Silberschatz, Korth, Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>MIT OCW 6.830, CMU 15-445, Stanford CS245</li>
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
