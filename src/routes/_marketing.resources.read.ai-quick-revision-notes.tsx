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
  Info,
  Lightbulb,
  Printer,
  Share2,
  Sparkles,
  Tag,
  ListChecks,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-quick-revision-notes")({
  head: () => {
    const title = "Artificial Intelligence — Quick Revision Notes | EduNova AI";
    const desc =
      "Fast, exam-focused AI revision — definitions, comparisons, neural networks, workflow, keywords, MCQs, and interview questions in 12 minutes.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIQuickRevisionPage,
});

const RESOURCE = {
  id: "ai-quick-revision-notes",
  title: "Artificial Intelligence — Quick Revision Notes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 5,
  lastUpdated: "January 2026",
  tags: ["Artificial Intelligence", "AI Fundamentals", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1800&q=80",
  overview: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  compare: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  neural: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  workflow: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80",
  apps: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
  mind: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&q=80",
};

type TocItem = { id: string; label: string };
const TOC: TocItem[] = [
  { id: "s1", label: "AI at a Glance" },
  { id: "s2", label: "Key Definitions" },
  { id: "s3", label: "Types of AI" },
  { id: "s4", label: "AI vs ML vs DL" },
  { id: "s5", label: "Neural Networks Overview" },
  { id: "s6", label: "AI Workflow" },
  { id: "s7", label: "Popular Applications" },
  { id: "s8", label: "Important Terms" },
  { id: "s9", label: "Interview Questions" },
  { id: "s10", label: "Final Revision Checklist" },
];

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

function useToggleStore(key: string, id: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      setOn(arr.includes(id));
    } catch {
      /* empty */
    }
  }, [key, id]);
  const toggle = () => {
    try {
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      window.localStorage.setItem(key, JSON.stringify(next));
      setOn(next.includes(id));
    } catch {
      /* empty */
    }
  };
  return [on, toggle] as const;
}

