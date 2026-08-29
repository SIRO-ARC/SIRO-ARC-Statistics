import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const bolinTree = createHero({
    iconImage: "/images/talent-builder/heroes/bolin_icon.png",
    title: "Bolin - Talented Earthbender",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Garrison, HeroCategory.Earth, HeroCategory.Defense],
})