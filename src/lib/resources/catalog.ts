// Course → Resources catalog. Every course in Explore has a matching entry
// here so its dedicated Resources page can render the full set of documents
// and articles (no videos, no external links).

export type ResourceKind =
  | "Beginner Guide"
  | "Complete Tutorial"
  | "Step-by-Step Learning Guide"
  | "PDF Notes"
  | "Quick Revision Notes"
  | "Cheat Sheet"
  | "Interview Questions"
  | "Practice Questions"
  | "Answer Key"
  | "Sample Exercises"
  | "Project Guide"
  | "Project Case Study"
  | "Real-world Case Study"
  | "Best Practices"
  | "Common Mistakes"
  | "Frequently Asked Questions"
  | "Learning Roadmap"
  | "Tips & Tricks"
  | "Advanced Concepts"
  | "Glossary"
  | "Reference Guide";

export const RESOURCE_KINDS: ResourceKind[] = [
  "Beginner Guide",
  "Complete Tutorial",
  "Step-by-Step Learning Guide",
  "PDF Notes",
  "Quick Revision Notes",
  "Cheat Sheet",
  "Interview Questions",
  "Practice Questions",
  "Answer Key",
  "Sample Exercises",
  "Project Guide",
  "Project Case Study",
  "Real-world Case Study",
  "Best Practices",
  "Common Mistakes",
  "Frequently Asked Questions",
  "Learning Roadmap",
  "Tips & Tricks",
  "Advanced Concepts",
  "Glossary",
  "Reference Guide",
];

export type CourseCatalogEntry = {
  slug: string;
  title: string;
  category: string; // Group label e.g. "AI & Data"
  tagline: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  gradient: string; // Tailwind gradient class stem for cover
};

