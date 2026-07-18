import { createFileRoute } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "sd-beginner-guide",
  title: "System Design — Beginner Guide",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "16 min",
  pages: 18,
  lastUpdated: "February 2026",
  tags: ["System Design", "Scale"],
  heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80",
  heroSubtitle:
    "A gentle, analogy-driven introduction to how modern applications are designed to serve millions of users — no prior experience with distributed systems required.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "c1", label: "1. What is System Design?" },
  { id: "c2", label: "2. Why System Design Matters" },
  { id: "c3", label: "3. Monolithic vs Distributed" },
  { id: "c4", label: "4. Basic Components" },
  { id: "c5", label: "5. Clients & Servers" },
  { id: "c6", label: "6. APIs" },
  { id: "c7", label: "7. Databases" },
  { id: "c8", label: "8. Caching" },
  { id: "c9", label: "9. Load Balancers" },
  { id: "c10", label: "10. Scalability Basics" },
  { id: "c11", label: "11. Reliability" },
  { id: "c12", label: "12. Availability" },
  { id: "c13", label: "13. Simple Diagrams" },
  { id: "c14", label: "14. Beginner Exercises" },
  { id: "c15", label: "15. Summary" },
  { id: "review", label: "Beginner Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "System Design — Complete Tutorial", tag: "CS Core", time: "51 min" },
  { title: "System Design — Step-by-Step Learning Guide", tag: "CS Core", time: "18 min" },
  { title: "DBMS — Beginner Guide", tag: "CS Core", time: "18 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/sd-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/sd-beginner-guide" }],
  }),
  component: Page,
});

