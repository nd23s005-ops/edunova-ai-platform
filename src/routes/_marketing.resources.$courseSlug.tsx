import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Clock,
  Download,
  FileText,
  Filter,
  Layers,
  Search,
  Share2,
  Sparkles,
  Tag,
  Compass,
} from "lucide-react";
import {
  buildCourseResources,
  getCourseBySlug,
  getCourseImage,
  getRelatedCourses,
  getResourceReaderPath,
  RESOURCE_KINDS,
  type CourseResource,
} from "@/lib/resources/catalog";
import { toast } from "sonner";


export const Route = createFileRoute("/_marketing/resources/$courseSlug")({
  loader: ({ params }) => {
    const course = getCourseBySlug(params.courseSlug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Course resources not found — EduNova AI" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const c = loaderData.course;
    const title = `${c.title} — Resources | EduNova AI`;
    const desc = `Notes, guides, cheat sheets, case studies, and reference documents for ${c.title}. ${RESOURCE_KINDS.length} document-based resources.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: CourseResourcesPage,
  notFoundComponent: CourseResourcesNotFound,
});

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;

const STORAGE_KEY = "edunova.resources.bookmarks";

function useBookmarks() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setIds(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      /* empty */
    }
  }, []);
  const toggle = (id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* empty */
      }
      return next;
    });
  };
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}

function CourseResourcesPage() {
  const { course } = Route.useLoaderData();
  const resources = useMemo(() => buildCourseResources(course), [course]);
  const related = useMemo(() => getRelatedCourses(course.slug), [course]);

  const [q, setQ] = useState("");
  const [kind, setKind] = useState<string>("All");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [sort, setSort] = useState<"Recommended" | "Shortest" | "Longest">("Recommended");
  const bookmarks = useBookmarks();

  const filtered = useMemo(() => {
    let list = resources.slice();
    const s = q.trim().toLowerCase();
    if (s) list = list.filter((r) => r.title.toLowerCase().includes(s) || r.summary.toLowerCase().includes(s) || r.kind.toLowerCase().includes(s));
    if (kind !== "All") list = list.filter((r) => r.kind === kind);
    if (level !== "All") list = list.filter((r) => r.difficulty === level);
    if (sort === "Shortest") list.sort((a, b) => a.readingMinutes - b.readingMinutes);
    if (sort === "Longest") list.sort((a, b) => b.readingMinutes - a.readingMinutes);
    return list;
  }, [resources, q, kind, level, sort]);

  return (
    <>
      {/* Course hero */}
      <div className={`relative overflow-hidden border-b border-border/60 bg-gradient-to-br ${course.gradient}`}>
        <img
          src={getCourseImage(course)}
          alt=""
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-70 mix-blend-multiply`} aria-hidden />
        <div className="absolute inset-0 bg-grid-fade opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 rounded-full bg-background/20 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-background/30"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Resources Library
          </Link>
          <div className="mt-5 flex flex-wrap items-end gap-6">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/95 text-slate-900 shadow-xl">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/90">{course.category}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {course.title} <span className="text-white/80">Resources</span>
              </h1>
              <p className="mt-3 max-w-3xl text-white/90 sm:text-lg">{course.tagline}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/90">
                <Badge className="bg-white/20 text-white hover:bg-white/30">{course.difficulty}</Badge>
                <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> {RESOURCE_KINDS.length} resources</span>
                <span className="inline-flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> Documents & articles only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Section
        className="pt-10"
        eyebrow="Library"
        title={`All ${course.title} resources`}
        description="Deep-dive documents to help you go beyond the course. No videos, just focused reading."
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search this course's resources..."
              className="h-9 pl-9"
              aria-label="Search resources for this course"
            />
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4 text-primary" /> Filters
          </div>
          <Select value={kind} onValueChange={setKind}>
            <SelectTrigger className="h-9 w-[200px]"><SelectValue placeholder="Resource type" /></SelectTrigger>
            <SelectContent className="max-h-72">
              <SelectItem value="All">All types</SelectItem>
              {RESOURCE_KINDS.map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={(v) => setLevel(v as typeof level)}>
            <SelectTrigger className="h-9 w-[150px]"><SelectValue placeholder="Level" /></SelectTrigger>
            <SelectContent>
              {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="h-9 w-[160px]"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Recommended">Recommended</SelectItem>
              <SelectItem value="Shortest">Shortest read</SelectItem>
              <SelectItem value="Longest">Longest read</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> of {resources.length}
          </div>
        </div>

        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <ResourceCard key={r.id} r={r} coverImage={getCourseImage(course)} delay={i * 0.02} bookmarked={bookmarks.has(r.id)} onBookmark={() => bookmarks.toggle(r.id)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Compass className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 font-semibold">No resources match your filters</p>
            <p className="text-sm text-muted-foreground">Try clearing filters or a different search term.</p>
          </div>
        )}
      </Section>

      {/* Content style */}
      <Section
        className="bg-secondary/40"
        eyebrow="What Every Article Covers"
        title="Consistent, deep structure"
        description="Every long-form resource on EduNova AI follows the same rigorous structure."
      >
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            "Introduction",
            "Concepts",
            "Step-by-Step Explanation",
            "Real-world Examples",
            "Practical Applications",
            "Best Practices",
            "Common Mistakes",
            "Tips & Tricks",
            "Summary",
            "Key Takeaways",
            "FAQs",
            "Further Reading",
          ].map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2.5 text-xs font-medium shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>{s}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Case study structure */}
      <Section
        eyebrow="Case Studies"
        title="Professional case studies"
        description="Every major course includes real-world case studies with a consistent narrative structure."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Background", body: "The setting, team, and constraints going in." },
            { label: "Problem Statement", body: "What we needed to solve and why it mattered." },
            { label: "Solution", body: "The chosen approach, trade-offs, and why." },
            { label: "Architecture", body: "System diagrams, components, and data flows." },
            { label: "Implementation", body: "How it was built, phase by phase." },
            { label: "Challenges", body: "What broke, and how we recovered." },
            { label: "Results", body: "Outcomes, metrics, and business impact." },
            { label: "Lessons Learned", body: "What we'd do differently next time." },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Related courses */}
      {related.length > 0 && (
        <Section className="bg-secondary/40" eyebrow="Related" title="Explore related course libraries">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((c) => (
              <Link
                key={c.slug}
                to="/resources/$courseSlug"
                params={{ courseSlug: c.slug }}
                className="group rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl"
              >
                <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow`}>
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold">{c.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.tagline}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
                  Open resources <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function ResourceCard({
  r,
  coverImage,
  delay,
  bookmarked,
  onBookmark,
}: {
  r: CourseResource;
  coverImage: string;
  delay: number;
  bookmarked: boolean;
  onBookmark: () => void;
}) {
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: r.title, text: r.summary, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied");
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${r.gradient}`}>
        <img
          src={coverImage}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${r.gradient} opacity-70 mix-blend-multiply`} aria-hidden />
        <div className="absolute inset-0 bg-grid-fade opacity-30" aria-hidden />
        <div className="absolute inset-0 grid place-items-center">
          <FileText className="h-12 w-12 text-white/95 drop-shadow-lg transition group-hover:scale-110" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-semibold">
          {r.kind}
        </span>

        <button
          onClick={onBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          aria-pressed={bookmarked}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/95 text-foreground shadow transition hover:bg-primary hover:text-primary-foreground"
        >
          {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">{r.difficulty}</Badge>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.readingMinutes} min read</span>
          <span className="inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> {r.pages} pages</span>
        </div>
        <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug">{r.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{r.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {r.tags.slice(0, 3).map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">
              <Tag className="h-3 w-3" /> {t}
            </span>
          ))}
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground">Last updated {r.lastUpdated}</p>

        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {(() => {
            const readerPath = getResourceReaderPath(r.id);
            return readerPath ? (
              <>
                <Button size="sm" className="col-span-2" asChild>
                  <Link to={readerPath}><BookOpen className="mr-1.5 h-3.5 w-3.5" /> Read</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to={readerPath} aria-label={`Open reader: ${r.title}`}>
                    <Download className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" className="col-span-2" asChild>
                  <Link to="/register"><BookOpen className="mr-1.5 h-3.5 w-3.5" /> Read</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/register" aria-label={`Download PDF: ${r.title}`}>
                    <Download className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </>
            );
          })()}
          <Button size="sm" variant="outline" onClick={share} aria-label={`Share ${r.title}`}>
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>

      </div>
    </motion.article>
  );
}

function CourseResourcesNotFound() {
  const { courseSlug } = Route.useParams();
  return (
    <Section
      eyebrow="Not found"
      title="We couldn't find that course"
      description={`No resource collection exists for "${courseSlug}". Browse the library to find what you need.`}
    >
      <div className="flex justify-center">
        <Button asChild>
          <Link to="/resources">Back to Resources Library</Link>
        </Button>
      </div>
    </Section>
  );
}
