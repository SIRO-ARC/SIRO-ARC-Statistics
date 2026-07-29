import PowerGrowthHistory from "./pages/PowerGrowthHistory";
import Archive from "./pages/Archive";
import Top10 from "./pages/Top10";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Features from "./components/home/Features";

import Rankings from "./pages/Rankings";
import PlayerProfile from "./pages/PlayerProfile";
import AllianceProfile from "./pages/AllianceProfile";
import PoweredBy from "./components/home/PoweredBy";
import MGM from "./pages/MGM";
import MgmStatistics from "./pages/MgmStatistics";

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PoweredBy />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();

useEffect(() => {
  const redirect = sessionStorage.getItem("redirect");

  if (redirect) {
    sessionStorage.removeItem("redirect");
    navigate(redirect, { replace: true });
  }
}, [navigate]);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <Navbar
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
/>

<div
  className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
    menuOpen
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none"
  }`}
/>

<div
  className={`transition-all duration-300 ${
    menuOpen ? "pointer-events-none select-none" : ""
  }`}
>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/top10" element={<Top10 />} />
  <Route path="/rankings" element={<Rankings />} />
  <Route
  path="/power-growth-history"
  element={<PowerGrowthHistory />}
/>
  <Route path="/mgm" element={<MGM />} />
  <Route path="/mgm-statistics" element={<MgmStatistics />} />
  <Route path="/archive" element={<Archive />} />
  <Route path="/player/:week/:name" element={<PlayerProfile />} />
  <Route path="/alliance/:week/:name" element={<AllianceProfile />}
/>
</Routes>
</div>
    </main>
  );
}