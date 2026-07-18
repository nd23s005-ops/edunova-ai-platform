import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-practice-questions",
  title: "Prompt Engineering — Practice Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "29 min",
  pages: 38,
  lastUpdated: "May 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  heroSubtitle:
    "A structured practice workbook — 300+ questions across MCQs, true/false, fill-in-the-blanks, short & long answers, scenarios, and prompt-writing tasks, arranged by concept and difficulty.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "how", label: "How to Use This Workbook" },
  { id: "s1", label: "1. Fundamentals" },
  { id: "s2", label: "2. Prompt Structure" },
  { id: "s3", label: "3. Zero-shot Questions" },
  { id: "s4", label: "4. Few-shot Questions" },
  { id: "s5", label: "5. Role Prompting" },
  { id: "s6", label: "6. Context Engineering" },
  { id: "s7", label: "7. Structured Output" },
  { id: "s8", label: "8. Prompt Optimization" },
  { id: "s9", label: "9. AI Safety" },
  { id: "s10", label: "10. AI Agents" },
  { id: "s11", label: "11. RAG" },
  { id: "s12", label: "12. Mixed Practice Set" },
  { id: "s13", label: "13. Final Assessment" },
  { id: "review", label: "Practice Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Answer Key", tag: "AI & Data", time: "25 min" },
  { title: "Prompt Engineering — Interview Questions", tag: "AI & Data", time: "27 min" },
  { title: "Prompt Engineering — Sample Exercises", tag: "AI & Data", time: "24 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-practice-questions")({
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

function QSet({ title, level, items }: { title: string; level: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-muted-foreground">{level}</span>
      </div>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
        {items.map((q, i) => <li key={i}>{q}</li>)}
      </ol>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Practice Prompt Engineering concepts systematically.</li>
          <li>Strengthen prompt-writing and optimisation skills.</li>
          <li>Build confidence solving AI problems.</li>
          <li>Prepare for assessments and interviews.</li>
          <li>Track weak spots and target them for revision.</li>
        </ul>
      </Section>

      <Section id="how" title="How to Use This Workbook">
        <p>Attempt each set in one sitting. Time yourself for the Final Assessment. Log scores in the <em>Practice Review</em> section. Complete answers, rubrics, and explanations live in the companion <strong>Prompt Engineering — Answer Key</strong> resource — attempt every question before opening it.</p>
        <Callout tone="tip" title="Difficulty legend">
          ★ Beginner recall · ★★ Applied understanding · ★★★ Analysis / design · ★★★★ Open scenario.
        </Callout>
      </Section>

      <Section id="s1" title="1. Fundamentals">
        <QSet title="MCQ · Fundamentals" level="★" items={[
          "Which parameter most directly controls output randomness? (a) top_k (b) temperature (c) frequency_penalty (d) stop.",
          "Tokens are: (a) characters (b) whole words (c) sub-word units (d) sentences.",
          "A context window measures: (a) latency (b) max tokens per call (c) model parameters (d) API rate.",
          "System prompts are typically: (a) editable by end users (b) persistent role/policy (c) response text (d) tool outputs.",
          "Which is NOT a prompt pattern? (a) role prompting (b) chain-of-thought (c) gradient descent (d) few-shot.",
        ]} />
        <QSet title="True / False" level="★" items={[
          "T/F — Higher temperature always improves creativity without downsides.",
          "T/F — Prompt caching reuses prefix computation across calls.",
          "T/F — Stop sequences increase output length.",
          "T/F — Deterministic outputs require temperature = 0 and fixed seed where available.",
        ]} />
        <QSet title="Fill in the Blanks" level="★" items={[
          "The unit an LLM processes is a ______.",
          "The maximum tokens per call is called the ______.",
          "Instructions setting persistent behaviour go in the ______ prompt.",
          "Sampling a subset of top probabilities is called ______ sampling.",
        ]} />
        <QSet title="Short Answer" level="★★" items={[
          "In one sentence, define Prompt Engineering.",
          "Why do LLMs hallucinate?",
          "State two reasons temperature=0 is preferred for extraction.",
        ]} />
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" caption="Prompt workflow — instruction, context, examples, output specification, and evaluation." />
      </Section>

      <Section id="s2" title="2. Prompt Structure">
        <QSet title="MCQ" level="★" items={[
          "The RTCCF prompt anatomy stands for: (a) Role, Task, Context, Constraints, Format (b) Read, Think, Cache, Check, Fix (c) Retrieve, Truncate, Chunk, Cite, Format (d) None.",
          "Which part is best for guardrails? (a) user message (b) system message (c) few-shot examples (d) stop sequences.",
        ]} />
        <QSet title="Fill in the Blanks" level="★" items={[
          "Delimit untrusted user text using ______ or XML tags.",
          "Place stable content ______ (early / late) in the prompt to maximise prompt-cache hits.",
        ]} />
        <QSet title="Short Answer" level="★★" items={[
          "List the five elements of a well-structured prompt in order.",
          "Give two reasons to specify an explicit output format.",
        ]} />
        <QSet title="Prompt-writing task" level="★★" items={[
          "Rewrite this weak prompt into a structured one: \"Tell me about our return policy.\" Assume you are an e-commerce assistant with a knowledge-base tool.",
        ]} />
      </Section>

      <Section id="s3" title="3. Zero-shot Questions">
        <QSet title="MCQ" level="★" items={[
          "Zero-shot means: (a) no training data (b) no examples in the prompt (c) no system prompt (d) no output.",
          "Zero-shot works best when: (a) the task is highly domain-specific (b) the task is common and clearly describable (c) format is unusual (d) tone is critical.",
        ]} />
        <QSet title="Scenario" level="★★★" items={[
          "You must classify support tickets into 5 categories, launch by tomorrow, no labelled data. Write a zero-shot prompt and describe how you'd sanity-check it.",
          "Zero-shot summary quality is inconsistent for long articles. Give two prompt-level fixes before adding examples.",
        ]} />
      </Section>

      <Section id="s4" title="4. Few-shot Questions">
        <QSet title="MCQ" level="★★" items={[
          "Best number of few-shot examples usually falls between: (a) 1–2 (b) 3–8 (c) 20–30 (d) 100+.",
          "Few-shot examples should be: (a) all easy cases (b) balanced across classes and edge cases (c) copied from training data (d) random.",
        ]} />
        <QSet title="Short Answer" level="★★" items={[
          "Explain the risk of biased few-shot examples.",
          "When would you prefer dynamic few-shot (retrieved per query) over static few-shot?",
        ]} />
        <QSet title="Prompt-writing task" level="★★★" items={[
          "Design a 5-example few-shot prompt to convert plain English requirements into JIRA-style user stories.",
        ]} />
      </Section>

      <Section id="s5" title="5. Role Prompting">
        <QSet title="Fill in the Blanks" level="★" items={[
          "Role prompting sets the ______ and ______ of the response.",
          "Overly narrow roles can cause the model to ______ helpful information.",
        ]} />
        <QSet title="Short Answer" level="★★" items={[
          "Give two examples of effective role prompts and two ineffective ones. Explain the difference.",
        ]} />
        <QSet title="Prompt-writing task" level="★★" items={[
          "Write a role prompt that turns the assistant into a Senior Data Analyst focused on clear, evidence-based answers with citations.",
        ]} />
      </Section>

      <Section id="s6" title="6. Context Engineering">
        <QSet title="MCQ" level="★★" items={[
          "Which is a symptom of context bloat? (a) lower cost (b) faster response (c) degraded accuracy on long inputs (d) larger vocabulary.",
          "Sliding-window summarisation is best for: (a) short prompts (b) unlimited memory (c) long transcripts within token limits (d) code generation.",
        ]} />
        <QSet title="Long Answer" level="★★★" items={[
          "You have a 500-page policy document users will chat about. Design a context strategy including chunking, retrieval, summarisation, and citation.",
        ]} />
      </Section>

      <Section id="s7" title="7. Structured Output">
        <QSet title="MCQ" level="★★" items={[
          "The most reliable way to enforce a schema is: (a) polite request (b) JSON schema + validator + retry (c) hoping (d) higher temperature.",
          "Which tool is helpful for schema-compliant output? (a) function calling / JSON mode (b) temperature=1 (c) stop=null (d) top_k=1.",
        ]} />
        <QSet title="Prompt-writing task" level="★★★" items={[
          "Design a prompt that extracts { name, email, phone, intent, urgency } from a customer email as JSON. Include an abstain rule when a field is missing.",
        ]} />
      </Section>

      <Section id="s8" title="8. Prompt Optimization">
        <QSet title="Short Answer" level="★★" items={[
          "List three levers to reduce cost without changing model.",
          "Explain why prompt caching benefits from prefix ordering.",
          "When would you use self-consistency and what does it cost?",
        ]} />
        <QSet title="Scenario" level="★★★" items={[
          "A prompt is 2× over latency budget. Walk through your optimisation checklist.",
        ]} />
      </Section>

      <Section id="s9" title="9. AI Safety">
        <QSet title="MCQ" level="★★" items={[
          "Prompt injection is: (a) using SQL in a prompt (b) untrusted content overriding instructions (c) sending too many tokens (d) using non-English characters.",
          "Spotlighting refers to: (a) highlighting UI elements (b) delimiting untrusted regions (c) using bold text (d) rate limiting.",
        ]} />
        <QSet title="Short Answer" level="★★★" items={[
          "Describe three defences against indirect prompt injection from tool outputs.",
          "What is an abstain path and why is it a safety feature?",
        ]} />
        <Figure src="https://images.unsplash.com/photo-1526378787940-576a539ba69d?w=1600&q=80" caption="Prompt evaluation loop — write, test against golden set, review, iterate, ship." />
      </Section>

      <Section id="s10" title="10. AI Agents">
        <QSet title="MCQ" level="★★" items={[
          "ReAct interleaves: (a) reasoning and tool calls (b) retrieval and embeddings (c) prompt and completion (d) test and deploy.",
          "A max_steps limit prevents: (a) hallucinations (b) infinite loops (c) tool errors (d) token counting.",
        ]} />
        <QSet title="Long Answer" level="★★★★" items={[
          "Design an agent that books flights end-to-end. List tools, safety controls, and failure modes.",
        ]} />
      </Section>

      <Section id="s11" title="11. RAG">
        <QSet title="MCQ" level="★★" items={[
          "Cross-encoder reranking is used to: (a) chunk documents (b) generate embeddings (c) reorder retrieved candidates (d) filter tokens.",
          "Recall@k measures: (a) precision (b) fraction of relevant docs in top-k (c) latency (d) cost.",
        ]} />
        <QSet title="Short Answer" level="★★" items={[
          "Explain HyDE and why it can improve retrieval.",
          "State two tuning levers for chunk size.",
        ]} />
        <QSet title="Scenario" level="★★★" items={[
          "Users report the assistant cites the wrong policy version. Diagnose likely causes and propose fixes.",
        ]} />
      </Section>

      <Section id="s12" title="12. Mixed Practice Set">
        <QSet title="Rapid recall (60 items — sample)" level="★–★★" items={[
          "What is temperature? What is top_p? What is a stop sequence?",
          "Name three defences against prompt injection.",
          "Give three offline eval metrics.",
          "Describe function calling in one sentence.",
          "When would you fine-tune instead of prompt?",
          "Explain grounded generation.",
          "What is a golden set?",
          "Explain LLM-as-judge in one sentence.",
          "State a common cause of JSON drift.",
          "Name three tools for LLM observability.",
        ]} />
        <QSet title="Scenario mix" level="★★★" items={[
          "The support bot leaks another user's data. What is your response plan?",
          "A prompt regresses after a model update. Diagnose and remediate.",
          "Cost is 2× budget. Cut it without breaking evals.",
        ]} />
      </Section>

      <Section id="s13" title="13. Final Assessment">
        <Callout tone="info" title="Timed self-test — 90 minutes">
          25 MCQ (30m) · 10 short answer (20m) · 3 prompt-writing tasks (30m) · 1 scenario write-up (10m). Pass mark 70%. Grade against the Answer Key resource.
        </Callout>
        <QSet title="Final MCQ (10 of 25 shown)" level="★★" items={[
          "Which pattern reduces hallucinations most in factual QA? (a) higher temperature (b) grounded RAG with citations (c) longer prompts (d) role prompting.",
          "The single biggest lever for cost in a stable prompt is often: (a) new model (b) prompt caching + prefix order (c) top_p tuning (d) longer stop sequences.",
          "Self-consistency requires: (a) low temperature (b) multiple samples + vote (c) fine-tuning (d) tool calling.",
          "An abstain rule improves: (a) recall (b) precision and safety (c) throughput (d) latency only.",
          "Best schema enforcement combines: (a) polite instructions (b) schema + validator + one retry (c) temperature=1 (d) chain-of-thought.",
          "In hybrid search you combine: (a) BM25 + dense embeddings (b) BM25 + TF-IDF (c) dense + fine-tuning (d) reranker + tools.",
          "LLM-as-judge is biased toward: (a) shorter answers (b) longer answers and its own style (c) numbers (d) neutral tone.",
          "Function calling is primarily used for: (a) style transfer (b) structured tool invocation (c) fine-tuning (d) embeddings.",
          "Golden sets should be: (a) huge and noisy (b) small, curated, dual-labelled (c) synthetic only (d) rotated weekly.",
          "Region-pinned inference addresses: (a) latency only (b) data residency compliance (c) fine-tuning (d) tokenizer version.",
        ]} />
        <QSet title="Final prompt-writing tasks" level="★★★" items={[
          "Design a support-ticket classifier prompt with JSON output, confidence, and abstain rule.",
          "Design a research-agent planner prompt with 3 tools and stop conditions.",
          "Design a rubric-based LLM-judge prompt to score customer replies on tone, correctness, safety.",
        ]} />
      </Section>

      <Section id="review" title="Practice Review">
        <h3 className="font-semibold">Chapter-wise scorecard</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Chapter</th><th className="text-left p-2">Score / Max</th><th className="text-left p-2">Weakness</th><th className="text-left p-2">Action</th></tr></thead>
          <tbody>
            {["Fundamentals","Prompt Structure","Zero-shot","Few-shot","Role Prompting","Context Engineering","Structured Output","Prompt Optimization","AI Safety","AI Agents","RAG","Mixed","Final Assessment"].map(row => (
              <tr key={row} className="border-b"><td className="p-2">{row}</td><td className="p-2">___ / ___</td><td className="p-2">_____</td><td className="p-2">_____</td></tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-4 font-semibold">Performance tracker</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>&lt; 50% — restudy the corresponding chapter in Beginner Guide + PDF Notes.</li>
          <li>50–74% — redo the chapter's questions after 3 days (spaced recall).</li>
          <li>≥ 75% — proceed; retest weakest topic weekly.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Revision recommendations</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Weak on Prompt Optimization → Cheat Sheet + Complete Tutorial Ch. 12.</li>
          <li>Weak on Safety → Advanced Concepts (injection) + Reference Guide.</li>
          <li>Weak on RAG → Learning Roadmap Week 6 + Sample Exercises.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Rubric</strong> — a scoring guide with explicit criteria.</li>
          <li><strong>Golden set</strong> — a stable, labelled benchmark dataset.</li>
          <li><strong>Abstain path</strong> — an explicit refusal route when confidence is low.</li>
          <li><strong>Prompt-cache</strong> — reused prefix computation between calls.</li>
          <li><strong>HyDE</strong> — hypothetical-document embedding retrieval.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Where are the answers?">In the companion resource: Prompt Engineering — Answer Key.</FAQItem>
        <FAQItem q="Can I skip chapters?">Only if you scored ≥ 75% on that chapter in a previous pass.</FAQItem>
        <FAQItem q="How long should the Final Assessment take?">Target 90 minutes untimed practice, 75 minutes under exam conditions.</FAQItem>
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
