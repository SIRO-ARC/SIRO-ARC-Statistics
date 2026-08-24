import Hero from "../components/home/Hero";
import PoweredBy from "../components/home/PoweredBy";

export default function Statistics() {
  return (
    <>
      <Hero compact />

      <section className="mx-auto mt-8 max-w-6xl px-4">
        <h1 className="text-4xl font-bold text-sky-400">
          📈 Statistics
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Explore detailed statistics, historical trends and analytics across
          all supported game features.
        </p>

        <div className="mt-10 rounded-2xl border border-sky-400/30 bg-slate-900/60 p-10 text-center shadow-[0_0_20px_rgba(56,189,248,0.15)]">
          <h2 className="text-3xl font-bold text-white">
            🚧 Coming Soon
          </h2>

          <p className="mt-4 text-slate-400">
            This section is currently under development.
          </p>
        </div>
      </section>

      <PoweredBy />
    </>
  );
}