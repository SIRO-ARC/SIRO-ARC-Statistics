import { HeroRarity } from "../headers/hero";

export const rarityColor: Record<HeroRarity, string> = {
  [HeroRarity.Legendary]: "text-amber-400",
  [HeroRarity.Epic]: "text-purple-400",
  [HeroRarity.Rare]: "text-blue-400",
}