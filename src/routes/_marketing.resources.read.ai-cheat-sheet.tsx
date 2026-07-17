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
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-cheat-sheet")({
  head: () => {
    const title = "Artificial Intelligence — Cheat Sheet | EduNova AI";
    const desc =
      "One-page AI cheat sheet: definitions, AI vs ML vs DL, workflow, neural networks, applications, keywords, and rapid interview questions.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AICheatSheetPage,
});

const RESOURCE = {
  id: "ai-cheat-sheet",
  title: "Artificial Intelligence — Cheat Sheet",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "3 min",
  pages: 2,
  lastUpdated: "January 2026",
  tags: ["AI Fundamentals", "Neural Networks", "Quick Reference"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1800&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

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

function AICheatSheetPage() {
  const [progress, setProgress] = useState(0);
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
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    const shareData = {
      title: RESOURCE.title,
      text: "AI Cheat Sheet on EduNova AI",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard");
      }
    } catch { /* cancelled */ }
  };
  const download = () => {
    toast.info("Preparing print-ready PDF…");
    setTimeout(() => window.print(), 300);
  };
  const print = () => window.print();
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
        <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
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
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}>
              <Download className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}>
              <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}>
              <Share2 className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Share</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}>
              <Printer className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cover */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="AI cheat sheet cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-emerald-700/75 to-cyan-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">One-page Cheat Sheet</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            The absolute essentials of AI — scan it in 3 minutes before an exam or interview.
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

      {/* Body — cheat-sheet grid */}
      <article
        ref={articleRef}
        className="print-article mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
          <ul className="mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
            <li>Recall important AI concepts quickly.</li>
            <li>Differentiate AI, Machine Learning, and Deep Learning.</li>
            <li>Memorize essential AI terminology.</li>
            <li>Understand Neural Network basics.</li>
            <li>Revise AI workflows efficiently.</li>
            <li>Prepare for interviews and examinations.</li>
          </ul>
        </Callout>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* AI Overview */}
          <Card title="AI Overview" tone="primary">
            <p className="text-sm"><strong>What is AI?</strong> Systems that mimic human intelligence — perceive, reason, learn, and act.</p>
            <p className="mt-2 text-sm"><strong>Why it matters:</strong> Automates cognitive tasks, unlocks insights from data, and creates new content.</p>
            <p className="mt-2 text-sm"><strong>Key features:</strong> learning from data, adapting, reasoning, generating.</p>
          </Card>

          {/* Types */}
          <Card title="Types of AI">
            <ul className="space-y-1 text-sm">
              <li><Chip>ANI</Chip> Narrow AI — task-specific (all AI today).</li>
              <li><Chip>AGI</Chip> General AI — human-level (hypothetical).</li>
              <li><Chip>ASI</Chip> Super AI — beyond humans (speculative).</li>
            </ul>
          </Card>

          {/* Comparison */}
          <Card title="AI vs ML vs DL" className="md:col-span-2 lg:col-span-1">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-xs">
                <thead className="bg-secondary/60">
                  <tr>
                    <th className="px-2 py-1.5 text-left font-semibold">Aspect</th>
                    <th className="px-2 py-1.5 text-left font-semibold">AI</th>
                    <th className="px-2 py-1.5 text-left font-semibold">ML</th>
                    <th className="px-2 py-1.5 text-left font-semibold">DL</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Scope", "Broadest", "Subset of AI", "Subset of ML"],
                    ["Approach", "Rules + learn", "Learn from data", "Deep nets"],
                    ["Data", "Varies", "Moderate", "Large"],
                    ["Interpret", "Varies", "Often high", "Often low"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-border/50">
                      {row.map((c, j) => (
                        <td key={j} className="px-2 py-1.5 align-top">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Workflow */}
          <Card title="AI Workflow" className="md:col-span-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {["Problem", "Data Collection", "Data Processing", "Model Training", "Evaluation", "Deployment", "Monitoring"].map((step, i, arr) => (
                <>
                  <span key={step} className="inline-flex items-center rounded-lg bg-gradient-to-br from-primary to-primary/70 px-2.5 py-1 font-semibold text-primary-foreground">
                    {step}
                  </span>
                  {i < arr.length - 1 && <ArrowRight key={`a-${step}`} className="h-3.5 w-3.5 text-muted-foreground" />}
                </>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Mnemonic: <strong>P-D-P-T-E-D-M</strong>.
            </p>
          </Card>

          {/* Neural Networks */}
          <Card title="Neural Networks">
            <ul className="space-y-1.5 text-sm">
              <li><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-sky-500" /><strong>Input Layer</strong> — receives raw features.</li>
              <li><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-violet-500" /><strong>Hidden Layers</strong> — learn representations.</li>
              <li><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" /><strong>Output Layer</strong> — produces the prediction.</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Learning loop: forward → loss → backprop → update.</p>
          </Card>

          {/* Popular tech */}
          <Card title="Popular AI Technologies">
            <div className="flex flex-wrap gap-1.5">
              {["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Robotics", "Generative AI"].map((t) => (
                <span key={t} className="rounded-full border border-border/60 bg-secondary/70 px-2.5 py-0.5 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* Applications */}
          <Card title="Common Applications" className="md:col-span-2 lg:col-span-1">
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                ["Healthcare", "🩺"], ["Education", "🎓"], ["Finance", "💳"], ["Cybersecurity", "🛡️"],
                ["Retail", "🛍️"], ["Manufacturing", "🏭"], ["Autonomous Vehicles", "🚗"], ["Creative", "🎨"],
              ].map(([name, emoji]) => (
                <div key={name} className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-2 py-1.5">
                  <span aria-hidden>{emoji}</span>
                  <span className="font-medium">{name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Keywords */}
          <Card title="Important Keywords" className="md:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
              {[
                "Algorithm", "Dataset", "Training", "Inference",
                "Model", "Feature", "Bias", "Accuracy",
                "Prediction", "Classification", "Regression", "Overfitting",
                "Loss", "Gradient", "Backprop", "Epoch",
                "Attention", "Embedding", "Token", "RAG",
              ].map((k) => (
                <span key={k} className="rounded-md border border-border/60 bg-card px-2 py-1 text-center text-xs font-medium">
                  {k}
                </span>
              ))}
            </div>
          </Card>

          {/* Memory Tips */}
          <Card title="Memory Tips">
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li><strong>AI ⊃ ML ⊃ DL</strong> — three nested circles.</li>
              <li><strong>ANI / AGI / ASI</strong> — capability ladder.</li>
              <li><strong>P-R-L-A</strong> — Perceive, Reason, Learn, Act.</li>
              <li><strong>Forward → Loss → Backprop → Update.</strong></li>
              <li><strong>Data &gt; Model</strong> — quality of data usually wins.</li>
            </ul>
          </Card>
        </div>

        {/* Quick Interview Qs */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="text-lg font-semibold">Quick Interview Questions (10)</h3>
          <ol className="mt-3 grid list-decimal gap-y-1.5 pl-5 text-sm sm:grid-cols-2 sm:gap-x-8">
            <li>What is AI?</li>
            <li>Difference between AI, ML, and DL?</li>
            <li>What are the types of AI?</li>
            <li>What is supervised vs unsupervised learning?</li>
            <li>What is a neural network?</li>
            <li>What is overfitting? How do you prevent it?</li>
            <li>What is backpropagation?</li>
            <li>What is a transformer?</li>
            <li>What is RAG?</li>
            <li>Name three responsible-AI risks.</li>
          </ol>
        </div>

        {/* Key takeaways */}
        <div className="mt-8 rounded-2xl border-l-4 border-emerald-500/60 bg-emerald-500/10 p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="h-5 w-5" /> Key Takeaways (12)
          </p>
          <ul className="mt-2 grid list-disc gap-y-1 pl-5 text-sm sm:grid-cols-2 sm:gap-x-8">
            <li>AI mimics cognitive functions; today all AI is Narrow.</li>
            <li>AI ⊃ ML ⊃ DL — nested subsets.</li>
            <li>ML learns patterns from data; DL uses deep neural nets.</li>
            <li>Supervised = labels; Unsupervised = no labels; RL = rewards.</li>
            <li>Neural nets: input → hidden → output.</li>
            <li>Learning loop: forward → loss → backprop → update.</li>
            <li>Overfitting: fix with regularization, more data, dropout.</li>
            <li>Best imbalanced metric: F1 / PR-AUC (not accuracy).</li>
            <li>Transformers use self-attention; power modern LLMs.</li>
            <li>RAG grounds LLMs with retrieved documents.</li>
            <li>Workflow: P-D-P-T-E-D-M.</li>
            <li>Responsible AI: fairness, privacy, safety, transparency.</li>
          </ul>
        </div>

        {/* References */}
        <div className="mt-8 rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="text-lg font-semibold">References</h3>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Official Documentation</p>
          <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
            <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
            <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
            <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow</a></li>
            <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch</a></li>
            <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn — AI</a></li>
            <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM AI</a></li>
          </ul>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Academic Resources</p>
          <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
            <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
            <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Laboratory</a></li>
            <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
          </ul>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Research Resources</p>
          <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
            <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — AI</a></li>
            <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
            <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
            <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore</a></li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Disclaimer</p>
          <p className="mt-2">
            This educational cheat sheet has been created for learning, revision, and quick reference
            purposes only. The content has been compiled and summarized from publicly available
            educational resources, official documentation, academic publications, and trusted industry
            references. Every effort has been made to ensure accuracy; however, Artificial
            Intelligence is a rapidly evolving field, and information may change over time.
          </p>
          <p className="mt-2">
            All trademarks, logos, product names, and intellectual property belong to their
            respective owners. EduNova AI does not claim ownership of any third-party materials
            referenced in this resource. Learners are encouraged to consult the official references
            listed above for the latest, most accurate, and comprehensive information.
          </p>
        </div>

        {/* Related */}
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
              { title: "Artificial Intelligence — Quick Revision Notes", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-quick-revision-notes" as const },
              { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" as const },
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
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
      </article>
    </div>
  );
}

/* -------- Sub-components -------- */

function Card({
  title,
  children,
  className = "",
  tone = "default",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "primary";
}) {
  return (
    <div
      className={`rounded-2xl border border-border/60 bg-card p-5 shadow-sm ${
        tone === "primary" ? "ring-1 ring-primary/20" : ""
      } ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mr-2 inline-flex items-center rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
      {children}
    </span>
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
    <div className={`rounded-2xl border-l-4 ${styles[tone]} p-4`}>
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
