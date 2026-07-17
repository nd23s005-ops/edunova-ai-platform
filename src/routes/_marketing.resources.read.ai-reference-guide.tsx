import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, BookOpen, Bookmark, BookmarkCheck, CheckCircle2, ChevronRight, Clock,
  Code2, Download, FileText, Heart, Info, Lightbulb, Printer, Share2, Sparkles, Tag,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-reference-guide")({
  head: () => {
    const title = "Artificial Intelligence — Reference Guide | EduNova AI";
    const desc = "A fast lookup manual for AI: Python, ML/DL frameworks, OpenAI/TF/PyTorch/HF references, configuration, prompt engineering, deployment, and troubleshooting.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIReferenceGuidePage,
});

const RESOURCE = {
  id: "ai-reference-guide", title: "Artificial Intelligence — Reference Guide", category: "AI & Data",
  difficulty: "Beginner", readingTime: "44 min", pages: 44, lastUpdated: "May 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};
const IMG = {
  hero: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1800&q=80",
  stack: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80",
  deploy: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
};
const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "fund", label: "1. AI Fundamentals Reference" },
  { id: "python", label: "2. Python for AI" },
  { id: "ml-lib", label: "3. Machine Learning Libraries" },
  { id: "dl-fw", label: "4. Deep Learning Frameworks" },
  { id: "nn-comp", label: "5. Neural Network Components" },
  { id: "openai", label: "6. OpenAI APIs" },
  { id: "tf", label: "7. TensorFlow Reference" },
  { id: "pt", label: "8. PyTorch Reference" },
  { id: "hf", label: "9. Hugging Face Reference" },
  { id: "config", label: "10. Configuration Examples" },
  { id: "params", label: "11. Model Parameters" },
  { id: "prompt", label: "12. Prompt Engineering Reference" },
  { id: "deploy", label: "13. Deployment Reference" },
  { id: "trouble", label: "14. Troubleshooting" },
  { id: "lookup", label: "15. Quick Lookup Tables" },
  { id: "review", label: "Reference Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faq", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

function useToggleStore(key: string, id: string) {
  const [on, setOn] = useState(false);
  useEffect(() => { try { const raw = localStorage.getItem(key); const arr = raw ? (JSON.parse(raw) as string[]) : []; setOn(arr.includes(id)); } catch { /* empty */ } }, [key, id]);
  const toggle = () => { try { const raw = localStorage.getItem(key); const arr = raw ? (JSON.parse(raw) as string[]) : []; const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]; localStorage.setItem(key, JSON.stringify(next)); setOn(next.includes(id)); } catch { /* empty */ } };
  return [on, toggle] as const;
}

