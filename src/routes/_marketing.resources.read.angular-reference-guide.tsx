import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "angular-reference-guide",
  title: "Angular — Reference Guide",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "44 min",
  pages: 89,
  lastUpdated: "June 2026",
  tags: ["Angular", "RxJS"],
  heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1800&q=80",
  heroSubtitle: 'A complete reference for Angular — CLI, APIs, decorators, RxJS operators, and configuration.',
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
  { title: "Angular — Beginner Guide", tag: "Angular", time: "17 min" },
  { title: "Angular — Cheat Sheet", tag: "Angular", time: "6 min" },
  { title: "Angular — Interview Questions", tag: "Angular", time: "31 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/angular-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/angular-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Reference Guide</b> — practical, production-ready Angular.</li>
          <li>Build with standalone components, the Angular CLI, and modern workspace configuration.</li>
          <li>Use dependency injection, providers, and hierarchical injectors effectively.</li>
          <li>Compose reactive UI with RxJS observables, subjects, and pipeable operators.</li>
          <li>Adopt Angular signals — writable, computed, and effects — for fine-grained reactivity.</li>
          <li>Ship enterprise SPAs with routing, reactive forms, HTTP, and SSR.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with modern JavaScript / TypeScript (classes, generics, decorators).</li>
          <li>Node.js 20+ and Angular CLI installed (<code>npm i -g @angular/cli</code>).</li>
          <li>Basic HTML, CSS, and HTTP knowledge; familiarity with the terminal.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Angular and its architecture</li>
          <li>Angular CLI, workspace configuration, and project structure</li>
          <li>Standalone components, templates, and data binding</li>
          <li>Property, event, and two-way binding</li>
          <li>Lifecycle hooks and component communication</li>
          <li>Structural, attribute, and custom directives</li>
          <li>Built-in pipes, async pipe, and custom pipes</li>
          <li>Dependency Injection — providers, tokens, hierarchical injectors</li>
          <li>Angular Router — lazy loading, guards, resolvers, nested and dynamic routes</li>
          <li>Template-driven and Reactive Forms with custom validators</li>
          <li>RxJS — Observables, Subjects, BehaviorSubject, operators, error handling</li>
          <li>Angular Signals — writable, computed, effects, signal-based components</li>
          <li>State management — services, RxJS state, NgRx, NGXS, Akita, Signal Store</li>
          <li>HttpClient — REST APIs, interceptors, authentication, retry strategies</li>
          <li>Performance — OnPush, deferrable views, tree shaking, bundle optimization</li>
          <li>Server-side rendering — Angular SSR, Universal, hydration, SEO</li>
          <li>Testing — Jasmine, Karma, Jest, Cypress, unit / integration / E2E</li>
          <li>Security — auth, route protection, XSS, CSP, secure HTTP</li>
          <li>UI — Angular Material, CDK, Tailwind CSS, PrimeNG</li>
          <li>Enterprise — clean architecture, feature modules, DDD, micro frontends</li>
          <li>Career — Angular roadmap, portfolio projects, and interview preparation</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Angular is Google's opinionated, full-featured framework for building large-scale single-page applications. It ships with a powerful CLI, dependency injection, RxJS, standalone components, and — since v16+ — a fine-grained reactivity system based on signals. This resource — <b>Angular — Reference Guide</b> — is self-contained: A complete reference for Angular — CLI, APIs, decorators, RxJS operators, and configuration.</p>
        <Callout tone="info" title="Angular in one line">Angular = TypeScript + standalone components + DI + RxJS + signals — an enterprise SPA platform in a box.</Callout>
        <Figure src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1400&q=80" caption="Figure 1 — Angular architecture — standalone components, DI, RxJS, and signals compose enterprise SPAs." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — Angular overview, architecture, CLI, project structure, TypeScript, workspace configuration, standalone applications.</li>
          <li><b>Components</b> — standalone components, templates, property / event / two-way binding, lifecycle hooks, parent-child communication.</li>
          <li><b>Directives</b> — structural (<code>*ngIf</code>, <code>*ngFor</code>), attribute, custom directives, host bindings, host listeners.</li>
          <li><b>Pipes</b> — built-in pipes, async pipe, custom pipes, pipe chaining.</li>
          <li><b>Dependency Injection</b> — providers, injection tokens, singleton services, hierarchical injectors, <code>inject()</code>.</li>
          <li><b>Routing</b> — Angular Router, lazy loading, guards, resolvers, nested and dynamic routes.</li>
          <li><b>Forms</b> — template-driven, reactive forms, validation, custom validators, dynamic forms.</li>
          <li><b>RxJS</b> — Observables, Subject, BehaviorSubject, ReplaySubject, pipeable operators, error handling.</li>
          <li><b>Signals</b> — writable signals, computed signals, effects, signal-based components, interop with RxJS.</li>
          <li><b>State management</b> — services, RxJS state, NgRx, NGXS, Akita, Signal Store.</li>
          <li><b>HTTP</b> — HttpClient, REST APIs, interceptors, authentication, retry strategies, error handling.</li>
          <li><b>Performance</b> — OnPush change detection, lazy loading, deferrable views, tree shaking, bundle optimization.</li>
          <li><b>SSR</b> — Angular SSR, Angular Universal, hydration, SEO.</li>
          <li><b>Testing</b> — Jasmine, Karma, Jest, Cypress, unit / integration / E2E.</li>
          <li><b>Security</b> — authentication, authorization, route protection, XSS, CSP, secure HTTP.</li>
          <li><b>UI</b> — Angular Material, CDK, Tailwind CSS, Bootstrap, PrimeNG.</li>
          <li><b>Enterprise</b> — clean architecture, feature modules, DDD, scalable folder structure, micro frontends.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Browser
   │
   ▼
[Angular Router]  ── guards / resolvers / lazy chunks
   │
   ▼
[Standalone Component]  ── template + bindings
   │        │
   │        ├── inject(Service)  → HttpClient / Store
   │        └── Signals / RxJS   → reactive state
   ▼
[Change Detection]  ── OnPush + signals → fine-grained updates
   │
   ▼
[Rendered DOM]  ── async pipe / deferrable views / hydration (SSR)`}
        </pre>
        <Code>{`// posts.component.ts — standalone component with signals + HttpClient
import { Component, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { toSignal } from "@angular/core/rxjs-interop";

interface Post { id: number; title: string; }

@Component({
  selector: "app-posts",
  standalone: true,
  template: \`
    <input [value]="query()" (input)="query.set($any($event.target).value)" placeholder="Filter" />
    <ul>
      <li *ngFor="let p of filtered()">{{ p.title }}</li>
    </ul>
  \`,
})
export class PostsComponent {
  private http = inject(HttpClient);
  posts = toSignal(this.http.get<Post[]>("/api/posts"), { initialValue: [] as Post[] });
  query = signal("");
  filtered = computed(() =>
    this.posts().filter(p => p.title.toLowerCase().includes(this.query().toLowerCase()))
  );
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1400&q=80" caption="Figure 2 — Enterprise Angular application — feature modules, NgRx / Signal Store, RxJS pipelines, and Angular Material." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Enterprise SPAs</b> — banks, insurers, and telcos ship large Angular apps with strict TypeScript and DI.</li>
          <li><b>Admin dashboards</b> — Angular Material + CDK power complex data tables, forms, and layouts.</li>
          <li><b>Real-time apps</b> — RxJS + WebSockets stream trades, chats, and telemetry with backpressure control.</li>
          <li><b>Design systems</b> — CDK primitives (overlay, a11y, drag-drop) drive company-wide component libraries.</li>
          <li><b>SEO sites</b> — Angular SSR / Universal + hydration deliver crawlable, fast-first-paint marketing pages.</li>
          <li><b>Micro frontends</b> — Module Federation composes independently-deployed Angular apps into one shell.</li>
        </ul>
        <Code>{`// auth.interceptor.ts — HttpInterceptorFn with retry + auth
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { retry, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.token();
  const authed = token ? req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }) : req;
  return next(authed).pipe(
    retry({ count: 2, delay: 500 }),
    catchError(err => {
      if (err.status === 401) auth.signOut();
      return throwError(() => err);
    }),
  );
};`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Default to <b>standalone components</b>; use NgModules only for legacy interop.</li>
          <li>Prefer <b>OnPush</b> change detection and drive UI with signals or the async pipe.</li>
          <li>Always unsubscribe — use <code>takeUntilDestroyed()</code> or the async pipe; never subscribe manually in templates.</li>
          <li>Use <b>reactive forms</b> for anything non-trivial; add typed <code>FormGroup</code> and custom validators.</li>
          <li>Inject with <code>inject()</code> in field initializers for cleaner, tree-shakable code.</li>
          <li>Split routes with <b>lazy loading</b> and <b>deferrable views</b> for smaller initial bundles.</li>
          <li>Validate every HTTP response; centralize errors in an <code>HttpInterceptor</code>.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Subscribing in templates or components without unsubscribing — leaks and duplicate requests.</li>
          <li>Mutating state in place — breaks OnPush change detection; return new references.</li>
          <li>Overusing <code>any</code> and skipping strict TypeScript — loses Angular's biggest advantage.</li>
          <li>Putting business logic in components — move it to services and pure functions.</li>
          <li>Nesting subscriptions instead of using <code>switchMap</code> / <code>mergeMap</code> / <code>concatMap</code>.</li>
          <li>Ignoring <code>trackBy</code> in <code>*ngFor</code> — expensive DOM churn on updates.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>@defer</code> deferrable views to lazy-load heavy sections declaratively.</li>
          <li>Bridge RxJS and signals with <code>toSignal()</code> and <code>toObservable()</code>.</li>
          <li>Type reactive forms with <code>FormBuilder.nonNullable</code> and <code>FormGroup&lt;T&gt;</code>.</li>
          <li>Prefer the async pipe over manual subscriptions — Angular handles cleanup for you.</li>
          <li>Use standalone APIs (<code>provideRouter</code>, <code>provideHttpClient</code>) in <code>bootstrapApplication</code>.</li>
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
              <tr><td className="py-2 pr-4">Standalone Components</td><td>Modern component authoring</td><td>Default for new Angular projects.</td></tr>
              <tr><td className="py-2 pr-4">NgModules</td><td>Legacy grouping</td><td>Interop with older codebases only.</td></tr>
              <tr><td className="py-2 pr-4">Signals</td><td>Fine-grained reactivity</td><td>Local state, computed values, effects.</td></tr>
              <tr><td className="py-2 pr-4">RxJS</td><td>Async streams</td><td>HTTP, WebSockets, complex event flows.</td></tr>
              <tr><td className="py-2 pr-4">Reactive Forms</td><td>Typed form model</td><td>Complex forms with validation.</td></tr>
              <tr><td className="py-2 pr-4">Template-driven Forms</td><td>Simple <code>ngModel</code> forms</td><td>Small, mostly-static forms.</td></tr>
              <tr><td className="py-2 pr-4">NgRx</td><td>Redux-style store</td><td>Large apps with complex shared state.</td></tr>
              <tr><td className="py-2 pr-4">Signal Store</td><td>Signals-first state</td><td>Modern feature state without boilerplate.</td></tr>
              <tr><td className="py-2 pr-4">Angular SSR</td><td>Server rendering</td><td>SEO, fast first paint, marketing sites.</td></tr>
              <tr><td className="py-2 pr-4">Angular Material</td><td>UI components</td><td>Enterprise UIs, admin panels, dashboards.</td></tr>
              <tr><td className="py-2 pr-4">Module Federation</td><td>Micro frontends</td><td>Independent deploys inside one shell.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & SEO">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — trust Angular's built-in sanitization, avoid <code>bypassSecurityTrust*</code>, set CSP headers, guard routes, and validate server-side.</li>
          <li><b>Performance</b> — OnPush + signals, <code>trackBy</code>, lazy routes, deferrable views, and image / font optimization.</li>
          <li><b>SEO</b> — Angular SSR + hydration, Meta / Title services, structured data (JSON-LD), and canonical URLs.</li>
          <li><b>Deployment</b> — static hosting for CSR, Node for SSR; enable gzip / brotli and long-cache hashed assets.</li>
          <li><b>Testing</b> — Jasmine + Karma or Jest for units; Cypress or Playwright for E2E.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Angular is a batteries-included platform — components, DI, routing, forms, HTTP, and testing in one stack.</li>
          <li>Default to standalone components and OnPush; drive UI with signals and the async pipe.</li>
          <li>RxJS and signals are complementary — signals for local state, RxJS for async streams.</li>
          <li>Lazy loading, deferrable views, and SSR keep large apps fast and SEO-friendly.</li>
          <li>Angular scales from small SPAs to enterprise-grade, multi-team, micro-frontend architectures.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Standalone components or NgModules?">Use standalone components for all new work — NgModules are only for legacy interop.</FAQItem>
        <FAQItem q="Signals or RxJS?">Both — signals for synchronous local state, RxJS for async streams (HTTP, WebSockets, events).</FAQItem>
        <FAQItem q="Do I still need NgRx?">Only for large apps with complex shared state — many features are fine with services + Signal Store.</FAQItem>
        <FAQItem q="How do I improve change-detection performance?">Adopt OnPush, use signals, immutable updates, <code>trackBy</code>, and lazy routes.</FAQItem>
        <FAQItem q="Where should I deploy an Angular SSR app?">Any Node host — Vercel, Render, Fly, or your own container platform behind a CDN.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://angular.dev/" target="_blank" rel="noreferrer">Angular Docs</a> · <a className="text-primary hover:underline" href="https://angular.dev/cli" target="_blank" rel="noreferrer">Angular CLI</a> · <a className="text-primary hover:underline" href="https://angular.dev/api" target="_blank" rel="noreferrer">API Reference</a></li>
          <li><a className="text-primary hover:underline" href="https://rxjs.dev/" target="_blank" rel="noreferrer">RxJS Docs</a> · <a className="text-primary hover:underline" href="https://www.typescriptlang.org/docs/" target="_blank" rel="noreferrer">TypeScript Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://material.angular.io/" target="_blank" rel="noreferrer">Angular Material</a> · <a className="text-primary hover:underline" href="https://material.angular.io/cdk/categories" target="_blank" rel="noreferrer">Angular CDK</a></li>
          <li><a className="text-primary hover:underline" href="https://jasmine.github.io/" target="_blank" rel="noreferrer">Jasmine</a> · <a className="text-primary hover:underline" href="https://docs.cypress.io/" target="_blank" rel="noreferrer">Cypress</a> · <a className="text-primary hover:underline" href="https://nodejs.org/docs/latest/api/" target="_blank" rel="noreferrer">Node.js</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Angular and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
