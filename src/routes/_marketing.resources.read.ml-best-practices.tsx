import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-best-practices",
  title: "Machine Learning — Best Practices",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "18 min",
  pages: 21,
  lastUpdated: "April 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1800&q=80",
  heroSubtitle:
    "Industry-standard practices for building maintainable, scalable, secure, and production-ready ML systems — from project planning through MLOps monitoring.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "planning", label: "1. Project Planning" },
  { id: "dataset", label: "2. Dataset Management" },
  { id: "features", label: "3. Feature Engineering" },
  { id: "development", label: "4. Model Development" },
  { id: "coding", label: "5. Coding Standards" },
  { id: "vcs", label: "6. Version Control" },
  { id: "tracking", label: "7. Experiment Tracking" },
  { id: "evaluation", label: "8. Model Evaluation" },
  { id: "deployment", label: "9. Deployment" },
  { id: "monitoring", label: "10. Monitoring" },
  { id: "security", label: "11. Security" },
  { id: "documentation", label: "12. Documentation" },
  { id: "collaboration", label: "13. Team Collaboration" },
  { id: "maintenance", label: "14. Maintenance Checklist" },
  { id: "review", label: "Best Practices Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Common Mistakes", tag: "AI & Data", time: "13 min" },
  { title: "Machine Learning — Real-world Case Study", tag: "AI & Data", time: "24 min" },
  { title: "Machine Learning — Project Guide", tag: "AI & Data", time: "24 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MLBestPracticesPage,
});

function MLBestPracticesPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Follow professional ML development standards used at scale.</li>
            <li>Improve model quality, maintainability, and reproducibility.</li>
            <li>Learn deployment and monitoring strategies that survive real load.</li>
            <li>Build scalable, secure ML systems with MLOps discipline.</li>
            <li>Apply best practices across the entire lifecycle.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=80" caption="Figure 1 — MLOps lifecycle: plan → data → build → deploy → monitor → iterate." />
      </Section>

      <Section id="planning" title="1. Project Planning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Define one primary business metric and one primary model metric — no more.</li>
          <li>Write a one-page project charter: users, non-goals, success threshold, risks.</li>
          <li>Prototype end-to-end (data → model → API) in week 1 before optimising any step.</li>
          <li>Budget deployment and monitoring cost from day zero, not after launch.</li>
        </ul>
      </Section>

      <Section id="dataset" title="2. Dataset Management">
        <ul className="list-disc space-y-1 pl-5">
          <li>Version every dataset (DVC / lakeFS) — a model without a dataset hash is not reproducible.</li>
          <li>Split train/val/test <em>before</em> any exploration to avoid leakage.</li>
          <li>Document schema, provenance, licences, and PII fields in a datasheet.</li>
          <li>Never mutate raw data — write derived tables in a separate layer.</li>
        </ul>
      </Section>

      <Section id="features" title="3. Feature Engineering">
        <ul className="list-disc space-y-1 pl-5">
          <li>Compute features in one place — a feature store — shared by training and serving.</li>
          <li>Prefer stable, human-readable feature names (<code>orders_30d_count</code>).</li>
          <li>Track feature importance; drop features that add &lt; 0.001 metric lift.</li>
          <li>Guard against leakage: exclude any post-outcome field from training.</li>
        </ul>
      </Section>

      <Section id="development" title="4. Model Development">
        <ul className="list-disc space-y-1 pl-5">
          <li>Start with a strong baseline (logistic regression / gradient boosting).</li>
          <li>Only introduce complexity that pays for itself on validation.</li>
          <li>Set a random seed and log framework versions for every run.</li>
          <li>Prefer proven libraries (Scikit-learn, XGBoost, LightGBM, PyTorch) over custom code.</li>
        </ul>
      </Section>

      <Section id="coding" title="5. Coding Standards">
        <p>Recommended folder structure:</p>
        <Code lang="text">{`ml-project/
├── data/            # raw, interim, processed (git-ignored)
├── notebooks/       # exploration only
├── src/
│   ├── data/        # loaders, validators
│   ├── features/    # transformers
│   ├── models/      # train, predict
│   ├── serve/       # FastAPI app
│   └── utils/
├── tests/
├── configs/         # YAML / Hydra
├── Dockerfile
├── pyproject.toml
└── README.md`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>Type-hint every public function; enforce with <code>mypy --strict</code>.</li>
          <li>Format with <code>ruff</code> + <code>black</code>; lint in CI, not in review.</li>
          <li>Keep notebooks out of production paths — promote code to <code>src/</code>.</li>
        </ul>
        <Code>{`def train_model(
    X: pd.DataFrame,
    y: pd.Series,
    params: dict[str, Any],
    *,
    seed: int = 42,
) -> lgb.Booster:
    """Train a LightGBM classifier with deterministic seeding."""
    ...`}</Code>
      </Section>

      <Section id="vcs" title="6. Version Control">
        <ul className="list-disc space-y-1 pl-5">
          <li>Git for code, DVC/lakeFS for data, MLflow registry for models — three coordinated stores.</li>
          <li>Trunk-based development with short-lived branches and required PR review.</li>
          <li>Conventional commits (<code>feat:</code>, <code>fix:</code>, <code>chore:</code>) for changelog automation.</li>
          <li>Tag releases with the training dataset hash + model version.</li>
        </ul>
      </Section>

      <Section id="tracking" title="7. Experiment Tracking">
        <ul className="list-disc space-y-1 pl-5">
          <li>Log every run: params, metrics, artifacts, git SHA, dataset hash.</li>
          <li>Use MLflow / Weights & Biases / Comet — pick one and stick with it.</li>
          <li>Compare runs with fixed splits; never trust a single seed.</li>
        </ul>
        <Code>{`import mlflow
with mlflow.start_run(run_name="lgbm_v3"):
    mlflow.log_params(params)
    mlflow.log_metric("val_auc", auc)
    mlflow.sklearn.log_model(model, "model")`}</Code>
      </Section>

      <Section id="evaluation" title="8. Model Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Report on multiple metrics — AUC alone is rarely enough.</li>
          <li>Evaluate on <em>slices</em> (region, device, cohort) to spot fairness issues.</li>
          <li>Use temporally held-out data to reflect production drift.</li>
          <li>Report confidence intervals via bootstrap resampling.</li>
        </ul>
      </Section>

      <Section id="deployment" title="9. Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li>Package models with <code>MLmodel</code> or ONNX for framework independence.</li>
          <li>Serve behind a versioned API contract; deprecate old versions on a schedule.</li>
          <li>Roll out via canary → blue-green; automate rollback on SLO breach.</li>
          <li>Load-test at 3× peak; measure p95/p99, not the mean.</li>
        </ul>
        <p><strong>Minimal CI/CD for ML:</strong> lint → unit tests → data validation → model tests → training smoke → build image → deploy → post-deploy checks.</p>
      </Section>

      <Section id="monitoring" title="10. Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li>Track three layers: <em>service health</em> (latency, errors), <em>data drift</em> (PSI, KS), <em>model quality</em> (delayed labels).</li>
          <li>Alert on drift <em>before</em> quality — quality signals arrive late.</li>
          <li>Keep a shadow model in production to catch silent regressions.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" caption="Figure 2 — Monitoring dashboard: service SLOs, feature drift, and delayed-label quality trend." />
      </Section>

      <Section id="security" title="11. Security">
        <ul className="list-disc space-y-1 pl-5">
          <li>Never store PII in feature stores without tokenisation.</li>
          <li>Encrypt model artefacts at rest; sign them for tamper detection.</li>
          <li>Rate-limit and authenticate every prediction endpoint.</li>
          <li>Threat-model adversarial inputs and prompt-injection for LLM features.</li>
        </ul>
      </Section>

      <Section id="documentation" title="12. Documentation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every model has a Model Card: purpose, data, metrics, limitations, owners.</li>
          <li>Every dataset has a Datasheet: source, schema, licence, known biases.</li>
          <li>Every deployment has a Runbook: how to rollback, retrain, page an owner.</li>
        </ul>
      </Section>

      <Section id="collaboration" title="13. Team Collaboration">
        <ul className="list-disc space-y-1 pl-5">
          <li>Pair data engineers, ML engineers, and product owners on the same standup.</li>
          <li>Design reviews for architecture changes and any new model in production.</li>
          <li>Blameless post-mortems for every incident — publish learnings within a week.</li>
        </ul>
      </Section>

      <Section id="maintenance" title="14. Maintenance Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>Retrain on a schedule (weekly / monthly) plus event-driven triggers.</li>
          <li>Audit feature freshness and null rates daily.</li>
          <li>Review model cards and runbooks quarterly.</li>
          <li>Deprecate unused features and old model versions annually.</li>
        </ul>
      </Section>

      <Section id="review" title="Best Practices Review">
        <h3 className="text-lg font-semibold">Do's</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Automate everything that runs more than twice.</li>
          <li>Prefer boring, proven components over novel ones.</li>
          <li>Version data, code, and models together.</li>
          <li>Measure business impact, not just model metrics.</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold">Don'ts</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Don't ship models trained in a notebook.</li>
          <li>Don't skip monitoring — silent regressions are the most expensive failures.</li>
          <li>Don't ignore data drift because model accuracy still "looks fine".</li>
          <li>Don't keep unused features "just in case" — they add attack surface.</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold">Expert recommendations</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Invest 30% of project time in data quality — it usually pays back 3×.</li>
          <li>Choose the simplest model that meets SLOs — you'll thank yourself in year two.</li>
          <li>Write the runbook before the first production incident, not after.</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold">Project review checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Reproducible from a single command? ✅</li>
          <li>All experiments tracked with metrics and artefacts? ✅</li>
          <li>Monitoring covers service, data, and quality layers? ✅</li>
          <li>Runbook exists and has been rehearsed? ✅</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Discipline beats cleverness in production ML.</li>
          <li>Reproducibility, monitoring, and documentation are non-optional.</li>
          <li>MLOps is 70% engineering — treat ML systems as software systems.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do small teams need MLOps?">Yes — a lightweight stack (Git + DVC + MLflow + one container) delivers 80% of the value at 10% of the cost.</FAQItem>
        <FAQItem q="How often should we retrain?">Start weekly; move to event-driven once drift monitoring is stable.</FAQItem>
        <FAQItem q="Notebook or script?">Notebooks for exploration only. Promote code to <code>src/</code> before merging to <code>main</code>.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>MLOps</strong> — engineering practices for reliable, repeatable ML delivery.</li>
          <li><strong>Model Card</strong> — a short document describing a model's intended use, data, and limits.</li>
          <li><strong>Datasheet</strong> — dataset documentation covering origin, schema, and bias.</li>
          <li><strong>PSI</strong> — Population Stability Index; a common feature-drift metric.</li>
          <li><strong>SLO</strong> — Service Level Objective; measurable reliability target.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
