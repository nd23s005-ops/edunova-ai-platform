import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "ethical-hacking-project-guide",
  title: "Ethical Hacking — Project Guide",
  category: "Security",
  difficulty: "Intermediate",
  readingTime: "18 min",
  pages: 23,
  lastUpdated: "September 2026",
  tags: ["Security", "Hacking", "Pentest"],
  heroImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1800&q=80",
  heroSubtitle: "A project guide for building an ethical hacking portfolio through authorized lab work, reporting, and defensive remediation projects.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "methodology", label: "Methodology & Workflow" },
  { id: "risk", label: "Risk Assessment Tables" },
  { id: "examples", label: "Real-world Defensive Examples" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "career", label: "Career & Interview Insights" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Ethical Hacking — Beginner Guide", tag: "Security", time: "11 min" },
  { title: "Ethical Hacking — Cheat Sheet", tag: "Security", time: "4 min" },
  { title: "Ethical Hacking — Interview Questions", tag: "Security", time: "41 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/ethical-hacking-project-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/ethical-hacking-project-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain the ethics, legality, and authorization required for security testing.</li>
          <li>Apply the PTES lifecycle and OWASP / MITRE frameworks to structured assessments.</li>
          <li>Perform risk-based analysis using CVSS, CWE, and CVE references.</li>
          <li>Communicate findings to executives and engineers with remediation guidance.</li>
          <li>Recognize compliance requirements (NIST CSF, ISO 27001, PCI-DSS, SOC 2, GDPR).</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic networking (TCP/IP, DNS, HTTP/HTTPS) and Linux command-line comfort.</li>
          <li>Familiarity with web technologies, cloud service models, and IAM basics.</li>
          <li>Written authorization is mandatory before any assessment activity.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Ethics</li>
          <li>Core Concepts & Detailed Content</li>
          <li>Methodology & Workflow (PTES + OWASP)</li>
          <li>Risk Assessment Tables</li>
          <li>Real-world Defensive Examples</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Career, Interviews & Summary</li>
          <li>FAQs, References & Disclaimer</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>A project guide for building an ethical hacking portfolio through authorized lab work, reporting, and defensive remediation projects. All content is educational and defense-oriented; every activity assumes explicit written authorization within an agreed scope.</p>
        <Callout tone="info" title="Ethics first">Ethical hacking exists to <b>defend</b> systems. Scope, authorization, and responsible disclosure are non-negotiable.</Callout>
        <Figure src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=80" caption="Figure 1 — Authorized security testing lifecycle: scope, plan, assess, report, remediate." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <p>Ethical hacking is a <b>structured, authorized</b> evaluation of a system's security posture. The objective is to help defenders find and fix weaknesses before adversaries do.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Hacker categories</b> — white, gray, and black hat; only authorized testing is lawful.</li>
          <li><b>Frameworks</b> — PTES lifecycle, OWASP Top 10 / ASVS / WSTG, MITRE ATT&amp;CK.</li>
          <li><b>Threat modeling</b> — STRIDE / PASTA to reason about attack surfaces early.</li>
          <li><b>Vulnerability management</b> — CVSS scoring, CWE mapping, CVE tracking.</li>
          <li><b>Cloud & container</b> — IAM, misconfiguration review, Kubernetes hardening.</li>
          <li><b>Reporting</b> — executive summary, technical detail, prioritized remediation.</li>
        </ul>
      </Section>

      <Section id="methodology" title="Methodology & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Pre-engagement ─► Intelligence ─► Threat Modeling ─► Vulnerability Analysis
        │                │                │                    │
   Scope + RoE      Passive OSINT   Attack Surfaces      CVSS + CWE Mapping
        ▼                ▼                ▼                    ▼
Assessment ────► Post-Assessment ─────► Reporting ─────► Remediation & Retest`}
        </pre>
        <Code>{`# Authorized engagement pre-flight checklist (defensive)
[ ] Signed Statement of Work (SoW) and Rules of Engagement (RoE)
[ ] In-scope assets documented with owners and criticality
[ ] Emergency contacts and stop-work criteria agreed
[ ] Data-handling agreement (findings treated as confidential)
[ ] Change-management windows communicated to stakeholders
[ ] Report template and severity rubric approved in advance`}</Code>
      </Section>

      <Section id="risk" title="Risk Assessment Tables">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">CVSS Score</th>
                <th className="py-2 pr-4">Severity</th>
                <th className="py-2 pr-4">Response SLA</th>
                <th className="py-2">Example Category</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">9.0 – 10.0</td><td>Critical</td><td>24 hours</td><td>Auth bypass class</td></tr>
              <tr><td className="py-2 pr-4">7.0 – 8.9</td><td>High</td><td>7 days</td><td>Privilege escalation</td></tr>
              <tr><td className="py-2 pr-4">4.0 – 6.9</td><td>Medium</td><td>30 days</td><td>Info disclosure</td></tr>
              <tr><td className="py-2 pr-4">0.1 – 3.9</td><td>Low</td><td>90 days</td><td>Hardening gaps</td></tr>
            </tbody>
          </table>
        </div>
        <Figure src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80" caption="Figure 2 — Likelihood x impact drives the remediation queue and executive risk view." />
      </Section>

      <Section id="examples" title="Real-world Defensive Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Retail segmentation</b> — isolating card-data environments limits blast radius.</li>
          <li><b>Cloud misconfiguration audits</b> — catching public buckets before adversaries do.</li>
          <li><b>Supply chain hygiene</b> — SBOM adoption accelerating patch response.</li>
          <li><b>Identity hardening</b> — MFA + conditional access reducing credential stuffing risk.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Get written authorization <i>before</i> any assessment activity.</li>
          <li>Document every action with timestamps for reproducibility and audit.</li>
          <li>Always include remediation guidance and business-impact framing.</li>
          <li>Map findings to OWASP / CWE / MITRE ATT&amp;CK for shared vocabulary.</li>
          <li>Practice responsible disclosure and coordinate timelines.</li>
          <li>Retest after remediation to confirm fixes and prevent regression.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Starting activity before scope and authorization are finalized.</li>
          <li>Reporting raw findings without CVSS, CWE, or remediation context.</li>
          <li>Ignoring compensating controls when prioritizing risk.</li>
          <li>Only testing production — parity environments and CI matter too.</li>
          <li>Skipping the executive summary — leaders won't read the technical annex.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use a consistent finding template (title, evidence, impact, remediation, references).</li>
          <li>Automate evidence capture (screenshots, request/response pairs, hashes).</li>
          <li>Keep a lessons-learned log; retros compound across engagements.</li>
          <li>Adopt CIS Benchmarks as the fastest hardening baseline.</li>
          <li>Rehearse tabletop exercises using MITRE ATT&amp;CK scenarios.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Assessment Type</th>
                <th className="py-2 pr-4">Focus</th>
                <th className="py-2 pr-4">Duration</th>
                <th className="py-2">Deliverable</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Vulnerability Assessment</td><td>Breadth of known issues</td><td>Days</td><td>Prioritized CVE list</td></tr>
              <tr><td className="py-2 pr-4">Penetration Test</td><td>Exploitability + impact</td><td>1 – 4 weeks</td><td>Narrative + findings report</td></tr>
              <tr><td className="py-2 pr-4">Red Team</td><td>Objective-based emulation</td><td>Weeks – months</td><td>Executive after-action review</td></tr>
              <tr><td className="py-2 pr-4">Purple Team</td><td>Collaboration + detection</td><td>Days – weeks</td><td>Detection improvement plan</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="career" title="Career & Interview Insights">
        <ul className="list-disc space-y-1 pl-5">
          <li>Roles: Security Analyst, AppSec Engineer, Pentester, Red / Purple Team, Cloud Security.</li>
          <li>Certifications: Security+, PenTest+, CEH, OSCP, GPEN, cloud-provider security certs.</li>
          <li>Portfolio: authorized lab write-ups, threat models, and defensive project reports.</li>
          <li>Interview prep: PTES phases, OWASP Top 10, MITRE tactics, CVSS scoring rationale.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ethical hacking is authorized, structured, and defense-oriented.</li>
          <li>PTES + OWASP + NIST + MITRE provide the shared methodology backbone.</li>
          <li>Reporting is the product — clarity drives remediation.</li>
          <li>Compliance and business impact must guide prioritization.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is ethical hacking legal?">Only under explicit written authorization within an agreed scope. Unauthorized testing is a crime in most jurisdictions.</FAQItem>
        <FAQItem q="Which certifications should I pursue?">Vendor-neutral: Security+, PenTest+. With experience: OSCP, GPEN, or cloud-security tracks aligned to your target role.</FAQItem>
        <FAQItem q="What is responsible disclosure?">A coordinated process to report findings privately, give reasonable time to fix, and disclose publicly only after remediation.</FAQItem>
        <FAQItem q="Pentest vs. vulnerability scan?">A scan enumerates known issues; a pentest validates exploitability, chains findings, and communicates business impact.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://owasp.org/" target="_blank" rel="noreferrer">OWASP</a> · <a className="text-primary hover:underline" href="https://owasp.org/www-project-web-security-testing-guide/" target="_blank" rel="noreferrer">WSTG</a> · <a className="text-primary hover:underline" href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank" rel="noreferrer">ASVS</a> · <a className="text-primary hover:underline" href="https://owasp.org/API-Security/" target="_blank" rel="noreferrer">API Top 10</a></li>
          <li><a className="text-primary hover:underline" href="http://www.pentest-standard.org/" target="_blank" rel="noreferrer">PTES</a> · <a className="text-primary hover:underline" href="https://www.nist.gov/cyberframework" target="_blank" rel="noreferrer">NIST CSF</a> · <a className="text-primary hover:underline" href="https://www.cisa.gov/" target="_blank" rel="noreferrer">CISA</a></li>
          <li><a className="text-primary hover:underline" href="https://attack.mitre.org/" target="_blank" rel="noreferrer">MITRE ATT&amp;CK</a> · <a className="text-primary hover:underline" href="https://cve.mitre.org/" target="_blank" rel="noreferrer">CVE</a> · <a className="text-primary hover:underline" href="https://cwe.mitre.org/" target="_blank" rel="noreferrer">CWE</a> · <a className="text-primary hover:underline" href="https://www.first.org/cvss/" target="_blank" rel="noreferrer">CVSS</a></li>
          <li><a className="text-primary hover:underline" href="https://www.cisecurity.org/controls" target="_blank" rel="noreferrer">CIS Controls</a> · <a className="text-primary hover:underline" href="https://www.sans.org/" target="_blank" rel="noreferrer">SANS</a> · <a className="text-primary hover:underline" href="https://www.eccouncil.org/" target="_blank" rel="noreferrer">EC-Council</a> · <a className="text-primary hover:underline" href="https://www.offensive-security.com/" target="_blank" rel="noreferrer">Offensive Security</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/security/" target="_blank" rel="noreferrer">Microsoft Security</a> · <a className="text-primary hover:underline" href="https://aws.amazon.com/security/" target="_blank" rel="noreferrer">AWS Security</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/security" target="_blank" rel="noreferrer">Google Cloud Security</a> · <a className="text-primary hover:underline" href="https://kubernetes.io/docs/concepts/security/" target="_blank" rel="noreferrer">Kubernetes Security</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is intended for <b>educational purposes</b> and focuses on <b>authorized, ethical, and defensive</b> security practices. It does not contain operational exploit instructions, malware, or offensive payloads. Standards evolve — always consult the latest official documentation from OWASP, PTES, NIST, MITRE, CISA, and CIS. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
