import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dbms-project-guide",
  title: "DBMS — Project Guide",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "22 min",
  pages: 25,
  lastUpdated: "March 2026",
  tags: ["DBMS", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=80",
  heroSubtitle:
    "A professional SDLC playbook — plan, design, normalize, implement, test, tune, secure, deploy, and document a portfolio-grade database project end-to-end.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Project Overview" },
  { id: "c2", label: "2. Problem Statement" },
  { id: "c3", label: "3. Requirements Gathering" },
  { id: "c4", label: "4. ER Modeling" },
  { id: "c5", label: "5. Database Schema Design" },
  { id: "c6", label: "6. Normalization" },
  { id: "c7", label: "7. SQL Development" },
  { id: "c8", label: "8. Testing" },
  { id: "c9", label: "9. Performance Optimization" },
  { id: "c10", label: "10. Security" },
  { id: "c11", label: "11. Deployment" },
  { id: "c12", label: "12. Documentation" },
  { id: "c13", label: "13. Future Improvements" },
  { id: "review", label: "Project Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "DBMS — Project Case Study", tag: "CS Core", time: "30 min" },
  { title: "DBMS — Sample Exercises", tag: "CS Core", time: "25 min" },
  { title: "DBMS — Complete Tutorial", tag: "CS Core", time: "49 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dbms-project-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dbms-project-guide" }],
  }),
  component: Page,
});