function AIReferenceGuidePage() {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
      let current = TOC[0].id;
      for (const item of TOC) { const s = document.getElementById(item.id); if (s && s.getBoundingClientRect().top < 140) current = item.id; }
      setActiveId(current);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => { const url = window.location.href; try { if (navigator.share) await navigator.share({ title: RESOURCE.title, url }); else { await navigator.clipboard.writeText(url); toast.success("Link copied to clipboard"); } } catch { /* empty */ } };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      <style>{`@media print{.no-print{display:none!important}.print-article{padding:0!important}body{background:#fff!important}}`}</style>
      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1" aria-hidden><div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow"><Code2 className="h-5 w-5" /></div>
            <div className="min-w-0"><p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p><p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p></div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}><Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>{bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}<span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}><Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} /><span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}><Share2 className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Share</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={() => window.print()}><Printer className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Print</span></Button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-emerald-800/70 to-teal-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-sky-500/90 text-white hover:bg-sky-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">15 Sections</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">Fast lookup for AI development — Python, ML/DL frameworks, model APIs, configuration, prompt engineering, and deployment.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {RESOURCE.readingTime} read</span>
            <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" /> {RESOURCE.pages} pages</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Updated {RESOURCE.lastUpdated}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">{RESOURCE.tags.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur"><Tag className="h-3 w-3" /> {t}</span>)}</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-14">
        <aside className="no-print hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Contents</p>
            <nav className="space-y-1 text-sm">{TOC.map((t) => <a key={t.id} href={`#${t.id}`} className={`block rounded-md px-2 py-1.5 transition ${activeId === t.id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{t.label}</a>)}</nav>
          </div>
        </aside>

        <article ref={articleRef} className="print-article prose prose-slate max-w-none dark:prose-invert">
          <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
            <ul className="mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              <li>Use AI technologies more efficiently.</li>
              <li>Quickly reference AI APIs and concepts.</li>
              <li>Understand framework configurations.</li>
              <li>Learn common implementation patterns.</li>
              <li>Improve productivity during development.</li>
              <li>Troubleshoot errors from a single lookup.</li>
            </ul>
          </Callout>

          <Section id="fund" title="1. AI Fundamentals Reference">
            <p><strong>Layered stack:</strong> data → preprocessing → model → evaluation → serving → observability. Choose the smallest layer that solves the problem before adding new ones.</p>
            <figure><img src={IMG.stack} alt="AI stack" className="rounded-xl border border-border/60" /><figcaption className="text-xs text-muted-foreground">Where each library / API fits in the AI stack.</figcaption></figure>
            <ComparisonTable headers={["Task", "Start with", "Upgrade to"]} rows={[
              ["Tabular classification/regression", "scikit-learn", "XGBoost / LightGBM"],
              ["Image classification", "torchvision + pretrained", "Fine-tuned ViT"],
              ["Text classification", "sklearn + embeddings", "Fine-tuned transformer"],
              ["Chat / assistants", "OpenAI / Gemini API", "RAG → fine-tuned"],
              ["Search", "BM25", "Hybrid BM25 + dense embeddings"],
            ]} />
          </Section>

          <Section id="python" title="2. Python for AI">
            <p><strong>Essential packages:</strong></p>
            <Code>{`# Core data
pip install numpy pandas polars pyarrow
# Visualisation
pip install matplotlib seaborn plotly
# Classical ML
pip install scikit-learn xgboost lightgbm
# Deep learning
pip install torch torchvision transformers accelerate
# Serving
pip install fastapi uvicorn pydantic`}</Code>
            <p><strong>Idioms:</strong></p>
            <Code>{`# Vectorise: never loop rows in pandas
df["z"] = (df["x"] - df["x"].mean()) / df["x"].std()

# Reproducibility
import random, numpy as np, torch
SEED = 42
random.seed(SEED); np.random.seed(SEED); torch.manual_seed(SEED)`}</Code>
          </Section>

          <Section id="ml-lib" title="3. Machine Learning Libraries">
            <p><strong>scikit-learn pipeline:</strong></p>
            <Code>{`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])
scores = cross_val_score(pipe, X, y, cv=5, scoring="f1_macro")
print(scores.mean(), scores.std())`}</Code>
            <ComparisonTable headers={["Library", "Best for", "Notes"]} rows={[
              ["scikit-learn", "Baselines, classical ML", "Consistent API, pipelines"],
              ["XGBoost", "Tabular competitions", "Handles missing values"],
              ["LightGBM", "Large tabular data", "Leaf-wise growth, fast"],
              ["CatBoost", "Categorical-heavy tabular", "Ordered boosting"],
            ]} />
          </Section>

          <Section id="dl-fw" title="4. Deep Learning Frameworks">
            <ComparisonTable headers={["Framework", "Strengths", "Trade-offs"]} rows={[
              ["PyTorch", "Research, flexibility, ecosystem", "Serving needs extra tooling"],
              ["TensorFlow / Keras", "Production, TF Serving, TFLite", "Less ergonomic for research"],
              ["JAX", "XLA speed, functional style", "Smaller ecosystem"],
            ]} />
          </Section>

          <Section id="nn-comp" title="5. Neural Network Components">
            <Code>{`import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, d_in, d_hidden, d_out, p=0.1):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(d_in, d_hidden), nn.GELU(), nn.Dropout(p),
            nn.Linear(d_hidden, d_hidden), nn.GELU(), nn.Dropout(p),
            nn.Linear(d_hidden, d_out),
        )
    def forward(self, x):
        return self.net(x)`}</Code>
          </Section>

          <Section id="openai" title="6. OpenAI APIs">
            <Code>{`from openai import OpenAI
client = OpenAI()  # OPENAI_API_KEY from env

r = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are concise."},
        {"role": "user", "content": "Summarise photosynthesis in 40 words."},
    ],
    temperature=0.2,
    response_format={"type": "json_object"},
)
print(r.choices[0].message.content)`}</Code>
            <p><strong>Key parameters:</strong> <code>model</code>, <code>temperature</code>, <code>top_p</code>, <code>max_tokens</code>, <code>tools</code>, <code>response_format</code>, <code>seed</code>.</p>
          </Section>

          <Section id="tf" title="7. TensorFlow Reference">
            <Code>{`import tensorflow as tf
