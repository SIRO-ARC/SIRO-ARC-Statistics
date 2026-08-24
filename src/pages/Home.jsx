import { Link } from "react-router-dom";
import PoweredBy from "../components/home/PoweredBy";
import { supabase } from "../lib/supabase";
import WebsiteChat from "../components/home/WebsiteChat";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-0 pb-6">

      {/* Hero */}

<div className="text-center">
  <img
    src="/images/siro-stats-logo.png"
    alt="SIRO STATS"
    className="mx-auto mt-[-24px] w-[320px] max-w-full sm:w-[400px] md:-mt-16 md:w-[520px]"
  />

  <div className="-mt-14 md:-mt-20">
    <p className="mx-auto max-w-sm px-4 text-[15px] font-medium leading-6 text-slate-300 sm:max-w-xl sm:text-lg sm:leading-7">
  Your central hub for statistics, rankings and community features.
</p>


  </div>
</div>

      {/* Desktop Content Layout */}

<div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,6.5fr)_minmax(0,3.5fr)] lg:items-stretch lg:gap-8">

  {/* Left Column */}

  <div className="contents lg:flex lg:h-full lg:flex-col lg:gap-8">

    {/* Game Hub */}

    <section className="w-full">

      <div className="rounded-3xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_25px_rgba(56,189,248,0.15)] sm:p-8">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Game Hub
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Avatar: Realms Collide
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Explore rankings, statistics, leaderboards and historical data
          for Avatar: Realms Collide.
        </p>

        <Link
          to="/avatar-realms-collide"
          className="mt-6 inline-flex rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400"
        >
          Open Avatar: Realms Collide →
        </Link>

      </div>

    </section>


    {/* Community */}

    <section className="mt-8 w-full lg:mt-0">

      <div className="rounded-3xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_25px_rgba(56,189,248,0.15)] sm:p-8">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Community
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Join my Discord
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Connect with other players, discuss rankings and stay up to date
          with the latest SIRO STATS developments.
        </p>

        <a
          href="https://discord.gg/zYrYGHnf4T"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400"
        >
          💬 Join Discord →
        </a>

      </div>

    </section>


    {/* Major Platform Update */}

    <section className="order-4 mt-8 w-full lg:order-none lg:mt-0">

      <div className="rounded-3xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_25px_rgba(56,189,248,0.20)] sm:p-8">

        <div className="text-center">

          <p className="text-sm text-slate-400">
            Version v1.2
          </p>

          <h2 className="mt-2 text-2xl font-bold text-sky-300">
            🚀 Major Platform Update
          </h2>

          <div className="mt-3 flex flex-col items-center justify-center gap-1 text-sm sm:flex-row sm:gap-3">
            <span className="text-slate-400">
              Released July 2026
            </span>

            <span className="hidden text-slate-600 sm:inline">
              •
            </span>

            <span className="font-semibold text-sky-400">
              Latest Update: August 2026
            </span>
          </div>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-300 md:grid-cols-3 lg:grid-cols-4">

          <div>✔️ Player Rankings</div>
          <div>✔️ Alliance Rankings</div>

          <div>✔️ PvP Player Rankings</div>
          <div>✔️ PvP Ally Rankings</div>

          <div>✔️ Gathering Rankings</div>
          <div>✔️ Ranking Archive</div>

          <div>✔️ Snapshots</div>
          <div>✔️ MGM Rankings</div>

          <div>✔️ MGM Overview</div>
          <div>✔️ MGM Statistics</div>

          <div>✔️ MGM Leaderboards</div>
          <div>✔️ Growth History</div>

          <div>✔️ Rankings Navigation</div>
          <div>✔️ Responsive Design</div>

          <div>✔️ Mobile Optimization</div>
          <div>✔️ Global Homepage</div>

          <div>✔️ Game Hub</div>
          <div>✔️ Background System</div>

          <div>✔️ Website Chat</div>
          <div>✔️ Discord connection</div>

        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          SIRO STATS is continuously improved with every release.
        </p>

      </div>

    </section>

  </div>


  {/* Website Chat */}

  <div className="order-3 mt-8 flex min-h-0 lg:col-start-2 lg:mt-0 lg:order-none">
  <WebsiteChat />
</div>

</div>



<PoweredBy />
    </div>
  );
}