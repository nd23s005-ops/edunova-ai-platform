import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-step-by-step-learning-guide",
  title: "DBMS — Step-by-Step Learning Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "28 min",
  pages: 36,
  lastUpdated: "January 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&q=80",
  heroSubtitle:
    "An 8-week structured DBMS roadmap — daily study goals, SQL drills, ER exercises, revision checkpoints, a mini project, and portfolio + career prep.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "1. Learning Prerequisites" },
  { id: "w1", label: "2. Week 1 — Fundamentals" },
  { id: "w2", label: "3. Week 2 — SQL Basics" },
  { id: "w3", label: "4. Week 3 — ER Modeling" },
  { id: "w4", label: "5. Week 4 — Database Design" },
  { id: "w5", label: "6. Week 5 — Normalization" },
  { id: "w6", label: "7. Week 6 — Transactions & Concurrency" },
  { id: "w7", label: "8. Week 7 — Indexing & Optimization" },
  { id: "w8", label: "9. Week 8 — Mini Project" },
  { id: "portfolio", label: "10. Portfolio Building" },
  { id: "career", label: "11. Career Preparation" },
  { id: "review", label: "Step-by-Step Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Beginner Guide", tag: "CS Core", time: "13 min" },
  { title: "DBMS — Complete Tutorial", tag: "CS Core", time: "49 min" },
  { title: "DBMS — Practice Questions", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-step-by-step-learning-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-step-by-step-learning-guide" }],
  }),
  component: Page,
});

