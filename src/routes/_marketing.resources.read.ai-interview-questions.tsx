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
  MessageSquare,
  Printer,
  Share2,
  Sparkles,
  Tag,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-interview-questions")({
  head: () => {
    const title = "Artificial Intelligence — Interview Questions | EduNova AI";
    const desc =
      "AI interview prep: 95+ curated questions with hints, model answers, examples, follow-ups, scenarios, coding logic, and HR — covering ML, DL, NN, CV, NLP, LLMs, and ethics.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIInterviewQuestionsPage,
});

const RESOURCE = {
  id: "ai-interview-questions",
  title: "Artificial Intelligence — Interview Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "35 min",
  pages: 45,
  lastUpdated: "April 2026",
  tags: [
    "AI Fundamentals",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Interview Prep",
  ],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&q=80",
  roadmap: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
  compare: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  ml: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80",
  dl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
  neural: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  cv: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&q=80",
  nlp: "https://images.unsplash.com/photo-1546146830-2cca9512c68e?w=1400&q=80",
  gen: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=80",
  scenario: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
  code: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80",
  hr: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=80",
  project: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1400&q=80",
  timeline: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1400&q=80",
};

type TocItem = { id: string; label: string };
const TOC: TocItem[] = [
  { id: "s1", label: "AI Fundamentals" },
  { id: "s2", label: "Artificial Intelligence Basics" },
  { id: "s3", label: "Machine Learning" },
  { id: "s4", label: "Deep Learning" },
  { id: "s5", label: "Neural Networks" },
  { id: "s6", label: "Computer Vision" },
  { id: "s7", label: "Natural Language Processing" },
  { id: "s8", label: "Generative AI" },
  { id: "s9", label: "Scenario-Based" },
  { id: "s10", label: "Coding & Logic" },
  { id: "s11", label: "HR & Behavioral" },
  { id: "s12", label: "AI Project Discussion" },
  { id: "s13", label: "Rapid Fire" },
  { id: "s14", label: "Interview Tips" },
  { id: "s15", label: "Final Revision" },
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

function AIInterviewQuestionsPage() {
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
      text: "AI Interview Questions on EduNova AI",
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
  const scrollToArticle = () => jumpTo("s1");
  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-article { padding: 0 !important; }
          body { background: white !important; }
          details { page-break-inside: avoid; }
          details > summary { list-style: none; }
          details:not([open]) > *:not(summary) { display: block !important; }
          details:not([open]) { padding-bottom: 0.5rem; }
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
              <MessageSquare className="h-5 w-5" />
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
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked} aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}>
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved} aria-label={saved ? "Unsave" : "Save for later"}>
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

      {/* Cover */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="Interview prep cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-800/80 to-cyan-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">95+ Questions · 15 Sections</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            Layered hints, detailed model answers, follow-ups, scenarios, coding logic, and HR
            prompts — everything you need to walk into an AI interview with confidence.
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
                <ListChecks className="h-4 w-4 text-primary" /> Sections
              </p>
              <ol className="mt-3 max-h-[62vh] space-y-0.5 overflow-y-auto pr-1 text-sm">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(item.id)}
                      className={`group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition ${
                        activeId === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
          <article ref={articleRef} className="print-article mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base">
            <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Understand commonly asked AI interview questions.</li>
                <li>Answer technical AI concepts with confidence.</li>
                <li>Explain ML and DL fundamentals.</li>
                <li>Demonstrate knowledge of Neural Networks.</li>
                <li>Improve problem-solving and communication skills.</li>
                <li>Prepare for internships and technical interviews.</li>
              </ul>
            </Callout>

            <Figure src={IMG.roadmap} caption="Your 4-week AI interview roadmap: fundamentals → ML → DL → mocks." />

            {/* S1 — AI Fundamentals */}
            <Section id="s1" n={1} title="AI Fundamentals">
              <IQ
                level="Easy"
                q="What is Artificial Intelligence?"
                hint="Think about how machines learn and act."
                answer="AI is the science of building systems that perform tasks normally requiring human intelligence — perception, reasoning, learning, and decision-making. Modern AI learns patterns from data instead of relying on hand-coded rules."
                simple="Making computers behave intelligently by learning from data."
                example="Netflix recommendations, ChatGPT, Google Search ranking."
                followups={["Is AI the same as automation?", "How is modern AI different from rule-based systems?"]}
                mistakes={["Confusing AI with generic automation.", "Assuming AI is 'conscious'."]}
                tip="Anchor your answer with one concrete example."
              />
              <IQ
                level="Easy"
                q="Differentiate AI, ML, and DL."
                hint="They are nested subsets."
                answer="AI is the broadest field of making machines intelligent. ML is a subset of AI where systems learn patterns from data. DL is a subset of ML that uses deep neural networks with many layers."
                simple="AI ⊃ ML ⊃ DL."
                example="Chess engine (AI) → spam filter (ML) → ChatGPT (DL)."
                followups={["When would you use classical ML over DL?", "Why does DL need so much data?"]}
                mistakes={["Saying AI and ML are the same.", "Calling every ML model 'deep learning'."]}
                tip="Draw three nested circles on the whiteboard while explaining."
              />
              <IQ
                level="Easy"
                q="What are the different types of AI?"
                hint="By capability and by memory."
                answer="By capability: Narrow AI (task-specific, all AI today), General AI (human-level, hypothetical), Super AI (beyond humans, speculative). By memory: Reactive, Limited-memory, Theory of Mind, Self-aware."
                simple="Today's AI is all Narrow AI."
                example="Siri = Narrow AI. Human-level 'thinks like us' would be AGI."
                followups={["Is ChatGPT General AI?", "What is AGI?"]}
                mistakes={["Calling LLMs 'General AI'."]}
                tip="Explicitly say 'today, all AI is Narrow AI' — interviewers love this precision."
              />
              <IQ
                level="Easy"
                q="What is a rational agent?"
                hint="Focus on goals and outcomes."
                answer="A rational agent is one that acts to maximize its expected performance measure given its perceptions, knowledge, and available actions."
                simple="An agent that acts to achieve the best outcome."
                example="Self-driving car choosing the safest lane."
                followups={["What is the environment of an agent?", "Give a real-world rational agent example."]}
                mistakes={["Confusing 'rational' with 'perfect'."]}
                tip="Rationality depends on what the agent knows and can do."
              />
              <IQ
                level="Medium"
                q="What are the main goals of AI?"
                hint="Think along the P-R-L-A axis."
                answer="Perception, reasoning, learning, natural language interaction, planning, and acting in an environment. Modern AI adds generation (creating text/images/code)."
                simple="Perceive, reason, learn, act — and now create."
                example="Perception: face detection. Learning: recommender systems. Generation: DALL·E."
                followups={["How does AI 'reason'?"]}
                mistakes={["Listing only ML tasks."]}
                tip="End with a modern example (LLMs)."
              />
            </Section>

            {/* S2 — AI Basics */}
            <Section id="s2" n={2} title="Artificial Intelligence Basics">
              <Figure src={IMG.compare} caption="AI ⊃ ML ⊃ DL — nested subsets." />
              <IQ
                level="Easy"
                q="What is the Turing Test?"
                hint="Proposed by Alan Turing, 1950."
                answer="A test where a human evaluator interacts with a machine and another human through text. If the evaluator cannot reliably tell them apart, the machine passes the test as 'intelligent'."
                simple="Can a machine imitate a human convincingly in conversation?"
                example="A chatbot indistinguishable from a human in a text chat."
                followups={["What are the limitations of the Turing Test?", "What is the Chinese Room argument?"]}
                mistakes={["Confusing Turing Test with 'consciousness test'."]}
                tip="Mention that passing it doesn't prove understanding."
              />
              <IQ
                level="Easy"
                q="What is the difference between symbolic AI and modern AI?"
                hint="Rules vs data."
                answer="Symbolic AI uses hand-crafted rules and logical reasoning. Modern AI (ML/DL) learns statistical patterns from large datasets, enabling it to generalize beyond hand-coded rules."
                simple="Old AI = rules. Modern AI = data."
                example="Old chess engines vs AlphaZero."
                followups={["Are symbolic systems still used today?"]}
                mistakes={["Ignoring that hybrid systems exist."]}
                tip="Mention 'neuro-symbolic AI' for bonus points."
              />
              <IQ level="Easy" q="What is a heuristic in AI?" hint="A rule of thumb." answer="A heuristic is a strategy that finds good-enough solutions to problems that are otherwise expensive to solve exactly. Common in search and optimization." simple="A shortcut that usually works well." example="A* search uses a heuristic to estimate distance to the goal." followups={["Give an admissible heuristic for the 8-puzzle."]} mistakes={["Saying heuristics always find the best answer."]} tip="Contrast heuristic vs exact algorithms." />
              <IQ level="Easy" q="What are agents and environments?" hint="Perceive → act → repeat." answer="An agent perceives its environment through sensors and acts on it through actuators. The environment can be observable/partially-observable, deterministic/stochastic, static/dynamic, and discrete/continuous." simple="An agent lives inside an environment and interacts with it." example="Robot vacuum (agent) in a room (environment)." followups={["Is a chess game deterministic?"]} mistakes={["Ignoring environment classification."]} tip="Classify environments explicitly." />
              <IQ level="Medium" q="What is the frame problem?" hint="What changes and what doesn't." answer="The frame problem is the challenge of representing the effects of actions in AI — specifically, describing what does NOT change when an action is taken, without listing everything explicitly." simple="How do we know what stays the same when something changes?" example="After moving a coffee cup, the position of the pen didn't change — how do we encode that automatically?" followups={["How does modern AI sidestep this?"]} mistakes={["Confusing with the credit-assignment problem."]} tip="Mention that DL sidesteps it by learning from data." />
            </Section>

            {/* S3 — ML */}
            <Section id="s3" n={3} title="Machine Learning Questions">
              <Figure src={IMG.ml} caption="ML workflow: collect → clean → train → evaluate → deploy → monitor." />
              <IQ level="Easy" q="What is Machine Learning?" hint="Learning patterns from data." answer="ML is a branch of AI where algorithms learn patterns from data and improve at a task with experience, without being explicitly programmed for that task." simple="Teaching machines from examples instead of coding rules." example="Spam filter learning from labeled emails." followups={["What kinds of ML exist?"]} mistakes={["Confusing ML with statistics only."]} tip="Frame ML as 'learn a function f: X → Y'." />
              <IQ level="Easy" q="Explain supervised, unsupervised, and reinforcement learning." hint="Labels, no labels, rewards." answer="Supervised uses labeled examples (classification, regression). Unsupervised finds structure without labels (clustering, dimensionality reduction). Reinforcement learning has an agent that learns from reward signals by interacting with an environment." simple="With labels / without labels / with rewards." example="Supervised: cat vs dog. Unsupervised: customer clusters. RL: game-playing agents." followups={["Give one algorithm from each family."]} mistakes={["Confusing semi-supervised with unsupervised."]} tip="Give one algorithm example per family." />
              <IQ level="Easy" q="What is overfitting? How do you prevent it?" hint="Great on train, bad on test." answer="Overfitting is when a model memorizes training data and fails to generalize. Prevent it with more data, regularization (L1/L2/dropout), early stopping, simpler models, and cross-validation." simple="Model learns the noise, not the pattern." example="Decision tree with unlimited depth memorizing training data." followups={["What is underfitting?"]} mistakes={["Suggesting only 'more data'."]} tip="List 3–4 techniques quickly." />
              <IQ level="Easy" q="What is the bias-variance trade-off?" hint="Underfit vs overfit." answer="Bias is error from wrong assumptions (underfit). Variance is error from sensitivity to training data (overfit). Good models balance both. Total error = bias² + variance + irreducible noise." simple="Simple models underfit; complex models overfit." example="Linear model on nonlinear data (high bias) vs deep tree (high variance)." followups={["How does regularization affect the trade-off?"]} mistakes={["Confusing bias with dataset bias."]} tip="Write the equation on the whiteboard." />
              <IQ level="Easy" q="What is cross-validation?" hint="Multiple train/test splits." answer="A technique that splits data into k folds, trains on k-1, validates on 1, and repeats k times. It gives a more reliable estimate of model performance and helps in hyperparameter tuning." simple="Rotate the validation set across folds." example="5-fold CV on a small dataset." followups={["What is stratified CV?"]} mistakes={["Using CV on the test set."]} tip="Mention stratification for imbalanced data." />
              <IQ level="Medium" q="How do you handle imbalanced datasets?" hint="Rebalance or reweight." answer="Options: resampling (SMOTE, oversampling minority, undersampling majority), class weights in the loss, threshold tuning, using appropriate metrics (F1, PR-AUC, recall), and anomaly-detection approaches." simple="Rebalance data or reweight loss." example="Fraud detection with 0.1% fraud rate." followups={["Why is accuracy misleading here?"]} mistakes={["Reporting accuracy on imbalanced data."]} tip="Always name the correct metric." />
              <IQ level="Medium" q="What are precision, recall, and F1?" hint="Confusion matrix." answer="Precision = TP / (TP + FP) — of predicted positives, how many are correct. Recall = TP / (TP + FN) — of actual positives, how many were caught. F1 = 2·P·R / (P+R), the harmonic mean." simple="Precision = correctness. Recall = coverage. F1 = balance." example="Medical screening favors recall; spam filters favor precision." followups={["When to prefer precision over recall?"]} mistakes={["Mixing up precision and recall."]} tip="Say the formula and one use-case." />
              <IQ level="Medium" q="What is feature engineering?" hint="Turning raw data into useful inputs." answer="Feature engineering creates model-friendly features from raw data — encoding categorical variables, scaling, binning, aggregations, ratios, embeddings, and domain-specific features." simple="Building better inputs so simpler models work." example="Extracting day-of-week from a timestamp." followups={["What is feature selection?"]} mistakes={["Ignoring domain knowledge."]} tip="Show one concrete transformation." />
              <IQ level="Medium" q="What is regularization?" hint="Penalize complexity." answer="Techniques that add a penalty to the loss function to discourage overly complex models. L1 (Lasso) drives some weights to zero, L2 (Ridge) shrinks weights, ElasticNet combines both. Dropout is a form for neural nets." simple="Punish the model for being too complex." example="Ridge regression with α controlling penalty." followups={["Why does L1 give sparsity?"]} mistakes={["Confusing L1 and L2."]} tip="Say 'L1 = sparsity, L2 = shrinkage'." />
              <IQ level="Medium" q="What is gradient descent?" hint="Follow the slope downhill." answer="An optimization algorithm that iteratively updates parameters in the opposite direction of the gradient of the loss: θ ← θ − α · ∇L(θ). Variants include SGD, mini-batch, momentum, Adam." simple="Take small steps downhill on the loss surface." example="Training a linear regression on housing data." followups={["Difference between SGD and Adam?"]} mistakes={["Forgetting the learning-rate role."]} tip="Mention the learning rate explicitly." />
            </Section>

            {/* S4 — DL */}
            <Section id="s4" n={4} title="Deep Learning Questions">
              <Figure src={IMG.dl} caption="Deep networks learn hierarchical representations automatically." />
              <IQ level="Easy" q="What is Deep Learning?" hint="ML with deep neural nets." answer="Deep Learning is a subset of ML that uses neural networks with many layers to learn hierarchical representations from raw data (pixels, tokens, waveforms) instead of manual features." simple="ML that learns features automatically from raw data." example="Image classification with a CNN." followups={["Why is DL data-hungry?"]} mistakes={["Confusing DL with any neural network."]} tip="Anchor with the phrase 'hierarchical representations'." />
              <IQ level="Easy" q="What are activation functions? Name a few." hint="Non-linearity." answer="Non-linear functions applied at each neuron: ReLU (f(x)=max(0,x)), sigmoid, tanh, softmax (output for multi-class), GELU (used in transformers). Without non-linearities, a deep net collapses to a linear model." simple="Non-linearity — the reason deep nets work." example="Softmax at the output of a classifier." followups={["Why is ReLU popular?"]} mistakes={["Saying activations are 'optional'."]} tip="Explicitly note 'without non-linearity, layers collapse'." />
              <IQ level="Medium" q="What is a CNN? When would you use one?" hint="Convolutions on grids." answer="A Convolutional Neural Network uses convolutional layers to extract local spatial patterns and pooling to reduce dimensionality. Ideal for images, audio spectrograms, and other grid-like data." simple="A neural network built for images." example="ResNet for image classification." followups={["What does a convolution do intuitively?"]} mistakes={["Applying CNN to unstructured tabular data."]} tip="Contrast with fully connected nets." />
              <IQ level="Medium" q="What is an RNN and its limitations?" hint="Sequences with hidden state." answer="A Recurrent Neural Network processes sequences by maintaining a hidden state passed across time steps. Limitations: vanishing/exploding gradients, poor long-range dependencies, slow to train (sequential). LSTM/GRU mitigate; transformers largely replace them today." simple="A network with memory across time." example="Older machine-translation models." followups={["Why are transformers preferred now?"]} mistakes={["Claiming RNNs are still SOTA."]} tip="Say 'today, transformers dominate sequence modeling'." />
              <IQ level="Medium" q="Explain the Transformer architecture." hint="Self-attention." answer="Transformers use self-attention layers to weigh every token against every other token in parallel, plus feed-forward layers, positional encodings, layer norm, and residual connections. Enables parallel training and long-range dependencies." simple="Attention lets each word 'look at' every other word." example="GPT, BERT, ViT." followups={["What is multi-head attention?"]} mistakes={["Ignoring positional encodings."]} tip="Mention 'Attention Is All You Need' (2017)." />
              <IQ level="Medium" q="What is batch normalization?" hint="Normalize activations per batch." answer="A layer that normalizes activations (zero mean, unit variance) per mini-batch, then scales/shifts with learnable parameters. Stabilizes and accelerates training, allows higher learning rates, and acts as mild regularization." simple="Keep activations well-scaled during training." example="Applied after conv layers in ResNet." followups={["Batch norm vs layer norm — when to use which?"]} mistakes={["Applying batch norm with tiny batches."]} tip="Note layer norm is used in transformers." />
              <IQ level="Medium" q="What is transfer learning?" hint="Reuse a pretrained model." answer="Transfer learning takes a model pretrained on a large dataset and fine-tunes it on a smaller task-specific dataset. Saves compute and works well when data is scarce." simple="Start from a smart model and specialize it." example="Fine-tuning BERT on a domain-specific classification task." followups={["When would transfer learning hurt?"]} mistakes={["Freezing everything when the domain is very different."]} tip="Mention foundation models as a modern extension." />
              <IQ level="Medium" q="What is dropout?" hint="Randomly zero units." answer="Dropout randomly sets a fraction of activations to zero during training, forcing the network to be robust and not rely on any single unit. Acts as regularization; disabled at inference." simple="Randomly drop neurons during training." example="Dropout = 0.5 in a fully connected layer." followups={["Why is it disabled at inference?"]} mistakes={["Leaving dropout on at test time."]} tip="Say 'ensemble effect' — bonus points." />
            </Section>

            {/* S5 — NN */}
            <Section id="s5" n={5} title="Neural Network Questions">
              <Figure src={IMG.neural} caption="Input → hidden layers → output; each connection carries a learnable weight." />
              <IQ level="Easy" q="How does a neural network learn?" hint="Forward, loss, backward, update." answer="Forward pass computes predictions. A loss function measures the error. Backpropagation computes gradients of the loss w.r.t. weights via the chain rule. Gradient descent then updates the weights. Repeat over many epochs." simple="Predict → measure error → adjust weights → repeat." example="MNIST digit classifier." followups={["What is an epoch vs a batch?"]} mistakes={["Skipping backprop in the answer."]} tip="Say the 4 steps in order." />
              <IQ level="Easy" q="Explain forward and backward propagation." hint="Chain rule." answer="Forward propagation flows inputs through the network to compute an output. Backward propagation flows the loss gradient backward through the network using the chain rule to compute weight gradients, which are then used by the optimizer." simple="Forward = predict. Backward = attribute error to weights." example="Training a 3-layer MLP." followups={["Why can gradients vanish?"]} mistakes={["Confusing forward and backward."]} tip="Draw arrows going forward and back." />
              <IQ level="Medium" q="What is the vanishing gradient problem?" hint="Gradients shrink in deep nets." answer="In deep networks with certain activations (sigmoid/tanh), gradients can become extremely small as they propagate backward, causing early layers to stop learning. Fixes: ReLU, residual connections, batch norm, better initialization." simple="Gradients get smaller and smaller as they flow back." example="Deep sigmoid MLP failing to train." followups={["What is exploding gradient?"]} mistakes={["Saying only ReLU fixes it."]} tip="List 3 fixes." />
              <IQ level="Medium" q="What are weight initialization strategies?" hint="Xavier, He." answer="Proper initialization prevents vanishing/exploding gradients. Xavier/Glorot: for tanh/sigmoid. He: for ReLU. Zero-init leads to symmetry and failed learning." simple="Start weights right, or training breaks." example="He init in a ReLU-based CNN." followups={["Why not initialize with zeros?"]} mistakes={["Choosing Xavier for ReLU."]} tip="Match init to activation." />
            </Section>

            {/* S6 — CV */}
            <Section id="s6" n={6} title="Computer Vision Questions">
              <Figure src={IMG.cv} caption="CV pipeline: acquire → preprocess → detect/segment → classify → act." />
              <IQ level="Easy" q="What tasks does Computer Vision solve?" hint="Classification, detection, segmentation, tracking." answer="Image classification, object detection, semantic/instance segmentation, keypoint estimation, tracking, OCR, image generation, and 3D reconstruction." simple="Any task that involves understanding images or video." example="YOLO for detection, U-Net for segmentation, OCR for documents." followups={["Difference between semantic and instance segmentation?"]} mistakes={["Saying 'CV = classification'."]} tip="Name at least 3 tasks." />
              <IQ level="Medium" q="Explain object detection vs segmentation." hint="Boxes vs masks." answer="Object detection outputs bounding boxes and class labels for objects. Semantic segmentation labels every pixel with a class; instance segmentation additionally distinguishes individual object instances." simple="Detection draws boxes; segmentation colors pixels." example="Autonomous driving: detect vehicles (boxes), segment road (pixels)." followups={["What's panoptic segmentation?"]} mistakes={["Confusing semantic and instance segmentation."]} tip="Sketch the outputs to make the difference visual." />
              <IQ level="Medium" q="What is IoU and how is it used?" hint="Box overlap metric." answer="Intersection over Union = area of intersection / area of union of two bounding boxes. Used to evaluate detection quality (typically IoU > 0.5 is considered a match)." simple="Overlap ratio of predicted vs true box." example="Non-max suppression uses IoU to remove duplicate boxes." followups={["What is mAP?"]} mistakes={["Confusing IoU with precision."]} tip="Write the formula." />
            </Section>

            {/* S7 — NLP */}
            <Section id="s7" n={7} title="Natural Language Processing Questions">
              <Figure src={IMG.nlp} caption="NLP pipeline: tokenize → embed → model → decode." />
              <IQ level="Easy" q="What are word embeddings?" hint="Vectors for words." answer="Dense vector representations of words where semantically similar words have similar vectors. Classic methods: Word2Vec, GloVe, FastText. Modern models use contextual embeddings (BERT, GPT)." simple="Words as numbers that capture meaning." example="king − man + woman ≈ queen." followups={["What are contextual embeddings?"]} mistakes={["Confusing one-hot vectors with embeddings."]} tip="Give the king-queen example." />
              <IQ level="Easy" q="What is tokenization?" hint="Breaking text into pieces." answer="Splitting text into smaller units (tokens) that a model can process — words, subwords (BPE, WordPiece), or characters. Modern LLMs use subword tokenization to handle rare words." simple="Text → chunks." example="'unhappiness' → ['un', 'happi', 'ness']." followups={["Why subword instead of word tokenization?"]} mistakes={["Assuming tokens = words."]} tip="Mention BPE." />
              <IQ level="Medium" q="Explain attention mechanism intuitively." hint="Weighted focus over inputs." answer="Attention computes a weighted sum over input tokens where weights depend on similarity (dot product of query and key vectors), letting the model focus on the most relevant parts. Formula: softmax(QKᵀ/√d) · V." simple="Every token 'looks at' every other token with weights." example="Translating 'she gave him the book' — attention aligns pronouns to referents." followups={["Difference between self-attention and cross-attention?"]} mistakes={["Ignoring the softmax step."]} tip="Explain with pronoun resolution." />
            </Section>

            {/* S8 — Generative AI */}
            <Section id="s8" n={8} title="Generative AI Questions">
              <Figure src={IMG.gen} caption="Generative AI creates new text, images, audio, video, and code." />
              <IQ level="Easy" q="What is Generative AI?" hint="Models that produce content." answer="AI systems that produce new content — text, images, audio, video, or code — by learning the distribution of training data. Modern examples: GPT (text), Stable Diffusion (images), Suno (music), Sora (video)." simple="AI that creates instead of only classifying." example="ChatGPT writing an email; Midjourney generating art." followups={["How does a diffusion model work?"]} mistakes={["Calling any AI 'generative'."]} tip="Contrast with discriminative models." />
              <IQ level="Medium" q="What is a Large Language Model (LLM)?" hint="Transformer trained on massive text." answer="A transformer-based model trained on large text corpora to predict the next token. After pretraining, LLMs are often fine-tuned and aligned (e.g., RLHF) to follow instructions and respond helpfully." simple="A big transformer that predicts the next word." example="GPT-4, Claude, Gemini, Llama." followups={["What is RLHF?"]} mistakes={["Saying LLMs 'understand' text like humans."]} tip="Mention pretraining → fine-tuning → alignment." />
              <IQ level="Medium" q="What is RAG (Retrieval-Augmented Generation)?" hint="LLM + knowledge base." answer="A pattern where a retrieval system fetches relevant documents from a knowledge base, and an LLM conditions its answer on those documents. Reduces hallucinations and lets the model use fresh or private data." simple="LLM answers with your documents in context." example="Chatbot answering questions from company documentation." followups={["What is a vector database?"]} mistakes={["Assuming RAG eliminates hallucinations entirely."]} tip="Explain the retrieve → augment → generate flow." />
              <IQ level="Medium" q="What is prompt engineering?" hint="Designing model inputs." answer="Designing inputs to LLMs to get desired outputs. Techniques: zero-shot, few-shot, chain-of-thought, role prompting, output formatting, and using system prompts." simple="Talking to the model in the right way." example="Adding 'Let's think step by step' improves reasoning." followups={["Difference between zero-shot and few-shot?"]} mistakes={["Believing longer prompts are always better."]} tip="Name 3 techniques." />
            </Section>

            {/* S9 — Scenario */}
            <Section id="s9" n={9} title="Scenario-Based Questions">
              <Figure src={IMG.scenario} caption="Scenario questions test how you think, not what you remember." />
              <ScenarioQ q="Your fraud model has 99% accuracy but misses most frauds. What's wrong?" a="The dataset is heavily imbalanced. Accuracy is dominated by the majority (non-fraud) class. Switch to F1, PR-AUC, or recall as the primary metric, use class weights or resampling (SMOTE), and calibrate the classification threshold." />
              <ScenarioQ q="Your CV model performs well in the lab but fails in production." a="Likely causes: data drift (production images differ from training distribution), label leakage, biased training data, poor augmentation, or environmental changes (lighting, angle). Set up monitoring, add representative data, retrain, and consider domain adaptation." />
              <ScenarioQ q="An LLM confidently gives a wrong answer to a factual question. How would you reduce this in production?" a="Add RAG grounded on trusted sources, cite sources in the response, ask the model to say 'I don't know' when uncertain, add guardrails and evaluation, use function-calling for facts, and monitor factuality metrics." />
              <ScenarioQ q="You have 1,000 labeled images and need a working classifier by Friday." a="Use transfer learning from a pretrained CNN (e.g., ResNet or EfficientNet), aggressive augmentation, freeze early layers, fine-tune the last few, use class weights if imbalanced, and evaluate with stratified cross-validation." />
              <ScenarioQ q="Your model's accuracy dropped after deployment. What checks do you run?" a="Check for data drift, feature drift, concept drift, label pipeline breakage, upstream data schema changes, and infrastructure issues. Compare training vs live distributions, alert on drift, and retrain when needed." />
              <ScenarioQ q="How would you build a spam filter from scratch?" a="Collect labeled emails, clean and tokenize text, build features (TF-IDF or embeddings), train a baseline (Naive Bayes or logistic regression), evaluate with precision/recall, add active learning for uncertain cases, and deploy with feedback loop." />
              <ScenarioQ q="Your model is 3× slower after adding a feature. What do you do?" a="Profile the pipeline, measure feature computation cost, cache expensive features, precompute or batch, use approximate methods, and consider whether the added lift justifies the latency." />
              <ScenarioQ q="You must deploy a large LLM on limited hardware." a="Use a smaller model, quantization (INT8/INT4), distillation to a smaller student, pruning, LoRA adapters for fine-tuning, and consider serverless GPU inference or edge-friendly runtimes (ONNX, GGUF)." />
              <ScenarioQ q="Users complain the recommendation feed feels stale." a="Investigate freshness bias, add exploration (bandit strategies), diversify results, weight recency, refresh candidate generation more often, and A/B-test the change." />
              <ScenarioQ q="Your model discriminates against a demographic subgroup. What's your response?" a="Immediately audit metrics per group, remove or reweight biased features, augment underrepresented data, apply fairness constraints, document limitations, involve affected users, and only re-deploy after passing fairness checks." />
            </Section>

            {/* S10 — Coding */}
            <Section id="s10" n={10} title="Coding & Logic Questions">
              <Figure src={IMG.code} caption="Interviewers care how you think — narrate as you code." />
              <IQ level="Easy" q="Given a list of numbers, compute mean and variance from scratch." hint="Loop, sum, then sum of squared deviations." answer="Mean = Σx / n. Variance = Σ(x − mean)² / n (population) or / (n−1) (sample). Use numpy for real work, but be ready to write it in raw Python for interviews." simple="Two passes: sum, then squared deviations." example="[1,2,3,4] → mean=2.5, var=1.25." followups={["What if n is huge and can't fit in memory?"]} mistakes={["Confusing population vs sample variance."]} tip="Mention Welford's online algorithm for streaming." />
              <IQ level="Easy" q="Write a function to implement k-Nearest Neighbors classification." hint="Distances, top-k, majority vote." answer="For each query point, compute distances to all training points, take the k nearest, and vote by majority class label (or weighted by inverse distance). Complexity is O(n·d) per query without indexing." simple="Ask the k closest neighbors what class this is." example="Classify a point with k=5 in 2D." followups={["How to speed up for large data?"]} mistakes={["Forgetting to normalize features."]} tip="Mention KD-trees / ball trees / FAISS." />
              <IQ level="Medium" q="Implement gradient descent for linear regression." hint="Update weights along the negative gradient." answer="Initialize weights, loop for N epochs: predict y_hat = Xw + b, compute loss = MSE, compute gradients dw = (2/n) Xᵀ(y_hat − y) and db = (2/n) Σ(y_hat − y), update w ← w − α·dw, b ← b − α·db." simple="Repeatedly nudge weights downhill on MSE." example="Fit y = 2x + 1 on synthetic data." followups={["How to choose α?"]} mistakes={["Forgetting to scale features."]} tip="Mention learning-rate schedules." />
              <IQ level="Medium" q="How would you shuffle a dataset for training?" hint="Reproducibility matters." answer="Use a random permutation of indices with a fixed random seed for reproducibility. In PyTorch, use DataLoader with shuffle=True and set torch.manual_seed. Ensure labels stay aligned with features." simple="Shuffle indices, apply to X and y together." example="np.random.default_rng(42).permutation(len(X))." followups={["Why shuffle each epoch?"]} mistakes={["Shuffling X without y."]} tip="Fix seeds for reproducible experiments." />
              <IQ level="Medium" q="Given a confusion matrix, compute precision, recall, F1." hint="Use TP, FP, FN." answer="Extract TP, FP, FN from the matrix. Precision = TP / (TP + FP). Recall = TP / (TP + FN). F1 = 2·P·R / (P + R). For multi-class, compute per class and average (macro or weighted)." simple="Plug into the formulas per class." example="TP=40, FP=10, FN=5 → P=0.8, R=0.888, F1=0.842." followups={["What is macro vs weighted F1?"]} mistakes={["Ignoring multi-class averaging."]} tip="Mention macro vs micro averaging." />
            </Section>

            {/* S11 — HR */}
            <Section id="s11" n={11} title="HR & Behavioral Questions">
              <Figure src={IMG.hr} caption="Behavioral answers use the STAR structure: Situation, Task, Action, Result." />
              <HRQ q="Tell me about yourself." tips={["Keep it to 60–90 seconds.", "Structure: present role → past experience → why AI.", "End by connecting to the role you're applying for."]} />
              <HRQ q="Why are you interested in AI?" tips={["Share a concrete moment that sparked interest.", "Mention a project or paper you learned from.", "Tie it to the company's problem space."]} />
              <HRQ q="Tell me about a challenging AI project you worked on." tips={["Use STAR: Situation, Task, Action, Result.", "Quantify impact (accuracy, latency, revenue, users).", "Own both successes and mistakes."]} />
              <HRQ q="How do you keep up with AI research?" tips={["Name specific sources: arXiv, Papers with Code, blogs.", "Mention a recent paper you read and what you learned.", "Show a habit — weekly reading, personal projects."]} />
              <HRQ q="Describe a time you failed and what you learned." tips={["Choose a real failure, not a humble-brag.", "Show what you would do differently.", "Focus on the lesson, not the blame."]} />
              <HRQ q="Where do you see yourself in 3–5 years?" tips={["Anchor to skills and impact, not titles.", "Show curiosity about the field.", "Align lightly with the company's direction."]} />
            </Section>

            {/* S12 — Project */}
            <Section id="s12" n={12} title="AI Project Discussion">
              <Figure src={IMG.project} caption="Talk through your project the way a senior engineer would." />
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="text-sm font-semibold">How to structure an AI project story</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  <li><strong>Problem</strong> — What problem did it solve? Who was the user?</li>
                  <li><strong>Data</strong> — Source, size, cleaning steps, labeling, splits.</li>
                  <li><strong>Approach</strong> — Baseline first, then the model(s) you tried.</li>
                  <li><strong>Metrics</strong> — Which metric mattered and why.</li>
                  <li><strong>Results</strong> — Quantified improvement over baseline.</li>
                  <li><strong>Trade-offs</strong> — Latency vs accuracy, cost vs quality.</li>
                  <li><strong>Learnings</strong> — What surprised you? What would you change?</li>
                </ol>
              </div>
              <Callout tone="tip" title="Common follow-ups">
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>"Why did you choose that model?" — Have a comparison ready.</li>
                  <li>"What was your baseline?" — Always start with a simple baseline.</li>
                  <li>"How did you deploy it?" — Know one deployment path end-to-end.</li>
                  <li>"How did you monitor it?" — Mention drift, latency, and error rates.</li>
                </ul>
              </Callout>
            </Section>

            {/* S13 — Rapid Fire */}
            <Section id="s13" n={13} title="Rapid Fire Questions">
              <div className="grid gap-3 sm:grid-cols-2">
                <RapidQA q="Full form of LLM?" a="Large Language Model." />
                <RapidQA q="Common activation in transformers?" a="GELU." />
                <RapidQA q="Loss for classification?" a="Cross-entropy." />
                <RapidQA q="Loss for regression?" a="MSE / MAE / Huber." />
                <RapidQA q="Optimizer default choice?" a="Adam / AdamW." />
                <RapidQA q="Best metric for imbalanced classes?" a="F1 / PR-AUC." />
                <RapidQA q="A generative image model family?" a="Diffusion." />
                <RapidQA q="Purpose of dropout?" a="Regularization." />
                <RapidQA q="What is RAG?" a="Retrieval-Augmented Generation." />
                <RapidQA q="One responsible-AI risk?" a="Bias / hallucination / privacy." />
              </div>
            </Section>

            {/* S14 — Interview tips */}
            <Section id="s14" n={14} title="Interview Tips">
              <Figure src={IMG.timeline} caption="Prep timeline: fundamentals → topic drill → mocks → company research." />
              <div className="grid gap-3 sm:grid-cols-2">
                <TipCard title="Prepare a baseline story" body="Have a go-to project story with metrics, trade-offs, and learnings." />
                <TipCard title="Say the metric out loud" body="Whenever you pick a model, say why the metric matches the problem." />
                <TipCard title="Own trade-offs" body="Explain what you sacrificed (latency? interpretability?) for what you gained." />
                <TipCard title="Draw diagrams" body="Whiteboard sketches beat pure verbal answers on architecture questions." />
                <TipCard title="Ask clarifying questions" body="Especially on scenario questions — clarify data, users, constraints." />
                <TipCard title="Show humility" body="Say 'I don't know, but I'd approach it by…' instead of guessing confidently." />
                <TipCard title="Practice out loud" body="Verbalizing rapidly closes the gap between 'I know it' and 'I can say it'." />
                <TipCard title="Do mock interviews" body="Peer mocks reveal filler words, gaps, and pacing issues." />
              </div>
              <Callout tone="warning" title="Common mistakes" icon={<AlertTriangle className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>Jumping to complex models before mentioning a baseline.</li>
                  <li>Reporting accuracy on imbalanced datasets.</li>
                  <li>Ignoring data leakage.</li>
                  <li>Skipping monitoring and deployment concerns.</li>
                  <li>Claiming LLMs "understand" text.</li>
                </ul>
              </Callout>
            </Section>

            {/* S15 — Final Revision */}
            <Section id="s15" n={15} title="Final Revision">
              <Callout tone="success" title="Self-assessment checklist" icon={<CheckCircle2 className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>I can explain AI vs ML vs DL with an example each.</li>
                  <li>I can describe supervised, unsupervised, and RL clearly.</li>
                  <li>I can explain overfitting, bias-variance, and regularization.</li>
                  <li>I understand CNNs, RNNs, and transformers at a high level.</li>
                  <li>I can walk through the AI project lifecycle end-to-end.</li>
                  <li>I have a rehearsed project story with metrics and trade-offs.</li>
                  <li>I can talk about responsible AI risks and mitigations.</li>
                  <li>I have practiced at least 3 mock interviews out loud.</li>
                </ul>
              </Callout>

              <h3 className="mt-8 text-lg font-semibold">Practice MCQs</h3>
              <MCQ q="Which is NOT a supervised learning algorithm?" options={["Logistic Regression", "K-Means", "Random Forest", "SVM"]} answer="K-Means" />
              <MCQ q="Backpropagation is used to:" options={["Preprocess data", "Compute gradients and update weights", "Choose learning rate", "Split data into train/test"]} answer="Compute gradients and update weights" />
              <MCQ q="Which metric best handles class imbalance?" options={["Accuracy", "F1 score", "MSE", "MAE"]} answer="F1 score" />
              <MCQ q="Transformers rely primarily on:" options={["Convolutions", "Self-attention", "Recurrence", "Decision trees"]} answer="Self-attention" />
              <MCQ q="RAG stands for:" options={["Random Attention Graph", "Retrieval-Augmented Generation", "Recurrent Adaptive Gradient", "Regularized Auto-Grad"]} answer="Retrieval-Augmented Generation" />

              <h3 className="mt-8 text-lg font-semibold">Reflection questions</h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Which topic feels weakest right now — plan one hour to review it today.</li>
                <li>Which project would you talk about first? Rehearse it in 90 seconds.</li>
                <li>Pick one paper or blog post to read this week and summarize in 3 lines.</li>
              </ol>
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
                <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Laboratory</a></li>
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
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Disclaimer</p>
              <p className="mt-2">
                This educational resource has been created for learning, interview preparation, and
                career development purposes only. The content is compiled, summarized, and organized
                using publicly available educational materials, official documentation, academic
                publications, research papers, and trusted industry resources. Interview questions
                and model answers are intended to help learners understand concepts and improve
                technical communication skills. Actual interview questions may vary depending on the
                organization and role.
              </p>
              <p className="mt-2">
                All trademarks, logos, product names, company names, and intellectual property belong
                to their respective owners. EduNova AI does not claim ownership of any third-party
                materials referenced in this resource. Learners are encouraged to consult the
                official documentation and reference sources listed above for the latest, most
                accurate, and comprehensive information.
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
              { title: "Artificial Intelligence — Step-by-Step Learning Guide", tag: "AI & Data", time: "26 min", to: "/resources/read/ai-step-by-step-learning-guide" as const },
              { title: "Artificial Intelligence — PDF Notes", tag: "AI & Data", time: "88 min", to: "/resources/read/ai-pdf-notes" as const },
              { title: "Artificial Intelligence — Quick Revision Notes", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-quick-revision-notes" as const },
              { title: "Artificial Intelligence — Cheat Sheet", tag: "AI & Data", time: "8 min" },
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
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

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Section {n}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
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

function LevelBadge({ level }: { level: "Easy" | "Medium" | "Hard" }) {
  const map = {
    Easy: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    Medium: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    Hard: "bg-red-500/15 text-red-700 dark:text-red-300",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${map[level]}`}>
      {level}
    </span>
  );
}

