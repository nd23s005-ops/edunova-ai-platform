import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found — EduNova AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundSplat,
});

function NotFoundSplat() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-gradient text-8xl font-bold">404</div>
        <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link to="/">Back to EduNova AI</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/explore">Explore courses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
