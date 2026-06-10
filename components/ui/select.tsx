import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn("h-11 w-full rounded-md border border-input bg-background/95 px-3 text-sm shadow-sm outline-none transition focus:border-primary/55 focus:bg-background focus:ring-2 focus:ring-ring/25", className)} {...props}>
      {children}
    </select>
  );
}
