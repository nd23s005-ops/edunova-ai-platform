import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  BookOpen,
  Presentation,
  ScrollText,
  FileQuestion,
  Video,
  Code2,
  Library,
  Layers,
  Newspaper,
  BookMarked,
  Download,
  Star,
  Clock,
  Bookmark,
  BookmarkCheck,
  Share2,
  Eye,
  TrendingUp,
  Filter,
  Sparkles,
  ArrowRight,
  Tag,
  History,
  FolderHeart,
  Brain,
  Cloud,
  ShieldCheck,
  Briefcase,
  Database,
  GraduationCap,
  FileSearch,
} from "lucide-react";

const TITLE = "Resources — EduNova AI";
const DESCRIPTION =
  "Access high-quality learning materials, study guides, practice resources, and educational content in one place.";

export const Route = createFileRoute("/_marketing/resources")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type ResourceType =
  | "PDF Notes"
  | "Study Material"
  | "E-Book"
  | "Presentation"
  | "Cheat Sheet"
  | "Question Paper"
  | "Question Bank"
  | "Video Tutorial"
  | "Coding Resource"
  | "Documentation"
  | "Case Study"
  | "Research Paper";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface Resource {
  id: string;
  title: string;
  category: string;
  type: ResourceType;
  author: string;
  readingTime: string;
  downloads: number;
  rating: number;
  updated: string;
  uploaded: string;
  size: string;
  difficulty: Difficulty;
  language: string;
  cover: string; // gradient class
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  description: string;
}

const gradients = [
  "from-primary/80 via-primary/40 to-accent/60",
  "from-fuchsia-500/70 via-purple-500/40 to-indigo-500/60",
  "from-emerald-500/70 via-teal-500/40 to-cyan-500/60",
  "from-orange-500/70 via-amber-500/40 to-rose-500/60",
  "from-sky-500/70 via-blue-500/40 to-indigo-500/60",
  "from-rose-500/70 via-pink-500/40 to-fuchsia-500/60",
];

