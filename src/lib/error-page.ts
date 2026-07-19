export type ErrorPageMeta = {
  requestId?: string;
  status?: number;
  path?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderErrorPage(meta: ErrorPageMeta = {}): string {
  const requestId = meta.requestId ? escapeHtml(meta.requestId) : "unavailable";
  const status = meta.status ?? 500;
  const path = meta.path ? escapeHtml(meta.path) : "";
  const timestamp = new Date().toISOString();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${status} · This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 32rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.25rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.25rem; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
      .meta { text-align: left; background: #fff; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.75rem 1rem; font: 12.5px/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: #374151; }
      .meta dt { color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.35rem; }
      .meta dt:first-child { margin-top: 0; }
      .meta dd { margin: 0; word-break: break-all; }
      .copy { margin-top: 0.75rem; font-size: 12px; background: transparent; color: #2563eb; border: none; padding: 0; cursor: pointer; }
      .copy:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${status} · This page didn't load</h1>
      <p>Share the request ID below when reporting this — it lets us find the exact server log for this failure.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
      <dl class="meta" id="err-meta">
        <dt>Status</dt><dd>${status}</dd>
        <dt>Request ID</dt><dd id="rid">${requestId}</dd>
        ${path ? `<dt>Path</dt><dd>${path}</dd>` : ""}
        <dt>Timestamp</dt><dd>${timestamp}</dd>
      </dl>
      <button class="copy" type="button" onclick="(function(){var t=document.getElementById('err-meta').innerText;navigator.clipboard&&navigator.clipboard.writeText(t);this.textContent='Copied';}).call(this)">Copy details</button>
    </div>
  </body>
</html>`;
}
