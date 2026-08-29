import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const sokkaWWTree = createHero({
    iconImage: "/images/talent-builder/heroes/sokkaww_icon.png",
    title: "Sokka - Wolf Warrior",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Hunt, HeroCategory.Water, HeroCategory.Attack],
})