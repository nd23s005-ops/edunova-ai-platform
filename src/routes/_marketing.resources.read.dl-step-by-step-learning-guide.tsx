import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-step-by-step-learning-guide",
  title: "Deep Learning — Step-by-Step Learning Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "25 min",
  pages: 26,
  lastUpdated: "June 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  heroSubtitle:
    "An eight-week structured roadmap to learn Deep Learning from scratch — with daily goals, weekly milestones, revision checkpoints, mini projects, and a career-ready portfolio path.",
};

const TOC: TocItem[] = [
  { id: "prereq", label: "1. Prerequisites" },
  { id: "w1", label: "2. Week 1 — DL Basics" },
  { id: "w2", label: "3. Week 2 — Neural Networks" },
  { id: "w3", label: "4. Week 3 — CNN" },
  { id: "w4", label: "5. Week 4 — RNN & LSTM" },
  { id: "w5", label: "6. Week 5 — Transformers" },
  { id: "w6", label: "7. Week 6 — Computer Vision" },
  { id: "w7", label: "8. Week 7 — NLP" },
  { id: "w8", label: "9. Week 8 — Final Project" },
  { id: "career", label: "10. Career Roadmap" },
  { id: "review", label: "Step-by-Step Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Beginner Guide", tag: "AI & Data", time: "18 min" },
  { title: "Deep Learning — Complete Tutorial", tag: "AI & Data", time: "64 min" },
  { title: "Deep Learning — Sample Exercises", tag: "AI & Data", time: "23 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-step-by-step-learning-guide")({
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
  component: DLStepByStepGuidePage,
});

function Week({ n, title, goals, exercises, milestone }: { n: number; title: string; goals: string[]; exercises: string[]; milestone: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4">
      <p className="mb-2 font-semibold">Week {n} — {title}</p>
      <p className="mb-1 text-sm"><strong>Daily goals:</strong></p>
      <ul className="mb-2 list-disc space-y-1 pl-5 text-sm">
        {goals.map(g => <li key={g}>{g}</li>)}
      </ul>
      <p className="mb-1 text-sm"><strong>Practice exercises:</strong></p>
      <ul className="mb-2 list-disc space-y-1 pl-5 text-sm">
        {exercises.map(e => <li key={e}>{e}</li>)}
      </ul>
      <p className="text-sm text-muted-foreground"><strong>Weekly milestone:</strong> {milestone}</p>
    </div>
  );
}

function DLStepByStepGuidePage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="prereq" title="1. Prerequisites">
        <p>Before Week 1, spend 2–3 evenings on the following. Skip anything you already know.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Python — functions, classes, list/dict comprehensions.</li>
          <li>NumPy — array operations, broadcasting.</li>
          <li>High-school algebra and basic calculus (derivatives).</li>
          <li>Working laptop with Python 3.11 and pip installed.</li>
        </ul>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="How this guide works">
          Eight focused weeks, ~8 hours per week. Every week ships one mini-deliverable so your
          portfolio grows as you learn.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&q=80" caption="Figure 1 — The eight-week deep learning roadmap: from fundamentals to a shipped capstone." />
      </Section>

      <Section id="w1" title="Week 1 — Deep Learning Basics">
        <Week n={1} title="Deep Learning Basics" goals={[
          "Day 1 — Read a beginner overview; write your own AI vs ML vs DL note.",
          "Day 2 — Install PyTorch; verify with a hello-tensor script.",
          "Day 3 — Understand tensors, shapes, and broadcasting.",
          "Day 4 — Write a scalar → vector → matrix mental model.",
          "Day 5 — Autograd walkthrough with a tiny example.",
          "Weekend — Recap notes and 20-min self-quiz.",
        ]} exercises={[
          "Create a 1D tensor of 20 numbers and normalise it.",
          "Use autograd to compute d/dx of x² at x=3.",
        ]} milestone="A working PyTorch environment and a personal tensor cheat sheet." />
      </Section>

      <Section id="w2" title="Week 2 — Neural Networks">
        <Week n={2} title="Neural Networks" goals={[
          "Day 1 — Neurons, weights, biases; draw an MLP.",
          "Day 2 — Activations: ReLU, GELU, sigmoid, softmax.",
          "Day 3 — Loss functions: MSE, cross-entropy.",
          "Day 4 — Training loop skeleton (forward, loss, backward, step).",
          "Day 5 — Train an MLP on the Iris dataset.",
          "Weekend — Refactor into a reusable train() function.",
        ]} exercises={[
          "Build a 2-layer MLP without nn.Sequential.",
          "Swap the activation and record accuracy changes.",
        ]} milestone="First trained classifier at ≥ 90% val accuracy on Iris." />
      </Section>

      <Section id="w3" title="Week 3 — CNN">
        <Week n={3} title="Convolutional Neural Networks" goals={[
          "Day 1 — Convolution intuition and shape math.",
          "Day 2 — Pooling, padding, stride.",
          "Day 3 — Build SmallCNN in PyTorch.",
          "Day 4 — Train on MNIST or FashionMNIST.",
          "Day 5 — Data augmentation with torchvision.transforms.",
          "Weekend — Log runs with MLflow; compare 3 configs.",
        ]} exercises={[
          "Compute the output shape of a Conv2d(3→16, k=5, s=2, p=2).",
          "Add BatchNorm and measure accuracy delta.",
        ]} milestone="Vision classifier with a training log and 3-run comparison." />
      </Section>

      <Section id="w4" title="Week 4 — RNN & LSTM">
        <Week n={4} title="Recurrent Networks" goals={[
          "Day 1 — Sequence data and hidden states.",
          "Day 2 — Vanishing gradients and why LSTMs help.",
          "Day 3 — LSTM gates walkthrough.",
          "Day 4 — Build a character-level name classifier.",
          "Day 5 — Try bidirectional LSTM.",
          "Weekend — Compare against a small Transformer.",
        ]} exercises={[
          "Implement a sequence classifier for movie ratings length buckets.",
          "Explain why gradient clipping matters for RNNs.",
        ]} milestone="Working sequence model with metrics logged." />
      </Section>

      <Section id="w5" title="Week 5 — Transformers">
        <Week n={5} title="Transformers" goals={[
          "Day 1 — Read the attention paper summary.",
          "Day 2 — Scaled dot-product attention by hand.",
          "Day 3 — Multi-head attention in code.",
          "Day 4 — Full encoder block from nn.TransformerEncoderLayer.",
          "Day 5 — Use Hugging Face for a pretrained encoder.",
          "Weekend — Write a 1-page explainer for a peer.",
        ]} exercises={[
          "Implement single-head attention without nn.MultiheadAttention.",
          "Explain positional encodings in your own words.",
        ]} milestone="Transformer explainer document + working attention module." />
      </Section>

      <Section id="w6" title="Week 6 — Computer Vision">
        <Week n={6} title="Computer Vision" goals={[
          "Day 1 — Transfer learning theory.",
          "Day 2 — Fine-tune ResNet on your own image folder.",
          "Day 3 — Segmentation with a UNet backbone.",
          "Day 4 — Object detection overview (YOLO/DETR).",
          "Day 5 — Evaluate with per-class metrics.",
          "Weekend — Write up findings with confusion matrix.",
        ]} exercises={[
          "Curate a mini dataset of 5 classes with 200 images each.",
          "Report top-1 and per-class recall.",
        ]} milestone="Fine-tuned vision model with a per-class report." />
      </Section>

      <Section id="w7" title="Week 7 — NLP">
        <Week n={7} title="Natural Language Processing" goals={[
          "Day 1 — Tokenisation (BPE, WordPiece).",
          "Day 2 — Fine-tune DistilBERT for sentiment.",
          "Day 3 — Text generation with a small causal LM.",
          "Day 4 — Prompt engineering fundamentals.",
          "Day 5 — Evaluation with F1 and confusion matrix.",
          "Weekend — Deploy a demo with Gradio or Streamlit.",
        ]} exercises={[
          "Compare pretrained vs from-scratch tokenisers on a small corpus.",
          "Publish a demo link.",
        ]} milestone="Deployed NLP demo shareable via public URL." />
      </Section>

      <Section id="w8" title="Week 8 — Final Project">
        <Week n={8} title="Final Project" goals={[
          "Day 1 — Pick a real dataset and write the brief.",
          "Day 2 — Baseline model.",
          "Day 3 — Iteration + augmentation.",
          "Day 4 — Evaluation, error analysis.",
          "Day 5 — Deploy behind a simple API.",
          "Weekend — Model card, README, 3-min video.",
        ]} exercises={[
          "Version the model with MLflow.",
          "Publish the project on GitHub.",
        ]} milestone="Public capstone with demo, README, model card, and video." />
        <Figure src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1400&q=80" caption="Figure 2 — Weekly cadence: theory → coding drill → mini deliverable → reflection." />
      </Section>

      <Section id="career" title="10. Career Roadmap">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Month 3</strong> — Two portfolio projects; contribute to one open-source DL repo.</li>
          <li><strong>Month 4</strong> — Kaggle competition entry, blog post per project.</li>
          <li><strong>Month 5</strong> — Applied ML internships or entry roles.</li>
          <li><strong>Month 6+</strong> — Specialise: CV, NLP, MLOps, or research.</li>
        </ul>
      </Section>

      <Section id="review" title="Step-by-Step Review">
        <h3 className="font-semibold">Weekly progress tracker</h3>
        <p>Log completion date, hours spent, and one thing learned. Retry weeks where you scored below 3/5.</p>
        <h3 className="mt-3 font-semibold">Learning milestones</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Week 2 — first trained classifier.</li>
          <li>Week 3 — first vision model.</li>
          <li>Week 5 — first transformer module coded by hand.</li>
          <li>Week 7 — first deployed demo.</li>
          <li>Week 8 — capstone shipped.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Final checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>GitHub profile with at least 3 DL repositories.</li>
          <li>One deployed demo with a public URL.</li>
          <li>One blog post explaining a project.</li>
          <li>Résumé listing 3 measurable outcomes.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Next learning path</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Go deep on MLOps and monitoring.</li>
          <li>Or specialise in generative models / LLM fine-tuning.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Consistency &gt; intensity — 8 hours a week beats one heroic weekend.</li>
          <li>Ship a small thing every week.</li>
          <li>Reflection compounds — write a note per week.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="What if I fall behind a week?">Extend by a week rather than skipping. Retention is more important than schedule.</FAQItem>
        <FAQItem q="Do I need a GPU by week 6?">Recommended, but Colab or Kaggle notebooks are fine.</FAQItem>
        <FAQItem q="Which project should I pick for Week 8?">Something you personally care about — you will iterate harder on it.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Milestone</strong> — a concrete deliverable per week.</li>
          <li><strong>Retrospective</strong> — short weekly reflection on what worked.</li>
          <li><strong>Portfolio</strong> — public, browsable evidence of your work.</li>
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
