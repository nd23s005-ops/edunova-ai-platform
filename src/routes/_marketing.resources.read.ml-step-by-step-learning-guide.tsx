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

export const Route = createFileRoute("/_marketing/resources/read/ml-step-by-step-learning-guide")({
  head: () => {
    const title = "Machine Learning — Step-by-Step Learning Guide | EduNova AI";
    const desc =
      "A structured 12-week Machine Learning learning roadmap with weekly lessons, exercises, projects, quizzes, and milestones.";
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
  component: MLStepByStepPage,
});

const RESOURCE = {
  id: "ml-step-by-step-learning-guide",
  title: "Machine Learning — Step-by-Step Learning Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "22 min",
  pages: 36,
  lastUpdated: "March 2026",
  tags: ["Machine Learning", "ML", "Python", "Roadmap"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1800&q=80",
  roadmap: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80",
  milestones: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
};

const TOC = [
  { id: "roadmap", label: "1. Learning Roadmap" },
  { id: "w1-2", label: "2. Week 1–2 Foundations" },
  { id: "w3-4", label: "3. Week 3–4 Python & Data" },
  { id: "w5-6", label: "4. Week 5–6 Supervised Learning" },
  { id: "w7-8", label: "5. Week 7–8 Unsupervised Learning" },
  { id: "w9-10", label: "6. Week 9–10 Model Evaluation" },
  { id: "w11-12", label: "7. Week 11–12 Projects" },
  { id: "portfolio", label: "8. Portfolio Development" },
  { id: "interview", label: "9. Interview Preparation" },
  { id: "final", label: "10. Final Assessment" },
  { id: "review", label: "Roadmap Review" },
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

function MLStepByStepPage() {
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
    const shareData = { title: RESOURCE.title, text: "12-week Machine Learning roadmap on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(shareData.url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("roadmap");
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
        <img src={IMG.hero} alt="Learning roadmap milestones" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/85 via-fuchsia-600/80 to-pink-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A 12-week structured Machine Learning roadmap. Weekly lessons, hands-on exercises, quizzes, and milestone projects.
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
                <li>Follow a structured, milestone-driven learning path.</li>
                <li>Build Machine Learning skills gradually, week by week.</li>
                <li>Complete practical exercises and mini-projects.</li>
                <li>Develop portfolio-ready projects you can share.</li>
                <li>Measure and track your learning progress.</li>
              </ul>
            </Callout>

            <Section id="roadmap" title="1. Learning Roadmap">
              <p>This roadmap assumes ~6–8 hours per week for 12 weeks. Each phase builds on the last, so treat it as a ladder — do not skip rungs.</p>
              <Figure src={IMG.roadmap} caption="12-week Machine Learning roadmap: Foundations → Python & Data → Supervised → Unsupervised → Evaluation → Projects." />
              <div className="grid gap-3 sm:grid-cols-2">
                <Milestone label="Weeks 1–2" title="Foundations" body="Math intuition, statistics primer, ML mindset." />
                <Milestone label="Weeks 3–4" title="Python & Data" body="NumPy, Pandas, cleaning, EDA." />
                <Milestone label="Weeks 5–6" title="Supervised Learning" body="Regression, classification, first Kaggle-style submission." />
                <Milestone label="Weeks 7–8" title="Unsupervised" body="Clustering, PCA, anomaly detection." />
                <Milestone label="Weeks 9–10" title="Evaluation" body="Metrics, cross-validation, tuning, pipelines." />
                <Milestone label="Weeks 11–12" title="Projects" body="End-to-end capstone + deployment." />
              </div>
            </Section>

            <Section id="w1-2" title="2. Week 1–2 Foundations">
              <p><strong>Daily practice tasks (5 days/week, 60–90 min):</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Review linear algebra basics (vectors, matrices, dot products).</li>
                <li>Descriptive statistics: mean, median, variance, std, distributions.</li>
                <li>Probability primer: independence, conditional probability, Bayes' rule.</li>
                <li>Read one article on how ML systems learn from data.</li>
              </ul>
              <p><strong>Weekly quiz:</strong> 10 questions on statistics and ML terminology.</p>
              <p><strong>Milestone:</strong> Explain in one paragraph what ML is and how it differs from traditional programming.</p>
            </Section>

            <Section id="w3-4" title="3. Week 3–4 Python & Data">
              <p><strong>Daily tasks:</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Practice NumPy arrays, broadcasting, and vectorized operations.</li>
                <li>Wrangle a real CSV with Pandas — filter, group, join, pivot.</li>
                <li>Visualize with Matplotlib and Seaborn.</li>
                <li>Handle missing values and encode categorical variables.</li>
              </ul>
              <CodeBlock language="python" code={`import pandas as pd
df = pd.read_csv("titanic.csv")
df["Age"] = df["Age"].fillna(df["Age"].median())
survival_by_class = df.groupby("Pclass")["Survived"].mean()
print(survival_by_class)`} />
              <p><strong>Mini project:</strong> Publish a Titanic EDA notebook to GitHub.</p>
            </Section>

            <Section id="w5-6" title="4. Week 5–6 Supervised Learning">
              <p><strong>Learning goals:</strong> regression, classification, train/test splits, first models.</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Linear Regression on the California housing dataset.</li>
                <li>Logistic Regression on the Titanic dataset.</li>
                <li>Decision Trees and Random Forests.</li>
                <li>Read scikit-learn's user guide for supervised learning.</li>
              </ul>
              <CodeBlock language="python" code={`from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)
print(model.score(X_test, y_test))`} />
              <p><strong>Weekly quiz:</strong> 15 MCQs on regression, classification, and overfitting.</p>
            </Section>

            <Section id="w7-8" title="5. Week 7–8 Unsupervised Learning">
              <ul className="list-disc space-y-1 pl-5">
                <li>K-Means and choosing k with the elbow method.</li>
                <li>PCA for dimensionality reduction and visualization.</li>
                <li>Anomaly detection with IsolationForest.</li>
              </ul>
              <p><strong>Mini project:</strong> Customer segmentation on a public retail dataset.</p>
            </Section>

            <Section id="w9-10" title="6. Week 9–10 Model Evaluation">
              <Figure src={IMG.milestones} caption="Milestones: baseline → tuned pipeline → evaluated model → shipped project." />
              <ul className="list-disc space-y-1 pl-5">
                <li>Confusion matrices, precision, recall, F1, ROC-AUC.</li>
                <li>K-Fold and Stratified K-Fold cross-validation.</li>
                <li>GridSearchCV and RandomizedSearchCV.</li>
                <li>Compose scikit-learn Pipelines and ColumnTransformers.</li>
              </ul>
              <p><strong>Self-assessment:</strong> Can you explain when to prefer F1 over accuracy?</p>
            </Section>

            <Section id="w11-12" title="7. Week 11–12 Projects">
              <p><strong>Capstone plan:</strong></p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Pick a real dataset (Kaggle, UCI, or your own).</li>
                <li>Frame the problem and choose a metric.</li>
                <li>Build a baseline model.</li>
                <li>Iterate: features, models, tuning.</li>
                <li>Deploy as a small FastAPI app or Streamlit demo.</li>
                <li>Write a short blog post explaining the project.</li>
              </ol>
              <Callout tone="success" title="Deliverable">A GitHub repo + a live demo URL + a 500-word write-up.</Callout>
            </Section>

            <Section id="portfolio" title="8. Portfolio Development">
              <p><strong>Portfolio checklist:</strong></p>
              <ul className="list-none space-y-1">
                <li>☐ 3 diverse projects (tabular, unsupervised, one text or image).</li>
                <li>☐ Each project has a clean README with motivation, data, method, results.</li>
                <li>☐ Live demo (Streamlit / Hugging Face Space / Cloud Run).</li>
                <li>☐ Short write-up for each on a blog or LinkedIn.</li>
                <li>☐ Pinned repos on GitHub.</li>
              </ul>
            </Section>

            <Section id="interview" title="9. Interview Preparation">
              <ul className="list-disc space-y-1 pl-5">
                <li>ML fundamentals: bias/variance, overfitting, regularization.</li>
                <li>Coding: NumPy/Pandas manipulation, small algorithms.</li>
                <li>Case study: given a business problem, propose an ML solution.</li>
                <li>Behavioral: STAR-format stories about your projects.</li>
              </ul>
            </Section>

            <Section id="final" title="10. Final Assessment">
              <p><strong>Readiness check — score yourself 0–3 on each:</strong></p>
              <ul className="list-disc space-y-1 pl-5">
                <li>I can explain overfitting and how to prevent it.</li>
                <li>I can build a scikit-learn Pipeline from scratch.</li>
                <li>I can defend my choice of evaluation metric.</li>
                <li>I have shipped at least one end-to-end ML project.</li>
                <li>I can debug data leakage in a notebook.</li>
              </ul>
              <p>≥ 12 / 15 means you are ready for junior ML roles or the next tier of learning (deep learning, MLOps).</p>
            </Section>

            <Section id="review" title="Roadmap Review">
              <p><strong>Beginner checklist</strong></p>
              <ul className="list-none space-y-1">
                <li>☐ Comfortable with Python, NumPy, Pandas.</li>
                <li>☐ Understand supervised vs unsupervised learning.</li>
                <li>☐ Can train and evaluate a scikit-learn model.</li>
                <li>☐ Know what overfitting is and how to spot it.</li>
              </ul>
              <p className="mt-3"><strong>Monthly progress</strong></p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead><tr className="border-b border-border/60 text-left"><th className="p-2">Month</th><th className="p-2">Focus</th><th className="p-2">Deliverable</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-border/40"><td className="p-2">1</td><td className="p-2">Foundations + Python</td><td className="p-2">EDA notebook</td></tr>
                    <tr className="border-b border-border/40"><td className="p-2">2</td><td className="p-2">Supervised & Unsupervised</td><td className="p-2">Two mini projects</td></tr>
                    <tr><td className="p-2">3</td><td className="p-2">Evaluation + Capstone</td><td className="p-2">Deployed capstone</td></tr>
                  </tbody>
                </table>
              </div>
              <Callout tone="tip" title="Study Tip">Track everything in one journal — questions asked, bugs hit, aha-moments. Reviewing it monthly is the fastest way to close weak spots.</Callout>
            </Section>

            <Section id="faqs" title="Frequently Asked Questions">
              <FAQ q="What if I fall behind?">Repeat the current week instead of skipping. Consistency beats speed.</FAQ>
              <FAQ q="Do I need to finish math first?">No. Learn just-in-time as concepts appear.</FAQ>
              <FAQ q="Is 12 weeks realistic?">Yes at 6–8 hours per week with focus. Slower pace also works — the sequence matters more than the timeline.</FAQ>
              <FAQ q="Can I use ChatGPT while learning?">Use it to explain concepts, not to generate code you cannot read. Type your own code.</FAQ>
              <FAQ q="What's next after this roadmap?">Deep Learning, MLOps, or specializing in NLP, CV, or time-series.</FAQ>
            </Section>

            <Section id="glossary" title="Glossary">
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>Milestone</strong> — measurable checkpoint at the end of a phase.</li>
                <li><strong>Baseline</strong> — the simplest model you compare against.</li>
                <li><strong>Capstone</strong> — the final end-to-end project of a learning track.</li>
                <li><strong>Portfolio</strong> — a curated set of shippable projects.</li>
              </ul>
            </Section>

            <Section id="references" title="References">
              <ul className="list-disc space-y-1 pl-5">
                <li>Scikit-learn — <a href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer" className="text-primary hover:underline">scikit-learn.org</a></li>
                <li>Google Machine Learning Crash Course — <a href="https://developers.google.com/machine-learning/crash-course" target="_blank" rel="noreferrer" className="text-primary hover:underline">developers.google.com</a></li>
                <li>Kaggle Learn — <a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">kaggle.com/learn</a></li>
                <li>DeepLearning.AI — <a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">deeplearning.ai</a></li>
                <li>Microsoft Learn, IBM Machine Learning, MIT OpenCourseWare, Stanford AI Lab, Carnegie Mellon.</li>
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
              { title: "Machine Learning — Complete Tutorial", tag: "AI & Data", time: "69 min" },
              { title: "Artificial Intelligence — Learning Roadmap", tag: "AI & Data", time: "20 min" },
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

function Milestone({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{label}</p>
      <p className="mt-1 text-sm font-semibold">{title}</p>
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
