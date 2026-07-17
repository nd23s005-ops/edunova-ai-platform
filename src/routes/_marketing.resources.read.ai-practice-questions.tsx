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
  Clock,
  Download,
  FileText,
  Heart,
  Info,
  Lightbulb,
  Printer,
  Share2,
  Sparkles,
  Tag,
  ListChecks,
  AlertTriangle,
  Target,
  Trophy,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/resources/read/ai-practice-questions")({
  head: () => {
    const title = "Artificial Intelligence — Practice Questions | EduNova AI";
    const desc =
      "Chapter-wise AI practice: 130+ MCQs, T/F, short answers, scenarios, case studies, and logic questions with detailed worked solutions and progress tracking.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        {
          property: "og:image",
          content: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80",
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AIPracticePage,
});

const RESOURCE = {
  id: "ai-practice-questions",
  title: "Artificial Intelligence — Practice Questions",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "29 min",
  pages: 38,
  lastUpdated: "September 2026",
  tags: [
    "AI Fundamentals",
    "Machine Learning",
    "Neural Networks",
    "Deep Learning",
    "Practice",
  ],
};

const IMG = {
  hero: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1800&q=80",
  compare: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
  ml: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80",
  nn: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1400&q=80",
  dl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80",
  cv: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1400&q=80",
  nlp: "https://images.unsplash.com/photo-1546146830-2cca9512c68e?w=1400&q=80",
  gen: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=80",
  apps: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80",
  scenario: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80",
  case: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80",
};

type TocItem = { id: string; label: string };
const TOC: TocItem[] = [
  { id: "s1", label: "AI Fundamentals" },
  { id: "s2", label: "AI Concepts Practice" },
  { id: "s3", label: "Machine Learning" },
  { id: "s4", label: "Neural Networks" },
  { id: "s5", label: "Deep Learning" },
  { id: "s6", label: "Computer Vision" },
  { id: "s7", label: "Natural Language Processing" },
  { id: "s8", label: "Generative AI" },
  { id: "s9", label: "Real-world Applications" },
  { id: "s10", label: "Mixed Practice Test" },
  { id: "s11", label: "Scenario-Based" },
  { id: "s12", label: "Mini Case Studies" },
  { id: "s13", label: "Worked Solutions" },
  { id: "s14", label: "Self Assessment" },
  { id: "s15", label: "Final Revision" },
];

const BOOKMARK_KEY = "edunova.reading.bookmarks";
const SAVED_KEY = "edunova.reading.saved";
const PRACTICE_KEY = "edunova.practice.ai-practice-questions";

type Difficulty = "Easy" | "Medium" | "Hard";
type MCQItem = {
  id: string;
  level: Difficulty;
  q: string;
  options: string[];
  answer: number; // index
  explanation: string;
  incorrect?: Record<number, string>;
  tip?: string;
  related?: string;
};

/* ---------------- Question bank ---------------- */

const S1_MCQ: MCQItem[] = [
  { id: "s1-1", level: "Easy", q: "What does AI stand for?", options: ["Automated Interface", "Artificial Intelligence", "Advanced Internet", "Artificial Insight"], answer: 1, explanation: "AI stands for Artificial Intelligence — building systems that mimic cognitive functions.", tip: "AI ≠ automation.", related: "AI Fundamentals" },
  { id: "s1-2", level: "Easy", q: "Which is the broadest field?", options: ["Deep Learning", "Machine Learning", "Artificial Intelligence", "Neural Networks"], answer: 2, explanation: "AI is the broadest field. ML is a subset of AI. DL is a subset of ML.", incorrect: { 0: "DL is the narrowest of the four.", 1: "ML is a subset of AI.", 3: "Neural networks are a technique inside ML/DL." }, related: "AI vs ML vs DL" },
  { id: "s1-3", level: "Easy", q: "Modern AI mostly learns by:", options: ["Following hand-written rules", "Learning patterns from data", "Random guessing", "Copying human answers verbatim"], answer: 1, explanation: "Modern AI is data-driven — it learns statistical patterns from examples.", related: "AI Fundamentals" },
  { id: "s1-4", level: "Medium", q: "Which of these is NOT a subfield of AI?", options: ["Natural Language Processing", "Computer Vision", "Compiler Design", "Robotics"], answer: 2, explanation: "Compiler design is a systems / programming-languages topic, not an AI subfield.", tip: "AI subfields deal with perception, learning, reasoning.", related: "AI Subfields" },
  { id: "s1-5", level: "Medium", q: "Which term best describes today's AI?", options: ["Super AI", "Narrow AI", "General AI", "Conscious AI"], answer: 1, explanation: "All AI in production today is Narrow AI — task-specific.", incorrect: { 0: "Super AI is speculative.", 2: "General AI (AGI) does not exist yet." }, related: "Types of AI" },
];

const S3_MCQ: MCQItem[] = [
  { id: "s3-1", level: "Easy", q: "Which learning uses labeled data?", options: ["Supervised", "Unsupervised", "Reinforcement", "Self-organizing"], answer: 0, explanation: "Supervised learning trains on (input, label) pairs.", related: "ML Basics" },
  { id: "s3-2", level: "Easy", q: "K-Means is a:", options: ["Classification algorithm", "Clustering algorithm", "Regression algorithm", "Reinforcement algorithm"], answer: 1, explanation: "K-Means groups points into k clusters based on distance.", related: "Unsupervised Learning" },
  { id: "s3-3", level: "Medium", q: "Overfitting means the model:", options: ["Fails on training data", "Fails on training and test", "Memorizes training but fails on new data", "Ignores training data"], answer: 2, explanation: "Overfit models memorize noise and don't generalize. Fix with regularization, more data, dropout.", tip: "Look at the gap between train and validation loss.", related: "Bias-Variance" },
  { id: "s3-4", level: "Medium", q: "Best metric for imbalanced classes:", options: ["Accuracy", "F1 score", "MSE", "MAE"], answer: 1, explanation: "F1 balances precision and recall; accuracy is misleading with skewed classes.", incorrect: { 0: "Accuracy is dominated by the majority class.", 2: "MSE is for regression.", 3: "MAE is for regression." }, related: "Metrics" },
  { id: "s3-5", level: "Medium", q: "Gradient Descent updates weights along:", options: ["The gradient direction", "The opposite of the gradient", "A random direction", "The loss curve"], answer: 1, explanation: "θ ← θ − α · ∇L(θ). We move opposite the gradient to reduce loss.", related: "Optimization" },
  { id: "s3-6", level: "Hard", q: "L1 regularization is preferred when you want:", options: ["Feature sparsity", "Faster training", "Larger weights", "No regularization"], answer: 0, explanation: "L1 (Lasso) drives some weights to exactly zero → sparse feature selection.", tip: "L1 = sparsity, L2 = shrinkage.", related: "Regularization" },
  { id: "s3-7", level: "Hard", q: "Which is TRUE about cross-validation?", options: ["It uses the test set for tuning", "It splits data into k folds and rotates validation", "It removes the need for a test set", "It only works for images"], answer: 1, explanation: "k-fold CV rotates the validation fold. The test set stays untouched.", related: "Evaluation" },
];

