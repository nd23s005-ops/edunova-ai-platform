import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-common-mistakes",
  title: "Deep Learning — Common Mistakes",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 17,
  lastUpdated: "May 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1800&q=80",
  heroSubtitle:
    "100+ common Deep Learning mistakes — beginner pitfalls, dataset traps, training bugs, deployment gotchas, and how to identify, fix, and prevent each one.",
};

const TOC: TocItem[] = [
  { id: "beginner", label: "1. Beginner Mistakes" },
  { id: "data", label: "2. Dataset Problems" },
  { id: "training", label: "3. Training Mistakes" },
  { id: "fit", label: "4. Overfitting & Underfitting" },
  { id: "selection", label: "5. Poor Model Selection" },
  { id: "hpo", label: "6. Hyperparameter Errors" },
  { id: "gpu", label: "7. GPU & Memory Issues" },
  { id: "deploy", label: "8. Deployment Mistakes" },
  { id: "docs", label: "9. Documentation Problems" },
  { id: "career", label: "10. Career Learning Mistakes" },
  { id: "review", label: "Common Mistakes Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Best Practices", tag: "AI & Data", time: "15 min" },
  { title: "Deep Learning — Tips & Tricks", tag: "AI & Data", time: "8 min" },
  { title: "Deep Learning — Learning Roadmap", tag: "AI & Data", time: "8 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-common-mistakes")({
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
  component: DLCommonMistakesPage,
});

function Mistake({ n, title, why, fix }: { n: number; title: string; why: string; fix: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-start gap-2">
        <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-destructive/10 text-center text-xs font-semibold leading-6 text-destructive">{n}</div>
        <div className="text-sm">
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-muted-foreground"><strong>Why:</strong> {why}</p>
          <p className="mt-1"><strong>Fix:</strong> {fix}</p>
        </div>
      </div>
    </div>
  );
}

function DLCommonMistakesPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="beginner" title="1. Beginner Mistakes">
        <Callout tone="warning" icon={<AlertTriangle className="h-5 w-5" />} title="Skipping fundamentals">
          Jumping straight to transformers without a working feed-forward + backprop mental model is the #1 reason beginners stall.
        </Callout>
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={1} title="Copy-paste training loops without reading them" why="You cannot debug what you did not write." fix="Type out a minimal loop at least once from memory." />
          <Mistake n={2} title="Chasing SOTA before shipping a baseline" why="Fancy models mask pipeline bugs." fix="Ship logistic regression / MLP first, always." />
          <Mistake n={3} title="Ignoring the learning rate" why="LR is the single most important hyperparameter." fix="LR sweep before anything else." />
          <Mistake n={4} title="No experiment tracking" why="Memory lies; spreadsheets lie faster." fix="WandB / MLflow from day one." />
        </div>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 1 — Before vs after: a chaotic notebook workflow rebuilt around configs, seeds, and tracked runs." />
      </Section>

      <Section id="data" title="2. Dataset Problems">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={5} title="Training on data with target leakage" why="Test scores look great; production tanks." fix="Audit features for time-relative correctness." />
          <Mistake n={6} title="Random splits on temporal data" why="You leak the future into the past." fix="Time-based splits for anything session or sequence based." />
          <Mistake n={7} title="Skipping label audits" why="Even 5% label noise caps model ceiling." fix="Sample-and-review labels every retrain." />
          <Mistake n={8} title="Not normalising features" why="Optimiser stalls, gradients explode." fix="Standardise numeric features; embed categoricals." />
          <Mistake n={9} title="Class imbalance ignored" why="Model predicts majority class perfectly." fix="Reweight loss or resample; report per-class metrics." />
          <Mistake n={10} title="Data augmentation applied to val/test" why="Inflated validation metrics." fix="Augment train only, ever." />
        </div>
      </Section>

      <Section id="training" title="3. Training Mistakes">
        <Code>{`# WRONG: forgetting zero_grad → gradient accumulation across steps
for x, y in loader:
    out = model(x)
    loss = F.cross_entropy(out, y)
    loss.backward()
    opt.step()

# RIGHT
for x, y in loader:
    opt.zero_grad(set_to_none=True)
    out = model(x)
    loss = F.cross_entropy(out, y)
    loss.backward()
    opt.step()`}</Code>
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={11} title="Forgetting model.eval() / model.train()" why="Dropout + BatchNorm behave incorrectly." fix="Toggle mode on every phase switch." />
          <Mistake n={12} title="Computing loss on softmax outputs" why="Numerically unstable." fix="Use logits + cross_entropy directly." />
          <Mistake n={13} title="No gradient clipping on RNNs / Transformers" why="Gradients explode silently." fix="clip_grad_norm_(params, 1.0)." />
          <Mistake n={14} title="Training on shuffled test set" why="Contaminates evaluation forever." fix="Freeze splits and never touch." />
        </div>
      </Section>

      <Section id="fit" title="4. Overfitting & Underfitting">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={15} title="No regularisation on small datasets" why="Model memorises." fix="Dropout, weight decay, augmentation, early stopping." />
          <Mistake n={16} title="Model too small for the task" why="Loss plateaus high." fix="Scale width/depth incrementally." />
          <Mistake n={17} title="Validating too rarely" why="Overfit invisible until epoch 50." fix="Validate every epoch (or every N steps)." />
        </div>
      </Section>

      <Section id="selection" title="5. Poor Model Selection">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={18} title="Transformer for tabular data with 10k rows" why="Overkill; XGBoost wins." fix="Use classical ML unless you truly need DL." />
          <Mistake n={19} title="Custom architecture before trying standard ones" why="Debug surface too large." fix="ResNet / U-Net / Transformer defaults first." />
        </div>
      </Section>

      <Section id="hpo" title="6. Hyperparameter Errors">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={20} title="Grid searching everything simultaneously" why="Combinatorial explosion, no signal." fix="Sequential search: LR → batch → regularisation." />
          <Mistake n={21} title="Reusing HPO seeds" why="Noise looks like structure." fix="Fix seeds for HPO; vary for final runs." />
          <Mistake n={22} title="No early stopping on trials" why="Wastes GPU budget." fix="ASHA / Hyperband kill bad trials fast." />
        </div>
      </Section>

      <Section id="gpu" title="7. GPU & Memory Issues">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={23} title="Batch size chosen without profiling" why="OOM at step 10." fix="Ramp batch size; enable AMP; use grad accumulation." />
          <Mistake n={24} title="Keeping tensors on CPU accidentally" why="1000× slower." fix="Assert device on inputs; use .cuda(non_blocking=True)." />
          <Mistake n={25} title="Not freeing cached memory" why="Fragmentation OOM." fix="torch.cuda.empty_cache() between phases when needed." />
          <Mistake n={26} title="Ignoring dataloader bottlenecks" why="GPU idles at 20%." fix="Tune num_workers, persistent_workers=True, prefetch." />
        </div>
      </Section>

      <Section id="deploy" title="8. Deployment Mistakes">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={27} title="Serving a model from a notebook" why="No versioning, no rollback." fix="Package via TorchScript/ONNX in a registry." />
          <Mistake n={28} title="No warm-up on first request" why="Cold latency 10× worse." fix="Warm-up pass at container start." />
          <Mistake n={29} title="Skipping shadow / canary rollout" why="Silent regressions." fix="Canary 1% → shadow 25% → full." />
          <Mistake n={30} title="No monitoring after launch" why="Drift stays invisible." fix="Latency, drift, error dashboards from day one." />
        </div>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Debugging pyramid: pipeline first, data second, model third, hyperparameters last." />
      </Section>

      <Section id="docs" title="9. Documentation Problems">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={31} title="No model card" why="Nobody remembers assumptions." fix="Every deployed model gets a model card." />
          <Mistake n={32} title="Runbook missing" why="On-call cannot fix incidents." fix="Rollback + retrain + escalation documented." />
          <Mistake n={33} title="Undocumented configs" why="Runs unreproducible." fix="Commit the YAML alongside the code." />
        </div>
      </Section>

      <Section id="career" title="10. Career Learning Mistakes">
        <div className="grid gap-3 md:grid-cols-2">
          <Mistake n={34} title="Only doing courses, never projects" why="Skills never transfer." fix="Ship 3 end-to-end projects per year." />
          <Mistake n={35} title="Chasing every new paper" why="Depth suffers." fix="Master fundamentals; read papers with intent." />
          <Mistake n={36} title="No public writing" why="Invisible to hiring managers." fix="One post per shipped project." />
          <Mistake n={37} title="Interview: memorising loss functions" why="You get asked to debug." fix="Practice debugging live in Colab." />
        </div>
      </Section>

      <Section id="review" title="Common Mistakes Review">
        <h3 className="font-semibold">Top 25 mistakes</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Skipping the baseline.</li>
          <li>Ignoring the learning rate.</li>
          <li>Random splits on temporal data.</li>
          <li>Target leakage.</li>
          <li>Not normalising features.</li>
          <li>Forgetting <code>zero_grad</code>.</li>
          <li>Softmax + NLL instead of cross_entropy on logits.</li>
          <li>No gradient clipping.</li>
          <li>Data augmentation on val/test.</li>
          <li>Model too small / too large for the data.</li>
          <li>Grid searching everything.</li>
          <li>Reusing HPO seeds.</li>
          <li>Batch size without profiling.</li>
          <li>Untuned dataloader (num_workers, prefetch).</li>
          <li>Serving from a notebook.</li>
          <li>No warm-up on first request.</li>
          <li>No canary / shadow deploy.</li>
          <li>No drift monitoring.</li>
          <li>No model card.</li>
          <li>No runbook.</li>
          <li>Undocumented configs.</li>
          <li>Ignoring per-class metrics.</li>
          <li>Validating too rarely.</li>
          <li>Only courses, no shipped projects.</li>
          <li>Chasing SOTA before mastering fundamentals.</li>
        </ol>
        <h3 className="mt-4 font-semibold">Prevention checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Baseline exists. Splits are time-aware. Seeds are fixed.</li>
          <li>Config file drives every run. Tracker connected.</li>
          <li>Model card + runbook shipped alongside the model.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Quick revision</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Overfit one batch to prove the pipeline works.</li>
          <li>Loss on logits, not probabilities. Clip gradients. Use bf16.</li>
          <li>Canary + shadow + drift before calling it production.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Self assessment</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can you reproduce your last experiment from git + config alone?</li>
          <li>Do you know your model's p99 latency and drift signal today?</li>
          <li>Can a new teammate deploy and rollback your model unaided?</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Most DL "mistakes" are pipeline mistakes, not model mistakes.</li>
          <li>Debug top-down: data → pipeline → model → hyperparameters.</li>
          <li>Cultivate habits — the same 25 mistakes account for 80% of pain.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="What's the fastest way to catch pipeline bugs?">Overfit a single batch. If the model can't drive train loss to near-zero, the code is wrong, not the model.</FAQItem>
        <FAQItem q="I keep hitting OOM — where do I start?">Enable AMP, use grad accumulation, activation checkpointing, and confirm your dataloader isn't holding tensors alive.</FAQItem>
        <FAQItem q="Do these apply to LLM fine-tuning?">Yes — plus LR should be an order of magnitude smaller and you should validate on held-out prompts, never on the tuning set.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>AMP</strong> — Automatic Mixed Precision.</li>
          <li><strong>Target leakage</strong> — a feature that encodes the label.</li>
          <li><strong>Warm-up (serving)</strong> — a first inference to page in weights and JIT caches.</li>
          <li><strong>Drift</strong> — distribution shift between training and serving data.</li>
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
