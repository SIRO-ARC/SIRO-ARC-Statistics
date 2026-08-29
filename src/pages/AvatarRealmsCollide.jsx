import PoweredBy from "../components/home/PoweredBy";
import { Link } from "react-router-dom";

export default function AvatarRealmsCollide() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <section className="flex justify-center">
  <img
    src="/images/avatar-realms-collide-logo.png"
    alt="Avatar: Realms Collide"
    className="w-[520px] max-w-[90%] object-contain"
  />
</section>

        <section className="mx-auto mt-8 lg:mt-[21px] max-w-6xl rounded-3xl border border-sky-400/30 bg-slate-950/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.08)] sm:p-8">

  <div className="mb-6 text-center">

    <h2 className="mt-2 text-3xl font-bold text-white">
      Rankings
    </h2>

    <p className="mx-auto mt-2 max-w-2xl text-slate-400">
      Explore all player, alliance and competitive rankings across
      Avatar: Realms Collide.
    </p>

  </div>

  <Link
    to="/rankings"
    className="group mx-auto block max-w-3xl rounded-2xl border border-slate-700 bg-[#111A2E] p-8 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
  >

    <div className="text-center">

  <div className="text-4xl">
    🏆
  </div>

  <h3 className="mt-4 text-2xl font-bold text-white">
    Rankings
  </h3>

  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
    Explore Power, PvP, Gathering, MGM, Server and PvE rankings
    from across the Avatar: Realms Collide community.
  </p>

  <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
    View Rankings →
  </div>

</div>

  </Link>

</section>


<section className="mx-auto mt-10 lg:mt-10 max-w-6xl rounded-3xl border border-sky-400/30 bg-slate-950/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.08)] sm:p-8">

  <div className="mb-6 text-center">
    

    <h2 className="mt-2 text-3xl font-bold text-white">
      Murong's Grand Melee
    </h2>

    <p className="mx-auto mt-2 max-w-2xl text-slate-400">
      Explore MGM event performance and historical statistics.
    </p>
  </div>

  <Link
  to="/mgm"
  className="group mx-auto block max-w-3xl rounded-2xl border border-slate-700 bg-[#111A2E] p-8 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
>
  <div className="text-center">

    <div className="text-4xl">
      ⚔️
    </div>

    <h3 className="mt-4 text-2xl font-bold text-white">
      Murong's Grand Melee
    </h3>

    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
      Explore MGM overview, statistics, leaderboards and rankings.
    </p>

    <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
      Explore MGM →
    </div>

  </div>
</Link>

</section>
<section className="mx-auto mt-10 max-w-6xl rounded-3xl border border-sky-400/30 bg-slate-950/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.08)] sm:p-8">

  <div className="mb-6 text-center">

    <h2 className="mt-2 text-3xl font-bold text-white">
      Tools
    </h2>

    <p className="mx-auto mt-2 max-w-2xl text-slate-400">
      Explore useful tools and utilities for Avatar: Realms Collide.
    </p>

  </div>

  <Link
    to="/tools"
    className="group mx-auto block max-w-3xl rounded-2xl border border-slate-700 bg-[#111A2E] p-8 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
  >
    <div className="text-center">

      <div className="text-5xl">
        🛠️
      </div>

      <h3 className="mt-4 text-2xl font-bold text-white">
        Tools
      </h3>

      <p className="mx-auto mt-2 max-w-3xl text-slate-400">
        Access the Talent Tree Builder, Power Growth History and other
        useful tools.
      </p>

      <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
        View Tools →
      </div>

    </div>
  </Link>

</section>
</div>
      <PoweredBy />
    </>
  );
}