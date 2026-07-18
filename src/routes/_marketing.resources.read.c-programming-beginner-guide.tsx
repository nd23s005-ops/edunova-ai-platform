import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "c-programming-beginner-guide",
  title: "C Programming — Beginner Guide",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "16 min",
  pages: 17,
  lastUpdated: "January 2026",
  tags: ["C", "Pointers"],
  heroImage: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=1800&q=80",
  heroSubtitle: "A friendly first tour of C — syntax, pointers, and your first working programs.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "memory", label: "Memory Model & Pointer Visualizations" },
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
  { title: "C — Beginner Guide", tag: "C", time: "16 min" },
  { title: "C — Cheat Sheet", tag: "C", time: "3 min" },
  { title: "C — Interview Questions", tag: "C", time: "34 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/c-programming-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/c-programming-beginner-guide" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the topic scope of the <b>Beginner Guide</b> — practical, exam-ready coverage.</li>
          <li>Read and write idiomatic ANSI/ISO C with GCC or Clang.</li>
          <li>Reason about pointers, arrays, and memory layout confidently.</li>
          <li>Use dynamic allocation (<code>malloc</code>, <code>calloc</code>, <code>realloc</code>, <code>free</code>) safely.</li>
          <li>Design programs with structs, unions, and modular headers.</li>
          <li>Handle files, command-line arguments, and basic system calls.</li>
          <li>Debug with GDB and detect leaks with Valgrind / Address Sanitizer.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic computer literacy — install software and use a terminal.</li>
          <li>Any prior programming exposure helps but is not required.</li>
          <li>GCC or Clang installed (Linux, macOS, or Windows with MSYS2/WSL).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction — history, ANSI/ISO C, GCC, Clang, MSVC</li>
          <li>Language Fundamentals — variables, constants, types, operators, I/O</li>
          <li>Control Flow — if / else, switch, for, while, do-while, break, continue, goto</li>
          <li>Functions — declarations, parameters, return values, recursion, storage classes</li>
          <li>Arrays &amp; Strings — 1D/2D arrays, char arrays, string.h</li>
          <li>Pointers — arithmetic, arrays &amp; pointers, double / function / void / null pointers</li>
          <li>Memory Management — stack, heap, malloc / calloc / realloc / free, leaks</li>
          <li>Structures &amp; Unions — nested structs, arrays of structs, pointers to structs, typedef</li>
          <li>Preprocessor — macros, header files, include guards, conditional compilation</li>
          <li>File Handling — fopen / fclose / fread / fwrite / fprintf / fscanf, binary vs text</li>
          <li>Data Structures — linked lists, stacks, queues, trees, graphs, hash tables</li>
          <li>Algorithms — searching, sorting, recursion, complexity</li>
          <li>Systems Programming — argv, memory layout, bit manipulation, endianness, syscalls</li>
          <li>Embedded — microcontrollers, registers, memory-mapped I/O, interrupts</li>
          <li>Debugging &amp; Tooling — GCC warnings, GDB, ASan, Valgrind</li>
          <li>Best Practices, Performance, Security &amp; Career</li>
          <li>Summary, FAQs &amp; References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>C is a small, fast, low-level language that maps closely to the machine. It powers operating systems (Linux, Windows kernels), databases (PostgreSQL, SQLite), embedded firmware, compilers, and countless libraries. This resource — <b>C Programming — Beginner Guide</b> — is designed to be self-contained: A friendly first tour of C — syntax, pointers, and your first working programs.</p>
        <Callout tone="info" title="C in one line">C = tiny language + explicit memory model + a compiler that trusts you.</Callout>
        <Figure src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80" caption="Figure 1 — C compilation pipeline — preprocessor, compiler, assembler, and linker turn .c files into an executable." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history (Dennis Ritchie, K&amp;R), ANSI C, ISO C89/C99/C11/C17/C23, toolchains (GCC, Clang, MSVC), editors (VS Code, Code::Blocks, Dev-C++).</li>
          <li><b>Language fundamentals</b> — variables, constants (<code>#define</code>, <code>const</code>), primitive types (<code>int</code>, <code>char</code>, <code>float</code>, <code>double</code>), operators, expressions, type casting, <code>printf</code> / <code>scanf</code>.</li>
          <li><b>Control flow</b> — <code>if / else</code>, <code>switch</code>, <code>for</code>, <code>while</code>, <code>do-while</code>, <code>break</code>, <code>continue</code>, <code>goto</code>.</li>
          <li><b>Functions</b> — declarations vs definitions, parameters (by value / by pointer), return values, recursion, storage classes (<code>auto</code>, <code>static</code>, <code>extern</code>, <code>register</code>).</li>
          <li><b>Arrays &amp; strings</b> — 1D and 2D arrays, character arrays, null-terminated strings, <code>strlen</code>, <code>strcpy</code>, <code>strncpy</code>, <code>strcmp</code>, <code>strcat</code>.</li>
          <li><b>Pointers</b> — declaration, arithmetic, arrays &amp; pointers duality, double pointers, function pointers, <code>void*</code>, <code>NULL</code>, and dynamic allocation.</li>
          <li><b>Memory management</b> — stack vs heap, <code>malloc</code>, <code>calloc</code>, <code>realloc</code>, <code>free</code>, memory leaks, dangling and wild pointers.</li>
          <li><b>Structures &amp; unions</b> — nested structs, arrays of structs, pointers to structs (<code>-&gt;</code>), unions, <code>typedef</code>.</li>
          <li><b>Preprocessor</b> — macros, header files, include guards, conditional compilation (<code>#ifdef</code>, <code>#ifndef</code>).</li>
          <li><b>File handling</b> — <code>fopen</code>, <code>fclose</code>, <code>fread</code>, <code>fwrite</code>, <code>fprintf</code>, <code>fscanf</code>, binary vs text mode.</li>
          <li><b>Data structures</b> — linked lists, stacks, queues, trees, graphs, hash tables — built by hand in C.</li>
          <li><b>Algorithms</b> — searching, sorting, recursion, complexity (Big-O).</li>
          <li><b>Systems programming</b> — <code>argc</code> / <code>argv</code>, memory layout (text/data/bss/heap/stack), bit manipulation, endianness, system calls.</li>
          <li><b>Embedded</b> — microcontrollers, registers, memory-mapped I/O, interrupts.</li>
        </ul>
      </Section>

      <Section id="memory" title="Memory Model & Pointer Visualizations">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`High addresses
┌──────────────────────────────┐
│         Stack (grows ↓)      │  ← local variables, call frames
├──────────────────────────────┤
│                              │
│         Heap (grows ↑)       │  ← malloc / calloc / realloc
├──────────────────────────────┤
│      BSS (uninit globals)    │
├──────────────────────────────┤
│    Data (init globals)       │
├──────────────────────────────┤
│    Text (code, read-only)    │
└──────────────────────────────┘
Low addresses`}
        </pre>
        <Code>{`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// A tiny singly-linked list showing pointers + heap allocation.
typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *push(Node *head, int v) {
    Node *n = malloc(sizeof *n);
    if (!n) return head;      // always check malloc
    n->value = v;
    n->next  = head;
    return n;
}

void free_list(Node *head) {
    while (head) {
        Node *next = head->next;
        free(head);
        head = next;
    }
}

int main(void) {
    Node *list = NULL;
    for (int i = 0; i < 5; i++) list = push(list, i);
    for (Node *n = list; n; n = n->next) printf("%d ", n->value);
    printf("\\n");
    free_list(list);
    return 0;
}`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Industry Applications">
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 2 — C in the real world — kernels, embedded firmware, databases, and network stacks are built in C." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Operating systems</b> — Linux, xv6, BSD kernels are written primarily in C.</li>
          <li><b>Databases</b> — PostgreSQL, SQLite, Redis are implemented in C.</li>
          <li><b>Embedded</b> — microcontroller firmware, RTOS (FreeRTOS), automotive ECUs.</li>
          <li><b>Language runtimes</b> — CPython, Ruby, PHP, and the JVM ship large C codebases.</li>
          <li><b>Networking</b> — TCP/IP stacks, curl, nginx, and countless system daemons.</li>
          <li><b>Games &amp; graphics</b> — engines and drivers frequently expose C ABIs.</li>
        </ul>
        <Code>{`// argc / argv — command-line arguments in C
#include <stdio.h>

int main(int argc, char **argv) {
    printf("program: %s\\n", argv[0]);
    for (int i = 1; i < argc; i++)
        printf("  arg[%d] = %s\\n", i, argv[i]);
    return 0;
}`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Compile with <code>-Wall -Wextra -Wpedantic -Werror</code>; treat warnings as bugs.</li>
          <li>Always initialize variables and check every <code>malloc</code> / I/O return value.</li>
          <li>Match every <code>malloc</code> with exactly one <code>free</code>; own memory clearly.</li>
          <li>Prefer <code>size_t</code> for sizes and indexes; use fixed-width types (<code>stdint.h</code>) at ABI edges.</li>
          <li>Use header guards or <code>#pragma once</code>; keep interfaces small.</li>
          <li>Modularize — one responsibility per translation unit; static-scope internal helpers.</li>
          <li>Write tests; run under Valgrind or AddressSanitizer regularly.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Buffer overflows</b> — using <code>gets</code>, unbounded <code>strcpy</code>, or wrong array bounds.</li>
          <li><b>Off-by-one errors</b> — mis-terminating strings and loops.</li>
          <li><b>Use-after-free</b> and <b>double free</b> — set pointers to <code>NULL</code> after freeing.</li>
          <li><b>Uninitialized reads</b> — always initialize locals; <code>-Wuninitialized</code> catches many.</li>
          <li><b>Integer overflow</b> — silent wrap-around; validate arithmetic on untrusted input.</li>
          <li><b>Format string bugs</b> — never pass user input as the format specifier.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Enable AddressSanitizer: <code>-fsanitize=address -g</code> for fast memory-bug detection.</li>
          <li>Use <code>const</code> aggressively — protects invariants and helps the optimizer.</li>
          <li>Prefer <code>fgets</code> + <code>sscanf</code> over <code>scanf</code> for line-based input.</li>
          <li>Use <code>static</code> functions for internal helpers to control linkage.</li>
          <li>Profile with <code>perf</code>, <code>gprof</code>, or Callgrind before optimizing.</li>
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
              <tr><td className="py-2 pr-4">Local variable</td><td>Stack</td><td>Function call frame.</td></tr>
              <tr><td className="py-2 pr-4"><code>malloc</code>'d block</td><td>Heap</td><td>Until <code>free</code>.</td></tr>
              <tr><td className="py-2 pr-4">Global / <code>static</code></td><td>Data / BSS</td><td>Program lifetime.</td></tr>
              <tr><td className="py-2 pr-4">String literal</td><td>Read-only text</td><td>Program lifetime (immutable).</td></tr>
              <tr><td className="py-2 pr-4">Function pointer</td><td>Points into text</td><td>Program lifetime.</td></tr>
              <tr><td className="py-2 pr-4"><code>calloc</code></td><td>Heap</td><td>Zero-initialized block.</td></tr>
              <tr><td className="py-2 pr-4"><code>realloc</code></td><td>Heap</td><td>Resizes; may move the block.</td></tr>
              <tr><td className="py-2 pr-4">Array parameter</td><td>Decays to pointer</td><td>Same as caller's storage.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Debugging, Performance & Security">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Debugging</b> — GDB for stepping, breakpoints, watchpoints; <code>bt</code> for stack traces.</li>
          <li><b>Leak detection</b> — Valgrind (<code>--leak-check=full</code>) and AddressSanitizer.</li>
          <li><b>Performance</b> — cache awareness, minimize allocations, prefer contiguous data.</li>
          <li><b>Security</b> — bounds-check every buffer, validate input, avoid <code>strcpy</code> / <code>gets</code>; watch for format-string and integer-overflow bugs.</li>
          <li><b>Portability</b> — use <code>stdint.h</code>, be explicit about endianness for on-wire formats.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>C is small, fast, and explicit — you manage memory, and the compiler trusts you.</li>
          <li>Pointers, arrays, and structs are the core mental model.</li>
          <li>Own memory clearly — pair every allocation with a free and check for leaks.</li>
          <li>Use warnings, sanitizers, and debuggers relentlessly.</li>
          <li>C skills unlock kernels, embedded systems, databases, and compiler work.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Is C still worth learning?">Yes — operating systems, databases, and embedded firmware are still overwhelmingly C.</FAQItem>
        <FAQItem q="C or C++?">Learn C first for the mental model, then C++ for abstractions like RAII and templates.</FAQItem>
        <FAQItem q="GCC or Clang?">Both are excellent. Clang has friendlier diagnostics; GCC is ubiquitous on Linux.</FAQItem>
        <FAQItem q="Which C standard should I target?">C11 or C17 for portability; C99 for legacy embedded toolchains.</FAQItem>
        <FAQItem q="How do I avoid memory bugs?">Warnings + AddressSanitizer + Valgrind + code review — no single tool is enough.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.iso.org/standard/74528.html" target="_blank" rel="noreferrer">ISO C Standard</a> · <a className="text-primary hover:underline" href="https://en.cppreference.com/w/c" target="_blank" rel="noreferrer">cppreference — C</a></li>
          <li><a className="text-primary hover:underline" href="https://gcc.gnu.org/onlinedocs/" target="_blank" rel="noreferrer">GCC Docs</a> · <a className="text-primary hover:underline" href="https://clang.llvm.org/docs/" target="_blank" rel="noreferrer">Clang Docs</a> · <a className="text-primary hover:underline" href="https://www.gnu.org/software/libc/manual/" target="_blank" rel="noreferrer">glibc Manual</a></li>
          <li><a className="text-primary hover:underline" href="https://pubs.opengroup.org/onlinepubs/9699919799/" target="_blank" rel="noreferrer">POSIX</a> · <a className="text-primary hover:underline" href="https://sourceware.org/gdb/current/onlinedocs/gdb/" target="_blank" rel="noreferrer">GDB</a> · <a className="text-primary hover:underline" href="https://valgrind.org/docs/manual/manual.html" target="_blank" rel="noreferrer">Valgrind</a></li>
          <li><a className="text-primary hover:underline" href="https://clang.llvm.org/docs/AddressSanitizer.html" target="_blank" rel="noreferrer">AddressSanitizer</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. C standards, toolchains, and libraries evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
