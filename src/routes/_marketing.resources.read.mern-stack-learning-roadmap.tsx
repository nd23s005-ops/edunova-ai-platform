import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "mern-stack-learning-roadmap",
  title: "MERN Stack — Learning Roadmap",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "7 min",
  pages: 11,
  lastUpdated: "February 2026",
  tags: ["MERN", "Fullstack"],
  heroImage: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1800&q=80",
  heroSubtitle: 'A month-by-month MERN roadmap from beginner JavaScript to enterprise full-stack developer.',
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
  { title: "MERN Stack — Beginner Guide", tag: "MERN", time: "13 min" },
  { title: "MERN Stack — Cheat Sheet", tag: "MERN", time: "3 min" },
  { title: "MERN Stack — Interview Questions", tag: "MERN", time: "44 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/mern-stack-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/mern-stack-learning-roadmap" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Learning Roadmap</b> — practical, production-ready MERN full-stack development.</li>
          <li>Design REST APIs with Express, Node.js, and Mongoose against MongoDB.</li>
          <li>Build React frontends with hooks, routing, state, and data fetching against a MERN backend.</li>
          <li>Secure the stack with JWT, OAuth, Helmet, CORS, rate limiting, and input validation.</li>
          <li>Test, log, monitor, and deploy MERN apps with Docker, PM2, CI/CD, and the cloud.</li>
          <li>Scale to microservices with API gateways, message queues, and clean architecture.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with modern JavaScript / TypeScript (async/await, modules, ES2020+).</li>
          <li>Node.js 20+ and npm installed locally; familiarity with the terminal.</li>
          <li>Basic HTTP, REST, JSON, and one relational or document database.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to the MERN Stack — MongoDB, Express, React, Node.js</li>
          <li>Full-stack architecture, SPA + REST, and MVC patterns</li>
          <li>Modern JavaScript & TypeScript foundations</li>
          <li>Node.js runtime — event loop, modules, streams, HTTP</li>
          <li>Express.js — routing, middleware, request/response, error handling</li>
          <li>REST API design — CRUD, pagination, filtering, versioning, Swagger</li>
          <li>MongoDB — collections, documents, CRUD, aggregation, indexing</li>
          <li>Mongoose — schemas, models, validation, population, hooks</li>
          <li>React.js — components, props, state, hooks, context, router</li>
          <li>State management — Redux Toolkit, Zustand, TanStack Query, SWR</li>
          <li>Frontend UI — Tailwind, Shadcn, Material UI, responsive & a11y</li>
          <li>Authentication — JWT, OAuth, Passport.js, refresh tokens, RBAC</li>
          <li>File storage — Multer, Cloudinary, AWS S3, image optimization</li>
          <li>Real-time — Socket.IO, WebSockets, notifications, chat, dashboards</li>
          <li>Payments — Stripe, Razorpay, PayPal, webhooks, subscriptions</li>
          <li>Email — Nodemailer, SendGrid, Mailgun, Resend, OTP & verification</li>
          <li>Security — Helmet, CORS, CSRF, XSS, injection, rate limiting</li>
          <li>Performance — Redis cache, compression, code splitting, profiling</li>
          <li>Testing — Jest, Vitest, RTL, Supertest, Cypress, Playwright</li>
          <li>DevOps — Git, GitHub Actions, Docker, Kubernetes, CI/CD, Nginx</li>
          <li>Cloud deployment — Vercel, Netlify, Railway, Render, AWS, Azure, GCP</li>
          <li>AI integrations, microservices, system design, and monitoring</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>The MERN Stack — <b>MongoDB, Express, React, Node.js</b> — is one of the most widely deployed full-stack combinations in modern web development. It uses a single language (JavaScript / TypeScript) end-to-end, a flexible document database, and a component-driven UI, letting teams ship production apps quickly without stack fragmentation. This resource — <b>MERN Stack — Learning Roadmap</b> — is self-contained: A month-by-month MERN roadmap from beginner JavaScript to enterprise full-stack developer.</p>
        <Callout tone="info" title="MERN in one line">MERN = MongoDB (data) + Express (API) + React (UI) + Node.js (runtime) — one language across the entire stack.</Callout>
        <Figure src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80" caption="Figure 1 — MERN architecture — React SPA calls Express REST APIs backed by MongoDB, all running on Node.js." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — full-stack development, client–server, SPA, REST, MVC, monolith vs microservices.</li>
          <li><b>JavaScript / TypeScript</b> — ES6+, modules, async / await, promises, event loop, OOP, FP, error handling.</li>
          <li><b>Node.js</b> — runtime, npm / npx / pnpm, event loop, streams, buffers, fs, http, crypto, env vars.</li>
          <li><b>Express.js</b> — routing, middleware, request / response, REST, Router, validation, error handling, security.</li>
          <li><b>MongoDB</b> — NoSQL, collections, documents, BSON, CRUD, indexing, aggregation, transactions, Atlas.</li>
          <li><b>Mongoose</b> — schemas, models, validation, middleware, population, virtuals, hooks, plugins.</li>
          <li><b>React</b> — JSX, components, props, state, hooks, context, router, forms, suspense, error boundaries.</li>
          <li><b>State</b> — Redux Toolkit, Zustand, Recoil, Context, TanStack Query, SWR.</li>
          <li><b>UI</b> — Tailwind, Shadcn, Material UI, Chakra, Ant Design, responsive, a11y, dark mode.</li>
          <li><b>APIs</b> — CRUD, pagination, filtering, sorting, versioning, Swagger / OpenAPI, Postman.</li>
          <li><b>Auth</b> — JWT (access + refresh), OAuth, sessions, cookies, Passport.js, RBAC, MFA, social login.</li>
          <li><b>Storage</b> — Multer, Cloudinary, AWS S3, Firebase Storage, image / video optimization.</li>
          <li><b>Realtime</b> — Socket.IO, WebSockets, notifications, chat, live dashboards.</li>
          <li><b>Payments & email</b> — Stripe / Razorpay / PayPal, Nodemailer / SendGrid / Resend, webhooks.</li>
          <li><b>Security</b> — Helmet, CORS, CSRF, XSS, NoSQL / SQL injection, rate limiting, encryption, HTTPS.</li>
          <li><b>Performance</b> — Redis cache, compression, lazy loading, code splitting, bundle & DB optimization.</li>
          <li><b>Testing</b> — Jest, Vitest, React Testing Library, Supertest, Cypress, Playwright — unit / integration / E2E.</li>
          <li><b>DevOps</b> — Git, GitHub Actions, Docker, Kubernetes, CI/CD, Nginx, PM2.</li>
          <li><b>Cloud</b> — Vercel, Netlify, Railway, Render, AWS, Azure, GCP, DigitalOcean.</li>
          <li><b>AI & microservices</b> — OpenAI / Gemini / Claude APIs, LangChain, RAG, API gateway, RabbitMQ, Kafka.</li>
          <li><b>Architecture</b> — MVC, repository pattern, service layer, SOLID, clean / layered / feature-based.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Browser (React SPA)
   │  fetch / axios / TanStack Query
   ▼
[Nginx / CDN / Load Balancer]
   │
   ▼
[Express API on Node.js]
   ├── helmet, cors, json, morgan, rate-limit
   ├── /api/v1/auth   ── JWT + refresh tokens
   ├── /api/v1/users  ── controller → service → repo
   ├── /api/v1/...    ── feature routers
   └── errorHandler   ── central error middleware
   │
   ▼
[Mongoose ODM]
   │
   ▼
[MongoDB Atlas / Replica Set]`}
        </pre>
        <Code lang="javascript">{`// server.js — minimal production-shaped MERN backend
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

await mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.ORIGIN }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/v1/users", (await import("./routes/users.js")).default);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(process.env.PORT || 4000, () => console.log("MERN API up"));`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Full-stack request lifecycle — React → Express router → controller → service → Mongoose → MongoDB." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>SaaS platforms</b> — auth, billing, tenants — React + Express + MongoDB Atlas.</li>
          <li><b>E-commerce</b> — catalog, cart, checkout, orders — MERN with Stripe and Redis cache.</li>
          <li><b>LMS / EdTech</b> — course APIs, progress tracking, quizzes — modular routers per domain.</li>
          <li><b>Chat & notifications</b> — Socket.IO alongside Express, Redis pub/sub, React realtime UI.</li>
          <li><b>Enterprise dashboards</b> — RBAC, analytics, reporting — React + Redux Toolkit + Express + MongoDB aggregation.</li>
          <li><b>AI SaaS</b> — Express fronts LLM providers, streams tokens to React over SSE, and persists chat history in MongoDB.</li>
        </ul>
        <Code lang="tsx">{`// React — fetch users with TanStack Query
import { useQuery } from "@tanstack/react-query";

export function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/v1/users", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load users");
      return res.json();
    },
  });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;
  return (
    <ul>
      {data.map((u: { id: string; email: string }) => (
        <li key={u.id}>{u.email}</li>
      ))}
    </ul>
  );
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Structure by feature (routes / controllers / services / repositories) — not by file type.</li>
          <li>Always <code>await</code> async work and centralize errors with <code>express-async-errors</code> or wrappers.</li>
          <li>Validate every request with Zod / Joi and every Mongoose schema — treat clients as untrusted.</li>
          <li>Hash passwords with bcrypt / argon2; sign JWTs with strong secrets and rotate keys.</li>
          <li>Set <code>helmet</code>, strict <code>cors</code>, <code>express-rate-limit</code>, and secure cookies by default.</li>
          <li>Use environment variables (<code>dotenv</code>) — never commit secrets.</li>
          <li>On the frontend, colocate state with the feature and prefer server state via TanStack Query.</li>
          <li>Run behind PM2 or Docker with a reverse proxy (Nginx / Caddy) terminating TLS.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Placing middleware in the wrong order — auth after body parser, error handler before routes.</li>
          <li>Forgetting to <code>next(err)</code> in async handlers — silent 500s and hanging requests.</li>
          <li>Storing derivable UI state in Redux — leading to stale, over-normalized global state.</li>
          <li>Leaking stack traces or database errors to clients in production.</li>
          <li>Trusting <code>req.body</code> without validation — mass-assignment and NoSQL injection bugs.</li>
          <li>Skipping rate limiting on login, signup, and password reset endpoints.</li>
          <li>Ignoring MongoDB indexes — slow queries as data grows.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>express.Router()</code> per feature and mount under versioned prefixes (<code>/api/v1</code>).</li>
          <li>Return a consistent JSON envelope: <code>{'}} data, error, meta {{'}</code>.</li>
          <li>Cache read-heavy endpoints in Redis with tag-based invalidation.</li>
          <li>Type routes end-to-end with TypeScript + Zod-inferred request shapes shared with the React client.</li>
          <li>Enable Mongoose <code>lean()</code> for read-only queries — faster and lighter.</li>
          <li>Split the React bundle with lazy routes and preloading for critical navigation.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Layer</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4">MongoDB</td><td>Document database</td><td>Flexible schemas, nested data, rapid iteration.</td></tr>
              <tr><td className="py-2 pr-4">Mongoose</td><td>ODM</td><td>Schemas, validation, middleware over MongoDB.</td></tr>
              <tr><td className="py-2 pr-4">Express</td><td>HTTP framework</td><td>Routing, middleware, REST APIs.</td></tr>
              <tr><td className="py-2 pr-4">React</td><td>UI library</td><td>Component-based SPAs and dashboards.</td></tr>
              <tr><td className="py-2 pr-4">Node.js</td><td>JavaScript runtime</td><td>I/O-heavy backend services and tooling.</td></tr>
              <tr><td className="py-2 pr-4">Redux Toolkit</td><td>Client state</td><td>Complex, cross-cutting client state.</td></tr>
              <tr><td className="py-2 pr-4">TanStack Query</td><td>Server state</td><td>Caching, revalidation, pagination.</td></tr>
              <tr><td className="py-2 pr-4">Socket.IO</td><td>Realtime</td><td>Chat, notifications, live dashboards.</td></tr>
              <tr><td className="py-2 pr-4">Docker / PM2</td><td>Process / container mgmt</td><td>Production deployment and clustering.</td></tr>
              <tr><td className="py-2 pr-4">MongoDB Atlas</td><td>Managed DB</td><td>Production MongoDB with backups & replicas.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & Deployment">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — Helmet, strict CORS, CSRF for cookie flows, rate limiting, input validation, sanitized Mongo queries.</li>
          <li><b>Performance</b> — enable compression, cache with Redis, cluster mode, MongoDB indexes, React code splitting.</li>
          <li><b>Observability</b> — Winston / Pino logs, request IDs, Morgan access logs, OpenTelemetry traces, health probes.</li>
          <li><b>Deployment</b> — Docker + PM2 behind Nginx; frontend on Vercel / Netlify; API on Railway / Render / AWS / GCP / Azure.</li>
          <li><b>CI/CD</b> — GitHub Actions runs tests, lint, and pushes container images; blue/green or rolling deploys.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>MERN gives you one language (JavaScript / TypeScript) across DB, API, and UI.</li>
          <li>Design around routers, middleware, and controllers on the backend; hooks and features on the frontend.</li>
          <li>Secure every endpoint with validation, auth, rate limiting, and secure headers by default.</li>
          <li>Cache with Redis, index MongoDB thoughtfully, and monitor with structured logs and traces.</li>
          <li>Deploy React on the edge and the API on Docker / managed hosts; scale to microservices with queues and gateways.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is the MERN Stack still relevant in 2026?">Yes — it remains one of the most widely deployed full-stack combinations and pairs naturally with modern tooling like TypeScript, Vite, and TanStack Query.</FAQItem>
        <FAQItem q="MERN vs Next.js / T3 / MEAN?">MERN keeps a clear split between React SPA and Express API; Next.js merges them; MEAN swaps React for Angular. Pick based on team skills and app shape.</FAQItem>
        <FAQItem q="Should I use TypeScript with MERN?">Yes for anything non-trivial — pair with Zod for typed, validated requests shared between client and server.</FAQItem>
        <FAQItem q="How do I handle async errors in Express?">Use <code>express-async-errors</code> or wrap handlers so rejected promises reach your error middleware.</FAQItem>
        <FAQItem q="MongoDB or PostgreSQL for MERN?">MERN traditionally uses MongoDB, but nothing stops you from swapping in PostgreSQL via Prisma when relational integrity matters.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.mongodb.com/docs/" target="_blank" rel="noreferrer">MongoDB Docs</a> · <a className="text-primary hover:underline" href="https://mongoosejs.com/docs/" target="_blank" rel="noreferrer">Mongoose</a></li>
          <li><a className="text-primary hover:underline" href="https://expressjs.com/" target="_blank" rel="noreferrer">Express.js</a> · <a className="text-primary hover:underline" href="https://nodejs.org/docs/latest/api/" target="_blank" rel="noreferrer">Node.js</a></li>
          <li><a className="text-primary hover:underline" href="https://react.dev/" target="_blank" rel="noreferrer">React</a> · <a className="text-primary hover:underline" href="https://reactrouter.com/" target="_blank" rel="noreferrer">React Router</a> · <a className="text-primary hover:underline" href="https://redux-toolkit.js.org/" target="_blank" rel="noreferrer">Redux Toolkit</a></li>
          <li><a className="text-primary hover:underline" href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">Tailwind CSS</a> · <a className="text-primary hover:underline" href="https://docs.docker.com/" target="_blank" rel="noreferrer">Docker</a> · <a className="text-primary hover:underline" href="https://kubernetes.io/docs/" target="_blank" rel="noreferrer">Kubernetes</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. The MERN Stack and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
