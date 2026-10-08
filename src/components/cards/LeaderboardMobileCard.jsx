export default function LeaderboardMobileCard({
  item,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-1 text-lg font-bold">
            <span>#{item.rank}</span>
            {item.rankChange > 0 && (
              <span className="text-xs font-medium text-emerald-400">
                ▲ {item.rankChange}
              </span>
            )}
            {item.rankChange < 0 && (
              <span className="text-xs font-medium text-red-400">
                ▼ {Math.abs(item.rankChange)}
              </span>
            )}
          </div>

          <div className="mt-1 text-sm text-slate-400">
            🌍 Server {item.server}
          </div>

        </div>

        <div className="text-right">

          <div className="text-sm text-slate-400">
            ⭐ SIRO Score
          </div>

          <div className="flex items-center justify-end gap-1 font-semibold text-sky-400">
            <span>{item.points}</span>
            {item.pointsChange > 0 && (
              <span className="text-xs font-medium text-emerald-400">
                +{item.pointsChange}
              </span>
            )}
            {item.pointsChange < 0 && (
              <span className="text-xs font-medium text-red-400">
                {item.pointsChange}
              </span>
            )}
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

          <div className="flex items-center justify-center gap-1 font-semibold">
            <span>{item.winRate.toFixed(1)}%</span>
            {item.winRateChange > 0 && (
              <span className="text-xs font-medium text-emerald-400">▲</span>
            )}
            {item.winRateChange < 0 && (
              <span className="text-xs font-medium text-red-400">▼</span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}