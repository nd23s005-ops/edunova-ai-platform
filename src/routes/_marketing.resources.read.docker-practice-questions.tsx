import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "docker-practice-questions",
  title: "Docker — Practice Questions",
  category: "Cloud & DevOps",
  difficulty: "Beginner",
  readingTime: "24 min",
  pages: 23,
  lastUpdated: "February 2026",
  tags: ["Docker", "Containers"],
  heroImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1800&q=80",
  heroSubtitle: "Structured Docker practice questions to test your understanding of images, containers, Compose, networking, storage, and security.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Docker Architecture & Container Lifecycle" },
  { id: "catalog", label: "Feature & Command Catalog" },
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
  { title: "Docker — Beginner Guide", tag: "Docker", time: "13 min" },
  { title: "Docker — Cheat Sheet", tag: "Docker", time: "6 min" },
  { title: "Docker — Interview Questions", tag: "Docker", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/docker-practice-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/docker-practice-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain containerization and how Docker differs from virtual machines.</li>
          <li>Build efficient images with Dockerfiles, multi-stage builds, and BuildKit.</li>
          <li>Run, network, and persist containers with volumes and bind mounts.</li>
          <li>Compose multi-service stacks and prepare them for CI/CD delivery.</li>
          <li>Secure containers — rootless mode, image signing, scanning, and least privilege.</li>
          <li>Observe, scale, and troubleshoot containerized workloads in production.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic Linux command line, shell scripting, and networking (ports, DNS).</li>
          <li>Familiarity with Git and any programming language / runtime.</li>
          <li>Docker Desktop (macOS/Windows) or Docker Engine on Linux installed.</li>
          <li>A Docker Hub account for pushing images.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Containerization Fundamentals</li>
          <li>Core Concepts — Images, Containers, Networks, Volumes</li>
          <li>Docker Architecture & Container Lifecycle</li>
          <li>Feature & Command Catalog</li>
          <li>Practical Examples & Enterprise Use Cases</li>
          <li>Best Practices, Common Mistakes & Tips</li>
          <li>Performance, Security & Cost</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Structured Docker practice questions to test your understanding of images, containers, Compose, networking, storage, and security.</p>
        <Callout tone="info" title="Docker in one line">Package your app and its dependencies into an image, then run the same image identically on any machine, cluster, or cloud.</Callout>
        <Figure src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1800&q=80" caption="Figure 1 — Docker packages applications into portable images that run identically on laptops, CI, and production." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Containers vs VMs</b> — containers share the host kernel; VMs virtualize hardware.</li>
          <li><b>Docker Engine</b> — dockerd + containerd + runc, driven by the Docker CLI over the API.</li>
          <li><b>Images &amp; layers</b> — read-only stacked layers, union filesystem, content-addressable digests.</li>
          <li><b>Dockerfile</b> — FROM, RUN, COPY, ENV, ARG, EXPOSE, HEALTHCHECK, USER, ENTRYPOINT, CMD.</li>
          <li><b>Multi-stage builds &amp; BuildKit</b> — tiny final images, cache mounts, and parallel stages.</li>
          <li><b>Registries</b> — Docker Hub, AWS ECR, Azure Container Registry, Google Artifact Registry, self-hosted.</li>
          <li><b>Networking</b> — bridge, host, overlay, macvlan, and user-defined networks with DNS.</li>
          <li><b>Storage</b> — named volumes, bind mounts, tmpfs; storage drivers (overlay2).</li>
          <li><b>Compose</b> — declarative multi-service stacks with the Compose Specification.</li>
          <li><b>Swarm</b> — built-in orchestrator: services, stacks, scaling, secrets, rolling updates.</li>
          <li><b>Security</b> — rootless mode, user namespaces, capabilities, seccomp, AppArmor, read-only rootfs.</li>
          <li><b>Supply chain</b> — Docker Scout, image signing (Content Trust / cosign), SBOMs, vulnerability scanning.</li>
          <li><b>Observability</b> — logs, health checks, Prometheus, Grafana, OpenTelemetry, cAdvisor.</li>
          <li><b>CI/CD</b> — GitHub Actions, GitLab CI, Jenkins, Azure DevOps building and pushing images.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Docker Architecture & Container Lifecycle">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Client (docker CLI / Compose)
      │  REST API
      ▼
 Docker Engine (dockerd)
   ├─ containerd  (container supervisor)
   ├─ runc        (OCI runtime)
   ├─ BuildKit    (image builds)
   └─ Networking, Volumes, Logging

Image Build ─▶ Registry ─▶ Pull ─▶ Container Run
    │           │              │           │
 Dockerfile   Hub/ECR       docker pull  docker run
                                          │
                            Created ─▶ Running ─▶ Paused ─▶ Stopped ─▶ Removed
`}
        </pre>
        <Code lang="docker">{`# Multi-stage, cache-friendly Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost/ || exit 1
USER nginx`}</Code>
        <Code lang="yaml">{`# docker-compose.yml — multi-service stack
services:
  api:
    build: ./api
    environment: { NODE_ENV: production }
    depends_on: [db]
    healthcheck: { test: ["CMD","curl","-f","http://localhost:3000/health"] }
    deploy: { resources: { limits: { cpus: "1.0", memory: 512M } } }
  db:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    secrets: [db_password]
volumes: { pgdata: {} }
secrets:
  db_password: { file: ./secrets/db_password.txt }`}</Code>
        <Figure src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1400&q=80" caption="Figure 2 — Container platform view — images flow from build to registry to runtime, orchestrated by Compose, Swarm, or Kubernetes." />
      </Section>

      <Section id="catalog" title="Feature & Command Catalog">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Area</th>
                <th className="py-2 pr-4">Command / Feature</th>
                <th className="py-2">Purpose</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Image</td><td><code>docker build / buildx</code></td><td>Build single- and multi-platform images.</td></tr>
              <tr><td className="py-2 pr-4">Image</td><td><code>docker pull / push / tag</code></td><td>Move images between registries.</td></tr>
              <tr><td className="py-2 pr-4">Container</td><td><code>docker run / exec / logs / stop</code></td><td>Full container lifecycle.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>Bridge / Host / Overlay / Macvlan</td><td>User-defined networks with DNS-based service discovery.</td></tr>
              <tr><td className="py-2 pr-4">Storage</td><td>Volumes / Bind / tmpfs</td><td>Named volumes for state, bind mounts for dev, tmpfs for secrets.</td></tr>
              <tr><td className="py-2 pr-4">Compose</td><td><code>docker compose up / down</code></td><td>Multi-service local + CI stacks.</td></tr>
              <tr><td className="py-2 pr-4">Swarm</td><td><code>docker swarm / service / stack</code></td><td>Built-in orchestrator for clustered deploys.</td></tr>
              <tr><td className="py-2 pr-4">Security</td><td>Rootless / Scout / Content Trust</td><td>Least privilege, scanning, signing.</td></tr>
              <tr><td className="py-2 pr-4">Ops</td><td>Health checks / Restart policies / Resource limits</td><td>Production reliability.</td></tr>
              <tr><td className="py-2 pr-4">Registry</td><td>Docker Hub / ECR / ACR / GAR</td><td>Public and private image storage.</td></tr>
              <tr><td className="py-2 pr-4">CI/CD</td><td>GitHub Actions / GitLab CI / Jenkins / Azure DevOps</td><td>Build, scan, and push images automatically.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Microservices</b> — one image per service, wired together with Compose or Kubernetes.</li>
          <li><b>Monolith modernization</b> — containerize legacy apps to standardize deployment.</li>
          <li><b>Dev environments</b> — reproducible local stacks (DB, cache, queue) with Compose profiles.</li>
          <li><b>CI/CD</b> — build once, promote images through environments with immutable tags/digests.</li>
          <li><b>Data &amp; ML</b> — reproducible training and inference containers with pinned dependencies.</li>
          <li><b>Edge deploys</b> — small, multi-platform images shipped to IoT and edge nodes.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use small, official base images (alpine, distroless) and multi-stage builds.</li>
          <li>Pin image digests in production; never rely on <code>latest</code>.</li>
          <li>Run as a non-root user; set read-only root filesystem where possible.</li>
          <li>Always define <b>HEALTHCHECK</b>, restart policies, and CPU/memory limits.</li>
          <li>Use named volumes for state; never bake secrets into images.</li>
          <li>Scan images with Docker Scout / Trivy in CI; block on critical CVEs.</li>
          <li>Sign images (Content Trust / cosign) and enforce signatures at deploy time.</li>
          <li>Cache aggressively with BuildKit cache mounts and layered COPY ordering.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Running everything as root inside the container.</li>
          <li>Using <code>latest</code> tags — non-reproducible deploys.</li>
          <li>Bundling secrets into image layers instead of using secrets/env at runtime.</li>
          <li>No resource limits — one container starves the host.</li>
          <li>Bind-mounting <code>/</code> or the Docker socket into untrusted containers.</li>
          <li>Ignoring build cache order — invalidating everything on every commit.</li>
          <li>Storing state in the container filesystem instead of a volume.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Enable BuildKit (<code>DOCKER_BUILDKIT=1</code>) and use <code>--mount=type=cache</code>.</li>
          <li>Use <code>docker buildx bake</code> for multi-platform + parallel builds.</li>
          <li>Use Compose <b>profiles</b> to toggle optional services (tests, tracing).</li>
          <li>Prefer <code>docker context</code> to switch between local/remote engines.</li>
          <li>Use <code>--init</code> for correct signal handling of PID 1 processes.</li>
          <li>Inspect layers with <code>docker history</code> and <code>dive</code>.</li>
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
              <tr><td className="py-2 pr-4">Isolation</td><td>Containers</td><td>Virtual Machines</td><td>Speed and density vs full OS isolation.</td></tr>
              <tr><td className="py-2 pr-4">Storage</td><td>Named Volume</td><td>Bind Mount</td><td>Portable prod state vs local dev iteration.</td></tr>
              <tr><td className="py-2 pr-4">Network</td><td>Bridge</td><td>Overlay</td><td>Single host vs multi-host clustered networking.</td></tr>
              <tr><td className="py-2 pr-4">Orchestrator</td><td>Docker Swarm</td><td>Kubernetes</td><td>Simple built-in vs full-featured, industry standard.</td></tr>
              <tr><td className="py-2 pr-4">Build</td><td>Legacy builder</td><td>BuildKit / buildx</td><td>Always prefer BuildKit for cache, secrets, multi-arch.</td></tr>
              <tr><td className="py-2 pr-4">Base</td><td>Alpine</td><td>Distroless</td><td>Small + package manager vs minimal + hardened.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Cost">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — small images, layer ordering, cache mounts, correct CPU/memory limits.</li>
          <li><b>Security</b> — rootless mode, non-root users, capabilities dropped, seccomp/AppArmor, image signing, CVE scanning.</li>
          <li><b>Supply chain</b> — pinned digests, SBOMs, signed images, private registries with IAM.</li>
          <li><b>Reliability</b> — health checks, restart policies, graceful shutdown (SIGTERM), and readiness gates.</li>
          <li><b>Cost</b> — spot/preemptible nodes, right-sized limits, and multi-stage builds to trim registry storage.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Docker standardized the packaging and runtime model for modern applications.</li>
          <li>Master Dockerfile, BuildKit, and Compose before reaching for an orchestrator.</li>
          <li>Security and supply chain matter — sign, scan, and pin images.</li>
          <li>Docker plus Kubernetes/Swarm plus CI/CD is the modern cloud-native toolchain.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I still need Docker if I use Kubernetes?">Yes — you build OCI images (usually with Docker/BuildKit) that Kubernetes runs via containerd.</FAQItem>
        <FAQItem q="Docker Desktop vs Docker Engine?">Desktop is the GUI + VM for macOS/Windows; Engine is the Linux daemon. Same runtime underneath.</FAQItem>
        <FAQItem q="Compose or Swarm or Kubernetes?">Compose for dev/small stacks, Swarm for simple clustering, Kubernetes for production at scale.</FAQItem>
        <FAQItem q="Which certification should I aim for?">Docker Certified Associate (DCA), then Kubernetes CKAD/CKA/CKS for orchestration.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://docs.docker.com/" target="_blank" rel="noreferrer">Docker Documentation</a> · <a className="text-primary hover:underline" href="https://docs.docker.com/compose/" target="_blank" rel="noreferrer">Docker Compose</a> · <a className="text-primary hover:underline" href="https://docs.docker.com/build/" target="_blank" rel="noreferrer">Docker Build / BuildKit</a> · <a className="text-primary hover:underline" href="https://docs.docker.com/scout/" target="_blank" rel="noreferrer">Docker Scout</a></li>
          <li><a className="text-primary hover:underline" href="https://opencontainers.org/" target="_blank" rel="noreferrer">OCI</a> · <a className="text-primary hover:underline" href="https://containerd.io/docs/" target="_blank" rel="noreferrer">containerd</a> · <a className="text-primary hover:underline" href="https://kubernetes.io/docs/" target="_blank" rel="noreferrer">Kubernetes</a> · <a className="text-primary hover:underline" href="https://www.cncf.io/" target="_blank" rel="noreferrer">CNCF</a></li>
          <li><a className="text-primary hover:underline" href="https://prometheus.io/docs/" target="_blank" rel="noreferrer">Prometheus</a> · <a className="text-primary hover:underline" href="https://grafana.com/docs/" target="_blank" rel="noreferrer">Grafana</a> · <a className="text-primary hover:underline" href="https://opentelemetry.io/docs/" target="_blank" rel="noreferrer">OpenTelemetry</a> · <a className="text-primary hover:underline" href="https://docs.github.com/actions" target="_blank" rel="noreferrer">GitHub Actions</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is provided for educational purposes only. Docker, Docker Desktop, Docker Hub, Docker Compose, Docker Scout, and Docker Swarm are trademarks of Docker, Inc. Always consult the official Docker documentation for the most accurate and up-to-date guidance.</p>
      </Section>
    </ReaderShell>
  );
}
