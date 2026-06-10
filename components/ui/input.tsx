import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-md border border-input bg-background/95 px-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/55 focus:bg-background focus:ring-2 focus:ring-ring/25",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
