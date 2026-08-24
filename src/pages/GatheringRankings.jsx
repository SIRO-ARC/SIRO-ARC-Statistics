import PoweredBy from "../components/home/PoweredBy";

export default function GatheringRankings() {
  return (
    <>
      <section className="mx-auto mt-8 max-w-6xl px-4 text-center">

        <h1 className="text-5xl font-bold text-sky-400">
          🌾 Gathering Rankings
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          Browse all gathering rankings.
        </p>

      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">

        <div className="rounded-2xl border border-sky-400/30 bg-slate-900/60 p-8 text-center">

          <h2 className="text-3xl font-bold text-sky-400">
            🚧 Coming Soon
          </h2>

          <p className="mt-4 text-slate-400">
            Gathering rankings will be available here soon.
          </p>

        </div>

      </section>

      <PoweredBy />
    </>
  );
}