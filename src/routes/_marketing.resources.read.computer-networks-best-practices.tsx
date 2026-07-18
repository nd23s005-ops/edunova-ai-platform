import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-best-practices",
  title: "Computer Networks — Best Practices",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "13 min",
  pages: 14,
  lastUpdated: "May 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Networking best practices: design, IP planning, routing, switching, redundancy, security, firewalls, monitoring, documentation, troubleshooting, performance, scalability, maintenance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "design", label: "Design" },
  { id: "ip", label: "IP Planning" },
  { id: "route", label: "Routing" },
  { id: "switch", label: "Switching" },
  { id: "redundancy", label: "Redundancy" },
  { id: "sec", label: "Security" },
  { id: "fw", label: "Firewall Configuration" },
  { id: "mon", label: "Monitoring" },
  { id: "docs", label: "Documentation" },
  { id: "trouble", label: "Troubleshooting" },
  { id: "perf", label: "Performance" },
  { id: "scale", label: "Scalability & Maintenance" },
  { id: "compare", label: "Comparison Table" },
  { id: "commands", label: "Commands & Code Reference" },
  { id: "best", label: "Best Practices & Tips" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Computer Networks — Complete Tutorial", tag: "CS Core", time: "47 min" },
  { title: "Computer Networks — Cheat Sheet", tag: "CS Core", time: "5 min" },
  { title: "Computer Networks — Interview Questions", tag: "CS Core", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-best-practices" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the core ideas covered in this resource.</li>
          <li>Apply concepts to hands-on labs and real networks.</li>
          <li>Ready you for interviews and certifications.</li>
        </ul>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Networking best practices: design, IP planning, routing, switching, redundancy, security, firewalls, monitoring, documentation, troubleshooting, performance, scalability, maintenance.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Best Practices." />
      </Section>

      <Section id="design" title="Design">
        <p>Hierarchical models scale. Document intent, not just config.</p>
      </Section>

      <Section id="ip" title="IP Planning">
        <p>Contiguous blocks. Summarizable boundaries. IPAM from day one.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for ip planning." />
      </Section>

      <Section id="route" title="Routing">
        <p>Use dynamic routing at scale. Summarize aggressively. Filter what you accept.</p>
      </Section>

      <Section id="switch" title="Switching">
        <p>Prune VLANs on trunks. Tune STP. Never leave default passwords.</p>
      </Section>

      <Section id="redundancy" title="Redundancy">
        <p>Dual everything at the core. Test failover monthly.</p>
      </Section>

      <Section id="sec" title="Security">
        <p>Segment aggressively. Deny by default. Log everything.</p>
      </Section>

      <Section id="fw" title="Firewall Configuration">
        <p>Explicit rules. Comment each. Review quarterly.</p>
      </Section>

      <Section id="mon" title="Monitoring">
        <p>Baseline first. Alert on anomalies. Dashboard for humans.</p>
      </Section>

      <Section id="docs" title="Documentation">
        <p>Topology maps that reflect reality. Change logs signed.</p>
      </Section>

      <Section id="trouble" title="Troubleshooting">
        <p>Layered method. Reproduce before fixing. Postmortem every P1.</p>
      </Section>

      <Section id="perf" title="Performance">
        <p>QoS for latency-sensitive apps. Measure end-to-end.</p>
      </Section>

      <Section id="scale" title="Scalability & Maintenance">
        <p>Design for 2x. Patch cadence. EOL tracker.</p>
      </Section>

      <Section id="compare" title="Comparison Table">
        <table className="w-full border-collapse text-sm">
          <thead><tr><th className="border p-2 text-left">Aspect</th><th className="border p-2 text-left">TCP</th><th className="border p-2 text-left">UDP</th></tr></thead>
          <tbody>
            <tr><td className="border p-2">Reliability</td><td className="border p-2">Guaranteed</td><td className="border p-2">Best-effort</td></tr>
            <tr><td className="border p-2">Ordering</td><td className="border p-2">Yes</td><td className="border p-2">No</td></tr>
            <tr><td className="border p-2">Overhead</td><td className="border p-2">Higher</td><td className="border p-2">Lower</td></tr>
            <tr><td className="border p-2">Use cases</td><td className="border p-2">HTTP, SSH, email</td><td className="border p-2">DNS, VoIP, gaming</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Protocol behavior at a glance." />
      </Section>

      <Section id="commands" title="Commands & Code Reference">
        <Code lang="bash">{`! Cisco IOS — VLAN + trunk basics
vlan 10
 name USERS
vlan 20
 name VOICE
interface GigabitEthernet0/1
 switchport mode access
 switchport access vlan 10
interface GigabitEthernet0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20`}</Code>
      </Section>

      <Section id="best" title="Best Practices & Tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Baseline before you optimize.</li>
          <li>Document intent, not just configs.</li>
          <li>Automate repetitive changes.</li>
          <li>Segment aggressively; deny by default.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Overlapping subnets across sites.</li>
          <li>Trunks allowing all VLANs.</li>
          <li>Skipping change reviews.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>Layered thinking, clean IP planning, and disciplined operations turn a network from fragile to boring — in the best way.</p>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="How is this different from a general IT course?">This resource focuses purely on networking concepts and their application.</FAQItem>
        <FAQItem q="Do I need Cisco hardware?">No — Packet Tracer and GNS3 emulate everything you need.</FAQItem>
        <FAQItem q="Is content current?">Yes — reflects modern protocols and enterprise practices as of May 2026.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Vendor commands and versions may change — always verify against current documentation.</p>
      </Section>
    </ReaderShell>
  );
}
