import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Pagination from "../components/pagination/Pagination";
import PoweredBy from "../components/home/PoweredBy";

import {
  getWeeks,
  getServerPlayerPowerRanking,
  getServerAlliancePowerRanking,
  getServerPlayerPvpRanking,
  getServerAlliancePvpRanking,
  getServerPlayerGatheringRanking,
} from "../services/rankingService";
import RankingTable from "../components/tables/RankingTable";
import { generateServerRankingPdf } from "../pdf/generateServerRankingPdf";

export default function ServerPlayerPowerRanking({
  type = "player-power",
}) {
  const [rankings, setRankings] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("power");
  const [sortDirection, setSortDirection] = useState("desc");

  const [searchParams, setSearchParams] = useSearchParams();

  const ITEMS_PER_PAGE = 100;

  const urlWeek = searchParams.get("week");
  const urlSearch = searchParams.get("search");
  const urlPage = searchParams.get("page");

  useEffect(() => {
    if (urlWeek) setSelectedWeek(urlWeek);
    if (urlSearch) setSearch(urlSearch);
    if (urlPage) setCurrentPage(Number(urlPage));
  }, []);

  useEffect(() => {
    const params = {};

    if (selectedWeek) params.week = selectedWeek;
    if (search) params.search = search;
    if (currentPage > 1) params.page = currentPage;

    setSearchParams(params);
  }, [
    selectedWeek,
    search,
    currentPage,
    setSearchParams,
  ]);

  useEffect(() => {
    getWeeks(
  type === "player-pvp" || type === "alliance-pvp"
    ? "pvp"
    : type === "player-gathering"
      ? "gathering"
      : "power"
)
      .then((data) => {
        setWeeks(data.weeks);

        if (!urlWeek) {
          setSelectedWeek(data.currentWeek);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedWeek) return;

    setCurrentPage(1);

    const loadRanking =
  type === "alliance-power"
    ? getServerAlliancePowerRanking
    : type === "player-pvp"
      ? getServerPlayerPvpRanking
      : type === "alliance-pvp"
        ? getServerAlliancePvpRanking
        : type === "player-gathering"
          ? getServerPlayerGatheringRanking
          : getServerPlayerPowerRanking;

loadRanking(selectedWeek)
  .then((data) => {
    setRankings(data);
  })
  .catch(console.error);
  }, [selectedWeek]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredRankings = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return rankings;
    }

    return rankings.filter((item) =>
      item.server.toString().includes(searchText)
    );
  }, [rankings, search]);
const sortedRankings = [...filteredRankings].sort((a, b) => {

  if (a[sortField] < b[sortField]) {
    return sortDirection === "asc" ? -1 : 1;
  }

  if (a[sortField] > b[sortField]) {
    return sortDirection === "asc" ? 1 : -1;
  }

  return 0;

});
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedRankings = sortedRankings.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(
    filteredRankings.length / ITEMS_PER_PAGE
  );

  const showingFrom =
    filteredRankings.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    endIndex,
    filteredRankings.length
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

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">

        <Link
          to="/rankings/server"
          className="inline-flex items-center text-sm font-semibold text-sky-400 transition hover:text-sky-300"
        >
          ← Back to Server Rankings
        </Link>

        <h1 className="mt-4 text-5xl font-bold">
  {type === "alliance-power"
  ? "Server Alliance Power"
  : type === "player-pvp"
    ? "Server Player PvP"
    : type === "alliance-pvp"
      ? "Server Alliance PvP"
      : type === "player-gathering"
        ? "Server Gathering Points"
        : "Server Player Power"}
</h1>

<p className="mt-3 text-slate-400">
  {type === "alliance-power"
  ? "Rank servers by their combined alliance power."
  : type === "player-pvp"
    ? "Rank servers by their combined player PvP points."
    : type === "alliance-pvp"
      ? "Rank servers by their combined alliance PvP points."
      : type === "player-gathering"
        ? "Rank servers by their combined gathering points."
        : "Rank servers by their combined player power."}
</p>


        <div className="mt-10">

          <div className="flex flex-col gap-4 lg:flex-row">

            <input
              type="text"
              placeholder="🔍 Search server..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500 lg:w-96"
            >
              {weeks.map((week) => (
                <option key={week} value={week}>
                  {week}
                </option>
              ))}
            </select>
            <button
  onClick={() =>
    generateServerRankingPdf(
      filteredRankings,
      selectedWeek,
      type
    )
  }
  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
>
  📄 Download PDF
</button>

          </div>


          <p className="mt-3 text-sm text-slate-400">
            {search.trim()
              ? `🔍 ${filteredRankings.length} matching servers`
              : `${rankings.length} servers`}
          </p>

        </div>

<RankingTable
  data={paginatedRankings}
  selectedWeek={selectedWeek}
  view="players"
  sortField="power"
  sortDirection="desc"
  mode="server"
  serverType={type}
  onSort={(field) => {
    if (field === "power") {
      setRankings((current) => [...current].sort(
        (a, b) => b.power - a.power
      ));
    }

    if (field === "players") {
      setRankings((current) => [...current].sort(
        (a, b) => b.players - a.players
      ));
    }

    if (field === "server") {
      setRankings((current) => [...current].sort(
        (a, b) => a.server - b.server
      ));
    }
  }}
/>


        <div className="mt-4 text-center text-sm text-slate-400">
          Showing {showingFrom}–{showingTo} of{" "}
          {filteredRankings.length.toLocaleString()} servers
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