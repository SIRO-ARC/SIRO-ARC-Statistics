
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination/Pagination";
import PoweredBy from "../components/home/PoweredBy";
import { generateRankingPdf } from "../pdf/generateRankingPdf";

const ITEMS_PER_PAGE = 100;

const formatPoints = (points) =>
  Number(points).toLocaleString("en-US");

const getPodiumStyle = (rank) => {
  if (rank === 1) return "bg-amber-400/10 text-amber-200";
  if (rank === 2) return "bg-slate-300/10 text-slate-200";
  if (rank === 3) return "bg-orange-500/10 text-orange-200";
  return "text-slate-300 hover:bg-slate-900";
};

export default function SVSPreludeRanking() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  function handleDownloadPdf() {
    const rankings = [...data]
      .sort(
        (a, b) =>
          Number(b.preludePoints) - Number(a.preludePoints)
      )
      .map((server, index) => ({
        rank: index + 1,
        server: server.server,
        warzone: server.warzone,
        preludePoints: Number(server.preludePoints) || 0,
      }));

    generateRankingPdf({
  title: "SVS Prelude Ranking",
  subtitle: "Global Server Rankings",
  headerSpacing: 40,
      columns: [
        {
          key: "rank",
          header: "Rank",
          width: 55,
          align: "center",
        },
        {
          key: "server",
          header: "Server",
          width: 100,
          align: "left",
          accent: true,
        },
        {
          key: "warzone",
          header: "Warzone",
          width: 100,
          align: "left",
        },
        {
          key: "preludePoints",
          header: "Prelude Points",
          width: "*",
          align: "right",
        },
      ],
      rankings,
      filename: "SIRO_SVS_Prelude_Ranking.pdf",
      highlightTopThree: true,
    });
  }

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const response = await fetch("/api/svs/prelude.json");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();

        if (!Array.isArray(json)) {
          throw new Error("Invalid SVS Prelude data");
        }

        if (!cancelled) {
          setData(json);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Failed to load SVS Prelude data"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRanking = useMemo(() => {
    const query = search.trim().toLowerCase();

    return data
      .filter(
        (server) =>
          !query ||
          String(server.server).toLowerCase().includes(query) ||
          String(server.warzone).toLowerCase().includes(query)
      )
      .sort((a, b) => {
        const difference =
          Number(b.preludePoints) - Number(a.preludePoints);

        return sortDirection === "desc"
          ? difference
          : -difference;
      });
  }, [data, search, sortDirection]);

  const totalPages = Math.ceil(
    filteredRanking.length / ITEMS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pageRanking = filteredRanking.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const showingFrom =
    filteredRanking.length === 0 ? 0 : startIndex + 1;

  const showingTo = Math.min(
    startIndex + ITEMS_PER_PAGE,
    filteredRanking.length
  );

  function handleSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleSort() {
    setSortDirection((current) =>
      current === "desc" ? "asc" : "desc"
    );
    setCurrentPage(1);
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <Link
          to="/svs"
          className="inline-flex items-center text-sm font-semibold text-sky-400 transition hover:text-sky-300"
        >
          ← Back to SVS
        </Link>

        <header className="mt-4">
  <h1 className="text-5xl font-bold text-white">
    SVS Prelude Ranking
  </h1>
  <p className="mt-3 text-slate-400">
    Global server rankings based on final Prelude Points.
  </p>
</header>

        {isLoading && (
          <p className="mt-10 text-center text-slate-400">
            Loading SVS Prelude ranking...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-red-300">
            Failed to load SVS Prelude ranking: {error}
          </div>
        )}

        {!isLoading && !error && (
          <section className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row">
  <input
    type="search"
    value={search}
    onChange={(event) => handleSearch(event.target.value)}
    placeholder="🔍 Search server or Warzone..."
    className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none transition focus:border-sky-400"
  />

  
<button
  type="button"
  onClick={handleDownloadPdf}
  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
>
  📄 Download PDF
</button>

</div>

            <p className="mt-3 text-sm text-slate-400">
              {search.trim()
                ? `🔍 ${filteredRanking.length} matching servers`
                : `${data.length} servers`}
            </p>

            {/* Mobile ranking cards */}
            <div className="mt-8 space-y-3 lg:hidden">
              {pageRanking.map((server, index) => {
                const rank = startIndex + index + 1;

                return (
                  <article
                    key={`${server.warzone}-${server.server}`}
                    className={`rounded-xl border border-slate-800 p-4 ${getPodiumStyle(rank)}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="min-w-10 font-bold">
                          {rank <= 3
                            ? ["🥇", "🥈", "🥉"][rank - 1]
                            : `#${rank}`}
                        </span>

                        <div>
                          <p className="font-bold text-sky-400">
                            Server {server.server}
                          </p>
                          <p className="mt-1 text-sm text-slate-400">
                            Warzone {server.warzone}
                          </p>
                        </div>
                      </div>

                      <p className="text-right font-bold tabular-nums">
                        {formatPoints(server.preludePoints)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Desktop ranking table */}
            <div className="mt-12 hidden overflow-hidden rounded-2xl border border-slate-800 lg:block">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="p-4 text-left">
                      Rank
                    </th>

                    <th className="p-4 text-left">
                      Server
                    </th>

                    <th className="p-4 text-left">
                      Warzone
                    </th>

                    <th
                      className="cursor-pointer select-none p-4 text-right"
                      onClick={handleSort}
                    >
                      Prelude Points{" "}
                      {sortDirection === "desc" ? "▼" : "▲"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pageRanking.map((server, index) => {
                    const rank = startIndex + index + 1;

                    return (
                      <tr
                        key={`${server.warzone}-${server.server}`}
                        className={`border-t border-slate-800 transition ${getPodiumStyle(rank)}`}
                      >
                        <td className="p-4 font-bold">
                          {rank <= 3
                            ? ["🥇", "🥈", "🥉"][rank - 1]
                            : `#${rank}`}
                        </td>

                        <td className="p-4 font-semibold text-sky-400">
                          {server.server}
                        </td>

                        <td className="p-4">
                          {server.warzone}
                        </td>

                        <td className="p-4 text-right font-semibold tabular-nums">
                          {formatPoints(server.preludePoints)}
                        </td>
                      </tr>
                    );
                  })}

                  {pageRanking.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-slate-500"
                      >
                        No matching servers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center text-sm text-slate-400">
              Showing {showingFrom}–{showingTo} of{" "}
              {filteredRanking.length.toLocaleString()} servers
            </div>

            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPrevious={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              onNext={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              onPageChange={setCurrentPage}
            />
          </section>
        )}
      </main>

      <PoweredBy />
    </>
  );
}
