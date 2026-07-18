import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "network-security-advanced-concepts",
  title: "Network Security — Advanced Concepts",
  category: "Security",
  difficulty: "Advanced",
  readingTime: "40 min",
  pages: 31,
  lastUpdated: "August 2026",
  tags: ["Security", "Network", "Defense"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "An advanced handbook covering Zero Trust, SD-WAN security, SASE, cloud network security, Kubernetes networking security, service mesh, micro-segmentation, SDN security, threat intel, AI-assisted monitoring, forensics, and governance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Detailed Educational Content" },
  { id: "architecture", label: "Network Architecture & Workflow" },
  { id: "risk", label: "Risk Assessment Tables" },
  { id: "examples", label: "Real-world Examples" },
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
  { title: "Network Security — Beginner Guide", tag: "Security", time: "18 min" },
  { title: "Network Security — Cheat Sheet", tag: "Security", time: "5 min" },
  { title: "Network Security — Interview Questions", tag: "Security", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/network-security-advanced-concepts")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/network-security-advanced-concepts" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand the CIA Triad and defense-in-depth as guiding principles.</li>
          <li>Map the OSI and TCP/IP models to real security controls.</li>
          <li>Design segmented, monitored networks with firewalls, IDS/IPS, and VPNs.</li>
          <li>Apply Zero Trust, PKI, TLS, and modern authentication correctly.</li>
          <li>Recognize compliance frameworks (NIST CSF, ISO 27001, PCI-DSS, SOC 2).</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic networking (IP, TCP, UDP, DNS, HTTP/HTTPS) and Linux command line.</li>
          <li>Familiarity with cloud service models (IaaS, PaaS, SaaS).</li>
          <li>All activities are defensive and assume authorized environments.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction & Principles</li>
          <li>Detailed Educational Content</li>
          <li>Network Architecture & Workflow</li>
          <li>Risk Assessment Tables</li>
          <li>Real-world Examples</li>
          <li>Best Practices & Common Mistakes</li>
          <li>Tips, Comparisons & Summary</li>
          <li>FAQs, References & Disclaimer</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>An advanced handbook covering Zero Trust, SD-WAN security, SASE, cloud network security, Kubernetes networking security, service mesh, micro-segmentation, SDN security, threat intel, AI-assisted monitoring, forensics, and governance. This resource is educational and defense-oriented — it focuses on how to protect networks, users, and data using layered, standards-aligned controls.</p>
        <Callout tone="info" title="Defense in depth">No single control is enough. Combine segmentation, identity, encryption, monitoring, and response.</Callout>
        <Figure src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80" caption="Figure 1 — Defense-in-depth: perimeter, segmentation, identity, endpoint, data, and monitoring layers." />
      </Section>

      <Section id="content" title="Detailed Educational Content">
        <p>Network Security applies the <b>CIA Triad</b> — Confidentiality, Integrity, Availability — across every layer of the OSI and TCP/IP models. The goal is to reduce attack surface, detect anomalies quickly, and recover safely.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Perimeter & segmentation</b> — firewalls, VLANs, micro-segmentation.</li>
          <li><b>Access control</b> — RBAC, MFA, NAC, Zero Trust policy engines.</li>
          <li><b>Cryptography in transit</b> — TLS 1.3, IPsec, WireGuard, PKI hygiene.</li>
          <li><b>Detection</b> — IDS/IPS, NDR, DNS security, SIEM correlation.</li>
          <li><b>Wireless security</b> — WPA3, 802.1X, guest isolation, rogue AP detection.</li>
          <li><b>Cloud networking</b> — VPCs, security groups, private endpoints, egress control.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Network Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Internet ─► Edge FW ─► WAF ─► DMZ ─► Internal FW ─► Segmented VLANs
                │          │                │                │
             IDS/IPS     TLS Term.       NAC / 802.1X      SIEM + NDR
                ▼          ▼                ▼                ▼
          Threat Intel   PKI / HSM      Zero Trust PDP    Incident Response`}
        </pre>
        <Code>{`# Baseline hardening checklist (defensive)
[ ] Segmentation by trust zone; deny-by-default east/west
[ ] MFA + conditional access on all admin surfaces
[ ] TLS 1.3 everywhere; disable legacy ciphers and SSLv3
[ ] Centralized logging with tamper-evident retention
[ ] DNS filtering + egress allow-lists for sensitive tiers
[ ] Documented incident response runbooks and tabletop drills`}</Code>
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
              <tr><td className="py-2 pr-4">Critical</td><td>Exposed admin plane</td><td>24 hours</td><td>Isolate + rotate + patch</td></tr>
              <tr><td className="py-2 pr-4">High</td><td>Legacy TLS / weak cipher</td><td>7 days</td><td>Upgrade + enforce policy</td></tr>
              <tr><td className="py-2 pr-4">Medium</td><td>Flat network segment</td><td>30 days</td><td>Segment + monitor</td></tr>
              <tr><td className="py-2 pr-4">Low</td><td>Verbose banners</td><td>90 days</td><td>Hardening baseline</td></tr>
            </tbody>
          </table>
        </div>
        <Figure src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=80" caption="Figure 2 — Layered risk view: likelihood x impact drives the remediation queue." />
      </Section>

      <Section id="examples" title="Real-world Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Retail segmentation</b> — isolating cardholder data reduces breach blast radius.</li>
          <li><b>Cloud egress control</b> — private endpoints and allow-lists prevent data exfil.</li>
          <li><b>Wireless hardening</b> — WPA3 + 802.1X eliminates pre-shared-key sprawl.</li>
          <li><b>DNS security</b> — sinkholes and RPZ stop malware C2 at the resolver.</li>
        </ul>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Default deny; explicitly allow required flows only.</li>
          <li>Assume breach — segment, monitor, and design blast-radius limits.</li>
          <li>Centralize logs; alert on identity, DNS, and egress anomalies.</li>
          <li>Patch and rotate credentials on documented schedules.</li>
          <li>Automate policy-as-code for firewalls, security groups, and IAM.</li>
          <li>Practice tabletop and full incident response exercises regularly.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Flat networks with implicit trust between workloads.</li>
          <li>Overly permissive firewall rules that accumulate over time.</li>
          <li>Pre-shared-key Wi-Fi and shared admin credentials.</li>
          <li>Unmonitored VPN concentrators and stale user accounts.</li>
          <li>Ignoring DNS as a security telemetry source.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use a policy-as-code repo to review firewall changes like code.</li>
          <li>Tag assets by data classification to drive automated controls.</li>
          <li>Baseline normal traffic before tuning IDS/IPS to avoid alert fatigue.</li>
          <li>Adopt CIS Benchmarks as the fastest hardening baseline.</li>
          <li>Rehearse incident response using MITRE ATT&amp;CK scenarios.</li>
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
              <tr><td className="py-2 pr-4">Stateful Firewall</td><td>L3/L4</td><td>Flow filtering</td><td>Edge / internal FW</td></tr>
              <tr><td className="py-2 pr-4">WAF</td><td>L7</td><td>App-layer protection</td><td>OWASP Top 10 mitigations</td></tr>
              <tr><td className="py-2 pr-4">IDS/IPS</td><td>L3–L7</td><td>Detection / prevention</td><td>Signature + anomaly</td></tr>
              <tr><td className="py-2 pr-4">Zero Trust PDP</td><td>Identity</td><td>Continuous authZ</td><td>Device + user posture</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Network security is layered, identity-aware, and monitored end-to-end.</li>
          <li>Zero Trust replaces implicit perimeter trust with continuous verification.</li>
          <li>Detection and response are as important as prevention.</li>
          <li>Standards from NIST, CIS, IETF, and CISA guide durable programs.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is a firewall enough?">No. Firewalls are one layer; you also need identity, segmentation, monitoring, and response.</FAQItem>
        <FAQItem q="Which VPN protocol is recommended?">Modern IPsec/IKEv2 or WireGuard with strong keys and MFA-backed auth are strong defaults.</FAQItem>
        <FAQItem q="What is Zero Trust in one sentence?">Never trust, always verify — every request is authenticated, authorized, and encrypted based on context.</FAQItem>
        <FAQItem q="Which certifications help?">CompTIA Network+ / Security+, Cisco CCNA/CCNP Security, and cloud security certs are strong starting points.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.nist.gov/cyberframework" target="_blank" rel="noreferrer">NIST Cybersecurity Framework</a></li>
          <li><a className="text-primary hover:underline" href="https://www.cisa.gov/" target="_blank" rel="noreferrer">CISA — Cybersecurity & Infrastructure Security Agency</a></li>
          <li><a className="text-primary hover:underline" href="https://www.cisecurity.org/controls" target="_blank" rel="noreferrer">CIS Controls & Benchmarks</a></li>
          <li><a className="text-primary hover:underline" href="https://www.ietf.org/standards/rfcs/" target="_blank" rel="noreferrer">IETF RFCs</a></li>
          <li><a className="text-primary hover:underline" href="https://owasp.org/" target="_blank" rel="noreferrer">OWASP</a></li>
          <li><a className="text-primary hover:underline" href="https://attack.mitre.org/" target="_blank" rel="noreferrer">MITRE ATT&amp;CK</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is intended for <b>educational purposes</b> and focuses on <b>authorized, ethical, and defensive</b> network security practices. Standards and products evolve — always consult the latest official documentation from NIST, CISA, CIS, IETF, OWASP, and your platform vendors. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
