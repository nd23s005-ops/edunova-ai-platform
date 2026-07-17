import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Download,
  FileText,
  Heart,
  Info,
  Lightbulb,
  ListChecks,
  Printer,
  Share2,
  Sparkles,
  Tag,
  Trophy,

  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-answer-key")({
  head: () => {
    const title = "Artificial Intelligence — Answer Key | EduNova AI";
    const desc =
      "Fully worked solutions, rubric-based marking, and concept feedback for the AI Practice Questions workbook.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIAnswerKeyPage,
});

const RESOURCE = {
  id: "ai-answer-key",
  title: "Artificial Intelligence — Answer Key",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "24 min",
  pages: 32,
  lastUpdated: "April 2026",
  tags: ["Answer Key", "Solutions", "Rubric", "AI Fundamentals", "ML"],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80",
  workflow: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  eval: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
  nn: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  rubric: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=80",
  dashboard: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
  mistake: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1400&q=80",
};

type TocItem = { id: string; label: string };
const TOC: TocItem[] = [
  { id: "s1", label: "Introduction to the Answer Key" },
  { id: "s2", label: "How to Use This Resource" },
  { id: "s3", label: "Multiple Choice Answer Key" },
  { id: "s4", label: "True or False Answer Key" },
  { id: "s5", label: "Short Answer Solutions" },
  { id: "s6", label: "Scenario-Based Solutions" },
  { id: "s7", label: "Case Study Solutions" },
  { id: "s8", label: "Practical Exercise Solutions" },
  { id: "s9", label: "Mini Project Evaluation" },
  { id: "s10", label: "Rubric-Based Marking Guide" },
  { id: "s11", label: "Common Mistakes" },
  { id: "s12", label: "Frequently Asked Questions" },
  { id: "s13", label: "Final Review" },
];

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";
const TRACKER_KEY = "edunova.answerkey.ai-answer-key";

type Level = "Easy" | "Medium" | "Hard";

/* -------------------- Solutions data -------------------- */

type MCQSolution = {
  n: number;
  level: Level;
  q: string;
  correct: string;
  why: string;
  wrong: { label: string; text: string }[];
  concept: string;
  tip: string;
  related: string;
};

