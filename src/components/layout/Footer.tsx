import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const SUPPORT_EMAIL = "support@edunova.ai";

function SupportCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mx-auto w-full max-w-md text-center"
    >
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
        Need Help?
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">
        Reach our team anytime — we usually reply within 24 hours.
      </p>

      <div className="mx-auto mt-5 flex items-center gap-1.5 rounded-full border border-border bg-white p-1 pl-3 shadow-sm transition-shadow hover:shadow-glow">
        <Mail className="h-4 w-4 shrink-0 text-primary" />
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="min-w-0 flex-1 truncate text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          {SUPPORT_EMAIL}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Email copied" : "Copy email"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-border/60" style={{ background: "#FCFAF7" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
          </motion.div>

          <SupportCard />
        </div>

        {/* Bottom bar — centered copyright */}
        <div className="mt-12 border-t border-border/60 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduNova AI. All Rights Reserved. ·{" "}
            <a href="/help-desk" className="hover:text-primary">
              Help Desk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
