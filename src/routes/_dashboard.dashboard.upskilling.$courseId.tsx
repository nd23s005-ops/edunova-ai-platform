import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  GraduationCap,
  Layers,
  Loader2,
  Sparkles,
  Target,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/courses/CourseUI";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/dashboard/upskilling/$courseId")({
  component: UpskillCourseDetail,
});

type Module = { title: string; summary?: string };

type UpskillCourse = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  difficulty: string;
  estimated_hours: number | null;
  learning_objectives: string[];
  prerequisites: string[];
  modules: Module[];
};

type Enrollment = {
  id: string;
  progress: number;
  completed_modules: number[];
  status: string;
};

// Unsafe-cast helper to work around not-yet-regenerated Supabase types.
const sb = supabase as unknown as {
  from: (t: string) => any;
  auth: typeof supabase.auth;
};

function UpskillCourseDetail() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: course, isLoading } = useQuery({
    queryKey: ["upskill-course", courseId],
    queryFn: async () => {
      const { data, error } = await sb
        .from("upskill_courses")
        .select("id, title, category, description, difficulty, estimated_hours, learning_objectives, prerequisites, modules")
        .eq("id", courseId)
        .maybeSingle();
      if (error) throw error;
      return data as UpskillCourse | null;
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ["upskill-enrollment", courseId],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await sb
        .from("upskill_enrollments")
        .select("id, progress, completed_modules, status")
        .eq("course_id", courseId)
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data as Enrollment | null;
    },
  });

  const enroll = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Sign in required");
      const { error } = await sb
        .from("upskill_enrollments")
        .insert({ user_id: u.user.id, course_id: courseId, progress: 0, completed_modules: [] });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Enrolled");
      qc.invalidateQueries({ queryKey: ["upskill-enrollment", courseId] });
      qc.invalidateQueries({ queryKey: ["upskill-enrollments-ids"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const totalModules = course?.modules.length ?? 0;

  const toggleModule = useMutation({
    mutationFn: async (idx: number) => {
      if (!enrollment) throw new Error("Enroll first");
      const set = new Set(enrollment.completed_modules ?? []);
      if (set.has(idx)) set.delete(idx);
      else set.add(idx);
      const arr = Array.from(set).sort((a, b) => a - b);
      const progress = totalModules > 0 ? Math.round((arr.length / totalModules) * 100) : 0;
      const { error } = await sb
        .from("upskill_enrollments")
        .update({
          completed_modules: arr,
          progress,
          status: progress >= 100 ? "completed" : "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", enrollment.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["upskill-enrollment", courseId] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const completedSet = useMemo(
    () => new Set(enrollment?.completed_modules ?? []),
    [enrollment?.completed_modules],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!course) {
    return (
      <p className="text-sm text-muted-foreground">Course not found.</p>
    );
  }

  const isCompleted = (enrollment?.progress ?? 0) >= 100;

  return (
    <>
      <button
        onClick={() => navigate({ to: "/dashboard/upskilling" })}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Upskilling Hub
      </button>

      <DashboardHeader
        title={course.title}
        description={course.description ?? undefined}
        actions={
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
              {course.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {course.estimated_hours ?? "—"}h
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
              {course.difficulty}
            </span>
          </div>
        }
      />

      <div className="mb-6 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Your progress
            </p>
            <p className="mt-1 text-2xl font-bold">{enrollment?.progress ?? 0}%</p>
            <div className="mt-2">
              <ProgressBar value={enrollment?.progress ?? 0} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!enrollment ? (
              <Button onClick={() => enroll.mutate()} disabled={enroll.isPending}>
                {enroll.isPending ? "Enrolling…" : "Enroll now"}
              </Button>
            ) : isCompleted ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                <CheckCircle2 className="h-4 w-4" /> Course completed
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                {completedSet.size} of {totalModules} modules complete
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Layers className="h-4 w-4 text-primary" /> Weekly learning plan
            </h2>
            <ol className="space-y-2">
              {course.modules.map((m, i) => {
                const done = completedSet.has(i);
                return (
                  <li
                    key={i}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border border-border/60 p-3 transition",
                      done ? "bg-primary/5" : "bg-background",
                    )}
                  >
                    <button
                      onClick={() => enrollment && toggleModule.mutate(i)}
                      disabled={!enrollment || toggleModule.isPending}
                      className={cn(
                        "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition",
                        done
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary",
                      )}
                      aria-label={done ? "Mark incomplete" : "Mark complete"}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : <span className="text-xs">{i + 1}</span>}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className={cn("text-sm font-medium", done && "line-through text-muted-foreground")}>
                        {m.title}
                      </p>
                      {m.summary && <p className="mt-0.5 text-xs text-muted-foreground">{m.summary}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
            {!enrollment && (
              <p className="mt-3 text-xs text-muted-foreground">Enroll to check off modules and track progress.</p>
            )}
          </section>

          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> AI Learning Assistant
            </h2>
            <p className="text-sm text-muted-foreground">
              Ask Nova to explain module concepts, summarise topics, or generate practice questions while you learn.
            </p>
            <div className="mt-3">
              <Link to="/dashboard/ai-assistant">
                <Button size="sm" variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" /> Open AI Assistant
                </Button>
              </Link>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Target className="h-4 w-4 text-primary" /> Learning objectives
            </h2>
            <ul className="space-y-2 text-sm">
              {(course.learning_objectives ?? []).map((o, i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" /> Prerequisites
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {(course.prerequisites ?? []).map((o, i) => (
                <li key={i} className="flex gap-2">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