const RESOURCES: Resource[] = [
  {
    id: "r1",
    title: "Complete Guide to Data Structures & Algorithms",
    category: "Programming",
    type: "E-Book",
    author: "Prof. Ananya Sharma",
    readingTime: "8h read",
    downloads: 24580,
    rating: 4.9,
    updated: "2026-07-02",
    uploaded: "2025-11-10",
    size: "18.4 MB",
    difficulty: "Intermediate",
    language: "English",
    cover: gradients[0],
    tags: ["DSA", "Python", "Interview"],
    featured: true,
    trending: true,
    description:
      "A comprehensive walkthrough of arrays, trees, graphs, dynamic programming, and system design fundamentals with 250+ solved problems.",
  },
  {
    id: "r2",
    title: "Machine Learning Cheat Sheet — 2026 Edition",
    category: "Artificial Intelligence",
    type: "Cheat Sheet",
    author: "Dr. Rahul Verma",
    readingTime: "20 min read",
    downloads: 18320,
    rating: 4.8,
    updated: "2026-06-18",
    uploaded: "2026-01-05",
    size: "3.1 MB",
    difficulty: "Intermediate",
    language: "English",
    cover: gradients[1],
    tags: ["MachineLearning", "AI", "DataScience"],
    featured: true,
    trending: true,
    description:
      "Every core ML algorithm, formula, and evaluation metric on a single, printable reference — updated with 2026 model families.",
  },
  {
    id: "r3",
    title: "Class 12 Physics — Board Exam Question Bank",
    category: "School",
    type: "Question Bank",
    author: "EduNova Editorial",
    readingTime: "6h practice",
    downloads: 15990,
    rating: 4.7,
    updated: "2026-05-22",
    uploaded: "2025-09-14",
    size: "9.8 MB",
    difficulty: "Advanced",
    language: "English",
    cover: gradients[2],
    tags: ["Physics", "BoardExam", "Class12"],
    featured: true,
    description:
      "1,200+ solved and unsolved problems across all CBSE, ICSE, and State Board patterns with step-by-step solutions.",
  },
  {
    id: "r4",
    title: "React 19 — Production Patterns",
    category: "Web Development",
    type: "PDF Notes",
    author: "Kiran Malhotra",
    readingTime: "2h read",
    downloads: 12440,
    rating: 4.8,
    updated: "2026-07-10",
    uploaded: "2026-04-01",
    size: "6.2 MB",
    difficulty: "Advanced",
    language: "English",
    cover: gradients[3],
    tags: ["React", "Frontend", "TypeScript"],
    featured: true,
    trending: true,
    description:
      "Suspense, Server Components, Actions, and concurrent rendering — patterns proven at scale, with real production code.",
  },
  {
    id: "r5",
    title: "AWS Solutions Architect — Full Study Notes",
    category: "Cloud Computing",
    type: "Study Material",
    author: "Devanath Iyer",
    readingTime: "12h read",
    downloads: 9870,
    rating: 4.7,
    updated: "2026-06-01",
    uploaded: "2025-12-11",
    size: "22.5 MB",
    difficulty: "Advanced",
    language: "English",
    cover: gradients[4],
    tags: ["Cloud", "AWS", "Interview"],
    trending: true,
    description:
      "End-to-end preparation notes for the SAA-C03 exam with architecture diagrams, cost models, and 400+ practice questions.",
  },
  {
    id: "r6",
    title: "Introduction to Neural Networks",
    category: "Artificial Intelligence",
    type: "Video Tutorial",
    author: "Prof. Neha Kulkarni",
    readingTime: "4h video",
    downloads: 8620,
    rating: 4.9,
    updated: "2026-07-05",
    uploaded: "2026-02-20",
    size: "1.2 GB",
    difficulty: "Beginner",
    language: "English",
    cover: gradients[5],
    tags: ["AI", "DeepLearning", "Python"],
    trending: true,
    description:
      "Learn how neurons, activations, and backpropagation actually work — visual, code-along lessons with PyTorch.",
  },
  {
    id: "r7",
    title: "JEE Main — Previous 10 Years Papers",
    category: "Exam Preparation",
    type: "Question Paper",
    author: "EduNova Editorial",
    readingTime: "20h practice",
    downloads: 14210,
    rating: 4.8,
    updated: "2026-04-14",
    uploaded: "2025-08-01",
    size: "34.6 MB",
    difficulty: "Advanced",
    language: "English",
    cover: gradients[0],
    tags: ["JEE", "Physics", "Chemistry", "Math"],
    description:
      "Every JEE Main paper from 2016 to 2025 with detailed solutions, topic tagging, and difficulty analysis.",
  },
  {
    id: "r8",
    title: "System Design Interview — Playbook",
    category: "Career Development",
    type: "E-Book",
    author: "Arjun Bhatia",
    readingTime: "5h read",
    downloads: 7340,
    rating: 4.9,
    updated: "2026-06-28",
    uploaded: "2026-03-15",
    size: "11.9 MB",
    difficulty: "Advanced",
    language: "English",
    cover: gradients[1],
    tags: ["Interview", "SystemDesign", "Backend"],
    description:
      "Frameworks for scaling reads, writes, caches, and queues — walked through with 12 end-to-end case studies.",
  },
  {
    id: "r9",
    title: "Python for Data Science — Starter Kit",
    category: "Data Science",
    type: "PDF Notes",
    author: "Priya Nair",
    readingTime: "3h read",
    downloads: 11020,
    rating: 4.6,
    updated: "2026-05-30",
    uploaded: "2025-10-05",
    size: "7.4 MB",
    difficulty: "Beginner",
    language: "English",
    cover: gradients[2],
    tags: ["Python", "DataScience", "Pandas"],
    description:
      "NumPy, Pandas, Matplotlib — the exact toolkit used by data teams, with 60+ notebooks you can run today.",
  },
  {
    id: "r10",
    title: "Cyber Security Fundamentals",
    category: "Cyber Security",
    type: "Presentation",
    author: "Vikram Rao",
    readingTime: "1h read",
    downloads: 5810,
    rating: 4.5,
    updated: "2026-04-02",
    uploaded: "2026-01-18",
    size: "12.3 MB",
    difficulty: "Beginner",
    language: "English",
    cover: gradients[3],
    tags: ["CyberSecurity", "Networking"],
    description:
      "A visual introduction to threat models, cryptography, and secure system design for teams and learners.",
  },
  {
    id: "r11",
    title: "TypeScript Handbook — Applied",
    category: "Programming",
    type: "Documentation",
    author: "Kiran Malhotra",
    readingTime: "2.5h read",
    downloads: 6640,
    rating: 4.7,
    updated: "2026-06-08",
    uploaded: "2026-02-11",
    size: "4.8 MB",
    difficulty: "Intermediate",
    language: "English",
    cover: gradients[4],
    tags: ["TypeScript", "React", "Java"],
    description:
      "Generics, conditional types, template literals, and inference deep-dives — with real-world API examples.",
  },
  {
    id: "r12",
    title: "Case Study: How Netflix Personalises at Scale",
    category: "Data Science",
    type: "Case Study",
    author: "EduNova Research",
    readingTime: "45 min read",
    downloads: 3980,
    rating: 4.6,
    updated: "2026-07-01",
    uploaded: "2026-05-20",
    size: "2.6 MB",
    difficulty: "Intermediate",
    language: "English",
    cover: gradients[5],
    tags: ["MachineLearning", "AI", "Recommendation"],
    description:
      "How ranking, retrieval, and A/B experimentation come together to personalise 260M+ user experiences.",
  },
  {
    id: "r13",
    title: "Research Paper — Transformers Beyond Language",
    category: "Artificial Intelligence",
    type: "Research Paper",
    author: "Dr. Rahul Verma",
    readingTime: "40 min read",
    downloads: 2810,
    rating: 4.4,
    updated: "2026-05-11",
    uploaded: "2026-04-04",
    size: "1.8 MB",
    difficulty: "Advanced",
    language: "English",
    cover: gradients[0],
    tags: ["AI", "Research", "MachineLearning"],
    description:
      "A survey of how transformer architectures now power vision, audio, and multimodal reasoning systems.",
  },
  {
    id: "r14",
    title: "Frontend Interview — 200 Coding Questions",
    category: "Career Development",
    type: "Question Bank",
    author: "Arjun Bhatia",
    readingTime: "10h practice",
    downloads: 8210,
    rating: 4.7,
    updated: "2026-06-25",
    uploaded: "2026-03-02",
    size: "8.1 MB",
    difficulty: "Intermediate",
    language: "English",
    cover: gradients[1],
    tags: ["Interview", "React", "JavaScript"],
    description:
      "DOM, closures, event loops, React internals, and CSS layout — every question a serious frontend interview asks.",
  },
  {
    id: "r15",
    title: "Docker & Kubernetes Coding Kit",
    category: "Cloud Computing",
    type: "Coding Resource",
    author: "Devanath Iyer",
    readingTime: "3h practice",
    downloads: 5220,
    rating: 4.6,
    updated: "2026-07-04",
    uploaded: "2026-01-27",
    size: "14.2 MB",
    difficulty: "Intermediate",
    language: "English",
    cover: gradients[2],
    tags: ["Cloud", "DevOps", "Docker"],
    description:
      "Hands-on manifests, Dockerfiles, and Helm charts you can lift into your own projects — with commented examples.",
  },
];