const S4_MCQ: MCQItem[] = [
  { id: "s4-1", level: "Easy", q: "A neural network's basic unit is a:", options: ["Neuron", "Kernel", "Cluster", "Decision node"], answer: 0, explanation: "A neuron applies weights, adds bias, and passes through an activation function.", related: "Neural Networks" },
  { id: "s4-2", level: "Easy", q: "Which is NOT a common activation function?", options: ["ReLU", "Sigmoid", "Softmax", "Merge"], answer: 3, explanation: "There is no activation called 'Merge'. Common ones: ReLU, sigmoid, tanh, softmax, GELU.", related: "Activations" },
  { id: "s4-3", level: "Medium", q: "Backpropagation computes:", options: ["Predictions", "Gradients via the chain rule", "The learning rate", "Data splits"], answer: 1, explanation: "Backprop applies the chain rule to compute gradients of loss w.r.t. weights.", related: "Training" },
  { id: "s4-4", level: "Medium", q: "The vanishing gradient problem is worst with:", options: ["ReLU", "Sigmoid/Tanh in deep nets", "Batch normalization", "Skip connections"], answer: 1, explanation: "Saturating activations cause gradients to shrink exponentially with depth.", tip: "Fixes: ReLU, batch norm, residual connections.", related: "Deep Nets" },
];

const S5_MCQ: MCQItem[] = [
  { id: "s5-1", level: "Easy", q: "CNNs are most useful for:", options: ["Time series only", "Images and spatial data", "SQL databases", "Compilers"], answer: 1, explanation: "Convolutions extract local spatial patterns — ideal for images.", related: "CNN" },
  { id: "s5-2", level: "Easy", q: "Transformers rely primarily on:", options: ["Convolutions", "Recurrence", "Self-attention", "Decision trees"], answer: 2, explanation: "Attention lets each token attend to every other token in parallel.", related: "Transformer" },
  { id: "s5-3", level: "Medium", q: "Dropout during training:", options: ["Removes bad data", "Randomly zeros activations", "Reduces the learning rate", "Increases batch size"], answer: 1, explanation: "Dropout randomly zeros units — a form of regularization. It's disabled at inference.", related: "Regularization" },
  { id: "s5-4", level: "Hard", q: "Which is TRUE about batch normalization?", options: ["It works with tiny batches", "It normalizes activations per mini-batch", "It replaces the optimizer", "It removes non-linearities"], answer: 1, explanation: "BatchNorm normalizes activations per mini-batch, adds learnable scale/shift, stabilizes training.", incorrect: { 0: "BatchNorm suffers with very small batches — use LayerNorm.", 2: "It is a layer, not an optimizer.", 3: "It doesn't replace activations." }, related: "Deep Learning" },
];

const S6_MCQ: MCQItem[] = [
  { id: "s6-1", level: "Easy", q: "Object detection outputs:", options: ["Only class labels", "Bounding boxes + labels", "Pixel-level classes only", "Just an image"], answer: 1, explanation: "Detection = boxes + labels. Segmentation = per-pixel labels.", related: "Computer Vision" },
  { id: "s6-2", level: "Medium", q: "IoU is:", options: ["Intersection over Union", "Input over Output", "Iteration over Update", "Image over Unit"], answer: 0, explanation: "IoU = area of intersection / area of union. Common in detection evaluation.", related: "CV Metrics" },
];

const S7_MCQ: MCQItem[] = [
  { id: "s7-1", level: "Easy", q: "Tokenization means:", options: ["Encrypting text", "Breaking text into smaller units", "Converting text to speech", "Removing punctuation"], answer: 1, explanation: "Tokenization splits text into tokens (words or subwords).", related: "NLP" },
  { id: "s7-2", level: "Medium", q: "Contextual embeddings differ from Word2Vec because:", options: ["They are randomly initialized", "They depend on surrounding words", "They only work for English", "They use decision trees"], answer: 1, explanation: "Contextual embeddings (BERT/GPT) give different vectors for the same word based on context.", related: "Embeddings" },
];

const S8_MCQ: MCQItem[] = [
  { id: "s8-1", level: "Easy", q: "GPT is trained to:", options: ["Classify emails", "Predict the next token", "Segment images", "Compress files"], answer: 1, explanation: "GPT is a causal language model — it predicts the next token from previous tokens.", related: "LLMs" },
  { id: "s8-2", level: "Medium", q: "RAG stands for:", options: ["Random Adaptive Gradient", "Retrieval-Augmented Generation", "Regularized Auto-Grad", "Recurrent Attention Graph"], answer: 1, explanation: "RAG retrieves relevant documents and lets an LLM condition its answer on them.", tip: "RAG improves factuality and freshness.", related: "Generative AI" },
];

const S9_MCQ: MCQItem[] = [
  { id: "s9-1", level: "Easy", q: "AI in healthcare is commonly used for:", options: ["Compiler optimization", "Medical imaging analysis", "Interior design", "Compiler theory"], answer: 1, explanation: "Radiology, pathology, and triage models are widely deployed.", related: "AI Applications" },
  { id: "s9-2", level: "Medium", q: "In finance, AI is often used for:", options: ["Fraud detection", "Web hosting", "Traffic lights", "Weather forecasting only"], answer: 0, explanation: "Fraud, credit scoring, AML, forecasting, and doc intelligence are common finance use cases.", related: "AI Applications" },
];

const S10_MCQ: MCQItem[] = [
  { id: "s10-1", level: "Easy", q: "Which is a supervised task?", options: ["Clustering", "Anomaly detection (unsupervised)", "Spam classification", "PCA"], answer: 2, explanation: "Spam classification uses labeled examples.", related: "ML Basics" },
  { id: "s10-2", level: "Easy", q: "AI ⊃ ML ⊃ DL is:", options: ["True", "False"], answer: 0, explanation: "AI is broadest; ML and DL are nested subsets.", related: "Fundamentals" },
  { id: "s10-3", level: "Medium", q: "Best loss for multi-class classification:", options: ["MSE", "Cross-entropy", "MAE", "Hinge only"], answer: 1, explanation: "Cross-entropy is the default for multi-class softmax outputs.", related: "Losses" },
  { id: "s10-4", level: "Medium", q: "PCA is used for:", options: ["Classification", "Dimensionality reduction", "Reinforcement learning", "Prompting"], answer: 1, explanation: "PCA projects data along directions of maximum variance to reduce dimensions.", related: "Unsupervised" },
  { id: "s10-5", level: "Medium", q: "Which optimizer adapts per-parameter learning rates?", options: ["SGD", "Adam", "Vanilla GD", "None"], answer: 1, explanation: "Adam adapts learning rates using first and second moment estimates.", related: "Optimization" },
  { id: "s10-6", level: "Hard", q: "Which is TRUE about the bias-variance trade-off?", options: ["Simple models have high variance", "Complex models have high bias", "Total error ≈ bias² + variance + noise", "There is no trade-off"], answer: 2, explanation: "Standard decomposition of expected error.", related: "Model Selection" },
  { id: "s10-7", level: "Hard", q: "Which metric is best when false negatives are dangerous (e.g. cancer screening)?", options: ["Precision", "Recall", "Specificity", "MSE"], answer: 1, explanation: "Missing positives (false negatives) is costly → optimize recall.", related: "Metrics" },
];

