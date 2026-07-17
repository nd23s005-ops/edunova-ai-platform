import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, BookOpen, Bookmark, BookmarkCheck, Brain, CheckCircle2, ChevronRight,
  Clock, Download, FileText, Heart, Info, Lightbulb, Printer, Share2, Sparkles, Tag,
  AlertTriangle, ListChecks,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ml-practice-questions")({
  head: () => {
    const title = "Machine Learning — Practice Questions | EduNova AI";
    const desc =
      "200+ ML practice questions: MCQs, short/long answers, coding, case studies, and mini projects — organised by topic and difficulty.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MLPracticeQuestionsPage,
});

const RESOURCE = {
  id: "ml-practice-questions",
  title: "Machine Learning — Practice Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "33 min",
  pages: 22,
  lastUpdated: "October 2026",
  tags: ["Machine Learning", "ML", "Python", "Practice"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  pipeline: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80",
  workflow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
};

const TOC = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "mcqs", label: "1. Basic MCQs" },
  { id: "short", label: "2. Short Answer" },
  { id: "long", label: "3. Long Answer" },
  { id: "python", label: "4. Python Exercises" },
  { id: "algos", label: "5. Algorithm Questions" },
  { id: "case", label: "6. Case Study Problems" },
  { id: "datasets", label: "7. Dataset Analysis" },
  { id: "projects", label: "8. Mini Projects" },
  { id: "mixed", label: "9. Mixed Practice Test" },
  { id: "final", label: "10. Final Assessment" },
  { id: "revision", label: "Revision Questions" },
  { id: "mock", label: "Mock Test" },
  { id: "tracker", label: "Progress Tracker" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
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

function MLPracticeQuestionsPage() {
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
    const shareData = { title: RESOURCE.title, text: "ML Practice Questions on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(shareData.url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("objectives");
  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      <style>{`@media print { .no-print { display: none !important; } .print-article { padding: 0 !important; } body { background: white !important; } }`}</style>

      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1" aria-hidden>
        <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow"><Brain className="h-5 w-5" /></div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" className="shrink-0" onClick={scrollToArticle}><BookOpen className="mr-1.5 h-4 w-4" /> Read Now</Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}><Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>{bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}<span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}><Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} /><span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}><Share2 className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Share</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}><Printer className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Print</span></Button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="Machine learning practice workbook" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/85 via-teal-600/80 to-sky-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            200+ progressive Machine Learning practice questions across MCQs, short/long answers, Python coding,
            case studies, and mini projects — organised by topic and difficulty.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {RESOURCE.readingTime} read</span>
            <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" /> {RESOURCE.pages} pages</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Updated {RESOURCE.lastUpdated}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {RESOURCE.tags.map((t) => (<span key={t} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur"><Tag className="h-3 w-3" /> {t}</span>))}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="no-print lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"><ListChecks className="h-4 w-4 text-primary" /> On this page</p>
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
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background"><div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} /></div>
                <p className="mt-1.5 text-muted-foreground">{progress}% complete</p>
              </div>
            </div>
          </aside>

          <article ref={articleRef} className="print-article prose-reader mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base">
            <Section id="objectives" title="Learning Objectives">
              <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="What you will practice">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Apply Machine Learning concepts to concrete problems.</li>
                  <li>Improve analytical thinking through progressive difficulty.</li>
                  <li>Practice algorithm selection for real datasets.</li>
                  <li>Strengthen Python implementation skills.</li>
                  <li>Prepare for exams and technical interviews.</li>
                </ul>
              </Callout>
              <Figure src={IMG.workflow} caption="Practice by topic then mix — the same workflow strong learners follow before interviews." />
            </Section>

            <Section id="mcqs" title="1. Basic MCQs (30 questions)">
              <p className="text-sm text-muted-foreground">Pick ONE best option. Answers in the companion <em>Answer Key</em>.</p>
              {[
                { q: "Supervised learning requires:", a: ["Only inputs", "Inputs + labels", "Rewards", "None"] },
                { q: "Which is unsupervised?", a: ["Logistic regression", "K-Means", "Random Forest", "Linear regression"] },
                { q: "Overfitting means:", a: ["High training error", "Good test performance", "Model memorises training data", "Fast convergence"] },
                { q: "L1 regularisation encourages:", a: ["Large weights", "Sparse weights", "Zero mean", "Positive weights"] },
                { q: "ROC-AUC ranges between:", a: ["-1 to 1", "0 to 100", "0 to 1", "0 to infinity"] },
                { q: "Precision is:", a: ["TP/(TP+FN)", "TP/(TP+FP)", "TN/(TN+FP)", "TP/all"] },
                { q: "Recall is:", a: ["TP/(TP+FN)", "TP/(TP+FP)", "FN/all", "TP/predicted"] },
                { q: "K in K-Means is:", a: ["Learning rate", "Number of clusters", "Number of features", "Batch size"] },
                { q: "PCA is a technique for:", a: ["Classification", "Dim. reduction", "Regression", "Clustering"] },
                { q: "SVM finds:", a: ["Max margin hyperplane", "Best k", "Best tree", "Rules"] },
                { q: "Decision trees split on:", a: ["Random column", "Info gain / Gini", "PCA axis", "Bias"] },
                { q: "Random Forest is:", a: ["Boosting", "Bagging", "Stacking", "Blending"] },
                { q: "Gradient descent updates:", a: ["Features", "Weights", "Data", "Metrics"] },
                { q: "Learning rate too high causes:", a: ["Slow training", "Divergence", "Better accuracy", "Nothing"] },
                { q: "Dropout is used in:", a: ["Trees", "Neural networks", "K-Means", "PCA"] },
                { q: "Sigmoid outputs range:", a: ["-1 to 1", "0 to ∞", "0 to 1", "any"] },
                { q: "ReLU outputs:", a: ["max(0, x)", "min(0, x)", "|x|", "x²"] },
                { q: "Cross-validation reduces:", a: ["Bias only", "Variance of estimate", "Data size", "Training time"] },
                { q: "SMOTE handles:", a: ["Missing data", "Class imbalance", "Overfitting", "Scaling"] },
                { q: "One-hot encoding produces:", a: ["Integers", "Binary columns", "Floats", "Text"] },
                { q: "Standard scaling gives:", a: ["Mean 0, var 1", "Sum 1", "Max 1", "Min 0"] },
                { q: "Min-max scaling gives values in:", a: ["[-1, 1]", "[0, 1]", "[0, 100]", "[-∞, ∞]"] },
                { q: "F1 is harmonic mean of:", a: ["P and R", "TP and FP", "Acc and AUC", "MAE and RMSE"] },
                { q: "RMSE is:", a: ["mean(|y-ŷ|)", "√mean((y-ŷ)²)", "log-loss", "R²"] },
                { q: "R² compares to:", a: ["Random", "Mean baseline", "Best", "Worst"] },
                { q: "Data leakage means:", a: ["Missing data", "Info from future/test", "Small data", "Noisy data"] },
                { q: "Ensembling generally improves:", a: ["Bias only", "Variance", "Both", "Neither"] },
                { q: "GridSearchCV searches:", a: ["Features", "Hyperparameters", "Data", "Rows"] },
                { q: "Confusion matrix for 3 classes has size:", a: ["2×2", "3×3", "3×4", "4×4"] },
                { q: "K in KNN typically odd because:", a: ["Faster", "Avoids ties in binary", "More accurate", "Convention"] },
              ].map((m, i) => (
                <div key={i} className="my-3 rounded-2xl border border-border/60 bg-card p-4 text-sm shadow-sm">
                  <p className="font-semibold"><span className="mr-2 rounded bg-primary/10 px-1.5 py-0.5 font-mono text-xs text-primary">Q{i + 1}</span>{m.q}</p>
                  <ol className="mt-2 list-[upper-alpha] space-y-0.5 pl-6 text-muted-foreground">{m.a.map((o) => (<li key={o}>{o}</li>))}</ol>
                </div>
              ))}
            </Section>

            <Section id="short" title="2. Fill in the Blanks & True/False & Short Answer (40 questions)">
              <Figure src={IMG.pipeline} caption="ML pipeline stages — most short-answer questions test one of these boxes." />
              <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">Fill in the blanks</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>The three main ML paradigms are __, __, and __.</li>
                  <li>A model with high bias tends to __.</li>
                  <li>PCA reduces dimensionality by projecting onto __.</li>
                  <li>Log-loss penalises __ predictions.</li>
                  <li>Regularisation reduces __.</li>
                  <li>Feature scaling is required for __ and __ models.</li>
                  <li>The confusion matrix rows represent __.</li>
                  <li>SMOTE stands for __.</li>
                  <li>Bagging trains models __ while boosting trains them __.</li>
                  <li>An epoch means one pass over __.</li>
                </ol>
              </div>
              <div className="mt-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">True / False</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Accuracy is always the best metric.</li>
                  <li>Deep learning is required for tabular data.</li>
                  <li>Gradient boosting trees are trained sequentially.</li>
                  <li>PCA is a supervised method.</li>
                  <li>K-Means guarantees a global optimum.</li>
                  <li>Dropout is used during inference.</li>
                  <li>Cross-validation prevents leakage from preprocessing.</li>
                  <li>ROC-AUC is threshold-independent.</li>
                  <li>Random Forest handles categorical features without encoding.</li>
                  <li>L2 regularisation produces sparse weights.</li>
                </ol>
              </div>
              <div className="mt-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">Short answer (2–3 sentences each)</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Define overfitting and underfitting.</li>
                  <li>What is the difference between bagging and boosting?</li>
                  <li>Explain data leakage with one example.</li>
                  <li>Why do we use train/val/test split?</li>
                  <li>How does a decision tree decide splits?</li>
                  <li>What is a kernel trick?</li>
                  <li>Why is F1 preferred over accuracy on imbalanced data?</li>
                  <li>What are hyperparameters vs. parameters?</li>
                  <li>Explain the elbow method for K-Means.</li>
                  <li>What is calibration?</li>
                  <li>Why does gradient descent need a learning rate?</li>
                  <li>What is batch normalisation?</li>
                  <li>Difference between L1 and L2 regularisation.</li>
                  <li>Why do we one-hot encode nominal features?</li>
                  <li>Define concept drift.</li>
                  <li>Explain SMOTE briefly.</li>
                  <li>What is a baseline model?</li>
                  <li>Why do we normalise inputs for neural nets?</li>
                  <li>What is early stopping?</li>
                  <li>Difference between validation and test sets.</li>
                </ol>
              </div>
            </Section>

            <Section id="long" title="3. Long Answer Questions (15 questions)">
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li>Compare Random Forest, Gradient Boosting, and XGBoost. Discuss when to prefer each.</li>
                <li>Walk through the end-to-end ML lifecycle from problem definition to deployment.</li>
                <li>Explain the bias-variance tradeoff with mathematical formulation and a concrete example.</li>
                <li>Design an evaluation strategy for a fraud detection model. Justify metric choice.</li>
                <li>Describe how PCA works and derive the projection onto principal components.</li>
                <li>Explain how SVM finds the optimal hyperplane, including soft-margin and kernels.</li>
                <li>Discuss handling of imbalanced datasets across data-level, algorithm-level, and evaluation-level techniques.</li>
                <li>Compare parametric vs. non-parametric models with examples and trade-offs.</li>
                <li>Explain feature engineering for a time-series forecasting problem.</li>
                <li>Compare Adam, SGD, and RMSProp optimisers.</li>
                <li>Design a pipeline to detect data drift in production.</li>
                <li>Explain the difference between CNN, RNN, and Transformer architectures.</li>
                <li>Describe fairness in ML and three mitigation strategies.</li>
                <li>Explain calibration and how to improve it (Platt / isotonic).</li>
                <li>Design an A/B test to evaluate a new recommendation model.</li>
              </ol>
            </Section>

            <Section id="python" title="4. Python Exercises (25 tasks)">
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li>Load a CSV with pandas and print its shape, dtypes, and first 5 rows.</li>
                <li>Compute mean and median of a numeric column with missing values.</li>
                <li>Impute missing values in a column with its median.</li>
                <li>One-hot encode a categorical column using pandas.</li>
                <li>Standardise a numeric feature using scikit-learn's <code>StandardScaler</code>.</li>
                <li>Train a linear regression model on the diabetes dataset and report R².</li>
                <li>Train a logistic regression on the Iris dataset (2 classes) and print accuracy.</li>
                <li>Compute the confusion matrix for a binary classifier without sklearn.</li>
                <li>Implement F1 score from scratch (no sklearn).</li>
                <li>Perform 5-fold cross-validation with <code>cross_val_score</code>.</li>
                <li>Fit a Random Forest and print top-5 feature importances.</li>
                <li>Perform a train/val/test split (60/20/20) with stratification.</li>
                <li>Build a pipeline with <code>StandardScaler</code> + <code>KNeighborsClassifier</code>.</li>
                <li>Run <code>GridSearchCV</code> over <code>n_estimators</code> for RandomForest.</li>
                <li>Compute ROC-AUC for a probabilistic classifier.</li>
                <li>Plot a learning curve for a model of your choice.</li>
                <li>Serialise a trained pipeline with <code>joblib.dump</code>.</li>
                <li>Load the pipeline back and score a new row.</li>
                <li>Detect outliers in a column using IQR.</li>
                <li>Cluster the Iris features with K-Means (k=3) and print silhouette.</li>
                <li>Reduce Iris to 2 components with PCA and plot.</li>
                <li>Train a Gradient Boosting classifier and compare to Random Forest.</li>
                <li>Encode a target column with <code>LabelEncoder</code>.</li>
                <li>Implement mini-batch gradient descent for linear regression.</li>
                <li>Write a simple text classifier using <code>CountVectorizer</code> + Logistic Regression.</li>
              </ol>
              <Code>{`# Starter for exercise 6
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

X, y = load_diabetes(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(Xtr, ytr)
print("R²:", r2_score(yte, model.predict(Xte)))`}</Code>
            </Section>

            <Section id="algos" title="5. Algorithm Questions (20 questions)">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">#</th><th className="p-2">Question</th></tr></thead>
                  <tbody>
                    {[
                      "Given a small imbalanced tabular dataset, propose a modelling approach and justify.",
                      "Compare KNN and Logistic Regression on a moon-shaped dataset — which wins and why?",
                      "When would Naive Bayes outperform Random Forest?",
                      "Suggest an appropriate model for a small (n=200) high-dim (p=5000) genomics dataset.",
                      "Which algorithm is best for text classification and why?",
                      "For a highly non-linear regression problem with a few features, propose two models.",
                      "How would you use gradient boosting for a survival-analysis problem?",
                      "What algorithm would you use for real-time fraud scoring under 10ms latency?",
                      "Compare Ridge, Lasso, and ElasticNet regression.",
                      "When is a simple linear model preferable to a deep neural network?",
                      "Which clustering algorithm handles arbitrarily-shaped clusters best?",
                      "How do you tune the depth of a Random Forest?",
                      "Discuss trade-offs between XGBoost and LightGBM.",
                      "How do you handle categorical features in tree ensembles?",
                      "Explain why SVMs may be slow for large datasets.",
                      "Compare AdaBoost and Gradient Boosting.",
                      "What is stacking? Provide a 2-line recipe.",
                      "When would you use a probabilistic graphical model?",
                      "How do you approach a recommendation system with sparse implicit feedback?",
                      "Explain the difference between offline and online learning algorithms.",
                    ].map((q, i) => (
                      <tr key={i} className="border-b border-border/40 align-top"><td className="p-2 font-mono text-xs text-muted-foreground">{i + 1}</td><td className="p-2">{q}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="case" title="6. Case Study Problems (10 cases)">
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li><strong>Loan default prediction:</strong> historic loans with default label. Design features, model, and evaluation.</li>
                <li><strong>Customer churn:</strong> telecom monthly usage. Propose a pipeline and monitoring plan.</li>
                <li><strong>Recommendation:</strong> e-commerce clickstream — design item recommendations.</li>
                <li><strong>Predictive maintenance:</strong> sensor telemetry from factory machines.</li>
                <li><strong>Medical imaging:</strong> classify chest X-rays as normal or abnormal (ethics considerations).</li>
                <li><strong>Sentiment analysis:</strong> product reviews — feature and model choice.</li>
                <li><strong>Fraud in real-time:</strong> credit-card transactions with 0.2% positive rate.</li>
                <li><strong>Ride ETA:</strong> predict driver arrival time using geospatial features.</li>
                <li><strong>Ad CTR:</strong> billions of impressions, categorical dominance — pick model.</li>
                <li><strong>Energy demand forecasting:</strong> hourly time-series with strong seasonality.</li>
              </ol>
            </Section>

            <Section id="datasets" title="7. Dataset Analysis (dataset-based exercises)">
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                <li>Iris (150×4, 3 classes) — build a classifier, report per-class F1.</li>
                <li>Titanic — handle mixed types, engineer titles from names.</li>
                <li>California housing — regression with numeric + geographic features.</li>
                <li>MNIST subset — compare KNN vs. Logistic vs. small MLP.</li>
                <li>Adult income — practice fairness metrics across sex/race.</li>
                <li>Wine quality — regression → classification via thresholding.</li>
                <li>Bike sharing — time-series regression with weather features.</li>
                <li>20-newsgroups — text classification pipeline.</li>
                <li>Movielens 1M — build simple collaborative filtering.</li>
                <li>Kaggle Titanic full — reproduce a top-10% score.</li>
              </ol>
            </Section>

            <Section id="projects" title="8. Mini Projects (5 projects)">
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li><strong>Spam classifier:</strong> SMS dataset → CountVectorizer + Logistic. Deliver metrics + confusion matrix.</li>
                <li><strong>Titanic survival:</strong> full pipeline with hyperparameter search.</li>
                <li><strong>House price regressor:</strong> California housing → GBM + SHAP importances.</li>
                <li><strong>Customer segmentation:</strong> retail dataset → K-Means + persona summary.</li>
                <li><strong>Handwritten digits:</strong> MNIST subset → simple MLP with dropout.</li>
              </ol>
              <Callout tone="tip" title="Delivery format">
                Push each project to GitHub with a README, requirements.txt, and a runnable notebook — future employers will thank you.
              </Callout>
            </Section>

            <Section id="mixed" title="9. Mixed Practice Test (25 questions)">
              <p className="text-sm text-muted-foreground">45-minute timer. Mix of MCQs (10), short answers (10), and one long question (5 marks).</p>
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                <li>Which metric would you optimise for imbalanced binary classification?</li>
                <li>What is the effect of increasing max_depth on a decision tree?</li>
                <li>When should you use median instead of mean for imputation?</li>
                <li>Define precision-recall curve.</li>
                <li>Explain how bagging reduces variance.</li>
                <li>How do you detect data leakage during CV?</li>
                <li>Given a small dataset, defend or attack the choice of deep learning.</li>
                <li>Which encoding is safest for categorical features in tree models?</li>
                <li>Write pseudocode for K-Fold cross-validation.</li>
                <li>Compare online vs. batch training.</li>
                <li>What is a saddle point in optimisation?</li>
                <li>Why does high learning rate hurt convergence?</li>
                <li>Explain <em>curse of dimensionality</em>.</li>
                <li>How would you monitor a model in production?</li>
                <li>What is <em>concept drift</em>? Give an example.</li>
                <li>State two ethical concerns in ML deployment.</li>
                <li>Compare precision at k vs. AUC.</li>
                <li>Explain <em>early stopping</em> in gradient boosting.</li>
                <li>Design a small experiment to detect leakage.</li>
                <li>List three sanity checks before training.</li>
                <li>Long answer: outline an end-to-end ML system for real-time churn scoring.</li>
                <li>Short: what is <em>SMOTE</em>?</li>
                <li>Short: define <em>stratified split</em>.</li>
                <li>Short: what is <em>OOB error</em> in Random Forest?</li>
                <li>Short: give one strength and one weakness of KNN.</li>
              </ol>
            </Section>

            <Section id="final" title="10. Final Assessment (Challenge questions)">
              <Callout tone="warning" title="Challenge — 10 hard questions">
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  <li>Derive the update rule for Ridge regression in closed form.</li>
                  <li>Prove that F1 = 2·P·R/(P+R) is the harmonic mean.</li>
                  <li>Show why the softmax + cross-entropy gradient simplifies to (ŷ − y).</li>
                  <li>Explain why bagging cannot reduce bias.</li>
                  <li>Show how ROC-AUC = probability of correct pairwise ranking.</li>
                  <li>Compare information gain and Gini impurity mathematically.</li>
                  <li>Explain when PCA can hurt performance.</li>
                  <li>Derive the SVM dual formulation intuitively.</li>
                  <li>Prove that L2 regularisation is equivalent to Gaussian prior.</li>
                  <li>Given train F1 = 0.95, val F1 = 0.60 — diagnose and prescribe two fixes.</li>
                </ol>
              </Callout>
            </Section>

            <Section id="revision" title="Revision Questions (Topic-wise)">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Topic</th><th className="p-2">Revision prompts</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">Fundamentals</td><td className="p-2">Define ML, list 3 supervised algorithms, explain bias-variance.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Preprocessing</td><td className="p-2">Compare scaling methods, handle NaNs, prevent leakage.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Algorithms</td><td className="p-2">Trees, ensembles, SVM, KNN, K-Means, PCA.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Evaluation</td><td className="p-2">Precision, recall, F1, ROC, PR, calibration.</td></tr>
                    <tr><td className="p-2">Deployment</td><td className="p-2">Serialise, monitor drift, rollback plan.</td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="mock" title="Mock Test — Timed practice">
              <p>Take three mock tests before your exam or interview:</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li><strong>Mock 1:</strong> Fundamentals + Supervised (30 min, 25 MCQs).</li>
                <li><strong>Mock 2:</strong> Preprocessing + Evaluation (30 min, 20 MCQs + 5 short).</li>
                <li><strong>Mock 3:</strong> Python + Case study (60 min, 10 code + 2 case).</li>
              </ul>
            </Section>

            <Section id="tracker" title="Progress Tracker">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Section</th><th className="p-2">Attempts</th><th className="p-2">Score</th><th className="p-2">Next step</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">Basic MCQs</td><td className="p-2">___</td><td className="p-2">__/30</td><td className="p-2">Revise fundamentals</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Short answers</td><td className="p-2">___</td><td className="p-2">__/40</td><td className="p-2">Practice writing</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Python exercises</td><td className="p-2">___</td><td className="p-2">__/25</td><td className="p-2">Kaggle notebooks</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Case studies</td><td className="p-2">___</td><td className="p-2">__/10</td><td className="p-2">Discuss with peer</td></tr>
                    <tr><td className="p-2">Mini projects</td><td className="p-2">___</td><td className="p-2">__/5</td><td className="p-2">Push to GitHub</td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="Where are the answers?">In the companion resource: <em>Machine Learning — Answer Key</em>.</FAQ>
              <FAQ q="How long should I spend on this workbook?">Aim for 30–40 hours over 2–3 weeks with active recall.</FAQ>
              <FAQ q="Do I need a GPU?">No — every exercise runs on CPU with small datasets.</FAQ>
              <FAQ q="What if I get stuck?">Read the hint sections in the Answer Key, then try a smaller variant of the question.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>MCQ</strong> — multiple choice question with one correct answer.</li>
                <li><strong>Stratified split</strong> — preserves class proportions across splits.</li>
                <li><strong>OOB</strong> — out-of-bag samples in a Random Forest.</li>
                <li><strong>Silhouette</strong> — cluster cohesion vs. separation score.</li>
                <li><strong>Baseline</strong> — the trivial reference model your model must beat.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>TensorFlow — <a href="https://www.tensorflow.org/api_docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">tensorflow.org</a></li>
                <li>PyTorch — <a href="https://pytorch.org/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">pytorch.org</a></li>
                <li>Kaggle Learn — <a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">kaggle.com/learn</a></li>
                <li>OpenAI Documentation, Google AI, Microsoft Learn, IBM Machine Learning, DeepLearning.AI.</li>
                <li>MIT OpenCourseWare, Stanford AI Lab, Carnegie Mellon University.</li>
                <li>arXiv, IEEE Xplore, ACM Digital Library — plus official books, academic publications, and technical documentation.</li>
              </ul>
            </Section>

            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Educational Disclaimer</p>
              <p className="mt-2">
                This resource is provided by EduNova AI for educational purposes only. Information is compiled from official
                documentation, academic publications, research papers, industry standards, and trusted educational resources.
                Machine Learning technologies, algorithms, frameworks, and best practices evolve continuously — learners
                should consult official documentation for the latest and most accurate information. All trademarks, logos,
                product names, and intellectual property belong to their respective owners.
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
              { title: "Machine Learning — Answer Key", tag: "AI & Data", time: "33 min" },
              { title: "Machine Learning — Interview Questions", tag: "AI & Data", time: "35 min" },
              { title: "Machine Learning — Cheat Sheet", tag: "AI & Data", time: "4 min" },
            ].map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }} className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"><BookOpen className="h-5 w-5" /></div>
                <p className="mt-3 text-sm font-semibold">{r.title}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Badge variant="secondary" className="text-[10px]">{r.tag}</Badge><span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span></div>
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

function Callout({ tone, title, icon, children }: { tone: "tip" | "info" | "note" | "warning" | "success"; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    tip: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-100",
    info: "border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100",
    note: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-100",
    warning: "border-red-500/40 bg-red-500/10 text-red-900 dark:text-red-100",
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  };
  const defaultIcon: Record<string, React.ReactNode> = { tip: <Lightbulb className="h-5 w-5" />, info: <Info className="h-5 w-5" />, note: <Info className="h-5 w-5" />, warning: <AlertTriangle className="h-5 w-5" />, success: <CheckCircle2 className="h-5 w-5" /> };
  return (
    <div className={`my-4 rounded-2xl border-l-4 ${styles[tone]} p-4`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon ?? defaultIcon[tone]}</div>
        <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><div className="mt-1 text-sm">{children}</div></div>
      </div>
    </div>
  );
}

function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group my-2 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold"><span>{q}</span><ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" /></summary>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-slate-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-400"><span>python</span></div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{children}</code></pre>
    </div>
  );
}
