import { API_URL } from "../config/api";

const weeksCache = {
  data: null,
};

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

export async function getWeeks() {
  if (weeksCache.data) {
    return weeksCache.data;
  }

  const response = await fetchWithRetry(`${API_URL}?type=weeks`);
  const data = await response.json();

  weeksCache.data = data;

  return data;
}

export async function getRankings(type, week) {
  const cacheKey = `${type}-${week}`;

  if (rankingsCache[cacheKey]) {
    return rankingsCache[cacheKey];
  }

  const response = await fetchWithRetry(
  `${API_URL}?type=${type}&week=${encodeURIComponent(week)}`
);

  const data = await response.json();

  rankingsCache[cacheKey] = data;

  return data;
}
export async function getStats() {
  const response = await fetchWithRetry(`${API_URL}?type=stats`);
  return response.json();
}
export async function getMgm(dataset = "post") {
  const cacheKey = `mgm-${dataset}`;

  if (rankingsCache[cacheKey]) {
    return rankingsCache[cacheKey];
  }

  const response = await fetchWithRetry(
  `${API_URL}?type=mgm&dataset=${dataset}`
);

  const data = await response.json();

  rankingsCache[cacheKey] = data;

  return data;
}