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

export const Route = createFileRoute("/_marketing/resources/read/ml-cheat-sheet")({
  head: () => {
    const title = "Machine Learning — Cheat Sheet | EduNova AI";
    const desc =
      "Printable Machine Learning cheat sheet: workflow, algorithms, Python snippets, evaluation metrics, and quick tips.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MLCheatSheetPage,
});

const RESOURCE = {
  id: "ml-cheat-sheet",
  title: "Machine Learning — Cheat Sheet",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "4 min",
  pages: 2,
  lastUpdated: "June 2026",
  tags: ["Machine Learning", "ML", "Python", "Cheat Sheet"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  algos: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80",
};

const TOC = [
  { id: "overview", label: "1. ML Overview" },
  { id: "workflow", label: "2. ML Workflow" },
  { id: "algorithms", label: "3. Algorithm Cheat Sheet" },
  { id: "python", label: "4. Python Essentials" },
  { id: "metrics", label: "5. Evaluation Metrics" },
  { id: "terms", label: "6. Common Terminology" },
  { id: "tips", label: "7. Quick Tips" },
  { id: "final", label: "8. Final Reference" },
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

function MLCheatSheetPage() {
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
    const shareData = { title: RESOURCE.title, text: "ML Cheat Sheet on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(shareData.url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("overview");
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
        <img src={IMG.hero} alt="Machine Learning cheat sheet" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/85 via-orange-600/80 to-rose-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A printable one-glance cheat sheet — workflow, algorithms, Python snippets, metrics, and interview tips.
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
                <li>Quickly recall Machine Learning concepts.</li>
                <li>Reference essential ML terminology.</li>
                <li>Remember common Python patterns.</li>
                <li>Review algorithms at a glance.</li>
              </ul>
            </Callout>

            <Section id="overview" title="1. ML Overview">
              <p><strong>ML =</strong> learning a mapping f: X → y from data. Three families: <em>Supervised</em> (labels), <em>Unsupervised</em> (no labels), <em>Reinforcement</em> (rewards).</p>
              <Figure src={IMG.workflow} caption="ML workflow at a glance: data → prepare → model → evaluate → deploy → monitor." />
            </Section>

            <Section id="workflow" title="2. ML Workflow">
              <ol className="list-decimal space-y-1 pl-5">
                <li>Define problem &amp; metric.</li>
                <li>Collect &amp; clean data.</li>
                <li>Split train / val / test.</li>
                <li>Fit baseline → iterate.</li>
                <li>Evaluate &amp; deploy.</li>
              </ol>
            </Section>

            <Section id="algorithms" title="3. Algorithm Cheat Sheet">
              <Figure src={IMG.algos} caption="Pick an algorithm by task type: regression, classification, clustering, dimensionality reduction." />
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Algorithm</th><th className="p-2">Task</th><th className="p-2">Notes</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">Linear Regression</td><td className="p-2">Regression</td><td className="p-2">Baseline, interpretable</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Logistic Regression</td><td className="p-2">Classification</td><td className="p-2">Probabilistic baseline</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Random Forest</td><td className="p-2">Both</td><td className="p-2">Robust, minimal tuning</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">XGBoost / LightGBM</td><td className="p-2">Both</td><td className="p-2">Top tabular performance</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">SVM</td><td className="p-2">Classification</td><td className="p-2">Small data, high-dim</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">K-Means</td><td className="p-2">Clustering</td><td className="p-2">Pick k via elbow</td></tr>
                    <tr><td className="p-2">PCA</td><td className="p-2">Dim. reduction</td><td className="p-2">Explain variance</td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="python" title="4. Python Essentials">
              <div className="my-4 overflow-hidden rounded-2xl border border-border/60 bg-slate-950 text-slate-100 shadow-sm">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-400"><span>python</span><span>quick reference</span></div>
                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code>{`# Load data
import pandas as pd
df = pd.read_csv("data.csv")
X, y = df.drop("target", axis=1), df["target"]

# Split
from sklearn.model_selection import train_test_split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# Pipeline
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
pipe = Pipeline([("scale", StandardScaler()), ("clf", RandomForestClassifier())])
pipe.fit(X_tr, y_tr)

# Evaluate
from sklearn.metrics import classification_report
print(classification_report(y_te, pipe.predict(X_te)))

# Tune
from sklearn.model_selection import GridSearchCV
gs = GridSearchCV(pipe, {"clf__n_estimators": [100, 300]}, cv=5).fit(X_tr, y_tr)`}</code></pre>
              </div>
            </Section>

            <Section id="metrics" title="5. Evaluation Metrics">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Metric</th><th className="p-2">Use for</th><th className="p-2">Formula / Notes</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">MAE</td><td className="p-2">Regression</td><td className="p-2">mean(|y − ŷ|)</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">RMSE</td><td className="p-2">Regression</td><td className="p-2">√mean((y − ŷ)²)</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">R²</td><td className="p-2">Regression</td><td className="p-2">1 − SSres/SStot</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Precision</td><td className="p-2">Classification</td><td className="p-2">TP/(TP+FP)</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">Recall</td><td className="p-2">Classification</td><td className="p-2">TP/(TP+FN)</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">F1</td><td className="p-2">Imbalanced</td><td className="p-2">2PR/(P+R)</td></tr>
                    <tr><td className="p-2">ROC-AUC</td><td className="p-2">Ranking / imbalance</td><td className="p-2">Area under ROC curve</td></tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="terms" title="6. Common Terminology — Top 30 Keywords">
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  "Feature","Target","Label","Overfit","Underfit","Bias","Variance","Regularization",
                  "Pipeline","Cross-validation","Hyperparameter","Loss","Gradient Descent","Learning Rate",
                  "Epoch","Batch","One-Hot","Standardization","PCA","Cluster","Ensemble","ROC-AUC","F1",
                  "Precision","Recall","Baseline","Leakage","Drift","Embedding","Deployment",
                ].map((k) => (<span key={k} className="rounded-full bg-secondary px-2.5 py-0.5">{k}</span>))}
              </div>
            </Section>

            <Section id="tips" title="7. Quick Tips">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Best practice:</strong> Always start with a dumb baseline; if you can't beat it, question the data.</li>
                <li><strong>Best practice:</strong> Fit preprocessing inside a Pipeline — never leak test data.</li>
                <li><strong>Common mistake:</strong> Choosing accuracy on imbalanced data — prefer F1 or AUC.</li>
                <li><strong>Common mistake:</strong> Tuning on the test set — that set is used once, at the end.</li>
                <li><strong>Interview tip:</strong> Explain trade-offs (bias–variance, precision–recall) with a real example.</li>
                <li><strong>Interview tip:</strong> Know your last project's data, metric, and failure modes cold.</li>
              </ul>
            </Section>

            <Section id="final" title="8. Final Reference — Important Commands">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Command</th><th className="p-2">Purpose</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2"><code>train_test_split</code></td><td className="p-2">Split data into train/test</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2"><code>StandardScaler().fit_transform(X)</code></td><td className="p-2">Zero-mean, unit-variance scaling</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2"><code>OneHotEncoder</code></td><td className="p-2">Encode categoricals</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2"><code>cross_val_score</code></td><td className="p-2">Cross-validated performance</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2"><code>GridSearchCV</code></td><td className="p-2">Hyperparameter search</td></tr>
                    <tr><td className="p-2"><code>joblib.dump / load</code></td><td className="p-2">Serialize models</td></tr>
                  </tbody>
                </table>
              </div>
              <Callout tone="tip" title="Printable layout">Use your browser's Print button — the cheat sheet is designed to fit two portrait pages.</Callout>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="Can I use this during interviews?">Use it to prep, not during the call. Recruiters watch for genuine understanding.</FAQ>
              <FAQ q="Is this enough to learn ML?">No — pair it with the Beginner Guide and Complete Tutorial.</FAQ>
              <FAQ q="How do I print it cleanly?">Click Print in the top bar; the layout hides the sidebar for print.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Pipeline</strong> — preprocessing + model chained for reproducibility.</li>
                <li><strong>Baseline</strong> — simplest model to compare against.</li>
                <li><strong>Leakage</strong> — test information sneaks into training.</li>
                <li><strong>Drift</strong> — data distribution changes post-deploy.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>TensorFlow — <a href="https://www.tensorflow.org/api_docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">tensorflow.org</a></li>
                <li>PyTorch — <a href="https://pytorch.org/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">pytorch.org</a></li>
                <li>Google AI, OpenAI Documentation, Microsoft Learn, IBM Machine Learning.</li>
                <li>Kaggle Learn, DeepLearning.AI, MIT OpenCourseWare, Stanford AI Lab, Carnegie Mellon.</li>
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
              { title: "Machine Learning — PDF Notes", tag: "AI & Data", time: "60 min" },
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

function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group my-2 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold"><span>{q}</span><ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" /></summary>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}
