import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Heart,
  HelpCircle,
  Info,
  Lightbulb,
  Printer,
  Share2,
  Sparkles,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-frequently-asked-questions")({
  head: () => {
    const title = "Artificial Intelligence — Frequently Asked Questions | EduNova AI";
    const desc =
      "100+ answered AI questions across basics, ML, deep learning, neural networks, generative AI, careers, ethics, and practical usage — beginner-friendly explanations and expert tips.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIFrequentlyAskedQuestionsPage,
});

const RESOURCE = {
  id: "ai-frequently-asked-questions",
  title: "Artificial Intelligence — Frequently Asked Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "18 min",
  pages: 22,
  lastUpdated: "June 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
  hierarchy: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  ml: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "basics", label: "1. AI Basics FAQ" },
  { id: "ml", label: "2. Machine Learning FAQ" },
  { id: "dl", label: "3. Deep Learning FAQ" },
  { id: "nn", label: "4. Neural Networks FAQ" },
  { id: "genai", label: "5. Generative AI FAQ" },
  { id: "careers", label: "6. AI Careers FAQ" },
  { id: "ethics", label: "7. AI Ethics FAQ" },
  { id: "practical", label: "8. Practical AI FAQ" },
  { id: "advanced", label: "9. Advanced Questions" },
  { id: "summary", label: "10. Final Summary" },
  { id: "review", label: "FAQ Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faq", label: "FAQ Meta" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

type QA = { q: string; a: string; hint?: string };

const QAS: Record<string, QA[]> = {
  basics: [
    { q: "What is Artificial Intelligence?", a: "AI is the field of building systems that perceive, reason, learn, and act. It ranges from narrow tools (spam filters) to complex assistants (multimodal LLMs)." },
    { q: "Is AI the same as automation?", a: "No. Automation follows fixed rules; AI learns patterns from data and can adapt to new inputs." , hint: "Common misconception." },
    { q: "What are the three main types of AI?", a: "Narrow AI (task-specific), General AI (human-level across tasks, still theoretical), and Super AI (beyond human, hypothetical)." },
    { q: "Is ChatGPT General AI?", a: "No. It is a narrow but very capable language model." },
    { q: "What are examples of AI you use daily?", a: "Search ranking, spam filtering, product recommendations, maps ETAs, voice assistants, and photo tagging." },
    { q: "Do I need a PhD to work in AI?", a: "Not for engineering-focused roles. Research roles benefit from a PhD; applied roles reward strong software + ML fundamentals." },
    { q: "How is AI different from Data Science?", a: "Data Science covers analysis and insight from data; AI focuses on systems that learn to make decisions or predictions." },
    { q: "What is the difference between AI and ML?", a: "ML is a subset of AI. ML models learn from data; AI is the broader field including symbolic and hybrid approaches." },
    { q: "Is AI dangerous?", a: "AI amplifies whatever it is trained and used for. Risks include misuse, bias, misinformation, and safety-critical failures. Responsible design mitigates most." },
    { q: "What programming language is best for AI?", a: "Python by a wide margin due to library support (PyTorch, TensorFlow, scikit-learn). Rust and C++ appear for performance-critical serving." },
  ],
  ml: [
    { q: "What is Machine Learning?", a: "A discipline of teaching computers to learn patterns from data instead of hand-coding rules." },
    { q: "What are the categories of ML?", a: "Supervised, unsupervised, and reinforcement learning. Semi-supervised and self-supervised sit between." },
    { q: "What is supervised learning?", a: "Learning from labelled examples (input → target). Classification and regression are the two main tasks." },
    { q: "What is unsupervised learning?", a: "Discovering structure in unlabelled data: clustering, dimensionality reduction, anomaly detection." },
    { q: "What is reinforcement learning?", a: "An agent learns a policy by interacting with an environment and receiving rewards." },
    { q: "What is overfitting?", a: "When a model memorises training data and fails on unseen data. Fix with more data, regularisation, or a smaller model." },
    { q: "How do I split my data?", a: "Typically 70/15/15 or 80/10/10 for train/val/test. Time-series data uses forward-chaining, not random splits." },
    { q: "What is a confusion matrix?", a: "A table of true vs predicted labels used to compute precision, recall, F1, and accuracy for classification." },
    { q: "Should I always use deep learning?", a: "No. For tabular data, gradient-boosted trees (XGBoost/LightGBM) usually outperform deep models." },
    { q: "How much data do I need?", a: "Rule of thumb: enough that your metric's confidence interval is smaller than the improvement you care about." },
  ],
  dl: [
    { q: "What is deep learning?", a: "ML using multi-layer neural networks. Depth lets models learn hierarchical features automatically." },
    { q: "What is backpropagation?", a: "The algorithm that computes gradients of the loss with respect to weights using the chain rule." },
    { q: "What is a GPU used for in DL?", a: "Massively parallel matrix multiplication — the core of neural network training and inference." },
    { q: "What is a transformer?", a: "A neural architecture built on self-attention. It powers most modern language and multimodal models." },
    { q: "Why is attention important?", a: "It lets the model weigh different input tokens for each output, capturing long-range dependencies without recurrence." },
    { q: "What is transfer learning?", a: "Reusing a model pretrained on a large dataset as a starting point for a smaller, related task." },
    { q: "What is fine-tuning?", a: "Training a pretrained model on your task-specific data, usually with a small learning rate." },
    { q: "What is a batch size?", a: "The number of examples processed per gradient update. Small batches add noise; large batches train faster but need more memory." },
    { q: "What is a learning rate?", a: "How large each optimiser step is. It is the single most important hyperparameter to tune." },
    { q: "Why is DL data-hungry?", a: "Large models have many parameters. Without enough data they overfit; regularisation and pretraining help." },
  ],
  nn: [
    { q: "What is a neuron?", a: "A weighted sum of inputs passed through a non-linear activation like ReLU or GELU." },
    { q: "What is an activation function?", a: "A non-linearity that lets networks approximate complex functions. Common: ReLU, GELU, sigmoid, tanh." },
    { q: "What is a CNN used for?", a: "Grid-structured data like images. It uses convolutional filters and pooling to learn spatial features." },
    { q: "What is an RNN?", a: "A network for sequences that maintains a hidden state across time steps. Mostly superseded by transformers." },
    { q: "What is dropout?", a: "A regularisation technique that randomly zeros activations during training to prevent co-adaptation." },
    { q: "What is batch normalisation?", a: "Normalises layer inputs per mini-batch to stabilise and speed up training." },
    { q: "What is an embedding?", a: "A learned dense vector representing an entity such as a word, user, or item." },
    { q: "How deep should my network be?", a: "As deep as the data supports without overfitting. Start small; scale only when it helps validation." },
    { q: "What is vanishing gradient?", a: "Gradients shrink as they flow through many layers, slowing learning. Skip connections and better activations mitigate it." },
    { q: "What is a loss function?", a: "A scalar that quantifies how wrong a prediction is. Choice depends on the task (MSE for regression, cross-entropy for classification)." },
  ],
  genai: [
    { q: "What is Generative AI?", a: "Models that produce new content (text, images, audio, code) rather than just classify." },
    { q: "What is an LLM?", a: "A Large Language Model — a transformer trained on massive text corpora to predict tokens." },
    { q: "What is a prompt?", a: "The input text you give an LLM to steer its output. Prompt engineering is the craft of writing effective prompts." },
    { q: "What is RAG?", a: "Retrieval-Augmented Generation — grounding an LLM's output in retrieved documents to reduce hallucinations." },
    { q: "What is a hallucination?", a: "When a model produces plausible but false content. Mitigated with retrieval grounding, guardrails, and evaluation." },
    { q: "What is diffusion?", a: "A generative process that iteratively denoises random noise into structured output, used in image models like Stable Diffusion." },
    { q: "What is a token?", a: "A subword unit an LLM operates on. Roughly 3–4 characters of English text per token." },
    { q: "What is a context window?", a: "The maximum number of tokens (input + output) a model can process in one call." },
    { q: "What is fine-tuning vs prompting?", a: "Prompting reshapes behaviour at inference time; fine-tuning changes the weights. Prompting is cheaper; fine-tuning gives deeper control." },
    { q: "Are LLMs conscious?", a: "No. They predict likely next tokens. They can be surprisingly capable without any subjective experience." },
  ],
  careers: [
    { q: "What roles exist in AI?", a: "ML Engineer, Data Scientist, Applied Scientist, Research Scientist, MLOps Engineer, Data Engineer, AI Product Manager." },
    { q: "What skills do I need for ML Engineering?", a: "Strong Python + software engineering, ML fundamentals, systems thinking, and enough math to reason about models." },
    { q: "How important is math?", a: "Essential at the concept level (linear algebra, calculus, probability). Deep proofs are optional for most applied roles." },
    { q: "Do I need Kaggle experience?", a: "It helps, but real projects and clear write-ups matter more to hiring managers." },
    { q: "What is a good portfolio project?", a: "One that solves a real problem end-to-end: data collection, model, evaluation, deployment, and a clear README." },
    { q: "How do I stand out?", a: "Ship things. A working demo with a public repo and a written post beats twenty half-finished notebooks." },
    { q: "Bootcamp or degree?", a: "Both work. A degree opens research roles; a strong bootcamp portfolio can enter industry roles faster." },
    { q: "What certifications matter?", a: "Vendor certifications (AWS/GCP/Azure ML, NVIDIA) help clear resume screens; portfolios seal the deal." },
    { q: "How is the AI job market?", a: "Strong at senior levels; competitive at entry. Applied engineers who can ship are especially in demand." },
    { q: "What are the top hiring signals?", a: "Deployed projects, clear technical writing, mentorship or teaching, and evidence of business impact." },
  ],
  ethics: [
    { q: "What is AI bias?", a: "Systematic errors that disadvantage a group, usually inherited from training data or objective misalignment." },
    { q: "What is fairness in ML?", a: "A family of definitions (demographic parity, equal opportunity, calibration) — pick one that matches the decision context." },
    { q: "Is anonymised data always safe?", a: "No. Re-identification attacks combine sources. Add k-anonymity, differential privacy, or aggregate reporting." },
    { q: "Who owns AI-generated content?", a: "Jurisdiction-dependent and evolving. Many outputs today have unclear or weak copyright protection." },
    { q: "What is explainability?", a: "The ability to explain why a model made a decision — feature attributions (SHAP), counterfactuals, or interpretable models." },
    { q: "What is the EU AI Act?", a: "A risk-tiered regulation for AI systems in the EU, with obligations rising for higher-risk uses." },
    { q: "Should AI make final decisions?", a: "Only when the risk is low and monitoring is strong. High-impact decisions should keep a human in the loop." },
    { q: "What about deepfakes?", a: "A serious misuse risk. Provenance (C2PA), watermarking, and detection help but are not a full solution." },
  ],
  practical: [
    { q: "How do I choose a model?", a: "Start with the simplest baseline that could work. Add complexity only when validation metrics justify it." },
    { q: "How do I evaluate an LLM?", a: "Use a mix of automatic metrics (BLEU, ROUGE, exact match) and human/LLM-as-judge evaluations on task-specific rubrics." },
    { q: "How do I reduce inference cost?", a: "Distillation, quantisation, caching, batching, and picking the smallest model that meets your quality bar." },
    { q: "How do I keep secrets out of prompts?", a: "Never inject secrets into prompts. Retrieve after auth, and redact PII from logs." },
    { q: "How do I detect drift?", a: "Monitor input feature distributions (PSI/KS), prediction distributions, and downstream KPIs together." },
    { q: "How often should I retrain?", a: "On a fixed cadence and on drift alarms — whichever comes first." },
    { q: "Do I need a vector database?", a: "For scale, yes. Small prototypes work with FAISS or an in-memory index; scale drives Pinecone/pgvector/etc." },
    { q: "How do I version my models?", a: "Semantic version + data hash + code hash. Store the artefact alongside the model card." },
  ],
  advanced: [
    { q: "What is mixture-of-experts?", a: "An architecture where a router activates a few specialist sub-networks per token, trading compute for capacity." },
    { q: "What is RLHF?", a: "Reinforcement Learning from Human Feedback — align a model to human preferences using a reward model." },
    { q: "What is chain-of-thought prompting?", a: "Asking an LLM to reason step by step to improve accuracy on multi-step problems." },
    { q: "What is speculative decoding?", a: "A serving trick where a small draft model proposes tokens and a larger model verifies, cutting latency." },
    { q: "What is calibration?", a: "Alignment between predicted probabilities and observed frequencies. Poorly calibrated models mislead decisions." },
    { q: "What are agents?", a: "LLM-driven systems that plan, use tools, and act in loops toward a goal. Reliable in narrow domains, fragile broadly." },
    { q: "What is a MoE trade-off?", a: "Higher capacity for the same active compute, but harder to serve and load-balance." },
    { q: "What are scaling laws?", a: "Empirical relationships between model size, data, and compute predicting loss. They guide training budgets." },
  ],
};

function useToggleStore(key: string, id: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      setOn(arr.includes(id));
    } catch { /* empty */ }
  }, [key, id]);
  const toggle = () => {
    try {
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      window.localStorage.setItem(key, JSON.stringify(next));
      setOn(next.includes(id));
    } catch { /* empty */ }
  };
  return [on, toggle] as const;
}

