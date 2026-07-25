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

      const players = await getRankings(
        "players",
        weekData.currentWeek
      );

      const alliances = await getRankings(
        "alliances",
        weekData.currentWeek
      );

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
    <section className="mx-auto grid max-w-7xl gap-8 px-8 py-20 md:grid-cols-2 lg:grid-cols-4">

<FeatureCard
  emoji="📅"
  title="Latest Ranking"
  value={currentWeek || "Loading..."}
/>

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

    </section>
  );
}