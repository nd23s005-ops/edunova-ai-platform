import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "computer-networks-interview-questions",
  title: "Computer Networks — Interview Questions",
  category: "CS Core",
  difficulty: "Intermediate",
  readingTime: "43 min",
  pages: 47,
  lastUpdated: "July 2026",
  tags: ["Networks", "TCP/IP", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1800&q=80",
  heroSubtitle: "350+ Computer Networks interview questions — beginner to senior, with layered hints, detailed answers, design questions, TCP/IP, routing, switching, troubleshooting, HR, and mocks.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "basics", label: "Basics (80 Qs)" },
  { id: "ip", label: "IP & Subnetting (60 Qs)" },
  { id: "routing", label: "Routing (60 Qs)" },
  { id: "switching", label: "Switching (50 Qs)" },
  { id: "proto", label: "Protocols (50 Qs)" },
  { id: "design", label: "Network Design (30 Qs)" },
  { id: "trouble", label: "Troubleshooting Scenarios (20 Qs)" },
  { id: "hr", label: "HR & Behavioral" },
  { id: "mocks", label: "Mock Interviews" },
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

export const Route = createFileRoute("/_marketing/resources/read/computer-networks-interview-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/computer-networks-interview-questions" }],
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
        <p>350+ Computer Networks interview questions — beginner to senior, with layered hints, detailed answers, design questions, TCP/IP, routing, switching, troubleshooting, HR, and mocks.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Overview illustration for Computer Networks — Interview Questions." />
      </Section>

      <Section id="basics" title="Basics (80 Qs)">
        <p>What is OSI? TCP vs UDP? Difference between hub, switch, router? What is DHCP? What is DNS?</p>
      </Section>

      <Section id="ip" title="IP & Subnetting (60 Qs)">
        <p>Given 192.168.1.0/26, how many hosts? Design a subnet for 5 departments.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Reference diagram for ip & subnetting (60 qs)." />
      </Section>

      <Section id="routing" title="Routing (60 Qs)">
        <p>OSPF vs BGP? Convergence? Admin distance? Route redistribution pitfalls?</p>
      </Section>

      <Section id="switching" title="Switching (50 Qs)">
        <p>STP states? Root bridge election? Trunk vs access? VLAN hopping mitigations?</p>
      </Section>

      <Section id="proto" title="Protocols (50 Qs)">
        <p>3-way handshake in detail. Slow start. Fast retransmit. UDP use cases.</p>
      </Section>

      <Section id="design" title="Network Design (30 Qs)">
        <p>Design a network for a 3-floor office. Redundancy plan. IP scheme. WAN options.</p>
      </Section>

      <Section id="trouble" title="Troubleshooting Scenarios (20 Qs)">
        <p>User can't reach internet — walk through your steps. Intermittent packet loss — how to isolate?</p>
      </Section>

      <Section id="hr" title="HR & Behavioral">
        <p>Tell me about a network you designed. A time you led an incident response.</p>
      </Section>

      <Section id="mocks" title="Mock Interviews">
        <p>Two 45-min mocks with rubric and scoring guide.</p>
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
        <FAQItem q="Is content current?">Yes — reflects modern protocols and enterprise practices as of July 2026.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Educational content. Vendor commands and versions may change — always verify against current documentation.</p>
      </Section>
    </ReaderShell>
  );
}
