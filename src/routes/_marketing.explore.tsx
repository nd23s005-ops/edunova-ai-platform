import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
  Sparkles,
  Brain,
  Cpu,
  Bot,
  MessageSquare,
  Code2,
  Braces,
  FileCode2,
  Terminal,
  Layout,
  Palette,
  Layers,
  Boxes,
  Globe,
  Server,
  Smartphone,
  Database,
  HardDrive,
  BarChart3,
  LineChart,
  PieChart,
  Cloud,
  Container,
  GitBranch,
  ShieldCheck,
  Lock,
  Bug,
  Network,
  Figma,
  PenTool,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Building2,
  Rocket,
  Star,
  Clock,
  TrendingUp,
  ArrowRight,
  Filter,
  Compass,
  Route as RouteIcon,
  Target,
  Zap,
  Trophy,
  Play,
} from "lucide-react";

export const Route = createFileRoute("/_marketing/explore")({
  head: () => ({
    meta: [
      { title: "Explore Courses — EduNova AI" },
      {
        name: "description",
        content:
          "Discover thousands of courses and learning paths across AI, programming, cloud, cyber security, design, and career development.",
      },
      { property: "og:title", content: "Explore Courses — EduNova AI" },
      {
        property: "og:description",
        content:
          "Discover thousands of courses and learning paths across every subject, skill level, and career.",
      },
    ],
  }),
  component: ExplorePage,
});

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

type Cat = {
  name: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
};

