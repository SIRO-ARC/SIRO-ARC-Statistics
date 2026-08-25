import { Link } from "react-router-dom";
import PoweredBy from "../components/home/PoweredBy";

export default function ServerRankings() {
  return (
    <>
      {/* Header */}

      <section className="mx-auto mt-10 max-w-6xl px-4 text-center">

        <h1 className="text-5xl font-bold text-sky-400">
          🌍 Server Rankings
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-400">
          Explore combined server performance across SIRO STATS.
        </p>

      </section>


      {/* Ranking Cards */}

      <section className="mx-auto mt-12 max-w-6xl px-4">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">

          {/* Combined Player Power */}

          <Link
            to="/rankings/server/player-power"
            className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg lg:col-span-2"
          >
            <div className="text-4xl">
              ⚡
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Server Player Power
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Rank servers by the combined power of all ranked players.
            </p>

            <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
              Explore →
            </div>
          </Link>


          {/* Combined Alliance Power */}

          <Link
            to="/rankings/server/alliance-power"
            className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg lg:col-span-2"
          >
            <div className="text-4xl">
              🛡️
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Server Alliance Power
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Rank servers by the combined power of all ranked alliances.
            </p>

            <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
              Explore →
            </div>
          </Link>


          {/* Combined Player PvP */}

          <Link
            to="/rankings/server/player-pvp"
            className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg lg:col-span-2"
          >
            <div className="text-4xl">
              ⚔️
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Server Player PvP Points
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Rank servers by the combined PvP points of all ranked players.
            </p>

            <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
              Explore →
            </div>
          </Link>


          {/* Combined Alliance PvP */}

          <Link
            to="/rankings/server/alliance-pvp"
            className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg lg:col-span-2 lg:col-start-2"
          >
            <div className="text-4xl">
              🛡️
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Server Alliance PvP Points
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Rank servers by the combined PvP points of all ranked alliances.
            </p>

            <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
              Explore →
            </div>
          </Link>


          {/* Combined Player Gathering */}

          <Link
            to="/rankings/server/player-gathering"
            className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg lg:col-span-2 lg:col-start-4"
          >
            <div className="text-4xl">
              🌾
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Server Gathering Points
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Rank servers by the combined gathering points of all ranked players.
            </p>

            <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
              Explore →
            </div>
          </Link>


        </div>

      </section>


      <PoweredBy />
    </>
  );
}