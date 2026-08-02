import LeaderboardMobileCard from "../cards/LeaderboardMobileCard";
export default function LeaderboardTable({
  data,
}) {

  

  return (
    <>
  {/* Mobile */}
  <div className="mt-8 space-y-4 lg:hidden">

    {data.map((item) => (

      <LeaderboardMobileCard
        key={item.rank}
        item={item}
      />

    ))}

  </div>

  {/* Desktop */}
<div className="hidden lg:block">

<div className="mt-12 overflow-hidden rounded-2xl border border-slate-800">

      <table className="w-full">

        <thead className="bg-slate-900">

          <tr>
  <th className="p-4 text-left">Rank</th>
  <th className="p-4 text-left">Alliance</th>
  <th className="p-4 text-left">Server</th>
  <th className="p-4 text-right">MGMs</th>
  <th className="p-4 text-right">Wins</th>
  <th className="p-4 text-right">Win Rate</th>
  <th className="p-4 text-right">Points</th>
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

  <td className="p-4 font-semibold text-sky-400">
    {item.alliance}
  </td>

  <td className="p-4">
    {item.server}
  </td>

  <td className="p-4 text-right">
    {item.mgms}
  </td>

  <td className="p-4 text-right">
    {item.wins}
  </td>

  <td className="p-4 text-right">
    {item.winRate.toFixed(1)}%
  </td>

  <td className="p-4 text-right font-semibold text-sky-400">
    {item.points}
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