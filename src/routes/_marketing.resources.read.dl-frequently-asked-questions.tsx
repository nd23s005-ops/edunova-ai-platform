import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-frequently-asked-questions",
  title: "Deep Learning — Frequently Asked Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 8,
  lastUpdated: "June 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "The most-asked deep learning questions — beginners, students, professionals, and interview candidates — answered with plain explanations, PyTorch snippets, and common misconceptions cleared.",
};

const TOC: TocItem[] = [
  { id: "getting-started", label: "1. Getting Started" },
  { id: "nn-basics", label: "2. Neural Networks Basics" },
  { id: "architectures", label: "3. CNN, RNN & Transformers" },
  { id: "pytorch", label: "4. PyTorch Questions" },
  { id: "training", label: "5. Training & Optimization" },
  { id: "evaluation", label: "6. Model Evaluation" },
  { id: "deployment", label: "7. Deployment & Production" },
  { id: "career", label: "8. Career & Learning Advice" },
  { id: "interview", label: "9. Interview FAQs" },
  { id: "revision", label: "10. Quick Revision" },
  { id: "review", label: "FAQ Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Learning Roadmap", tag: "AI & Data", time: "8 min" },
  { title: "Deep Learning — Tips & Tricks", tag: "AI & Data", time: "8 min" },
  { title: "Deep Learning — Glossary", tag: "AI & Data", time: "13 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-frequently-asked-questions")({
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
  component: DLFAQPage,
});

function DLFAQPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="getting-started" title="1. Getting Started with Deep Learning">
        <Callout tone="info" icon={<HelpCircle className="h-5 w-5" />} title="How to read this FAQ">
          <p className="mt-1">Skim by section, dive into questions that match your current blockers. Every answer stays practical — no derivations unless they change a decision.</p>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — DL learner journey: fundamentals → PyTorch → architectures → training → deployment." />
        <FAQItem q="What is deep learning in one sentence?">Machine learning with multi-layer neural networks that learn hierarchical representations from data.</FAQItem>
        <FAQItem q="Do I need a GPU to start?">No. Learn on CPU with tiny datasets; move to Colab / a cloud GPU when your loop is correct.</FAQItem>
        <FAQItem q="Python or another language?">Python — the ecosystem (PyTorch, HuggingFace, NumPy) is unmatched.</FAQItem>
        <FAQItem q="How much math do I really need?">Comfortable with linear algebra basics, derivatives, and probability. Deep proofs are optional at the start.</FAQItem>
        <FAQItem q="Deep learning vs machine learning?">Deep learning is a subset of ML that relies on layered neural networks and representation learning.</FAQItem>
      </Section>

      <Section id="nn-basics" title="2. Neural Networks Basics">
        <FAQItem q="What is a neuron?">A weighted sum of inputs passed through a non-linear activation.</FAQItem>
        <FAQItem q="Why do we need activation functions?">Without them, stacked linear layers collapse into a single linear map — no depth benefit.</FAQItem>
        <FAQItem q="ReLU vs GELU?">ReLU is fast and standard for CNNs. GELU/SiLU are smoother and dominant in transformers.</FAQItem>
        <FAQItem q="Why do gradients vanish?">Deep chains of small-derivative activations multiply toward zero. Residual connections and normalisation solve it.</FAQItem>
        <FAQItem q="What does backprop actually do?">Applies the chain rule through the computational graph to get ∂loss/∂w for every parameter.</FAQItem>
        <FAQItem q="Batch vs Layer normalisation?">BatchNorm normalises across batch, ideal for CNNs. LayerNorm normalises per token, ideal for transformers.</FAQItem>
        <FAQItem q="Common misconception">"More layers is always better." Depth only helps if data + regularisation + optimisation scale with it.</FAQItem>
      </Section>

      <Section id="architectures" title="3. CNN, RNN & Transformers">
        <FAQItem q="When should I pick a CNN?">Grid-like data — images, spectrograms, some tabular embeddings. Strong inductive bias for spatial locality.</FAQItem>
        <FAQItem q="RNN vs LSTM vs GRU?">RNN is the base. LSTM adds gates + cell state for long dependencies. GRU is a lighter LSTM.</FAQItem>
        <FAQItem q="Why did transformers replace RNNs?">Parallelism and long-range dependencies via attention, without sequential unrolling.</FAQItem>
        <FAQItem q="Encoder, decoder, or both?">Encoder for understanding (BERT), decoder for generation (GPT), encoder-decoder for translation (T5).</FAQItem>
        <FAQItem q="Attention is expensive — how do we scale?">FlashAttention, sparse / linear attention variants, and KV-cache reuse during decoding.</FAQItem>
        <FAQItem q="What is a Vision Transformer?">A transformer that treats image patches as tokens.</FAQItem>
      </Section>

      <Section id="pytorch" title="4. PyTorch Questions">
        <FAQItem q="Dynamic or static graphs?">PyTorch is dynamic by default; <code>torch.compile</code> captures graphs for speed.</FAQItem>
        <FAQItem q="model.eval() vs torch.no_grad()?">The first switches dropout/batchnorm to eval mode; the second disables autograd. Use both at inference.</FAQItem>
        <FAQItem q="How do I move data to GPU efficiently?"><code>x.cuda(non_blocking=True)</code> with <code>pin_memory=True</code> on the DataLoader.</FAQItem>
        <FAQItem q="Autograd basics?">Any tensor with <code>requires_grad=True</code> tracks ops. Call <code>.backward()</code> on a scalar loss.</FAQItem>
        <Code>{`# Minimal PyTorch training step
opt.zero_grad(set_to_none=True)
logits = model(x)
loss = F.cross_entropy(logits, y)
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
opt.step()`}</Code>
        <FAQItem q="Why is my loss NaN?">Usually LR too high, missing normalisation, or fp16 without a GradScaler. Try bf16.</FAQItem>
      </Section>

      <Section id="training" title="5. Training & Optimization">
        <FAQItem q="How do I pick a learning rate?">Use a short LR-range test or start with 3e-4 for AdamW, 0.1 for SGD-momentum on CNNs.</FAQItem>
        <FAQItem q="What is warmup?">A short ramp of LR from 0 to target — prevents unstable early updates on large models.</FAQItem>
        <FAQItem q="What is weight decay?">L2-style penalty that pulls weights toward zero. AdamW decouples it from the gradient update.</FAQItem>
        <FAQItem q="Batch size tricks?">Gradient accumulation to fake a big batch, and mixed precision to fit more per step.</FAQItem>
        <FAQItem q="Overfitting — first moves?">More data → augmentation → dropout → weight decay → early stopping.</FAQItem>
      </Section>

      <Section id="evaluation" title="6. Model Evaluation">
        <FAQItem q="Accuracy is misleading — what else?">Precision, Recall, F1 for imbalanced data; ROC-AUC / PR-AUC for ranking; perplexity for LMs.</FAQItem>
        <FAQItem q="How do I split my data?">Train / validation / test — never touch test until final. Cross-validation for small datasets.</FAQItem>
        <FAQItem q="Should I monitor training or validation loss?">Both. Validation drives model selection; training loss diagnoses learning.</FAQItem>
      </Section>

      <Section id="deployment" title="7. Deployment & Production">
        <FAQItem q="How do I ship a PyTorch model?">TorchScript / torch.compile, or export to ONNX / TensorRT. Serve with Triton, TorchServe, BentoML, or vLLM for LLMs.</FAQItem>
        <FAQItem q="Do I need to retrain to quantise?">No — post-training INT8 is often enough. Use QAT when accuracy loss matters.</FAQItem>
        <FAQItem q="How do I monitor a production model?">Latency SLOs, feature drift (PSI/KS), quality on delayed labels, and per-cohort dashboards.</FAQItem>
      </Section>

      <Section id="career" title="8. Career & Learning Advice">
        <FAQItem q="How long to become job-ready?">6–12 months of consistent daily practice with 3–5 shipped projects.</FAQItem>
        <FAQItem q="Best portfolio projects?">A CV classifier with augmentation, a small transformer for text, and an end-to-end deployed demo.</FAQItem>
        <FAQItem q="Kaggle or research papers?">Both. Kaggle builds engineering muscle; papers keep you current.</FAQItem>
        <FAQItem q="Should I learn TensorFlow too?">Optional — most production teams standardise on PyTorch today.</FAQItem>
      </Section>

      <Section id="interview" title="9. Interview FAQs">
        <FAQItem q="Bias-variance trade-off?">Bias = underfitting, variance = overfitting. Ensembles reduce variance; more capacity reduces bias.</FAQItem>
        <FAQItem q="Explain dropout.">Randomly zeros activations during training; disabled at eval. Acts as ensemble regularisation.</FAQItem>
        <FAQItem q="What is transfer learning?">Reuse a pretrained network, fine-tune (fully or with PEFT) on a target task.</FAQItem>
        <FAQItem q="Why does attention work?">Content-based lookup — each token attends to the most relevant others in parallel.</FAQItem>
        <FAQItem q="Quantisation vs distillation?">Quantisation reduces precision; distillation trains a smaller student model to mimic a teacher.</FAQItem>
      </Section>

      <Section id="revision" title="10. Quick Revision">
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 2 — One-page revision map: architectures, training tricks, evaluation, deployment." />
        <ul className="list-disc space-y-1 pl-5">
          <li>Activations = non-linearity. Normalisation = stability. Residuals = gradient flow.</li>
          <li>Optimisers differ in how they scale and smooth gradients.</li>
          <li>Attention scales quadratically in sequence length — use FlashAttention.</li>
          <li>Mixed precision + gradient clipping = safer, faster training.</li>
          <li>Ship with ONNX / TorchScript; monitor drift and quality post-deploy.</li>
        </ul>
      </Section>

      <Section id="review" title="FAQ Review">
        <h3 className="font-semibold">Top 50 essential questions</h3>
        <p>Covered across sections 1–9. Read each answer twice, then quiz yourself without looking.</p>
        <h3 className="mt-4 font-semibold">Interview preparation</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Master bias-variance, dropout, backprop, attention, and evaluation metrics.</li>
          <li>Be able to sketch a training loop and a deployment pipeline from memory.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Self assessment</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you explain LayerNorm vs BatchNorm without notes?</li>
          <li>Can you name three ways to reduce training memory?</li>
          <li>Can you list two metrics beyond accuracy for imbalanced data?</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Fundamentals + a tight training loop beat exotic architectures.</li>
          <li>Deployment shapes training choices — decide the target early.</li>
          <li>Interview questions cluster around six themes: backprop, regularisation, architectures, attention, evaluation, deployment.</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Autograd</strong> — PyTorch's automatic differentiation engine.</li>
          <li><strong>LoRA</strong> — Low-Rank Adaptation for parameter-efficient fine-tuning.</li>
          <li><strong>KV-cache</strong> — reused K/V tensors that accelerate decoding.</li>
          <li><strong>PEFT</strong> — Parameter-Efficient Fine-Tuning.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation,
          academic publications, research papers, industry standards, and trusted educational resources. Deep learning
          technologies, frameworks, APIs, and best practices evolve continuously — consult the latest official
          documentation for the most accurate information. All trademarks, logos, product names, and intellectual
          property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
