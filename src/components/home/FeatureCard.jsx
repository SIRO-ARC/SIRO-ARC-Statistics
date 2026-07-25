export default function FeatureCard({
  emoji,
  title,
  value,
}) {
  return (
<div className="min-h-[220px] rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-lg transition duration-200 hover:-translate-y-1 hover:border-sky-500 hover:shadow-sky-500/10">      <div className="text-5xl">
        {emoji}
      </div>

      <p className="mt-4 text-5xl font-bold text-white break-words">
        {value}
      </p>

      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">
        {title}
      </p>

    </div>
  );
}