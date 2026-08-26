import { Link } from "react-router-dom";

export default function RankingMobileCard({
  item,
  view,
  selectedWeek,
  mode = "ranking",
  serverType,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex items-start justify-between">

        <div>
          <div className="text-lg font-bold">
  {mode === "history"
  ? item.week
  : `#${item.rank}`}
</div>

          <div className="mt-1 text-sm text-slate-400">
  🌍 Server{" "}
  {mode === "server" ? (
    <span className="font-semibold text-sky-400">
      {item.server}
    </span>
  ) : (
    item.server
  )}
</div>
        </div>

        <div className="text-right">

  {mode === "server" ? (

  <>
    <div className="text-sm text-slate-400">
      {serverType === "alliance-power"
        ? "🛡️ Alliances"
        : "👥 Players"}
    </div>

    <div className="font-semibold">
      {serverType === "alliance-power" ||
serverType === "alliance-pvp"
  ? item.alliances.toLocaleString()
  : item.players.toLocaleString()}
    </div>
  </>

) : (

    <>
      <div className="text-sm text-slate-400">
        {selectedWeek.startsWith("Global PVP")
          ? "⚔️ Points"
          : selectedWeek.startsWith("Global Gathering")
            ? "🌾 Resources"
            : "⚡ Power"}
      </div>

      <div className="font-semibold">
        {item.power.toLocaleString()}
      </div>
    </>

  )}

</div>

      </div>

      {mode === "server" ? (

  <div className="mt-4 border-t border-slate-800 pt-4">

    <div className="flex items-center justify-between">

      <div className="text-sm text-slate-400">
  {serverType === "alliance-power"
  ? "Server Alliance Power"
  : serverType === "player-pvp"
    ? "Server Player PvP Points"
    : serverType === "alliance-pvp"
      ? "Server Alliance PvP Points"
      : serverType === "player-gathering"
        ? "Server Gathering Points"
        : "Server Player Power"}
</div>

<div className="font-semibold text-sky-400">
  {serverType === "player-pvp" ||
  serverType === "alliance-pvp"
    ? item.points.toLocaleString()
    : item.power.toLocaleString()}
</div>

    </div>

  </div>

) : mode === "history" ? (

  <div className="mt-4 text-lg font-semibold text-white">
    {item.displayName}
  </div>

) : (

  <Link
    to={`/${
      view === "players"
        ? "player"
        : "alliance"
    }/${
      selectedWeek.startsWith("Global PVP")
        ? "pvp"
        : selectedWeek.startsWith("Global Gathering")
          ? "gathering"
          : ""
    }${
      selectedWeek.startsWith("Global PVP") ||
      selectedWeek.startsWith("Global Gathering")
        ? "/"
        : ""
    }${encodeURIComponent(selectedWeek)}/${encodeURIComponent(item.name)}`}
    className="mt-4 block text-lg font-semibold text-sky-400 hover:text-sky-300"
  >
    {item.name}
  </Link>

)}

{mode !== "server" && (

  <div className="mt-1 text-slate-400">
    {mode === "history"
      ? `Rank #${item.rank}`
      : item.tag ?? "-"}
  </div>

)}
    </div>
  );
}