function AIFrequentlyAskedQuestionsPage() {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
      let current = TOC[0].id;
      for (const item of TOC) {
        const s = document.getElementById(item.id);
        if (s && s.getBoundingClientRect().top < 140) current = item.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share({ title: RESOURCE.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const readingTitle = useMemo(() => RESOURCE.title, []);

  const totalQ = Object.values(QAS).reduce((n, arr) => n + arr.length, 0);

  return (
    <div className="bg-background">
      <style>{`@media print{.no-print{display:none!important}.print-article{padding:0!important}body{background:#fff!important}}`}</style>

      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1" aria-hidden>
        <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime} · {totalQ} Q&amp;A</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}><Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>{bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}<span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}><Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} /><span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}><Share2 className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Share</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}><Printer className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Print</span></Button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-violet-700/75 to-indigo-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-sky-500/90 text-white hover:bg-sky-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">{totalQ}+ Q&amp;A</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            The essential AI questions — answered clearly. Ideal for beginners, students preparing for
            interviews, and anyone looking to sharpen their understanding.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {RESOURCE.readingTime} read</span>
            <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" /> {RESOURCE.pages} pages</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Updated {RESOURCE.lastUpdated}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {RESOURCE.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
                <Tag className="h-3 w-3" /> {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-14">
        <aside className="no-print hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Contents</p>
            <nav className="space-y-1 text-sm">
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`} className={`block rounded-md px-2 py-1.5 transition ${activeId === t.id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{t.label}</a>
              ))}
            </nav>
          </div>
        </aside>

        <article ref={articleRef} className="print-article prose prose-slate max-w-none dark:prose-invert">
          <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
            <ul className="mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              <li>Understand the fundamentals of Artificial Intelligence.</li>
              <li>Clarify common misconceptions.</li>
              <li>Learn AI terminology.</li>
              <li>Gain confidence through practical examples.</li>
              <li>Prepare for interviews and academic discussions.</li>
              <li>Get honest, up-to-date expert answers.</li>
            </ul>
          </Callout>

          <QASection id="basics" title="1. AI Basics FAQ" items={QAS.basics}>
            <figure>
              <img src={IMG.hierarchy} alt="AI, ML, DL nested hierarchy" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI.</figcaption>
            </figure>
          </QASection>

          <QASection id="ml" title="2. Machine Learning FAQ" items={QAS.ml}>
            <ComparisonTable
              headers={["Type", "Input", "Output", "Typical Task"]}
              rows={[
                ["Supervised", "X + labels", "Prediction", "Spam detection"],
                ["Unsupervised", "X only", "Structure", "Customer segmentation"],
                ["Reinforcement", "State + reward", "Policy", "Game playing / robotics"],
                ["Self-supervised", "X + pretext task", "Representation", "LLM pretraining"],
              ]}
            />
          </QASection>

          <QASection id="dl" title="3. Deep Learning FAQ" items={QAS.dl}>
            <figure>
              <img src={IMG.ml} alt="Deep learning training loop" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Forward pass → loss → backward pass → weight update.</figcaption>
            </figure>
          </QASection>

          <QASection id="nn" title="4. Neural Networks FAQ" items={QAS.nn} />
          <QASection id="genai" title="5. Generative AI FAQ" items={QAS.genai} />
          <QASection id="careers" title="6. AI Careers FAQ" items={QAS.careers} />
          <QASection id="ethics" title="7. AI Ethics FAQ" items={QAS.ethics} />
          <QASection id="practical" title="8. Practical AI FAQ" items={QAS.practical} />
          <QASection id="advanced" title="9. Advanced Questions" items={QAS.advanced} />

          <Section id="summary" title="10. Final Summary">
            <ul>
              <li>AI is a broad field; ML is where most day-to-day work happens.</li>
              <li>Start simple, evaluate honestly, and ship small.</li>
              <li>Data quality dominates model choice for most problems.</li>
              <li>Monitor drift, subgroup performance, and downstream KPIs — not accuracy alone.</li>
              <li>Explainability and human oversight matter more as impact grows.</li>
            </ul>

            <h4>Key Takeaways</h4>
            <ul>
              <li>Prefer simple, well-understood models unless data justifies complexity.</li>
              <li>Fine-tune only when prompting cannot get you there.</li>
              <li>Evaluate with confidence intervals, not point estimates.</li>
              <li>Version everything: data, code, model, prompt.</li>
              <li>Design for rollback — every deployment is temporary.</li>
            </ul>
          </Section>

          <Section id="review" title="FAQ Review">
            <h4>Top 20 Most Asked Questions</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>What is AI?</li>
              <li>What is the difference between AI, ML, and DL?</li>
              <li>Do I need advanced math for AI?</li>
              <li>Which language should I learn first?</li>
              <li>How much data do I need?</li>
              <li>What is overfitting?</li>
              <li>What is a neural network?</li>
              <li>What is a transformer?</li>
              <li>What is an LLM?</li>
              <li>What is RAG?</li>
              <li>What is a hallucination?</li>
              <li>How do I evaluate an LLM?</li>
              <li>Which framework should I learn — PyTorch or TensorFlow?</li>
              <li>How do I break into an AI career?</li>
              <li>Which certifications are worth taking?</li>
              <li>How do I build a portfolio?</li>
              <li>Is AI biased?</li>
              <li>Is my job at risk?</li>
              <li>How do I keep prompts safe?</li>
              <li>How often should I retrain?</li>
            </ol>

            <h4>Quick Revision</h4>
            <ul>
              <li>AI ⊃ ML ⊃ DL ⊃ GenAI.</li>
              <li>Supervised / Unsupervised / Reinforcement / Self-supervised.</li>
              <li>Metrics: Accuracy, Precision, Recall, F1, ROC-AUC, PR-AUC.</li>
              <li>Regularise: L1/L2, dropout, early stopping, data augmentation.</li>
              <li>Serve: batch → cache → quantise → distill.</li>
            </ul>

            <h4>Interview Preparation</h4>
            <ul>
              <li>Practise explaining bias, variance, and overfitting in one paragraph each.</li>
              <li>Walk through your favourite project end-to-end in under 5 minutes.</li>
              <li>Be able to derive gradient descent on a linear regression by hand.</li>
              <li>Discuss a case where a simple model beat a complex one.</li>
            </ul>

            <h4>Self Assessment</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Can I explain AI to a non-technical friend in one minute?</li>
              <li>Can I choose the right metric for an imbalanced classification task?</li>
              <li>Do I know when NOT to use deep learning?</li>
              <li>Can I describe RAG and when it beats fine-tuning?</li>
              <li>Would I catch data leakage in a peer's project?</li>
            </ol>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>AI</strong> — Systems that perceive, reason, learn, and act.</li>
              <li><strong>ML</strong> — Learning patterns from data.</li>
              <li><strong>DL</strong> — ML with multi-layer neural networks.</li>
              <li><strong>LLM</strong> — Large Language Model.</li>
              <li><strong>RAG</strong> — Retrieval-Augmented Generation.</li>
              <li><strong>Fine-tuning</strong> — Additional training of a pretrained model on task data.</li>
              <li><strong>Overfitting</strong> — Memorising training data at the cost of generalisation.</li>
              <li><strong>Drift</strong> — Change in data or concept distribution over time.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ Meta">
            <FAQ q="Why should I trust these answers?">Every answer is compiled from official documentation, peer-reviewed research, and widely used industry practice — with sources listed in References.</FAQ>
            <FAQ q="How often is this FAQ updated?">Quarterly, or immediately when a major framework or model changes the correct answer.</FAQ>
            <FAQ q="Can I use these answers in an interview?">Yes, as understanding. Interviewers value your own explanation more than memorised text — practise re-phrasing each answer in your own words.</FAQ>
          </Section>

          <References />
          <Disclaimer />
          <RelatedResources />
        </article>
      </div>
    </div>
  );
}

