import { createFileRoute } from "@tanstack/react-router";
import { OpportunityFeed } from "@/components/career/OpportunityFeed";
export const Route = createFileRoute("/_dashboard/dashboard/career/jobs")({ component: () => <OpportunityFeed kind="job" /> });