function Code({ children }: { children: string }) {
  return <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs leading-relaxed"><code>{children}</code></pre>;
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Run a database project through a professional SDLC.</li>
          <li>Translate business requirements into a normalized schema.</li>
          <li>Ship migrations, seed data, tests, and monitoring.</li>
          <li>Document decisions well enough that a new engineer can onboard in a day.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
          caption="Database SDLC — plan → model → design → build → test → tune → deploy → operate."
        />
        <Callout tone="tip" title="Reference project">Every step in this guide is illustrated with a running example — “NovaLibrary”, a multi-branch library management system.</Callout>
      </Section>

      <Section id="c1" title="1. Project Overview">
        <p>NovaLibrary must manage books, members, loans, reservations, fines, and branch inventory for a mid-sized library network. Users: librarians, members, and administrators. Non-functional targets: 99.9% availability, 200 ms P95 read latency, daily backups.</p>
      </Section>

      <Section id="c2" title="2. Problem Statement">
        <p>The current spreadsheet-based system loses updates during peak hours, cannot reserve books across branches, and lacks an audit trail. Replace it with a relational database and a thin admin app; keep the domain simple, correctness first, scale second.</p>
      </Section>

      <Section id="c3" title="3. Requirements Gathering">
        <p><strong>Functional</strong> — check-in, check-out, reserve, transfer between branches, compute fines, generate monthly reports. <strong>Non-functional</strong> — role-based access, audit log, ACID, PITR, exportable data. Capture requirements as user stories with acceptance criteria; version them in the repo.</p>
      </Section>

      <Section id="c4" title="4. ER Modeling">
        <p>Core entities: <em>Member, Book, Copy, Branch, Loan, Reservation, Fine, Staff</em>. Relationships: <em>Copy N:1 Book</em>, <em>Copy N:1 Branch</em>, <em>Loan M:N Member ↔ Copy</em>. Deliverables: entity list, attribute list, cardinality matrix, ER diagram (Mermaid + PNG export in <code>/docs</code>).</p>
      </Section>

      <Section id="c5" title="5. Database Schema Design">
        <p>Convert the ER diagram to a schema. Use surrogate BIGINT primary keys, TIMESTAMPTZ for time, NUMERIC(10,2) for fines, ENUM/lookup tables for loan_status.</p>
        <Code>{`CREATE TABLE members (
  id           BIGSERIAL PRIMARY KEY,
  full_name    TEXT NOT NULL,
  email        CITEXT UNIQUE NOT NULL,
  joined_at    TIMESTAMPTZ DEFAULT now(),
  status       TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE loans (
  id           BIGSERIAL PRIMARY KEY,
  copy_id      BIGINT NOT NULL REFERENCES copies(id),
  member_id    BIGINT NOT NULL REFERENCES members(id),
  loaned_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  due_at       TIMESTAMPTZ NOT NULL,
  returned_at  TIMESTAMPTZ,
  fine         NUMERIC(10,2) DEFAULT 0
);`}</Code>
      </Section>

      <Section id="c6" title="6. Normalization">
        <p>Verify 3NF. Split off <code>book_authors</code> (M:N), extract <code>publishers</code> and <code>categories</code> to remove transitive dependencies, and confirm BCNF where determinants exist.</p>
      </Section>

      <Section id="c7" title="7. SQL Development">
        <p>Structure the repo:</p>
        <Code>{`novalibrary/
├── db/
│   ├── migrations/     -- flyway / sqlx / prisma
│   ├── seeds/
│   ├── queries/        -- named .sql files
│   └── procedures/
├── docs/
│   ├── er-diagram.png
│   └── decisions/      -- ADRs
└── tests/`}</Code>
        <p>Every migration is reversible (<code>up.sql</code> + <code>down.sql</code>). Named queries live under <code>queries/</code> and are code-reviewed like source code.</p>
      </Section>

      <Section id="c8" title="8. Testing">
        <p><strong>Unit</strong> — pgTAP or SQLTest for functions and triggers. <strong>Integration</strong> — spin up a disposable Postgres via Docker; run seed + query. <strong>Property</strong> — invariants (loans.returned_at &gt;= loans.loaned_at). Fail CI on schema drift.</p>
      </Section>

      <Section id="c9" title="9. Performance Optimization">
        <p>Index every foreign key. Add composite indexes to match top queries. Use <code>EXPLAIN (ANALYZE, BUFFERS)</code> for the 10 hottest queries and record baselines. Add <code>pg_stat_statements</code> and alert on regressions.</p>
      </Section>

      <Section id="c10" title="10. Security">
        <ul className="list-disc space-y-1 pl-5">
          <li>Least-privilege roles: <code>app_user</code>, <code>reporter</code>, <code>admin</code>.</li>
          <li>Row-level security so members read only their own loans.</li>
          <li>Encryption at rest (managed provider) and TLS on the wire.</li>
          <li>Secrets in a vault; never in the repo.</li>
          <li>SQL only via parameterised queries — no string concatenation.</li>
        </ul>
      </Section>

      <Section id="c11" title="11. Deployment">
        <p>Environments: local · staging · production. Deploy schema changes via CI, gated by a manual approval on production. Use blue/green for zero downtime; run migrations backwards-compatible for one release before dropping columns.</p>
      </Section>

      <Section id="c12" title="12. Documentation">
        <p>Every non-trivial decision goes into an ADR (Architecture Decision Record). Publish an ER diagram, data dictionary, backup runbook, and on-call playbook. The README should let a new engineer clone → seed → run tests in under 10 minutes.</p>
      </Section>

      <Section id="c13" title="13. Future Improvements">
        <p>Add full-text search on titles/authors, expose a public API for member self-service, introduce read replicas for reporting, and evaluate a search engine (OpenSearch) if the catalog grows past a million rows.</p>
      </Section>

      <Section id="review" title="Project Review">
        <p><strong>Milestone tracker:</strong> requirements → ER → schema → migrations → queries → tests → deploy → monitor.</p>
        <p><strong>Risk assessment:</strong> data loss (backups), noisy neighbours (connection cap), long transactions (statement_timeout), migration failure (blue/green + rollback).</p>
        <p><strong>Delivery checklist:</strong> migrations reversible · tests green · docs complete · runbook posted · dashboards live.</p>
        <p><strong>Final review checklist:</strong> can a new engineer restore the DB from backup, run tests, and deploy — using only the docs?</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which database should I use for the project?">PostgreSQL — free, standard-compliant, great tooling, easily portable to managed services.</FAQItem>
        <FAQItem q="How big should the seed data be?">Enough to make queries realistic (5k–50k rows) — never load millions until you profile.</FAQItem>
        <FAQItem q="Do I need CI from day one?">Yes. Even a two-person team benefits from automated tests on every migration.</FAQItem>
      </Section>

      <Section id="references" title="References">
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>PostgreSQL, MySQL, Oracle, SQL Server, SQLite, MariaDB, IBM Db2 documentation</li>
          <li>Oracle Learning, Microsoft Learn, PostgreSQL Wiki</li>
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
