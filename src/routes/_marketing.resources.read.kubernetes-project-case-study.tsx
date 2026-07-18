import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "kubernetes-project-case-study",
  title: "Kubernetes — Project Case Study",
  category: "Cloud & DevOps",
  difficulty: "Intermediate",
  readingTime: "21 min",
  pages: 37,
  lastUpdated: "March 2026",
  tags: ["K8s", "Orchestration"],
  heroImage: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1800&q=80",
  heroSubtitle: "Deep-dive case study of a cloud-native project delivered on Kubernetes at scale.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Kubernetes Architecture & Workflow" },
  { id: "objects", label: "Core Objects Catalog" },
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
  { title: "Kubernetes — Beginner Guide", tag: "K8s", time: "16 min" },
  { title: "Kubernetes — Cheat Sheet", tag: "K8s", time: "5 min" },
  { title: "Kubernetes — Interview Questions", tag: "K8s", time: "29 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/kubernetes-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/kubernetes-project-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain what container orchestration is and the problems Kubernetes solves.</li>
          <li>Understand the Kubernetes control plane, worker nodes, and cluster architecture.</li>
          <li>Deploy workloads with Pods, Deployments, StatefulSets, DaemonSets, Jobs, and CronJobs.</li>
          <li>Expose applications with Services, Ingress, and the Gateway API.</li>
          <li>Manage configuration, secrets, storage, autoscaling, RBAC, and network policies.</li>
          <li>Adopt GitOps, observability, and production-grade cloud-native best practices.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic Linux command line and networking (IP, DNS, HTTP) fundamentals.</li>
          <li>Comfort building and running Docker containers.</li>
          <li>Familiarity with YAML and Git.</li>
          <li>A local cluster (Minikube, Kind, k3s, Docker Desktop) or a managed cluster (EKS, AKS, GKE).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Container Orchestration Fundamentals</li>
          <li>Core Concepts — Pods, Workloads, Services, Storage</li>
          <li>Kubernetes Architecture & Workflow</li>
          <li>Core Objects Catalog</li>
          <li>Practical Examples & Enterprise Use Cases</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Performance, Security, and Cost</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Kubernetes ("K8s") is the open-source, vendor-neutral standard for orchestrating containers at scale. It automates deployment, scaling, networking, storage, healing, and lifecycle management for cloud-native applications running across many machines.</p>
        <Callout tone="info" title="Kubernetes in one line">You declare the desired state in YAML; the control plane continuously drives the cluster toward that state.</Callout>
        <Figure src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1400&q=80" caption="Figure 1 — A Kubernetes cluster: control plane orchestrating workloads across worker nodes." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Cluster</b> — one control plane plus a fleet of worker nodes running containerized workloads.</li>
          <li><b>Control plane</b> — API server, etcd, scheduler, controller manager, and cloud controller manager.</li>
          <li><b>Nodes</b> — kubelet, kube-proxy, and a CRI-compatible container runtime (containerd, CRI-O).</li>
          <li><b>Pods</b> — the smallest deployable unit; one or more tightly-coupled containers sharing network and storage.</li>
          <li><b>Workloads</b> — Deployments, ReplicaSets, StatefulSets, DaemonSets, Jobs, CronJobs.</li>
          <li><b>Services</b> — ClusterIP, NodePort, LoadBalancer, ExternalName — stable virtual IPs for pods.</li>
          <li><b>Ingress & Gateway API</b> — HTTP(S) routing, TLS termination, and traffic policies.</li>
          <li><b>Config & Secrets</b> — ConfigMaps, Secrets, Downward API, and external secret stores.</li>
          <li><b>Storage</b> — Volumes, PersistentVolumes, PersistentVolumeClaims, StorageClasses, CSI drivers.</li>
          <li><b>Scheduling</b> — requests/limits, QoS classes, taints/tolerations, affinity, topology spread.</li>
          <li><b>Autoscaling</b> — Horizontal Pod Autoscaler, Vertical Pod Autoscaler, Cluster Autoscaler.</li>
          <li><b>Security</b> — RBAC, ServiceAccounts, Pod Security Standards, Network Policies, admission control.</li>
          <li><b>Packaging & GitOps</b> — Helm, Kustomize, Argo CD, Flux CD, Operators, CRDs.</li>
          <li><b>Observability</b> — Prometheus, Grafana, Loki, Fluent Bit, OpenTelemetry, metrics-server.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Kubernetes Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Control Plane
  ├─ kube-apiserver  (single source of truth, REST)
  ├─ etcd            (cluster state, key-value store)
  ├─ kube-scheduler  (pod → node placement)
  ├─ controller-mgr  (reconciliation loops)
  └─ cloud-controller (LB, routes, volumes)

Worker Nodes
  ├─ kubelet         (pod lifecycle on the node)
  ├─ kube-proxy      (service networking)
  └─ container runtime (containerd / CRI-O via CRI)

Deployment ─▶ ReplicaSet ─▶ Pods ─▶ Containers
    │                              │
    └── Service ── Ingress ────────┘
`}
        </pre>
        <Code lang="yaml">{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector: { matchLabels: { app: web } }
  template:
    metadata: { labels: { app: web } }
    spec:
      containers:
      - name: web
        image: nginx:1.27
        ports: [{ containerPort: 80 }]
        resources:
          requests: { cpu: "100m", memory: "128Mi" }
          limits:   { cpu: "500m", memory: "256Mi" }
        readinessProbe: { httpGet: { path: /, port: 80 } }
---
apiVersion: v1
kind: Service
metadata: { name: web }
spec:
  selector: { app: web }
  ports: [{ port: 80, targetPort: 80 }]
  type: ClusterIP`}</Code>
        <Figure src="https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?w=1400&q=80" caption="Figure 2 — Cloud-native workflow — GitOps, Helm, and observability wrap the Kubernetes control loop." />
      </Section>

      <Section id="objects" title="Core Objects Catalog">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Domain</th>
                <th className="py-2 pr-4">Object</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Workload</td><td>Deployment</td><td>Stateless apps with rolling updates and rollbacks.</td></tr>
              <tr><td className="py-2 pr-4">Workload</td><td>StatefulSet</td><td>Stable identity + storage for databases and queues.</td></tr>
              <tr><td className="py-2 pr-4">Workload</td><td>DaemonSet</td><td>One pod per node — agents, log shippers, CNI.</td></tr>
              <tr><td className="py-2 pr-4">Workload</td><td>Job / CronJob</td><td>Batch and scheduled tasks.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>Service</td><td>Stable virtual IP + DNS for pod groups.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>Ingress / Gateway</td><td>HTTP(S) routing, TLS, path/host rules.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>NetworkPolicy</td><td>L3/L4 pod-to-pod firewalls.</td></tr>
              <tr><td className="py-2 pr-4">Config</td><td>ConfigMap / Secret</td><td>Externalized configuration and credentials.</td></tr>
              <tr><td className="py-2 pr-4">Storage</td><td>PV / PVC / StorageClass</td><td>Durable storage via CSI drivers.</td></tr>
              <tr><td className="py-2 pr-4">Scaling</td><td>HPA / VPA / CA</td><td>Autoscale pods and nodes to demand.</td></tr>
              <tr><td className="py-2 pr-4">Security</td><td>RBAC / ServiceAccount</td><td>Least-privilege access to the API.</td></tr>
              <tr><td className="py-2 pr-4">Extensibility</td><td>CRD / Operator</td><td>Domain objects and automated day-2 ops.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Web platform</b> — Deployment + Service + Ingress + HPA behind a cloud load balancer.</li>
          <li><b>Data platform</b> — StatefulSets for Postgres/Kafka with PVCs and topology spread.</li>
          <li><b>Batch</b> — CronJobs for nightly ETL, Jobs for one-shot backfills.</li>
          <li><b>Multi-tenant SaaS</b> — Namespaces, ResourceQuotas, NetworkPolicies, and per-tenant RBAC.</li>
          <li><b>GitOps</b> — Argo CD / Flux reconcile the cluster to a Git-declared desired state.</li>
          <li><b>Cloud-managed</b> — EKS, AKS, and GKE handle the control plane; you own workloads.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Always set resource requests and limits; use QoS classes intentionally.</li>
          <li>Add liveness, readiness, and startup probes to every workload.</li>
          <li>Use rolling updates with maxSurge/maxUnavailable and PodDisruptionBudgets.</li>
          <li>Prefer HPA on custom metrics; combine with the Cluster Autoscaler.</li>
          <li>Enforce Pod Security Standards, NetworkPolicies, and least-privilege RBAC.</li>
          <li>Package with Helm or Kustomize; ship with Argo CD or Flux (GitOps).</li>
          <li>Instrument with Prometheus, Grafana, Loki, and OpenTelemetry from day one.</li>
          <li>Back up etcd and stateful data with Velero; rehearse restores.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Running <code>kubectl apply</code> from a laptop instead of GitOps.</li>
          <li>No resource requests → the scheduler cannot pack nodes and OOM kills spike.</li>
          <li>Using <code>latest</code> image tags — no immutable, auditable deploys.</li>
          <li>Exposing services as NodePort/LoadBalancer without Ingress or WAF.</li>
          <li>Cluster-admin ServiceAccounts wired into apps.</li>
          <li>Storing secrets in ConfigMaps or Git in plain text.</li>
          <li>No PodDisruptionBudget → node drains take the service down.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>kubectl explain &lt;kind&gt;.spec</code> — schema reference from the API server.</li>
          <li><code>kubectl -n kube-system get pods -o wide</code> to inspect control-plane addons.</li>
          <li>Use <code>k9s</code> and <code>stern</code> for a much faster CLI experience.</li>
          <li>Prefer <code>kubectl diff</code> before <code>apply</code>; enable server-side apply.</li>
          <li>Tag every resource with owner, environment, and cost-center labels.</li>
          <li>Split noisy workloads into their own node pools with taints and tolerations.</li>
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
              <tr><td className="py-2 pr-4">Workload</td><td>Deployment</td><td>StatefulSet</td><td>Stateless vs stable identity + storage.</td></tr>
              <tr><td className="py-2 pr-4">Traffic</td><td>Ingress</td><td>Gateway API</td><td>Simple HTTP vs modern, role-based traffic model.</td></tr>
              <tr><td className="py-2 pr-4">Packaging</td><td>Helm</td><td>Kustomize</td><td>Templated charts vs overlay-based patching.</td></tr>
              <tr><td className="py-2 pr-4">GitOps</td><td>Argo CD</td><td>Flux CD</td><td>Rich UI vs GitOps toolkit + controllers.</td></tr>
              <tr><td className="py-2 pr-4">Service Mesh</td><td>Istio</td><td>Linkerd</td><td>Feature-rich vs lightweight, opinionated mesh.</td></tr>
              <tr><td className="py-2 pr-4">Local</td><td>Minikube / Kind</td><td>k3s</td><td>Dev clusters vs lightweight edge production.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Cost">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — right-size requests/limits, tune HPA, use topology spread and pod affinity.</li>
          <li><b>Security</b> — enable RBAC, PSS, NetworkPolicies, image scanning, and admission policies (Kyverno/OPA Gatekeeper).</li>
          <li><b>Cost</b> — spot/preemptible node pools, bin-pack with the Cluster Autoscaler, and shut down idle namespaces.</li>
          <li><b>Reliability</b> — multi-AZ control plane, PodDisruptionBudgets, back up etcd, and rehearse DR with Velero.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Kubernetes is declarative — describe desired state, controllers reconcile.</li>
          <li>Pods, Deployments, and Services form the core of every application.</li>
          <li>Networking, storage, and identity are all first-class, pluggable APIs.</li>
          <li>GitOps, Helm, and observability turn Kubernetes into a production platform.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is Kubernetes only for large teams?">No. Small teams benefit from portability, self-healing, and a consistent deployment model across environments.</FAQItem>
        <FAQItem q="Managed or self-managed?">Prefer managed (EKS/AKS/GKE) unless you have a strong reason to run the control plane yourself.</FAQItem>
        <FAQItem q="Docker vs containerd?">Kubernetes uses the CRI. Modern clusters run containerd or CRI-O; Docker is fine for building images.</FAQItem>
        <FAQItem q="Which certification should I start with?">CKAD for developers, CKA for admins, then CKS for security specialists.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://kubernetes.io/docs/" target="_blank" rel="noreferrer">Kubernetes Documentation</a> · <a className="text-primary hover:underline" href="https://www.cncf.io/" target="_blank" rel="noreferrer">CNCF</a> · <a className="text-primary hover:underline" href="https://helm.sh/docs/" target="_blank" rel="noreferrer">Helm Docs</a> · <a className="text-primary hover:underline" href="https://kustomize.io/" target="_blank" rel="noreferrer">Kustomize</a></li>
          <li><a className="text-primary hover:underline" href="https://argo-cd.readthedocs.io/" target="_blank" rel="noreferrer">Argo CD</a> · <a className="text-primary hover:underline" href="https://fluxcd.io/docs/" target="_blank" rel="noreferrer">Flux CD</a> · <a className="text-primary hover:underline" href="https://prometheus.io/docs/" target="_blank" rel="noreferrer">Prometheus</a> · <a className="text-primary hover:underline" href="https://grafana.com/docs/" target="_blank" rel="noreferrer">Grafana</a></li>
          <li><a className="text-primary hover:underline" href="https://istio.io/latest/docs/" target="_blank" rel="noreferrer">Istio</a> · <a className="text-primary hover:underline" href="https://linkerd.io/2/overview/" target="_blank" rel="noreferrer">Linkerd</a> · <a className="text-primary hover:underline" href="https://opentelemetry.io/docs/" target="_blank" rel="noreferrer">OpenTelemetry</a> · <a className="text-primary hover:underline" href="https://velero.io/docs/" target="_blank" rel="noreferrer">Velero</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.aws.amazon.com/eks/" target="_blank" rel="noreferrer">Amazon EKS</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/azure/aks/" target="_blank" rel="noreferrer">Azure AKS</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/kubernetes-engine/docs" target="_blank" rel="noreferrer">Google GKE</a> · <a className="text-primary hover:underline" href="https://ranchermanager.docs.rancher.com/" target="_blank" rel="noreferrer">Rancher</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Kubernetes and the cloud-native ecosystem evolve rapidly — always consult the latest official Kubernetes and vendor documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
