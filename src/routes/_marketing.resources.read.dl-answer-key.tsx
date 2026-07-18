import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-answer-key",
  title: "Deep Learning — Answer Key",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "25 min",
  pages: 29,
  lastUpdated: "June 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "Fully worked solutions, rubric-based marking, and examiner notes for every item in the Deep Learning Practice Questions workbook — including PyTorch code, alternative approaches, and common mistakes.",
};

const TOC: TocItem[] = [
  { id: "overview", label: "1. Answer Guide Overview" },
  { id: "objective", label: "2. Objective Answers" },
  { id: "short", label: "3. Short Answer Solutions" },
  { id: "long", label: "4. Long Answer Solutions" },
  { id: "coding", label: "5. Coding Solutions" },
  { id: "diagram", label: "6. Diagram Explanations" },
  { id: "case", label: "7. Case Study Solutions" },
  { id: "rubric", label: "8. Rubric & Marking Scheme" },
  { id: "errors", label: "9. Common Errors" },
  { id: "final", label: "10. Final Review" },
  { id: "review", label: "Answer Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Practice Questions", tag: "AI & Data", time: "27 min" },
  { title: "Deep Learning — Interview Questions", tag: "AI & Data", time: "34 min" },
  { title: "Deep Learning — Reference Guide", tag: "AI & Data", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-answer-key")({
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
  component: DLAnswerKeyPage,
});

function A({ n, ans, why, alt, mistake, marks }: { n: number; ans: string; why: string; alt?: string; mistake?: string; marks?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="mb-1 font-semibold">Q{n}. <span className="text-primary">{ans}</span></p>
      <p className="mb-1 text-sm"><strong>Why:</strong> {why}</p>
      {alt && <p className="mb-1 text-sm"><strong>Alternative:</strong> {alt}</p>}
      {mistake && <p className="mb-1 text-sm text-muted-foreground"><strong>Common mistake:</strong> {mistake}</p>}
      {marks && <p className="text-xs text-muted-foreground"><strong>Marks:</strong> {marks}</p>}
    </div>
  );
}

function DLAnswerKeyPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="overview" title="1. Answer Guide Overview">
        <p>
          This answer key covers every question in the companion resource, <em>Deep Learning — Practice
          Questions</em>. Read each solution alongside your attempt. The goal is not just to
          verify correctness but to understand <strong>why</strong> the correct answer is correct and where an
          incorrect attempt broke down.
        </p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="How to self-mark">
          Mark yourself strictly. Award full marks only when your explanation matches the model
          answer in structure, not just conclusion. Partial credit rules are listed in the rubric
          section.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 1 — Feedback loop: attempt → self-mark against rubric → revise weakest topic → retry mixed set." />
      </Section>

      <Section id="objective" title="2. Objective Answers">
        <A n={1} ans="C. ReLU" why="ReLU is the default hidden-layer activation because it avoids vanishing gradients for positive activations and is cheap to compute." alt="GELU is common in transformers; leaky ReLU addresses dead ReLU issues." mistake="Choosing sigmoid — saturates and vanishes for deep nets." marks="1" />
        <A n={2} ans="B. Distance between predicted and true outputs" why="Loss is a scalar quantifying prediction error, used to compute gradients." marks="1" />
        <A n={5} ans="Single linear transformation" why="Composition of linear maps is still linear, so the network collapses to Wx+b." marks="1" />
        <A n={6} ans="False" why="Beyond an optimum depth, additional layers usually hurt generalisation without residual connections and regularisation." marks="1" />
        <A n={7} ans="B. Convolutional" why="Conv layers extract translation-equivariant features; FC layers do the final classification." marks="1" />
        <A n={8} ans="B. Output spatial dimensions" why="Formula: out = floor((in + 2p - k)/s) + 1." marks="1" />
        <A n={12} ans="C. LSTM" why="LSTMs explicitly maintain a cell state gated by input, forget, and output gates. GRU merges some gates without a separate cell state." marks="1" />
        <A n={15} ans="False" why="LSTMs mitigate but do not eliminate vanishing gradients — very long sequences still suffer, which is why transformers replaced them at scale." marks="1" />
        <A n={16} ans="C. O(n²)" why="Attention forms an n×n similarity matrix. Linear-attention variants approximate this to O(n)." marks="1" />
        <A n={25} ans="D. Learning rate warmup" why="Warmup is a schedule technique, not a regulariser. Dropout, weight decay, and BN all constrain the model." marks="1" />
        <A n={29} ans="C. Accuracy" why="With class imbalance a trivial majority-class predictor scores high accuracy while offering no useful behaviour." marks="1" />
      </Section>

      <Section id="short" title="3. Short Answer Solutions">
        <A n={3} ans="Epoch, batch, iteration" why="Epoch = one full pass over the training set. Batch = a subset of examples processed together for one gradient update. Iteration = one gradient step; equals dataset_size / batch_size per epoch." marks="3 (1 each)" />
        <A n={4} ans="Nonlinearities" why="Without nonlinear activations, stacked linear layers collapse to a single linear map — the network cannot represent XOR or any non-linear decision boundary. Nonlinearities give the model universal approximation capacity." marks="2" />
        <A n={9} ans="Output shape 32×32×16" why="Padding=1 with kernel=3 and stride=1 preserves spatial dims: (32+2-3)/1+1=32. Depth becomes out_channels=16." marks="2" />
        <A n={13} ans="Input, forget, output gates" why="Input gate decides what new information to write to the cell; forget gate decides what to discard; output gate decides what part of the cell state to expose as the hidden state." marks="3" />
        <A n={14} ans="Vanilla RNN long-sequence issue" why="Backprop through time multiplies Jacobians repeatedly; gradients vanish or explode, so the network cannot learn dependencies beyond ~10 steps." marks="2" />
        <A n={17} ans="Scaled dot-product attention" why="Attention(Q,K,V) = softmax(QKᵀ / √d_k) V. QKᵀ measures similarity, √d_k scaling prevents softmax saturation for large d_k, softmax turns similarities into a distribution, and multiplying by V produces a weighted sum of values." marks="4" />
        <A n={18} ans="Positional encodings" why="Self-attention is permutation-invariant. Positional encodings inject order via sinusoidal, learned, or rotary embeddings so the model distinguishes 'the cat sat' from 'sat the cat'." marks="2" />
        <A n={26} ans="Cosine LR schedule" why="LR starts near max, decays as a half-cosine to a minimum by end of training. Provides smooth annealing without hand-picked step drops; often combined with linear warmup." marks="2" />
        <A n={27} ans="Gradient clipping" why="Rescale the global gradient norm to a max value (e.g. 1.0) whenever it exceeds the threshold. Prevents exploding-gradient blow-ups in transformers and RNNs." marks="2" />
        <A n={30} ans="Calibration" why="A classifier is calibrated if predicted probability p implies frequency p of being correct. Measure with Expected Calibration Error (ECE) across probability bins, or with a reliability diagram." marks="3" />
        <A n={31} ans="Top-1 vs top-5" why="Top-1 counts an example correct if the argmax matches the label; top-5 counts it correct if the label is anywhere in the top five predictions. Top-5 is more forgiving for large label spaces." marks="2" />
      </Section>

      <Section id="long" title="4. Long Answer Solutions">
        <A n={10} ans="Simple CNN diagram" why="Conv(3→32,3×3) → ReLU → MaxPool(2) → Conv(32→64,3×3) → ReLU → MaxPool(2) → Flatten → FC(128) → ReLU → Dropout(0.5) → FC(num_classes). Explain that pooling reduces spatial dims while conv layers increase depth." marks="6" />
        <A n={19} ans="Encoder block sketch" why="Input → Multi-Head Self-Attention → Add & LayerNorm → Position-wise Feed-Forward (Linear→GELU→Linear) → Add & LayerNorm → output. Residual connections carry gradient; LayerNorm stabilises activations." marks="6" />
        <A n={33} ans="Four augmentation techniques" why="(1) Random horizontal flip — natural for most classes. (2) Random resized crop — teaches scale invariance. (3) Colour jitter — robust to lighting. (4) Mixup / CutMix — regularises decision boundaries. Choose per domain: medical imaging typically avoids flips and colour jitter." marks="4" />
        <A n={34} ans="Detection vs segmentation" why="Object detection predicts bounding boxes + class per instance (YOLO one-shot regression, DETR set prediction with transformers). Semantic segmentation assigns a class per pixel (UNet encoder-decoder with skip connections, DeepLab with atrous convs). Instance segmentation combines both." marks="6" />
        <A n={36} ans="BPE tokenisation" why="Byte-Pair Encoding starts from characters and iteratively merges the most frequent adjacent pair until vocab size is reached. Handles out-of-vocabulary words by decomposing into subwords ('unbelievable' → 'un', 'believ', 'able'). Beats whitespace splitting because it generalises across morphology and rare tokens." marks="5" />
        <A n={37} ans="MLM vs causal LM" why="Masked LM (BERT) randomly masks 15% of tokens and predicts them from bidirectional context — good for representation learning. Causal LM (GPT) predicts each token from left context only — natural for autoregressive generation. MLM gives richer representations; causal LM enables generation." marks="5" />
      </Section>

      <Section id="coding" title="5. Coding Solutions">
        <p><strong>Q20. Training step</strong></p>
        <Code>{`import torch, torch.nn.functional as F

def train_step(model, optimizer, x, y):
    optimizer.zero_grad(set_to_none=True)
    logits = model(x)
    loss = F.cross_entropy(logits, y)
    loss.backward()
    optimizer.step()
    return loss.item()`}</Code>
        <p><strong>Q21. Two-layer MLP with dropout</strong></p>
        <Code>{`import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, in_dim, hidden, out_dim, p=0.3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(in_dim, hidden),
            nn.GELU(),
            nn.Dropout(p),
            nn.Linear(hidden, out_dim),
        )
    def forward(self, x):
        return self.net(x)`}</Code>
        <p><strong>Q22. Image folder Dataset</strong></p>
        <Code>{`from pathlib import Path
from PIL import Image
from torch.utils.data import Dataset

class ImageFolderDS(Dataset):
    def __init__(self, root, transform=None):
        self.samples = []
        self.classes = sorted([d.name for d in Path(root).iterdir() if d.is_dir()])
        self.cls2idx = {c: i for i, c in enumerate(self.classes)}
        for c in self.classes:
            for p in (Path(root)/c).glob('*'):
                self.samples.append((p, self.cls2idx[c]))
        self.transform = transform

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, i):
        path, label = self.samples[i]
        img = Image.open(path).convert('RGB')
        if self.transform: img = self.transform(img)
        return img, label`}</Code>
        <p><strong>Q23. Early stopping</strong></p>
        <Code>{`class EarlyStopping:
    def __init__(self, patience=5, min_delta=1e-4):
        self.best = float('inf'); self.count = 0
        self.patience = patience; self.min_delta = min_delta
        self.should_stop = False
    def step(self, val_loss):
        if val_loss < self.best - self.min_delta:
            self.best = val_loss; self.count = 0
        else:
            self.count += 1
            if self.count >= self.patience:
                self.should_stop = True`}</Code>
        <p><strong>Q24. NaN loss — five causes</strong></p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Learning rate too high — gradients explode.</li>
          <li>Missing gradient clipping in RNN / transformer training.</li>
          <li>log(0) in a custom loss — clamp with a small ε.</li>
          <li>fp16 overflow without loss scaling — switch to bf16 or enable scaler.</li>
          <li>Bad data — NaN or Inf in inputs or labels.</li>
        </ul>
      </Section>

      <Section id="diagram" title="6. Diagram Explanations">
        <p><strong>Q10 diagram</strong> — Convolutional stages reduce spatial dims while increasing feature depth; classifier flattens and maps to class logits.</p>
        <p><strong>Q19 diagram</strong> — Residual connections around each sub-block guarantee gradient flow. LayerNorm sits post-residual in the original Transformer; many modern variants (GPT-style) place LN before the sub-block ("Pre-LN").</p>
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 2 — PyTorch training pipeline: DataLoader → forward → loss → backward → optimizer.step → logging, wrapped by AMP and gradient clipping." />
      </Section>

      <Section id="case" title="7. Case Study Solutions">
        <A n={11} ans="Small medical dataset — anti-overfitting plan" why="Start with transfer learning from ImageNet weights; freeze early layers; apply strong augmentation appropriate to modality; use k-fold CV for reliable estimates; add heavy weight decay and dropout; monitor val loss and stop early. Report mean ± std across folds." marks="6" />
        <A n={28} ans="fp16 divergence — three fixes" why="(1) Enable GradScaler for loss scaling. (2) Switch to bf16 which has larger dynamic range. (3) Lower peak LR and add warmup. Bonus: check for NaNs in inputs and reduce max grad norm." marks="4" />
        <A n={35} ans="Mobile flower classifier" why="Use MobileNetV3 or EfficientNet-Lite pretrained; fine-tune head on 20 species; export via TorchScript or ONNX; quantise to int8 with post-training quantisation; measure latency on device and iterate. Augment with random crops and colour jitter appropriate for flora." marks="6" />
        <A n={38} ans="Summarisation evaluation plan" why="Combine automatic metrics (ROUGE, BERTScore) with faithfulness metrics (QAGS, FactScore) and mandatory human review on a sampled slice. Track hallucination rate as a first-class KPI; regressions on faithfulness block launch." marks="6" />
      </Section>

      <Section id="rubric" title="8. Rubric & Marking Scheme">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Question type</th><th className="p-2 text-left">Full marks require</th><th className="p-2 text-left">Partial credit</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">MCQ / True-False</td><td className="p-2">Correct option</td><td className="p-2">None — binary</td></tr>
            <tr className="border-b"><td className="p-2">Short answer</td><td className="p-2">Correct concept + reason</td><td className="p-2">Half marks for concept without reason</td></tr>
            <tr className="border-b"><td className="p-2">Long answer</td><td className="p-2">Structure + accuracy + example</td><td className="p-2">Proportional to points covered</td></tr>
            <tr className="border-b"><td className="p-2">Coding</td><td className="p-2">Runs correctly on unit tests</td><td className="p-2">Working skeleton + logic sketch = 60%</td></tr>
            <tr><td className="p-2">Case study</td><td className="p-2">Trade-offs + evaluation plan</td><td className="p-2">Solution without evaluation = 50%</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="errors" title="9. Common Errors">
        <ul className="list-disc space-y-1 pl-5">
          <li>Confusing softmax + cross-entropy with softmax + MSE — MSE gradients saturate.</li>
          <li>Forgetting to call <Code>{`model.eval()`}</Code> before validation — BN/dropout misbehave.</li>
          <li>Applying <Code>{`nn.CrossEntropyLoss`}</Code> to already softmaxed outputs — apply to logits.</li>
          <li>Using DataParallel and blaming poor scaling — switch to DDP.</li>
          <li>Writing custom losses without numerical stability (log(0), overflow).</li>
          <li>Comparing models on unaligned val splits — always fix the seed and split ahead of experiments.</li>
        </ul>
      </Section>

      <Section id="final" title="10. Final Review">
        <p>Once you have marked every question, produce three artefacts:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>A per-topic score table — identify your two weakest topics.</li>
          <li>A revision plan — one week per weak topic, with reading + one mixed set.</li>
          <li>A retry log — mark the date, score, and improvement after each retry.</li>
        </ul>
      </Section>

      <Section id="review" title="Answer Review">
        <h3 className="font-semibold">Quick answer summary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Foundational MCQs — most misses are on activation functions and loss selection.</li>
          <li>Transformer questions — most misses are on positional encoding necessity and attention complexity.</li>
          <li>Coding — most misses are missing <Code>{`zero_grad`}</Code> or mixing logits with softmax.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Marking guide</h3>
        <p>Sum marks per section, compare with the rubric above, and convert to a percentage. Above 80% signals interview readiness on that topic.</p>
        <h3 className="mt-3 font-semibold">Common error analysis</h3>
        <p>Track your top three recurring mistakes across attempts. Progress comes from removing those three, not chasing new topics.</p>
        <h3 className="mt-3 font-semibold">Final self-evaluation</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you re-derive softmax + cross-entropy gradient without notes?</li>
          <li>Can you explain LayerNorm vs BatchNorm in under 60 seconds?</li>
          <li>Can you code a training loop with AMP + clipping from scratch?</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Correct answers matter less than understanding why they are correct.</li>
          <li>Use the rubric to self-mark strictly — partial credit is where growth lives.</li>
          <li>Retry weak topics after a week; the delta measures real learning.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Should I read the Answer Key before attempting the workbook?">No. Attempt every question first — answers only work as feedback.</FAQItem>
        <FAQItem q="How do I score coding questions?">Run the solution against your own inputs. If it produces the expected shape and matches on a small case, award full marks.</FAQItem>
        <FAQItem q="Is there partial credit on MCQs?">No — pick one option. Track your reasoning if you got it wrong.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Rubric</strong> — structured marking criteria per question.</li>
          <li><strong>ECE</strong> — Expected Calibration Error.</li>
          <li><strong>ROUGE</strong> — n-gram overlap metric for summarisation.</li>
          <li><strong>DDP</strong> — DistributedDataParallel.</li>
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
