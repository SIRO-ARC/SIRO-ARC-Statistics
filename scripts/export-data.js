import fs from "fs";
import path from "path";
const startTime = Date.now();
const API_URL =
  "https://script.google.com/macros/s/AKfycbwheJ_RQBM6LHnh03qoULfD08MqOnT7O97EPfI4SnznQ5TiX8Wk5G7P5TRLMmFXeHT_/exec";
async function fetchJsonWithRetry(url, retries = 5) {

  for (let attempt = 1; attempt <= retries; attempt++) {

    try {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("Keine JSON-Antwort");
      }

      return await response.json();

    } catch (err) {

      console.log(
        `      Versuch ${attempt}/${retries} fehlgeschlagen`
      );

      if (attempt === retries) {
        throw err;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

    }

  }

}
console.log("=================================");
console.log(" SIRO ARC Statistics Export Tool ");
console.log("=================================");
console.log("");

const API_DIR = path.join(process.cwd(), "public", "api");

if (!fs.existsSync(API_DIR)) {
  fs.mkdirSync(API_DIR, { recursive: true });
  console.log("✓ Ordner public/api erstellt");
} else {
  console.log("✓ Ordner public/api bereits vorhanden");
}

console.log("");
console.log("Exportiere weeks.json...");

const weeks = await fetchJsonWithRetry(
  `${API_URL}?type=weeks`
);

fs.writeFileSync(
  path.join(API_DIR, "weeks.json"),
  JSON.stringify(weeks, null, 2),
  "utf8"
);

console.log("✓ weeks.json erstellt");
console.log("");
console.log("Exportiere pvp_weeks.json...");

const pvpWeeks = await fetchJsonWithRetry(
  `${API_URL}?type=weeks&category=pvp`
);

fs.writeFileSync(
  path.join(API_DIR, "pvp_weeks.json"),
  JSON.stringify(pvpWeeks, null, 2),
  "utf8"
);

console.log("✓ pvp_weeks.json erstellt");
console.log("");
console.log("Exportiere gathering_weeks.json...");

const gatheringWeeks = await fetchJsonWithRetry(
  `${API_URL}?type=weeks&category=gathering`
);

fs.writeFileSync(
  path.join(API_DIR, "gathering_weeks.json"),
  JSON.stringify(gatheringWeeks, null, 2),
  "utf8"
);

console.log("✓ gathering_weeks.json erstellt");
console.log("");
console.log("Exportiere stats.json...");

const stats = await fetchJsonWithRetry(
  `${API_URL}?type=stats`
);

fs.writeFileSync(
  path.join(API_DIR, "stats.json"),
  JSON.stringify(stats, null, 2),
  "utf8"
);

console.log("✓ stats.json erstellt");
const PLAYERS_DIR = path.join(API_DIR, "players");
const PVP_PLAYERS_DIR = path.join(API_DIR, "pvp_players");

if (!fs.existsSync(PVP_PLAYERS_DIR)) {
  fs.mkdirSync(PVP_PLAYERS_DIR, { recursive: true });
}

if (!fs.existsSync(PLAYERS_DIR)) {
  fs.mkdirSync(PLAYERS_DIR, { recursive: true });
}
const ALLIANCES_DIR = path.join(API_DIR, "alliances");
const PVP_ALLIANCES_DIR = path.join(API_DIR, "pvp_alliances");
const GATHERING_PLAYERS_DIR = path.join(
  API_DIR,
  "gathering_players"
);

if (!fs.existsSync(GATHERING_PLAYERS_DIR)) {
  fs.mkdirSync(GATHERING_PLAYERS_DIR, { recursive: true });
}

if (!fs.existsSync(PVP_ALLIANCES_DIR)) {
  fs.mkdirSync(PVP_ALLIANCES_DIR, { recursive: true });
}

if (!fs.existsSync(ALLIANCES_DIR)) {
  fs.mkdirSync(ALLIANCES_DIR, { recursive: true });
}
const MGM_DIR = path.join(API_DIR, "mgm");

if (!fs.existsSync(MGM_DIR)) {
  fs.mkdirSync(MGM_DIR, { recursive: true });
}
const playersByServer = {};
const growthHistory = {};
console.log("");
console.log("Exportiere Player-Rankings...");

for (const week of weeks.weeks) {

  console.log(`  → ${week}`);

  try {

  const players = await fetchJsonWithRetry(
  `${API_URL}?type=players&week=${encodeURIComponent(week)}`
);
for (const player of players) {

  // ----------------------------
  // playersByServer aufbauen
  // ----------------------------

  if (!playersByServer[player.server]) {
    playersByServer[player.server] = [];
  }

  playersByServer[player.server].push({
    displayName: player.displayName,
    tag: player.tag,
    name: player.name,
  });

  // ----------------------------
  // growthHistory aufbauen
  // ----------------------------

  if (!growthHistory[player.displayName]) {
    growthHistory[player.displayName] = [];
  }

  growthHistory[player.displayName].push({
    week: week.replace("Global Player/Alliance Ranking ", ""),
    server: player.server,
    displayName: player.displayName,
    rank: player.rank,
    power: player.power,
});
}

const fileName =
  week.replace("Global Player/Alliance Ranking ", "") + ".json";

fs.writeFileSync(
  path.join(PLAYERS_DIR, fileName),
  JSON.stringify(players, null, 2),
  "utf8"
);

console.log(`    ✓ ${fileName}`);

} catch (err) {

  console.error(`    ✗ ${week}: ${err.message}`);

}

await new Promise(resolve => setTimeout(resolve, 500));

}
console.log("");
console.log("Exportiere PvP Player-Rankings...");


