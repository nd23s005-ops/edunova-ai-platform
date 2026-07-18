import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-glossary",
  title: "System Design — Glossary",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 22,
  lastUpdated: "July 2026",
  tags: ["System Design", "Architecture Terms"],
  heroImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1800&q=80",
  heroSubtitle:
    "An alphabetical System Design glossary — architecture, distributed systems, cloud, databases, networking, and security terminology defined for engineers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. A–D" },
  { id: "s2", label: "2. E–H" },
  { id: "s3", label: "3. I–L" },
  { id: "s4", label: "4. M–P" },
  { id: "s5", label: "5. Q–T" },
  { id: "s6", label: "6. U–Z" },
  { id: "s7", label: "7. Acronyms" },
  { id: "s8", label: "8. Common Interview Terms" },
  { id: "s9", label: "9. Enterprise Terminology" },
  { id: "s10", label: "10. Quick Reference" },
  { id: "review", label: "Glossary Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Advanced Concepts", tag: "CS Core", time: "32 min" },
  { title: "System Design — Reference Guide", tag: "CS Core", time: "18 min" },
  { title: "System Design — Cheat Sheet", tag: "CS Core", time: "4 min" },
];

const ENTRIES: Record<string, { term: string; def: string }[]> = {
  "1. A–D": [
    { term: "ACID", def: "Atomicity, Consistency, Isolation, Durability — the traditional guarantees of a transactional database." },
    { term: "API Gateway", def: "A single ingress that centralises authentication, rate limiting, routing, and transformation across services." },
    { term: "Active-Active", def: "A deployment where multiple regions serve production traffic simultaneously." },
    { term: "Active-Passive", def: "A deployment where a standby region only takes over after a failover event." },
    { term: "Autoscaling", def: "Automatically adjusting the number of instances based on observed load." },
    { term: "Availability", def: "The fraction of time a system responds successfully — often measured in 9s." },
    { term: "Backpressure", def: "A signal from a slow consumer telling upstream producers to slow down." },
    { term: "BASE", def: "Basically Available, Soft state, Eventual consistency — the NoSQL counterpoint to ACID." },
    { term: "Blue/Green Deploy", def: "Running two identical environments and switching traffic between them for zero-downtime releases." },
    { term: "Bulkhead", def: "Isolating resources so a failure in one pool cannot exhaust the whole system." },
    { term: "Cache-Aside", def: "The application checks the cache; on miss, loads from the store and writes back." },
    { term: "Canary Release", def: "Rolling out a change to a small percentage of traffic first." },
    { term: "CAP Theorem", def: "During a network partition, a system must choose consistency or availability, not both." },
    { term: "CDN", def: "A network of edge servers caching static content close to users." },
    { term: "Circuit Breaker", def: "A pattern that stops calling a failing dependency to prevent cascading failure." },
    { term: "Consensus", def: "A protocol by which distributed nodes agree on a single value (e.g., Raft, Paxos)." },
    { term: "Consistency", def: "Every read reflects the latest agreed write, at the required consistency level." },
    { term: "CQRS", def: "Command Query Responsibility Segregation — separate read and write models." },
    { term: "Data Plane", def: "The layer that actually processes traffic (as opposed to the control plane)." },
    { term: "DNS", def: "Domain Name System — the phonebook mapping names to IPs." },
    { term: "Docker", def: "A container packaging and runtime tool." },
    { term: "Durability", def: "A guarantee that committed data survives crashes and power loss." },
  ],
  "2. E–H": [
    { term: "Edge Compute", def: "Executing logic on servers geographically close to users." },
    { term: "ELB / ALB / NLB", def: "AWS load balancers at classic/L7/L4 levels respectively." },
    { term: "Envoy", def: "A high-performance L7 proxy widely used as a sidecar in service meshes." },
    { term: "Eventual Consistency", def: "Given no new updates, replicas eventually converge to the same value." },
    { term: "Event Sourcing", def: "Storing state as a sequence of events instead of the current snapshot." },
    { term: "Fault Tolerance", def: "The ability of a system to continue operating despite component failures." },
    { term: "Feature Flag", def: "A runtime switch that enables or disables code paths without redeploying." },
    { term: "Fan-Out", def: "Dispatching a single event to many downstream consumers." },
    { term: "Gossip Protocol", def: "A peer-to-peer communication pattern used to spread state across nodes." },
    { term: "GraphQL", def: "A query language for APIs offering typed, client-driven data fetching." },
    { term: "gRPC", def: "A high-performance RPC framework built on HTTP/2 and Protocol Buffers." },
    { term: "Hash Ring", def: "The data structure behind consistent hashing." },
    { term: "Heartbeat", def: "A periodic signal indicating a node is alive." },
    { term: "Horizontal Scaling", def: "Adding more machines rather than upgrading one." },
    { term: "HTTP/2", def: "A binary, multiplexed transport for HTTP." },
    { term: "HTTP/3", def: "HTTP built on QUIC (UDP), improving performance on lossy networks." },
  ],
  "3. I–L": [
    { term: "IaC", def: "Infrastructure as Code — managing infrastructure with declarative files (e.g., Terraform)." },
    { term: "Idempotency", def: "The property that repeating an operation yields the same result." },
    { term: "Immutable Deployment", def: "Replacing rather than modifying running artifacts (containers, VMs)." },
    { term: "Ingress", def: "A Kubernetes resource routing external HTTP traffic to services." },
    { term: "Istio", def: "A popular service mesh control plane." },
    { term: "JWT", def: "JSON Web Token — a signed token format for stateless auth." },
    { term: "Kafka", def: "A distributed log-based message broker." },
    { term: "Kubernetes", def: "An open-source container orchestration platform." },
    { term: "L4 / L7", def: "OSI transport-layer / application-layer load balancing." },
    { term: "Latency", def: "The time between sending a request and receiving a response." },
    { term: "Leader Election", def: "The process of choosing a single node to coordinate work." },
    { term: "Load Balancer", def: "A component that distributes requests across many servers." },
    { term: "LRU", def: "Least Recently Used — an eviction policy for caches." },
  ],
  "4. M–P": [
    { term: "Message Queue", def: "A buffer that decouples producers from consumers." },
    { term: "Microservice", def: "A small, independently deployable service owning one capability." },
    { term: "Monolith", def: "A single deployable unit containing most application logic." },
    { term: "mTLS", def: "Mutual TLS — both parties present certificates." },
    { term: "NAT", def: "Network Address Translation — mapping many private addresses onto fewer public ones." },
    { term: "NoSQL", def: "Non-relational databases prioritising flexibility and scale-out." },
    { term: "Observability", def: "The ability to infer internal state from external signals." },
    { term: "OpenTelemetry", def: "A vendor-neutral standard for metrics, logs, and traces." },
    { term: "PACELC", def: "CAP extension: even without partitions, systems trade latency for consistency." },
    { term: "Partitioning", def: "Splitting data across nodes; synonym for sharding." },
    { term: "PoP", def: "Point of Presence — a CDN edge location." },
    { term: "PostgreSQL", def: "A popular open-source relational database." },
    { term: "Publish/Subscribe", def: "A messaging pattern where publishers emit events to topics that subscribers consume." },
  ],
  "5. Q–T": [
    { term: "QPS", def: "Queries per second." },
    { term: "Quorum", def: "The minimum number of agreeing nodes for a distributed decision." },
    { term: "Rate Limiting", def: "Constraining how often a client may hit an endpoint." },
    { term: "Raft", def: "A consensus algorithm designed to be more understandable than Paxos." },
    { term: "Read Replica", def: "A read-only copy of a primary database." },
    { term: "Redis", def: "An in-memory data store used for caching, queues, and pub/sub." },
    { term: "Replication", def: "Copying data across nodes for redundancy or read scale." },
    { term: "Reverse Proxy", def: "A server that forwards client requests to backend servers." },
    { term: "Retry with Backoff", def: "Retrying failed operations with exponentially growing delays." },
    { term: "SAGA", def: "A long-running transaction as a sequence of local steps and compensations." },
    { term: "Sharding", def: "Partitioning data across nodes by a shard key." },
    { term: "SLA", def: "Service Level Agreement — a contractual availability commitment." },
    { term: "SLO", def: "Service Level Objective — an internal availability target." },
    { term: "Sticky Session", def: "Binding a client to the same server for its session." },
    { term: "TCP", def: "Reliable, connection-oriented transport protocol." },
    { term: "Throughput", def: "Work completed per unit time (RPS, MB/s)." },
    { term: "TLS", def: "Transport Layer Security — encrypts data in transit." },
    { term: "Tracing", def: "Recording the path of a request across services." },
  ],
  "6. U–Z": [
    { term: "UDP", def: "Connectionless, unreliable transport — fast and lossy." },
    { term: "Uptime", def: "The percentage of time a system is available." },
    { term: "Vertical Scaling", def: "Upgrading a single machine rather than adding machines." },
    { term: "Virtual Machine", def: "A software-emulated computer running its own OS." },
    { term: "WAL", def: "Write-Ahead Log — sequential log used for crash recovery." },
    { term: "WebSocket", def: "A protocol enabling bidirectional real-time communication over TCP." },
    { term: "Zero Trust", def: "A security model assuming no implicit trust anywhere in the network." },
    { term: "ZooKeeper", def: "A coordination service for distributed systems." },
  ],
  "7. Acronyms": [
    { term: "API", def: "Application Programming Interface." },
    { term: "CDN", def: "Content Delivery Network." },
    { term: "CRUD", def: "Create, Read, Update, Delete." },
    { term: "DNS", def: "Domain Name System." },
    { term: "ETL", def: "Extract, Transform, Load." },
    { term: "IAM", def: "Identity and Access Management." },
    { term: "MTTR", def: "Mean Time To Recovery." },
    { term: "RPO / RTO", def: "Recovery Point / Recovery Time Objective." },
    { term: "SDK", def: "Software Development Kit." },
    { term: "SPOF", def: "Single Point Of Failure." },
    { term: "SSO", def: "Single Sign-On." },
    { term: "URI / URL", def: "Uniform Resource Identifier / Locator." },
    { term: "VPC", def: "Virtual Private Cloud." },
  ],
  "8. Common Interview Terms": [
    { term: "Back-of-envelope", def: "Rough sizing estimates used to justify a design choice." },
    { term: "Hot Path", def: "The critical code path that most requests traverse." },
    { term: "Hot Partition", def: "A shard that receives disproportionate traffic." },
    { term: "Thundering Herd", def: "Many callers waking simultaneously and overwhelming a resource." },
    { term: "Split Brain", def: "A distributed system where two subsets both believe they are the leader." },
    { term: "Read-your-writes", def: "A session guarantee that a user immediately sees their own updates." },
  ],
  "9. Enterprise Terminology": [
    { term: "Blast Radius", def: "The scope of impact when something fails." },
    { term: "Chaos Engineering", def: "Injecting failures deliberately to validate resiliency." },
    { term: "Control Plane", def: "The layer that manages configuration and orchestration." },
    { term: "Data Gravity", def: "The tendency of data to attract compute and applications." },
    { term: "Landing Zone", def: "A pre-configured multi-account cloud baseline." },
    { term: "Runbook", def: "A written procedure for handling a specific operational event." },
    { term: "Toil", def: "Repetitive manual operational work that scales linearly with service size." },
  ],
  "10. Quick Reference": [
    { term: "Golden Signals", def: "Latency, traffic, errors, saturation." },
    { term: "Nines", def: "99% = 3.65 d/yr · 99.9% = 8.76 h/yr · 99.99% = 52.6 min/yr." },
    { term: "Typical Latencies", def: "L1 cache ~1ns · RAM ~100ns · SSD ~100μs · same-region network ~1ms · cross-continent ~150ms." },
    { term: "Cache Strategies", def: "Cache-aside · write-through · write-behind." },
    { term: "Load Balancing", def: "Round robin · least connections · consistent hashing." },
  ],
};

