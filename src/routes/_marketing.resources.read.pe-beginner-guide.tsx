import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pe-beginner-guide",
  title: "Prompt Engineering — Beginner Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 16,
  lastUpdated: "July 2026",
  tags: ["Prompt Engineering", "Prompts", "LLM"],
  heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
  heroSubtitle:
    "A gentle introduction to Prompt Engineering — what LLMs actually do, how a prompt is structured, and how to write clear, effective prompts from your very first try.",
};

const TOC: TocItem[] = [
  { id: "what", label: "1. What is Prompt Engineering?" },
  { id: "why", label: "2. Why It Matters" },
  { id: "llm", label: "3. Understanding LLMs" },
  { id: "anatomy", label: "4. Anatomy of a Prompt" },
  { id: "types", label: "5. Types of Prompts" },
  { id: "components", label: "6. Prompt Components" },
  { id: "patterns", label: "7. Basic Prompt Patterns" },
  { id: "better", label: "8. Writing Better Prompts" },
  { id: "mistakes", label: "9. Common Beginner Mistakes" },
  { id: "exercises", label: "10. First Hands-on Exercises" },
  { id: "usecases", label: "11. Practical Use Cases" },
  { id: "summary", label: "12. Summary" },
  { id: "review", label: "Beginner Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Complete Tutorial", tag: "AI & Data", time: "64 min" },
  { title: "Prompt Engineering — Step-by-Step Learning Guide", tag: "AI & Data", time: "21 min" },
  { title: "Prompt Engineering — Glossary", tag: "AI & Data", time: "14 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pe-beginner-guide")({
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

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand what Prompt Engineering is — and what it is not.</li>
          <li>Build a simple mental model of how an LLM reads your words.</li>
          <li>Write your first structured, effective prompts.</li>
          <li>Recognise the most common beginner mistakes and how to avoid them.</li>
        </ul>
      </Section>

      <Section id="what" title="1. What is Prompt Engineering?">
        <p>
          <strong>Prompt Engineering</strong> is the practice of writing instructions for an AI language model so that it produces the output you want, reliably. Think of the AI as an incredibly well-read colleague who has never met you and cannot ask questions — every detail it needs must be in your message.
        </p>
        <Callout tone="info" title="Analogy: ordering a coffee">
          "Coffee please" might get you anything. "A medium oat-milk latte, one sugar, extra hot, to-go" gets you exactly what you wanted. Prompts work the same way.
        </Callout>
      </Section>

      <Section id="why" title="2. Why Prompt Engineering Matters">
        <ul className="list-disc space-y-1 pl-5">
          <li>Same model, better prompt = dramatically better answers.</li>
          <li>Good prompts reduce cost (fewer retries) and time (fewer edits).</li>
          <li>Bad prompts create hallucinations, wrong formats, and off-topic replies.</li>
          <li>It's the single fastest skill lever for anyone using AI at work.</li>
        </ul>
        <Figure
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80"
          caption="Prompt lifecycle — write, send, read, refine. Small edits produce big changes in output."
        />
      </Section>

      <Section id="llm" title="3. Understanding Large Language Models">
        <p>
          A Large Language Model (LLM) is trained on huge amounts of text and learns one very specific skill: <em>predict the next word</em>. Everything you see — answers, code, essays — is thousands of these next-word predictions strung together.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>It doesn't 'know' facts</strong> — it recalls patterns statistically.</li>
          <li><strong>It has no memory between chats</strong> unless the app gives it some.</li>
          <li><strong>It can be confidently wrong</strong> — plausible-sounding wrong answers are called hallucinations.</li>
          <li><strong>It reads tokens, not words</strong> — sub-word chunks. "unbelievable" ≈ 3 tokens.</li>
        </ul>
        <Callout tone="tip" title="Mental model">
          Treat the model as a very smart intern who reads what you write literally, forgets everything after the conversation, and never asks 'huh?'.
        </Callout>
      </Section>

      <Section id="anatomy" title="4. Anatomy of a Prompt">
        <pre className="rounded-md bg-muted p-3 text-xs overflow-x-auto">{`[Role]        You are a friendly cooking coach.
[Objective]   Suggest a 20-minute vegetarian dinner.
[Context]     I have rice, chickpeas, spinach, garlic and lemon.
[Constraints] Beginner-friendly. No unusual equipment.
[Format]      Return a numbered recipe with prep time per step.`}</pre>
        <p className="mt-2">Every good prompt has some (not always all) of these five blocks. Missing pieces = the model guesses.</p>
      </Section>

      <Section id="types" title="5. Types of Prompts">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="text-left p-2">Type</th><th className="text-left p-2">Meaning</th><th className="text-left p-2">Example</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Zero-shot</td><td className="p-2">Instruction only</td><td className="p-2">"Summarise this article in 3 bullets."</td></tr>
            <tr className="border-b"><td className="p-2">One-shot</td><td className="p-2">One example</td><td className="p-2">Show one Q&amp;A pair, then ask the real one.</td></tr>
            <tr className="border-b"><td className="p-2">Few-shot</td><td className="p-2">Several examples</td><td className="p-2">3–5 pairs so the model copies the pattern.</td></tr>
            <tr><td className="p-2">Chain-of-thought</td><td className="p-2">Ask for reasoning</td><td className="p-2">"Think step by step, then answer."</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="components" title="6. Prompt Components">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>System message</strong> — sets identity and rules ("You are…").</li>
          <li><strong>User message</strong> — your actual question.</li>
          <li><strong>Assistant message</strong> — the model's reply.</li>
          <li><strong>Context</strong> — extra info (documents, prior turns).</li>
          <li><strong>Output format</strong> — how the answer should look (list, JSON, table).</li>
        </ul>
      </Section>

      <Section id="patterns" title="7. Basic Prompt Patterns">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Persona</strong> — "Act as a career coach…"</li>
          <li><strong>Recipe</strong> — step-by-step instructions.</li>
          <li><strong>Template</strong> — fill-in-the-blank output format.</li>
          <li><strong>Flipped interaction</strong> — the model asks you questions first.</li>
          <li><strong>Constraint</strong> — "Do not mention…", "Answer in under 50 words."</li>
        </ul>
      </Section>

      <Section id="better" title="8. Writing Better Prompts">
        <ol className="list-decimal space-y-1 pl-5">
          <li>State the goal in one sentence.</li>
          <li>Give the model a role only if it changes tone or expertise.</li>
          <li>Provide context — the model can't read your screen.</li>
          <li>Say what you want AND what to avoid.</li>
          <li>End with an output template the model can complete.</li>
        </ol>
      </Section>

      <Section id="mistakes" title="9. Common Beginner Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Writing one giant paragraph instead of structured blocks.</li>
          <li>Assuming the model remembers you between sessions.</li>
          <li>Being vague ("make it good") — models can't guess "good".</li>
          <li>Not giving examples when the format is unusual.</li>
          <li>Trusting the first answer without checking facts.</li>
          <li>Forgetting to say "answer only from the text below".</li>
        </ul>
      </Section>

      <Section id="exercises" title="10. First Hands-on Prompt Exercises">
        <div className="space-y-3">
          <div className="rounded-md border p-3">
            <div className="font-semibold">Exercise 1 — Rewrite for clarity</div>
            <p className="text-sm">Turn <em>"tell me about python"</em> into a structured prompt with role, objective, constraints and format.</p>
          </div>
          <div className="rounded-md border p-3">
            <div className="font-semibold">Exercise 2 — Add constraints</div>
            <p className="text-sm">Ask for a birthday message and constrain: under 40 words, no emojis, warm tone.</p>
          </div>
          <div className="rounded-md border p-3">
            <div className="font-semibold">Exercise 3 — One-shot example</div>
            <p className="text-sm">Provide one example of a good product tagline, then ask for three more in the same style.</p>
          </div>
          <div className="rounded-md border p-3">
            <div className="font-semibold">Exercise 4 — Chain-of-thought</div>
            <p className="text-sm">Ask a small maths word problem twice — once plain, once with "think step by step". Compare answers.</p>
          </div>
        </div>
        <Figure
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80"
          caption="Practice loop — write → test → observe → refine. This is where all prompt skill comes from."
        />
      </Section>

      <Section id="usecases" title="11. Practical Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li>Summarising long articles into bullets.</li>
          <li>Turning meeting notes into action items.</li>
          <li>Drafting emails in a specific tone.</li>
          <li>Explaining a topic at 5 different levels of depth.</li>
          <li>Extracting data from unstructured text.</li>
          <li>Brainstorming names, ideas or counter-arguments.</li>
        </ul>
      </Section>

      <Section id="summary" title="12. Summary">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prompt Engineering is <em>clear communication</em> with a very literal reader.</li>
          <li>Great prompts have five parts: role, objective, context, constraints, format.</li>
          <li>Better prompts beat bigger models on most everyday tasks.</li>
          <li>Practise by rewriting your worst prompts, not by memorising rules.</li>
        </ul>
      </Section>

      <Section id="review" title="Beginner Review">
        <h3 className="font-semibold">Key takeaways</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>LLMs predict next tokens — they don't 'understand' like humans.</li>
          <li>Structure beats length; constraints beat hope.</li>
          <li>An example is worth 100 words of description.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Self assessment</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Explain the difference between zero-shot and few-shot prompting.</li>
          <li>List three ways to reduce hallucinations.</li>
          <li>Rewrite a vague prompt into a structured one using all five components.</li>
        </ol>
        <h3 className="mt-4 font-semibold">Practice questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>What does 'context' mean in a prompt?</li>
          <li>Why does temperature=0 make output more deterministic?</li>
          <li>Give two use cases where chain-of-thought helps and one where it doesn't.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Prompt</strong> — the text you send to the model.</li>
          <li><strong>Token</strong> — sub-word chunk (~4 characters).</li>
          <li><strong>Context window</strong> — max tokens the model can read at once.</li>
          <li><strong>Hallucination</strong> — confident but incorrect answer.</li>
          <li><strong>Zero-shot</strong> — prompt with no examples.</li>
          <li><strong>Few-shot</strong> — prompt with several examples.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I need coding to learn Prompt Engineering?">No for basics. Just a ChatGPT / Claude / Gemini account.</FAQItem>
        <FAQItem q="Is 'polite' language necessary?">Not really. Clear is far more valuable than polite.</FAQItem>
        <FAQItem q="What next?">Move on to the Prompt Engineering — Complete Tutorial and Step-by-Step Learning Guide.</FAQItem>
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
