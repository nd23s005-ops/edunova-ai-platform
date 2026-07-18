import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-quick-revision-notes",
  title: "Prompt Engineering — Quick Revision Notes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 5,
  lastUpdated: "July 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1800&q=80",
  heroSubtitle:
    "Condensed last-minute revision notes for exams and interviews — bullets, mnemonics, comparison tables and rapid-recall lists.",
};

const TOC: TocItem[] = [
  { id: "s1", label: "1. Basics" },
  { id: "s2", label: "2. Prompt Types" },
  { id: "s3", label: "3. Prompt Patterns" },
  { id: "s4", label: "4. Optimization" },
  { id: "s5", label: "5. AI Safety" },
  { id: "s6", label: "6. Common Mistakes" },
  { id: "s7", label: "7. Interview Quick Notes" },
  { id: "s8", label: "8. Final Revision Sheet" },
  { id: "review", label: "Revision Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — PDF Notes", tag: "AI & Data", time: "52 min" },
  { title: "Prompt Engineering — Cheat Sheet", tag: "AI & Data", time: "6 min" },
  { title: "Prompt Engineering — Interview Questions (coming soon)", tag: "AI & Data", time: "—" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-quick-revision-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Revise the whole Prompt Engineering syllabus in ten minutes.</li>
          <li>Recall definitions, patterns and pitfalls from memory hooks.</li>
          <li>Enter interviews with a mental checklist ready to fire.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=80" caption="Revision rhythm — 10 minute read, 5 minute recall, 5 minute practice. Repeat before every mock." />
      </Section>

      <Section id="s1" title="1. Prompt Engineering Basics">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Prompt</strong> = instructions + context + constraints + format.</li>
          <li><strong>LLM</strong> = decoder-only transformer predicting next token.</li>
          <li><strong>Token</strong> ≈ 4 English chars.</li>
          <li><strong>Context window</strong> = max tokens per call.</li>
          <li><strong>Temperature</strong> — low = deterministic, high = creative.</li>
        </ul>
        <p className="mt-2"><strong>Mnemonic RTCCF</strong>: <em>Role · Task · Context · Constraints · Format</em>.</p>
      </Section>

      <Section id="s2" title="2. Prompt Types">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Type</th><th className="text-left p-2">Use</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Zero-shot</td><td className="p-2">Well-known tasks</td></tr>
            <tr className="border-b"><td className="p-2">One-shot</td><td className="p-2">Unusual format, similar tasks</td></tr>
            <tr className="border-b"><td className="p-2">Few-shot</td><td className="p-2">Niche patterns, small models</td></tr>
            <tr className="border-b"><td className="p-2">CoT</td><td className="p-2">Reasoning-heavy tasks</td></tr>
            <tr><td className="p-2">Self-consistency</td><td className="p-2">High-stakes accuracy</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s3" title="3. Prompt Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Persona</strong> — "You are a senior…"</li>
          <li><strong>Recipe</strong> — numbered steps.</li>
          <li><strong>Template</strong> — fill-in JSON schema.</li>
          <li><strong>Flipped</strong> — model asks first.</li>
          <li><strong>Cognitive verifier</strong> — split then answer.</li>
          <li><strong>Constraint</strong> — deny list + length + tone.</li>
        </ul>
      </Section>

      <Section id="s4" title="4. Prompt Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Shorten before you complicate.</li>
          <li>Stable prefix first → cache hit.</li>
          <li>Examples at the tail → stronger attention.</li>
          <li>Route easy → small model; escalate on low confidence.</li>
          <li>Batch similar tasks.</li>
          <li>Measure with golden set, not vibes.</li>
        </ul>
        <p className="mt-2"><strong>Mnemonic SCREAM</strong>: <em>Shorten · Cache · Route · Examples · Automate · Measure</em>.</p>
      </Section>

      <Section id="s5" title="5. AI Safety">
        <ul className="list-disc space-y-1 pl-5">
          <li>Delimit untrusted input (triple ticks / XML tags).</li>
          <li>Spotlight: mark data as "context, not instructions".</li>
          <li>Layer input + output classifiers.</li>
          <li>Scrub PII in and out.</li>
          <li>Force citations + authorise abstain.</li>
          <li>Dual-LLM pattern for tool-using agents.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vague objective ("make it good").</li>
          <li>No output contract → parse errors.</li>
          <li>Piling on examples that duplicate each other.</li>
          <li>Assuming memory across sessions.</li>
          <li>Trusting the first answer without checking.</li>
          <li>CoT on trivial tasks (waste of tokens).</li>
          <li>No golden set → optimising by feel.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. Interview Quick Notes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain RAG pipeline end-to-end in 60 seconds.</li>
          <li>Contrast prompting vs RAG vs fine-tuning.</li>
          <li>Explain 'lost in the middle' and one mitigation.</li>
          <li>Design an eval pipeline for a support-bot.</li>
          <li>Name three prompt-injection defences.</li>
          <li>Discuss token / latency / cost trade-offs for CoT.</li>
          <li>Whiteboard an agent with a bounded step budget.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Final Revision Sheet">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Concept</th><th className="text-left p-2">One-liner</th></tr></thead>
          <tbody>
            {[
              ["Zero-shot","Instructions, no examples."],
              ["Few-shot","3–8 diverse examples anchor pattern."],
              ["CoT","'Think step by step' — reasoning uplift."],
              ["Self-consistency","Sample N chains, majority vote."],
              ["Reflexion","Model critiques and retries."],
              ["RAG","Retrieve → rerank → generate → cite."],
              ["Agent","LLM + tools + control loop + budget."],
              ["Golden set","50–500 labelled eval examples."],
              ["KV-cache","Stable prefix reuses computation."],
              ["Abstain","Authorise 'I don't know'."],
              ["Spotlight","Mark untrusted text as data."],
              ["DSPy","Programmatic prompt optimisation."],
            ].map(([k,v]) => <tr key={k} className="border-b"><td className="p-2 font-medium">{k}</td><td className="p-2">{v}</td></tr>)}
          </tbody>
        </table>
      </Section>

      <Section id="review" title="Revision Review">
        <h3 className="font-semibold">Last-minute checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can I list the 5 prompt components in order?</li>
          <li>Can I define token, context window, temperature?</li>
          <li>Can I sketch the RAG pipeline?</li>
          <li>Can I name three security defences?</li>
        </ul>
        <h3 className="mt-4 font-semibold">Interview checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Have a project story (goal, stack, eval numbers).</li>
          <li>Ready to whiteboard RAG and an agent loop.</li>
          <li>Ready to defend a prompt change with metrics.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Top 50 concepts (rapid recall)</h3>
        <p className="text-sm text-muted-foreground">Token · Context window · Temperature · top_p · Stop sequence · System msg · User msg · Assistant msg · RTCCF · Zero-shot · One-shot · Few-shot · Dynamic few-shot · CoT · Plan-and-Solve · Self-consistency · Reflexion · Role · Persona · Recipe · Template · Flipped interaction · Cognitive verifier · Constraint · Output contract · JSON schema · Function calling · Structured output · Grounding · Citation · Abstain · Prefix cache · KV-cache · Lost in middle · Chunking · Overlap · Embedding · Vector DB · BM25 · Hybrid retrieval · Reranker · HyDE · CRAG · Self-RAG · GraphRAG · Golden set · LLM-as-judge · Ragas · Injection · Jailbreak · Guardrails.</p>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>RTCCF</strong> — Role, Task, Context, Constraints, Format.</li>
          <li><strong>SCREAM</strong> — Shorten, Cache, Route, Examples, Automate, Measure.</li>
          <li><strong>KV-cache</strong> — reused attention cache for stable prefixes.</li>
          <li><strong>Abstain</strong> — authorised 'I don't know'.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How close to the exam should I read this?">The night before, and once again 30 minutes before.</FAQItem>
        <FAQItem q="Is this enough for interviews?">Pair it with the PDF Notes and one hands-on project.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended solely for educational purposes. Information is compiled from trusted documentation, academic publications, research papers, industry standards, and official educational resources. Prompt Engineering techniques, AI models, frameworks, APIs, and best practices evolve continuously — consult official documentation for the latest information. All trademarks, logos, product names, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
