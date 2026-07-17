import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — EduNova AI" },
      {
        name: "description",
        content:
          "The Terms & Conditions governing your use of EduNova AI, including acceptable use, accounts, and service rules.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to home
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

      <section className="prose prose-sm mt-8 max-w-none dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By creating an account or using EduNova AI (the "Service"), you agree to these Terms &amp;
          Conditions. If you do not agree, do not use the Service.
        </p>

        <h2>2. Eligibility &amp; Accounts</h2>
        <p>
          You must be at least 5 years old to use EduNova AI, and users under 18 must have consent
          from a parent or guardian. You are responsible for the accuracy of information you provide
          during registration and for maintaining the confidentiality of your credentials.
        </p>

        <h2>3. Acceptable Use</h2>
        <p>
          You agree not to misuse the Service, including: attempting to access accounts you do not
          own, reverse engineering, uploading unlawful content, or interfering with normal operation
          of the platform.
        </p>

        <h2>4. Content &amp; Intellectual Property</h2>
        <p>
          Course materials, AI-generated responses, and platform assets are owned by EduNova AI or
          its licensors. You retain ownership of content you submit but grant us a non-exclusive
          license to host and display it as necessary to provide the Service.
        </p>

        <h2>5. Termination</h2>
        <p>
          We may suspend or terminate accounts that violate these Terms. You may close your account
          at any time from your profile settings.
        </p>

        <h2>6. Disclaimers</h2>
        <p>
          The Service is provided "as is." AI outputs may contain errors and should not be relied
          upon for medical, legal, or financial decisions.
        </p>

        <h2>7. Contact</h2>
        <p>Questions about these Terms can be sent to support@edunova.ai.</p>
      </section>
    </main>
  );
}
