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
  CalendarDays,
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
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-step-by-step-learning-guide")({
  head: () => {
    const title = "Artificial Intelligence — Step-by-Step Learning Guide | EduNova AI";
    const desc =
      "A structured 4-week beginner learning plan for Artificial Intelligence with weekly objectives, exercises, self-checks, and a career roadmap.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIStepByStepPage,
});

const RESOURCE = {
  id: "ai-step-by-step-learning-guide",
  title: "Artificial Intelligence — Step-by-Step Learning Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "26 min",
  pages: 30,
  lastUpdated: "February 2026",
  tags: ["Artificial Intelligence", "AI Fundamentals", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1800&q=80",
  roadmap: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
  timeline: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  ecosystem: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  workflow: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
  neural: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  applications: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80",
  progress: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1400&q=80",
};

type TocItem = { id: string; label: string };
const TOC: TocItem[] = [
  { id: "overview", label: "Overview & How to Use This Guide" },
  { id: "roadmap", label: "Your 4-Week Learning Roadmap" },
  { id: "week1", label: "Week 1 — AI Foundations" },
  { id: "week2", label: "Week 2 — Machine Learning & Data" },
  { id: "week3", label: "Week 3 — Neural Networks & Deep Learning" },
  { id: "week4", label: "Week 4 — Real-World AI & Mini Project" },
  { id: "faqs", label: "FAQs" },
  { id: "checklist", label: "Final Revision Checklist" },
  { id: "career", label: "Career Roadmap & Next Steps" },
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
    } catch {
      /* empty */
    }
  }, [key, id]);
  const toggle = () => {
    try {
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      window.localStorage.setItem(key, JSON.stringify(next));
      setOn(next.includes(id));
    } catch {
      /* empty */
    }
  };
  return [on, toggle] as const;
}

