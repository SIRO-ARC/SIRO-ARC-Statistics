import { useEffect, useMemo, useState } from "react";
import WarzoneCard from "../components/mgm/WarzoneCard";
import { getMgm } from "../services/rankingService";
import { formatDate } from "../utils/formatDate";

export default function MGM() {
  const [dataset, setDataset] = useState("post");
  const [mgmData, setMgmData] = useState([]);
const [isLoading, setIsLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedWarzone, setSelectedWarzone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
  async function loadData() {
  setIsLoading(true);

setMgmData([]);
setSelectedEvent("");
setSelectedTime("");
setSelectedWarzone("");

const data = await getMgm(dataset);

  setMgmData(data);

  const uniqueEvents = [...new Set(data.map(item => item.date))].sort();

  if (uniqueEvents.length > 0) {
    setSelectedEvent(uniqueEvents[uniqueEvents.length - 1]);
  }

  setIsLoading(false);
}

loadData();
}, [dataset]);
  useEffect(() => {
  setSelectedEvent("");
  setSelectedTime("");
  setSelectedWarzone("");
  setSearch("");
}, [dataset]);
useEffect(() => {
  setSelectedTime("");
  setSelectedWarzone("");
}, [selectedEvent]);
useEffect(() => {
  setSelectedWarzone("");
}, [selectedTime]);
useEffect(() => {
  if (search.trim()) {
    setSelectedEvent("");
    setSelectedTime("");
    setSelectedWarzone("");
  }
}, [search]);

  const events = useMemo(() => {
    return [...new Set(mgmData.map(item => item.date))].sort();
  }, [mgmData]);

  const timeSlots = useMemo(() => {

  let data = mgmData;

  if (selectedEvent) {
    data = data.filter(item => item.date === selectedEvent);
  }

  return [...new Set(data.map(item => item.time))].sort();

}, [
  mgmData,
  selectedEvent
]);

  const warzones = useMemo(() => {

  let data = mgmData;

  if (selectedEvent) {
    data = data.filter(item => item.date === selectedEvent);
  }

  if (selectedTime) {
    data = data.filter(item => item.time === selectedTime);
  }

  return [...new Set(data.map(item => item.warzone))]
    .sort((a, b) => a - b);

}, [
  mgmData,
  selectedEvent,
  selectedTime
]);
  const filteredData = useMemo(() => {
  return mgmData.filter((item) => {

    if (selectedEvent && item.date !== selectedEvent) {
      return false;
    }

    if (selectedTime && item.time !== selectedTime) {
      return false;
    }

    if (
      selectedWarzone &&
      item.warzone !== Number(selectedWarzone)
    ) {
      return false;
    }

    

    return true;

  });
}, [
  mgmData,
  selectedEvent,
  selectedTime,
  selectedWarzone,
  search
]);
const matches = useMemo(() => {
  const warzoneMap = {};
  const getMatchKey = (item) =>
  `${item.date}-${item.time}-${item.warzone}`;

  filteredData.forEach((item) => {
    const matchKey = getMatchKey(item);

if (!warzoneMap[matchKey]) {
  warzoneMap[matchKey] = {
    warzone: item.warzone,
    date: item.date,
    time: item.time,
    winner: null,
    opponents: [],
  };
}

    if (item.won) {
  warzoneMap[matchKey].winner = item;
} else {
  warzoneMap[matchKey].opponents.push(item);
}
  });

  return Object.values(warzoneMap).sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});
}, [filteredData]);
const visibleMatches = useMemo(() => {
  if (!search.trim()) {
    return matches;
  }

  return matches.filter((match) => {
    // Gewinner prüfen
    if (match.winner && String(match.winner.server) === search.trim()) {
      return true;
    }

    // Gegner prüfen
    return match.opponents.some(
      (opponent) => String(opponent.server) === search.trim()
    );
  });
}, [matches, search]);



  return (
    <div className="mx-auto max-w-7xl px-4 py-8">

      <h1 className="text-4xl font-bold text-white">
        MGM Overview
      </h1>

      <div className="mt-8 rounded-xl bg-gray-900 p-6">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          {/* Dataset */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              MGM Dataset
            </label>

            <select
  disabled={isLoading}
  value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
            >
              <option value="post">MGM Post-Migration</option>
              <option value="pre">MGM Pre-Migration</option>
            </select>
          </div>

          {/* Event */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              MGM Event
            </label>

            <select
  disabled={isLoading}
  value={selectedEvent}
              onChange={(e) => {
  setSelectedEvent(e.target.value);
  setSearch("");
}}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
            >
              <option value="">
  {isLoading ? "Loading data..." : "All Events"}
</option>

              {events.map(event => (
                <option key={event} value={event}>
                  {formatDate(event)}
                </option>
              ))}
            </select>
          </div>
          

          {/* Time */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Time Slot
            </label>

            <select
  disabled={isLoading}
  value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
            >
              <option value="">
  {isLoading ? "Loading data..." : "All Time Slots"}
</option>

              {timeSlots.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Warzone */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Warzone
            </label>

            <select
  disabled={isLoading}
  value={selectedWarzone}
              onChange={(e) => setSelectedWarzone(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
            >
              <option value="">
  {isLoading ? "Loading data..." : "All Warzones"}
</option>

              {warzones.map(zone => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
{/*
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
  Server
</label>

            <input
              type="text"
              placeholder="Search Server (e.g. 1023)"
              value={search}
              onChange={(e) => {
  const value = e.target.value;

  setSearch(value);

  if (value.trim() !== "") {
    setSelectedEvent("");
    setSelectedTime("");
    setSelectedWarzone("");
  }
}}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500"
            />
          </div>
          */}

        </div>

      </div>
      <div className="mt-8 space-y-8">

  {visibleMatches.map((match) => (

    <WarzoneCard
  key={`${match.date}-${match.time}-${match.warzone}`}
  match={match}
/>

  ))}

</div>

    </div>
    
  );
}