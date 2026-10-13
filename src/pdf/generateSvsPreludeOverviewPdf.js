
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "../assets/logo.png";
import backgroundImage from "/images/arc-background.png";

pdfMake.vfs = pdfFonts;

const COLORS = {
  background: "#050D18",
  panel: "#0B1624",
  cyan: "#22D3EE",
  title: "#38D5FF",
  white: "#F8FAFC",
  muted: "#94A3B8",
  border: "#334155",
};

const POSITIONS = [
  {
    dataPosition: "Blue",
    displayPosition: "Red",
    label: "TOP LEFT",
    color: "#F87171",
    fill: "#35191F",
    border: "#F87171",
  },
  {
    dataPosition: "Green",
    displayPosition: "Green",
    label: "TOP RIGHT",
    color: "#4ADE80",
    fill: "#123124",
    border: "#4ADE80",
  },
  {
    dataPosition: "Red",
    displayPosition: "Yellow",
    label: "BOTTOM LEFT",
    color: "#FACC15",
    fill: "#352D12",
    border: "#FACC15",
  },
  {
    dataPosition: "Gold",
    displayPosition: "Blue",
    label: "BOTTOM RIGHT",
    color: "#60A5FA",
    fill: "#172A45",
    border: "#60A5FA",
  },
];

function formatPoints(value) {
  return (Number(value) || 0).toLocaleString("en-US");
}


function getImageBase64(source, options = {}) {
  const {
    maxWidth = 1200,
    maxHeight = 350,
    format = "image/jpeg",
    quality = 0.78,
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      try {
        const scale = Math.min(
          1,
          maxWidth / img.width,
          maxHeight / img.height
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not create image canvas."));
          return;
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL(format, quality));
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error(`Could not load image: ${source}`));
    };

    img.src = source;
  });
}



function createServerCard(server, position, rank) {
  const podium = {
    1: {
      color: "#FFD166",
      label: "1ST PLACE",
      fill: "#332A15",
    },
    2: {
      color: "#E2E8F0",
      label: "2ND PLACE",
      fill: "#202B3A",
    },
    3: {
  color: "#B87333",
  label: "3RD PLACE",
  fill: "#35251B",
},
  }[rank];

  const accent = podium?.color ?? position.color;
const cardFill = position.fill;

  const content = [
    {
      columns: [
        {
          width: "*",
          stack: [
            {
              text: position.displayPosition.toUpperCase(),
              color: position.color,
              bold: true,
              fontSize: 12,
              characterSpacing: 1.5,
            },
            {
              text: position.label,
              color: "#A9BDD0",
              fontSize: 8,
              characterSpacing: 0.8,
              margin: [0, 3, 0, 0],
            },
          ],
        },
        {
          width: "auto",
          stack: [
            {
              text: podium ? `#${rank}` : "",
              color: accent,
              bold: true,
              fontSize: podium ? 19 : 9,
              alignment: "right",
            },
            ...(podium
              ? [{
                  text: podium.label,
                  color: accent,
                  bold: true,
                  fontSize: 7,
                  alignment: "right",
                  margin: [0, 2, 0, 0],
                }]
              : []),
          ],
        },
      ],
      columnGap: 8,
    },
  ];

  if (server) {
    content.push(
      {
        text: "SERVER",
        color: "#8CA5BD",
        bold: true,
        fontSize: 8,
        characterSpacing: 1.5,
        margin: [0, 15, 0, 1],
      },
      {
        text: String(server.server),
        color: podium?.color ?? COLORS.white,
        bold: true,
        fontSize: 35,
        characterSpacing: 0.5,
      },
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 70,
            h: 3,
            color: accent,
          },
        ],
        margin: [0, 7, 0, 8],
      },
      {
        text: formatPoints(server.preludePoints),
        color: podium?.color ?? "#E2EAF3",
        bold: true,
        fontSize: 16,
      },
      {
        text: "PRELUDE POINTS",
        color: "#8CA5BD",
        bold: true,
        fontSize: 8,
        characterSpacing: 1.2,
        margin: [0, 3, 0, 0],
      }
    );
  } else {
    content.push({
      text: "NO SERVER DATA",
      color: "#8CA5BD",
      fontSize: 10,
      margin: [0, 24, 0, 0],
    });
  }

  return {
    table: {
      widths: ["*"],
      heights: [170],
      body: [[{
        stack: content,
        fillColor: cardFill,
        margin: [13, 13, 13, 12],
        border: [
          position.border,
          position.border,
          position.border,
          position.border,
        ],
      }]],
    },
    layout: {
      hLineWidth: () => 1.2,
      vLineWidth: () => 1.2,
      hLineColor: () => position.border,
      vLineColor: () => position.border,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 0,
      paddingBottom: () => 0,
    },
    margin: [0, 0, 0, 0],
  };
}


