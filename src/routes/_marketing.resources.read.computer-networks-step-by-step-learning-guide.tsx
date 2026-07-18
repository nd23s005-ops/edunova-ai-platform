import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-step-by-step-learning-guide",
  title: "Computer Networks — Step-by-Step Learning Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "28 min",
  pages: 44,
  lastUpdated: "April 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "Week-by-week Computer Networks roadmap: fundamentals, subnetting practice, protocol analysis, packet tracing, labs, projects, certifications, interview prep, and career progression.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "prereqs", label: "Prerequisites" },
  { id: "w1", label: "Week 1-2: Foundations" },
  { id: "w3", label: "Week 3-4: IP & Subnetting" },
  { id: "w5", label: "Week 5-6: Routing" },
  { id: "w7", label: "Week 7-8: Switching & VLANs" },
  { id: "w9", label: "Week 9-10: Services" },
  { id: "w11", label: "Week 11-12: Security & Wireless" },
  { id: "labs", label: "Hands-on Labs" },
  { id: "projects", label: "Projects" },
  { id: "certs", label: "Certifications" },
  { id: "interview", label: "Interview Prep" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-step-by-step-learning-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-step-by-step-learning-guide" }],
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
        <p>Week-by-week Computer Networks roadmap: fundamentals, subnetting practice, protocol analysis, packet tracing, labs, projects, certifications, interview prep, and career progression.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Step-by-Step Learning Guide." />
      </Section>

      <Section id="prereqs" title="Prerequisites">
        <p>Basic computer literacy. Binary/hex helpful. A laptop that can run Packet Tracer or GNS3.</p>
      </Section>

      <Section id="w1" title="Week 1-2: Foundations">
        <p>OSI and TCP/IP models. Cabling, topologies, LAN vs WAN. Set up a home lab in Packet Tracer.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for week 1-2: foundations." />
      </Section>

      <Section id="w3" title="Week 3-4: IP & Subnetting">
        <p>IPv4 addressing. Subnetting drills — 50 problems. CIDR aggregation. VLSM.</p>
      </Section>

      <Section id="w5" title="Week 5-6: Routing">
        <p>Static routing lab. OSPF single-area. Default routes. Redistribution basics.</p>
      </Section>

      <Section id="w7" title="Week 7-8: Switching & VLANs">
        <p>VLAN creation. Trunking. Inter-VLAN routing. STP configuration.</p>
      </Section>

      <Section id="w9" title="Week 9-10: Services">
        <p>DHCP, DNS, NAT/PAT, ACLs. Configure and troubleshoot each.</p>
      </Section>

      <Section id="w11" title="Week 11-12: Security & Wireless">
        <p>Firewalls, VPNs. Wi-Fi setup with WPA3. Basic hardening.</p>
      </Section>

      <Section id="labs" title="Hands-on Labs">
        <p>20 Packet Tracer labs. 10 Wireshark capture analyses. 5 GNS3 multi-router scenarios.</p>
      </Section>

      <Section id="projects" title="Projects">
        <p>Design a small-office network. Build a VLAN-segmented lab. Configure a site-to-site VPN.</p>
      </Section>

      <Section id="certs" title="Certifications">
        <p>CompTIA Network+ (entry). Cisco CCNA (industry standard). Aim CCNA by month 4.</p>
      </Section>

      <Section id="interview" title="Interview Prep">
        <p>30 core Q&A. 10 troubleshooting scenarios. 5 mock interviews.</p>
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
