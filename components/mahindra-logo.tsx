import { cn } from "@/lib/utils";

export function MahindraLogo({ className }: { className?: string }) {
  return (
    <span
      aria-label="Mahindra"
      className={cn(
        "inline-flex items-center rounded-sm border border-red-600 bg-white px-3 py-1 text-sm font-black uppercase tracking-normal text-red-600 shadow-sm",
        className
      )}
    >
      Mahindra
    </span>
  );
}
