import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, BookOpen, Bookmark, BookmarkCheck, CheckCircle2, ChevronRight, Clock,
  Cpu, Download, FileText, Heart, Info, Lightbulb, Printer, Share2, Sparkles, Tag,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-advanced-concepts")({
  head: () => {
    const title = "Artificial Intelligence — Advanced Concepts | EduNova AI";
    const desc = "Deep dive into advanced AI architectures, transformers, RL, distributed training, optimization, security, and production engineering.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIAdvancedConceptsPage,
});

const RESOURCE = {
  id: "ai-advanced-concepts",
  title: "Artificial Intelligence — Advanced Concepts",
  category: "AI & Data",
  difficulty: "Advanced",
  readingTime: "34 min",
  pages: 30,
  lastUpdated: "May 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};
const IMG = {
  hero: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1800&q=80",
  arch: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  scale: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
};
const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "arch", label: "1. Advanced AI Architecture" },
  { id: "nn", label: "2. Advanced Neural Networks" },
  { id: "fm", label: "3. Foundation Models" },
  { id: "llm", label: "4. Large Language Models" },
  { id: "tx", label: "5. Transformers" },
  { id: "rl", label: "6. Reinforcement Learning" },
  { id: "opt", label: "7. AI Optimization" },
  { id: "compress", label: "8. Model Compression" },
  { id: "dist", label: "9. Distributed AI Systems" },
  { id: "sec", label: "10. AI Security" },
  { id: "ethics", label: "11. AI Ethics" },
  { id: "edge", label: "12. Edge Cases" },
  { id: "perf", label: "13. Performance Engineering" },
  { id: "prod", label: "14. Production AI" },
  { id: "future", label: "15. Future Directions" },
  { id: "review", label: "Advanced Review" },
  { id: "glossary", label: "Glossary" },
  { id: "faq", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

function useToggleStore(key: string, id: string) {
  const [on, setOn] = useState(false);
  useEffect(() => { try { const raw = localStorage.getItem(key); const arr = raw ? (JSON.parse(raw) as string[]) : []; setOn(arr.includes(id)); } catch { /* empty */ } }, [key, id]);
  const toggle = () => { try { const raw = localStorage.getItem(key); const arr = raw ? (JSON.parse(raw) as string[]) : []; const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]; localStorage.setItem(key, JSON.stringify(next)); setOn(next.includes(id)); } catch { /* empty */ } };
  return [on, toggle] as const;
}

