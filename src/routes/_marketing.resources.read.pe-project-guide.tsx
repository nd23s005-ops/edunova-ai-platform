import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-project-guide",
  title: "Prompt Engineering — Project Guide",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "22 min",
  pages: 29,
  lastUpdated: "January 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1800&q=80",
  heroSubtitle:
    "A full SDLC playbook for prompt-driven applications — plan, design, build, test, evaluate, deploy and maintain production Prompt Engineering projects.",
};

const TOC: TocItem[] = [
  { id: "s1", label: "1. Project Overview" },
  { id: "s2", label: "2. Requirements Gathering" },
  { id: "s3", label: "3. Problem Definition" },
  { id: "s4", label: "4. Prompt Design" },
  { id: "s5", label: "5. Architecture Planning" },
  { id: "s6", label: "6. Technology Stack" },
  { id: "s7", label: "7. Development Workflow" },
  { id: "s8", label: "8. Testing Strategy" },
  { id: "s9", label: "9. Evaluation" },
  { id: "s10", label: "10. Deployment" },
  { id: "s11", label: "11. Monitoring" },
  { id: "s12", label: "12. Documentation" },
  { id: "s13", label: "13. Future Improvements" },
  { id: "review", label: "Project Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Project Case Study", tag: "AI & Data", time: "23 min" },
  { title: "Prompt Engineering — Sample Exercises", tag: "AI & Data", time: "24 min" },
  { title: "Prompt Engineering — Complete Tutorial", tag: "AI & Data", time: "64 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-project-guide")({
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
          <li>Plan and scope a prompt-driven AI project like a software product.</li>
          <li>Design a scalable prompt architecture and prompt library.</li>
          <li>Establish testing, evaluation and observability from day one.</li>
          <li>Ship, monitor and iterate a production Prompt Engineering project.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1600&q=80" caption="Prompt-engineering SDLC — Requirements → Design → Build → Evaluate → Deploy → Monitor → Iterate." />
      </Section>

      <Section id="s1" title="1. Project Overview">
        <p>A prompt-driven project follows the shape of any software delivery — but adds three unique concerns: <em>prompt versioning</em>, <em>evaluation</em>, and <em>cost/latency budgets</em>. Treat prompts as first-class artifacts: reviewed, versioned, tested and observed.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Team roles: PM · AI Engineer · Data Engineer · MLOps · QA · SME.</li>
          <li>Typical timeline: 2 weeks discovery, 4 weeks build, 2 weeks harden.</li>
          <li>Success criteria: quality (eval score), cost, latency, safety.</li>
        </ul>
      </Section>

      <Section id="s2" title="2. Requirements Gathering">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Business goal</strong> stated as a measurable outcome.</li>
          <li><strong>Users</strong> — who, how often, on what device.</li>
          <li><strong>Data</strong> — where it lives, quality, PII sensitivity, refresh cadence.</li>
          <li><strong>Constraints</strong> — latency, cost, regulatory (GDPR, HIPAA, SOC2).</li>
          <li><strong>Guardrails</strong> — what must not happen; abstain policy.</li>
        </ul>
        <Callout tone="info" title="Template: 1-page brief">
          Problem · Users · Success metric · Data · Non-goals · Risks · Timeline · Budget.
        </Callout>
      </Section>

      <Section id="s3" title="3. Problem Definition">
        <ul className="list-disc space-y-1 pl-5">
          <li>Frame as prompt task: summarise / classify / extract / generate / decide.</li>
          <li>Decide grounding: closed-book, RAG, tools, or agent.</li>
          <li>Define output contract (schema) before writing any prompt.</li>
          <li>Choose north-star metric (faithfulness, F1, task completion, CSAT).</li>
        </ul>
      </Section>

      <Section id="s4" title="4. Prompt Design">
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`prompts/
  support_classifier/
    v1.md          # baseline
    v2.md          # +few-shot
    v3.md          # +CoT + JSON schema
    tests.jsonl    # golden set
    README.md      # rationale, wins, losses`}</pre>
        <ul className="list-disc space-y-1 pl-5">
          <li>Version prompts semver-style; log the served version on every call.</li>
          <li>Split into system (durable rules) + user (dynamic).</li>
          <li>Enforce output via JSON schema / function calling.</li>
          <li>Author prompt README: purpose, examples, non-goals, gotchas.</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Architecture Planning">
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Client
  ↓
API Gateway  →  Auth / rate-limit
  ↓
Prompt Service  →  Prompt registry (versioned)
  ↓
LLM Router     →  small model → escalate on low confidence
  ↓
Retrieval      →  Vector DB + BM25 + reranker
  ↓
Guardrails     →  Input & output classifiers, PII scrub
  ↓
Observability  →  Traces, cost, latency, evals`}</pre>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" caption="Reference architecture — prompt registry, LLM router, retrieval, guardrails, observability." />
      </Section>

      <Section id="s6" title="6. Technology Stack">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Layer</th><th className="text-left p-2">Choice</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Models</td><td className="p-2">OpenAI / Anthropic / Gemini / open (Llama, Mistral)</td></tr>
            <tr className="border-b"><td className="p-2">Framework</td><td className="p-2">LangChain / LlamaIndex / DSPy</td></tr>
            <tr className="border-b"><td className="p-2">Retrieval</td><td className="p-2">pgvector / Pinecone / Weaviate + BM25 + cross-encoder</td></tr>
            <tr className="border-b"><td className="p-2">Eval</td><td className="p-2">Ragas · promptfoo · LangSmith · custom judges</td></tr>
            <tr className="border-b"><td className="p-2">Observability</td><td className="p-2">Langfuse / LangSmith / Arize</td></tr>
            <tr className="border-b"><td className="p-2">Guardrails</td><td className="p-2">Llama Guard · NeMo · Guardrails AI</td></tr>
            <tr><td className="p-2">Delivery</td><td className="p-2">Docker · CI/CD · feature flags · canary</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s7" title="7. Development Workflow">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Branch per prompt change; PR review with eval-delta report.</li>
          <li>Local eval against golden set before opening PR.</li>
          <li>CI runs eval + guardrail suite on every push.</li>
          <li>Merge only if score ≥ baseline and safety suite is green.</li>
          <li>Auto-deploy to staging behind a feature flag.</li>
          <li>Canary 1% → 10% → 100% with auto-rollback.</li>
        </ol>
      </Section>

      <Section id="s8" title="8. Testing Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Unit</strong>: prompt renders as expected for edge inputs.</li>
          <li><strong>Contract</strong>: output validates against JSON schema.</li>
          <li><strong>Regression</strong>: prompt v(N) ≥ v(N-1) on golden set.</li>
          <li><strong>Adversarial</strong>: prompt-injection suite + jailbreak library.</li>
          <li><strong>Load</strong>: latency + cost at target QPS.</li>
        </ul>
      </Section>

      <Section id="s9" title="9. Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Golden set: 50–500 hand-labelled examples per task.</li>
          <li>Metrics: exact match / F1 / faithfulness / context precision-recall.</li>
          <li>LLM-as-judge pairwise + position randomisation.</li>
          <li>Online: thumbs, escalation rate, task completion.</li>
          <li>Weekly review of eval trend and worst-N traces.</li>
        </ul>
      </Section>

      <Section id="s10" title="10. Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li>Immutable prompt versions; served version logged.</li>
          <li>Config via feature flags — flip prompt version without redeploy.</li>
          <li>Cache: exact + semantic; typical 30–70% savings.</li>
          <li>Autoscale on tokens/sec, not raw QPS.</li>
          <li>Fallbacks: secondary provider, degraded prompt, cached answer.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every call logged with: prompt version, tokens, latency, cost, outcome.</li>
          <li>Dashboards: p50/p95 latency · $ per 1K calls · eval score · abstain rate.</li>
          <li>Alerts: schema-parse failures &gt; 1% · cost drift &gt; 20% · safety flags.</li>
          <li>Weekly trace review: sample 50 worst-scoring calls.</li>
        </ul>
      </Section>

      <Section id="s12" title="12. Documentation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Architecture diagram + data-flow with PII markers.</li>
          <li>Prompt registry index with owners.</li>
          <li>Golden-set methodology and labelling guide.</li>
          <li>Runbook: on-call incidents, rollback, model outages.</li>
          <li>Model card + safety notes for regulators.</li>
        </ul>
      </Section>

      <Section id="s13" title="13. Future Improvements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Automate prompt search with DSPy / APE / OPRO.</li>
          <li>Distil expensive CoT prompts into small fine-tuned models.</li>
          <li>Add multimodal inputs (image / audio / video).</li>
          <li>Move from single-model to intelligent router across N providers.</li>
          <li>Introduce user-personalised prompts via per-user memory.</li>
        </ul>
      </Section>

      <Section id="review" title="Project Review">
        <h3 className="font-semibold">Project milestones</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Brief signed (Week 1)</li>
          <li>Prompt v1 + golden set (Week 2)</li>
          <li>Architecture + guardrails (Week 3)</li>
          <li>CI eval green (Week 4)</li>
          <li>Staging canary (Week 5)</li>
          <li>Production rollout (Week 6)</li>
        </ol>
        <h3 className="mt-4 font-semibold">Delivery checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Versioned prompt registry.</li>
          <li>Golden set ≥ 100 examples.</li>
          <li>JSON schema enforced on all outputs.</li>
          <li>PII scrub + prompt-injection defence.</li>
          <li>Observability dashboard live.</li>
          <li>Runbook + on-call rota published.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Risk assessment</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Risk</th><th className="text-left p-2">Mitigation</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Model outage</td><td className="p-2">Secondary provider + cached fallback</td></tr>
            <tr className="border-b"><td className="p-2">Prompt injection</td><td className="p-2">Delimit + classifier + dual-LLM</td></tr>
            <tr className="border-b"><td className="p-2">Cost drift</td><td className="p-2">Cache + routing + budget alerts</td></tr>
            <tr className="border-b"><td className="p-2">Hallucination</td><td className="p-2">Grounding + citations + abstain</td></tr>
            <tr><td className="p-2">Regression</td><td className="p-2">CI eval gate + canary rollout</td></tr>
          </tbody>
        </table>
        <h3 className="mt-4 font-semibold">Final review checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>All prompts have owners and READMEs.</li>
          <li>Eval score above baseline for 4 consecutive weeks.</li>
          <li>Every alert routed to a real person.</li>
          <li>Post-launch retrospective completed.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Prompt registry</strong> — versioned store of production prompts.</li>
          <li><strong>Canary</strong> — small percentage rollout for safety.</li>
          <li><strong>Golden set</strong> — hand-labelled eval examples.</li>
          <li><strong>Runbook</strong> — on-call operating guide.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I really need a golden set?">Yes. Without it, prompt changes are guesses, not decisions.</FAQItem>
        <FAQItem q="When to fine-tune?">After prompting + RAG plateau, or when latency/cost force it.</FAQItem>
        <FAQItem q="Framework or plain SDK?">Start plain; add a framework when you have real reusability need.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended solely for educational purposes. AI technologies, models, APIs, and best practices evolve rapidly — always consult official documentation for the latest guidance. Information is compiled from trusted documentation, academic publications, research papers, industry standards, and official educational resources. All trademarks, logos, product names, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
