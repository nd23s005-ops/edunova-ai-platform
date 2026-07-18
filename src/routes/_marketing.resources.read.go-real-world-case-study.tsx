import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-real-world-case-study",
  title: "Go — Real-world Case Study",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "23 min",
  pages: 30,
  lastUpdated: "January 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "How LumenPay — a fintech payments platform — scaled a Go backend to 25M daily transactions with concurrency, observability, and disciplined trade-offs.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Business Requirements" },
  { id: "s2", label: "2. High-Level Architecture" },
  { id: "s3", label: "3. Low-Level Design" },
  { id: "s4", label: "4. API Design" },
  { id: "s5", label: "5. Database Decisions" },
  { id: "s6", label: "6. Goroutines" },
  { id: "s7", label: "7. Channels" },
  { id: "s8", label: "8. Performance Optimization" },
  { id: "s9", label: "9. Cloud Deployment" },
  { id: "s10", label: "10. Monitoring" },
  { id: "s11", label: "11. Trade-offs" },
  { id: "s12", label: "12. KPIs & Business Impact" },
  { id: "s13", label: "13. Lessons Learned" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Project Case Study", tag: "Programming", time: "24 min" },
  { title: "Go — Best Practices", tag: "Programming", time: "17 min" },
  { title: "Go — Advanced Concepts", tag: "Programming", time: "25 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>See how a real Go backend scales from 100k to 25M daily transactions.</li>
          <li>Understand the architecture, concurrency, and data-layer trade-offs.</li>
          <li>Learn which optimizations moved the needle vs. which were noise.</li>
          <li>Extract lessons applicable to your own systems.</li>
        </ul>
        <Callout tone="info" title="About LumenPay">A composite fintech case study — details are anonymised but reflect real production Go deployments.</Callout>
      </Section>

      <Section id="s1" title="1. Business Requirements">
        <ul className="list-disc space-y-1 pl-5">
          <li>25M transactions/day, 3× spike on payday.</li>
          <li>p99 &lt; 150 ms for authorization API.</li>
          <li>99.99% uptime SLA, PCI-DSS compliance.</li>
          <li>Multi-region active-active in 3 continents.</li>
        </ul>
      </Section>

      <Section id="s2" title="2. High-Level Architecture">
        <p>Mobile/web → CDN → API gateway → Go authorization service → Postgres (writes), Redis (cache), Kafka (event log). Downstream: fraud, ledger, notifications.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Backend architecture: sync authorization path kept lean; heavy work pushed to async workers." />
      </Section>

      <Section id="s3" title="3. Low-Level Design">
        <p>Hexagonal architecture: <code>domain</code> (pure), <code>ports</code> (interfaces), <code>adapters</code> (HTTP, Postgres, Kafka). Enables swapping infra without touching business rules.</p>
      </Section>

      <Section id="s4" title="4. API Design">
        <Code lang="text">{`POST /v1/authorize     # idempotency-key required
POST /v1/capture
POST /v1/refund
GET  /v1/transactions/{id}`}</Code>
        <p>Consistent error envelope <code>{`{code, message, request_id}`}</code>. Versioning at path. Rate limits per merchant tier.</p>
      </Section>

      <Section id="s5" title="5. Database Decisions">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Store</th><th className="p-2 text-left">Purpose</th><th className="p-2 text-left">Why</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Postgres</td><td className="p-2">Transactional writes</td><td className="p-2">ACID, mature tooling</td></tr>
            <tr className="border-b"><td className="p-2">Redis</td><td className="p-2">Idempotency + rate limit</td><td className="p-2">Sub-ms latency</td></tr>
            <tr><td className="p-2">Kafka</td><td className="p-2">Event log</td><td className="p-2">Replay + fan-out</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s6" title="6. Goroutines">
        <p>Fan-out enrichment (fraud, KYC, ledger check) via <code>errgroup</code> with a 60 ms budget. Worker pools cap goroutine counts on hot paths.</p>
        <Code lang="go">{`g, gctx := errgroup.WithContext(ctx)
g.Go(func() error { return fraud.Score(gctx, tx) })
g.Go(func() error { return kyc.Verify(gctx, tx.User) })
if err := g.Wait(); err != nil { return err }`}</Code>
      </Section>

      <Section id="s7" title="7. Channels">
        <p>Buffered channel decouples handler from Kafka producer. Backpressure trips a circuit breaker if publish latency exceeds 40 ms for 30 s.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Channel workflow: bounded fan-in from handlers, dropped-with-metrics under sustained overload." />
      </Section>

      <Section id="s8" title="8. Performance Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Removed reflection from hot path → −18% CPU.</li>
          <li>Pooled <code>bytes.Buffer</code> with <code>sync.Pool</code> → −22% allocations.</li>
          <li>Prepared statements + pgx binary protocol → −30% DB latency.</li>
          <li>GOGC tuning from 100 → 200 → +8% throughput, +80 MB RSS (acceptable).</li>
        </ul>
      </Section>

      <Section id="s9" title="9. Cloud Deployment">
        <p>Distroless images, Kubernetes across 3 regions, Istio for mTLS. Blue/green with automated rollback on SLO burn. Chaos tests weekly.</p>
      </Section>

      <Section id="s10" title="10. Monitoring">
        <p>RED metrics per handler, USE metrics per node, OTEL traces sampled 1% baseline / 100% on error. Alerts on SLO burn rate, not raw thresholds.</p>
      </Section>

      <Section id="s11" title="11. Engineering Trade-offs">
        <ul className="list-disc space-y-1 pl-5">
          <li>Chose Postgres over Cassandra: transactional integrity mattered more than write scale.</li>
          <li>Kept a modular monolith: 6 teams, one repo — faster than microservices for the size.</li>
          <li>Ate a 12 ms mTLS tax for defense-in-depth.</li>
        </ul>
      </Section>

      <Section id="s12" title="12. KPIs & Business Impact">
        <ul className="list-disc space-y-1 pl-5">
          <li>Authorization p99: 210 ms → 118 ms after 6-month optimization sprint.</li>
          <li>Infra cost/transaction: −34% year-over-year.</li>
          <li>Approval rate: +2.1 pts (worth eight figures annually).</li>
        </ul>
      </Section>

      <Section id="s13" title="13. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Idempotency keys are non-negotiable for payments.</li>
          <li>Observability before scale — you can't optimize what you can't see.</li>
          <li>Simple wins: boring Postgres + Kafka beat a dozen exotic stores.</li>
          <li>Chaos testing caught more bugs than staging ever did.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>LumenPay's Go backend scaled by staying disciplined: measure first, optimize hot paths, embrace boring infra, and invest in observability early.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Why Go over Java?">Simpler concurrency, faster startup, lower memory. Java would have worked too — the team's expertise was the tiebreaker.</FAQItem>
        <FAQItem q="Microservices?">Not yet — a well-modularised monolith served 6 teams fine.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>RED</strong> — Rate, Errors, Duration.</li>
          <li><strong>USE</strong> — Utilization, Saturation, Errors.</li>
          <li><strong>SLO burn rate</strong> — how fast you're consuming your error budget.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational composite case study. Numbers illustrative. Trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
