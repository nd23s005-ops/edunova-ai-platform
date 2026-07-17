import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-sample-exercises",
  title: "Machine Learning — Sample Exercises",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "28 min",
  pages: 24,
  lastUpdated: "August 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1800&q=80",
  heroSubtitle:
    "A progressive exercise workbook — warm-ups, guided drills, coding tasks, mini projects, and case-based problems — to lock in Machine Learning fundamentals with spaced practice.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "1. Introduction to Practice" },
  { id: "fundamentals", label: "2. ML Fundamentals Exercises" },
  { id: "preprocessing", label: "3. Data Preprocessing Exercises" },
  { id: "supervised", label: "4. Supervised Learning Exercises" },
  { id: "unsupervised", label: "5. Unsupervised Learning Exercises" },
  { id: "evaluation", label: "6. Model Evaluation Exercises" },
  { id: "features", label: "7. Feature Engineering Tasks" },
  { id: "python", label: "8. Python Coding Exercises" },
  { id: "challenges", label: "9. Mini Challenges" },
  { id: "realworld", label: "10. Real-world Applications" },
  { id: "review", label: "11. Review Exercises" },
  { id: "final", label: "12. Final Practice Test" },
  { id: "reflect", label: "Practice Checklist & Reflection" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Practice Questions", tag: "AI & Data", time: "33 min" },
  { title: "Machine Learning — Answer Key", tag: "AI & Data", time: "33 min" },
  { title: "Machine Learning — Project Guide", tag: "AI & Data", time: "24 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-sample-exercises")({
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
  component: MLSampleExercisesPage,
});

function MLSampleExercisesPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="How to use this workbook">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Reinforce Machine Learning fundamentals through practice.</li>
            <li>Apply ML concepts to practical, small-scale problems.</li>
            <li>Improve Python programming for ML workflows.</li>
            <li>Develop debugging and problem-solving muscle.</li>
            <li>Build confidence before tackling larger projects.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80" caption="Figure 1 — Machine Learning practice workflow: warm-up → guided → coding → mini project → reflection." />
      </Section>

      <Section id="intro" title="1. Introduction to Practice">
        <p>
          Practice is where theory becomes intuition. Each exercise in this workbook targets a specific skill —
          from recognising when a problem is supervised vs unsupervised, to writing a clean scikit-learn pipeline,
          to evaluating a model beyond raw accuracy. Aim for <strong>30–45 focused minutes per session</strong>, 3–5 sessions a week.
        </p>
        <Callout tone="tip" title="Study loop">
          Read → Attempt without help → Check answer → Explain out loud → Re-attempt in 48 h.
        </Callout>
      </Section>

      <Section id="fundamentals" title="2. ML Fundamentals Exercises">
        <h3 className="text-lg font-semibold">Warm-up (5 minutes)</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Define supervised, unsupervised, and reinforcement learning in one sentence each.</li>
          <li>Give two real examples of a <em>classification</em> task and two of a <em>regression</em> task.</li>
          <li>Explain the difference between features and labels using a house-price dataset.</li>
        </ol>
        <h3 className="mt-4 text-lg font-semibold">Multiple Choice</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Which is a supervised learning task? (A) Clustering customers (B) Predicting rainfall from features (C) Dimensionality reduction.</li>
          <li>Overfitting means the model has: (A) high train error (B) high test error and low train error (C) equal train and test error.</li>
          <li>Which is NOT a hyperparameter? (A) learning rate (B) tree depth (C) trained weight.</li>
        </ol>
        <h3 className="mt-4 text-lg font-semibold">Fill in the blanks</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>The bias–variance trade-off says lower bias tends to increase ______.</li>
          <li>______ splits data into k folds and averages the test score.</li>
          <li>A confusion matrix for k classes has shape ______ × ______.</li>
        </ul>
      </Section>

      <Section id="preprocessing" title="3. Data Preprocessing Exercises">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Given a CSV with 5% missing values in one column, list three strategies and when each is appropriate.</li>
          <li>Explain why you fit scalers on <em>train only</em>, then transform validation and test.</li>
          <li>Convert a "city" column with 200 unique values — one-hot, target, or hashing? Justify.</li>
          <li>Detect outliers in a numeric column using IQR. Write pseudocode.</li>
        </ol>
        <Code>{`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

df = pd.read_csv("data.csv").dropna(subset=["target"])
X, y = df.drop("target", axis=1), df["target"]
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler().fit(X_tr.select_dtypes("number"))
X_tr_num = scaler.transform(X_tr.select_dtypes("number"))
X_te_num = scaler.transform(X_te.select_dtypes("number"))`}</Code>
      </Section>

      <Section id="supervised" title="4. Supervised Learning Exercises">
        <h3 className="text-lg font-semibold">Guided drill — Logistic Regression on Iris</h3>
        <Code>{`from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

X, y = load_iris(return_X_y=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, random_state=0)
clf = LogisticRegression(max_iter=1000).fit(X_tr, y_tr)
pred = clf.predict(X_te)
print(accuracy_score(y_te, pred))
print(classification_report(y_te, pred))`}</Code>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Replace Logistic Regression with a Decision Tree — how does accuracy change?</li>
          <li>Change <code>test_size</code> to 0.1 and 0.5. Explain the effect on variance.</li>
          <li>Train on only 2 of the 4 features. Which pair performs best?</li>
        </ol>
      </Section>

      <Section id="unsupervised" title="5. Unsupervised Learning Exercises">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Cluster the digits dataset with K-Means for k = 2 … 15. Plot the elbow curve.</li>
          <li>Apply PCA to reduce to 2 components and scatter-plot by true label. Are clusters visible?</li>
          <li>Compare DBSCAN vs K-Means on a noisy moon-shaped dataset. Which handles non-convex clusters?</li>
        </ol>
      </Section>

      <Section id="evaluation" title="6. Model Evaluation Exercises">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead><tr className="bg-secondary/70"><th className="border p-2 text-left">Metric</th><th className="border p-2 text-left">Use for</th><th className="border p-2 text-left">Formula</th></tr></thead>
            <tbody>
              <tr><td className="border p-2">Accuracy</td><td className="border p-2">Balanced classes</td><td className="border p-2">(TP+TN)/N</td></tr>
              <tr><td className="border p-2">Precision</td><td className="border p-2">Cost of false positives high</td><td className="border p-2">TP/(TP+FP)</td></tr>
              <tr><td className="border p-2">Recall</td><td className="border p-2">Cost of false negatives high</td><td className="border p-2">TP/(TP+FN)</td></tr>
              <tr><td className="border p-2">F1</td><td className="border p-2">Trade-off</td><td className="border p-2">2·P·R/(P+R)</td></tr>
              <tr><td className="border p-2">RMSE</td><td className="border p-2">Regression</td><td className="border p-2">√mean((y−ŷ)²)</td></tr>
            </tbody>
          </table>
        </div>
        <ol className="list-decimal space-y-1 pl-5">
          <li>A spam classifier has 99% accuracy but recall = 12% on the spam class. Diagnose.</li>
          <li>Compute precision, recall and F1 from this confusion matrix: TP=40, FP=10, FN=20, TN=930.</li>
          <li>Explain when ROC-AUC is misleading. (Hint: heavy imbalance.)</li>
        </ol>
      </Section>

      <Section id="features" title="7. Feature Engineering Tasks">
        <ol className="list-decimal space-y-1 pl-5">
          <li>From a datetime column, extract hour, weekday, and is_weekend features.</li>
          <li>Log-transform a positively skewed <code>price</code> column and compare distributions.</li>
          <li>Create an interaction feature <code>price_per_sqft = price / area</code>.</li>
          <li>Encode a cyclic feature (month) with sin/cos.</li>
        </ol>
      </Section>

      <Section id="python" title="8. Python Coding Exercises">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Write a function <code>train_and_score(model, X, y)</code> that returns 5-fold CV mean accuracy.</li>
          <li>Build a scikit-learn <code>Pipeline</code> = <em>Imputer → Scaler → LogisticRegression</em>.</li>
          <li>Wrap a GridSearchCV over <code>C ∈ [0.01, 0.1, 1, 10]</code> and print best params.</li>
        </ol>
        <Code>{`from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV

pipe = Pipeline([
    ("imp", SimpleImputer()),
    ("sc",  StandardScaler()),
    ("clf", LogisticRegression(max_iter=1000)),
])
grid = GridSearchCV(pipe, {"clf__C": [0.01, 0.1, 1, 10]}, cv=5)`}</Code>
      </Section>

      <Section id="challenges" title="9. Mini Challenges">
        <ol className="list-decimal space-y-1 pl-5">
          <li><strong>Titanic Survival</strong> — beat a 0.78 accuracy baseline on the Kaggle Titanic dataset.</li>
          <li><strong>House Prices</strong> — reduce RMSE by 10% vs a plain LinearRegression baseline using feature engineering.</li>
          <li><strong>MNIST</strong> — train a KNN and a small MLP; compare accuracy and inference time.</li>
        </ol>
      </Section>

      <Section id="realworld" title="10. Real-world Applications">
        <ul className="list-disc space-y-1 pl-5">
          <li>Predict next-month churn from customer usage logs.</li>
          <li>Detect fraudulent transactions with heavy class imbalance (use SMOTE + F1).</li>
          <li>Recommend courses to learners using collaborative filtering.</li>
          <li>Segment retail customers by RFM (Recency, Frequency, Monetary).</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1400&q=80" caption="Figure 2 — Practice → project → portfolio: apply drills to real datasets end-to-end." />
      </Section>

      <Section id="review" title="11. Review Exercises">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Sketch the ML lifecycle from problem framing to monitoring.</li>
          <li>Explain in your own words: bias, variance, regularisation, cross-validation.</li>
          <li>Redo three earlier exercises you found hardest without looking at your notes.</li>
        </ol>
      </Section>

      <Section id="final" title="12. Final Practice Test">
        <p>30-question timed set covering all previous sections. Suggested time: 45 minutes. Grade yourself with the Answer Key resource and log every mistake.</p>
        <Callout tone="success" title="Passing bar">≥ 22 / 30 correct AND you can explain <em>why</em> each answer is right.</Callout>
      </Section>

      <Section id="reflect" title="Practice Checklist & Reflection">
        <ul className="list-disc space-y-1 pl-5">
          <li>[ ] Completed every warm-up.</li>
          <li>[ ] Ran all Python snippets locally.</li>
          <li>[ ] Attempted at least two mini challenges.</li>
          <li>[ ] Wrote a 100-word reflection: what improved, what still confuses me.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="How long should each session be?">30–45 focused minutes beats 3 unfocused hours.</FAQItem>
        <FAQItem q="Should I peek at the Answer Key?">Only after a genuine attempt. Then re-attempt 48 hours later.</FAQItem>
        <FAQItem q="Do I need GPU for these exercises?">No — CPU is fine for everything here.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Baseline</strong> — trivial reference model your solution must beat.</li>
          <li><strong>Pipeline</strong> — chained pre-processing + model with a single fit/predict interface.</li>
          <li><strong>Leakage</strong> — using information at training time that would not be available at prediction time.</li>
          <li><strong>Cross-validation</strong> — repeated train/test splits used to estimate generalisation.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
