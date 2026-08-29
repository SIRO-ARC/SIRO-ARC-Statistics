import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  Trophy,
  Archive,
  Info,
  Globe,
  ChevronRight,
  Swords,
  LineChart,
} from "lucide-react";

export default function Navbar({
  menuOpen,
  setMenuOpen,
}) {
  const location = useLocation();

const isPlatformHome = location.pathname === "/";

  const navItems = isPlatformHome
  ? [
      {
        label: "Avatar: Realms Collide",
        to: "/avatar-realms-collide",
      },
    ]
  : [
      { label: "Home", to: "/" },
      { label: "Rankings", to: "/rankings" },
      { label: "MGM", to: "/mgm" },
      { label: "Tools", to: "/tools" },
      { label: "Guides", to: "/guides" },
      { label: "Info", to: "/info" },
    ];

  const navIcons = {
  "/avatar-realms-collide": Globe,

  "/": Globe,
  "/rankings": Trophy,
  "/mgm": LineChart,
  "/tools": Swords,
  "/guides": Archive,
  "/info": Info,
};

  return (
  <header
  className={`sticky top-0 z-50 border-b border-sky-400/10 bg-[#0B1220]/35 backdrop-blur-md ${
    isPlatformHome ? "" : "h-[62px]"
  }`}
>
  <div
    className={`mx-auto flex max-w-7xl items-start px-4 sm:px-6 lg:px-8 ${
      isPlatformHome ? "pt-3" : "pt-1"
    }`}
  >

    {/* Logo */}

    <div className="relative z-20 flex-shrink-0">
      <Link
        to="/"
        className={`block transition-transform duration-200 hover:scale-105 ${
  isPlatformHome ? "" : "translate-y-[3px]"
}`}
      >
        <img
          src={logo}
          alt="SIRO Statistics"
          className={`rounded-full object-cover shadow-xl ${
            isPlatformHome
              ? "h-20 w-20 md:h-30 md:w-30"
              : "h-10 w-10 md:h-12 md:w-12"
          }`}
        />
      </Link>
    </div>

    {/* Right Side */}

    <div
      className={`ml-4 flex flex-1 flex-col ${
        isPlatformHome ? "md:ml-6" : "md:ml-5"
      }`}
    >

      {/* Desktop Navigation */}

      <div
        className={`hidden justify-end gap-4 md:flex ${
          isPlatformHome ? "pt-3" : "pt-[3px]"
        }`}
      >
        {navItems.map((item) => {
          const active = location.pathname === item.to;

          return (
            <div
              key={item.to}
              className="relative"
            >
              <Link
                to={item.to}
                className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                  isPlatformHome
                    ? "border-sky-400/30 bg-sky-500/5 text-sky-400 hover:border-sky-400 hover:bg-sky-500/10 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)]"
                    : active
                      ? "border-sky-400 bg-sky-500/10 text-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.22)]"
                      : "border-slate-500 text-gray-300 hover:border-sky-300 hover:text-white"
                }`}
              >
                {isPlatformHome ? (
                  <>
                    <span>🌍</span>
                    <span>Open {item.label}</span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                ) : (
                  item.label
                )}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Desktop Line */}

      <div
        className={`hidden h-px rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)] md:block ${
          isPlatformHome ? "mt-5" : "mt-[8px]"
        }`}
      />
    </div>

    {/* Hamburger */}

    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="ml-auto rounded-lg p-2 text-2xl text-white md:hidden"
    >
      {menuOpen ? "✕" : "☰"}
    </button>
  </div>

  {/* Mobile Line */}

  <div
    className={`-mt-2 mx-4 ml-20 h-px rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400 to-sky-500/20 shadow-[0_0_10px_rgba(56,189,248,0.45)] md:hidden sm:mx-6 ${
      isPlatformHome ? "" : "-mt-1"
    }`}
  />

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