import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ReaderShell, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

type ReaderData = {
  resource: ReaderResource;
  toc: TocItem[];
  related: Array<{ title: string; tag: string; time: string }>;
  html: string;
};

async function fetchReader(slug: string): Promise<ReaderData> {
  const res = await fetch(`/reader-content/${encodeURIComponent(slug)}.json`);
  if (!res.ok) throw new Error(`not_found:${slug}`);
  return (await res.json()) as ReaderData;
}

export const Route = createFileRoute("/_marketing/resources/read/$slug")({
  loader: async ({ params }) => {
    // Only validate the slug shape here — actual data is fetched on the client
    // via TanStack Query so the 25MB of static content stays out of the SSR bundle.
    if (!/^[a-z0-9-]+$/.test(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Resource | EduNova AI` },
      { name: "description", content: `Read the ${params.slug} resource on EduNova AI.` },
      { property: "og:title", content: `EduNova AI Resource` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/resources/read/${params.slug}` }],
  }),
  component: Page,
  notFoundComponent: NotFoundPage,
  errorComponent: NotFoundPage,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reader", slug],
    queryFn: () => fetchReader(slug),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-muted-foreground">
        Loading resource…
      </div>
    );
  }
  if (isError || !data) return <NotFoundPage />;

  return (
    <ReaderShell resource={data.resource} toc={data.toc} related={data.related}>
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
    </ReaderShell>
  );
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Resource not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        We couldn't find that resource. It may have moved or been renamed.
      </p>
      <a href="/resources" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
        ← Back to Resources
      </a>
    </div>
  );
}
