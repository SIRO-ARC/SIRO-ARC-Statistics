import { useEffect, useMemo, useState } from "react";
import { getMgm } from "../services/rankingService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MgmStatistics() {
  const [dataset, setDataset] = useState("post");
  const [loading, setLoading] = useState(true);
  const [mgmData, setMgmData] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const data = await getMgm(dataset);
        setMgmData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [dataset]);

  const statisticsData = useMemo(() => {

  if (!mgmData.length) return [];

  // 1. MGMs gruppieren (Datum + Uhrzeit)
  const mgmGroups = new Map();

  mgmData.forEach((row) => {

    const date = new Date(row.date);

if (Number(row.time) < 12) {
  date.setDate(date.getDate() - 1);
}

const key = date.toISOString().split("T")[0];

    if (!mgmGroups.has(key)) {
      mgmGroups.set(key, []);
    }

    mgmGroups.get(key).push(row);

  });

  // 2. Nach Datum sortieren
  const sorted = [...mgmGroups.entries()].sort(
    (a, b) => new Date(a[1][0].date) - new Date(b[1][0].date)
  );

  // 3. Statistiken berechnen
  return sorted.map(([_, rows], index) => {

    const uniqueWarzones = new Set();
    const uniqueAlliances = new Set();

    let participants = 0;

    rows.forEach((row) => {

      participants += Number(row.participants || 0);

      uniqueWarzones.add(row.warzone);

      uniqueAlliances.add(
        `${row.server}_${row.alliance}`
      );

    });

    return {

      mgm: `MGM ${index + 1}`,

      participants,

      alliances: uniqueAlliances.size,

      warzones: uniqueWarzones.size,

      averageParticipantsAlliance:
    uniqueAlliances.size === 0
        ? 0
        : Math.round(participants / uniqueAlliances.size),

    };

  });
  }, [mgmData]);
const summary = useMemo(() => {

  if (!statisticsData.length) return null;

  return {

    participants: statisticsData.reduce((max, item) =>
      item.participants > max.participants ? item : max
    ),

    alliances: statisticsData.reduce((max, item) =>
      item.alliances > max.alliances ? item : max
    ),

    warzones: statisticsData.reduce((max, item) =>
      item.warzones > max.warzones ? item : max
    ),

    average: statisticsData.reduce((max, item) =>
      item.averageParticipants > max.averageParticipants ? item : max
    ),

  };

}, [statisticsData]);


  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      <h1 className="mb-2 text-4xl font-bold">
        MGM Statistics
      </h1>

      <p className="mb-6 text-gray-400">
        Overview of all recorded MGM events.
      </p>

      <div className="mb-8 flex gap-3">

        <button
          onClick={() => setDataset("post")}
          className={`rounded-lg px-4 py-2 font-medium ${
            dataset === "post"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Post Migration
        </button>

        <button
          onClick={() => setDataset("pre")}
          className={`rounded-lg px-4 py-2 font-medium ${
            dataset === "pre"
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          Pre Migration
        </button>

      </div>
{!loading && summary && (

  <div className="mb-10 grid gap-4 md:grid-cols-3">

    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <p className="text-sm text-gray-400">
        Highest Participants
      </p>

      <p className="mt-2 text-3xl font-bold">
        {summary.participants.participants}
      </p>

      <p className="mt-1 text-sm text-blue-400">
        {summary.participants.mgm}
      </p>
    </div>

    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <p className="text-sm text-gray-400">
        Highest Alliances
      </p>

      <p className="mt-2 text-3xl font-bold">
        {summary.alliances.alliances}
      </p>

      <p className="mt-1 text-sm text-blue-400">
        {summary.alliances.mgm}
      </p>
    </div>

    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <p className="text-sm text-gray-400">
        Highest Warzones
      </p>

      <p className="mt-2 text-3xl font-bold">
        {summary.warzones.warzones}
      </p>

      <p className="mt-1 text-sm text-blue-400">
        {summary.warzones.mgm}
      </p>
    </div>


  </div>

)}
      {loading ? (
        <div className="text-gray-400">
          Loading MGM statistics...
        </div>
      ) : (
        <div className="text-gray-400">
          Loaded {statisticsData.length} MGM events.
          <div className="mt-10 rounded-xl border border-slate-700 bg-slate-900 p-6">

  
  <h2 className="mb-6 text-2xl font-bold">
    Total Participants
  </h2>

  <ResponsiveContainer width="100%" height={350}>

    <LineChart data={statisticsData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
  dataKey="mgm"
  tickMargin={15}
/>

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="participants"
        stroke="#3b82f6"
        strokeWidth={3}
        dot={{ r: 5 }}
      />

    </LineChart>

  </ResponsiveContainer>

</div>
<div className="mt-10 rounded-xl border border-slate-700 bg-slate-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    Total Alliances
  </h2>

  <ResponsiveContainer width="100%" height={350}>
    <LineChart data={statisticsData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
  dataKey="mgm"
  tickMargin={15}
/>

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="alliances"
        stroke="#22c55e"
        strokeWidth={3}
        dot={{ r: 5 }}
      />

    </LineChart>
  </ResponsiveContainer>

</div>
<div className="mt-10 rounded-xl border border-slate-700 bg-slate-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    Total Warzones
  </h2>

  <ResponsiveContainer width="100%" height={350}>
    <LineChart data={statisticsData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
  dataKey="mgm"
  tickMargin={15}
/>

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="warzones"
        stroke="#f59e0b"
        strokeWidth={3}
        dot={{ r: 5 }}
      />

    </LineChart>
  </ResponsiveContainer>

</div>
<div className="mt-10 rounded-xl border border-slate-700 bg-slate-900 p-6">

  <h2 className="mb-6 text-2xl font-bold">
    Average Participants / Alliance
  </h2>

  <ResponsiveContainer width="100%" height={350}>
    <LineChart data={statisticsData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
  dataKey="mgm"
  tickMargin={15}
/>

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="averageParticipantsAlliance"
        stroke="#a855f7"
        strokeWidth={3}
        dot={{ r: 5 }}
      />

    </LineChart>
  </ResponsiveContainer>

</div>
        </div>
      )}

    </div>
  );
}