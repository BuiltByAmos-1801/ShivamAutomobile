export default function Loading() {
  return (
    <div className="container-pad py-12">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-40 animate-pulse rounded-lg bg-muted" />)}
      </div>
    </div>
  );
}
