import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "nodejs-sample-exercises",
  title: "Node.js — Sample Exercises",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "19 min",
  pages: 22,
  lastUpdated: "July 2026",
  tags: ["Node", "Backend"],
  heroImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1800&q=80",
  heroSubtitle: 'Small, focused Node.js exercises to build async, streams, HTTP, and API muscle memory.',
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
  { title: "Node.js — Beginner Guide", tag: "Node", time: "13 min" },
  { title: "Node.js — Cheat Sheet", tag: "Node", time: "3 min" },
  { title: "Node.js — Interview Questions", tag: "Node", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/nodejs-sample-exercises")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/nodejs-sample-exercises" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Sample Exercises</b> — practical, production-ready Node.js.</li>
          <li>Understand the V8 runtime, event loop, and non-blocking I/O model.</li>
          <li>Build REST APIs and realtime services with core modules and Express.</li>
          <li>Integrate MongoDB, PostgreSQL, MySQL, or Redis through mature drivers and ORMs.</li>
          <li>Secure, test, log, and deploy Node.js services with Docker, PM2, and the cloud.</li>
          <li>Scale to clusters, worker threads, and microservices with message queues.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with modern JavaScript / TypeScript (async / await, modules, ES2020+).</li>
          <li>Node.js 20+ and npm installed locally; familiarity with the terminal.</li>
          <li>Basic HTTP, REST, JSON, and one SQL or NoSQL database.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Node.js — V8, runtime, npm, npx, nvm, REPL</li>
          <li>JavaScript fundamentals — ES6+, classes, closures, functional patterns</li>
          <li>Module system — CommonJS, ES Modules, custom + third-party modules</li>
          <li>Core modules — fs, path, os, http/https, url, crypto, events, stream, buffer</li>
          <li>Event loop — phases, microtasks, <code>nextTick</code>, <code>setImmediate</code></li>
          <li>Async programming — callbacks, promises, async/await, error handling</li>
          <li>File system & streams — readable, writable, transform, pipes, backpressure</li>
          <li>Buffers — binary data, encoding, decoding, memory</li>
          <li>Events — EventEmitter, custom events, listeners</li>
          <li>Networking — HTTP, HTTPS, TCP/UDP, DNS, WebSockets, Socket.IO</li>
          <li>Express integration — routing, middleware, REST APIs, validation</li>
          <li>Databases — MongoDB / Mongoose, PostgreSQL, MySQL, Redis, Prisma, Sequelize</li>
          <li>Authentication — JWT, OAuth, Passport.js, sessions, refresh tokens, RBAC</li>
          <li>Security — Helmet, CORS, CSRF, XSS, rate limiting, injection, secrets</li>
          <li>Testing — Jest, Mocha, Chai, Vitest, Supertest, unit / integration / API</li>
          <li>Logging & monitoring — Morgan, Winston, Pino, error tracking, metrics</li>
          <li>Performance — GC, profiling, caching, compression, clustering, worker threads</li>
          <li>Deployment — PM2, Docker, Kubernetes, Nginx, CI/CD, cloud providers</li>
          <li>Microservices — API gateway, RabbitMQ, Kafka, event-driven architecture</li>
          <li>Design patterns — MVC, repository, service layer, DI, SOLID, clean architecture</li>
          <li>Debugging — Node Inspector, DevTools, heap snapshots, CPU profiling</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Node.js is a JavaScript runtime built on Chrome's V8 engine — event-driven, non-blocking, and designed for scalable network applications. It's the backbone of countless production APIs, realtime services, CLIs, and full-stack backends. This resource — <b>Node.js — Sample Exercises</b> — is self-contained: Small, focused Node.js exercises to build async, streams, HTTP, and API muscle memory.</p>
        <Callout tone="info" title="Node.js in one line">Node.js = V8 + libuv event loop + a rich stdlib — one language for backends, tooling, and edge runtimes.</Callout>
        <Figure src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80" caption="Figure 1 — Node.js event loop — phases, microtasks, and non-blocking I/O over V8." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Runtime</b> — V8 engine, libuv, threadpool, event loop phases, non-blocking I/O.</li>
          <li><b>Tooling</b> — npm, npx, pnpm, nvm, <code>package.json</code>, <code>package-lock.json</code>, semver.</li>
          <li><b>Modules</b> — CommonJS (<code>require</code>) vs ES Modules (<code>import</code>), dynamic imports, module resolution.</li>
          <li><b>Core APIs</b> — fs, path, os, http/https, url, querystring, crypto, events, stream, buffer, process.</li>
          <li><b>Async</b> — callbacks, promises, async/await, <code>Promise.all</code>/<code>race</code>, error propagation.</li>
          <li><b>Streams</b> — readable, writable, duplex, transform, <code>pipe</code>, backpressure, stream events.</li>
          <li><b>Events</b> — <code>EventEmitter</code>, listeners, once, error events, memory leaks with listeners.</li>
          <li><b>Networking</b> — HTTP/HTTPS servers, TCP/UDP sockets, DNS, WebSockets, Socket.IO.</li>
          <li><b>Web</b> — Express routing, middleware, REST APIs, validation, error handling.</li>
          <li><b>Databases</b> — MongoDB + Mongoose, PostgreSQL, MySQL, SQLite, Redis, Prisma, Sequelize, TypeORM.</li>
          <li><b>Auth</b> — JWT, OAuth, Passport.js, sessions, cookies, bcrypt, refresh tokens, RBAC.</li>
          <li><b>Security</b> — Helmet, CORS, CSRF, XSS, rate limiting, injection prevention, secrets management.</li>
          <li><b>Testing</b> — Jest / Mocha + Chai + Supertest, unit / integration / API tests.</li>
          <li><b>Logging</b> — Morgan, Winston, Pino, log rotation, structured logs, error tracking.</li>
          <li><b>Performance</b> — GC tuning, profiling, caching (Redis), compression, clustering, worker threads.</li>
          <li><b>Deployment</b> — PM2, Docker, Kubernetes, Nginx reverse proxy, CI/CD, Vercel, Railway, Render, AWS, GCP, Azure.</li>
          <li><b>Microservices</b> — API gateway, service discovery, RabbitMQ / Kafka, event-driven design.</li>
          <li><b>Architecture</b> — MVC, repository pattern, service layer, DI, SOLID, clean architecture.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Client Request (HTTP / TCP / WS)
   │
   ▼
[Nginx / Load Balancer]
   │
   ▼
[Node.js Process]
   ├── V8 Call Stack
   ├── Event Loop (timers → pending → poll → check → close)
   │      ├── Microtasks (Promises, process.nextTick)
   │      └── libuv Threadpool (fs, crypto, dns)
   ├── EventEmitter / Streams
   ├── HTTP Server / Express
   │       └── controller → service → repository → DB / cache
   └── Worker Threads / Cluster
   │
   ▼
Response (JSON / Stream / File)`}
        </pre>
        <Code lang="javascript">{`// server.js — minimal, production-shaped Node.js HTTP server
import http from "node:http";
import { readFile } from "node:fs/promises";

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      return res.end(JSON.stringify({ ok: true }));
    }
    if (req.url === "/") {
      const html = await readFile(new URL("./index.html", import.meta.url));
      res.writeHead(200, { "content-type": "text/html" });
      return res.end(html);
    }
    res.writeHead(404).end("Not found");
  } catch (err) {
    console.error(err);
    res.writeHead(500).end("Server error");
  }
});

