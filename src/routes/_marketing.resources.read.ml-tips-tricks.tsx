import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-tips-tricks",
  title: "Machine Learning — Tips & Tricks",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 13,
  lastUpdated: "September 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "50+ pragmatic Machine Learning tips — productivity shortcuts, Pandas tricks, feature-engineering wins, debugging strategies, and deployment habits used by senior ML engineers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "productivity", label: "1. Productivity Tips" },
  { id: "python", label: "2. Python Tips" },
  { id: "data", label: "3. Data Preparation Tricks" },
  { id: "features", label: "4. Feature Engineering Tips" },
  { id: "training", label: "5. Model Training Tricks" },
  { id: "tuning", label: "6. Hyperparameter Tuning" },
  { id: "debug", label: "7. Debugging Strategies" },
  { id: "deploy", label: "8. Deployment Tips" },
  { id: "perf", label: "9. Performance Optimisation" },
  { id: "checklist", label: "10. Final Productivity Checklist" },
  { id: "review", label: "Tips Review — Top 50" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Best Practices", tag: "AI & Data", time: "18 min" },
  { title: "Machine Learning — Common Mistakes", tag: "AI & Data", time: "13 min" },
  { title: "Machine Learning — Cheat Sheet", tag: "AI & Data", time: "8 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-tips-tricks")({
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
  component: MLTipsPage,
});

function MLTipsPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Ship ML work faster with proven workflow shortcuts.</li>
            <li>Write cleaner, more reproducible Python code.</li>
            <li>Optimise training loops and hyperparameter search.</li>
            <li>Debug ML systems methodically instead of guessing.</li>
            <li>Adopt professional engineering habits from day one.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80" caption="Figure 1 — Productivity loop: plan → prototype → measure → refactor → automate." />
      </Section>

      <Section id="productivity" title="1. Productivity Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Timebox exploration to 90 minutes — then commit or discard.</li>
          <li>Keep one <code>experiments/</code> folder with dated notebooks; delete on merge.</li>
          <li>Use Cookiecutter Data Science or your own template to skip project setup.</li>
          <li>Automate the boring parts: <code>make train</code>, <code>make eval</code>, <code>make deploy</code>.</li>
          <li>Set two focus blocks per day, no meetings — that's where real ML work happens.</li>
        </ul>
      </Section>

      <Section id="python" title="2. Python Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer f-strings over <code>str.format</code>.</li>
          <li>Use <code>pathlib.Path</code> instead of <code>os.path</code>.</li>
          <li>Type-hint public functions; catch bugs with <code>mypy</code>.</li>
          <li>Use <code>rich</code> for pretty logs and progress bars.</li>
        </ul>
        <Code>{`from pathlib import Path
import pandas as pd

def load_all_parquet(folder: Path) -> pd.DataFrame:
    return pd.concat(pd.read_parquet(p) for p in folder.glob("*.parquet"))`}</Code>
      </Section>

      <Section id="data" title="3. Data Preparation Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Sample large datasets first — never wait 20 min to discover a bug.</li>
          <li>Cache expensive preprocessing with <code>joblib.Memory</code>.</li>
          <li>Validate schema with Pandera or Pydantic before training.</li>
          <li>Fix dtypes early — <code>category</code> for low-cardinality strings saves memory.</li>
        </ul>
        <Code>{`df["state"] = df["state"].astype("category")   # 5–20x memory saving
df["ts"]   = pd.to_datetime(df["ts"], utc=True)`}</Code>
      </Section>

      <Section id="features" title="4. Feature Engineering Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Target-encode high-cardinality categoricals inside a CV fold to avoid leakage.</li>
          <li>Add ratios and interactions — they often beat any single raw feature.</li>
          <li>Use <code>scikit-learn</code> <code>Pipeline</code> so fit/transform stays leak-free.</li>
          <li>Drop features with &gt; 40% missing unless the missingness is itself informative.</li>
        </ul>
        <Code>{`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
    ("scale", StandardScaler()),
    ("clf",   LogisticRegression(max_iter=1000)),
])
pipe.fit(X_train, y_train)`}</Code>
      </Section>

      <Section id="training" title="5. Model Training Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Always set <code>random_state</code>. Determinism &gt; luck.</li>
          <li>Use early stopping — free regularisation for boosted trees and neural nets.</li>
          <li>Train on a 10% sample before running the full pipeline.</li>
          <li>Log to MLflow / Weights &amp; Biases from day one — retroactive tracking is painful.</li>
        </ul>
      </Section>

      <Section id="tuning" title="6. Hyperparameter Tuning Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer Bayesian search (Optuna) over grid search — 5–10× fewer trials.</li>
          <li>Tune the most sensitive params first: learning rate, tree depth, regularisation.</li>
          <li>Cap trials with a wall-clock budget, not trial count.</li>
        </ul>
        <Code>{`import optuna, lightgbm as lgb
def objective(trial):
    params = {
        "learning_rate": trial.suggest_float("lr", 1e-3, 0.3, log=True),
        "num_leaves":    trial.suggest_int("leaves", 15, 255),
    }
    return train_and_eval(params)
study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=50, timeout=1800)`}</Code>
      </Section>

      <Section id="debug" title="7. Debugging Strategies">
        <ul className="list-disc space-y-1 pl-5">
          <li>Overfit on 100 rows first — if you can't, the pipeline is broken.</li>
          <li>Shuffle labels — a good model should collapse to random performance.</li>
          <li>Log intermediate shapes &amp; dtypes; most bugs live there.</li>
          <li>Use <code>%debug</code> in Jupyter to drop into the last traceback.</li>
        </ul>
        <Callout tone="warning" title="Beware silent leakage"> If your validation score looks too good, look for a feature that references the future. </Callout>
      </Section>

      <Section id="deploy" title="8. Deployment Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ship your preprocessing <em>with</em> the model (Pipeline / ONNX).</li>
          <li>Version the API contract — clients break silently otherwise.</li>
          <li>Add <code>/healthz</code> and <code>/version</code> endpoints for every service.</li>
          <li>Roll out with canary + automated rollback on SLO breach.</li>
        </ul>
      </Section>

      <Section id="perf" title="9. Performance Optimisation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vectorise with NumPy / Pandas — avoid <code>iterrows</code>.</li>
          <li>Use <code>polars</code> or <code>duckdb</code> when Pandas grinds.</li>
          <li>Move inference to <code>float16</code> / <code>int8</code> where accuracy allows.</li>
          <li>Batch inference requests to amortise Python overhead.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 2 — Performance tuning stack: vectorise → parallelise → quantise → cache." />
      </Section>

      <Section id="checklist" title="10. Final Productivity Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>Repo scaffolded, virtualenv locked, lint + tests in CI.</li>
          <li>All experiments tracked with metrics + artefacts.</li>
          <li>Baseline model + reproducible training script.</li>
          <li>Deployment path documented in the README.</li>
        </ul>
      </Section>

      <Section id="review" title="Tips Review — Top 50 Productivity Tips">
        <ol className="grid list-decimal grid-cols-1 gap-x-8 gap-y-1 pl-5 sm:grid-cols-2">
          <li>Timebox exploration to 90 min.</li>
          <li>Template new projects with Cookiecutter DS.</li>
          <li>Use <code>uv</code> or <code>poetry</code> for env management.</li>
          <li>Pin dependencies from day one.</li>
          <li>Adopt <code>ruff</code> + <code>black</code>.</li>
          <li>Type-hint public functions.</li>
          <li>Use <code>pathlib</code>, not <code>os.path</code>.</li>
          <li>Prefer f-strings.</li>
          <li>Cache with <code>joblib.Memory</code>.</li>
          <li>Sample before full runs.</li>
          <li>Fix dtypes early.</li>
          <li>Category dtype for low-cardinality strings.</li>
          <li>Validate schema with Pandera.</li>
          <li>Use <code>Pipeline</code> to prevent leakage.</li>
          <li>Target-encode inside CV folds.</li>
          <li>Add ratios &amp; interactions.</li>
          <li>Set <code>random_state</code> everywhere.</li>
          <li>Enable early stopping.</li>
          <li>Log runs to MLflow / W&amp;B.</li>
          <li>Track dataset hash with runs.</li>
          <li>Prefer Optuna over grid search.</li>
          <li>Tune learning rate first.</li>
          <li>Cap tuning by wall clock.</li>
          <li>Overfit 100 rows to sanity-check.</li>
          <li>Shuffle labels to detect leakage.</li>
          <li>Log shapes and dtypes.</li>
          <li>Use <code>%debug</code> in Jupyter.</li>
          <li>Write one unit test per feature.</li>
          <li>Ship preprocessing with the model.</li>
          <li>Version the API contract.</li>
          <li>Expose <code>/healthz</code> &amp; <code>/version</code>.</li>
          <li>Canary + auto rollback.</li>
          <li>Vectorise instead of looping.</li>
          <li>Try Polars / DuckDB for big frames.</li>
          <li>Quantise for cheaper inference.</li>
          <li>Batch inference requests.</li>
          <li>Profile before optimising.</li>
          <li>Automate with <code>make</code> targets.</li>
          <li>Two deep-work blocks a day.</li>
          <li>Write the README first.</li>
          <li>Keep a runbook for every prod model.</li>
          <li>Model cards for every release.</li>
          <li>Monitor drift, not just accuracy.</li>
          <li>Retrain on schedule + on trigger.</li>
          <li>Blameless post-mortems.</li>
          <li>Pair-review models &gt; code review alone.</li>
          <li>Kill unused features quarterly.</li>
          <li>Use conventional commits.</li>
          <li>Tag releases with dataset hash.</li>
          <li>Never ship notebook code to prod.</li>
        </ol>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Small habits compound — templates, pipelines, and logs pay back for years.</li>
          <li>Debug systematically: shape, dtype, leakage, then hyperparameters.</li>
          <li>Optimise only after you can measure. Otherwise you're guessing.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Grid search or Bayesian search?">Start with a small grid, switch to Optuna once the search space grows past ~4 dimensions.</FAQItem>
        <FAQItem q="Do I need MLflow for a solo project?">Yes — future-you is a stranger. Even a single tracking URI is invaluable.</FAQItem>
        <FAQItem q="When is Polars worth it?">When Pandas takes &gt; 1 min or blows past memory — Polars is usually 5–20× faster.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Pipeline</strong> — a chained sequence of preprocessing + estimator steps.</li>
          <li><strong>Early stopping</strong> — halt training when validation stops improving.</li>
          <li><strong>Quantisation</strong> — reducing numeric precision to speed up inference.</li>
          <li><strong>Canary</strong> — releasing a new version to a small % of traffic first.</li>
          <li><strong>Drift</strong> — change in input distribution over time.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
