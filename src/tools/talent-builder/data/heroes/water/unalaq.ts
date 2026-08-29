import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const unalaqTree = createHero({
    iconImage: "/images/talent-builder/heroes/unalaq_icon.png",
    title: "Unalaq - Cunning Waterbender",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Siege, HeroCategory.Water, HeroCategory.Attack],
})