import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-project-case-study",
  title: "Rust — Project Case Study",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "27 min",
  pages: 34,
  lastUpdated: "April 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle: "How the FerroDesk team designed, built, optimized, tested, deployed, and maintained a scalable Rust backend using modern practices.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Context & Goals" },
  { id: "s2", label: "2. Architecture" },
  { id: "s3", label: "3. Development Process" },
  { id: "s4", label: "4. Optimization" },
  { id: "s5", label: "5. Testing & Rollout" },
  { id: "s6", label: "6. Deployment & Ops" },
  { id: "s7", label: "7. Maintenance & Evolution" },
  { id: "diagrams", label: "Architecture Diagrams" },
  { id: "best", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Project Guide", tag: "Programming", time: "17 min" },
  { title: "Rust — Real-world Case Study", tag: "Programming", time: "19 min" },
  { title: "Rust — Best Practices", tag: "Programming", time: "16 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-project-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>See a real Rust backend from zero to production.</li>
          <li>Understand trade-offs at every layer.</li>
          <li>Learn how the team measured and improved.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Context & Goals">
        <p><strong>Project:</strong> FerroDesk — a multi-tenant support ticketing API serving 12M requests/day. Targets: p99 &lt; 40ms, 99.99% uptime, zero data-loss on failover.</p>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 1 — FerroDesk request-flow overview." />
      </Section>

      <Section id="s2" title="2. Architecture">
        <p>Hexagonal Cargo workspace: <code>api</code>, <code>domain</code>, <code>storage</code>, <code>worker</code>, <code>xtask</code>. axum + tokio + sqlx (Postgres) + Redis Streams for events.</p>
        <Code lang="text">{`Edge (CF) → API (axum) → Postgres (RW)
                              ↘ Redis Streams → Worker → Postgres (analytics)`}</Code>
      </Section>

      <Section id="s3" title="3. Development Process">
        <p>Two-week sprints, ADRs for each major decision, trunk-based development, and mandatory <code>clippy -D warnings</code> before merge.</p>
      </Section>

      <Section id="s4" title="4. Optimization">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Change</th><th className="p-2 text-left">Before</th><th className="p-2 text-left">After</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Bincode over JSON internally</td><td className="p-2">1.9ms</td><td className="p-2">380µs</td></tr>
            <tr className="border-b"><td className="p-2">SQL <code>PREPARE</code> caching</td><td className="p-2">42ms</td><td className="p-2">11ms</td></tr>
            <tr><td className="p-2">Arena allocator for parsing</td><td className="p-2">6% CPU</td><td className="p-2">1.2% CPU</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s5" title="5. Testing & Rollout">
        <p>1,240 unit tests + 320 integration tests + fuzz tests on parsers. Canary deploy to 1% → 10% → 100% over 6 hours.</p>
      </Section>

      <Section id="s6" title="6. Deployment & Ops">
        <p>Distroless container, 12MB binary, deployed via GitOps to Kubernetes with HPA. Prometheus + Grafana + Loki stack.</p>
        <Figure src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1400&q=80" caption="Figure 2 — GitOps rollout pipeline with automatic rollback on SLO burn." />
      </Section>

      <Section id="s7" title="7. Maintenance & Evolution">
        <p>Weekly <code>cargo update</code>, quarterly toolchain bump, on-call rotates weekly with runbook parity.</p>
      </Section>

      <Section id="diagrams" title="Architecture Diagrams">
        <Code lang="text">{`Failure domain:
   AZ-a  ← primary DB
   AZ-b  ← replica (async, promoted on failover)
   AZ-c  ← workers`}</Code>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Deny warnings, forbid unsafe in domain crates.</li>
          <li>Everything traceable via request-id.</li>
          <li>Every migration reversible.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Early caching hid a bad N+1 query — measure first.</li>
          <li>Custom runtime experiments — reverted to stock Tokio.</li>
        </ul>
        <Callout tone="warning" title="Lesson">Don't optimize what you haven't profiled.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Rust rewarded FerroDesk with predictable latencies and boring on-calls — the biggest wins came from process, not micro-optimizations.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Team size?">Six engineers over eight months.</FAQItem>
        <FAQItem q="Why Rust over Go?">Existing crypto + parsing hot path benefited from zero-cost abstractions.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">FerroDesk is an illustrative composite; numbers reflect typical outcomes.</p>
      </Section>
    </ReaderShell>
  );
}
