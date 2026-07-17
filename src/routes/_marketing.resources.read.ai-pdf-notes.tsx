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
  AlertTriangle,
  ListChecks,
  NotebookText,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-pdf-notes")({
  head: () => {
    const title = "Artificial Intelligence — PDF Notes | EduNova AI";
    const desc =
      "Comprehensive 30-chapter revision notes on AI — ML, DL, Neural Networks, CV, NLP, Generative AI, ethics, careers, interview questions, formulas, and cheat sheets.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIPdfNotesPage,
});

const RESOURCE = {
  id: "ai-pdf-notes",
  title: "Artificial Intelligence — PDF Notes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "88 min",
  pages: 158,
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
  hero: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1800&q=80",
  timeline: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  ecosystem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  math: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&q=80",
  data: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  mlWorkflow: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80",
  neural: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  deep: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
  cv: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&q=80",
  nlp: "https://images.unsplash.com/photo-1546146830-2cca9512c68e?w=1400&q=80",
  generative: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=80",
  frameworks: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1400&q=80",
  lifecycle: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80",
  healthcare: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=80",
  finance: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80",
  education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80",
  cyber: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80",
  robotics: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1400&q=80",
  ethics: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80",
  future: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
  career: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
};

type TocItem = { id: string; label: string };
const TOC: TocItem[] = [
  { id: "ch1", label: "Introduction to Artificial Intelligence" },
  { id: "ch2", label: "History and Evolution of AI" },
  { id: "ch3", label: "Types of Artificial Intelligence" },
  { id: "ch4", label: "AI vs Machine Learning vs Deep Learning" },
  { id: "ch5", label: "Mathematics for AI" },
  { id: "ch6", label: "Data Fundamentals" },
  { id: "ch7", label: "Machine Learning Fundamentals" },
  { id: "ch8", label: "Supervised Learning" },
  { id: "ch9", label: "Unsupervised Learning" },
  { id: "ch10", label: "Reinforcement Learning" },
  { id: "ch11", label: "Neural Networks" },
  { id: "ch12", label: "Deep Learning" },
  { id: "ch13", label: "Computer Vision" },
  { id: "ch14", label: "Natural Language Processing (NLP)" },
  { id: "ch15", label: "Large Language Models (LLMs)" },
  { id: "ch16", label: "Generative AI" },
  { id: "ch17", label: "AI Frameworks and Libraries" },
  { id: "ch18", label: "AI Project Lifecycle" },
  { id: "ch19", label: "AI Applications" },
  { id: "ch20", label: "AI in Healthcare" },
  { id: "ch21", label: "AI in Finance" },
  { id: "ch22", label: "AI in Education" },
  { id: "ch23", label: "AI in Cybersecurity" },
  { id: "ch24", label: "AI in Robotics" },
  { id: "ch25", label: "Responsible AI and Ethics" },
  { id: "ch26", label: "Future of Artificial Intelligence" },
  { id: "ch27", label: "Interview Questions" },
  { id: "ch28", label: "Quick Revision Notes" },
  { id: "ch29", label: "Formula & Cheat Sheet" },
  { id: "ch30", label: "Final Summary" },
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

function AIPdfNotesPage() {
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
      text: "Comprehensive AI revision notes on EduNova AI",
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
  const scrollToArticle = () => jumpTo("ch1");
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
              <NotebookText className="h-5 w-5" />
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
        <img src={IMG.hero} alt="AI notes cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/85 via-indigo-700/80 to-blue-700/85 mix-blend-multiply" aria-hidden />
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
            <Badge className="bg-white/25 text-white hover:bg-white/30">30 Chapters · Notes</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {RESOURCE.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A complete chapter-wise revision guide for AI — perfect for exams, interviews, and offline
            study. Concise explanations, diagrams, cheat sheets, and interview questions.
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
              <ol className="mt-3 max-h-[62vh] space-y-0.5 overflow-y-auto pr-1 text-sm">
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
                <li>Understand the fundamentals of Artificial Intelligence.</li>
                <li>Differentiate AI, ML, and Deep Learning.</li>
                <li>Learn Neural Networks and Deep Learning concepts.</li>
                <li>Understand Computer Vision and NLP.</li>
                <li>Explore Generative AI and LLMs.</li>
                <li>Learn AI development workflows.</li>
                <li>Apply AI concepts to real-world problems.</li>
                <li>Prepare for exams, interviews, and advanced AI courses.</li>
              </ul>
            </Callout>

            <Chapter id="ch1" n={1} title="Introduction to Artificial Intelligence">
              <p>
                Artificial Intelligence (AI) is the science of building systems that perform tasks
                which normally require human intelligence — perception, reasoning, learning, and
                decision-making. Modern AI learns patterns from data.
              </p>
              <Figure src={IMG.hero} caption="AI = perception + reasoning + learning + interaction." />
              <Definitions
                items={[
                  ["Artificial Intelligence", "Systems that mimic cognitive functions like learning and problem solving."],
                  ["Agent", "Anything that perceives its environment and takes action."],
                  ["Rational Agent", "An agent that acts to maximize its expected performance."],
                ]}
              />
              <KeyPoints
                items={[
                  "AI ≠ consciousness. Today's AI is narrow and specialized.",
                  "AI learns from data, not from hand-coded rules.",
                  "Common AI subfields: ML, CV, NLP, Robotics, KR.",
                ]}
              />
              <ExamNote>AI ⊃ ML ⊃ DL. Remember the nested subset relationship.</ExamNote>
            </Chapter>

            <Chapter id="ch2" n={2} title="History and Evolution of AI">
              <Figure src={IMG.timeline} caption="Symbolic AI → Statistical ML → Deep Learning → Generative AI." />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>1950</strong> — Turing Test proposed.</li>
                <li><strong>1956</strong> — Dartmouth Workshop coins "AI".</li>
                <li><strong>1980s</strong> — Expert systems boom.</li>
                <li><strong>1997</strong> — Deep Blue defeats Kasparov.</li>
                <li><strong>2012</strong> — AlexNet launches modern deep learning.</li>
                <li><strong>2017</strong> — Transformer architecture.</li>
                <li><strong>2022+</strong> — Generative AI mainstream (ChatGPT, diffusion).</li>
              </ul>
              <ExamNote>Two "AI winters": late 1970s and late 1980s. Know why funding collapsed both times.</ExamNote>
            </Chapter>

            <Chapter id="ch3" n={3} title="Types of Artificial Intelligence">
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="Narrow AI" body="Task-specific (spam filter, translator). All AI today." />
                <InfoCard title="General AI" body="Hypothetical human-level intelligence." />
                <InfoCard title="Super AI" body="Speculative intelligence beyond humans." />
              </div>
              <KeyPoints
                items={[
                  "Also classified as Reactive, Limited-memory, Theory-of-mind, Self-aware.",
                  "Modern LLMs are still Narrow AI even though they feel general.",
                ]}
              />
            </Chapter>

            <Chapter id="ch4" n={4} title="AI vs Machine Learning vs Deep Learning">
              <Figure src={IMG.ecosystem} caption="AI ⊃ ML ⊃ DL. Nested subsets." />
              <ComparisonTable
                headers={["Aspect", "AI", "ML", "DL"]}
                rows={[
                  ["Scope", "Broadest", "Subset of AI", "Subset of ML"],
                  ["Approach", "Rule + learning", "Learn from data", "Deep neural networks"],
                  ["Data need", "Varies", "Moderate", "Large"],
                  ["Interpretability", "Varies", "Often high", "Often low"],
                ]}
              />
            </Chapter>

            <Chapter id="ch5" n={5} title="Mathematics for AI">
              <Figure src={IMG.math} caption="Linear algebra, calculus, probability, and optimization." />
              <KeyPoints
                items={[
                  "Linear Algebra: vectors, matrices, dot product, eigenvalues.",
                  "Calculus: derivatives, gradients (for optimization).",
                  "Probability: distributions, Bayes' theorem, expectation.",
                  "Statistics: mean, variance, hypothesis tests.",
                  "Optimization: gradient descent, learning rate.",
                ]}
              />
              <ExamNote>Gradient Descent: θ ← θ − α ∇L(θ). Know each symbol's meaning.</ExamNote>
            </Chapter>

            <Chapter id="ch6" n={6} title="Data Fundamentals">
              <Figure src={IMG.data} caption="Structured, unstructured, semi-structured data." />
              <Definitions
                items={[
                  ["Feature", "An individual measurable property of a data point."],
                  ["Label", "The correct output for supervised learning."],
                  ["Train/Val/Test", "Data splits used to fit, tune, and evaluate a model."],
                ]}
              />
              <KeyPoints
                items={[
                  "Data quality > model complexity — almost always.",
                  "Beware of label noise and class imbalance.",
                  "Never touch test data during training.",
                ]}
              />
            </Chapter>

            <Chapter id="ch7" n={7} title="Machine Learning Fundamentals">
              <Figure src={IMG.mlWorkflow} caption="Collect → Clean → Train → Evaluate → Deploy → Monitor." />
              <KeyPoints
                items={[
                  "Model = function that maps inputs to outputs.",
                  "Loss = how wrong the prediction is.",
                  "Training = minimize loss on the training data.",
                  "Generalization = perform well on unseen data.",
                ]}
              />
            </Chapter>

            <Chapter id="ch8" n={8} title="Supervised Learning">
              <p>Learn from labeled examples. Two main tasks:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Classification</strong> — discrete labels (spam / not spam).</li>
                <li><strong>Regression</strong> — continuous values (price prediction).</li>
              </ul>
              <ComparisonTable
                headers={["Algorithm", "Type", "Strength"]}
                rows={[
                  ["Linear Regression", "Regression", "Simple, interpretable"],
                  ["Logistic Regression", "Classification", "Baseline for binary tasks"],
                  ["Decision Tree", "Both", "Interpretable, non-linear"],
                  ["Random Forest", "Both", "Robust, low tuning"],
                  ["Gradient Boosting", "Both", "State-of-the-art tabular"],
                  ["SVM", "Classification", "Effective on small data"],
                ]}
              />
              <CodeBlock
                language="python"
                code={`from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)
print(LogisticRegression(max_iter=200).fit(X_tr, y_tr).score(X_te, y_te))`}
              />
            </Chapter>

            <Chapter id="ch9" n={9} title="Unsupervised Learning">
              <p>Find structure in data without labels.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Clustering</strong> — K-Means, DBSCAN, hierarchical.</li>
                <li><strong>Dimensionality Reduction</strong> — PCA, t-SNE, UMAP.</li>
                <li><strong>Anomaly Detection</strong> — Isolation Forest, autoencoders.</li>
              </ul>
              <ExamNote>PCA maximizes variance along orthogonal components.</ExamNote>
            </Chapter>

            <Chapter id="ch10" n={10} title="Reinforcement Learning">
              <p>An agent learns by interacting with an environment and receiving rewards.</p>
              <Definitions
                items={[
                  ["State (s)", "The current situation."],
                  ["Action (a)", "A choice the agent makes."],
                  ["Reward (r)", "Feedback signal."],
                  ["Policy (π)", "Strategy mapping states to actions."],
                ]}
              />
              <KeyPoints items={["Exploration vs exploitation is the core trade-off.", "Q-Learning, Policy Gradient, and PPO are key algorithms."]} />
            </Chapter>

            <Chapter id="ch11" n={11} title="Neural Networks">
              <Figure src={IMG.neural} caption="Input → hidden layers → output. Each connection carries a learnable weight." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Forward pass — compute output.</li>
                <li>Loss — compare with target.</li>
                <li>Backpropagation — send error back.</li>
                <li>Update weights via gradient descent.</li>
              </ol>
              <ExamNote>Activation functions: ReLU, sigmoid, tanh, softmax. Know when to use each.</ExamNote>
            </Chapter>

            <Chapter id="ch12" n={12} title="Deep Learning">
              <Figure src={IMG.deep} caption="Deep networks learn hierarchical features automatically." />
              <ComparisonTable
                headers={["Architecture", "Best For"]}
                rows={[
                  ["CNN", "Images"],
                  ["RNN / LSTM / GRU", "Sequences (legacy)"],
                  ["Transformer", "Sequences, text, vision (modern)"],
                  ["Autoencoder", "Compression, anomaly detection"],
                  ["GAN / Diffusion", "Generation"],
                ]}
              />
            </Chapter>

            <Chapter id="ch13" n={13} title="Computer Vision">
              <Figure src={IMG.cv} caption="CV pipeline: acquire → preprocess → detect/segment → classify → act." />
              <KeyPoints
                items={[
                  "Tasks: classification, detection, segmentation, tracking, OCR.",
                  "Architectures: ResNet, EfficientNet, YOLO, ViT, Segment Anything.",
                ]}
              />
            </Chapter>

            <Chapter id="ch14" n={14} title="Natural Language Processing (NLP)">
              <Figure src={IMG.nlp} caption="NLP pipeline: tokenize → embed → model → decode." />
              <KeyPoints
                items={[
                  "Tasks: classification, translation, summarization, NER, Q&A.",
                  "Embeddings: Word2Vec, GloVe, contextual (BERT), sentence embeddings.",
                  "Modern NLP is dominated by transformers.",
                ]}
              />
            </Chapter>

            <Chapter id="ch15" n={15} title="Large Language Models (LLMs)">
              <p>Transformer models trained on massive text to predict the next token.</p>
              <KeyPoints
                items={[
                  "Pretraining → Fine-tuning → RLHF is a common pipeline.",
                  "Prompting: zero-shot, few-shot, chain-of-thought.",
                  "RAG (Retrieval-Augmented Generation) grounds LLMs on your data.",
                ]}
              />
              <Callout tone="warning" title="Watch out">LLMs generate plausible — not verified — text. Always cite sources for facts.</Callout>
            </Chapter>

            <Chapter id="ch16" n={16} title="Generative AI">
              <Figure src={IMG.generative} caption="Generative AI produces new text, images, audio, video, and code." />
              <ComparisonTable
                headers={["Modality", "Representative Models"]}
                rows={[
                  ["Text", "GPT, Gemini, Claude, Llama"],
                  ["Image", "Stable Diffusion, Midjourney, DALL·E"],
                  ["Audio", "Whisper (STT), ElevenLabs (TTS), MusicGen"],
                  ["Video", "Sora, Runway"],
                  ["Code", "GitHub Copilot, Cursor"],
                ]}
              />
            </Chapter>

            <Chapter id="ch17" n={17} title="AI Frameworks and Libraries">
              <Figure src={IMG.frameworks} caption="Modern AI stacks combine data, training, and serving tools." />
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="scikit-learn" body="Classic ML for tabular data." />
                <InfoCard title="PyTorch" body="Research-friendly deep learning." />
                <InfoCard title="TensorFlow / Keras" body="Production DL, edge deployment." />
                <InfoCard title="Hugging Face" body="Pretrained models & datasets." />
                <InfoCard title="LangChain / LlamaIndex" body="LLM orchestration & RAG." />
                <InfoCard title="ONNX" body="Model interoperability." />
              </div>
            </Chapter>

            <Chapter id="ch18" n={18} title="AI Project Lifecycle">
              <Figure src={IMG.lifecycle} caption="Problem → Data → Model → Evaluation → Deployment → Monitoring." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Scope the problem and define success metrics.</li>
                <li>Collect, clean, and label data.</li>
                <li>Build a baseline, then iterate.</li>
                <li>Evaluate on held-out data; test fairness.</li>
                <li>Deploy: batch, online, or edge.</li>
                <li>Monitor for drift; retrain as needed.</li>
              </ol>
            </Chapter>

            <Chapter id="ch19" n={19} title="AI Applications">
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Search & Recs" body="Ranking, personalization, retrieval." />
                <InfoCard title="Assistants" body="Chatbots, copilots, agents." />
                <InfoCard title="Creative" body="Image, video, music, writing." />
                <InfoCard title="Operations" body="Forecasting, logistics, quality control." />
              </div>
            </Chapter>

            <Chapter id="ch20" n={20} title="AI in Healthcare">
              <Figure src={IMG.healthcare} caption="Imaging, triage, drug discovery, remote monitoring." />
              <KeyPoints items={["Radiology image analysis", "Clinical decision support", "Personalized medicine", "Drug discovery pipelines"]} />
            </Chapter>

            <Chapter id="ch21" n={21} title="AI in Finance">
              <Figure src={IMG.finance} caption="Fraud detection, credit scoring, forecasting, AML." />
              <KeyPoints items={["Risk models & credit scoring", "Anti-money-laundering (AML)", "Robo-advisors", "Document intelligence"]} />
            </Chapter>

            <Chapter id="ch22" n={22} title="AI in Education">
              <Figure src={IMG.education} caption="Adaptive learning, tutoring, content generation." />
              <KeyPoints items={["Personalized learning paths", "AI tutors", "Automatic grading", "Accessibility tools"]} />
            </Chapter>

            <Chapter id="ch23" n={23} title="AI in Cybersecurity">
              <Figure src={IMG.cyber} caption="Anomaly detection, phishing detection, threat hunting." />
              <KeyPoints items={["Intrusion detection systems", "Behavior analytics", "Malware classification", "Automated response"]} />
            </Chapter>

            <Chapter id="ch24" n={24} title="AI in Robotics">
              <Figure src={IMG.robotics} caption="Perception + planning + control for autonomous systems." />
              <KeyPoints items={["Warehouse automation", "Autonomous vehicles", "Surgical robots", "Drones and inspection"]} />
            </Chapter>

            <Chapter id="ch25" n={25} title="Responsible AI and Ethics">
              <Figure src={IMG.ethics} caption="Fairness, accountability, transparency, safety, privacy." />
              <Callout tone="success" title="Principles" icon={<CheckCircle2 className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Fairness — avoid unjust bias.</li>
                  <li>Accountability — clear ownership of outcomes.</li>
                  <li>Transparency — explainability where it matters.</li>
                  <li>Safety & security — robust to misuse.</li>
                  <li>Privacy — protect user data.</li>
                  <li>Human-centered — augment human judgment.</li>
                </ul>
              </Callout>
            </Chapter>

            <Chapter id="ch26" n={26} title="Future of Artificial Intelligence">
              <Figure src={IMG.future} caption="Multimodal AI, agents, on-device AI, and AI + science." />
              <KeyPoints
                items={[
                  "Multimodal foundation models unify text, image, audio, video.",
                  "Agentic AI: LLMs that plan, use tools, and act.",
                  "On-device AI: small models on phones and edge devices.",
                  "AI for science: materials, biology, climate.",
                  "Regulation and safety will shape adoption.",
                ]}
              />
            </Chapter>

            {/* Chapter 27 — Interview Questions */}
            <Chapter id="ch27" n={27} title="Interview Questions">
              <div className="space-y-3">
                <QACard
                  q="What is the difference between AI, ML, and DL?"
                  a="AI is any technique that mimics intelligent behavior. ML is a subset of AI that learns from data. DL is a subset of ML that uses deep neural networks."
                />
                <QACard
                  q="Explain overfitting vs underfitting."
                  a="Overfitting: model memorizes training data and fails on new data. Underfitting: model is too simple to capture patterns. Fix with regularization, more data, or model tuning."
                />
                <QACard
                  q="What is the bias-variance trade-off?"
                  a="Bias = error from wrong assumptions (underfit). Variance = error from sensitivity to training data (overfit). Good models balance both."
                />
                <QACard
                  q="How does backpropagation work?"
                  a="Compute prediction (forward pass), compute loss, then propagate gradients backward through the network to update weights via gradient descent."
                />
                <QACard
                  q="What is a transformer?"
                  a="A neural architecture based on self-attention that processes sequences in parallel. Powers modern LLMs and vision models."
                />
                <QACard
                  q="What is RAG?"
                  a="Retrieval-Augmented Generation. An LLM retrieves relevant documents from a knowledge base before answering, improving factuality and freshness."
                />
                <QACard
                  q="Name three responsible AI risks."
                  a="Bias, privacy leakage, and hallucinated outputs presented as facts."
                />
                <QACard
                  q="How would you evaluate a classifier on imbalanced data?"
                  a="Use precision, recall, F1, PR-AUC, and confusion matrix — not raw accuracy."
                />
              </div>
            </Chapter>

            {/* Chapter 28 — Quick Revision */}
            <Chapter id="ch28" n={28} title="Quick Revision Notes">
              <div className="grid gap-3 sm:grid-cols-2">
                <FlashCard front="AI" back="Systems that mimic cognitive functions." />
                <FlashCard front="ML" back="Systems that learn patterns from data." />
                <FlashCard front="DL" back="ML using deep neural networks." />
                <FlashCard front="Supervised" back="Labeled data → classification / regression." />
                <FlashCard front="Unsupervised" back="No labels → clustering / dim. reduction." />
                <FlashCard front="RL" back="Agent learns via rewards from environment." />
                <FlashCard front="CNN" back="Convolutions extract spatial features (images)." />
                <FlashCard front="RNN" back="Recurrent state over sequences (legacy)." />
                <FlashCard front="Transformer" back="Self-attention over sequences (modern)." />
                <FlashCard front="LLM" back="Large transformer trained to predict next token." />
                <FlashCard front="RAG" back="Retrieve documents to ground LLM answers." />
                <FlashCard front="Overfitting" back="Great on train, poor on test." />
              </div>
              <Callout tone="tip" title="Important keywords">
                Feature, Label, Loss, Gradient, Backprop, Epoch, Batch, Learning Rate, Regularization,
                Dropout, Attention, Embedding, Token, Fine-tune, Zero-shot, Prompt, Hallucination,
                Bias, Fairness, Drift, MLOps.
              </Callout>
            </Chapter>

            {/* Chapter 29 — Formula sheet */}
            <Chapter id="ch29" n={29} title="Formula & Cheat Sheet">
              <FormulaRow name="Gradient Descent" formula="θ ← θ − α · ∇L(θ)" />
              <FormulaRow name="Linear Regression" formula="ŷ = W·x + b" />
              <FormulaRow name="Sigmoid" formula="σ(x) = 1 / (1 + e^(−x))" />
              <FormulaRow name="Softmax" formula="softmax(zᵢ) = e^(zᵢ) / Σ e^(zⱼ)" />
              <FormulaRow name="Cross-Entropy" formula="L = −Σ yᵢ · log(ŷᵢ)" />
              <FormulaRow name="MSE" formula="L = (1/n) Σ (yᵢ − ŷᵢ)²" />
              <FormulaRow name="Accuracy" formula="TP + TN / (TP + TN + FP + FN)" />
              <FormulaRow name="Precision" formula="TP / (TP + FP)" />
              <FormulaRow name="Recall" formula="TP / (TP + FN)" />
              <FormulaRow name="F1" formula="2 · (P · R) / (P + R)" />
              <FormulaRow name="Attention" formula="softmax(QKᵀ / √d) · V" />
              <FormulaRow name="Bayes' Theorem" formula="P(A|B) = P(B|A)·P(A) / P(B)" />
            </Chapter>

            {/* Chapter 30 — Final Summary */}
            <Chapter id="ch30" n={30} title="Final Summary">
              <Callout tone="success" title="Complete Revision Checklist" icon={<CheckCircle2 className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Define AI, ML, DL and describe their relationship.</li>
                  <li>List supervised, unsupervised, and reinforcement learning tasks and examples.</li>
                  <li>Explain neural networks and backpropagation.</li>
                  <li>Compare CNN, RNN, and Transformer architectures.</li>
                  <li>Describe the AI project lifecycle end-to-end.</li>
                  <li>Recall responsible AI principles.</li>
                  <li>Know the key formulas from Chapter 29 by heart.</li>
                  <li>Solve 20+ MCQs and 5+ scenario questions from this pack.</li>
                </ul>
              </Callout>

              <h3 className="mt-8 text-lg font-semibold">Practice MCQs</h3>
              <MCQ
                q="Which of the following is NOT a supervised learning algorithm?"
                options={["Logistic Regression", "K-Means", "Random Forest", "SVM"]}
                answer="K-Means"
              />
              <MCQ
                q="Backpropagation is used to:"
                options={[
                  "Preprocess data",
                  "Compute gradients and update weights",
                  "Choose learning rate",
                  "Split data into train/test",
                ]}
                answer="Compute gradients and update weights"
              />
              <MCQ
                q="Which metric best handles class imbalance?"
                options={["Accuracy", "F1 score", "MSE", "MAE"]}
                answer="F1 score"
              />

              <h3 className="mt-8 text-lg font-semibold">Scenario Questions</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Your fraud model has 99% accuracy but misses most frauds — what's wrong?</li>
                <li>Your CV model performs well in the lab but fails in production. What could cause the drop?</li>
                <li>An LLM confidently gives a wrong answer. How would you reduce this in production?</li>
              </ol>

              <h3 className="mt-8 text-lg font-semibold">Mini Assignments</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Train a linear regression on a public housing dataset.</li>
                <li>Cluster customers with K-Means and interpret the clusters.</li>
                <li>Fine-tune a pretrained image classifier on 3 custom classes.</li>
                <li>Build a small RAG assistant over your own notes.</li>
              </ul>
            </Chapter>

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
                <li><a href="https://developer.nvidia.com/ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI Developer</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Academic Resources</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
                <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Laboratory</a></li>
                <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Carnegie Mellon School of Computer Science</a></li>
                <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Research & Standards</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — Computer Science (AI)</a></li>
                <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
                <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
                <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore Digital Library</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Additional Learning</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
                <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face Documentation</a></li>
                <li><a href="https://www.coursera.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Coursera AI Courses</a></li>
                <li><a href="https://www.edx.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">edX Computer Science & AI</a></li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Disclaimer</p>
              <p className="mt-2">
                This educational resource has been prepared for learning and educational purposes
                only. The content is compiled, summarized, and organized using publicly available
                educational materials, official documentation, academic publications, research
                papers, and trusted industry resources. Every effort has been made to ensure the
                information is accurate and up to date; however, Artificial Intelligence is a rapidly
                evolving field, and technologies, frameworks, and best practices may change over time.
              </p>
              <p className="mt-2">
                All trademarks, logos, product names, company names, and intellectual property belong
                to their respective owners. EduNova AI does not claim ownership of any third-party
                materials referenced in this resource. Learners are encouraged to consult the
                official documentation and reference sources listed above for the latest, most
                accurate, and comprehensive information.
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
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
              { title: "Neural Networks Explained", tag: "AI & Data", time: "16 min" },
              { title: "Python for AI", tag: "Programming", time: "12 min" },
              { title: "AI Ethics", tag: "AI & Society", time: "9 min" },
              { title: "Prompt Engineering Basics", tag: "Generative AI", time: "10 min" },
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

function Definitions({ items }: { items: [string, string][] }) {
  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-border/60 bg-card">
      <table className="w-full text-sm">
        <tbody>
          {items.map(([term, def]) => (
            <tr key={term} className="border-b border-border/50 last:border-0">
              <th className="w-40 bg-secondary/50 px-3 py-2 text-left align-top text-xs font-semibold uppercase tracking-wider text-primary">
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
        <Sparkles className="h-4 w-4" /> Important Points
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}

function ExamNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 rounded-2xl border-l-4 border-amber-500/50 bg-amber-500/10 p-3 text-sm text-amber-900 dark:text-amber-100">
      <span className="font-semibold">Exam / Interview Tip: </span>{children}
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

function FlashCard({ front, back }: { front: string; back: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{front}</p>
      <p className="mt-1 text-sm text-muted-foreground">{back}</p>
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
