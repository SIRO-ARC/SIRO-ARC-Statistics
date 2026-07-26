import { useEffect, useState } from "react";

import FeatureCard from "./FeatureCard";
import { getWeeks, getRankings } from "../../services/rankingService";

export default function Features() {
  const [latestWeek, setLatestWeek] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [allianceCount, setAllianceCount] = useState(0);
  const [serverCount, setServerCount] = useState(0);
  
const currentWeek =
  latestWeek.match(/CW\d+/)?.[0] || latestWeek;
  useEffect(() => {
  async function loadStats() {
    try {
      const weekData = await getWeeks();

      setLatestWeek(weekData.currentWeek);

      const [players, alliances] = await Promise.all([
  getRankings("players", weekData.currentWeek),
  getRankings("alliances", weekData.currentWeek),
]);

      setPlayerCount(players.length);
      setAllianceCount(alliances.length);

      const uniqueServers = new Set(
        players.map((player) => player.server)
      );

      setServerCount(uniqueServers.size);

    } catch (error) {
      console.error(error);
    }
  }

  loadStats();
}, []);
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 pt-2 pb-10 sm:px-6 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6 lg:px-8 lg:pt-0 lg:pb-8">
<div className="col-span-full flex justify-center">
  <div className="w-full lg:w-4/5">
  <FeatureCard
    emoji="📅"
    title="Latest Ranking"
    value={currentWeek || "Loading..."}
    featured
  />
</div>
</div>

<div className="col-span-full flex justify-center">
  <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 lg:w-4/5 lg:gap-6">
    <FeatureCard
      emoji="👤"
      title="Players"
      value={playerCount.toLocaleString()}
    />

    <FeatureCard
      emoji="🏰"
      title="Alliances"
      value={allianceCount.toLocaleString()}
    />

    <FeatureCard
      emoji="🌍"
      title="Servers"
      value={serverCount.toLocaleString()}
    />
  </div>
</div>

    </section>
  );
}