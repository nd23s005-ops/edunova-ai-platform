import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "data-science-learning-roadmap",
  title: "Data Science — Learning Roadmap",
  category: "Data & Analytics",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 9,
  lastUpdated: "March 2026",
  tags: ["Data", "ML"],
  heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&q=80",
  heroSubtitle: 'A month-by-month Data Science roadmap from beginner Python to enterprise ML engineer.',
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Ethics, Performance & Deployment" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Data Science — Beginner Guide", tag: "Data", time: "15 min" },
  { title: "Data Science — Cheat Sheet", tag: "Data", time: "3 min" },
  { title: "Data Science — Interview Questions", tag: "ML", time: "27 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/data-science-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/data-science-learning-roadmap" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Learning Roadmap</b> — practical, production-ready Data Science.</li>
          <li>Frame problems, gather data, and follow the CRISP-DM lifecycle end to end.</li>
          <li>Use Python, NumPy, Pandas, and SQL for data wrangling and analysis at scale.</li>
          <li>Build and evaluate ML and deep-learning models with scikit-learn, TensorFlow, and PyTorch.</li>
          <li>Package, deploy, and monitor models with MLOps tooling (MLflow, Airflow, Docker).</li>
          <li>Communicate insights through visualization and executive storytelling.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with Python 3.11+, JupyterLab / Colab, and the terminal.</li>
          <li>Basic statistics, linear algebra, and SQL fundamentals.</li>
          <li>Familiarity with Git, GitHub, and a Python virtual environment.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction — what Data Science is, roles, lifecycle, CRISP-DM</li>
          <li>Python — variables, functions, OOP, modules, envs, notebooks</li>
          <li>Math & statistics — linear algebra, probability, hypothesis testing</li>
          <li>NumPy — arrays, broadcasting, vectorization, linear algebra</li>
          <li>Pandas — Series, DataFrames, cleaning, merging, GroupBy, pivots</li>
          <li>Data cleaning — missing values, outliers, encoding, scaling</li>
          <li>Visualization — Matplotlib, Seaborn, Plotly, Altair, storytelling</li>
          <li>SQL for DS — joins, aggregations, window functions, tuning</li>
          <li>EDA — descriptive statistics, correlation, distributions, patterns</li>
          <li>Feature engineering — selection, extraction, PCA, dimensionality</li>
          <li>Machine learning — supervised, unsupervised, RL, recommenders</li>
          <li>scikit-learn — pipelines, CV, hyperparameter tuning, metrics</li>
          <li>Deep learning — NN, CNN, RNN, LSTM, transformers, TF / PyTorch</li>
          <li>NLP — tokenization, embeddings, sentiment, NER, LLMs, Hugging Face</li>
          <li>Computer vision — OpenCV, detection, segmentation, OCR</li>
          <li>Big data — Hadoop, Spark, PySpark, Kafka, lakes, warehouses</li>
          <li>MLOps — MLflow, DVC, versioning, monitoring, CI/CD for ML</li>
          <li>Cloud DS — SageMaker, Vertex AI, Azure ML, Databricks, BigQuery</li>
          <li>Data engineering — ETL / ELT, Airflow, dbt, pipelines</li>
          <li>Generative AI — LLMs, OpenAI / Gemini APIs, LangChain, RAG, agents</li>
          <li>Deployment — FastAPI, Flask, Streamlit, Docker, Kubernetes</li>
          <li>Real-world projects, best practices, and career roadmap</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Data Science combines <b>statistics</b>, <b>programming</b>, and <b>domain knowledge</b> to turn raw data into decisions and products. From dashboards and forecasts to recommender systems and LLM agents, it's the discipline behind most modern data-driven features. This resource — <b>Data Science — Learning Roadmap</b> — is self-contained: A month-by-month Data Science roadmap from beginner Python to enterprise ML engineer.</p>
        <Callout tone="info" title="Data Science in one line">Data Science = Ask a question → collect data → clean and explore → model → evaluate → deploy → monitor → iterate.</Callout>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 1 — The Data Science lifecycle — business understanding, data prep, modeling, evaluation, deployment, and monitoring." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Lifecycle</b> — CRISP-DM: business understanding → data understanding → prep → modeling → evaluation → deployment.</li>
          <li><b>Python stack</b> — Python 3.11+, virtualenv / poetry, Jupyter, Colab, VS Code.</li>
          <li><b>Math</b> — linear algebra, calculus, probability, statistics, hypothesis testing, Bayesian inference.</li>
          <li><b>Data wrangling</b> — NumPy vectorization, Pandas DataFrames, joins, GroupBy, pivots, window functions.</li>
          <li><b>Cleaning</b> — missing values (impute / drop), outliers (IQR / z-score), encoding (one-hot / target), scaling.</li>
          <li><b>Visualization</b> — Matplotlib, Seaborn, Plotly, Altair; dashboards with Streamlit / Power BI / Tableau.</li>
          <li><b>SQL</b> — SELECT / joins / aggregations, window functions, CTEs, query planning.</li>
          <li><b>ML</b> — regression, classification, clustering, recommenders, ensemble methods, XGBoost / LightGBM.</li>
          <li><b>Deep learning</b> — NN, CNN, RNN, LSTM, transformers with TensorFlow / Keras / PyTorch.</li>
          <li><b>NLP</b> — tokenization, embeddings, transformers, LLMs, Hugging Face, RAG, prompt engineering.</li>
          <li><b>Computer vision</b> — OpenCV, image classification, object detection, segmentation, OCR.</li>
          <li><b>Big data</b> — Hadoop, Spark / PySpark, Kafka, Delta Lake, Snowflake, BigQuery.</li>
          <li><b>MLOps</b> — MLflow, DVC, Airflow, feature stores, model registries, monitoring, drift.</li>
          <li><b>Cloud</b> — AWS SageMaker, Google Vertex AI, Azure ML, Databricks.</li>
          <li><b>Deployment</b> — FastAPI, Flask, Streamlit, Docker, Kubernetes, CI/CD for ML.</li>
          <li><b>Ethics</b> — bias, fairness, privacy, PII, responsible AI, explainability (SHAP / LIME).</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Raw Data (DB / API / Files / Streams)
   │
   ▼
[ Ingest ] → ETL / ELT (Airflow, dbt, Spark)
   │
   ▼
[ Storage ] → Data Lake / Warehouse (S3, BigQuery, Snowflake)
   │
   ▼
[ Prep + EDA ] → Pandas / SQL / Spark → cleaning, features, viz
   │
   ▼
[ Modeling ] → scikit-learn / XGBoost / PyTorch / TensorFlow
   │
   ▼
[ Evaluate ] → CV, holdout, metrics, SHAP explanations
   │
   ▼
[ Deploy ] → FastAPI + Docker → Kubernetes / SageMaker / Vertex AI
   │
   ▼
[ Monitor ] → MLflow, Prometheus, drift + performance alerts → retrain loop`}
        </pre>
        <Code lang="python">{`# End-to-end scikit-learn pipeline — clean → encode → scale → model → evaluate
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import classification_report

df = pd.read_csv("customers.csv")
X, y = df.drop("churn", axis=1), df["churn"]

num = X.select_dtypes("number").columns
cat = X.select_dtypes("object").columns

pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer()), ("sc", StandardScaler())]), num),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat),
])

