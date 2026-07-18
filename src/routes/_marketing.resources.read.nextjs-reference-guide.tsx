import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "nextjs-reference-guide",
  title: "Next.js — Reference Guide",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "46 min",
  pages: 56,
  lastUpdated: "June 2026",
  tags: ["Next.js", "SSR"],
  heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1800&q=80",
  heroSubtitle: 'A complete reference for Next.js — file conventions, APIs, caching, and configuration.',
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
  { id: "considerations", label: "Security, Performance & SEO" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Next.js — Beginner Guide", tag: "Next.js", time: "16 min" },
  { title: "Next.js — Cheat Sheet", tag: "Next.js", time: "4 min" },
  { title: "Next.js — Interview Questions", tag: "Next.js", time: "28 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/nextjs-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/nextjs-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Reference Guide</b> — practical, production-ready Next.js.</li>
          <li>Build with the App Router — layouts, nested routes, route groups, and parallel routes.</li>
          <li>Choose the right rendering strategy — Server Components, SSR, SSG, ISR, and Partial Prerendering.</li>
          <li>Fetch and cache data safely with <code>fetch()</code>, React <code>cache</code>, and revalidation.</li>
          <li>Ship mutations and forms with Server Actions and progressive enhancement.</li>
          <li>Deploy Next.js to Vercel, Docker, or Node.js hosts with confidence.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with modern JavaScript / TypeScript and React (components, hooks, props).</li>
          <li>Node.js 20+ and a package manager (npm, pnpm, or Bun) installed locally.</li>
          <li>Basic HTTP, HTML, and CSS knowledge; familiarity with the terminal.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Next.js and the App Router</li>
          <li>Installation, <code>create-next-app</code>, Turbopack, and TypeScript</li>
          <li>App directory, layouts, nested layouts, and route groups</li>
          <li>Parallel routes, intercepting routes, dynamic and catch-all routes</li>
          <li>Server Components vs Client Components</li>
          <li>Rendering — SSR, SSG, ISR, Partial Prerendering, and streaming</li>
          <li>Data fetching — <code>fetch()</code>, async Server Components, React <code>cache</code></li>
          <li>Revalidation, cache tags, and route segment config</li>
          <li>Server Actions — forms, mutations, validation, and optimistic UI</li>
          <li>Routing — <code>Link</code>, <code>useRouter</code>, redirects, and middleware</li>
          <li>Route Handlers — REST APIs, JSON, cookies, and file uploads</li>
          <li>Authentication — NextAuth / Auth.js, JWT, sessions, OAuth, protected routes</li>
          <li>Database integration — Prisma, Drizzle, PostgreSQL, MySQL, MongoDB, Supabase</li>
          <li>Styling — CSS Modules, Tailwind CSS, Styled Components, Sass, CSS variables</li>
          <li>Performance — image and font optimization, code splitting, Metadata API</li>
          <li>SEO — metadata, Open Graph, sitemap, robots, structured data, canonical URLs</li>
          <li>State management — Context, Zustand, Redux Toolkit, TanStack Query, SWR</li>
          <li>Deployment — Vercel, Docker, Node.js hosts, edge runtime, serverless functions</li>
          <li>Testing — Jest, React Testing Library, Playwright, Cypress</li>
          <li>Security — CSP, CSRF, XSS, secure headers, authorization</li>
          <li>Enterprise — clean architecture, feature-based folders, monorepo, API layer</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Next.js is the full-stack React framework built on the App Router, React Server Components, and a first-class edge / serverless runtime. It gives you routing, rendering strategies, data fetching, caching, and mutations in one integrated stack. This resource — <b>Next.js — Reference Guide</b> — is self-contained: A complete reference for Next.js — file conventions, APIs, caching, and configuration.</p>
        <Callout tone="info" title="Next.js in one line">Next.js = React + App Router + Server Components + caching + deployment — full-stack, ready to ship.</Callout>
        <Figure src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1400&q=80" caption="Figure 1 — Next.js App Router architecture — layouts, Server Components, and streaming compose full-stack pages." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — what is Next.js, React foundation, architecture, <code>create-next-app</code>, Turbopack, TypeScript.</li>
          <li><b>App Router</b> — <code>app/</code> directory, layouts, nested layouts, route groups, parallel and intercepting routes, dynamic and catch-all segments.</li>
          <li><b>Rendering</b> — Server Components, Client Components, SSR, SSG, ISR, Partial Prerendering, and streaming.</li>
          <li><b>Data fetching</b> — <code>fetch()</code>, async Server Components, React <code>cache</code>, revalidation, cache tags, route segment config.</li>
          <li><b>Server Actions</b> — forms, mutations, validation, optimistic UI, progressive enhancement.</li>
          <li><b>Routing</b> — <code>Link</code>, <code>useRouter</code>, redirects, middleware, and route handlers.</li>
          <li><b>API development</b> — REST APIs with route handlers, JSON responses, auth APIs, file uploads, cookies.</li>
          <li><b>Authentication</b> — NextAuth / Auth.js, JWT, sessions, OAuth, protected routes, middleware auth.</li>
          <li><b>Database integration</b> — Prisma, Drizzle, PostgreSQL, MySQL, MongoDB, Supabase.</li>
          <li><b>Styling</b> — CSS Modules, Tailwind CSS, Styled Components, Sass, CSS variables.</li>
          <li><b>Performance</b> — image and font optimization, lazy loading, code splitting, bundle analysis, Metadata API.</li>
          <li><b>SEO</b> — metadata, Open Graph, sitemap, robots, structured data, canonical URLs.</li>
          <li><b>State management</b> — React Context, Zustand, Redux Toolkit, TanStack Query, SWR.</li>
          <li><b>Deployment</b> — Vercel, Docker, Node.js, edge runtime, serverless functions.</li>
          <li><b>Testing</b> — Jest, React Testing Library, Playwright, Cypress, E2E.</li>
          <li><b>Security</b> — CSP, CSRF protection, XSS prevention, secure headers, authorization.</li>
          <li><b>Enterprise</b> — clean architecture, feature-based folders, monorepo, API layer, scalable structure.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Request
   │
   ▼
[Middleware]  ── auth / redirects / rewrites
   │
   ▼
[App Router]  ── layout.tsx → page.tsx (Server Component)
   │                │
   │                ├── fetch()  → React cache → revalidate / tags
   │                └── <ClientComponent /> (hydrates in browser)
   ▼
[Streaming HTML] → progressive render → Client hydration
   │
   ▼
Server Actions  ── mutations / forms / revalidatePath / revalidateTag`}
        </pre>
        <Code>{`// app/posts/[slug]/page.tsx — async Server Component with caching
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR — regenerate every 60s

async function getPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`, {
    next: { tags: [\`post:\${slug}\`] },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return (
    <article className="prose mx-auto py-10">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1400&q=80" caption="Figure 2 — Full-stack Next.js application architecture — Server Components, Server Actions, and edge deployment." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Marketing & docs</b> — Vercel, Linear, Notion, and thousands of SaaS sites ship on Next.js.</li>
          <li><b>Commerce</b> — Shopify Hydrogen-alt stacks and headless storefronts use ISR + streaming for fast PDPs.</li>
          <li><b>Dashboards</b> — internal tools combine Server Components with Server Actions for auth-protected mutations.</li>
          <li><b>AI apps</b> — streaming chat UIs (OpenAI, Anthropic) rely on RSC + <code>Suspense</code> + streaming responses.</li>
          <li><b>Auth</b> — Auth.js / NextAuth secures routes with middleware and session cookies.</li>
          <li><b>Multi-tenant SaaS</b> — dynamic routes + middleware rewrites power per-tenant subdomains.</li>
        </ul>
        <Code>{`// app/actions/create-post.ts — Server Action with validation
"use server";
import { z } from "zod";
import { revalidateTag } from "next/cache";

const Schema = z.object({ title: z.string().min(3), body: z.string().min(10) });

export async function createPost(formData: FormData) {
  const parsed = Schema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
  });
  if (!parsed.success) return { ok: false, errors: parsed.error.flatten() };

  await db.post.create({ data: parsed.data });
  revalidateTag("posts");
  return { ok: true };
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Default to Server Components; add <code>"use client"</code> only where interactivity or browser APIs are required.</li>
          <li>Keep client bundles small — push data fetching and heavy logic to the server.</li>
          <li>Use <code>fetch</code> with <code>next: &#123; tags &#125;</code> and <code>revalidateTag</code> for surgical cache invalidation.</li>
          <li>Validate every Server Action input with Zod; treat the client as untrusted.</li>
          <li>Use the Metadata API for per-route SEO — <code>generateMetadata</code> for dynamic pages.</li>
          <li>Optimize images with <code>next/image</code> and fonts with <code>next/font</code>.</li>
          <li>Stream long-loading UI with <code>loading.tsx</code> and <code>&lt;Suspense&gt;</code> boundaries.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Marking whole pages <code>"use client"</code> — loses RSC benefits and inflates bundles.</li>
          <li>Reading <code>process.env</code> on the client for server secrets — use server-only modules and never prefix secrets with <code>NEXT_PUBLIC_</code>.</li>
          <li>Forgetting <code>revalidatePath</code> / <code>revalidateTag</code> after mutations — stale data ships to users.</li>
          <li>Fetching in <code>useEffect</code> for initial render — prefer async Server Components.</li>
          <li>Using <code>next/link</code> with <code>a</code> for external URLs — plain <code>&lt;a&gt;</code> is correct for external targets.</li>
          <li>Ignoring middleware size / edge-runtime limits — keep it lean.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use route groups <code>(marketing)</code> / <code>(app)</code> to split layouts without affecting URLs.</li>
          <li>Parallel routes <code>@modal</code> unlock intercepted modals with real URLs.</li>
          <li>Use <code>generateStaticParams</code> for hybrid SSG + dynamic routes.</li>
          <li><code>server-only</code> and <code>client-only</code> packages guard boundaries at import time.</li>
          <li>Ship streaming with <code>&lt;Suspense fallback=&#123;...&#125;&gt;</code> around slow data.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Feature / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Server Components</td><td>Server-rendered React</td><td>Default — data fetching, secrets, small bundles.</td></tr>
              <tr><td className="py-2 pr-4">Client Components</td><td>Interactive UI</td><td>Forms, state, browser APIs, event handlers.</td></tr>
              <tr><td className="py-2 pr-4">SSG</td><td>Build-time HTML</td><td>Marketing, docs, blog — max cacheability.</td></tr>
              <tr><td className="py-2 pr-4">SSR</td><td>Per-request HTML</td><td>Personalized, auth-protected pages.</td></tr>
              <tr><td className="py-2 pr-4">ISR</td><td>Revalidated static</td><td>Semi-dynamic content with fast reads.</td></tr>
              <tr><td className="py-2 pr-4">Partial Prerendering</td><td>Hybrid static + dynamic</td><td>Fast shell + dynamic holes with streaming.</td></tr>
              <tr><td className="py-2 pr-4">Server Actions</td><td>Mutations</td><td>Forms and writes without hand-rolling APIs.</td></tr>
              <tr><td className="py-2 pr-4">Route Handlers</td><td>HTTP endpoints</td><td>Webhooks, REST APIs, third-party callers.</td></tr>
              <tr><td className="py-2 pr-4">Middleware</td><td>Edge logic</td><td>Auth gating, rewrites, A/B, i18n.</td></tr>
              <tr><td className="py-2 pr-4">Auth.js / NextAuth</td><td>Authentication</td><td>OAuth, credentials, sessions, JWT.</td></tr>
              <tr><td className="py-2 pr-4">Prisma / Drizzle</td><td>ORM</td><td>Typed database access from Server Components.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & SEO">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — validate Server Action inputs, enforce CSRF via same-origin, set CSP + secure headers, avoid <code>dangerouslySetInnerHTML</code>.</li>
          <li><b>Performance</b> — stream with Suspense, cache aggressively with tags, use <code>next/image</code> and <code>next/font</code>.</li>
          <li><b>SEO</b> — per-route <code>generateMetadata</code>, structured data via JSON-LD, canonical URLs, sitemap and robots.</li>
          <li><b>Deployment</b> — Vercel is first-class; Docker + Node works everywhere; edge runtime for latency-sensitive middleware.</li>
          <li><b>Testing</b> — Jest + RTL for units, Playwright for E2E, Storybook for component states.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Next.js unifies routing, rendering, data, and deployment on top of React Server Components.</li>
          <li>Default to Server Components; add Client Components only where interactivity is required.</li>
          <li>Pick rendering per route — SSG, SSR, ISR, or Partial Prerendering — and stream slow segments.</li>
          <li>Server Actions replace boilerplate APIs for forms and mutations with progressive enhancement.</li>
          <li>Cache with <code>fetch</code> + tags and invalidate surgically after writes.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="App Router or Pages Router?">Use the App Router for new projects — RSC, streaming, and Server Actions are only there.</FAQItem>
        <FAQItem q="When should I use a Client Component?">When you need state, effects, event handlers, or browser-only APIs.</FAQItem>
        <FAQItem q="How do I invalidate cache after a mutation?">Call <code>revalidatePath</code> or <code>revalidateTag</code> from a Server Action or Route Handler.</FAQItem>
        <FAQItem q="Do I still need an API layer?">Server Actions cover most in-app writes; Route Handlers are for external / webhook callers.</FAQItem>
        <FAQItem q="Where should I deploy?">Vercel is the reference host; Docker and Node.js work with a standard <code>next start</code>.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">Next.js Docs</a> · <a className="text-primary hover:underline" href="https://nextjs.org/learn" target="_blank" rel="noreferrer">Next.js Learn</a> · <a className="text-primary hover:underline" href="https://nextjs.org/docs/app" target="_blank" rel="noreferrer">App Router</a></li>
          <li><a className="text-primary hover:underline" href="https://react.dev/reference/rsc/server-components" target="_blank" rel="noreferrer">React Server Components</a> · <a className="text-primary hover:underline" href="https://react.dev/" target="_blank" rel="noreferrer">React Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://vercel.com/docs" target="_blank" rel="noreferrer">Vercel Docs</a> · <a className="text-primary hover:underline" href="https://authjs.dev/" target="_blank" rel="noreferrer">Auth.js</a> · <a className="text-primary hover:underline" href="https://www.prisma.io/docs" target="_blank" rel="noreferrer">Prisma</a> · <a className="text-primary hover:underline" href="https://orm.drizzle.team/" target="_blank" rel="noreferrer">Drizzle</a></li>
          <li><a className="text-primary hover:underline" href="https://developer.mozilla.org/en-US/docs/Web" target="_blank" rel="noreferrer">MDN Web Docs</a> · <a className="text-primary hover:underline" href="https://nodejs.org/docs/latest/api/" target="_blank" rel="noreferrer">Node.js</a> · <a className="text-primary hover:underline" href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer">Tailwind CSS</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Next.js and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
