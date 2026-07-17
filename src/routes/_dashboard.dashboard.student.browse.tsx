import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Loader2,
  Search,
  Sparkles,
  GraduationCap,
  Atom,
  Calculator,
  FlaskConical,
  Globe,
  Languages,
  Landmark,
  Leaf,
  LineChart,
  MonitorSmartphone,
  Scale,
  Users,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/student/browse")({
  component: BrowseCoursesPage,
});

const BOARD_LABEL: Record<string, string> = {
  state_board: "State Board",
  cbse: "CBSE",
  icse: "ICSE",
  cambridge: "Cambridge",
  ib: "IB",
  nios: "NIOS",
  other: "Other",
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  board: string;
  class_min: number;
  class_max: number;
  language: string;
  cover_url: string | null;
  difficulty: string | null;
  estimated_hours: number | null;
};

type CategoryKey =
  | "10"
  | "11-science"
  | "11-commerce"
  | "11-humanities"
  | "12-science"
  | "12-commerce"
  | "12-humanities";

type CategoryDef = {
  key: CategoryKey;
  label: string;
  emoji: string;
  classNum: 10 | 11 | 12;
  subjects: string[];
};

const CATEGORIES: CategoryDef[] = [
  {
    key: "10",
    label: "Class 10",
    emoji: "📘",
    classNum: 10,
    subjects: ["Mathematics", "Science", "English", "Social Science", "Computer Science"],
  },
  {
    key: "11-science",
    label: "Class 11 · Science",
    emoji: "📙",
    classNum: 11,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
  },
  {
    key: "11-commerce",
    label: "Class 11 · Commerce",
    emoji: "📗",
    classNum: 11,
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
  },
  {
    key: "11-humanities",
    label: "Class 11 · Humanities",
    emoji: "📕",
    classNum: 11,
    subjects: ["History", "Geography", "Political Science", "Economics", "Sociology"],
  },
  {
    key: "12-science",
    label: "Class 12 · Science",
    emoji: "📘",
    classNum: 12,
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science"],
  },
  {
    key: "12-commerce",
    label: "Class 12 · Commerce",
    emoji: "📙",
    classNum: 12,
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
  },
  {
    key: "12-humanities",
    label: "Class 12 · Humanities",
    emoji: "📗",
    classNum: 12,
    subjects: ["History", "Geography", "Political Science", "Economics", "Sociology"],
  },
];

const SUBJECT_ICON: Record<string, ReactNode> = {
  Mathematics: <Calculator className="h-5 w-5" />,
  Science: <FlaskConical className="h-5 w-5" />,
  Physics: <Atom className="h-5 w-5" />,
  Chemistry: <FlaskConical className="h-5 w-5" />,
  Biology: <Leaf className="h-5 w-5" />,
  English: <Languages className="h-5 w-5" />,
  "Social Science": <Globe className="h-5 w-5" />,
  "Computer Science": <MonitorSmartphone className="h-5 w-5" />,
  Accountancy: <LineChart className="h-5 w-5" />,
  "Business Studies": <LineChart className="h-5 w-5" />,
  Economics: <LineChart className="h-5 w-5" />,
  History: <Landmark className="h-5 w-5" />,
  Geography: <Globe className="h-5 w-5" />,
  "Political Science": <Scale className="h-5 w-5" />,
  Sociology: <Users className="h-5 w-5" />,
};

