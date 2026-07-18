import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-beginner-guide",
  title: "DBMS — Beginner Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "13 min",
  pages: 15,
  lastUpdated: "March 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1800&q=80",
  heroSubtitle:
    "A friendly first look at databases — with everyday analogies, tiny SQL peeks, mini quizzes, and zero prerequisites.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "what", label: "1. What is DBMS?" },
  { id: "why", label: "2. Why We Need Databases" },
  { id: "evo", label: "3. Evolution of Databases" },
  { id: "types", label: "4. Types of Databases" },
  { id: "components", label: "5. Components of DBMS" },
  { id: "models", label: "6. Data Models" },
  { id: "rel", label: "7. Relational Databases" },
  { id: "sql", label: "8. Introduction to SQL" },
  { id: "apps", label: "9. Database Applications" },
  { id: "hands", label: "10. First Hands-on Exercises" },
  { id: "mistakes", label: "11. Beginner Mistakes" },
  { id: "summary", label: "12. Summary" },
  { id: "review", label: "Beginner Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Complete Tutorial", tag: "CS Core", time: "49 min" },
  { title: "DBMS — Step-by-Step Learning Guide", tag: "CS Core", time: "28 min" },
  { title: "DBMS — Practice Questions", tag: "CS Core", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-beginner-guide" }],
  }),
  component: Page,
});

