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
  BookOpen,
  Library,
  Sparkles,
  ClipboardList,
  FileCheck2,
  Route as RouteIcon,
  Users,
  Building2,
  Newspaper,
  Megaphone,
  Search,
  Clock,
  Star,
  Play,
  Download,
  FileText,
  Presentation,
  Video,
  FileQuestion,
  BookMarked,
  ScrollText,
  Brain,
  Target,
  Gauge,
  Compass,
  BarChart3,
  Bot,
  ArrowRight,
  Calendar,
  MessageCircle,
  Trophy,
  Code2,
  Cloud,
  ShieldCheck,
  Database,
  Palette,
  Layers,
  TrendingUp,
  Filter,
  Zap,
} from "lucide-react";

const TITLE = "Explore — EduNova AI";
const DESCRIPTION =
  "Discover courses, resources, AI tools, learning paths, and more on EduNova AI — the central hub to explore everything the platform offers.";

export const Route = createFileRoute("/_marketing/explore")({
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
  component: ExplorePage,
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const quickCategories = [
  { icon: BookOpen, label: "Courses", desc: "Structured, board-aligned courses.", to: "/register" as const },
  { icon: Library, label: "Resource Library", desc: "Notes, PPTs, and reference material.", to: "/resources" as const },
  { icon: Sparkles, label: "AI Features", desc: "Learning Twin, tutor, and more.", to: "/features/$slug" as const, params: { slug: "learning-twin" } },
  { icon: ClipboardList, label: "Assessments", desc: "Chapter tests and adaptive quizzes.", to: "/register" as const },
  { icon: FileCheck2, label: "Mock Tests", desc: "Timed, exam-realistic practice.", to: "/register" as const },
  { icon: RouteIcon, label: "Learning Paths", desc: "Curated multi-course tracks.", to: "/register" as const },
  { icon: Users, label: "Community", desc: "Study groups and discussions.", to: "/community" as const },
  { icon: Building2, label: "Organizations", desc: "Teams learning together.", to: "/about" as const },
  { icon: Newspaper, label: "Articles", desc: "In-depth product deep-dives.", to: "/features/$slug" as const, params: { slug: "learning-twin" } },
  { icon: Megaphone, label: "News & Updates", desc: "Latest platform announcements.", to: "/resources" as const },
];

const trending = [
  "Machine Learning",
  "JEE Physics",
  "React 19",
  "Data Structures",
  "System Design",
  "Prompt Engineering",
  "Financial Modeling",
  "UI/UX",
];

const featuredCourses = [
  { title: "Foundations of Machine Learning", org: "EduNova AI · Nova Labs", cat: "Computer Science", level: "Intermediate", hours: 12, learners: "48.2k", rating: 4.9 },
  { title: "AP Calculus AB — Complete Path", org: "EduNova AI · Math Faculty", cat: "Mathematics", level: "Advanced", hours: 24, learners: "31.7k", rating: 4.8 },
  { title: "Modern Web Development", org: "EduNova AI · Engineering", cat: "Computer Science", level: "Intermediate", hours: 30, learners: "84.5k", rating: 4.9 },
  { title: "Financial Modeling in Excel", org: "EduNova AI · Business", cat: "Business", level: "Intermediate", hours: 9, learners: "22.1k", rating: 4.7 },
  { title: "Physics: Mechanics & Motion", org: "EduNova AI · Sciences", cat: "Science", level: "Intermediate", hours: 15, learners: "19.3k", rating: 4.8 },
  { title: "UX Design Fundamentals", org: "EduNova AI · Design Studio", cat: "Design", level: "Beginner", hours: 11, learners: "27.8k", rating: 4.8 },
];

const featuredResources = [
  { type: "PDF Notes", cat: "Physics · Class 12", downloads: "24.1k", rating: 4.9, icon: FileText },
  { type: "PPT Presentations", cat: "Business Studies", downloads: "9.4k", rating: 4.7, icon: Presentation },
  { type: "Video Tutorials", cat: "React & TypeScript", downloads: "38.6k", rating: 4.9, icon: Video },
  { type: "Previous Year Papers", cat: "CBSE Class 10", downloads: "51.3k", rating: 4.8, icon: ScrollText },
  { type: "Question Banks", cat: "JEE Main · Maths", downloads: "42.7k", rating: 4.9, icon: FileQuestion },
  { type: "Cheat Sheets", cat: "SQL & Databases", downloads: "17.9k", rating: 4.8, icon: BookMarked },
  { type: "E-books", cat: "Data Science Primer", downloads: "12.2k", rating: 4.7, icon: BookOpen },
];

const aiFeatures = [
  { icon: Brain, title: "AI Learning Twin", desc: "A private, evolving model of what you know — refined after every lesson and quiz.", slug: "learning-twin" },
  { icon: Target, title: "Knowledge Gap Mapper", desc: "Traces wrong answers back to their root concept, then prescribes targeted revision.", slug: "knowledge-gap" },
  { icon: Gauge, title: "AI Exam Simulator", desc: "Realistic mock exams tuned to your syllabus, performance, and target difficulty.", slug: "exam-generator" },
  { icon: Compass, title: "Personalized Learning Paths", desc: "Adaptive sequencing that respects your goals, pace, and calendar.", slug: "adaptive-recommendations" },
  { icon: BarChart3, title: "Smart Analytics", desc: "Streaks, mastery, and time-on-task designed to be read at a glance.", slug: "progress-analytics" },
  { icon: Bot, title: "AI Study Assistant", desc: "A patient tutor that meets you at your level and adapts until it clicks.", slug: "ai-tutor" },
];

const learningPaths = [
  { icon: Code2, title: "Full Stack Development", level: "Beginner → Advanced", duration: "6 months", skills: ["React", "Node.js", "PostgreSQL", "System Design"] },
  { icon: Brain, title: "Artificial Intelligence", level: "Intermediate", duration: "5 months", skills: ["Python", "PyTorch", "LLMs", "Agents"] },
  { icon: Database, title: "Data Science", level: "Beginner → Intermediate", duration: "4 months", skills: ["Statistics", "Pandas", "ML", "Visualization"] },
  { icon: Cloud, title: "Cloud Computing", level: "Intermediate", duration: "3 months", skills: ["AWS", "Docker", "Kubernetes", "IaC"] },
  { icon: ShieldCheck, title: "Cyber Security", level: "Beginner → Advanced", duration: "5 months", skills: ["Networks", "Web Sec", "Cryptography", "Blue Team"] },
  { icon: Palette, title: "UI/UX Design", level: "Beginner", duration: "3 months", skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"] },
];

const practice = [
  { icon: ClipboardList, title: "Practice Quizzes", desc: "Short, adaptive quizzes that reinforce each concept as you learn." },
  { icon: FileCheck2, title: "Mock Tests", desc: "Full-length, timed simulations of real board and entrance exams." },
  { icon: ScrollText, title: "Previous Year Questions", desc: "Curated PYQ sets with solutions and difficulty tagging." },
  { icon: Code2, title: "Coding Challenges", desc: "Language-agnostic problem sets with automated evaluation." },
];

const communityItems = [
  { icon: MessageCircle, title: "Trending Discussions", desc: "\"How to approach Class 12 Physics numericals\" · 342 replies" },
  { icon: Users, title: "Popular Study Groups", desc: "JEE 2027 · Full-Stack Devs · UPSC Aspirants · CS Fundamentals" },
  { icon: Calendar, title: "Upcoming Events", desc: "AMA with ML engineers · Mock Test Marathon · Career Q&A" },
  { icon: Trophy, title: "Project Showcase", desc: "Student projects: portfolio sites, ML notebooks, mobile apps" },
];

const articles = [
  { category: "AI", title: "How Learning Twin Personalizes Every Lesson", author: "Nova Learning Team", date: "Mar 4, 2026", read: "8 min", slug: "learning-twin" },
  { category: "Product", title: "Inside the Knowledge Gap Mapper", author: "Nova Learning Team", date: "Feb 18, 2026", read: "6 min", slug: "knowledge-gap" },
  { category: "Learning", title: "Adaptive Recommendations Explained", author: "Nova Learning Team", date: "Feb 2, 2026", read: "7 min", slug: "adaptive-recommendations" },
];

const announcements = [
  { icon: Sparkles, tag: "New Courses", title: "10 new upskilling tracks added this month", date: "This week" },
  { icon: Zap, tag: "Feature Update", title: "Learning Twin now supports weekly review reports", date: "Mar 2026" },
  { icon: Calendar, tag: "Event", title: "Live AMA with Nova ML engineers", date: "Mar 22, 2026" },
  { icon: ShieldCheck, tag: "Maintenance", title: "Scheduled DB upgrade — brief downtime", date: "Mar 30, 2026 · 02:00 UTC" },
];

const globalCategories = ["All", "Courses", "Resources", "Articles", "AI Features", "Communities"];
const difficulties = ["Any", "Beginner", "Intermediate", "Advanced"];
const durations = ["Any", "< 5h", "5–15h", "15h+"];
const resourceTypes = ["Any", "PDF", "PPT", "Video", "PYQ", "Question Bank", "Cheat Sheet", "E-book"];
const languages = ["English"];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    difficulty: "Any",
    duration: "Any",
    type: "Any",
    language: "English",
  });

  const allSearchable = useMemo(
    () => [
      ...featuredCourses.map((c) => ({ kind: "Courses", label: c.title, sub: c.cat })),
      ...featuredResources.map((r) => ({ kind: "Resources", label: r.type, sub: r.cat })),
      ...articles.map((a) => ({ kind: "Articles", label: a.title, sub: a.category })),
      ...aiFeatures.map((a) => ({ kind: "AI Features", label: a.title, sub: "AI" })),
      ...communityItems.map((c) => ({ kind: "Communities", label: c.title, sub: "Community" })),
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allSearchable
      .filter((r) => filters.category === "All" || r.kind === filters.category)
      .filter(
        (r) =>
          r.label.toLowerCase().includes(q) || r.sub.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, filters.category, allSearchable]);

  return (
    <>
      {/* Hero */}
      <PageHeader
        eyebrow="Explore"
        title={
          <>
            Discover everything <span className="text-gradient">EduNova AI</span> offers
          </>
        }
        description="Discover courses, resources, AI tools, learning paths, and more — your central hub for exploring the entire platform."
      >
        <div className="w-full max-w-2xl space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, resources, AI features, articles…"
              aria-label="Global search"
              className="h-12 rounded-full bg-background/80 pl-11 pr-32 backdrop-blur shadow-card"
            />
            <Button
              size="sm"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full"
              onClick={() => setQuery(query.trim())}
            >
              Search
            </Button>

            {query && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 top-full z-30 mt-2 rounded-2xl border border-border/60 bg-popover p-2 text-left shadow-elegant backdrop-blur"
              >
                {results.map((r, i) => (
                  <div
                    key={`${r.kind}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-muted/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{r.label}</p>
                      <p className="truncate text-xs text-muted-foreground">{r.sub}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      {r.kind}
                    </Badge>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Trending topics */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> Trending
            </span>
            {trending.map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t)}
                className="rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Featured paths quick chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground">Featured paths:</span>
            {learningPaths.slice(0, 4).map((p) => (
              <span
                key={p.title}
                className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-primary"
              >
                <p.icon className="h-3 w-3" /> {p.title}
              </span>
            ))}
          </div>
        </div>
      </PageHeader>

      {/* Quick Explore Categories */}
      <Section
        eyebrow="Quick explore"
        title={<>Where do you want to <span className="text-gradient">start</span>?</>}
        description="Jump straight into the corner of EduNova AI that matters to you right now."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickCategories.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
            >
              <Link
                to={c.to as never}
                params={(c as { params?: Record<string, string> }).params as never}
                className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{c.label}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {c.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                  Open <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Featured Courses */}
      <Section
        eyebrow="Featured courses"
        title={<>Hand-picked <span className="text-gradient">courses</span> for you</>}
        description="Popular, high-rated courses across every subject and level."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((c) => (
            <div
              key={c.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 via-highlight/20 to-accent/20">
                <div className="absolute inset-0 bg-grid-fade opacity-40" />
                <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
                  {c.level}
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-background/90 text-primary shadow-elegant backdrop-blur">
                    <Play className="h-6 w-6 fill-current" />
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <Badge variant="secondary" className="w-fit">{c.cat}</Badge>
                <h3 className="mt-3 line-clamp-2 text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.org}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{c.hours}h</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.learners}</span>
                  <span className="flex items-center gap-1 text-accent-foreground"><Star className="h-3.5 w-3.5 fill-current text-accent" />{c.rating}</span>
                </div>
                <Button asChild size="sm" className="mt-5">
                  <Link to="/register">Continue learning</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Resources */}
      <Section
        eyebrow="Resource library"
        title={<>Study material, <span className="text-gradient">ready when you are</span></>}
        description="Notes, presentations, videos, and question banks curated by our learning team."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredResources.map((r) => (
            <div
              key={r.type}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <r.icon className="h-5 w-5" />
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-accent-foreground">
                  <Star className="h-3.5 w-3.5 fill-current text-accent" />
                  {r.rating}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold">{r.type}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.cat}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" /> {r.downloads}
                </span>
                <Button asChild size="sm" variant="outline" className="h-8">
                  <Link to="/resources">Preview</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* AI Features */}
      <Section
        eyebrow="AI features"
        title={<>Meet <span className="text-gradient">Nova AI</span></>}
        description="Six AI capabilities that work quietly in the background to make your learning genuinely personal."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 text-base font-semibold">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
              <Button asChild size="sm" variant="outline" className="relative mt-5">
                <Link to="/features/$slug" params={{ slug: f.slug }}>
                  Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Learning Paths */}
      <Section
        eyebrow="Learning paths"
        title={<>Curated <span className="text-gradient">multi-course tracks</span></>}
        description="Follow a proven roadmap from fundamentals to real-world capability."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                  <p.icon className="h-5 w-5" />
                </span>
                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                  {p.level}
                </Badge>
              </div>
              <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {p.duration}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border/60 bg-background/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <Button asChild size="sm" variant="outline" className="mt-5 w-fit">
                <Link to="/register">Start path</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Practice & Assessment */}
      <Section
        eyebrow="Practice & assessment"
        title={<>Test what you <span className="text-gradient">actually know</span></>}
        description="Adaptive practice, timed simulations, and problem sets calibrated to your level."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {practice.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-card transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold">{p.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Community Highlights */}
      <Section
        eyebrow="Community"
        title={<>Learn <span className="text-gradient">together</span></>}
        description="Discussions, study groups, events, and projects from learners like you."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {communityItems.map((c) => (
            <div
              key={c.title}
              className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Latest Articles */}
      <Section
        eyebrow="Articles"
        title={<>From the <span className="text-gradient">Nova blog</span></>}
        description="Product deep-dives and learning science from our team."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.title}
              to="/features/$slug"
              params={{ slug: a.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/25 via-highlight/20 to-accent/20">
                <div className="absolute inset-0 bg-grid-fade opacity-40" />
                <Badge className="absolute left-3 top-3 bg-background/90 text-foreground backdrop-blur">
                  {a.category}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 text-base font-semibold group-hover:text-primary">
                  {a.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{a.author}</span>
                  <span>{a.date}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {a.read}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-primary">
                    Read article <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Announcements */}
      <Section
        eyebrow="Announcements"
        title={<>What's <span className="text-gradient">new</span></>}
        description="The latest from the EduNova AI team."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {announcements.map((a) => (
            <div
              key={a.title}
              className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <a.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                    {a.tag}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">{a.date}</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold">{a.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Global Search / Filters */}
      <Section
        eyebrow="Global search"
        title={<>Search <span className="text-gradient">everything</span></>}
        description="Refine across courses, resources, articles, AI features, and communities."
      >
        <div className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-card backdrop-blur">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search across the platform…"
              aria-label="Global platform search"
              className="h-12 rounded-full pl-11"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <FilterSelect
              label="Category"
              value={filters.category}
              onChange={(v) => setFilters((f) => ({ ...f, category: v }))}
              options={globalCategories}
            />
            <FilterSelect
              label="Difficulty"
              value={filters.difficulty}
              onChange={(v) => setFilters((f) => ({ ...f, difficulty: v }))}
              options={difficulties}
            />
            <FilterSelect
              label="Duration"
              value={filters.duration}
              onChange={(v) => setFilters((f) => ({ ...f, duration: v }))}
              options={durations}
            />
            <FilterSelect
              label="Resource type"
              value={filters.type}
              onChange={(v) => setFilters((f) => ({ ...f, type: v }))}
              options={resourceTypes}
            />
            <FilterSelect
              label="Language"
              value={filters.language}
              onChange={(v) => setFilters((f) => ({ ...f, language: v }))}
              options={languages}
            />
          </div>

          <div className="mt-6">
            {query.trim() === "" ? (
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" /> Start typing to see live results across the platform.
              </p>
            ) : results.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No matches for <span className="font-medium text-foreground">"{query}"</span>. Try
                a different keyword or broaden your filters.
              </p>
            ) : (
              <ul className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60">
                {results.map((r, i) => (
                  <li
                    key={`gs-${i}`}
                    className="flex items-center justify-between gap-3 bg-background/40 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{r.label}</p>
                      <p className="truncate text-xs text-muted-foreground">{r.sub}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      {r.kind}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto w-[92%] max-w-6xl px-2 sm:w-[85%] sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-12 sm:py-20"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.03 240) 0%, oklch(0.22 0.05 260) 50%, oklch(0.16 0.04 240) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(120,119,198,0.35),transparent_45%)]" />
            <div className="relative mx-auto max-w-2xl space-y-6 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                <Layers className="h-3.5 w-3.5" /> One platform · Everything you need
              </span>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to make learning genuinely yours?
              </h2>
              <p className="text-white/80">
                Start a course, dive into resources, or join a community — everything on
                EduNova AI is designed to fit around you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/register">Start learning</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20">
                  <Link to="/resources">Explore resources</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full text-white hover:bg-white/10">
                  <Link to="/community">Join the community</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
