import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-complete-tutorial",
  title: "Deep Learning — Complete Tutorial",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "64 min",
  pages: 86,
  lastUpdated: "January 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "An end-to-end Deep Learning tutorial in PyTorch — environment, mathematics, neural networks, CNNs, RNNs, Transformers, computer vision, NLP, training, evaluation, optimisation, deployment, and monitoring, with hands-on labs and a capstone project.",
};

const TOC: TocItem[] = [
  { id: "setup", label: "1. Environment Setup" },
  { id: "python", label: "2. Python Review" },
  { id: "math", label: "3. Mathematics" },
  { id: "nn", label: "4. Neural Networks" },
  { id: "cnn", label: "5. CNN" },
  { id: "rnn", label: "6. RNN & LSTM" },
  { id: "transformers", label: "7. Transformers" },
  { id: "cv", label: "8. Computer Vision" },
  { id: "nlp", label: "9. NLP" },
  { id: "training", label: "10. Training Models" },
  { id: "eval", label: "11. Evaluation" },
  { id: "optim", label: "12. Optimization" },
  { id: "deploy", label: "13. Deployment" },
  { id: "monitor", label: "14. Model Monitoring" },
  { id: "capstone", label: "15. Final Project" },
  { id: "review", label: "Complete Tutorial Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Beginner Guide", tag: "AI & Data", time: "18 min" },
  { title: "Deep Learning — Step-by-Step Learning Guide", tag: "AI & Data", time: "25 min" },
  { title: "Deep Learning — Best Practices", tag: "AI & Data", time: "26 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-complete-tutorial")({
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
  component: DLCompleteTutorialPage,
});

function DLCompleteTutorialPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="setup" title="1. Environment Setup">
        <p>Reproducible tooling first. This tutorial is written against PyTorch 2.4 and Python 3.11.</p>
        <Code>{`# Create environment
python -m venv .venv && source .venv/bin/activate
pip install --upgrade pip

# Core stack
pip install torch torchvision torchaudio
pip install numpy pandas matplotlib scikit-learn
pip install jupyterlab ipykernel

# Experiment tracking + config
pip install mlflow hydra-core rich`}</Code>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="What you will build">
          Working knowledge of PyTorch, four production-shape mini projects, and one capstone
          deployment.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 1 — End-to-end DL workflow covered in this tutorial: data → model → train → evaluate → deploy → monitor." />
      </Section>

      <Section id="python" title="2. Python Review">
        <p>Quick refresher on the Python idioms you will use across every chapter.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>List / dict comprehensions for data pipelines.</li>
          <li>Context managers (<Code>{`with`}</Code>) for files and no-grad blocks.</li>
          <li>Dataclasses for config objects.</li>
          <li>Type hints for readable ML code.</li>
        </ul>
        <Code>{`from dataclasses import dataclass
@dataclass
class TrainConfig:
    lr: float = 3e-4
    batch_size: int = 64
    epochs: int = 20`}</Code>
      </Section>

      <Section id="math" title="3. Mathematics">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Linear algebra</strong> — vectors, matrices, matmul, broadcasting.</li>
          <li><strong>Calculus</strong> — derivatives, chain rule, partial derivatives.</li>
          <li><strong>Probability</strong> — distributions, expectation, cross-entropy.</li>
          <li><strong>Optimisation</strong> — gradient descent, momentum, Adam.</li>
        </ul>
        <p>You do not need to derive every formula. You do need to <em>read</em> them fluently.</p>
      </Section>

      <Section id="nn" title="4. Neural Networks">
        <p>Build an MLP for tabular classification.</p>
        <Code>{`import torch.nn as nn
class MLP(nn.Module):
    def __init__(self, in_dim, hidden, out_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden), nn.GELU(), nn.Dropout(0.2),
            nn.Linear(hidden, hidden), nn.GELU(), nn.Dropout(0.2),
            nn.Linear(hidden, out_dim),
        )
    def forward(self, x): return self.net(x)`}</Code>
        <p><strong>Lab:</strong> classify Iris or a small tabular dataset from scikit-learn.</p>
      </Section>

      <Section id="cnn" title="5. CNN">
        <p>Convolutional networks are the backbone of computer vision.</p>
        <Code>{`class SmallCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
        )
        self.head = nn.Sequential(
            nn.Flatten(), nn.Linear(64*8*8, 128), nn.ReLU(),
            nn.Dropout(0.3), nn.Linear(128, num_classes),
        )
    def forward(self, x): return self.head(self.features(x))`}</Code>
        <p><strong>Lab:</strong> train on CIFAR-10 to &gt; 80% test accuracy.</p>
      </Section>

      <Section id="rnn" title="6. RNN & LSTM">
        <p>Recurrent networks process sequences step by step. LSTM adds gates that carry information across long spans.</p>
        <Code>{`class SeqTagger(nn.Module):
    def __init__(self, vocab, hidden=128, classes=5):
        super().__init__()
        self.emb  = nn.Embedding(vocab, 64)
        self.lstm = nn.LSTM(64, hidden, batch_first=True, bidirectional=True)
        self.head = nn.Linear(hidden*2, classes)
    def forward(self, x):
        h, _ = self.lstm(self.emb(x))
        return self.head(h)`}</Code>
      </Section>

      <Section id="transformers" title="7. Transformers">
        <p>Self-attention lets every token look at every other. Formula: Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V.</p>
        <Code>{`attn = nn.MultiheadAttention(embed_dim=256, num_heads=8, batch_first=True)
out, weights = attn(x, x, x)`}</Code>
        <p>Use <Code>{`nn.TransformerEncoderLayer`}</Code> to stack blocks for classification, and pretrained Hugging Face models for real tasks.</p>
      </Section>

      <Section id="cv" title="8. Computer Vision">
        <p><strong>Lab:</strong> fine-tune a pretrained ResNet on your own images.</p>
        <Code>{`import torchvision.models as m
model = m.resnet18(weights=m.ResNet18_Weights.DEFAULT)
model.fc = nn.Linear(model.fc.in_features, num_classes)`}</Code>
        <p>Augmentations that pay off: RandomResizedCrop, HorizontalFlip, ColorJitter, Mixup.</p>
      </Section>

      <Section id="nlp" title="9. NLP">
        <p><strong>Lab:</strong> fine-tune DistilBERT for sentiment.</p>
        <Code>{`from transformers import AutoTokenizer, AutoModelForSequenceClassification
tok = AutoTokenizer.from_pretrained("distilbert-base-uncased")
model = AutoModelForSequenceClassification.from_pretrained(
    "distilbert-base-uncased", num_labels=2)`}</Code>
      </Section>

      <Section id="training" title="10. Training Models">
        <Code>{`from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()
for x, y in loader:
    x, y = x.to(device), y.to(device)
    optim.zero_grad(set_to_none=True)
    with autocast():
        loss = criterion(model(x), y)
    scaler.scale(loss).backward()
    scaler.unscale_(optim)
    nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(optim); scaler.update()`}</Code>
        <p><strong>GPU tips:</strong> use <Code>{`num_workers>0`}</Code> in DataLoader, <Code>{`pin_memory=True`}</Code>, and <Code>{`torch.compile(model)`}</Code> in PyTorch 2+.</p>
      </Section>

      <Section id="eval" title="11. Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Freeze train / val / test splits with fixed seeds.</li>
          <li>Track a primary metric plus guardrails (latency, calibration).</li>
          <li>Report metrics per slice — class, region, device.</li>
        </ul>
      </Section>

      <Section id="optim" title="12. Optimization">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Lever</th><th className="p-2 text-left">Typical gain</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Mixed precision (bf16)</td><td className="p-2">1.5–2× throughput</td></tr>
            <tr className="border-b"><td className="p-2"><Code>{`torch.compile`}</Code></td><td className="p-2">10–30% speed</td></tr>
            <tr className="border-b"><td className="p-2">Bigger batch + LR warmup</td><td className="p-2">Better convergence</td></tr>
            <tr><td className="p-2">Int8 post-training quantisation</td><td className="p-2">3–4× smaller</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="deploy" title="13. Deployment">
        <p>Ship the model as a versioned artefact behind a thin API.</p>
        <Code>{`# export
scripted = torch.jit.script(model.eval())
scripted.save("model.ts")

# serve (FastAPI)
from fastapi import FastAPI, UploadFile
app = FastAPI()
model = torch.jit.load("model.ts").eval()

@app.post("/predict")
async def predict(file: UploadFile):
    x = preprocess(await file.read())
    with torch.inference_mode():
        y = model(x).softmax(-1)
    return {"top1": int(y.argmax()), "prob": float(y.max())}`}</Code>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 2 — Production topology: exported model artefact → containerised API → observability stack." />
      </Section>

      <Section id="monitor" title="14. Model Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li>Service SLOs — latency, availability, error rate.</li>
          <li>Data drift — feature and label distributions vs baseline.</li>
          <li>Prediction drift — class share vs baseline.</li>
          <li>Feedback loop — collect corrections for retraining candidates.</li>
        </ul>
      </Section>

      <Section id="capstone" title="15. Final Project">
        <p><strong>Capstone:</strong> pick a real dataset (medical X-rays, plant species, product reviews, or your own). Deliver:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Trained model with reproducible config.</li>
          <li>Evaluation report with per-slice metrics.</li>
          <li>Deployed API with a public demo.</li>
          <li>Model card, datasheet, and 3-minute walkthrough video.</li>
        </ul>
      </Section>

      <Section id="review" title="Complete Tutorial Review">
        <h3 className="font-semibold">Project checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Config-driven training with logging.</li>
          <li>Frozen splits and reproducible seeds.</li>
          <li>Deployed inference service with metrics.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Final quiz</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain the attention formula and its complexity.</li>
          <li>List three ways to speed up training on a single GPU.</li>
          <li>Describe how to detect data drift in production.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Capstone project</h3>
        <p>Publish the capstone repo with README, model card, demo, and a link back to this tutorial.</p>
        <h3 className="mt-3 font-semibold">Interview preparation</h3>
        <p>Cross-reference the companion resource <em>Deep Learning — Interview Questions</em> after completing the capstone.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master a single framework deeply — PyTorch here — before dabbling.</li>
          <li>Reproducibility (seeds, configs, splits) is not optional.</li>
          <li>Deployment and monitoring are core skills, not add-ons.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I complete this without a GPU?">Yes for chapters 1–7; chapters 8–15 are much faster on a GPU or Colab.</FAQItem>
        <FAQItem q="Should I learn TensorFlow too?">Optional. Concepts transfer; syntax differs.</FAQItem>
        <FAQItem q="How long will this tutorial take?">Roughly 60–80 hours of focused practice.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>AMP</strong> — Automatic Mixed Precision.</li>
          <li><strong>TorchScript</strong> — an ahead-of-time compiled model format.</li>
          <li><strong>SLO</strong> — Service Level Objective.</li>
          <li><strong>Model card</strong> — a document describing usage and limits.</li>
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
