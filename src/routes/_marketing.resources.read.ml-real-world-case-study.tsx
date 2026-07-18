import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-real-world-case-study",
  title: "Machine Learning — Real-world Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "24 min",
  pages: 25,
  lastUpdated: "May 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle:
    "How LogiSwift, a mid-size logistics operator, used Machine Learning to cut last-mile delivery costs by 22% and lift on-time delivery from 84% to 96% — the full lifecycle from business problem to production ML.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "company", label: "1. Company Background" },
  { id: "problem", label: "2. Business Problem" },
  { id: "requirements", label: "3. Business Requirements" },
  { id: "dataset", label: "4. Dataset Collection" },
  { id: "prep", label: "5. Data Preparation" },
  { id: "features", label: "6. Feature Engineering" },
  { id: "model", label: "7. Model Selection" },
  { id: "architecture", label: "8. System Architecture" },
  { id: "training", label: "9. Model Training" },
  { id: "deployment", label: "10. Deployment" },
  { id: "performance", label: "11. Performance Evaluation" },
  { id: "impact", label: "12. Business Impact" },
  { id: "lessons", label: "13. Lessons Learned" },
  { id: "future", label: "14. Future Improvements" },
  { id: "review", label: "Case Study Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Best Practices", tag: "AI & Data", time: "18 min" },
  { title: "Machine Learning — Project Case Study", tag: "AI & Data", time: "21 min" },
  { title: "Machine Learning — Complete Tutorial", tag: "AI & Data", time: "24 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-real-world-case-study")({
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
  component: MLRealWorldCaseStudyPage,
});

function MLRealWorldCaseStudyPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="What you'll learn">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>How ML is applied to a real production business problem.</li>
            <li>How to translate business goals into ML objectives and metrics.</li>
            <li>End-to-end architecture — data, training, serving, monitoring.</li>
            <li>How to evaluate <em>technical</em> and <em>business</em> outcomes together.</li>
            <li>Deployment challenges, cost optimisation, and long-term maintenance.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80" caption="Figure 1 — End-to-end ML pipeline: from raw operations data to real-time route recommendations." />
      </Section>

      <Section id="company" title="1. Company Background">
        <p>
          <strong>LogiSwift</strong> (name fictionalised) is a mid-size Indian third-party logistics provider handling
          around 320,000 last-mile deliveries per day across 42 cities. It operates a fleet of 6,800 vehicles and
          partners with 14,000 gig-economy delivery associates. Retail e-commerce accounts for 71% of revenue and is
          extremely price-sensitive — every ₹1 saved per shipment translates to ~₹11 crore in annual margin.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Metric</th><th className="border p-2 text-left">Before ML</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Deliveries / day</td><td className="border p-2">320,000</td></tr>
              <tr><td className="border p-2">On-time delivery rate</td><td className="border p-2">84%</td></tr>
              <tr><td className="border p-2">Cost per shipment</td><td className="border p-2">₹58</td></tr>
              <tr><td className="border p-2">Failed delivery rate</td><td className="border p-2">6.4%</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="problem" title="2. Business Problem">
        <p>
          LogiSwift's largest e-commerce client threatened to reduce volume by 30% unless on-time delivery moved above
          92%. At the same time, fuel and labour costs had risen 14% year-on-year. Leadership needed a solution that
          simultaneously improved reliability and reduced unit economics — a task that manual route planning and
          rule-based dispatch had been unable to solve.
        </p>
      </Section>

      <Section id="requirements" title="3. Business Requirements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Predict delivery risk (late / failed) at order-intake time for every shipment.</li>
          <li>Recommend an optimal route and driver assignment per shipment cluster.</li>
          <li>Explain predictions so operations managers can trust and override them.</li>
          <li>Serve predictions with p95 latency &lt; 300 ms and cost &lt; ₹0.04 per shipment.</li>
          <li>Comply with data-privacy and driver-fairness policies.</li>
        </ul>
      </Section>

      <Section id="dataset" title="4. Dataset Collection">
        <p>Data was consolidated from 9 internal systems into a single warehouse layer:</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Source</th><th className="border p-2 text-left">Volume</th><th className="border p-2 text-left">Refresh</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Shipment records</td><td className="border p-2">220 M rows</td><td className="border p-2">Streaming</td></tr>
              <tr><td className="border p-2">GPS pings</td><td className="border p-2">18 B rows</td><td className="border p-2">Real-time</td></tr>
              <tr><td className="border p-2">Driver profiles</td><td className="border p-2">140 K rows</td><td className="border p-2">Daily</td></tr>
              <tr><td className="border p-2">Weather API</td><td className="border p-2">2.1 M rows</td><td className="border p-2">Hourly</td></tr>
              <tr><td className="border p-2">Traffic API (HERE)</td><td className="border p-2">5.4 M rows</td><td className="border p-2">15 min</td></tr>
              <tr><td className="border p-2">Customer feedback</td><td className="border p-2">7.8 M rows</td><td className="border p-2">Daily</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="prep" title="5. Data Preparation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Deduplicated shipment records against 3 legacy IDs; 4.1% duplicate rate resolved.</li>
          <li>Aligned all timestamps to Asia/Kolkata; historical DST drift removed.</li>
          <li>Removed leakage: fields such as <code>actual_delivery_time</code> excluded from training.</li>
          <li>Filled missing weather with the nearest station within 25 km and 60 minutes.</li>
          <li>Rebalanced the failure class (6.4% → 22%) using stratified undersampling.</li>
        </ul>
      </Section>

      <Section id="features" title="6. Feature Engineering">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Route features:</strong> distance, historical mean speed, elevation delta, stop count.</li>
          <li><strong>Driver features:</strong> rolling 30-day on-time rate, tenure, vehicle type.</li>
          <li><strong>Order features:</strong> order value, package fragility, address quality score.</li>
          <li><strong>Environmental:</strong> rainfall, temperature, air-quality index, holiday flag.</li>
          <li><strong>Behavioural:</strong> customer refusal history, gate-access complexity.</li>
          <li>Final feature count after selection: <strong>134</strong>.</li>
        </ul>
      </Section>

      <Section id="model" title="7. Model Selection">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Model</th><th className="border p-2 text-left">ROC-AUC</th><th className="border p-2 text-left">F1 (fail)</th><th className="border p-2 text-left">Latency</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Logistic Regression</td><td className="border p-2">0.74</td><td className="border p-2">0.42</td><td className="border p-2">2 ms</td></tr>
              <tr><td className="border p-2">Random Forest</td><td className="border p-2">0.82</td><td className="border p-2">0.51</td><td className="border p-2">34 ms</td></tr>
              <tr><td className="border p-2 font-semibold">LightGBM (chosen)</td><td className="border p-2 font-semibold">0.881</td><td className="border p-2 font-semibold">0.58</td><td className="border p-2 font-semibold">11 ms</td></tr>
              <tr><td className="border p-2">DeepFM</td><td className="border p-2">0.883</td><td className="border p-2">0.58</td><td className="border p-2">72 ms</td></tr>
            </tbody>
          </table>
        </div>
        <p>LightGBM was selected: near-identical accuracy to DeepFM at 6× lower latency and 4× lower serving cost.</p>
      </Section>

      <Section id="architecture" title="8. System Architecture">
        <Code lang="text">{`Operational DBs ──► Kafka ──► Warehouse (BigQuery)
                                     │
                                     ▼
                              Feature Store (Feast)
                                     │
                 ┌───────────────────┼────────────────────┐
                 ▼                                        ▼
         Training Pipeline                        Online Store (Redis)
        (Airflow + Vertex AI)                            │
                 │                                       ▼
                 ▼                        Prediction Service (FastAPI on GKE)
        Model Registry (MLflow) ──────────────────► SHAP Explainer
                                                          │
                                                          ▼
                                          Route Optimiser + Dispatch UI`}</Code>
      </Section>

      <Section id="training" title="9. Model Training">
        <Code>{`import lightgbm as lgb
params = dict(
    objective="binary", metric="auc",
    learning_rate=0.05, num_leaves=64,
    feature_fraction=0.85, bagging_fraction=0.8,
    bagging_freq=5, min_data_in_leaf=200,
    scale_pos_weight=3.4, verbose=-1,
)
train_ds = lgb.Dataset(X_train, label=y_train)
val_ds   = lgb.Dataset(X_val,   label=y_val)
model = lgb.train(
    params, train_ds, num_boost_round=2000,
    valid_sets=[val_ds],
    callbacks=[lgb.early_stopping(80), lgb.log_evaluation(100)],
)`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>Weekly retraining with a 90-day rolling window.</li>
          <li>Hyperparameters tuned via Optuna — 240 trials, 6 hours on 4×A10 GPUs.</li>
          <li>Champion-challenger held out for 14 days before promotion.</li>
        </ul>
      </Section>

      <Section id="deployment" title="10. Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li>Blue-green deploy on GKE; canary 5% → 25% → 100% over 72 hours.</li>
          <li>Auto-rollback if p95 latency &gt; 350 ms or online AUC drops by &gt; 3 points.</li>
          <li>Feature parity enforced by Feast — offline/online skew alarm at 0.5%.</li>
          <li>PII masked before feature logging; DPDP-compliant retention (90 days).</li>
        </ul>
      </Section>

      <Section id="performance" title="11. Performance Evaluation">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Metric</th><th className="border p-2 text-left">Offline</th><th className="border p-2 text-left">Online (A/B)</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">ROC-AUC</td><td className="border p-2">0.881</td><td className="border p-2">0.864</td></tr>
              <tr><td className="border p-2">F1 (failure class)</td><td className="border p-2">0.58</td><td className="border p-2">0.55</td></tr>
              <tr><td className="border p-2">P95 latency</td><td className="border p-2">—</td><td className="border p-2">184 ms</td></tr>
              <tr><td className="border p-2">Cost / prediction</td><td className="border p-2">—</td><td className="border p-2">₹0.028</td></tr>
            </tbody>
          </table>
        </div>
        <Figure src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1400&q=80" caption="Figure 2 — Operations dashboard showing predicted-vs-actual on-time delivery by city and hour." />
      </Section>

      <Section id="impact" title="12. Business Impact">
        <ul className="list-disc space-y-1 pl-5">
          <li>On-time delivery rose from <strong>84% → 96%</strong> in 6 months.</li>
          <li>Cost per shipment fell <strong>−22%</strong> (₹58 → ₹45).</li>
          <li>Failed-delivery rate dropped from <strong>6.4% → 2.1%</strong>.</li>
          <li>Anchor e-commerce client renewed contract with a <strong>+18%</strong> volume commitment.</li>
          <li>Estimated annual impact: <strong>₹138 crore</strong> gross margin uplift.</li>
          <li>Payback period: <strong>5 months</strong>.</li>
        </ul>
      </Section>

      <Section id="lessons" title="13. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li>Address-quality features moved AUC more than any model swap — data beats algorithms.</li>
          <li>Driver-fairness constraint had to be added explicitly; naïve model penalised new drivers.</li>
          <li>Monitoring drift on individual features caught a monsoon-season regression 9 days early.</li>
          <li>Human-in-the-loop overrides remained valuable — 3.4% of predictions were vetoed by dispatchers.</li>
        </ul>
      </Section>

      <Section id="future" title="14. Future Improvements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reinforcement learning for dynamic re-routing during the shift.</li>
          <li>Multi-task learning to jointly predict delay <em>and</em> customer-refusal risk.</li>
          <li>Edge inference on driver devices for offline zones.</li>
          <li>Causal uplift modelling to optimise incentive spend.</li>
        </ul>
      </Section>

      <Section id="review" title="Case Study Review">
        <h3 className="text-lg font-semibold">Discussion questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>How would you re-scope the project for a company with 1/10th the data volume?</li>
          <li>What guardrails would you add to avoid unfair treatment of new drivers?</li>
          <li>How would you defend the choice of LightGBM to a leadership committee?</li>
          <li>What operational risks arise if the model is offline for 6 hours during peak season?</li>
        </ol>
        <h3 className="mt-4 text-lg font-semibold">Business insights</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Model interpretability drove operational adoption faster than accuracy did.</li>
          <li>Cost-per-prediction is a first-class business metric, not an engineering afterthought.</li>
          <li>Data quality investment (address normalisation) delivered the largest single lift.</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold">Success factors</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Executive sponsorship with a clear, business-anchored success metric.</li>
          <li>Cross-functional squad — data, ML, ops, product — co-located for the first 12 weeks.</li>
          <li>Weekly retraining and drift monitoring baked in from day one.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Start with a well-scoped business metric — not a modelling metric.</li>
          <li>Invest in data plumbing before model tuning.</li>
          <li>Latency, cost, and interpretability constrain model choice as much as accuracy.</li>
          <li>Retraining + monitoring are half of production ML; do not skip either.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Are the numbers real?">The case is inspired by real logistics projects and public reports; specific figures are illustrative and rounded for teaching purposes.</FAQItem>
        <FAQItem q="Why not deep learning end-to-end?">On tabular business data at this scale, gradient-boosted trees remain the state of the art and are cheaper to serve.</FAQItem>
        <FAQItem q="How was fairness handled?">A monotonic constraint plus per-cohort AUC dashboards ensured new drivers were not systematically down-scored.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Feature Store</strong> — versioned, shared repository of ML features.</li>
          <li><strong>SHAP</strong> — per-prediction explainability values.</li>
          <li><strong>Blue-green deploy</strong> — dual production stacks with instant traffic switch.</li>
          <li><strong>Drift</strong> — distribution change in features or labels over time.</li>
          <li><strong>AUC</strong> — Area Under the ROC Curve; probability the model ranks a positive above a negative.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
