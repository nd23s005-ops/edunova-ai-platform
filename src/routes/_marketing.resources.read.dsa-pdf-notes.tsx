import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dsa-pdf-notes",
  title: "Data Structures & Algorithms — PDF Notes",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "62 min",
  pages: 108,
  lastUpdated: "May 2026",
  tags: ["DSA", "Interview", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle: "Comprehensive chapter-wise DSA notes: Big-O, arrays, strings, linked lists, stacks, queues, hash tables, trees, heaps, graphs, recursion, searching, sorting, greedy, divide and conquer, DP, backtracking, and interview strategies.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "concepts", label: "Core Concepts" },
  { id: "steps", label: "Step-by-Step Explanations" },
  { id: "code", label: "Code Examples" },
  { id: "flow", label: "Algorithm Flowcharts" },
  { id: "complexity", label: "Complexity Analysis Tables" },
  { id: "examples", label: "Real-world Examples" },
  { id: "applications", label: "Practical Applications" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Data Structures & Algorithms — Complete Tutorial", tag: "CS Core", time: "42 min" },
  { title: "Data Structures & Algorithms — Cheat Sheet", tag: "CS Core", time: "3 min" },
  { title: "Data Structures & Algorithms — Interview Questions", tag: "CS Core", time: "28 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dsa-pdf-notes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/dsa-pdf-notes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the ideas covered in Data Structures & Algorithms — PDF Notes.</li>
          <li>Reason about time and space complexity using Big-O notation.</li>
          <li>Choose the right data structure and algorithm for each problem.</li>
          <li>Recognize best practices, common mistakes, and productive shortcuts.</li>
          <li>Prepare confidently for coding interviews and competitive rounds.</li>
        </ul>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Comprehensive chapter-wise DSA notes: Big-O, arrays, strings, linked lists, stacks, queues, hash tables, trees, heaps, graphs, recursion, searching, sorting, greedy, divide and conquer, DP, backtracking, and interview strategies.</p>
        <Callout tone="info" title="Who this is for">Students and engineers preparing for coding interviews, competitive programming, or building performance-critical software.</Callout>
        <Figure src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=80" caption="Figure 1 — DSA landscape: from linear structures to trees, graphs, and algorithmic paradigms." />
      </Section>

      <Section id="concepts" title="Core Concepts">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Big-O notation</b> — describes how runtime and memory grow with input size.</li>
          <li><b>Linear structures</b> — arrays, strings, linked lists, stacks, queues.</li>
          <li><b>Hashing</b> — average O(1) lookup via hash tables and sets.</li>
          <li><b>Hierarchical structures</b> — trees, BSTs, heaps, tries.</li>
          <li><b>Graphs</b> — nodes and edges powering networks, maps, and dependencies.</li>
          <li><b>Paradigms</b> — recursion, divide & conquer, greedy, dynamic programming, backtracking.</li>
        </ul>
      </Section>

      <Section id="steps" title="Step-by-Step Explanations">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Read the problem carefully; identify inputs, outputs, and constraints.</li>
          <li>Work through a small example by hand to understand the pattern.</li>
          <li>Pick a data structure that supports the required operations efficiently.</li>
          <li>Draft a brute-force solution, then analyze its Big-O.</li>
          <li>Optimize using hashing, two pointers, sliding window, or memoization.</li>
          <li>Prove correctness with invariants; test edge cases (empty, single, huge, duplicates).</li>
        </ol>
      </Section>

      <Section id="code" title="Code Examples">
        <Code>{`// Two-sum — O(n) using a hash map
function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }
  return null;
}

// Binary search — O(log n)
function binarySearch(arr: number[], x: number): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === x) return mid;
    if (arr[mid] < x) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}

// BFS on a graph — O(V + E)
function bfs(graph: Map<number, number[]>, start: number) {
  const visited = new Set([start]);
  const queue: number[] = [start];
  while (queue.length) {
    const node = queue.shift()!;
    for (const nb of graph.get(node) ?? []) {
      if (!visited.has(nb)) { visited.add(nb); queue.push(nb); }
    }
  }
  return visited;
}`}</Code>
      </Section>

      <Section id="flow" title="Algorithm Flowcharts">
        <Figure src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=1400&q=80" caption="Figure 2 — Algorithm decision flow: pick brute force → analyze → optimize with the right data structure." />
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Problem
  │
  ▼
Understand inputs / constraints
  │
  ▼
Brute force ── Analyze Big-O ──►  Fast enough?  ── yes ──►  Done
  │                                       │ no
  │                                       ▼
  └──►  Optimize: hashing / two-pointer / DP / greedy / graph
                       │
                       ▼
                Verify + test edge cases`}
        </pre>
      </Section>

      <Section id="complexity" title="Complexity Analysis Tables">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Operation</th>
                <th className="py-2 pr-4">Array</th>
                <th className="py-2 pr-4">Linked List</th>
                <th className="py-2 pr-4">Hash Table</th>
                <th className="py-2 pr-4">BST (balanced)</th>
                <th className="py-2">Heap</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Access by index</td><td>O(1)</td><td>O(n)</td><td>—</td><td>O(log n)</td><td>—</td></tr>
              <tr><td className="py-2 pr-4">Search</td><td>O(n)</td><td>O(n)</td><td>O(1) avg</td><td>O(log n)</td><td>O(n)</td></tr>
              <tr><td className="py-2 pr-4">Insert</td><td>O(n)</td><td>O(1)</td><td>O(1) avg</td><td>O(log n)</td><td>O(log n)</td></tr>
              <tr><td className="py-2 pr-4">Delete</td><td>O(n)</td><td>O(1)</td><td>O(1) avg</td><td>O(log n)</td><td>O(log n)</td></tr>
              <tr><td className="py-2 pr-4">Min/Max</td><td>O(n)</td><td>O(n)</td><td>O(n)</td><td>O(log n)</td><td>O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Real-world Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Google Maps</b> — Dijkstra / A* on massive weighted graphs.</li>
          <li><b>Search engines</b> — inverted indexes and tries for autocomplete.</li>
          <li><b>Netflix / Amazon</b> — recommendation systems built on graph analytics.</li>
          <li><b>Databases</b> — B-trees, LSM-trees, and hash indexes power queries.</li>
          <li><b>Payments</b> — fraud detection via graph algorithms and streaming analytics.</li>
        </ul>
      </Section>

      <Section id="applications" title="Practical Applications">
        <p>Strong DSA is the backbone of backend engineering, systems design, ML infrastructure, competitive programming, and every FAANG-style interview loop.</p>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer standard library data structures unless you truly need a custom one.</li>
          <li>Analyze Big-O before coding — the wrong structure kills performance.</li>
          <li>Write brute force first, then optimize; correctness beats cleverness.</li>
          <li>Handle edge cases explicitly: empty input, single element, duplicates, overflow.</li>
          <li>Test with random and adversarial inputs, not just the sample.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Ignoring worst-case complexity of hash tables under bad hashes.</li>
          <li>Off-by-one errors in binary search and sliding window.</li>
          <li>Mutating arrays while iterating over them.</li>
          <li>Deep recursion without tail-call awareness leading to stack overflow.</li>
          <li>Confusing average and amortized complexity with worst-case.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Recognize the pattern first — two pointers, sliding window, BFS/DFS, DP on subsequence.</li>
          <li>Use <Code>Map</Code>/<Code>Set</Code> for O(1) membership checks.</li>
          <li>Draw the recursion tree; memoize repeated subproblems.</li>
          <li>Sort as a preprocessing step — it unlocks two-pointer and binary search.</li>
          <li>When stuck, brute force + prune → convert to DP or greedy.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Paradigm</th>
                <th className="py-2 pr-4">When to Use</th>
                <th className="py-2 pr-4">Typical Complexity</th>
                <th className="py-2">Example</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Divide & Conquer</td><td>Split into independent subproblems</td><td>O(n log n)</td><td>Merge sort, quick sort</td></tr>
              <tr><td className="py-2 pr-4">Greedy</td><td>Locally optimal → globally optimal</td><td>O(n log n)</td><td>Interval scheduling, Huffman</td></tr>
              <tr><td className="py-2 pr-4">Dynamic Programming</td><td>Overlapping subproblems</td><td>O(n·m)</td><td>Knapsack, LCS, edit distance</td></tr>
              <tr><td className="py-2 pr-4">Backtracking</td><td>Search state space with pruning</td><td>Exponential</td><td>N-Queens, Sudoku</td></tr>
              <tr><td className="py-2 pr-4">Graph search</td><td>Reachability, shortest paths</td><td>O(V + E)</td><td>BFS, DFS, Dijkstra</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Data structures decide what operations are fast; algorithms decide the plan.</li>
          <li>Big-O is your compass — always analyze before optimizing.</li>
          <li>Master a small set of patterns; most problems are variations of them.</li>
          <li>Practice consistently — DSA fluency compounds week over week.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Which language should I use for DSA?">Any modern language works. Python for readability, C++ for speed in contests, Java/TS for interviews.</FAQItem>
        <FAQItem q="How many problems should I solve?">Quality over quantity — 150–250 well-understood problems beat 800 rushed ones.</FAQItem>
        <FAQItem q="Do I need competitive programming?">Not required for most jobs, but it dramatically sharpens speed and pattern recognition.</FAQItem>
        <FAQItem q="How do I stop forgetting?">Spaced repetition — revisit solved problems after 3, 7, and 30 days.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://leetcode.com/" target="_blank" rel="noreferrer">LeetCode — curated problems and contests</a></li>
          <li><a className="text-primary hover:underline" href="https://cp-algorithms.com/" target="_blank" rel="noreferrer">CP-Algorithms — competitive programming reference</a></li>
          <li><a className="text-primary hover:underline" href="https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/" target="_blank" rel="noreferrer">CLRS — Introduction to Algorithms</a></li>
          <li><a className="text-primary hover:underline" href="https://www.geeksforgeeks.org/data-structures/" target="_blank" rel="noreferrer">GeeksforGeeks — Data Structures</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is educational and reflects widely accepted DSA practices. Complexity bounds are theoretical — real-world performance depends on language, hardware, and constants. Always verify solutions against a broad test suite before using in production.</p>
      </Section>
    </ReaderShell>
  );
}
