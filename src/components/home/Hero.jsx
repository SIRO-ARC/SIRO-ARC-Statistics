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
  Explore player rankings, alliance rankings and weekly snapshots
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
    </section>
  );
}