import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "tableau-project-guide",
  title: "Tableau — Project Guide",
  category: "Data & Analytics",
  difficulty: "Intermediate",
  readingTime: "23 min",
  pages: 24,
  lastUpdated: "March 2026",
  tags: ["Tableau", "Viz"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle: "This project guide walks you through building a full Tableau analytics project — from raw data to a published, governed executive dashboard.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Tableau Architecture & Analytics Workflow" },
  { id: "catalog", label: "Feature & Chart Catalog" },
  { id: "examples", label: "Practical Examples & Business Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Performance, Governance & Accessibility" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Tableau — Beginner Guide", tag: "Tableau", time: "17 min" },
  { title: "Tableau — Cheat Sheet", tag: "Tableau", time: "5 min" },
  { title: "Tableau — Interview Questions", tag: "Tableau", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/tableau-project-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/tableau-project-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain visual analytics and the role of Tableau in modern business intelligence.</li>
          <li>Connect to data sources, choose live vs extract, and model relationships correctly.</li>
          <li>Build charts, maps, KPI tiles, and interactive dashboards with actions and parameters.</li>
          <li>Write calculated fields, table calculations, and Level of Detail (LOD) expressions.</li>
          <li>Publish to Tableau Cloud/Server with permissions, row-level security, and governance.</li>
          <li>Apply performance, accessibility, and storytelling best practices for executive reporting.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic spreadsheet skills (Excel or Google Sheets) and familiarity with tabular data.</li>
          <li>Comfort reading SQL is helpful but not required.</li>
          <li>Tableau Desktop, Tableau Public, or Tableau Cloud access for hands-on practice.</li>
          <li>A sample dataset — Superstore (bundled) or any CSV from your business.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Business Intelligence Fundamentals</li>
          <li>Core Concepts — Data, Marks, Shelves, Calculations</li>
          <li>Tableau Architecture & Analytics Workflow</li>
          <li>Feature & Chart Catalog</li>
          <li>Practical Examples & Business Use Cases</li>
          <li>Best Practices, Common Mistakes & Tips</li>
          <li>Performance, Governance & Accessibility</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>This project guide walks you through building a full Tableau analytics project — from raw data to a published, governed executive dashboard.</p>
        <Callout tone="info" title="Tableau in one line">Connect to data, drag fields onto shelves, and let Tableau turn tables into interactive, publishable dashboards and stories.</Callout>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80" caption="Figure 1 — A modern Tableau dashboard combining KPI tiles, trends, and geographic analysis for executive reporting." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Data model</b> — logical layer with relationships, physical layer with joins/unions, extracts on the Hyper engine.</li>
          <li><b>Dimensions vs Measures</b> — categorical fields slice the view; numeric measures aggregate.</li>
          <li><b>Marks card</b> — encode data with color, size, shape, label, tooltip, and detail.</li>
          <li><b>Shelves</b> — Rows, Columns, Pages, Filters, and the Marks card drive the visualization grammar.</li>
          <li><b>Calculated fields</b> — row-level and aggregate calcs with IF/CASE, string, date, and logical functions.</li>
          <li><b>Table calculations</b> — running total, difference, percent of total, rank, window functions.</li>
          <li><b>LOD expressions</b> — FIXED, INCLUDE, EXCLUDE for controlling granularity independent of the view.</li>
          <li><b>Parameters, sets, groups, bins, hierarchies</b> — user-controlled inputs and reusable field structures.</li>
          <li><b>Filters</b> — extract, data source, context, dimension, measure, and dashboard filters (order matters).</li>
          <li><b>Actions</b> — filter, highlight, URL, set, parameter, and go-to-sheet dashboard interactions.</li>
          <li><b>Dashboards & Stories</b> — layout containers, device designer, and narrative story points.</li>
          <li><b>Analytics pane</b> — reference lines/bands, trend lines, forecasts, clustering, Explain Data, Ask Data.</li>
          <li><b>Tableau Prep</b> — visual ETL for cleaning, shaping, and outputting analysis-ready data.</li>
          <li><b>Publishing</b> — Tableau Cloud/Server projects, permissions, schedules, extract refresh, subscriptions.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Tableau Architecture & Analytics Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Data Sources           Preparation            Analytics              Delivery
  ├─ Databases           ├─ Tableau Prep         ├─ Tableau Desktop     ├─ Tableau Cloud
  ├─ Cloud (Snowflake,   │   (clean, shape,      │   (build charts,     │   (publish, refresh,
  │   BigQuery, Redshift)│    join, output)      │    calcs, LOD,       │    schedule, share)
  ├─ Files (CSV, Excel)  ├─ Extracts (.hyper)    │    dashboards)       ├─ Tableau Server
  ├─ APIs / Web Data     └─ Live connections     └─ Tableau Public      ├─ Embedded (Embedding API)
  └─ Salesforce / SaaS                                                  └─ Mobile & Reader

Governance ─▶ Row-Level Security · Permissions · Certified data sources · Audit
`}
        </pre>
        <Code lang="sql">{`// Example calculated field — 90-day rolling revenue (LOD)
{ FIXED [Customer ID] : SUM(IF [Order Date] >= TODAY()-90 THEN [Sales] END) }

// Table calculation — running total across time
RUNNING_SUM(SUM([Sales]))

// Parameter-driven KPI
IF [Metric] = "Revenue" THEN SUM([Sales])
ELSEIF [Metric] = "Profit"  THEN SUM([Profit])
END`}</Code>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" caption="Figure 2 — End-to-end analytics workflow — Prep, Desktop, and Cloud combine into a governed BI pipeline." />
      </Section>

      <Section id="catalog" title="Feature & Chart Catalog">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Area</th>
                <th className="py-2 pr-4">Feature / Chart</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Chart</td><td>Bar / Stacked Bar</td><td>Compare categories and part-to-whole breakdowns.</td></tr>
              <tr><td className="py-2 pr-4">Chart</td><td>Line / Area</td><td>Trends over time; multi-series comparisons.</td></tr>
              <tr><td className="py-2 pr-4">Chart</td><td>Scatter / Bubble</td><td>Two-measure correlation with a third size encoding.</td></tr>
              <tr><td className="py-2 pr-4">Chart</td><td>Heat Map / Treemap</td><td>Density and hierarchical part-to-whole views.</td></tr>
              <tr><td className="py-2 pr-4">Chart</td><td>Map (filled, symbol)</td><td>Geographic analysis using built-in geocoding.</td></tr>
              <tr><td className="py-2 pr-4">Chart</td><td>Gantt / Waterfall / Bullet / Box</td><td>Duration, contribution, target vs actual, distribution.</td></tr>
              <tr><td className="py-2 pr-4">Calc</td><td>Calculated Fields</td><td>Row-level and aggregate business logic.</td></tr>
              <tr><td className="py-2 pr-4">Calc</td><td>Table Calculations</td><td>Running total, %-of-total, rank, moving average.</td></tr>
              <tr><td className="py-2 pr-4">Calc</td><td>LOD (FIXED/INCLUDE/EXCLUDE)</td><td>Control granularity independent of the view.</td></tr>
              <tr><td className="py-2 pr-4">Interactivity</td><td>Parameters / Sets / Filters</td><td>User-driven analysis and dynamic dashboards.</td></tr>
              <tr><td className="py-2 pr-4">Interactivity</td><td>Dashboard Actions</td><td>Filter, highlight, URL, and go-to-sheet actions.</td></tr>
              <tr><td className="py-2 pr-4">Analytics</td><td>Trend / Forecast / Cluster / Explain Data</td><td>Built-in statistical and AI-assisted analytics.</td></tr>
              <tr><td className="py-2 pr-4">Platform</td><td>Desktop / Cloud / Server / Public / Prep / Mobile</td><td>Author, publish, share, and consume across the stack.</td></tr>
              <tr><td className="py-2 pr-4">APIs</td><td>REST / Embedding / Extensions / Metadata</td><td>Automate, embed, and extend Tableau in your apps.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Practical Examples & Business Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sales analytics</b> — pipeline funnel, quota attainment, and rep leaderboards on Salesforce data.</li>
          <li><b>Executive KPI dashboard</b> — revenue, margin, NPS, and churn with drill-through to underlying detail.</li>
          <li><b>Marketing</b> — multi-channel attribution, campaign ROI, and cohort retention curves.</li>
          <li><b>Finance</b> — P&amp;L, budget vs actual variance, and cash-flow forecasting with Analytics pane.</li>
          <li><b>Operations</b> — SLA compliance, throughput, and geographic performance on filled maps.</li>
          <li><b>Embedded analytics</b> — customer-facing dashboards inside a SaaS product via the Embedding API.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Model with <b>relationships</b> first; fall back to joins only when semantics require it.</li>
          <li>Prefer <b>extracts</b> for performance; use live connections for real-time or governed sources.</li>
          <li>Choose the chart for the question — bars for comparison, lines for trend, maps for geo.</li>
          <li>Use <b>context filters</b> and data-source filters to shrink the working set early.</li>
          <li>Design mobile-first with device layouts; keep dashboards under ~15 seconds to load.</li>
          <li>Adopt a design system — consistent color palette, typography, and KPI tile pattern.</li>
          <li>Certify data sources, publish to shared projects, and enforce row-level security.</li>
          <li>Version workbooks in Git alongside metadata via the Tableau REST/Metadata APIs.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Dumping 20 charts into one dashboard — cognitive overload; split into a story instead.</li>
          <li>Using row-level calcs where an LOD or table calc would be simpler and faster.</li>
          <li>Left-joining large fact tables in the physical layer when a relationship would do.</li>
          <li>Live-connecting to slow OLTP databases instead of building an extract.</li>
          <li>Publishing personal extracts with embedded credentials — a governance risk.</li>
          <li>Ignoring color accessibility — red/green only, no labels, poor contrast.</li>
          <li>Skipping performance recording; shipping dashboards that time out on real data.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>Ctrl+drag</code> to duplicate a field; double-click a shelf to type a calc inline.</li>
          <li>Hide the "Number of Records" pill; use dedicated measure names in production workbooks.</li>
          <li>Use <b>Show/Hide containers</b> for compact, toggled dashboard sections.</li>
          <li>Record performance with <b>Help → Settings → Performance Recording</b>.</li>
          <li>Use <b>Analytics pane</b> to drop trend lines and forecasts without writing code.</li>
          <li>Prefer <code>INDEX()</code>-based filtering for Top-N calculations that survive filter changes.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Choice</th>
                <th className="py-2 pr-4">Option A</th>
                <th className="py-2 pr-4">Option B</th>
                <th className="py-2">When to Choose</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Connection</td><td>Live</td><td>Extract</td><td>Real-time vs fast Hyper-powered analytics.</td></tr>
              <tr><td className="py-2 pr-4">Modeling</td><td>Relationships</td><td>Joins</td><td>Multi-fact flexibility vs explicit row-level combine.</td></tr>
              <tr><td className="py-2 pr-4">Calc</td><td>Table Calc</td><td>LOD</td><td>View-scoped vs granularity-controlled logic.</td></tr>
              <tr><td className="py-2 pr-4">Delivery</td><td>Tableau Cloud</td><td>Tableau Server</td><td>SaaS-managed vs self-hosted enterprise deploy.</td></tr>
              <tr><td className="py-2 pr-4">Free Tier</td><td>Tableau Public</td><td>Tableau Reader</td><td>Public sharing vs local read-only consumption.</td></tr>
              <tr><td className="py-2 pr-4">BI</td><td>Tableau</td><td>Power BI</td><td>Best-in-class viz vs Microsoft-native ecosystem.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Governance & Accessibility">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — extracts, aggregation, context filters, minimize marks and quick filters.</li>
          <li><b>Governance</b> — certified data sources, projects, permissions, row-level security via user filters.</li>
          <li><b>Security</b> — SSO/SAML, personal access tokens, encrypted extracts, and API scopes.</li>
          <li><b>Accessibility</b> — colorblind-safe palettes, alt text via tooltips, keyboard-friendly navigation.</li>
          <li><b>Cost</b> — right-size Creator/Explorer/Viewer roles; consolidate under Tableau Cloud where possible.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Tableau is the leading visual analytics platform for interactive dashboards and storytelling.</li>
          <li>Master the data model, calculations, and LOD before chasing advanced visuals.</li>
          <li>Design dashboards for a specific decision — not to display every available metric.</li>
          <li>Publish, govern, and secure content on Tableau Cloud/Server to scale insights across the business.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need SQL to use Tableau?">No — but SQL helps you model, tune, and debug data sources.</FAQItem>
        <FAQItem q="Live or Extract?">Extract is faster and more portable; use Live only when freshness is critical and the source is fast.</FAQItem>
        <FAQItem q="Tableau vs Power BI?">Both are excellent. Tableau leads on visualization craft; Power BI wins on Microsoft integration and price.</FAQItem>
        <FAQItem q="Which certification should I aim for?">Start with Tableau Desktop Specialist, then Certified Data Analyst, then Certified Consultant/Architect.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://help.tableau.com/current/pro/desktop/en-us/default.htm" target="_blank" rel="noreferrer">Tableau Desktop Documentation</a> · <a className="text-primary hover:underline" href="https://help.tableau.com/current/online/en-us/default.htm" target="_blank" rel="noreferrer">Tableau Cloud Docs</a> · <a className="text-primary hover:underline" href="https://help.tableau.com/current/server/en-us/default.htm" target="_blank" rel="noreferrer">Tableau Server Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://help.tableau.com/current/prep/en-us/prep_get_started.htm" target="_blank" rel="noreferrer">Tableau Prep</a> · <a className="text-primary hover:underline" href="https://www.tableau.com/learn/blueprint" target="_blank" rel="noreferrer">Tableau Blueprint</a> · <a className="text-primary hover:underline" href="https://public.tableau.com/" target="_blank" rel="noreferrer">Tableau Public</a></li>
          <li><a className="text-primary hover:underline" href="https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm" target="_blank" rel="noreferrer">REST API</a> · <a className="text-primary hover:underline" href="https://help.tableau.com/current/api/embedding_api/en-us/index.html" target="_blank" rel="noreferrer">Embedding API</a> · <a className="text-primary hover:underline" href="https://tableau.github.io/extensions-api/" target="_blank" rel="noreferrer">Extensions API</a> · <a className="text-primary hover:underline" href="https://www.tableau.com/learn/certification" target="_blank" rel="noreferrer">Tableau Certification</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is provided for educational purposes only. Tableau, Tableau Desktop, Tableau Cloud, Tableau Server, Tableau Prep, and Tableau Public are trademarks of Salesforce/Tableau Software. Always consult the official Tableau documentation for the most accurate and up-to-date guidance.</p>
      </Section>
    </ReaderShell>
  );
}
