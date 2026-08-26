import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "../assets/logo.png";
import backgroundImage from "/images/arc-background.png";

pdfMake.vfs = pdfFonts;

async function getLogoBase64() {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = logo;

    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");

      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");

      const radius = size * 0.18;

      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(size - radius, 0);
      ctx.quadraticCurveTo(size, 0, size, radius);
      ctx.lineTo(size, size - radius);
      ctx.quadraticCurveTo(
        size,
        size,
        size - radius,
        size
      );
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(
        0,
        size,
        0,
        size - radius
      );
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(
        0,
        0,
        radius,
        0
      );
      ctx.closePath();

      ctx.clip();

      ctx.drawImage(
        img,
        (img.width - size) / 2,
        (img.height - size) / 2,
        size,
        size,
        0,
        0,
        size,
        size
      );

      resolve(canvas.toDataURL("image/png"));
    };
  });
}

async function getBackgroundBase64() {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = backgroundImage;

    img.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      resolve(canvas.toDataURL("image/png"));
    };
  });
}

function formatUtcDate(date = new Date()) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatUtcTime(date = new Date()) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}

function formatCellValue(value, key) {
  if (value === null || value === undefined) {
    return "-";
  }

  if (key === "server") {
    return String(value);
  }

  if (key === "date") {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  date.setUTCDate(date.getUTCDate() + 1);

  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

  if (typeof value === "number") {
    return value.toLocaleString("en-US");
  }

  return String(value);
}

function getRankStyle(rank) {
  if (rank === 1) {
    return {
      color: "#F5C451",
      fillColor: "#3A3014",
    };
  }

  if (rank === 2) {
    return {
      color: "#F1F5F9",
      fillColor: "#30343A",
    };
  }

  if (rank === 3) {
    return {
      color: "#D99A5B",
      fillColor: "#211B16",
    };
  }

  return {
    color: "#E2E8F0",
    fillColor: null,
  };
}

function createTable({
  columns,
  rankings,
  highlightTopThree = false,
}) {
  const header = columns.map((column) => ({
    text: column.header,
    bold: true,
    color: "#F8FAFC",
    fontSize: 10,
    alignment: column.align || "left",
  }));

  const rows = rankings.map((entry) => {
    const rankStyle = highlightTopThree
      ? getRankStyle(entry.rank)
      : {
          color: "#E2E8F0",
          fillColor: null,
        };

    return columns.map((column) => {
      const isRank = column.key === "rank";
      const isAccent = column.accent === true;

      return {
        text: formatCellValue(
          entry[column.key],
          column.key
        ),

        alignment: column.align || "left",

        fontSize:
          highlightTopThree && entry.rank <= 3
            ? 11
            : 9.5,

        bold:
          isRank ||
          (highlightTopThree && entry.rank <= 3),

        color: isRank
          ? rankStyle.color
          : isAccent
            ? "#38D5FF"
            : "#E2E8F0",

        fillColor: rankStyle.fillColor,
      };
    });
  });

  return {
    table: {
      headerRows: 1,

      widths: columns.map(
        (column) => column.width || "*"
      ),

      body: [
        header,
        ...rows,
      ],
    },

    margin: [14, 0, 0, 0],

    layout: {
      fillColor: (rowIndex) => {
        if (rowIndex === 0) {
          return "#103A5C";
        }

        if (
          highlightTopThree &&
          rowIndex === 1
        ) {
          return "#3A3014";
        }

        if (
          highlightTopThree &&
          rowIndex === 2
        ) {
          return "#30343A";
        }

        if (
          highlightTopThree &&
          rowIndex === 3
        ) {
          return "#211B16";
        }

        return rowIndex % 2 === 0
          ? "#0B1928"
          : "#071522";
      },

      hLineWidth: (rowIndex) => {
        if (rowIndex === 1) {
          return 0.9;
        }

        return 0.45;
      },

      hLineColor: (rowIndex) => {
        if (rowIndex === 1) {
          return "#315F7C";
        }

        return "#1B3850";
      },

      vLineWidth: () => 0,

      paddingTop: (rowIndex) => {
        if (
          highlightTopThree &&
          rowIndex >= 1 &&
          rowIndex <= 3
        ) {
          return 10;
        }

        return 8;
      },

      paddingBottom: (rowIndex) => {
        if (
          highlightTopThree &&
          rowIndex >= 1 &&
          rowIndex <= 3
        ) {
          return 10;
        }

        return 8;
      },

      paddingLeft: () => 9,
      paddingRight: () => 9,
    },
  };
}

export async function generateMgmParticipantsRankingPdf(
  rankings,
  dataset
) {
  const logoBase64 = await getLogoBase64();

  const backgroundBase64 =
    await getBackgroundBase64();

  const now = new Date();

  const generatedDate = formatUtcDate(now);
  const generatedTime = formatUtcTime(now);

  const migrationLabel =
    dataset === "post"
      ? "Post-Migration"
      : "Pre-Migration";

  const FIRST_PAGE_ROWS = 20;
  const OTHER_PAGE_ROWS = 25;

  const rankingChunks = [];

  rankingChunks.push(
    rankings.slice(0, FIRST_PAGE_ROWS)
  );

  let currentIndex = FIRST_PAGE_ROWS;

  while (currentIndex < rankings.length) {
    rankingChunks.push(
      rankings.slice(
        currentIndex,
        currentIndex + OTHER_PAGE_ROWS
      )
    );

    currentIndex += OTHER_PAGE_ROWS;
  }

  const content = [];

  rankingChunks.forEach((chunk, index) => {
    const isFirstPage = index === 0;

    if (isFirstPage) {
      content.push({
        image: backgroundBase64,

        absolutePosition: {
          x: 0,
          y: 0,
        },

        width: 595,
        height: 172,
      });

      content.push({
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 168,
            w: 595,
            h: 1,
            color: "#22D3EE",
          },
        ],

        absolutePosition: {
          x: 0,
          y: 0,
        },
      });

      content.push({
        columns: [
          {
            width: 105,

            stack: [
              {
                image: logoBase64,
                fit: [86, 86],
                alignment: "center",
              },
            ],
          },

          {
            width: "*",

            stack: [
              {
                text: "SIRO STATS",
                fontSize: 16,
                bold: true,
                color: "#67E8F9",
                characterSpacing: 3,
                margin: [0, 0, 0, 2],
              },

              {
                text: "MGM Participants Ranking",
                fontSize: 26,
                bold: true,
                color: "#F8FAFC",
                margin: [0, 5, 0, 0],
              },

              {
                text: migrationLabel,
                fontSize: 11,
                bold: true,
                color: "#94A3B8",
                margin: [0, 5, 0, 0],
              },

              {
                text: "siro-stats.com",
                fontSize: 10,
                bold: true,
                color: "#67E8F9",
                margin: [0, 9, 0, 0],
              },
            ],
          },

          {
            width: 125,

            stack: [
              {
                text: "GENERATED",
                alignment: "right",
                fontSize: 8,
                bold: true,
                color: "#4F718C",
                characterSpacing: 1.2,
              },

              {
                text: generatedDate,
                alignment: "right",
                fontSize: 10,
                bold: true,
                color: "#CBD5E1",
                margin: [0, 4, 0, 0],
              },

              {
                text: `${generatedTime} UTC`,
                alignment: "right",
                fontSize: 9,
                color: "#7F9BB2",
              },
            ],
          },
        ],

        margin: [0, 0, 0, 22],
      });
    }

    content.push({
      text: "",

      margin: isFirstPage
        ? [0, 10, 0, 0]
        : [0, 0, 0, 0],
    });

    content.push(
      createTable({
        columns: [
          {
            key: "rank",
            header: "Rank",
            width: 50,
            align: "center",
          },

          {
            key: "alliance",
            header: "Alliance",
            width: "*",
            align: "left",
            accent: true,
          },

          {
            key: "server",
            header: "Server",
            width: 70,
            align: "center",
          },

          {
            key: "date",
            header: "MGM",
            width: 90,
            align: "center",
          },

          {
            key: "participants",
            header: "Participants",
            width: 110,
            align: "right",
          },
        ],

        rankings: chunk,
        highlightTopThree: isFirstPage,
      })
    );

    if (index < rankingChunks.length - 1) {
      content.push({
        pageBreak: "after",
        text: "",
      });
    }
  });

  const docDefinition = {
    pageSize: "A4",

    pageMargins: [32, 34, 32, 42],

    info: {
      title:
        `MGM Participants Ranking - ${migrationLabel}`,

      author: "SIRO ARC Statistics",

      subject:
        "MGM Participants Ranking",

      keywords:
        "Avatar Realms Collide, SIRO, Rankings, MGM, Participants",
    },

    background(currentPage, pageSize) {
      return {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: pageSize.width,
            h: pageSize.height,
            color: "#050D18",
          },
        ],
      };
    },

    content,

    footer(currentPage, pageCount) {
      return {
        margin: [38, 10, 38, 0],

        columns: [
          {
            text:
              "SIRO STATS  •  siro-stats.com",

            color: "#587086",
            fontSize: 8,
          },

          {
            text:
              `Page ${currentPage} of ${pageCount}`,

            alignment: "right",
            color: "#587086",
            fontSize: 8,
          },
        ],
      };
    },

    styles: {},
  };

  pdfMake
    .createPdf(docDefinition)
    .download(
      `SIRO_MGM_Participants_Ranking_${migrationLabel.replace(
        /-/g,
        ""
      )}.pdf`
    );
}