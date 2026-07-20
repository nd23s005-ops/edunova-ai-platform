import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Compass,
  Sparkles,
  Target,
  ClipboardList,
  Search,
  LayoutDashboard,
  Settings,
  Rocket,
  GraduationCap,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

type Action = {
  id: string;
  label: string;
  hint?: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Navigate" | "Learn" | "Assess" | "Explore";
  keywords?: string;
};

const ACTIONS: Action[] = [
  { id: "dash", label: "Dashboard overview", to: "/dashboard", icon: LayoutDashboard, group: "Navigate" },
  { id: "profile", label: "Profile & settings", to: "/dashboard/profile", icon: Settings, group: "Navigate" },
  { id: "mycourses", label: "My courses", to: "/dashboard/student/my-courses", icon: BookOpen, group: "Learn" },
  { id: "browse", label: "Browse catalog", to: "/dashboard/student/browse", icon: Compass, group: "Explore", keywords: "courses subjects catalog" },
  { id: "syllabus", label: "My syllabus", to: "/dashboard/student/syllabus", icon: GraduationCap, group: "Learn" },
  { id: "upskill", label: "Upskilling Hub", to: "/dashboard/upskilling", icon: Rocket, group: "Explore", keywords: "genai openai html css tailwind figma" },
  { id: "quizzes", label: "AI Quizzes", to: "/dashboard/student/quizzes", icon: Sparkles, group: "Assess", keywords: "physics chemistry biology math english" },
  { id: "assessments", label: "Weekly Assessments", to: "/dashboard/student/assessments", icon: ClipboardList, group: "Assess" },
  { id: "mock", label: "Mock Tests", to: "/dashboard/mock-tests", icon: Target, group: "Assess" },
  { id: "progress", label: "Progress Tracker", to: "/dashboard/student/progress", icon: Target, group: "Learn" },
  { id: "ai", label: "Nova AI Assistant", to: "/dashboard/ai-assistant", icon: Sparkles, group: "Navigate" },
  { id: "resources", label: "Resources library", to: "/resources", icon: BookOpen, group: "Explore" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const groups = useMemo(() => {
    const byGroup = new Map<string, Action[]>();
    for (const a of ACTIONS) {
      const arr = byGroup.get(a.group) ?? [];
      arr.push(a);
      byGroup.set(a.group, arr);
    }
    return Array.from(byGroup.entries());
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Open search (Ctrl+K)"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-foreground sm:inline-flex"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search…</span>
        <kbd className="rounded border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-semibold">
          ⌘K
        </kbd>
      </button>
      <button
        type="button"
        aria-label="Open search"
        onClick={() => setOpen(true)}
        className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground sm:hidden"
      >
        <Search className="h-4 w-4" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search courses, lessons, quizzes, resources…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          {groups.map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((a) => {
                const Icon = a.icon;
                return (
                  <CommandItem
                    key={a.id}
                    value={`${a.label} ${a.keywords ?? ""}`}
                    onSelect={() => {
                      setOpen(false);
                      navigate({ to: a.to });
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{a.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
