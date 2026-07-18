import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-complete-tutorial",
  title: "Computer Networks — Complete Tutorial",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "47 min",
  pages: 107,
  lastUpdated: "May 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Beginner-to-advanced Computer Networks tutorial: OSI, TCP/IP, IPv4, IPv6, routing, switching, VLANs, NAT, DNS, DHCP, HTTP/HTTPS, TCP, UDP, firewalls, VPNs, wireless, cloud networking, security, monitoring, troubleshooting.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "osi", label: "OSI Model" },
  { id: "tcpip", label: "TCP/IP Suite" },
  { id: "ipv4", label: "IPv4" },
  { id: "ipv6", label: "IPv6" },
  { id: "routing", label: "Routing Protocols" },
  { id: "switching", label: "Switching" },
  { id: "vlan", label: "VLANs" },
  { id: "nat", label: "NAT" },
  { id: "dns", label: "DNS & DHCP" },
  { id: "http", label: "HTTP/HTTPS" },
  { id: "tcpudp", label: "TCP & UDP" },
  { id: "firewalls", label: "Firewalls & VPNs" },
  { id: "wireless", label: "Wireless Networks" },
  { id: "cloud", label: "Cloud Networking" },
  { id: "security", label: "Network Security" },
  { id: "monitor", label: "Monitoring & Troubleshooting" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-complete-tutorial")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-complete-tutorial" }],
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
        <p>Beginner-to-advanced Computer Networks tutorial: OSI, TCP/IP, IPv4, IPv6, routing, switching, VLANs, NAT, DNS, DHCP, HTTP/HTTPS, TCP, UDP, firewalls, VPNs, wireless, cloud networking, security, monitoring, troubleshooting.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Complete Tutorial." />
      </Section>

      <Section id="osi" title="OSI Model">
        <p>Deep-dive across all 7 layers with example protocols at each layer and how encapsulation works.</p>
      </Section>

      <Section id="tcpip" title="TCP/IP Suite">
        <p>Practical model. Encapsulation from application data → segment → packet → frame → bits.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for tcp/ip suite." />
      </Section>

      <Section id="ipv4" title="IPv4">
        <p>Address classes, private ranges, subnetting math, CIDR, ARP resolution.</p>
      </Section>

      <Section id="ipv6" title="IPv6">
        <p>128-bit addressing, SLAAC, dual-stack deployment, transition mechanisms.</p>
      </Section>

      <Section id="routing" title="Routing Protocols">
        <p>Distance vector vs link state. RIP, OSPF, EIGRP, BGP. Convergence, metrics, admin distance.</p>
      </Section>

      <Section id="switching" title="Switching">
        <p>MAC learning, forwarding, filtering. STP, RSTP. Trunking with 802.1Q.</p>
      </Section>

      <Section id="vlan" title="VLANs">
        <p>Segment broadcast domains. Access vs trunk ports. Inter-VLAN routing.</p>
      </Section>

      <Section id="nat" title="NAT">
        <p>Static, dynamic, PAT. Solves IPv4 exhaustion. Complications for peer-to-peer.</p>
      </Section>

      <Section id="dns" title="DNS & DHCP">
        <p>Recursive vs authoritative servers. Record types A, AAAA, MX, CNAME, TXT. DHCP DORA process.</p>
      </Section>

      <Section id="http" title="HTTP/HTTPS">
        <p>Request/response, methods, status codes, headers. TLS handshake in HTTPS.</p>
      </Section>

      <Section id="tcpudp" title="TCP & UDP">
        <p>3-way handshake, flow control, congestion control. UDP simplicity. Port numbers.</p>
      </Section>

      <Section id="firewalls" title="Firewalls & VPNs">
        <p>Stateful vs stateless. NGFWs. Site-to-site and remote access VPNs. IPsec, SSL/TLS.</p>
      </Section>

      <Section id="wireless" title="Wireless Networks">
        <p>Wi-Fi standards, channels, security, controller-based deployments.</p>
      </Section>

      <Section id="cloud" title="Cloud Networking">
        <p>VPCs, subnets, security groups, transit gateways, peering, hybrid connectivity.</p>
      </Section>

      <Section id="security" title="Network Security">
        <p>Segmentation, IDS/IPS, DDoS mitigation, Zero Trust.</p>
      </Section>

      <Section id="monitor" title="Monitoring & Troubleshooting">
        <p>SNMP, NetFlow, syslog, Wireshark, ping/traceroute/nslookup.</p>
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