function IQ({
  level,
  q,
  hint,
  answer,
  simple,
  example,
  followups,
  mistakes,
  tip,
}: {
  level: "Easy" | "Medium" | "Hard";
  q: string;
  hint: string;
  answer: string;
  simple: string;
  example: string;
  followups: string[];
  mistakes: string[];
  tip: string;
}) {
  return (
    <details className="group my-3 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <LevelBadge level={level} />
          <span className="text-sm font-semibold">Q. {q}</span>
        </div>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-90" />
      </summary>
      <div className="mt-3 space-y-3 text-sm">
        <p className="rounded-lg border-l-2 border-primary/50 bg-primary/5 px-3 py-2 text-muted-foreground">
          <span className="font-semibold text-foreground">Hint:</span> {hint}
        </p>
        <p><span className="font-semibold">Model answer:</span> {answer}</p>
        <p className="text-muted-foreground"><span className="font-semibold text-foreground">Simple explanation:</span> {simple}</p>
        <p className="text-muted-foreground"><span className="font-semibold text-foreground">Example:</span> {example}</p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Follow-up questions</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {followups.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-red-500">Common mistakes</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {mistakes.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
        <p className="rounded-lg border-l-2 border-amber-500/60 bg-amber-500/10 px-3 py-2 text-amber-900 dark:text-amber-100">
          <span className="font-semibold">Tip:</span> {tip}
        </p>
      </div>
    </details>
  );
}

function ScenarioQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="group my-3 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
        <span>Scenario. {q}</span>
        <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
      </summary>
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">How to answer:</span> {a}
      </p>
    </details>
  );
}

function HRQ({ q, tips }: { q: string; tips: string[] }) {
  return (
    <details className="group my-3 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
        <span>Q. {q}</span>
        <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
      </summary>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {tips.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </details>
  );
}

function RapidQA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3">
      <p className="text-xs font-semibold">{q}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">A.</span> {a}
      </p>
    </div>
  );
}

function TipCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function MCQ({ q, options, answer }: { q: string; options: string[]; answer: string }) {
  return (
    <details className="my-3 rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="cursor-pointer list-none text-sm font-semibold">Q. {q}</summary>
      <ul className="mt-2 space-y-1 text-sm">
        {options.map((o, i) => (
          <li key={o} className="text-muted-foreground">{String.fromCharCode(65 + i)}. {o}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Answer:</span> {answer}
      </p>
    </details>
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
