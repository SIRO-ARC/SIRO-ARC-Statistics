import Archive from "./pages/Archive";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Features from "./components/home/Features";

import Rankings from "./pages/Rankings";
import PlayerProfile from "./pages/PlayerProfile";
import AllianceProfile from "./pages/AllianceProfile";

function Home() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white">
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/rankings" element={<Rankings />} />
  <Route path="/archive" element={<Archive />} />
  <Route path="/player/:week/:name" element={<PlayerProfile />} />
  <Route path="/alliance/:week/:name" element={<AllianceProfile />}
/>
</Routes>
    </main>
  );
}