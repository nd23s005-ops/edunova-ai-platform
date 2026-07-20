import { createFileRoute } from "@tanstack/react-router";
import { OpportunityFeed } from "@/components/career/OpportunityFeed";
export const Route = createFileRoute("/_dashboard/dashboard/career/internships")({ component: () => <OpportunityFeed kind="internship" /> });
