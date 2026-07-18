import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-tips-tricks",
  title: "Deep Learning — Tips & Tricks",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 15,
  lastUpdated: "April 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "Practical productivity tips for deep learning engineers — PyTorch shortcuts, GPU optimisation, debugging strategies, hyperparameter tuning, deployment tricks, and daily workflow habits that compound.",
};

const TOC: TocItem[] = [
  { id: "productivity", label: "1. Productivity Tips" },
  { id: "pytorch", label: "2. PyTorch Shortcuts" },
  { id: "data", label: "3. Data Pipeline Tricks" },
  { id: "gpu", label: "4. GPU Optimization" },
  { id: "training", label: "5. Model Training Tips" },
  { id: "hpo", label: "6. Hyperparameter Tuning" },
  { id: "debug", label: "7. Debugging Techniques" },
  { id: "deploy", label: "8. Deployment Tips" },
  { id: "perf", label: "9. Performance Optimization" },
  { id: "workflow", label: "10. Daily Workflow" },
  { id: "review", label: "Tips Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Frequently Asked Questions", tag: "AI & Data", time: "10 min" },
  { title: "Deep Learning — Learning Roadmap", tag: "AI & Data", time: "8 min" },
  { title: "Deep Learning — Reference Guide", tag: "AI & Data", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-tips-tricks")({
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
  component: DLTipsPage,
});