const ALL_MCQ = [...S1_MCQ, ...S3_MCQ, ...S4_MCQ, ...S5_MCQ, ...S6_MCQ, ...S7_MCQ, ...S8_MCQ, ...S9_MCQ, ...S10_MCQ];

const TF: { id: string; q: string; a: boolean; explain: string }[] = [
  { id: "tf-1", q: "All AI today is Narrow AI.", a: true, explain: "Even the most advanced systems are task-specific." },
  { id: "tf-2", q: "Deep Learning is a subset of Machine Learning.", a: true, explain: "DL ⊂ ML ⊂ AI." },
  { id: "tf-3", q: "Accuracy is always the best metric.", a: false, explain: "For imbalanced classes, F1 / PR-AUC are usually better." },
  { id: "tf-4", q: "Transformers use recurrent connections.", a: false, explain: "They use self-attention and process tokens in parallel." },
  { id: "tf-5", q: "K-Means is a supervised algorithm.", a: false, explain: "K-Means is unsupervised — it groups without labels." },
  { id: "tf-6", q: "Dropout is applied during inference.", a: false, explain: "Dropout is only active during training." },
  { id: "tf-7", q: "RAG can reduce hallucinations in LLMs.", a: true, explain: "Grounding on retrieved documents improves factuality." },
  { id: "tf-8", q: "LLMs 'understand' text the way humans do.", a: false, explain: "They model statistical patterns of tokens, not human meaning." },
  { id: "tf-9", q: "The test set can be used to tune hyperparameters.", a: false, explain: "Test data is only used for final, unbiased evaluation." },
  { id: "tf-10", q: "Batch normalization can help training stability.", a: true, explain: "It stabilizes activations and allows higher learning rates." },
  { id: "tf-11", q: "Reinforcement learning uses labeled data.", a: false, explain: "RL uses rewards from environment interaction, not labels." },
  { id: "tf-12", q: "Backprop computes gradients using the chain rule.", a: true, explain: "It flows the gradient of the loss back through the network." },
  { id: "tf-13", q: "PCA preserves the direction of maximum variance.", a: true, explain: "It finds orthogonal components maximizing variance." },
  { id: "tf-14", q: "A confusion matrix shows only true positives.", a: false, explain: "It also shows FP, FN, TN." },
  { id: "tf-15", q: "Gradient descent always finds the global minimum.", a: false, explain: "It can get stuck in local minima or saddle points." },
  { id: "tf-16", q: "Attention weights are computed with softmax.", a: true, explain: "softmax(QKᵀ/√d) · V." },
  { id: "tf-17", q: "Fine-tuning always requires training from scratch.", a: false, explain: "Fine-tuning starts from pretrained weights." },
  { id: "tf-18", q: "Bias in AI is only a technical issue.", a: false, explain: "It's technical, social, and ethical — data and process matter." },
  { id: "tf-19", q: "Larger models are always better.", a: false, explain: "Bigger isn't automatically better — data, cost, and latency matter." },
  { id: "tf-20", q: "Data quality often matters more than model choice.", a: true, explain: "Better data usually beats a fancier model." },
];

const SHORT: { id: string; q: string; a: string }[] = [
  { id: "sh-1", q: "Define AI in one line.", a: "Systems that mimic human cognitive functions like learning and decision-making." },
  { id: "sh-2", q: "One sentence: what is a neural network?", a: "A function composed of layers of weighted, non-linear units trained via gradient descent." },
  { id: "sh-3", q: "Define overfitting.", a: "When a model memorizes training data and fails to generalize to new data." },
  { id: "sh-4", q: "What is backpropagation in one line?", a: "The algorithm that computes gradients of the loss w.r.t. weights via the chain rule." },
  { id: "sh-5", q: "One-line definition of transformer.", a: "A neural architecture built on self-attention that processes sequences in parallel." },
  { id: "sh-6", q: "What is fine-tuning?", a: "Training a pretrained model further on a task-specific dataset." },
  { id: "sh-7", q: "What is RAG?", a: "Retrieval-Augmented Generation — retrieve documents and condition an LLM's answer on them." },
  { id: "sh-8", q: "Name one classification metric for imbalanced data.", a: "F1 score (or PR-AUC / recall)." },
  { id: "sh-9", q: "What is a hyperparameter?", a: "A configuration value set before training (e.g., learning rate, batch size)." },
  { id: "sh-10", q: "What is transfer learning?", a: "Reusing a model pretrained on a large dataset for a related task with less data." },
  { id: "sh-11", q: "One-line definition of embedding.", a: "A dense vector representation that captures semantic properties of an input." },
  { id: "sh-12", q: "Give one responsible-AI risk.", a: "Bias, privacy leakage, or hallucination." },
  { id: "sh-13", q: "What is the exploration-exploitation trade-off?", a: "Whether an RL agent tries new actions (explore) or uses what it knows (exploit)." },
  { id: "sh-14", q: "Name one CV task besides classification.", a: "Object detection, segmentation, or tracking." },
  { id: "sh-15", q: "What does 'data drift' mean?", a: "When the distribution of live data changes vs training data, hurting model quality." },
  { id: "sh-16", q: "What is a loss function?", a: "A scalar that measures how wrong a model's predictions are on data." },
  { id: "sh-17", q: "Define epoch.", a: "One full pass over the training dataset." },
  { id: "sh-18", q: "Give one Generative AI use case.", a: "Text generation, image generation, code assistance, or audio synthesis." },
  { id: "sh-19", q: "What is class imbalance?", a: "When one class dominates the dataset, biasing naive models toward the majority." },
  { id: "sh-20", q: "One benefit of transfer learning.", a: "Better performance with less data and faster training." },
];

