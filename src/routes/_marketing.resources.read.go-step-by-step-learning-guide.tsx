import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-step-by-step-learning-guide",
  title: "Go — Step-by-Step Learning Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "27 min",
  pages: 30,
  lastUpdated: "February 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "A structured 8-week roadmap that takes a beginner to confident Go developer — with daily objectives, projects, and portfolio milestones.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Prerequisites" },
  { id: "s2", label: "2. Week 1 — Syntax & Basics" },
  { id: "s3", label: "3. Week 2 — Collections" },
  { id: "s4", label: "4. Week 3 — Structs & Interfaces" },
  { id: "s5", label: "5. Week 4 — Errors & Files" },
  { id: "s6", label: "6. Week 5 — Concurrency" },
  { id: "s7", label: "7. Week 6 — HTTP & REST" },
  { id: "s8", label: "8. Week 7 — Databases" },
  { id: "s9", label: "9. Week 8 — Testing & Deploy" },
  { id: "s10", label: "10. Portfolio" },
  { id: "s11", label: "11. Interview Prep" },
  { id: "s12", label: "12. Career Roadmap" },
  { id: "review", label: "Learning Guide Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Complete Tutorial", tag: "Programming", time: "55 min" },
  { title: "Go — Beginner Guide", tag: "Programming", time: "17 min" },
  { title: "Go — Quick Revision Notes", tag: "Programming", time: "6 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-step-by-step-learning-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-step-by-step-learning-guide" }],
  }),
  component: Page,
});

