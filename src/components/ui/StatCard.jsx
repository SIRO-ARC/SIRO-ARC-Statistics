export default function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-wider text-slate-400">
        {icon} {label}
      </p>

      <p className="mt-2 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}