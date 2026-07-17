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
  Rocket,
  Share2,
  Sparkles,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-project-guide")({
  head: () => {
    const title = "Artificial Intelligence — Project Guide | EduNova AI";
    const desc =
      "End-to-end AI project guide: planning, data, architecture, training, testing, deployment, and portfolio-ready presentation, with milestones and a review checklist.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIProjectGuidePage,
});

const RESOURCE = {
  id: "ai-project-guide",
  title: "Artificial Intelligence — Project Guide",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "25 min",
  pages: 28,
  lastUpdated: "February 2026",
  tags: ["Artificial Intelligence", "AI Projects", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  arch: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  workflow: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "overview", label: "1. Project Overview" },
  { id: "problem", label: "2. Problem Statement" },
  { id: "requirements", label: "3. Requirements" },
  { id: "dataset", label: "4. Dataset Selection" },
  { id: "design", label: "5. System Design" },
  { id: "architecture", label: "6. AI Architecture" },
  { id: "roadmap", label: "7. Development Roadmap" },
  { id: "training", label: "8. Model Training" },
  { id: "testing", label: "9. Testing Strategy" },
  { id: "deployment", label: "10. Deployment" },
  { id: "eval", label: "11. Performance Evaluation" },
  { id: "checklist", label: "12. Final Review Checklist" },
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

function AIProjectGuidePage() {
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
    const shareData = { title: RESOURCE.title, text: "AI Project Guide on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(shareData.url); toast.success("Link copied to clipboard"); }
    } catch { /* cancelled */ }
  };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const print = () => window.print();
  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      <style>{`
        @media print { .no-print { display: none !important; } .print-article { padding: 0 !important; } body { background: white !important; } }
      `}</style>

      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1 bg-transparent" aria-hidden>
        <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <Rocket className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}>
              <Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}>
              <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}><Share2 className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Share</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}><Printer className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Print</span></Button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-indigo-700/75 to-violet-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-amber-500/90 text-white hover:bg-amber-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Hands-on Project</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A complete guide to plan, design, build, test, deploy, and evaluate an end-to-end AI project —
            with milestones, deliverables, and a portfolio-ready review checklist.
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
                <a key={t.id} href={`#${t.id}`} className={`block rounded-md px-2 py-1.5 transition ${activeId === t.id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article ref={articleRef} className="print-article prose prose-slate max-w-none dark:prose-invert">
          <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
            <ul className="mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              <li>Understand AI project planning.</li>
              <li>Build an end-to-end AI solution.</li>
              <li>Learn project architecture.</li>
              <li>Follow software development best practices.</li>
              <li>Prepare production-ready AI projects.</li>
            </ul>
          </Callout>

          <Section id="overview" title="1. Project Overview">
            <p>
              An AI project delivers a working system that turns raw data into useful predictions or actions.
              This guide walks a canonical project — a <strong>customer-support intent classifier</strong> —
              from problem framing to production. The same structure applies to computer vision, NLP,
              tabular, and GenAI projects.
            </p>
            <KeyBox>
              <strong>Project Goals</strong>: (1) classify inbound tickets into 8 intents with F1 ≥ 0.85,
              (2) respond in &lt; 300 ms, (3) ship a monitored REST endpoint and a small demo UI.
            </KeyBox>
          </Section>

          <Section id="problem" title="2. Problem Statement">
            <p>Frame the problem in one paragraph: <em>who</em> is affected, <em>what</em> decision improves,
            <em> how</em> success will be measured, and <em>what</em> the baseline is today.</p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>User: customer-support agent triaging tickets.</li>
              <li>Decision: which queue and priority to assign.</li>
              <li>Metric: macro-F1 on held-out labeled tickets.</li>
              <li>Baseline: keyword rules (current F1 ≈ 0.62).</li>
            </ol>
          </Section>

          <Section id="requirements" title="3. Requirements">
            <h4>Functional Requirements</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>REST endpoint <code>POST /predict</code> that returns intent + confidence.</li>
              <li>Batch inference for historical tickets.</li>
              <li>Admin dashboard for accuracy and drift.</li>
              <li>Audit log of predictions (input hash, output, timestamp).</li>
            </ul>
            <h4>Non-functional Requirements</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Latency: p95 &lt; 300 ms.</li>
              <li>Throughput: 50 RPS steady, 200 RPS burst.</li>
              <li>Availability: 99.5% monthly.</li>
              <li>Privacy: PII redaction before storage.</li>
              <li>Security: token auth, request signing, rate limits.</li>
            </ul>
          </Section>

          <Section id="dataset" title="4. Dataset Selection">
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Source</strong>: 90 days of anonymized tickets from the CRM (≈ 40k rows).</li>
              <li><strong>Labels</strong>: 8 intents; hand-labeled by a support lead + spot-check by a peer.</li>
              <li><strong>Splits</strong>: 70% train / 15% val / 15% test with time-based split to avoid leakage.</li>
              <li><strong>Quality</strong>: language filter, dedupe, PII scrub, minimum length filter.</li>
            </ul>
            <Callout tone="warning" title="Data Pitfalls">
              Time-based splits reveal drift; a random split can leak future info via near-duplicates. Always
              check for label balance and inter-annotator agreement.
            </Callout>
          </Section>

          <Section id="design" title="5. System Design">
            <figure className="not-prose my-4 overflow-hidden rounded-2xl border border-border/60">
              <img src={IMG.arch} alt="AI system architecture" className="w-full" />
              <figcaption className="bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                Figure 1 — Service layout: client → API gateway → inference service → model registry + logging.
              </figcaption>
            </figure>
            <h4>Folder Structure</h4>
            <pre><code>{`ai-project/
├─ data/            # raw, interim, processed
├─ notebooks/       # exploration only
├─ src/
│  ├─ data/         # loaders, cleaning
│  ├─ features/     # feature builders
│  ├─ models/       # training & inference
│  ├─ api/          # FastAPI service
│  └─ eval/         # metrics, reports
├─ tests/
├─ configs/
├─ docker/
└─ README.md`}</code></pre>
            <h4>Technology Stack</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Python 3.11, PyTorch or Hugging Face Transformers</li>
              <li>FastAPI + Uvicorn for serving</li>
              <li>PostgreSQL for logs; Redis for rate-limits and caching</li>
              <li>Docker + a managed cloud runtime (AWS ECS / GCP Cloud Run / Azure Container Apps)</li>
              <li>MLflow or Weights &amp; Biases for experiment tracking</li>
            </ul>
          </Section>

          <Section id="architecture" title="6. AI Architecture">
            <p>Two candidate architectures, picked based on latency and accuracy budgets:</p>
            <ol className="list-decimal space-y-1 pl-5">
              <li><strong>Baseline</strong>: TF-IDF + Logistic Regression. Fast, interpretable, easy to ship.</li>
              <li><strong>Neural</strong>: Fine-tuned <code>distilbert-base-uncased</code> classifier head.</li>
            </ol>
            <p>Serve the smallest model that meets the metric. Baseline first, upgrade only if needed.</p>
            <h4>API Planning</h4>
            <pre><code>{`POST /predict
Body: { "text": "My invoice is wrong" }
200:  { "intent": "billing", "confidence": 0.94, "model_version": "v3" }`}</code></pre>
            <h4>Database Design</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li><code>predictions(id, input_hash, intent, confidence, model_version, ts)</code></li>
              <li><code>feedback(prediction_id, correct_intent, agent_id, ts)</code></li>
              <li><code>drift_metrics(day, feature, score)</code></li>
            </ul>
          </Section>

          <Section id="roadmap" title="7. Development Roadmap">
            <figure className="not-prose my-4 overflow-hidden rounded-2xl border border-border/60">
              <img src={IMG.workflow} alt="AI development roadmap" className="w-full" />
              <figcaption className="bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                Figure 2 — End-to-end workflow: problem → data → model → deploy → monitor.
              </figcaption>
            </figure>
            <div className="not-prose grid gap-3 sm:grid-cols-2">
              {[
                ["Week 1", "Problem framing, data audit, baseline"],
                ["Week 2", "Feature engineering, initial model, error analysis"],
                ["Week 3", "Model iteration, hyperparameter tuning, calibration"],
                ["Week 4", "API, tests, containerization"],
                ["Week 5", "Staging deploy, load test, security review"],
                ["Week 6", "Production rollout, monitoring, docs, demo"],
              ].map(([w, d]) => (
                <div key={w} className="rounded-xl border border-border/60 bg-card p-3 text-sm">
                  <p className="font-semibold">{w}</p>
                  <p className="text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="training" title="8. Model Training">
            <ul className="list-disc space-y-1 pl-5">
              <li>Version datasets — never overwrite raw data.</li>
              <li>Log every experiment: config, metrics, git hash, seed.</li>
              <li>Use cross-validation for small datasets; hold-out for large.</li>
              <li>Track calibration (reliability diagram, expected calibration error).</li>
            </ul>
            <pre><code>{`# Pseudocode — training loop
for epoch in range(EPOCHS):
    for batch in loader:
        loss = model.loss(batch)
        loss.backward()
        optim.step(); optim.zero_grad()
    val_f1 = evaluate(model, val_loader)
    if val_f1 > best: save(model)`}</code></pre>
          </Section>

          <Section id="testing" title="9. Testing Strategy">
            <h4>Testing Checklist</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Unit tests for data cleaning and feature builders.</li>
              <li>Contract tests for the API (input schema, output ranges).</li>
              <li>Model tests: minimum acceptance F1, no regression vs. baseline.</li>
              <li>Bias tests: parity across languages, regions, and product tiers.</li>
              <li>Load test: 200 RPS burst with p95 &lt; 300 ms.</li>
            </ul>
          </Section>

          <Section id="deployment" title="10. Deployment">
            <h4>Deployment Guide</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Package the service in Docker with a pinned Python version.</li>
              <li>Push image to your container registry with a semver tag.</li>
              <li>Deploy to staging; run smoke + integration tests.</li>
              <li>Shadow-deploy for 24 hours; compare predictions vs. baseline.</li>
              <li>Canary 5% → 25% → 100% traffic with automated rollback thresholds.</li>
              <li>Enable dashboards for latency, error rate, drift, and feedback.</li>
            </ol>
            <Callout tone="tip" title="Best Practices">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Store model artifacts in a registry with versions and lineage.</li>
                <li>Use feature flags to switch models without redeploying.</li>
                <li>Automate rollback on error-rate spikes and drift alarms.</li>
              </ul>
            </Callout>
          </Section>

          <Section id="eval" title="11. Performance Evaluation">
            <ul className="list-disc space-y-1 pl-5">
              <li>Report macro-F1, per-class F1, and confusion matrix.</li>
              <li>Track calibration and error slices by language and tenure.</li>
              <li>Compare online metrics vs. offline metrics weekly.</li>
              <li>Establish a review cadence and drift SLOs.</li>
            </ul>
            <Callout tone="warning" title="Common Mistakes">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Optimizing accuracy on imbalanced classes.</li>
                <li>Reporting only aggregate metrics — always inspect slices.</li>
                <li>No feedback loop from production back to training data.</li>
                <li>Storing PII in logs without redaction.</li>
              </ul>
            </Callout>
          </Section>

          <Section id="checklist" title="12. Final Review Checklist">
            <div className="not-prose grid gap-2 sm:grid-cols-2">
              {[
                "Problem statement is one paragraph and metric-backed.",
                "Data lineage is documented; splits are time-aware.",
                "Baseline exists and is beaten by the chosen model.",
                "Experiments are tracked and reproducible.",
                "Tests cover data, model, and API layers.",
                "Latency, throughput, and availability meet SLOs.",
                "PII is redacted; auth and rate-limits are enforced.",
                "Monitoring covers latency, errors, drift, and fairness.",
                "Runbooks, dashboards, and on-call are set up.",
                "README and demo cover setup, run, and evaluate.",
                "Model card and data card are published.",
                "Portfolio narrative highlights impact and trade-offs.",
              ].map((c) => (
                <label key={c} className="flex cursor-pointer items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" />
                  <span>{c}</span>
                </label>
              ))}
            </div>
            <Callout tone="tip" title="Portfolio Presentation Tips">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Lead with the problem and business impact, not the model.</li>
                <li>Show one graph — the metric that mattered most — and defend it.</li>
                <li>Include a two-minute demo video and a clear README.</li>
                <li>Talk about trade-offs and what you would change next.</li>
              </ul>
            </Callout>
            <Callout tone="note" title="Maintenance Plan">
              Retrain quarterly, review drift monthly, and re-evaluate the acceptance metric each release.
              Document ownership, on-call, and rollback procedures.
            </Callout>
          </Section>

          <div className="mt-8 rounded-2xl border-l-4 border-emerald-500/60 bg-emerald-500/10 p-6 not-prose">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="h-5 w-5" /> Key Takeaways
            </p>
            <ul className="mt-2 grid list-disc gap-y-1 pl-5 text-sm sm:grid-cols-2 sm:gap-x-8">
              <li>Framing beats modeling — spend real time on the problem statement.</li>
              <li>Ship a baseline first; upgrade only if it fails to meet the target.</li>
              <li>Time-based splits and error slicing are non-negotiable.</li>
              <li>Testing spans data, model, and API — not just code.</li>
              <li>Monitoring is a feature; deploy the dashboards with the model.</li>
              <li>Every artifact — data, model, config — is versioned.</li>
            </ul>
          </div>

          <Section id="glossary" title="Glossary">
            <ul className="grid gap-2 sm:grid-cols-2 not-prose">
              {[
                ["Baseline", "Simplest model that solves the task — the bar to beat."],
                ["Drift", "Change in data distribution over time that degrades models."],
                ["Model Registry", "System for versioning and promoting trained models."],
                ["Canary", "Rollout that sends a small % of traffic to a new version."],
                ["SLO", "Service Level Objective — target for latency, error rate, etc."],
                ["Model Card", "Document describing intended use, metrics, and limits."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-lg border border-border/60 bg-card p-3 text-sm">
                  <span className="font-semibold">{t}</span> — {d}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="How big should my dataset be?">
              Depends on the task. For text classification, hundreds of labeled examples per class can already
              beat a keyword baseline; deep models usually need thousands.
            </FAQ>
            <FAQ q="Should I start with a big model?">
              No. Start with the smallest model that plausibly works. Upgrade only if it fails the target.
            </FAQ>
            <FAQ q="How do I know when to retrain?">
              Trigger retraining on drift alarms, accuracy drops, or a scheduled cadence — whichever fires first.
            </FAQ>
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
function KeyBox({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-4 rounded-xl border-l-4 border-primary/70 bg-primary/5 p-4 text-sm">{children}</div>;
}
function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="not-prose my-2 rounded-xl border border-border/60 bg-card p-4">
      <summary className="cursor-pointer text-sm font-semibold">{q}</summary>
      <div className="mt-2 text-sm text-muted-foreground">{children}</div>
    </details>
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
  const defaultIcon: Record<string, React.ReactNode> = {
    tip: <Lightbulb className="h-5 w-5" />, info: <Info className="h-5 w-5" />, note: <Info className="h-5 w-5" />, warning: <Info className="h-5 w-5" />, success: <CheckCircle2 className="h-5 w-5" />,
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
        This resource is provided for educational purposes only. The content has been compiled from official
        documentation, research papers, academic publications, and trusted educational resources.
        Artificial Intelligence is a rapidly evolving field; learners should consult official documentation
        for the latest information.
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
    { title: "Artificial Intelligence — Project Case Study", tag: "AI & Data", time: "28 min", to: "/resources/read/ai-project-case-study" },
    { title: "Artificial Intelligence — Sample Exercises", tag: "AI & Data", time: "23 min", to: "/resources/read/ai-sample-exercises" },
    { title: "Artificial Intelligence — Practice Questions", tag: "AI & Data", time: "29 min", to: "/resources/read/ai-practice-questions" },
    { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "70 min", to: "/resources/read/ai-complete-tutorial" },
    { title: "Artificial Intelligence — Step-by-Step Learning Guide", tag: "AI & Data", time: "26 min", to: "/resources/read/ai-step-by-step-learning-guide" },
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
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
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
