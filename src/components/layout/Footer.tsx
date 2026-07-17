import { Link } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Explore", to: "/explore" as const },
      { label: "AI Learning Twin", to: "/features/$slug" as const, params: { slug: "learning-twin" } },
      { label: "AI Tutor", to: "/features/$slug" as const, params: { slug: "ai-tutor" } },
      { label: "Exam Generator", to: "/features/$slug" as const, params: { slug: "exam-generator" } },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Resources", to: "/resources" as const },
      { label: "Community", to: "/community" as const },
      { label: "Progress Analytics", to: "/features/$slug" as const, params: { slug: "progress-analytics" } },
      { label: "Knowledge Gap", to: "/features/$slug" as const, params: { slug: "knowledge-gap" } },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" as const },
      { label: "Login", to: "/login" as const },
      { label: "Get started", to: "/register" as const },
    ],
  },
];

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              EduNova AI is the adaptive learning platform helping students, teachers, and organizations
              learn faster with an AI that adapts.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <span>hello@edunova.ai</span>
            </div>

            <form className="mt-6 flex max-w-sm items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <Input id="newsletter" type="email" placeholder="Your email address" />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"params" in l ? (
                        <Link
                          to={l.to}
                          params={l.params}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <Link
                          to={l.to}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduNova AI — Nova Learn AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
