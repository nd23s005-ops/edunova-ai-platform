import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-beginner-guide",
  title: "Computer Networks — Beginner Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "17 min",
  pages: 28,
  lastUpdated: "March 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Beginner-friendly Computer Networks intro: fundamentals, OSI, TCP/IP, devices, IP addressing, subnetting, switching, routing, DNS, DHCP, Ethernet, wireless, and internet basics.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "fund", label: "Networking Fundamentals" },
  { id: "osi", label: "OSI Model" },
  { id: "tcpip", label: "TCP/IP Model" },
  { id: "devices", label: "Network Devices" },
  { id: "ip", label: "IP Addressing" },
  { id: "subnet", label: "Subnetting" },
  { id: "switch", label: "Switching" },
  { id: "route", label: "Routing" },
  { id: "dnsdhcp", label: "DNS & DHCP" },
  { id: "ethernet", label: "Ethernet" },
  { id: "wifi", label: "Wireless Networking" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-beginner-guide" }],
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
        <p>Beginner-friendly Computer Networks intro: fundamentals, OSI, TCP/IP, devices, IP addressing, subnetting, switching, routing, DNS, DHCP, Ethernet, wireless, and internet basics.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Beginner Guide." />
      </Section>

      <Section id="fund" title="Networking Fundamentals">
        <p>A network is any group of connected devices sharing data. LANs cover buildings; WANs span cities and continents; the internet is a network of networks.</p>
      </Section>

      <Section id="osi" title="OSI Model">
        <p>Seven layers — Physical, Data Link, Network, Transport, Session, Presentation, Application — each with a distinct job. Layering makes protocols swappable.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for osi model." />
      </Section>

      <Section id="tcpip" title="TCP/IP Model">
        <p>Four practical layers — Link, Internet, Transport, Application — the model the real internet uses. TCP guarantees delivery; UDP trades reliability for speed.</p>
      </Section>

      <Section id="devices" title="Network Devices">
        <p>Hubs (dumb), switches (learn MACs), routers (route by IP), firewalls (filter), access points (bridge wireless), load balancers (distribute).</p>
      </Section>

      <Section id="ip" title="IP Addressing">
        <p>IPv4 is 32-bit (4.3B addresses). IPv6 is 128-bit. Public vs private ranges (10/8, 172.16/12, 192.168/16). Static vs DHCP-assigned.</p>
      </Section>

      <Section id="subnet" title="Subnetting">
        <p>Splitting a network into smaller networks with a subnet mask. /24 means 256 addresses. CIDR notation is the modern way to express this.</p>
      </Section>

      <Section id="switch" title="Switching">
        <p>Switches forward frames based on MAC tables. VLANs segment traffic at Layer 2. Spanning Tree prevents loops.</p>
      </Section>

      <Section id="route" title="Routing">
        <p>Routers pick the next hop using routing tables. Static routes are manual; dynamic protocols (OSPF, BGP) discover paths automatically.</p>
      </Section>

      <Section id="dnsdhcp" title="DNS & DHCP">
        <p>DNS resolves names to IPs (google.com → 142.x.x.x). DHCP hands out IPs, masks, gateways, DNS servers when a device joins a network.</p>
      </Section>

      <Section id="ethernet" title="Ethernet">
        <p>The dominant wired LAN. CSMA/CD historically; full-duplex modern. Cat5e/6/6a cabling. 1/10/40/100 Gbps.</p>
      </Section>

      <Section id="wifi" title="Wireless Networking">
        <p>Wi-Fi 5/6/6E/7. 2.4/5/6 GHz bands. WPA3 security. SSID, channels, roaming.</p>
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
        <FAQItem q="Is content current?">Yes — reflects modern protocols and enterprise practices as of March 2026.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Vendor commands and versions may change — always verify against current documentation.</p>
      </Section>
    </ReaderShell>
  );
}
