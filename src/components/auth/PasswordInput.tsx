import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          disabled={props.disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          tabIndex={-1}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground disabled:opacity-50"
        >
          <span className="relative block h-4 w-4">
            <Eye
              className={cn(
                "absolute inset-0 h-4 w-4 transition-all duration-200",
                visible ? "opacity-0 scale-75 rotate-6" : "opacity-100 scale-100 rotate-0"
              )}
              aria-hidden="true"
            />
            <EyeOff
              className={cn(
                "absolute inset-0 h-4 w-4 transition-all duration-200",
                visible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-6"
              )}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
