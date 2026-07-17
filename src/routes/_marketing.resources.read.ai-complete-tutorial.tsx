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
  Brain,
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
  AlertTriangle,
  ListChecks,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-complete-tutorial")({
  head: () => {
    const title = "Artificial Intelligence — Complete Tutorial | EduNova AI";
    const desc =
      "An end-to-end 70-minute tutorial covering AI, ML, Deep Learning, Neural Networks, Computer Vision, NLP, Generative AI, ethics, careers, and hands-on projects.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AICompleteTutorialPage,
});

const RESOURCE = {
  id: "ai-complete-tutorial",
  title: "Artificial Intelligence — Complete Tutorial",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "70 min",
  pages: 63,
  lastUpdated: "March 2026",
  tags: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Computer Vision",
    "NLP",
    "Generative AI",
    "AI Ethics",
  ],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
  timeline: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  ecosystem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  math: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&q=80",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  mlWorkflow: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80",
  neural: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  cv: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&q=80",
  nlp: "https://images.unsplash.com/photo-1546146830-2cca9512c68e?w=1400&q=80",
  generative: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=80",
  frameworks: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1400&q=80",
  lifecycle: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80",
  healthcare: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=80",
  education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80",
  finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80",
  cyber: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80",
  robotics: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1400&q=80",
  ethics: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80",
  career: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
};

