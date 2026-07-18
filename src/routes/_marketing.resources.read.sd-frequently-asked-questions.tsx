import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-frequently-asked-questions",
  title: "System Design — Frequently Asked Questions",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 9,
  lastUpdated: "September 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  heroSubtitle:
    "200+ frequently asked System Design questions — beginner-friendly answers covering architecture, scalability, databases, caching, cloud, interviews, and careers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Getting Started" },
  { id: "c2", label: "2. Basic Concepts" },
  { id: "c3", label: "3. Scalability" },
  { id: "c4", label: "4. Availability" },
  { id: "c5", label: "5. Databases" },
  { id: "c6", label: "6. Caching" },
  { id: "c7", label: "7. Load Balancing" },
  { id: "c8", label: "8. Microservices" },
  { id: "c9", label: "9. Cloud Computing" },
  { id: "c10", label: "10. Security" },
  { id: "c11", label: "11. Career Questions" },
  { id: "c12", label: "12. Interview FAQs" },
  { id: "review", label: "FAQ Review" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Learning Roadmap", tag: "CS Core", time: "8 min" },
  { title: "System Design — Tips & Tricks", tag: "CS Core", time: "8 min" },
  { title: "System Design — PDF Notes", tag: "CS Core", time: "61 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-frequently-asked-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-frequently-asked-questions" }],
  }),
  component: Page,
});

