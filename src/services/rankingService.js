import { API_URL } from "../config/api";

const weeksCache = {
  data: null,
};

const rankingsCache = {};

export async function getWeeks() {
  if (weeksCache.data) {
    return weeksCache.data;
  }

  const response = await fetch(`${API_URL}?type=weeks`);
  const data = await response.json();

  weeksCache.data = data;

  return data;
}

export async function getRankings(type, week) {
  const cacheKey = `${type}-${week}`;

  if (rankingsCache[cacheKey]) {
    return rankingsCache[cacheKey];
  }

  const response = await fetch(
    `${API_URL}?type=${type}&week=${encodeURIComponent(week)}`
  );

  const data = await response.json();

  rankingsCache[cacheKey] = data;

  return data;
}
export async function getStats() {

  const response = await fetch(`${API_URL}?type=stats`);

  if (!response.ok) {
    throw new Error("Failed to load stats");
  }

  return response.json();

}
export async function getMgm(dataset = "post") {
  const cacheKey = `mgm-${dataset}`;

  if (rankingsCache[cacheKey]) {
    return rankingsCache[cacheKey];
  }

  const response = await fetch(
    `${API_URL}?type=mgm&dataset=${dataset}`
  );

  const data = await response.json();

  rankingsCache[cacheKey] = data;

  return data;
}