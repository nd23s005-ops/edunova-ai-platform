import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-pdf-notes",
  title: "Prompt Engineering — PDF Notes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "52 min",
  pages: 83,
  lastUpdated: "August 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1800&q=80",
  heroSubtitle:
    "Chapter-wise study notes covering Prompt Engineering from fundamentals to enterprise practice — built for offline study, classroom use and long-term reference.",
};

const TOC: TocItem[] = [
  { id: "c1", label: "Chapter 1 — Introduction" },
  { id: "c2", label: "Chapter 2 — Understanding LLMs" },
  { id: "c3", label: "Chapter 3 — Prompt Anatomy" },
  { id: "c4", label: "Chapter 4 — Design Principles" },
  { id: "c5", label: "Chapter 5 — Zero-shot" },
  { id: "c6", label: "Chapter 6 — Few-shot" },
  { id: "c7", label: "Chapter 7 — Chain-of-Thought" },
  { id: "c8", label: "Chapter 8 — Context Engineering" },
  { id: "c9", label: "Chapter 9 — Role Prompting" },
  { id: "c10", label: "Chapter 10 — Structured Output" },
  { id: "c11", label: "Chapter 11 — AI Agents" },
  { id: "c12", label: "Chapter 12 — RAG" },
  { id: "c13", label: "Chapter 13 — Evaluation" },
  { id: "c14", label: "Chapter 14 — Optimization" },
  { id: "c15", label: "Chapter 15 — Security" },
  { id: "c16", label: "Chapter 16 — Enterprise" },
  { id: "c17", label: "Chapter 17 — Emerging Trends" },
  { id: "c18", label: "Chapter 18 — Chapter Summary" },
  { id: "review", label: "PDF Notes Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Quick Revision Notes", tag: "AI & Data", time: "10 min" },
  { title: "Prompt Engineering — Cheat Sheet", tag: "AI & Data", time: "6 min" },
  { title: "Prompt Engineering — Complete Tutorial", tag: "AI & Data", time: "64 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-pdf-notes")({
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

function Chapter({ id, title, definition, notes, example, review }: { id: string; title: string; definition: string; notes: string[]; example?: string; review: string[] }) {
  return (
    <Section id={id} title={title}>
      <p><strong>Definition.</strong> {definition}</p>
      <h3 className="mt-3 font-semibold">Notes</h3>
      <ul className="list-disc space-y-1 pl-5">{notes.map((n) => <li key={n}>{n}</li>)}</ul>
      {example && (
        <>
          <h3 className="mt-3 font-semibold">Example</h3>
          <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{example}</pre>
        </>
      )}
      <h3 className="mt-3 font-semibold">Review questions</h3>
      <ol className="list-decimal space-y-1 pl-5 text-sm">{review.map((r) => <li key={r}>{r}</li>)}</ol>
    </Section>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Build complete Prompt Engineering knowledge chapter by chapter.</li>
          <li>Retain material through summaries, examples and review questions.</li>
          <li>Use as offline study material for exams and interviews.</li>
          <li>Bridge fundamentals to enterprise practice.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80" caption="Prompt lifecycle — draft, test, evaluate, refine. Each chapter maps to one part of this loop." />
      </Section>

      <Chapter id="c1" title="Chapter 1 — Introduction to Prompt Engineering"
        definition="The discipline of writing precise, structured instructions that condition an LLM's output distribution toward a desired result."
        notes={[
          "Prompt Engineering is context engineering + instruction design + evaluation.",
          "Prompts are cheaper than fine-tuning and safer than free-form model use.",
          "Modern applications rely on prompts, retrieval, tools and guardrails together.",
        ]}
        review={["Give three business reasons Prompt Engineering matters.", "Contrast prompting vs fine-tuning in one sentence.", "List two failure modes prompts should mitigate."]}
      />

      <Chapter id="c2" title="Chapter 2 — Understanding LLMs"
        definition="Large Language Models are decoder-only transformers trained to predict the next token given prior context."
        notes={[
          "Tokenisation (BPE / SentencePiece) — 1 token ≈ 4 English characters.",
          "Context window: total tokens the model attends to (typically 128K–2M).",
          "Sampling: temperature, top_p, top_k, repetition penalties, stop sequences.",
          "Instruction tuning + RLHF aligns base models with human intent.",
        ]}
        review={["What is a token and why does it matter for cost?", "Explain temperature vs top_p.", "Why do models hallucinate?"]}
      />

      <Chapter id="c3" title="Chapter 3 — Prompt Anatomy"
        definition="A prompt is composed of a system message, user message, optional assistant history, context blocks and an output contract."
        notes={[
          "System = identity + durable rules.",
          "User = the objective for this turn.",
          "Context = retrieved documents, user data, prior turns.",
          "Output contract = format the response must obey (schema, length, tone).",
        ]}
        example={`SYSTEM: You are a legal research assistant.\nUSER: Summarise the ruling below in 5 bullets.\nOUTPUT: JSON { "summary": string[] }`}
        review={["List the five components of a prompt.", "Where should durable rules live?", "Why is an output contract useful?"]}
      />

      <Chapter id="c4" title="Chapter 4 — Prompt Design Principles"
        definition="Principles that reliably improve output quality: specificity, structure, examples, constraints and iteration."
        notes={[
          "Specificity beats verbosity — say exactly what you want.",
          "Structure beats prose — role, task, context, constraints, format.",
          "Examples beat description for niche formats.",
          "Constraints beat hope — say what to avoid, not only what to include.",
          "Iterate with measurement, not intuition.",
        ]}
        review={["Rewrite 'make it good' into a structured requirement.", "When are examples worth their token cost?"]}
      />

      <Chapter id="c5" title="Chapter 5 — Zero-shot Prompting"
        definition="A prompt with no examples — instructions only. Suitable for well-known tasks."
        notes={[
          "Best for summarisation, translation, classification, sentiment.",
          "Weakens on niche formats or company-specific taxonomies.",
          "Add one example only when zero-shot fails.",
        ]}
        review={["Give two tasks zero-shot handles well.", "Name a failure signal that says 'add examples'."]}
      />

      <Chapter id="c6" title="Chapter 6 — One-shot & Few-shot Prompting"
        definition="Providing one (one-shot) or several (few-shot) examples that anchor the model to the desired pattern."
        notes={[
          "3–8 diverse examples usually maximise accuracy per token spent.",
          "Dynamic few-shot: k-NN over embeddings of the current query — 5–15% uplift.",
          "Cover edge cases explicitly; near-duplicates waste context.",
        ]}
        review={["Why do diverse examples beat similar ones?", "What is dynamic few-shot?"]}
      />

      <Chapter id="c7" title="Chapter 7 — Chain-of-Thought Prompting"
        definition="Prompting techniques that make the model reason step-by-step before producing a final answer."
        notes={[
          "Basic CoT: 'Let's think step by step.'",
          "Plan-and-Solve: force an explicit plan block.",
          "Self-consistency: sample N chains, majority-vote.",
          "Reflexion: model critiques and retries its own answer.",
          "CoT increases token cost — reserve for accuracy-critical tasks.",
        ]}
        review={["When is CoT NOT worth the cost?", "Explain self-consistency."]}
      />

      <Chapter id="c8" title="Chapter 8 — Context Engineering"
        definition="Deliberate management of what goes into the model's context window, in what order and at what cost."
        notes={[
          "Budget: ~10% instructions, ~60% context, ~30% output.",
          "Order: stable prefix first for KV-cache; volatile data last.",
          "'Lost in the middle' — critical info first or last.",
          "Compress old chat turns into running summaries.",
        ]}
        review={["Why does prefix stability matter?", "Give one mitigation for 'lost in the middle'."]}
      />

      <Chapter id="c9" title="Chapter 9 — Role Prompting"
        definition="Assigning a persona or expertise to the assistant to shape tone and reasoning."
        notes={[
          "Roles influence vocabulary, depth and safety posture.",
          "Combine role + goal + constraints for reliable behaviour.",
          "Avoid roles that pressure the model to bypass safety.",
        ]}
        example={`SYSTEM: You are a senior SRE. Explain incident postmortems to a junior engineer.`}
        review={["Give two effects of a role assignment.", "Name a risky role pattern."]}
      />

      <Chapter id="c10" title="Chapter 10 — Structured Output Prompting"
        definition="Techniques that force the model to emit machine-parseable output (JSON, XML, YAML) that conforms to a schema."
        notes={[
          "Prefer response_format / function calling over free-text 'return JSON'.",
          "Validate output against schema; retry with error message on failure.",
          "Constrained decoding eliminates whole classes of parse errors.",
        ]}
        review={["Why is schema-based output safer than string parsing?"]}
      />

      <Chapter id="c11" title="Chapter 11 — AI Agents"
        definition="LLM-driven programs that plan, call tools and iterate until a goal is met."
        notes={[
          "Tool / function calling is the base primitive.",
          "ReAct — Thought · Action · Observation loop.",
          "Multi-agent: Planner–Executor, Supervisor patterns.",
          "Always enforce budgets: steps, tokens, cost, wall time.",
        ]}
        review={["What does the ReAct loop consist of?", "Why are budgets non-negotiable?"]}
      />

      <Chapter id="c12" title="Chapter 12 — Retrieval-Augmented Generation (RAG)"
        definition="Fetching relevant documents at query time and grounding LLM answers in them."
        notes={[
          "Pipeline: rewrite → embed → search → rerank → pack → generate → cite.",
          "Hybrid (BM25 + dense) + cross-encoder rerank beats either alone.",
          "Force citations and authorise abstain to reduce hallucination.",
          "Advanced: HyDE, CRAG, Self-RAG, GraphRAG.",
        ]}
        review={["Why do we rerank?", "What is 'abstain' and why is it useful?"]}
      />

      <Chapter id="c13" title="Chapter 13 — Prompt Evaluation"
        definition="Systematic measurement of prompt quality against a labelled golden set."
        notes={[
          "50–500 hand-labelled examples usually suffice.",
          "Metrics: exact match, regex, faithfulness, precision, recall.",
          "LLM-as-judge with pairwise + position randomisation.",
          "Online: thumbs, task completion, escalation rate.",
        ]}
        review={["Why randomise position in LLM-as-judge?"]}
      />

      <Chapter id="c14" title="Chapter 14 — Prompt Optimization"
        definition="Techniques to reduce cost and latency while improving or maintaining accuracy."
        notes={[
          "Shorten prompts; drop filler; move examples to the tail.",
          "Cache stable prefixes (KV-cache).",
          "Route easy calls to a small model; escalate on low confidence.",
          "Batch similar requests into one call.",
          "Automate with APE / OPRO / DSPy.",
        ]}
        review={["Give three levers for prompt cost reduction."]}
      />

      <Chapter id="c15" title="Chapter 15 — Prompt Security"
        definition="Defences against prompt injection, jailbreaks and data exfiltration."
        notes={[
          "Delimit + spotlight untrusted input.",
          "Layer input/output classifiers; monitor for known payloads.",
          "Scrub PII from inputs and logs.",
          "Use dual-LLM pattern for tool-using agents.",
        ]}
        review={["What is indirect prompt injection?", "Name two defences."]}
      />

      <Chapter id="c16" title="Chapter 16 — Enterprise Prompt Engineering"
        definition="Practices required to run prompts safely in production at scale."
        notes={[
          "Versioned prompt registry with semver.",
          "Observability: LangSmith / Langfuse / Arize.",
          "Rollouts: canary → 10% → 100% with auto-rollback on eval regression.",
          "Governance: SOC2, data residency, audit logs, red-team pre-release.",
        ]}
        review={["Why version prompts?", "What breaks first without observability?"]}
      />

      <Chapter id="c17" title="Chapter 17 — Emerging Trends"
        definition="Directions shaping the near-term future of Prompt Engineering."
        notes={[
          "Programmatic prompting (DSPy) is replacing hand-tuning at scale.",
          "Long-context models reduce (but don't remove) the need for RAG.",
          "Multimodal prompting: text + image + audio + video.",
          "Agentic workflows with memory tiers and structured planning.",
          "Small-model distillation of expensive CoT prompts.",
        ]}
        review={["Name two trends and one risk they introduce."]}
      />

      <Chapter id="c18" title="Chapter 18 — Chapter Summary"
        definition="A one-page bird's-eye view of everything covered so far."
        notes={[
          "Prompts = instructions + context + constraints + format.",
          "LLMs predict tokens; sampling and context shape everything.",
          "Zero-shot first, few-shot when needed, CoT when accuracy demands it.",
          "Structured output + evaluation + observability = production-ready.",
          "Security and governance are as important as accuracy.",
        ]}
        review={["Reproduce this summary from memory in your own words."]}
      />

      <Section id="review" title="PDF Notes Review">
        <Figure src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1600&q=80" caption="Recommended revision cycle — read the chapter, do the review, revisit the chapter summary the next day." />
        <h3 className="font-semibold">Chapter-wise summary</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Ch.</th><th className="text-left p-2">Focus</th></tr></thead>
          <tbody>
            {[
              ["1","Why Prompt Engineering matters"],["2","LLM internals"],["3","Prompt anatomy"],
              ["4","Design principles"],["5","Zero-shot"],["6","Few-shot"],["7","Chain-of-thought"],
              ["8","Context engineering"],["9","Role prompting"],["10","Structured output"],
              ["11","Agents"],["12","RAG"],["13","Evaluation"],["14","Optimization"],
              ["15","Security"],["16","Enterprise"],["17","Emerging trends"],["18","Grand summary"],
            ].map(([c,f]) => <tr key={c} className="border-b"><td className="p-2">{c}</td><td className="p-2">{f}</td></tr>)}
          </tbody>
        </table>
        <h3 className="mt-4 font-semibold">Important topics for exams / interviews</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompt anatomy and design principles.</li>
          <li>CoT, self-consistency, reflexion.</li>
          <li>RAG pipeline end-to-end.</li>
          <li>Prompt security (injection, jailbreaks).</li>
          <li>Evaluation methodology and metrics.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Self assessment</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Design a prompt for extracting invoice fields into JSON.</li>
          <li>Compare CoT vs Reflexion — when to use each.</li>
          <li>Whiteboard a RAG stack for a documentation Q&amp;A bot.</li>
          <li>Name three defences against indirect prompt injection.</li>
          <li>Describe a golden-set evaluation from start to finish.</li>
        </ol>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Token</strong> — sub-word chunk produced by the tokenizer.</li>
          <li><strong>Context window</strong> — max tokens the model reads at once.</li>
          <li><strong>Hallucination</strong> — plausible-looking but incorrect output.</li>
          <li><strong>Grounding</strong> — anchoring answers in retrieved evidence.</li>
          <li><strong>Abstain</strong> — permitted 'I don't know' response.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I read these notes in one sitting?">You can, but one chapter/day with the review questions retains far more.</FAQItem>
        <FAQItem q="Do I need coding to use these notes?">No for concepts; yes if you follow the RAG and agent chapters into implementation.</FAQItem>
        <FAQItem q="Which chapter should I re-read most often?">Chapters 3, 4, 8, 12, 13 — anatomy, principles, context, RAG, evaluation.</FAQItem>
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