const SCENARIO: { id: string; q: string; a: string }[] = [
  { id: "sc-1", q: "Your fraud model has 99% accuracy but misses most frauds. What's wrong?", a: "Imbalanced data. Accuracy is dominated by the majority. Switch to F1/PR-AUC and use class weights or resampling." },
  { id: "sc-2", q: "A CV model is great in the lab, poor in production. Why?", a: "Data drift, lighting/angle changes, or biased training set. Add production-like data, retrain, monitor for drift." },
  { id: "sc-3", q: "An LLM answers confidently but wrongly. How would you reduce this?", a: "Ground answers with RAG, add source citations, add guardrails, and let the model say 'I don't know'." },
  { id: "sc-4", q: "You have 1,000 labeled images and a Friday deadline.", a: "Use transfer learning from a pretrained CNN + strong augmentation + stratified CV." },
  { id: "sc-5", q: "Your live model's accuracy dropped. What checks?", a: "Data schema, feature drift, concept drift, upstream pipeline, and infra issues." },
  { id: "sc-6", q: "You must deploy a large LLM on limited hardware.", a: "Use a smaller model, quantize (INT8/INT4), distill, prune, or use serverless GPU inference." },
  { id: "sc-7", q: "Users say the recommendation feed feels stale.", a: "Add exploration, freshness signals, diversify results, refresh candidate generation more often." },
  { id: "sc-8", q: "Your model discriminates against a subgroup.", a: "Audit metrics per group, reweight/remove biased features, augment underrepresented data, apply fairness constraints." },
  { id: "sc-9", q: "You need to explain a black-box model to non-technical stakeholders.", a: "Use SHAP/LIME to attribute predictions to features, and translate to plain-language stories with examples." },
  { id: "sc-10", q: "Training is unstable — loss spikes and NaNs appear.", a: "Lower learning rate, clip gradients, check data (labels, scaling), verify no divide-by-zero, and inspect batch norm." },
  { id: "sc-11", q: "A stakeholder wants 100% accuracy. What do you say?", a: "Explain that 100% is unrealistic and often a sign of leakage or overfit; agree on a business-relevant metric." },
  { id: "sc-12", q: "Your dataset is small (500 rows). How do you approach modeling?", a: "Use simple models, strong regularization, cross-validation, feature engineering, and data augmentation where possible." },
  { id: "sc-13", q: "The client's data has PII (personally identifiable information).", a: "Anonymize, remove direct identifiers, apply differential privacy, restrict access, comply with GDPR/HIPAA." },
  { id: "sc-14", q: "You need to compare two models fairly.", a: "Use the same test set, same metric, same seed for splits, statistical tests, and report confidence intervals." },
  { id: "sc-15", q: "Your team wants to add a new feature that leaks the label.", a: "Refuse to use it. Feature leakage inflates offline metrics and destroys production performance." },
];

const CASE: { id: string; title: string; scenario: string; questions: string[]; guidance: string }[] = [
  { id: "cs-1", title: "Retail Recommender", scenario: "An online retailer wants to increase click-through on their homepage.", questions: ["What data would you collect?", "Which metric would you optimize?", "How would you avoid a filter bubble?"], guidance: "Collect click/view logs, session context, and product attributes. Optimize CTR + coverage. Add exploration (e.g., ε-greedy) and diversity constraints to avoid filter bubbles." },
  { id: "cs-2", title: "Hospital Triage", scenario: "A hospital wants to prioritize incoming patients based on urgency using AI.", questions: ["What metric matters most and why?", "How would you handle false negatives?", "How do you gain clinical trust?"], guidance: "Optimize recall for high-risk classes (false negatives are dangerous). Use calibrated probabilities, explainable outputs (SHAP), external validation, and physician-in-the-loop." },
  { id: "cs-3", title: "Language Learning App", scenario: "A language app wants adaptive difficulty per learner.", questions: ["What signals indicate mastery?", "How do you avoid demotivation?", "How do you cold-start new users?"], guidance: "Signals: streaks, response time, error patterns, retention. Balance challenge (~85% success rate). Cold-start with a diagnostic and content-based defaults, then update as data arrives." },
  { id: "cs-4", title: "Manufacturing Defect Detection", scenario: "A factory wants to detect defects on a conveyor belt using cameras.", questions: ["Which architecture?", "How do you deal with rare defects?", "How do you deploy at the edge?"], guidance: "Use a CNN (e.g., YOLO or a segmentation model). For rare defects, oversample and use focal loss. Quantize the model and run on edge GPUs (Jetson) or accelerators." },
  { id: "cs-5", title: "Customer Support Chatbot", scenario: "A SaaS company wants a chatbot that answers product questions.", questions: ["Which pattern would you choose?", "How do you keep the answers grounded?", "How do you evaluate quality?"], guidance: "Use RAG over the product docs. Cite sources. Evaluate with faithfulness, answer relevance, and a golden question set + human review." },
  { id: "cs-6", title: "Fraud in Digital Payments", scenario: "A payment provider wants to detect fraud in real-time.", questions: ["Constraints beyond accuracy?", "Metric?", "How to reduce alert fatigue?"], guidance: "Latency (< 100 ms), fairness, and cost of false positives. Optimize precision at high recall. Rank alerts by expected loss; reduce fatigue with adaptive thresholds and analyst feedback loops." },
  { id: "cs-7", title: "Content Moderation", scenario: "A social network needs to detect harmful content at scale.", questions: ["How do you scale?", "How do you handle cultural context?", "How do you handle appeals?"], guidance: "Combine fast keyword filters, ML classifiers, and human review. Localize models. Provide a transparent appeals process and log decisions for audit." },
  { id: "cs-8", title: "Predictive Maintenance", scenario: "A logistics company wants to predict truck breakdowns.", questions: ["What features?", "What time granularity?", "Metric?"], guidance: "Telemetry (temperature, vibration, mileage), service history, weather. Rolling windows (days). Optimize recall at a fixed precision threshold, and quantify downtime cost." },
  { id: "cs-9", title: "Adaptive Testing", scenario: "An ed-tech platform wants adaptive question difficulty.", questions: ["Which approach?", "How do you estimate ability?", "How do you avoid gaming?"], guidance: "Use Item Response Theory or a bandit approach. Estimate ability continually. Randomize order and rotate question banks to prevent memorization." },
  { id: "cs-10", title: "News Summarization", scenario: "A media company wants AI-generated article summaries.", questions: ["How to prevent hallucinations?", "How to evaluate?", "How to handle bias?"], guidance: "Constrain generation to article text (extractive or grounded abstractive), evaluate with ROUGE + human faithfulness ratings, and audit political/topical bias regularly." },
];

