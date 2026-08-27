import PoweredBy from "../components/home/PoweredBy";
import { Link } from "react-router-dom";

export default function MgmRankings() {
  return (
    <>
      <section className="mx-auto mt-8 max-w-6xl px-4 text-center">

        <h1 className="text-5xl font-bold text-sky-400">
          🏰 MGM
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          Explore historical MGM performance across alliances and servers.
        </p>

      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Participants Ranking */}

          <Link
            to="/rankings/mgm/participants"
            className="group rounded-3xl border border-sky-400/30 bg-slate-900/60 p-8 text-center h-[250px] shadow-[0_0_25px_rgba(56,189,248,0.10)] transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.20)]"
          >
            <div className="text-5xl">
              👥
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Participants
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Rank individual MGM alliance participations by total
              participants across historical events.
            </p>

            <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
              View Ranking →
            </div>
          </Link>


          {/* Territory Ranking */}

          <Link
            to="/rankings/mgm/territory"
            className="group rounded-3xl border border-sky-400/30 bg-slate-900/60 p-8 text-center h-[250px] shadow-[0_0_25px_rgba(56,189,248,0.10)] transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.20)]"
          >
            <div className="text-5xl">
              🏰
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Territory
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Rank individual MGM alliance participations by captured
              territory.
            </p>

            <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
              View Ranking →
            </div>
          </Link>

{/* Server Activity */}

<Link
  to="/rankings/mgm/server-event-activity"
  className="group rounded-3xl border border-sky-400/30 bg-slate-900/60 p-8 text-center h-[250px] shadow-[0_0_25px_rgba(56,189,248,0.10)] transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.20)]"
>
  <div className="text-5xl">
    🌍
  </div>

  <h2 className="mt-5 text-2xl font-bold text-white">
    Server Activity
  </h2>

  <p className="mt-3 text-sm leading-6 text-slate-400">
    Compare MGM participation by server for individual events.
  </p>

  <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
    View Ranking →
  </div>
</Link>

          {/* Alliance Overall Activity */}

          <Link
            to="/rankings/mgm/alliance-activity"
            className="group rounded-3xl border border-sky-400/30 bg-slate-900/60 p-8 text-center h-[250px] shadow-[0_0_25px_rgba(56,189,248,0.10)] transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.20)]"
          >
            <div className="text-5xl">
              🛡️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Alliance Overall Activity
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Compare total MGM participation across all events for
              each alliance.
            </p>

            <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
              View Ranking →
            </div>
          </Link>


          {/* Server Activity */}

          <Link
            to="/rankings/mgm/server-activity"
            className="group rounded-3xl border border-sky-400/30 bg-slate-900/60 p-8 text-center h-[250px] shadow-[0_0_25px_rgba(56,189,248,0.10)] transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.20)]"
          >
            <div className="text-5xl">
              🌍
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              Server Overall Activity
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Compare total MGM participation across alliances on
              each server.
            </p>

            <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
              View Ranking →
            </div>
          </Link>
          {/* Average Participants */}

<Link
  to="/rankings/mgm/average-participants"
  className="group rounded-3xl border border-sky-400/30 bg-slate-900/60 p-8 text-center h-[250px] shadow-[0_0_25px_rgba(56,189,248,0.10)] transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.20)]"
>
  <div className="text-5xl">
    📊
  </div>

  <h2 className="mt-5 text-2xl font-bold text-white">
    Average Participants
  </h2>

  <p className="mt-3 text-sm leading-6 text-slate-400">
    Compare average MGM participation per alliance across
    historical events.
  </p>

  <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
    View Ranking →
  </div>
</Link>



{/* Leaderboards */}

<Link
  to="/rankings/mgm/leaderboards"
  className="group lg:col-span-3 rounded-3xl border border-sky-400/30 bg-slate-900/60 p-8 text-center h-[250px] shadow-[0_0_25px_rgba(56,189,248,0.10)] transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.20)]"
>
  <div className="text-5xl">
    🏆
  </div>

  <h2 className="mt-5 text-2xl font-bold text-white">
    Leaderboards
  </h2>

  <p className="mt-3 text-sm leading-6 text-slate-400">
    Compare the strongest MGM performances across alliances
    and servers.
  </p>

  <div className="mt-5 text-sm font-semibold text-sky-400 group-hover:text-sky-300">
    View Leaderboards →
  </div>
</Link>

        </div>


        

      </section>

      <PoweredBy />
    </>
  );
}