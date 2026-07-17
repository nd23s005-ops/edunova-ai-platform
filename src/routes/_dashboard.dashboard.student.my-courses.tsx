import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, Compass, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_dashboard/dashboard/student/my-courses")({
  component: MyCoursesPage,
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

type EnrolledRow = {
  id: string;
  progress: number;
  course_id: string;
  courses: {
    id: string;
    title: string;
    description: string | null;
    subject: string;
    board: string;
    class_min: number;
    class_max: number;
  } | null;
};

function MyCoursesPage() {
  const qc = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["me", "student_profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("student_profiles")
        .select("current_class, board")
        .eq("user_id", u.user.id)
        .maybeSingle();
      return data;
    },
    staleTime: 60_000,
  });

  const { data: enrollments, isLoading } = useQuery({
    queryKey: ["me", "enrollments", "with-course", profile?.board, profile?.current_class],
    enabled: !!profile,
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return [];
      const { data, error } = await supabase
        .from("course_enrollments")
        .select(
          "id, progress, course_id, courses:course_id (id, title, description, subject, board, class_min, class_max)",
        )
        .eq("user_id", u.user.id)
        .order("enrolled_at", { ascending: false });
      if (error) throw error;
      const rows = (data ?? []) as unknown as EnrolledRow[];
      // Filter to only those matching current board & class
      return rows.filter(
        (r) =>
          r.courses &&
          r.courses.board === profile!.board &&
          r.courses.class_min <= profile!.current_class &&
          r.courses.class_max >= profile!.current_class,
      );
    },
  });

  const unenroll = useMutation({
    mutationFn: async (enrollmentId: string) => {
      const { error } = await supabase
        .from("course_enrollments")
        .delete()
        .eq("id", enrollmentId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Removed from My Courses");
      qc.invalidateQueries({ queryKey: ["me", "enrollments"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <RoleGate allow={["student"]}>
      <DashboardHeader
        title="My Courses"
        description={
          profile
            ? `${BOARD_LABEL[profile.board] ?? profile.board} · Class ${profile.current_class}`
            : "Your enrolled courses"
        }
        actions={
          <Link to="/dashboard/student/browse">
            <Button variant="outline">Browse courses</Button>
          </Link>
        }
      />

      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : !enrollments || enrollments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <Compass className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 text-sm font-semibold">No courses yet for your board & class</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Browse the catalog to find courses tailored to your profile.
          </p>
          <Link to="/dashboard/student/browse">
            <Button className="mt-5">Browse courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((row) => {
            const c = row.courses!;
            return (
              <div key={row.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {c.subject} · Class {c.class_min === c.class_max ? c.class_min : `${c.class_min}–${c.class_max}`}
                </p>
                <h3 className="mt-1 text-base font-semibold">{c.title}</h3>
                {c.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                )}
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{row.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${row.progress}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={() => unenroll.mutate(row.id)}
                    disabled={unenroll.isPending}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </RoleGate>
  );
}
