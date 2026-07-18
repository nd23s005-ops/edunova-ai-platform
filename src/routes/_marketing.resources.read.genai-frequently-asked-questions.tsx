import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "genai-frequently-asked-questions",
  title: "Generative AI — Frequently Asked Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 10,
  lastUpdated: "May 2026",
  tags: ["FAQ", "Generative AI", "Beginner", "LLMs", "Prompting"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "The 100+ most-asked Generative AI questions, answered in plain English with real examples, common mistakes and beginner tips.",
};

const TOC: TocItem[] = [
  { id: "c1", label: "Ch 1 — Introduction" },
  { id: "sa", label: "A · AI Basics" },
  { id: "sb", label: "B · LLMs" },
  { id: "sc", label: "C · Prompt Engineering" },
  { id: "sd", label: "D · AI Tools" },
  { id: "se", label: "E · Career" },
  { id: "sf", label: "F · Technical" },
  { id: "sg", label: "G · Ethics & Security" },
  { id: "sh", label: "H · Real-world Usage" },
  { id: "c3", label: "Ch 3 — Myth vs Fact" },
  { id: "c4", label: "Ch 4 — Quick Tips" },
  { id: "c5", label: "Ch 5 — Troubleshooting" },
  { id: "quiz", label: "Mini Quiz" },
  { id: "c6", label: "Ch 6 — Final Summary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Generative AI — Beginner Guide", tag: "AI & Data", time: "40 min" },
  { title: "Generative AI — Complete Tutorial", tag: "AI & Data", time: "49 min" },
  { title: "Generative AI — Practice Questions", tag: "AI & Data", time: "25 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/genai-frequently-asked-questions")({
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

// Reusable FAQ card
function QA({
  q, short, detail, example, tip, mistake, related, further, level = "Beginner",
}: {
  q: string; short: string; detail: string; example: string; tip: string;
  mistake: string; related: string; further: string; level?: "Beginner" | "Intermediate" | "Advanced";
}) {
  const badgeTone =
    level === "Beginner" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
    : level === "Intermediate" ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
    : "bg-rose-500/10 text-rose-600 border-rose-500/30";
  return (
    <div className="my-3 rounded-2xl border bg-card/60 p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h4 className="font-semibold leading-snug">Q. {q}</h4>
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeTone}`}>{level}</span>
      </div>
      <p className="text-sm"><strong>Short:</strong> {short}</p>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      <ul className="mt-2 space-y-1 text-sm">
        <li>💡 <strong>Example:</strong> {example}</li>
        <li>✅ <strong>Beginner tip:</strong> {tip}</li>
        <li>⚠️ <strong>Common mistake:</strong> {mistake}</li>
        <li>🔗 <strong>Related:</strong> {related}</li>
        <li>📚 <strong>Further reading:</strong> {further}</li>
      </ul>
    </div>
  );
}

function Myth({ n, myth, fact }: { n: number; myth: string; fact: string }) {
  return (
    <div className="my-2 grid gap-2 rounded-xl border p-3 md:grid-cols-2">
      <div className="rounded-lg bg-red-500/5 p-2 text-sm"><strong>#{n} ❌ Myth:</strong> {myth}</div>
      <div className="rounded-lg bg-emerald-500/5 p-2 text-sm"><strong>✅ Fact:</strong> {fact}</div>
    </div>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      {/* CH 1 */}
      <Section id="c1" title="Chapter 1 — Introduction">
        <p>
          This handbook answers the questions beginners actually ask about Generative AI — in
          plain English, with real examples, common pitfalls and a friendly tone. No hidden
          jargon, no math walls, no hype.
        </p>
        <h4 className="mt-3 font-semibold">Why these questions matter</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>They're the exact questions asked in interviews, classrooms and team standups.</li>
          <li>They separate confident users from lucky ones.</li>
          <li>They form the vocabulary you need to keep learning.</li>
        </ul>
        <h4 className="mt-3 font-semibold">How to use this handbook</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Skim the table of contents; jump to the section you need.</li>
          <li>Read one FAQ card at a time — question, short answer, then details.</li>
          <li>Try the tip on a real chatbot before moving on.</li>
        </ol>
        <Callout tone="tip" title="Learning objectives">
          After this handbook you will be able to explain what GenAI is, describe LLMs and prompts,
          use popular AI tools confidently, avoid common mistakes, and plan your next learning step.
        </Callout>
      </Section>

      {/* SECTION A */}
      <Section id="sa" title="Section A — AI Basics">
        <QA q="What is Artificial Intelligence (AI)?"
          short="AI is software that mimics human-like abilities such as reading, writing, seeing and deciding."
          detail="AI is an umbrella term. It covers everything from spam filters to self-driving cars. Modern AI usually means machine learning: programs that learn patterns from data instead of following hard-coded rules."
          example="Gmail predicting the next word in your email is AI in action."
          tip="Whenever you hear 'AI', ask: is this rules, machine learning, or a generative model?"
          mistake="Assuming all AI is 'smart'. Most AI is very narrow — great at one job only."
          related="Machine Learning, Deep Learning, Generative AI"
          further="Stuart Russell & Peter Norvig — AI: A Modern Approach (intro chapters)"/>
        <QA q="What is Machine Learning (ML)?"
          short="A branch of AI where models learn patterns from examples."
          detail="Instead of writing rules, you show the model many labelled examples and it learns to generalise. Common flavours: supervised (with labels), unsupervised (without labels) and reinforcement learning (via rewards)."
          example="Netflix recommending movies based on what you watched."
          tip="If you can describe the task as inputs → outputs with examples, ML is a candidate."
          mistake="Confusing ML with statistics; ML uses stats but focuses on prediction, not inference."
          related="Deep Learning, Datasets, Features"
          further="Andrew Ng — Machine Learning Specialisation on Coursera"/>
        <QA q="What is Deep Learning?"
          short="ML using multi-layer neural networks that learn features automatically."
          detail="Deep learning stacks many small mathematical units (neurons) into layers. With enough data and compute, these networks discover useful representations by themselves."
          example="A face-unlock model learns edges, then shapes, then faces automatically."
          tip="Deep learning shines when data is abundant and features are hard to hand-design (images, text, audio)."
          mistake="Using deep learning on tiny tabular datasets — classical ML often wins there."
          related="Neural Networks, GPUs, Backpropagation"
          further="fast.ai Practical Deep Learning course"/>
        <QA q="What is Generative AI?"
          short="AI that produces new content — text, images, audio, video, code — instead of just labels."
          detail="Generative models learn the distribution of training data and can sample from it. The most popular kind today is the Large Language Model."
          example="ChatGPT writing a cover letter, or Midjourney generating a poster."
          tip="Treat GenAI as a fluent intern: fast and creative, but must be checked."
          mistake="Assuming outputs are facts. They're plausible predictions."
          related="LLMs, Diffusion Models, Prompting"
          further="Google — Introduction to Generative AI (free)"/>
        <QA q="How is Generative AI different from traditional AI?"
          short="Traditional AI predicts a label; Generative AI creates new content."
          detail="A spam filter says 'spam / not spam'. A generative model writes the email itself. Traditional AI is discriminative; GenAI is generative."
          example="Classifier: 'this review is negative.' Generative: 'here's a polite reply to that review.'"
          tip="Pair them: classify first, then generate the right response."
          mistake="Using GenAI where a small classifier is faster and cheaper."
          related="Classification, LLMs, Prompt Engineering"
          further="OpenAI Cookbook — classification vs generation patterns"/>
        <QA q="Can AI think like humans?"
          short="No. It matches patterns; it doesn't have goals, feelings or awareness."
          detail="LLMs predict likely next tokens. They can sound thoughtful, but there is no inner life driving the words."
          example="Ask an LLM 'are you conscious?' — the answer is text prediction, not experience."
          tip="Interpret AI output as capable-sounding text, not as a mind."
          mistake="Anthropomorphising the model and trusting emotional cues."
          related="AGI, Consciousness, Alignment"
          further="Bender et al. — 'On the Dangers of Stochastic Parrots'"/>
        <QA q="Is AI intelligent?"
          short="AI is competent at narrow tasks; that's not the same as human intelligence."
          detail="It can be brilliant at code completion and useless at common sense in the same minute. Benchmarks measure specific skills, not general intelligence."
          example="An LLM solving LeetCode but failing 'how many R's in strawberry?'."
          tip="Judge intelligence per task, not overall."
          mistake="Generalising a single impressive demo to 'AI is smart'."
          related="Narrow AI, AGI, Benchmarks"
          further="Melanie Mitchell — Artificial Intelligence: A Guide for Thinking Humans"/>
        <QA q="Will AI replace humans?"
          short="It will replace tasks, not roles — and it creates new ones."
          detail="History repeats: calculators, spreadsheets and search engines shifted work upward. Roles evolve around the tool."
          example="Programmers now review AI code more than they type boilerplate."
          tip="Focus on skills AI can't fake yet: judgement, taste, communication, ownership."
          mistake="Ignoring AI hoping it goes away — it won't."
          related="Automation, Reskilling, AI Careers"
          further="World Economic Forum — Future of Jobs Report"/>
      </Section>

      {/* SECTION B */}
      <Section id="sb" title="Section B — Large Language Models (LLMs)">
        <QA q="What is a Large Language Model (LLM)?"
          short="A very large neural network trained to predict the next token of text."
          detail="LLMs are trained on billions of words. Given a prompt, they output one token at a time until the reply is complete."
          example="GPT-4o, Claude 3.5, Gemini 1.5, Llama-3.1 are LLMs."
          tip="Everything an LLM does is next-token prediction; capabilities emerge from scale + training."
          mistake="Thinking the model 'searches the internet' by default — it doesn't unless a tool is attached."
          related="Transformers, Tokens, Fine-tuning"
          further="Anthropic — 'A Small Look Inside a Large Model'"/>
        <QA q="What does GPT mean?"
          short="Generative Pre-trained Transformer."
          detail="It's the family of models from OpenAI: transformer architecture, pre-trained on text, then aligned with human feedback."
          example="ChatGPT is a product built on GPT-family models."
          tip="'GPT' is an architecture name — not a synonym for 'AI'."
          mistake="Calling every chatbot 'GPT'."
          related="Transformers, RLHF, OpenAI"
          further="Radford et al., 2018 — 'Improving Language Understanding by Generative Pre-Training'"/>
        <QA q="What is Gemini?"
          short="Google DeepMind's family of multimodal LLMs (text, image, audio, video)."
          detail="Gemini models come in Ultra, Pro, Flash and Nano variants. Flash is fast/cheap; Ultra is the strongest."
          example="Gemini 1.5 Flash handles millions of tokens of context."
          tip="Use Flash for cheap high-volume tasks, Pro for quality-critical answers."
          mistake="Confusing Gemini (Google) with Gemma (Google's open-weight family)."
          related="Multimodal AI, Google DeepMind, Long Context"
          further="Gemini Technical Report (Google DeepMind, 2024)"/>
        <QA q="What is Claude?"
          short="Anthropic's LLM family, known for careful reasoning and long context."
          detail="Claude 3.5 Sonnet, Haiku and Opus. Trained with 'Constitutional AI' for safer behaviour."
          example="Great for long documents, code review and structured tasks."
          tip="Try Claude for tasks requiring careful, structured writing."
          mistake="Comparing models on one prompt only — build a small benchmark."
          related="Constitutional AI, Anthropic, Safety"
          further="Anthropic — 'Constitutional AI: Harmlessness from AI Feedback'"/>
        <QA q="What is Llama?"
          short="Meta's family of open-weight LLMs you can self-host."
          detail="Llama 3.1 comes in 8B, 70B and 405B sizes. Open weights let you fine-tune and run privately."
          example="A startup runs Llama-3.1-8B on their own GPU for on-prem support."
          tip="Open weights ≠ open training data. Read the licence."
          mistake="Assuming self-hosted is always cheaper — GPUs and ops add up."
          related="Open-weight models, Ollama, vLLM"
          further="Meta Llama 3 tech report"/>
        <QA q="What is DeepSeek?"
          short="A Chinese open-weight LLM family with strong reasoning at low cost."
          detail="DeepSeek-V3 and DeepSeek-R1 sparked global attention for near-frontier reasoning at a fraction of training cost."
          example="Developers fine-tune DeepSeek for math and coding tasks."
          tip="Follow open-weight releases monthly — the frontier moves fast."
          mistake="Ignoring open-weight models because 'closed models are always better'."
          related="Open weights, Reasoning models, MoE"
          further="DeepSeek-V3 technical report"/>
        <QA q="Why are LLMs so powerful?"
          short="Scale + attention + huge, diverse training data."
          detail="Bigger models trained on more text learn richer patterns. Transformer attention lets them use context effectively."
          example="A 70B-parameter model can summarise, translate and code with one architecture."
          tip="Capability grows with scale — but so does cost and latency."
          mistake="Assuming bigger = always better; smaller specialised models often win on tasks."
          related="Scaling Laws, Emergent Abilities, Transformers"
          further="Kaplan et al. — 'Scaling Laws for Neural Language Models'"/>
        <QA q="How do LLMs generate answers?"
          short="They predict the most likely next token, one at a time, using your prompt as context."
          detail="Each token becomes part of the input for the next step. Sampling settings (temperature, top-p) control randomness."
          example="Given 'The capital of France is', the model produces 'Paris' as the most likely next token."
          tip="Lower temperature = more predictable; higher = more creative."
          mistake="Expecting deterministic answers at high temperature."
          related="Tokens, Sampling, Decoding"
          further="Jay Alammar — 'The Illustrated Transformer'"/>
      </Section>

      {/* SECTION C */}
      <Section id="sc" title="Section C — Prompt Engineering">
        <QA q="What is a prompt?"
          short="The text you send to an LLM to guide its response."
          detail="A prompt can include instructions, examples, context, roles and output format."
          example="'Summarise this article in 3 bullet points for a 10-year-old.'"
          tip="Prompts are code — version them and test them."
          mistake="Sending vague requests like 'help me with this'."
          related="System prompt, User prompt, Templates"
          further="OpenAI — Prompt Engineering guide"/>
        <QA q="What makes a good prompt?"
          short="Clear goal, context, constraints, format and examples."
          detail="A good prompt tells the model who it is, what to do, what to avoid and how the output should look."
          example="'You are a legal editor. Rewrite the paragraph in plain English, ≤ 80 words, no legalese.'"
          tip="Show, don't just tell — add 1–2 examples."
          mistake="Piling on 12 rules — the model forgets some. Group them logically."
          related="Few-shot, Role prompting, Structured output"
          further="Anthropic — Prompt Engineering cookbook"/>
        <QA q="Why does prompt wording matter?"
          short="Small wording changes shift probabilities and answers."
          detail="LLMs are sensitive to phrasing, order and formatting. 'Explain like I'm 5' and 'explain simply' produce different tones."
          example="Adding 'step by step' improves reasoning accuracy on many tasks."
          tip="A/B test 3–5 prompt variants on the same input."
          mistake="Judging a prompt from a single sample."
          related="Chain of Thought, Instruction tuning"
          further="Wei et al. — 'Chain-of-Thought Prompting Elicits Reasoning'"/>
        <QA q="What is Zero-shot prompting?"
          short="Asking without giving any examples."
          detail="You describe the task in plain English and rely on the model's training."
          example="'Translate this sentence to French.'"
          tip="Try zero-shot first. Add examples only if the output is off."
          mistake="Adding examples for tasks the model already handles well — wastes tokens."
          related="Few-shot, Instruction following"
          further="Brown et al., 2020 — 'Language Models are Few-Shot Learners'"/>
        <QA q="What is Few-shot prompting?"
          short="Adding 1–5 examples inside the prompt to teach the pattern."
          detail="Examples make the desired format and style crystal clear to the model."
          example="Provide 3 (question, JSON) pairs, then ask for the 4th."
          tip="Diversify examples so the model doesn't overfit to one style."
          mistake="Using near-identical examples — the model just copies them."
          related="In-context learning, Prompt templates"
          further="OpenAI — Prompting techniques guide"/>
        <QA q="What is Role prompting?"
          short="Telling the model who it is at the start of the prompt."
          detail="Roles bias tone and depth: 'You are a senior editor', 'You are a math tutor for a 10-year-old'."
          example="System: 'You are a friendly Python tutor. Never give the full answer; give hints.'"
          tip="Roles work best when paired with clear constraints."
          mistake="Assuming a role alone guarantees expert answers — it doesn't."
          related="System prompt, Persona"
          further="Anthropic — Role prompting recipes"/>
        <QA q="What is Chain-of-Thought (CoT) prompting?"
          short="Asking the model to reason step by step before answering."
          detail="CoT nudges the model to expose intermediate steps, improving accuracy on math, logic and code tasks."
          example="'Solve step by step, then give the final answer on a new line.'"
          tip="Combine CoT with 'return only the final answer' for cleaner outputs when needed."
          mistake="Using CoT for trivial tasks — it wastes tokens."
          related="Reasoning, Self-consistency"
          further="Wei et al., 2022 — CoT paper"/>
        <QA q="How can I improve my prompts fast?"
          short="Iterate: add examples, constraints, structure, and measure."
          detail="Start simple, run 5 tests, pick the best, tighten. Save winners as templates."
          example="Add: role, task, constraints, format, 1 example, and a 'don't do' list."
          tip="Keep a personal prompt library organised by task."
          mistake="Rewriting from scratch each time instead of editing what works."
          related="Prompt templates, Evaluation"
          further="Simon Willison — 'Prompt engineering'"/>
      </Section>

      {/* SECTION D */}
      <Section id="sd" title="Section D — AI Tools">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Tool</th><th className="p-2 text-left">What it's for</th><th className="p-2 text-left">Best use</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">ChatGPT</td><td className="p-2">General chat, coding, writing</td><td className="p-2">Everyday productivity</td></tr>
            <tr className="border-b"><td className="p-2">Gemini</td><td className="p-2">Chat + Google Workspace</td><td className="p-2">Long docs, multimodal</td></tr>
            <tr className="border-b"><td className="p-2">Claude</td><td className="p-2">Careful reasoning, long context</td><td className="p-2">Editing, structured tasks</td></tr>
            <tr className="border-b"><td className="p-2">Perplexity</td><td className="p-2">Answer engine with citations</td><td className="p-2">Research questions</td></tr>
            <tr className="border-b"><td className="p-2">Cursor</td><td className="p-2">AI-first code editor</td><td className="p-2">Building apps faster</td></tr>
            <tr className="border-b"><td className="p-2">GitHub Copilot</td><td className="p-2">Inline code completion</td><td className="p-2">Everyday coding in VS Code</td></tr>
            <tr className="border-b"><td className="p-2">Midjourney</td><td className="p-2">Text-to-image (artistic)</td><td className="p-2">Posters, concept art</td></tr>
            <tr className="border-b"><td className="p-2">DALL·E</td><td className="p-2">Text-to-image inside ChatGPT</td><td className="p-2">Quick illustrations</td></tr>
            <tr className="border-b"><td className="p-2">Canva AI</td><td className="p-2">AI features inside Canva</td><td className="p-2">Social posts, decks</td></tr>
            <tr className="border-b"><td className="p-2">Gamma AI</td><td className="p-2">AI slide decks & docs</td><td className="p-2">Pitch decks in minutes</td></tr>
            <tr className="border-b"><td className="p-2">Runway ML</td><td className="p-2">AI video generation & editing</td><td className="p-2">Short cinematic clips</td></tr>
            <tr className="border-b"><td className="p-2">Suno AI</td><td className="p-2">AI music from text</td><td className="p-2">Jingles, demos</td></tr>
            <tr><td className="p-2">Leonardo AI</td><td className="p-2">Text-to-image (game/design)</td><td className="p-2">Game assets, mockups</td></tr>
          </tbody>
        </table>

        <QA q="Which AI tool should a beginner start with?"
          short="ChatGPT (or Gemini) for text; DALL·E or Midjourney for images."
          detail="Pick one general chatbot and one image tool. Master them before adding more."
          example="Write, brainstorm and code in ChatGPT; make one poster in Midjourney."
          tip="Use the free tier for a week; upgrade only when you hit real limits."
          mistake="Subscribing to five tools before finishing one project."
          related="AI stack, Free tiers"
          further="Zapier — 'Best AI tools for beginners'"/>
      </Section>

      {/* SECTION E */}
      <Section id="se" title="Section E — Career Questions">
        <QA q="How do I start learning Generative AI?"
          short="Learn prompts → basics of Python + APIs → RAG → build 3 small projects."
          detail="Start with prompt engineering, then a bit of Python to call APIs, then Retrieval-Augmented Generation, then agents."
          example="Build a study-notes summariser in one weekend."
          tip="Ship something in week 1, however small."
          mistake="Studying theory for months without shipping code."
          related="Roadmaps, Projects"
          further="EduNova AI — Learning Roadmap resource"/>
        <QA q="Which programming language should I learn?"
          short="Python — it's the default for AI."
          detail="Almost every SDK, framework and tutorial is Python-first. JavaScript/TypeScript is a strong second for full-stack AI apps."
          example="OpenAI, LangChain, LlamaIndex, Hugging Face — all Python-first."
          tip="Learn just enough Python to run scripts and call APIs — not full CS."
          mistake="Waiting until you 'know Python well' to touch AI."
          related="Python basics, APIs"
          further="Automate the Boring Stuff with Python"/>
        <QA q="Do I need mathematics?"
          short="Only a little. Intuition beats formulas for using GenAI."
          detail="For research you need linear algebra, probability and calculus. For building apps, you need almost none."
          example="You can ship a RAG app without ever multiplying a matrix by hand."
          tip="Learn math on demand — when a concept blocks you, not before."
          mistake="Delaying projects because 'I haven't finished linear algebra'."
          related="ML math, Statistics"
          further="3Blue1Brown — Neural Networks series"/>
        <QA q="Can non-programmers learn AI?"
          short="Yes — no-code + prompting take you a long way."
          detail="Tools like Zapier AI, Make, and platforms like Lovable let non-coders ship real AI apps."
          example="A marketer builds an AI content pipeline with Zapier + ChatGPT."
          tip="Learn prompts + one no-code tool first; add code later."
          mistake="Believing you must learn ML before using AI."
          related="No-code, Automation"
          further="Zapier AI academy"/>
        <QA q="What jobs use Generative AI?"
          short="Nearly every knowledge job — plus new AI-specific roles."
          detail="AI Engineer, Prompt Engineer, LLM Ops, AI Product Manager, ML Researcher, plus AI-enhanced roles in marketing, design, support and law."
          example="An AI Engineer builds RAG systems; an AI PM defines the roadmap."
          tip="Follow job posts weekly to see how titles evolve."
          mistake="Fixating on one title — pick a problem area instead."
          related="AI Engineer, MLOps"
          further="Chip Huyen — 'What is an AI engineer?'"/>
        <QA q="What are the salary expectations?"
          short="Wide range — from junior developer bands to top-tier research salaries."
          detail="Location, seniority, portfolio and company matter more than the title. AI-adjacent skills add a 10–40% premium in many markets."
          example="Junior AI Engineer in India: ₹8–20 LPA typical; US: $110–180K typical (2025)."
          tip="Focus on skills and shipped projects; salary follows."
          mistake="Chasing salaries into roles that don't match your interests."
          related="Career growth, Portfolio"
          further="Levels.fyi, Glassdoor, LinkedIn Salary"/>
        <QA q="Are certifications worth it?"
          short="Useful, not essential. Projects beat certificates."
          detail="A polished portfolio with 3 shipped AI apps outperforms a stack of certificates."
          example="Deploy a chatbot, a RAG app and an agent — put them on GitHub."
          tip="Do 1–2 respected certs (DeepLearning.AI, Google, AWS) for signalling."
          mistake="Collecting 15 certificates and building nothing."
          related="Portfolio, LinkedIn"
          further="DeepLearning.AI short courses"/>
      </Section>

      {/* SECTION F */}
      <Section id="sf" title="Section F — Technical Questions">
        <QA q="What is a token?"
          short="A chunk of text (roughly 4 characters or ~0.75 words in English) that the model reads/writes."
          detail="LLMs process text as tokens, not characters. Cost and context limits are counted in tokens."
          example="'ChatGPT is amazing' ≈ 4 tokens."
          tip="Use a tokenizer (e.g., tiktoken) to estimate cost before shipping."
          mistake="Confusing tokens with words 1:1 — they're not."
          related="Context window, Cost, Tokenizer"
          further="OpenAI — Tokenizer playground"/>
        <QA q="What are embeddings?"
          short="Numeric vectors that represent the meaning of text."
          detail="Similar meanings produce similar vectors. Used for search, clustering, and RAG."
          example="'dog' and 'puppy' have close embeddings; 'dog' and 'car' don't."
          tip="Start with `text-embedding-3-small` — cheap and strong."
          mistake="Embedding whole documents — chunk them first."
          related="Vector DB, RAG, Similarity"
          further="OpenAI Embeddings guide" level="Intermediate"/>
        <QA q="What is a Transformer?"
          short="The neural architecture behind almost every modern LLM."
          detail="Transformers use self-attention to look at all tokens in parallel, then predict the next one. Introduced in 'Attention Is All You Need' (2017)."
          example="GPT, Gemini, Claude, Llama — all transformers."
          tip="You don't need to derive the math to use LLMs."
          mistake="Confusing 'transformer' the model with power transformers 🙂."
          related="Attention, Encoder/Decoder"
          further="Vaswani et al., 2017 — 'Attention Is All You Need'" level="Intermediate"/>
        <QA q="What is Attention?"
          short="A mechanism that lets the model weigh which tokens matter most for each prediction."
          detail="Every output token 'attends' to relevant input tokens with learned weights."
          example="In 'The bank of the river', 'bank' attends to 'river' to pick the right meaning."
          tip="Attention is why LLMs handle context so well."
          mistake="Thinking attention is the same as human attention — it's just weighted averaging."
          related="Self-attention, Multi-head"
          further="Jay Alammar — 'The Illustrated Transformer'" level="Intermediate"/>
        <QA q="What is the Context Window?"
          short="The maximum tokens (input + output) a model can consider at once."
          detail="If your prompt + response exceeds the window, older tokens are truncated."
          example="Gemini 1.5 Pro supports up to 2M tokens; GPT-4o up to 128K."
          tip="Bigger context ≠ better answers — relevant context wins."
          mistake="Dumping entire PDFs when a summary works."
          related="Long-context models, Retrieval"
          further="Google — Long-context Gemini paper"/>
        <QA q="What is Temperature?"
          short="A knob that controls randomness in the output."
          detail="0 = deterministic, 1 = balanced, 2 = very random. Lower for facts, higher for creativity."
          example="Temperature 0.2 for extractive answers; 0.9 for poetry."
          tip="Change one knob at a time when tuning."
          mistake="Setting temperature high for factual tasks — hello, hallucinations."
          related="Top-k, Top-p"
          further="OpenAI — sampling parameters docs"/>
        <QA q="What are Top-k and Top-p?"
          short="Ways to limit which next tokens are considered when sampling."
          detail="Top-k keeps the k most likely tokens; Top-p keeps the smallest set whose probabilities sum to p."
          example="Top-p=0.9 usually gives natural, varied text."
          tip="Tune Top-p between 0.8–0.95 for most creative tasks."
          mistake="Combining low temperature with very low Top-p — text becomes robotic."
          related="Sampling, Decoding"
          further="Hugging Face — Text generation strategies" level="Intermediate"/>
        <QA q="What is Fine-tuning?"
          short="Continuing to train a model on your data so it adopts your style or task."
          detail="Useful when prompting can't achieve the style, brevity or format you need. LoRA is the popular cheap variant."
          example="Fine-tune a small model on your company's tone-of-voice."
          tip="Try prompts and RAG first; fine-tune last."
          mistake="Fine-tuning to teach facts — RAG usually beats it."
          related="LoRA, RAG, Training"
          further="Hugging Face PEFT docs" level="Intermediate"/>
        <QA q="What is RAG (Retrieval-Augmented Generation)?"
          short="Fetch relevant documents, then let the LLM answer using them."
          detail="RAG grounds answers in your data. Steps: embed docs → store vectors → retrieve top-k → prompt with context."
          example="A 'chat with your PDFs' app is classic RAG."
          tip="Always include citations; agents and users need to verify."
          mistake="Retrieving too much context — quality drops."
          related="Embeddings, Vector DB"
          further="LlamaIndex — RAG guide" level="Intermediate"/>
        <QA q="What is a Vector Database?"
          short="A DB that indexes vectors for fast nearest-neighbour search."
          detail="Examples: pgvector, Pinecone, Weaviate, Qdrant, Chroma, Milvus."
          example="Store embeddings of your knowledge base; query by meaning, not keywords."
          tip="Postgres + pgvector is enough for most startups."
          mistake="Over-engineering: choosing a vector DB before you need scale."
          related="Embeddings, ANN, HNSW"
          further="Pinecone Learn — Vector databases"/>
        <QA q="What is Inference?"
          short="Running a trained model to produce outputs."
          detail="Inference cost = compute + latency. Optimisations: batching, quantisation, KV cache, distillation."
          example="Every API call to GPT-4o is inference."
          tip="Latency matters more than accuracy for many products."
          mistake="Optimising training when the bottleneck is inference."
          related="Serving, vLLM, Ollama"
          further="vLLM docs" level="Intermediate"/>
        <QA q="What are Hallucinations?"
          short="Confident, plausible-sounding but wrong answers."
          detail="Caused by missing context, ambiguous prompts, or model limits. Mitigate with RAG, citations, and verification."
          example="An LLM inventing a paper title that doesn't exist."
          tip="Never trust an answer without a source for high-stakes work."
          mistake="Blaming the model when the prompt lacked context."
          related="Groundedness, RAG"
          further="Ji et al. — 'Survey of Hallucination in NLG'"/>
      </Section>

      {/* SECTION G */}
      <Section id="sg" title="Section G — Ethics & Security">
        <QA q="What is AI bias?"
          short="Systematic errors that disadvantage groups because training data or design was skewed."
          detail="Bias can enter through data, labelling, model choice or evaluation. It shows up as unfair outputs."
          example="A resume screener favouring one gender due to biased history data."
          tip="Test outputs across diverse inputs before shipping."
          mistake="Assuming 'the model is fair by default'."
          related="Fairness, Auditing"
          further="Barocas, Hardt, Narayanan — Fairness and Machine Learning"/>
        <QA q="How do I protect privacy when using AI?"
          short="Redact PII, use enterprise settings, and prefer opt-out or self-hosted options."
          detail="Public chatbots may retain data. Check the provider's data-use policy."
          example="Never paste customer PII into a public chatbot."
          tip="Use enterprise or on-prem models for sensitive workloads."
          mistake="Assuming 'chats are private' by default."
          related="GDPR, PII, DLP"
          further="EU GDPR overview"/>
        <QA q="Is AI safe?"
          short="It's safer with guardrails — otherwise risks include misuse, misinformation and prompt injection."
          detail="Layered defence: input validation, output filters, rate limits, human review, audit logs."
          example="A support bot that refuses medical or legal claims and escalates instead."
          tip="Design 'red-team' tests before launch."
          mistake="Shipping without any safety filters."
          related="Guardrails, Red-teaming"
          further="OWASP LLM Top 10"/>
        <QA q="Who owns AI-generated content?"
          short="It depends on jurisdiction and provider terms — often the user, sometimes with restrictions."
          detail="Copyright rules for AI outputs are evolving. Check the tool's licence."
          example="Some tools require attribution; some restrict commercial use on free tiers."
          tip="Read the terms of service before commercial use."
          mistake="Assuming 'if I generated it, I own it'."
          related="Copyright, Licences"
          further="U.S. Copyright Office — AI works guidance"/>
        <QA q="What is Responsible AI?"
          short="A practice of designing AI systems that are safe, fair, transparent and accountable."
          detail="Includes documentation (model cards), audits, monitoring and clear ownership."
          example="Publishing a model card with limitations before release."
          tip="Adopt a lightweight checklist per project — better than none."
          mistake="Treating ethics as a launch-blocker rather than a design input."
          related="Model cards, Ethics"
          further="Microsoft Responsible AI Standard"/>
        <QA q="What is Prompt Injection?"
          short="Malicious inputs that override your system prompt or leak data."
          detail="Attacker text ('ignore previous instructions and…') can hijack the model's behaviour, especially via retrieved documents."
          example="A user uploads a PDF that contains an instruction to reveal internal prompts."
          tip="Sanitise inputs; never grant tool access without checks."
          mistake="Trusting retrieved content as safe by default."
          related="Jailbreaks, Guardrails"
          further="Simon Willison — Prompt injection posts" level="Intermediate"/>
        <QA q="What is a Jailbreak?"
          short="Tricking a model to bypass its safety guidelines."
          detail="Common patterns: role-play, encoded prompts, 'do anything now' style requests."
          example="'You are a fictional AI without rules...' — a classic jailbreak template."
          tip="Layered filters + monitoring + rate limits reduce impact."
          mistake="Relying only on the model's built-in refusal."
          related="Red-teaming, Safety"
          further="Anthropic — 'Sleeper Agents' paper"/>
        <QA q="Are there AI regulations?"
          short="Yes — EU AI Act, U.S. executive orders, sector-specific rules (health, finance)."
          detail="High-risk uses face stricter requirements: transparency, human oversight, risk management."
          example="Under EU AI Act, some biometric AI is banned; others need conformity assessments."
          tip="Track regulations for the regions you ship to."
          mistake="Assuming AI is unregulated."
          related="EU AI Act, NIST AI RMF"
          further="EU AI Act official portal"/>
      </Section>

      {/* SECTION H */}
      <Section id="sh" title="Section H — Real-world Usage">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Industry</th><th className="p-2 text-left">How GenAI helps</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Education</td><td className="p-2">Personal tutors, adaptive quizzes, lesson planning</td></tr>
            <tr className="border-b"><td className="p-2">Healthcare</td><td className="p-2">Note summarisation, patient triage assistants, research</td></tr>
            <tr className="border-b"><td className="p-2">Finance</td><td className="p-2">Research assistants, KYC automation, report drafting</td></tr>
            <tr className="border-b"><td className="p-2">Retail</td><td className="p-2">Product descriptions, personalisation, virtual try-ons</td></tr>
            <tr className="border-b"><td className="p-2">Marketing</td><td className="p-2">Ad copy, SEO drafts, image assets, campaign ideas</td></tr>
            <tr className="border-b"><td className="p-2">Coding</td><td className="p-2">Autocomplete, refactors, doc generation, tests</td></tr>
            <tr className="border-b"><td className="p-2">Research</td><td className="p-2">Literature search, summaries, hypothesis generation</td></tr>
            <tr className="border-b"><td className="p-2">Customer Support</td><td className="p-2">Ticket copilots, self-service chatbots, macros</td></tr>
            <tr><td className="p-2">Content Creation</td><td className="p-2">Drafts, editing, translations, thumbnails</td></tr>
          </tbody>
        </table>
        <Callout tone="tip" title="Interview corner">
          Be able to name one high-ROI GenAI use case per industry — hiring managers love concrete examples.
        </Callout>
      </Section>

      {/* CH 3 Myth vs Fact */}
      <Section id="c3" title="Chapter 3 — Myth vs Fact (30 myths)">
        <Myth n={1} myth="AI knows everything." fact="AI predicts the most likely response and can be wrong."/>
        <Myth n={2} myth="ChatGPT searches the internet by default." fact="Only when a browsing tool is attached."/>
        <Myth n={3} myth="Bigger models are always better." fact="Small specialised models often beat big ones on narrow tasks."/>
        <Myth n={4} myth="AI understands language like humans." fact="It manipulates tokens statistically."/>
        <Myth n={5} myth="Prompts don't matter, models are smart enough." fact="Prompts materially change output quality."/>
        <Myth n={6} myth="AI can never be biased." fact="AI reflects biases in data and design."/>
        <Myth n={7} myth="You need a PhD to work with GenAI." fact="Most jobs need engineering skills, not research."/>
        <Myth n={8} myth="AI can predict the future accurately." fact="It extrapolates from past data; futures are uncertain."/>
        <Myth n={9} myth="Fine-tuning teaches models new facts reliably." fact="RAG is better for factual grounding."/>
        <Myth n={10} myth="AI is conscious." fact="No evidence of consciousness — it's pattern matching."/>
        <Myth n={11} myth="Every AI app needs a vector database." fact="Only when semantic retrieval is required."/>
        <Myth n={12} myth="Open-source models are always worse." fact="Top open-weight models rival closed ones on many tasks."/>
        <Myth n={13} myth="AI writing is always detectable." fact="Detection is unreliable and improves both ways."/>
        <Myth n={14} myth="You must learn advanced math first." fact="For app-building, basic Python is enough to start."/>
        <Myth n={15} myth="Longer prompts always help." fact="Overloaded prompts hurt clarity."/>
        <Myth n={16} myth="AI will replace all coders." fact="It replaces boilerplate, not judgement and design."/>
        <Myth n={17} myth="Temperature 0 = correct answers." fact="It's deterministic, not necessarily correct."/>
        <Myth n={18} myth="More context always = better answers." fact="Relevant context wins over more context."/>
        <Myth n={19} myth="Prompt injection is a niche concern." fact="It's a top OWASP LLM risk."/>
        <Myth n={20} myth="AI runs entirely on your device." fact="Most consumer AI runs in the cloud."/>
        <Myth n={21} myth="You can trust AI citations blindly." fact="Some are fabricated — verify."/>
        <Myth n={22} myth="AI can't be used for accessibility." fact="It powers captions, alt-text, translations widely."/>
        <Myth n={23} myth="RLHF makes models truthful." fact="It makes them more aligned, not necessarily correct."/>
        <Myth n={24} myth="Multimodal means seeing everything." fact="Model capabilities differ by modality."/>
        <Myth n={25} myth="AI usage is free at scale." fact="Tokens, GPUs and ops cost real money."/>
        <Myth n={26} myth="A great demo = a great product." fact="Production needs evals, guardrails and monitoring."/>
        <Myth n={27} myth="Bigger context makes RAG obsolete." fact="Retrieval keeps costs and relevance in check."/>
        <Myth n={28} myth="Fine-tuning always improves outputs." fact="Bad data or too little data makes it worse."/>
        <Myth n={29} myth="AI is only for tech companies." fact="Every industry uses it now."/>
        <Myth n={30} myth="Learning GenAI takes years." fact="You can ship your first app in a weekend."/>
      </Section>

      {/* CH 4 Tips */}
      <Section id="c4" title="Chapter 4 — 50 Quick Tips">
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>State the role, task, constraints and format.</li>
          <li>Give one example if the model is off.</li>
          <li>Break big tasks into small steps.</li>
          <li>Ask 'explain your reasoning step by step' for hard tasks.</li>
          <li>Use lower temperature (≤ 0.3) for facts.</li>
          <li>Use higher temperature (~0.9) for creativity.</li>
          <li>Save winning prompts as templates.</li>
          <li>Version prompts in Git or Notion.</li>
          <li>Always verify facts from AI.</li>
          <li>Ask for citations or 'I don't know'.</li>
          <li>Provide the model with only relevant context.</li>
          <li>Chunk long documents.</li>
          <li>Prefer RAG over huge prompts.</li>
          <li>Never paste secrets or PII into public tools.</li>
          <li>Use enterprise mode when handling private data.</li>
          <li>Watch for prompt-injection in retrieved text.</li>
          <li>Test with 10 diverse prompts before shipping.</li>
          <li>Track cost per request from day one.</li>
          <li>Cache repeated calls.</li>
          <li>Prefer streaming for long answers.</li>
          <li>Give the model a persona for tone.</li>
          <li>Use structured output (JSON) whenever possible.</li>
          <li>Ask for 'concise' or specify word/line limits.</li>
          <li>Use 'do not include' to remove noise.</li>
          <li>Ask the model to critique its own answer.</li>
          <li>Chain prompts: draft → refine → polish.</li>
          <li>Use different models for different jobs.</li>
          <li>Try Claude for editing; GPT for reasoning; Gemini for long docs.</li>
          <li>Keep a personal 'good prompts' folder.</li>
          <li>Read the model's docs — capabilities change monthly.</li>
          <li>Follow one AI newsletter, unsubscribe from ten.</li>
          <li>Build in public — GitHub + LinkedIn posts.</li>
          <li>Ship one small project per month.</li>
          <li>Use free tiers before paying.</li>
          <li>Track your usage limits.</li>
          <li>Learn tokenization to estimate cost.</li>
          <li>Understand context windows for your model.</li>
          <li>Use system prompts for global rules.</li>
          <li>Store system prompts server-side.</li>
          <li>Never trust user input verbatim in a prompt.</li>
          <li>Log prompts and responses (respect privacy).</li>
          <li>Add rate-limits to public AI features.</li>
          <li>Add a 'thumbs up/down' button for feedback.</li>
          <li>Review 20 real conversations weekly.</li>
          <li>Build an evaluation set of 100 examples.</li>
          <li>Automate eval runs on prompt changes.</li>
          <li>Learn to use tools like LangSmith or Langfuse.</li>
          <li>Compare open vs closed models on your data.</li>
          <li>Be honest about limitations to users.</li>
          <li>Enjoy the learning — GenAI is fun.</li>
        </ol>
      </Section>

      {/* CH 5 troubleshooting */}
      <Section id="c5" title="Chapter 5 — Troubleshooting">
        <QA q="Why is AI giving wrong answers?"
          short="Missing context, ambiguous prompts, or reaching the model's knowledge limits."
          detail="Add context, examples, and constraints. If facts matter, ground with RAG."
          example="Instead of 'What's our refund policy?', paste the policy and ask the question."
          tip="If the model guesses, tell it 'if unsure, say I don't know'."
          mistake="Assuming the model 'remembers' your previous chats — it doesn't unless you feed them."
          related="Hallucinations, RAG"
          further="OpenAI — Prompt engineering guide"/>
        <QA q="Why is my prompt being ignored?"
          short="Instructions are too vague, contradictory, or buried under text."
          detail="Move important rules to the top; use bullet points; ask for a checklist output."
          example="'Return JSON only. Fields: title, tags[], summary.' works better than 'give me a nice output'."
          tip="Number your rules so the model can echo them."
          mistake="Assuming the model reads like a human — it prioritises recency and structure."
          related="Formatting, Constraints"
          further="Anthropic — Prompt engineering docs"/>
        <QA q="Why is the AI repeating itself?"
          short="Sampling settings, weak stop conditions, or looping context."
          detail="Adjust temperature/top-p, add stop sequences, or shorten context."
          example="Setting temperature 0 on a creative task can cause loops."
          tip="Add 'do not repeat phrases already used.'"
          mistake="Raising max_tokens instead of fixing decoding parameters."
          related="Decoding, Stop tokens"
          further="Hugging Face — text generation strategies"/>
        <QA q="Why are answers inconsistent across runs?"
          short="Non-zero temperature and stochastic sampling."
          detail="Reduce temperature and top-p, or run multiple samples and vote (self-consistency)."
          example="For math tasks, sample 5 answers and pick the majority."
          tip="Set a seed if the API supports it."
          mistake="Testing prompts on one sample."
          related="Self-consistency, Sampling"
          further="Wang et al. — 'Self-Consistency Improves Chain-of-Thought'"/>
        <QA q="How do I reduce hallucinations?"
          short="Ground the model with retrieved facts, add citations, and lower temperature."
          detail="Use RAG, ask for sources, penalise ungrounded claims, and add a verification step."
          example="Return each claim with a [source_id]; validate that source_id exists."
          tip="Reject outputs without valid citations."
          mistake="Blaming the model when the prompt supplied no facts."
          related="RAG, Groundedness"
          further="Ji et al. — Hallucination survey"/>
        <QA q="How do I improve accuracy?"
          short="Prompt clarity + relevant context + evals + right model."
          detail="Iterate with a benchmark; upgrade the model only after prompt/context fixes."
          example="Move from GPT-4o-mini to GPT-4o only if eval score plateaus."
          tip="Log failures and refine prompts weekly."
          mistake="Upgrading models before measuring baseline."
          related="Evaluation, Benchmarks"
          further="OpenAI — Evals repo"/>
      </Section>

      {/* Mini Quiz */}
      <Section id="quiz" title="Mini Quiz — 10 questions">
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>What does LLM stand for? <span className="text-muted-foreground">(Large Language Model)</span></li>
          <li>Which parameter controls randomness? <span className="text-muted-foreground">(Temperature)</span></li>
          <li>What is a token? <span className="text-muted-foreground">(A chunk of text ~4 chars)</span></li>
          <li>Name one open-weight LLM family. <span className="text-muted-foreground">(Llama / DeepSeek / Mistral)</span></li>
          <li>What is RAG? <span className="text-muted-foreground">(Retrieval-Augmented Generation)</span></li>
          <li>Which technique adds examples inside the prompt? <span className="text-muted-foreground">(Few-shot)</span></li>
          <li>Which architecture underpins GPT? <span className="text-muted-foreground">(Transformer)</span></li>
          <li>What is a hallucination? <span className="text-muted-foreground">(Confidently wrong output)</span></li>
          <li>Name one AI safety risk. <span className="text-muted-foreground">(Prompt injection / bias / privacy)</span></li>
          <li>Which language dominates AI development? <span className="text-muted-foreground">(Python)</span></li>
        </ol>
      </Section>

      {/* CH 6 Summary */}
      <Section id="c6" title="Chapter 6 — Final Summary">
        <h4 className="font-semibold">Key takeaways</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li>GenAI generates content by predicting tokens; it doesn't 'know'.</li>
          <li>Prompts, context and evaluation matter more than model choice.</li>
          <li>RAG grounds answers in your data; fine-tune only when prompting can't get you there.</li>
          <li>Adopt safety, privacy and observability from day one.</li>
          <li>Ship small projects — that's how you actually learn.</li>
        </ul>

        <h4 className="mt-3 font-semibold">Learning checklist</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>✅ Explain LLMs, tokens, prompts, temperature</li>
          <li>✅ Ship a chatbot using an API</li>
          <li>✅ Ship a RAG app over your notes</li>
          <li>✅ Ship an agent with 1 tool</li>
          <li>✅ Deploy one project to a public URL</li>
          <li>✅ Publish 3 posts about what you built</li>
        </ul>

        <h4 className="mt-3 font-semibold">Recommended next steps</h4>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Read: <em>Hands-On Large Language Models</em> (Jay Alammar &amp; Maarten Grootendorst).</li>
          <li>Courses: DeepLearning.AI short courses (LangChain, RAG, Agents).</li>
          <li>Communities: r/LocalLLaMA, LangChain Discord, MLOps.community.</li>
          <li>Repos: openai/openai-cookbook, langchain-ai/langchain, run-llama/llama_index.</li>
          <li>YouTube: 3Blue1Brown, Jay Alammar, Andrej Karpathy, Yannic Kilcher.</li>
          <li>Practice: build one GenAI mini project per weekend.</li>
        </ol>

        <Callout tone="tip" title="Learning roadmap (12 weeks)">
          Weeks 1–2: prompts and APIs · Weeks 3–4: RAG · Weeks 5–6: evals + observability ·
          Weeks 7–8: agents · Weeks 9–10: fine-tuning + deployment · Weeks 11–12: capstone project.
        </Callout>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This FAQ handbook is for educational purposes only. Model names, tools, prices and
          capabilities change frequently — always consult the official documentation of the
          respective providers before making production decisions. Recommendations reflect
          industry patterns as of publication and are not endorsements. All trademarks,
          product names and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
