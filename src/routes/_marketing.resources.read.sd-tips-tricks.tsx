import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-tips-tricks",
  title: "System Design — Tips & Tricks",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 15,
  lastUpdated: "June 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1800&q=80",
  heroSubtitle:
    "150+ practical System Design tips — shortcuts, memory tricks, debugging workflows, interview hacks, and professional habits for engineers who build scalable systems.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. Learning Tips" },
  { id: "c2", label: "2. Interview Tips" },
  { id: "c3", label: "3. Architecture Tips" },
  { id: "c4", label: "4. Scalability Tricks" },
  { id: "c5", label: "5. Caching Tricks" },
  { id: "c6", label: "6. Database Tips" },
  { id: "c7", label: "7. Cloud Tips" },
  { id: "c8", label: "8. Debugging Tricks" },
  { id: "c9", label: "9. Productivity Hacks" },
  { id: "c10", label: "10. Revision Strategies" },
  { id: "c11", label: "11. Career Tips" },
  { id: "c12", label: "12. Final Advice" },
  { id: "review", label: "Tips Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Frequently Asked Questions", tag: "CS Core", time: "8 min" },
  { title: "System Design — Learning Roadmap", tag: "CS Core", time: "8 min" },
  { title: "System Design — Cheat Sheet", tag: "CS Core", time: "4 min" },
];

const TIPS: Record<string, string[]> = {
  "1. Learning Tips": [
    "Draw first, code later — architecture is a visual discipline.",
    "Explain a concept out loud once you think you understand it.",
    "Alternate books and videos each week to keep intuition fresh.",
    "Keep a design journal — sketch a new architecture every week.",
    "Teach a friend; teaching exposes gaps faster than reading.",
    "Study production post-mortems — they compress decades of experience.",
    "Time-box every design exercise to 45 minutes to build interview muscle.",
    "Re-read your notes weekly for the first month, monthly after that.",
  ],
  "2. Interview Tips": [
    "Restate the problem before designing — clarify scope in three questions.",
    "Estimate scale early: QPS, storage, bandwidth.",
    "Draw the happy path first, then the failure paths.",
    "Name concrete technologies — vagueness loses signal.",
    "Speak in trade-offs, not absolutes.",
    "Leave hooks so the interviewer can steer you where they want depth.",
    "If stuck, ask one thoughtful question instead of guessing.",
    "Summarise the final design in 60 seconds — it shows control.",
  ],
  "3. Architecture Tips": [
    "Prefer boring, proven technology for the critical path.",
    "Push complexity to the edges of the system, not the middle.",
    "Every service should own its data — no shared DBs.",
    "Design APIs first; they outlive implementations.",
    "Idempotency keys on every write endpoint you'd ever retry.",
    "Version everything from day one — schemas, APIs, events.",
    "One responsibility per component; if you struggle to name it, split it.",
    "Diagrams are code — check them into the repo.",
  ],
  "4. Scalability Tricks": [
    "Autoscale on queue depth, not CPU alone.",
    "Move fan-out work behind an async queue.",
    "Pre-compute the top-N leaderboard; don't sort on every read.",
    "Batch database writes when latency budgets allow.",
    "Reserve capacity headroom below 70% of peak.",
    "Cap request sizes — unbounded input is a DDoS vector.",
    "Use bulk endpoints to reduce N+1 traffic patterns.",
    "Cache negative lookups too — 'not found' is expensive to recompute.",
  ],
  "5. Caching Tricks": [
    "Stagger TTLs to prevent synchronised expiry storms.",
    "Coalesce parallel misses through a single-flight primitive.",
    "Prefer eventual consistency with short TTLs over stale purges.",
    "Cache at the closest reasonable layer — often the CDN, not Redis.",
    "Measure cache hit rate before increasing cache size.",
    "Warm caches on deploy; don't launch cold.",
    "Encode ETag responses so clients can revalidate cheaply.",
  ],
  "6. Database Tips": [
    "Add an index only after seeing a slow query — not before.",
    "EXPLAIN every query that matters; know the plan by heart.",
    "Use connection pooling; a leaked connection is a landmine.",
    "Backups you haven't restored are hopes, not backups.",
    "Prefer soft deletes for user-facing data — you'll be glad you did.",
    "Timezone-encode every timestamp column.",
    "Keep hot rows short; move blobs to object storage.",
  ],
  "7. Cloud Tips": [
    "Tag every resource for cost attribution from day one.",
    "Turn on billing alerts before touching an autoscaler.",
    "Use IaC (Terraform, CDK) — clickops does not scale.",
    "Prefer managed data services unless you have a very good reason.",
    "Separate accounts/projects per environment (dev/stage/prod).",
    "Rotate credentials automatically; never bake keys into images.",
  ],
  "8. Debugging Tricks": [
    "Add a request ID to every log line — you'll thank yourself.",
    "Reproduce locally with a minimal test case before blaming the network.",
    "When in doubt, tcpdump. Actual bytes beat guessed behaviour.",
    "Bisect deploys with feature flags to isolate regressions.",
    "Sample profilers first, tracers second, breakpoints last.",
    "Keep a runbook for every alert; the pager is a bad classroom.",
  ],
  "9. Productivity Hacks": [
    "Timebox exploration; commit to a decision after 30 minutes.",
    "Kill meetings that lack an agenda and a decision.",
    "Batch context switches — one review session, not fifteen.",
    "Automate the second time you do anything manual.",
    "Keep a 'design decisions' doc; future you will forget.",
    "Prefer async written proposals to synchronous debates.",
  ],
  "10. Revision Strategies": [
    "Practice one canonical design per week for eight weeks.",
    "Review your last three whiteboard sessions for pattern gaps.",
    "Explain PACELC to a rubber duck once a month.",
    "Redraw the URL shortener from memory when bored.",
    "Turn every failure into a flashcard.",
  ],
  "11. Career Tips": [
    "Volunteer for on-call — nothing teaches faster.",
    "Own an incident retro; being humble in public is a career skill.",
    "Publish design docs internally — visibility compounds.",
    "Mentor one junior; you'll learn how to explain trade-offs.",
    "Find a staff engineer to review your designs quarterly.",
  ],
  "12. Final Advice": [
    "Simplicity is a feature. Ship the boring design that fits on a napkin.",
    "You cannot outrun bad requirements with good technology.",
    "Every system you build will be rebuilt — design for pleasant deletion.",
    "The best architects say 'I don't know' more often than juniors do.",
  ],
};

