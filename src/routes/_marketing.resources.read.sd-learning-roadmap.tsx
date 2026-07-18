import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-learning-roadmap",
  title: "System Design — Learning Roadmap",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 12,
  lastUpdated: "February 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&q=80",
  heroSubtitle:
    "A structured 6-month learning roadmap from beginner to industry-ready System Design engineer — with weekly plans, milestones, projects, and interview goals.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Prerequisites" },
  { id: "c2", label: "2. Beginner Stage" },
  { id: "c3", label: "3. Intermediate Stage" },
  { id: "c4", label: "4. Advanced Stage" },
  { id: "c5", label: "5. Distributed Systems" },
  { id: "c6", label: "6. Cloud Technologies" },
  { id: "c7", label: "7. Architecture Patterns" },
  { id: "c8", label: "8. Hands-on Projects" },
  { id: "c9", label: "9. Interview Preparation" },
  { id: "c10", label: "10. Portfolio Building" },
  { id: "c11", label: "11. Certifications" },
  { id: "c12", label: "12. Career Roadmap" },
  { id: "review", label: "Roadmap Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Frequently Asked Questions", tag: "CS Core", time: "8 min" },
  { title: "System Design — Tips & Tricks", tag: "CS Core", time: "8 min" },
  { title: "System Design — Step-by-Step Learning Guide", tag: "CS Core", time: "35 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-learning-roadmap" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow a structured, six-month learning path.</li>
          <li>Master System Design progressively — no skipped foundations.</li>
          <li>Build practical architecture skills through projects.</li>
          <li>Prepare deliberately for technical interviews.</li>
          <li>Become industry-ready with a defensible portfolio.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80" caption="Figure 1 — Six-month roadmap timeline from prerequisites to job-ready." />
      </Section>

      <Section id="c1" title="1. Prerequisites">
        <p><strong>Duration:</strong> 2 weeks.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfortable in one backend language.</li>
          <li>Basic networking: HTTP, DNS, TCP/IP.</li>
          <li>SQL fundamentals — SELECT, JOIN, indexes.</li>
          <li>Command line + Git.</li>
        </ul>
        <p><strong>Milestone:</strong> ship a small CRUD API to a cloud VM.</p>
      </Section>

      <Section id="c2" title="2. Beginner Stage">
        <p><strong>Weeks 3–6.</strong> Learn the vocabulary and canonical patterns.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Week 3 — client/server, request lifecycle.</li>
          <li>Week 4 — databases, indexes, transactions.</li>
          <li>Week 5 — caching, CDN, load balancers.</li>
          <li>Week 6 — monitoring, logging, deployments.</li>
        </ul>
        <p><strong>Milestone:</strong> deploy a load-balanced two-tier app with a managed database and CDN.</p>
      </Section>

      <Section id="c3" title="3. Intermediate Stage">
        <p><strong>Weeks 7–12.</strong> Add depth: replication, sharding, messaging.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Week 7 — read replicas and connection pooling.</li>
          <li>Week 8 — sharding strategies, consistent hashing.</li>
          <li>Week 9 — message queues (Kafka basics).</li>
          <li>Week 10 — event-driven patterns and CQRS.</li>
          <li>Week 11 — API gateways and rate limiting.</li>
          <li>Week 12 — observability: golden signals.</li>
        </ul>
        <p><strong>Milestone:</strong> design and prototype an event-driven notifications service.</p>
      </Section>

      <Section id="c4" title="4. Advanced Stage">
        <p><strong>Weeks 13–18.</strong> Move to distributed correctness and scale.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Weeks 13–14 — consensus (Raft, Paxos overview).</li>
          <li>Week 15 — quorum reads/writes, sagas.</li>
          <li>Week 16 — geo-distribution, multi-region trade-offs.</li>
          <li>Weeks 17–18 — chaos engineering and disaster recovery.</li>
        </ul>
      </Section>

      <Section id="c5" title="5. Distributed Systems">
        <ul className="list-disc space-y-1 pl-5">
          <li>Read <em>Designing Data-Intensive Applications</em> — one chapter/week.</li>
          <li>Practice reasoning about failure modes: partition, delay, byzantine.</li>
          <li>Build a toy leader-election exercise.</li>
        </ul>
      </Section>

      <Section id="c6" title="6. Cloud Technologies">
        <ul className="list-disc space-y-1 pl-5">
          <li>Pick one cloud and go deep before broadening.</li>
          <li>Learn compute, networking, storage, and managed data services.</li>
          <li>Study your cloud's well-architected framework end-to-end.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Cloud technology skill map: compute, storage, networking, managed data, observability." />
      </Section>

      <Section id="c7" title="7. Architecture Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li>Layered · Hexagonal · Event-driven · CQRS · Saga · Outbox.</li>
          <li>Study one pattern per week, then find it in a real open-source system.</li>
        </ul>
      </Section>

      <Section id="c8" title="8. Hands-on Projects">
        <ol className="list-decimal space-y-1 pl-5">
          <li>URL shortener with cache + analytics.</li>
          <li>Chat app with websockets + Redis pub/sub.</li>
          <li>Rate-limited public API with API gateway.</li>
          <li>Event-driven notifications service with Kafka.</li>
          <li>Multi-region blog with CDN and read replicas.</li>
        </ol>
      </Section>

      <Section id="c9" title="9. Interview Preparation">
        <p><strong>Weeks 19–22.</strong> Practice 2–3 mock designs per week.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Rotate canonical problems: URL shortener, feed, chat, ride-hail, video streaming.</li>
          <li>Record yourself and critique communication as much as content.</li>
          <li>Get feedback from at least one senior engineer.</li>
        </ul>
      </Section>

      <Section id="c10" title="10. Portfolio Building">
        <ul className="list-disc space-y-1 pl-5">
          <li>Publish two write-ups: one greenfield design, one migration story.</li>
          <li>Include diagrams, trade-offs, and metrics.</li>
          <li>Host the projects live; a working demo doubles interview signal.</li>
        </ul>
      </Section>

      <Section id="c11" title="11. Certifications">
        <ul className="list-disc space-y-1 pl-5">
          <li>AWS Solutions Architect Associate — the strongest foundational credential.</li>
          <li>Google Professional Cloud Architect — deeper design thinking.</li>
          <li>Certified Kubernetes Administrator (CKA) — for infrastructure focus.</li>
        </ul>
      </Section>

      <Section id="c12" title="12. Career Roadmap">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Stage</th><th className="p-2 text-left">Focus</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Junior (0–2y)</td><td className="p-2">Own features end-to-end</td></tr>
            <tr className="border-b"><td className="p-2">Mid (2–5y)</td><td className="p-2">Lead components, review designs</td></tr>
            <tr className="border-b"><td className="p-2">Senior (5–8y)</td><td className="p-2">Own services, mentor peers</td></tr>
            <tr><td className="p-2">Staff+ (8y+)</td><td className="p-2">Cross-team architecture, strategy</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="review" title="Roadmap Review">
        <h3 className="font-semibold">Progress tracker</h3>
        <p>Tick weekly milestones — miss two in a row and drop scope, don't skip.</p>
        <h3 className="mt-3 font-semibold">Readiness checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can design a canonical system end-to-end in 45 minutes.</li>
          <li>Can defend every choice with a trade-off.</li>
          <li>Has at least two portfolio designs published.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Milestone review</h3>
        <p>Every month, revisit the milestones and adjust pace — the roadmap is a compass, not a contract.</p>
        <h3 className="mt-3 font-semibold">Career checklist</h3>
        <p>Certification, portfolio, mock interviews, and a mentor — all four unlock the next role.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I compress this into three months?">Yes, if you can dedicate 20+ hours/week — but skip the compression if you also have a full-time job.</FAQItem>
        <FAQItem q="Which cloud should I pick?">Whichever your target employer uses most. AWS is the safest default.</FAQItem>
        <FAQItem q="Are certifications required?">Not required, but they force structured coverage and pass a resume filter.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Milestone</strong> — a checkable deliverable at the end of a stage.</li>
          <li><strong>Portfolio</strong> — public artefacts demonstrating your design ability.</li>
          <li><strong>Well-architected framework</strong> — a cloud vendor's opinion on good design.</li>
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
