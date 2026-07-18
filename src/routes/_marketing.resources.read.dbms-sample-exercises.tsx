import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-sample-exercises",
  title: "DBMS — Sample Exercises",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "25 min",
  pages: 32,
  lastUpdated: "January 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1800&q=80",
  heroSubtitle:
    "A 150+ exercise DBMS workbook — SQL drills, ER activities, normalization tasks, transaction puzzles, and design challenges arranged by rising difficulty.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Database Fundamentals" },
  { id: "c2", label: "2. SQL Basics" },
  { id: "c3", label: "3. ER Model Exercises" },
  { id: "c4", label: "4. Relational Model" },
  { id: "c5", label: "5. Keys & Constraints" },
  { id: "c6", label: "6. SQL Query Writing" },
  { id: "c7", label: "7. Joins" },
  { id: "c8", label: "8. Normalization" },
  { id: "c9", label: "9. Transactions" },
  { id: "c10", label: "10. Indexing" },
  { id: "c11", label: "11. Database Design Challenges" },
  { id: "c12", label: "12. Final Practice Challenge" },
  { id: "review", label: "Exercise Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Project Guide", tag: "CS Core", time: "22 min" },
  { title: "DBMS — Project Case Study", tag: "CS Core", time: "30 min" },
  { title: "DBMS — Practice Questions", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-sample-exercises")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-sample-exercises" }],
  }),
  component: Page,
});

