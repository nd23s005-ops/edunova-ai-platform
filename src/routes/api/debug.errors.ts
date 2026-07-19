import { createFileRoute } from "@tanstack/react-router";

import { getRecentErrorsHydrated, recordError } from "@/lib/error-capture";

function devOnly(): Response | undefined {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  return undefined;
}

type ClientErrorReport = {
  kind?: string;
  status?: number;
  url?: string;
  method?: string;
  requestId?: string;
  message?: string;
  stack?: string;
  userAgent?: string;
  route?: string;
};

export const Route = createFileRoute("/api/debug/errors")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const blocked = devOnly();
        if (blocked) return blocked;
        const url = new URL(request.url);
        const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
        const errors = await getRecentErrorsHydrated(limit);
        return Response.json(
          { count: errors.length, errors },
          { headers: { "cache-control": "no-store" } },
        );
      },
      POST: async ({ request }) => {
        const blocked = devOnly();
        if (blocked) return blocked;
        let body: ClientErrorReport = {};
        try {
          body = (await request.json()) as ClientErrorReport;
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }
        const kind = String(body.kind ?? "client.error").slice(0, 64);
        const status = Number.isFinite(body.status) ? Number(body.status) : undefined;
        const url = typeof body.url === "string" ? body.url.slice(0, 2048) : undefined;
        const method = typeof body.method === "string" ? body.method.slice(0, 16) : undefined;
        const requestId = typeof body.requestId === "string" ? body.requestId.slice(0, 128) : undefined;
        const route = typeof body.route === "string" ? body.route.slice(0, 512) : undefined;
        const userAgent = typeof body.userAgent === "string" ? body.userAgent.slice(0, 256) : undefined;
        const message =
          (typeof body.message === "string" && body.message.slice(0, 500)) ||
          `${kind}: ${method ?? ""} ${url ?? ""} → ${status ?? "?"}`.trim();
        const err = new Error(message);
        err.name = kind;
        if (typeof body.stack === "string") err.stack = body.stack.slice(0, 4000);
        const captured = recordError(err, {
          requestId,
          method,
          path: (() => {
            if (!url) return route;
            try {
              return new URL(url, "http://localhost").pathname;
            } catch {
              return url;
            }
          })(),
          response: status ? { status, headers: {} } : undefined,
        });
        console.error(
          JSON.stringify({
            evt: "client.error",
            id: captured.id,
            kind,
            status,
            url,
            method,
            requestId,
            route,
            userAgent,
            message,
          }),
        );
        return Response.json(
          { ok: true, id: captured.id },
          { status: 202, headers: { "cache-control": "no-store" } },
        );
      },
    },
  },
});
