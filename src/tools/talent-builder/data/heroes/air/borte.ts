import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const borteTree = createHero({
    iconImage: "/images/talent-builder/heroes/borte_icon.png",
    title: "Borte - Ambitious Princess",
    rarity: HeroRarity.Epic,
    categories: [HeroCategory.Hunt, HeroCategory.Air, HeroCategory.Attack],
})