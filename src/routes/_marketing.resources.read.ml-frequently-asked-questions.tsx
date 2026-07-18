import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-frequently-asked-questions",
  title: "Machine Learning — Frequently Asked Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "9 min",
  pages: 8,
  lastUpdated: "March 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1800&q=80",
  heroSubtitle:
    "The 100+ most-asked Machine Learning questions — answered in plain English with practical examples, comparison tables, expert tips, and interview insights.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "1. Introduction to ML" },
  { id: "basics", label: "2. Basic ML Questions" },
  { id: "algorithms", label: "3. Algorithms FAQ" },
  { id: "python", label: "4. Python & ML FAQ" },
  { id: "training", label: "5. Model Training FAQ" },
  { id: "deployment", label: "6. Deployment FAQ" },
  { id: "career", label: "7. Career FAQ" },
  { id: "interview", label: "8. Interview FAQ" },
  { id: "advanced", label: "9. Advanced Questions" },
  { id: "review", label: "FAQ Review — Top 25" },
  { id: "summary", label: "Final Summary" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Learning Roadmap", tag: "AI & Data", time: "7 min" },
  { title: "Machine Learning — Tips & Tricks", tag: "AI & Data", time: "11 min" },
  { title: "Machine Learning — Interview Questions", tag: "AI & Data", time: "22 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-frequently-asked-questions")({
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
  component: MLFaqPage,
});

function MLFaqPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Understand Machine Learning fundamentals in plain English.</li>
            <li>Clear up the most common beginner misconceptions.</li>
            <li>Learn ML terminology used in courses, interviews, and papers.</li>
            <li>Get ready for interviews and exams with 100+ curated answers.</li>
            <li>Build confidence through practical examples and mini exercises.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80" caption="Figure 1 — The Machine Learning workflow: data → features → model → evaluation → deployment." />
      </Section>

      <Section id="intro" title="1. Introduction to Machine Learning">
        <FAQItem q="What is Machine Learning?">
          Machine Learning (ML) is a branch of Artificial Intelligence where computers learn patterns from data
          instead of following hand-written rules. Given examples of input and output, an ML algorithm builds a
          <em> model</em> that can predict outputs for new inputs.
        </FAQItem>
        <FAQItem q="How is ML different from traditional programming?">
          Traditional code takes <em>data + rules</em> → produces <em>answers</em>. ML takes <em>data + answers</em> → produces <em>rules</em> (the model).
        </FAQItem>
        <FAQItem q="What are the three main types of ML?">
          <strong>Supervised</strong> (labelled data — spam vs not spam), <strong>Unsupervised</strong> (find structure — customer clusters),
          and <strong>Reinforcement</strong> (agent learns by reward — game playing, robotics).
        </FAQItem>
        <FAQItem q="Do I need to be great at maths to start?">
          No. Basic algebra, a little probability, and comfort with graphs are enough to start. You deepen the maths as you go.
        </FAQItem>
        <FAQItem q="Is ML the same as AI?">
          ML is a subset of AI. AI is the broad goal of intelligent behaviour; ML is one popular way to achieve it.
        </FAQItem>
      </Section>

      <Section id="basics" title="2. Basic ML Questions">
        <FAQItem q="What is a feature?">A single measurable property of your data — e.g. <code>age</code>, <code>pixel_intensity</code>, <code>word_count</code>.</FAQItem>
        <FAQItem q="What is a label?">The value you want to predict — e.g. <code>price</code>, <code>churn</code>, <code>digit</code>.</FAQItem>
        <FAQItem q="What is a dataset?">A structured collection of examples, usually split into training, validation, and test sets.</FAQItem>
        <FAQItem q="What is training?">The process where the algorithm tunes internal parameters so predictions match known labels as closely as possible.</FAQItem>
        <FAQItem q="What is inference?">Using a trained model to predict on new, unseen data.</FAQItem>
        <FAQItem q="What is overfitting?">The model memorises training data and fails on new data. Fix with more data, regularisation, or a simpler model.</FAQItem>
        <FAQItem q="What is underfitting?">The model is too simple to capture the pattern. Fix with a richer model or better features.</FAQItem>
        <FAQItem q="Classification vs regression?">Classification predicts categories (spam / not spam); regression predicts a number (house price).</FAQItem>

        <h3 className="mt-4 font-semibold">Common misconceptions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>"More data always helps."</strong> Only if the data is <em>relevant</em> and clean.</li>
          <li><strong>"Deep learning beats everything."</strong> On tabular data, gradient boosting usually wins.</li>
          <li><strong>"Accuracy is the right metric."</strong> On imbalanced problems, it hides failure — use precision, recall, F1, AUC.</li>
        </ul>
      </Section>

      <Section id="algorithms" title="3. Algorithms FAQ">
        <FAQItem q="Which algorithm should a beginner start with?">Logistic Regression for classification, Linear Regression for regression — they're fast, explainable, and hard to beat as baselines.</FAQItem>
        <FAQItem q="When should I use a Decision Tree?">When you need explainability and can accept lower accuracy — or as a building block for Random Forest / Gradient Boosting.</FAQItem>
        <FAQItem q="What is Random Forest?">An ensemble of many decision trees trained on random subsets. Robust, low tuning burden, strong default choice for tabular data.</FAQItem>
        <FAQItem q="When to pick XGBoost/LightGBM?">When you need state-of-the-art tabular performance and can spend time tuning.</FAQItem>
        <FAQItem q="What is k-Nearest Neighbours?">A lazy algorithm: it stores the training set and classifies new points by majority vote of the <code>k</code> closest neighbours.</FAQItem>

        <h3 className="mt-4 font-semibold">Comparison — Common Classifiers</h3>
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60"><tr><th className="p-2">Algorithm</th><th className="p-2">Strength</th><th className="p-2">Weakness</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border/60">
              <tr><td className="p-2">Logistic Regression</td><td className="p-2">Fast, explainable</td><td className="p-2">Linear only</td></tr>
              <tr><td className="p-2">Random Forest</td><td className="p-2">Robust, low tuning</td><td className="p-2">Larger models</td></tr>
              <tr><td className="p-2">XGBoost / LightGBM</td><td className="p-2">Top tabular accuracy</td><td className="p-2">More tuning</td></tr>
              <tr><td className="p-2">SVM</td><td className="p-2">Strong on small data</td><td className="p-2">Slow on large data</td></tr>
              <tr><td className="p-2">Neural Networks</td><td className="p-2">Best on images/text/audio</td><td className="p-2">Data & compute hungry</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="python" title="4. Python & ML FAQ">
        <FAQItem q="Which libraries do I need first?">NumPy, Pandas, Matplotlib, Scikit-learn. Add TensorFlow or PyTorch when you move to deep learning.</FAQItem>
        <FAQItem q="Jupyter or scripts?">Jupyter for exploration, plain <code>.py</code> scripts once you move toward production.</FAQItem>
        <FAQItem q="How do I set up a clean environment?">Use <code>uv</code>, <code>poetry</code>, or <code>conda</code>. Pin versions in <code>pyproject.toml</code> or <code>environment.yml</code>.</FAQItem>
        <Code>{`# End-to-end starter with Scikit-learn
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression(max_iter=1000).fit(X_train, y_train)
print("accuracy:", accuracy_score(y_test, model.predict(X_test)))`}</Code>
      </Section>

      <Section id="training" title="5. Model Training FAQ">
        <FAQItem q="What is a train/validation/test split?">Training fits the model, validation tunes hyperparameters, test estimates real-world performance <em>once</em>.</FAQItem>
        <FAQItem q="What is cross-validation?">Rotating splits (usually 5) to get a stable estimate of performance and reduce dependence on a single split.</FAQItem>
        <FAQItem q="What is a hyperparameter?">A setting you choose <em>before</em> training (e.g. learning rate, tree depth), unlike parameters the model learns from data.</FAQItem>
        <FAQItem q="How much data do I need?">Depends on complexity. Rule of thumb: 10× more examples than features for classical ML; far more for deep learning.</FAQItem>
        <FAQItem q="How do I handle imbalanced classes?">Class weights, resampling (SMOTE), threshold tuning, or metric change (PR-AUC instead of accuracy).</FAQItem>
      </Section>

      <Section id="deployment" title="6. Deployment FAQ">
        <FAQItem q="How is an ML model deployed?">Usually wrapped in a REST API (FastAPI/Flask), packaged in Docker, and served behind a load balancer.</FAQItem>
        <FAQItem q="What is MLOps?">Engineering practices — CI/CD, monitoring, versioning — that make ML systems reliable in production.</FAQItem>
        <FAQItem q="Why do models degrade over time?">Data drift — the world changes, the training data does not. Fix with monitoring and periodic retraining.</FAQItem>
        <FAQItem q="Batch or real-time inference?">Batch when latency isn't critical (nightly scoring), real-time when the app needs sub-second answers.</FAQItem>
      </Section>

      <Section id="career" title="7. Career FAQ">
        <FAQItem q="Do I need a Master's or PhD?">No. Strong portfolio projects + solid fundamentals beat degrees for most industry roles.</FAQItem>
        <FAQItem q="What roles use ML?">Data Scientist, ML Engineer, Applied Scientist, Research Engineer, Analytics Engineer, MLOps Engineer.</FAQItem>
        <FAQItem q="What's a good portfolio project?">One end-to-end project deployed as a live app — data collection, training, API, monitoring, README.</FAQItem>
        <FAQItem q="How long to become job-ready?">Focused learners: 6–9 months. Part-time learners: 12–18 months.</FAQItem>
      </Section>

      <Section id="interview" title="8. Interview FAQ">
        <FAQItem q="Bias–variance trade-off?">High bias = underfit; high variance = overfit. You tune model complexity to minimise total error.</FAQItem>
        <FAQItem q="Precision vs Recall?">Precision = of all predicted positives, how many are correct. Recall = of all actual positives, how many did we catch.</FAQItem>
        <FAQItem q="What is regularisation?">A penalty on model complexity (L1/L2) that reduces overfitting.</FAQItem>
        <FAQItem q="How do decision trees split?">By maximising information gain (Gini / Entropy) at each node.</FAQItem>
        <FAQItem q="Why use ROC-AUC?">Threshold-free measure of ranking quality; useful for imbalanced datasets.</FAQItem>
      </Section>

      <Section id="advanced" title="9. Advanced Questions">
        <FAQItem q="What is transfer learning?">Reusing a model pre-trained on a large dataset (e.g. ImageNet, GPT) and fine-tuning on your task with far less data.</FAQItem>
        <FAQItem q="What are embeddings?">Dense vector representations of items (words, users, products) learned so that similar items are close together.</FAQItem>
        <FAQItem q="What is explainability (XAI)?">Techniques (SHAP, LIME) that show which features drove a specific prediction.</FAQItem>
        <FAQItem q="What is federated learning?">Training a shared model across devices without moving raw data — used for privacy-sensitive applications.</FAQItem>
      </Section>

      <Section id="review" title="FAQ Review — Top 25">
        <p>Quick-revision cards — cover the answer, self-assess, and revisit weak points before an interview.</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>What is Machine Learning?</li>
          <li>Supervised vs Unsupervised vs Reinforcement?</li>
          <li>Bias–variance trade-off?</li>
          <li>Overfitting vs Underfitting?</li>
          <li>Precision vs Recall?</li>
          <li>What is F1-score?</li>
          <li>Why use ROC-AUC?</li>
          <li>What is regularisation (L1 vs L2)?</li>
          <li>Random Forest vs Gradient Boosting?</li>
          <li>Cross-validation — why?</li>
          <li>Handling imbalanced data?</li>
          <li>What is feature engineering?</li>
          <li>Feature scaling — when needed?</li>
          <li>Curse of dimensionality?</li>
          <li>Gradient descent intuition?</li>
          <li>Learning rate — effect if too high/low?</li>
          <li>Convex vs non-convex loss?</li>
          <li>Batch vs Stochastic vs Mini-batch?</li>
          <li>What is dropout?</li>
          <li>What is batch normalisation?</li>
          <li>Transfer learning use cases?</li>
          <li>Confusion matrix components?</li>
          <li>Data leakage examples?</li>
          <li>Model drift vs data drift?</li>
          <li>How to productionise a model?</li>
        </ol>
        <Callout tone="tip" title="Self-assessment"> Score each question 1–5 on confidence. Anything ≤ 3 goes back on the study list. </Callout>
      </Section>

      <Section id="summary" title="Final Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>ML learns from data — you supply examples, it discovers the rules.</li>
          <li>Baselines first. Complexity only when it pays for itself on validation.</li>
          <li>Metrics must match the business problem — accuracy alone rarely does.</li>
          <li>Production ML is 70% engineering. Reproducibility &amp; monitoring are non-negotiable.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Related Resources</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Machine Learning — Learning Roadmap</li>
          <li>Machine Learning — Tips &amp; Tricks</li>
          <li>Machine Learning — Interview Questions</li>
        </ul>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Feature</strong> — a measurable input variable.</li>
          <li><strong>Label</strong> — the target output being predicted.</li>
          <li><strong>Epoch</strong> — one full pass over the training data.</li>
          <li><strong>Hyperparameter</strong> — a setting chosen before training.</li>
          <li><strong>Regularisation</strong> — penalty added to reduce overfitting.</li>
          <li><strong>Inference</strong> — prediction on new data.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