const FAQS: Record<string, { q: string; a: string }[]> = {
  "1. Getting Started": [
    { q: "What is System Design?", a: "The practice of translating product requirements into a scalable, reliable technical architecture — deciding services, data stores, communication, and failure handling before code is written." },
    { q: "Do I need to be a senior engineer to learn it?", a: "No. Junior engineers benefit enormously from learning it early; it makes every code review sharper." },
    { q: "How is it different from software design?", a: "Software design focuses on classes and modules inside one process. System design focuses on services, machines, and networks across many." },
    { q: "How long does it take to learn?", a: "You can be conversational in a month, interview-ready in three, and comfortable designing production systems in one to two years of practice." },
    { q: "Do I need to know Java or Go?", a: "No specific language is required — concepts are language-agnostic." },
    { q: "Where should I start?", a: "Start with a canonical architecture (client → LB → app → DB), then layer scalability, caching, and messaging on top." },
    { q: "Are there free resources?", a: "Yes — cloud providers publish excellent architecture guides for free." },
    { q: "Should I read books or watch videos?", a: "Both. Books give depth; videos give intuition. Alternate them." },
    { q: "Is math important?", a: "Only basic estimation: probability, back-of-envelope arithmetic, and log/linear intuition." },
  ],
  "2. Basic Concepts": [
    { q: "What is a client-server model?", a: "A pattern where clients send requests to servers, which own resources and respond." },
    { q: "What is a monolith?", a: "A single deployable unit that contains most of the application's logic and data access." },
    { q: "What is a microservice?", a: "A small, independently deployable service that owns one bounded capability." },
    { q: "What is stateless vs stateful?", a: "Stateless services keep no per-request data between calls; stateful services do. Stateless is easier to scale." },
    { q: "What is idempotency?", a: "Calling the same operation twice yields the same result — critical for retries." },
    { q: "What is a bottleneck?", a: "The slowest component in a pipeline; it caps end-to-end throughput." },
    { q: "What is horizontal scaling?", a: "Adding more machines rather than making one bigger." },
    { q: "What is a request?", a: "A message sent from client to server asking for data or an action." },
    { q: "What is a response?", a: "The server's answer to a request, containing data, status, and headers." },
    { q: "What is throughput?", a: "How much work a system completes per unit time (requests per second, MB/s)." },
    { q: "What is latency?", a: "Time between sending a request and receiving a response." },
    { q: "What is a service?", a: "A software component that owns a capability and exposes it through an API." },
  ],
  "3. Scalability": [
    { q: "How do I know when to scale?", a: "Watch leading indicators: p95 latency creeping up, queue depth growing, CPU/memory approaching limits." },
    { q: "Is horizontal always better than vertical?", a: "No. Vertical is simpler and often cheaper up to a point; horizontal is unavoidable at large scale." },
    { q: "What is a hot partition?", a: "A shard receiving disproportionate traffic, dragging down the cluster." },
    { q: "How do I avoid it?", a: "Choose a shard key with high cardinality and uniform access patterns." },
    { q: "What is autoscaling?", a: "Automatically adding or removing instances based on metrics." },
    { q: "Does caching replace scaling?", a: "It delays it. Eventually growth outpaces cache — plan for both." },
    { q: "What is elasticity?", a: "The ability to scale both up and down quickly in response to load." },
    { q: "How much headroom should I keep?", a: "Aim for utilisation below 60–70% at peak; anything higher risks cascading failure." },
  ],
  "4. Availability": [
    { q: "What are 'nines'?", a: "Shorthand for availability percentage — 99.9% is three nines." },
    { q: "Is 100% availability possible?", a: "Never economically. Choose the target that matches business impact." },
    { q: "What is multi-AZ?", a: "Deployment across multiple availability zones so one zone's failure doesn't take you down." },
    { q: "What is multi-region?", a: "Deployment across geographic regions to survive a regional outage." },
    { q: "What is a failover?", a: "Redirecting traffic from a failed component to a healthy one." },
    { q: "Active-active vs active-passive?", a: "Active-active serves traffic from all regions; active-passive keeps a standby idle until needed." },
    { q: "What is graceful degradation?", a: "Reducing functionality instead of failing entirely under stress." },
  ],
  "5. Databases": [
    { q: "SQL or NoSQL?", a: "SQL for transactions and relations; NoSQL for scale-out and flexible schema." },
    { q: "What is normalisation?", a: "Structuring tables to reduce redundancy and preserve integrity." },
    { q: "When should I denormalise?", a: "When read performance matters more than write simplicity." },
    { q: "What is a shard?", a: "A horizontal partition of data across multiple database instances." },
    { q: "What is replication?", a: "Copying data across nodes for redundancy and read scaling." },
    { q: "What is eventual consistency?", a: "Given no new updates, replicas eventually converge to the same value." },
    { q: "What is a transaction?", a: "A group of operations that either all succeed or all fail." },
    { q: "What are ACID properties?", a: "Atomicity, Consistency, Isolation, Durability." },
  ],
  "6. Caching": [
    { q: "Where should I place a cache?", a: "As close to the user as possible: browser, CDN, edge, application, database." },
    { q: "What is cache-aside?", a: "The application checks the cache; on miss, loads from the store and writes back." },
    { q: "What is write-through?", a: "Writes go to the cache and store simultaneously." },
    { q: "What is a TTL?", a: "Time-to-live — how long a cached entry stays valid." },
    { q: "What is a stampede?", a: "Many requests missing at once, all rebuilding the same entry, overloading the origin." },
    { q: "How do I mitigate it?", a: "Request coalescing, staggered TTLs, and pre-warming." },
  ],
  "7. Load Balancing": [
    { q: "L4 vs L7?", a: "L4 balances TCP/UDP; L7 understands HTTP and can route by path, headers, or cookies." },
    { q: "What is round-robin?", a: "Requests are sent to servers in circular order." },
    { q: "What is least-connections?", a: "Requests go to the server with the fewest active connections." },
    { q: "What is consistent hashing?", a: "A hashing scheme that minimises re-mapping when nodes are added or removed." },
    { q: "What are sticky sessions?", a: "A load balancer keeps a client on the same server across requests." },
    { q: "Is sticky always good?", a: "No — it makes horizontal scaling harder; prefer externalising session state." },
  ],
  "8. Microservices": [
    { q: "Should I start with microservices?", a: "Rarely. Most systems benefit from a modular monolith first." },
    { q: "How small is a microservice?", a: "Small enough that one team owns it, big enough that its API is meaningful." },
    { q: "What is a service mesh?", a: "An infrastructure layer providing traffic control, observability, and security between services." },
    { q: "What is a saga?", a: "A long-running transaction expressed as a sequence of local transactions and compensations." },
    { q: "What is CQRS?", a: "Command Query Responsibility Segregation — separating read and write models." },
  ],
  "9. Cloud Computing": [
    { q: "IaaS vs PaaS vs SaaS?", a: "IaaS gives raw compute; PaaS gives managed runtimes; SaaS gives finished software." },
    { q: "Should I go multi-cloud?", a: "Only if the business demands it — the operational cost is huge." },
    { q: "What is serverless?", a: "A model where the provider owns the runtime; you deploy functions and pay per invocation." },
    { q: "Are managed services worth the cost?", a: "Almost always, for undifferentiated work." },
  ],
  "10. Security": [
    { q: "What is TLS?", a: "Transport Layer Security — encrypts data in transit." },
    { q: "What is OAuth?", a: "A delegation protocol for granting access without sharing passwords." },
    { q: "What is JWT?", a: "A signed token format for stateless authentication." },
    { q: "Should services trust each other?", a: "No — enforce mTLS or per-request tokens even inside your network." },
  ],
  "11. Career Questions": [
    { q: "Is System Design useful for junior devs?", a: "Yes — it shapes how you write and review code." },
    { q: "When do interviews start asking it?", a: "Typically from mid-level (SDE-2) upwards." },
    { q: "How do I get real experience?", a: "Contribute to on-call, review architectures, and volunteer for scalability projects." },
    { q: "What roles need it most?", a: "Senior engineers, staff engineers, tech leads, architects." },
  ],
  "12. Interview FAQs": [
    { q: "How long is a system-design interview?", a: "Usually 45–60 minutes." },
    { q: "What are the interviewers looking for?", a: "Clarifying questions, trade-offs, defensible choices, communication." },
    { q: "Should I draw diagrams?", a: "Yes — always. A shared canvas anchors the discussion." },
    { q: "How much detail?", a: "Broad first, then deep where the interviewer probes." },
    { q: "What if I don't know a technology?", a: "Say so, then design in terms of the capability you'd need." },
  ],
};

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand common System Design concepts through real questions.</li>
          <li>Clarify beginner doubts with plain-language answers.</li>
          <li>Learn the terminology interviewers actually use.</li>
          <li>Improve interview readiness with focused FAQs.</li>
          <li>Build confidence in distributed systems.</li>
        </ul>
      </Section>

      {Object.entries(FAQS).map(([title, items], idx) => {
        const id = `c${idx + 1}`;
        return (
          <Section id={id} title={title} key={id}>
            {items.map((f, i) => (
              <FAQItem key={i} q={f.q}>{f.a}</FAQItem>
            ))}
            {idx === 0 && <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Where these questions map onto a canonical system architecture." />}
            {idx === 8 && <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Cloud computing FAQ overview: IaaS, PaaS, SaaS, serverless." />}
          </Section>
        );
      })}

      <Section id="review" title="FAQ Review">
        <h3 className="font-semibold">Top 50 questions</h3>
        <p>Focus on the "What is / how does" style questions in chapters 2–7 — they anchor every deeper discussion.</p>
        <h3 className="mt-3 font-semibold">Most asked interview questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Design a URL shortener, chat app, or news feed.</li>
          <li>Explain the CAP theorem with a concrete example.</li>
          <li>How would you scale a read-heavy system?</li>
          <li>When would you choose NoSQL over SQL?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Quick summary</h3>
        <p>Every answer here is a one-paragraph seed; expand it with the PDF Notes when depth is needed.</p>
        <h3 className="mt-3 font-semibold">Final revision</h3>
        <p>Re-read chapters 3, 5, and 6 the night before an interview — they contain the questions asked most often.</p>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Idempotent</strong> — safe to retry.</li>
          <li><strong>Shard</strong> — a horizontal partition of data.</li>
          <li><strong>Quorum</strong> — the minimum agreeing nodes for a distributed decision.</li>
          <li><strong>Backpressure</strong> — signalling upstream that a consumer is overwhelmed.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards,
          and trusted educational resources. System Design principles, cloud platforms,
          distributed systems, and engineering best practices evolve continuously — readers
          should consult official documentation for the latest guidance. All trademarks,
          product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
