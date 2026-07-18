import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "devops-cheat-sheet",
  title: "DevOps — Cheat Sheet",
  category: "Cloud & DevOps",
  difficulty: "Beginner",
  readingTime: "3 min",
  pages: 3,
  lastUpdated: "April 2026",
  tags: ["DevOps", "CI/CD"],
  heroImage: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=1800&q=80",
  heroSubtitle: "Printable DevOps cheat sheet — Git, Docker, Kubernetes, Terraform, and CI/CD commands.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
  { id: "lifecycle", label: "DevOps Lifecycle" },
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
  { title: "DevOps — Beginner Guide", tag: "DevOps", time: "11 min" },
  { title: "DevOps — Cheat Sheet", tag: "DevOps", time: "3 min" },
  { title: "DevOps — Interview Questions", tag: "DevOps", time: "38 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/devops-cheat-sheet")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/devops-cheat-sheet" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand DevOps culture, principles, and the CI/CD lifecycle.</li>
          <li>Design pipelines that build, test, secure, and deploy safely.</li>
          <li>Automate infrastructure using Terraform, Ansible, and cloud-native tools.</li>
          <li>Run containerized workloads on Kubernetes with observability and SRE practices.</li>
          <li>Apply DevSecOps — secrets management, policy-as-code, and supply-chain security.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with Linux shell, Git, and basic networking.</li>
          <li>Familiarity with one programming language (Python/Go/JS).</li>
          <li>Willingness to work with YAML, JSON, and cloud consoles.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & DevOps Culture</li>
          <li>Core Concepts — CI/CD, IaC, Containers, Observability</li>
          <li>Architecture & Workflow</li>
          <li>DevOps Lifecycle</li>
          <li>Practical Examples & Enterprise Use Cases</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Performance, Security, and Cost</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Printable DevOps cheat sheet — Git, Docker, Kubernetes, Terraform, and CI/CD commands. DevOps is a cultural and technical movement that unifies development and operations to deliver software safely, frequently, and reliably.</p>
        <Callout tone="info" title="DevOps in one line">Small changes, automated everywhere, observed continuously — with shared ownership between Dev and Ops.</Callout>
        <Figure src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1400&q=80" caption="Figure 1 — Cloud-native architecture with Kubernetes, service mesh, and managed cloud services." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>CI/CD</b> — automate build, test, and deploy for every change (GitHub Actions, GitLab CI, Jenkins).</li>
          <li><b>Infrastructure as Code</b> — declarative provisioning with Terraform, CloudFormation, Pulumi.</li>
          <li><b>Configuration Management</b> — Ansible, Puppet, Chef for consistent server state.</li>
          <li><b>Containers</b> — Docker images and OCI runtimes for reproducible packaging.</li>
          <li><b>Orchestration</b> — Kubernetes for scheduling, self-healing, and scale.</li>
          <li><b>Observability</b> — metrics (Prometheus), logs (Loki/ELK), traces (OpenTelemetry).</li>
          <li><b>SRE</b> — SLIs, SLOs, error budgets, incident management, and postmortems.</li>
          <li><b>DevSecOps</b> — secrets (Vault), policy-as-code (OPA), SBOMs, and supply-chain security.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Dev -> Git -> CI -> Artifact Registry -> CD -> Kubernetes -> Users
                |                            |
                v                            v
          Tests + Scans              Metrics + Logs + Traces
                                     Alerts + On-call + SLOs`}
        </pre>
        <Code>{`# Minimal pipeline (pseudo-YAML)
