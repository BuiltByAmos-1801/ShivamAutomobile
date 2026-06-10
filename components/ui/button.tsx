import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export function Button({ className, asChild = false, variant = "default", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: "default" | "outline" | "ghost" }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-primary text-primary-foreground shadow-lg shadow-red-900/15 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-red-900/25",
        variant === "outline" && "border border-border/90 bg-background/90 text-foreground shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted",
        variant === "ghost" && "hover:bg-muted hover:text-primary",
        className
      )}
      {...props}
    />
  );
}
