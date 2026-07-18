import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-tips-tricks",
  title: "Prompt Engineering — Tips & Tricks",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 9,
  lastUpdated: "June 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "100+ practical Prompt Engineering tips — writing hacks, context tricks, optimisation shortcuts, debugging strategies, and daily workflow habits that ship better prompts faster.",
};

const TOC: TocItem[] = [
  { id: "writing", label: "1. Prompt Writing Tips" },
  { id: "structure", label: "2. Prompt Structure" },
  { id: "context", label: "3. Context Engineering Tricks" },
  { id: "opt", label: "4. Prompt Optimization" },
  { id: "flow", label: "5. AI Productivity Workflows" },
  { id: "debug", label: "6. Prompt Debugging" },
  { id: "time", label: "7. Time-Saving Techniques" },
  { id: "lib", label: "8. Prompt Library Management" },
  { id: "safety", label: "9. AI Safety Tips" },
  { id: "daily", label: "10. Daily Workflow Improvements" },
  { id: "review", label: "Tips Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Frequently Asked Questions", tag: "AI & Data", time: "14 min" },
  { title: "Prompt Engineering — Learning Roadmap", tag: "AI & Data", time: "8 min" },
  { title: "Prompt Engineering — Reference Guide", tag: "AI & Data", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-tips-tricks")({
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

function Tips({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal space-y-1 pl-5">
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ol>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Write higher-quality prompts in less time.</li>
          <li>Debug prompts systematically instead of by trial-and-error.</li>
          <li>Adopt professional workflows: templates, versioning, evaluation.</li>
          <li>Build a personal prompt library you actually reuse.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=1600&q=80"
          caption="Prompt writing workflow — draft, delimit, constrain, test, iterate."
        />
      </Section>

      <Section id="writing" title="1. Prompt Writing Tips">
        <Tips items={[
          "Open with a single-sentence objective. If it takes two, split it.",
          "Prefer bullet rules over prose paragraphs — attention hits bullets harder.",
          "Give the model a persona only if it changes tone or expertise.",
          "State what NOT to do explicitly — models miss implicit constraints.",
          "Put the most important instruction last; it's closest to the generation cursor.",
          "Replace vague adjectives ('good', 'clear') with measurable ones ('under 80 words', 'no adjectives').",
          "Use active voice; passive constructions bloat token count.",
          "Prefer 'Return JSON matching this schema' over 'Return JSON like this'.",
          "Ask for reasoning only when it improves output — CoT costs tokens.",
          "End with an output template the model can complete verbatim.",
        ]} />
      </Section>

      <Section id="structure" title="2. Prompt Structure">
        <Tips items={[
          "Split every prompt into: role → objective → context → rules → output.",
          "Reserve the system prompt for durable behaviour, never per-request data.",
          "Delimit untrusted or variable input with triple backticks or XML tags.",
          "Label each block with a heading — models parse headings well.",
          "Keep the stable prefix identical across calls to hit the KV-cache.",
          "For multi-step tasks, number the steps 1..N explicitly.",
          "Move few-shot examples to the tail; the model attends there most strongly.",
          "Never mix instructions and data in the same paragraph.",
        ]} />
      </Section>

      <Section id="context" title="3. Context Engineering Tricks">
        <Tips items={[
          "Retrieve less, better — top-5 reranked beats top-50 raw.",
          "Compress old chat turns into a running summary once past ~10 messages.",
          "Put the most important document first AND remind the model at the end.",
          "Tag each retrieved chunk with [id] so the model can cite it.",
          "Explicitly authorise 'I don't know' when context might be insufficient.",
          "Never stuff the whole knowledge base — quality drops in long contexts.",
          "Add a one-line summary before each chunk — helps small models orient.",
          "Prune redundant chunks; near-duplicates waste tokens and confuse the model.",
        ]} />
      </Section>

      <Section id="opt" title="4. Prompt Optimization">
        <Tips items={[
          "Shorten before you complicate — most prompts are 30% longer than they need to be.",
          "Delete filler like 'Please' and 'I would appreciate'.",
          "Replace paragraphs of rules with a bullet list of 5–8 must-haves.",
          "Use response_format / JSON schema instead of parsing free text.",
          "Cache the stable prefix; rebuild only the tail per request.",
          "Route easy queries to a smaller/cheaper model; escalate on low confidence.",
          "Batch classification calls — one prompt with 10 items beats 10 prompts.",
          "Stream tokens for perceived latency, especially on chat surfaces.",
          "Measure before optimising — profile prompt vs retrieval vs post-processing.",
          "Distil frequent CoT prompts into a small fine-tuned model.",
        ]} />
      </Section>

      <Section id="flow" title="5. AI Productivity Workflows">
        <Tips items={[
          "Keep a 'prompt journal' — save winning prompts with input, output, model, date.",
          "Use a diff viewer to compare prompt versions side-by-side.",
          "Save the top 20 prompts as snippets in your editor / OS text expander.",
          "Chain tools together (LLM → parser → validator) instead of one giant prompt.",
          "Prefer many small evaluated prompts over one 'do everything' prompt.",
          "Automate repetitive edits with a meta-prompt: 'Rewrite this prompt to be shorter'.",
          "Version your prompts in git alongside code.",
          "Peer-review prompts like PRs — a second pair of eyes catches ambiguity.",
        ]} />
        <Figure
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
          caption="Prompt productivity workflow — journal, template library, evaluation loop."
        />
      </Section>

      <Section id="debug" title="6. Prompt Debugging">
        <Tips items={[
          "Reproduce with temperature=0 first; then reintroduce randomness.",
          "Show the model a bad output and ask 'Why did you produce this?' — surprising insights.",
          "Bisect: remove half the prompt; if quality holds, that half was dead weight.",
          "Log full prompts + completions with a request id for post-mortems.",
          "Check tokenisation — trailing spaces and casing quietly change behaviour.",
          "Force JSON mode; parse errors surface issues faster than semantic checks.",
          "Add sentinel strings ('BEGIN CONTEXT') to detect injection tampering.",
          "Reproduce on a smaller model — bugs often appear there first.",
        ]} />
      </Section>

      <Section id="time" title="7. Time-Saving Techniques">
        <Tips items={[
          "Prompt templates with placeholders beat re-typing.",
          "Keep one 'universal system prompt' you tweak for each project.",
          "Use keyboard shortcuts on the model UI (arrow-up to edit last prompt).",
          "Chain conversation turns instead of restarting; the model already has context.",
          "Use 'continue' when hitting length limits instead of retrying from scratch.",
          "Cache expensive results (embeddings, reranker scores) locally.",
          "Batch experiments overnight; review results in the morning.",
          "Automate golden-set runs on every prompt change with a one-command script.",
        ]} />
      </Section>

      <Section id="lib" title="8. Prompt Library Management">
        <Tips items={[
          "Store prompts as files, not inline strings — git history is your friend.",
          "Name prompts by capability ('summarise/executive', not 'prompt_v3_final_final').",
          "Version prompts semver-style; bump on behaviour change.",
          "Tag every prompt with model, temperature, max_tokens and eval score.",
          "Deprecate old prompts explicitly; keep a CHANGELOG.",
          "Group by task: classify/, extract/, summarise/, chat/, agent/.",
          "Include a README per prompt: purpose, inputs, outputs, known failure modes.",
        ]} />
      </Section>

      <Section id="safety" title="9. AI Safety Tips">
        <Tips items={[
          "Never trust untrusted text — delimit, spotlight, classify.",
          "Redact PII before it enters the prompt AND before it enters logs.",
          "Add an output classifier for toxic / off-policy responses.",
          "Cap tool permissions — least-privilege for every API the agent can call.",
          "Rate-limit user-triggered LLM calls to prevent DoS + cost blowups.",
          "Add an abstain path; force 'I can't help with that' when policy triggers.",
          "Red-team quarterly — inject 20+ known jailbreaks into your golden set.",
          "Never log secrets, keys or full user PII — hash or redact.",
        ]} />
      </Section>

      <Section id="daily" title="10. Daily Workflow Improvements">
        <Tips items={[
          "Start each day by reviewing yesterday's worst prompt output.",
          "Set a 15-minute 'prompt gym' — rewrite one prompt to be 30% shorter.",
          "Read one paper or changelog per day (arXiv, OpenAI, Anthropic).",
          "Keep a 'failed prompt' folder — patterns emerge over weeks.",
          "Share a weekly prompt tip with your team; teaching solidifies learning.",
          "Every Friday, retire one prompt that's no longer needed.",
          "Track cost per feature — spikes reveal drift before users complain.",
          "Meditate on the output before writing the next prompt — reactive tuning wastes calls.",
        ]} />
      </Section>

      <Section id="review" title="Tips Review">
        <h3 className="font-semibold">Top 50 productivity tips</h3>
        <p>The first five tips in each of §1–§10 collectively form the top-50 productivity list. Bookmark them.</p>
        <h3 className="mt-4 font-semibold">Daily workflow checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Review the previous day's worst output.</li>
          <li>Rewrite one prompt for concision.</li>
          <li>Run the golden set against any changed prompt.</li>
          <li>Log token cost and latency for the day's top calls.</li>
          <li>Retire or version-bump one prompt if behaviour changed.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Quick reference sheet</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Situation</th><th className="text-left p-2">Trick</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Wrong format</td><td className="p-2">Use JSON schema / function calling.</td></tr>
            <tr className="border-b"><td className="p-2">Rambling output</td><td className="p-2">Add a hard word/bullet limit + stop sequence.</td></tr>
            <tr className="border-b"><td className="p-2">Hallucination</td><td className="p-2">Ground with RAG + authorise 'I don't know'.</td></tr>
            <tr className="border-b"><td className="p-2">Injection risk</td><td className="p-2">Delimit + spotlight + classifier.</td></tr>
            <tr className="border-b"><td className="p-2">Too slow</td><td className="p-2">Stream + smaller model + shorter max_tokens.</td></tr>
            <tr><td className="p-2">Too expensive</td><td className="p-2">Cache prefix + batch + route to cheaper model.</td></tr>
          </tbody>
        </table>
        <Callout tone="tip" title="Best-practice summary">
          Templates over improvisation · Structured output over parsing · Evaluation over vibes · Version control over 'final_v7'.
        </Callout>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which tip should I adopt first?">Start with §1 tip 1 — write a one-sentence objective before every prompt.</FAQItem>
        <FAQItem q="Do these tips apply to open-source models?">Yes. Smaller models need them more, not less.</FAQItem>
        <FAQItem q="How do I keep the library from becoming a graveyard?">Deprecate ruthlessly. If a prompt hasn't been used in 90 days, archive it.</FAQItem>
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
