import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-md border border-input bg-background/95 px-3 py-3 text-sm shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/55 focus:bg-background focus:ring-2 focus:ring-ring/25",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
