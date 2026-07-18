import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-learning-roadmap",
  title: "Prompt Engineering — Learning Roadmap",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 10,
  lastUpdated: "April 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  heroSubtitle:
    "A structured 12-week roadmap from zero to production Prompt Engineering — with weekly milestones, projects, certifications, career paths and readiness checkpoints.",
};

const TOC: TocItem[] = [
  { id: "prereq", label: "1. Prerequisites" },
  { id: "ai", label: "2. Understanding AI & LLMs" },
  { id: "fund", label: "3. Prompt Fundamentals" },
  { id: "patterns", label: "4. Prompt Patterns" },
  { id: "adv", label: "5. Advanced Prompting" },
  { id: "agents", label: "6. AI Agents" },
  { id: "rag", label: "7. RAG & Context Engineering" },
  { id: "multi", label: "8. Multimodal Prompting" },
  { id: "portfolio", label: "9. Portfolio Projects" },
  { id: "career", label: "10. Career Preparation" },
  { id: "review", label: "Roadmap Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Frequently Asked Questions", tag: "AI & Data", time: "14 min" },
  { title: "Prompt Engineering — Tips & Tricks", tag: "AI & Data", time: "10 min" },
  { title: "Prompt Engineering — Reference Guide", tag: "AI & Data", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-learning-roadmap")({
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

const WEEKS = [
  { w: "Week 1", focus: "Prerequisites & mindset", tasks: ["Set up ChatGPT / Claude / Gemini accounts", "Read one intro article + one video per day", "Journal 10 prompts you tried"] },
  { w: "Week 2", focus: "LLM fundamentals", tasks: ["Tokens, context window, sampling", "Try temperature 0 vs 1 side-by-side", "Run 20 prompts across 2 different models"] },
  { w: "Week 3", focus: "Prompt fundamentals", tasks: ["Role · Task · Format template", "Zero/one/few-shot experiments", "Rewrite 10 bad prompts into good ones"] },
  { w: "Week 4", focus: "Prompt patterns", tasks: ["CoT, persona, template, cognitive verifier", "Build a summariser + classifier + extractor"] },
  { w: "Week 5", focus: "Structured outputs", tasks: ["Learn JSON mode / function calling", "Ship a data-extraction script"] },
  { w: "Week 6", focus: "Evaluation basics", tasks: ["Build a 30-example golden set", "Compare 3 prompt versions with metrics"] },
  { w: "Week 7", focus: "Advanced prompting", tasks: ["Self-consistency, Reflexion, ToT", "Distil a CoT prompt into a compact version"] },
  { w: "Week 8", focus: "RAG basics", tasks: ["Chunking, embeddings, vector search", "Build a mini RAG over your notes"] },
  { w: "Week 9", focus: "RAG improvements", tasks: ["Hybrid search + rerank", "Add citations + abstain logic"] },
  { w: "Week 10", focus: "Agents & tools", tasks: ["Learn ReAct pattern", "Build a 3-tool research agent"] },
  { w: "Week 11", focus: "Multimodal + safety", tasks: ["Image-in / structured-out prompts", "Prompt-injection red-team drills"] },
  { w: "Week 12", focus: "Portfolio & interview", tasks: ["Publish 3 GitHub projects", "Write a case study blog post", "Mock interviews (5×)"] },
];

const PROJECTS = [
  { name: "Newsletter summariser", stack: "API + JSON mode", why: "Practises structured output on real data." },
  { name: "Resume screener", stack: "Function calling + rubric", why: "Teaches evaluation and rubric-based scoring." },
  { name: "Doc-grounded chatbot (RAG)", stack: "pgvector + rerank", why: "The archetypal enterprise use case." },
  { name: "SQL copilot", stack: "Tool calling + guardrails", why: "Teaches deterministic tool integration." },
  { name: "Research agent", stack: "ReAct + search + code tools", why: "Full agent loop with budgets." },
  { name: "Multimodal receipt extractor", stack: "Vision LLM + schema", why: "Practises multimodal + structured output." },
];

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Learn Prompt Engineering in the correct sequence — not by chasing tutorials.</li>
          <li>Track progress with weekly milestones and readiness checkpoints.</li>
          <li>Build a portfolio strong enough for a real AI-engineering interview.</li>
          <li>Pick a career path (research, applied, product, DevRel).</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80"
          caption="12-week roadmap — beginner to production, one milestone per week."
        />
      </Section>

      <Section id="prereq" title="1. Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with English writing.</li>
          <li>Basic computer literacy (browsers, files, APIs).</li>
          <li>Python or JavaScript at reading-level (helpful, not required for weeks 1–4).</li>
          <li>Curiosity to test hypotheses instead of copying tutorials.</li>
        </ul>
        <Callout tone="tip" title="Zero-code start">
          You can complete weeks 1–4 in the ChatGPT / Claude / Gemini UI alone.
        </Callout>
      </Section>

      <Section id="ai" title="2. Understanding AI & LLMs">
        <ul className="list-disc space-y-1 pl-5">
          <li>What is a transformer? Tokens, attention, next-token prediction.</li>
          <li>Frontier vs open models: GPT-4o, Claude 3.5, Gemini 2, Llama, Mistral.</li>
          <li>Capabilities and limits: hallucination, context window, refusal, cost.</li>
          <li>Sampling: temperature, top_p, penalties, stop sequences.</li>
        </ul>
      </Section>

      <Section id="fund" title="3. Prompt Fundamentals">
        <ul className="list-disc space-y-1 pl-5">
          <li>Role · Task · Format (RTF) template.</li>
          <li>System vs user vs assistant turns.</li>
          <li>Zero / one / few-shot prompting.</li>
          <li>Delimiters and clean instructions.</li>
          <li>Length control and stop sequences.</li>
        </ul>
      </Section>

      <Section id="patterns" title="4. Prompt Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li>Persona, recipe, template, flipped-interaction, cognitive verifier.</li>
          <li>Chain-of-Thought, plan-then-solve.</li>
          <li>Self-consistency and reflection.</li>
          <li>ReAct interleaving reasoning and tool calls.</li>
        </ul>
      </Section>

      <Section id="adv" title="5. Advanced Prompting">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompt optimisation: APE, OPRO, DSPy.</li>
          <li>Constrained decoding + JSON schema.</li>
          <li>Distilling long prompts into short + fine-tuned models.</li>
          <li>LLM-as-judge and pairwise evaluation.</li>
        </ul>
      </Section>

      <Section id="agents" title="6. AI Agents">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tool calling / function calling primitives.</li>
          <li>Single-agent ReAct loops.</li>
          <li>Planner–executor and supervisor multi-agent patterns.</li>
          <li>Budgeting steps, tokens, cost and wall time.</li>
        </ul>
      </Section>

      <Section id="rag" title="7. RAG & Context Engineering">
        <ul className="list-disc space-y-1 pl-5">
          <li>Chunking strategies and embedding models.</li>
          <li>Hybrid retrieval (BM25 + dense) with a reranker.</li>
          <li>Grounded answers with citations and abstain logic.</li>
          <li>Advanced: HyDE, CRAG, Self-RAG, GraphRAG.</li>
        </ul>
      </Section>

      <Section id="multi" title="8. Multimodal Prompting">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vision-language prompts (image → structured output).</li>
          <li>Audio: streaming ASR feeding a text LLM.</li>
          <li>Document AI: PDFs, tables, receipts, forms.</li>
        </ul>
      </Section>

      <Section id="portfolio" title="9. Portfolio Projects">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Project</th><th className="text-left p-2">Stack</th><th className="text-left p-2">Why it matters</th></tr></thead>
          <tbody>
            {PROJECTS.map((p) => (
              <tr key={p.name} className="border-b"><td className="p-2">{p.name}</td><td className="p-2">{p.stack}</td><td className="p-2">{p.why}</td></tr>
            ))}
          </tbody>
        </table>
        <Callout tone="info" title="Portfolio rule of three">
          Ship three projects — one RAG, one agent, one integration. Each with a README, demo GIF and eval numbers.
        </Callout>
      </Section>

      <Section id="career" title="10. Career Preparation">
        <h3 className="font-semibold">Career paths</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>AI / LLM Engineer</strong> — ships prompt-driven systems in production.</li>
          <li><strong>Applied Researcher</strong> — evaluates and improves models & pipelines.</li>
          <li><strong>Prompt / DevRel Engineer</strong> — writes, teaches, evangelises.</li>
          <li><strong>AI Product Manager</strong> — spec, evaluate, coordinate.</li>
          <li><strong>Solutions Architect (AI)</strong> — designs enterprise deployments.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Certifications worth considering</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>DeepLearning.AI — ChatGPT Prompt Engineering, LangChain for LLM App Dev.</li>
          <li>Google Cloud — Generative AI Leader / Engineer.</li>
          <li>Microsoft — AI-102 Azure AI Engineer Associate.</li>
          <li>AWS — AI Practitioner / ML Engineer Associate.</li>
          <li>NVIDIA — Building Transformer-Based NLP Applications.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Interview preparation</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Whiteboard a RAG system end-to-end.</li>
          <li>Debug a hallucinating prompt live.</li>
          <li>Design a prompt evaluation pipeline.</li>
          <li>Compare fine-tuning vs prompting vs RAG.</li>
          <li>Explain a prompt-injection defence layer-by-layer.</li>
        </ul>
      </Section>

      <Section id="review" title="Roadmap Review">
        <h3 className="font-semibold">Progress tracker (12-week timeline)</h3>
        <div className="mt-2 space-y-2">
          {WEEKS.map((w) => (
            <div key={w.w} className="rounded-md border p-3">
              <div className="font-semibold">{w.w} — {w.focus}</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {w.tasks.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <Figure
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80"
          caption="Readiness checkpoints — one milestone per week keeps momentum without burnout."
        />
        <h3 className="mt-4 font-semibold">Readiness checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>You can explain tokens, attention and sampling in your own words.</li>
          <li>You've built and evaluated a RAG system.</li>
          <li>You've shipped an agent with tool calls and budgets.</li>
          <li>You've published at least one project publicly with a README + eval.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Next learning steps</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Deep-dive into fine-tuning (LoRA, PEFT, DPO).</li>
          <li>Learn one observability platform (LangSmith / Langfuse).</li>
          <li>Contribute to an open-source LLM tool.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is 12 weeks realistic part-time?">Yes at ~8–10 hrs/week. Bump to 6 weeks full-time.</FAQItem>
        <FAQItem q="Which framework should I learn first?">LangChain for exposure; DSPy once you've felt the pain of hand-tuned prompts.</FAQItem>
        <FAQItem q="Do I need a GPU?">No — you're calling APIs. GPUs only enter the picture for fine-tuning or self-hosting.</FAQItem>
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