function Quiz({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-lg border border-border/60 bg-card/40 p-3 text-sm">
      <summary className="cursor-pointer font-medium">🧠 Quick check — {q}</summary>
      <p className="mt-2 text-muted-foreground">{a}</p>
    </details>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain what a database is in one sentence.</li>
          <li>Know why apps use databases instead of files or spreadsheets.</li>
          <li>Recognise the four common database types.</li>
          <li>Read your very first SQL statement without fear.</li>
          <li>Feel ready for the Complete Tutorial.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1600&q=80"
          caption="A database is just an organised warehouse for data — with rules that keep it clean."
        />
      </Section>

      <Section id="what" title="1. What is DBMS?">
        <p>A <strong>Database</strong> is an organised collection of related data. A <strong>Database Management System (DBMS)</strong> is the software that lets you store, find, change, and protect that data — think of it as the librarian in front of a giant, well-labelled bookshelf.</p>
        <Callout tone="tip" title="Everyday analogy">A spreadsheet is a filing cabinet you manage yourself. A DBMS is a filing cabinet with a librarian, a security guard, and an audit trail — all built-in.</Callout>
        <Quiz q="Is Excel a DBMS?" a="Not really. Excel stores data but doesn't enforce types, relationships, transactions, or multi-user editing safely." />
      </Section>

      <Section id="why" title="2. Why We Need Databases">
        <p>Imagine an online store keeping every order in a text file. Two customers checkout at the same time — who wins? A database solves this with:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Concurrency</strong> — safe simultaneous access by many users.</li>
          <li><strong>Consistency</strong> — data rules always hold, even on crashes.</li>
          <li><strong>Durability</strong> — data survives power loss.</li>
          <li><strong>Query power</strong> — ask questions in SQL rather than scanning files.</li>
          <li><strong>Security</strong> — users only see what they are allowed to.</li>
        </ul>
      </Section>

      <Section id="evo" title="3. Evolution of Databases">
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>1960s</strong> — Flat files and hierarchical systems (IBM IMS).</li>
          <li><strong>1970s</strong> — Codd's relational model at IBM Research.</li>
          <li><strong>1980s–90s</strong> — SQL becomes the standard (Oracle, DB2, SQL Server).</li>
          <li><strong>2000s</strong> — Open-source boom (MySQL, PostgreSQL).</li>
          <li><strong>2010s</strong> — NoSQL for the web (MongoDB, Cassandra, Redis).</li>
          <li><strong>2020s</strong> — Serverless, cloud-native, and vector databases for AI.</li>
        </ol>
      </Section>

      <Section id="types" title="4. Types of Databases">
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-3 py-2">Type</th><th className="px-3 py-2">Example</th><th className="px-3 py-2">Best for</th></tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Relational</td><td className="px-3 py-2">PostgreSQL, MySQL</td><td className="px-3 py-2">Structured, transactional apps</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Document</td><td className="px-3 py-2">MongoDB</td><td className="px-3 py-2">Flexible JSON-like data</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Key-value</td><td className="px-3 py-2">Redis</td><td className="px-3 py-2">Fast caches, sessions</td></tr>
              <tr className="border-b border-border/50"><td className="px-3 py-2">Graph</td><td className="px-3 py-2">Neo4j</td><td className="px-3 py-2">Social networks, recommendations</td></tr>
              <tr><td className="px-3 py-2">Vector</td><td className="px-3 py-2">pgvector, Pinecone</td><td className="px-3 py-2">Semantic search for AI</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="components" title="5. Components of DBMS">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Storage engine</strong> — writes and reads pages on disk.</li>
          <li><strong>Query processor</strong> — parses and plans SQL.</li>
          <li><strong>Transaction manager</strong> — enforces ACID.</li>
          <li><strong>Buffer manager</strong> — caches hot pages in memory.</li>
          <li><strong>Catalog</strong> — the database's own diary about tables, columns, indexes.</li>
        </ul>
      </Section>

      <Section id="models" title="6. Data Models">
        <p>A data model is the shape you give your data. Beginners meet three:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Relational</strong> — rows and columns; the default.</li>
          <li><strong>Document</strong> — nested JSON records.</li>
          <li><strong>Graph</strong> — nodes and edges (friends, follows, likes).</li>
        </ul>
      </Section>

      <Section id="rel" title="7. Relational Databases">
        <p>Data lives in <em>tables</em>. Each table has <em>columns</em> (schema) and <em>rows</em> (data). A <strong>primary key</strong> uniquely identifies a row; a <strong>foreign key</strong> points at another table.</p>
        <Figure
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
          caption="Tables + keys + relationships = the relational model."
        />
        <Callout tone="note" title="Simple ER example">Students *—* Courses via an Enrollment table. Enrollment has student_id and course_id as foreign keys.</Callout>
      </Section>

      <Section id="sql" title="8. Introduction to SQL">
        <p>SQL is the language you use to talk to a relational database. You will meet three verbs first:</p>
        <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">{`-- read
SELECT name, email FROM users WHERE age >= 18;

-- create
INSERT INTO users (name, email) VALUES ('Ada', 'ada@x.com');

-- update
UPDATE users SET email = 'ada@new.com' WHERE id = 1;`}</pre>
        <Quiz q="What does SELECT * do?" a="It returns every column. Handy while learning; avoid in production because it hides intent." />
      </Section>

      <Section id="apps" title="9. Database Applications">
        <ul className="list-disc space-y-1 pl-5">
          <li>Banking — accounts, transactions.</li>
          <li>E-commerce — products, carts, orders.</li>
          <li>Healthcare — patients, appointments, records.</li>
          <li>Education — students, courses, grades.</li>
          <li>Social media — profiles, posts, follows.</li>
        </ul>
      </Section>

      <Section id="hands" title="10. First Hands-on Exercises">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>Install PostgreSQL locally OR create a free cloud database.</li>
          <li>Create a <code>students(id, name, grade)</code> table.</li>
          <li>Insert 5 students.</li>
          <li>SELECT students whose grade is 10.</li>
          <li>UPDATE one student's grade and observe the change.</li>
        </ol>
      </Section>

      <Section id="mistakes" title="11. Beginner Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Forgetting a <code>WHERE</code> on UPDATE/DELETE — you just changed every row.</li>
          <li>Treating NULL as an equal value — use <code>IS NULL</code>.</li>
          <li>Storing dates as text.</li>
          <li>Never learning about primary keys.</li>
          <li>Copy-pasting SQL from the internet without reading it.</li>
        </ul>
      </Section>

      <Section id="summary" title="12. Summary">
        <p>Databases give apps memory. A DBMS makes that memory reliable, shareable, and queryable. You have met the relational model, the SQL basics, and the everyday shape of data — plenty to launch into a full tutorial next.</p>
      </Section>

      <Section id="review" title="Beginner Review">
        <p><strong>Key takeaways:</strong> databases &gt; files · relational is the default · SQL has three friendly verbs · always use a WHERE.</p>
        <p><strong>Self assessment:</strong> can you explain a database to a friend in 30 seconds?</p>
        <p><strong>Practice questions:</strong></p>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Name three problems databases solve that files can't.</li>
          <li>What is a primary key?</li>
          <li>Write a SELECT that returns all books published after 2020.</li>
        </ol>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Table</strong> — a named set of rows and columns.</li>
          <li><strong>Row</strong> — one record.</li>
          <li><strong>Column</strong> — one field with a type.</li>
          <li><strong>Primary key</strong> — unique identifier per row.</li>
          <li><strong>Query</strong> — a question you ask the database using SQL.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which database should I install first?">PostgreSQL — free, standard-compliant, powers half the internet.</FAQItem>
        <FAQItem q="Do I need to memorise SQL?">No. Learn the verbs and let syntax habits build with practice.</FAQItem>
        <FAQItem q="What's next?">Move to “DBMS — Complete Tutorial” or follow the 8-week roadmap.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite, MariaDB, IBM Db2 documentation</li>
          <li>Silberschatz, Korth & Sudarshan — Database System Concepts</li>
          <li>Elmasri & Navathe — Fundamentals of Database Systems</li>
          <li>MIT OpenCourseWare, Stanford CS145, CMU 15-445</li>
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
