import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

const TABS = [
  { to: "/dashboard/community", label: "Overview" },
  { to: "/dashboard/community/communities", label: "Communities" },
  { to: "/dashboard/community/discussions", label: "Discussions" },
  { to: "/dashboard/community/doubt-solver", label: "AI Doubt Solver" },
  { to: "/dashboard/community/study-groups", label: "Study Groups" },
  { to: "/dashboard/community/mentors", label: "Mentors" },
  { to: "/dashboard/community/events", label: "Events" },
  { to: "/dashboard/community/chat", label: "Chat" },
  { to: "/dashboard/community/knowledge", label: "Knowledge" },
  { to: "/dashboard/community/leaderboard", label: "Leaderboard" },
];

export const Route = createFileRoute("/_dashboard/dashboard/community")({
  head: () => ({ meta: [{ title: "Community — EduNova AI" }, { name: "description", content: "Learn together with communities, mentors, events, and study groups." }] }),
  component: CommunityLayout,
});

function CommunityLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-sm text-muted-foreground">Collaborate, ask questions, join events, and grow with mentors.</p>
      </div>
      <nav className="mb-6 flex flex-wrap gap-2 overflow-x-auto border-b">
        {TABS.map((t) => {
          const active = t.to === "/dashboard/community" ? pathname === t.to : pathname.startsWith(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
