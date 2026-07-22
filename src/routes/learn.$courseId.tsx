import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  Bot,
  Brain,
  Clock,
  Code2,
  FileText,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Library,
  ListChecks,
  Loader2,
  MessageSquare,
  NotebookPen,
  Send,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  generateWorkspaceContent,
  type WorkspacePayload,
  type WorkspaceSection,
} from "@/lib/ai/workspace.functions";

export const Route = createFileRoute("/learn/$courseId")({
  head: () => ({
    meta: [
      { title: "AI Learning Workspace — EduNova AI" },
      { name: "description", content: "Personalized AI-powered learning workspace." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LearnWorkspacePage,
});

type SectionDef = {
  id: WorkspaceSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  technicalOnly?: boolean;
};

const SECTIONS: SectionDef[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "lesson", label: "Lessons", icon: BookOpen },
  { id: "notes", label: "AI Notes", icon: NotebookPen },
  { id: "code", label: "AI Code Assistant", icon: Code2, technicalOnly: true },
  { id: "theory", label: "AI Theory Assistant", icon: Brain },
  { id: "practice", label: "Practice", icon: Target },
  { id: "assignments", label: "Assignments", icon: FileText },
  { id: "quizzes", label: "Quizzes", icon: ListChecks },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "resources", label: "Resources", icon: Library },
  { id: "discussions", label: "Discussions", icon: MessageSquare },
];

function LearnWorkspacePage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState<WorkspaceSection>("overview");
  const [message, setMessage] = useState("");
  const [assistantMode, setAssistantMode] = useState<"generate" | "explain" | "debug" | "optimize" | "review">(
    "generate",
  );

  // Auth gate (workspace opens in a new tab — enforce here).
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && !data.user) navigate({ to: "/login" });
    });
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const { data: course } = useQuery({
    queryKey: ["learn", "course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, subject, description, difficulty, estimated_hours")
        .eq("id", courseId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: enrollment } = useQuery({
    queryKey: ["learn", "enrollment", courseId],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return null;
      const { data } = await supabase
        .from("course_enrollments")
        .select("progress")
        .eq("user_id", u.user.id)
        .eq("course_id", courseId)
        .maybeSingle();
      return data;
    },
  });

  const { data: chapters } = useQuery({
    queryKey: ["learn", "chapters", courseId],
    queryFn: async () => {
      const { data } = await supabase
        .from("chapters")
        .select("id, title, order_index")
        .eq("course_id", courseId)
        .order("order_index")
        .limit(1);
      return data ?? [];
    },
  });

  const isTechnical = useMemo(() => {
    const s = `${course?.subject ?? ""} ${course?.title ?? ""}`;
    return /program|code|javascript|python|c\+\+|c\b|java|react|node|web|data|ai|ml|generative|api|dev|software|algorithm|dsa/i.test(
      s,
    );
  }, [course]);

  const visibleSections = SECTIONS.filter((s) => !s.technicalOnly || isTechnical);

  const gen = useServerFn(generateWorkspaceContent);
  const contentMutation = useMutation({
    mutationFn: (input: {
      section: WorkspaceSection;
      message?: string;
      mode?: "generate" | "explain" | "debug" | "optimize" | "review" | "summarize" | "revise";
    }) => gen({ data: { courseId, ...input } }),
  });

  const [contentBySection, setContentBySection] = useState<Partial<Record<WorkspaceSection, WorkspacePayload>>>({});
  const current = contentBySection[section];

  // Auto-load section content on first switch
  useEffect(() => {
    if (!course) return;
    if (contentBySection[section] || contentMutation.isPending) return;
    contentMutation.mutate(
      { section, message: undefined, mode: section === "code" ? "generate" : undefined },
      {
        onSuccess: (payload) =>
          setContentBySection((prev) => ({ ...prev, [section]: payload })),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, course]);

  const sendAssistant = () => {
    const text = message.trim();
    if (!text || contentMutation.isPending) return;
    contentMutation.mutate(
      { section, message: text, mode: section === "code" ? assistantMode : "explain" },
      {
        onSuccess: (payload) => {
          setContentBySection((prev) => ({ ...prev, [section]: payload }));
          setMessage("");
        },
      },
    );
  };

  const progress = enrollment?.progress ?? 0;
  const eta = course?.estimated_hours ? `${Math.max(1, Math.round(course.estimated_hours * (1 - progress / 100)))}h left` : "—";

  return (
    <div className="fixed inset-0 flex flex-col bg-background text-foreground">
      {/* Top Header */}
      <header className="flex flex-wrap items-center gap-4 border-b border-border/60 bg-card/60 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">AI Learning Workspace</p>
            <h1 className="truncate text-sm font-semibold sm:text-base">
              {course?.title ?? "Loading course…"}
            </h1>
          </div>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            {course?.subject ?? "—"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {eta}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold text-foreground">{progress}%</span>
          </span>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <Button
            size="sm"
            onClick={() => {
              setSection("lesson");
              setContentBySection((prev) => {
                const clone = { ...prev };
                delete clone.lesson;
                return clone;
              });
            }}
          >
            Continue Learning
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-border/60 bg-card/40 py-4 md:flex">
          <nav className="flex-1 space-y-1 px-2">
            {visibleSections.map((s) => {
              const Icon = s.icon;
              const active = section === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-3 border-t border-border/60 px-3 pt-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" /> Personalized for your role
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-6">
            {/* Mobile section pills */}
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 md:hidden">
              {visibleSections.map((s) => {
                const active = section === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1.5 text-xs",
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border/60 bg-card",
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>

            {contentMutation.isPending && !current ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card p-12 text-center shadow-card">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-sm font-medium">Nova is preparing your {SECTIONS.find((s) => s.id === section)?.label}…</p>
                <p className="text-xs text-muted-foreground">Tailoring to your role, progress and goals.</p>
              </div>
            ) : contentMutation.isError && !current ? (
              <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-6 text-sm">
                <p className="font-semibold text-destructive">Content unavailable</p>
                <p className="mt-1 text-muted-foreground">
                  {(contentMutation.error as Error)?.message ?? "Please retry."}
                </p>
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={() =>
                    contentMutation.mutate({ section, mode: section === "code" ? "generate" : undefined })
                  }
                >
                  Retry
                </Button>
              </div>
            ) : current ? (
              <SectionContent payload={current} />
            ) : null}

            {/* AI Assistant composer (for chat-y sections) */}
            {(section === "code" || section === "theory") && (
              <div className="rounded-2xl border border-primary/30 bg-card p-4 shadow-card">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Bot className="h-3.5 w-3.5" />
                  {section === "code" ? "AI Code Assistant" : "AI Theory Assistant"}
                </div>
                {section === "code" && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {(["generate", "explain", "debug", "optimize", "review"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setAssistantMode(m)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px] capitalize",
                          assistantMode === m
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/60 bg-background/60 hover:border-primary/50",
                        )}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        sendAssistant();
                      }
                    }}
                    placeholder={
                      section === "code"
                        ? "Ask for code, paste a snippet to debug, or request an optimization…"
                        : "Ask a concept question, request notes, or say 'summarize this lesson'…"
                    }
                    className="resize-none"
                  />
                  <Button onClick={sendAssistant} disabled={contentMutation.isPending || !message.trim()} className="self-end">
                    {contentMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {current?.followUps && current.followUps.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {current.followUps.map((f) => (
                      <button
                        key={f}
                        onClick={() => setMessage(f)}
                        className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] hover:border-primary/50"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function SectionContent({ payload }: { payload: WorkspacePayload }) {
  return (
    <article className="space-y-5">
      <header className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-card">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
          {payload.section.replace(/^./, (c) => c.toUpperCase())}
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight">{payload.title}</h2>
        {payload.intro && <p className="mt-2 text-sm text-muted-foreground">{payload.intro}</p>}
      </header>

      <div className="space-y-4">
        {payload.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} index={i} />
        ))}
      </div>
    </article>
  );
}

function BlockRenderer({ block, index }: { block: WorkspacePayload["blocks"][number]; index: number }) {
  const [revealed, setRevealed] = useState<number | null>(null);
  if (block.type === "text") {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        {block.heading && <h3 className="mb-2 text-base font-semibold">{block.heading}</h3>}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <ReactMarkdown>{block.body}</ReactMarkdown>
        </div>
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        {block.heading && <h3 className="mb-2 text-base font-semibold">{block.heading}</h3>}
        <ul className="list-disc space-y-1.5 pl-5 text-sm">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.type === "code") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-zinc-950 shadow-card">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
          <span className="font-mono uppercase tracking-widest">{block.language || "code"}</span>
          {block.caption && <span className="truncate">{block.caption}</span>}
        </div>
        <pre className="max-h-[420px] overflow-auto p-4 text-xs leading-relaxed text-zinc-100">
          <code>{block.code}</code>
        </pre>
      </div>
    );
  }
  if (block.type === "example") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 shadow-card">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Example</p>
        <h3 className="mt-1 text-base font-semibold">{block.title}</h3>
        <div className="prose prose-sm mt-2 max-w-none dark:prose-invert">
          <ReactMarkdown>{block.body}</ReactMarkdown>
        </div>
      </div>
    );
  }
  if (block.type === "quiz") {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Quick check</p>
        <h3 className="mt-1 text-sm font-semibold">{block.question}</h3>
        <div className="mt-3 grid gap-2">
          {block.options.map((opt, i) => {
            const isPicked = revealed === i;
            const isRight = i === block.answerIndex;
            return (
              <button
                key={i}
                onClick={() => setRevealed(i)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left text-sm transition",
                  revealed === null && "border-border/60 hover:border-primary/50",
                  revealed !== null && isRight && "border-emerald-500/60 bg-emerald-500/10",
                  revealed !== null && !isRight && isPicked && "border-destructive/60 bg-destructive/10",
                  revealed !== null && !isRight && !isPicked && "border-border/40 opacity-70",
                )}
                disabled={revealed !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {revealed !== null && (
          <p className="mt-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Why:</span> {block.explanation}
          </p>
        )}
      </div>
    );
  }
  if (block.type === "task") {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Target className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">
              Task {index + 1}: {block.title}
            </h3>
            <div className="prose prose-sm mt-1 max-w-none dark:prose-invert">
              <ReactMarkdown>{block.description}</ReactMarkdown>
            </div>
            {block.hint && (
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Hint:</span> {block.hint}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