const LOGIC: { id: string; q: string; a: string }[] = [
  { id: "lg-1", q: "If accuracy is high but recall is low, what is likely happening?", a: "The model favors the majority class; positives are being missed." },
  { id: "lg-2", q: "A model trained on 2020 data underperforms in 2026. Most likely cause?", a: "Concept/data drift — the world changed since training." },
  { id: "lg-3", q: "You reduce learning rate by 10× and loss plateaus. Interpretation?", a: "Might be too small — try a schedule (warmup + decay) instead of constant." },
  { id: "lg-4", q: "Removing dropout increased train accuracy but decreased test accuracy. Why?", a: "Model is overfitting without regularization." },
  { id: "lg-5", q: "Your model is perfect on train and horrible on test. What term?", a: "Overfitting." },
  { id: "lg-6", q: "Both train and test loss are high. What term?", a: "Underfitting — model is too simple." },
  { id: "lg-7", q: "Data leakage during preprocessing — how might it appear?", a: "Unrealistically high validation performance that collapses in production." },
  { id: "lg-8", q: "Which change is safer: more data or bigger model?", a: "More (high-quality) data usually wins for the same effort." },
  { id: "lg-9", q: "An LLM cites made-up sources. What's this called?", a: "Hallucination — mitigate with grounding/RAG and citation checks." },
  { id: "lg-10", q: "A classifier's ROC-AUC is 0.5. What does it mean?", a: "The model is no better than random." },
];

const PROJECTS: { id: string; title: string; desc: string; steps: string[] }[] = [
  { id: "p-1", title: "Iris Classifier", desc: "Train a logistic regression on the Iris dataset and beat a random baseline.", steps: ["Load data with scikit-learn", "Split 80/20", "Train logistic regression", "Report accuracy and confusion matrix"] },
  { id: "p-2", title: "MNIST Digit CNN", desc: "Train a small CNN to classify handwritten digits.", steps: ["Load MNIST", "Build a 2-conv CNN", "Train 3 epochs", "Report test accuracy"] },
  { id: "p-3", title: "News Sentiment", desc: "Classify news headlines as positive/negative.", steps: ["Use a public dataset", "Tokenize + TF-IDF baseline", "Fine-tune a small transformer", "Compare F1 scores"] },
  { id: "p-4", title: "Personal RAG", desc: "Build a RAG assistant over your own notes.", steps: ["Chunk documents", "Embed with a small model", "Store in a vector DB (or FAISS)", "Wire an LLM to answer with citations"] },
  { id: "p-5", title: "Fraud Baseline", desc: "Detect fraud on an imbalanced tabular dataset.", steps: ["Load a public fraud dataset", "Try logistic regression + class weights", "Add gradient boosting", "Report PR-AUC and F1"] },
];

/* ---------------- Component ---------------- */

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

type PracticeState = {
  mcq: Record<string, number>; // qid → selected index
  tf: Record<string, boolean>; // qid → user answer
  done: string[]; // completed non-MCQ ids
};

function usePracticeState() {
  const [state, setState] = useState<PracticeState>({ mcq: {}, tf: {}, done: [] });
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PRACTICE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch { /* empty */ }
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(PRACTICE_KEY, JSON.stringify(state));
    } catch { /* empty */ }
  }, [state]);

  const setMCQ = (id: string, idx: number) =>
    setState((s) => ({ ...s, mcq: { ...s.mcq, [id]: idx } }));
  const setTF = (id: string, v: boolean) =>
    setState((s) => ({ ...s, tf: { ...s.tf, [id]: v } }));
  const toggleDone = (id: string) =>
    setState((s) => ({
      ...s,
      done: s.done.includes(id) ? s.done.filter((x) => x !== id) : [...s.done, id],
    }));
  const reset = () => setState({ mcq: {}, tf: {}, done: [] });

  return { state, setMCQ, setTF, toggleDone, reset };
}