function AIStepByStepPage() {
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
      text: "Follow this 4-week AI learning plan on EduNova AI",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      /* cancelled */
    }
  };
  const download = () => {
    toast.info("Preparing print-ready PDF…");
    setTimeout(() => window.print(), 300);
  };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("overview");
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
        <div
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Sticky action bar */}
      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                {progress}% read · {RESOURCE.readingTime}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" className="shrink-0" onClick={scrollToArticle}>
              <BookOpen className="mr-1.5 h-4 w-4" /> Read Online
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}>
              <Download className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={toggleBookmark}
              aria-pressed={bookmarked}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            >
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={toggleSaved}
              aria-pressed={saved}
              aria-label={saved ? "Unsave" : "Save for later"}
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share} aria-label="Share">
              <Share2 className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Share</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print} aria-label="Print">
              <Printer className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cover banner */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="AI step-by-step learning cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/85 via-emerald-600/80 to-lime-600/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link
            to="/resources"
            className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">4-Week Plan</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {RESOURCE.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A structured, week-by-week plan that takes you from zero to AI-confident. Each week
            includes learning goals, exercises, self-checks, and revision tasks.
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

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* TOC */}
          <aside className="no-print lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ListChecks className="h-4 w-4 text-primary" /> On this page
              </p>
              <ol className="mt-3 space-y-1 text-sm">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(item.id)}
                      className={`group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition ${
                        activeId === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0 text-[10px] font-mono opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
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

          {/* Article */}
          <article
            ref={articleRef}
            className="print-article mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base"
          >
            <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Understand Artificial Intelligence fundamentals.</li>
                <li>Learn the AI development workflow.</li>
                <li>Understand Machine Learning basics.</li>
                <li>Understand Neural Networks.</li>
                <li>Apply AI concepts through practical exercises.</li>
                <li>Build confidence before moving to intermediate AI topics.</li>
                <li>Create a personalized AI learning roadmap.</li>
              </ul>
            </Callout>

            <Section id="overview" title="Overview & How to Use This Guide">
              <p>
                This is a self-paced 4-week guide. Each week is designed for around 4–6 focused hours,
                split into short reading, hands-on exercises, and a weekly self-check. Consistency
                beats intensity — 45 minutes a day for four weeks will take you further than a single
                marathon weekend.
              </p>
              <Figure src={IMG.hero} caption="A calm, structured path from AI curiosity to AI confidence." />
              <Callout tone="tip" title="How to use each week">
                <ol className="mt-1 list-decimal space-y-1 pl-5">
                  <li>Read the week's core concepts.</li>
                  <li>Do the practical exercise.</li>
                  <li>Complete the self-check questions.</li>
                  <li>Do the mini revision task before moving on.</li>
                </ol>
              </Callout>
            </Section>

            <Section id="roadmap" title="Your 4-Week Learning Roadmap">
              <Figure src={IMG.roadmap} caption="Weekly milestones: foundations → ML & data → neural networks → real-world AI." />
              <div className="grid gap-3 sm:grid-cols-2">
                <MilestoneCard week={1} title="AI Foundations" body="What AI is, its history, and its types. Set your learning goals." />
                <MilestoneCard week={2} title="Machine Learning & Data" body="ML fundamentals, the AI/ML/DL relationship, and data basics." />
                <MilestoneCard week={3} title="Neural Networks & Deep Learning" body="How neural networks learn. Explore modern AI tools." />
                <MilestoneCard week={4} title="Real-world AI & Mini Project" body="Applications, a small hands-on build, revision, and career roadmap." />
              </div>
            </Section>

            {/* WEEK 1 */}
            <WeekSection id="week1" week={1} title="AI Foundations">
              <SubHeading><CalendarDays className="h-4 w-4 text-primary" /> Weekly Goals</SubHeading>
              <ul className="list-disc space-y-1 pl-5">
                <li>Explain AI in plain language.</li>
                <li>List key events in AI history.</li>
                <li>Distinguish Narrow, General, and Super AI.</li>
                <li>Write your own learning goals.</li>
              </ul>

              <SubHeading>Core Concepts</SubHeading>
              <p>
                Artificial Intelligence is the field of building systems that perform tasks needing
                human-like intelligence — recognizing speech, understanding text, making decisions,
                or predicting outcomes. Today's AI is <strong>Narrow AI</strong>: extremely capable
                at specific tasks, not conscious or general.
              </p>

              <Figure src={IMG.timeline} caption="A quick AI timeline: symbolic AI (1950s) → ML (1990s) → deep learning (2010s) → generative AI (2020s)." />

              <SubHeading>Types of AI</SubHeading>
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="Narrow AI" body="Focused on a single task (email spam, translation)." />
                <InfoCard title="General AI" body="Hypothetical human-level intelligence across any task." />
                <InfoCard title="Super AI" body="Speculative intelligence beyond human ability." />
              </div>

              <Callout tone="tip" title="Tip">Don't try to master everything — this week is about vocabulary and orientation.</Callout>

              <SubHeading>Practical Exercise</SubHeading>
              <ExerciseCard
                title="Spot AI in your day"
                body="Make a list of five AI features you interacted with today (search, camera, keyboard, maps, music). For each, guess what task the AI is solving."
              />

              <SubHeading>Self Assessment</SubHeading>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Define AI in one sentence.</li>
                <li>Name one milestone from AI history.</li>
                <li>Give one example of Narrow AI.</li>
                <li>Write two personal learning goals for this guide.</li>
              </ol>

              <KeyTakeaway>
                AI is a broad field. Modern AI learns patterns from data. All AI today is narrow — powerful, but specialized.
              </KeyTakeaway>
            </WeekSection>

            {/* WEEK 2 */}
            <WeekSection id="week2" week={2} title="Machine Learning & Data">
              <SubHeading><CalendarDays className="h-4 w-4 text-primary" /> Weekly Goals</SubHeading>
              <ul className="list-disc space-y-1 pl-5">
                <li>Explain the difference between AI, ML, and DL.</li>
                <li>Describe supervised, unsupervised, and reinforcement learning.</li>
                <li>Understand why data quality matters.</li>
              </ul>

              <SubHeading>AI vs ML vs DL</SubHeading>
              <Figure src={IMG.ecosystem} caption="AI ⊃ ML ⊃ DL. Deep learning is a subset of machine learning, which is a subset of AI." />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>AI</strong> — any technique that mimics intelligent behavior.</li>
                <li><strong>ML</strong> — systems that learn from data instead of hand-written rules.</li>
                <li><strong>DL</strong> — ML using deep neural networks.</li>
              </ul>

              <SubHeading>Machine Learning Workflow</SubHeading>
              <Figure src={IMG.workflow} caption="Collect → Clean → Train → Evaluate → Deploy → Monitor." />

              <SubHeading>Data Basics</SubHeading>
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="Structured" body="Tables, spreadsheets, databases." />
                <InfoCard title="Unstructured" body="Text, images, audio, video." />
                <InfoCard title="Semi-structured" body="JSON, logs, XML." />
              </div>
              <Callout tone="warning" title="Common mistake">Chasing fancy models before checking data quality. Clean data first.</Callout>

              <SubHeading>Practical Exercise</SubHeading>
              <CodeBlock
                language="python"
                code={`# A tiny supervised-learning example
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2)