function AIAdvancedConceptsPage() {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
      let current = TOC[0].id;
      for (const item of TOC) { const s = document.getElementById(item.id); if (s && s.getBoundingClientRect().top < 140) current = item.id; }
      setActiveId(current);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const share = async () => { const url = window.location.href; try { if (navigator.share) await navigator.share({ title: RESOURCE.title, url }); else { await navigator.clipboard.writeText(url); toast.success("Link copied to clipboard"); } } catch { /* empty */ } };
  const download = () => { toast.info("Preparing print-ready PDF…"); setTimeout(() => window.print(), 300); };
  const readingTitle = useMemo(() => RESOURCE.title, []);

  return (
    <div className="bg-background">
      <style>{`@media print{.no-print{display:none!important}.print-article{padding:0!important}body{background:#fff!important}}`}</style>
      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1" aria-hidden>
        <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow"><Cpu className="h-5 w-5" /></div>
            <div className="min-w-0"><p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p><p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · {RESOURCE.readingTime}</p></div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}><Download className="mr-1.5 h-4 w-4" /><span className="hidden sm:inline">Download PDF</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>{bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}<span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}><Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} /><span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}><Share2 className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Share</span></Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={() => window.print()}><Printer className="h-4 w-4" /><span className="ml-1.5 hidden sm:inline">Print</span></Button>
          </div>
        </div>
      </div>

      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-fuchsia-800/70 to-indigo-800/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-rose-500/90 text-white hover:bg-rose-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">15 Chapters</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">A senior-level tour of AI architectures, foundation models, RL, optimization, distributed systems, and production engineering.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {RESOURCE.readingTime} read</span>
            <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" /> {RESOURCE.pages} pages</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Updated {RESOURCE.lastUpdated}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">{RESOURCE.tags.map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur"><Tag className="h-3 w-3" /> {t}</span>)}</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8 lg:py-14">
        <aside className="no-print hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">Contents</p>
            <nav className="space-y-1 text-sm">{TOC.map((t) => <a key={t.id} href={`#${t.id}`} className={`block rounded-md px-2 py-1.5 transition ${activeId === t.id ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{t.label}</a>)}</nav>
          </div>
        </aside>

        <article ref={articleRef} className="print-article prose prose-slate max-w-none dark:prose-invert">
          <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
            <ul className="mt-1 grid list-disc gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              <li>Understand advanced AI architectures.</li>
              <li>Design production-grade AI systems.</li>
              <li>Optimize and scale training and inference.</li>
              <li>Analyze complex AI workflows.</li>
              <li>Reason about emerging trends and expert patterns.</li>
              <li>Identify security and ethical edge cases.</li>
            </ul>
          </Callout>

          <Section id="arch" title="1. Advanced AI Architecture">
            <p>Modern AI systems compose <strong>data pipelines, feature stores, model registries, retrieval layers, orchestration, evaluation, and observability</strong>. Architectural rigor beats model choice in most production settings.</p>
            <figure><img src={IMG.arch} alt="Layered AI architecture" className="rounded-xl border border-border/60" /><figcaption className="text-xs text-muted-foreground">Layered architecture: data → features → model → serving → observability.</figcaption></figure>
            <ul><li>Batch vs streaming feature paths must share transformations to prevent train/serve skew.</li><li>Model registries version artefacts alongside data + code + prompts.</li><li>Retrieval, ranking, and generation are separable concerns — decouple them.</li></ul>
          </Section>

          <Section id="nn" title="2. Advanced Neural Networks">
            <ul>
              <li><strong>Residual connections</strong> stabilise very deep stacks by preserving gradient flow.</li>
              <li><strong>Normalisation</strong>: LayerNorm dominates transformers; BatchNorm dominates CNNs.</li>
              <li><strong>Activations</strong>: GELU, SwiGLU, and gated variants beat ReLU in transformers.</li>
              <li><strong>Positional information</strong>: RoPE and ALiBi outperform absolute embeddings for long context.</li>
              <li><strong>Initialisation</strong>: Xavier / Kaiming remain foundational; μP scales cleanly across widths.</li>
            </ul>
          </Section>

          <Section id="fm" title="3. Foundation Models">
            <p>Foundation models are large, self-supervised backbones adapted to many downstream tasks via prompting, adapters, or fine-tuning. Their value comes from <em>generalisation</em>, not novelty of task-specific tricks.</p>
            <ComparisonTable headers={["Adaptation", "Cost", "Best when"]} rows={[
              ["Zero-shot prompting", "Lowest", "Task is common and quality bar is moderate"],
              ["Few-shot prompting", "Low", "Small demos disambiguate the task"],
              ["RAG", "Medium", "Domain knowledge changes frequently"],
              ["LoRA / adapters", "Medium-high", "Repeated task, latency-sensitive"],
              ["Full fine-tune", "High", "Task-specific behaviour, static domain"],
            ]} />
          </Section>

          <Section id="llm" title="4. Large Language Models">
            <ul>
              <li>Training: pretraining → supervised fine-tune (SFT) → RLHF/DPO.</li>
              <li>Serving: KV cache, paged attention, speculative decoding, continuous batching.</li>
              <li>Alignment techniques evolve; evaluation must move with them.</li>
              <li>Long-context: memory scales O(n²) unless approximated (linear/attention-free variants).</li>
            </ul>
          </Section>

          <Section id="tx" title="5. Transformers">
            <p>Self-attention lets each token attend to every other token, capturing long-range dependencies. Multi-head attention learns multiple projection subspaces in parallel.</p>
            <ul>
              <li>Encoder-only (BERT), decoder-only (GPT), encoder-decoder (T5) — pick by task shape.</li>
              <li>FlashAttention rewrites attention memory access for 2–4× speedups.</li>
              <li>Mixture-of-Experts routes tokens through sparse experts — more capacity, same active compute.</li>
            </ul>
          </Section>

          <Section id="rl" title="6. Reinforcement Learning">
            <ul>
              <li>Value-based (DQN), policy-gradient (REINFORCE), actor-critic (PPO/SAC).</li>
              <li>Exploration: ε-greedy, entropy bonuses, intrinsic curiosity.</li>
              <li>RLHF: reward model learned from preferences, then PPO or DPO to align policy.</li>
              <li>Sim-to-real is the hard problem: domain randomisation and system identification help.</li>
            </ul>
          </Section>

          <Section id="opt" title="7. AI Optimization">
            <ul>
              <li>Optimisers: AdamW, Lion, Shampoo. Warmup + cosine decay is a strong default.</li>
              <li>Gradient checkpointing trades compute for memory.</li>
              <li>Mixed precision (bf16) is the standard; fp8 is emerging.</li>
              <li>ZeRO and FSDP shard optimizer/gradient/parameter state across GPUs.</li>
            </ul>
          </Section>

          <Section id="compress" title="8. Model Compression">
            <ul>
              <li><strong>Quantisation</strong>: INT8/INT4/FP4; per-channel or per-tensor. GPTQ, AWQ, SmoothQuant.</li>
              <li><strong>Distillation</strong>: student mimics teacher outputs or logits.</li>
              <li><strong>Pruning</strong>: structured (heads, filters) vs unstructured (weights).</li>
              <li><strong>Speculative decoding</strong>: small draft model proposes, large model verifies.</li>
            </ul>
          </Section>

          <Section id="dist" title="9. Distributed AI Systems">
            <figure><img src={IMG.scale} alt="Distributed training layout" className="rounded-xl border border-border/60" /><figcaption className="text-xs text-muted-foreground">Data / tensor / pipeline / expert parallelism combine to scale beyond single-GPU limits.</figcaption></figure>
            <ul>
              <li>Data parallel is easy; tensor + pipeline parallel are needed past ~7B params.</li>
              <li>Interconnect matters: NVLink &gt; PCIe &gt; Ethernet for collectives.</li>
              <li>Failure is normal at scale — checkpoint often, resume idempotently.</li>
            </ul>
          </Section>

          <Section id="sec" title="10. AI Security">
            <ul>
              <li><strong>Prompt injection</strong>: untrusted text hijacks instructions. Isolate untrusted content from system prompts; require tool-use allow-lists.</li>
              <li><strong>Data exfiltration</strong>: models can echo secrets in logs. Redact inputs and outputs.</li>
              <li><strong>Model theft</strong>: rate-limit, watermark, and monitor query patterns.</li>
              <li><strong>Adversarial examples</strong>: use adversarial training and input sanitisation for safety-critical models.</li>
            </ul>
          </Section>

          <Section id="ethics" title="11. AI Ethics">
            <ul>
              <li>Bias audits by subgroup, not just overall accuracy.</li>
              <li>Consent and provenance for training data.</li>
              <li>Human oversight for high-impact decisions.</li>
              <li>Transparency: model cards + data sheets for datasets.</li>
            </ul>
          </Section>

          <Section id="edge" title="12. Edge Cases">
            <ul>
              <li>Distribution shift after deploy (seasonal, adversarial, or user behaviour).</li>
              <li>Long-tail inputs the training data never saw.</li>
              <li>Silent failure: model returns confidently wrong answers.</li>
              <li>Latency spikes under bursty traffic patterns.</li>
              <li>Cold cache after failover — plan warmup.</li>
            </ul>
          </Section>

          <Section id="perf" title="13. Performance Engineering">
            <ul>
              <li>Batching + KV cache + speculative decoding are the LLM serving trifecta.</li>
              <li>Profile first (torch profiler / nsight) — optimise measured bottlenecks only.</li>
              <li>Move preprocessing to the GPU; overlap host↔device transfer with compute.</li>
              <li>Serve on the smallest model that meets the quality bar.</li>
            </ul>
          </Section>

          <Section id="prod" title="14. Production AI">
            <ul>
              <li>Blue/green or canary deploys with automatic rollback triggers.</li>
              <li>Feature + prediction + business metric monitoring on one dashboard.</li>
              <li>Shadow deploys to compare candidates on live traffic without impact.</li>
              <li>SLA: define p50/p95/p99 latency and error budgets up front.</li>
            </ul>
          </Section>

          <Section id="future" title="15. Future Directions">
            <ul>
              <li>Multimodal foundation models (text + vision + audio + code).</li>
              <li>Agentic systems with tool use, memory, and planning.</li>
              <li>Efficient training (mixture-of-depth, low-precision).</li>
              <li>On-device inference for privacy and latency.</li>
              <li>Formal verification and interpretability tools maturing.</li>
            </ul>
          </Section>

          <Section id="review" title="Advanced Review">
            <h4>Architecture Summary</h4>
            <ul>
              <li>Data → features → model → retrieval → generation → serving → observability.</li>
              <li>Decouple concerns; version everything; monitor at every layer.</li>
            </ul>
            <h4>Advanced Checklist</h4>
            <ul>
              <li>Continuous batching + KV cache enabled at serving.</li>
              <li>Quantisation and distillation evaluated as first-line optimisations.</li>
              <li>Alignment (SFT + preference optimisation) with red-team suite.</li>
              <li>Shadow deploy + canary + rollback wired end-to-end.</li>
              <li>Prompt-injection defenses (allow-list tools, isolate context).</li>
            </ul>
            <h4>Reflection Questions</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Which layer of my system limits scale today — training, serving, or evaluation?</li>
              <li>What is my rollback trigger and time-to-rollback?</li>
              <li>Which subgroup is my model worst on, and by how much?</li>
              <li>Where is the highest-leverage optimisation — modelling or engineering?</li>
            </ol>
            <h4>Discussion Topics</h4>
            <ul>
              <li>When does full fine-tuning still beat prompting + retrieval?</li>
              <li>Is MoE worth the serving complexity for your workload?</li>
              <li>How do you evaluate agents whose outputs are trajectories, not answers?</li>
            </ul>
            <h4>Expert Tips</h4>
            <ul>
              <li>Never optimise before profiling. Never deploy before shadowing.</li>
              <li>Trust distributions over anecdotes.</li>
              <li>The cheapest 20% quality gain almost always comes from data, not modelling.</li>
            </ul>
          </Section>

          <Section id="glossary" title="Glossary">
            <ul>
              <li><strong>FSDP</strong> — Fully Sharded Data Parallel.</li>
              <li><strong>KV cache</strong> — Cached keys/values reused across decoding steps.</li>
              <li><strong>MoE</strong> — Mixture of Experts.</li>
              <li><strong>RLHF</strong> — Reinforcement Learning from Human Feedback.</li>
              <li><strong>DPO</strong> — Direct Preference Optimisation.</li>
              <li><strong>RoPE</strong> — Rotary Position Embeddings.</li>
              <li><strong>Speculative decoding</strong> — Draft-and-verify token generation.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="Is bigger always better?">No. Bigger costs more, latency more, and often hallucinates more without careful training. Match capacity to task.</FAQ>
            <FAQ q="Do I need distributed training?">Only past the point where one accelerator is a bottleneck. Distributed adds real engineering cost.</FAQ>
            <FAQ q="Prompting vs fine-tuning vs RAG?">Prompting for exploration, RAG for changing knowledge, fine-tuning for repeatable behaviour and latency.</FAQ>
          </Section>

          <References />
          <Disclaimer />
          <RelatedResources
            items={[
              { title: "Artificial Intelligence — Reference Guide", to: "/resources/read/ai-reference-guide" },
              { title: "Artificial Intelligence — Glossary", to: "/resources/read/ai-glossary" },
              { title: "Artificial Intelligence — Best Practices", to: "/resources/read/ai-best-practices" },
              { title: "Artificial Intelligence — Common Mistakes", to: "/resources/read/ai-common-mistakes" },
              { title: "Artificial Intelligence — Interview Questions", to: "/resources/read/ai-interview-questions" },
              { title: "Artificial Intelligence — Real-world Case Study", to: "/resources/read/ai-real-world-case-study" },
            ]}
          />
        </article>
      </div>
    </div>
  );
}

/* Shared UI */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24"><h2>{title}</h2>{children}</section>;
}
function ComparisonTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (<div className="not-prose my-4 overflow-hidden rounded-xl border border-border/60"><table className="w-full text-sm"><thead className="bg-secondary/60"><tr>{headers.map((h) => <th key={h} className="p-2 text-left">{h}</th>)}</tr></thead><tbody className="[&_td]:border-t [&_td]:p-2">{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>);
}
function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  return <details className="not-prose my-2 rounded-xl border border-border/60 bg-card p-4"><summary className="cursor-pointer text-sm font-semibold">{q}</summary><div className="mt-2 text-sm text-muted-foreground">{children}</div></details>;
}
function Callout({ tone, title, icon, children }: { tone: "tip" | "info" | "note" | "warning" | "success"; title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  const styles: Record<string, string> = { tip: "border-amber-500/40 bg-amber-500/10", info: "border-sky-500/40 bg-sky-500/10", note: "border-violet-500/40 bg-violet-500/10", warning: "border-red-500/40 bg-red-500/10", success: "border-emerald-500/40 bg-emerald-500/10" };
  const defaultIcon: Record<string, React.ReactNode> = { tip: <Lightbulb className="h-5 w-5" />, info: <Info className="h-5 w-5" />, note: <Info className="h-5 w-5" />, warning: <Info className="h-5 w-5" />, success: <CheckCircle2 className="h-5 w-5" /> };
  return (<div className={`not-prose rounded-2xl border-l-4 ${styles[tone]} p-4`}><div className="flex items-start gap-3"><div className="mt-0.5 shrink-0">{icon ?? defaultIcon[tone]}</div><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{title}</p><div className="mt-1 text-sm">{children}</div></div></div></div>);
}
function References() {
  return (
    <section id="references" className="scroll-mt-24 not-prose mt-8 rounded-2xl border border-border/60 bg-card p-6">
      <h3 className="text-lg font-semibold">References</h3>
      <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
        <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
        <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
        <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow</a></li>
        <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch</a></li>
        <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn</a></li>
        <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM AI</a></li>
        <li><a href="https://www.nvidia.com/en-us/ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI</a></li>
        <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face</a></li>
        <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
        <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Lab</a></li>
        <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">CMU School of Computer Science</a></li>
        <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
        <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
        <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — cs.AI</a></li>
        <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
        <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
        <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore</a></li>
      </ul>
    </section>
  );
}
function Disclaimer() {
  return (
    <section id="disclaimer" className="scroll-mt-24 not-prose mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
      <p className="font-semibold text-foreground">Disclaimer</p>
      <p className="mt-2">This resource is intended for educational purposes only. Information is compiled from official documentation, academic publications, research papers, industry standards, and trusted educational resources. Artificial Intelligence is a rapidly evolving field, and technologies, APIs, and best practices may change over time. Learners should consult the official documentation for the latest and most accurate information.</p>
      <p className="mt-2">All trademarks, logos, product names, and intellectual property belong to their respective owners. EduNova AI does not claim ownership of any third-party materials referenced in this resource.</p>
    </section>
  );
}
function RelatedResources({ items }: { items: { title: string; to: string }[] }) {
  return (
    <div className="no-print mt-16 not-prose">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue learning</p><h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Related resources</h2></div>
        <Link to="/resources" className="hidden text-sm font-medium text-primary hover:underline sm:inline">Browse library →</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r, i) => (
          <motion.a key={r.title} href={r.to} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.03 }} className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"><BookOpen className="h-5 w-5" /></div>
            <p className="mt-3 text-sm font-semibold">{r.title}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Badge variant="secondary" className="text-[10px]">AI & Data</Badge></div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">Open resource <ArrowRight className="h-3 w-3" /></span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
