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

export const Route = createFileRoute("/_marketing/resources/read/ml-beginner-guide")({
  head: () => {
    const title = "Machine Learning — Beginner Guide | EduNova AI";
    const desc =
      "A beginner-friendly Machine Learning guide covering fundamentals, ML workflow, algorithms, Python examples, exercises, and FAQs.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MLBeginnerGuidePage,
});

const RESOURCE = {
  id: "ml-beginner-guide",
  title: "Machine Learning — Beginner Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 18,
  lastUpdated: "June 2026",
  tags: ["Machine Learning", "ML", "Python", "Beginner"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  supVsUnsup: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80",
};

const TOC = [
  { id: "introduction", label: "1. Introduction to Machine Learning" },
  { id: "what-is-ml", label: "2. What is Machine Learning?" },
  { id: "types", label: "3. Types of Machine Learning" },
  { id: "workflow", label: "4. Machine Learning Workflow" },
  { id: "data", label: "5. Data and Features" },
  { id: "train-test", label: "6. Training vs Testing" },
  { id: "algorithms", label: "7. Popular Algorithms" },
  { id: "applications", label: "8. Real-world Applications" },
  { id: "exercises", label: "9. Hands-on Exercises" },
  { id: "self-check", label: "10. Self Check" },
  { id: "faqs", label: "FAQs" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "summary", label: "Summary & Next Steps" },
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

function MLBeginnerGuidePage() {
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
      text: "Read this beginner-friendly ML guide on EduNova AI",
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
  const scrollToArticle = () => jumpTo("introduction");
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

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <Brain className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" className="shrink-0" onClick={scrollToArticle}><BookOpen className="mr-1.5 h-4 w-4" /> Read Now</Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}><Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}>
              <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}><Share2 className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Share</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}><Printer className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Print</span></Button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="Machine Learning abstract visualization" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/85 via-purple-600/80 to-fuchsia-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A gentle, structured introduction to Machine Learning — what it is, how it learns from data, and how to
            build your first working models in Python.
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

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="no-print lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ListChecks className="h-4 w-4 text-primary" /> On this page
              </p>
              <ol className="mt-3 space-y-1 text-sm">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => jumpTo(item.id)} className={`group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition ${activeId === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                      <span className="mt-0.5 shrink-0 text-[10px] font-mono opacity-70">{String(i + 1).padStart(2, "0")}</span>
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

          <article ref={articleRef} className="print-article prose-reader mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base">
            <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="Learning Objectives">
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Understand the fundamentals of Machine Learning.</li>
                <li>Learn the different types of Machine Learning.</li>
                <li>Explore the complete ML workflow end-to-end.</li>
                <li>Build intuition through practical examples in Python.</li>
                <li>Prepare for more advanced Machine Learning topics.</li>
              </ul>
            </Callout>

            <Section id="introduction" title="1. Introduction to Machine Learning">
              <p>
                Machine Learning (ML) is a branch of Artificial Intelligence focused on building systems that
                <em> learn patterns from data</em> instead of being explicitly programmed rule by rule. Where a
                traditional program says "if X then Y", an ML model discovers the "if X then Y" rules automatically
                from many examples.
              </p>
              <p>
                Every day you use ML: your email spam filter, Netflix recommendations, ride-share ETAs, mobile
                keyboard autocorrect, and photo tagging in your phone. In this guide we will demystify the vocabulary,
                walk the entire ML workflow, and write our first small models in Python.
              </p>
              <Callout tone="tip" title="Tip">
                You do not need advanced math to <em>start</em>. Basic algebra, a bit of Python, and curiosity are enough for your first month.
              </Callout>
            </Section>

            <Section id="what-is-ml" title="2. What is Machine Learning?">
              <p>
                Formally: an ML system improves its performance on a task T, measured by metric P, based on
                experience E (Tom Mitchell, 1997). In plain terms: it learns from examples.
              </p>
              <p>Three common inputs any ML problem needs:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Data</strong> — many examples of the problem.</li>
                <li><strong>A model</strong> — the math that maps input → output.</li>
                <li><strong>An objective</strong> — a number the model tries to make small (loss) or large (reward).</li>
              </ul>
              <Callout tone="note" title="ML vs traditional programming">
                Traditional: rules + data → answers. Machine Learning: data + answers → rules.
              </Callout>
            </Section>

            <Section id="types" title="3. Types of Machine Learning">
              <Figure src={IMG.supVsUnsup} caption="Supervised vs Unsupervised vs Reinforcement Learning — the three broad families of ML." />
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="Supervised" body="Labeled data. Model learns input → output. Examples: spam detection, house-price prediction." />
                <InfoCard title="Unsupervised" body="No labels. Model finds structure: clusters, groups, anomalies. Example: customer segmentation." />
                <InfoCard title="Reinforcement" body="Agent takes actions, receives rewards, learns a policy. Example: game-playing agents, robotics." />
              </div>
              <p className="mt-3">
                Beginners spend ~80% of their first year on <strong>supervised learning</strong> — it is the most common in industry and the easiest to get quick feedback on.
              </p>
            </Section>

            <Section id="workflow" title="4. Machine Learning Workflow">
              <Figure src={IMG.workflow} caption="A typical ML workflow: define problem → collect data → prepare → train → evaluate → deploy." />
              <ol className="list-decimal space-y-1 pl-5">
                <li><strong>Define the problem</strong> — regression, classification, or clustering? What metric matters?</li>
                <li><strong>Collect and inspect data</strong> — CSV, database, or API. Understand columns and quality.</li>
                <li><strong>Clean and prepare</strong> — handle missing values, outliers, and inconsistent formats.</li>
                <li><strong>Feature engineering</strong> — turn raw inputs into signals a model can use.</li>
                <li><strong>Split into train/validation/test</strong>.</li>
                <li><strong>Train a baseline model</strong> — the simplest thing that could work.</li>
                <li><strong>Evaluate</strong> — with a metric that matches the business goal.</li>
                <li><strong>Iterate</strong> — try more features, better algorithms, tuning.</li>
                <li><strong>Deploy and monitor</strong> — put it behind an API and watch for drift.</li>
              </ol>
            </Section>

            <Section id="data" title="5. Data and Features">
              <p>Every row of your dataset is one <em>example</em>. Every column (except the target) is a <em>feature</em>. Good features often matter more than fancy algorithms.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Numerical</strong>: age, salary, temperature.</li>
                <li><strong>Categorical</strong>: color, city, product type (needs encoding).</li>
                <li><strong>Text</strong>: reviews, tweets (needs tokenization / embeddings).</li>
                <li><strong>Images</strong>: pixel matrices (needs normalization / augmentation).</li>
              </ul>
              <Callout tone="warning" title="Data quality first">
                Garbage in → garbage out. A messy dataset with a great algorithm loses to a clean dataset with a simple algorithm every time.
              </Callout>
            </Section>

            <Section id="train-test" title="6. Training vs Testing">
              <p>
                We split data so we can honestly measure how well a model generalizes to unseen examples. A common split is 70% train, 15% validation, 15% test.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Training set</strong> — the model fits its parameters here.</li>
                <li><strong>Validation set</strong> — tune hyperparameters and pick between models.</li>
                <li><strong>Test set</strong> — touched only once, at the end, to report final performance.</li>
              </ul>
              <Callout tone="warning" title="Beware overfitting">
                A model that memorizes the training set but fails on new data is <em>overfit</em>. Compare train vs validation scores — a large gap is the classic red flag.
              </Callout>
              <CodeBlock language="python" code={`from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)`} />
            </Section>

            <Section id="algorithms" title="7. Popular Algorithms">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border/60 text-left">
                      <th className="p-2">Algorithm</th><th className="p-2">Task</th><th className="p-2">Strengths</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">Linear Regression</td><td className="p-2">Regression</td><td className="p-2">Simple, interpretable</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Logistic Regression</td><td className="p-2">Classification</td><td className="p-2">Fast baseline, probabilistic</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Decision Trees</td><td className="p-2">Both</td><td className="p-2">Handles non-linear, easy to visualize</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Random Forest</td><td className="p-2">Both</td><td className="p-2">Strong out-of-the-box performance</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">K-Nearest Neighbors</td><td className="p-2">Both</td><td className="p-2">Intuitive, no training phase</td></tr>
                    <tr><td className="p-2">K-Means</td><td className="p-2">Clustering</td><td className="p-2">Unsupervised grouping</td></tr>
                  </tbody>
                </table>
              </div>
              <CodeBlock language="python" code={`from sklearn.linear_model import LogisticRegression

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
print("Accuracy:", model.score(X_test, y_test))`} />
            </Section>

            <Section id="applications" title="8. Real-world Applications">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Healthcare</strong>: risk scoring, medical imaging triage.</li>
                <li><strong>Finance</strong>: fraud detection, credit scoring.</li>
                <li><strong>Retail</strong>: recommendation engines, demand forecasting.</li>
                <li><strong>Transport</strong>: ETA prediction, dynamic pricing.</li>
                <li><strong>Manufacturing</strong>: predictive maintenance, quality control.</li>
              </ul>
            </Section>

            <Section id="exercises" title="9. Hands-on Exercises">
              <div className="grid gap-3 sm:grid-cols-2">
                <Exercise n={1} title="Iris Classifier" body="Load sklearn's iris dataset. Train LogisticRegression. Report test accuracy." />
                <Exercise n={2} title="House Price Regression" body="Use the California housing dataset. Fit LinearRegression. Compare RMSE with a DecisionTreeRegressor." />
                <Exercise n={3} title="Customer Clustering" body="Take a small sales CSV. Standardize features. Run KMeans with k=3 and describe clusters." />
                <Exercise n={4} title="Train/Test Gap" body="Deliberately overfit a decision tree (max_depth=None). Observe the train vs test accuracy gap." />
              </div>
              <Callout tone="tip" title="Learning Tip">
                Type every code snippet by hand. Muscle memory beats copy-paste.
              </Callout>
            </Section>

            <Section id="self-check" title="10. Self Check">
              <p className="font-semibold">Sample MCQs (20 in the full pack)</p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Which task predicts a continuous number? <em>(a) Classification (b) Regression (c) Clustering</em></li>
                <li>Which dataset is used only once, at the end? <em>(a) Train (b) Validation (c) Test</em></li>
                <li>A model with high train accuracy but low test accuracy is: <em>(a) Underfit (b) Overfit (c) Balanced</em></li>
                <li>K-Means is a: <em>(a) Supervised algorithm (b) Unsupervised algorithm</em></li>
                <li>Which of these is NOT a classification metric? <em>(a) Accuracy (b) F1 (c) RMSE</em></li>
              </ol>
              <p className="mt-4 font-semibold">Short answer</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Explain the difference between features and labels.</li>
                <li>Why do we shuffle data before splitting?</li>
                <li>Give one example of a supervised and unsupervised problem each.</li>
              </ul>
              <p className="mt-4 font-semibold">Revision Checklist</p>
              <ul className="list-none space-y-1">
                <li>☐ I can define ML in one sentence.</li>
                <li>☐ I know the three types of ML.</li>
                <li>☐ I can name the steps of the ML workflow.</li>
                <li>☐ I have run at least one model in Python.</li>
              </ul>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="Do I need to be great at math?">Basic algebra and statistics are enough to start. Deeper math helps later, especially for research.</FAQ>
              <FAQ q="Which language should I learn?">Python — by far the most common in ML thanks to scikit-learn, PyTorch, and TensorFlow.</FAQ>
              <FAQ q="How much data do I need?">It depends on complexity. Tabular problems often work with a few thousand rows; deep learning usually needs much more.</FAQ>
              <FAQ q="Is ML the same as AI?">ML is a subfield of AI. All ML is AI, but not all AI is ML.</FAQ>
              <FAQ q="How long until I can build real projects?">With daily practice, most learners build a portfolio-ready project in 2–3 months.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Feature</strong> — an input variable used by the model.</li>
                <li><strong>Label / Target</strong> — the value the model tries to predict.</li>
                <li><strong>Overfitting</strong> — model memorizes training data and fails on new data.</li>
                <li><strong>Hyperparameter</strong> — a setting chosen before training (e.g., tree depth).</li>
                <li><strong>Loss function</strong> — measures how wrong the model is; training minimizes it.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn Documentation — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>Google — <a href="https://developers.google.com/machine-learning/crash-course" target="_blank" rel="noreferrer" className="text-primary hover:underline">Machine Learning Crash Course</a></li>
                <li>Kaggle Learn — <a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">kaggle.com/learn</a></li>
                <li>DeepLearning.AI — <a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">deeplearning.ai</a></li>
                <li>MIT OpenCourseWare — 6.036 Intro to ML.</li>
                <li>Stanford CS229 — Machine Learning course notes.</li>
                <li>IBM Machine Learning — <a href="https://www.ibm.com/topics/machine-learning" target="_blank" rel="noreferrer" className="text-primary hover:underline">ibm.com/topics/machine-learning</a></li>
              </ul>
            </Section>

            <Section id="summary" title="Summary & Next Steps">
              <p>Machine Learning is pattern learning from data. You now know the three families, the standard workflow, the vocabulary of features and labels, and how to run a first model in Python.</p>
              <p><strong>Key takeaways:</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Prefer clean data and simple baselines before complex models.</li>
                <li>Always keep a test set untouched until the very end.</li>
                <li>Iterate quickly — small experiments beat one giant one.</li>
              </ul>
              <p><strong>Next steps:</strong> continue with the <em>Machine Learning — Complete Tutorial</em> and follow the <em>Step-by-Step Learning Guide</em> for a weekly plan.</p>
            </Section>

            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Educational Disclaimer</p>
              <p className="mt-2">
                This resource is provided by EduNova AI for educational purposes only. Information is compiled from official
                documentation, academic publications, research papers, industry standards, and trusted educational resources.
                Machine Learning technologies, frameworks, and best practices evolve over time — learners should consult
                official documentation for the latest and most accurate information. All trademarks, logos, product names,
                and intellectual property belong to their respective owners.
              </p>
            </div>
          </article>
        </div>

        <div className="no-print mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue learning</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Related resources</h2>
            </div>
            <Link to="/resources" className="hidden text-sm font-medium text-primary hover:underline sm:inline">Browse library →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Machine Learning — Complete Tutorial", tag: "AI & Data", time: "69 min" },
              { title: "Machine Learning — Step-by-Step Guide", tag: "AI & Data", time: "22 min" },
              { title: "Artificial Intelligence — Beginner Guide", tag: "AI & Data", time: "11 min" },
            ].map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }} className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"><BookOpen className="h-5 w-5" /></div>
                <p className="mt-3 text-sm font-semibold">{r.title}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[10px]">{r.tag}</Badge>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span>
                </div>
                <Link to="/resources" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">Open resource <ArrowRight className="h-3 w-3" /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-10">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-foreground/90">{children}</div>
    </section>
  );
}

function Figure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
      <img src={src} alt={caption} className="h-auto w-full object-cover" loading="lazy" />
      <figcaption className="border-t border-border/60 bg-background/60 px-4 py-2 text-xs text-muted-foreground">{caption}</figcaption>
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

function Callout({ tone, title, icon, children }: { tone: "tip" | "info" | "note" | "warning" | "success"; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    tip: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-100",
    info: "border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100",
    note: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-100",
    warning: "border-red-500/40 bg-red-500/10 text-red-900 dark:text-red-100",
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  };
  const defaultIcon: Record<string, React.ReactNode> = {
    tip: <Lightbulb className="h-5 w-5" />, info: <Info className="h-5 w-5" />, note: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />, success: <CheckCircle2 className="h-5 w-5" />,
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
        <span>{language ?? "code"}</span><span>example</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{code}</code></pre>
    </div>
  );
}

function Exercise({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-xs text-primary">{n}</span>
        {title}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group my-2 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
        <span>{q}</span><ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
      </summary>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}
