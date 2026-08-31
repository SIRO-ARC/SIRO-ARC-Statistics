import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRankings } from "../services/rankingService";
import StatCard from "../components/ui/StatCard";
import SnapshotHeader from "../components/layout/SnapshotHeader";

export default function AllianceProfile() {
  const { category, week, name } = useParams();

  const decodedName = decodeURIComponent(name);

 const [alliance, setAlliance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlliance() {
      try {
        setLoading(true);
        const rankingType =
  category === "pvp"
    ? "pvp_alliances"
    : "alliances";

const rankings = await getRankings(
  rankingType,
  decodeURIComponent(week)
);


        const foundAlliance = rankings.find(
  (a) => a.name === decodedName
);

setLoading(false);
setAlliance(foundAlliance ?? null);
      } catch (error) {
        console.error(error);
      }
    }

    loadAlliance();
  }, [decodedName, week]);

  if (loading) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">
        Loading alliance...
      </h1>
    </div>
  );
}

if (!alliance) {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-4xl font-bold">
        Alliance not found
      </h1>
    </div>
  );
}

  return (
  <div className="mx-auto max-w-5xl p-6">

    <SnapshotHeader
      type="Alliance Snapshot"
      title={alliance.displayName}
      snapshot={decodeURIComponent(week)}
    />

    <div className="grid gap-6 text-center md:grid-cols-2">

      <StatCard
        icon="🏆"
        label="Rank"
        value={`#${alliance.rank}`}
      />

      <StatCard
        icon="🌍"
        label="Server"
        value={alliance.server}
      />

      <div className="md:col-span-2">
        <StatCard
          icon="⚡"
          label={category === "pvp" ? "Points" : "Power"}
          value={alliance.power.toLocaleString()}
        />
      </div>

    </div>

  </div>
);
}