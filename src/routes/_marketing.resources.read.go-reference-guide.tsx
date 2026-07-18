import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-reference-guide",
  title: "Go — Reference Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "37 min",
  pages: 51,
  lastUpdated: "August 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle: "A daily reference for Go developers — syntax, standard library, concurrency, HTTP, JSON, database, testing, tooling, deployment, and performance.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Syntax Reference" },
  { id: "s2", label: "2. Keywords" },
  { id: "s3", label: "3. Operators" },
  { id: "s4", label: "4. Built-in Functions" },
  { id: "s5", label: "5. Standard Library" },
  { id: "s6", label: "6. Packages" },
  { id: "s7", label: "7. Concurrency" },
  { id: "s8", label: "8. HTTP" },
  { id: "s9", label: "9. JSON" },
  { id: "s10", label: "10. Database" },
  { id: "s11", label: "11. Testing" },
  { id: "s12", label: "12. Tooling" },
  { id: "s13", label: "13. Deployment" },
  { id: "s14", label: "14. Performance" },
  { id: "s15", label: "15. Quick Lookup Tables" },
  { id: "summary", label: "Summary" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Cheat Sheet", tag: "Programming", time: "9 min" },
  { title: "Go — Glossary", tag: "Programming", time: "11 min" },
  { title: "Go — Advanced Concepts", tag: "Programming", time: "25 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-reference-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-reference-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Answer any everyday "how do I…" question in Go.</li>
          <li>Keep this open while coding as a second brain.</li>
        </ul>
        <Callout tone="info" title="Format">Optimised for scanning — headings, tables, and short code snippets.</Callout>
      </Section>

      <Section id="s1" title="1. Syntax Reference">
        <Code lang="go">{`var x int = 10
y := 20
const Pi = 3.14
type User struct { Name string; Age int }
if x > 0 { }
for i := 0; i < 10; i++ { }
for i, v := range xs { _ = i; _ = v }
switch v := x.(type) { case int: }`}</Code>
      </Section>

      <Section id="s2" title="2. Keywords">
        <p><code>break case chan const continue default defer else fallthrough for func go goto if import interface map package range return select struct switch type var</code></p>
      </Section>

      <Section id="s3" title="3. Operators">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Category</th><th className="p-2 text-left">Operators</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">Arithmetic</td><td className="p-2"><code>+ - * / %</code></td></tr>
            <tr className="border-b"><td className="p-2">Comparison</td><td className="p-2"><code>== != &lt; &lt;= &gt; &gt;=</code></td></tr>
            <tr className="border-b"><td className="p-2">Logical</td><td className="p-2"><code>&amp;&amp; || !</code></td></tr>
            <tr className="border-b"><td className="p-2">Bitwise</td><td className="p-2"><code>&amp; | ^ &lt;&lt; &gt;&gt; &amp;^</code></td></tr>
            <tr><td className="p-2">Assignment</td><td className="p-2"><code>= := += -= *= /=</code></td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="s4" title="4. Built-in Functions">
        <p><code>len cap make new append copy delete close panic recover print println complex real imag min max clear</code></p>
      </Section>

      <Section id="s5" title="5. Standard Library Highlights">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>fmt</code> — formatted I/O.</li>
          <li><code>io</code>, <code>bufio</code> — streaming I/O.</li>
          <li><code>os</code>, <code>path/filepath</code> — filesystem.</li>
          <li><code>net/http</code> — HTTP server & client.</li>
          <li><code>encoding/json</code>, <code>encoding/xml</code> — codecs.</li>
          <li><code>context</code>, <code>sync</code>, <code>sync/atomic</code> — concurrency.</li>
          <li><code>time</code>, <code>math</code>, <code>strings</code>, <code>strconv</code> — utilities.</li>
          <li><code>log/slog</code> — structured logging.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Standard-library package landscape organised by domain: I/O, networking, encoding, concurrency, utilities." />
      </Section>

      <Section id="s6" title="6. Package Layout">
        <Code lang="text">{`cmd/api/main.go
internal/{http,service,repo,domain}/
pkg/mylib/
migrations/*.sql`}</Code>
      </Section>

      <Section id="s7" title="7. Concurrency">
        <Code lang="go">{`go f()                                // start goroutine
ch := make(chan int, 8)               // buffered channel
select { case v := <-ch: case <-ctx.Done(): }
var wg sync.WaitGroup; wg.Add(n); wg.Wait()
g, gctx := errgroup.WithContext(ctx)`}</Code>
      </Section>

      <Section id="s8" title="8. HTTP">
        <Code lang="go">{`mux := http.NewServeMux()
mux.HandleFunc("GET /users/{id}", handler) // Go 1.22+
srv := &http.Server{Addr: ":8080", Handler: mux, ReadTimeout: 5*time.Second}
log.Fatal(srv.ListenAndServe())`}</Code>
      </Section>

      <Section id="s9" title="9. JSON">
        <Code lang="go">{`type User struct { Name string \`json:"name"\`; Age int \`json:"age,omitempty"\` }
b, _ := json.Marshal(u)
_ = json.Unmarshal(b, &u)`}</Code>
      </Section>

      <Section id="s10" title="10. Database (pgx)">
        <Code lang="go">{`pool, _ := pgxpool.New(ctx, dsn)
row := pool.QueryRow(ctx, "SELECT name FROM users WHERE id=$1", id)
var name string; _ = row.Scan(&name)`}</Code>
      </Section>

      <Section id="s11" title="11. Testing">
        <Code lang="go">{`func TestAdd(t *testing.T) {
    for _, tc := range []struct{ a, b, want int }{{1,2,3},{2,3,5}} {
        if got := Add(tc.a, tc.b); got != tc.want {
            t.Fatalf("Add(%d,%d)=%d want %d", tc.a, tc.b, got, tc.want)
        }
    }
}`}</Code>
      </Section>

      <Section id="s12" title="12. Tooling">
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Command</th><th className="p-2 text-left">Use</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2"><code>go build</code></td><td className="p-2">Compile</td></tr>
            <tr className="border-b"><td className="p-2"><code>go test -race</code></td><td className="p-2">Test with race detector</td></tr>
            <tr className="border-b"><td className="p-2"><code>go vet</code></td><td className="p-2">Static analysis</td></tr>
            <tr className="border-b"><td className="p-2"><code>gofmt / goimports</code></td><td className="p-2">Formatting</td></tr>
            <tr className="border-b"><td className="p-2"><code>go tool pprof</code></td><td className="p-2">Profiling</td></tr>
            <tr><td className="p-2"><code>govulncheck</code></td><td className="p-2">Vulnerability scan</td></tr>
          </tbody>
        </table>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — Deployment architecture: build → container → orchestrator → observability plane." />
      </Section>

      <Section id="s13" title="13. Deployment">
        <Code lang="dockerfile">{`FROM golang:1.23 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /out/api ./cmd/api

FROM gcr.io/distroless/static
COPY --from=build /out/api /api
ENTRYPOINT ["/api"]`}</Code>
      </Section>

      <Section id="s14" title="14. Performance">
        <ul className="list-disc space-y-1 pl-5">
          <li>Preallocate slices/maps.</li>
          <li><code>sync.Pool</code> for hot allocations.</li>
          <li>Tune <code>GOGC</code>, <code>GOMEMLIMIT</code>.</li>
          <li>Batch DB calls; use prepared statements.</li>
        </ul>
      </Section>

      <Section id="s15" title="15. Quick Lookup Tables">
        <h3 className="font-semibold">Zero values</h3>
        <p><code>int → 0, string → "", bool → false, pointer → nil, slice/map/chan → nil, struct → zero-fields</code></p>
        <h3 className="mt-3 font-semibold">Format verbs</h3>
        <p><code>%v %+v %#v %T %d %x %s %q %w</code></p>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <p>The Go stdlib is broad and boringly reliable. Master the pieces here and 80% of everyday tasks don't need third-party packages.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Which HTTP router?">Standard <code>net/http</code> (1.22+) or chi.</FAQItem>
        <FAQItem q="Best DB driver?"><code>pgx</code> for Postgres. Avoid ORMs unless the team is already fluent.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>gofmt</code> — canonical formatter.</li>
          <li><code>govulncheck</code> — dependency vulnerability scanner.</li>
          <li><code>slog</code> — structured logging in stdlib.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">Snapshot for study. Verify against the current Go version documentation.</p>
      </Section>
    </ReaderShell>
  );
}
