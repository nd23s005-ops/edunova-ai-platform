import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "power-bi-real-world-case-study",
  title: "Power BI — Real-world Case Study",
  category: "Data & Analytics",
  difficulty: "Intermediate",
  readingTime: "16 min",
  pages: 33,
  lastUpdated: "July 2026",
  tags: ["Power BI", "DAX"],
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80",
  heroSubtitle: "Real-world Power BI case studies across sales, finance, marketing, HR, healthcare, retail, and manufacturing analytics.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Power BI Architecture & ETL Workflow" },
  { id: "catalog", label: "Feature & DAX Catalog" },
  { id: "examples", label: "Practical Examples & Industry Use Cases" },
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
  { title: "Power BI — Beginner Guide", tag: "Power BI", time: "14 min" },
  { title: "Power BI — Cheat Sheet", tag: "Power BI", time: "4 min" },
  { title: "Power BI — Interview Questions", tag: "Power BI", time: "42 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/power-bi-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/power-bi-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain BI fundamentals and where Power BI Desktop, Service, and Mobile fit in.</li>
          <li>Ingest data with Power Query — connectors, transformations, and the M language.</li>
          <li>Design star-schema data models with correct relationships and cardinality.</li>
          <li>Write DAX measures using filter context, row context, variables, and time intelligence.</li>
          <li>Build reports and dashboards with drill-through, bookmarks, tooltips, and AI visuals.</li>
          <li>Publish to the Power BI Service with workspaces, apps, RLS, gateways, and deployment pipelines.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic spreadsheet skills (Excel) and comfort with tabular data.</li>
          <li>Reading SQL is helpful but not required.</li>
          <li>Power BI Desktop installed and a Power BI Service account (Free/Pro/PPU).</li>
          <li>A sample dataset — Contoso, AdventureWorks, or any CSV/Excel from your business.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Business Intelligence Fundamentals</li>
          <li>Core Concepts — Power Query, Modeling, DAX, Visuals</li>
          <li>Power BI Architecture & ETL Workflow</li>
          <li>Feature & DAX Catalog</li>
          <li>Practical Examples & Industry Use Cases</li>
          <li>Best Practices, Common Mistakes & Tips</li>
          <li>Performance, Governance & Accessibility</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Real-world Power BI case studies across sales, finance, marketing, HR, healthcare, retail, and manufacturing analytics.</p>
        <Callout tone="info" title="Power BI in one line">Connect data with Power Query, model it as a star schema, write DAX, and publish interactive reports to the Power BI Service.</Callout>
        <Figure src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80" caption="Figure 1 — A modern Power BI dashboard combining KPI cards, trends, and slicers for executive reporting." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Ecosystem</b> — Power BI Desktop (author), Service (publish/share), Mobile, Report Builder (paginated), and Microsoft Fabric/OneLake.</li>
          <li><b>Storage modes</b> — Import (VertiPaq), DirectQuery, Live Connection, and Composite Models with aggregations.</li>
          <li><b>Power Query &amp; M</b> — connectors, applied steps, data profiling, cleaning, shaping, merging, appending.</li>
          <li><b>Data modeling</b> — star schema, snowflake, facts and dimensions, relationships, cardinality, cross-filter direction.</li>
          <li><b>DAX</b> — measures, calculated columns, calculated tables, variables, filter context vs row context, CALCULATE.</li>
          <li><b>Time intelligence</b> — a proper date table plus DATEADD, SAMEPERIODLASTYEAR, TOTALYTD, DATESINPERIOD.</li>
          <li><b>Visuals</b> — cards, KPIs, tables, matrix, charts, maps, custom visuals, and AI visuals (Q&amp;A, Key Influencers, Decomposition Tree).</li>
          <li><b>Interactivity</b> — slicers, filters, drill down/through, bookmarks, tooltips, sync slicers, buttons.</li>
          <li><b>Semantic models</b> — shared datasets, XMLA endpoints, incremental refresh, on-premises data gateway.</li>
          <li><b>Governance</b> — workspaces, apps, deployment pipelines, sensitivity labels, RLS/OLS, endorsements.</li>
          <li><b>Fabric &amp; OneLake</b> — lakehouses, warehouses, Direct Lake mode, and unified semantic model.</li>
          <li><b>Integrations</b> — Excel, SQL Server, Azure, Dataverse, SharePoint, Teams, and the Power BI REST API.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Power BI Architecture & ETL Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Sources               Power Query (ETL)          Model (Star Schema)         Reports & Service
  ├─ SQL Server         ├─ Connect (100+)          ┌─ Fact_Sales ─┐            ├─ Power BI Desktop
  ├─ Azure / Synapse    ├─ Transform (M)           │  ├─ DateKey  │            ├─ Reports & Dashboards
  ├─ Excel / CSV        ├─ Merge / Append          │  ├─ ProdKey  │            ├─ Power BI Service
  ├─ SharePoint         └─ Load                    │  └─ CustKey  │            ├─ Apps / Workspaces
  ├─ Dataverse                                     │              │            ├─ Mobile / Embedded
  └─ Fabric / OneLake                              ├─ Dim_Date    │            └─ Paginated (Report Builder)
                                                   ├─ Dim_Product │
                                                   └─ Dim_Customer┘
                                                          │
                                                    DAX Measures
                                                          │
Governance ─▶ RLS/OLS · Sensitivity · Workspaces · Deployment Pipelines · Gateway · Audit
`}
        </pre>
        <Code lang="sql">{`// DAX — core measures
Total Sales     := SUM ( 'Fact_Sales'[Amount] )
YoY Sales %     :=
VAR curr = [Total Sales]
VAR prev = CALCULATE ( [Total Sales], SAMEPERIODLASTYEAR ( 'Dim_Date'[Date] ) )
RETURN DIVIDE ( curr - prev, prev )

// Time intelligence — Year-to-Date
Sales YTD := TOTALYTD ( [Total Sales], 'Dim_Date'[Date] )

// Row-Level Security — filter fact by user's region
[Region] = LOOKUPVALUE ( 'Sec_Users'[Region], 'Sec_Users'[Email], USERPRINCIPALNAME () )`}</Code>
        <Figure src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80" caption="Figure 2 — End-to-end Power BI workflow — Power Query, star-schema modeling, DAX, and governed publishing." />
      </Section>

      <Section id="catalog" title="Feature & DAX Catalog">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Area</th>
                <th className="py-2 pr-4">Feature / Function</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">ETL</td><td>Power Query / M</td><td>Connect, clean, and shape data before load.</td></tr>
              <tr><td className="py-2 pr-4">Model</td><td>Star Schema / Relationships</td><td>Facts + dimensions with 1-to-many, single-direction.</td></tr>
              <tr><td className="py-2 pr-4">Model</td><td>Composite / Aggregations</td><td>Blend Import + DirectQuery for scale.</td></tr>
              <tr><td className="py-2 pr-4">DAX</td><td>CALCULATE / FILTER</td><td>Modify filter context for measures.</td></tr>
              <tr><td className="py-2 pr-4">DAX</td><td>SUMX / AVERAGEX / RANKX</td><td>Iterator functions with row context.</td></tr>
              <tr><td className="py-2 pr-4">DAX</td><td>Time Intelligence</td><td>YTD, MTD, YoY, moving averages on a Date table.</td></tr>
              <tr><td className="py-2 pr-4">Visuals</td><td>KPI / Card / Matrix / Line / Map</td><td>Executive dashboards and operational reports.</td></tr>
              <tr><td className="py-2 pr-4">AI Visuals</td><td>Q&amp;A / Key Influencers / Decomposition Tree</td><td>Natural-language and driver analysis.</td></tr>
              <tr><td className="py-2 pr-4">Interactivity</td><td>Slicers / Bookmarks / Drill-through</td><td>Guided, self-service exploration.</td></tr>
              <tr><td className="py-2 pr-4">Security</td><td>RLS / OLS / Sensitivity Labels</td><td>Row- and object-level access control.</td></tr>
              <tr><td className="py-2 pr-4">Ops</td><td>Gateway / Incremental Refresh / Deployment Pipelines</td><td>Enterprise refresh and dev→test→prod.</td></tr>
              <tr><td className="py-2 pr-4">Fabric</td><td>OneLake / Direct Lake / Warehouse</td><td>Unified data platform under Microsoft Fabric.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Practical Examples & Industry Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Sales analytics</b> — pipeline, quota attainment, and territory dashboards with YoY DAX.</li>
          <li><b>Financial reporting</b> — P&amp;L, budget vs actual, and cash-flow with time intelligence.</li>
          <li><b>Marketing</b> — campaign ROI, funnel, and multi-channel attribution.</li>
          <li><b>HR analytics</b> — headcount, attrition, DEI, and compensation dashboards with OLS.</li>
          <li><b>Manufacturing</b> — OEE, downtime, and yield on IoT streams via Fabric/OneLake.</li>
          <li><b>Healthcare &amp; Retail</b> — patient outcomes, inventory, and store performance dashboards.</li>
          <li><b>Executive apps</b> — packaged workspaces distributed as Power BI Apps to leadership.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Design a proper <b>star schema</b> — avoid single flat tables and bi-directional relationships.</li>
          <li>Prefer <b>measures</b> over calculated columns; keep DAX close to the visual.</li>
          <li>Use a dedicated, marked <b>Date table</b> for time intelligence.</li>
          <li>Push transformations upstream (SQL/Fabric) when possible; keep Power Query for shaping.</li>
          <li>Turn on <b>incremental refresh</b> for large fact tables; monitor with DAX Studio/Performance Analyzer.</li>
          <li>Ship via <b>deployment pipelines</b> (dev → test → prod) and version .pbip in Git.</li>
          <li>Apply <b>RLS/OLS</b>, sensitivity labels, and workspace roles for governance.</li>
          <li>Design accessible reports — contrast, alt text, keyboard navigation, and colorblind-safe palettes.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Loading one wide table instead of modeling a star schema.</li>
          <li>Turning on bi-directional cross-filtering everywhere — ambiguous paths, slow refresh.</li>
          <li>Using calculated columns for values that should be measures.</li>
          <li>Skipping the Date table and using auto date/time hierarchies in production.</li>
          <li>DirectQuery over slow OLTP databases without aggregations — poor performance.</li>
          <li>Publishing personal workspaces instead of using shared workspaces and Apps.</li>
          <li>Storing secrets in reports; ignoring gateways, sensitivity labels, and RLS.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <b>Performance Analyzer</b> to capture slow visuals and paste queries into DAX Studio.</li>
          <li>Author DAX with variables (<code>VAR</code>/<code>RETURN</code>) for clarity and speed.</li>
          <li>Enable the <b>Model view</b> layout and hide technical keys from report authors.</li>
          <li>Use <b>field parameters</b> to switch measures/dimensions from a slicer.</li>
          <li>Save as <b>.pbip</b> project format and version report + model JSON in Git.</li>
          <li>Prefer <b>Deployment Pipelines</b> over manual copy-paste between workspaces.</li>
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
              <tr><td className="py-2 pr-4">Storage</td><td>Import</td><td>DirectQuery</td><td>VertiPaq speed vs real-time source-of-truth.</td></tr>
              <tr><td className="py-2 pr-4">Model</td><td>Star Schema</td><td>Snowflake</td><td>Simpler, faster vs normalized dimensions.</td></tr>
              <tr><td className="py-2 pr-4">Logic</td><td>Measure</td><td>Calculated Column</td><td>Dynamic filter context vs static row context.</td></tr>
              <tr><td className="py-2 pr-4">Report</td><td>Interactive Report</td><td>Paginated (Report Builder)</td><td>Exploration vs pixel-perfect print output.</td></tr>
              <tr><td className="py-2 pr-4">Deploy</td><td>Workspace + App</td><td>Deployment Pipeline</td><td>Simple share vs governed dev/test/prod.</td></tr>
              <tr><td className="py-2 pr-4">BI</td><td>Power BI</td><td>Tableau</td><td>Microsoft-native ecosystem vs viz-first tool.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Governance & Accessibility">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — star schema, aggregations, incremental refresh, reduce visuals per page.</li>
          <li><b>Governance</b> — workspaces, endorsement (Promoted/Certified), sensitivity labels, lineage.</li>
          <li><b>Security</b> — Azure AD, RLS, OLS, on-prem gateway, private endpoints for DirectQuery.</li>
          <li><b>Compliance</b> — Purview integration, audit logs, DLP with Microsoft 365 policies.</li>
          <li><b>Accessibility</b> — contrast, alt text, tab order, screen-reader friendly visuals.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Power BI turns Microsoft-native data into governed, interactive analytics.</li>
          <li>Star-schema modeling and clean DAX beat clever tricks every time.</li>
          <li>Publish through workspaces, Apps, and deployment pipelines — not personal workspaces.</li>
          <li>Fabric and OneLake extend Power BI into a unified data platform.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need SQL to use Power BI?">No, but SQL and star-schema thinking dramatically improve your models.</FAQItem>
        <FAQItem q="Import or DirectQuery?">Import for speed by default; DirectQuery when data must be live or too large to import — pair with aggregations.</FAQItem>
        <FAQItem q="Power BI vs Tableau?">Both are leaders. Power BI wins on Microsoft integration and price; Tableau on visualization craft.</FAQItem>
        <FAQItem q="Which certification should I target?">Microsoft PL-300 (Power BI Data Analyst Associate) is the standard entry certification.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/power-bi/" target="_blank" rel="noreferrer">Power BI Documentation</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/dax/" target="_blank" rel="noreferrer">DAX Reference</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/power-query/" target="_blank" rel="noreferrer">Power Query</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/fabric/" target="_blank" rel="noreferrer">Microsoft Fabric</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/fabric/onelake/" target="_blank" rel="noreferrer">OneLake</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/rest/api/power-bi/" target="_blank" rel="noreferrer">Power BI REST API</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/certifications/exams/pl-300/" target="_blank" rel="noreferrer">PL-300 Certification</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/sql/" target="_blank" rel="noreferrer">SQL Server Docs</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/" target="_blank" rel="noreferrer">Azure Docs</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is provided for educational purposes only. Microsoft, Power BI, Power Query, DAX, Microsoft Fabric, OneLake, and Azure are trademarks of Microsoft Corporation. Always consult the official Microsoft Learn documentation for the most accurate and up-to-date guidance.</p>
      </Section>
    </ReaderShell>
  );
}
