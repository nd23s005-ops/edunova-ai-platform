import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "cpp-learning-roadmap",
  title: "C++ — Learning Roadmap",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "7 min",
  pages: 6,
  lastUpdated: "March 2026",
  tags: ["C++", "STL"],
  heroImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1800&q=80",
  heroSubtitle: "A month-by-month C++ roadmap from beginner to production-ready systems engineer.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "memory", label: "Memory Model, RAII & Smart Pointers" },
  { id: "examples", label: "Practical Examples & Industry Applications" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "considerations", label: "Debugging, Performance & Security" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "C++ — Beginner Guide", tag: "C++", time: "12 min" },
  { title: "C++ — Cheat Sheet", tag: "C++", time: "3 min" },
  { title: "C++ — Interview Questions", tag: "C++", time: "35 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/cpp-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/cpp-learning-roadmap" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the topic scope of the <b>Learning Roadmap</b> — practical, modern-C++ coverage.</li>
          <li>Read and write idiomatic C++17/20/23 with GCC, Clang, or MSVC.</li>
          <li>Use RAII, smart pointers, and move semantics correctly.</li>
          <li>Work fluently with STL containers, algorithms, and iterators.</li>
          <li>Design classes with clear ownership, const-correctness, and rule-of-zero/five.</li>
          <li>Write templates, concepts, and lambdas that read cleanly.</li>
          <li>Build and test projects with CMake, GoogleTest, and sanitizers.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic programming familiarity (any language) helps but is not required.</li>
          <li>Comfort with the terminal and a code editor (VS Code / CLion / Visual Studio).</li>
          <li>A working toolchain — GCC, Clang, or MSVC — with CMake installed.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Foundations — history, Bjarne Stroustrup, ISO standards (C++11/14/17/20/23), GCC, Clang, MSVC, CMake</li>
          <li>Language Fundamentals — variables, constants, types, operators, references, scope, <code>auto</code>, <code>constexpr</code></li>
          <li>Control Flow — if, switch, for, while, do-while, range-based for, break, continue</li>
          <li>Functions — overloading, default args, inline, lambdas, recursion, templates</li>
          <li>Object-Oriented Programming — classes, objects, ctors/dtors, encapsulation, inheritance, polymorphism, virtual, abstract, friend</li>
          <li>Memory Management — stack, heap, new/delete, RAII, unique_ptr / shared_ptr / weak_ptr, move &amp; copy semantics</li>
          <li>STL — vector, list, deque, array, map, unordered_map, set, unordered_set, queue, priority_queue, stack, pair, tuple, iterators, algorithms</li>
          <li>Templates — function &amp; class templates, specialization, variadic templates, concepts</li>
          <li>Exception Handling — try / catch / throw, noexcept, exception safety</li>
          <li>Files &amp; Streams — fstream, ifstream, ofstream, stringstreams</li>
          <li>Modern C++ — move ctors, rvalue refs, constexpr, consteval, modules, coroutines, ranges</li>
          <li>Multithreading — std::thread, mutex, lock_guard, unique_lock, atomic, future, promise, async</li>
          <li>Design Patterns — Singleton, Factory, Builder, Observer, Strategy, Command</li>
          <li>Performance — cache, memory, profiling, compiler optimization, SIMD basics</li>
          <li>Systems Programming — memory layout, bit manipulation, low-level, embedded</li>
          <li>Testing &amp; Tooling — GoogleTest, Catch2, GDB, sanitizers</li>
          <li>Best Practices, Career &amp; References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>C++ is a multi-paradigm systems language designed by Bjarne Stroustrup and standardized by ISO. It powers game engines (Unreal), browsers (Chrome, Firefox), databases (MongoDB, MySQL), financial trading systems, and much of the modern software stack. This resource — <b>C++ — Learning Roadmap</b> — is designed to be self-contained: A month-by-month C++ roadmap from beginner to production-ready systems engineer.</p>
        <Callout tone="info" title="Modern C++ in one line">Modern C++ = zero-overhead abstractions + RAII + STL + strong types.</Callout>
        <Figure src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80" caption="Figure 1 — The C++ compilation pipeline: preprocessor, compiler, assembler, linker turn .cpp files into an executable." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history, Bjarne Stroustrup, ISO C++ standards (C++11, 14, 17, 20, 23), toolchains (GCC, Clang, MSVC), build systems (CMake, Ninja).</li>
          <li><b>Language fundamentals</b> — variables, constants, primitive and compound types, operators, references vs pointers, scope, <code>auto</code> type inference, <code>constexpr</code>.</li>
          <li><b>Control flow</b> — <code>if</code>, <code>switch</code>, <code>for</code>, <code>while</code>, <code>do-while</code>, range-based <code>for</code>, <code>break</code>, <code>continue</code>.</li>
          <li><b>Functions</b> — overloading, default arguments, inline functions, lambdas, recursion, function templates.</li>
          <li><b>Object-oriented programming</b> — classes, objects, constructors, destructors, encapsulation, inheritance, polymorphism, virtual functions, abstract classes, friend functions.</li>
          <li><b>Memory management</b> — stack vs heap, <code>new</code>/<code>delete</code>, RAII, smart pointers (<code>unique_ptr</code>, <code>shared_ptr</code>, <code>weak_ptr</code>), move and copy semantics.</li>
          <li><b>STL</b> — <code>vector</code>, <code>list</code>, <code>deque</code>, <code>array</code>, <code>map</code>, <code>unordered_map</code>, <code>set</code>, <code>unordered_set</code>, <code>queue</code>, <code>priority_queue</code>, <code>stack</code>, <code>pair</code>, <code>tuple</code>, iterators, algorithms.</li>
          <li><b>Templates</b> — function templates, class templates, template specialization, variadic templates, C++20 concepts.</li>
          <li><b>Exception handling</b> — <code>try</code> / <code>catch</code> / <code>throw</code>, <code>noexcept</code>, exception-safety guarantees.</li>
          <li><b>Files &amp; streams</b> — <code>fstream</code>, <code>ifstream</code>, <code>ofstream</code>, string streams, formatted vs binary I/O.</li>
          <li><b>Modern C++</b> — move ctor / move assignment, rvalue references, <code>constexpr</code>, <code>consteval</code>, modules, coroutines, ranges.</li>
          <li><b>Multithreading</b> — <code>std::thread</code>, <code>mutex</code>, <code>lock_guard</code>, <code>unique_lock</code>, <code>atomic</code>, <code>future</code>, <code>promise</code>, <code>async</code>.</li>
          <li><b>Design patterns</b> — Singleton, Factory, Builder, Observer, Strategy, Command.</li>
          <li><b>Performance</b> — cache optimization, memory locality, profiling, compiler flags, SIMD basics.</li>
          <li><b>Systems &amp; embedded</b> — memory layout, bit manipulation, low-level and embedded C++.</li>
        </ul>
      </Section>

      <Section id="memory" title="Memory Model, RAII & Smart Pointers">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`High addresses
┌──────────────────────────────┐
│         Stack (grows ↓)      │  ← locals, RAII objects, call frames
├──────────────────────────────┤
│                              │
│         Heap (grows ↑)       │  ← new / make_unique / make_shared
├──────────────────────────────┤
│      BSS (uninit globals)    │
├──────────────────────────────┤
│    Data (init globals)       │
├──────────────────────────────┤
│    Text (code, read-only)    │
└──────────────────────────────┘
Low addresses`}
        </pre>
        <Code>{`#include <iostream>
#include <memory>
#include <vector>
#include <string>

// RAII + smart pointers + STL — modern C++ in one small file.
struct User {
    std::string name;
    explicit User(std::string n) : name(std::move(n)) {
        std::cout << "ctor " << name << "\\n";
    }
    ~User() { std::cout << "dtor " << name << "\\n"; }
};

int main() {
    std::vector<std::unique_ptr<User>> users;
    users.push_back(std::make_unique<User>("Ada"));
    users.push_back(std::make_unique<User>("Linus"));
    for (const auto& u : users) std::cout << "hi " << u->name << "\\n";
    // No delete — unique_ptr frees each User at scope exit (RAII).
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Industry Applications">
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — C++ in the real world — game engines, browsers, databases, HFT, embedded systems, and HPC." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Game development</b> — Unreal Engine, Unity native runtime, AAA titles.</li>
          <li><b>Browsers</b> — Chromium, Firefox, WebKit are written primarily in C++.</li>
          <li><b>Databases</b> — MySQL, MongoDB, ClickHouse rely on C++ cores.</li>
          <li><b>Finance</b> — high-frequency trading and quant systems for sub-microsecond latency.</li>
          <li><b>Embedded &amp; robotics</b> — automotive, drones, ROS, industrial control.</li>
          <li><b>HPC &amp; ML runtimes</b> — LLVM, TensorFlow core, PyTorch ATen, CUDA C++.</li>
        </ul>
        <Code>{`// STL algorithms + lambdas: idiomatic modern C++
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> xs{5, 3, 8, 1, 9, 2};
    std::sort(xs.begin(), xs.end());
    auto sum = std::accumulate(xs.begin(), xs.end(), 0);
    auto evens = std::count_if(xs.begin(), xs.end(),
                               [](int n){ return n % 2 == 0; });
    std::cout << "sum=" << sum << " evens=" << evens << "\\n";
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow the <i>C++ Core Guidelines</i> — RAII, rule-of-zero, const-correctness.</li>
          <li>Prefer <code>make_unique</code> / <code>make_shared</code>; avoid raw <code>new</code>/<code>delete</code>.</li>
          <li>Pass by <code>const&amp;</code> for large read-only data; by value for cheap types.</li>
          <li>Use <code>auto</code> for local type deduction; keep interfaces explicit.</li>
          <li>Prefer STL containers and algorithms over hand-rolled loops.</li>
          <li>Enable warnings and sanitizers: <code>-Wall -Wextra -Wpedantic -fsanitize=address,undefined</code>.</li>
          <li>Test with GoogleTest or Catch2; build with CMake presets.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Raw <code>new</code>/<code>delete</code></b> — leaks and double-frees; prefer smart pointers.</li>
          <li><b>Dangling references</b> — returning references to local variables.</li>
          <li><b>Object slicing</b> — copying a derived class into a base by value.</li>
          <li><b>Missing virtual destructor</b> in a polymorphic base class.</li>
          <li><b>Iterator invalidation</b> — modifying a container while iterating.</li>
          <li><b>Data races</b> — sharing mutable state across threads without synchronization.</li>
          <li><b>Undefined behavior</b> — uninitialized reads, out-of-bounds access, signed overflow.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>structured bindings</code> to unpack tuples and pairs cleanly.</li>
          <li>Prefer <code>std::string_view</code> for read-only string parameters.</li>
          <li>Use <code>emplace_back</code> to construct in-place inside containers.</li>
          <li>Enable link-time optimization (<code>-flto</code>) in release builds.</li>
          <li>Turn on <code>-fsanitize=address,undefined</code> in CI to catch UB early.</li>
          <li>Use ranges (C++20) for expressive, composable pipelines.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Concept</th>
                <th className="py-2 pr-4">Where it lives</th>
                <th className="py-2">Lifetime</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Local object</td><td>Stack</td><td>Destroyed at scope exit (RAII).</td></tr>
              <tr><td className="py-2 pr-4"><code>unique_ptr</code></td><td>Heap</td><td>Single owner; freed on destruction.</td></tr>
              <tr><td className="py-2 pr-4"><code>shared_ptr</code></td><td>Heap</td><td>Freed when last owner drops it.</td></tr>
              <tr><td className="py-2 pr-4"><code>weak_ptr</code></td><td>Heap (observer)</td><td>Non-owning; breaks cycles.</td></tr>
              <tr><td className="py-2 pr-4">Global / <code>static</code></td><td>Data / BSS</td><td>Program lifetime.</td></tr>
              <tr><td className="py-2 pr-4">String literal</td><td>Read-only text</td><td>Program lifetime (immutable).</td></tr>
              <tr><td className="py-2 pr-4"><code>vector</code> element</td><td>Heap (contiguous)</td><td>Owned by the vector.</td></tr>
              <tr><td className="py-2 pr-4">Lambda capture</td><td>Closure object</td><td>Same as the closure's lifetime.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Debugging, Performance & Security">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Debugging</b> — GDB / LLDB with pretty-printers; watchpoints on member variables.</li>
          <li><b>Leak &amp; UB detection</b> — AddressSanitizer, UBSan, ThreadSanitizer, Valgrind.</li>
          <li><b>Performance</b> — profile with perf / VTune; care for cache locality and branch prediction.</li>
          <li><b>Security</b> — bounds-check spans, avoid C-style casts, prefer <code>std::span</code> and <code>std::string_view</code>.</li>
          <li><b>Portability</b> — pin the standard (<code>-std=c++20</code>), use fixed-width ints, guard platform code.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Modern C++ gives you performance <i>and</i> safety when you use RAII and smart pointers.</li>
          <li>STL containers and algorithms eliminate most hand-written loops.</li>
          <li>Templates and concepts express generic code with strong types.</li>
          <li>Move semantics unlock high performance without sacrificing safety.</li>
          <li>C++ skills open doors in games, browsers, HFT, embedded, and HPC.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is C++ still worth learning in 2026?">Yes — engines, browsers, databases, and HFT still run on C++, and C++20/23 is more expressive than ever.</FAQItem>
        <FAQItem q="C or C++?">Learn C for the mental model, then C++ for RAII, templates, and STL.</FAQItem>
        <FAQItem q="GCC, Clang, or MSVC?">All three are excellent — Clang has friendly diagnostics, GCC dominates Linux, MSVC dominates Windows.</FAQItem>
        <FAQItem q="Which standard should I target?">C++17 or C++20 for most projects; C++23 where toolchains allow.</FAQItem>
        <FAQItem q="How do I avoid memory bugs?">RAII + smart pointers + sanitizers + code review — no single tool is enough.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://isocpp.org/" target="_blank" rel="noreferrer">ISO C++</a> · <a className="text-primary hover:underline" href="https://en.cppreference.com/w/cpp" target="_blank" rel="noreferrer">cppreference — C++</a></li>
          <li><a className="text-primary hover:underline" href="https://gcc.gnu.org/onlinedocs/" target="_blank" rel="noreferrer">GCC Docs</a> · <a className="text-primary hover:underline" href="https://clang.llvm.org/docs/" target="_blank" rel="noreferrer">Clang Docs</a> · <a className="text-primary hover:underline" href="https://learn.microsoft.com/en-us/cpp/" target="_blank" rel="noreferrer">Microsoft C++ Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://cmake.org/documentation/" target="_blank" rel="noreferrer">CMake Docs</a> · <a className="text-primary hover:underline" href="https://google.github.io/googletest/" target="_blank" rel="noreferrer">GoogleTest</a> · <a className="text-primary hover:underline" href="https://llvm.org/docs/" target="_blank" rel="noreferrer">LLVM Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines" target="_blank" rel="noreferrer">C++ Core Guidelines</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. C++ standards, toolchains, and libraries evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
