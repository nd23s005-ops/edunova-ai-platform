import { LayoutDashboard, LineChart, ClipboardCheck, CalendarDays, Compass, MessageSquare } from "lucide-react";

const previews = [
  {
    icon: LayoutDashboard,
    title: "Learning Dashboard",
    sub: "Your day at a glance",
    body: (
      <div className="space-y-3">
        <div className="rounded-xl border border-border/60 bg-secondary/40 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Continue</p>
          <p className="mt-1 text-sm font-semibold">Recursion</p>
          <p className="text-[11px] text-muted-foreground">Lesson 4 of 8 · 12 min</p>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-primary/5 px-3 py-2 text-xs">
          <span className="font-semibold text-primary">🔥 7-day streak</span>
          <span className="text-muted-foreground">Resume →</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {["Kinematics", "Algebra II", "OOP"].map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-1 font-medium">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: LineChart,
    title: "Analytics",
    sub: "Momentum & mastery",
    body: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-xl bg-secondary/40 p-3">
            <p className="text-lg font-bold text-primary">+18%</p>
            <p className="text-[11px] text-muted-foreground">Focus (h)</p>
          </div>
          <div className="rounded-xl bg-secondary/40 p-3">
            <p className="text-lg font-bold text-accent-foreground">78%</p>
            <p className="text-[11px] text-muted-foreground">Mastery</p>
          </div>
        </div>
        <div className="flex h-14 items-end gap-1">
          {[30, 55, 40, 70, 50, 82, 65].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/50 to-primary" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: ClipboardCheck,
    title: "Exam Simulator",
    sub: "Timed mock tests",
    body: (
      <div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">JEE · Physics</span>
          <span className="rounded bg-secondary px-2 py-0.5 font-mono font-semibold">42:17</span>
        </div>
        <p className="mt-3 text-sm font-medium leading-snug">
          Q7. A block slides down a frictionless incline at angle θ…
        </p>
        <div className="mt-2 space-y-1 text-xs">
          {["A. g sinθ", "B. g cosθ", "C. g tanθ", "D. g"].map((o, i) => (
            <div key={o} className={`rounded border px-2 py-1 ${i === 0 ? "border-primary/40 bg-primary/5" : "border-border"}`}>{o}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: CalendarDays,
    title: "Study Planner",
    sub: "Weekly focus",
    body: (
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="space-y-1">
            <p className="text-muted-foreground">{d}</p>
            <div className="rounded bg-primary/15 py-1.5 text-primary">Focus</div>
            {i < 4 && <div className="rounded bg-accent/20 py-1.5 text-accent-foreground">Review</div>}
            {i === 3 && <div className="rounded bg-highlight/20 py-1.5 text-highlight-foreground">Mock</div>}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Compass,
    title: "Knowledge Gap",
    sub: "Where to reinforce",
    body: (
      <div className="space-y-2">
        {[
          { l: "Free-fall reasoning", v: 42 },
          { l: "Vectors & angles", v: 61 },
          { l: "Recursion base case", v: 28 },
        ].map((g) => (
          <div key={g.l}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{g.l}</span>
              <span className="text-primary">{g.v}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${g.v}%` }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: "AI Tutor Chat",
    sub: "Ask anything",
    body: (
      <div className="space-y-2 text-sm">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-primary p-2.5 text-xs text-primary-foreground">
          Can you explain gradient descent?
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-secondary p-2.5 text-xs">
          Sure — imagine a ball rolling downhill on a loss surface. Each step, we move a little in the steepest descent…
        </div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-primary p-2.5 text-xs text-primary-foreground">
          And the learning rate?
        </div>
      </div>
    ),
  },
];

export function ProductPreview() {
  return (
    <section className="relative bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Product Preview</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            A calm, focused <span className="text-gradient">learning surface</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Realistic screens from across the platform.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previews.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="text-[11px] text-muted-foreground">{p.sub}</p>
                </div>
              </div>
              <div className="mt-4">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
