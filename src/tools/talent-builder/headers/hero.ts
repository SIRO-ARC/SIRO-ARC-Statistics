import { TalentNode } from "./talent"

export const HeroCategory = {
  Fire: "Fire",
  Water: "Water",
  Earth: "Earth",
  Air: "Air",
  Siege: "Siege",
  Attack: "Attack",
  Versatile: "Versatile",
  Avatar: "Avatar",
  Gathering: "Gathering",
  Support: "Support",
  Hunt: "Hunt",
  Garrison: "Garrison",
  Defense: "Defense",
  Mobility: "Mobility",
  Skill: "Skill"
} as const

export type HeroCategory = typeof HeroCategory[keyof typeof HeroCategory]

export const HeroRarity = {
  Legendary: "Legendary",
  Epic: "Epic",
  Rare: "Rare",
} as const

export type HeroRarity = typeof HeroRarity[keyof typeof HeroRarity]

export type HeroTree = {
  iconImage: string,
  backgroundImage: string,
  title: string,
  rarity: HeroRarity,
  categories: HeroCategory[],
  layout: TalentNode[],
}