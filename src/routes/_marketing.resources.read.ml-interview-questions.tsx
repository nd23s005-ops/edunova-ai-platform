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

export const Route = createFileRoute("/_marketing/resources/read/ml-interview-questions")({
  head: () => {
    const title = "Machine Learning — Interview Questions | EduNova AI";
    const desc =
      "150+ ML interview questions with hints, model answers, coding challenges, scenario problems, and expert tips.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MLInterviewQuestionsPage,
});

const RESOURCE = {
  id: "ml-interview-questions",
  title: "Machine Learning — Interview Questions",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "35 min",
  pages: 42,
  lastUpdated: "February 2026",
  tags: ["Machine Learning", "ML", "Python", "Interview"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  interview: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=1400&q=80",
};

const TOC = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "fundamentals", label: "1. ML Fundamentals" },
  { id: "supervised", label: "2. Supervised Learning" },
  { id: "unsupervised", label: "3. Unsupervised Learning" },
  { id: "evaluation", label: "4. Model Evaluation" },
  { id: "feature-eng", label: "5. Feature Engineering" },
  { id: "python-ml", label: "6. Python for ML" },
  { id: "sklearn", label: "7. Scikit-learn" },
  { id: "deep", label: "8. Deep Learning Basics" },
  { id: "scenario", label: "9. Scenario-based" },
  { id: "coding", label: "10. Coding Challenges" },
  { id: "hr", label: "11. HR & Behavioral" },
  { id: "tips", label: "12. Interview Tips" },
  { id: "top50", label: "Top 50 FAQs" },
  { id: "rapid", label: "Rapid Revision" },
  { id: "checklist", label: "Mock Interview Checklist" },
  { id: "self", label: "Self Assessment" },
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

function MLInterviewQuestionsPage() {
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
    const shareData = { title: RESOURCE.title, text: "ML Interview Questions on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
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
        <img src={IMG.hero} alt="Machine learning interview preparation" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/85 via-blue-600/80 to-cyan-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-amber-500/90 text-white hover:bg-amber-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            150+ beginner-to-advanced ML interview questions with layered hints, model answers, coding challenges,
            scenario problems, and expert tips for placements and technical rounds.
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
              <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="What you will gain">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Prepare confidently for Machine Learning interviews.</li>
                  <li>Strengthen ML fundamentals across theory and practice.</li>
                  <li>Solve real interview problems with layered hints.</li>
                  <li>Improve technical communication and structured answers.</li>
                  <li>Gain confidence for placement and professional rounds.</li>
                </ul>
              </Callout>
              <Figure src={IMG.workflow} caption="The typical ML interview funnel: fundamentals → coding → ML depth → system design → behavioral." />
            </Section>

            <Section id="fundamentals" title="1. Machine Learning Fundamentals — Beginner">
              <QA
                n={1}
                level="Beginner"
                q="What is Machine Learning? How does it differ from traditional programming?"
                hint="Think in terms of who writes the rules."
                answer="ML learns rules from data instead of a programmer coding them explicitly. In traditional programming you write logic; in ML you provide examples (X, y) and the model discovers the mapping f: X → y."
              />
              <QA
                n={2}
                level="Beginner"
                q="Explain Supervised, Unsupervised, and Reinforcement learning with one example each."
                hint="Availability of labels vs. reward signal."
                answer="Supervised uses labeled data (spam detection). Unsupervised finds structure in unlabeled data (customer segmentation). Reinforcement learns by trial and error using rewards (game AI, robotics)."
              />
              <QA
                n={3}
                level="Beginner"
                q="Bias vs. Variance — define the tradeoff."
                hint="Underfit vs. overfit."
                answer="Bias is error from wrong assumptions (underfitting). Variance is sensitivity to training noise (overfitting). Total expected error = bias² + variance + irreducible noise; you tune model complexity to balance them."
              />
              <QA n={4} level="Beginner" q="What is overfitting? List three ways to prevent it." hint="Signal vs. noise." answer="Overfitting = model memorises training data and fails on unseen data. Prevent via more data, regularisation (L1/L2, dropout), simpler models, cross-validation, and early stopping." />
              <QA n={5} level="Beginner" q="Define train/validation/test split. Why not just train and test?" hint="Where do hyperparameters get tuned?" answer="Validation lets you tune hyperparameters without leaking test performance. Typical split: 60/20/20 or 80/10/10. The test set is used once, at the end." />
              <QA n={6} level="Beginner" q="What is a hyperparameter? Give three examples." hint="Set before training." answer="A hyperparameter is not learned from data — you set it (learning rate, number of trees, k in KNN, regularisation strength)." />
              <QA n={7} level="Beginner" q="Explain the difference between parameters and hyperparameters." hint="Learned vs. configured." answer="Parameters (weights, biases) are learned. Hyperparameters (learning rate, depth) are configured before training." />
              <QA n={8} level="Beginner" q="What is cross-validation? Why do we use k-fold?" hint="Getting a reliable performance estimate." answer="Split data into k folds, train on k−1 and validate on the remaining fold, rotate k times, average the metric — reduces variance in the estimate." />
              <QA n={9} level="Beginner" q="Define accuracy, precision, recall, F1." hint="Confusion-matrix arithmetic." answer="Accuracy = (TP+TN)/all. Precision = TP/(TP+FP). Recall = TP/(TP+FN). F1 = 2·PR/(P+R) — harmonic mean, useful for imbalanced classes." />
              <QA n={10} level="Beginner" q="When would you prefer precision over recall?" hint="Cost of false positives." answer="When false positives are costly — e.g., flagging a legitimate transaction as fraud. Recall matters more when missing positives is costly (cancer screening)." />
            </Section>

            <Section id="supervised" title="2. Supervised Learning — Intermediate">
              <QA n={11} level="Intermediate" q="Compare Linear Regression and Logistic Regression." hint="Output type." answer="Linear regression predicts a continuous value using a linear combination of features. Logistic regression predicts probability via the sigmoid function; it's a classifier despite the name." />
              <QA n={12} level="Intermediate" q="What is regularisation? Compare L1 and L2." hint="Sparsity vs. shrinkage." answer="Regularisation penalises complexity. L1 (Lasso) adds |w| — encourages sparse weights (feature selection). L2 (Ridge) adds w² — shrinks weights smoothly. ElasticNet combines both." />
              <QA n={13} level="Intermediate" q="Explain how Decision Trees split nodes." hint="Impurity measures." answer="Trees pick the feature/threshold that maximises information gain (entropy) or minimises Gini impurity. Splitting continues until a stopping criterion (max depth, min samples)." />
              <QA n={14} level="Intermediate" q="Random Forest vs. Gradient Boosting — key differences." hint="Bagging vs. boosting." answer="RF trains trees independently on bootstrap samples and averages (bagging, low variance). Boosting trains sequentially, each tree correcting residuals (low bias, tends to overfit without regularisation)." />
              <QA n={15} level="Intermediate" q="How does XGBoost differ from vanilla gradient boosting?" hint="Regularisation + engineering." answer="XGBoost adds L1/L2 regularisation, second-order gradients, column subsampling, and efficient parallel/tree-histogram implementations. Empirically best for tabular data." />
              <QA n={16} level="Intermediate" q="Explain SVM and the kernel trick." hint="Margin + feature map." answer="SVM finds the max-margin hyperplane between classes. The kernel trick evaluates dot products in a higher-dimensional space (RBF, polynomial) without computing the mapping explicitly." />
              <QA n={17} level="Intermediate" q="What is a Naive Bayes classifier and when does it work well?" hint="Independence assumption." answer="Applies Bayes' theorem assuming features are conditionally independent. Works well on text (spam filtering, sentiment) despite the naive assumption." />
              <QA n={18} level="Intermediate" q="Compare KNN and K-Means." hint="Supervised vs. unsupervised." answer="KNN is a supervised classifier — predicts by voting among k nearest labeled examples. K-Means is unsupervised — groups points into k clusters by minimising within-cluster variance." />
              <QA n={19} level="Intermediate" q="How do you handle imbalanced datasets?" hint="Sample vs. weight vs. metric." answer="Resample (SMOTE, undersampling), use class weights, use appropriate metrics (F1, ROC-AUC, PR-AUC), threshold moving, or anomaly-detection framing." />
              <QA n={20} level="Intermediate" q="Explain multicollinearity. How do you detect and fix it?" hint="VIF." answer="Highly correlated features destabilise coefficients. Detect via Variance Inflation Factor (VIF) or correlation matrix. Fix by dropping features, PCA, or regularisation." />
            </Section>

            <Section id="unsupervised" title="3. Unsupervised Learning — Intermediate">
              <QA n={21} level="Intermediate" q="Explain K-Means. How do you choose k?" hint="Elbow / silhouette." answer="Iteratively assign each point to nearest centroid and update centroids. Choose k via the elbow method (inertia curve), silhouette score, or domain knowledge." />
              <QA n={22} level="Intermediate" q="What is hierarchical clustering? When would you use it?" hint="Dendrogram." answer="Builds a tree of clusters by successively merging (agglomerative) or splitting (divisive). Useful when you need multiple levels of granularity or don't know k in advance." />
              <QA n={23} level="Intermediate" q="DBSCAN — how does it differ from K-Means?" hint="Density-based." answer="DBSCAN groups points by density and can find arbitrarily shaped clusters plus detect noise. K-Means assumes spherical clusters of similar size." />
              <QA n={24} level="Intermediate" q="Explain PCA and how it reduces dimensionality." hint="Eigenvectors of covariance." answer="PCA finds orthogonal directions of maximum variance (principal components) via eigen-decomposition of the covariance matrix and projects data onto the top-k components." />
              <QA n={25} level="Intermediate" q="t-SNE vs. UMAP — when to use each?" hint="Local vs. global structure." answer="Both are non-linear dim-reduction for visualisation. t-SNE preserves local neighbourhoods but distorts global distance. UMAP preserves more global structure and is faster." />
              <QA n={26} level="Intermediate" q="What is an anomaly detection problem? Give three approaches." hint="Density, distance, reconstruction." answer="Detecting rare/unusual points. Approaches: Isolation Forest, One-Class SVM, autoencoder reconstruction error, statistical thresholds (Z-score / IQR)." />
              <QA n={27} level="Intermediate" q="Describe association rule mining (Apriori)." hint="Support/confidence/lift." answer="Finds frequent itemsets and rules of form A ⇒ B using support (frequency), confidence (P(B|A)), and lift (independence check). Used in market-basket analysis." />
            </Section>

            <Section id="evaluation" title="4. Model Evaluation">
              <Figure src={IMG.interview} caption="Model evaluation is the interviewer's favourite depth-check — know your metrics cold." />
              <QA n={28} level="Intermediate" q="Explain the ROC curve and AUC." hint="TPR vs. FPR." answer="ROC plots TPR (recall) vs. FPR across thresholds. AUC = probability that a random positive ranks higher than a random negative. 0.5 = random, 1.0 = perfect." />
              <QA n={29} level="Intermediate" q="When should you use PR-AUC over ROC-AUC?" hint="Class imbalance." answer="On highly imbalanced datasets — ROC can look optimistic because the negative class dominates. PR-AUC focuses on positive-class performance." />
              <QA n={30} level="Intermediate" q="Explain log-loss / cross-entropy." hint="Probability-aware error." answer="Penalises confident wrong predictions heavily: −Σ y·log(ŷ) + (1−y)·log(1−ŷ). Used for probabilistic classifiers because it's a proper scoring rule." />
              <QA n={31} level="Intermediate" q="What is calibration? Why does it matter?" hint="Predicted probability vs. actual frequency." answer="A model is calibrated if predicted probability p means ~p fraction are positive. Matters when downstream systems act on probabilities (risk, cost-sensitive decisions). Use Platt scaling or isotonic regression." />
              <QA n={32} level="Intermediate" q="Explain confusion matrix in a multi-class setting." hint="One row per class." answer="An n×n matrix where entry (i,j) is the count of class-i samples predicted as class-j. Per-class precision/recall/F1 are computed from it; macro-F1 averages equally, weighted-F1 weights by support." />
            </Section>

            <Section id="feature-eng" title="5. Feature Engineering">
              <QA n={33} level="Intermediate" q="What is feature scaling? When is it required?" hint="Distance-based / gradient-based models." answer="Rescaling numeric features (standardisation or min-max). Required for distance-based (KNN, K-Means, SVM) and gradient-based (linear models, neural nets) methods. Tree ensembles don't need it." />
              <QA n={34} level="Intermediate" q="Compare Label Encoding, One-Hot, Target Encoding." hint="Ordinal vs. nominal vs. leakage risk." answer="Label = integer per category (ordinal only). One-hot = binary column per category (safe for nominals, expands dimensionality). Target = category → mean(target); powerful but risks leakage — always encode inside CV." />
              <QA n={35} level="Intermediate" q="How would you handle missing data?" hint="Simple, model-based, or informative." answer="Drop, impute (mean/median/mode), model-based imputation (KNN/iterative), or add an is_missing flag. Choice depends on missingness mechanism (MCAR/MAR/MNAR) and downstream model." />
              <QA n={36} level="Intermediate" q="What is data leakage? Give two concrete examples." hint="Info from the future / test." answer="Information the model would not have at prediction time. Examples: including the target in features, computing global statistics before splitting, using future timestamps in a time-series split." />
              <QA n={37} level="Intermediate" q="Describe three feature-selection techniques." hint="Filter, wrapper, embedded." answer="Filter (correlation, mutual information), wrapper (RFE, forward selection), embedded (L1 regularisation, tree feature importances)." />
              <QA n={38} level="Advanced" q="How would you engineer features for a time-series problem?" hint="Lags, rollings, dates." answer="Lag features (t−1, t−7), rolling stats (mean, std over windows), date parts (dow, month, holiday flags), and difference/ratio features to expose trend and seasonality." />
            </Section>

            <Section id="python-ml" title="6. Python for ML — Coding">
              <QA n={39} level="Intermediate" q="Write NumPy code to standardise a 2D array column-wise." hint="mean and std along axis=0." answer={<Code>{`import numpy as np
X = np.random.rand(100, 5)
X_std = (X - X.mean(axis=0)) / X.std(axis=0, ddof=0)`}</Code>} />
              <QA n={40} level="Intermediate" q="Given a pandas DataFrame df with a 'price' column, replace missing values with the median in one line." hint="fillna." answer={<Code>{`df["price"] = df["price"].fillna(df["price"].median())`}</Code>} />
              <QA n={41} level="Intermediate" q="Write a function to compute F1 score without importing sklearn." hint="TP, FP, FN counts." answer={<Code>{`def f1(y_true, y_pred, pos=1):
    tp = sum(int(t == pos and p == pos) for t, p in zip(y_true, y_pred))
    fp = sum(int(t != pos and p == pos) for t, p in zip(y_true, y_pred))
    fn = sum(int(t == pos and p != pos) for t, p in zip(y_true, y_pred))
    p = tp / (tp + fp) if (tp + fp) else 0
    r = tp / (tp + fn) if (tp + fn) else 0
    return 2 * p * r / (p + r) if (p + r) else 0`}</Code>} />
              <QA n={42} level="Intermediate" q="Vectorise this loop: `out = [x*2+1 for x in arr]` for a NumPy array." hint="Broadcast." answer={<Code>{`out = arr * 2 + 1`}</Code>} />
            </Section>

            <Section id="sklearn" title="7. Scikit-learn — Practical">
              <QA n={43} level="Intermediate" q="How do you build a preprocessing + model Pipeline?" hint="Pipeline + ColumnTransformer." answer={<Code>{`from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

pre = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
])
pipe = Pipeline([("pre", pre), ("clf", RandomForestClassifier(random_state=42))])
pipe.fit(X_train, y_train)`}</Code>} />
              <QA n={44} level="Intermediate" q="GridSearchCV vs. RandomizedSearchCV — when to pick which?" hint="Grid size." answer="Grid is exhaustive but expensive; use when the space is small. RandomizedSearch samples n combinations and is more efficient for large / continuous spaces." />
              <QA n={45} level="Intermediate" q="How do you serialise a trained model?" hint="joblib." answer={<Code>{`import joblib
joblib.dump(pipe, "model.joblib")
pipe = joblib.load("model.joblib")`}</Code>} />
              <QA n={46} level="Intermediate" q="How do you get feature importances from a Random Forest inside a Pipeline?" hint="Named steps + transformed feature names." answer={<Code>{`clf = pipe.named_steps["clf"]
importances = clf.feature_importances_
names = pipe.named_steps["pre"].get_feature_names_out()`}</Code>} />
            </Section>

            <Section id="deep" title="8. Deep Learning Basics">
              <QA n={47} level="Intermediate" q="Explain forward and back-propagation intuitively." hint="Chain rule." answer="Forward pass computes activations layer by layer. Back-prop applies the chain rule from the loss backward to compute gradients for every parameter." />
              <QA n={48} level="Intermediate" q="Why do we need activation functions? Compare ReLU, Sigmoid, Tanh." hint="Non-linearity + gradients." answer="Without non-linear activations, stacked linear layers collapse to a single linear map. ReLU is fast and avoids vanishing gradients (but dies at 0). Sigmoid/Tanh saturate for large |x| — vanishing gradients in deep nets." />
              <QA n={49} level="Intermediate" q="What is dropout? Why does it help?" hint="Ensembling / regularisation." answer="Randomly zeros a fraction of activations during training; approximates model averaging and prevents co-adaptation of features → regularisation." />
              <QA n={50} level="Advanced" q="Explain batch normalisation." hint="Normalise activations." answer="Normalises layer inputs to zero mean / unit variance per mini-batch, with learnable scale and shift. Stabilises training, allows higher learning rates, and acts as mild regularisation." />
              <QA n={51} level="Advanced" q="CNN vs. RNN vs. Transformer — one-line each." hint="Modality + inductive bias." answer="CNN → local spatial patterns (images). RNN → sequential state (small sequences). Transformer → attention over the whole sequence in parallel (dominant for language and increasingly vision)." />
              <QA n={52} level="Advanced" q="What is transfer learning? Give one workflow." hint="Pretrained backbone + fine-tune." answer="Reuse weights from a model pretrained on a large dataset and fine-tune on your task. Workflow: freeze backbone → train head → optionally unfreeze top layers and train with a small learning rate." />
            </Section>

            <Section id="scenario" title="9. Scenario-based Questions">
              <QA n={53} level="Advanced" q="Scenario: 99% of your fraud data is 'not fraud'. Your model has 99% accuracy. Is it good?" hint="Baseline predicts majority." answer="No — always predicting 'not fraud' also gives 99%. Evaluate on precision, recall, F1, PR-AUC, and consider cost-weighted metrics or sampling techniques." />
              <QA n={54} level="Advanced" q="Scenario: model works great offline but degrades in production after 3 months." hint="Distribution shift." answer="Investigate data drift (input distribution) and concept drift (label distribution). Add monitoring (PSI, KL divergence, live metric slices), schedule retraining, and log inputs for debugging." />
              <QA n={55} level="Advanced" q="Scenario: your recruiter model shows bias against a demographic group. Steps?" hint="Fairness pipeline." answer="Audit with fairness metrics (demographic parity, equal opportunity), inspect data for representation, remove proxy features, apply pre/in/post-processing (reweighing, adversarial debiasing, calibrated equalized odds), and involve stakeholders." />
              <QA n={56} level="Advanced" q="Scenario: design an ML system to detect duplicate questions (Quora-like)." hint="Embeddings + ANN." answer="Encode questions with a sentence embedding model (SBERT), index vectors in an ANN store (FAISS), and score candidate pairs with cosine similarity + a fine-tuned cross-encoder for precision. Add caching and offline evaluation on labeled pairs." />
              <QA n={57} level="Advanced" q="Scenario: design a recommendation system for a new user (cold start)." hint="Content + popularity + explore." answer="Combine content-based signals (profile, first clicks), collaborative filtering once history exists, popularity fallbacks, and an exploration mechanism (bandits) so new items get exposure." />
            </Section>

            <Section id="coding" title="10. Coding Challenges">
              <QA n={58} level="Intermediate" q="Implement gradient descent for linear regression from scratch." hint="Update rule." answer={<Code>{`import numpy as np
def gd_linreg(X, y, lr=0.01, n_iter=1000):
    X = np.c_[np.ones(len(X)), X]         # bias column
    w = np.zeros(X.shape[1])
    for _ in range(n_iter):
        grad = X.T @ (X @ w - y) / len(y)
        w -= lr * grad
    return w`}</Code>} />
              <QA n={59} level="Intermediate" q="Given a stream of numbers, compute a running mean without storing the stream." hint="Welford / online update." answer={<Code>{`def running_mean():
    n, mean = 0, 0.0
    def push(x):
        nonlocal n, mean
        n += 1
        mean += (x - mean) / n
        return mean
    return push`}</Code>} />
              <QA n={60} level="Advanced" q="Implement K-Means (fit only) with NumPy." hint="Assign → update loop." answer={<Code>{`import numpy as np
def kmeans(X, k, n_iter=50, seed=0):
    rng = np.random.default_rng(seed)
    centers = X[rng.choice(len(X), k, replace=False)]
    for _ in range(n_iter):
        d = ((X[:, None] - centers) ** 2).sum(-1)
        labels = d.argmin(1)
        new_centers = np.stack([X[labels == i].mean(0) for i in range(k)])
        if np.allclose(new_centers, centers): break
        centers = new_centers
    return labels, centers`}</Code>} />
            </Section>

            <Section id="hr" title="11. HR & Behavioral Questions">
              <QA n={61} level="Beginner" q="Tell me about a challenging ML project you worked on." hint="STAR." answer="Use STAR: Situation (context), Task (goal + metric), Action (what YOU did — data, models, tradeoffs), Result (business impact, numbers). Keep 2 minutes; end with what you'd do differently." />
              <QA n={62} level="Beginner" q="How do you keep up with ML research?" hint="Concrete sources." answer="Papers With Code, arXiv-sanity, weekly digests (Import AI, The Batch), reading groups, reproducing one paper per month." />
              <QA n={63} level="Beginner" q="Describe a time you disagreed with a stakeholder." hint="Data-driven resolution." answer="Explain framing, evidence you gathered, how you communicated tradeoffs, and outcome. Show empathy — you're being tested for collaboration, not being right." />
              <QA n={64} level="Beginner" q="Why should we hire you for this ML role?" hint="Match role + evidence." answer="Tie 2–3 concrete strengths to the role (production Python, tabular modelling, causal thinking) with proof (project, metric, scale)." />
            </Section>

            <Section id="tips" title="12. Interview Tips">
              <Callout tone="tip" title="Expert Interview Tips">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Clarify the problem before jumping in — ask about data, metric, constraints.</li>
                  <li>Think aloud. Interviewers grade your process, not just the answer.</li>
                  <li>Know your last project cold: data volume, features, metric, baseline, failure modes.</li>
                  <li>Prefer a simple, correct answer to a fancy, hand-wavy one.</li>
                  <li>Draw the confusion matrix and ROC/PR curves on the whiteboard when in doubt.</li>
                </ul>
              </Callout>
              <Callout tone="warning" title="Common Mistakes">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Answering accuracy when the class is imbalanced.</li>
                  <li>Tuning hyperparameters on the test set.</li>
                  <li>Confusing correlation with causation.</li>
                  <li>Ignoring data leakage in time-series splits.</li>
                  <li>Over-reliance on deep learning for small tabular data.</li>
                </ul>
              </Callout>
            </Section>

            <Section id="top50" title="Top 50 Frequently Asked Questions — Rapid List">
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                {[
                  "What is Machine Learning?", "Supervised vs. Unsupervised?", "Bias-variance tradeoff?",
                  "What is overfitting?", "Regularisation types?", "L1 vs. L2?",
                  "Cross-validation?", "Confusion matrix?", "Precision vs. Recall?",
                  "F1 vs. accuracy?", "ROC vs. PR curve?", "Log-loss?",
                  "Linear vs. Logistic regression?", "Decision Tree splitting?", "Random Forest vs. GBM?",
                  "XGBoost advantages?", "SVM + kernel trick?", "KNN?",
                  "Naive Bayes?", "K-Means + choosing k?", "DBSCAN?",
                  "Hierarchical clustering?", "PCA?", "t-SNE vs. UMAP?",
                  "One-hot vs. label vs. target encoding?", "Handling missing data?", "Data leakage?",
                  "Feature scaling — when?", "Feature selection techniques?", "Class imbalance techniques?",
                  "SMOTE?", "Grid vs. Random search?", "Bayesian optimisation?",
                  "Pipeline / ColumnTransformer?", "Model persistence with joblib?", "Cold start problem?",
                  "Concept drift?", "Data drift?", "Explainability (SHAP / LIME)?",
                  "Fairness metrics?", "A/B testing basics?", "Multi-armed bandits?",
                  "Batch vs. online learning?", "Ensembling techniques?", "Stacking vs. blending?",
                  "Neural network basics?", "Activation functions?", "Dropout?", "Batch norm?", "Transfer learning?",
                ].map((q, i) => (<li key={i}>{q}</li>))}
              </ol>
            </Section>

            <Section id="rapid" title="Rapid Revision — One-liners">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>High bias?</strong> Add features, complexity, reduce regularisation.</li>
                <li><strong>High variance?</strong> More data, regularisation, simpler model, bagging.</li>
                <li><strong>Imbalanced?</strong> Class weights, resampling, F1/PR-AUC, threshold tuning.</li>
                <li><strong>Leakage?</strong> Fit preprocessing inside CV; never touch test in feature stats.</li>
                <li><strong>Deployment?</strong> Version model + data, monitor drift, plan rollback.</li>
              </ul>
            </Section>

            <Section id="checklist" title="Mock Interview Checklist">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Round</th><th className="p-2">You should be able to…</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">Screening</td><td className="p-2">Explain ML basics + last project in &lt; 3 minutes.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Coding</td><td className="p-2">Write Python for data cleaning, F1, gradient descent, KNN, K-Means.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">ML Depth</td><td className="p-2">Derive gradients, discuss regularisation, walk through boosting.</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">System Design</td><td className="p-2">Design recommender / fraud / duplicate-detection systems end-to-end.</td></tr>
                    <tr><td className="p-2">Behavioral</td><td className="p-2">Tell STAR stories about conflict, failure, ownership.</td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="self" title="Self Assessment">
              <p>Rate 1–5 on each area. Anything &lt; 3? Revisit that section.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>ML fundamentals + math intuition</li>
                <li>Classical algorithms (linear, tree ensembles, SVM, KNN)</li>
                <li>Evaluation metrics + calibration</li>
                <li>Feature engineering + data leakage</li>
                <li>Python + scikit-learn fluency</li>
                <li>Deep learning basics + transfer learning</li>
                <li>System design + deployment</li>
                <li>Behavioral / storytelling</li>
              </ul>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="How many hours should I prep?">Aim for 4–6 focused weeks with daily practice. Quality beats quantity — review your mistakes.</FAQ>
              <FAQ q="Should I memorise formulas?">Understand derivations (gradient descent, entropy, AUC). Memorising without intuition is fragile.</FAQ>
              <FAQ q="Are LeetCode-style algorithms asked?">Yes at product companies. Practice arrays, hash maps, and one graph traversal; NumPy fluency helps.</FAQ>
              <FAQ q="How to answer 'I don't know'?">State what you do know, propose an approach, ask a clarifying question. Never bluff.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Baseline</strong> — the simplest reasonable model you must beat.</li>
                <li><strong>Cross-validation</strong> — resampling scheme for a stable performance estimate.</li>
                <li><strong>Leakage</strong> — test information sneaks into training.</li>
                <li><strong>Drift</strong> — data or concept distribution changes after deployment.</li>
                <li><strong>Calibration</strong> — predicted probabilities match actual frequencies.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>TensorFlow — <a href="https://www.tensorflow.org/api_docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">tensorflow.org</a></li>
                <li>PyTorch — <a href="https://pytorch.org/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">pytorch.org</a></li>
                <li>OpenAI Documentation, Google AI, Microsoft Learn, IBM Machine Learning.</li>
                <li>Kaggle Learn, DeepLearning.AI, MIT OpenCourseWare, Stanford AI Lab, Carnegie Mellon University.</li>
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
              { title: "Machine Learning — Answer Key", tag: "AI & Data", time: "33 min" },
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

function QA({ n, level, q, hint, answer }: { n: number; level: "Beginner" | "Intermediate" | "Advanced"; q: string; hint: string; answer: React.ReactNode }) {
  const levelColor: Record<string, string> = {
    Beginner: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    Intermediate: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    Advanced: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  };
  return (
    <div className="my-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-primary">Q{n}</span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${levelColor[level]}`}>{level}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-foreground">{q}</p>
      <details className="mt-2 rounded-lg border border-dashed border-border/60 bg-secondary/40 p-2 text-xs">
        <summary className="cursor-pointer font-semibold text-muted-foreground">Hint</summary>
        <p className="mt-1 text-muted-foreground">{hint}</p>
      </details>
      <details className="mt-2 rounded-lg border border-border/60 bg-background p-3 text-sm">
        <summary className="cursor-pointer font-semibold text-primary">Model answer</summary>
        <div className="mt-2 text-foreground/90">{answer}</div>
      </details>
    </div>
  );
}
