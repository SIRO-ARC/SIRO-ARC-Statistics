import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8 lg:-mt-12 lg:pt-10 lg:pb-6">
      <h1 className="text-4xl font-extrabold leading-none tracking-tight sm:text-6xl lg:text-7xl">
        SIRO ARC
        <span className="block text-sky-400">
          Statistics
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-400 sm:text-xl">
  Explore player rankings, alliance rankings, leaderboards and statistics
  <br className="hidden lg:block" />
  {" "}from across the Avatar Legends: Realms Collide community.
</p>

      <div className="mt-5 sm:mt-7">
        <Link to="/rankings">
          <Button>
            View Rankings
          </Button>
        </Link>
      </div>
      <div className="mx-auto mt-8 max-w-lg rounded-2xl border border-sky-400/30 bg-slate-900/60 p-1 shadow-[0_0_25px_rgba(56,189,248,0.20)]">
  

  <p className="mt-2 text-sm text-slate-400">
    Version 1.0
    <br />
    Released July 2026
  </p>

  <h4 className="mt-4 font-semibold text-sky-300">
    🚀 Coming Soon
  </h4>

  <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-300 sm:grid-cols-2">
    <li>• MGM Warzone Overview</li>
    <li>• MGM Archive</li>
    <li>• PvP Player Rankings</li>
    <li>• PvP Alliance Rankings</li>
    <li>• MGM Leaderboard</li>
    <li>• MGM Overall Statistics</li>
    <li>• Top 100 Rankings</li>
    <li>• Power Growth History</li>
    <li>• Interactive Charts</li>
    <li>• Live Community Chat</li>
  </ul>

  <p className="mt-4 text-xs text-slate-500">
    More features are already in development.
  </p>
</div>
    </section>
  );
}