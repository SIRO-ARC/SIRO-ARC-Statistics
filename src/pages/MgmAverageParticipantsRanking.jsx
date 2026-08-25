import { useEffect, useMemo, useState } from "react";
import PoweredBy from "../components/home/PoweredBy";
import MgmRankingTable from "../components/mgm/MgmRankingTable";
import Pagination from "../components/pagination/Pagination";
import { getMgmLeaderboard } from "../services/leaderboardService";
import { generateMgmAverageParticipantsRankingPdf } from "../pdf/generateMgmAverageParticipantsRankingPdf";

export default function MgmAverageParticipantsRanking() {
  const [dataset, setDataset] = useState("pre");
  const [mgmData, setMgmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 100;

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        const data = await getMgmLeaderboard(dataset);
        setMgmData(data || []);
      } catch (error) {
        console.error(error);
        setMgmData([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [dataset]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, dataset]);

  const ranking = useMemo(() => {
    const grouped = {};

    mgmData.forEach((entry) => {
      const allianceId = entry.id;

      if (!grouped[allianceId]) {
        grouped[allianceId] = {
          id: allianceId,
          alliance: entry.alliance,
          server: entry.server,
          participants: 0,
          mgms: 0,
          oldestDate: entry.date,
          latestDate: entry.date,
        };
      }

      grouped[allianceId].participants += Number(
        entry.participants || 0
      );

      grouped[allianceId].mgms += 1;

      if (
        new Date(entry.date) <
        new Date(grouped[allianceId].oldestDate)
      ) {
        grouped[allianceId].oldestDate = entry.date;
      }

      if (
        new Date(entry.date) >=
        new Date(grouped[allianceId].latestDate)
      ) {
        grouped[allianceId].latestDate = entry.date;
        grouped[allianceId].server = entry.server;
        grouped[allianceId].alliance = entry.alliance;
      }
    });

    return Object.values(grouped)
      .map((entry) => ({
        ...entry,
        averageParticipants:
          entry.mgms > 0
            ? entry.participants / entry.mgms
            : 0,
      }))
      .sort((a, b) => {
        const averageDifference =
          b.averageParticipants -
          a.averageParticipants;

        if (averageDifference !== 0) {
          return averageDifference;
        }

        return (
          new Date(a.oldestDate) -
          new Date(b.oldestDate)
        );
      })
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
        key: entry.id,
      }));
  }, [mgmData]);

  const filteredRanking = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return ranking;
    }

    return ranking.filter((item) => {
      return (
        item.alliance?.toLowerCase().includes(searchText) ||
        String(item.server ?? "").includes(searchText)
      );
    });
  }, [ranking, search]);

  const totalPages = Math.ceil(
    filteredRanking.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex =
    startIndex + ITEMS_PER_PAGE;

  const paginatedRanking = filteredRanking.slice(
    startIndex,
    endIndex
  );

  const showingFrom =
    filteredRanking.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    endIndex,
    filteredRanking.length
  );

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  const columns = [
    {
      key: "rank",
      label: "Rank",
      render: (row) => (
        <span className="font-bold">
          #{row.rank}
        </span>
      ),
    },

    {
      key: "server",
      label: "Server",
      render: (row) => (
        <span>{row.server}</span>
      ),
    },

    {
      key: "alliance",
      label: "Alliance",
      render: (row) => (
        <span className="font-semibold text-sky-400">
          {row.alliance}
        </span>
      ),
    },

    {
      key: "mgms",
      label: "MGM Played",
      align: "right",
      render: (row) => (
        <span>
          {row.mgms.toLocaleString()}
        </span>
      ),
    },

    {
      key: "participants",
      label: "Total Participants",
      align: "right",
      render: (row) => (
        <span>
          {row.participants.toLocaleString()}
        </span>
      ),
    },

    {
      key: "averageParticipants",
      label: "Average",
      align: "right",
      render: (row) => (
        <span className="font-bold text-sky-400">
          {row.averageParticipants.toFixed(1)}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">

        <h1 className="text-5xl font-bold">
          Average Participants
        </h1>

        <p className="mt-3 text-slate-400">
          Rank alliances by their average participant count across
          historical MGM events.
        </p>

        <div className="mt-10">

          {/* Dataset */}

          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() => setDataset("pre")}
              className={`rounded-xl px-5 py-2 font-semibold transition ${
                dataset === "pre"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              🛡️ Pre-Migration
            </button>

            <button
              onClick={() => setDataset("post")}
              className={`rounded-xl px-5 py-2 font-semibold transition ${
                dataset === "post"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              🌍 Post-Migration
            </button>

          </div>

          {/* Search + Download */}

          <div className="mt-4 flex flex-col gap-4 lg:flex-row">

            <input
              type="text"
              placeholder="🔍 Search alliance or server..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <button
              onClick={() =>
                generateMgmAverageParticipantsRankingPdf(
                  filteredRanking,
                  dataset
                )
              }
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              📄 Download PDF
            </button>

          </div>

          <p className="mt-3 text-sm text-slate-400">
            {search.trim() ? (
              <>
                🔍 {filteredRanking.length} matching alliances
              </>
            ) : (
              <>
                {ranking.length} alliances
              </>
            )}
          </p>

        </div>

        <MgmRankingTable
          columns={columns}
          data={paginatedRanking}
          loading={loading}
        />

        <div className="mt-4 text-center text-sm text-slate-400">
          Showing {showingFrom}–{showingTo} of{" "}
          {filteredRanking.length.toLocaleString()} alliances
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          onPageChange={handlePageChange}
        />

      </div>

      <PoweredBy />
    </>
  );
}