export const COURSE_CATALOG: CourseCatalogEntry[] = [
  // AI & Data
  { slug: "artificial-intelligence", title: "Artificial Intelligence", category: "AI & Data", tagline: "Foundations of AI — search, reasoning, learning, and modern neural approaches.", difficulty: "Intermediate", tags: ["AI", "Neural Nets", "Search"], gradient: "from-violet-500 to-fuchsia-500" },
  { slug: "machine-learning", title: "Machine Learning", category: "AI & Data", tagline: "Regression, classification, ensembles, and evaluation with scikit-learn.", difficulty: "Intermediate", tags: ["ML", "Python", "scikit-learn"], gradient: "from-violet-500 to-purple-500" },
  { slug: "deep-learning", title: "Deep Learning", category: "AI & Data", tagline: "Neural networks, CNNs, RNNs, transformers, and modern training regimes.", difficulty: "Advanced", tags: ["DL", "PyTorch", "Transformers"], gradient: "from-fuchsia-500 to-pink-500" },
  { slug: "generative-ai", title: "Generative AI", category: "AI & Data", tagline: "LLMs, diffusion, RAG, and shipping GenAI features to production.", difficulty: "Advanced", tags: ["GenAI", "LLM", "RAG"], gradient: "from-purple-500 to-violet-500" },
  { slug: "prompt-engineering", title: "Prompt Engineering", category: "AI & Data", tagline: "Reliable prompts, chains, evaluations, and prompt-driven pipelines.", difficulty: "Intermediate", tags: ["Prompts", "LLM", "Eval"], gradient: "from-violet-500 to-indigo-500" },
  { slug: "ai-agents", title: "AI Agents", category: "AI & Data", tagline: "Tool-use, memory, planning, and multi-step autonomous workflows.", difficulty: "Advanced", tags: ["Agents", "LLM", "Tools"], gradient: "from-fuchsia-500 to-violet-500" },

  // Programming
  { slug: "python", title: "Python", category: "Programming", tagline: "Syntax to advanced Python — the fastest path to fluent, idiomatic code.", difficulty: "Beginner", tags: ["Python", "OOP", "Std lib"], gradient: "from-sky-500 to-cyan-500" },
  { slug: "java", title: "Java", category: "Programming", tagline: "OOP, collections, streams, and the JVM you'll use at work.", difficulty: "Beginner", tags: ["Java", "OOP", "JVM"], gradient: "from-red-500 to-orange-500" },
  { slug: "c-programming", title: "C Programming", category: "Programming", tagline: "Memory model, pointers, and systems-level programming.", difficulty: "Beginner", tags: ["C", "Pointers", "Systems"], gradient: "from-blue-500 to-sky-500" },
  { slug: "cpp", title: "C++", category: "Programming", tagline: "Modern C++: RAII, templates, STL, and performance-critical patterns.", difficulty: "Intermediate", tags: ["C++", "STL", "Templates"], gradient: "from-blue-600 to-indigo-500" },
  { slug: "javascript", title: "JavaScript", category: "Programming", tagline: "Language deep-dive: closures, prototypes, async, and modules.", difficulty: "Beginner", tags: ["JS", "ES2020+", "Async"], gradient: "from-yellow-500 to-amber-500" },
  { slug: "typescript", title: "TypeScript", category: "Programming", tagline: "Types, generics, narrowing, and shipping robust JS at scale.", difficulty: "Intermediate", tags: ["TS", "Types", "Generics"], gradient: "from-sky-500 to-blue-500" },
  { slug: "go", title: "Go", category: "Programming", tagline: "Goroutines, channels, tooling — writing simple, fast backends in Go.", difficulty: "Intermediate", tags: ["Go", "Concurrency"], gradient: "from-cyan-500 to-sky-500" },
  { slug: "rust", title: "Rust", category: "Programming", tagline: "Ownership, borrowing, traits — safe systems programming.", difficulty: "Advanced", tags: ["Rust", "Systems", "Safety"], gradient: "from-orange-500 to-red-500" },

  // Web
  { slug: "html5", title: "HTML5", category: "Web Development", tagline: "Semantic markup, accessibility, and modern document structure.", difficulty: "Beginner", tags: ["HTML", "A11y"], gradient: "from-orange-500 to-amber-500" },
  { slug: "css3", title: "CSS3", category: "Web Development", tagline: "Layout, responsiveness, animations, and design-system fundamentals.", difficulty: "Beginner", tags: ["CSS", "Flexbox", "Grid"], gradient: "from-blue-500 to-indigo-500" },
  { slug: "tailwind-css", title: "Tailwind CSS", category: "Web Development", tagline: "Utility-first styling, tokens, and building a scalable design system.", difficulty: "Beginner", tags: ["Tailwind", "Design"], gradient: "from-cyan-500 to-sky-500" },
  { slug: "react", title: "React.js", category: "Web Development", tagline: "Hooks, state, routing, patterns, and production React apps.", difficulty: "Intermediate", tags: ["React", "Hooks"], gradient: "from-cyan-500 to-blue-500" },
  { slug: "nextjs", title: "Next.js", category: "Web Development", tagline: "App router, server components, streaming, and shipping full-stack apps.", difficulty: "Intermediate", tags: ["Next.js", "SSR"], gradient: "from-slate-500 to-zinc-500" },
  { slug: "angular", title: "Angular", category: "Web Development", tagline: "Components, DI, RxJS, and building large-scale enterprise SPAs.", difficulty: "Intermediate", tags: ["Angular", "RxJS"], gradient: "from-red-500 to-rose-500" },
  { slug: "vue", title: "Vue.js", category: "Web Development", tagline: "Composition API, reactivity, and building focused SPAs.", difficulty: "Intermediate", tags: ["Vue", "Composition"], gradient: "from-emerald-500 to-teal-500" },
  { slug: "nodejs", title: "Node.js", category: "Web Development", tagline: "Event loop, streams, and building scalable backend services.", difficulty: "Intermediate", tags: ["Node", "Backend"], gradient: "from-lime-500 to-green-500" },
  { slug: "expressjs", title: "Express.js", category: "Web Development", tagline: "Routing, middleware, and REST APIs with Node + Express.", difficulty: "Intermediate", tags: ["Express", "REST"], gradient: "from-neutral-500 to-slate-500" },
  { slug: "mern-stack", title: "MERN Stack", category: "Web Development", tagline: "Mongo, Express, React, Node — end-to-end full-stack development.", difficulty: "Intermediate", tags: ["MERN", "Fullstack"], gradient: "from-emerald-500 to-teal-500" },

  // Mobile
  { slug: "flutter", title: "Flutter", category: "Mobile", tagline: "Widgets, state, and shipping beautiful cross-platform apps.", difficulty: "Intermediate", tags: ["Flutter", "Dart"], gradient: "from-teal-500 to-cyan-500" },
  { slug: "android", title: "Android Development", category: "Mobile", tagline: "Activities, Jetpack, and building production Android apps.", difficulty: "Intermediate", tags: ["Android", "Jetpack"], gradient: "from-green-500 to-emerald-500" },
  { slug: "kotlin", title: "Kotlin", category: "Mobile", tagline: "Idiomatic Kotlin for Android — coroutines, sealed classes, and DSLs.", difficulty: "Intermediate", tags: ["Kotlin", "Coroutines"], gradient: "from-violet-500 to-purple-500" },
  { slug: "swift-ios", title: "Swift (iOS)", category: "Mobile", tagline: "SwiftUI, concurrency, and shipping polished iOS apps.", difficulty: "Intermediate", tags: ["Swift", "SwiftUI"], gradient: "from-orange-500 to-red-500" },

  // Databases
  { slug: "sql", title: "SQL", category: "Databases", tagline: "Queries, joins, indexes, and thinking relationally.", difficulty: "Beginner", tags: ["SQL", "RDBMS"], gradient: "from-indigo-500 to-blue-500" },
  { slug: "mysql", title: "MySQL", category: "Databases", tagline: "Schema design, tuning, and production MySQL patterns.", difficulty: "Intermediate", tags: ["MySQL", "Tuning"], gradient: "from-blue-500 to-cyan-500" },
  { slug: "postgresql", title: "PostgreSQL", category: "Databases", tagline: "Advanced Postgres: JSONB, CTEs, indexes, and performance.", difficulty: "Intermediate", tags: ["Postgres", "JSONB"], gradient: "from-sky-500 to-blue-500" },
  { slug: "mongodb", title: "MongoDB", category: "Databases", tagline: "Schema design, aggregation, and production-ready MongoDB.", difficulty: "Intermediate", tags: ["Mongo", "Aggregation"], gradient: "from-emerald-500 to-green-500" },

  // Data & Analytics
  { slug: "data-science", title: "Data Science", category: "Data & Analytics", tagline: "Analytics, ML, visualization, and storytelling with data.", difficulty: "Intermediate", tags: ["Data", "ML", "Viz"], gradient: "from-pink-500 to-rose-500" },
  { slug: "data-analytics", title: "Data Analytics", category: "Data & Analytics", tagline: "SQL, Excel, Python, and BI tools for data-driven decisions.", difficulty: "Beginner", tags: ["Analytics", "SQL", "BI"], gradient: "from-pink-500 to-fuchsia-500" },
  { slug: "numpy", title: "NumPy", category: "Data & Analytics", tagline: "Arrays, broadcasting, and numerical computing in Python.", difficulty: "Beginner", tags: ["NumPy", "Python"], gradient: "from-rose-500 to-pink-500" },
  { slug: "pandas", title: "Pandas", category: "Data & Analytics", tagline: "DataFrames, groupby, joins, and real-world data wrangling.", difficulty: "Beginner", tags: ["Pandas", "Python"], gradient: "from-pink-500 to-rose-500" },
  { slug: "power-bi", title: "Power BI", category: "Data & Analytics", tagline: "Modeling, DAX, and building executive-ready dashboards.", difficulty: "Beginner", tags: ["Power BI", "DAX"], gradient: "from-yellow-500 to-amber-500" },
  { slug: "tableau", title: "Tableau", category: "Data & Analytics", tagline: "Visual analytics, calculated fields, and interactive dashboards.", difficulty: "Beginner", tags: ["Tableau", "Viz"], gradient: "from-blue-500 to-indigo-500" },

  // Cloud & DevOps
  { slug: "aws", title: "AWS", category: "Cloud & DevOps", tagline: "Core AWS services, architecture principles, and exam-ready practice.", difficulty: "Beginner", tags: ["AWS", "Cloud"], gradient: "from-orange-500 to-amber-500" },
  { slug: "azure", title: "Microsoft Azure", category: "Cloud & DevOps", tagline: "Azure fundamentals — compute, storage, networking, and identity.", difficulty: "Beginner", tags: ["Azure", "Cloud"], gradient: "from-sky-500 to-blue-500" },
  { slug: "gcp", title: "Google Cloud Platform", category: "Cloud & DevOps", tagline: "GCP core services and cloud-native patterns.", difficulty: "Beginner", tags: ["GCP", "Cloud"], gradient: "from-blue-500 to-cyan-500" },
  { slug: "docker", title: "Docker", category: "Cloud & DevOps", tagline: "Images, containers, networks, and shipping reproducible builds.", difficulty: "Intermediate", tags: ["Docker", "Containers"], gradient: "from-cyan-500 to-blue-500" },
  { slug: "kubernetes", title: "Kubernetes", category: "Cloud & DevOps", tagline: "Pods, deployments, services, and orchestrating production workloads.", difficulty: "Advanced", tags: ["K8s", "Orchestration"], gradient: "from-sky-500 to-blue-500" },
  { slug: "devops", title: "DevOps", category: "Cloud & DevOps", tagline: "CI/CD, IaC, observability, and shipping software faster and safer.", difficulty: "Intermediate", tags: ["DevOps", "CI/CD"], gradient: "from-teal-500 to-emerald-500" },

  // Security
  { slug: "cyber-security", title: "Cyber Security", category: "Security", tagline: "Threats, defenses, and building a security mindset.", difficulty: "Beginner", tags: ["Security", "Defense"], gradient: "from-red-500 to-rose-500" },
  { slug: "ethical-hacking", title: "Ethical Hacking", category: "Security", tagline: "Recon, exploitation, and reporting — offensive security fundamentals.", difficulty: "Advanced", tags: ["Hacking", "Pentest"], gradient: "from-orange-500 to-red-500" },
  { slug: "network-security", title: "Network Security", category: "Security", tagline: "Protocols, firewalls, and securing network infrastructure.", difficulty: "Intermediate", tags: ["Network", "Security"], gradient: "from-slate-500 to-zinc-500" },
  { slug: "penetration-testing", title: "Penetration Testing", category: "Security", tagline: "Methodology, tooling, and hands-on pentest engagements.", difficulty: "Advanced", tags: ["Pentest", "Offensive"], gradient: "from-red-500 to-orange-500" },

  // Design
  { slug: "ui-design", title: "UI Design", category: "Design", tagline: "Visual design principles, hierarchy, and building beautiful UIs.", difficulty: "Beginner", tags: ["UI", "Design"], gradient: "from-fuchsia-500 to-pink-500" },
  { slug: "ux-design", title: "UX Design", category: "Design", tagline: "Research, journeys, and designing experiences users love.", difficulty: "Beginner", tags: ["UX", "Research"], gradient: "from-pink-500 to-rose-500" },
  { slug: "figma", title: "Figma", category: "Design", tagline: "Auto-layout, components, and building production design systems.", difficulty: "Beginner", tags: ["Figma", "Design Systems"], gradient: "from-purple-500 to-fuchsia-500" },

  // CS Core
  { slug: "dsa", title: "Data Structures & Algorithms", category: "CS Core", tagline: "Patterns, complexity, and 200+ interview-ready problems.", difficulty: "Intermediate", tags: ["DSA", "Interview"], gradient: "from-blue-500 to-indigo-500" },
  { slug: "operating-systems", title: "Operating Systems", category: "CS Core", tagline: "Processes, memory, filesystems, and how modern OSes work.", difficulty: "Intermediate", tags: ["OS", "Systems"], gradient: "from-indigo-500 to-violet-500" },
  { slug: "computer-networks", title: "Computer Networks", category: "CS Core", tagline: "TCP/IP, routing, and the internet from packets up.", difficulty: "Intermediate", tags: ["Networks", "TCP/IP"], gradient: "from-blue-500 to-sky-500" },
  { slug: "dbms", title: "DBMS", category: "CS Core", tagline: "Relational model, normalization, transactions, and indexing.", difficulty: "Intermediate", tags: ["DBMS", "SQL"], gradient: "from-indigo-500 to-blue-500" },
  { slug: "system-design", title: "System Design", category: "CS Core", tagline: "Scalable architectures, trade-offs, and interview case studies.", difficulty: "Advanced", tags: ["System Design", "Scale"], gradient: "from-indigo-500 to-violet-500" },
];

