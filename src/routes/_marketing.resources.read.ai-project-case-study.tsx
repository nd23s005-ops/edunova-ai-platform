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
  Building2,
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

export const Route = createFileRoute("/_marketing/resources/read/ai-project-case-study")({
  head: () => {
    const title = "Artificial Intelligence — Project Case Study | EduNova AI";
    const desc =
      "Real-world AI case study: business context, architecture, technology stack, deployment, challenges, results, and lessons learned from taking an AI system to production.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIProjectCaseStudyPage,
});

const RESOURCE = {
  id: "ai-project-case-study",
  title: "Artificial Intelligence — Project Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "28 min",
  pages: 28,
  lastUpdated: "February 2026",
  tags: ["Artificial Intelligence", "Production AI", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  arch: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  metrics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "background", label: "1. Business Background" },
  { id: "problem", label: "2. Problem Statement" },
  { id: "requirements", label: "3. Business Requirements" },
  { id: "solution", label: "4. AI Solution Design" },
  { id: "stack", label: "5. Technology Stack" },
  { id: "architecture", label: "6. System Architecture" },
  { id: "process", label: "7. Development Process" },
  { id: "challenges", label: "8. Challenges" },
  { id: "solutions", label: "9. Solutions" },
  { id: "results", label: "10. Results" },
  { id: "lessons", label: "11. Lessons Learned" },
  { id: "future", label: "12. Future Improvements" },
  { id: "review", label: "Case Study Review" },
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

function AIProjectCaseStudyPage() {
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
    const shareData = { title: RESOURCE.title, text: "AI Project Case Study on EduNova AI", url: typeof window !== "undefined" ? window.location.href : "" };
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
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}><Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></Button>
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-sky-700/75 to-cyan-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-amber-500/90 text-white hover:bg-amber-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Production Case Study</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            A real-world AI project from business problem to production deployment — architecture,
            engineering decisions, challenges, and measurable outcomes.
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
              <li>Understand real-world AI implementations.</li>
              <li>Analyze production architectures.</li>
              <li>Learn engineering decisions.</li>
              <li>Evaluate deployment strategies.</li>
              <li>Interpret project outcomes.</li>
            </ul>
          </Callout>

          <Section id="background" title="1. Business Background">
            <p>
              <strong>Company:</strong> a mid-sized fintech serving small businesses across three regions.
              <br />
              <strong>Team:</strong> two ML engineers, one data engineer, one product manager, and a
              part-time SRE. Timeline: 10 weeks from kickoff to full rollout.
            </p>
            <p>
              <strong>Business Context.</strong> The company loses roughly 1.4% of revenue to fraudulent
              transactions each month. The existing rule-based system produces excessive false positives
              (~18%), causing customer friction and support load.
            </p>
          </Section>

          <Section id="problem" title="2. Problem Statement">
            <p>
              Reduce fraud losses without increasing false positives above 6% while keeping approval latency
              under 250 ms at p95. Success is measured on live traffic against a challenger champion split.
            </p>
          </Section>

          <Section id="requirements" title="3. Business Requirements">
            <ul className="list-disc space-y-1 pl-5">
              <li>Recall ≥ 0.80 on confirmed fraud within 30 days.</li>
              <li>False positive rate ≤ 6% on legitimate transactions.</li>
              <li>Decision latency p95 &lt; 250 ms.</li>
              <li>Explainable decision — top 3 features per score.</li>
              <li>Auditability — every decision reproducible for 12 months.</li>
              <li>Regional data residency compliance.</li>
            </ul>
          </Section>

          <Section id="solution" title="4. AI Solution Design">
            <p>
              A two-stage system: (1) a gradient-boosted classifier (XGBoost) trained on engineered features
              produces a risk score; (2) a lightweight rules layer applies policy overrides (velocity, block
              lists, KYC status). Above a threshold, transactions are held for manual review.
            </p>
            <KeyBox>
              <strong>AI Workflow.</strong> Ingest → feature store lookup → model → policy engine → decision
              → logging → offline retraining loop.
            </KeyBox>
          </Section>

          <Section id="stack" title="5. Technology Stack">
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Language:</strong> Python 3.11; TypeScript on the client SDK.</li>
              <li><strong>Modeling:</strong> XGBoost, scikit-learn, SHAP for explanations.</li>
              <li><strong>Feature store:</strong> Feast on Redis + Postgres.</li>
              <li><strong>Serving:</strong> FastAPI + Gunicorn behind an API gateway.</li>
              <li><strong>Infra:</strong> Kubernetes on AWS; ECR for images; RDS Postgres; MSK Kafka for events.</li>
              <li><strong>MLOps:</strong> MLflow for tracking; DVC for datasets; GitHub Actions for CI/CD.</li>
              <li><strong>Observability:</strong> Prometheus + Grafana; OpenTelemetry traces; Loki for logs.</li>
            </ul>
          </Section>

          <Section id="architecture" title="6. System Architecture">
            <figure className="not-prose my-4 overflow-hidden rounded-2xl border border-border/60">
              <img src={IMG.arch} alt="Production AI architecture" className="w-full" />
              <figcaption className="bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                Figure 1 — Two-stage fraud system: ML score → policy engine → decision, with async retraining.
              </figcaption>
            </figure>
            <h4>Data Pipeline</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Transaction event lands on Kafka.</li>
              <li>Feature service enriches with user, device, merchant, and velocity features.</li>
              <li>Model service scores; SHAP top-3 features returned.</li>
              <li>Policy engine applies overrides; decision emitted back to the payment flow.</li>
              <li>Every decision + features hashed and stored for audit and retraining.</li>
            </ol>
            <h4>Engineering Decisions</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Chose XGBoost over a deep model for interpretability and CPU-only serving.</li>
              <li>Feature parity between train and serve enforced by a shared feature spec.</li>
              <li>Blue/green deploys with automated rollback on latency or error breach.</li>
              <li>Shadow mode for two weeks before champion switch.</li>
            </ul>
          </Section>

          <Section id="process" title="7. Development Process">
            <div className="not-prose grid gap-3 sm:grid-cols-2">
              {[
                ["Weeks 1–2", "Data audit, feature exploration, baseline (rules + LR)."],
                ["Weeks 3–4", "Feature engineering, XGBoost model, calibration."],
                ["Weeks 5–6", "Feature store integration, API, policy engine."],
                ["Weeks 7–8", "Shadow deploy, load test, security review."],
                ["Weeks 9–10", "Champion rollout, runbooks, hand-off to SRE."],
              ].map(([w, d]) => (
                <div key={w} className="rounded-xl border border-border/60 bg-card p-3 text-sm">
                  <p className="font-semibold">{w}</p>
                  <p className="text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="challenges" title="8. Challenges">
            <ul className="list-disc space-y-1 pl-5">
              <li><strong>Class imbalance:</strong> fraud is under 1% of transactions.</li>
              <li><strong>Feature drift:</strong> a new device fingerprint SDK shifted features week over week.</li>
              <li><strong>Latency:</strong> initial p95 was 420 ms — too slow for the checkout SLA.</li>
              <li><strong>Concept drift:</strong> a new attack pattern emerged after week 3 of rollout.</li>
              <li><strong>Explainability:</strong> compliance required reason codes for every decline.</li>
            </ul>
          </Section>

          <Section id="solutions" title="9. Solutions">
            <ul className="list-disc space-y-1 pl-5">
              <li>Combined class weighting with PR-AUC as the primary metric; abandoned accuracy.</li>
              <li>Introduced a data contract on the feature ingestion and drift alarms with backfills.</li>
              <li>Cached user-aggregate features and switched to CPU-optimized XGBoost — p95 dropped to 180 ms.</li>
              <li>Added weekly retraining on the latest 90 days with an automatic promotion gate.</li>
              <li>Adopted SHAP top-3 with a mapped reason-code taxonomy for compliance-friendly outputs.</li>
            </ul>
          </Section>

          <Section id="results" title="10. Results">
            <figure className="not-prose my-4 overflow-hidden rounded-2xl border border-border/60">
              <img src={IMG.metrics} alt="Business outcome metrics" className="w-full" />
              <figcaption className="bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                Figure 2 — Business impact after rollout: lower losses, lower FP rate, faster decisions.
              </figcaption>
            </figure>
            <h4>Performance Metrics</h4>
            <div className="not-prose overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60">
                  <tr><th className="p-2 text-left">Metric</th><th className="p-2 text-left">Before</th><th className="p-2 text-left">After</th></tr>
                </thead>
                <tbody>
                  {[
                    ["Fraud loss / revenue", "1.4%", "0.5%"],
                    ["False-positive rate", "18%", "5.6%"],
                    ["Decision latency (p95)", "n/a (sync rules only)", "180 ms"],
                    ["Manual review volume", "100%", "38%"],
                    ["Recall on confirmed fraud", "0.66", "0.83"],
                  ].map((r) => (
                    <tr key={r[0]} className="border-t border-border/50">{r.map((c, i) => <td key={i} className="p-2 align-top">{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">Estimated annualized savings: ~$4.2M net of infra and team cost.</p>
          </Section>

          <Section id="lessons" title="11. Lessons Learned">
            <ul className="list-disc space-y-1 pl-5">
              <li>Baseline first. The rule + logistic-regression baseline paid for itself in error analysis.</li>
              <li>Feature parity is a hard requirement, not a nice-to-have.</li>
              <li>Shadow mode caught two live bugs invisible in offline eval.</li>
              <li>Reason codes designed early avoid painful compliance reworks.</li>
              <li>Weekly retraining plus drift alarms outperformed a heavier model without them.</li>
            </ul>
            <Callout tone="warning" title="Risk Analysis">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Model failure fallback: revert to rules if latency or error breaches SLO for 5 minutes.</li>
                <li>Adversarial risk: attackers probe the boundary — rate-limit and add per-merchant thresholds.</li>
                <li>Fairness risk: monitor decline rates by geography and merchant tier.</li>
              </ul>
            </Callout>
            <Callout tone="note" title="Security & Scalability">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>All PII hashed at rest; TLS in transit; scoped IAM roles per service.</li>
                <li>Autoscaling on request queue depth with warm pools during peak hours.</li>
                <li>Feature service sharded by user_id hash to bound tail latency.</li>
              </ul>
            </Callout>
          </Section>

          <Section id="future" title="12. Future Improvements">
            <ul className="list-disc space-y-1 pl-5">
              <li>Graph features across merchants and devices for ring-fraud detection.</li>
              <li>Sequence model (transformer) on the last 30 events per user.</li>
              <li>Human-in-the-loop labeling UI to speed up analyst feedback.</li>
              <li>Federated eval across regions to strengthen data residency guarantees.</li>
            </ul>
            <Callout tone="tip" title="Final Recommendations">
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Choose the smallest model that meets business SLOs.</li>
                <li>Design for rollback from day one.</li>
                <li>Invest in the feature store early — it compounds every project after.</li>
              </ul>
            </Callout>
          </Section>

          {/* Case Study Review */}
          <Section id="review" title="Case Study Review">
            <h4>Key Insights</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Business framing decided the metric, and the metric decided the model.</li>
              <li>Feature engineering + explainability outperformed model complexity for this task.</li>
              <li>MLOps discipline (shadow, canary, drift alarms) prevented most outages.</li>
            </ul>
            <h4>Success Factors</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Cross-functional team ownership from week one.</li>
              <li>Clear rollback plan tied to SLO breaches.</li>
              <li>Feature parity between offline and online serving.</li>
            </ul>
            <h4>Mistakes to Avoid</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Optimizing accuracy on imbalanced data.</li>
              <li>Skipping shadow mode to hit an artificial deadline.</li>
              <li>Retraining without a promotion gate.</li>
            </ul>
            <h4>Discussion Questions</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>How would you redesign this system with only 5% of the training data?</li>
              <li>What would push you toward a deep model here?</li>
              <li>How would you evaluate fairness across merchant tiers?</li>
              <li>What if latency budget dropped to 80 ms — what changes?</li>
              <li>Design a challenger model rollout plan without disrupting production.</li>
            </ol>
            <h4>Reflection Activities</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Draft a 1-page runbook for a fraud-model latency alarm.</li>
              <li>List three signals you would monitor for drift.</li>
              <li>Write the compliance response for a wrongly declined transaction.</li>
            </ol>
          </Section>

          <div className="mt-8 rounded-2xl border-l-4 border-emerald-500/60 bg-emerald-500/10 p-6 not-prose">
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              <CheckCircle2 className="h-5 w-5" /> Key Takeaways
            </p>
            <ul className="mt-2 grid list-disc gap-y-1 pl-5 text-sm sm:grid-cols-2 sm:gap-x-8">
              <li>Real AI wins come from framing, features, and MLOps — not just modeling.</li>
              <li>Explainability is often a requirement, not a bonus.</li>
              <li>Shadow and canary rollouts pay for themselves.</li>
              <li>Every decision should be auditable and reproducible.</li>
              <li>Design for drift; assume the world will change.</li>
              <li>Fallbacks and rollbacks are core features of the system.</li>
            </ul>
          </div>

          <Section id="glossary" title="Glossary">
            <ul className="grid gap-2 sm:grid-cols-2 not-prose">
              {[
                ["Feature Store", "Centralized service that serves consistent features to training and inference."],
                ["Shadow Deploy", "Running a new model on live traffic without acting on its output."],
                ["Champion / Challenger", "Comparing a production model against a candidate on live traffic splits."],
                ["Drift", "Change in data or concept over time that degrades model performance."],
                ["SLO", "Service-level objective for latency, availability, or error rate."],
                ["SHAP", "Feature-attribution method used to explain individual predictions."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-lg border border-border/60 bg-card p-3 text-sm">
                  <span className="font-semibold">{t}</span> — {d}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="Why not use deep learning from the start?">
              For tabular data with strong engineered features, gradient boosting typically matches or beats
              deep models, is faster to serve, and is easier to explain to compliance stakeholders.
            </FAQ>
            <FAQ q="How was the model kept fresh?">
              Weekly retraining on the latest 90 days with an automated promotion gate on PR-AUC, calibration,
              and fairness metrics.
            </FAQ>
            <FAQ q="What happens on a model outage?">
              The policy engine falls back to a conservative rule set, and on-call is paged with a runbook
              that includes rollback and comms steps.
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
        This case study is fictional and provided for educational purposes only. Any resemblance to real
        companies, teams, or systems is coincidental. Content has been compiled from official documentation,
        research papers, academic publications, and trusted educational resources. Artificial Intelligence
        is a rapidly evolving field; learners should consult official documentation for the latest information.
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
    { title: "Artificial Intelligence — Project Guide", tag: "AI & Data", time: "25 min", to: "/resources/read/ai-project-guide" },
    { title: "Artificial Intelligence — Sample Exercises", tag: "AI & Data", time: "23 min", to: "/resources/read/ai-sample-exercises" },
    { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "70 min", to: "/resources/read/ai-complete-tutorial" },
    { title: "Artificial Intelligence — Step-by-Step Learning Guide", tag: "AI & Data", time: "26 min", to: "/resources/read/ai-step-by-step-learning-guide" },
    { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" },
    { title: "Artificial Intelligence — Answer Key", tag: "AI & Data", time: "24 min", to: "/resources/read/ai-answer-key" },
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
