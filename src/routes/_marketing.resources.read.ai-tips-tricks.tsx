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
  Keyboard,
  Lightbulb,
  Printer,
  Share2,
  Sparkles,
  Tag,
  Wand2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-tips-tricks")({
  head: () => {
    const title = "Artificial Intelligence — Tips & Tricks | EduNova AI";
    const desc =
      "Productivity tips, prompt patterns, dev shortcuts, and expert workflows to ship AI projects faster with fewer mistakes.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AITipsTricksPage,
});

const RESOURCE = {
  id: "ai-tips-tricks",
  title: "Artificial Intelligence — Tips & Tricks",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 8,
  lastUpdated: "June 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  prompt: "https://images.unsplash.com/photo-1677691824213-c6220ea34e94?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "productivity", label: "1. Productivity Tips" },
  { id: "learning", label: "2. Learning Shortcuts" },
  { id: "dev", label: "3. AI Development Tricks" },
  { id: "prompt", label: "4. Prompt Engineering Tips" },
  { id: "workflow", label: "5. Workflow Optimization" },
  { id: "organization", label: "6. Project Organization" },
  { id: "debugging", label: "7. Debugging Tips" },
  { id: "performance", label: "8. Performance Tips" },
  { id: "collab", label: "9. Collaboration Tips" },
  { id: "checklist", label: "10. Final Productivity Checklist" },
  { id: "review", label: "Tips Review" },
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

function AITipsTricksPage() {
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
              <Zap className="h-5 w-5" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/85 via-orange-700/75 to-rose-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-sky-500/90 text-white hover:bg-sky-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">50+ Tips</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            The practical shortcuts, prompt patterns, and workflows that separate slow AI projects from
            fast, reliable ones.
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
              <li>Improve productivity across AI workflows.</li>
              <li>Learn efficient AI development patterns.</li>
              <li>Reduce common mistakes and re-work.</li>
              <li>Speed up prototyping and iteration.</li>
              <li>Apply professional collaboration practices.</li>
              <li>Master prompt patterns that consistently work.</li>
            </ul>
          </Callout>

          <TipList
            id="productivity"
            title="1. Productivity Tips"
            tips={[
              "Timebox exploration to 45-minute cycles with a written outcome before starting.",
              "Keep a single running notebook per experiment thread; branch instead of overwriting.",
              "Automate boilerplate with a cookiecutter template for every new project.",
              "Use `just` or `make` for repeated commands — never remember shell incantations twice.",
              "Track everything with Weights & Biases or MLflow — don't rely on scroll history.",
            ]}
          >
            <figure>
              <img src={IMG.workflow} alt="Focused AI workflow" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">A tight loop: hypothesis → experiment → measure → decide.</figcaption>
            </figure>
          </TipList>

          <TipList
            id="learning"
            title="2. Learning Shortcuts"
            tips={[
              "Read the abstract, then the results, then the method — save the intro for last.",
              "Reproduce a paper's smallest experiment before its biggest.",
              "Teach every new concept in a blog post — you learn twice.",
              "Watch code walkthroughs at 1.5×; take notes in your own words.",
              "Spaced-repetition (Anki) the top 200 ML terms; the fluency pays daily.",
            ]}
          />

          <TipList
            id="dev"
            title="3. AI Development Tricks"
            tips={[
              "Cache expensive computations to disk (joblib, diskcache) before optimising anything.",
              "Wrap every dataset in a small class that returns typed batches — no dict soup.",
              "Freeze your best baseline; every experiment must beat it or die.",
              "Use `torch.compile` and mixed precision by default on modern GPUs.",
              "Prefer `polars` over `pandas` for datasets larger than a few million rows.",
              "Always log seeds, config, git SHA, and dataset hash for every run.",
            ]}
          />

          <TipList
            id="prompt"
            title="4. Prompt Engineering Tips"
            tips={[
              "Put the instruction first, the context second, and the input last.",
              "Show 1–3 examples of the exact input/output format you want.",
              "Ask for structured output (JSON schema) whenever downstream code consumes it.",
              "Force reasoning with 'Think step by step' — but hide the reasoning from users.",
              "Split large tasks: extract → transform → generate. Each step gets its own prompt.",
              "Test prompts on a fixed evaluation set; regression-test on every prompt change.",
              "Give the model an explicit 'if uncertain, reply UNKNOWN' escape hatch.",
            ]}
          >
            <figure>
              <img src={IMG.prompt} alt="Prompt engineering patterns" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Anatomy of a strong prompt: role, task, examples, constraints, format.</figcaption>
            </figure>
          </TipList>

          <TipList
            id="workflow"
            title="5. Workflow Optimization"
            tips={[
              "Adopt a monorepo layout: `data/ src/ notebooks/ scripts/ tests/ configs/`.",
              "Small PRs — one experiment per branch, one hypothesis per PR.",
              "Automate model card + eval table generation on every merge.",
              "Never train a model whose result you cannot immediately visualise.",
              "Ship a shadow deployment before rolling any model to real users.",
            ]}
          />

          <TipList
            id="organization"
            title="6. Project Organization"
            tips={[
              "Freeze the config schema early (Hydra/Pydantic) — it forces clear thinking.",
              "Version data + code + model + prompt as one artefact.",
              "Keep a `RESULTS.md` per experiment with metrics, plots, and lessons.",
              "Document 'what would break this' next to every design decision.",
              "Prefix experiment folders with a date so sort order is chronology.",
            ]}
          />

          <TipList
            id="debugging"
            title="7. Debugging Tips"
            tips={[
              "Overfit a batch of 8 examples first — if you cannot, the pipeline is broken.",
              "Check label distribution before optimising the model.",
              "Log gradient norms; NaN gradients almost always precede loss NaNs by a few steps.",
              "When results look 'too good', suspect leakage before celebrating.",
              "For LLMs, print the exact prompt sent to the API before the response — half of bugs live here.",
            ]}
          />

          <TipList
            id="performance"
            title="8. Performance Tips"
            tips={[
              "Quantise weights (int8 / int4) before shrinking the architecture.",
              "Batch requests: even 4× batching often halves cost with no latency hit.",
              "Cache identical prompts (semantic + exact); cache TTL is a business decision.",
              "Distill a strong teacher into a small student for latency-critical paths.",
              "Move preprocessing to the GPU when data-loading is the bottleneck.",
            ]}
          />

          <TipList
            id="collab"
            title="9. Collaboration Tips"
            tips={[
              "Async by default: send a Loom instead of scheduling a meeting.",
              "Post a weekly 'what's working / what's stuck' note — visibility compounds.",
              "Pair on debugging; solo on writing.",
              "Review model cards, not just code.",
              "Own the eval, not the model. Whoever owns the metric wins the argument.",
            ]}
          />

          <TipList
            id="checklist"
            title="10. Final Productivity Checklist"
            tips={[
              "Config, seed, and git SHA logged for every run.",
              "Metric with confidence interval — never a single number.",
              "Baseline beaten (or explained why it wasn't).",
              "Failure modes documented with sample inputs.",
              "Rollback path defined before rollout.",
              "Cost per query measured and monitored.",
              "Latency at p95 and p99 checked, not just mean.",
              "Prompts tested on a fixed evaluation set.",
              "Data drift and prediction drift monitored.",
              "One-line summary of the change written for the changelog.",
            ]}
          />

          <Section id="review" title="Tips Review">
            <h4>Top 50 Tips (Rapid Reference)</h4>
            <ol className="list-decimal grid gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              <li>Overfit one batch first.</li>
              <li>Log seed + git SHA every run.</li>
              <li>Freeze your best baseline.</li>
              <li>Confidence intervals over point metrics.</li>
              <li>Structured JSON output from LLMs.</li>
              <li>Few-shot with 1–3 examples.</li>
              <li>Split large prompts into stages.</li>
              <li>Cache prompts and embeddings.</li>
              <li>Batch inference by default.</li>
              <li>Quantise before shrinking.</li>
              <li>Distill for latency.</li>
              <li>Version data + code + model.</li>
              <li>Automate model cards.</li>
              <li>Small PRs, one hypothesis each.</li>
              <li>Monorepo layout.</li>
              <li>Track experiments centrally.</li>
              <li>Document failure modes.</li>
              <li>Plan the rollback.</li>
              <li>Monitor p95/p99 latency.</li>
              <li>Measure cost per query.</li>
              <li>Watch feature drift.</li>
              <li>Watch prediction drift.</li>
              <li>Shadow-deploy before rollout.</li>
              <li>Never train without visualising.</li>
              <li>Print the exact LLM prompt.</li>
              <li>Redact PII from logs.</li>
              <li>Never inject secrets into prompts.</li>
              <li>Async by default.</li>
              <li>Send Looms, not meetings.</li>
              <li>Own the eval, not the model.</li>
              <li>Time-box exploration.</li>
              <li>Ship a small demo weekly.</li>
              <li>Blog what you learn.</li>
              <li>Reproduce the smallest paper experiment first.</li>
              <li>Spaced-repetition ML vocabulary.</li>
              <li>Use polars for big tables.</li>
              <li>Mixed precision by default.</li>
              <li>Torch.compile modern models.</li>
              <li>Cache to disk before optimising.</li>
              <li>Guardrail 'if unsure, say UNKNOWN'.</li>
              <li>Regression-test prompts.</li>
              <li>Config schema with Pydantic/Hydra.</li>
              <li>RESULTS.md per experiment.</li>
              <li>Chronology-first folder naming.</li>
              <li>Review model cards.</li>
              <li>Pair on debugging.</li>
              <li>Solo on writing.</li>
              <li>Automate boilerplate with a template.</li>
              <li>`just`/`make` for repeated commands.</li>
              <li>One-line changelog per merge.</li>
            </ol>

            <h4>Productivity Checklist</h4>
            <ul>
              <li>Do I know what "done" looks like before I start?</li>
              <li>Is the smallest failing test defined?</li>
              <li>Is there a single dashboard I can look at?</li>
              <li>Do I have a rollback plan?</li>
            </ul>

            <h4>Daily Workflow Guide</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Morning: review yesterday's metrics + open PRs.</li>
              <li>Deep-work block: one hypothesis, one experiment.</li>
              <li>Lunch: read 1 paper abstract + 1 blog post.</li>
              <li>Afternoon: write up, plot, share.</li>
              <li>End of day: log wins, blockers, tomorrow's first task.</li>
            </ol>

            <h4>Quick Reference Sheet</h4>
            <div className="not-prose overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60"><tr><th className="p-2 text-left">Problem</th><th className="p-2 text-left">First move</th></tr></thead>
                <tbody className="[&_td]:border-t [&_td]:p-2">
                  <tr><td>Loss NaN</td><td>Lower LR, check gradient norms, add clipping.</td></tr>
                  <tr><td>Model too slow</td><td>Batch + quantise + cache. Distill last.</td></tr>
                  <tr><td>Model too big</td><td>Distill, prune, then quantise.</td></tr>
                  <tr><td>Bad LLM output</td><td>Print the prompt, add examples, force JSON.</td></tr>
                  <tr><td>Metric too good</td><td>Search for data leakage before shipping.</td></tr>
                  <tr><td>Drift alarm</td><td>Compare recent PSI/KS to baseline; retrain if beyond threshold.</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>Timebox</strong> — Fixed slot for a task; forces a decision.</li>
              <li><strong>Shadow deploy</strong> — Run new model alongside old without serving its output.</li>
              <li><strong>Distillation</strong> — Train a small model to mimic a bigger one.</li>
              <li><strong>Quantisation</strong> — Reduce numerical precision to save memory and speed inference.</li>
              <li><strong>Prompt regression</strong> — Test suite that fails when a prompt change breaks past outputs.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="Do these tips apply to solo developers?">Yes — even more so. Solo devs benefit most from templates, automation, and disciplined logging.</FAQ>
            <FAQ q="Where should I start?">Pick 3 tips this week: overfit-one-batch, log seed + git SHA, and structured JSON output. Compound from there.</FAQ>
            <FAQ q="How do I know a tip is worth adopting?">Try it for a week and measure the impact on cycle time or error rate. Keep what pays back.</FAQ>
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
  return <section id={id} className="scroll-mt-24"><h2 className="flex items-center gap-2"><Wand2 className="h-5 w-5 text-primary" />{title}</h2>{children}</section>;
}
function TipList({ id, title, tips, children }: { id: string; title: string; tips: string[]; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-center gap-2"><Keyboard className="h-5 w-5 text-primary" />{title}</h2>
      {children}
      <ul className="not-prose grid gap-2">
        {tips.map((t, i) => (
          <li key={i} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
            <span className="text-sm">{t}</span>
          </li>
        ))}
      </ul>
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
        <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Carnegie Mellon SCS</a></li>
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
    { title: "Artificial Intelligence — Learning Roadmap", tag: "AI & Data", time: "9 min", to: "/resources/read/ai-learning-roadmap" },
    { title: "Artificial Intelligence — Best Practices", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-best-practices" },
    { title: "Artificial Intelligence — Common Mistakes", tag: "AI & Data", time: "16 min", to: "/resources/read/ai-common-mistakes" },
    { title: "Artificial Intelligence — Cheat Sheet", tag: "AI & Data", time: "6 min", to: "/resources/read/ai-cheat-sheet" },
    { title: "Artificial Intelligence — Project Guide", tag: "AI & Data", time: "22 min", to: "/resources/read/ai-project-guide" },
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