const MCQ: MCQSolution[] = [
  { n: 1, level: "Easy", q: "What does AI stand for?", correct: "B. Artificial Intelligence",
    why: "AI is the field of building systems that mimic cognitive functions like learning and reasoning.",
    wrong: [
      { label: "A", text: "'Automated Interface' is a UI term, not AI." },
      { label: "C", text: "'Advanced Internet' is unrelated." },
      { label: "D", text: "'Artificial Insight' is not a standard term." },
    ],
    concept: "AI definition", tip: "AI ≠ automation. Automation follows rules; AI learns patterns.", related: "AI Fundamentals" },
  { n: 2, level: "Easy", q: "Which is the broadest field?", correct: "C. Artificial Intelligence",
    why: "AI is the umbrella. ML is a subset of AI. DL is a subset of ML.",
    wrong: [
      { label: "A", text: "DL is the narrowest — a subset of ML." },
      { label: "B", text: "ML sits under AI." },
      { label: "D", text: "Neural networks are a technique used inside ML/DL." },
    ],
    concept: "AI ⊃ ML ⊃ DL", tip: "Draw three concentric circles to remember this.", related: "AI vs ML vs DL" },
  { n: 3, level: "Easy", q: "Modern AI mostly learns by:", correct: "B. Learning patterns from data",
    why: "Data-driven learning is the defining feature of modern AI (statistical/probabilistic).",
    wrong: [
      { label: "A", text: "Hand-written rules describe expert systems, not modern AI." },
      { label: "C", text: "Random guessing produces no useful behaviour." },
      { label: "D", text: "Copying answers verbatim is not learning." },
    ],
    concept: "Data-driven ML", tip: "Data + optimization = modern AI.", related: "AI Fundamentals" },
  { n: 4, level: "Medium", q: "Which is NOT a subfield of AI?", correct: "C. Compiler Design",
    why: "Compiler design belongs to programming languages / systems, not AI.",
    wrong: [
      { label: "A", text: "NLP is an AI subfield." },
      { label: "B", text: "Computer vision is an AI subfield." },
      { label: "D", text: "Robotics uses AI for perception and planning." },
    ],
    concept: "AI subfields", tip: "AI subfields focus on perception, learning, and reasoning.", related: "AI Subfields" },
  { n: 5, level: "Medium", q: "Which term best describes today's AI?", correct: "B. Narrow AI",
    why: "All AI in production today is task-specific (Narrow AI).",
    wrong: [
      { label: "A", text: "Super AI is speculative — does not exist." },
      { label: "C", text: "AGI is still an open research goal." },
      { label: "D", text: "Consciousness is not present in current models." },
    ],
    concept: "Types of AI", tip: "Real AI today ≠ sci-fi AI.", related: "Types of AI" },
  { n: 6, level: "Easy", q: "Which learning uses labeled data?", correct: "A. Supervised",
    why: "Supervised learning trains on (input, label) pairs.",
    wrong: [
      { label: "B", text: "Unsupervised has no labels." },
      { label: "C", text: "RL uses rewards, not labels." },
      { label: "D", text: "Self-organizing is a form of unsupervised learning." },
    ],
    concept: "Learning paradigms", tip: "Labels → supervised.", related: "ML Basics" },
  { n: 7, level: "Easy", q: "K-Means is a:", correct: "B. Clustering algorithm",
    why: "K-Means groups points into k clusters using distances to centroids.",
    wrong: [
      { label: "A", text: "It doesn't use labels." },
      { label: "C", text: "It doesn't fit continuous targets." },
      { label: "D", text: "No environment / reward involved." },
    ],
    concept: "Unsupervised", tip: "Pick k with the elbow method or silhouette.", related: "Clustering" },
  { n: 8, level: "Medium", q: "Overfitting means the model:", correct: "C. Memorizes training but fails on new data",
    why: "It captures noise, not signal — poor generalization.",
    wrong: [
      { label: "A", text: "Wrong — it fits training too well." },
      { label: "B", text: "That's underfitting or a bug." },
      { label: "D", text: "Model still uses training data." },
    ],
    concept: "Bias–Variance", tip: "Watch the gap between train and validation loss.", related: "Regularization" },
  { n: 9, level: "Medium", q: "Best metric for imbalanced classes:", correct: "B. F1 score",
    why: "F1 balances precision and recall — accuracy hides skew.",
    wrong: [
      { label: "A", text: "Dominated by majority class." },
      { label: "C", text: "MSE is for regression." },
      { label: "D", text: "MAE is for regression." },
    ],
    concept: "Evaluation metrics", tip: "Add PR-AUC as well for imbalanced problems.", related: "Metrics" },
  { n: 10, level: "Medium", q: "Gradient descent updates weights along:", correct: "B. The opposite of the gradient",
    why: "θ ← θ − α · ∇L(θ). Moving opposite the gradient decreases the loss.",
    wrong: [
      { label: "A", text: "That would increase loss." },
      { label: "C", text: "Random direction wastes signal." },
      { label: "D", text: "There's no explicit 'loss curve direction'." },
    ],
    concept: "Optimization", tip: "α = learning rate; too big → divergence.", related: "Optimization" },
  { n: 11, level: "Hard", q: "L1 regularization is preferred when you want:", correct: "A. Feature sparsity",
    why: "L1 (Lasso) drives some weights exactly to zero.",
    wrong: [
      { label: "B", text: "L1 doesn't inherently speed training." },
      { label: "C", text: "It shrinks weights, not grows them." },
      { label: "D", text: "That is 'no regularization'." },
    ],
    concept: "Regularization", tip: "L1 = sparsity, L2 = shrinkage.", related: "Regularization" },
  { n: 12, level: "Hard", q: "Which is TRUE about cross-validation?", correct: "B. It splits data into k folds and rotates validation",
    why: "k-fold CV rotates the validation fold; test data stays untouched.",
    wrong: [
      { label: "A", text: "Test set is not used for tuning." },
      { label: "C", text: "You still need a held-out test set." },
      { label: "D", text: "CV is domain-agnostic." },
    ],
    concept: "Model selection", tip: "Stratify folds for classification.", related: "Evaluation" },
  { n: 13, level: "Easy", q: "A neural network's basic unit is a:", correct: "A. Neuron",
    why: "A neuron applies weights, adds bias, and passes through an activation.",
    wrong: [
      { label: "B", text: "Kernel = convolutional filter." },
      { label: "C", text: "Cluster = group of points." },
      { label: "D", text: "Decision node = tree component." },
    ],
    concept: "NN basics", tip: "Neurons → layers → networks.", related: "Neural Networks" },
  { n: 14, level: "Easy", q: "Which is NOT a common activation function?", correct: "D. Merge",
    why: "There is no activation named 'Merge'. Common: ReLU, sigmoid, tanh, softmax, GELU.",
    wrong: [
      { label: "A", text: "ReLU is standard." },
      { label: "B", text: "Sigmoid is standard." },
      { label: "C", text: "Softmax is standard for multi-class outputs." },
    ],
    concept: "Activations", tip: "Default to ReLU/GELU in hidden layers.", related: "Activations" },
  { n: 15, level: "Medium", q: "Backpropagation computes:", correct: "B. Gradients via the chain rule",
    why: "Backprop applies the chain rule to compute ∂Loss/∂weights.",
    wrong: [
      { label: "A", text: "That's the forward pass." },
      { label: "C", text: "Learning rate is a hyperparameter." },
      { label: "D", text: "Not related to splits." },
    ],
    concept: "Training", tip: "Backprop = calculus, not magic.", related: "Training" },
  { n: 16, level: "Medium", q: "Vanishing gradient is worst with:", correct: "B. Sigmoid/Tanh in deep nets",
    why: "Saturating activations shrink gradients exponentially with depth.",
    wrong: [
      { label: "A", text: "ReLU alleviates it." },
      { label: "C", text: "BatchNorm helps, not hurts." },
      { label: "D", text: "Skip connections help." },
    ],
    concept: "Deep nets", tip: "Use ReLU, BN, residuals.", related: "Deep Nets" },
  { n: 17, level: "Easy", q: "CNNs are most useful for:", correct: "B. Images and spatial data",
    why: "Convolutions capture local spatial patterns and translation invariance.",
    wrong: [
      { label: "A", text: "1D CNNs exist for time series, but CNNs shine on images." },
      { label: "C", text: "SQL is not CNN territory." },
      { label: "D", text: "Compilers are unrelated." },
    ],
    concept: "CNN", tip: "Filters, strides, pooling — memorize the trio.", related: "CNN" },
  { n: 18, level: "Easy", q: "Transformers rely primarily on:", correct: "C. Self-attention",
    why: "Every token attends to every other token in parallel.",
    wrong: [
      { label: "A", text: "Not core; convolutions are used in vision-transformer hybrids." },
      { label: "B", text: "No recurrence — that's RNNs." },
      { label: "D", text: "Trees are unrelated." },
    ],
    concept: "Transformer", tip: "Attention weights: softmax(QKᵀ/√d) V.", related: "Transformers" },
  { n: 19, level: "Medium", q: "Dropout during training:", correct: "B. Randomly zeros activations",
    why: "Dropout is a regularizer; disabled at inference time.",
    wrong: [
      { label: "A", text: "It doesn't touch data." },
      { label: "C", text: "It doesn't change the LR." },
      { label: "D", text: "Batch size is separate." },
    ],
    concept: "Regularization", tip: "Typical p = 0.1–0.5.", related: "Regularization" },
  { n: 20, level: "Hard", q: "Which is TRUE about batch normalization?", correct: "B. It normalizes activations per mini-batch",
    why: "BN normalizes activations per mini-batch with learnable γ, β.",
    wrong: [
      { label: "A", text: "Tiny batches → unstable BN — use LayerNorm." },
      { label: "C", text: "BN is a layer, not an optimizer." },
      { label: "D", text: "It doesn't remove non-linearities." },
    ],
    concept: "Deep learning", tip: "Enables higher LR & faster training.", related: "Deep Learning" },
  { n: 21, level: "Easy", q: "Object detection outputs:", correct: "B. Bounding boxes + labels",
    why: "Detection = boxes + labels. Segmentation = per-pixel labels.",
    wrong: [
      { label: "A", text: "That's classification only." },
      { label: "C", text: "That's segmentation." },
      { label: "D", text: "No prediction at all." },
    ],
    concept: "Computer vision", tip: "IoU + mAP are the standard detection metrics.", related: "CV Tasks" },
  { n: 22, level: "Medium", q: "IoU is:", correct: "A. Intersection over Union",
    why: "IoU = |A ∩ B| / |A ∪ B|.",
    wrong: [
      { label: "B", text: "Not a real metric name." },
      { label: "C", text: "Not a real term." },
      { label: "D", text: "Not a real term." },
    ],
    concept: "Detection metric", tip: "IoU ≥ 0.5 is a common threshold.", related: "CV Metrics" },
  { n: 23, level: "Easy", q: "Tokenization means:", correct: "B. Breaking text into smaller units",
    why: "Tokens can be words, subwords (BPE), or characters.",
    wrong: [
      { label: "A", text: "Encryption is unrelated." },
      { label: "C", text: "That's TTS." },
      { label: "D", text: "Punctuation removal is preprocessing, not tokenization." },
    ],
    concept: "NLP preprocessing", tip: "Subword tokens handle out-of-vocabulary words.", related: "NLP" },
  { n: 24, level: "Medium", q: "Contextual embeddings differ from Word2Vec because:", correct: "B. They depend on surrounding words",
    why: "BERT/GPT vectors change per context; Word2Vec has one static vector per word.",
    wrong: [
      { label: "A", text: "They are learned, not random." },
      { label: "C", text: "They are language-agnostic in principle." },
      { label: "D", text: "Trees not involved." },
    ],
    concept: "Embeddings", tip: "Same word 'bank' → different vector for 'river bank' vs 'money bank'.", related: "Embeddings" },
  { n: 25, level: "Easy", q: "GPT is trained to:", correct: "B. Predict the next token",
    why: "GPT is an autoregressive language model.",
    wrong: [
      { label: "A", text: "Classification is a fine-tune task, not pretraining." },
      { label: "C", text: "That's vision." },
      { label: "D", text: "Compression is unrelated." },
    ],
    concept: "LLM pretraining", tip: "Next-token prediction is deceptively simple but powerful.", related: "LLMs" },
  { n: 26, level: "Medium", q: "RAG stands for:", correct: "B. Retrieval-Augmented Generation",
    why: "Retrieve relevant docs, then condition LLM output on them.",
    wrong: [
      { label: "A", text: "Not a real term." },
      { label: "C", text: "Not a real term." },
      { label: "D", text: "Not a real term." },
    ],
    concept: "Generative AI", tip: "RAG reduces hallucinations & keeps knowledge fresh.", related: "RAG" },
  { n: 27, level: "Easy", q: "AI in healthcare is commonly used for:", correct: "B. Medical imaging analysis",
    why: "Radiology, pathology, and triage use ML models widely.",
    wrong: [
      { label: "A", text: "Unrelated field." },
      { label: "C", text: "Unrelated field." },
      { label: "D", text: "Nothing to compare with." },
    ],
    concept: "Applied AI", tip: "Human-in-the-loop is standard in healthcare AI.", related: "AI Applications" },
  { n: 28, level: "Medium", q: "In finance, AI is often used for:", correct: "A. Fraud detection",
    why: "Fraud, credit scoring, AML, forecasting, and document intelligence.",
    wrong: [
      { label: "B", text: "Web hosting is unrelated." },
      { label: "C", text: "Not a common finance-AI use." },
      { label: "D", text: "Weather is meteorology." },
    ],
    concept: "Applied AI", tip: "Class imbalance is severe in fraud — pick metrics carefully.", related: "AI Applications" },
  { n: 29, level: "Medium", q: "Best loss for multi-class classification:", correct: "B. Cross-entropy",
    why: "Cross-entropy pairs with softmax outputs.",
    wrong: [
      { label: "A", text: "MSE is for regression." },
      { label: "C", text: "MAE is for regression." },
      { label: "D", text: "Hinge is for margins, not the default." },
    ],
    concept: "Losses", tip: "Categorical CE for multi-class, BCE for binary.", related: "Losses" },
  { n: 30, level: "Medium", q: "PCA is used for:", correct: "B. Dimensionality reduction",
    why: "Projects data along axes of maximum variance.",
    wrong: [
      { label: "A", text: "PCA doesn't predict classes." },
      { label: "C", text: "RL is different." },
      { label: "D", text: "Prompting is unrelated." },
    ],
    concept: "Unsupervised", tip: "Standardize features before PCA.", related: "PCA" },
  { n: 31, level: "Medium", q: "Which optimizer adapts per-parameter learning rates?", correct: "B. Adam",
    why: "Adam uses first- and second-moment estimates of gradients.",
    wrong: [
      { label: "A", text: "SGD alone uses a single LR." },
      { label: "C", text: "Vanilla GD has no adaptivity." },
      { label: "D", text: "There is one." },
    ],
    concept: "Optimization", tip: "AdamW is often preferred for transformers.", related: "Optimizers" },
  { n: 32, level: "Hard", q: "Which is TRUE about the bias-variance trade-off?", correct: "C. Total error ≈ bias² + variance + noise",
    why: "Classic decomposition of expected prediction error.",
    wrong: [
      { label: "A", text: "Simple models have high bias, not high variance." },
      { label: "B", text: "Complex models have high variance, not high bias." },
      { label: "D", text: "The trade-off is real and unavoidable." },
    ],
    concept: "Model selection", tip: "Regularization trades variance for bias.", related: "Bias-Variance" },
  { n: 33, level: "Hard", q: "Best metric when false negatives are dangerous:", correct: "B. Recall",
    why: "Missing positives is costly → maximize recall (at acceptable precision).",
    wrong: [
      { label: "A", text: "Precision ignores missed positives." },
      { label: "C", text: "Specificity is about true negatives." },
      { label: "D", text: "MSE is for regression." },
    ],
    concept: "Metrics", tip: "Tune the decision threshold, not just the metric.", related: "Metrics" },
];

