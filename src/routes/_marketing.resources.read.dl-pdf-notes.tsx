import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-pdf-notes",
  title: "Deep Learning — PDF Notes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "69 min",
  pages: 140,
  lastUpdated: "February 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80",
  heroSubtitle:
    "A chapter-wise study handbook covering Deep Learning theory, mathematics, architectures, PyTorch implementation, evaluation, and deployment — designed as a professional textbook-style reference for exams, interviews, and offline study.",
};

const TOC: TocItem[] = [
  { id: "ch1", label: "Ch 1 — Introduction to Deep Learning" },
  { id: "ch2", label: "Ch 2 — AI, ML & DL Comparison" },
  { id: "ch3", label: "Ch 3 — Neural Networks" },
  { id: "ch4", label: "Ch 4 — Mathematical Foundations" },
  { id: "ch5", label: "Ch 5 — Activation Functions" },
  { id: "ch6", label: "Ch 6 — Forward & Backpropagation" },
  { id: "ch7", label: "Ch 7 — CNN" },
  { id: "ch8", label: "Ch 8 — RNN, LSTM & GRU" },
  { id: "ch9", label: "Ch 9 — Transformers" },
  { id: "ch10", label: "Ch 10 — Computer Vision" },
  { id: "ch11", label: "Ch 11 — NLP" },
  { id: "ch12", label: "Ch 12 — Model Training" },
  { id: "ch13", label: "Ch 13 — Optimization Techniques" },
  { id: "ch14", label: "Ch 14 — Model Evaluation" },
  { id: "ch15", label: "Ch 15 — Deployment" },
  { id: "ch16", label: "Ch 16 — Best Practices" },
  { id: "ch17", label: "Ch 17 — Future of Deep Learning" },
  { id: "review", label: "PDF Notes Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Quick Revision Notes", tag: "AI & Data", time: "12 min" },
  { title: "Deep Learning — Cheat Sheet", tag: "AI & Data", time: "4 min" },
  { title: "Deep Learning — Complete Tutorial", tag: "AI & Data", time: "64 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-pdf-notes")({
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
  component: DLPdfNotesPage,
});

function KP({ items }: { items: string[] }) {
  return (
    <div className="rounded-md border border-border/60 bg-card/40 p-3">
      <p className="mb-1 text-sm font-semibold">Revision points</p>
      <ul className="list-disc space-y-1 pl-5 text-sm">{items.map(i => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

function DLPdfNotesPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="ch1" title="Chapter 1 — Introduction to Deep Learning">
        <p>
          Deep Learning (DL) is a subfield of machine learning that uses multi-layered neural
          networks to learn hierarchical representations directly from raw data. Unlike classical
          ML — which relies on hand-crafted features — DL learns features and predictions jointly.
          This chapter defines DL, motivates its rise (compute, data, algorithms), and outlines the
          topics covered in this handbook.
        </p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="Learning objectives">
          Build a strong theoretical foundation, master PyTorch, and prepare for both academic
          exams and technical interviews using this handbook as offline reference.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — Deep Learning pipeline: data → features (learned) → model → prediction → evaluation." />
        <KP items={["DL learns features + predictions jointly.", "Rise driven by GPUs, big data, and better optimisers.", "Textbook covers theory + PyTorch implementation."]} />
      </Section>

      <Section id="ch2" title="Chapter 2 — AI, ML & DL Comparison">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Aspect</th><th className="p-2 text-left">AI</th><th className="p-2 text-left">ML</th><th className="p-2 text-left">DL</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Definition</td><td className="p-2">Any intelligent behaviour</td><td className="p-2">Learns from data</td><td className="p-2">Deep neural nets</td></tr>
            <tr className="border-b"><td className="p-2">Feature engineering</td><td className="p-2">Rule-based</td><td className="p-2">Manual</td><td className="p-2">Learned</td></tr>
            <tr className="border-b"><td className="p-2">Data need</td><td className="p-2">Low</td><td className="p-2">Medium</td><td className="p-2">High</td></tr>
            <tr><td className="p-2">Compute</td><td className="p-2">Low</td><td className="p-2">Medium</td><td className="p-2">High (GPU)</td></tr>
          </tbody>
        </table>
        <KP items={["AI ⊇ ML ⊇ DL.", "DL trades compute + data for reduced feature engineering."]} />
      </Section>

      <Section id="ch3" title="Chapter 3 — Neural Networks">
        <p>
          A neural network is a composition of affine transformations and non-linear activations.
          The universal approximation theorem states that a network with a single hidden layer of
          sufficient width can approximate any continuous function on a compact set. In practice,
          depth is preferred over width because it composes features hierarchically.
        </p>
        <Code>{`import torch.nn as nn
mlp = nn.Sequential(
    nn.Linear(784, 256), nn.ReLU(),
    nn.Linear(256, 128), nn.ReLU(),
    nn.Linear(128, 10),
)`}</Code>
        <KP items={["Depth composes features hierarchically.", "Bias term shifts the decision boundary.", "Parameters = Σ (in_features × out_features + out_features)."]} />
      </Section>

      <Section id="ch4" title="Chapter 4 — Mathematical Foundations">
        <p>Key formulas you should be able to reproduce from memory:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Linear layer: <em>y = Wx + b</em>.</li>
          <li>Softmax: <em>σ(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ)</em>.</li>
          <li>Cross-entropy: <em>L = −Σᵢ yᵢ log(pᵢ)</em>.</li>
          <li>MSE: <em>L = (1/N) Σ (ŷ − y)²</em>.</li>
          <li>Gradient descent: <em>θ ← θ − η ∇L(θ)</em>.</li>
          <li>Adam update combines momentum + adaptive LR (see Ch 13).</li>
        </ul>
        <KP items={["Vectorise everything — no Python loops in hot paths.", "Broadcasting rules trip up beginners; check shapes.", "Chain rule underpins backprop."]} />
      </Section>

      <Section id="ch5" title="Chapter 5 — Activation Functions">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Function</th><th className="p-2 text-left">Formula</th><th className="p-2 text-left">Range</th><th className="p-2 text-left">Use</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Sigmoid</td><td className="p-2">1/(1+e⁻ˣ)</td><td className="p-2">(0,1)</td><td className="p-2">Binary output</td></tr>
            <tr className="border-b"><td className="p-2">Tanh</td><td className="p-2">(eˣ−e⁻ˣ)/(eˣ+e⁻ˣ)</td><td className="p-2">(−1,1)</td><td className="p-2">Zero-centred</td></tr>
            <tr className="border-b"><td className="p-2">ReLU</td><td className="p-2">max(0,x)</td><td className="p-2">[0,∞)</td><td className="p-2">Default hidden</td></tr>
            <tr className="border-b"><td className="p-2">GELU</td><td className="p-2">x·Φ(x)</td><td className="p-2">ℝ</td><td className="p-2">Transformers</td></tr>
            <tr><td className="p-2">Softmax</td><td className="p-2">exp/Σexp</td><td className="p-2">(0,1)</td><td className="p-2">Multi-class output</td></tr>
          </tbody>
        </table>
        <KP items={["Never sigmoid in deep hidden layers — vanishing gradients.", "GELU dominates transformer blocks.", "Softmax and cross-entropy are fused in nn.CrossEntropyLoss."]} />
      </Section>

      <Section id="ch6" title="Chapter 6 — Forward & Backpropagation">
        <p>
          Forward pass computes predictions and stores intermediate activations. Backprop applies
          the chain rule from loss back to parameters. PyTorch autograd builds a dynamic computation
          graph and calls <Code>{`.backward()`}</Code> on a scalar loss.
        </p>
        <Code>{`import torch
x = torch.randn(4, 3, requires_grad=False)
W = torch.randn(3, 2, requires_grad=True)
y = (x @ W).sum()
y.backward()
print(W.grad.shape)  # torch.Size([3, 2])`}</Code>
        <KP items={["Always zero_grad() before backward().", "Retain graphs only when needed (memory heavy).", "Detach tensors to stop gradients."]} />
      </Section>

      <Section id="ch7" title="Chapter 7 — Convolutional Neural Networks">
        <p>
          Convolutions exploit translation equivariance and local structure. Key hyperparameters:
          kernel size (k), stride (s), padding (p). Output spatial dimension: <em>out = ⌊(in + 2p −
          k)/s⌋ + 1</em>. Pooling reduces spatial dimensions; BatchNorm stabilises training.
        </p>
        <Code>{`nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)`}</Code>
        <KP items={["Padding='same' preserves spatial dims when stride=1.", "1×1 conv changes channel count cheaply.", "ResNets add residual connections to enable depth."]} />
      </Section>

      <Section id="ch8" title="Chapter 8 — RNN, LSTM & GRU">
        <p>
          RNNs process sequences by maintaining a hidden state. Vanilla RNNs suffer from
          vanishing/exploding gradients over long sequences. LSTMs introduce gates (input, forget,
          output) and a cell state; GRUs simplify with update and reset gates. Bidirectional
          variants concatenate forward and backward hidden states.
        </p>
        <KP items={["Use gradient clipping when training RNNs.", "LSTM has cell + hidden state; GRU only hidden.", "For very long context prefer transformers."]} />
      </Section>

      <Section id="ch9" title="Chapter 9 — Transformers">
        <p>
          Self-attention: <em>Attention(Q, K, V) = softmax(QKᵀ/√dₖ) V</em>. Multi-head attention
          runs h attention heads in parallel and concatenates outputs. Encoder blocks stack
          attention + feed-forward with residual connections and LayerNorm. Positional encodings
          restore order information.
        </p>
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 2 — Transformer encoder block: MHSA → residual → LayerNorm → FFN → residual → LayerNorm." />
        <KP items={["Attention is O(n²) in sequence length.", "LayerNorm placement matters (Pre-LN vs Post-LN).", "Positional encodings inject order."]} />
      </Section>

      <Section id="ch10" title="Chapter 10 — Computer Vision">
        <p>
          Core tasks: classification (image → class), detection (image → boxes + classes),
          segmentation (image → per-pixel class). Backbones: ResNet, EfficientNet, ViT. Data
          augmentation is the highest-leverage regulariser.
        </p>
        <KP items={["Transfer learning from ImageNet is the default.", "UNet for segmentation with skip connections.", "YOLO / DETR for detection."]} />
      </Section>

      <Section id="ch11" title="Chapter 11 — Natural Language Processing">
        <p>
          Tokenisation converts text to integer ids. Byte-Pair Encoding (BPE) and WordPiece handle
          rare words via subwords. Pretrained encoders (BERT) provide contextual representations;
          causal LMs (GPT) generate text. Fine-tuning adapts pretrained weights to downstream tasks
          with far less data than training from scratch.
        </p>
        <KP items={["BERT = bidirectional MLM.", "GPT = causal LM for generation.", "ROUGE and BERTScore complement each other."]} />
      </Section>

      <Section id="ch12" title="Chapter 12 — Model Training">
        <Code>{`for epoch in range(EPOCHS):
    for x, y in loader:
        optim.zero_grad(set_to_none=True)
        loss = criterion(model(x), y)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optim.step()`}</Code>
        <KP items={["Mixed precision doubles throughput on modern GPUs.", "Log a validation metric per epoch.", "Save best checkpoint by val metric, not train loss."]} />
      </Section>

      <Section id="ch13" title="Chapter 13 — Optimization Techniques">
        <ul className="list-disc space-y-1 pl-5">
          <li>SGD with momentum β for smoother trajectories.</li>
          <li>AdamW decouples weight decay from Adam.</li>
          <li>Cosine LR + linear warmup is a strong default.</li>
          <li>Label smoothing (0.1) improves calibration.</li>
          <li>Regularisers: dropout, weight decay, augmentation.</li>
        </ul>
        <KP items={["Warmup prevents early divergence.", "Weight decay ≠ L2 for adaptive optimisers.", "Batch size and LR often scale together."]} />
      </Section>

      <Section id="ch14" title="Chapter 14 — Model Evaluation">
        <p>Metrics depend on task: accuracy / F1 / AUROC for classification, IoU / mAP for detection, BLEU / ROUGE for text. Report per-slice metrics and confidence calibration.</p>
        <KP items={["Never tune on the test set.", "Class imbalance breaks accuracy — use F1/AUROC.", "Track calibration with ECE."]} />
      </Section>

      <Section id="ch15" title="Chapter 15 — Deployment">
        <p>Package models as TorchScript / ONNX. Serve behind a FastAPI + Triton stack, or export to CoreML / TFLite for mobile. Version everything: model, dataset, code, config.</p>
        <KP items={["Version model artefacts.", "Roll out gradually with feature flags.", "Support rollback from day one."]} />
      </Section>

      <Section id="ch16" title="Chapter 16 — Deep Learning Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Freeze splits and seeds up-front.</li>
          <li>Write config-driven code, not notebook-driven code.</li>
          <li>Track experiments (MLflow / W&amp;B).</li>
          <li>Document with model cards and datasheets.</li>
          <li>Automate testing and CI for reproducibility.</li>
        </ul>
      </Section>

      <Section id="ch17" title="Chapter 17 — Future of Deep Learning">
        <p>Trends: foundation models, multimodal systems, efficient inference (LoRA, quantisation), on-device DL, retrieval-augmented generation, and safety / alignment research.</p>
      </Section>

      <Section id="review" title="PDF Notes Review">
        <h3 className="font-semibold">Chapter-wise revision</h3>
        <p>Read the KP boxes for a two-minute per-chapter refresh. Return to full text where a KP is unclear.</p>
        <h3 className="mt-3 font-semibold">Key takeaways</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Master forward + backward pass mechanics.</li>
          <li>Know at least one architecture per modality (CNN, RNN, Transformer).</li>
          <li>Understand training + evaluation + deployment as one pipeline.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Important definitions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Epoch</strong> — one pass over the training set.</li>
          <li><strong>Overfitting</strong> — low train loss, high val loss.</li>
          <li><strong>Regularisation</strong> — techniques to reduce overfitting.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Formula sheet</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Softmax, cross-entropy, MSE.</li>
          <li>Conv output size formula.</li>
          <li>Attention formula.</li>
          <li>Adam update rules.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Exam preparation notes</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Practice deriving softmax + CE gradient by hand.</li>
          <li>Explain LayerNorm vs BatchNorm in under 60 seconds.</li>
          <li>Sketch encoder block from memory.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is this handbook enough for exam preparation?">Yes when combined with the companion Practice Questions and Answer Key resources.</FAQItem>
        <FAQItem q="Which chapter should I read first?">Read chapters 1–6 in order; later chapters can be studied independently.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Autograd</strong> — PyTorch's automatic differentiation engine.</li>
          <li><strong>LayerNorm</strong> — normalises features per-sample across the feature axis.</li>
          <li><strong>MHSA</strong> — Multi-Head Self-Attention.</li>
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
