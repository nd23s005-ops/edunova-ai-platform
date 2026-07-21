import { useState } from "react";
import { KeyRound, Copy, Check, X, MousePointerClick } from "lucide-react";
import { DEMO_ADMIN_CREDENTIALS } from "@/lib/admin/access";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DemoFillHandler = (email: string, password: string) => void;

export function DemoCredentialsPopup({
  variant = "floating",
  className,
  onFill,
}: {
  variant?: "floating" | "inline";
  className?: string;
  onFill?: DemoFillHandler;
}) {
  const [open, setOpen] = useState(variant === "inline");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1200);
    } catch {
      /* ignore */
    }
  };

  const groups: Array<{
    title: string;
    subtitle: string;
    items: ReadonlyArray<{ label: string; email: string; password: string }>;
  }> = [
    {
      title: "Demo Admins",
      subtitle: "Read-only preview accounts. Full access is reserved for Super Administrators.",
      items: DEMO_ADMIN_CREDENTIALS,
    },
  ];

  const panel = (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-4 shadow-lg",
        variant === "floating" && "w-[340px]",
        className,
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Demo Credentials</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Only the accounts listed here can sign in as demo admins.
          </p>
        </div>
        {variant === "floating" && (
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{g.subtitle}</p>
            <ul className="mt-2 space-y-2">
              {g.items.map((c) => (
                <li key={c.email} className="rounded-lg border border-border/60 bg-background/60 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold">{c.label}</p>
                    {onFill && (
                      <button
                        type="button"
                        onClick={() => onFill(c.email, c.password)}
                        className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-foreground hover:bg-muted"
                        aria-label={`Auto-fill ${c.label}`}
                      >
                        <MousePointerClick className="h-3 w-3" /> Fill
                      </button>
                    )}
                  </div>
                  <div className="mt-2 space-y-1.5 text-xs">
                    <CredRow
                      label="Admin ID"
                      value={c.email}
                      onCopy={() => copy(`${c.email}-e`, c.email)}
                      copied={copied === `${c.email}-e`}
                    />
                    <CredRow
                      label="Password"
                      value={c.password}
                      onCopy={() => copy(`${c.email}-p`, c.password)}
                      copied={copied === `${c.email}-p`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  if (variant === "inline") return panel;

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {open ? (
        panel
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen(true)}
          className="gap-2 shadow-md"
        >
          <KeyRound className="h-4 w-4" />
          Demo credentials
        </Button>
      )}
    </div>
  );
}

function CredRow({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}:</span>
      <div className="flex items-center gap-1.5">
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">{value}</code>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
