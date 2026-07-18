import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-pdf-notes",
  title: "Computer Networks — PDF Notes",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "73 min",
  pages: 86,
  lastUpdated: "May 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Chapter-wise Computer Networks notes: fundamentals, OSI, TCP/IP, IP addressing, subnetting, routing, switching, DNS, DHCP, HTTP, HTTPS, TCP, UDP, IPv6, NAT, VPN, firewalls, wireless, cloud, troubleshooting.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "ch1", label: "Chapter 1 — Fundamentals" },
  { id: "ch2", label: "Chapter 2 — OSI Model" },
  { id: "ch3", label: "Chapter 3 — TCP/IP Model" },
  { id: "ch4", label: "Chapter 4 — IP Addressing" },
  { id: "ch5", label: "Chapter 5 — Subnetting" },
  { id: "ch6", label: "Chapter 6 — Routing" },
  { id: "ch7", label: "Chapter 7 — Switching & VLANs" },
  { id: "ch8", label: "Chapter 8 — DNS & DHCP" },
  { id: "ch9", label: "Chapter 9 — HTTP/HTTPS" },
  { id: "ch10", label: "Chapter 10 — TCP & UDP" },
  { id: "ch11", label: "Chapter 11 — IPv6" },
  { id: "ch12", label: "Chapter 12 — NAT & VPN" },
  { id: "ch13", label: "Chapter 13 — Firewalls & Security" },
  { id: "ch14", label: "Chapter 14 — Wireless & Cloud" },
  { id: "ch15", label: "Chapter 15 — Troubleshooting" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-pdf-notes" }],
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
        <p>Chapter-wise Computer Networks notes: fundamentals, OSI, TCP/IP, IP addressing, subnetting, routing, switching, DNS, DHCP, HTTP, HTTPS, TCP, UDP, IPv6, NAT, VPN, firewalls, wireless, cloud, troubleshooting.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — PDF Notes." />
      </Section>

      <Section id="ch1" title="Chapter 1 — Fundamentals">
        <p>Networks, topologies, LAN/WAN/MAN, bandwidth, throughput, latency.</p>
      </Section>

      <Section id="ch2" title="Chapter 2 — OSI Model">
        <p>Seven layers with PDUs, protocols, and devices at each.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for chapter 2 — osi model." />
      </Section>

      <Section id="ch3" title="Chapter 3 — TCP/IP Model">
        <p>Four-layer practical stack aligned to real-world protocols.</p>
      </Section>

      <Section id="ch4" title="Chapter 4 — IP Addressing">
        <p>IPv4 structure, classes, private ranges, ARP.</p>
      </Section>

      <Section id="ch5" title="Chapter 5 — Subnetting">
        <p>Masks, CIDR, VLSM, aggregation. Practice drills.</p>
      </Section>

      <Section id="ch6" title="Chapter 6 — Routing">
        <p>Static, dynamic, distance vector, link state, OSPF, BGP.</p>
      </Section>

      <Section id="ch7" title="Chapter 7 — Switching & VLANs">
        <p>MAC learning, STP, trunking, 802.1Q, inter-VLAN routing.</p>
      </Section>

      <Section id="ch8" title="Chapter 8 — DNS & DHCP">
        <p>Record types, resolution flow, DHCP lease process.</p>
      </Section>

      <Section id="ch9" title="Chapter 9 — HTTP/HTTPS">
        <p>Methods, status codes, TLS 1.3 handshake, HSTS.</p>
      </Section>

      <Section id="ch10" title="Chapter 10 — TCP & UDP">
        <p>Handshake, flow control, congestion control, common ports.</p>
      </Section>

      <Section id="ch11" title="Chapter 11 — IPv6">
        <p>Address types, SLAAC, transition to IPv6.</p>
      </Section>

      <Section id="ch12" title="Chapter 12 — NAT & VPN">
        <p>NAT variants, IPsec, SSL VPN.</p>
      </Section>

      <Section id="ch13" title="Chapter 13 — Firewalls & Security">
        <p>Stateful, NGFW, IDS/IPS, Zero Trust.</p>
      </Section>

      <Section id="ch14" title="Chapter 14 — Wireless & Cloud">
        <p>Wi-Fi standards, VPCs, hybrid connectivity.</p>
      </Section>

      <Section id="ch15" title="Chapter 15 — Troubleshooting">
        <p>Layered approach, common tools, real scenarios.</p>
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