build:  docker build -t registry/app:$SHA .
push:   docker push registry/app:$SHA
deploy: kubectl set image deploy/app app=registry/app:$SHA`}</Code>
        <Figure src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1400&q=80" caption="Figure 2 — Docker containers standardize packaging so images ship unchanged from laptop to production." />
      </Section>

      <Section id="lifecycle" title="DevOps Lifecycle">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Stage</th>
                <th className="py-2 pr-4">Activities</th>
                <th className="py-2">Representative Tools</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Plan</td><td>Backlog, tickets, design</td><td>Jira, Linear</td></tr>
              <tr><td className="py-2 pr-4">Code</td><td>Branches, reviews, trunk-based dev</td><td>Git, GitHub, GitLab</td></tr>
              <tr><td className="py-2 pr-4">Build</td><td>Compile, containerize</td><td>Docker, Buildpacks</td></tr>
              <tr><td className="py-2 pr-4">Test</td><td>Unit, integration, E2E</td><td>Jest, Playwright</td></tr>
              <tr><td className="py-2 pr-4">Release</td><td>Artifacts, versioning</td><td>Nexus, Artifactory</td></tr>
              <tr><td className="py-2 pr-4">Deploy</td><td>Blue/green, canary, rolling</td><td>Argo CD, Flux, Helm</td></tr>
              <tr><td className="py-2 pr-4">Operate</td><td>On-call, incidents</td><td>PagerDuty, Opsgenie</td></tr>
              <tr><td className="py-2 pr-4">Monitor</td><td>Metrics, logs, traces</td><td>Prometheus, Grafana, OpenTelemetry</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="cheat" title="Command Cheat Sheet">
        <Code>{`# Git
git switch -c feat/x
git log --oneline --graph
git rebase -i HEAD~5

# Docker
docker build -t app:1.0 .
docker run --rm -p 8080:8080 app:1.0
docker compose up -d

# Kubernetes
kubectl get pods -A
kubectl apply -f deploy.yaml
kubectl rollout status deploy/app
kubectl logs -f deploy/app

# Terraform
terraform init && terraform plan && terraform apply

