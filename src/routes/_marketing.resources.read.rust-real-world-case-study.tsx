import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "rust-real-world-case-study",
  title: "Rust — Real-world Case Study",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "19 min",
  pages: 34,
  lastUpdated: "January 2026",
  tags: ["Programming", "Rust", "Systems"],
  heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&q=80",
  heroSubtitle: "How OxideStream replaced a JVM video-encoding pipeline with Rust — 71% fewer instances, 4x throughput, and a boring on-call.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Business Problem" },
  { id: "s2", label: "2. Architecture Decisions" },
  { id: "s3", label: "3. Memory Safety Wins" },
  { id: "s4", label: "4. Concurrency Model" },
  { id: "s5", label: "5. Deployment" },
  { id: "s6", label: "6. Optimization" },
  { id: "s7", label: "7. Monitoring & Scale" },
  { id: "s8", label: "8. Trade-offs" },
  { id: "s9", label: "9. Business Outcomes" },
  { id: "s10", label: "10. Lessons Learned" },
  { id: "flow", label: "Flowchart" },
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

export const Route = createFileRoute("/_marketing/resources/read/rust-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/rust-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>See how Rust delivers real cost + reliability improvements.</li>
          <li>Understand the trade-offs of a full rewrite vs strangler pattern.</li>
          <li>Translate memory-safety and concurrency claims into business results.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Business Problem">
        <p><strong>OxideStream</strong> operated a 900-instance JVM cluster for real-time video encoding. GC pauses (150–400ms) blew SLOs on 4K streams; cloud spend hit $2.6M/yr.</p>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 1 — Legacy pipeline: JVM encoders bottlenecked on GC pauses." />
      </Section>

      <Section id="s2" title="2. Architecture Decisions">
        <p>Adopted a strangler fig: rewrote hot paths (encoder, muxer) in Rust behind a gRPC facade while legacy services continued serving control-plane traffic.</p>
      </Section>

      <Section id="s3" title="3. Memory Safety Wins">
        <p>Zero segfaults in production. CVE inventory dropped 62% year-over-year. Buffer-overflow class of bugs eliminated by construction.</p>
      </Section>

      <Section id="s4" title="4. Concurrency Model">
        <p>Tokio with per-CPU worker threads; frame parsing offloaded to <code>rayon</code>. Backpressure via bounded channels.</p>
        <Code lang="rust">{`let (tx, rx) = tokio::sync::mpsc::channel(256);
tokio::spawn(async move { while let Some(frame) = rx.recv().await { encode(frame).await; } });`}</Code>
      </Section>

      <Section id="s5" title="5. Deployment">
        <p>18MB static binaries, distroless containers, GitOps rollouts, weekly toolchain patches.</p>
      </Section>

      <Section id="s6" title="6. Optimization">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Metric</th><th className="p-2 text-left">JVM</th><th className="p-2 text-left">Rust</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">p99 encode latency</td><td className="p-2">312ms</td><td className="p-2">54ms</td></tr>
            <tr className="border-b"><td className="p-2">Memory/instance</td><td className="p-2">7.4GB</td><td className="p-2">690MB</td></tr>
            <tr><td className="p-2">Fleet size</td><td className="p-2">900</td><td className="p-2">260</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s7" title="7. Monitoring & Scale">
        <p>Prometheus histograms per pipeline stage; OTLP traces spanning JVM + Rust services for a unified request view.</p>
      </Section>

      <Section id="s8" title="8. Trade-offs">
        <ul className="list-disc space-y-1 pl-5">
          <li>Slower ramp for new hires (2–3 weeks).</li>
          <li>Smaller ecosystem for some codecs — mitigated with FFI wrappers.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" caption="Figure 2 — Cost & latency delta after Rust migration." />
      </Section>

      <Section id="s9" title="9. Business Outcomes">
        <p>$1.7M annual savings, +18 NPS from broadcasters, on-call pages down 74%.</p>
      </Section>

      <Section id="s10" title="10. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Strangler beat big-bang rewrite.</li>
          <li>Invest in developer experience (mold linker, sccache).</li>
          <li>Codify style with clippy + rustfmt in CI.</li>
        </ul>
      </Section>

      <Section id="flow" title="Flowchart">
        <Code lang="text">{`Ingest → Parse → Encode → Mux → Push
   ↑          ↓        ↓
 metrics ← tracing ← errors`}</Code>
      </Section>

      <Section id="best" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Rewrite the hot path first; migrate the rest lazily.</li>
          <li>Keep the FFI surface small and audited.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Trying to port idioms 1:1 — embrace Rust's ownership model.</li>
          <li>Skipping benchmarks pre-migration.</li>
        </ul>
        <Callout tone="warning" title="Watch">Rewrites without baseline metrics rarely prove ROI.</Callout>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Rust turned a stressed pipeline into a boring one — the biggest win was operational, not just cost.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long did it take?">Nine months for the encoder migration.</FAQItem>
        <FAQItem q="Any regressions?">Yes — one panic on an untrusted RTP packet, fixed with fuzz-derived guardrails.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">OxideStream is an illustrative composite; numbers are representative.</p>
      </Section>
    </ReaderShell>
  );
}
