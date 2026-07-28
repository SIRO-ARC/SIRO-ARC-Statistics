import { useEffect, useState } from "react";
import { getRankings, getWeeks } from "../services/rankingService";
import PodiumBadge from "../components/top10/PodiumBadge";
import formatPower from "../utils/formatPower";

export default function Top10() {
  const [players, setPlayers] = useState([]);
  const [alliances, setAlliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
useEffect(() => {
  getWeeks()
    .then((data) => {
      setSelectedWeek(data.currentWeek);
    })
    .catch(console.error);
}, []);
  useEffect(() => {

  if (!selectedWeek) return;

  async function load() {

      try {
        const playerData = await getRankings("players", selectedWeek);
const allianceData = await getRankings("alliances", selectedWeek);

        setPlayers(playerData.slice(0, 10));
        setAlliances(allianceData.slice(0, 10));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [selectedWeek]);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-8">

      <h1 className="text-4xl font-bold">
        🏆 Top 10
      </h1>

      <p className="mt-2 text-gray-400">
        Live Ranking Data
      </p>

      {loading ? (
        <p className="mt-8 text-gray-400">
          Loading...
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

  <div className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-900 p-6">

    <h2 className="mb-8 text-center text-3xl font-bold text-blue-400">
      PLAYER POWER
    </h2>

    <div className={`mt-5 mb-5 flex items-end justify-center ${isMobile ? "gap-2" : "gap-4"}`}>

  {/* Platz 2 */}
  <PodiumBadge
  place={2}
  name={players[1]?.name}
  tag={players[1]?.tag}
  server={players[1]?.server}
  power={players[1]?.power}
  width={isMobile ? 100 : 195}
  height={isMobile ? 170 : 240}
  color={{
    border: "border-slate-400",
    gradient: "from-slate-300/15 to-slate-900",
    glow: "shadow-[0_0_25px_rgba(220,220,220,0.25)]",
    text: "text-slate-200",
  }}
/>

  {/* Platz 1 */}
  <PodiumBadge
  place={1}
  name={players[0]?.name}
  tag={players[0]?.tag}
  server={players[0]?.server}
  power={players[0]?.power}
  width={isMobile ? 120 : 235}
  height={isMobile ? 200 : 285}
  color={{
    border: "border-yellow-500",
    gradient: "from-yellow-500/20 to-slate-900",
    glow: "shadow-[0_0_35px_rgba(234,179,8,0.45)]",
    text: "text-yellow-300",
  }}
/>

  {/* Platz 3 */}
  <PodiumBadge
  place={3}
  name={players[2]?.name}
  tag={players[2]?.tag}
  server={players[2]?.server}
  power={players[2]?.power}
  width={isMobile ? 100 : 195}
  height={isMobile ? 170 : 240}
  color={{
    border: "border-amber-700",
    gradient: "from-amber-600/15 to-slate-900",
    glow: "shadow-[0_0_25px_rgba(180,110,40,0.25)]",
    text: "text-orange-400",
  }}
/>

</div>
<div className="mt-8 border-t border-slate-700 pt-4">

  {players.slice(3, 10).map((player) => (

    <div
      key={player.rank}
      className="mb-2 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/40 px-4 py-3 transition hover:border-blue-500 hover:bg-slate-800"
    >

      <div className="flex items-center gap-4">

        <div className="w-8 text-lg font-bold text-slate-400">
          #{player.rank}
        </div>

        <div>

          <div className="font-semibold text-white">
            {player.name}
          </div>

          <div className="text-sm text-slate-400">
            [{player.tag}] • S{player.server}
          </div>

        </div>

      </div>

      <div className="text-lg font-bold text-white">
        {formatPower(player.power)}
      </div>

    </div>

  ))}

</div>

  </div>

  <div className="flex h-full flex-col rounded-2xl border border-slate-700 bg-slate-900 p-6">

    <h2 className="mb-8 text-center text-3xl font-bold text-red-400">
      ALLIANCE POWER
    </h2>

    <div className={`mt-5 mb-5 flex items-end justify-center ${isMobile ? "gap-2" : "gap-4"}`}>

  {/* Platz 2 */}
  <PodiumBadge
  place={2}
  name={`[${alliances[1]?.tag}]`}
  server={alliances[1]?.server}
  power={alliances[1]?.power}
  width={isMobile ? 100 : 195}
  height={isMobile ? 170 : 240}
  color={{
    border: "border-slate-400",
    gradient: "from-slate-300/15 to-slate-900",
    glow: "shadow-[0_0_25px_rgba(220,220,220,0.25)]",
    text: "text-slate-200",
  }}
/>

  {/* Platz 1 */}
  <PodiumBadge
  place={1}
  name={`[${alliances[0]?.tag}]`}
server={alliances[0]?.server}
power={alliances[0]?.power}
  width={isMobile ? 120 : 235}
  height={isMobile ? 200 : 285}
  color={{
    border: "border-yellow-500",
    gradient: "from-yellow-500/20 to-slate-900",
    glow: "shadow-[0_0_35px_rgba(234,179,8,0.45)]",
    text: "text-yellow-300",
  }}
/>

  {/* Platz 3 */}
  <PodiumBadge
  place={3}
  name={`[${alliances[2]?.tag}]`}
server={alliances[2]?.server}
power={alliances[2]?.power}
  width={isMobile ? 100 : 195}
  height={isMobile ? 170 : 240}
  color={{
    border: "border-amber-700",
    gradient: "from-amber-600/15 to-slate-900",
    glow: "shadow-[0_0_25px_rgba(180,110,40,0.25)]",
    text: "text-orange-400",
  }}
/>

</div>
<div className="mt-8 border-t border-slate-700 pt-4">

  {alliances.slice(3, 10).map((alliance) => (

    <div
      key={alliance.rank}
      className="mb-2 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/40 px-4 py-3 transition hover:border-red-500 hover:bg-slate-800"
    >

      <div className="flex items-center gap-4">

        <div className="w-8 text-lg font-bold text-slate-400">
          #{alliance.rank}
        </div>

        <div>

          <div className="font-semibold text-white">
            [{alliance.tag}]
          </div>

          <div className="text-sm text-slate-400">
            S{alliance.server}
          </div>

        </div>

      </div>

      <div className="text-lg font-bold text-white">
        {formatPower(alliance.power)}
      </div>

    </div>

  ))}

</div>

  </div>

</div>
      )}

    </div>
  );
}