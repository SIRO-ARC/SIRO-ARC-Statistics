export async function getMgmLeaderboard(dataset = "pre") {
  const response = await fetch(`/api/mgm/${dataset}.json`, {
    cache: "no-store",
  });

  return response.json();
}