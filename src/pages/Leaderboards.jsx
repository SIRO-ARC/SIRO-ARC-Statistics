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
import { generateMgmLeaderboardsPdf } from "../pdf/generateMgmLeaderboardsPdf";

const getEventTimestamp = (entry) => {
  const rawDate = String(entry.date ?? "").trim();
  const time = entry.time === "19 UTC" ? 19 : 2;

  // Spreadsheet dates can be localized strings such as
  // "Juli 18", "Aug. 1" or "Sept. 26".
  // Parse those explicitly so the latest MGM event is always identified correctly.
  const monthMatch = rawDate.match(/^([A-Za-zÄÖÜäöü]+)\.?\s+(\d{1,2})$/);
  const months = {
    jan: 0, january: 0, januar: 0,
    feb: 1, february: 1, februar: 1,
    mar: 2, march: 2, mär: 2, maerz: 2, märz: 2,
    apr: 3, april: 3,
    may: 4, mai: 4,
    jun: 5, june: 5, juni: 5,
    jul: 6, july: 6, juli: 6,
    aug: 7, august: 7,
    sep: 8, sept: 8, september: 8,
    oct: 9, october: 9, okt: 9, oktober: 9,
    nov: 10, november: 10,
    dec: 11, december: 11, dez: 11, dezember: 11,
  };

  if (monthMatch) {
    const month = months[monthMatch[1].toLowerCase()];
    const day = Number(monthMatch[2]);

    if (month !== undefined && Number.isFinite(day)) {
      return Date.UTC(2026, month, day, time);
    }
  }

  const parsed = Date.parse(rawDate);
  if (!Number.isNaN(parsed)) {
    return parsed + time * 60 * 60 * 1000;
  }

  return Number.NEGATIVE_INFINITY;
};

const getAllianceKey = (item) => String(item.id ?? "").trim();

const mgmDataForPreviousRank = (mgm, latestEventTimestamp) =>
  mgm.filter((entry) => getEventTimestamp(entry) < latestEventTimestamp);

const buildLeaderboard = (mgm) => {
  const maxWarzones = {};

  for (const entry of mgm) {
    const eventKey = `${entry.date}-${entry.time}`;

    if (!maxWarzones[eventKey] || entry.warzone > maxWarzones[eventKey]) {
      maxWarzones[eventKey] = entry.warzone;
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
        latestEventTimestamp: getEventTimestamp(entry),
        mgms: 0,
        wins: 0,
        losses: 0,
        captured: 0,
        participants: 0,
        points: 0,
      };
    }

    const current = grouped[entry.id];
    const eventKey = `${entry.date}-${entry.time}`;
    const warzone = entry.warzone % 100;
    const timeMultiplier =
      entry.time === "19 UTC"
        ? SCORING.TIME_19UTC
        : SCORING.TIME_2UTC;

    const winWarzoneFactor =
      1 / Math.pow(warzone, SCORING.WIN_EXPONENT);

    const capturedWarzoneFactor =
      1 / Math.pow(warzone, SCORING.CAPTURED_EXPONENT);

    const eventTimestamp = getEventTimestamp(entry);

    if (eventTimestamp > current.latestEventTimestamp) {
      current.latestDate = entry.date;
      current.latestEventTimestamp = eventTimestamp;
      current.alliance = entry.alliance;
      current.server = entry.server;
    }

    current.mgms++;
    current.captured += entry.captured;
    current.participants += entry.participants;

    if (entry.won) {
      current.wins++;
      current.points +=
        SCORING.WIN_POINTS * winWarzoneFactor * timeMultiplier;
    } else {
      current.losses++;
    }

    current.points +=
      entry.captured *
      SCORING.CAPTURED_POINTS *
      capturedWarzoneFactor *
      timeMultiplier;

    void maxWarzones[eventKey];
  }

  return Object.values(grouped)
    .map((item) => ({
      ...item,
      winRate: item.mgms > 0 ? (item.wins / item.mgms) * 100 : 0,
      pointsExact: item.points,
      points: Math.round(item.points),
    }))
    .sort((a, b) => b.points - a.points);
};

export default function Leaderboards() {
  const [dataset, setDataset] = useState("pre");
  const [leaderboard, setLeaderboard] = useState([]);
  const [mgmData, setMgmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mgmEventCount, setMgmEventCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      try {
        const mgm = await getMgmLeaderboard(dataset);
        const currentLeaderboard = buildLeaderboard(mgm);

        setLeaderboard(currentLeaderboard);
        setMgmData(mgm);
        setMgmEventCount(new Set(mgm.map((entry) => entry.date)).size);
      } catch (err) {
        console.error("Failed to load MGM leaderboard:", err);
        setLeaderboard([]);
        setMgmData([]);
        setMgmEventCount(0);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [dataset]);

  const latestGlobalEventDay = Math.max(
  ...mgmData.map((entry) =>
    Math.floor(getEventTimestamp(entry) / 86400000)
  )
);
  const previousLeaderboardCache = new Map();

  const latestGlobalTimestamp = Math.max(
  ...mgmData.map((entry) => getEventTimestamp(entry))
);
  const tableData = leaderboard.map((item, index) => {
    const rank = index + 1;

    // Compare every alliance against the ranking immediately BEFORE
    // that alliance's own most recent MGM. This is intentionally not
    // a single global previous ranking: 2 UTC and 19 UTC alliances can
    // have different most-recent events.
    const timestamp = item.latestEventTimestamp;
    if (!previousLeaderboardCache.has(timestamp)) {
      const previousMgm = mgmDataForPreviousRank(mgmData, timestamp);
      previousLeaderboardCache.set(timestamp, buildLeaderboard(previousMgm));
    }

    const previousLeaderboard = previousLeaderboardCache.get(timestamp);
    const previousRanked = previousLeaderboard.find(
      (previousItem) => getAllianceKey(previousItem) === getAllianceKey(item)
    );
    const previousRank = previousRanked
      ? previousLeaderboard.indexOf(previousRanked) + 1
      : null;

    return {
      rank,
      rankChange: previousRank ? previousRank - rank : 0,
      alliance: item.alliance,
      server: item.server,
      mgms: item.mgms,
      wins: item.wins,
      winRate: item.winRate,
      winRateChange:
  Math.floor(item.latestEventTimestamp / 86400000) === latestGlobalEventDay &&
  previousRanked
    ? item.winRate - previousRanked.winRate
    : 0,
      points: item.points,
      pointsChange:
  Math.floor(item.latestEventTimestamp / 86400000) === latestGlobalEventDay &&
  previousRanked
    ? (() => {
            const rawDelta = item.pointsExact - previousRanked.pointsExact;
            if (rawDelta === 0) return 0;
            const roundedDelta = Math.round(rawDelta);
            return roundedDelta === 0
              ? rawDelta > 0
                ? 1
                : -1
              : roundedDelta;
          })()
        : 0,
      captured: item.captured,
      participants: item.participants,
    };
  });
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

        <button
  onClick={() =>
    generateMgmLeaderboardsPdf(
      tableData,
      dataset
    )
  }
  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
>
  📄 Download PDF
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
      {mgmEventCount}
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