import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const jinoraTree = createHero({
    iconImage: "/images/talent-builder/heroes/jinora_icon.png",
    title: "Jinora - Spiritual Airbender",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Air, HeroCategory.Support],
})