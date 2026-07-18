import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-step-by-step-learning-guide",
  title: "System Design — Step-by-Step Learning Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "18 min",
  pages: 30,
  lastUpdated: "March 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1800&q=80",
  heroSubtitle:
    "A 12-week roadmap that turns absolute beginners into confident System Design candidates — with weekly milestones, hands-on projects, portfolio ideas, and interview preparation.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Learning Prerequisites" },
  { id: "c2", label: "2. Week 1 — Computer Networks" },
  { id: "c3", label: "3. Week 2 — Databases" },
  { id: "c4", label: "4. Week 3 — APIs" },
  { id: "c5", label: "5. Week 4 — Load Balancing" },
  { id: "c6", label: "6. Week 5 — Caching" },
  { id: "c7", label: "7. Week 6 — Scalability" },
  { id: "c8", label: "8. Week 7 — Distributed Systems" },
  { id: "c9", label: "9. Week 8 — Messaging Systems" },
  { id: "c10", label: "10. Week 9 — Security" },
  { id: "c11", label: "11. Week 10 — Cloud Architecture" },
  { id: "c12", label: "12. Week 11 — Large Scale Projects" },
  { id: "c13", label: "13. Week 12 — Interview Preparation" },
  { id: "c14", label: "14. Portfolio Building" },
  { id: "c15", label: "15. Career Roadmap" },
  { id: "review", label: "Learning Guide Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Beginner Guide", tag: "CS Core", time: "16 min" },
  { title: "System Design — Complete Tutorial", tag: "CS Core", time: "51 min" },
  { title: "DBMS — Learning Roadmap", tag: "CS Core", time: "9 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-step-by-step-learning-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-step-by-step-learning-guide" }],
  }),
  component: Page,
});

