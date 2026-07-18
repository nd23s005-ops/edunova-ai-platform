import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "figma-complete-tutorial",
  title: "Figma — Complete Tutorial",
  category: "Design",
  difficulty: "Beginner",
  readingTime: "43 min",
  pages: 90,
  lastUpdated: "October 2026",
  tags: ["Figma", "Design Systems", "Design"],
  heroImage: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1800&q=80",
  heroSubtitle: "Complete Figma tutorial: workspace, frames, Auto Layout, constraints, components, variants, design systems, variables, styles, typography, responsive UI, prototyping, Smart Animate, Dev Mode, plugins, accessibility, and collaboration.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Detailed Content" },
  { id: "ui", label: "UI Design Examples" },
  { id: "diagrams", label: "Workflow & Component Diagrams" },
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
  { title: "Figma — Complete Tutorial", tag: "Design", time: "43 min" },
  { title: "Figma — Cheat Sheet", tag: "Design", time: "4 min" },
  { title: "Figma — Interview Questions", tag: "Design", time: "29 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/figma-complete-tutorial")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/figma-complete-tutorial" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the concepts covered in Figma — Complete Tutorial.</li>
          <li>Build production-ready UI using Auto Layout, components, and variants.</li>
          <li>Design responsive interfaces and scalable design systems.</li>
          <li>Prototype interactions with Smart Animate and interactive components.</li>
          <li>Collaborate effectively with developers using Dev Mode.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Context</li>
          <li>Detailed Educational Content</li>
          <li>UI Design Examples</li>
          <li>Workflow & Component Diagrams</li>
          <li>Real-world Examples & Applications</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Tips, Comparisons & Summary</li>
          <li>FAQs, References & Disclaimer</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Complete Figma tutorial: workspace, frames, Auto Layout, constraints, components, variants, design systems, variables, styles, typography, responsive UI, prototyping, Smart Animate, Dev Mode, plugins, accessibility, and collaboration.</p>
        <Callout tone="info" title="Who this is for">Product designers, UI/UX designers, and developers who want to master Figma for shipping polished, accessible interfaces.</Callout>
        <Figure src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1400&q=80" caption="Figure 1 — Figma workspace: layers panel, canvas, and inspector for design systems." />
      </Section>

      <Section id="content" title="Detailed Educational Content">
        <p>Figma is a collaborative interface design tool used by product teams to design, prototype, and hand off UIs. This <b>Complete Tutorial</b> walks through the concepts you need most.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Frames & Pages</b> — organize screens and flows within a single file.</li>
          <li><b>Auto Layout</b> — flex-like layout with padding, gaps, and resizing modes.</li>
          <li><b>Components & Variants</b> — reusable primitives that scale across teams.</li>
          <li><b>Variables & Styles</b> — design tokens for color, spacing, and typography.</li>
          <li><b>Prototyping</b> — flows, overlays, Smart Animate, and interactive components.</li>
          <li><b>Dev Mode</b> — inspect, measure, and export developer-ready specs.</li>
        </ul>
      </Section>

      <Section id="ui" title="UI Design Examples">
        <Code>{`// Auto Layout starter — button component
Frame "Button/Primary"
  Auto Layout: horizontal, gap 8, padding 12x20
  Fill: token.color.primary
  Radius: token.radius.md
  Children:
    Icon 16x16 (optional)
    Text "Label" — token.text.button
Variants: state = {default, hover, pressed, disabled}, size = {sm, md, lg}`}</Code>
      </Section>

      <Section id="diagrams" title="Workflow & Component Diagrams">
        <Figure src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=80" caption="Figure 2 — Design system architecture: tokens → primitives → patterns → screens." />
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Research
  │
  ▼