function AIPracticePage() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(TOC[0].id);
  const articleRef = useRef<HTMLDivElement>(null);
  const [bookmarked, toggleBookmark] = useToggleStore(BOOKMARK_KEY, RESOURCE.id);
  const [saved, toggleSaved] = useToggleStore(SAVED_KEY, RESOURCE.id);
  const practice = usePracticeState();

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
      let current = TOC[0].id;
      for (const item of TOC) {
        const node = document.getElementById(item.id);
        if (node && node.getBoundingClientRect().top < 120) current = item.id;
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
    const shareData = {
      title: RESOURCE.title,
      text: "AI Practice Questions on EduNova AI",
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard");
      }
    } catch { /* cancelled */ }
  };
  const download = () => {
    toast.info("Preparing print-ready PDF…");
    setTimeout(() => window.print(), 300);
  };
  const print = () => window.print();
  const scrollToArticle = () => jumpTo("s1");

  // Score summary
  const summary = useMemo(() => {
    const mcqTotal = ALL_MCQ.length;
    let mcqAnswered = 0;
    let mcqCorrect = 0;
    for (const item of ALL_MCQ) {
      const sel = practice.state.mcq[item.id];
      if (sel !== undefined) {
        mcqAnswered++;
        if (sel === item.answer) mcqCorrect++;
      }
    }
    const tfTotal = TF.length;
    let tfAnswered = 0;
    let tfCorrect = 0;
    for (const item of TF) {
      const sel = practice.state.tf[item.id];
      if (sel !== undefined) {
        tfAnswered++;
        if (sel === item.a) tfCorrect++;
      }
    }
    const done = practice.state.done.length;
    return { mcqTotal, mcqAnswered, mcqCorrect, tfTotal, tfAnswered, tfCorrect, done };
  }, [practice.state]);

  const readingTitle = useMemo(() => RESOURCE.title, []);

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

      {/* Sticky action bar */}
      <div className="no-print sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-6 sm:py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow">
              <Target className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold sm:text-sm">{readingTitle}</p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                {progress}% read · MCQ {summary.mcqCorrect}/{summary.mcqTotal}
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 overflow-x-auto">
            <Button size="sm" className="shrink-0" onClick={scrollToArticle}>
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
        <img src={IMG.hero} alt="Practice questions cover" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-orange-700/75 to-rose-700/85 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link to="/resources" className="no-print inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/95 backdrop-blur hover:bg-white/25">
            <ChevronRight className="h-3.5 w-3.5 rotate-180" /> Resources Library
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/25 text-white hover:bg-white/30">{RESOURCE.category}</Badge>
            <Badge className="bg-emerald-500/90 text-white hover:bg-emerald-500">{RESOURCE.difficulty}</Badge>
            <Badge className="bg-white/25 text-white hover:bg-white/30">130+ Questions · 15 Sections</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{RESOURCE.title}</h1>
          <p className="mt-4 max-w-2xl text-white/90 sm:text-lg">
            An interactive practice workbook with progressive difficulty, worked solutions, live
            score tracking, scenario questions, mini case studies, and reflection projects.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {RESOURCE.readingTime} read</span>
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
                        activeId === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0 text-[10px] font-mono opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="line-clamp-2">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Live score */}
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Trophy className="h-4 w-4" /> Your practice score
              </p>
              <ScoreBar label="MCQs" answered={summary.mcqAnswered} correct={summary.mcqCorrect} total={summary.mcqTotal} />
              <ScoreBar label="True / False" answered={summary.tfAnswered} correct={summary.tfCorrect} total={summary.tfTotal} />
              <div className="mt-3 rounded-xl bg-secondary/70 p-3 text-xs">
                <p className="font-semibold">Reading progress</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
                  <div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-1.5 text-muted-foreground">{progress}% complete · {summary.done} tasks marked done</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  practice.reset();
                  toast.success("Practice progress reset");
                }}
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/60 bg-card px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset progress
              </button>
            </div>
          </aside>

          {/* Article */}
          <article ref={articleRef} className="print-article mx-auto w-full max-w-3xl text-[15.5px] leading-relaxed sm:text-base">
            <Callout tone="info" title="Learning Objectives" icon={<Lightbulb className="h-5 w-5" />}>
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Strengthen your understanding of AI concepts.</li>
                <li>Apply AI knowledge to solve practical problems.</li>
                <li>Improve analytical and critical thinking skills.</li>
                <li>Prepare for exams and technical interviews.</li>
                <li>Identify strengths and areas that need work.</li>
                <li>Build confidence through continuous practice.</li>
              </ul>
            </Callout>

            <Callout tone="tip" title="How to use this workbook">
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Answer each question <strong>before</strong> revealing the solution.</li>
                <li>MCQ and True/False answers are saved locally and scored live in the sidebar.</li>
                <li>Difficulty legend: <DifficultyChip level="Easy" /> beginner, <DifficultyChip level="Medium" /> intermediate, <DifficultyChip level="Hard" /> advanced.</li>
                <li>Tick <em>Mark as done</em> on scenarios, case studies, and projects to track completion.</li>
              </ul>
            </Callout>

            {/* S1 */}
            <Section id="s1" n={1} title="Artificial Intelligence Fundamentals">
              <ConceptReview items={["AI is systems that mimic cognitive functions.", "AI ⊃ ML ⊃ DL — nested subsets.", "Today's AI is Narrow AI (task-specific)."]} />
              <MCQList items={S1_MCQ} practice={practice} />
            </Section>

            {/* S2 */}
            <Section id="s2" n={2} title="AI Concepts Practice">
              <Figure src={IMG.compare} caption="AI ⊃ ML ⊃ DL — remember the nested subsets." />
              <p className="text-sm text-muted-foreground">
                Short-answer questions to warm up your terminology. Try answering out loud in one line
                before revealing the model answer.
              </p>
              <ShortList items={SHORT.slice(0, 10)} practice={practice} />
            </Section>

            {/* S3 */}
            <Section id="s3" n={3} title="Machine Learning Questions">
              <Figure src={IMG.ml} caption="ML workflow: collect → clean → train → evaluate → deploy → monitor." />
              <ConceptReview items={["Supervised = labels; Unsupervised = no labels; RL = rewards.", "Overfitting is memorization; fix with regularization.", "Choose metrics that match the business problem."]} />
              <MCQList items={S3_MCQ} practice={practice} />
            </Section>

            {/* S4 */}
            <Section id="s4" n={4} title="Neural Network Questions">
              <Figure src={IMG.nn} caption="Input → hidden layers → output; edges carry learnable weights." />
              <MCQList items={S4_MCQ} practice={practice} />
            </Section>

            {/* S5 */}
            <Section id="s5" n={5} title="Deep Learning Questions">
              <Figure src={IMG.dl} caption="Deep networks learn hierarchical representations automatically." />
              <MCQList items={S5_MCQ} practice={practice} />
            </Section>

            {/* S6 */}
            <Section id="s6" n={6} title="Computer Vision Questions">
              <Figure src={IMG.cv} caption="CV pipeline: acquire → preprocess → detect/segment → classify → act." />
              <MCQList items={S6_MCQ} practice={practice} />
            </Section>

            {/* S7 */}
            <Section id="s7" n={7} title="Natural Language Processing Questions">
              <Figure src={IMG.nlp} caption="NLP pipeline: tokenize → embed → model → decode." />
              <MCQList items={S7_MCQ} practice={practice} />
            </Section>

            {/* S8 */}
            <Section id="s8" n={8} title="Generative AI Questions">
              <Figure src={IMG.gen} caption="Generative AI creates new text, images, audio, video, and code." />
              <MCQList items={S8_MCQ} practice={practice} />
            </Section>

            {/* S9 */}
            <Section id="s9" n={9} title="Real-world AI Applications">
              <Figure src={IMG.apps} caption="AI is deployed across nearly every industry." />
              <MCQList items={S9_MCQ} practice={practice} />
              <h3 className="mt-6 text-lg font-semibold">Remaining short-answer prompts</h3>
              <ShortList items={SHORT.slice(10)} practice={practice} />
            </Section>

            {/* S10 — Mixed */}
            <Section id="s10" n={10} title="Mixed Practice Test">
              <p className="text-sm text-muted-foreground">
                Mixed-difficulty MCQs — treat this like a short mock test.
              </p>
              <MCQList items={S10_MCQ} practice={practice} />

              <h3 className="mt-8 text-lg font-semibold">True / False</h3>
              <div className="mt-2 space-y-2">
                {TF.map((t) => (
                  <TFItem key={t.id} item={t} practice={practice} />
                ))}
              </div>
            </Section>

            {/* S11 — Scenario */}
            <Section id="s11" n={11} title="Scenario-Based Questions">
              <Figure src={IMG.scenario} caption="Scenarios test how you think, not what you memorize." />
              <div className="space-y-2">
                {SCENARIO.map((sc) => (
                  <ScenarioItem key={sc.id} item={sc} practice={practice} />
                ))}
              </div>
            </Section>

            {/* S12 — Cases */}
            <Section id="s12" n={12} title="Mini Case Studies">
              <Figure src={IMG.case} caption="Cases blend problem framing, metric choice, and system design." />
              <div className="space-y-3">
                {CASE.map((c) => (
                  <CaseItem key={c.id} item={c} practice={practice} />
                ))}
              </div>
            </Section>

            {/* S13 — Worked Solutions */}
            <Section id="s13" n={13} title="Worked Solutions">
              <p className="text-sm text-muted-foreground">
                Every MCQ above already includes a detailed worked solution — expand any question to
                see the correct answer, why other options are wrong, common mistakes, and a related
                topic tag. Below are worked-out logic questions for extra practice.
              </p>
              <h3 className="mt-4 text-lg font-semibold">Logical thinking questions</h3>
              <div className="space-y-2">
                {LOGIC.map((l) => (
                  <details key={l.id} className="group rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                      <span>Q. {l.q}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Answer:</span> {l.a}
                    </p>
                  </details>
                ))}
              </div>
            </Section>

            {/* S14 — Self assessment */}
            <Section id="s14" n={14} title="Self Assessment">
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Trophy className="h-4 w-4 text-primary" /> Live summary
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <StatTile label="MCQ score" value={`${summary.mcqCorrect}/${summary.mcqTotal}`} sub={`${summary.mcqAnswered} answered`} />
                  <StatTile label="True/False score" value={`${summary.tfCorrect}/${summary.tfTotal}`} sub={`${summary.tfAnswered} answered`} />
                  <StatTile label="Tasks completed" value={String(summary.done)} sub="scenarios / cases / projects" />
                </div>
              </div>

              <h3 className="mt-6 text-lg font-semibold">Self assessment checklist</h3>
              <Checklist
                items={[
                  { id: "chk-1", label: "I answered 80% of MCQs correctly on my first pass." },
                  { id: "chk-2", label: "I can explain AI vs ML vs DL without notes." },
                  { id: "chk-3", label: "I can explain overfitting and how to fix it." },
                  { id: "chk-4", label: "I understand the forward/backward learning loop." },
                  { id: "chk-5", label: "I know which metric to use on imbalanced data." },
                  { id: "chk-6", label: "I can walk through the AI project lifecycle end-to-end." },
                  { id: "chk-7", label: "I can outline a solution to at least 3 scenario questions." },
                  { id: "chk-8", label: "I completed at least 1 mini project idea." },
                ]}
                practice={practice}
              />
            </Section>

            {/* S15 — Final revision */}
            <Section id="s15" n={15} title="Final Revision">
              <Callout tone="success" title="Key takeaways" icon={<CheckCircle2 className="h-5 w-5" />}>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>AI mimics cognition; today all AI is Narrow AI.</li>
                  <li>AI ⊃ ML ⊃ DL — nested subsets.</li>
                  <li>Supervised, unsupervised, and reinforcement each solve different tasks.</li>
                  <li>Metrics must match the business problem.</li>
                  <li>Overfitting is the #1 practical pitfall — regularize, augment, and validate.</li>
                  <li>Neural nets learn via forward → loss → backprop → update.</li>
                  <li>Transformers dominate modern NLP and increasingly vision.</li>
                  <li>Grounding (RAG) reduces LLM hallucination.</li>
                  <li>Data quality usually beats model complexity.</li>
                  <li>Responsible AI is a product concern, not an afterthought.</li>
                </ul>
              </Callout>

              <h3 className="mt-8 text-lg font-semibold">Mini projects</h3>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {PROJECTS.map((p) => (
                  <ProjectCard key={p.id} project={p} practice={practice} />
                ))}
              </div>
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
                This educational resource has been created for learning, practice, and self-assessment
                purposes only. The questions, exercises, worked solutions, and explanations are based
                on publicly available educational materials, official documentation, academic
                publications, research papers, and trusted industry resources. They are intended to
                reinforce understanding of Artificial Intelligence concepts and should not be
                considered official examination or certification questions.
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
              { title: "Artificial Intelligence — Beginner Guide", tag: "AI & Data", time: "11 min", to: "/resources/read/ai-beginner-guide" as const },
              { title: "Artificial Intelligence — Complete Tutorial", tag: "AI & Data", time: "70 min", to: "/resources/read/ai-complete-tutorial" as const },
              { title: "Artificial Intelligence — Step-by-Step Learning Guide", tag: "AI & Data", time: "26 min", to: "/resources/read/ai-step-by-step-learning-guide" as const },
              { title: "Artificial Intelligence — PDF Notes", tag: "AI & Data", time: "88 min", to: "/resources/read/ai-pdf-notes" as const },
              { title: "Artificial Intelligence — Quick Revision Notes", tag: "AI & Data", time: "12 min", to: "/resources/read/ai-quick-revision-notes" as const },
              { title: "Artificial Intelligence — Cheat Sheet", tag: "AI & Data", time: "3 min", to: "/resources/read/ai-cheat-sheet" as const },
              { title: "Artificial Intelligence — Interview Questions", tag: "AI & Data", time: "35 min", to: "/resources/read/ai-interview-questions" as const },
              { title: "Machine Learning Beginner Guide", tag: "AI & Data", time: "14 min" },
              { title: "Deep Learning Fundamentals", tag: "AI & Data", time: "18 min" },
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

