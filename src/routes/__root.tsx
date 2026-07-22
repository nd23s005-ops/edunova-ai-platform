import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { FloatingChat } from "@/components/ai/FloatingChat";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider, themeInitScript } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-gradient text-7xl font-bold">404</div>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition hover:bg-primary/90"
          >
            Back to EduNova AI
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const showDetails = import.meta.env.DEV;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We hit an unexpected error. Try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Go home
          </a>
        </div>
        {showDetails && (
          <details
            open
            className="mt-6 rounded-md border bg-muted/40 p-4 text-left text-xs"
          >
            <summary className="cursor-pointer font-medium">
              {error.name}: {error.message}
            </summary>
            <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-snug text-muted-foreground">
              {error.stack ?? "(no stack)"}
            </pre>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Dev-only details. Recent server errors:{" "}
              <a href="/api/debug/errors" className="underline">
                /api/debug/errors
              </a>
            </p>
          </details>
        )}
      </div>
    </div>
  );
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "EduNova AI — Learn Smarter. Grow Faster. Powered by AI." },
      {
        name: "description",
        content:
          "EduNova AI (Nova Learn AI) is an AI-powered self-learning platform for students, professionals, and organizations. Personalized courses, AI tutoring, and rich resources.",
      },
      { name: "author", content: "EduNova AI" },
      { name: "theme-color", content: "#0e6b7a" },
      { property: "og:title", content: "EduNova AI — Learn Smarter. Grow Faster." },
      {
        property: "og:description",
        content:
          "Adaptive AI learning for students, professionals, and organizations. Personalized paths, AI tutoring, and a premium resource library.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "EduNova AI" },
      {
        name: "twitter:description",
        content: "AI-powered adaptive learning for the next generation of learners.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Apply stored theme before hydration to prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    // Install client-side failure reporter (dev/preview only; no-op in prod).
    void import("@/lib/client-error-reporter").then(({ installClientErrorReporter }) => {
      installClientErrorReporter();
    });

    const readPendingSignupRole = () => {
      if (typeof window === "undefined") return null;
      try {
        const raw = sessionStorage.getItem("edunova.onboarding");
        const saved = raw ? (JSON.parse(raw) as { role?: string }) : null;
        const role = saved?.role;
        sessionStorage.removeItem("edunova.onboarding");
        return role === "student" || role === "college_student" || role === "professional"
          ? role
          : null;
      } catch {
        sessionStorage.removeItem("edunova.onboarding");
        return null;
      }
    };

    const applyPendingSignupRole = async () => {
      const role = readPendingSignupRole();
      if (!role) return;
      const { completeAuthRoleSelection } = await import("@/lib/auth/role-selection.functions");
      await completeAuthRoleSelection({ data: role });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-brief"] });
    };

    // Lazy-load client to avoid SSR touching localStorage
    let unsub: (() => void) | undefined;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const initialSession = await supabase.auth.getSession();
      if (initialSession.data.session) {
        try {
          await applyPendingSignupRole();
        } catch {
          // Non-fatal; existing user role remains protected server-side.
        }
      }
      const { data } = supabase.auth.onAuthStateChange(async (event) => {
        if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;

        if (event === "SIGNED_OUT" && typeof window !== "undefined") {
          sessionStorage.removeItem("edunova.onboarding");
        }

        if (event === "SIGNED_IN") {
          try {
            await applyPendingSignupRole();
          } catch {
            // Non-fatal; existing user role remains protected server-side.
          }
        }

        router.invalidate();
        if (event !== "SIGNED_OUT") queryClient.invalidateQueries({ queryKey: ["me"] });
      });
      unsub = () => data.subscription.unsubscribe();
    })();
    return () => {
      unsub?.();
    };
  }, [queryClient, router]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
        <ClientOnlyFloatingChat />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ClientOnlyFloatingChat() {
  const [mounted, setMounted] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setMounted(true);
    let unsub: (() => void) | undefined;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const checkRole = async (userId: string | undefined) => {
        if (!userId) return setIsAdmin(false);
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .maybeSingle();
        setIsAdmin(data?.role === "admin");
      };
      const { data: userData } = await supabase.auth.getUser();
      setSignedIn(!!userData.user);
      await checkRole(userData.user?.id);
      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
        setSignedIn(!!session?.user);
        void checkRole(session?.user?.id);
      });
      unsub = () => sub.subscription.unsubscribe();
    })();
    return () => unsub?.();
  }, []);
  // Admin dashboard must not display any AI chatbot.
  // Admin dashboard has no chatbot. Everyone else (guests + signed in) sees the Help Desk chat.
  if (!mounted || isAdmin) return null;
  // Suppress the unused-signedIn warning while keeping the state for future logic.
  void signedIn;
  return <FloatingChat />;
}

