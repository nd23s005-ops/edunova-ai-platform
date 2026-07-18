import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "genai-real-world-case-study",
  title: "Generative AI — Real-world Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "18 min",
  pages: 28,
  lastUpdated: "May 2026",
  tags: ["Case Study", "Generative AI", "RAG", "Enterprise", "Production"],
  heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80",
  heroSubtitle:
    "How a global e-commerce support team cut resolution time by 62% by shipping a production Generative AI copilot — problem, solution, and lessons learned.",
};

const TOC: TocItem[] = [
  { id: "c1", label: "Ch 1 — Introduction" },
  { id: "c2", label: "Ch 2 — Business Problem" },
  { id: "c3", label: "Ch 3 — Requirements" },
  { id: "c4", label: "Ch 4 — Selecting GenAI" },
  { id: "c5", label: "Ch 5 — Solution Architecture" },
  { id: "c6", label: "Ch 6 — Data Pipeline" },
  { id: "c7", label: "Ch 7 — Prompt Engineering" },
  { id: "c8", label: "Ch 8 — Implementation Journey" },
  { id: "c9", label: "Ch 9 — Results & Impact" },
  { id: "c10", label: "Ch 10 — Challenges & Lessons" },
  { id: "c11", label: "Ch 11 — Replicating the Solution" },
  { id: "c12", label: "Ch 12 — Conclusion" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Generative AI — Complete Tutorial", tag: "AI & Data", time: "49 min" },
  { title: "Generative AI — Practice Questions", tag: "AI & Data", time: "25 min" },
  { title: "Generative AI — Interview Questions", tag: "AI & Data", time: "27 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/genai-real-world-case-study")({
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
      {/* CH 1 */}
      <Section id="c1" title="Chapter 1 — Introduction">
        <p>
          A <strong>case study</strong> tells the real story behind a solution: the business
          problem, the trade-offs, the architecture, the metrics, and — most importantly — what
          the team would do differently. This handbook walks through one such story end-to-end so
          you can replicate the pattern.
        </p>
        <h4 className="mt-3 font-semibold">Why real-world case studies matter</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Tutorials teach syntax; case studies teach <em>judgement</em>.</li>
          <li>They reveal cost, latency and reliability trade-offs you won't find in docs.</li>
          <li>They anchor abstract concepts (RAG, agents, evals) in a business outcome.</li>
        </ul>
        <h4 className="mt-3 font-semibold">Learning objectives</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Frame a business problem well enough to design an AI solution around it.</li>
          <li>Choose between prompting, RAG and fine-tuning with defensible reasoning.</li>
          <li>Design a production-grade architecture with observability and guardrails.</li>
          <li>Measure ROI with metrics an executive will accept.</li>
        </ol>
        <h4 className="mt-3 font-semibold">Business context (this case)</h4>
        <p>
          <strong>NovaCart</strong> (fictitious) is a mid-size global e-commerce company (18M
          annual orders, 42 markets). Their support team of 420 agents handled 1.9M tickets/year.
          Average handle time (AHT) was 14.2 minutes; CSAT hovered at 78%; support was the largest
          non-fulfilment operating cost.
        </p>
        <Callout tone="tip" title="Expected outcomes">
          After reading, you should be able to sketch a similar copilot for your own domain in one
          working day and defend every architectural choice at a design review.
        </Callout>
      </Section>

      {/* CH 2 */}
      <Section id="c2" title="Chapter 2 — Business Problem">
        <p>
          NovaCart's <strong>Support Operations</strong> team was drowning in three ticket
          categories that together made up 71% of volume: order tracking, returns/refunds, and
          policy questions. Agents copy-pasted answers from a 4,200-page internal wiki, a legacy
          Zendesk macro library and 11 country-specific policy PDFs.
        </p>
        <h4 className="mt-3 font-semibold">Existing workflow</h4>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`Customer ─► Zendesk ticket
              │
              ▼
        Agent triage (2 min)
              │
              ▼
    Search wiki / macros / PDFs (5 min)
              │
              ▼
    Draft reply + look up order (5 min)
              │
              ▼
       Send reply · wait · loop`}</pre>

        <h4 className="mt-3 font-semibold">Pain points</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Answers scattered across 4 systems; agents context-switched constantly.</li>
          <li>New agents took 6 weeks to reach 80% of senior AHT.</li>
          <li>Region-specific policies caused 4.1% incorrect-answer rate.</li>
          <li>Peak-season queues exceeded 25-minute wait, dropping CSAT below 70%.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Business goals & success criteria</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Goal</th><th className="p-2 text-left">Success KPI</th><th className="p-2 text-left">Target</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Reduce handle time</td><td className="p-2">AHT (minutes)</td><td className="p-2">14.2 → &lt; 7</td></tr>
            <tr className="border-b"><td className="p-2">Improve accuracy</td><td className="p-2">Incorrect-answer rate</td><td className="p-2">4.1% → &lt; 1.5%</td></tr>
            <tr className="border-b"><td className="p-2">Lift CSAT</td><td className="p-2">CSAT (%)</td><td className="p-2">78 → 85+</td></tr>
            <tr className="border-b"><td className="p-2">Ramp new agents faster</td><td className="p-2">Weeks to competency</td><td className="p-2">6 → 2</td></tr>
            <tr><td className="p-2">Contain cost</td><td className="p-2">$ per ticket</td><td className="p-2">$1.42 → &lt; $0.70</td></tr>
          </tbody>
        </table>

        <Callout tone="info" title="Framing rule">
          A GenAI project is only worth doing if <em>at least one</em> metric moves by 20%+ or
          removes an entire class of manual work. NovaCart targeted both.
        </Callout>
      </Section>

      {/* CH 3 */}
      <Section id="c3" title="Chapter 3 — Requirements Gathering">
        <h4 className="font-semibold">Functional requirements</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Suggest an answer to every incoming ticket in ≤ 3 seconds p95.</li>
          <li>Cite the specific policy section for every claim.</li>
          <li>Support English, Spanish, German, French, Hindi, Portuguese.</li>
          <li>Escalate to a human when confidence &lt; threshold or tone is high-risk.</li>
          <li>Integrate with Zendesk and internal Order API.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Non-functional requirements</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Availability 99.9%; RTO 30 min; RPO 15 min.</li>
          <li>GDPR + CCPA compliance; PII redaction before LLM calls.</li>
          <li>Full audit log of every prompt, retrieval and response.</li>
          <li>Cost cap of $85K/month at 1.9M tickets/year (~$0.045/ticket).</li>
        </ul>

        <h4 className="mt-3 font-semibold">User stories</h4>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>As an agent, I want a drafted reply so I can send in one click.</li>
          <li>As an agent, I want citations so I can trust and verify.</li>
          <li>As a supervisor, I want a dashboard of AHT and CSAT trends.</li>
          <li>As a compliance officer, I want an audit trail per ticket.</li>
        </ol>

        <h4 className="mt-3 font-semibold">Risk assessment matrix</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Risk</th><th className="p-2 text-left">Likelihood</th><th className="p-2 text-left">Impact</th><th className="p-2 text-left">Mitigation</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Hallucinated policy</td><td className="p-2">High</td><td className="p-2">High</td><td className="p-2">RAG + citation checker + human review</td></tr>
            <tr className="border-b"><td className="p-2">PII leakage</td><td className="p-2">Med</td><td className="p-2">High</td><td className="p-2">Pre-send redaction + audit</td></tr>
            <tr className="border-b"><td className="p-2">Cost overrun</td><td className="p-2">Med</td><td className="p-2">Med</td><td className="p-2">Model routing + caching + budget alerts</td></tr>
            <tr className="border-b"><td className="p-2">Provider outage</td><td className="p-2">Low</td><td className="p-2">High</td><td className="p-2">Multi-provider fallback + graceful degrade</td></tr>
            <tr><td className="p-2">Regulatory change</td><td className="p-2">Med</td><td className="p-2">Med</td><td className="p-2">Versioned prompts + policy re-embed job</td></tr>
          </tbody>
        </table>

        <h4 className="mt-3 font-semibold">Timeline & stakeholders</h4>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`Week 0-2   Discovery + KPI baselining          [Ops, PM]
Week 3-5   Prototype (single-region English)   [AI, BE]
Week 6-8   Multi-region + eval harness         [AI, QA]
Week 9-10  Pilot with 40 agents                [Ops, PM]
Week 11-12 Rollout to 420 agents               [All]
Ongoing    Weekly evals + monthly retrains     [AI, Ops]`}</pre>
      </Section>

      {/* CH 4 */}
      <Section id="c4" title="Chapter 4 — Selecting Generative AI">
        <h4 className="font-semibold">Why Generative AI (and not classic ML)?</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Free-form multilingual replies — classification alone won't produce text.</li>
          <li>Policies change monthly; retraining a classifier is expensive.</li>
          <li>RAG lets policies stay in versioned Markdown, not model weights.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Alternatives considered</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Option</th><th className="p-2 text-left">Pros</th><th className="p-2 text-left">Cons</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Rule-based macros</td><td className="p-2">Deterministic</td><td className="p-2">Brittle, unscalable</td></tr>
            <tr className="border-b"><td className="p-2">Fine-tuned Llama-3 8B</td><td className="p-2">Cheap inference</td><td className="p-2">Slow to iterate on policy changes</td></tr>
            <tr className="border-b"><td className="p-2">GPT-4o-mini + RAG (chosen)</td><td className="p-2">Fast to ship, cheap, high quality</td><td className="p-2">Vendor dependency</td></tr>
            <tr><td className="p-2">Claude 3.5 Sonnet + RAG</td><td className="p-2">Strong long-context</td><td className="p-2">Higher cost, similar quality on short tickets</td></tr>
          </tbody>
        </table>

        <h4 className="mt-3 font-semibold">Model decision matrix</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Model</th><th className="p-2 text-left">Quality</th><th className="p-2 text-left">Latency</th><th className="p-2 text-left">$/1M tok</th><th className="p-2 text-left">Verdict</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">GPT-4o</td><td className="p-2">9.4</td><td className="p-2">1.8s</td><td className="p-2">$5 / $15</td><td className="p-2">Overkill for 90% of tickets</td></tr>
            <tr className="border-b"><td className="p-2">GPT-4o-mini</td><td className="p-2">8.7</td><td className="p-2">0.9s</td><td className="p-2">$0.15 / $0.60</td><td className="p-2"><strong>Primary</strong></td></tr>
            <tr className="border-b"><td className="p-2">Claude 3.5 Sonnet</td><td className="p-2">9.2</td><td className="p-2">1.6s</td><td className="p-2">$3 / $15</td><td className="p-2">Escalations only</td></tr>
            <tr className="border-b"><td className="p-2">Llama-3.1 70B (self-hosted)</td><td className="p-2">8.5</td><td className="p-2">1.1s</td><td className="p-2">~$0.9 / $0.9</td><td className="p-2">Backup for outage</td></tr>
            <tr><td className="p-2">Gemini 1.5 Flash</td><td className="p-2">8.3</td><td className="p-2">0.7s</td><td className="p-2">$0.075 / $0.30</td><td className="p-2">Cheap-lane routing</td></tr>
          </tbody>
        </table>

        <Callout tone="tip" title="Routing rule">
          A tiny classifier decides per ticket: 78% of traffic → GPT-4o-mini, 15% → Gemini Flash
          (simple FAQs), 7% → Claude Sonnet (long refund disputes). Blended cost = $0.041/ticket.
        </Callout>
      </Section>

      {/* CH 5 */}
      <Section id="c5" title="Chapter 5 — Solution Architecture">
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`               ┌────────────┐
               │   Agent    │  (Zendesk plugin)
               └─────┬──────┘
                     │ HTTPS + SSO
                     ▼
             ┌──────────────┐
             │  API Gateway │  (rate-limit, auth, WAF)
             └──────┬───────┘
                    │
        ┌───────────▼────────────┐
        │  FastAPI Copilot API   │  (Python 3.11, async)
        └──┬────────┬─────────┬──┘
           │        │         │
           ▼        ▼         ▼
    ┌──────────┐ ┌────────┐ ┌───────────┐
    │ Redis    │ │ Router │ │ Guardrails│
    │ cache    │ │ (tiny  │ │ (PII, tox)│
    └────┬─────┘ │  clf)  │ └─────┬─────┘
         │       └───┬────┘       │
         │           ▼            │
         │     ┌───────────┐      │
         │     │ RAG Svc   │      │
         │     │ (LlamaIdx)│      │
         │     └────┬──────┘      │
         │          ▼             │
         │     ┌───────────┐      │
         │     │ pgvector  │      │
         │     │ Postgres  │      │
         │     └───────────┘      │
         │                        │
         ▼                        ▼
    ┌───────────────────────────────────┐
    │  LLM Gateway  (OpenAI / Anthropic │
    │   / Gemini / self-hosted Llama)   │
    └────────────────┬──────────────────┘
                     ▼
             ┌───────────────┐
             │ Observability │  (Langfuse + Datadog)
             └───────────────┘`}</pre>

        <h4 className="mt-3 font-semibold">Technology stack</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Frontend:</strong> React Zendesk App + Tailwind, streaming SSE.</li>
          <li><strong>Backend:</strong> FastAPI, async httpx, Pydantic v2, RQ workers.</li>
          <li><strong>Auth:</strong> Okta SSO + JWT + tenant-scoped RBAC.</li>
          <li><strong>Data:</strong> Postgres 16 + pgvector; S3 for raw policy PDFs.</li>
          <li><strong>Cache:</strong> Redis 7 for prompts and retrieval; TTL 24h.</li>
          <li><strong>Observability:</strong> Langfuse (traces + evals), Datadog (infra), Sentry (errors).</li>
          <li><strong>Deploy:</strong> Kubernetes on AWS EKS, 3 regions, blue/green.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Key architectural decisions</h4>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li><strong>Hybrid retrieval</strong> (BM25 + vector) — solves brand/order-ID lookups.</li>
          <li><strong>Prefix caching</strong> of system prompt — 40% latency reduction.</li>
          <li><strong>Multi-provider router</strong> — 99.99% availability during OpenAI incidents.</li>
          <li><strong>Self-hosted Llama fallback</strong> — mandated by security team.</li>
        </ol>
      </Section>

      {/* CH 6 */}
      <Section id="c6" title="Chapter 6 — Data Pipeline">
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`  Source docs (Markdown, PDF, HTML, Zendesk KB)
              │
              ▼
        Cleaning (strip HTML, dedupe)
              │
              ▼
     Chunker (recursive, 800 tok / 100 overlap)
              │
              ▼
       Metadata tagging (region, product, policy_id)
              │
              ▼
      Embedding (text-embedding-3-small, 1536-d)
              │
              ▼
   pgvector (HNSW, cosine)  +  BM25 index (Postgres FTS)
              │
              ▼
   Retrieval (top-20 hybrid) → Reranker (bge-reranker-base) → top-5
              │
              ▼
     LLM (prompt + citations) → Post-hoc citation checker
              │
              ▼
       Draft reply back to Zendesk with sources
              │
              ▼
     Agent feedback (👍/👎 + edits) → eval store`}</pre>

        <h4 className="mt-3 font-semibold">Feedback loop</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every agent edit is captured as a diff → training signal.</li>
          <li>Nightly job builds a fresh golden set of 500 sampled tickets.</li>
          <li>Weekly LLM-as-judge run scores accuracy, citation coverage, tone.</li>
        </ul>

        <Code lang="python">{`# Simplified retrieval + generate
def answer(ticket):
    ctx = hybrid_search(ticket.body, k=20)
    ctx = rerank(ticket.body, ctx)[:5]
    prompt = SYSTEM + format_context(ctx) + user_prompt(ticket)
    draft = llm.route(ticket).generate(prompt, stream=True)
    if not citations_valid(draft, ctx):
        draft = escalate(ticket)
    log_trace(ticket, ctx, draft)
    return draft`}</Code>
      </Section>

      {/* CH 7 */}
      <Section id="c7" title="Chapter 7 — Prompt Engineering Strategy">
        <h4 className="font-semibold">System prompt (excerpt)</h4>
        <Code lang="text">{`You are NovaCart's customer-support copilot.
Rules:
1. Answer ONLY using the provided CONTEXT sections.
2. Cite each fact as [policy_id].
3. If CONTEXT is insufficient, reply exactly: ESCALATE_HUMAN.
4. Match tone: warm, concise, ≤ 120 words. Do not apologise more than once.
5. Never reveal internal policies verbatim; paraphrase.
6. Redact PII you see in CONTEXT before responding.`}</Code>

        <h4 className="mt-3 font-semibold">Techniques used</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Role prompting</strong> — copilot persona with policy guardrails.</li>
          <li><strong>Few-shot</strong> — 3 canonical examples per top intent.</li>
          <li><strong>Chain-of-Thought (hidden)</strong> — for refund disputes only.</li>
          <li><strong>Structured output</strong> — JSON with reply, citations, escalate flag.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Good vs bad prompt (real example)</h4>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border bg-red-500/5 p-3">
            <p className="mb-1 text-xs font-semibold text-red-500">Bad</p>
            <p className="text-sm">"Answer the customer nicely."</p>
          </div>
          <div className="rounded-xl border bg-emerald-500/5 p-3">
            <p className="mb-1 text-xs font-semibold text-emerald-500">Good</p>
            <p className="text-sm">"Answer in ≤ 120 words. Cite each policy claim as [policy_id]. If context lacks the answer, output ESCALATE_HUMAN. Tone: warm, concise, no over-apology."</p>
          </div>
        </div>

        <Callout tone="tip" title="Evaluation">
          Every prompt change runs against a 500-ticket golden set on CI. A regression &gt; 2% blocks
          the deploy.
        </Callout>
      </Section>

      {/* CH 8 */}
      <Section id="c8" title="Chapter 8 — Implementation Journey">
        <h4 className="font-semibold">Team (6 people, 12 weeks)</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>1 Product Manager · 1 AI Engineer (lead) · 1 Backend · 1 Frontend · 1 QA · 1 Ops SME.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Agile cadence</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>1-week sprints, weekly demo with support ops.</li>
          <li>Definition of done includes eval regression check.</li>
          <li>Daily 15-min standup, weekly incident review.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Unexpected problems &amp; fixes</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Problem</th><th className="p-2 text-left">Root cause</th><th className="p-2 text-left">Fix</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Pilot latency spike</td><td className="p-2">Cold Kubernetes pods</td><td className="p-2">HPA + min replicas per region</td></tr>
            <tr className="border-b"><td className="p-2">Hindi accuracy 62%</td><td className="p-2">Bad translations in KB</td><td className="p-2">Re-embed with multilingual model + native reviewers</td></tr>
            <tr className="border-b"><td className="p-2">Refund hallucinations</td><td className="p-2">Missing chunk metadata</td><td className="p-2">Add region/product filters + reranker</td></tr>
            <tr className="border-b"><td className="p-2">Cost 2× forecast</td><td className="p-2">No caching, huge context</td><td className="p-2">Prefix cache + prompt compression</td></tr>
            <tr><td className="p-2">Agent trust low</td><td className="p-2">No citations</td><td className="p-2">Inline citations + one-click "verify source"</td></tr>
          </tbody>
        </table>
      </Section>

      {/* CH 9 */}
      <Section id="c9" title="Chapter 9 — Results & Impact">
        <h4 className="font-semibold">Before vs After (12 weeks post-rollout)</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">KPI</th><th className="p-2 text-left">Before</th><th className="p-2 text-left">After</th><th className="p-2 text-left">Δ</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">AHT</td><td className="p-2">14.2 min</td><td className="p-2">5.4 min</td><td className="p-2">-62%</td></tr>
            <tr className="border-b"><td className="p-2">CSAT</td><td className="p-2">78%</td><td className="p-2">88%</td><td className="p-2">+10 pts</td></tr>
            <tr className="border-b"><td className="p-2">Incorrect-answer rate</td><td className="p-2">4.1%</td><td className="p-2">1.2%</td><td className="p-2">-70%</td></tr>
            <tr className="border-b"><td className="p-2">$/ticket</td><td className="p-2">$1.42</td><td className="p-2">$0.61</td><td className="p-2">-57%</td></tr>
            <tr className="border-b"><td className="p-2">Weeks to ramp new agent</td><td className="p-2">6</td><td className="p-2">2</td><td className="p-2">-67%</td></tr>
            <tr><td className="p-2">Peak-season wait time</td><td className="p-2">25 min</td><td className="p-2">6 min</td><td className="p-2">-76%</td></tr>
          </tbody>
        </table>

        <h4 className="mt-3 font-semibold">ASCII performance chart (weekly AHT, minutes)</h4>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`Wk1  ████████████████ 14.1
Wk3  ██████████████   12.3   (pilot begins)
Wk5  ███████████      9.8
Wk7  █████████        8.2
Wk9  ███████          6.7
Wk11 ██████           5.9
Wk12 █████            5.4    ← target 7.0 achieved`}</pre>

        <h4 className="mt-3 font-semibold">Financial ROI (year 1)</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Support cost savings: <strong>$1.54M</strong> (57% × $2.7M baseline).</li>
          <li>Retention lift (0.6% churn reduction × ARR): <strong>$3.1M</strong>.</li>
          <li>Build + run cost: <strong>$780K</strong> (team + inference + infra).</li>
          <li><strong>Net year-1 impact: +$3.86M.</strong></li>
        </ul>

        <Callout tone="info" title="Agent voices">
          &ldquo;It's not replacing me — it's giving me my Fridays back.&rdquo; — Senior Support Lead, Berlin.
        </Callout>
      </Section>

      {/* CH 10 */}
      <Section id="c10" title="Chapter 10 — Challenges & Lessons Learned">
        <h4 className="font-semibold">Top 10 lessons</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>Start with metrics.</strong> Baseline AHT, CSAT and cost before writing a line of code.</li>
          <li><strong>RAG beats fine-tuning.</strong> Policy churn made re-training too slow.</li>
          <li><strong>Citations create trust.</strong> Agent adoption tripled once we added them.</li>
          <li><strong>Ship a router, not one model.</strong> Cost per ticket dropped 3× overnight.</li>
          <li><strong>Golden set gate on CI.</strong> Stops silent regressions dead.</li>
          <li><strong>Guardrails are layers.</strong> Regex + classifier + LLM judge, not one filter.</li>
          <li><strong>Latency &lt; 3s is non-negotiable.</strong> Agents abandon slower tools.</li>
          <li><strong>Observability from day 1.</strong> You cannot fix what you cannot see.</li>
          <li><strong>Involve compliance early.</strong> GDPR audit prep took a full sprint.</li>
          <li><strong>Human-in-the-loop stays.</strong> Autonomy on refunds &gt; $200 was never enabled.</title></li>
        </ol>

        <h4 className="mt-3 font-semibold">Best practices we now enforce</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompt versioning in Git, reviewed like code.</li>
          <li>Weekly evals on 500-ticket golden set + LLM judge.</li>
          <li>Budget-cap circuit-breaker per tenant.</li>
          <li>PII redaction pre-LLM + audit post-LLM.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Future improvements</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Multi-agent flow for complex refund disputes.</li>
          <li>Fine-tuned tone adapter per market.</li>
          <li>Self-service voice bot with ASR + TTS.</li>
          <li>Migration to a smaller open-weight model to cut cost 40%.</li>
        </ul>
      </Section>

      {/* CH 11 */}
      <Section id="c11" title="Chapter 11 — Replicating the Solution">
        <h4 className="font-semibold">Prerequisites</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Python 3.11, Node 20, Docker, Postgres 16 with pgvector.</li>
          <li>Provider keys: OpenAI / Anthropic / Gemini (any subset).</li>
          <li>~5,000 clean support docs and 500 labelled tickets for eval.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Folder structure</h4>
        <Code lang="text">{`copilot/
  api/          # FastAPI routes (chat, feedback, admin)
  core/         # config, auth, logging, guardrails
  llm/          # provider clients + router
  rag/          # ingest, chunk, embed, retrieve
  evals/        # golden set + judges
  ui/           # Zendesk plugin (React)
  ops/          # k8s, terraform, dashboards
  tests/
  scripts/`}</Code>

        <h4 className="mt-3 font-semibold">Development roadmap (8 weeks)</h4>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`Wk1: baseline metrics + KB inventory
Wk2: ingestion + embeddings + basic RAG
Wk3: prompt v1 + eval harness + golden set
Wk4: Zendesk plugin + streaming UI
Wk5: guardrails + PII + observability
Wk6: router + fallback + cost dashboard
Wk7: pilot with 20 agents + iterate
Wk8: rollout gate + on-call runbook`}</pre>

        <h4 className="mt-3 font-semibold">Deployment & testing checklists</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Deployment</th><th className="p-2 text-left">Testing</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Blue/green with 5% canary</td><td className="p-2">Golden-set pass ≥ 92%</td></tr>
            <tr className="border-b"><td className="p-2">Rollback on error rate &gt; 1%</td><td className="p-2">Latency p95 &lt; 3s</td></tr>
            <tr className="border-b"><td className="p-2">Config via env + secret manager</td><td className="p-2">PII redaction unit tests</td></tr>
            <tr><td className="p-2">Runbook + on-call rotation</td><td className="p-2">Prompt-injection red-team</td></tr>
          </tbody>
        </table>

        <h4 className="mt-3 font-semibold">Cost estimation (1M tickets/year)</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Inference: ~$40K/year at $0.041/ticket blended.</li>
          <li>Embeddings + rerank: ~$4K/year.</li>
          <li>Infra (K8s, Postgres, Redis): ~$60K/year.</li>
          <li>Observability (Langfuse + Datadog): ~$18K/year.</li>
          <li><strong>Total: ~$122K/year</strong> at NovaCart scale.</li>
        </ul>
      </Section>

      {/* CH 12 */}
      <Section id="c12" title="Chapter 12 — Conclusion">
        <h4 className="font-semibold">Key takeaways</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Frame the problem in business KPIs first; models second.</li>
          <li>RAG + guardrails + evals beats fine-tuning for policy-heavy domains.</li>
          <li>Model routing + caching is where the ROI actually appears.</li>
          <li>Agent trust is built with citations and low latency, not raw quality.</li>
          <li>Ship small, gate on evals, iterate weekly.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Recommended next steps</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Read: <em>AI Engineering</em> (Chip Huyen), <em>Designing ML Systems</em>.</li>
          <li>Build: your own 200-ticket RAG copilot with Postgres + pgvector.</li>
          <li>Practice: run 20 prompts through an eval harness before shipping.</li>
          <li>Learn: RAGAS, Langfuse, vLLM, LangGraph docs.</li>
          <li>Communities: r/LocalLLaMA, LangChain Discord, MLOps.community.</li>
        </ol>

        <h4 className="mt-3 font-semibold">SWOT of this pattern</h4>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Strengths</th><th className="p-2 text-left">Weaknesses</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Fast time-to-value, high ROI</td><td className="p-2">Vendor + rate-limit exposure</td></tr>
          </tbody>
          <thead><tr className="border-b"><th className="p-2 text-left">Opportunities</th><th className="p-2 text-left">Threats</th></tr></thead>
          <tbody>
            <tr><td className="p-2">Voice, multilingual, agents</td><td className="p-2">Regulatory shifts, model drift</td></tr>
          </tbody>
        </table>

        <Callout tone="tip" title="Reflection questions">
          What's the single metric your leadership would celebrate if you moved by 30%?
          Where would citations most increase trust in your product?
          Which policy would break your RAG the fastest if it changed tomorrow?
        </Callout>

        <h4 className="mt-3 font-semibold">Sample interview questions from this case</h4>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Why RAG over fine-tuning for NovaCart?</li>
          <li>How did the router reduce cost 3×?</li>
          <li>What guardrails prevented PII leaks?</li>
          <li>How would you scale this to 10× traffic without doubling cost?</li>
          <li>What ROI number would justify this to a CFO?</li>
        </ol>
      </Section>

      {/* FAQ */}
      <Section id="faqs" title="FAQ">
        <FAQItem q="Is NovaCart a real company?">No — it's a composite of several deployments to protect real client data. All numbers reflect realistic ranges seen in production.</FAQItem>
        <FAQItem q="Can I replicate this on a startup budget?">Yes. Start with GPT-4o-mini + Postgres + pgvector; add router and multi-provider only when volume justifies it.</FAQItem>
        <FAQItem q="Do you need MLOps to ship GenAI?">Yes — but LLMOps light. Golden set + LLM-as-judge + Langfuse is enough for months.</FAQItem>
        <FAQItem q="Was fine-tuning ever attempted?">Yes, an early LoRA test on tone. It underperformed a well-designed system prompt at 5× the operational cost.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This case study is a composite based on multiple real deployments. Company names,
          personnel and exact figures have been anonymised or synthesised for educational purposes.
          Architectures, tools and KPIs reflect industry-realistic ranges but do not represent any
          single organisation. Generative AI tools, model names, APIs and pricing evolve rapidly —
          always consult the latest official documentation for authoritative guidance. All
          trademarks, product names and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