export const Route = createFileRoute("/_marketing/resources/read/sd-glossary")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/resources/read/sd-glossary" },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-glossary" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Learn System Design terminology through concise definitions.</li>
          <li>Improve technical vocabulary for interviews and design reviews.</li>
          <li>Understand architecture concepts at a glance.</li>
          <li>Build engineering confidence with correct usage.</li>
          <li>Use System Design terminology precisely in writing and speech.</li>
        </ul>
      </Section>

      {Object.entries(ENTRIES).map(([title, items], idx) => {
        const id = `s${idx + 1}`;
        return (
          <Section id={id} title={title} key={id}>
            <dl className="space-y-2">
              {items.map((e, i) => (
                <div key={i}>
                  <dt className="font-semibold">{e.term}</dt>
                  <dd className="text-muted-foreground">{e.def}</dd>
                </div>
              ))}
            </dl>
            {idx === 0 && <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Distributed system reference architecture: where each glossary term lives on the wire." />}
            {idx === 6 && <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Enterprise terminology map spanning control plane, data plane, and observability." />}
          </Section>
        );
      })}

      <Section id="review" title="Glossary Review">
        <h3 className="font-semibold">Most important terms</h3>
        <p>Availability, Consistency, Latency, Throughput, Idempotency, Sharding, Replication, Consensus, Circuit Breaker, Observability.</p>
        <h3 className="mt-3 font-semibold">Interview vocabulary</h3>
        <p>CAP, PACELC, Quorum, Sticky Session, Cache-Aside, Saga, Bulkhead, Blast Radius, Hot Partition.</p>
        <h3 className="mt-3 font-semibold">Beginner reference</h3>
        <p>Start with sections A–D and Acronyms — they cover 80% of everyday design conversation.</p>
        <h3 className="mt-3 font-semibold">Daily quick lookup</h3>
        <p>Bookmark the Quick Reference at the end for latency numbers and availability tables.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this a substitute for a textbook?">No — it's a lookup. Read the PDF Notes or Complete Tutorial for depth.</FAQItem>
        <FAQItem q="How was the term list chosen?">By frequency across interview loops, architecture reviews, and production incident post-mortems.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards,
          and trusted educational resources. System Design principles, cloud platforms,
          distributed systems, Kubernetes ecosystems, and engineering best practices evolve
          continuously — readers should consult official documentation for the latest guidance
          and implementation recommendations. All trademarks, product names, logos, and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