function BrowseCoursesPage() {
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("10");

  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("student_profiles")
        .select("current_class, board, language")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data;
    },
    staleTime: 60_000,
  });

  const { data: schoolCourses = [] } = useQuery({
    queryKey: ["school-courses", profile?.board],
    enabled: !!profile,
    queryFn: async () => {
      const { data } = await supabase
        .from("courses")
        .select("id, title, description, subject, board, class_min, class_max, language, cover_url, difficulty, estimated_hours")
        .eq("board", profile!.board)
        .eq("is_published", true)
        .lte("class_min", 12)
        .gte("class_max", 10);
      return (data ?? []) as Course[];
    },
  });

  const { data: profileCourses, isLoading } = useQuery({
    queryKey: ["courses", "for-profile", profile?.board, profile?.current_class],
    enabled: !!profile,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, description, subject, board, class_min, class_max, language, cover_url, difficulty, estimated_hours")
        .eq("board", profile!.board)
        .lte("class_min", profile!.current_class)
        .gte("class_max", profile!.current_class)
        .eq("is_published", true)
        .order("subject");
      if (error) throw error;
      return (data ?? []) as Course[];
    },
  });

  const { data: enrolledIds } = useQuery({
    queryKey: ["me", "enrollments", "ids"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return new Set<string>();
      const { data } = await supabase
        .from("course_enrollments")
        .select("course_id")
        .eq("user_id", u.user.id);
      return new Set((data ?? []).map((r) => r.course_id));
    },
    staleTime: 30_000,
  });

  const enroll = useMutation({
    mutationFn: async (courseId: string) => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("course_enrollments")
        .insert({ user_id: u.user.id, course_id: courseId });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Enrolled");
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
      qc.invalidateQueries({ queryKey: ["me", "enrollments", "ids"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const courses = profileCourses ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        (c.description ?? "").toLowerCase().includes(q),
    );
  }, [profileCourses, query]);

  const activeCat = CATEGORIES.find((c) => c.key === activeCategory)!;

  const findSubjectCourse = (classNum: number, subject: string): Course | null => {
    const s = subject.toLowerCase();
    return (
      schoolCourses.find(
        (c) =>
          c.class_min <= classNum &&
          c.class_max >= classNum &&
          (c.subject.toLowerCase() === s ||
            c.subject.toLowerCase().includes(s) ||
            c.title.toLowerCase().includes(s)),
      ) ?? null
    );
  };

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="Browse Courses"
        description={
          profile
            ? `Showing courses for ${BOARD_LABEL[profile.board] ?? profile.board} · Class ${profile.current_class}`
            : "Loading your profile…"
        }
      />

      {/* School Education categorized catalog */}
      <section className="mb-8 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight">School Education</h2>
              <p className="text-xs text-muted-foreground">
                Grades 10–12 · Category-wise subjects
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveCategory(c.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                activeCategory === c.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-background hover:border-primary/40",
              )}
            >
              <span className="mr-1">{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeCat.subjects.map((subject) => {
            const match = findSubjectCourse(activeCat.classNum, subject);
            const icon = SUBJECT_ICON[subject] ?? <BookOpen className="h-5 w-5" />;
            if (match) {
              return (
                <Link
                  key={subject}
                  to="/dashboard/student/courses/$courseId"
                  params={{ courseId: match.id }}
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background p-4 transition hover:border-primary/50 hover:shadow-card"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold group-hover:text-primary">
                      {subject}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      Class {activeCat.classNum} · {match.title}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                    Open →
                  </span>
                </Link>
              );
            }
            return (
              <div
                key={subject}
                className="flex items-center gap-3 rounded-xl border border-dashed border-border/60 bg-muted/20 p-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{subject}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Class {activeCat.classNum} · Coming soon
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-card">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, subject, or description"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState board={profile?.board} classNum={profile?.current_class} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const enrolled = enrolledIds?.has(c.id);
            return (
              <div key={c.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.subject} · Class {c.class_min === c.class_max ? c.class_min : `${c.class_min}–${c.class_max}`}
                </p>
                <h3 className="mt-1 text-base font-semibold">{c.title}</h3>
                {c.description && (
                  <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{c.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-medium uppercase tracking-wider">
                  {c.difficulty && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                      {c.difficulty}
                    </span>
                  )}
                  {c.estimated_hours && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                      ~{c.estimated_hours}h
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Link
                    to="/dashboard/student/courses/$courseId"
                    params={{ courseId: c.id }}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View details →
                  </Link>
                  {enrolled ? (
                    <span className="text-xs text-muted-foreground">Enrolled</span>
                  ) : (
                    <Button
                      size="sm"
                      disabled={enroll.isPending}
                      onClick={() => enroll.mutate(c.id)}
                    >
                      {enroll.isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                      Enroll
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </RoleGate>
  );
}

function EmptyState({ board, classNum }: { board?: string; classNum?: number }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <Sparkles className="mx-auto h-6 w-6 text-muted-foreground" />
      <p className="mt-3 text-sm font-semibold">No courses match your profile yet</p>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        {board && classNum
          ? `We're adding courses for ${BOARD_LABEL[board] ?? board} · Class ${classNum}. Check back soon.`
          : "Complete your student profile to see personalized courses."}
      </p>
    </div>
  );
}
