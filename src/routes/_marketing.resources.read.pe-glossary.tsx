import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-glossary",
  title: "Prompt Engineering — Glossary",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "14 min",
  pages: 10,
  lastUpdated: "February 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1800&q=80",
  heroSubtitle:
    "An A–Z glossary of Prompt Engineering: 250+ definitions covering prompts, LLM vocabulary, patterns, agent terminology, evaluation metrics, APIs and interview vocabulary — with beginner-friendly and technical explanations.",
};

const TOC: TocItem[] = [
  { id: "how-to", label: "1. Using this Glossary" },
  { id: "acronyms", label: "2. Acronyms" },
  { id: "az", label: "3. A–Z Terminology" },
  { id: "llm", label: "4. LLM Vocabulary" },
  { id: "patterns", label: "5. Prompt Patterns" },
  { id: "agents", label: "6. Agent Terms" },
  { id: "metrics", label: "7. Evaluation Metrics" },
  { id: "api", label: "8. API Terminology" },
  { id: "interview", label: "9. Interview Vocabulary" },
  { id: "lookup", label: "10. Quick Lookup Index" },
  { id: "review", label: "Glossary Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-glossary")({
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

type Entry = { term: string; short: string; tech?: string; example?: string; related?: string; tip?: string };

const ACRONYMS: [string, string][] = [
  ["LLM", "Large Language Model"],
  ["PE", "Prompt Engineering"],
  ["CoT", "Chain-of-Thought"],
  ["ToT", "Tree-of-Thoughts"],
  ["GoT", "Graph-of-Thoughts"],
  ["RAG", "Retrieval-Augmented Generation"],
  ["ICL", "In-Context Learning"],
  ["SFT", "Supervised Fine-Tuning"],
  ["RLHF", "Reinforcement Learning from Human Feedback"],
  ["RLAIF", "RL from AI Feedback"],
  ["DPO", "Direct Preference Optimization"],
  ["PEFT", "Parameter-Efficient Fine-Tuning"],
  ["LoRA", "Low-Rank Adaptation"],
  ["MoE", "Mixture of Experts"],
  ["KV", "Key-Value (cache)"],
  ["BPE", "Byte-Pair Encoding"],
  ["TPS", "Tokens Per Second"],
  ["TTFT", "Time To First Token"],
  ["TPOT", "Time Per Output Token"],
  ["JSON", "JavaScript Object Notation"],
  ["API", "Application Programming Interface"],
  ["SDK", "Software Development Kit"],
  ["MCP", "Model Context Protocol"],
  ["HyDE", "Hypothetical Document Embeddings"],
  ["CRAG", "Corrective RAG"],
  ["APE", "Automatic Prompt Engineer"],
  ["OPRO", "Optimization by PROmpting"],
  ["DSPy", "Declarative Self-improving Python"],
  ["ReAct", "Reason + Act"],
  ["PII", "Personally Identifiable Information"],
  ["NLU", "Natural Language Understanding"],
  ["NLG", "Natural Language Generation"],
];

const AZ: Entry[] = [
  { term: "Abstain", short: "The model refusing to answer when unsure.", tech: "A guardrail behaviour producing 'I don't know' instead of a low-confidence guess.", tip: "Bake abstain phrasing into your system prompt.", related: "Hallucination, Confidence" },
  { term: "Adversarial prompt", short: "Prompt crafted to bypass safety.", example: "'Ignore previous instructions and…'" },
  { term: "Agent", short: "An LLM that uses tools in a loop.", tech: "Model + toolset + control policy that iterates Thought → Action → Observation.", related: "ReAct, Tool calling" },
  { term: "Alignment", short: "Making the model behave as intended.", tech: "Techniques (RLHF, DPO, constitutional AI) shaping model outputs toward human values." },
  { term: "Attention", short: "How the model weighs tokens.", tech: "Softmax over Q·Kᵀ / √d, applied to V." },
  { term: "Autoregressive", short: "Generates one token at a time.", tech: "Each token conditioned on all prior tokens." },
  { term: "BPE", short: "Byte-Pair Encoding tokenizer.", example: "'unbelievable' → ['un','believ','able']" },
  { term: "Chain-of-Thought", short: "Prompting the model to reason step-by-step.", example: "'Let's think step by step.'" },
  { term: "Chunk", short: "A slice of a document indexed for retrieval." },
  { term: "Completion", short: "The model's generated continuation of a prompt." },
  { term: "Constitutional AI", short: "Alignment via a written set of principles." },
  { term: "Context window", short: "Max tokens the model can attend over.", example: "GPT-4o ≈ 128K, Claude 3.5 ≈ 200K, Gemini 1.5 ≈ 1M." },
  { term: "Delimiter", short: "Markers separating trusted from untrusted text.", example: "```user_input``` or XML tags." },
  { term: "Distillation", short: "Training a small model to mimic a large one." },
  { term: "Embedding", short: "A dense vector representing meaning.", related: "Vector DB, RAG" },
  { term: "Evaluation harness", short: "Automated test suite for prompts.", example: "OpenAI Evals, Promptfoo, Ragas." },
  { term: "Few-shot", short: "Prompt with a handful of examples." },
  { term: "Fine-tuning", short: "Updating model weights on domain data." },
  { term: "Function calling", short: "Structured tool invocation via JSON.", related: "Tool calling, MCP" },
  { term: "Grounding", short: "Anchoring answers in retrieved context." },
  { term: "Guardrail", short: "Runtime check on inputs or outputs.", example: "PII redactor, toxicity classifier." },
  { term: "Hallucination", short: "Confident but incorrect output." },
  { term: "HyDE", short: "Embed a hypothetical answer to improve retrieval." },
  { term: "In-context learning", short: "Learning from examples in the prompt, no weight updates." },
  { term: "Injection (prompt)", short: "Attack where untrusted text overrides instructions." },
  { term: "Jailbreak", short: "Bypassing safety training via clever prompts." },
  { term: "JSON mode", short: "Model constrained to emit valid JSON." },
  { term: "KV-cache", short: "Reused Key/Value tensors during decoding." },
  { term: "Latency", short: "Time from request to full response." },
  { term: "LLM", short: "Large Language Model." },
  { term: "LoRA", short: "Fine-tuning via low-rank weight deltas." },
  { term: "Logit bias", short: "Manually shift probabilities of specific tokens." },
  { term: "Memory (agent)", short: "State the agent carries across steps." },
  { term: "Meta-prompt", short: "A prompt that generates or improves other prompts." },
  { term: "MoE", short: "Mixture-of-Experts architecture — only a subset of experts fires per token." },
  { term: "Multi-turn", short: "A conversation with turn history in context." },
  { term: "Nucleus sampling", short: "Sample from the smallest set whose cumulative prob ≥ p (top-p)." },
  { term: "One-shot", short: "Prompt containing exactly one example." },
  { term: "OPRO", short: "Optimization by prompting — LLM as black-box optimiser." },
  { term: "Perplexity", short: "Exponential of avg negative log-likelihood; lower = better LM." },
  { term: "Persona", short: "Role assigned to the model." },
  { term: "Positional encoding", short: "Injects token order (sinusoidal, RoPE, ALiBi)." },
  { term: "Prompt template", short: "Reusable string with variable slots." },
  { term: "Quantization", short: "Storing weights at lower precision (int8, int4)." },
  { term: "RAG", short: "Retrieve documents → inject into prompt → generate." },
  { term: "ReAct", short: "Interleaved reasoning + tool actions." },
  { term: "Reflection", short: "Model critiques and revises its own output." },
  { term: "Reranker", short: "Second-stage scorer over retrieval candidates (cross-encoder)." },
  { term: "Role", short: "'system' / 'user' / 'assistant' / 'tool' turn label." },
  { term: "Sampling", short: "How the next token is drawn from the distribution." },
  { term: "Self-consistency", short: "Sample N chains, majority-vote the answer." },
  { term: "Semantic cache", short: "Cache by embedding similarity, not exact string." },
  { term: "System prompt", short: "High-priority instruction at the start of context." },
  { term: "Temperature", short: "Sampling randomness. 0 = greedy; 1 = raw distribution." },
  { term: "Token", short: "Sub-word unit produced by the tokenizer." },
  { term: "Tool calling", short: "Model emits a function name + JSON args." },
  { term: "Top-k / Top-p", short: "Truncation strategies for sampling." },
  { term: "Transformer", short: "Attention-based neural architecture behind modern LLMs." },
  { term: "Vector DB", short: "Store + ANN search over embeddings.", example: "pgvector, Pinecone, Weaviate, Qdrant." },
  { term: "Zero-shot", short: "No examples — instruction only." },
];

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC}>
      <Section id="how-to" title="1. Using this Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li>Each entry gives a beginner-friendly definition, a technical note, an example and related concepts.</li>
          <li>Skim §2 acronyms first — most confusion in prompt engineering is acronym-driven.</li>
          <li>§10 is a one-line quick index for revision.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"

          caption="Visual reference: prompts, tokens and the LLM vocabulary map."
        />
      </Section>

      <Section id="acronyms" title="2. Prompt Engineering Acronyms">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm">
          {ACRONYMS.map(([a, b]) => (
            <div key={a} className="rounded border px-3 py-2"><strong>{a}</strong> — {b}</div>
          ))}
        </div>
      </Section>

      <Section id="az" title="3. A–Z Terminology">
        <div className="space-y-3">
          {AZ.map((e) => (
            <div key={e.term} className="rounded-md border p-3">
              <div className="font-semibold">{e.term}</div>
              <div className="text-sm text-muted-foreground">{e.short}</div>
              {e.tech && <div className="mt-1 text-sm"><strong>Technical:</strong> {e.tech}</div>}
              {e.example && <div className="mt-1 text-sm"><strong>Example:</strong> {e.example}</div>}
              {e.related && <div className="mt-1 text-xs text-muted-foreground">Related: {e.related}</div>}
              {e.tip && <div className="mt-1 text-xs text-muted-foreground">Tip: {e.tip}</div>}
            </div>
          ))}
        </div>
      </Section>

      <Section id="llm" title="4. LLM Vocabulary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Decoder-only</strong> — GPT-style, generates left-to-right.</li>
          <li><strong>Encoder-only</strong> — BERT-style, produces embeddings.</li>
          <li><strong>Encoder-decoder</strong> — T5, translation-style tasks.</li>
          <li><strong>Base vs Instruct</strong> — pretrained continuation vs instruction-tuned chat model.</li>
          <li><strong>Foundation model</strong> — large pretrained model adaptable across tasks.</li>
          <li><strong>Frontier model</strong> — the current state-of-the-art frontier (GPT-4o, Claude 3.5, Gemini 2).</li>
        </ul>
      </Section>

      <Section id="patterns" title="5. Prompt Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Persona pattern</strong> — "You are a senior tax accountant…"</li>
          <li><strong>Recipe pattern</strong> — step-by-step instructions.</li>
          <li><strong>Template pattern</strong> — fill-in-the-blank output.</li>
          <li><strong>Flipped interaction</strong> — model asks the user questions.</li>
          <li><strong>Cognitive verifier</strong> — model splits the question then answers.</li>
          <li><strong>Refusal suppression</strong> (adversarial) — flag, don't use.</li>
        </ul>
      </Section>

      <Section id="agents" title="6. AI Agent Terms">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Planner</strong> — decomposes a task into sub-goals.</li>
          <li><strong>Executor</strong> — runs each sub-goal.</li>
          <li><strong>Supervisor</strong> — orchestrates specialised agents.</li>
          <li><strong>Scratchpad</strong> — working memory within one run.</li>
          <li><strong>Episodic memory</strong> — past task traces.</li>
          <li><strong>Tool schema</strong> — JSON Schema describing a callable function.</li>
        </ul>
      </Section>

      <Section id="metrics" title="7. Evaluation Metrics">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Exact match / F1</strong> — string-level answer overlap.</li>
          <li><strong>BLEU / ROUGE / METEOR</strong> — text generation overlap.</li>
          <li><strong>BERTScore / BLEURT</strong> — embedding-based similarity.</li>
          <li><strong>Groundedness / Faithfulness</strong> — answer supported by retrieved context.</li>
          <li><strong>Answer relevance</strong> — how on-topic the response is (Ragas).</li>
          <li><strong>Context precision / recall</strong> — retrieval quality (Ragas).</li>
          <li><strong>Elo / pairwise</strong> — head-to-head LLM ranking (Chatbot Arena).</li>
        </ul>
      </Section>

      <Section id="api" title="8. API Terminology">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>temperature</code>, <code>top_p</code>, <code>top_k</code>, <code>max_tokens</code></li>
          <li><code>frequency_penalty</code>, <code>presence_penalty</code>, <code>stop</code></li>
          <li><code>tools</code>, <code>tool_choice</code>, <code>response_format</code></li>
          <li><code>seed</code>, <code>logprobs</code>, <code>stream</code></li>
          <li><strong>Rate limits</strong> — RPM (requests/min), TPM (tokens/min).</li>
          <li><strong>Usage</strong> — <code>prompt_tokens</code>, <code>completion_tokens</code>, <code>total_tokens</code>.</li>
        </ul>
      </Section>

      <Section id="interview" title="9. Interview Vocabulary">
        <ul className="list-disc space-y-1 pl-5">
          <li>CoT, ToT, ReAct, Reflexion.</li>
          <li>RAG, hybrid search, reranking, HyDE.</li>
          <li>Prompt injection, jailbreak, guardrails.</li>
          <li>Fine-tune vs prompt vs RAG — when to use which.</li>
          <li>Temperature vs top-p; greedy vs beam vs nucleus.</li>
          <li>Evaluation: offline vs online, LLM-as-judge bias.</li>
        </ul>
      </Section>

      <Section id="lookup" title="10. Quick Lookup Index">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm">
          {AZ.map((e) => <div key={e.term} className="rounded border px-3 py-1.5">{e.term}</div>)}
        </div>
      </Section>

      <Section id="review" title="Glossary Review">
        <h3 className="font-semibold">Top 150 important terms</h3>
        <p>The A–Z (§3), acronym (§2), pattern (§5), agent (§6), metric (§7) and API (§8) sections together cover the 150+ terms that appear in interviews and applied prompt-engineering work.</p>
        <h3 className="mt-4 font-semibold">Interview vocabulary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompting strategies, evaluation, guardrails.</li>
          <li>Retrieval and grounding vocabulary.</li>
          <li>Sampling parameters and their effects.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Where should I start?">Read §2 acronyms then the A–Z. Come back to §5–§8 as you build.</FAQItem>
        <FAQItem q="How do I memorise 250+ terms?">Group them by section, review §10 daily, and use each term at least once in a real prompt.</FAQItem>
        <FAQItem q="Are these terms stable?">Core terms (attention, tokens, RAG) yes; agent frameworks and eval terms churn fast.</FAQItem>
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
