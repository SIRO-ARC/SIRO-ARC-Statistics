import Hero from "../components/home/Hero";
import PoweredBy from "../components/home/PoweredBy";

export default function Tools() {
  return (
    <>
      <Hero compact />

      <section className="mx-auto mt-8 max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-sky-400">
          🛠 Tools
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Powerful calculators, planners and utilities for competitive players.
        </p>

        <div className="mt-10 rounded-2xl border border-sky-400/30 bg-slate-900/60 p-10 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <h2 className="text-3xl font-bold text-white">
            🚧 Coming Soon
          </h2>

          <p className="mt-4 text-slate-400">
            New community tools are currently in development.
          </p>
        </div>
      </section>

      <PoweredBy />
    </>
  );
}