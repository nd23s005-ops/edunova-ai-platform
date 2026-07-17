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
  Brain,
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
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-beginner-guide")({
  head: () => {
    const title = "Artificial Intelligence — Beginner Guide | EduNova AI";
    const desc =
      "A premium beginner-friendly guide to Artificial Intelligence: core concepts, machine learning, neural networks, real-world applications, exercises, and FAQs.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIBeginnerGuidePage,
});

const RESOURCE = {
  id: "ai-beginner-guide",
  title: "Artificial Intelligence — Beginner Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 23,
  lastUpdated: "March 2026",
  tags: [
    "Artificial Intelligence",
    "AI",
    "Machine Learning",
    "Neural Networks",
    "Beginner",
  ],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  ecosystem:
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
  neural:
    "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  workflow:
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80",
  timeline:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  applications:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80",
  dataMlDl:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
};

const TOC = [
  { id: "introduction", label: "Introduction to Artificial Intelligence" },
  { id: "history", label: "History of AI" },
  { id: "types", label: "Types of AI" },
  { id: "ml", label: "Machine Learning Basics" },
  { id: "dl", label: "Deep Learning" },
  { id: "neural", label: "Neural Networks" },
  { id: "applications", label: "Real-world Applications" },
  { id: "examples", label: "Practical Examples" },
  { id: "best-practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "exercises", label: "Hands-on Exercises" },
  { id: "faqs", label: "FAQs" },
  { id: "summary", label: "Summary" },
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

function AIBeginnerGuidePage() {
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
      text: "Read this beginner-friendly AI guide on EduNova AI",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else {
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

  const scrollToArticle = () => jumpTo("introduction");

  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-article { padding: 0 !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* Reading progress bar */}
      <div
        className="no-print fixed left-0 right-0 top-0 z-50 h-1 bg-transparent"
        aria-hidden
      >
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
              <Brain className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">
                {readingTitle}
              </p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                {progress}% read · {RESOURCE.readingTime}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button
              size="sm"
              className="shrink-0"
              onClick={scrollToArticle}
              aria-label="Read now"
            >
              <BookOpen className="mr-1.5 h-4 w-4" /> Read Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={download}
              aria-label="Download PDF"
            >
              <Download className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={toggleBookmark}
              aria-pressed={bookmarked}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark this resource"}
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span className="ml-1.5 hidden sm:inline">
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={toggleSaved}
              aria-pressed={saved}
              aria-label={saved ? "Unsave" : "Save for later"}
            >
              <Heart
                className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="ml-1.5 hidden sm:inline">
                {saved ? "Saved" : "Save"}
              </span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={share}
              aria-label="Share resource"
            >
              <Share2 className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Share</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={print}
              aria-label="Print resource"
            >
              <Printer className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cover banner */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img
          src={IMG.hero}
          alt="Abstract AI neural network visualization"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-600/85 via-purple-600/80 to-fuchsia-600/85 mix-blend-multiply"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link
            to="/resources"
            className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"
          >
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">
              {RESOURCE.category}
            </Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">
              {RESOURCE.difficulty}
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {RESOURCE.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A gentle, structured introduction to Artificial Intelligence — from
            what AI actually is, to how machines learn, to where you'll meet it
            in daily life.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {RESOURCE.readingTime} read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> {RESOURCE.pages} pages
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> Updated {RESOURCE.lastUpdated}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {RESOURCE.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur"
              >
                <Tag className="h-3 w-3" /> {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
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
                  <div
                    className="h-full bg-primary transition-[width]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-1.5 text-muted-foreground">{progress}% complete</p>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article
            ref={articleRef}
            className="print-article prose-reader mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base"
          >
            {/* Learning objectives */}
            <Callout
              tone="info"
              icon={<Lightbulb className="h-5 w-5" />}
              title="Learning Objectives"
            >
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Explain what Artificial Intelligence is in plain language.</li>
                <li>Distinguish between AI, Machine Learning, and Deep Learning.</li>
                <li>Describe how a neural network learns from data.</li>
                <li>Identify AI use cases in everyday products.</li>
                <li>Recognize common pitfalls when starting out with AI.</li>
              </ul>
            </Callout>

            <Section id="introduction" title="1. Introduction to Artificial Intelligence">
              <p>
                Artificial Intelligence (AI) is the field of building computer
                systems that can perform tasks which normally require human
                intelligence — such as understanding language, recognizing
                images, making predictions, or planning actions. Modern AI does
                not mean a conscious robot; it means a program that learns
                patterns from data and uses those patterns to make decisions.
              </p>
              <Figure
                src={IMG.hero}
                caption="AI is a broad umbrella covering perception, reasoning, learning, and interaction."
              />
              <p>
                In this guide we will demystify the vocabulary, walk through the
                core ideas step by step, and connect them to products you use
                every day — from search and recommendations to voice assistants
                and self-driving features.
              </p>
              <Callout tone="tip" title="Tip">
                Don't try to memorize every term on the first pass. Skim, then
                come back — most AI concepts click faster the second time.
              </Callout>
            </Section>

            <Section id="history" title="2. History of AI">
              <p>
                AI as a research field was founded in the 1950s. Its journey
                includes bright summers of optimism and long "AI winters" where
                progress stalled.
              </p>
              <Figure
                src={IMG.timeline}
                caption="A compressed timeline: from symbolic AI (1950s) to deep learning (2010s) to generative AI (2020s)."
              />
              <ul className="list-disc space-y-1 pl-5">
                <li><strong>1950</strong> — Turing proposes the "imitation game" (Turing Test).</li>
                <li><strong>1956</strong> — The Dartmouth Workshop coins "Artificial Intelligence".</li>
                <li><strong>1997</strong> — IBM Deep Blue beats world chess champion Kasparov.</li>
                <li><strong>2012</strong> — Deep learning breaks image recognition (AlexNet).</li>
                <li><strong>2017</strong> — The Transformer architecture is published.</li>
                <li><strong>2022+</strong> — Generative AI enters the mainstream.</li>
              </ul>
            </Section>

            <Section id="types" title="3. Types of AI">
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard
                  title="Narrow AI"
                  body="Solves one task well: spam filters, translators, chess engines. This is what exists today."
                />
                <InfoCard
                  title="General AI (AGI)"
                  body="A hypothetical system that can learn any intellectual task a human can. Not yet achieved."
                />
                <InfoCard
                  title="Super AI"
                  body="A theoretical intelligence beyond humans across all domains. Speculative."
                />
              </div>
              <Callout
                tone="note"
                title="Note"
                icon={<Info className="h-5 w-5" />}
              >
                Every product you use today — ChatGPT included — is Narrow AI.
                It's extremely capable in language tasks, but still specialized.
              </Callout>
            </Section>

            <Section id="ml" title="4. Machine Learning Basics">
              <p>
                Machine Learning (ML) is a subset of AI where a model learns
                patterns directly from data instead of following hand-written
                rules.
              </p>
              <Figure
                src={IMG.workflow}
                caption="A typical ML workflow: collect data → clean → train → evaluate → deploy → monitor."
              />
              <div className="grid gap-3 sm:grid-cols-3">
                <InfoCard title="Supervised" body="Learn from labeled examples (input → correct output). Ex: spam detection." />
                <InfoCard title="Unsupervised" body="Find structure without labels. Ex: customer segmentation." />
                <InfoCard title="Reinforcement" body="Learn from rewards through trial and error. Ex: game-playing agents." />
              </div>
              <CodeBlock
                language="python"
                code={`from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print("Accuracy:", model.score(X_test, y_test))`}
              />
            </Section>

            <Section id="dl" title="5. Deep Learning">
              <p>
                Deep Learning is a subset of ML that uses <em>neural networks
                with many layers</em>. It powers image recognition, speech, and
                large language models.
              </p>
              <Figure
                src={IMG.dataMlDl}
                caption="Data → Machine Learning → Deep Learning: nested subsets, each more specialized."
              />
              <Callout
                tone="warning"
                icon={<AlertTriangle className="h-5 w-5" />}
                title="Warning"
              >
                Deep learning is powerful but data-hungry and compute-hungry.
                For small tabular problems, classic ML often wins.
              </Callout>
            </Section>

            <Section id="neural" title="6. Neural Networks">
              <p>
                A neural network is made of tiny math units called{" "}
                <strong>neurons</strong>, arranged in layers. Each connection
                has a <strong>weight</strong> that the network adjusts during
                training to reduce error.
              </p>
              <Figure
                src={IMG.neural}
                caption="Input layer → hidden layers → output layer. Each arrow carries a weight."
              />
              <ol className="list-decimal space-y-1 pl-5">
                <li>Feed an input through the network (forward pass).</li>
                <li>Compare the output to the correct answer (loss).</li>
                <li>Send the error backwards to update weights (backpropagation).</li>
                <li>Repeat over many examples until the network converges.</li>
              </ol>
            </Section>

            <Section id="applications" title="7. Real-world Applications">
              <Figure
                src={IMG.applications}
                caption="AI is embedded in products you already use — often invisibly."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard title="Healthcare" body="Medical imaging, triage, drug discovery." />
                <InfoCard title="Finance" body="Fraud detection, credit scoring, algorithmic trading." />
                <InfoCard title="Retail" body="Recommendations, demand forecasting, dynamic pricing." />
                <InfoCard title="Mobility" body="Route planning, driver assistance, logistics." />
                <InfoCard title="Education" body="Adaptive learning, tutoring, grading assistance." />
                <InfoCard title="Creative" body="Image generation, writing, music, design tools." />
              </div>
            </Section>

            <Section id="examples" title="8. Practical Examples">
              <Figure
                src={IMG.ecosystem}
                caption="A modern AI ecosystem: data, models, tools, and applications."
              />
              <p>Small examples you can try today:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Ask an LLM to summarize a paragraph — notice what it gets right and wrong.</li>
                <li>Use a spreadsheet's "auto-fill" — that's a tiny ML pattern-finder.</li>
                <li>Photograph a plant with a plant-ID app — image classification in action.</li>
              </ul>
            </Section>

            <Section id="best-practices" title="9. Best Practices">
              <ul className="list-disc space-y-1 pl-5">
                <li>Start with a clear problem and a simple baseline before reaching for deep learning.</li>
                <li>Care about your data quality more than your model choice.</li>
                <li>Split data into train/validation/test — never peek at test data.</li>
                <li>Measure with metrics your users actually care about.</li>
                <li>Design for human-in-the-loop when stakes are high.</li>
              </ul>
            </Section>

            <Section id="mistakes" title="10. Common Mistakes">
              <Callout tone="warning" title="Watch out for these">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Treating AI outputs as facts instead of predictions.</li>
                  <li>Training on data that doesn't match the real world.</li>
                  <li>Ignoring bias in datasets and labels.</li>
                  <li>Optimizing accuracy while ignoring fairness and safety.</li>
                  <li>Deploying without monitoring — models drift over time.</li>
                </ul>
              </Callout>
            </Section>

            <Section id="exercises" title="11. Hands-on Exercises">
              <div className="space-y-3">
                <Exercise
                  n={1}
                  title="Classify AI vs ML vs DL"
                  body="For each product you use today (email, maps, camera, music app), guess whether it's rule-based, classic ML, or deep learning."
                />
                <Exercise
                  n={2}
                  title="Spot the training data"
                  body="Pick one AI feature and describe what data must have been collected to train it."
                />
                <Exercise
                  n={3}
                  title="Prompt experiment"
                  body="Give an LLM the same question three times with different wordings. Compare the answers."
                />
              </div>
            </Section>

            <Section id="faqs" title="12. FAQs">
              <FAQ q="Do I need advanced math to start?">
                No. High-school algebra is enough to grasp the intuition. You
                only need calculus and linear algebra to build models from
                scratch.
              </FAQ>
              <FAQ q="Which language should I learn first?">
                Python. It has the richest ecosystem for AI (NumPy, pandas,
                scikit-learn, PyTorch, TensorFlow).
              </FAQ>
              <FAQ q="Will AI replace my job?">
                AI will change many jobs. People who learn to use AI as a tool
                usually outperform those who ignore it or fear it.
              </FAQ>
              <FAQ q="Is AI dangerous?">
                Like any powerful technology, AI carries real risks — bias,
                misuse, over-reliance. That's why responsible AI practices
                matter.
              </FAQ>
            </Section>

            <Section id="summary" title="13. Summary & Key Takeaways">
              <Callout
                tone="success"
                icon={<CheckCircle2 className="h-5 w-5" />}
                title="Key Takeaways"
              >
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>AI is systems that learn patterns from data.</li>
                  <li>ML is a subset of AI; Deep Learning is a subset of ML.</li>
                  <li>Neural networks learn by adjusting weights via backpropagation.</li>
                  <li>Data quality matters more than model complexity.</li>
                  <li>Every AI system today is <em>narrow</em>, not general.</li>
                </ul>
              </Callout>

              <h3 className="mt-8 text-lg font-semibold">Reflection Questions</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Which AI feature in your daily life would you want to understand better?</li>
                <li>Where could human oversight most improve an AI product you use?</li>
                <li>What is one dataset you'd love to have, and why?</li>
              </ol>

              <h3 className="mt-8 text-lg font-semibold">Practice Questions</h3>
              <ol className="mt-2 list-decimal space-y-2 pl-5">
                <li>Define AI, ML, and DL in one sentence each.</li>
                <li>Give two examples of supervised learning.</li>
                <li>Why is training/validation/test splitting important?</li>
                <li>What is backpropagation, in your own words?</li>
              </ol>
            </Section>

            {/* References */}
            <div className="mt-12 rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-lg font-semibold">References</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  Russell, S. &amp; Norvig, P. — <em>Artificial Intelligence: A
                  Modern Approach</em> (Pearson).
                </li>
                <li>
                  Goodfellow, I., Bengio, Y., Courville, A. —{" "}
                  <a
                    href="https://www.deeplearningbook.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    Deep Learning
                  </a>{" "}
                  (MIT Press).
                </li>
                <li>
                  Stanford CS229 — Machine Learning course notes:{" "}
                  <a
                    href="https://cs229.stanford.edu/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    cs229.stanford.edu
                  </a>
                </li>
                <li>
                  Google — <a href="https://developers.google.com/machine-learning/crash-course" target="_blank" rel="noreferrer" className="text-primary hover:underline">Machine Learning Crash Course</a>.
                </li>
                <li>
                  OECD AI Principles —{" "}
                  <a
                    href="https://oecd.ai/en/ai-principles"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    oecd.ai/en/ai-principles
                  </a>
                </li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Educational Disclaimer</p>
              <p className="mt-2">
                This resource is provided by EduNova AI for educational purposes
                only. Content is a general introduction and should not be
                considered professional, legal, medical, or financial advice.
                Technologies evolve rapidly; always verify claims against
                primary sources before making decisions. External links are
                provided for convenience and do not constitute an endorsement.
              </p>
            </div>
          </article>
        </div>

        {/* Related resources */}
        <div className="no-print mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Continue learning
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Related resources
              </h2>
            </div>
            <Link
              to="/resources"
              className="hidden text-sm font-medium text-primary hover:underline sm:inline"
            >
              Browse library →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Machine Learning — Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
              { title: "Python for AI", tag: "Programming", time: "12 min" },
              { title: "AI Ethics", tag: "AI & Society", time: "9 min" },
              { title: "Prompt Engineering Basics", tag: "Generative AI", time: "10 min" },
              { title: "Neural Networks Explained", tag: "AI & Data", time: "16 min" },
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
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {r.time}
                  </span>
                </div>
                <Link
                  to="/resources"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline"
                >
                  Open resource <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Sub-components ------------------------- */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
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

function Exercise({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-xs text-primary">
          {n}
        </span>
        {title}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
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
