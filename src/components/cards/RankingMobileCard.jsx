import { Link } from "react-router-dom";

export default function RankingMobileCard({
  item,
  view,
  selectedWeek,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-start justify-between">

        <div>
          <div className="text-lg font-bold">
            #{item.rank}
          </div>

          <div className="mt-1 text-sm text-slate-400">
            🌍 Server {item.server}
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-slate-400">
            ⚡ Power
          </div>

          <div className="font-semibold">
            {item.power.toLocaleString()}
          </div>
        </div>

      </div>

      <Link
        to={`/${
          view === "players"
            ? "player"
            : "alliance"
        }/${encodeURIComponent(
          selectedWeek
        )}/${encodeURIComponent(item.name)}`}
        className="mt-4 block text-lg font-semibold text-sky-400 hover:text-sky-300"
      >
        {item.name}
      </Link>

      <div className="mt-1 text-slate-400">
        {item.tag ?? "-"}
      </div>
    </div>
  );
}