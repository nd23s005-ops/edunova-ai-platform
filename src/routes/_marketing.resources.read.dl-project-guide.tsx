import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-project-guide",
  title: "Deep Learning — Project Guide",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "24 min",
  pages: 27,
  lastUpdated: "July 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "A complete playbook for planning, designing, building, testing, deploying, and presenting a professional Deep Learning project — from idea selection through production launch and portfolio storytelling.",
};

const TOC: TocItem[] = [
  { id: "how-to-use", label: "How to Use This Guide" },
  { id: "planning", label: "1. Project Planning" },
  { id: "problem", label: "2. Problem Identification" },
  { id: "requirements", label: "3. Requirement Analysis" },
  { id: "dataset", label: "4. Dataset Collection" },
  { id: "preprocess", label: "5. Data Preprocessing" },
  { id: "model", label: "6. Model Selection" },
  { id: "training", label: "7. Training Pipeline" },
  { id: "evaluation", label: "8. Model Evaluation" },
  { id: "deployment", label: "9. Deployment" },
  { id: "monitoring", label: "10. Monitoring" },
  { id: "docs", label: "11. Documentation" },
  { id: "portfolio", label: "12. Portfolio Presentation" },
  { id: "review", label: "Project Review & Checklists" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Best Practices", tag: "AI & Data", time: "26 min" },
  { title: "Deep Learning — Real-world Case Study", tag: "AI & Data", time: "30 min" },
  { title: "Deep Learning — Learning Roadmap", tag: "AI & Data", time: "22 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-project-guide")({
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
  component: DLProjectGuidePage,
});

function DLProjectGuidePage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="how-to-use" title="How to Use This Guide">
        <p>
          Treat this guide as a scaffold, not a script. Every section maps to a decision you will
          make once your project starts. Copy the checklists into your issue tracker and adapt the
          templates to your domain. This is a <strong>planning and delivery playbook</strong>, not a
          write-up of a finished project — for the latter, read the companion resource
          <em> Deep Learning — Project Case Study</em>.
        </p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="Learning objectives">
          Build production-ready deep-learning projects, plan and execute with software engineering
          rigour, ship deployable artefacts, and present portfolio-quality work.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80" caption="Figure 1 — Deep learning project lifecycle: plan → prepare → build → evaluate → deploy → monitor → iterate." />
      </Section>

      <Section id="planning" title="1. Project Planning">
        <p>Start with a one-page project brief. Include:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Working title</strong> and a two-sentence problem statement.</li>
          <li><strong>Target audience</strong> and how they benefit.</li>
          <li><strong>Success metric</strong> — one primary metric, one guardrail metric.</li>
          <li><strong>Scope</strong> — what is in, what is out, what is a stretch goal.</li>
          <li><strong>Timeline</strong> — 4 to 8 week milestones with weekly deliverables.</li>
        </ul>
        <p><strong>Tip:</strong> Every project has three levers — scope, quality, timeline. Fix two, negotiate the third at every milestone.</p>
      </Section>

      <Section id="problem" title="2. Problem Identification">
        <p>Frame the problem before touching data. A useful template:</p>
        <Code>{`Given <inputs>, predict <output> so that <business/user outcome>.
Currently, <status quo>. We will measure success with <metric>
and consider the project done when <target value> is reached.`}</Code>
        <p>Test the framing with a non-technical stakeholder. If they cannot restate it, refine.</p>
      </Section>

      <Section id="requirements" title="3. Requirement Analysis">
        <p>Split requirements into functional and non-functional:</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Category</th><th className="p-2 text-left">Example</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Functional</td><td className="p-2">Predict flower species from a phone photo</td></tr>
            <tr className="border-b"><td className="p-2">Performance</td><td className="p-2">Top-1 accuracy ≥ 90% on val set</td></tr>
            <tr className="border-b"><td className="p-2">Latency</td><td className="p-2">P95 inference ≤ 200 ms on-device</td></tr>
            <tr className="border-b"><td className="p-2">Data</td><td className="p-2">≥ 5000 labelled images across 20 classes</td></tr>
            <tr><td className="p-2">Compliance</td><td className="p-2">No PII stored on device</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="dataset" title="4. Dataset Collection">
        <p>Great models start with intentional datasets. Cover:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Source inventory</strong> — public sets, scraping, internal logs, human labelling.</li>
          <li><strong>Licence review</strong> — check permitted use before training.</li>
          <li><strong>Labelling protocol</strong> — write instructions, run a pilot, measure inter-annotator agreement.</li>
          <li><strong>Splits</strong> — freeze train / val / test up-front with fixed seeds.</li>
          <li><strong>Datasheet</strong> — describe collection, biases, and known gaps.</li>
        </ul>
      </Section>

      <Section id="preprocess" title="5. Data Preprocessing">
        <p>Preprocessing is a stable, versioned pipeline — not one-off notebook cells.</p>
        <Code>{`# preprocess.py
from torchvision import transforms
train_tf = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(0.1, 0.1, 0.1),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]),
])
val_tf = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]),
])`}</Code>
        <p><strong>Rules:</strong> normalise the same way at train and inference; log dataset stats; treat augmentation as a hyperparameter.</p>
      </Section>

      <Section id="model" title="6. Model Selection">
        <p>Choose the smallest architecture that satisfies your requirements.</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Task</th><th className="p-2 text-left">Starter model</th><th className="p-2 text-left">Notes</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Image classification</td><td className="p-2">ResNet18 / EfficientNet-Lite</td><td className="p-2">Fine-tune from ImageNet weights.</td></tr>
            <tr className="border-b"><td className="p-2">Object detection</td><td className="p-2">YOLOv8-n / DETR-small</td><td className="p-2">Trade latency vs mAP.</td></tr>
            <tr className="border-b"><td className="p-2">Text classification</td><td className="p-2">DistilBERT</td><td className="p-2">CPU-friendly.</td></tr>
            <tr><td className="p-2">Generation</td><td className="p-2">Small T5 / Llama-3.2-3B</td><td className="p-2">Consider hosted inference.</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="training" title="7. Training Pipeline">
        <p>Codify the pipeline so any teammate can reproduce a run.</p>
        <Code>{`# train.py
import torch, hydra
from omegaconf import DictConfig

@hydra.main(config_path='conf', config_name='train')
def main(cfg: DictConfig):
    torch.manual_seed(cfg.seed)
    model = build_model(cfg.model)
    loaders = build_loaders(cfg.data)
    optim = torch.optim.AdamW(model.parameters(), lr=cfg.lr, weight_decay=cfg.wd)
    trainer = Trainer(cfg, model, optim, loaders)
    trainer.fit()
if __name__ == '__main__': main()`}</Code>
        <p>Track experiments with MLflow or Weights &amp; Biases. Log config, code hash, dataset hash, and metrics on every run.</p>
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 2 — Training pipeline blueprint: config → deterministic loaders → model → optimizer → AMP loop → checkpoints → tracking." />
      </Section>

      <Section id="evaluation" title="8. Model Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Define the primary metric before training starts. Guardrail metrics prevent regressions on latency, bias, or robustness.</li>
          <li>Evaluate on frozen splits only. Never tune on the test set.</li>
          <li>Slice-based reporting — accuracy per class, per user segment, per device.</li>
          <li>Confidence calibration — measure Expected Calibration Error.</li>
        </ul>
      </Section>

      <Section id="deployment" title="9. Deployment">
        <p>Wrap the model as a versioned artefact and a thin API. Options:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Containerised FastAPI</strong> — flexible, easy to observe, good default.</li>
          <li><strong>Serverless inference</strong> — pay-per-call, cold-start-sensitive.</li>
          <li><strong>On-device</strong> — export to TorchScript / ONNX / CoreML, quantise to int8.</li>
        </ul>
        <Code>{`# app.py — FastAPI inference
from fastapi import FastAPI, UploadFile
import torch
model = torch.jit.load('model.ts', map_location='cpu').eval()
app = FastAPI()
@app.post('/predict')
async def predict(file: UploadFile):
    x = preprocess(await file.read())
    with torch.inference_mode():
        y = model(x).softmax(-1)
    return {'top1': int(y.argmax()), 'prob': float(y.max())}`}</Code>
      </Section>

      <Section id="monitoring" title="10. Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Service health</strong> — latency, error rate, resource use.</li>
          <li><strong>Data drift</strong> — feature and label distribution over time.</li>
          <li><strong>Prediction drift</strong> — output distribution shifts.</li>
          <li><strong>Business KPIs</strong> — did the model move the metric we cared about?</li>
        </ul>
        <p>Set alert thresholds and route them to the on-call channel. Automate retraining triggers when drift exceeds tolerance.</p>
      </Section>

      <Section id="docs" title="11. Documentation">
        <p>A minimum documentation set for a production deep-learning project:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>README</strong> — problem, setup, quickstart, how to run.</li>
          <li><strong>Model card</strong> — inputs, outputs, metrics, intended use, limitations.</li>
          <li><strong>Datasheet</strong> — data provenance, biases, splits.</li>
          <li><strong>Architecture doc</strong> — diagrams and design decisions.</li>
          <li><strong>Runbook</strong> — deployment, rollback, incident response.</li>
        </ul>
      </Section>

      <Section id="portfolio" title="12. Portfolio Presentation">
        <p>Tell the story with the audience in mind.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Lead with the outcome — one sentence, one metric.</li>
          <li>Show the architecture diagram before the code.</li>
          <li>Include a short demo video or GIF.</li>
          <li>Link the model card, dataset card, and repo.</li>
          <li>Highlight one trade-off you made and why.</li>
        </ul>
      </Section>

      <Section id="review" title="Project Review & Checklists">
        <h3 className="font-semibold">Milestone checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Week 1 — Brief signed off, dataset scoped.</li>
          <li>Week 2 — Baseline trained, metrics logged.</li>
          <li>Week 3 — Data augmentation and model iteration.</li>
          <li>Week 4 — Final training, evaluation report.</li>
          <li>Week 5 — Containerised service, monitoring dashboards.</li>
          <li>Week 6 — Documentation, portfolio write-up, demo video.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Evaluation rubric</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Problem framing (10) — clear metric, clear scope.</li>
          <li>Data quality (20) — provenance, splits, datasheet.</li>
          <li>Modelling rigour (20) — baselines, ablations, calibration.</li>
          <li>Engineering (20) — reproducibility, tests, CI.</li>
          <li>Deployment (15) — packaged service, monitoring.</li>
          <li>Communication (15) — README, model card, demo.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Deployment checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Health, readiness, and prediction endpoints.</li>
          <li>Version tags on model and code.</li>
          <li>Rollback plan documented.</li>
          <li>Alerts and dashboards live.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Final readiness checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>All tests green in CI.</li>
          <li>Model card and datasheet published.</li>
          <li>Demo runs end-to-end in a fresh environment.</li>
          <li>Portfolio page reviewed by a peer.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Plan the metric before the model.</li>
          <li>Data quality is the highest-leverage lever.</li>
          <li>Reproducibility beats cleverness.</li>
          <li>Ship a small, monitored model rather than a heroic notebook.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long should a first project take?">Four to six weeks part-time is a realistic target.</FAQItem>
        <FAQItem q="Do I need Kubernetes?">Not for portfolio projects — a single Docker container plus a managed host is enough.</FAQItem>
        <FAQItem q="How do I pick a metric?">Choose the one that aligns with user outcome, not the one that looks best on the model.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Model card</strong> — a document describing model use, metrics, and limits.</li>
          <li><strong>Datasheet</strong> — a document describing dataset creation and biases.</li>
          <li><strong>Drift</strong> — a change in input or output distribution after deployment.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards, and
          trusted educational resources. Deep learning technologies, frameworks, APIs, and best
          practices evolve continuously — consult the latest official documentation for
          authoritative guidance. All trademarks, logos, product names, and intellectual property
          belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
