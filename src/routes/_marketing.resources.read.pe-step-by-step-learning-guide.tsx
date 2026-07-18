import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-step-by-step-learning-guide",
  title: "Prompt Engineering — Step-by-Step Learning Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "21 min",
  pages: 23,
  lastUpdated: "June 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  heroSubtitle:
    "An 8-week Prompt Engineering study plan — daily goals, weekly milestones, exercises, self-assessments and a portfolio project to build real skill on schedule.",
};

const TOC: TocItem[] = [
  { id: "prereq", label: "1. Learning Prerequisites" },
  { id: "w1", label: "2. Week 1 — LLM Basics" },
  { id: "w2", label: "3. Week 2 — Prompt Fundamentals" },
  { id: "w3", label: "4. Week 3 — Prompt Patterns" },
  { id: "w4", label: "5. Week 4 — Advanced Prompting" },
  { id: "w5", label: "6. Week 5 — Context Engineering" },
  { id: "w6", label: "7. Week 6 — RAG & AI Agents" },
  { id: "w7", label: "8. Week 7 — Prompt Optimization" },
  { id: "w8", label: "9. Week 8 — Portfolio Project" },
  { id: "career", label: "10. Career Roadmap" },
  { id: "review", label: "Step-by-Step Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Beginner Guide", tag: "AI & Data", time: "12 min" },
  { title: "Prompt Engineering — Complete Tutorial", tag: "AI & Data", time: "64 min" },
  { title: "Prompt Engineering — Learning Roadmap", tag: "AI & Data", time: "8 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-step-by-step-learning-guide")({
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

type Day = { d: string; goal: string; task: string };
type Week = { id: string; title: string; outcome: string; days: Day[]; milestone: string; checkpoint: string[] };

const WEEKS: Week[] = [
  {
    id: "w1", title: "Week 1 — LLM Basics", outcome: "Confidently explain what an LLM is and how sampling works.",
    days: [
      { d: "Day 1", goal: "What LLMs do", task: "Read a beginner article; write a 5-line summary in your own words." },
      { d: "Day 2", goal: "Tokens", task: "Paste 3 sentences into a tokenizer viewer; note token counts." },
      { d: "Day 3", goal: "Sampling", task: "Run the same prompt at temperature 0, 0.7, 1.2 — compare." },
      { d: "Day 4", goal: "Context window", task: "Test a long-context input; observe where quality drops." },
      { d: "Day 5", goal: "Base vs Instruct", task: "Read one page on RLHF; explain it in 3 bullets." },
      { d: "Day 6", goal: "Model comparison", task: "Run 3 prompts on GPT, Claude, Gemini — note tone differences." },
      { d: "Day 7", goal: "Review", task: "Write a 1-page summary of week 1." },
    ],
    milestone: "You can define token, temperature, context window and instruct model.",
    checkpoint: ["Explain sampling in your own words", "Name 3 frontier models", "Describe why hallucinations happen"],
  },
  {
    id: "w2", title: "Week 2 — Prompt Fundamentals", outcome: "Write structured prompts using the Role-Task-Format template.",
    days: [
      { d: "Day 1", goal: "RTF template", task: "Rewrite 5 vague prompts using Role · Task · Format." },
      { d: "Day 2", goal: "System messages", task: "Craft a system prompt for a helpful research assistant." },
      { d: "Day 3", goal: "Zero-shot", task: "Solve 5 tasks zero-shot; note where the model struggles." },
      { d: "Day 4", goal: "Delimiters", task: "Use triple backticks + XML tags to wrap untrusted input." },
      { d: "Day 5", goal: "Length control", task: "Get responses to fit 30, 60, 120 words exactly." },
      { d: "Day 6", goal: "Output formats", task: "Generate the same answer as bullets, table and JSON." },
      { d: "Day 7", goal: "Review", task: "Redo Monday's prompts — measure improvement." },
    ],
    milestone: "You can produce clean, well-structured prompts on demand.",
    checkpoint: ["Every prompt has role, task, format", "You can force a word limit", "You can force a specific format"],
  },
  {
    id: "w3", title: "Week 3 — Prompt Patterns", outcome: "Apply 5+ named prompt patterns to real tasks.",
    days: [
      { d: "Day 1", goal: "Persona", task: "Build 3 personas: teacher, coach, code reviewer." },
      { d: "Day 2", goal: "Recipe", task: "Turn a 200-word instruction into a numbered recipe." },
      { d: "Day 3", goal: "Template", task: "Define a JSON template and ensure the model fills it every time." },
      { d: "Day 4", goal: "Flipped interaction", task: "Make the model interview you before answering." },
      { d: "Day 5", goal: "Cognitive verifier", task: "Force the model to split questions before answering." },
      { d: "Day 6", goal: "One-shot / few-shot", task: "Compare 0/1/3/5-shot on a niche task; find sweet spot." },
      { d: "Day 7", goal: "Review", task: "Journal which pattern helped most and why." },
    ],
    milestone: "You reach for named patterns instead of guessing.",
    checkpoint: ["Comfortable with 5+ patterns", "Know when to add examples", "Can build reusable templates"],
  },
  {
    id: "w4", title: "Week 4 — Advanced Prompting", outcome: "Use CoT, self-consistency and reflection where they help.",
    days: [
      { d: "Day 1", goal: "CoT basics", task: "Add 'think step by step' to 5 maths tasks; measure delta." },
      { d: "Day 2", goal: "Plan-and-Solve", task: "Force an explicit plan block before execution." },
      { d: "Day 3", goal: "Self-consistency", task: "Sample 5 chains, majority-vote answers." },
      { d: "Day 4", goal: "Reflexion", task: "Ask the model to critique and retry its own answer." },
      { d: "Day 5", goal: "Structured output", task: "Enforce JSON via response_format / function calling." },
      { d: "Day 6", goal: "Constrained decoding", task: "Compare regex parsing vs JSON schema; retire regex." },
      { d: "Day 7", goal: "Review", task: "Write when NOT to use CoT (latency, cost, simple tasks)." },
    ],
    milestone: "Advanced patterns are muscle memory, not novelty.",
    checkpoint: ["Know CoT trade-offs", "Use JSON schema by default", "Can implement self-consistency"],
  },
  {
    id: "w5", title: "Week 5 — Context Engineering", outcome: "Design context that fits, in the right order.",
    days: [
      { d: "Day 1", goal: "Budgeting", task: "Split a prompt: 10% instructions, 60% context, 30% output." },
      { d: "Day 2", goal: "Order", task: "Move stable prefix first; test cache hit rate." },
      { d: "Day 3", goal: "Compression", task: "Summarise 10 chat turns into a running memory." },
      { d: "Day 4", goal: "Lost-in-middle", task: "Hide a fact mid-context — measure retrieval accuracy." },
      { d: "Day 5", goal: "Chunk tagging", task: "Tag each chunk with [id] and enforce citation." },
      { d: "Day 6", goal: "Abstain", task: "Add 'I don't know' authorisation; measure abstain rate." },
      { d: "Day 7", goal: "Review", task: "Refactor an old prompt using week-5 techniques." },
    ],
    milestone: "You engineer context deliberately, not by copy-paste.",
    checkpoint: ["Prompt has explicit token budget", "Uses stable prefix", "Handles abstain"],
  },
  {
    id: "w6", title: "Week 6 — RAG & AI Agents", outcome: "Build a small RAG + a single-tool agent.",
    days: [
      { d: "Day 1", goal: "Chunking", task: "Chunk a 40-page doc at 512 tokens with 15% overlap." },
      { d: "Day 2", goal: "Embedding + search", task: "Store in a vector DB; run top-5 retrieval." },
      { d: "Day 3", goal: "Rerank", task: "Add a cross-encoder reranker; compare answers." },
      { d: "Day 4", goal: "Grounded prompt", task: "Force answers only from context + citations." },
      { d: "Day 5", goal: "Tool calling", task: "Give the model one tool: web search. Test ReAct." },
      { d: "Day 6", goal: "Budgets", task: "Cap the agent at 6 steps, $0.10, 30 s." },
      { d: "Day 7", goal: "Review", task: "Compare RAG vs no-RAG on 10 questions; log wins/losses." },
    ],
    milestone: "You have a working RAG and a bounded agent.",
    checkpoint: ["Retrieval → rerank → LLM works", "Agent respects budgets", "Answers cite sources"],
  },
  {
    id: "w7", title: "Week 7 — Prompt Optimization", outcome: "Ship cheaper, faster, more accurate prompts.",
    days: [
      { d: "Day 1", goal: "Shorten", task: "Cut every prompt by 30%; ensure quality is unchanged." },
      { d: "Day 2", goal: "Cache", task: "Split into stable + volatile parts; verify cache hit." },
      { d: "Day 3", goal: "Routing", task: "Route easy calls to a small model; escalate on low confidence." },
      { d: "Day 4", goal: "Batching", task: "Batch 10 classifications into 1 call; measure savings." },
      { d: "Day 5", goal: "Golden set", task: "Hand-label 30 examples; run 3 prompt versions against it." },
      { d: "Day 6", goal: "LLM-as-judge", task: "Compare v1 vs v2 pairwise with position randomisation." },
      { d: "Day 7", goal: "Review", task: "Publish a 1-page prompt-optimisation report." },
    ],
    milestone: "You optimise by measurement, not intuition.",
    checkpoint: ["Have a golden set", "Track cost + latency", "Can defend a prompt change with numbers"],
  },
  {
    id: "w8", title: "Week 8 — Portfolio Project", outcome: "Publish one polished project with README + evals.",
    days: [
      { d: "Day 1", goal: "Scope", task: "Pick one problem (RAG chatbot / SQL copilot / receipt extractor)." },
      { d: "Day 2", goal: "Build v1", task: "Ship the naive version; log every call." },
      { d: "Day 3", goal: "Add eval", task: "Hand-label 20 examples; capture baseline score." },
      { d: "Day 4", goal: "Improve", task: "Apply weeks 5–7 techniques; measure improvement." },
      { d: "Day 5", goal: "Guardrails", task: "Add injection defence + PII scrub + abstain." },
      { d: "Day 6", goal: "Polish", task: "Write README, demo GIF, cost/latency table." },
      { d: "Day 7", goal: "Ship", task: "Publish to GitHub + share for feedback." },
    ],
    milestone: "You have a real project to show in interviews.",
    checkpoint: ["README explains the stack", "Eval numbers are public", "Guardrails documented"],
  },
];

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Learn Prompt Engineering on a fixed 8-week schedule you can actually finish.</li>
          <li>Turn theory into daily 30–60 minute practice.</li>
          <li>Track progress with weekly milestones and readiness checkpoints.</li>
          <li>End the plan with one polished portfolio project.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80"
          caption="8-week step-by-step plan — daily goals, weekly milestones, one capstone project."
        />
      </Section>

      <Section id="prereq" title="1. Learning Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfortable using a web browser and a text editor.</li>
          <li>Basic reading of Python or JavaScript (needed from Week 6).</li>
          <li>Access to at least one frontier model (ChatGPT / Claude / Gemini).</li>
          <li>~5–7 hours per week, ideally spread as 45 minutes a day.</li>
        </ul>
        <Callout tone="tip" title="Study rhythm">
          Six short sessions beat one weekend cram. Daily practice compounds.
        </Callout>
      </Section>

      {WEEKS.map((w) => (
        <Section key={w.id} id={w.id} title={w.title}>
          <p><strong>Outcome:</strong> {w.outcome}</p>
          <div className="mt-3 space-y-2">
            {w.days.map((d) => (
              <div key={d.d} className="rounded-md border p-3 text-sm">
                <div className="font-semibold">{d.d} — {d.goal}</div>
                <div className="text-muted-foreground">{d.task}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="font-semibold">Milestone</div>
            <p className="text-sm">{w.milestone}</p>
            <div className="mt-2 font-semibold">Revision checkpoint</div>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {w.checkpoint.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </Section>
      ))}

      <Section id="career" title="10. Career Roadmap">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Entry roles</strong>: AI Engineer, LLM Engineer, Applied AI, ML Engineer.</li>
          <li><strong>Adjacent roles</strong>: DevRel, AI PM, Solutions Architect, Data Scientist.</li>
          <li><strong>Certifications</strong>: DeepLearning.AI · Google Cloud GenAI · Microsoft AI-102 · AWS AI Practitioner · NVIDIA NLP.</li>
          <li><strong>Interview prep</strong>: whiteboard RAG, debug live prompts, design eval pipelines.</li>
          <li><strong>Portfolio</strong>: 3 projects — one RAG, one agent, one integration — each with README + eval numbers.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80"
          caption="Career progression — build → publish → interview → ship in production."
        />
      </Section>

      <Section id="review" title="Step-by-Step Review">
        <h3 className="font-semibold">Weekly progress tracker</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Week</th><th className="text-left p-2">Milestone</th></tr></thead>
          <tbody>
            {WEEKS.map((w) => (
              <tr key={w.id} className="border-b"><td className="p-2">{w.title.split(" — ")[0]}</td><td className="p-2">{w.milestone}</td></tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-4 font-semibold">Learning milestones</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Week 2 — you write structured prompts by default.</li>
          <li>Week 4 — you know when advanced patterns help.</li>
          <li>Week 6 — you can build a RAG and a small agent.</li>
          <li>Week 8 — one portfolio project shipped.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Final checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Have a golden set of ≥30 examples.</li>
          <li>Have a prompt library in git with a README per prompt.</li>
          <li>Track cost + latency + accuracy for your capstone.</li>
          <li>Have shipped one project publicly.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Next learning path</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Move on to fine-tuning (LoRA, PEFT, DPO).</li>
          <li>Learn one observability tool (LangSmith / Langfuse).</li>
          <li>Contribute to an open-source LLM tool.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Milestone</strong> — verifiable weekly outcome.</li>
          <li><strong>Checkpoint</strong> — short revision quiz to gate progress.</li>
          <li><strong>Golden set</strong> — labelled eval examples.</li>
          <li><strong>Capstone</strong> — end-of-plan portfolio project.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I compress this to 4 weeks?">Yes if full-time. Otherwise the 8-week rhythm sticks better.</FAQItem>
        <FAQItem q="Do I need a paid API?">Free tiers cover weeks 1–5. Weeks 6–8 benefit from small paid usage.</FAQItem>
        <FAQItem q="What if I miss a day?">Move it to Sunday. Don't stack multiple days — attention degrades.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, industry standards, and trusted educational resources. Prompt Engineering techniques, AI models, APIs, frameworks, and best practices evolve continuously — consult official documentation for the latest information. All trademarks, product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
