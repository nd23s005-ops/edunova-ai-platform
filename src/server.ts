import "./lib/error-capture";

import {
  captureRequestMeta,
  captureResponseMeta,
  consumeLastCapturedError,
  recordError,
  type CapturedRequest,
  type CapturedResponse,
} from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

function newRequestId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  );
}

function logError(
  label: string,
  error: unknown,
  ctx: {
    requestId: string;
    method: string;
    url: string;
    request?: CapturedRequest;
    response?: CapturedResponse;
  },
) {
  const captured = recordError(error, {
    requestId: ctx.requestId,
    method: ctx.method,
    path: ctx.request?.path ?? (() => {
      try {
        return new URL(ctx.url).pathname;
      } catch {
        return ctx.url;
      }
    })(),
    request: ctx.request,
    response: ctx.response,
  });
  console.error(`[${label}] ${ctx.method} ${ctx.url} · requestId=${ctx.requestId}`);
  console.error(error);
  console.error(
    JSON.stringify({
      evt: "ssr.error",
      label,
      requestId: ctx.requestId,
      method: ctx.method,
      url: ctx.url,
      name: captured.name,
      message: captured.message,
      location: captured.location,
      request: captured.request,
      response: captured.response,
    }),
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(
  response: Response,
  ctx: { requestId: string; method: string; url: string; request: CapturedRequest },
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  const captured = consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`);
  const responseMeta = await captureResponseMeta(response);
  logError("h3-swallowed", captured, { ...ctx, response: responseMeta });

  return new Response(renderErrorPage(), {
    status: 500,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-request-id": ctx.requestId,
    },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const requestId = request.headers.get("x-request-id") || newRequestId();
    const requestMeta = captureRequestMeta(request);
    const meta = { requestId, method: request.method, url: request.url, request: requestMeta };
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response, meta);
      try {
        normalized.headers.set("x-request-id", requestId);
      } catch {
        // headers immutable in rare edge cases
      }
      return normalized;
    } catch (error) {
      logError("ssr-throw", error, meta);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "x-request-id": requestId,
        },
      });
    }
  },
};

