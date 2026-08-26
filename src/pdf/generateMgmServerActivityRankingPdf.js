import { generateRankingPdf } from "./generateRankingPdf";

export async function generateMgmServerActivityRankingPdf(
  rankings,
  dataset
) {
  const migrationLabel =
    dataset === "post"
      ? "Post-Migration"
      : "Pre-Migration";

  await generateRankingPdf({
    title: "MGM Server Activity Ranking",

    subtitle: migrationLabel,

    filename: `SIRO_MGM_Server_Activity_${migrationLabel.replace(
      /-/g,
      ""
    )}.pdf`,

    columns: [
      {
        header: "Rank",
        key: "rank",
        width: 45,
        align: "center",
      },

      {
        header: "Server",
        key: "server",
        width: 75,
        align: "center",
        accent: true,
      },

      {
        header: "Alliances",
        key: "alliances",
        width: 85,
        align: "right",
      },

      {
        header: "MGM Played",
        key: "mgms",
        width: 100,
        align: "right",
      },

      {
        header: "Participants",
        key: "participants",
        width: 110,
        align: "right",
      },
    ],

    rankings,
  });
}