function Tip({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-primary/10 text-center text-xs font-semibold leading-6 text-primary">{n}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function DLTipsPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="productivity" title="1. Productivity Tips">
        <Callout tone="success" icon={<Sparkles className="h-5 w-5" />} title="Compound gains">
          <p className="mt-1">Small daily habits — deterministic seeds, tidy configs, disciplined logging — compound into weeks of saved time.</p>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — DL productivity flywheel: template repo → configs → logs → dashboards → decisions." />
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={1}>Start every project from a template repo — trainer, config, logger, and Makefile ready.</Tip>
          <Tip n={2}>Set global seeds for <code>random</code>, <code>numpy</code>, and <code>torch</code> — reproducibility is a feature.</Tip>
          <Tip n={3}>Drive every experiment through a YAML/JSON config; never hardcode hyperparameters in scripts.</Tip>
          <Tip n={4}>Version datasets with hashes — a silent data change ruins reproducibility.</Tip>
          <Tip n={5}>Log LR, loss, grad-norm, throughput, GPU memory for every run.</Tip>
          <Tip n={6}>Keep experiments in a single tracker (WandB / MLflow) — never in spreadsheets.</Tip>
        </div>
      </Section>

      <Section id="pytorch" title="2. PyTorch Shortcuts">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={7}><code>opt.zero_grad(set_to_none=True)</code> is faster and cleaner than zeroing gradients.</Tip>
          <Tip n={8}>Move tensors with <code>non_blocking=True</code> and enable <code>pin_memory=True</code> on the loader.</Tip>
          <Tip n={9}>Use <code>torch.no_grad()</code> or <code>torch.inference_mode()</code> for eval and inference.</Tip>
          <Tip n={10}>Prefer <code>F.cross_entropy(logits, y)</code> over softmax + NLL — numerically stable.</Tip>
          <Tip n={11}>Save <em>and</em> load with <code>state_dict</code>, not the whole module — resilient to code changes.</Tip>
          <Tip n={12}>Use <code>torch.compile</code> in training for automatic kernel fusion.</Tip>
        </div>
        <Code>{`# Fast reset + non-blocking transfer + inference mode
opt.zero_grad(set_to_none=True)
x = x.cuda(non_blocking=True)
with torch.inference_mode():
    preds = model(x)`}</Code>
      </Section>

      <Section id="data" title="3. Data Pipeline Tricks">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={13}>Tune <code>num_workers</code> to CPU cores; enable <code>persistent_workers=True</code>.</Tip>
          <Tip n={14}>Prefetch with <code>prefetch_factor=4</code> for I/O-bound datasets.</Tip>
          <Tip n={15}>Cache decoded samples to <code>/tmp</code> or memory once — decode is often the bottleneck.</Tip>
          <Tip n={16}>Use webdataset / TFDS for streaming huge datasets from object storage.</Tip>
          <Tip n={17}>Bucket sequences by length for transformer training — less padding, faster steps.</Tip>
          <Tip n={18}>Validate schemas at loader creation — fail fast on missing columns / shapes.</Tip>
        </div>
      </Section>

      <Section id="gpu" title="4. GPU Optimization">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={19}>Prefer bf16 on Ampere+ / Hopper — no GradScaler complexity, same throughput.</Tip>
          <Tip n={20}>Enable <code>torch.backends.cudnn.benchmark = True</code> for fixed-shape workloads.</Tip>
          <Tip n={21}>Use <code>channels_last</code> memory format for CNNs on modern GPUs.</Tip>
          <Tip n={22}>Activation checkpointing trades compute for memory — enable when OOM.</Tip>
          <Tip n={23}>Overlap comm with compute using async all-reduce hooks in DDP.</Tip>
          <Tip n={24}>Monitor GPU utilisation with <code>nvidia-smi dmon</code> — low utilisation means data-bound.</Tip>
        </div>
      </Section>

      <Section id="training" title="5. Model Training Tips">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={25}>Always warm up the LR for large models — start at 0, ramp over 1–5% of steps.</Tip>
          <Tip n={26}>Clip gradient norm to 1.0 by default — silent stabiliser.</Tip>
          <Tip n={27}>Use EMA of weights for smoother eval curves at inference.</Tip>
          <Tip n={28}>Save the best checkpoint by validation, not by training step.</Tip>
          <Tip n={29}>Snapshot optimiser + scheduler state — mandatory for resume.</Tip>
          <Tip n={30}>Train on a tiny subset first — a working pipeline before scaling.</Tip>
        </div>
      </Section>

      <Section id="hpo" title="6. Hyperparameter Tuning">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={31}>Use Optuna / Ray Tune with ASHA — kill bad trials early.</Tip>
          <Tip n={32}>Search LR first, then batch size, then regularisation — don't co-tune everything.</Tip>
          <Tip n={33}>Log-uniform sampling for LR / weight decay; uniform for dropout.</Tip>
          <Tip n={34}>Fix the seed for HPO runs — otherwise noise looks like signal.</Tip>
          <Tip n={35}>Cap search budgets — HPO obeys diminishing returns fast.</Tip>
        </div>
      </Section>

      <Section id="debug" title="7. Debugging Techniques">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={36}>Overfit one batch — if the model can't, the code is broken, not the model.</Tip>
          <Tip n={37}>Check <code>loss.item()</code> for NaN every step early on; add asserts on shapes.</Tip>
          <Tip n={38}>Log the first 20 gradient norms — spot dead / exploding layers.</Tip>
          <Tip n={39}>Visualise a batch of augmented data — half the "model" bugs live here.</Tip>
          <Tip n={40}>Use <code>torch.autograd.set_detect_anomaly(True)</code> to trace NaNs (dev only, it's slow).</Tip>
          <Tip n={41}>Diff two runs at the config level — never trust memory.</Tip>
        </div>
      </Section>

      <Section id="deploy" title="8. Deployment Tips">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={42}>Freeze model shapes early — dynamic shapes hurt compile &amp; ONNX export.</Tip>
          <Tip n={43}>Quantise to INT8 first, then decide if QAT is worth it.</Tip>
          <Tip n={44}>Warm up the serving process — first inference is always slow.</Tip>
          <Tip n={45}>Serve with concurrency limits — a hot GPU beats a queued one.</Tip>
          <Tip n={46}>Log request shape + latency percentiles, not just averages.</Tip>
        </div>
      </Section>

      <Section id="perf" title="9. Performance Optimization">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={47}>Profile before optimising — use <code>torch.profiler</code> or Nsight Systems.</Tip>
          <Tip n={48}>Fuse kernels — <code>torch.compile</code> does most of it for free.</Tip>
          <Tip n={49}>For LLMs, batch requests and reuse the KV-cache aggressively.</Tip>
          <Tip n={50}>Distil a large model to a small one for latency-critical paths.</Tip>
          <Tip n={51}>Move preprocessing off the hot path — cache tokenisation results.</Tip>
        </div>
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 2 — Optimisation targets: data pipeline, precision, kernels, memory, and serving concurrency." />
      </Section>

      <Section id="workflow" title="10. Daily Workflow Improvements">
        <div className="grid gap-3 md:grid-cols-2">
          <Tip n={52}>Start each day by reviewing yesterday's dashboards, not by writing code.</Tip>
          <Tip n={53}>Keep a single running lab notebook — decisions, deltas, next steps.</Tip>
          <Tip n={54}>Batch experiments — launch overnight, analyse in the morning.</Tip>
          <Tip n={55}>Prefer scripts over notebooks for anything that runs twice.</Tip>
          <Tip n={56}>End each week with a short retro — what saved time, what wasted it.</Tip>
        </div>
      </Section>

      <Section id="review" title="Tips Review">
        <h3 className="font-semibold">Top 50 tips</h3>
        <p>The numbered tips across sections 1–10 form the top-50 list. Keep it pinned near your editor.</p>
        <h3 className="mt-4 font-semibold">Productivity checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Seeds set. Config file. Experiment tracker connected.</li>
          <li>Mixed precision on. Grad clipping on. Best-checkpoint policy.</li>
          <li>Val metric drives selection, not training loss.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Daily workflow guide</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Morning: read dashboards, plan the day's experiments.</li>
          <li>Midday: launch runs, review last batch of results.</li>
          <li>Evening: log lessons, queue overnight jobs.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Quick reference sheet</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><code>set_to_none=True</code>, <code>non_blocking=True</code>, <code>pin_memory=True</code>.</li>
          <li>bf16 + grad clip + cosine LR schedule = safe defaults.</li>
          <li>Profile before optimising — always.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Great DL engineers optimise their workflow before their models.</li>
          <li>Data pipeline and precision decide most of your throughput.</li>
          <li>Measure first — every "optimisation" without a profile is a guess.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which tip has the highest ROI?">Overfitting one batch. It flushes out 80% of pipeline bugs in minutes.</FAQItem>
        <FAQItem q="Do these apply to TensorFlow too?">Most of them — swap <code>torch.compile</code> for <code>tf.function</code>, DDP for <code>MirroredStrategy</code>, etc.</FAQItem>
        <FAQItem q="How many experiments per day?">Fewer, better-logged runs beat many noisy ones. Aim for 3–5 tracked runs/day.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>EMA</strong> — Exponential Moving Average of weights.</li>
          <li><strong>ASHA</strong> — Asynchronous Successive Halving Algorithm for HPO.</li>
          <li><strong>KV-cache</strong> — cached keys/values for autoregressive decoding.</li>
          <li><strong>QAT</strong> — Quantisation-Aware Training.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from official documentation,
          academic publications, research papers, industry standards, and trusted educational resources. Deep learning
          technologies, frameworks, APIs, and best practices evolve continuously — consult the latest official
          documentation for authoritative guidance. All trademarks, logos, product names, and intellectual property
          belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