const CATEGORIES: {
  name: ResourceType;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
}[] = [
  { name: "PDF Notes", icon: FileText, hint: "Concise revision notes" },
  { name: "Study Material", icon: BookOpen, hint: "Full-topic study kits" },
  { name: "E-Book", icon: Library, hint: "Long-form learning" },
  { name: "Presentation", icon: Presentation, hint: "Visual decks & slides" },
  { name: "Cheat Sheet", icon: ScrollText, hint: "Quick formula recall" },
  { name: "Question Paper", icon: FileQuestion, hint: "Previous year papers" },
  { name: "Question Bank", icon: BookMarked, hint: "Solved problem sets" },
  { name: "Video Tutorial", icon: Video, hint: "Watch & code along" },
  { name: "Coding Resource", icon: Code2, hint: "Starter kits & repos" },
  { name: "Documentation", icon: Layers, hint: "Deep API references" },
  { name: "Case Study", icon: Briefcase, hint: "Real-world breakdowns" },
  { name: "Research Paper", icon: Newspaper, hint: "Peer-reviewed insight" },
];

const COLLECTIONS = [
  { name: "Exam Preparation", icon: GraduationCap, count: 128, tone: gradients[0] },
  { name: "Programming", icon: Code2, count: 214, tone: gradients[1] },
  { name: "Artificial Intelligence", icon: Brain, count: 96, tone: gradients[2] },
  { name: "Data Science", icon: Database, count: 84, tone: gradients[3] },
  { name: "Cloud Computing", icon: Cloud, count: 71, tone: gradients[4] },
  { name: "Web Development", icon: Layers, count: 158, tone: gradients[5] },
  { name: "Cyber Security", icon: ShieldCheck, count: 42, tone: gradients[0] },
  { name: "Career Development", icon: Briefcase, count: 63, tone: gradients[1] },
];