function Ex({ level, items }: { level: string; items: React.ReactNode[] }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">{level}</p>
      <ol className="list-decimal space-y-1 pl-5 text-sm">{items.map((n, i) => <li key={i}>{n}</li>)}</ol>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reinforce every DBMS concept through purposeful practice.</li>
          <li>Ladder from single-table SQL to multi-table design.</li>
          <li>Sketch ER diagrams and normalize by hand.</li>
          <li>Reflect on each exercise before checking any solution.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80"
          caption="Workbook loop — attempt → reflect → refactor → level up."
        />
        <Callout tone="tip" title="How to use">Do not skip levels. Each set builds on the previous one and unlocks the next challenge.</Callout>
      </Section>

      <Section id="c1" title="1. Database Fundamentals">
        <Ex level="Warm-up" items={[
          "MCQ: DBMS provides which guarantee — (a) atomicity (b) hyperthreading (c) DNS resolution (d) compression.",
          "True/False: A view stores data physically by default.",
          "Fill: The three-schema architecture separates ____, ____ and ____ levels.",
          "Short: Give two disadvantages of file-based systems compared to a DBMS.",
          "Scenario: A team stores customer orders in Excel across 12 branches. List three problems they'll hit.",
        ]} />
      </Section>

      <Section id="c2" title="2. SQL Basics">
        <Ex level="Set A · 15 drills" items={[
          "Select every column from a students table.",
          "Select name and email only.",
          "Filter students older than 18.",
          "Sort products by price descending.",
          "Return the 10 newest orders.",
          "Count rows in the customers table.",
          "Group orders by status and count each group.",
          "Filter groups with more than 100 orders.",
          "Insert a new user with a default created_at.",
          "Update an email address for user id = 42.",
          "Delete inactive users older than 2 years.",
          "Return distinct city values from addresses.",
          "Combine first_name and last_name into full_name.",
          "Round product price to 2 decimals.",
          "Extract year from an order_date column.",
        ]} />
      </Section>

      <Section id="c3" title="3. ER Model Exercises">
        <Ex level="ER activity pack" items={[
          "Draw an ER diagram for a library (Books, Members, Loans, Reservations).",
          "Add cardinality and participation to your library ER.",
          "Extend the library with authors as a many-to-many.",
          "Model a food-delivery platform (users, restaurants, menu, orders, delivery).",
          "Convert your ER diagrams to relational schemas.",
          "Identify weak entities in a hotel booking system.",
        ]} />
      </Section>

      <Section id="c4" title="4. Relational Model">
        <Ex level="Algebra practice" items={[
          "Write σ (salary > 50000) on Employees in words.",
          "Write π(name, salary) applied to the previous result.",
          "Express INNER JOIN using selection and Cartesian product.",
          "Show that UNION requires union-compatible schemas.",
          "Give an example where relational algebra can not express division without a rename.",
        ]} />
      </Section>

      <Section id="c5" title="5. Keys & Constraints">
        <Ex level="Design tasks" items={[
          "Identify candidate keys for R(sid, email, phone).",
          "Choose a primary key and justify — surrogate or natural?",
          "Add ON DELETE CASCADE only where appropriate; explain each choice.",
          "Write a CHECK to keep age between 0 and 150.",
          "Add a UNIQUE constraint that allows a single NULL email.",
        ]} />
      </Section>

      <Section id="c6" title="6. SQL Query Writing">
        <Ex level="Set B · progressive" items={[
          "Top 3 highest-paid employees.",
          "Second highest salary using window functions.",
          "Customers with no orders (LEFT JOIN vs NOT EXISTS).",
          "Month-over-month revenue growth %.",
          "Running sum of daily sales.",
          "Rolling 7-day average signups.",
          "Convert OFFSET pagination to keyset.",
          "Rewrite an IN () subquery as EXISTS.",
          "Recursive CTE for a category tree.",
          "Pivot rows to columns without native PIVOT.",
          "Detect gaps in a numeric sequence.",
          "Find consecutive login-day streaks.",
          "Delete duplicates keeping the smallest id.",
        ]} />
      </Section>

      <Section id="c7" title="7. Joins">
        <Ex level="Join lab" items={[
          "Users and their latest order.",
          "All users with or without an order.",
          "Products never ordered.",
          "Books whose every author is under 30 (universal quantifier).",
          "Cross join to explode a calendar × product grid.",
          "LATERAL join to fetch top 3 posts per user.",
        ]} />
      </Section>

      <Section id="c8" title="8. Normalization Exercises">
        <Ex level="Decompose" items={[
          "Given FDs {A→B, B→C}, prove R is not in 3NF.",
          "Decompose R to 3NF preserving all FDs.",
          "Show a 3NF relation that violates BCNF.",
          "Decompose a spreadsheet with repeating phone columns to 1NF.",
          "Draw the 4NF version of a table with a multi-valued dependency.",
        ]} />
      </Section>

      <Section id="c9" title="9. Transactions">
        <Ex level="Concurrency puzzles" items={[
          "Design a bank-transfer transaction that survives concurrent runs.",
          "Reproduce a dirty-read by lowering isolation to READ UNCOMMITTED (dialects vary).",
          "Trigger a deadlock in two psql sessions and resolve it.",
          "Explain write skew with a concert-seat example.",
          "Use SAVEPOINT to partially roll back a long import.",
        ]} />
      </Section>

      <Section id="c10" title="10. Indexing">
        <Ex level="Index lab" items={[
          "Propose the best index for WHERE user_id=? AND created_at BETWEEN ?.",
          "Explain why an index on gender (2 values) rarely helps.",
          "Build a covering index for a top-10 dashboard query.",
          "Compare a partial index vs a full one for soft-deleted rows.",
          "Show, with EXPLAIN, the effect of dropping the wrong index.",
        ]} />
      </Section>

      <Section id="c11" title="11. Database Design Challenges">
        <Ex level="Full-app design" items={[
          "Design an online quiz platform (quizzes, questions, options, attempts, answers).",
          "Design a role-and-permission system with hierarchical roles.",
          "Design an event-ticketing system without double-booking.",
          "Design an inventory system with multi-warehouse reservations.",
          "Design an audit-log schema that captures who/what/when for every table.",
        ]} />
      </Section>

      <Section id="c12" title="12. Final Practice Challenge">
        <Ex level="Capstone" items={[
          "Given a raw CSV of e-commerce data, propose a 3NF schema.",
          "Generate migrations with FKs, indexes, and constraints.",
          "Write 10 SQL queries useful for a marketing dashboard.",
          "Add row-level security so users see only their orders.",
          "Explain, in 1 page, the trade-offs of a materialised leaderboard.",
        ]} />
      </Section>

      <Section id="review" title="Exercise Review">
        <p><strong>Learning checklist:</strong> ticked every chapter · attempted 150+ items · reflected on each mistake.</p>
        <p><strong>Difficulty tracker:</strong> log each exercise as easy / medium / hard on first attempt; revisit the hard ones weekly.</p>
        <p><strong>Progress summary:</strong> aim for &gt;80% on chapters 1–6, &gt;60% on chapters 7–12 before interviews.</p>
        <p><strong>Suggested next exercises:</strong> proceed to “DBMS — Project Guide” and then case-study analysis.</p>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Drill</strong> — a small, timed exercise.</li>
          <li><strong>Scenario</strong> — a realistic word-problem to model.</li>
          <li><strong>Reflection</strong> — 60-second review after each attempt.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Where are the answers?">Attempt every exercise, then verify against “DBMS — Answer Key” and the Reference Guide.</FAQItem>
        <FAQItem q="Can I use MySQL?">Yes — most exercises are dialect-neutral; window functions require MySQL 8+.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite documentation</li>
          <li>Silberschatz, Korth & Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>MIT OCW 6.830, CMU 15-445, Stanford CS245</li>
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
