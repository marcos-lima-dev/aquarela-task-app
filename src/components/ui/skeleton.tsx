// src/components/ui/skeleton.tsx  ← substitui todo o conteúdo por isso:
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-purple-200/40", className)}
      {...props}
    />
  );
}