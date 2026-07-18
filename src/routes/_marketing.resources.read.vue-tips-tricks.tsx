import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "vue-tips-tricks",
  title: "Vue.js — Tips & Tricks",
  category: "Web Development",
  difficulty: "Beginner",
  readingTime: "12 min",
  pages: 12,
  lastUpdated: "March 2026",
  tags: ["Vue", "Composition"],
  heroImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1800&q=80",
  heroSubtitle: 'Practical Vue.js tips and tricks — composables, defineModel, Suspense, and productivity boosters.',
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
  { title: "Vue.js — Beginner Guide", tag: "Vue", time: "18 min" },
  { title: "Vue.js — Cheat Sheet", tag: "Vue", time: "5 min" },
  { title: "Vue.js — Interview Questions", tag: "Vue", time: "43 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/vue-tips-tricks")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/vue-tips-tricks" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Tips & Tricks</b> — practical, production-ready Vue.js.</li>
          <li>Author Single File Components (SFCs) with <code>&lt;script setup&gt;</code> and TypeScript.</li>
          <li>Use the Composition API — <code>ref</code>, <code>reactive</code>, <code>computed</code>, <code>watch</code>, and composables.</li>
          <li>Compose apps with Vue Router (lazy routes, guards) and Pinia (typed stores).</li>
          <li>Optimize performance with code splitting, Suspense, and rendering discipline.</li>
          <li>Ship SSR / SSG apps with Nuxt, and deploy Vue apps to production.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Comfort with modern JavaScript / TypeScript (ES modules, arrow functions, generics).</li>
          <li>Node.js 20+ and a package manager (npm, pnpm, or Bun) installed locally.</li>
          <li>Basic HTML, CSS, and HTTP knowledge; familiarity with the terminal.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Vue.js and the ecosystem</li>
          <li>Vite, Vue CLI, project structure, and TypeScript integration</li>
          <li>Single File Components — <code>&lt;template&gt;</code>, <code>&lt;script setup&gt;</code>, <code>&lt;style&gt;</code></li>
          <li>Reactive data, methods, computed properties, and watchers</li>
          <li>Directives — <code>v-if</code>, <code>v-show</code>, <code>v-for</code>, <code>v-model</code>, <code>v-bind</code>, <code>v-on</code></li>
          <li>Event handling, conditional and list rendering</li>
          <li>Composition API — <code>setup()</code>, <code>ref()</code>, <code>reactive()</code>, <code>computed()</code>, <code>watch()</code>, <code>watchEffect()</code></li>
          <li>Composables and reusable logic</li>
          <li>Options API and migration to Composition API</li>
          <li>Component communication — props, emits, slots, provide / inject</li>
          <li>Dynamic components, async components, and <code>&lt;KeepAlive&gt;</code></li>
          <li>Custom directives</li>
          <li>Vue Router — nested, dynamic, lazy routes and navigation guards</li>
          <li>State management — Pinia, Vuex, modular stores, and persistence</li>
          <li>Forms — binding, validation, custom inputs, dynamic forms</li>
          <li>HTTP — Fetch, Axios, REST, authentication, error handling</li>
          <li>Styling — scoped CSS, CSS Modules, Tailwind, Sass, CSS variables</li>
          <li>SSR — Nuxt.js, SSG, hydration, and SEO</li>
          <li>Performance — lazy loading, code splitting, rendering optimization</li>
          <li>Testing — Vitest, Vue Test Utils, Cypress, Playwright</li>
          <li>Security — authentication, authorization, XSS prevention, secure APIs</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Vue.js is an approachable, performant, and versatile framework for building modern user interfaces. It combines a fine-grained reactivity system, Single File Components, and the Composition API to scale from small widgets to enterprise SPAs — with Nuxt.js layering SSR, SSG, and full-stack conventions on top. This resource — <b>Vue.js — Tips & Tricks</b> — is self-contained: Practical Vue.js tips and tricks — composables, defineModel, Suspense, and productivity boosters.</p>
        <Callout tone="info" title="Vue in one line">Vue = reactive data + SFCs + Composition API + Pinia + Vue Router — a batteries-included frontend platform.</Callout>
        <Figure src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1400&q=80" caption="Figure 1 — Vue.js architecture — reactivity system, SFCs, and the Composition API compose reactive SPAs." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — what is Vue, ecosystem, Vue CLI, Vite, project structure, SFCs, TypeScript integration.</li>
          <li><b>Core concepts</b> — templates, reactive data, methods, computed properties, watchers, event handling, conditional and list rendering.</li>
          <li><b>Composition API</b> — <code>setup()</code>, <code>ref</code>, <code>reactive</code>, <code>computed</code>, <code>watch</code>, <code>watchEffect</code>, lifecycle hooks, composables.</li>
          <li><b>Options API</b> — <code>data</code>, <code>methods</code>, <code>computed</code>, <code>watch</code>, lifecycle hooks, and migration to Composition API.</li>
          <li><b>Components</b> — props, emits, slots, provide / inject, dynamic and async components, <code>&lt;KeepAlive&gt;</code>.</li>
          <li><b>Directives</b> — built-ins (<code>v-if</code>, <code>v-show</code>, <code>v-for</code>, <code>v-model</code>, <code>v-bind</code>, <code>v-on</code>) and custom directives.</li>
          <li><b>Routing</b> — Vue Router: nested, dynamic, lazy routes and navigation guards.</li>
          <li><b>State management</b> — Pinia (recommended), Vuex (legacy), global vs modular stores, persistence.</li>
          <li><b>Forms</b> — <code>v-model</code>, validation, custom inputs, dynamic forms.</li>
          <li><b>HTTP</b> — Fetch API, Axios, REST, authentication, retry, error handling.</li>
          <li><b>Styling</b> — scoped CSS, CSS Modules, Tailwind, Sass, CSS variables.</li>
          <li><b>SSR & meta frameworks</b> — Nuxt.js, SSR, SSG, hydration.</li>
          <li><b>Performance</b> — lazy loading, code splitting, virtual DOM, rendering optimization, bundle analysis.</li>
          <li><b>Testing</b> — Vitest, Vue Test Utils, Cypress, Playwright.</li>
          <li><b>Security</b> — authentication, authorization, XSS prevention, secure APIs.</li>
          <li><b>Enterprise</b> — folder structure, clean architecture, reusable components, design systems, scalable apps.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Browser
   │
   ▼