function Week({ id, title, goals, daily, drills, checkpoint }: { id: string; title: string; goals: string[]; daily: string[]; drills: string[]; checkpoint: string }) {
  return (
    <div id={id} className="rounded-xl border border-border/60 bg-card/40 p-5">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">Weekly goals</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-sm">{goals.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">Daily study</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-sm">{daily.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">SQL / ER drills</p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-sm">{drills.map((g, i) => <li key={i}>{g}</li>)}</ul>
        </div>
      </div>
      <div className="mt-3 rounded border border-primary/40 bg-primary/5 p-2 text-xs">✅ Checkpoint: {checkpoint}</div>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow a week-by-week plan instead of guessing what to learn next.</li>
          <li>Build SQL skills every day through short drills.</li>
          <li>Ship a small portfolio project by week 8.</li>
          <li>Track progress with checkpoints and a self-assessment sheet.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&q=80"
          caption="A steady 8-week runway from fundamentals to a portfolio-ready mini project."
        />
        <Callout tone="tip" title="Time budget">Plan ~6 hours per week — 45 min on weekdays, 90 min on the weekend.</Callout>
      </Section>

      <Section id="prereq" title="1. Learning Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with the command line at a basic level.</li>
          <li>PostgreSQL installed locally (or a free cloud instance).</li>
          <li>A code editor with a SQL client (VS Code + SQLTools, DBeaver).</li>
          <li>The companion resource — “DBMS — Beginner Guide” — read once.</li>
        </ul>
      </Section>

      <Section id="w1" title="Week 1 — Database Fundamentals">
        <Week id="week1" title="Week 1 — Fundamentals"
          goals={["What a DBMS is and why", "Three-schema architecture", "Types of databases"]}
          daily={["Mon: read Ch. 1 of Beginner Guide", "Tue: watch a 20-min DBMS intro", "Wed: install Postgres", "Thu: create your first table", "Fri: recap notes"]}
          drills={["Create db + user", "CREATE TABLE students", "INSERT 5 rows"]}
          checkpoint="Explain relational databases in 60 seconds."
        />
      </Section>

      <Section id="w2" title="Week 2 — SQL Basics">
        <Week id="week2" title="Week 2 — SQL Basics"
          goals={["SELECT, WHERE, ORDER BY", "INSERT, UPDATE, DELETE", "Aggregates & GROUP BY"]}
          daily={["Mon–Fri: 20 min of SQL drills", "Sat: solve 5 problems on a practice site"]}
          drills={["Top N students by grade", "COUNT/SUM/AVG examples", "Filter + sort + paginate"]}
          checkpoint="Write any CRUD statement without looking up syntax."
        />
      </Section>

      <Section id="w3" title="Week 3 — ER Modeling">
        <Week id="week3" title="Week 3 — ER Modeling"
          goals={["Entities, attributes, relationships", "1:1, 1:N, M:N", "Weak entities & participation"]}
          daily={["Sketch one ER diagram per day"]}
          drills={["Library ER", "Ride-sharing ER", "E-commerce ER"]}
          checkpoint="Convert an ER diagram to a schema in 15 minutes."
        />
      </Section>

      <Section id="w4" title="Week 4 — Database Design">
        <Week id="week4" title="Week 4 — Database Design"
          goals={["Choose surrogate vs natural keys", "Design FKs & cascades", "Add constraints (CHECK, UNIQUE)"]}
          daily={["Refactor a spreadsheet into a proper schema"]}
          drills={["Redesign a flat CSV in 3NF", "Add composite unique indexes"]}
          checkpoint="Design + create a 5-table schema with FKs and constraints."
        />
      </Section>

      <Section id="w5" title="Week 5 — Normalization">
        <Week id="week5" title="Week 5 — Normalization"
          goals={["1NF, 2NF, 3NF, BCNF", "Spot dependencies", "Decide when to denormalise"]}
          daily={["Normalize one messy sample per day"]}
          drills={["Split repeating columns", "Break transitive dependencies", "BCNF exercise"]}
          checkpoint="Decompose a table to BCNF and prove lossless join."
        />
      </Section>

      <Section id="w6" title="Week 6 — Transactions & Concurrency">
        <Week id="week6" title="Week 6 — Transactions & Concurrency"
          goals={["ACID + isolation levels", "MVCC & SELECT FOR UPDATE", "Deadlocks & retries"]}
          daily={["Read one anomaly example per day"]}
          drills={["Bank transfer transaction", "Simulate deadlock in two psql sessions"]}
          checkpoint="Explain each isolation level with one anomaly example."
        />
      </Section>

      <Section id="w7" title="Week 7 — Indexing & Optimization">
        <Week id="week7" title="Week 7 — Indexing & Optimization"
          goals={["B-tree, hash, GIN, BRIN", "Read EXPLAIN plans", "Rewrite slow queries"]}
          daily={["Take 1 slow query → tune → measure"]}
          drills={["Add composite index", "Convert OFFSET to keyset", "Remove N+1"]}
          checkpoint="Cut a query from &gt;500 ms to &lt;50 ms and explain why."
        />
      </Section>

      <Section id="w8" title="Week 8 — Mini Project">
        <Week id="week8" title="Week 8 — Mini Project"
          goals={["Ship a small end-to-end DB project", "Write 10 useful queries", "Document design decisions"]}
          daily={["Mon: pick project", "Tue–Wed: schema + seed", "Thu–Fri: queries + views", "Sat: README + diagrams", "Sun: publish"]}
          drills={["Blog Platform", "Movie Rental", "Attendance System"]}
          checkpoint="Working project pushed to GitHub with an ER diagram and README."
        />
      </Section>

      <Section id="portfolio" title="10. Portfolio Building">
        <ul className="list-disc space-y-1 pl-5">
          <li>GitHub repo with SQL migrations, seed data, ER diagram (PNG + source).</li>
          <li>README explaining schema decisions, indexes, and trade-offs.</li>
          <li>“What I would do next” section — replication, partitioning, RLS.</li>
          <li>Short video walkthrough (3 min).</li>
          <li>Blog post reflecting on lessons learnt.</li>
        </ul>
      </Section>

      <Section id="career" title="11. Career Preparation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Resume: quantify with numbers ("cut query time by 90%").</li>
          <li>Practice 25 SQL screens on LeetCode SQL 50 + StrataScratch.</li>
          <li>Practice one live design round per week with a peer.</li>
          <li>Consider certifications: Oracle OCA, MS DP-300, MongoDB Associate.</li>
          <li>Follow release notes for the DB you use most.</li>
        </ul>
      </Section>

      <Section id="review" title="Step-by-Step Review">
        <Callout tone="tip" title="Weekly Progress Tracker">
          Every Sunday: tick weekly goals, log study hours, record one topic to revisit next week.
        </Callout>
        <p><strong>Learning milestones:</strong> W2 SQL fluent · W4 schema literate · W6 transaction confident · W8 shippable project.</p>
        <p><strong>Readiness checklist:</strong> can you design + query + tune a small database in a live interview?</p>
        <p><strong>Next learning path:</strong> distributed systems, NoSQL, or data engineering (dbt + Snowflake / BigQuery).</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I do this in 4 weeks?">Compress by doubling daily hours; skip only the portfolio polish week.</FAQItem>
        <FAQItem q="Do I need to memorise SQL syntax?">Fluency &gt; memorisation. Do drills daily and syntax sticks.</FAQItem>
        <FAQItem q="Which cloud DB is best for practice?">Any managed Postgres — Neon, Supabase, or Render's free tier work well.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite documentation</li>
          <li>Oracle Learning, Microsoft Learn, PostgreSQL Wiki</li>
          <li>Silberschatz, Korth & Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>MIT OCW 6.830, CMU 15-445, Stanford CS245</li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted educational
          resources. Database technologies, SQL standards, and vendor implementations evolve continuously —
          consult official vendor documentation for the latest information. All trademarks, product names,
          logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
