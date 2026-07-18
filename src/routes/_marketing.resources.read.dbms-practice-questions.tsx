import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-practice-questions",
  title: "DBMS — Practice Questions",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "33 min",
  pages: 29,
  lastUpdated: "April 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "350+ progressive DBMS practice questions — MCQs, true/false, fill-in-the-blanks, short/long answers, SQL coding, ER diagrams, normalization drills, and case-based scenarios.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "fund", label: "1. Database Fundamentals" },
  { id: "sql", label: "2. SQL Basics" },
  { id: "er", label: "3. ER Model" },
  { id: "keys", label: "4. Keys & Constraints" },
  { id: "norm", label: "5. Normalization" },
  { id: "queries", label: "6. SQL Queries" },
  { id: "txn", label: "7. Transactions" },
  { id: "cc", label: "8. Concurrency" },
  { id: "idx", label: "9. Indexing" },
  { id: "design", label: "10. Database Design" },
  { id: "case", label: "11. Case-based Questions" },
  { id: "final", label: "12. Final Assessment" },
  { id: "review", label: "Practice Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Answer Key", tag: "CS Core", time: "20 min" },
  { title: "DBMS — Interview Questions", tag: "CS Core", time: "32 min" },
  { title: "DBMS — Reference Guide", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-practice-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-practice-questions" }],
  }),
  component: Page,
});

