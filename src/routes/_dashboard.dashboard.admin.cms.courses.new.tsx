import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { DashCard } from "@/components/dashboard/DashboardWidgets";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createCourse, listCategories } from "@/lib/cms/cms.functions";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms/courses/new")({
  component: NewCourse,
});

function NewCourse() {
  const navigate = useNavigate();
  const createFn = useServerFn(createCourse);
  const catFn = useServerFn(listCategories);
  const catsQ = useQuery({ queryKey: ["cms", "categories"], queryFn: () => catFn() });

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [subcategoryId, setSubcategoryId] = useState<string>("");
  const [instructor, setInstructor] = useState("");
  const [tags, setTags] = useState("");
  const [hours, setHours] = useState<number | "">("");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [visibility, setVisibility] = useState<"public" | "signed_in" | "role_gated" | "private">("signed_in");
  const [subject, setSubject] = useState("General");
  const [board, setBoard] = useState<"cbse" | "icse" | "state" | "ib" | "other">("other");
  const [aiGen, setAiGen] = useState(true);

  const subs = (catsQ.data?.subcategories ?? []).filter((s) => s.category_id === categoryId);

  const mut = useMutation({
    mutationFn: () =>
      createFn({
        data: {
          title,
          short_description: shortDesc || null,
          description: description || null,
          category_id: categoryId || null,
          subcategory_id: subcategoryId || null,
          instructor_name: instructor || null,
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          estimated_hours: typeof hours === "number" ? hours : null,
          difficulty,
          visibility,
          subject,
          board,
          class_min: 6,
          class_max: 12,
          generate_curriculum: aiGen,
        },
      }),
    onSuccess: (r) => {
      toast.success(aiGen ? "Course created — AI curriculum generated" : "Course created");
      navigate({ to: "/dashboard/admin/cms/courses/$courseId", params: { courseId: r.id } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <Link
        to="/dashboard/admin/cms/courses"
        className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
      >
        <ArrowLeft className="h-3 w-3" /> Back to courses
      </Link>
      <DashboardHeader
        title="New course"
        description="Start blank or generate a full curriculum with AI. You can edit everything after."
      />

      <DashCard className="max-w-3xl space-y-5">
        <Field label="Title *">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Short description">
          <input
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="One-liner for cards and listings"
            className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
        </Field>
        <Field label="Detailed description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category">
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setSubcategoryId("");
              }}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            >
              <option value="">— none —</option>
              {(catsQ.data?.categories ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Subcategory">
            <select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              disabled={!categoryId}
            >
              <option value="">— none —</option>
              {subs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Instructor / Creator">
            <input
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Subject / audience">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Difficulty">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </Field>
          <Field label="Estimated hours">
            <input
              type="number"
              min={0}
              value={hours}
              onChange={(e) => setHours(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            />
          </Field>
          <Field label="Visibility">
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as typeof visibility)}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            >
              <option value="public">Public</option>
              <option value="signed_in">Signed-in only</option>
              <option value="role_gated">Role-gated</option>
              <option value="private">Private</option>
            </select>
          </Field>
          <Field label="Board (school only)">
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value as typeof board)}
              className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
            >
              <option value="other">N/A</option>
              <option value="cbse">CBSE</option>
              <option value="icse">ICSE</option>
              <option value="state">State</option>
              <option value="ib">IB</option>
            </select>
          </Field>
        </div>

        <Field label="Tags (comma-separated)">
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="react, frontend, javascript"
            className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
        </Field>

        <label className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 p-3 text-sm">
          <input
            type="checkbox"
            checked={aiGen}
            onChange={(e) => setAiGen(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            <span className="inline-flex items-center gap-1 font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" /> Generate curriculum with AI
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Auto-produce modules, chapters, lessons, outcomes and prerequisites. You can review and edit everything before publishing.
            </span>
          </span>
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => navigate({ to: "/dashboard/admin/cms/courses" })}>
            Cancel
          </Button>
          <Button disabled={!title || mut.isPending} onClick={() => mut.mutate()}>
            {mut.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create course
          </Button>
        </div>
      </DashCard>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