[Vue Router]  ── guards / lazy chunks
   │
   ▼
[Root App]  ── <App />  (SFC + <script setup>)
   │        │
   │        ├── Pinia store  → state / getters / actions
   │        └── Composables  → useAuth() / useFetch() / useX()
   ▼
[Reactivity System]  ── refs / reactive → Proxy tracking
   │
   ▼
[Virtual DOM diff]  → efficient DOM updates
   │
   ▼
Nuxt (optional)  ── SSR / SSG / hydration / routing conventions`}
        </pre>
        <Code>{`<!-- Posts.vue — SFC with <script setup>, Composition API + fetch -->
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

interface Post { id: number; title: string; }

const posts = ref<Post[]>([]);
const query = ref("");
const filtered = computed(() =>
  posts.value.filter(p => p.title.toLowerCase().includes(query.value.toLowerCase()))
);

onMounted(async () => {
  const res = await fetch("/api/posts");
  posts.value = await res.json();
});
</script>

<template>
  <input v-model="query" placeholder="Filter" />
  <ul>
    <li v-for="p in filtered" :key="p.id">{{ p.title }}</li>
  </ul>
</template>`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80" caption="Figure 2 — Enterprise Vue.js application — Pinia stores, Vue Router, composables, and Nuxt SSR." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>SaaS dashboards</b> — GitLab, Alibaba, and many SaaS products build admin UIs with Vue.</li>
          <li><b>Marketing sites</b> — Nuxt powers SSR/SSG sites with SEO-friendly routes and fast first paint.</li>
          <li><b>Design systems</b> — SFCs + scoped CSS make component libraries easy to share across teams.</li>
          <li><b>Real-time apps</b> — reactivity + WebSockets keep dashboards, chats, and telemetry live.</li>
          <li><b>Auth flows</b> — Pinia stores + Vue Router guards centralize sessions and protected routes.</li>
          <li><b>E-commerce</b> — Nuxt storefronts combine SSG, ISR-like revalidation, and dynamic PDPs.</li>
        </ul>
        <Code>{`// stores/auth.ts — Pinia store with typed state + actions
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuth = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user  = ref<{ id: string; email: string } | null>(null);
  const isAuthed = computed(() => !!token.value);

  async function signIn(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();
    token.value = data.token;
    user.value  = data.user;
  }

  function signOut() {
    token.value = null;
    user.value  = null;
  }

  return { token, user, isAuthed, signIn, signOut };
});`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Default to <b>Composition API + <code>&lt;script setup&gt;</code></b> with TypeScript for new projects.</li>
          <li>Extract shared logic into <b>composables</b> (<code>useX()</code>) instead of mixins.</li>
          <li>Keep components small and focused; lift shared state into Pinia stores when needed.</li>
          <li>Use <b>Pinia</b> over Vuex; prefer setup-store syntax for typed, testable stores.</li>
          <li>Always provide a stable <code>:key</code> on <code>v-for</code> — never use array index for volatile lists.</li>
          <li>Lazy-load routes and heavy components with dynamic <code>import()</code>.</li>
          <li>Validate every HTTP response and centralize errors in an interceptor / composable.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Losing reactivity by destructuring a <code>reactive()</code> object — use <code>toRefs</code>.</li>
          <li>Mutating props inside a child component — emit an event instead.</li>
          <li>Using array index as <code>:key</code> — leads to subtle rendering bugs.</li>
          <li>Overusing global state — many concerns are better as local <code>ref()</code> or composables.</li>
          <li>Forgetting to unsubscribe from side effects — use <code>onScopeDispose</code> or <code>watchEffect</code> cleanup.</li>
          <li>Mixing Options and Composition API in the same component without a clear reason.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>defineModel()</code> for two-way bound props without boilerplate emits.</li>
          <li>Wrap async components in <code>&lt;Suspense&gt;</code> for declarative loading states.</li>
          <li>Use <code>&lt;Teleport&gt;</code> to render modals / toasts outside the component tree.</li>
          <li>Prefer <code>shallowRef</code> / <code>shallowReactive</code> for large, mostly-static structures.</li>
          <li>Type Pinia stores with the setup-store syntax; getters become typed <code>computed</code>.</li>
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
              <tr><td className="py-2 pr-4">Composition API</td><td>Modern reactive logic</td><td>Default for new components; better TS and reuse.</td></tr>
              <tr><td className="py-2 pr-4">Options API</td><td>Classic option-based auth</td><td>Legacy code and simple tutorials.</td></tr>
              <tr><td className="py-2 pr-4"><code>ref</code></td><td>Primitive reactivity</td><td>Numbers, strings, single values.</td></tr>
              <tr><td className="py-2 pr-4"><code>reactive</code></td><td>Object reactivity</td><td>Deep reactive objects and stores.</td></tr>
              <tr><td className="py-2 pr-4">Pinia</td><td>State management</td><td>Recommended store for all new apps.</td></tr>
              <tr><td className="py-2 pr-4">Vuex</td><td>Legacy store</td><td>Existing Vuex codebases only.</td></tr>
              <tr><td className="py-2 pr-4">Vue Router</td><td>Client-side routing</td><td>Any multi-page SPA.</td></tr>
              <tr><td className="py-2 pr-4">Nuxt</td><td>SSR / SSG / fullstack</td><td>SEO, fast first paint, hybrid rendering.</td></tr>
              <tr><td className="py-2 pr-4">Vitest</td><td>Unit testing</td><td>Fast, Vite-native test runner.</td></tr>
              <tr><td className="py-2 pr-4">Cypress / Playwright</td><td>E2E testing</td><td>Real-browser flow verification.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Security, Performance & SEO">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Security</b> — trust Vue's HTML escaping, avoid <code>v-html</code> with untrusted input, set CSP, validate on the server.</li>
          <li><b>Performance</b> — lazy routes, <code>&lt;Suspense&gt;</code>, <code>shallowRef</code>, memoized computeds, and image / font optimization.</li>
          <li><b>SEO</b> — Nuxt SSR / SSG, per-route meta with <code>useHead</code>, structured data, canonical URLs.</li>
          <li><b>Deployment</b> — static hosting for SPA; Node hosts for Nuxt SSR; enable gzip / brotli and long-cache hashed assets.</li>
          <li><b>Testing</b> — Vitest + Vue Test Utils for units, Cypress or Playwright for E2E.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Vue.js pairs a fine-grained reactivity system with SFCs and the Composition API.</li>
          <li>Default to <code>&lt;script setup&gt;</code> with TypeScript, Pinia stores, and lazy Vue Router routes.</li>
          <li>Extract shared logic into composables; keep components small and cohesive.</li>
          <li>Reach for Nuxt when you need SSR, SSG, or full-stack conventions.</li>
          <li>Test with Vitest + Vue Test Utils and E2E with Cypress or Playwright.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Options API or Composition API?">Composition API for all new components — better TypeScript, reuse, and organization.</FAQItem>
        <FAQItem q="Pinia or Vuex?">Pinia — official, typed, simpler, and the recommended store since Vue 3.</FAQItem>
        <FAQItem q="When should I use Nuxt?">When you need SSR, SSG, file-based routing, or fullstack conventions out of the box.</FAQItem>
        <FAQItem q="Why did my <code>reactive()</code> object stop being reactive?">You destructured it — use <code>toRefs()</code> to keep reactivity when pulling props out.</FAQItem>
        <FAQItem q="Where should I deploy?">Any static host for SPAs; any Node host (Vercel, Netlify, Render, Fly) for Nuxt SSR.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://vuejs.org/" target="_blank" rel="noreferrer">Vue.js Docs</a> · <a className="text-primary hover:underline" href="https://vuejs.org/api/" target="_blank" rel="noreferrer">Vue API Reference</a></li>
          <li><a className="text-primary hover:underline" href="https://router.vuejs.org/" target="_blank" rel="noreferrer">Vue Router</a> · <a className="text-primary hover:underline" href="https://pinia.vuejs.org/" target="_blank" rel="noreferrer">Pinia</a> · <a className="text-primary hover:underline" href="https://nuxt.com/docs" target="_blank" rel="noreferrer">Nuxt Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a> · <a className="text-primary hover:underline" href="https://vitest.dev/" target="_blank" rel="noreferrer">Vitest</a> · <a className="text-primary hover:underline" href="https://test-utils.vuejs.org/" target="_blank" rel="noreferrer">Vue Test Utils</a></li>
          <li><a className="text-primary hover:underline" href="https://developer.mozilla.org/en-US/docs/Web" target="_blank" rel="noreferrer">MDN Web Docs</a> · <a className="text-primary hover:underline" href="https://www.typescriptlang.org/docs/" target="_blank" rel="noreferrer">TypeScript</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Vue.js and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