# Ansible
ansible-playbook -i inventory site.yml --check`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Startup</b> — GitHub Actions + managed K8s + Terraform gets from zero to production in weeks.</li>
          <li><b>Fintech</b> — GitOps + policy-as-code + audit logs meet strict compliance.</li>
          <li><b>Retail</b> — Canary deploys + feature flags reduce peak-season release risk.</li>
          <li><b>Media</b> — Autoscaling, CDN, and observability handle unpredictable traffic.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Trunk-based development with short-lived branches and PR reviews.</li>
          <li>Everything in version control — code, infra, pipelines, and dashboards.</li>
          <li>Automated tests at every layer; block merges on red builds.</li>
          <li>Immutable, signed container images; scan before deploy.</li>
          <li>Progressive delivery (canary/blue-green) with automated rollback.</li>
          <li>Define SLOs and honor error budgets before adding features.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Manually clicking in cloud consoles instead of using IaC.</li>
          <li>Long-lived feature branches that create painful merges.</li>
          <li>No observability — you only find out when customers tell you.</li>
          <li>Secrets in Git or CI logs instead of a secrets manager.</li>
          <li>Skipping postmortems, so the same incident recurs.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cache dependencies in CI to keep pipelines fast and cheap.</li>
          <li>Use kubectl explain and dry-run to author manifests.</li>
          <li>Prefer managed services first; run your own only when it earns its keep.</li>
          <li>Automate on-call rotations, runbooks, and paging thresholds.</li>
          <li>Track DORA metrics (deploy freq, lead time, MTTR, change fail rate).</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Area</th>
                <th className="py-2 pr-4">Option A</th>
                <th className="py-2 pr-4">Option B</th>
                <th className="py-2">When to Choose</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">CI/CD</td><td>GitHub Actions</td><td>Jenkins</td><td>Managed vs self-hosted / plugins</td></tr>
              <tr><td className="py-2 pr-4">IaC</td><td>Terraform</td><td>Pulumi</td><td>HCL vs general-purpose languages</td></tr>
              <tr><td className="py-2 pr-4">Config Mgmt</td><td>Ansible</td><td>Chef/Puppet</td><td>Agentless vs long-lived agents</td></tr>
              <tr><td className="py-2 pr-4">Orchestration</td><td>Kubernetes</td><td>ECS/Cloud Run</td><td>Portability vs managed simplicity</td></tr>
              <tr><td className="py-2 pr-4">Observability</td><td>Prometheus+Grafana</td><td>Datadog</td><td>Open-source vs SaaS ease</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Cost">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — parallelize CI jobs, cache builds, use small container images.</li>
          <li><b>Security</b> — scan images, sign artifacts (Sigstore), enforce OPA/Gatekeeper policies.</li>
          <li><b>Cost</b> — right-size nodes, use spot/preemptible instances, autoscale, delete unused resources.</li>
          <li><b>Reliability</b> — multi-AZ, health checks, retries with backoff, and tested backups.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>DevOps is culture + automation + measurement — not just tools.</li>
          <li>CI/CD, IaC, containers, and observability form the modern baseline.</li>
          <li>Progressive delivery and SRE practices make change safe at scale.</li>
          <li>Security, reliability, and cost are pipeline concerns, not afterthoughts.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is DevOps a role or a culture?">Both — a cultural movement, but organizations also hire DevOps and Platform Engineers to enable it.</FAQItem>
        <FAQItem q="Do I need Kubernetes to do DevOps?">No. Start with CI/CD, IaC, and observability; adopt Kubernetes only when workloads justify the complexity.</FAQItem>
        <FAQItem q="What are DORA metrics?">Deployment frequency, lead time for changes, change failure rate, and mean time to restore.</FAQItem>
        <FAQItem q="What is GitOps?">Using Git as the single source of truth and letting a controller (Argo CD, Flux) reconcile cluster state.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://docs.docker.com/" target="_blank" rel="noreferrer">Docker Docs</a> · <a className="text-primary hover:underline" href="https://kubernetes.io/docs/" target="_blank" rel="noreferrer">Kubernetes Docs</a> · <a className="text-primary hover:underline" href="https://helm.sh/docs/" target="_blank" rel="noreferrer">Helm</a> · <a className="text-primary hover:underline" href="https://www.cncf.io/" target="_blank" rel="noreferrer">CNCF</a></li>
          <li><a className="text-primary hover:underline" href="https://git-scm.com/doc" target="_blank" rel="noreferrer">Git</a> · <a className="text-primary hover:underline" href="https://docs.github.com/" target="_blank" rel="noreferrer">GitHub Docs</a> · <a className="text-primary hover:underline" href="https://docs.github.com/actions" target="_blank" rel="noreferrer">GitHub Actions</a> · <a className="text-primary hover:underline" href="https://docs.gitlab.com/" target="_blank" rel="noreferrer">GitLab Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://www.jenkins.io/doc/" target="_blank" rel="noreferrer">Jenkins</a> · <a className="text-primary hover:underline" href="https://developer.hashicorp.com/terraform/docs" target="_blank" rel="noreferrer">Terraform</a> · <a className="text-primary hover:underline" href="https://docs.ansible.com/" target="_blank" rel="noreferrer">Ansible</a> · <a className="text-primary hover:underline" href="https://www.hashicorp.com/" target="_blank" rel="noreferrer">HashiCorp</a></li>
          <li><a className="text-primary hover:underline" href="https://prometheus.io/docs/" target="_blank" rel="noreferrer">Prometheus</a> · <a className="text-primary hover:underline" href="https://grafana.com/docs/" target="_blank" rel="noreferrer">Grafana</a> · <a className="text-primary hover:underline" href="https://opentelemetry.io/docs/" target="_blank" rel="noreferrer">OpenTelemetry</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.aws.amazon.com/" target="_blank" rel="noreferrer">AWS Docs</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/" target="_blank" rel="noreferrer">Azure Docs</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/docs" target="_blank" rel="noreferrer">Google Cloud Docs</a> · <a className="text-primary hover:underline" href="https://www.linuxfoundation.org/" target="_blank" rel="noreferrer">Linux Foundation</a> · <a className="text-primary hover:underline" href="https://landscape.cncf.io/" target="_blank" rel="noreferrer">CNCF Landscape</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. DevOps tooling and cloud services evolve rapidly — always consult the latest official documentation (Docker, Kubernetes, CNCF, Terraform, and your cloud provider) before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
