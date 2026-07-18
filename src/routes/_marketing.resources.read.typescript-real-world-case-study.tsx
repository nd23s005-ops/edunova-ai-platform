import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "typescript-real-world-case-study",
  title: "TypeScript — Real-world Case Study",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "15 min",
  pages: 27,
  lastUpdated: "October 2026",
  tags: ["TS", "Types"],
  heroImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1800&q=80",
  heroSubtitle: 'How real teams adopt TypeScript at scale — migration, tooling, and lessons learned.',
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
  { id: "considerations", label: "Performance, Security & Testing" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "TypeScript — Beginner Guide", tag: "TS", time: "12 min" },
  { title: "TypeScript — Cheat Sheet", tag: "TS", time: "6 min" },
  { title: "TypeScript — Interview Questions", tag: "TS", time: "32 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/typescript-real-world-case-study")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/typescript-real-world-case-study" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Real-world Case Study</b> — practical, production-ready TypeScript.</li>
          <li>Read and write typed JavaScript using strict mode, generics, and utility types.</li>
          <li>Design robust APIs and domain models with interfaces, unions, and narrowing.</li>
          <li>Configure <code>tsconfig.json</code>, module resolution, and modern build tooling.</li>
          <li>Integrate TypeScript with React, Next.js, Node.js, Express, NestJS, and testing tools.</li>
          <li>Ship maintainable enterprise TypeScript — monorepos, SDKs, and shared libraries.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Working knowledge of modern JavaScript (ES2020+): let/const, arrow functions, modules, async/await.</li>
          <li>Node.js 20+ and a package manager (npm, pnpm, or Bun) installed locally.</li>
          <li>An editor with TypeScript support (VS Code recommended) and a terminal.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to TypeScript & Setup</li>
          <li>Language Fundamentals — variables, primitives, objects, arrays, tuples, enums</li>
          <li>Functions — parameters, overloads, arrow functions, and generics</li>
          <li>Object-Oriented TypeScript — classes, interfaces, access modifiers, abstract classes</li>
          <li>Advanced Types — unions, intersections, literals, guards, discriminated unions</li>
          <li>Generics & Utility Types — Partial, Pick, Omit, Record, ReturnType</li>
          <li>Modules, Namespaces & Declaration Files</li>
          <li>Async Programming — Promises, async/await, fetch, and error handling</li>
          <li>Framework Integration — React, Next.js, Angular, Vue, Node, Express, NestJS</li>
          <li>Tooling — npm, pnpm, Bun, Vite, Webpack, ESLint, Prettier</li>
          <li>Testing — Jest, Vitest, Playwright, Cypress, and type-safe tests</li>
          <li>Performance — compiler and bundle optimization, tree shaking</li>
          <li>Security — input validation, typed APIs, authN/authZ patterns</li>
          <li>Design Patterns & SOLID — Repository, Factory, Singleton, DI</li>
          <li>Enterprise Development — monorepos, clean architecture, SDKs</li>
          <li>Career Paths — frontend, backend, full stack, and interview prep</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>TypeScript is a strongly-typed superset of JavaScript that compiles to plain JS and runs everywhere JavaScript runs — browsers, Node.js, Deno, Bun, and edge runtimes. This resource — <b>TypeScript — Real-world Case Study</b> — is self-contained: How real teams adopt TypeScript at scale — migration, tooling, and lessons learned.</p>
        <Callout tone="info" title="TypeScript in one line">TypeScript = JavaScript + a rich static type system that catches bugs at edit-time and documents intent.</Callout>
        <Figure src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80" caption="Figure 1 — TypeScript compiler pipeline — source (.ts) is parsed, type-checked, and emitted as clean JavaScript." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history, why TypeScript, JavaScript vs TypeScript, installing, <code>tsc</code>, <code>tsconfig.json</code>, build process, project setup.</li>
          <li><b>Language fundamentals</b> — variables, constants, primitives, objects, arrays, tuples, enums, literals, <code>any</code>, <code>unknown</code>, <code>never</code>, <code>void</code>.</li>
          <li><b>Functions</b> — function types, optional/default/rest parameters, overloads, arrow functions.</li>
          <li><b>OOP</b> — classes, constructors, access modifiers (<code>public</code> / <code>private</code> / <code>protected</code>), interfaces, abstract classes, inheritance, polymorphism.</li>
          <li><b>Advanced types</b> — union & intersection types, type aliases, literal types, type guards, narrowing, assertions, discriminated unions.</li>
          <li><b>Generics</b> — generic functions, classes, interfaces, constraints, and generic utility helpers.</li>
          <li><b>Utility types</b> — <code>Partial</code>, <code>Required</code>, <code>Readonly</code>, <code>Pick</code>, <code>Omit</code>, <code>Record</code>, <code>Exclude</code>, <code>Extract</code>, <code>ReturnType</code>, <code>Parameters</code>.</li>
          <li><b>Modules</b> — ES modules, namespaces, imports/exports, and declaration files (<code>.d.ts</code>).</li>
          <li><b>Async</b> — Promises, async/await, Fetch API, and structured error handling.</li>
          <li><b>Framework integration</b> — React + TSX, Next.js, Angular, Vue, Node, Express, NestJS.</li>
          <li><b>Tooling</b> — npm, pnpm, Bun, Vite, Webpack, ESLint, Prettier.</li>
          <li><b>Testing</b> — Jest, Vitest, Playwright, Cypress, type-safe test doubles.</li>
          <li><b>Performance</b> — compiler options, incremental builds, tree shaking, bundle analysis.</li>
          <li><b>Security</b> — input validation with Zod, typed APIs, authentication and authorization models.</li>
          <li><b>Patterns</b> — Repository, Factory, Singleton, Dependency Injection, and SOLID.</li>
          <li><b>Enterprise</b> — monorepos, clean architecture, SDKs, and shared libraries.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Source (.ts / .tsx)
   │
   ▼
