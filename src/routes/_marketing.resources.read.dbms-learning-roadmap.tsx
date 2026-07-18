import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-learning-roadmap",
  title: "DBMS — Learning Roadmap",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 11,
  lastUpdated: "May 2026",
  tags: ["DBMS", "SQL", "Database Systems"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "A structured 12-week roadmap from database fundamentals to advanced DBMS — with milestones, SQL drills, portfolio projects, certifications, and a career plan.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "1. Prerequisites" },
  { id: "fundamentals", label: "2. Database Fundamentals" },
  { id: "sql", label: "3. SQL Basics" },
  { id: "design", label: "4. Database Design" },
  { id: "rel", label: "5. Relationships" },
  { id: "norm", label: "6. Normalization" },
  { id: "txn", label: "7. Transactions" },
  { id: "idx", label: "8. Indexing" },
  { id: "perf", label: "9. Performance Tuning" },
  { id: "projects", label: "10. Projects" },
  { id: "career", label: "11. Career Preparation" },
  { id: "review", label: "Roadmap Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Frequently Asked Questions", tag: "CS Core", time: "9 min" },
  { title: "DBMS — Tips & Tricks", tag: "CS Core", time: "12 min" },
  { title: "System Design", tag: "CS Core", time: "20 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-learning-roadmap")({
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

function Week({ n, title, tasks }: { n: number; title: string; tasks: string[] }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/50 p-4">
      <p className="font-semibold text-foreground">Week {n} — {title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {tasks.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Learn DBMS in the correct order — no gaps, no leapfrogging.</li>
          <li>Build strong, interview-grade SQL skills.</li>
          <li>Track weekly milestones and self-check progress.</li>
          <li>Ship 4 portfolio-ready database projects.</li>
          <li>Prepare for database-related career paths.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
          caption="Roadmap overview — 12 weeks moving from theory → SQL → design → performance → career."
        />
      </Section>

      <Section id="prereq" title="1. Prerequisites">
        <p>Before starting, you should be comfortable with:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic computer literacy and command line.</li>
          <li>Any one programming language (Python, Java, JS) — helpful, not mandatory.</li>
          <li>Set theory intuition (union, intersection).</li>
        </ul>
        <Callout tone="tip" title="Tooling to install">PostgreSQL 16, DBeaver or pgAdmin, VS Code with the SQLTools extension.</Callout>
      </Section>

      <Section id="fundamentals" title="2. Database Fundamentals — Week 1–2">
        <Week n={1} title="Concepts" tasks={["Read: DBMS vs file systems", "Learn: 3-schema architecture", "Draw: your first ER diagram", "Milestone: install PostgreSQL and connect via DBeaver"]} />
        <Week n={2} title="Data models" tasks={["Relational, hierarchical, NoSQL differences", "Entities, attributes, relationships", "Milestone: model a Library ER diagram (books, members, loans)"]} />
      </Section>

      <Section id="sql" title="3. SQL Basics — Week 3–4">
        <Week n={3} title="DML fundamentals" tasks={["SELECT, WHERE, ORDER BY, LIMIT", "INSERT, UPDATE, DELETE", "Aggregations: COUNT, SUM, AVG, GROUP BY, HAVING", "Milestone: 50 SQL exercises on a sample DB (LeetCode SQL / HackerRank / pgexercises)"]} />
        <Week n={4} title="Joins & subqueries" tasks={["INNER / LEFT / RIGHT / FULL joins", "Correlated subqueries", "CTEs (WITH …)", "Window functions: ROW_NUMBER, RANK, LAG, LEAD"]} />
      </Section>

      <Section id="design" title="4. Database Design — Week 5">
        <Week n={5} title="Schema design" tasks={["Naming conventions, surrogate vs natural keys", "Data types and defaults", "NOT NULL, CHECK, UNIQUE, FK constraints", "Milestone: design schema for an e-commerce site (users, products, orders, line items)"]} />
        <Figure
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80"
          caption="ER model → relational schema → DDL migrations. Design on paper before writing CREATE TABLE."
        />
      </Section>

      <Section id="rel" title="5. Relationships — Week 6">
        <Week n={6} title="Cardinality & integrity" tasks={["1:1, 1:N, M:N with join tables", "ON DELETE CASCADE vs RESTRICT vs SET NULL", "Composite keys in join tables", "Milestone: extend e-commerce schema with reviews, categories, tags"]} />
      </Section>

      <Section id="norm" title="6. Normalization — Week 7">
        <Week n={7} title="Normal forms" tasks={["1NF → 2NF → 3NF → BCNF with examples", "Functional dependencies", "When to denormalize", "Milestone: normalise a messy CSV export to 3NF"]} />
      </Section>

      <Section id="txn" title="7. Transactions — Week 8">
        <Week n={8} title="ACID in practice" tasks={["BEGIN / COMMIT / ROLLBACK / SAVEPOINT", "Isolation levels & anomalies", "Deadlocks and how DBs resolve them", "Milestone: simulate a bank transfer safely under concurrent load"]} />
      </Section>

      <Section id="idx" title="8. Indexing — Week 9">
        <Week n={9} title="B-tree, hash, GIN" tasks={["Single-column vs composite indexes", "Covering indexes and index-only scans", "EXPLAIN / EXPLAIN ANALYZE", "Milestone: take a slow query from 2s to <50ms with the right index"]} />
      </Section>

      <Section id="perf" title="9. Performance Tuning — Week 10">
        <Week n={10} title="Scale reads and writes" tasks={["Query plans, statistics, VACUUM/ANALYZE", "Partitioning strategies", "Read replicas, connection pooling (PgBouncer)", "Introduction to sharding and CAP"]} />
      </Section>

      <Section id="projects" title="10. Projects — Week 11">
        <Week n={11} title="Portfolio builds" tasks={[
          "Project 1: URL shortener — schema, indexes, analytics",
          "Project 2: Blog CMS — auth, roles, RLS, tags",
          "Project 3: Inventory manager — transactions, triggers, audit log",
          "Project 4: Analytics dashboard — window functions, materialized views",
        ]} />
        <Callout tone="tip" title="Push to GitHub">Include README with ER diagram, migrations, seed data, and 3 tuned queries with EXPLAIN plans.</Callout>
      </Section>

      <Section id="career" title="11. Career Preparation — Week 12">
        <Week n={12} title="Interview + certs" tasks={[
          "Grind 60 SQL interview problems (LeetCode Hard SQL, StrataScratch)",
          "Rehearse: normalization, ACID, indexing, N+1, deadlocks",
          "Certifications: Oracle SQL Certified, Microsoft DP-300, PostgreSQL Associate (EDB)",
          "Roles to target: SQL Developer, Data Analyst, Backend Engineer, DBA, Data Engineer",
        ]} />
      </Section>

      <Section id="review" title="Roadmap Review">
        <p><strong>Progress Tracker:</strong> tick each week only when the milestone is committed to GitHub.</p>
        <p><strong>Milestones Checklist:</strong> Library ERD ✅ · 50 SQL drills ✅ · E-commerce schema ✅ · Normalised CSV ✅ · Concurrent bank transfer ✅ · Query tuned &lt;50ms ✅ · 4 portfolio projects ✅.</p>
        <p><strong>Career Suggestions:</strong> pair DBMS with either Backend (Node/Java) or Data (Python + dbt) tracks.</p>
        <p><strong>Next Learning Steps:</strong> Distributed databases, streaming (Kafka + Debezium), warehousing (Snowflake/BigQuery).</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How many hours per week?">6–8 focused hours. Consistency beats sprints.</FAQItem>
        <FAQItem q="Do I need to memorise SQL syntax?">No — memorise the shape (SELECT/FROM/JOIN/WHERE/GROUP/HAVING/ORDER/LIMIT). Details come with practice.</FAQItem>
        <FAQItem q="Should I learn NoSQL alongside?">After you finish this roadmap. Strong SQL fundamentals make NoSQL much easier.</FAQItem>
      </Section>

      <Section id="references" title="References">
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>PostgreSQL Documentation — postgresql.org/docs</li>
            <li>MySQL Reference Manual — dev.mysql.com/doc</li>
            <li>Oracle Learning — education.oracle.com</li>
            <li>Microsoft Learn — SQL Server & Azure SQL</li>
            <li>MongoDB University (for NoSQL comparisons)</li>
            <li>CMU 15-445 Database Systems (open lectures)</li>
            <li>MIT OpenCourseWare 6.830</li>
            <li>Silberschatz — Database System Concepts</li>
            <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          </ul>
        </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted educational
          resources. Database technologies, SQL dialects, and best practices evolve over time — always consult
          official vendor documentation for the latest information. All trademarks, product names, logos, and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
