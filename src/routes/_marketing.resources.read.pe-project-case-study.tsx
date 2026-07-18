import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-project-case-study",
  title: "Prompt Engineering — Project Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "23 min",
  pages: 35,
  lastUpdated: "August 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80",
  heroSubtitle:
    "A production-grade Prompt Engineering case study — NovaDesk, an AI-powered customer support assistant — from business context to deployment, metrics and lessons learned.",
};

const TOC: TocItem[] = [
  { id: "s1", label: "1. Business Background" },
  { id: "s2", label: "2. Project Goals" },
  { id: "s3", label: "3. Requirements" },
  { id: "s4", label: "4. System Architecture" },
  { id: "s5", label: "5. Prompt Engineering Strategy" },
  { id: "s6", label: "6. Prompt Iterations" },
  { id: "s7", label: "7. AI Workflow" },
  { id: "s8", label: "8. Development Timeline" },
  { id: "s9", label: "9. Testing & Validation" },
  { id: "s10", label: "10. Deployment" },
  { id: "s11", label: "11. Performance Metrics" },
  { id: "s12", label: "12. Challenges" },
  { id: "s13", label: "13. Lessons Learned" },
  { id: "s14", label: "14. Future Enhancements" },
  { id: "review", label: "Case Study Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Project Guide", tag: "AI & Data", time: "22 min" },
  { title: "Prompt Engineering — Sample Exercises", tag: "AI & Data", time: "24 min" },
  { title: "Prompt Engineering — Complete Tutorial", tag: "AI & Data", time: "64 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-project-case-study")({
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
          <li>See a real prompt-driven system from idea to production.</li>
          <li>Understand the engineering trade-offs behind each choice.</li>
          <li>Trace prompt evolution across measurable versions.</li>
          <li>Learn what actually breaks in the wild — and how to fix it.</li>
        </ul>
        <Callout tone="info" title="Case profile">
          <strong>Company:</strong> NovaDesk (SaaS support platform, 42k tickets/day)<br/>
          <strong>Team:</strong> 6 people, 8-week delivery<br/>
          <strong>Stack:</strong> GPT + Claude · pgvector · LangGraph · Langfuse<br/>
          <strong>Outcome:</strong> −37% median resolution time, +19 CSAT points, $1.4M/yr saved.
        </Callout>
      </Section>

      <Section id="s1" title="1. Business Background">
        <p>NovaDesk operates a customer-support SaaS with 4,200 seats across mid-market B2B. Ticket volume had grown 3× in 18 months. First-response time drifted from 42 to 71 minutes, and CSAT dropped 11 points. The board approved an AI initiative with a firm cost ceiling and safety review.</p>
      </Section>

      <Section id="s2" title="2. Project Goals">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cut median resolution time by 30%.</li>
          <li>Increase CSAT by ≥ 10 points.</li>
          <li>Keep cost below $0.06/ticket handled.</li>
          <li>Zero regressions in SLA or safety incidents.</li>
        </ul>
      </Section>

      <Section id="s3" title="3. Requirements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Auto-classify ticket into 41 categories.</li>
          <li>Suggest draft reply with citations to internal docs.</li>
          <li>Detect and escalate churn-risk or legal-sensitive tickets.</li>
          <li>Support GDPR data residency (EU tenants → EU inference).</li>
          <li>P95 latency &lt; 3 seconds; abstain on low confidence.</li>
        </ul>
      </Section>

      <Section id="s4" title="4. System Architecture">
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Support UI
   ↓
API Gateway ── Auth · Rate limit · Region routing
   ↓
Prompt Service ── Prompt registry v2.3
   ↓
LLM Router ── small (classify) → large (draft) → judge
   ↓
Retrieval ── pgvector + BM25 + cross-encoder rerank
   ↓
Guardrails ── PII scrub · injection defence · escalation rules
   ↓
Observability ── Langfuse traces · cost · eval score`}</pre>
        <Figure src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80" caption="NovaDesk architecture — three prompt stages, hybrid retrieval, guardrails and full observability." />
      </Section>

      <Section id="s5" title="5. Prompt Engineering Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Stage 1 — Classify</strong>: small model, JSON schema, 41-class output, confidence score.</li>
          <li><strong>Stage 2 — Draft</strong>: large model, RAG over docs + past tickets, forced citations, abstain path.</li>
          <li><strong>Stage 3 — Judge</strong>: LLM-as-judge scores draft on tone, correctness, safety before publishing.</li>
          <li><strong>Escalation rules</strong>: legal / billing / churn keywords trigger human review with the draft attached.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. Prompt Iterations">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Version</th><th className="text-left p-2">Change</th><th className="text-left p-2">Eval Δ</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">v1</td><td className="p-2">Zero-shot draft</td><td className="p-2">baseline 0.61</td></tr>
            <tr className="border-b"><td className="p-2">v2</td><td className="p-2">+ 5-shot examples per category</td><td className="p-2">+0.07</td></tr>
            <tr className="border-b"><td className="p-2">v3</td><td className="p-2">+ RAG top-5 with rerank</td><td className="p-2">+0.11</td></tr>
            <tr className="border-b"><td className="p-2">v4</td><td className="p-2">+ JSON schema + citations</td><td className="p-2">+0.05</td></tr>
            <tr className="border-b"><td className="p-2">v5</td><td className="p-2">+ Abstain clause</td><td className="p-2">+0.03 · hallucinations −68%</td></tr>
            <tr className="border-b"><td className="p-2">v6</td><td className="p-2">+ Reflexion pass</td><td className="p-2">+0.02 · +410ms latency (kept)</td></tr>
            <tr><td className="p-2">v7</td><td className="p-2">+ Prompt caching + prefix reorder</td><td className="p-2">cost −38%</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s7" title="7. AI Workflow">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Incoming ticket → PII scrub → classifier prompt.</li>
          <li>If confidence &lt; 0.75 → escalate to human.</li>
          <li>Retrieve top-5 KB chunks + last 3 similar tickets (hybrid + rerank).</li>
          <li>Draft prompt generates reply + citations.</li>
          <li>Judge prompt scores tone/correctness/safety.</li>
          <li>If judge &lt; 0.8 → escalate; else publish as suggested draft.</li>
          <li>Agent one-click sends or edits before sending.</li>
        </ol>
      </Section>

      <Section id="s8" title="8. Development Timeline">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>W1</strong>: brief · data audit · safety review scope.</li>
          <li><strong>W2</strong>: prompt v1 + 120-example golden set.</li>
          <li><strong>W3</strong>: hybrid retrieval + rerank + eval harness.</li>
          <li><strong>W4</strong>: guardrails + escalation rules.</li>
          <li><strong>W5</strong>: Langfuse observability + cost dashboard.</li>
          <li><strong>W6</strong>: canary at 1% traffic in one region.</li>
          <li><strong>W7</strong>: 10% rollout · red-team pass.</li>
          <li><strong>W8</strong>: 100% rollout · retrospective published.</li>
        </ul>
      </Section>

      <Section id="s9" title="9. Testing & Validation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Golden set: 320 tickets, dual-labelled by two SMEs.</li>
          <li>Regression gate: v(N) faithfulness ≥ v(N-1); CI blocks otherwise.</li>
          <li>Adversarial suite: 180 injection + jailbreak payloads.</li>
          <li>Load: 4× peak QPS for 30 min without SLA breach.</li>
          <li>Shadow mode for 5 days before serving any answer to end users.</li>
        </ul>
      </Section>

      <Section id="s10" title="10. Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompt registry served by feature flag — flip version without redeploy.</li>
          <li>Region-pinned inference (EU / US / APAC).</li>
          <li>Exact + semantic cache (target hit rate 45%; measured 51%).</li>
          <li>Auto-rollback if eval score dropped &gt; 5% during canary.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Performance Metrics">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Metric</th><th className="text-left p-2">Before</th><th className="text-left p-2">After (90d)</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Median resolution time</td><td className="p-2">71 min</td><td className="p-2">44.7 min (−37%)</td></tr>
            <tr className="border-b"><td className="p-2">CSAT (0–100)</td><td className="p-2">62</td><td className="p-2">81 (+19)</td></tr>
            <tr className="border-b"><td className="p-2">Ticket cost</td><td className="p-2">$0.42</td><td className="p-2">$0.058 (AI portion)</td></tr>
            <tr className="border-b"><td className="p-2">P95 latency</td><td className="p-2">—</td><td className="p-2">2.7 s</td></tr>
            <tr className="border-b"><td className="p-2">Hallucination rate</td><td className="p-2">14%</td><td className="p-2">1.9%</td></tr>
            <tr><td className="p-2">Annual saving</td><td className="p-2">—</td><td className="p-2">$1.4M</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80" caption="90-day metrics — resolution time, CSAT and hallucination rate all improved together." />
      </Section>

      <Section id="s12" title="12. Challenges">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Category drift</strong>: new SKUs added weekly; retraining classifier prompt monthly wasn't enough. Solved with dynamic few-shot from a live example store.</li>
          <li><strong>Indirect injection</strong>: user-uploaded logs contained "ignore previous instructions". Fixed with spotlight + dual-LLM pattern.</li>
          <li><strong>Cost spikes</strong>: long transcripts blew context. Added running-summary compression + hard cap.</li>
          <li><strong>Regulatory audit</strong>: EU customer requested proof of data residency. Added region-pinned logging + traceable prompt versions.</li>
        </ul>
      </Section>

      <Section id="s13" title="13. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ship the smallest useful prompt first, then improve with numbers.</li>
          <li>The judge prompt is worth its cost — it catches what evals miss.</li>
          <li>Escalation paths convert AI from a risk into a productivity gain.</li>
          <li>Prompt caching + prefix ordering saved more than a model change.</li>
          <li>Golden-set quality &gt; golden-set size after ~150 examples.</li>
          <li>Every AI feature needs an owner rota, not just a launch team.</li>
        </ul>
      </Section>

      <Section id="s14" title="14. Future Enhancements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Auto-optimise prompts weekly using DSPy against the live golden set.</li>
          <li>Move classifier to a distilled fine-tuned small model for latency parity + cost cut.</li>
          <li>Add multimodal (screenshots + attachments) to draft prompt.</li>
          <li>Per-tenant personalisation via encrypted memory tier.</li>
          <li>Expand to proactive outbound (renewal risk detection).</li>
        </ul>
      </Section>

      <Section id="review" title="Case Study Review">
        <h3 className="font-semibold">Executive summary</h3>
        <p>NovaDesk shipped a three-stage Prompt Engineering system (classify → draft → judge) in 8 weeks. Guardrails and observability were built alongside the prompts, not after. In 90 days the system cut resolution time by 37% and hallucinations by 87%, while staying under budget.</p>
        <h3 className="mt-4 font-semibold">Engineering insights</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompt caching + prefix ordering was the single biggest cost lever.</li>
          <li>An LLM judge is a cheap safety net if your baseline is small-model.</li>
          <li>Dynamic few-shot solved category drift without any retraining.</li>
          <li>Region-pinned inference removed a whole class of compliance risk.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Project retrospective</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">What went well</th><th className="text-left p-2">What we'd change</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Eval gate stopped 3 bad prompts pre-prod</td><td className="p-2">Would build the judge prompt in Week 2, not 5</td></tr>
            <tr className="border-b"><td className="p-2">Canary saved us from a router bug</td><td className="p-2">Would ship observability before any prompt</td></tr>
            <tr><td className="p-2">Cache hit rate exceeded target</td><td className="p-2">Would allocate a dedicated on-call rota from day 1</td></tr>
          </tbody>
        </table>
        <h3 className="mt-4 font-semibold">Discussion questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Which of the three prompt stages would you drop under a strict budget, and why?</li>
          <li>How would you handle a 20% surge in unseen ticket categories?</li>
          <li>Would you replace the classifier with fine-tuning at year 2? What would you measure to decide?</li>
          <li>How would you extend the system to handle voice tickets?</li>
        </ol>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Judge prompt</strong> — LLM scoring another LLM's output.</li>
          <li><strong>Shadow mode</strong> — running a system without exposing outputs to users.</li>
          <li><strong>Canary</strong> — small percentage rollout for safety.</li>
          <li><strong>Dynamic few-shot</strong> — examples selected per query by similarity.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is NovaDesk a real company?">It's an anonymised composite of real production deployments; numbers are representative, not from one entity.</FAQItem>
        <FAQItem q="Why three prompts instead of one?">Separation of concerns — classify is cheap, draft is expensive, judge is safety-critical. Easier to evolve independently.</FAQItem>
        <FAQItem q="Would fine-tuning have been better?">Not initially — prompts + RAG hit the goals in 8 weeks. Fine-tuning is a year-2 optimisation.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended solely for educational purposes. Company names, metrics and details are anonymised and generalised for teaching. AI technologies, models, APIs, and best practices evolve rapidly — always consult official documentation for the latest guidance. Information is compiled from trusted documentation, academic publications, research papers, industry standards, and official educational resources. All trademarks, logos, product names, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
