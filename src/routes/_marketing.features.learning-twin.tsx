import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  TrendingUp,
  Compass,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Rocket,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  ArrowRight,
  BookOpen,
  Users,
  Building2,
  GraduationCap,
  CheckCircle2,
  Layers,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TITLE = "Learning Twin — Your Personal AI Learning Companion | EduNova AI";
const DESCRIPTION =
  "Discover how Learning Twin builds a private, evolving model of your knowledge to personalize every lesson, quiz, and study plan on EduNova AI.";

export const Route = createFileRoute("/_marketing/features/learning-twin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearningTwinArticle,
});

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "the-problem", label: "The Problem" },
  { id: "what-is-learning-twin", label: "What is Learning Twin?" },
  { id: "how-it-works", label: "How It Works" },
  { id: "key-features", label: "Key Features" },
  { id: "benefits", label: "Benefits" },
  { id: "example", label: "Real-Life Example" },
  { id: "privacy", label: "Privacy & Security" },
  { id: "future", label: "Future Vision" },
  { id: "conclusion", label: "Conclusion" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "Personalized Knowledge Model",
    text: "Every learner receives an evolving, mathematical representation of what they know, what they're still building, and how confidently they apply each concept. This model updates after every interaction — a lesson finished, a quiz submitted, a question asked.",
  },
  {
    icon: Target,
    title: "Knowledge Gap Detection",
    text: "Learning Twin recognizes when a wrong answer signals a missing prerequisite rather than a careless mistake. It traces weaknesses back to their root concept and surfaces them before they compound into larger struggles.",
  },
  {
    icon: TrendingUp,
    title: "Strength & Weakness Analysis",
    text: "The system maps subject mastery across topics, sub-topics, and skill types — recall, reasoning, application — so learners see exactly where they excel and where focused practice will yield the biggest return.",
  },
  {
    icon: Compass,
    title: "Adaptive Learning Paths",
    text: "Instead of a fixed syllabus, Learning Twin re-sequences lessons based on live performance. Confident areas are compressed; fragile ones receive additional practice, alternative explanations, and revision cycles.",
  },
  {
    icon: Sparkles,
    title: "Smart Resource Recommendations",
    text: "Notes, videos, illustrations, and practice sets are recommended based on the learner's current level, pace, and preferred learning style — not on generic popularity or content marketing.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    text: "Streaks, mastery bars, time-on-task, and topic-level accuracy are visualized in a way that's readable at a glance. Progress feels tangible instead of abstract.",
  },
  {
    icon: Layers,
    title: "Learning Analytics",
    text: "Deeper analytics reveal patterns most learners never see themselves: peak study hours, retention curves, question types that need reinforcement, and long-term growth trajectories.",
  },
  {
    icon: Rocket,
    title: "Continuous AI Improvement",
    text: "The more a learner engages, the more accurate their Learning Twin becomes. Recommendations sharpen with every quiz attempt, every note reviewed, every concept revisited.",
  },
];

