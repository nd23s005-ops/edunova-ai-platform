import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-interview-questions",
  title: "Prompt Engineering — Interview Questions",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "27 min",
  pages: 52,
  lastUpdated: "May 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=1800&q=80",
  heroSubtitle:
    "A recruiter-tested interview handbook for Prompt Engineering roles — 250+ questions across beginner, intermediate, advanced, enterprise, HR, and scenario rounds, with layered hints, model answers, and follow-ups.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Introduction to PE Interviews" },
  { id: "s2", label: "2. Beginner Interview Questions" },
  { id: "s3", label: "3. Intermediate Interview Questions" },
  { id: "s4", label: "4. Advanced Interview Questions" },
  { id: "s5", label: "5. Scenario-Based Questions" },
  { id: "s6", label: "6. Prompt Design Challenges" },
  { id: "s7", label: "7. AI Agent Questions" },
  { id: "s8", label: "8. RAG Interview Questions" },
  { id: "s9", label: "9. LLM Evaluation Questions" },
  { id: "s10", label: "10. Enterprise AI Questions" },
  { id: "s11", label: "11. HR & Behavioral Questions" },
  { id: "s12", label: "12. Mock Interview" },
  { id: "s13", label: "13. Final Interview Checklist" },
  { id: "review", label: "Interview Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Practice Questions", tag: "AI & Data", time: "29 min" },
  { title: "Prompt Engineering — Answer Key", tag: "AI & Data", time: "25 min" },
  { title: "Prompt Engineering — Complete Tutorial", tag: "AI & Data", time: "64 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-interview-questions")({
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

function QA({ q, hint, a, follow }: { q: string; hint?: string; a: string; follow?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="font-semibold">Q. {q}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground"><strong>Hint:</strong> {hint}</p>}
      <p className="mt-2 text-sm"><strong>Model answer.</strong> {a}</p>
      {follow && <p className="mt-2 text-xs text-muted-foreground"><strong>Follow-up:</strong> {follow}</p>}
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prepare for Prompt Engineering interviews across all levels.</li>
          <li>Understand technical and conceptual questions recruiters ask.</li>
          <li>Improve structured communication and reasoning under pressure.</li>
          <li>Learn professional PE practices and enterprise expectations.</li>
          <li>Build confidence for AI-related job interviews.</li>
        </ul>
        <Callout tone="info" title="How to use this handbook">
          Each section moves from short recall to deeper reasoning. Read the question, cover the answer, formulate your own response aloud, then compare. Track weak areas in the checklist at the end.
        </Callout>
      </Section>

      <Section id="s1" title="1. Introduction to Prompt Engineering Interviews">
        <p>Prompt Engineering interviews evaluate three axes: (1) mental model of LLMs, (2) practical prompt craft, and (3) systems thinking around evals, safety, cost, and deployment. Rounds typically include a screening call, a technical/whiteboard round, a prompt design exercise, a systems round (RAG/Agents/Eval), and an HR/behavioral round.</p>
        <Figure src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80" caption="Typical Prompt Engineering interview funnel — screening, technical, design, systems, HR." />
        <h3 className="mt-3 font-semibold">What recruiters look for</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Clarity: can you break a fuzzy request into a testable prompt spec?</li>
          <li>Evidence: do you reason with evals, not vibes?</li>
          <li>Safety: do you consider injection, PII, and abstain paths?</li>
          <li>Cost awareness: token budgets, caching, model routing.</li>
          <li>Communication: can you explain trade-offs to non-experts?</li>
        </ul>
      </Section>

      <Section id="s2" title="2. Beginner Interview Questions">
        <p className="text-sm text-muted-foreground">Foundational recall — expected in the first 10 minutes of any screening call.</p>
        <div className="grid gap-3">
          <QA q="What is Prompt Engineering?" hint="Instruction design for LLMs." a="The discipline of designing, iterating, and evaluating natural-language instructions to steer LLM behaviour toward a defined goal, format, and quality bar." follow="How is it different from fine-tuning?" />
          <QA q="Explain zero-shot, one-shot, and few-shot prompting." a="Zero-shot gives only the task; one-shot adds one example; few-shot adds several. Few-shot conditions the model on the desired pattern and typically increases accuracy on narrow tasks." />
          <QA q="What is a system prompt vs a user prompt?" a="System prompts set persistent role, tone, and constraints; user prompts supply task-specific inputs. Well-designed systems keep policy in the system prompt so user text can't override it easily." />
          <QA q="What is temperature?" a="A sampling parameter controlling randomness. Lower = deterministic, higher = creative. Use 0–0.3 for extraction, 0.7–1.0 for ideation." />
          <QA q="What are tokens?" a="Sub-word units the model reads and generates. Cost, context length, and latency scale with tokens, not characters." />
          <QA q="What is a context window?" a="The maximum tokens (input + output) a model can attend to in one call. Exceeding it truncates or errors." />
          <QA q="Why do models hallucinate?" a="They generate the most probable continuation, not verified truth. Missing grounding, ambiguous prompts, or long context can amplify this." />
          <QA q="What are stop sequences?" a="Strings that force the model to end generation, useful for structured output boundaries." />
          <QA q="Define an LLM in one sentence." a="A transformer trained on large text corpora to predict the next token given prior context." />
          <QA q="Name three prompt patterns." a="Role prompting, chain-of-thought, and structured-output (JSON schema)." />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Additional beginner items (40 more) cover: prompt anatomy, delimiters, top-p, top-k, presence/frequency penalties, function calling, tool use basics, prompt caching, streaming, embeddings intuition, cost estimation, safe defaults, refusal styles, tone control, output length control, multi-turn state, memory scope, guard tokens, chat vs completion APIs, model families overview.</p>
      </Section>

      <Section id="s3" title="3. Intermediate Interview Questions">
        <div className="grid gap-3">
          <QA q="When would you prefer few-shot over instruction-only prompting?" a="When the desired output has a specific structure, tone, or domain jargon that is hard to describe in words but easy to demonstrate. Use 3–8 balanced examples covering edge cases." follow="How do you avoid overfitting to your few-shot examples?" />
          <QA q="How do you enforce structured JSON output?" a="Combine an explicit JSON Schema, an example, a strict system instruction, and a validator with one auto-repair retry. Native JSON mode / function calling is preferred when available." />
          <QA q="Explain chain-of-thought and its risks." a="CoT asks the model to reason step-by-step. Improves multi-step tasks but leaks reasoning, increases cost, and can invent plausible but wrong steps. Prefer hidden reasoning + concise answer." />
          <QA q="What is a self-consistency prompt?" a="Sampling multiple reasoning paths at higher temperature, then majority-voting the final answer. Improves math/logic at 3–5× cost." />
          <QA q="What is prompt caching?" a="Reusing prefix computation across calls. Order stable content (system + examples) at the start; variable content last." />
          <QA q="How do you reduce hallucinations?" a="Ground with RAG, require citations, add an abstain clause, use JSON schemas, and gate with an LLM judge." />
          <QA q="Difference between RAG and fine-tuning?" a="RAG injects fresh facts at inference; fine-tuning bakes patterns into weights. RAG for volatile knowledge; fine-tuning for style, format, or narrow domain compression." />
          <QA q="How would you A/B test two prompts?" a="Freeze a golden set with labels, run both prompts, score against rubric metrics (faithfulness, correctness, tone), report deltas with confidence intervals." />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Additional intermediate items (50 more) cover: DSPy signatures, output validators, function-calling contracts, tool routing, guardrails libraries, output parsers, cost/latency budgets, prompt versioning, feature flags, canary rollout, sampling parameters interactions.</p>
      </Section>

      <Section id="s4" title="4. Advanced Interview Questions">
        <div className="grid gap-3">
          <QA q="Design a prompt system that resists prompt injection from tool outputs." a="Use spotlighting (delimit untrusted regions), dual-LLM pattern (privileged planner + quarantined worker), strict output schemas, output content classifiers, and never re-inject raw tool text into the system prompt. Log all violations." follow="Where would you enforce PII redaction?" />
          <QA q="Explain the trade-offs of Reflexion vs single-pass prompting." a="Reflexion runs a critique-and-revise pass, improving quality at ~1.8× cost and latency. Worth it for high-stakes or open-ended tasks; overkill for classification." />
          <QA q="How do you evaluate an open-ended generation task?" a="Combine rubric-based LLM-as-judge, reference-based metrics (BLEU/ROUGE where meaningful), pairwise preference, and human spot-checks. Track inter-rater agreement." />
          <QA q="Design a prompt registry for a team of 12 engineers." a="Versioned prompts, semantic diff, eval score attached to each version, feature-flag deployment, audit log, environment scoping (dev/stage/prod), and rollback in one click." />
          <QA q="How would you handle a 200k-token context without blowing cost?" a="Hierarchical summarisation, semantic chunk retrieval, prompt caching, and offload long-lived context to a summariser model." />
          <QA q="What is DSPy and when would you use it?" a="A framework that compiles prompts against metrics, treating prompts as parameters. Use when you have labelled data and want automatic prompt optimisation." />
        </div>
      </Section>

      <Section id="s5" title="5. Scenario-Based Questions">
        <div className="grid gap-3">
          <QA q="You are asked to build a legal-doc summariser. Users complain the model omits obligations. Walk me through your fix." a="Reframe the task from summarisation to structured extraction — required fields: obligations, deadlines, parties, penalties. Add a JSON schema, few-shot with adversarial contracts, and an eval set curated by a lawyer. Add abstain rule when a field is uncertain." />
          <QA q="A production prompt suddenly regressed after a model provider update. What do you do?" a="Pin the previous model version, run the golden set against the new model, quantify the drop, and either roll forward with a patched prompt (validated by eval) or stay pinned with a migration plan." />
          <QA q="A customer reports the assistant leaked another user's data. What is your response?" a="Contain (disable feature), investigate (trace prompt + retrieval), notify per policy, patch (tenant-scoped retrieval, PII filter, isolation tests), post-mortem, and add regression tests to CI." />
        </div>
      </Section>

      <Section id="s6" title="6. Prompt Design Challenges">
        <p>Whiteboard-style challenges. Interviewers grade your process more than your final wording.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Challenge 1.</strong> Design a prompt that classifies customer emails into 6 categories with confidence + reasoning, JSON only.</li>
          <li><strong>Challenge 2.</strong> Turn a rambling meeting transcript into an action-item list with owners and due dates.</li>
          <li><strong>Challenge 3.</strong> Build a resume-to-JD matcher that outputs a score, top matches, and gaps.</li>
          <li><strong>Challenge 4.</strong> Design a prompt that refuses medical diagnosis while remaining helpful about general information.</li>
          <li><strong>Challenge 5.</strong> Extract structured fields from noisy OCR text.</li>
          <li><strong>Challenge 6.</strong> Convert freeform user goals into a 5-step study plan aligned to their level.</li>
        </ul>
        <Callout tone="tip" title="Scoring rubric interviewers use">
          Clarity of role · explicit constraints · output schema · handling of ambiguity · abstain path · evaluation plan.
        </Callout>
      </Section>

      <Section id="s7" title="7. AI Agent Questions">
        <div className="grid gap-3">
          <QA q="What is an AI agent?" a="An LLM-driven controller that plans, chooses tools, executes, observes results, and iterates until a goal is met or a stop condition triggers." />
          <QA q="How do you prevent infinite tool loops?" a="Set max_steps, budget tokens, deduplicate identical actions, and require the agent to justify each new step against the goal." />
          <QA q="Compare ReAct and Plan-and-Execute." a="ReAct interleaves reasoning and tool calls per step; Plan-and-Execute writes a full plan then executes. ReAct adapts to noise; PE is cheaper and more predictable." />
          <QA q="Design a research agent." a="Planner LLM → search tool → fetch tool → summariser → verifier → writer. Add source-tracking and abstain if fewer than N credible sources found." />
        </div>
      </Section>

      <Section id="s8" title="8. RAG Interview Questions">
        <div className="grid gap-3">
          <QA q="Explain a minimal RAG pipeline." a="Chunk → embed → store in vector DB → retrieve top-k for a query → inject into prompt with grounding instructions → generate." />
          <QA q="How do you improve recall in retrieval?" a="Hybrid search (BM25 + dense), query rewriting, HyDE, multi-query fanout, and cross-encoder reranking." />
          <QA q="What is chunking strategy and how do you tune it?" a="Split by semantic boundaries (headings, paragraphs) with overlap. Tune with a retrieval eval set measuring recall@k." />
          <QA q="How do you cite sources?" a="Return chunk IDs, force the prompt to include them inline, and validate that every claim maps to a cited chunk." />
        </div>
      </Section>

      <Section id="s9" title="9. LLM Evaluation Questions">
        <div className="grid gap-3">
          <QA q="What is LLM-as-judge?" a="Using an LLM to grade another LLM's output against a rubric. Cheap and scalable; watch for judge bias — calibrate with human labels." />
          <QA q="Name three offline evaluation metrics." a="Faithfulness, answer relevance, and format compliance." />
          <QA q="How do you build a golden set?" a="Sample real traffic, dual-label with SMEs, keep it small (100–500) and updated. Track inter-rater agreement." />
          <QA q="Difference between offline and online eval?" a="Offline runs against a fixed dataset pre-deploy; online measures live metrics (CSAT, resolution, abstain rate). Both are required." />
        </div>
      </Section>

      <Section id="s10" title="10. Enterprise AI Questions">
        <div className="grid gap-3">
          <QA q="How do you meet GDPR data residency for an EU tenant?" a="Region-pinned inference endpoints, region-scoped logging, encryption in transit and at rest, DPA with providers, and traceable prompt versions per region." />
          <QA q="Explain observability for LLM apps." a="Trace every prompt, output, tool call, latency, token cost, and eval score. Tools: Langfuse, Arize, Helicone." />
          <QA q="How do you manage cost at scale?" a="Model routing (small→large), prompt caching, prefix ordering, response truncation, and per-tenant token quotas." />
          <QA q="What is red-teaming for LLMs?" a="Structured adversarial testing — injection, jailbreak, PII exfiltration, biased outputs — before rollout and continuously in production." />
        </div>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" caption="Enterprise Prompt Engineering stack — registry, observability, guardrails, evaluation, and rollout." />
      </Section>

      <Section id="s11" title="11. HR & Behavioral Questions">
        <div className="grid gap-3">
          <QA q="Tell me about a prompt you shipped that failed. What did you learn?" a="Use STAR — Situation (what/where), Task (goal), Action (what you did, evals you ran), Result (numeric impact + lesson). Own the failure; show a concrete change to your process afterwards." />
          <QA q="How do you disagree with a stakeholder who insists on a wording change your evals show is worse?" a="Show the evidence, propose an A/B test with pre-defined success criteria, respect the decision if evals converge, and log the outcome for future decisions." />
          <QA q="Why Prompt Engineering as a career?" a="Answer authentically. Common strong themes: leverage of language over code, cross-disciplinary curiosity, rapid iteration culture, real user impact." />
          <QA q="How do you keep learning?" a="Named sources (papers, docs, communities), a weekly experiments habit, and a personal eval harness you own." />
          <QA q="Describe a conflict on your team and how you resolved it." a="STAR framework; emphasise listening, shared goal, and measurable outcome." />
        </div>
      </Section>

      <Section id="s12" title="12. Mock Interview">
        <Callout tone="info" title="60-minute simulated round">
          Round 1 (10 min) intro + motivation · Round 2 (15 min) 6 rapid technicals · Round 3 (20 min) whiteboard prompt design (Challenge 2) · Round 4 (10 min) systems (RAG + eval) · Round 5 (5 min) your questions.
        </Callout>
        <h3 className="mt-3 font-semibold">Sample transcript excerpt</h3>
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`Interviewer: How would you know your prompt is production-ready?
Candidate: Three gates — golden-set eval ≥ target, adversarial suite passing,
           and cost/latency within budget in a canary. I'd also require an owner
           on the rota and an eval CI check in the deploy pipeline.
Interviewer: What if evals pass but users complain?
Candidate: Then evals don't reflect user value — I'd sample complaints,
           expand the golden set with those cases, add rubric dimensions
           (tone, helpfulness), and re-baseline.`}</pre>
      </Section>

      <Section id="s13" title="13. Final Interview Checklist">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Area</th><th className="text-left p-2">Ready?</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">LLM fundamentals (tokens, context, sampling)</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">Prompt patterns (zero/few-shot, CoT, self-consistency)</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">Structured output + validators</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">RAG (chunking, retrieval, reranking, citations)</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">Agents (ReAct, tools, guardrails)</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">Evaluation (golden set, LLM judge, online metrics)</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">Safety (injection, PII, abstain)</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">Cost/latency levers</td><td className="p-2">☐</td></tr>
            <tr className="border-b"><td className="p-2">STAR stories × 3 (win, failure, conflict)</td><td className="p-2">☐</td></tr>
            <tr><td className="p-2">Questions for the interviewer</td><td className="p-2">☐</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="review" title="Interview Review">
        <h3 className="font-semibold">Top 100 must-know question themes</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>What is Prompt Engineering and why does it matter?</li>
          <li>Zero-shot vs few-shot vs chain-of-thought.</li>
          <li>How do you enforce JSON output reliably?</li>
          <li>Explain the anatomy of an effective prompt.</li>
          <li>How to design a prompt eval harness.</li>
          <li>Prompt injection defences.</li>
          <li>PII handling in prompts and logs.</li>
          <li>Abstain / refusal patterns.</li>
          <li>Cost optimisation levers.</li>
          <li>Prompt caching and prefix ordering.</li>
          <li>Prompt versioning and registries.</li>
          <li>Rollout strategies (canary, flags, rollback).</li>
          <li>RAG minimal design and improvements.</li>
          <li>Chunking strategy trade-offs.</li>
          <li>Hybrid retrieval and reranking.</li>
          <li>Query rewriting and HyDE.</li>
          <li>Agent design patterns.</li>
          <li>Tool contract design.</li>
          <li>LLM-as-judge design and pitfalls.</li>
          <li>Offline vs online eval metrics.</li>
        </ol>
        <p className="mt-2 text-xs text-muted-foreground">…the remaining 80 items cover deployment, observability, red-teaming, multimodal prompts, function calling, guardrails, DSPy, evaluations at scale, ethics, and behavioral STAR themes.</p>
        <h3 className="mt-4 font-semibold">Readiness self-rating</h3>
        <p className="text-sm">Score each of the 13 sections 1–5. Any &lt; 3 → revisit before the interview.</p>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Golden set</strong> — curated, labelled examples used as a stable eval benchmark.</li>
          <li><strong>Spotlighting</strong> — delimiting untrusted content so the model treats it as data, not instructions.</li>
          <li><strong>Judge prompt</strong> — an LLM prompt that scores another LLM's output.</li>
          <li><strong>Reflexion</strong> — a critique-and-revise second pass over an initial answer.</li>
          <li><strong>Abstain path</strong> — an explicit "I don't know / escalate" route when confidence is low.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long does it take to prepare?">2–4 focused weeks for someone with 3–6 months of hands-on LLM work; longer if starting from scratch.</FAQItem>
        <FAQItem q="Do I need to code?">Basic Python and API familiarity help, but many PE roles emphasise prompt craft, evals, and product thinking over algorithms.</FAQItem>
        <FAQItem q="Which companies hire pure Prompt Engineers?">Model labs, AI-first startups, and enterprise AI teams inside larger companies. Titles vary — AI Engineer, Applied AI, LLM Engineer.</FAQItem>
        <FAQItem q="Whiteboard or laptop?">Increasingly both — expect a small prompt-writing exercise plus a systems discussion.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from trusted official documentation (OpenAI, Anthropic, Google AI, Microsoft Learn, Hugging Face, LangChain, LangGraph, LlamaIndex), academic publications, research papers, and industry standards. Prompt Engineering techniques, models, APIs, and best practices evolve continuously; readers should consult official documentation for the latest information. All trademarks, product names, and logos belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