model = LogisticRegression(max_iter=200).fit(X_tr, y_tr)
print("Accuracy:", model.score(X_te, y_te))`}
              />

              <SubHeading>Weekly Quiz</SubHeading>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Which is broader: AI, ML, or DL?</li>
                <li>Give an example of supervised learning.</li>
                <li>Why do we split data into train and test sets?</li>
                <li>Name one risk of dirty data.</li>
              </ol>

              <KeyTakeaway>
                ML learns patterns from examples. Better data almost always beats a fancier model.
              </KeyTakeaway>
            </WeekSection>

            {/* WEEK 3 */}
            <WeekSection id="week3" week={3} title="Neural Networks & Deep Learning">
              <SubHeading><CalendarDays className="h-4 w-4 text-primary" /> Weekly Goals</SubHeading>
              <ul className="list-disc space-y-1 pl-5">
                <li>Understand what a neural network is.</li>
                <li>Describe forward pass and backpropagation.</li>
                <li>Know when deep learning is (and isn't) the right tool.</li>
              </ul>

              <SubHeading>Neural Networks</SubHeading>
              <Figure src={IMG.neural} caption="Input → hidden layers → output. Each connection carries a learnable weight." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Forward pass — compute a prediction.</li>
                <li>Loss — compare prediction with truth.</li>
                <li>Backpropagation — send the error back to update weights.</li>
                <li>Repeat over many examples until the network converges.</li>
              </ol>

              <SubHeading>Deep Learning Basics</SubHeading>
              <p>
                Deep learning stacks many neural layers to learn hierarchical features — pixels →
                edges → shapes → objects. It powers computer vision, speech, translation, and modern
                language models.
              </p>
              <Callout tone="warning" title="When not to use DL">
                On small tabular problems, classic ML (logistic regression, gradient boosting) often
                beats deep learning with far less data and compute.
              </Callout>

              <SubHeading>AI Tools You Should Recognize</SubHeading>
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="PyTorch" body="Research-friendly deep learning framework." />
                <InfoCard title="TensorFlow / Keras" body="Production-ready DL, mobile & edge deployment." />
                <InfoCard title="scikit-learn" body="Classic ML for tabular data." />
                <InfoCard title="Hugging Face" body="Pretrained models, datasets, and pipelines." />
                <InfoCard title="Kaggle" body="Datasets, notebooks, competitions." />
                <InfoCard title="Colab" body="Free GPU/CPU notebooks in the browser." />
              </div>

              <SubHeading>Hands-on Activity</SubHeading>
              <ExerciseCard
                title="Sketch a neural network"
                body="On paper, draw a network with 3 inputs, one hidden layer of 4 neurons, and 1 output. Label the weights on 4 arbitrary connections. Explain (in your own words) how a change in one weight might change the output."
              />

              <KeyTakeaway>
                A neural network is a stack of tiny math units that learns by nudging weights until predictions match reality.
              </KeyTakeaway>
            </WeekSection>

            {/* WEEK 4 */}
            <WeekSection id="week4" week={4} title="Real-World AI & Mini Project">
              <SubHeading><CalendarDays className="h-4 w-4 text-primary" /> Weekly Goals</SubHeading>
              <ul className="list-disc space-y-1 pl-5">
                <li>Map AI to real industries.</li>
                <li>Build a small AI project end-to-end.</li>
                <li>Consolidate everything with revision and reflection.</li>
              </ul>

              <SubHeading>Real-world AI Applications</SubHeading>
              <Figure src={IMG.applications} caption="AI is embedded in products across every industry." />
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Healthcare" body="Imaging, triage, drug discovery." />
                <InfoCard title="Finance" body="Fraud detection, credit scoring, forecasting." />
                <InfoCard title="Education" body="Adaptive learning, tutoring, grading assistance." />
                <InfoCard title="Retail" body="Recommendations, demand forecasting, pricing." />
                <InfoCard title="Mobility" body="Route planning, driver assistance, logistics." />
                <InfoCard title="Creative" body="Image, video, music, and writing generation." />
              </div>

              <SubHeading>Mini AI Project — Sentiment Classifier</SubHeading>
              <CodeBlock
                language="python"
                code={`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

