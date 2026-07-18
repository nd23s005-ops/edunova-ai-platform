import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-project-case-study",
  title: "Computer Networks — Project Case Study",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "21 min",
  pages: 25,
  lastUpdated: "April 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Production case study: designing, deploying, monitoring, optimizing, securing, and scaling an enterprise network with routers, switches, firewalls, VLANs, VPNs, and monitoring.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "bg", label: "Background" },
  { id: "req", label: "Requirements" },
  { id: "arch", label: "Architecture" },
  { id: "vlan", label: "VLAN & IP Design" },
  { id: "sec", label: "Security" },
  { id: "deploy", label: "Deployment" },
  { id: "mon", label: "Monitoring" },
  { id: "opt", label: "Optimization" },
  { id: "scale", label: "Scaling" },
  { id: "outcomes", label: "Business Outcomes" },
  { id: "lessons", label: "Lessons Learned" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-project-case-study" }],
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
        <p>Production case study: designing, deploying, monitoring, optimizing, securing, and scaling an enterprise network with routers, switches, firewalls, VLANs, VPNs, and monitoring.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Project Case Study." />
      </Section>

      <Section id="bg" title="Background">
        <p>A 1200-employee financial services firm consolidating three sites.</p>
      </Section>

      <Section id="req" title="Requirements">
        <p>99.99% uptime, PCI-DSS scope, low-latency trading VLAN, secure remote access.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for requirements." />
      </Section>

      <Section id="arch" title="Architecture">
        <p>Dual-core switching. OSPF core. BGP dual-homed WAN. NGFW cluster.</p>
      </Section>

      <Section id="vlan" title="VLAN & IP Design">
        <p>20 VLANs by function. RFC1918 with room to double.</p>
      </Section>

      <Section id="sec" title="Security">
        <p>Segmentation, NGFW, IDS, MFA on VPN, PAM for network gear.</p>
      </Section>

      <Section id="deploy" title="Deployment">
        <p>Phased cutover across three weekends. Rollback tested for each stage.</p>
      </Section>

      <Section id="mon" title="Monitoring">
        <p>NetFlow + Grafana dashboards. Alerting via PagerDuty.</p>
      </Section>

      <Section id="opt" title="Optimization">
        <p>QoS for voice/trading. Route summarization halved BGP table load.</p>
      </Section>

      <Section id="scale" title="Scaling">
        <p>Added spine-leaf DC fabric in year 2 without redesign.</p>
      </Section>

      <Section id="outcomes" title="Business Outcomes">
        <p>Uptime 99.997%. Ticket volume −41%. Passed PCI audit clean.</p>
      </Section>

      <Section id="lessons" title="Lessons Learned">
        <p>Invest in IPAM day one. Automate configs from source of truth.</p>
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
        <FAQItem q="Is content current?">Yes — reflects modern protocols and enterprise practices as of April 2026.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Vendor commands and versions may change — always verify against current documentation.</p>
      </Section>
    </ReaderShell>
  );
}