function Quiz({ q, a }: { q: string; a: string }) {
  return (
    <details className="my-2 rounded-lg border border-border/60 bg-card/40 p-3">
      <summary className="cursor-pointer text-sm font-medium">{q}</summary>
      <p className="mt-2 text-sm text-muted-foreground">{a}</p>
    </details>
  );
}

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Understand what System Design is and why it exists.</li>
          <li>Learn why scalable systems matter for real products.</li>
          <li>Grasp basic distributed-systems ideas without jargon.</li>
          <li>Build strong architectural thinking through analogies.</li>
          <li>Feel ready for more advanced System Design study.</li>
        </ul>
      </Section>

      <Section id="c1" title="1. What is System Design?">
        <p>
          System Design is the skill of deciding <em>how</em> the pieces of an application fit
          together so it can serve real users reliably. If coding is about writing recipes,
          System Design is about designing the whole restaurant — the kitchen layout, the
          waiters, the delivery bikes, and what happens when the fridge breaks.
        </p>
        <Callout tone="info" icon={<Lightbulb className="h-5 w-5" />} title="Analogy">
          Think of a coffee shop. One barista, one machine, five customers — easy. Ten
          baristas, three machines, a delivery app, and a thousand customers an hour? That
          needs <em>design</em>.
        </Callout>
      </Section>

      <Section id="c2" title="2. Why System Design Matters">
        <ul className="list-disc space-y-1 pl-5">
          <li>It's the difference between an app that crashes on launch day and one that survives it.</li>
          <li>It saves money — bad designs pay their tax in servers, incidents, and engineer hours.</li>
          <li>It makes future changes cheap. Good design absorbs new features without breaking old ones.</li>
        </ul>
      </Section>

      <Section id="c3" title="3. Monolithic vs Distributed Systems">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Monolith</th><th className="p-2 text-left">Distributed</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">One program running on one machine.</td><td className="p-2">Many programs running on many machines that talk to each other.</td></tr>
            <tr className="border-b"><td className="p-2">Easy to build, hard to scale.</td><td className="p-2">Harder to build, much easier to scale.</td></tr>
            <tr><td className="p-2">One failure ⟶ whole app is down.</td><td className="p-2">One failure ⟶ often just one feature is degraded.</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="c4" title="4. Basic Components of Large Applications">
        <p>Most big apps are built from the same handful of Lego bricks:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Clients (phones, browsers).</li>
          <li>Servers (the app itself).</li>
          <li>Databases (long-term memory).</li>
          <li>Caches (short-term memory).</li>
          <li>Load balancers (traffic cops).</li>
          <li>Queues (waiting rooms for work).</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — High-level architecture: client ⟶ load balancer ⟶ servers ⟶ cache + database." />
      </Section>

      <Section id="c5" title="5. Clients & Servers">
        <p>
          A <strong>client</strong> asks for something. A <strong>server</strong> answers.
          Your browser is a client; the machine that stores this page is a server.
          Everything else in this guide is a variation on that conversation.
        </p>
      </Section>

      <Section id="c6" title="6. APIs">
        <p>
          An <strong>API</strong> is a menu of things a server knows how to do. You don't need
          to know how the kitchen works — you just order from the menu. Most modern APIs speak
          HTTP and return JSON.
        </p>
        <Code>{`GET /api/coffee?type=latte
{
  "name": "Latte",
  "price": 4.5
}`}</Code>
      </Section>

      <Section id="c7" title="7. Databases">
        <p>
          A database is a filing cabinet that never forgets. Two common flavours:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>SQL</strong> — rows and columns, great for structured data (users, orders).</li>
          <li><strong>NoSQL</strong> — flexible shapes, great for messy or fast-changing data.</li>
        </ul>
      </Section>

      <Section id="c8" title="8. Caching">
        <p>
          A cache remembers popular answers so you don't repeat expensive work. It's the
          barista jotting the regular's order on a sticky note.
        </p>
        <Callout tone="info" title="Rule of thumb">
          Cache what is read often, changes rarely, and would be slow to recompute.
        </Callout>
      </Section>

      <Section id="c9" title="9. Load Balancers">
        <p>
          A load balancer is the person at the door pointing arriving customers to the least
          busy till. It spreads traffic across many servers so no single one is overwhelmed.
        </p>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — Load balancer sitting between clients and a pool of app servers, forwarding each request to the least busy one." />
      </Section>

      <Section id="c10" title="10. Scalability Basics">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Vertical:</strong> get a bigger machine. Simple, but has a ceiling.</li>
          <li><strong>Horizontal:</strong> get more machines. Harder, but the ceiling is much higher.</li>
        </ul>
      </Section>

      <Section id="c11" title="11. Reliability">
        <p>
          Reliability = "does the right thing, every time." A reliable system doesn't lose
          orders, doesn't charge you twice, and doesn't quietly return wrong answers.
        </p>
      </Section>

      <Section id="c12" title="12. Availability">
        <p>
          Availability = "answers when you ask." Measured in nines: 99.9% ("three nines") is
          about 8.7 hours of downtime per year. 99.99% is under an hour.
        </p>
      </Section>

      <Section id="c13" title="13. Simple Architecture Diagrams">
        <p>
          A diagram is worth a thousand meetings. Start with 3–5 boxes: client, load balancer,
          server, cache, database. Draw arrows in the direction data flows. That's enough for
          most beginner-level designs.
        </p>
      </Section>

      <Section id="c14" title="14. Beginner Exercises">
        <ul className="list-disc space-y-1 pl-5">
          <li>Sketch the components of a URL shortener.</li>
          <li>Draw how a photo upload travels from phone to database.</li>
          <li>Explain why a cache would help a news website's homepage.</li>
        </ul>
      </Section>

      <Section id="c15" title="15. Summary">
        <p>
          System Design is about arranging simple pieces — clients, servers, databases,
          caches, load balancers — so an application can grow without falling over.
        </p>
      </Section>

      <Section id="review" title="Beginner Review">
        <h3 className="font-semibold">Chapter summary</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Every large app is built from the same small vocabulary of components.</li>
          <li>Scale, reliability, and availability are the three questions to ask of any design.</li>
          <li>Analogies work — coffee shops, kitchens, and traffic cops beat jargon every time.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Key takeaways</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Start simple. Add complexity only when you can name the problem it solves.</li>
          <li>Read plans and diagrams before writing code.</li>
          <li>Distributed &ne; better. It's a trade-off you make on purpose.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Self assessment</h3>
        <Quiz q="Can you explain the difference between a cache and a database?" a="A database is long-term storage — the source of truth. A cache is a short-term copy of frequently accessed answers, kept for speed." />
        <Quiz q="Why do we need load balancers?" a="They spread incoming traffic across many servers so no single server is overwhelmed and users see fast, consistent responses." />
        <Quiz q="What is horizontal scaling?" a="Adding more machines to share the load, rather than upgrading a single machine to a bigger one." />
        <h3 className="mt-3 font-semibold">Practice questions</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Describe how a browser talks to a server in three sentences.</li>
          <li>Name three components you'd add if a small blog suddenly received a million visitors.</li>
          <li>What is the difference between "reliable" and "available"?</li>
        </ol>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I need to know coding to learn System Design?">A little bit helps — enough to know what an API call looks like — but you can absorb the ideas without being a strong programmer.</FAQItem>
        <FAQItem q="Where do I draw diagrams?">Anywhere — a whiteboard, Excalidraw, draw.io, or paper. The tool doesn't matter; clear thinking does.</FAQItem>
        <FAQItem q="Is a monolith always bad?">No. For a small product with a small team, a monolith is often the right answer.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>API</strong> — the menu of operations a server exposes.</li>
          <li><strong>Cache</strong> — a fast, short-term copy of frequently accessed data.</li>
          <li><strong>Load balancer</strong> — a component that distributes requests across servers.</li>
          <li><strong>Availability</strong> — the percentage of time a system responds successfully.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards,
          and trusted educational resources. System Design principles, cloud services,
          distributed technologies, and best practices evolve continuously — readers should
          consult official vendor documentation for the latest information. All trademarks,
          product names, logos, and intellectual property belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
