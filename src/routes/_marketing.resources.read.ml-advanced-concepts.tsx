import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-advanced-concepts",
  title: "Machine Learning — Advanced Concepts",
  category: "AI & Data",
  difficulty: "Advanced",
  readingTime: "38 min",
  pages: 32,
  lastUpdated: "August 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1800&q=80",
  heroSubtitle:
    "Deep dive into modern ML internals, optimization, distributed training, MLOps, explainability, security, and the research frontier — for engineers, graduate students, and senior practitioners.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "architecture", label: "1. Advanced ML Architecture" },
  { id: "math", label: "2. Mathematical Foundations" },
  { id: "supervised", label: "3. Advanced Supervised Learning" },
  { id: "unsupervised", label: "4. Advanced Unsupervised Learning" },
  { id: "ensembles", label: "5. Ensemble Learning" },
  { id: "features", label: "6. Feature Engineering Strategies" },
  { id: "hpo", label: "7. Hyperparameter Optimisation" },
  { id: "xai", label: "8. Explainable AI (XAI)" },
  { id: "distributed", label: "9. Distributed ML" },
  { id: "mlops", label: "10. MLOps" },
  { id: "monitoring", label: "11. Model Monitoring" },
  { id: "perf", label: "12. Performance Optimisation" },
  { id: "security", label: "13. Security & Privacy" },
  { id: "research", label: "14. Emerging Research" },
  { id: "future", label: "15. Future of ML" },
  { id: "review", label: "Advanced Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Best Practices", tag: "AI & Data", time: "18 min" },
  { title: "Machine Learning — Reference Guide", tag: "AI & Data", time: "53 min" },
  { title: "Machine Learning — Real-world Case Study", tag: "AI & Data", time: "24 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-advanced-concepts")({
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
  component: MLAdvancedPage,
});

function MLAdvancedPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Reason about modern ML architectures at a systems level.</li>
            <li>Apply advanced optimisation and regularisation techniques.</li>
            <li>Design production ML platforms with MLOps discipline.</li>
            <li>Analyse complex real-world ML deployments and their failure modes.</li>
            <li>Track the research frontier — diffusion, RLHF, foundation models.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 1 — End-to-end advanced ML architecture: feature store, training cluster, model registry, serving mesh, and observability plane." />
      </Section>

      <Section id="architecture" title="1. Advanced Machine Learning Architecture">
        <p>
          Modern ML systems separate concerns across five planes: <strong>data</strong> (lakehouse + feature store),
          <strong> training</strong> (distributed compute + experiment tracking), <strong>registry</strong> (versioned artefacts + lineage),
          <strong> serving</strong> (real-time + batch + streaming), and <strong>observability</strong> (metrics, drift, quality).
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Feature stores (Feast, Tecton) unify offline training and online serving with point-in-time correctness.</li>
          <li>Training orchestration via Kubeflow, Ray, or Airflow with reproducible container images.</li>
          <li>Model registries (MLflow, SageMaker) store weights, schema, metrics, and lineage.</li>
          <li>Serving mesh (KServe, BentoML, Triton) provides autoscaling, canary, shadow, A/B routing.</li>
        </ul>
      </Section>

      <Section id="math" title="2. Mathematical Foundations">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Linear algebra:</strong> eigendecomposition, SVD, matrix calculus for backprop.</li>
          <li><strong>Probability:</strong> KL divergence, exponential families, variational inference.</li>
          <li><strong>Optimisation:</strong> convexity, Lagrangian duality, saddle-point analysis in GANs.</li>
          <li><strong>Information theory:</strong> entropy, mutual information, cross-entropy as loss.</li>
        </ul>
        <Code lang="text">{`Cross-entropy loss:
L(y, p) = - Σ y_i log(p_i)

KL divergence (P || Q):
D_KL(P || Q) = Σ P(x) log( P(x) / Q(x) )`}</Code>
      </Section>

      <Section id="supervised" title="3. Advanced Supervised Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Gradient boosting internals — histogram binning (LightGBM), symmetric trees (CatBoost), leaf-wise growth.</li>
          <li>Calibration — Platt scaling, isotonic regression, temperature scaling for deep nets.</li>
          <li>Cost-sensitive learning, focal loss, label smoothing for imbalanced targets.</li>
          <li>Semi-supervised learning — pseudo-labelling, FixMatch, consistency regularisation.</li>
        </ul>
      </Section>

      <Section id="unsupervised" title="4. Advanced Unsupervised Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Manifold learning — t-SNE, UMAP, PaCMAP; strengths and known distortions.</li>
          <li>Density estimation — Gaussian Mixtures, Normalising Flows.</li>
          <li>Self-supervised representations — SimCLR, MoCo, MAE.</li>
          <li>Anomaly detection — Isolation Forest, One-Class SVM, Autoencoder reconstruction error.</li>
        </ul>
      </Section>

      <Section id="ensembles" title="5. Ensemble Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Bagging reduces variance; boosting reduces bias.</li>
          <li>Stacking — level-2 meta-learner on out-of-fold predictions.</li>
          <li>Snapshot &amp; SWA ensembles from neural network training trajectories.</li>
        </ul>
        <Code>{`from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
import lightgbm as lgb, xgboost as xgb

stack = StackingClassifier(
    estimators=[("lgb", lgb.LGBMClassifier()), ("xgb", xgb.XGBClassifier())],
    final_estimator=LogisticRegression(max_iter=1000),
    cv=5, n_jobs=-1,
)`}</Code>
      </Section>

      <Section id="features" title="6. Feature Engineering Strategies">
        <ul className="list-disc space-y-1 pl-5">
          <li>Time-aware features with strict point-in-time joins to prevent leakage.</li>
          <li>Target/CatBoost encoding inside CV folds only.</li>
          <li>Embeddings from tabular DL (TabTransformer, FT-Transformer) as features for boosters.</li>
          <li>Automated feature discovery — Featuretools, tsfresh — with feature stability filters.</li>
        </ul>
      </Section>

      <Section id="hpo" title="7. Hyperparameter Optimisation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Bayesian optimisation (TPE, GP) via Optuna; ASHA for early-stopping bad trials.</li>
          <li>Population-Based Training for schedules that co-evolve with weights.</li>
          <li>Multi-objective HPO — Pareto fronts across accuracy, latency, cost.</li>
        </ul>
      </Section>

      <Section id="xai" title="8. Explainable AI (XAI)">
        <ul className="list-disc space-y-1 pl-5">
          <li>SHAP — Shapley-value attribution with tree-specific fast paths.</li>
          <li>LIME — local surrogate models for individual predictions.</li>
          <li>Integrated Gradients &amp; Grad-CAM for neural networks.</li>
          <li>Counterfactual explanations for actionable recourse.</li>
        </ul>
      </Section>

      <Section id="distributed" title="9. Distributed Machine Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Data parallelism (DDP) vs model parallelism vs pipeline parallelism vs tensor parallelism.</li>
          <li>ZeRO / FSDP for training models that exceed a single GPU's memory.</li>
          <li>All-reduce collectives, gradient compression, and communication–compute overlap.</li>
          <li>Ray, Horovod, DeepSpeed — pick by scale and framework fit.</li>
        </ul>
      </Section>

      <Section id="mlops" title="10. MLOps">
        <ul className="list-disc space-y-1 pl-5">
          <li>CI/CD for models: lint → tests → data validation → training smoke → build → deploy → post-deploy checks.</li>
          <li>Reproducibility triad: code (Git), data (DVC/lakeFS), model (registry).</li>
          <li>Blue-green &amp; canary rollouts with automated rollback on SLO breach.</li>
        </ul>
      </Section>

      <Section id="monitoring" title="11. Model Monitoring">
        <ul className="list-disc space-y-1 pl-5">
          <li>Three layers: service health, feature drift (PSI/KS), quality (delayed labels).</li>
          <li>Shadow models catch silent regressions before user impact.</li>
          <li>Slice-wise dashboards to surface fairness &amp; cohort issues early.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" caption="Figure 2 — Observability plane: latency SLOs, drift indices, quality trend by cohort." />
      </Section>

      <Section id="perf" title="12. Performance Optimisation">
        <ul className="list-disc space-y-1 pl-5">
          <li>Quantisation (INT8/FP8), pruning, distillation for inference throughput.</li>
          <li>Compiler stacks — TorchInductor, XLA, TensorRT — with kernel fusion.</li>
          <li>Batching + KV-cache reuse for transformer serving.</li>
        </ul>
      </Section>

      <Section id="security" title="13. Security & Privacy">
        <ul className="list-disc space-y-1 pl-5">
          <li>Adversarial robustness — PGD training, certified defences.</li>
          <li>Model &amp; membership inference attacks; mitigation with differential privacy.</li>
          <li>Federated learning + secure aggregation for regulated data.</li>
          <li>Prompt-injection &amp; data-exfiltration defences for LLM pipelines.</li>
        </ul>
      </Section>

      <Section id="research" title="14. Emerging Research">
        <ul className="list-disc space-y-1 pl-5">
          <li>Diffusion models beyond images — video, audio, molecules.</li>
          <li>Mixture-of-Experts for parameter-efficient scaling.</li>
          <li>Neural-symbolic hybrids and program-of-thought reasoning.</li>
          <li>RLHF &amp; RLAIF for alignment; constitutional AI variants.</li>
        </ul>
      </Section>

      <Section id="future" title="15. Future of Machine Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>Foundation models as reusable substrates across modalities.</li>
          <li>On-device / edge ML with sub-100 MB task-specific specialists.</li>
          <li>Causal ML entering mainstream product decisions.</li>
          <li>Sustainability &amp; carbon-aware training as first-class KPIs.</li>
        </ul>
      </Section>

      <Section id="review" title="Advanced Review">
        <h3 className="font-semibold">Architecture summary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Separate planes for data, training, registry, serving, observability.</li>
          <li>Every artefact has a version and a lineage edge back to inputs.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Expert checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Feature store enforces point-in-time correctness.</li>
          <li>Distributed training uses gradient accumulation + mixed precision.</li>
          <li>Monitoring covers service, drift, and quality with alert routing.</li>
          <li>Security review completed for adversarial &amp; privacy risks.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Reflection questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Which failure mode is most expensive in your current system?</li>
          <li>Where does drift enter first — data, features, or user behaviour?</li>
          <li>What is the smallest architecture change with the biggest reliability lift?</li>
        </ol>
        <h3 className="mt-4 font-semibold">Discussion topics</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>When is a foundation model the wrong tool?</li>
          <li>How should teams budget carbon &amp; cost per experiment?</li>
        </ul>
        <h3 className="mt-4 font-semibold">Advanced interview questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Derive the update rule for gradient boosting on log-loss.</li>
          <li>Compare DDP, FSDP, and ZeRO-3 in memory &amp; comms cost.</li>
          <li>Explain calibration and when it matters more than raw accuracy.</li>
          <li>Design an online-learning pipeline resilient to label delay.</li>
          <li>How would you detect a shadow regression that AUC doesn't reveal?</li>
        </ol>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Advanced ML is a systems discipline — architecture beats individual model tricks.</li>
          <li>Measurement &amp; reproducibility unlock the compounding gains.</li>
          <li>Frontier research matters, but production reliability pays the bills.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="When is model parallelism worth the complexity?">Only when the model no longer fits a single accelerator even with FSDP + activation checkpointing.</FAQItem>
        <FAQItem q="SHAP or LIME?">SHAP for tree-based models and consistent global explanations; LIME for quick local sanity checks.</FAQItem>
        <FAQItem q="Do I need a feature store?">If &gt; 2 teams share features or you need point-in-time training, yes. Otherwise a versioned parquet layer is fine.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>FSDP</strong> — Fully Sharded Data Parallel training.</li>
          <li><strong>Calibration</strong> — aligning predicted probabilities with observed frequencies.</li>
          <li><strong>PSI</strong> — Population Stability Index; a drift metric.</li>
          <li><strong>RLHF</strong> — Reinforcement Learning from Human Feedback.</li>
          <li><strong>Distillation</strong> — training a small model to mimic a large one.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
