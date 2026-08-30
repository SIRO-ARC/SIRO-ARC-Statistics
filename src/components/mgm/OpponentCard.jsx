export default function OpponentCard({ opponent }) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 transition-all hover:border-gray-500 hover:bg-gray-700">

      <h4 className="mb-3 text-lg font-bold text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]">
        {opponent.alliance}
      </h4>

      <div
  className={
    opponent.division
      ? "grid grid-cols-2 gap-4 text-sm"
      : "grid grid-cols-3 gap-4 text-sm"
  }
>

        <div className="flex flex-col">
  <span className="text-gray-400">
    Server
  </span>

  <span className="font-medium text-white">
    {opponent.server}
  </span>
</div>

{opponent.division && (
  <div className="flex flex-col">
    <span className="text-gray-400">
      Division
    </span>

    <span className="font-medium text-white">
      {opponent.division}
    </span>
  </div>
)}

<div className="flex flex-col">
  <span className="text-gray-400">
    Captured
  </span>

  <span className="font-medium text-white">
    {opponent.captured}
  </span>
</div>

        <div className="flex flex-col">
          <span className="text-gray-400">
            Participants
          </span>

          <span className="font-medium text-white">
            {opponent.participants}
          </span>
        </div>

      </div>

    </div>
  );
}