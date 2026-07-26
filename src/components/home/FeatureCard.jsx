export default function FeatureCard({
  emoji,
  title,
  value,
  featured = false,
}) {
  return (
<div
  className={`
    rounded-2xl text-center transition duration-200 hover:-translate-y-1
    ${
      featured
        ? "border border-sky-500 bg-slate-900 py-6 px-6 shadow-xl shadow-sky-500/20 sm:py-8 sm:px-8"
        : "min-h-[130px] border border-slate-700 bg-slate-900 p-4 shadow-lg hover:border-sky-500 hover:shadow-sky-500/10 sm:min-h-[170px] sm:p-8"
    }
  `}
>      {featured ? (
  <>
    <div className="flex items-center justify-center gap-4">
      <div className="text-2xl sm:text-5xl">
        {emoji}
      </div>

      <p className="text-lg font-medium uppercase tracking-[0.25em] text-sky-300">
        {title}
      </p>
    </div>

    <p className="mt-4 text-6xl font-bold text-white sm:text-7xl">
      {value}
    </p>
  </>
) : (
  <>
    <div className="text-2xl sm:text-5xl">
      {emoji}
    </div>

    <p className="mt-3 break-words text-3xl font-bold text-white sm:mt-4 sm:text-5xl">
      {value}
    </p>

    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400 sm:mt-2 sm:text-sm">
      {title}
    </p>
  </>
)}
    </div>
  );
}