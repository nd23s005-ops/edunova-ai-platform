import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-real-world-case-study",
  title: "Prompt Engineering — Real-world Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "23 min",
  pages: 27,
  lastUpdated: "October 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle:
    "How MeridianBank shipped a Prompt-Engineering-driven advisor assistant — full lifecycle from business problem to production, monitoring, and measurable ROI.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "exec", label: "Executive Summary" },
  { id: "s1", label: "1. Company Overview" },
  { id: "s2", label: "2. Business Problem" },
  { id: "s3", label: "3. Business Goals" },
  { id: "s4", label: "4. Requirements Analysis" },
  { id: "s5", label: "5. AI Solution Design" },
  { id: "s6", label: "6. Prompt Engineering Strategy" },
  { id: "s7", label: "7. Prompt Iterations" },
  { id: "s8", label: "8. System Architecture" },
  { id: "s9", label: "9. AI Workflow" },
  { id: "s10", label: "10. Evaluation Strategy" },
  { id: "s11", label: "11. Deployment" },
  { id: "s12", label: "12. Monitoring" },
  { id: "s13", label: "13. Business Outcomes" },
  { id: "s14", label: "14. Lessons Learned" },
  { id: "s15", label: "15. Future Improvements" },
  { id: "review", label: "Case Study Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Best Practices", tag: "AI & Data", time: "13 min" },
  { title: "Prompt Engineering — Common Mistakes", tag: "AI & Data", time: "12 min" },
  { title: "Prompt Engineering — Project Case Study", tag: "AI & Data", time: "23 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { property: "og:url", content: "/resources/read/pe-real-world-case-study" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/pe-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand how Prompt Engineering operates in a regulated production environment.</li>
          <li>Learn the full enterprise AI lifecycle from business framing to ROI.</li>
          <li>Study prompt-iteration strategy tied to measurable metrics.</li>
          <li>Analyse trade-offs made under compliance, cost, and latency constraints.</li>
          <li>Quantify business impact and post-launch improvement.</li>
        </ul>
      </Section>

      <Section id="exec" title="Executive Summary">
        <Callout tone="info" title="Case profile">
          <strong>Company:</strong> MeridianBank (retail bank, 7.4M customers, EU + UK)<br />
          <strong>Product:</strong> "AskMeridian" — an in-app advisor assistant for account holders<br />
          <strong>Team:</strong> 9 people (2 PE leads, 2 backend, 2 ML, 1 PM, 1 UX, 1 compliance)<br />
          <strong>Timeline:</strong> 14 weeks discovery-to-GA<br />
          <strong>Outcome:</strong> −41% call-centre volume for target flows, +23 NPS, £4.6M annual saving
        </Callout>
        <p>MeridianBank replaced the top 32 self-service call-centre intents with a Prompt-Engineered advisor that answers with grounded citations, escalates when confidence is low, and produces regulator-ready audit trails. This case study documents the business framing, prompt evolution, architecture, and post-launch impact.</p>
      </Section>

      <Section id="s1" title="1. Company Overview">
        <p>MeridianBank is a mid-sized retail bank operating in 6 countries, with a strong mobile channel (68% of interactions). The Digital Advisor squad owns in-app help across 41 intent categories and reports to the Chief Customer Officer with a dotted line to Group Compliance.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Mobile MAU: 4.9M · Web MAU: 1.6M</li>
          <li>Existing chatbot: rule-based, 27% deflection rate, no generative capability.</li>
          <li>Regulatory scope: FCA, BaFin, MFSA — with strict guidance on advice vs information.</li>
        </ul>
      </Section>

      <Section id="s2" title="2. Business Problem">
        <p>Call-centre volume grew 18% YoY while satisfaction dropped 9 points. Analysis showed 61% of calls resolved by reading a policy paragraph — customers could not find it in-app. Legacy chatbot could not summarise policy or personalise answers. Compliance forbade "advice-shaped" outputs, so any AI solution had to distinguish <em>information</em> (permitted) from <em>advice</em> (restricted).</p>
      </Section>

      <Section id="s3" title="3. Business Goals">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reduce inbound call volume for the top 32 intents by ≥ 30% within 6 months.</li>
          <li>Improve in-app help NPS by ≥ 15 points.</li>
          <li>Cost per resolved query ≤ £0.05.</li>
          <li>Zero compliance breaches on the advice/information boundary.</li>
          <li>P95 response latency &lt; 4 seconds.</li>
        </ul>
      </Section>

      <Section id="s4" title="4. Requirements Analysis">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Stakeholder</th><th className="text-left p-2">Requirement</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Customers</td><td className="p-2">Answers grounded in real policy, plain-English, one screen.</td></tr>
            <tr className="border-b"><td className="p-2">Advisors</td><td className="p-2">Escalation with full context + drafted reply.</td></tr>
            <tr className="border-b"><td className="p-2">Compliance</td><td className="p-2">Traceable prompts, no advice-shaped output, audit log.</td></tr>
            <tr className="border-b"><td className="p-2">Security</td><td className="p-2">EU residency, no PII in third-party logs, injection defence.</td></tr>
            <tr className="border-b"><td className="p-2">Finance</td><td className="p-2">Per-query cost target, forecastable monthly spend.</td></tr>
            <tr><td className="p-2">Engineering</td><td className="p-2">Rollback in ≤ 5 min, prompt registry, observability.</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s5" title="5. AI Solution Design">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Grounded QA</strong> over a curated policy corpus (2,140 documents, versioned).</li>
          <li><strong>Three-stage prompt pipeline</strong>: intent classify → grounded draft → compliance judge.</li>
          <li><strong>Advice-vs-information classifier</strong> as a hard gate before generation.</li>
          <li><strong>Human-in-the-loop escalation</strong> whenever confidence &lt; 0.78 or compliance judge flags.</li>
          <li><strong>Region-pinned inference</strong> per tenant country to satisfy residency.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80" caption="AskMeridian pipeline — classify, ground, judge, and escalate with full observability." />
      </Section>

      <Section id="s6" title="6. Prompt Engineering Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompts owned as code in a git-backed registry with semantic diffing.</li>
          <li>System prompt fixes role, refusal policy, and format; user prompt supplies question only.</li>
          <li>RAG chunks injected inside XML delimiters for spotlighting.</li>
          <li>Every generation forced to cite ≥ 1 source ID; missing citation → auto-retry then escalate.</li>
          <li>Compliance-sensitive vocabulary (recommend, advise, should) triggers judge review.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. Prompt Iterations">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Version</th><th className="text-left p-2">Change</th><th className="text-left p-2">Eval Δ</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">v1</td><td className="p-2">Zero-shot Q&amp;A, no grounding</td><td className="p-2">baseline 0.54 faithfulness</td></tr>
            <tr className="border-b"><td className="p-2">v2</td><td className="p-2">+ hybrid RAG (top-6)</td><td className="p-2">+0.19</td></tr>
            <tr className="border-b"><td className="p-2">v3</td><td className="p-2">+ forced citations + JSON schema</td><td className="p-2">+0.08</td></tr>
            <tr className="border-b"><td className="p-2">v4</td><td className="p-2">+ compliance judge prompt</td><td className="p-2">breaches −92%</td></tr>
            <tr className="border-b"><td className="p-2">v5</td><td className="p-2">+ advice/info gate</td><td className="p-2">precision +0.06 · latency +180ms</td></tr>
            <tr className="border-b"><td className="p-2">v6</td><td className="p-2">Prompt caching + prefix reorder</td><td className="p-2">cost −34%</td></tr>
            <tr><td className="p-2">v7</td><td className="p-2">Dynamic few-shot per country</td><td className="p-2">tone score +0.11</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s8" title="8. System Architecture">
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Mobile / Web
  ↓
API Gateway ── Auth · Rate-limit · Region routing (FCA / BaFin / MFSA)
  ↓
Advice-vs-Info Gate ── refuse or continue
  ↓
Prompt Service ── registry v3.7 · feature flags
  ↓
LLM Router ── small (classify) → mid (draft) → judge
  ↓
Retrieval ── pgvector + BM25 + cross-encoder rerank
  ↓
Guardrails ── PII scrub · injection spotlighting · citation validator
  ↓
Observability ── Langfuse traces · eval score · cost per query
  ↓
Escalation Bridge ── hands off to human advisor with context`}</pre>
      </Section>

      <Section id="s9" title="9. AI Workflow">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Customer types a question in the app.</li>
          <li>PII scrubber replaces account numbers with tokens.</li>
          <li>Advice/information classifier decides whether to proceed.</li>
          <li>Intent classifier maps to one of 41 categories with confidence.</li>
          <li>Retrieval fetches top-6 policy chunks + last 3 similar resolved cases.</li>
          <li>Draft prompt writes answer with citation IDs.</li>
          <li>Compliance judge scores tone, correctness, advice-boundary.</li>
          <li>If judge ≥ 0.80 and citations valid → publish; else escalate with draft.</li>
        </ol>
      </Section>

      <Section id="s10" title="10. Evaluation Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Golden set:</strong> 480 questions, dual-labelled by policy SMEs + one compliance officer.</li>
          <li><strong>Metrics:</strong> faithfulness, citation accuracy, tone, refusal appropriateness, latency, cost.</li>
          <li><strong>Adversarial suite:</strong> 220 injection + advice-shaped questions.</li>
          <li><strong>Regression gate:</strong> vN faithfulness ≥ v(N−1) or CI blocks deploy.</li>
          <li><strong>Shadow mode:</strong> 7 days answering silently before user-visible rollout.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li>Feature-flagged rollout: 1% → 10% → 50% → 100% over 3 weeks.</li>
          <li>Prompt version served by registry — rollback is a flag flip, no redeploy.</li>
          <li>Region-pinned inference endpoints; keys scoped per country.</li>
          <li>Exact + semantic prompt cache; observed hit rate 47%.</li>
          <li>Auto-rollback if eval score dropped &gt; 4% during canary.</li>
        </ul>
      </Section>

      <Section id="s12" title="12. Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li>Live dashboards: deflection %, escalation %, cost/query, P95 latency, judge-fail rate.</li>
          <li>Weekly eval refresh against a rolling golden set.</li>
          <li>Alerting: judge-fail rate &gt; 2%, citation-missing &gt; 1%, latency &gt; 4s P95.</li>
          <li>Quarterly red-team pass with fresh injection payloads.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80" caption="Post-launch monitoring — deflection, cost, and judge-fail rate over the first 180 days." />
      </Section>

      <Section id="s13" title="13. Business Outcomes">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Metric</th><th className="text-left p-2">Before</th><th className="text-left p-2">After (180d)</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Call volume (top 32 intents)</td><td className="p-2">4.1M / yr</td><td className="p-2">2.4M / yr (−41%)</td></tr>
            <tr className="border-b"><td className="p-2">In-app help NPS</td><td className="p-2">+14</td><td className="p-2">+37 (+23)</td></tr>
            <tr className="border-b"><td className="p-2">Cost per resolved query</td><td className="p-2">£2.10</td><td className="p-2">£0.042</td></tr>
            <tr className="border-b"><td className="p-2">P95 latency</td><td className="p-2">—</td><td className="p-2">3.1s</td></tr>
            <tr className="border-b"><td className="p-2">Compliance breaches</td><td className="p-2">n/a</td><td className="p-2">0</td></tr>
            <tr><td className="p-2">Annual saving</td><td className="p-2">—</td><td className="p-2">£4.6M</td></tr>
          </tbody>
        </table>
        <p className="mt-2 text-sm"><strong>ROI:</strong> £4.6M annual saving vs £680k build + £310k run = 4.6× first-year ROI, breakeven at month 3.</p>
      </Section>

      <Section id="s14" title="14. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>The compliance judge prompt was the single highest-leverage change — do it in Week 2, not 9.</li>
          <li>Grounding + forced citations closed 80% of hallucinations before any model change.</li>
          <li>Regulator engagement early converted the audit trail from a burden into a selling point.</li>
          <li>Prompt caching + prefix ordering saved more than switching to a larger model would have earned.</li>
          <li>Golden-set <em>quality</em> mattered far more than size beyond ~200 examples.</li>
          <li>Escalation UX quality determined how much AI the advisors trusted long-term.</li>
        </ul>
      </Section>

      <Section id="s15" title="15. Future Improvements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Multilingual expansion (DE, MT, FR) with per-locale few-shot banks.</li>
          <li>DSPy-based weekly auto-optimisation against the live golden set.</li>
          <li>Distilled small model for intent classification to trim 40% latency.</li>
          <li>Multimodal input — screenshots and statements as attachments.</li>
          <li>Proactive outreach for at-risk churn segments with explicit consent.</li>
        </ul>
      </Section>

      <Section id="review" title="Case Study Review">
        <h3 className="font-semibold">Project timeline</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>W1–2</strong> discovery, compliance scoping, golden set design.</li>
          <li><strong>W3–4</strong> prompt v1 + eval harness + retrieval baseline.</li>
          <li><strong>W5–6</strong> compliance judge + advice/info gate.</li>
          <li><strong>W7–8</strong> observability + prompt registry + feature flags.</li>
          <li><strong>W9–10</strong> shadow mode + red-team pass.</li>
          <li><strong>W11–12</strong> canary rollout (1% → 10%).</li>
          <li><strong>W13–14</strong> 50% then 100% GA + post-launch retrospective.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Engineering insights</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Treat prompts as versioned artefacts with eval scores attached.</li>
          <li>Design the escalation flow before the happy path.</li>
          <li>Regulator-grade audit trails are a byproduct of good observability.</li>
          <li>Compliance judge earns its cost every day post-launch.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Discussion questions</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Which change would you sequence earlier if repeating the project?</li>
          <li>How would you evolve the pipeline for voice-channel deflection?</li>
          <li>Under a stricter budget, which pipeline stage would you drop first?</li>
          <li>What would a fine-tuned intent model change in cost and risk?</li>
        </ol>
        <h3 className="mt-3 font-semibold">Reflection activities</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Draft a compliance judge prompt for a healthcare equivalent.</li>
          <li>Design an eval set for a mortgage-application flow.</li>
          <li>Sketch a 6-week plan to replicate AskMeridian in a telco.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Grounded QA</strong> — answering only from retrieved authoritative context.</li>
          <li><strong>Judge prompt</strong> — LLM evaluator scoring another LLM's output.</li>
          <li><strong>Advice/information gate</strong> — classifier deciding whether a question is answerable within regulatory scope.</li>
          <li><strong>Shadow mode</strong> — running a system without exposing answers to users.</li>
          <li><strong>Deflection</strong> — a customer question resolved without a human advisor.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is MeridianBank a real bank?">It is an anonymised composite of comparable production deployments. Numbers reflect representative real outcomes but are not attributable to one entity.</FAQItem>
        <FAQItem q="Why not fine-tune from day one?">Prompt Engineering plus RAG met the KPIs in 14 weeks with lower regulatory risk. Fine-tuning is a year-2 optimisation.</FAQItem>
        <FAQItem q="How did you handle multiple regulators?">Region-pinned inference, per-region prompt variants for tone, and one shared compliance judge with region-aware policy.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended solely for educational purposes. Company names, metrics, and details are anonymised and generalised for teaching. Prompt Engineering, AI models, APIs, frameworks, and best practices evolve continuously — always consult official documentation (OpenAI, Anthropic, Google AI, Microsoft Learn, Hugging Face, LangChain, LangGraph, LlamaIndex, NVIDIA AI) for the latest guidance. Information is compiled from trusted documentation, academic publications, research papers, and industry standards. All trademarks, product names, and logos belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
