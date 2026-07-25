import { API_URL } from "../config/api";

export async function getWeeks() {
  const response = await fetch(`${API_URL}?type=weeks`);
  return response.json();
}

export async function getRankings(type, week) {
  const response = await fetch(
    `${API_URL}?type=${type}&week=${encodeURIComponent(week)}`
  );

  return response.json();
}