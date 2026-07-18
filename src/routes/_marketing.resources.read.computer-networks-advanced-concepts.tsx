import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-advanced-concepts",
  title: "Computer Networks — Advanced Concepts",
  category: "CS Core",
  difficulty: "Advanced",
  readingTime: "35 min",
  pages: 54,
  lastUpdated: "May 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Advanced Computer Networks: OSPF, BGP, MPLS, SDN, network virtualization, QoS, CDN, load balancing, cloud networking, automation, IPv6, HA, Zero Trust, wireless optimization, enterprise design.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "ospf", label: "OSPF Deep Dive" },
  { id: "bgp", label: "BGP Deep Dive" },
  { id: "mpls", label: "MPLS" },
  { id: "sdn", label: "SDN & Network Virtualization" },
  { id: "qos", label: "QoS" },
  { id: "cdn", label: "CDN & Load Balancing" },
  { id: "cloud", label: "Cloud Networking" },
  { id: "auto", label: "Network Automation" },
  { id: "ipv6", label: "IPv6 Deployment" },
  { id: "ha", label: "High Availability" },
  { id: "zt", label: "Zero Trust" },
  { id: "wifi", label: "Wireless Optimization" },
  { id: "perf", label: "Performance Engineering" },
  { id: "ent", label: "Enterprise Design" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-advanced-concepts")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-advanced-concepts" }],
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
        <p>Advanced Computer Networks: OSPF, BGP, MPLS, SDN, network virtualization, QoS, CDN, load balancing, cloud networking, automation, IPv6, HA, Zero Trust, wireless optimization, enterprise design.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Advanced Concepts." />
      </Section>

      <Section id="ospf" title="OSPF Deep Dive">
        <p>LSA types, DR/BDR, area design, virtual links, opaque LSAs, LFA.</p>
      </Section>

      <Section id="bgp" title="BGP Deep Dive">
        <p>Path attributes, best-path algorithm, route reflectors, communities, hijacking defense.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for bgp deep dive." />
      </Section>

      <Section id="mpls" title="MPLS">
        <p>Label switching, LDP, RSVP-TE, L2/L3 VPNs, segment routing.</p>
      </Section>

      <Section id="sdn" title="SDN & Network Virtualization">
        <p>Control/data plane split. VXLAN, EVPN, overlay networks.</p>
      </Section>

      <Section id="qos" title="QoS">
        <p>Classification, marking, queuing, shaping/policing, LLQ for voice.</p>
      </Section>

      <Section id="cdn" title="CDN & Load Balancing">
        <p>Anycast, GSLB, L4 vs L7 LB, health checks, sticky sessions.</p>
      </Section>

      <Section id="cloud" title="Cloud Networking">
        <p>VPCs, transit gateways, peering, private endpoints, hybrid DX/Interconnect.</p>
      </Section>

      <Section id="auto" title="Network Automation">
        <p>Ansible, NAPALM, Nornir. YANG models. Netconf/gNMI.</p>
      </Section>

      <Section id="ipv6" title="IPv6 Deployment">
        <p>Dual-stack, NAT64/DNS64, 464XLAT, translation vs tunneling.</p>
      </Section>

      <Section id="ha" title="High Availability">
        <p>VRRP/HSRP/GLBP, MLAG, ECMP, graceful restart, NSF.</p>
      </Section>

      <Section id="zt" title="Zero Trust">
        <p>Identity, device posture, micro-segmentation, continuous verification.</p>
      </Section>

      <Section id="wifi" title="Wireless Optimization">
        <p>RRM, band steering, roaming (802.11r/k/v), Wi-Fi 6/7 features.</p>
      </Section>

      <Section id="perf" title="Performance Engineering">
        <p>BBR congestion control, buffer bloat, TCP tuning, path MTU discovery.</p>
      </Section>

      <Section id="ent" title="Enterprise Design">
        <p>Spine-leaf DC, campus fabric, WAN edge SD-WAN.</p>
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
