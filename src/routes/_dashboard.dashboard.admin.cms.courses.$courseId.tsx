import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Save,
  Sparkles,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getCmsCourse,
  updateCourse,
  upsertModule,
  deleteModule,
  reorderStructure,
  regenerateLessonContent,
  generateCourseResources,
  listCourseResources,
  RESOURCE_KINDS,
  RESOURCE_KIND_LABEL,
  type ResourceKind,
} from "@/lib/cms/cms.functions";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms/courses/$courseId")({
  component: CourseEditor,
});

function CourseEditor() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const getFn = useServerFn(getCmsCourse);
  const updateFn = useServerFn(updateCourse);
  const upsertModFn = useServerFn(upsertModule);
  const delModFn = useServerFn(deleteModule);
  const reorderFn = useServerFn(reorderStructure);
  const regenLessonFn = useServerFn(regenerateLessonContent);
  const genResourcesFn = useServerFn(generateCourseResources);
  const listResourcesFn = useServerFn(listCourseResources);

  const detailQ = useQuery({
    queryKey: ["cms", "course", courseId],
    queryFn: () => getFn({ data: { id: courseId } }),
  });
  const resourcesQ = useQuery({
    queryKey: ["cms", "course", courseId, "resources"],
    queryFn: () => listResourcesFn({ data: { course_id: courseId } }),
  });

  const [tab, setTab] = useState<"overview" | "curriculum" | "resources" | "history">("overview");

  // Overview form
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [prereqs, setPrereqs] = useState("");
  const [tags, setTags] = useState("");
  const [instructor, setInstructor] = useState("");
  const [hours, setHours] = useState<number | "">("");
  const [banner, setBanner] = useState("");

  useEffect(() => {
    if (!detailQ.data) return;
    const c = detailQ.data.course;
    setTitle(c.title);
    setShortDesc(c.short_description ?? "");
    setDescription(c.description ?? "");
    setOutcomes((c.learning_outcomes ?? []).join("\n"));
    setPrereqs((c.prerequisites ?? []).join("\n"));
    setTags((c.tags ?? []).join(", "));
    setInstructor(c.instructor_name ?? "");
    setHours(c.estimated_hours ?? "");
    setBanner(c.banner_url ?? "");
  }, [detailQ.data]);

  const saveMut = useMutation({
    mutationFn: () =>
      updateFn({
        data: {
          id: courseId,
          patch: {
            title,
            short_description: shortDesc || null,
            description: description || null,
            learning_outcomes: outcomes.split("\n").map((s) => s.trim()).filter(Boolean),
            prerequisites: prereqs.split("\n").map((s) => s.trim()).filter(Boolean),
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            instructor_name: instructor || null,
            estimated_hours: typeof hours === "number" ? hours : null,
            banner_url: banner || null,
          },
        },
      }),
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["cms", "course", courseId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (detailQ.isLoading || !detailQ.data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const { course, modules, chapters, lessons, history } = detailQ.data;

  return (
    <>
      <Link
        to="/dashboard/admin/cms/courses"
        className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
      >
        <ArrowLeft className="h-3 w-3" /> Back to courses
      </Link>
      <DashboardHeader
        title={course.title}
        description={`${course.cms_status} · v${course.version} · ${course.view_count} views`}
        actions={
          <Button onClick={() => saveMut.mutate()} disabled={saveMut.isPending}>
            {saveMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save changes
          </Button>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {(["overview", "curriculum", "resources", "history"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl border px-3 py-1.5 text-sm capitalize ${
              tab === t ? "border-primary bg-primary/10 text-primary" : "border-border/60 hover:border-primary/40"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <DashCard>
            <Field label="Title">
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
                className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Detailed description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Instructor">
              <input
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              />
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
          </DashCard>
          <DashCard>
            <Field label="Learning outcomes (one per line)">
              <textarea
                value={outcomes}
                onChange={(e) => setOutcomes(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Prerequisites (one per line)">
              <textarea
                value={prereqs}
                onChange={(e) => setPrereqs(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Tags (comma-separated)">
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              />
            </Field>
            <Field label="Banner URL">
              <input
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                placeholder="https://…"
                className="w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
              />
            </Field>
          </DashCard>
        </div>
      )}

      {tab === "curriculum" && (
        <CurriculumTab
          courseId={courseId}
          modules={modules}
          chapters={chapters}
          lessons={lessons}
          onUpsertModule={async (input) => {
            try {
              await upsertModFn({ data: input });
              qc.invalidateQueries({ queryKey: ["cms", "course", courseId] });
            } catch (e) {
              toast.error((e as Error).message);
            }
          }}
          onDeleteModule={async (id) => {
            try {
              await delModFn({ data: { id } });
              qc.invalidateQueries({ queryKey: ["cms", "course", courseId] });
            } catch (e) {
              toast.error((e as Error).message);
            }
          }}
          onReorder={async (entity, ids) => {
            try {
              await reorderFn({ data: { entity, ids } });
              qc.invalidateQueries({ queryKey: ["cms", "course", courseId] });
            } catch (e) {
              toast.error((e as Error).message);
            }
          }}
          onRegenLesson={async (id) => {
            try {
              toast.loading("Regenerating lesson…", { id: "regen" });
              await regenLessonFn({ data: { lesson_id: id } });
              toast.success("Lesson regenerated", { id: "regen" });
              qc.invalidateQueries({ queryKey: ["cms", "course", courseId] });
            } catch (e) {
              toast.error((e as Error).message, { id: "regen" });
            }
          }}
        />
      )}

      {tab === "resources" && (
        <ResourcesTab
          courseId={courseId}
          resources={resourcesQ.data ?? []}
          onGenerate={async (kinds) => {
            try {
              toast.loading("Generating resources…", { id: "gen-res" });
              const r = await genResourcesFn({ data: { course_id: courseId, kinds } });
              toast.success(`Created ${r.created} resources`, { id: "gen-res" });
              qc.invalidateQueries({ queryKey: ["cms", "course", courseId, "resources"] });
            } catch (e) {
              toast.error((e as Error).message, { id: "gen-res" });
            }
          }}
        />
      )}

      {tab === "history" && (
        <DashCard>
          {history.length === 0 ? (
            <div className="text-sm text-muted-foreground">No approval history yet.</div>
          ) : (
            <ul className="divide-y divide-border/60">
              {history.map((h, i) => (
                <li key={i} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <span className="font-medium capitalize">{h.from_status ?? "—"}</span>
                    <span className="mx-2 text-muted-foreground">→</span>
                    <span className="font-medium capitalize">{h.to_status}</span>
                    {h.note && <span className="ml-2 text-muted-foreground">· {h.note}</span>}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(h.created_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </DashCard>
      )}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

type ModuleRow = { id: string; title: string; description: string | null; order_index: number; status: string; ai_generated: boolean };
type ChapterRow = { id: string; module_id: string | null; title: string; summary: string | null; order_index: number; status: string; ai_generated: boolean };
type LessonRow = { id: string; chapter_id: string; title: string; order_index: number; status: string; ai_generated: boolean };

function CurriculumTab({
  courseId,
  modules,
  chapters,
  lessons,
  onUpsertModule,
  onDeleteModule,
  onReorder,
  onRegenLesson,
}: {
  courseId: string;
  modules: ModuleRow[];
  chapters: ChapterRow[];
  lessons: LessonRow[];
  onUpsertModule: (input: { id?: string; course_id: string; title: string; description?: string; order_index?: number }) => Promise<void>;
  onDeleteModule: (id: string) => Promise<void>;
  onReorder: (entity: "module" | "chapter" | "lesson", ids: string[]) => Promise<void>;
  onRegenLesson: (id: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const moduleOrder = [...modules].sort((a, b) => a.order_index - b.order_index);

  function moveModule(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= moduleOrder.length) return;
    const ids = moduleOrder.map((m) => m.id);
    [ids[idx], ids[target]] = [ids[target], ids[idx]];
    onReorder("module", ids);
  }
  function moveLesson(chapterId: string, idx: number, dir: -1 | 1) {
    const chapLessons = lessons.filter((l) => l.chapter_id === chapterId).sort((a, b) => a.order_index - b.order_index);
    const target = idx + dir;
    if (target < 0 || target >= chapLessons.length) return;
    const ids = chapLessons.map((l) => l.id);
    [ids[idx], ids[target]] = [ids[target], ids[idx]];
    onReorder("lesson", ids);
  }

  return (
    <div className="space-y-4">
      <DashCard>
        <div className="flex items-center gap-2">
          <input
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="New module title…"
            className="flex-1 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
          <Button
            size="sm"
            disabled={!newModuleTitle.trim()}
            onClick={async () => {
              await onUpsertModule({
                course_id: courseId,
                title: newModuleTitle.trim(),
                order_index: moduleOrder.length,
              });
              setNewModuleTitle("");
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Add module
          </Button>
        </div>
      </DashCard>

      {moduleOrder.map((mod, mi) => {
        const modChapters = chapters
          .filter((c) => c.module_id === mod.id)
          .sort((a, b) => a.order_index - b.order_index);
        const open = expanded[mod.id] !== false;
        return (
          <DashCard key={mod.id}>
            <div className="flex items-start gap-2">
              <button
                onClick={() => setExpanded((s) => ({ ...s, [mod.id]: !open }))}
                className="mt-1 rounded p-1 hover:bg-muted"
              >
                {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              <div className="min-w-0 flex-1">
                {editingId === mod.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 rounded-lg border border-border/60 bg-background px-2 py-1 text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={async () => {
                        await onUpsertModule({
                          id: mod.id,
                          course_id: courseId,
                          title: editTitle.trim() || mod.title,
                        });
                        setEditingId(null);
                      }}
                    >
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-semibold">
                      Module {mi + 1}: {mod.title}
                    </span>
                    <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] capitalize text-muted-foreground">
                      {mod.status}
                    </span>
                    {mod.ai_generated && (
                      <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-400">
                        AI
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => moveModule(mi, -1)} className="rounded p-1 hover:bg-muted" title="Move up">
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => moveModule(mi, 1)} className="rounded p-1 hover:bg-muted" title="Move down">
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    setEditingId(mod.id);
                    setEditTitle(mod.title);
                  }}
                  className="rounded p-1 hover:bg-muted"
                  title="Rename"
                >
                  <Save className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete module "${mod.title}"? Chapters are kept.`)) onDeleteModule(mod.id);
                  }}
                  className="rounded p-1 text-rose-500 hover:bg-rose-500/10"
                  title="Delete module"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {open && (
              <div className="mt-3 space-y-3 border-l border-border/60 pl-4">
                {modChapters.length === 0 && (
                  <div className="text-xs text-muted-foreground">No chapters attached.</div>
                )}
                {modChapters.map((chap, ci) => {
                  const chapLessons = lessons
                    .filter((l) => l.chapter_id === chap.id)
                    .sort((a, b) => a.order_index - b.order_index);
                  return (
                    <div key={chap.id} className="rounded-xl border border-border/60 bg-muted/20 p-3">
                      <div className="mb-2 text-sm font-medium">
                        Chapter {ci + 1}: {chap.title}
                      </div>
                      <ul className="space-y-1 text-sm">
                        {chapLessons.map((lesson, li) => (
                          <li key={lesson.id} className="flex items-center justify-between gap-2">
                            <span className="truncate">
                              <span className="text-muted-foreground">L{li + 1}.</span> {lesson.title}
                              {lesson.ai_generated && (
                                <span className="ml-2 text-[10px] text-violet-400">AI</span>
                              )}
                            </span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => moveLesson(chap.id, li, -1)} className="rounded p-1 hover:bg-muted">
                                <ArrowUp className="h-3 w-3" />
                              </button>
                              <button onClick={() => moveLesson(chap.id, li, 1)} className="rounded p-1 hover:bg-muted">
                                <ArrowDown className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => onRegenLesson(lesson.id)}
                                className="inline-flex items-center gap-1 rounded p-1 text-violet-400 hover:bg-violet-500/10"
                                title="Regenerate content with AI"
                              >
                                <Sparkles className="h-3 w-3" />
                              </button>
                            </div>
                          </li>
                        ))}
                        {chapLessons.length === 0 && (
                          <li className="text-xs text-muted-foreground">No lessons.</li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </DashCard>
        );
      })}

      {/* Chapters attached to no module */}
      {chapters.some((c) => !c.module_id) && (
        <DashCard>
          <SectionHeader title="Unassigned chapters" hint="Chapters not yet linked to a module" />
          <ul className="mt-2 space-y-1 text-sm">
            {chapters
              .filter((c) => !c.module_id)
              .map((c) => (
                <li key={c.id}>{c.title}</li>
              ))}
          </ul>
        </DashCard>
      )}
    </div>
  );
}

function ResourcesTab({
  courseId: _courseId,
  resources,
  onGenerate,
}: {
  courseId: string;
  resources: { id: string; kind: ResourceKind; title: string; summary: string | null; status: string; ai_generated: boolean; is_downloadable: boolean }[];
  onGenerate: (kinds: ResourceKind[]) => Promise<void>;
}) {
  const [selected, setSelected] = useState<Set<ResourceKind>>(new Set(["beginner_guide", "roadmap", "cheat_sheet"]));
  return (
    <div className="space-y-4">
      <DashCard>
        <SectionHeader title="Generate resources with AI" hint="Pick the kinds you want to auto-create" />
        <div className="mb-3 flex flex-wrap gap-2">
          {RESOURCE_KINDS.map((k) => {
            const on = selected.has(k);
            return (
              <button
                key={k}
                onClick={() =>
                  setSelected((s) => {
                    const next = new Set(s);
                    if (next.has(k)) next.delete(k);
                    else next.add(k);
                    return next;
                  })
                }
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  on ? "border-primary bg-primary/10 text-primary" : "border-border/60 hover:border-primary/40"
                }`}
              >
                {RESOURCE_KIND_LABEL[k]}
              </button>
            );
          })}
        </div>
        <div className="flex justify-end">
          <Button
            disabled={selected.size === 0}
            onClick={() => onGenerate(Array.from(selected))}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Generate {selected.size}
          </Button>
        </div>
      </DashCard>

      <DashCard>
        <SectionHeader title="Existing resources" />
        {resources.length === 0 ? (
          <div className="text-sm text-muted-foreground">No resources yet — generate some above.</div>
        ) : (
          <ul className="divide-y divide-border/60">
            {resources.map((r) => (
              <li key={r.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {RESOURCE_KIND_LABEL[r.kind]} · {r.status}
                    {r.ai_generated ? " · AI" : ""}
                    {r.is_downloadable ? " · downloadable" : ""}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </DashCard>
    </div>
  );
}
