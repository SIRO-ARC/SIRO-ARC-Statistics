import { HeroCategory, HeroRarity } from "@/src/talents/headers/hero";
import { createHero } from "@/src/talents/src/hero";

export const korraTree = createHero({
    iconImage: "/images/talent-builder/heroes/korra_icon.png",
    title: "Korra - Prideful Avatar",
    rarity: HeroRarity.Legendary,
    categories: [HeroCategory.Versatile, HeroCategory.Water, HeroCategory.Avatar],
})