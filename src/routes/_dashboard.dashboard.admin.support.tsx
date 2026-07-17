import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LifeBuoy, Filter, StickyNote, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader, StatCard } from "@/components/dashboard/DashboardShared";
import { RoleGate } from "@/components/auth/RoleGate";
import { useAdminAccess } from "@/lib/admin/access";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/dashboard/admin/support")({
  component: AdminSupportPage,
});

type Ticket = {
  id: string;
  name: string;
  email: string;
  category: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  created_at: string;
  user_id: string | null;
};

type Note = { id: string; note: string; created_at: string; author_id: string };

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
] as const;

type StatusFilter = (typeof STATUS_TABS)[number]["value"];

function AdminSupportPage() {
  const access = useAdminAccess();
  const [filter, setFilter] = useState<StatusFilter>("open");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const qc = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["admin", "support-tickets", filter],
    queryFn: async () => {
      let q = supabase
        .from("support_tickets")
        .select("id,name,email,category,subject,description,status,created_at,user_id")
        .order("created_at", { ascending: false })
        .limit(200);
      if (filter !== "all") q = q.eq("status", filter);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Ticket[];
    },
  });

  const selected = tickets.find((t) => t.id === selectedId) ?? tickets[0] ?? null;

  const { data: counts } = useQuery({
    queryKey: ["admin", "support-counts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("support_tickets").select("status");
      if (error) throw error;
      const c = { open: 0, in_progress: 0, resolved: 0, total: 0 };
      for (const row of data ?? []) {
        c.total += 1;
        c[row.status as keyof typeof c] = (c[row.status as keyof typeof c] as number) + 1;
      }
      return c;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async (payload: { id: string; status: Ticket["status"] }) => {
      const { error } = await supabase
        .from("support_tickets")
        .update({ status: payload.status })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "support-tickets"] });
      qc.invalidateQueries({ queryKey: ["admin", "support-counts"] });
      toast.success("Status updated");
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Update failed"),
  });

  return (
    <RoleGate allow={["admin"]}>
      <DashboardHeader
        title="Support queue"
        description="Tickets submitted from the Help Desk. Filter by status, review, and add internal notes."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open" value={String(counts?.open ?? "—")} icon={<Clock className="h-4 w-4" />} />
        <StatCard label="In progress" value={String(counts?.in_progress ?? "—")} icon={<Loader2 className="h-4 w-4" />} />
        <StatCard label="Resolved" value={String(counts?.resolved ?? "—")} icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Total" value={String(counts?.total ?? "—")} icon={<LifeBuoy className="h-4 w-4" />} />
      </div>

      <div className="mt-6 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {STATUS_TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition",
              filter === t.value
                ? "bg-primary text-primary-foreground"
                : "border border-border/60 bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-border/60 bg-card">
          {isLoading ? (
            <p className="p-6 text-sm text-muted-foreground">Loading…</p>
          ) : tickets.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No tickets in this view.</p>
          ) : (
            <ul className="divide-y divide-border/60">
              {tickets.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setSelectedId(t.id)}
                    className={cn(
                      "block w-full px-4 py-3 text-left transition hover:bg-muted/40",
                      selected?.id === t.id && "bg-primary/5",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{t.subject}</p>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {t.name} · {t.email} · {t.category}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {new Date(t.created_at).toLocaleString()}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-5">
          {selected ? (
            <TicketDetail
              ticket={selected}
              readOnly={access.isReadOnly}
              onSetStatus={(status) => updateStatus.mutate({ id: selected.id, status })}
            />
          ) : (
            <p className="text-sm text-muted-foreground">Select a ticket to view details.</p>
          )}
        </div>
      </div>
    </RoleGate>
  );
}

function StatusBadge({ status }: { status: Ticket["status"] }) {
  const map: Record<Ticket["status"], string> = {
    open: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    in_progress: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
    resolved: "bg-green-500/15 text-green-700 dark:text-green-300",
  };
  return (
    <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", map[status])}>
      {status.replace("_", " ")}
    </span>
  );
}

function TicketDetail({
  ticket,
  readOnly,
  onSetStatus,
}: {
  ticket: Ticket;
  readOnly: boolean;
  onSetStatus: (s: Ticket["status"]) => void;
}) {
  const qc = useQueryClient();
  const [note, setNote] = useState("");

  const { data: notes = [] } = useQuery({
    queryKey: ["admin", "ticket-notes", ticket.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ticket_notes")
        .select("id,note,created_at,author_id")
        .eq("ticket_id", ticket.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Note[];
    },
  });

  const addNote = useMutation({
    mutationFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("ticket_notes")
        .insert({ ticket_id: ticket.id, note: note.trim(), author_id: u.user.id });
      if (error) throw error;
    },
    onSuccess: () => {
      setNote("");
      qc.invalidateQueries({ queryKey: ["admin", "ticket-notes", ticket.id] });
      toast.success("Note added");
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold">{ticket.subject}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {ticket.name} · <a href={`mailto:${ticket.email}`} className="hover:text-primary">{ticket.email}</a> ·{" "}
            {ticket.category} · {new Date(ticket.created_at).toLocaleString()}
          </p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      <p className="mt-4 whitespace-pre-wrap rounded-lg border border-border/60 bg-background/60 p-3 text-sm">
        {ticket.description}
      </p>

      {!readOnly && (
        <div className="mt-4 flex flex-wrap gap-2">
          {(["open", "in_progress", "resolved"] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={ticket.status === s ? "default" : "outline"}
              onClick={() => onSetStatus(s)}
            >
              Mark {s.replace("_", " ")}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <StickyNote className="h-4 w-4" /> Internal notes
        </div>
        <div className="mt-3 space-y-2">
          {notes.length === 0 ? (
            <p className="text-xs text-muted-foreground">No notes yet.</p>
          ) : (
            notes.map((n) => (
              <div key={n.id} className="rounded-lg border border-border/60 bg-background/60 p-3">
                <p className="whitespace-pre-wrap text-sm">{n.note}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
        {!readOnly && (
          <div className="mt-3">
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add an internal note (only admins can see this)"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <Button
                size="sm"
                disabled={!note.trim() || addNote.isPending}
                onClick={() => addNote.mutate()}
              >
                Add note
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
