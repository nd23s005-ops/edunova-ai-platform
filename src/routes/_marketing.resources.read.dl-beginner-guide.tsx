import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ReaderShell, Section, Figure, Callout, FAQItem, Code, References, type ReaderResource, type TocItem } from "@/components/resources/ReaderShell";

const RESOURCE: ReaderResource = {
  id: "dl-beginner-guide",
  title: "Deep Learning — Beginner Guide",
  category: "AI & Data",
  difficulty: "Beginner",
  readingTime: "18 min",
  pages: 22,
  lastUpdated: "May 2026",
  tags: ["Deep Learning", "DL", "PyTorch"],
  heroImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1800&q=80",
  heroSubtitle:
    "A friendly first look at Deep Learning — plain-English explanations, everyday analogies, simple diagrams, and one small PyTorch program. No prior DL experience assumed.",
};

const TOC: TocItem[] = [
  { id: "what", label: "1. What is Deep Learning?" },
  { id: "aivsml", label: "2. AI vs ML vs DL" },
  { id: "history", label: "3. History of Deep Learning" },
  { id: "nn", label: "4. Neural Networks Explained" },
  { id: "perceptron", label: "5. Perceptrons" },
  { id: "layers", label: "6. Layers of a Neural Network" },
  { id: "activations", label: "7. Activation Functions" },
  { id: "forward", label: "8. Forward Propagation" },
  { id: "backprop", label: "9. Backpropagation Basics" },
  { id: "apps", label: "10. Deep Learning Applications" },
  { id: "install", label: "11. Installing PyTorch" },
  { id: "first", label: "12. First Deep Learning Program" },
  { id: "summary-ch", label: "13. Summary" },
  { id: "review", label: "Beginner Review" },
  { id: "faqs", label: "FAQ" },
  { id: "glossary", label: "Glossary" },
  { id: "references", label: "References" },
  { id: "disclaimer", label: "Disclaimer" },
];

const RELATED = [
  { title: "Deep Learning — Learning Roadmap", tag: "AI & Data", time: "22 min" },
  { title: "Deep Learning — Complete Tutorial", tag: "AI & Data", time: "64 min" },
  { title: "Deep Learning — Sample Exercises", tag: "AI & Data", time: "23 min" },
];

