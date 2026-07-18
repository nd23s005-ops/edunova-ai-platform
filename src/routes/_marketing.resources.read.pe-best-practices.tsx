import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-best-practices",
  title: "Prompt Engineering — Best Practices",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "13 min",
  pages: 18,
  lastUpdated: "May 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80",
  heroSubtitle:
    "Professional standards for building maintainable, safe, and cost-effective Prompt Engineering systems — from design principles through versioning, evaluation, and continuous improvement.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Planning" },
  { id: "s2", label: "2. Prompt Design" },
  { id: "s3", label: "3. Context Engineering" },
  { id: "s4", label: "4. Prompt Patterns" },
  { id: "s5", label: "5. Version Control" },
  { id: "s6", label: "6. Prompt Libraries" },
  { id: "s7", label: "7. Evaluation" },
  { id: "s8", label: "8. Optimization" },
  { id: "s9", label: "9. AI Safety" },
  { id: "s10", label: "10. Documentation" },
  { id: "s11", label: "11. Deployment" },
  { id: "s12", label: "12. Monitoring" },
  { id: "s13", label: "13. Continuous Improvement" },
  { id: "review", label: "Best Practices Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Common Mistakes", tag: "AI & Data", time: "12 min" },
  { title: "Prompt Engineering — Real-world Case Study", tag: "AI & Data", time: "23 min" },
  { title: "Prompt Engineering — Reference Guide", tag: "AI & Data", time: "20 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { property: "og:url", content: "/resources/read/pe-best-practices" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/pe-best-practices" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Apply industry-standard Prompt Engineering conventions.</li>
          <li>Design prompts that stay reliable across model upgrades.</li>
          <li>Adopt versioning, evaluation, and observability from day one.</li>
          <li>Reduce prompt failures, cost drift, and safety incidents.</li>
          <li>Collaborate on prompts as production artefacts, not scratch notes.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Planning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Define a measurable goal before any prompt is written (metric + target + baseline).</li>
          <li>Write a one-page spec: intent, inputs, outputs, constraints, refusals, evaluation plan.</li>
          <li>Choose the smallest model that could plausibly meet the spec — upgrade with evidence, not habit.</li>
          <li>Estimate token budget and per-call cost before implementation.</li>
          <li>Identify regulatory, safety, and privacy constraints during planning, not launch.</li>
        </ul>
        <Callout tone="info" title="Spec template">
          <strong>Goal</strong> · <strong>Users</strong> · <strong>Inputs</strong> · <strong>Outputs (schema)</strong> · <strong>Constraints</strong> · <strong>Refusal policy</strong> · <strong>Golden-set plan</strong> · <strong>Success metric</strong>.
        </Callout>
      </Section>

      <Section id="s2" title="2. Prompt Design">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use the RTCCF structure: Role, Task, Context, Constraints, Format.</li>
          <li>Prefer explicit schemas over prose descriptions of output shape.</li>
          <li>State refusals and out-of-scope behaviour explicitly.</li>
          <li>Keep the system prompt stable; put variable input in the user message.</li>
          <li>Write for the weakest model you intend to support, not the strongest.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1526378787940-576a539ba69d?w=1600&q=80" caption="Prompt lifecycle — plan, draft, evaluate, iterate, version, deploy, monitor, improve." />
      </Section>

      <Section id="s3" title="3. Context Engineering">
        <ul className="list-disc space-y-1 pl-5">
          <li>Deliver only the context needed — every extra token is cost + latency + risk.</li>
          <li>Delimit untrusted content with XML tags or fenced blocks (spotlighting).</li>
          <li>Never re-inject raw tool outputs into the system prompt.</li>
          <li>Use retrieval instead of stuffing long documents.</li>
          <li>Compress long histories with running summaries + last-N-turns.</li>
        </ul>
      </Section>

      <Section id="s4" title="4. Prompt Patterns">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Pattern</th><th className="text-left p-2">Use when</th><th className="text-left p-2">Avoid when</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Zero-shot</td><td className="p-2">Task is common and describable.</td><td className="p-2">Format is unusual.</td></tr>
            <tr className="border-b"><td className="p-2">Few-shot</td><td className="p-2">Format, tone, or edge cases matter.</td><td className="p-2">Examples would bias output.</td></tr>
            <tr className="border-b"><td className="p-2">Chain-of-thought</td><td className="p-2">Multi-step reasoning required.</td><td className="p-2">Reasoning must not leak or latency is tight.</td></tr>
            <tr className="border-b"><td className="p-2">Self-consistency</td><td className="p-2">Math / logic with a clear answer.</td><td className="p-2">Cost-sensitive or open-ended tasks.</td></tr>
            <tr className="border-b"><td className="p-2">Grounded RAG</td><td className="p-2">Answers must cite sources.</td><td className="p-2">Purely creative tasks.</td></tr>
            <tr><td className="p-2">LLM-as-judge</td><td className="p-2">Open-ended evaluation.</td><td className="p-2">Absolute ground truth exists.</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s5" title="5. Version Control">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompts live in git alongside code, not in dashboards or shared docs.</li>
          <li>Semantic versioning (major.minor.patch) tied to eval-score deltas.</li>
          <li>Each version links to: eval report, changelog, author, review approver.</li>
          <li>Deploy prompts behind feature flags; roll back with a flag flip, not a redeploy.</li>
          <li>Never mutate a shipped version — bump the version instead.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. Prompt Libraries">
        <ul className="list-disc space-y-1 pl-5">
          <li>Central registry with search, tags, category, model compatibility.</li>
          <li>Every prompt entry: purpose, inputs, outputs, evals, owner, last-reviewed date.</li>
          <li>Encourage forking with attribution; require review before promotion to shared library.</li>
          <li>Distinguish "experimental", "production", and "deprecated" states.</li>
          <li>Periodic library audit — retire prompts unused for 90+ days.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every production prompt has a golden set (100–500 dual-labelled examples).</li>
          <li>Combine rubric-based LLM-judge with reference metrics where applicable.</li>
          <li>Adversarial suite: injection, jailbreak, PII exfiltration, format break.</li>
          <li>Regression gate: block deploy if faithfulness / correctness drops.</li>
          <li>Track inter-rater agreement to catch judge drift.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" caption="Enterprise Prompt Engineering workflow — registry, evaluation, guardrails, and rollout." />
      </Section>

      <Section id="s8" title="8. Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Measure before optimising: token trace, latency histogram, cost breakdown.</li>
          <li>Prompt caching + stable prefix ordering — usually the biggest lever.</li>
          <li>Cap output length; add stop sequences.</li>
          <li>Model routing: small model handles easy cases, large model handles hard.</li>
          <li>Cache exact + semantic responses at the edge for read-heavy prompts.</li>
        </ul>
      </Section>

      <Section id="s9" title="9. AI Safety">
        <ul className="list-disc space-y-1 pl-5">
          <li>Spotlight untrusted content with delimiters; treat tool output as data, not instructions.</li>
          <li>Use the dual-LLM pattern for privileged actions (planner privileged, worker quarantined).</li>
          <li>Enforce output schemas + validators with one auto-repair retry, then abstain.</li>
          <li>PII scrub on inputs and logs; region-scoped inference for residency.</li>
          <li>Abstain path when confidence is low — safer than a confident guess.</li>
        </ul>
      </Section>

      <Section id="s10" title="10. Documentation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every prompt has a README: purpose, inputs, outputs, known limits, examples, owner.</li>
          <li>Changelog per version explains <em>why</em>, not only <em>what</em>.</li>
          <li>Publish an "advice-vs-information" boundary doc for regulated domains.</li>
          <li>Runbook: how to escalate a failing prompt, who owns it, rollback steps.</li>
          <li>Non-engineering stakeholders should be able to read the spec.</li>
        </ul>
      </Section>

      <Section id="s11" title="11. Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li>Canary + auto-rollback tied to eval-score delta thresholds.</li>
          <li>Region-pinned inference where compliance requires it.</li>
          <li>Config-driven models — swap providers without code change.</li>
          <li>Blue-green prompt versions; ability to A/B two versions in production.</li>
          <li>Shadow-mode new prompts before user-visible rollout.</li>
        </ul>
      </Section>

      <Section id="s12" title="12. Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li>Trace every call: prompt version, inputs (redacted), output, latency, tokens, judge score.</li>
          <li>Dashboards for cost/query, abstain rate, judge-fail rate, citation-missing rate.</li>
          <li>Alert on drift: sudden spikes in refusals, length, latency, or cost.</li>
          <li>Sample real traffic weekly to grow the golden set with fresh edge cases.</li>
          <li>Weekly review of red-team findings and near-miss incidents.</li>
        </ul>
      </Section>

      <Section id="s13" title="13. Continuous Improvement">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ship one small, measured prompt improvement per week.</li>
          <li>Re-baseline evals when a provider updates a model.</li>
          <li>Retire underperforming prompts on a schedule.</li>
          <li>Rotate on-call ownership across the team; prompts are not "someone else's problem".</li>
          <li>Publish a monthly quality bulletin: wins, regressions, plans.</li>
        </ul>
      </Section>

      <Section id="review" title="Best Practices Review">
        <h3 className="font-semibold">Production checklist</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>☐ One-page spec approved.</li>
          <li>☐ Golden set of ≥ 100 dual-labelled examples.</li>
          <li>☐ Adversarial suite exercised.</li>
          <li>☐ Prompt versioned in git and behind a flag.</li>
          <li>☐ Output schema + validator + one retry + abstain path.</li>
          <li>☐ PII scrub + spotlighting + injection tests.</li>
          <li>☐ Observability: traces + cost + eval score per call.</li>
          <li>☐ Runbook + owner + escalation path documented.</li>
          <li>☐ Shadow-mode results reviewed before rollout.</li>
          <li>☐ Auto-rollback wired to eval-score threshold.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Expert recommendations</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>Design the escalation UX before the happy path.</li>
          <li>Judge prompts are the cheapest safety net you'll deploy.</li>
          <li>Cache + prefix ordering out-earn most model upgrades.</li>
          <li>Dual-label golden sets: agreement is the metric you trust.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Team checklist</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>☐ Prompt owner named per prompt.</li>
          <li>☐ Review policy: 1 PE lead + 1 domain SME before promotion.</li>
          <li>☐ Weekly eval review meeting.</li>
          <li>☐ Quarterly red-team pass.</li>
          <li>☐ Onboarding doc for new team members.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Spec</strong> — the one-page contract that a prompt is trying to satisfy.</li>
          <li><strong>Golden set</strong> — curated, labelled examples used as a stable benchmark.</li>
          <li><strong>Judge prompt</strong> — LLM scoring another LLM's output against a rubric.</li>
          <li><strong>Registry</strong> — versioned central store of production prompts.</li>
          <li><strong>Regression gate</strong> — CI check that blocks deploy if eval score drops.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How large should a golden set be?">100–500 dual-labelled examples usually beats 5,000 noisy ones. Grow it from real traffic.</FAQItem>
        <FAQItem q="Do I need a judge prompt if I have references?">Judges cover the gaps references miss — tone, safety, format — and scale beyond your reference set.</FAQItem>
        <FAQItem q="How often should I re-evaluate?">Every prompt change and every model provider update. Weekly re-baseline in production is a healthy default.</FAQItem>
        <FAQItem q="Best cadence for team review?">Weekly eval review + monthly quality bulletin + quarterly red-team.</FAQItem>
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
