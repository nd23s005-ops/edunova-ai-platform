import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
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
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-common-mistakes")({
  head: () => {
    const title = "Artificial Intelligence — Common Mistakes | EduNova AI";
    const desc =
      "The most common mistakes beginners and intermediate learners make in AI projects — why they happen, their impact, and practical fixes across data, models, deployment, security, and ethics.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AICommonMistakesPage,
});

const RESOURCE = {
  id: "ai-common-mistakes",
  title: "Artificial Intelligence — Common Mistakes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "16 min",
  pages: 16,
  lastUpdated: "September 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1800&q=80",
  overfitting: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80",
  workflow: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "beginner", label: "1. Beginner Mistakes" },
  { id: "data", label: "2. Data Preparation Errors" },
  { id: "training", label: "3. Model Training Mistakes" },
  { id: "neural", label: "4. Neural Network Mistakes" },
  { id: "evaluation", label: "5. Evaluation Errors" },
  { id: "deployment", label: "6. Deployment Mistakes" },
  { id: "docs", label: "7. Documentation Mistakes" },
  { id: "security", label: "8. Security Mistakes" },
  { id: "ethics", label: "9. Ethical Mistakes" },
  { id: "final", label: "10. Final Checklist" },
  { id: "review", label: "Common Mistakes Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faq", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

type Mistake = {
  title: string;
  why: string;
  example: string;
  impact: string;
  solution: string;
  prevention: string;
  best: string;
  advice: string;
};

const MISTAKES: Record<string, Mistake[]> = {
  beginner: [
    {
      title: "Jumping to deep learning before understanding basics",
      why: "Popular tutorials showcase deep learning, so beginners skip fundamentals.",
      example: "A learner uses a transformer for a tabular problem where logistic regression would win.",
      impact: "Overkill models, wasted compute, hard-to-debug pipelines.",
      solution: "Learn probability, linear algebra basics, and classical ML before deep learning.",
      prevention: "Follow a roadmap; don't skip baselines.",
      best: "Always try a simple model first.",
      advice: "Depth of understanding beats depth of network.",
    },
    {
      title: "Copy-pasting code without understanding it",
      why: "Working demos feel like progress; understanding takes time.",
      example: "Copying a notebook and swapping datasets without adjusting preprocessing.",
      impact: "Silent bugs, wrong metrics, no ability to fix issues.",
      solution: "Rewrite key sections yourself; annotate every line.",
      prevention: "Explain each snippet in your own words before running.",
      best: "Type it, don't just paste it.",
      advice: "You don't own code you cannot explain.",
    },
  ],
  data: [
    {
      title: "Not exploring the data",
      why: "It's tempting to jump to modelling.",
      example: "Training on a dataset without noticing 30% of a critical column is missing.",
      impact: "Biased models, silent data quality issues in production.",
      solution: "Run EDA: distributions, missingness, correlations, per-class stats.",
      prevention: "Make an EDA notebook a required deliverable.",
      best: "Look before you model.",
      advice: "The data will teach you more than the algorithm.",
    },
    {
      title: "Data leakage",
      why: "Preprocessing on the full dataset before splitting mixes train and test information.",
      example: "Fitting a StandardScaler on all rows, then splitting into train/test.",
      impact: "Inflated offline metrics that collapse in production.",
      solution: "Fit transforms on train only; apply to val/test.",
      prevention: "Use scikit-learn Pipeline; audit for future-time features.",
      best: "Pretend test data does not exist during preprocessing.",
      advice: "If your metric looks too good, look for leakage first.",
    },
    {
      title: "Ignoring class imbalance",
      why: "Accuracy looks fine on imbalanced datasets, hiding the real problem.",
      example: "99% accuracy on a fraud dataset where 1% of examples are fraud.",
      impact: "Model never predicts the minority class; business impact is zero.",
      solution: "Use F1, PR-AUC, recall at fixed precision; resample or reweight.",
      prevention: "Always report per-class metrics.",
      best: "Pick a metric that matches the decision.",
      advice: "Accuracy lies. F1 rarely does.",
    },
  ],
  training: [
    {
      title: "Training too long without validation",
      why: "Loss keeps going down; it feels like progress.",
      example: "Ignoring val loss while train loss falls — model overfits by epoch 20.",
      impact: "Overfit models that generalise poorly.",
      solution: "Track val loss, early-stop on plateau, save best checkpoint.",
      prevention: "Never look only at training loss.",
      best: "Val loss is your source of truth.",
      advice: "Stop when generalisation stops improving.",
    },
    {
      title: "Bad learning rate",
      why: "Defaults from tutorials rarely fit your data.",
      example: "LR too high → loss diverges; LR too low → glacial convergence.",
      impact: "Wasted time, worse final metrics.",
      solution: "Use an LR finder or a scheduler like cosine/one-cycle.",
      prevention: "Sweep 3–5 LRs before long runs.",
      best: "Choose LR before choosing architecture.",
      advice: "The learning rate is the single most important hyperparameter.",
    },
  ],
  neural: [
    {
      title: "Not normalising inputs",
      why: "Neural nets converge poorly on unscaled features.",
      example: "Mixing raw pixel values (0–255) with normalised features (0–1).",
      impact: "Unstable training, exploding or vanishing gradients.",
      solution: "Standardise features; normalise images to [0, 1] or with dataset stats.",
      prevention: "Include normalisation in the model or pipeline.",
      best: "Same normalisation at train and inference time.",
      advice: "If training is unstable, check the inputs first.",
    },
    {
      title: "Wrong activation on the output",
      why: "Copy-pasting from a similar model.",
      example: "Softmax on a binary classifier that should use sigmoid.",
      impact: "Broken loss, wrong probabilities, confused metrics.",
      solution: "Match final activation to the task and the loss function.",
      prevention: "Write the loss and activation together, not separately.",
      best: "Binary → sigmoid + BCE; multi-class → softmax + CE.",
      advice: "Activation and loss are a matched pair.",
    },
    {
      title: "No regularisation on a small dataset",
      why: "Big models memorise easily.",
      example: "A 100M-parameter network on 2k training examples.",
      impact: "Overfitting; useless generalisation.",
      solution: "Reduce capacity, add dropout / weight decay, use data augmentation.",
      prevention: "Right-size the model to the data.",
      best: "Prefer the smallest model that hits your bar.",
      advice: "More data usually beats more parameters.",
    },
  ],
  evaluation: [
    {
      title: "Tuning hyperparameters on the test set",
      why: "It's the metric you care about, so it's tempting.",
      example: "Iterating on test-set F1 to pick a threshold.",
      impact: "Optimistic bias; production performs worse than reported.",
      solution: "Tune on validation only; test is a one-shot.",
      prevention: "Freeze test set at the start of the project.",
      best: "Test set is opened at the end, not the middle.",
      advice: "Every peek at the test set costs you generalisation.",
    },
    {
      title: "Reporting a single number without confidence",
      why: "Point estimates look decisive.",
      example: "\"Accuracy = 87%.\" What's the CI?",
      impact: "You cannot tell if a change is real or noise.",
      solution: "Bootstrap CIs; run multiple seeds; report mean ± std.",
      prevention: "Include CIs in every experiment report.",
      best: "A point estimate is a rumour; a CI is a fact.",
      advice: "Beat the CI, not the mean.",
    },
  ],
  deployment: [
    {
      title: "Serving skew between training and inference",
      why: "Preprocessing lives in two places.",
      example: "Training pipeline strips accents; inference API doesn't.",
      impact: "Silent accuracy degradation in production.",
      solution: "Package preprocessing with the model; share code between train and serve.",
      prevention: "Add integration tests comparing train-time and serve-time outputs.",
      best: "One preprocessing pipeline, two entry points.",
      advice: "Assume any duplicated logic will diverge.",
    },
    {
      title: "No rollback plan",
      why: "New model looks better in offline evals.",
      example: "A regression ships and stays live because rolling back is a manual chore.",
      impact: "Extended outages of quality, not just uptime.",
      solution: "Feature-flag every model version; automate rollback on guardrails.",
      prevention: "Rehearse rollback in a game day.",
      best: "Rollback in seconds, not hours.",
      advice: "Deployment is done when rollback is one click away.",
    },
  ],
  docs: [
    {
      title: "No model card",
      why: "Documentation feels like optional work.",
      example: "A model in production with no record of its training data or metrics.",
      impact: "Impossible audits; every incident starts from scratch.",
      solution: "Publish a model card at each release; keep it in the repo.",
      prevention: "Definition-of-done includes a model card.",
      best: "If it's not in the model card, it doesn't exist.",
      advice: "Future-you is the primary user of documentation.",
    },
    {
      title: "Undocumented data lineage",
      why: "Data pipelines evolve faster than docs.",
      example: "\"Where does column X come from?\" — no one knows.",
      impact: "Impossible root-cause analysis when quality drops.",
      solution: "Track lineage automatically (OpenLineage, DataHub).",
      prevention: "Reject PRs that add columns without a source.",
      best: "Every feature has an owner and an origin.",
      advice: "Lineage is a debugging accelerant.",
    },
  ],
  security: [
    {
      title: "Trusting model inputs",
      why: "Inputs feel like data, not attack surface.",
      example: "A user pastes a crafted prompt that jailbreaks the assistant.",
      impact: "Data leaks, policy violations, brand damage.",
      solution: "Treat inputs as untrusted; sanitize; use policy layers.",
      prevention: "Threat-model each new endpoint.",
      best: "Least privilege for the model, always.",
      advice: "Assume adversarial users at design time.",
    },
    {
      title: "Leaking secrets into prompts or logs",
      why: "Convenient debugging.",
      example: "API keys printed to logs during a batch job.",
      impact: "Compromised credentials, forced rotation, incident response.",
      solution: "Redact PII and secrets before logging; use structured logging.",
      prevention: "Log-scanning CI check.",
      best: "Log events, not payloads.",
      advice: "Debug locally; observe in production.",
    },
  ],
  ethics: [
    {
      title: "Skipping fairness evaluation",
      why: "Aggregate metrics look fine.",
      example: "A hiring model with 90% overall accuracy but 60% on a minority subgroup.",
      impact: "Discriminatory outcomes and legal exposure.",
      solution: "Evaluate by subgroup; publish gaps; mitigate before shipping.",
      prevention: "Fairness metrics in the release checklist.",
      best: "No release without subgroup metrics.",
      advice: "Fairness is a launch requirement, not a follow-up.",
    },
    {
      title: "Overclaiming capabilities",
      why: "Marketing pressure and demo bias.",
      example: "\"Our AI diagnoses X\" when it only screens for triage.",
      impact: "User harm, regulatory issues, loss of trust.",
      solution: "Publish intended-use and limits alongside claims.",
      prevention: "Legal + product review of claims.",
      best: "Undersell, then over-deliver.",
      advice: "The user's trust is your longest-lived asset.",
    },
  ],
};

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

function AICommonMistakesPage() {
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
              <AlertTriangle className="h-5 w-5" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-rose-700/70 to-orange-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-sky-500/90 text-white hover:bg-sky-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Learn from mistakes</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            The mistakes beginners and intermediate learners repeat most often — why they happen, what
            they cost, and how to prevent them for good.
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
              <li>Identify common AI mistakes.</li>
              <li>Understand their causes.</li>
              <li>Learn practical solutions.</li>
              <li>Improve project quality.</li>
              <li>Develop better AI engineering habits.</li>
              <li>Prevent recurrence with checklists.</li>
            </ul>
          </Callout>

          <MistakeSection id="beginner" title="1. Beginner Mistakes" items={MISTAKES.beginner} />

          <MistakeSection id="data" title="2. Data Preparation Errors" items={MISTAKES.data}>
            <figure>
              <img src={IMG.overfitting} alt="Data quality funnel diagram" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Data quality funnel: raw → validated → featurised → split.</figcaption>
            </figure>
          </MistakeSection>

          <MistakeSection id="training" title="3. Model Training Mistakes" items={MISTAKES.training} />

          <MistakeSection id="neural" title="4. Neural Network Mistakes" items={MISTAKES.neural}>
            <figure>
              <img src={IMG.workflow} alt="Neural network training loop" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Neural network training loop: forward → loss → backward → optimiser step.</figcaption>
            </figure>
          </MistakeSection>

          <MistakeSection id="evaluation" title="5. Evaluation Errors" items={MISTAKES.evaluation} />
          <MistakeSection id="deployment" title="6. Deployment Mistakes" items={MISTAKES.deployment} />
          <MistakeSection id="docs" title="7. Documentation Mistakes" items={MISTAKES.docs} />
          <MistakeSection id="security" title="8. Security Mistakes" items={MISTAKES.security} />
          <MistakeSection id="ethics" title="9. Ethical Mistakes" items={MISTAKES.ethics} />

          <Section id="final" title="10. Final Checklist">
            <ul className="not-prose grid gap-2 sm:grid-cols-2">
              {[
                "Baseline exists and is beaten",
                "Splits are stratified and frozen",
                "No leakage from label or future data",
                "Val loss tracked; best checkpoint saved",
                "Metrics reported with confidence intervals",
                "Preprocessing packaged with the model",
                "Model card and datasheet published",
                "Drift dashboards paging an owner",
                "Rollback rehearsed in the last quarter",
                "Fairness metrics reviewed",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {x}</li>
              ))}
            </ul>
          </Section>

          <Section id="review" title="Common Mistakes Review">
            <h4>Top 20 Mistakes</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Jumping to deep learning too early.</li>
              <li>Copy-pasting code without understanding.</li>
              <li>Skipping EDA.</li>
              <li>Data leakage.</li>
              <li>Ignoring class imbalance.</li>
              <li>Wrong metric for the task.</li>
              <li>Training only on training loss.</li>
              <li>Poor learning-rate choice.</li>
              <li>No input normalisation.</li>
              <li>Wrong output activation.</li>
              <li>No regularisation on small data.</li>
              <li>Tuning on the test set.</li>
              <li>Reporting single-number metrics.</li>
              <li>Train/serve preprocessing skew.</li>
              <li>No rollback plan.</li>
              <li>Missing model card.</li>
              <li>Undocumented data lineage.</li>
              <li>Trusting model inputs.</li>
              <li>Leaking secrets in logs.</li>
              <li>Skipping fairness evaluation.</li>
            </ol>

            <h4>Prevention Checklist</h4>
            <ul>
              <li>Adopt a project template with baselines and tests.</li>
              <li>Add data quality checks in CI.</li>
              <li>Track experiments in a registry.</li>
              <li>Require model card + rollback rehearsal to ship.</li>
              <li>Automate subgroup metric reporting.</li>
            </ul>

            <h4>Self Assessment</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Did I compare against a naive baseline?</li>
              <li>Did I check for leakage before reporting metrics?</li>
              <li>Did I evaluate fairness across subgroups?</li>
              <li>Can I roll back this model in under one minute?</li>
              <li>Would a new teammate understand the model card?</li>
            </ol>

            <h4>Reflection Questions</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Which of these mistakes have I made in the last month?</li>
              <li>Which mistake would cost my team the most if it shipped?</li>
              <li>Which habit will I change first — and how will I measure it?</li>
            </ol>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>Data leakage</strong> — training on information not available at prediction time.</li>
              <li><strong>Overfitting</strong> — memorising training data instead of learning patterns.</li>
              <li><strong>Train/serve skew</strong> — differences between training and inference preprocessing.</li>
              <li><strong>Model card</strong> — a standard document describing a model's purpose, data, and limits.</li>
              <li><strong>PR-AUC</strong> — area under the precision-recall curve; useful for imbalanced tasks.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="I'm early in my journey — which mistake should I focus on first?">Data leakage and skipping the baseline. Both silently ruin projects and are cheap to fix once you know to look for them.</FAQ>
            <FAQ q="Is overfitting always bad?">A little overfitting can be acceptable if the deployment distribution matches training closely. Judge by validation and production metrics, not by a rule of thumb.</FAQ>
            <FAQ q="How do I convince my team to add a rollback plan?">Rehearse a real rollback during a game day. The first time it works in seconds, the team never ships without one again.</FAQ>
          </Section>

          <References />
          <Disclaimer />
          <RelatedResources />
        </article>
      </div>
    </div>
  );
}

