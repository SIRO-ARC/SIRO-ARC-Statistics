import { Link } from "react-router-dom";
import PoweredBy from "../components/home/PoweredBy";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-0 pb-6">

      {/* Hero */}

<div className="text-center">
  <img
    src="/images/siro-stats-logo.png"
    alt="SIRO STATS"
    className="mx-auto mt-2 w-[320px] max-w-full sm:w-[400px] md:-mt-22 md:w-[520px]"
  />

  <div className="-mt-8 md:-mt-14">
    <p className="mx-auto max-w-sm px-4 text-[15px] font-medium leading-6 text-slate-400 sm:max-w-xl sm:text-lg sm:leading-7">
      Explore the most popular SIRO Statistics features.
    </p>

    <p className="mx-auto mt-1 max-w-sm px-4 text-xs leading-6 text-slate-500 sm:max-w-xl sm:text-base sm:leading-7">
      More tools and statistics are available in the navigation.
    </p>
  </div>
</div>

      {/* Available Features */}

      <section className="mt-6">

        <div className="mb-8 inline-block">
  <h2 className="text-3xl font-bold text-sky-400">
    🥇 Highlights
  </h2>

<div className="mt-2 h-[1.5px] rounded-full bg-gradient-to-r from-sky-400/20 via-sky-400 to-sky-400/20 shadow-[0_0_10px_rgba(56,189,248,0.9)]" /></div>

        <div className="grid gap-6 lg:grid-cols-3">

          <Link
            to="/rankings"
            className="rounded-2xl border border-slate-700 bg-slate-900 p-8 transition-all hover:border-sky-500 hover:bg-slate-800"
          >
            <div className="text-4xl">📅</div>

            <h3 className="mt-4 text-2xl font-bold text-white">
              Latest Ranking
            </h3>

            <p className="mt-2 text-slate-400">
              Latest Avatar: Realms Collide player and alliance rankings.
            </p>

            <div className="mt-6 inline-flex rounded-lg bg-sky-500 px-4 py-2 font-medium text-white">
              View Rankings →
            </div>
          </Link>

          <Link
            to="/mgm"
            className="rounded-2xl border border-slate-700 bg-slate-900 p-8 transition-all hover:border-sky-500 hover:bg-slate-800"
          >
            <div className="text-4xl">🌍</div>

            <h3 className="mt-4 text-2xl font-bold text-white">
              MGM Overview
            </h3>

            <p className="mt-2 text-slate-400">
              Browse the latest MGM events, warzones and alliance results.
            </p>

            <div className="mt-6 inline-flex rounded-lg bg-sky-500 px-4 py-2 font-medium text-white">
              View MGM →
            </div>
          </Link>

          <Link
            to="/power-growth-history"
            className="rounded-2xl border border-slate-700 bg-slate-900 p-8 transition-all hover:border-sky-500 hover:bg-slate-800"
          >
            <div className="text-4xl">📈</div>

            <h3 className="mt-4 text-2xl font-bold text-white">
              Power Growth
            </h3>

            <p className="mt-2 text-slate-400">
              Track player and alliance power progression over time.
            </p>

            <div className="mt-6 inline-flex rounded-lg bg-sky-500 px-4 py-2 font-medium text-white">
              View History →
            </div>
          </Link>

        </div>

      </section>

      {/* Bottom Section */}

      <section className="mt-16 grid gap-8 lg:grid-cols-2">

        {/* Changelog */}

        <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-8 shadow-[0_0_25px_rgba(56,189,248,0.20)]">

          <p className="text-sm text-slate-400">
  Version 1.1
  <br />
  Released August 2026
</p>

<h2 className="mt-4 text-2xl font-bold text-sky-300">
  🚀 Major Platform Update
</h2>

<ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
  <li>✔️ Global Player Rankings</li>
  <li>✔️ Global Alliance Rankings</li>

  <li>✔️ Weekly Ranking Archive</li>
  <li>✔️ Latest Ranking Overview</li>

  <li>✔️ MGM Overview</li>
  <li>✔️ MGM Statistics</li>

  <li>✔️ Power Growth History</li>
  <li>✔️ Division Support</li>

  <li>✔️ Credits & Attribution</li>
  <li>✔️ Responsive Mobile Design</li>

  <li>✔️ Platform Homepage</li>
  <li>✔️ Performance Improvements</li>
</ul>

<p className="mt-6 text-xs text-slate-500">
  SIRO Statistics is continuously improved with every release.
</p>

        </div>

        {/* Coming Soon */}

        <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-8 shadow-[0_0_25px_rgba(56,189,248,0.20)]">

          <p className="text-sm text-slate-400">
            Version 1.0
            <br />
            Released July 2026
          </p>

          <h2 className="mt-4 text-2xl font-bold text-sky-300">
            🚀 Coming Soon
          </h2>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
            <li>⏳ MGM Archive</li>
            <li>⏳ PvP Player Rankings</li>
            <li>⏳ PvP Alliance Rankings</li>
            <li>⏳ MGM Leaderboard</li>
            <li>⏳ Top 100 Rankings</li>
            <li>⏳ Interactive Charts</li>
            <li>⏳ Live Community Chat</li>
            <li>⏳ Additonal Rankings</li>
            <li>⏳ Top Server Ranking</li>
            <li>⏳ MGM Summary PDF Download</li>
          </ul>

          <p className="mt-6 text-xs text-slate-500">
            More SIRO Statistics features are already in development.
          </p>

        </div>

      </section>
<PoweredBy />
    </div>
  );
}