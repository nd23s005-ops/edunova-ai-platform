import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "operating-systems-learning-roadmap",
  title: "Operating Systems — Learning Roadmap",
  category: "CS Core",
  difficulty: "Beginner",
  readingTime: "8 min",
  pages: 8,
  lastUpdated: "September 2026",
  tags: ["OS", "Systems", "CS Core"],
  heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80",
  heroSubtitle: "Operating Systems learning roadmap: fundamentals, Linux practice, scheduling algorithms, synchronization, memory management, filesystems, shell scripting, projects, interview prep, and systems programming career progression.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "intro", label: "Introduction" },
  { id: "concepts", label: "Core Concepts" },
  { id: "steps", label: "Step-by-Step Explanations" },
  { id: "diagrams", label: "Process & Memory Diagrams" },
  { id: "scheduling", label: "Scheduling Charts & Tables" },
  { id: "examples", label: "Real-world Examples" },
  { id: "applications", label: "Practical Applications" },
  { id: "practices", label: "Best Practices" },
  { id: "mistakes", label: "Common Mistakes" },
  { id: "tips", label: "Tips & Tricks" },
  { id: "compare", label: "Comparison Table" },
  { id: "commands", label: "Linux Command Reference" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Operating Systems — Complete Tutorial", tag: "CS Core", time: "75 min" },
  { title: "Operating Systems — Cheat Sheet", tag: "CS Core", time: "6 min" },
  { title: "Operating Systems — Interview Questions", tag: "CS Core", time: "44 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/operating-systems-learning-roadmap")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/operating-systems-learning-roadmap" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the concepts presented in Operating Systems — Learning Roadmap.</li>
          <li>Understand how processes, threads, scheduling, and memory management work in modern OSes.</li>
          <li>Apply filesystem, synchronization, and virtualization ideas to real Linux systems.</li>
          <li>Recognize best practices, common mistakes, and productive tips.</li>
          <li>Prepare confidently for exams, interviews, and hands-on systems work.</li>
        </ul>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Operating Systems learning roadmap: fundamentals, Linux practice, scheduling algorithms, synchronization, memory management, filesystems, shell scripting, projects, interview prep, and systems programming career progression.</p>
        <Callout tone="info" title="Who this is for">Students, engineers, and interview candidates preparing to build strong operating systems fundamentals.</Callout>
        <Figure src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1400&q=80" caption="Figure 1 — Operating Systems overview: kernel, user space, processes, and the layers between hardware and applications." />
      </Section>

      <Section id="concepts" title="Core Concepts">
        <p>An operating system is the software layer that manages hardware and provides services to user programs. Its core responsibilities are process management, memory management, storage/filesystems, device I/O, and protection.</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Kernel vs user mode</b> — the CPU enforces a privilege boundary so untrusted code cannot touch hardware directly.</li>
          <li><b>Processes & threads</b> — processes isolate memory; threads share memory and are the unit of scheduling.</li>
          <li><b>Scheduling</b> — the kernel decides which runnable thread gets the CPU next.</li>
          <li><b>Virtual memory</b> — every process sees its own address space, mapped to physical frames on demand.</li>
          <li><b>Filesystems</b> — persistent, hierarchical storage on top of block devices.</li>
        </ul>
      </Section>

      <Section id="steps" title="Step-by-Step Explanations">
        <ol className="list-decimal space-y-1 pl-5">
          <li>User invokes a program; the shell calls <Code>fork()</Code> then <Code>execve()</Code>.</li>
          <li>Kernel creates a task_struct, allocates a virtual address space, and loads the ELF binary.</li>
          <li>Scheduler places the new task on a runqueue; a context switch lets it run.</li>
          <li>Page faults populate physical frames on demand; the MMU translates addresses.</li>
          <li>System calls (<Code>read</Code>, <Code>write</Code>, <Code>mmap</Code>) cross into kernel mode to touch hardware.</li>
          <li>On <Code>exit()</Code> the kernel reclaims memory, closes descriptors, and notifies the parent.</li>
        </ol>
      </Section>

      <Section id="diagrams" title="Process & Memory Diagrams">
        <Figure src="https://images.unsplash.com/photo-1629654857987-a0d09ce2a5cf?w=1400&q=80" caption="Figure 2 — Process lifecycle and virtual memory layout: text, data, heap, stack, and kernel space." />
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Process states:
   new  ─►  ready  ─►  running  ─►  terminated
                ▲          │
                └── waiting ◄── I/O / event

Virtual address space (Linux x86_64):
   ┌────────────── kernel space ──────────────┐
   │                                          │
   ├────────────── stack ▼ ───────────────────┤
   │           (mmap region)                  │
   ├────────────── heap ▲ ────────────────────┤
   ├────────────── bss / data ────────────────┤
   └────────────── text (code) ───────────────┘`}
        </pre>
      </Section>

      <Section id="scheduling" title="Scheduling Charts & Tables">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Algorithm</th>
                <th className="py-2 pr-4">Preemptive</th>
                <th className="py-2 pr-4">Avg Wait</th>
                <th className="py-2">Best For</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">FCFS</td><td>No</td><td>High</td><td>Batch jobs</td></tr>
              <tr><td className="py-2 pr-4">SJF</td><td>Optional</td><td>Lowest (theoretical)</td><td>Known burst times</td></tr>
              <tr><td className="py-2 pr-4">Round Robin</td><td>Yes</td><td>Fair</td><td>Interactive systems</td></tr>
              <tr><td className="py-2 pr-4">Priority</td><td>Yes / No</td><td>Depends</td><td>Real-time & mixed loads</td></tr>
              <tr><td className="py-2 pr-4">MLFQ</td><td>Yes</td><td>Adaptive</td><td>General-purpose OSes</td></tr>
              <tr><td className="py-2 pr-4">CFS (Linux)</td><td>Yes</td><td>Fair (vruntime)</td><td>Modern Linux desktops/servers</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="examples" title="Real-world Examples">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Linux</b> — CFS scheduler, ext4/xfs/btrfs filesystems, cgroups powering containers.</li>
          <li><b>Windows NT</b> — hybrid kernel, NTFS, and priority-based scheduling with boosts.</li>
          <li><b>macOS / iOS</b> — XNU hybrid kernel with Mach + BSD layers.</li>
          <li><b>Android</b> — Linux kernel plus binder IPC and Zygote process model.</li>
          <li><b>Real-time OS</b> — FreeRTOS/VxWorks with deterministic scheduling for embedded systems.</li>
        </ul>
      </Section>

      <Section id="applications" title="Practical Applications">
        <p>OS knowledge underpins backend engineering (performance, concurrency), DevOps (containers, Linux administration), embedded/IoT, cloud infrastructure, security engineering, and low-level performance tuning.</p>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer immutable / append-only data structures where possible to reduce locking.</li>
          <li>Use OS primitives (mutex, semaphore, condvar) instead of hand-rolled spinlocks.</li>
          <li>Cap open file descriptors and threads; monitor with <Code>ulimit</Code>, <Code>lsof</Code>, <Code>top</Code>.</li>
          <li>Keep filesystems tuned: right block size, journaling mode, and mount options.</li>
          <li>Profile before optimizing — <Code>perf</Code>, <Code>strace</Code>, <Code>bpftrace</Code> beat guesses.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Assuming <Code>fork()</Code> copies memory eagerly — it uses copy-on-write.</li>
          <li>Ignoring signal handling and leaving zombies with unreaped children.</li>
          <li>Sharing mutable data between threads without synchronization.</li>
          <li>Confusing paging with segmentation, or virtual with physical memory.</li>
          <li>Running production services as root without capabilities/namespaces.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li><Code>htop</Code> and <Code>btop</Code> give a live picture of CPU, memory, and threads.</li>
          <li><Code>strace -f -p PID</Code> shows every syscall a running process makes.</li>
          <li><Code>/proc/&lt;pid&gt;/</Code> exposes maps, fds, status — priceless for debugging.</li>
          <li>Use <Code>nice</Code>/<Code>ionice</Code> for background jobs so they don't starve interactive work.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Aspect</th>
                <th className="py-2 pr-4">Process</th>
                <th className="py-2 pr-4">Thread</th>
                <th className="py-2">Container</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">Isolation</td><td>Strong (own address space)</td><td>None (shared)</td><td>Namespaces + cgroups</td></tr>
              <tr><td className="py-2 pr-4">Creation cost</td><td>Higher</td><td>Low</td><td>Low (shared kernel)</td></tr>
              <tr><td className="py-2 pr-4">Fault blast radius</td><td>Contained</td><td>Whole process</td><td>Contained</td></tr>
              <tr><td className="py-2 pr-4">Typical use</td><td>Separate services</td><td>Parallel work in-service</td><td>Deployable app units</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="commands" title="Linux Command Reference">
        <Code>{`# Processes
ps aux | grep nginx
top / htop
kill -9 <pid>

# Memory
free -h
vmstat 1
cat /proc/meminfo

# Filesystems
df -h
du -sh *
mount | column -t

# Scheduling / priority
nice -n 10 ./job
renice -n -5 -p <pid>

# Tracing
strace -f ./app
perf top`}</Code>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Operating systems mediate between hardware and applications.</li>
          <li>Processes isolate; threads share; both are scheduled by the kernel.</li>
          <li>Virtual memory, filesystems, and syscalls are the universal abstractions.</li>
          <li>Modern OS trends: containers, unikernels, eBPF, and specialized schedulers.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Do I need to learn assembly to understand OS?">No — a high-level grasp of C-level memory models is enough for most engineering roles.</FAQItem>
        <FAQItem q="Is Linux the best OS to learn on?">Yes — it is open source, ubiquitous in industry, and every concept has readable code behind it.</FAQItem>
        <FAQItem q="How much math is involved?">Very little beyond simple arithmetic for scheduling and memory calculations.</FAQItem>
        <FAQItem q="Should I read the Linux kernel source?">Skim it after you understand the concepts — start with schedulers and VFS.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://www.os-book.com/" target="_blank" rel="noreferrer">Operating System Concepts — Silberschatz, Galvin, Gagne</a></li>
          <li><a className="text-primary hover:underline" href="https://cs.vu.nl/~ast/" target="_blank" rel="noreferrer">Modern Operating Systems — Tanenbaum</a></li>
          <li><a className="text-primary hover:underline" href="https://man7.org/tlpi/" target="_blank" rel="noreferrer">The Linux Programming Interface — Michael Kerrisk</a></li>
          <li><a className="text-primary hover:underline" href="https://pages.cs.wisc.edu/~remzi/OSTEP/" target="_blank" rel="noreferrer">OSTEP — Operating Systems: Three Easy Pieces (free online)</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is provided for educational purposes only. Commands and configuration examples may differ across distributions and kernel versions — always verify against the official documentation for your environment before applying in production.</p>
      </Section>
    </ReaderShell>
  );
}