export function getCourseBySlug(slug: string) {
  return COURSE_CATALOG.find((c) => c.slug === slug) ?? null;
}

export function getRelatedCourses(slug: string, limit = 4) {
  const cur = getCourseBySlug(slug);
  if (!cur) return [];
  return COURSE_CATALOG.filter((c) => c.slug !== slug && c.category === cur.category).slice(0, limit);
}

// ---------------------------------------------------------------------------
// Topic-relevant imagery. Curated Unsplash photo IDs mapped per category with
// slug-level overrides for major courses so covers stay consistent across the
// library while remaining specific to each topic.
// ---------------------------------------------------------------------------

const CATEGORY_IMAGE: Record<string, string> = {
  "AI & Data": "photo-1620712943543-bcc4688e7485",
  "Programming": "photo-1461749280684-dccba630e2f6",
  "Web Development": "photo-1547658719-da2b51169166",
  "Mobile": "photo-1512941937669-90a1b58e7e9c",
  "Databases": "photo-1544383835-bda2bc66a55d",
  "Data & Analytics": "photo-1551288049-bebda4e38f71",
  "Cloud & DevOps": "photo-1451187580459-43490279c0fa",
  "Security": "photo-1550751827-4bd374c3f58b",
  "Design": "photo-1561070791-2526d30994b8",
  "CS Core": "photo-1518770660439-4636190af475",
};

