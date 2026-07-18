import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-complete-tutorial",
  title: "System Design — Complete Tutorial",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "51 min",
  pages: 115,
  lastUpdated: "October 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "An end-to-end tutorial covering scalable architecture, distributed systems, cloud-native patterns, security, deployment, and a capstone project — designed for engineers who want production-ready skills.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Introduction to System Design" },
  { id: "c2", label: "2. System Requirements" },
  { id: "c3", label: "3. Functional Requirements" },
  { id: "c4", label: "4. Non-Functional Requirements" },
  { id: "c5", label: "5. Capacity Planning" },
  { id: "c6", label: "6. Scalability" },
  { id: "c7", label: "7. Load Balancing" },
  { id: "c8", label: "8. Reverse Proxies" },
  { id: "c9", label: "9. Databases" },
  { id: "c10", label: "10. SQL vs NoSQL" },
  { id: "c11", label: "11. Caching" },
  { id: "c12", label: "12. CDN" },
  { id: "c13", label: "13. Message Queues" },
  { id: "c14", label: "14. Event-Driven Architecture" },
  { id: "c15", label: "15. Microservices" },
  { id: "c16", label: "16. API Gateway" },
  { id: "c17", label: "17. Authentication" },
  { id: "c18", label: "18. Authorization" },
  { id: "c19", label: "19. Storage Systems" },
  { id: "c20", label: "20. Search Systems" },
  { id: "c21", label: "21. Monitoring" },
  { id: "c22", label: "22. Logging" },
  { id: "c23", label: "23. Distributed Tracing" },
  { id: "c24", label: "24. Fault Tolerance" },
  { id: "c25", label: "25. Disaster Recovery" },
  { id: "c26", label: "26. High Availability" },
  { id: "c27", label: "27. Security" },
  { id: "c28", label: "28. Deployment" },
  { id: "c29", label: "29. Cloud Architecture" },
  { id: "c30", label: "30. Case Studies" },
  { id: "c31", label: "31. Capstone Project" },
  { id: "review", label: "Complete Tutorial Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Beginner Guide", tag: "CS Core", time: "16 min" },
  { title: "System Design — Step-by-Step Learning Guide", tag: "CS Core", time: "18 min" },
  { title: "DBMS — Advanced Concepts", tag: "CS Core", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-complete-tutorial")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-complete-tutorial" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master System Design fundamentals in depth.</li>
          <li>Learn scalable architecture patterns used at industry scale.</li>
          <li>Design highly available systems with defensible trade-offs.</li>
          <li>Build production-ready distributed applications.</li>
          <li>Prepare for technical interviews and senior engineering roles.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Introduction to System Design">
        <p>
          System Design is the discipline of turning ambiguous product requirements into a
          concrete, defensible architecture. This tutorial takes you from first principles to
          a capstone design of a globally distributed system, with cloud-native patterns and
          real production concerns at every step.
        </p>
      </Section>

      <Section id="c2" title="2. System Requirements">
        <p>Every design starts with two questions: what must the system do, and how well must it do it? Skipping either produces solutions in search of problems.</p>
      </Section>

      <Section id="c3" title="3. Functional Requirements">
        <p>Capabilities visible to the user or a calling service — "users can post a message", "admins can revoke a session". Write them as testable statements.</p>
      </Section>

      <Section id="c4" title="4. Non-Functional Requirements">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Category</th><th className="p-2 text-left">Example target</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Latency</td><td className="p-2">p99 &lt; 150ms globally</td></tr>
            <tr className="border-b"><td className="p-2">Availability</td><td className="p-2">99.95% monthly SLO</td></tr>
            <tr className="border-b"><td className="p-2">Durability</td><td className="p-2">11 nines for stored objects</td></tr>
            <tr><td className="p-2">Throughput</td><td className="p-2">50k requests/sec peak</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c5" title="5. Capacity Planning">
        <p>Back-of-envelope estimates keep designs grounded. Multiply expected users × actions × payload size to size storage, bandwidth, and compute. Add 3× headroom for bursts.</p>
        <Code>{`# Example: photo-sharing app
DAU = 5,000,000
uploads_per_user_per_day = 2
avg_photo_size = 2 MB

daily_write_volume = 5e6 * 2 * 2 MB = 20 TB / day
peak_bandwidth = daily_write_volume / (8 * 3600) ~ 700 MB/s`}</Code>
      </Section>

      <Section id="c6" title="6. Scalability">
        <p>
          Scale is a function of stateless services + replicated state + smart routing.
          Prefer horizontal scaling, keep sessions out of app servers, and cache aggressively.
        </p>
      </Section>

      <Section id="c7" title="7. Load Balancing">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>L4</strong> load balancers route on TCP/IP; fastest, dumbest.</li>
          <li><strong>L7</strong> route on HTTP headers/paths; enable smarter policies.</li>
          <li>Algorithms: round-robin, least-connections, consistent hashing.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Regional load balancers fan out to zonal app fleets; a global anycast layer routes users to their nearest region." />
      </Section>

      <Section id="c8" title="8. Reverse Proxies">
        <p>Nginx, Envoy, HAProxy — they terminate TLS, add auth headers, rate-limit, and shield origin servers. Every serious deployment has one.</p>
      </Section>

      <Section id="c9" title="9. Databases">
        <p>Pick the database from the query pattern, not the marketing page. Understand replication, partitioning, and consistency guarantees before committing.</p>
      </Section>

      <Section id="c10" title="10. SQL vs NoSQL">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">SQL</th><th className="p-2 text-left">NoSQL</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Strong schema, powerful joins.</td><td className="p-2">Flexible shape, horizontal scale.</td></tr>
            <tr className="border-b"><td className="p-2">ACID by default.</td><td className="p-2">Tunable consistency.</td></tr>
            <tr><td className="p-2">Great for financial, transactional workloads.</td><td className="p-2">Great for feeds, catalogues, session stores.</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c11" title="11. Caching">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cache-aside is the default; write-through and write-behind exist for specific patterns.</li>
          <li>Pick TTLs based on staleness tolerance, not intuition.</li>
          <li>Beware the thundering herd — use request coalescing / stampede protection.</li>
        </ul>
      </Section>

      <Section id="c12" title="12. CDN">
        <p>Content Delivery Networks push static assets and cached HTML to edge PoPs near users. A CDN typically absorbs 60–90% of a media-heavy site's traffic.</p>
      </Section>

      <Section id="c13" title="13. Message Queues">
        <p>Kafka, RabbitMQ, SQS — decouple producers from consumers, smooth traffic spikes, and enable retries. The unlock for asynchronous workflows.</p>
      </Section>

      <Section id="c14" title="14. Event-Driven Architecture">
        <p>Services communicate through events on a shared bus. Loose coupling, natural audit trail, and easier scaling — at the cost of eventual consistency.</p>
      </Section>

      <Section id="c15" title="15. Microservices">
        <p>Small services owned by small teams. Only adopt them when Conway's Law makes them cheaper than a well-modularised monolith. Otherwise, you've bought distributed pain.</p>
      </Section>

      <Section id="c16" title="16. API Gateway">
        <p>The front door: auth, rate limiting, routing, and protocol translation in one place. Prevents each service from re-implementing the same cross-cutting concerns.</p>
      </Section>

      <Section id="c17" title="17. Authentication">
        <p>Prefer OAuth 2.0 / OIDC over rolling your own. Store password hashes with Argon2 or bcrypt. Rotate signing keys. Ship MFA.</p>
      </Section>

      <Section id="c18" title="18. Authorization">
        <p>RBAC for simple systems, ABAC for complex ones. Centralise the policy engine so audit and change control live in one place.</p>
      </Section>

      <Section id="c19" title="19. Storage Systems">
        <ul className="list-disc space-y-1 pl-5">
          <li>Block storage (EBS) — attached disks.</li>
          <li>Object storage (S3) — infinite, cheap, eventually consistent.</li>
          <li>File storage (EFS) — POSIX-like semantics.</li>
        </ul>
      </Section>

      <Section id="c20" title="20. Search Systems">
        <p>Elasticsearch/OpenSearch/MeiliSearch for text search; specialised vector DBs (Pinecone, pgvector) for semantic search. Never search your primary DB with LIKE.</p>
      </Section>

      <Section id="c21" title="21. Monitoring">
        <p>Golden signals: latency, traffic, errors, saturation. Prometheus + Grafana is the canonical open-source stack.</p>
      </Section>

      <Section id="c22" title="22. Logging">
        <p>Structured JSON logs, ingested by a central store (Loki, Elasticsearch, Splunk). Tag every log line with a request ID and service name.</p>
      </Section>

      <Section id="c23" title="23. Distributed Tracing">
        <p>OpenTelemetry across every service. Traces are the only credible way to debug latency in a microservices world.</p>
      </Section>

      <Section id="c24" title="24. Fault Tolerance">
        <ul className="list-disc space-y-1 pl-5">
          <li>Retries with exponential backoff and jitter.</li>
          <li>Circuit breakers to stop hammering unhealthy dependencies.</li>
          <li>Bulkheads that isolate failures to one subsystem.</li>
        </ul>
      </Section>

      <Section id="c25" title="25. Disaster Recovery">
        <p>Define RPO (recovery point objective) and RTO (recovery time objective). Test failover regularly — an untested runbook is fiction.</p>
      </Section>

      <Section id="c26" title="26. High Availability">
        <p>Multi-AZ by default, multi-region when the SLO demands it. Avoid single points of failure — including in your control plane.</p>
      </Section>

      <Section id="c27" title="27. Security">
        <ul className="list-disc space-y-1 pl-5">
          <li>TLS everywhere, including internal traffic.</li>
          <li>Least-privilege IAM; audit grants quarterly.</li>
          <li>Secret management via a vault, not env vars in Git.</li>
          <li>Threat model every new service.</li>
        </ul>
      </Section>

      <Section id="c28" title="28. Deployment">
        <p>Immutable infrastructure. Blue/green or canary rollouts. Feature flags for risky changes. Roll forward, don't roll back — but always know how to.</p>
      </Section>

      <Section id="c29" title="29. Cloud Architecture">
        <p>AWS, GCP, and Azure differ in vocabulary, not principle. Prefer managed services for undifferentiated heavy lifting; run your own only when the workload justifies it.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Reference cloud architecture: global load balancer ⟶ regional API gateway ⟶ microservices ⟶ managed data plane, with observability and identity as shared platforms." />
      </Section>

      <Section id="c30" title="30. Case Studies">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Design a URL shortener</strong> — hashing, storage sizing, cache strategy.</li>
          <li><strong>Design a video streaming service</strong> — CDN, adaptive bitrate, DRM.</li>
          <li><strong>Design a chat system</strong> — websockets, fan-out, message ordering.</li>
          <li><strong>Design a ride-hailing service</strong> — geo-indexing, matching, surge pricing.</li>
        </ul>
      </Section>

      <Section id="c31" title="31. Capstone Project">
        <p>
          Design a global social feed serving 100M DAU. Deliverables: functional +
          non-functional requirements, capacity estimate, architecture diagram, data model,
          consistency strategy, deployment plan, and observability blueprint.
        </p>
        <Callout tone="success" icon={<Sparkles className="h-5 w-5" />} title="Capstone goal">
          Produce a document you'd hand to a senior engineer and defend in a design review.
        </Callout>
      </Section>

      <Section id="review" title="Complete Tutorial Review">
        <h3 className="font-semibold">Final quiz</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Explain the CAP theorem in the context of a payment system.</li>
          <li>When would you prefer eventual consistency over strong consistency?</li>
          <li>Design the caching strategy for a heavily-read leaderboard.</li>
          <li>How does a service mesh differ from an API gateway?</li>
          <li>What is the RPO/RTO of a service that snapshots hourly and restores in 20 minutes?</li>
        </ol>
        <h3 className="mt-3 font-semibold">Architecture checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Functional and non-functional requirements written down.</li>
          <li>Capacity estimates with 3× headroom.</li>
          <li>Failure modes for every dependency identified.</li>
          <li>Observability wired before launch.</li>
          <li>Security review completed.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Interview preparation</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Practice the same 10 designs until you can draw them from memory.</li>
          <li>Always narrate trade-offs; interviewers score reasoning, not answers.</li>
          <li>End every design by naming what you'd change if requirements doubled.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Capstone review</h3>
        <p>Present the capstone in three passes: 30-second summary, 5-minute walkthrough, 20-minute deep dive. Practice each until it feels boring — that's when it's ready.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long until I'm interview-ready?">Most engineers reach mid-level System Design fluency in 3–6 focused months. Senior fluency takes years of production exposure.</FAQItem>
        <FAQItem q="Do I need to memorise numbers?">Yes — latency numbers, packet sizes, storage costs. They anchor your intuition and make interviewers trust your estimates.</FAQItem>
        <FAQItem q="Serverless or containers?">Serverless for spiky, event-driven workloads; containers for long-lived services with predictable footprints. Real systems use both.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>SLO</strong> — Service Level Objective; internal reliability target.</li>
          <li><strong>RPO / RTO</strong> — data loss / downtime budgets for disaster recovery.</li>
          <li><strong>CAP</strong> — Consistency, Availability, Partition-tolerance trade-off.</li>
          <li><strong>Service mesh</strong> — sidecar-based infra for east-west traffic policy.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards,
          and trusted educational resources. System Design principles, cloud services,
          distributed technologies, and best practices evolve continuously — readers should
          consult official vendor documentation for the latest information. All trademarks,
          product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
