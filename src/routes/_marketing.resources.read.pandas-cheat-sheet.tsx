import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "pandas-cheat-sheet",
  title: "Pandas — Cheat Sheet",
  category: "Data & Analytics",
  difficulty: "Beginner",
  readingTime: "6 min",
  pages: 2,
  lastUpdated: "February 2026",
  tags: ["Pandas", "Python"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle: 'One-page Pandas cheat sheet — loc/iloc, groupby, merge, pivot, and time series at a glance.',
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
  { id: "considerations", label: "Performance, Memory & Quality" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Pandas — Beginner Guide", tag: "Pandas", time: "11 min" },
  { title: "Pandas — Cheat Sheet", tag: "Pandas", time: "6 min" },
  { title: "Pandas — Interview Questions", tag: "Pandas", time: "31 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/pandas-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/pandas-cheat-sheet" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Cheat Sheet</b> — practical, production-ready Pandas.</li>
          <li>Model tabular data with <code>Series</code> and <code>DataFrame</code>, and index with <code>loc</code> / <code>iloc</code>.</li>
          <li>Clean, transform, and aggregate data with vectorized Pandas operations.</li>
          <li>Load and export data across CSV, Excel, JSON, SQL, Parquet, and cloud storage.</li>
          <li>Build reproducible ETL pipelines and analytics-ready datasets.</li>
          <li>Optimize memory and performance with dtypes, categoricals, and chunking.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with core Python — variables, lists, dictionaries, tuples, functions, and loops.</li>
          <li>Basic NumPy familiarity (arrays, dtypes, broadcasting) is helpful.</li>
          <li>Python 3.10+ and a package manager (<code>pip</code> or <code>conda</code>) installed locally.</li>
          <li>A notebook environment — Jupyter, Google Colab, or VS Code.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Pandas and the PyData ecosystem</li>
          <li>Installation — pip, conda, Jupyter, Colab, and VS Code</li>
          <li>Python prerequisites — variables, lists, dicts, tuples, functions, NumPy</li>
          <li>Core objects — Series, DataFrame, Index, MultiIndex</li>
          <li>Data import & export — CSV, Excel, JSON, SQL, HTML, XML, Parquet, Feather, APIs</li>
          <li>Data exploration — <code>head</code>, <code>tail</code>, <code>info</code>, <code>describe</code>, <code>memory_usage</code></li>
          <li>Selection — <code>loc</code>, <code>iloc</code>, <code>at</code>, <code>iat</code>, boolean indexing, <code>query</code>, <code>isin</code></li>
          <li>Data cleaning — missing values, <code>fillna</code>, <code>dropna</code>, <code>replace</code>, duplicates, strings</li>
          <li>Transformation — <code>apply</code>, <code>map</code>, <code>transform</code>, <code>assign</code>, <code>pipe</code>, lambdas</li>
          <li>Data types — numeric, string, boolean, category, datetime, timedelta, conversion</li>
          <li>Sorting & aggregation — <code>sort_values</code>, <code>rank</code>, <code>sum</code>, <code>mean</code>, <code>value_counts</code></li>
          <li>GroupBy — split-apply-combine, multiple aggregations, transform, filter</li>
          <li>Reshaping — <code>pivot</code>, <code>pivot_table</code>, <code>crosstab</code>, <code>melt</code>, <code>stack</code>, <code>unstack</code></li>
          <li>Merge & join — <code>merge</code>, <code>join</code>, <code>concat</code>, inner / left / right / outer / cross</li>
          <li>String operations — <code>str.contains</code>, <code>str.extract</code>, <code>str.split</code>, regex</li>
          <li>Date & time — Timestamps, Timedelta, time zones, parsing, resampling</li>
          <li>Window functions — rolling, expanding, shift, lag / lead, cumulative operations</li>
          <li>Visualization — line, bar, scatter, histogram, box, area, KDE</li>
          <li>Performance & memory — vectorization, categoricals, chunking, PyArrow backends</li>
          <li>SQL, big data, ML, and cloud integration</li>
          <li>Production — automation, logging, error handling, scheduling, monitoring</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Pandas is the de facto standard for tabular data analysis in Python. It combines a fast, NumPy-backed <code>DataFrame</code> with a rich API for I/O, cleaning, transformation, aggregation, joins, time series, and reshaping — scaling from a first CSV to production ETL pipelines and business analytics dashboards. This resource — <b>Pandas — Cheat Sheet</b> — is self-contained: One-page Pandas cheat sheet — loc/iloc, groupby, merge, pivot, and time series at a glance.</p>
        <Callout tone="info" title="Pandas in one line">Pandas = DataFrame + Series + Index + vectorized ops + I/O — a batteries-included data-analysis toolkit.</Callout>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" caption="Figure 1 — Pandas DataFrame architecture — a labeled 2D table of typed Series columns sharing one Index." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history of Pandas, why Pandas, features, the data-analysis workflow, installation, and notebook environments (Jupyter, Colab, VS Code).</li>
          <li><b>Python prerequisites</b> — variables, lists, dictionaries, tuples, functions, loops, and NumPy basics that Pandas builds on.</li>
          <li><b>Core objects</b> — <code>Series</code>, <code>DataFrame</code>, <code>Index</code>, <code>MultiIndex</code>, columns, rows, and labels.</li>
          <li><b>Data import & export</b> — <code>read_csv</code>, <code>read_excel</code>, <code>read_json</code>, <code>read_sql</code>, <code>read_html</code>, <code>read_xml</code>, <code>read_parquet</code>, <code>read_feather</code>, and REST APIs.</li>
          <li><b>Data exploration</b> — <code>head</code>, <code>tail</code>, <code>sample</code>, <code>shape</code>, <code>info</code>, <code>describe</code>, <code>memory_usage</code>, and <code>dtypes</code>.</li>
          <li><b>Selection & filtering</b> — <code>loc</code>, <code>iloc</code>, <code>at</code>, <code>iat</code>, boolean indexing, <code>query</code>, and <code>isin</code>.</li>
          <li><b>Data cleaning</b> — missing values, <code>fillna</code>, <code>dropna</code>, <code>replace</code>, <code>rename</code>, deduping, string cleaning.</li>
          <li><b>Transformation</b> — <code>apply</code>, <code>map</code>, <code>applymap</code>, <code>transform</code>, <code>assign</code>, <code>pipe</code>, and lambdas.</li>
          <li><b>Data types</b> — numeric, string, boolean, category, datetime, timedelta, and safe conversion with <code>astype</code>.</li>
          <li><b>Sorting & aggregation</b> — <code>sort_values</code>, <code>sort_index</code>, <code>rank</code>, and reducers (<code>sum</code>, <code>mean</code>, <code>median</code>, <code>std</code>, <code>value_counts</code>).</li>
          <li><b>GroupBy</b> — split-apply-combine, multiple aggregations, <code>transform</code>, <code>apply</code>, and <code>filter</code>.</li>
          <li><b>Reshaping</b> — <code>pivot</code>, <code>pivot_table</code>, <code>crosstab</code>, <code>melt</code>, <code>stack</code>, and <code>unstack</code>.</li>
          <li><b>Merge & join</b> — <code>merge</code>, <code>join</code>, <code>concat</code>, inner / left / right / outer / cross joins.</li>
          <li><b>String & regex</b> — <code>str.contains</code>, <code>str.extract</code>, <code>str.replace</code>, and <code>str.split</code>.</li>
          <li><b>Date & time</b> — Timestamps, Timedelta, time zones, parsing, and <code>resample</code>.</li>
          <li><b>Window functions</b> — rolling, expanding, <code>shift</code>, lag / lead, and cumulative ops.</li>
          <li><b>Visualization</b> — line, bar, scatter, histogram, box, area, and KDE via Matplotlib.</li>
          <li><b>Performance</b> — vectorization, memory optimization, chunk processing, and efficient GroupBy.</li>
          <li><b>SQL & databases</b> — SQLAlchemy, PostgreSQL, MySQL, SQLite.</li>
          <li><b>Big data</b> — Dask, Polars, PySpark integration, and chunk reading.</li>
          <li><b>Machine learning</b> — feature engineering, preprocessing, and Scikit-learn pipelines.</li>
          <li><b>Business analytics</b> — sales, finance, marketing, HR, and customer analytics.</li>
          <li><b>Data engineering</b> — ETL / ELT, validation, data quality, and pipelines.</li>
          <li><b>Cloud</b> — AWS S3, Azure Storage, Google Cloud Storage, Snowflake, BigQuery.</li>
          <li><b>Testing & production</b> — assertions, unit tests, logging, error handling, scheduling, monitoring.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Source Systems (CSV / Excel / SQL / API / S3)
        │
        ▼
   [ Extract ]  ── pd.read_csv / read_sql / read_parquet
        │
        ▼
   [ Clean ]    ── fillna / dropna / astype / drop_duplicates
        │
        ▼
   [ Transform ] ── assign / apply / groupby / merge / pivot
        │
        ▼
   [ Validate ] ── schema + assertions + data-quality checks
        │
        ▼
   [ Load ]     ── to_parquet / to_sql / to_csv / BigQuery / S3
        │
        ▼
Analytics / BI / ML / Dashboards`}
        </pre>
        <Code>{`# etl.py — a small, production-shaped Pandas pipeline
import pandas as pd

def extract(path: str) -> pd.DataFrame:
    return pd.read_csv(path, parse_dates=["order_date"])

def clean(df: pd.DataFrame) -> pd.DataFrame:
    return (
        df.dropna(subset=["order_id", "customer_id"])
          .assign(amount=lambda d: d["amount"].fillna(0).astype("float64"))
          .drop_duplicates(subset=["order_id"])
    )

def transform(df: pd.DataFrame) -> pd.DataFrame:
    monthly = (
        df.assign(month=df["order_date"].dt.to_period("M"))
          .groupby(["month", "region"], as_index=False)
          .agg(revenue=("amount", "sum"), orders=("order_id", "nunique"))
    )
    return monthly

def load(df: pd.DataFrame, out: str) -> None:
    df.to_parquet(out, index=False)

if __name__ == "__main__":
    raw = extract("data/orders.csv")
    load(transform(clean(raw)), "out/monthly_sales.parquet")`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1400&q=80" caption="Figure 2 — Enterprise Pandas pipeline — ETL, groupby aggregations, joins, and analytics-ready outputs." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sales analytics</b> — monthly revenue, cohort analysis, and RFM segmentation.</li>
          <li><b>Finance</b> — P&amp;L, reconciliation, time-series risk, and portfolio analytics.</li>
          <li><b>Marketing</b> — campaign attribution, funnel analysis, and A/B test evaluation.</li>
          <li><b>HR analytics</b> — headcount, attrition, and compensation benchmarking.</li>
          <li><b>Customer analytics</b> — churn signals, LTV, and behavior cohorts.</li>
          <li><b>ML feature pipelines</b> — Pandas + Scikit-learn <code>Pipeline</code> for reproducible training data.</li>
        </ul>
        <Code>{`# GroupBy + merge — a classic analytics pattern
import pandas as pd

orders   = pd.read_parquet("orders.parquet")
customers = pd.read_parquet("customers.parquet")

revenue_by_segment = (
    orders.merge(customers[["customer_id", "segment"]], on="customer_id", how="left")
          .assign(month=lambda d: d["order_date"].dt.to_period("M"))
          .groupby(["month", "segment"], as_index=False)
          .agg(revenue=("amount", "sum"),
               aov=("amount", "mean"),
               orders=("order_id", "nunique"))
          .sort_values(["month", "revenue"], ascending=[True, False])
)

# Rolling 3-month revenue per segment
revenue_by_segment["rev_3m"] = (
    revenue_by_segment.groupby("segment")["revenue"]
                      .transform(lambda s: s.rolling(3, min_periods=1).mean())
)`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <b>vectorized</b> Pandas / NumPy operations over Python <code>for</code> loops and <code>iterrows</code>.</li>
          <li>Use <b>method chaining</b> with <code>assign</code> and <code>pipe</code> for readable, testable pipelines.</li>
          <li>Set explicit <b>dtypes</b> at read time (<code>dtype=</code>, <code>parse_dates=</code>) — never rely on inference for production.</li>
          <li>Use <code>category</code> for low-cardinality strings to slash memory and speed up GroupBy.</li>
          <li>Reach for <code>merge</code> with an explicit <code>on=</code> and <code>how=</code> — never rely on positional joins.</li>
          <li>Validate schemas with assertions (or Pandera / Great Expectations) at pipeline boundaries.</li>
          <li>Persist intermediate outputs as <b>Parquet</b>, not CSV, for typed, compressed, columnar reads.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>SettingWithCopyWarning</code> — mutating a slice; use <code>.loc[...]</code> or <code>.copy()</code>.</li>
          <li>Chained assignment like <code>df[df.x &gt; 0]["y"] = 1</code> — use <code>df.loc[df.x &gt; 0, "y"] = 1</code>.</li>
          <li>Looping over rows with <code>iterrows</code> instead of vectorizing.</li>
          <li>Silently coercing dtypes — dates read as strings, numbers as objects.</li>
          <li>Using <code>inplace=True</code> in chains — prefer explicit reassignment.</li>
          <li>Forgetting an <code>on=</code> in <code>merge</code>, producing a Cartesian product.</li>
          <li>Ignoring memory — loading a 10 GB CSV without <code>dtype</code> hints or <code>chunksize</code>.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>df.query("age &gt; 30 and country == 'IN'")</code> for readable filters.</li>
          <li><code>pipe()</code> lets you slot custom functions into a method chain cleanly.</li>
          <li><code>pd.options.mode.copy_on_write = True</code> — safer semantics on modern Pandas.</li>
          <li>Use <code>dtype_backend="pyarrow"</code> in <code>read_csv</code> for faster, typed reads.</li>
          <li><code>groupby(..., observed=True)</code> with categoricals avoids empty group rows.</li>
          <li><code>df.info(memory_usage="deep")</code> reveals the true memory footprint.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Feature / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4"><code>Series</code></td><td>1D labeled array</td><td>Single column or vector of values.</td></tr>
              <tr><td className="py-2 pr-4"><code>DataFrame</code></td><td>2D labeled table</td><td>Any tabular dataset.</td></tr>
              <tr><td className="py-2 pr-4"><code>loc</code> / <code>iloc</code></td><td>Label / position indexing</td><td>Explicit, unambiguous selection.</td></tr>
              <tr><td className="py-2 pr-4"><code>groupby</code></td><td>Split-apply-combine</td><td>Aggregations, cohort analysis, rolling stats.</td></tr>
              <tr><td className="py-2 pr-4"><code>merge</code> / <code>join</code></td><td>Relational joins</td><td>Combining tables on keys.</td></tr>
              <tr><td className="py-2 pr-4"><code>pivot_table</code></td><td>Cross-tab summaries</td><td>Excel-style pivots with aggregations.</td></tr>
              <tr><td className="py-2 pr-4"><code>resample</code></td><td>Time-series bucketing</td><td>Daily → monthly, tick → OHLC, etc.</td></tr>
              <tr><td className="py-2 pr-4">Pandas</td><td>In-memory analytics</td><td>Datasets that fit in RAM.</td></tr>
              <tr><td className="py-2 pr-4">Polars</td><td>Fast columnar DF</td><td>Larger-than-RAM or perf-critical jobs.</td></tr>
              <tr><td className="py-2 pr-4">Dask / PySpark</td><td>Distributed DF</td><td>Big-data pipelines across a cluster.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Memory & Quality">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — vectorize; avoid <code>apply(axis=1)</code> when a NumPy op exists; benchmark with <code>%timeit</code>.</li>
          <li><b>Memory</b> — downcast numerics, convert repeat strings to <code>category</code>, and stream with <code>chunksize</code>.</li>
          <li><b>Quality</b> — validate schemas, assert non-null keys, and log row counts across each ETL stage.</li>
          <li><b>Reproducibility</b> — pin library versions, seed randomness, and persist intermediate Parquet outputs.</li>
          <li><b>Deployment</b> — package pipelines as CLI scripts or notebooks executed via Papermill / Airflow / Prefect.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Pandas is the standard for tabular, in-memory data analysis in Python.</li>
          <li>Model data with <code>Series</code> and <code>DataFrame</code>; index with <code>loc</code> and <code>iloc</code>.</li>
          <li>Prefer vectorized ops, method chaining, and explicit dtypes.</li>
          <li>Master GroupBy, merge, reshaping, and time-series resampling.</li>
          <li>Optimize with categoricals, chunking, and PyArrow-backed dtypes.</li>
          <li>Ship reproducible ETL pipelines that feed analytics, BI, and ML.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Pandas or Polars?">Pandas for the broadest ecosystem and familiarity; Polars for perf-critical or larger-than-RAM jobs.</FAQItem>
        <FAQItem q="Why do I get SettingWithCopyWarning?">You're assigning through a chained slice. Use <code>df.loc[mask, col] = value</code> or work on <code>.copy()</code>.</FAQItem>
        <FAQItem q="How big can Pandas go?">Comfortably GB-scale in RAM. For 10s–100s of GB or clusters, reach for Dask, Polars, or PySpark.</FAQItem>
        <FAQItem q="CSV or Parquet?">Parquet — typed, compressed, columnar, and much faster for repeat reads.</FAQItem>
        <FAQItem q="How do I speed up groupby?">Convert group keys to <code>category</code>, pass <code>observed=True</code>, and use named aggregations.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://pandas.pydata.org/docs/" target="_blank" rel="noreferrer">Pandas Documentation</a> · <a className="text-primary hover:underline" href="https://pandas.pydata.org/docs/reference/index.html" target="_blank" rel="noreferrer">Pandas API Reference</a></li>
          <li><a className="text-primary hover:underline" href="https://numpy.org/doc/" target="_blank" rel="noreferrer">NumPy Docs</a> · <a className="text-primary hover:underline" href="https://docs.python.org/3/" target="_blank" rel="noreferrer">Python Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://jupyter.org/documentation" target="_blank" rel="noreferrer">Jupyter</a> · <a className="text-primary hover:underline" href="https://research.google.com/colaboratory/" target="_blank" rel="noreferrer">Google Colab</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.sqlalchemy.org/" target="_blank" rel="noreferrer">SQLAlchemy</a> · <a className="text-primary hover:underline" href="https://matplotlib.org/stable/contents.html" target="_blank" rel="noreferrer">Matplotlib</a> · <a className="text-primary hover:underline" href="https://seaborn.pydata.org/" target="_blank" rel="noreferrer">Seaborn</a> · <a className="text-primary hover:underline" href="https://scikit-learn.org/stable/documentation.html" target="_blank" rel="noreferrer">Scikit-learn</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Pandas and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
