import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "genai-interview-questions",
  title: "Generative AI — Interview Questions",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "27 min",
  pages: 45,
  lastUpdated: "May 2026",
  tags: ["Interview", "Generative AI", "LLM", "RAG", "System Design"],
  heroImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1800&q=80",
  heroSubtitle:
    "A publication-quality handbook of curated Generative AI interview questions with layered hints, model answers, follow-ups and mock interviews.",
};

const TOC: TocItem[] = [
  { id: "c1", label: "Ch 1 — Interview Landscape" },
  { id: "c2", label: "Ch 2 — Beginner (50)" },
  { id: "c3", label: "Ch 3 — Intermediate (75)" },
  { id: "c4", label: "Ch 4 — Advanced (75)" },
  { id: "c5", label: "Ch 5 — Coding (40)" },
  { id: "c6", label: "Ch 6 — System Design (30)" },
  { id: "c7", label: "Ch 7 — Project Discussion" },
  { id: "c8", label: "Ch 8 — Behavioral (STAR)" },
  { id: "c9", label: "Ch 9 — HR Questions" },
  { id: "c10", label: "Ch 10 — Mock Interviews" },
  { id: "appendix", label: "Appendix & Cheat Sheet" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Generative AI — Complete Tutorial", tag: "AI & Data", time: "49 min" },
  { title: "Generative AI — Beginner Guide", tag: "AI & Data", time: "49 min" },
  { title: "Deep Learning — Interview Questions", tag: "AI & Data", time: "30 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/genai-interview-questions")({
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

type QA = {
  n: number;
  q: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  hint1?: string;
  hint2?: string;
  answer: string;
  why?: string;
  wrong?: string;
  followUps?: string[];
};

function QCard({ item }: { item: QA }) {
  return (
    <div className="rounded-xl border bg-card/40 p-4">
      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Q{item.n}.</span>
        {item.level && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{item.level}</span>}
      </div>
      <p className="mb-2 font-medium">{item.q}</p>
      {item.hint1 && <p className="text-sm text-muted-foreground"><strong>Hint 1:</strong> {item.hint1}</p>}
      {item.hint2 && <p className="text-sm text-muted-foreground"><strong>Hint 2:</strong> {item.hint2}</p>}
      <p className="mt-2 text-sm"><strong>Answer:</strong> {item.answer}</p>
      {item.why && <p className="mt-1 text-sm text-muted-foreground"><strong>Why asked:</strong> {item.why}</p>}
      {item.wrong && <p className="mt-1 text-sm text-muted-foreground"><strong>Common wrong answer:</strong> {item.wrong}</p>}
      {item.followUps && item.followUps.length > 0 && (
        <p className="mt-1 text-sm text-muted-foreground"><strong>Follow-ups:</strong> {item.followUps.join(" · ")}</p>
      )}
    </div>
  );
}

function QList({ items }: { items: QA[] }) {
  return <div className="grid gap-3">{items.map((it) => <QCard key={it.n} item={it} />)}</div>;
}

// -------------------- BEGINNER (50) --------------------
const BEGINNER: QA[] = [
  { n: 1, level: "Beginner", q: "What is Artificial Intelligence?", hint1: "Simulating human intelligence.", answer: "AI is the field of building systems that perform tasks requiring human intelligence — perception, reasoning, learning, decision making.", why: "Sets the baseline for the entire conversation.", wrong: "Confusing AI with robotics only." },
  { n: 2, level: "Beginner", q: "Difference between AI, ML, DL and Generative AI?", answer: "AI is the umbrella. ML learns patterns from data. DL uses deep neural networks. GenAI is DL specialised in generating new content.", followUps: ["Give one example of each."] },
  { n: 3, level: "Beginner", q: "What is a Large Language Model?", answer: "A transformer-based neural network trained on massive text corpora to predict the next token, giving it broad language and reasoning abilities.", wrong: "Saying LLMs 'understand' language like humans." },
  { n: 4, level: "Beginner", q: "What is a token?", answer: "A sub-word unit produced by a tokenizer (e.g., BPE). Models read and generate tokens, not raw characters or words." },
  { n: 5, level: "Beginner", q: "What is an embedding?", answer: "A vector representation of text (or image/audio) such that semantically similar items are close in vector space." },
  { n: 6, level: "Beginner", q: "What does the Transformer architecture do?", answer: "Uses self-attention + feed-forward layers to model relationships between all tokens in parallel — replacing RNNs for most tasks." },
  { n: 7, level: "Beginner", q: "What is prompt engineering?", answer: "Crafting inputs (role, task, context, format) that reliably steer LLM output quality." },
  { n: 8, level: "Beginner", q: "Temperature — what and why?", answer: "Controls sampling randomness. 0 = deterministic. 1+ = creative. Lower for factual tasks; higher for brainstorming." },
  { n: 9, level: "Beginner", q: "Top-k vs top-p sampling?", answer: "Top-k restricts sampling to the k most likely tokens; top-p (nucleus) restricts to the smallest set whose cumulative probability ≥ p." },
  { n: 10, level: "Beginner", q: "What is a context window?", answer: "The maximum number of tokens (input + output) a model can attend to at once — e.g., 128K for GPT-4o, 1M+ for Gemini 1.5." },
  { n: 11, level: "Beginner", q: "What is a hallucination?", answer: "A confidently produced but factually incorrect model output. Mitigated with RAG, tool use and evaluation.", followUps: ["How would you detect them in production?"] },
  { n: 12, level: "Beginner", q: "Zero-shot vs few-shot prompting?", answer: "Zero-shot: no example. Few-shot: several worked examples included in the prompt to steer format and style." },
  { n: 13, level: "Beginner", q: "System vs user prompt?", answer: "System prompt sets persistent behaviour and policies. User prompt is the per-request question." },
  { n: 14, level: "Beginner", q: "Name three LLM families.", answer: "GPT (OpenAI), Gemini (Google), Claude (Anthropic). Also Llama, Mistral, Qwen, DeepSeek, Phi." },
  { n: 15, level: "Beginner", q: "What is ChatGPT?", answer: "OpenAI's chat product powered by GPT-family models with tools, memory and multimodality." },
  { n: 16, level: "Beginner", q: "What is Gemini?", answer: "Google DeepMind's multimodal LLM with very large context windows." },
  { n: 17, level: "Beginner", q: "Supervised vs unsupervised learning?", answer: "Supervised uses labelled data; unsupervised finds structure in unlabelled data (clustering, dimensionality reduction)." },
  { n: 18, level: "Beginner", q: "Give a real GenAI use case in industry.", answer: "Customer support copilots, code generation, drug discovery assistants, marketing content, legal review, education tutors." },
  { n: 19, level: "Beginner", q: "Why is Python popular for AI?", answer: "Rich ecosystem (PyTorch, TensorFlow, Hugging Face), simple syntax, huge community." },
  { n: 20, level: "Beginner", q: "What is Hugging Face?", answer: "A hub of open-source models, datasets and libraries (transformers, datasets, diffusers) plus an inference platform." },
  { n: 21, level: "Beginner", q: "What is fine-tuning?", answer: "Training a pretrained model further on a smaller, task-specific dataset to specialise it." },
  { n: 22, level: "Beginner", q: "What is a chatbot?", answer: "A conversational interface backed by rules or an LLM that maintains multi-turn context." },
  { n: 23, level: "Beginner", q: "Difference between generative and discriminative models?", answer: "Generative models model P(x) or P(x, y) and can generate; discriminative model P(y | x) for classification." },
  { n: 24, level: "Beginner", q: "What is a GPU good for?", answer: "Massively parallel matrix ops needed for training and inference of deep networks." },
  { n: 25, level: "Beginner", q: "What is overfitting?", answer: "Model learns noise/details of training data and generalises poorly to unseen data." },
  { n: 26, level: "Beginner", q: "Give one open-weight LLM.", answer: "Llama 3, Mistral 7B, Qwen 2, DeepSeek, Phi-3." },
  { n: 27, level: "Beginner", q: "What is an API key?", answer: "A secret string authenticating your app to a provider's API. Never commit it to Git." },
  { n: 28, level: "Beginner", q: "What is RAG in one line?", answer: "Retrieving relevant chunks from your data and grounding the LLM's answer in them." },
  { n: 29, level: "Beginner", q: "What is a vector database?", answer: "A DB optimised for storing embeddings and running fast approximate nearest-neighbour search." },
  { n: 30, level: "Beginner", q: "Difference between chatbot and agent?", answer: "A chatbot mostly talks; an agent plans, uses tools and takes actions to complete goals." },
  { n: 31, level: "Beginner", q: "What is Streamlit?", answer: "A Python framework to build data/AI web apps quickly with pure Python." },
  { n: 32, level: "Beginner", q: "What is FastAPI?", answer: "A modern Python web framework for building async REST APIs with automatic docs." },
  { n: 33, level: "Beginner", q: "What is Docker used for?", answer: "Packaging apps + dependencies into reproducible containers for any environment." },
  { n: 34, level: "Beginner", q: "What is a token limit?", answer: "The max tokens per request (context) or per output. Exceeding it truncates or errors." },
  { n: 35, level: "Beginner", q: "Explain positional encoding.", answer: "Since attention is order-agnostic, positional encodings (sinusoidal or RoPE) inject token order into embeddings." },
  { n: 36, level: "Beginner", q: "Which loss trains LLMs?", answer: "Cross-entropy over next-token prediction." },
  { n: 37, level: "Beginner", q: "What is a transformer block?", answer: "MultiHeadAttention → Add & LayerNorm → FeedForward → Add & LayerNorm, repeated N times." },
  { n: 38, level: "Beginner", q: "What is beam search?", answer: "A deterministic decoding strategy that keeps top-B partial sequences at each step to maximise total likelihood." },
  { n: 39, level: "Beginner", q: "What is model inference?", answer: "Running a trained model on new inputs to produce predictions." },
  { n: 40, level: "Beginner", q: "What is a prompt template?", answer: "A parameterised prompt with placeholders filled at runtime — enables reuse and testing." },
  { n: 41, level: "Beginner", q: "What is a diffusion model?", answer: "A generative model that learns to reverse a noise process to create images/audio/video." },
  { n: 42, level: "Beginner", q: "What is CLIP?", answer: "OpenAI model that jointly embeds images and text — enables text-to-image retrieval and guides diffusion." },
  { n: 43, level: "Beginner", q: "Text-to-image example tool?", answer: "Midjourney, DALL·E 3, Stable Diffusion, Imagen." },
  { n: 44, level: "Beginner", q: "What is multimodal AI?", answer: "Models that accept and/or produce more than one modality (text, image, audio, video, code)." },
  { n: 45, level: "Beginner", q: "What is a foundation model?", answer: "A large model pretrained on broad data that can be adapted to many downstream tasks." },
  { n: 46, level: "Beginner", q: "What is RLHF (in one sentence)?", answer: "Reinforcement Learning from Human Feedback — aligning models to human preferences via reward models." },
  { n: 47, level: "Beginner", q: "What is a system prompt injection?", answer: "Malicious inputs that override system instructions by manipulating the model." },
  { n: 48, level: "Beginner", q: "What is inference cost usually measured in?", answer: "Cost per 1K tokens (in + out) or per second of GPU time." },
  { n: 49, level: "Beginner", q: "What are guardrails?", answer: "Policies, moderation, filters and validators that constrain model output before it reaches users." },
  { n: 50, level: "Beginner", q: "How would you build your first GenAI app?", answer: "Pick a well-scoped problem → design prompt → wrap OpenAI API in FastAPI → simple Streamlit UI → add evals → deploy on Render." },
];

// -------------------- INTERMEDIATE (75) --------------------
const INTERMEDIATE: QA[] = [
  { n: 1, level: "Intermediate", q: "Explain self-attention mathematically.", answer: "Attention(Q,K,V) = softmax(Q·Kᵀ / √d_k) · V. Each token computes weighted average over values V using similarity between its query Q and every token's key K." },
  { n: 2, level: "Intermediate", q: "Why multi-head attention?", answer: "Multiple heads let the model attend to different subspaces/relations in parallel (syntactic, semantic, positional)." },
  { n: 3, level: "Intermediate", q: "Encoder vs decoder blocks?", answer: "Encoder uses bidirectional self-attention (see whole input, e.g., BERT). Decoder uses causal (masked) self-attention + cross-attention on encoder outputs; GPT-style is decoder-only." },
  { n: 4, level: "Intermediate", q: "What is causal masking?", answer: "A mask preventing position t from attending to positions > t, ensuring autoregressive generation." },
  { n: 5, level: "Intermediate", q: "Explain LayerNorm vs BatchNorm for transformers.", answer: "LayerNorm normalises across features per token — batch-size independent and works well for variable-length sequences." },
  { n: 6, level: "Intermediate", q: "Why residual connections?", answer: "Help gradient flow, allow very deep stacks, act as identity shortcut so blocks learn refinements." },
  { n: 7, level: "Intermediate", q: "Sinusoidal vs learned vs rotary positional encoding?", answer: "Sinusoidal: fixed, generalises to longer seqs. Learned: trainable vectors per position. RoPE: rotates Q/K by position — enables long context extrapolation, used in Llama/Mistral." },
  { n: 8, level: "Intermediate", q: "How does context window get extended (e.g., 1M tokens)?", answer: "Ring/flash attention, sparse or linear attention, RoPE scaling, chunked training, KV cache offloading." },
  { n: 9, level: "Intermediate", q: "What is a KV cache?", answer: "During decoding, K/V of previous tokens are cached so each new token needs only one new attention step — O(1) per token instead of O(n)." },
  { n: 10, level: "Intermediate", q: "Explain temperature, top-k and top-p together.", answer: "Temperature scales logits before softmax. Top-k truncates to top k tokens; top-p truncates to nucleus. Combine: temperature=0.7, top-p=0.9, top-k=50 is a common balanced default." },
  { n: 11, level: "Intermediate", q: "Chain-of-thought (CoT) — pros/cons?", answer: "Pros: improves multi-step reasoning. Cons: more tokens (cost/latency); can leak reasoning; can still hallucinate." },
  { n: 12, level: "Intermediate", q: "What is self-consistency decoding?", answer: "Sample N CoT traces with temperature > 0 and take the majority answer — more robust than a single greedy CoT." },
  { n: 13, level: "Intermediate", q: "Tree of Thoughts?", answer: "Structured search where the model explores multiple reasoning branches and prunes using a value function." },
  { n: 14, level: "Intermediate", q: "ReAct pattern?", answer: "Interleave Reasoning traces with Actions (tool calls) — each observation feeds the next thought." },
  { n: 15, level: "Intermediate", q: "How do you evaluate an LLM app?", answer: "Golden set + LLM-as-judge + human review + task-specific metrics (BLEU, ROUGE, exact match, faithfulness). Track pass rate, latency, cost." },
  { n: 16, level: "Intermediate", q: "What is faithfulness in RAG evals?", answer: "Whether the answer is supported by the retrieved context. Frameworks: RAGAS, TruLens." },
  { n: 17, level: "Intermediate", q: "Cosine similarity — when to use?", answer: "For text embeddings; scale-invariant, ranks by angle between vectors." },
  { n: 18, level: "Intermediate", q: "Explain BM25 vs vector search.", answer: "BM25: sparse lexical scoring, great for exact terms. Vector: dense semantic. Hybrid combines both for best recall." },
  { n: 19, level: "Intermediate", q: "Common chunking strategies?", answer: "Fixed-size, recursive character split, sentence-aware, semantic (embedding-based). Overlap ~10–20%." },
  { n: 20, level: "Intermediate", q: "How to choose top-k in RAG?", answer: "Start k=4–8; add reranking to top-20 → pick 3–5; tune by measuring recall@k against golden set." },
  { n: 21, level: "Intermediate", q: "Difference between reranker and retriever?", answer: "Retriever: fast ANN search over embeddings (bi-encoder). Reranker: slower cross-encoder scoring query+doc pairs for higher precision." },
  { n: 22, level: "Intermediate", q: "Which embedding model would you choose today?", answer: "OpenAI text-embedding-3-large, BGE-M3, Voyage-3, Nomic v1.5 — pick by benchmark on MTEB in your language/domain and cost." },
  { n: 23, level: "Intermediate", q: "What is HNSW?", answer: "Hierarchical Navigable Small World — a graph-based ANN index balancing recall and latency; the default in most vector DBs." },
  { n: 24, level: "Intermediate", q: "Compare Pinecone, Weaviate, Qdrant, Milvus, Chroma.", answer: "Pinecone: managed, low ops. Weaviate: hybrid + modules. Qdrant: strong filtering + Rust perf. Milvus: massive scale. Chroma: simple local." },
  { n: 25, level: "Intermediate", q: "When would you NOT use RAG?", answer: "Answers depend only on general knowledge; latency budget < 200ms; ultra-simple tasks; or when fine-tuning is more reliable." },
  { n: 26, level: "Intermediate", q: "Fine-tuning vs prompting vs RAG?", answer: "Prompt for style/format; RAG for facts/freshness; fine-tune for behaviour/domain when prompt+RAG plateau." },
  { n: 27, level: "Intermediate", q: "What is instruction tuning?", answer: "Fine-tuning a pretrained LLM on (instruction, response) pairs so it follows user instructions." },
  { n: 28, level: "Intermediate", q: "LoRA in one paragraph.", answer: "Freeze base weights, add low-rank matrices A·B to selected linear layers; train only A, B. Cheap (0.1–1% params), preserves base." },
  { n: 29, level: "Intermediate", q: "QLoRA?", answer: "Quantise base model to 4-bit (NF4) and train LoRA adapters on top — fine-tune 7B–70B on a single consumer GPU." },
  { n: 30, level: "Intermediate", q: "PEFT?", answer: "Parameter-Efficient Fine-Tuning umbrella — LoRA, adapters, prefix-tuning, IA³, etc." },
  { n: 31, level: "Intermediate", q: "RLHF pipeline in 3 steps.", answer: "1) SFT on demonstrations. 2) Train a reward model on human comparisons. 3) PPO-optimise policy against the RM." },
  { n: 32, level: "Intermediate", q: "DPO vs RLHF?", answer: "DPO skips explicit RM/PPO — optimises the policy directly on preference pairs with a closed-form loss. Simpler and more stable." },
  { n: 33, level: "Intermediate", q: "Signs your app needs an agent, not a chain?", answer: "Dynamic decisions, unknown number of steps, tool selection depends on data, long-horizon tasks." },
  { n: 34, level: "Intermediate", q: "Tool calling — how does it work?", answer: "You expose tool schemas (JSON). The model returns a structured call. Your code executes and returns observations for the next turn." },
  { n: 35, level: "Intermediate", q: "Short-term vs long-term memory in agents?", answer: "Short-term: the conversation context. Long-term: vector store or knowledge graph the agent reads/writes over time." },
  { n: 36, level: "Intermediate", q: "LangChain vs LlamaIndex?", answer: "LangChain: general-purpose chains/agents/tools. LlamaIndex: RAG-first indexing/retrieval abstractions. Overlap exists — use both when useful." },
  { n: 37, level: "Intermediate", q: "What is LangGraph?", answer: "A framework for building stateful, cyclic agent graphs on top of LangChain — good for controllable multi-step agents." },
  { n: 38, level: "Intermediate", q: "CrewAI vs AutoGen?", answer: "CrewAI: role-based agent teams with tasks. AutoGen: conversational multi-agent framework with human-in-the-loop." },
  { n: 39, level: "Intermediate", q: "How to reduce LLM cost 10×?", answer: "Cache, batch, smaller model for simple sub-tasks (routing), aggressive prompt compression, structured outputs, RAG to shrink context." },
  { n: 40, level: "Intermediate", q: "How do you handle streaming responses?", answer: "SSE/WebSocket, backend forwards token deltas; frontend renders incrementally; cancel on user abort." },
  { n: 41, level: "Intermediate", q: "Structured outputs — how?", answer: "Use JSON schema / function calling / grammar constraints; validate with Pydantic; retry on parse failure." },
  { n: 42, level: "Intermediate", q: "Prompt template design tips.", answer: "Role, task, context, constraints, format, examples, negative examples. Keep sections consistent for evals." },
  { n: 43, level: "Intermediate", q: "How to test prompts like code?", answer: "Version control prompts; run against golden set on CI; measure diff in scores; block regressions." },
  { n: 44, level: "Intermediate", q: "Explain function/tool calling in OpenAI API.", answer: "Provide 'tools' schema; the model responds with tool_call; you execute and post the result back as a tool message; loop until final answer." },
  { n: 45, level: "Intermediate", q: "How would you cache LLM responses?", answer: "Key = normalised prompt + model + params; store in Redis with TTL; for RAG, cache retrieval too." },
  { n: 46, level: "Intermediate", q: "Rate-limit strategy?", answer: "Token bucket per user/API key; exponential back-off + jitter on 429; fall back to smaller model." },
  { n: 47, level: "Intermediate", q: "Retry policy for provider errors?", answer: "Retry 5xx / 429 with exponential back-off, max attempts, jitter; never retry 4xx validation errors." },
  { n: 48, level: "Intermediate", q: "What is context stuffing risk?", answer: "Too much context dilutes attention and increases cost; retrieval quality matters more than sheer size." },
  { n: 49, level: "Intermediate", q: "How to protect against prompt injection?", answer: "Treat retrieved text as untrusted; isolate instructions from data; use allowlists on tool calls; validate outputs." },
  { n: 50, level: "Intermediate", q: "How would you build a PDF chat feature?", answer: "Parse → chunk → embed → store → retrieve k → rerank → LLM answers with citations." },
  { n: 51, level: "Intermediate", q: "How to add citations to RAG answers?", answer: "Return chunk IDs with retrieval; instruct model to cite them; verify referenced spans exist post-hoc." },
  { n: 52, level: "Intermediate", q: "Evaluate an image generation model?", answer: "FID, CLIPScore, human evals; task-specific rubrics for prompt fidelity and aesthetics." },
  { n: 53, level: "Intermediate", q: "What is Whisper?", answer: "OpenAI's ASR model that transcribes and translates speech across many languages." },
  { n: 54, level: "Intermediate", q: "Common pitfalls in agent design?", answer: "Runaway loops, tool misuse, cost explosion, weak state management; mitigate with step limits, budgets, human approval on high-risk tools." },
  { n: 55, level: "Intermediate", q: "Async vs sync in FastAPI for LLM apps?", answer: "Use async everywhere — LLM calls are I/O bound; async unlocks concurrency without threads." },
  { n: 56, level: "Intermediate", q: "How to secure API keys in prod?", answer: "Secret manager (AWS SM, Doppler), env-only injection, rotate quarterly, scoped keys per service." },
  { n: 57, level: "Intermediate", q: "Observability essentials for an LLM app?", answer: "Trace prompt, tool calls, tokens, cost, latency; store inputs/outputs (with PII policy); dashboards + alerts on regressions." },
  { n: 58, level: "Intermediate", q: "What is Langfuse / Arize?", answer: "LLM observability platforms — traces, evals, cost analytics, dataset management." },
  { n: 59, level: "Intermediate", q: "How to build a safe SQL assistant?", answer: "Read-only role, allowlist tables, LIMIT clauses, timeout, forbid DDL, LLM proposes → validator executes → return preview before commit." },
  { n: 60, level: "Intermediate", q: "How to combat data leakage in evaluation?", answer: "Freeze eval set, hold it out of training/fine-tuning, use fresh public benchmarks or private eval data." },
  { n: 61, level: "Intermediate", q: "Explain MRR and NDCG for retrieval.", answer: "MRR: mean reciprocal rank of the first relevant hit. NDCG: normalised discounted cumulative gain — quality of the ranking overall." },
  { n: 62, level: "Intermediate", q: "How to shrink prompts?", answer: "Summarise history, drop redundant context, use bullet points, use tools/RAG instead of huge context." },
  { n: 63, level: "Intermediate", q: "Which programming language for GenAI backends?", answer: "Python primarily; TypeScript for web-heavy stacks. Go/Rust for high-throughput inference proxies." },
  { n: 64, level: "Intermediate", q: "Streaming JSON safely?", answer: "Use grammar/schema-constrained decoding or parse-as-you-go with a tolerant parser; validate at end." },
  { n: 65, level: "Intermediate", q: "How to A/B test prompts?", answer: "Route users randomly to variants A and B; log outcomes/feedback; statistical significance tests on chosen metric." },
  { n: 66, level: "Intermediate", q: "Difference between grounding and citation?", answer: "Grounding = generating from retrieved evidence. Citation = surfacing that evidence to the user." },
  { n: 67, level: "Intermediate", q: "How would you evaluate an agent?", answer: "Task success rate, step count, tool-call correctness, cost, latency; regression on curated task suites." },
  { n: 68, level: "Intermediate", q: "What is guardrailing with regex vs classifier?", answer: "Regex for cheap deterministic rules (PII, banned words); classifier for nuanced categories (toxicity, jailbreak). Combine layers." },
  { n: 69, level: "Intermediate", q: "How does OpenAI Assistants API differ from Chat Completions?", answer: "Assistants adds persistent threads, tools (code interpreter, retrieval, functions) and state management server-side." },
  { n: 70, level: "Intermediate", q: "Explain Batching in inference servers.", answer: "Group concurrent requests to run through the GPU together — improves throughput at slight tail-latency cost. See vLLM/TensorRT-LLM." },
  { n: 71, level: "Intermediate", q: "What is vLLM?", answer: "High-throughput LLM inference engine using PagedAttention for efficient KV-cache memory management." },
  { n: 72, level: "Intermediate", q: "Speculative decoding?", answer: "A small draft model proposes tokens verified by the big model in parallel — big speed-ups with same quality." },
  { n: 73, level: "Intermediate", q: "Chunk metadata — why include it?", answer: "Filter by section, doc type, date; boost or restrict retrieval by tenant/user; enable citations." },
  { n: 74, level: "Intermediate", q: "How to keep an agent from spending too much?", answer: "Hard budget per session (tokens/USD), step cap, escalation to cheaper model, tool cost accounting." },
  { n: 75, level: "Intermediate", q: "Best default stack for a startup RAG MVP?", answer: "FastAPI + OpenAI + Chroma → deploy on Render → later swap in Qdrant/Postgres pgvector + Langfuse for observability." },
];

// -------------------- ADVANCED (75) --------------------
const ADVANCED: QA[] = [
  { n: 1, level: "Advanced", q: "Walk through the full pretraining pipeline of a modern LLM.", answer: "Data curation (deduping, filtering, quality classifiers) → tokenizer training (BPE/Unigram) → data mixture design → distributed training (tensor+pipeline+data parallel) on thousands of GPUs → validation on held-out perplexity → checkpoints & recovery → post-training (SFT, RLHF/DPO)." },
  { n: 2, level: "Advanced", q: "Explain FlashAttention.", answer: "IO-aware exact attention that fuses softmax and matmul, tiled to fit SRAM, avoiding materialising the N×N attention matrix in HBM — 2–4× faster, less memory." },
  { n: 3, level: "Advanced", q: "PagedAttention?", answer: "Manages KV cache in fixed-size pages like OS virtual memory — enables efficient KV memory sharing across sequences (used by vLLM)." },
  { n: 4, level: "Advanced", q: "ZeRO stages 1/2/3?", answer: "DeepSpeed ZeRO partitions optimiser states (1), gradients (2), and parameters (3) across workers to reduce memory per GPU, enabling huge models." },
  { n: 5, level: "Advanced", q: "Tensor vs pipeline vs data parallelism?", answer: "Tensor: split a single layer across GPUs. Pipeline: split layers across GPUs, mini-batch pipelining. Data: same model, different data shards. Frontier training combines all three." },
  { n: 6, level: "Advanced", q: "Mixture of Experts?", answer: "Sparse layer with N experts and a router; each token routes to top-k experts (e.g., 2). Increases capacity with modest compute cost; used in Mixtral, DeepSeek." },
  { n: 7, level: "Advanced", q: "Router balancing losses in MoE?", answer: "Auxiliary load-balancing loss + z-loss keep experts equally utilised and stable." },
  { n: 8, level: "Advanced", q: "GPT-4 architecture — what's public knowledge?", answer: "Officially undisclosed. Widely believed to be a multi-expert MoE decoder with large context, aligned via RLHF. Do not speculate beyond that in interviews." },
  { n: 9, level: "Advanced", q: "Explain rotary position embeddings (RoPE).", answer: "Encode position by rotating Q,K pairs in 2D subspaces — attention becomes function of relative position; supports scaling via NTK/RoPE-YaRN for longer contexts." },
  { n: 10, level: "Advanced", q: "How is long-context achieved in practice?", answer: "Sparse/local attention, ring/flash attention, RoPE scaling, streaming attention, KV compression, sliding window + attention sinks." },
  { n: 11, level: "Advanced", q: "What is grouped-query attention (GQA)?", answer: "Multiple query heads share fewer K/V heads → smaller KV cache and faster inference with minimal quality loss. Used in Llama-2/3 70B, Mistral." },
  { n: 12, level: "Advanced", q: "What is quantization (INT8, INT4, NF4)?", answer: "Represent weights/activations at lower precision to save memory and speed inference. NF4 (4-bit normal float) preserves accuracy for LLMs — foundation of QLoRA." },
  { n: 13, level: "Advanced", q: "GPTQ vs AWQ vs bitsandbytes?", answer: "GPTQ/AWQ: post-training weight-only quantisation (4-bit) with calibration data. bitsandbytes: on-the-fly 8/4-bit for HuggingFace models. Use GPTQ/AWQ for production, bnb for R&D." },
  { n: 14, level: "Advanced", q: "Speculative decoding — how does it stay lossless?", answer: "Big model verifies drafts token-by-token via rejection sampling — accepts tokens where drafts match its distribution, keeping outputs distributionally identical." },
  { n: 15, level: "Advanced", q: "Continuous batching?", answer: "Rather than static batches, requests join the batch dynamically as slots free — maximises GPU utilisation. Core to vLLM/TensorRT-LLM." },
  { n: 16, level: "Advanced", q: "Design tokenizer for a new domain.", answer: "Train BPE/Unigram on domain-representative data; add reserved special tokens; validate coverage & OOV rate; keep vocab size balanced (32K–128K)." },
  { n: 17, level: "Advanced", q: "Explain instruction fine-tuning dataset design.", answer: "Cover intents, style, refusals, safety, tool-use format; diversity > volume; deduplicate; hold out eval; balance across capabilities." },
  { n: 18, level: "Advanced", q: "RLHF failure modes?", answer: "Reward hacking, sycophancy, mode collapse, over-refusal, distribution shift; mitigate with KL penalties, better RM, mixing SFT data." },
  { n: 19, level: "Advanced", q: "DPO math intuition.", answer: "Given preference pairs (y_win, y_lose), maximise log σ(β·(logπ(y_win)/π_ref(y_win) − logπ(y_lose)/π_ref(y_lose))). Implicitly optimises a KL-regularised reward without a separate RM." },
  { n: 20, level: "Advanced", q: "Constitutional AI?", answer: "Anthropic's approach: model critiques and revises its own outputs against a written 'constitution' + preference training on those critiques." },
  { n: 21, level: "Advanced", q: "Detecting hallucinations at scale?", answer: "Consistency checks (multiple samples), NLI faithfulness classifiers, tool-verified facts, retrieval grounding scores." },
  { n: 22, level: "Advanced", q: "Evaluation benchmarks worth knowing?", answer: "MMLU, GPQA, HumanEval / MBPP / SWE-bench (code), MATH, GSM8K, BIG-Bench, IFEval, Chatbot Arena, MT-Bench." },
  { n: 23, level: "Advanced", q: "Why are private evals critical?", answer: "Public benchmarks leak into training data. Fresh, private tasks representative of your product are the true measure." },
  { n: 24, level: "Advanced", q: "Prompt-injection defence — end to end.", answer: "Sanitize/label untrusted content, keep instructions in system role, restrict tools via allowlists, run output classifiers, use policy-enforced 'planner/executor' separation." },
  { n: 25, level: "Advanced", q: "Jailbreak categories?", answer: "Role-play, obfuscation (base64, translation), context-splitting, DAN-style personas, tool misuse. Defence: layered filters + red-team testing." },
  { n: 26, level: "Advanced", q: "Model stealing / distillation attacks?", answer: "Adversary queries API to train a smaller copy. Defences: rate limits, watermarking, output perturbation, ToS enforcement." },
  { n: 27, level: "Advanced", q: "Explain watermarking in text generation.", answer: "Bias sampling toward a pseudo-random 'green list' of tokens seeded by prior context; detectable statistically without harming quality." },
  { n: 28, level: "Advanced", q: "How to build safety classifiers?", answer: "Curate labelled data across policy categories; fine-tune small transformer; calibrate thresholds; monitor drift; combine with rule filters." },
  { n: 29, level: "Advanced", q: "GPU choice for inference?", answer: "H100/H200 for frontier throughput; A100 for cost-efficiency; L40S/L4 for mid-scale; consumer 4090/3090 fine for 7B–13B dev." },
  { n: 30, level: "Advanced", q: "How to size context for a use case?", answer: "Measure realistic input distribution p95; pick the smallest context that fits + headroom; longer context = higher cost, slower KV cache growth." },
  { n: 31, level: "Advanced", q: "Explain prefix caching.", answer: "Cache KV of a fixed system prompt / doc prefix so subsequent user turns skip prefix compute — huge speed-up for chatbots/RAG." },
  { n: 32, level: "Advanced", q: "How to design multi-tenant embedding stores?", answer: "Namespace/collection per tenant, filter by tenant_id in metadata, encryption per tenant, per-tenant rate limits and quotas." },
  { n: 33, level: "Advanced", q: "How to migrate embeddings without downtime?", answer: "Dual-write to new model, backfill in batches, shadow-serve queries to both, compare metrics, cut over, deprecate old index." },
  { n: 34, level: "Advanced", q: "Compare BLEU/ROUGE vs LLM-as-judge.", answer: "BLEU/ROUGE: cheap surface overlap; poor for generative correctness. LLM-as-judge: closer to human, but biased/expensive — calibrate with human sample audits." },
  { n: 35, level: "Advanced", q: "How would you fine-tune a 70B model?", answer: "QLoRA (NF4 base) with DeepSpeed ZeRO-3 or FSDP on 4–8×H100; small learning rate, 1–3 epochs, gradient checkpointing, careful data curation." },
  { n: 36, level: "Advanced", q: "LoRA rank & alpha — how to choose?", answer: "Start r=8–32; α ≈ 2r; increase r for harder tasks; monitor over-fitting; blend multiple LoRAs at inference." },
  { n: 37, level: "Advanced", q: "How to merge LoRAs into base?", answer: "For inference, add A·B*(α/r) into linear weights (peft.merge_and_unload) — no runtime overhead." },
  { n: 38, level: "Advanced", q: "Serving multiple LoRAs on one base?", answer: "Frameworks like S-LoRA / vLLM LoRA hotswap adapters per request — thousands of variants on one deployment." },
  { n: 39, level: "Advanced", q: "Explain distillation of a large LLM to a smaller one.", answer: "Use teacher outputs (logits or completions) as targets to train student; combine with real labels; huge cost savings at some quality loss." },
  { n: 40, level: "Advanced", q: "Explain retrieval-augmented fine-tuning.", answer: "Fine-tune model conditioned on retrieved context so it learns to use citations and refuse unsupported claims." },
  { n: 41, level: "Advanced", q: "What is a policy gradient in RLHF?", answer: "PPO update: maximise expected reward while penalising KL divergence from reference model — clipped ratio prevents destructive updates." },
  { n: 42, level: "Advanced", q: "Reward model design tips.", answer: "Diverse prompts, calibrated comparisons, filter noisy labels, cross-check with human eval, ensemble reward models." },
  { n: 43, level: "Advanced", q: "How to measure alignment?", answer: "Refusal correctness, harmlessness benchmarks, red-teaming pass rates, human preference win-rate vs baseline, honesty benchmarks (TruthfulQA)." },
  { n: 44, level: "Advanced", q: "Explain differential privacy in training.", answer: "Add calibrated noise to gradients (DP-SGD) so any single training example has bounded influence on the model." },
  { n: 45, level: "Advanced", q: "Federated learning for LLMs?", answer: "Train on decentralised data by sharing gradient/model updates rather than raw data; challenging at LLM scale, common for fine-tuning adapters on-device." },
  { n: 46, level: "Advanced", q: "Model card / system card — purpose?", answer: "Document capabilities, training data at high level, safety evals, limitations and intended uses for compliance and trust." },
  { n: 47, level: "Advanced", q: "How to red-team an LLM product?", answer: "Adversarial prompts across policy categories, tool-abuse attempts, jailbreak generation, prompt-injection via retrieved docs; track pass rates over versions." },
  { n: 48, level: "Advanced", q: "Explain KV cache offloading.", answer: "Move older KV pages to CPU or disk when GPU memory is full; recall them on demand — trades latency for longer sequences." },
  { n: 49, level: "Advanced", q: "Quantised inference accuracy loss — how to measure?", answer: "Run task-specific evals (MMLU, HumanEval) before/after quantisation; check tail-token perplexity; monitor user-visible metrics in prod." },
  { n: 50, level: "Advanced", q: "Best strategy to deploy an LLM to millions of users?", answer: "Managed provider for burst + self-hosted small models for common queries; router picks per-request; multi-region; autoscale on tokens/sec; heavy caching." },
  { n: 51, level: "Advanced", q: "Explain speculative RAG.", answer: "Model drafts answer while retrieval runs in parallel; on retrieval, verify/refine — reduces perceived latency." },
  { n: 52, level: "Advanced", q: "How would you build a code-generation system like Copilot?", answer: "Code-tuned LLM + repo context via retrieval + AST-aware chunking + tests-in-the-loop evaluation + user telemetry for reward signals." },
  { n: 53, level: "Advanced", q: "How to prevent training-data memorisation?", answer: "Dedupe corpus, add DP, monitor extraction attacks, cap epochs, add regularisation, use canary tokens to detect leaks." },
  { n: 54, level: "Advanced", q: "Explain HyDE (Hypothetical Document Embeddings).", answer: "Generate a hypothetical answer to the query, embed it, search — often better recall for zero-shot RAG." },
  { n: 55, level: "Advanced", q: "Cross-encoder reranking — trade-offs?", answer: "Higher precision, ~10–100× slower per pair, limited to top-N; usually rerank 20–100 candidates." },
  { n: 56, level: "Advanced", q: "Graph RAG?", answer: "Build a knowledge graph from documents; retrieve subgraphs relevant to the query for structured multi-hop reasoning." },
  { n: 57, level: "Advanced", q: "Explain OpenAI's o-series / reasoning models.", answer: "Trained to spend more inference compute on chain-of-thought internally, producing better answers for math/coding/logic at higher latency/cost." },
  { n: 58, level: "Advanced", q: "How to compare two providers rigorously?", answer: "Same eval suite, matched prompts, control for temperature, run multiple seeds, cost/perf frontier chart, latency percentiles, refusal rates." },
  { n: 59, level: "Advanced", q: "Explain 'test-time compute'.", answer: "Increasing computation at inference (samples, search, verifiers) to improve output — self-consistency, ToT, best-of-N, verifier reranking." },
  { n: 60, level: "Advanced", q: "How to safeguard tool-using agents?", answer: "Sandbox execution, allowlist tools, capability tokens per tool, spending caps, human approval for destructive actions, complete audit logs." },
  { n: 61, level: "Advanced", q: "Explain 'grounded generation' policies.", answer: "Model instructed to answer only from provided context; unsupported claims must be refused; verify with post-hoc citation checker." },
  { n: 62, level: "Advanced", q: "How to keep an LLM current?", answer: "Retrieval over live sources, scheduled fine-tune refresh, tool-based web search, provider model upgrades with regression evals." },
  { n: 63, level: "Advanced", q: "Explain 'guardian model' pattern.", answer: "A smaller model reviews the primary model's output for policy compliance before returning to the user." },
  { n: 64, level: "Advanced", q: "How to build a robust prompt regression harness?", answer: "Yaml prompts + versioned goldens + LLM-judge with rubric + numerical thresholds + CI gate + drift dashboards." },
  { n: 65, level: "Advanced", q: "Cache warming for RAG?", answer: "Pre-embed top queries, prefetch top docs, keep KV prefix for common prompts, precompute rerank scores for popular queries." },
  { n: 66, level: "Advanced", q: "Explain 'context precision' vs 'context recall'.", answer: "Precision: fraction of retrieved chunks that are relevant. Recall: fraction of all relevant chunks retrieved. Balance via top-k + reranker." },
  { n: 67, level: "Advanced", q: "How to fine-tune for JSON output reliability?", answer: "SFT on schema-valid outputs, add negative examples, decode with grammar/schema constraints, validate + retry on failure." },
  { n: 68, level: "Advanced", q: "Explain KV cache re-use across requests.", answer: "Shared prefix across users (e.g., system prompt) is cached once; each request only computes its unique suffix." },
  { n: 69, level: "Advanced", q: "Compare open-weight vs closed-weight for a regulated bank.", answer: "Open-weight: data locality, control, cost predictability; closed: often better quality/safety, faster iteration. Many banks pick hybrid + PII masking." },
  { n: 70, level: "Advanced", q: "How would you build offline-mode chat on device?", answer: "Ship 4-bit quantised 3–8B model, small embeddings, on-device vector store, streaming inference via llama.cpp/ONNX Runtime." },
  { n: 71, level: "Advanced", q: "Explain 'model routing' architecture.", answer: "Classifier (rules + small LLM) decides per query which downstream model to call — cheap model for FAQs, big model for complex." },
  { n: 72, level: "Advanced", q: "Explain 'best-of-N with verifier'.", answer: "Sample N candidates; a verifier scores each; return the best — a strong lever for reasoning/coding." },
  { n: 73, level: "Advanced", q: "Design an eval for a legal-summary assistant.", answer: "Rubric: factuality, coverage of key clauses, correct citations, no invented facts, plain-language clarity. Combine LLM-judge + attorney review sample." },
  { n: 74, level: "Advanced", q: "How to comply with EU AI Act as a GenAI product?", answer: "Classify risk tier, maintain technical documentation, log usage, transparency labels for AI outputs, data governance, human oversight, incident reporting." },
  { n: 75, level: "Advanced", q: "Where do you see LLM engineering in 3 years?", answer: "Smaller specialised open models, deep tool + code integration, on-device by default, multi-agent orchestration, formal verifiers replacing LLM-as-judge." },
];

// -------------------- CODING (40) --------------------
type Coding = { n: number; title: string; problem: string; hint?: string; solution: string; complexity?: string };
const CODING: Coding[] = [
  { n: 1, title: "Call OpenAI Chat Completions", problem: "Write a Python function ask(prompt) that calls OpenAI GPT-4o-mini and returns the assistant message.", hint: "Use the openai SDK; read OPENAI_API_KEY from env.", solution: `from openai import OpenAI
client = OpenAI()
def ask(prompt: str) -> str:
    r = client.chat.completions.create(model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}])
    return r.choices[0].message.content` },
  { n: 2, title: "Simple Retry with Backoff", problem: "Wrap an LLM call in retry with exponential backoff on 429/5xx.", solution: `import time, random
def call_with_retry(fn, tries=5):
    for i in range(tries):
        try: return fn()
        except Exception:
            if i == tries-1: raise
            time.sleep((2**i) + random.random())` },
  { n: 3, title: "Cosine Similarity", problem: "Compute cosine similarity between two vectors without NumPy.", solution: `def cos(a, b):
    dot = sum(x*y for x,y in zip(a,b))
    na = sum(x*x for x in a) ** 0.5
    nb = sum(x*x for x in b) ** 0.5
    return dot / (na*nb)`, complexity: "O(n)" },
  { n: 4, title: "Recursive Chunker", problem: "Split text into chunks of max N characters with M overlap.", solution: `def chunk(text, size=800, overlap=100):
    out, i = [], 0
    while i < len(text):
        out.append(text[i:i+size])
        i += size - overlap
    return out` },
  { n: 5, title: "Embed & Search in memory", problem: "Given a list of texts, embed and retrieve top-k for a query using OpenAI embeddings.", solution: `from openai import OpenAI
client = OpenAI()
def embed(texts):
    r = client.embeddings.create(model="text-embedding-3-small", input=texts)
    return [d.embedding for d in r.data]

def search(query, corpus, k=3):
    q = embed([query])[0]
    docs = embed(corpus)
    scored = sorted(zip(corpus, docs), key=lambda x: -cos(q, x[1]))
    return [t for t,_ in scored[:k]]` },
  { n: 6, title: "PDF → Text", problem: "Extract text from a PDF file.", solution: `from pypdf import PdfReader
def pdf_text(path):
    return "\\n".join(p.extract_text() or "" for p in PdfReader(path).pages)` },
  { n: 7, title: "Minimal RAG with Chroma", problem: "Ingest docs into Chroma and answer a question.", solution: `import chromadb
client = chromadb.Client()
col = client.create_collection("kb")
col.add(ids=[f"d{i}" for i in range(len(docs))], documents=docs)
res = col.query(query_texts=["what is RAG?"], n_results=3)` },
  { n: 8, title: "LangChain Chain", problem: "Build a summariser chain with LangChain LCEL.", solution: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
prompt = ChatPromptTemplate.from_template("Summarise in 3 bullets:\\n{text}")
chain = prompt | ChatOpenAI(model="gpt-4o-mini")
chain.invoke({"text": long_text})` },
  { n: 9, title: "FastAPI Endpoint", problem: "Expose /ask?q=... that streams tokens.", solution: `from fastapi import FastAPI
from fastapi.responses import StreamingResponse
app = FastAPI()

@app.get("/ask")
def ask(q: str):
    def gen():
        for tok in stream_llm(q):
            yield tok
    return StreamingResponse(gen(), media_type="text/plain")` },
  { n: 10, title: "Streamlit Chat UI", problem: "Minimal chat interface using Streamlit.", solution: `import streamlit as st
if "msgs" not in st.session_state: st.session_state.msgs = []
for m in st.session_state.msgs: st.chat_message(m["role"]).write(m["content"])
if q := st.chat_input("Ask..."):
    st.session_state.msgs.append({"role":"user","content":q})
    ans = ask(q)
    st.session_state.msgs.append({"role":"assistant","content":ans})
    st.chat_message("assistant").write(ans)` },
  { n: 11, title: "Function Calling", problem: "Define a get_weather tool and let the model call it.", solution: `tools = [{
  "type":"function",
  "function":{"name":"get_weather","parameters":{
    "type":"object","properties":{"city":{"type":"string"}},"required":["city"]}}}]
r = client.chat.completions.create(model="gpt-4o-mini",
    messages=[{"role":"user","content":"Weather in Delhi?"}],
    tools=tools)` },
  { n: 12, title: "Rate Limiter", problem: "Simple token-bucket per user.", solution: `import time
class Bucket:
    def __init__(self, rate, burst): self.rate, self.tokens, self.t = rate, burst, time.time()
    def allow(self):
        now = time.time(); self.tokens = min(self.tokens + (now-self.t)*self.rate, self.rate*60); self.t = now
        if self.tokens >= 1: self.tokens -= 1; return True
        return False` },
  { n: 13, title: "Structured Output with Pydantic", problem: "Return a JSON object matching a Pydantic schema.", solution: `from pydantic import BaseModel
class Resume(BaseModel): name: str; skills: list[str]
r = client.chat.completions.create(model="gpt-4o-mini",
   messages=[{"role":"user","content":resume_text}],
   response_format={"type":"json_schema","json_schema":{"name":"Resume","schema":Resume.model_json_schema()}})` },
  { n: 14, title: "Semantic Cache", problem: "Cache LLM responses keyed by embedding of the prompt.", solution: `# On call: embed(q); if any cached embedding has cos > 0.95, return that response; else call LLM & store.` },
  { n: 15, title: "Streaming SSE Client", problem: "Consume server-sent events in Python.", solution: `import requests
with requests.get(url, stream=True) as r:
    for line in r.iter_lines():
        if line.startswith(b"data:"): print(line[5:].decode())` },
  { n: 16, title: "Vector Search with FAISS", problem: "Build a FAISS index and search.", solution: `import faiss, numpy as np
idx = faiss.IndexFlatIP(dim); idx.add(np.asarray(vecs, dtype='float32'))
D,I = idx.search(np.asarray([q], dtype='float32'), 5)` },
  { n: 17, title: "LangGraph Node", problem: "Two-node graph: planner → executor.", solution: `# See langgraph docs; define TypedDict state, add nodes, edges START→plan→exec→END.` },
  { n: 18, title: "CrewAI Team", problem: "Set up a researcher + writer crew.", solution: `# from crewai import Agent, Task, Crew; define roles/goals; Crew(agents,tasks).kickoff().` },
  { n: 19, title: "Async Fan-out", problem: "Query 3 LLMs concurrently and pick best.", solution: `import asyncio
async def main(q):
    outs = await asyncio.gather(call_a(q), call_b(q), call_c(q))
    return pick_best(outs)` },
  { n: 20, title: "Prompt Template Renderer", problem: "Render a template with placeholders safely.", solution: `from string import Template
def render(tpl, **kw): return Template(tpl).safe_substitute(**kw)` },
  { n: 21, title: "Redact PII", problem: "Redact emails/phones before sending to an LLM.", solution: `import re
def redact(t):
    t = re.sub(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+", "[EMAIL]", t)
    t = re.sub(r"\\+?\\d[\\d\\s().-]{7,}", "[PHONE]", t)
    return t` },
  { n: 22, title: "Chunk by Sentence", problem: "Split by sentences, then group up to N tokens.", solution: `# Use nltk.sent_tokenize + tiktoken to count tokens; group sentences until limit.` },
  { n: 23, title: "Reranker with Cross-Encoder", problem: "Rerank top-20 with a cross-encoder.", solution: `from sentence_transformers import CrossEncoder
ce = CrossEncoder("BAAI/bge-reranker-base")
scores = ce.predict([(q, d) for d in docs])` },
  { n: 24, title: "JSON Repair", problem: "Fix broken JSON returned by an LLM.", solution: `# Try json.loads; on failure, use library like json-repair or ask the model to fix its own output.` },
  { n: 25, title: "Token Counter", problem: "Count tokens for a string with tiktoken.", solution: `import tiktoken
enc = tiktoken.encoding_for_model("gpt-4o-mini")
def n_tokens(s): return len(enc.encode(s))` },
  { n: 26, title: "Multi-turn Memory", problem: "Trim history to fit a token budget.", solution: `def trim(msgs, budget):
    total = 0; out = []
    for m in reversed(msgs):
        total += n_tokens(m["content"])
        if total > budget: break
        out.append(m)
    return list(reversed(out))` },
  { n: 27, title: "Streaming JSON Parser", problem: "Parse JSON produced token-by-token.", solution: `# Buffer chunks; try incremental parse with orjson or ijson; validate on completion.` },
  { n: 28, title: "Vector DB Upsert", problem: "Upsert docs to Qdrant.", solution: `from qdrant_client import QdrantClient
qc = QdrantClient(url=...)
qc.upsert(collection_name="kb", points=[{"id":i,"vector":v,"payload":{"text":t}} for i,(v,t) in enumerate(zip(vecs,texts))])` },
  { n: 29, title: "Dockerfile", problem: "Containerise a FastAPI LLM app.", solution: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn","app:app","--host","0.0.0.0","--port","8000"]` },
  { n: 30, title: "REST Health Endpoint", problem: "Add /healthz that verifies OpenAI connectivity.", solution: `@app.get("/healthz")
def health(): return {"ok": bool(client.models.list())}` },
  { n: 31, title: "Prompt Injection Filter", problem: "Detect suspicious instructions in retrieved text.", solution: `BAD = ["ignore previous","system prompt","you are now"]
def suspicious(t): return any(b in t.lower() for b in BAD)` },
  { n: 32, title: "LLM-as-Judge", problem: "Score answer quality on 1–5 with reasoning.", solution: `prompt = f"Rate 1-5 with reasoning.\\nQ:{q}\\nA:{a}\\nRubric:{rubric}\\nJSON: {{score,reasoning}}"` },
  { n: 33, title: "Golden Set Runner", problem: "Loop over goldens and report pass rate.", solution: `passed=0
for g in goldens:
    if judge(ask(g.q), g.expected)>=4: passed+=1
print(passed/len(goldens))` },
  { n: 34, title: "Deploy to Render", problem: "Write render.yaml for FastAPI service.", solution: `services:
- type: web
  name: genai-api
  env: docker
  plan: starter
  autoDeploy: true` },
  { n: 35, title: "OpenAI Batch API", problem: "Submit a bulk classification job.", solution: `# Prepare JSONL requests; client.files.create(purpose='batch'); client.batches.create(endpoint='/v1/chat/completions', ...)` },
  { n: 36, title: "Local Llama with llama.cpp", problem: "Run a quantised model locally.", solution: `# llama-cli -m model-q4.gguf -p "Hello"  (Python: llama-cpp-python)` },
  { n: 37, title: "Streaming to WebSocket", problem: "Push tokens to the browser over WS.", solution: `# FastAPI websocket endpoint; async for tok in stream: await ws.send_text(tok)` },
  { n: 38, title: "Tool Call Loop", problem: "Implement a simple ReAct loop.", solution: `while True:
    r = model(messages)
    if r.tool_calls: messages += [r] + [exec_tool(tc) for tc in r.tool_calls]; continue
    return r.content` },
  { n: 39, title: "Agent Budget Guard", problem: "Stop the agent after N tokens or $ spent.", solution: `if state.tokens > MAX_TOKENS or state.cost_usd > MAX_USD: raise BudgetExceeded()` },
  { n: 40, title: "Vector DB Metric switch", problem: "Support cosine and dot-product interchangeably.", solution: `# Normalise vectors on ingest → cosine reduces to dot product; pick metric per collection.` },
];

function CodeQ({ items }: { items: Coding[] }) {
  return (
    <div className="grid gap-4">
      {items.map((c) => (
        <div key={c.n} className="rounded-xl border bg-card/40 p-4">
          <p className="text-xs text-muted-foreground">Coding Q{c.n}</p>
          <p className="mb-1 font-semibold">{c.title}</p>
          <p className="mb-2 text-sm">{c.problem}</p>
          {c.hint && <p className="text-sm text-muted-foreground"><strong>Hint:</strong> {c.hint}</p>}
          <Code lang="python">{c.solution}</Code>
          {c.complexity && <p className="mt-1 text-xs text-muted-foreground">Complexity: {c.complexity}</p>}
        </div>
      ))}
    </div>
  );
}

// -------------------- SYSTEM DESIGN (30) --------------------
const SYSDESIGN = [
  "Design ChatGPT (multi-turn chat, memory, streaming, safety, billing).",
  "Design a PDF Chatbot (ingestion pipeline, chunking, RAG, citations).",
  "Design an AI Tutor for K-12 (adaptive difficulty, progress store, safety).",
  "Design a Resume Analyzer (JD parsing, embedding match, scoring, feedback).",
  "Design an AI Email Generator (templates, tone, brand voice, guardrails).",
  "Design an AI Search Engine (crawler → indexer → hybrid search → LLM answer).",
  "Design an AI Coding Assistant (repo context, symbol graph, tests-in-loop).",
  "Design a Meeting Summarizer (ASR + speaker diarisation + LLM summary).",
  "Design an AI Translator (glossary-aware, streaming, quality evals).",
  "Design a Personal AI Assistant (calendar, email, notes, agent + tools).",
  "Design a customer-support copilot (ticket ingest, KB RAG, agent handoff).",
  "Design a legal-doc review assistant (clause extraction, risk scoring).",
  "Design a medical Q&A system (evidence-grounded, safety, disclaimers).",
  "Design an e-commerce recommender with LLM re-ranking.",
  "Design an internal-docs assistant for a 5,000-person company (SSO, RBAC).",
  "Design a code-review bot on GitHub (webhook → analyse → PR comment).",
  "Design a spreadsheet assistant (schema inference, formula generation).",
  "Design an AI voice assistant (ASR → LLM → TTS, low latency).",
  "Design a video summariser (frame sampling + ASR + multimodal LLM).",
  "Design a fine-tuning platform (data upload → training → eval → deploy).",
  "Design a multi-tenant embedding platform.",
  "Design an on-device chat assistant (mobile, 4-bit quantised).",
  "Design a global-scale LLM gateway (routing, caching, quotas).",
  "Design an AI SQL generator with safety layer.",
  "Design an autonomous research agent that produces PDFs.",
  "Design an image-generation product with content policy.",
  "Design a real-time captioning system.",
  "Design an AI grading system for coding assignments.",
  "Design a compliance-aware chatbot for a bank.",
  "Design a rate-limited public LLM API with fair-use quotas.",
];

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      {/* ================= CHAPTER 1 ================= */}
      <Section id="c1" title="Chapter 1 — Introduction to Generative AI Interviews">
        <p>
          Generative AI interviews are broader than classical ML rounds. Companies test whether you
          can <strong>build, ship and defend</strong> LLM systems in production — not just recall
          research trivia.
        </p>
        <h4 className="mt-3 font-semibold">What top companies expect</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>Rock-solid Python + one framework (LangChain / LlamaIndex / DSPy).</li>
          <li>Strong grip on Transformers, tokenization, embeddings, sampling.</li>
          <li>Practical RAG, agents, prompt evaluation and cost/latency trade-offs.</li>
          <li>System design: safety, observability, multi-tenant, scaling.</li>
          <li>Clear communication and structured problem solving.</li>
        </ul>
        <h4 className="mt-3 font-semibold">Common interview rounds</h4>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`1. Recruiter screen          → motivation, resume fit
2. Technical phone screen    → fundamentals, small coding
3. Coding round(s)           → Python + LLM APIs + data structs
4. Take-home / project       → build a mini RAG or agent
5. System design             → ChatGPT-scale designs
6. Deep-dive on your project → architecture, trade-offs, failures
7. Behavioural / HR          → STAR stories, fit, compensation`}</pre>
        <h4 className="mt-3 font-semibold">Preparation strategy (30 days)</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Days 1–7: transformers, tokens, sampling, prompting fundamentals.</li>
          <li>Days 8–14: RAG, embeddings, vector DBs — build 1 end-to-end.</li>
          <li>Days 15–21: agents, tool calling, fine-tuning (LoRA), evaluation.</li>
          <li>Days 22–27: system design + 2 mocks with peers.</li>
          <li>Days 28–30: STAR stories, salary research, portfolio polish.</li>
        </ol>
        <Callout tone="tip" title="Interviewer's #1 signal">
          Clarity of trade-offs. If you can articulate why you chose top-p=0.9 over 1.0, cosine over
          dot product, LoRA over full fine-tune — you're ahead of 80% of candidates.
        </Callout>
      </Section>

      {/* ================= CHAPTER 2 ================= */}
      <Section id="c2" title="Chapter 2 — 50 Beginner Interview Questions">
        <QList items={BEGINNER} />
      </Section>

      {/* ================= CHAPTER 3 ================= */}
      <Section id="c3" title="Chapter 3 — 75 Intermediate Interview Questions">
        <QList items={INTERMEDIATE} />
      </Section>

      {/* ================= CHAPTER 4 ================= */}
      <Section id="c4" title="Chapter 4 — 75 Advanced Interview Questions">
        <QList items={ADVANCED} />
      </Section>

      {/* ================= CHAPTER 5 ================= */}
      <Section id="c5" title="Chapter 5 — 40 Coding Interview Questions">
        <CodeQ items={CODING} />
      </Section>

      {/* ================= CHAPTER 6 ================= */}
      <Section id="c6" title="Chapter 6 — 30 System Design Questions">
        <p>
          For every design use the same skeleton so you never freeze at the whiteboard:
        </p>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`1. Clarify use case, users, scale, SLA
2. High-level components (ingest, index, LLM, cache, gateway, UI)
3. Data model + APIs
4. Retrieval / model selection
5. Safety, auth, multi-tenant
6. Caching + cost + latency
7. Deployment + scaling (regions, autoscaling)
8. Monitoring, evals, feedback loops
9. Failure modes + fallbacks
10. Future extensions`}</pre>
        <h4 className="mt-3 font-semibold">30 questions to practise</h4>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {SYSDESIGN.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        <Callout tone="info" title="Model architecture — chat product">
          Client → API Gateway → Auth → Rate Limiter → LLM Router → (Cache | RAG service | Tool
          service) → LLM (managed + self-hosted) → Guardrails → Response streaming → Observability
          (traces, evals) → Feedback store.
        </Callout>
      </Section>

      {/* ================= CHAPTER 7 ================= */}
      <Section id="c7" title="Chapter 7 — Project Discussion Questions">
        <ul className="list-disc space-y-1 pl-5">
          <li>Walk me through your favourite project — architecture and biggest trade-off.</li>
          <li>What broke in production? How did you detect and fix it?</li>
          <li>How did you evaluate quality before shipping?</li>
          <li>What would you rebuild differently today?</li>
          <li>How did you optimise cost / latency by 2×?</li>
          <li>What was your role in a team project? Who owned what?</li>
          <li>How did you handle disagreement on architecture with a senior?</li>
          <li>Have you contributed to open source? Which PRs matter most?</li>
          <li>Describe an internship / hackathon win and what you learned.</li>
          <li>What's the most important lesson from failure?</li>
        </ul>
      </Section>

      {/* ================= CHAPTER 8 ================= */}
      <Section id="c8" title="Chapter 8 — Behavioural Questions (STAR)">
        <p>
          Use <strong>STAR</strong>: <em>Situation → Task → Action → Result</em>. Keep each answer
          under 2 minutes and lead with impact.
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li><strong>Tell me about yourself.</strong> 30-second pitch: who you are + what you build + why GenAI + what you want next.</li>
          <li><strong>Why Generative AI?</strong> Ground it in a project + long-term goal.</li>
          <li><strong>Biggest challenge?</strong> Pick one where <em>you</em> drove the outcome.</li>
          <li><strong>Failure story?</strong> Small failure, big lesson, no blame.</li>
          <li><strong>Conflict resolution?</strong> Show empathy + data-driven resolution.</li>
          <li><strong>Leadership?</strong> Influence without authority counts.</li>
          <li><strong>Teamwork?</strong> Concrete role + measurable outcome.</li>
          <li><strong>Time management?</strong> Prioritisation framework you use.</li>
          <li><strong>Learning mindset?</strong> Last thing you learned this month.</li>
          <li><strong>Career goals?</strong> Align 3-year plan with the role.</li>
        </ol>
      </Section>

      {/* ================= CHAPTER 9 ================= */}
      <Section id="c9" title="Chapter 9 — HR Questions">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Expected salary?</strong> Do market research (Levels.fyi, AmbitionBox). Give a range with rationale.</li>
          <li><strong>Notice period?</strong> Be honest, mention negotiation possibility.</li>
          <li><strong>Relocation?</strong> State constraints upfront.</li>
          <li><strong>Strengths / weaknesses?</strong> Weakness + active improvement.</li>
          <li><strong>Remote / hybrid?</strong> Match company policy; show flexibility.</li>
          <li><strong>Company research?</strong> Cite recent product launch or blog post.</li>
          <li><strong>Career aspirations?</strong> Growth into senior engineer / tech lead within 3 years.</li>
          <li><strong>Other offers?</strong> Be transparent, do not lie.</li>
        </ul>
      </Section>

      {/* ================= CHAPTER 10 ================= */}
      <Section id="c10" title="Chapter 10 — 10 Mock Interviews">
        {[
          { role: "GenAI Engineer (Startup)", qs: ["Design RAG for a legal firm.", "Cost-vs-quality trade-offs?", "How would you evaluate faithfulness?"] },
          { role: "LLM Engineer (Big Tech)", qs: ["Explain FlashAttention and PagedAttention.", "Design a global LLM gateway.", "Reduce p95 latency by 30%?"] },
          { role: "AI Engineer (FinTech)", qs: ["Build a compliance-aware chatbot.", "Prevent PII leakage.", "Handle prompt injection from KB docs."] },
          { role: "Prompt Engineer (SaaS)", qs: ["Design a golden-set evaluation harness.", "How do you A/B test prompts safely?", "Guardrails architecture?"] },
          { role: "ML Engineer (HealthTech)", qs: ["Fine-tune Llama-3 for clinical notes.", "Ensure HIPAA compliance.", "Deploy on-prem, quantised."] },
          { role: "AI Product Manager", qs: ["Roadmap for an AI writing assistant.", "Define north-star metrics.", "Trade-offs with legal + safety."] },
          { role: "Research Engineer", qs: ["Latest paper you read?", "Reproduce a RLHF pipeline.", "Design an experiment for a new sampling method."] },
          { role: "Full-stack GenAI Dev", qs: ["Build a Streamlit + FastAPI PDF chatbot.", "Handle streaming to 1000 users.", "Redeploy without downtime."] },
          { role: "AI Solutions Architect", qs: ["Design a multi-tenant embedding platform.", "Cost model per tenant.", "SLA + observability plan."] },
          { role: "Senior GenAI Engineer", qs: ["Migrate a monolith RAG to microservices.", "Route between OpenAI + open-weight models.", "Manage 50 prompts across teams."] },
        ].map((m, i) => (
          <div key={i} className="mb-4 rounded-xl border bg-card/40 p-4">
            <p className="font-semibold">Mock {i + 1}: {m.role}</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
              {m.qs.map((q, j) => <li key={j}>{q}</li>)}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              <strong>Follow-up drill:</strong> defend one trade-off · draw the architecture · state 2 things you would do differently at 10× scale.
            </p>
          </div>
        ))}
      </Section>

      {/* ================= APPENDIX ================= */}
      <Section id="appendix" title="Appendix — Rapid Fire, Flashcards & Cheat Sheet">
        <h4 className="font-semibold">30 Rapid-fire questions</h4>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Token vs word?</li>
          <li>Temperature=0 means?</li>
          <li>Cosine range?</li>
          <li>What does softmax do?</li>
          <li>KV cache purpose?</li>
          <li>LoRA rank default?</li>
          <li>Chunk overlap default?</li>
          <li>MoE experts per token?</li>
          <li>RLHF final loss uses?</li>
          <li>DPO stands for?</li>
          <li>Top-p default value?</li>
          <li>Best small open model?</li>
          <li>Best embedding for English?</li>
          <li>MTEB is?</li>
          <li>HNSW vs IVF?</li>
          <li>Prompt injection defence?</li>
          <li>vLLM's key trick?</li>
          <li>Streaming protocol?</li>
          <li>LangGraph node type?</li>
          <li>DSPy in one line?</li>
          <li>Whisper is used for?</li>
          <li>Guardrails library?</li>
          <li>Langfuse purpose?</li>
          <li>RAGAS metric?</li>
          <li>OpenAI Batch discount?</li>
          <li>Best-of-N idea?</li>
          <li>Speculative decoding is lossless?</li>
          <li>Quantisation NF4 stands for?</li>
          <li>Guardian model role?</li>
          <li>EU AI Act tiers?</li>
        </ol>

        <h4 className="mt-3 font-semibold">Interview checklist</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Portfolio: 3 polished projects + live demos + READMEs.</li>
          <li>Resume: quantified impact, GenAI keywords, links.</li>
          <li>1 blog post + 1 open-source PR.</li>
          <li>Practice 2 mock interviews per week.</li>
          <li>Salary research done for target companies.</li>
          <li>10 STAR stories memorised.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Cheat sheet</h4>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`Prompt      → Role, Task, Context, Constraints, Format
Sampling    → T=0.2 factual · 0.7 balanced · 1.0 creative
RAG         → chunk 800 / overlap 100 / k=4-8 / rerank top 20
LoRA        → r=8-32, α≈2r, target q_proj/k_proj/v_proj/o_proj
Agents      → step cap, budget cap, allowlisted tools
Deploy      → Docker + Render/Fly + prefix cache + rate limits
Observab.   → Langfuse/Arize + golden set + LLM-judge + CI gate`}</pre>

        <h4 className="mt-3 font-semibold">Common mistakes to avoid</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Saying LLMs "understand" — say model, distribution, next-token.</li>
          <li>Claiming zero hallucinations after RAG — always give mitigations, not guarantees.</li>
          <li>Skipping evaluation in system-design answers.</li>
          <li>Forgetting to state cost/latency trade-offs.</li>
          <li>Over-engineering agents when a chain would do.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Resources</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Books:</strong> <em>AI Engineering</em> (Chip Huyen), <em>Designing ML Systems</em>, <em>Speech & Language Processing</em> (Jurafsky).</li>
          <li><strong>GitHub:</strong> huggingface/transformers, langchain-ai/langchain, run-llama/llama_index, vllm-project/vllm.</li>
          <li><strong>Papers:</strong> Attention Is All You Need · InstructGPT · LoRA · DPO · Constitutional AI · FlashAttention · Mixtral.</li>
          <li><strong>Practice:</strong> Kaggle, Hugging Face Spaces, Papers with Code, LeetCode.</li>
          <li><strong>Communities:</strong> r/LocalLLaMA, LangChain Discord, Hugging Face forums, DeepLearning.AI community.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="I'm a fresher — should I focus more on GenAI or classical ML?">Both. Interviewers still ask overfitting, gradient descent, cross-entropy. GenAI is on top, not instead.</FAQItem>
        <FAQItem q="How many projects should I have on my resume?">Three deep, well-documented projects &gt; ten shallow ones.</FAQItem>
        <FAQItem q="Do I need a Kaggle rank?">No, but a hosted project with users is a strong differentiator.</FAQItem>
        <FAQItem q="Do I need to fine-tune a model to get a GenAI role?">Not required. Prompting + RAG + evaluation + one small LoRA experiment is enough for most jobs.</FAQItem>
        <FAQItem q="What if I don't know a question in the interview?">Say so, then reason out loud from first principles. Interviewers score thought process too.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This handbook is intended for educational and interview-preparation purposes only.
          Questions are compiled from public interview experiences, published research, official
          documentation and industry practice — they do not represent any specific company's actual
          interview questions. Compensation ranges, tools and best practices evolve continuously;
          always consult latest official sources. All trademarks, product names and intellectual
          property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
