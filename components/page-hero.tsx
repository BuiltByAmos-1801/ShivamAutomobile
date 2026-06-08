export function PageHero({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-zinc-950 text-white">
      <div className="container-pad py-14">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-red-300">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-zinc-300">{children}</div>}
      </div>
    </section>
  );
}
