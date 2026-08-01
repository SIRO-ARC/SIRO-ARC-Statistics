import PoweredBy from "../components/home/PoweredBy";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Info() {
  return (
    <>
      <section className="mx-auto -mt-6 max-w-7xl px-4 py-8">

        <img
          src="/images/siro-stats-logo.png"
          alt="SIRO STATS"
          className="mx-auto mt-0 w-[320px] max-w-full sm:w-[400px] md:-mt-[80px] md:w-[520px]"
        />

        <div className="-mt-8 mx-auto max-w-6xl text-left">

          <h1 className="text-4xl font-bold text-sky-400">
            ℹ️ Info
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            Learn more about SIRO STATS, our mission, the community and the future of the platform.
          </p>

        </div>

      </section>
<section className="mx-auto mt-8 max-w-6xl px-4">

  <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-8 shadow-[0_0_25px_rgba(56,189,248,0.20)]">


  <h2 className="text-3xl font-bold text-sky-400">
    🚀 Our Mission
  </h2>


    <p className="mt-6 text-lg leading-8 text-slate-300">
      SIRO STATS is a community-driven statistics platform built for
      strategy game players.
    </p>

    <p className="mt-5 text-slate-400 leading-8">
      Our mission is to provide accurate rankings, historical data,
      powerful tools and an easy-to-use platform that helps players
      explore game statistics, compare progress and stay informed about
      the competitive community.
    </p>

  </div>

</section>
<div className="mx-auto my-14 h-px max-w-6xl rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)]" />
<section className="mx-auto mt-10 max-w-6xl px-4">

  <h2 className="text-3xl font-bold text-sky-400">
    🌍 What is SIRO STATS?
  </h2>


  <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">🏆</div>

      <h3 className="mt-4 text-xl font-bold text-sky-400">
        Rankings
      </h3>

      <p className="mt-3 text-slate-400">
        Global player and alliance rankings with weekly updates.
      </p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">📈</div>

      <h3 className="mt-4 text-xl font-bold text-sky-400">
        Statistics
      </h3>

      <p className="mt-3 text-slate-400">
        Historical power growth, trends and detailed game analytics.
      </p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">⚔️</div>

      <h3 className="mt-4 text-xl font-bold text-sky-400">
        Events
      </h3>

      <p className="mt-3 text-slate-400">
        MGM leaderboards, statistics and historical event tracking.
      </p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">🌍</div>

      <h3 className="mt-4 text-xl font-bold text-sky-400">
        Platform
      </h3>

      <p className="mt-3 text-slate-400">
        Built to support multiple strategy games with one unified platform.
      </p>
    </div>

  </div>

</section>
<div className="mx-auto my-14 h-px max-w-6xl rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)]" />
<section className="mx-auto mt-10 max-w-6xl px-4">

  <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-8 shadow-[0_0_25px_rgba(56,189,248,0.20)]">

    <h2 className="text-3xl font-bold text-sky-400">
      💬 Join our Community
    </h2>

    <p className="mt-6 text-lg leading-8 text-slate-300">
      SIRO STATS is built together with the community.
    </p>

    <p className="mt-5 leading-8 text-slate-400">
      Join our Discord server to discuss strategies, stay informed about
      new platform updates, report bugs, suggest features and connect
      with players from around the world.
    </p>

    <div className="mt-8">
      <a
        href="https://discord.gg/cmsK6TmbwP"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 rounded-full border border-sky-400/30 bg-sky-500/10 px-8 py-4 text-lg font-semibold text-sky-400 transition-all duration-300 hover:border-sky-400 hover:bg-sky-500/20 hover:shadow-[0_0_20px_rgba(56,189,248,0.30)]"
      >
        💬 Join Discord →
      </a>
    </div>

  </div>

</section>
<div className="mx-auto my-14 h-px max-w-6xl rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)]" />
<section className="mx-auto mt-10 max-w-6xl px-4">

  <h2 className="text-3xl font-bold text-sky-400">
    💡 Help SIRO STATS
  </h2>


  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">

      <div className="text-4xl">💡</div>

      <h3 className="mt-4 text-xl font-bold text-sky-400">
        Suggest Features
      </h3>

      <p className="mt-3 text-slate-400">
        Have an idea? Help shape the future of SIRO STATS by suggesting new tools and features.
      </p>

    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">

      <div className="text-4xl">🐞</div>

      <h3 className="mt-4 text-xl font-bold text-sky-400">
        Report Bugs
      </h3>

      <p className="mt-3 text-slate-400">
        Found an issue? Let us know so we can continue improving the platform.
      </p>

    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_20px_rgba(56,189,248,0.15)]">

      <div className="text-4xl">❤️</div>

      <h3 className="mt-4 text-xl font-bold text-sky-400">
        Community Feedback
      </h3>

      <p className="mt-3 text-slate-400">
        Every update is inspired by community feedback and player suggestions.
      </p>

    </div>

  </div>

</section>
<div className="mx-auto my-14 h-px max-w-6xl rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)]" />
<section className="mx-auto mt-10 max-w-6xl px-4">

  <h2 className="text-3xl font-bold text-sky-400">
    📊 Platform Status
  </h2>


  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">🎮</div>
      <div className="mt-4 text-4xl font-bold text-sky-400">1</div>
      <p className="mt-2 text-slate-400">Supported Game</p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">🌍</div>
      <div className="mt-4 text-4xl font-bold text-sky-400">97</div>
      <p className="mt-2 text-slate-400">Servers Covered</p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">👤</div>
      <div className="mt-4 text-4xl font-bold text-sky-400">9,700+</div>
      <p className="mt-2 text-slate-400">Individual Players Tracked</p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">🏰</div>
      <div className="mt-4 text-4xl font-bold text-sky-400">9,700+</div>
      <p className="mt-2 text-slate-400">Individual Alliances Tracked</p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">📈</div>
      <div className="mt-4 text-4xl font-bold text-sky-400">8</div>
      <p className="mt-2 text-slate-400">Features Available</p>
    </div>

    <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-6 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
      <div className="text-4xl">🚀</div>
      <div className="mt-4 text-4xl font-bold text-sky-400">v1.1</div>
      <p className="mt-2 text-slate-400">Current Version</p>
    </div>

  </div>

</section>
<div className="mx-auto my-14 h-px max-w-6xl rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)]" />
<section className="mx-auto mt-10 max-w-6xl px-4">

  <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-8 shadow-[0_0_25px_rgba(56,189,248,0.20)]">

    <h2 className="text-3xl font-bold text-sky-400">
      🗺️ Development Roadmap
    </h2>


    <p className="mt-6 text-lg text-slate-300">
      SIRO STATS is continuously evolving. Here are some of the features currently planned for future updates.
    </p>

    <div className="mt-8 grid gap-4 md:grid-cols-2">

      <div>⏳ PvP Player Rankings</div>
      <div>⏳ PvP Alliance Rankings</div>

      <div>⏳ MGM Archive</div>
      <div>⏳ MGM Overall Statistics</div>

      <div>⏳ Top100 Rankings</div>
      <div>⏳ Power History Charts</div>

      <div>⏳ Interactive Analytics</div>
      <div>⏳ Hero Builder</div>

      <div>⏳ Talent Calculator</div>
      <div>⏳ Live Community Features</div>

      <div>⏳ API Integrations</div>
      <div>⏳ Additional Strategy Games</div>

    </div>

  </div>

</section>
<div className="mx-auto my-14 h-px max-w-6xl rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)]" />

{/* Start Exploring */}

<section className="mx-auto mt-10 max-w-6xl px-4">

  <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-10 text-center shadow-[0_0_25px_rgba(56,189,248,0.20)]">

    <h2 className="text-3xl font-bold text-sky-400">
      ⭐ Start Exploring
    </h2>


    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
      Whether you're tracking rankings, following power growth,
      analyzing MGM events or preparing for future updates,
      SIRO STATS provides the tools to stay ahead.
    </p>

    <p className="mt-6 text-xl font-semibold text-sky-400">
      Built by players. Driven by data.
    </p>

    <div className="mt-10 flex flex-wrap justify-center gap-5">

      <Link to="/rankings">
        <Button>
          🏆 Explore Rankings
        </Button>
      </Link>

      <a
        href="https://discord.gg/cmsK6TmbwP"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>
          💬 Join Discord
        </Button>
      </a>

    </div>

  </div>

</section>

<PoweredBy />
    </>
  );
}