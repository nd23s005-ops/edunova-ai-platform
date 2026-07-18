import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-common-mistakes",
  title: "Prompt Engineering — Common Mistakes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 16,
  lastUpdated: "February 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1800&q=80",
  heroSubtitle:
    "100+ common Prompt Engineering mistakes — with root causes, warning signs, before/after examples, debugging tips, and prevention strategies for beginners through advanced practitioners.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Beginner Mistakes" },
  { id: "s2", label: "2. Context Errors" },
  { id: "s3", label: "3. Instruction Problems" },
  { id: "s4", label: "4. Prompt Structure Mistakes" },
  { id: "s5", label: "5. Token Usage Issues" },
  { id: "s6", label: "6. Hallucination Problems" },
  { id: "s7", label: "7. AI Safety Mistakes" },
  { id: "s8", label: "8. Evaluation Mistakes" },
  { id: "s9", label: "9. Production Mistakes" },
  { id: "s10", label: "10. Prevention Strategies" },
  { id: "review", label: "Common Mistakes Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Best Practices", tag: "AI & Data", time: "13 min" },
  { title: "Prompt Engineering — Real-world Case Study", tag: "AI & Data", time: "23 min" },
  { title: "Prompt Engineering — Beginner Guide", tag: "AI & Data", time: "22 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-common-mistakes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { property: "og:url", content: "/resources/read/pe-common-mistakes" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/pe-common-mistakes" }],
  }),
  component: Page,
});

