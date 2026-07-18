import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-best-practices",
  title: "Deep Learning — Best Practices",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "15 min",
  pages: 12,
  lastUpdated: "August 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
  heroSubtitle:
    "Industry-standard Deep Learning practices — planning, dataset hygiene, model design, training discipline, GPU optimisation, deployment, monitoring, and MLOps.",
};

const TOC: TocItem[] = [
  { id: "planning", label: "1. Planning DL Projects" },
  { id: "dataset", label: "2. Dataset Best Practices" },
  { id: "design", label: "3. Model Design Principles" },
  { id: "training", label: "4. Training Best Practices" },
  { id: "hpo", label: "5. Hyperparameter Tuning" },
  { id: "gpu", label: "6. GPU Optimization" },
  { id: "eval", label: "7. Model Evaluation" },
  { id: "deploy", label: "8. Deployment Standards" },
  { id: "monitor", label: "9. Monitoring Models" },
  { id: "docs", label: "10. Documentation" },
  { id: "collab", label: "11. Collaboration" },
  { id: "ethics", label: "12. Security & Ethics" },
  { id: "improve", label: "13. Continuous Improvement" },
  { id: "review", label: "Best Practices Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Real-world Case Study", tag: "AI & Data", time: "17 min" },
  { title: "Deep Learning — Common Mistakes", tag: "AI & Data", time: "12 min" },
  { title: "Deep Learning — Advanced Concepts", tag: "AI & Data", time: "20 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-best-practices")({
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
  component: DLBestPracticesPage,
});

function Row({ do_, dont }: { do_: string; dont: string }) {
  return (
    <tr className="border-b">
      <td className="p-2 text-green-600 dark:text-green-400">✔ {do_}</td>
      <td className="p-2 text-red-600 dark:text-red-400">✘ {dont}</td>
    </tr>
  );
}

function DLBestPracticesPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="planning" title="1. Planning Deep Learning Projects">
        <Callout tone="info" icon={<CheckCircle2 className="h-5 w-5" />} title="Start with the decision, not the model">
          Define the decision the model will inform, its owner, the target metric, and the acceptance threshold before writing a single training script.
        </Callout>
        <ul className="list-disc space-y-1 pl-5">
          <li>Write a one-page PRD covering problem, users, success metric, and risks.</li>
          <li>Confirm a strong non-DL baseline exists — always compare against it.</li>
          <li>Timebox research spikes; separate them from delivery milestones.</li>
        </ul>
      </Section>

      <Section id="dataset" title="2. Dataset Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Version datasets with content hashes; snapshots for every training run.</li>
          <li>Enforce schema validation on ingest (Great Expectations, Pandera).</li>
          <li>Track label provenance and inter-annotator agreement.</li>
          <li>Hold out a frozen evaluation slice — never train on it, never tune on it.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 1 — Training pipeline: versioned data → validation → augmentation → loaders → trainer → registry." />
      </Section>

      <Section id="design" title="3. Model Design Principles">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer well-understood architectures (ResNet, Transformer, U-Net) before novelty.</li>
          <li>Keep initialisation, normalisation, and residual paths conventional.</li>
          <li>Design for observability — expose intermediate activations behind flags.</li>
          <li>Use composition over inheritance; single-responsibility modules.</li>
        </ul>
      </Section>

      <Section id="training" title="4. Training Best Practices">
        <Code>{`# Canonical PyTorch training step
opt.zero_grad(set_to_none=True)
with torch.autocast(device_type="cuda", dtype=torch.bfloat16):
    logits = model(x)
    loss = F.cross_entropy(logits, y)
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
opt.step()
scheduler.step()`}</Code>
        <ul className="list-disc space-y-1 pl-5">
          <li>Deterministic seeds, checkpoint optimiser + scheduler + RNG state.</li>
          <li>Log LR, loss, grad-norm, throughput, and GPU memory every step.</li>
          <li>Best-checkpoint policy driven by validation metric, not training loss.</li>
        </ul>
      </Section>

      <Section id="hpo" title="5. Hyperparameter Tuning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Search LR first, then batch size, then regularisation.</li>
          <li>Use Optuna / Ray Tune with early-stopping (ASHA/Hyperband).</li>
          <li>Cap budgets — HPO obeys diminishing returns quickly.</li>
        </ul>
      </Section>

      <Section id="gpu" title="6. GPU Optimization">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <code>bf16</code> on Ampere/Hopper — no GradScaler complexity.</li>
          <li>Enable <code>cudnn.benchmark=True</code> for fixed-shape workloads.</li>
          <li>Use <code>channels_last</code> for CNNs; activation checkpointing when OOM.</li>
          <li>Profile with <code>torch.profiler</code> before optimising.</li>
        </ul>
      </Section>

      <Section id="eval" title="7. Model Evaluation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Track task-appropriate metrics — not just accuracy.</li>
          <li>Report calibration, per-slice performance, and confidence intervals.</li>
          <li>Compare against baseline and previous champion under identical eval code.</li>
        </ul>
      </Section>

      <Section id="deploy" title="8. Deployment Standards">
        <ul className="list-disc space-y-1 pl-5">
          <li>Package with TorchScript / ONNX; pin runtime versions.</li>
          <li>Canary → shadow → full-rollout with automatic rollback.</li>
          <li>Enforce contract tests on request/response schemas.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Production DL lifecycle: registry → canary → shadow → full rollout → monitoring loop." />
      </Section>

      <Section id="monitor" title="9. Monitoring Models">
        <ul className="list-disc space-y-1 pl-5">
          <li>Latency percentiles, error rate, QPS, GPU utilisation, memory.</li>
          <li>Feature-drift PSI on top features; concept-drift checks on labels.</li>
          <li>Weekly counterfactual holdout to detect silent regressions.</li>
        </ul>
      </Section>

      <Section id="docs" title="10. Documentation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Model cards for every deployed model.</li>
          <li>Runbooks per service — on-call must be able to roll back at 3am.</li>
          <li>ADRs capturing architectural decisions and their trade-offs.</li>
        </ul>
      </Section>

      <Section id="collab" title="11. Collaboration">
        <ul className="list-disc space-y-1 pl-5">
          <li>Code review every training script and every deployment change.</li>
          <li>Shared experiment tracker (WandB / MLflow) — never spreadsheets.</li>
          <li>Weekly review of top and bottom experiments.</li>
        </ul>
      </Section>

      <Section id="ethics" title="12. Security & Ethics">
        <ul className="list-disc space-y-1 pl-5">
          <li>Never ship PII into training data without documented consent.</li>
          <li>Test for disparate impact across protected slices.</li>
          <li>Rate-limit and authenticate inference endpoints; log responsibly.</li>
        </ul>
      </Section>

      <Section id="improve" title="13. Continuous Improvement">
        <ul className="list-disc space-y-1 pl-5">
          <li>Retro every release; convert findings into checklist items.</li>
          <li>Automate the second time you do anything manually.</li>
          <li>Retire dead experiments and code paths quarterly.</li>
        </ul>
      </Section>

      <Section id="review" title="Best Practices Review">
        <h3 className="font-semibold">Professional checklist</h3>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b bg-muted/30"><th className="p-2 text-left">Do</th><th className="p-2 text-left">Don't</th></tr></thead>
          <tbody>
            <Row do_="Version data + code + config together" dont="Ship a run you can't reproduce" />
            <Row do_="Baseline before deep model" dont="Skip straight to a 12-layer transformer" />
            <Row do_="bf16 + grad clip + cosine LR" dont="Untuned Adam with default LR" />
            <Row do_="Canary + shadow deploy" dont="Big-bang production rollout" />
            <Row do_="Model card + runbook" dont="Tribal knowledge in Slack" />
          </tbody>
        </table>
        <h3 className="mt-4 font-semibold">Production readiness checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Health check, warm-up, latency budget verified.</li>
          <li>Rollback path tested end-to-end.</li>
          <li>Drift + performance dashboards live before launch.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Team collaboration guide</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>One source of truth for experiments.</li>
          <li>Blameless retros. Documented decisions.</li>
          <li>Rotating on-call with a maintained runbook.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Expert recommendations</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Simplicity compounds — every abstraction you add must justify itself.</li>
          <li>Data quality dwarfs architecture 9 times out of 10.</li>
          <li>Instrument the pipeline; measure before optimising.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Practices, not frameworks, decide who ships DL reliably.</li>
          <li>Reproducibility + observability = maintainable AI.</li>
          <li>Ethics and monitoring are launch requirements, not afterthoughts.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which practice has the highest ROI?">Versioned experiments + a frozen eval slice. Everything else compounds on top.</FAQItem>
        <FAQItem q="How much MLOps is enough for a small team?">Config + tracker + registry + one-click rollback. That's the minimum viable stack.</FAQItem>
        <FAQItem q="Should we always use bf16?">On Ampere/Hopper — yes for training. Verify numerical stability for exotic losses.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>ADR</strong> — Architecture Decision Record.</li>
          <li><strong>PSI</strong> — Population Stability Index (drift metric).</li>
          <li><strong>Model card</strong> — structured documentation of a model's intended use and limits.</li>
          <li><strong>Shadow deploy</strong> — mirror traffic to a new model without serving its responses.</li>
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