function WeekBlock({ n, theme, mon, tue, wed, thu, fri, project }: { n: number; theme: string; mon: string; tue: string; wed: string; thu: string; fri: string; project: string }) {
  return (
    <div className="my-4 rounded-2xl border border-border/60 bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Week {n}</p>
      <h3 className="mt-1 text-lg font-semibold">{theme}</h3>
      <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
        <li><strong>Mon:</strong> {mon}</li>
        <li><strong>Tue:</strong> {tue}</li>
        <li><strong>Wed:</strong> {wed}</li>
        <li><strong>Thu:</strong> {thu}</li>
        <li><strong>Fri:</strong> {fri}</li>
      </ul>
      <p className="mt-3 text-sm"><strong>Weekend project:</strong> {project}</p>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow a structured 8-week path from zero to shipping backends in Go.</li>
          <li>Complete one mini project every weekend to reinforce the week's topics.</li>
          <li>Track progress with checkpoints and readiness assessments.</li>
          <li>Build 3+ portfolio projects worth talking about in interviews.</li>
          <li>Understand what to learn <em>next</em> after this guide.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with any programming language (Python, JS, Java — anything).</li>
          <li>Familiarity with the terminal and Git basics.</li>
          <li>A code editor (VS Code recommended) and Go 1.22+ installed.</li>
        </ul>
        <Callout tone="tip" title="Time budget">Plan ~90 minutes on weekdays and a 3–4 hour block each weekend for the mini project.</Callout>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — A predictable daily loop beats sporadic marathons. Ship small, ship often." />
      </Section>

      <Section id="s2" title="2. Week 1 — Syntax & Basics">
        <WeekBlock n={1} theme="Syntax, variables, control flow"
          mon="Install Go; run Hello World" tue="Variables, constants, types"
          wed="If / for / switch" thu="Functions & multiple returns" fri="Packages & imports"
          project="CLI calculator with unit tests" />
      </Section>

      <Section id="s3" title="3. Week 2 — Collections">
        <WeekBlock n={2} theme="Arrays, slices, maps"
          mon="Arrays vs slices" tue="append, copy, cap" wed="Maps & lookups"
          thu="Iteration idioms" fri="strings + strconv" project="Word-frequency analyser" />
      </Section>

      <Section id="s4" title="4. Week 3 — Structs & Interfaces">
        <WeekBlock n={3} theme="Modelling data"
          mon="Struct literals" tue="Methods & receivers" wed="Interfaces"
          thu="Embedding" fri="Pointer semantics" project="In-memory task tracker" />
      </Section>

      <Section id="s5" title="5. Week 4 — Errors & Files">
        <WeekBlock n={4} theme="I/O and robustness"
          mon="Error values" tue="Wrapping (%w)" wed="os / io / bufio"
          thu="JSON encode/decode" fri="CSV & config files" project="Log-file analyser CLI" />
      </Section>

      <Section id="s6" title="6. Week 5 — Concurrency">
        <WeekBlock n={5} theme="Goroutines & channels"
          mon="go keyword" tue="Unbuffered channels" wed="Buffered channels & select"
          thu="sync package" fri="Race detector" project="Parallel web scraper" />
      </Section>

      <Section id="s7" title="7. Week 6 — HTTP & REST">
        <WeekBlock n={6} theme="Web services"
          mon="net/http basics" tue="Routing (chi)" wed="Middleware"
          thu="JSON APIs" fri="Auth & sessions" project="Notes REST API" />
      </Section>

      <Section id="s8" title="8. Week 7 — Databases">
        <WeekBlock n={7} theme="Persistence"
          mon="database/sql" tue="Postgres with pgx" wed="Migrations"
          thu="Repository pattern" fri="Query performance" project="Add Postgres to the notes API" />
      </Section>

      <Section id="s9" title="9. Week 8 — Testing & Deploy">
        <WeekBlock n={8} theme="Ship it"
          mon="Table tests" tue="Mocks & fakes" wed="Benchmarks & pprof"
          thu="Dockerfile" fri="Deploy to a container host" project="Production-ready release of the notes API" />
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Milestone: your Go service running in production behind HTTPS and observability." />
      </Section>

      <Section id="s10" title="10. Portfolio">
        <ul className="list-disc space-y-1 pl-5">
          <li>Notes REST API — full CRUD, tests, Docker.</li>
          <li>Parallel web scraper — showcases concurrency.</li>
          <li>Log analyser CLI — polished UX, static binary.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Interview Prep">
        <ul className="list-disc space-y-1 pl-5">
          <li>Channels vs mutexes — trade-offs.</li>
          <li>Memory model & the race detector.</li>
          <li>Error wrapping, sentinel errors, typed errors.</li>
          <li>Design a rate limiter; design a URL shortener.</li>
        </ul>
      </Section>

      <Section id="s12" title="12. Career Roadmap">
        <p>Junior → Mid → Senior Go engineer typically follows: language fluency → distributed systems → observability &amp; SRE practices → team leadership. Popular next steps: Kubernetes internals, gRPC, event-driven systems.</p>
      </Section>

      <Section id="review" title="Learning Guide Review">
        <h3 className="font-semibold">Weekly Tracker</h3>
        <p>Tick each Friday: did I ship the project? If not, roll the week over — don't skip.</p>
        <h3 className="mt-3 font-semibold">Milestone Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>✅ First static binary shipped.</li>
          <li>✅ First HTTP handler serving JSON.</li>
          <li>✅ First goroutine + channel pipeline.</li>
          <li>✅ First deployed container.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Readiness Assessment</h3>
        <p>You're interview-ready when you can build the notes API from scratch in under 4 hours with tests.</p>
        <h3 className="mt-3 font-semibold">Next Learning Path</h3>
        <p>Read the Go Complete Tutorial, then dive into distributed systems or a specialisation (data pipelines, cloud infra, DevTools).</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I compress this into 4 weeks?">Only if you can spend 4+ hours per day. Otherwise the material won't stick.</FAQItem>
        <FAQItem q="Do I need Linux?">No — macOS and Windows work fine, but Linux/WSL is closest to production.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Portfolio project</strong> — a runnable, documented artefact you can demo.</li>
          <li><strong>Milestone</strong> — an outcome that proves competence, not just time spent.</li>
          <li><strong>Race detector</strong> — Go's built-in tool to detect concurrent memory access bugs.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          Educational roadmap only. Adjust to your background and pace. Consult official Go
          documentation and community forums for current best practices. All trademarks belong
          to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
