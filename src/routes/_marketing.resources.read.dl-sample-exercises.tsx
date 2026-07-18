import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-sample-exercises",
  title: "Deep Learning — Sample Exercises",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "23 min",
  pages: 31,
  lastUpdated: "July 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1800&q=80",
  heroSubtitle:
    "A guided workbook of 200+ progressive deep-learning exercises — warm-ups, coding drills, diagram tasks, debugging challenges, and mini-projects designed to turn theory into fluent PyTorch practice.",
};

const TOC: TocItem[] = [
  { id: "how-to-use", label: "How to Use This Workbook" },
  { id: "nn-basics", label: "1. Neural Network Basics" },
  { id: "activations", label: "2. Activation Functions" },
  { id: "backprop", label: "3. Forward & Backpropagation" },
  { id: "cnn", label: "4. CNN Exercises" },
  { id: "rnn", label: "5. RNN & LSTM Exercises" },
  { id: "transformer", label: "6. Transformer Exercises" },
  { id: "cv", label: "7. Computer Vision Tasks" },
  { id: "nlp", label: "8. NLP Exercises" },
  { id: "pytorch", label: "9. PyTorch Coding Activities" },
  { id: "review", label: "10. Review Exercises" },
  { id: "checklist", label: "Exercise Review & Checklist" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Practice Questions", tag: "AI & Data", time: "27 min" },
  { title: "Deep Learning — Answer Key", tag: "AI & Data", time: "25 min" },
  { title: "Deep Learning — Learning Roadmap", tag: "AI & Data", time: "22 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-sample-exercises")({
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
  component: DLSampleExercisesPage,
});

function Ex({ n, title, task, hint }: { n: string; title: string; task: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="mb-1 font-semibold">Exercise {n} — {title}</p>
      <p className="mb-1 text-sm">{task}</p>
      {hint && <p className="text-xs text-muted-foreground"><strong>Hint:</strong> {hint}</p>}
    </div>
  );
}

function DLSampleExercisesPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="how-to-use" title="How to Use This Workbook">
        <p>
          Each section stacks warm-ups, guided drills, coding activities, diagram tasks, and a small
          mini-project. Attempt every exercise before checking hints. Aim for 3–4 exercises per
          study session and log your completion in the tracker at the end of the workbook.
        </p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="Learning objectives">
          Strengthen fundamentals, apply theory hands-on, build problem-solving instincts, fluently
          write PyTorch, and gain confidence before your first real project.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 1 — Deep-learning practice loop: attempt → self-check → refactor → retry with a variation." />
      </Section>

      <Section id="nn-basics" title="1. Neural Network Basics">
        <Ex n="1.1" title="Warm-up: perceptron" task="Draw a perceptron with 3 inputs, bias, and step activation. Label weights w1, w2, w3." />
        <Ex n="1.2" title="Fill in the blanks" task="A neuron computes y = f(____·x + ____). Name the two learnable parameters." hint="One is a vector, one is a scalar." />
        <Ex n="1.3" title="Coding drill" task="Implement a single neuron in NumPy with sigmoid activation and one forward pass." />
        <Ex n="1.4" title="Mini task" task="Extend the neuron to a 2-layer MLP (2→3→1) and print output shapes for a batch of 5." />
        <Ex n="1.5" title="Reflection" task="Why do we need hidden layers instead of stacking linear neurons directly?" />
      </Section>

      <Section id="activations" title="2. Activation Functions">
        <Ex n="2.1" title="Plot" task="On paper, sketch sigmoid, tanh, ReLU, and GELU on the same axes." />
        <Ex n="2.2" title="Compare" task="Fill in a table: activation, output range, differentiable at 0, vanishing risk." />
        <Ex n="2.3" title="Coding" task="Implement leaky ReLU in PyTorch as a custom nn.Module with parameterised slope." />
        <Ex n="2.4" title="Debug" task="A model with all-sigmoid hidden layers trains slowly and stalls. Suggest two fixes." hint="Think about gradient magnitudes." />
        <Ex n="2.5" title="Reflection" task="When would you prefer GELU over ReLU?" />
      </Section>

      <Section id="backprop" title="3. Forward & Backpropagation">
        <Ex n="3.1" title="Warm-up" task="Given y = w·x + b with loss L = (y − t)², derive dL/dw by hand." />
        <Ex n="3.2" title="Chain rule" task="For a 2-layer net with sigmoid activations, write dL/dW1 in terms of intermediate variables." />
        <Ex n="3.3" title="Coding" task="Use PyTorch autograd to verify your derivative for exercise 3.1 numerically." />
        <Code>{`import torch
w = torch.tensor(2.0, requires_grad=True)
x, t = torch.tensor(3.0), torch.tensor(4.0)
y = w * x
loss = (y - t) ** 2
loss.backward()
print(w.grad)  # compare with your hand derivation`}</Code>
        <Ex n="3.4" title="Debug" task="A student calls loss.backward() twice without zero_grad(). What happens to the gradients?" />
        <Ex n="3.5" title="Reflection" task="Explain why gradient clipping stabilises training." />
      </Section>

      <Section id="cnn" title="4. CNN Exercises">
        <Ex n="4.1" title="Shape drill" task="Input 3×64×64. Conv(3→16, k=3, s=1, p=1) then MaxPool(2). Compute the output shape." hint="out = floor((in + 2p − k)/s) + 1." />
        <Ex n="4.2" title="Diagram" task="Draw a mini-VGG: 2 conv-relu-pool blocks then a classifier head. Label channel counts." />
        <Ex n="4.3" title="Coding" task="Build a CNN classifier in PyTorch for MNIST and print parameter count with sum(p.numel() for p in model.parameters())." />
        <Ex n="4.4" title="Fill in the blanks" task="Padding preserves ____ dimensions. Stride > 1 ____ the spatial size." />
        <Ex n="4.5" title="Mini project" task="Train the classifier for 3 epochs on MNIST and report accuracy on the val split." />
      </Section>

      <Section id="rnn" title="5. RNN & LSTM Exercises">
        <Ex n="5.1" title="Warm-up" task="List the three gates of an LSTM and describe what each controls in one sentence." />
        <Ex n="5.2" title="Diagram" task="Sketch an unrolled RNN for 4 time-steps. Mark the shared weights." />
        <Ex n="5.3" title="Coding" task="Use nn.LSTM to encode a batch of sequences shape (B=8, T=20, F=16) and return the final hidden state." />
        <Ex n="5.4" title="Debug" task="An RNN loss diverges after epoch 2. Propose a fix." hint="Look at gradient magnitudes across time-steps." />
        <Ex n="5.5" title="Reflection" task="Why did transformers replace LSTMs for long-context language modelling?" />
      </Section>

      <Section id="transformer" title="6. Transformer Exercises">
        <Ex n="6.1" title="Attention formula" task="Write the scaled dot-product attention equation. Explain each term." />
        <Ex n="6.2" title="Coding" task="Implement single-head self-attention in PyTorch from scratch without using nn.MultiheadAttention." />
        <Ex n="6.3" title="Complexity" task="What is the time complexity of self-attention over sequence length n? Suggest one linear-time alternative." />
        <Ex n="6.4" title="Diagram" task="Draw a transformer encoder block. Mark residual connections and LayerNorm placement." />
        <Ex n="6.5" title="Reflection" task="Why do transformers need positional encodings?" />
      </Section>

      <Section id="cv" title="7. Computer Vision Tasks">
        <Ex n="7.1" title="Data aug" task="List four image augmentations useful for a flower classifier and one that would harm a medical X-ray dataset." />
        <Ex n="7.2" title="Coding" task="Use torchvision.transforms to build a training pipeline with RandomResizedCrop and ColorJitter." />
        <Ex n="7.3" title="Mini project" task="Fine-tune a pretrained ResNet18 on the CIFAR-10 val split for 5 epochs and report top-1 accuracy." />
        <Ex n="7.4" title="Diagram" task="Sketch a UNet encoder-decoder with skip connections for image segmentation." />
        <Ex n="7.5" title="Reflection" task="When would you choose object detection over semantic segmentation?" />
      </Section>

      <Section id="nlp" title="8. NLP Exercises">
        <Ex n="8.1" title="Warm-up" task="Explain byte-pair encoding in your own words in 3 sentences." />
        <Ex n="8.2" title="Coding" task="Use Hugging Face AutoTokenizer to tokenise 'transformers are powerful' and print the token ids and reconstructed text." />
        <Ex n="8.3" title="Mini task" task="Fine-tune a distilBERT classifier for binary sentiment on a small val set (500 samples)." />
        <Ex n="8.4" title="Compare" task="Fill a table contrasting MLM (BERT) vs Causal LM (GPT): masking, direction, use case." />
        <Ex n="8.5" title="Reflection" task="Why is validation ROUGE alone insufficient for evaluating summarisation quality?" />
      </Section>

      <Section id="pytorch" title="9. PyTorch Coding Activities">
        <Ex n="9.1" title="Training loop" task="Write a full training loop with AMP (torch.cuda.amp.autocast + GradScaler) and gradient clipping." />
        <Code>{`from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()
for x, y in loader:
    x, y = x.to(device), y.to(device)
    optim.zero_grad(set_to_none=True)
    with autocast():
        logits = model(x)
        loss = criterion(logits, y)
    scaler.scale(loss).backward()
    scaler.unscale_(optim)
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(optim); scaler.update()`}</Code>
        <Ex n="9.2" title="Dataset" task="Implement a custom Dataset that loads image paths from a CSV and returns (tensor, label)." />
        <Ex n="9.3" title="Checkpoint" task="Add save/load logic for model, optimiser, scaler, and epoch." />
        <Ex n="9.4" title="Scheduler" task="Attach a cosine LR schedule with 500 warmup steps." />
        <Ex n="9.5" title="Debug drill" task="Given a model that returns NaN loss on step 100, list five likely causes and how to check each." />
      </Section>

      <Section id="review" title="10. Review Exercises">
        <Ex n="10.1" title="Mixed set" task="Solve five randomly picked exercises from sections 1–9 in one 45-minute sitting. Score yourself." />
        <Ex n="10.2" title="Challenge" task="Re-implement Q9.1 without looking at the notes, then diff your version against the earlier attempt." />
        <Ex n="10.3" title="Explain-back" task="Teach the transformer encoder block to a peer in under 3 minutes. Record and self-review." />
        <Figure src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1400&q=80" caption="Figure 2 — Mixed-topic drill: sample from each section, time-box the attempt, and track weak spots for the next week." />
      </Section>

      <Section id="checklist" title="Exercise Review & Checklist">
        <h3 className="font-semibold">Exercise checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Neural network basics — 5/5 attempted</li>
          <li>Activation functions — 5/5 attempted</li>
          <li>Backprop derivations — 5/5 attempted</li>
          <li>CNN / RNN / Transformer drills — 15/15 attempted</li>
          <li>Vision + NLP mini projects — 2/2 attempted</li>
          <li>PyTorch coding drills — 5/5 attempted</li>
        </ul>
        <h3 className="mt-3 font-semibold">Learning tracker</h3>
        <p>Log completion date, self-score (1–5), and one thing you learned per exercise. Retry any exercise scored below 3 after a week.</p>
        <h3 className="mt-3 font-semibold">Challenge exercises</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Re-derive attention gradients on paper.</li>
          <li>Implement multi-head attention without nn.MultiheadAttention.</li>
          <li>Train the MNIST CNN to &gt; 99% test accuracy under 60 seconds.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Revision activities</h3>
        <p>Every fifth session, redo one exercise from each section as a spaced-review pass.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Consistency beats intensity — 3 exercises a day compounds fast.</li>
          <li>Reflection questions are as important as the code drills.</li>
          <li>Progressive difficulty is deliberate — resist skipping ahead.</li>
          <li>Track your weak topics; retry them until scores plateau at 4/5.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I need a GPU to complete these exercises?">Most exercises run on CPU; only the mini-project sections benefit from a GPU or Colab.</FAQItem>
        <FAQItem q="What Python and PyTorch versions?">Python ≥ 3.10 and PyTorch ≥ 2.2.</FAQItem>
        <FAQItem q="How long should each session be?">45–60 minutes with a 5-minute review at the end.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Warm-up</strong> — short conceptual exercise before a coding drill.</li>
          <li><strong>Mini project</strong> — end-to-end task combining data, model, and evaluation.</li>
          <li><strong>Spaced review</strong> — revisiting old exercises at increasing intervals.</li>
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
