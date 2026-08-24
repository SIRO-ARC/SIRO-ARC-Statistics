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