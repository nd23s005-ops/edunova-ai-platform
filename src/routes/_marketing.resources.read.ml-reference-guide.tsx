import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-reference-guide",
  title: "Machine Learning — Reference Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "53 min",
  pages: 87,
  lastUpdated: "March 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle:
    "A fast-lookup Machine Learning handbook — Python, NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch, preprocessing, metrics, deployment, MLOps, and troubleshooting recipes in one place.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "fundamentals", label: "1. ML Fundamentals" },
  { id: "python", label: "2. Python for ML" },
  { id: "numpy", label: "3. NumPy Reference" },
  { id: "pandas", label: "4. Pandas Reference" },
  { id: "sklearn", label: "5. Scikit-learn API" },
  { id: "tf", label: "6. TensorFlow Reference" },
  { id: "torch", label: "7. PyTorch Reference" },
  { id: "prep", label: "8. Data Preprocessing" },
  { id: "features", label: "9. Feature Engineering" },
  { id: "eval", label: "10. Model Evaluation" },
  { id: "tuning", label: "11. Hyperparameter Tuning" },
  { id: "deploy", label: "12. Model Deployment" },
  { id: "mlops", label: "13. MLOps Reference" },
  { id: "trouble", label: "14. Troubleshooting Guide" },
  { id: "lookup", label: "15. Quick Lookup Tables" },
  { id: "review", label: "Reference Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Cheat Sheet", tag: "AI & Data", time: "8 min" },
  { title: "Machine Learning — Glossary", tag: "AI & Data", time: "12 min" },
  { title: "Machine Learning — Best Practices", tag: "AI & Data", time: "18 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-reference-guide")({
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
  component: MLReferencePage,
});

