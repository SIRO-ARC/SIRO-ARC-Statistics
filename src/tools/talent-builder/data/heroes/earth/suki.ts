import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const sukiTree = createHero({
    iconImage: "/images/talent-builder/heroes/suki_icon.png",
    title: "Suki - Kyoshi Warrior",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Garrison, HeroCategory.Earth, HeroCategory.Defense],
})