import PoweredBy from "../components/home/PoweredBy";
import { Link } from "react-router-dom";

export default function Statistics() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}

        <section className="mx-auto mt-10 max-w-6xl px-4 text-center">

  <h1 className="text-5xl font-bold text-sky-400">
    ⚔️ Murong's Grand Melee
  </h1>

  <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-400">
    Explore MGM statistics, rankings, leaderboards and event data.
  </p>

</section>


        {/* MGM HUB */}

        <section className="mx-auto mt-12 max-w-6xl">

          <div className="grid gap-6 md:grid-cols-2">


            {/* OVERVIEW */}

            <Link
              to="/mgm/overview"
              className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
            >

              <div className="text-4xl">
                📊
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Overview
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore MGM events, warzones, participation and alliance
                results.
              </p>

              <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
                View Overview →
              </div>

            </Link>


            {/* STATISTICS */}

            <Link
              to="/mgm/statistics"
              className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
            >

              <div className="text-4xl">
                📈
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Statistics
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore detailed MGM statistics, historical data and
                performance graphs.
              </p>

              <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
                View Statistics →
              </div>

            </Link>


            {/* LEADERBOARDS */}

            <Link
              to="/rankings/mgm/leaderboards"
              className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
            >

              <div className="text-4xl">
                🏆
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Leaderboards
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                View MGM leaderboards and compare player, alliance and
                server performance.
              </p>

              <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
                View Leaderboards →
              </div>

            </Link>


            {/* RANKINGS */}

            <Link
              to="/rankings/mgm"
              className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
            >

              <div className="text-4xl">
                🥇
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Rankings
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore the complete MGM rankings and performance
                comparisons.
              </p>

              <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
                View Rankings →
              </div>

            </Link>


          </div>

        </section>

      </div>

      <PoweredBy />
    </>
  );
}