import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRankings } from "../services/rankingService";
import StatCard from "../components/ui/StatCard";
import SnapshotHeader from "../components/layout/SnapshotHeader";

export default function PlayerProfile() {
  const { category, week, name } = useParams();

  const decodedName = decodeURIComponent(name);

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayer() {
      try {
        setLoading(true);
        const rankingType =
  category === "pvp"
    ? "pvp_players"
    : category === "gathering"
      ? "gathering_players"
      : "players";

const rankings = await getRankings(
  rankingType,
  decodeURIComponent(week)
);


        const foundPlayer = rankings.find(
          (p) => p.name === decodedName
        );

        setLoading(false);
        setPlayer(foundPlayer ?? null);
      } catch (error) {
        console.error(error);
      }
    }

    loadPlayer();
  }, [decodedName, week]);

  if (loading) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">
        Loading player...
      </h1>
    </div>
  );
}

if (!player) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">
        Player not found
      </h1>
    </div>
  );
}

  return (
    <div className="mx-auto max-w-5xl p-6">
      <SnapshotHeader
  type="Player Snapshot"
  title={player.name}
  snapshot={decodeURIComponent(week)}
/>

  <div className="grid gap-6 md:grid-cols-2">

  <StatCard
    icon="🏆"
    label="Rank"
    value={`#${player.rank}`}
  />

  <StatCard
  icon="⚡"
  label={
    category === "pvp" || category === "gathering"
      ? "Points"
      : "Power"
  }
  value={player.power.toLocaleString()}
/>

  <StatCard
    icon="🌍"
    label="Server"
    value={player.server}
  />

  <StatCard
    icon="🏰"
    label="Alliance"
    value={player.tag}
  />

</div>

    </div>
  );
}