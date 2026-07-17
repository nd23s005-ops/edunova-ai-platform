import { Eye } from "lucide-react";

export function ReadOnlyBanner() {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-amber-900 dark:text-amber-200">
      <Eye className="h-4 w-4 shrink-0" />
      <div className="text-sm">
        <span className="font-semibold">Read-Only Demo Mode.</span>{" "}
        <span className="text-amber-900/80 dark:text-amber-200/80">
          Create, edit, delete, and settings actions are disabled for demo administrators.
        </span>
      </div>
    </div>
  );
}
