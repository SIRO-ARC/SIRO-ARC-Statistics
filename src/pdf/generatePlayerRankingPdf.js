import { generateRankingPdf } from "./generateRankingPdf";

export async function generatePlayerRankingPdf(
  rankings,
  selectedWeek,
  view,
  dataType = "power"
) {
  const fileType =
    view === "players"
      ? "Player"
      : "Alliance";

  const rankingLabel =
  dataType === "pvp"
    ? "PvP"
    : dataType === "gathering"
      ? "Gathering"
      : "Power";

const rankingTitle =
  `${fileType} ${rankingLabel} Ranking`;

  const calendarWeek =
    selectedWeek.match(/CW\s*\d+/i)?.[0]
    ?? selectedWeek;

  await generateRankingPdf({
    title: rankingTitle,

    subtitle: `Calendar Week ${calendarWeek.replace(
      /^CW/i,
      ""
    )}`,
    headerSpacing: 40,

    columns: [
  {
    key: "rank",
    header: "Rank",
    width: 50,
    align: "center",
  },

  {
    key: "name",
    header: fileType === "Player" ? "Player" : "Alliance",
    width: "*",
    align: "left",
    accent: true,
  },

  ...(fileType === "Player"
    ? [
        {
          key: "tag",
          header: "Alliance",
          width: 60,
          align: "center",
        },
      ]
    : []),

  {
    key: "server",
    header: "Server",
    width: 60,
    align: "center",
  },

  {
    key: "power",
    header:
      dataType === "gathering"
        ? "Resources"
        : dataType === "pvp"
          ? "Points"
          : "Power",
    width: 120,
    align: "right",
  },
],

    rankings,

    filename:
      `SIRO_${fileType}_Ranking_` +
      `${calendarWeek.replace(/\s+/g, "")}.pdf`,
  });
}