server.listen(process.env.PORT || 3000, () => console.log("Node up"));`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1400&q=80" caption="Figure 2 — REST API architecture on Node.js — router → middleware → controller → service → repository → database." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>REST APIs</b> — Express / Fastify on Node.js backing SaaS, e-commerce, and internal tools.</li>
          <li><b>Realtime</b> — chat, notifications, and dashboards over Socket.IO / native WebSockets.</li>
          <li><b>Streaming</b> — file uploads, video pipelines, and log processing via streams.</li>
          <li><b>Microservices</b> — API gateway routes to Node services communicating via RabbitMQ / Kafka.</li>
          <li><b>AI backends</b> — Node fronts LLM providers, streams tokens over SSE, and persists chat history.</li>
          <li><b>Tooling & CLIs</b> — build tools, code generators, and internal automation.</li>
        </ul>
        <Code lang="javascript">{`// streams.js — pipe a large file through gzip without loading it into memory
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

await pipeline(
  createReadStream("big.log"),
  createGzip(),
  createWriteStream("big.log.gz")
);
console.log("compressed");`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Structure by feature (routes / controllers / services / repositories) — not by file type.</li>
          <li>Never block the event loop — offload CPU work to worker threads or a queue.</li>
          <li>Always <code>await</code> async work and centralize error handling.</li>
          <li>Validate every request with Zod / Joi — treat clients as untrusted.</li>
          <li>Hash passwords with bcrypt / argon2; sign JWTs with strong secrets and rotate keys.</li>
          <li>Set <code>helmet</code>, strict <code>cors</code>, <code>express-rate-limit</code>, and secure cookies by default.</li>
          <li>Use environment variables (<code>dotenv</code>) — never commit secrets.</li>
          <li>Log with Winston / Pino, monitor with Prometheus / OpenTelemetry, trace requests end-to-end.</li>
          <li>Run behind PM2 or Docker with a reverse proxy (Nginx / Caddy) terminating TLS.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Blocking the event loop with sync crypto, huge JSON parsing, or CPU loops.</li>
          <li>Callback hell — mixing raw callbacks with promises without a wrapper.</li>
          <li>Forgetting to handle promise rejections — <code>unhandledRejection</code> crashes the process.</li>
          <li>Leaking listeners on <code>EventEmitter</code> — growing memory and MaxListeners warnings.</li>
          <li>Leaking stack traces or database errors to clients in production.</li>
          <li>Skipping rate limiting on login and password reset endpoints.</li>
          <li>Ignoring backpressure on streams — memory blowups on large files.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>node --watch</code> in dev instead of nodemon for simple projects.</li>
          <li>Prefer <code>node:*</code> import prefixes for built-in modules — they're explicit and future-proof.</li>
          <li>Wrap async handlers with a small <code>asyncHandler</code> util or use <code>express-async-errors</code>.</li>
          <li>Cache read-heavy endpoints in Redis with tag-based invalidation.</li>
          <li>Type your project with TypeScript + strict mode; run <code>tsc --noEmit</code> in CI.</li>
          <li>Use <code>node --inspect</code> and Chrome DevTools for heap snapshots and CPU profiles.</li>
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
              <tr><td className="py-2 pr-4">CommonJS vs ESM</td><td>Module systems</td><td>New projects → ESM; legacy → CommonJS.</td></tr>
              <tr><td className="py-2 pr-4">EventEmitter</td><td>Custom events</td><td>Decoupled internal messaging.</td></tr>
              <tr><td className="py-2 pr-4">Streams</td><td>Chunked I/O</td><td>Large files, network, transforms.</td></tr>
              <tr><td className="py-2 pr-4">Cluster</td><td>Multi-process scaling</td><td>Use all CPU cores on a single host.</td></tr>
              <tr><td className="py-2 pr-4">Worker Threads</td><td>Parallel CPU work</td><td>Hashing, image work, heavy compute.</td></tr>
              <tr><td className="py-2 pr-4">Express / Fastify</td><td>HTTP framework</td><td>REST APIs, backends, edge services.</td></tr>
              <tr><td className="py-2 pr-4">Mongoose / Prisma</td><td>ORM / ODM</td><td>MongoDB or SQL with types.</td></tr>
              <tr><td className="py-2 pr-4">Socket.IO</td><td>Realtime</td><td>Chat, notifications, dashboards.</td></tr>
              <tr><td className="py-2 pr-4">PM2 / Docker</td><td>Process / container mgmt</td><td>Production deployment and clustering.</td></tr>
              <tr><td className="py-2 pr-4">RabbitMQ / Kafka</td><td>Message queues</td><td>Event-driven microservices.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — Helmet, strict CORS, CSRF for cookie flows, rate limiting, input validation, parameterized queries.</li>
          <li><b>Performance</b> — enable compression, cache with Redis, cluster mode, avoid sync APIs, stream large payloads.</li>
          <li><b>Observability</b> — Winston / Pino logs, request IDs, Morgan access logs, OpenTelemetry traces, health probes.</li>
          <li><b>Deployment</b> — Docker + PM2 behind Nginx; managed hosts (Railway, Render, Fly.io); cloud (AWS ECS / GCP Cloud Run / Azure).</li>
          <li><b>CI/CD</b> — GitHub Actions runs tests, lint, and pushes container images; blue/green or rolling deploys.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Node.js is single-threaded and event-driven — never block the event loop.</li>
          <li>Modules, streams, and events are the building blocks — learn them deeply.</li>
          <li>Design REST APIs around routers, middleware, and controllers with services and repositories.</li>
          <li>Secure every endpoint with validation, auth, rate limiting, and secure headers by default.</li>
          <li>Cache with Redis, cluster with PM2, and monitor with structured logs and traces.</li>
          <li>Deploy on Docker / Nginx or managed hosts; scale to microservices with queues and gateways.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is Node.js still relevant in 2026?">Yes — it remains one of the most widely deployed backend runtimes and powers countless production APIs, tools, and full-stack apps.</FAQItem>
        <FAQItem q="Node vs Deno vs Bun?">Node is the mature standard; Deno emphasizes web APIs and security; Bun focuses on speed. Node wins for ecosystem breadth today.</FAQItem>
        <FAQItem q="Should I use TypeScript with Node.js?">Yes for anything non-trivial — pair with strict mode and Zod for typed, validated APIs.</FAQItem>
        <FAQItem q="How do I handle async errors?">Use async/await with try/catch and a central error middleware; never leave unhandled rejections in production.</FAQItem>
        <FAQItem q="How do I scale a Node.js app?">Cluster to use all cores, offload CPU work to worker threads, cache in Redis, and split into microservices when domains grow.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://nodejs.org/docs/latest/api/" target="_blank" rel="noreferrer">Node.js Docs</a> · <a className="text-primary hover:underline" href="https://docs.npmjs.com/" target="_blank" rel="noreferrer">npm Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://expressjs.com/" target="_blank" rel="noreferrer">Express.js</a> · <a className="text-primary hover:underline" href="https://socket.io/docs/" target="_blank" rel="noreferrer">Socket.IO</a></li>
          <li><a className="text-primary hover:underline" href="https://www.mongodb.com/docs/" target="_blank" rel="noreferrer">MongoDB</a> · <a className="text-primary hover:underline" href="https://mongoosejs.com/docs/" target="_blank" rel="noreferrer">Mongoose</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.docker.com/" target="_blank" rel="noreferrer">Docker</a> · <a className="text-primary hover:underline" href="https://pm2.keymetrics.io/docs/" target="_blank" rel="noreferrer">PM2</a> · <a className="text-primary hover:underline" href="https://jestjs.io/" target="_blank" rel="noreferrer">Jest</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Node.js and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