from tensorflow.keras import layers, models

m = models.Sequential([
    layers.Input(shape=(28,28,1)),
    layers.Conv2D(32, 3, activation="relu"),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(64, activation="relu"),
    layers.Dense(10, activation="softmax"),
])
m.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
m.fit(train_ds, epochs=5, validation_data=val_ds)`}</Code>
          </Section>

          <Section id="pt" title="8. PyTorch Reference">
            <Code>{`import torch, torch.nn as nn, torch.optim as optim

device = "cuda" if torch.cuda.is_available() else "cpu"
model = MLP(784, 256, 10).to(device)
opt = optim.AdamW(model.parameters(), lr=3e-4, weight_decay=1e-2)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(5):
    for xb, yb in train_loader:
        xb, yb = xb.to(device), yb.to(device)
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward()
        opt.step()`}</Code>
          </Section>

          <Section id="hf" title="9. Hugging Face Reference">
            <Code>{`from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

name = "distilbert-base-uncased-finetuned-sst-2-english"
tok = AutoTokenizer.from_pretrained(name)
model = AutoModelForSequenceClassification.from_pretrained(name)

inputs = tok("EduNova AI makes learning fun.", return_tensors="pt")
with torch.no_grad():
    logits = model(**inputs).logits
label = model.config.id2label[int(logits.argmax(-1))]
print(label)`}</Code>
          </Section>

          <Section id="config" title="10. Configuration Examples">
            <Code>{`# config.yaml
seed: 42
data:
  train_path: data/train.parquet
  val_path: data/val.parquet
model:
  name: mlp
  hidden: 256
  dropout: 0.1
optim:
  lr: 3.0e-4
  weight_decay: 1.0e-2
  scheduler: cosine
  warmup_steps: 500
train:
  batch_size: 64
  epochs: 20
  precision: bf16
  grad_clip: 1.0`}</Code>
          </Section>

          <Section id="params" title="11. Model Parameters">
            <ComparisonTable headers={["Parameter", "Typical range", "Effect"]} rows={[
              ["learning_rate", "1e-5 – 3e-3", "Step size"],
              ["batch_size", "16 – 4096", "Gradient noise, memory"],
              ["weight_decay", "0 – 1e-1", "L2 regularisation"],
              ["dropout", "0.0 – 0.5", "Regularisation"],
              ["temperature (LLM)", "0.0 – 1.5", "Sampling entropy"],
              ["top_p (LLM)", "0.1 – 1.0", "Nucleus sampling"],
              ["context_length", "2k – 1M", "Max tokens per call"],
            ]} />
          </Section>

          <Section id="prompt" title="12. Prompt Engineering Reference">
            <p><strong>Anatomy:</strong> role → task → examples → constraints → format.</p>
            <Code>{`SYSTEM:
You are a strict JSON extractor. If unsure, output {"unknown": true}.

USER:
Extract the fields from the sentence.
Example input: "Ada Lovelace was born in 1815 in London."
Example output: {"name":"Ada Lovelace","year":1815,"place":"London"}

Sentence: "Alan Turing was born in 1912 in London."`}</Code>
            <ul>
              <li><strong>Chain-of-thought:</strong> "Think step by step" for multi-step reasoning.</li>
              <li><strong>Few-shot:</strong> 1–3 examples of exact input/output format.</li>
              <li><strong>Guardrails:</strong> always include an "unknown" escape hatch.</li>
            </ul>
          </Section>

          <Section id="deploy" title="13. Deployment Reference">
            <figure><img src={IMG.deploy} alt="Deployment topology" className="rounded-xl border border-border/60" /><figcaption className="text-xs text-muted-foreground">Client → gateway → model server → cache/vector DB.</figcaption></figure>
            <Code>{`# fastapi_app.py
from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

class In(BaseModel): text: str
class Out(BaseModel): label: str; score: float

