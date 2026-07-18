import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-interview-questions",
  title: "Deep Learning — Interview Questions",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "34 min",
  pages: 33,
  lastUpdated: "July 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "200+ curated Deep Learning interview questions — from fundamentals to FAANG-level system design — with layered hints, model answers, PyTorch code, and interviewer expectations.",
};

const TOC: TocItem[] = [
  { id: "prep", label: "1. Interview Preparation Guide" },
  { id: "beginner", label: "2. Beginner Questions" },
  { id: "intermediate", label: "3. Intermediate Questions" },
  { id: "advanced", label: "4. Advanced Questions" },
  { id: "pytorch", label: "5. PyTorch Questions" },
  { id: "cnn", label: "6. CNN & Computer Vision" },
  { id: "nlp", label: "7. NLP & Transformers" },
  { id: "optim", label: "8. Model Optimization" },
  { id: "sysdesign", label: "9. System Design Questions" },
  { id: "research", label: "10. Research & AI Trends" },
  { id: "behavioral", label: "11. Behavioral Questions" },
  { id: "mock", label: "12. Mock Interview" },
  { id: "review", label: "Interview Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Practice Questions", tag: "AI & Data", time: "27 min" },
  { title: "Deep Learning — Answer Key", tag: "AI & Data", time: "25 min" },
  { title: "Deep Learning — Reference Guide", tag: "AI & Data", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-interview-questions")({
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
  component: DLInterviewQuestionsPage,
});

function Q({ n, level, q, hint, answer, followUp, mistake }: { n: number; level: string; q: string; hint: string; answer: string; followUp?: string; mistake?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-mono">Q{n}</span>
        <span className="rounded-full bg-muted px-2 py-0.5">{level}</span>
      </div>
      <p className="mb-2 font-semibold">{q}</p>
      <p className="mb-1 text-sm"><strong>Hint:</strong> {hint}</p>
      <p className="mb-1 text-sm"><strong>Model answer:</strong> {answer}</p>
      {followUp && <p className="mb-1 text-sm"><strong>Follow-up:</strong> {followUp}</p>}
      {mistake && <p className="text-sm text-muted-foreground"><strong>Common mistake:</strong> {mistake}</p>}
    </div>
  );
}

function DLInterviewQuestionsPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="prep" title="1. Interview Preparation Guide">
        <p>
          Deep Learning interviews at product and research companies test four axes: fundamentals
          (calculus, linear algebra, probability), model intuition (why a technique works), coding
          fluency (PyTorch under time pressure), and applied judgement (system design and
          trade-offs). Prepare across all four — over-indexing on one is the most common failure
          mode. A rough two-week plan: days 1–3 revisit fundamentals; days 4–7 drill PyTorch and
          CNN/NLP model coding; days 8–11 attempt system-design prompts aloud; days 12–14 run
          full mock interviews.
        </p>
        <Callout tone="info" title="How to use this resource" icon={<Sparkles className="h-5 w-5" />}>
          Each question includes a <strong>hint</strong> for when you are stuck, a <strong>model answer</strong> for
          calibration, and a <strong>follow-up</strong> the interviewer is likely to ask next. Read the
          question, attempt an answer aloud, then compare.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80" caption="Figure 1 — Deep Learning interview flow: screen, technical, coding, system design, and behavioural rounds." />
      </Section>

      <Section id="beginner" title="2. Beginner Questions">
        <Q n={1} level="L3 · Beginner" q="What is a neural network?" hint="Universal function approximator; composition of affine + nonlinear." answer="A parameterised function y = f(x;θ) built by stacking layers of the form σ(Wx+b). Training adjusts θ by gradient descent on a loss." followUp="Why do we need nonlinearities?" mistake="Calling it 'a model that mimics the brain' — that framing is misleading and interviewers deduct for it." />
        <Q n={2} level="L3 · Beginner" q="Explain the vanishing gradient problem." hint="Chain rule with small derivatives." answer="Repeated multiplication of small partial derivatives across deep layers drives upstream gradients toward zero, freezing early weights. Fixes: ReLU, residual connections, careful init, normalisation." followUp="Contrast with exploding gradients." mistake="Confusing vanishing with dead ReLUs." />
        <Q n={3} level="L3 · Beginner" q="What does the softmax function output?" hint="Probabilities that sum to 1." answer="Softmax maps a logit vector to a categorical distribution: exp(z_i) / Σ exp(z_j). Used with cross-entropy loss for classification." followUp="Why is softmax + CE numerically fused in practice?" />
        <Q n={4} level="L3 · Beginner" q="Difference between training, validation and test sets?" hint="Fit / tune / report." answer="Train fits parameters; validation tunes hyperparameters and does model selection; test is a held-out untouched set used once for final reporting." mistake="Peeking at test set during tuning — this is a red flag." />
        <Q n={5} level="L3 · Beginner" q="What is overfitting and how do you detect it?" hint="Gap between train and val loss." answer="Model memorises training noise: training loss falls while validation loss stalls or rises. Detect via a learning-curve plot." followUp="Name three regularisation techniques." />
      </Section>

      <Section id="intermediate" title="3. Intermediate Questions">
        <Q n={6} level="L4 · Intermediate" q="Explain batch normalisation and why it helps." hint="Reduces internal covariate shift; smooths loss landscape." answer="BN normalises activations per mini-batch to zero-mean/unit-variance, then applies learnable scale/shift. Empirically it allows higher learning rates, acts as a mild regulariser, and makes optimisation more stable." followUp="How does BN behave at inference?" mistake="Forgetting BN uses running statistics at eval time." />
        <Q n={7} level="L4 · Intermediate" q="Compare Adam, SGD with momentum, and AdamW." hint="Adaptive vs. non-adaptive; weight decay coupling." answer="SGD-momentum uses a velocity term for smoother updates. Adam adds per-parameter adaptive step sizes via first/second moments. AdamW decouples weight decay from the gradient step, which restores its regularisation semantics." followUp="Why did large-model training move to AdamW?" />
        <Q n={8} level="L4 · Intermediate" q="What is dropout and where is it applied?" hint="Bernoulli mask on activations." answer="During training, randomly zero a fraction p of activations to reduce co-adaptation. At inference, scale by (1-p) or use inverted dropout. Applied to fully-connected layers, sometimes attention outputs; usually not to conv layers." />
        <Q n={9} level="L4 · Intermediate" q="Explain the bias–variance trade-off in deep learning." hint="Classical view vs. double descent." answer="Classical trade-off says higher capacity trades bias for variance. In deep learning we observe double descent: past the interpolation threshold, test error can decrease again. Regularisation and data volume still matter." />
        <Q n={10} level="L4 · Intermediate" q="Why do we use cross-entropy loss for classification?" hint="Maximum likelihood under categorical distribution." answer="Cross-entropy is the negative log-likelihood of the true label under the model's predicted distribution — the natural objective when outputs are probabilities. Its gradient is well-scaled compared to MSE for classification." mistake="Applying MSE with softmax outputs — gradients saturate." />
      </Section>

      <Section id="advanced" title="4. Advanced Questions">
        <Q n={11} level="L5 · Advanced" q="Derive the gradient of softmax + cross-entropy." hint="It simplifies to ŷ - y." answer="With ŷ = softmax(z) and y one-hot, the loss L = -Σ y_i log ŷ_i. Then ∂L/∂z_i = ŷ_i - y_i — clean and stable, which is why the two are fused in practice." followUp="Why is this fusion numerically important?" />
        <Q n={12} level="L5 · Advanced" q="Explain LayerNorm vs BatchNorm and when each wins." hint="Batch dependence." answer="BN normalises across batch dimension per feature; LN normalises across features per sample. LN wins for RNNs and transformers where batch size varies and sequence length matters; BN wins for large-batch conv training on stable input distributions." />
        <Q n={13} level="L5 · Advanced" q="What is mixed-precision training?" hint="bf16 / fp16 with loss scaling." answer="Store master weights in fp32; run forward/backward in fp16 or bf16 for speed and memory. Loss scaling shifts small gradients into representable range for fp16; bf16 has better range and typically avoids scaling." followUp="Where does bf16 fail?" />
        <Q n={14} level="L5 · Advanced" q="Explain gradient checkpointing." hint="Recompute activations to save memory." answer="Instead of storing all activations for backprop, save a sparse subset and recompute the rest during the backward pass. Trades ~30% extra compute for large memory savings — enables training larger models." />
        <Q n={15} level="L5 · Advanced" q="Why does residual learning make deep networks trainable?" hint="Identity mapping preserves gradient." answer="ResNet's y = F(x) + x means the gradient can flow through the identity path even when F's Jacobian is small. Empirically it enables 100+ layer networks without vanishing gradients." />
      </Section>

      <Section id="pytorch" title="5. PyTorch Questions">
        <Q n={16} level="L4 · Intermediate" q="What is the difference between nn.Module and nn.functional?" hint="Stateful vs. stateless." answer="nn.Module classes hold learnable parameters and buffers. nn.functional exposes stateless ops (F.relu, F.cross_entropy) you apply inside forward(). Use Module for anything with parameters; functional for pure ops." />
        <Q n={17} level="L4 · Intermediate" q="How does autograd work in PyTorch?" hint="Dynamic computation graph." answer="PyTorch builds a graph as ops execute. Each tensor with requires_grad=True records its op. Calling loss.backward() walks the graph in reverse, invoking each op's backward to accumulate .grad on leaves." followUp="What does .detach() do?" />
        <Code>{`# Canonical PyTorch training step
model.train()
for x, y in loader:
    x, y = x.to(device), y.to(device)
    optimizer.zero_grad(set_to_none=True)
    logits = model(x)
    loss = F.cross_entropy(logits, y)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    optimizer.step()`}</Code>
        <Q n={18} level="L4 · Intermediate" q="Why prefer set_to_none=True in zero_grad()?" hint="Memory + micro-perf." answer="Setting grads to None (instead of zeroing) saves a memory write and lets the next backward pass allocate fresh tensors without a zero-fill." />
        <Q n={19} level="L5 · Advanced" q="Explain DataParallel vs DistributedDataParallel." hint="Single process vs. multi-process." answer="DataParallel forks threads inside one process and gathers gradients on rank 0 — GIL-bound and rarely scales. DDP spawns one process per GPU with NCCL all-reduce, scales linearly and is the recommended default." />
        <Q n={20} level="L5 · Advanced" q="What is torch.compile and when should you use it?" hint="Graph capture + kernel fusion." answer="torch.compile (PyTorch 2.x) traces the model, hands the graph to TorchInductor, and generates fused kernels. Expect 20–80% speedups on transformer training; use in production once your model is debugged." />
      </Section>

      <Section id="cnn" title="6. CNN & Computer Vision">
        <Q n={21} level="L4 · Intermediate" q="Why do CNNs work well on images?" hint="Locality, weight sharing, translation equivariance." answer="Convolutions exploit spatial locality, share weights across the input, and are translation-equivariant — matching the statistics of natural images and reducing parameter count vs. fully connected." />
        <Q n={22} level="L4 · Intermediate" q="Explain receptive field." hint="Region of input each output neuron sees." answer="The receptive field is the set of input pixels influencing one output activation. Deeper layers have larger receptive fields; dilated convs enlarge it without extra parameters." />
        <Q n={23} level="L5 · Advanced" q="Compare CNNs and Vision Transformers." hint="Inductive bias vs data scale." answer="CNNs have strong locality/translation priors and generalise well from little data. ViTs drop those priors and need more data or heavy augmentation, but scale better and integrate cleanly with multimodal pipelines." />
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 2 — Neural network architecture: input → conv/attention blocks → normalisation → task head, with residual connections carrying gradient." />
      </Section>

      <Section id="nlp" title="7. NLP & Transformers">
        <Q n={24} level="L5 · Advanced" q="Explain scaled dot-product attention." hint="Softmax(QK^T/√d)V." answer="Attention computes a weighted average of value vectors, weighted by the softmax of query-key similarities scaled by √d_k. Scaling prevents softmax saturation as d_k grows." followUp="Why not use raw dot product?" />
        <Q n={25} level="L5 · Advanced" q="Why is positional encoding needed in transformers?" hint="Attention is set-invariant." answer="Self-attention has no notion of order; positional encodings (sinusoidal, learned, or rotary) inject sequence position so the model can distinguish token order." />
        <Q n={26} level="L5 · Advanced" q="Contrast encoder-only, decoder-only, and encoder-decoder transformers." hint="BERT / GPT / T5." answer="Encoder-only (BERT) for representation and classification; decoder-only (GPT) for autoregressive generation with causal mask; encoder-decoder (T5, BART) for seq2seq tasks like translation." />
      </Section>

      <Section id="optim" title="8. Model Optimization">
        <Q n={27} level="L5 · Advanced" q="Explain quantisation and its trade-offs." hint="fp32 → int8/int4." answer="Reduce weight/activation precision to lower memory and speed inference. Post-training quantisation is fast but lossy; quantisation-aware training preserves accuracy at int8. Trade-off: accuracy loss on outlier-heavy activations." />
        <Q n={28} level="L5 · Advanced" q="What is knowledge distillation?" hint="Teacher → student soft labels." answer="Train a smaller student to match a larger teacher's output distribution (soft labels) alongside the true labels. Retains most accuracy at a fraction of parameters." />
        <Q n={29} level="L5 · Advanced" q="Explain pruning strategies." hint="Structured vs unstructured." answer="Unstructured pruning zeros individual weights — high compression but hardware rarely accelerates. Structured pruning removes entire filters/heads — smaller compression but real speedups on standard GPUs." />
      </Section>

      <Section id="sysdesign" title="9. System Design Questions">
        <Q n={30} level="L6 · System Design" q="Design a real-time video recommendation system." hint="Retrieval + ranker; feature store; freshness." answer="Two-tower retrieval over embeddings for candidate generation, a cross-attention ranker for top-k re-ordering, a feature store for online features, freshness pipelines for new content, and cold-start rules for new users/items. Serve behind an ANN index (FAISS/ScaNN)." followUp="How do you A/B test model changes safely?" />
        <Q n={31} level="L6 · System Design" q="How would you serve a 70B-parameter LLM cost-effectively?" hint="Quant + tensor parallel + batching." answer="Quantise to int4/int8, split across GPUs with tensor/pipeline parallelism, use continuous batching (vLLM/TGI), cache KV, and route to smaller models for easy prompts." />
        <Q n={32} level="L6 · System Design" q="Design an image moderation pipeline for user uploads." hint="Cascaded models + human-in-loop." answer="Fast cheap classifier at ingest → higher-accuracy model on flagged content → human reviewer for uncertain cases → feedback loop into retraining. Track false-negative rate on adversarial samples." />
      </Section>

      <Section id="research" title="10. Research & AI Trends">
        <Q n={33} level="Research" q="What is the transformer's biggest current limitation?" hint="Quadratic attention." answer="Self-attention scales O(n²) in sequence length. Alternatives: linear attention, state-space models (Mamba), sparse attention. Also: hallucination and grounding remain open." />
        <Q n={34} level="Research" q="Explain in-context learning." hint="No weight updates." answer="Large LMs learn from examples provided in the prompt without gradient updates. Mechanism still debated — attention effectively implements a form of implicit gradient descent in some setups." />
        <Q n={35} level="Research" q="What is RLHF and why does it matter?" hint="Reward model + PPO." answer="Reinforcement Learning from Human Feedback trains a reward model on human preference comparisons and fine-tunes the policy with PPO. Aligns model outputs with human intent beyond next-token likelihood." />
      </Section>

      <Section id="behavioral" title="11. Behavioral Questions">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tell me about a time your model failed in production. What did you learn?</li>
          <li>Walk me through a project where you disagreed with your team's technical direction.</li>
          <li>How do you decide when a model is 'good enough' to ship?</li>
          <li>Describe a time you had to explain a model's behaviour to a non-technical stakeholder.</li>
          <li>What is the toughest debugging session you've had? Framework the interviewer expects: STAR (Situation, Task, Action, Result).</li>
        </ul>
      </Section>

      <Section id="mock" title="12. Mock Interview">
        <p>A 60-minute simulated FAANG-level DL interview:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>0–10 min</strong> — Warm-up: derive gradient of sigmoid + BCE.</li>
          <li><strong>10–30 min</strong> — Coding: implement multi-head self-attention in PyTorch from scratch.</li>
          <li><strong>30–50 min</strong> — System design: build a search ranker for 100M documents at 50ms p99.</li>
          <li><strong>50–60 min</strong> — Behavioural + questions for the interviewer.</li>
        </ul>
        <Callout tone="warning" title="Whiteboard tip">Talk before you code. State assumptions, sketch tensor shapes, and confirm the interface before writing loops.</Callout>
      </Section>

      <Section id="review" title="Interview Review">
        <h3 className="font-semibold">Top 100 most-asked topics (compressed)</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Backprop derivation, chain rule, softmax+CE gradient.</li>
          <li>BatchNorm, LayerNorm, GroupNorm — differences and when.</li>
          <li>Attention math, positional encodings, KV cache.</li>
          <li>Optimiser choice, LR schedules, warmup.</li>
          <li>Regularisation: dropout, weight decay, augmentation, mixup.</li>
          <li>CNN receptive field, dilated conv, transposed conv.</li>
          <li>DDP, mixed precision, gradient checkpointing.</li>
          <li>Quantisation, distillation, pruning.</li>
          <li>Evaluation: AUC, F1, calibration, uncertainty.</li>
          <li>Serving: ANN, latency budgets, canary + shadow deploys.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Interview checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you derive backprop for a two-layer MLP on paper?</li>
          <li>Can you code multi-head attention without references in under 15 minutes?</li>
          <li>Can you explain LayerNorm vs BatchNorm to a junior engineer?</li>
          <li>Can you design a recommender end-to-end at a whiteboard?</li>
          <li>Do you have three STAR stories rehearsed?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Final revision sheet</h3>
        <p>The night before: re-read softmax+CE gradient, attention formula, BN train/eval difference, and one system design case. Sleep. Do not attempt new material.</p>
        <h3 className="mt-3 font-semibold">Mock interview evaluation rubric</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Communication</strong> — clarity, structure, calibration.</li>
          <li><strong>Correctness</strong> — accurate math and code.</li>
          <li><strong>Depth</strong> — willingness to trade off, cite alternatives.</li>
          <li><strong>Judgement</strong> — recognises unknowns and asks.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master fundamentals before optimising — chain rule beats trivia every round.</li>
          <li>Ship PyTorch fluency: attention, DDP, mixed precision, torch.compile.</li>
          <li>System design questions reward structured thinking, not exotic tricks.</li>
          <li>Behavioural rounds separate offers from strong-no-hires more than you think.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How many hours of prep do FAANG DL interviews need?">80–120 focused hours spread over 4–6 weeks, plus 5+ mocks.</FAQItem>
        <FAQItem q="Is TensorFlow acceptable for the coding round?">Most teams accept either but expect PyTorch fluency. Confirm with your recruiter.</FAQItem>
        <FAQItem q="Do I need research experience?">Only for research roles. Applied roles weight production judgement much higher.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Autograd</strong> — PyTorch's automatic differentiation engine.</li>
          <li><strong>DDP</strong> — DistributedDataParallel, multi-process gradient sync.</li>
          <li><strong>KV cache</strong> — cached key/value tensors for autoregressive decoding.</li>
          <li><strong>RLHF</strong> — Reinforcement Learning from Human Feedback.</li>
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
