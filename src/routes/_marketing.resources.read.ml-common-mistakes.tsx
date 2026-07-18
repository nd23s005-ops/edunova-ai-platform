import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-common-mistakes",
  title: "Machine Learning — Common Mistakes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "13 min",
  pages: 16,
  lastUpdated: "September 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1800&q=80",
  heroSubtitle:
    "The 25 most common Machine Learning mistakes beginners make — why each happens, the impact, and practical ways to prevent and fix them.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "beginner", label: "1. Beginner Mistakes" },
  { id: "collection", label: "2. Data Collection Errors" },
  { id: "cleaning", label: "3. Data Cleaning Mistakes" },
  { id: "features", label: "4. Feature Engineering Mistakes" },
  { id: "model", label: "5. Model Selection Errors" },
  { id: "fit", label: "6. Overfitting & Underfitting" },
  { id: "evaluation", label: "7. Evaluation Mistakes" },
  { id: "deployment", label: "8. Deployment Mistakes" },
  { id: "documentation", label: "9. Documentation Mistakes" },
  { id: "security", label: "10. Security Mistakes" },
  { id: "checklist", label: "11. Final Checklist" },
  { id: "top25", label: "Top 25 Common Mistakes" },
  { id: "review", label: "Review & Self Assessment" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Best Practices", tag: "AI & Data", time: "18 min" },
  { title: "Machine Learning — Beginner Guide", tag: "AI & Data", time: "20 min" },
  { title: "Machine Learning — Cheat Sheet", tag: "AI & Data", time: "9 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-common-mistakes")({
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
  component: MLCommonMistakesPage,
});

function Mistake({ n, title, why, example, impact, solution, prevent }: { n: number; title: string; why: string; example: string; impact: string; solution: string; prevent: string }) {
  return (
    <div className="my-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Mistake #{n}</p>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm"><strong>Why it happens:</strong> {why}</p>
      <p className="mt-1 text-sm"><strong>Real-world example:</strong> {example}</p>
      <p className="mt-1 text-sm"><strong>Impact:</strong> {impact}</p>
      <p className="mt-1 text-sm"><strong>Solution:</strong> {solution}</p>
      <p className="mt-1 text-sm text-muted-foreground"><strong>Prevention tip:</strong> {prevent}</p>
    </div>
  );
}

function MLCommonMistakesPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="warning" icon={<AlertTriangle className="h-5 w-5" />} title="What you'll learn">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Identify the common ML mistakes beginners repeatedly make.</li>
            <li>Understand <em>why</em> each mistake happens — root cause, not just symptom.</li>
            <li>Apply practical, code-level solutions.</li>
            <li>Improve model reliability and project quality.</li>
            <li>Build better engineering habits from the first project onward.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1400&q=80" caption="Figure 1 — Where ML projects go wrong along the lifecycle." />
      </Section>

      <Section id="beginner" title="1. Beginner Mistakes">
        <Mistake n={1} title="Jumping to deep learning first" why="Tutorials over-index on neural networks." example="Using a CNN to classify 400 tabular rows." impact="Overfitting; underperforming a 5-line logistic regression." solution="Always run a simple baseline first (LogReg / XGBoost)." prevent="Adopt a 'baseline before fancy' rule." />
        <Mistake n={2} title="No clear success metric" why="Teams skip the business framing step." example="Chasing accuracy on an imbalanced dataset." impact="Model looks great, business impact is zero." solution="Pick one business metric + one model metric before coding." prevent="Write a one-line success statement in the README." />
      </Section>

      <Section id="collection" title="2. Data Collection Errors">
        <Mistake n={3} title="Sampling bias" why="Data collected only from a convenient subgroup." example="Training a churn model only on 'active' users." impact="Model fails on the population it was meant for." solution="Sample from the full deployment population; stratify by key cohorts." prevent="Write a data-collection plan before pulling data." />
        <Mistake n={4} title="Label leakage from the future" why="Fields updated after the outcome are included as features." example="Using 'refund_issued' to predict 'purchase_success'." impact="Perfect offline metrics, catastrophic online failure." solution="Freeze features at prediction time; use point-in-time joins." prevent="Ask 'was this field known at inference time?' for every feature." />
      </Section>

      <Section id="cleaning" title="3. Data Cleaning Mistakes">
        <Mistake n={5} title="Filling missing values naively" why="`fillna(0)` feels easy." example="Zero-filling missing income data." impact="Distorts feature distributions and downstream weights." solution="Impute with domain-aware strategies (median, group-mean, model-based)." prevent="Track missingness rates per feature; alert on drift." />
        <Mistake n={6} title="Removing outliers without inspection" why="Outliers hurt certain models." example="Dropping high-value customers as 'outliers'." impact="Loses the exact segment the business cares about." solution="Cap or winsorise; use robust models like tree ensembles." prevent="Always inspect the top-1% before removing anything." />
      </Section>

      <Section id="features" title="4. Feature Engineering Mistakes">
        <Mistake n={7} title="Data leakage through global scaling" why="Scaler fit on the full dataset before splitting." example="`StandardScaler().fit(X)` then `train_test_split(...)`." impact="Test AUC inflated by 3–8 points; real deployment collapses." solution="Fit transformers on train only; wrap in `Pipeline`." prevent="Use `sklearn.pipeline.Pipeline` for every preprocessing chain." />
        <Mistake n={8} title="Encoding categoricals with wrong scheme" why="Beginners default to `LabelEncoder`." example="Label-encoding city names for linear models." impact="Model treats 'Delhi'=2 as bigger than 'Mumbai'=1." solution="Use one-hot / target encoding for linear models; ordinal for trees." prevent="Match encoder to model family." />
        <Code>{`from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

pre = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
])
pipe = Pipeline([("pre", pre), ("clf", clf)])
pipe.fit(X_train, y_train)   # <- transformer fits on train only`}</Code>
      </Section>

      <Section id="model" title="5. Model Selection Errors">
        <Mistake n={9} title="Ignoring class imbalance" why="Accuracy on 95/5 data looks amazing." example="Fraud model with 99% accuracy that catches nothing." impact="Zero business value; missed fraud." solution="Use PR-AUC, F1, class weights, or resampling." prevent="Always plot the class distribution first." />
        <Mistake n={10} title="Choosing the fanciest model available" why="'Deep learning must be better.'" example="Transformer on 10K tabular rows." impact="Slow to train, expensive to serve, worse accuracy." solution="Match model complexity to data size and problem type." prevent="Ranking rule: LogReg → GBM → DL, only escalate when justified." />
      </Section>

      <Section id="fit" title="6. Overfitting & Underfitting">
        <Mistake n={11} title="Tuning on the test set" why="Manual iteration on test metrics." example="Rerunning grid search until test AUC looks great." impact="Reported metric is fictional; live performance drops." solution="Reserve a locked test set; tune on a separate validation split." prevent="Automate cross-validation; never look at test until final." />
        <Mistake n={12} title="Under-regularising complex models" why="Default hyperparameters are aggressive." example="XGBoost with 5000 rounds and no early stopping." impact="Overfits training; unstable on new data." solution="Use early stopping, `min_child_weight`, and regularisation." prevent="Watch training vs validation curves — divergence is the signal." />
      </Section>

      <Section id="evaluation" title="7. Evaluation Mistakes">
        <Mistake n={13} title="Reporting a single metric" why="AUC is easy to quote." example="Approving a model on AUC alone." impact="Missed fairness gaps and rare-class failures." solution="Report AUC + PR-AUC + calibration + slice metrics." prevent="Adopt a scorecard template with 5+ metrics." />
        <Mistake n={14} title="Random splits on time-series data" why="`train_test_split(shuffle=True)` is default." example="Predicting stock returns with random shuffling." impact="Model 'sees the future'; live performance is chance." solution="Use time-based splits or expanding-window cross-validation." prevent="Ask 'is order meaningful?' — if yes, split by time." />
      </Section>

      <Section id="deployment" title="8. Deployment Mistakes">
        <Mistake n={15} title="Different code paths in training vs serving" why="Two teams, two implementations of the same feature." example="`log(x+1)` in training, `log(x)` in serving." impact="Silent skew; model quality drops by 5–20%." solution="Share feature code via a feature store." prevent="Log an offline-vs-online skew metric per feature." />
        <Mistake n={16} title="No monitoring in production" why="'It worked yesterday.'" example="Fraud model degrades silently after a schema change." impact="Weeks of missed fraud before anyone notices." solution="Track service, data drift, and delayed labels." prevent="Set alert thresholds before launch, not after." />
        <Mistake n={17} title="Manual model promotion" why="'It's just one file.'" example="Copying a `.pkl` from a laptop to production." impact="Unreproducible, unauditable, unrollbackable." solution="Use a model registry with signed artefacts." prevent="Automate promotion via CI/CD." />
      </Section>

      <Section id="documentation" title="9. Documentation Mistakes">
        <Mistake n={18} title="No model card" why="Docs feel optional at MVP stage." example="New team member can't tell what the model does." impact="Slow onboarding; risk of misuse." solution="Write a model card during the first release." prevent="Block merges without a model card." />
      </Section>

      <Section id="security" title="10. Security Mistakes">
        <Mistake n={19} title="Logging raw PII with features" why="Convenience of dumping the full record." example="Emails stored in feature logs." impact="Regulatory fines; data-breach exposure." solution="Tokenise PII before logging; separate features from raw records." prevent="Include PII review in every PR." />
        <Mistake n={20} title="Unauthenticated prediction endpoints" why="'Internal only.'" example="Open FastAPI service scraped by bots." impact="Model theft; scraping-driven cost spikes." solution="Require auth, rate-limit, and log every call." prevent="Threat-model the endpoint at design time." />
      </Section>

      <Section id="checklist" title="11. Final Checklist">
        <Figure src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80" caption="Figure 2 — A one-page sanity checklist before shipping any ML model." />
        <ul className="list-disc space-y-1 pl-5">
          <li>Business metric written down? ✅</li>
          <li>Time-aware split used? ✅</li>
          <li>Feature parity offline vs online verified? ✅</li>
          <li>Monitoring dashboards live? ✅</li>
          <li>Model card + runbook committed? ✅</li>
        </ul>
      </Section>

      <Section id="top25" title="Top 25 Common Mistakes">
        <Mistake n={21} title="No random seed set" why="Reproducibility feels academic." example="Two runs give AUC 0.83 and 0.79." impact="Cannot compare experiments reliably." solution="Set seeds for numpy, torch, and framework RNGs." prevent="Enforce a `set_seed()` helper in every training script." />
        <Mistake n={22} title="Training on the wrong loss" why="Copy-pasted from a tutorial." example="MSE used for classification." impact="Poor probability estimates; miscalibrated model." solution="Match loss to task (cross-entropy, focal, log-loss)." prevent="Read the loss doc for every new task." />
        <Mistake n={23} title="Skipping calibration" why="Assumes probabilities are already trustworthy." example="Setting decision threshold at 0.5 without calibration." impact="Business logic misfires on borderline cases." solution="Use Platt / isotonic scaling; check reliability curves." prevent="Include a calibration plot in every review." />
        <Mistake n={24} title="Not versioning the data" why="Data feels external." example="Training set changes silently; model degrades." impact="Impossible to reproduce previous results." solution="Use DVC / lakeFS; pin the dataset hash to the model version." prevent="Fail CI if the dataset hash is missing." />
        <Mistake n={25} title="Ignoring inference cost" why="'We'll optimise later.'" example="A model that costs ₹0.20 per prediction at 5M/day." impact="₹36 crore annual bill; project killed by finance." solution="Track cost per prediction from day one." prevent="Add cost as a first-class SLO." />
      </Section>

      <Section id="review" title="Review & Self Assessment">
        <h3 className="text-lg font-semibold">Prevention checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every experiment has a seed, a data hash, and tracked metrics.</li>
          <li>Every split respects time order when time matters.</li>
          <li>Every feature is computed identically offline and online.</li>
          <li>Every deployment has monitoring, alerts, and a rollback plan.</li>
        </ul>
        <h3 className="mt-4 text-lg font-semibold">Reflection questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Which mistake on this list have you made — and how did you catch it?</li>
          <li>Which mistake would be most expensive in your current project?</li>
          <li>What one process change would eliminate two of these mistakes at once?</li>
        </ol>
        <h3 className="mt-4 text-lg font-semibold">Quick revision notes</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Bias in → bias out. Sample carefully.</li>
          <li>Leakage is the #1 offline-online gap cause.</li>
          <li>Monitoring beats accuracy in production.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Most ML failures are process failures, not modelling failures.</li>
          <li>Simple rules — baselines, seeds, time-aware splits, monitoring — prevent 80% of mistakes.</li>
          <li>Habits compound: adopt one prevention rule per project until they're all in place.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="I'm a beginner — where do I start?">Fix data leakage and time-aware splits first; they cause the biggest offline/online gaps.</FAQItem>
        <FAQItem q="How do I convince my team to adopt these habits?">Point at a real incident — replayed post-mortems change behaviour faster than checklists.</FAQItem>
        <FAQItem q="Is this list exhaustive?">No — treat it as a starter set. Every domain adds its own failure modes.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Leakage</strong> — using information at training time that wouldn't be available at inference.</li>
          <li><strong>Calibration</strong> — how well predicted probabilities match observed frequencies.</li>
          <li><strong>Drift</strong> — feature or label distribution change over time.</li>
          <li><strong>PR-AUC</strong> — precision-recall AUC; robust for imbalanced classes.</li>
          <li><strong>Skew</strong> — offline vs online mismatch in feature computation.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
