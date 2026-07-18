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
  BookOpen,
  Library,
  FileText,
  Layers,
  Filter,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Tag,
  Newspaper,
  Compass,
} from "lucide-react";
import { COURSE_CATALOG, RESOURCE_KINDS, getCourseImage } from "@/lib/resources/catalog";

const TITLE = "Resources Library — EduNova AI";
const DESC =
  "A digital knowledge center with document- and article-based resources for every course on EduNova AI.";

export const Route = createFileRoute("/_marketing/resources/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ResourcesIndex,
});

const CATEGORY_GROUPS = Array.from(new Set(COURSE_CATALOG.map((c) => c.category)));
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const ALL_TOPICS = Array.from(new Set(COURSE_CATALOG.flatMap((c) => c.tags))).sort((a, b) => a.localeCompare(b));

const READING_TIMES = [
  { value: "All", label: "Any length" },
  { value: "short", label: "Quick reads (< 20 min)" },
  { value: "standard", label: "Standard (20–40 min)" },
  { value: "deep", label: "Deep dives (40+ min)" },
] as const;
type ReadingTime = (typeof READING_TIMES)[number]["value"];

const DIFFICULTY_TO_TIME: Record<string, ReadingTime> = {
  Beginner: "short",
  Intermediate: "standard",
  Advanced: "deep",
};

function ResourcesIndex() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string>("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [readingTime, setReadingTime] = useState<ReadingTime>("All");
  const [topics, setTopics] = useState<string[]>([]);

  const toggleTopic = (t: string) =>
    setTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return COURSE_CATALOG.filter((c) => {
      if (group !== "All" && c.category !== group) return false;
      if (level !== "All" && c.difficulty !== level) return false;
      if (readingTime !== "All" && DIFFICULTY_TO_TIME[c.difficulty] !== readingTime) return false;
      if (topics.length > 0 && !topics.every((t) => c.tags.includes(t))) return false;
      if (!s) return true;
      return (
        c.title.toLowerCase().includes(s) ||
        c.tagline.toLowerCase().includes(s) ||
        c.category.toLowerCase().includes(s) ||
        c.tags.some((t) => t.toLowerCase().includes(s))
      );
    });
  }, [q, group, level, readingTime, topics]);

  const hasActiveFilters = group !== "All" || level !== "All" || readingTime !== "All" || topics.length > 0 || q.length > 0;
  const clearAll = () => { setGroup("All"); setLevel("All"); setReadingTime("All"); setTopics([]); setQ(""); };

  const totalResources = COURSE_CATALOG.length * RESOURCE_KINDS.length;

  return (
    <>
      <PageHeader
        eyebrow="Digital Library"
        title={
          <>
            The <span className="text-gradient">Resources</span> Library
          </>
        }
        description="Every course on EduNova AI has a dedicated collection of documents and articles — notes, guides, cheat sheets, case studies, and more. No videos, just deep, focused reading."
      >
        <div className="mx-auto w-full max-w-2xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a course — Python, React, System Design, AWS, DSA..."
              className="h-14 rounded-full border-primary/20 bg-background/80 pl-12 pr-4 text-base shadow-lg backdrop-blur focus-visible:ring-primary/40"
              aria-label="Search resources by course"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Library className="h-3.5 w-3.5 text-primary" /> {COURSE_CATALOG.length} courses</span>
            <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-primary" /> {totalResources.toLocaleString()}+ documents</span>
            <span className="inline-flex items-center gap-1.5"><Newspaper className="h-3.5 w-3.5 text-primary" /> {RESOURCE_KINDS.length} resource types per course</span>
          </div>
        </div>
      </PageHeader>

      {/* Resource types overview */}
      <Section
        eyebrow="What's Inside Every Course"
        title="21 document types per course"
        description="Every course has the same complete resource set — so you always know what to expect."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {RESOURCE_KINDS.map((k, i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.015 }}
              className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2.5 text-xs font-medium shadow-sm"
            >
              <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="truncate">{k}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Course library */}
      <Section
        className="bg-secondary/40"
        eyebrow="Course Library"
        title="Pick a course. Get its full resource collection."
        description="Every course card opens a dedicated resources page with all 21 document types."
      >
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4 text-primary" /> Filters
          </div>
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="h-9 w-[200px]"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All categories</SelectItem>
              {CATEGORY_GROUPS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
            <SelectTrigger className="h-9 w-[150px]"><SelectValue placeholder="Level" /></SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="ml-auto text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {COURSE_CATALOG.length} courses
          </div>
          {(group !== "All" || level !== "All" || q) && (
            <Button variant="ghost" size="sm" onClick={() => { setGroup("All"); setLevel("All"); setQ(""); }}>Clear</Button>
          )}
        </div>

        {filtered.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c, i) => (
              <motion.article
                key={c.slug}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.02 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${c.gradient}`}>
                  <img
                    src={getCourseImage(c)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-70 mix-blend-multiply`} aria-hidden />
                  <div className="absolute inset-0 bg-grid-fade opacity-30" aria-hidden />
                  <div className="absolute inset-0 grid place-items-center">
                    <BookOpen className="h-12 w-12 text-white/95 drop-shadow-lg transition group-hover:scale-110" />
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold">
                    {c.category}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-medium">
                    {RESOURCE_KINDS.length} docs
                  </span>
                </div>

                <div className="flex flex-col p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="secondary">{c.difficulty}</Badge>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Layers className="h-3.5 w-3.5" /> {c.tags[0]}
                    </span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{c.tagline}</p>

                  <Button className="mt-5 w-full" asChild>
                    <Link to="/resources/$courseSlug" params={{ courseSlug: c.slug }}>
                      Open resources <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Compass className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-semibold">No courses match your filters</p>
            <p className="text-sm text-muted-foreground">Try a different category, level, or search term.</p>
          </div>
        )}
      </Section>

      {/* Trust strip */}
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileText, label: "Document-first", body: "Deep reading over passive video." },
            { icon: Sparkles, label: "Written by experts", body: "Curated by working practitioners." },
            { icon: TrendingUp, label: "Continuously updated", body: "Reflects the latest patterns and practice." },
            { icon: Tag, label: "Scoped to your course", body: "No aimless browsing — always contextual." },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-semibold">{f.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
