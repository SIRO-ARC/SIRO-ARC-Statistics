import PoweredBy from "../components/home/PoweredBy";
import { Link } from "react-router-dom";

export default function Statistics() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <section className="mx-auto mt-10 md:mt-2 max-w-6xl px-4 text-center">

  <h1 className="text-5xl font-bold text-sky-400">
    📊 Statistics
  </h1>

  <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-400">
    Explore detailed statistics, historical data and progression
    available on SIRO STATS.
  </p>

</section>

        <section className="mx-auto mt-12 max-w-6xl">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* MGM Overview */}

            <Link
              to="/mgm"
              className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
            >
              <div className="text-4xl">
                📊
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                MGM Overview
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore MGM events, warzones, participation and alliance
                results.
              </p>

              <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
                View MGM Overview →
              </div>
            </Link>


            {/* MGM Statistics */}

            <Link
              to="/mgm-statistics"
              className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
            >
              <div className="text-4xl">
                📈
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                MGM Statistics
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore detailed MGM statistics, historical data and
                performance graphs.
              </p>

              <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
                View MGM Statistics →
              </div>
            </Link>


            {/* Track Progression */}

            <Link
              to="/power-growth-history"
              className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
            >
              <div className="text-4xl">
                📈
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                Track Power Progression
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Follow player and alliance power growth across historical
                rankings.
              </p>

              <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
                View Growth History →
              </div>
            </Link>

          </div>

        </section>

      </div>

      <PoweredBy />
    </>
  );
}