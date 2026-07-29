import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  Trophy,
  Archive,
  BarChart3,
  Info,
  ChevronRight,
  Swords,
  LineChart,
} from "lucide-react";

export default function Navbar({
  menuOpen,
  setMenuOpen,
}) {
  const location = useLocation();

  const navItems = [
  { label: "Top 10", to: "/top10" },
  { label: "Rankings", to: "/rankings" },
  { label: "Power Growth", to: "/power-growth-history" },
  { label: "MGM", to: "/mgm" },
  { label: "MGM-Statistics", to: "/mgm-statistics" },
  { label: "Archive", to: "/archive" },
  { label: "About", to: "/about" },
];

  const navIcons = {
    "/top10": Trophy,
    "/rankings": Trophy,
    "/power-growth-history": LineChart,
    "/mgm": Swords,
    "/mgm-statistics": BarChart3,
    "/archive": Archive,
    "/about": Info,
  };

  return (
  <header className="sticky top-0 z-50 bg-[#0B1220]/80 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-start px-4 pt-3 sm:px-6 lg:px-8">

      {/* Logo */}
      <Link
        to="/"
        className="relative z-20 flex-shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <img
          src={logo}
          alt="SIRO ARC"
          className="h-30 w-30 rounded-full object-cover shadow-xl"
        />
      </Link>

      {/* Right Side */}
      <div className="ml-6 flex flex-1 flex-col">

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-end gap-8 pt-3">
          {navItems.map((item) => {
            const active = location.pathname === item.to;

            return (
              <div
                key={item.to}
                className="relative"
              >
                <Link
                  to={item.to}
                  className={`font-medium transition-all duration-200 ${
                    active
                      ? "text-sky-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>

                {active && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-sky-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Line */}
{/* Desktop Line */}
<div className="mt-5 hidden h-px rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)] md:block" />
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="ml-auto rounded-lg p-2 text-2xl text-white md:hidden"
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </div>
    <div className="mt-2 mx-4 ml-24 h-px rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)] md:hidden sm:mx-6" />
    <div className="h-3 md:hidden" />

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="border-t border-gray-800 bg-[#0B1220] shadow-2xl md:hidden">
        <nav className="flex flex-col gap-3 px-4 py-4">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            const Icon = navIcons[item.to];

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-200 ${
                  active
                    ? "border-sky-400 bg-slate-800/70 text-sky-400 shadow-lg shadow-sky-500/10"
                    : "border-slate-700 bg-slate-900/70 text-gray-200 hover:border-slate-500 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-xl p-2 ${
                      active
                        ? "bg-sky-500/10 text-sky-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <span className="text-lg font-medium">
                    {item.label}
                  </span>
                </div>

                <ChevronRight
                  size={20}
                  className={`${
                    active
                      ? "translate-x-1 text-sky-400"
                      : "text-slate-500"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
        )}
  </header>
);
}