function MLReferencePage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Look up ML APIs, syntax, and workflows in seconds.</li>
            <li>Standardise your preprocessing and evaluation choices.</li>
            <li>Move from prototype to production with a reliable checklist.</li>
            <li>Debug common failures using the troubleshooting matrix.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 1 — ML lifecycle: problem → data → features → model → evaluate → deploy → monitor." />
      </Section>

      <Section id="fundamentals" title="1. Machine Learning Fundamentals">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Supervised</strong> — labelled data → classification / regression.</li>
          <li><strong>Unsupervised</strong> — no labels → clustering, dimensionality reduction.</li>
          <li><strong>Reinforcement</strong> — agent learns via rewards from an environment.</li>
        </ul>
        <p><strong>Standard flow:</strong> collect → clean → split → engineer → train → validate → tune → test → deploy → monitor.</p>
      </Section>

      <Section id="python" title="2. Python for ML — Essentials">
        <Code>{`# Environment
python -m venv .venv && source .venv/bin/activate
pip install -U pip numpy pandas scikit-learn matplotlib jupyter

# Modern package manager (recommended)
uv init && uv add numpy pandas scikit-learn`}</Code>
        <Code>{`# Idiomatic patterns
from pathlib import Path
data_dir = Path("data")
files = sorted(data_dir.glob("*.csv"))

# Type-hinted helper
def mean(xs: list[float]) -> float:
    return sum(xs) / len(xs)`}</Code>
      </Section>

      <Section id="numpy" title="3. NumPy Reference">
        <Code>{`import numpy as np
a = np.array([[1, 2], [3, 4]])
a.shape        # (2, 2)
a.mean(axis=0) # column means
a @ a.T        # matrix product
np.random.default_rng(42).normal(size=(3, 3))`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <code>np.random.default_rng()</code> over legacy <code>np.random.seed()</code>.</li>
          <li>Broadcast — align shapes from the right, size 1 stretches.</li>
          <li>Vectorise; avoid Python loops on arrays.</li>
        </ul>
      </Section>

      <Section id="pandas" title="4. Pandas Reference">
        <Code>{`import pandas as pd
df = pd.read_csv("data.csv", parse_dates=["ts"])
df.info(); df.describe(include="all")
df.query("age > 18 and country == 'IN'")
df.groupby("segment")["revenue"].agg(["sum", "mean"])
df.assign(revenue_k=lambda d: d["revenue"] / 1_000)
df.to_parquet("out.parquet")`}</Code>
        <Callout tone="tip" title="Speed">Use <code>category</code> dtype for low-cardinality strings and <code>polars</code> when Pandas grinds.</Callout>
      </Section>

      <Section id="sklearn" title="5. Scikit-learn API">
        <Code>{`from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

num = Pipeline([("imp", SimpleImputer()), ("sc", StandardScaler())])
cat = Pipeline([("imp", SimpleImputer(strategy="most_frequent")),
                ("oh", OneHotEncoder(handle_unknown="ignore"))])
pre = ColumnTransformer([("num", num, num_cols), ("cat", cat, cat_cols)])

pipe = Pipeline([("pre", pre), ("clf", LogisticRegression(max_iter=1000))])
print(cross_val_score(pipe, X, y, cv=5, scoring="roc_auc").mean())`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every estimator has <code>fit / predict / score</code>.</li>
          <li>Use <code>Pipeline</code> + <code>ColumnTransformer</code> to keep preprocessing leak-free.</li>
          <li>Persist with <code>joblib.dump(pipe, "model.joblib")</code>.</li>
        </ul>
      </Section>

      <Section id="tf" title="6. TensorFlow Reference">
        <Code>{`import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation="softmax"),
])
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
model.fit(x_train, y_train, validation_split=0.2, epochs=10)`}</Code>
      </Section>

      <Section id="torch" title="7. PyTorch Reference">
        <Code>{`import torch, torch.nn as nn
from torch.utils.data import DataLoader

class Net(nn.Module):
    def __init__(self, d_in, d_out):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(d_in, 64), nn.ReLU(),
                                 nn.Dropout(0.2), nn.Linear(64, d_out))
    def forward(self, x): return self.net(x)

model = Net(20, 2)
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

for xb, yb in DataLoader(train_ds, batch_size=64, shuffle=True):
    opt.zero_grad()
    loss = loss_fn(model(xb), yb)
    loss.backward(); opt.step()`}</Code>
      </Section>

      <Section id="prep" title="8. Data Preprocessing">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Missing:</strong> <code>SimpleImputer</code>, <code>KNNImputer</code>, or model-based.</li>
          <li><strong>Scaling:</strong> <code>StandardScaler</code>, <code>MinMaxScaler</code>, <code>RobustScaler</code>.</li>
          <li><strong>Categorical:</strong> <code>OneHotEncoder</code>, <code>OrdinalEncoder</code>, target/CatBoost encoding.</li>
          <li><strong>Text:</strong> <code>TfidfVectorizer</code>, subword tokenisers, embeddings.</li>
        </ul>
      </Section>

      <Section id="features" title="9. Feature Engineering">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ratios, differences, moving averages, lag features (time series).</li>
          <li>Datetime → year/month/day/weekday/hour + is_holiday flags.</li>
          <li>Interactions via <code>PolynomialFeatures</code> or hand-crafted.</li>
          <li>Feature selection: mutual info, permutation importance, SHAP.</li>
        </ul>
      </Section>

      <Section id="eval" title="10. Model Evaluation">
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60"><tr><th className="p-2">Task</th><th className="p-2">Metric</th><th className="p-2">When</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border/60">
              <tr><td className="p-2">Binary classify</td><td className="p-2">ROC-AUC, PR-AUC</td><td className="p-2">Balanced / imbalanced</td></tr>
              <tr><td className="p-2">Multiclass</td><td className="p-2">Macro-F1, log-loss</td><td className="p-2">Uneven classes</td></tr>
              <tr><td className="p-2">Regression</td><td className="p-2">MAE, RMSE, R²</td><td className="p-2">Robust vs sensitive</td></tr>
              <tr><td className="p-2">Ranking</td><td className="p-2">NDCG, MAP</td><td className="p-2">Recsys / search</td></tr>
              <tr><td className="p-2">Text gen</td><td className="p-2">BLEU, ROUGE, humans</td><td className="p-2">Summaries / MT</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="tuning" title="11. Hyperparameter Tuning">
        <Code>{`import optuna
def objective(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 200, 2000, step=100),
        "learning_rate": trial.suggest_float("lr", 1e-3, 0.3, log=True),
        "num_leaves": trial.suggest_int("leaves", 15, 255),
    }
    return train_and_eval(params)  # returns validation AUC

study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=50, timeout=1800)
print(study.best_params)`}</Code>
      </Section>

      <Section id="deploy" title="12. Model Deployment">
        <Code lang="python">{`# FastAPI serving skeleton
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("model.joblib")

class Payload(BaseModel):
    features: list[float]

@app.get("/healthz")
def health(): return {"status": "ok"}

@app.post("/predict")
def predict(p: Payload):
    return {"prediction": float(model.predict([p.features])[0])}`}</Code>
        <Code lang="dockerfile">{`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]`}</Code>
      </Section>

      <Section id="mlops" title="13. MLOps Reference">
        <ul className="list-disc space-y-1 pl-5">
          <li>Version code (Git), data (DVC / lakeFS), models (MLflow / SageMaker).</li>
          <li>CI: lint → tests → data validation → training smoke → build image.</li>
          <li>CD: canary → blue-green → auto rollback on SLO breach.</li>
          <li>Observe: latency SLOs, feature drift (PSI/KS), delayed-label quality.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" caption="Figure 2 — MLOps pipeline: source → build → train → validate → package → deploy → monitor." />
      </Section>

      <Section id="trouble" title="14. Troubleshooting Guide">
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60"><tr><th className="p-2">Symptom</th><th className="p-2">Likely cause</th><th className="p-2">Fix</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border/60">
              <tr><td className="p-2">Val ≫ train score</td><td className="p-2">Leakage</td><td className="p-2">Audit features, use Pipeline</td></tr>
              <tr><td className="p-2">Train ≫ val</td><td className="p-2">Overfitting</td><td className="p-2">Regularise, more data, simpler model</td></tr>
              <tr><td className="p-2">Both scores low</td><td className="p-2">Underfitting</td><td className="p-2">Richer model, better features</td></tr>
              <tr><td className="p-2">Loss = NaN</td><td className="p-2">LR too high / bad scaling</td><td className="p-2">Lower LR, standardise inputs</td></tr>
              <tr><td className="p-2">Drift alarms</td><td className="p-2">Distribution shift</td><td className="p-2">Retrain, rethink features</td></tr>
              <tr><td className="p-2">High latency</td><td className="p-2">Big model / no batching</td><td className="p-2">Quantise, batch, cache</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="lookup" title="15. Quick Lookup Tables">
        <h3 className="font-semibold">Scikit-learn — common estimators</h3>
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60"><tr><th className="p-2">Task</th><th className="p-2">Estimator</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border/60">
              <tr><td className="p-2">Binary/Multi classify</td><td className="p-2"><code>LogisticRegression</code>, <code>RandomForestClassifier</code>, <code>GradientBoostingClassifier</code></td></tr>
              <tr><td className="p-2">Regression</td><td className="p-2"><code>Ridge</code>, <code>Lasso</code>, <code>RandomForestRegressor</code>, <code>GradientBoostingRegressor</code></td></tr>
              <tr><td className="p-2">Clustering</td><td className="p-2"><code>KMeans</code>, <code>DBSCAN</code>, <code>AgglomerativeClustering</code></td></tr>
              <tr><td className="p-2">Dim. reduction</td><td className="p-2"><code>PCA</code>, <code>TruncatedSVD</code>, <code>UMAP</code></td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="review" title="Reference Review">
        <h3 className="font-semibold">Cheat sheets</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Pandas 15-command survival kit: <code>read_csv</code>, <code>info</code>, <code>describe</code>, <code>query</code>, <code>groupby</code>, <code>merge</code>, <code>pivot_table</code>, <code>assign</code>, <code>apply</code>, <code>fillna</code>, <code>dropna</code>, <code>astype</code>, <code>rename</code>, <code>sort_values</code>, <code>to_parquet</code>.</li>
          <li>Sklearn 10: <code>Pipeline</code>, <code>ColumnTransformer</code>, <code>train_test_split</code>, <code>cross_val_score</code>, <code>GridSearchCV</code>, <code>classification_report</code>, <code>roc_auc_score</code>, <code>StandardScaler</code>, <code>OneHotEncoder</code>, <code>joblib.dump</code>.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Configuration checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Fixed <code>random_state</code>? ✅</li>
          <li>All experiments logged to MLflow? ✅</li>
          <li>Data schema validated (Pandera)? ✅</li>
          <li>Model persisted with joblib / ONNX? ✅</li>
        </ul>
        <h3 className="mt-4 font-semibold">Quick commands</h3>
        <Code lang="bash">{`# Training smoke
python -m src.models.train --config configs/baseline.yaml

# Batch inference
python -m src.models.predict --input data/latest.parquet --out preds.parquet

# Serve
uvicorn app:app --host 0.0.0.0 --port 8080`}</Code>
        <h3 className="mt-4 font-semibold">Best practices summary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Baseline first, complexity later.</li>
          <li>Ship preprocessing with the model.</li>
          <li>Monitor drift + quality, not just latency.</li>
          <li>Document model cards + runbooks.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Reference guides pay compound interest — bookmark and revisit weekly.</li>
          <li>Pipelines and versioning are the safety net for real projects.</li>
          <li>Deploy small, deploy often; measure before optimising.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Scikit-learn or PyTorch first?">Scikit-learn for tabular fundamentals; PyTorch when you're ready for deep learning.</FAQItem>
        <FAQItem q="How do I persist a full pipeline?">Serialise the fitted <code>Pipeline</code> with <code>joblib.dump</code>; it will bundle preprocessing + model.</FAQItem>
        <FAQItem q="ONNX vs joblib?">joblib for Python-only serving; ONNX for cross-language / edge / accelerator deployment.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Pipeline</strong> — ordered preprocessing + estimator stages.</li>
          <li><strong>ColumnTransformer</strong> — apply different preprocessing to different columns.</li>
          <li><strong>Registry</strong> — versioned model artefact store.</li>
          <li><strong>Runbook</strong> — steps for on-call to fix common incidents.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
