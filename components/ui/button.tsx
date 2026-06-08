import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export function Button({ className, asChild = false, variant = "default", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: "default" | "outline" | "ghost" }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-red-700",
        variant === "outline" && "border bg-background hover:bg-muted",
        variant === "ghost" && "hover:bg-muted",
        className
      )}
      {...props}
    />
  );
}
