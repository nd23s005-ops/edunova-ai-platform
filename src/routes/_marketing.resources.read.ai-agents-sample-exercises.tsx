import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ai-agents-sample-exercises",
  title: "AI Agents — Sample Exercises",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "17 min",
  pages: 20,
  lastUpdated: "April 2026",
  tags: ["Agents", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1800&q=80",
  heroSubtitle: "Hands-on exercises — build a ReAct agent, a RAG pipeline, and a multi-agent workflow.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Agent Architecture & Workflow" },
  { id: "rag", label: "RAG, Memory & Tools" },
  { id: "multi", label: "Multi-Agent Systems & MCP" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Frameworks Comparison" },
  { id: "considerations", label: "Safety, Evaluation & Cost" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "AI Agents — Beginner Guide", tag: "Agents", time: "13 min" },
  { title: "AI Agents — Cheat Sheet", tag: "Agents", time: "6 min" },
  { title: "AI Agents — Interview Questions", tag: "Agents", time: "37 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ai-agents-sample-exercises")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/ai-agents-sample-exercises" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain what makes a system an <b>AI agent</b> — perception, reasoning, tool use, and action.</li>
          <li>Design agent loops using ReAct, planning, and reflection patterns.</li>
          <li>Ground agents in enterprise data with Retrieval-Augmented Generation (RAG).</li>
          <li>Give agents tools via function calling and the Model Context Protocol (MCP).</li>
          <li>Orchestrate multi-agent workflows with supervisor and worker roles.</li>
          <li>Evaluate, secure, and operate agents in production.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic Python and familiarity with REST APIs / JSON.</li>
          <li>A working understanding of Large Language Models and prompting.</li>
          <li>An API key for at least one LLM provider (OpenAI, Anthropic, Google, or open-source).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Agents & Agentic AI</li>
          <li>Core Concepts — LLMs, Tools, Memory, Planning</li>
          <li>Agent Architecture & Workflow</li>
          <li>RAG, Memory Systems, and Tool Use</li>
          <li>Multi-Agent Systems & MCP</li>
          <li>Frameworks — LangChain, LangGraph, CrewAI, AutoGen</li>
          <li>Safety, Evaluation, and Cost Optimization</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>AI agents are LLM-powered systems that <b>observe, reason, plan, and act</b> — using tools and memory to accomplish goals autonomously across multiple steps. This sample exercises focuses on the architectures, patterns, and frameworks used to build reliable, production-grade agentic systems.</p>
        <Callout tone="info" title="Agent in one line">Agent = LLM + Tools + Memory + Loop (observe → think → act → observe).</Callout>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — Agent loop — LLM reasons over observations, calls tools, updates memory, and repeats until the goal is reached." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Agent types</b> — reactive, deliberative, hybrid, and multi-agent systems.</li>
          <li><b>LLM basics</b> — transformers, tokenization, context windows, structured outputs, streaming.</li>
          <li><b>Reasoning</b> — Chain-of-Thought, Tree-of-Thoughts, ReAct, reflection, self-correction.</li>
          <li><b>Memory</b> — short-term (context), long-term (vector DB), episodic, semantic, working memory.</li>
          <li><b>RAG</b> — chunking, embeddings, vector search, hybrid search, and context injection.</li>
          <li><b>Tools</b> — function calling, REST/GraphQL APIs, code execution, browser automation.</li>
          <li><b>MCP</b> — Model Context Protocol standardizes tools, resources, and prompts across agents.</li>
          <li><b>Orchestration</b> — supervisor-worker, hierarchical, and swarm patterns.</li>
          <li><b>Safety</b> — prompt injection defense, guardrails, human-in-the-loop, output validation.</li>
          <li><b>Ops</b> — tracing, evaluation, monitoring, and cost optimization.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Agent Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`User Goal
   │
   ▼
┌──────────────────────────────────────────────┐
│  Agent Loop                                  │
│                                              │
│   [LLM Reasoner] ── plan / thought ────┐     │
│         ▲                              ▼     │
│         │                        [Tool Call] │
│   [Observation] ◀── result ──── [Tool/API]   │
│         │                                    │
│         ▼                                    │
│   [Memory] ◀── read/write ── Vector Store    │
└──────────────────────────────────────────────┘
   │
   ▼
Final Answer / Action`}
        </pre>
        <Code>{`# Minimal ReAct-style agent with tool calling (OpenAI SDK)
from openai import OpenAI
client = OpenAI()

tools = [{
  "type": "function",
  "function": {
    "name": "search_web",
    "description": "Search the web and return top results",
    "parameters": {
      "type": "object",
      "properties": {"query": {"type": "string"}},
      "required": ["query"]
    }
  }
}]

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Latest news on agentic AI?"}],
    tools=tools,
)
# Inspect resp.choices[0].message.tool_calls, execute, feed back, loop.`}</Code>
      </Section>

      <Section id="rag" title="RAG, Memory & Tools">
        <p>Retrieval-Augmented Generation grounds agents in trusted data. A typical pipeline: <b>load → chunk → embed → index → retrieve → generate</b>. Memory sits alongside RAG — short-term memory lives in the prompt, long-term memory lives in a vector store keyed by user or session.</p>
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 2 — RAG + memory pipeline — documents are chunked and embedded into a vector store, then retrieved to ground the LLM." />
        <Code>{`# Simple RAG with an embedding model + vector store (pseudo)
docs = load_docs("./kb")
chunks = chunk(docs, size=800, overlap=120)
vectors = embed(chunks)
index = VectorStore.from_vectors(vectors, chunks)

def answer(q: str) -> str:
    ctx = index.similarity_search(q, k=6)
    return llm.chat([
        {"role": "system", "content": "Answer only from CONTEXT."},
        {"role": "user", "content": f"CONTEXT:\n{ctx}\n\nQ: {q}"},
    ])`}</Code>
      </Section>

      <Section id="multi" title="Multi-Agent Systems & MCP">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Supervisor-Worker</b> — a planner agent delegates subtasks to specialist worker agents.</li>
          <li><b>Hierarchical</b> — nested teams for complex workflows (e.g. research → draft → review).</li>
          <li><b>Swarm</b> — many stateless agents cooperate on a shared task queue.</li>
          <li><b>MCP</b> — Anthropic's Model Context Protocol lets any client discover tools, resources, and prompts exposed by any MCP server — a standard "USB-C for agents".</li>
        </ul>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Customer support</b> — retrieval-grounded agents resolve L1 tickets with human handoff.</li>
          <li><b>Coding agents</b> — plan, edit, and test code across a repository.</li>
          <li><b>Research</b> — multi-agent teams search, read, synthesize, and cite sources.</li>
          <li><b>Finance</b> — reconciliation and anomaly-detection agents with human-in-the-loop.</li>
          <li><b>Sales</b> — outreach and lead-qualification agents that use CRM tools.</li>
          <li><b>Ops</b> — SRE agents triage alerts and propose runbooks.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Start with a simple loop; add planning, reflection, and multi-agent only when needed.</li>
          <li>Define clear tool schemas — good tool design beats prompt hacking.</li>
          <li>Ground answers in retrieval; make citations mandatory for factual tasks.</li>
          <li>Always enable tracing (LangSmith, OpenTelemetry) — you can't debug what you don't see.</li>
          <li>Evaluate with golden datasets and LLM-as-judge before shipping.</li>
          <li>Put humans in the loop for high-risk actions.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Skipping evaluation and shipping "vibes-based" agents.</li>
          <li>Over-scoping tools — one huge tool instead of small, composable ones.</li>
          <li>Ignoring prompt injection and unsanitized tool outputs.</li>
          <li>Unbounded loops that blow through tokens and budgets.</li>
          <li>Storing PII in vector stores without policy or encryption.</li>
          <li>Choosing multi-agent when a single agent with better prompts would do.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use structured outputs (JSON schema) whenever the next step needs machine-readable data.</li>
          <li>Cap step counts and add cost budgets per run.</li>
          <li>Prefer function calling over free-form parsing.</li>
          <li>Cache expensive tool calls and embeddings.</li>
          <li>Log every step — you'll need it for eval and debugging.</li>
        </ul>
      </Section>

      <Section id="compare" title="Frameworks Comparison">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Framework</th>
                <th className="py-2 pr-4">Strength</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">LangChain</td><td>Broad ecosystem</td><td>Rapid prototyping across many providers.</td></tr>
              <tr><td className="py-2 pr-4">LangGraph</td><td>Stateful graphs</td><td>Deterministic, resumable agent workflows.</td></tr>
              <tr><td className="py-2 pr-4">CrewAI</td><td>Role-based teams</td><td>Supervisor-worker multi-agent scenarios.</td></tr>
              <tr><td className="py-2 pr-4">AutoGen</td><td>Conversational agents</td><td>Agents that chat with each other and humans.</td></tr>
              <tr><td className="py-2 pr-4">Semantic Kernel</td><td>Enterprise / .NET</td><td>Microsoft stack and plugin architecture.</td></tr>
              <tr><td className="py-2 pr-4">LlamaIndex</td><td>RAG-first</td><td>Data-heavy retrieval and indexing.</td></tr>
              <tr><td className="py-2 pr-4">OpenAI Agents SDK</td><td>Native tools + guardrails</td><td>OpenAI-only production agents.</td></tr>
              <tr><td className="py-2 pr-4">Google ADK</td><td>Gemini + Vertex</td><td>GCP-native agent development.</td></tr>
              <tr><td className="py-2 pr-4">Pydantic AI</td><td>Typed, minimal</td><td>Type-safe Python agents.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Safety, Evaluation & Cost">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Safety</b> — prompt injection defense, output validation, allow-listed tools, and guardrails.</li>
          <li><b>Responsible AI</b> — governance, transparency, provenance, and human oversight.</li>
          <li><b>Evaluation</b> — task success, groundedness, latency, cost, and safety metrics.</li>
          <li><b>Cost</b> — smaller models for routing, caching, batching, and step caps.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>An agent is an LLM in a loop, augmented with tools and memory.</li>
          <li>ReAct + RAG covers most real workloads; add planning and multi-agent only when needed.</li>
          <li>MCP standardizes how agents discover and use tools across providers.</li>
          <li>Tracing, evaluation, and guardrails are non-negotiable in production.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need a specific framework to build agents?">No — you can build agents directly against provider SDKs. Frameworks help with orchestration, memory, and multi-agent patterns.</FAQItem>
        <FAQItem q="Single agent or multi-agent?">Start single-agent. Move to multi-agent only when tasks have clearly separable roles and shared context is manageable.</FAQItem>
        <FAQItem q="What is MCP?">The Model Context Protocol is an open standard for exposing tools, resources, and prompts to any LLM client.</FAQItem>
        <FAQItem q="How do I evaluate agents?">Golden datasets, task-success rubrics, groundedness checks, and LLM-as-judge — automated and human review.</FAQItem>
        <FAQItem q="How do I control cost?">Cap steps, cache retrieval and tool calls, use smaller routing models, and monitor per-run token spend.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://platform.openai.com/docs" target="_blank" rel="noreferrer">OpenAI Docs</a> · <a className="text-primary hover:underline" href="https://openai.github.io/openai-agents-python/" target="_blank" rel="noreferrer">OpenAI Agents SDK</a> · <a className="text-primary hover:underline" href="https://docs.anthropic.com/" target="_blank" rel="noreferrer">Anthropic Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://ai.google.dev/" target="_blank" rel="noreferrer">Google AI</a> · <a className="text-primary hover:underline" href="https://google.github.io/adk-docs/" target="_blank" rel="noreferrer">Google ADK</a> · <a className="text-primary hover:underline" href="https://modelcontextprotocol.io/" target="_blank" rel="noreferrer">Model Context Protocol</a></li>
          <li><a className="text-primary hover:underline" href="https://python.langchain.com/docs/" target="_blank" rel="noreferrer">LangChain</a> · <a className="text-primary hover:underline" href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noreferrer">LangGraph</a> · <a className="text-primary hover:underline" href="https://docs.crewai.com/" target="_blank" rel="noreferrer">CrewAI</a> · <a className="text-primary hover:underline" href="https://microsoft.github.io/autogen/" target="_blank" rel="noreferrer">AutoGen</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.llamaindex.ai/" target="_blank" rel="noreferrer">LlamaIndex</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/semantic-kernel/" target="_blank" rel="noreferrer">Semantic Kernel</a> · <a className="text-primary hover:underline" href="https://ai.pydantic.dev/" target="_blank" rel="noreferrer">Pydantic AI</a></li>
          <li><a className="text-primary hover:underline" href="https://huggingface.co/docs" target="_blank" rel="noreferrer">Hugging Face</a> · <a className="text-primary hover:underline" href="https://fastapi.tiangolo.com/" target="_blank" rel="noreferrer">FastAPI</a> · <a className="text-primary hover:underline" href="https://docs.docker.com/" target="_blank" rel="noreferrer">Docker</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. AI agent frameworks and provider APIs evolve rapidly — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
