import { Link } from "@tanstack/react-router";
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Mission", to: "/about" },
      { label: "Careers", to: "/about" },
      { label: "Press", to: "/about" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Courses", to: "/courses" },
      { label: "AI Tutor", to: "/ai-tutor" },
      { label: "For Organizations", to: "/pricing" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Library", to: "/resources" },
      { label: "Study Guides", to: "/resources" },
      { label: "Practice Tests", to: "/resources" },
      { label: "Learning Paths", to: "/resources" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discussions", to: "/resources" },
      { label: "Events", to: "/resources" },
      { label: "Educators", to: "/about" },
      { label: "Student Stories", to: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/contact" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/contact" },
      { label: "Terms & Conditions", to: "/contact" },
    ],
  },
] as const;

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              EduNova AI is the adaptive learning platform helping students, teachers, and organizations
              learn smarter and grow faster with the power of artificial intelligence.
            </p>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@edunova.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 010-2048</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>1 Learning Loop, San Francisco, CA</span>
              </div>
            </div>

            <form className="mt-6 flex max-w-sm items-center gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter" className="sr-only">Email address</label>
              <Input id="newsletter" type="email" placeholder="Your email address" />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
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
