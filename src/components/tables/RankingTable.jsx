import { Link } from "react-router-dom";
import RankingMobileCard from "../cards/RankingMobileCard";
export default function RankingTable({
  data,
  selectedWeek,
  view,
  sortField,
  sortDirection,
  onSort,
  mode = "ranking",
  serverType,
}) {

  

  return (
    <>
  {/* Mobile */}
  <div className="mt-8 space-y-4 lg:hidden">
    {data.map((item) => (
      <RankingMobileCard
  key={item.rank}
  item={item}
  view={view}
  selectedWeek={selectedWeek}
  mode={mode}
  serverType={serverType}
/>
    ))}
  </div>

  {/* Desktop */}
<div className="hidden lg:block">

<div className="mt-12 overflow-hidden rounded-2xl border border-slate-800">

      <table className="w-full">

        <thead className="bg-slate-900">

  <tr>

    <th
      className="cursor-pointer p-4 text-left select-none"
      onClick={() => onSort("rank")}
    >
      {mode === "history" ? "Week" : "Rank"}{" "}
      {mode !== "history" &&
        sortField === "rank" &&
        (sortDirection === "asc" ? "▲" : "▼")}
    </th>


    <th
      className="cursor-pointer p-4 text-left select-none"
      onClick={() => onSort("server")}
    >
      Server{" "}
      {sortField === "server" &&
        (sortDirection === "asc" ? "▲" : "▼")}
    </th>


    {mode === "server" ? (

  <th
    className="cursor-pointer p-4 text-right select-none"
    onClick={() =>
      onSort(
        serverType === "alliance-power"
          ? "alliances"
          : "players"
      )
    }
  >
    {serverType === "alliance-power"
      ? "Alliances"
      : "Players"}{" "}
    {sortField ===
      (serverType === "alliance-power"
        ? "alliances"
        : "players") &&
      (sortDirection === "asc"
        ? "▲"
        : "▼")}
  </th>

) : (

      <th
        className="cursor-pointer p-4 text-left select-none"
        onClick={() => onSort("name")}
      >
        {mode === "history"
          ? "Player"
          : view === "players"
            ? "Player"
            : "Alliance"}{" "}
        {sortField === "name" &&
          (sortDirection === "asc" ? "▲" : "▼")}
      </th>

    )}


    {mode !== "server" && (

      <th
        className="cursor-pointer p-4 text-left select-none"
        onClick={() => onSort("tag")}
      >
        {mode === "history"
          ? "Rank"
          : view === "players"
            ? "Alliance"
            : "Tag"}{" "}
        {sortField === "tag" &&
          (sortDirection === "asc" ? "▲" : "▼")}
      </th>

    )}


    {mode === "server" ? (

  <th className="p-4 text-right select-none">
    {serverType === "alliance-power"
  ? "Combined Alliance Power"
  : serverType === "player-pvp"
    ? "Combined Player PvP Points"
    : serverType === "alliance-pvp"
      ? "Combined Alliance PvP Points"
      : "Combined Player Power"}
  </th>

) : (

  <th
    className="cursor-pointer p-4 text-right select-none"
    onClick={() => onSort("power")}
  >
    {selectedWeek.startsWith("Global PVP")
      ? "Points"
      : selectedWeek.startsWith("Global Gathering")
        ? "Resources"
        : "Power"}{" "}
    {sortField === "power" &&
      (sortDirection === "asc" ? "▲" : "▼")}
  </th>

)}

  </tr>

</thead>

        <tbody>

          {data.map((item) => (

            <tr
  key={item.rank}
  className="border-t border-slate-800 hover:bg-slate-900"
>

  <td className="p-4 font-bold">
    {mode === "history"
      ? item.week
      : `#${item.rank}`}
  </td>


  <td className="p-4">
  {mode === "server" ? (
    <span className="font-semibold text-sky-400">
      {item.server}
    </span>
  ) : (
    item.server
  )}
</td>


  {mode === "server" ? (

    <td className="p-4 text-right">
  {serverType === "alliance-power" ||
serverType === "alliance-pvp"
  ? item.alliances.toLocaleString()
  : item.players.toLocaleString()}
</td>

  ) : (

    <td className="p-4">

      {mode === "history" ? (

        item.displayName

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
          className="text-sky-400 hover:text-sky-300 hover:underline transition"
        >
          {item.name}
        </Link>

      )}

    </td>

  )}


  {mode !== "server" && (

    <td className="p-4">

      {mode === "history"
        ? `#${item.rank}`
        : item.tag ?? "-"}

    </td>

  )}


  <td
  className={`p-4 text-right ${
    mode === "server"
      ? "font-semibold text-sky-400"
      : ""
  }`}
>
  {serverType === "player-pvp" ||
serverType === "alliance-pvp"
  ? item.points.toLocaleString()
  : item.power.toLocaleString()}
</td>

</tr>

          ))}

        </tbody>

      </table>

        </div>
  </div>
</>

  );

}