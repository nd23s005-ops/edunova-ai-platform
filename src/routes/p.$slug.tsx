import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPublicPortfolio } from "@/lib/career/portfolio.functions";

export const Route = createFileRoute("/p/$slug")({
  loader: async ({ params }) => {
    const res = await getPublicPortfolio({ data: { slug: params.slug } });
    if (!res.portfolio) throw notFound();
    return res.portfolio;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.slug} — Portfolio` },
          { name: "description", content: `Portfolio of ${loaderData.slug} on Nova Learn AI` },
          { property: "og:title", content: `${loaderData.slug} — Portfolio` },
        ]
      : [{ title: "Portfolio not found" }, { name: "robots", content: "noindex" }],
  }),
  component: PublicPortfolio,
  notFoundComponent: () => <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Portfolio not found or not public.</div>,
  errorComponent: () => <div className="min-h-screen flex items-center justify-center text-sm">Could not load portfolio.</div>,
});

type Sections = {
  hero?: { headline?: string; subheadline?: string };
  about?: string;
  skills?: string[];
  projects?: Array<{ title: string; description: string; url?: string }>;
  socials?: { github?: string; linkedin?: string; twitter?: string; email?: string };
};

function PublicPortfolio() {
  const p = Route.useLoaderData();
  const s = (p.sections as unknown as Sections) ?? {};
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">{s.hero?.headline ?? p.slug}</h1>
          {s.hero?.subheadline ? <p className="text-lg text-muted-foreground mt-2">{s.hero.subheadline}</p> : null}
        </header>
        {s.about ? <section className="mb-10"><h2 className="text-xl font-semibold mb-2">About</h2><p className="text-sm leading-relaxed whitespace-pre-line">{s.about}</p></section> : null}
        {(s.skills ?? []).length > 0 ? (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">{(s.skills ?? []).map((sk) => <span key={sk} className="px-2 py-1 rounded bg-muted text-xs">{sk}</span>)}</div>
          </section>
        ) : null}
        {(s.projects ?? []).length > 0 ? (
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {(s.projects ?? []).map((pr, i) => (
                <div key={i} className="border rounded p-4">
                  <div className="font-medium">{pr.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{pr.description}</p>
                  {pr.url ? <a href={pr.url} className="text-xs text-primary underline mt-2 inline-block" target="_blank" rel="noreferrer">Open →</a> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}
        {s.socials ? (
          <footer className="mt-16 border-t pt-6 flex flex-wrap gap-3 text-sm">
            {s.socials.github ? <a className="underline" target="_blank" rel="noreferrer" href={s.socials.github}>GitHub</a> : null}
            {s.socials.linkedin ? <a className="underline" target="_blank" rel="noreferrer" href={s.socials.linkedin}>LinkedIn</a> : null}
            {s.socials.twitter ? <a className="underline" target="_blank" rel="noreferrer" href={s.socials.twitter}>Twitter</a> : null}
            {s.socials.email ? <a className="underline" href={`mailto:${s.socials.email}`}>Email</a> : null}
          </footer>
        ) : null}
      </section>
    </main>
  );
}
