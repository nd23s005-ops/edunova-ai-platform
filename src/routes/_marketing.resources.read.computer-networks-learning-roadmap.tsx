import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-learning-roadmap",
  title: "Computer Networks — Learning Roadmap",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 7,
  lastUpdated: "February 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Structured learning roadmap: fundamentals, protocols, subnetting, Packet Tracer, Wireshark, CCNA/Network+, interview prep, projects, career progression.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "prereq", label: "Prerequisites" },
  { id: "m1", label: "Month 1: Fundamentals" },
  { id: "m2", label: "Month 2: Addressing & Protocols" },
  { id: "m3", label: "Month 3: Routing & Switching" },
  { id: "m4", label: "Month 4: Services & Security" },
  { id: "m5", label: "Month 5: Wireless & Cloud" },
  { id: "labs", label: "Labs & Practice" },
  { id: "cert", label: "Certifications" },
  { id: "interview", label: "Interview Prep" },
  { id: "career", label: "Career Progression" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-learning-roadmap" }],
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
        <p>Structured learning roadmap: fundamentals, protocols, subnetting, Packet Tracer, Wireshark, CCNA/Network+, interview prep, projects, career progression.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Learning Roadmap." />
      </Section>

      <Section id="prereq" title="Prerequisites">
        <p>Comfort with computers. Binary/hex basics. A laptop for labs.</p>
      </Section>

      <Section id="m1" title="Month 1: Fundamentals">
        <p>OSI, TCP/IP, cables, topologies. First Packet Tracer topology.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for month 1: fundamentals." />
      </Section>

      <Section id="m2" title="Month 2: Addressing & Protocols">
        <p>IPv4, subnetting drills, DNS, DHCP.</p>
      </Section>

      <Section id="m3" title="Month 3: Routing & Switching">
        <p>Static routing, OSPF single-area, VLANs, STP.</p>
      </Section>

      <Section id="m4" title="Month 4: Services & Security">
        <p>NAT, ACLs, firewall basics, VPN concepts.</p>
      </Section>

      <Section id="m5" title="Month 5: Wireless & Cloud">
        <p>Wi-Fi standards, VPCs, hybrid connectivity.</p>
      </Section>

      <Section id="labs" title="Labs & Practice">
        <p>20 Packet Tracer labs. 10 Wireshark captures. 5 GNS3 topologies.</p>
      </Section>

      <Section id="cert" title="Certifications">
        <p>Network+ (entry), CCNA (industry), CCNP after 1 year.</p>
      </Section>

      <Section id="interview" title="Interview Prep">
        <p>30 core questions. Design + troubleshooting scenarios.</p>
      </Section>

      <Section id="career" title="Career Progression">
        <p>NOC → Network Engineer → Senior → Architect. Or DevOps/Cloud.</p>
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
        <FAQItem q="Is content current?">Yes — reflects modern protocols and enterprise practices as of February 2026.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Vendor commands and versions may change — always verify against current documentation.</p>
      </Section>
    </ReaderShell>
  );
}
