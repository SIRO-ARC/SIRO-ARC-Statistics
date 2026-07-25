import Pagination from "../components/pagination/Pagination";
import { useEffect, useState } from "react";
import RankingTable from "../components/tables/RankingTable";
import { getWeeks, getRankings } from "../services/rankingService";
import { useSearchParams } from "react-router-dom";
export default function Rankings() {
  const [rankings, setRankings] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("players");
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [sortField, setSortField] = useState("rank");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlView = searchParams.get("view");
  const urlWeek = searchParams.get("week");
  const urlSearch = searchParams.get("search");
  const urlPage = searchParams.get("page");

useEffect(() => {
  if (urlView) setView(urlView);
  if (urlWeek) setSelectedWeek(urlWeek);
  if (urlSearch) setSearch(urlSearch);
  if (urlPage) setCurrentPage(Number(urlPage));
}, []);

useEffect(() => {
  const params = {};

  if (view) params.view = view;
  if (selectedWeek) params.week = selectedWeek;
  if (search) params.search = search;
  if (currentPage > 1) params.page = currentPage;

  setSearchParams(params);
}, [
  view,
  selectedWeek,
  search,
  currentPage,
  setSearchParams,
]);

  const ITEMS_PER_PAGE = 100;
  
  // Wochen laden (nur einmal beim Start)
useEffect(() => {
  getWeeks()
    .then((data) => {

  setWeeks(data.weeks);

if (!urlWeek) {
  setSelectedWeek(data.currentWeek);
}
})
    .catch(console.error);
}, []);

useEffect(() => {
  setCurrentPage(1);
}, [search]);

// Spieler der ausgewählten Woche laden
useEffect(() => {
  if (!selectedWeek) return;
  setCurrentPage(1);



  getRankings(view, selectedWeek)
  .then((data) => {
  setRankings(data);
})
  .catch(console.error);


}, [selectedWeek, view]);
const filteredRankings = rankings.filter((item) => {

  const searchText = search.toLowerCase();

  return (
    item.name.toLowerCase().includes(searchText) ||
    item.tag?.toLowerCase().includes(searchText) ||
    item.server.toString().includes(searchText)
  );

});
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

const paginatedRankings = sortedRankings.slice(startIndex, endIndex);
const totalPages = Math.ceil(
  sortedRankings.length / ITEMS_PER_PAGE
);
const showingFrom =
  sortedRankings.length === 0 ? 0 : startIndex + 1;

const showingTo = Math.min(
  endIndex,
  sortedRankings.length
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
    <div className="mx-auto max-w-7xl px-8 py-16">

      <h1 className="text-5xl font-bold">
        Global Rankings
      </h1>

      <p className="mt-3 text-slate-400">
        Browse every player, alliance and event ranking.
      </p>

      <div className="mt-10">

  <div className="flex gap-3">

    <button
      onClick={() => setView("players")}
      className={`rounded-xl px-5 py-2 font-semibold transition ${
        view === "players"
          ? "bg-blue-600 text-white"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      👤 Players
    </button>

    <button
      onClick={() => setView("alliances")}
      className={`rounded-xl px-5 py-2 font-semibold transition ${
        view === "alliances"
          ? "bg-blue-600 text-white"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      🏰 Alliances
    </button>

  </div>

  <div className="mt-4 flex gap-4">

  <input
    type="text"
    placeholder="🔍 Search player, alliance or server..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
  />

  <select
    value={selectedWeek}
    onChange={(e) => setSelectedWeek(e.target.value)}
    className="w-96 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-blue-500"
  >
    {weeks.map((week) => (
      <option key={week} value={week}>
        {week}
      </option>
    ))}
  </select>

</div>

  <p className="mt-3 text-sm text-slate-400">
  {search.trim() ? (
    <>
      🔍 {filteredRankings.length} matching{" "}
      {view === "players" ? "players" : "alliances"}
    </>
  ) : (
    <>
      {rankings.length} {view === "players" ? "players" : "alliances"}
    </>
  )}
</p>

</div>

<RankingTable
  data={paginatedRankings}
  selectedWeek={selectedWeek}
  view={view}
  sortField={sortField}
  sortDirection={sortDirection}
  onSort={(field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);

      if (field === "power") {
        setSortDirection("desc");
      } else {
        setSortDirection("asc");
      }
    }
  }}
/>
<div className="mt-4 text-center text-sm text-slate-400">
  Showing {showingFrom}–{showingTo} of{" "}
  {sortedRankings.length.toLocaleString()}{" "}
  {view === "players" ? "players" : "alliances"}
</div>
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPrevious={handlePreviousPage}
  onNext={handleNextPage}
  onPageChange={handlePageChange}
/>
</div>
  );
}