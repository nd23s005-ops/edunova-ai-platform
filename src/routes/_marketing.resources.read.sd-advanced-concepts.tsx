import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-advanced-concepts",
  title: "System Design — Advanced Concepts",
  category: "CS Core",
  difficulty: "Advanced",
  readingTime: "32 min",
  pages: 52,
  lastUpdated: "October 2026",
  tags: ["System Design", "Distributed Systems"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle:
    "An advanced handbook on modern System Design — distributed computing, cloud-native patterns, event-driven architecture, resiliency, observability, and enterprise trade-offs for senior engineers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Distributed System Fundamentals" },
  { id: "c2", label: "2. CAP Theorem" },
  { id: "c3", label: "3. Consistency Models" },
  { id: "c4", label: "4. Consensus Algorithms" },
  { id: "c5", label: "5. Event-Driven Architecture" },
  { id: "c6", label: "6. CQRS" },
  { id: "c7", label: "7. Event Sourcing" },
  { id: "c8", label: "8. Service Discovery" },
  { id: "c9", label: "9. Distributed Transactions" },
  { id: "c10", label: "10. Saga Pattern" },
  { id: "c11", label: "11. Circuit Breaker Pattern" },
  { id: "c12", label: "12. Bulkhead Pattern" },
  { id: "c13", label: "13. Retry Mechanisms" },
  { id: "c14", label: "14. Idempotency" },
  { id: "c15", label: "15. Horizontal Scaling" },
  { id: "c16", label: "16. Sharding" },
  { id: "c17", label: "17. Replication" },
  { id: "c18", label: "18. Distributed Caching" },
  { id: "c19", label: "19. API Gateway" },
  { id: "c20", label: "20. Service Mesh" },
  { id: "c21", label: "21. Cloud-Native Architecture" },
  { id: "c22", label: "22. Kubernetes Architecture" },
  { id: "c23", label: "23. Observability" },
  { id: "c24", label: "24. Distributed Tracing" },
  { id: "c25", label: "25. High Availability" },
  { id: "c26", label: "26. Disaster Recovery" },
  { id: "c27", label: "27. Multi-Region Deployment" },
  { id: "c28", label: "28. Enterprise Case Studies" },
  { id: "c29", label: "29. Future Trends" },
  { id: "c30", label: "30. Advanced Summary" },
  { id: "review", label: "Advanced Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Glossary", tag: "CS Core", time: "11 min" },
  { title: "System Design — Reference Guide", tag: "CS Core", time: "18 min" },
  { title: "System Design — PDF Notes", tag: "CS Core", time: "61 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-advanced-concepts")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/resources/read/sd-advanced-concepts" },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-advanced-concepts" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master advanced System Design concepts used at scale.</li>
          <li>Design highly scalable, distributed, fault-tolerant systems.</li>
          <li>Understand enterprise architecture patterns and their trade-offs.</li>
          <li>Improve architecture decision-making with defensible reasoning.</li>
          <li>Prepare for senior and staff-level engineering interviews.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Distributed System Fundamentals">
        <p>A distributed system is a collection of independent nodes cooperating to appear as one coherent service. The three universal enemies are <strong>partial failure</strong>, <strong>network unreliability</strong>, and <strong>concurrent state change</strong>. Every advanced pattern in this handbook exists to address at least one of these.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Reference distributed architecture: stateless edge, quorum-replicated data plane, and an async event backbone." />
      </Section>

      <Section id="c2" title="2. CAP Theorem">
        <p>Under a network partition, a system must choose between <strong>Consistency</strong> and <strong>Availability</strong>. In practice, PACELC is the more useful frame: partitioned systems trade C for A, and even in the healthy case they trade Latency for Consistency. Money moves CP; content feeds move AP; user profiles usually live somewhere in between.</p>
      </Section>

      <Section id="c3" title="3. Consistency Models">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Linearizable</strong> — every read sees the latest write. Expensive, single-region friendly.</li>
          <li><strong>Sequential</strong> — all nodes see the same order.</li>
          <li><strong>Causal</strong> — cause-effect ordering preserved.</li>
          <li><strong>Read-your-writes</strong> — session-scoped guarantee.</li>
          <li><strong>Eventual</strong> — replicas converge given no new writes.</li>
        </ul>
      </Section>

      <Section id="c4" title="4. Consensus Algorithms">
        <p><strong>Paxos</strong> is the theoretical bedrock; <strong>Raft</strong> is the readable modern equivalent used in etcd, Consul, and TiKV. <strong>Zab</strong> underlies ZooKeeper. Consensus is required whenever a cluster must agree on a single value (leader election, config change, distributed lock).</p>
      </Section>

      <Section id="c5" title="5. Event-Driven Architecture">
        <p>Services publish domain events; other services subscribe and react. Benefits: loose coupling, natural audit log, easy fan-out. Costs: eventual consistency, harder debugging, ordering complexity. Kafka is the log-based canonical broker; NATS and RabbitMQ solve different corners.</p>
      </Section>

      <Section id="c6" title="6. CQRS">
        <p>Command Query Responsibility Segregation splits writes and reads into distinct models. Writes go through a normalised, transactional store; reads hit denormalised projections optimised for query shape. Adopt when read and write requirements diverge sharply.</p>
      </Section>

      <Section id="c7" title="7. Event Sourcing">
        <p>Store the sequence of state-changing events, not the current state. Current state is derived by replay. Gives you free audit, time travel, and precise rebuilds — at the cost of higher storage, snapshotting logic, and versioning discipline.</p>
      </Section>

      <Section id="c8" title="8. Service Discovery">
        <p>Two flavours: <strong>client-side</strong> (Eureka, Consul + smart clients) and <strong>server-side</strong> (Kubernetes Service, cloud load balancer). Server-side is now the default in cloud-native stacks.</p>
      </Section>

      <Section id="c9" title="9. Distributed Transactions">
        <p>Two-phase commit is correct but blocks on the coordinator; three-phase commit relaxes blocking at the cost of complexity. Both scale poorly across services and are typically replaced by sagas.</p>
      </Section>

      <Section id="c10" title="10. Saga Pattern">
        <p>A long-running transaction as a sequence of local transactions and compensations. Two flavours: <em>orchestrated</em> (central controller) and <em>choreographed</em> (services react to events). Orchestration is easier to observe; choreography scales socially better.</p>
        <Code>{`# Orchestrated saga (pseudocode)
try:
    reserve_inventory(order)
    charge_payment(order)
    ship_package(order)
except PaymentFailed:
    release_inventory(order)
    raise`}</Code>
      </Section>

      <Section id="c11" title="11. Circuit Breaker Pattern">
        <p>When a downstream dependency starts failing, stop calling it briefly. Prevents cascading failure. States: <strong>closed</strong>, <strong>open</strong>, <strong>half-open</strong>. Tune failure threshold and reset window based on the dependency's real recovery characteristics.</p>
      </Section>

      <Section id="c12" title="12. Bulkhead Pattern">
        <p>Isolate resources so one poisoned pool cannot sink the ship. Thread-pool bulkheads per downstream service, connection-pool bulkheads per shard. Named after the sealed compartments in ships.</p>
      </Section>

      <Section id="c13" title="13. Retry Mechanisms">
        <ul className="list-disc space-y-1 pl-5">
          <li>Only retry idempotent operations.</li>
          <li>Use exponential backoff with jitter (never plain fixed backoff).</li>
          <li>Cap total retries and total elapsed time.</li>
          <li>Never retry across a circuit breaker in "open" state.</li>
        </ul>
      </Section>

      <Section id="c14" title="14. Idempotency">
        <p>An operation is idempotent if replaying it produces the same result. In distributed systems, idempotency keys (client-generated UUIDs) are the pragmatic way to make POSTs safe. Store the key + response on the server for the retry window.</p>
      </Section>

      <Section id="c15" title="15. Horizontal Scaling">
        <p>Add machines instead of upgrading them. Requires stateless services, externalised sessions, and either a shared data store or a partitioned one. Costs: heterogeneity, coordination, warm-up.</p>
      </Section>

      <Section id="c16" title="16. Sharding">
        <p>Partition data across nodes by a shard key. Strategies: hash-based (uniform), range-based (locality), directory-based (flexible). Consistent hashing minimises reshuffling on membership change.</p>
      </Section>

      <Section id="c17" title="17. Replication">
        <p>Copy data to multiple nodes for redundancy and read scale. Modes: single-leader (Postgres), multi-leader (Cassandra), leaderless (Dynamo). Replication lag is the price of async — measure it and alert on it.</p>
      </Section>

      <Section id="c18" title="18. Distributed Caching">
        <p>Cluster caches (Redis Cluster, Memcached with consistent hashing) present as one logical store. Watch for hot keys, cascading invalidation, and split-brain during network partitions.</p>
      </Section>

      <Section id="c19" title="19. API Gateway">
        <p>A single ingress point for authentication, rate limiting, request transformation, and protocol bridging. Kong, Envoy, and cloud-native gateways are the common choices. Beware turning it into a distributed monolith.</p>
      </Section>

      <Section id="c20" title="20. Service Mesh">
        <p>Sidecars (Envoy) intercept every service-to-service call to add mTLS, retries, timeouts, load balancing, and observability. Istio and Linkerd are the leading control planes. Cost: extra hop, ops complexity.</p>
      </Section>

      <Section id="c21" title="21. Cloud-Native Architecture">
        <ul className="list-disc space-y-1 pl-5">
          <li>Container-first packaging.</li>
          <li>Declarative infrastructure (IaC, Kubernetes manifests).</li>
          <li>Managed data services for undifferentiated heavy lifting.</li>
          <li>Continuous delivery with automated rollbacks.</li>
        </ul>
      </Section>

      <Section id="c22" title="22. Kubernetes Architecture">
        <p>Control plane: API server, scheduler, controller manager, etcd. Data plane: kubelet + container runtime + kube-proxy per node. Everything is a declarative object reconciled toward a desired state. Understand controllers before touching operators.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Kubernetes control plane and data plane reconciled through the API server and etcd." />
      </Section>

      <Section id="c23" title="23. Observability">
        <p>The three pillars — metrics, logs, traces — plus a unifying correlation ID. OpenTelemetry is the emerging vendor-neutral standard. Alert on symptoms, dashboard on causes.</p>
      </Section>

      <Section id="c24" title="24. Distributed Tracing">
        <p>A trace is a tree of spans across services. Sampling policies (head, tail, adaptive) trade fidelity for cost. Trace context propagation must be religious — one broken hop erases the whole tree.</p>
      </Section>

      <Section id="c25" title="25. High Availability">
        <p>HA is a design property, not a feature. Achieved through redundancy at every layer, automated health checks, and rapid failover. Test it with fault injection — hope is not a strategy.</p>
      </Section>

      <Section id="c26" title="26. Disaster Recovery">
        <ul className="list-disc space-y-1 pl-5">
          <li>Backup and restore — cheapest, slowest.</li>
          <li>Pilot light — minimal always-on standby.</li>
          <li>Warm standby — sized-down replica.</li>
          <li>Active/active — full parallel region.</li>
        </ul>
      </Section>

      <Section id="c27" title="27. Multi-Region Deployment">
        <p>Global load balancers route users to the nearest healthy region. Data plane options: single-writer regional, active-active with conflict resolution, or geo-partitioned. Latency floor is speed of light — plan around it.</p>
      </Section>

      <Section id="c28" title="28. Enterprise Case Studies">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Netflix</strong> — Chaos Engineering + Hystrix + Zuul.</li>
          <li><strong>Amazon</strong> — Two-pizza teams and service-per-team.</li>
          <li><strong>Uber</strong> — Ringpop, geo-sharding, matching pipeline.</li>
          <li><strong>Stripe</strong> — Idempotency keys and rate-limiting.</li>
        </ul>
      </Section>

      <Section id="c29" title="29. Future Trends">
        <ul className="list-disc space-y-1 pl-5">
          <li>Serverless containers (Fargate, Cloud Run) as the new default.</li>
          <li>eBPF-powered networking and observability.</li>
          <li>WebAssembly on the edge.</li>
          <li>LLM-integrated orchestration and remediation.</li>
        </ul>
      </Section>

      <Section id="c30" title="30. Advanced Summary">
        <p>Advanced System Design is the art of choosing the right trade-off for the right invariant at the right price. Master the primitives, name your invariants, and defend every choice against a specific failure mode.</p>
      </Section>

      <Section id="review" title="Advanced Review">
        <h3 className="font-semibold">Architecture review</h3>
        <p>Every design should answer: what is the invariant, what failures threaten it, what mechanism defends it, and what does that mechanism cost?</p>
        <h3 className="mt-3 font-semibold">Senior-level questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Design a global payments system with strong consistency.</li>
          <li>Design a multi-region social feed with sub-100ms writes.</li>
          <li>Redesign a saga-heavy system to remove a central orchestrator.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Design challenges</h3>
        <p>Pick one production system you own and enumerate its five most fragile invariants — then design mitigation for each.</p>
        <h3 className="mt-3 font-semibold">Enterprise checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Idempotency on every write path.</li>
          <li>Bulkheads on every external dependency.</li>
          <li>Distributed tracing on every service.</li>
          <li>Disaster-recovery drill on a schedule.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this material required for staff-level interviews?">Yes — expect to be asked about consensus, sagas, and multi-region trade-offs.</FAQItem>
        <FAQItem q="Do I need to memorise Raft?">Understand the intuition (leader election, log replication, safety) more than the paper's proofs.</FAQItem>
        <FAQItem q="When is a service mesh worth it?">Once you have 20+ services and cross-cutting concerns are being reimplemented per team.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>PACELC</strong> — CAP extended: even without partitions, latency vs consistency.</li>
          <li><strong>Quorum</strong> — minimum agreeing replicas for a distributed decision.</li>
          <li><strong>Chaos engineering</strong> — deliberate fault injection to validate resiliency.</li>
        </ul>
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
