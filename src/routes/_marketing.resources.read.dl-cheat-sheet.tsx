import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-cheat-sheet",
  title: "Deep Learning — Cheat Sheet",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "4 min",
  pages: 4,
  lastUpdated: "September 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle:
    "A compact, printable Deep Learning cheat sheet — essential formulas, PyTorch syntax, architecture comparisons, workflow, and debugging tips packed onto four pages.",
};

const TOC: TocItem[] = [
  { id: "s1", label: "1. Neural Network Essentials" },
  { id: "s2", label: "2. PyTorch Syntax" },
  { id: "s3", label: "3. Activation Functions" },
  { id: "s4", label: "4. Loss Functions" },
  { id: "s5", label: "5. Optimizers" },
  { id: "s6", label: "6. CNN vs Transformer" },
  { id: "s7", label: "7. Training Workflow" },
  { id: "s8", label: "8. Evaluation Metrics" },
  { id: "s9", label: "9. Debugging Tips" },
  { id: "s10", label: "10. Quick Commands" },
  { id: "review", label: "Cheat Sheet Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — PDF Notes", tag: "AI & Data", time: "69 min" },
  { title: "Deep Learning — Quick Revision Notes", tag: "AI & Data", time: "12 min" },
  { title: "Deep Learning — Tips & Tricks", tag: "AI & Data", time: "14 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-cheat-sheet")({
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
  component: DLCheatSheetPage,
});

function DLCheatSheetPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="s1" title="1. Neural Network Essentials">
        <ul className="list-disc space-y-1 pl-5">
          <li>y = Wx + b; params = in·out + out.</li>
          <li>Init: Kaiming (ReLU), Xavier (tanh).</li>
          <li>Conv out = ⌊(in + 2p − k)/s⌋ + 1.</li>
          <li>Attention = softmax(QKᵀ/√dₖ)V.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Fig — Neural net + transformer at a glance." />
      </Section>

      <Section id="s2" title="2. PyTorch Syntax">
        <Code>{`import torch, torch.nn as nn
model = nn.Sequential(nn.Linear(784,256), nn.ReLU(), nn.Linear(256,10))
optim  = torch.optim.AdamW(model.parameters(), lr=3e-4)
crit   = nn.CrossEntropyLoss()
loader = torch.utils.data.DataLoader(ds, batch_size=64, shuffle=True)
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)`}</Code>
      </Section>

      <Section id="s3" title="3. Activation Functions">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Fn</th><th className="p-2 text-left">API</th><th className="p-2 text-left">Use</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">ReLU</td><td className="p-2">nn.ReLU</td><td className="p-2">Hidden default</td></tr>
            <tr className="border-b"><td className="p-2">GELU</td><td className="p-2">nn.GELU</td><td className="p-2">Transformers</td></tr>
            <tr className="border-b"><td className="p-2">Sigmoid</td><td className="p-2">nn.Sigmoid</td><td className="p-2">Binary output</td></tr>
            <tr><td className="p-2">Softmax</td><td className="p-2">nn.Softmax(dim=-1)</td><td className="p-2">Multi-class output</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s4" title="4. Loss Functions">
        <ul className="list-disc space-y-1 pl-5">
          <li>Classification → nn.CrossEntropyLoss (logits in).</li>
          <li>Binary → nn.BCEWithLogitsLoss.</li>
          <li>Regression → nn.MSELoss / nn.L1Loss / nn.SmoothL1Loss.</li>
          <li>Contrastive → nn.TripletMarginLoss.</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Optimizers">
        <ul className="list-disc space-y-1 pl-5">
          <li>SGD(momentum=0.9) — baseline.</li>
          <li>AdamW(lr=3e-4, weight_decay=1e-2) — default.</li>
          <li>Scheduler: CosineAnnealingLR + LinearWarmup.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. CNN vs Transformer">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Aspect</th><th className="p-2 text-left">CNN</th><th className="p-2 text-left">Transformer</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Inductive bias</td><td className="p-2">Locality</td><td className="p-2">Global attention</td></tr>
            <tr className="border-b"><td className="p-2">Complexity</td><td className="p-2">O(n)</td><td className="p-2">O(n²)</td></tr>
            <tr className="border-b"><td className="p-2">Data need</td><td className="p-2">Medium</td><td className="p-2">High</td></tr>
            <tr><td className="p-2">Best on</td><td className="p-2">Small vision</td><td className="p-2">Sequence + large data</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s7" title="7. Training Workflow">
        <Code>{`for x, y in loader:
    x, y = x.to(device), y.to(device)
    optim.zero_grad(set_to_none=True)
    with torch.autocast(device_type=device, dtype=torch.float16):
        loss = crit(model(x), y)
    scaler.scale(loss).backward()
    scaler.unscale_(optim); torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(optim); scaler.update()`}</Code>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Fig — One-glance training pipeline." />
      </Section>

      <Section id="s8" title="8. Evaluation Metrics">
        <ul className="list-disc space-y-1 pl-5">
          <li>Classification: Acc, F1, AUROC, ECE.</li>
          <li>Detection: mAP@0.5, mAP@[.5:.95].</li>
          <li>Segmentation: IoU, Dice.</li>
          <li>NLP: BLEU, ROUGE, BERTScore.</li>
        </ul>
      </Section>

      <Section id="s9" title="9. Debugging Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Overfit a batch of 8 samples.</li>
          <li>Print param + grad norms per layer.</li>
          <li>Check DataLoader for label leakage.</li>
          <li>Assert tensor shapes at layer boundaries.</li>
        </ul>
      </Section>

      <Section id="s10" title="10. Quick Commands">
        <Code>{`nvidia-smi                          # GPU status
torch.cuda.empty_cache()            # release cached memory
torch.save(model.state_dict(), "m") # save weights
model.load_state_dict(torch.load("m"))
torch.compile(model)                # PT 2.x speedup`}</Code>
      </Section>

      <Section id="review" title="Cheat Sheet Review">
        <h3 className="font-semibold">One-Page Summary</h3>
        <p>Data → Model → Loss → Backprop → Optimiser → Validate → Save best.</p>
        <h3 className="mt-3 font-semibold">Top Commands</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><code>optim.zero_grad(set_to_none=True)</code></li>
          <li><code>loss.backward()</code></li>
          <li><code>torch.no_grad()</code> for eval</li>
          <li><code>torch.compile(model)</code></li>
        </ul>
        <h3 className="mt-3 font-semibold">Quick Lookup Tables</h3>
        <p>Activations (§3), Losses (§4), CNN vs Transformer (§6), Metrics (§8).</p>
        <h3 className="mt-3 font-semibold">Fast Revision Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Correct loss for task?</li>
          <li>LR schedule + warmup set?</li>
          <li>Grad clipping enabled?</li>
          <li>Best checkpoint saved by val metric?</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I print this?">Yes — the layout is designed for 4 A4 pages.</FAQItem>
        <FAQItem q="Is this enough to learn DL?">No — pair it with the PDF Notes for depth.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>AMP</strong> — Automatic Mixed Precision.</li>
          <li><strong>LR</strong> — Learning rate.</li>
          <li><strong>ECE</strong> — Expected calibration error.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, and industry standards.
          Deep learning frameworks, APIs, and best practices evolve — always consult the latest
          official documentation for authoritative guidance. All trademarks, logos, and
          intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
