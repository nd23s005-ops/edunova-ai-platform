import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-project-guide",
  title: "Rust — Project Guide",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "17 min",
  pages: 25,
  lastUpdated: "June 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1800&q=80",
  heroSubtitle: "End-to-end guide to shipping production Rust: planning, workspace design, testing, logging, APIs, databases, deployment, CI/CD, monitoring, docs, and maintenance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Planning & Scoping" },
  { id: "s2", label: "2. Cargo Workspace Layout" },
  { id: "s3", label: "3. Architecture" },
  { id: "s4", label: "4. API Development" },
  { id: "s5", label: "5. Database Integration" },
  { id: "s6", label: "6. Testing Strategy" },
  { id: "s7", label: "7. Logging & Observability" },
  { id: "s8", label: "8. CI/CD & Deployment" },
  { id: "s9", label: "9. Monitoring & Maintenance" },
  { id: "s10", label: "10. Documentation" },
  { id: "diagrams", label: "Architecture Diagrams" },
  { id: "best", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Rust — Project Case Study", tag: "Programming", time: "27 min" },
  { title: "Rust — Best Practices", tag: "Programming", time: "16 min" },
  { title: "Rust — Advanced Concepts", tag: "Programming", time: "31 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/rust-project-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-project-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Plan and structure a production Rust project.</li>
          <li>Set up workspaces, testing, logging, and CI/CD.</li>
          <li>Ship a Rust service with monitoring and docs.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Planning & Scoping">
        <p>Start with a written charter: problem statement, non-goals, acceptance criteria, and risk register. Prefer a walking skeleton over an over-engineered design.</p>
        <Callout tone="tip" title="Tip">Write the README before writing code.</Callout>
      </Section>

      <Section id="s2" title="2. Cargo Workspace Layout">
        <Code lang="text">{`novaledger/
├── Cargo.toml       # [workspace]
├── crates/
│   ├── api/         # axum HTTP layer
│   ├── domain/      # pure logic, no I/O
│   ├── storage/     # sqlx repos
│   └── worker/      # background jobs
└── xtask/           # dev automation`}</Code>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" caption="Figure 1 — Hexagonal workspace: domain at the core, adapters at the edge." />
      </Section>

      <Section id="s3" title="3. Architecture">
        <p>Layer traits for storage and clock; inject concrete implementations at the composition root. Keep domain crates <code>#![forbid(unsafe_code)]</code>.</p>
      </Section>

      <Section id="s4" title="4. API Development">
        <Code lang="rust">{`use axum::{Router, routing::get, Json};
async fn health() -> Json<serde_json::Value> {
    Json(serde_json::json!({ "ok": true }))
}
pub fn app() -> Router {
    Router::new().route("/health", get(health))
}`}</Code>
      </Section>

      <Section id="s5" title="5. Database Integration">
        <p>Use <code>sqlx</code> with compile-time query checking, migrations under <code>migrations/</code>, and a repository trait per aggregate.</p>
      </Section>

      <Section id="s6" title="6. Testing Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Unit tests inline (<code>#[cfg(test)]</code> modules).</li>
          <li>Integration tests under <code>tests/</code>.</li>
          <li>Property tests via <code>proptest</code> for invariants.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. Logging & Observability">
        <p>Adopt <code>tracing</code> + <code>tracing-subscriber</code>. Emit JSON in production, human logs in dev. Wire OpenTelemetry for spans.</p>
      </Section>

      <Section id="s8" title="8. CI/CD & Deployment">
        <Code lang="yaml">{`# .github/workflows/ci.yml
- run: cargo fmt --check
- run: cargo clippy -- -D warnings
- run: cargo test --workspace
- run: cargo build --release`}</Code>
        <p>Ship as a static musl binary or in a distroless container.</p>
      </Section>

      <Section id="s9" title="9. Monitoring & Maintenance">
        <p>Expose <code>/metrics</code> (Prometheus), alert on error budget burn, and rotate dependencies weekly via <code>cargo update</code>.</p>
      </Section>

      <Section id="s10" title="10. Documentation">
        <p>Publish rustdoc, keep an ADR log, and record runbooks for on-call.</p>
      </Section>

      <Section id="diagrams" title="Architecture Diagrams">
        <Code lang="text">{`Client → API (axum) → Domain → Storage (Postgres)
                             ↓
                          Worker (queue)`}</Code>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Data flow from HTTP edge to persistence." />
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>One binary crate per deployable.</li>
          <li>Deny warnings and clippy lints in CI.</li>
          <li>Prefer <code>thiserror</code> for libs, <code>anyhow</code> for bins.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Mixing async runtimes.</li>
          <li>Blocking calls inside <code>#[tokio::main]</code>.</li>
          <li>Unversioned migrations.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Structure first, features second. Deny warnings, embrace tracing, and automate the boring parts.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="axum or actix-web?">Both are excellent — axum has smoother ergonomics on modern Tokio.</FAQItem>
        <FAQItem q="Diesel or sqlx?">sqlx for async + compile-time queries; Diesel for strict typed schemas.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Recommendations reflect current ecosystem norms as of 2026.</p>
      </Section>
    </ReaderShell>
  );
}
