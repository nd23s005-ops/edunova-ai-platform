import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "data-analytics-reference-guide",
  title: "Data Analytics — Reference Guide",
  category: "Data & Analytics",
  difficulty: "Beginner",
  readingTime: "59 min",
  pages: 47,
  lastUpdated: "October 2026",
  tags: ["Analytics", "SQL"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle: 'The exhaustive Data Analytics reference — SQL, Excel, Pandas, Power BI, Tableau, and BigQuery.',
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Governance, Performance & Deployment" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Data Analytics — Beginner Guide", tag: "Analytics", time: "10 min" },
  { title: "Data Analytics — Cheat Sheet", tag: "SQL", time: "4 min" },
  { title: "Data Analytics — Interview Questions", tag: "Analytics", time: "27 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/data-analytics-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/data-analytics-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Reference Guide</b> — practical, business-ready Data Analytics.</li>
          <li>Move confidently across the four analytics types — descriptive, diagnostic, predictive, and prescriptive.</li>
          <li>Use Excel, SQL, and Python (Pandas / NumPy) to clean, transform, and analyze data.</li>
          <li>Design KPIs and build executive dashboards in Power BI, Tableau, and Looker Studio.</li>
          <li>Model warehouses with star / snowflake schemas and run ETL / ELT pipelines.</li>
          <li>Communicate insights through storytelling that drives decisions.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Working knowledge of spreadsheets and comfort with the terminal.</li>
          <li>Basic SQL is helpful but not required — the resource introduces it.</li>
          <li>A Python 3.11+ install with Pandas, NumPy, Matplotlib, and Jupyter.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction — analytics types, lifecycle, CRISP-DM, KPIs</li>
          <li>Excel — tables, pivot tables, XLOOKUP, Power Query, dashboards</li>
          <li>SQL — SELECT, joins, GROUP BY, CTEs, window functions, tuning</li>
          <li>Python — variables, functions, modules, virtualenv, Jupyter</li>
          <li>NumPy — arrays, broadcasting, vectorization, stats</li>
          <li>Pandas — DataFrames, cleaning, merge, GroupBy, time series</li>
          <li>Data cleaning — missing values, duplicates, outliers, encoding</li>
          <li>Statistics — mean, variance, correlation, regression, hypothesis tests</li>
          <li>Visualization — Matplotlib, Seaborn, Plotly, Excel charts, storytelling</li>
          <li>BI — Power BI, Tableau, Looker Studio, executive dashboards, KPI reporting</li>
          <li>Reporting — business, executive, automated, financial, operational</li>
          <li>Data warehousing — lake, warehouse, ETL/ELT, star / snowflake, OLAP</li>
          <li>Big data — Hadoop, Spark, PySpark, Kafka, data pipelines</li>
          <li>Cloud analytics — BigQuery, Snowflake, Synapse, Redshift, Databricks</li>
          <li>Machine learning basics — regression, classification, clustering, forecasting</li>
          <li>Automation — Python + Excel + ETL + scheduled reports</li>
          <li>Data governance — quality, privacy, security, GDPR, catalogs</li>
          <li>Testing, validation, and performance optimization</li>
          <li>AI for analytics — OpenAI, Gemini, natural-language dashboards</li>
          <li>Real-world projects — sales, HR, marketing, finance, retail, e-commerce</li>
          <li>Career roadmap — Data / Business / BI / Product / Marketing analyst</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Data Analytics turns raw business data into the <b>numbers, charts, and stories</b> that drive decisions — from board-room dashboards to marketing experiments and supply-chain optimizations. It sits at the intersection of <b>Excel, SQL, Python, statistics, and business intelligence</b>. This resource — <b>Data Analytics — Reference Guide</b> — is self-contained: The exhaustive Data Analytics reference — SQL, Excel, Pandas, Power BI, Tableau, and BigQuery.</p>
        <Callout tone="info" title="Data Analytics in one line">Analytics = ask a business question → collect + clean data → analyze → visualize → tell the story → decide → measure impact.</Callout>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" caption="Figure 1 — The analytics lifecycle — business question, data prep, analysis, dashboard, decision, and measurement." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Types of analytics</b> — descriptive (what happened), diagnostic (why), predictive (what will), prescriptive (what to do).</li>
          <li><b>Lifecycle</b> — CRISP-DM: business understanding → data → prep → modeling → evaluation → deployment.</li>
          <li><b>Excel</b> — tables, pivot tables, XLOOKUP / INDEX-MATCH, Power Query, Power Pivot, dashboards.</li>
          <li><b>SQL</b> — SELECT, WHERE, GROUP BY, HAVING, joins, UNION, subqueries, CTEs, window functions, views, stored procs, tuning.</li>
          <li><b>Python</b> — variables, functions, OOP, modules, virtual environments, Jupyter / Colab.</li>
          <li><b>NumPy</b> — ndarrays, broadcasting, vectorized ops, matrix operations, ufuncs, statistics.</li>
          <li><b>Pandas</b> — Series, DataFrames, IO, filtering, merge / join, GroupBy, pivot tables, time series.</li>
          <li><b>Cleaning</b> — missing values, duplicates, outliers, transformation, standardization, validation, feature engineering.</li>
          <li><b>Statistics</b> — mean / median / mode, variance, standard deviation, probability, correlation, regression, hypothesis tests, CIs.</li>
          <li><b>Visualization</b> — Matplotlib, Seaborn, Plotly, Power BI, Tableau, Excel charts, interactive dashboards, storytelling.</li>
          <li><b>BI</b> — Power BI, Tableau, Looker Studio, executive dashboards, KPI reporting, performance monitoring, scorecards.</li>
          <li><b>Reporting</b> — business, executive, automated, KPI, financial, operational reports.</li>
          <li><b>Warehousing</b> — data warehouse vs data lake, ETL vs ELT, star / snowflake schemas, OLAP vs OLTP.</li>
          <li><b>Big data</b> — Hadoop, Spark, PySpark, Kafka, distributed compute, pipelines.</li>
          <li><b>Cloud analytics</b> — Google BigQuery, Snowflake, Azure Synapse, AWS Redshift, Databricks.</li>
          <li><b>ML basics</b> — regression, classification, clustering, forecasting, recommenders with scikit-learn.</li>
          <li><b>Automation</b> — Python + Excel automation, ETL orchestration, scheduled reports.</li>
          <li><b>Governance</b> — data quality, privacy, security, GDPR, catalog, metadata management.</li>
          <li><b>Testing</b> — data validation, unit tests, QA, error detection, monitoring.</li>
          <li><b>Performance</b> — SQL / query / dashboard optimization, data modeling, caching.</li>
          <li><b>AI for analytics</b> — generative AI, OpenAI + Gemini APIs, AI dashboards, NL analytics, AI reporting.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Source Systems (CRM, ERP, Web, App, Files, APIs)
   │
   ▼
[ Ingest ] → ETL / ELT (Airflow, dbt, Fivetran, Power Query)
   │
   ▼
[ Storage ] → Data Lake (S3 / ADLS / GCS) + Warehouse (BigQuery / Snowflake / Redshift / Synapse)
   │
   ▼
[ Model ] → Star / Snowflake schema, dimensions + facts, dbt models
   │
   ▼
[ Analyze ] → SQL / Pandas / Python — cleaning, KPIs, aggregations, statistics
   │
   ▼
[ Visualize ] → Power BI / Tableau / Looker Studio dashboards + reports
   │
   ▼
[ Decide ] → Executive review → action → measure impact → iterate`}
        </pre>
        <Code lang="sql">{`-- Monthly revenue + YoY growth using window functions
WITH monthly AS (
  SELECT date_trunc('month', order_date) AS month,
         SUM(amount) AS revenue
  FROM orders
  WHERE status = 'paid'
  GROUP BY 1
)
SELECT month,
       revenue,
       LAG(revenue, 12) OVER (ORDER BY month) AS revenue_last_year,
       ROUND(100.0 * (revenue - LAG(revenue, 12) OVER (ORDER BY month))
             / NULLIF(LAG(revenue, 12) OVER (ORDER BY month), 0), 2) AS yoy_pct
FROM monthly
ORDER BY month;`}</Code>
        <Code lang="python">{`# Pandas — clean, aggregate, and export a KPI report
import pandas as pd

df = pd.read_csv("sales.csv", parse_dates=["order_date"])
df = df.drop_duplicates().dropna(subset=["customer_id", "amount"])
df["month"] = df["order_date"].dt.to_period("M")

kpi = (df.groupby(["month", "region"])
         .agg(revenue=("amount", "sum"),
              orders=("order_id", "nunique"),
              aov=("amount", "mean"))
         .reset_index())

kpi["revenue_mom_pct"] = kpi.groupby("region")["revenue"].pct_change() * 100
kpi.to_excel("kpi_report.xlsx", index=False)`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=80" caption="Figure 2 — KPI dashboard blueprint — data pipeline, semantic layer, dashboard, and executive story." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sales dashboard</b> — revenue, AOV, conversion, and pipeline in Power BI.</li>
          <li><b>Customer analytics</b> — RFM segmentation, churn, and LTV in SQL + Pandas.</li>
          <li><b>HR analytics</b> — attrition, hiring funnel, and diversity KPIs.</li>
          <li><b>Marketing analytics</b> — campaign attribution, CAC, ROAS, cohort retention.</li>
          <li><b>Financial dashboard</b> — P&amp;L, budget vs actual, cash-flow forecasting.</li>
          <li><b>Supply-chain analytics</b> — on-time delivery, inventory turns, demand forecasting.</li>
          <li><b>Retail &amp; e-commerce</b> — basket analysis, product mix, price elasticity.</li>
          <li><b>Healthcare / banking</b> — regulatory KPIs, fraud detection, risk scoring.</li>
          <li><b>Social media analytics</b> — reach, engagement, sentiment, funnel to conversion.</li>
        </ul>
        <Code lang="python">{`# Quick EDA snippet for a new dataset
import pandas as pd
df = pd.read_csv("customers.csv")
print(df.info())
print(df.describe(include="all"))
print(df.isna().mean().sort_values(ascending=False).head())`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Start with the <b>business question and decision</b>, not the data or the chart.</li>
          <li>Define KPIs with owners, formulas, and thresholds; keep a single source of truth.</li>
          <li>Model warehouses with clear dimensions + facts (Kimball) or dbt-style layers (staging / marts).</li>
          <li>Automate ingestion with Airflow / dbt / Fivetran — never manually refresh critical reports.</li>
          <li>Validate data at every hop: row counts, freshness, referential integrity, and business rules.</li>
          <li>Design dashboards top-down: headline KPIs → drivers → drill-downs; hide detail behind clicks.</li>
          <li>Use color intentionally, avoid 3D charts, and label axes; accessibility matters.</li>
          <li>Version SQL and dashboards in Git; treat analytics code like production code.</li>
          <li>Document metrics in a catalog so business users share vocabulary with analysts.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Dirty data</b> — building dashboards on unvalidated inputs.</li>
          <li><b>Wrong KPI</b> — measuring activity (clicks) instead of outcomes (revenue).</li>
          <li><b>Wrong aggregation</b> — averaging averages, ignoring weights.</li>
          <li><b>Selection bias</b> — filtering data in ways that flatter the conclusion.</li>
          <li><b>SQL errors</b> — implicit joins exploding row counts; NULLs in aggregates.</li>
          <li><b>Dashboard clutter</b> — too many KPIs on one page; no headline number.</li>
          <li><b>Poor visualization</b> — 3D pies, dual axes, and rainbow palettes.</li>
          <li>Skipping documentation — future analysts can't trust or reuse the report.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>QUALIFY</code> (Snowflake / BigQuery) to filter window results without a subquery.</li>
          <li>In Pandas, prefer <code>merge</code> + <code>groupby.agg</code> over row-wise loops — 10-100× faster.</li>
          <li>In Excel, learn <code>XLOOKUP</code>, <code>LET</code>, <code>LAMBDA</code>, and dynamic arrays; retire <code>VLOOKUP</code>.</li>
          <li>Wrap SQL in dbt models; ref() gives you lineage and tests for free.</li>
          <li>Cache expensive queries in materialized views or dbt <code>incremental</code> models.</li>
          <li>Always add a "How to read this dashboard" tooltip for exec audiences.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Concept / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Excel vs Pandas</td><td>Tabular analysis</td><td>Excel for &lt;1M rows and business users; Pandas for automation + scale.</td></tr>
              <tr><td className="py-2 pr-4">SQL vs Pandas</td><td>Data manipulation</td><td>SQL near the warehouse; Pandas for local, iterative analysis.</td></tr>
              <tr><td className="py-2 pr-4">Power BI vs Tableau</td><td>BI dashboards</td><td>Power BI in Microsoft shops; Tableau for advanced visual design.</td></tr>
              <tr><td className="py-2 pr-4">Warehouse vs Lake</td><td>Storage</td><td>Warehouse for BI + SQL; lake for raw + ML; lakehouse blends both.</td></tr>
              <tr><td className="py-2 pr-4">ETL vs ELT</td><td>Pipelines</td><td>ELT for cloud warehouses (transform in-warehouse); ETL for legacy.</td></tr>
              <tr><td className="py-2 pr-4">OLTP vs OLAP</td><td>Workloads</td><td>OLTP for transactions; OLAP for analytics + aggregations.</td></tr>
              <tr><td className="py-2 pr-4">Star vs Snowflake schema</td><td>Modeling</td><td>Star for simplicity + speed; snowflake for normalized dimensions.</td></tr>
              <tr><td className="py-2 pr-4">BigQuery vs Snowflake</td><td>Cloud warehouse</td><td>BigQuery for GCP + serverless; Snowflake for multi-cloud + governance.</td></tr>
              <tr><td className="py-2 pr-4">Descriptive vs Predictive</td><td>Analytics type</td><td>Descriptive for reporting; predictive for forecasts + ML.</td></tr>
              <tr><td className="py-2 pr-4">Dashboards vs Reports</td><td>Delivery</td><td>Dashboards for monitoring; reports for narrative + decision docs.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Governance, Performance & Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Governance</b> — data catalog (DataHub / Collibra), owners, glossary, access reviews.</li>
          <li><b>Privacy</b> — GDPR / DPDP / HIPAA compliance, PII masking, row-level security.</li>
          <li><b>Quality</b> — dbt tests, Great Expectations, freshness monitors, anomaly alerts.</li>
          <li><b>Performance</b> — partition + cluster warehouse tables, use materialized views, prune columns.</li>
          <li><b>Deployment</b> — CI for SQL + dbt, dashboard versioning, staging → prod promotion.</li>
          <li><b>Observability</b> — pipeline SLAs, dashboard load times, KPI drift alerts.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Data Analytics is a lifecycle — question → data → analysis → dashboard → decision → impact.</li>
          <li>Master the trio: Excel for business, SQL for the warehouse, Python for scale + automation.</li>
          <li>Design KPIs and dashboards for decisions, not decoration.</li>
          <li>Model warehouses cleanly and automate ETL / ELT so reports are always fresh.</li>
          <li>Guard against dirty data, wrong aggregations, and misleading visuals.</li>
          <li>Cloud warehouses + BI tools + AI copilots are the modern analytics stack.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need to code to do Data Analytics?">No — many analysts thrive with Excel + SQL + BI tools. Python unlocks automation and scale, but isn't a hard requirement.</FAQItem>
        <FAQItem q="Data Analyst vs Data Scientist?">Analysts focus on business KPIs, dashboards, and reporting. Data Scientists build predictive models and ML systems on top of that data.</FAQItem>
        <FAQItem q="Power BI or Tableau?">Both are excellent. Power BI is cheaper and dominant in Microsoft-heavy orgs; Tableau leads on visual design and analyst UX.</FAQItem>
        <FAQItem q="How important is SQL?">Essential — SQL is the shared language of every warehouse and BI tool. Aim for CTEs, window functions, and query tuning.</FAQItem>
        <FAQItem q="Is AI replacing Data Analysts?">No — AI copilots speed up SQL, EDA, and narration, but analysts still frame problems, validate data, and drive decisions.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://support.microsoft.com/excel" target="_blank" rel="noreferrer">Microsoft Excel</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/power-bi/" target="_blank" rel="noreferrer">Power BI</a> · <a className="text-primary hover:underline" href="https://help.tableau.com/" target="_blank" rel="noreferrer">Tableau</a></li>
          <li><a className="text-primary hover:underline" href="https://dev.mysql.com/doc/" target="_blank" rel="noreferrer">MySQL</a> · <a className="text-primary hover:underline" href="https://www.postgresql.org/docs/" target="_blank" rel="noreferrer">PostgreSQL</a> · <a className="text-primary hover:underline" href="https://docs.python.org/3/" target="_blank" rel="noreferrer">Python</a></li>
          <li><a className="text-primary hover:underline" href="https://pandas.pydata.org/docs/" target="_blank" rel="noreferrer">Pandas</a> · <a className="text-primary hover:underline" href="https://numpy.org/doc/" target="_blank" rel="noreferrer">NumPy</a> · <a className="text-primary hover:underline" href="https://spark.apache.org/docs/latest/" target="_blank" rel="noreferrer">Apache Spark</a></li>
          <li><a className="text-primary hover:underline" href="https://cloud.google.com/bigquery/docs" target="_blank" rel="noreferrer">Google BigQuery</a> · <a className="text-primary hover:underline" href="https://docs.snowflake.com/" target="_blank" rel="noreferrer">Snowflake</a> · <a className="text-primary hover:underline" href="https://lookerstudio.google.com/" target="_blank" rel="noreferrer">Looker Studio</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is for educational purposes only. All product and platform names are trademarks of their respective owners. Always validate KPIs and data pipelines against your own business context before making decisions.</p>
      </Section>
    </ReaderShell>
  );
}
