import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24 text-center">

      <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
  SIRO ARC
  <span className="block text-sky-400">
    Statistics
  </span>
</h1>
      <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-400">
  Explore player rankings, alliance rankings and weekly
  snapshots from across the Avatar Legends:
  Realms Collide community.
</p>

      <div className="mt-14">
  <Link to="/rankings">
    <Button>
      View Rankings
    </Button>
  </Link>
</div>
    </section>
  );
}