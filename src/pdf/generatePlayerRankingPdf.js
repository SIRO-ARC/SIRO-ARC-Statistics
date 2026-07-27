import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import logo from "../assets/logo.png";
import watermarkBase64 from "../assets/pdf/watermarkBase64";

pdfMake.vfs = pdfFonts.vfs;

export async function generatePlayerRankingPdf(rankings, selectedWeek, view) {
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

  const generatedDate = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const generatedTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  
const calendarWeek =
  selectedWeek.match(/CW\s*\d+/i)?.[0] ?? selectedWeek;
  const fileType = view === "players" ? "Player" : "Alliance";

const rankingTitle = `${fileType} Power Ranking`;
  const docDefinition = {
    info: {
  title: `${rankingTitle} - Calendar Week ${calendarWeek.replace(/^CW/i, "")}`,
  author: "SIRO ARC Statistics",
  subject: `${rankingTitle} for Avatar: Realms Collide`,
  keywords: "Avatar Realms Collide, SIRO, Rankings, Player Ranking, Alliance Ranking",
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
  margin: [0, 10, 0, 0],
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
      margin: [0, 8, 0, 0],
    },

    {
      text: rankingTitle,
      style: "subtitle",
      margin: [0, 4, 0, 0],
    },

    {
      text: `Calendar Week ${calendarWeek.replace(/^CW/i, "")}`,
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
      text: `${generatedTime} UTC`,
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

          widths: [50, "*", 80, 120],

          body: [
            [
  
  {
    text: "Rank",
    bold: true,
    color: "#ffffff",
    alignment: "center",
    margin: [0, 9, 0, 9],
  },
  {
    text: fileType === "Player" ? "Player" : "Alliance",
    bold: true,
    color: "#ffffff",
    alignment: "left",
    margin: [0, 9, 0, 9],
  },
  {
    text: fileType === "Player" ? "Alliance" : "Tag",
    bold: true,
    color: "#ffffff",
    alignment: "center",
    margin: [0, 9, 0, 9],
  },
  {
    text: "Power",
    bold: true,
    color: "#ffffff",
    alignment: "right",
    margin: [0, 9, 0, 9],
  },
],

            ...rankings.map((player) => {

  const rowColor =
    player.rank === 1
      ? "#FFF8DC"
      : player.rank === 2
      ? "#c6d1e5"
      : player.rank === 3
      ? "#FDF2E9"
      : null;

  const textColor =
    player.rank === 1
      ? "#D4AF37"
      : player.rank === 2
      ? "#5B6470"
      : player.rank === 3
      ? "#B87333"
      : "#1E293B";

  return [
    
  {
    
  text: player.rank.toString(),
  alignment: "center",
  bold: player.rank <= 3,
  fontSize: player.rank <= 3 ? 12 : 11,
  color: textColor,
  fillColor: rowColor,
},
  {
  text: player.name,
  alignment: "left",
  bold: player.rank <= 3,
  fontSize: player.rank <= 3 ? 12 : 11,
  color: textColor,
  fillColor: rowColor,
},
  {
  text: player.tag,
  alignment: "center",
  bold: player.rank <= 3,
  fontSize: player.rank <= 3 ? 12 : 11,
  color: textColor,
  fillColor: rowColor,
},
  {
  text: player.power.toLocaleString("en-US"),
  alignment: "right",
  bold: player.rank <= 3,
  fontSize: player.rank <= 3 ? 12 : 11,
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
    return rowIndex % 2 === 0 ? "#F7FAFF" : "#FFFFFF";
  },

  hLineWidth: (i) => {
  if (i === 1) return 1.3;
  return 0.6;
},
  vLineWidth: (i, node) => {
  if (i === 0 || i === node.table.widths.length) return 0.6;
  return 0;
},

  hLineColor: () => "#D1D5DB",
  vLineColor: () => "#334155",

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
    characterSpacing: 0.3,
    margin: [0, 0, 0, 4],
  },

  subtitle: {
    fontSize: 17,
    bold: true,
    color: "#2563EB",
    margin: [0, 2, 0, 0],
  },
},
  };




pdfMake.createPdf(docDefinition).download(
  `SIRO_${fileType}_Ranking_${calendarWeek.replace(/\s+/g, "")}.pdf`
);
}