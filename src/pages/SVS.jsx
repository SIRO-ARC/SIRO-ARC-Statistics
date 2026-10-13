
import { Link } from "react-router-dom";
import PoweredBy from "../components/home/PoweredBy";

const svsFeatures = [
  {
    title: "SVS Prelude Overview",
    description:
      "Explore Warzones, server positions, final Prelude Points and Ultimate Groups.",
    icon: "⚔️",
    link: "/svs-prelude",
    action: "View Warzones",
    accent: "border-sky-400/30 hover:border-sky-400",
  },
  {
    title: "SVS Prelude Ranking",
    description:
      "Compare all servers in the global ranking, sorted by final Prelude Points.",
    icon: "🏆",
    link: "/svs-prelude-ranking",
    action: "View Global Ranking",
    accent: "border-sky-400/30 hover:border-sky-400",
  },
];

export default function SVS() {
  return (
    <>
      <section className="mx-auto mt-10 max-w-6xl px-4 text-center">
        <h1 className="text-5xl font-bold text-sky-400">
          ⚔️ Server vs Server
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-slate-400">
          Explore SVS Prelude Warzones, server matchups and global rankings.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {svsFeatures.map((feature) => (
            <Link
              key={feature.link}
              to={feature.link}
              className={`group rounded-2xl border bg-[#111A2E] p-6 transition hover:-translate-y-1 hover:shadow-lg ${feature.accent}`}
            >
              <div className="text-4xl">{feature.icon}</div>

              <h2 className="mt-4 text-2xl font-bold text-white">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>

              <div className="mt-5 font-semibold text-sky-400 transition-transform duration-300 group-hover:translate-x-2">
                {feature.action} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PoweredBy />
    </>
  );
}
