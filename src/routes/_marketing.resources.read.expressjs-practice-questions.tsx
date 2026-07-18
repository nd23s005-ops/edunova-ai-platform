import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "expressjs-practice-questions",
  title: "Express.js — Practice Questions",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "24 min",
  pages: 26,
  lastUpdated: "February 2026",
  tags: ["Express", "REST"],
  heroImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1800&q=80",
  heroSubtitle: 'Hands-on Express.js practice problems spanning routing, middleware, REST APIs, auth, and databases.',
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
  { title: "Express.js — Beginner Guide", tag: "Express", time: "10 min" },
  { title: "Express.js — Cheat Sheet", tag: "Express", time: "6 min" },
  { title: "Express.js — Interview Questions", tag: "Express", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/expressjs-practice-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/expressjs-practice-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Practice Questions</b> — practical, production-ready Express.js.</li>
          <li>Design REST APIs with routing, middleware, and controller layers.</li>
          <li>Integrate MongoDB / PostgreSQL / MySQL through Mongoose, Prisma, or Sequelize.</li>
          <li>Secure APIs with JWT, OAuth, Helmet, CORS, rate limiting, and input validation.</li>
          <li>Test, log, monitor, and deploy Express services to Docker, PM2, and the cloud.</li>
          <li>Scale to microservices with API gateways, message queues, and clean architecture.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with modern JavaScript / TypeScript (async/await, modules, ES2020+).</li>
          <li>Node.js 20+ and npm installed locally; familiarity with the terminal.</li>
          <li>Basic HTTP, REST, JSON, and one SQL or NoSQL database.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Express.js, Node.js runtime, npm, and npx</li>
          <li>Express architecture, event loop, and request–response lifecycle</li>
          <li>Installation, project structure, and MVC pattern</li>
          <li>Creating a server — <code>app.listen()</code>, <code>app.use()</code>, verbs</li>
          <li>Routing — static, dynamic, params, query strings, Express Router, versioning</li>
          <li>Middleware — built-in, custom, third-party, error, auth, validation, security</li>
          <li>Request / Response — headers, body, cookies, sessions, redirects, status codes</li>
          <li>REST API design — CRUD, idempotency, pagination, filtering, sorting</li>
          <li>Databases — MongoDB / Mongoose, PostgreSQL, MySQL, Prisma, Sequelize, TypeORM</li>
          <li>Authentication — JWT, OAuth, Passport.js, sessions, refresh tokens, bcrypt</li>
          <li>Authorization — RBAC, permissions, protected routes, access control</li>
          <li>Validation & sanitization — express-validator, Joi, Zod, Yup</li>
          <li>File handling — Multer, uploads, streaming, Cloudinary, AWS S3</li>
          <li>Error handling — async errors, global handler, custom errors, debugging</li>
          <li>Security — Helmet, CORS, CSRF, XSS, rate limiting, injection prevention</li>
          <li>Performance — compression, Redis caching, cluster mode, PM2, profiling</li>
          <li>Real-time — Socket.IO, WebSockets, SSE, notifications, chat</li>
          <li>Testing — Jest, Mocha, Chai, Supertest, unit / integration / E2E</li>
          <li>Docs, logging & monitoring — Swagger, Morgan, Winston, Pino</li>
          <li>Deployment — Docker, PM2, Nginx, Vercel, Railway, Render, AWS, GCP, Azure</li>
          <li>Microservices, message queues, and enterprise architecture</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Express.js is the de-facto minimal, unopinionated web framework for Node.js — the backbone of countless production APIs and full-stack backends. It gives you routing, middleware, and a razor-thin abstraction over Node's HTTP module, letting you compose exactly the backend you need. This resource — <b>Express.js — Practice Questions</b> — is self-contained: Hands-on Express.js practice problems spanning routing, middleware, REST APIs, auth, and databases.</p>
        <Callout tone="info" title="Express.js in one line">Express = minimal HTTP framework + composable middleware + explicit routing — build any REST or realtime backend on Node.js.</Callout>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 1 — Express.js request–response lifecycle — middleware chain, router matching, and response." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — Node.js runtime, event loop, CommonJS vs ES Modules, npm, npx, project layout.</li>
          <li><b>App</b> — <code>express()</code>, <code>app.listen()</code>, <code>app.use()</code>, <code>get/post/put/patch/delete/all</code>.</li>
          <li><b>Routing</b> — static / dynamic routes, params, query strings, Express Router, modular routes, API versioning.</li>
          <li><b>Middleware</b> — built-in (<code>express.json()</code>, <code>express.static()</code>), custom, third-party, error, auth, validation, security.</li>
          <li><b>Request / Response</b> — headers, body, cookies, sessions, JSON, files, redirects, status codes.</li>
          <li><b>REST</b> — CRUD, idempotency, pagination, filtering, sorting, searching, versioning.</li>
          <li><b>Databases</b> — MongoDB + Mongoose, PostgreSQL, MySQL, SQLite, Prisma, Sequelize, TypeORM, pools, transactions.</li>
          <li><b>Auth</b> — JWT (access + refresh), OAuth, Passport.js, sessions, cookies, bcrypt password hashing.</li>
          <li><b>Authorization</b> — RBAC, permissions, roles, protected routes, API keys.</li>
          <li><b>Validation</b> — express-validator, Joi, Zod, Yup, sanitization.</li>
          <li><b>File handling</b> — Multer uploads, Cloudinary, AWS S3, static assets, streaming.</li>
          <li><b>Security</b> — Helmet, CORS, CSRF, XSS, rate limiting, injection prevention, secure headers.</li>
          <li><b>Performance</b> — compression, Redis cache, cluster mode, PM2, lazy loading, profiling.</li>
          <li><b>Realtime</b> — Socket.IO, WebSockets, SSE, chat, notifications.</li>
          <li><b>Testing</b> — Jest / Mocha + Chai + Supertest, unit / integration / E2E.</li>
          <li><b>Docs & monitoring</b> — Swagger / OpenAPI, Morgan, Winston, Pino, error tracking.</li>
          <li><b>Deployment</b> — Docker, PM2, Nginx reverse proxy, Vercel, Railway, Render, AWS, GCP, Azure, CI/CD.</li>
          <li><b>Microservices</b> — API gateway, service discovery, message queues (RabbitMQ, Kafka), event-driven design.</li>
          <li><b>Architecture</b> — MVC, repository pattern, service layer, DI, clean / layered / feature-based structure.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Client Request (HTTP)
   │
   ▼
[Nginx / Load Balancer]
   │
   ▼
[Express App]
   │
   ├── app.use(helmet())        ── security headers
   ├── app.use(cors())          ── CORS
   ├── app.use(express.json())  ── body parser
   ├── app.use(morgan("dev"))   ── logging
   ├── app.use("/api", router)  ── modular router
   │        │
   │        ├── authMiddleware  ── JWT verify
   │        ├── validate(schema)── Zod / Joi
   │        └── controller      ── service → repository → DB
   │
   └── app.use(errorHandler)    ── central error middleware
   │
   ▼
Response (JSON / Stream / File)`}
        </pre>
        <Code lang="javascript">{`// server.js — minimal, production-shaped Express app
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/v1/users", (await import("./routes/users.js")).default);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(process.env.PORT || 3000, () => console.log("API up"));`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80" caption="Figure 2 — REST API architecture — router → middleware → controller → service → repository → database." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>SaaS backends</b> — auth, billing, tenants — Express + PostgreSQL + Prisma is a common stack.</li>
          <li><b>E-commerce APIs</b> — catalog, cart, checkout, orders — MongoDB / Mongoose or PostgreSQL.</li>
          <li><b>LMS / EdTech</b> — course APIs, progress tracking, assessments — modular routers per domain.</li>
          <li><b>Chat & notifications</b> — Socket.IO on top of Express for realtime channels.</li>
          <li><b>Microservices</b> — API gateway routes to Express services communicating via RabbitMQ / Kafka.</li>
          <li><b>AI SaaS</b> — Express fronts LLM providers, streams tokens over SSE, and persists chat history.</li>
        </ul>
        <Code lang="javascript">{`// routes/users.js — router with validation, auth, and controller
import { Router } from "express";
import { z } from "zod";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import * as users from "../controllers/users.js";

const router = Router();

const CreateUser = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]).default("user"),
});

router.post("/", validate(CreateUser), users.create);
router.get("/", auth("admin"), users.list);
router.get("/:id", auth(), users.getOne);
router.patch("/:id", auth(), validate(CreateUser.partial()), users.update);
router.delete("/:id", auth("admin"), users.remove);

export default router;`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Structure by feature (routes / controllers / services / repositories) — not by file type.</li>
          <li>Always <code>await</code> async work and centralize errors with <code>express-async-errors</code> or wrappers.</li>
          <li>Validate every request with Zod / Joi — treat clients as untrusted.</li>
          <li>Hash passwords with bcrypt / argon2; sign JWTs with strong secrets and rotate keys.</li>
          <li>Set <code>helmet</code>, strict <code>cors</code>, <code>express-rate-limit</code>, and secure cookies by default.</li>
          <li>Use environment variables (<code>dotenv</code>) — never commit secrets.</li>
          <li>Log with Winston / Pino, monitor with Prometheus / OpenTelemetry, and trace requests end-to-end.</li>
          <li>Run behind PM2 or Docker with a reverse proxy (Nginx / Caddy) terminating TLS.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Placing middleware in the wrong order — auth after body parser, error handler before routes.</li>
          <li>Forgetting to <code>next(err)</code> in async handlers — silent 500s and hanging requests.</li>
          <li>Blocking the event loop with sync crypto, large JSON parsing, or CPU-heavy loops.</li>
          <li>Leaking stack traces or database errors to clients in production.</li>
          <li>Trusting <code>req.body</code> without validation — mass-assignment and injection bugs.</li>
          <li>Skipping rate limiting on login and password reset endpoints.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>express.Router()</code> per feature and mount under versioned prefixes (<code>/api/v1</code>).</li>
          <li>Wrap async handlers with a small <code>asyncHandler</code> util or use <code>express-async-errors</code>.</li>
          <li>Return a consistent JSON envelope: <code>{'}} data, error, meta {{'}</code>.</li>
          <li>Cache read-heavy endpoints in Redis with tag-based invalidation.</li>
          <li>Type routes end-to-end with TypeScript + Zod-inferred request shapes.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Tool / Concept</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">express.json / urlencoded</td><td>Body parsing</td><td>Default for JSON / form APIs.</td></tr>
              <tr><td className="py-2 pr-4">Helmet</td><td>Secure headers</td><td>Always — CSP, HSTS, XSS filters.</td></tr>
              <tr><td className="py-2 pr-4">CORS</td><td>Cross-origin control</td><td>Public / browser-facing APIs.</td></tr>
              <tr><td className="py-2 pr-4">express-rate-limit</td><td>Rate limiting</td><td>Login, signup, password reset, public endpoints.</td></tr>
              <tr><td className="py-2 pr-4">Passport.js</td><td>Auth strategies</td><td>OAuth (Google, GitHub), local, JWT.</td></tr>
              <tr><td className="py-2 pr-4">Mongoose</td><td>MongoDB ODM</td><td>Document data, flexible schemas.</td></tr>
              <tr><td className="py-2 pr-4">Prisma</td><td>Type-safe ORM</td><td>PostgreSQL / MySQL with TypeScript.</td></tr>
              <tr><td className="py-2 pr-4">Multer</td><td>File uploads</td><td>Multipart form uploads to disk / S3.</td></tr>
              <tr><td className="py-2 pr-4">Socket.IO</td><td>Realtime</td><td>Chat, notifications, presence.</td></tr>
              <tr><td className="py-2 pr-4">PM2 / Docker</td><td>Process / container mgmt</td><td>Production deployment and clustering.</td></tr>
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
          <li>Express.js is a thin, composable framework — you assemble middleware into your ideal backend.</li>
          <li>Design around routers, middleware, and controllers; keep business logic in services / repositories.</li>
          <li>Secure every endpoint with validation, auth, rate limiting, and secure headers by default.</li>
          <li>Cache with Redis, cluster with PM2, and monitor with structured logs and traces.</li>
          <li>Deploy on Docker / Nginx or managed hosts; scale to microservices with queues and gateways.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is Express.js still relevant in 2026?">Yes — it remains the most widely deployed Node.js framework and powers countless production APIs and microservices.</FAQItem>
        <FAQItem q="Express, Fastify, or NestJS?">Express is minimal and flexible; Fastify is faster with schema-first APIs; NestJS layers structure on top (and can use Express under the hood).</FAQItem>
        <FAQItem q="Should I use TypeScript with Express?">Yes for anything non-trivial — pair with Zod for typed, validated requests.</FAQItem>
        <FAQItem q="How do I handle async errors?">Use <code>express-async-errors</code> or wrap handlers so rejected promises reach your error middleware.</FAQItem>
        <FAQItem q="What's the best database?">Match the domain: PostgreSQL for relational, MongoDB for document-heavy, Redis for cache / queues.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://expressjs.com/" target="_blank" rel="noreferrer">Express.js Docs</a> · <a className="text-primary hover:underline" href="https://expressjs.com/en/4x/api.html" target="_blank" rel="noreferrer">Express API</a> · <a className="text-primary hover:underline" href="https://expressjs.com/en/guide/routing.html" target="_blank" rel="noreferrer">Routing Guide</a></li>
          <li><a className="text-primary hover:underline" href="https://nodejs.org/docs/latest/api/" target="_blank" rel="noreferrer">Node.js Docs</a> · <a className="text-primary hover:underline" href="https://docs.npmjs.com/" target="_blank" rel="noreferrer">npm Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://mongoosejs.com/docs/" target="_blank" rel="noreferrer">Mongoose</a> · <a className="text-primary hover:underline" href="https://www.prisma.io/docs" target="_blank" rel="noreferrer">Prisma</a> · <a className="text-primary hover:underline" href="https://sequelize.org/" target="_blank" rel="noreferrer">Sequelize</a></li>
          <li><a className="text-primary hover:underline" href="https://www.passportjs.org/" target="_blank" rel="noreferrer">Passport.js</a> · <a className="text-primary hover:underline" href="https://jwt.io/introduction" target="_blank" rel="noreferrer">JWT</a> · <a className="text-primary hover:underline" href="https://swagger.io/specification/" target="_blank" rel="noreferrer">Swagger / OpenAPI</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Express.js and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
