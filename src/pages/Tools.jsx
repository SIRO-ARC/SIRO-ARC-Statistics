import { Link } from "react-router-dom";
import PoweredBy from "../components/home/PoweredBy";

export default function Tools() {
  return (
    <>
      <section className="mx-auto mt-10 max-w-6xl px-4 text-center">

        <h1 className="text-5xl font-bold text-sky-400">
          🛠️ Tools
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-400">
          Explore powerful tools and utilities for Avatar: Realms Collide.
        </p>

      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

{/* Power Growth History */}

<Link
  to="/power-growth-history"
  className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
>
  <div className="text-4xl">
    📈
  </div>

  <h2 className="mt-4 text-2xl font-bold text-white">
    Power Growth History
  </h2>

  <p className="mt-2 text-sm leading-6 text-slate-400">
    Track player and alliance power growth across historical rankings.
  </p>

  <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
    View Growth History →
  </div>
</Link>

          {/* Talent Tree Builder */}

          <Link
            to="/tools/talent-builder"
            className="group rounded-2xl border border-slate-700 bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg"
          >
            <div className="text-4xl">
              🌳
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white">
              Talent Tree Builder
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Build, customize and optimize your heroes' talent trees.
            </p>

            <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
              Open Builder →
            </div>
          </Link>

        </div>

      </section>

      <PoweredBy />
    </>
  );
}