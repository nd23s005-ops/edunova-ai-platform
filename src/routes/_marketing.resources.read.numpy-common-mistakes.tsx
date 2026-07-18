import { createFileRoute } from "@tanstack/react-router";
import { ReaderShell, Section, Figure, FAQItem, Callout, Code, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "numpy-common-mistakes",
  title: "NumPy — Common Mistakes",
  category: "Data & Analytics",
  difficulty: "Beginner",
  readingTime: "11 min",
  pages: 14,
  lastUpdated: "March 2026",
  tags: ["NumPy", "Python"],
  heroImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1800&q=80",
  heroSubtitle: "The most frequent NumPy mistakes, why they happen, and how to fix them for good.",
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
  { id: "considerations", label: "Performance, Memory & Quality" },
  { id: "summary", label: "Summary & Key Takeaways" },
  { id: "faqs", label: "FAQs" },
  { id: "references", label: "Further Reading & Official References" },
  { id: "disclaimer", label: "Educational Disclaimer" },
];

const RELATED = [
  { title: "NumPy — Beginner Guide", tag: "NumPy", time: "17 min" },
  { title: "NumPy — Cheat Sheet", tag: "NumPy", time: "4 min" },
  { title: "NumPy — Interview Questions", tag: "NumPy", time: "29 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/numpy-common-mistakes")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/resources/read/numpy-common-mistakes" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="objectives" title="Learning Objectives">
        <ul className="list-disc space-y-1 pl-5">
          <li>Master the scope of the <b>Common Mistakes</b> — practical, production-ready NumPy for numerical computing.</li>
          <li>Model numeric data with <code>ndarray</code>, dtypes, shape, strides, and axes.</li>
          <li>Vectorize computation with universal functions (ufuncs) and broadcasting.</li>
          <li>Apply linear algebra, statistics, and random sampling to real problems.</li>
          <li>Integrate NumPy with Pandas, SciPy, Matplotlib, Scikit-learn, and the wider PyData stack.</li>
          <li>Optimize memory, benchmark performance, and ship reproducible scientific pipelines.</li>
        </ul>
      </Section>

      <Section id="prereq" title="Prerequisites">
        <ul className="list-disc space-y-1 pl-5">
          <li>Core Python — variables, lists, tuples, dictionaries, functions, and loops.</li>
          <li>Basic math intuition — vectors, matrices, and simple statistics.</li>
          <li>Python 3.10+ with <code>pip</code> or <code>conda</code>, and a notebook (Jupyter or Colab).</li>
          <li>NumPy 1.26+ / 2.x installed via <code>pip install numpy</code>.</li>
        </ul>
      </Section>

      <Section id="toc" title="Table of Contents">
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          <li>Introduction to NumPy and scientific computing in Python</li>
          <li>Installation, ecosystem, and notebook environments</li>
          <li>Python prerequisites — lists, tuples, dicts, functions, loops</li>
          <li>ndarray fundamentals — dimensions, shape, size, dtype, memory layout</li>
          <li>Array creation — <code>array</code>, <code>arange</code>, <code>linspace</code>, <code>logspace</code>, <code>zeros</code>, <code>ones</code>, <code>eye</code></li>
          <li>Indexing & slicing — basic, advanced, boolean, fancy, views vs copies</li>
          <li>Array manipulation — reshape, flatten, ravel, transpose, concatenate, stack, split</li>
          <li>Broadcasting — rules, examples, vectorization, performance benefits</li>
          <li>Universal functions — arithmetic, trig, exp, log, rounding</li>
          <li>Statistics — mean, median, std, variance, percentiles, correlation</li>
          <li>Linear algebra — dot, matmul, inverse, determinant, eigenvalues, SVD</li>
          <li>Random module — sampling, permutations, distributions, seeds</li>
          <li>Searching & sorting — sort, argsort, searchsorted, where, argmax, unique</li>
          <li>File I/O — save, load, savez, text, binary, memory-mapping</li>
          <li>Masking & filtering — boolean masks, conditional ops, logical funcs</li>
          <li>Performance — vectorization, memory optimization, benchmarking</li>
          <li>Numerical methods — integration, differentiation, interpolation, FFT</li>
          <li>Scientific computing — SciPy, signal & image processing, simulation</li>
          <li>Data science & ML — Pandas, Matplotlib, Scikit-learn, feature engineering</li>
          <li>Big data & GPU — Dask arrays, CuPy, parallel computing</li>
          <li>Production — pipelines, error handling, logging, deployment</li>
        </ol>
      </Section>

      <Section id="intro" title="Introduction">
        <p>NumPy is the foundation of the Python scientific computing stack. Its <code>ndarray</code> — a strided, homogeneous, N-dimensional array — powers Pandas, SciPy, Scikit-learn, TensorFlow, PyTorch, and virtually every data-science tool in Python. This resource — <b>NumPy — Common Mistakes</b> — is self-contained: The most frequent NumPy mistakes, why they happen, and how to fix them for good.</p>
        <Callout tone="info" title="NumPy in one line">NumPy = <code>ndarray</code> + dtypes + broadcasting + ufuncs + linear algebra + random — a batteries-included numerical toolkit.</Callout>
        <Figure src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" caption="Figure 1 — NumPy ndarray architecture — shape, strides, dtype, and a contiguous memory buffer." />
      </Section>

      <Section id="content" title="Core Concepts & Detailed Content">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Foundations</b> — history of NumPy, why NumPy, scientific vs numerical computing, installation, and the PyData ecosystem.</li>
          <li><b>Python prerequisites</b> — variables, lists, tuples, dicts, functions, loops, and NumPy vs Python lists.</li>
          <li><b>ndarray</b> — dimensions, shape, size, dtype, strides, C vs Fortran order, and array attributes.</li>
          <li><b>Array creation</b> — <code>array</code>, <code>arange</code>, <code>linspace</code>, <code>logspace</code>, <code>zeros</code>, <code>ones</code>, <code>full</code>, <code>eye</code>, <code>identity</code>, <code>empty</code>, <code>fromfunction</code>.</li>
          <li><b>Indexing & slicing</b> — basic indexing, advanced indexing, boolean masks, fancy indexing, and views vs copies.</li>
          <li><b>Manipulation</b> — <code>reshape</code>, <code>flatten</code>, <code>ravel</code>, <code>transpose</code>, <code>swapaxes</code>, <code>concatenate</code>, <code>stack</code>, <code>split</code>.</li>
          <li><b>Broadcasting</b> — rules, worked examples, vectorization, and the performance gains over Python loops.</li>
          <li><b>Ufuncs</b> — arithmetic, trigonometric, exponential, logarithmic, and rounding functions.</li>
          <li><b>Statistics</b> — <code>mean</code>, <code>median</code>, <code>std</code>, <code>var</code>, <code>percentile</code>, <code>quantile</code>, <code>corrcoef</code>.</li>
          <li><b>Linear algebra</b> — <code>dot</code>, <code>matmul</code>, <code>@</code>, <code>linalg.inv</code>, <code>det</code>, <code>eig</code>, <code>svd</code>.</li>
          <li><b>Random</b> — <code>default_rng</code>, sampling, permutations, distributions, and seeding for reproducibility.</li>
          <li><b>Searching & sorting</b> — <code>sort</code>, <code>argsort</code>, <code>searchsorted</code>, <code>where</code>, <code>argmax</code>, <code>argmin</code>, <code>unique</code>.</li>
          <li><b>File I/O</b> — <code>save</code>, <code>load</code>, <code>savez</code>, text and binary formats, and memory-mapped arrays.</li>
          <li><b>Masking & filtering</b> — boolean masks, <code>np.logical_and</code>, <code>np.where</code>, and conditional selection.</li>
          <li><b>Performance</b> — vectorization, memory optimization, benchmarking, and broadcasting-aware code.</li>
          <li><b>Numerical methods</b> — <code>trapz</code>, <code>gradient</code>, <code>interp</code>, <code>polyfit</code>, and <code>fft</code>.</li>
          <li><b>Scientific computing</b> — SciPy integration, signal and image processing, and simulation.</li>
          <li><b>Data science</b> — Pandas, Matplotlib, Seaborn, Scikit-learn, and feature engineering.</li>
          <li><b>Machine learning</b> — dataset preparation, normalization, standardization, matrix math, and neural-network numerics.</li>
          <li><b>Big data</b> — Dask arrays, CuPy, GPU computing, and parallel processing.</li>
          <li><b>Business analytics</b> — financial analysis, statistics, forecasting, and time-series prep.</li>
          <li><b>Testing & debugging</b> — assertions, array debugging, performance profiling, memory profiling.</li>
          <li><b>Production</b> — data pipelines, automation, error handling, logging, and deployment.</li>
        </ul>
      </Section>

      <Section id="architecture" title="Architecture & Workflow">
        <pre className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 text-xs leading-relaxed">
{`Raw Data (CSV / Parquet / API / Sensors)
        │
        ▼
   [ Load ]      ── np.loadtxt / np.load / pd.read_* → ndarray
        │
        ▼
   [ Clean ]     ── dtype conversion / NaN handling / reshape
        │
        ▼
   [ Vectorize ] ── ufuncs + broadcasting (no Python loops)
        │
        ▼
   [ Analyze ]   ── stats / linear algebra / FFT / random
        │
        ▼
   [ Persist ]   ── np.save / np.savez / memory-mapped arrays
        │
        ▼
Downstream — Pandas / SciPy / Scikit-learn / PyTorch / TF`}
        </pre>
        <Code>{`# numerics.py — a small, production-shaped NumPy pipeline
import numpy as np

rng = np.random.default_rng(seed=42)

def load(path: str) -> np.ndarray:
    return np.load(path)  # or np.loadtxt(path, delimiter=",")

def normalize(x: np.ndarray) -> np.ndarray:
    mu = x.mean(axis=0)
    sd = x.std(axis=0) + 1e-9
    return (x - mu) / sd  # broadcasting across rows

def analyze(x: np.ndarray) -> dict:
    cov = np.cov(x, rowvar=False)
    eigvals, _ = np.linalg.eigh(cov)
    return {"mean": x.mean(axis=0), "cov": cov, "eig": eigvals}

if __name__ == "__main__":
    x = load("data/features.npy")
    z = normalize(x)
    print(analyze(z))`}</Code>
      </Section>

      <Section id="examples" title="Practical Examples & Enterprise Use Cases">
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 2 — Broadcasting and vectorization — scalar, 1D, and 2D arrays combined without Python loops." />
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Finance</b> — portfolio returns, covariance matrices, and Monte-Carlo risk simulation.</li>
          <li><b>Signal processing</b> — FFT-based spectral analysis and digital filters.</li>
          <li><b>Image processing</b> — pixel-level ops, convolutions, and channel manipulation.</li>
          <li><b>Machine learning</b> — dataset normalization, one-hot encoding, and mini-batch math.</li>
          <li><b>Scientific simulation</b> — ODE integration, physics simulation, and Monte-Carlo sampling.</li>
          <li><b>Business analytics</b> — statistical summaries, forecasting features, and time-series prep.</li>
        </ul>
        <Code>{`# Vectorized statistics + linear algebra
import numpy as np

rng = np.random.default_rng(0)
returns = rng.normal(0.0005, 0.01, size=(2520, 5))   # 10y daily, 5 assets

# Portfolio stats
mu    = returns.mean(axis=0) * 252
cov   = np.cov(returns, rowvar=False) * 252
weights = np.array([0.25, 0.2, 0.2, 0.2, 0.15])

port_return = weights @ mu
port_vol    = np.sqrt(weights @ cov @ weights)
sharpe      = port_return / port_vol
print(port_return, port_vol, sharpe)`}</Code>
      </Section>

      <Section id="practices" title="Best Practices">
        <ul className="list-disc space-y-1 pl-5">
          <li>Prefer <b>vectorized ufuncs</b> and broadcasting over Python <code>for</code> loops.</li>
          <li>Set explicit <b>dtypes</b> — use <code>float32</code> / <code>int32</code> when you need memory savings.</li>
          <li>Use <code>np.random.default_rng(seed)</code> — never the legacy global RNG for new code.</li>
          <li>Avoid unnecessary copies — understand when slicing returns a <b>view</b> vs a <b>copy</b>.</li>
          <li>Reach for <code>@</code> / <code>matmul</code> for matrix multiplication, not <code>*</code>.</li>
          <li>Use <code>np.asarray</code> at API boundaries — accept lists, return arrays.</li>
          <li>Benchmark hot paths with <code>%timeit</code>; profile memory with <code>np.ndarray.nbytes</code>.</li>
        </ul>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul className="list-disc space-y-1 pl-5">
          <li>Using Python <code>for</code> loops over arrays instead of vectorized ops.</li>
          <li>Confusing <code>*</code> (element-wise) with <code>@</code> / <code>matmul</code> (matrix product).</li>
          <li>Silent dtype upcasts — <code>int8</code> + <code>float64</code> → <code>float64</code>.</li>
          <li>Modifying a slice, assuming it's a copy — it's a view; use <code>.copy()</code>.</li>
          <li>Reusing <code>np.random.seed</code> globally instead of a local <code>Generator</code>.</li>
          <li>Loading giant arrays fully into RAM instead of using <code>np.memmap</code>.</li>
          <li>Ignoring broadcasting rules and reshaping arrays by hand.</li>
        </ul>
      </Section>

      <Section id="tips" title="Tips & Tricks">
        <ul className="list-disc space-y-1 pl-5">
          <li><code>arr[np.newaxis, :]</code> adds a leading axis for broadcasting.</li>
          <li><code>np.einsum</code> expresses complex tensor contractions concisely.</li>
          <li><code>np.clip(x, lo, hi)</code> — one call for saturation.</li>
          <li><code>np.where(cond, a, b)</code> — vectorized ternary.</li>
          <li><code>np.stack</code> vs <code>np.concatenate</code> — stack adds a new axis, concatenate joins along existing.</li>
          <li>Use <code>np.savez_compressed</code> for shipping multiple arrays together.</li>
        </ul>
      </Section>

      <Section id="compare" title="Comparison Table">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left">
                <th className="py-2 pr-4">Feature / Tool</th>
                <th className="py-2 pr-4">Purpose</th>
                <th className="py-2">When to Use</th>
              </tr>
            </thead>
            <tbody className="[&amp;>tr]:border-b [&amp;>tr]:border-border/40">
              <tr><td className="py-2 pr-4"><code>ndarray</code></td><td>N-D typed array</td><td>Any numerical data.</td></tr>
              <tr><td className="py-2 pr-4">Broadcasting</td><td>Shape-aligned ops</td><td>Avoid explicit loops and reshapes.</td></tr>
              <tr><td className="py-2 pr-4">ufuncs</td><td>Element-wise math</td><td>Fast, vectorized numerical ops.</td></tr>
              <tr><td className="py-2 pr-4"><code>linalg</code></td><td>Linear algebra</td><td>Matrix inverse, eig, SVD, solve.</td></tr>
              <tr><td className="py-2 pr-4"><code>random</code></td><td>Sampling</td><td>Simulation, ML, statistics.</td></tr>
              <tr><td className="py-2 pr-4">NumPy</td><td>In-memory arrays</td><td>Datasets that fit in RAM.</td></tr>
              <tr><td className="py-2 pr-4">Dask / CuPy</td><td>Out-of-core / GPU</td><td>Larger-than-RAM or GPU-accelerated.</td></tr>
              <tr><td className="py-2 pr-4">Pandas</td><td>Labeled tables</td><td>Tabular analytics on top of NumPy.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="considerations" title="Performance, Memory & Quality">
        <ul className="list-disc space-y-1 pl-5">
          <li><b>Performance</b> — vectorize; use <code>@</code>, <code>einsum</code>, and BLAS-backed <code>linalg</code>.</li>
          <li><b>Memory</b> — pick the smallest safe dtype; use <code>memmap</code> for on-disk arrays.</li>
          <li><b>Quality</b> — validate shapes and dtypes at function boundaries with assertions.</li>
          <li><b>Reproducibility</b> — pin NumPy versions and seed <code>default_rng</code> explicitly.</li>
          <li><b>Deployment</b> — package pipelines as CLI scripts or notebooks orchestrated via Airflow / Prefect.</li>
        </ul>
      </Section>

      <Section id="summary" title="Summary & Key Takeaways">
        <ul className="list-disc space-y-1 pl-5">
          <li>NumPy is the numerical foundation of the Python data stack.</li>
          <li>Model data as <code>ndarray</code>; leverage shape, dtype, and strides.</li>
          <li>Vectorize with ufuncs and broadcasting — no explicit Python loops.</li>
          <li>Use <code>linalg</code>, <code>random</code>, and <code>fft</code> for scientific workloads.</li>
          <li>Optimize with dtypes, views, and memory-mapping.</li>
          <li>Compose with Pandas, SciPy, Scikit-learn, and PyTorch for full pipelines.</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQs">
        <FAQItem q="NumPy vs Python lists?">NumPy arrays are typed, contiguous, and vectorized — orders of magnitude faster than Python lists for numerics.</FAQItem>
        <FAQItem q="View or copy?">Basic slicing returns a view; fancy / boolean indexing returns a copy. Use <code>arr.base</code> or <code>.copy()</code> when unsure.</FAQItem>
        <FAQItem q="Which RNG should I use?"><code>np.random.default_rng(seed)</code> — the modern Generator API, thread-safe and higher quality.</FAQItem>
        <FAQItem q="Do I need SciPy?">Only when you need advanced numerics — optimization, integration, sparse matrices, signal processing.</FAQItem>
        <FAQItem q="Can NumPy use the GPU?">Not directly — use CuPy (drop-in) or JAX/PyTorch for GPU tensors.</FAQItem>
      </Section>

      <Section id="references" title="Further Reading & Official References">
        <ul className="list-disc space-y-1 pl-5">
          <li><a className="text-primary hover:underline" href="https://numpy.org/doc/" target="_blank" rel="noreferrer">NumPy Documentation</a> · <a className="text-primary hover:underline" href="https://numpy.org/doc/stable/reference/" target="_blank" rel="noreferrer">NumPy API Reference</a> · <a className="text-primary hover:underline" href="https://numpy.org/neps/" target="_blank" rel="noreferrer">NumPy Enhancement Proposals</a></li>
          <li><a className="text-primary hover:underline" href="https://docs.python.org/3/" target="_blank" rel="noreferrer">Python Docs</a> · <a className="text-primary hover:underline" href="https://docs.scipy.org/doc/scipy/" target="_blank" rel="noreferrer">SciPy Docs</a></li>
          <li><a className="text-primary hover:underline" href="https://matplotlib.org/stable/contents.html" target="_blank" rel="noreferrer">Matplotlib</a> · <a className="text-primary hover:underline" href="https://seaborn.pydata.org/" target="_blank" rel="noreferrer">Seaborn</a> · <a className="text-primary hover:underline" href="https://scikit-learn.org/stable/documentation.html" target="_blank" rel="noreferrer">Scikit-learn</a></li>
          <li><a className="text-primary hover:underline" href="https://jupyter.org/documentation" target="_blank" rel="noreferrer">Jupyter</a> · <a className="text-primary hover:underline" href="https://research.google.com/colaboratory/" target="_blank" rel="noreferrer">Google Colab</a></li>
        </ul>
      </Section>

      <Section id="disclaimer" title="Educational Disclaimer">
        <p className="text-sm text-muted-foreground">This resource is <b>educational</b>. NumPy and its ecosystem evolve — always consult the latest official documentation before applying to production. Product names and trademarks belong to their respective owners.</p>
      </Section>
    </ReaderShell>
  );
}
