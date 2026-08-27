import { useEffect, useMemo, useState, useRef } from "react";
import WarzoneCard from "../components/mgm/WarzoneCard";
import { getMgm } from "../services/rankingService";
import { formatDate } from "../utils/formatDate";
import { generateMgmOverviewPdf } from "../pdf/generateMgmOverviewPdf";

export default function MGM() {
  const [dataset, setDataset] = useState("post");
  const [mgmData, setMgmData] = useState([]);
const [isLoading, setIsLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState("");
const [selectedTime, setSelectedTime] = useState("");
const [selectedWarzone, setSelectedWarzone] = useState("");
const [selectedServer, setSelectedServer] = useState("");
const [selectedAlliance, setSelectedAlliance] = useState([]);
const [allianceDropdownOpen, setAllianceDropdownOpen] = useState(false);
const allianceDropdownRef = useRef(null);

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
  setSelectedServer("");
  setSelectedAlliance([]);
  setAllianceDropdownOpen(false);
}, [dataset]);

useEffect(() => {
  setSelectedTime("");
  setSelectedWarzone("");
}, [selectedEvent]);

useEffect(() => {
  setSelectedAlliance([]);
  setAllianceDropdownOpen(false);
}, [selectedServer]);

useEffect(() => {
  function handleClickOutside(event) {
    if (
      allianceDropdownRef.current &&
      !allianceDropdownRef.current.contains(event.target)
    ) {
      setAllianceDropdownOpen(false);
    }
  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

useEffect(() => {
  setSelectedWarzone("");
}, [selectedTime]);


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

const servers = useMemo(() => {
  return [...new Set(
    mgmData
      .map((item) => item.server)
      .filter(
        (server) =>
          server !== null &&
          server !== undefined &&
          server !== ""
      )
  )].sort((a, b) => Number(a) - Number(b));
}, [mgmData]);

const alliances = useMemo(() => {
  if (!selectedServer) {
    return [];
  }

  return [...new Set(
    mgmData
      .filter(
        (item) =>
          String(item.server) ===
          String(selectedServer)
      )
      .map((item) => item.alliance)
      .filter(
        (alliance) =>
          alliance !== null &&
          alliance !== undefined &&
          alliance !== ""
      )
  )].sort();
}, [mgmData, selectedServer]);

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
  if (!selectedServer) {
    return matches;
  }

  return matches.filter((match) => {
    const participants = [
      ...(match.winner ? [match.winner] : []),
      ...match.opponents,
    ];

    return participants.some((item) => {
      const serverMatches =
        String(item.server) ===
        String(selectedServer);

      if (!serverMatches) {
        return false;
      }

      if (selectedAlliance.length === 0) {
  return true;
}

return selectedAlliance.includes(
  String(item.alliance)
);
    });
  });
}, [
  matches,
  selectedServer,
  selectedAlliance
]);



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

          {/* PDF Download */}

          <div className="order-7 flex items-end md:col-span-2 xl:col-span-1 xl:order-5">
            <button
              onClick={() =>
                generateMgmOverviewPdf(
                  visibleMatches,
                  dataset
                )
              }
              disabled={
                isLoading ||
                visibleMatches.length === 0
              }
              className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              📄 Download PDF
            </button>
          </div>


                    {/* Server */}

          <div className="order-5 xl:order-6">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Server
            </label>

            <select
              disabled={isLoading}
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white"
            >
              <option value="">
                {isLoading ? "Loading data..." : "All Servers"}
              </option>

              {servers.map((server) => (
                <option key={server} value={server}>
                  {server}
                </option>
              ))}
            </select>
          </div>
                    {/* Alliance */}

<div
  ref={allianceDropdownRef}
  className="order-6 xl:order-7 relative"
>
  <label className="mb-2 block text-sm font-medium text-gray-300">
    Alliance
  </label>

  <button
    type="button"
    disabled={
      isLoading ||
      !selectedServer
    }
    onClick={() =>
      setAllianceDropdownOpen(
        !allianceDropdownOpen
      )
    }
    className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3 text-left text-white disabled:cursor-not-allowed disabled:opacity-50"
  >
    <span className="truncate">
      {selectedAlliance.length === 0
        ? "All Alliances"
        : selectedAlliance.join(", ")}
    </span>

    <span className="ml-2 text-gray-400">
      ▼
    </span>
  </button>

  {allianceDropdownOpen && (
    <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 p-2 shadow-xl">
      {alliances.map((alliance) => (
        <label
          key={alliance}
          className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-white hover:bg-gray-700"
        >
          <input
            type="checkbox"
            checked={selectedAlliance.includes(
              alliance
            )}
            onChange={() => {
              setSelectedAlliance((current) =>
                current.includes(alliance)
                  ? current.filter(
                      (item) =>
                        item !== alliance
                    )
                  : [
                      ...current,
                      alliance,
                    ]
              );
            }}
            className="h-4 w-4"
          />

          <span>{alliance}</span>
        </label>
      ))}
    </div>
  )}
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