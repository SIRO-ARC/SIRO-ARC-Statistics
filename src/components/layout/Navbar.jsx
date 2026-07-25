import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const location = useLocation();
  const navItems = [
  { label: "Rankings", to: "/rankings" },
  { label: "Archive", to: "/archive" },
  { label: "Statistics", to: "/statistics" },
  { label: "About", to: "/about" },
];
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0B1220]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <Link
  to="/"
  className="text-xl font-bold tracking-wide transition hover:text-sky-400"
>
  SIRO ARC
</Link>

        <nav className="flex gap-8">

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
          <div className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-sky-400 animate-pulse" />
        )}
      </div>
    );
  })}

</nav>

      </div>
    </header>
  );
}