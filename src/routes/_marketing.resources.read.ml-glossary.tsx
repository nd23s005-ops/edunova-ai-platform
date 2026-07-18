import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-glossary",
  title: "Machine Learning — Glossary",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 16,
  lastUpdated: "April 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1800&q=80",
  heroSubtitle:
    "A friendly A–Z reference of 150+ Machine Learning terms — acronyms, algorithms, libraries, metrics, and MLOps vocabulary with plain-language definitions and examples.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "how", label: "1. How to Use This Glossary" },
  { id: "acronyms", label: "2. ML Acronyms" },
  { id: "az", label: "3. A–Z Terminology" },
  { id: "algorithms", label: "4. Algorithms" },
  { id: "libs", label: "5. Python Libraries" },
  { id: "metrics", label: "6. Evaluation Metrics" },
  { id: "dl", label: "7. Deep Learning Terms" },
  { id: "mlops", label: "8. MLOps Terminology" },
  { id: "stats", label: "9. Statistical Concepts" },
  { id: "interview", label: "10. Interview Vocabulary" },
  { id: "lookup", label: "11. Quick Lookup Index" },
  { id: "revision", label: "12. Revision Sheet" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Reference Guide", tag: "AI & Data", time: "53 min" },
  { title: "Machine Learning — Cheat Sheet", tag: "AI & Data", time: "8 min" },
  { title: "Machine Learning — Frequently Asked Questions", tag: "AI & Data", time: "9 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-glossary")({
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
  component: MLGlossaryPage,
});

type Term = { term: string; def: string; example?: string; related?: string };
function TermList({ items }: { items: Term[] }) {
  return (
    <dl className="mt-2 space-y-3">
      {items.map((t) => (
        <div key={t.term} className="rounded-xl border border-border/60 bg-card p-3">
          <dt className="text-sm font-semibold">{t.term}</dt>
          <dd className="mt-1 text-sm text-muted-foreground">
            {t.def}
            {t.example && <div className="mt-1"><em>Example:</em> {t.example}</div>}
            {t.related && <div className="mt-1 text-xs">See also: {t.related}</div>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function MLGlossaryPage() {
  const A: Term[] = [
    { term: "Accuracy", def: "Fraction of correct predictions over all predictions.", example: "90 / 100 correct → 0.90", related: "Precision, Recall" },
    { term: "Activation Function", def: "Non-linear transform inside neural network layers (ReLU, GELU, Sigmoid).", example: "ReLU(x) = max(0, x)" },
    { term: "AUC", def: "Area under the ROC curve — probability the model ranks a random positive above a random negative.", related: "ROC, PR-AUC" },
    { term: "AutoML", def: "Automated pipelines that search algorithms + hyperparameters for you.", example: "Auto-sklearn, H2O AutoML" },
  ];
  const B: Term[] = [
    { term: "Bagging", def: "Bootstrap aggregation — average many models trained on random data subsets.", related: "Random Forest" },
    { term: "Batch Size", def: "Number of samples processed before the model updates its weights." },
    { term: "Bias (statistical)", def: "Systematic error — how far a model's average prediction is from truth.", related: "Variance" },
    { term: "Boosting", def: "Sequentially fit models where each one corrects the previous errors.", example: "XGBoost, LightGBM, CatBoost" },
  ];
  const C: Term[] = [
    { term: "Calibration", def: "Adjusting output probabilities so they match observed frequencies." },
    { term: "Classification", def: "Predicting a discrete label.", example: "spam vs not-spam" },
    { term: "Clustering", def: "Grouping similar points without labels.", example: "K-Means, DBSCAN" },
    { term: "Cross-Validation", def: "Rotating splits to estimate generalisation performance stably." },
  ];
  const D: Term[] = [
    { term: "Data Drift", def: "Change in the input distribution between training and production." },
    { term: "Decision Tree", def: "Recursive if/else splits that end in leaf predictions." },
    { term: "Dropout", def: "Randomly zero units during training to reduce overfitting." },
    { term: "Dimensionality Reduction", def: "Project features into fewer dimensions.", example: "PCA, UMAP" },
  ];
  const E: Term[] = [
    { term: "Embedding", def: "Dense vector representation of a discrete item (word, user, product)." },
    { term: "Ensemble", def: "Combining multiple models to improve robustness." },
    { term: "Epoch", def: "One complete pass over the training dataset." },
    { term: "Early Stopping", def: "Halt training when validation metric stops improving." },
  ];
  const F: Term[] = [
    { term: "Feature", def: "A measurable input variable." },
    { term: "Feature Store", def: "Central store that serves consistent features to training and serving." },
    { term: "F1-Score", def: "Harmonic mean of precision and recall." },
    { term: "Fine-Tuning", def: "Continuing training of a pre-trained model on a smaller task-specific dataset." },
  ];
  const G: Term[] = [
    { term: "Gradient Descent", def: "Iterative optimisation that follows the negative gradient of the loss." },
    { term: "Gradient Boosting", def: "Boosting where each new tree fits the gradient of the loss." },
    { term: "GPU", def: "Massively parallel accelerator used for training deep networks." },
  ];
  const H: Term[] = [
    { term: "Hyperparameter", def: "A configuration set before training (e.g. learning rate)." },
    { term: "Hidden Layer", def: "A layer between input and output in a neural network." },
  ];
  const I: Term[] = [
    { term: "Imbalanced Data", def: "One class is much rarer than another; standard accuracy is misleading." },
    { term: "Inference", def: "Running a trained model on new data." },
    { term: "Instance", def: "A single data point / row." },
  ];
  const J: Term[] = [
    { term: "Jupyter", def: "Interactive notebook environment popular in ML exploration." },
    { term: "Joint Distribution", def: "Probability distribution over multiple variables together." },
  ];
  const K: Term[] = [
    { term: "K-Fold CV", def: "Cross-validation with K rotating folds (commonly 5)." },
    { term: "KNN", def: "K-Nearest Neighbours — vote from the closest labelled points." },
    { term: "KL Divergence", def: "Distance between two probability distributions." },
  ];
  const L: Term[] = [
    { term: "Label", def: "The target output the model must predict." },
    { term: "Learning Rate", def: "Step size in gradient descent updates." },
    { term: "Loss Function", def: "Scalar measuring how wrong the current predictions are." },
    { term: "LightGBM", def: "Fast, histogram-based gradient boosting library." },
  ];
  const M: Term[] = [
    { term: "Model Card", def: "Short document describing intended use, data, metrics, and limits." },
    { term: "MLOps", def: "Engineering practices for reliable ML delivery in production." },
    { term: "Momentum", def: "Optimiser trick that accelerates SGD along consistent gradients." },
  ];
  const N: Term[] = [
    { term: "Normalisation", def: "Rescaling features to comparable ranges." },
    { term: "Neural Network", def: "Stacked layers of parameterised non-linear transforms." },
  ];
  const O: Term[] = [
    { term: "Overfitting", def: "High training accuracy but poor generalisation." },
    { term: "One-Hot Encoding", def: "Represent categories as sparse binary vectors." },
    { term: "Optimiser", def: "Algorithm that updates weights from gradients (SGD, Adam)." },
  ];
  const P: Term[] = [
    { term: "Precision", def: "TP / (TP + FP)." },
    { term: "Pipeline", def: "Ordered preprocessing + estimator stages." },
    { term: "PSI", def: "Population Stability Index — feature drift metric." },
  ];
  const Q: Term[] = [
    { term: "Quantisation", def: "Reducing numeric precision (FP32 → INT8) for cheaper inference." },
  ];
  const R: Term[] = [
    { term: "Recall", def: "TP / (TP + FN)." },
    { term: "Regression", def: "Predicting a continuous target." },
    { term: "Regularisation", def: "Penalty on complexity (L1/L2) to reduce overfitting." },
    { term: "ROC Curve", def: "TPR vs FPR trade-off across thresholds." },
  ];
  const S: Term[] = [
    { term: "SGD", def: "Stochastic Gradient Descent — updates on mini-batches." },
    { term: "SHAP", def: "Shapley-value based feature attribution." },
    { term: "SVM", def: "Support Vector Machine — maximum margin classifier." },
  ];
  const T: Term[] = [
    { term: "Test Set", def: "Held-out data used once, at the end, to estimate generalisation." },
    { term: "Transfer Learning", def: "Reusing a model pre-trained on a large corpus for a related task." },
    { term: "TensorFlow", def: "Google's ML framework with Keras high-level API." },
  ];
  const U: Term[] = [
    { term: "Underfitting", def: "Model too simple — poor both on train and test." },
    { term: "UMAP", def: "Non-linear dimensionality-reduction algorithm for visualisation." },
  ];
  const V: Term[] = [
    { term: "Validation Set", def: "Data used to tune hyperparameters (not test)." },
    { term: "Variance", def: "How much a model's predictions vary across training samples." },
    { term: "Vectorisation", def: "Replace Python loops with NumPy/Pandas array operations." },
  ];
  const W: Term[] = [
    { term: "Weight", def: "A learnable parameter of a model." },
    { term: "Weight Decay", def: "L2 regularisation applied by the optimiser." },
  ];
  const XYZ: Term[] = [
    { term: "XAI", def: "Explainable AI — techniques that make predictions interpretable." },
    { term: "XGBoost", def: "Highly optimised gradient boosting library." },
    { term: "YOLO", def: "Real-time object detection family." },
    { term: "Zero-Shot", def: "Predicting classes never seen during training, via aligned representations." },
  ];

  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Build a strong Machine Learning vocabulary.</li>
            <li>Decode acronyms used in papers, blog posts, and interviews.</li>
            <li>Cross-reference related terms confidently.</li>
            <li>Prepare for interviews and certifications faster.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1400&q=80" caption="Figure 1 — Concept map connecting core ML terminology across data, models, evaluation, and deployment." />
      </Section>

      <Section id="how" title="1. How to Use This Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li>Skim once end-to-end for orientation, then dip in on demand.</li>
          <li>Use browser <kbd>Ctrl/⌘ + F</kbd> to jump to a term.</li>
          <li>Follow <em>See also</em> cross-references to related concepts.</li>
        </ul>
      </Section>

      <Section id="acronyms" title="2. Machine Learning Acronyms">
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60"><tr><th className="p-2">Acronym</th><th className="p-2">Meaning</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border/60">
              <tr><td className="p-2">ML</td><td className="p-2">Machine Learning</td></tr>
              <tr><td className="p-2">DL</td><td className="p-2">Deep Learning</td></tr>
              <tr><td className="p-2">NN</td><td className="p-2">Neural Network</td></tr>
              <tr><td className="p-2">CNN</td><td className="p-2">Convolutional Neural Network</td></tr>
              <tr><td className="p-2">RNN</td><td className="p-2">Recurrent Neural Network</td></tr>
              <tr><td className="p-2">LSTM</td><td className="p-2">Long Short-Term Memory</td></tr>
              <tr><td className="p-2">GAN</td><td className="p-2">Generative Adversarial Network</td></tr>
              <tr><td className="p-2">NLP</td><td className="p-2">Natural Language Processing</td></tr>
              <tr><td className="p-2">CV</td><td className="p-2">Computer Vision (or Cross-Validation)</td></tr>
              <tr><td className="p-2">RL</td><td className="p-2">Reinforcement Learning</td></tr>
              <tr><td className="p-2">RLHF</td><td className="p-2">RL from Human Feedback</td></tr>
              <tr><td className="p-2">AUC</td><td className="p-2">Area Under Curve</td></tr>
              <tr><td className="p-2">MSE</td><td className="p-2">Mean Squared Error</td></tr>
              <tr><td className="p-2">MAE</td><td className="p-2">Mean Absolute Error</td></tr>
              <tr><td className="p-2">PCA</td><td className="p-2">Principal Component Analysis</td></tr>
              <tr><td className="p-2">SGD</td><td className="p-2">Stochastic Gradient Descent</td></tr>
              <tr><td className="p-2">XAI</td><td className="p-2">Explainable AI</td></tr>
              <tr><td className="p-2">MLOps</td><td className="p-2">ML Operations</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="az" title="3. A–Z Terminology">
        <h3 className="font-semibold">A</h3><TermList items={A} />
        <h3 className="mt-3 font-semibold">B</h3><TermList items={B} />
        <h3 className="mt-3 font-semibold">C</h3><TermList items={C} />
        <h3 className="mt-3 font-semibold">D</h3><TermList items={D} />
        <h3 className="mt-3 font-semibold">E</h3><TermList items={E} />
        <h3 className="mt-3 font-semibold">F</h3><TermList items={F} />
        <h3 className="mt-3 font-semibold">G</h3><TermList items={G} />
        <h3 className="mt-3 font-semibold">H</h3><TermList items={H} />
        <h3 className="mt-3 font-semibold">I</h3><TermList items={I} />
        <h3 className="mt-3 font-semibold">J</h3><TermList items={J} />
        <h3 className="mt-3 font-semibold">K</h3><TermList items={K} />
        <h3 className="mt-3 font-semibold">L</h3><TermList items={L} />
        <h3 className="mt-3 font-semibold">M</h3><TermList items={M} />
        <h3 className="mt-3 font-semibold">N</h3><TermList items={N} />
        <h3 className="mt-3 font-semibold">O</h3><TermList items={O} />
        <h3 className="mt-3 font-semibold">P</h3><TermList items={P} />
        <h3 className="mt-3 font-semibold">Q</h3><TermList items={Q} />
        <h3 className="mt-3 font-semibold">R</h3><TermList items={R} />
        <h3 className="mt-3 font-semibold">S</h3><TermList items={S} />
        <h3 className="mt-3 font-semibold">T</h3><TermList items={T} />
        <h3 className="mt-3 font-semibold">U</h3><TermList items={U} />
        <h3 className="mt-3 font-semibold">V</h3><TermList items={V} />
        <h3 className="mt-3 font-semibold">W</h3><TermList items={W} />
        <h3 className="mt-3 font-semibold">X · Y · Z</h3><TermList items={XYZ} />
      </Section>

      <Section id="algorithms" title="4. Algorithms — Quick Definitions">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Linear Regression</strong> — fits a straight line minimising squared error.</li>
          <li><strong>Logistic Regression</strong> — linear model + sigmoid for classification.</li>
          <li><strong>K-Means</strong> — partition points into K clusters by nearest centroid.</li>
          <li><strong>Naive Bayes</strong> — Bayes' rule with feature-independence assumption.</li>
          <li><strong>Random Forest</strong> — bagged ensemble of decision trees.</li>
          <li><strong>Gradient Boosting</strong> — sequential trees fitting residuals/gradients.</li>
          <li><strong>Transformer</strong> — attention-based sequence model behind modern LLMs.</li>
        </ul>
      </Section>

      <Section id="libs" title="5. Python Libraries">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>NumPy</strong> — array maths.</li>
          <li><strong>Pandas</strong> — tabular data manipulation.</li>
          <li><strong>Scikit-learn</strong> — classic ML algorithms + Pipeline API.</li>
          <li><strong>Matplotlib / Seaborn / Plotly</strong> — visualisation.</li>
          <li><strong>TensorFlow / Keras</strong> — deep learning by Google.</li>
          <li><strong>PyTorch</strong> — deep learning by Meta; research favourite.</li>
          <li><strong>XGBoost / LightGBM / CatBoost</strong> — gradient boosting champions.</li>
          <li><strong>Optuna</strong> — Bayesian hyperparameter optimisation.</li>
          <li><strong>MLflow / Weights &amp; Biases</strong> — experiment tracking.</li>
        </ul>
      </Section>

      <Section id="metrics" title="6. Evaluation Metrics">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Accuracy</strong>, <strong>Precision</strong>, <strong>Recall</strong>, <strong>F1</strong>, <strong>ROC-AUC</strong>, <strong>PR-AUC</strong> for classification.</li>
          <li><strong>MSE</strong>, <strong>MAE</strong>, <strong>R²</strong>, <strong>MAPE</strong> for regression.</li>
          <li><strong>NDCG</strong>, <strong>MAP</strong>, <strong>MRR</strong> for ranking.</li>
          <li><strong>BLEU</strong>, <strong>ROUGE</strong>, <strong>METEOR</strong> for generated text.</li>
        </ul>
      </Section>

      <Section id="dl" title="7. Deep Learning Terms">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Backpropagation</strong> — chain-rule gradient computation through the network.</li>
          <li><strong>Attention</strong> — weighted average of a value set based on query–key similarity.</li>
          <li><strong>Transformer</strong> — stacked self-attention + feed-forward blocks.</li>
          <li><strong>Batch Norm / Layer Norm</strong> — normalisation tricks that stabilise training.</li>
          <li><strong>ResNet</strong> — deep CNN with skip connections.</li>
        </ul>
      </Section>

      <Section id="mlops" title="8. MLOps Terminology">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Model Registry</strong> — versioned store of trained models.</li>
          <li><strong>Feature Store</strong> — offline + online feature server.</li>
          <li><strong>Canary Deploy</strong> — send small % of traffic to a new version.</li>
          <li><strong>Shadow Model</strong> — runs alongside production without serving users.</li>
          <li><strong>SLO</strong> — Service Level Objective.</li>
        </ul>
      </Section>

      <Section id="stats" title="9. Statistical Concepts">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Bias–Variance</strong>, <strong>Type I/II errors</strong>, <strong>p-value</strong>, <strong>Confidence Interval</strong>.</li>
          <li><strong>Central Limit Theorem</strong>, <strong>Law of Large Numbers</strong>.</li>
          <li><strong>Bayes' Theorem</strong>, <strong>Prior/Posterior/Likelihood</strong>.</li>
        </ul>
      </Section>

      <Section id="interview" title="10. Interview Vocabulary">
        <ul className="list-disc space-y-1 pl-5">
          <li>Overfitting, underfitting, regularisation, cross-validation.</li>
          <li>Data leakage, feature engineering, class imbalance.</li>
          <li>ROC-AUC vs PR-AUC, calibration, threshold selection.</li>
          <li>Bias–variance trade-off, learning curves.</li>
          <li>Deployment, monitoring, drift, retraining triggers.</li>
        </ul>
      </Section>

      <Section id="lookup" title="11. Quick Lookup Index">
        <p>Popular abbreviations you'll see in papers &amp; blogs:</p>
        <ul className="grid list-disc grid-cols-2 gap-x-8 gap-y-1 pl-5 sm:grid-cols-3">
          <li>AUC</li><li>ROC</li><li>PR</li><li>MSE</li><li>MAE</li><li>RMSE</li>
          <li>SGD</li><li>Adam</li><li>BN</li><li>LN</li><li>NN</li><li>CNN</li>
          <li>RNN</li><li>LSTM</li><li>GRU</li><li>GAN</li><li>VAE</li><li>SVM</li>
          <li>RF</li><li>GBM</li><li>XGB</li><li>LGBM</li><li>CV</li><li>KFold</li>
          <li>PCA</li><li>t-SNE</li><li>UMAP</li><li>SHAP</li><li>LIME</li><li>MLOps</li>
        </ul>
      </Section>

      <Section id="revision" title="12. Revision Sheet — Top 150 Terms">
        <p>Use this as spaced repetition. Mark each term with a confidence score 1–5 weekly.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Fundamentals: feature, label, dataset, split, epoch, batch, loss, gradient.</li>
          <li>Models: linear, logistic, tree, RF, boosting, SVM, KNN, K-Means, NN, CNN, RNN, transformer.</li>
          <li>Evaluation: accuracy, precision, recall, F1, AUC, PR-AUC, MSE, MAE, R², cross-validation.</li>
          <li>Regularisation: L1, L2, dropout, early stopping, data augmentation.</li>
          <li>Tuning: grid search, random search, Bayesian optimisation, Optuna, ASHA.</li>
          <li>Explainability: SHAP, LIME, partial dependence, permutation importance.</li>
          <li>Data issues: leakage, imbalance, drift, missingness, outliers.</li>
          <li>Deep learning: attention, transformer, embedding, fine-tuning, transfer learning.</li>
          <li>MLOps: pipeline, registry, feature store, canary, monitoring, SLO, runbook.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vocabulary compounds — knowing the words unlocks papers, docs, and interviews.</li>
          <li>Cross-references matter more than isolated definitions.</li>
          <li>Come back for a 10-minute skim before every interview.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How should I memorise these terms?">Actively use them — write a sentence per term, teach it to a peer, or use flashcards (Anki).</FAQItem>
        <FAQItem q="Do I need every acronym?">No — start with the ones that appear in the interviews / roles you target.</FAQItem>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