@app.post("/predict", response_model=Out)
def predict(x: In):
    label, score = model_predict(x.text)
    return Out(label=label, score=score)`}</Code>
            <Code>{`# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "fastapi_app:app", "--host", "0.0.0.0", "--port", "8080"]`}</Code>
          </Section>

          <Section id="trouble" title="14. Troubleshooting">
            <ComparisonTable headers={["Symptom", "Likely cause", "First move"]} rows={[
              ["Loss NaN", "Too-high LR / bad init", "Lower LR, add grad-clip"],
              ["Training slower than expected", "CPU bottleneck / no AMP", "Enable mixed precision, DataLoader workers"],
              ["Validation accuracy plateau", "Underfitting / bad features", "Bigger model or better features"],
              ["Train ↑ Val ↓", "Overfitting", "Regularise, augment, early-stop"],
              ["LLM ignores instructions", "Weak formatting / no examples", "Add JSON format + few-shot"],
              ["High LLM latency", "No batching / large context", "Batch requests, trim context, cache"],
              ["Cold start spike", "Container image + model load", "Warm pool, smaller image, mmap weights"],
              ["OOM at inference", "Batch too large / no quantisation", "Reduce batch, quantise INT8/INT4"],
            ]} />
          </Section>

          <Section id="lookup" title="15. Quick Lookup Tables">
            <ComparisonTable headers={["Task", "Loss"]} rows={[
              ["Binary classification", "BCEWithLogitsLoss"],
              ["Multi-class classification", "CrossEntropyLoss"],
              ["Multi-label classification", "BCEWithLogitsLoss (per-class)"],
              ["Regression", "MSELoss / HuberLoss"],
              ["Contrastive", "InfoNCE / TripletLoss"],
              ["Ranking", "MarginRankingLoss"],
            ]} />
            <ComparisonTable headers={["Metric", "Use for"]} rows={[
              ["Accuracy", "Balanced classification"],
              ["Precision / Recall / F1", "Imbalanced classification"],
              ["ROC-AUC", "Threshold-independent ranking"],
              ["PR-AUC", "Very imbalanced positives"],
              ["MAE / RMSE", "Regression"],
              ["BLEU / ROUGE", "Generation quality (rough)"],
              ["Perplexity", "Language modelling"],
            ]} />
          </Section>

          <Section id="review" title="Reference Review">
            <h4>Cheat Sheets</h4>
            <ul>
              <li>AdamW + cosine schedule + warmup is a strong default.</li>
              <li>Bf16 mixed precision by default on modern GPUs.</li>
              <li>Ask LLMs for structured JSON when downstream code consumes output.</li>
              <li>Add explicit "unknown" fallback in prompts.</li>
            </ul>
            <h4>Configuration Checklist</h4>
            <ul>
              <li>Seed pinned; git SHA logged.</li>
              <li>Dataset + code + model versioned as one artefact.</li>
              <li>Metrics reported with confidence intervals.</li>
              <li>Rollback path defined before rollout.</li>
            </ul>
            <h4>Common Commands</h4>
            <Code>{`# Environment
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Training
python train.py --config configs/default.yaml

# Evaluate
python eval.py --checkpoint runs/best.pt --split val

# Serve
uvicorn app:app --host 0.0.0.0 --port 8080`}</Code>
            <h4>Best Practices Summary</h4>
            <ul>
              <li>Version everything.</li>
              <li>Overfit one batch first.</li>
              <li>Serve on the smallest model that meets the quality bar.</li>
              <li>Batch + cache + quantise before distilling.</li>
              <li>Monitor drift, latency, and cost together.</li>
            </ul>
            <h4>Quick Reference Index</h4>
            <p>Use the table of contents above or your browser's find (Ctrl/Cmd + F) to jump to any section.</p>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>Autoscaler</strong> — Scales replicas with traffic.</li>
              <li><strong>KV Cache</strong> — Cached keys/values for LLM decoding.</li>
              <li><strong>LoRA</strong> — Parameter-efficient fine-tuning.</li>
              <li><strong>Model Registry</strong> — Versioned store of model artefacts.</li>
              <li><strong>SLO</strong> — Service-Level Objective for latency/availability.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="Do I need to memorise APIs?">No. This guide exists so you don't have to. Bookmark it and use it as a lookup while you build.</FAQ>
            <FAQ q="How do I keep this current?">Libraries move fast. Always cross-check the linked official docs in References before using a snippet in production.</FAQ>
            <FAQ q="Where should I start if I'm new?">Begin with the Fundamentals section, then Python, then scikit-learn. Move to PyTorch/TF once classical baselines are comfortable.</FAQ>
          </Section>

          <References />
          <Disclaimer />
          <RelatedResources items={[
            { title: "Artificial Intelligence — Advanced Concepts", to: "/resources/read/ai-advanced-concepts" },
            { title: "Artificial Intelligence — Glossary", to: "/resources/read/ai-glossary" },
            { title: "Artificial Intelligence — Cheat Sheet", to: "/resources/read/ai-cheat-sheet" },
            { title: "Artificial Intelligence — Best Practices", to: "/resources/read/ai-best-practices" },
            { title: "Artificial Intelligence — Tips & Tricks", to: "/resources/read/ai-tips-tricks" },
            { title: "Artificial Intelligence — Project Guide", to: "/resources/read/ai-project-guide" },
          ]} />
        </article>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24"><h2>{title}</h2>{children}</section>;
}
function Code({ children }: { children: React.ReactNode }) {
  return <pre className="not-prose overflow-x-auto rounded-xl border border-border/60 bg-slate-950 p-4 text-xs leading-relaxed text-slate-100"><code>{children}</code></pre>;
}
function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (<div className="not-prose my-4 overflow-hidden rounded-xl border border-border/60"><table className="w-full text-sm"><thead className="bg-secondary/60"><tr>{headers.map((h) => <th key={h} className="p-2 text-left">{h}</th>)}</tr></thead><tbody className="[&_td]:border-t [&_td]:p-2">{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>);
}
function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return <details className="not-prose my-2 rounded-xl border border-border/60 bg-card p-4"><summary className="cursor-pointer text-sm font-semibold">{q}</summary><div className="mt-2 text-sm text-muted-foreground">{children}</div></details>;
}
function Callout({ tone, title, icon, children }: { tone: "tip" | "info" | "note" | "warning" | "success"; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const styles: Record<string, string> = { tip: "border-amber-500/40 bg-amber-500/10", info: "border-sky-500/40 bg-sky-500/10", note: "border-violet-500/40 bg-violet-500/10", warning: "border-red-500/40 bg-red-500/10", success: "border-emerald-500/40 bg-emerald-500/10" };
  const defaultIcon: Record<string, React.ReactNode> = { tip: <Lightbulb className="h-5 w-5" />, info: <Info className="h-5 w-5" />, note: <Info className="h-5 w-5" />, warning: <Info className="h-5 w-5" />, success: <CheckCircle2 className="h-5 w-5" /> };
  return (<div className={`not-prose rounded-2xl border-l-4 ${styles[tone]} p-4`}><div className="flex items-start gap-3"><div className="mt-0.5 shrink-0">{icon ?? defaultIcon[tone]}</div><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><div className="mt-1 text-sm">{children}</div></div></div></div>);
}
function References() {
  return (
    <section id="references" className="scroll-mt-24 not-prose mt-8 rounded-2xl border border-border/60 bg-card p-6">
      <h3 className="text-lg font-semibold">References</h3>
      <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
        <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
        <li><a href="https://www.tensorflow.org/api_docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow Documentation</a></li>
        <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch Documentation</a></li>
        <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn</a></li>
        <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM AI</a></li>
        <li><a href="https://www.nvidia.com/en-us/ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI</a></li>
        <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face Documentation</a></li>
        <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
        <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Lab</a></li>
        <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">CMU School of Computer Science</a></li>
        <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
        <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
        <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — cs.AI</a></li>
        <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
        <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
        <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore</a></li>
      </ul>
    </section>
  );
}
function Disclaimer() {
  return (
    <section id="disclaimer" className="scroll-mt-24 not-prose mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
      <p className="font-semibold text-foreground">Disclaimer</p>
      <p className="mt-2">This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, industry standards, and trusted educational resources. Artificial Intelligence is a rapidly evolving field, and technologies, APIs, and best practices may change over time. Learners should consult the official documentation for the latest and most accurate information.</p>
      <p className="mt-2">All trademarks, logos, product names, and intellectual property belong to their respective owners. EduNova AI does not claim ownership of any third-party materials referenced in this resource.</p>
    </section>
  );
}
function RelatedResources({ items }: { items: { title: string; to: string }[] }) {
  return (
    <div className="no-print mt-16 not-prose">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue learning</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Related resources</h2></div>
        <Link to="/resources" className="hidden text-sm font-medium text-primary hover:underline sm:inline">Browse library →</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r, i) => (
          <motion.a key={r.title} href={r.to} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }} className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"><BookOpen className="h-5 w-5" /></div>
            <p className="mt-3 text-sm font-semibold">{r.title}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Badge variant="secondary" className="text-[10px]">AI & Data</Badge></div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">Open resource <ArrowRight className="h-3 w-3" /></span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