/* ---------------- Sub-components ---------------- */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24"><h2>{title}</h2>{children}</section>;
}
function MistakeSection({ id, title, items, children }: { id: string; title: string; items: Mistake[]; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2>{title}</h2>
      {children}
      <div className="not-prose grid gap-4">
        {items.map((m) => (
          <div key={m.title} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <p className="flex items-start gap-2 text-sm font-semibold"><AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500 shrink-0" /> {m.title}</p>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why it happens</dt><dd className="mt-0.5">{m.why}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Real-world example</dt><dd className="mt-0.5">{m.example}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Impact</dt><dd className="mt-0.5">{m.impact}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solution</dt><dd className="mt-0.5">{m.solution}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prevention tips</dt><dd className="mt-0.5">{m.prevention}</dd></div>
              <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Best practice</dt><dd className="mt-0.5">{m.best}</dd></div>
            </dl>
            <p className="mt-3 rounded-lg bg-primary/5 p-3 text-xs"><strong>Expert advice:</strong> {m.advice}</p>
          </div>
        ))}
      </div>
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
      <p className="mt-2">This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, and trusted educational resources. Artificial Intelligence is a rapidly evolving field, and technologies may change over time. Learners should consult official documentation for the latest and most accurate information.</p>
      <p className="mt-2">All trademarks, logos, product names, and intellectual property belong to their respective owners. EduNova AI does not claim ownership of any third-party materials referenced in this resource.</p>
    </section>
  );
}
function RelatedResources() {
  const items = [
    { title: "Artificial Intelligence — Best Practices", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-best-practices" },
    { title: "Artificial Intelligence — Real-world Case Study", tag: "AI & Data", time: "22 min", to: "/resources/read/ai-real-world-case-study" },
    { title: "Artificial Intelligence — Practice Questions", tag: "AI & Data", time: "29 min", to: "/resources/read/ai-practice-questions" },
    { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" },
    { title: "Artificial Intelligence — Beginner Guide", tag: "AI & Data", time: "14 min", to: "/resources/read/ai-beginner-guide" },
    { title: "Artificial Intelligence — Cheat Sheet", tag: "AI & Data", time: "3 min", to: "/resources/read/ai-cheat-sheet" },
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
