import RankingPage from "../components/rankings/RankingPage";

export default function GatheringRankings() {
  return (
    <RankingPage
      title="Gathering Rankings"
      dataType="gathering"
      views={[
        {
          value: "players",
          label: "Players",
          icon: "👤",
        },
      ]}
    />
  );
}