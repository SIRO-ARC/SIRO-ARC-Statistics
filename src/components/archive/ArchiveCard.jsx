import { Link } from "react-router-dom";

export default function ArchiveCard({ week }) {
  return (
    <Link
      to={`/rankings?week=${encodeURIComponent(week)}`}
      className="group block rounded-xl border border-slate-700 bg-slate-900 p-6 transition-all duration-200 hover:border-sky-400 hover:bg-slate-800"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            📅 {week}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Browse player and alliance rankings from this snapshot.
          </p>
        </div>

        <span className="text-sky-400 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}