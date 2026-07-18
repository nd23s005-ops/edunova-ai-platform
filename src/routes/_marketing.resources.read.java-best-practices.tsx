import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "java-best-practices",
  title: "Java — Best Practices",
  category: "Programming",
  difficulty: "Intermediate",
  readingTime: "17 min",
  pages: 22,
  lastUpdated: "August 2026",
  tags: ["Java", "OOP"],
  heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1800&q=80",
  heroSubtitle: "Idiomatic Java — clean code, exception handling, testing, and Spring best practices.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "JVM Architecture & Workflow" },
  { id: "examples", label: "Practical Examples & Enterprise Use Cases" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Performance, Security & Testing" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "Java — Beginner Guide", tag: "Java", time: "17 min" },
  { title: "Java — Cheat Sheet", tag: "Java", time: "3 min" },
  { title: "Java — Interview Questions", tag: "Java", time: "40 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/java-best-practices")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/java-best-practices" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the topic scope of the <b>Best Practices</b> — practical, exam-ready coverage.</li>
          <li>Read and write idiomatic modern Java (17+) using records, sealed types, and pattern matching.</li>
          <li>Design programs with classes, interfaces, generics, and packages.</li>
          <li>Use the Collections Framework and Streams API fluently.</li>
          <li>Handle exceptions and write tests with JUnit + Mockito.</li>
          <li>Understand the JVM — memory, GC, class loading, and JIT.</li>
          <li>Build production Java — Spring Boot, JDBC/JPA, Maven/Gradle, Docker.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic computer literacy — install software and use a terminal.</li>
          <li>Familiarity with any programming language is helpful, not required.</li>
          <li>JDK 17 or 21 LTS installed (Oracle JDK, OpenJDK, Temurin, or Corretto).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Java, JDK, JRE, and the JVM</li>
          <li>Language Fundamentals — variables, types, operators, control flow</li>
          <li>Methods, Overloading, Varargs, and Recursion</li>
          <li>Object-Oriented Programming — classes, interfaces, inheritance, polymorphism</li>
          <li>Collections Framework — List, Set, Map, Queue, Deque</li>
          <li>Generics, Wildcards, and Bounded Types</li>
          <li>Exception Handling and File / NIO I/O</li>
          <li>Multithreading, Executors, and CompletableFuture</li>
          <li>Functional Programming — Lambdas, Streams, Optional</li>
          <li>JVM Internals — Heap, Stack, GC, ClassLoader, JIT</li>
          <li>Databases — JDBC, Hibernate, JPA, Connection Pooling</li>
          <li>Enterprise — Spring, Spring Boot, REST APIs, Microservices</li>
          <li>Testing — JUnit 5, Mockito, integration testing</li>
          <li>Design Patterns — Singleton, Factory, Builder, Strategy, Observer, MVC</li>
          <li>Modern Java — Records, Sealed Classes, Pattern Matching, Virtual Threads, Modules</li>
          <li>Performance, Security & Career</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Java is a statically typed, object-oriented language that runs on the Java Virtual Machine — a mature, high-performance runtime used across banking, telecoms, e-commerce, and cloud platforms. This resource — <b>Java — Best Practices</b> — is designed to be self-contained: Idiomatic Java — clean code, exception handling, testing, and Spring best practices.</p>
        <Callout tone="info" title="Java in one line">Java = strong static typing + OOP + huge standard library + world-class JVM.</Callout>
        <Figure src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80" caption="Figure 1 — Java compilation and execution — .java is compiled to bytecode (.class), then executed on the JVM with JIT to native code." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history, editions (SE, Jakarta EE, ME), JDK vs JRE vs JVM, IntelliJ IDEA, Eclipse, VS Code, Maven, Gradle.</li>
          <li><b>Language fundamentals</b> — variables, primitives, references, operators, type casting, I/O, comments, keywords, identifiers.</li>
          <li><b>Control flow</b> — <code>if / else</code>, <code>switch</code> statements and expressions, <code>for</code>, enhanced-for, <code>while</code>, <code>do-while</code>, <code>break</code>, <code>continue</code>.</li>
          <li><b>Methods</b> — parameters, return types, overloading, varargs, recursion.</li>
          <li><b>OOP</b> — classes, objects, constructors, encapsulation, inheritance, polymorphism, abstraction, interfaces, abstract classes, packages, access modifiers.</li>
          <li><b>Collections</b> — <code>List</code>, <code>ArrayList</code>, <code>LinkedList</code>, <code>Set</code>, <code>HashSet</code>, <code>LinkedHashSet</code>, <code>TreeSet</code>, <code>Map</code>, <code>HashMap</code>, <code>LinkedHashMap</code>, <code>TreeMap</code>, <code>Queue</code>, <code>PriorityQueue</code>, <code>Deque</code>, <code>Stack</code>, <code>Iterator</code>.</li>
          <li><b>Generics</b> — generic classes, generic methods, wildcards, bounded types.</li>
          <li><b>Exceptions</b> — <code>try / catch / finally</code>, <code>throw</code>, <code>throws</code>, custom exceptions, checked vs unchecked.</li>
          <li><b>Files & NIO</b> — File API, NIO.2 <code>Path</code> / <code>Files</code>, BufferedReader/Writer, serialization.</li>
          <li><b>Multithreading</b> — <code>Thread</code>, <code>Runnable</code>, <code>Callable</code>, Executors, synchronization, locks, CompletableFuture, virtual threads.</li>
          <li><b>Functional programming</b> — lambdas, functional interfaces, Streams (filter, map, reduce, collect), Optional.</li>
          <li><b>JVM</b> — architecture, heap, stack, garbage collection, class loader, JIT, memory management.</li>
          <li><b>Databases</b> — JDBC, MySQL, PostgreSQL, connection pooling, Hibernate, JPA.</li>
          <li><b>Enterprise</b> — Spring, Spring Boot, REST APIs, JSON, microservices, dependency injection.</li>
          <li><b>Testing</b> — JUnit 5, Mockito, unit and integration testing.</li>
          <li><b>Design patterns</b> — Singleton, Factory, Builder, Strategy, Observer, MVC.</li>
          <li><b>Modern Java</b> — records, sealed classes, pattern matching, modules (JPMS), virtual threads.</li>
        </ul>
      </Section>

      <Section id="architecture" title="JVM Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Source (.java)
   │  javac
   ▼
Bytecode (.class)
   │
   ▼
┌───────────────────────── JVM ─────────────────────────┐
│  [Class Loader] ─▶ [Runtime Data Areas]               │
│                       ├─ Method Area / Metaspace      │
│                       ├─ Heap (Young / Old)           │
│                       ├─ Java Stacks (per thread)     │
│                       ├─ PC Registers                 │
│                       └─ Native Method Stacks         │
│  [Execution Engine] ─▶ Interpreter + JIT ─▶ Native    │
│  [Garbage Collector] ─▶ G1 / ZGC / Shenandoah         │
└───────────────────────────────────────────────────────┘`}
        </pre>
        <Code>{`// Idiomatic modern Java — records, streams, and Optional
import java.util.*;
import java.util.stream.*;

public class Users {
    public record User(long id, String name, String email) {}

    public static List<String> activeEmails(List<User> users) {
        return users.stream()
            .filter(u -> u.email() != null && u.email().contains("@"))
            .map(User::email)
            .sorted()
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        var users = List.of(
            new User(1, "Ada", "ada@example.com"),
            new User(2, "Linus", "linus@example.com")
        );
        System.out.println(activeEmails(users));
    }
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1400&q=80" caption="Figure 2 — Java ecosystem — Spring Boot, Hibernate, JVM tooling, Kafka, and cloud runtimes at enterprise scale." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Banking & finance</b> — high-throughput trading and settlement systems on the JVM.</li>
          <li><b>E-commerce</b> — Spring Boot microservices for catalog, cart, and checkout.</li>
          <li><b>Telecom</b> — long-lived JVM services handling billions of calls per day.</li>
          <li><b>Big data</b> — Hadoop, Kafka, Flink, and Spark are JVM-native.</li>
          <li><b>Android</b> — Java remains a first-class Android language alongside Kotlin.</li>
          <li><b>Enterprise SaaS</b> — Jakarta EE, Spring, and Quarkus run mission-critical workloads.</li>
        </ul>
        <Code>{`// Minimal Spring Boot REST controller
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<String> list() {
        return List.of("Ada", "Linus", "Grace");
    }

    @GetMapping("/{id}")
    public String byId(@PathVariable long id) {
        return "user-" + id;
    }
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <b>immutability</b> — records, <code>final</code> fields, unmodifiable collections.</li>
          <li>Program to interfaces (<code>List</code>, <code>Map</code>) — not implementations.</li>
          <li>Use <b>Optional</b> for return values that may be absent — not for fields or arguments.</li>
          <li>Handle checked exceptions meaningfully; don't swallow them.</li>
          <li>Manage dependencies with Maven or Gradle — never lib jars in git.</li>
          <li>Test with JUnit 5 + Mockito; measure coverage with JaCoCo.</li>
          <li>Follow SOLID principles and small, focused classes.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Uncontrolled <b>NullPointerExceptions</b> — use <code>Optional</code> and null checks at boundaries.</li>
          <li>Mutating shared state across threads without synchronization or immutable data.</li>
          <li>Comparing strings with <code>==</code> instead of <code>.equals()</code>.</li>
          <li>Catching <code>Exception</code> broadly and hiding real errors.</li>
          <li>Ignoring the difference between <code>ArrayList</code> and <code>LinkedList</code> performance profiles.</li>
          <li>Reinventing DI or ORM instead of using Spring / Hibernate.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>var</code> for local type inference — but keep names descriptive.</li>
          <li>Prefer <code>List.of</code>, <code>Map.of</code>, <code>Set.of</code> for immutable literals.</li>
          <li>Use records for DTOs and value types.</li>
          <li>Stream everything, but avoid streams for hot loops with side effects.</li>
          <li>Enable virtual threads (JDK 21+) for high-concurrency I/O workloads.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Tool / API</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Maven</td><td>Build + deps</td><td>Convention-over-config, huge ecosystem.</td></tr>
              <tr><td className="py-2 pr-4">Gradle</td><td>Build + deps</td><td>Flexible, scriptable builds (Groovy/Kotlin DSL).</td></tr>
              <tr><td className="py-2 pr-4">Spring Boot</td><td>App framework</td><td>REST APIs, microservices, and full apps.</td></tr>
              <tr><td className="py-2 pr-4">Jakarta EE</td><td>Enterprise APIs</td><td>Standards-based enterprise apps.</td></tr>
              <tr><td className="py-2 pr-4">Hibernate / JPA</td><td>ORM</td><td>Relational data access with entities.</td></tr>
              <tr><td className="py-2 pr-4">JDBC</td><td>Raw SQL access</td><td>Lightweight, no-ORM database calls.</td></tr>
              <tr><td className="py-2 pr-4">JUnit 5</td><td>Testing</td><td>Unit and integration tests.</td></tr>
              <tr><td className="py-2 pr-4">Mockito</td><td>Mocking</td><td>Isolate dependencies in unit tests.</td></tr>
              <tr><td className="py-2 pr-4">G1 GC</td><td>Default GC</td><td>Balanced throughput and pause times.</td></tr>
              <tr><td className="py-2 pr-4">ZGC</td><td>Low-latency GC</td><td>Large heaps with sub-millisecond pauses.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Testing">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — profile with JFR + Mission Control; tune GC and heap sizing.</li>
          <li><b>Concurrency</b> — Executors and CompletableFuture; virtual threads for scalable I/O.</li>
          <li><b>Security</b> — validate input, parameterize SQL, use Spring Security for auth/authz, keep dependencies patched.</li>
          <li><b>Testing</b> — JUnit 5 + Mockito; integration tests with Testcontainers; measure with JaCoCo.</li>
          <li><b>Packaging</b> — build fat jars or native images (GraalVM) and ship as Docker containers.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Java is strongly typed, OOP-first, and backed by a world-class JVM.</li>
          <li>Master collections + streams + Optional to write concise, safe code.</li>
          <li>Use Spring Boot for production APIs and microservices.</li>
          <li>Understand the JVM — GC and JIT drive real-world performance.</li>
          <li>Modern Java (records, sealed types, virtual threads) makes the language feel new again.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Which Java version should I use?">Use the latest LTS — Java 21 (or 17 if constrained). Avoid EOL versions like Java 8 for new projects.</FAQItem>
        <FAQItem q="Oracle JDK vs OpenJDK?">Both build from the same source. OpenJDK distributions (Temurin, Corretto, Zulu) are free and production-grade.</FAQItem>
        <FAQItem q="Maven or Gradle?">Maven for stability and convention, Gradle for flexibility and speed. Both are fine.</FAQItem>
        <FAQItem q="Spring or Jakarta EE?">Spring Boot dominates new projects. Jakarta EE is strong in standards-heavy enterprises.</FAQItem>
        <FAQItem q="What are virtual threads?">Lightweight user-mode threads (JDK 21+) that make concurrent I/O code simple and scalable.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://docs.oracle.com/en/java/" target="_blank" rel="noreferrer">Oracle Java Docs</a> · <a className="text-primary hover:underline" href="https://openjdk.org/" target="_blank" rel="noreferrer">OpenJDK</a> · <a className="text-primary hover:underline" href="https://docs.oracle.com/javase/specs/" target="_blank" rel="noreferrer">JLS &amp; JVM Spec</a></li>
          <li><a className="text-primary hover:underline" href="https://maven.apache.org/guides/" target="_blank" rel="noreferrer">Maven</a> · <a className="text-primary hover:underline" href="https://docs.gradle.org/" target="_blank" rel="noreferrer">Gradle</a> · <a className="text-primary hover:underline" href="https://jakarta.ee/specifications/" target="_blank" rel="noreferrer">Jakarta EE</a></li>
          <li><a className="text-primary hover:underline" href="https://spring.io/projects/spring-framework" target="_blank" rel="noreferrer">Spring</a> · <a className="text-primary hover:underline" href="https://spring.io/projects/spring-boot" target="_blank" rel="noreferrer">Spring Boot</a> · <a className="text-primary hover:underline" href="https://hibernate.org/orm/documentation/" target="_blank" rel="noreferrer">Hibernate</a></li>
          <li><a className="text-primary hover:underline" href="https://junit.org/junit5/docs/current/user-guide/" target="_blank" rel="noreferrer">JUnit 5</a> · <a className="text-primary hover:underline" href="https://site.mockito.org/" target="_blank" rel="noreferrer">Mockito</a> · <a className="text-primary hover:underline" href="https://www.testcontainers.org/" target="_blank" rel="noreferrer">Testcontainers</a></li>
          <li><a className="text-primary hover:underline" href="https://www.graalvm.org/" target="_blank" rel="noreferrer">GraalVM</a> · <a className="text-primary hover:underline" href="https://openjdk.org/projects/loom/" target="_blank" rel="noreferrer">Project Loom (Virtual Threads)</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Java, the JVM, and third-party libraries evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
