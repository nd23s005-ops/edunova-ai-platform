import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-project-guide",
  title: "Machine Learning — Project Guide",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "24 min",
  pages: 20,
  lastUpdated: "April 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=80",
  heroSubtitle:
    "A hands-on lifecycle guide — plan, design, develop, test, deploy, and present a portfolio-ready ML project with milestones, templates, and evaluation rubrics.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "overview", label: "1. Project Overview" },
  { id: "problem", label: "2. Problem Statement" },
  { id: "requirements", label: "3. Requirement Analysis" },
  { id: "dataset", label: "4. Dataset Selection" },
  { id: "preparation", label: "5. Data Preparation" },
  { id: "development", label: "6. Model Development" },
  { id: "evaluation", label: "7. Model Evaluation" },
  { id: "deployment", label: "8. Deployment" },
  { id: "documentation", label: "9. Documentation" },
  { id: "testing", label: "10. Testing" },
  { id: "presentation", label: "11. Final Presentation" },
  { id: "checklist", label: "12. Project Checklist" },
  { id: "review", label: "Project Review & Rubric" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Project Case Study", tag: "AI & Data", time: "21 min" },
  { title: "Machine Learning — Complete Tutorial", tag: "AI & Data", time: "24 min" },
  { title: "Machine Learning — Cheat Sheet", tag: "AI & Data", time: "4 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-project-guide")({
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
  component: MLProjectGuidePage,
});

function MLProjectGuidePage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="By the end of this guide you will">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Understand the complete ML project lifecycle.</li>
            <li>Plan, scope, and manage a Machine Learning project.</li>
            <li>Build portfolio-ready applications with clean structure.</li>
            <li>Deploy an ML model as a service.</li>
            <li>Apply industry best practices around reproducibility, testing, and documentation.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 1 — ML project lifecycle: problem → data → model → evaluation → deployment → monitoring." />
      </Section>

      <Section id="overview" title="1. Project Overview">
        <p>
          A production-grade ML project is a chain of small, verifiable steps — not a giant "train a model" block.
          Treat it like a software engineering project with a data twist: version everything, test everything,
          document as you go.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Phase</th><th className="border p-2 text-left">Duration</th><th className="border p-2 text-left">Deliverable</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Discovery</td><td className="border p-2">Week 1</td><td className="border p-2">Problem statement, success metric</td></tr>
              <tr><td className="border p-2">Data</td><td className="border p-2">Week 2</td><td className="border p-2">Cleaned dataset, EDA notebook</td></tr>
              <tr><td className="border p-2">Modelling</td><td className="border p-2">Week 3–4</td><td className="border p-2">Baseline + tuned model, metrics report</td></tr>
              <tr><td className="border p-2">Deployment</td><td className="border p-2">Week 5</td><td className="border p-2">API + demo UI</td></tr>
              <tr><td className="border p-2">Presentation</td><td className="border p-2">Week 6</td><td className="border p-2">Slide deck, README, screencast</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="problem" title="2. Problem Statement">
        <p>Every project starts with a crisp, one-paragraph problem statement covering: <strong>who</strong> the user is, <strong>what</strong> decision the model informs, the <strong>success metric</strong>, and the <strong>failure cost</strong>.</p>
        <Callout tone="tip" title="Template">
          "For &lt;user&gt;, our model will predict &lt;target&gt; given &lt;inputs&gt; so they can &lt;decision&gt;.
          Success = &lt;metric ≥ threshold&gt; on &lt;evaluation set&gt;."
        </Callout>
      </Section>

      <Section id="requirements" title="3. Requirement Analysis">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Functional:</strong> inputs, outputs, latency, throughput.</li>
          <li><strong>Non-functional:</strong> availability, security, privacy (PII), fairness constraints.</li>
          <li><strong>Constraints:</strong> compute budget, model size, on-device vs cloud.</li>
          <li><strong>Stakeholders:</strong> who signs off, who consumes the output.</li>
        </ul>
      </Section>

      <Section id="dataset" title="4. Dataset Selection">
        <p>Prefer datasets that mirror production distribution. Document licence, source, sample size, features, labels, and known biases in a <em>data card</em>.</p>
        <Code>{`# data/README.md
name: Customer Churn v1
source: internal_crm export 2026-03-01
rows: 48,213    features: 24    positive rate: 11.4%
license: internal only — do not redistribute
known biases: over-represents metro users (~78%)`}</Code>
      </Section>

      <Section id="preparation" title="5. Data Preparation">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Split first, transform second — always.</li>
          <li>Handle missing values (median / KNN / model-based).</li>
          <li>Encode categoricals (one-hot / target / hashing).</li>
          <li>Scale numerical features (Standard / Robust).</li>
          <li>Persist the fitted preprocessing pipeline with the model.</li>
        </ol>
      </Section>

      <Section id="development" title="6. Model Development">
        <p>Suggested folder structure:</p>
        <Code lang="text">{`ml-project/
├─ data/            # raw + processed, gitignored
├─ notebooks/       # EDA only
├─ src/
│  ├─ data.py       # loading + splitting
│  ├─ features.py   # transformers
│  ├─ models.py     # sklearn/torch model builders
│  ├─ train.py      # entry point
│  └─ evaluate.py
├─ tests/
├─ api/             # FastAPI wrapper
├─ Dockerfile
├─ requirements.txt
└─ README.md`}</Code>
        <Code>{`# src/train.py
from src.data import load_split
from src.models import build_pipeline
import joblib, json

X_tr, X_te, y_tr, y_te = load_split()
pipe = build_pipeline().fit(X_tr, y_tr)
score = pipe.score(X_te, y_te)
joblib.dump(pipe, "artifacts/model.joblib")
json.dump({"test_score": score}, open("artifacts/metrics.json", "w"))`}</Code>
      </Section>

      <Section id="evaluation" title="7. Model Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Always compare against a trivial baseline (mean / majority class).</li>
          <li>Report multiple metrics (accuracy, F1, ROC-AUC, PR-AUC).</li>
          <li>Slice metrics by segment (region, tenure) to catch fairness issues.</li>
          <li>Log calibration for probability-consuming systems.</li>
        </ul>
      </Section>

      <Section id="deployment" title="8. Deployment">
        <Code>{`# api/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

model = joblib.load("artifacts/model.joblib")
app = FastAPI()

class Input(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(x: Input):
    proba = float(model.predict_proba([x.features])[0, 1])
    return {"probability": proba}`}</Code>
        <p>Ship with a Dockerfile and a small load-test script. Add health, version, and metrics endpoints.</p>
      </Section>

      <Section id="documentation" title="9. Documentation">
        <p>Your README is the front door. Cover:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Problem, data, approach, results (with tables).</li>
          <li>How to reproduce (one command ideally).</li>
          <li>Deployment instructions and screenshots.</li>
          <li>Model card (intended use, limitations, ethical considerations).</li>
        </ul>
      </Section>

      <Section id="testing" title="10. Testing">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Unit tests</strong> for pre-processing functions.</li>
          <li><strong>Data tests</strong> (schema, null rates, ranges) with Great Expectations or Pandera.</li>
          <li><strong>Model tests</strong>: minimum accuracy on a held-out golden set.</li>
          <li><strong>API tests</strong>: contract + latency budget.</li>
        </ul>
      </Section>

      <Section id="presentation" title="11. Final Presentation">
        <p>10-slide deck: problem → data → approach → results → demo → limitations → next steps. Record a 3-minute screencast of the deployed API in action.</p>
        <Figure src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80" caption="Figure 2 — Portfolio-ready delivery: README, deployed demo, evaluation report, and a short screencast." />
      </Section>

      <Section id="checklist" title="12. Project Checklist">
        <ul className="list-disc space-y-1 pl-5">
          <li>[ ] Clear one-paragraph problem statement.</li>
          <li>[ ] Reproducible train script (<code>python -m src.train</code>).</li>
          <li>[ ] Baseline + tuned model with metric report.</li>
          <li>[ ] Deployment (Docker + API).</li>
          <li>[ ] Tests passing in CI.</li>
          <li>[ ] Complete README + model card.</li>
        </ul>
      </Section>

      <Section id="review" title="Project Review & Rubric">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Criterion</th><th className="border p-2 text-left">Weight</th><th className="border p-2 text-left">Excellent (A)</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Problem framing</td><td className="border p-2">10%</td><td className="border p-2">Clear user, metric, and constraints</td></tr>
              <tr><td className="border p-2">Data quality</td><td className="border p-2">20%</td><td className="border p-2">Documented, leakage-free, validated</td></tr>
              <tr><td className="border p-2">Modelling</td><td className="border p-2">25%</td><td className="border p-2">Beats baseline; well justified</td></tr>
              <tr><td className="border p-2">Engineering</td><td className="border p-2">20%</td><td className="border p-2">Reproducible, tested, containerised</td></tr>
              <tr><td className="border p-2">Deployment</td><td className="border p-2">15%</td><td className="border p-2">Live demo with monitoring</td></tr>
              <tr><td className="border p-2">Communication</td><td className="border p-2">10%</td><td className="border p-2">Excellent README + demo</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I use an existing Kaggle dataset?">Yes — but reframe the problem in a real business context and document limitations.</FAQItem>
        <FAQItem q="Do I need a fancy deep-learning model?">No. A well-tuned baseline that solves the problem is more impressive than an overkill model that barely works.</FAQItem>
        <FAQItem q="How do I show this in interviews?">Deploy it, share the URL, and be ready to explain every decision — especially trade-offs.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Model card</strong> — short doc describing intended use, data, metrics, and limitations.</li>
          <li><strong>Data card</strong> — analogous doc describing dataset provenance and biases.</li>
          <li><strong>MLOps</strong> — practices for reliable, reproducible ML in production.</li>
          <li><strong>Feature store</strong> — centralised, versioned repository of engineered features.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
