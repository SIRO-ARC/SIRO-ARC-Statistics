import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero({ compact = false }) {
  return (
    <section
  className={`mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 ${
    compact
      ? "py-4 -mt-7 lg:-mt-18 lg:pt-4 lg:pb-2"
      : "py-8 lg:-mt-12 lg:pt-10 lg:pb-6"
  }`}
>
      <img
  src="/images/siro-stats-logo.png"
  alt="SIRO STATS"
  className={`mx-auto w-[520px] max-w-full ${
    compact ? "-mt-[35px]" : "-mt-[80px]"
  }`}
/>

{compact ? (
  <div className="-mt-[60px]" />
) : (
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
)}

      
    </section>
  );
}