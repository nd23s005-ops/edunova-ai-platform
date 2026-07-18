import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "azure-reference-guide",
  title: "Microsoft Azure — Reference Guide",
  category: "Cloud & DevOps",
  difficulty: "Beginner",
  readingTime: "38 min",
  pages: 60,
  lastUpdated: "February 2026",
  tags: ["Azure", "Cloud"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle: "Reference guide to Azure CLI commands, Bicep snippets, ARM templates, and official documentation.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Azure Architecture & Workflow" },
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
  { title: "Microsoft Azure — Beginner Guide", tag: "Azure", time: "18 min" },
  { title: "Microsoft Azure — Cheat Sheet", tag: "Azure", time: "5 min" },
  { title: "Microsoft Azure — Interview Questions", tag: "Azure", time: "41 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/azure-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/azure-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand Azure's global infrastructure, regions, and availability zones.</li>
          <li>Deploy and manage compute, storage, networking, and identity on Azure.</li>
          <li>Apply RBAC, managed identities, and Key Vault for secure access.</li>
          <li>Monitor workloads with Azure Monitor, Log Analytics, and Application Insights.</li>
          <li>Follow the Azure Well-Architected Framework for reliability, security, cost, operations, and performance.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic networking (IP, DNS, HTTP) and OS familiarity.</li>
          <li>Comfort with a terminal (Bash or PowerShell).</li>
          <li>An Azure free account is helpful but not required to follow along.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Cloud Fundamentals</li>
          <li>Core Concepts — Compute, Storage, Networking, Identity</li>
          <li>Azure Architecture & Workflow</li>
          <li>Core Service Catalog</li>
          <li>Practical Examples & Enterprise Use Cases</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Performance, Security, and Cost</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Reference guide to Azure CLI commands, Bicep snippets, ARM templates, and official documentation. Microsoft Azure is a global cloud platform with 60+ regions and hundreds of services spanning compute, storage, networking, identity, data, AI, and DevOps.</p>
        <Callout tone="info" title="Azure in one line">Resources live in a Resource Group, in a Region, under a Subscription, governed by Microsoft Entra ID and Azure Policy.</Callout>
        <Figure src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1400&q=80" caption="Figure 1 — Global cloud infrastructure — regions, availability zones, and low-latency backbone." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Global infrastructure</b> — regions, availability zones, edge locations, and paired regions.</li>
          <li><b>Governance</b> — Management Groups, Subscriptions, Resource Groups, and Azure Policy.</li>
          <li><b>Compute</b> — VMs, VMSS, App Service, Functions, Container Apps, AKS.</li>
          <li><b>Storage</b> — Blob, File, Queue, Table, Managed Disks.</li>
          <li><b>Databases</b> — Azure SQL, Cosmos DB, PostgreSQL, MySQL, Cache for Redis.</li>
          <li><b>Networking</b> — VNet, subnets, NSGs, Load Balancer, Application Gateway, Front Door, VPN, ExpressRoute.</li>
          <li><b>Identity</b> — Microsoft Entra ID, RBAC, Managed Identities, Key Vault.</li>
          <li><b>Observability</b> — Azure Monitor, Log Analytics, Application Insights, Alerts.</li>
          <li><b>Automation</b> — ARM, Bicep, Terraform, Azure DevOps, GitHub Actions.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Azure Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Tenant (Entra ID)
  └─ Management Group
      └─ Subscription
          └─ Resource Group
              └─ Resources (VM, App Service, Storage, SQL, AKS)
                    │
                    ├─ VNet + Subnets + NSGs
                    ├─ Managed Identity -> Key Vault
                    └─ Azure Monitor + Log Analytics`}
        </pre>
        <Code>{`# Deploy a minimal web app with Azure CLI
az group create -n rg-app -l eastus
az appservice plan create -g rg-app -n plan-app --sku B1
az webapp create -g rg-app -p plan-app -n my-web-app --runtime "NODE:20-lts"
az monitor app-insights component create -g rg-app -a ai-my-web --location eastus`}</Code>
        <Figure src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&q=80" caption="Figure 2 — Enterprise cloud infrastructure — resource groups, networking, identity, and monitoring." />
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
              <tr><td className="py-2 pr-4">Compute</td><td>Virtual Machines</td><td>Full OS control, lift-and-shift.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>App Service</td><td>Managed web apps and APIs.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>Functions</td><td>Event-driven serverless workloads.</td></tr>
              <tr><td className="py-2 pr-4">Compute</td><td>AKS</td><td>Kubernetes at scale.</td></tr>
              <tr><td className="py-2 pr-4">Storage</td><td>Blob Storage</td><td>Unstructured objects and backups.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>Azure SQL</td><td>Managed relational database.</td></tr>
              <tr><td className="py-2 pr-4">Data</td><td>Cosmos DB</td><td>Globally distributed NoSQL.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>Front Door</td><td>Global HTTP entry point + WAF.</td></tr>
              <tr><td className="py-2 pr-4">Identity</td><td>Entra ID</td><td>Users, groups, apps, SSO.</td></tr>
              <tr><td className="py-2 pr-4">Ops</td><td>Azure Monitor</td><td>Metrics, logs, alerts, dashboards.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="ref" title="Reference Snippets">
        <Code>{`# Bicep — Storage Account
param location string = resourceGroup().location
resource sa 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'saapp001'
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: { minimumTlsVersion: 'TLS1_2' }
}`}</Code>
        <Code>{`# ARM — Resource Group Deployment (excerpt)
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2022-09-01",
      "name": "my-web",
      "location": "[resourceGroup().location]"
    }
  ]
}`}</Code>
        <Code>{`# Terraform — Azure VNet
