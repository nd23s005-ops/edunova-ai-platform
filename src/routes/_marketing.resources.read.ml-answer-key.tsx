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

export const Route = createFileRoute("/_marketing/resources/read/ml-answer-key")({
  head: () => {
    const title = "Machine Learning — Answer Key | EduNova AI";
    const desc =
      "Fully worked answer key for the ML Practice Questions: solutions, code, rubrics, alternative approaches, and expert notes.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MLAnswerKeyPage,
});

const RESOURCE = {
  id: "ml-answer-key",
  title: "Machine Learning — Answer Key",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "33 min",
  pages: 39,
  lastUpdated: "June 2026",
  tags: ["Machine Learning", "ML", "Python", "Solutions"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  eval: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80",
};

const TOC = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "mcqs", label: "1. MCQ Solutions" },
  { id: "short", label: "2. Short Answer Solutions" },
  { id: "long", label: "3. Long Answer Solutions" },
  { id: "python", label: "4. Python Code Solutions" },
  { id: "algos", label: "5. Algorithm Explanations" },
  { id: "case", label: "6. Case Study Solutions" },
  { id: "projects", label: "7. Mini Project Guidance" },
  { id: "rubrics", label: "8. Evaluation Rubrics" },
  { id: "mistakes", label: "9. Common Mistakes" },
  { id: "review", label: "10. Final Review" },
  { id: "improvement", label: "Improvement Suggestions" },
  { id: "revision", label: "Revision Notes" },
  { id: "self", label: "Self Evaluation Checklist" },
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

// MCQ answers keyed by question index (1-based).
const MCQ_ANSWERS: Array<{ ans: string; why: string }> = [
  { ans: "B — Inputs + labels", why: "Supervised learning requires labeled pairs (X, y)." },
  { ans: "B — K-Means", why: "K-Means groups unlabeled data into k clusters." },
  { ans: "C — Model memorises training data", why: "Overfitting shows low train error but high test error." },
  { ans: "B — Sparse weights", why: "L1 penalises |w| and drives many weights to exactly 0." },
  { ans: "C — 0 to 1", why: "AUC is a probability; 0.5 = random, 1.0 = perfect." },
  { ans: "B — TP/(TP+FP)", why: "Precision = correct positives / predicted positives." },
  { ans: "A — TP/(TP+FN)", why: "Recall = correct positives / actual positives." },
  { ans: "B — Number of clusters", why: "K is the desired number of partitions." },
  { ans: "B — Dim. reduction", why: "PCA finds orthogonal axes of maximum variance." },
  { ans: "A — Max margin hyperplane", why: "SVM maximises margin between classes." },
  { ans: "B — Info gain / Gini", why: "Trees pick the split reducing impurity the most." },
  { ans: "B — Bagging", why: "Random Forest is bagged decision trees." },
  { ans: "B — Weights", why: "Gradient descent updates model parameters (weights)." },
  { ans: "B — Divergence", why: "Too large a step overshoots the minimum." },
  { ans: "B — Neural networks", why: "Dropout is a NN regularisation trick." },
  { ans: "C — 0 to 1", why: "Sigmoid maps ℝ to (0, 1)." },
  { ans: "A — max(0, x)", why: "ReLU clips negatives to 0." },
  { ans: "B — Variance of estimate", why: "K-fold averages multiple test folds." },
  { ans: "B — Class imbalance", why: "SMOTE synthesises minority-class samples." },
  { ans: "B — Binary columns", why: "One-hot creates a column per category value." },
  { ans: "A — Mean 0, var 1", why: "StandardScaler → z-score normalisation." },
  { ans: "B — [0, 1]", why: "Min-max scaling rescales to [0, 1]." },
  { ans: "A — P and R", why: "F1 = 2·P·R/(P+R) is their harmonic mean." },
  { ans: "B — √mean((y−ŷ)²)", why: "RMSE is the root of the mean squared error." },
  { ans: "B — Mean baseline", why: "R² compares model to predicting the mean." },
  { ans: "B — Info from future / test", why: "Leakage = using data unavailable at prediction time." },
  { ans: "C — Both (bias and variance)", why: "Ensembling can reduce both, depending on method." },
  { ans: "B — Hyperparameters", why: "GridSearchCV searches a grid of hyperparameter values." },
  { ans: "B — 3×3", why: "For k classes the matrix is k × k." },
  { ans: "B — Avoids ties in binary", why: "Odd k prevents equal-vote ties in 2-class KNN." },
];

function MLAnswerKeyPage() {
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
    const shareData = { title: RESOURCE.title, text: "ML Answer Key on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
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
        <img src={IMG.hero} alt="Machine learning answer key" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/85 via-fuchsia-600/80 to-pink-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            Fully worked solutions to the Machine Learning Practice Questions — with explanations, Python code,
            grading rubrics, alternative approaches, and expert notes.
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
              <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="How to use this key">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Attempt every practice question first without peeking.</li>
                  <li>Score yourself using the marking scheme below.</li>
                  <li>Read the explanation, not just the answer.</li>
                  <li>Log mistakes into the Common Mistakes tracker.</li>
                  <li>Revisit weak topics with the Revision Notes.</li>
                </ul>
              </Callout>
              <Figure src={IMG.workflow} caption="Answer keys accelerate learning only when paired with honest self-review — track your mistakes." />
            </Section>

            <Section id="mcqs" title="1. MCQ Solutions (30 answers)">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Q</th><th className="p-2">Answer</th><th className="p-2">Why</th></tr></thead>
                  <tbody>
                    {MCQ_ANSWERS.map((row, i) => (
                      <tr key={i} className="border-b border-border/40 align-top"><td className="p-2 font-mono text-xs text-muted-foreground">Q{i + 1}</td><td className="p-2 font-semibold">{row.ans}</td><td className="p-2">{row.why}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="short" title="2. Short Answer Solutions">
              <Figure src={IMG.eval} caption="Model evaluation vocabulary — every short answer is a definition + one crisp example." />
              <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">Fill in the blanks — model answers</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  <li>Supervised, Unsupervised, Reinforcement.</li>
                  <li>Underfit (miss the pattern in training data).</li>
                  <li>The top principal components (directions of max variance).</li>
                  <li>Confident wrong.</li>
                  <li>Variance / overfitting.</li>
                  <li>Distance-based (KNN, K-Means, SVM) and gradient-based (linear models, neural nets).</li>
                  <li>True classes (labels).</li>
                  <li>Synthetic Minority Over-sampling Technique.</li>
                  <li>Independently in parallel; sequentially, each correcting residuals.</li>
                  <li>The entire training dataset.</li>
                </ol>
              </div>
              <div className="mt-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">True / False — answers</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  <li>False — accuracy is misleading on imbalanced data.</li>
                  <li>False — tabular problems often prefer gradient boosting.</li>
                  <li>True.</li>
                  <li>False — PCA is unsupervised.</li>
                  <li>False — K-Means finds a local optimum only.</li>
                  <li>False — dropout is used during training only.</li>
                  <li>True — fit preprocessing inside each CV fold.</li>
                  <li>True — AUC integrates over all thresholds.</li>
                  <li>False — most implementations need explicit encoding.</li>
                  <li>False — L1 produces sparse; L2 shrinks smoothly.</li>
                </ol>
              </div>
              <div className="mt-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">Short answers — model responses (sample)</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  <li><strong>Overfitting vs. underfitting:</strong> overfit models memorise train and fail on test; underfit models are too simple to capture the pattern.</li>
                  <li><strong>Bagging vs. boosting:</strong> bagging trains independent models on bootstrap samples then averages (reduces variance); boosting trains sequentially, each correcting residuals (reduces bias).</li>
                  <li><strong>Data leakage example:</strong> including future price to predict today's price.</li>
                  <li><strong>Train/val/test:</strong> train fits weights, val tunes hyperparams, test estimates final performance once.</li>
                  <li><strong>Decision tree splits:</strong> pick feature/threshold maximising information gain or minimising Gini impurity.</li>
                  <li><strong>Kernel trick:</strong> evaluate dot products in higher-dim space without computing the mapping explicitly.</li>
                  <li><strong>F1 vs. accuracy:</strong> F1 balances precision and recall; accuracy is meaningless when one class dominates.</li>
                  <li><strong>Hyperparameters vs. parameters:</strong> hyperparameters are set (lr, depth); parameters are learned (weights).</li>
                  <li><strong>Elbow method:</strong> plot inertia vs. k, pick the k where marginal improvement flattens.</li>
                  <li><strong>Calibration:</strong> predicted probability p matches observed frequency ~p in that bucket.</li>
                  <li><strong>Learning rate:</strong> controls step size in gradient descent; too high diverges, too low is slow.</li>
                  <li><strong>Batch norm:</strong> normalises layer inputs per mini-batch with learnable scale/shift; stabilises training.</li>
                  <li><strong>L1 vs. L2:</strong> L1 → sparse; L2 → smooth shrinkage.</li>
                  <li><strong>Why one-hot:</strong> avoid injecting artificial ordinal relationships into nominal features.</li>
                  <li><strong>Concept drift:</strong> P(y|X) changes over time (fraud patterns evolve).</li>
                  <li><strong>SMOTE:</strong> synthesises minority-class points via interpolation between nearest neighbours.</li>
                  <li><strong>Baseline:</strong> simplest reasonable model your solution must beat.</li>
                  <li><strong>Normalisation for NNs:</strong> keeps gradients well-scaled and speeds convergence.</li>
                  <li><strong>Early stopping:</strong> halt training when validation metric stops improving.</li>
                  <li><strong>Val vs. test:</strong> val is used repeatedly for tuning; test is used once, at the very end.</li>
                </ol>
              </div>
            </Section>

            <Section id="long" title="3. Long Answer Solutions (sample outlines)">
              <p className="text-sm text-muted-foreground">Each outline shows a 6–8 mark answer: definition → mechanism → tradeoffs → example.</p>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li><strong>RF vs. GBM vs. XGBoost:</strong> definitions; RF = bagged trees (variance ↓); GBM = sequential boosting (bias ↓); XGBoost adds regularisation, second-order gradients, and engineering; picking guide by dataset size, latency, tuning budget.</li>
                <li><strong>ML lifecycle:</strong> problem framing → data collection → EDA → preprocessing → modelling → evaluation → deployment → monitoring → retraining.</li>
                <li><strong>Bias-variance:</strong> E[(y − ŷ)²] = bias² + variance + noise; underfit example (linear on cubic data), overfit example (deep tree, small data); mitigation for each.</li>
                <li><strong>Fraud evaluation:</strong> extreme imbalance → PR-AUC + recall@k; cost-weighted metric; time-based split to avoid leakage.</li>
                <li><strong>PCA derivation:</strong> centre X; compute covariance; eigen-decompose; sort eigenvalues; project onto top-k eigenvectors.</li>
                <li><strong>SVM:</strong> max-margin hyperplane; soft-margin slack; kernel trick; primal vs. dual intuition.</li>
                <li><strong>Imbalance handling:</strong> data-level (SMOTE, undersampling), algorithm-level (class weights, focal loss), evaluation-level (F1, PR-AUC).</li>
                <li><strong>Parametric vs. non-parametric:</strong> parametric (linear regression) — fixed params, fast; non-parametric (KNN) — flexibility grows with data, slow at query time.</li>
                <li><strong>Time-series features:</strong> lags, rolling stats, calendar features, holiday flags; strict time-based split.</li>
                <li><strong>Optimisers:</strong> SGD (simple, needs LR schedule), Adam (adaptive, robust), RMSProp (moving avg of squared gradients).</li>
                <li><strong>Drift monitoring:</strong> PSI, KL divergence, live metric slices, shadow deployment, retraining triggers.</li>
                <li><strong>CNN vs. RNN vs. Transformer:</strong> local convolution vs. sequential state vs. global attention; typical use cases.</li>
                <li><strong>Fairness:</strong> demographic parity / equal opportunity metrics; pre/in/post-processing mitigations; stakeholder involvement.</li>
                <li><strong>Calibration:</strong> reliability diagram; Platt scaling (logistic on scores); isotonic regression (non-parametric).</li>
                <li><strong>A/B test design:</strong> hypothesis, primary metric, guardrails, sample size, duration, ramp plan, decision rule.</li>
              </ol>
            </Section>

            <Section id="python" title="4. Python Code Solutions (sampled)">
              <p className="text-sm text-muted-foreground">Solutions to selected Python exercises from the practice workbook.</p>
              <Code>{`# Ex 1 — Load CSV
import pandas as pd
df = pd.read_csv("data.csv")
print(df.shape); print(df.dtypes); print(df.head())

# Ex 3 — Median imputation
df["price"] = df["price"].fillna(df["price"].median())

# Ex 5 — StandardScaler
from sklearn.preprocessing import StandardScaler
X_std = StandardScaler().fit_transform(X)

# Ex 6 — Diabetes regression
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
X, y = load_diabetes(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42)
m = LinearRegression().fit(Xtr, ytr)
print("R²:", r2_score(yte, m.predict(Xte)))

# Ex 9 — F1 from scratch
def f1(y_true, y_pred, pos=1):
    tp = sum(int(t == pos and p == pos) for t, p in zip(y_true, y_pred))
    fp = sum(int(t != pos and p == pos) for t, p in zip(y_true, y_pred))
    fn = sum(int(t == pos and p != pos) for t, p in zip(y_true, y_pred))
    P = tp / (tp + fp) if (tp + fp) else 0
    R = tp / (tp + fn) if (tp + fn) else 0
    return 2 * P * R / (P + R) if (P + R) else 0

# Ex 13 — Pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
pipe = Pipeline([("sc", StandardScaler()), ("knn", KNeighborsClassifier(n_neighbors=5))])

# Ex 14 — GridSearchCV
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier
gs = GridSearchCV(RandomForestClassifier(random_state=42),
                  {"n_estimators": [100, 300, 500]}, cv=5).fit(X, y)
print(gs.best_params_, gs.best_score_)

# Ex 20 — K-Means + silhouette
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
km = KMeans(n_clusters=3, n_init="auto", random_state=42).fit(X)
print("silhouette:", silhouette_score(X, km.labels_))

# Ex 24 — Mini-batch gradient descent
import numpy as np
def sgd_linreg(X, y, lr=0.01, epochs=20, batch=32, seed=0):
    rng = np.random.default_rng(seed)
    X = np.c_[np.ones(len(X)), X]
    w = np.zeros(X.shape[1])
    n = len(y)
    for _ in range(epochs):
        idx = rng.permutation(n)
        for s in range(0, n, batch):
            b = idx[s:s+batch]
            grad = X[b].T @ (X[b] @ w - y[b]) / len(b)
            w -= lr * grad
    return w`}</Code>
            </Section>

            <Section id="algos" title="5. Algorithm Explanations (sample)">
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li><strong>Small imbalanced tabular:</strong> gradient boosting with class weights + PR-AUC; threshold tuning on validation.</li>
                <li><strong>KNN vs. Logistic on moons:</strong> KNN wins — non-linear boundary; Logistic underfits without polynomial features.</li>
                <li><strong>Naive Bayes over RF:</strong> tiny text datasets with independent tokens; RF may overfit or be slow.</li>
                <li><strong>Small n, huge p:</strong> Lasso / ElasticNet or L1-Logistic — sparse selection + regularisation.</li>
                <li><strong>Text classification:</strong> TF-IDF + Linear SVM or Logistic; strong baseline before fine-tuning transformers.</li>
                <li><strong>Non-linear regression, few features:</strong> Gradient Boosting or small MLP.</li>
                <li><strong>Survival with GBM:</strong> use survival-specific loss (Cox partial likelihood) — see scikit-survival.</li>
                <li><strong>Real-time fraud &lt; 10ms:</strong> shallow model (Logistic / small GBM), feature store, in-memory serving.</li>
                <li><strong>Ridge / Lasso / ElasticNet:</strong> shrinkage vs. sparsity vs. mix; ElasticNet handles correlated features.</li>
                <li><strong>Simple &gt; deep:</strong> tabular, small n, interpretability, latency constraints, limited compute.</li>
                <li><strong>Arbitrary clusters:</strong> DBSCAN or HDBSCAN.</li>
                <li><strong>Tuning RF depth:</strong> grid over max_depth ∈ {'{'}5, 10, None{'}'} + min_samples_leaf; watch OOB error.</li>
                <li><strong>XGBoost vs. LightGBM:</strong> LightGBM is faster on large / high-cardinality data; XGBoost is more mature and better documented.</li>
                <li><strong>Cats in tree ensembles:</strong> ordinal / target encoding safely inside CV, or use LightGBM's native categorical.</li>
                <li><strong>SVM slowness:</strong> O(n²) to O(n³) training complexity; use linear SVM or subsample.</li>
                <li><strong>AdaBoost vs. GBM:</strong> AdaBoost reweights samples; GBM fits gradients of a differentiable loss.</li>
                <li><strong>Stacking recipe:</strong> train base models with out-of-fold predictions → feed predictions as features to a meta-model.</li>
                <li><strong>PGM use case:</strong> structured problems with known dependencies (medical diagnosis, Bayesian networks).</li>
                <li><strong>Sparse implicit feedback:</strong> matrix factorisation (ALS), neural CF, two-tower retrieval + reranker.</li>
                <li><strong>Offline vs. online:</strong> offline retrains on stored data; online updates weights per sample or mini-batch (SGD, streaming linear models).</li>
              </ol>
            </Section>

            <Section id="case" title="6. Case Study Solutions (sample outlines)">
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li><strong>Loan default:</strong> features = credit history, DTI, employment; time-aware CV; GBM + calibration; monitor PSI on inputs.</li>
                <li><strong>Churn:</strong> features = tenure, plan, usage delta; class-weighted LR baseline → GBM; explain with SHAP; retention playbook triggers.</li>
                <li><strong>Recommendation:</strong> two-tower retrieval + cross-encoder rerank; A/B test CTR + downstream conversion.</li>
                <li><strong>Predictive maintenance:</strong> lag + rolling features per sensor; imbalance handling; alerting via anomaly score.</li>
                <li><strong>Medical imaging:</strong> CNN backbone (ResNet) + transfer learning; strict privacy; sensitivity/specificity trade-off.</li>
                <li><strong>Review sentiment:</strong> TF-IDF + LR baseline → fine-tuned distil-BERT; monitor drift on category mix.</li>
                <li><strong>Real-time fraud:</strong> low-latency scoring, PR-AUC, threshold tuning by cost; async model refresh.</li>
                <li><strong>Ride ETA:</strong> geospatial features + gradient boosting; MAPE / bias analysis by city.</li>
                <li><strong>Ad CTR:</strong> logistic + hashing trick or Field-Aware FM at scale; calibration for auction.</li>
                <li><strong>Energy demand:</strong> Prophet / GBM with lag features; day-of-week × month interactions; error diagnostics per hour.</li>
              </ol>
            </Section>

            <Section id="projects" title="7. Mini Project Guidance">
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li><strong>Spam classifier deliverables:</strong> notebook, precision/recall on holdout, confusion matrix, misclassified examples.</li>
                <li><strong>Titanic:</strong> feature engineering log (title, family size), pipeline JSON, cross-val score, submission file.</li>
                <li><strong>House prices:</strong> SHAP summary plot, top-10 features, RMSE per neighbourhood.</li>
                <li><strong>Segmentation:</strong> k choice justification, per-cluster persona, action plan for marketing.</li>
                <li><strong>Digits MLP:</strong> loss/accuracy curves, dropout ablation, sample predictions grid.</li>
              </ol>
            </Section>

            <Section id="rubrics" title="8. Evaluation Rubrics & Marking Scheme">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Type</th><th className="p-2">Marks</th><th className="p-2">Criteria</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">MCQ</td><td className="p-2">1</td><td className="p-2">All-or-nothing.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Short answer</td><td className="p-2">2</td><td className="p-2">1 for definition, 1 for example / correctness.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Long answer</td><td className="p-2">6</td><td className="p-2">Definition (1) + mechanism (2) + tradeoffs (2) + example (1).</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Python exercise</td><td className="p-2">5</td><td className="p-2">Correctness (3) + style (1) + explanation (1).</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Case study</td><td className="p-2">10</td><td className="p-2">Problem framing (2) + data plan (2) + modelling (3) + evaluation (2) + risks (1).</td></tr>
                    <tr><td className="p-2">Mini project</td><td className="p-2">20</td><td className="p-2">Correctness (8) + rigour (5) + write-up (4) + reproducibility (3).</td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="mistakes" title="9. Common Mistakes">
              <Callout tone="warning" title="Errors that show up most often">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Reporting accuracy on heavily imbalanced classes.</li>
                  <li>Fitting the scaler on the full dataset before splitting (leakage).</li>
                  <li>Tuning hyperparameters on the test set.</li>
                  <li>Confusing precision and recall.</li>
                  <li>Using future timestamps as features in time-series.</li>
                  <li>One-hot encoding high-cardinality features and blowing up memory.</li>
                  <li>Forgetting to set <code>random_state</code> → non-reproducible splits.</li>
                  <li>Not scaling features before KNN or K-Means.</li>
                  <li>Ignoring class weights in cost-sensitive problems.</li>
                  <li>Skipping a baseline model.</li>
                </ul>
              </Callout>
            </Section>

            <Section id="review" title="10. Final Review">
              <p>Have you completed the following before calling yourself exam-ready?</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>All 30 MCQs attempted and reviewed.</li>
                <li>All Python exercises run locally.</li>
                <li>At least three case studies written up.</li>
                <li>Two mini-projects pushed to GitHub with READMEs.</li>
                <li>Timed mixed practice test completed under 45 minutes.</li>
                <li>Common Mistakes tracker has &lt; 3 open items in each topic.</li>
              </ul>
            </Section>

            <Section id="improvement" title="Improvement Suggestions">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Redo any question you got wrong from memory 24 hours later.</li>
                <li>For coding gaps, rebuild the smallest failing example on a new dataset.</li>
                <li>Discuss long-answer outlines with a study partner — verbalising exposes gaps.</li>
                <li>Track your score across three rounds; aim for &gt; 85% before your interview.</li>
              </ul>
            </Section>

            <Section id="revision" title="Revision Notes">
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                <li><strong>Metrics:</strong> Precision, Recall, F1, ROC-AUC, PR-AUC, log-loss, calibration.</li>
                <li><strong>Bias-Variance:</strong> underfit vs. overfit; how each remedy affects the curve.</li>
                <li><strong>Regularisation:</strong> L1 sparse, L2 smooth, ElasticNet mix.</li>
                <li><strong>Ensembles:</strong> bagging ↓ variance, boosting ↓ bias, stacking blends both.</li>
                <li><strong>Deployment:</strong> serialise, version, monitor, alert, retrain.</li>
              </ol>
            </Section>

            <Section id="self" title="Self Evaluation Checklist">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>[ ] I can explain bias-variance in 60 seconds.</li>
                <li>[ ] I can implement F1 from memory in Python.</li>
                <li>[ ] I can name three ways to handle class imbalance.</li>
                <li>[ ] I know what data leakage is and can spot it in a pipeline.</li>
                <li>[ ] I can pick between Ridge, Lasso, and ElasticNet for a scenario.</li>
                <li>[ ] I can draw a confusion matrix and derive precision / recall.</li>
                <li>[ ] I can outline an end-to-end ML system for a novel problem.</li>
                <li>[ ] I have deployed at least one project publicly.</li>
              </ul>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="Should I peek at answers first?">No — attempt first. Passive reading of answers rarely sticks.</FAQ>
              <FAQ q="What score signals readiness?">Consistently &gt; 85% on mixed tests and confident case-study write-ups.</FAQ>
              <FAQ q="Are alternate answers accepted?">Yes — many questions have multiple valid approaches. Judge by the rubric.</FAQ>
              <FAQ q="How often should I revise?">Space repetition: after 1 day, 3 days, 7 days, 21 days.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Rubric</strong> — scoring guide that lists the criteria and mark distribution.</li>
                <li><strong>Marking scheme</strong> — how partial credit is awarded per question type.</li>
                <li><strong>Reproducibility</strong> — the same code + data produce the same result on re-run.</li>
                <li><strong>Ablation</strong> — remove one component to measure its contribution.</li>
                <li><strong>Baseline</strong> — the trivial reference model the solution must beat.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>TensorFlow — <a href="https://www.tensorflow.org/api_docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">tensorflow.org</a></li>
                <li>PyTorch — <a href="https://pytorch.org/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">pytorch.org</a></li>
                <li>OpenAI Documentation, Google AI, Microsoft Learn, IBM Machine Learning, Kaggle Learn, DeepLearning.AI.</li>
                <li>MIT OpenCourseWare, Stanford AI Lab, Carnegie Mellon University.</li>
                <li>arXiv, IEEE Xplore, ACM Digital Library — plus official books, academic publications, research papers, and technical documentation.</li>
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
              { title: "Machine Learning — Practice Questions", tag: "AI & Data", time: "33 min" },
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
