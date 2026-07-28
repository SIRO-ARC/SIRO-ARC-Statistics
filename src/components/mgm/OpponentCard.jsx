export default function OpponentCard({ opponent }) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-4 transition-all hover:border-gray-500 hover:bg-gray-700">

      <h4 className="mb-3 text-lg font-semibold text-white">
        {opponent.alliance}
      </h4>

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-400">
            Server
          </span>

          <span className="font-medium text-white">
            {opponent.server}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Captured
          </span>

          <span className="font-medium text-white">
            {opponent.captured}
          </span>
        </div>

        <div className="flex justify-between">
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