const ARTICLES = [
  {
    title: "How AI Learning Twin adapts to every student",
    minutes: 6,
    to: "/features/learning-twin" as const,
    tag: "AI Feature",
  },
  {
    title: "Knowledge Gap Mapper — closing what you don't know",
    minutes: 5,
    to: "/features/learning-twin" as const,
    tag: "Study Science",
  },
  {
    title: "Smart Analytics: reading your own progress",
    minutes: 4,
    to: "/features/learning-twin" as const,
    tag: "Analytics",
  },
  {
    title: "10 learning strategies backed by cognitive science",
    minutes: 8,
    to: "/features/learning-twin" as const,
    tag: "Learning",
  },
  {
    title: "The last-2-weeks exam preparation playbook",
    minutes: 7,
    to: "/features/learning-twin" as const,
    tag: "Exams",
  },
  {
    title: "Study tips: focus, retention, and honest review",
    minutes: 5,
    to: "/features/learning-twin" as const,
    tag: "Habits",
  },
];

const POPULAR_TAGS = [
  "Python",
  "Java",
  "React",
  "MachineLearning",
  "AI",
  "DataScience",
  "Cloud",
  "CyberSecurity",
  "DSA",
  "Interview",
];

const RESOURCE_TYPES: ResourceType[] = [
  "PDF Notes",
  "Study Material",
  "E-Book",
  "Presentation",
  "Cheat Sheet",
  "Question Paper",
  "Question Bank",
  "Video Tutorial",
  "Coding Resource",
  "Documentation",
  "Case Study",
  "Research Paper",
];

// ---------------------------------------------------------------------------
// Local persistence hooks
// ---------------------------------------------------------------------------

function useLocalSet(key: string) {
  const [set, setSet] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setSet(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* noop */
    }
  }, [key]);
  const toggle = (id: string) => {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        /* noop */
      }
      return next;
    });
  };
  const add = (id: string) => {
    setSet((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {
        /* noop */
      }
      return next;
    });
  };
  return { set, toggle, add };
}