export const Route = createFileRoute("/_marketing/resources/read/dl-beginner-guide")({
  head: () => ({
    meta: [
      { title: `${RESOURCE.title} | EduNova AI` },
      { name: "description", content: RESOURCE.heroSubtitle },
      { property: "og:title", content: `${RESOURCE.title} | EduNova AI` },
      { property: "og:description", content: RESOURCE.heroSubtitle },
      { property: "og:image", content: RESOURCE.heroImage },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DLBeginnerGuidePage,
});

function DLBeginnerGuidePage() {
  return (
    <ReaderShell resource={RESOURCE} toc={TOC} related={RELATED}>
      <Section id="what" title="1. What is Deep Learning?">
        <p>
          Deep Learning is a branch of machine learning where computers learn patterns from data
          using layers of small mathematical building blocks called neurons. Think of it like
          teaching a child to recognise dogs — instead of writing rules ("four legs, fur, tail"),
          you show many examples, and the learner builds an intuition on its own.
        </p>
        <Callout tone="info" icon={<Sparkles className="h-5 w-5" />} title="Learning objectives">
          Understand what DL is, how neural networks work, common applications, and enough
          intuition to write your very first model.
        </Callout>
        <Figure src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1400&q=80" caption="Figure 1 — Deep Learning learns patterns from many labelled examples rather than being told the rules explicitly." />
      </Section>

      <Section id="aivsml" title="2. Artificial Intelligence vs Machine Learning vs Deep Learning">
        <p>These three terms are nested circles, not synonyms.</p>
        <table className="w-full border-collapse text-sm">
          <thead><tr className="border-b"><th className="p-2 text-left">Term</th><th className="p-2 text-left">Meaning</th><th className="p-2 text-left">Everyday example</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="p-2">AI</td><td className="p-2">Any machine acting "smart"</td><td className="p-2">Chess engine, spam filter</td></tr>
            <tr className="border-b"><td className="p-2">ML</td><td className="p-2">AI that learns from data</td><td className="p-2">Email spam classifier</td></tr>
            <tr><td className="p-2">DL</td><td className="p-2">ML using deep neural nets</td><td className="p-2">Face unlock on your phone</td></tr>
          </tbody>
        </table>
      </Section>

      <Section id="history" title="3. History of Deep Learning">
        <ul className="list-disc space-y-1 pl-5">
          <li>1958 — Perceptron by Rosenblatt.</li>
          <li>1986 — Backpropagation popularised by Rumelhart, Hinton, Williams.</li>
          <li>2012 — AlexNet wins ImageNet, sparking the modern DL era.</li>
          <li>2017 — Transformer paper "Attention Is All You Need".</li>
          <li>2022+ — Large language models enter everyday products.</li>
        </ul>
      </Section>

      <Section id="nn" title="4. Neural Networks Explained">
        <p>
          A neural network is a chain of tiny calculators. Each calculator takes numbers in,
          multiplies them by weights, adds them up, and passes the result through a squishing
          function. Stack many of these together and the network can learn complex shapes like
          handwriting or speech.
        </p>
        <p><strong>Analogy:</strong> imagine hundreds of light dimmers wired in layers. Adjusting the dimmers slowly makes the final bulb light up only for photos of cats.</p>
      </Section>

      <Section id="perceptron" title="5. Perceptrons">
        <p>The perceptron is the simplest neuron: <em>output = step(w·x + b)</em>. It draws a straight line to separate two classes.</p>
        <p><strong>Misconception:</strong> a single perceptron cannot solve XOR. You need at least one hidden layer.</p>
      </Section>

      <Section id="layers" title="6. Layers of a Neural Network">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Input layer</strong> — raw numbers (pixels, tokens).</li>
          <li><strong>Hidden layers</strong> — where learning happens.</li>
          <li><strong>Output layer</strong> — final prediction.</li>
        </ul>
        <p>"Deep" simply means many hidden layers. Depth lets the model build features on top of features.</p>
      </Section>

      <Section id="activations" title="7. Activation Functions">
        <p>Activations add curves so the network can bend around data. Common choices for beginners:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>ReLU</strong> — pass positives, zero out negatives. Default choice.</li>
          <li><strong>Sigmoid</strong> — squashes to (0, 1). Good for probabilities.</li>
          <li><strong>Softmax</strong> — turns a vector into a probability distribution.</li>
        </ul>
      </Section>

      <Section id="forward" title="8. Forward Propagation">
        <p>Forward propagation is one prediction. Numbers flow left to right, each layer transforming them, until the output layer produces a guess.</p>
        <Code>{`# pseudocode
h1 = relu(x @ W1 + b1)
h2 = relu(h1 @ W2 + b2)
y  = softmax(h2 @ W3 + b3)`}</Code>
      </Section>

      <Section id="backprop" title="9. Backpropagation Basics">
        <p>Learning happens by measuring the error, then nudging every weight slightly to reduce it. Repeat millions of times. That process is called backpropagation.</p>
        <p><strong>Everyday analogy:</strong> tuning a shower. You feel too cold, so you nudge the hot tap. Too hot? Nudge back. The network does this for millions of "taps" (weights) at once.</p>
      </Section>

      <Section id="apps" title="10. Deep Learning Applications">
        <ul className="list-disc space-y-1 pl-5">
          <li>Photo tagging on your phone.</li>
          <li>Voice assistants understanding speech.</li>
          <li>Real-time language translation.</li>
          <li>Medical imaging assistance.</li>
          <li>Self-driving perception systems.</li>
          <li>Chat assistants like the one on this page.</li>
        </ul>
        <Figure src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1400&q=80" caption="Figure 2 — Neural network mental model: inputs enter on the left, layers transform them, and the output layer produces the final answer." />
      </Section>

      <Section id="install" title="11. Installing PyTorch">
        <p>PyTorch is the friendliest DL library for beginners.</p>
        <Code>{`# Optional: create a fresh environment
python -m venv .venv && source .venv/bin/activate

# CPU install (works everywhere)
pip install torch torchvision

# Verify
python -c "import torch; print(torch.__version__)"`}</Code>
        <p><strong>Tip:</strong> if you have an NVIDIA GPU, install the CUDA-matching build from pytorch.org for large speed-ups.</p>
      </Section>

      <Section id="first" title="12. First Deep Learning Program">
        <p>Fit a tiny network to a straight line. You can run this on a laptop CPU.</p>
        <Code>{`import torch, torch.nn as nn

x = torch.linspace(-1, 1, 100).unsqueeze(1)
y = 3 * x + 0.5                # target line

model = nn.Sequential(nn.Linear(1, 8), nn.ReLU(), nn.Linear(8, 1))
opt   = torch.optim.SGD(model.parameters(), lr=0.05)

for step in range(500):
    pred = model(x)
    loss = ((pred - y) ** 2).mean()
    opt.zero_grad(); loss.backward(); opt.step()

print("final loss:", loss.item())`}</Code>
        <p><strong>Knowledge check:</strong> what happens if you remove the ReLU? (Answer: the model collapses to a plain linear regression.)</p>
      </Section>

      <Section id="summary-ch" title="13. Summary">
        <ul className="list-disc space-y-1 pl-5">
          <li>DL learns patterns from examples, not rules.</li>
          <li>Networks are chains of neurons with weights and activations.</li>
          <li>Forward propagation predicts; backpropagation learns.</li>
          <li>You already ran your first model.</li>
        </ul>
      </Section>

      <Section id="review" title="Beginner Review">
        <h3 className="font-semibold">Chapter summary</h3>
        <p>You now have a mental picture of neurons, layers, activations, and how learning works.</p>
        <h3 className="mt-3 font-semibold">Key takeaways</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>DL sits inside ML, which sits inside AI.</li>
          <li>Depth helps a network build higher-level features.</li>
          <li>PyTorch is the beginner-friendly path in.</li>
        </ul>
        <h3 className="mt-3 font-semibold">Self assessment</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Can I explain a neuron in one sentence?</li>
          <li>Can I list two activation functions and when to use them?</li>
          <li>Can I describe backpropagation in plain English?</li>
        </ul>
        <h3 className="mt-3 font-semibold">Practice questions</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>Why do we need non-linear activations?</li>
          <li>What is one everyday DL application on your phone?</li>
          <li>What happens to a network with zero hidden layers?</li>
        </ul>
      </Section>

      <Section id="faqs" title="FAQ">
        <FAQItem q="Do I need advanced math to start?">No. Basic algebra is enough to begin; deeper math becomes useful later.</FAQItem>
        <FAQItem q="Do I need a GPU?">No — every example in this guide runs on a laptop CPU.</FAQItem>
        <FAQItem q="How long until I can build a real project?">Six to eight weeks of consistent practice.</FAQItem>
      </Section>

      <Section id="glossary" title="Glossary">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Neuron</strong> — a small weighted-sum + activation unit.</li>
          <li><strong>Weight</strong> — a learnable number multiplied with an input.</li>
          <li><strong>Loss</strong> — a number measuring how wrong the prediction is.</li>
          <li><strong>Epoch</strong> — one pass through the entire dataset.</li>
        </ul>
      </Section>

      <Section id="references" title="References"><References /></Section>

      <Section id="disclaimer" title="Disclaimer">
        <p className="text-sm text-muted-foreground">
          This resource is intended for educational purposes only. Information is compiled from
          official documentation, academic publications, research papers, industry standards, and
          trusted educational resources. Deep learning technologies, frameworks, APIs, and best
          practices evolve continuously — consult the latest official documentation for
          authoritative guidance. All trademarks, logos, product names, and intellectual property
          belong to their respective owners.
        </p>
      </Section>
    </ReaderShell>
  );
}