/* ---------------- Sub-components ---------------- */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24"><h2>{title}</h2>{children}</section>;
}
function QASection({ id, title, items, children }: { id: string; title: string; items: QA[]; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2>{title}</h2>
      {children}
      <div className="not-prose grid gap-2">
        {items.map((qa) => (
          <details key={qa.q} className="rounded-xl border border-border/60 bg-card p-4">
            <summary className="cursor-pointer text-sm font-semibold">{qa.q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{qa.a}</p>
            {qa.hint && <p className="mt-1 text-xs italic text-amber-600 dark:text-amber-400">{qa.hint}</p>}
          </details>
        ))}
      </div>
    </section>
  );
}
function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="not-prose my-4 overflow-hidden rounded-xl border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-secondary/60"><tr>{headers.map((h) => <th key={h} className="p-2 text-left">{h}</th>)}</tr></thead>
        <tbody className="[&_td]:border-t [&_td]:p-2">
          {rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}
function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return <details className="not-prose my-2 rounded-xl border border-border/60 bg-card p-4"><summary className="cursor-pointer text-sm font-semibold">{q}</summary><div className="mt-2 text-sm text-muted-foreground">{children}</div></details>;
}
function Callout({ tone, title, icon, children }: { tone: "tip" | "info" | "note" | "warning" | "success"; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    tip: "border-amber-500/40 bg-amber-500/10",
    info: "border-sky-500/40 bg-sky-500/10",
    note: "border-violet-500/40 bg-violet-500/10",
    warning: "border-red-500/40 bg-red-500/10",
    success: "border-emerald-500/40 bg-emerald-500/10",
  };
  const defaultIcon: Record<string, React.ReactNode> = { tip: <Lightbulb className="h-5 w-5" />, info: <Info className="h-5 w-5" />, note: <Info className="h-5 w-5" />, warning: <Info className="h-5 w-5" />, success: <CheckCircle2 className="h-5 w-5" /> };
  return (
    <div className={`not-prose rounded-2xl border-l-4 ${styles[tone]} p-4`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon ?? defaultIcon[tone]}</div>
        <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><div className="mt-1 text-sm">{children}</div></div>
      </div>
    </div>
  );
}
function References() {
  return (
    <section id="references" className="scroll-mt-24 not-prose mt-8 rounded-2xl border border-border/60 bg-card p-6">
      <h3 className="text-lg font-semibold">References</h3>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Official Documentation</p>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
        <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
        <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow</a></li>
        <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch</a></li>
        <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn — AI</a></li>
        <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM AI</a></li>
        <li><a href="https://www.nvidia.com/en-us/ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI</a></li>
        <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face</a></li>
      </ul>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Academic Resources</p>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
        <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Laboratory</a></li>
        <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Carnegie Mellon University — SCS</a></li>
        <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
        <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
      </ul>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Research</p>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — AI</a></li>
        <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
        <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
        <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore</a></li>
      </ul>
    </section>
  );
}
function Disclaimer() {
  return (
    <section id="disclaimer" className="scroll-mt-24 not-prose mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
      <p className="font-semibold text-foreground">Disclaimer</p>
      <p className="mt-2">This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, and trusted educational resources. Artificial Intelligence is a rapidly evolving field, and technologies may change over time. Learners should consult official documentation for the latest and most accurate information.</p>
      <p className="mt-2">All trademarks, logos, product names, and intellectual property belong to their respective owners. EduNova AI does not claim ownership of any third-party materials referenced in this resource.</p>
    </section>
  );
}
function RelatedResources() {
  const items = [
    { title: "Artificial Intelligence — Learning Roadmap", tag: "AI & Data", time: "9 min", to: "/resources/read/ai-learning-roadmap" },
    { title: "Artificial Intelligence — Tips & Tricks", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-tips-tricks" },
    { title: "Artificial Intelligence — Best Practices", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-best-practices" },
    { title: "Artificial Intelligence — Common Mistakes", tag: "AI & Data", time: "16 min", to: "/resources/read/ai-common-mistakes" },
    { title: "Artificial Intelligence — Beginner Guide", tag: "AI & Data", time: "14 min", to: "/resources/read/ai-beginner-guide" },
    { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" },
  ];
  return (
    <div className="no-print mt-16 not-prose">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue learning</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Related resources</h2>
        </div>
        <Link to="/resources" className="hidden text-sm font-medium text-primary hover:underline sm:inline">Browse library →</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r, i) => (
          <motion.a key={r.title} href={r.to} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }}
            className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"><BookOpen className="h-5 w-5" /></div>
            <p className="mt-3 text-sm font-semibold">{r.title}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-[10px]">{r.tag}</Badge>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">Open resource <ArrowRight className="h-3 w-3" /></span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
