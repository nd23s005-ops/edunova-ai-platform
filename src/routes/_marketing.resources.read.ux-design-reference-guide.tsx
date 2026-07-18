import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ux-design-reference-guide",
  title: "UX Design — Reference Guide",
  category: "Design",
  difficulty: "Beginner",
  readingTime: "30 min",
  pages: 52,
  lastUpdated: "April 2026",
  tags: ["UX", "Research", "Design"],
  heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1800&q=80",
  heroSubtitle: "Comprehensive UX Design reference handbook covering processes, research methods, usability heuristics, personas, journey mapping, information architecture, user flows, wireframing, prototyping, accessibility guidelines, and metrics.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Detailed Content" },
  { id: "process", label: "UX Process & Journey Maps" },
  { id: "wireframes", label: "Wireframe Examples" },
  { id: "examples", label: "Real-world Examples" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "UX Design — Complete Tutorial", tag: "Design", time: "55 min" },
  { title: "UX Design — Cheat Sheet", tag: "Design", time: "5 min" },
  { title: "UX Design — Interview Questions", tag: "Design", time: "31 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ux-design-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/ux-design-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the concepts covered in UX Design — Reference Guide.</li>
          <li>Apply user-centered design and design-thinking methods.</li>
          <li>Conduct research, build personas, and map user journeys.</li>
          <li>Design wireframes, prototypes, and accessible interactions.</li>
          <li>Validate designs with usability testing and analytics.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & UX Foundations</li>
          <li>Detailed Educational Content</li>
          <li>UX Process & User Journey Maps</li>
          <li>Wireframe Examples</li>
          <li>Real-world Examples & Applications</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Tips, Comparisons & Summary</li>
          <li>FAQs, References & Disclaimer</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Comprehensive UX Design reference handbook covering processes, research methods, usability heuristics, personas, journey mapping, information architecture, user flows, wireframing, prototyping, accessibility guidelines, and metrics.</p>
        <Callout tone="info" title="Who this is for">Aspiring UX designers, product designers, researchers, and developers who want to ship user-friendly, accessible products.</Callout>
        <Figure src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1400&q=80" caption="Figure 1 — The UX process: research, ideate, design, prototype, test, and iterate." />
      </Section>

      <Section id="content" title="Detailed Educational Content">
        <p>UX Design is the practice of making products useful, usable, and desirable by grounding decisions in real user needs. This <b>Reference Guide</b> walks through the concepts you need most.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>User Research</b> — interviews, surveys, diary studies, and analytics.</li>
          <li><b>Personas & Journey Maps</b> — represent users and their end-to-end experience.</li>
          <li><b>Information Architecture</b> — sitemaps, card sorting, and taxonomy.</li>
          <li><b>Wireframes & Prototypes</b> — low- and high-fidelity artifacts for testing.</li>
          <li><b>Usability Testing</b> — moderated and unmoderated evaluations.</li>
          <li><b>Accessibility</b> — WCAG 2.2, contrast, focus order, and screen readers.</li>
        </ul>
      </Section>

      <Section id="process" title="UX Process & User Journey Maps">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Discover ──► Define ──► Ideate ──► Prototype ──► Test ──► Ship
    │            │           │            │           │
Research   Personas    Sketches     Wireframes   Usability
Interviews Journeys    Concepts     Hi-fi UI     Analytics`}
        </pre>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Stage</th>
                <th className="py-2 pr-4">Emotion</th>
                <th className="py-2 pr-4">Pain Points</th>
                <th className="py-2">Opportunities</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Awareness</td><td>Curious</td><td>Unclear value</td><td>Sharper messaging</td></tr>
              <tr><td className="py-2 pr-4">Consideration</td><td>Skeptical</td><td>Comparison friction</td><td>Social proof</td></tr>
              <tr><td className="py-2 pr-4">Onboarding</td><td>Anxious</td><td>Too many steps</td><td>Progressive disclosure</td></tr>
              <tr><td className="py-2 pr-4">Adoption</td><td>Focused</td><td>Empty states</td><td>Contextual guidance</td></tr>
              <tr><td className="py-2 pr-4">Advocacy</td><td>Delighted</td><td>No referral loop</td><td>Sharing rewards</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="wireframes" title="Wireframe Examples">
        <Figure src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80" caption="Figure 2 — Wireframe fidelity ladder: sketch → low-fi → hi-fi → interactive prototype." />
        <Code>{`// Low-fi wireframe skeleton (annotation format)
Screen: Dashboard
  ├─ Header: Logo · Search · Avatar
  ├─ Sidebar: Home · Projects · Reports · Settings
  ├─ Main
  │    ├─ Greeting + Primary CTA (Create)
  │    ├─ KPI cards (4 up)
  │    ├─ Recent activity list
  │    └─ Empty state (illustration + CTA)
  └─ Footer: Help · Docs · Status
Notes:
  - Primary CTA must be reachable in <=1 tab-stop from logo
  - KPIs use color + text label (never color alone)
  - Empty state includes screen-reader description`}</Code>
      </Section>

      <Section id="examples" title="Real-world Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Airbnb</b> — journey mapping and photography drove trust and bookings.</li>
          <li><b>Duolingo</b> — behavioral loops and streaks lift retention.</li>
          <li><b>Slack</b> — onboarding via a friendly bot reduced time-to-value.</li>
          <li><b>Google Search</b> — decades of usability testing on a "simple" box.</li>
          <li><b>Apple</b> — accessibility features designed as first-class product surfaces.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Start every project with research — never assume the user's problem.</li>
          <li>Design for accessibility from day one (WCAG 2.2 AA minimum).</li>
          <li>Wireframe before visual design; validate flows early and cheaply.</li>
          <li>Test with 5 users per round; iterate weekly, not quarterly.</li>
          <li>Write UX copy as part of the design, not an afterthought.</li>
          <li>Instrument key flows with analytics to close the loop after launch.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Skipping research and designing from assumptions.</li>
          <li>Personas that describe demographics instead of goals and behaviors.</li>
          <li>Navigation that reflects the org chart, not the user's mental model.</li>
          <li>Color-only status signals that fail accessibility.</li>
          <li>Prototypes tested on the design team instead of real users.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use the "5 whys" to move from a feature request to the real user need.</li>
          <li>Run rainbow-spreadsheet analysis to synthesize interview notes fast.</li>
          <li>Prototype the risky flow first — everything else can wait.</li>
          <li>Ask "compared to what?" for every metric to avoid vanity numbers.</li>
          <li>Record usability sessions; play clips in stakeholder reviews.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Method</th>
                <th className="py-2 pr-4">Type</th>
                <th className="py-2 pr-4">Best For</th>
                <th className="py-2">Effort</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">User Interviews</td><td>Qualitative</td><td>Discover needs & motivations</td><td>Medium</td></tr>
              <tr><td className="py-2 pr-4">Surveys</td><td>Quantitative</td><td>Validate scale</td><td>Low</td></tr>
              <tr><td className="py-2 pr-4">Usability Test</td><td>Qualitative</td><td>Find task-level friction</td><td>Medium</td></tr>
              <tr><td className="py-2 pr-4">A/B Test</td><td>Quantitative</td><td>Compare live variants</td><td>High</td></tr>
              <tr><td className="py-2 pr-4">Analytics</td><td>Quantitative</td><td>Behavior at scale</td><td>Low</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Great UX starts with empathy and ends with measurable outcomes.</li>
          <li>Research, prototype, and test — cheap, often, and with real users.</li>
          <li>Accessibility isn't optional; it's the baseline of good design.</li>
          <li>Design systems and documentation scale UX across teams.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need a design degree?">No — many UX designers are self-taught. A strong portfolio beats a certificate.</FAQItem>
        <FAQItem q="UX vs UI vs Product Design?">UX focuses on the experience and research; UI on visuals and interaction; Product design blends both with business goals.</FAQItem>
        <FAQItem q="How many users for a usability test?">Five users typically uncover ~80% of major issues; iterate across rounds.</FAQItem>
        <FAQItem q="What tools should I learn first?">Figma for design, Maze/Lookback for testing, and a note-taking tool for research synthesis.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.nngroup.com/" target="_blank" rel="noreferrer">Nielsen Norman Group — UX research & articles</a></li>
          <li><a className="text-primary hover:underline" href="https://www.interaction-design.org/" target="_blank" rel="noreferrer">Interaction Design Foundation</a></li>
          <li><a className="text-primary hover:underline" href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noreferrer">W3C — WCAG accessibility guidelines</a></li>
          <li><a className="text-primary hover:underline" href="https://www.smashingmagazine.com/category/ux/" target="_blank" rel="noreferrer">Smashing Magazine — UX articles</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is educational and reflects widely accepted UX practices as of the last updated date. Methods and standards evolve; always validate against current WCAG guidance and user research.</p>
      </Section>
    </ReaderShell>
  );
}