function useRecentList(key: string, max = 6) {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setList(JSON.parse(raw) as string[]);
    } catch {
      /* noop */
    }
  }, [key]);
  const push = (id: string) => {
    setList((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, max);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  };
  return { list, push };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDownloads(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function shareResource(r: Resource) {
  const url = `${window.location.origin}/resources#${r.id}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: r.title, text: r.description, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  } catch {
    /* user cancelled */
  }
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

interface CardProps {
  r: Resource;
  bookmarked: boolean;
  onBookmark: (id: string) => void;
  onOpen: (id: string) => void;
}

function ResourceCard({ r, bookmarked, onBookmark, onOpen }: CardProps) {
  return (
    <motion.article
      id={r.id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
    >
      <button
        type="button"
        onClick={() => onOpen(r.id)}
        className="relative block h-40 w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Preview ${r.title}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${r.cover}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge className="border-white/30 bg-white/15 text-white backdrop-blur">{r.type}</Badge>
          {r.trending && (
            <Badge className="border-white/30 bg-white/15 text-white backdrop-blur">
              <TrendingUp className="mr-1 h-3 w-3" /> Trending
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current" />
            {r.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />
            {formatDownloads(r.downloads)}
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {r.category}
            </p>
            <h3 className="mt-1 text-base font-semibold leading-snug">
              <button
                type="button"
                onClick={() => onOpen(r.id)}
                className="text-left transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                {r.title}
              </button>
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-pressed={bookmarked}
            aria-label={bookmarked ? "Remove bookmark" : "Save resource"}
            onClick={() => onBookmark(r.id)}
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{r.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {r.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span className="truncate">By {r.author}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {r.readingTime}
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground">
          Updated {formatDate(r.updated)} • {r.size}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button size="sm" className="flex-1" onClick={() => onOpen(r.id)}>
            <Eye className="mr-1.5 h-4 w-4" /> Preview
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpen(r.id)}
            aria-label={`Download ${r.title}`}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            aria-label="Share resource"
            onClick={() => shareResource(r)}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Details modal
// ---------------------------------------------------------------------------

function DetailsModal({
  resource,
  onClose,
  bookmarked,
  onBookmark,
}: {
  resource: Resource | null;
  onClose: () => void;
  bookmarked: boolean;
  onBookmark: (id: string) => void;
}) {
  useEffect(() => {
    if (!resource) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resource, onClose]);

  if (!resource) return null;
  const objectives = [
    `Master the core concepts behind ${resource.category.toLowerCase()}.`,
    `Practise using worked examples and guided exercises.`,
    `Apply what you learn to real problems and assessments.`,
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-0 backdrop-blur sm:items-center sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-border/60 bg-card shadow-elegant sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative h-40 bg-gradient-to-br ${resource.cover}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <Badge className="border-white/30 bg-white/15 text-white backdrop-blur">{resource.type}</Badge>
            <Badge className="border-white/30 bg-white/15 text-white backdrop-blur">
              {resource.difficulty}
            </Badge>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur transition hover:bg-white/30"
            aria-label="Close details"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {resource.category}
          </p>
          <h2 id="resource-title" className="mt-1 text-2xl font-semibold">
            {resource.title}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{resource.description}</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Learning objectives</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {objectives.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 text-sm font-semibold">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {resource.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Resource information</h3>
              <dl className="mt-2 space-y-2 text-sm">
                <Info label="Author" value={resource.author} />
                <Info label="Category" value={resource.category} />
                <Info label="Difficulty" value={resource.difficulty} />
                <Info label="Language" value={resource.language} />
                <Info label="File size" value={resource.size} />
                <Info label="Uploaded" value={formatDate(resource.uploaded)} />
                <Info label="Updated" value={formatDate(resource.updated)} />
                <Info label="Rating" value={`${resource.rating.toFixed(1)} / 5`} />
                <Info label="Downloads" value={formatDownloads(resource.downloads)} />
              </dl>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button className="flex-1 sm:flex-none">
              <Eye className="mr-1.5 h-4 w-4" /> Preview
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Download className="mr-1.5 h-4 w-4" /> Download
            </Button>
            <Button
              variant="outline"
              onClick={() => onBookmark(resource.id)}
              aria-pressed={bookmarked}
            >
              {bookmarked ? (
                <>
                  <BookmarkCheck className="mr-1.5 h-4 w-4 text-primary" /> Bookmarked
                </>
              ) : (
                <>
                  <Bookmark className="mr-1.5 h-4 w-4" /> Bookmark
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => shareResource(resource)}>
              <Share2 className="mr-1.5 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/40 pb-1.5 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sort, setSort] = useState<string>("popularity");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const bookmarks = useLocalSet("edunova:resources:bookmarks");
  const recent = useRecentList("edunova:resources:recent");
  const downloads = useRecentList("edunova:resources:downloads");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = RESOURCES.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (difficulty !== "all" && r.difficulty !== difficulty) return false;
      if (activeTag && !r.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    if (sort === "popularity") list = [...list].sort((a, b) => b.downloads - a.downloads);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "recent")
      list = [...list].sort(
        (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime(),
      );
    return list;
  }, [query, typeFilter, difficulty, sort, activeTag]);

  const featured = useMemo(() => RESOURCES.filter((r) => r.featured), []);
  const trending = useMemo(
    () => [...RESOURCES].filter((r) => r.trending).sort((a, b) => b.downloads - a.downloads),
    [],
  );
  const recentlyAdded = useMemo(
    () =>
      [...RESOURCES]
        .sort((a, b) => new Date(b.uploaded).getTime() - new Date(a.uploaded).getTime())
        .slice(0, 4),
    [],
  );

  const recommended = useMemo(() => {
    const byType: Record<string, Resource | undefined> = {};
    for (const r of RESOURCES) {
      if (!byType[r.type]) byType[r.type] = r;
    }
    return [
      byType["PDF Notes"],
      byType["Video Tutorial"],
      byType["Case Study"] ?? byType["Research Paper"],
      byType["Question Paper"] ?? byType["Question Bank"],
    ].filter((x): x is Resource => Boolean(x));
  }, []);

  const bookmarkedList = useMemo(
    () => RESOURCES.filter((r) => bookmarks.set.has(r.id)),
    [bookmarks.set],
  );
  const recentList = useMemo(
    () =>
      recent.list
        .map((id) => RESOURCES.find((r) => r.id === id))
        .filter((x): x is Resource => Boolean(x)),
    [recent.list],
  );
  const downloadList = useMemo(
    () =>
      downloads.list
        .map((id) => RESOURCES.find((r) => r.id === id))
        .filter((x): x is Resource => Boolean(x)),
    [downloads.list],
  );

  const openResource = (id: string) => {
    setOpenId(id);
    recent.push(id);
    downloads.push(id);
  };

  const openById = openId ? RESOURCES.find((r) => r.id === openId) ?? null : null;

  return (
    <>
      <PageHeader
        eyebrow="Resource Library"
        title={
          <>
            Your <span className="text-gradient">learning library</span>, in one place
          </>
        }
        description={DESCRIPTION}
      />

      {/* Search + Filters */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-card sm:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, author, subject, or tag…"
                className="h-11 pl-9"
                aria-label="Search resources"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-11" aria-label="Filter by resource type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {RESOURCE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="h-11" aria-label="Filter by difficulty">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any level</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-11" aria-label="Sort resources">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most downloaded</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                  <SelectItem value="recent">Recently updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(activeTag || query || typeFilter !== "all" || difficulty !== "all") && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              <span>Active filters:</span>
              {activeTag && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setActiveTag(null)}>
                  #{activeTag} ✕
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setTypeFilter("all")}>
                  {typeFilter} ✕
                </Badge>
              )}
              {difficulty !== "all" && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setDifficulty("all")}>
                  {difficulty} ✕
                </Badge>
              )}
              {query && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => setQuery("")}>
                  "{query}" ✕
                </Badge>
              )}
              <button
                type="button"
                className="ml-auto text-xs underline underline-offset-2 hover:text-foreground"
                onClick={() => {
                  setActiveTag(null);
                  setTypeFilter("all");
                  setDifficulty("all");
                  setQuery("");
                }}
              >
                Clear all
              </button>
            </div>
          )}

          {/* Category quick nav */}
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                typeFilter === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 hover:border-primary/60 hover:text-primary"
              }`}
            >
              All
            </button>
            {RESOURCE_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  typeFilter === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/60 hover:border-primary/60 hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Recently added + trending previews */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" /> Recently added
            </div>
            <ul className="space-y-2 text-sm">
              {recentlyAdded.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => openResource(r.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-muted"
                  >
                    <span className="truncate">{r.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(r.uploaded)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="h-4 w-4 text-primary" /> Trending now
            </div>
            <ul className="space-y-2 text-sm">
              {trending.slice(0, 4).map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => openResource(r.id)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-muted"
                  >
                    <span className="truncate">{r.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDownloads(r.downloads)} ↓
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Featured */}
      <Section>
        <SectionHeading
          eyebrow="Featured"
          title="Premium learning materials"
          subtitle="Hand-picked resources our learners return to again and again."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((r) => (
            <ResourceCard
              key={r.id}
              r={r}
              bookmarked={bookmarks.set.has(r.id)}
              onBookmark={bookmarks.toggle}
              onOpen={openResource}
            />
          ))}
        </div>
      </Section>

      {/* Categories */}
      <Section>
        <SectionHeading
          eyebrow="Resource Categories"
          title="Browse by format"
          subtitle="Every category is curated, tagged, and continuously refreshed."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setTypeFilter(c.name)}
              className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 text-left shadow-card transition hover:-translate-y-1 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{c.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.hint}</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </Section>

      {/* Trending */}
      <Section>
        <SectionHeading
          eyebrow="Trending"
          title="Most popular right now"
          subtitle="The resources learners are downloading most this week."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((r) => (
            <ResourceCard
              key={r.id}
              r={r}
              bookmarked={bookmarks.set.has(r.id)}
              onBookmark={bookmarks.toggle}
              onOpen={openResource}
            />
          ))}
        </div>
      </Section>

      {/* Recommended */}
      <Section>
        <SectionHeading
          eyebrow="Recommended for you"
          title="Picks based on your interests"
          subtitle="A curated mix of PDFs, videos, articles, and practice papers."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((r) => (
            <ResourceCard
              key={r.id}
              r={r}
              bookmarked={bookmarks.set.has(r.id)}
              onBookmark={bookmarks.toggle}
              onOpen={openResource}
            />
          ))}
        </div>
      </Section>

      {/* All results (advanced search output) */}
      <Section>
        <SectionHeading
          eyebrow="All Resources"
          title="Advanced search"
          subtitle={`${filtered.length} result${filtered.length === 1 ? "" : "s"} match your filters.`}
        />
        {filtered.length === 0 ? (
          <EmptyState
            onSuggest={(name) => {
              setTypeFilter(name);
              setQuery("");
              setActiveTag(null);
              setDifficulty("all");
            }}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((r) => (
              <ResourceCard
                key={r.id}
                r={r}
                bookmarked={bookmarks.set.has(r.id)}
                onBookmark={bookmarks.toggle}
                onOpen={openResource}
              />
            ))}
          </div>
        )}
      </Section>

      {/* Bookmarks & Recently viewed & Downloads */}
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <PersonalPanel
            icon={FolderHeart}
            title="Your bookmarks"
            emptyLabel="Bookmark resources to build your own study shelf."
            items={bookmarkedList}
            onOpen={openResource}
            onSecondary={bookmarks.toggle}
            secondaryLabel="Remove"
          />
          <PersonalPanel
            icon={History}
            title="Recently viewed"
            emptyLabel="Preview a resource to see it appear here."
            items={recentList}
            onOpen={openResource}
          />
          <PersonalPanel
            icon={Download}
            title="Download history"
            emptyLabel="Your downloads will appear here so you can grab them again."
            items={downloadList}
            onOpen={openResource}
            secondaryLabel="Download again"
          />
        </div>
      </Section>

      {/* Collections */}
      <Section>
        <SectionHeading
          eyebrow="Collections"
          title="Curated learning tracks"
          subtitle="Bundled resources built around outcomes, not topics."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((c) => (
            <div
              key={c.name}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div
                className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${c.tone} opacity-40 blur-2xl`}
              />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 text-base font-semibold">{c.name}</h3>
              <p className="relative mt-1 text-xs text-muted-foreground">
                {c.count} curated resources
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Articles */}
      <Section>
        <SectionHeading
          eyebrow="Learning Articles"
          title="Read, learn, and level up"
          subtitle="Short reads on how EduNova AI helps you learn better."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link
              key={a.title}
              to={a.to}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <Badge variant="secondary" className="w-fit">
                {a.tag}
              </Badge>
              <h3 className="mt-3 text-base font-semibold leading-snug group-hover:text-primary">
                {a.title}
              </h3>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {a.minutes} min read
                </span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Popular Tags */}
      <Section>
        <SectionHeading
          eyebrow="Popular Tags"
          title="Jump to a topic"
          subtitle="Click any tag to filter the library instantly."
        />
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTag(activeTag === t ? null : t)}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm transition ${
                activeTag === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 hover:border-primary/60 hover:text-primary"
              }`}
            >
              <Tag className="h-3.5 w-3.5" />#{t}
            </button>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 shadow-elegant sm:p-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Keep learning
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Turn resources into real progress
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore more materials, continue where you left off, or join a community of
                learners preparing alongside you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/explore">
                  Explore more <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">Continue learning</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/community">Join the community</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <DetailsModal
        resource={openById}
        onClose={() => setOpenId(null)}
        bookmarked={openById ? bookmarks.set.has(openById.id) : false}
        onBookmark={bookmarks.toggle}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-wide text-primary">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function PersonalPanel({
  icon: Icon,
  title,
  emptyLabel,
  items,
  onOpen,
  onSecondary,
  secondaryLabel,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  emptyLabel: string;
  items: Resource[];
  onOpen: (id: string) => void;
  onSecondary?: (id: string) => void;
  secondaryLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-primary" />
        {title}
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">{emptyLabel}</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.slice(0, 6).map((r) => (
            <li key={r.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpen(r.id)}
                className="flex-1 truncate rounded-lg px-2 py-1.5 text-left transition hover:bg-muted"
              >
                {r.title}
              </button>
              {secondaryLabel && (
                <button
                  type="button"
                  onClick={() => (onSecondary ? onSecondary(r.id) : onOpen(r.id))}
                  className="shrink-0 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                >
                  {secondaryLabel}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EmptyState({ onSuggest }: { onSuggest: (t: ResourceType) => void }) {
  const suggestions: ResourceType[] = ["PDF Notes", "Video Tutorial", "E-Book", "Question Bank"];
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border/60 bg-card p-10 text-center shadow-card">
      <div className="relative grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
        <FileSearch className="h-8 w-8" />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary/60 blur" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No resources found.</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Try a different keyword or explore one of these related categories.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSuggest(s)}
            className="rounded-full border border-border/60 px-3 py-1 text-xs transition hover:border-primary/60 hover:text-primary"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
