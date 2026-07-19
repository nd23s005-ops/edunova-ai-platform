import { createFileRoute } from "@tanstack/react-router";

import { getRecentErrors } from "@/lib/error-capture";

export const Route = createFileRoute("/api/debug/errors")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Preview/dev only. In production return 404 so the endpoint is invisible.
        if (process.env.NODE_ENV === "production") {
          return new Response("Not found", { status: 404 });
        }
        const url = new URL(request.url);
        const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
        const errors = getRecentErrors(limit);
        return Response.json(
          { count: errors.length, errors },
          { headers: { "cache-control": "no-store" } },
        );
      },
    },
  },
});
