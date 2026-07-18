import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-project-case-study",
  title: "Go — Project Case Study",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "24 min",
  pages: 32,
  lastUpdated: "August 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "How a Go team built NovaOrders — a production-scale order backend — covering architecture, concurrency, deployment, performance, and lessons learned.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Company Background" },
  { id: "s2", label: "2. Requirements" },
  { id: "s3", label: "3. High-Level Architecture" },
  { id: "s4", label: "4. Low-Level Architecture" },
  { id: "s5", label: "5. API Design" },
  { id: "s6", label: "6. Database" },
  { id: "s7", label: "7. Goroutines" },
  { id: "s8", label: "8. Channels" },
  { id: "s9", label: "9. Deployment" },
  { id: "s10", label: "10. Monitoring" },
  { id: "s11", label: "11. Lessons Learned" },
  { id: "review", label: "Case Study Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Project Guide", tag: "Programming", time: "17 min" },
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
  { title: "Go — Interview Questions", tag: "Programming", time: "26 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-project-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Study a realistic Go backend from requirements to production.</li>
          <li>Understand architecture trade-offs at scale.</li>
          <li>See how concurrency primitives are applied on real hot paths.</li>
          <li>Learn what went wrong and how the team recovered.</li>
        </ul>
        <Callout tone="info" title="About NovaOrders">A fictional but realistic composite of common e-commerce order services; details generalise to most transactional backends.</Callout>
      </Section>

      <Section id="s1" title="1. Company Background">
        <p>NovaMart is a mid-sized retailer processing 8M orders/month across web, iOS, and Android. The order backend is a Go service owned by a 6-engineer team.</p>
      </Section>

      <Section id="s2" title="2. Requirements">
        <ul className="list-disc space-y-1 pl-5">
          <li>p99 API latency &lt; 200 ms.</li>
          <li>99.95% availability.</li>
          <li>Idempotent order placement (POST).</li>
          <li>Support 3× peak surges during flash sales.</li>
          <li>PII encrypted at rest and in transit.</li>
        </ul>
      </Section>

      <Section id="s3" title="3. High-Level Architecture">
        <p>Client → CDN → API gateway → NovaOrders (Go) → Postgres + Redis + Kafka. Async workers consume Kafka to update inventory and dispatch emails.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — High-level architecture: synchronous API for the checkout path, async workers for downstream side-effects." />
      </Section>

      <Section id="s4" title="4. Low-Level Architecture">
        <p>Layered inside the service: HTTP handlers → orchestrator → domain services → repositories. Cross-cutting: auth middleware, tracing, structured logging.</p>
      </Section>

      <Section id="s5" title="5. API Design">
        <Code lang="text">{`POST /v1/orders           # place (idempotency key required)
GET  /v1/orders/{id}      # fetch
POST /v1/orders/{id}/cancel
GET  /v1/users/me/orders  # list`}</Code>
      </Section>

      <Section id="s6" title="6. Database">
        <p>Postgres with logical replicas for analytics. Orders and order_items partitioned by month. Indexes on (user_id, created_at) and (status) for hot queries.</p>
      </Section>

      <Section id="s7" title="7. Goroutines">
        <p>Each incoming request spawns bounded goroutines for fan-out enrichment (inventory check, fraud score, promo lookup) with a shared <code>context.Context</code> deadline.</p>
        <Code lang="go">{`g, gctx := errgroup.WithContext(ctx)
g.Go(func() error { return checkInventory(gctx, order) })
g.Go(func() error { return scoreFraud(gctx, order) })
g.Go(func() error { return applyPromo(gctx, order) })
if err := g.Wait(); err != nil { return err }`}</Code>
      </Section>

      <Section id="s8" title="8. Channels">
        <p>An in-process buffered channel decouples the HTTP handler from the Kafka producer. Backpressure trips a circuit breaker if publish latency exceeds 50 ms for 30 s.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Goroutine execution flow: fan-out enrichment, coordinated via errgroup and context deadlines." />
      </Section>

      <Section id="s9" title="9. Deployment">
        <p>Distroless container images, 3 replicas per zone across 2 zones. Rolling deploys with readiness probes. Feature flags via <em>launchdarkly</em> for risky changes.</p>
      </Section>

      <Section id="s10" title="10. Monitoring">
        <p>SLO dashboards: availability, p50/p95/p99 latency, error rate by handler. Alerts on 2%/1h burn or 5%/6h burn. Traces sampled at 1% baseline, 100% on errors.</p>
      </Section>

      <Section id="s11" title="11. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Idempotency keys</strong> saved us on the first flash sale — clients retried aggressively.</li>
          <li><strong>Unbounded goroutines</strong> caused a memory scare; every launch now goes through a worker pool.</li>
          <li><strong>Postgres connection limits</strong> hit before CPU — right-size the pool per replica.</li>
          <li><strong>Structured logs</strong> paid for themselves — grepping JSON scaled with the team.</li>
        </ul>
      </Section>

      <Section id="review" title="Case Study Review">
        <h3 className="font-semibold">Architecture Evaluation</h3>
        <p>Simple, testable, and observable — deliberately boring. Complexity added only where measured.</p>
        <h3 className="mt-3 font-semibold">Engineering Insights</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Deadlines everywhere; timeouts are a design tool.</li>
          <li>Errgroup &gt; raw goroutines for coordinated fan-out.</li>
          <li>Kafka decouples the sync path from side-effects.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Discussion Questions</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Where would you split NovaOrders if the team grew to 20 engineers?</li>
          <li>Which failure mode is under-tested here?</li>
          <li>What SLI would you add for downstream inventory latency?</li>
        </ol>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this a real company?">A composite based on public architecture talks. Numbers are illustrative.</FAQItem>
        <FAQItem q="Could this be simpler?">Yes — start smaller. NovaMart's design earned its complexity over 3 years.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>errgroup</strong> — <code>golang.org/x/sync/errgroup</code>, structured fan-out with error propagation.</li>
          <li><strong>SLI / SLO</strong> — Service Level Indicator / Objective.</li>
          <li><strong>Idempotency key</strong> — client-provided token making a POST safe to retry.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Fictional case study for educational purposes. Do not treat as prescriptive advice for
          any specific business. Trademarks belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
