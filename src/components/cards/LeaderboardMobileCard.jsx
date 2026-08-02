export default function LeaderboardMobileCard({
  item,
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
            ⭐ SIRO Score
          </div>

          <div className="font-semibold text-sky-400">
            {item.points}
          </div>

        </div>

      </div>

      <div className="mt-4 text-xl font-semibold text-sky-400">
        {item.alliance}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">

        <div>

          <div className="text-xs text-slate-400">
            MGMs
          </div>

          <div className="font-semibold">
            {item.mgms}
          </div>

        </div>

        <div>

          <div className="text-xs text-slate-400">
            Wins
          </div>

          <div className="font-semibold">
            {item.wins}
          </div>

        </div>

        <div>

          <div className="text-xs text-slate-400">
            Win Rate
          </div>

          <div className="font-semibold">
            {item.winRate.toFixed(1)}%
          </div>

        </div>

      </div>

    </div>
  );
}