for (const week of pvpWeeks.weeks) {

  console.log(`  → ${week}`);

  try {

    const players = await fetchJsonWithRetry(
      `${API_URL}?type=players&category=pvp&week=${encodeURIComponent(week)}`
    );

    const fileName =
      week.replace("Global PVP Player/Alliance Ranking ", "") + ".json";

    fs.writeFileSync(
      path.join(PVP_PLAYERS_DIR, fileName),
      JSON.stringify(players, null, 2),
      "utf8"
    );

    console.log(`    ✓ ${fileName}`);

  } catch (err) {

    console.error(`    ✗ ${week}: ${err.message}`);

  }

  await new Promise(resolve => setTimeout(resolve, 500));

}
console.log("");
console.log("Exportiere Alliance-Rankings...");

for (const week of weeks.weeks) {

  console.log(`  → ${week}`);

  try {

    const alliances = await fetchJsonWithRetry(
      `${API_URL}?type=alliances&week=${encodeURIComponent(week)}`
    );

    const fileName =
      week.replace("Global Player/Alliance Ranking ", "") + ".json";

    fs.writeFileSync(
      path.join(ALLIANCES_DIR, fileName),
      JSON.stringify(alliances, null, 2),
      "utf8"
    );

    console.log(`    ✓ ${fileName}`);

  } catch (err) {

    console.error(`    ✗ ${week}: ${err.message}`);

  }

  await new Promise(resolve => setTimeout(resolve, 500));

}
console.log("");
console.log("Exportiere PvP Alliance-Rankings...");

for (const week of pvpWeeks.weeks) {

  console.log(`  → ${week}`);

  try {

    const alliances = await fetchJsonWithRetry(
      `${API_URL}?type=alliances&category=pvp&week=${encodeURIComponent(week)}`
    );

    const fileName =
      week.replace("Global PVP Player/Alliance Ranking ", "") + ".json";

    fs.writeFileSync(
      path.join(PVP_ALLIANCES_DIR, fileName),
      JSON.stringify(alliances, null, 2),
      "utf8"
    );

    console.log(`    ✓ ${fileName}`);

  } catch (err) {

    console.error(`    ✗ ${week}: ${err.message}`);

  }

  await new Promise(resolve => setTimeout(resolve, 500));

}
console.log("");
console.log("Exportiere Gathering Player-Rankings...");

for (const week of gatheringWeeks.weeks) {

  console.log(`  → ${week}`);

  try {

    const players = await fetchJsonWithRetry(
      `${API_URL}?type=players&category=gathering&week=${encodeURIComponent(week)}`
    );

    const fileName =
      week.replace("Global Gathering Ranking ", "") + ".json";

    fs.writeFileSync(
      path.join(GATHERING_PLAYERS_DIR, fileName),
      JSON.stringify(players, null, 2),
      "utf8"
    );

    console.log(`    ✓ ${fileName}`);

  } catch (err) {

    console.error(`    ✗ ${week}: ${err.message}`);

  }

  await new Promise(resolve => setTimeout(resolve, 500));

}
console.log("");
console.log("Exportiere MGM...");

for (const dataset of ["pre", "post"]) {

  try {

    const mgm = await fetchJsonWithRetry(
      `${API_URL}?type=mgm&dataset=${dataset}`
    );

    fs.writeFileSync(
      path.join(MGM_DIR, `${dataset}.json`),
      JSON.stringify(mgm, null, 2),
      "utf8"
    );

    console.log(`    ✓ ${dataset}.json`);

  } catch (err) {

    console.error(`    ✗ ${dataset}: ${err.message}`);

  }

}
// ==========================================
// playersByServer exportieren
// ==========================================

const PLAYERS_BY_SERVER_DIR = path.join(API_DIR, "playersByServer");

if (!fs.existsSync(PLAYERS_BY_SERVER_DIR)) {
  fs.mkdirSync(PLAYERS_BY_SERVER_DIR, { recursive: true });
}

console.log("");
console.log("Exportiere playersByServer...");

for (const server of Object.keys(playersByServer)) {

  const uniquePlayers = [];

  const seen = new Set();

  for (const player of playersByServer[server]) {

    if (seen.has(player.displayName)) continue;

    seen.add(player.displayName);

    uniquePlayers.push(player);

  }

  uniquePlayers.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  fs.writeFileSync(
    path.join(
      PLAYERS_BY_SERVER_DIR,
      `${server}.json`
    ),
    JSON.stringify(uniquePlayers, null, 2),
    "utf8"
  );

}

console.log("✓ playersByServer exportiert");


// ==========================================
// Growth History exportieren
// ==========================================

const GROWTH_DIR = path.join(API_DIR, "growth");

if (!fs.existsSync(GROWTH_DIR)) {
  fs.mkdirSync(GROWTH_DIR, { recursive: true });
}

console.log("");
console.log("Exportiere Growth History...");

fs.writeFileSync(
  path.join(GROWTH_DIR, "history.json"),
  JSON.stringify(growthHistory, null, 2),
  "utf8"
);

console.log("✓ history.json erstellt");
const duration = ((Date.now() - startTime) / 1000).toFixed(1);

console.log("");
console.log("=========================================");
console.log(" Export erfolgreich abgeschlossen");
console.log("=========================================");
console.log("");
console.log(`✓ Weeks`);
console.log(`✓ Stats`);
console.log(`✓ Player Rankings (${weeks.weeks.length})`);
console.log(`✓ Alliance Rankings (${weeks.weeks.length})`);
console.log(`✓ MGM (2)`);
console.log(
  `✓ PlayersByServer (${Object.keys(playersByServer).length})`
);
console.log(`✓ Growth History`);
console.log("");
console.log(`Gesamtzeit: ${duration} Sekunden`);
console.log("");
console.log("=========================================");