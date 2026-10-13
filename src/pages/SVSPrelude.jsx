import { useEffect, useMemo, useState } from "react";
import PoweredBy from "../components/home/PoweredBy";
import { generateSvsPreludeOverviewPdf } from "../pdf/generateSvsPreludeOverviewPdf";


const POSITION_STYLES = {
  Red: {
    label: "Top Left",
    card: "border-red-400/50 bg-red-950/40",
    badge: "bg-red-500/20 text-red-300",
  },
  Green: {
    label: "Top Right",
    card: "border-green-400/50 bg-green-950/40",
    badge: "bg-green-500/20 text-green-300",
  },
  Yellow: {
  label: "Bottom Left",
  card: "border-yellow-400/50 bg-yellow-950/40",
  badge: "bg-yellow-500/20 text-yellow-300",
},
  Blue: {
    label: "Bottom Right",
    card: "border-blue-400/50 bg-blue-950/40",
    badge: "bg-blue-500/20 text-blue-300",
  },
};


const formatPoints = (points) =>
  Number(points).toLocaleString("en-US");

export default function SVSPrelude() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  function handleDownloadPdf() {
    const sortedWarzones = [...warzones]
      .sort((a, b) => Number(a.warzone) - Number(b.warzone));

    generateSvsPreludeOverviewPdf(sortedWarzones).catch((err) => {
      console.error("Failed to generate SVS Prelude PDF:", err);
      window.alert("Could not generate the SVS Prelude PDF. Please try again.");
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
          setError(err.message || "Failed to load SVS Prelude data");
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

  const warzones = useMemo(() => {
    const groups = new Map();

    for (const server of data) {
      const key = String(server.warzone);

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key).push(server);
    }

    return [...groups.entries()]
      .map(([warzone, servers]) => ({
        warzone,
        era: servers[0]?.era ?? "",
        ultimateGroup: servers.some((server) => server.ultimateGroup),
        servers: [...servers].sort(
          (a, b) => (a.positionIndex ?? 99) - (b.positionIndex ?? 99)
        ),
      }))
      .sort((a, b) => Number(a.warzone) - Number(b.warzone));
  }, [data]);

  const ranking = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...data]
      .filter((server) => {
        if (!query) return true;

        return (
          String(server.server).includes(query) ||
          String(server.warzone).toLowerCase().includes(query)
        );
      })
      .sort(
        (a, b) =>
          Number(b.preludePoints) - Number(a.preludePoints)
      );
  }, [data, search]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
<header className="mt-4">
  <h1 className="text-5xl font-bold text-white">
    SVS Prelude
  </h1>

  <p className="mt-3 text-slate-400">
    Explore Warzone matchups, server positions and final Prelude Points.
  </p>
</header>


      {isLoading && (
        <p className="mt-10 text-center text-slate-400">
          Loading SVS Prelude data...
        </p>
      )}

      {error && (
        <div className="mt-8 rounded-xl border border-red-500/40 bg-red-950/30 p-4 text-red-300">
          Failed to load SVS Prelude: {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          <section className="mt-10">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
  <div>
    
    <p className="mt-1 text-sm text-slate-400">
      {warzones.length} Warzones · {data.length} servers
    </p>
  </div>

  <button
    type="button"
    onClick={handleDownloadPdf}
    className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
  >
    📄 Download PDF
  </button>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {warzones.map((zone) => (
                <article
                  key={zone.warzone}
                  className="rounded-2xl border border-sky-400/20 bg-slate-950/50 p-4 shadow-[0_0_25px_rgba(56,189,248,0.05)] sm:p-5"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      
<h3 className="text-xl font-bold text-sky-400 [text-shadow:0_0_8px_rgba(56,189,248,0.65),0_0_18px_rgba(56,189,248,0.35)]">
  Warzone {zone.warzone}
</h3>

                      <p className="mt-1 text-sm text-slate-400">
  {zone.era} Era
</p>
                    </div>

                    {zone.ultimateGroup && (
                      <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                        Ultimate Group
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    
{[
  { dataPosition: "Blue", displayPosition: "Red" },
  { dataPosition: "Green", displayPosition: "Green" },
  { dataPosition: "Red", displayPosition: "Yellow" },
  { dataPosition: "Gold", displayPosition: "Blue" },
].map(({ dataPosition, displayPosition }) => {
  const server = zone.servers.find(
    (item) => item.position === dataPosition
  );
  const style = POSITION_STYLES[displayPosition];
  const position = displayPosition;


const sortedServers = [...zone.servers].sort(
  (a, b) => Number(b.preludePoints) - Number(a.preludePoints)
);

const place = server
  ? sortedServers.findIndex(
      (item) => Number(item.server) === Number(server.server)
    ) + 1
  : null;

const podiumStyles = {
  1: {
    text: "text-amber-300 [text-shadow:0_0_8px_rgba(251,191,36,0.75)]",
    border: "border-amber-400/60",
    trophy: "🏆",
    label: "1st",
  },
  

2: {
  text: "text-slate-300 [text-shadow:0_0_8px_rgba(203,213,225,0.95),0_0_16px_rgba(148,163,184,0.55)]",
  border: "border-slate-300/70",
  trophy: "🏆",
  label: "2nd",
},
3: {
  text: "text-orange-700 [text-shadow:0_0_8px_rgba(194,65,12,0.9)]",
  border: "border-orange-800/70",
  trophy: "🏆",
  label: "3rd",
},


};

const podium = podiumStyles[place];


                      return (
                        <div
                          key={position}
                          className={`min-w-0 rounded-xl border p-3 sm:p-4 ${style.card}`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span
                              className={`rounded-md px-2 py-1 text-xs font-bold ${style.badge}`}
                            >
                              {position}
                            </span>
                            <span className="text-xs text-slate-400">
                              {style.label}
                            </span>
                          </div>

                          {server ? (
                            <>
                              <p className="mt-4 text-sm text-slate-300">
                                Server
                              </p>
                              
<div className="mt-3 flex items-center justify-between gap-2">
  <p className={`text-2xl font-black ${podium?.text ?? "text-white"}`}>
    {server.server}
  </p>

  {podium && (
    <div className={`flex shrink-0 items-center gap-1 rounded-lg border ${podium.border} bg-black/20 px-2 py-1`}>
      <span>{podium.trophy}</span>
      <span className={`text-sm font-extrabold ${podium.text}`}>
        {podium.label}
      </span>
    </div>
  )}
</div>

<p className={`mt-2 break-words text-sm font-semibold ${
  podium?.text ?? "text-slate-300"
}`}>
  {formatPoints(server.preludePoints)}
</p>

                              <p className="mt-1 text-xs text-slate-500">
                                Prelude Points
                              </p>
                            </>
                          ) : (
                            <p className="mt-4 text-sm text-slate-500">
                              No server data
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>

        </>
      )}

      <PoweredBy />
    </main>
  );
}