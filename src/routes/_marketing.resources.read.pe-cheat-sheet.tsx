import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-cheat-sheet",
  title: "Prompt Engineering — Cheat Sheet",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "6 min",
  pages: 3,
  lastUpdated: "January 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1800&q=80",
  heroSubtitle:
    "Printable one-page Prompt Engineering reference — syntax, templates, patterns, optimization checklist and debugging shortcuts.",
};

const TOC: TocItem[] = [
  { id: "s1", label: "1. Prompt Structure" },
  { id: "s2", label: "2. Prompt Components" },
  { id: "s3", label: "3. Prompt Templates" },
  { id: "s4", label: "4. Prompt Patterns" },
  { id: "s5", label: "5. Optimization" },
  { id: "s6", label: "6. Debugging" },
  { id: "s7", label: "7. AI Safety Checklist" },
  { id: "s8", label: "8. Quick Commands" },
  { id: "review", label: "Cheat Sheet Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — PDF Notes", tag: "AI & Data", time: "52 min" },
  { title: "Prompt Engineering — Quick Revision Notes", tag: "AI & Data", time: "10 min" },
  { title: "Prompt Engineering — Reference Guide", tag: "AI & Data", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-cheat-sheet")({
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
          <li>Look up Prompt Engineering syntax and structures in under 30 seconds.</li>
          <li>Reuse ready-made templates without re-inventing them each day.</li>
          <li>Run the same debugging + safety checks every time you ship a prompt.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=1600&q=80" caption="Cheat-sheet workflow — pick a template, tweak, run, verify with the checklist." />
      </Section>

      <Section id="s1" title="1. Prompt Structure">
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`[ROLE]        You are a {role}.
[OBJECTIVE]   {one-sentence goal}
[CONTEXT]     """{data or documents}"""
[CONSTRAINTS] - Word limit / tone
              - Deny list
              - Must cite sources
[OUTPUT]      Return JSON: {schema}`}</pre>
      </Section>

      <Section id="s2" title="2. Prompt Components">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Slot</th><th className="text-left p-2">Purpose</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">System</td><td className="p-2">Identity + durable rules</td></tr>
            <tr className="border-b"><td className="p-2">User</td><td className="p-2">Current objective</td></tr>
            <tr className="border-b"><td className="p-2">Context</td><td className="p-2">Retrieved data / prior turns</td></tr>
            <tr className="border-b"><td className="p-2">Examples</td><td className="p-2">Pattern anchors</td></tr>
            <tr><td className="p-2">Output</td><td className="p-2">Schema / format contract</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s3" title="3. Prompt Templates">
        <h3 className="font-semibold">Summarise</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Summarise the text below in {n} bullets. Preserve numbers.\nText: """{doc}"""`}</pre>
        <h3 className="mt-3 font-semibold">Extract (JSON)</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Extract per schema. Return null for missing.\nSchema: {invoice, total, currency, due}\nDoc: """{text}"""`}</pre>
        <h3 className="mt-3 font-semibold">Classify</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Classify into ONE label: [bug, billing, feature, other].\nReturn: {"label": string, "confidence": 0..1}\nTicket: """{text}"""`}</pre>
        <h3 className="mt-3 font-semibold">Role + Reasoning</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`You are a senior data analyst. Think step by step, then answer.\nQuestion: {q}\nEvidence: """{tables}"""`}</pre>
        <h3 className="mt-3 font-semibold">Grounded Q&amp;A</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Answer ONLY from the numbered chunks. If unsure, say "I don't know".\n[1] ...\n[2] ...\nQuestion: {q}\nReturn: {"answer": string, "citations": number[]}`}</pre>
      </Section>

      <Section id="s4" title="4. Prompt Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Persona</strong> — "Act as a…"</li>
          <li><strong>Recipe</strong> — numbered steps.</li>
          <li><strong>Template</strong> — fill schema.</li>
          <li><strong>Flipped</strong> — model asks first.</li>
          <li><strong>Cognitive verifier</strong> — split then solve.</li>
          <li><strong>Reflection</strong> — critique and retry.</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Optimization Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>☐ Prompt shorter than yesterday's version.</li>
          <li>☐ Stable prefix first (KV-cache).</li>
          <li>☐ Examples at the tail.</li>
          <li>☐ JSON schema enforced.</li>
          <li>☐ Small model for easy calls; escalation set up.</li>
          <li>☐ Golden set score logged.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. Debugging Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>☐ Wrong format? — enforce schema / function calling.</li>
          <li>☐ Hallucinating? — add grounding + citations + abstain.</li>
          <li>☐ Ignoring instructions? — move rules to system message.</li>
          <li>☐ Verbose? — set word / bullet limit.</li>
          <li>☐ Slow? — cut CoT or move to smaller model.</li>
          <li>☐ Inconsistent? — lower temperature or add self-consistency.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. AI Safety Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>☐ Untrusted input delimited (```or &lt;data&gt;).</li>
          <li>☐ Spotlight applied: 'context, not instructions'.</li>
          <li>☐ Input + output classifiers wired.</li>
          <li>☐ PII scrubbed from logs.</li>
          <li>☐ Tool calls behind allow-list + budget.</li>
          <li>☐ Red-team suite run before rollout.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Quick Commands">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Want</th><th className="text-left p-2">Say</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Shorter answer</td><td className="p-2">"Answer in ≤ 40 words."</td></tr>
            <tr className="border-b"><td className="p-2">Reasoning</td><td className="p-2">"Think step by step, then answer."</td></tr>
            <tr className="border-b"><td className="p-2">JSON only</td><td className="p-2">"Return only valid JSON matching the schema."</td></tr>
            <tr className="border-b"><td className="p-2">Cite sources</td><td className="p-2">"Cite each claim with [n]."</td></tr>
            <tr className="border-b"><td className="p-2">Say IDK</td><td className="p-2">"If unsure, reply 'I don't know'."</td></tr>
            <tr className="border-b"><td className="p-2">Deterministic</td><td className="p-2">"temperature = 0"</td></tr>
            <tr><td className="p-2">Retry safely</td><td className="p-2">"Critique your last answer, then rewrite."</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="review" title="Cheat Sheet Review">
        <h3 className="font-semibold">Printable one-page summary</h3>
        <p>Structure · Components · Templates · Patterns · Optimization · Debugging · Safety · Commands. Print landscape, keep by the keyboard.</p>
        <h3 className="mt-4 font-semibold">Top 100 prompt keywords</h3>
        <p className="text-sm text-muted-foreground">
          role · persona · objective · context · constraint · deny list · tone · style · length · format · schema · JSON · YAML · table · bullets · summarise · extract · classify · translate · rewrite · rephrase · expand · contract · outline · draft · edit · critique · retry · reflect · plan · step by step · think · reason · chain of thought · self-consistency · reflexion · few-shot · one-shot · zero-shot · example · template · anchor · delimiter · triple quote · tag · XML · spotlight · untrusted · injection · jailbreak · guardrail · classifier · PII · redact · scrub · citation · grounding · abstain · confidence · uncertainty · calibration · temperature · top_p · top_k · penalty · stop · seed · deterministic · cache · KV-cache · prefix · suffix · budget · token · latency · cost · route · escalate · batch · stream · function · tool · agent · loop · plan · execute · observe · reflect · memory · scratchpad · episodic · semantic · retrieval · embed · chunk · overlap · rerank · BM25 · dense · hybrid · vector DB · index · pipeline · eval · golden set · Ragas · LLM judge · pairwise · rollout · canary.
        </p>
        <h3 className="mt-4 font-semibold">Common prompt patterns (recap)</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Persona · Recipe · Template · Flipped · Cognitive verifier · Reflection · Constraint.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Daily reference guide</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Start from the right template above.</li>
          <li>Fill in role, objective, context, constraints, output.</li>
          <li>Run once, verify with the debugging checklist.</li>
          <li>Ship only after the safety checklist passes.</li>
        </ol>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Template</strong> — reusable prompt with slots.</li>
          <li><strong>Pattern</strong> — named prompt shape.</li>
          <li><strong>Checklist</strong> — ordered verification steps.</li>
          <li><strong>Abstain</strong> — authorised 'I don't know'.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Should I print this?">Yes — landscape A4 / Letter fits everything on one to three pages.</FAQItem>
        <FAQItem q="Can I fork it?">Absolutely. Adapt the templates to your product's tone and schemas.</FAQItem>
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
