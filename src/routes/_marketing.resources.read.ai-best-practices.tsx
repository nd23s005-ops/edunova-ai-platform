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
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-best-practices")({
  head: () => {
    const title = "Artificial Intelligence — Best Practices | EduNova AI";
    const desc =
      "Industry-standard best practices for building maintainable, scalable, and production-ready AI: planning, coding standards, testing, deployment, monitoring, security, ethics, and collaboration.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIBestPracticesPage,
});

const RESOURCE = {
  id: "ai-best-practices",
  title: "Artificial Intelligence — Best Practices",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "12 min",
  pages: 14,
  lastUpdated: "February 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  monitoring: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "planning", label: "1. Project Planning" },
  { id: "data", label: "2. Data Quality" },
  { id: "model", label: "3. Model Development" },
  { id: "coding", label: "4. Coding Standards" },
  { id: "docs", label: "5. Documentation" },
  { id: "testing", label: "6. Testing" },
  { id: "deployment", label: "7. Deployment" },
  { id: "monitoring", label: "8. Monitoring" },
  { id: "security", label: "9. Security" },
  { id: "ethics", label: "10. AI Ethics" },
  { id: "collaboration", label: "11. Team Collaboration" },
  { id: "maintenance", label: "12. Maintenance Checklist" },
  { id: "summary", label: "Best Practices Summary" },
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

function AIBestPracticesPage() {
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
              <ShieldCheck className="h-5 w-5" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-emerald-700/70 to-teal-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Production-ready</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            Battle-tested standards for planning, building, shipping, and maintaining AI systems that stay
            healthy after they leave your laptop.
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
              <li>Follow AI development standards.</li>
              <li>Write maintainable AI projects.</li>
              <li>Improve model quality.</li>
              <li>Apply security and ethical practices.</li>
              <li>Build scalable AI systems.</li>
              <li>Ship faster with fewer regressions.</li>
            </ul>
          </Callout>

          <Section id="planning" title="1. Project Planning">
            <p>Every successful AI project starts before a single line of code. Define the <strong>business problem</strong>, the <strong>decision</strong> the model informs, and the <strong>metric</strong> that measures success — in that order. Write a one-page project brief and get sign-off from the stakeholder who owns the KPI.</p>
            <ul>
              <li>Scope in "minimum viable value": what is the smallest useful improvement?</li>
              <li>Define non-goals explicitly to prevent scope creep.</li>
              <li>Estimate data availability before estimating model complexity.</li>
            </ul>
          </Section>

          <Section id="data" title="2. Data Quality">
            <ul>
              <li><strong>Contracts on ingest.</strong> Reject rows that violate schema or type expectations.</li>
              <li><strong>Label audits.</strong> Sample and re-label at least 0.5–1% of records weekly.</li>
              <li><strong>Class balance.</strong> Report per-class counts and mitigation strategy in every report.</li>
              <li><strong>Reproducible splits.</strong> Freeze train/val/test with a hashed seed and document it.</li>
              <li><strong>PII hygiene.</strong> Scrub or hash personal identifiers before training data leaves its source system.</li>
            </ul>
          </Section>

          <Section id="model" title="3. Model Development">
            <ul>
              <li>Always start with a naive baseline; every complex model must beat it.</li>
              <li>Prefer simpler models until the data and metric justify complexity.</li>
              <li>Track every experiment: config, code hash, data hash, metrics.</li>
              <li>Report confidence intervals on metrics, not point estimates.</li>
              <li>Ablate features and layers to prove what actually contributes.</li>
            </ul>
            <figure>
              <img src={IMG.workflow} alt="AI development workflow diagram" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Standard AI development workflow: brief → data → baseline → model → evaluation → ship → monitor.</figcaption>
            </figure>
          </Section>

          <Section id="coding" title="4. Coding Standards">
            <h4>Folder Organization</h4>
            <pre className="not-prose overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100"><code>{`project/
├── data/            # raw + processed (gitignored)
├── src/
│   ├── data/        # loaders, splits
│   ├── features/    # transformations
│   ├── models/      # architectures
│   ├── training/    # loops, schedulers
│   ├── eval/        # metrics, harness
│   └── serve/       # inference API
├── notebooks/       # exploration only
├── tests/
├── configs/         # yaml/hydra
└── docs/`}</code></pre>
            <h4>Naming Conventions</h4>
            <ul>
              <li>snake_case for files, functions, and variables.</li>
              <li>PascalCase for classes and model architectures.</li>
              <li>Prefix experiments with a date: <code>2026-02-14_baseline_lr.py</code>.</li>
            </ul>
            <h4>Version Control</h4>
            <ul>
              <li>One PR per logical change; include experiment link and metric delta.</li>
              <li>Use DVC or Git-LFS for datasets and model weights.</li>
              <li>Tag every deployed model with a semantic version and a data hash.</li>
            </ul>
          </Section>

          <Section id="docs" title="5. Documentation">
            <ul>
              <li>Every model has a <strong>Model Card</strong>: purpose, data, metrics, limits, ethical notes.</li>
              <li>Every dataset has a <strong>Datasheet</strong>: source, provenance, licence, known biases.</li>
              <li>README covers setup, training, evaluation, and deployment commands in that order.</li>
              <li>Docstrings on every public function; type hints on every signature.</li>
            </ul>
          </Section>

          <Section id="testing" title="6. Testing">
            <ul>
              <li><strong>Unit tests</strong> for feature transforms and loss functions.</li>
              <li><strong>Data tests</strong> for schema, ranges, and null rates using Great Expectations or similar.</li>
              <li><strong>Behavioural tests</strong> for invariance (small input changes → small output changes) and directionality.</li>
              <li><strong>Regression tests</strong> against a golden dataset; block merges on unexplained metric drops.</li>
              <li><strong>Load tests</strong> before enabling autoscaling on the inference tier.</li>
            </ul>
          </Section>

          <Section id="deployment" title="7. Deployment">
            <ul>
              <li>Package model + preprocessing together (ONNX, TorchScript, or a container).</li>
              <li>Deploy via shadow → canary → progressive rollout with automatic rollback.</li>
              <li>Feature-flag every model version; be able to switch champions in seconds.</li>
              <li>Version the API contract; never break clients on a model swap.</li>
              <li>Right-size hardware: batch on CPU when latency allows, GPU only when justified.</li>
            </ul>
          </Section>

          <Section id="monitoring" title="8. Monitoring">
            <figure>
              <img src={IMG.monitoring} alt="AI monitoring dashboard illustration" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Three layers of monitoring: system health, data quality, and model quality.</figcaption>
            </figure>
            <ul>
              <li><strong>System</strong>: latency, error rate, saturation, cost.</li>
              <li><strong>Data</strong>: distribution drift (PSI), missing rate, schema violations.</li>
              <li><strong>Model</strong>: prediction distribution, calibration, downstream KPI proxy.</li>
              <li>Alarms should point at owners and runbooks, not just dashboards.</li>
            </ul>
          </Section>

          <Section id="security" title="9. Security">
            <ul>
              <li>Sanitize inputs; treat model inputs as untrusted.</li>
              <li>Protect against prompt injection for LLM systems; never trust retrieved documents blindly.</li>
              <li>Rate-limit and authenticate inference endpoints.</li>
              <li>Encrypt data at rest and in transit; rotate secrets.</li>
              <li>Threat-model your pipeline: poisoning, evasion, model extraction, membership inference.</li>
            </ul>
          </Section>

          <Section id="ethics" title="10. AI Ethics">
            <ul>
              <li>Evaluate fairness across protected subgroups; publish the numbers.</li>
              <li>Provide human oversight for decisions with material impact.</li>
              <li>Explain limits clearly; do not oversell capabilities.</li>
              <li>Give users a path to contest automated outcomes.</li>
              <li>Comply with local regulations (GDPR, EU AI Act, sector-specific rules).</li>
            </ul>
          </Section>

          <Section id="collaboration" title="11. Team Collaboration">
            <ul>
              <li>Weekly experiment review with a shared metric bar.</li>
              <li>Pair data scientists with data engineers; the platform is the product.</li>
              <li>Definition-of-done includes tests, docs, monitoring, and a rollback plan.</li>
              <li>Post-incident reviews are blameless and always produce written actions.</li>
            </ul>
          </Section>

          <Section id="maintenance" title="12. Maintenance Checklist">
            <ul className="not-prose grid gap-2 sm:grid-cols-2">
              {[
                "Retrain cadence documented and running",
                "Feature store contracts up to date",
                "Model card refreshed each release",
                "Drift dashboards reviewed weekly",
                "Alert routing tested each quarter",
                "Dependency and CVE scan clean",
                "Backup and DR drill within 6 months",
                "Cost budget vs. actual reviewed monthly",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> {x}</li>
              ))}
            </ul>
          </Section>

          <Section id="summary" title="Best Practices Summary">
            <div className="not-prose grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/5 p-4">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Do's</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  <li>Start from a business decision, not a model.</li>
                  <li>Ship a naive baseline before anything fancy.</li>
                  <li>Track every experiment and dataset version.</li>
                  <li>Deploy with shadow + canary + rollback.</li>
                  <li>Monitor system, data, and model layers.</li>
                  <li>Document with model cards and datasheets.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-red-500/40 bg-red-500/5 p-4">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">Don'ts</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  <li>Don't skip the baseline.</li>
                  <li>Don't tune on the test set.</li>
                  <li>Don't ship without a rollback plan.</li>
                  <li>Don't monitor only accuracy — monitor drift too.</li>
                  <li>Don't hide model limitations from users.</li>
                  <li>Don't let notebooks reach production.</li>
                </ul>
              </div>
            </div>
            <h4 className="mt-6">Recommended Tools</h4>
            <div className="not-prose overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60"><tr><th className="p-2 text-left">Purpose</th><th className="p-2 text-left">Tools</th></tr></thead>
                <tbody className="[&_td]:border-t [&_td]:p-2">
                  <tr><td>Experiment tracking</td><td>MLflow, Weights &amp; Biases, Neptune</td></tr>
                  <tr><td>Data versioning</td><td>DVC, LakeFS, Delta Lake</td></tr>
                  <tr><td>Feature store</td><td>Feast, Tecton, Vertex Feature Store</td></tr>
                  <tr><td>Data quality</td><td>Great Expectations, Soda, Deequ</td></tr>
                  <tr><td>Serving</td><td>TorchServe, TF Serving, Triton, KServe</td></tr>
                  <tr><td>Monitoring</td><td>Prometheus, Grafana, Evidently, Arize</td></tr>
                </tbody>
              </table>
            </div>
            <h4 className="mt-6">Review Checklist</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Does the model card exist and match the deployed version?</li>
              <li>Are metrics reported with confidence intervals?</li>
              <li>Is there a rollback path documented and rehearsed?</li>
              <li>Do drift dashboards page an owner, not a dashboard?</li>
              <li>Have fairness metrics been reviewed for this release?</li>
            </ol>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>Model Card</strong> — a standard document describing a model's purpose, data, metrics, and limits.</li>
              <li><strong>Datasheet</strong> — analogous document for a dataset covering provenance and known biases.</li>
              <li><strong>PSI</strong> — Population Stability Index; detects feature-distribution drift.</li>
              <li><strong>Shadow deployment</strong> — running a new model on live traffic without acting on its output.</li>
              <li><strong>Feature store</strong> — a versioned, shared store of features for offline and online use.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="How much test data do I need?">Enough that the metric's confidence interval is narrower than the improvement you care about. Start with 10k+ samples for classification and expand until stable.</FAQ>
            <FAQ q="When should I retrain?">On a fixed cadence <em>and</em> whenever drift alarms fire. Automate whichever comes first.</FAQ>
            <FAQ q="Do I really need a feature store for one model?">No — but if you expect a second model within 12 months, the platform investment pays back.</FAQ>
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
    { title: "Artificial Intelligence — Common Mistakes", tag: "AI & Data", time: "16 min", to: "/resources/read/ai-common-mistakes" },
    { title: "Artificial Intelligence — Real-world Case Study", tag: "AI & Data", time: "22 min", to: "/resources/read/ai-real-world-case-study" },
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
