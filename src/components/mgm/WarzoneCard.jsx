import WinnerCard from "./WinnerCard";
import OpponentCard from "./OpponentCard";
import { formatDate } from "../../utils/formatDate";

export default function WarzoneCard({ match }) {

  const totalParticipants =
  (Number(match.winner?.participants) || 0) +
  match.opponents.reduce(
    (total, opponent) =>
      total + (Number(opponent.participants) || 0),
    0
  );

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">

  <div>
    <h2 className="text-2xl font-bold text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
  Warzone {match.warzone}
</h2>

    <p className="mt-1 text-sm text-gray-400">
      📅 {formatDate(match.date)} • 🕒 {match.time}
    </p>
  </div>

  <div className="text-right">
  <p className="text-xs uppercase tracking-wide text-gray-400">
  TOTAL <span className="text-base">👥</span>
</p>

  <p className="mt-1 text-lg font-semibold text-white">
    {totalParticipants}
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