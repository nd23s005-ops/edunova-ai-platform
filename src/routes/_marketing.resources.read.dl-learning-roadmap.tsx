import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-learning-roadmap",
  title: "Deep Learning — Learning Roadmap",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 8,
  lastUpdated: "January 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "A visual, week-by-week roadmap from Python fundamentals to production deep learning. Milestones, projects, certifications, and portfolio goals for AI engineering careers.",
};

const TOC: TocItem[] = [
  { id: "prerequisites", label: "1. Prerequisites" },
  { id: "python", label: "2. Python Fundamentals" },
  { id: "math", label: "3. Mathematics for DL" },
  { id: "nn", label: "4. Neural Networks" },
  { id: "cv", label: "5. Computer Vision" },
  { id: "nlp", label: "6. Natural Language Processing" },
  { id: "transformers", label: "7. Transformers & Foundation Models" },
  { id: "pytorch", label: "8. PyTorch Mastery" },
  { id: "mlops", label: "9. Deployment & MLOps" },
  { id: "career", label: "10. Career Preparation" },
  { id: "review", label: "Roadmap Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Frequently Asked Questions", tag: "AI & Data", time: "10 min" },
  { title: "Deep Learning — Tips & Tricks", tag: "AI & Data", time: "8 min" },
  { title: "Deep Learning — Reference Guide", tag: "AI & Data", time: "38 min" },
];

const STAGES: Array<{
  weeks: string;
  stage: string;
  focus: string;
  skills: string[];
  project: string;
}> = [
  { weeks: "Weeks 1–2", stage: "Prerequisites", focus: "Python + numpy + git", skills: ["Python syntax", "NumPy arrays", "Git basics", "Jupyter workflow"], project: "Notebook of 20 numpy warm-ups pushed to GitHub." },
  { weeks: "Weeks 3–4", stage: "Math for DL", focus: "Linear algebra + calculus intuition", skills: ["Vectors, matrices, SVD", "Derivatives, chain rule", "Probability basics"], project: "Notebook visualising gradient descent on a 2D loss surface." },
  { weeks: "Weeks 5–7", stage: "Neural Networks", focus: "MLPs from scratch, then in PyTorch", skills: ["Forward + backward pass", "Activations, losses, optimisers", "Autograd"], project: "MNIST classifier in raw PyTorch." },
  { weeks: "Weeks 8–10", stage: "Computer Vision", focus: "CNNs, augmentation, transfer learning", skills: ["Conv, pool, BN", "ResNet fine-tuning", "torchvision"], project: "Fine-tuned image classifier on a custom dataset." },
  { weeks: "Weeks 11–13", stage: "NLP", focus: "Tokenisation → embeddings → transformers", skills: ["Word embeddings", "Attention basics", "HuggingFace pipelines"], project: "Text-classification fine-tune of a small transformer." },
  { weeks: "Weeks 14–16", stage: "Transformers & Foundation Models", focus: "Modern LLMs, PEFT", skills: ["Encoder/decoder", "LoRA/QLoRA", "Prompting + evaluation"], project: "LoRA fine-tune of an open LLM on a task dataset." },
  { weeks: "Weeks 17–18", stage: "PyTorch Mastery", focus: "Distributed + precision", skills: ["DDP / FSDP", "Mixed precision", "torch.compile"], project: "Multi-GPU training run with FSDP." },
  { weeks: "Weeks 19–20", stage: "Deployment & MLOps", focus: "Serving + monitoring", skills: ["ONNX, TorchServe, Triton", "Feature/metric monitoring", "CI/CD for models"], project: "Deployed model with drift dashboard." },
  { weeks: "Weeks 21–24", stage: "Career Preparation", focus: "Portfolio + interviews", skills: ["3 flagship projects", "Interview rehearsal", "System design for ML"], project: "Public portfolio site + LinkedIn write-ups." },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-learning-roadmap")({
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
  component: DLRoadmapPage,
});

function DLRoadmapPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="prerequisites" title="1. Prerequisites">
        <Callout tone="info" icon={<Compass className="h-5 w-5" />} title="Before you start">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Comfortable with high-school math (algebra, functions).</li>
            <li>Basic terminal + git literacy.</li>
            <li>Willing to commit ~8 hours/week for 6 months.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — 24-week roadmap: prerequisites → fundamentals → domains → mastery → career." />
      </Section>

      <Section id="review" title="Visual Roadmap (24-week timeline)">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-3 text-left">Weeks</th>
                <th className="p-3 text-left">Stage</th>
                <th className="p-3 text-left">Focus</th>
                <th className="p-3 text-left">Milestone project</th>
              </tr>
            </thead>
            <tbody>
              {STAGES.map((s) => (
                <tr key={s.stage} className="border-t">
                  <td className="p-3 font-mono">{s.weeks}</td>
                  <td className="p-3 font-semibold">{s.stage}</td>
                  <td className="p-3">{s.focus}</td>
                  <td className="p-3 text-muted-foreground">{s.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="python" title="2. Python Fundamentals">
        <ul className="list-disc space-y-1 pl-5">
          <li>Data types, control flow, functions, comprehensions.</li>
          <li>Numpy: arrays, broadcasting, vectorised ops.</li>
          <li>Env hygiene — venv / conda + <code>pip install -r requirements.txt</code>.</li>
          <li>Notebook + script workflows; git commits per experiment.</li>
        </ul>
      </Section>

      <Section id="math" title="3. Mathematics for Deep Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vectors, matrices, dot products, matrix multiplication.</li>
          <li>Derivatives, partial derivatives, chain rule.</li>
          <li>Probability: distributions, expectation, entropy, KL divergence.</li>
          <li>Just enough optimisation intuition — gradients point uphill.</li>
        </ul>
      </Section>

      <Section id="nn" title="4. Neural Networks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Perceptron → MLP → forward &amp; backward pass by hand once.</li>
          <li>Activations, losses, optimisers vocabulary.</li>
          <li>PyTorch basics — tensors, autograd, <code>nn.Module</code>.</li>
          <li>Train a baseline MLP on MNIST before touching CNNs.</li>
        </ul>
      </Section>

      <Section id="cv" title="5. Computer Vision">
        <ul className="list-disc space-y-1 pl-5">
          <li>Convolution, pooling, receptive fields.</li>
          <li>Augmentation: flip, crop, colour jitter, mixup, cutmix.</li>
          <li>Fine-tuning a ResNet / ConvNeXt on a custom dataset.</li>
          <li>Segmentation &amp; detection heads for higher-level tasks.</li>
        </ul>
      </Section>

      <Section id="nlp" title="6. Natural Language Processing">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tokenisation, embeddings, positional encoding.</li>
          <li>Sequence models: RNN → LSTM → transformer.</li>
          <li>HuggingFace Transformers for fine-tuning classifiers.</li>
        </ul>
      </Section>

      <Section id="transformers" title="7. Transformers & Foundation Models">
        <ul className="list-disc space-y-1 pl-5">
          <li>Encoder, decoder, encoder-decoder patterns.</li>
          <li>PEFT (LoRA/QLoRA) for cheap adaptation of large models.</li>
          <li>Retrieval-augmented generation, evaluation, and safety.</li>
        </ul>
      </Section>

      <Section id="pytorch" title="8. PyTorch Mastery">
        <ul className="list-disc space-y-1 pl-5">
          <li>Distributed: DDP → FSDP / ZeRO for large models.</li>
          <li>Mixed precision (bf16), gradient accumulation, checkpointing.</li>
          <li><code>torch.compile</code>, profiler-driven optimisation.</li>
        </ul>
      </Section>

      <Section id="mlops" title="9. Deployment & MLOps">
        <ul className="list-disc space-y-1 pl-5">
          <li>Export: TorchScript, ONNX, TensorRT.</li>
          <li>Serve: Triton, TorchServe, BentoML, vLLM (LLMs).</li>
          <li>Observe: latency, drift, quality, per-cohort dashboards.</li>
          <li>CI/CD for models — reproducible builds, canary rollouts.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 2 — Deep learning lifecycle: data → train → evaluate → deploy → monitor → iterate." />
      </Section>

      <Section id="career" title="10. Career Preparation">
        <h3 className="font-semibold">Portfolio goals</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Three flagship projects: CV, NLP/LLM, and an end-to-end deployed demo.</li>
          <li>Public write-ups explaining trade-offs — not just code.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Certifications</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>DeepLearning.AI Specializations (Coursera).</li>
          <li>NVIDIA DLI courses.</li>
          <li>fast.ai Practical Deep Learning.</li>
          <li>Cloud ML certifications (AWS/GCP/Azure) when relevant.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Interview preparation</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Backprop, regularisation, attention, evaluation, deployment.</li>
          <li>ML system design — data, feature store, training, serving, monitoring.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Readiness checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can debug a training loop with <code>NaN</code> loss end-to-end.</li>
          <li>Can fine-tune a pretrained model on new data in under a day.</li>
          <li>Can ship a model to a simple API with a monitored SLO.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow the sequence — math + Python before frameworks, fundamentals before transformers.</li>
          <li>Ship one project per stage; retrospectives beat passive tutorials.</li>
          <li>Deployment is a first-class skill, not an afterthought.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How strict is the timeline?">Suggestive, not sacred. Slow down where you're weak; skip topics you already know cold.</FAQItem>
        <FAQItem q="Can I skip classical ML?">Only briefly. Understanding regression / trees keeps interviews and baselines honest.</FAQItem>
        <FAQItem q="What if I only have a laptop?">Fine — do the first 12 weeks locally, then rent a Colab / cloud GPU for larger runs.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Milestone</strong> — completion criterion for a stage.</li>
          <li><strong>PEFT</strong> — Parameter-Efficient Fine-Tuning.</li>
          <li><strong>MLOps</strong> — engineering practice around production ML.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation,
          academic publications, research papers, industry standards, and trusted educational resources. Deep learning
          technologies, frameworks, APIs, and best practices evolve continuously — consult the latest official
          documentation and current course syllabi before making career decisions. All trademarks, logos, product names,
          and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
