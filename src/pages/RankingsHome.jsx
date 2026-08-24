import { Link } from "react-router-dom";
import PoweredBy from "../components/home/PoweredBy";
import Features from "../components/home/Features";

export default function RankingsHome() {
  return (
    <>
  <section className="mx-auto mt-10 md:mt-2 max-w-6xl px-4 text-center">

        <h1 className="text-5xl font-bold text-sky-400">
          📊 Rankings
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-400">
          Explore player, alliance and server rankings
available on SIRO STATS.
        </p>

      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {/* Power */}

          <Link to="/rankings/power">

            <div className="group rounded-2xl border border-sky-400/30 bg-slate-900/60 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]">

              {/* Desktop */}
<div className="mb-5 hidden items-center justify-between md:flex">

  <h2 className="text-xl md:text-2xl font-bold text-sky-400">
    POWER
  </h2>

  <div className="text-4xl md:text-5xl">
    ⚡
  </div>

</div>

{/* Mobile */}
<div className="mb-3 flex items-center gap-3 md:hidden">

  <div className="text-3xl">
    ⚡
  </div>

  <h2 className="text-xl font-bold text-sky-400">
    POWER
  </h2>

</div>

              {/* Desktop */}
<ul className="mt-4 hidden space-y-2 text-slate-400 md:block">
  <li>• Player Power</li>
  <li>• Alliance Power</li>
  <li>• Archive</li>
  <li>• PDF Download</li>
</ul>

{/* Mobile */}
<ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400 md:hidden">
  <li>• Player Power</li>
  <li>• Archive</li>

  <li>• Alliance Power</li>
  <li>• PDF Download</li>
</ul>

              <div className="mt-3 md:mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
                Explore →
              </div>

            </div>

          </Link>
          <Link to="/rankings/pvp">

  <div className="group rounded-2xl border border-sky-400/30 bg-slate-900/60 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]">

    {/* Desktop */}
<div className="mb-5 hidden items-center justify-between md:flex">

  <h2 className="text-xl md:text-2xl font-bold text-sky-400">
    PVP
  </h2>

  <div className="text-4xl md:text-5xl">
    ⚔️
  </div>

</div>
{/* Mobile */}
<div className="mb-3 flex items-center gap-3 md:hidden">

  <div className="text-3xl">
    ⚔️
  </div>

  <h2 className="text-xl font-bold text-sky-400">
    PVP
  </h2>

</div>

    {/* Desktop */}
<ul className="mt-4 hidden space-y-2 text-slate-400 md:block">
  <li>• Player PvP</li>
  <li>• Alliance PvP</li>
  <li>• Archive</li>
  <li>• PDF Download</li>
</ul>

{/* Mobile */}
<ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400 md:hidden">
  <li>• Player PvP</li>
  <li>• Archive</li>

  <li>• Alliance PvP</li>
  <li>• PDF Download</li>
</ul>

    <div className="mt-3 md:mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
      Explore →
    </div>

  </div>

</Link>
<Link to="/rankings/gathering">
  <div className="group rounded-2xl border border-sky-400/30 bg-slate-900/60 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]">
    {/* Desktop */}
<div className="mb-5 hidden items-center justify-between md:flex">

  <h2 className="text-xl md:text-2xl font-bold text-sky-400">
    GATHERING
  </h2>

  <div className="text-4xl md:text-5xl">
    🌾
  </div>

</div>

{/* Mobile */}
<div className="mb-3 flex items-center gap-3 md:hidden">

  <div className="text-3xl">
    🌾
  </div>

  <h2 className="text-xl font-bold text-sky-400">
    GATHERING
  </h2>

</div>

    {/* Desktop */}
<ul className="mt-4 hidden space-y-2 text-slate-400 md:block">
  <li>• Player Gathering</li>
  <li>• Archive</li>
  <li>• PDF Download</li>
  <li>• Coming Soon</li>
</ul>

{/* Mobile */}
<ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400 md:hidden">
  <li>• Player Gathering</li>
  <li>• PDF Download</li>

  <li>• Archive</li>
  <li>• Coming Soon</li>
</ul>

    <div className="mt-3 md:mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
      Explore →
    </div>
  </div>
</Link>
<Link to="/rankings/mgm">
  <div className="group rounded-2xl border border-sky-400/30 bg-slate-900/60 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]">
    {/* Desktop */}
<div className="mb-5 hidden items-center justify-between md:flex">

  <h2 className="text-xl md:text-2xl font-bold text-sky-400">
    MGM
  </h2>

  <div className="text-4xl md:text-5xl">
    🏰
  </div>

</div>

{/* Mobile */}
<div className="mb-3 flex items-center gap-3 md:hidden">

  <div className="text-3xl">
    🏰
  </div>

  <h2 className="text-xl font-bold text-sky-400">
    MGM
  </h2>

</div>

    {/* Desktop */}
<ul className="mt-4 hidden space-y-2 text-slate-400 md:block">
  <li>• Player PvP</li>
  <li>• Alliance PvP</li>
  <li>• Leaderboards</li>
  <li>• PDF Download</li>
</ul>

{/* Mobile */}
<ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400 md:hidden">
  <li>• Player PvP</li>
  <li>• Leaderboards</li>

  <li>• Alliance PvP</li>
  <li>• PDF Download</li>
</ul>

    <div className="mt-3 md:mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
      Explore →
    </div>
  </div>
</Link>
<Link to="/rankings/server">
  <div className="group rounded-2xl border border-sky-400/30 bg-slate-900/60 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]">
    {/* Desktop */}
<div className="mb-5 hidden items-center justify-between md:flex">

  <h2 className="text-xl md:text-2xl font-bold text-sky-400">
    SERVER
  </h2>

  <div className="text-4xl md:text-5xl">
    🌍
  </div>

</div>

{/* Mobile */}
<div className="mb-3 flex items-center gap-3 md:hidden">

  <div className="text-3xl">
    🌍
  </div>

  <h2 className="text-xl font-bold text-sky-400">
    SERVER
  </h2>

</div>

    {/* Desktop */}
<ul className="mt-4 hidden space-y-2 text-slate-400 md:block">
  <li>• Top100 Combined</li>
  <li>• MGM Server PvP</li>
  <li>• MGM Server Activity</li>
  <li>• PDF Download</li>
</ul>

{/* Mobile */}
<ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400 md:hidden">
  <li>• Top100 Combined</li>
  <li>• MGM Activity</li>

  <li>• MGM Server PvP</li>
  <li>• PDF Download</li>
</ul>

    <div className="mt-3 md:mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
      Explore →
    </div>
  </div>
</Link>
<Link to="/rankings/pve">
  <div className="group rounded-2xl border border-sky-400/30 bg-slate-900/60 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]">
    {/* Desktop */}
<div className="mb-5 hidden items-center justify-between md:flex">

  <h2 className="text-xl md:text-2xl font-bold text-sky-400">
    PVE
  </h2>

  <div className="text-4xl md:text-5xl">
    🐉
  </div>

</div>

{/* Mobile */}
<div className="mb-3 flex items-center gap-3 md:hidden">

  <div className="text-3xl">
    🐉
  </div>

  <h2 className="text-xl font-bold text-sky-400">
    PVE
  </h2>

</div>

    {/* Desktop */}
<ul className="mt-4 hidden space-y-2 text-slate-400 md:block">
  <li>• World Boss</li>
  <li>• Invasion</li>
  <li>• RoB / GV</li>
  <li>• PDF Download</li>
</ul>

{/* Mobile */}
<ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400 md:hidden">
  <li>• World Boss</li>
  <li>• RoB / GV</li>

  <li>• Invasion</li>
  <li>• PDF Download</li>
</ul>

    <div className="mt-3 md:mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
      Explore →
    </div>
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