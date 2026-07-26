import { Link } from "react-router-dom";
import RankingMobileCard from "../cards/RankingMobileCard";
export default function RankingTable({
  data,
  selectedWeek,
  view,
  sortField,
  sortDirection,
  onSort,
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
  Rank {sortField === "rank" && (sortDirection === "asc" ? "▲" : "▼")}
</th>
  <th
  className="cursor-pointer p-4 text-left select-none"
  onClick={() => onSort("server")}
>
  Server {sortField === "server" && (sortDirection === "asc" ? "▲" : "▼")}
</th>
  <th
  className="cursor-pointer p-4 text-left select-none"
  onClick={() => onSort("name")}
>
  {view === "players" ? "Player" : "Alliance"}{" "}
  {sortField === "name" && (sortDirection === "asc" ? "▲" : "▼")}
</th>
  <th
  className="cursor-pointer p-4 text-left select-none"
  onClick={() => onSort("tag")}
>
  {view === "players" ? "Alliance" : "Tag"}{" "}
  {sortField === "tag" && (sortDirection === "asc" ? "▲" : "▼")}
</th>
  <th
  className="cursor-pointer p-4 text-right select-none"
  onClick={() => onSort("power")}
>
  Power {sortField === "power" && (sortDirection === "asc" ? "▲" : "▼")}
</th>

</tr>

        </thead>

        <tbody>

          {data.map((item) => (

            <tr
              key={item.rank}
              className="border-t border-slate-800 hover:bg-slate-900"
            >

              <td className="p-4 font-bold">
                #{item.rank}
              </td>

              <td className="p-4">
                {item.server}
              </td>

              <td className="p-4">
  <Link
  to={`/${
    view === "players" ? "player" : "alliance"
  }/${encodeURIComponent(selectedWeek)}/${encodeURIComponent(item.name)}`}
  className="text-sky-400 hover:text-sky-300 hover:underline transition"
>
  {item.name}
</Link>
</td>

              <td className="p-4">
  {item.tag ?? "-"}
</td>

              <td className="p-4 text-right">
                {item.power.toLocaleString()}
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