type TocItem = { id: string; label: string };
const TOC: TocItem[] = [
  { id: "intro", label: "Introduction to Artificial Intelligence" },
  { id: "history", label: "History of Artificial Intelligence" },
  { id: "types", label: "Types of AI" },
  { id: "ai-ml-dl", label: "AI vs Machine Learning vs Deep Learning" },
  { id: "math", label: "Mathematics Behind AI" },
  { id: "data", label: "Data Fundamentals" },
  { id: "ml", label: "Machine Learning Fundamentals" },
  { id: "supervised", label: "Supervised Learning" },
  { id: "unsupervised", label: "Unsupervised Learning" },
  { id: "reinforcement", label: "Reinforcement Learning" },
  { id: "neural", label: "Neural Networks" },
  { id: "deep", label: "Deep Learning" },
  { id: "cv", label: "Computer Vision" },
  { id: "nlp", label: "Natural Language Processing (NLP)" },
  { id: "llms", label: "Large Language Models (LLMs)" },
  { id: "genai", label: "Generative AI" },
  { id: "workflow", label: "AI Development Workflow" },
  { id: "frameworks", label: "AI Frameworks" },
  { id: "lifecycle", label: "AI Project Lifecycle" },
  { id: "applications", label: "Real-world AI Applications" },
  { id: "healthcare", label: "AI in Healthcare" },
  { id: "edu", label: "AI in Education" },
  { id: "finance", label: "AI in Finance" },
  { id: "cyber", label: "AI in Cybersecurity" },
  { id: "robotics", label: "AI in Robotics" },
  { id: "ethics", label: "AI Ethics" },
  { id: "responsible", label: "Responsible AI" },
  { id: "career", label: "AI Career Roadmap" },
  { id: "project", label: "Mini AI Project" },
  { id: "summary", label: "Final Summary" },
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

function AICompleteTutorialPage() {
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
      text: "End-to-end AI tutorial on EduNova AI",
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
  const scrollToArticle = () => jumpTo("intro");
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
              <Brain className="h-5 w-5" />
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

      {/* Cover banner */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="AI ecosystem cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/85 via-blue-700/80 to-cyan-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link
            to="/resources"
            className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Complete Tutorial · 30 Chapters</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {RESOURCE.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            An end-to-end tutorial covering every essential topic in Artificial Intelligence — from
            fundamentals to building real-world AI applications, with structured explanations, diagrams,
            and hands-on practice.
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
                <ListChecks className="h-4 w-4 text-primary" /> Chapters
              </p>
              <ol className="mt-3 max-h-[60vh] space-y-0.5 overflow-y-auto pr-1 text-sm">
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
            {/* Objectives */}
            <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Understand Artificial Intelligence fundamentals.</li>
                <li>Differentiate AI, Machine Learning, and Deep Learning.</li>
                <li>Understand Neural Networks, CV, and NLP.</li>
                <li>Explore Generative AI and LLMs.</li>
                <li>Build simple AI projects using modern tools.</li>
                <li>Understand AI ethics and responsible AI practices.</li>
                <li>Prepare for intermediate AI courses.</li>
              </ul>
            </Callout>

            <Chapter id="intro" n={1} title="Introduction to Artificial Intelligence">
              <p>
                Artificial Intelligence (AI) is the science of building machines that perform tasks
                which typically require human intelligence — such as perception, reasoning, learning,
                and decision-making. Modern AI learns patterns from data rather than following manual rules.
              </p>
              <Figure src={IMG.hero} caption="AI spans perception, reasoning, learning, and interaction." />
              <Callout tone="tip" title="Tip">Focus on intuition first. Precise math is easier once the concepts click.</Callout>
            </Chapter>

            <Chapter id="history" n={2} title="History of Artificial Intelligence">
              <Figure src={IMG.timeline} caption="From symbolic AI (1950s) to deep learning (2010s) to generative AI (2020s)." />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>1950</strong> — Turing Test proposed.</li>
                <li><strong>1956</strong> — Dartmouth Workshop coins "AI".</li>
                <li><strong>1997</strong> — Deep Blue defeats Kasparov.</li>
                <li><strong>2012</strong> — AlexNet wins ImageNet, launching the deep-learning era.</li>
                <li><strong>2017</strong> — Transformer architecture introduced.</li>
                <li><strong>2022+</strong> — Generative AI enters the mainstream.</li>
              </ul>
            </Chapter>

            <Chapter id="types" n={3} title="Types of AI">
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="Narrow AI" body="Task-specific systems (e.g., spam filter, translator). All AI today is narrow." />
                <InfoCard title="General AI" body="Hypothetical human-level intelligence across any task." />
                <InfoCard title="Super AI" body="Speculative intelligence beyond human abilities." />
              </div>
            </Chapter>

            <Chapter id="ai-ml-dl" n={4} title="AI vs Machine Learning vs Deep Learning">
              <Figure src={IMG.ecosystem} caption="AI ⊃ ML ⊃ DL. Deep Learning is a subset of ML, which is a subset of AI." />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>AI</strong>: any technique that mimics intelligent behavior.</li>
                <li><strong>ML</strong>: systems that learn from data.</li>
                <li><strong>DL</strong>: ML using deep neural networks.</li>
              </ul>
            </Chapter>

            <Chapter id="math" n={5} title="Mathematics Behind AI">
              <Figure src={IMG.math} caption="Linear algebra, calculus, probability, and statistics power AI." />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Linear Algebra</strong> — vectors, matrices, dot products (data representation).</li>
                <li><strong>Calculus</strong> — derivatives and gradients (optimization).</li>
                <li><strong>Probability & Statistics</strong> — uncertainty, distributions, inference.</li>
                <li><strong>Optimization</strong> — gradient descent to minimize loss.</li>
              </ul>
              <Callout tone="note" title="Note">You don't need a PhD in math to start. Intuition first, formalism as needed.</Callout>
            </Chapter>

            <Chapter id="data" n={6} title="Data Fundamentals">
              <Figure src={IMG.data} caption="Data is the raw material of every AI system." />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Structured</strong> — tables, spreadsheets, databases.</li>
                <li><strong>Unstructured</strong> — text, images, audio, video.</li>
                <li><strong>Semi-structured</strong> — JSON, XML, logs.</li>
              </ul>
              <p>Data quality (accuracy, completeness, balance) matters more than model complexity.</p>
            </Chapter>

            <Chapter id="ml" n={7} title="Machine Learning Fundamentals">
              <Figure src={IMG.mlWorkflow} caption="Collect → Clean → Train → Evaluate → Deploy → Monitor." />
              <p>
                An ML model learns a mapping from inputs to outputs by minimizing a loss function on
                training data, then generalizes to unseen data.
              </p>
            </Chapter>

            <Chapter id="supervised" n={8} title="Supervised Learning">
              <p>Learns from labeled examples (input → correct output).</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Classification</strong> — spam vs not spam, cat vs dog.</li>
                <li><strong>Regression</strong> — predict continuous values (house price).</li>
              </ul>
              <CodeBlock
                language="python"
                code={`from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)
model = LogisticRegression(max_iter=200).fit(X_tr, y_tr)
print("Accuracy:", model.score(X_te, y_te))`}
              />
            </Chapter>

            <Chapter id="unsupervised" n={9} title="Unsupervised Learning">
              <p>Finds structure without labels — clustering, dimensionality reduction, anomaly detection.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>K-Means, DBSCAN — clustering.</li>
                <li>PCA, t-SNE, UMAP — dimensionality reduction.</li>
              </ul>
            </Chapter>

            <Chapter id="reinforcement" n={10} title="Reinforcement Learning">
              <p>
                An agent learns by interacting with an environment and receiving rewards. Used in
                game AI, robotics, and recommendation systems.
              </p>
              <Callout tone="tip" title="Analogy">Training a dog with treats — good actions get rewards, bad ones don't.</Callout>
            </Chapter>

            <Chapter id="neural" n={11} title="Neural Networks">
              <Figure src={IMG.neural} caption="Input → hidden layers → output. Weights adjust during training." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Forward pass — compute prediction.</li>
                <li>Loss — compare to true label.</li>
                <li>Backpropagation — update weights via gradients.</li>
                <li>Repeat until convergence.</li>
              </ol>
            </Chapter>

            <Chapter id="deep" n={12} title="Deep Learning">
              <p>
                Deep learning stacks many layers to learn hierarchical features. Powers modern
                computer vision, speech, and language models.
              </p>
              <Callout tone="warning" title="Warning">Deep learning is data-hungry and compute-hungry. For small tabular problems, classic ML often wins.</Callout>
            </Chapter>

            <Chapter id="cv" n={13} title="Computer Vision">
              <Figure src={IMG.cv} caption="CV pipeline: acquire → preprocess → detect → classify → act." />
              <ul className="list-disc space-y-1 pl-5">
                <li>Image classification, object detection, segmentation.</li>
                <li>OCR, face recognition, medical imaging.</li>
                <li>Common architectures: CNN, ResNet, YOLO, ViT.</li>
              </ul>
            </Chapter>

            <Chapter id="nlp" n={14} title="Natural Language Processing (NLP)">
              <Figure src={IMG.nlp} caption="NLP pipeline: tokenize → embed → model → decode." />
              <ul className="list-disc space-y-1 pl-5">
                <li>Tasks: translation, summarization, sentiment, Q&amp;A.</li>
                <li>Techniques: embeddings, attention, transformers.</li>
              </ul>
            </Chapter>

            <Chapter id="llms" n={15} title="Large Language Models (LLMs)">
              <p>
                LLMs are transformer models trained on massive text corpora to predict the next token.
                They can converse, summarize, translate, and reason across domains.
              </p>
              <Callout tone="note" title="Note">
                LLMs generate <em>plausible</em> text, not guaranteed truth. Always verify factual claims.
              </Callout>
            </Chapter>

            <Chapter id="genai" n={16} title="Generative AI">
              <Figure src={IMG.generative} caption="Generative AI creates new content — text, images, code, audio, video." />
              <ul className="list-disc space-y-1 pl-5">
                <li>Text — LLMs (GPT, Gemini, Claude).</li>
                <li>Image — diffusion models (Stable Diffusion, Midjourney).</li>
                <li>Audio/Video — text-to-speech, music, video generation.</li>
              </ul>
            </Chapter>

            <Chapter id="workflow" n={17} title="AI Development Workflow">
              <ol className="list-decimal space-y-1 pl-5">
                <li>Define the problem and success metric.</li>
                <li>Collect and clean data.</li>
                <li>Build a simple baseline.</li>
                <li>Iterate with better models and features.</li>
                <li>Evaluate on held-out data.</li>
                <li>Deploy and monitor.</li>
              </ol>
            </Chapter>

            <Chapter id="frameworks" n={18} title="AI Frameworks">
              <Figure src={IMG.frameworks} caption="Modern AI stacks combine data, training, and serving tools." />
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="PyTorch" body="Research-friendly deep learning framework, dynamic graphs." />
                <InfoCard title="TensorFlow / Keras" body="Production-ready DL with mobile and edge deployment." />
                <InfoCard title="scikit-learn" body="Classic ML, clean API for tabular data." />
                <InfoCard title="Hugging Face" body="Pretrained models, datasets, and pipelines." />
                <InfoCard title="LangChain / LlamaIndex" body="LLM app orchestration and RAG." />
                <InfoCard title="ONNX" body="Model interoperability across frameworks." />
              </div>
            </Chapter>

            <Chapter id="lifecycle" n={19} title="AI Project Lifecycle">
              <Figure src={IMG.lifecycle} caption="Problem → Data → Model → Evaluation → Deployment → Monitoring." />
              <ul className="list-disc space-y-1 pl-5">
                <li>Discovery & scoping.</li>
                <li>Data engineering & labeling.</li>
                <li>Modeling & experimentation.</li>
                <li>Validation & fairness testing.</li>
                <li>Deployment (batch, online, edge).</li>
                <li>Monitoring, drift detection, retraining.</li>
              </ul>
            </Chapter>

            <Chapter id="applications" n={20} title="Real-world AI Applications">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Search & Recommendations" body="Ranking, personalization, retrieval." />
                <InfoCard title="Assistants" body="Chatbots, copilots, agents." />
                <InfoCard title="Creative Tools" body="Image, video, and music generation." />
                <InfoCard title="Operations" body="Forecasting, logistics, quality control." />
              </div>
            </Chapter>

            <Chapter id="healthcare" n={21} title="AI in Healthcare">
              <Figure src={IMG.healthcare} caption="AI supports diagnosis, imaging, drug discovery, and triage." />
              <p>Example uses: radiology image analysis, clinical decision support, personalized medicine, remote patient monitoring.</p>
            </Chapter>

            <Chapter id="edu" n={22} title="AI in Education">
              <Figure src={IMG.education} caption="Adaptive learning, tutoring, and content generation." />
              <p>Example uses: personalized learning paths, AI tutors, automatic grading, plagiarism detection, accessibility tools.</p>
            </Chapter>

            <Chapter id="finance" n={23} title="AI in Finance">
              <Figure src={IMG.finance} caption="Fraud detection, credit scoring, algorithmic trading, forecasting." />
              <p>Example uses: risk models, anti-money-laundering (AML), robo-advisors, document intelligence.</p>
            </Chapter>

            <Chapter id="cyber" n={24} title="AI in Cybersecurity">
              <Figure src={IMG.cyber} caption="AI detects anomalies, automates response, and hunts threats." />
              <p>Example uses: intrusion detection, phishing detection, behavior analytics, malware classification.</p>
            </Chapter>

            <Chapter id="robotics" n={25} title="AI in Robotics">
              <Figure src={IMG.robotics} caption="Perception + control + planning enables autonomous behavior." />
              <p>Example uses: warehouse automation, autonomous vehicles, surgical robots, drones.</p>
            </Chapter>

            <Chapter id="ethics" n={26} title="AI Ethics">
              <Figure src={IMG.ethics} caption="Fairness, accountability, transparency, and safety." />
              <ul className="list-disc space-y-1 pl-5">
                <li>Bias in datasets and outcomes.</li>
                <li>Privacy and consent.</li>
                <li>Transparency and explainability.</li>
                <li>Environmental impact of large models.</li>
              </ul>
            </Chapter>

            <Chapter id="responsible" n={27} title="Responsible AI">
              <Callout tone="success" title="Responsible AI Principles" icon={<CheckCircle2 className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Fair — avoid unjust bias.</li>
                  <li>Accountable — clear ownership of outcomes.</li>
                  <li>Transparent — explain decisions when it matters.</li>
                  <li>Safe & Secure — robust to misuse.</li>
                  <li>Privacy-preserving — protect user data.</li>
                  <li>Human-centered — augment, don't replace, human judgment.</li>
                </ul>
              </Callout>
            </Chapter>

            <Chapter id="career" n={28} title="AI Career Roadmap">
              <Figure src={IMG.career} caption="Careers in AI: engineer, researcher, data scientist, ML ops, product." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Learn Python, math foundations, and Git.</li>
                <li>Master ML fundamentals with scikit-learn.</li>
                <li>Learn deep learning with PyTorch or TensorFlow.</li>
                <li>Specialize: CV, NLP, LLMs, RL, or MLOps.</li>
                <li>Build a portfolio of real projects.</li>
                <li>Contribute to open-source; publish notes and demos.</li>
              </ol>
            </Chapter>

            <Chapter id="project" n={29} title="Mini AI Project — Sentiment Classifier">
              <p>Build a tiny sentiment classifier on movie reviews.</p>
              <CodeBlock
                language="python"
                code={`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

texts = ["I loved this movie", "boring and slow", "great acting", "not my taste"]
labels = [1, 0, 1, 0]

pipe = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("clf", LogisticRegression()),
])
pipe.fit(texts, labels)
print(pipe.predict(["what a wonderful film"]))`}
              />
              <p className="text-sm text-muted-foreground">Extend it: use a real dataset, try a transformer, add a small web UI.</p>
            </Chapter>

            <Chapter id="summary" n={30} title="Final Summary">
              <Callout tone="success" title="Key Takeaways" icon={<CheckCircle2 className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>AI is systems that learn patterns from data.</li>
                  <li>ML is a subset of AI; deep learning is a subset of ML.</li>
                  <li>Neural networks learn by adjusting weights via backpropagation.</li>
                  <li>CV, NLP, and Generative AI are today's biggest application areas.</li>
                  <li>Responsible AI is not optional — bake fairness, safety, and privacy in early.</li>
                  <li>Data quality &gt; model complexity, almost always.</li>
                </ul>
              </Callout>

              <h3 className="mt-8 text-lg font-semibold">Practice Questions</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Define AI, ML, and DL in one sentence each.</li>
                <li>Give two examples each of supervised, unsupervised, and reinforcement learning.</li>
                <li>What is backpropagation? Why does it need calculus?</li>
                <li>Name three risks addressed by Responsible AI.</li>
                <li>Describe an end-to-end AI project lifecycle.</li>
              </ol>

              <h3 className="mt-8 text-lg font-semibold">Coding Challenges</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Train a linear regression on a public housing dataset.</li>
                <li>Cluster customers with K-Means and interpret the clusters.</li>
                <li>Fine-tune a pretrained image classifier on 3 custom classes.</li>
                <li>Build a small RAG assistant over your own notes.</li>
              </ul>

              <h3 className="mt-8 text-lg font-semibold">Reflection Questions</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Which AI product do you rely on most? Why?</li>
                <li>Where should a human stay in the loop?</li>
                <li>What is one AI ethics concern you personally care about?</li>
              </ol>
            </Chapter>

            {/* References */}
            <div className="mt-12 rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-lg font-semibold">References</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
                <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
                <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow Documentation</a></li>
                <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch Documentation</a></li>
                <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn — AI</a></li>
                <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM AI Learning Hub</a></li>
                <li><a href="https://developer.nvidia.com/ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI</a></li>
                <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
                <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI</a></li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Disclaimer</p>
              <p className="mt-2">
                This educational resource is provided solely for learning purposes. The content has been
                created by compiling, summarizing, and explaining concepts from publicly available
                educational materials, official documentation, academic publications, and trusted
                industry resources. All trademarks, logos, product names, and intellectual property
                belong to their respective owners. This resource does not replace official documentation
                or accredited educational materials. Learners are encouraged to consult the official
                references listed above for the latest, most accurate, and complete information.
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
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
              { title: "Neural Networks Explained", tag: "AI & Data", time: "16 min" },
              { title: "Python for AI", tag: "Programming", time: "12 min" },
              { title: "Prompt Engineering", tag: "Generative AI", time: "10 min" },
              { title: "AI Ethics", tag: "AI & Society", time: "9 min" },
              { title: "Computer Vision Basics", tag: "AI & Data", time: "13 min" },
              { title: "NLP Fundamentals", tag: "AI & Data", time: "15 min" },
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

function Chapter({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Chapter {n}</p>
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
    warning: <AlertTriangle className="h-5 w-5" />,
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

function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-slate-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-400">
        <span>{language ?? "code"}</span>
        <span>example</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
