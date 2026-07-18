import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-quick-revision-notes",
  title: "Deep Learning — Quick Revision Notes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 10,
  lastUpdated: "March 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1800&q=80",
  heroSubtitle:
    "A highly condensed revision pack: one-line explanations, memory tricks, formula summaries, comparison tables, and interview-focused nuggets for last-minute review.",
};

const TOC: TocItem[] = [
  { id: "s1", label: "1. Core Concepts" },
  { id: "s2", label: "2. Neural Networks" },
  { id: "s3", label: "3. CNN" },
  { id: "s4", label: "4. RNN & LSTM" },
  { id: "s5", label: "5. Transformers" },
  { id: "s6", label: "6. PyTorch Essentials" },
  { id: "s7", label: "7. Important Formulas" },
  { id: "s8", label: "8. Common Interview Topics" },
  { id: "s9", label: "9. Quick Revision Tables" },
  { id: "s10", label: "10. Final Review" },
  { id: "review", label: "Revision Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — PDF Notes", tag: "AI & Data", time: "69 min" },
  { title: "Deep Learning — Cheat Sheet", tag: "AI & Data", time: "4 min" },
  { title: "Deep Learning — Interview Questions", tag: "AI & Data", time: "42 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-quick-revision-notes")({
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
  component: DLQuickRevPage,
});

function DLQuickRevPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="s1" title="1. Core Concepts">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Deep Learning</strong> — neural networks with ≥ 2 hidden layers.</li>
          <li><strong>Epoch</strong> — one full pass over the training data.</li>
          <li><strong>Batch</strong> — subset of data processed together.</li>
          <li><strong>Learning rate</strong> — step size for weight updates.</li>
          <li><strong>Overfitting</strong> — low train loss, high val loss.</li>
          <li><strong>Regularisation</strong> — dropout, weight decay, augmentation.</li>
          <li>Memory trick: <em>"Data → Model → Loss → Backprop → Update"</em>.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Fig — Learning pipeline mental model." />
      </Section>

      <Section id="s2" title="2. Neural Networks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Linear layer: y = Wx + b.</li>
          <li>Universal approximation with 1 hidden layer (in theory).</li>
          <li>Depth &gt; width for hierarchical features.</li>
          <li>Init: Kaiming for ReLU, Xavier for tanh/sigmoid.</li>
        </ul>
      </Section>

      <Section id="s3" title="3. CNN">
        <ul className="list-disc space-y-1 pl-5">
          <li>Kernel, stride, padding — output = ⌊(in + 2p − k)/s⌋ + 1.</li>
          <li>Pooling reduces spatial dims; BatchNorm stabilises training.</li>
          <li>Residual connections enable very deep nets.</li>
        </ul>
      </Section>

      <Section id="s4" title="4. RNN & LSTM">
        <ul className="list-disc space-y-1 pl-5">
          <li>RNNs share weights across time.</li>
          <li>LSTM: input, forget, output gates + cell state.</li>
          <li>GRU: update + reset gates (lighter).</li>
          <li>Clip gradients to prevent explosion.</li>
        </ul>
      </Section>

      <Section id="s5" title="5. Transformers">
        <ul className="list-disc space-y-1 pl-5">
          <li>Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V.</li>
          <li>Multi-head attention runs heads in parallel.</li>
          <li>Positional encoding injects order.</li>
          <li>Complexity O(n²) in sequence length.</li>
        </ul>
      </Section>

      <Section id="s6" title="6. PyTorch Essentials">
        <Code>{`# 5-line training loop
optim.zero_grad(set_to_none=True)
loss = criterion(model(x), y)
loss.backward()
optim.step()`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>nn.Module + forward().</li>
          <li>DataLoader for batching + shuffling.</li>
          <li>torch.no_grad() during evaluation.</li>
          <li>autocast() for mixed precision.</li>
        </ul>
      </Section>

      <Section id="s7" title="7. Important Formulas">
        <ul className="list-disc space-y-1 pl-5">
          <li>Softmax: exp(zᵢ)/Σexp(zⱼ).</li>
          <li>Cross-entropy: −Σyᵢ log(pᵢ).</li>
          <li>MSE: (1/N) Σ (ŷ − y)².</li>
          <li>Adam: m̂,v̂ bias-corrected; θ ← θ − η m̂ / (√v̂+ε).</li>
          <li>BatchNorm: (x−μ)/√(σ²+ε) · γ + β.</li>
        </ul>
      </Section>

      <Section id="s8" title="8. Common Interview Topics">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain backprop in 60 seconds.</li>
          <li>BatchNorm vs LayerNorm.</li>
          <li>Why residual connections work.</li>
          <li>Optimiser comparison (SGD/Adam/AdamW).</li>
          <li>Regularisation techniques.</li>
          <li>Fine-tuning vs feature extraction.</li>
        </ul>
      </Section>

      <Section id="s9" title="9. Quick Revision Tables">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Concept</th><th className="p-2 text-left">Use</th><th className="p-2 text-left">Watch out</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">ReLU</td><td className="p-2">Default hidden activation</td><td className="p-2">Dead neurons</td></tr>
            <tr className="border-b"><td className="p-2">Dropout</td><td className="p-2">Regularisation</td><td className="p-2">Turn off in eval</td></tr>
            <tr className="border-b"><td className="p-2">BatchNorm</td><td className="p-2">Stability</td><td className="p-2">Small batches</td></tr>
            <tr><td className="p-2">Adam</td><td className="p-2">Default optimiser</td><td className="p-2">Weight decay ≠ L2</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s10" title="10. Final Review">
        <ul className="list-disc space-y-1 pl-5">
          <li>Freeze seeds + splits before every experiment.</li>
          <li>Track a single validation metric.</li>
          <li>Save best checkpoint by val metric.</li>
          <li>Sanity-check by overfitting a small batch.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Fig — Track one metric; save best; sanity-overfit." />
      </Section>

      <Section id="review" title="Revision Review">
        <h3 className="font-semibold">Last-Minute Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you write the attention formula from memory?</li>
          <li>Can you name three regularisers?</li>
          <li>Can you explain backprop in one paragraph?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Top 100 Important Points (highlights)</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>DL learns features + predictions jointly.</li>
          <li>Depth composes features; width memorises.</li>
          <li>Kaiming init for ReLU.</li>
          <li>Zero grads every step.</li>
          <li>Clip gradients for RNNs.</li>
          <li>Use AdamW as default optimiser.</li>
          <li>Warmup + cosine schedule.</li>
          <li>Never tune on the test set.</li>
          <li>Overfit a small batch to sanity check.</li>
          <li>Save best checkpoint by val metric.</li>
          <li>… (91 more nuggets across all sections above)</li>
        </ol>
        <h3 className="mt-3 font-semibold">Quick Recall Sheet</h3>
        <p>Formulas + one-line intuition per concept in sections 1–9.</p>
        <h3 className="mt-3 font-semibold">Exam-Day Tips</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Sketch architectures before writing the answer.</li>
          <li>Show gradient flow in derivations.</li>
          <li>Cite loss + metric explicitly.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is 12 minutes enough to revise DL?">For a first-pass refresh yes. Pair with the PDF Notes for full coverage.</FAQItem>
        <FAQItem q="Best used before?">Interviews and exams — not as a first-time learning source.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>MHSA</strong> — Multi-head self-attention.</li>
          <li><strong>ECE</strong> — Expected calibration error.</li>
          <li><strong>MLM</strong> — Masked language modelling.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, and industry standards.
          Deep learning technologies evolve continuously — always consult the latest official
          documentation for authoritative guidance. All trademarks, logos, and intellectual
          property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
