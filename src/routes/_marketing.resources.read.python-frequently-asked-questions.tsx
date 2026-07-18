import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "python-frequently-asked-questions",
  title: "Python — Frequently Asked Questions",
  category: "Programming",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 10,
  lastUpdated: "January 2026",
  tags: ["Python", "OOP"],
  heroImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1800&q=80",
  heroSubtitle: "Answers to the most common Python questions from beginners and working developers.",
};

const TOC: TocItem[] = [
  { id: "objectives", label: "Learning Objectives" },
  { id: "prereq", label: "Prerequisites" },
  { id: "toc", label: "Table of Contents" },
  { id: "intro", label: "Introduction" },
  { id: "content", label: "Core Concepts & Detailed Content" },
  { id: "architecture", label: "Architecture & Workflow" },
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
  { title: "Python — Beginner Guide", tag: "Python", time: "11 min" },
  { title: "Python — Cheat Sheet", tag: "Python", time: "3 min" },
  { title: "Python — Interview Questions", tag: "Python", time: "33 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/python-frequently-asked-questions")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/python-frequently-asked-questions" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the topic scope of the <b>Frequently Asked Questions</b> — practical, exam-ready coverage.</li>
          <li>Read and write idiomatic Python using PEP 8, type hints, and dataclasses.</li>
          <li>Design programs with functions, modules, packages, and OOP.</li>
          <li>Work with files, JSON/CSV, and the Python standard library.</li>
          <li>Handle exceptions, logging, and testing with pytest.</li>
          <li>Understand concurrency — threading, multiprocessing, and asyncio.</li>
          <li>Ship Python — virtual environments, packaging, Docker, and CI/CD.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Basic computer literacy — install software and use a terminal.</li>
          <li>Familiarity with any programming language is helpful, not required.</li>
          <li>Python 3.11+ installed (or use Google Colab / Jupyter for zero setup).</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to Python & Setup</li>
          <li>Language Fundamentals — variables, types, operators, control flow</li>
          <li>Functions, Modules, and Packages</li>
          <li>Data Structures — list, tuple, set, dict, collections</li>
          <li>Object-Oriented Programming & Dataclasses</li>
          <li>Iterators, Generators, Comprehensions, Context Managers</li>
          <li>Exception Handling, Logging, and Typing</li>
          <li>Files, JSON/CSV, pathlib, os, shutil</li>
          <li>Standard Library — itertools, functools, datetime, hashlib</li>
          <li>Concurrency — threading, multiprocessing, asyncio</li>
          <li>Databases — SQLite, SQLAlchemy, PostgreSQL</li>
          <li>Web — Flask, Django, FastAPI, REST & GraphQL</li>
          <li>Automation — BeautifulSoup, Selenium, Playwright</li>
          <li>Data & AI — NumPy, Pandas, scikit-learn, PyTorch, LangChain</li>
          <li>Testing — unittest, pytest, mocks, coverage</li>
          <li>DevOps — Docker, Kubernetes, GitHub Actions, CI/CD</li>
          <li>Best Practices, Security, and Performance</li>
          <li>Summary, FAQs & References</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>Python is a general-purpose, high-level programming language known for its readable syntax, batteries-included standard library, and huge ecosystem. This resource — <b>Python — Frequently Asked Questions</b> — is designed to be self-contained: Answers to the most common Python questions from beginners and working developers.</p>
        <Callout tone="info" title="Python in one line">Python = readable syntax + huge standard library + world-class ecosystem for web, data, AI, and automation.</Callout>
        <Figure src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80" caption="Figure 1 — Python execution flow — source code is compiled to bytecode and executed by the CPython interpreter." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history, installation, interpreter, REPL, IDLE, VS Code, PyCharm, Jupyter, Colab, pip, venv, virtualenv, Poetry, uv.</li>
          <li><b>Language fundamentals</b> — variables, data types, operators, expressions, input/output, type conversion, comments, keywords, identifiers.</li>
          <li><b>Control flow</b> — <code>if / elif / else</code>, <code>match-case</code>, <code>for</code>, <code>while</code>, <code>break</code>, <code>continue</code>, <code>pass</code>.</li>
          <li><b>Functions</b> — definitions, args, defaults, keyword args, <code>*args</code>, <code>**kwargs</code>, lambdas, recursion, closures, decorators.</li>
          <li><b>Data structures</b> — strings, lists, tuples, sets, dicts, <code>collections</code>, <code>deque</code>, <code>Counter</code>, <code>defaultdict</code>, <code>NamedTuple</code>.</li>
          <li><b>OOP</b> — classes, objects, constructors, instance/class variables, encapsulation, inheritance, polymorphism, abstraction, magic methods, dataclasses.</li>
          <li><b>Advanced Python</b> — iterators, generators, comprehensions, context managers, exception handling, logging, typing, generics, enums, protocols.</li>
          <li><b>Files & modules</b> — file handling, CSV, JSON, pickle, <code>pathlib</code>, <code>os</code>, <code>shutil</code>, <code>zipfile</code>, <code>configparser</code>.</li>
          <li><b>Standard library</b> — math, random, datetime, statistics, itertools, functools, hashlib, threading, multiprocessing, asyncio.</li>
          <li><b>Databases</b> — SQLite, MySQL, PostgreSQL, SQLAlchemy ORM.</li>
          <li><b>Web</b> — Flask, Django, FastAPI, REST APIs, GraphQL.</li>
          <li><b>Automation</b> — web scraping, BeautifulSoup, Selenium, Playwright, automation scripts.</li>
          <li><b>Data science</b> — NumPy, Pandas, Matplotlib, Seaborn, Plotly.</li>
          <li><b>AI & ML</b> — scikit-learn, TensorFlow, PyTorch, LangChain, AI agents, OpenAI API.</li>
          <li><b>Testing</b> — unittest, pytest, mocking, coverage.</li>
          <li><b>DevOps</b> — Docker, Kubernetes, Git, GitHub Actions, CI/CD.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Source (.py)
   │
   ▼
[Lexer / Parser] ── AST ──▶ [Compiler] ── bytecode (.pyc) ──▶ [CPython VM]
                                                                   │
                                                                   ▼
                                                        Objects / GC / Threads
                                                                   │
                                                                   ▼
                                                       C-extensions / OS calls`}
        </pre>
        <Code>{`# Idiomatic Python — types, dataclasses, comprehensions, and pathlib
from __future__ import annotations
from dataclasses import dataclass
from pathlib import Path
import json

@dataclass(slots=True, frozen=True)
class User:
    id: int
    name: str
    email: str

def load_users(path: Path) -> list[User]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return [User(**row) for row in data]

def active_emails(users: list[User]) -> list[str]:
    return [u.email for u in users if "@" in u.email]

if __name__ == "__main__":
    users = load_users(Path("users.json"))
    print(active_emails(users))`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1400&q=80" caption="Figure 2 — Python ecosystem — one language spans web, data science, AI, DevOps, and automation." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Web apps & APIs</b> — Django and FastAPI power products at Instagram, Netflix, and Uber.</li>
          <li><b>Data & analytics</b> — Pandas + NumPy for pipelines and notebooks in finance and biotech.</li>
          <li><b>AI / ML</b> — PyTorch, TensorFlow, scikit-learn — the default language of modern ML research.</li>
          <li><b>Automation & scripting</b> — DevOps glue, ETL, and internal tooling across every industry.</li>
          <li><b>Scientific computing</b> — SciPy, SymPy, and Jupyter for research and simulation.</li>
          <li><b>Testing & QA</b> — pytest + Playwright / Selenium for end-to-end automation.</li>
        </ul>
        <Code>{`# Async web scraper with httpx + asyncio
import asyncio, httpx

URLS = ["https://example.com", "https://python.org", "https://pypi.org"]

async def fetch(client: httpx.AsyncClient, url: str) -> tuple[str, int]:
    r = await client.get(url, timeout=10)
    return url, r.status_code

async def main() -> None:
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(*(fetch(client, u) for u in URLS))
        for url, code in results:
            print(url, "->", code)

if __name__ == "__main__":
    asyncio.run(main())`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Follow <b>PEP 8</b> — use <code>ruff</code> or <code>black</code> + <code>ruff</code> for formatting and linting.</li>
          <li>Use <b>type hints</b> everywhere and check with <code>mypy</code> or <code>pyright</code>.</li>
          <li>Isolate dependencies with <code>venv</code>, <code>poetry</code>, or <code>uv</code>.</li>
          <li>Prefer <code>dataclasses</code> or <code>pydantic</code> models over ad-hoc dicts.</li>
          <li>Log with the <code>logging</code> module — never <code>print</code> in production code.</li>
          <li>Write tests first with <code>pytest</code>; measure with <code>coverage</code>.</li>
          <li>Follow SOLID principles and small, composable functions.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Using mutable default arguments (<code>def f(x=[]):</code>) — they're shared across calls.</li>
          <li>Late-binding closures in loops — capture values with default args or <code>functools.partial</code>.</li>
          <li>Confusing <code>is</code> with <code>==</code> — identity vs equality.</li>
          <li>Ignoring the GIL for CPU-bound work — use multiprocessing or native extensions.</li>
          <li>Broad <code>except:</code> that swallows real errors.</li>
          <li>Skipping virtual environments and polluting the system Python.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li>Use <code>enumerate</code>, <code>zip</code>, and unpacking instead of index math.</li>
          <li>Reach for comprehensions and generator expressions for streaming data.</li>
          <li>Use <code>pathlib.Path</code> instead of <code>os.path</code> string juggling.</li>
          <li>Debug with <code>breakpoint()</code> — it drops you into pdb.</li>
          <li>Format strings with f-strings; they're the fastest option in modern CPython.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-b [&>tr]:border-border/40">
              <tr><td className="py-2 pr-4">venv</td><td>Isolated envs</td><td>Standard, built-in, minimal.</td></tr>
              <tr><td className="py-2 pr-4">Poetry</td><td>Deps + packaging</td><td>Libraries and reproducible apps.</td></tr>
              <tr><td className="py-2 pr-4">uv</td><td>Fast installer + env</td><td>Modern replacement for pip / venv / pip-tools.</td></tr>
              <tr><td className="py-2 pr-4">Flask</td><td>Micro web framework</td><td>Small services and prototypes.</td></tr>
              <tr><td className="py-2 pr-4">Django</td><td>Batteries-included web</td><td>Full-featured web apps with ORM and admin.</td></tr>
              <tr><td className="py-2 pr-4">FastAPI</td><td>Async APIs</td><td>Typed, high-performance REST/GraphQL APIs.</td></tr>
              <tr><td className="py-2 pr-4">Pandas</td><td>Data frames</td><td>Tabular data wrangling and analysis.</td></tr>
              <tr><td className="py-2 pr-4">NumPy</td><td>Arrays / math</td><td>Numerical and scientific computing.</td></tr>
              <tr><td className="py-2 pr-4">PyTorch</td><td>Deep learning</td><td>Research and production neural networks.</td></tr>
              <tr><td className="py-2 pr-4">pytest</td><td>Testing</td><td>Unit, integration, and property-based tests.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Security & Testing">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — profile with <code>cProfile</code>, use vectorization (NumPy), C-extensions, or PyPy.</li>
          <li><b>Concurrency</b> — asyncio for IO-bound, multiprocessing / native code for CPU-bound.</li>
          <li><b>Security</b> — parameterize SQL, validate input, pin deps, and use <code>bandit</code> to audit code.</li>
          <li><b>Testing</b> — unit + integration with pytest; measure coverage; mock external services.</li>
          <li><b>Packaging</b> — publish to PyPI with <code>build</code>+<code>twine</code> or <code>poetry publish</code>.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>Python is readable, expressive, and dominant across web, data, AI, and automation.</li>
          <li>Master the standard library first — it covers most day-to-day needs.</li>
          <li>Type hints + dataclasses + pytest make Python codebases scale.</li>
          <li>For performance, pick the right tool: asyncio, multiprocessing, or native extensions.</li>
          <li>Isolate every project with a virtual environment — no exceptions.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="Which Python version should I use?">Use the latest stable Python 3 release (3.11 or newer). Avoid Python 2 — it is end-of-life.</FAQItem>
        <FAQItem q="Do I need type hints?">They are optional but strongly recommended. Combined with mypy or pyright, they catch bugs early and document intent.</FAQItem>
        <FAQItem q="What is the GIL?">The Global Interpreter Lock serializes bytecode execution in CPython. Use multiprocessing or native extensions for CPU-bound parallelism.</FAQItem>
        <FAQItem q="Flask, Django, or FastAPI?">Flask for tiny apps, Django for full apps with ORM/admin, FastAPI for typed async REST APIs.</FAQItem>
        <FAQItem q="How do I package a Python app?">Use <code>pyproject.toml</code> with Poetry or hatch; publish to PyPI or ship as a Docker image.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://docs.python.org/3/" target="_blank" rel="noreferrer">Python Docs</a> · <a className="text-primary hover:underline" href="https://docs.python.org/3/tutorial/" target="_blank" rel="noreferrer">Python Tutorial</a> · <a className="text-primary hover:underline" href="https://peps.python.org/" target="_blank" rel="noreferrer">PEP Index</a></li>
          <li><a className="text-primary hover:underline" href="https://pypi.org/" target="_blank" rel="noreferrer">PyPI</a> · <a className="text-primary hover:underline" href="https://packaging.python.org/" target="_blank" rel="noreferrer">Python Packaging</a> · <a className="text-primary hover:underline" href="https://docs.python.org/3/library/asyncio.html" target="_blank" rel="noreferrer">asyncio</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.pytest.org/" target="_blank" rel="noreferrer">pytest</a> · <a className="text-primary hover:underline" href="https://docs.python.org/3/library/unittest.html" target="_blank" rel="noreferrer">unittest</a> · <a className="text-primary hover:underline" href="https://docs.sqlalchemy.org/" target="_blank" rel="noreferrer">SQLAlchemy</a></li>
          <li><a className="text-primary hover:underline" href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer">Flask</a> · <a className="text-primary hover:underline" href="https://docs.djangoproject.com/" target="_blank" rel="noreferrer">Django</a> · <a className="text-primary hover:underline" href="https://fastapi.tiangolo.com/" target="_blank" rel="noreferrer">FastAPI</a></li>
          <li><a className="text-primary hover:underline" href="https://numpy.org/doc/" target="_blank" rel="noreferrer">NumPy</a> · <a className="text-primary hover:underline" href="https://pandas.pydata.org/docs/" target="_blank" rel="noreferrer">Pandas</a> · <a className="text-primary hover:underline" href="https://jupyter.org/documentation" target="_blank" rel="noreferrer">Jupyter</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. Python, its ecosystem, and third-party libraries evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
