import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const aangTree = createHero({
    iconImage: "/images/talent-builder/heroes/aang_icon.png",
    title: "Aang - Playful Avatar",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Air, HeroCategory.Avatar],
})