texts = ["I loved this movie", "boring and slow", "great acting", "not my taste"]
labels = [1, 0, 1, 0]

pipe = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("clf", LogisticRegression()),
])
pipe.fit(texts, labels)
print(pipe.predict(["what a wonderful film"]))`}
              />
              <p className="text-sm text-muted-foreground">
                Extend it: swap in a real dataset (IMDB), try a transformer, and build a small web UI.
              </p>

              <SubHeading>Revision</SubHeading>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Re-read Week 1's summary — can you still explain "Narrow AI"?</li>
                <li>Re-run Week 2's iris code — change the model and compare accuracy.</li>
                <li>Draw Week 3's neural network from memory.</li>
              </ol>

              <SubHeading>Final Assessment</SubHeading>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Explain AI, ML, and DL in one sentence each.</li>
                <li>Describe the ML workflow in your own words.</li>
                <li>What does backpropagation do?</li>
                <li>Give one AI application per industry above.</li>
                <li>Which topic do you want to go deeper on next?</li>
              </ol>

              <KeyTakeaway>
                You've completed the loop: concepts → data → models → applications. You're ready for intermediate AI.
              </KeyTakeaway>
            </WeekSection>

            {/* FAQs */}
            <Section id="faqs" title="FAQs">
              <FAQ q="How much math do I need before starting?">
                None to start. High-school algebra is enough to grasp the intuition; calculus and
                linear algebra become useful once you build models from scratch.
              </FAQ>
              <FAQ q="Which programming language should I learn?">
                Python — it has the richest AI ecosystem (NumPy, pandas, scikit-learn, PyTorch, TensorFlow).
              </FAQ>
              <FAQ q="What if I fall behind the weekly schedule?">
                Perfectly fine. Slow, consistent progress wins. Repeat a week if you need to.
              </FAQ>
              <FAQ q="Do I need a powerful computer?">
                No. Google Colab and Kaggle give you free notebooks with GPU access.
              </FAQ>
            </Section>

            {/* Final revision checklist */}
            <Section id="checklist" title="Final Revision Checklist">
              <Figure src={IMG.progress} caption="Tick each item once you can explain it without notes." />
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "I can define AI, ML, and DL.",
                  "I know the difference between Narrow, General, and Super AI.",
                  "I can list 3 supervised learning examples.",
                  "I can describe supervised vs unsupervised vs reinforcement learning.",
                  "I can sketch a small neural network and explain forward pass + backprop.",
                  "I can name at least 3 AI frameworks.",
                  "I can describe the ML project workflow.",
                  "I completed the sentiment mini project.",
                  "I have written my personal AI learning goals.",
                  "I have chosen my next topic to explore.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 rounded-xl border border-border/60 bg-card p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Career roadmap */}
            <Section id="career" title="Career Roadmap & Next Steps">
              <Figure src={IMG.roadmap} caption="From beginner to AI practitioner — a suggested progression." />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Learn Python fundamentals and Git.</li>
                <li>Master ML basics with scikit-learn.</li>
                <li>Learn deep learning with PyTorch or TensorFlow.</li>
                <li>Specialize: Computer Vision, NLP, LLMs, or MLOps.</li>
                <li>Build a portfolio of 3–5 public projects.</li>
                <li>Contribute to open-source and share notes publicly.</li>
              </ol>
              <Callout tone="success" title="You made it" icon={<CheckCircle2 className="h-5 w-5" />}>
                Finishing a structured plan is a real milestone. Bookmark this page, celebrate, and pick your next resource below.
              </Callout>
            </Section>

            {/* References */}
            <div className="mt-12 rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-lg font-semibold">References</h3>
              <p className="mt-1 text-sm text-muted-foreground">Trusted and official educational sources.</p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Official Documentation</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
                <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
                <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow Documentation</a></li>
                <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch Documentation</a></li>
                <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn — AI</a></li>
                <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM Artificial Intelligence</a></li>
                <li><a href="https://developer.nvidia.com/ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI Developer</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Academic Resources</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
                <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford Artificial Intelligence Laboratory</a></li>
                <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Carnegie Mellon School of Computer Science</a></li>
                <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Research & Standards</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — Computer Science (AI)</a></li>
                <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
                <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
                <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore Digital Library</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Additional Learning</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
                <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face Documentation</a></li>
                <li><a href="https://www.coursera.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Coursera AI Courses</a></li>
                <li><a href="https://www.edx.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">edX Computer Science & AI</a></li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Disclaimer</p>
              <p className="mt-2">
                This educational resource has been created for learning and educational purposes only.
                The content is compiled, summarized, and organized using publicly available educational
                materials, official documentation, academic publications, research papers, and trusted
                industry resources. Every effort has been made to ensure the accuracy and relevance of
                the information; however, Artificial Intelligence is a rapidly evolving field, and some
                concepts, tools, or technologies may change over time.
              </p>
              <p className="mt-2">
                All trademarks, product names, logos, and intellectual property belong to their
                respective owners. EduNova AI does not claim ownership of any third-party materials
                referenced within this resource. Learners are strongly encouraged to consult the
                official documentation and references listed above for the latest, most accurate, and
                comprehensive information.
              </p>
            </div>
          </article>
        </div>

        {/* Related resources */}
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
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
              { title: "Neural Networks Explained", tag: "AI & Data", time: "16 min" },
              { title: "Python for AI", tag: "Programming", time: "12 min" },
              { title: "AI Ethics", tag: "AI & Society", time: "9 min" },
              { title: "Prompt Engineering Basics", tag: "Generative AI", time: "10 min" },
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
      </div>
    </div>
  );
}

/* ------------------------- Sub-components ------------------------- */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-10">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-foreground/90">{children}</div>
    </section>
  );
}

function WeekSection({
  id,
  week,
  title,
  children,
}: {
  id: string;
  week: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-12">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
          <span className="text-sm font-bold">W{week}</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Week {week}</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        </div>
      </div>
      <div className="mt-5 space-y-4 text-foreground/90">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 flex items-center gap-2 text-lg font-semibold">
      {children}
    </h3>
  );
}

function Figure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
      <img src={src} alt={caption} className="h-auto w-full object-cover" loading="lazy" />
      <figcaption className="border-t border-border/60 bg-background/60 px-4 py-2 text-xs text-muted-foreground">
        {caption}
      </figcaption>
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

function MilestoneCard({ week, title, body }: { week: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-semibold text-primary">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10">{week}</span>
        Week {week}
      </div>
      <p className="mt-2 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function ExerciseCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Sparkles className="h-4 w-4 text-primary" />
        {title}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100">
        <CheckCircle2 className="h-4 w-4" /> Key takeaway
      </p>
      <p className="mt-1 text-sm text-emerald-900/90 dark:text-emerald-100/90">{children}</p>
    </div>
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
    warning: <AlertTriangle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
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
        <span>{language ?? "code"}</span>
        <span>example</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group my-2 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
        <span>{q}</span>
        <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
      </summary>
      <div className="mt-3 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}
