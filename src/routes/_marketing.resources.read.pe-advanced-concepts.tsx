import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-advanced-concepts",
  title: "Prompt Engineering — Advanced Concepts",
  category: "AI & Data",
  difficulty: "Advanced",
  readingTime: "31 min",
  pages: 40,
  lastUpdated: "October 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
  heroSubtitle:
    "An advanced deep-dive into how LLMs interpret prompts — covering agentic workflows, RAG, tool calling, context engineering, prompt optimisation, evaluation and AI safety for production systems.",
};

const TOC: TocItem[] = [
  { id: "internals", label: "1. Prompt Engineering Internals" },
  { id: "transformer", label: "2. Transformer & Tokenization" },
  { id: "design", label: "3. Advanced Prompt Design" },
  { id: "shot", label: "4. Zero / One / Few-shot" },
  { id: "cot", label: "5. Chain-of-Thought & Reasoning" },
  { id: "self", label: "6. Self-Consistency & Reflection" },
  { id: "rag", label: "7. Retrieval-Augmented Generation" },
  { id: "agents", label: "8. AI Agents & Tool Calling" },
  { id: "opt", label: "9. Prompt Optimization" },
  { id: "multi", label: "10. Multimodal Prompting" },
  { id: "eval", label: "11. Prompt Evaluation" },
  { id: "safety", label: "12. AI Safety & Guardrails" },
  { id: "enterprise", label: "13. Enterprise Prompt Systems" },
  { id: "research", label: "14. Emerging Research" },
  { id: "future", label: "15. Future of Prompt Engineering" },
  { id: "review", label: "Advanced Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-advanced-concepts")({
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
    <ReaderShell resource={RESOURCE} toc={TOC}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master advanced prompting strategies used in production LLM systems.</li>
          <li>Understand how a transformer decoder actually interprets a prompt token-by-token.</li>
          <li>Design agentic workflows with tool calling, memory and planning.</li>
          <li>Build RAG pipelines that stay grounded and hallucinate less.</li>
          <li>Evaluate prompts systematically — offline, online and via LLM-as-judge.</li>
          <li>Ship safe, monitored, cost-efficient prompt systems at scale.</li>
        </ul>
      </Section>

      <Section id="internals" title="1. Prompt Engineering Internals">
        <p>
          A prompt is not a natural-language instruction — it is a <em>token sequence conditioning the next-token distribution</em> of an autoregressive model. Every advanced technique in this handbook exploits three levers: (1) which tokens sit in the context window, (2) in what order, and (3) how the sampler is configured. Understanding this shifts prompt engineering from folklore to engineering discipline.
        </p>
        <Figure
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
          alt="LLM prompt lifecycle: tokenise, attend, sample, decode"
          caption="Prompt lifecycle — tokenisation → context assembly → attention → sampling → detokenisation."
        />
        <Callout tone="info" title="Mental model">
          Treat the LLM as a stateless function <code>P(next_token | context)</code>. Everything you do — system prompts, RAG, tools, reflection — is context engineering around that single function call.
        </Callout>
      </Section>

      <Section id="transformer" title="2. Transformer & Tokenization Overview">
        <p>
          Decoder-only transformers (GPT, Claude, Llama, Gemini) predict tokens using masked self-attention over the entire prompt plus previously generated tokens. Key implications for prompt design:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>BPE / SentencePiece tokenisation</strong>: whitespace, casing and punctuation change token IDs — "  hello" ≠ "hello". Non-English text costs 2–5× more tokens.</li>
          <li><strong>Attention is O(n²)</strong>: long contexts are quadratically expensive and empirically less accurate mid-context (the "lost in the middle" effect).</li>
          <li><strong>Positional encodings</strong> (RoPE, ALiBi) generalise imperfectly beyond training length — models with 1M-token windows still degrade past ~64K on hard tasks.</li>
          <li><strong>KV-cache</strong> makes long system prompts cheap to reuse across turns but hot to change.</li>
        </ul>
      </Section>

      <Section id="design" title="3. Advanced Prompt Design">
        <p>Advanced prompts are layered artefacts, not one-liners. A production prompt is typically decomposed into six blocks:</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>Role / persona</strong> — who the model is.</li>
          <li><strong>Objective</strong> — the measurable goal.</li>
          <li><strong>Context</strong> — retrieved documents, memory, user profile.</li>
          <li><strong>Constraints</strong> — style, format, forbidden actions.</li>
          <li><strong>Reasoning scaffold</strong> — CoT hints, plan-then-solve, ReAct.</li>
          <li><strong>Output contract</strong> — JSON schema, stop tokens, length.</li>
        </ol>
        <Callout tone="tip" title="Context engineering">
          Order matters. Put stable instructions first (KV-cache friendly), volatile data last (near the generation cursor where attention is strongest).
        </Callout>
      </Section>

      <Section id="shot" title="4. Zero-shot, One-shot & Few-shot Prompting">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Zero-shot</strong> — instruction only. Preferred for frontier models on well-known tasks.</li>
          <li><strong>One-shot</strong> — a single canonical example. Best when output format is unusual.</li>
          <li><strong>Few-shot</strong> — 3–8 diverse examples. Best when the task is niche or model is small.</li>
          <li><strong>Example selection</strong>: use k-NN over embeddings of the user query (dynamic few-shot / kate) rather than static examples — 5–15% accuracy uplift on GSM8K-style benchmarks.</li>
        </ul>
      </Section>

      <Section id="cot" title="5. Chain-of-Thought & Reasoning Patterns">
        <p>Modern reasoning patterns beyond vanilla "let's think step by step":</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Plan-and-Solve</strong> — force a plan block before execution.</li>
          <li><strong>Least-to-Most</strong> — decompose into sub-problems solved sequentially.</li>
          <li><strong>Tree-of-Thoughts (ToT)</strong> — explore multiple reasoning branches with a scoring model.</li>
          <li><strong>Graph-of-Thoughts</strong> — reasoning as a DAG with merges.</li>
          <li><strong>ReAct</strong> — interleave <code>Thought → Action → Observation</code> for tool use.</li>
          <li><strong>Reflexion</strong> — self-critique traces stored as episodic memory.</li>
        </ul>
        <Callout tone="warning" title="Cost caveat">
          CoT can double or triple token usage. For latency-sensitive paths, distil the chain into a compact "final answer only" prompt after evaluation shows it's safe.
        </Callout>
      </Section>

      <Section id="self" title="6. Self-Consistency & Reflection">
        <p>
          <strong>Self-consistency</strong> samples N reasoning traces with temperature &gt; 0 and majority-votes the final answer — a Pareto improvement on CoT for arithmetic and logic tasks.
          <strong>Reflection</strong> loops feed the model its own output plus a critique prompt to iteratively refine. Use reflection sparingly: models often reinforce their own mistakes without an external verifier.
        </p>
      </Section>

      <Section id="rag" title="7. Retrieval-Augmented Generation (RAG)">
        <p>RAG grounds generation in an external corpus. A production RAG stack:</p>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Query → Query rewriting → Embedding → Vector search (top-k)
      → Re-ranker (cross-encoder) → Context packing → LLM
      → Citation post-processing → Response`}</pre>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Chunking</strong>: 256–1024 tokens with 10–20% overlap; respect semantic boundaries.</li>
          <li><strong>Hybrid retrieval</strong>: BM25 + dense embeddings + reranker beats any single method.</li>
          <li><strong>Query transformation</strong>: HyDE, multi-query, step-back prompting.</li>
          <li><strong>Advanced patterns</strong>: GraphRAG, agentic RAG, corrective RAG (CRAG), Self-RAG.</li>
        </ul>
      </Section>

      <Section id="agents" title="8. AI Agents & Tool Calling">
        <p>
          Agents extend LLMs with tools, memory and a control loop. Function/tool calling is now the dominant primitive — the model emits structured JSON that the runtime dispatches to actual functions (search, SQL, code execution, HTTP APIs).
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Single-agent ReAct loop</strong> — simple, debuggable, good for &lt;10 steps.</li>
          <li><strong>Planner–executor</strong> — separate models for planning and doing.</li>
          <li><strong>Multi-agent</strong> (LangGraph, CrewAI, AutoGen) — role-specialised agents with a supervisor.</li>
          <li><strong>Memory tiers</strong> — scratchpad → episodic → semantic → long-term (vector store).</li>
        </ul>
        <Callout tone="warning" title="Agent failure modes">
          Infinite loops, tool hallucination, and cost blow-ups. Always cap steps, budget tokens, and validate every tool arg with a schema.
        </Callout>
      </Section>

      <Section id="opt" title="9. Prompt Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Automatic Prompt Engineer (APE)</strong> — LLM proposes and scores candidate prompts.</li>
          <li><strong>OPRO</strong> — treats the LLM as a black-box optimiser over a prompt score.</li>
          <li><strong>DSPy</strong> — compiles high-level "signatures" into optimised few-shot prompts.</li>
          <li><strong>Textual gradients</strong> (TextGrad) — natural-language feedback as a gradient signal.</li>
          <li><strong>Distillation</strong> — replace expensive CoT prompts with a fine-tuned small model.</li>
        </ul>
      </Section>

      <Section id="multi" title="10. Multimodal Prompting">
        <p>
          Vision-language models (GPT-4o, Claude 3.5, Gemini 2) accept interleaved image + text. Best practices:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Downscale images to the model's native tile size (e.g. 512px) — larger costs more, rarely helps.</li>
          <li>Reference regions with normalized coordinates or bounding boxes for grounded answers.</li>
          <li>For audio, prefer streaming ASR + text LLM unless prosody matters.</li>
        </ul>
      </Section>

      <Section id="eval" title="11. Prompt Evaluation">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Method</th><th className="text-left p-2">When</th><th className="text-left p-2">Trade-off</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Exact match / regex</td><td className="p-2">Structured output</td><td className="p-2">Brittle to phrasing</td></tr>
            <tr className="border-b"><td className="p-2">Embedding similarity</td><td className="p-2">Semantic answers</td><td className="p-2">Ignores factuality</td></tr>
            <tr className="border-b"><td className="p-2">LLM-as-judge</td><td className="p-2">Subjective quality</td><td className="p-2">Bias, cost, variance</td></tr>
            <tr className="border-b"><td className="p-2">Human eval</td><td className="p-2">High-stakes launches</td><td className="p-2">Slow, expensive</td></tr>
            <tr><td className="p-2">A/B online</td><td className="p-2">Production</td><td className="p-2">Needs traffic + metrics</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="safety" title="12. AI Safety & Guardrails">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Prompt injection</strong> — untrusted text overriding instructions. Mitigate with delimiters, spotlighting, and dual-LLM patterns.</li>
          <li><strong>Jailbreaks</strong> — DAN, role-play, encoded payloads. Layer with input/output classifiers.</li>
          <li><strong>PII leakage</strong> — scrub before prompting; redact in logs.</li>
          <li><strong>Hallucination reduction</strong> — grounding, citations, "answer only from context", abstain tokens.</li>
          <li><strong>Guardrail libraries</strong> — Guardrails AI, NeMo Guardrails, Llama Guard, Azure Content Safety.</li>
        </ul>
      </Section>

      <Section id="enterprise" title="13. Enterprise Prompt Systems">
        <p>Production prompt systems look more like microservices than notebooks:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Prompt registry</strong> — versioned, reviewed, environment-scoped.</li>
          <li><strong>Observability</strong> — LangSmith, Langfuse, Arize — every call traced with inputs, outputs, cost, latency.</li>
          <li><strong>Model routing</strong> — cheap model first, escalate on low confidence.</li>
          <li><strong>Caching</strong> — semantic + exact match; savings of 30–70% typical.</li>
          <li><strong>Governance</strong> — SOC2, PII policies, audit trails, red-team runs pre-release.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
          alt="Enterprise prompt system dashboards"
          caption="Enterprise prompt platform — registry, evaluation, observability and cost dashboards."
        />
      </Section>

      <Section id="research" title="14. Emerging Research">
        <ul className="list-disc space-y-1 pl-5">
          <li>Constitutional AI &amp; RLAIF for scalable alignment.</li>
          <li>Long-context tricks: attention sinks, ring attention, YaRN.</li>
          <li>o1-style deliberative reasoning &amp; inference-time compute scaling.</li>
          <li>Agentic benchmarks: SWE-bench, WebArena, GAIA.</li>
          <li>Prompt-based fine-tuning: prefix tuning, prompt tuning, P-tuning v2.</li>
        </ul>
      </Section>

      <Section id="future" title="15. Future of Prompt Engineering">
        <p>
          As models get better at instruction-following, hand-crafted prompts fade — replaced by <em>specifications</em> (DSPy signatures, structured outputs) and <em>learned prompts</em> (soft prompts, adapters). The durable skills are context design, evaluation and system architecture, not clever phrasing.
        </p>
      </Section>

      <Section id="review" title="Advanced Review">
        <h3 className="font-semibold">Architecture summary</h3>
        <p>Layered prompts → retrieval → tools → evaluation → guardrails → observability.</p>
        <h3 className="mt-4 font-semibold">Expert checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every prompt is versioned and eval-gated.</li>
          <li>Untrusted input is delimited and monitored for injection.</li>
          <li>Retrieval is hybrid + reranked; citations are enforced.</li>
          <li>Agents have step, cost and time budgets.</li>
          <li>Every production call is traced and cost-attributed.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Reflection questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Where does your prompt spend its tokens — instructions, context or output?</li>
          <li>What is your abstain rate, and is it monitored?</li>
          <li>How would you detect a prompt regression in production?</li>
        </ul>
        <h3 className="mt-4 font-semibold">Discussion topics</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>When does fine-tuning beat prompting?</li>
          <li>Is prompt engineering a durable career or a transient skill?</li>
        </ul>
        <h3 className="mt-4 font-semibold">Advanced interview questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Explain the "lost in the middle" phenomenon and three mitigations.</li>
          <li>Compare ReAct, Reflexion and Plan-and-Execute agents.</li>
          <li>Design an evaluation pipeline for a customer-support RAG system.</li>
          <li>How do you defend against indirect prompt injection?</li>
          <li>Contrast LoRA, prefix tuning and prompt tuning.</li>
        </ol>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is prompt engineering going away?">The clever-phrasing part is fading; the system-design part is growing.</FAQItem>
        <FAQItem q="Do I still need CoT with reasoning models?">Less so — reasoning models internalise it. But structured plans still help on tool use.</FAQItem>
        <FAQItem q="Best default for JSON output?">Constrained decoding or function calling — never regex on free text.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, industry standards, and trusted educational resources. Prompt Engineering techniques, AI models, APIs, and best practices evolve continuously — consult official documentation for the latest information. All trademarks, product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
