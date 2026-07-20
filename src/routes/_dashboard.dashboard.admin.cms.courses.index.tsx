import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Archive,
  RotateCcw,
  Copy,
  Trash2,
  Send,
  CheckCircle2,
  Globe,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { DashCard } from "@/components/dashboard/DashboardWidgets";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  listCmsCourses,
  duplicateCourse,
  transitionCourseStatus,
} from "@/lib/cms/cms.functions";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms/courses/")({
  component: CoursesList,
});

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  review: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  approved: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  archived: "bg-rose-500/10 text-rose-500 border-rose-500/30",
};

function CoursesList() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listFn = useServerFn(listCmsCourses);
  const dupFn = useServerFn(duplicateCourse);
  const transitionFn = useServerFn(transitionCourseStatus);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "review" | "approved" | "published" | "archived">("all");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const q = useQuery({
    queryKey: ["cms", "courses", search, status, includeDeleted],
    queryFn: () => listFn({ data: { search: search || undefined, status, includeDeleted } }),
  });

  type TransitionAction = "submit_review" | "approve" | "reject" | "publish" | "unpublish" | "archive" | "restore" | "soft_delete" | "hard_restore";
  async function doAction(id: string, action: TransitionAction) {
    try {
      await transitionFn({ data: { id, action } });
      toast.success("Updated");
      await qc.invalidateQueries({ queryKey: ["cms"] });
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <>
      <Link
        to="/dashboard/admin/cms"
        className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
      >
        <ArrowLeft className="h-3 w-3" /> Back to CMS
      </Link>
      <DashboardHeader
        title="Courses"
        description="Full CRUD with AI curriculum generation, drafts, review, publishing and archive."
        actions={
          <Button onClick={() => navigate({ to: "/dashboard/admin/cms/courses/new" })}>
            <Plus className="mr-2 h-4 w-4" /> New course
          </Button>
        }
      />

      <DashCard className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title…"
              className="w-full rounded-xl border border-border/60 bg-background py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              className="rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            >
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={includeDeleted}
              onChange={(e) => setIncludeDeleted(e.target.checked)}
            />
            Include deleted
          </label>
        </div>
      </DashCard>

      <div className="space-y-3">
        {(q.data ?? []).map((c) => (
          <DashCard key={c.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to="/dashboard/admin/cms/courses/$courseId"
                    params={{ courseId: c.id }}
                    className="text-base font-semibold hover:text-primary"
                  >
                    {c.title}
                  </Link>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      STATUS_COLORS[c.cms_status] ?? "border-border/60"
                    }`}
                  >
                    {c.cms_status}
                  </span>
                  {c.ai_generated && (
                    <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">
                      AI
                    </span>
                  )}
                  {c.deleted_at && (
                    <span className="inline-flex items-center rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-medium text-rose-400">
                      deleted
                    </span>
                  )}
                </div>
                {c.short_description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {c.short_description}
                  </p>
                )}
                <div className="mt-2 text-xs text-muted-foreground">
                  Updated {new Date(c.updated_at).toLocaleString()} · v{c.version} · {c.view_count} views
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <MiniBtn onClick={() => navigate({ to: "/dashboard/admin/cms/courses/$courseId", params: { courseId: c.id } })}>
                  <Eye className="h-3.5 w-3.5" /> Edit
                </MiniBtn>
                {c.cms_status === "draft" && (
                  <MiniBtn onClick={() => doAction(c.id, "submit_review")}>
                    <Send className="h-3.5 w-3.5" /> Submit
                  </MiniBtn>
                )}
                {c.cms_status === "review" && (
                  <>
                    <MiniBtn onClick={() => doAction(c.id, "approve")}>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </MiniBtn>
                    <MiniBtn onClick={() => doAction(c.id, "reject")}>Reject</MiniBtn>
                  </>
                )}
                {(c.cms_status === "approved" || c.cms_status === "archived") && (
                  <MiniBtn onClick={() => doAction(c.id, "publish")}>
                    <Globe className="h-3.5 w-3.5" /> Publish
                  </MiniBtn>
                )}
                {c.cms_status === "published" && (
                  <MiniBtn onClick={() => doAction(c.id, "unpublish")}>Unpublish</MiniBtn>
                )}
                {c.cms_status !== "archived" && !c.deleted_at && (
                  <MiniBtn onClick={() => doAction(c.id, "archive")}>
                    <Archive className="h-3.5 w-3.5" /> Archive
                  </MiniBtn>
                )}
                {c.cms_status === "archived" && (
                  <MiniBtn onClick={() => doAction(c.id, "restore")}>
                    <RotateCcw className="h-3.5 w-3.5" /> Restore
                  </MiniBtn>
                )}
                <MiniBtn
                  onClick={async () => {
                    try {
                      const r = await dupFn({ data: { id: c.id } });
                      toast.success("Duplicated");
                      navigate({ to: "/dashboard/admin/cms/courses/$courseId", params: { courseId: r.id } });
                    } catch (e) {
                      toast.error((e as Error).message);
                    }
                  }}
                >
                  <Copy className="h-3.5 w-3.5" /> Duplicate
                </MiniBtn>
                {!c.deleted_at ? (
                  <MiniBtn onClick={() => doAction(c.id, "soft_delete")} danger>
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </MiniBtn>
                ) : (
                  <MiniBtn onClick={() => doAction(c.id, "hard_restore")}>Restore</MiniBtn>
                )}
              </div>
            </div>
          </DashCard>
        ))}
        {q.data && q.data.length === 0 && (
          <DashCard className="text-center text-sm text-muted-foreground">
            No courses match. Create one to get started.
          </DashCard>
        )}
      </div>
    </>
  );
}

function MiniBtn({ children, onClick, danger }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
        danger
          ? "border-rose-500/40 text-rose-500 hover:bg-rose-500/10"
          : "border-border/60 hover:border-primary/40 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}
