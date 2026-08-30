export default function WinnerCard({ winner }) {
  return (
    <div className="rounded-xl border-2 border-green-500 bg-green-900/20 p-5 shadow-lg">

      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">🏆</span>

        <div>
          <h3 className="text-2xl font-bold text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
            {winner.alliance}
          </h3>

          <p className="text-sm text-green-300">
            Winner
          </p>
        </div>
      </div>

      <div
  className={
    winner.division
      ? "grid grid-cols-2 gap-4"
      : "grid grid-cols-3 gap-4"
  }
>

        <div>
  <p className="text-xs uppercase tracking-wide text-gray-400">
    Server
  </p>

  <p className="mt-1 text-lg font-semibold text-white">
    {winner.server}
  </p>
</div>

{winner.division && (
  <div>
    <p className="text-xs uppercase tracking-wide text-gray-400">
      Division
    </p>

    <p className="mt-1 text-lg font-semibold text-white">
      {winner.division}
    </p>
  </div>
)}

<div>
  <p className="text-xs uppercase tracking-wide text-gray-400">
    Captured
  </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {winner.captured}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Participants
          </p>

          <p className="mt-1 text-lg font-semibold text-white">
            {winner.participants}
          </p>
        </div>

      </div>

    </div>
  );
}