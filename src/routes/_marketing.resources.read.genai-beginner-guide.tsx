import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "genai-beginner-guide",
  title: "Generative AI — Beginner Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "49 min",
  pages: 88,
  lastUpdated: "May 2026",
  tags: ["Generative AI", "LLM", "Prompt Engineering"],
  heroImage: "https://images.unsplash.com/photo-1673187456554-11de9df2f83e?w=1800&q=80",
  heroSubtitle:
    "A friendly first walk through Generative AI — core concepts, mental models, real-world examples, and your first hands-on exercises. No programming experience required.",
};

const TOC: TocItem[] = [
  { id: "ch1", label: "Ch 1 — Welcome to Generative AI" },
  { id: "ch2", label: "Ch 2 — What is Generative AI?" },
  { id: "ch3", label: "Ch 3 — How Generative AI Works" },
  { id: "ch4", label: "Ch 4 — Large Language Models" },
  { id: "ch5", label: "Ch 5 — Foundation Models" },
  { id: "ch6", label: "Ch 6 — Prompt Engineering Basics" },
  { id: "ch7", label: "Ch 7 — AI Hallucinations" },
  { id: "ch8", label: "Ch 8 — AI Ethics" },
  { id: "ch9", label: "Ch 9 — Popular GenAI Tools" },
  { id: "ch10", label: "Ch 10 — Hands-on Exercises" },
  { id: "ch11", label: "Ch 11 — Mini Projects" },
  { id: "ch12", label: "Ch 12 — Common Beginner Mistakes" },
  { id: "ch13", label: "Ch 13 — Future of Generative AI" },
  { id: "ch14", label: "Ch 14 — Final Summary" },
  { id: "glossary", label: "Glossary — 100 Terms" },
  { id: "resources", label: "Resources & Communities" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Prompt Engineering — Beginner Guide", tag: "AI & Data", time: "22 min" },
  { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "58 min" },
  { title: "AI Agents — Learning Roadmap", tag: "AI & Data", time: "20 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/genai-beginner-guide")({
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
  component: GenAIBeginnerGuidePage,
});

function Quiz({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <ol className="list-decimal space-y-2 pl-5 text-sm">
      {items.map((it, i) => (
        <li key={i}>
          <p className="font-medium">{it.q}</p>
          <p className="text-muted-foreground"><strong>Answer:</strong> {it.a}</p>
        </li>
      ))}
    </ol>
  );
}

function GenAIBeginnerGuidePage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      {/* ================= CHAPTER 1 ================= */}
      <Section id="ch1" title="Chapter 1 — Welcome to Generative AI">
        <p>
          Imagine a friend who has read almost every book in the library, watched countless movies,
          studied millions of pictures, and can now write stories, draw art, answer questions, and
          even code — instantly, and in plain conversation. That friend is <strong>Generative AI</strong>.
        </p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="What you will learn in this book">
          By the end of these 14 chapters you will understand what Generative AI is, how it works
          under the hood, how to talk to it effectively, and how to build your first small projects
          with popular tools like ChatGPT, Gemini, Claude, and Midjourney.
        </Callout>

        <h3 className="mt-4 font-semibold">1.1 What is Artificial Intelligence?</h3>
        <p>
          Artificial Intelligence (AI) is the science of making computers do things that usually
          need human intelligence — recognising a face, understanding speech, driving a car,
          answering a question. Think of AI as a giant umbrella. Under this umbrella sit smaller,
          more specific ideas.
        </p>

        <h3 className="mt-4 font-semibold">1.2 Machine Learning vs Deep Learning vs Generative AI</h3>
        <p>These three are nested Russian dolls — each one lives inside the previous.</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Term</th><th className="p-2 text-left">Simple meaning</th><th className="p-2 text-left">Everyday example</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">AI</td><td className="p-2">Any machine that seems "smart"</td><td className="p-2">Chess engine, spam filter</td></tr>
            <tr className="border-b"><td className="p-2">Machine Learning</td><td className="p-2">AI that <em>learns</em> from data</td><td className="p-2">Netflix recommendations</td></tr>
            <tr className="border-b"><td className="p-2">Deep Learning</td><td className="p-2">ML using layered neural networks</td><td className="p-2">Face unlock, voice assistants</td></tr>
            <tr><td className="p-2">Generative AI</td><td className="p-2">Deep learning that <em>creates</em> new content</td><td className="p-2">ChatGPT, Midjourney</td></tr>
          </tbody>
        </table>

        <h3 className="mt-4 font-semibold">1.3 Why everyone is talking about AI</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>It writes emails, essays and code in seconds.</li>
          <li>It draws, designs and edits pictures without art skills.</li>
          <li>It can tutor students, translate languages and summarise long PDFs.</li>
          <li>It is doubling in capability roughly every year.</li>
        </ul>

        <h3 className="mt-4 font-semibold">1.4 A short history of AI</h3>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`1950  Alan Turing asks: "Can machines think?"
1956  The term "Artificial Intelligence" is born at Dartmouth
1997  IBM Deep Blue beats world chess champion
2011  IBM Watson wins Jeopardy!
2012  AlexNet — deep learning takes off
2017  "Attention Is All You Need" — the Transformer is invented
2020  GPT-3 stuns the world
2022  ChatGPT reaches 100M users in 2 months
2024+ Multimodal AI: text + image + audio + video`}</pre>

        <h3 className="mt-4 font-semibold">1.5 Evolution of Generative AI</h3>
        <p>
          Generative AI grew out of a long chain of ideas — from simple statistical models that
          predicted the next word, to neural networks that could paint, to today's giant transformer
          models that can chat, code and create in almost any language or medium.
        </p>
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 1.1 — Generative AI sits at the intersection of Machine Learning, Deep Learning, and creativity." />

        <Callout tone="tip" title="Chapter summary">
          AI is a broad field; Machine Learning is a subset; Deep Learning is a subset of ML; and
          Generative AI is the newest branch — it doesn't just predict, it <em>creates</em>.
        </Callout>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 1</h3>
        <Quiz items={[
          { q: "1. Who coined the term Artificial Intelligence?", a: "Researchers at the 1956 Dartmouth Conference (John McCarthy et al.)." },
          { q: "2. Is Deep Learning bigger or smaller than AI?", a: "Smaller — DL is inside ML which is inside AI." },
          { q: "3. What year did ChatGPT launch?", a: "November 2022." },
          { q: "4. Which paper introduced the Transformer?", a: "'Attention Is All You Need' (2017)." },
          { q: "5. Give one real-world example of ML you already use.", a: "Netflix/YouTube recommendations, email spam filter, Google Maps ETA." },
          { q: "6. True or False: Generative AI can create new content.", a: "True." },
          { q: "7. What is the parent field of Deep Learning?", a: "Machine Learning." },
          { q: "8. Name one company building large GenAI models.", a: "OpenAI, Google, Anthropic, Meta, Mistral." },
          { q: "9. Which came first — Deep Blue or AlexNet?", a: "Deep Blue (1997) came before AlexNet (2012)." },
          { q: "10. In one word, what does Generative AI do that predictive AI does not?", a: "Create." },
        ]} />
      </Section>

      {/* ================= CHAPTER 2 ================= */}
      <Section id="ch2" title="Chapter 2 — What is Generative AI?">
        <p>
          <strong>Generative AI</strong> is a type of AI that can create new things — text, images,
          audio, video and code — that never existed before, by learning patterns from huge amounts
          of examples.
        </p>

        <h3 className="mt-4 font-semibold">2.1 Traditional AI vs Generative AI</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Traditional AI</th><th className="p-2 text-left">Generative AI</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Predicts or classifies</td><td className="p-2">Creates new content</td></tr>
            <tr className="border-b"><td className="p-2">"Is this email spam?"</td><td className="p-2">"Write an email apologising for a late delivery."</td></tr>
            <tr><td className="p-2">Answer is a label</td><td className="p-2">Answer is fresh text, image, or code</td></tr>
          </tbody>
        </table>

        <h3 className="mt-4 font-semibold">2.2 Predictive AI, Discriminative AI, Generative Models</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Predictive AI</strong> — forecasts a number or category. e.g. "Tomorrow's sales will be ₹42,000."</li>
          <li><strong>Discriminative AI</strong> — draws boundaries between classes. e.g. "This X-ray is normal / abnormal."</li>
          <li><strong>Generative Models</strong> — learn <em>how data is made</em> and produce brand-new samples. e.g. write a poem, draw a cat.</li>
        </ul>

        <h3 className="mt-4 font-semibold">2.3 Real-life analogy — the chef</h3>
        <p>
          A predictive model is a food critic — it tastes a dish and says "this is Italian". A
          discriminative model is a bouncer — it decides who enters which room. A generative model
          is a chef — it has eaten thousands of dishes and can now cook something new.
        </p>

        <h3 className="mt-4 font-semibold">2.4 Popular Generative AI systems today</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>ChatGPT</strong> (OpenAI) — conversation and writing.</li>
          <li><strong>Gemini</strong> (Google) — multimodal chat, deeply integrated with Google apps.</li>
          <li><strong>Claude</strong> (Anthropic) — long-context, safety-focused writing partner.</li>
          <li><strong>Midjourney</strong> — image generation from text.</li>
          <li><strong>DALL·E</strong> — image generation from OpenAI.</li>
          <li><strong>Sora</strong> — text-to-video from OpenAI.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1400&q=80" caption="Figure 2.1 — Generative AI can produce text, images, audio, code and video from a simple prompt." />

        <Callout tone="tip" title="Chapter summary">
          Generative AI doesn't just judge — it creates. It's the family of models behind chatbots,
          AI artists and code copilots.
        </Callout>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 2</h3>
        <Quiz items={[
          { q: "1. What is the main job of a generative model?", a: "To create new content that resembles its training data." },
          { q: "2. Give one difference between traditional and generative AI.", a: "Traditional AI classifies/predicts; generative AI creates." },
          { q: "3. Which company makes Claude?", a: "Anthropic." },
          { q: "4. Which model can generate videos from text?", a: "Sora (OpenAI)." },
          { q: "5. Predictive AI outputs are usually…", a: "Numbers or categories." },
          { q: "6. What does the chef analogy illustrate?", a: "Generative models create new outputs from learned patterns." },
          { q: "7. Name a text-to-image tool.", a: "Midjourney or DALL·E." },
          { q: "8. Is spam detection generative or discriminative?", a: "Discriminative." },
          { q: "9. Who makes Gemini?", a: "Google." },
          { q: "10. True/False: Generative AI can write code.", a: "True." },
        ]} />
      </Section>

      {/* ================= CHAPTER 3 ================= */}
      <Section id="ch3" title="Chapter 3 — How Generative AI Works">
        <p>Under the hood, most modern GenAI systems follow the same pipeline:</p>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`   Input text
       │
       ▼
  Tokenization      ← break text into pieces
       │
       ▼
   Embedding        ← turn pieces into numbers
       │
       ▼
  Transformer       ← the "brain" (attention layers)
       │
       ▼
Probability over    ← "what word is most likely next?"
 next token
       │
       ▼
    Output text`}</pre>

        <h3 className="mt-4 font-semibold">3.1 Tokens</h3>
        <p>
          A token is a chunk of text — sometimes a word ("cat"), sometimes a part of a word
          ("un" + "believable"). Models don't read letters; they read tokens.
        </p>

        <h3 className="mt-4 font-semibold">3.2 Embeddings</h3>
        <p>
          Each token is turned into a list of numbers called a <strong>vector</strong>. Similar
          words end up with similar vectors — "king" and "queen" live near each other in this
          number-space.
        </p>

        <h3 className="mt-4 font-semibold">3.3 The Transformer & Attention</h3>
        <p>
          The Transformer is the neural network at the heart of every modern LLM. Its superpower is
          <strong> attention</strong>: for every word it generates, it can "look at" every previous
          word and decide which ones matter most.
        </p>
        <p>
          <strong>Analogy:</strong> imagine reading a long detective novel. To guess "who did it",
          your eye jumps back to clues scattered across chapters. Attention does the same thing —
          it weights the important clues.
        </p>

        <h3 className="mt-4 font-semibold">3.4 Context window</h3>
        <p>
          The context window is how much text the model can "remember" in one conversation.
          GPT-4-class models handle 128K tokens (≈ a novel); Gemini 1.5 can handle 1M+.
        </p>

        <h3 className="mt-4 font-semibold">3.5 Probability prediction</h3>
        <p>
          After all the maths, the model outputs a probability for every possible next token, then
          picks one (usually the most likely, with a bit of randomness for creativity). Repeat →
          sentences appear.
        </p>
        <Figure src="https://images.unsplash.com/photo-1655720033654-a4239dd42d10?w=1400&q=80" caption="Figure 3.1 — A Transformer predicts the next token, one at a time, using attention over the entire prompt." />

        <Callout tone="note" title="One-liner summary">
          Generative AI = a very fast, very well-read auto-complete that guesses the next token
          again and again, using attention to stay on topic.
        </Callout>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 3</h3>
        <Quiz items={[
          { q: "1. What is a token?", a: "A chunk of text (word or sub-word) the model reads." },
          { q: "2. What is an embedding?", a: "A vector of numbers representing a token's meaning." },
          { q: "3. What does the attention mechanism do?", a: "Lets the model focus on the most relevant parts of the input." },
          { q: "4. What is a context window?", a: "The amount of text a model can consider at once." },
          { q: "5. What is the model actually predicting?", a: "The next token." },
          { q: "6. Which architecture underlies most LLMs?", a: "The Transformer." },
          { q: "7. Do embeddings for 'king' and 'queen' sit close together?", a: "Yes — semantically similar words have similar embeddings." },
          { q: "8. True/False: Models read letters directly.", a: "False — they read tokens." },
          { q: "9. Why is randomness added at output time?", a: "To make text less repetitive and more creative." },
          { q: "10. Which paper introduced attention as the sole mechanism?", a: "'Attention Is All You Need' (2017)." },
        ]} />
      </Section>

      {/* ================= CHAPTER 4 ================= */}
      <Section id="ch4" title="Chapter 4 — Large Language Models (LLMs)">
        <p>
          A <strong>Large Language Model</strong> is a transformer trained on a huge slice of the
          internet, containing billions of adjustable numbers called <em>parameters</em>. "Large"
          today means anywhere from 7B to well over 1T parameters.
        </p>

        <h3 className="mt-4 font-semibold">4.1 Popular LLM families</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Model</th><th className="p-2 text-left">Maker</th><th className="p-2 text-left">Notable strength</th><th className="p-2 text-left">Context</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">GPT-4 / 5</td><td className="p-2">OpenAI</td><td className="p-2">General reasoning</td><td className="p-2">128K+</td></tr>
            <tr className="border-b"><td className="p-2">Gemini</td><td className="p-2">Google</td><td className="p-2">Multimodal + huge context</td><td className="p-2">1M+</td></tr>
            <tr className="border-b"><td className="p-2">Claude</td><td className="p-2">Anthropic</td><td className="p-2">Long, careful writing</td><td className="p-2">200K</td></tr>
            <tr className="border-b"><td className="p-2">Llama</td><td className="p-2">Meta</td><td className="p-2">Open weights</td><td className="p-2">128K</td></tr>
            <tr className="border-b"><td className="p-2">Mistral</td><td className="p-2">Mistral AI</td><td className="p-2">Efficient open models</td><td className="p-2">32K–128K</td></tr>
            <tr><td className="p-2">DeepSeek</td><td className="p-2">DeepSeek</td><td className="p-2">Strong reasoning, open</td><td className="p-2">64K+</td></tr>
          </tbody>
        </table>

        <h3 className="mt-4 font-semibold">4.2 Training, fine-tuning, inference</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Pre-training</strong> — teach the model general language from the whole internet. Takes weeks and thousands of GPUs.</li>
          <li><strong>Fine-tuning</strong> — teach it to follow instructions and be polite. Uses smaller, curated data.</li>
          <li><strong>Inference</strong> — you send a prompt, it responds. This is what happens every time you chat.</li>
        </ul>

        <Callout tone="tip" title="Parameters aren't everything">
          A well-trained 70B model can beat a poorly-trained 500B model. Data quality and
          fine-tuning matter as much as raw size.
        </Callout>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 4</h3>
        <Quiz items={[
          { q: "1. What are parameters?", a: "The learnable numbers inside the network." },
          { q: "2. Which stage teaches language basics?", a: "Pre-training." },
          { q: "3. Which stage teaches instruction following?", a: "Fine-tuning." },
          { q: "4. What is inference?", a: "Using the trained model to answer new prompts." },
          { q: "5. Which model has 1M+ context?", a: "Gemini 1.5." },
          { q: "6. Who makes Llama?", a: "Meta." },
          { q: "7. What does 'open weights' mean?", a: "The trained model file can be downloaded and run yourself." },
          { q: "8. Is bigger always better?", a: "No — data quality and fine-tuning matter too." },
          { q: "9. Give one open-weight model.", a: "Llama, Mistral, or DeepSeek." },
          { q: "10. Roughly how many tokens is a novel?", a: "Around 100K–200K." },
        ]} />
      </Section>

      {/* ================= CHAPTER 5 ================= */}
      <Section id="ch5" title="Chapter 5 — Foundation Models">
        <p>
          A <strong>foundation model</strong> is a big, general-purpose model trained on broad data
          that can be adapted to many downstream tasks — writing, coding, translating, summarising,
          answering questions, and more.
        </p>

        <h3 className="mt-4 font-semibold">5.1 Why they matter</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>One model can be reused for hundreds of use-cases.</li>
          <li>Small teams can build powerful apps without training from scratch.</li>
          <li>They "understand" text, images, code and speech in one place.</li>
        </ul>

        <h3 className="mt-4 font-semibold">5.2 Examples</h3>
        <p>GPT-5, Gemini, Claude, Llama, Mistral, Stable Diffusion, Whisper.</p>

        <h3 className="mt-4 font-semibold">5.3 Capabilities</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Text generation & summarisation</li>
          <li>Translation across 100+ languages</li>
          <li>Code writing & debugging</li>
          <li>Image + audio understanding (multimodal)</li>
          <li>Reasoning through multi-step problems</li>
        </ul>

        <h3 className="mt-4 font-semibold">5.4 Limitations</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>They can hallucinate — sound confident and be wrong.</li>
          <li>Training data has a cut-off date — recent events are unknown.</li>
          <li>They can inherit biases from the internet.</li>
          <li>They cost a lot of energy and money to train.</li>
        </ul>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 5</h3>
        <Quiz items={[
          { q: "1. Define a foundation model.", a: "A large general model reused for many tasks." },
          { q: "2. Give two examples.", a: "GPT, Gemini, Claude, Llama, Stable Diffusion." },
          { q: "3. Name one capability.", a: "Text generation, translation, coding, etc." },
          { q: "4. Name one limitation.", a: "Hallucinations, bias, or knowledge cut-off." },
          { q: "5. Are they usually multimodal today?", a: "Yes — most modern ones handle text + images + audio." },
          { q: "6. What is a knowledge cut-off?", a: "The date after which the model doesn't know new events." },
          { q: "7. True/False: You can fine-tune a foundation model.", a: "True." },
          { q: "8. Why are they called 'foundations'?", a: "Other applications are built on top of them." },
          { q: "9. Are they cheap to train?", a: "No — training costs millions of dollars." },
          { q: "10. Is Whisper a foundation model?", a: "Yes — for speech." },
        ]} />
      </Section>

      {/* ================= CHAPTER 6 ================= */}
      <Section id="ch6" title="Chapter 6 — Prompt Engineering Basics">
        <p>
          <strong>Prompt engineering</strong> is the craft of writing instructions that get the best
          answer out of a model. Same model, different prompt → wildly different quality.
        </p>

        <h3 className="mt-4 font-semibold">6.1 Good prompt vs bad prompt</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Bad prompt</th><th className="p-2 text-left">Good prompt</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">"Write about dogs."</td><td className="p-2">"Write a 150-word friendly article for 10-year-olds about why dogs make great pets, ending with 3 fun facts."</td></tr>
            <tr><td className="p-2">"Fix this code."</td><td className="p-2">"Explain the bug in this Python function that should reverse a list, then give a corrected version with comments."</td></tr>
          </tbody>
        </table>

        <h3 className="mt-4 font-semibold">6.2 Prompting techniques</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Zero-shot</strong> — ask directly. "Translate 'hello' to French."</li>
          <li><strong>One-shot</strong> — give one example. "English: dog → French: chien. English: cat → ?"</li>
          <li><strong>Few-shot</strong> — give several examples first.</li>
          <li><strong>Role prompting</strong> — "You are a friendly maths tutor for a 9-year-old…"</li>
          <li><strong>Chain of Thought</strong> — "Let's think step by step." Encourages reasoning.</li>
          <li><strong>Step-by-step</strong> — explicitly break a big task into ordered steps.</li>
        </ul>

        <Code lang="text">{`ROLE:   You are an experienced English teacher.
TASK:   Rewrite the paragraph below in simpler English.
STYLE:  Friendly, ~120 words, one short paragraph.
INPUT:  <<< paste paragraph here >>>`}</Code>

        <Callout tone="tip" title="Golden rule">
          Tell the model <em>who</em> it is, <em>what</em> to do, <em>how</em> long, and <em>for whom</em>.
        </Callout>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 6</h3>
        <Quiz items={[
          { q: "1. What is prompt engineering?", a: "The craft of writing effective instructions for a model." },
          { q: "2. What is zero-shot prompting?", a: "Asking without examples." },
          { q: "3. Give an example of role prompting.", a: "'You are a friendly nutritionist…'" },
          { q: "4. What does Chain of Thought encourage?", a: "Step-by-step reasoning." },
          { q: "5. Why give length constraints?", a: "So the answer matches the format you need." },
          { q: "6. What is few-shot prompting?", a: "Providing several examples in the prompt." },
          { q: "7. Which is usually better — vague or specific?", a: "Specific." },
          { q: "8. Should you specify the audience?", a: "Yes — improves tone and vocabulary." },
          { q: "9. True/False: One-shot uses zero examples.", a: "False — it uses one." },
          { q: "10. Name one style constraint you can add.", a: "Word count, tone, format (list/table)." },
        ]} />
      </Section>

      {/* ================= CHAPTER 7 ================= */}
      <Section id="ch7" title="Chapter 7 — AI Hallucinations">
        <p>
          A <strong>hallucination</strong> is when the model confidently generates something that
          sounds correct but isn't true — a fake book title, a wrong date, a made-up citation.
        </p>

        <h3 className="mt-4 font-semibold">7.1 Why it happens</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>The model predicts the <em>most likely</em> next word, not the <em>most true</em> one.</li>
          <li>Training data may be incomplete or contradictory.</li>
          <li>The question may push it beyond what it actually knows.</li>
        </ul>

        <h3 className="mt-4 font-semibold">7.2 How to reduce hallucinations</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Ask the model to cite sources.</li>
          <li>Use retrieval-augmented generation (RAG) — give it your documents.</li>
          <li>Ask "How confident are you? What might be wrong?"</li>
          <li>Always fact-check important claims.</li>
        </ul>

        <Callout tone="warning" title="Don't blindly trust">
          Treat AI answers like a first draft from a very fast intern — helpful, but always verify.
        </Callout>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 7</h3>
        <Quiz items={[
          { q: "1. What is a hallucination in AI?", a: "A confident but false output." },
          { q: "2. Why do LLMs hallucinate?", a: "They predict likely words, not verified facts." },
          { q: "3. Name one way to reduce it.", a: "RAG, citations, fact-checking." },
          { q: "4. Is hallucination completely solved?", a: "No — it's reduced but not eliminated." },
          { q: "5. What does RAG stand for?", a: "Retrieval-Augmented Generation." },
          { q: "6. Is a wrong date a hallucination?", a: "Yes." },
          { q: "7. Should you cite AI as a primary source?", a: "No — verify with authoritative sources." },
          { q: "8. Can prompts reduce hallucinations?", a: "Yes — asking for sources helps." },
          { q: "9. True/False: Bigger models never hallucinate.", a: "False." },
          { q: "10. Best practice before publishing AI text?", a: "Fact-check every specific claim." },
        ]} />
      </Section>

      {/* ================= CHAPTER 8 ================= */}
      <Section id="ch8" title="Chapter 8 — AI Ethics">
        <p>Powerful tools require careful use. GenAI raises real ethical questions.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Bias</strong> — models can echo stereotypes from training data.</li>
          <li><strong>Privacy</strong> — never paste secrets or personal data into public chatbots.</li>
          <li><strong>Fairness</strong> — outputs should not discriminate.</li>
          <li><strong>Copyright</strong> — AI-generated art may resemble training samples; be careful with commercial use.</li>
          <li><strong>Safety</strong> — models can be misused for scams, misinformation, deepfakes.</li>
          <li><strong>Responsible AI</strong> — always disclose, always fact-check, always respect people.</li>
        </ul>

        <h3 className="mt-4 font-semibold">Quiz — Chapter 8</h3>
        <Quiz items={[
          { q: "1. What is AI bias?", a: "Unfair patterns learned from data." },
          { q: "2. Is pasting your Aadhaar into a chatbot safe?", a: "No — treat chatbots as public." },
          { q: "3. Name one safety risk.", a: "Deepfakes, scams, misinformation." },
          { q: "4. Should AI outputs be disclosed?", a: "Yes, especially in journalism or education." },
          { q: "5. What is responsible AI?", a: "Using AI in a fair, transparent and safe way." },
          { q: "6. Can AI art violate copyright?", a: "It can — commercial use needs caution." },
          { q: "7. What is a deepfake?", a: "A realistic AI-generated fake video or audio." },
          { q: "8. Give one way to reduce bias.", a: "Diversify training data, audit outputs." },
          { q: "9. Is fairness a legal or ethical issue?", a: "Both." },
          { q: "10. True/False: AI should be trusted blindly.", a: "False." },
        ]} />
      </Section>

      {/* ================= CHAPTER 9 ================= */}
      <Section id="ch9" title="Chapter 9 — Popular Generative AI Tools">
        <p>Below is a quick tour of the tools you'll actually use.</p>

        <div className="space-y-4">
          {[
            { name: "ChatGPT", purpose: "Conversation, writing, reasoning", use: "Emails, essays, brainstorming", free: "Yes (GPT-4o mini/limited)", paid: "Plus / Pro", pros: "Great general quality", cons: "Occasional hallucinations" },
            { name: "Gemini", purpose: "Multimodal chat + Google apps", use: "Docs, Gmail, image + text", free: "Yes", paid: "Advanced", pros: "Deep Google integration", cons: "Style varies across models" },
            { name: "Claude", purpose: "Long-form writing", use: "Contracts, analysis, safe writing", free: "Yes", paid: "Pro / Team", pros: "Careful, long context", cons: "Fewer plug-ins" },
            { name: "Perplexity", purpose: "AI search with citations", use: "Research, fact-finding", free: "Yes", paid: "Pro", pros: "Citations for every claim", cons: "Not for long creative writing" },
            { name: "GitHub Copilot", purpose: "Code completion in editor", use: "Software development", free: "Free for students", paid: "$10–19/mo", pros: "In-editor speed", cons: "Needs code review" },
            { name: "Cursor", purpose: "AI-native code editor", use: "Full projects", free: "Yes", paid: "Pro", pros: "Multi-file edits", cons: "Learning curve" },
            { name: "Notion AI", purpose: "Docs & knowledge base", use: "Notes, summaries", free: "Trial", paid: "Add-on", pros: "Inline in Notion", cons: "Only inside Notion" },
            { name: "Gamma AI", purpose: "Slides & docs from prompts", use: "Presentations", free: "Yes", paid: "Pro", pros: "Beautiful default themes", cons: "Limited fine control" },
            { name: "Canva AI", purpose: "Design + image + video", use: "Marketing content", free: "Yes", paid: "Pro", pros: "Easy for non-designers", cons: "Not fully custom" },
            { name: "Midjourney", purpose: "Art & illustration", use: "Concept art, thumbnails", free: "No (paid only)", paid: "$10+/mo", pros: "Best-in-class aesthetics", cons: "Discord-based UX" },
            { name: "DALL·E", purpose: "Image generation", use: "In-chat images", free: "Via ChatGPT free", paid: "Bundled with Plus", pros: "Simple", cons: "Lower aesthetic ceiling than MJ" },
            { name: "Leonardo AI", purpose: "Image gen with fine control", use: "Game assets, portraits", free: "Yes (daily credits)", paid: "Tiers", pros: "Great control", cons: "Learning curve" },
            { name: "Suno AI", purpose: "AI music", use: "Jingles, song ideas", free: "Yes", paid: "Pro", pros: "Full songs w/ vocals", cons: "Style limits" },
            { name: "Runway ML", purpose: "AI video", use: "Short video clips, edits", free: "Trial", paid: "Standard/Pro", pros: "Powerful video tools", cons: "Costly at scale" },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl border border-border/60 bg-card p-4 text-sm">
              <p className="font-semibold">{t.name}</p>
              <ul className="mt-1 grid gap-1 sm:grid-cols-2">
                <li><strong>Purpose:</strong> {t.purpose}</li>
                <li><strong>Best use:</strong> {t.use}</li>
                <li><strong>Free:</strong> {t.free}</li>
                <li><strong>Paid:</strong> {t.paid}</li>
                <li><strong>Pros:</strong> {t.pros}</li>
                <li><strong>Cons:</strong> {t.cons}</li>
              </ul>
            </div>
          ))}
        </div>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 9.1 — The Generative AI toolkit spans chat, code, image, audio and video." />

        <h3 className="mt-4 font-semibold">Quiz — Chapter 9</h3>
        <Quiz items={[
          { q: "1. Best tool for coding in your editor?", a: "GitHub Copilot or Cursor." },
          { q: "2. Best tool for research with citations?", a: "Perplexity." },
          { q: "3. Best for making slides quickly?", a: "Gamma AI." },
          { q: "4. Best for AI music?", a: "Suno." },
          { q: "5. Best for concept art?", a: "Midjourney." },
          { q: "6. Which tool lives inside Notion?", a: "Notion AI." },
          { q: "7. Best for short AI videos?", a: "Runway ML." },
          { q: "8. Which chatbot integrates with Google apps?", a: "Gemini." },
          { q: "9. Which AI is known for long, safe writing?", a: "Claude." },
          { q: "10. Which is fully open-source–style?", a: "Llama or Mistral (developer tools rather than a consumer chatbot)." },
        ]} />
      </Section>

      {/* ================= CHAPTER 10 ================= */}
      <Section id="ch10" title="Chapter 10 — Hands-on Exercises">
        <p>Ten warm-ups. Copy each prompt into ChatGPT / Gemini / Claude and tweak.</p>
        <ol className="list-decimal space-y-3 pl-5">
          <li><strong>Generate an Email</strong> — "Write a polite email to my manager asking for two days of leave next week for a family function. Keep it short and warm."</li>
          <li><strong>Write a Resume</strong> — "Draft a one-page resume for a first-year CSE student applying for a web-development internship. Highlight 3 projects and 4 skills."</li>
          <li><strong>Generate Code</strong> — "Write a Python function that checks whether a given number is prime, with comments explaining each step."</li>
          <li><strong>Generate a Story</strong> — "Write a 300-word bedtime story for a 7-year-old about a shy dragon who learns to make friends."</li>
          <li><strong>Image Prompt</strong> — "Give me 3 detailed prompts for Midjourney to create a cozy cyberpunk chai stall in Bangalore during the rain."</li>
          <li><strong>Summarise a PDF</strong> — Upload a PDF and say: "Summarise this in bullet points for a busy manager. Include 3 action items."</li>
          <li><strong>Research a Topic</strong> — "Give me a beginner-friendly overview of quantum computing in 300 words with 5 key terms explained."</li>
          <li><strong>Create a Presentation</strong> — Use Gamma AI: "Make a 6-slide deck on 'Why every student should learn AI in 2026'."</li>
          <li><strong>Travel Planner</strong> — "Plan a 4-day budget trip to Pondicherry for 2 college students in December. Give day-wise plan, food picks, and estimated cost in INR."</li>
          <li><strong>Study Notes Generator</strong> — "Turn this chapter (paste text) into concise study notes with a 10-question self-quiz at the end."</li>
        </ol>
        <Callout tone="tip" title="Practise">
          Do at least 5 of the 10 exercises today. Repetition is where prompt intuition is built.
        </Callout>
      </Section>

      {/* ================= CHAPTER 11 ================= */}
      <Section id="ch11" title="Chapter 11 — Mini Projects">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong>AI Resume Builder</strong> — Ask the model to interview you for 10 questions,
            then generate 3 resume versions (fresher, career-change, senior).
          </li>
          <li>
            <strong>AI Study Assistant</strong> — Paste a syllabus, ask for a 30-day study plan
            with daily quizzes and revision days.
          </li>
          <li>
            <strong>AI Blog Writer</strong> — Give a topic and audience; iterate through outline →
            draft → SEO title → meta description.
          </li>
          <li>
            <strong>AI Image Prompt Generator</strong> — Describe a scene in one sentence; ask the
            model to output 5 richly-detailed Midjourney prompts with camera + style tags.
          </li>
          <li>
            <strong>AI Personal Tutor</strong> — "Act as my Physics tutor for 20 minutes. Test me
            on kinematics with 5 problems, give hints, then final solutions."
          </li>
        </ol>
      </Section>

      {/* ================= CHAPTER 12 ================= */}
      <Section id="ch12" title="Chapter 12 — Common Beginner Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Copy-paste prompting</strong> — reusing someone else's prompt without adapting the context.</li>
          <li><strong>Vague questions</strong> — "Tell me about business" gives useless answers.</li>
          <li><strong>Blindly trusting AI</strong> — always verify names, dates, quotes.</li>
          <li><strong>Ignoring fact-checking</strong> — especially for legal, medical or financial claims.</li>
          <li><strong>No context</strong> — never tells the model who you are, what you need, or for whom.</li>
          <li><strong>One long paragraph</strong> — break prompts into role / task / style / constraints.</li>
          <li><strong>Not iterating</strong> — the first answer is a draft; ask for improvements.</li>
        </ul>
        <Callout tone="warning" title="Rule of thumb">
          A great prompt is a great brief. The clearer the brief, the better the output.
        </Callout>
      </Section>

      {/* ================= CHAPTER 13 ================= */}
      <Section id="ch13" title="Chapter 13 — Future of Generative AI">
        <h3 className="mt-4 font-semibold">13.1 Career paths</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>AI Engineer</strong> — build AI-powered products end-to-end.</li>
          <li><strong>Prompt Engineer</strong> — design, evaluate and maintain prompts + evals.</li>
          <li><strong>ML Engineer</strong> — train and deploy models at scale.</li>
          <li><strong>Data Scientist</strong> — extract insight and build predictive systems.</li>
          <li><strong>AI Product Manager</strong> — translate user needs into AI features.</li>
          <li><strong>AI Researcher</strong> — publish novel models and techniques.</li>
        </ul>

        <h3 className="mt-4 font-semibold">13.2 Salary snapshot (2026 estimates)</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Role</th><th className="p-2 text-left">India (₹ LPA)</th><th className="p-2 text-left">US (USD)</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">AI Engineer</td><td className="p-2">8 – 40</td><td className="p-2">120K – 250K</td></tr>
            <tr className="border-b"><td className="p-2">Prompt Engineer</td><td className="p-2">6 – 30</td><td className="p-2">90K – 200K</td></tr>
            <tr className="border-b"><td className="p-2">ML Engineer</td><td className="p-2">10 – 45</td><td className="p-2">140K – 280K</td></tr>
            <tr className="border-b"><td className="p-2">Data Scientist</td><td className="p-2">8 – 35</td><td className="p-2">110K – 220K</td></tr>
            <tr><td className="p-2">AI Researcher</td><td className="p-2">15 – 60+</td><td className="p-2">180K – 400K+</td></tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted-foreground">Ranges vary widely; figures are illustrative, not guarantees.</p>

        <h3 className="mt-4 font-semibold">13.3 A simple 6-month roadmap</h3>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`Month 1  — Python basics + everyday prompting
Month 2  — LLM APIs, Prompt Engineering, RAG basics
Month 3  — Build 2 small apps (chatbot, summariser)
Month 4  — Deep Learning fundamentals + one CV/NLP project
Month 5  — Fine-tuning + evaluation + deployment
Month 6  — Capstone + resume + open-source contribution`}</pre>
      </Section>

      {/* ================= CHAPTER 14 ================= */}
      <Section id="ch14" title="Chapter 14 — Final Summary">
        <h3 className="mt-4 font-semibold">14.1 Key takeaways</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Generative AI creates new content by predicting one token at a time.</li>
          <li>The Transformer + attention is the engine behind almost every LLM today.</li>
          <li>Prompt engineering is the single biggest lever for output quality.</li>
          <li>Hallucinations and bias are real — always verify.</li>
          <li>You can start building useful projects <em>this week</em>.</li>
        </ul>

        <h3 className="mt-4 font-semibold">14.2 Mind map</h3>
        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">{`                     GENERATIVE AI
                          │
   ┌──────────┬───────────┼───────────┬───────────┐
   │          │           │           │           │
  Text       Image       Audio       Video       Code
 (LLMs)   (Diffusion)   (Suno)     (Sora)      (Copilot)
   │
   ├── Tokens → Embeddings → Transformer → Output
   ├── Prompt Engineering
   ├── RAG (grounded answers)
   └── Fine-tuning`}</pre>
      </Section>

      {/* ================= GLOSSARY ================= */}
      <Section id="glossary" title="Glossary — 100 Important Terms">
        <ol className="grid list-decimal gap-1 pl-5 text-sm sm:grid-cols-2">
          {[
            "AI — machines doing intelligent tasks",
            "ML — algorithms that learn from data",
            "DL — ML using deep neural networks",
            "GenAI — AI that creates new content",
            "LLM — Large Language Model",
            "Token — a chunk of text",
            "Tokenizer — turns text into tokens",
            "Embedding — vector representation of a token",
            "Vector — list of numbers",
            "Transformer — attention-based network",
            "Attention — focus mechanism over inputs",
            "Self-attention — attention within a sequence",
            "Encoder — reads input into representations",
            "Decoder — generates output token-by-token",
            "Parameter — a learnable number in the model",
            "Weight — same as parameter",
            "Bias term — learnable offset in a neuron",
            "Layer — a group of neurons",
            "Neuron — a small weighted-sum unit",
            "Activation — non-linear function (ReLU, softmax…)",
            "Softmax — turns logits into probabilities",
            "Logits — raw model outputs before softmax",
            "Loss — how wrong a prediction is",
            "Gradient — direction to reduce loss",
            "Backpropagation — learning algorithm",
            "Optimizer — updates weights (Adam, SGD)",
            "Learning rate — step size for updates",
            "Epoch — one pass through the data",
            "Batch — a group of samples processed together",
            "Overfitting — memorising instead of generalising",
            "Underfitting — model too simple",
            "Regularisation — techniques to fight overfitting",
            "Dropout — randomly deactivating neurons in training",
            "Pre-training — general language training",
            "Fine-tuning — task-specific training",
            "RLHF — Reinforcement Learning from Human Feedback",
            "Instruction tuning — teaching a model to follow prompts",
            "Alignment — making a model helpful and safe",
            "Zero-shot — no examples given",
            "One-shot — one example given",
            "Few-shot — several examples given",
            "Chain of Thought — step-by-step reasoning",
            "System prompt — hidden instructions from the app",
            "User prompt — what you type",
            "Temperature — randomness knob",
            "Top-p — nucleus sampling",
            "Top-k — sample from top-k tokens",
            "Context window — max tokens the model sees",
            "Inference — using the model to generate",
            "Latency — time to first token",
            "Throughput — tokens per second",
            "Foundation model — big general model",
            "Multimodal — handles text + image + audio",
            "Diffusion model — creates images by denoising",
            "GAN — Generative Adversarial Network",
            "VAE — Variational Autoencoder",
            "Autoencoder — learns compressed representations",
            "Prompt — your input to the model",
            "Prompt template — reusable prompt with variables",
            "Prompt injection — an attack via malicious input",
            "Guardrails — safety filters",
            "Moderation — content-safety classifier",
            "Hallucination — confident wrong answer",
            "Grounding — tying answers to real data",
            "RAG — Retrieval-Augmented Generation",
            "Vector database — stores embeddings for search",
            "Semantic search — search by meaning",
            "Chunking — splitting docs for retrieval",
            "Recall — % of relevant items retrieved",
            "Precision — % of retrieved that are relevant",
            "Eval — evaluation set / harness",
            "Benchmark — standard test (MMLU, HELM…)",
            "MMLU — multitask reasoning benchmark",
            "HumanEval — code-generation benchmark",
            "Toxicity — harmful language",
            "Bias — unfair patterns learned",
            "Fairness — equal treatment across groups",
            "Privacy — protecting personal data",
            "PII — Personally Identifiable Information",
            "Copyright — legal ownership of works",
            "Watermarking — marking AI-generated content",
            "Deepfake — fake AI-generated media",
            "Prompt engineering — crafting inputs",
            "Prompt chaining — output → next prompt",
            "Agent — model that uses tools",
            "Tool use — calling APIs from the model",
            "Function calling — structured tool invocation",
            "MCP — Model Context Protocol",
            "Memory — persistent context across chats",
            "Reranker — reorders retrieved results",
            "Distillation — small model learns from big model",
            "Quantisation — smaller weights, faster inference",
            "LoRA — cheap fine-tuning technique",
            "PEFT — Parameter-Efficient Fine-Tuning",
            "Checkpoint — saved model weights",
            "Adapter — small trainable module",
            "Open weights — publicly downloadable weights",
            "Closed model — API-only model",
            "GPU — main hardware for training",
            "TPU — Google's AI accelerator",
            "Cost per 1K tokens — API pricing unit",
            "Streaming — sending tokens as they arrive",
          ].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </Section>

      {/* ================= RESOURCES ================= */}
      <Section id="resources" title="Resources & Communities">
        <h3 className="mt-2 font-semibold">Books</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><em>Artificial Intelligence: A Modern Approach</em> — Russell & Norvig</li>
          <li><em>Deep Learning</em> — Goodfellow, Bengio, Courville</li>
          <li><em>Hands-On Machine Learning</em> — Aurélien Géron</li>
          <li><em>The Alignment Problem</em> — Brian Christian</li>
        </ul>
        <h3 className="mt-4 font-semibold">Courses</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>DeepLearning.AI — Generative AI with LLMs</li>
          <li>Andrew Ng's Machine Learning Specialization (Coursera)</li>
          <li>fast.ai — Practical Deep Learning</li>
          <li>Google — Generative AI Learning Path</li>
        </ul>
        <h3 className="mt-4 font-semibold">Communities</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Hugging Face forums & Discord</li>
          <li>r/MachineLearning, r/LocalLLaMA</li>
          <li>Kaggle</li>
          <li>Papers with Code</li>
        </ul>
        <h3 className="mt-4 font-semibold">Practice websites</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Kaggle Learn, DeepLearning.AI short courses, Google Colab notebooks</li>
        </ul>
        <h3 className="mt-4 font-semibold">YouTube</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>3Blue1Brown — Neural Networks series</li>
          <li>Andrej Karpathy — "Let's build GPT" lecture</li>
          <li>Two Minute Papers</li>
          <li>Yannic Kilcher</li>
        </ul>
        <h3 className="mt-4 font-semibold">GitHub repositories</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>huggingface/transformers</li>
          <li>langchain-ai/langchain</li>
          <li>karpathy/nanoGPT</li>
          <li>openai-cookbook</li>
        </ul>
      </Section>

      {/* ================= FAQ ================= */}
      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I need coding to use Generative AI?">No. Chatbots need only good English. Coding helps when you start building apps around them.</FAQItem>
        <FAQItem q="Will AI replace my job?">It will replace tasks, not most jobs. Learning to use AI well is the safest bet.</FAQItem>
        <FAQItem q="Which tool should a beginner start with?">Start with ChatGPT or Gemini's free tier — both are excellent for learning.</FAQItem>
        <FAQItem q="Is Generative AI safe for kids?">With supervision, yes — but teach fact-checking and never share personal data.</FAQItem>
        <FAQItem q="How much math do I need?">For using AI: none. For building models: high-school algebra and probability to start.</FAQItem>
        <FAQItem q="How do I stop hallucinations completely?">You can't fully — but grounding, retrieval, and verification massively reduce them.</FAQItem>
      </Section>

      {/* ================= INTERVIEW ================= */}
      <Section id="references" title="References & Interview Questions">
        <h3 className="mt-2 font-semibold">Sample beginner interview questions</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Explain Generative AI to a 10-year-old.</li>
          <li>Difference between predictive and generative models.</li>
          <li>What is a token, and why do models use them?</li>
          <li>What is the attention mechanism?</li>
          <li>What is a context window and why does it matter?</li>
          <li>How is fine-tuning different from pre-training?</li>
          <li>What are hallucinations and how do we reduce them?</li>
          <li>Explain zero-shot vs few-shot prompting.</li>
          <li>What is RAG?</li>
          <li>Name three ethical risks of Generative AI.</li>
        </ol>
        <h3 className="mt-4 font-semibold">Further reading</h3>
        <References />
      </Section>

      {/* ================= DISCLAIMER ================= */}
      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards, and
          trusted educational resources. Generative AI technologies, models, APIs, tools and best
          practices evolve continuously — consult the latest official documentation for
          authoritative guidance. Salary figures, model capabilities, and tool pricing are
          illustrative and change frequently. All trademarks, logos, product names and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
