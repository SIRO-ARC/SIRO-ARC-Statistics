import WinnerCard from "./WinnerCard";
import OpponentCard from "./OpponentCard";

export default function WarzoneCard({ match }) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">

        <div>
          <h2 className="text-2xl font-bold text-white">
            🌍 Warzone {match.warzone}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
  📅 {new Date(match.date).toLocaleDateString("en-US")} • 🕒 {match.time}
</p>
        </div>

      </div>

      {/* Winner */}

      <>
  {
  
}

  {match.winner ? (
  <WinnerCard winner={match.winner} />
) : (
  <div className="rounded-xl border border-red-500 bg-red-900/20 p-4 text-red-300">
    ❌ No winner! (Warzone {match.warzone}, {match.time})
  </div>
)}
</>

      {/* Opponents */}

      <div className="mt-8">

        <h3 className="mb-4 text-lg font-semibold text-white">
          ⚔ Opponents
        </h3>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {match.opponents.map((opponent) => (

            <OpponentCard
              key={`${match.warzone}-${opponent.server}-${opponent.alliance}`}
              opponent={opponent}
            />

          ))}

        </div>

      </div>

    </div>
  );
}