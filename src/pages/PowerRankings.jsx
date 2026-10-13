
import RankingsUpdating from "../components/RankingsUpdating";

/*
import RankingPage from "../components/rankings/RankingPage";

export default function PowerRankings() {
  return (
    <RankingPage
      title="Power Rankings"
      views={[
        {
          value: "players",
          label: "Players",
          icon: "👤",
        },
        {
          value: "alliances",
          label: "Alliances",
          icon: "🏰",
        },
      ]}
    />
  );
}
*/

export default function PowerRankings() {
  return <RankingsUpdating />;
}
