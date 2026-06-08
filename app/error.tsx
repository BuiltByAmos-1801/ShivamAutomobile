"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container-pad grid min-h-[60vh] place-items-center py-12 text-center">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">Please retry the request.</p>
        <Button className="mt-6" onClick={reset}>Retry</Button>
      </div>
    </div>
  );
}
