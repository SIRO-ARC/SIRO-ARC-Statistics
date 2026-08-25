import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "../assets/logo.png";
import { formatDate } from "../utils/formatDate";

pdfMake.vfs = pdfFonts.vfs;

export async function generateMgmTerritoryRankingPdf(
  rankings,
  dataset
) {
  const logoBase64 = await new Promise((resolve) => {
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    };
  });

  const now = new Date();

  const generatedDate = now.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const generatedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const migrationLabel =
    dataset === "post"
      ? "Post-Migration"
      : "Pre-Migration";

  const docDefinition = {
    info: {
      title: `MGM Territory Ranking - ${migrationLabel}`,
      author: "SIRO ARC Statistics",
      subject: "MGM Territory Ranking",
      keywords:
        "Avatar Realms Collide, SIRO, MGM, Territory Ranking",
    },

    watermark: {
      text: "SIRO-STATS.COM",
      color: "#2563EB",
      opacity: 0.08,
      bold: true,
      angle: -35,
    },

    content: [
      {
        columns: [
          {
            width: 110,
            image: logoBase64,
            fit: [95, 95],
            margin: [0, 0, 15, 0],
          },

          {
            width: "*",
            stack: [
              {
                text: "SIRO ARC Statistics",
                style: "title",
              },
              {
                text: "MGM Territory Ranking",
                style: "subtitle",
                margin: [0, 4, 0, 0],
              },
              {
                text: migrationLabel,
                fontSize: 11,
                color: "#64748B",
                margin: [0, 8, 0, 0],
              },
            ],
          },

          {
            width: 120,
            stack: [
              {
                text: "GENERATED",
                alignment: "right",
                fontSize: 9,
                bold: true,
                color: "#94A3B8",
                characterSpacing: 1,
                margin: [0, 10, 0, 4],
              },
              {
                text: generatedDate,
                alignment: "right",
                fontSize: 11,
                bold: true,
                color: "#334155",
              },
              {
                text: `${generatedTime}`,
                alignment: "right",
                fontSize: 10,
                color: "#64748B",
                margin: [0, 2, 0, 0],
              },
            ],
          },
        ],

        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 2.5,
            lineColor: "#2563EB",
          },
        ],

        margin: [0, 15, 0, 20],
      },

      {
        table: {
          headerRows: 1,

          widths: [50, "*", 70, 90, 110],

          body: [
            [
              {
                text: "Rank",
                bold: true,
                color: "#ffffff",
                alignment: "center",
              },
              {
                text: "Alliance",
                bold: true,
                color: "#ffffff",
              },
              {
                text: "Server",
                bold: true,
                color: "#ffffff",
                alignment: "center",
              },
              {
                text: "MGM",
                bold: true,
                color: "#ffffff",
                alignment: "center",
              },
              {
                text: "Captured",
                bold: true,
                color: "#ffffff",
                alignment: "right",
              },
            ],

            ...rankings.map((entry) => {
              const rowColor =
                entry.rank === 1
                  ? "#FFF8DC"
                  : entry.rank === 2
                  ? "#c6d1e5"
                  : entry.rank === 3
                  ? "#FDF2E9"
                  : null;

              const textColor =
                entry.rank === 1
                  ? "#D4AF37"
                  : entry.rank === 2
                  ? "#5B6470"
                  : entry.rank === 3
                  ? "#B87333"
                  : "#1E293B";

              return [
                {
                  text: String(entry.rank),
                  alignment: "center",
                  bold: entry.rank <= 3,
                  color: textColor,
                  fillColor: rowColor,
                },

                {
                  text: entry.alliance ?? "-",
                  bold: entry.rank <= 3,
                  color: textColor,
                  fillColor: rowColor,
                },

                {
                  text: String(entry.server ?? "-"),
                  alignment: "center",
                  color: textColor,
                  fillColor: rowColor,
                },

                {
                  text: formatDate(entry.date),
                  alignment: "center",
                  color: textColor,
                  fillColor: rowColor,
                },

                {
                  text: Number(
                    entry.captured || 0
                  ).toLocaleString("en-US"),
                  alignment: "right",
                  bold: entry.rank <= 3,
                  color: textColor,
                  fillColor: rowColor,
                },
              ];
            }),
          ],
        },

        layout: {
          fillColor: (rowIndex) => {
            if (rowIndex === 0) return "#2563EB";

            return rowIndex % 2 === 0
              ? "#F7FAFF"
              : "#FFFFFF";
          },

          hLineWidth: () => 0.6,
          hLineColor: () => "#D1D5DB",

          vLineWidth: () => 0,

          paddingTop: () => 8,
          paddingBottom: () => 8,
          paddingLeft: () => 8,
          paddingRight: () => 8,
        },
      },
    ],

    footer(currentPage, pageCount) {
      return {
        margin: [40, 10],

        columns: [
          {
            text: "https://siro-stats.com/",
            color: "#64748b",
            fontSize: 9,
          },
          {
            text: `Page ${currentPage} of ${pageCount}`,
            alignment: "right",
            color: "#64748b",
            fontSize: 9,
          },
        ],
      };
    },

    styles: {
      title: {
        fontSize: 28,
        bold: true,
        color: "#0F172A",
      },

      subtitle: {
        fontSize: 17,
        bold: true,
        color: "#2563EB",
      },
    },
  };

  pdfMake
    .createPdf(docDefinition)
    .download(
      `SIRO_MGM_Territory_Ranking_${migrationLabel.replace(
        /-/g,
        ""
      )}.pdf`
    );
}