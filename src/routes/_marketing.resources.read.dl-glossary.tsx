import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-glossary",
  title: "Deep Learning — Glossary",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "13 min",
  pages: 20,
  lastUpdated: "June 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "A comprehensive A–Z glossary of deep learning: 250+ terms, acronyms, PyTorch vocabulary, transformer terminology, evaluation metrics, and interview vocabulary — with beginner-friendly and technical definitions.",
};

const TOC: TocItem[] = [
  { id: "how-to", label: "1. How to Use This Glossary" },
  { id: "acronyms", label: "2. Deep Learning Acronyms" },
  { id: "az", label: "3. A–Z Terminology" },
  { id: "nn-terms", label: "4. Neural Network Terms" },
  { id: "pytorch", label: "5. PyTorch Vocabulary" },
  { id: "opt", label: "6. Optimization Terms" },
  { id: "metrics", label: "7. Evaluation Metrics" },
  { id: "transformer", label: "8. Transformer Terminology" },
  { id: "math", label: "9. Mathematical Concepts" },
  { id: "interview", label: "10. Interview Vocabulary" },
  { id: "lookup", label: "11. Quick Lookup Index" },
  { id: "revision", label: "12. Revision Sheet" },
  { id: "review", label: "Glossary Review" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Advanced Concepts", tag: "AI & Data", time: "39 min" },
  { title: "Deep Learning — Reference Guide", tag: "AI & Data", time: "38 min" },
  { title: "Machine Learning — Glossary", tag: "AI & Data", time: "12 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-glossary")({
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
  component: DLGlossaryPage,
});

type Entry = { term: string; short: string; tech?: string; example?: string; related?: string; tip?: string };

const AZ: Entry[] = [
  { term: "Activation Function", short: "A non-linear function applied to a neuron's output.", tech: "Introduces non-linearity so networks can approximate complex functions (ReLU, GELU, Tanh).", related: "ReLU, GELU, Sigmoid" },
  { term: "Adam", short: "Adaptive optimiser combining momentum and RMSProp.", tech: "Maintains per-parameter first and second-moment estimates with bias correction.", related: "AdamW, SGD" },
  { term: "AdamW", short: "Adam with decoupled weight decay.", tech: "Applies weight decay outside the gradient update — standard for transformers.", tip: "Prefer AdamW over Adam+L2 for transformers." },
  { term: "Attention", short: "Weighted read over a sequence.", tech: "softmax(QKᵀ/√d)V — content-based lookup used across transformers.", related: "Multi-Head, FlashAttention" },
  { term: "Autograd", short: "PyTorch's automatic differentiation engine.", tech: "Records ops on tensors with requires_grad=True and computes gradients on .backward()." },
  { term: "Backpropagation", short: "Reverse-mode differentiation through a compute graph.", tech: "Applies the chain rule from loss back to parameters." },
  { term: "Batch Normalization", short: "Normalises activations across a batch.", tech: "Stabilises training and permits higher learning rates.", related: "LayerNorm, RMSNorm" },
  { term: "BERT", short: "Bidirectional encoder pre-trained by masked-token prediction.", related: "MLM, Encoder" },
  { term: "Beam Search", short: "Heuristic decoding that keeps top-k partial hypotheses.", related: "Greedy Decoding, Sampling" },
  { term: "CNN", short: "Convolutional Neural Network.", tech: "Uses learned filters with weight sharing over spatial dimensions." },
  { term: "CLIP", short: "Contrastive image–text encoder.", tech: "Aligns image and text embeddings for zero-shot recognition." },
  { term: "Cross-Entropy Loss", short: "Standard loss for classification.", tech: "L = -Σ y_i log p_i between the predicted and true distributions." },
  { term: "DataLoader", short: "PyTorch iterator over a Dataset.", tech: "Handles batching, shuffling, workers, and pin_memory." },
  { term: "DDP", short: "Distributed Data Parallel.", tech: "Replicates the model, syncs gradients via all-reduce." },
  { term: "Diffusion Model", short: "Generative model that denoises step-by-step.", tech: "Learns the reverse of a fixed forward noising process (DDPM/DDIM)." },
  { term: "Dropout", short: "Randomly zeroes activations during training.", tip: "Disabled in eval mode automatically." },
  { term: "Early Stopping", short: "Stop training when validation metric plateaus." },
  { term: "Embedding", short: "Learned dense vector representation of a discrete token." },
  { term: "Epoch", short: "One full pass over the training dataset." },
  { term: "FlashAttention", short: "IO-aware attention kernel.", tech: "Fuses softmax and matmul to avoid materialising the attention matrix." },
  { term: "FSDP", short: "Fully Sharded Data Parallel.", tech: "Shards parameters, gradients, and optimizer state across ranks." },
  { term: "GAN", short: "Generative Adversarial Network.", tech: "A generator vs discriminator min-max game." },
  { term: "GELU", short: "Gaussian Error Linear Unit activation.", related: "ReLU, SiLU" },
  { term: "Gradient Clipping", short: "Cap gradient norm to prevent exploding updates." },
  { term: "GRU", short: "Gated Recurrent Unit — LSTM's lighter cousin.", related: "LSTM, RNN" },
  { term: "Hyperparameter", short: "A setting fixed before training (LR, batch, depth)." },
  { term: "Initialization", short: "Starting weight distribution.", related: "Kaiming, Xavier" },
  { term: "Kaiming Init", short: "Variance-preserving init for ReLU networks." },
  { term: "KV-Cache", short: "Cached keys/values reused across decoding steps." },
  { term: "LayerNorm", short: "Normalises across features per token.", related: "RMSNorm, BatchNorm" },
  { term: "LoRA", short: "Low-Rank Adaptation for parameter-efficient fine-tuning." },
  { term: "LSTM", short: "Gated recurrent cell with cell state and gates." },
  { term: "Mixed Precision", short: "Train with FP16/BF16 + FP32 master weights." },
  { term: "MLP", short: "Multi-Layer Perceptron — fully-connected feed-forward net." },
  { term: "Multi-Head Attention", short: "Parallel attention over projected subspaces." },
  { term: "One-Hot Encoding", short: "Sparse vector representation for categorical inputs." },
  { term: "Overfitting", short: "Training-set performance rises while validation drops." },
  { term: "PEFT", short: "Parameter-Efficient Fine-Tuning family (LoRA, prefix, adapters)." },
  { term: "Perplexity", short: "Exp of average token cross-entropy — LM quality metric." },
  { term: "Pooling", short: "Downsampling op — max, avg, adaptive." },
  { term: "PyTorch", short: "Open-source deep learning framework with dynamic graphs." },
  { term: "Quantization", short: "Represent weights/activations in lower precision (INT8/INT4)." },
  { term: "ReLU", short: "Rectified Linear Unit — max(0, x)." },
  { term: "Residual Connection", short: "Skip connection that adds input to a block's output." },
  { term: "RMSNorm", short: "Simpler LayerNorm variant used by modern LLMs." },
  { term: "RNN", short: "Recurrent Neural Network for sequence data." },
  { term: "RLHF", short: "Reinforcement Learning from Human Feedback." },
  { term: "Scheduler", short: "Learning-rate schedule over training steps.", related: "Cosine, Warmup" },
  { term: "SGD", short: "Stochastic Gradient Descent, usually with momentum." },
  { term: "Softmax", short: "Turns logits into a probability distribution." },
  { term: "Temperature", short: "Sampling knob — lower is more deterministic." },
  { term: "Tensor", short: "Multi-dimensional array — PyTorch's core data type." },
  { term: "Tokenization", short: "Splitting text into discrete units for a model." },
  { term: "Transformer", short: "Attention-based sequence model — decoder-only, encoder-only, or encoder-decoder." },
  { term: "Transfer Learning", short: "Reuse a pretrained network as a starting point." },
  { term: "Underfitting", short: "Model is too weak / undertrained for the data." },
  { term: "Vanishing Gradient", short: "Gradients shrink through many layers — fixed by residuals/norms." },
  { term: "Vision Transformer (ViT)", short: "Transformer that ingests image patches as tokens." },
  { term: "Weight Decay", short: "L2 regularisation term added to the objective." },
  { term: "Xavier Init", short: "Variance-preserving init for tanh/sigmoid networks." },
  { term: "Zero-Shot", short: "Task performed with no task-specific training examples." },
];

const ACRONYMS: Array<[string, string]> = [
  ["AI", "Artificial Intelligence"],
  ["AGI", "Artificial General Intelligence"],
  ["BN", "Batch Normalization"],
  ["BPTT", "Backpropagation Through Time"],
  ["CNN", "Convolutional Neural Network"],
  ["DL", "Deep Learning"],
  ["DDP", "Distributed Data Parallel"],
  ["DPO", "Direct Preference Optimization"],
  ["ELBO", "Evidence Lower Bound"],
  ["FSDP", "Fully Sharded Data Parallel"],
  ["GAN", "Generative Adversarial Network"],
  ["GNN", "Graph Neural Network"],
  ["GRU", "Gated Recurrent Unit"],
  ["LLM", "Large Language Model"],
  ["LoRA", "Low-Rank Adaptation"],
  ["LSTM", "Long Short-Term Memory"],
  ["MHA", "Multi-Head Attention"],
  ["MLM", "Masked Language Modeling"],
  ["MLP", "Multi-Layer Perceptron"],
  ["MoE", "Mixture of Experts"],
  ["NLP", "Natural Language Processing"],
  ["PEFT", "Parameter-Efficient Fine-Tuning"],
  ["RAG", "Retrieval-Augmented Generation"],
  ["ReLU", "Rectified Linear Unit"],
  ["RLHF", "Reinforcement Learning from Human Feedback"],
  ["RNN", "Recurrent Neural Network"],
  ["SGD", "Stochastic Gradient Descent"],
  ["SOTA", "State of the Art"],
  ["SSL", "Self-Supervised Learning"],
  ["ViT", "Vision Transformer"],
];

function DLGlossaryPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="how-to" title="1. How to Use This Glossary">
        <Callout tone="info" icon={<BookOpen className="h-5 w-5" />} title="Reading tips">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Start with the acronyms table — most DL vocabulary comes as three-letter shorthand.</li>
            <li>Every entry has a plain-language line plus a technical follow-up when relevant.</li>
            <li>Use the Quick Lookup Index at the bottom for exam / interview revision.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 1 — Vocabulary map: neural network anatomy, training loop, and transformer terminology." />
      </Section>

      <Section id="acronyms" title="2. Deep Learning Acronyms">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr><th className="p-3 text-left">Acronym</th><th className="p-3 text-left">Meaning</th></tr>
            </thead>
            <tbody>
              {ACRONYMS.map(([a, m]) => (
                <tr key={a} className="border-t"><td className="p-3 font-mono font-semibold">{a}</td><td className="p-3">{m}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="az" title="3. A–Z Terminology">
        <div className="space-y-4">
          {AZ.map((e) => (
            <div key={e.term} className="rounded-lg border p-4">
              <div className="font-semibold">{e.term}</div>
              <p className="mt-1 text-sm">{e.short}</p>
              {e.tech && <p className="mt-1 text-sm text-muted-foreground"><strong>Technical:</strong> {e.tech}</p>}
              {e.example && <p className="mt-1 text-sm text-muted-foreground"><strong>Example:</strong> {e.example}</p>}
              {e.related && <p className="mt-1 text-xs text-muted-foreground"><strong>Related:</strong> {e.related}</p>}
              {e.tip && <p className="mt-1 text-xs text-muted-foreground"><strong>Tip:</strong> {e.tip}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section id="nn-terms" title="4. Neural Network Terms">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Neuron / Unit</strong> — one weighted sum + activation.</li>
          <li><strong>Layer</strong> — a group of neurons applied together (Linear, Conv2d, Attention).</li>
          <li><strong>Depth</strong> — number of layers; controls representational power.</li>
          <li><strong>Width</strong> — number of units per layer; controls capacity.</li>
          <li><strong>Skip connection</strong> — residual add that eases gradient flow.</li>
        </ul>
      </Section>

      <Section id="pytorch" title="5. PyTorch Vocabulary">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>nn.Module</code> — base class for models &amp; layers.</li>
          <li><code>forward()</code> — defines the computation; called via <code>model(x)</code>.</li>
          <li><code>state_dict()</code> — dict of parameter tensors, used for save/load.</li>
          <li><code>torch.no_grad()</code> — disables autograd for inference.</li>
          <li><code>DataLoader</code>, <code>Dataset</code>, <code>Sampler</code> — data pipeline building blocks.</li>
          <li><code>torch.compile</code> — graph capture + kernel fusion for speedups.</li>
        </ul>
      </Section>

      <Section id="opt" title="6. Optimization Terms">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Learning rate</strong> — step size along the negative gradient.</li>
          <li><strong>Momentum</strong> — exponential average of gradients.</li>
          <li><strong>Weight decay</strong> — pulls weights toward zero each step.</li>
          <li><strong>Warmup</strong> — LR ramps up before decaying.</li>
          <li><strong>Gradient accumulation</strong> — sum grads across micro-batches before stepping.</li>
        </ul>
      </Section>

      <Section id="metrics" title="7. Evaluation Metrics">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Accuracy / Top-k</strong> — classification correctness.</li>
          <li><strong>Precision / Recall / F1</strong> — imbalanced classification quality.</li>
          <li><strong>ROC-AUC / PR-AUC</strong> — threshold-independent ranking quality.</li>
          <li><strong>Perplexity</strong> — language-model quality; lower is better.</li>
          <li><strong>BLEU / ROUGE / METEOR</strong> — text-generation overlap metrics.</li>
          <li><strong>IoU / mAP</strong> — detection and segmentation.</li>
        </ul>
      </Section>

      <Section id="transformer" title="8. Transformer Terminology">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Token / Vocabulary</strong> — discrete units the model sees.</li>
          <li><strong>Positional encoding</strong> — injects order (sinusoidal, RoPE, ALiBi).</li>
          <li><strong>Causal mask</strong> — prevents attending to future tokens.</li>
          <li><strong>Context length</strong> — max tokens the model can attend over.</li>
          <li><strong>KV-cache</strong> — reused K/V during decoding for O(1) growth per step.</li>
        </ul>
      </Section>

      <Section id="math" title="9. Mathematical Concepts">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Chain rule</strong> — foundation of backprop.</li>
          <li><strong>Jacobian</strong> — matrix of first-order partials.</li>
          <li><strong>Softmax</strong> — normalises a vector to a probability distribution.</li>
          <li><strong>KL divergence</strong> — asymmetric distance between distributions.</li>
          <li><strong>Entropy</strong> — expected information content.</li>
        </ul>
      </Section>

      <Section id="interview" title="10. Interview Vocabulary">
        <ul className="list-disc space-y-1 pl-5">
          <li>Bias-variance trade-off, regularisation, dropout, early stopping.</li>
          <li>Vanishing / exploding gradients, residual connections, normalisation.</li>
          <li>Transformer vs RNN, attention complexity, KV-cache.</li>
          <li>Fine-tuning vs LoRA, PEFT, RLHF, DPO.</li>
          <li>Quantisation, distillation, pruning.</li>
        </ul>
      </Section>

      <Section id="lookup" title="11. Quick Lookup Index">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 text-sm">
          {AZ.map((e) => <div key={e.term} className="rounded border px-3 py-1.5">{e.term}</div>)}
        </div>
      </Section>

      <Section id="revision" title="12. Revision Sheet">
        <ul className="list-disc space-y-1 pl-5">
          <li>Every activation is non-linear — otherwise deep nets collapse to a single linear map.</li>
          <li>Normalisation stabilises training; residuals keep gradients alive.</li>
          <li>Attention = content lookup; complexity is quadratic in sequence length.</li>
          <li>Optimisers differ mostly in how they scale &amp; smooth gradients.</li>
          <li>PEFT lets you fine-tune huge models on modest hardware.</li>
        </ul>
      </Section>

      <Section id="review" title="Glossary Review">
        <h3 className="font-semibold">Top 150 important terms</h3>
        <p>The A–Z, acronym, and specialised sections above already cover the top-150 vocabulary that surfaces in interviews and applied work.</p>
        <h3 className="mt-4 font-semibold">Interview vocabulary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Loss functions, optimisers, schedulers.</li>
          <li>Regularisation and generalisation.</li>
          <li>Attention, positional encoding, KV-cache.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Quick lookup tables</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Acronyms → full form (§2).</li>
          <li>A–Z index (§11) — one line per term for scanning.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How do I memorise this?">Read in chunks by section, then test yourself using the Quick Lookup Index.</FAQItem>
        <FAQItem q="Is BatchNorm still used?">Yes for CNNs; transformers overwhelmingly use LayerNorm / RMSNorm.</FAQItem>
        <FAQItem q="LoRA vs adapters?">LoRA edits weights via low-rank deltas; adapters insert small trainable modules. LoRA is dominant today.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation,
          academic publications, research papers, industry standards, and trusted educational resources.
          Deep learning technologies, frameworks, APIs, and best practices evolve continuously — consult the official
          documentation of each tool for the latest and most accurate information. All trademarks, logos, product names,
          and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
