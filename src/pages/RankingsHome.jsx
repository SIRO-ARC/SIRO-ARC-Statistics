import { Link } from "react-router-dom";
import PoweredBy from "../components/home/PoweredBy";
import Features from "../components/home/Features";

export default function RankingsHome() {
  return (
    <>
  <section className="mx-auto mt-10 max-w-6xl px-4 text-center">

        <h1 className="text-5xl font-bold text-sky-400">
          📊 Rankings
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-400">
          Explore player, alliance and server rankings
available on SIRO STATS.
        </p>

      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

    {/* Power */}

    <Link
      to="/rankings/power"
      className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
    >
      <div className="text-4xl">
        ⚡
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        Power Rankings
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Explore the strongest players and alliances across
        Avatar: Realms Collide.
      </p>

      <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
        Explore →
      </div>
    </Link>


    {/* PvP */}

    <Link
      to="/rankings/pvp"
      className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
    >
      <div className="text-4xl">
        ⚔️
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        PvP Rankings
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Compare the top PvP players and alliances across
        competitive rankings.
      </p>

      <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
        Explore →
      </div>
    </Link>


    {/* Gathering */}

    <Link
      to="/rankings/gathering"
      className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
    >
      <div className="text-4xl">
        🌾
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        Gathering Rankings
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        See which players have gathered the most resources
        across the latest rankings.
      </p>

      <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
        Explore →
      </div>
    </Link>


    {/* MGM */}

    <Link
      to="/rankings/mgm"
      className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
    >
      <div className="text-4xl">
        🏰
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        MGM Rankings
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Explore rankings and historical performance from
        Murong's Grand Melee.
      </p>

      <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
        Explore →
      </div>
    </Link>


    {/* Server */}

    <Link
      to="/rankings/server"
      className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
    >
      <div className="text-4xl">
        🌍
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        Server Rankings
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Compare servers across combined rankings
        and competitive performance.
      </p>

      <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
        Explore →
      </div>
    </Link>


    {/* PvE */}

    <Link
      to="/rankings/pve"
      className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
    >
      <div className="text-4xl">
        🐉
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        PvE Rankings
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Explore player and server performance across PvE
        content and events.
      </p>

      <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
        Explore →
      </div>
    </Link>

  </div>

</section>
<div className="mt-10">
  <Features />
</div>

<PoweredBy />
    </>
  );
}