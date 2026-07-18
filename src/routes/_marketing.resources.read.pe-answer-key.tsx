import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-answer-key",
  title: "Prompt Engineering — Answer Key",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "25 min",
  pages: 36,
  lastUpdated: "August 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?w=1800&q=80",
  heroSubtitle:
    "The complete Answer Key for the Prompt Engineering Practice Questions workbook — worked solutions, rubrics, common mistakes, alternative approaches, and self-evaluation guidance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Answer Guide" },
  { id: "s2", label: "2. MCQ Solutions" },
  { id: "s3", label: "3. Short Answer Solutions" },
  { id: "s4", label: "4. Long Answer Solutions" },
  { id: "s5", label: "5. Prompt Evaluation" },
  { id: "s6", label: "6. Scenario Solutions" },
  { id: "s7", label: "7. Rubric" },
  { id: "s8", label: "8. Common Mistakes" },
  { id: "s9", label: "9. Alternative Answers" },
  { id: "s10", label: "10. Final Review" },
  { id: "review", label: "Answer Key Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Practice Questions", tag: "AI & Data", time: "29 min" },
  { title: "Prompt Engineering — Interview Questions", tag: "AI & Data", time: "27 min" },
  { title: "Prompt Engineering — Sample Exercises", tag: "AI & Data", time: "24 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-answer-key")({
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

function Ans({ q, a, why, mistake, alt }: { q: string; a: string; why?: string; mistake?: string; alt?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="text-sm"><strong>Q.</strong> {q}</p>
      <p className="mt-1 text-sm"><strong>Answer.</strong> {a}</p>
      {why && <p className="mt-1 text-xs text-muted-foreground"><strong>Why:</strong> {why}</p>}
      {mistake && <p className="mt-1 text-xs text-muted-foreground"><strong>Common mistake:</strong> {mistake}</p>}
      {alt && <p className="mt-1 text-xs text-muted-foreground"><strong>Alternative:</strong> {alt}</p>}
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Verify learning outcomes from the Practice Questions workbook.</li>
          <li>Understand correct reasoning behind every answer.</li>
          <li>Learn from common misconceptions and alternative approaches.</li>
          <li>Improve conceptual understanding of Prompt Engineering.</li>
          <li>Grade yourself with a transparent rubric.</li>
        </ul>
        <Callout tone="info" title="How to grade">
          Use the rubric in Section 7. Award full marks only when both the answer and the reasoning are correct. Partial credit is defined per question type.
        </Callout>
      </Section>

      <Section id="s1" title="1. Answer Guide">
        <p>This resource pairs one-to-one with <em>Prompt Engineering — Practice Questions</em>. Every question type is graded here — no new practice questions are introduced. Answers are grouped by section and question type. Cross-reference by chapter number.</p>
        <Figure src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80" caption="Evaluation loop — attempt, compare to key, understand reasoning, log mistake, revise." />
      </Section>

      <Section id="s2" title="2. MCQ Solutions">
        <h3 className="font-semibold">Chapter 1 — Fundamentals</h3>
        <div className="grid gap-2">
          <Ans q="Which parameter controls output randomness?" a="(b) temperature" why="Temperature scales the softmax over next-token probabilities; top_k/top_p prune the distribution but temperature is the primary randomness knob." mistake="Choosing top_k — it prunes but does not set randomness." />
          <Ans q="Tokens are:" a="(c) sub-word units" why="Modern tokenizers (BPE, SentencePiece) split on sub-word pieces, so a word may be 1–3 tokens." />
          <Ans q="A context window measures:" a="(b) max tokens per call" mistake="Confusing context window with model parameter count." />
          <Ans q="System prompts are typically:" a="(b) persistent role/policy" />
          <Ans q="Which is NOT a prompt pattern?" a="(c) gradient descent" why="Gradient descent is a training-time optimisation, not a prompt pattern." />
        </div>
        <h3 className="mt-4 font-semibold">Chapter 2 — Prompt Structure</h3>
        <div className="grid gap-2">
          <Ans q="RTCCF stands for:" a="(a) Role, Task, Context, Constraints, Format" />
          <Ans q="Best place for guardrails:" a="(b) system message" why="System messages resist user overrides better than in-line user text." />
        </div>
        <h3 className="mt-4 font-semibold">Chapter 3 — Zero-shot</h3>
        <div className="grid gap-2">
          <Ans q="Zero-shot means:" a="(b) no examples in the prompt" />
          <Ans q="Zero-shot works best when:" a="(b) the task is common and clearly describable" />
        </div>
        <h3 className="mt-4 font-semibold">Chapter 4 — Few-shot</h3>
        <div className="grid gap-2">
          <Ans q="Best few-shot count:" a="(b) 3–8" why="Diminishing returns after ~8 examples; cost and context grow linearly." />
          <Ans q="Few-shot examples should be:" a="(b) balanced across classes and edge cases" />
        </div>
        <h3 className="mt-4 font-semibold">Chapter 7 — Structured Output</h3>
        <div className="grid gap-2">
          <Ans q="Most reliable schema enforcement:" a="(b) JSON schema + validator + retry" />
          <Ans q="Which tool helps schema-compliant output:" a="(a) function calling / JSON mode" />
        </div>
        <h3 className="mt-4 font-semibold">Chapter 9 — AI Safety</h3>
        <div className="grid gap-2">
          <Ans q="Prompt injection is:" a="(b) untrusted content overriding instructions" />
          <Ans q="Spotlighting refers to:" a="(b) delimiting untrusted regions" />
        </div>
        <h3 className="mt-4 font-semibold">Chapter 10 — Agents</h3>
        <div className="grid gap-2">
          <Ans q="ReAct interleaves:" a="(a) reasoning and tool calls" />
          <Ans q="max_steps prevents:" a="(b) infinite loops" />
        </div>
        <h3 className="mt-4 font-semibold">Chapter 11 — RAG</h3>
        <div className="grid gap-2">
          <Ans q="Cross-encoder reranking:" a="(c) reorders retrieved candidates" why="Cross-encoders compute query×doc jointly, more accurate but slower — used only on top-N." />
          <Ans q="Recall@k measures:" a="(b) fraction of relevant docs in top-k" />
        </div>
        <h3 className="mt-4 font-semibold">Final Assessment MCQ (all 25)</h3>
        <p className="text-sm">Answers: 1-b, 2-b, 3-b, 4-b, 5-b, 6-a, 7-b, 8-b, 9-b, 10-b, 11-a, 12-b, 13-b, 14-c, 15-a, 16-b, 17-b, 18-a, 19-b, 20-a, 21-b, 22-c, 23-b, 24-a, 25-b. Detailed reasoning for each is documented in the same order in the printable teacher's edition.</p>
      </Section>

      <Section id="s3" title="3. Short Answer Solutions">
        <div className="grid gap-3">
          <Ans q="Define Prompt Engineering in one sentence." a="The discipline of designing, testing, and iterating natural-language instructions that steer LLM behaviour toward defined goals, formats, and safety bars." mistake="Describing it as 'writing better prompts' — omits evaluation and iteration." />
          <Ans q="Why do LLMs hallucinate?" a="They generate the most probable continuation, not verified truth; missing grounding, ambiguity, and long context amplify this." alt="Also acceptable: they lack world-model of factual correctness and interpolate plausible tokens." />
          <Ans q="Two reasons temperature=0 is preferred for extraction." a="(1) Deterministic output aids testing and caching. (2) Reduces creative substitution of field values." />
          <Ans q="Fill: The unit an LLM processes is a ______." a="token" />
          <Ans q="Fill: Max tokens per call is called ______." a="context window (or context length)" />
          <Ans q="List the five elements of a well-structured prompt." a="Role, Task, Context, Constraints, Format (RTCCF)." />
          <Ans q="Two reasons to specify explicit output format." a="(1) Makes downstream parsing reliable. (2) Prevents prose drift and improves eval scoring." />
          <Ans q="Risk of biased few-shot examples." a="The model over-fits to the pattern shown, propagating class imbalance, stylistic bias, or missing edge cases into every output." />
          <Ans q="When to prefer dynamic few-shot." a="When query diversity is high — retrieve examples similar to the current query for better in-context relevance." />
          <Ans q="Three cost levers without changing model." a="Prompt caching + prefix ordering; shorter outputs (max_tokens, stop sequences); summarised context / truncation." />
          <Ans q="Why prompt caching benefits from prefix ordering." a="Providers hash the leading tokens; stable content at the start yields higher cache-hit rates." />
          <Ans q="When to use self-consistency and its cost." a="For math/logic tasks where diverse reasoning helps; costs 3–5× tokens and latency." />
          <Ans q="Three defences against indirect prompt injection." a="Spotlighting untrusted regions, dual-LLM privilege split, output content classifier and structured output schema." />
          <Ans q="What is an abstain path and why is it a safety feature?" a="An explicit low-confidence route that returns 'I don't know' or escalates — prevents confident hallucinations in high-stakes flows." />
          <Ans q="Explain HyDE." a="Hypothetical Document Embeddings — the model drafts an ideal answer, embeds it, and uses that embedding for retrieval — closes the query/document style gap." />
          <Ans q="Two tuning levers for chunk size." a="Semantic boundaries (heading-aware split) and overlap size (10–20% typical)." />
        </div>
      </Section>

      <Section id="s4" title="4. Long Answer Solutions">
        <h3 className="font-semibold">Q. Design a context strategy for a 500-page policy document.</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Heading-aware chunking (~500 tokens, 15% overlap), preserve section IDs.</li>
          <li>Embed with a strong retrieval model; store in a vector DB with metadata (section, version, effective_date).</li>
          <li>Query rewrite + hybrid search (BM25 + dense) → cross-encoder rerank → top-5.</li>
          <li>Inject retrieved chunks with source IDs; force citations in output.</li>
          <li>Add running summary for multi-turn chats; cap total context.</li>
          <li>Eval with a 100-question policy golden set; measure faithfulness + citation accuracy.</li>
        </ol>
        <h3 className="mt-4 font-semibold">Q. Design an agent that books flights end-to-end.</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><strong>Tools:</strong> search_flights, hold_seat, price_check, confirm_booking, notify_user.</li>
          <li><strong>Safety:</strong> max_steps=8, budget cap, human confirmation before any payment, PII redaction in logs.</li>
          <li><strong>Failure modes:</strong> stale price, inventory race, injection via itinerary text — handled by revalidation before confirm, idempotency keys, spotlighting.</li>
          <li><strong>Observability:</strong> full trace of plan/action/observation, cost per booking, refund path.</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Prompt Evaluation">
        <p>Every prompt-writing task is graded on the following dimensions:</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Dimension</th><th className="text-left p-2">Weight</th><th className="text-left p-2">What excellent looks like</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Clarity of role/task</td><td className="p-2">15%</td><td className="p-2">Unambiguous, scoped, testable.</td></tr>
            <tr className="border-b"><td className="p-2">Constraints / policy</td><td className="p-2">15%</td><td className="p-2">Explicit refusal & scope rules.</td></tr>
            <tr className="border-b"><td className="p-2">Output format</td><td className="p-2">20%</td><td className="p-2">Schema + example provided.</td></tr>
            <tr className="border-b"><td className="p-2">Grounding / retrieval</td><td className="p-2">15%</td><td className="p-2">Sources named, citations required.</td></tr>
            <tr className="border-b"><td className="p-2">Abstain path</td><td className="p-2">10%</td><td className="p-2">Defined low-confidence route.</td></tr>
            <tr className="border-b"><td className="p-2">Safety / injection defence</td><td className="p-2">15%</td><td className="p-2">Spotlighting + validators.</td></tr>
            <tr><td className="p-2">Evaluation plan</td><td className="p-2">10%</td><td className="p-2">Named metric on a golden set.</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80" caption="Prompt evaluation flow — inputs, prompt, output, judge/rubric, score, iteration." />
      </Section>

      <Section id="s6" title="6. Scenario Solutions">
        <h3 className="font-semibold">Support bot leaks another user's data</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Contain — disable the affected feature via feature flag.</li>
          <li>Investigate — trace the offending prompt, retrieval, and tenant scope.</li>
          <li>Notify per policy — legal/privacy officer, affected users, regulators as required.</li>
          <li>Patch — enforce tenant-scoped retrieval, PII scrub on inputs, isolation tests in CI.</li>
          <li>Post-mortem — root cause, timeline, actions, owner, deadline.</li>
        </ol>
        <h3 className="mt-4 font-semibold">Prompt regressed after model update</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Pin previous model version to stop bleeding.</li>
          <li>Run golden set on new model, quantify per-metric drop.</li>
          <li>Diagnose — style, verbosity, safety refusal changes are common.</li>
          <li>Patch prompt (constraints, format, examples) and re-eval; ship only if it passes the gate.</li>
        </ol>
        <h3 className="mt-4 font-semibold">Cost is 2× budget</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Measure — top 20% callers, top prompts, largest outputs.</li>
          <li>Enable prompt caching + reorder prefix.</li>
          <li>Cap output length; add stop sequences.</li>
          <li>Route easy cases to a small model.</li>
          <li>Retrieval-side: reduce top-k, tighter chunks.</li>
          <li>Re-run evals to confirm no quality regression.</li>
        </ol>
      </Section>

      <Section id="s7" title="7. Rubric">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Question type</th><th className="text-left p-2">Full marks</th><th className="text-left p-2">Partial marks</th><th className="text-left p-2">Zero</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">MCQ</td><td className="p-2">Correct option</td><td className="p-2">—</td><td className="p-2">Wrong or blank</td></tr>
            <tr className="border-b"><td className="p-2">True/False</td><td className="p-2">Correct</td><td className="p-2">—</td><td className="p-2">Wrong or blank</td></tr>
            <tr className="border-b"><td className="p-2">Fill in the blanks</td><td className="p-2">Exact concept</td><td className="p-2">Near synonym (0.5)</td><td className="p-2">Wrong concept</td></tr>
            <tr className="border-b"><td className="p-2">Short answer</td><td className="p-2">Correct + reasoning</td><td className="p-2">Correct without reasoning (0.5)</td><td className="p-2">Wrong or missing</td></tr>
            <tr className="border-b"><td className="p-2">Long answer</td><td className="p-2">All 4 sub-points</td><td className="p-2">2–3 sub-points (0.5×)</td><td className="p-2">≤ 1 sub-point</td></tr>
            <tr><td className="p-2">Prompt-writing</td><td className="p-2">≥ 85% on rubric weights</td><td className="p-2">60–84% (0.5×)</td><td className="p-2">&lt; 60%</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s8" title="8. Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Confusing top_k / top_p / temperature — all three shape sampling but only temperature is the randomness dial.</li>
          <li>Writing polite requests instead of structured schemas for JSON output.</li>
          <li>Treating chain-of-thought as always-on; it costs tokens and can leak reasoning.</li>
          <li>Overloading a single prompt — mix of extraction, summarisation, and reasoning in one step.</li>
          <li>No abstain rule — model confidently hallucinates in low-confidence cases.</li>
          <li>Skipping spotlighting when injecting tool output or user files.</li>
          <li>Not versioning prompts — impossible to attribute regressions.</li>
          <li>Judging with an untuned LLM-judge — bias toward long or its own style.</li>
          <li>Chunking blindly by fixed length — breaks semantic boundaries.</li>
          <li>Reasoning about cost without measuring — always start with token/cost traces.</li>
        </ul>
      </Section>

      <Section id="s9" title="9. Alternative Answers">
        <p>Several practice questions admit more than one acceptable answer. Grade generously when the reasoning is sound.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Cost levers:</strong> caching, output cap, model routing, retrieval slimming, structured output all valid.</li>
          <li><strong>Injection defences:</strong> spotlighting, dual-LLM, allow-list tools, output classifier, escape sequences — any three qualify.</li>
          <li><strong>Improving retrieval:</strong> hybrid search, HyDE, query rewriting, reranking, better chunking — any two qualify.</li>
          <li><strong>Structured output enforcement:</strong> JSON mode, function calling, schema + validator + retry, constrained decoding.</li>
          <li><strong>Role prompt for analyst:</strong> multiple wordings acceptable if they cover expertise, tone, evidence, and refusal policy.</li>
        </ul>
      </Section>

      <Section id="s10" title="10. Final Review">
        <h3 className="font-semibold">Final Assessment expected scores</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Beginner reader: 55–70%. Focus on Fundamentals + Structure + Safety.</li>
          <li>Practitioner (3–6 months): 70–85%. Focus on Optimisation + RAG + Agents.</li>
          <li>Advanced: 85%+. Focus on Evaluation + Enterprise + Alternatives.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Instructor notes</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Weight prompt-writing tasks 2× a plain short-answer when reporting a course grade.</li>
          <li>For classroom use, sample 25 MCQs + 3 prompt-writing tasks + 1 scenario.</li>
          <li>Track class-wide weak dimensions on the rubric heatmap.</li>
        </ul>
      </Section>

      <Section id="review" title="Answer Key Review">
        <h3 className="font-semibold">Final revision</h3>
        <p>Revisit any topic where you scored below 60% using: Beginner Guide → PDF Notes → Cheat Sheet, then re-test with the Practice Questions resource.</p>
        <h3 className="mt-3 font-semibold">Scoring guide</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Total score</th><th className="text-left p-2">Interpretation</th><th className="text-left p-2">Next step</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">≥ 85%</td><td className="p-2">Job-ready fundamentals</td><td className="p-2">Move to Interview Questions</td></tr>
            <tr className="border-b"><td className="p-2">70–84%</td><td className="p-2">Solid</td><td className="p-2">Weak-topic drill for 1 week</td></tr>
            <tr className="border-b"><td className="p-2">50–69%</td><td className="p-2">Gaps present</td><td className="p-2">Restudy 3 weakest chapters</td></tr>
            <tr><td className="p-2">&lt; 50%</td><td className="p-2">Foundational gap</td><td className="p-2">Restart with Beginner Guide</td></tr>
          </tbody>
        </table>
        <h3 className="mt-3 font-semibold">Performance analysis</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Compare per-chapter scores to spot topic clusters (e.g. RAG + Agents often correlated).</li>
          <li>Track improvement over three retakes; expect +8–15% per pass with targeted study.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Improvement recommendations</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Read one prompt paper per week (arXiv AI category).</li>
          <li>Ship one prompt to a small eval set per week — measure, iterate, log.</li>
          <li>Rewrite one weak prompt from your own work using RTCCF.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Rubric</strong> — weighted evaluation criteria used to grade open-ended answers.</li>
          <li><strong>Partial credit</strong> — fractional marks for partially correct or partially reasoned answers.</li>
          <li><strong>Faithfulness</strong> — degree to which output claims match provided sources.</li>
          <li><strong>Regression gate</strong> — CI check that blocks deploy if eval score drops.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Are these the only correct answers?">No — Section 9 lists common alternatives. Grade on reasoning, not wording.</FAQItem>
        <FAQItem q="How strict should I be with prompt-writing tasks?">Use the rubric weights. Award full marks only when every high-weight dimension is present.</FAQItem>
        <FAQItem q="Where should I go after scoring well?">Proceed to the Prompt Engineering — Interview Questions resource.</FAQItem>
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
