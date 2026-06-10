import type { ReactNode } from "react";

export function PageHero({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 mesh-panel opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,.96),rgba(24,24,27,.78),rgba(9,9,11,.9))]" />
      <div className="container-pad page-hero-inner relative py-14 sm:py-16 lg:py-20">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-red-200">{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">{children}</div>}
      </div>
    </section>
  );
}
