import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export const Route = createFileRoute("/_marketing/contact")({
  head: () => ({
    meta: [
      { title: "Contact — EduNova AI" },
      { name: "description", content: "Get in touch with the EduNova AI team. We support students, teachers, and organizations worldwide." },
      { property: "og:title", content: "Contact EduNova AI" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let's build learning <span className="text-gradient">together</span></>}
        description="Have questions about EduNova AI or want to bring Nova to your school or organization? We'd love to talk."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-6">
              {[
                { icon: Mail, title: "Email us", value: "hello@edunova.ai" },
                { icon: Phone, title: "Call us", value: "+1 (555) 010-2048" },
                { icon: MessageSquare, title: "Live chat", value: "Available 9am–9pm UTC" },
                { icon: MapPin, title: "Visit", value: "1 Learning Loop, San Francisco, CA" },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="rounded-3xl border border-border/60 bg-card p-6 shadow-card sm:p-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Ada" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Lovelace" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@school.edu" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="organization">Organization (optional)</Label>
                  <Input id="organization" placeholder="Your school or company" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help..." rows={5} className="mt-1.5" />
                </div>
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full shadow-elegant">Send message</Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
