import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "mongodb-project-case-study",
  title: "MongoDB — Project Case Study",
  category: "Databases",
  difficulty: "Intermediate",
  readingTime: "26 min",
  pages: 24,
  lastUpdated: "July 2026",
  tags: ["Mongo", "Aggregation"],
  heroImage: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=1800&q=80",
  heroSubtitle: 'Anatomy of a real MongoDB project — schema decisions, trade-offs, indexes, and lessons learned.',
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Security, Performance & Deployment" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "MongoDB — Beginner Guide", tag: "Mongo", time: "15 min" },
  { title: "MongoDB — Cheat Sheet", tag: "Mongo", time: "3 min" },
  { title: "MongoDB — Interview Questions", tag: "Mongo", time: "39 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/mongodb-project-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/mongodb-project-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Project Case Study</b> — practical, production-ready MongoDB.</li>
          <li>Understand the document model, BSON, and NoSQL trade-offs vs relational DBs.</li>
          <li>Design schemas with embedding, referencing, and validation for real workloads.</li>
          <li>Write powerful CRUD queries and multi-stage aggregation pipelines.</li>
          <li>Index, replicate, shard, secure, and monitor MongoDB in production.</li>
          <li>Deploy on Atlas, Docker, or Kubernetes with backups and disaster recovery.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with a programming language (JavaScript / Python / Java) and JSON.</li>
          <li>MongoDB Community 7+ or a free Atlas cluster; <code>mongosh</code> and Compass installed.</li>
          <li>Basic REST, HTTP, and one backend framework (Express / FastAPI / Spring).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction — NoSQL, document model, when to choose MongoDB</li>
          <li>Install & tools — Community Server, mongosh, Compass, Atlas</li>
          <li>BSON & documents — types, ObjectId, arrays, embedded documents</li>
          <li>CRUD — insert, find, update, delete, upsert, bulk writes</li>
          <li>Query operators — comparison, logical, element, array, geo, text</li>
          <li>Projection & sorting — shaping and ordering results</li>
          <li>Aggregation — match, group, project, lookup, unwind, facet, window</li>
          <li>Indexing — single, compound, multikey, text, geo, TTL, wildcard</li>
          <li>Schema design — embedding vs referencing, denormalization, validation</li>
          <li>Transactions — sessions, multi-document ACID, retry logic</li>
          <li>Replication — replica sets, elections, read preference, write concern</li>
          <li>Sharding — shard keys, config servers, mongos, chunks, balancer</li>
          <li>Security — auth, RBAC, SCRAM, X.509, TLS, field-level encryption</li>
          <li>Backup & recovery — mongodump/restore, Atlas snapshots, PITR</li>
          <li>Performance — explain, profiler, caching, connection pooling, tuning</li>
          <li>Atlas — clusters, Search, Vector Search, Data Lake, Triggers, Charts</li>
          <li>Drivers & ODMs — Node driver, Mongoose, PyMongo, Spring Data</li>
          <li>API integration — Express REST, GraphQL, pagination, filtering</li>
          <li>Cloud & DevOps — Docker, Kubernetes, AWS/Azure/GCP, CI/CD</li>
          <li>Testing — Jest + mongodb-memory-server, Testcontainers, load tests</li>
          <li>Debugging — explain plans, profiler, Atlas Performance Advisor</li>
          <li>Design patterns & career roadmap</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>MongoDB is a general-purpose, document-oriented database that stores data as flexible <b>BSON</b> documents inside <b>collections</b>. It scales horizontally with sharding, replicates for high availability, and pairs with a powerful aggregation framework and rich indexing model. This resource — <b>MongoDB — Project Case Study</b> — is self-contained: Anatomy of a real MongoDB project — schema decisions, trade-offs, indexes, and lessons learned.</p>
        <Callout tone="info" title="MongoDB in one line">MongoDB = JSON-like documents + rich indexes + aggregation pipelines + horizontally scalable clusters.</Callout>
        <Figure src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1400&q=80" caption="Figure 1 — MongoDB document model — collections of BSON documents with embedded objects and arrays." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Document model</b> — BSON documents (JSON + types), collections, databases; no rigid schema by default.</li>
          <li><b>BSON types</b> — ObjectId, Date, Decimal128, Binary, arrays, nested documents, UUID.</li>
          <li><b>CRUD</b> — <code>insertOne / insertMany</code>, <code>find</code>, <code>updateOne / updateMany</code>, <code>deleteOne / deleteMany</code>, <code>replaceOne</code>, bulk writes, upsert.</li>
          <li><b>Query operators</b> — <code>$eq</code>, <code>$gt</code>, <code>$in</code>, <code>$and</code>, <code>$or</code>, <code>$exists</code>, <code>$type</code>, <code>$regex</code>, <code>$elemMatch</code>, <code>$geoWithin</code>, <code>$text</code>.</li>
          <li><b>Aggregation</b> — <code>$match</code>, <code>$group</code>, <code>$project</code>, <code>$sort</code>, <code>$limit</code>, <code>$skip</code>, <code>$lookup</code>, <code>$unwind</code>, <code>$facet</code>, <code>$bucket</code>, <code>$merge</code>, <code>$out</code>, window functions.</li>
          <li><b>Indexes</b> — single, compound, multikey, text, 2dsphere geospatial, TTL, hashed, wildcard.</li>
          <li><b>Schema design</b> — embed for read locality, reference for large / shared / many-to-many data; validate with JSON Schema.</li>
          <li><b>Transactions</b> — multi-document ACID via sessions on replica sets and sharded clusters.</li>
          <li><b>Replication</b> — replica sets with primary + secondaries, elections, oplog, write concerns.</li>
          <li><b>Sharding</b> — shard key, chunks, balancer, config servers, mongos router.</li>
          <li><b>Security</b> — SCRAM-SHA-256 auth, RBAC, TLS, X.509, field-level and queryable encryption, auditing.</li>
          <li><b>Atlas</b> — managed clusters, Atlas Search, Vector Search, Data Lake, Triggers, Charts, Backup.</li>
          <li><b>Drivers</b> — official Node, Python, Java, C#, Go drivers; Mongoose ODM; Spring Data MongoDB.</li>
          <li><b>Performance</b> — <code>explain()</code>, database profiler, index tuning, connection pooling, caching, working set.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Application (Node / Python / Java)
   │  (official driver / Mongoose)
   ▼
[ Mongos Router ] ──── Config Servers (metadata)
   │
   ├── Shard 1  → Replica Set (Primary + Secondaries)
   ├── Shard 2  → Replica Set (Primary + Secondaries)
   └── Shard N  → Replica Set (Primary + Secondaries)

Inside a node:
  Query → Query Planner → Index → Storage Engine (WiredTiger)
       ↘ Aggregation Pipeline: $match → $lookup → $group → $project`}
        </pre>
        <Code lang="javascript">{`// mongosh — quick CRUD tour
use shop;

db.products.insertMany([
  { name: "Book", price: 12, tags: ["edu"], stock: 40 },
  { name: "Pen",  price: 2,  tags: ["edu"], stock: 300 },
]);

db.products.find({ price: { $gt: 5 } }, { name: 1, price: 1, _id: 0 });

db.products.updateOne(
  { name: "Book" },
  { $inc: { stock: -1 }, $set: { updatedAt: new Date() } }
);

db.products.createIndex({ name: 1 }, { unique: true });`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 2 — Aggregation pipeline — $match → $lookup → $unwind → $group → $project stages produce shaped results." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>E-commerce</b> — products, orders, carts with embedded line items and Atlas Search for catalog.</li>
          <li><b>SaaS & LMS</b> — multi-tenant collections with tenant-scoped indexes and RBAC.</li>
          <li><b>Analytics</b> — event ingestion with time-series collections and aggregation dashboards.</li>
          <li><b>Realtime chat</b> — messages + change streams driving Socket.IO updates.</li>
          <li><b>AI apps</b> — Atlas Vector Search for embeddings + RAG pipelines.</li>
          <li><b>Content platforms</b> — CMS documents with flexible schemas and rich media metadata.</li>
        </ul>
        <Code lang="javascript">{`// Aggregation — top-selling products by category, last 30 days
db.orders.aggregate([
  { $match: { createdAt: { $gte: new Date(Date.now() - 30*24*60*60*1000) } } },
  { $unwind: "$items" },
  { $lookup: {
      from: "products", localField: "items.productId",
      foreignField: "_id", as: "product"
  } },
  { $unwind: "$product" },
  { $group: {
      _id: "$product.category",
      revenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } },
      units:   { $sum: "$items.qty" }
  } },
  { $sort: { revenue: -1 } },
  { $limit: 10 }
]);`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Design schemas around <b>query patterns</b>, not entities — embed what you read together.</li>
          <li>Keep documents under 16 MB; move large blobs to GridFS or object storage.</li>
          <li>Create indexes for every query in your hot path — measure with <code>explain("executionStats")</code>.</li>
          <li>Use compound indexes ordered by <b>equality → sort → range</b> (ESR rule).</li>
          <li>Enforce validation with JSON Schema on critical collections.</li>
          <li>Use replica sets in production; never single-node for real workloads.</li>
          <li>Prefer Atlas or managed hosting for backups, monitoring, and PITR out of the box.</li>
          <li>Wrap multi-document writes in transactions only when truly needed — they cost more.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Modeling relational tables 1:1 into collections — losing the document model's advantages.</li>
          <li>Unbounded arrays that grow forever inside a single document.</li>
          <li>Missing indexes → collection scans → slow queries and CPU spikes.</li>
          <li>Choosing a low-cardinality or monotonically increasing shard key (hot chunks).</li>
          <li>Ignoring write concerns and read preferences in multi-region clusters.</li>
          <li>Exposing the database directly to the internet without auth and TLS.</li>
          <li>N+1 queries from the application layer instead of using <code>$lookup</code>.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use Compass to prototype aggregations visually, then export as code.</li>
          <li>Enable the database profiler at level 1 to catch slow queries in dev.</li>
          <li>Prefer <code>updateOne</code> with <code>$set</code>/<code>$inc</code> over read-modify-write.</li>
          <li>Use TTL indexes for session, cache, and audit-log collections.</li>
          <li>Use Atlas Performance Advisor for automatic index recommendations.</li>
          <li>Test schemas against real query loads — schema is a query optimization.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Concept / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Embed vs Reference</td><td>Schema design</td><td>Embed for read locality; reference for shared / large / many-to-many.</td></tr>
              <tr><td className="py-2 pr-4">Single vs Compound Index</td><td>Query acceleration</td><td>Compound for filter + sort combos.</td></tr>
              <tr><td className="py-2 pr-4">Replica Set vs Sharded</td><td>HA vs horizontal scale</td><td>Start with a replica set; shard when data or throughput exceeds one machine.</td></tr>
              <tr><td className="py-2 pr-4">Transactions</td><td>Multi-doc ACID</td><td>Use sparingly for cross-collection invariants.</td></tr>
              <tr><td className="py-2 pr-4">Aggregation vs App Logic</td><td>Data shaping</td><td>Push heavy joins / grouping into aggregation.</td></tr>
              <tr><td className="py-2 pr-4">Mongoose vs Native Driver</td><td>ODM vs raw</td><td>Mongoose for validation + models; native for control + speed.</td></tr>
              <tr><td className="py-2 pr-4">Atlas Search vs $text</td><td>Full-text search</td><td>Atlas Search for relevance, facets, synonyms; <code>$text</code> for simple cases.</td></tr>
              <tr><td className="py-2 pr-4">TTL Index</td><td>Auto-expire docs</td><td>Sessions, OTPs, caches, temporary data.</td></tr>
              <tr><td className="py-2 pr-4">Change Streams</td><td>Realtime events</td><td>Sync caches, push notifications, ETL.</td></tr>
              <tr><td className="py-2 pr-4">mongodump vs Atlas Snapshot</td><td>Backup</td><td>Small DBs → dump; production → managed snapshots + PITR.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — enable auth, TLS, network allowlists, RBAC, field-level encryption for PII, and audit logs.</li>
          <li><b>Performance</b> — right-size indexes, cache hot reads, keep working set in RAM, tune connection pool.</li>
          <li><b>Observability</b> — Atlas metrics or Prometheus exporter, slow query logs, alerting on lag and locks.</li>
          <li><b>Deployment</b> — Atlas (managed), Docker Compose for dev, Kubernetes StatefulSets with persistent volumes for self-hosting.</li>
          <li><b>Backup</b> — Atlas snapshots + PITR; <code>mongodump</code> for small DBs; test restores regularly.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>MongoDB stores flexible BSON documents in collections — model around read patterns.</li>
          <li>Indexes are non-negotiable — every hot query must be backed by one, using the ESR rule.</li>
          <li>Aggregation pipelines are your data-shaping superpower — push logic down to the DB.</li>
          <li>Replica sets give HA; shard when a single machine can't hold data or throughput.</li>
          <li>Secure by default: auth, TLS, RBAC, network rules, and encrypted PII.</li>
          <li>Prefer Atlas for backups, monitoring, and scaling; self-host on K8s only when needed.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is MongoDB relational or NoSQL?">NoSQL, document-oriented — but with rich indexing, ACID transactions, and joins via <code>$lookup</code>.</FAQItem>
        <FAQItem q="When should I use MongoDB vs PostgreSQL?">Choose MongoDB for flexible / hierarchical data, rapid schema evolution, and horizontal scale. Choose PostgreSQL for strong relational modeling and complex SQL.</FAQItem>
        <FAQItem q="What's the max document size?">16 MB per document; use GridFS or object storage for larger blobs.</FAQItem>
        <FAQItem q="Do I need Mongoose?">No — the official driver is enough. Mongoose adds schemas, validation, and middleware for Node.js apps.</FAQItem>
        <FAQItem q="How do I choose a shard key?">Pick a key with high cardinality, even distribution, and query locality — often a compound of tenant + time or hashed identifier.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.mongodb.com/docs/" target="_blank" rel="noreferrer">MongoDB Docs</a> · <a className="text-primary hover:underline" href="https://www.mongodb.com/docs/atlas/" target="_blank" rel="noreferrer">Atlas Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://www.mongodb.com/docs/compass/" target="_blank" rel="noreferrer">Compass</a> · <a className="text-primary hover:underline" href="https://www.mongodb.com/docs/mongodb-shell/" target="_blank" rel="noreferrer">mongosh</a></li>
          <li><a className="text-primary hover:underline" href="https://mongoosejs.com/docs/" target="_blank" rel="noreferrer">Mongoose</a> · <a className="text-primary hover:underline" href="https://www.mongodb.com/docs/drivers/node/" target="_blank" rel="noreferrer">Node.js Driver</a></li>
          <li><a className="text-primary hover:underline" href="https://learn.mongodb.com/" target="_blank" rel="noreferrer">MongoDB University</a> · <a className="text-primary hover:underline" href="https://www.mongodb.com/docs/atlas/atlas-search/" target="_blank" rel="noreferrer">Atlas Search</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is for educational purposes only. MongoDB, Atlas, Compass, and mongosh are trademarks of MongoDB, Inc. Always consult the official documentation and test in a non-production environment before applying to real systems.</p>
      </Section>
    </ReaderShell>
  );
}
