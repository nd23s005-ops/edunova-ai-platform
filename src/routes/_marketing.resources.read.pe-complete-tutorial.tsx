import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-complete-tutorial",
  title: "Prompt Engineering — Complete Tutorial",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "64 min",
  pages: 112,
  lastUpdated: "April 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=1800&q=80",
  heroSubtitle:
    "An end-to-end Prompt Engineering tutorial — from LLM fundamentals to context engineering, RAG, agents, evaluation, optimisation, safety, deployment and a capstone project.",
};

const TOC: TocItem[] = [
  { id: "fund", label: "1. Prompt Engineering Fundamentals" },
  { id: "llm", label: "2. LLM Fundamentals" },
  { id: "components", label: "3. Prompt Components" },
  { id: "templates", label: "4. Prompt Templates" },
  { id: "zero", label: "5. Zero-shot Prompting" },
  { id: "few", label: "6. One-shot & Few-shot" },
  { id: "cot", label: "7. Chain-of-Thought" },
  { id: "context", label: "8. Context Engineering" },
  { id: "rag", label: "9. RAG" },
  { id: "agents", label: "10. AI Agents" },
  { id: "eval", label: "11. Prompt Evaluation" },
  { id: "opt", label: "12. Prompt Optimization" },
  { id: "safety", label: "13. AI Safety" },
  { id: "deploy", label: "14. Deployment" },
  { id: "capstone", label: "15. Final Project" },
  { id: "review", label: "Tutorial Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Beginner Guide", tag: "AI & Data", time: "12 min" },
  { title: "Prompt Engineering — Advanced Concepts", tag: "AI & Data", time: "31 min" },
  { title: "Prompt Engineering — Reference Guide", tag: "AI & Data", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-complete-tutorial")({
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
          <li>Master the full Prompt Engineering stack, from tokens to production.</li>
          <li>Design, evaluate and ship prompt-driven AI features.</li>
          <li>Build a portfolio-grade capstone project.</li>
          <li>Prepare for AI-engineering interviews with hands-on skills.</li>
        </ul>
      </Section>

      <Section id="fund" title="1. Prompt Engineering Fundamentals">
        <p>Prompt Engineering is the discipline of shaping LLM behaviour through context. A prompt is a token sequence that conditions the next-token distribution — everything else in this tutorial is engineering around that fact.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Three levers: content, order, sampling.</li>
          <li>Iteration loop: draft → test → evaluate → refine.</li>
          <li>Prompting complements — does not replace — retrieval, tools and fine-tuning.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80"
          caption="Prompt lifecycle — tokenise → attend → sample → decode → evaluate."
        />
      </Section>

      <Section id="llm" title="2. LLM Fundamentals">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Architecture</strong>: decoder-only transformer with masked self-attention.</li>
          <li><strong>Tokenisation</strong>: BPE / SentencePiece; 1 token ≈ 4 English characters.</li>
          <li><strong>Context window</strong>: total tokens the model can attend over (128K–2M+).</li>
          <li><strong>Sampling</strong>: temperature, top_p, top_k, penalties, stop sequences.</li>
          <li><strong>Instruct tuning + RLHF</strong>: aligns base models with human intent.</li>
        </ul>
      </Section>

      <Section id="components" title="3. Prompt Components">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Component</th><th className="text-left p-2">Role</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">System</td><td className="p-2">Durable identity + rules</td></tr>
            <tr className="border-b"><td className="p-2">Objective</td><td className="p-2">The measurable goal</td></tr>
            <tr className="border-b"><td className="p-2">Context</td><td className="p-2">Retrieved / user data</td></tr>
            <tr className="border-b"><td className="p-2">Reasoning scaffold</td><td className="p-2">Plans / CoT hints</td></tr>
            <tr className="border-b"><td className="p-2">Constraints</td><td className="p-2">Style, forbidden actions</td></tr>
            <tr><td className="p-2">Output contract</td><td className="p-2">JSON schema, stop tokens</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="templates" title="4. Prompt Templates">
        <h3 className="font-semibold">Summarisation</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`SYSTEM: You are a concise brief writer.
USER: Summarise the article below in {n} bullets. Preserve numbers.
"""{document}"""`}</pre>
        <h3 className="mt-4 font-semibold">Extraction</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Extract fields per schema. Return null for missing.
Schema: { invoice: string, total: number, currency: string, due: date }
Document: """{text}"""`}</pre>
        <h3 className="mt-4 font-semibold">Classification</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Classify into ONE label: [bug, billing, feature, other].
Return JSON: { "label": string, "confidence": 0..1 }
Ticket: """{text}"""`}</pre>
      </Section>

      <Section id="zero" title="5. Zero-shot Prompting">
        <p>Frontier models are strong zero-shot on well-known tasks. Prefer zero-shot until it fails — then add examples.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Great for summarisation, translation, sentiment, classification.</li>
          <li>Weaker for niche domains, unusual formats or company-specific taxonomies.</li>
        </ul>
      </Section>

      <Section id="few" title="6. One-shot & Few-shot Prompting">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>One-shot</strong> when format is unusual but tasks are similar.</li>
          <li><strong>Few-shot (3–8)</strong> for niche tasks or small models.</li>
          <li><strong>Dynamic few-shot</strong>: k-NN over embeddings of the current query — 5–15% accuracy uplift.</li>
          <li>Diverse examples &gt; near-duplicates. Cover edge cases explicitly.</li>
        </ul>
      </Section>

      <Section id="cot" title="7. Chain-of-Thought Prompting">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic CoT: "Let's think step by step."</li>
          <li>Plan-and-Solve: force a plan block before execution.</li>
          <li>Self-consistency: sample N chains, majority-vote.</li>
          <li>Reflexion: model critiques and retries its own answer.</li>
        </ul>
        <Callout tone="warning" title="Cost">CoT can double or triple tokens. Reserve for tasks where accuracy matters more than latency.</Callout>
      </Section>

      <Section id="context" title="8. Context Engineering">
        <ul className="list-disc space-y-1 pl-5">
          <li>Order: stable prefix first (KV-cache), volatile data last.</li>
          <li>Budget: ~10% instructions, ~60% context, ~30% output.</li>
          <li>Compress old chat turns into running summaries.</li>
          <li>Watch for 'lost in the middle' — critical info first or last.</li>
        </ul>
      </Section>

      <Section id="rag" title="9. RAG (Retrieval-Augmented Generation)">
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Query → Rewrite → Embed → Vector search (top-k)
      → Rerank (cross-encoder) → Pack → LLM
      → Post-process (citations) → Response`}</pre>
        <ul className="list-disc space-y-1 pl-5">
          <li>Chunk 256–1024 tokens with 10–20% overlap.</li>
          <li>Hybrid retrieval (BM25 + dense) + reranker beats either alone.</li>
          <li>Advanced: HyDE, CRAG, Self-RAG, GraphRAG.</li>
          <li>Force citations + authorise abstain to reduce hallucination.</li>
        </ul>
      </Section>

      <Section id="agents" title="10. AI Agents">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tool / function calling as the base primitive.</li>
          <li>ReAct — Thought · Action · Observation loop.</li>
          <li>Planner–Executor / Supervisor multi-agent patterns.</li>
          <li>Memory tiers: scratchpad → episodic → semantic.</li>
          <li>Budgets: max steps, tokens, cost, wall time. Non-negotiable.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          caption="Agent workflow — ReAct loop with tool calls, observations and a bounded step budget."
        />
      </Section>

      <Section id="eval" title="11. Prompt Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Golden set of 50–500 hand-labelled examples.</li>
          <li>Exact match / regex for structured tasks.</li>
          <li>LLM-as-judge with pairwise + position randomisation.</li>
          <li>Ragas metrics for RAG: faithfulness, context precision/recall, answer relevance.</li>
          <li>Online: thumbs / task completion / escalation rate.</li>
        </ul>
      </Section>

      <Section id="opt" title="12. Prompt Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Shorten before you complicate; drop filler words.</li>
          <li>Move examples to the tail for stronger attention.</li>
          <li>Constrained decoding (JSON schema) &gt; free-text 'return JSON'.</li>
          <li>Cache stable prefixes (KV-cache) to cut cost + latency.</li>
          <li>Automate with APE / OPRO / DSPy for scale.</li>
          <li>Distil expensive CoT prompts into fine-tuned small models.</li>
        </ul>
      </Section>

      <Section id="safety" title="13. AI Safety">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompt injection: delimit + spotlight + classifier + dual-LLM patterns.</li>
          <li>Jailbreaks: layer input/output classifiers; monitor for known payloads.</li>
          <li>PII: scrub inputs and logs; hash where possible.</li>
          <li>Hallucination: grounding + citations + abstain path.</li>
          <li>Guardrail libraries: Guardrails AI, NeMo, Llama Guard.</li>
        </ul>
      </Section>

      <Section id="deploy" title="14. Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li>Version prompts semver-style; log the served version on every call.</li>
          <li>Observability: LangSmith / Langfuse / Arize — trace inputs, outputs, tokens, cost.</li>
          <li>Model routing: cheap model → escalate on low confidence.</li>
          <li>Caching: exact + semantic; typical savings 30–70%.</li>
          <li>Rollout: canary 1% → 10% → 100% with automatic rollback on eval regression.</li>
          <li>Governance: SOC2, data residency, audit logs, red-team pre-release.</li>
        </ul>
      </Section>

      <Section id="capstone" title="15. Final Project — Doc-Grounded Assistant">
        <p><strong>Goal</strong>: Ship a documentation Q&amp;A assistant that answers only from a provided corpus, with citations.</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Ingest 200+ pages of markdown; chunk 512 tokens with 15% overlap.</li>
          <li>Embed with a modern model (e.g. text-embedding-3-large or bge-large).</li>
          <li>Store in pgvector; add a hybrid BM25 index.</li>
          <li>Retrieval: top-20 → cross-encoder rerank → top-5.</li>
          <li>Prompt: system rules + numbered chunks + user query + abstain clause.</li>
          <li>Enforce JSON output: <code>{`{ answer, citations[] }`}</code>.</li>
          <li>Add PII scrub + prompt-injection sentinel.</li>
          <li>Build a 50-example golden set; measure faithfulness, precision, recall.</li>
          <li>Ship behind a feature flag with observability + cost dashboard.</li>
          <li>Write a README + 1-page case study for your portfolio.</li>
        </ol>
      </Section>

      <Section id="review" title="Tutorial Review">
        <h3 className="font-semibold">Final quiz</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Why does 'lost in the middle' happen and how do you mitigate it?</li>
          <li>Compare ReAct, Reflexion and Plan-and-Execute.</li>
          <li>Design an evaluation pipeline for a support-bot RAG.</li>
          <li>Contrast prompting, RAG and fine-tuning — when do you pick each?</li>
          <li>Name three defences against indirect prompt injection.</li>
        </ol>
        <h3 className="mt-4 font-semibold">Project checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Versioned prompt registry.</li>
          <li>Golden set with ≥50 examples.</li>
          <li>Hybrid retrieval + reranker.</li>
          <li>Structured output with schema validation.</li>
          <li>Observability dashboard (cost / latency / errors).</li>
        </ul>
        <h3 className="mt-4 font-semibold">Capstone review</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Does the system abstain when context is insufficient?</li>
          <li>Do all answers cite retrieved chunks?</li>
          <li>Is your golden-set score above the baseline you set on day 1?</li>
        </ul>
        <h3 className="mt-4 font-semibold">Interview preparation</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Whiteboard the RAG stack end-to-end.</li>
          <li>Live-debug a hallucinating prompt.</li>
          <li>Compare LoRA, prefix tuning and prompt tuning.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Token</strong> — sub-word unit produced by the tokenizer.</li>
          <li><strong>RAG</strong> — Retrieval-Augmented Generation.</li>
          <li><strong>Agent</strong> — LLM + tools + control loop.</li>
          <li><strong>Golden set</strong> — hand-labelled eval examples.</li>
          <li><strong>Abstain</strong> — controlled 'I don't know' output.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I skip RAG and just use a bigger context window?">You can, but quality drops mid-context and cost balloons. RAG scales better.</FAQItem>
        <FAQItem q="When do I fine-tune?">After prompting + RAG plateau, or when latency/cost demand it.</FAQItem>
        <FAQItem q="Which framework should I pick?">LangChain for breadth, LlamaIndex for RAG, DSPy for programmatic prompting.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, industry standards, and trusted educational resources. Prompt Engineering techniques, AI models, APIs, frameworks, and best practices evolve continuously — consult official documentation for the latest information. All trademarks, product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