const CATEGORIES: Cat[] = [
  // AI
  { name: "Artificial Intelligence", group: "AI & Data", icon: Brain, tint: "from-violet-500/20 to-fuchsia-500/20 text-violet-500" },
  { name: "Machine Learning", group: "AI & Data", icon: Cpu, tint: "from-violet-500/20 to-fuchsia-500/20 text-violet-500" },
  { name: "Deep Learning", group: "AI & Data", icon: Sparkles, tint: "from-violet-500/20 to-fuchsia-500/20 text-violet-500" },
  { name: "Generative AI", group: "AI & Data", icon: Sparkles, tint: "from-violet-500/20 to-fuchsia-500/20 text-violet-500" },
  { name: "Prompt Engineering", group: "AI & Data", icon: MessageSquare, tint: "from-violet-500/20 to-fuchsia-500/20 text-violet-500" },
  { name: "AI Agents", group: "AI & Data", icon: Bot, tint: "from-violet-500/20 to-fuchsia-500/20 text-violet-500" },

  // Programming languages
  { name: "Python", group: "Programming", icon: Code2, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },
  { name: "Java", group: "Programming", icon: Code2, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },
  { name: "C", group: "Programming", icon: Terminal, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },
  { name: "C++", group: "Programming", icon: Terminal, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },
  { name: "JavaScript", group: "Programming", icon: Braces, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },
  { name: "TypeScript", group: "Programming", icon: Braces, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },
  { name: "Go", group: "Programming", icon: FileCode2, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },
  { name: "Rust", group: "Programming", icon: FileCode2, tint: "from-sky-500/20 to-cyan-500/20 text-sky-500" },

  // Web
  { name: "HTML5", group: "Web Development", icon: Layout, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "CSS3", group: "Web Development", icon: Palette, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "Bootstrap", group: "Web Development", icon: Layers, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "Tailwind CSS", group: "Web Development", icon: Layers, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "React.js", group: "Web Development", icon: Boxes, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "Next.js", group: "Web Development", icon: Boxes, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "Angular", group: "Web Development", icon: Boxes, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "Vue.js", group: "Web Development", icon: Boxes, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "Node.js", group: "Web Development", icon: Server, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "Express.js", group: "Web Development", icon: Server, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },
  { name: "MERN Stack", group: "Web Development", icon: Globe, tint: "from-orange-500/20 to-amber-500/20 text-orange-500" },

  // Mobile
  { name: "Flutter", group: "Mobile", icon: Smartphone, tint: "from-emerald-500/20 to-teal-500/20 text-emerald-500" },
  { name: "Android Development", group: "Mobile", icon: Smartphone, tint: "from-emerald-500/20 to-teal-500/20 text-emerald-500" },
  { name: "Kotlin", group: "Mobile", icon: Smartphone, tint: "from-emerald-500/20 to-teal-500/20 text-emerald-500" },
  { name: "Swift (iOS)", group: "Mobile", icon: Smartphone, tint: "from-emerald-500/20 to-teal-500/20 text-emerald-500" },

  // Data / DB
  { name: "SQL", group: "Databases", icon: Database, tint: "from-indigo-500/20 to-blue-500/20 text-indigo-500" },
  { name: "MySQL", group: "Databases", icon: Database, tint: "from-indigo-500/20 to-blue-500/20 text-indigo-500" },
  { name: "PostgreSQL", group: "Databases", icon: Database, tint: "from-indigo-500/20 to-blue-500/20 text-indigo-500" },
  { name: "MongoDB", group: "Databases", icon: HardDrive, tint: "from-indigo-500/20 to-blue-500/20 text-indigo-500" },
  { name: "Firebase", group: "Databases", icon: HardDrive, tint: "from-indigo-500/20 to-blue-500/20 text-indigo-500" },

  // Data Science
  { name: "Data Science", group: "Data & Analytics", icon: BarChart3, tint: "from-pink-500/20 to-rose-500/20 text-pink-500" },
  { name: "Data Analytics", group: "Data & Analytics", icon: LineChart, tint: "from-pink-500/20 to-rose-500/20 text-pink-500" },
  { name: "NumPy", group: "Data & Analytics", icon: PieChart, tint: "from-pink-500/20 to-rose-500/20 text-pink-500" },
  { name: "Pandas", group: "Data & Analytics", icon: PieChart, tint: "from-pink-500/20 to-rose-500/20 text-pink-500" },
  { name: "Statistics", group: "Data & Analytics", icon: BarChart3, tint: "from-pink-500/20 to-rose-500/20 text-pink-500" },
  { name: "Power BI", group: "Data & Analytics", icon: BarChart3, tint: "from-pink-500/20 to-rose-500/20 text-pink-500" },
  { name: "Tableau", group: "Data & Analytics", icon: BarChart3, tint: "from-pink-500/20 to-rose-500/20 text-pink-500" },

  // Cloud & DevOps
  { name: "Cloud Computing", group: "Cloud & DevOps", icon: Cloud, tint: "from-cyan-500/20 to-sky-500/20 text-cyan-500" },
  { name: "AWS", group: "Cloud & DevOps", icon: Cloud, tint: "from-cyan-500/20 to-sky-500/20 text-cyan-500" },
  { name: "Microsoft Azure", group: "Cloud & DevOps", icon: Cloud, tint: "from-cyan-500/20 to-sky-500/20 text-cyan-500" },
  { name: "Google Cloud Platform", group: "Cloud & DevOps", icon: Cloud, tint: "from-cyan-500/20 to-sky-500/20 text-cyan-500" },
  { name: "Docker", group: "Cloud & DevOps", icon: Container, tint: "from-cyan-500/20 to-sky-500/20 text-cyan-500" },
  { name: "Kubernetes", group: "Cloud & DevOps", icon: Container, tint: "from-cyan-500/20 to-sky-500/20 text-cyan-500" },
  { name: "DevOps", group: "Cloud & DevOps", icon: GitBranch, tint: "from-cyan-500/20 to-sky-500/20 text-cyan-500" },

  // Security
  { name: "Cyber Security", group: "Security", icon: ShieldCheck, tint: "from-red-500/20 to-orange-500/20 text-red-500" },
  { name: "Ethical Hacking", group: "Security", icon: Bug, tint: "from-red-500/20 to-orange-500/20 text-red-500" },
  { name: "Network Security", group: "Security", icon: Network, tint: "from-red-500/20 to-orange-500/20 text-red-500" },
  { name: "Penetration Testing", group: "Security", icon: Lock, tint: "from-red-500/20 to-orange-500/20 text-red-500" },
  { name: "Digital Forensics", group: "Security", icon: ShieldCheck, tint: "from-red-500/20 to-orange-500/20 text-red-500" },
  { name: "SOC Operations", group: "Security", icon: ShieldCheck, tint: "from-red-500/20 to-orange-500/20 text-red-500" },

  // Design
  { name: "UI Design", group: "Design", icon: Palette, tint: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500" },
  { name: "UX Design", group: "Design", icon: PenTool, tint: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500" },
  { name: "Figma", group: "Design", icon: Figma, tint: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500" },
  { name: "Adobe XD", group: "Design", icon: PenTool, tint: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500" },
  { name: "Design Systems", group: "Design", icon: Layers, tint: "from-fuchsia-500/20 to-pink-500/20 text-fuchsia-500" },

  // CS Core
  { name: "Data Structures & Algorithms", group: "CS Core", icon: Braces, tint: "from-blue-500/20 to-indigo-500/20 text-blue-500" },
  { name: "Operating Systems", group: "CS Core", icon: Terminal, tint: "from-blue-500/20 to-indigo-500/20 text-blue-500" },
  { name: "Computer Networks", group: "CS Core", icon: Network, tint: "from-blue-500/20 to-indigo-500/20 text-blue-500" },
  { name: "DBMS", group: "CS Core", icon: Database, tint: "from-blue-500/20 to-indigo-500/20 text-blue-500" },
  { name: "Object-Oriented Programming", group: "CS Core", icon: Code2, tint: "from-blue-500/20 to-indigo-500/20 text-blue-500" },
  { name: "Software Engineering", group: "CS Core", icon: Layers, tint: "from-blue-500/20 to-indigo-500/20 text-blue-500" },
  { name: "System Design", group: "CS Core", icon: Boxes, tint: "from-blue-500/20 to-indigo-500/20 text-blue-500" },

  // Placement / Exams
  { name: "Aptitude", group: "Placements & Exams", icon: Target, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "Logical Reasoning", group: "Placements & Exams", icon: Compass, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "Verbal Ability", group: "Placements & Exams", icon: BookOpen, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "Communication Skills", group: "Placements & Exams", icon: MessageSquare, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "Resume Building", group: "Placements & Exams", icon: Briefcase, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "LinkedIn Optimization", group: "Placements & Exams", icon: Briefcase, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "Interview Preparation", group: "Placements & Exams", icon: Users, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "Campus Placement Preparation", group: "Placements & Exams", icon: Trophy, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "GATE Computer Science", group: "Placements & Exams", icon: Award, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },
  { name: "TANCET MCA", group: "Placements & Exams", icon: Award, tint: "from-amber-500/20 to-yellow-500/20 text-amber-500" },

  // Academics
  { name: "School Education (Grades 1–12)", group: "Academics", icon: GraduationCap, tint: "from-teal-500/20 to-emerald-500/20 text-teal-500" },
  { name: "Undergraduate Courses", group: "Academics", icon: GraduationCap, tint: "from-teal-500/20 to-emerald-500/20 text-teal-500" },
  { name: "Postgraduate Courses", group: "Academics", icon: GraduationCap, tint: "from-teal-500/20 to-emerald-500/20 text-teal-500" },
  { name: "Professional Certification Courses", group: "Academics", icon: Award, tint: "from-teal-500/20 to-emerald-500/20 text-teal-500" },
  { name: "Career Development", group: "Academics", icon: Rocket, tint: "from-teal-500/20 to-emerald-500/20 text-teal-500" },
];

const CATEGORY_GROUPS = Array.from(new Set(CATEGORIES.map((c) => c.group)));

type Path = {
  title: string;
  desc: string;
  courses: number;
  months: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
};

const PATHS: Path[] = [
  { title: "AI Engineer", desc: "Python → ML → Deep Learning → LLMs → Agents.", courses: 12, months: "6 months", icon: Brain, gradient: "from-violet-500 to-fuchsia-500" },
  { title: "Machine Learning Engineer", desc: "Statistics, scikit-learn, MLOps, deployment.", courses: 10, months: "5 months", icon: Cpu, gradient: "from-violet-500 to-purple-500" },
  { title: "Data Scientist", desc: "Analytics, ML, visualization, storytelling.", courses: 11, months: "6 months", icon: BarChart3, gradient: "from-pink-500 to-rose-500" },
  { title: "Full Stack Developer", desc: "HTML/CSS, JS, React, Node, databases, deploy.", courses: 14, months: "7 months", icon: Layers, gradient: "from-orange-500 to-amber-500" },
  { title: "Frontend Developer", desc: "React, Next.js, Tailwind, TypeScript, testing.", courses: 9, months: "4 months", icon: Layout, gradient: "from-sky-500 to-cyan-500" },
  { title: "Backend Developer", desc: "Node/Express, APIs, databases, auth, scale.", courses: 9, months: "4 months", icon: Server, gradient: "from-indigo-500 to-blue-500" },
  { title: "MERN Stack Developer", desc: "Mongo, Express, React, Node — end to end.", courses: 10, months: "5 months", icon: Globe, gradient: "from-emerald-500 to-teal-500" },
  { title: "Python Developer", desc: "Python core, Django/FastAPI, DBs, deployment.", courses: 8, months: "4 months", icon: Code2, gradient: "from-blue-500 to-cyan-500" },
  { title: "Java Developer", desc: "Java, OOP, Spring Boot, microservices.", courses: 9, months: "5 months", icon: Code2, gradient: "from-red-500 to-orange-500" },
  { title: "Cloud Engineer", desc: "AWS/Azure/GCP, IaC, networking, security.", courses: 10, months: "5 months", icon: Cloud, gradient: "from-cyan-500 to-sky-500" },
  { title: "DevOps Engineer", desc: "Docker, Kubernetes, CI/CD, observability.", courses: 9, months: "5 months", icon: GitBranch, gradient: "from-teal-500 to-emerald-500" },
  { title: "Cyber Security Analyst", desc: "Threats, SOC, forensics, pen-testing basics.", courses: 10, months: "6 months", icon: ShieldCheck, gradient: "from-red-500 to-rose-500" },
  { title: "Mobile App Developer", desc: "Flutter or Android/Kotlin — build & ship.", courses: 8, months: "4 months", icon: Smartphone, gradient: "from-emerald-500 to-lime-500" },
  { title: "UI/UX Designer", desc: "Research, wireframing, Figma, design systems.", courses: 7, months: "4 months", icon: Palette, gradient: "from-fuchsia-500 to-pink-500" },
  { title: "Software Engineer", desc: "DSA, OOP, system design, one full stack.", courses: 12, months: "7 months", icon: Boxes, gradient: "from-indigo-500 to-violet-500" },
  { title: "Data Analyst", desc: "SQL, Excel, Python, Power BI/Tableau.", courses: 8, months: "4 months", icon: LineChart, gradient: "from-pink-500 to-fuchsia-500" },
];

type Course = {
  title: string;
  desc: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  learners: string;
  instructor: string;
  trending?: boolean;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
};

const COURSES: Course[] = [
  { title: "Generative AI Masterclass", desc: "Master LLMs, diffusion models, and real-world GenAI product building.", category: "Generative AI", difficulty: "Advanced", duration: "24h", rating: 4.9, learners: "48.2k", instructor: "EduNova AI Lab", trending: true, gradient: "from-violet-500 to-fuchsia-500", icon: Sparkles },
  { title: "AI Agents Development", desc: "Design autonomous agents with tools, memory, and multi-step reasoning.", category: "AI Agents", difficulty: "Advanced", duration: "18h", rating: 4.8, learners: "22.1k", instructor: "Nova Research", trending: true, gradient: "from-fuchsia-500 to-pink-500", icon: Bot },
  { title: "Prompt Engineering", desc: "Craft reliable prompts, chains, and evaluations for production LLMs.", category: "Prompt Engineering", difficulty: "Intermediate", duration: "10h", rating: 4.8, learners: "61.4k", instructor: "EduNova AI Lab", trending: true, gradient: "from-purple-500 to-violet-500", icon: MessageSquare },
  { title: "Python for Beginners", desc: "From syntax to projects — the fastest path to fluent Python.", category: "Python", difficulty: "Beginner", duration: "20h", rating: 4.9, learners: "184k", instructor: "Nova Academy", trending: true, gradient: "from-sky-500 to-cyan-500", icon: Code2 },
  { title: "Java Programming", desc: "OOP, collections, streams, and the JVM you'll actually use at work.", category: "Java", difficulty: "Beginner", duration: "22h", rating: 4.7, learners: "97k", instructor: "Nova Academy", gradient: "from-red-500 to-orange-500", icon: Code2 },
  { title: "React.js Masterclass", desc: "Hooks, state, routing, and modern patterns for production React apps.", category: "React.js", difficulty: "Intermediate", duration: "16h", rating: 4.9, learners: "142k", instructor: "Nova Academy", trending: true, gradient: "from-cyan-500 to-blue-500", icon: Boxes },
  { title: "Full Stack MERN Development", desc: "Ship end-to-end apps with MongoDB, Express, React, and Node.", category: "MERN Stack", difficulty: "Intermediate", duration: "40h", rating: 4.8, learners: "76.8k", instructor: "Nova Academy", trending: true, gradient: "from-emerald-500 to-teal-500", icon: Globe },
  { title: "Data Structures & Algorithms", desc: "Crack coding interviews — patterns, complexity, and 200+ problems.", category: "Data Structures & Algorithms", difficulty: "Intermediate", duration: "35h", rating: 4.9, learners: "212k", instructor: "Nova Placement", trending: true, gradient: "from-blue-500 to-indigo-500", icon: Braces },
  { title: "AWS Cloud Practitioner", desc: "Core AWS services, architecture principles, and exam-ready practice.", category: "AWS", difficulty: "Beginner", duration: "14h", rating: 4.7, learners: "58.3k", instructor: "Nova Cloud", gradient: "from-cyan-500 to-sky-500", icon: Cloud },
  { title: "Docker & Kubernetes", desc: "Containerize, orchestrate, and deploy resilient microservices.", category: "Kubernetes", difficulty: "Intermediate", duration: "18h", rating: 4.8, learners: "41.7k", instructor: "Nova Cloud", trending: true, gradient: "from-sky-500 to-blue-500", icon: Container },
  { title: "Cyber Security Essentials", desc: "Threats, defenses, and hands-on labs to build a security mindset.", category: "Cyber Security", difficulty: "Beginner", duration: "16h", rating: 4.7, learners: "39.2k", instructor: "Nova Security", gradient: "from-red-500 to-rose-500", icon: ShieldCheck },
  { title: "Ethical Hacking", desc: "Recon, exploitation, and reporting — the offensive-security toolkit.", category: "Ethical Hacking", difficulty: "Advanced", duration: "24h", rating: 4.8, learners: "33.5k", instructor: "Nova Security", trending: true, gradient: "from-orange-500 to-red-500", icon: Bug },
  { title: "Machine Learning with Python", desc: "Regression, classification, ensembles — with scikit-learn projects.", category: "Machine Learning", difficulty: "Intermediate", duration: "26h", rating: 4.9, learners: "118k", instructor: "EduNova AI Lab", trending: true, gradient: "from-violet-500 to-purple-500", icon: Cpu },
  { title: "SQL for Data Analysis", desc: "Query, join, and analyze real datasets like a working data analyst.", category: "SQL", difficulty: "Beginner", duration: "12h", rating: 4.8, learners: "89.6k", instructor: "Nova Data", gradient: "from-indigo-500 to-blue-500", icon: Database },
  { title: "MongoDB Complete Guide", desc: "Schema design, aggregation, indexing, and production best practices.", category: "MongoDB", difficulty: "Intermediate", duration: "14h", rating: 4.7, learners: "34.9k", instructor: "Nova Data", gradient: "from-emerald-500 to-green-500", icon: HardDrive },
  { title: "Flutter App Development", desc: "Build beautiful cross-platform mobile apps with a single codebase.", category: "Flutter", difficulty: "Intermediate", duration: "20h", rating: 4.8, learners: "52.1k", instructor: "Nova Mobile", trending: true, gradient: "from-teal-500 to-cyan-500", icon: Smartphone },
  { title: "UI/UX with Figma", desc: "Research, wireframes, prototypes, and shipping polished interfaces.", category: "Figma", difficulty: "Beginner", duration: "12h", rating: 4.9, learners: "67.4k", instructor: "Nova Design", trending: true, gradient: "from-fuchsia-500 to-pink-500", icon: Figma },
  { title: "System Design Fundamentals", desc: "Scalable architectures, trade-offs, and interview-ready case studies.", category: "System Design", difficulty: "Advanced", duration: "22h", rating: 4.9, learners: "88.3k", instructor: "Nova Engineering", trending: true, gradient: "from-indigo-500 to-violet-500", icon: Boxes },
];

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const DURATIONS = ["All", "0–10h", "10–20h", "20h+"] as const;
const SORTS = ["Popular", "Top rated", "Newest"] as const;

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */

function ExplorePage() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("All");
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Popular");
  const [activeCat, setActiveCat] = useState<string>("All");

  const filtered = useMemo(() => {
    let list = COURSES.slice();
    const s = q.trim().toLowerCase();
    if (s) {
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(s) ||
          c.desc.toLowerCase().includes(s) ||
          c.category.toLowerCase().includes(s),
      );
    }
    if (level !== "All") list = list.filter((c) => c.difficulty === level);
    if (duration !== "All") {
      list = list.filter((c) => {
        const h = parseInt(c.duration, 10);
        if (duration === "0–10h") return h <= 10;
        if (duration === "10–20h") return h > 10 && h <= 20;
        return h > 20;
      });
    }
    if (activeCat !== "All") list = list.filter((c) => c.category === activeCat);
    if (sort === "Top rated") list.sort((a, b) => b.rating - a.rating);
    if (sort === "Newest") list.reverse();
    if (sort === "Popular")
      list.sort(
        (a, b) => parseFloat(b.learners) - parseFloat(a.learners),
      );
    return list;
  }, [q, level, duration, sort, activeCat]);

  const trending = COURSES.filter((c) => c.trending);

  return (
    <>
      <PageHeader
        eyebrow="Course Discovery"
        title={
          <>
            Explore <span className="text-gradient">Courses</span>
          </>
        }
        description="Discover thousands of courses and learning paths across every subject, skill level, and career."
      >
        <div className="mx-auto w-full max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses, skills, technologies, exams, or careers..."
              className="h-14 rounded-full border-primary/20 bg-background/80 pl-12 pr-32 text-base shadow-lg backdrop-blur focus-visible:ring-primary/40"
              aria-label="Search courses"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-full px-5"
              onClick={() => {
                const el = document.getElementById("all-courses");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <Sparkles className="mr-1.5 h-4 w-4" /> AI Search
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium">Try:</span>
            {["Generative AI", "React.js", "DSA", "AWS", "Figma", "Python"].map((t) => (
              <button
                key={t}
                onClick={() => setQ(t)}
                className="rounded-full border border-border/60 bg-background/60 px-3 py-1 transition hover:border-primary/40 hover:text-primary"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </PageHeader>

      {/* Categories */}
      <Section
        eyebrow="Browse by Category"
        title="Featured Course Categories"
        description="From AI and full-stack development to design, cloud, and career prep — pick your path."
      >
        <div className="space-y-10">
          {CATEGORY_GROUPS.map((group) => {
            const items = CATEGORIES.filter((c) => c.group === group);
            return (
              <div key={group}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {group}
                  </h3>
                  <span className="text-xs text-muted-foreground">{items.length} categories</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {items.map((cat, i) => {
                    const Icon = cat.icon;
                    return (
                      <motion.button
                        key={cat.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: i * 0.015 }}
                        onClick={() => {
                          setActiveCat(cat.name);
                          document.getElementById("all-courses")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card p-4 text-left transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                      >
                        <div
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${cat.tint}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold leading-tight">{cat.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">Explore →</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <SchoolEducation />

      {/* Learning Paths */}
      <Section
        className="bg-secondary/40"
        eyebrow="Career Roadmaps"
        title="Featured Learning Paths"
        description="Curated, sequenced courses that take you from zero to job-ready in a chosen career."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PATHS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${p.gradient} opacity-20 blur-2xl transition group-hover:opacity-40`}
                />
                <div className={`relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-4 text-base font-semibold">{p.title}</h3>
                <p className="relative mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><RouteIcon className="h-3.5 w-3.5" /> {p.courses} courses</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.months}</span>
                </div>
                <Button variant="ghost" size="sm" className="relative mt-3 w-full justify-between px-2 hover:bg-primary/10 hover:text-primary" asChild>
                  <Link to="/explore">
                    Start path <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Trending */}
      <Section
        eyebrow="Hot This Week"
        title={<><TrendingUp className="mr-2 inline h-8 w-8 text-primary" /> Trending Courses</>}
        description="What learners across EduNova AI are picking up right now."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trending.map((c, i) => (
            <CourseCard key={c.title} c={c} delay={i * 0.03} />
          ))}
        </div>
      </Section>

      {/* All Courses + Filters */}
      <Section
        id="all-courses"
        className="bg-secondary/40"
        eyebrow="Full Catalog"
        title="All Courses"
        description="Filter by category, level, and duration to find the perfect course."
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4 text-primary" /> Filters
          </div>
          <Select value={activeCat} onValueChange={setActiveCat}>
            <SelectTrigger className="h-9 w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="All">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
            <SelectTrigger className="h-9 w-[150px]"><SelectValue placeholder="Level" /></SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={duration} onValueChange={(v) => setDuration(v as typeof duration)}>
            <SelectTrigger className="h-9 w-[150px]"><SelectValue placeholder="Duration" /></SelectTrigger>
            <SelectContent>
              {DURATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="h-9 w-[150px]"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="ml-auto text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {COURSES.length} courses
          </div>
          {(activeCat !== "All" || level !== "All" || duration !== "All" || q) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setActiveCat("All"); setLevel("All"); setDuration("All"); setQ(""); }}
            >
              Clear
            </Button>
          )}
        </div>

        {filtered.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <CourseCard key={c.title} c={c} delay={i * 0.02} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Compass className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-semibold">No courses match your filters</p>
            <p className="text-sm text-muted-foreground">Try clearing filters or a different search.</p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-cyan-500/10 p-10 text-center shadow-xl sm:p-14">
          <div className="absolute inset-0 bg-grid-fade opacity-40" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Zap className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Not sure where to start?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Let EduNova AI build a personalized learning path from your goals, current skills, and available study hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/register">Get my learning path <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/features/smart-learning-paths">How it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   Course Card
   ──────────────────────────────────────────────────────────── */

function CourseCard({ c, delay = 0 }: { c: Course; delay?: number }) {
  const Icon = c.icon;
  const diffTone =
    c.difficulty === "Beginner"
      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
      : c.difficulty === "Intermediate"
        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
        : "bg-rose-500/15 text-rose-600 dark:text-rose-400";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${c.gradient}`}>
        <div className="absolute inset-0 bg-grid-fade opacity-30" aria-hidden />
        <div className="absolute inset-0 grid place-items-center">
          <Icon className="h-14 w-14 text-white/90 drop-shadow-lg transition group-hover:scale-110" />
        </div>
        {c.trending && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold text-primary shadow">
            <TrendingUp className="h-3 w-3" /> Trending
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-medium">
          {c.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs">
          <Badge className={diffTone} variant="secondary">{c.difficulty}</Badge>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {c.duration}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-medium">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {c.rating}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">{c.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{c.desc}</p>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
            <Building2 className="h-3.5 w-3.5" />
          </div>
          <span className="truncate">{c.instructor}</span>
          <span className="ml-auto inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {c.learners}
          </span>
        </div>

        <Button className="mt-5 w-full" asChild>
          <Link to="/register">
            <Play className="mr-1.5 h-4 w-4" /> Explore Course
          </Link>
        </Button>
      </div>
    </motion.article>
  );
}
