import Image from "next/image";
import { cn } from "@/lib/utils";

export function MahindraLogo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex h-14 w-56 items-center justify-center rounded-md border border-white/15 bg-black/70 px-3 py-2 shadow-lg shadow-black/20 ring-1 ring-white/10",
        className
      )}
    >
      <Image
        src="/mahindra-logo-full.png"
        alt="Mahindra logo"
        width={485}
        height={140}
        className="h-full w-full object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}
