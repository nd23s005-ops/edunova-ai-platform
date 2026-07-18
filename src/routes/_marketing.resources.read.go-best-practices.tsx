import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-best-practices",
  title: "Go — Best Practices",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "17 min",
  pages: 18,
  lastUpdated: "March 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "A professional handbook on Go coding standards, concurrency, testing, security, performance, deployment, and production-ready engineering workflows.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Coding Standards" },
  { id: "s2", label: "2. Project Structure" },
  { id: "s3", label: "3. Package Organization" },
  { id: "s4", label: "4. Error Handling" },
  { id: "s5", label: "5. Concurrency" },
  { id: "s6", label: "6. Testing" },
  { id: "s7", label: "7. Logging" },
  { id: "s8", label: "8. Monitoring" },
  { id: "s9", label: "9. Security" },
  { id: "s10", label: "10. Performance" },
  { id: "s11", label: "11. Deployment" },
  { id: "s12", label: "12. Documentation" },
  { id: "s13", label: "13. Production Checklist" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Common Mistakes", tag: "Programming", time: "13 min" },
  { title: "Go — Advanced Concepts", tag: "Programming", time: "25 min" },
  { title: "Go — Project Guide", tag: "Programming", time: "17 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-best-practices" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Write idiomatic Go that reviewers approve on first pass.</li>
          <li>Structure projects for growth and long-term maintainability.</li>
          <li>Ship code that's observable, secure, and easy to operate.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Coding Standards">
        <ul className="list-disc space-y-1 pl-5">
          <li>gofmt / goimports on save — non-negotiable.</li>
          <li>Short names in small scope; descriptive names in package APIs.</li>
          <li>Accept interfaces, return concrete types.</li>
          <li>No stutter: <code>http.Request</code>, not <code>http.HTTPRequest</code>.</li>
        </ul>
      </Section>

      <Section id="s2" title="2. Project Structure">
        <Code lang="text">{`cmd/         # main packages (one per binary)
internal/    # private code
pkg/         # exportable libraries
migrations/
deploy/`}</Code>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Standard Go project layout used across the community." />
      </Section>

      <Section id="s3" title="3. Package Organization">
        <p>Package by capability, not by kind. Prefer <code>billing/</code> over <code>models/</code>, <code>controllers/</code>, <code>services/</code>.</p>
      </Section>

      <Section id="s4" title="4. Error Handling">
        <p>Wrap with <code>%w</code>, inspect with <code>errors.Is</code> / <code>errors.As</code>. Never swallow. Distinguish expected errors from bugs.</p>
        <Code lang="go">{`if err != nil {
    return fmt.Errorf("fetch user %s: %w", id, err)
}`}</Code>
      </Section>

      <Section id="s5" title="5. Concurrency">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every goroutine has a documented owner and lifetime.</li>
          <li>Pass <code>context.Context</code> as the first parameter.</li>
          <li>Bound fan-out with worker pools or <code>errgroup.SetLimit</code>.</li>
          <li>Prefer channels for ownership transfer; mutexes for shared state.</li>
        </ul>
        <Callout tone="warning" title="Rule">Don't communicate by sharing memory; share memory by communicating.</Callout>
      </Section>

      <Section id="s6" title="6. Testing">
        <p>Table-driven tests, real Postgres in Docker for integration, <code>-race</code> always in CI. Property-based tests via <code>rapid</code> for pure functions.</p>
      </Section>

      <Section id="s7" title="7. Logging">
        <p>Structured JSON via <code>log/slog</code>. Log at boundaries — handler entry/exit, external calls. Never log secrets or PII.</p>
      </Section>

      <Section id="s8" title="8. Monitoring">
        <p>Prometheus RED metrics, OpenTelemetry traces, health/readiness probes. Alert on SLO burn, not raw thresholds.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Observability stack: metrics for trends, traces for causality, logs for context." />
      </Section>

      <Section id="s9" title="9. Security">
        <ul className="list-disc space-y-1 pl-5">
          <li>Input validation on every boundary.</li>
          <li>Parameterised SQL — never string concatenation.</li>
          <li>Secrets from vault, not env files in the repo.</li>
          <li><code>govulncheck</code> in CI.</li>
        </ul>
      </Section>

      <Section id="s10" title="10. Performance">
        <p>Profile before optimizing (<code>pprof</code>, <code>trace</code>). Reduce allocations on hot paths. Use <code>sync.Pool</code> judiciously.</p>
      </Section>

      <Section id="s11" title="11. Deployment">
        <p>Distroless images, static binaries, health probes, graceful shutdown on SIGTERM, rolling deploys with automated rollback.</p>
      </Section>

      <Section id="s12" title="12. Documentation">
        <p>Every exported identifier has a doc comment starting with its name. README, ARCHITECTURE.md, ADRs for major decisions.</p>
      </Section>

      <Section id="s13" title="13. Production Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>✅ CI green with <code>-race</code>, <code>govulncheck</code>, and coverage gate.</li>
          <li>✅ Metrics, logs, traces wired in staging.</li>
          <li>✅ Graceful shutdown &amp; readiness probes.</li>
          <li>✅ Runbook for top 5 alerts.</li>
          <li>✅ Load-tested at 2× peak.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Idiomatic Go is small, boring, and observable. Consistency across the team compounds — pick standards, encode them in linters, and enforce them in CI.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which linter?">golangci-lint with a curated set (govet, staticcheck, errcheck, gosec, revive).</FAQItem>
        <FAQItem q="Panics allowed?">Only in <code>main</code> for unrecoverable startup errors. Never as flow control.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>ADR</strong> — Architecture Decision Record.</li>
          <li><strong>SLO</strong> — Service Level Objective.</li>
          <li><strong>pprof</strong> — Go's built-in profiler.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Adapt practices to your context and constraints. Trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
