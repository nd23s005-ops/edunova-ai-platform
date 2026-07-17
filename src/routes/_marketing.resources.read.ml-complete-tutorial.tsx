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

export const Route = createFileRoute("/_marketing/resources/read/ml-complete-tutorial")({
  head: () => {
    const title = "Machine Learning — Complete Tutorial | EduNova AI";
    const desc =
      "End-to-end Machine Learning tutorial: Python, preprocessing, EDA, supervised & unsupervised learning, evaluation, scikit-learn, deep learning intro, deployment, and a capstone project.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MLCompleteTutorialPage,
});

const RESOURCE = {
  id: "ml-complete-tutorial",
  title: "Machine Learning — Complete Tutorial",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "69 min",
  pages: 101,
  lastUpdated: "October 2026",
  tags: ["Machine Learning", "ML", "Python", "scikit-learn"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  pipeline: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80",
  lifecycle: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80",
};

const TOC = [
  { id: "fundamentals", label: "1. Machine Learning Fundamentals" },
  { id: "python", label: "2. Python for Machine Learning" },
  { id: "preprocessing", label: "3. Data Preprocessing" },
  { id: "eda", label: "4. Exploratory Data Analysis" },
  { id: "supervised", label: "5. Supervised Learning" },
  { id: "unsupervised", label: "6. Unsupervised Learning" },
  { id: "evaluation", label: "7. Model Evaluation" },
  { id: "features", label: "8. Feature Engineering" },
  { id: "tuning", label: "9. Hyperparameter Tuning" },
  { id: "sklearn", label: "10. Scikit-learn" },
  { id: "deep", label: "11. Deep Learning Introduction" },
  { id: "deploy", label: "12. Model Deployment" },
  { id: "production", label: "13. Production ML" },
  { id: "capstone", label: "14. Capstone Project" },
  { id: "review", label: "15. Final Review" },
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

function MLCompleteTutorialPage() {
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
    const shareData = { title: RESOURCE.title, text: "End-to-end Machine Learning tutorial on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(shareData.url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("fundamentals");
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
        <img src={IMG.hero} alt="Machine Learning pipeline visualization" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/85 via-violet-600/80 to-indigo-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A complete, end-to-end Machine Learning tutorial — from Python and preprocessing all the way through deployment and a capstone project.
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
                <li>Master Machine Learning fundamentals.</li>
                <li>Learn supervised and unsupervised learning end-to-end.</li>
                <li>Build ML models using Python and scikit-learn.</li>
                <li>Evaluate, tune, and optimize model performance.</li>
                <li>Deploy production-ready Machine Learning projects.</li>
              </ul>
            </Callout>

            <Section id="fundamentals" title="1. Machine Learning Fundamentals">
              <p>ML models learn a function <em>f: X → y</em> from examples. We distinguish supervised (labeled), unsupervised (unlabeled), and reinforcement (reward-driven) settings. Success depends far more on data quality and problem framing than on algorithm choice.</p>
              <Figure src={IMG.lifecycle} caption="The end-to-end ML lifecycle: problem framing → data → modeling → evaluation → deployment → monitoring." />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Bias–variance tradeoff</strong>: underfit vs overfit.</li>
                <li><strong>Generalization</strong>: performance on unseen data is what matters.</li>
                <li><strong>Inductive bias</strong>: every model makes assumptions — pick ones aligned with your data.</li>
              </ul>
            </Section>

            <Section id="python" title="2. Python for Machine Learning">
              <p>You need enough Python to be productive: functions, classes, list/dict comprehensions, virtual environments, and the scientific stack.</p>
              <CodeBlock language="python" code={`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data.csv")
print(df.head())
print(df.describe())`} />
              <p><strong>Core libraries:</strong> NumPy, Pandas, Matplotlib, Seaborn, scikit-learn, PyTorch/TensorFlow, Jupyter.</p>
            </Section>

            <Section id="preprocessing" title="3. Data Preprocessing">
              <ul className="list-disc space-y-1 pl-5">
                <li>Handle missing values with imputation (mean, median, KNN).</li>
                <li>Encode categorical variables (OneHot, Ordinal, Target).</li>
                <li>Scale numerical features (Standard, MinMax, Robust).</li>
                <li>Detect and treat outliers thoughtfully.</li>
              </ul>
              <CodeBlock language="python" code={`from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

pre = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
])`} />
            </Section>

            <Section id="eda" title="4. Exploratory Data Analysis">
              <p>EDA is understanding the shape, distributions, and relationships in your data before modeling.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Distributions: histograms, KDE, boxplots.</li>
                <li>Relationships: scatter matrix, correlation heatmap.</li>
                <li>Target leakage checks — the #1 hidden bug in ML projects.</li>
              </ul>
              <Callout tone="tip" title="Expert Tip">Time-box EDA. Two focused hours often beat two unfocused days.</Callout>
            </Section>

            <Section id="supervised" title="5. Supervised Learning">
              <Figure src={IMG.pipeline} caption="Supervised learning pipeline: features → model → prediction → loss → gradient update." />
              <p><strong>Regression:</strong> Linear, Ridge, Lasso, ElasticNet, Gradient Boosting.</p>
              <p><strong>Classification:</strong> Logistic Regression, SVM, Random Forest, XGBoost/LightGBM.</p>
              <CodeBlock language="python" code={`from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

pipe = Pipeline([("pre", pre), ("clf", RandomForestClassifier(n_estimators=300))])
pipe.fit(X_train, y_train)`} />
            </Section>

            <Section id="unsupervised" title="6. Unsupervised Learning">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Clustering</strong>: K-Means, DBSCAN, Hierarchical.</li>
                <li><strong>Dimensionality reduction</strong>: PCA, t-SNE, UMAP.</li>
                <li><strong>Anomaly detection</strong>: IsolationForest, One-Class SVM.</li>
              </ul>
            </Section>

            <Section id="evaluation" title="7. Model Evaluation">
              <p>Pick metrics that match business impact:</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Task</th><th className="p-2">Primary metrics</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">Regression</td><td className="p-2">MAE, RMSE, R²</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Binary classification</td><td className="p-2">ROC-AUC, F1, Precision/Recall</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Multi-class</td><td className="p-2">Macro-F1, Log-loss</td></tr>
                    <tr><td className="p-2">Ranking</td><td className="p-2">NDCG, MAP</td></tr>
                  </tbody>
                </table>
              </div>
              <p>Use <strong>cross-validation</strong> for reliable estimates. Prefer stratified splits for imbalanced classes.</p>
            </Section>

            <Section id="features" title="8. Feature Engineering">
              <ul className="list-disc space-y-1 pl-5">
                <li>Interaction terms and polynomial features.</li>
                <li>Datetime decomposition (dayofweek, hour, is_weekend).</li>
                <li>Target/mean encoding for high-cardinality categoricals.</li>
                <li>Log / Box-Cox transforms for skewed distributions.</li>
              </ul>
            </Section>

            <Section id="tuning" title="9. Hyperparameter Tuning">
              <p>Start simple: GridSearchCV → RandomizedSearchCV → Bayesian (Optuna).</p>
              <CodeBlock language="python" code={`from sklearn.model_selection import GridSearchCV

grid = {"clf__n_estimators": [100, 300], "clf__max_depth": [None, 8, 16]}
gs = GridSearchCV(pipe, grid, cv=5, scoring="f1_macro", n_jobs=-1)
gs.fit(X_train, y_train)
print(gs.best_params_, gs.best_score_)`} />
            </Section>

            <Section id="sklearn" title="10. Scikit-learn">
              <p>Scikit-learn's estimator API is the anchor pattern of the entire ML ecosystem: <code>fit</code>, <code>predict</code>, <code>transform</code>. Wrap everything in <code>Pipeline</code> so preprocessing and modeling travel together.</p>
              <Callout tone="note" title="Best Practice">Fit preprocessing <em>inside</em> the pipeline — never on the full dataset before splitting. Otherwise you leak test information into training.</Callout>
            </Section>

            <Section id="deep" title="11. Deep Learning Introduction">
              <p>When tabular data plateaus and you have lots of samples and unstructured inputs (text, images, audio), reach for neural networks.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>PyTorch — flexible, research-friendly.</li>
                <li>TensorFlow / Keras — production tooling, TFLite for edge.</li>
                <li>Hugging Face — pretrained transformers you can fine-tune.</li>
              </ul>
              <CodeBlock language="python" code={`import torch, torch.nn as nn

class MLP(nn.Module):
    def __init__(self, in_dim, out_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, 64), nn.ReLU(),
            nn.Linear(64, out_dim),
        )
    def forward(self, x): return self.net(x)`} />
            </Section>

            <Section id="deploy" title="12. Model Deployment">
              <ul className="list-disc space-y-1 pl-5">
                <li>Serialize models with <code>joblib</code> or ONNX.</li>
                <li>Wrap inference in a FastAPI / Flask service.</li>
                <li>Containerize with Docker; deploy to Cloud Run, ECS, or Kubernetes.</li>
                <li>Version data and models (DVC, MLflow).</li>
              </ul>
              <CodeBlock language="python" code={`from fastapi import FastAPI
import joblib

model = joblib.load("model.pkl")
app = FastAPI()

@app.post("/predict")
def predict(payload: dict):
    return {"y": model.predict([list(payload.values())]).tolist()}`} />
            </Section>

            <Section id="production" title="13. Production ML">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Monitoring</strong>: latency, throughput, prediction distribution, drift.</li>
                <li><strong>Retraining</strong>: scheduled or triggered by drift alarms.</li>
                <li><strong>A/B tests</strong>: shadow deploys before full rollout.</li>
                <li><strong>Governance</strong>: model cards, data lineage, and audit logs.</li>
              </ul>
            </Section>

            <Section id="capstone" title="14. Capstone Project">
              <p><strong>Goal:</strong> ship a real ML app end-to-end.</p>
              <ol className="list-decimal space-y-1 pl-5">
                <li><strong>Dataset Selection</strong> — pick a real dataset (Kaggle, UCI, or your own).</li>
                <li><strong>Problem Framing</strong> — regression? classification? metric?</li>
                <li><strong>Baseline</strong> — dummy classifier / mean prediction to beat.</li>
                <li><strong>Model Building</strong> — iterate through 2–3 algorithms.</li>
                <li><strong>Evaluation</strong> — cross-validated metrics + error analysis.</li>
                <li><strong>Deployment</strong> — FastAPI + Docker + a public URL.</li>
                <li><strong>Portfolio Tips</strong> — clean README, live demo, short write-up.</li>
              </ol>
              <Callout tone="success" title="Ship one, then ship two more">Recruiters value shipped projects with visible thought over half-finished notebooks.</Callout>
            </Section>

            <Section id="review" title="15. Final Review">
              <p><strong>Best practices:</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Reproducibility: seed everything, freeze environments.</li>
                <li>Track experiments (MLflow, Weights & Biases).</li>
                <li>Do error analysis, not just leaderboard chasing.</li>
              </ul>
              <p><strong>Troubleshooting checklist:</strong> label leakage, data drift, class imbalance, wrong metric, unfair train/test split, seed variance.</p>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="Which ML algorithm should I try first?">A gradient-boosted tree (XGBoost/LightGBM) is a strong baseline for tabular data. Logistic Regression is a great sanity check.</FAQ>
              <FAQ q="How much data do I need?">For classic ML, thousands of rows is often enough. Deep learning typically needs orders of magnitude more or transfer learning.</FAQ>
              <FAQ q="How do I know if my model is overfit?">Large gap between training and validation scores. Learning curves are the fastest diagnostic.</FAQ>
              <FAQ q="Do I need a GPU?">Not for tabular ML. Yes, for training deep-learning models from scratch.</FAQ>
              <FAQ q="How do I keep models fresh in production?">Monitor drift and retrain on a schedule or trigger.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Pipeline</strong> — chained preprocessing + model that trains and predicts together.</li>
                <li><strong>Cross-validation</strong> — rotating train/validation splits to reduce variance in estimates.</li>
                <li><strong>Drift</strong> — the input distribution changes after deployment.</li>
                <li><strong>Regularization</strong> — penalizing complexity to prevent overfitting.</li>
                <li><strong>Embedding</strong> — dense vector representation learned from data.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>PyTorch — <a href="https://pytorch.org/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">pytorch.org</a></li>
                <li>TensorFlow — <a href="https://www.tensorflow.org/api_docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">tensorflow.org</a></li>
                <li>Google AI — <a href="https://ai.google/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ai.google</a></li>
                <li>Microsoft Learn — Machine Learning paths.</li>
                <li>IBM Machine Learning — <a href="https://www.ibm.com/topics/machine-learning" target="_blank" rel="noreferrer" className="text-primary hover:underline">ibm.com</a></li>
                <li>Kaggle Learn — <a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">kaggle.com/learn</a></li>
                <li>DeepLearning.AI, MIT OpenCourseWare, Stanford AI Lab, Carnegie Mellon University.</li>
                <li>arXiv, IEEE Xplore, ACM Digital Library.</li>
              </ul>
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
              { title: "Machine Learning — Beginner Guide", tag: "AI & Data", time: "12 min" },
              { title: "Machine Learning — Step-by-Step Guide", tag: "AI & Data", time: "22 min" },
              { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "70 min" },
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