const SLUG_IMAGE: Record<string, string> = {
  "artificial-intelligence": "photo-1620712943543-bcc4688e7485",
  "machine-learning": "photo-1555949963-aa79dcee981c",
  "deep-learning": "photo-1677442136019-21780ecad995",
  "generative-ai": "photo-1673187456554-11de9df2f83e",
  "prompt-engineering": "photo-1526378787940-576a539ba69d",
  "ai-agents": "photo-1535378917042-10a22c95931a",
  "python": "photo-1526379095098-d400fd0bf935",
  "javascript": "photo-1579468118864-1b9ea3c0db4a",
  "typescript": "photo-1587620962725-abab7fe55159",
  "react": "photo-1633356122544-f134324a6cee",
  "nextjs": "photo-1555066931-4365d14bab8c",
  "nodejs": "photo-1627398242454-45a1465c2479",
  "html5": "photo-1621839673705-6617adf9e890",
  "css3": "photo-1507721999472-8ed4421c4af2",
  "flutter": "photo-1607252650355-f7fd0460ccdb",
  "android": "photo-1607252650355-f7fd0460ccdb",
  "swift-ios": "photo-1512941937669-90a1b58e7e9c",
  "sql": "photo-1544383835-bda2bc66a55d",
  "postgresql": "photo-1633412802994-5c058f151b66",
  "mongodb": "photo-1633412802994-5c058f151b66",
  "data-science": "photo-1460925895917-afdab827c52f",
  "data-analytics": "photo-1551288049-bebda4e38f71",
  "aws": "photo-1451187580459-43490279c0fa",
  "azure": "photo-1451187580459-43490279c0fa",
  "gcp": "photo-1451187580459-43490279c0fa",
  "docker": "photo-1605745341112-85968b19335b",
  "kubernetes": "photo-1667372393119-3d4c48d07fc9",
  "devops": "photo-1607705703571-c5a8695f18f6",
  "cyber-security": "photo-1563986768609-322da13575f3",
  "ethical-hacking": "photo-1526628953301-3e589a6a8b74",
  "network-security": "photo-1544197150-b99a580bb7a8",
  "penetration-testing": "photo-1550751827-4bd374c3f58b",
  "ui-design": "photo-1561070791-2526d30994b8",
  "ux-design": "photo-1586717791821-3f44a563fa4c",
  "figma": "photo-1609921212029-bb5a28e60960",
  "dsa": "photo-1518770660439-4636190af475",
  "operating-systems": "photo-1518770660439-4636190af475",
  "computer-networks": "photo-1544197150-b99a580bb7a8",
  "system-design": "photo-1518770660439-4636190af475",
};

