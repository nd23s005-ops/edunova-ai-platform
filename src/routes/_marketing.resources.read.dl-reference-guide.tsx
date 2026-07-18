import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-reference-guide",
  title: "Deep Learning — Reference Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "38 min",
  pages: 67,
  lastUpdated: "August 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "A fast-lookup handbook for deep learning practitioners — PyTorch APIs, layers, activations, losses, optimizers, training loops, deployment workflows, debugging tips, and quick-reference tables.",
};

const TOC: TocItem[] = [
  { id: "fundamentals", label: "1. Deep Learning Fundamentals" },
  { id: "python", label: "2. Python for Deep Learning" },
  { id: "pytorch", label: "3. PyTorch API Reference" },
  { id: "layers", label: "4. Neural Network Layers" },
  { id: "activations", label: "5. Activation Functions" },
  { id: "losses", label: "6. Loss Functions" },
  { id: "optimizers", label: "7. Optimizers" },
  { id: "data", label: "8. Data Loading" },
  { id: "training", label: "9. Model Training" },
  { id: "eval", label: "10. Model Evaluation" },
  { id: "transfer", label: "11. Transfer Learning" },
  { id: "deploy", label: "12. Deployment Guide" },
  { id: "perf", label: "13. Performance Optimization" },
  { id: "debug", label: "14. Troubleshooting Guide" },
  { id: "tables", label: "15. Quick Lookup Tables" },
  { id: "review", label: "Reference Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Advanced Concepts", tag: "AI & Data", time: "39 min" },
  { title: "Deep Learning — Glossary", tag: "AI & Data", time: "13 min" },
  { title: "Machine Learning — Reference Guide", tag: "AI & Data", time: "53 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-reference-guide")({
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
  component: DLReferencePage,
});

function DLReferencePage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="fundamentals" title="1. Deep Learning Fundamentals">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What this guide is for">
          <p className="mt-1">Fast lookup — jump directly to a section, copy the snippet, and keep shipping. Written to sit next to your editor, not to be read cover-to-cover.</p>
        </Callout>
        <ul className="list-disc space-y-1 pl-5">
          <li>A deep network = differentiable layers + a loss + an optimiser + data.</li>
          <li>Training = forward → loss → backward → step, repeat.</li>
          <li>Everything else is engineering: data pipelines, precision, distribution, deployment.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — Reference map: PyTorch modules, training loop, and deployment surface." />
      </Section>

      <Section id="python" title="2. Python for Deep Learning">
        <Code>{`# Environment
python -m venv .venv && source .venv/bin/activate
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install numpy pandas matplotlib scikit-learn tqdm

# Useful idioms
from dataclasses import dataclass
from typing import Iterable, Optional
import numpy as np, torch, torch.nn as nn, torch.nn.functional as F`}</Code>
      </Section>

      <Section id="pytorch" title="3. PyTorch API Reference">
        <Code>{`# Tensors
x = torch.randn(4, 3, device="cuda")
y = torch.arange(12).view(3, 4).float()

# Autograd
w = torch.randn(3, requires_grad=True)
loss = (w ** 2).sum()
loss.backward()   # w.grad populated

# Save / load
torch.save(model.state_dict(), "ckpt.pt")
model.load_state_dict(torch.load("ckpt.pt", map_location="cuda"))

# Compile (PyTorch 2.x)
model = torch.compile(model, mode="max-autotune")`}</Code>
      </Section>

      <Section id="layers" title="4. Neural Network Layers">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr><th className="p-3 text-left">Layer</th><th className="p-3 text-left">Use case</th></tr>
            </thead>
            <tbody>
              {[
                ["nn.Linear", "Fully-connected transform"],
                ["nn.Conv2d", "2D convolution for images"],
                ["nn.ConvTranspose2d", "Upsampling / decoder"],
                ["nn.BatchNorm2d", "Batch normalisation for CNNs"],
                ["nn.LayerNorm", "Feature-wise norm — transformers"],
                ["nn.Dropout", "Regularisation via random masking"],
                ["nn.Embedding", "Lookup table for discrete tokens"],
                ["nn.MultiheadAttention", "Transformer attention block"],
                ["nn.LSTM / nn.GRU", "Recurrent sequence models"],
                ["nn.Transformer / TransformerEncoderLayer", "Prebuilt transformer stacks"],
              ].map(([a, b]) => (
                <tr key={a} className="border-t"><td className="p-3 font-mono">{a}</td><td className="p-3">{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="activations" title="5. Activation Functions">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>ReLU</strong> — fast, default for CNNs; watch out for dead units.</li>
          <li><strong>GELU / SiLU</strong> — smoother; standard in modern transformers.</li>
          <li><strong>Tanh / Sigmoid</strong> — legacy; use for gates and final probability outputs only.</li>
          <li><strong>Softmax</strong> — over classes at the output.</li>
        </ul>
      </Section>

      <Section id="losses" title="6. Loss Functions">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40"><tr><th className="p-3 text-left">Loss</th><th className="p-3 text-left">Task</th></tr></thead>
            <tbody>
              {[
                ["nn.CrossEntropyLoss", "Multi-class classification (logits in)"],
                ["nn.BCEWithLogitsLoss", "Binary / multi-label classification"],
                ["nn.MSELoss / nn.L1Loss", "Regression"],
                ["nn.HuberLoss", "Robust regression"],
                ["nn.KLDivLoss", "Distribution matching / distillation"],
                ["nn.CTCLoss", "Sequence-to-sequence alignment (speech)"],
              ].map(([a, b]) => (
                <tr key={a} className="border-t"><td className="p-3 font-mono">{a}</td><td className="p-3">{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="optimizers" title="7. Optimizers">
        <Code>{`from torch.optim import SGD, Adam, AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR, OneCycleLR

opt = AdamW(model.parameters(), lr=3e-4, weight_decay=0.1, betas=(0.9, 0.95))
sched = CosineAnnealingLR(opt, T_max=epochs)`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>SGD+momentum</strong> — CNN vision workhorse.</li>
          <li><strong>AdamW</strong> — default for transformers.</li>
          <li><strong>Lion / Sophia</strong> — memory-lean alternatives for large models.</li>
        </ul>
      </Section>

      <Section id="data" title="8. Data Loading">
        <Code>{`from torch.utils.data import Dataset, DataLoader

class TextDS(Dataset):
    def __init__(self, ids): self.ids = ids
    def __len__(self): return len(self.ids)
    def __getitem__(self, i): return self.ids[i]

loader = DataLoader(TextDS(ids), batch_size=64, shuffle=True,
                    num_workers=4, pin_memory=True, persistent_workers=True)`}</Code>
      </Section>

      <Section id="training" title="9. Model Training">
        <Code>{`scaler = torch.cuda.amp.GradScaler()
for x, y in loader:
    x, y = x.cuda(non_blocking=True), y.cuda(non_blocking=True)
    opt.zero_grad(set_to_none=True)
    with torch.cuda.amp.autocast(dtype=torch.bfloat16):
        logits = model(x)
        loss = F.cross_entropy(logits, y)
    scaler.scale(loss).backward()
    scaler.unscale_(opt)
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(opt); scaler.update(); sched.step()`}</Code>
      </Section>

      <Section id="eval" title="10. Model Evaluation">
        <Code>{`model.eval()
with torch.no_grad():
    correct = total = 0
    for x, y in val_loader:
        pred = model(x.cuda()).argmax(-1)
        correct += (pred == y.cuda()).sum().item()
        total += y.numel()
print("val_acc:", correct / total)`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>Always evaluate on a held-out set; log the best checkpoint by validation metric.</li>
          <li>Report accuracy plus a task-appropriate metric (F1, AUC, BLEU, IoU).</li>
        </ul>
      </Section>

      <Section id="transfer" title="11. Transfer Learning">
        <Code>{`# Full fine-tune
for p in model.parameters(): p.requires_grad_(True)

# LoRA-style: freeze backbone, insert low-rank adapters (peft library)
from peft import LoraConfig, get_peft_model
cfg = LoraConfig(r=8, lora_alpha=16, target_modules=["q_proj","v_proj"], lora_dropout=0.05)
model = get_peft_model(base_model, cfg)`}</Code>
      </Section>

      <Section id="deploy" title="12. Deployment Guide">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>TorchScript / torch.compile</strong> — capture the graph for stable serving.</li>
          <li><strong>ONNX + TensorRT / OpenVINO</strong> — cross-framework accelerated inference.</li>
          <li><strong>Serving stacks</strong> — Triton Inference Server, TorchServe, BentoML, vLLM (LLMs).</li>
          <li><strong>Edge</strong> — Core ML (iOS), TFLite / LiteRT, ExecuTorch.</li>
        </ul>
        <Code>{`# Export to ONNX
dummy = torch.randn(1, 3, 224, 224, device="cuda")
torch.onnx.export(model, dummy, "model.onnx", opset_version=17,
                  input_names=["x"], output_names=["y"],
                  dynamic_axes={"x": {0: "batch"}, "y": {0: "batch"}})`}</Code>
      </Section>

      <Section id="perf" title="13. Performance Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use bf16 on Ampere+ / Hopper GPUs; fp16 with GradScaler on older GPUs.</li>
          <li>Enable <code>torch.compile</code>, cudnn.benchmark, channels_last for CNNs.</li>
          <li>Turn on activation checkpointing when memory-bound.</li>
          <li>Batch across sequence padding buckets for transformer training.</li>
        </ul>
      </Section>

      <Section id="debug" title="14. Troubleshooting Guide">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40"><tr><th className="p-3 text-left">Symptom</th><th className="p-3 text-left">Likely cause &amp; fix</th></tr></thead>
            <tbody>
              {[
                ["Loss is NaN", "LR too high, fp16 without scaler, or missing normalisation. Lower LR, add clipping, switch to bf16."],
                ["Loss plateaus early", "LR too low, dead ReLUs, or bad init. Warmup + higher LR; switch to GELU/SiLU."],
                ["Val loss diverges from train", "Overfitting. Add dropout, weight decay, more data, early stopping."],
                ["OOM on GPU", "Reduce batch, enable activation checkpointing, switch to bf16, use FSDP."],
                ["Slow data loading", "Increase num_workers, use pin_memory, prefetch, cache decoded samples."],
                ["Inference latency spikes", "Warmup + persistent CUDA streams, enable torch.compile, ensure eval() + no_grad()."],
              ].map(([a, b]) => (
                <tr key={a} className="border-t"><td className="p-3 font-semibold">{a}</td><td className="p-3">{b}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="tables" title="15. Quick Lookup Tables">
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 2 — Reference dashboard: layers, losses, optimisers, and deployment targets at a glance." />
        <h3 className="mt-4 font-semibold">GPU precision cheat sheet</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>bf16</strong> — Ampere+ default; wider exponent, no scaler needed.</li>
          <li><strong>fp16</strong> — Turing / Volta; requires <code>GradScaler</code>.</li>
          <li><strong>int8</strong> — inference only; use PTQ with calibration.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Common command reference</h3>
        <Code lang="bash">{`# Multi-GPU training
torchrun --nproc_per_node=8 train.py --config config.yaml

# Serve a model with vLLM
vllm serve meta-llama/Llama-3-8B-Instruct --port 8000

# Convert to ONNX
python -m torch.onnx.export ...`}</Code>
      </Section>

      <Section id="review" title="Reference Review">
        <h3 className="font-semibold">Cheat sheets</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Layers (§4), Losses (§6), Optimizers (§7), Deployment (§12).</li>
        </ul>
        <h3 className="mt-4 font-semibold">Configuration checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Seed set for numpy, torch, and cuda.</li>
          <li>Mixed precision on; gradient clipping on.</li>
          <li>Deterministic dataloader workers and pin_memory.</li>
          <li>Checkpoint saved with model + optimizer + scheduler state.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Quick commands</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><code>torchrun</code> for multi-GPU launches.</li>
          <li><code>torch.compile</code> for graph capture.</li>
          <li><code>onnx.export</code> for cross-framework inference.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Best-practices summary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Log everything — LR, grad norm, throughput, memory.</li>
          <li>Fail fast on data — validate schemas at loader construction.</li>
          <li>Keep a single training entry point; drive variants through config.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Complete lookup index</h3>
        <p className="text-sm text-muted-foreground">Use the sticky Table of Contents on the left to jump between sections.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>PyTorch is the interface; performance comes from data pipeline + precision + compile.</li>
          <li>Most bugs are optimiser or data-shape bugs — the debug table catches 90% of them.</li>
          <li>Deployment starts at training time — export target shapes the training choices.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="bf16 or fp16?">Prefer bf16 on Ampere and newer — no loss scaling gymnastics and equivalent quality.</FAQItem>
        <FAQItem q="When should I use torch.compile?">Almost always in training; benchmark serving carefully — some ops recompile per shape.</FAQItem>
        <FAQItem q="Do I still need DDP if I use FSDP?">FSDP replaces DDP for large models; DDP is still fine when the model fits on one GPU.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Autograd</strong> — automatic differentiation engine.</li>
          <li><strong>Mixed precision</strong> — training with 16-bit compute + 32-bit master weights.</li>
          <li><strong>ONNX</strong> — Open Neural Network Exchange format.</li>
          <li><strong>Triton</strong> — NVIDIA's inference server (also a GPU-kernel DSL).</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation,
          academic publications, research papers, industry standards, and trusted educational resources.
          Deep learning technologies, frameworks, APIs, and best practices evolve continuously — always consult the
          latest official documentation of PyTorch, TensorFlow, NVIDIA, Hugging Face, and other tools referenced here
          for the most accurate information. All trademarks, logos, product names, and intellectual property belong to
          their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
