import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { homeForRole, type AppRole } from "@/lib/auth/roles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Resources", to: "/resources" },
  { label: "Community", to: "/community" },
  { label: "About", to: "/about" },
] as const;

function NavItem({ to, label, onClick }: { to: (typeof NAV_LINKS)[number]["to"]; label: string; onClick?: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeOptions={{ exact: to === "/" }}
      className="group relative px-1 py-1 text-sm font-medium text-[oklch(0.35_0.02_240)] transition-colors duration-300 hover:text-[oklch(0.7_0.19_40)] data-[status=active]:font-semibold data-[status=active]:text-[oklch(0.7_0.19_40)]"
    >
      {label}
      <span className="pointer-events-none absolute inset-x-1 -bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-[oklch(0.7_0.19_40)] transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
    </Link>
  );
}

function CTAButton({ to, onClick, children }: { to: "/register" | "/onboarding"; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-[14px] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_oklch(0.72_0.16_50/0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_oklch(0.72_0.16_50/0.85)]"
      style={{
        background: "linear-gradient(135deg, oklch(0.82 0.16 55) 0%, oklch(0.7 0.19 40) 100%)",
      }}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [initials, setInitials] = useState("NL");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      const e = data.user?.email ?? null;
      setEmail(e);
      if (e) setInitials(e.slice(0, 2).toUpperCase());
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const e = session?.user?.email ?? null;
      setEmail(e);
      if (e) setInitials(e.slice(0, 2).toUpperCase());
    });
    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        "border-b",
        scrolled
          ? "border-[#ECECEC] bg-[#FCFAF7]/85 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
          : "border-transparent bg-[#FCFAF7]/95 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto grid h-[72px] max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-6 px-4 sm:px-6 lg:h-20 lg:px-10">
        {/* Left: Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Logo />
        </motion.div>

        {/* Center: Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          aria-label="Primary"
          className="hidden justify-center gap-8 lg:flex xl:gap-9"
        >
          {NAV_LINKS.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}
        </motion.nav>

        {/* Right: Actions */}
        <div className="hidden items-center gap-3 justify-self-end lg:flex">
          {email ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)] text-sm font-semibold text-white shadow-[0_6px_18px_-8px_oklch(0.7_0.19_40/0.7)]">
                  {initials}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex w-full items-center gap-2">
                    <User className="h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="gap-2">
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                to="/onboarding"
                className="text-sm font-medium text-[oklch(0.35_0.02_240)] transition-colors duration-300 hover:text-[oklch(0.7_0.19_40)]"
              >
                Login
              </Link>
              <CTAButton to="/onboarding">Get Started</CTAButton>
            </>
          )}
        </div>

        {/* Mobile trigger */}
        <div className="flex items-center justify-self-end lg:hidden">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#ECECEC] bg-white/70 text-[oklch(0.18_0.03_240)] transition-colors hover:border-[oklch(0.7_0.19_40)]/40 hover:text-[oklch(0.7_0.19_40)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden border-t border-[#ECECEC] bg-[#FCFAF7]/95 backdrop-blur-2xl lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
              }}
              className="flex flex-col gap-1 px-4 py-5"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((l) => (
                <motion.div
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-[oklch(0.25_0.02_240)] transition-colors hover:bg-white hover:text-[oklch(0.7_0.19_40)] data-[status=active]:bg-white data-[status=active]:text-[oklch(0.7_0.19_40)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-3 grid grid-cols-2 gap-2 border-t border-[#ECECEC] pt-4"
              >
                {email ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="rounded-[14px] border border-[#ECECEC] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[oklch(0.18_0.03_240)]"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setOpen(false);
                        signOut();
                      }}
                      className="rounded-[14px] bg-gradient-to-br from-[oklch(0.82_0.16_55)] to-[oklch(0.7_0.19_40)] px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/onboarding"
                      onClick={() => setOpen(false)}
                      className="rounded-[14px] border border-[#ECECEC] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[oklch(0.18_0.03_240)]"
                    >
                      Login
                    </Link>
                    <CTAButton to="/onboarding" onClick={() => setOpen(false)}>
                      Get Started
                    </CTAButton>
                  </>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
