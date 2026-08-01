import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8 lg:-mt-12 lg:pt-10 lg:pb-6">
      <img
  src="/images/siro-stats-logo.png"
  alt="SIRO STATS"
  className="mx-auto -mt-[80px] w-[520px] max-w-full"
/>

<div className="-mt-16">

  <p className="mx-auto max-w-3xl text-lg text-slate-400 sm:text-xl">
    Explore player rankings, alliance rankings, leaderboards and statistics
    <br className="hidden lg:block" />
    {" "}from across the Avatar Legends: Realms Collide community.
  </p>

  <div className="mt-[28px] sm:mt-[32px]">
    <Link to="/rankings">
      <Button>
        View Rankings
      </Button>
    </Link>
  </div>

</div>
      
    </section>
  );
}