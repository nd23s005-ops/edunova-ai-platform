import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — EduNova AI" },
      {
        name: "description",
        content:
          "How EduNova AI collects, uses, stores, and protects your personal information, and the choices available to you.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <section className="prose prose-sm mt-8 max-w-none dark:prose-invert">
        <h2>1. Information We Collect</h2>
        <p>
          We collect the information you provide at registration (name, email, optional phone
          number, date of birth, country, and role), account activity, and technical data such as
          device and usage information required to operate the Service.
        </p>

        <h2>2. How We Use Information</h2>
        <p>
          We use your information to create and secure your account, personalize learning content,
          communicate service updates, provide support, and comply with legal obligations.
        </p>

        <h2>3. Sharing</h2>
        <p>
          We do not sell personal information. We share data only with processors that help operate
          the Service (hosting, analytics, AI model providers) under strict confidentiality, or when
          required by law.
        </p>

        <h2>4. Security</h2>
        <p>
          Passwords are hashed with industry-standard algorithms and checked against known-breached
          password lists. Sessions are managed with secure, HTTP-only cookies where applicable.
          Access to production systems is limited to authorized personnel.
        </p>

        <h2>5. Your Rights</h2>
        <p>
          You may access, correct, export, or delete your personal information from your profile
          settings or by contacting support@edunova.ai. Depending on your region, additional rights
          (GDPR, CCPA) may apply.
        </p>

        <h2>6. Children</h2>
        <p>
          For users under 18, a parent or guardian must consent to registration and to our
          processing of the minor's information.
        </p>

        <h2>7. Contact</h2>
        <p>Questions about privacy can be sent to privacy@edunova.ai.</p>
      </section>
    </main>
  );
}
