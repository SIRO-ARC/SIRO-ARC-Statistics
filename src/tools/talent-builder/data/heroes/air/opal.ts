import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const opalTree = createHero({
    iconImage: "/images/talent-builder/heroes/opal_icon.png",
    title: "Opal - Gentle Airbender",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Air, HeroCategory.Defense],
})