function createWarzonePage(zone, logoBase64, backgroundBase64, generatedDate, generatedTime) {
  const sortedServers = [...zone.servers].sort(
    (a, b) => Number(b.preludePoints) - Number(a.preludePoints)
  );

  const content = [
    {
      image: "headerBackground",
      absolutePosition: { x: 0, y: 0 },
      width: 595,
      height: 172,
    },
    {
      canvas: [{
        type: "rect",
        x: 0,
        y: 168,
        w: 595,
        h: 1,
        color: COLORS.cyan,
      }],
      absolutePosition: { x: 0, y: 0 },
    },
    {
      columns: [
        {
          width: 95,
          image: "siroLogo",
          fit: [78, 78],
          alignment: "center",
        },
        {
          width: "*",
          stack: [
            {
              text: "SIRO STATS",
              fontSize: 15,
              bold: true,
              color: "#67E8F9",
              characterSpacing: 2.5,
            },
            {
              text: `Warzone ${zone.warzone}`,
              fontSize: 25,
              bold: true,
              color: COLORS.white,
              margin: [0, 5, 0, 0],
            },
            {
              text: `${zone.era || "SVS"} Era`,
              fontSize: 11,
              bold: true,
              color: COLORS.muted,
              margin: [0, 5, 0, 0],
            },
            ...(zone.ultimateGroup
              ? [{
                  text: "ULTIMATE GROUP",
                  fontSize: 9,
                  bold: true,
                  color: "#FCD34D",
                  margin: [0, 5, 0, 0],
                }]
              : []),
            {
              text: "SVS PRELUDE OVERVIEW",
              fontSize: 9,
              bold: true,
              color: "#67E8F9",
              margin: [0, 8, 0, 0],
              characterSpacing: 1,
            },
          ],
        },
        {
          width: 115,
          stack: [
            {
              text: "GENERATED",
              alignment: "right",
              fontSize: 8,
              bold: true,
              color: "#4F718C",
              characterSpacing: 1,
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
    },
    { text: "", margin: [0, 100, 0, 0] },
    
{
  columns: [
    {
      width: "*",
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 7,
          x2: 150,
          y2: 7,
          lineWidth: 1,
          lineColor: "#24445C",
        },
      ],
    },
    {
      width: "auto",
      text: "WARZONE SERVER MATCHUP",
      fontSize: 11,
      bold: true,
      color: COLORS.title,
      characterSpacing: 1,
      alignment: "center",
      margin: [10, 0, 10, 0],
    },
    {
      width: "*",
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 7,
          x2: 150,
          y2: 7,
          lineWidth: 1,
          lineColor: "#24445C",
        },
      ],
    },
  ],
  columnGap: 0,
  margin: [0, 0, 0, 48],
},

    {
      columns: POSITIONS.slice(0, 2).map((position) => {
        const server = zone.servers.find(
          (item) => item.position === position.dataPosition
        );
        const rank = server
          ? sortedServers.findIndex(
              (item) => Number(item.server) === Number(server.server)
            ) + 1
          : null;

        return createServerCard(server, position, rank);
      }),
      columnGap: 12,
      margin: [0, 0, 0, 12],
    },
    {
      columns: POSITIONS.slice(2, 4).map((position) => {
        const server = zone.servers.find(
          (item) => item.position === position.dataPosition
        );
        const rank = server
          ? sortedServers.findIndex(
              (item) => Number(item.server) === Number(server.server)
            ) + 1
          : null;

        return createServerCard(server, position, rank);
      }),
      columnGap: 12,
    },
  ];

  return content;
}

export async function generateSvsPreludeOverviewPdf(warzones) {
  if (!Array.isArray(warzones) || warzones.length === 0) {
    throw new Error("No SVS Prelude Warzone data available.");
  }

  const [logoBase64, backgroundBase64] = await Promise.all([
  getImageBase64(logo, {
    maxWidth: 500,
    maxHeight: 500,
    format: "image/png",
  }),
  getImageBase64(backgroundImage),
]);

const images = {
  siroLogo: logoBase64,
  headerBackground: backgroundBase64,
};

  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const generatedTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  const content = [];

  warzones.forEach((zone, index) => {
    content.push(
      ...createWarzonePage(
        zone,
        logoBase64,
        backgroundBase64,
        generatedDate,
        generatedTime
      )
    );

    if (index < warzones.length - 1) {
      content.push({ text: "", pageBreak: "after" });
    }
  });

  const docDefinition = {
    pageSize: "A4",
    images,
    pageMargins: [32, 34, 32, 42],
    info: {
      title: "SVS Prelude Overview",
      author: "SIRO ARC Statistics",
      subject: "SVS Prelude Warzone Overview",
    },
    background(currentPage, pageSize) {
      return {
        canvas: [{
          type: "rect",
          x: 0,
          y: 0,
          w: pageSize.width,
          h: pageSize.height,
          color: COLORS.background,
        }],
      };
    },
    content,
    footer(currentPage, pageCount) {
      return {
        margin: [38, 10, 38, 0],
        columns: [
          {
            text: "SIRO STATS  •  siro-stats.com",
            color: "#587086",
            fontSize: 8,
          },
          {
            text: `Page ${currentPage} of ${pageCount}`,
            alignment: "right",
            color: "#587086",
            fontSize: 8,
          },
        ],
      };
    },
  };

  pdfMake.createPdf(docDefinition).download(
    "SIRO_SVS_Prelude_Overview.pdf"
  );
}
