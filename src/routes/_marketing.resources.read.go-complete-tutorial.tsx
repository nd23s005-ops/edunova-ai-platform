import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "go-complete-tutorial",
  title: "Go — Complete Tutorial",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "55 min",
  pages: 89,
  lastUpdated: "September 2026",
  tags: ["Programming", "Go", "Concurrency"],
  heroImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1800&q=80",
  heroSubtitle:
    "The complete Go tutorial — from language basics to concurrent backends, REST APIs, databases, testing, and production deployment.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "s1", label: "1. Introduction" },
  { id: "s2", label: "2. Installation" },
  { id: "s3", label: "3. Variables" },
  { id: "s4", label: "4. Data Types" },
  { id: "s5", label: "5. Functions" },
  { id: "s6", label: "6. Methods" },
  { id: "s7", label: "7. Structs" },
  { id: "s8", label: "8. Interfaces" },
  { id: "s9", label: "9. Packages" },
  { id: "s10", label: "10. Modules" },
  { id: "s11", label: "11. Error Handling" },
  { id: "s12", label: "12. File Handling" },
  { id: "s13", label: "13. JSON" },
  { id: "s14", label: "14. Goroutines" },
  { id: "s15", label: "15. Channels" },
  { id: "s16", label: "16. Mutexes" },
  { id: "s17", label: "17. Context Package" },
  { id: "s18", label: "18. HTTP Server" },
  { id: "s19", label: "19. REST API" },
  { id: "s20", label: "20. Database Integration" },
  { id: "s21", label: "21. Testing" },
  { id: "s22", label: "22. Performance" },
  { id: "s23", label: "23. Deployment" },
  { id: "s24", label: "24. Capstone Project" },
  { id: "review", label: "Complete Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Go — Beginner Guide", tag: "Programming", time: "17 min" },
  { title: "Go — PDF Notes", tag: "Programming", time: "52 min" },
  { title: "Go — Cheat Sheet", tag: "Programming", time: "5 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/go-complete-tutorial")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/go-complete-tutorial" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master idiomatic Go from syntax to advanced concurrency.</li>
          <li>Build a production-ready HTTP service backed by a real database.</li>
          <li>Write robust tests, benchmarks, and race-checked concurrent code.</li>
          <li>Ship a capstone project as a container image.</li>
          <li>Prepare confidently for Go backend interviews.</li>
        </ul>
      </Section>

      <Section id="s1" title="1. Introduction">
        <p>Go was designed for building large, reliable, and scalable server software. It compiles to a single static binary, has a garbage collector, and puts concurrency at the centre of the language via goroutines and channels.</p>
        <Figure src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" caption="Figure 1 — Go's design targets networked backends: static binaries, fast startup, and cheap concurrency." />
      </Section>

      <Section id="s2" title="2. Installation">
        <Code lang="bash">{`# macOS
brew install go
# Linux
curl -LO https://go.dev/dl/go1.22.linux-amd64.tar.gz && sudo tar -C /usr/local -xzf go1.22.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
go version`}</Code>
      </Section>

      <Section id="s3" title="3. Variables">
        <Code lang="go">{`var x int = 5
y := 3.14           // inferred float64
const Version = "1.0"`}</Code>
      </Section>

      <Section id="s4" title="4. Data Types">
        <p>Numeric (<code>int</code>, <code>float64</code>), <code>string</code>, <code>bool</code>, composite (<code>array</code>, <code>slice</code>, <code>map</code>, <code>struct</code>), and reference (<code>pointer</code>, <code>chan</code>, <code>func</code>).</p>
      </Section>

      <Section id="s5" title="5. Functions">
        <Code lang="go">{`func sum(nums ...int) int {
  total := 0
  for _, n := range nums { total += n }
  return total
}`}</Code>
      </Section>

      <Section id="s6" title="6. Methods">
        <Code lang="go">{`type Rect struct{ W, H float64 }
func (r Rect) Area() float64 { return r.W * r.H }`}</Code>
      </Section>

      <Section id="s7" title="7. Structs">
        <p>Compose types instead of inheriting them — Go has no classes.</p>
        <Code lang="go">{`type Address struct{ City string }
type User struct { Name string; Address }`}</Code>
      </Section>

      <Section id="s8" title="8. Interfaces">
        <p>Implicit satisfaction plus small interfaces are the essence of idiomatic Go.</p>
        <Code lang="go">{`type Stringer interface { String() string }`}</Code>
      </Section>

      <Section id="s9" title="9. Packages">
        <p>One directory = one package. Names are lowercase, short, and meaningful. Exported identifiers start with an uppercase letter.</p>
      </Section>

      <Section id="s10" title="10. Modules">
        <Code lang="bash">{`go mod init github.com/acme/api
go get github.com/google/uuid
go mod tidy`}</Code>
      </Section>

      <Section id="s11" title="11. Error Handling">
        <Code lang="go">{`f, err := os.Open("data.txt")
if err != nil { return fmt.Errorf("open: %w", err) }
defer f.Close()`}</Code>
        <Callout tone="tip" title="Wrap, don't swallow">Use <code>%w</code> when wrapping so callers can <code>errors.Is</code> / <code>errors.As</code>.</Callout>
      </Section>

      <Section id="s12" title="12. File Handling">
        <Code lang="go">{`data, err := os.ReadFile("config.yaml")
_ = os.WriteFile("out.txt", data, 0o644)`}</Code>
      </Section>

      <Section id="s13" title="13. JSON">
        <Code lang="go">{`type User struct { Name string \`json:"name"\` }
b, _ := json.Marshal(User{"Ada"})
var u User; _ = json.Unmarshal(b, &u)`}</Code>
      </Section>

      <Section id="s14" title="14. Goroutines">
        <p>Prefixing a function call with <code>go</code> runs it concurrently. Goroutines are multiplexed onto OS threads by the scheduler.</p>
      </Section>

      <Section id="s15" title="15. Channels">
        <Code lang="go">{`jobs := make(chan int, 10)
results := make(chan int, 10)
for w := 0; w < 3; w++ { go worker(w, jobs, results) }`}</Code>
      </Section>

      <Section id="s16" title="16. Mutexes">
        <p>Use <code>sync.Mutex</code> when sharing memory is unavoidable. Prefer channels when possible.</p>
      </Section>

      <Section id="s17" title="17. Context Package">
        <p><code>context.Context</code> propagates deadlines, cancellation, and request values across API boundaries — always the first parameter of a long-running function.</p>
      </Section>

      <Section id="s18" title="18. HTTP Server">
        <Code lang="go">{`http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "pong")
})
log.Fatal(http.ListenAndServe(":8080", nil))`}</Code>
      </Section>

      <Section id="s19" title="19. REST API">
        <p>Use <code>net/http</code> plus a lightweight router (<code>chi</code>, <code>gorilla/mux</code>, or the Go 1.22+ default mux). Return JSON and set status codes explicitly.</p>
        <Figure src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80" caption="Figure 2 — A production Go service: HTTP handler → business logic → repository → database, wrapped in middleware." />
      </Section>

      <Section id="s20" title="20. Database Integration">
        <Code lang="go">{`db, err := sql.Open("postgres", os.Getenv("DB_URL"))
rows, _ := db.QueryContext(ctx, "SELECT id, name FROM users")`}</Code>
      </Section>

      <Section id="s21" title="21. Testing">
        <Code lang="go">{`func TestAdd(t *testing.T) {
  if add(2, 3) != 5 { t.Fatal("bad math") }
}`}</Code>
        <p>Run with <code>go test ./... -race</code>.</p>
      </Section>

      <Section id="s22" title="22. Performance">
        <p>Benchmark with <code>testing.B</code>. Profile with <code>pprof</code>. Reduce allocations before adding parallelism.</p>
      </Section>

      <Section id="s23" title="23. Deployment">
        <Code lang="dockerfile">{`FROM golang:1.22 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /app ./cmd/api

FROM gcr.io/distroless/static
COPY --from=build /app /app
ENTRYPOINT ["/app"]`}</Code>
      </Section>

      <Section id="s24" title="24. Capstone Project">
        <p>Build a URL shortener: REST API, Postgres, tests, Prometheus metrics, and a Dockerfile. Deploy to any container platform.</p>
      </Section>

      <Section id="review" title="Complete Review">
        <h3 className="font-semibold">Final Quiz</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>What's the difference between a buffered and unbuffered channel?</li>
          <li>When would you choose a mutex over a channel?</li>
          <li>How does <code>context.Context</code> propagate cancellation?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Coding Challenges</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Concurrent word count over a directory of files.</li>
          <li>Rate limiter middleware using a token bucket.</li>
          <li>gRPC-style JSON RPC server with graceful shutdown.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Interview Preparation</h3>
        <p>Focus on channels, memory model, error wrapping, and how the runtime schedules goroutines.</p>
        <h3 className="mt-3 font-semibold">Capstone Review</h3>
        <p>Check: 90%+ test coverage, race detector clean, structured logging, and health/readiness probes.</p>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Is Go faster than Python?">Yes — often 20–100× on CPU-bound workloads, and much cheaper to run concurrently.</FAQItem>
        <FAQItem q="Does Go have generics?">Yes, since Go 1.18 — parameterised types and functions.</FAQItem>
        <FAQItem q="Which web framework should I use?">Standard <code>net/http</code> with <code>chi</code> covers 95% of services.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Race condition</strong> — non-deterministic behaviour from unsynchronised access to shared memory.</li>
          <li><strong>Context</strong> — request-scoped cancellation and deadlines.</li>
          <li><strong>Distroless</strong> — minimal container image with only your binary and CA certs.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          For educational purposes only. Consult go.dev, the standard library documentation,
          and vendor docs for authoritative and up-to-date information. Trademarks belong to
          their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