/* True / False key */
const TF: { n: number; q: string; a: boolean; explain: string }[] = [
  { n: 1, q: "All AI today is Narrow AI.", a: true, explain: "General/Super AI does not exist yet." },
  { n: 2, q: "Deep Learning is a subset of Machine Learning.", a: true, explain: "DL ⊂ ML ⊂ AI." },
  { n: 3, q: "Accuracy is always the best metric.", a: false, explain: "For imbalanced classes, use F1/PR-AUC/recall." },
  { n: 4, q: "Transformers use recurrent connections.", a: false, explain: "They use self-attention in parallel." },
  { n: 5, q: "K-Means is supervised.", a: false, explain: "K-Means is unsupervised (no labels)." },
  { n: 6, q: "Dropout is applied during inference.", a: false, explain: "Dropout is training-only." },
  { n: 7, q: "RAG reduces hallucinations.", a: true, explain: "Grounding on retrieved docs improves factuality." },
  { n: 8, q: "LLMs 'understand' text like humans.", a: false, explain: "They model statistical token patterns." },
  { n: 9, q: "Test set is fine for tuning hyperparameters.", a: false, explain: "Test set is for final evaluation only." },
  { n: 10, q: "Batch normalization helps training stability.", a: true, explain: "Stabilizes activations, enables higher LR." },
  { n: 11, q: "RL uses labeled data.", a: false, explain: "RL uses rewards from environment interaction." },
  { n: 12, q: "Backprop uses the chain rule.", a: true, explain: "It composes local gradients through layers." },
  { n: 13, q: "PCA preserves max-variance directions.", a: true, explain: "It picks orthogonal components maximizing variance." },
  { n: 14, q: "A confusion matrix shows only TPs.", a: false, explain: "It shows TP, FP, TN, FN." },
  { n: 15, q: "Gradient descent always finds global minimum.", a: false, explain: "It can stall in local minima / saddles." },
  { n: 16, q: "Attention weights use softmax.", a: true, explain: "softmax(QKᵀ/√d)·V." },
  { n: 17, q: "Fine-tuning trains from scratch.", a: false, explain: "It starts from pretrained weights." },
  { n: 18, q: "Bias in AI is only technical.", a: false, explain: "It's also social/ethical/data-driven." },
  { n: 19, q: "Larger models are always better.", a: false, explain: "Bigger ≠ better; data + cost + latency matter." },
  { n: 20, q: "Data quality often beats model choice.", a: true, explain: "Cleaner data usually beats a fancier model." },
];

