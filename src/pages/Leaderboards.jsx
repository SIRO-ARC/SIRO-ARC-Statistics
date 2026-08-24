import { useEffect, useState } from "react";
import { getMgmLeaderboard } from "../services/leaderboardService";
import LeaderboardTable from "../components/tables/LeaderboardTable";
const SCORING = {

  WIN_POINTS: 100,
  CAPTURED_POINTS: 2,

  WIN_EXPONENT: 0.7,
  CAPTURED_EXPONENT: 0.9,

  TIME_2UTC: 1.00,
TIME_19UTC: 1.25,

};

export default function Leaderboards() {
  const [dataset, setDataset] = useState("pre");
  const [leaderboard, setLeaderboard] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {

  async function loadData() {

    setLoading(true);

    const mgm = await getMgmLeaderboard(dataset);
    const maxWarzones = {};

for (const entry of mgm) {

  const eventKey =
    `${entry.date}-${entry.time}`;

  if (
    !maxWarzones[eventKey] ||
    entry.warzone > maxWarzones[eventKey]
  ) {

    maxWarzones[eventKey] =
      entry.warzone;

  }

}

const grouped = {};

for (const entry of mgm) {

  if (!grouped[entry.id]) {

    grouped[entry.id] = {

      id: entry.id,

      alliance: entry.alliance,
      server: entry.server,

      latestDate: entry.date,

      mgms: 0,
      wins: 0,
      losses: 0,

      captured: 0,
      participants: 0,

      points: 0,

    };

  }

  const current = grouped[entry.id];
  const eventKey =
  `${entry.date}-${entry.time}`;

const maxWarzone =
  maxWarzones[eventKey];

const warzone =
  entry.warzone % 100;
  const timeMultiplier =
  entry.time === "19 UTC"
    ? SCORING.TIME_19UTC
    : SCORING.TIME_2UTC;

const winWarzoneFactor =
  1 /
  Math.pow(
    warzone,
    SCORING.WIN_EXPONENT
  );

const capturedWarzoneFactor =
  1 /
  Math.pow(
    warzone,
    SCORING.CAPTURED_EXPONENT
  );

  // Aktuellsten Allianznamen übernehmen
  if (entry.date > current.latestDate) {

    current.latestDate = entry.date;
    current.alliance = entry.alliance;
    current.server = entry.server;

  }

  current.mgms++;

  current.captured += entry.captured;
  current.participants += entry.participants;

  if (entry.won) {

  current.wins++;

  current.points +=
  SCORING.WIN_POINTS *
  winWarzoneFactor *
  timeMultiplier;

} else {

  current.losses++;

}

current.points +=
  entry.captured *
  SCORING.CAPTURED_POINTS *
  capturedWarzoneFactor *
  timeMultiplier;

}

const leaderboard = Object.values(grouped)
  .map((item) => ({

    ...item,

    winRate:
      item.mgms > 0
        ? (item.wins / item.mgms) * 100
        : 0,

    points: Math.round(item.points),

  }))
  .sort((a, b) => b.points - a.points);

setLeaderboard(leaderboard);

console.log(leaderboard);

setLoading(false);
  }

  loadData();

}, [dataset]);
const tableData = leaderboard.map((item, index) => ({

  rank: index + 1,

  alliance: item.alliance,

  server: item.server,

  mgms: item.mgms,

  wins: item.wins,

  winRate: item.winRate,

  points: item.points,

  captured: item.captured,

  participants: item.participants,

}));
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      <h1 className="mb-8 text-3xl font-bold text-white">
        MGM Leaderboards
      </h1>
<div className="mb-8 rounded-2xl border border-sky-500/40 bg-sky-500/10 p-6">

  <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-sky-300">
    🏆 SIRO Rating (Beta)
  </h2>

  <p className="mb-5 text-slate-300">
    The <span className="font-semibold text-white">SIRO Rating</span> ranks alliances based on their historical MGM performance using a custom scoring system.
  </p>

  <div className="grid gap-4 md:grid-cols-2">

    <div>
      <h3 className="mb-2 font-semibold text-white">
        Current Rating Factors
      </h3>

      <ul className="space-y-1 text-slate-300">
        <li>🏆 Wins</li>
        <li>🔥 Warzone Difficulty</li>
        <li>🏰 Territory Captures</li>
        <li>🌍 Timeslot Difficulty (2 UTC / 19 UTC)</li>
      </ul>
    </div>

    <div>
      <h3 className="mb-2 font-semibold text-white">
        Coming Soon
      </h3>

      <ul className="space-y-1 text-slate-300">
        <li>📊 Score Breakdown</li>
        <li>🔍 Advanced Filters</li>
        <li>👥 Alliance Profiles</li>
        <li>🏆 Additional Leaderboards</li>
      </ul>
    </div>

  </div>

</div>

      <div className="mb-8 flex gap-4">

        <button
          onClick={() => setDataset("pre")}
          className={`rounded-xl px-5 py-3 font-semibold transition ${
            dataset === "pre"
              ? "bg-sky-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          🛡️ Pre-Migration
        </button>

        <button
          onClick={() => setDataset("post")}
          className={`rounded-xl px-5 py-3 font-semibold transition ${
            dataset === "post"
              ? "bg-sky-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          🌍 Post-Migration
        </button>

      </div>
<div className="mb-8 grid gap-4 md:grid-cols-3">

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <div className="text-sm text-slate-400">
      Alliances
    </div>

    <div className="mt-2 text-3xl font-bold text-white">
      {leaderboard.length}
    </div>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <div className="text-sm text-slate-400">
      MGM Events
    </div>

    <div className="mt-2 text-3xl font-bold text-white">
      {new Set(mgm.map(entry => `${entry.date}-${entry.time}`)).size}
    </div>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
    <div className="text-sm text-slate-400">
      Servers
    </div>

    <div className="mt-2 text-3xl font-bold text-white">
      {new Set(leaderboard.map(a => a.server)).size}
    </div>
  </div>

</div>
      <LeaderboardTable
  data={tableData}
/>

    </div>
  );
}