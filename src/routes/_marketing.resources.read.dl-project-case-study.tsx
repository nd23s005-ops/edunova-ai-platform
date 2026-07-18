import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-project-case-study",
  title: "Deep Learning — Project Case Study",
  category: "AI & Data",
  difficulty: "Intermediate",
  readingTime: "28 min",
  pages: 28,
  lastUpdated: "February 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle:
    "A detailed production case study of PetalScan — a deep-learning botanical identification system deployed to 1.2M mobile users. Business context, architectural decisions, deployment strategy, monitoring, measurable outcomes, and lessons learned.",
};

const TOC: TocItem[] = [
  { id: "overview", label: "1. Project Overview" },
  { id: "background", label: "2. Business Background" },
  { id: "problem", label: "3. Problem Statement" },
  { id: "requirements", label: "4. Requirements Analysis" },
  { id: "architecture", label: "5. System Architecture" },
  { id: "dataset", label: "6. Dataset Preparation" },
  { id: "model", label: "7. Model Development" },
  { id: "pytorch", label: "8. PyTorch Implementation" },
  { id: "deployment", label: "9. Deployment Strategy" },
  { id: "monitoring", label: "10. Monitoring & Maintenance" },
  { id: "performance", label: "11. Performance Evaluation" },
  { id: "lessons", label: "12. Lessons Learned" },
  { id: "future", label: "13. Future Improvements" },
  { id: "review", label: "Case Study Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Project Guide", tag: "AI & Data", time: "24 min" },
  { title: "Deep Learning — Best Practices", tag: "AI & Data", time: "26 min" },
  { title: "Deep Learning — Real-world Case Study", tag: "AI & Data", time: "30 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-project-case-study")({
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
  component: DLProjectCaseStudyPage,
});

function DLProjectCaseStudyPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="overview" title="1. Project Overview">
        <p>
          <strong>PetalScan</strong> is a production deep-learning system that identifies 1,842 plant
          species from a single phone photo. Shipped in October 2025, it now serves <strong>1.2M
          monthly active users</strong> at a P95 latency of <strong>180 ms on-device</strong>. This
          case study documents the completed project — the trade-offs, the architecture, and the
          measured outcomes. It is not a tutorial.
        </p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="Learning objectives">
          Understand a full production DL system, analyse architectural decisions, evaluate
          engineering trade-offs, and study a real deployment across a 9-month lifecycle.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=80" caption="Figure 1 — PetalScan production architecture: on-device inference for the fast path with cloud fallback for uncertain predictions and telemetry aggregation." />
      </Section>

      <Section id="background" title="2. Business Background">
        <p>
          Verdant Field Guides operates two consumer apps in the outdoor recreation space. Existing
          plant identification relied on a legacy cloud classifier launched in 2021 with 62% top-1
          accuracy over 400 species. Support tickets citing misidentification averaged 380 per week
          and drove a 4% monthly churn among premium subscribers.
        </p>
        <p>
          The leadership team funded a nine-month programme with a target of <strong>90% top-1</strong>
          on the expanded 1,800-species taxonomy and <strong>on-device inference</strong> to reduce
          the cloud bill and improve field usability in low-connectivity areas.
        </p>
      </Section>

      <Section id="problem" title="3. Problem Statement">
        <p>
          <em>Given a single RGB photo captured by a consumer phone camera, predict the plant
          species so that a hobbyist can confidently identify what they see within one second in
          the field.</em>
        </p>
        <p>Success was defined as: top-1 accuracy ≥ 90% on the frozen test set, P95 on-device latency ≤ 200 ms on a mid-tier 2022 Android device, and a 30% reduction in weekly misidentification tickets.</p>
      </Section>

      <Section id="requirements" title="4. Requirements Analysis">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Category</th><th className="p-2 text-left">Requirement</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Accuracy</td><td className="p-2">Top-1 ≥ 90%, Top-5 ≥ 98%</td></tr>
            <tr className="border-b"><td className="p-2">Latency</td><td className="p-2">P95 ≤ 200 ms on-device</td></tr>
            <tr className="border-b"><td className="p-2">Model size</td><td className="p-2">≤ 25 MB compressed</td></tr>
            <tr className="border-b"><td className="p-2">Privacy</td><td className="p-2">No image leaves the device unless the user opts into cloud fallback</td></tr>
            <tr className="border-b"><td className="p-2">Coverage</td><td className="p-2">1,842 species across four continents</td></tr>
            <tr><td className="p-2">Compliance</td><td className="p-2">GDPR, App Store health &amp; safety review, botanical accuracy disclaimer</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="architecture" title="5. System Architecture">
        <p>
          The team chose a <strong>two-tier inference pattern</strong>. An on-device EfficientNet-Lite
          model handles the fast path. If the top-1 confidence falls below 0.72, the client offers
          the user a cloud fallback that runs a larger DINOv2-based model. Telemetry (predictions,
          confidence, feedback) streams to a data lake for weekly retraining candidates.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Mobile client — TorchScript int8 model, CoreML on iOS, NNAPI on Android.</li>
          <li>Cloud service — FastAPI + Triton Inference Server, autoscaled on GPU spot pool.</li>
          <li>Data platform — S3 + Iceberg, Airflow DAGs, MLflow registry.</li>
          <li>Feedback loop — user-confirmed labels feed a weekly candidate set reviewed by botanists.</li>
        </ul>
      </Section>

      <Section id="dataset" title="6. Dataset Preparation">
        <p>
          The training corpus combined <strong>1.4M images</strong> from three sources: iNaturalist
          Open (600k), PlantNet (350k), and Verdant&apos;s in-house field collection (450k, labelled by 12
          expert botanists). Class balance was enforced via weighted sampling; 63 rare species were
          upsampled 4×.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Duplicate detection with perceptual hashing removed 47k near-duplicates.</li>
          <li>Inter-annotator agreement measured on a 5,000-image gold set — Cohen&apos;s κ = 0.87.</li>
          <li>Splits frozen with a 70 / 15 / 15 stratified split, seed = 1729.</li>
          <li>Datasheet published internally and linked from the model card.</li>
        </ul>
      </Section>

      <Section id="model" title="7. Model Development">
        <p>
          Three candidates were benchmarked over eight weeks: MobileNetV3-Large, EfficientNet-Lite4,
          and a DINOv2-Small fine-tune. Decision matrix:
        </p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Model</th><th className="p-2 text-left">Top-1</th><th className="p-2 text-left">Size (int8)</th><th className="p-2 text-left">Android P95</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">MobileNetV3-L</td><td className="p-2">86.2%</td><td className="p-2">14 MB</td><td className="p-2">130 ms</td></tr>
            <tr className="border-b"><td className="p-2">EfficientNet-Lite4</td><td className="p-2">91.4%</td><td className="p-2">22 MB</td><td className="p-2">180 ms</td></tr>
            <tr><td className="p-2">DINOv2-Small (cloud)</td><td className="p-2">94.7%</td><td className="p-2">330 MB</td><td className="p-2">n/a</td></tr>
          </tbody>
        </table>
        <p>EfficientNet-Lite4 became the on-device model; DINOv2-Small became the confident-fallback cloud model. Both share the same taxonomy head to keep post-processing identical.</p>
      </Section>

      <Section id="pytorch" title="8. PyTorch Implementation">
        <p>Training used PyTorch 2.4 with bf16 mixed precision on 8× A100 GPUs. Excerpt from the fine-tuning script:</p>
        <Code>{`import torch, timm
from torch.optim import AdamW
from torch.optim.lr_scheduler import OneCycleLR

model = timm.create_model('tf_efficientnet_lite4', pretrained=True, num_classes=1842)
optim = AdamW(model.parameters(), lr=3e-4, weight_decay=1e-4)
sched = OneCycleLR(optim, max_lr=3e-4, total_steps=steps, pct_start=0.03)

for epoch in range(60):
    model.train()
    for x, y in loader:
        x, y = x.cuda(non_blocking=True), y.cuda(non_blocking=True)
        with torch.autocast(device_type='cuda', dtype=torch.bfloat16):
            logits = model(x)
            loss = torch.nn.functional.cross_entropy(logits, y, label_smoothing=0.1)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optim.step(); sched.step(); optim.zero_grad(set_to_none=True)`}</Code>
        <p>Post-training quantisation to int8 reduced the model from 87 MB to 22 MB with a 0.4% top-1 drop, comfortably inside the accuracy budget.</p>
        <Figure src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&q=80" caption="Figure 2 — Field data pipeline: capture on device → optional cloud fallback → user feedback → weekly retraining candidate set → botanist review." />
      </Section>

      <Section id="deployment" title="9. Deployment Strategy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Mobile rollout with a phased release (1% → 10% → 50% → 100%) over three weeks, gated by crash-free-session rate.</li>
          <li>Cloud fallback deployed on Triton with autoscaling GPU pools; cold starts mitigated by a warm pool of 4 replicas.</li>
          <li>Model versioning via MLflow registry with signed manifests; the mobile app pins a version and can lazy-download upgrades.</li>
          <li>Rollback path validated in staging — flip a feature flag and the client reverts to the previous cached model.</li>
        </ul>
      </Section>

      <Section id="monitoring" title="10. Monitoring & Maintenance">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Service SLOs</strong> — 99.5% availability, P95 latency &lt; 200 ms on-device, &lt; 900 ms cloud.</li>
          <li><strong>Model quality</strong> — daily rolling top-1 estimate from user feedback (thumbs up / down + confirmed labels).</li>
          <li><strong>Drift monitors</strong> — per-species prediction share vs 30-day baseline, alert at ±3σ.</li>
          <li><strong>Bias audits</strong> — quarterly review of accuracy by continent and by species rarity bucket.</li>
          <li><strong>Retraining cadence</strong> — monthly with the previous month&apos;s reviewed candidates, gated by A/B test.</li>
        </ul>
      </Section>

      <Section id="performance" title="11. Performance Evaluation">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Metric</th><th className="p-2 text-left">Target</th><th className="p-2 text-left">Launch</th><th className="p-2 text-left">4 months post-launch</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Top-1 accuracy</td><td className="p-2">≥ 90%</td><td className="p-2">91.4%</td><td className="p-2">93.1%</td></tr>
            <tr className="border-b"><td className="p-2">P95 on-device latency</td><td className="p-2">≤ 200 ms</td><td className="p-2">180 ms</td><td className="p-2">175 ms</td></tr>
            <tr className="border-b"><td className="p-2">Weekly misID tickets</td><td className="p-2">−30%</td><td className="p-2">−41%</td><td className="p-2">−58%</td></tr>
            <tr className="border-b"><td className="p-2">Monthly premium churn</td><td className="p-2">−1pp</td><td className="p-2">−1.4pp</td><td className="p-2">−2.1pp</td></tr>
            <tr><td className="p-2">Cloud inference cost</td><td className="p-2">−60%</td><td className="p-2">−72%</td><td className="p-2">−81%</td></tr>
          </tbody>
        </table>
        <p><strong>Cost analysis</strong> — moving 96% of predictions on-device reduced monthly GPU spend from $47k to $9k. Retraining runs cost ~$220 per cycle.</p>
      </Section>

      <Section id="lessons" title="12. Lessons Learned">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Botanist review beat scale.</strong> The 5,000-image gold set caught a taxonomy bug that would have degraded top-1 by ~3 points.</li>
          <li><strong>Confidence threshold is a product decision.</strong> The 0.72 fallback threshold was tuned with UX research, not held-out metrics alone.</li>
          <li><strong>Int8 quantisation was cheaper than a smaller architecture.</strong> Retained 91% top-1 vs 86% from a slimmer model.</li>
          <li><strong>Data drift monitors surfaced a genuine bug.</strong> A camera pipeline regression on Android 14 dropped colour accuracy — caught within 36 hours.</li>
          <li><strong>Support tickets remained the best north-star metric.</strong> They aligned every team around user outcomes rather than benchmarks.</li>
        </ul>
      </Section>

      <Section id="future" title="13. Future Improvements">
        <ul className="list-disc space-y-1 pl-5">
          <li>Multi-image aggregation — combine several shots of the same plant for a stronger prediction.</li>
          <li>Regional model variants — reduce cross-continent confusion by conditioning on geolocation.</li>
          <li>Weakly-supervised expansion to 3,000 species using the growing feedback corpus.</li>
          <li>Explainable predictions — leaf / flower / fruit part attribution with Grad-CAM overlays.</li>
        </ul>
      </Section>

      <Section id="review" title="Case Study Review">
        <h3 className="font-semibold">Executive summary</h3>
        <p>PetalScan hit every launch KPI, cut cloud spend by 72%, and materially reduced churn. The two-tier architecture proved decisive.</p>
        <h3 className="mt-3 font-semibold">Engineering takeaways</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer int8 quantisation over smaller architectures when accuracy is the constraint.</li>
          <li>Bind on-device and cloud models to the same taxonomy head.</li>
          <li>Invest early in a gold set — it repays across every retraining cycle.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Reflection questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Would a bigger on-device model have removed the need for cloud fallback? At what cost?</li>
          <li>How would you evaluate fairness across rare vs common species?</li>
          <li>What would change if network access were guaranteed?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Discussion activities</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Redraw the architecture diagram assuming a 10× dataset increase.</li>
          <li>Design an A/B test framework for the confidence threshold.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Industry insights</h3>
        <p>Two-tier on-device / cloud inference is now common across vision products where latency and cost matter more than 1–2 percentage points of accuracy.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Frame the metric around user outcomes, not benchmarks.</li>
          <li>Two-tier inference is a robust default for cost-sensitive vision products.</li>
          <li>Botanist / expert review is a high-leverage investment.</li>
          <li>Monitoring beats one-shot evaluation for real-world quality.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Was on-device inference always the plan?">No. The first prototype was cloud-only; the on-device pivot came after the cost model was written.</FAQItem>
        <FAQItem q="How large was the team?">Four engineers, one product manager, one designer, and part-time access to 12 botanists.</FAQItem>
        <FAQItem q="Which framework was used?">PyTorch for training and export; Triton for cloud serving; TorchScript / CoreML / NNAPI on-device.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Two-tier inference</strong> — a fast on-device model with a heavier cloud fallback.</li>
          <li><strong>Perceptual hash</strong> — a similarity fingerprint used for deduplication.</li>
          <li><strong>Cohen&apos;s κ</strong> — a statistic measuring inter-annotator agreement.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. PetalScan is a composite case
          study assembled from typical industry practices. Information is compiled from official
          documentation, academic publications, research papers, industry standards, and trusted
          educational resources. Deep learning technologies, frameworks, APIs, and best practices
          evolve continuously — consult the latest official documentation for authoritative
          guidance. All trademarks, logos, product names, and intellectual property belong to their
          respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