function Mistake({ n, title, cause, sign, fix, prevent, before, after }: { n: number; title: string; cause: string; sign: string; fix: string; prevent: string; before?: string; after?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="text-sm font-semibold">#{n} · {title}</p>
      <p className="mt-1 text-xs text-muted-foreground"><strong>Root cause:</strong> {cause}</p>
      <p className="mt-1 text-xs text-muted-foreground"><strong>Warning sign:</strong> {sign}</p>
      <p className="mt-1 text-sm"><strong>Fix:</strong> {fix}</p>
      <p className="mt-1 text-xs text-muted-foreground"><strong>Prevention:</strong> {prevent}</p>
      {before && (
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <pre className="rounded-md bg-muted p-2 text-xs overflow-x-auto"><strong>Before:</strong> {before}</pre>
          <pre className="rounded-md bg-muted p-2 text-xs overflow-x-auto"><strong>After:</strong> {after}</pre>
        </div>
      )}
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Recognise the mistakes that cost teams the most time.</li>
          <li>Understand root causes, not just symptoms.</li>
          <li>Debug failing prompts systematically.</li>
          <li>Prevent repeat failures with named habits.</li>
          <li>Build professional prompting reflexes.</li>
        </ul>
        <Callout tone="tip" title="How to read this guide">
          Skim once for pattern recognition, then re-read the sections that match your current project. Note any mistake you've made before — that's your revision list.
        </Callout>
      </Section>

      <Section id="s1" title="1. Beginner Mistakes">
        <div className="grid gap-3">
          <Mistake n={1} title="Vague instructions" cause="Assuming the model shares your context." sign="Answers drift or ask for clarification." fix="Add role, task, constraints, and output format." prevent="Use the RTCCF checklist." before="Summarise this." after="You are a technical writer. Summarise the article below in exactly 3 bullet points, plain English, under 50 words." />
          <Mistake n={2} title="No output format specified" cause="Trusting prose defaults." sign="Downstream code breaks parsing." fix="Provide a JSON schema and one example." prevent="Every production prompt has a schema." />
          <Mistake n={3} title="Politeness instead of specification" cause="Treating the model like a colleague." sign="Inconsistent output shape." fix="Replace 'please' with concrete rules." prevent="Read the prompt aloud — does it read like a spec?" />
          <Mistake n={4} title="Mixing tasks in one prompt" cause="Trying to save calls." sign="Fields missing; steps swallowed." fix="Split into stages (extract → summarise → format)." prevent="One prompt, one job." />
          <Mistake n={5} title="Random temperature choices" cause="Defaults never questioned." sign="Extraction fields shift; classification wobbles." fix="Temperature 0–0.3 for extraction; 0.7+ for ideation." prevent="Set + document temperature per prompt." />
          <Mistake n={6} title="Copy-pasting examples verbatim" cause="Copying without adapting." sign="Model repeats example values." fix="Vary example inputs and outputs." prevent="Rotate examples per launch." />
          <Mistake n={7} title="Overlong system prompts" cause="Adding rules over time." sign="Cost creep; model ignores middle instructions." fix="Refactor into a tight system prompt with linked policy doc." prevent="Set a max-token budget per prompt." />
          <Mistake n={8} title="No refusal policy" cause="Optimism." sign="Model answers out-of-scope questions confidently." fix="Explicit refusal criteria and phrasing." prevent="Add refusal test cases to golden set." />
        </div>
      </Section>

      <Section id="s2" title="2. Context Errors">
        <div className="grid gap-3">
          <Mistake n={9} title="Dumping the entire document" cause="Big context feels safer." sign="Latency + cost spike; middle-of-context ignored." fix="Retrieve top-N relevant chunks." prevent="Instrument context-token usage." />
          <Mistake n={10} title="Losing conversation history" cause="Truncating from the wrong end." sign="Model forgets recent commitments." fix="Keep last-N turns + running summary." prevent="Explicit history-management policy." />
          <Mistake n={11} title="No delimiters around user text" cause="Trusting the input." sign="Prompt injection succeeds." fix="Wrap user content in XML tags with spotlight instructions." prevent="Adversarial test suite." />
          <Mistake n={12} title="Re-injecting tool output into system prompt" cause="Confusing data with instructions." sign="Model follows attacker-controlled directions." fix="Keep tool output in the user turn, delimited and labelled." prevent="Never mutate the system prompt at runtime." />
          <Mistake n={13} title="Stale context" cause="Cached retrieval." sign="Cited policy no longer exists." fix="Version documents and invalidate cache on change." prevent="Add doc-version metadata to citations." />
        </div>
        <Figure src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=1600&q=80" caption="Prompt optimisation flow — measure, isolate, fix, re-evaluate, ship." />
      </Section>

      <Section id="s3" title="3. Instruction Problems">
        <div className="grid gap-3">
          <Mistake n={14} title="Contradictory instructions" cause="Rules added without review." sign="Model picks arbitrarily; output flip-flops." fix="Read prompt end-to-end; remove contradictions." prevent="Peer review before deploy." />
          <Mistake n={15} title="Negative-only instructions" cause="Listing what not to do without positives." sign="Model over-refuses or produces empty output." fix="Pair every 'do not X' with 'instead do Y'." prevent="Positive + negative examples in few-shot." />
          <Mistake n={16} title="Ambiguous quantifiers" cause="Words like 'a few', 'concise', 'briefly'." sign="Output length varies wildly." fix="Use numbers ('exactly 3 bullets', 'under 80 words')." prevent="Quantify every constraint." />
          <Mistake n={17} title="Role that suppresses helpfulness" cause="Over-narrow persona." sign="Model refuses legitimate follow-ups." fix="Broaden role or add explicit scope-expansion clause." prevent="Test edge cases in golden set." />
          <Mistake n={18} title="Encoded style instructions" cause="Style buried under task." sign="Tone regresses across turns." fix="Put style rules in a dedicated section." prevent="Section headers in the system prompt." />
        </div>
      </Section>

      <Section id="s4" title="4. Prompt Structure Mistakes">
        <div className="grid gap-3">
          <Mistake n={19} title="Instructions after the data" cause="Copy-paste order." sign="Model summarises data instead of following instructions." fix="Put instructions before data; restate at the end for long contexts." prevent="RTCCF ordering." />
          <Mistake n={20} title="Unstable prefix breaks caching" cause="Interpolating dynamic values into the system prompt." sign="High per-call cost." fix="Move dynamic values to the user message." prevent="Prompt-cache-first design." />
          <Mistake n={21} title="Missing example counter-cases" cause="Only 'happy path' examples." sign="Model fails ambiguous inputs." fix="Add adversarial and edge-case examples." prevent="Balanced few-shot bank." />
          <Mistake n={22} title="No stop condition" cause="Assuming the model self-terminates." sign="Rambling; runaway output." fix="Set max_tokens + stop sequences." prevent="Cap output length in the schema." />
        </div>
      </Section>

      <Section id="s5" title="5. Token Usage Issues">
        <div className="grid gap-3">
          <Mistake n={23} title="Repeated system-prompt boilerplate" cause="Copy-paste across features." sign="Cost creep with no accuracy gain." fix="Extract shared blocks into templates." prevent="Prompt library." />
          <Mistake n={24} title="Ignoring the middle-of-context problem" cause="Assuming linear attention." sign="Facts in the middle of a long context get dropped." fix="Move critical info to start and end." prevent="Context-position tests." />
          <Mistake n={25} title="Sending PDFs verbatim" cause="Skipping preprocessing." sign="Tokens explode; retrieval accuracy drops." fix="Extract text, chunk semantically, embed." prevent="Data-prep pipeline." />
          <Mistake n={26} title="Loose output length" cause="No length instructions." sign="Cost variance across requests." fix="Set explicit length caps by field." prevent="Schema enforces length." />
        </div>
      </Section>

      <Section id="s6" title="6. Hallucination Problems">
        <div className="grid gap-3">
          <Mistake n={27} title="No grounding for factual answers" cause="Relying on pretraining." sign="Confident wrong answers." fix="Add RAG with source-cite requirement." prevent="Faithfulness metric on golden set." />
          <Mistake n={28} title="Citations invented" cause="Model hallucinates plausible sources." sign="Citation IDs don't match retrieved chunks." fix="Validate every citation against retrieval; retry then abstain." prevent="Citation validator in production." />
          <Mistake n={29} title="Confident when uncertain" cause="No abstain path." sign="Ambiguous questions get definite answers." fix="Add 'if unsure, say so' rule + threshold." prevent="Abstain golden-set cases." />
          <Mistake n={30} title="Chain-of-thought leaks reasoning" cause="Reasoning surfaced in final output." sign="Users see internal scratch." fix="Hidden reasoning; concise final answer." prevent="Separate reasoning + answer channels." />
        </div>
      </Section>

      <Section id="s7" title="7. AI Safety Mistakes">
        <div className="grid gap-3">
          <Mistake n={31} title="No injection defence" cause="Trusting user input." sign="Attackers extract system prompt or take actions." fix="Spotlight + dual-LLM + output validation." prevent="Adversarial red-team suite." />
          <Mistake n={32} title="Logging PII" cause="Verbose logging for debugging." sign="Compliance findings." fix="PII scrub before logging." prevent="Logging schema review." />
          <Mistake n={33} title="Same key for all tenants" cause="Shortcut." sign="Data isolation risk." fix="Per-tenant scoping in retrieval and prompt context." prevent="Isolation tests in CI." />
          <Mistake n={34} title="Missing region residency" cause="Not scoped early." sign="Regulator flags data transfer." fix="Region-pinned inference endpoints." prevent="Residency requirement in the spec." />
          <Mistake n={35} title="No content classifier on output" cause="Trusting the model to self-police." sign="Toxic / disallowed content leaks." fix="Add output filter with review path." prevent="Content policy tests in evaluation." />
        </div>
      </Section>

      <Section id="s8" title="8. Evaluation Mistakes">
        <div className="grid gap-3">
          <Mistake n={36} title="Vibes-based iteration" cause="No golden set." sign="Fixes regress silently." fix="Freeze a labelled golden set before iterating." prevent="Eval-first culture." />
          <Mistake n={37} title="Judge prompt bias" cause="Untuned LLM judge." sign="Judge prefers longer or same-style answers." fix="Calibrate judge with human labels; enforce rubric." prevent="Track inter-rater agreement." />
          <Mistake n={38} title="Overfitting to the golden set" cause="Tuning prompt to test set." sign="Prod metrics diverge from evals." fix="Hold-out set; refresh from real traffic." prevent="Rolling golden set." />
          <Mistake n={39} title="Only offline evals" cause="Missing production metrics." sign="Evals green, users unhappy." fix="Add live metrics (CSAT, escalation, abstain)." prevent="Dashboard with both signals." />
          <Mistake n={40} title="No adversarial evals" cause="Assuming benign input." sign="Injection succeeds in prod." fix="Adversarial suite in CI." prevent="Quarterly red-team." />
        </div>
      </Section>

      <Section id="s9" title="9. Production Mistakes">
        <div className="grid gap-3">
          <Mistake n={41} title="No prompt versioning" cause="Editing in dashboards." sign="Cannot attribute regressions." fix="Prompts in git with semver." prevent="Registry + review policy." />
          <Mistake n={42} title="Big-bang rollout" cause="Skipping canary." sign="One bug hits everyone." fix="1% → 10% → 50% → 100% with eval gates." prevent="Deployment policy." />
          <Mistake n={43} title="No rollback path" cause="Prompt embedded in code." sign="Rollback needs a redeploy." fix="Feature flags + registry." prevent="Design for rollback first." />
          <Mistake n={44} title="Silent model upgrades" cause="Non-pinned provider version." sign="Behaviour changes without warning." fix="Pin model version; scheduled re-baseline." prevent="Model-version policy." />
          <Mistake n={45} title="No cost budget" cause="Feature ships without a limit." sign="Bill shock." fix="Per-feature token quotas + alerting." prevent="Budgets in the spec." />
          <Mistake n={46} title="No owner" cause="Team spread thin." sign="Incidents ownerless." fix="Named owner per prompt + rota." prevent="Runbook + on-call schedule." />
          <Mistake n={47} title="Missing observability" cause="Ship first, instrument later." sign="Cannot debug prod." fix="Traces + eval score + cost per call from day one." prevent="Observability in DoD." />
        </div>
      </Section>

      <Section id="s10" title="10. Prevention Strategies">
        <ul className="list-disc space-y-1 pl-5">
          <li>Always start with a one-page spec — no spec, no prompt.</li>
          <li>Golden set before iteration; iterate against numbers.</li>
          <li>RTCCF + explicit schema + abstain path — every production prompt.</li>
          <li>Cache-friendly prefix ordering; measure token traces.</li>
          <li>Spotlight untrusted content; adversarial tests in CI.</li>
          <li>Prompt registry + feature flags + auto-rollback.</li>
          <li>Named owner + rota + monthly quality bulletin.</li>
          <li>Model-version pinning + scheduled re-baseline.</li>
        </ul>
      </Section>

      <Section id="review" title="Common Mistakes Review">
        <h3 className="font-semibold">Top 25 mistakes to prevent</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Vague instructions with no role or format.</li>
          <li>Missing output schema and validator.</li>
          <li>Mixing multiple tasks in one prompt.</li>
          <li>Unstable prefixes killing prompt caching.</li>
          <li>Dumping entire documents instead of retrieval.</li>
          <li>No spotlighting around user or tool text.</li>
          <li>No abstain path in low-confidence cases.</li>
          <li>Confident hallucinations without grounding.</li>
          <li>Invented citations passed without validation.</li>
          <li>Ambiguous quantifiers ("brief", "a few").</li>
          <li>Negative-only instructions without positives.</li>
          <li>Contradictory rules accumulated over time.</li>
          <li>Chain-of-thought leaked into user output.</li>
          <li>Big-bang rollout without canary.</li>
          <li>Silent model upgrades without re-baseline.</li>
          <li>No prompt versioning or registry.</li>
          <li>No named owner or on-call rota.</li>
          <li>Vibes-based iteration without a golden set.</li>
          <li>Judge-prompt bias uncalibrated.</li>
          <li>PII in logs.</li>
          <li>Missing region residency.</li>
          <li>No cost budget or per-tenant quota.</li>
          <li>No adversarial or injection tests.</li>
          <li>Missing observability from day one.</li>
          <li>Skipping shadow mode before rollout.</li>
        </ol>
        <h3 className="mt-3 font-semibold">Prevention checklist</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>☐ Spec written before prompt.</li>
          <li>☐ Golden set + adversarial suite.</li>
          <li>☐ RTCCF + schema + validator + abstain.</li>
          <li>☐ Spotlighting + PII scrub + region pin.</li>
          <li>☐ Registry + flags + canary + auto-rollback.</li>
          <li>☐ Traces + cost + judge score dashboards.</li>
          <li>☐ Owner + rota + monthly bulletin.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Quick revision</h3>
        <p className="text-sm">Read the Top 25 aloud. For every entry, name one prompt of yours that risks it and one concrete change you'll ship this week.</p>
        <h3 className="mt-3 font-semibold">Self-assessment</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>0–5 checked: fundamentals gap — restudy Best Practices.</li>
          <li>6–15 checked: solid — refine evaluation + safety.</li>
          <li>16–25 checked: production-grade — mentor others.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Root cause</strong> — the underlying reason a symptom appears.</li>
          <li><strong>Abstain path</strong> — an explicit low-confidence route.</li>
          <li><strong>Spotlighting</strong> — delimiting untrusted regions so the model treats them as data.</li>
          <li><strong>Judge bias</strong> — systematic preference of an untuned LLM judge.</li>
          <li><strong>Middle-of-context</strong> — attention weakness for information placed in the middle of a long prompt.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which mistake causes the most incidents?">Missing abstain paths and no adversarial tests — both let confident errors escape to users.</FAQItem>
        <FAQItem q="Are these mistakes only for beginners?">No — most production incidents trace back to entries in Sections 7–9. Advanced teams still hit them.</FAQItem>
        <FAQItem q="How do I retrofit these fixes safely?">Prioritise observability + versioning first — you can't fix what you can't see. Then add abstain paths and validators.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Prompt Engineering, AI models, APIs, frameworks, and best practices evolve continuously — always consult official documentation (OpenAI, Anthropic, Google AI, Microsoft Learn, Hugging Face, LangChain, LangGraph, LlamaIndex, NVIDIA AI) for the latest guidance. Information is compiled from trusted documentation, academic publications, research papers, and industry standards. All trademarks, product names, and logos belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
