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
      ctx.quadraticCurveTo(size, size, size - radius, size);
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(0, size, 0, size - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
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

function formatDate(date) {
  if (!date) {
    return "-";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return String(date);
  }

  return parsed.toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
});
}

function formatNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return Number(value).toLocaleString("en-US");
}

function createStat(label, value, raw = false) {
  return {
    stack: [
      {
        text: label.toUpperCase(),
        fontSize: 7.5,
        bold: true,
        color: "#64748B",
        characterSpacing: 0.8,
      },
      {
        text: raw
          ? String(value ?? "-")
          : formatNumber(value),
        fontSize: 13,
        bold: true,
        color: "#F8FAFC",
        margin: [0, 3, 0, 0],
      },
    ],
  };
}

function createAllianceCard(item, isWinner) {
  const hasDivision = Boolean(item.division);

  return {
    table: {
      widths: ["*"],
      body: [
        [
          {
            stack: [
              {
  stack: [
    {
      text: isWinner
        ? "WINNER"
        : "OPPONENT",
      fontSize: 8,
      bold: true,
      color: isWinner
        ? "#86EFAC"
        : "#94A3B8",
      characterSpacing: 1.2,
    },
    {
      text: String(
        item.alliance ?? "-"
      ),
      fontSize: 19,
      bold: true,
      color: "#38D5FF",
      margin: [0, 3, 0, 0],
    },
  ],
},

              {
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2: 470,
                    y2: 0,
                    lineWidth: 0.5,
                    lineColor: isWinner
                      ? "#276749"
                      : "#334155",
                  },
                ],
                margin: [0, 10, 0, 10],
              },

              {
                columns: [
                  createStat("Server", item.server, true),

                  ...(hasDivision
                    ? [
                        createStat(
  "Division",
  item.division,
  true
),
                      ]
                    : []),

                  createStat(
                    "Captured",
                    item.captured
                  ),

                  createStat(
                    "Participants",
                    item.participants
                  ),
                ],
                columnGap: 18,
              },
            ],

            margin: [14, 12, 14, 12],

            fillColor: isWinner
              ? "#102A20"
              : "#111C29",

            border: isWinner
              ? ["#22C55E", "#22C55E", "#22C55E", "#22C55E"]
              : ["#334155", "#334155", "#334155", "#334155"],
          },
        ],
      ],
    },

    layout: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    },

    margin: [0, 0, 0, 8],
  };
}

function createMatchHeader(match) {
    const totalParticipants =
    (Number(match.winner?.participants) || 0) +
    (match.opponents ?? []).reduce(
      (total, opponent) =>
        total + (Number(opponent.participants) || 0),
      0
    );
  return {
    stack: [
      {
  text: `Warzone ${match.warzone}`,
  fontSize: 22,
  bold: true,
  color: "#FF6A1A",
  alignment: "center",
  margin: [0, 0, 0, 11],
},

      {
  columns: [
  {
    text: `Date: ${formatDate(match.date)}`,
    alignment: "center",
    fontSize: 9,
    bold: true,
    color: "#94A3B8",
  },

  {
    text: `Time Slot: ${match.time ?? "-"}`,
    alignment: "center",
    fontSize: 9,
    bold: true,
    color: "#94A3B8",
  },

  {
    text: `Total Participants: ${totalParticipants}`,
    alignment: "center",
    fontSize: 9,
    bold: true,
    color: "#94A3B8",
  },
],

  margin: [0, 5, 0, 18],
},
    ],
  };
}

function createNoWinnerBlock() {
  return {
    table: {
      widths: ["*"],
      body: [
        [
          {
            stack: [
              {
                text: "NO WINNER",
                alignment: "center",
                fontSize: 10,
                bold: true,
                color: "#94A3B8",
                characterSpacing: 1.4,
              },
              {
                text:
                  "No winning alliance was recorded for this warzone.",
                alignment: "center",
                fontSize: 9,
                color: "#64748B",
                margin: [0, 5, 0, 0],
              },
            ],

            fillColor: "#0B1624",
            margin: [12, 10, 12, 10],
          },
        ],
      ],
    },

    layout: {
      hLineWidth: () => 0.6,
      vLineWidth: () => 0,
      hLineColor: () => "#334155",
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    },

    margin: [0, 0, 0, 10],
  };
}

function createVs() {
  return {
    columns: [
      {
        width: 240.5,
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 5,
            x2: 240.5,
            y2: 5,
            lineWidth: 0.5,
            lineColor: "#1E3A50",
          },
        ],
      },

      {
        width: 50,
        text: "VS",
        alignment: "center",
        fontSize: 9,
        bold: true,
        color: "#22D3EE",
        characterSpacing: 1.5,
      },

      {
        width: 240.5,
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 5,
            x2: 240.5,
            y2: 5,
            lineWidth: 0.5,
            lineColor: "#1E3A50",
          },
        ],
      },
    ],

    columnGap: 0,

    margin: [0, 2, 0, 10],
  };
}

function createPage(match, dataset, generatedDate, generatedTime) {
  const migrationLabel =
    dataset === "post"
      ? "Post-Migration"
      : "Pre-Migration";

  const content = [];

  /*
   * Header
   */
  content.push({
    image: "background",

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
            image: "logo",
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
          },

          {
            text: "MGM Event Overview",
            fontSize: 25,
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

    margin: [0, 0, 0, 0],
  });

  /*
   * Space below header
   */
  content.push({
    text: "",
    margin: [0, 68, 0, 0],
  });

  /*
   * Match information
   */
  content.push(
    createMatchHeader(match)
  );

  /*
   * Winner
   */
  if (match.winner) {
    content.push(
      createAllianceCard(
        match.winner,
        true
      )
    );
  } else {
    content.push(createNoWinnerBlock());
  }

  /*
   * Opponents
   */
  if (match.opponents?.length > 0) {
    if (match.winner) {
      content.push(createVs());
    }

    match.opponents.forEach(
      (opponent) => {
        content.push(
          createAllianceCard(
            opponent,
            false
          )
        );
      }
    );
  }

  return content;
}

export async function generateMgmOverviewPdf(
  matches,
  dataset = "post"
) {
  const logoBase64 = await getLogoBase64();
  const backgroundBase64 =
    await getBackgroundBase64();

  const now = new Date();

  const generatedDate =
    formatUtcDate(now);

  const generatedTime =
    formatUtcTime(now);

  const content = [];

  matches.forEach((match, index) => {
    content.push(
  ...createPage(
    match,
    dataset,
    generatedDate,
    generatedTime
  )
);

    if (index < matches.length - 1) {
      content.push({
        pageBreak: "after",
        text: "",
      });
    }
  });

  const migrationLabel =
    dataset === "post"
      ? "Post-Migration"
      : "Pre-Migration";

  const docDefinition = {
    pageSize: "A4",
    images: {
    logo: logoBase64,
    background: backgroundBase64,
  },

    pageMargins: [32, 34, 32, 42],

    info: {
      title:
        `MGM Event Overview - ${migrationLabel}`,

      author: "SIRO ARC Statistics",

      subject: "MGM Event Overview",
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
      `SIRO_MGM_Event_Overview_${migrationLabel.replace(
        /-/g,
        ""
      )}.pdf`
    );
}