import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ml-learning-roadmap",
  title: "Machine Learning — Learning Roadmap",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "7 min",
  pages: 7,
  lastUpdated: "June 2026",
  tags: ["Machine Learning", "ML", "Python"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle:
    "A structured 24-week Machine Learning roadmap — exactly what to study, in what order, with weekly milestones, projects, certifications, and readiness checkpoints.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "beginner", label: "1. Beginner Roadmap" },
  { id: "python", label: "2. Python Foundations" },
  { id: "math", label: "3. Mathematics for ML" },
  { id: "data", label: "4. Data Analysis" },
  { id: "algos", label: "5. ML Algorithms" },
  { id: "eval", label: "6. Model Evaluation" },
  { id: "deep", label: "7. Deep Learning Intro" },
  { id: "projects", label: "8. Portfolio Projects" },
  { id: "career", label: "9. Career Preparation" },
  { id: "plan", label: "10. Final Learning Plan" },
  { id: "checklists", label: "Roadmap Review" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
];

const RELATED = [
  { title: "Machine Learning — Frequently Asked Questions", tag: "AI & Data", time: "9 min" },
  { title: "Machine Learning — Tips & Tricks", tag: "AI & Data", time: "11 min" },
  { title: "Machine Learning — Beginner Guide", tag: "AI & Data", time: "12 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ml-learning-roadmap")({
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
  component: MLRoadmapPage,
});

function Milestone({ week, title, tasks }: { week: string; title: string; tasks: string[] }) {
  return (
    <div className="my-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold">{title}</p>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">{week}</span>
      </div>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {tasks.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
}

function MLRoadmapPage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <Callout tone="success" icon={<CheckCircle2 className="h-5 w-5" />} title="What you'll take away">
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Follow a structured 24-week ML learning journey.</li>
            <li>Build skills step-by-step with clear weekly milestones.</li>
            <li>Track progress against measurable checkpoints.</li>
            <li>Ship portfolio-ready projects at each stage.</li>
            <li>Prepare confidently for ML interviews and roles.</li>
          </ul>
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&q=80" caption="Figure 1 — Beginner → Intermediate → Advanced learning path with skill tree and milestone projects." />
      </Section>

      <Section id="beginner" title="1. Beginner Roadmap (Weeks 1–4)">
        <p>Goal: comfort with Python, basic data handling, and one supervised learning demo.</p>
        <Milestone week="Week 1" title="Python essentials" tasks={["Variables, control flow, functions", "Lists, dicts, comprehensions", "Files & error handling"]} />
        <Milestone week="Week 2" title="Data toolkit" tasks={["NumPy arrays & broadcasting", "Pandas Series/DataFrame basics", "Matplotlib line/bar/scatter"]} />
        <Milestone week="Week 3" title="First ML model" tasks={["Scikit-learn Iris classification", "Train/test split, accuracy", "Try Logistic Regression & KNN"]} />
        <Milestone week="Week 4" title="Mini-project" tasks={["Titanic survival prediction on Kaggle", "Write a README with results", "Publish notebook to GitHub"]} />
      </Section>

      <Section id="python" title="2. Python Foundations">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master list/dict/set comprehensions and generators.</li>
          <li>Learn <code>venv</code>/<code>uv</code>/<code>poetry</code> for reproducible envs.</li>
          <li>Adopt <code>ruff</code> + <code>black</code> for formatting/linting.</li>
        </ul>
        <Code>{`# Reusable train helper
from sklearn.model_selection import cross_val_score
def cv_score(model, X, y, cv=5):
    return cross_val_score(model, X, y, cv=cv, scoring="accuracy").mean()`}</Code>
      </Section>

      <Section id="math" title="3. Mathematics for ML (Weeks 5–8)">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Linear algebra:</strong> vectors, matrices, dot product, matrix inverse.</li>
          <li><strong>Calculus:</strong> derivatives, gradients, chain rule (enough for gradient descent).</li>
          <li><strong>Probability &amp; statistics:</strong> distributions, Bayes' theorem, expectation, variance.</li>
          <li><strong>Optimisation:</strong> convex vs non-convex, learning rate intuition.</li>
        </ul>
      </Section>

      <Section id="data" title="4. Data Analysis (Weeks 9–10)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Exploratory Data Analysis: distributions, correlations, missingness.</li>
          <li>Data cleaning: null handling, outliers, type conversions.</li>
          <li>SQL basics — SELECT/JOIN/GROUP BY — most jobs still expect it.</li>
        </ul>
      </Section>

      <Section id="algos" title="5. ML Algorithms (Weeks 11–14)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Linear/Logistic Regression, Decision Trees, Random Forest, Gradient Boosting.</li>
          <li>K-Means, PCA, DBSCAN for unsupervised learning.</li>
          <li>Understand when to pick each — no free lunch.</li>
        </ul>
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60"><tr><th className="p-2">Stage</th><th className="p-2">Focus</th><th className="p-2">Deliverable</th></tr></thead>
            <tbody className="[&_tr]:border-t [&_tr]:border-border/60">
              <tr><td className="p-2">Beginner</td><td className="p-2">Supervised basics</td><td className="p-2">Titanic + Housing notebooks</td></tr>
              <tr><td className="p-2">Intermediate</td><td className="p-2">Ensembles + tuning</td><td className="p-2">Kaggle silver submission</td></tr>
              <tr><td className="p-2">Advanced</td><td className="p-2">Deep learning + MLOps</td><td className="p-2">Deployed live app</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="eval" title="6. Model Evaluation (Weeks 15–16)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cross-validation, confusion matrix, ROC-AUC, PR-AUC.</li>
          <li>Bias–variance analysis — learning curves.</li>
          <li>Slice-based evaluation for fairness.</li>
        </ul>
      </Section>

      <Section id="deep" title="7. Deep Learning Introduction (Weeks 17–20)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Neural network basics with PyTorch or Keras.</li>
          <li>CNNs for images, RNN/Transformer intuition for sequences.</li>
          <li>Transfer learning — fine-tune a pre-trained model on your data.</li>
        </ul>
      </Section>

      <Section id="projects" title="8. Portfolio Projects (Weeks 21–22)">
        <ul className="list-disc space-y-1 pl-5">
          <li>End-to-end: dataset → model → FastAPI → Streamlit UI → deployed on Render/Fly.</li>
          <li>Pick a domain: healthcare, finance, retail, sport, education.</li>
          <li>Include monitoring + a README that reads like a case study.</li>
        </ul>
        <Callout tone="tip" title="Recommended courses & certifications">
          Andrew Ng — Machine Learning Specialization (Coursera) · DeepLearning.AI — Deep Learning Specialization · Kaggle Learn micro-courses ·
          Google Cloud ML Engineer · AWS Machine Learning Specialty.
        </Callout>
      </Section>

      <Section id="career" title="9. Career Preparation (Weeks 23–24)">
        <ul className="list-disc space-y-1 pl-5">
          <li>Polish LinkedIn + GitHub — pin your top 3 projects.</li>
          <li>Practice ML system design and 50 core interview questions.</li>
          <li>Mock interviews weekly; track answers you missed.</li>
        </ul>
      </Section>

      <Section id="plan" title="10. Final Learning Plan">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Daily:</strong> 60 min coding + 20 min reading.</li>
          <li><strong>Weekly:</strong> one Kaggle notebook / mini-project.</li>
          <li><strong>Monthly:</strong> one polished portfolio artefact + retrospective.</li>
        </ul>
      </Section>

      <Section id="checklists" title="Roadmap Review — Checklists">
        <h3 className="font-semibold">Beginner Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfortable with Python, NumPy, Pandas, Matplotlib.</li>
          <li>Trained &amp; evaluated at least 3 Scikit-learn models.</li>
          <li>Published 2 notebooks to GitHub with clear READMEs.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Intermediate Checklist</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Tuned XGBoost / LightGBM to top-25% Kaggle score.</li>
          <li>Wrote unit tests for feature pipelines.</li>
          <li>Deployed one model behind FastAPI.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Advanced Learning Goals</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Fine-tuned a transformer for a real dataset.</li>
          <li>Shipped a monitored production model with rollback.</li>
          <li>Contributed to an open-source ML library.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Final Success Plan</h3>
        <p>Ship one live app. Write one detailed case study. Complete 50 interview questions with confidence ≥ 4/5.</p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Consistency beats intensity — a steady 24 weeks outperforms bursts.</li>
          <li>Projects &gt; certificates. Ship things that others can use.</li>
          <li>Fundamentals compound — invest in maths &amp; evaluation early.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Can I skip the maths?">Not entirely — invest a light 4-week pass and revisit as you meet each topic.</FAQItem>
        <FAQItem q="How many projects for a portfolio?">Three great ones beat ten mediocre ones. Include one end-to-end deployed project.</FAQItem>
        <FAQItem q="Which certification is best?">Andrew Ng's Coursera specialisation for fundamentals; a cloud ML cert (GCP/AWS) for jobs.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Roadmap</strong> — a sequenced learning plan with milestones.</li>
          <li><strong>Milestone</strong> — a measurable checkpoint.</li>
          <li><strong>Portfolio</strong> — a public collection of your work.</li>
          <li><strong>Kaggle</strong> — an online competition &amp; dataset platform.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>
    </ReaderShell>
  );
}
