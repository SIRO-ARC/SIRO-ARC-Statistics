export default function SnapshotHeader({
  type,
  title,
  snapshot,
}) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
        {type}
      </p>

      <h1 className="mt-2 text-5xl font-bold">
        {title}
      </h1>

      <p className="mt-4 mb-8 text-slate-400">
        📅 {snapshot}
      </p>
    </>
  );
}