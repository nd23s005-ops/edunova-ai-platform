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

export const Route = createFileRoute("/_marketing/resources/read/ml-pdf-notes")({
  head: () => {
    const title = "Machine Learning — PDF Notes | EduNova AI";
    const desc =
      "Chapter-wise Machine Learning PDF Notes: fundamentals, math, Python, preprocessing, algorithms, evaluation, deployment, and revision.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MLPdfNotesPage,
});

const RESOURCE = {
  id: "ml-pdf-notes",
  title: "Machine Learning — PDF Notes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "60 min",
  pages: 129,
  lastUpdated: "June 2026",
  tags: ["Machine Learning", "ML", "Python", "Notes"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  lifecycle: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80",
};

const TOC = [
  { id: "c1", label: "1. Introduction to Machine Learning" },
  { id: "c2", label: "2. Mathematics for ML" },
  { id: "c3", label: "3. Python for ML" },
  { id: "c4", label: "4. Data Collection" },
  { id: "c5", label: "5. Data Preprocessing" },
  { id: "c6", label: "6. Exploratory Data Analysis" },
  { id: "c7", label: "7. Supervised Learning" },
  { id: "c8", label: "8. Unsupervised Learning" },
  { id: "c9", label: "9. Model Evaluation" },
  { id: "c10", label: "10. Feature Engineering" },
  { id: "c11", label: "11. Scikit-learn" },
  { id: "c12", label: "12. Deep Learning Basics" },
  { id: "c13", label: "13. Deployment" },
  { id: "c14", label: "14. Industry Applications" },
  { id: "c15", label: "15. Final Revision Notes" },
  { id: "faqs", label: "FAQs" },
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

function MLPdfNotesPage() {
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
    const shareData = { title: RESOURCE.title, text: "ML PDF Notes on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(shareData.url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("c1");
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
        <img src={IMG.hero} alt="Machine Learning notes cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/85 via-violet-600/80 to-fuchsia-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            Chapter-wise PDF-style notes covering every essential Machine Learning topic — from fundamentals to deployment — with definitions, algorithms, and Python examples.
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
            <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="Learning Objectives">
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Build a complete understanding of Machine Learning fundamentals.</li>
                <li>Master supervised and unsupervised learning concepts.</li>
                <li>Learn common algorithms and workflows.</li>
                <li>Revise efficiently using structured chapter-wise notes.</li>
                <li>Prepare for exams, certifications, and interviews.</li>
              </ul>
            </Callout>

            <Section id="c1" title="Chapter 1 — Introduction to Machine Learning">
              <p><strong>Definition.</strong> Machine Learning (ML) is a branch of AI that lets computers learn patterns from data rather than being explicitly programmed.</p>
              <p><strong>Key concepts:</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Task (T), Performance (P), Experience (E) — Tom Mitchell's definition.</li>
                <li>Bias–variance tradeoff, generalization, and inductive bias.</li>
              </ul>
              <Figure src={IMG.workflow} caption="High-level ML lifecycle: data → model → evaluation → deployment → monitoring." />
              <p><strong>End-of-chapter summary:</strong> ML shifts programming from rules-first to data-first, and the goal is generalization to unseen data.</p>
            </Section>

            <Section id="c2" title="Chapter 2 — Mathematics for ML">
              <p><strong>Linear algebra:</strong> vectors, matrices, dot products, matrix multiplication, eigenvalues.</p>
              <p><strong>Calculus:</strong> derivatives, gradients, chain rule — the engine behind backpropagation.</p>
              <p><strong>Probability and statistics:</strong> distributions, Bayes' rule, expectation, variance, hypothesis testing.</p>
              <p><strong>Important formulas:</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Mean Squared Error: <code>MSE = (1/n) Σ (y − ŷ)²</code></li>
                <li>Cross-entropy: <code>H = − Σ y · log(ŷ)</code></li>
                <li>Sigmoid: <code>σ(z) = 1 / (1 + e^(−z))</code></li>
              </ul>
              <p><strong>Mathematical intuition:</strong> loss surfaces are landscapes; gradient descent walks downhill.</p>
            </Section>

            <Section id="c3" title="Chapter 3 — Python for ML">
              <p><strong>Core libraries:</strong> NumPy, Pandas, Matplotlib, Seaborn, scikit-learn.</p>
              <CodeBlock language="python" code={`import numpy as np, pandas as pd
df = pd.read_csv("data.csv")
X, y = df.drop("target", axis=1), df["target"]`} />
              <p><strong>Best practice:</strong> always use virtual environments and pin dependencies.</p>
            </Section>

            <Section id="c4" title="Chapter 4 — Data Collection">
              <ul className="list-disc space-y-1 pl-5">
                <li>Sources: databases, APIs, web scraping, sensors, open datasets.</li>
                <li>Sampling: random, stratified, systematic.</li>
                <li>Data ethics and consent — collect only what you need.</li>
              </ul>
              <Callout tone="warning" title="Common Mistake">Small, biased datasets produce biased models. Diversity and volume matter.</Callout>
            </Section>

            <Section id="c5" title="Chapter 5 — Data Preprocessing">
              <ul className="list-disc space-y-1 pl-5">
                <li>Handle missing values: mean/median imputation, KNN imputer.</li>
                <li>Encode categoricals: OneHot, Ordinal, Target encoding.</li>
                <li>Scale numericals: Standard, MinMax, Robust.</li>
                <li>Outliers: winsorize or model-tolerant algorithms.</li>
              </ul>
              <CodeBlock language="python" code={`from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
pre = ColumnTransformer([
  ("num", StandardScaler(), num_cols),
  ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
])`} />
            </Section>

            <Section id="c6" title="Chapter 6 — Exploratory Data Analysis">
              <p>EDA answers: what does the data look like, and what could go wrong?</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Distributions and skewness (histograms, KDE).</li>
                <li>Correlations and multicollinearity.</li>
                <li>Target leakage checks.</li>
              </ul>
            </Section>

            <Section id="c7" title="Chapter 7 — Supervised Learning">
              <p><strong>Regression:</strong> Linear, Ridge, Lasso, Gradient Boosting.</p>
              <p><strong>Classification:</strong> Logistic Regression, SVM, Random Forest, XGBoost.</p>
              <CodeBlock language="python" code={`from sklearn.ensemble import RandomForestClassifier
m = RandomForestClassifier(n_estimators=200).fit(X_train, y_train)`} />
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Algorithm</th><th className="p-2">Task</th><th className="p-2">Strength</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">Logistic Regression</td><td className="p-2">Classification</td><td className="p-2">Fast, interpretable</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Random Forest</td><td className="p-2">Both</td><td className="p-2">Robust baseline</td></tr>
                    <tr><td className="p-2">Gradient Boosting</td><td className="p-2">Both</td><td className="p-2">Top tabular accuracy</td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="c8" title="Chapter 8 — Unsupervised Learning">
              <ul className="list-disc space-y-1 pl-5">
                <li>K-Means, DBSCAN, hierarchical clustering.</li>
                <li>PCA and t-SNE for dimensionality reduction.</li>
                <li>Anomaly detection with IsolationForest.</li>
              </ul>
            </Section>

            <Section id="c9" title="Chapter 9 — Model Evaluation">
              <Figure src={IMG.lifecycle} caption="Model evaluation flow: train → cross-validate → tune → evaluate on held-out test." />
              <ul className="list-disc space-y-1 pl-5">
                <li>Regression metrics: MAE, RMSE, R².</li>
                <li>Classification metrics: Accuracy, Precision, Recall, F1, ROC-AUC.</li>
                <li>Cross-validation: K-Fold, StratifiedKFold, TimeSeriesSplit.</li>
              </ul>
            </Section>

            <Section id="c10" title="Chapter 10 — Feature Engineering">
              <ul className="list-disc space-y-1 pl-5">
                <li>Interaction and polynomial features.</li>
                <li>Datetime decomposition and cyclical encodings.</li>
                <li>Target encoding for high-cardinality categoricals.</li>
                <li>Log / Box-Cox transforms for skew.</li>
              </ul>
            </Section>

            <Section id="c11" title="Chapter 11 — Scikit-learn">
              <p>The estimator API — <code>fit</code>, <code>predict</code>, <code>transform</code> — plus <code>Pipeline</code> and <code>ColumnTransformer</code>.</p>
              <Callout tone="tip" title="Best Practice">Always fit preprocessing inside a Pipeline so it doesn't leak test data during cross-validation.</Callout>
            </Section>

            <Section id="c12" title="Chapter 12 — Deep Learning Basics">
              <ul className="list-disc space-y-1 pl-5">
                <li>Neurons, activations, layers, forward and backward pass.</li>
                <li>Loss functions, optimizers (SGD, Adam), learning rates.</li>
                <li>Regularization: dropout, weight decay, early stopping.</li>
                <li>Frameworks: PyTorch, TensorFlow/Keras.</li>
              </ul>
            </Section>

            <Section id="c13" title="Chapter 13 — Deployment">
              <ul className="list-disc space-y-1 pl-5">
                <li>Serialize with joblib or ONNX.</li>
                <li>Wrap inference in FastAPI or Flask.</li>
                <li>Containerize with Docker; deploy to Cloud Run / K8s.</li>
                <li>Monitor drift and latency in production.</li>
              </ul>
              <CodeBlock language="python" code={`import joblib
joblib.dump(pipe, "model.pkl")
loaded = joblib.load("model.pkl")`} />
            </Section>

            <Section id="c14" title="Chapter 14 — Industry Applications">
              <ul className="list-disc space-y-1 pl-5">
                <li>Healthcare — diagnostic assistance, risk scoring.</li>
                <li>Finance — fraud detection, credit scoring.</li>
                <li>Retail — recommendations, demand forecasting.</li>
                <li>Manufacturing — predictive maintenance.</li>
                <li>Transport — ETA prediction, routing.</li>
              </ul>
            </Section>

            <Section id="c15" title="Chapter 15 — Final Revision Notes">
              <p><strong>Chapter summary:</strong> pick the right task type, prepare clean data, engineer features, choose a baseline model, evaluate with the right metric, tune, deploy, and monitor.</p>
              <p><strong>Quick revision:</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Overfitting = large train–test gap → regularize or gather more data.</li>
                <li>Class imbalance → stratify, use F1/AUC, class-weighted loss.</li>
                <li>Data leakage → fit preprocessing inside cross-validation.</li>
              </ul>
              <p><strong>Important formulas:</strong> MSE, RMSE, cross-entropy, precision = TP/(TP+FP), recall = TP/(TP+FN), F1 = 2PR/(P+R).</p>
              <p><strong>Interview questions:</strong></p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Explain bias–variance tradeoff.</li>
                <li>How does gradient descent work?</li>
                <li>When would you prefer F1 over accuracy?</li>
                <li>Describe an ML pipeline you've built end-to-end.</li>
                <li>How do you detect and fix data leakage?</li>
              </ol>
              <p><strong>Self-assessment:</strong> Score yourself out of 5 on each chapter. Anything &lt; 3 gets a re-read this week.</p>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="Are these notes enough for an ML certification?">They cover the common syllabus. Pair with official docs and one practice test.</FAQ>
              <FAQ q="Can I print them?">Yes — use the Print button; the layout is print-optimized.</FAQ>
              <FAQ q="Do I need to memorize formulas?">Understand the intuition first. Memorization sticks better after that.</FAQ>
              <FAQ q="Which chapter should I focus on for interviews?">Chapters 7, 9, and 15 — supervised learning, evaluation, and revision.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Feature</strong> — input variable used by the model.</li>
                <li><strong>Target</strong> — the value being predicted.</li>
                <li><strong>Overfitting</strong> — memorizes training data, fails on new data.</li>
                <li><strong>Regularization</strong> — penalizes complexity to improve generalization.</li>
                <li><strong>Pipeline</strong> — preprocessing + model chained together.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>TensorFlow — <a href="https://www.tensorflow.org/api_docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">tensorflow.org</a></li>
                <li>PyTorch — <a href="https://pytorch.org/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">pytorch.org</a></li>
                <li>Google AI, OpenAI Documentation, Microsoft Learn.</li>
                <li>IBM Machine Learning, Kaggle Learn, DeepLearning.AI.</li>
                <li>MIT OpenCourseWare, Stanford AI Lab, Carnegie Mellon University.</li>
                <li>arXiv, IEEE Xplore, ACM Digital Library.</li>
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
              { title: "Machine Learning — Quick Revision Notes", tag: "AI & Data", time: "10 min" },
              { title: "Machine Learning — Cheat Sheet", tag: "AI & Data", time: "4 min" },
              { title: "Machine Learning — Complete Tutorial", tag: "AI & Data", time: "69 min" },
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

function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-slate-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-400"><span>{language ?? "code"}</span><span>example</span></div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{code}</code></pre>
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
