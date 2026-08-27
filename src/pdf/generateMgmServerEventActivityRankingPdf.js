import { generateRankingPdf } from "./generateRankingPdf";
import { formatDate } from "../utils/formatDate";

export async function generateMgmServerEventActivityRankingPdf(
  ranking,
  dataset
) {
  const columns = [
  {
    key: "rank",
    header: "Rank",
    width: 68,
    align: "center",
  },
  {
    key: "server",
    header: "Server",
    width: 114,
    accent: true,
  },
  {
    key: "date",
    header: "MGM",
    width: 130,
  },
  {
    key: "participants",
    header: "Participants",
    width: 110,
    align: "right",
  },
];

  const rows = ranking.map((entry) => ({
    rank: `#${entry.rank}`,
    server: entry.server,
    date: formatDate(entry.date),
    participants: Number(
      entry.participants || 0
    ).toLocaleString(),
  }));

  await generateRankingPdf({
    title: "MGM Server Activity",
    subtitle: "",
    columns,
    rankings: rows,
    filename: `SIRO_MGM_Server_Activity_${dataset}.pdf`,
    highlightTopThree: true,
    headerSpacing: 42,
  });
}