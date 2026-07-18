import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "cyber-security-frequently-asked-questions",
  title: "Cyber Security — Frequently Asked Questions",
  category: "Security",
  difficulty: "Beginner",
  readingTime: "13 min",
  pages: 10,
  lastUpdated: "January 2026",
  tags: ["Security", "Defense"],
  heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1800&q=80",
  heroSubtitle: "FAQs covering threats, defenses, certifications, careers, tools, and enterprise security programs.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
  { id: "risk", label: "Risk Assessment Tables" },
  { id: "examples", label: "Real-world Defensive Examples" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "career", label: "Career & Interview Insights" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Cyber Security — Beginner Guide", tag: "Security", time: "13 min" },
  { title: "Cyber Security — Cheat Sheet", tag: "Security", time: "6 min" },
  { title: "Cyber Security — Interview Questions", tag: "Security", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/cyber-security-frequently-asked-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/cyber-security-frequently-asked-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Explain the CIA Triad and defense-in-depth as the backbone of cyber security.</li>
          <li>Recognize common threats — malware, phishing, ransomware, insider risk — and defensive controls.</li>
          <li>Apply IAM, cryptography, network, endpoint, and cloud controls appropriately.</li>
          <li>Follow structured incident response and business continuity practices.</li>
          <li>Map programs to NIST CSF, ISO 27001, CIS Controls, and OWASP guidance.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic computer literacy and networking concepts (IP, DNS, HTTP/HTTPS).</li>
          <li>Comfort with a terminal and cloud service basics (IaaS, PaaS, SaaS).</li>
          <li>All content is defensive and assumes authorized environments.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Principles</li>
          <li>Core Concepts & Detailed Content</li>
          <li>Architecture & Workflow</li>
          <li>Risk Assessment Tables</li>
          <li>Real-world Defensive Examples</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Career, Interviews & Summary</li>
          <li>FAQs, References & Disclaimer</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>FAQs covering threats, defenses, certifications, careers, tools, and enterprise security programs. This resource is educational and defense-oriented — every practice below focuses on protecting people, systems, and data.</p>
        <Callout tone="info" title="Defense in depth">No single control is enough. Combine identity, network, endpoint, data, monitoring, and response layers.</Callout>
        <Figure src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1400&q=80" caption="Figure 1 — Layered defenses: identity, network, endpoint, data, and monitoring." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <p>Cyber security applies the <b>CIA Triad</b> — Confidentiality, Integrity, Availability — across the enterprise using layered controls and continuous monitoring.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Threat landscape</b> — malware families (viruses, worms, trojans, ransomware, spyware, rootkits, botnets), phishing, and social engineering.</li>
          <li><b>Identity</b> — RBAC, MFA, biometrics, least privilege, Zero Trust policy engines.</li>
          <li><b>Cryptography</b> — symmetric/asymmetric, hashing, digital signatures, TLS 1.3, PKI hygiene.</li>
          <li><b>Network & endpoint</b> — firewalls, IDS/IPS, WAF, EDR/XDR, DNS security.</li>
          <li><b>Cloud & DevSecOps</b> — IAM, secure SDLC, container/K8s hardening, IaC scanning.</li>
          <li><b>Operations</b> — SIEM, monitoring, incident response, BC/DR, forensics fundamentals.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Identity ─► Network ─► Endpoint ─► Application ─► Data
    │          │          │             │            │
   MFA       Zones     EDR/XDR         WAF        Encryption
    ▼          ▼          ▼             ▼            ▼
        SIEM + Monitoring + Threat Intel + Incident Response`}
        </pre>
        <Code>{`# Baseline cyber hygiene checklist (defensive)
[ ] MFA on all users, phishing-resistant for admins
[ ] Least-privilege IAM with periodic access reviews
[ ] Patch cadence documented; critical CVEs in 7 days
[ ] Centralized logging with tamper-evident retention
[ ] Backups tested; DR runbooks rehearsed quarterly
[ ] Security awareness training and phishing simulations`}</Code>
      </Section>

      <Section id="risk" title="Risk Assessment Tables">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Risk Level</th>
                <th className="py-2 pr-4">Example</th>
                <th className="py-2 pr-4">Response SLA</th>
                <th className="py-2">Control</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Critical</td><td>Unpatched internet-facing service</td><td>24 hours</td><td>Isolate + patch + monitor</td></tr>
              <tr><td className="py-2 pr-4">High</td><td>Shared admin credentials</td><td>7 days</td><td>MFA + PAM + rotation</td></tr>
              <tr><td className="py-2 pr-4">Medium</td><td>Missing security training</td><td>30 days</td><td>Awareness program</td></tr>
              <tr><td className="py-2 pr-4">Low</td><td>Verbose service banners</td><td>90 days</td><td>Hardening baseline</td></tr>
            </tbody>
          </table>
        </div>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Likelihood x impact drives the remediation queue and executive risk view." />
      </Section>

      <Section id="examples" title="Real-world Defensive Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Ransomware resilience</b> — immutable backups + tested DR shortens recovery from days to hours.</li>
          <li><b>Phishing defense</b> — MFA + email authentication (SPF/DKIM/DMARC) cuts credential theft.</li>
          <li><b>Cloud posture</b> — CSPM audits catch public buckets and overly broad IAM roles early.</li>
          <li><b>Insider risk</b> — least privilege + DLP + monitoring reduces accidental data exposure.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Adopt Zero Trust — verify every user, device, and request continuously.</li>
          <li>Segment networks and enforce least-privilege identity everywhere.</li>
          <li>Centralize logs; alert on identity, DNS, and egress anomalies.</li>
          <li>Patch and rotate credentials on documented schedules.</li>
          <li>Run security awareness training and phishing simulations regularly.</li>
          <li>Rehearse incident response and business continuity plans.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Skipping MFA on admin and remote access.</li>
          <li>Flat networks with implicit trust between workloads.</li>
          <li>Backups that are never tested for restore.</li>
          <li>Ignoring DNS, email, and identity telemetry.</li>
          <li>No documented incident response or communications plan.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Map every control to NIST CSF / CIS Controls / ISO 27001 for shared vocabulary.</li>
          <li>Tag assets by data classification to drive automated policy.</li>
          <li>Adopt CIS Benchmarks for the fastest hardening baseline.</li>
          <li>Rehearse tabletop exercises using MITRE ATT&amp;CK scenarios.</li>
          <li>Communicate risk in business terms; executives respond to impact.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Control</th>
                <th className="py-2 pr-4">Layer</th>
                <th className="py-2 pr-4">Primary Purpose</th>
                <th className="py-2">Example</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">MFA</td><td>Identity</td><td>Stop credential theft</td><td>Phishing-resistant factors</td></tr>
              <tr><td className="py-2 pr-4">EDR/XDR</td><td>Endpoint</td><td>Detect &amp; respond</td><td>Behavioral analytics</td></tr>
              <tr><td className="py-2 pr-4">SIEM</td><td>Operations</td><td>Correlate signals</td><td>Cross-source detections</td></tr>
              <tr><td className="py-2 pr-4">Zero Trust PDP</td><td>Identity + Context</td><td>Continuous authZ</td><td>Device + user posture</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="career" title="Career & Interview Insights">
        <ul className="list-disc space-y-1 pl-5">
          <li>Roles: SOC Analyst, IR Analyst, GRC Analyst, Security Engineer, Cloud Security, AppSec.</li>
          <li>Certifications: Security+, CySA+, SSCP, CISSP, cloud-provider security certs.</li>
          <li>Portfolio: defensive lab write-ups, tabletop reports, and control-mapping docs.</li>
          <li>Interview prep: CIA Triad, NIST CSF, MITRE ATT&amp;CK, IR phases, and Zero Trust.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cyber security is layered, identity-aware, and monitored end-to-end.</li>
          <li>Zero Trust replaces implicit perimeter trust with continuous verification.</li>
          <li>Detection and response are as important as prevention.</li>
          <li>Frameworks from NIST, ISO, CIS, OWASP, and MITRE guide durable programs.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="What is the CIA Triad?">Confidentiality, Integrity, and Availability — the three pillars of every security program.</FAQItem>
        <FAQItem q="Is antivirus still enough?">No. Modern defense combines EDR/XDR, identity, network, and data controls with monitoring.</FAQItem>
        <FAQItem q="How do I start a cyber security career?">Learn networking + Linux basics, earn Security+ or equivalent, build a defensive portfolio, and target SOC or GRC roles.</FAQItem>
        <FAQItem q="What is Zero Trust in one sentence?">Never trust, always verify — every request is authenticated, authorized, and encrypted based on context.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.nist.gov/cyberframework" target="_blank" rel="noreferrer">NIST Cybersecurity Framework</a> · <a className="text-primary hover:underline" href="https://www.cisa.gov/" target="_blank" rel="noreferrer">CISA</a> · <a className="text-primary hover:underline" href="https://www.cisecurity.org/controls" target="_blank" rel="noreferrer">CIS Controls</a></li>
          <li><a className="text-primary hover:underline" href="https://www.iso.org/isoiec-27001-information-security.html" target="_blank" rel="noreferrer">ISO/IEC 27001</a> · <a className="text-primary hover:underline" href="https://owasp.org/" target="_blank" rel="noreferrer">OWASP</a> · <a className="text-primary hover:underline" href="https://owasp.org/www-project-application-security-verification-standard/" target="_blank" rel="noreferrer">OWASP ASVS</a></li>
          <li><a className="text-primary hover:underline" href="https://attack.mitre.org/" target="_blank" rel="noreferrer">MITRE ATT&amp;CK</a> · <a className="text-primary hover:underline" href="https://cve.mitre.org/" target="_blank" rel="noreferrer">CVE</a> · <a className="text-primary hover:underline" href="https://cwe.mitre.org/" target="_blank" rel="noreferrer">CWE</a> · <a className="text-primary hover:underline" href="https://www.first.org/cvss/" target="_blank" rel="noreferrer">CVSS</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.microsoft.com/security/" target="_blank" rel="noreferrer">Microsoft Security</a> · <a className="text-primary hover:underline" href="https://aws.amazon.com/security/" target="_blank" rel="noreferrer">AWS Security</a> · <a className="text-primary hover:underline" href="https://cloud.google.com/security" target="_blank" rel="noreferrer">Google Cloud Security</a></li>
          <li><a className="text-primary hover:underline" href="https://kubernetes.io/docs/concepts/security/" target="_blank" rel="noreferrer">Kubernetes Security</a> · <a className="text-primary hover:underline" href="https://docs.docker.com/engine/security/" target="_blank" rel="noreferrer">Docker Security</a> · <a className="text-primary hover:underline" href="https://www.linuxfoundation.org/" target="_blank" rel="noreferrer">Linux Foundation</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is intended for <b>educational purposes</b> and focuses on <b>authorized, ethical, and defensive</b> cybersecurity practices. It does not contain malware, exploit code, or offensive payloads. Standards evolve — always consult the latest official documentation from NIST, CISA, CIS, ISO, OWASP, and your platform vendors. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
