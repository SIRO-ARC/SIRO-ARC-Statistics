import Statistics from "./pages/Statistics";
import Tools from "./pages/Tools";
import Guides from "./pages/Guides";
import PowerGrowthHistory from "./pages/PowerGrowthHistory";
import Archive from "./pages/Archive";
import Top10 from "./pages/Top10";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Features from "./components/home/Features";

import Rankings from "./pages/PowerRankings";
import PlayerProfile from "./pages/PlayerProfile";
import AllianceProfile from "./pages/AllianceProfile";
import PoweredBy from "./components/home/PoweredBy";
import AvatarRealmsCollide from "./pages/AvatarRealmsCollide";
import MGM from "./pages/MGM";
import MgmStatistics from "./pages/MgmStatistics";

import Home from "./pages/Home";
import Info from "./pages/Info";
import Leaderboards from "./pages/Leaderboards";
import RankingsHome from "./pages/RankingsHome";
import PvpRankings from "./pages/PvpRankings";
import GatheringRankings from "./pages/GatheringRankings";
import MgmRankings from "./pages/MgmRankings";
import ServerRankings from "./pages/ServerRankings";
import PveRankings from "./pages/PveRankings";
import Admin from "./pages/Admin";
import MgmParticipantsRanking from "./pages/MgmParticipantsRanking";
import MgmTerritoryRanking from "./pages/MgmTerritoryRanking";
import MgmAllianceActivityRanking from "./pages/MgmAllianceActivityRanking";
import MgmServerActivityRanking from "./pages/MgmServerActivityRanking";
import MgmAverageParticipantsRanking from "./pages/MgmAverageParticipantsRanking";
import ServerPlayerPowerRanking from "./pages/ServerPlayerPowerRanking";

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
    <main className="relative min-h-screen bg-[#0B1220] text-white">
<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

  {/* Global SIRO STATS background */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/siro-stats-background.jpg')",
    }}
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-[#0B1220]/45" />

  {/* Additional readability gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/20 via-[#0B1220]/45 to-[#0B1220]/80" />

</div>
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
  className={`relative z-10 transition-all duration-300 ${
    menuOpen ? "pointer-events-none select-none" : ""
  }`}
>
  <Routes>
  <Route path="/" element={<Home />} />

  <Route
    path="/avatar-realms-collide"
    element={<AvatarRealmsCollide />}
  />

  <Route path="/top10" element={<Top10 />} />
  <Route path="/rankings" element={<RankingsHome />} />
<Route path="/rankings/power" element={<Rankings />} />
<Route path="/rankings/pvp" element={<PvpRankings />} />

<Route
  path="/rankings/gathering"
  element={<GatheringRankings />}
/>

<Route
  path="/rankings/mgm"
  element={<MgmRankings />}
/>

<Route
  path="/rankings/mgm/territory"
  element={<MgmTerritoryRanking />}
/>

<Route
  path="/rankings/mgm/participants"
  element={<MgmParticipantsRanking />}
/>

<Route
  path="/rankings/mgm/alliance-activity"
  element={<MgmAllianceActivityRanking />}
/>

<Route
  path="/rankings/mgm/server-activity"
  element={<MgmServerActivityRanking />}
/>

<Route
  path="/rankings/mgm/average-participants"
  element={<MgmAverageParticipantsRanking />}
/>

<Route
  path="/rankings/server"
  element={<ServerRankings />}
/>

<Route
  path="/rankings/server/player-power"
  element={<ServerPlayerPowerRanking />}
/>

<Route
  path="/rankings/server/alliance-power"
  element={
    <ServerPlayerPowerRanking
      type="alliance-power"
    />
  }
/>

<Route
  path="/rankings/server/player-pvp"
  element={
    <ServerPlayerPowerRanking
      type="player-pvp"
    />
  }
/>

<Route
  path="/rankings/server/alliance-pvp"
  element={
    <ServerPlayerPowerRanking
      type="alliance-pvp"
    />
  }
/>

<Route
  path="/rankings/pve"
  element={<PveRankings />}
/>

  <Route
    path="/power-growth-history"
    element={<PowerGrowthHistory />}
  />

  <Route path="/mgm" element={<MGM />} />

  <Route
    path="/leaderboards"
    element={<Leaderboards />}
  />

  <Route path="/mgm-statistics" element={<MgmStatistics />} />
  <Route path="/archive" element={<Archive />} />
  <Route path="/info" element={<Info />} />

  {/* Neue Seiten */}
  <Route path="/statistics" element={<Statistics />} />
  <Route path="/tools" element={<Tools />} />
  <Route path="/guides" element={<Guides />} />

  <Route
  path="/player/:category/:week/:name"
  element={<PlayerProfile />}
/>

<Route
  path="/alliance/:category/:week/:name"
  element={<AllianceProfile />}
/>

<Route
  path="/player/:week/:name"
  element={<PlayerProfile />}
/>

<Route
  path="/alliance/:week/:name"
  element={<AllianceProfile />}
/>
<Route path="/admin" element={<Admin />} />
</Routes>
</div>
    </main>
  );
}