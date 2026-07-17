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
  Download,
  FileText,
  Heart,
  Info,
  Lightbulb,
  Printer,
  Share2,
  Sparkles,
  Tag,
  Dumbbell,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-sample-exercises")({
  head: () => {
    const title = "Artificial Intelligence — Sample Exercises | EduNova AI";
    const desc =
      "Warm-up, concept, and applied AI exercises: MCQs, fill-in-the-blanks, short answers, scenarios, matching, concept maps, and a 70-question self-check.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AISampleExercisesPage,
});

const RESOURCE = {
  id: "ai-sample-exercises",
  title: "Artificial Intelligence — Sample Exercises",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "23 min",
  pages: 19,
  lastUpdated: "January 2026",
  tags: ["Artificial Intelligence", "AI Fundamentals", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80",
  neural: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "fundamentals", label: "1. AI Fundamentals Review" },
  { id: "warmup", label: "2. Warm-up Exercises" },
  { id: "concept", label: "3. Concept Practice" },
  { id: "neural", label: "4. Neural Network Exercises" },
  { id: "workflow", label: "5. AI Workflow Problems" },
  { id: "scenarios", label: "6. Scenario-Based Questions" },
  { id: "mini", label: "7. Mini Challenges" },
  { id: "reflection", label: "8. Reflection Questions" },
  { id: "self-check", label: "9. Self Assessment" },
  { id: "final", label: "10. Final Review" },
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

function AISampleExercisesPage() {
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
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top < 140) current = item.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => {
    const shareData = {
      title: RESOURCE.title,
      text: "AI Sample Exercises on EduNova AI",
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

      {/* Sticky action bar */}
      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}>
              <Download className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}>
              <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}>
              <Share2 className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Share</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}>
              <Printer className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cover */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-violet-700/75 to-fuchsia-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Progressive Practice</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A structured collection of warm-up, concept-based, and applied AI exercises to reinforce
            fundamentals and build confidence before advancing to harder topics.
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
        {/* TOC */}
        <aside className="no-print hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Contents</p>
            <nav className="space-y-1 text-sm">
              {TOC.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className={`block rounded-md px-2 py-1.5 transition ${activeId === t.id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article ref={articleRef} className="print-article prose prose-slate max-w-none dark:prose-invert">
          <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
            <ul className="mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              <li>Strengthen AI fundamentals.</li>
              <li>Practice concept-based thinking.</li>
              <li>Improve analytical skills.</li>
              <li>Reinforce Neural Network basics.</li>
              <li>Apply AI concepts to real-world situations.</li>
              <li>Build confidence for advanced topics.</li>
            </ul>
          </Callout>

          {/* 1. Fundamentals Review */}
          <Section id="fundamentals" title="1. AI Fundamentals Review">
            <p>
              Before you begin, refresh the essentials. Artificial Intelligence is the field of building
              systems that <strong>perceive</strong>, <strong>reason</strong>, <strong>learn</strong>, and
              <strong> act</strong>. The three nested subsets are AI ⊃ Machine Learning ⊃ Deep Learning.
              Machine Learning discovers patterns from data; Deep Learning uses multi-layer neural networks
              trained by backpropagation.
            </p>
            <KeyBox>
              <strong>P-D-P-T-E-D-M</strong> — Problem, Data, Preprocess, Train, Evaluate, Deploy, Monitor.
            </KeyBox>
          </Section>

          {/* 2. Warm-up */}
          <Section id="warmup" title="2. Warm-up Exercises">
            <h4>Fill in the Blanks</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>AI systems that mimic human intelligence are called ____.</li>
              <li>The subset of AI that learns patterns from data is ____.</li>
              <li>A model that performs well on training data but poorly on unseen data is said to ____.</li>
              <li>The learning algorithm that adjusts weights using gradients is ____.</li>
              <li>Labeled training data is used in ____ learning.</li>
            </ol>
            <p className="text-sm text-muted-foreground"><strong>Answers:</strong> AI · Machine Learning · overfit · backpropagation · supervised.</p>

            <h4>True or False</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>All AI systems today are Artificial General Intelligence. <em>(False)</em></li>
              <li>Deep Learning is a subset of Machine Learning. <em>(True)</em></li>
              <li>Accuracy is always the best metric for imbalanced datasets. <em>(False)</em></li>
              <li>Neural networks always require GPUs. <em>(False)</em></li>
              <li>Reinforcement Learning uses rewards, not labels. <em>(True)</em></li>
            </ol>
          </Section>

          {/* 3. Concept Practice */}
          <Section id="concept" title="3. Concept Practice">
            <h4>Multiple Choice Questions (Sample)</h4>
            <MCQ
              q="Which is NOT a category of Machine Learning?"
              opts={["Supervised", "Unsupervised", "Reinforcement", "Deterministic"]}
              answer={3}
              why="ML is grouped as supervised, unsupervised, and reinforcement learning."
            />
            <MCQ
              q="Which technique reduces overfitting?"
              opts={["Increase model depth blindly", "Dropout / regularization", "Train only on one class", "Remove validation set"]}
              answer={1}
              why="Dropout and regularization curb over-reliance on specific weights."
            />
            <MCQ
              q="F1-score is preferred over accuracy when…"
              opts={["Classes are balanced", "You have a huge dataset", "Classes are imbalanced", "The model is a tree"]}
              answer={2}
              why="For imbalanced classes, accuracy is misleading; F1 balances precision and recall."
            />

            <h4 className="mt-6">Short Answer</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Define AI in one sentence.</li>
              <li>Explain the difference between AI, ML, and DL.</li>
              <li>What is a training epoch?</li>
              <li>Name three activation functions.</li>
              <li>What is a confusion matrix?</li>
            </ol>

            <h4 className="mt-6">Matching Exercise</h4>
            <div className="not-prose overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60">
                  <tr><th className="p-2 text-left">Term</th><th className="p-2 text-left">Definition</th></tr>
                </thead>
                <tbody>
                  {[
                    ["A. Overfitting", "1. Learning noise instead of the signal"],
                    ["B. Backprop", "2. Algorithm that updates weights via gradients"],
                    ["C. RAG", "3. Grounds LLM answers with retrieved documents"],
                    ["D. CNN", "4. Neural network for grid-like data (images)"],
                    ["E. Epoch", "5. One full pass over the training set"],
                  ].map(([a, b]) => (
                    <tr key={a} className="border-t border-border/50"><td className="p-2 font-medium">{a}</td><td className="p-2">{b}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">Answers: A-1, B-2, C-3, D-4, E-5.</p>

            <h4 className="mt-6">Concept Mapping</h4>
            <p>Draw a concept map connecting <em>AI</em> to at least eight related terms: ML, DL, NLP, CV, Robotics, GenAI, Data, Model, Training, Inference, Ethics.</p>
          </Section>

          {/* 4. Neural Network Exercises */}
          <Section id="neural" title="4. Neural Network Exercises">
            <figure className="not-prose my-4 overflow-hidden rounded-2xl border border-border/60">
              <img src={IMG.neural} alt="Neural network illustration" className="w-full" />
              <figcaption className="bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                Figure 1 — Layered neural network: input → hidden layers → output.
              </figcaption>
            </figure>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Sketch a 3-layer feedforward network with 4 inputs, 5 hidden neurons, and 2 outputs.</li>
              <li>For a neuron with inputs [1, 2] and weights [0.5, -0.3] and bias 0.1, compute the pre-activation.</li>
              <li>Given the sigmoid activation, compute σ(0.4).</li>
              <li>Explain why ReLU is preferred over sigmoid in deep hidden layers.</li>
              <li>Describe the four steps of one training iteration.</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              <strong>Sample solution (Q2):</strong> z = 1·0.5 + 2·(−0.3) + 0.1 = 0.0. <strong>(Q3):</strong> σ(0.4) ≈ 0.598.
              <strong>(Q5):</strong> Forward → Loss → Backprop → Update.
            </p>
          </Section>

          {/* 5. Workflow */}
          <Section id="workflow" title="5. AI Workflow Problems">
            <figure className="not-prose my-4 overflow-hidden rounded-2xl border border-border/60">
              <img src={IMG.workflow} alt="AI workflow diagram" className="w-full" />
              <figcaption className="bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                Figure 2 — Canonical AI workflow from problem to monitoring.
              </figcaption>
            </figure>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Arrange in order: Deploy, Preprocess, Train, Problem, Collect Data, Monitor, Evaluate.</li>
              <li>You get 90% accuracy but 5% recall on fraud. What went wrong?</li>
              <li>Your test set leaks into training. What is the risk and the fix?</li>
              <li>Why is monitoring needed after deployment?</li>
              <li>Name three preprocessing techniques for tabular data.</li>
            </ol>
          </Section>

          {/* 6. Scenarios */}
          <Section id="scenarios" title="6. Scenario-Based Questions">
            <Scenario title="Hospital Readmission Risk">
              A hospital wants to predict 30-day readmissions. Data is imbalanced (8% positive). Which metric,
              model, and validation approach do you choose, and why?
            </Scenario>
            <Scenario title="Retail Recommendations">
              An e-commerce team has 2 years of click and purchase logs. Design a first-cut recommender.
              What are the trade-offs of collaborative vs. content-based approaches?
            </Scenario>
            <Scenario title="Manufacturing Defects">
              A plant has 300 images of good parts, 20 of defective. Propose a training strategy, an
              augmentation plan, and a metric.
            </Scenario>
            <Scenario title="Support Chatbot">
              You must ground a customer-support LLM in company policy PDFs. Sketch a RAG pipeline and
              describe two failure modes.
            </Scenario>
            <Scenario title="Autonomous Delivery Robot">
              A robot must plan a path in a warehouse. Which family of algorithms fits — search, RL, or
              supervised learning? Justify.
            </Scenario>
          </Section>

          {/* 7. Mini Challenges */}
          <Section id="mini" title="7. Mini Challenges">
            <ol className="list-decimal space-y-1 pl-5">
              <li>Compute precision, recall, and F1 for TP=40, FP=10, FN=20.</li>
              <li>Design a train/val/test split for 10,000 rows with a rare class.</li>
              <li>Write a one-line prompt for summarizing a research abstract.</li>
              <li>Draft a data-collection plan for a plant-disease classifier.</li>
              <li>List five ethical risks in a facial-recognition rollout.</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              <strong>Sample solution (Q1):</strong> Precision = 40/(40+10) = 0.80; Recall = 40/(40+20) = 0.67;
              F1 = 2·(0.80·0.67)/(0.80+0.67) ≈ 0.73.
            </p>
          </Section>

          {/* 8. Reflection */}
          <Section id="reflection" title="8. Reflection Questions">
            <ol className="list-decimal space-y-1 pl-5">
              <li>Which concept surprised you the most this week?</li>
              <li>Where do you feel weakest, and what will you do about it?</li>
              <li>Which real-world application will you attempt first?</li>
              <li>How would you explain "overfitting" to a non-technical friend?</li>
              <li>What is one ethical guardrail you would apply to your next project?</li>
            </ol>
          </Section>

          {/* 9. Self Assessment */}
          <Section id="self-check" title="9. Self Assessment">
            <h4>40 MCQs · 20 Short Questions · 10 Scenario Questions</h4>
            <p>
              A comprehensive self-check spanning fundamentals, ML basics, neural networks, evaluation
              metrics, applications, and ethics. Use a timer of 45 minutes. Grade yourself against the key.
            </p>
            <Callout tone="tip" title="Practice Tips">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Attempt the MCQs first without notes, then check answers.</li>
                <li>Write short answers in your own words — do not memorize verbatim.</li>
                <li>For scenarios, list assumptions before proposing a solution.</li>
                <li>Track wrong answers in a "mistakes log" and revisit weekly.</li>
              </ul>
            </Callout>
            <Callout tone="warning" title="Common Mistakes">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Optimizing accuracy on imbalanced data.</li>
                <li>Ignoring data leakage between train and test sets.</li>
                <li>Using huge models when a baseline suffices.</li>
                <li>Skipping evaluation of subgroup fairness.</li>
              </ul>
            </Callout>
          </Section>

          {/* 10. Final Review */}
          <Section id="final" title="10. Final Review — Progress Checklist">
            <ul className="not-prose grid gap-2 sm:grid-cols-2">
              {[
                "I can define AI, ML, and DL with distinctions.",
                "I recognize supervised vs unsupervised vs RL.",
                "I can describe a neural network's layers.",
                "I know the training loop steps.",
                "I can pick a metric for imbalanced data.",
                "I can outline the AI workflow end-to-end.",
                "I can spot overfitting and propose fixes.",
                "I understand basic responsible-AI concerns.",
              ].map((c) => (
                <label key={c} className="flex cursor-pointer items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" />
                  <span>{c}</span>
                </label>
              ))}
            </ul>
          </Section>

          {/* Key Takeaways */}
          <div className="mt-8 rounded-2xl border-l-4 border-emerald-500/60 bg-emerald-500/10 p-6 not-prose">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="h-5 w-5" /> Key Takeaways
            </p>
            <ul className="mt-2 grid list-disc gap-y-1 pl-5 text-sm sm:grid-cols-2 sm:gap-x-8">
              <li>AI, ML, and DL are nested — pick the smallest scope that solves your problem.</li>
              <li>Data quality often matters more than model complexity.</li>
              <li>Prefer F1 or PR-AUC over accuracy on imbalanced tasks.</li>
              <li>Neural nets learn via forward → loss → backprop → update.</li>
              <li>Regularization and dropout combat overfitting.</li>
              <li>Ethics, fairness, and monitoring are project requirements, not optional.</li>
            </ul>
          </div>

          {/* Glossary */}
          <Section id="glossary" title="Glossary">
            <ul className="grid gap-2 sm:grid-cols-2 not-prose">
              {[
                ["Model", "A function that maps inputs to predictions after training."],
                ["Epoch", "One complete pass over the training dataset."],
                ["Loss", "A scalar measuring how wrong a model's prediction is."],
                ["Gradient", "Direction of steepest change of the loss with respect to weights."],
                ["Backprop", "Algorithm to compute gradients through a neural network."],
                ["Overfitting", "Learning noise instead of the signal."],
                ["Regularization", "Techniques (L2, dropout, early stopping) to reduce overfitting."],
                ["RAG", "Retrieval-Augmented Generation — grounds LLMs in external documents."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-lg border border-border/60 bg-card p-3 text-sm">
                  <span className="font-semibold">{t}</span> — {d}
                </li>
              ))}
            </ul>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="FAQ">
            <FAQ q="Do I need advanced math to start AI?">
              Basic algebra and probability are enough to begin. Deeper theory helps later, especially for
              research and optimization.
            </FAQ>
            <FAQ q="How long should I spend on these exercises?">
              Plan two to three focused sessions of about 45 minutes. Space them across a week for retention.
            </FAQ>
            <FAQ q="What should I do after finishing this set?">
              Move to the AI Practice Questions and the Project Guide to apply concepts to a real project.
            </FAQ>
          </Section>

          {/* References */}
          <References />

          {/* Disclaimer */}
          <Disclaimer />

          {/* Related */}
          <RelatedResources />
        </article>
      </div>
    </div>
  );
}

/* ---------------- Sub-components ---------------- */

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function KeyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-4 rounded-xl border-l-4 border-primary/70 bg-primary/5 p-4 text-sm">
      {children}
    </div>
  );
}

function MCQ({ q, opts, answer, why }: { q: string; opts: string[]; answer: number; why: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="not-prose my-4 rounded-2xl border border-border/60 bg-card p-4">
      <p className="text-sm font-semibold">{q}</p>
      <div className="mt-2 grid gap-1.5">
        {opts.map((o, i) => {
          const state = picked === null ? "" : i === answer ? "border-emerald-500/60 bg-emerald-500/10" : picked === i ? "border-red-500/60 bg-red-500/10" : "";
          return (
            <button
              key={o}
              onClick={() => setPicked(i)}
              className={`rounded-lg border border-border/60 px-3 py-1.5 text-left text-sm transition hover:border-primary/40 ${state}`}
            >
              {String.fromCharCode(65 + i)}. {o}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <p className="mt-2 text-xs text-muted-foreground"><strong>Why:</strong> {why}</p>
      )}
    </div>
  );
}

function Scenario({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="not-prose my-3 rounded-2xl border border-border/60 bg-card p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="not-prose my-2 rounded-xl border border-border/60 bg-card p-4">
      <summary className="cursor-pointer text-sm font-semibold">{q}</summary>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}

function Callout({
  tone, title, icon, children,
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
    warning: <Info className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
  };
  return (
    <div className={`not-prose rounded-2xl border-l-4 ${styles[tone]} p-4`}>
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

function References() {
  return (
    <section id="references" className="scroll-mt-24 not-prose mt-8 rounded-2xl border border-border/60 bg-card p-6">
      <h3 className="text-lg font-semibold">References</h3>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Official Documentation</p>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
        <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
        <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow</a></li>
        <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch</a></li>
        <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn — AI</a></li>
        <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM AI</a></li>
        <li><a href="https://www.nvidia.com/en-us/ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI</a></li>
        <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face</a></li>
      </ul>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Academic Resources</p>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
        <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Laboratory</a></li>
        <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Carnegie Mellon University — SCS</a></li>
        <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
        <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
      </ul>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Research</p>
      <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — AI</a></li>
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
      <p className="mt-2">
        This resource is provided for educational purposes only. The exercises and explanations have been
        compiled from official documentation, research papers, academic publications, and trusted
        educational resources. Artificial Intelligence is a rapidly evolving field, and learners should
        always consult official documentation for the latest information.
      </p>
      <p className="mt-2">
        All trademarks, logos, product names, and intellectual property belong to their respective owners.
        EduNova AI does not claim ownership of any third-party materials referenced in this resource.
      </p>
    </section>
  );
}

function RelatedResources() {
  const items = [
    { title: "Artificial Intelligence — Practice Questions", tag: "AI & Data", time: "29 min", to: "/resources/read/ai-practice-questions" },
    { title: "Artificial Intelligence — Answer Key", tag: "AI & Data", time: "24 min", to: "/resources/read/ai-answer-key" },
    { title: "Artificial Intelligence — Project Guide", tag: "AI & Data", time: "25 min", to: "/resources/read/ai-project-guide" },
    { title: "Artificial Intelligence — Project Case Study", tag: "AI & Data", time: "28 min", to: "/resources/read/ai-project-case-study" },
    { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" },
    { title: "Artificial Intelligence — Cheat Sheet", tag: "AI & Data", time: "3 min", to: "/resources/read/ai-cheat-sheet" },
  ];
  return (
    <div className="no-print mt-16 not-prose">
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
        {items.map((r, i) => (
          <motion.a
            key={r.title}
            href={r.to}
            target="_blank"
            rel="noopener noreferrer"
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
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Open resource <ArrowRight className="h-3 w-3" />
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
