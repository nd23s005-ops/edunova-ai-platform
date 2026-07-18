import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "gcp-quick-revision-notes",
  title: "Google Cloud Platform — Quick Revision Notes",
  category: "Cloud & DevOps",
  difficulty: "Beginner",
  readingTime: "10 min",
  pages: 8,
  lastUpdated: "October 2026",
  tags: ["GCP", "Cloud"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle: "Crisp last-minute revision notes for Google Cloud fundamentals and services.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "GCP Architecture & Workflow" },
  { id: "services", label: "Core Service Catalog" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Performance, Security & Cost" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Google Cloud Platform — Beginner Guide", tag: "GCP", time: "12 min" },
  { title: "Google Cloud Platform — Cheat Sheet", tag: "GCP", time: "4 min" },
  { title: "Google Cloud Platform — Interview Questions", tag: "GCP", time: "29 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/gcp-quick-revision-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/gcp-quick-revision-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand Google Cloud's global infrastructure — regions, zones, and edge PoPs.</li>
          <li>Deploy and manage compute, storage, networking, and IAM on GCP.</li>
          <li>Apply IAM roles, service accounts, and Secret Manager for least-privilege access.</li>
          <li>Observe workloads with Cloud Logging, Monitoring, Trace, and Error Reporting.</li>
          <li>Design for reliability, security, cost, and performance on Google Cloud.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic networking (IP, DNS, HTTP) and OS familiarity.</li>
          <li>Comfort with a terminal (Bash) and Git.</li>
          <li>A Google Cloud free-tier account is helpful but not required to follow along.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Cloud Fundamentals</li>
          <li>Core Concepts — Compute, Storage, Networking, IAM</li>
          <li>GCP Architecture & Workflow</li>
          <li>Core Service Catalog</li>
          <li>Practical Examples & Enterprise Use Cases</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Performance, Security, and Cost</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Google Cloud Platform fundamentals covering compute, storage, networking, databases, Kubernetes, serverless computing, AI & ML services, DevOps, security, observability, and cloud-native application development.</p>
        <Callout tone="info" title="GCP in one line">Resources live in a Project, inside a Folder, under an Organization, governed by IAM and Organization Policy.</Callout>
        <Figure src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=80" caption="Figure 1 — Google Cloud global infrastructure — regions, zones, and low-latency backbone." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Global infrastructure</b> — regions, zones, points of presence, and multi-region services.</li>
          <li><b>Resource hierarchy</b> — Organization, Folders, Projects, and resource-level IAM.</li>
          <li><b>Compute</b> — Compute Engine, MIGs, App Engine, Cloud Run, Cloud Functions, GKE.</li>
          <li><b>Storage</b> — Cloud Storage, Persistent Disks, Filestore.</li>
          <li><b>Databases</b> — Cloud SQL, AlloyDB, Cloud Spanner, Firestore, Memorystore, BigQuery.</li>
          <li><b>Networking</b> — VPC, subnets, Cloud Router, Cloud NAT, Load Balancing, Cloud CDN, Cloud Armor, Cloud DNS.</li>
          <li><b>Identity</b> — IAM, service accounts, Workload Identity, Secret Manager, Cloud KMS.</li>
          <li><b>Observability</b> — Cloud Logging, Monitoring, Trace, Profiler, Error Reporting.</li>
          <li><b>Automation</b> — Terraform (Google provider), Cloud Build, Cloud Deploy, Artifact Registry.</li>
          <li><b>AI/ML</b> — Vertex AI, Gemini for Google Cloud, BigQuery ML.</li>
        </ul>
      </Section>

      <Section id="architecture" title="GCP Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Organization
  └─ Folder
      └─ Project
          └─ Resources (GCE, GKE, Cloud Run, Cloud SQL, GCS)
                │
                ├─ VPC + Subnets + Firewall rules
                ├─ Service Account -> Secret Manager / KMS
                └─ Cloud Logging + Monitoring`}
        </pre>
        <Code>{`# Deploy a minimal service on Cloud Run with gcloud
gcloud config set project my-project
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
gcloud run deploy hello \\
  --image=us-docker.pkg.dev/cloudrun/container/hello \\
  --region=us-central1 --allow-unauthenticated`}</Code>
        <Figure src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&q=80" caption="Figure 2 — Enterprise cloud-native architecture — projects, VPC networking, IAM, and observability." />
      </Section>

      <Section id="services" title="Core Service Catalog">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Domain</th>
                <th className="py-2 pr-4">Service</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Compute</td><td>Compute Engine</td><td>Full VM control, lift-and-shift.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>Cloud Run</td><td>Serverless containers, HTTP APIs.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>Cloud Functions</td><td>Event-driven serverless workloads.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>GKE</td><td>Managed Kubernetes at scale.</td></tr>
              <tr><td className="py-2 pr-4">Storage</td><td>Cloud Storage</td><td>Unstructured objects and backups.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>Cloud SQL</td><td>Managed relational database.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>BigQuery</td><td>Serverless data warehouse & analytics.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>Firestore</td><td>Serverless NoSQL for apps.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>Cloud Load Balancing</td><td>Global L7/L4 entry point.</td></tr>
              <tr><td className="py-2 pr-4">Identity</td><td>IAM</td><td>Users, groups, service accounts.</td></tr>
              <tr><td className="py-2 pr-4">Ops</td><td>Cloud Monitoring</td><td>Metrics, logs, alerts, dashboards.</td></tr>
              <tr><td className="py-2 pr-4">AI</td><td>Vertex AI</td><td>Train, deploy, and serve ML/GenAI.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Startup</b> — Cloud Run + Cloud SQL + Cloud Logging ships fast.</li>
          <li><b>Enterprise</b> — Landing zones with hub-spoke VPCs, Org Policies, and Shared VPC.</li>
          <li><b>AI</b> — Vertex AI + BigQuery + Cloud Storage for RAG and analytics.</li>
          <li><b>Retail</b> — GKE + Cloud CDN + Memorystore handle seasonal traffic spikes.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use the Google Cloud Architecture Framework — reliability, security, cost, ops, performance.</li>
          <li>Prefer service accounts and Workload Identity over static keys.</li>
          <li>Enforce IAM least-privilege and Organization Policies from day one.</li>
          <li>Deploy with Terraform — code is the source of truth.</li>
          <li>Enable Cloud Logging and Monitoring on every workload.</li>
          <li>Set budgets and cost alerts on every billing account.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Clicking through the Console instead of Terraform / gcloud.</li>
          <li>Granting Owner/Editor at project scope by default.</li>
          <li>Public buckets, public SQL, and public GKE endpoints with no private access.</li>
          <li>Skipping Cloud Logging — no telemetry means no root cause.</li>
          <li>Running non-prod at prod machine types and forgetting to shut down.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use Cloud Shell for gcloud without local setup.</li>
          <li>Adopt labels and naming conventions for cost allocation and search.</li>
          <li>Use org policies and constraints on critical projects.</li>
          <li>Prefer regional (multi-zone) services for production workloads.</li>
          <li>Review Active Assist recommendations weekly.</li>
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
              <tr><td className="py-2 pr-4">Web hosting</td><td>Cloud Run</td><td>GKE</td><td>Managed serverless vs full Kubernetes control.</td></tr>
              <tr><td className="py-2 pr-4">Database</td><td>Cloud SQL</td><td>Cloud Spanner</td><td>Regional relational vs global strong-consistency.</td></tr>
              <tr><td className="py-2 pr-4">Ingress</td><td>Regional LB</td><td>Global HTTPS LB</td><td>Single-region vs global anycast + CDN + Armor.</td></tr>
              <tr><td className="py-2 pr-4">IaC</td><td>Terraform</td><td>Deployment Manager</td><td>Terraform for multi-cloud and community support.</td></tr>
              <tr><td className="py-2 pr-4">Secrets</td><td>Secret Manager</td><td>Env vars</td><td>Always Secret Manager + Workload Identity in prod.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Cost">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — pick the right region, use Cloud CDN, and cache with Memorystore.</li>
          <li><b>Security</b> — enable Security Command Center, VPC-SC, private endpoints, and Cloud KMS.</li>
          <li><b>Cost</b> — Committed Use Discounts, autoscaling, preemptible/Spot VMs, and budgets.</li>
          <li><b>Reliability</b> — regional services, cross-region backups, and tested DR runbooks.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>GCP organizes resources under Organization, Folders, and Projects.</li>
          <li>IAM + service accounts + Workload Identity are the identity foundation.</li>
          <li>Terraform brings repeatable, reviewable infrastructure.</li>
          <li>The Architecture Framework and landing zones scale governance safely.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need a credit card to learn GCP?">The Google Cloud free trial requires verification but includes credits and always-free services for learning.</FAQItem>
        <FAQItem q="Which certification should I start with?">Start with Cloud Digital Leader, then Associate Cloud Engineer, then Professional Cloud Architect or Professional DevOps Engineer.</FAQItem>
        <FAQItem q="Cloud Run or GKE?">Cloud Run for simple stateless services; GKE when you need full Kubernetes control.</FAQItem>
        <FAQItem q="What is a Landing Zone on GCP?">A pre-provisioned, governed environment (identity, networking, org policies, logging) ready to host workloads.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://cloud.google.com/docs" target="_blank" rel="noreferrer">Google Cloud Documentation</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/architecture" target="_blank" rel="noreferrer">Architecture Center</a> · <a className="text-primary hover:underline" href="https://www.cloudskillsboost.google/" target="_blank" rel="noreferrer">Cloud Skills Boost</a></li>
          <li><a className="text-primary hover:underline" href="https://cloud.google.com/kubernetes-engine/docs" target="_blank" rel="noreferrer">GKE Docs</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/compute/docs" target="_blank" rel="noreferrer">Compute Engine Docs</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/run/docs" target="_blank" rel="noreferrer">Cloud Run Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://cloud.google.com/functions/docs" target="_blank" rel="noreferrer">Cloud Functions</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/bigquery/docs" target="_blank" rel="noreferrer">BigQuery</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/vertex-ai/docs" target="_blank" rel="noreferrer">Vertex AI</a></li>
          <li><a className="text-primary hover:underline" href="https://cloud.google.com/gemini/docs" target="_blank" rel="noreferrer">Gemini for Google Cloud</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/sql/docs" target="_blank" rel="noreferrer">Cloud SQL</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/storage/docs" target="_blank" rel="noreferrer">Cloud Storage</a></li>
          <li><a className="text-primary hover:underline" href="https://cloud.google.com/monitoring/docs" target="_blank" rel="noreferrer">Cloud Monitoring</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/logging/docs" target="_blank" rel="noreferrer">Cloud Logging</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/anthos/docs" target="_blank" rel="noreferrer">Anthos</a> · <a className="text-primary hover:underline" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs" target="_blank" rel="noreferrer">Terraform Google Provider</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Google Cloud services and pricing evolve rapidly — always consult the latest official Google Cloud documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
