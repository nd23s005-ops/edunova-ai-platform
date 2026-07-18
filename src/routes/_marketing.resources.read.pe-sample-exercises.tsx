import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-sample-exercises",
  title: "Prompt Engineering — Sample Exercises",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "24 min",
  pages: 26,
  lastUpdated: "July 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80",
  heroSubtitle:
    "A hands-on workbook of 120+ Prompt Engineering exercises — from first prompts to agent design — with difficulty ladders, debugging drills and mini projects.",
};

const TOC: TocItem[] = [
  { id: "s1", label: "1. Beginner Exercises" },
  { id: "s2", label: "2. Prompt Structure" },
  { id: "s3", label: "3. Zero-shot" },
  { id: "s4", label: "4. Few-shot" },
  { id: "s5", label: "5. Role Prompting" },
  { id: "s6", label: "6. Context Engineering" },
  { id: "s7", label: "7. Prompt Optimization" },
  { id: "s8", label: "8. AI Agents" },
  { id: "s9", label: "9. RAG Prompts" },
  { id: "s10", label: "10. Mini Challenges" },
  { id: "s11", label: "11. Final Challenge" },
  { id: "review", label: "Exercise Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Project Guide", tag: "AI & Data", time: "22 min" },
  { title: "Prompt Engineering — Project Case Study", tag: "AI & Data", time: "23 min" },
  { title: "Prompt Engineering — Practice Questions", tag: "AI & Data", time: "—" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-sample-exercises")({
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

function ExList({ items, start = 1, difficulty }: { items: string[]; start?: number; difficulty: "★" | "★★" | "★★★" }) {
  return (
    <ol className="space-y-2 pl-5 list-decimal" start={start}>
      {items.map((x, i) => (
        <li key={i} className="text-sm">
          <span className="mr-2 rounded bg-muted px-1.5 py-0.5 text-[10px]">{difficulty}</span>
          {x}
        </li>
      ))}
    </ol>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Build prompting skill through 120+ deliberate exercises.</li>
          <li>Move from single prompts to full agent/RAG workflows.</li>
          <li>Debug prompts systematically instead of guessing.</li>
          <li>Ship a mini project you can put in a portfolio.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80" caption="Difficulty ladder — one-star warm-ups, two-star drills, three-star scenario challenges." />
        <Callout tone="tip" title="How to use this workbook">
          Do 5 exercises a day. Type every answer. Compare your prompt with a friend's or with an LLM's critique. Progress compounds fast.
        </Callout>
      </Section>

      <Section id="s1" title="1. Beginner Exercises (Warm-up)">
        <ExList difficulty="★" items={[
          "Ask an LLM to explain 'token' in one sentence to a 10-year-old.",
          "Rewrite 'tell me about python' into a specific, structured request.",
          "Get a haiku about the ocean without using the word 'wave'.",
          "Ask for 3 blog title ideas about remote work — force exactly 3.",
          "Ask for a joke about a database — enforce PG-rated only.",
          "Force the model to answer only in French.",
          "Ask for a 40-word product description of any coffee mug.",
          "Ask for a numbered recipe of 5 steps for boiling an egg.",
          "Ask the model to summarise itself in one sentence.",
          "Ask for a table with two columns: fruit, colour, 5 rows.",
        ]} />
      </Section>

      <Section id="s2" title="2. Prompt Structure Exercises">
        <ExList start={11} difficulty="★" items={[
          "Rewrite an old vague prompt using Role · Task · Context · Constraints · Format.",
          "Take one prompt and produce three variants: minimal, medium, verbose.",
          "Write a system message defining a 'careful legal assistant'.",
          "Force output as strict JSON with 3 keys.",
          "Force output as a Markdown table with headers.",
          "Add a deny-list constraint ('do not mention…').",
          "Add a positive-list constraint ('must mention…').",
          "Constrain word count to exactly 60 words.",
          "Constrain reading level to 'age 12'.",
          "Convert a prose specification into a numbered recipe.",
        ]} />
      </Section>

      <Section id="s3" title="3. Zero-shot Prompting">
        <ExList start={21} difficulty="★" items={[
          "Classify 5 movie reviews as positive/negative — zero-shot.",
          "Extract dates from 5 sentences — zero-shot.",
          "Translate 3 English idioms into Spanish — zero-shot.",
          "Summarise a news headline into a tweet — zero-shot.",
          "Ask the model to detect the language of 5 inputs.",
          "Extract email + phone from a paragraph.",
          "Rewrite a rude message into a polite one.",
          "Explain a code snippet at three difficulty levels.",
          "Convert bullet points into a paragraph and vice versa.",
          "Generate 5 test cases for a login function.",
        ]} />
      </Section>

      <Section id="s4" title="4. One-shot & Few-shot Prompting">
        <ExList start={31} difficulty="★★" items={[
          "Give one example of a good product tagline, ask for 5 more.",
          "3-shot: convert English → SQL. Then test on 2 new queries.",
          "5-shot: sentiment classifier for tweets. Report accuracy on 10 held-out tweets.",
          "Compare 0/1/3/5-shot on a niche extraction task; find the sweet spot.",
          "Break a good few-shot prompt by using near-duplicate examples; compare.",
          "Build a dynamic few-shot loop: pick 3 nearest examples by embedding.",
          "Show one bad example intentionally — see if model copies the flaw.",
          "Design few-shot for JSON output — validate schema.",
          "Design a chain of examples for style transfer (formal → casual).",
          "Reduce a 10-shot prompt to 3-shot without accuracy loss.",
        ]} />
      </Section>

      <Section id="s5" title="5. Role Prompting">
        <ExList start={41} difficulty="★★" items={[
          "Create three system prompts: teacher, coach, code reviewer.",
          "Give the model a persona and forbid it from breaking character.",
          "Compare answers of 'you are a senior SRE' vs no role.",
          "Build a role that must refuse illegal requests politely.",
          "Combine two roles: interviewer + note-taker.",
          "Create a persona that only speaks in Socratic questions.",
          "Design a 'red team' persona and a 'defender' persona.",
          "Convert a support-agent role into a JSON-only responder.",
          "Add tone constraints on top of a role (concise, empathetic).",
          "Bench-test the persona against 5 tricky user turns.",
        ]} />
      </Section>

      <Section id="s6" title="6. Context Engineering Exercises">
        <ExList start={51} difficulty="★★" items={[
          "Fit a 5-page article into a budget with 30% output reserved.",
          "Order context so the stable prefix comes first.",
          "Hide a key fact in the middle of context — measure retrieval.",
          "Compress 10 chat turns into a 5-line running summary.",
          "Number chunks and force citations by [id].",
          "Add an abstain clause and test with an unanswerable question.",
          "Split context into 'facts' and 'style examples' with clear delimiters.",
          "Enforce max 3 citations per answer.",
          "Detect and remove PII before insertion into context.",
          "Rewrite a bloated prompt: drop 30% of tokens, keep quality.",
        ]} />
      </Section>

      <Section id="s7" title="7. Prompt Optimization">
        <ExList start={61} difficulty="★★" items={[
          "Cut a 400-token prompt to 250 without quality loss.",
          "Split into stable prefix + volatile suffix; measure cache hit.",
          "Route easy tasks to a small model; escalate on low confidence.",
          "Batch 10 classifications into one call.",
          "Enforce JSON schema instead of parsing free text.",
          "Add self-consistency (n=5, majority vote) and compare accuracy.",
          "Add reflexion: model critiques and retries.",
          "Distil a CoT prompt into a fine-tuned small model prompt (simulate).",
          "Set up an LLM-as-judge pairwise eval with 10 items.",
          "Log tokens/latency/cost on 20 calls; make a Pareto chart.",
        ]} />
      </Section>

      <Section id="s8" title="8. AI Agent Exercises">
        <ExList start={71} difficulty="★★★" items={[
          "Build a single-tool ReAct agent: web search only.",
          "Cap steps at 5, tokens at 4K, wall time at 30 s.",
          "Add a 'stop' tool the agent must call on completion.",
          "Design a planner-executor pair for a research task.",
          "Force the agent to explain each Thought in one sentence.",
          "Break the agent with a prompt-injection page; add a defence.",
          "Add scratchpad memory across turns.",
          "Add semantic memory pulled from a vector store.",
          "Detect a loop and abort with a helpful message.",
          "Log every tool call and compute total $ cost.",
        ]} />
      </Section>

      <Section id="s9" title="9. RAG Prompt Exercises">
        <ExList start={81} difficulty="★★★" items={[
          "Chunk a 40-page doc at 512 tokens / 15% overlap.",
          "Compare top-3 vs top-10 retrieval quality.",
          "Add a cross-encoder reranker; measure delta.",
          "Force citations of chunk IDs in the answer.",
          "Add abstain when context is insufficient.",
          "Add BM25 alongside dense retrieval (hybrid); compare.",
          "Add HyDE query rewriting; measure recall.",
          "Detect a poisoned chunk (injection) and refuse.",
          "Compress top-10 chunks into a single running summary before answering.",
          "Build a golden set of 20 Q&A pairs; measure faithfulness.",
        ]} />
      </Section>

      <Section id="s10" title="10. Mini Challenges">
        <ExList start={91} difficulty="★★★" items={[
          "Ship a receipt-to-JSON extractor with 90%+ accuracy on 20 test receipts.",
          "Build a support-ticket classifier with abstain path for unknown labels.",
          "Turn a 200-page PDF into a searchable Q&A demo (RAG).",
          "Build a debate-simulator with two opposing personas.",
          "Design a 'tutor' agent that asks the user questions before answering.",
          "Build a code-review prompt that flags 5 categories of bugs.",
          "Convert unstructured meeting notes into JIRA-ready tickets.",
          "Build a translation prompt that preserves markdown formatting.",
          "Design a prompt that always outputs valid Python for a given task.",
          "Build an FAQ-writer that generates 20 diverse questions from one doc.",
        ]} />
      </Section>

      <Section id="s11" title="11. Final Challenge — Mini Project">
        <p><strong>Goal:</strong> Ship one end-to-end prompt-driven feature and publish it.</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Pick a problem you actually care about.</li>
          <li>Design v1 prompt using RTCCF.</li>
          <li>Build a 30-item golden set.</li>
          <li>Iterate through 5 prompt versions; log wins/losses.</li>
          <li>Add JSON schema output, abstain path, and citation if applicable.</li>
          <li>Add cost + latency dashboard.</li>
          <li>Write a README with your evaluation numbers.</li>
          <li>Publish on GitHub.</li>
        </ol>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" caption="Practice loop — write, test, evaluate, refine. This is where prompt skill actually grows." />
      </Section>

      <Section id="review" title="Exercise Review">
        <h3 className="font-semibold">Learning checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Completed at least 60 exercises with typed answers.</li>
          <li>Tried each pattern (persona, recipe, template, flipped, verifier).</li>
          <li>Shipped one mini-project publicly.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Difficulty tracker</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Level</th><th className="text-left p-2">Range</th><th className="text-left p-2">Target</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">★</td><td className="p-2">1–30</td><td className="p-2">Complete all</td></tr>
            <tr className="border-b"><td className="p-2">★★</td><td className="p-2">31–70</td><td className="p-2">≥ 30</td></tr>
            <tr><td className="p-2">★★★</td><td className="p-2">71–100</td><td className="p-2">≥ 15</td></tr>
          </tbody>
        </table>
        <h3 className="mt-4 font-semibold">Practice summary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Warm-ups train structure; drills train patterns; challenges train judgement.</li>
          <li>Type every answer — reading is not practice.</li>
          <li>Re-do a failing exercise the next day, from memory.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Suggested next exercises</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Extend the RAG exercises with GraphRAG or Self-RAG.</li>
          <li>Extend the agent exercises with multi-agent supervisor patterns.</li>
          <li>Move on to the Project Guide and Project Case Study.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>RTCCF</strong> — Role, Task, Context, Constraints, Format.</li>
          <li><strong>Abstain</strong> — authorised 'I don't know'.</li>
          <li><strong>Golden set</strong> — labelled examples used for evaluation.</li>
          <li><strong>Reflexion</strong> — model critiques and retries.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I need a paid API?">Free tiers cover most exercises. Sections 8–11 benefit from small paid usage.</FAQItem>
        <FAQItem q="Can I use any LLM?">Yes — mix providers to see how prompts port across models.</FAQItem>
        <FAQItem q="What if I get stuck?">Skip to the next exercise, come back the following day.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended solely for educational purposes. AI technologies, models, APIs, and best practices evolve rapidly — always consult official documentation for the latest guidance. Information is compiled from trusted documentation, academic publications, research papers, industry standards, and official educational resources. All trademarks, logos, product names, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
