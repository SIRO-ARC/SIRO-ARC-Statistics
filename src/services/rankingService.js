import { API_URL } from "../config/api";

const weeksCache = {};

const rankingsCache = {};
async function fetchWithRetry(url, retries = 3, delay = 500) {
  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
  cache: "no-store",
});
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (err) {
      lastError = err;

      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export async function getWeeks(category = "power") {

  const cacheKey = `weeks-${category}`;

  if (weeksCache[cacheKey]) {
    return weeksCache[cacheKey];
  }

  const file =
  category === "pvp"
    ? "/api/pvp_weeks.json"
    : category === "gathering"
      ? "/api/gathering_weeks.json"
      : "/api/weeks.json";

  const response = await fetch(file, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  weeksCache[cacheKey] = data;

  return data;

}

export async function getRankings(type, week) {
  const cacheKey = `${type}-${week}`;

  if (rankingsCache[cacheKey]) {
    return rankingsCache[cacheKey];
  }

  let weekFile = week;

if (type === "players" || type === "alliances") {
  weekFile = week.replace(
    "Global Player/Alliance Ranking ",
    ""
  );
}

if (type === "pvp_players" || type === "pvp_alliances") {
  weekFile = week.replace(
    "Global PVP Player/Alliance Ranking ",
    ""
  );
}

if (type === "gathering_players") {
  weekFile = week.replace(
    "Global Gathering Ranking ",
    ""
  );
}

const response = await fetch(
  `/api/${type}/${weekFile}.json`,
  {
    cache: "no-store",
  }
);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

  const data = await response.json();

  rankingsCache[cacheKey] = data;

  return data;
}
export async function getServerPlayerPowerRanking(week) {
  const data = await getRankings("players", week);

  const servers = {};

  for (const player of data) {
    if (!servers[player.server]) {
      servers[player.server] = {
        server: player.server,
        power: 0,
        players: 0,
      };
    }

    servers[player.server].power += player.power;
    servers[player.server].players += 1;
  }

  return Object.values(servers)
  .sort((a, b) => b.power - a.power)
  .map((server, index) => ({
    ...server,
    rank: index + 1,
  }));
}
export async function getServerAlliancePowerRanking(week) {
  const data = await getRankings("alliances", week);

  const servers = {};

  for (const alliance of data) {
    if (!servers[alliance.server]) {
  servers[alliance.server] = {
    server: alliance.server,
    power: 0,
    alliances: 0,
  };
}

servers[alliance.server].power += alliance.power;
servers[alliance.server].alliances += 1;
  }

  return Object.values(servers)
    .sort((a, b) => b.power - a.power)
    .map((server, index) => ({
      ...server,
      rank: index + 1,
    }));
}
export async function getServerPlayerPvpRanking(week) {
  const data = await getRankings("pvp_players", week);

  const servers = {};

  for (const player of data) {
    if (!servers[player.server]) {
      servers[player.server] = {
        server: player.server,
        points: 0,
        players: 0,
      };
    }

    servers[player.server].points += player.power;
    servers[player.server].players += 1;
  }

  return Object.values(servers)
    .sort((a, b) => b.points - a.points)
    .map((server, index) => ({
      ...server,
      rank: index + 1,
    }));
}
export async function getServerAlliancePvpRanking(week) {
  const data = await getRankings("pvp_alliances", week);

  const servers = {};

  for (const alliance of data) {
    if (!servers[alliance.server]) {
      servers[alliance.server] = {
        server: alliance.server,
        points: 0,
        alliances: 0,
      };
    }

    servers[alliance.server].points += alliance.power;
    servers[alliance.server].alliances += 1;
  }

  return Object.values(servers)
    .sort((a, b) => b.points - a.points)
    .map((server, index) => ({
      ...server,
      rank: index + 1,
    }));
}
export async function getServerPlayerGatheringRanking(week) {
  const data = await getRankings("gathering_players", week);

  const servers = {};

  for (const player of data) {
    if (!servers[player.server]) {
      servers[player.server] = {
        server: player.server,
        power: 0,
        players: 0,
      };
    }

    servers[player.server].power += player.power;
    servers[player.server].players += 1;
  }

  return Object.values(servers)
    .sort((a, b) => b.power - a.power)
    .map((server, index) => ({
      ...server,
      rank: index + 1,
    }));
}
export async function getStats() {

  const response = await fetch("/api/stats.json", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();

}
export async function getMgm(dataset = "post") {

  const cacheKey = `mgm-${dataset}`;

  if (rankingsCache[cacheKey]) {
    return rankingsCache[cacheKey];
  }

  const response = await fetch(
    `/api/mgm/${dataset}.json`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  rankingsCache[cacheKey] = data;

  return data;

}
  
export async function getServers() {

  const cacheKey = "servers";

  if (rankingsCache[cacheKey]) {
    return rankingsCache[cacheKey];
  }

  const weeks = await getWeeks();

  const latestWeek =
    weeks.currentWeek.replace(
      "Global Player/Alliance Ranking ",
      ""
    );

  const response = await fetch(
    `/api/players/${latestWeek}.json`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  const servers = [...new Set(data.map(item => item.server))]
    .sort((a, b) => a - b);

  rankingsCache[cacheKey] = servers;

  return servers;

}


export async function getGrowthHistory({
  players = [],
}) {

  const cacheKey = "growth-history";

  let history = rankingsCache[cacheKey];

  if (!history) {

    const response = await fetch(
      "/api/growth/history.json",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    history = await response.json();

    rankingsCache[cacheKey] = history;

  }

  const result = [];

  for (const player of players) {

    if (history[player]) {
      result.push(...history[player]);
    }

  }

  result.sort((a, b) => {

    const getOrder = (week) => {

      const number = Number(
        week.replace("CW", "")
      );

      if (number >= 50) {
        return number - 50;
      }

      return number + 2;

    };

    return getOrder(a.week) - getOrder(b.week);

  });

  return result;

}
export async function getPlayersByServer(server) {

const cacheKey = `players-${server}`;

if (rankingsCache[cacheKey]) {
  return rankingsCache[cacheKey];
}

  const response = await fetch(
  `/api/playersByServer/${server}.json`,
  {
    cache: "no-store",
  }
);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  const players = data.sort((a, b) =>
  a.name.localeCompare(b.name)
);

  rankingsCache[cacheKey] = players;

  return players;

}