function Block({ title, items }: { title: string; items: (string | React.ReactNode)[] }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
      <ol className="list-decimal space-y-1 pl-5 text-sm">
        {items.map((i, k) => <li key={k}>{i}</li>)}
      </ol>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reinforce every DBMS chapter through targeted practice.</li>
          <li>Build SQL fluency across DML, joins, aggregates, and windows.</li>
          <li>Practise ER modelling and normalization on paper.</li>
          <li>Prepare for university exams and interview screens.</li>
          <li>Self-assess with progressive difficulty.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80"
          caption="Practice loop — attempt → self-mark against the Answer Key → revise the missed concept."
        />
        <Callout tone="note" title="How to use">Attempt each block cold. Do not peek at the Answer Key until you've written a full solution.</Callout>
      </Section>

      <Section id="fund" title="1. Database Fundamentals">
        <Block title="MCQ" items={[
          "Which of the following is NOT a property of ACID? (a) Availability (b) Atomicity (c) Isolation (d) Durability",
          "The three-schema architecture separates: (a) DDL/DML/DCL (b) external/conceptual/internal (c) client/server/storage (d) parser/planner/executor",
          "Which model uses tables? (a) Hierarchical (b) Network (c) Relational (d) Object",
          "A DBA is responsible for: (a) writing app code (b) UI design (c) backups & tuning (d) marketing",
          "Metadata is stored in: (a) heap (b) data dictionary (c) WAL (d) client",
        ]} />
        <Block title="True / False" items={[
          "Every RDBMS is a DBMS.",
          "NoSQL always means schema-less.",
          "A view stores data physically by default.",
          "Data independence is a goal of DBMS.",
        ]} />
        <Block title="Fill in the blanks" items={[
          "____ separates logical from physical data organisation.",
          "The three-level architecture consists of ____, ____ and ____ levels.",
          "The ____ ensures that a transaction either completes fully or not at all.",
        ]} />
        <Block title="Short Answer" items={[
          "List four disadvantages of file-based systems compared to a DBMS.",
          "Distinguish between logical and physical data independence.",
        ]} />
      </Section>

      <Section id="sql" title="2. SQL Basics">
        <Block title="MCQ" items={[
          "Which clause removes duplicates? (a) UNIQUE (b) DISTINCT (c) COUNT (d) ORDER BY",
          "WHERE filters ___ ; HAVING filters ___ .",
          "COUNT(*) vs COUNT(col) — which counts NULLs?",
          "Which is a set operator? (a) JOIN (b) UNION (c) GROUP BY (d) ORDER BY",
        ]} />
        <Block title="Coding" items={[
          <>Write a query to list the top 5 highest-paid employees in each department.</>,
          <>Write a query to return every user with no orders.</>,
          <>Write a query to compute month-over-month revenue growth %.</>,
          <>Rewrite <code>SELECT * FROM t WHERE id IN (SELECT id FROM u)</code> using EXISTS.</>,
        ]} />
      </Section>

      <Section id="er" title="3. ER Model">
        <Block title="Diagrams" items={[
          "Draw an ER diagram for a Library system (Book, Author, Member, Loan, Reservation).",
          "Convert the following relationship to a schema: Student *—* Course with attributes (grade, semester).",
          "Identify weak entities and their partial keys for an Order → Order_Line → Product model.",
        ]} />
        <Block title="Short Answer" items={[
          "Explain the differences between total and partial participation.",
          "When would you model something as a specialization/generalization?",
        ]} />
      </Section>

      <Section id="keys" title="4. Keys & Constraints">
        <Block title="MCQ" items={[
          "Which is a minimal super key? (a) primary (b) candidate (c) alternate (d) surrogate",
          "A UNIQUE constraint on (email) allows how many NULLs in Postgres? (a) 0 (b) 1 (c) many (d) depends",
          "ON DELETE CASCADE means: (a) block delete (b) delete children too (c) set FK NULL (d) archive parent",
        ]} />
        <Block title="Short Answer" items={[
          "Differentiate primary key, candidate key, and super key.",
          "When should you prefer a surrogate key over a natural one? Give two examples.",
        ]} />
      </Section>

      <Section id="norm" title="5. Normalization">
        <Block title="Exercises" items={[
          "Given R(A,B,C,D) with FDs {A→B, B→C, C→D}, decompose to 3NF.",
          "Show that R(student, course, teacher) with teacher→course is NOT in BCNF and decompose it.",
          "Given a spreadsheet-like table with repeating phone columns, normalise it into 1NF.",
        ]} />
        <Block title="Short Answer" items={[
          "State two situations where denormalization is acceptable.",
          "Explain multi-valued dependencies and 4NF with an example.",
        ]} />
      </Section>

      <Section id="queries" title="6. SQL Queries">
        <Block title="Progressive" items={[
          "Level 1 — filter, sort, limit.",
          "Level 2 — GROUP BY + HAVING.",
          "Level 3 — JOINs across 3 tables.",
          "Level 4 — correlated subquery vs JOIN.",
          "Level 5 — window functions (RANK, running sums).",
          "Level 6 — recursive CTE for a category tree.",
          "Level 7 — pivot without native PIVOT.",
          "Level 8 — gaps-and-islands: find consecutive login streaks.",
        ]} />
      </Section>

      <Section id="txn" title="7. Transactions">
        <Block title="Problems" items={[
          "Design a bank-transfer transaction that handles concurrent updates.",
          "Explain, with a timeline, how dirty read differs from non-repeatable read.",
          "Give an example where READ COMMITTED is enough and one where it is not.",
          "Explain how SAVEPOINT can be used inside a long-running import job.",
        ]} />
      </Section>

      <Section id="cc" title="8. Concurrency">
        <Block title="Reasoning" items={[
          "Two transactions T1, T2 update rows A and B in different orders — construct the deadlock schedule.",
          "Compare 2PL, OCC, and MVCC in one paragraph each.",
          "Under snapshot isolation, construct a write-skew example and propose a fix.",
        ]} />
      </Section>

      <Section id="idx" title="9. Indexing">
        <Block title="Practical" items={[
          "Given a slow query filtering on (user_id, created_at DESC), propose the best index.",
          "For a table with 200 columns but 5 hot ones, propose two covering-index candidates.",
          "When would you choose BRIN over B-tree? Give a concrete workload.",
        ]} />
      </Section>

      <Section id="design" title="10. Database Design">
        <Block title="Schema tasks" items={[
          "Design a schema for an online quiz platform (quizzes, questions, options, attempts, answers, scoring).",
          "Design a role-and-permission system supporting hierarchical roles.",
          "Model an inventory system with multi-warehouse stock and reservations.",
        ]} />
      </Section>

      <Section id="case" title="11. Case-based Questions">
        <Block title="Scenarios" items={[
          "A social feed is slowing down as the timeline table grows. Suggest three interventions and their trade-offs.",
          "A reporting query takes 90s on production. Walk through your investigation checklist.",
          "A payment table shows duplicate rows during a network flap. Analyse likely causes and propose safeguards.",
        ]} />
      </Section>

      <Section id="final" title="12. Final Assessment">
        <Block title="Mixed 60-minute test" items={[
          "10 MCQs (2 min each).",
          "5 SQL coding problems (30 min total).",
          "1 ER modelling task (15 min).",
          "1 short scenario question (5 min).",
        ]} />
      </Section>

      <Section id="review" title="Practice Review">
        <Callout tone="tip" title="Chapter-wise Scorecard">
          Track per-chapter score: &lt;60% revise; 60–80% practice more; &gt;80% move to next chapter.
        </Callout>
        <p><strong>Progress Tracker:</strong> tick off each block on first attempt and again on revision.</p>
        <p><strong>Performance Analysis:</strong> the chapters you miss twice belong on your interview cheat sheet.</p>
        <p><strong>Practice Checklist:</strong> 350 questions attempted, 300+ correct on second pass.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Where are the answers?">See the companion resource: “DBMS — Answer Key”.</FAQItem>
        <FAQItem q="How much time per chapter?">Plan 60–90 minutes. Some blocks span multiple sittings.</FAQItem>
        <FAQItem q="Can I skip normalization?">No — it appears in every academic exam and most interviews.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL Documentation, MySQL Reference Manual</li>
          <li>Oracle SQL Language Reference, Microsoft SQL Docs</li>
          <li>SQLite, MariaDB, IBM Db2 documentation</li>
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