/* Short answers */
const SHORT: { n: number; q: string; full: string; keyPoints: string[] }[] = [
  { n: 1, q: "Define AI in one line.", full: "AI = systems that mimic human cognitive functions like learning, reasoning, perception, and decision-making.",
    keyPoints: ["mentions cognition/thinking", "mentions learning/decisions"] },
  { n: 2, q: "What is a neural network (one line)?", full: "A function composed of layers of weighted, non-linear units trained via gradient descent.",
    keyPoints: ["layers/units", "weights/non-linearity", "training/gradient descent"] },
  { n: 3, q: "Define overfitting.", full: "A model that memorizes training data (including noise) and fails to generalize to unseen data.",
    keyPoints: ["memorization", "poor generalization"] },
  { n: 4, q: "What is backpropagation?", full: "The algorithm that computes gradients of the loss w.r.t. each weight using the chain rule.",
    keyPoints: ["chain rule", "gradients of loss"] },
  { n: 5, q: "Define transformer.", full: "A neural architecture based on self-attention that processes sequences in parallel.",
    keyPoints: ["self-attention", "sequence model", "parallel"] },
  { n: 6, q: "What is fine-tuning?", full: "Continuing training of a pretrained model on task-specific data.",
    keyPoints: ["pretrained start", "task-specific data"] },
  { n: 7, q: "What is RAG?", full: "Retrieval-Augmented Generation — retrieve documents and condition an LLM on them.",
    keyPoints: ["retrieval", "generation grounded"] },
  { n: 8, q: "Metric for imbalanced classes.", full: "F1 score (or PR-AUC/recall).",
    keyPoints: ["not accuracy", "F1/PR-AUC/recall"] },
  { n: 9, q: "What is a hyperparameter?", full: "A configuration set before training (e.g., learning rate, batch size).",
    keyPoints: ["set before training", "example"] },
  { n: 10, q: "Define transfer learning.", full: "Reusing a model pretrained on a large dataset for a related task with less data.",
    keyPoints: ["reuse pretrained model", "less data needed"] },
];

/* Scenario solutions */
const SCENARIO: { n: number; q: string; full: string; rubric: string[] }[] = [
  { n: 1, q: "Fraud model has 99% accuracy but misses most frauds.", full: "Classes are imbalanced. Switch to F1/PR-AUC. Use class weights, resampling (SMOTE), threshold tuning, and cost-sensitive learning.",
    rubric: ["Identifies class imbalance", "Correct metric switch", "Names a mitigation", "Mentions threshold tuning"] },
  { n: 2, q: "CV model great in lab, poor in production.", full: "Data drift/domain gap. Retrain on production-like data, add augmentation, monitor drift, and consider domain adaptation.",
    rubric: ["Identifies drift", "Names data solution", "Names monitoring", "Names retraining"] },
  { n: 3, q: "LLM answers confidently but wrongly.", full: "Ground with RAG, add citations, tune temperature, add guardrails, and allow 'I don't know'.",
    rubric: ["Names hallucination", "RAG/grounding", "Uncertainty handling", "Guardrails"] },
  { n: 4, q: "1000 labeled images, Friday deadline.", full: "Transfer learning from a pretrained CNN, strong augmentation, stratified CV, small model, freeze base at first.",
    rubric: ["Transfer learning", "Augmentation", "Validation strategy", "Simplicity/time-boxing"] },
  { n: 5, q: "Live model accuracy dropped.", full: "Check schema, feature/label drift, upstream pipeline, infra, and retrain cadence.",
    rubric: ["Data pipeline", "Drift", "Infra", "Retraining"] },
];

/* Case studies */
const CASE: { n: number; title: string; full: string; rubric: string[] }[] = [
  { n: 1, title: "Retail Recommender", full: "Collect click/view logs and product attributes. Optimize CTR + coverage. Add exploration (ε-greedy or Thompson sampling) and diversity constraints. Cold-start with content-based defaults.",
    rubric: ["Data", "Metric", "Exploration", "Cold-start"] },
  { n: 2, title: "Hospital Triage", full: "Optimize recall for high-risk classes. Use calibrated probabilities, external validation, SHAP explanations, and physician-in-the-loop review.",
    rubric: ["Metric", "Calibration", "Explainability", "Clinical trust"] },
  { n: 3, title: "Language Learning App", full: "Track streaks, response time, error patterns, retention. Aim for ~85% success rate. Use diagnostic assessments to cold-start.",
    rubric: ["Signals", "Difficulty balance", "Cold-start", "Motivation"] },
  { n: 4, title: "Manufacturing Defects", full: "Use CNN (YOLO/segmentation). Oversample rare defects; use focal loss. Deploy quantized model on edge accelerators.",
    rubric: ["Architecture", "Imbalance", "Loss", "Deployment"] },
  { n: 5, title: "Support Chatbot", full: "Use RAG over product docs with citations. Evaluate faithfulness, relevance, and golden question set + human review.",
    rubric: ["Pattern (RAG)", "Grounding", "Evaluation", "Human review"] },
];

/* Practical exercises (logic) */
const PRACTICAL: { n: number; q: string; a: string }[] = [
  { n: 1, q: "High accuracy, low recall — what's happening?", a: "Model favors the majority class; positives are missed." },
  { n: 2, q: "2020 model underperforms in 2026 — why?", a: "Concept/data drift — distribution changed." },
  { n: 3, q: "Loss plateaus after LR cut. Fix?", a: "Warmup + decay schedule; or try a different optimizer." },
  { n: 4, q: "Removing dropout increased train but decreased test accuracy.", a: "Model is overfitting without regularization." },
  { n: 5, q: "Model perfect on train, terrible on test.", a: "Overfitting." },
  { n: 6, q: "Both losses stay high.", a: "Underfitting — model too simple." },
  { n: 7, q: "Signs of data leakage.", a: "Unrealistically high validation scores; drops in production." },
  { n: 8, q: "Which is safer — more data or bigger model?", a: "More high-quality data usually wins for the same effort." },
  { n: 9, q: "LLM cites made-up sources.", a: "Hallucination — mitigate with RAG and citation checks." },
  { n: 10, q: "ROC-AUC of 0.5?", a: "Random-chance classifier." },
];

