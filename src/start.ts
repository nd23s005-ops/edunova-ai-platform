import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

function newRequestId() {
  try {
    return globalThis.crypto?.randomUUID?.() ?? `req_${Date.now().toString(36)}`;
  } catch {
    return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }
}

/**
 * Assigns a correlation ID to every server request and logs a structured
 * entry with method, path, status, and duration. Also surfaces the ID as
 * `x-request-id` on the response so failing requests (including 502s at
 * the edge) can be traced back to a specific log line.
 */
const tracingMiddleware = createMiddleware().server(async ({ next, request }) => {
  const incoming = request.headers.get("x-request-id");
  const requestId = incoming && incoming.length <= 128 ? incoming : newRequestId();
  const url = new URL(request.url);
  const startedAt = Date.now();

  console.log(
    JSON.stringify({
      evt: "req.start",
      requestId,
      method: request.method,
      path: url.pathname,
      search: url.search || undefined,
    }),
  );

  try {
    const result = await next();
    const durationMs = Date.now() - startedAt;

    const response = (result as { response?: Response }).response;
    if (response instanceof Response) {
      try {
        response.headers.set("x-request-id", requestId);
      } catch {
        // headers may be immutable in edge cases
      }
      console.log(
        JSON.stringify({
          evt: "req.end",
          requestId,
          method: request.method,
          path: url.pathname,
          status: response.status,
          durationMs,
        }),
      );
    } else {
      console.log(
        JSON.stringify({
          evt: "req.end",
          requestId,
          method: request.method,
          path: url.pathname,
          durationMs,
        }),
      );
    }
    return result;
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    console.error(
      JSON.stringify({
        evt: "req.error",
        requestId,
        method: request.method,
        path: url.pathname,
        durationMs,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    );
    throw error;
  }
});

const errorMiddleware = createMiddleware().server(async ({ next, request }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    const requestId = request.headers.get("x-request-id") || newRequestId();
    let path: string | undefined;
    try {
      path = new URL(request.url).pathname;
    } catch {
      path = undefined;
    }
    return new Response(renderErrorPage({ requestId, status: 500, path }), {
      status: 500,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-request-id": requestId,
      },
    });
  }
});


export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [tracingMiddleware, errorMiddleware],
}));
