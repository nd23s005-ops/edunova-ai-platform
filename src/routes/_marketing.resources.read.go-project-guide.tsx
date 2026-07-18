import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-project-guide",
  title: "Go — Project Guide",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "17 min",
  pages: 17,
  lastUpdated: "January 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A production-ready blueprint for building Go backends — planning, folder structure, architecture, APIs, database, testing, deployment, and monitoring.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Requirement Gathering" },
  { id: "s2", label: "2. Project Planning" },
  { id: "s3", label: "3. Folder Structure" },
  { id: "s4", label: "4. Architecture" },
  { id: "s5", label: "5. Database Design" },
  { id: "s6", label: "6. REST APIs" },
  { id: "s7", label: "7. Authentication" },
  { id: "s8", label: "8. Testing" },
  { id: "s9", label: "9. Deployment" },
  { id: "s10", label: "10. Monitoring" },
  { id: "s11", label: "11. Documentation" },
  { id: "review", label: "Project Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Project Case Study", tag: "Programming", time: "24 min" },
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
  { title: "Go — Best Practices", tag: "Programming", time: "15 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-project-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-project-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Plan and scaffold a production Go project from scratch.</li>
          <li>Choose an architecture that scales with the team.</li>
          <li>Ship a REST API with tests, CI/CD, and observability.</li>
          <li>Document decisions so newcomers ramp up quickly.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Requirement Gathering">
        <p>Before writing any code, capture: users, jobs-to-be-done, SLA targets, integration points, and constraints (budget, compliance, timeline).</p>
        <Callout tone="info" title="Rule of thumb">Write a one-page brief a stakeholder can read in 3 minutes — if they can't, refine it.</Callout>
      </Section>

      <Section id="s2" title="2. Project Planning">
        <p>Break the work into 2-week milestones, each ending with a demoable artefact. Track risks alongside tasks.</p>
      </Section>

      <Section id="s3" title="3. Folder Structure">
        <Code lang="text">{`myapp/
├── cmd/
│   └── api/           # main package
├── internal/
│   ├── config/
│   ├── http/          # handlers, middleware
│   ├── service/       # business logic
│   ├── repo/          # data access
│   └── domain/        # entities & interfaces
├── pkg/               # exportable libraries
├── migrations/
├── deploy/            # Dockerfiles, k8s manifests
└── go.mod`}</Code>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — A layout that scales: main binaries in cmd/, private code in internal/, reusable libs in pkg/." />
      </Section>

      <Section id="s4" title="4. Architecture">
        <p>Choose the smallest architecture that solves the problem: monolith → modular monolith → microservices. Add layers only under pressure (traffic, team growth, compliance).</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Layer</th><th className="p-2 text-left">Responsibility</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">HTTP</td><td className="p-2">Parse request, call service, write response</td></tr>
            <tr className="border-b"><td className="p-2">Service</td><td className="p-2">Business logic, transactions</td></tr>
            <tr className="border-b"><td className="p-2">Repo</td><td className="p-2">Persistence, queries</td></tr>
            <tr><td className="p-2">Domain</td><td className="p-2">Entities, interfaces</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s5" title="5. Database Design">
        <p>Normalise first, denormalise under measured pressure. Use migrations (golang-migrate, goose) checked into Git. Prefer <code>pgx</code> over <code>lib/pq</code>.</p>
      </Section>

      <Section id="s6" title="6. REST APIs">
        <p>Version at the path (<code>/v1/…</code>). Consistent error envelope. Idempotency keys for POST retries. OpenAPI spec generated or hand-written.</p>
      </Section>

      <Section id="s7" title="7. Authentication">
        <p>Prefer OIDC/JWT with short-lived access tokens and refresh rotation. Store secrets in a vault; never in the repo. Rate-limit auth endpoints separately.</p>
      </Section>

      <Section id="s8" title="8. Testing">
        <p>Pyramid: many unit tests, some integration tests against real Postgres in Docker, a handful of end-to-end smoke tests. Race detector in CI, always.</p>
      </Section>

      <Section id="s9" title="9. Deployment">
        <Code lang="yaml">{`# GitHub Actions extract
- run: go test ./... -race
- run: docker build -t $IMG .
- run: docker push $IMG
- run: kubectl set image deploy/api api=$IMG`}</Code>
      </Section>

      <Section id="s10" title="10. Monitoring">
        <p>Emit Prometheus metrics (RED: rate, errors, duration), structured JSON logs, and OpenTelemetry traces. Alert on SLO burn rate, not raw thresholds.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Observability triangle: metrics for trends, logs for context, traces for causality." />
      </Section>

      <Section id="s11" title="11. Documentation">
        <p>README with quickstart, ARCHITECTURE.md with diagrams, ADRs for major decisions, runbooks for on-call. Update docs in the same PR as code.</p>
      </Section>

      <Section id="review" title="Project Review">
        <h3 className="font-semibold">Milestone Tracker</h3>
        <p>Review demoable output at end of each sprint. If nothing runs, the plan is off — replan, don't push.</p>
        <h3 className="mt-3 font-semibold">Project Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>✅ CI green with race detector.</li>
          <li>✅ Migrations reproducible from scratch.</li>
          <li>✅ Observability dashboards live before launch.</li>
          <li>✅ On-call runbook exists.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Risk Assessment</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Risk</th><th className="p-2 text-left">Mitigation</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Scope creep</td><td className="p-2">Freeze scope per sprint</td></tr>
            <tr className="border-b"><td className="p-2">DB lock-in</td><td className="p-2">Repository interface</td></tr>
            <tr><td className="p-2">Auth compromise</td><td className="p-2">Short-lived tokens + rotation</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Monolith or microservices?">Start with a modular monolith; split only under proven scaling or team pressure.</FAQItem>
        <FAQItem q="Which router?">Standard mux (Go 1.22+) or chi are excellent defaults.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>ADR</strong> — Architecture Decision Record.</li>
          <li><strong>SLO</strong> — Service Level Objective (e.g. 99.9% availability).</li>
          <li><strong>Runbook</strong> — step-by-step guide for handling incidents.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Guidance for educational use — adapt to your team, tools, and compliance requirements.
          Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
