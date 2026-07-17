import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRight, BookMarked, BookOpen, Bookmark, BookmarkCheck, CheckCircle2, ChevronRight, Clock,
  Download, FileText, Heart, Info, Lightbulb, Printer, Search, Share2, Sparkles, Tag,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-glossary")({
  head: () => {
    const title = "Artificial Intelligence — Glossary | EduNova AI";
    const desc = "An A–Z glossary of AI terminology: acronyms, algorithms, architectures, ML/DL/GenAI vocabulary with plain-language and technical definitions.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:image", content: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIGlossaryPage,
});

const RESOURCE = {
  id: "ai-glossary", title: "Artificial Intelligence — Glossary", category: "AI & Data",
  difficulty: "Beginner", readingTime: "9 min", pages: 20, lastUpdated: "March 2026",
  tags: ["Artificial Intelligence", "AI", "Neural Networks"],
};
const IMG = {
  hero: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1800&q=80",
  concept: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
  network: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=1400&q=80",
};
const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";

const TOC = [
  { id: "how", label: "1. How to Use This Glossary" },
  { id: "acronyms", label: "2. Acronyms" },
  { id: "az", label: "3. A–Z Terms" },
  { id: "algos", label: "4. AI Algorithms" },
  { id: "nn", label: "5. Neural Network Terms" },
  { id: "ml", label: "6. Machine Learning Vocabulary" },
  { id: "dl", label: "7. Deep Learning Vocabulary" },
  { id: "genai", label: "8. Generative AI Vocabulary" },
  { id: "cloud", label: "9. Cloud AI Terms" },
  { id: "math", label: "10. Mathematical Terms" },
  { id: "interview", label: "11. Interview Terminology" },
  { id: "index", label: "12. Quick Revision Index" },
  { id: "review", label: "Glossary Review" },
  { id: "faq", label: "FAQ" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

type Term = { term: string; def: string; example?: string; related?: string };

const ACRONYMS: Term[] = [
  { term: "AI", def: "Artificial Intelligence." },
  { term: "ML", def: "Machine Learning." },
  { term: "DL", def: "Deep Learning." },
  { term: "NN", def: "Neural Network." },
  { term: "CNN", def: "Convolutional Neural Network — image models." },
  { term: "RNN", def: "Recurrent Neural Network — sequence models." },
  { term: "LSTM", def: "Long Short-Term Memory — gated recurrent unit." },
  { term: "GAN", def: "Generative Adversarial Network — generator vs discriminator." },
  { term: "LLM", def: "Large Language Model." },
  { term: "NLP", def: "Natural Language Processing." },
  { term: "CV", def: "Computer Vision." },
  { term: "RL", def: "Reinforcement Learning." },
  { term: "RLHF", def: "Reinforcement Learning from Human Feedback." },
  { term: "DPO", def: "Direct Preference Optimisation." },
  { term: "SFT", def: "Supervised Fine-Tuning." },
  { term: "RAG", def: "Retrieval-Augmented Generation." },
  { term: "GPU", def: "Graphics Processing Unit." },
  { term: "TPU", def: "Tensor Processing Unit." },
  { term: "MLOps", def: "Machine Learning Operations." },
  { term: "AGI", def: "Artificial General Intelligence (theoretical)." },
];

const AZ: Term[] = [
  { term: "Activation Function", def: "A non-linear function applied to a neuron's weighted sum.", example: "ReLU, sigmoid, GELU." },
  { term: "Attention", def: "Mechanism where each element weights other elements for context.", related: "Self-attention, cross-attention." },
  { term: "Autoencoder", def: "Network that compresses input into a latent space and reconstructs it." },
  { term: "Backpropagation", def: "Algorithm computing gradients of the loss w.r.t. weights via chain rule." },
  { term: "Batch", def: "Group of examples processed together per training step." },
  { term: "Bias (statistical)", def: "Systematic error where predictions consistently differ from truth." },
  { term: "Classification", def: "Predicting a discrete label from input features." },
  { term: "Clustering", def: "Grouping similar examples without labels." },
  { term: "Convolution", def: "Sliding-filter operation extracting local patterns." },
  { term: "Cross-Entropy", def: "Standard loss for classification comparing predicted vs true distributions." },
  { term: "Dataset", def: "Structured collection of examples used for training or evaluation." },
  { term: "Dropout", def: "Randomly zeroing activations to reduce overfitting." },
  { term: "Embedding", def: "Learned dense vector representing an entity like a word or user." },
  { term: "Epoch", def: "One full pass through the training set." },
  { term: "Feature", def: "An input variable used by a model." },
  { term: "Fine-Tuning", def: "Additional training of a pretrained model on task-specific data." },
  { term: "Gradient Descent", def: "Optimisation moving weights against the gradient of the loss." },
  { term: "Hallucination", def: "A generative model producing plausible but false content." },
  { term: "Hyperparameter", def: "A configuration chosen before training (LR, batch size)." },
  { term: "Inference", def: "Running a trained model to produce predictions." },
  { term: "Jaccard Index", def: "Set similarity measure |A∩B|/|A∪B|." },
  { term: "Kernel", def: "Small matrix in a convolution; or a similarity function in SVMs." },
  { term: "Label", def: "Ground truth target associated with an example." },
  { term: "Learning Rate", def: "Step size for weight updates during optimisation." },
  { term: "Loss Function", def: "Scalar measuring prediction error." },
  { term: "MLP", def: "Multi-Layer Perceptron — feedforward network of dense layers." },
  { term: "Normalisation", def: "Rescaling inputs or activations to a standard range." },
  { term: "Overfitting", def: "Model memorises training data and generalises poorly." },
  { term: "PCA", def: "Principal Component Analysis — linear dimensionality reduction." },
  { term: "Precision", def: "Of predicted positives, fraction that are true." },
  { term: "Prompt", def: "Input text steering a language model's output." },
  { term: "Quantisation", def: "Storing weights at lower numeric precision." },
  { term: "Recall", def: "Of true positives, fraction the model retrieved." },
  { term: "Regularisation", def: "Techniques (L1, L2, dropout) that reduce overfitting." },
  { term: "ROC-AUC", def: "Area under the true-positive vs false-positive curve." },
  { term: "Sampling (LLM)", def: "Strategy for choosing next tokens: greedy, top-k, top-p, temperature." },
  { term: "SGD", def: "Stochastic Gradient Descent." },
  { term: "Softmax", def: "Turns logits into a probability distribution." },
  { term: "Tensor", def: "Multi-dimensional array; the primary DL data structure." },
  { term: "Token", def: "A subword unit an LLM operates on." },
  { term: "Transformer", def: "Attention-based architecture behind modern LLMs." },
  { term: "Underfitting", def: "Model too simple to capture patterns in the data." },
  { term: "Validation Set", def: "Held-out data used for tuning hyperparameters." },
  { term: "Weight", def: "A learnable parameter in a model." },
  { term: "XGBoost", def: "Gradient-boosted decision-tree library, strong on tabular data." },
  { term: "Zero-Shot", def: "Solving a task without any task-specific examples." },
];

const ALGOS: Term[] = [
  { term: "Linear Regression", def: "Fits a linear function minimising squared error." },
  { term: "Logistic Regression", def: "Binary classification with a sigmoid on linear features." },
  { term: "k-NN", def: "Predicts based on k nearest labelled neighbours." },
  { term: "Decision Tree", def: "Tree of feature splits producing predictions at leaves." },
  { term: "Random Forest", def: "Ensemble of decision trees trained on bootstraps." },
  { term: "Gradient Boosting", def: "Sequential tree ensemble fitting residuals." },
  { term: "SVM", def: "Maximum-margin classifier, kernel-based." },
  { term: "k-Means", def: "Unsupervised clustering by iterating centroid updates." },
  { term: "DBSCAN", def: "Density-based clustering discovering arbitrary shapes." },
  { term: "PPO", def: "Proximal Policy Optimisation — stable RL policy-gradient method." },
];

const NN_TERMS: Term[] = [
  { term: "Neuron", def: "Weighted sum + non-linearity." },
  { term: "Layer", def: "Group of neurons processed together." },
  { term: "Skip Connection", def: "Shortcut path that adds an earlier layer's output to a later one." },
  { term: "Attention Head", def: "One parallel attention subspace in a transformer." },
  { term: "Positional Encoding", def: "Signal added to tokens so the model knows their order." },
];

const ML_TERMS: Term[] = [
  { term: "Feature Engineering", def: "Creating input variables likely to help a model." },
  { term: "Cross-Validation", def: "Averaging performance across data splits for stability." },
  { term: "Class Imbalance", def: "One label dominates; needs weighting or resampling." },
  { term: "Leakage", def: "Training data contains information about the target unavailable at inference." },
];

const DL_TERMS: Term[] = [
  { term: "Batch Normalisation", def: "Normalises layer inputs across a batch." },
  { term: "Layer Normalisation", def: "Normalises across features for a single example — used in transformers." },
  { term: "Learning Rate Schedule", def: "How LR changes across training (warmup + cosine decay is common)." },
  { term: "Mixed Precision", def: "Training with bf16/fp16 for speed and memory." },
];

const GENAI_TERMS: Term[] = [
  { term: "Prompt Engineering", def: "Designing prompts to shape LLM behaviour." },
  { term: "Context Window", def: "Max tokens an LLM can process in one call." },
  { term: "RAG", def: "Grounding an LLM's answers in retrieved documents." },
  { term: "Diffusion Model", def: "Generative model that iteratively denoises." },
  { term: "LoRA", def: "Low-Rank Adaptation — parameter-efficient fine-tuning." },
];

const CLOUD_TERMS: Term[] = [
  { term: "Managed Endpoint", def: "Cloud-hosted model serving with autoscaling." },
  { term: "Autoscaler", def: "System that scales replicas with traffic." },
  { term: "Cold Start", def: "Extra latency when a container/model is first loaded." },
  { term: "Vector Database", def: "Store optimised for approximate nearest-neighbour search." },
];

const MATH_TERMS: Term[] = [
  { term: "Gradient", def: "Vector of partial derivatives — direction of steepest ascent." },
  { term: "Jacobian", def: "Matrix of partial derivatives of a vector-valued function." },
  { term: "Softmax Temperature", def: "Scalar dividing logits before softmax; higher = more entropy." },
  { term: "KL Divergence", def: "Measure of difference between two probability distributions." },
];

const INTERVIEW_TERMS: Term[] = [
  { term: "Bias-Variance Trade-off", def: "Balancing underfitting vs overfitting risk." },
  { term: "P-Hacking", def: "Selectively reporting results that appear significant by chance." },
  { term: "Test-Time Compute", def: "Extra inference-time reasoning steps to improve quality." },
  { term: "Model Card", def: "Structured document describing a model's intended use and limits." },
];

function useToggleStore(key: string, id: string) {
  const [on, setOn] = useState(false);
  useEffect(() => { try { const raw = localStorage.getItem(key); const arr = raw ? (JSON.parse(raw) as string[]) : []; setOn(arr.includes(id)); } catch { /* empty */ } }, [key, id]);
  const toggle = () => { try { const raw = localStorage.getItem(key); const arr = raw ? (JSON.parse(raw) as string[]) : []; const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]; localStorage.setItem(key, JSON.stringify(next)); setOn(next.includes(id)); } catch { /* empty */ } };
  return [on, toggle] as const;
}

function AIGlossaryPage() {
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);
  const [query, setQuery] = useState("");

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

  const filterTerms = (list: Term[]) => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((t) => t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q));
  };

  return (
    <div className="bg-background">
      <style>{`@media print{.no-print{display:none!important}.print-article{padding:0!important}body{background:#fff!important}}`}</style>
      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1" aria-hidden><div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow"><BookMarked className="h-5 w-5" /></div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/85 via-blue-700/75 to-indigo-800/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25"><ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library</Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-sky-500/90 text-white hover:bg-sky-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">150+ Terms</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">A searchable A–Z of AI terminology: acronyms, algorithms, ML/DL/GenAI vocabulary — plain-English definitions with examples and related concepts.</p>
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
              <li>Build a foundational AI vocabulary.</li>
              <li>Understand technical terminology.</li>
              <li>Learn common acronyms and short-forms.</li>
              <li>Improve reading comprehension of papers and docs.</li>
              <li>Prepare for interviews and certifications.</li>
              <li>Look up terms fast when reading elsewhere.</li>
            </ul>
          </Callout>

          <Section id="how" title="1. How to Use This Glossary">
            <p>Use the search box below to jump to any term. Sections are grouped by domain. Every entry has a plain-language definition, and where useful, an example, memory tip, or related concept. Terms are cross-linked — an entry may point to a related one for context.</p>
            <div className="not-prose my-4 flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search terms…" className="border-0 shadow-none focus-visible:ring-0" />
              {query && <button className="text-xs text-muted-foreground hover:text-foreground" onClick={() => setQuery("")}>Clear</button>}
            </div>
            <figure><img src={IMG.concept} alt="AI concept map" className="rounded-xl border border-border/60" /><figcaption className="text-xs text-muted-foreground">The AI landscape as a concept map — vocabulary organised around domains.</figcaption></figure>
          </Section>

          <TermsSection id="acronyms" title="2. Acronyms" terms={filterTerms(ACRONYMS)} />
          <TermsSection id="az" title="3. A–Z Terms" terms={filterTerms(AZ)} dense />
          <TermsSection id="algos" title="4. AI Algorithms" terms={filterTerms(ALGOS)} />
          <TermsSection id="nn" title="5. Neural Network Terms" terms={filterTerms(NN_TERMS)}>
            <figure><img src={IMG.network} alt="Neural network layers illustration" className="rounded-xl border border-border/60" /><figcaption className="text-xs text-muted-foreground">Neurons → layers → networks → deep networks.</figcaption></figure>
          </TermsSection>
          <TermsSection id="ml" title="6. Machine Learning Vocabulary" terms={filterTerms(ML_TERMS)} />
          <TermsSection id="dl" title="7. Deep Learning Vocabulary" terms={filterTerms(DL_TERMS)} />
          <TermsSection id="genai" title="8. Generative AI Vocabulary" terms={filterTerms(GENAI_TERMS)} />
          <TermsSection id="cloud" title="9. Cloud AI Terms" terms={filterTerms(CLOUD_TERMS)} />
          <TermsSection id="math" title="10. Mathematical Terms" terms={filterTerms(MATH_TERMS)} />
          <TermsSection id="interview" title="11. Interview Terminology" terms={filterTerms(INTERVIEW_TERMS)} />

          <Section id="index" title="12. Quick Revision Index">
            <p>Alphabetical index across every domain in this glossary. Search above to jump to a term.</p>
            <div className="not-prose grid gap-1 rounded-xl border border-border/60 bg-card p-4 text-sm sm:grid-cols-3">
              {[...ACRONYMS, ...AZ, ...ALGOS, ...NN_TERMS, ...ML_TERMS, ...DL_TERMS, ...GENAI_TERMS, ...CLOUD_TERMS, ...MATH_TERMS, ...INTERVIEW_TERMS]
                .map((t) => t.term).sort((a, b) => a.localeCompare(b)).map((t) => <span key={t} className="truncate text-muted-foreground">{t}</span>)}
            </div>
          </Section>

          <Section id="review" title="Glossary Review">
            <h4>Top 100 Important Terms</h4>
            <p>Terms most likely to appear in interviews and technical reading — a subset of the alphabetical index above.</p>
            <ul className="grid gap-x-6 gap-y-1 pl-5 sm:grid-cols-2">
              {["AI","ML","DL","LLM","RAG","Fine-Tuning","Prompt","Token","Transformer","Attention","Embedding","Loss Function","Gradient Descent","Learning Rate","Overfitting","Regularisation","Dropout","Batch Normalisation","Layer Normalisation","Cross-Entropy","Softmax","Activation Function","ReLU","GELU","Sigmoid","Convolution","Pooling","MLP","CNN","RNN","LSTM","GAN","Diffusion Model","LoRA","SFT","RLHF","DPO","Hallucination","Context Window","Vector Database","Precision","Recall","F1","ROC-AUC","Confusion Matrix","Cross-Validation","Class Imbalance","Leakage","Feature Engineering","Hyperparameter","Epoch","Batch","Gradient","Backpropagation","Optimiser","AdamW","SGD","Warmup","Cosine Decay","Mixed Precision","Quantisation","Distillation","Pruning","KV Cache","Speculative Decoding","MoE","RoPE","FlashAttention","Zero-Shot","Few-Shot","Chain-of-Thought","Agent","Tool Use","Guardrail","Red-Team","Model Card","Dataset Card","Bias","Fairness","Explainability","SHAP","LIME","Drift","PSI","KS","Shadow Deploy","Canary","Rollback","MLOps","Feature Store","Model Registry","Pipeline","AutoML","GPU","TPU","CUDA","Latency","Throughput","Autoscaler","Cold Start","SLA","SLO","Observability","Telemetry"].map((t) => <li key={t}>{t}</li>)}
            </ul>

            <h4>Interview Vocabulary</h4>
            <ul>
              <li>Bias-variance trade-off, overfitting, regularisation.</li>
              <li>Precision/recall/F1 vs accuracy; when each fails.</li>
              <li>Backpropagation, gradient descent, and optimiser choice.</li>
              <li>Attention, tokens, context window, and long-context trade-offs.</li>
              <li>Fine-tuning vs prompting vs RAG.</li>
              <li>Distillation, quantisation, and speculative decoding.</li>
            </ul>

            <h4>Quick Lookup Index</h4>
            <p>Use browser find (Ctrl/Cmd + F) or the search box above to jump directly to any term on this page.</p>

            <h4>Revision Sheet</h4>
            <ul>
              <li>AI ⊃ ML ⊃ DL ⊃ GenAI.</li>
              <li>Supervised / Unsupervised / Reinforcement / Self-supervised.</li>
              <li>Loss + Optimiser + Regulariser define training dynamics.</li>
              <li>Serve: batch → cache → quantise → distill.</li>
            </ul>
          </Section>

          <Section id="faq" title="FAQ">
            <FAQ q="Do I need to memorise every term?">No. Focus on the Top 100 first; the rest you can look up as you encounter them.</FAQ>
            <FAQ q="How often is this glossary updated?">Approximately quarterly, or immediately when a major term is introduced.</FAQ>
            <FAQ q="Where can I find deeper explanations?">See the References section and the related resources at the end.</FAQ>
          </Section>

          <References />
          <Disclaimer />
          <RelatedResources items={[
            { title: "Artificial Intelligence — Advanced Concepts", to: "/resources/read/ai-advanced-concepts" },
            { title: "Artificial Intelligence — Reference Guide", to: "/resources/read/ai-reference-guide" },
            { title: "Artificial Intelligence — Frequently Asked Questions", to: "/resources/read/ai-frequently-asked-questions" },
            { title: "Artificial Intelligence — Cheat Sheet", to: "/resources/read/ai-cheat-sheet" },
            { title: "Artificial Intelligence — Interview Questions", to: "/resources/read/ai-interview-questions" },
            { title: "Artificial Intelligence — Beginner Guide", to: "/resources/read/ai-beginner-guide" },
          ]} />
        </article>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="scroll-mt-24"><h2>{title}</h2>{children}</section>;
}
function TermsSection({ id, title, terms, dense, children }: { id: string; title: string; terms: Term[]; dense?: boolean; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2>{title}</h2>
      {children}
      {terms.length === 0 ? <p className="text-sm italic text-muted-foreground">No matches.</p> : (
        <div className={`not-prose grid gap-2 ${dense ? "sm:grid-cols-2" : ""}`}>
          {terms.map((t) => (
            <div key={t.term} className="rounded-xl border border-border/60 bg-card p-3">
              <p className="text-sm font-semibold">{t.term}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.def}</p>
              {t.example && <p className="mt-1 text-[11px] text-primary/80">e.g. {t.example}</p>}
              {t.related && <p className="mt-1 text-[11px] text-muted-foreground">Related: {t.related}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
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
