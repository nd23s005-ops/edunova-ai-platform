import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/_auth/register")({
  head: () => ({
    meta: [
      { title: "Create account — EduNova AI" },
      { name: "description", content: "Create your EduNova AI account and start learning with Nova today." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Start learning with Nova in less than a minute.
      </p>

      <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" placeholder="Ada" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" placeholder="Lovelace" className="mt-1.5" />
          </div>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 8 characters" className="mt-1.5" />
        </div>

        <div>
          <Label>I'm joining as</Label>
          <RadioGroup defaultValue="student" className="mt-2 grid grid-cols-2 gap-2">
            {[
              { v: "student", l: "Student" },
              { v: "teacher", l: "Teacher" },
              { v: "organization", l: "Organization" },
              { v: "admin", l: "Administrator" },
            ].map((r) => (
              <label
                key={r.v}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
              >
                <RadioGroupItem value={r.v} id={`role-${r.v}`} />
                <span>{r.l}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        <p className="text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link to="/about" className="underline">Terms</Link> and{" "}
          <Link to="/about" className="underline">Privacy Policy</Link>.
        </p>

        <Button type="submit" className="w-full shadow-elegant" size="lg">Create account</Button>
      </form>

      <div className="relative my-6">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs uppercase tracking-wider text-muted-foreground">
          or sign up with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="lg">Google</Button>
        <Button variant="outline" size="lg">Microsoft</Button>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