Wireframes ──► Low-fi mockups ──► High-fi UI
                                       │
                                       ▼
                            Auto Layout + Components
                                       │
                                       ▼
                            Variables + Design System
                                       │
                                       ▼
                            Prototype ──► Usability test
                                       │
                                       ▼
                            Dev Mode ──► Developer Handoff`}
        </pre>
      </Section>

      <Section id="examples" title="Real-world Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Uber</b> — Base design system built and maintained in Figma.</li>
          <li><b>Microsoft</b> — Fluent 2 shipped as a Figma library across product teams.</li>
          <li><b>GitHub</b> — Primer design system components published as Figma libraries.</li>
          <li><b>Shopify</b> — Polaris tokens synced between Figma and code.</li>
          <li><b>Airbnb</b> — Cross-platform design language authored in Figma.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use Auto Layout on every reusable component — never fixed-size frames.</li>
          <li>Name layers and components consistently: <Code>Category/Name/Variant</Code>.</li>
          <li>Adopt variables/tokens for color, spacing, radius, and typography.</li>
          <li>Design mobile-first; add breakpoints with resizing constraints.</li>
          <li>Publish shared libraries; version releases via branching.</li>
          <li>Design for accessibility: contrast, focus states, and touch targets.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Detaching components instead of creating variants or properties.</li>
          <li>Hard-coded colors and spacing that bypass tokens.</li>
          <li>Broken Auto Layout because children have absolute positioning.</li>
          <li>Prototype flows that break when frames are renamed or duplicated.</li>
          <li>Unlabeled interactive elements — hostile to screen readers.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li><Code>Shift + A</Code> wraps a selection in Auto Layout.</li>
          <li><Code>Alt/Option + drag</Code> duplicates instantly; hold <Code>Shift</Code> to constrain.</li>
          <li>Use component properties (boolean, text, instance swap) instead of many variants.</li>
          <li>Smart Animate matching layer names creates seamless transitions.</li>
          <li>Use Dev Mode's <Code>Inspect</Code> for CSS, iOS, and Android snippets.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Feature</th>
                <th className="py-2 pr-4">Figma</th>
                <th className="py-2 pr-4">Sketch</th>
                <th className="py-2">Adobe XD</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Realtime collaboration</td><td>Native</td><td>Plugin</td><td>Limited</td></tr>
              <tr><td className="py-2 pr-4">Auto Layout</td><td>Advanced</td><td>Basic</td><td>Basic</td></tr>
              <tr><td className="py-2 pr-4">Variables & tokens</td><td>Yes</td><td>Limited</td><td>No</td></tr>
              <tr><td className="py-2 pr-4">Dev handoff</td><td>Dev Mode</td><td>Inspect</td><td>Share link</td></tr>
              <tr><td className="py-2 pr-4">Platforms</td><td>Web + desktop</td><td>macOS only</td><td>Discontinued</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Figma unifies design, prototyping, and developer handoff in one tool.</li>
          <li>Auto Layout + components + variables are the foundation of scalable UI.</li>
          <li>Design systems are the leverage that makes teams ship faster.</li>
          <li>Accessibility and responsive design are non-negotiable defaults.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is Figma free?">Figma has a generous free tier for individuals and small teams; paid plans unlock unlimited files and advanced features.</FAQItem>
        <FAQItem q="Do I need a design background?">No — beginners can start with the interface tour and grow through structured practice.</FAQItem>
        <FAQItem q="Figma vs Sketch vs XD?">Figma leads on collaboration, cross-platform support, and Auto Layout maturity.</FAQItem>
        <FAQItem q="What is Dev Mode?">A dedicated inspector for developers to read specs, tokens, and code snippets from the design file.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://help.figma.com/" target="_blank" rel="noreferrer">Figma Help Center — official docs</a></li>
          <li><a className="text-primary hover:underline" href="https://www.figma.com/best-practices/" target="_blank" rel="noreferrer">Figma Best Practices</a></li>
          <li><a className="text-primary hover:underline" href="https://www.figma.com/community" target="_blank" rel="noreferrer">Figma Community — free files & plugins</a></li>
          <li><a className="text-primary hover:underline" href="https://www.designsystems.com/" target="_blank" rel="noreferrer">DesignSystems.com — patterns & articles</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is educational and reflects widely accepted Figma workflows as of the last updated date. Interfaces and features change; always verify against the latest official Figma documentation.</p>
      </Section>
    </ReaderShell>
  );
}
