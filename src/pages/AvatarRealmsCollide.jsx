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

  <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">


    {/* MGM Overview */}

    <Link
      to="/mgm"
      className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
    >
      <div className="text-4xl">
        📊
      </div>

      <h3 className="mt-4 text-2xl font-bold text-white">
        Overview
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Get a quick overview of MGM performance, participation and results.
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

      <h3 className="mt-4 text-2xl font-bold text-white">
        Statistics
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Explore detailed MGM statistics and historical graphs.
      </p>

      <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
        View MGM Statistics →
      </div>
    </Link>


{/* MGM Leaderboards */}

<Link
  to="/leaderboards"
  className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
>
  <div className="text-4xl">
    🏅
  </div>

  <h3 className="mt-4 text-2xl font-bold text-white">
    Leaderboards
  </h3>

  <p className="mt-2 text-sm leading-6 text-slate-400">
    Explore the top performers and competitive leaderboards from Murong's
    Grand Melee.
  </p>

  <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
    View MGM Leaderboards →
  </div>
</Link>

</div>

</section>
<section className="mx-auto mt-10 max-w-6xl rounded-3xl border border-sky-400/30 bg-slate-950/40 p-6 shadow-[0_0_30px_rgba(56,189,248,0.08)] sm:p-8">

  <div className="mb-6 text-center">
    

    <h2 className="mt-2 text-3xl font-bold text-white">
      Track progression
    </h2>

    <p className="mx-auto mt-2 max-w-2xl text-slate-400">
      Follow player and alliance power growth across historical rankings.
    </p>
  </div>

  <Link
    to="/power-growth-history"
    className="group mx-auto block max-w-3xl rounded-2xl border border-slate-700 bg-[#111A2E] p-8 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
  >
    <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left">

      <div className="text-5xl">
        📈
      </div>

      <div className="mt-5 md:ml-6 md:mt-0">
        <h3 className="text-2xl font-bold text-white">
          Power Growth History
        </h3>

        <p className="mt-2 max-w-3xl text-slate-400">
          Compare historical power development and see how players and
          alliances have progressed over time.
        </p>
      </div>

      <div className="mt-5 md:ml-auto md:mt-0">
        <span className="text-sm font-semibold text-sky-400 group-hover:text-sky-300">
          View Growth →
        </span>
      </div>

    </div>
  </Link>

</section>
</div>
      <PoweredBy />
    </>
  );
}