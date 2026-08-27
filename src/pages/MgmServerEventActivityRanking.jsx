import { useEffect, useMemo, useState } from "react";
import PoweredBy from "../components/home/PoweredBy";
import MgmRankingTable from "../components/mgm/MgmRankingTable";
import { getMgmLeaderboard } from "../services/leaderboardService";
import { formatDate } from "../utils/formatDate";
import { generateMgmServerEventActivityRankingPdf } from "../pdf/generateMgmServerEventActivityRankingPdf";
import Pagination from "../components/pagination/Pagination";

export default function MgmServerEventActivityRanking() {
  const [dataset, setDataset] = useState("pre");
const [mgmData, setMgmData] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedDate, setSelectedDate] = useState("");
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

  const availableDates = useMemo(() => {
    return [
      ...new Set(
        mgmData
          .map((entry) => entry.date)
          .filter(Boolean)
      ),
    ].sort(
      (a, b) =>
        new Date(b) - new Date(a)
    );
  }, [mgmData]);

  useEffect(() => {
    if (availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    } else {
      setSelectedDate("");
    }
  }, [availableDates]);

  useEffect(() => {
  setCurrentPage(1);
}, [search, dataset, selectedDate]);

  const ranking = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    const grouped = {};

    mgmData
      .filter((entry) => entry.date === selectedDate)
      .forEach((entry) => {
        const server = String(entry.server ?? "");

        if (!server) {
          return;
        }

        if (!grouped[server]) {
          grouped[server] = {
            server,
            date: selectedDate,
            participants: 0,
          };
        }

        grouped[server].participants += Number(
          entry.participants || 0
        );
      });

    return Object.values(grouped)
      .sort(
        (a, b) =>
          b.participants -
          a.participants
      )
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
        key: `${entry.server}-${entry.date}`,
      }));
  }, [mgmData, selectedDate]);
  const filteredRanking = useMemo(() => {
  const searchText = search.trim().toLowerCase();

  if (!searchText) {
    return ranking;
  }

  return ranking.filter((item) =>
    item.server.toLowerCase().includes(searchText)
  );
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
        <span className="font-semibold text-sky-400">
          {row.server}
        </span>
      ),
    },
    {
      key: "date",
      label: "MGM",
      render: (row) => (
        <span>
          {formatDate(row.date)}
        </span>
      ),
    },
    {
      key: "participants",
      label: "Participants",
      align: "right",
      render: (row) => (
        <span className="font-bold text-sky-400">
          {row.participants.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">

        <h1 className="text-5xl font-bold">
          Server Activity
        </h1>

        <p className="mt-3 text-slate-400">
          Rank servers by total participant activity
          for individual MGM events.
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

          {/* MGM + Download */}

<div className="mt-4 flex items-end gap-4">

  <div className="flex-1">
    <label className="mb-2 block text-sm text-slate-400">
      MGM
    </label>

    <select
      value={selectedDate}
      onChange={(e) =>
        setSelectedDate(e.target.value)
      }
      disabled={
        loading ||
        availableDates.length === 0
      }
      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
    >
      {availableDates.map((date) => (
        <option key={date} value={date}>
          MGM {formatDate(date)}
        </option>
      ))}
    </select>
  </div>

  <button
    onClick={() =>
      generateMgmServerEventActivityRankingPdf(
        filteredRanking,
        dataset
      )
    }
    className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
  >
    📄 Download PDF
  </button>

</div>

{/* Search */}

<div className="mt-4">

  <input
    type="text"
    placeholder="🔍 Search server..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
  />

</div>

<p className="mt-3 text-sm text-slate-400">
  {search.trim() ? (
    <>
      🔍 {filteredRanking.length} matching servers
    </>
  ) : (
    <>
      {ranking.length} servers
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
  {filteredRanking.length.toLocaleString()} servers
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