export function getCourseImage(course: { slug: string; category: string }): string {
  const id = SLUG_IMAGE[course.slug] ?? CATEGORY_IMAGE[course.category] ?? "photo-1518770660439-4636190af475";
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
}

// ---------------------------------------------------------------------------
// Deterministic resource metadata generation. Given a course + resource kind,
// produce consistent title, summary, reading time, pages, tags. Keeps the
// library scalable to thousands of resources without hand-writing each one.
// ---------------------------------------------------------------------------

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const KIND_META: Record<
  ResourceKind,
  { blurb: (t: string) => string; pages: [number, number]; readMin: [number, number]; difficulty: "Beginner" | "Intermediate" | "Advanced" | "All" }
> = {
  "Beginner Guide": { blurb: (t) => `A friendly first walk through ${t}: core concepts, mental models, and your first hands-on exercises.`, pages: [14, 28], readMin: [10, 18], difficulty: "Beginner" },
  "Complete Tutorial": { blurb: (t) => `An end-to-end tutorial covering every essential topic in ${t}, from setup to shipping a real project.`, pages: [60, 120], readMin: [40, 75], difficulty: "All" },
  "Step-by-Step Learning Guide": { blurb: (t) => `A structured, week-by-week study plan for ${t} with milestones, exercises, and self-checks.`, pages: [22, 44], readMin: [18, 28], difficulty: "All" },
  "PDF Notes": { blurb: (t) => `Complete chapter-wise notes for ${t}, formatted for revision and offline study.`, pages: [80, 160], readMin: [50, 90], difficulty: "All" },
  "Quick Revision Notes": { blurb: (t) => `Condensed one-pager revision notes for ${t} — perfect for exam eve or interview prep.`, pages: [4, 10], readMin: [6, 12], difficulty: "All" },
  "Cheat Sheet": { blurb: (t) => `The essential ${t} syntax, patterns, and gotchas on a single, printable reference sheet.`, pages: [2, 4], readMin: [3, 6], difficulty: "All" },
  "Interview Questions": { blurb: (t) => `Curated interview questions for ${t} with layered hints and detailed model answers.`, pages: [30, 60], readMin: [25, 45], difficulty: "Intermediate" },
  "Practice Questions": { blurb: (t) => `A themed practice set for ${t} with progressive difficulty and worked solutions.`, pages: [20, 40], readMin: [20, 35], difficulty: "All" },
  "Answer Key": { blurb: (t) => `Fully worked answers and rubric-based explanations for the ${t} practice set.`, pages: [24, 48], readMin: [20, 35], difficulty: "All" },
  "Sample Exercises": { blurb: (t) => `Warm-up and applied exercises for ${t}, grouped by concept for spaced practice.`, pages: [18, 34], readMin: [15, 25], difficulty: "Beginner" },
  "Project Guide": { blurb: (t) => `A hands-on project brief for ${t}: requirements, milestones, and a review checklist.`, pages: [16, 30], readMin: [15, 25], difficulty: "Intermediate" },
  "Project Case Study": { blurb: (t) => `A production project built with ${t} — background, architecture, decisions, and outcomes.`, pages: [24, 48], readMin: [20, 30], difficulty: "Intermediate" },
  "Real-world Case Study": { blurb: (t) => `How a real team applied ${t} to a business problem — problem, solution, and lessons learned.`, pages: [18, 36], readMin: [15, 25], difficulty: "Intermediate" },
  "Best Practices": { blurb: (t) => `The battle-tested patterns, conventions, and defaults that make ${t} projects maintainable.`, pages: [12, 24], readMin: [12, 20], difficulty: "Intermediate" },
  "Common Mistakes": { blurb: (t) => `The most frequent ${t} mistakes, why they happen, and how to fix them for good.`, pages: [10, 20], readMin: [10, 16], difficulty: "All" },
  "Frequently Asked Questions": { blurb: (t) => `The most-asked questions about ${t}, answered clearly with examples.`, pages: [8, 16], readMin: [8, 14], difficulty: "All" },
  "Learning Roadmap": { blurb: (t) => `A visual roadmap for ${t} — what to learn, in what order, and how to know you're ready.`, pages: [6, 12], readMin: [6, 10], difficulty: "All" },
  "Tips & Tricks": { blurb: (t) => `Practical productivity tips, keyboard flows, and shortcuts for working faster with ${t}.`, pages: [8, 16], readMin: [8, 12], difficulty: "All" },
  "Advanced Concepts": { blurb: (t) => `A deep dive into the advanced corners of ${t}: internals, edge cases, and expert patterns.`, pages: [30, 60], readMin: [25, 40], difficulty: "Advanced" },
  "Glossary": { blurb: (t) => `A comprehensive glossary of ${t} terms, acronyms, and concepts with plain-language definitions.`, pages: [10, 22], readMin: [8, 15], difficulty: "All" },
  "Reference Guide": { blurb: (t) => `A dense, lookup-optimized reference for ${t} APIs, syntax, and configuration.`, pages: [40, 90], readMin: [30, 60], difficulty: "All" },
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"];

export type CourseResource = {
  id: string;
  courseSlug: string;
  kind: ResourceKind;
  title: string;
  summary: string;
  pages: number;
  readingMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All";
  lastUpdated: string;
  tags: string[];
  gradient: string;
};

function pick<T>(arr: T[], seed: number) {
  return arr[seed % arr.length];
}

function inRange([lo, hi]: [number, number], seed: number) {
  return lo + (seed % (hi - lo + 1));
}

export function buildCourseResources(course: CourseCatalogEntry): CourseResource[] {
  return RESOURCE_KINDS.map((kind) => {
    const meta = KIND_META[kind];
    const seed = hash(`${course.slug}::${kind}`);
    const pages = inRange(meta.pages, seed);
    const readingMinutes = inRange(meta.readMin, seed >> 3);
    const month = pick(MONTHS, seed >> 5);
    const year = 2026;
    return {
      id: `${course.slug}--${kind.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      courseSlug: course.slug,
      kind,
      title: `${course.title} — ${kind}`,
      summary: meta.blurb(course.title),
      pages,
      readingMinutes,
      difficulty: meta.difficulty === "All" ? "Beginner" : meta.difficulty,
      lastUpdated: `${month} ${year}`,
      tags: [course.category, ...course.tags.slice(0, 2), kind],
      gradient: course.gradient,
    };
  });
}

// Reader routes physically implemented under src/routes/_marketing.resources.read.*
// Keyed by resource id (`<courseSlug>--<kind-slug>`). Add entries here as new
// dedicated reader pages are built.
const READER_ROUTES: Record<string, string> = {
  "artificial-intelligence--beginner-guide": "/resources/read/ai-beginner-guide",
  "artificial-intelligence--complete-tutorial": "/resources/read/ai-complete-tutorial",
  "artificial-intelligence--step-by-step-learning-guide": "/resources/read/ai-step-by-step-learning-guide",
  "artificial-intelligence--pdf-notes": "/resources/read/ai-pdf-notes",
  "artificial-intelligence--quick-revision-notes": "/resources/read/ai-quick-revision-notes",
  "artificial-intelligence--cheat-sheet": "/resources/read/ai-cheat-sheet",
  "artificial-intelligence--interview-questions": "/resources/read/ai-interview-questions",
  "artificial-intelligence--practice-questions": "/resources/read/ai-practice-questions",
  "artificial-intelligence--answer-key": "/resources/read/ai-answer-key",
  "artificial-intelligence--sample-exercises": "/resources/read/ai-sample-exercises",
  "artificial-intelligence--project-guide": "/resources/read/ai-project-guide",
  "artificial-intelligence--project-case-study": "/resources/read/ai-project-case-study",
  "artificial-intelligence--real-world-case-study": "/resources/read/ai-real-world-case-study",
  "artificial-intelligence--best-practices": "/resources/read/ai-best-practices",
  "artificial-intelligence--common-mistakes": "/resources/read/ai-common-mistakes",
  "artificial-intelligence--frequently-asked-questions": "/resources/read/ai-frequently-asked-questions",
  "artificial-intelligence--learning-roadmap": "/resources/read/ai-learning-roadmap",
  "artificial-intelligence--tips-tricks": "/resources/read/ai-tips-tricks",
  "artificial-intelligence--advanced-concepts": "/resources/read/ai-advanced-concepts",
  "artificial-intelligence--glossary": "/resources/read/ai-glossary",
  "artificial-intelligence--reference-guide": "/resources/read/ai-reference-guide",
  "machine-learning--beginner-guide": "/resources/read/ml-beginner-guide",
  "machine-learning--complete-tutorial": "/resources/read/ml-complete-tutorial",
  "machine-learning--step-by-step-learning-guide": "/resources/read/ml-step-by-step-learning-guide",
  "machine-learning--pdf-notes": "/resources/read/ml-pdf-notes",
  "machine-learning--quick-revision-notes": "/resources/read/ml-quick-revision-notes",
  "machine-learning--cheat-sheet": "/resources/read/ml-cheat-sheet",
  "machine-learning--interview-questions": "/resources/read/ml-interview-questions",
  "machine-learning--practice-questions": "/resources/read/ml-practice-questions",
  "machine-learning--answer-key": "/resources/read/ml-answer-key",
  "machine-learning--sample-exercises": "/resources/read/ml-sample-exercises",
  "machine-learning--project-guide": "/resources/read/ml-project-guide",
  "machine-learning--project-case-study": "/resources/read/ml-project-case-study",
  "machine-learning--real-world-case-study": "/resources/read/ml-real-world-case-study",
  "machine-learning--best-practices": "/resources/read/ml-best-practices",
  "machine-learning--common-mistakes": "/resources/read/ml-common-mistakes",
  "machine-learning--frequently-asked-questions": "/resources/read/ml-frequently-asked-questions",
  "machine-learning--learning-roadmap": "/resources/read/ml-learning-roadmap",
  "machine-learning--tips-tricks": "/resources/read/ml-tips-tricks",
  "machine-learning--advanced-concepts": "/resources/read/ml-advanced-concepts",
  "machine-learning--glossary": "/resources/read/ml-glossary",
  "machine-learning--reference-guide": "/resources/read/ml-reference-guide",
  "deep-learning--advanced-concepts": "/resources/read/dl-advanced-concepts",
  "deep-learning--glossary": "/resources/read/dl-glossary",
  "deep-learning--reference-guide": "/resources/read/dl-reference-guide",
  "deep-learning--frequently-asked-questions": "/resources/read/dl-frequently-asked-questions",
  "deep-learning--learning-roadmap": "/resources/read/dl-learning-roadmap",
  "deep-learning--tips-tricks": "/resources/read/dl-tips-tricks",
  "deep-learning--real-world-case-study": "/resources/read/dl-real-world-case-study",
  "deep-learning--best-practices": "/resources/read/dl-best-practices",
  "deep-learning--common-mistakes": "/resources/read/dl-common-mistakes",
  "deep-learning--interview-questions": "/resources/read/dl-interview-questions",
  "deep-learning--practice-questions": "/resources/read/dl-practice-questions",
  "deep-learning--answer-key": "/resources/read/dl-answer-key",
  "deep-learning--sample-exercises": "/resources/read/dl-sample-exercises",
  "deep-learning--project-guide": "/resources/read/dl-project-guide",
  "deep-learning--project-case-study": "/resources/read/dl-project-case-study",
  "deep-learning--beginner-guide": "/resources/read/dl-beginner-guide",
  "deep-learning--complete-tutorial": "/resources/read/dl-complete-tutorial",
  "deep-learning--step-by-step-learning-guide": "/resources/read/dl-step-by-step-learning-guide",
  "deep-learning--pdf-notes": "/resources/read/dl-pdf-notes",
  "deep-learning--quick-revision-notes": "/resources/read/dl-quick-revision-notes",
  "deep-learning--cheat-sheet": "/resources/read/dl-cheat-sheet",
  "generative-ai--beginner-guide": "/resources/read/genai-beginner-guide",





};

export function getResourceReaderPath(id: string): string | null {
  return READER_ROUTES[id] ?? null;
}