[Parser] ── AST ──▶ [Type Checker] ──▶ [Emitter] ── .js + .d.ts
                          │
                          ▼
                Diagnostics (editor & CI)
                          │
                          ▼
                 Bundler (Vite / Webpack)
                          │
                          ▼
                Browser / Node / Edge runtime`}
        </pre>
        <Code>{`// Idiomatic TypeScript — strict types, generics, and narrowing
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function fetchJson<T>(url: string): Promise<Result<T>> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const value = (await res.json()) as T;
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

interface User { id: string; name: string; email: string }

const result = await fetchJson<User[]>("/api/users");
if (result.ok) {
  // result.value is User[] here (narrowed)
  console.log(result.value.map((u) => u.email));
} else {
  console.error(result.error.message);
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80" caption="Figure 2 — TypeScript ecosystem — a single typed language spans frontend, backend, mobile, and tooling." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Web apps</b> — React, Next.js, and Angular use TypeScript by default at Vercel, Airbnb, and Slack.</li>
          <li><b>Backends</b> — Node.js + Express, NestJS, and tRPC power typed APIs at Microsoft and Stripe.</li>
          <li><b>Design systems</b> — component libraries ship strong prop types and generics for consumers.</li>
          <li><b>SDKs</b> — public SDKs (Stripe, Supabase, AWS) ship first-class TypeScript definitions.</li>
          <li><b>Monorepos</b> — Turborepo / Nx repos share types across web, mobile, and services.</li>
          <li><b>Testing</b> — Vitest + Playwright give typed unit and end-to-end coverage.</li>
        </ul>
        <Code>{`// Generic Repository pattern with discriminated union results
export interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  list(query?: Partial<T>): Promise<T[]>;
  create(input: Omit<T, "id">): Promise<T>;
  update(id: ID, patch: Partial<T>): Promise<T>;
  delete(id: ID): Promise<void>;
}

export class InMemoryRepo<T extends { id: string }> implements Repository<T> {
  private store = new Map<string, T>();
  async findById(id: string) { return this.store.get(id) ?? null; }
  async list() { return [...this.store.values()]; }
  async create(input: Omit<T, "id">) {
    const id = crypto.randomUUID();
    const entity = { ...(input as T), id };
    this.store.set(id, entity);
    return entity;
  }
  async update(id: string, patch: Partial<T>) {
    const cur = this.store.get(id);
    if (!cur) throw new Error("not found");
    const next = { ...cur, ...patch };
    this.store.set(id, next);
    return next;
  }
  async delete(id: string) { this.store.delete(id); }
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Turn on <b>strict mode</b> (<code>&quot;strict&quot;: true</code>) and enable <code>noUncheckedIndexedAccess</code>.</li>
          <li>Prefer <code>type</code> and <code>interface</code> to <code>any</code>; use <code>unknown</code> at trust boundaries.</li>
          <li>Model domain state with <b>discriminated unions</b> and narrow with <code>switch</code>.</li>
          <li>Validate external input at the edge with <b>Zod</b> or <b>Valibot</b>; derive types from schemas.</li>
          <li>Use generics for reuse — but keep signatures readable; constrain with <code>extends</code>.</li>
          <li>Adopt <b>ESLint</b> + <b>Prettier</b> + <b>typescript-eslint</b> for consistent style and safety.</li>
          <li>Split types into <code>*.types.ts</code> and share via a package in monorepos.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Sprinkling <code>any</code> to silence the compiler — prefer <code>unknown</code> and narrow explicitly.</li>
          <li>Using <code>as</code> assertions instead of runtime validation for untrusted input.</li>
          <li>Overusing enums — union of string literals is usually simpler and tree-shakes better.</li>
          <li>Not enabling <code>strict</code> — you lose most of TypeScript&apos;s value.</li>
          <li>Circular type imports and deep generic gymnastics that hurt DX and IDE performance.</li>
          <li>Ignoring <code>tsconfig</code> <code>paths</code> / <code>baseUrl</code> and building fragile relative imports.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>satisfies</code> to validate a value against a type without widening it.</li>
          <li>Derive types from data with <code>typeof</code> and <code>keyof</code>; avoid duplication.</li>
          <li>Template literal types unlock strongly-typed route and event names.</li>
          <li>Use <code>as const</code> for immutable literal tuples and objects.</li>
          <li>Debug type errors with <code>// @ts-expect-error</code> and hover in your editor.</li>
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
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">tsc</td><td>Official compiler</td><td>Type-checking, emitting .js and .d.ts, CI.</td></tr>
              <tr><td className="py-2 pr-4">Vite</td><td>Dev / build tool</td><td>Fast frontend dev with esbuild + Rollup.</td></tr>
              <tr><td className="py-2 pr-4">Webpack</td><td>Bundler</td><td>Complex configs and legacy pipelines.</td></tr>
              <tr><td className="py-2 pr-4">Bun</td><td>Runtime + toolkit</td><td>Fast package manager, test runner, and TS runtime.</td></tr>
              <tr><td className="py-2 pr-4">Zod</td><td>Schema validation</td><td>Runtime validation with inferred TS types.</td></tr>
              <tr><td className="py-2 pr-4">tRPC</td><td>Typed RPC</td><td>End-to-end typed APIs in a monorepo.</td></tr>
              <tr><td className="py-2 pr-4">NestJS</td><td>Backend framework</td><td>Enterprise TS backends with DI and modules.</td></tr>
              <tr><td className="py-2 pr-4">Vitest</td><td>Unit tests</td><td>Fast Vite-native testing with TS.</td></tr>
              <tr><td className="py-2 pr-4">Playwright</td><td>E2E tests</td><td>Typed browser automation across engines.</td></tr>
              <tr><td className="py-2 pr-4">ESLint</td><td>Linting</td><td>Enforce style and catch bugs at edit-time.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Testing">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — enable <code>incremental</code>, <code>skipLibCheck</code>, and project references for large repos.</li>
          <li><b>Bundle</b> — enable tree shaking, code splitting, and analyze with <code>rollup-plugin-visualizer</code>.</li>
          <li><b>Security</b> — validate all input at trust boundaries; never trust <code>any</code> from the network.</li>
          <li><b>Testing</b> — cover units with Vitest/Jest, integration with supertest, and E2E with Playwright.</li>
          <li><b>CI</b> — run <code>tsc --noEmit</code>, lint, and tests on every PR; fail on new type errors.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>TypeScript adds a rich, structural type system to JavaScript with zero runtime cost.</li>
          <li>Strict mode + narrowing + generics catch entire classes of bugs before you ship.</li>
          <li>Utility types and discriminated unions let you model real domains precisely.</li>
          <li>The ecosystem — Vite, Vitest, ESLint, Zod, tRPC, NestJS — is TS-first end-to-end.</li>
          <li>For enterprise scale, invest in monorepos, shared types, and clean architecture.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need to know JavaScript first?">Yes — TypeScript is a superset. Comfortable JavaScript (functions, closures, promises, modules) is the prerequisite.</FAQItem>
        <FAQItem q="Should I use interface or type?">Both work. Use <code>interface</code> for object shapes you might extend, and <code>type</code> for unions, tuples, and mapped types.</FAQItem>
        <FAQItem q="Is any ever OK?">Sparingly, at true integration boundaries. Prefer <code>unknown</code> plus explicit narrowing or a Zod schema.</FAQItem>
        <FAQItem q="Does TypeScript slow runtime code?">No — types are erased at build time. Runtime performance matches equivalent JavaScript.</FAQItem>
        <FAQItem q="How do I migrate a JS project?">Rename files to <code>.ts</code> incrementally, allow <code>allowJs</code>, start with <code>strict: false</code>, and tighten over time.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.typescriptlang.org/docs/" target="_blank" rel="noreferrer">TypeScript Docs</a> · <a className="text-primary hover:underline" href="https://www.typescriptlang.org/docs/handbook/intro.html" target="_blank" rel="noreferrer">Handbook</a> · <a className="text-primary hover:underline" href="https://www.typescriptlang.org/play" target="_blank" rel="noreferrer">Playground</a></li>
          <li><a className="text-primary hover:underline" href="https://www.typescriptlang.org/tsconfig" target="_blank" rel="noreferrer">TSConfig Reference</a> · <a className="text-primary hover:underline" href="https://tc39.es/ecma262/" target="_blank" rel="noreferrer">ECMAScript Spec</a> · <a className="text-primary hover:underline" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">MDN JavaScript</a></li>
          <li><a className="text-primary hover:underline" href="https://react-typescript-cheatsheet.netlify.app/" target="_blank" rel="noreferrer">React + TS Cheatsheets</a> · <a className="text-primary hover:underline" href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">Vite</a> · <a className="text-primary hover:underline" href="https://eslint.org/docs/latest/" target="_blank" rel="noreferrer">ESLint</a></li>
          <li><a className="text-primary hover:underline" href="https://nodejs.org/en/docs" target="_blank" rel="noreferrer">Node.js</a> · <a className="text-primary hover:underline" href="https://nestjs.com/" target="_blank" rel="noreferrer">NestJS</a> · <a className="text-primary hover:underline" href="https://zod.dev/" target="_blank" rel="noreferrer">Zod</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. TypeScript, its compiler, and third-party libraries evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
