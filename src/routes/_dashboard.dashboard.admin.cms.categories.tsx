import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Plus, Save } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardShared";
import { SectionHeader, DashCard } from "@/components/dashboard/DashboardWidgets";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { listCategories, upsertCategory, upsertSubcategory } from "@/lib/cms/cms.functions";

export const Route = createFileRoute("/_dashboard/dashboard/admin/cms/categories")({
  component: Categories,
});

function Categories() {
  const qc = useQueryClient();
  const listFn = useServerFn(listCategories);
  const upsertCatFn = useServerFn(upsertCategory);
  const upsertSubFn = useServerFn(upsertSubcategory);

  const q = useQuery({ queryKey: ["cms", "categories"], queryFn: () => listFn() });

  const [newCat, setNewCat] = useState("");
  const [newSub, setNewSub] = useState<Record<string, string>>({});

  return (
    <>
      <Link to="/dashboard/admin/cms" className="mb-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline">
        <ArrowLeft className="h-3 w-3" /> Back to CMS
      </Link>
      <DashboardHeader
        title="Categories"
        description="Add tracks (School, College, Professional, Corporate …) and subcategories. New categories require no code changes."
      />

      <DashCard className="mb-6">
        <div className="flex items-center gap-2">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="New category name (e.g. Bootcamp)"
            className="flex-1 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
          />
          <Button
            disabled={!newCat.trim()}
            onClick={async () => {
              try {
                await upsertCatFn({ data: { slug: newCat, name: newCat, display_order: 999 } });
                toast.success("Category added");
                setNewCat("");
                qc.invalidateQueries({ queryKey: ["cms", "categories"] });
              } catch (e) {
                toast.error((e as Error).message);
              }
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>
        </div>
      </DashCard>

      <div className="space-y-4">
        {(q.data?.categories ?? []).map((c) => {
          const subs = (q.data?.subcategories ?? []).filter((s) => s.category_id === c.id);
          return (
            <DashCard key={c.id}>
              <SectionHeader
                title={c.name}
                hint={c.is_active ? "Active" : "Inactive"}
              />
              <div className="mb-3 flex items-center gap-2">
                <input
                  value={newSub[c.id] ?? ""}
                  onChange={(e) => setNewSub((s) => ({ ...s, [c.id]: e.target.value }))}
                  placeholder={`Add subcategory to ${c.name}`}
                  className="flex-1 rounded-xl border border-border/60 bg-background px-3 py-2 text-sm"
                />
                <Button
                  size="sm"
                  disabled={!newSub[c.id]?.trim()}
                  onClick={async () => {
                    try {
                      await upsertSubFn({
                        data: {
                          category_id: c.id,
                          slug: newSub[c.id]!,
                          name: newSub[c.id]!,
                          display_order: subs.length,
                        },
                      });
                      toast.success("Subcategory added");
                      setNewSub((s) => ({ ...s, [c.id]: "" }));
                      qc.invalidateQueries({ queryKey: ["cms", "categories"] });
                    } catch (e) {
                      toast.error((e as Error).message);
                    }
                  }}
                >
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {subs.map((s) => (
                  <span
                    key={s.id}
                    className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs"
                  >
                    {s.name}
                  </span>
                ))}
                {subs.length === 0 && <span className="text-xs text-muted-foreground">No subcategories yet.</span>}
              </div>
            </DashCard>
          );
        })}
      </div>
    </>
  );
}
