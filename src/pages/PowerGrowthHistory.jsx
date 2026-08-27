import { useEffect, useState } from "react";
import {
  getServers,
  getGrowthHistory,
  getPlayersByServer,
  getAllianceGrowthHistory,
} from "../services/rankingService";
import RankingTable from "../components/tables/RankingTable";
import { generateRankingPdf } from "../pdf/generateRankingPdf";

export default function PowerGrowthHistory() {
  const [historyType, setHistoryType] = useState("player");
  const [server, setServer] = useState("");
  const [search, setSearch] = useState("");

  const [servers, setServers] = useState([]);
  const [players, setPlayers] = useState([]);
const [filteredPlayers, setFilteredPlayers] = useState([]);
const [selectedPlayers, setSelectedPlayers] = useState([]);

const [alliances, setAlliances] = useState([]);
const [filteredAlliances, setFilteredAlliances] = useState([]);
const [selectedAlliances, setSelectedAlliances] = useState([]);

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

    console.log("Players loaded:", data.length);
    console.log(data.slice(0, 5));

    setPlayers(data);
    setFilteredPlayers(data);
    setPlayersLoaded(true);
  })
    .catch(console.error)
    .finally(() => {
      setLoadingPlayers(false);
    });

}, [server]);

useEffect(() => {
  if (!server) {
    setAlliances([]);
    setFilteredAlliances([]);
    return;
  }

  const loadAlliances = async () => {
    try {
      const weeksResponse = await fetch(
        "/api/weeks.json",
        {
          cache: "no-store",
        }
      );

      if (!weeksResponse.ok) {
        throw new Error(`HTTP ${weeksResponse.status}`);
      }

      const weeksData = await weeksResponse.json();

      const latestWeek =
        weeksData.currentWeek.replace(
          "Global Player/Alliance Ranking ",
          ""
        );

      const alliancesResponse = await fetch(
        `/api/alliances/${latestWeek}.json`,
        {
          cache: "no-store",
        }
      );

      if (!alliancesResponse.ok) {
        throw new Error(`HTTP ${alliancesResponse.status}`);
      }

      const data = await alliancesResponse.json();

      const serverAlliances = data.filter(
        (alliance) =>
          String(alliance.server) === String(server)
      );

      setAlliances(serverAlliances);
      setFilteredAlliances(serverAlliances);

    } catch (err) {
      console.error("Failed to load alliances:", err);
      setAlliances([]);
      setFilteredAlliances([]);
    }
  };

  loadAlliances();

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

  function handleAllianceSelect(alliance) {
  if (
    selectedAlliances.some(
      (a) => a.displayName === alliance.displayName
    )
  ) {
    return;
  }

  setSelectedAlliances((prev) => [...prev, alliance]);

  setSearch("");
  setFilteredAlliances(alliances);
}

function removeAlliance(displayName) {
  setSelectedAlliances((prev) =>
    prev.filter((a) => a.displayName !== displayName)
  );
}

  async function handleSearch() {

  setLoadingHistory(true);

  try {

    let data;

    if (historyType === "alliance") {

      data = await getAllianceGrowthHistory({
        alliances: selectedAlliances.map(
          (alliance) => alliance.displayName
        ),
      });

    } else {

      data = await getGrowthHistory({
        historyType,
        server,
        players: selectedPlayers.map(
          (player) => player.displayName
        ),
      });

    }

    setHistory(data);

  } catch (err) {

    console.error("Failed to generate history:", err);

  } finally {

    setLoadingHistory(false);

  }
}

async function handleDownloadPdf() {
  if (!history.length) return;

  const isAlliance = historyType === "alliance";

  const columns = [
    {
      key: "week",
      header: "Week",
      width: 65,
    },
    {
      key: "server",
      header: "Server",
      width: 55,
      align: "center",
    },
    {
      key: "displayName",
      header: isAlliance ? "Alliance" : "Player",
      width: "*",
      accent: true,
    },
    {
      key: "rank",
      header: "Rank",
      width: 55,
      align: "center",
    },
    {
      key: "power",
      header: "Power",
      width: 100,
      align: "right",
    },
  ];

  const title = isAlliance
  ? "Alliance Power Growth History"
  : "Player Power Growth History";

const subtitle = "";

  const filename = isAlliance
    ? "SIRO_Alliance_Power_Growth_History.pdf"
    : "SIRO_Player_Power_Growth_History.pdf";

  await generateRankingPdf({
  title,
  subtitle,
  columns,
  rankings: history,
  filename,
  highlightTopThree: false,
  tableMargin: [9.5, 12.5, 0, 0],
});
}

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Power Growth History
      </h1>
      <div className="mb-8 rounded-2xl border border-sky-500/40 bg-sky-500/10 p-6">

  <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-sky-300">
    📖 How to use
  </h2>

  <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">

  <li>
    Select <span className="font-semibold text-white">Player</span> or{" "}
    <span className="font-semibold text-white">Alliance</span>.
  </li>

  <li>
    Select the server you want to search.
  </li>

  <li>
    Search and select a player or alliance.
  </li>

  <li>
    If multiple name variations exist, select every relevant version.
  </li>

  <li>
    For migrated players or alliances, repeat the process for each relevant server.
  </li>

  <li>
    Click{" "}
    <span className="font-semibold text-white">
      Generate History
    </span>{" "}
    to display the power history.
  </li>

  <li>
    Click{" "}
    <span className="font-semibold text-white">
      Download PDF
    </span>{" "}
    to download the history in the SIRO STATS PDF format.
  </li>

</ol>

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
              onChange={(e) => {
  const type = e.target.value;

  setHistoryType(type);

  setServer("");
  setSearch("");
  setSelectedPlayers([]);
  setSelectedAlliances([]);
  setPlayers([]);
  setFilteredPlayers([]);
  setAlliances([]);
  setFilteredAlliances([]);
  setHistory([]);
}}
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

  {historyType === "player" ? (
    <>
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

    </>
  ) : (
    <>
      <label className="mb-2 block text-sm text-slate-400">
        Search Alliance
      </label>

      <input
        value={search}
        onChange={(e) => {
          const value = e.target.value;

          setSearch(value);

          if (!value.trim()) {
            setFilteredAlliances(alliances);
            return;
          }

          const filtered = alliances.filter((alliance) =>
            alliance.displayName
              .toLowerCase()
              .includes(value.toLowerCase())
          );

          setFilteredAlliances(filtered);
        }}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        placeholder={
          server
            ? `Search alliances from Server ${server}...`
            : "Select server first..."
        }
      />

      {search.trim() !== "" && filteredAlliances.length > 0 && (
        <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-slate-700 bg-slate-800">
          {filteredAlliances.slice(0, 10).map((alliance) => (
            <div
              key={alliance.displayName}
              onClick={() => handleAllianceSelect(alliance)}
              className="cursor-pointer border-b border-slate-700 px-4 py-2 text-white hover:bg-slate-700"
            >
              {alliance.displayName}
            </div>
          ))}
        </div>
      )}

      {selectedAlliances.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-slate-400">
            Selected Alliances
          </p>

          <div className="flex flex-wrap gap-2">
            {selectedAlliances.map((alliance) => (
              <div
                key={alliance.displayName}
                className="flex items-center gap-2 rounded-full bg-sky-600 px-3 py-1 text-sm text-white"
              >
                <span>{alliance.displayName}</span>

                <button
                  onClick={() =>
                    removeAlliance(alliance.displayName)
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

    </>
  )}

            {/* Buttons */}
<div className="mt-6 flex items-center justify-between">

  <button
    onClick={handleSearch}
    disabled={loadingHistory}
    className={`rounded-xl px-4 md:px-8 py-3 font-semibold text-white transition ${
      loadingHistory
        ? "cursor-not-allowed bg-slate-600 opacity-70"
        : "bg-sky-500 hover:bg-sky-400"
    }`}
  >
    {loadingHistory
      ? "⏳ Generating History..."
      : "Generate History"}
  </button>

  <button
    onClick={handleDownloadPdf}
    disabled={!history.length}
    className={`rounded-xl px-4 md:px-8 py-3 font-semibold text-white transition ${
      !history.length
        ? "cursor-not-allowed bg-slate-700 opacity-50"
        : "bg-sky-500 hover:bg-sky-400"
    }`}
  >
    📄 Download PDF
  </button>

</div>
          </div>

          

        </div>
      </div>

      {history.length > 0 && (
  <RankingTable
    mode="history"
    view={historyType === "alliance" ? "alliances" : "players"}
    highlightHistoryNames={true}
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