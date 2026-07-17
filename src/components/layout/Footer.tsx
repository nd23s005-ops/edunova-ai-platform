import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Github,
  Instagram,
  Linkedin,
  MessageSquare,
  Twitter,
  Youtube,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

type LinkItem =
  | { label: string; to: "/explore" | "/resources" | "/community" | "/about" | "/login" | "/register" }
  | { label: string; to: "/features/$slug"; params: { slug: string } }
  | { label: string; href: string };

const company: LinkItem[] = [
  { label: "About", to: "/about" },
  { label: "Features", href: "#ai-features" },
  { label: "Community", to: "/community" },
  { label: "Careers", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "mailto:hello@edunova.ai" },
];

const resources: LinkItem[] = [
  { label: "Explore", to: "/explore" },
  { label: "Courses", to: "/resources" },
  { label: "AI Mentors", href: "#mentors" },
  { label: "Documentation", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Tutorials", href: "#" },
  { label: "Question Papers", href: "#" },
];

const legal: LinkItem[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Security", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Licenses", href: "#" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: MessageSquare, label: "Discord", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "X (Twitter)", href: "#" },
];

function FooterLink({ item }: { item: LinkItem }) {
  const className =
    "story-link inline-block text-sm text-muted-foreground transition-colors hover:text-foreground";
  if ("href" in item) {
    return (
      <a href={item.href} className={className}>
        {item.label}
      </a>
    );
  }
  if ("params" in item) {
    return (
      <Link to={item.to} params={item.params} className={className}>
        {item.label}
      </Link>
    );
  }
  return (
    <Link to={item.to} className={className}>
      {item.label}
    </Link>
  );
}

function LinkColumn({ title, items, delay }: { title: string; items: LinkItem[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((l) => (
          <li key={l.label}>
            <FooterLink item={l} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-border/60" style={{ background: "#FCFAF7" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Adaptive learning platform powered by intelligent AI mentors for students, educators,
              and organizations.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.12, rotate: -6, y: -2 }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary hover:shadow-glow"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Columns 2-4: Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <LinkColumn title="Company" items={company} delay={0.05} />
            <LinkColumn title="Resources" items={resources} delay={0.1} />
            <LinkColumn title="Legal" items={legal} delay={0.15} />
          </div>

          {/* Column 5: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
              Stay Updated
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Learning tips, product updates, and new AI mentors.
            </p>
            <form
              className="mt-4 flex items-center gap-2 rounded-full border border-border bg-white p-1 shadow-sm transition-shadow focus-within:shadow-glow"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Email Address"
                className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="group inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-highlight px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            <p className="mt-2 text-[11px] text-muted-foreground">
              We respect your privacy. No spam.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduNova AI · All Rights Reserved.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" /> for
            lifelong learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
