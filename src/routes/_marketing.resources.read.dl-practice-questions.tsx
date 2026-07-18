import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-practice-questions",
  title: "Deep Learning — Practice Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "27 min",
  pages: 29,
  lastUpdated: "June 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "A progressive workbook of 250+ Deep Learning practice items — MCQs, short/long answer, coding, case-based, and diagram-based — grouped by topic and difficulty for spaced repetition.",
};

const TOC: TocItem[] = [
  { id: "nn-basics", label: "1. Neural Network Basics" },
  { id: "cnn", label: "2. CNN Practice" },
  { id: "rnn", label: "3. RNN & LSTM Practice" },
  { id: "transformers", label: "4. Transformers" },
  { id: "pytorch", label: "5. PyTorch Programming" },
  { id: "training", label: "6. Training & Optimization" },
  { id: "eval", label: "7. Model Evaluation" },
  { id: "cv", label: "8. Computer Vision" },
  { id: "nlp", label: "9. NLP Applications" },
  { id: "mixed", label: "10. Mixed Practice Sets" },
  { id: "review", label: "Practice Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Answer Key", tag: "AI & Data", time: "25 min" },
  { title: "Deep Learning — Interview Questions", tag: "AI & Data", time: "34 min" },
  { title: "Deep Learning — Learning Roadmap", tag: "AI & Data", time: "8 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-practice-questions")({
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
  component: DLPracticeQuestionsPage,
});

function MCQ({ n, q, opts }: { n: number; q: string; opts: string[] }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="mb-2 font-semibold">Q{n}. {q}</p>
      <ol className="list-[upper-alpha] space-y-1 pl-6 text-sm">
        {opts.map((o, i) => <li key={i}>{o}</li>)}
      </ol>
    </div>
  );
}

function SAQ({ n, q }: { n: number; q: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="font-semibold">Q{n}. {q}</p>
      <div className="mt-2 h-16 rounded border border-dashed border-border/60" />
    </div>
  );
}

function DLPracticeQuestionsPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="nn-basics" title="1. Neural Network Basics">
        <p>Warm up with fundamentals. Attempt every question before checking the Answer Key.</p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="How to use this workbook">
          Complete each topic in one sitting. Do not skip to solutions — solutions live in the
          separate <em>Deep Learning — Answer Key</em> resource.
        </Callout>
        <MCQ n={1} q="Which activation is most commonly used in hidden layers of modern deep networks?" opts={["Sigmoid", "Tanh", "ReLU", "Linear"]} />
        <MCQ n={2} q="What does the loss function measure?" opts={["Model size", "Distance between predicted and true outputs", "Optimizer speed", "Training time"]} />
        <SAQ n={3} q="Define an epoch, a batch, and an iteration in your own words." />
        <SAQ n={4} q="Explain in one paragraph why we need nonlinear activation functions." />
        <p className="text-sm"><strong>Fill in the blank:</strong> Q5. A neural network with only linear activations is equivalent to a single ______ transformation.</p>
        <p className="text-sm"><strong>True / False:</strong> Q6. Increasing model depth always reduces test error. (T / F)</p>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 1 — Practice workflow: read the concept, attempt the question, self-assess against the Answer Key, then repeat with harder items." />
      </Section>

      <Section id="cnn" title="2. CNN Practice">
        <MCQ n={7} q="Which layer type is primarily responsible for feature extraction in a CNN?" opts={["Fully connected", "Convolutional", "Softmax", "Embedding"]} />
        <MCQ n={8} q="Stride and padding of a conv layer primarily affect:" opts={["Number of parameters", "Output spatial dimensions", "Activation function", "Loss value"]} />
        <SAQ n={9} q="Compute the output shape of a Conv2d(in=3, out=16, kernel=3, stride=1, padding=1) applied to a 32×32×3 image." />
        <SAQ n={10} q="Draw the layout of a simple CNN with 2 conv blocks, 2 pooling layers, and a classifier head." />
        <p className="text-sm"><strong>Match the following:</strong> pair each conv concept with its effect: (a) 1×1 conv — (b) dilation — (c) stride 2 — (d) global average pooling.</p>
        <p className="text-sm"><strong>Case:</strong> Q11. You have 800 medical images. Design a strategy that avoids overfitting while training a CNN classifier.</p>
      </Section>

      <Section id="rnn" title="3. RNN & LSTM Practice">
        <MCQ n={12} q="Which architecture explicitly maintains a gated cell state?" opts={["Vanilla RNN", "GRU", "LSTM", "Both GRU and LSTM"]} />
        <SAQ n={13} q="List the three gates of an LSTM cell and describe the role of each." />
        <SAQ n={14} q="Why do vanilla RNNs struggle with long sequences?" />
        <p className="text-sm"><strong>True / False:</strong> Q15. LSTMs eliminate the vanishing gradient problem entirely. (T / F)</p>
      </Section>

      <Section id="transformers" title="4. Transformers">
        <MCQ n={16} q="Self-attention's computational complexity in sequence length n is:" opts={["O(n)", "O(n log n)", "O(n²)", "O(2^n)"]} />
        <SAQ n={17} q="Write the scaled dot-product attention formula and explain each term." />
        <SAQ n={18} q="Why are positional encodings required for transformers?" />
        <p className="text-sm"><strong>Diagram:</strong> Q19. Sketch an encoder block: attention → residual + norm → FFN → residual + norm.</p>
      </Section>

      <Section id="pytorch" title="5. PyTorch Programming">
        <p><strong>Coding exercise Q20.</strong> Complete the missing training loop.</p>
        <Code>{`import torch, torch.nn.functional as F

def train_step(model, optimizer, x, y):
    # TODO: forward pass
    # TODO: compute cross-entropy loss
    # TODO: backward pass
    # TODO: optimizer step
    # TODO: return loss.item()
    pass`}</Code>
        <p><strong>Coding exercise Q21.</strong> Write a nn.Module for a two-layer MLP with dropout.</p>
        <p><strong>Coding exercise Q22.</strong> Implement a custom Dataset that reads images from a directory and returns (tensor, label) pairs.</p>
        <p><strong>Coding exercise Q23.</strong> Implement early stopping around a validation-loss curve without third-party libraries.</p>
        <p className="text-sm"><strong>Debug:</strong> Q24. A model's loss becomes NaN after two epochs. List five likely causes.</p>
      </Section>

      <Section id="training" title="6. Training & Optimization">
        <MCQ n={25} q="Which of these is NOT a regularisation technique?" opts={["Dropout", "Weight decay", "Batch normalisation", "Learning rate warmup"]} />
        <SAQ n={26} q="Describe cosine learning-rate schedule and when to use it." />
        <SAQ n={27} q="Explain gradient clipping and why it stabilises transformer training." />
        <p className="text-sm"><strong>Case:</strong> Q28. Training diverges at epoch 3 with fp16. Propose three fixes.</p>
      </Section>

      <Section id="eval" title="7. Model Evaluation">
        <MCQ n={29} q="For an imbalanced classification problem, which metric is most misleading?" opts={["F1", "Precision-Recall AUC", "Accuracy", "Matthews correlation coefficient"]} />
        <SAQ n={30} q="Define calibration and describe one way to measure it." />
        <SAQ n={31} q="What is the difference between top-1 and top-5 accuracy?" />
        <p className="text-sm"><strong>Table:</strong> Q32. Given a confusion matrix, compute precision, recall, and F1 by hand.</p>
      </Section>

      <Section id="cv" title="8. Computer Vision">
        <SAQ n={33} q="List four common data-augmentation techniques and when each is appropriate." />
        <SAQ n={34} q="Compare object detection (YOLO, DETR) with semantic segmentation (UNet, DeepLab)." />
        <p className="text-sm"><strong>Case:</strong> Q35. Design a lightweight vision model for a mobile app that classifies 20 flower species.</p>
      </Section>

      <Section id="nlp" title="9. NLP Applications">
        <SAQ n={36} q="Explain BPE tokenisation and why it beats whitespace splitting for LLMs." />
        <SAQ n={37} q="Contrast BERT-style masked language modelling with GPT-style causal LM." />
        <p className="text-sm"><strong>Case:</strong> Q38. Draft an evaluation plan for a summarisation model that must not hallucinate facts.</p>
      </Section>

      <Section id="mixed" title="10. Mixed Practice Sets">
        <p>Timed 25-question mixed sets to simulate exam conditions. Attempt one per week.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Set A</strong> — foundations, mostly MCQs and short answers.</li>
          <li><strong>Set B</strong> — CNN + RNN focused, includes two coding tasks.</li>
          <li><strong>Set C</strong> — transformers and optimisation, harder scenarios.</li>
          <li><strong>Set D</strong> — end-to-end system practice, mixed formats.</li>
          <li><strong>Progressive difficulty:</strong> begin with Set A, only proceed once you score above 80%.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80" caption="Figure 2 — Practice progression: foundations → topical drills → timed mixed sets → self-assessment." />
      </Section>

      <Section id="review" title="Practice Review">
        <h3 className="font-semibold">Topic-wise scorecard</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Topic</th><th className="p-2 text-left">Attempted</th><th className="p-2 text-left">Correct</th><th className="p-2 text-left">Score</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Neural Network Basics</td><td className="p-2">/ 6</td><td className="p-2">___</td><td className="p-2">%</td></tr>
            <tr className="border-b"><td className="p-2">CNN Practice</td><td className="p-2">/ 5</td><td className="p-2">___</td><td className="p-2">%</td></tr>
            <tr className="border-b"><td className="p-2">RNN & LSTM</td><td className="p-2">/ 4</td><td className="p-2">___</td><td className="p-2">%</td></tr>
            <tr className="border-b"><td className="p-2">Transformers</td><td className="p-2">/ 4</td><td className="p-2">___</td><td className="p-2">%</td></tr>
            <tr className="border-b"><td className="p-2">PyTorch Programming</td><td className="p-2">/ 5</td><td className="p-2">___</td><td className="p-2">%</td></tr>
            <tr className="border-b"><td className="p-2">Training & Optim</td><td className="p-2">/ 4</td><td className="p-2">___</td><td className="p-2">%</td></tr>
            <tr><td className="p-2">Evaluation + CV + NLP</td><td className="p-2">/ 10</td><td className="p-2">___</td><td className="p-2">%</td></tr>
          </tbody>
        </table>
        <h3 className="mt-3 font-semibold">Revision checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Re-derive backprop for a 2-layer MLP on paper without references.</li>
          <li>Re-implement multi-head attention from a blank editor.</li>
          <li>Explain BatchNorm's train vs eval behaviour aloud.</li>
          <li>Sketch a training loop with mixed precision + gradient clipping.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Challenge problems</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Implement scaled dot-product attention with causal masking in under 30 lines.</li>
          <li>Fit a tiny transformer on a toy sequence task and plot the loss.</li>
          <li>Write a torch.compile-friendly ResNet block and measure the speedup.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Learning progress tracker</h3>
        <p>After completing each set, mark the date and score. Aim for four consecutive weeks above 80% before moving to interview prep.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Attempt every question — then check the Answer Key.</li>
          <li>Space repetition across two weeks beats one long cram session.</li>
          <li>Mixed sets are the highest-signal predictor of interview readiness.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Where are the solutions?">In the companion resource, <em>Deep Learning — Answer Key</em>. Attempt everything first.</FAQItem>
        <FAQItem q="How long should each topic take?">Plan 45–60 minutes per topic. Coding exercises may take longer.</FAQItem>
        <FAQItem q="What if I miss a lot of MCQs on a topic?">Revisit that topic in the <em>Reference Guide</em> resource before retrying.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>MCQ</strong> — Multiple-choice question.</li>
          <li><strong>SAQ</strong> — Short-answer question.</li>
          <li><strong>Epoch</strong> — one full pass over the training set.</li>
          <li><strong>Iteration</strong> — one gradient update on a mini-batch.</li>
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