function AIQuickRevisionPage() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);

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
        const node = document.getElementById(item.id);
        if (node && node.getBoundingClientRect().top < 120) current = item.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    const y = node.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const share = async () => {
    const shareData = {
      title: RESOURCE.title,
      text: "Quick AI revision notes on EduNova AI",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* cancelled */
    }
  };
  const download = () => {
    toast.info("Preparing print-ready PDF…");
    setTimeout(() => window.print(), 300);
  };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("s1");
  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-article { padding: 0 !important; }
          body { background: white !important; }
        }
      `}</style>

      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1 bg-transparent" aria-hidden>
        <div
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Sticky action bar */}
      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <Zap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                {progress}% read · {RESOURCE.readingTime}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" className="shrink-0" onClick={scrollToArticle}>
              <BookOpen className="mr-1.5 h-4 w-4" /> Read Online
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}>
              <Download className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={toggleBookmark}
              aria-pressed={bookmarked}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={toggleSaved}
              aria-pressed={saved}
              aria-label={saved ? "Unsave" : "Save for later"}
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share} aria-label="Share">
              <Share2 className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Share</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print} aria-label="Print">
              <Printer className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cover */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="Quick revision cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/85 via-fuchsia-700/75 to-indigo-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            to="/resources"
            className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Fast Revision · 10 Sections</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {RESOURCE.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            An exam- and interview-focused sprint through Artificial Intelligence: crisp definitions,
            memory tips, comparison tables, and self-check MCQs.
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

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* TOC */}
          <aside className="no-print lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ListChecks className="h-4 w-4 text-primary" /> Sections
              </p>
              <ol className="mt-3 space-y-0.5 text-sm">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(item.id)}
                      className={`group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition ${
                        activeId === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0 text-[10px] font-mono opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="line-clamp-2">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <div className="mt-4 rounded-xl bg-secondary/70 p-3 text-xs">
                <p className="font-semibold">Reading progress</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
                  <div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-1.5 text-muted-foreground">{progress}% complete</p>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article
            ref={articleRef}
            className="print-article mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base"
          >
            <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Recall the core concepts of Artificial Intelligence.</li>
                <li>Differentiate AI, ML, and Deep Learning.</li>
                <li>Revise Neural Network fundamentals.</li>
                <li>Remember important AI terminology.</li>
                <li>Quickly review real-world AI applications.</li>
                <li>Prepare efficiently for exams and interviews.</li>
              </ul>
            </Callout>

            <Section id="s1" n={1} title="Artificial Intelligence at a Glance">
              <Figure src={IMG.overview} caption="AI powers systems that perceive, reason, learn, and act." />
              <KeyPoints
                items={[
                  "AI = machines that mimic human intelligence.",
                  "Learns patterns from data instead of hand-coded rules.",
                  "Subfields: ML, DL, CV, NLP, Robotics, KR.",
                  "Today's AI is Narrow AI — task-specific, not conscious.",
                ]}
              />
              <MemoryTip>Think “P-R-L-A” — Perceive, Reason, Learn, Act.</MemoryTip>
            </Section>

            <Section id="s2" n={2} title="AI Key Definitions">
              <Definitions
                items={[
                  ["AI", "Systems that mimic cognitive functions like learning and decision-making."],
                  ["ML", "Algorithms that learn patterns from data."],
                  ["DL", "ML using deep neural networks."],
                  ["Agent", "An entity that perceives its environment and acts on it."],
                  ["Model", "A trained function mapping inputs to outputs."],
                  ["Training", "Adjusting model parameters to minimize loss."],
                  ["Inference", "Using a trained model to make predictions."],
                ]}
              />
            </Section>

            <Section id="s3" n={3} title="Types of Artificial Intelligence">
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="Narrow AI" body="Task-specific. All AI today (spam filter, translator)." />
                <InfoCard title="General AI" body="Human-level intelligence. Hypothetical." />
                <InfoCard title="Super AI" body="Beyond humans. Speculative." />
              </div>
              <MemoryTip>Also classified as Reactive, Limited-memory, Theory-of-Mind, Self-aware.</MemoryTip>
            </Section>

            <Section id="s4" n={4} title="AI vs Machine Learning vs Deep Learning">
              <Figure src={IMG.compare} caption="AI ⊃ ML ⊃ DL — nested subsets." />
              <ComparisonTable
                headers={["Aspect", "AI", "ML", "DL"]}
                rows={[
                  ["Scope", "Broadest", "Subset of AI", "Subset of ML"],
                  ["Approach", "Rules + learning", "Learn from data", "Deep neural nets"],
                  ["Data need", "Varies", "Moderate", "Large"],
                  ["Interpretability", "Varies", "Often high", "Often low"],
                  ["Examples", "Chess engine", "Spam filter", "ChatGPT"],
                ]}
              />
            </Section>

            <Section id="s5" n={5} title="Neural Networks Overview">
              <Figure src={IMG.neural} caption="Input → hidden layers → output. Each edge is a learnable weight." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Forward pass — compute prediction.</li>
                <li>Loss — measure error.</li>
                <li>Backpropagation — send gradients backward.</li>
                <li>Update weights via gradient descent.</li>
              </ol>
              <FormulaRow name="Gradient Descent" formula="θ ← θ − α · ∇L(θ)" />
              <FormulaRow name="Sigmoid" formula="σ(x) = 1 / (1 + e^(−x))" />
              <FormulaRow name="Cross-Entropy" formula="L = −Σ yᵢ · log(ŷᵢ)" />
            </Section>

            <Section id="s6" n={6} title="AI Workflow">
              <Figure src={IMG.workflow} caption="Problem → Data → Model → Evaluate → Deploy → Monitor." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Define the problem and success metric.</li>
                <li>Collect and clean data.</li>
                <li>Train a baseline model.</li>
                <li>Evaluate on held-out data.</li>
                <li>Deploy and monitor for drift.</li>
              </ol>
              <MemoryTip>Mnemonic: <strong>P-D-M-E-D-M</strong> (Problem, Data, Model, Evaluate, Deploy, Monitor).</MemoryTip>
            </Section>

            <Section id="s7" n={7} title="Popular AI Applications">
              <Figure src={IMG.apps} caption="AI is embedded across industries." />
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Healthcare" body="Imaging, triage, drug discovery." />
                <InfoCard title="Finance" body="Fraud detection, credit scoring." />
                <InfoCard title="Education" body="Adaptive learning, AI tutors." />
                <InfoCard title="Cybersecurity" body="Anomaly & phishing detection." />
                <InfoCard title="Assistants" body="Chatbots, copilots, agents." />
                <InfoCard title="Creative" body="Image, video, and music generation." />
              </div>
            </Section>

            <Section id="s8" n={8} title="Important AI Terms (Top 20 Keywords)">
              <Figure src={IMG.mind} caption="Mind-map the terms; group by topic." />
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[
                  "Feature", "Label", "Loss", "Gradient", "Backprop", "Epoch",
                  "Batch", "Learning Rate", "Regularization", "Dropout",
                  "Attention", "Embedding", "Token", "Fine-tune", "Zero-shot",
                  "Prompt", "Hallucination", "Bias", "Drift", "MLOps",
                ].map((k) => (
                  <span key={k} className="rounded-lg border border-border/60 bg-card px-2.5 py-1.5 text-center text-xs font-medium">
                    {k}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="s9" n={9} title="Frequently Asked Interview Questions">
              <div className="space-y-3">
                <QACard
                  q="Difference between AI, ML, and DL?"
                  a="AI mimics intelligence broadly. ML is AI that learns from data. DL is ML with deep neural networks."
                />
                <QACard
                  q="What is overfitting?"
                  a="Model memorizes training data and fails on new data. Fix: more data, regularization, simpler model."
                />
                <QACard
                  q="Bias-variance trade-off?"
                  a="Bias = wrong assumptions (underfit). Variance = sensitivity to data (overfit). Balance both."
                />
                <QACard
                  q="How does backpropagation work?"
                  a="Compute loss, propagate gradients backward, update weights via gradient descent."
                />
                <QACard
                  q="What is a transformer?"
                  a="Neural architecture based on self-attention; powers modern LLMs and vision models."
                />
                <QACard
                  q="What is RAG?"
                  a="Retrieval-Augmented Generation — retrieve relevant documents before an LLM answers to improve factuality."
                />
                <QACard
                  q="Evaluate an imbalanced classifier?"
                  a="Use precision, recall, F1, and PR-AUC — not raw accuracy."
                />
              </div>
            </Section>

            <Section id="s10" n={10} title="Final Revision Checklist">
              <Callout tone="success" title="You should be able to…" icon={<CheckCircle2 className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Define AI, ML, and DL and describe their relationship.</li>
                  <li>List the three types of AI and give one example each.</li>
                  <li>Explain the neural network learning loop.</li>
                  <li>Recall the 6-step AI workflow.</li>
                  <li>Name 5+ real-world AI applications.</li>
                  <li>Recall 20 important AI keywords.</li>
                  <li>Answer 7+ common interview questions confidently.</li>
                </ul>
              </Callout>

              <h3 className="mt-8 text-lg font-semibold">Quick MCQs (10)</h3>
              <MCQ q="AI ⊃ ML ⊃ DL is:" options={["True", "False"]} answer="True" />
              <MCQ q="Which is NOT supervised learning?" options={["Logistic Regression", "K-Means", "Random Forest", "SVM"]} answer="K-Means" />
              <MCQ q="Backprop is used to:" options={["Preprocess data", "Compute gradients", "Choose learning rate", "Split data"]} answer="Compute gradients" />
              <MCQ q="Best metric for imbalanced classes:" options={["Accuracy", "F1", "MSE", "MAE"]} answer="F1" />
              <MCQ q="Transformers rely on:" options={["Convolutions", "Self-attention", "Recurrence", "Trees"]} answer="Self-attention" />
              <MCQ q="RAG stands for:" options={["Random Attention Graph", "Retrieval-Augmented Generation", "Recurrent Adaptive Gradient", "Regularized Auto-Grad"]} answer="Retrieval-Augmented Generation" />
              <MCQ q="Overfitting is fixed by:" options={["More parameters", "Regularization", "Removing validation", "Ignoring loss"]} answer="Regularization" />
              <MCQ q="Sigmoid outputs are in range:" options={["(−∞, ∞)", "(0, 1)", "(−1, 1)", "[0, ∞)"]} answer="(0, 1)" />
              <MCQ q="Which is a clustering algorithm?" options={["K-Means", "Logistic Regression", "SVM", "Linear Regression"]} answer="K-Means" />
              <MCQ q="Which is a generative model family?" options={["Random Forest", "Diffusion", "KNN", "PCA"]} answer="Diffusion" />

              <h3 className="mt-8 text-lg font-semibold">True / False (5)</h3>
              <TF q="All modern AI is General AI." a="False" />
              <TF q="Deep Learning is a subset of Machine Learning." a="True" />
              <TF q="Accuracy is always the best metric." a="False" />
              <TF q="Transformers are used in NLP and Vision." a="True" />
              <TF q="LLMs never hallucinate." a="False" />

              <h3 className="mt-8 text-lg font-semibold">Rapid-Fire (5)</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Full form of LLM? <span className="text-muted-foreground">— Large Language Model.</span></li>
                <li>One image model family? <span className="text-muted-foreground">— CNN / ViT / Diffusion.</span></li>
                <li>Loss for classification? <span className="text-muted-foreground">— Cross-entropy.</span></li>
                <li>Loss for regression? <span className="text-muted-foreground">— MSE.</span></li>
                <li>One responsible-AI risk? <span className="text-muted-foreground">— Bias / privacy / hallucination.</span></li>
              </ol>
            </Section>

            {/* References */}
            <div className="mt-12 rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-lg font-semibold">References</h3>
              <p className="mt-1 text-sm text-muted-foreground">Trusted and official educational sources.</p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Official Documentation</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
                <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
                <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow Documentation</a></li>
                <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch Documentation</a></li>
                <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn — AI</a></li>
                <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM Artificial Intelligence</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Academic Resources</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
                <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Laboratory</a></li>
                <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Research Resources</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — Artificial Intelligence</a></li>
                <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
                <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
                <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Additional Learning</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
                <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face Documentation</a></li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Disclaimer</p>
              <p className="mt-2">
                This educational resource has been created for learning, revision, and interview
                preparation purposes only. The content is compiled, summarized, and organized from
                publicly available educational materials, official documentation, academic
                publications, research papers, and trusted industry resources. While every effort has
                been made to ensure accuracy, Artificial Intelligence is a rapidly evolving field,
                and technologies may change over time.
              </p>
              <p className="mt-2">
                All trademarks, logos, product names, and intellectual property belong to their
                respective owners. EduNova AI does not claim ownership of any third-party materials
                referenced in this resource. Learners are encouraged to consult the official
                references listed above for the latest, most accurate, and comprehensive information.
              </p>
            </div>
          </article>
        </div>

        {/* Related resources */}
        <div className="no-print mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue learning</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Related resources</h2>
            </div>
            <Link to="/resources" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
              Browse library →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Artificial Intelligence — Beginner Guide", tag: "AI & Data", time: "11 min", to: "/resources/read/ai-beginner-guide" as const },
              { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "70 min", to: "/resources/read/ai-complete-tutorial" as const },
              { title: "Artificial Intelligence — Step-by-Step Learning Guide", tag: "AI & Data", time: "26 min", to: "/resources/read/ai-step-by-step-learning-guide" as const },
              { title: "Artificial Intelligence — PDF Notes", tag: "AI & Data", time: "88 min", to: "/resources/read/ai-pdf-notes" as const },
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
              { title: "Neural Networks Explained", tag: "AI & Data", time: "16 min" },
              { title: "AI Ethics", tag: "AI & Society", time: "9 min" },
            ].map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold">{r.title}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[10px]">{r.tag}</Badge>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span>
                </div>
                {r.to ? (
                  <Link to={r.to} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                    Open resource <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <Link to="/resources" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                    Open resource <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Sub-components ------------------------- */

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Section {n}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-foreground/90">{children}</div>
    </section>
  );
}

function Figure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
      <img src={src} alt={caption} className="h-auto w-full object-cover" loading="lazy" />
      <figcaption className="border-t border-border/60 bg-background/60 px-4 py-2 text-xs text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Definitions({ items }: { items: [string, string][] }) {
  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-border/60 bg-card">
      <table className="w-full text-sm">
        <tbody>
          {items.map(([term, def]) => (
            <tr key={term} className="border-b border-border/50 last:border-0">
              <th className="w-32 bg-secondary/50 px-3 py-2 text-left align-top text-xs font-semibold uppercase tracking-wider text-primary">
                {term}
              </th>
              <td className="px-3 py-2">{def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyPoints({ items }: { items: string[] }) {
  return (
    <div className="my-3 rounded-2xl border border-border/60 bg-card p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Sparkles className="h-4 w-4" /> Quick Facts
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}

function MemoryTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 rounded-2xl border-l-4 border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-100">
      <span className="font-semibold">Memory Tip: </span>{children}
    </div>
  );
}

function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-2xl border border-border/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-secondary/60 text-left">
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border/50">
              {row.map((c, j) => (
                <td key={j} className="px-3 py-2 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FormulaRow({ name, formula }: { name: string; formula: string }) {
  return (
    <div className="my-2 flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{name}</span>
      <code className="font-mono text-sm">{formula}</code>
    </div>
  );
}

function QACard({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
        <span>Q. {q}</span>
        <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
      </summary>
      <p className="mt-3 text-sm text-muted-foreground"><span className="font-semibold text-foreground">A.</span> {a}</p>
    </details>
  );
}

function MCQ({ q, options, answer }: { q: string; options: string[]; answer: string }) {
  return (
    <details className="my-3 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="cursor-pointer list-none text-sm font-semibold">Q. {q}</summary>
      <ul className="mt-2 space-y-1 text-sm">
        {options.map((o, i) => (
          <li key={o} className="text-muted-foreground">
            {String.fromCharCode(65 + i)}. {o}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Answer:</span> {answer}
      </p>
    </details>
  );
}

function TF({ q, a }: { q: string; a: "True" | "False" }) {
  return (
    <details className="my-2 rounded-2xl border border-border/60 bg-card p-3 open:shadow-sm">
      <summary className="cursor-pointer list-none text-sm font-medium">{q}</summary>
      <p className="mt-2 text-sm">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Answer:</span> {a}
      </p>
    </details>
  );
}

function Callout({
  tone,
  title,
  icon,
  children,
}: {
  tone: "tip" | "info" | "note" | "warning" | "success";
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    tip: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-100",
    info: "border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100",
    note: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-100",
    warning: "border-red-500/40 bg-red-500/10 text-red-900 dark:text-red-100",
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  };
  const defaultIcon: Record<string, React.ReactNode> = {
    tip: <Lightbulb className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    note: <Info className="h-5 w-5" />,
    warning: <Info className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
  };
  return (
    <div className={`my-4 rounded-2xl border-l-4 ${styles[tone]} p-4`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon ?? defaultIcon[tone]}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <div className="mt-1 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