export const Route = createFileRoute("/_marketing/resources/read/sd-tips-tricks")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-tips-tricks" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Improve architecture thinking with lived shortcuts.</li>
          <li>Increase engineering productivity every week.</li>
          <li>Learn faster with focused revision techniques.</li>
          <li>Avoid the pitfalls that cost engineers weekends.</li>
          <li>Build professional System Design habits.</li>
        </ul>
      </Section>

      {Object.entries(TIPS).map(([title, items], idx) => {
        const id = `c${idx + 1}`;
        return (
          <Section id={id} title={title} key={id}>
            <ul className="list-disc space-y-1 pl-5">
              {items.map((t, i) => (<li key={i}>{t}</li>))}
            </ul>
            {idx === 2 && <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Architecture tips applied to a canonical high-level system diagram." />}
            {idx === 7 && <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Debugging workflow: sample profile → trace → isolate → fix → runbook." />}
          </Section>
        );
      })}

      <Section id="review" title="Tips Review">
        <h3 className="font-semibold">Top 100 tips</h3>
        <p>Everything above is roughly ranked by ROI — start at the top of each chapter and work down.</p>
        <h3 className="mt-3 font-semibold">Productivity checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Timebox decisions.</li>
          <li>Automate the second occurrence.</li>
          <li>Prefer async writing to synchronous meetings.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Interview tips sheet</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Clarify → estimate → draw → deepen → summarise.</li>
          <li>Every choice justified in one trade-off sentence.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Daily engineering checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>One diagram, one decision recorded, one runbook improved.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How is this different from Best Practices?">Best Practices tell you the ideal rule; Tips & Tricks tell you the shortcut and the reason engineers reach for it.</FAQItem>
        <FAQItem q="Should I apply every tip?">No — treat them as a menu. Adopt the ones that fit your context.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Runbook</strong> — a written procedure for handling a specific incident.</li>
          <li><strong>Single-flight</strong> — a primitive that ensures only one caller does the work while others wait.</li>
          <li><strong>Feature flag</strong> — a runtime switch to enable/disable code paths without redeploy.</li>
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
