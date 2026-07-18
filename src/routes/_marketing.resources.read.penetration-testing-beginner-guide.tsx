import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "penetration-testing-beginner-guide",
  title: "Penetration Testing — Beginner Guide",
  category: "Security",
  difficulty: "Beginner",
  readingTime: "15 min",
  pages: 25,
  lastUpdated: "April 2026",
  tags: ["Security", "Pentest", "Offensive"],
  heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1800&q=80",
  heroSubtitle: "A beginner-friendly educational guide introducing Penetration Testing fundamentals — ethical hacking principles, PTES methodology, OWASP Top 10 overview, reconnaissance concepts, vulnerability assessment, reporting, legal considerations, and defensive security best practices.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Detailed Educational Content" },
  { id: "methodology", label: "Methodology & Workflow" },
  { id: "risk", label: "Risk Assessment & Tables" },
  { id: "examples", label: "Real-world Defensive Examples" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Penetration Testing — Complete Tutorial", tag: "Security", time: "50 min" },
  { title: "Penetration Testing — Cheat Sheet", tag: "Security", time: "3 min" },
  { title: "Penetration Testing — Interview Questions", tag: "Security", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/penetration-testing-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/penetration-testing-beginner-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the ethical and legal foundations of authorized penetration testing.</li>
          <li>Apply the PTES lifecycle and OWASP frameworks to structured security assessments.</li>
          <li>Perform risk-based vulnerability analysis and prioritize remediation.</li>
          <li>Communicate findings clearly to technical and executive stakeholders.</li>
          <li>Recognize compliance requirements (ISO 27001, PCI-DSS, SOC 2, GDPR).</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic networking (TCP/IP, DNS, HTTP/HTTPS) and Linux command line comfort.</li>
          <li>Familiarity with common web technologies and cloud service models.</li>
          <li>Written authorization is mandatory before any assessment activity.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Ethics</li>
          <li>Detailed Educational Content</li>
          <li>PTES Methodology & Workflow</li>
          <li>Risk Assessment Tables</li>
          <li>Real-world Defensive Examples</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Tips, Comparisons & Summary</li>
          <li>FAQs, References & Disclaimer</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>A beginner-friendly educational guide introducing Penetration Testing fundamentals — ethical hacking principles, PTES methodology, OWASP Top 10 overview, reconnaissance concepts, vulnerability assessment, reporting, legal considerations, and defensive security best practices. Every activity described below is educational and assumes explicit written authorization; unauthorized testing is illegal in most jurisdictions.</p>
        <Callout tone="info" title="Ethics first">Penetration testing exists to <b>defend</b> systems. Scope, authorization, and responsible disclosure are non-negotiable.</Callout>
        <Figure src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=80" caption="Figure 1 — Authorized security assessment lifecycle: scope, plan, assess, report, remediate." />
      </Section>

      <Section id="content" title="Detailed Educational Content">
        <p>Penetration testing is a <b>structured, authorized</b> evaluation of a system's security posture. The goal is not to break things — it is to help organizations discover, prioritize, and remediate weaknesses <i>before</i> a real adversary does.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Scope & authorization</b> — signed Rules of Engagement (RoE) and legal sign-off.</li>
          <li><b>Reconnaissance concepts</b> — passive OSINT and defensive attack-surface awareness.</li>
          <li><b>Vulnerability assessment</b> — CVSS scoring, CWE mapping, and CVE tracking.</li>
          <li><b>Web & API security</b> — OWASP Top 10, OWASP API Top 10, secure defaults.</li>
          <li><b>Cloud security assessment</b> — IAM, misconfiguration review, shared-responsibility model.</li>
          <li><b>Reporting & remediation</b> — executive summary, technical detail, prioritized fixes.</li>
        </ul>
      </Section>

      <Section id="methodology" title="PTES Methodology & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Pre-engagement ─► Intelligence ─► Threat Modeling ─► Vulnerability Analysis
        │                │                │                    │
   Scope + RoE      Passive OSINT   Attack Surfaces      CVSS + CWE Mapping
        ▼                ▼                ▼                    ▼
Exploitation ──► Post-Exploitation ──► Reporting ──► Remediation & Retest`}
        </pre>
        <Code>{`# Authorized engagement pre-flight checklist (defensive)
[ ] Signed Statement of Work (SoW) and Rules of Engagement (RoE)
[ ] In-scope assets documented with owners and criticality
[ ] Emergency contacts and stop-work criteria agreed
[ ] Data-handling agreement (findings treated as confidential)
[ ] Change-management windows communicated to stakeholders
[ ] Report template and severity rubric approved in advance`}</Code>
      </Section>

      <Section id="risk" title="Risk Assessment & Tables">
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
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">9.0 – 10.0</td><td>Critical</td><td>24 hours</td><td>Auth bypass, RCE class</td></tr>
              <tr><td className="py-2 pr-4">7.0 – 8.9</td><td>High</td><td>7 days</td><td>Privilege escalation</td></tr>
              <tr><td className="py-2 pr-4">4.0 – 6.9</td><td>Medium</td><td>30 days</td><td>Info disclosure</td></tr>
              <tr><td className="py-2 pr-4">0.1 – 3.9</td><td>Low</td><td>90 days</td><td>Hardening gaps</td></tr>
            </tbody>
          </table>
        </div>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Risk prioritization matrix: likelihood vs. impact drives remediation order." />
      </Section>

      <Section id="examples" title="Real-world Defensive Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Retail breach lessons</b> — segmenting card-data environments reduces blast radius.</li>
          <li><b>Cloud misconfiguration</b> — public storage bucket audits catch exposures before adversaries do.</li>
          <li><b>Supply chain</b> — SBOM adoption after major CVEs improved patch response times.</li>
          <li><b>Identity hardening</b> — MFA + conditional access dramatically reduces credential-stuffing risk.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Get written authorization <i>before</i> any assessment activity.</li>
          <li>Document every action with timestamps for reproducibility and audit.</li>
          <li>Prefer defensive framing — findings should always include remediation guidance.</li>
          <li>Communicate risk in business terms; executives care about impact, not payloads.</li>
          <li>Practice responsible disclosure and coordinate timelines with vendors.</li>
          <li>Retest after remediation to confirm fixes and prevent regression.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Starting activity before scope and authorization are finalized.</li>
          <li>Reporting raw findings without CVSS, CWE, and remediation context.</li>
          <li>Ignoring compensating controls when prioritizing risk.</li>
          <li>Only testing production — parity environments and CI pipelines matter too.</li>
          <li>Skipping the executive summary — decision-makers won't read the technical annex.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use a consistent finding template (title, evidence, impact, remediation, references).</li>
          <li>Map every finding to OWASP / CWE / MITRE ATT&amp;CK for shared vocabulary.</li>
          <li>Automate evidence capture (screenshots, request/response pairs, hashes).</li>
          <li>Keep a lessons-learned log; retros compound across engagements.</li>
          <li>Study the CIS Benchmarks — they are the fastest hardening baseline.</li>
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
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Vulnerability Assessment</td><td>Breadth of known issues</td><td>Days</td><td>Prioritized CVE list</td></tr>
              <tr><td className="py-2 pr-4">Penetration Test</td><td>Exploitability + impact</td><td>1 – 4 weeks</td><td>Narrative + findings report</td></tr>
              <tr><td className="py-2 pr-4">Red Team</td><td>Objective-based emulation</td><td>Weeks – months</td><td>Executive after-action review</td></tr>
              <tr><td className="py-2 pr-4">Purple Team</td><td>Collaboration + detection</td><td>Days – weeks</td><td>Detection improvement plan</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Penetration testing is authorized, structured, and defense-oriented.</li>
          <li>PTES + OWASP + NIST provide the shared methodology backbone.</li>
          <li>Great pentesters are great communicators — reporting is the product.</li>
          <li>Compliance frameworks and business impact must guide prioritization.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is penetration testing legal?">Only when performed under explicit written authorization within an agreed scope. Unauthorized testing is a crime in most jurisdictions.</FAQItem>
        <FAQItem q="What certifications should I pursue?">Vendor-neutral options include CompTIA Security+, PenTest+, and (with experience) OSCP or GPEN. Pick what matches your target role.</FAQItem>
        <FAQItem q="What is responsible disclosure?">A coordinated process to report findings to the vendor privately, allow reasonable time to fix, and disclose publicly only after remediation.</FAQItem>
        <FAQItem q="How is a pentest different from a vulnerability scan?">A scan enumerates known issues; a pentest validates exploitability, chains findings, and communicates business impact.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://owasp.org/" target="_blank" rel="noreferrer">OWASP — Open Worldwide Application Security Project</a></li>
          <li><a className="text-primary hover:underline" href="http://www.pentest-standard.org/" target="_blank" rel="noreferrer">PTES — Penetration Testing Execution Standard</a></li>
          <li><a className="text-primary hover:underline" href="https://csrc.nist.gov/publications/sp" target="_blank" rel="noreferrer">NIST — Special Publications (SP 800 series)</a></li>
          <li><a className="text-primary hover:underline" href="https://attack.mitre.org/" target="_blank" rel="noreferrer">MITRE ATT&amp;CK</a></li>
          <li><a className="text-primary hover:underline" href="https://www.cisa.gov/" target="_blank" rel="noreferrer">CISA — Cybersecurity & Infrastructure Security Agency</a></li>
          <li><a className="text-primary hover:underline" href="https://www.first.org/cvss/" target="_blank" rel="noreferrer">FIRST — CVSS Specification</a></li>
          <li><a className="text-primary hover:underline" href="https://cwe.mitre.org/" target="_blank" rel="noreferrer">CWE — Common Weakness Enumeration</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is intended for <b>educational purposes</b> and focuses on <b>authorized, ethical, and defensive</b> security practices. It does not contain operational exploit instructions or offensive payloads. Technologies and standards evolve — always consult the latest official documentation from OWASP, PTES, NIST, MITRE, CISA, and CIS. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