function Week({ title, hours, goals, exercise, milestone }: { title: string; hours: string; goals: string[]; exercise: string; milestone: string }) {
  return (
    <div className="my-3 rounded-xl border border-border/60 bg-card/40 p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-muted-foreground">{hours}</span>
      </div>
      <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">Daily goals</p>
      <ul className="list-disc space-y-0.5 pl-5 text-sm">{goals.map((g) => <li key={g}>{g}</li>)}</ul>
      <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">Hands-on exercise</p>
      <p className="text-sm">{exercise}</p>
      <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">Milestone</p>
      <p className="text-sm">{milestone}</p>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Learn System Design systematically over 12 focused weeks.</li>
          <li>Build architectural thinking through structured practice.</li>
          <li>Master distributed systems concepts step by step.</li>
          <li>Complete practical projects worthy of a portfolio.</li>
          <li>Arrive at interview season prepared, not panicking.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. Learning Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfortable reading code in one language (Python, Java, JS, or Go).</li>
          <li>Basic Linux terminal skills — <code>ssh</code>, <code>curl</code>, <code>grep</code>.</li>
          <li>Understanding of HTTP request/response.</li>
          <li>Willingness to draw diagrams by hand.</li>
        </ul>
        <Callout tone="info" title="How to use this guide">
          Plan 8–10 focused hours per week. Do the exercise before moving on — reading without
          building compounds badly.
        </Callout>
      </Section>

      <Section id="c2" title="2. Week 1 — Computer Networks">
        <Week
          title="Week 1 — Computer Networks"
          hours="~8 hours"
          goals={[
            "Understand TCP vs UDP and when each applies.",
            "Trace what happens between typing a URL and seeing HTML.",
            "Learn DNS, TLS handshake, and HTTP/1 vs HTTP/2.",
          ]}
          exercise="Use tcpdump or Wireshark to capture a request to a public API and annotate every packet."
          milestone="Explain, on a whiteboard, what happens in the first 300ms of a page load."
        />
      </Section>

      <Section id="c3" title="3. Week 2 — Databases">
        <Week
          title="Week 2 — Databases"
          hours="~9 hours"
          goals={[
            "Understand indexes, joins, and transactions.",
            "Explore replication, sharding, and consistency models.",
            "Compare Postgres, MongoDB, and Redis by workload.",
          ]}
          exercise="Design a schema for a small e-commerce site with products, orders, and users. Explain normalization choices."
          milestone="Read a slow query, identify the missing index, and rewrite the query."
        />
      </Section>

      <Section id="c4" title="4. Week 3 — APIs">
        <Week
          title="Week 3 — APIs"
          hours="~7 hours"
          goals={[
            "Design a REST API with clear resource naming.",
            "Understand pagination, filtering, and idempotency.",
            "Learn when GraphQL or gRPC is a better fit than REST.",
          ]}
          exercise="Design and document a paginated /orders API with cursor-based pagination."
          milestone="Explain idempotency and its role in payment APIs."
        />
      </Section>

      <Section id="c5" title="5. Week 4 — Load Balancing">
        <Week
          title="Week 4 — Load Balancing"
          hours="~7 hours"
          goals={[
            "Understand L4 vs L7 load balancing.",
            "Learn round-robin, least-connections, consistent hashing.",
            "Configure Nginx as a reverse proxy locally.",
          ]}
          exercise="Run three Node/Flask app instances behind Nginx and observe requests distributing."
          milestone="Draw the architecture of a load-balanced web tier."
        />
      </Section>

      <Section id="c6" title="6. Week 5 — Caching">
        <Week
          title="Week 5 — Caching"
          hours="~7 hours"
          goals={[
            "Learn cache-aside, write-through, and write-behind patterns.",
            "Understand TTLs, eviction policies, and stampede protection.",
            "Use Redis locally and measure hit rates.",
          ]}
          exercise="Add Redis to a small web app and cache the top-5 slow endpoints."
          milestone="Explain when a cache hurts more than it helps."
        />
      </Section>

      <Section id="c7" title="7. Week 6 — Scalability">
        <Week
          title="Week 6 — Scalability"
          hours="~8 hours"
          goals={[
            "Compare vertical vs horizontal scaling.",
            "Understand stateless services and session storage.",
            "Learn how autoscaling policies work.",
          ]}
          exercise="Take a stateful app, extract its session store to Redis, and prove it now scales horizontally."
          milestone="Design an autoscaling policy for a bursty workload."
        />
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Progression from single-server monolith to autoscaled stateless services with shared caches and databases." />
      </Section>

      <Section id="c8" title="8. Week 7 — Distributed Systems">
        <Week
          title="Week 7 — Distributed Systems"
          hours="~10 hours"
          goals={[
            "Grasp CAP and PACELC intuitively.",
            "Understand leader election, quorum, and replication lag.",
            "Read one classic paper (e.g. Dynamo or Raft).",
          ]}
          exercise="Write a summary of Raft in your own words."
          milestone="Explain how a distributed database handles a network partition."
        />
      </Section>

      <Section id="c9" title="9. Week 8 — Messaging Systems">
        <Week
          title="Week 8 — Messaging Systems"
          hours="~8 hours"
          goals={[
            "Compare Kafka, RabbitMQ, and SQS.",
            "Understand at-least-once vs exactly-once semantics.",
            "Learn back-pressure and dead-letter queues.",
          ]}
          exercise="Build a producer/consumer pair with Kafka locally, then intentionally break it and observe DLQ behaviour."
          milestone="Design an order-processing pipeline using events."
        />
      </Section>

      <Section id="c10" title="10. Week 9 — Security">
        <Week
          title="Week 9 — Security"
          hours="~8 hours"
          goals={[
            "Understand OAuth 2.0, OIDC, and JWTs.",
            "Learn rate limiting, WAFs, and OWASP Top 10.",
            "Practice threat modelling.",
          ]}
          exercise="Threat-model a simple SaaS billing service and list the top 5 mitigations."
          milestone="Confidently explain the difference between authentication and authorization."
        />
      </Section>

      <Section id="c11" title="11. Week 10 — Cloud Architecture">
        <Week
          title="Week 10 — Cloud Architecture"
          hours="~10 hours"
          goals={[
            "Learn core AWS/GCP/Azure services by category.",
            "Understand well-architected framework pillars.",
            "Estimate cost for a simple 3-tier app.",
          ]}
          exercise="Deploy a small app on any cloud using IaC (Terraform or Pulumi)."
          milestone="Draw a reference architecture for a global SaaS on your preferred cloud."
        />
      </Section>

      <Section id="c12" title="12. Week 11 — Large Scale Projects">
        <Week
          title="Week 11 — Large Scale Projects"
          hours="~12 hours"
          goals={[
            "Design a URL shortener end-to-end.",
            "Design a chat system with 10M concurrent users.",
            "Design a video streaming service.",
          ]}
          exercise="Pick one design and write a 5-page whitepaper: requirements, capacity, architecture, trade-offs."
          milestone="Present your design to a peer and defend one trade-off."
        />
      </Section>

      <Section id="c13" title="13. Week 12 — Interview Preparation">
        <Week
          title="Week 12 — Interview Preparation"
          hours="~10 hours"
          goals={[
            "Master a repeatable interview framework: clarify → estimate → design → deep dive → trade-offs.",
            "Do 5 mock interviews (peer or platform).",
            "Refine the 10 canonical designs.",
          ]}
          exercise="Record yourself solving a design problem, then critique the recording."
          milestone="Complete a mock interview scoring at least 'hire' on structure and communication."
        />
        <Figure src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80" caption="Figure 2 — Interview framework: Clarify ⟶ Estimate ⟶ High-level design ⟶ Deep dives ⟶ Trade-offs, revisited in a loop." />
      </Section>

      <Section id="c14" title="14. Portfolio Building">
        <ul className="list-disc space-y-1 pl-5">
          <li>Publish 2–3 design whitepapers on a personal blog or GitHub.</li>
          <li>Contribute to an open-source distributed system (Kafka, Redis, MinIO, etc.).</li>
          <li>Record short design walkthrough videos — they read as senior-level signal.</li>
        </ul>
      </Section>

      <Section id="c15" title="15. Career Roadmap">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>0–2 yrs:</strong> master the fundamentals; ship features with clean interfaces.</li>
          <li><strong>2–5 yrs:</strong> own a service end-to-end; contribute to design reviews.</li>
          <li><strong>5–10 yrs:</strong> lead cross-team designs; mentor juniors; define standards.</li>
          <li><strong>10+ yrs:</strong> shape architecture across the org; balance business and technical trade-offs.</li>
        </ul>
      </Section>

      <Section id="review" title="Learning Guide Review">
        <h3 className="font-semibold">Weekly progress tracker</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Log 3 things you learned each week.</li>
          <li>Note 1 thing that surprised you — surprise = growth.</li>
          <li>Rate confidence 1–5 on each topic; revisit anything under 4.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Milestone checklist</h3>
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="You're ready when…">
          You can draw 5 canonical designs from memory, name trade-offs unprompted, and defend
          one architectural decision under friendly pressure.
        </Callout>
        <h3 className="mt-3 font-semibold">Readiness assessment</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Can you estimate storage for 10M images/day in under 60 seconds?</li>
          <li>Can you explain when to shard vs when to partition?</li>
          <li>Can you diagram a caching layer and defend the TTL choice?</li>
        </ol>
        <h3 className="mt-3 font-semibold">Next learning path</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Deepen with the "System Design — Complete Tutorial" for advanced patterns.</li>
          <li>Read Designing Data-Intensive Applications, one chapter per week.</li>
          <li>Start contributing to an open-source distributed system to convert theory into scars.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is 12 weeks realistic?">Yes, with 8–10 focused hours per week. Slower is fine — just keep the sequence.</FAQItem>
        <FAQItem q="Do I need to finish every exercise?">Doing the exercises is the whole point. Reading alone produces false confidence.</FAQItem>
        <FAQItem q="Should I certify?">Certifications help early-career candidates and are optional otherwise. Portfolio designs signal more than a certificate.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Milestone</strong> — a checkpoint proving a week's material was absorbed.</li>
          <li><strong>Portfolio</strong> — public artefacts that let others verify your skills.</li>
          <li><strong>Mock interview</strong> — a practice run under time and social pressure.</li>
          <li><strong>Whitepaper</strong> — a short design document written to convince a reviewer.</li>
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