/* Mini project evaluation */
const PROJECTS: { n: number; title: string; rubric: string[]; excellent: string; goodEnough: string }[] = [
  { n: 1, title: "Iris Classifier",
    rubric: ["Data split (10%)", "Model fit (30%)", "Evaluation (30%)", "Explanation (30%)"],
    excellent: "Stratified split, logistic regression + baseline comparison, confusion matrix, and a written interpretation.",
    goodEnough: "Any split, one model, printed accuracy." },
  { n: 2, title: "MNIST Digit CNN",
    rubric: ["Architecture (25%)", "Training (25%)", "Metrics (25%)", "Discussion (25%)"],
    excellent: "2-conv CNN, batch training, ≥ 98% test accuracy, discussion of misclassifications.",
    goodEnough: "Basic CNN with ≥ 95% accuracy." },
  { n: 3, title: "News Sentiment",
    rubric: ["Preprocessing (20%)", "Baseline (20%)", "Model (30%)", "Comparison (30%)"],
    excellent: "TF-IDF baseline vs fine-tuned transformer with F1 comparison and error analysis.",
    goodEnough: "TF-IDF baseline with accuracy reported." },
  { n: 4, title: "Personal RAG",
    rubric: ["Chunking (25%)", "Embeddings (25%)", "Retriever (25%)", "Answer quality (25%)"],
    excellent: "Meaningful chunking, cited retrieval, citations shown, guardrails for missing info.",
    goodEnough: "Working retriever + LLM answer without citations." },
  { n: 5, title: "Fraud Baseline",
    rubric: ["Data handling (25%)", "Baseline (25%)", "Advanced model (25%)", "Metrics (25%)"],
    excellent: "Class-weighted logistic + gradient boosting, PR-AUC, threshold analysis.",
    goodEnough: "Any model with F1 reported." },
];

const MISTAKES: { title: string; body: string }[] = [
  { title: "Optimizing accuracy on imbalanced data", body: "Switch to F1, PR-AUC, or recall depending on the cost of errors." },
  { title: "Leaking labels or future info into features", body: "Time-split your data and audit every engineered feature." },
  { title: "Judging generalization on training loss", body: "Track validation and holdout — a large train/val gap = overfitting." },
  { title: "Tuning on the test set", body: "Reserve test set for the final unbiased number only." },
  { title: "Trusting LLM outputs blindly", body: "Ground with RAG, cite sources, and let the model refuse when unsure." },
  { title: "Choosing metrics without asking the business", body: "The right metric depends on the cost of FP vs FN." },
];

const FAQ: { q: string; a: string }[] = [
  { q: "How should I use this answer key?", a: "Attempt the Practice Questions first, then check the key. Read explanations — not just answers." },
  { q: "What if my answer is different but equivalent?", a: "For short/scenario answers, use the rubric — matching key points earns marks even with different wording." },
  { q: "Do I need to score 100%?", a: "No. Aim for 80% on first attempt; revisit weak topics in the Revision Notes." },
  { q: "Where should I revise weak topics?", a: "Use the Quick Revision Notes and PDF Notes resources linked below." },
];

/* -------------------- Component -------------------- */

function useToggleStore(key: string, id: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      setOn(arr.includes(id));
    } catch { /* empty */ }
  }, [key, id]);
  const toggle = () => {
    try {
      const raw = window.localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as string[]) : [];
      const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      window.localStorage.setItem(key, JSON.stringify(next));
      setOn(next.includes(id));
    } catch { /* empty */ }
  };
  return [on, toggle] as const;
}

type Tracker = {
  mcqCorrect: number;
  tfCorrect: number;
  shortCorrect: number;
  scenarioCorrect: number;
};

function useTracker() {
  const [t, setT] = useState<Tracker>({ mcqCorrect: 0, tfCorrect: 0, shortCorrect: 0, scenarioCorrect: 0 });
  const loaded = useRef(false);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(TRACKER_KEY);
      if (raw) setT(JSON.parse(raw));
    } catch { /* empty */ }
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(TRACKER_KEY, JSON.stringify(t));
    } catch { /* empty */ }
  }, [t]);
  return [t, setT] as const;
}

