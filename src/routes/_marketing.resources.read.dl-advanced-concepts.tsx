import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-advanced-concepts",
  title: "Deep Learning — Advanced Concepts",
  category: "AI & Data",
  difficulty: "Advanced",
  readingTime: "39 min",
  pages: 47,
  lastUpdated: "June 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "An advanced deep dive into modern deep neural networks, transformer internals, distributed training, foundation models, compression, XAI, and the research frontier — written for AI engineers, researchers, and graduate students.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "internals", label: "1. Deep Neural Network Internals" },
  { id: "math", label: "2. Advanced Mathematical Foundations" },
  { id: "cnn", label: "3. CNN Architectures" },
  { id: "rnn", label: "4. RNN, LSTM & GRU" },
  { id: "transformer", label: "5. Transformer Architecture" },
  { id: "attention", label: "6. Attention Mechanisms" },
  { id: "transfer", label: "7. Transfer Learning" },
  { id: "ssl", label: "8. Self-Supervised Learning" },
  { id: "foundation", label: "9. Foundation Models" },
  { id: "optimization", label: "10. Model Optimization" },
  { id: "distributed", label: "11. Distributed Deep Learning" },
  { id: "xai", label: "12. Explainable AI" },
  { id: "compression", label: "13. Model Compression & Quantization" },
  { id: "safety", label: "14. AI Safety & Ethics" },
  { id: "future", label: "15. Future of Deep Learning" },
  { id: "review", label: "Advanced Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Glossary", tag: "AI & Data", time: "13 min" },
  { title: "Deep Learning — Reference Guide", tag: "AI & Data", time: "38 min" },
  { title: "Machine Learning — Advanced Concepts", tag: "AI & Data", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-advanced-concepts")({
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
  component: DLAdvancedPage,
});

function DLAdvancedPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Reason about modern deep learning architectures at the systems level.</li>
            <li>Explore neural network internals — autograd, gradient flow, initialisation, normalisation.</li>
            <li>Apply production-grade DL engineering, from distributed training to serving.</li>
            <li>Study large-scale foundation models and self-supervised training regimes.</li>
            <li>Track the research frontier — diffusion, MoE, RLHF, alignment.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — Deep learning stack: data pipeline, distributed trainer, checkpoint registry, and inference mesh." />
      </Section>

      <Section id="internals" title="1. Deep Neural Network Internals">
        <p>
          A deep network is a composition of differentiable operators — linear, convolutional, attention, normalisation —
          arranged into a computational graph. <strong>Autograd</strong> records the forward graph and replays it in reverse
          to compute gradients via the chain rule. Numerical stability depends on initialisation (Kaiming/Xavier),
          normalisation (BatchNorm, LayerNorm, RMSNorm), and residual connections that prevent vanishing gradients.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Tensor storage, strides, and views — the mental model behind PyTorch's zero-copy operations.</li>
          <li>Static vs dynamic graphs; TorchScript / <code>torch.compile</code> for graph capture.</li>
          <li>Mixed precision (FP16/BF16) with loss scaling for numerical stability.</li>
          <li>Deterministic training — seeds, cuDNN flags, sharded data loaders.</li>
        </ul>
      </Section>

      <Section id="math" title="2. Advanced Mathematical Foundations">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Linear algebra:</strong> SVD, eigendecomposition, low-rank factorisation (LoRA).</li>
          <li><strong>Calculus:</strong> Jacobians, Hessians, vector–Jacobian products for reverse-mode AD.</li>
          <li><strong>Probability:</strong> KL divergence, ELBO, reparameterisation trick.</li>
          <li><strong>Optimisation:</strong> convex vs non-convex landscapes, sharpness, flat minima.</li>
        </ul>
        <Code lang="text">{`Cross-entropy:  L = - Σ y_i log softmax(z)_i
KL divergence:  D_KL(P||Q) = Σ P(x) log( P(x)/Q(x) )
ELBO:           L(θ,φ;x) = E_q[log p(x|z)] - D_KL(q(z|x)||p(z))`}</Code>
      </Section>

      <Section id="cnn" title="3. CNN Architectures">
        <ul className="list-disc space-y-1 pl-5">
          <li>Milestones — LeNet → AlexNet → VGG → ResNet → EfficientNet → ConvNeXt.</li>
          <li>Receptive fields, dilation, depth-wise separable convolutions.</li>
          <li>Feature pyramids &amp; detection heads (FPN, RetinaNet, YOLO family).</li>
          <li>Vision Transformers as a challenger — patch embedding vs convolution priors.</li>
        </ul>
      </Section>

      <Section id="rnn" title="4. RNN, LSTM & GRU">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vanishing/exploding gradients through time — gating as the fix.</li>
          <li>LSTM cell state vs GRU reset/update gates — parameter/perf trade-offs.</li>
          <li>Truncated BPTT for long sequences.</li>
          <li>Why transformers superseded RNNs for most language tasks — parallelism and long-range dependencies.</li>
        </ul>
      </Section>

      <Section id="transformer" title="5. Transformer Architecture">
        <p>
          The transformer replaces recurrence with self-attention over tokens, enabling parallel training and linear
          composition of long-range context. Key ingredients: token &amp; positional embeddings, multi-head attention,
          feed-forward MLP, residual + normalisation, and either causal or bidirectional masks.
        </p>
        <Code>{`import torch, torch.nn as nn

class Block(nn.Module):
    def __init__(self, d, h):
        super().__init__()
        self.ln1 = nn.LayerNorm(d)
        self.attn = nn.MultiheadAttention(d, h, batch_first=True)
        self.ln2 = nn.LayerNorm(d)
        self.mlp = nn.Sequential(nn.Linear(d, 4*d), nn.GELU(), nn.Linear(4*d, d))
    def forward(self, x, mask=None):
        a, _ = self.attn(self.ln1(x), self.ln1(x), self.ln1(x), attn_mask=mask)
        x = x + a
        x = x + self.mlp(self.ln2(x))
        return x`}</Code>
      </Section>

      <Section id="attention" title="6. Attention Mechanisms">
        <ul className="list-disc space-y-1 pl-5">
          <li>Scaled dot-product attention — Q, K, V; softmax(QKᵀ/√d)V.</li>
          <li>Multi-head, grouped-query, and multi-query attention — quality vs KV-cache cost.</li>
          <li>FlashAttention — IO-aware kernels that avoid materialising the full attention matrix.</li>
          <li>Sparse &amp; linear attention variants for long context (Longformer, Performer).</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 2 — Multi-head attention: parallel Q/K/V projections, scaled dot-product, and concatenated output." />
      </Section>

      <Section id="transfer" title="7. Transfer Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Feature extraction vs full fine-tuning vs adapter tuning.</li>
          <li>PEFT — LoRA, QLoRA, prefix / prompt tuning; parameter-count vs quality trade-offs.</li>
          <li>Domain adaptation and catastrophic forgetting mitigations (EWC, replay).</li>
        </ul>
      </Section>

      <Section id="ssl" title="8. Self-Supervised Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Contrastive (SimCLR, MoCo), non-contrastive (BYOL, DINO), masked prediction (MAE, BERT).</li>
          <li>Scaling laws — representation quality vs dataset and compute budget.</li>
          <li>Downstream evaluation: linear probing, k-NN, few-shot transfer.</li>
        </ul>
      </Section>

      <Section id="foundation" title="9. Foundation Models">
        <ul className="list-disc space-y-1 pl-5">
          <li>LLMs — decoder-only transformers, next-token prediction, chinchilla-optimal compute.</li>
          <li>Vision transformers &amp; multimodal encoders (CLIP, SigLIP).</li>
          <li>Diffusion models — forward noise, learned reverse process; DDPM/DDIM samplers.</li>
          <li>Mixture-of-Experts for parameter-efficient scaling.</li>
        </ul>
      </Section>

      <Section id="optimization" title="10. Model Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Optimisers — SGD-momentum, Adam, AdamW, Lion, Sophia; weight decay decoupling.</li>
          <li>LR schedules — cosine, warmup, one-cycle; layer-wise LR decay for fine-tuning.</li>
          <li>Regularisation — dropout, stochastic depth, label smoothing, mixup, cutmix.</li>
          <li>Gradient clipping, accumulation, and activation checkpointing.</li>
        </ul>
      </Section>

      <Section id="distributed" title="11. Distributed Deep Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>DDP (data parallel), FSDP / ZeRO-3 (parameter + gradient + optimizer sharding).</li>
          <li>Tensor parallelism (Megatron), pipeline parallelism (GPipe), sequence parallelism.</li>
          <li>Collectives — all-reduce, reduce-scatter, all-gather; NCCL topology awareness.</li>
          <li>Frameworks — PyTorch Distributed, DeepSpeed, Megatron-LM, Ray Train.</li>
        </ul>
        <Code>{`# Minimal FSDP wrap
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
model = FSDP(model, mixed_precision=mp_policy, device_id=torch.cuda.current_device())`}</Code>
      </Section>

      <Section id="xai" title="12. Explainable AI">
        <ul className="list-disc space-y-1 pl-5">
          <li>Saliency maps, Integrated Gradients, SmoothGrad.</li>
          <li>Grad-CAM &amp; attention rollout for vision/transformer models.</li>
          <li>Concept bottleneck models &amp; probing classifiers for interpretability.</li>
        </ul>
      </Section>

      <Section id="compression" title="13. Model Compression & Quantization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Post-training quantisation — INT8, INT4 (GPTQ, AWQ); calibration sets.</li>
          <li>Quantisation-aware training for sensitive layers.</li>
          <li>Structured &amp; unstructured pruning; movement pruning during fine-tuning.</li>
          <li>Knowledge distillation — logit, feature, and self-distillation.</li>
        </ul>
      </Section>

      <Section id="safety" title="14. AI Safety & Ethics">
        <ul className="list-disc space-y-1 pl-5">
          <li>Alignment techniques — RLHF, DPO, constitutional AI.</li>
          <li>Robustness — adversarial training, certified defences, red-teaming.</li>
          <li>Privacy — differential privacy, federated learning, membership inference.</li>
          <li>Fairness audits &amp; slice-based evaluation for high-stakes deployments.</li>
        </ul>
      </Section>

      <Section id="future" title="15. Future of Deep Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Multimodal foundation models becoming the default substrate.</li>
          <li>Agents that plan, use tools, and self-correct with verifier models.</li>
          <li>Efficient inference — speculative decoding, KV-cache reuse, edge deployment.</li>
          <li>Neurosymbolic reasoning and world models for embodied AI.</li>
        </ul>
      </Section>

      <Section id="review" title="Advanced Review">
        <h3 className="font-semibold">Architecture summary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Separate planes for data, training, checkpoint registry, serving, observability.</li>
          <li>Every artefact has a version and lineage back to its training run and dataset snapshot.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Expert checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Mixed precision + activation checkpointing enabled for large models.</li>
          <li>FSDP/ZeRO stage chosen deliberately for memory vs comms trade-off.</li>
          <li>Monitoring covers latency, drift, and per-cohort quality.</li>
          <li>Safety review completed for adversarial, privacy, and alignment risk.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Reflection questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Which failure mode is most expensive in your current DL system?</li>
          <li>Where would LoRA/QLoRA replace full fine-tuning without measurable loss?</li>
          <li>What is the smallest architecture change with the biggest reliability lift?</li>
        </ol>
        <h3 className="mt-4 font-semibold">Discussion topics</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>When is a foundation model the wrong tool?</li>
          <li>How should teams budget carbon and cost per experiment?</li>
        </ul>
        <h3 className="mt-4 font-semibold">Advanced interview questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Derive the gradient of softmax cross-entropy w.r.t. logits.</li>
          <li>Compare DDP, FSDP, and ZeRO-3 in memory and communication cost.</li>
          <li>Explain FlashAttention's IO-awareness and why it doesn't change math.</li>
          <li>Design an online-serving pipeline for a 70B LLM with speculative decoding.</li>
          <li>How would you detect a silent quality regression that top-1 accuracy misses?</li>
        </ol>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Advanced DL is a systems discipline — infrastructure beats individual tricks.</li>
          <li>Attention + scale + self-supervision underpin the current foundation-model era.</li>
          <li>Compression and distributed training decide whether models are shippable, not just trainable.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="LoRA or full fine-tune?">LoRA/QLoRA for most task adaptation; full fine-tune when you need to shift base behaviour or restructure representations.</FAQItem>
        <FAQItem q="When to reach for FSDP vs DDP?">DDP is sufficient when the model fits on one GPU; FSDP/ZeRO once parameters + activations exceed device memory.</FAQItem>
        <FAQItem q="Do transformers replace CNNs?">For vision at scale, yes for many tasks; CNNs still win on edge devices and small data thanks to inductive biases.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>FSDP</strong> — Fully Sharded Data Parallel training.</li>
          <li><strong>LoRA</strong> — Low-Rank Adaptation for parameter-efficient fine-tuning.</li>
          <li><strong>KV-cache</strong> — reused key/value tensors that accelerate autoregressive decoding.</li>
          <li><strong>RLHF</strong> — Reinforcement Learning from Human Feedback.</li>
          <li><strong>Distillation</strong> — training a small model to mimic a large one.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation,
          academic publications, research papers, industry standards, and trusted educational resources.
          Deep learning technologies, frameworks, APIs, and best practices evolve continuously — always consult the
          latest official documentation for authoritative guidance. All trademarks, logos, product names, and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
