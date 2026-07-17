import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  children: ReactNode;
}

export function Section({
  id,
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  align = "center",
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-24", className)}>
      <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {(eyebrow || title || description) && (
          <div className={cn("mb-12 max-w-3xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && (
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
