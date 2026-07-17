import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-project-case-study",
  title: "Machine Learning — Project Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "21 min",
  pages: 32,
  lastUpdated: "March 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=1800&q=80",
  heroSubtitle:
    "A production-style case study — how RetailIQ built an ML-powered churn prediction system that reduced annual churn by 18% and lifted retention revenue by ₹42 crore.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "company", label: "1. Company Background" },
  { id: "problem", label: "2. Business Problem" },
  { id: "goals", label: "3. Project Objectives" },
  { id: "data", label: "4. Data Collection" },
  { id: "prep", label: "5. Data Preparation" },
  { id: "features", label: "6. Feature Engineering" },
  { id: "model", label: "7. Model Selection" },
  { id: "architecture", label: "8. System Architecture" },
  { id: "deploy", label: "9. Deployment Strategy" },
  { id: "performance", label: "10. Performance Evaluation" },
  { id: "results", label: "11. Business Results" },
  { id: "lessons", label: "12. Lessons Learned" },
  { id: "future", label: "13. Future Improvements" },
  { id: "review", label: "Case Study Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Project Guide", tag: "AI & Data", time: "24 min" },
  { title: "Machine Learning — Complete Tutorial", tag: "AI & Data", time: "24 min" },
  { title: "Machine Learning — Interview Questions", tag: "AI & Data", time: "35 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-project-case-study")({
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
  component: MLProjectCaseStudyPage,
});

function MLProjectCaseStudyPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="What you'll learn from this case study">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>How a real ML project moves from business question to production system.</li>
            <li>Architectural decisions behind a production-ready ML pipeline.</li>
            <li>How to evaluate business impact — not just model metrics.</li>
            <li>Trade-offs between accuracy, latency, cost, and interpretability.</li>
            <li>Industry-standard MLOps workflows.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 1 — End-to-end architecture of RetailIQ's churn prediction system." />
      </Section>

      <Section id="company" title="1. Company Background">
        <p>
          <strong>RetailIQ</strong> (name fictionalised) is a mid-size Indian e-commerce marketplace with 6.2 million
          active customers and ₹1,800 crore in annual GMV. Retention drives 62% of revenue; a 1-point drop in
          annual retention costs the company roughly ₹18 crore. Historical churn hovered around 27% per year.
        </p>
      </Section>

      <Section id="problem" title="2. Business Problem">
        <p>Marketing had been running blanket win-back campaigns, spending ₹9 crore per year with a 3.1% redemption rate. Leadership asked: can we predict which customers are about to churn <em>early enough</em> that a targeted intervention has a real chance of retaining them — and cheaply enough that ROI is clear?</p>
      </Section>

      <Section id="goals" title="3. Project Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Predict 60-day churn probability for every active customer, refreshed weekly.</li>
          <li>Achieve ≥ 0.82 ROC-AUC on a held-out quarter of data.</li>
          <li>Latency &lt; 200 ms per prediction for on-site personalisation.</li>
          <li>Cut win-back marketing spend by 35% while preserving retained revenue.</li>
        </ul>
      </Section>

      <Section id="data" title="4. Data Collection">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Source</th><th className="border p-2 text-left">Rows</th><th className="border p-2 text-left">Refresh</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Order history (PostgreSQL)</td><td className="border p-2">180 M</td><td className="border p-2">Streaming CDC</td></tr>
              <tr><td className="border p-2">Session logs (Snowplow)</td><td className="border p-2">2.4 B events</td><td className="border p-2">Hourly</td></tr>
              <tr><td className="border p-2">Support tickets</td><td className="border p-2">4.1 M</td><td className="border p-2">Daily</td></tr>
              <tr><td className="border p-2">Marketing engagement</td><td className="border p-2">92 M</td><td className="border p-2">Daily</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="prep" title="5. Data Preparation">
        <p>Data engineers built a curated <em>customer_daily</em> table in the warehouse, one row per customer per day, with 218 raw signals. The ML team then defined labels using a 60-day forward window and a 90-day backward feature window — carefully offset to prevent leakage.</p>
      </Section>

      <Section id="features" title="6. Feature Engineering">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Recency, Frequency, Monetary (RFM)</strong> over 7 / 30 / 90 day windows.</li>
          <li><strong>Trend features:</strong> slope of weekly spend, order frequency.</li>
          <li><strong>Behavioural:</strong> session depth, wishlist adds, cart-abandon rate.</li>
          <li><strong>Support:</strong> ticket count, negative-sentiment ratio.</li>
          <li><strong>Life-cycle:</strong> days since signup, days since last purchase.</li>
          <li>Final feature count after selection: <strong>96</strong>.</li>
        </ul>
      </Section>

      <Section id="model" title="7. Model Selection">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Model</th><th className="border p-2 text-left">ROC-AUC</th><th className="border p-2 text-left">PR-AUC</th><th className="border p-2 text-left">Latency</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Logistic Regression (baseline)</td><td className="border p-2">0.76</td><td className="border p-2">0.41</td><td className="border p-2">2 ms</td></tr>
              <tr><td className="border p-2">Random Forest</td><td className="border p-2">0.81</td><td className="border p-2">0.48</td><td className="border p-2">28 ms</td></tr>
              <tr><td className="border p-2 font-semibold">XGBoost (chosen)</td><td className="border p-2 font-semibold">0.847</td><td className="border p-2 font-semibold">0.55</td><td className="border p-2 font-semibold">14 ms</td></tr>
              <tr><td className="border p-2">TabNet</td><td className="border p-2">0.849</td><td className="border p-2">0.55</td><td className="border p-2">62 ms</td></tr>
            </tbody>
          </table>
        </div>
        <p>XGBoost was picked over TabNet because the accuracy gain (0.002 AUC) did not justify 4× latency and higher infra cost. SHAP values gave interpretable per-customer explanations for marketing users.</p>
        <Code>{`import xgboost as xgb
model = xgb.XGBClassifier(
    n_estimators=800, max_depth=6, learning_rate=0.05,
    subsample=0.8, colsample_bytree=0.8,
    scale_pos_weight=3.6, eval_metric="auc",
)
model.fit(X_tr, y_tr, eval_set=[(X_val, y_val)], early_stopping_rounds=40)`}</Code>
      </Section>

      <Section id="architecture" title="8. System Architecture">
        <Code lang="text">{`Warehouse (Snowflake)
      │
      ▼
Feature Store (Feast) ──► Training Pipeline (Airflow → SageMaker)
      │                            │
      ▼                            ▼
Online Store (Redis)         Model Registry (MLflow)
      │                            │
      └─────────► Prediction Service (FastAPI / EKS) ─── SHAP explainer
                              │
                              ▼
                     Marketing CDP + Dashboards`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>Feature parity between offline training and online serving via Feast.</li>
          <li>Weekly retraining job with automatic drift checks.</li>
          <li>Blue-green deploy in EKS; canary 5% → 50% → 100% over 24 hours.</li>
        </ul>
      </Section>

      <Section id="deploy" title="9. Deployment Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Two independent model versions kept warm; instant rollback on SLO breach.</li>
          <li>Predictions logged with feature snapshot for auditability.</li>
          <li>PII removed before feature logging; GDPR / DPDP compliant.</li>
        </ul>
      </Section>

      <Section id="performance" title="10. Performance Evaluation">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Metric</th><th className="border p-2 text-left">Offline</th><th className="border p-2 text-left">Online (A/B)</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">ROC-AUC</td><td className="border p-2">0.847</td><td className="border p-2">0.831</td></tr>
              <tr><td className="border p-2">PR-AUC</td><td className="border p-2">0.55</td><td className="border p-2">0.52</td></tr>
              <tr><td className="border p-2">Top-decile lift</td><td className="border p-2">4.8×</td><td className="border p-2">4.4×</td></tr>
              <tr><td className="border p-2">P95 latency</td><td className="border p-2">—</td><td className="border p-2">96 ms</td></tr>
            </tbody>
          </table>
        </div>
        <Figure src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80" caption="Figure 2 — Business impact dashboard: predicted-vs-actual churn, retained revenue, and campaign efficiency." />
      </Section>

      <Section id="results" title="11. Business Results">
        <ul className="list-disc space-y-1 pl-5">
          <li>Annual churn dropped <strong>from 27.1% to 22.3%</strong> (−4.8 pp, −18% relative).</li>
          <li>Retained revenue lifted by an estimated <strong>₹42 crore</strong> in the first year.</li>
          <li>Win-back marketing spend cut <strong>−37%</strong> by targeting only high-risk deciles.</li>
          <li>Redemption rate rose from <strong>3.1% → 11.4%</strong>.</li>
          <li>Payback period: <strong>~4 months</strong>.</li>
        </ul>
      </Section>

      <Section id="lessons" title="12. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Feature parity issues caused the first launch to underperform by 3 AUC points — the feature store fix was the highest-leverage change.</li>
          <li>SHAP explanations unlocked stakeholder trust more than headline AUC.</li>
          <li>A well-tuned XGBoost beat a fancier deep model when infra cost was accounted for.</li>
          <li>Weekly retraining plus drift alerts caught a seasonal shift that would otherwise have degraded performance silently.</li>
          <li>Cost of monitoring &lt; 6% of total infra spend — cheap insurance.</li>
        </ul>
      </Section>

      <Section id="future" title="13. Future Improvements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Uplift modelling to score <em>who is persuadable</em>, not just <em>who will churn</em>.</li>
          <li>Real-time features from live session events.</li>
          <li>Multi-task model that jointly predicts churn and next-basket value.</li>
          <li>Automated experimentation platform for offers and messaging.</li>
        </ul>
      </Section>

      <Section id="review" title="Case Study Review">
        <h3 className="text-lg font-semibold">Key learnings</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Business metric first; model metric second.</li>
          <li>Simplicity + interpretability often win in production.</li>
          <li>Data and feature engineering usually beat model choice.</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold">Discussion questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>What alternative labelling scheme could reduce leakage risk further?</li>
          <li>Why did the team keep XGBoost over TabNet despite similar AUC?</li>
          <li>How would you extend this to a real-time recommendation system?</li>
          <li>What ethical risks does churn scoring introduce, and how would you mitigate them?</li>
        </ol>
        <h3 className="mt-4 text-lg font-semibold">Reflection activity</h3>
        <p>Pick one section (Architecture, Modelling, or Deployment) and redesign it under a 10× constraint: 10× less data, 10× lower latency, or 10× smaller team.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Are the numbers real?">The case is inspired by real projects and public reports; specific figures are illustrative and rounded.</FAQItem>
        <FAQItem q="Why not use deep learning?">On tabular data at this scale, gradient-boosted trees remain state-of-the-art and cheaper to serve.</FAQItem>
        <FAQItem q="What tooling would you swap in a startup?">Replace SageMaker + Feast + MLflow with a lightweight stack: BigQuery + dbt + Airflow + a single container on Cloud Run.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>CDC</strong> — Change Data Capture, streaming updates from OLTP to warehouse.</li>
          <li><strong>Feature Store</strong> — versioned repository of features shared across models.</li>
          <li><strong>SHAP</strong> — SHapley Additive exPlanations, per-prediction feature attributions.</li>
          <li><strong>Uplift</strong> — modelling the causal effect of an intervention, not the outcome alone.</li>
          <li><strong>Blue-green deploy</strong> — run two versions side by side and switch traffic atomically.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
