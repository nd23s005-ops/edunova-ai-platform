import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-8 sm:px-10">
        <Logo />
        <div className="mx-auto w-full max-w-md py-12">
          <Outlet />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduNova AI — Nova Learn AI
        </p>
      </div>

      <div className="relative hidden overflow-hidden bg-hero-gradient lg:block">
        <div className="absolute inset-0 bg-grid-fade" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between p-12 text-foreground">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur transition hover:bg-background"
          >
            ← Back to homepage
          </Link>

          <div className="max-w-md">
            <blockquote className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              "Nova taught me calculus in a way three tutors couldn't. I finally get it — and I actually enjoy it."
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-semibold">
                LM
              </span>
              <div>
                <p className="text-sm font-semibold">Lena Marquez</p>
                <p className="text-xs text-muted-foreground">Undergraduate, Barcelona</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur">
              <p className="text-2xl font-bold">1.2M+</p>
              <p className="text-xs text-muted-foreground">learners</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur">
              <p className="text-2xl font-bold">8,400+</p>
              <p className="text-xs text-muted-foreground">courses</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur">
              <p className="text-2xl font-bold">4.9★</p>
              <p className="text-xs text-muted-foreground">avg rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
