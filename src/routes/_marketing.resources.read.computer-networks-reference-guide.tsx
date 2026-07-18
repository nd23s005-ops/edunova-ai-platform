import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-reference-guide",
  title: "Computer Networks — Reference Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "58 min",
  pages: 81,
  lastUpdated: "September 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Complete networking reference: OSI, TCP/IP, IPv4/IPv6, subnetting formulas, routing, switching, DNS, DHCP, NAT, VPN, firewalls, wireless, cloud, troubleshooting commands, ports, protocol comparisons.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "osi", label: "OSI Reference" },
  { id: "tcpip", label: "TCP/IP Reference" },
  { id: "ipv4", label: "IPv4 Reference" },
  { id: "ipv6", label: "IPv6 Reference" },
  { id: "subnet", label: "Subnetting Reference" },
  { id: "route", label: "Routing Reference" },
  { id: "switch", label: "Switching Reference" },
  { id: "dns", label: "DNS Reference" },
  { id: "dhcp", label: "DHCP Reference" },
  { id: "nat", label: "NAT Reference" },
  { id: "vpn", label: "VPN Reference" },
  { id: "fw", label: "Firewalls Reference" },
  { id: "wifi", label: "Wireless Standards" },
  { id: "cloud", label: "Cloud Networking" },
  { id: "cmds", label: "Troubleshooting Commands" },
  { id: "ports", label: "Common Ports" },
  { id: "compare", label: "Protocol Comparisons" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-reference-guide" }],
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
        <p>Complete networking reference: OSI, TCP/IP, IPv4/IPv6, subnetting formulas, routing, switching, DNS, DHCP, NAT, VPN, firewalls, wireless, cloud, troubleshooting commands, ports, protocol comparisons.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Reference Guide." />
      </Section>

      <Section id="osi" title="OSI Reference">
        <p>Layer-by-layer PDUs, protocols, devices, and troubleshooting hooks.</p>
      </Section>

      <Section id="tcpip" title="TCP/IP Reference">
        <p>Encapsulation, layer mapping, protocol suite.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for tcp/ip reference." />
      </Section>

      <Section id="ipv4" title="IPv4 Reference">
        <p>Address structure, classes, private ranges, ARP.</p>
      </Section>

      <Section id="ipv6" title="IPv6 Reference">
        <p>Address types, notation, SLAAC, common prefixes.</p>
      </Section>

      <Section id="subnet" title="Subnetting Reference">
        <p>Prefix ↔ mask ↔ range table. VLSM examples.</p>
      </Section>

      <Section id="route" title="Routing Reference">
        <p>Static, RIP, OSPF, EIGRP, BGP — metrics, AD, convergence.</p>
      </Section>

      <Section id="switch" title="Switching Reference">
        <p>MAC learning, STP, VLANs, trunking, port channels.</p>
      </Section>

      <Section id="dns" title="DNS Reference">
        <p>Record types, resolution, DNSSEC.</p>
      </Section>

      <Section id="dhcp" title="DHCP Reference">
        <p>DORA, options, relay agents, IPv6 DHCPv6.</p>
      </Section>

      <Section id="nat" title="NAT Reference">
        <p>Static, dynamic, PAT, NAT44/NAT66/NAT64.</p>
      </Section>

      <Section id="vpn" title="VPN Reference">
        <p>IPsec phases, SSL VPN, WireGuard basics.</p>
      </Section>

      <Section id="fw" title="Firewalls Reference">
        <p>Stateful, NGFW, zones, policies, logging.</p>
      </Section>

      <Section id="wifi" title="Wireless Standards">
        <p>Wi-Fi 5/6/6E/7. Channels. Security (WPA2/3).</p>
      </Section>

      <Section id="cloud" title="Cloud Networking">
        <p>VPC constructs, hybrid connectivity, private endpoints.</p>
      </Section>

      <Section id="cmds" title="Troubleshooting Commands">
        <p>ping, traceroute, dig, ss, tcpdump, ip, ethtool, iperf.</p>
      </Section>

      <Section id="ports" title="Common Ports">
        <p>Well-known and popular high ports with protocol notes.</p>
      </Section>

      <Section id="compare" title="Protocol Comparisons">
        <p>TCP vs UDP. OSPF vs EIGRP vs BGP. WPA2 vs WPA3.</p>
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
        <FAQItem q="Is content current?">Yes — reflects modern protocols and enterprise practices as of September 2026.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Vendor commands and versions may change — always verify against current documentation.</p>
      </Section>
    </ReaderShell>
  );
}
