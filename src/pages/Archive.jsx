import ArchiveCard from "../components/archive/ArchiveCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeeks } from "../services/rankingService";
export default function Archive() {
    const [weeks, setWeeks] = useState([]);
    useEffect(() => {
  async function loadWeeks() {
    const data = await getWeeks();

    console.log("Weeks:", data);

    setWeeks(data.weeks);
  }

  loadWeeks();
}, []);
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="text-5xl font-bold">
        Archive
      </h1>

      <p className="mt-4 text-slate-400">
        Browse every available ranking snapshot.
      </p>
      <div className="mt-10 space-y-3">
  {weeks.map((week) => (
    <ArchiveCard
  key={week}
  week={week}
/>
  ))}
</div>

    </div>
  );
}