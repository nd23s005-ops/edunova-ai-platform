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
  Compass,
  Download,
  FileText,
  Heart,
  Info,
  Lightbulb,
  Map,
  Printer,
  Share2,
  Sparkles,
  Tag,
  Target,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-learning-roadmap")({
  head: () => {
    const title = "Artificial Intelligence — Learning Roadmap | EduNova AI";
    const desc =
      "A visual, week-by-week roadmap from foundations to advanced AI. Milestones, projects, and readiness checklists to master AI from beginner to career-ready.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AILearningRoadmapPage,
});

const RESOURCE = {
  id: "ai-learning-roadmap",
  title: "Artificial Intelligence — Learning Roadmap",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "9 min",
  pages: 7,
  lastUpdated: "June 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1800&q=80",
  timeline: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=80",
  skilltree: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "beginner-stage", label: "1. Beginner Stage" },
  { id: "foundations", label: "2. Foundations" },
  { id: "math", label: "3. Mathematics for AI" },
  { id: "python", label: "4. Python for AI" },
  { id: "ml", label: "5. Machine Learning" },
  { id: "dl", label: "6. Deep Learning" },
  { id: "nn", label: "7. Neural Networks" },
  { id: "genai", label: "8. Generative AI" },
  { id: "portfolio", label: "9. Portfolio Projects" },
  { id: "career", label: "10. Career Preparation" },
  { id: "review", label: "Roadmap Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faq", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

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

function AILearningRoadmapPage() {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

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
        const s = document.getElementById(item.id);
        if (s && s.getBoundingClientRect().top < 140) current = item.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share({ title: RESOURCE.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      <style>{`@media print{.no-print{display:none!important}.print-article{padding:0!important}body{background:#fff!important}}`}</style>

      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1" aria-hidden>
        <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <Compass className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}><Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>{bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}<span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}><Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} /><span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}><Share2 className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Share</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}><Printer className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Print</span></Button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/85 via-teal-700/75 to-sky-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-sky-500/90 text-white hover:bg-sky-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">6-Month Plan</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A structured, milestone-based path from absolute beginner to career-ready AI practitioner —
            with weekly goals, projects, and readiness checks.
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

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-14">
        <aside className="no-print hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Contents</p>
            <nav className="space-y-1 text-sm">
              {TOC.map((t) => (
                <a key={t.id} href={`#${t.id}`} className={`block rounded-md px-2 py-1.5 transition ${activeId === t.id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{t.label}</a>
              ))}
            </nav>
          </div>
        </aside>

        <article ref={articleRef} className="print-article prose prose-slate max-w-none dark:prose-invert">
          <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
            <ul className="mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              <li>Build a structured AI learning journey.</li>
              <li>Understand prerequisite skills.</li>
              <li>Track learning progress with milestones.</li>
              <li>Complete projects at each milestone.</li>
              <li>Prepare for professional AI careers.</li>
              <li>Follow a realistic 6-month roadmap.</li>
            </ul>
          </Callout>

          <figure>
            <img src={IMG.timeline} alt="Six-month AI learning timeline" className="rounded-xl border border-border/60" />
            <figcaption className="text-xs text-muted-foreground">A realistic six-month journey: foundations → ML → DL → GenAI → portfolio.</figcaption>
          </figure>

          <Section id="beginner-stage" title="1. Beginner Stage — Weeks 1–2">
            <p><strong>Goal.</strong> Get comfortable with what AI is and set up your tools.</p>
            <ul>
              <li>Read <em>AI Beginner Guide</em> and the <em>Complete Tutorial</em>.</li>
              <li>Install Python 3.11+, VS Code, and a virtual environment.</li>
              <li>Create a public GitHub profile and Kaggle account.</li>
            </ul>
            <Callout tone="success" title="Milestone" icon={<Trophy className="h-5 w-5" />}>Write a 300-word blog post: "What is AI, in my own words."</Callout>
          </Section>

          <Section id="foundations" title="2. Foundations — Weeks 3–4">
            <ul>
              <li>Data literacy: CSV, JSON, SQL basics (SELECT / JOIN / GROUP BY).</li>
              <li>Command line: navigating, git basics, running scripts.</li>
              <li>Software fundamentals: functions, testing, virtual envs.</li>
            </ul>
            <Callout tone="success" title="Milestone" icon={<Trophy className="h-5 w-5" />}>Ship a small CLI tool with 3 tests, deployed on GitHub.</Callout>
          </Section>

          <Section id="math" title="3. Mathematics for AI — Weeks 5–8">
            <ul>
              <li>Linear algebra: vectors, matrices, dot products, eigen-decomposition.</li>
              <li>Calculus: derivatives, gradients, chain rule.</li>
              <li>Probability: distributions, Bayes rule, expectation, variance.</li>
              <li>Statistics: sampling, hypothesis testing, confidence intervals.</li>
            </ul>
            <Callout tone="tip" title="Study tip">Do 10 exercises per topic instead of reading three textbooks — application over consumption.</Callout>
          </Section>

          <Section id="python" title="4. Python for AI — Weeks 9–10">
            <ul>
              <li>numpy, pandas, matplotlib, seaborn.</li>
              <li>scikit-learn pipelines and cross-validation.</li>
              <li>Jupyter workflows and reproducible notebooks.</li>
            </ul>
            <Callout tone="success" title="Milestone" icon={<Trophy className="h-5 w-5" />}>Publish an EDA notebook on Kaggle with a clean narrative.</Callout>
          </Section>

          <Section id="ml" title="5. Machine Learning — Weeks 11–16">
            <ul>
              <li>Supervised learning: linear/logistic regression, decision trees, gradient boosting.</li>
              <li>Unsupervised learning: k-means, PCA, DBSCAN.</li>
              <li>Model evaluation: cross-validation, ROC-AUC, PR-AUC.</li>
              <li>Feature engineering and leakage detection.</li>
            </ul>
            <Callout tone="success" title="Milestone" icon={<Trophy className="h-5 w-5" />}>Submit to a Kaggle competition and beat the sample benchmark.</Callout>
          </Section>

          <Section id="dl" title="6. Deep Learning — Weeks 17–20">
            <figure>
              <img src={IMG.skilltree} alt="AI skill tree" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">The AI skill tree branches from math → ML → DL → applied specialisation.</figcaption>
            </figure>
            <ul>
              <li>PyTorch fundamentals: tensors, autograd, training loops.</li>
              <li>Convolutional networks for images.</li>
              <li>Sequence models: RNNs, then transformers.</li>
            </ul>
          </Section>

          <Section id="nn" title="7. Neural Networks — Weeks 21–22">
            <ul>
              <li>MLPs from scratch (numpy).</li>
              <li>Backprop derivation, initialisation, optimisers (SGD, Adam).</li>
              <li>Regularisation: dropout, weight decay, augmentation.</li>
            </ul>
          </Section>

          <Section id="genai" title="8. Generative AI — Weeks 23–24">
            <ul>
              <li>LLM basics, tokenisation, prompt engineering.</li>
              <li>RAG systems: chunking, embeddings, retrieval, re-rank.</li>
              <li>Fine-tuning with LoRA and evaluation of generative outputs.</li>
            </ul>
          </Section>

          <Section id="portfolio" title="9. Portfolio Projects">
            <ol className="list-decimal space-y-1 pl-5">
              <li>End-to-end ML app (classification or regression) with API + UI.</li>
              <li>Computer vision demo (CNN or fine-tuned CLIP).</li>
              <li>NLP or LLM project with RAG grounding.</li>
              <li>One reproducible research replication with a written report.</li>
            </ol>
            <Callout tone="tip" title="Portfolio hygiene">Every project needs a clear README, a live demo (or GIF), an architecture diagram, and a "results" section with metrics and honest limitations.</Callout>
          </Section>

          <Section id="career" title="10. Career Preparation">
            <ul>
              <li>Resume: quantify impact — metrics, users, savings, latency.</li>
              <li>Interview prep: system design + ML fundamentals + coding.</li>
              <li>Networking: contribute one PR to a well-known OSS ML project.</li>
              <li>Apply to 25–50 tailored roles; iterate on feedback.</li>
            </ul>
          </Section>

          <Section id="review" title="Roadmap Review">
            <h4>Beginner Checklist</h4>
            <ul>
              <li>Python installed, GitHub set up, first repo pushed.</li>
              <li>Comfortable with numpy + pandas.</li>
              <li>Understand what AI, ML, DL, and GenAI mean.</li>
            </ul>
            <h4>Intermediate Checklist</h4>
            <ul>
              <li>Trained a supervised model with cross-validation.</li>
              <li>Understand overfitting and regularisation.</li>
              <li>Built a PyTorch classifier from scratch.</li>
            </ul>
            <h4>Advanced Checklist</h4>
            <ul>
              <li>Fine-tuned a transformer with LoRA.</li>
              <li>Built and evaluated a RAG system.</li>
              <li>Deployed at least one model behind an API.</li>
              <li>Can explain trade-offs of prompting vs fine-tuning.</li>
            </ul>
            <h4>Final Learning Plan</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Pick one specialisation (CV, NLP, tabular, RL, MLOps).</li>
              <li>Ship two production-grade projects in that area.</li>
              <li>Write publicly about what worked and what did not.</li>
              <li>Contribute to one open-source ML project.</li>
            </ol>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>Milestone</strong> — A checkpoint that proves you can apply, not just read.</li>
              <li><strong>Skill tree</strong> — Dependency graph of topics; earlier topics unlock later ones.</li>
              <li><strong>Portfolio project</strong> — Shipped project with README, demo, and measurable results.</li>
              <li><strong>Track</strong> — A career path such as ML Engineer, MLOps, Applied Scientist.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="Can I learn AI in 3 months?">You can reach useful ML competence in 3 months of focused, project-based work. Depth in DL and GenAI usually needs 6–9 months.</FAQ>
            <FAQ q="Do I need a degree?">No. A portfolio + fundamentals + measurable impact beats a degree at most applied companies. Research roles favour a graduate degree.</FAQ>
            <FAQ q="How many hours per week?">10–15 hours consistent weekly beats 40-hour bursts followed by burnout.</FAQ>
          </Section>

          <References />
          <Disclaimer />
          <RelatedResources />
        </article>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" />{title}</h2>
      {children}
    </section>
  );
}
function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return <details className="not-prose my-2 rounded-xl border border-border/60 bg-card p-4"><summary className="cursor-pointer text-sm font-semibold">{q}</summary><div className="mt-2 text-sm text-muted-foreground">{children}</div></details>;
}
function Callout({ tone, title, icon, children }: { tone: "tip" | "info" | "note" | "warning" | "success"; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    tip: "border-amber-500/40 bg-amber-500/10",
    info: "border-sky-500/40 bg-sky-500/10",
    note: "border-violet-500/40 bg-violet-500/10",
    warning: "border-red-500/40 bg-red-500/10",
    success: "border-emerald-500/40 bg-emerald-500/10",
  };
  const defaultIcon: Record<string, React.ReactNode> = { tip: <Lightbulb className="h-5 w-5" />, info: <Info className="h-5 w-5" />, note: <Info className="h-5 w-5" />, warning: <Info className="h-5 w-5" />, success: <CheckCircle2 className="h-5 w-5" /> };
  return (
    <div className={`not-prose rounded-2xl border-l-4 ${styles[tone]} p-4`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon ?? defaultIcon[tone]}</div>
        <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><div className="mt-1 text-sm">{children}</div></div>
      </div>
    </div>
  );
}
function References() {
  return (
    <section id="references" className="scroll-mt-24 not-prose mt-8 rounded-2xl border border-border/60 bg-card p-6">
      <h3 className="text-lg font-semibold flex items-center gap-2"><Map className="h-5 w-5" /> References</h3>
      <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
        <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
        <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow</a></li>
        <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch</a></li>
        <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn</a></li>
        <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM AI</a></li>
        <li><a href="https://www.nvidia.com/en-us/ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI</a></li>
        <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face</a></li>
        <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
        <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Lab</a></li>
        <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">CMU School of Computer Science</a></li>
        <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
        <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
        <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — cs.AI</a></li>
        <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
        <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
        <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore</a></li>
      </ul>
    </section>
  );
}
function Disclaimer() {
  return (
    <section id="disclaimer" className="scroll-mt-24 not-prose mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
      <p className="font-semibold text-foreground">Disclaimer</p>
      <p className="mt-2">This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, and trusted educational resources. Artificial Intelligence is a rapidly evolving field, and technologies may change over time. Learners should consult official documentation for the latest and most accurate information.</p>
      <p className="mt-2">All trademarks, logos, product names, and intellectual property belong to their respective owners. EduNova AI does not claim ownership of any third-party materials referenced in this resource.</p>
    </section>
  );
}
function RelatedResources() {
  const items = [
    { title: "Artificial Intelligence — Frequently Asked Questions", tag: "AI & Data", time: "18 min", to: "/resources/read/ai-frequently-asked-questions" },
    { title: "Artificial Intelligence — Tips & Tricks", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-tips-tricks" },
    { title: "Artificial Intelligence — Step-by-Step Learning Guide", tag: "AI & Data", time: "24 min", to: "/resources/read/ai-step-by-step-learning-guide" },
    { title: "Artificial Intelligence — Best Practices", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-best-practices" },
    { title: "Artificial Intelligence — Project Guide", tag: "AI & Data", time: "22 min", to: "/resources/read/ai-project-guide" },
    { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" },
  ];
  return (
    <div className="no-print mt-16 not-prose">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue learning</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Related resources</h2>
        </div>
        <Link to="/resources" className="hidden text-sm font-medium text-primary hover:underline sm:inline">Browse library →</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r, i) => (
          <motion.a key={r.title} href={r.to} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }}
            className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"><BookOpen className="h-5 w-5" /></div>
            <p className="mt-3 text-sm font-semibold">{r.title}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-[10px]">{r.tag}</Badge>
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">Open resource <ArrowRight className="h-3 w-3" /></span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
