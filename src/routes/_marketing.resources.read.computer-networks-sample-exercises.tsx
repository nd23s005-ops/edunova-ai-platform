import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-sample-exercises",
  title: "Computer Networks — Sample Exercises",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "18 min",
  pages: 34,
  lastUpdated: "September 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "250+ networking exercises: subnetting, IP addressing, routing, switching, DNS, DHCP, TCP, UDP, packet analysis, Wireshark labs, Packet Tracer labs, troubleshooting, security.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "subnet", label: "Subnetting Drills (80)" },
  { id: "ip", label: "IP Addressing (30)" },
  { id: "route", label: "Routing Exercises (30)" },
  { id: "switch", label: "Switching Exercises (25)" },
  { id: "dns", label: "DNS & DHCP (20)" },
  { id: "tcp", label: "TCP/UDP Analysis (20)" },
  { id: "packet", label: "Packet Analysis (20)" },
  { id: "wireshark", label: "Wireshark Labs (15)" },
  { id: "ptracer", label: "Packet Tracer Labs (15)" },
  { id: "trouble", label: "Troubleshooting (10)" },
  { id: "security", label: "Security (5)" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-sample-exercises")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-sample-exercises" }],
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
        <p>250+ networking exercises: subnetting, IP addressing, routing, switching, DNS, DHCP, TCP, UDP, packet analysis, Wireshark labs, Packet Tracer labs, troubleshooting, security.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Sample Exercises." />
      </Section>

      <Section id="subnet" title="Subnetting Drills (80)">
        <p>Convert between prefix, mask, and range. VLSM problems for real office plans.</p>
      </Section>

      <Section id="ip" title="IP Addressing (30)">
        <p>Assign valid host addresses, spot invalid ones, compute broadcast/network.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for ip addressing (30)." />
      </Section>

      <Section id="route" title="Routing Exercises (30)">
        <p>Configure static routes; predict OSPF DR/BDR; identify BGP path selection.</p>
      </Section>

      <Section id="switch" title="Switching Exercises (25)">
        <p>Configure VLANs, trunks, STP priority, port-security.</p>
      </Section>

      <Section id="dns" title="DNS & DHCP (20)">
        <p>Create zones, write records, configure DHCP pools with reservations.</p>
      </Section>

      <Section id="tcp" title="TCP/UDP Analysis (20)">
        <p>Read captures; identify handshake, retransmissions, window sizing.</p>
      </Section>

      <Section id="packet" title="Packet Analysis (20)">
        <p>Wireshark filters, follow-stream investigations.</p>
      </Section>

      <Section id="wireshark" title="Wireshark Labs (15)">
        <p>10-minute guided investigations of provided pcaps.</p>
      </Section>

      <Section id="ptracer" title="Packet Tracer Labs (15)">
        <p>End-to-end topology labs with grading criteria.</p>
      </Section>

      <Section id="trouble" title="Troubleshooting (10)">
        <p>Realistic tickets with clues buried in configs.</p>
      </Section>

      <Section id="security" title="Security (5)">
        <p>ACL design, WPA3 setup, IPsec tunnel.</p>
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
