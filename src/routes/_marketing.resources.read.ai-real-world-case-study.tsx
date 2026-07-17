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

export const Route = createFileRoute("/_marketing/resources/read/ai-real-world-case-study")({
  head: () => {
    const title = "Artificial Intelligence — Real-world Case Study | EduNova AI";
    const desc =
      "How a real team used AI to solve a business problem: end-to-end lifecycle from challenge to deployment, evaluation, KPIs, and lessons learned.";
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
  component: AIRealWorldCaseStudyPage,
});

const RESOURCE = {
  id: "ai-real-world-case-study",
  title: "Artificial Intelligence — Real-world Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "22 min",
  pages: 26,
  lastUpdated: "October 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  architecture: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  metrics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
};

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "company", label: "1. Company Background" },
  { id: "problem", label: "2. Business Problem" },
  { id: "requirements", label: "3. Business Requirements" },
  { id: "solution", label: "4. AI Solution Design" },
  { id: "data", label: "5. Data Collection" },
  { id: "model", label: "6. Model Development" },
  { id: "architecture", label: "7. System Architecture" },
  { id: "deployment", label: "8. Deployment Strategy" },
  { id: "challenges", label: "9. Challenges Faced" },
  { id: "results", label: "10. Results & KPIs" },
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

function AIRealWorldCaseStudyPage() {
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
              <Building2 className="h-5 w-5" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-violet-700/75 to-fuchsia-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-amber-500/90 text-white hover:bg-amber-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Real-world Case Study</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            End-to-end case study of an AI system deployed to production: business challenge, solution
            architecture, engineering decisions, measurable outcomes, and lessons learned.
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
              <li>Understand real-world AI implementation.</li>
              <li>Analyze business problems using AI.</li>
              <li>Learn solution architecture.</li>
              <li>Evaluate project outcomes.</li>
              <li>Understand deployment challenges.</li>
              <li>Translate KPIs into engineering decisions.</li>
            </ul>
          </Callout>

          <Section id="company" title="1. Company Background">
            <p><strong>NovaMart</strong> is a mid-sized e-commerce retailer serving 4.2 million active customers across 12 countries. It ships ~180,000 orders per day across 9 warehouses with a catalogue of ~2.3M SKUs. Customer support and returns costs were rising faster than revenue, and stock-outs on high-demand SKUs during promotions were eroding CSAT.</p>
            <p>The engineering org has ~140 engineers, with a small (6-person) Data Science team embedded in the Growth division. Prior ML efforts were limited to rules-based recommenders. Leadership wanted a repeatable AI capability, not a one-off experiment.</p>
          </Section>

          <Section id="problem" title="2. Business Problem">
            <p>Two problems dominated leadership dashboards:</p>
            <ol>
              <li><strong>Demand forecasting</strong> was manual and grid-based, producing frequent stock-outs (top-500 SKUs missing 6.4% of demand-days) and overstock in slow movers.</li>
              <li><strong>Support tickets</strong> were routed by keyword rules; 38% of tickets were misrouted, adding an average of 11 hours to first response.</li>
            </ol>
            <p>Both problems shared a root cause: decisions were based on rules over aggregates, not on learned patterns from historical events at the SKU, customer, and channel level.</p>
          </Section>

          <Section id="requirements" title="3. Business Requirements">
            <div className="not-prose overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60"><tr><th className="p-2 text-left">Requirement</th><th className="p-2 text-left">Target</th></tr></thead>
                <tbody className="[&_td]:border-t [&_td]:p-2">
                  <tr><td>Forecast horizon</td><td>7, 14, 28-day rolling per SKU × warehouse</td></tr>
                  <tr><td>Forecast accuracy (MAPE)</td><td>&le; 18% top-500 SKUs, &le; 25% long-tail</td></tr>
                  <tr><td>Ticket auto-routing accuracy</td><td>&ge; 92% top-10 intents</td></tr>
                  <tr><td>Model refresh cadence</td><td>Daily incremental, weekly full retrain</td></tr>
                  <tr><td>Inference latency (routing)</td><td>&le; 200 ms p95</td></tr>
                  <tr><td>Data residency</td><td>EU + APAC regional isolation</td></tr>
                  <tr><td>Auditability</td><td>Full lineage from feature → prediction</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="solution" title="4. AI Solution Design">
            <p>The team scoped a two-track solution:</p>
            <ul>
              <li><strong>Track A — Demand Forecasting.</strong> A hybrid model combining a gradient-boosted decision tree (LightGBM) for tabular signals and a temporal convolutional network (TCN) for sequence residuals.</li>
              <li><strong>Track B — Ticket Routing.</strong> A fine-tuned transformer (DistilBERT) plus lightweight rules for compliance-sensitive intents.</li>
            </ul>
            <p>Both tracks share a common feature store, evaluation harness, and monitoring stack — the "AI platform layer" that made the second model 3× cheaper to build than the first.</p>
            <figure>
              <img src={IMG.architecture} alt="Reference AI system architecture diagram" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Reference AI system layout: data plane, model plane, and serving plane.</figcaption>
            </figure>
          </Section>

          <Section id="data" title="5. Data Collection">
            <ul>
              <li><strong>Transactional data:</strong> 3 years of order history, 1.1B rows, partitioned by month × region.</li>
              <li><strong>Catalogue features:</strong> SKU attributes, category taxonomy, price history, and promotion calendar.</li>
              <li><strong>External signals:</strong> Public holidays, weather, and search-trend indices via a vendor API.</li>
              <li><strong>Support corpus:</strong> 2.7M anonymised tickets with agent-assigned intent labels.</li>
            </ul>
            <p><strong>Quality controls:</strong> schema contracts on ingest, PII scrubbing, deduplication, and label-noise audits sampling 0.5% of tickets weekly.</p>
          </Section>

          <Section id="model" title="6. Model Development">
            <ul>
              <li>Baselines: naive seasonal + moving average for forecasting; TF-IDF + logistic regression for routing.</li>
              <li>Iteration 1: LightGBM lifted MAPE from 34% → 21%; DistilBERT lifted routing accuracy from 74% → 89%.</li>
              <li>Iteration 2: TCN residual model + calibrated quantile outputs reduced tail stock-outs by 41%.</li>
              <li>Hyperparameter search via Bayesian optimisation with early stopping; runs tracked in an experiment registry.</li>
            </ul>
            <KeyBox>
              <strong>Golden rule</strong> — a change ships only if it beats the champion on the frozen holdout <em>and</em> the shadow-traffic canary for 7 days.
            </KeyBox>
          </Section>

          <Section id="architecture" title="7. System Architecture">
            <p>Three planes, each independently scalable:</p>
            <ul>
              <li><strong>Data plane:</strong> S3 lakehouse + a Parquet-based feature store; nightly Spark ETL.</li>
              <li><strong>Model plane:</strong> Kubernetes-scheduled training jobs, GPU pool for the transformer, CPU pool for boosted trees.</li>
              <li><strong>Serving plane:</strong> gRPC inference servers behind an autoscaling API gateway; edge cache for hot SKUs.</li>
            </ul>
            <p>Observability spans data quality (Great Expectations), model quality (drift + PSI on features), and system health (latency, error rate, saturation).</p>
          </Section>

          <Section id="deployment" title="8. Deployment Strategy">
            <ol>
              <li><strong>Shadow mode</strong> — models score live traffic without acting for 2 weeks.</li>
              <li><strong>Canary</strong> — 5% of traffic served by the new model, gated by KPI guardrails.</li>
              <li><strong>Progressive rollout</strong> — 25%, 50%, 100% with automatic rollback on guardrail breach.</li>
              <li><strong>Kill switch</strong> — feature flag flips serving back to the previous champion in &lt; 30 s.</li>
            </ol>
          </Section>

          <Section id="challenges" title="9. Challenges Faced">
            <ul>
              <li><strong>Concept drift</strong> during a category expansion caused a 4-day forecast-quality dip; caught by PSI alarms.</li>
              <li><strong>Label leakage</strong> from a "resolution note" field inflated offline routing accuracy by ~5 points; removed after audit.</li>
              <li><strong>Cold-start SKUs</strong> had no history; solved with a category-level prior and attribute embeddings.</li>
              <li><strong>Regulatory review</strong> for automated actions on refunds required a documented human-in-the-loop step.</li>
            </ul>
          </Section>

          <Section id="results" title="10. Results & KPIs">
            <figure>
              <img src={IMG.metrics} alt="Business KPI improvements chart" className="rounded-xl border border-border/60" />
              <figcaption className="text-xs text-muted-foreground">Post-rollout business KPIs across 6 months.</figcaption>
            </figure>
            <div className="not-prose overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60"><tr><th className="p-2 text-left">KPI</th><th className="p-2 text-left">Before</th><th className="p-2 text-left">After</th></tr></thead>
                <tbody className="[&_td]:border-t [&_td]:p-2">
                  <tr><td>Forecast MAPE (top-500)</td><td>34%</td><td>17.2%</td></tr>
                  <tr><td>Stock-outs (demand-days)</td><td>6.4%</td><td>2.1%</td></tr>
                  <tr><td>Ticket routing accuracy</td><td>62%</td><td>93.1%</td></tr>
                  <tr><td>Median first response</td><td>14.8 h</td><td>3.6 h</td></tr>
                  <tr><td>Annualised savings</td><td>—</td><td>~$6.8M</td></tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="lessons" title="11. Lessons Learned">
            <ul>
              <li>Invest in the platform layer <em>before</em> the second model — the first model justifies it.</li>
              <li>Ship shadow evaluations early; offline metrics lie in the presence of drift.</li>
              <li>Feature-store contracts saved weeks when a vendor changed a schema silently.</li>
              <li>Business stakeholders need a KPI dashboard, not a model dashboard.</li>
            </ul>
          </Section>

          <Section id="future" title="12. Future Improvements">
            <ul>
              <li>Cross-warehouse transfer learning for regional cold-start categories.</li>
              <li>Uncertainty-aware safety stock via full quantile forecasts.</li>
              <li>LLM-assisted ticket summarisation to shorten agent handle time.</li>
              <li>Automated feature discovery via a lightweight AutoML layer.</li>
            </ul>
          </Section>

          <Section id="review" title="Case Study Review">
            <h4>Discussion Questions</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Why was a hybrid LightGBM + TCN model preferred over a single deep model?</li>
              <li>How does shadow mode reduce deployment risk?</li>
              <li>Which KPI would you monitor to detect concept drift first?</li>
              <li>What could go wrong if the routing model auto-refunded orders without a human check?</li>
            </ol>
            <h4>Reflection Activities</h4>
            <ul>
              <li>Map an AI use case from your own domain to the 12-step lifecycle above.</li>
              <li>Draft the KPI table your leadership would accept before greenlighting the project.</li>
            </ul>
            <h4>Business Insights</h4>
            <p>ROI came from platform reuse, not model novelty. Track B benefited from Track A's monitoring, CI, and feature store — cutting time-to-production nearly in half.</p>
            <h4>Key Learnings</h4>
            <ul>
              <li>Ship the smallest useful model first, then iterate.</li>
              <li>Design for rollback from day one.</li>
              <li>Guardrails are cheaper than incidents.</li>
            </ul>
            <h4>Success Factors</h4>
            <ul>
              <li>Executive sponsor with a business KPI on the line.</li>
              <li>Embedded data engineers alongside data scientists.</li>
              <li>Clear owner for the feature store.</li>
            </ul>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>MAPE</strong> — Mean Absolute Percentage Error; a scale-free forecast accuracy metric.</li>
              <li><strong>PSI</strong> — Population Stability Index; detects distribution drift in features.</li>
              <li><strong>Shadow mode</strong> — A model scores live traffic but its output is not acted on.</li>
              <li><strong>Canary</strong> — A small percentage of live traffic routed to a new version for safety.</li>
              <li><strong>Feature store</strong> — A centralised, versioned store of ML features for offline and online use.</li>
              <li><strong>TCN</strong> — Temporal Convolutional Network for sequence modelling.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="Is this a real company?">
              NovaMart is a composite based on public patterns from multiple mid-sized retailers. Numbers are illustrative but consistent with published industry benchmarks.
            </FAQ>
            <FAQ q="Why not a single deep model for forecasting?">
              Boosted trees dominate tabular signals; a smaller sequence model on residuals is cheaper to train and easier to explain than a large monolithic network.
            </FAQ>
            <FAQ q="How were labels for routing collected?">
              Agents assigned intents post-resolution; label noise was audited weekly, and ambiguous intents were merged after inter-rater agreement dropped below 0.8.
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
      <p className="mt-2">All trademarks, logos, product names, and intellectual property belong to their respective owners. EduNova AI does not claim ownership of any third-party materials referenced in this resource. The case study company is a composite illustration and does not represent any specific real organisation.</p>
    </section>
  );
}
function RelatedResources() {
  const items = [
    { title: "Artificial Intelligence — Project Case Study", tag: "AI & Data", time: "28 min", to: "/resources/read/ai-project-case-study" },
    { title: "Artificial Intelligence — Best Practices", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-best-practices" },
    { title: "Artificial Intelligence — Common Mistakes", tag: "AI & Data", time: "16 min", to: "/resources/read/ai-common-mistakes" },
    { title: "Artificial Intelligence — Project Guide", tag: "AI & Data", time: "25 min", to: "/resources/read/ai-project-guide" },
    { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" },
    { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "70 min", to: "/resources/read/ai-complete-tutorial" },
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
