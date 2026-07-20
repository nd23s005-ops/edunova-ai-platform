import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getCourseAnalytics } from "@/lib/analytics/courses.functions";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_dashboard/dashboard/analytics/courses")({
  component: CoursesAnalyticsPage,
  head: () => ({ meta: [{ title: "Course Analytics — EduNova AI" }] }),
});

function CoursesAnalyticsPage() {
  const fn = useServerFn(getCourseAnalytics);
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics", "courses"],
    queryFn: () => fn({ data: { days: 30, limit: 15 } }),
    retry: false,
  });

  if (isLoading) return <Skeleton className="h-64" />;
  if (error) return <Card className="p-4 text-sm text-muted-foreground">Admin-only view.</Card>;
  if (!data) return null;

  return (
    <Card className="p-0 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead className="text-right">Enrollments</TableHead>
            <TableHead className="text-right">Completions</TableHead>
            <TableHead className="w-56">Completion Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.title}</TableCell>
              <TableCell className="text-right">{r.enrollments}</TableCell>
              <TableCell className="text-right">{r.completions}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={r.completion_rate} className="h-2 flex-1" />
                  <span className="text-xs w-10 text-right">{r.completion_rate}%</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {data.rows.length === 0 ? (
            <TableRow><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No enrollments in the last 30 days.</TableCell></TableRow>
          ) : null}
        </TableBody>
      </Table>
    </Card>
  );
}
