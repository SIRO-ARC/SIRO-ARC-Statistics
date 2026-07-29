import { useEffect, useState } from "react";
import {
  getServers,
  getGrowthHistory,
  getPlayersByServer,
} from "../services/rankingService";
import RankingTable from "../components/tables/RankingTable";

export default function PowerGrowthHistory() {
  const [historyType, setHistoryType] = useState("player");
  const [server, setServer] = useState("");
  const [search, setSearch] = useState("");

  const [servers, setServers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
const [playersLoaded, setPlayersLoaded] = useState(false);
const [loadingServers, setLoadingServers] = useState(true);

  useEffect(() => {
  setLoadingServers(true);

  getServers()
    .then((data) => {
      setServers(data);
    })
    .catch(console.error)
    .finally(() => {
      setLoadingServers(false);
    });
}, []);
  useEffect(() => {
  if (!server) {
    setPlayers([]);
    setFilteredPlayers([]);
    setPlayersLoaded(false);
    return;
  }

  setLoadingPlayers(true);
  setPlayersLoaded(false);

  getPlayersByServer(server)
    .then((data) => {
      setPlayers(data);
      setFilteredPlayers(data);
      setPlayersLoaded(true);
    })
    .catch(console.error)
    .finally(() => {
      setLoadingPlayers(false);
    });

}, [server]);

  function handlePlayerSelect(player) {
    if (
      selectedPlayers.some(
        (p) => p.displayName === player.displayName
      )
    ) {
      return;
    }

    setSelectedPlayers((prev) => [...prev, player]);

    setSearch("");
    setFilteredPlayers(players);
  }

  function removePlayer(displayName) {
    setSelectedPlayers((prev) =>
      prev.filter((p) => p.displayName !== displayName)
    );
  }

  async function handleSearch() {

  setLoadingHistory(true);

  console.log("Generate History clicked");

  console.log(
    selectedPlayers.map((player) => player.displayName)
  );

  try {
    const data = await getGrowthHistory({
      historyType,
      server,
      players: selectedPlayers.map(
        (player) => player.displayName
      ),
    });

    console.log("API Response:", data);

    setHistory(data);
    setLoadingHistory(false);

  } catch (err) {
    console.error("API ERROR:", err);

    setLoadingHistory(false);
  }
}

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Power Growth History
      </h1>
      <div className="mb-8 rounded-2xl border border-sky-500/40 bg-sky-500/10 p-6">

  <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-sky-300">
    🔬 Beta Feature
  </h2>

  <p className="mb-5 text-slate-300">
    <span className="font-semibold text-white">
      Power Growth History
    </span>{" "}
    is currently in Beta. Performance improvements and additional features are
    already in development.
  </p>

  <div className="grid gap-6 lg:grid-cols-2">

    <div>
      <h3 className="mb-2 font-semibold text-white">
        📖 How to use
      </h3>

      <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">

        <li>
          Wait until <span className="font-semibold text-white">Select Server</span> appears.
        </li>

        <li>
          Select a server and wait until{" "}
          <span className="font-semibold text-white">
            Search Player...
          </span>{" "}
          is available.
        </li>

        <li>
          Search and select your player.
        </li>

        <li>
          If multiple name variations exist on the same server, add every version.
        </li>

        <li>
          If the account migrated, repeat the process for each server.
        </li>

        <li>
          Click{" "}
          <span className="font-semibold text-white">
            Generate History
          </span>.
        </li>

        <li>
          ⏳ Generation currently takes about{" "}
          <span className="font-semibold text-white">
            10–15 seconds
          </span>.
        </li>

      </ol>
    </div>

    <div>

      <h3 className="mb-2 font-semibold text-white">
        🚧 Coming Soon
      </h3>

      <ul className="space-y-2 text-sm text-slate-300">

        <li>⚡ Faster loading times</li>

        <li>🛡️ Alliance Growth History</li>

        <li>📈 Power & Rank change tracking</li>

        <li>🎯 Advanced filtering</li>

        <li>📊 Charts & visual statistics</li>

      </ul>

    </div>

  </div>

</div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Type */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Type
            </label>

            <select
              value={historyType}
              onChange={(e) => setHistoryType(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              <option value="player">Player</option>
              <option value="alliance">Alliance</option>
            </select>
          </div>

          {/* Server */}
          <div>
            <label className="mb-2 block text-sm text-slate-400">
              Server
            </label>

            <select
              value={server}
              onChange={(e) => setServer(e.target.value)}
              disabled={loadingServers || loadingPlayers}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              <option value="">
  {loadingServers
    ? "Loading servers..."
    : "Select server..."}
</option>

              {servers.map((serverNumber) => (
                <option
                  key={serverNumber}
                  value={serverNumber}
                >
                  {serverNumber}
                </option>
              ))}
            </select>
          </div>
                    {/* Search */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-400">
              Search Player
            </label>

            <input
  value={search}
  disabled={loadingPlayers}
  onChange={(e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      setFilteredPlayers(players);
      return;
    }

    const filtered = players.filter((player) =>
      player.name
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredPlayers(filtered);
  }}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
              placeholder={
  loadingPlayers
    ? `Loading players from Server ${server}...`
    : "Search player..."
}
            />

            {search.trim() !== "" && filteredPlayers.length > 0 && (
              <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-700 bg-slate-800">
                {filteredPlayers.slice(0, 10).map((player) => (
                  <div
                    key={player.displayName}
                    onClick={() => handlePlayerSelect(player)}
                    className="cursor-pointer border-b border-slate-700 px-4 py-2 text-white hover:bg-slate-700"
                  >
                    <span className="font-semibold">
                      [{player.tag}]
                    </span>{" "}
                    {player.name}
                  </div>
                ))}
              </div>
            )}

            {selectedPlayers.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-sm text-slate-400">
                  Selected Players
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedPlayers.map((player) => (
                    <div
                      key={player.displayName}
                      className="flex items-center gap-2 rounded-full bg-sky-600 px-3 py-1 text-sm text-white"
                    >
                      <span>{player.displayName}</span>

                      <button
                        onClick={() =>
                          removePlayer(player.displayName)
                        }
                        className="font-bold hover:text-slate-200"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Button */}
          <div className="mt-6 flex justify-end">
  <button
  onClick={handleSearch}
  disabled={loadingHistory}
  className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
    loadingHistory
      ? "cursor-not-allowed bg-slate-600 opacity-70"
      : "bg-sky-500 hover:bg-sky-400"
  }`}
>
  {loadingHistory
    ? "⏳ Generating History..."
    : "Generate History"}
</button>
</div>
          </div>

          

        </div>
      </div>

      {history.length > 0 && (
  <RankingTable
    mode="history"
    view="players"
    selectedWeek=""
    sortField=""
    sortDirection="asc"
    onSort={() => {}}
    data={[...history].sort((a, b) => {
      const getOrder = (week) => {
        const number = Number(week.replace("CW", ""));

        if (number >= 50) {
          return number - 50;
        }

        return number + 2;
      };

      return getOrder(a.week) - getOrder(b.week);
    })}
  />
)}
    </div>
  );
}