/* --------------------- Sub-components --------------------- */

type PracticeAPI = ReturnType<typeof usePracticeState>;

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

function ConceptReview({ items }: { items: string[] }) {
  return (
    <div className="my-3 rounded-2xl border border-border/60 bg-card p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-primary">
        <Sparkles className="h-4 w-4" /> Concept review
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}

function DifficultyChip({ level }: { level: Difficulty }) {
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

function MCQList({ items, practice }: { items: MCQItem[]; practice: PracticeAPI }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <MCQBlock key={item.id} item={item} practice={practice} />
      ))}
    </div>
  );
}

function MCQBlock({ item, practice }: { item: MCQItem; practice: PracticeAPI }) {
  const selected = practice.state.mcq[item.id];
  const answered = selected !== undefined;
  const correct = answered && selected === item.answer;
  return (
    <div className={`rounded-2xl border p-4 shadow-sm transition ${
      answered
        ? correct
          ? "border-emerald-500/40 bg-emerald-500/5"
          : "border-red-500/40 bg-red-500/5"
        : "border-border/60 bg-card"
    }`}>
      <div className="flex items-start gap-3">
        <DifficultyChip level={item.level} />
        <p className="min-w-0 flex-1 text-sm font-semibold">Q. {item.q}</p>
      </div>
      <ul className="mt-3 space-y-1.5">
        {item.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrectOpt = i === item.answer;
          const showCorrect = answered && isCorrectOpt;
          const showWrong = answered && isSelected && !isCorrectOpt;
          return (
            <li key={opt}>
              <button
                type="button"
                onClick={() => !answered && practice.setMCQ(item.id, i)}
                disabled={answered}
                className={`flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                  showCorrect
                    ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100"
                    : showWrong
                    ? "border-red-500/60 bg-red-500/10 text-red-900 dark:text-red-100"
                    : isSelected
                    ? "border-primary/60 bg-primary/10"
                    : "border-border/60 bg-background hover:bg-secondary disabled:opacity-70"
                }`}
              >
                <span className="mt-0.5 shrink-0 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-mono">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {showCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                {showWrong && <XCircle className="h-4 w-4 text-red-500" />}
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <div className="mt-3 space-y-2 rounded-lg border border-border/50 bg-background/60 p-3 text-sm">
          <p>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Answer:</span>{" "}
            {String.fromCharCode(65 + item.answer)} — {item.options[item.answer]}
          </p>
          <p className="text-muted-foreground"><span className="font-semibold text-foreground">Explanation:</span> {item.explanation}</p>
          {item.incorrect && (
            <div className="text-muted-foreground">
              <p className="font-semibold text-foreground">Why other options are wrong:</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {Object.entries(item.incorrect).map(([k, v]) => (
                  <li key={k}><strong>{String.fromCharCode(65 + Number(k))}:</strong> {v}</li>
                ))}
              </ul>
            </div>
          )}
          {item.tip && (
            <p className="rounded-md border-l-2 border-amber-500/60 bg-amber-500/10 px-2 py-1 text-amber-900 dark:text-amber-100">
              <span className="font-semibold">Tip:</span> {item.tip}
            </p>
          )}
          {item.related && (
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold">Related topic:</span> {item.related}
            </p>
          )}
          <button
            type="button"
            onClick={() => practice.setMCQ(item.id, -1 as unknown as number)}
            className="text-xs text-primary hover:underline"
          >
            {/* Re-answer -> just clear */}
          </button>
        </div>
      )}
    </div>
  );
}

function TFItem({ item, practice }: { item: { id: string; q: string; a: boolean; explain: string }; practice: PracticeAPI }) {
  const selected = practice.state.tf[item.id];
  const answered = selected !== undefined;
  return (
    <div className={`rounded-xl border p-3 ${
      answered
        ? selected === item.a
          ? "border-emerald-500/40 bg-emerald-500/5"
          : "border-red-500/40 bg-red-500/5"
        : "border-border/60 bg-card"
    }`}>
      <p className="text-sm font-medium">{item.q}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {[true, false].map((v) => {
          const isSelected = selected === v;
          const isRight = v === item.a;
          return (
            <button
              key={String(v)}
              type="button"
              onClick={() => !answered && practice.setTF(item.id, v)}
              disabled={answered}
              className={`rounded-md border px-3 py-1 text-xs font-semibold transition ${
                answered && isRight
                  ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-800 dark:text-emerald-100"
                  : answered && isSelected && !isRight
                  ? "border-red-500/60 bg-red-500/10 text-red-800 dark:text-red-100"
                  : isSelected
                  ? "border-primary/60 bg-primary/10"
                  : "border-border/60 bg-background hover:bg-secondary"
              }`}
            >
              {v ? "True" : "False"}
            </button>
          );
        })}
        {answered && (
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold">Answer:</span> {item.a ? "True" : "False"} — {item.explain}
          </span>
        )}
      </div>
    </div>
  );
}

function ShortList({ items, practice }: { items: { id: string; q: string; a: string }[]; practice: PracticeAPI }) {
  return (
    <div className="my-3 space-y-2">
      {items.map((s) => (
        <details key={s.id} className="group rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
            <span>Q. {s.q}</span>
            <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
          </summary>
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Model answer:</span> {s.a}
          </p>
          <button
            type="button"
            onClick={() => practice.toggleDone(s.id)}
            className="mt-2 text-xs text-primary hover:underline"
          >
            {practice.state.done.includes(s.id) ? "✓ Marked as done" : "Mark as done"}
          </button>
        </details>
      ))}
    </div>
  );
}

function ScenarioItem({ item, practice }: { item: { id: string; q: string; a: string }; practice: PracticeAPI }) {
  const done = practice.state.done.includes(item.id);
  return (
    <details className="group rounded-2xl border border-border/60 bg-card p-4 open:shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
        <span>Scenario. {item.q}</span>
        <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
      </summary>
      <p className="mt-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">How to answer:</span> {item.a}
      </p>
      <button
        type="button"
        onClick={() => practice.toggleDone(item.id)}
        className={`mt-2 text-xs hover:underline ${done ? "text-emerald-600 dark:text-emerald-400" : "text-primary"}`}
      >
        {done ? "✓ Marked as done" : "Mark as done"}
      </button>
    </details>
  );
}

function CaseItem({
  item,
  practice,
}: {
  item: { id: string; title: string; scenario: string; questions: string[]; guidance: string };
  practice: PracticeAPI;
}) {
  const done = practice.state.done.includes(item.id);
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${done ? "border-emerald-500/40 bg-emerald-500/5" : "border-border/60 bg-card"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Case study</p>
      <h4 className="mt-1 text-lg font-semibold">{item.title}</h4>
      <p className="mt-2 text-sm text-muted-foreground">{item.scenario}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        {item.questions.map((q) => <li key={q}>{q}</li>)}
      </ul>
      <details className="mt-3 rounded-xl border border-border/60 bg-background/60 p-3">
        <summary className="cursor-pointer text-xs font-semibold text-primary">Reveal guidance</summary>
        <p className="mt-2 text-sm text-muted-foreground">{item.guidance}</p>
      </details>
      <button
        type="button"
        onClick={() => practice.toggleDone(item.id)}
        className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline ${done ? "text-emerald-600 dark:text-emerald-400" : "text-primary"}`}
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
        {done ? "Marked as done" : "Mark as done"}
      </button>
    </div>
  );
}

function ProjectCard({
  project,
  practice,
}: {
  project: { id: string; title: string; desc: string; steps: string[] };
  practice: PracticeAPI;
}) {
  const done = practice.state.done.includes(project.id);
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${done ? "border-emerald-500/40 bg-emerald-500/5" : "border-border/60 bg-card"}`}>
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Mini project</p>
      <h4 className="mt-1 text-base font-semibold">{project.title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{project.desc}</p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
        {project.steps.map((s) => <li key={s}>{s}</li>)}
      </ol>
      <button
        type="button"
        onClick={() => practice.toggleDone(project.id)}
        className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold hover:underline ${done ? "text-emerald-600 dark:text-emerald-400" : "text-primary"}`}
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
        {done ? "Marked as done" : "Mark as done"}
      </button>
    </div>
  );
}

function Checklist({
  items,
  practice,
}: {
  items: { id: string; label: string }[];
  practice: PracticeAPI;
}) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((it) => {
        const on = practice.state.done.includes(it.id);
        return (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => practice.toggleDone(it.id)}
              className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2 text-left text-sm transition ${
                on ? "border-emerald-500/50 bg-emerald-500/10" : "border-border/60 bg-card hover:bg-secondary"
              }`}
            >
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border ${on ? "border-emerald-500/70 bg-emerald-500 text-white" : "border-border/60 bg-background"}`}>
                {on ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
              </span>
              <span className={on ? "text-emerald-900 dark:text-emerald-100" : ""}>{it.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function ScoreBar({ label, answered, correct, total }: { label: string; answered: number; correct: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold">{label}</span>
        <span className="text-muted-foreground">{correct}/{total} · {answered} answered</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-background">
        <div className="h-full bg-primary transition-[width]" style={{ width: `${pct}%` }} />
      </div>
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