function AIAnswerKeyPage() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);
  const [tracker, setTracker] = useTracker();

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
      let current = TOC[0].id;
      for (const it of TOC) {
        const node = document.getElementById(it.id);
        if (node && node.getBoundingClientRect().top < 120) current = it.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpTo = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    const y = node.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const share = async () => {
    const data = {
      title: RESOURCE.title,
      text: "AI Answer Key on EduNova AI",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        toast.success("Link copied");
      }
    } catch { /* empty */ }
  };
  const download = () => {
    toast.info("Preparing print-ready PDF…");
    setTimeout(() => window.print(), 300);
  };
  const print = () => window.print();

  const totals = useMemo(() => ({
    mcq: MCQ.length,
    tf: TF.length,
    short: SHORT.length,
    scenario: SCENARIO.length,
  }), []);

  const overallPct = useMemo(() => {
    const totalCorrect = tracker.mcqCorrect + tracker.tfCorrect + tracker.shortCorrect + tracker.scenarioCorrect;
    const totalMax = totals.mcq + totals.tf + totals.short + totals.scenario;
    return totalMax === 0 ? 0 : Math.round((totalCorrect / totalMax) * 100);
  }, [tracker, totals]);

  const performance = useMemo(() => {
    if (overallPct >= 85) return { label: "Excellent", tone: "success" as const, note: "You're ready for interviews and exams. Move on to advanced resources." };
    if (overallPct >= 70) return { label: "Good", tone: "info" as const, note: "Solid foundation. Revisit weakest sections with the Quick Revision Notes." };
    if (overallPct >= 50) return { label: "Developing", tone: "tip" as const, note: "Practice more MCQs and re-read the Beginner Guide." };
    return { label: "Needs review", tone: "warning" as const, note: "Restart with the Beginner Guide, then re-attempt this workbook." };
  }, [overallPct]);

  return (
    <div className="bg-background">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-article { padding: 0 !important; }
          body { background: white !important; }
          details { page-break-inside: avoid; }
        }
      `}</style>

      <div className="no-print fixed left-0 right-0 top-0 z-50 h-1 bg-transparent" aria-hidden>
        <div className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{RESOURCE.title}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">{progress}% read · Overall {overallPct}%</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" className="shrink-0" onClick={() => jumpTo("s1")}>
              <BookOpen className="mr-1.5 h-4 w-4" /> Read Online
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={download}>
              <Download className="mr-1.5 h-4 w-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleBookmark} aria-pressed={bookmarked}>
              {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={toggleSaved} aria-pressed={saved}>
              <Heart className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={share}>
              <Share2 className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Share</span>
            </Button>
            <Button size="sm" variant="outline" className="shrink-0" onClick={print}>
              <Printer className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Print</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Cover */}
      <header className="relative overflow-hidden border-b border-border/60">
        <img src={IMG.hero} alt="Answer key cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-emerald-700/70 to-teal-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">Rubric-based · Worked Solutions</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            Fully worked solutions, rubric-based marking, and concept feedback for the AI Practice
            Questions workbook — designed to help you learn from every attempt.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {RESOURCE.readingTime}</span>
            <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4" /> {RESOURCE.pages} pages</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" /> Updated {RESOURCE.lastUpdated}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {RESOURCE.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur">
                <Tag className="h-3 w-3" /> {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="no-print space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <ListChecks className="h-4 w-4 text-primary" /> Sections
              </p>
              <ol className="mt-3 max-h-[50vh] space-y-0.5 overflow-y-auto pr-1 text-sm">
                {TOC.map((item, i) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(item.id)}
                      className={`group flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left transition ${
                        activeId === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0 text-[10px] font-mono opacity-70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="line-clamp-2">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Score calculator */}
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Trophy className="h-4 w-4" /> Score calculator
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Enter how many you got right — we'll compute your overall performance.
              </p>
              <ScoreInput label="MCQs" total={totals.mcq} value={tracker.mcqCorrect} onChange={(v) => setTracker({ ...tracker, mcqCorrect: v })} />
              <ScoreInput label="True/False" total={totals.tf} value={tracker.tfCorrect} onChange={(v) => setTracker({ ...tracker, tfCorrect: v })} />
              <ScoreInput label="Short answers" total={totals.short} value={tracker.shortCorrect} onChange={(v) => setTracker({ ...tracker, shortCorrect: v })} />
              <ScoreInput label="Scenarios" total={totals.scenario} value={tracker.scenarioCorrect} onChange={(v) => setTracker({ ...tracker, scenarioCorrect: v })} />
              <div className="mt-3 rounded-xl bg-secondary/70 p-3 text-xs">
                <p className="font-semibold">Overall</p>
                <p className="mt-1 text-2xl font-bold text-primary">{overallPct}%</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
                  <div className="h-full bg-primary transition-[width]" style={{ width: `${overallPct}%` }} />
                </div>
                <p className="mt-2 text-muted-foreground">{performance.label} — {performance.note}</p>
              </div>
            </div>
          </aside>

          {/* Article */}
          <article ref={articleRef} className="print-article mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base">
            <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Verify answers with confidence.</li>
                <li>Understand the reasoning behind every solution.</li>
                <li>Learn from mistakes through detailed explanations.</li>
                <li>Understand examiner expectations and marking criteria.</li>
                <li>Prepare for exams, interviews, and technical assessments.</li>
              </ul>
            </Callout>

            <Section id="s1" n={1} title="Introduction to the Answer Key">
              <Figure src={IMG.workflow} caption="This answer key is your reasoning partner — not just a list of correct letters." />
              <p>
                This resource complements the <em>AI — Practice Questions</em> workbook. Every answer is
                paired with a full explanation, common wrong-answer traps, the underlying concept, and
                a marking rubric where applicable. Use it to learn from mistakes, not to shortcut
                practice.
              </p>
            </Section>

            <Section id="s2" n={2} title="How to Use This Resource">
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                <li>Attempt the Practice Questions first without peeking.</li>
                <li>Grade your MCQ/TF answers against the key.</li>
                <li>For short/scenario answers, compare against the rubric.</li>
                <li>Enter your scores in the side panel to see your overall performance.</li>
                <li>Revisit weak sections using the recommended resources at the end.</li>
              </ol>
            </Section>

            <Section id="s3" n={3} title="Multiple Choice Answer Key">
              <Figure src={IMG.eval} caption="Every MCQ includes the correct answer, why it's right, and why every other option is wrong." />
              <div className="space-y-3">
                {MCQ.map((m) => <MCQCard key={m.n} item={m} />)}
              </div>
            </Section>

            <Section id="s4" n={4} title="True or False Answer Key">
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <table className="min-w-full text-sm">
                  <thead className="bg-secondary/60">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">#</th>
                      <th className="px-3 py-2 text-left font-semibold">Statement</th>
                      <th className="px-3 py-2 text-left font-semibold">Answer</th>
                      <th className="px-3 py-2 text-left font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TF.map((t, i) => (
                      <tr key={t.n} className={i % 2 ? "bg-secondary/20" : ""}>
                        <td className="px-3 py-2 align-top font-mono text-xs text-muted-foreground">{t.n}</td>
                        <td className="px-3 py-2 align-top">{t.q}</td>
                        <td className="px-3 py-2 align-top">
                          <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${t.a ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-red-500/15 text-red-700 dark:text-red-300"}`}>
                            {t.a ? "True" : "False"}
                          </span>
                        </td>
                        <td className="px-3 py-2 align-top text-muted-foreground">{t.explain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="s5" n={5} title="Short Answer Solutions">
              <p className="text-sm text-muted-foreground">
                For each prompt, the <em>Full-marks answer</em> is the model response. The <em>Key points</em> list what
                is needed to score marks even if wording differs.
              </p>
              <div className="mt-3 space-y-3">
                {SHORT.map((s) => (
                  <div key={s.n} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <p className="text-xs font-mono text-muted-foreground">Q{s.n}</p>
                    <p className="mt-0.5 text-sm font-semibold">{s.q}</p>
                    <p className="mt-2 text-sm"><span className="font-semibold text-emerald-600 dark:text-emerald-400">Full-marks answer:</span> {s.full}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Key points:</span> {s.keyPoints.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="s6" n={6} title="Scenario-Based Solutions">
              <p className="text-sm text-muted-foreground">
                Scenario answers are graded on reasoning quality, not exact wording.
              </p>
              <div className="mt-3 space-y-3">
                {SCENARIO.map((s) => (
                  <div key={s.n} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <p className="text-xs font-mono text-muted-foreground">Scenario {s.n}</p>
                    <p className="mt-0.5 text-sm font-semibold">{s.q}</p>
                    <p className="mt-2 text-sm"><span className="font-semibold text-emerald-600 dark:text-emerald-400">Model answer:</span> {s.full}</p>
                    <div className="mt-2 rounded-lg bg-secondary/50 p-2 text-xs">
                      <p className="font-semibold">Marking rubric</p>
                      <ul className="mt-1 list-disc space-y-0.5 pl-5">
                        {s.rubric.map((r) => <li key={r}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="s7" n={7} title="Case Study Solutions">
              <div className="space-y-3">
                {CASE.map((c) => (
                  <div key={c.n} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <p className="text-xs font-mono text-muted-foreground">Case {c.n}</p>
                    <p className="mt-0.5 text-sm font-semibold">{c.title}</p>
                    <p className="mt-2 text-sm"><span className="font-semibold text-emerald-600 dark:text-emerald-400">Model solution:</span> {c.full}</p>
                    <div className="mt-2 rounded-lg bg-secondary/50 p-2 text-xs">
                      <p className="font-semibold">Rubric</p>
                      <ul className="mt-1 list-disc space-y-0.5 pl-5">
                        {c.rubric.map((r) => <li key={r}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="s8" n={8} title="Practical Exercise Solutions">
              <Figure src={IMG.nn} caption="Solution workflow: interpret → diagnose → recommend action." />
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <table className="min-w-full text-sm">
                  <thead className="bg-secondary/60">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">#</th>
                      <th className="px-3 py-2 text-left font-semibold">Question</th>
                      <th className="px-3 py-2 text-left font-semibold">Solution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRACTICAL.map((p, i) => (
                      <tr key={p.n} className={i % 2 ? "bg-secondary/20" : ""}>
                        <td className="px-3 py-2 align-top font-mono text-xs text-muted-foreground">{p.n}</td>
                        <td className="px-3 py-2 align-top">{p.q}</td>
                        <td className="px-3 py-2 align-top text-muted-foreground">{p.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section id="s9" n={9} title="Mini Project Evaluation">
              <p className="text-sm text-muted-foreground">
                Grade each project against its rubric. Report your total against the <em>Excellent</em> band.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {PROJECTS.map((p) => (
                  <div key={p.n} className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                    <p className="text-xs font-mono text-muted-foreground">Project {p.n}</p>
                    <p className="mt-0.5 text-base font-semibold">{p.title}</p>
                    <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-muted-foreground">
                      {p.rubric.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                    <p className="mt-2 text-xs"><span className="font-semibold text-emerald-600 dark:text-emerald-400">Excellent:</span> {p.excellent}</p>
                    <p className="mt-1 text-xs"><span className="font-semibold">Passing:</span> {p.goodEnough}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="s10" n={10} title="Rubric-Based Marking Guide">
              <Figure src={IMG.rubric} caption="Rubric weights: understanding drives most of the mark." />
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <table className="min-w-full text-sm">
                  <thead className="bg-secondary/60">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold">Criterion</th>
                      <th className="px-3 py-2 text-left font-semibold">Weight</th>
                      <th className="px-3 py-2 text-left font-semibold">Full marks (excellent)</th>
                      <th className="px-3 py-2 text-left font-semibold">Common errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { c: "Understanding of Concept", w: "40%", full: "Explains the concept accurately and with correct terminology.", err: "Buzzwords without meaning; confuses AI/ML/DL." },
                      { c: "Accuracy", w: "25%", full: "All factual details correct.", err: "Wrong formula, wrong metric, wrong direction." },
                      { c: "Explanation Quality", w: "20%", full: "Clear, logical, with an example.", err: "Vague, hand-wavy, no example." },
                      { c: "Practical Application", w: "15%", full: "Ties the concept to a real-world use case.", err: "No application shown." },
                    ].map((r, i) => (
                      <tr key={r.c} className={i % 2 ? "bg-secondary/20" : ""}>
                        <td className="px-3 py-2 align-top font-semibold">{r.c}</td>
                        <td className="px-3 py-2 align-top">{r.w}</td>
                        <td className="px-3 py-2 align-top text-muted-foreground">{r.full}</td>
                        <td className="px-3 py-2 align-top text-muted-foreground">{r.err}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Partial credit:</span> Award proportionally per criterion. If a student
                nails concept + accuracy but skips application, mark ≈ 65%.
              </p>
            </Section>

            <Section id="s11" n={11} title="Common Mistakes">
              <Figure src={IMG.mistake} caption="Most mistakes cluster around the same 6 themes — audit yourself." />
              <div className="space-y-2">
                {MISTAKES.map((m) => (
                  <div key={m.title} className="rounded-xl border-l-4 border-amber-500/60 bg-amber-500/10 p-3 text-sm">
                    <p className="font-semibold text-amber-900 dark:text-amber-100">{m.title}</p>
                    <p className="mt-1 text-amber-900/90 dark:text-amber-100/90">{m.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="s12" n={12} title="Frequently Asked Questions">
              <div className="space-y-2">
                {FAQ.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                      <span>{f.q}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>

            <Section id="s13" n={13} title="Final Review">
              <Figure src={IMG.dashboard} caption="Performance analysis: identify your strongest and weakest sections." />
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Trophy className="h-4 w-4 text-primary" /> Performance summary
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <StatTile label="MCQ score" value={`${tracker.mcqCorrect}/${totals.mcq}`} sub={pctLabel(tracker.mcqCorrect, totals.mcq)} />
                  <StatTile label="True/False" value={`${tracker.tfCorrect}/${totals.tf}`} sub={pctLabel(tracker.tfCorrect, totals.tf)} />
                  <StatTile label="Overall" value={`${overallPct}%`} sub={performance.label} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-background/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Strengths</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tracker.mcqCorrect / Math.max(totals.mcq, 1) > 0.7 ? "Core concepts and MCQ recall." : "You show good reasoning on scenarios."}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Weak areas</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tracker.tfCorrect / Math.max(totals.tf, 1) < 0.6 ? "Terminology precision — revisit the Cheat Sheet." : "Application to scenarios — try more case studies."}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Recommended revision:</span> Quick Revision Notes → Interview Questions → re-attempt the Practice Questions.
                </p>
              </div>

              <h3 className="mt-8 text-lg font-semibold">Final revision checklist</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li>I understand AI ⊃ ML ⊃ DL.</li>
                <li>I can explain overfitting and its remedies.</li>
                <li>I know which metric to use per problem type.</li>
                <li>I can walk through the AI lifecycle end-to-end.</li>
                <li>I know how RAG reduces hallucinations.</li>
                <li>I can grade a mini project using a rubric.</li>
              </ul>
            </Section>

            {/* References */}
            <div className="mt-12 rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-lg font-semibold">References</h3>
              <p className="mt-1 text-sm text-muted-foreground">Trusted and official educational sources.</p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Official Documentation</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://platform.openai.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">OpenAI Documentation</a></li>
                <li><a href="https://ai.google" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI</a></li>
                <li><a href="https://www.tensorflow.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">TensorFlow Documentation</a></li>
                <li><a href="https://pytorch.org/docs/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PyTorch Documentation</a></li>
                <li><a href="https://learn.microsoft.com/training/browse/?products=ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">Microsoft Learn — AI</a></li>
                <li><a href="https://www.ibm.com/topics/artificial-intelligence" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM Artificial Intelligence</a></li>
                <li><a href="https://developer.nvidia.com/ai" target="_blank" rel="noreferrer" className="text-primary hover:underline">NVIDIA AI Developer</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Academic Resources</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://ocw.mit.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">MIT OpenCourseWare</a></li>
                <li><a href="https://ai.stanford.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Stanford AI Laboratory</a></li>
                <li><a href="https://www.cs.cmu.edu/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Carnegie Mellon School of Computer Science</a></li>
                <li><a href="https://www.deeplearning.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">DeepLearning.AI</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Research & Standards</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://arxiv.org/list/cs.AI/recent" target="_blank" rel="noreferrer" className="text-primary hover:underline">arXiv — Computer Science (AI)</a></li>
                <li><a href="https://aaai.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">AAAI</a></li>
                <li><a href="https://dl.acm.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">ACM Digital Library</a></li>
                <li><a href="https://ieeexplore.ieee.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IEEE Xplore Digital Library</a></li>
              </ul>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Additional Learning</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="https://www.kaggle.com/learn" target="_blank" rel="noreferrer" className="text-primary hover:underline">Kaggle Learn</a></li>
                <li><a href="https://huggingface.co/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">Hugging Face Documentation</a></li>
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-secondary/40 p-6 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Disclaimer</p>
              <p className="mt-2">
                This educational resource has been created for learning, revision, and self-assessment
                purposes only. The worked solutions, answer keys, scoring rubrics, and explanations are
                based on publicly available educational materials, official documentation, academic
                publications, research papers, and trusted industry resources. They are intended to
                help learners understand Artificial Intelligence concepts and evaluate their progress.
                They should not be considered official examination marking schemes or certification
                answer keys.
              </p>
              <p className="mt-2">
                All trademarks, logos, product names, company names, and intellectual property belong
                to their respective owners. EduNova AI does not claim ownership of any third-party
                materials referenced in this resource. Learners are encouraged to consult the
                official documentation and reference sources listed above for the latest, most
                accurate, and comprehensive information.
              </p>
            </div>
          </article>
        </div>

        {/* Related */}
        <div className="no-print mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Continue learning</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Related resources</h2>
            </div>
            <Link to="/resources" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
              Browse library →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Artificial Intelligence — Practice Questions", tag: "AI & Data", time: "29 min", to: "/resources/read/ai-practice-questions" as const },
              { title: "Artificial Intelligence — Beginner Guide", tag: "AI & Data", time: "11 min", to: "/resources/read/ai-beginner-guide" as const },
              { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "70 min", to: "/resources/read/ai-complete-tutorial" as const },
              { title: "Artificial Intelligence — Step-by-Step Learning Guide", tag: "AI & Data", time: "26 min", to: "/resources/read/ai-step-by-step-learning-guide" as const },
              { title: "Artificial Intelligence — PDF Notes", tag: "AI & Data", time: "88 min", to: "/resources/read/ai-pdf-notes" as const },
              { title: "Artificial Intelligence — Quick Revision Notes", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-quick-revision-notes" as const },
              { title: "Artificial Intelligence — Cheat Sheet", tag: "AI & Data", time: "3 min", to: "/resources/read/ai-cheat-sheet" as const },
              { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" as const },
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
            ].map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold">{r.title}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary" className="text-[10px]">{r.tag}</Badge>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {r.time}</span>
                </div>
                {r.to ? (
                  <Link to={r.to} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                    Open resource <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : (
                  <Link to="/resources" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                    Open resource <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function pctLabel(v: number, total: number) {
  if (total === 0) return "";
  return `${Math.round((v / total) * 100)}%`;
}

/* ---------- Sub-components ---------- */

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 pt-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Section {n}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-foreground/90">{children}</div>
    </section>
  );
}

function Figure({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-4 overflow-hidden rounded-2xl border border-border/60 bg-secondary/40">
      <img src={src} alt={caption} className="h-auto w-full object-cover" loading="lazy" />
      <figcaption className="border-t border-border/60 bg-background/60 px-4 py-2 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function DifficultyChip({ level }: { level: Level }) {
  const map = {
    Easy: { c: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300", dot: "🟢" },
    Medium: { c: "bg-amber-500/15 text-amber-700 dark:text-amber-300", dot: "🟡" },
    Hard: { c: "bg-red-500/15 text-red-700 dark:text-red-300", dot: "🔴" },
  } as const;
  const m = map[level];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${m.c}`}>
      <span aria-hidden>{m.dot}</span> {level}
    </span>
  );
}

function MCQCard({ item }: { item: MCQSolution }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs">Q{item.n}</span>
        <DifficultyChip level={item.level} />
      </div>
      <p className="mt-2 text-sm font-semibold">{item.q}</p>
      <p className="mt-2 rounded-lg border-l-2 border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-900 dark:text-emerald-100">
        <span className="font-semibold">Correct answer:</span> {item.correct}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Why it's correct:</span> {item.why}
      </p>
      <div className="mt-2 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Why other options are wrong:</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5">
          {item.wrong.map((w) => (
            <li key={w.label}><strong>{w.label}:</strong> {w.text}</li>
          ))}
        </ul>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span><span className="font-semibold text-foreground">Concept:</span> {item.concept}</span>
        <span><span className="font-semibold text-foreground">Related:</span> {item.related}</span>
      </div>
      <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
        <span className="font-semibold">Tip:</span> {item.tip}
      </p>
    </div>
  );
}

function ScoreInput({
  label,
  total,
  value,
  onChange,
}: {
  label: string;
  total: number;
  value: number;
  onChange: (v: number) => void;
}) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground">{value}/{total} · {pct}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={total}
        value={Math.min(value, total)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-primary"
        aria-label={`${label} correct out of ${total}`}
      />
    </div>
  );
}

function StatTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/60 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function Callout({
  tone,
  title,
  icon,
  children,
}: {
  tone: "tip" | "info" | "note" | "warning" | "success";
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    tip: "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-100",
    info: "border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100",
    note: "border-violet-500/40 bg-violet-500/10 text-violet-900 dark:text-violet-100",
    warning: "border-red-500/40 bg-red-500/10 text-red-900 dark:text-red-100",
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
  };
  const defaultIcon: Record<string, React.ReactNode> = {
    tip: <Lightbulb className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    note: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
  };
  return (
    <div className={`my-4 rounded-2xl border-l-4 ${styles[tone]} p-4`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon ?? defaultIcon[tone]}</div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <div className="mt-1 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

// avoid unused-import warnings
void Target;