pipe = Pipeline([("pre", pre), ("clf", GradientBoostingClassifier())])

Xtr, Xte, ytr, yte = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)
print("CV F1:", cross_val_score(pipe, Xtr, ytr, scoring="f1", cv=5).mean())
pipe.fit(Xtr, ytr)
print(classification_report(yte, pipe.predict(Xte)))`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80" caption="Figure 2 — ML pipeline — ingestion → features → training → evaluation → deployment → monitoring loop." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sales & demand forecasting</b> — time-series models on retail POS data.</li>
          <li><b>Customer churn</b> — gradient boosting on CRM + usage features.</li>
          <li><b>Fraud detection</b> — anomaly detection + supervised models on transaction streams.</li>
          <li><b>Recommenders</b> — collaborative filtering + embeddings for e-commerce and media.</li>
          <li><b>NLP</b> — sentiment, classification, RAG assistants over private corpora.</li>
          <li><b>Computer vision</b> — defect detection, medical imaging, OCR pipelines.</li>
          <li><b>Generative AI</b> — LLM apps with LangChain, RAG, and agents for automation.</li>
        </ul>
        <Code lang="python">{`# Quick EDA in Pandas
import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
print(df.describe(include="all"))
print(df.groupby("region")["revenue"].sum().sort_values(ascending=False).head(10))
print(df["revenue"].isna().mean())  # missing rate
`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Start with the <b>business question</b> and success metric before touching data.</li>
          <li>Version data, code, and models (Git + DVC + MLflow) — never train on unversioned data.</li>
          <li>Split train / validation / test <b>before</b> feature engineering to avoid leakage.</li>
          <li>Use pipelines (<code>sklearn.Pipeline</code>) so preprocessing is refit per fold.</li>
          <li>Track experiments with MLflow / Weights &amp; Biases — hyperparameters, metrics, artifacts.</li>
          <li>Prefer simple baselines (logistic / linear / rules) before neural networks.</li>
          <li>Explain models with SHAP / LIME and audit for bias on protected attributes.</li>
          <li>Automate retraining and monitoring — accuracy alone isn't enough in production.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Data leakage</b> — using future or target-derived features during training.</li>
          <li><b>Overfitting</b> — high train accuracy, poor test accuracy; not using CV.</li>
          <li><b>Wrong metric</b> — optimizing accuracy on imbalanced problems.</li>
          <li>Ignoring class imbalance; not stratifying splits.</li>
          <li>Hand-crafted preprocessing outside pipelines → non-reproducible results.</li>
          <li>Deploying a model without monitoring for drift and stale features.</li>
          <li>Skipping documentation — future you won't remember the assumptions.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>pandas.DataFrame.describe(include="all")</code> and <code>df.info()</code> on every new dataset.</li>
          <li>Profile with <code>ydata-profiling</code> or <code>sweetviz</code> for one-line EDA reports.</li>
          <li>Cache expensive computations with <code>joblib.Memory</code> or <code>functools.lru_cache</code>.</li>
          <li>Use Polars / DuckDB for large in-memory analytics when Pandas becomes slow.</li>
          <li>Prefer vectorized NumPy / Pandas ops over Python loops — often 10-100× faster.</li>
          <li>Track everything with MLflow so results are reproducible weeks later.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Concept / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Pandas vs Polars</td><td>DataFrame libraries</td><td>Pandas for ecosystem; Polars for large / performance workloads.</td></tr>
              <tr><td className="py-2 pr-4">scikit-learn vs XGBoost</td><td>Classical ML</td><td>scikit-learn for baselines; XGBoost / LightGBM for tabular winners.</td></tr>
              <tr><td className="py-2 pr-4">TensorFlow vs PyTorch</td><td>Deep learning</td><td>PyTorch for research + flexibility; TF for large production stacks.</td></tr>
              <tr><td className="py-2 pr-4">Batch vs Streaming</td><td>Data pipelines</td><td>Batch for reports; streaming (Kafka + Spark) for realtime.</td></tr>
              <tr><td className="py-2 pr-4">MLflow vs W&amp;B</td><td>Experiment tracking</td><td>MLflow for open source + self-host; W&amp;B for hosted UX.</td></tr>
              <tr><td className="py-2 pr-4">FastAPI vs Streamlit</td><td>Serving</td><td>FastAPI for JSON APIs; Streamlit for interactive apps.</td></tr>
              <tr><td className="py-2 pr-4">SageMaker vs Vertex AI</td><td>Cloud ML</td><td>SageMaker on AWS; Vertex AI on GCP; both fully managed.</td></tr>
              <tr><td className="py-2 pr-4">Warehouse vs Lake</td><td>Storage</td><td>Warehouse for BI; lake for raw + ML; lakehouse for both.</td></tr>
              <tr><td className="py-2 pr-4">RAG vs Fine-tuning</td><td>LLM adaptation</td><td>RAG for fresh knowledge; fine-tune for style / domain patterns.</td></tr>
              <tr><td className="py-2 pr-4">Batch vs Online Inference</td><td>Serving mode</td><td>Batch nightly scoring; online for per-request predictions.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Ethics, Performance & Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Ethics</b> — audit for bias, fairness across groups; document data provenance and consent.</li>
          <li><b>Privacy</b> — strip PII, use hashing / anonymization, follow GDPR / HIPAA / DPDP.</li>
          <li><b>Performance</b> — profile with cProfile / snakeviz, vectorize hot loops, use GPUs for DL, cache features.</li>
          <li><b>Deployment</b> — package models as FastAPI + Docker; scale on Kubernetes or serverless (SageMaker / Vertex AI).</li>
          <li><b>Observability</b> — log inputs, predictions, and drift; alert on distribution and metric decay.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Data Science is a lifecycle — problem framing matters as much as modeling.</li>
          <li>Master Python, Pandas, NumPy, SQL, and statistics before advanced ML.</li>
          <li>Always start with strong baselines; add complexity only when it earns its keep.</li>
          <li>Guard against leakage, imbalance, and misleading metrics.</li>
          <li>Track experiments, version data + models, and deploy through MLOps.</li>
          <li>Deliver value through storytelling and dashboards, not only accuracy numbers.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need a PhD for Data Science?">No — most industry roles focus on solid Python, SQL, statistics, and pragmatic ML. A portfolio matters more than degrees.</FAQItem>
        <FAQItem q="How much math do I really need?">Working knowledge of linear algebra, probability, and statistics is enough to start. Deep-learning research needs more.</FAQItem>
        <FAQItem q="Data Scientist vs ML Engineer?">Data Scientists focus on analysis, modeling, and insights; ML Engineers focus on productionizing models at scale.</FAQItem>
        <FAQItem q="Which cloud should I learn?">Any one is fine — patterns transfer across AWS SageMaker, GCP Vertex AI, and Azure ML.</FAQItem>
        <FAQItem q="Is generative AI replacing Data Science?">No — LLMs are a powerful tool inside the pipeline, but statistics, evaluation, and data engineering remain essential.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://docs.python.org/3/" target="_blank" rel="noreferrer">Python</a> · <a className="text-primary hover:underline" href="https://numpy.org/doc/" target="_blank" rel="noreferrer">NumPy</a> · <a className="text-primary hover:underline" href="https://pandas.pydata.org/docs/" target="_blank" rel="noreferrer">Pandas</a></li>
          <li><a className="text-primary hover:underline" href="https://scikit-learn.org/stable/" target="_blank" rel="noreferrer">scikit-learn</a> · <a className="text-primary hover:underline" href="https://www.tensorflow.org/" target="_blank" rel="noreferrer">TensorFlow</a> · <a className="text-primary hover:underline" href="https://pytorch.org/docs/" target="_blank" rel="noreferrer">PyTorch</a></li>
          <li><a className="text-primary hover:underline" href="https://spark.apache.org/docs/latest/" target="_blank" rel="noreferrer">Apache Spark</a> · <a className="text-primary hover:underline" href="https://mlflow.org/docs/latest/" target="_blank" rel="noreferrer">MLflow</a> · <a className="text-primary hover:underline" href="https://huggingface.co/docs" target="_blank" rel="noreferrer">Hugging Face</a></li>
          <li><a className="text-primary hover:underline" href="https://platform.openai.com/docs" target="_blank" rel="noreferrer">OpenAI API</a> · <a className="text-primary hover:underline" href="https://ai.google.dev/" target="_blank" rel="noreferrer">Gemini API</a> · <a className="text-primary hover:underline" href="https://www.kaggle.com/" target="_blank" rel="noreferrer">Kaggle</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is for educational purposes only. All library and platform names are trademarks of their respective owners. Always consult the official documentation and validate models on your own data before deployment.</p>
      </Section>
    </ReaderShell>
  );
}
