import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-learning-roadmap",
  title: "Go — Learning Roadmap",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "7 min",
  pages: 12,
  lastUpdated: "July 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "A structured Go learning path from beginner to advanced — weekly milestones, projects, certifications, and a career progression map.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Weekly Roadmap" },
  { id: "s2", label: "2. Monthly Roadmap" },
  { id: "s3", label: "3. Skill Milestones" },
  { id: "s4", label: "4. Coding Challenges" },
  { id: "s5", label: "5. Backend Projects" },
  { id: "s6", label: "6. Certifications" },
  { id: "s7", label: "7. Books" },
  { id: "s8", label: "8. Portfolio" },
  { id: "s9", label: "9. Career Roadmap" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Frequently Asked Questions", tag: "Programming", time: "14 min" },
  { title: "Go — Step-by-Step Learning Guide", tag: "Programming", time: "18 min" },
  { title: "Go — Tips & Tricks", tag: "Programming", time: "10 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-learning-roadmap" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Learn Go in a structured, week-by-week fashion.</li>
          <li>Build a portfolio that gets interviews.</li>
          <li>Progress from junior → senior with clear milestones.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Weekly Roadmap (8 Weeks)">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Week</th><th className="p-2 text-left">Focus</th><th className="p-2 text-left">Output</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">1</td><td className="p-2">Syntax, types, control flow</td><td className="p-2">CLI calculator</td></tr>
            <tr className="border-b"><td className="p-2">2</td><td className="p-2">Slices, maps, structs</td><td className="p-2">JSON parser</td></tr>
            <tr className="border-b"><td className="p-2">3</td><td className="p-2">Packages, modules, testing</td><td className="p-2">Reusable lib + tests</td></tr>
            <tr className="border-b"><td className="p-2">4</td><td className="p-2">Goroutines, channels</td><td className="p-2">Concurrent scraper</td></tr>
            <tr className="border-b"><td className="p-2">5</td><td className="p-2">HTTP server, JSON APIs</td><td className="p-2">Todo API</td></tr>
            <tr className="border-b"><td className="p-2">6</td><td className="p-2">Database (Postgres)</td><td className="p-2">Persist Todo API</td></tr>
            <tr className="border-b"><td className="p-2">7</td><td className="p-2">Auth, middleware, observability</td><td className="p-2">Prod-ready service</td></tr>
            <tr><td className="p-2">8</td><td className="p-2">Deployment + CI</td><td className="p-2">Live on cloud</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go learning roadmap: linear early, branches into specializations after week 8." />
      </Section>

      <Section id="s2" title="2. Monthly Roadmap (6 Months)">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Month 1-2:</strong> Foundations + first API.</li>
          <li><strong>Month 3:</strong> Concurrency deep-dive + worker pools.</li>
          <li><strong>Month 4:</strong> Databases, migrations, transactions.</li>
          <li><strong>Month 5:</strong> Testing, profiling, deployment.</li>
          <li><strong>Month 6:</strong> Capstone project + interview prep.</li>
        </ul>
      </Section>

      <Section id="s3" title="3. Skill Milestones">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Write idiomatic Go without gofmt warnings.</li>
          <li>Ship a REST API with tests and CI.</li>
          <li>Debug a race condition with <code>-race</code>.</li>
          <li>Profile with <code>pprof</code> and reduce allocations.</li>
          <li>Deploy a Go service to production.</li>
        </ol>
      </Section>

      <Section id="s4" title="4. Coding Challenges">
        <ul className="list-disc space-y-1 pl-5">
          <li>Exercism — Go track.</li>
          <li>LeetCode in Go.</li>
          <li>Advent of Code with concurrency.</li>
          <li>Gophercises (gophercises.com-style problems).</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Backend Projects">
        <ol className="list-decimal space-y-1 pl-5">
          <li>URL shortener with Redis.</li>
          <li>Auth-enabled Todo API.</li>
          <li>Real-time chat with WebSockets.</li>
          <li>Job queue with workers.</li>
          <li>Distributed rate limiter.</li>
        </ol>
      </Section>

      <Section id="s6" title="6. Certifications">
        <p>None are strictly required. HashiCorp Terraform Associate + AWS/GCP certs pair well with Go for cloud roles.</p>
      </Section>

      <Section id="s7" title="7. Books">
        <ul className="list-disc space-y-1 pl-5">
          <li><em>The Go Programming Language</em> — Donovan & Kernighan.</li>
          <li><em>Learning Go</em> — Jon Bodner.</li>
          <li><em>100 Go Mistakes</em> — Teiva Harsanyi.</li>
          <li><em>Concurrency in Go</em> — Katherine Cox-Buday.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Career progression: engineer → senior → staff, with expanding scope of impact." />
      </Section>

      <Section id="s8" title="8. Portfolio">
        <p>3 polished repos beat 10 half-baked. Every repo: README, tests, CI badge, deployed demo, 2-minute video walkthrough.</p>
      </Section>

      <Section id="s9" title="9. Career Roadmap">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Level</th><th className="p-2 text-left">Focus</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Junior (0-2y)</td><td className="p-2">Ship features, learn idioms</td></tr>
            <tr className="border-b"><td className="p-2">Mid (2-5y)</td><td className="p-2">Own services, mentor juniors</td></tr>
            <tr className="border-b"><td className="p-2">Senior (5y+)</td><td className="p-2">Architecture, cross-team impact</td></tr>
            <tr><td className="p-2">Staff+</td><td className="p-2">Multi-service systems, tech strategy</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Consistency beats intensity — 45 min/day for 6 months makes a competent Go backend engineer.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I skip concurrency?">No — it's Go's headline feature.</FAQItem>
        <FAQItem q="Do I need Docker?">Yes, at least for Postgres in dev and containerised deploys.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Capstone</strong> — final portfolio-worthy project.</li>
          <li><strong>Idiomatic</strong> — matches community conventions.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Adapt the pace to your schedule. Consistency &gt; speed.</p>
      </Section>
    </ReaderShell>
  );
}