const BENEFITS = [
  {
    icon: GraduationCap,
    audience: "For Students",
    text: "Board-aligned learning that adapts to individual pace. Students spend less time on what they already know and more time on what will actually move their grades.",
  },
  {
    icon: BookOpen,
    audience: "For Self Learners",
    text: "Independent learners get the structure of a personal tutor without the cost — a companion that remembers what they studied last week and knows what to teach next.",
  },
  {
    icon: Building2,
    audience: "For Organizations",
    text: "Teams upskill at their own pace with visibility for L&D leaders: aggregate skill maps, capability gaps, and role-readiness reporting — without micromanaging individuals.",
  },
  {
    icon: Users,
    audience: "For Educational Institutions",
    text: "Schools and colleges extend their curriculum with an intelligent layer that supports weaker students, challenges advanced ones, and gives educators a real view of classroom mastery.",
  },
];

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function LearningTwinArticle() {
  const active = useActiveSection();
  const progress = useReadingProgress();

  const share = (platform: "twitter" | "linkedin" | "facebook" | "copy") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = "Learning Twin — Your Personal AI Learning Companion";
    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
      return;
    }
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };
    window.open(links[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <article className="relative">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="h-3 w-3" /> AI Feature
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> 8 min read
              </span>
              <span className="text-sm text-muted-foreground">EduNova AI · Product Deep Dive</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Learning Twin
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Your Personal AI Learning Companion
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl">
              Learning Twin is EduNova AI's private, continuously evolving model of what
              you know — built from your lessons, quizzes, and study behavior so every
              future recommendation is tuned to <em>you</em>, not the average learner.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-sm text-muted-foreground mr-1 inline-flex items-center gap-1.5">
                <Share2 className="h-4 w-4" /> Share
              </span>
              <Button size="icon" variant="outline" onClick={() => share("twitter")} aria-label="Share on Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => share("linkedin")} aria-label="Share on LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => share("facebook")} aria-label="Share on Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => share("copy")} aria-label="Copy link">
                <Link2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Body with sidebar TOC */}
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              On this page
            </p>
            <nav className="space-y-1 border-l border-border">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block -ml-px border-l pl-4 py-1.5 text-sm transition-colors ${
                    active === s.id
                      ? "border-primary text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Article */}
        <div className="prose-article space-y-16 max-w-3xl">
          <ArticleSection id="introduction" title="Introduction">
            <p>
              For most of history, learning has been a broadcast. A teacher explains a
              concept to thirty students at once; a textbook is written for an average
              reader; a course assumes everyone starts at the same point and moves at the
              same speed. The results are predictable — some students race ahead, some
              fall silently behind, and most sit somewhere in the middle wondering whether
              they truly understand.
            </p>
            <p>
              A <strong>Learning Twin</strong> flips that model. Instead of a course that
              treats every learner identically, EduNova AI builds a living digital
              representation of each individual — a private, evolving profile of their
              knowledge, habits, strengths, and gaps. Every lesson, quiz, and question
              refines this profile. Every future recommendation is tuned to the person
              behind the screen, not to a demographic they happen to belong to.
            </p>
            <p>
              This article explains what a Learning Twin is, how it works under the hood,
              the features it powers on EduNova AI, and why it fundamentally changes what
              online learning can be — for students, self-learners, organizations, and
              educational institutions alike.
            </p>
          </ArticleSection>

          <ArticleSection id="the-problem" title="The Problem with One-Size-Fits-All Education">
            <p>
              Traditional learning systems — including most modern e-learning platforms —
              are structurally unable to adapt to the individual. They deliver the same
              content, in the same order, at the same pace, regardless of who is on the
              other end. This creates a set of predictable failures that anyone who has
              studied online will recognize instantly.
            </p>
            <ul>
              <li>
                <strong>Different learning speeds.</strong> A concept that takes one
                learner ten minutes might take another an hour. Fixed pacing punishes both
                ends of that spectrum.
              </li>
              <li>
                <strong>Knowledge gaps.</strong> Missing a single prerequisite quietly
                sabotages every future lesson that depends on it, and traditional systems
                have no way to detect this.
              </li>
              <li>
                <strong>Forgetting concepts.</strong> Without spaced revision matched to
                the individual's memory curve, hard-won knowledge fades within weeks.
              </li>
              <li>
                <strong>Lack of personalization.</strong> Recommendations, if they exist
                at all, are based on what other people watched — not on what this specific
                learner needs next.
              </li>
              <li>
                <strong>Difficulty tracking real progress.</strong> Percentage-complete
                bars measure activity, not understanding. A learner can finish a course
                without mastering it.
              </li>
            </ul>
            <p>
              Solving these problems requires a system that <em>knows</em> the learner —
              not just their name and enrolled courses, but the shape of their
              understanding. That's what Learning Twin is designed to be.
            </p>
          </ArticleSection>

          <ArticleSection id="what-is-learning-twin" title="What is Learning Twin?">
            <p>
              A Learning Twin is a personalized digital learning profile that EduNova AI
              maintains for every learner. Think of it as a private mirror of your
              academic mind — one that reflects not only what you've studied but how
              well you understood it, how quickly you learned it, and how likely you are
              to remember it a month from now.
            </p>
            <p>The Twin is built and refined by continuously analyzing signals such as:</p>
            <ul>
              <li>Courses completed and courses in progress</li>
              <li>Topics and sub-topics studied, with time spent on each</li>
              <li>Quiz results, including per-question accuracy and confidence</li>
              <li>Assessment scores across chapters, subjects, and mock exams</li>
              <li>Learning behavior — how a learner approaches new material</li>
              <li>Study patterns — preferred times, session length, revision frequency</li>
              <li>Progress over time, plotted against personal baselines rather than class averages</li>
            </ul>
            <p>
              None of these signals matter in isolation. Together, they form a model rich
              enough to answer the question that traditional platforms cannot: <em>what
              should this particular learner do next?</em>
            </p>
          </ArticleSection>

          <ArticleSection id="how-it-works" title="How Learning Twin Works">
            <p>
              Under the hood, Learning Twin runs a continuous loop. Each stage feeds the
              next, and the whole system gets sharper the longer a learner engages with
              the platform.
            </p>
            <ol className="space-y-3">
              <li>
                <strong>Collect learning data.</strong> Every meaningful interaction —
                lesson viewed, note bookmarked, quiz submitted, question asked to the AI
                assistant — is captured with full context.
              </li>
              <li>
                <strong>Build a personalized knowledge model.</strong> Interactions are
                mapped to a structured knowledge graph of subjects, chapters, concepts,
                and prerequisites, weighted by demonstrated mastery.
              </li>
              <li>
                <strong>Identify strengths.</strong> Concepts a learner answers correctly,
                quickly, and consistently are marked as stable — safe to build on.
              </li>
              <li>
                <strong>Detect weak concepts.</strong> Wrong answers, slow responses, and
                skipped material flag areas of fragility. The system traces these back to
                root causes rather than treating symptoms.
              </li>
              <li>
                <strong>Recommend learning resources.</strong> The next lesson, note,
                illustration, or practice set is chosen specifically to reinforce weak
                spots or extend strong ones.
              </li>
              <li>
                <strong>Adapt future lessons.</strong> Sequencing, difficulty, and pace
                shift in response — sometimes within a single session.
              </li>
              <li>
                <strong>Improve continuously.</strong> Every interaction refines the Twin,
                making the next recommendation more accurate than the last.
              </li>
            </ol>
          </ArticleSection>

          <ArticleSection id="key-features" title="Key Features">
            <p>
              Learning Twin isn't a single button in the interface — it's the invisible
              engine behind eight distinct capabilities that shape the EduNova AI
              experience.
            </p>
            <div className="not-prose grid gap-4 sm:grid-cols-2 pt-2">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                >
                  <Card className="h-full p-5 hover:border-primary/40 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <f.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-semibold text-foreground">{f.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {f.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ArticleSection>

          <ArticleSection id="benefits" title="Who Benefits from Learning Twin">
            <p>
              Because Learning Twin adapts to the person rather than the syllabus, its
              benefits look different depending on who's using it. The underlying
              technology is the same; the outcomes are shaped by context.
            </p>
            <div className="not-prose grid gap-4 sm:grid-cols-2 pt-2">
              {BENEFITS.map((b) => (
                <Card key={b.audience} className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-semibold text-foreground">{b.audience}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {b.text}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ArticleSection>

          <ArticleSection id="example" title="A Real-Life Example">
            <p>
              Consider Ananya, a Class 10 CBSE student enrolling in EduNova AI to prepare
              for her board exams. When she signs up, her Learning Twin is essentially a
              blank canvas — the system knows her board, class, and goals, but nothing
              about her strengths yet.
            </p>
            <p>
              In her first week, Ananya completes an introductory lesson on Trigonometry.
              She sails through basic ratios but stumbles on the quiz question that
              requires her to apply the identity <em>sin²θ + cos²θ = 1</em> in a proof.
              The Twin doesn't just record a wrong answer — it flags the underlying
              concept ("Pythagorean identities · application") as fragile and traces the
              likely root cause back to her comfort level with algebraic manipulation.
            </p>
            <p>
              Instead of pushing her forward to the next chapter, EduNova AI recommends a
              five-minute revision note on manipulating trigonometric identities, followed
              by three practice questions calibrated slightly below the difficulty of the
              one she missed. She gets all three right. The Twin now marks the concept as
              recovering, but not yet stable, and schedules a lightweight revision quiz
              three days later.
            </p>
            <p>
              A month in, Ananya's Twin knows that she's strong in Algebra and Geometry,
              inconsistent in Trigonometry, and weakest in Coordinate Geometry — but only
              on questions that mix concepts from two chapters. As she approaches her
              mock exam, EduNova AI doesn't hand her a generic revision plan. It builds
              one tailored to her: heavier emphasis on cross-chapter Coordinate Geometry
              problems, a short refresher on Trigonometry identities, and lighter, spaced
              revision on Algebra to keep her strengths sharp. On exam day, she walks in
              having spent her preparation time exactly where it mattered most.
            </p>
          </ArticleSection>

          <ArticleSection id="privacy" title="Privacy & Security">
            <p>
              A system that knows this much about how you learn has a corresponding
              responsibility. Learning data is one of the most personal kinds of data
              there is, and EduNova AI treats it that way.
            </p>
            <ul>
              <li>
                <strong>Private by default.</strong> A learner's Twin is visible only to
                that learner. Educators or organization admins see aggregate, role-based
                views — never a raw feed of individual behavior.
              </li>
              <li>
                <strong>Securely stored.</strong> Data is encrypted in transit and at
                rest, protected by row-level access controls that make cross-account
                exposure impossible by design.
              </li>
              <li>
                <strong>Responsibly used.</strong> Recommendations are generated to help
                the learner, not to sell attention. There is no advertising layer sitting
                on top of the Twin.
              </li>
              <li>
                <strong>Under your control.</strong> Learners can review what their Twin
                represents and reset it at any time. Nothing is permanent that the learner
                doesn't want to be permanent.
              </li>
            </ul>
          </ArticleSection>

          <ArticleSection id="future" title="The Future Vision">
            <p>
              Today's Learning Twin already personalizes lessons, detects gaps, and adapts
              study plans. What comes next will make it feel less like a smart feature
              and more like a genuine learning partner.
            </p>
            <p>
              Future iterations will fold in richer signals — spoken explanations,
              handwritten work, project-based artifacts — so the Twin can understand
              mastery beyond multiple-choice accuracy. Deeper simulation will let learners
              rehearse against realistic exam conditions, career scenarios, or real-world
              problem sets. And as foundational AI models continue to mature, Learning
              Twin will be able to explain <em>why</em> it's making a recommendation, not
              just <em>what</em> it's recommending — turning the black box into a
              conversation.
            </p>
            <p>
              Through all of it, the north star stays the same: keep learning personal,
              keep the learner in control, and keep the technology in service of real
              understanding.
            </p>
          </ArticleSection>

          <ArticleSection id="conclusion" title="Conclusion">
            <p>
              Learning Twin is more than an analytics dashboard or a recommendation
              widget. It's a fundamentally different way of thinking about online
              education — one where the platform adapts to the learner instead of the
              other way around. By continuously modeling knowledge, detecting gaps,
              tailoring paths, and respecting privacy, it turns generic content into a
              personal curriculum.
            </p>
            <p>
              For students preparing for exams, self-learners chasing a new skill,
              professionals upskilling for the next role, or institutions supporting
              thousands of learners at once, the outcome is the same: learning that is
              more adaptive, more personalized, more efficient, and genuinely
              data-driven — without ever losing sight of the human being on the other
              side of the screen.
            </p>
          </ArticleSection>

          {/* CTA */}
          <div className="not-prose">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-card to-card border-primary/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-primary">
                    <Lightbulb className="h-5 w-5" />
                    <span className="text-sm font-medium">Try it yourself</span>
                  </div>
                  <h3 className="text-2xl font-semibold">
                    Start building your Learning Twin
                  </h3>
                  <p className="text-muted-foreground">
                    Create an account, enroll in your first course, and watch your
                    personal learning profile take shape.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/register">
                      Get started <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/explore">Explore features</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Related articles */}
          <section aria-labelledby="related-heading" className="not-prose space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 id="related-heading" className="text-2xl font-semibold">
                Related articles
              </h3>
              <Link
                to="/features/$slug"
                params={{ slug: "ai-tutor" }}
                className="text-sm text-primary hover:underline hidden sm:inline"
              >
                Browse all features →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  slug: "knowledge-gap",
                  title: "Knowledge Gap Analysis",
                  desc: "How EduNova AI traces missed questions back to their root concept.",
                  icon: Target,
                },
                {
                  slug: "adaptive-recommendations",
                  title: "Adaptive Recommendations",
                  desc: "The recommender that sequences your next best lesson.",
                  icon: Compass,
                },
                {
                  slug: "ai-tutor",
                  title: "AI Tutor",
                  desc: "A patient tutor that adapts explanations until it clicks.",
                  icon: Brain,
                },
              ].map((r) => (
                <Link
                  key={r.slug}
                  to="/features/$slug"
                  params={{ slug: r.slug }}
                  className="group"
                >
                  <Card className="h-full p-5 hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <div className="inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                        <r.icon className="h-5 w-5" />
                      </div>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {r.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {r.desc}
                      </p>
                      <div className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Read article <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <div className="flex items-center gap-3 pt-6 border-t border-border">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Published by EduNova AI · Reviewed by the Learning Science team ·
              Content reflects the product as of 2026.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ArticleSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24 space-y-4"
    >
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
        {title}
      </h2>
      <div className="space-y-4 text-foreground/85 leading-relaxed text-[17px]">
        {children}
      </div>
    </motion.section>
  );
}
