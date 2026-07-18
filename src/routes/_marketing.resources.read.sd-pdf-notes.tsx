import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-pdf-notes",
  title: "System Design — PDF Notes",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "61 min",
  pages: 141,
  lastUpdated: "September 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle:
    "A chapter-wise System Design handbook — an offline-friendly study companion covering architecture principles, distributed systems, cloud patterns, and production case studies from beginner to advanced level.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Introduction to System Design" },
  { id: "c2", label: "2. System Design Principles" },
  { id: "c3", label: "3. Functional Requirements" },
  { id: "c4", label: "4. Non-Functional Requirements" },
  { id: "c5", label: "5. Scalability" },
  { id: "c6", label: "6. Availability" },
  { id: "c7", label: "7. Reliability" },
  { id: "c8", label: "8. CAP Theorem" },
  { id: "c9", label: "9. Databases" },
  { id: "c10", label: "10. SQL vs NoSQL" },
  { id: "c11", label: "11. Caching" },
  { id: "c12", label: "12. CDN" },
  { id: "c13", label: "13. Load Balancing" },
  { id: "c14", label: "14. Reverse Proxy" },
  { id: "c15", label: "15. Message Queues" },
  { id: "c16", label: "16. Event-Driven Systems" },
  { id: "c17", label: "17. Microservices" },
  { id: "c18", label: "18. API Gateway" },
  { id: "c19", label: "19. Authentication" },
  { id: "c20", label: "20. Authorization" },
  { id: "c21", label: "21. Storage Systems" },
  { id: "c22", label: "22. Monitoring" },
  { id: "c23", label: "23. Logging" },
  { id: "c24", label: "24. Security" },
  { id: "c25", label: "25. Disaster Recovery" },
  { id: "c26", label: "26. Cloud Architecture" },
  { id: "c27", label: "27. Case Studies" },
  { id: "c28", label: "28. Chapter Review" },
  { id: "review", label: "PDF Notes Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Quick Revision Notes", tag: "CS Core", time: "7 min" },
  { title: "System Design — Cheat Sheet", tag: "CS Core", time: "4 min" },
  { title: "System Design — Complete Tutorial", tag: "CS Core", time: "51 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-pdf-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master System Design fundamentals through structured, chapter-wise notes.</li>
          <li>Understand distributed systems from first principles through advanced patterns.</li>
          <li>Learn scalable architecture patterns used at real companies.</li>
          <li>Design production-ready systems with defensible trade-offs.</li>
          <li>Build a comprehensive offline reference for exams and interviews.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Introduction to System Design">
        <p>
          System Design is the discipline of translating business requirements into robust,
          scalable technical architectures. It sits between product thinking and coding —
          concerned less with syntax and more with structure. These notes are organised as a
          chapter-wise reference. Each chapter builds on the previous one, so a linear read
          works for first-time learners while individual chapters remain usable as standalone
          revision material.
        </p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Canonical high-level architecture: clients ⟶ edge / CDN ⟶ load balancer ⟶ application tier ⟶ data tier, with observability spanning every layer." />
      </Section>

      <Section id="c2" title="2. System Design Principles">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Single responsibility</strong> at the service level — each service owns one coherent capability.</li>
          <li><strong>Loose coupling</strong> through well-defined interfaces and asynchronous messaging.</li>
          <li><strong>High cohesion</strong> keeps related data and behaviour together.</li>
          <li><strong>Design for failure</strong> — assume every dependency will fail eventually.</li>
          <li><strong>Automate everything</strong> — deployment, recovery, and observability.</li>
        </ul>
      </Section>

      <Section id="c3" title="3. Functional Requirements">
        <p>Functional requirements describe <em>what</em> the system does. Capture them as user stories or use cases with unambiguous acceptance criteria. Examples: "a customer can place an order", "an admin can suspend an account".</p>
      </Section>

      <Section id="c4" title="4. Non-Functional Requirements">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Category</th><th className="p-2 text-left">Typical target</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Latency</td><td className="p-2">p99 &lt; 200ms</td></tr>
            <tr className="border-b"><td className="p-2">Throughput</td><td className="p-2">10k RPS sustained</td></tr>
            <tr className="border-b"><td className="p-2">Availability</td><td className="p-2">99.95% monthly</td></tr>
            <tr><td className="p-2">Durability</td><td className="p-2">11 nines for stored objects</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c5" title="5. Scalability">
        <p>Two axes: <strong>vertical</strong> (bigger machine) and <strong>horizontal</strong> (more machines). Horizontal scaling requires stateless services, externalised sessions, and idempotent operations. Autoscaling policies should react to leading indicators (queue depth, CPU) rather than lagging ones (5xx rate).</p>
      </Section>

      <Section id="c6" title="6. Availability">
        <p>Availability is the fraction of time a system responds successfully. Multi-AZ deployments handle zone failures; multi-region handles regional failures. Each 9 you add costs roughly 10× more than the previous one, so target availability against business impact, not vanity.</p>
      </Section>

      <Section id="c7" title="7. Reliability">
        <p>Reliability is about doing the right thing, not just responding. A reliable service preserves invariants — no duplicate charges, no lost writes, no phantom reads. Retries, idempotency keys, and transactional outboxes are the everyday tools.</p>
      </Section>

      <Section id="c8" title="8. CAP Theorem">
        <p>Under a network partition, a distributed system can be either <strong>Consistent</strong> or <strong>Available</strong>, not both. PACELC extends this: even without partitions, you trade latency for consistency. Financial systems lean CP; feeds and catalogues lean AP.</p>
      </Section>

      <Section id="c9" title="9. Databases">
        <p>Choose from the query shape and consistency requirements, not the marketing. Every database sits somewhere on the trade-off between latency, throughput, consistency, and operational complexity.</p>
      </Section>

      <Section id="c10" title="10. SQL vs NoSQL">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Aspect</th><th className="p-2 text-left">SQL</th><th className="p-2 text-left">NoSQL</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Schema</td><td className="p-2">Rigid, enforced</td><td className="p-2">Flexible</td></tr>
            <tr className="border-b"><td className="p-2">Joins</td><td className="p-2">First-class</td><td className="p-2">Usually application-side</td></tr>
            <tr className="border-b"><td className="p-2">Scale-out</td><td className="p-2">Harder</td><td className="p-2">Native</td></tr>
            <tr><td className="p-2">Best for</td><td className="p-2">Transactions, reporting</td><td className="p-2">High-write, denormalised</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c11" title="11. Caching">
        <p>Cache to reduce latency and offload origin. Common patterns: cache-aside, write-through, write-behind. Beware the thundering herd — use request coalescing or stampede protection. Every cache entry needs a defensible TTL.</p>
      </Section>

      <Section id="c12" title="12. CDN">
        <p>Content Delivery Networks push static content and cacheable HTML to edge PoPs. A well-configured CDN typically absorbs 60–90% of a media-heavy site's traffic and dramatically improves p95 latency for far-away users.</p>
      </Section>

      <Section id="c13" title="13. Load Balancing">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>L4</strong> — TCP/UDP-level, fast, protocol-agnostic.</li>
          <li><strong>L7</strong> — HTTP-aware, enables path routing, header-based rules, TLS offload.</li>
          <li>Algorithms: round robin, least connections, consistent hashing, weighted variants.</li>
        </ul>
      </Section>

      <Section id="c14" title="14. Reverse Proxy">
        <p>Reverse proxies (Nginx, Envoy, HAProxy) terminate TLS, enforce rate limits, inject auth headers, and shield origins. In modern architectures they act as the local sidecar in a service mesh.</p>
      </Section>

      <Section id="c15" title="15. Message Queues">
        <p>Queues decouple producers from consumers and smooth traffic bursts. Kafka favours high throughput and log semantics; RabbitMQ favours flexible routing; SQS favours zero-ops simplicity.</p>
        <Code>{`# Consumer pattern (Kafka)
for msg in consumer:
    try:
        process(msg)
        consumer.commit()      # commit after success
    except Retryable:
        # do not commit; message will be re-delivered
        raise`}</Code>
      </Section>

      <Section id="c16" title="16. Event-Driven Systems">
        <p>Services publish domain events; other services react. Benefits: loose coupling, natural audit log, easy fan-out. Costs: eventual consistency, harder debugging, ordering complexity.</p>
      </Section>

      <Section id="c17" title="17. Microservices">
        <p>Small services, independent deployments, aligned with team boundaries. Adopt only when the organisational structure makes them cheaper than a modular monolith — otherwise you inherit distributed pain without the payoff.</p>
      </Section>

      <Section id="c18" title="18. API Gateway">
        <p>A single ingress point for cross-cutting concerns: authentication, rate limiting, request shaping, response transformation, and protocol translation. Prevents every service from reinventing these wheels.</p>
      </Section>

      <Section id="c19" title="19. Authentication">
        <p>Prefer OIDC over rolling your own. Store password hashes with Argon2id or bcrypt. Rotate signing keys. Enforce MFA for privileged users. Never trust a bearer token without validating signature, audience, and expiry.</p>
      </Section>

      <Section id="c20" title="20. Authorization">
        <p>RBAC for simple systems, ABAC for fine-grained ones. Centralise policy in one engine (e.g. OPA) so audit and change control are consistent. Log every deny — most breaches show up as unusual authorisation traffic first.</p>
      </Section>

      <Section id="c21" title="21. Storage Systems">
        <ul className="list-disc space-y-1 pl-5">
          <li>Block storage — attached, high-IOPS disks (EBS, Persistent Disk).</li>
          <li>Object storage — infinite, cheap, eventually consistent (S3, GCS).</li>
          <li>File storage — POSIX semantics, shared across nodes (EFS, Filestore).</li>
        </ul>
      </Section>

      <Section id="c22" title="22. Monitoring">
        <p>The golden signals: latency, traffic, errors, saturation. Prometheus + Grafana is the canonical open-source stack. Alert on symptoms that users feel, not on internal implementation details.</p>
      </Section>

      <Section id="c23" title="23. Logging">
        <p>Structured JSON, tagged with a request ID and service name, shipped to a central store. Never log secrets. Set retention based on legal and operational needs, not "just in case".</p>
      </Section>

      <Section id="c24" title="24. Security">
        <ul className="list-disc space-y-1 pl-5">
          <li>TLS everywhere, including internal traffic.</li>
          <li>Least-privilege IAM, audited quarterly.</li>
          <li>Secrets in a vault, never in Git or env files.</li>
          <li>Threat-model every new service.</li>
        </ul>
      </Section>

      <Section id="c25" title="25. Disaster Recovery">
        <p>Define RPO (data-loss budget) and RTO (downtime budget). Choose a strategy that matches them: backup/restore, pilot light, warm standby, or active/active. Test failover on a schedule — untested runbooks are fiction.</p>
      </Section>

      <Section id="c26" title="26. Cloud Architecture">
        <p>AWS, GCP, and Azure differ in vocabulary, not principle. Prefer managed services for undifferentiated heavy lifting. Design against your cloud's well-architected framework and revisit annually.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Reference cloud architecture: multi-AZ regional deployment with managed data plane, autoscaled compute, shared observability, and a central identity provider." />
      </Section>

      <Section id="c27" title="27. Case Studies">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>URL shortener</strong> — hashing, sizing, cache-first reads.</li>
          <li><strong>Chat system</strong> — websockets, fan-out, ordering.</li>
          <li><strong>Video streaming</strong> — CDN, adaptive bitrate, DRM.</li>
          <li><strong>Ride-hailing</strong> — geo-indexing, matching, surge.</li>
        </ul>
      </Section>

      <Section id="c28" title="28. Chapter Review">
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you sketch a canonical architecture from memory?</li>
          <li>Can you defend a CP vs AP choice on a specific workload?</li>
          <li>Can you enumerate five failure modes for a service you know well?</li>
        </ul>
      </Section>

      <Section id="review" title="PDF Notes Review">
        <h3 className="font-semibold">Chapter summary</h3>
        <p>Twenty-eight chapters cover the vocabulary, patterns, and trade-offs a modern engineer is expected to know. Read linearly for a first pass; revisit chapters as reference.</p>
        <h3 className="mt-3 font-semibold">Important topics</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Scalability, availability, CAP, caching, load balancing.</li>
          <li>SQL vs NoSQL trade-offs, sharding, replication.</li>
          <li>Message queues, event-driven patterns, microservices boundaries.</li>
          <li>Security, observability, and disaster recovery.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Revision notes</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every design starts with functional + non-functional requirements.</li>
          <li>Prefer boring managed services for undifferentiated work.</li>
          <li>Observability precedes launch; it is not optional.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Self assessment</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Explain PACELC and why it matters.</li>
          <li>Compare consistent hashing to modulo hashing for cache sharding.</li>
          <li>Design a retry policy for a payment API call.</li>
          <li>Draw a monitoring dashboard for a canonical web service.</li>
        </ol>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How should I use these notes for interview prep?">Read linearly once, then pick 5–10 canonical designs and practice them weekly. Refer back to relevant chapters when specific gaps surface.</FAQItem>
        <FAQItem q="Do I need to memorise numbers?">Yes — latency numbers, packet sizes, storage costs. They anchor your intuition and make estimates credible.</FAQItem>
        <FAQItem q="Are these notes cloud-neutral?">Yes. Cloud-specific chapters call out AWS/GCP/Azure equivalents so you can map ideas to your stack.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>SLO</strong> — Service Level Objective.</li>
          <li><strong>RPO / RTO</strong> — data-loss / downtime budgets.</li>
          <li><strong>Idempotency</strong> — same operation, same result, no matter how many times you call it.</li>
          <li><strong>Sharding</strong> — horizontal partitioning of data across nodes.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards,
          and trusted educational resources. System Design principles, distributed systems,
          cloud platforms, and scalability practices evolve continuously — readers should
          consult official documentation for the latest recommendations. All trademarks,
          product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