resource "azurerm_virtual_network" "main" {
  name                = "vnet-main"
  address_space       = ["10.0.0.0/16"]
  location            = "eastus"
  resource_group_name = azurerm_resource_group.main.name
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Startup</b> — App Service + Azure SQL + Application Insights ships fast.</li>
          <li><b>Enterprise</b> — Landing zones with hub-spoke networking, Entra ID, and Azure Policy at scale.</li>
          <li><b>AI</b> — Azure OpenAI + AI Search + Cosmos DB for RAG applications.</li>
          <li><b>Retail</b> — AKS + Front Door + Redis Cache handle seasonal traffic spikes.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow the Azure Well-Architected Framework — five pillars.</li>
          <li>Use Managed Identities instead of storing secrets in code.</li>
          <li>Enforce Azure Policy and RBAC least-privilege from day one.</li>
          <li>Deploy with Bicep or Terraform — code is the source of truth.</li>
          <li>Enable diagnostic settings on every resource.</li>
          <li>Use budgets and cost alerts in every subscription.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Clicking through the Portal instead of Bicep/Terraform.</li>
          <li>Assigning Owner/Contributor at subscription scope by default.</li>
          <li>Public endpoints on storage, SQL, and AKS with no private links.</li>
          <li>Skipping Log Analytics — no telemetry means no root cause.</li>
          <li>Running non-prod at prod SKUs and forgetting to shut down.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use Azure Cloud Shell for CLI access without local setup.</li>
          <li>Adopt naming conventions and tags for cost allocation and search.</li>
          <li>Use resource locks (CanNotDelete/ReadOnly) on critical resources.</li>
          <li>Prefer zone-redundant SKUs for production workloads.</li>
          <li>Use Azure Advisor's recommendations weekly.</li>
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
              <tr><td className="py-2 pr-4">Web hosting</td><td>App Service</td><td>Container Apps / AKS</td><td>Managed simplicity vs container control.</td></tr>
              <tr><td className="py-2 pr-4">Database</td><td>Azure SQL</td><td>Cosmos DB</td><td>Relational vs globally distributed NoSQL.</td></tr>
              <tr><td className="py-2 pr-4">Ingress</td><td>Application Gateway</td><td>Front Door</td><td>Regional L7 vs global L7 + CDN + WAF.</td></tr>
              <tr><td className="py-2 pr-4">IaC</td><td>Bicep</td><td>Terraform</td><td>First-party vs multi-cloud.</td></tr>
              <tr><td className="py-2 pr-4">Secrets</td><td>Key Vault + MI</td><td>App settings</td><td>Always Key Vault + MI in production.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Cost">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — pick right region, use CDN/Front Door, and cache with Redis.</li>
          <li><b>Security</b> — enable Microsoft Defender for Cloud, private endpoints, and Key Vault.</li>
          <li><b>Cost</b> — reservations, autoscale, dev/test SKUs, and Cost Management alerts.</li>
          <li><b>Reliability</b> — zone-redundant services, geo-redundant backups, and tested DR.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Azure organizes resources under Tenants, Management Groups, Subscriptions, and Resource Groups.</li>
          <li>Entra ID + RBAC + Managed Identities are the identity foundation.</li>
          <li>Bicep and Terraform bring repeatable, reviewable infrastructure.</li>
          <li>The Well-Architected Framework and landing zones scale governance safely.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need a credit card to learn Azure?">The Azure free account requires verification but includes credits and always-free services for learning.</FAQItem>
        <FAQItem q="Which certification should I start with?">Start with AZ-900 Azure Fundamentals, then AZ-104 (Admin), AZ-204 (Developer), or AZ-305 (Architect).</FAQItem>
        <FAQItem q="Bicep or Terraform?">Both are fine — Bicep is Azure-native and concise; Terraform is multi-cloud with a huge ecosystem.</FAQItem>
        <FAQItem q="What is a Landing Zone?">A pre-provisioned, governed Azure environment (identity, networking, policy, monitoring) ready to host workloads.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/" target="_blank" rel="noreferrer">Microsoft Azure Docs</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/" target="_blank" rel="noreferrer">Microsoft Learn</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/architecture/framework/" target="_blank" rel="noreferrer">Well-Architected Framework</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/architecture/" target="_blank" rel="noreferrer">Azure Architecture Center</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/entra/" target="_blank" rel="noreferrer">Microsoft Entra Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/aks/" target="_blank" rel="noreferrer">AKS Docs</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/azure-monitor/" target="_blank" rel="noreferrer">Azure Monitor</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/devops/" target="_blank" rel="noreferrer">Azure DevOps</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/ai-services/" target="_blank" rel="noreferrer">Azure AI Services</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/ai-services/openai/" target="_blank" rel="noreferrer">Azure OpenAI</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/cli/azure/" target="_blank" rel="noreferrer">Azure CLI</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/powershell/azure/" target="_blank" rel="noreferrer">Azure PowerShell</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/azure-resource-manager/bicep/" target="_blank" rel="noreferrer">Bicep</a> · <a className="text-primary hover:underline" href="https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs" target="_blank" rel="noreferrer">Terraform AzureRM</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Azure services and pricing evolve rapidly — always consult the latest official Microsoft Learn documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
